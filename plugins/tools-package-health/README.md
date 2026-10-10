# tools-package-health

Optional MCP tool add-on: npm and PyPI package metadata, maintenance signals, and known vulnerabilities from OSV.dev, plus a one-shot health verdict. No API key. Runs a local zero-dependency Node.js stdio server.

**This is an optional tool add-on, not an augmentor pack.** It runs a small local Node.js process (MCP stdio server, zero npm dependencies) and makes outbound HTTPS requests. The augmentor packs work fine without it.

## Install
```
/plugin marketplace add <path-to-claude-packs-or-Krosebrook/augmentor-packs>
/plugin install tools-package-health@augmentor-packs
```
Requires Node.js 18+ on your PATH. Check it connected with `/mcp` (server name `package-health`).

## What it provides
- MCP server `package-health` (declared in [`.mcp.json`](.mcp.json), launched as `node ${CLAUDE_PLUGIN_ROOT}/server.mjs`)
- Skill: `dependency-check` — tells Claude when to use the tools and to report data only as returned

### Tools
- `package_info` — Metadata for an npm or PyPI package: latest version, license, last publish date, downloads, deprecation.
- `package_vulnerabilities` — Known vulnerabilities (OSV.dev) for a package, optionally for one specific version.
- `package_health` — One-shot health check: maintenance recency, deprecation, license, popularity and vulns affecting the latest version.

## Network access
Calls only: `registry.npmjs.org`, `api.npmjs.org`, `pypi.org`, `api.osv.dev`. No telemetry, no writes, no data stored on disk.


## Pairs well with
ai-transition-builder (dependency choices, code review).

## Principles
Tools return data with its source; the skill instructs Claude never to invent or "fill in" values and to report tool errors plainly.
