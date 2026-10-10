#!/usr/bin/env node
// domain-checks — DNS (Cloudflare DNS-over-HTTPS), registration data (RDAP, server found via IANA bootstrap) and TLS certificate expiry (node:tls). No auth.
//
// Data shapes returned by tools:
//   DnsResult   = { domain, records: { [type]: [{ value, ttl }] }, dnssecValidated, resolver }
//   Registration = { domain, registrar, registrarIanaId, status, created, updated, expires, daysUntilExpiry, nameservers, dnssec, rdapUrl, rdapServer }
//   TlsCert     = { host, port, subject, issuer, validFrom, validTo, daysRemaining, altNames, protocol, authorized, authorizationError, fingerprint256 }
//   DomainReport = { domain, dns, registration, tls, issues: [string], checkedAt }
const SERVER_NAME = 'domain-checks';
const SERVER_VERSION = '1.1.0';
const SERVER_INSTRUCTIONS = 'Use for DNS debugging, domain/SSL expiry checks and "who is the registrar" questions.';
const SECRET_VARS = [];
const DOH = 'https://cloudflare-dns.com/dns-query';
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
import tls from 'node:tls';

const TYPES = { 1: 'A', 2: 'NS', 5: 'CNAME', 6: 'SOA', 15: 'MX', 16: 'TXT', 28: 'AAAA', 33: 'SRV', 257: 'CAA', 65: 'HTTPS', 99: 'SPF' };
const ALLOWED = ['A', 'AAAA', 'CNAME', 'MX', 'NS', 'TXT', 'SOA', 'CAA', 'SRV', 'HTTPS'];
const host = (d) => {
  const v = String(d).trim().toLowerCase().replace(/^https?:\/\//, '').split(/[/:?#]/)[0].replace(/\.$/, '');
  if (!/^(?=.{1,253}$)([a-z0-9_](?:[a-z0-9_-]{0,61}[a-z0-9])?\.)+[a-z][a-z0-9-]{0,62}$/.test(v)) throw new UserError(`"${d}" is not a valid domain name.`);
  return v;
};
const daysUntil = (iso) => (iso ? Math.floor((Date.parse(iso) - Date.now()) / 86400000) : null);

async function dns(domain, types) {
  const records = {}; let dnssec = true;
  await Promise.all(types.map(async (t) => {
    const { data } = await http(`${DOH}${qs({ name: domain, type: t })}`, { headers: { accept: 'application/dns-json' }, label: 'Cloudflare DoH' });
    if (data.Status !== 0 && data.Status !== 3) throw new UserError(`DNS query ${t} failed with RCODE ${data.Status}.`);
    dnssec &&= Boolean(data.AD);
    records[t] = (data.Answer || []).map((a) => ({ type: TYPES[a.type] ?? String(a.type), value: a.type === 16 ? a.data.replace(/^"|"$/g, '').replace(/" "/g, '') : a.data, ttl: a.TTL }))
      .filter((a) => a.type === t || (t !== 'CNAME' && a.type === 'CNAME'));
  }));
  return { domain, records, dnssecValidated: dnssec, resolver: 'Cloudflare 1.1.1.1 (DoH)' };
}

const UA = 'augmentor-packs-domain-checks/1.1.0 (Claude Code plugin)';
let bootstrap;
/** Find the authoritative RDAP server for the TLD via the IANA bootstrap registry (RFC 9224); fall back to rdap.org. */
async function rdapBase(domain) {
  bootstrap ||= http('https://data.iana.org/rdap/dns.json', { label: 'IANA RDAP bootstrap', headers: { 'user-agent': UA } }).then((r) => r.data).catch((e) => { bootstrap = undefined; throw e; });
  const labels = domain.split('.');
  const services = (await bootstrap).services || [];
  for (let i = 1; i < labels.length; i++) {
    const suffix = labels.slice(i).join('.');
    const hit = services.find(([tlds]) => tlds.includes(suffix));
    if (hit) return hit[1].find((u) => u.startsWith('https')) || hit[1][0];
  }
  return 'https://rdap.org/';
}

async function rdap(domain) {
  const apex = domain; // RDAP is registry-level; caller should pass the registrable domain
  const base = await rdapBase(apex).catch(() => 'https://rdap.org/');
  let res;
  try {
    res = await http(`${base.replace(/\/?$/, '/')}domain/${apex}`, { headers: { accept: 'application/rdap+json', 'user-agent': UA }, label: 'RDAP' });
  } catch (e) {
    if (e.status === 404) throw new UserError(`RDAP: ${apex} is not registered (or not found at ${new URL(base).host}). Pass the registrable domain, not a subdomain.`);
    throw e;
  }
  const d = res.data;
  const ev = (a) => d.events?.find((e) => e.eventAction === a)?.eventDate ?? null;
  const reg = d.entities?.find((e) => e.roles?.includes('registrar'));
  const vcardName = reg?.vcardArray?.[1]?.find((x) => x[0] === 'fn')?.[3];
  return {
    domain: (d.ldhName || apex).toLowerCase(), registrar: vcardName ?? reg?.publicIds?.[0]?.identifier ?? null,
    registrarIanaId: reg?.publicIds?.find((p) => /iana/i.test(p.type))?.identifier ?? null, status: d.status ?? [],
    created: ev('registration'), updated: ev('last changed'), expires: ev('expiration'), daysUntilExpiry: daysUntil(ev('expiration')),
    nameservers: (d.nameservers || []).map((n) => n.ldhName?.toLowerCase()), dnssec: d.secureDNS?.delegationSigned ?? null,
    rdapUrl: d.links?.find((l) => l.rel === 'self')?.href ?? null, rdapServer: new URL(base).host,
  };
}

function cert(hostname, port = 443, timeoutMs = 10000) {
  return new Promise((resolve, reject) => {
    const sock = tls.connect({ host: hostname, port, servername: hostname, rejectUnauthorized: false, timeout: timeoutMs }, () => {
      const c = sock.getPeerCertificate();
      const out = c && c.valid_to ? {
        host: hostname, port, subject: c.subject?.CN ?? null, issuer: [c.issuer?.O, c.issuer?.CN].filter(Boolean).join(' / ') || null,
        validFrom: new Date(c.valid_from).toISOString(), validTo: new Date(c.valid_to).toISOString(), daysRemaining: daysUntil(new Date(c.valid_to).toISOString()),
        altNames: (c.subjectaltname || '').split(', ').map((s) => s.replace(/^DNS:/, '')).filter(Boolean).slice(0, 50),
        protocol: sock.getProtocol(), authorized: sock.authorized, authorizationError: sock.authorizationError ? String(sock.authorizationError) : null, fingerprint256: c.fingerprint256,
      } : null;
      sock.end();
      out ? resolve(out) : reject(new UserError(`${hostname}:${port} presented no certificate.`));
    });
    sock.on('timeout', () => { sock.destroy(); reject(new UserError(`TLS connect to ${hostname}:${port} timed out.`)); });
    sock.on('error', (e) => reject(new UserError(`TLS connect to ${hostname}:${port} failed: ${e.message}`)));
  });
}

tool('dns_lookup', 'Resolve DNS records for a domain via Cloudflare DoH (A, AAAA, CNAME, MX, NS, TXT, SOA, CAA, SRV, HTTPS).', {
  properties: { domain: { type: 'string' }, types: { type: 'array', items: { type: 'string', enum: ALLOWED }, description: 'Default ["A","AAAA","MX","NS","TXT"]' } },
  required: ['domain'],
}, async ({ domain, types = ['A', 'AAAA', 'MX', 'NS', 'TXT'] }) => {
  const bad = types.filter((t) => !ALLOWED.includes(String(t).toUpperCase()));
  if (bad.length) throw new UserError(`Unsupported record types: ${bad.join(', ')}.`);
  return dns(host(domain), [...new Set(types.map((t) => t.toUpperCase()))]);
});

tool('domain_registration', 'RDAP (modern WHOIS) registration data: registrar, created/expiry dates, status, nameservers.', {
  properties: { domain: { type: 'string', description: 'Registrable domain, e.g. example.com (not a subdomain).' } }, required: ['domain'],
}, async ({ domain }) => rdap(host(domain)));

tool('ssl_certificate', 'Fetch the TLS certificate a host serves: issuer, validity dates, days remaining, SANs, trust status.', {
  properties: { host: { type: 'string' }, port: { type: 'integer', description: 'Default 443' } }, required: ['host'],
}, async ({ host: h, port = 443 }) => cert(host(h), port));

tool('domain_report', 'One-shot health report for a domain: DNS basics, registration expiry, TLS expiry, with issues flagged.', {
  properties: { domain: { type: 'string' } }, required: ['domain'],
}, async ({ domain }) => {
  const d = host(domain);
  const [dnsR, regR, tlsR] = await Promise.allSettled([dns(d, ['A', 'AAAA', 'MX', 'NS', 'CAA']), rdap(d), cert(d)]);
  const val = (r) => (r.status === 'fulfilled' ? r.value : { error: r.reason?.message || String(r.reason) });
  const issues = [];
  if (dnsR.status === 'fulfilled' && !dnsR.value.records.A?.length && !dnsR.value.records.AAAA?.length) issues.push('No A/AAAA records at apex');
  if (dnsR.status === 'fulfilled' && !dnsR.value.records.MX?.length) issues.push('No MX records (domain cannot receive email)');
  if (regR.status === 'fulfilled' && regR.value.daysUntilExpiry != null && regR.value.daysUntilExpiry < 30) issues.push(`Domain registration expires in ${regR.value.daysUntilExpiry} days`);
  if (tlsR.status === 'fulfilled') {
    if (tlsR.value.daysRemaining < 14) issues.push(`TLS certificate expires in ${tlsR.value.daysRemaining} days`);
    if (!tlsR.value.authorized) issues.push(`TLS certificate not trusted: ${tlsR.value.authorizationError}`);
  } else issues.push(`TLS check failed: ${tlsR.reason?.message}`);
  return { domain: d, dns: val(dnsR), registration: val(regR), tls: val(tlsR), issues, checkedAt: new Date().toISOString() };
});

startServer();
