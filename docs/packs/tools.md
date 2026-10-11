# Tool add-ons (optional MCP plugins)

These five plugins are **optional** and separate from the augmentor packs. Each one runs a small local Node.js MCP server over stdio (zero npm dependencies, Node.js 18+) and calls a public, key-free API. They give Claude live data. The augmentor packs never require them and stay MCP-free.

Version 1.3.0 · License MIT

**Level: Intermediate** ([what levels mean](../index.md#levels)). Needs Node.js 18+ installed and some comfort checking `/mcp` when a server doesn't connect.

## Install

```
/plugin marketplace add Krosebrook/augmentor-packs
/plugin install tools-package-health@augmentor-packs
```

Then run `/reload-plugins` and check `/mcp` to confirm the server connected. Each plugin also ships one skill that tells Claude when to use the tools and to report data only as returned.

## What they can and can't do

- **Can:** make read-only HTTPS requests to the hosts listed below and return JSON with its source.
- **Can't:** send messages, write files, post anywhere, or read your project files. No telemetry.
- **Secrets:** none are needed or committed. See configuration notes for `tools-github-releases` and `tools-sec-edgar`.

## tools-domain-checks

Optional MCP tool add-on: DNS records via Cloudflare DNS-over-HTTPS, RDAP registration and expiry, and TLS certificate expiry for a domain. No API key.

**Tools:**

- `dns_lookup` — Resolve DNS records for a domain via Cloudflare DoH (A, AAAA, CNAME, MX, NS, TXT, SOA, CAA, SRV, HTTPS).
- `domain_registration` — RDAP (modern WHOIS) registration data: registrar, created/expiry dates, status, nameservers.
- `ssl_certificate` — Fetch the TLS certificate a host serves: issuer, validity dates, days remaining, SANs, trust status.
- `domain_report` — One-shot health report for a domain: DNS basics, registration expiry, TLS expiry, with issues flagged.

**Network:** Calls only: `cloudflare-dns.com` (DoH), RDAP servers via the IANA bootstrap (`data.iana.org`, registry RDAP servers, `rdap.org` fallback), and a direct TLS handshake to the domain on port 443. No telemetry, no writes, no data stored on disk.

**Pairs well with:** solo-founder-augmentor (launch checks), creator-augmentor (site/newsletter domains).

Source: [`plugins/tools-domain-checks`](../../plugins/tools-domain-checks) · [README](../../plugins/tools-domain-checks/README.md)

## tools-github-releases

Optional MCP tool add-on: list GitHub releases, read the latest release notes, and build a changelog between two tags via api.github.com. No key required; an optional GITHUB_TOKEN from your environment raises rate limits.

**Tools:**

- `github_list_releases` — List recent releases of a GitHub repository (newest first).
- `github_latest_release` — Get the latest published (non-prerelease) release of a repository with its notes.
- `github_changelog_between` — Changelog between two tags/refs: commits, referenced PR numbers, and release notes published in between.

**Network:** Calls only: `api.github.com`. No telemetry, no writes, no data stored on disk.

**Configuration:** Works without credentials (GitHub allows 60 unauthenticated requests/hour per IP). For higher limits or private repos, **export `GITHUB_TOKEN` in the shell that launches Claude Code** — e.g. a fine-grained token with read-only *Contents* access. `.mcp.json` passes it through as `${GITHUB_TOKEN:-}` (empty if unset), and the server redacts the token from any error text.

Never put a token in this repo, in `.mcp.json`, or in a commit.

**Pairs well with:** ai-transition-builder (upgrades, release notes).

Source: [`plugins/tools-github-releases`](../../plugins/tools-github-releases) · [README](../../plugins/tools-github-releases/README.md)

## tools-holidays-nager

Optional MCP tool add-on: public holidays by country (Nager.Date) and business-day math (is it a working day, add N business days, count business days between dates). No API key.

**Tools:**

- `holidays_list` — All public holidays for a country and year.
- `holidays_next` — Upcoming public holidays for a country in the next 365 days.
- `holidays_countries` — List country codes supported by Nager.Date.
- `business_day_check` — Is a given date a business day in a country (weekend/holiday aware)?
- `business_days_add` — Add (or subtract, with negative n) N business days to a date, skipping weekends and public holidays.
- `business_days_between` — Count business days between two dates (start exclusive, end inclusive), listing holidays skipped.

**Network:** Calls only: `date.nager.at`. No telemetry, no writes, no data stored on disk.

**Pairs well with:** office-augmentor and educator-augmentor (deadlines, planning), trades-augmentor (scheduling).

Source: [`plugins/tools-holidays-nager`](../../plugins/tools-holidays-nager) · [README](../../plugins/tools-holidays-nager/README.md)

## tools-package-health

Optional MCP tool add-on: npm and PyPI package metadata, maintenance signals, and known vulnerabilities from OSV.dev, plus a one-shot health verdict. No API key. Runs a local zero-dependency Node.js stdio server.

**Tools:**

- `package_info` — Metadata for an npm or PyPI package: latest version, license, last publish date, downloads, deprecation.
- `package_vulnerabilities` — Known vulnerabilities (OSV.dev) for a package, optionally for one specific version.
- `package_health` — One-shot health check: maintenance recency, deprecation, license, popularity and vulns affecting the latest version.

**Network:** Calls only: `registry.npmjs.org`, `api.npmjs.org`, `pypi.org`, `api.osv.dev`. No telemetry, no writes, no data stored on disk.

**Pairs well with:** ai-transition-builder (dependency choices, code review).

Source: [`plugins/tools-package-health`](../../plugins/tools-package-health) · [README](../../plugins/tools-package-health/README.md)

## tools-sec-edgar

Optional MCP tool add-on: look up US public companies on SEC EDGAR — latest filings (10-K, 10-Q, 8-K), key annual financials, and XBRL concept history. No API key; sends a configurable User-Agent as SEC requires.

**Tools:**

- `sec_lookup_company` — Resolve a ticker, CIK or company name to the SEC registrant (CIK, ticker, name).
- `sec_latest_filings` — Most recent SEC filings for a company, optionally filtered by form type (10-K, 10-Q, 8-K, S-1, 4, ...).
- `sec_key_financials` — Latest annual key financials from XBRL company facts (revenue, net income, EPS, assets, cash, ...).
- `sec_concept_history` — Annual history of one XBRL concept for a company (e.g. us-gaap:Revenues).

**Network:** Calls only: `www.sec.gov` (company ticker list), `data.sec.gov`. No telemetry, no writes, no data stored on disk.

**Configuration:** SEC asks automated clients to send a descriptive User-Agent with contact information (see SEC's "Accessing EDGAR Data" fair-access guidance). This plugin declares one optional, non-sensitive option:

| Option | Default | Where it goes |
|---|---|---|
| `sec_user_agent` | `augmentor-packs-sec-edgar/1.1.0 (Claude Code plugin; set sec_user_agent to your name and contact email)` | `SEC_USER_AGENT` env var of the MCP server, via `${user_config.sec_user_agent}` in `.mcp.json` |

Set it when you enable the plugin, or later from `/config`, to something like `Jane Doe Research jane@example.com`. The value is stored in your Claude Code settings (`pluginConfigs`), never in this repo. Keep requests modest (SEC limit: 10 requests/second). On install, Claude Code may print "1 userConfig option not yet set" for this plugin. That is informational: if you never set it, the server falls back to the built-in default User-Agent above.

**Pairs well with:** solo-founder-augmentor (market and competitor research), job-seeker-augmentor (company research).

Source: [`plugins/tools-sec-edgar`](../../plugins/tools-sec-edgar) · [README](../../plugins/tools-sec-edgar/README.md)

## Testing

`node scripts/test_tools.mjs` launches each server exactly as `.mcp.json` declares it and runs `initialize`, `tools/list`, and one live `tools/call`.

---
[← Back to docs index](../index.md)
