# tools-domain-checks

Optional MCP tool add-on: DNS records via Cloudflare DNS-over-HTTPS, RDAP registration and expiry, and TLS certificate expiry for a domain. No API key.

**This is an optional tool add-on, not an augmentor pack.** It runs a small local Node.js process (MCP stdio server, zero npm dependencies) and makes outbound HTTPS requests. The augmentor packs work fine without it.

## Install
```
/plugin marketplace add <path-to-claude-packs-or-Krosebrook/augmentor-packs>
/plugin install tools-domain-checks@augmentor-packs
```
Requires Node.js 18+ on your PATH. Check it connected with `/mcp` (server name `domain-checks`).

## What it provides
- MCP server `domain-checks` (declared in [`.mcp.json`](.mcp.json), launched as `node ${CLAUDE_PLUGIN_ROOT}/server.mjs`)
- Skill: `domain-diagnostics` — tells Claude when to use the tools and to report data only as returned

### Tools
- `dns_lookup` — Resolve DNS records for a domain via Cloudflare DoH (A, AAAA, CNAME, MX, NS, TXT, SOA, CAA, SRV, HTTPS).
- `domain_registration` — RDAP (modern WHOIS) registration data: registrar, created/expiry dates, status, nameservers.
- `ssl_certificate` — Fetch the TLS certificate a host serves: issuer, validity dates, days remaining, SANs, trust status.
- `domain_report` — One-shot health report for a domain: DNS basics, registration expiry, TLS expiry, with issues flagged.

## Network access
Calls only: `cloudflare-dns.com` (DoH), RDAP servers via the IANA bootstrap (`data.iana.org`, registry RDAP servers, `rdap.org` fallback), and a direct TLS handshake to the domain on port 443. No telemetry, no writes, no data stored on disk.


## Pairs well with
solo-founder-augmentor (launch checks), creator-augmentor (site/newsletter domains).

## Principles
Tools return data with its source; the skill instructs Claude never to invent or "fill in" values and to report tool errors plainly.
