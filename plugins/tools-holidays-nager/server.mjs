#!/usr/bin/env node
// holidays-nager — public holidays (date.nager.at, no auth) plus business-day math.
//
// Data shapes returned by tools:
//   Holiday        = { date, name, localName, countryCode, nationwide, subdivisions, types }
//   BusinessDayCheck = { date, country, subdivision, isBusinessDay, isWeekend, holiday: Holiday|null }
//   BusinessDayCalc  = { start, end, country, subdivision, businessDays, skippedHolidays: [Holiday], weekend: [dayName] }
// Business-day rules: weekends (default Sat+Sun) and holidays of type "Public" that are nationwide or apply to the given subdivision.
const SERVER_NAME = 'holidays-nager';
const SERVER_VERSION = '1.1.0';
const SERVER_INSTRUCTIONS = 'Country codes are ISO 3166-1 alpha-2 (US, DE, GB). Subdivisions use ISO 3166-2 (US-CA, DE-BY).';
const SECRET_VARS = [];
const BASE = 'https://date.nager.at/api/v3';
const SOURCE = 'Nager.Date';
// ---------------------------------------------------------------------------
// Minimal zero-dependency MCP stdio runtime (JSON-RPC 2.0, newline-delimited).
// Handles: initialize, notifications/initialized, ping, tools/list, tools/call.
// All logs go to stderr; stdout is reserved for protocol messages.
// ---------------------------------------------------------------------------
import { createInterface } from 'node:readline';

const SUPPORTED_PROTOCOLS = ['2025-11-25', '2025-06-18', '2025-03-26', '2024-11-05'];
const TOOLS = new Map();

/** Error whose message is safe and useful to show to the agent. */
class UserError extends Error {}

function tool(name, description, inputSchema, handler) {
  TOOLS.set(name, { name, description, inputSchema: { type: 'object', additionalProperties: false, ...inputSchema }, handler });
}

/** Read an env var; unresolved "${VAR}" placeholders and blanks count as missing. */
function env(name) {
  const v = process.env[name];
  if (v == null) return undefined;
  const t = String(v).trim();
  if (!t || /^\$\{[^}]*\}$/.test(t)) return undefined;
  return t;
}

function requireEnv(name, hint = '') {
  const v = env(name);
  if (!v) {
    throw new UserError(
      `Missing required configuration ${name}. Set it via the plugin's options in Claude Code (/plugin or /config) ` +
      `or export it in the environment that launches Claude Code.${hint ? ' ' + hint : ''}`
    );
  }
  return v;
}

/** Remove any configured secret values from text before it leaves the process. */
function redact(text) {
  let out = String(text ?? '');
  for (const k of SECRET_VARS) {
    const v = env(k);
    if (v && v.length >= 4) out = out.split(v).join('[REDACTED]');
  }
  return out;
}

/** fetch wrapper: timeout, JSON/text parsing, clear errors without leaking headers. */
async function http(url, { method = 'GET', headers = {}, body, timeoutMs = 20000, expect = 'json', label } = {}) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  const where = label || new URL(url).host;
  let res;
  try {
    res = await fetch(url, { method, headers, body, signal: ctrl.signal, redirect: 'follow' });
  } catch (e) {
    throw new UserError(`${where}: network error (${e.name === 'AbortError' ? `timeout after ${timeoutMs}ms` : e.message})`);
  } finally {
    clearTimeout(timer);
  }
  const text = await res.text();
  let data = text;
  if (expect === 'json') {
    try { data = text ? JSON.parse(text) : null; } catch { data = text; }
  }
  if (!res.ok) {
    const detail = typeof data === 'object' && data
      ? JSON.stringify(data.error ?? data.message ?? data.detail ?? data.meta ?? data).slice(0, 400)
      : String(text).replace(/\s+/g, ' ').slice(0, 300);
    const sentAuth = Object.keys(headers).some((k) => /auth|key|token/i.test(k));
    const hint = (res.status === 401 || res.status === 403) && sentAuth ? ' (check that the API key/token is valid and has read access)'
      : res.status === 403 ? ' (forbidden; the service may block this client or network)'
      : res.status === 404 ? ' (not found)' : res.status === 429 ? ' (rate limited; retry later)' : '';
    const err = new UserError(redact(`${where}: HTTP ${res.status}${hint}: ${detail}`));
    err.status = res.status;
    throw err;
  }
  return { status: res.status, headers: res.headers, data };
}

function qs(params) {
  const u = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) if (v !== undefined && v !== null && v !== '') u.append(k, String(v));
  const s = u.toString();
  return s ? `?${s}` : '';
}

function validateArgs(schema, args) {
  for (const key of schema.required || []) {
    if (args[key] === undefined || args[key] === null || args[key] === '') throw new UserError(`Missing required argument "${key}".`);
  }
  for (const [key, val] of Object.entries(args)) {
    const spec = schema.properties?.[key];
    if (!spec) throw new UserError(`Unknown argument "${key}". Allowed: ${Object.keys(schema.properties || {}).join(', ') || '(none)'}.`);
    const t = spec.type;
    const ok = !t || (t === 'integer' ? Number.isInteger(val) : t === 'number' ? typeof val === 'number' && isFinite(val)
      : t === 'array' ? Array.isArray(val) : t === 'object' ? val && typeof val === 'object' && !Array.isArray(val) : typeof val === t);
    if (!ok) throw new UserError(`Argument "${key}" must be of type ${t}.`);
    if (spec.enum && !spec.enum.includes(val)) throw new UserError(`Argument "${key}" must be one of: ${spec.enum.join(', ')}.`);
  }
}

function send(msg) { process.stdout.write(JSON.stringify(msg) + '\n'); }
function reply(id, result) { send({ jsonrpc: '2.0', id, result }); }
function fail(id, code, message) { send({ jsonrpc: '2.0', id, error: { code, message } }); }

async function handle(msg) {
  if (!msg || msg.jsonrpc !== '2.0' || typeof msg.method !== 'string') {
    if (msg && msg.id !== undefined && !('result' in msg) && !('error' in msg)) fail(msg.id, -32600, 'Invalid Request');
    return;
  }
  const { id, method, params = {} } = msg;
  const isNotification = id === undefined || id === null;
  if (isNotification) return; // notifications/initialized, notifications/cancelled, ... need no response
  switch (method) {
    case 'initialize': {
      const requested = params.protocolVersion;
      return reply(id, {
        protocolVersion: SUPPORTED_PROTOCOLS.includes(requested) ? requested : SUPPORTED_PROTOCOLS[0],
        capabilities: { tools: { listChanged: false } },
        serverInfo: { name: SERVER_NAME, version: SERVER_VERSION },
        instructions: SERVER_INSTRUCTIONS,
      });
    }
    case 'ping':
      return reply(id, {});
    case 'tools/list':
      return reply(id, { tools: [...TOOLS.values()].map(({ name, description, inputSchema }) => ({ name, description, inputSchema })) });
    case 'tools/call': {
      const t = TOOLS.get(params.name);
      if (!t) return fail(id, -32602, `Unknown tool: ${params.name}`);
      const args = params.arguments ?? {};
      try {
        validateArgs(t.inputSchema, args);
        const data = await t.handler(args);
        return reply(id, { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }], isError: false });
      } catch (e) {
        const message = e instanceof UserError ? e.message : `Unexpected error: ${e?.message || e}`;
        if (!(e instanceof UserError)) process.stderr.write(`[${SERVER_NAME}] ${redact(e?.stack || e)}\n`);
        return reply(id, { content: [{ type: 'text', text: `Error: ${redact(message)}` }], isError: true });
      }
    }
    default:
      return fail(id, -32601, `Method not found: ${method}`);
  }
}

let pending = 0;
let closed = false;

function startServer() {
  const rl = createInterface({ input: process.stdin, crlfDelay: Infinity });
  rl.on('line', (line) => {
    if (!line.trim()) return;
    let msg;
    try { msg = JSON.parse(line); } catch { return fail(null, -32700, 'Parse error'); }
    const batch = Array.isArray(msg) ? msg : [msg];
    for (const m of batch) {
      pending++;
      handle(m)
        .catch((e) => process.stderr.write(`[${SERVER_NAME}] ${redact(e?.stack || e)}\n`))
        .finally(() => { pending--; if (closed && pending === 0) process.exit(0); });
    }
  });
  rl.on('close', () => { closed = true; if (pending === 0) process.exit(0); });
  process.stderr.write(`[${SERVER_NAME}] MCP stdio server ready (${TOOLS.size} tools)\n`);
}

const DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
const cache = new Map();
const cc = (c) => { const v = String(c).trim().toUpperCase(); if (!/^[A-Z]{2}$/.test(v)) throw new UserError('country must be an ISO 3166-1 alpha-2 code like "US".'); return v; };
const parseDate = (s, name) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(s))) throw new UserError(`${name} must be YYYY-MM-DD.`);
  const d = new Date(`${s}T00:00:00Z`); if (isNaN(d)) throw new UserError(`${name} is not a valid date.`); return d;
};
const fmt = (d) => d.toISOString().slice(0, 10);
const toHoliday = (h) => ({ date: h.date, name: h.name, localName: h.localName, countryCode: h.countryCode, nationwide: h.global, subdivisions: h.counties ?? [], types: h.types ?? [] });

async function yearHolidays(country, year) {
  const key = `${country}-${year}`;
  if (!cache.has(key)) {
    const p = http(`${BASE}/PublicHolidays/${year}/${country}`, { label: 'Nager.Date' }).then((r) => {
      if (!Array.isArray(r.data)) throw new UserError(`No holiday data for country ${country}.`);
      return r.data.map(toHoliday);
    }).catch((e) => { cache.delete(key); if (e.status === 404) throw new UserError(`Country ${country} is not supported by Nager.Date (see holidays_countries).`); throw e; });
    cache.set(key, p);
  }
  return cache.get(key);
}
const applies = (h, sub) => h.types.includes('Public') && (h.nationwide || (sub && h.subdivisions.includes(sub)));
async function holidayOn(d, country, sub) {
  const list = await yearHolidays(country, d.getUTCFullYear());
  return list.find((h) => h.date === fmt(d) && applies(h, sub)) ?? null;
}
const weekendSet = (w) => new Set((w ?? ['saturday', 'sunday']).map((x) => { const i = DAYS.indexOf(String(x).toLowerCase()); if (i < 0) throw new UserError(`Unknown weekday "${x}".`); return i; }));
const common = {
  country: { type: 'string', description: 'ISO 3166-1 alpha-2, e.g. US' },
  subdivision: { type: 'string', description: 'Optional ISO 3166-2 code, e.g. US-TX, to include regional holidays.' },
  weekend: { type: 'array', items: { type: 'string' }, description: 'Weekend days, default ["saturday","sunday"].' },
};

tool('holidays_list', 'All public holidays for a country and year.', {
  properties: { country: common.country, year: { type: 'integer', description: 'Default: current year.' }, subdivision: common.subdivision },
  required: ['country'],
}, async ({ country, year = new Date().getUTCFullYear(), subdivision }) => {
  const c = cc(country);
  let list = await yearHolidays(c, year);
  if (subdivision) list = list.filter((h) => h.nationwide || h.subdivisions.includes(subdivision.toUpperCase()));
  return { country: c, year, subdivision: subdivision ?? null, count: list.length, holidays: list, source: SOURCE };
});

tool('holidays_next', 'Upcoming public holidays for a country in the next 365 days.', {
  properties: { country: common.country, limit: { type: 'integer', description: 'Default 5.' } }, required: ['country'],
}, async ({ country, limit = 5 }) => {
  const c = cc(country);
  const { data } = await http(`${BASE}/NextPublicHolidays/${c}`, { label: 'Nager.Date' });
  return { country: c, today: fmt(new Date()), holidays: data.slice(0, limit).map(toHoliday), source: SOURCE };
});

tool('holidays_countries', 'List country codes supported by Nager.Date.', { properties: {} }, async () => {
  const { data } = await http(`${BASE}/AvailableCountries`, { label: 'Nager.Date' });
  return { count: data.length, countries: data.map((c) => ({ code: c.countryCode, name: c.name })), source: SOURCE };
});

tool('business_day_check', 'Is a given date a business day in a country (weekend/holiday aware)?', {
  properties: { date: { type: 'string', description: 'YYYY-MM-DD' }, ...common }, required: ['date', 'country'],
}, async ({ date, country, subdivision, weekend }) => {
  const d = parseDate(date, 'date'), c = cc(country), sub = subdivision?.toUpperCase();
  const isWeekend = weekendSet(weekend).has(d.getUTCDay());
  const holiday = await holidayOn(d, c, sub);
  return { date, weekday: DAYS[d.getUTCDay()], country: c, subdivision: sub ?? null, isBusinessDay: !isWeekend && !holiday, isWeekend, holiday, source: SOURCE };
});

tool('business_days_add', 'Add (or subtract, with negative n) N business days to a date, skipping weekends and public holidays.', {
  properties: { start: { type: 'string', description: 'YYYY-MM-DD' }, days: { type: 'integer', description: 'Business days to add; negative to go back.' }, ...common },
  required: ['start', 'days', 'country'],
}, async ({ start, days, country, subdivision, weekend }) => {
  if (Math.abs(days) > 1000) throw new UserError('days must be between -1000 and 1000.');
  const d = parseDate(start, 'start'), c = cc(country), sub = subdivision?.toUpperCase(), wk = weekendSet(weekend);
  const step = days >= 0 ? 1 : -1; let left = Math.abs(days); const skipped = [];
  while (left > 0) {
    d.setUTCDate(d.getUTCDate() + step);
    if (wk.has(d.getUTCDay())) continue;
    const h = await holidayOn(d, c, sub);
    if (h) { skipped.push(h); continue; }
    left--;
  }
  return { start, end: fmt(d), endWeekday: DAYS[d.getUTCDay()], country: c, subdivision: sub ?? null, businessDays: days, skippedHolidays: skipped, weekend: [...wk].map((i) => DAYS[i]), source: SOURCE };
});

tool('business_days_between', 'Count business days between two dates (start exclusive, end inclusive), listing holidays skipped.', {
  properties: { start: { type: 'string' }, end: { type: 'string' }, ...common }, required: ['start', 'end', 'country'],
}, async ({ start, end, country, subdivision, weekend }) => {
  let a = parseDate(start, 'start'), b = parseDate(end, 'end'), sign = 1;
  if (b < a) { [a, b] = [b, a]; sign = -1; }
  if ((b - a) / 86400000 > 3660) throw new UserError('Range too large (max ~10 years).');
  const c = cc(country), sub = subdivision?.toUpperCase(), wk = weekendSet(weekend);
  let n = 0; const skipped = [];
  for (const d = new Date(a); d < b;) {
    d.setUTCDate(d.getUTCDate() + 1);
    if (wk.has(d.getUTCDay())) continue;
    const h = await holidayOn(d, c, sub);
    if (h) { skipped.push(h); continue; }
    n++;
  }
  return { start, end, country: c, subdivision: sub ?? null, businessDays: n * sign, skippedHolidays: skipped, weekend: [...wk].map((i) => DAYS[i]), source: SOURCE };
});

startServer();
