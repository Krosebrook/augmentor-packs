# tools-holidays-nager

Optional MCP tool add-on: public holidays by country (Nager.Date) and business-day math (is it a working day, add N business days, count business days between dates). No API key.

**This is an optional tool add-on, not an augmentor pack.** It runs a small local Node.js process (MCP stdio server, zero npm dependencies) and makes outbound HTTPS requests. The augmentor packs work fine without it.

## Install
```
/plugin marketplace add <path-to-claude-packs-or-Krosebrook/augmentor-packs>
/plugin install tools-holidays-nager@augmentor-packs
```
Requires Node.js 18+ on your PATH. Check it connected with `/mcp` (server name `holidays-nager`).

## What it provides
- MCP server `holidays-nager` (declared in [`.mcp.json`](.mcp.json), launched as `node ${CLAUDE_PLUGIN_ROOT}/server.mjs`)
- Skill: `business-days` — tells Claude when to use the tools and to report data only as returned

### Tools
- `holidays_list` — All public holidays for a country and year.
- `holidays_next` — Upcoming public holidays for a country in the next 365 days.
- `holidays_countries` — List country codes supported by Nager.Date.
- `business_day_check` — Is a given date a business day in a country (weekend/holiday aware)?
- `business_days_add` — Add (or subtract, with negative n) N business days to a date, skipping weekends and public holidays.
- `business_days_between` — Count business days between two dates (start exclusive, end inclusive), listing holidays skipped.

## Network access
Calls only: `date.nager.at`. No telemetry, no writes, no data stored on disk.


## Pairs well with
office-augmentor and educator-augmentor (deadlines, planning), trades-augmentor (scheduling).

## Principles
Tools return data with its source; the skill instructs Claude never to invent or "fill in" values and to report tool errors plainly.
