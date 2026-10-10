# tools-sec-edgar

Optional MCP tool add-on: look up US public companies on SEC EDGAR — latest filings (10-K, 10-Q, 8-K), key annual financials, and XBRL concept history. No API key; sends a configurable User-Agent as SEC requires.

**This is an optional tool add-on, not an augmentor pack.** It runs a small local Node.js process (MCP stdio server, zero npm dependencies) and makes outbound HTTPS requests. The augmentor packs work fine without it.

## Install
```
/plugin marketplace add <path-to-claude-packs-or-Krosebrook/augmentor-packs>
/plugin install tools-sec-edgar@augmentor-packs
```
Requires Node.js 18+ on your PATH. Check it connected with `/mcp` (server name `sec-edgar`).

## What it provides
- MCP server `sec-edgar` (declared in [`.mcp.json`](.mcp.json), launched as `node ${CLAUDE_PLUGIN_ROOT}/server.mjs`)
- Skill: `sec-filings` — tells Claude when to use the tools and to report data only as returned

### Tools
- `sec_lookup_company` — Resolve a ticker, CIK or company name to the SEC registrant (CIK, ticker, name).
- `sec_latest_filings` — Most recent SEC filings for a company, optionally filtered by form type (10-K, 10-Q, 8-K, S-1, 4, ...).
- `sec_key_financials` — Latest annual key financials from XBRL company facts (revenue, net income, EPS, assets, cash, ...).
- `sec_concept_history` — Annual history of one XBRL concept for a company (e.g. us-gaap:Revenues).

## Network access
Calls only: `www.sec.gov` (company ticker list), `data.sec.gov`. No telemetry, no writes, no data stored on disk.

## Configuration
SEC asks automated clients to send a descriptive User-Agent with contact information (see SEC's "Accessing EDGAR Data" fair-access guidance). This plugin declares one optional, non-sensitive option:

| Option | Default | Where it goes |
|---|---|---|
| `sec_user_agent` | `augmentor-packs-sec-edgar/1.1.0 (Claude Code plugin; set sec_user_agent to your name and contact email)` | `SEC_USER_AGENT` env var of the MCP server, via `${user_config.sec_user_agent}` in `.mcp.json` |

Set it when you enable the plugin, or later from `/config`, to something like `Jane Doe Research jane@example.com`. The value is stored in your Claude Code settings (`pluginConfigs`), never in this repo. Keep requests modest (SEC limit: 10 requests/second). On install, Claude Code may print "1 userConfig option not yet set" for this plugin. That is informational: if you never set it, the server falls back to the built-in default User-Agent above.

## Pairs well with
solo-founder-augmentor (market and competitor research), job-seeker-augmentor (company research).

## Principles
Tools return data with its source; the skill instructs Claude never to invent or "fill in" values and to report tool errors plainly.
