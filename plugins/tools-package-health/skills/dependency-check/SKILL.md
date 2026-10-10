---
name: dependency-check
description: "Use before adding or upgrading an npm or Python dependency, or when the user asks whether a package is maintained, deprecated, popular, or has known vulnerabilities (CVE/GHSA). Backed by the package-health MCP tools."
---

# Package health (npm, PyPI, OSV)

## When to use
Use before adding or upgrading an npm or Python dependency, or when the user asks whether a package is maintained, deprecated, popular, or has known vulnerabilities (CVE/GHSA).

## Tools (MCP server `package-health`)
- `package_info` — Metadata for an npm or PyPI package: latest version, license, last publish date, downloads, deprecation.
- `package_vulnerabilities` — Known vulnerabilities (OSV.dev) for a package, optionally for one specific version.
- `package_health` — One-shot health check: maintenance recency, deprecation, license, popularity and vulns affecting the latest version.

## Rules
- Call the tools for every factual answer; never invent, estimate or "fill in" API data. If a field is null, say it is unknown.
- If a tool returns `isError`, report the error message plainly and suggest the fix; do not fabricate a fallback answer.
- Mention the data source and the timestamp/date returned by the tool when presenting results.
- No credentials needed.
- Supports ecosystems "npm" and "pypi". Health verdicts are heuristics from public signals, not a security audit.
