#!/usr/bin/env node
// package-health — npm / PyPI package metadata plus OSV.dev vulnerability data (no auth).
//
// Data shapes returned by tools:
//   PackageInfo   = { ecosystem, name, latestVersion, description, license, homepage, repository, lastPublishedAt,
//                     daysSinceLastPublish, versionCount, maintainers, deprecated, weeklyDownloads, requiresPython, source }
//   Vulnerability = { id, aliases, summary, severity, published, modified, fixedIn, url }
//   VulnReport    = { ecosystem, name, version, count, vulnerabilities: [Vulnerability], source }
//   HealthReport  = { ecosystem, name, latestVersion, signals: { ...PackageInfo subset, vulnCountLatest }, flags: [string], verdict, source }
const SERVER_NAME = 'package-health';
const SERVER_VERSION = '1.1.0';
const SERVER_INSTRUCTIONS = 'Supports ecosystems "npm" and "pypi". Health verdicts are heuristics from public signals, not a security audit.';
const SECRET_VARS = [];
const SOURCE = 'npm registry / PyPI JSON API / OSV.dev';
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

const ECO = { npm: 'npm', pypi: 'PyPI' };
const days = (iso) => (iso ? Math.floor((Date.now() - Date.parse(iso)) / 86400000) : null);
const ecoProp = { type: 'string', enum: ['npm', 'pypi'], description: 'Package ecosystem.' };
const npmName = (n) => encodeURIComponent(n).replace('%40', '@');

async function npmInfo(name) {
  const [{ data: p }, dl] = await Promise.all([
    http(`https://registry.npmjs.org/${npmName(name)}`, { label: 'npm registry', timeoutMs: 30000 }),
    http(`https://api.npmjs.org/downloads/point/last-week/${npmName(name)}`, { label: 'npm downloads' }).catch(() => null),
  ]);
  const latest = p['dist-tags']?.latest;
  const v = p.versions?.[latest] || {};
  const published = p.time?.[latest] ?? p.time?.modified ?? null;
  const repo = typeof p.repository === 'string' ? p.repository : p.repository?.url;
  return {
    ecosystem: 'npm', name: p.name, latestVersion: latest ?? null, description: p.description ?? null,
    license: (typeof v.license === 'string' ? v.license : v.license?.type) ?? (typeof p.license === 'string' ? p.license : null),
    homepage: p.homepage ?? null, repository: repo ? repo.replace(/^git\+/, '').replace(/\.git$/, '') : null,
    lastPublishedAt: published, daysSinceLastPublish: days(published), versionCount: Object.keys(p.versions || {}).length,
    maintainers: (p.maintainers || []).length, deprecated: v.deprecated ? String(v.deprecated) : null,
    weeklyDownloads: dl?.data?.downloads ?? null, requiresPython: null, source: 'npm registry',
  };
}

async function pypiInfo(name) {
  const { data: p } = await http(`https://pypi.org/pypi/${encodeURIComponent(name)}/json`, { label: 'PyPI' });
  const i = p.info || {};
  const files = p.urls || [];
  const published = files.map((f) => f.upload_time_iso_8601).sort().pop() ?? null;
  const urls = i.project_urls || {};
  const repo = Object.entries(urls).find(([k, u]) => /source|repo|github|code/i.test(k) || /github\.com|gitlab\.com/.test(u))?.[1] ?? null;
  const classifierLicense = (i.classifiers || []).find((c) => c.startsWith('License ::'))?.split('::').pop().trim();
  return {
    ecosystem: 'pypi', name: i.name, latestVersion: i.version, description: i.summary ?? null,
    license: i.license_expression || (i.license && i.license.length < 80 ? i.license : null) || classifierLicense || null,
    homepage: i.home_page || urls.Homepage || urls.homepage || null, repository: repo,
    lastPublishedAt: published, daysSinceLastPublish: days(published), versionCount: Object.keys(p.releases || {}).length,
    maintainers: null, deprecated: i.yanked ? `yanked: ${i.yanked_reason || 'no reason given'}` : null,
    weeklyDownloads: null, requiresPython: i.requires_python || null, source: 'PyPI',
  };
}

const info = (ecosystem, name) => (ecosystem === 'npm' ? npmInfo(name) : pypiInfo(name));

async function vulns(ecosystem, name, version) {
  const body = { package: { name, ecosystem: ECO[ecosystem] }, ...(version ? { version } : {}) };
  const { data } = await http('https://api.osv.dev/v1/query', { method: 'POST', body: JSON.stringify(body), headers: { 'content-type': 'application/json' }, label: 'OSV.dev' });
  return (data.vulns || []).map((v) => {
    const fixed = new Set();
    for (const a of v.affected || []) for (const r of a.ranges || []) for (const e of r.events || []) if (e.fixed) fixed.add(e.fixed);
    const sev = v.database_specific?.severity ?? v.affected?.[0]?.ecosystem_specific?.severity ?? v.severity?.[0]?.score ?? null;
    return {
      id: v.id, aliases: v.aliases || [], summary: v.summary || (v.details || '').slice(0, 200), severity: sev,
      published: v.published, modified: v.modified, fixedIn: [...fixed], url: `https://osv.dev/vulnerability/${v.id}`,
    };
  });
}

tool('package_info', 'Metadata for an npm or PyPI package: latest version, license, last publish date, downloads, deprecation.', {
  properties: { ecosystem: ecoProp, name: { type: 'string' } }, required: ['ecosystem', 'name'],
}, async ({ ecosystem, name }) => info(ecosystem, name.trim()));

tool('package_vulnerabilities', 'Known vulnerabilities (OSV.dev) for a package, optionally for one specific version.', {
  properties: { ecosystem: ecoProp, name: { type: 'string' }, version: { type: 'string', description: 'Exact version; omit for all known advisories.' } },
  required: ['ecosystem', 'name'],
}, async ({ ecosystem, name, version }) => {
  const list = await vulns(ecosystem, name.trim(), version);
  return { ecosystem, name, version: version ?? null, count: list.length, vulnerabilities: list, source: 'OSV.dev' };
});

tool('package_health', 'One-shot health check: maintenance recency, deprecation, license, popularity and vulns affecting the latest version.', {
  properties: { ecosystem: ecoProp, name: { type: 'string' } }, required: ['ecosystem', 'name'],
}, async ({ ecosystem, name }) => {
  const i = await info(ecosystem, name.trim());
  const v = i.latestVersion ? await vulns(ecosystem, i.name, i.latestVersion) : [];
  const flags = [];
  if (i.deprecated) flags.push(`deprecated: ${i.deprecated}`);
  if (v.length) flags.push(`${v.length} known vulnerabilit${v.length === 1 ? 'y' : 'ies'} affect ${i.latestVersion}`);
  if (i.daysSinceLastPublish != null && i.daysSinceLastPublish > 730) flags.push(`no release in ${i.daysSinceLastPublish} days`);
  if (!i.license) flags.push('no license metadata');
  if (i.weeklyDownloads != null && i.weeklyDownloads < 1000) flags.push(`low adoption (${i.weeklyDownloads} weekly downloads)`);
  const verdict = i.deprecated || v.length ? 'risky' : flags.length ? 'caution' : 'healthy';
  return { ecosystem, name: i.name, latestVersion: i.latestVersion, signals: { ...i, vulnCountLatest: v.length }, vulnerabilities: v, flags, verdict, source: SOURCE };
});

startServer();
