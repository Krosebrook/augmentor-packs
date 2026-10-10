---
name: domain-diagnostics
description: "Use when debugging DNS (records, propagation, MX/TXT/SPF), checking when a domain or SSL certificate expires, or finding a domain's registrar/nameservers. Backed by the domain-checks MCP tools."
---

# Domain checks (DNS, RDAP, SSL)

## When to use
Use when debugging DNS (records, propagation, MX/TXT/SPF), checking when a domain or SSL certificate expires, or finding a domain's registrar/nameservers.

## Tools (MCP server `domain-checks`)
- `dns_lookup` — Resolve DNS records for a domain via Cloudflare DoH (A, AAAA, CNAME, MX, NS, TXT, SOA, CAA, SRV, HTTPS).
- `domain_registration` — RDAP (modern WHOIS) registration data: registrar, created/expiry dates, status, nameservers.
- `ssl_certificate` — Fetch the TLS certificate a host serves: issuer, validity dates, days remaining, SANs, trust status.
- `domain_report` — One-shot health report for a domain: DNS basics, registration expiry, TLS expiry, with issues flagged.

## Rules
- Call the tools for every factual answer; never invent, estimate or "fill in" API data. If a field is null, say it is unknown.
- If a tool returns `isError`, report the error message plainly and suggest the fix; do not fabricate a fallback answer.
- Mention the data source and the timestamp/date returned by the tool when presenting results.
- No credentials needed.
- Use for DNS debugging, domain/SSL expiry checks and "who is the registrar" questions.
