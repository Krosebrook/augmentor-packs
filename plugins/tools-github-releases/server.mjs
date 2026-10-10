#!/usr/bin/env node
// github-releases — releases, latest release and changelog between two tags via api.github.com (optional GITHUB_TOKEN).
//
// Data shapes returned by tools:
//   Release   = { tag, name, publishedAt, prerelease, draft, author, url, notes }
//   Changelog = { repo, base, head, status, aheadBy, totalCommits, commits: [{ sha, title, author, date, prNumber }],
//                 pullRequests: [number], releases: [Release], compareUrl, truncated, source }
const SERVER_NAME = 'github-releases';
const SERVER_VERSION = '1.1.0';
const SERVER_INSTRUCTIONS = 'Without GITHUB_TOKEN GitHub allows 60 requests/hour per IP; set a token for private repos or higher limits.';
const SECRET_VARS = ['GITHUB_TOKEN'];
const BASE = 'https://api.github.com';
const SOURCE = 'GitHub REST API';
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

const gh = (path) => {
  const h = { accept: 'application/vnd.github+json', 'x-github-api-version': '2022-11-28', 'user-agent': 'agent-plugins-github-releases/0.1.0' };
  const tok = env('GITHUB_TOKEN');
  if (tok) h.authorization = `Bearer ${tok}`;
  return http(`${BASE}${path}`, { headers: h, label: 'GitHub' });
};
const repoPath = (owner, repo) => {
  if (!/^[\w.-]+$/.test(owner) || !/^[\w.-]+$/.test(repo)) throw new UserError('owner and repo must be plain GitHub names, e.g. owner="vercel" repo="next.js".');
  return `/repos/${owner}/${repo}`;
};
const clip = (s, n) => (s && s.length > n ? s.slice(0, n) + `… [${s.length - n} more chars]` : s ?? '');
const toRelease = (r, notesChars = 2000) => ({
  tag: r.tag_name, name: r.name || r.tag_name, publishedAt: r.published_at, prerelease: r.prerelease, draft: r.draft,
  author: r.author?.login ?? null, url: r.html_url, notes: clip(r.body, notesChars),
});
const repoArgs = { owner: { type: 'string', description: 'Repository owner, e.g. "vercel".' }, repo: { type: 'string', description: 'Repository name, e.g. "next.js".' } };

tool('github_list_releases', 'List recent releases of a GitHub repository (newest first).', {
  properties: { ...repoArgs, limit: { type: 'integer', description: '1-100, default 10.' }, include_prereleases: { type: 'boolean', description: 'Default true.' } },
  required: ['owner', 'repo'],
}, async ({ owner, repo, limit = 10, include_prereleases = true }) => {
  const { data } = await gh(`${repoPath(owner, repo)}/releases${qs({ per_page: Math.min(Math.max(limit, 1), 100) })}`);
  const releases = data.filter((r) => include_prereleases || !r.prerelease).map((r) => toRelease(r, 500));
  return { repo: `${owner}/${repo}`, count: releases.length, releases, source: SOURCE };
});

tool('github_latest_release', 'Get the latest published (non-prerelease) release of a repository with its notes.', {
  properties: repoArgs, required: ['owner', 'repo'],
}, async ({ owner, repo }) => {
  const { data } = await gh(`${repoPath(owner, repo)}/releases/latest`);
  return { repo: `${owner}/${repo}`, ...toRelease(data, 6000), source: SOURCE };
});

tool('github_changelog_between', 'Changelog between two tags/refs: commits, referenced PR numbers, and release notes published in between.', {
  properties: {
    ...repoArgs,
    base: { type: 'string', description: 'Older tag or ref, e.g. v14.0.0' },
    head: { type: 'string', description: 'Newer tag or ref, e.g. v14.1.0' },
    max_commits: { type: 'integer', description: 'Max commits to return (default 100, max 250).' },
  },
  required: ['owner', 'repo', 'base', 'head'],
}, async ({ owner, repo, base, head, max_commits = 100 }) => {
  const rp = repoPath(owner, repo);
  const { data: cmp } = await gh(`${rp}/compare/${encodeURIComponent(base)}...${encodeURIComponent(head)}${qs({ per_page: 250 })}`);
  const all = (cmp.commits || []).slice().reverse(); // newest first
  const commits = all.slice(0, Math.min(Math.max(max_commits, 1), 250)).map((c) => {
    const title = (c.commit?.message || '').split('\n')[0];
    const pr = title.match(/\(#(\d+)\)\s*$/) || title.match(/Merge pull request #(\d+)/);
    return { sha: c.sha.slice(0, 7), title, author: c.author?.login ?? c.commit?.author?.name ?? null, date: c.commit?.author?.date ?? null, prNumber: pr ? +pr[1] : null };
  });
  // Release notes for releases published between base and head commit dates.
  let releases = [];
  try {
    const { data: rels } = await gh(`${rp}/releases${qs({ per_page: 100 })}`);
    const byTag = Object.fromEntries(rels.map((r) => [r.tag_name, r]));
    const lo = byTag[base]?.published_at ?? cmp.merge_base_commit?.commit?.committer?.date;
    const hi = byTag[head]?.published_at ?? all[0]?.commit?.committer?.date;
    if (lo && hi) releases = rels.filter((r) => r.published_at && r.published_at > lo && r.published_at <= hi && !r.draft).map((r) => toRelease(r, 1500));
  } catch { /* releases are optional context */ }
  return {
    repo: `${owner}/${repo}`, base, head, status: cmp.status, aheadBy: cmp.ahead_by, totalCommits: cmp.total_commits,
    commits, pullRequests: [...new Set(commits.map((c) => c.prNumber).filter(Boolean))],
    releases, compareUrl: cmp.html_url, truncated: cmp.total_commits > commits.length, source: SOURCE,
  };
});

startServer();
