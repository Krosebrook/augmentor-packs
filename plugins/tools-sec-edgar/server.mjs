#!/usr/bin/env node
// sec-edgar — SEC EDGAR company lookup, latest filings and XBRL financial facts via data.sec.gov (no auth;
// SEC requires a descriptive User-Agent with contact info: set SEC_USER_AGENT, e.g. "Acme Research admin@acme.com").
//
// Data shapes returned by tools:
//   CompanyRef = { cik, ticker, name }
//   Filing     = { form, filingDate, reportDate, accessionNumber, description, url, indexUrl }
//   FilingList = { company: CompanyRef & { sic, sicDescription, stateOfIncorporation, fiscalYearEnd, exchanges }, filings: [Filing], source }
//   Metric     = { concept, label, unit, value, periodEnd, periodStart, fiscalYear, fiscalPeriod, form, filed }
//   KeyFinancials = { company: CompanyRef, latestAnnual: { [metricKey]: Metric|null }, source }
const SERVER_NAME = 'sec-edgar';
const SERVER_VERSION = '1.1.0';
const SERVER_INSTRUCTIONS = 'Data is from SEC EDGAR filings as reported (XBRL). Keep requests modest (SEC limit: 10 req/s).';
const SECRET_VARS = [];
const SOURCE = 'SEC EDGAR (data.sec.gov)';
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

const DEFAULT_UA = 'augmentor-packs-sec-edgar/1.1.0 (Claude Code plugin; set sec_user_agent to your name and contact email)';
const ua = () => env('SEC_USER_AGENT') || DEFAULT_UA;
const sec = (url) => http(url, { headers: { 'user-agent': ua(), accept: 'application/json' }, label: 'SEC EDGAR', timeoutMs: 30000 });
const pad = (cik) => String(cik).replace(/\D/g, '').padStart(10, '0');
let tickers;

async function resolveCompany(q) {
  const s = String(q).trim();
  if (/^\d{1,10}$/.test(s)) return { cik: pad(s), ticker: null, name: null };
  if (!tickers) {
    tickers = sec('https://www.sec.gov/files/company_tickers.json').then((r) => Object.values(r.data)).catch((e) => { tickers = undefined; throw e; });
  }
  const list = await tickers;
  const up = s.toUpperCase();
  const hit = list.find((t) => t.ticker === up) || list.find((t) => t.title.toUpperCase() === up) || list.find((t) => t.title.toUpperCase().includes(up));
  if (!hit) throw new UserError(`No SEC registrant found for "${q}". Use a ticker (AAPL), CIK, or exact company name.`);
  return { cik: pad(hit.cik_str), ticker: hit.ticker, name: hit.title };
}
const companyProp = { company: { type: 'string', description: 'Ticker (AAPL), CIK (320193) or company name.' } };

tool('sec_lookup_company', 'Resolve a ticker, CIK or company name to the SEC registrant (CIK, ticker, name).', {
  properties: companyProp, required: ['company'],
}, async ({ company }) => ({ ...(await resolveCompany(company)), source: SOURCE }));

tool('sec_latest_filings', 'Most recent SEC filings for a company, optionally filtered by form type (10-K, 10-Q, 8-K, S-1, 4, ...).', {
  properties: { ...companyProp, forms: { type: 'array', items: { type: 'string' }, description: 'e.g. ["10-K","10-Q"]' }, limit: { type: 'integer', description: 'Default 10, max 100.' } },
  required: ['company'],
}, async ({ company, forms, limit = 10 }) => {
  const ref = await resolveCompany(company);
  const { data: d } = await sec(`https://data.sec.gov/submissions/CIK${ref.cik}.json`);
  const r = d.filings?.recent || {};
  const want = forms?.map((f) => f.toUpperCase());
  const cikInt = String(+ref.cik);
  const filings = [];
  for (let i = 0; i < (r.form || []).length && filings.length < Math.min(limit, 100); i++) {
    if (want && !want.includes(r.form[i].toUpperCase())) continue;
    const acc = r.accessionNumber[i].replace(/-/g, '');
    filings.push({
      form: r.form[i], filingDate: r.filingDate[i], reportDate: r.reportDate[i] || null, accessionNumber: r.accessionNumber[i],
      description: r.primaryDocDescription[i] || null,
      url: r.primaryDocument[i] ? `https://www.sec.gov/Archives/edgar/data/${cikInt}/${acc}/${r.primaryDocument[i]}` : null,
      indexUrl: `https://www.sec.gov/Archives/edgar/data/${cikInt}/${acc}/`,
    });
  }
  return {
    company: { cik: ref.cik, ticker: ref.ticker ?? d.tickers?.[0] ?? null, name: d.name, sic: d.sic, sicDescription: d.sicDescription, stateOfIncorporation: d.stateOfIncorporation || null, fiscalYearEnd: d.fiscalYearEnd, exchanges: d.exchanges },
    filings, source: SOURCE,
  };
});

const KEY_METRICS = {
  revenue: ['us-gaap:Revenues', 'us-gaap:RevenueFromContractWithCustomerExcludingAssessedTax', 'us-gaap:SalesRevenueNet', 'ifrs-full:Revenue'],
  netIncome: ['us-gaap:NetIncomeLoss', 'ifrs-full:ProfitLoss'],
  operatingIncome: ['us-gaap:OperatingIncomeLoss'],
  epsDiluted: ['us-gaap:EarningsPerShareDiluted', 'ifrs-full:DilutedEarningsLossPerShare'],
  totalAssets: ['us-gaap:Assets', 'ifrs-full:Assets'],
  totalLiabilities: ['us-gaap:Liabilities', 'ifrs-full:Liabilities'],
  stockholdersEquity: ['us-gaap:StockholdersEquity', 'ifrs-full:Equity'],
  cash: ['us-gaap:CashAndCashEquivalentsAtCarryingValue', 'ifrs-full:CashAndCashEquivalents'],
  operatingCashFlow: ['us-gaap:NetCashProvidedByUsedInOperatingActivities', 'ifrs-full:CashFlowsFromUsedInOperatingActivities'],
  sharesOutstanding: ['dei:EntityCommonStockSharesOutstanding'],
};

function latestAnnual(facts, conceptKey) {
  const [ns, name] = conceptKey.split(':');
  const c = facts?.[ns]?.[name];
  if (!c) return null;
  let best = null;
  for (const [unit, rows] of Object.entries(c.units || {})) {
    for (const f of rows) {
      const annualForm = /^(10-K|20-F|40-F)/.test(f.form || '');
      if (ns !== 'dei' && (!annualForm || f.fp !== 'FY')) continue;
      if (f.start) { const days = (Date.parse(f.end) - Date.parse(f.start)) / 86400000; if (days < 350 || days > 380) continue; }
      if (!best || f.end > best.end || (f.end === best.end && f.filed > best.filed)) best = { ...f, unit };
    }
  }
  return best && { concept: conceptKey, label: c.label, unit: best.unit, value: best.val, periodEnd: best.end, periodStart: best.start ?? null, fiscalYear: best.fy, fiscalPeriod: best.fp, form: best.form, filed: best.filed };
}

tool('sec_key_financials', 'Latest annual key financials from XBRL company facts (revenue, net income, EPS, assets, cash, ...).', {
  properties: companyProp, required: ['company'],
}, async ({ company }) => {
  const ref = await resolveCompany(company);
  const { data: d } = await sec(`https://data.sec.gov/api/xbrl/companyfacts/CIK${ref.cik}.json`);
  const latest = {};
  for (const [k, concepts] of Object.entries(KEY_METRICS)) {
    const candidates = concepts.map((c) => latestAnnual(d.facts, c)).filter(Boolean);
    latest[k] = candidates.sort((a, b) => b.periodEnd.localeCompare(a.periodEnd))[0] ?? null;
  }
  return { company: { cik: ref.cik, ticker: ref.ticker, name: d.entityName }, latestAnnual: latest, source: SOURCE };
});

tool('sec_concept_history', 'Annual history of one XBRL concept for a company (e.g. us-gaap:Revenues).', {
  properties: { ...companyProp, concept: { type: 'string', description: 'taxonomy:Tag, e.g. us-gaap:NetIncomeLoss' }, years: { type: 'integer', description: 'Default 5' } },
  required: ['company', 'concept'],
}, async ({ company, concept, years = 5 }) => {
  const [ns, tag] = concept.split(':');
  if (!ns || !tag || !/^[\w-]+$/.test(ns) || !/^\w+$/.test(tag)) throw new UserError('concept must look like "us-gaap:Revenues".');
  const ref = await resolveCompany(company);
  const { data: d } = await sec(`https://data.sec.gov/api/xbrl/companyconcept/CIK${ref.cik}/${ns}/${tag}.json`);
  const byEnd = new Map();
  for (const [unit, rows] of Object.entries(d.units || {})) for (const f of rows) {
    if (!/^(10-K|20-F|40-F)/.test(f.form || '') || f.fp !== 'FY') continue;
    if (f.start) { const days = (Date.parse(f.end) - Date.parse(f.start)) / 86400000; if (days < 350 || days > 380) continue; }
    const prev = byEnd.get(f.end);
    if (!prev || f.filed > prev.filed) byEnd.set(f.end, { periodEnd: f.end, periodStart: f.start ?? null, value: f.val, unit, fiscalYear: f.fy, form: f.form, filed: f.filed });
  }
  const series = [...byEnd.values()].sort((a, b) => b.periodEnd.localeCompare(a.periodEnd)).slice(0, years);
  return { company: { cik: ref.cik, ticker: ref.ticker, name: d.entityName }, concept, label: d.label, series, source: SOURCE };
});

startServer();
