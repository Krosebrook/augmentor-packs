#!/usr/bin/env node
// Live stdio smoke test for the optional tools-* MCP plugins: initialize -> tools/list -> one tools/call each.
// Makes real outbound HTTPS requests. Expands ${CLAUDE_PLUGIN_ROOT}, userConfig defaults, and ${VAR:-default} like Claude Code does.
import { spawn } from 'node:child_process';
import { readFileSync } from 'node:fs';
const R = new URL('../plugins', import.meta.url).pathname;
const cases = {
 'package-health': ['package_health', { ecosystem: 'npm', name: 'express' }],
 'github-releases': ['github_latest_release', { owner: 'nodejs', repo: 'node' }],
 'holidays-nager': ['business_days_add', { start: '2026-12-22', days: 5, country: 'US' }],
 'sec-edgar': ['sec_key_financials', { company: 'AAPL' }],
 'domain-checks': ['domain_report', { domain: 'github.com' }],
};
for (const [slug, [tool, args]] of Object.entries(cases)) {
  const dir = `${R}/tools-${slug}`;
  const pj = JSON.parse(readFileSync(`${dir}/.claude-plugin/plugin.json`));
  const s = JSON.parse(readFileSync(`${dir}/.mcp.json`)).mcpServers[slug];
  const env = { PATH: process.env.PATH, HOME: process.env.HOME };
  for (const [k, v] of Object.entries(s.env || {})) env[k] = v.replace(/\$\{user_config\.(\w+)\}/g, (_, key) => pj.userConfig[key].default).replace(/\$\{(\w+):-([^}]*)\}/g, (_, n, d) => process.env[n] ?? d);
  const p = spawn(s.command, s.args.map((a) => a.replaceAll('${CLAUDE_PLUGIN_ROOT}', dir)), { env, stdio: ['pipe', 'pipe', 'pipe'] });
  const pending = new Map(); let buf = '';
  p.stdout.on('data', (d) => { buf += d; let i; while ((i = buf.indexOf('\n')) >= 0) { const l = buf.slice(0, i); buf = buf.slice(i + 1); const m = JSON.parse(l); pending.get(m.id)?.(m); } });
  let id = 0; const rpc = (method, params) => new Promise((res) => { const n = ++id; pending.set(n, res); p.stdin.write(JSON.stringify({ jsonrpc: '2.0', id: n, method, params }) + '\n'); });
  const init = await rpc('initialize', { protocolVersion: '2025-06-18', capabilities: {}, clientInfo: { name: 'stdio-test', version: '1' } });
  p.stdin.write(JSON.stringify({ jsonrpc: '2.0', method: 'notifications/initialized' }) + '\n');
  const list = await rpc('tools/list', {});
  const call = await rpc('tools/call', { name: tool, arguments: args });
  p.kill();
  const txt = call.result?.content?.[0]?.text ?? JSON.stringify(call.error);
  console.log(`\n## ${slug}: server ${init.result.serverInfo.name}@${init.result.serverInfo.version} proto ${init.result.protocolVersion}; tools(${list.result.tools.length}): ${list.result.tools.map((t) => t.name).join(', ')}`);
  console.log(`call ${tool} isError=${!!call.result?.isError}: ${txt.slice(0, 900)}`);
}
