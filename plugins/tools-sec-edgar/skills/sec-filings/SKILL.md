---
name: sec-filings
description: "Use when the user asks about a US-listed company's SEC filings, recent 8-K/10-K/10-Q, or reported financials like revenue, net income, EPS or cash. Backed by the sec-edgar MCP tools."
---

# SEC EDGAR

## When to use
Use when the user asks about a US-listed company's SEC filings, recent 8-K/10-K/10-Q, or reported financials like revenue, net income, EPS or cash.

## Tools (MCP server `sec-edgar`)
- `sec_lookup_company` — Resolve a ticker, CIK or company name to the SEC registrant (CIK, ticker, name).
- `sec_latest_filings` — Most recent SEC filings for a company, optionally filtered by form type (10-K, 10-Q, 8-K, S-1, 4, ...).
- `sec_key_financials` — Latest annual key financials from XBRL company facts (revenue, net income, EPS, assets, cash, ...).
- `sec_concept_history` — Annual history of one XBRL concept for a company (e.g. us-gaap:Revenues).

## Rules
- Call the tools for every factual answer; never invent, estimate or "fill in" API data. If a field is null, say it is unknown.
- If a tool returns `isError`, report the error message plainly and suggest the fix; do not fabricate a fallback answer.
- Mention the data source and the timestamp/date returned by the tool when presenting results.
- No credentials needed.
- Data is from SEC EDGAR filings as reported (XBRL). Keep requests modest (SEC limit: 10 req/s).
