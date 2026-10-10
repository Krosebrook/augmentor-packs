---
name: business-days
description: "Use when the user asks about public holidays in a country, whether a date is a working day, or needs deadlines/SLAs computed in business days. Backed by the holidays-nager MCP tools."
---

# Public holidays & business days

## When to use
Use when the user asks about public holidays in a country, whether a date is a working day, or needs deadlines/SLAs computed in business days.

## Tools (MCP server `holidays-nager`)
- `holidays_list` — All public holidays for a country and year.
- `holidays_next` — Upcoming public holidays for a country in the next 365 days.
- `holidays_countries` — List country codes supported by Nager.Date.
- `business_day_check` — Is a given date a business day in a country (weekend/holiday aware)?
- `business_days_add` — Add (or subtract, with negative n) N business days to a date, skipping weekends and public holidays.
- `business_days_between` — Count business days between two dates (start exclusive, end inclusive), listing holidays skipped.

## Rules
- Call the tools for every factual answer; never invent, estimate or "fill in" API data. If a field is null, say it is unknown.
- If a tool returns `isError`, report the error message plainly and suggest the fix; do not fabricate a fallback answer.
- Mention the data source and the timestamp/date returned by the tool when presenting results.
- No credentials needed.
- Country codes are ISO 3166-1 alpha-2 (US, DE, GB). Subdivisions use ISO 3166-2 (US-CA, DE-BY).
