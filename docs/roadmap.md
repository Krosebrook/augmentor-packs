# Roadmap

This is a two-week launch plan. It's a working plan, not a promise. Nothing is pushed, published, or submitted anywhere without the owner's (Kyle's) explicit approval.

## Days 1–2: Ship the repo
- [ ] Final review of all five packs and these docs.
- [ ] `claude plugin validate --strict .`, `python3 scripts/validate.py`, and `python3 scripts/check_links.py` all pass.
- [ ] With owner approval, create `Krosebrook/augmentor-packs` on GitHub, push, and tag `v1.0.0`.
- [ ] Do a fresh-machine install test with `/plugin marketplace add Krosebrook/augmentor-packs` and each `/plugin install <name>@augmentor-packs`.

## Days 3–5: Dogfood and v1.1
- [ ] Use each pack on real tasks. Log trigger misses (a skill didn't load when it should have), guardrail slips, and confusing output.
- [ ] Tighten skill descriptions and triggers, and fix bugs. Treat guardrail failures as release blockers.
- [ ] Release v1.1.0 (minor) or patch versions per pack following [releasing](releasing.md), with changelog entries.

## Days 6–7: Key-free MCP tools
Port five MCP server plugins from `/workspace/api-plugins` that need no API keys:

| Tool package | What it does | Auth |
|---|---|---|
| `package-health` | npm/PyPI metadata, maintenance signals, OSV.dev vulnerabilities, health verdict | none |
| `github-releases` | List releases, latest notes, changelog between tags | none (optional `GITHUB_TOKEN` for rate limits) |
| `holidays-nager` | Public holidays (Nager.Date) and business-day math | none |
| `sec-edgar` | SEC EDGAR filings and key financials | none (requires a User-Agent setting) |
| `domain-checks` | DNS (Cloudflare DoH), RDAP registration/expiry, TLS cert expiry | none |

Notes:
- These are currently packaged in a different manifest format (`plugin.json` + `mcp.json` with `${PLUGIN_ROOT}`). They need to be adapted to Claude Code's plugin layout (`.mcp.json` / `mcpServers`, `${CLAUDE_PLUGIN_ROOT}`) and validated with `claude plugin validate --strict`.
- They will be the first plugins in this marketplace that include MCP servers and run code, which changes the "pure skills/commands/agents" statement. Ship them as separate plugins (not inside the existing augmentor packs), document what network calls they make, and update [guardrails](guardrails.md) and [FAQ](faq.md).
- Candidate pairings: `package-health` and `github-releases` with ai-transition-builder workflows; `holidays-nager` with office/educator planning; `sec-edgar` and `domain-checks` with solo-founder research.

## Week 2: Listing and outreach
- [ ] Write listing copy (marketplace descriptions, repo description, short pitch). It must be accurate, with no invented stats or testimonials.
- [ ] Record demo GIFs of one core workflow per pack.
- [ ] **Only after owner approval:** submit to awesome-claude-code and community plugin directories.

## After launch: 30-day metrics
- [ ] Track only signals we can actually observe: GitHub stars, forks, and issues, install reports, and issue themes. Don't report numbers we don't have.
- [ ] Day-30 review to decide what to deepen, cut, or split.
- [ ] Possibly explore premium editions (e.g. deeper packs or org-specific variants) based on that review. This hasn't been decided.

[← Back to docs index](index.md)
