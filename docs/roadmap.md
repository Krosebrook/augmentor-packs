# Roadmap

This is a two-week launch plan. It's a working plan, not a promise. Nothing is pushed, published, or submitted anywhere without the owner's (Kyle's) explicit approval.

## Days 1–2: Ship the repo
- [ ] Final review of all five packs and these docs.
- [ ] `claude plugin validate --strict .`, `python3 scripts/validate.py`, and `python3 scripts/check_links.py` all pass.
- [x] With owner approval, create `Krosebrook/augmentor-packs` on GitHub, push, and tag the first public release (`v1.1.0`).
- [ ] Do a fresh-machine install test with `/plugin marketplace add Krosebrook/augmentor-packs` and each `/plugin install <name>@augmentor-packs`.

## Days 3–5: Dogfood and v1.1
- [ ] Use each pack on real tasks. Log trigger misses (a skill didn't load when it should have), guardrail slips, and confusing output.
- [ ] Tighten skill descriptions and triggers, and fix bugs. Treat guardrail failures as release blockers.
- [ ] Release v1.1.0 (minor) or patch versions per pack following [releasing](releasing.md), with changelog entries.

## Days 6–7: Key-free MCP tools (done in v1.1.0)
Ported five MCP server plugins from `/workspace/api-plugins` that need no API keys:

| Tool package | What it does | Auth |
|---|---|---|
| `package-health` | npm/PyPI metadata, maintenance signals, OSV.dev vulnerabilities, health verdict | none |
| `github-releases` | List releases, latest notes, changelog between tags | none (optional `GITHUB_TOKEN` for rate limits) |
| `holidays-nager` | Public holidays (Nager.Date) and business-day math | none |
| `sec-edgar` | SEC EDGAR filings and key financials | none (requires a User-Agent setting) |
| `domain-checks` | DNS (Cloudflare DoH), RDAP registration/expiry, TLS cert expiry | none |

Notes:
- Shipped as `tools-<name>` plugins in v1.1.0. See [tool add-ons](packs/tools.md). They were adapted to Claude Code's plugin layout (`.mcp.json` / `mcpServers`, `${CLAUDE_PLUGIN_ROOT}`) and validated with `claude plugin validate --strict`.
- They're the only plugins that include MCP servers and run code. They ship separately from the augmentor packs, document their network calls, and are covered in [guardrails](guardrails.md) and [FAQ](faq.md).
- Candidate pairings: `package-health` and `github-releases` with ai-transition-builder workflows; `holidays-nager` with office/educator planning; `sec-edgar` and `domain-checks` with solo-founder research.

## v1.1.0: Five new augmentor packs (done)
- [x] healthcare-worker-augmentor, trades-augmentor, job-seeker-augmentor, creator-augmentor, parent-caregiver-augmentor.
- [ ] Dogfood each new pack on real tasks; log trigger misses and guardrail slips. Healthcare and parent-caregiver guardrail failures are release blockers.
- [ ] Consider review by a practicing nurse and a licensed tradesperson for the healthcare and trades packs.

## v1.2.0: Designer, engineer, and consultant packs (done)
- [x] designer-augmentor, engineer-augmentor, consultant-augmentor (adapted from the owner's own generic skills, scrubbed of brand and client details).
- [ ] Dogfood each on real tasks; log trigger misses and guardrail slips.

## v1.3.0: Beginner track (done)
- [x] ai-beginner-augmentor (8 skills, 5 commands, 2 agents) for people brand new to AI.
- [x] Beginner docs in `docs/beginners/` (getting started, first 10 minutes, glossary, troubleshooting), checked against code.claude.com.
- [x] Beginner / Intermediate / Advanced level on the docs index and every pack page.
- [ ] Test the getting-started guide with a few true beginners (different backgrounds) and fix every place they got stuck.
- [ ] Re-check install steps against code.claude.com each release; the UI changes often.

## Week 2: Listing and outreach
- [ ] Write listing copy (marketplace descriptions, repo description, short pitch). It must be accurate, with no invented stats or testimonials.
- [ ] Record demo GIFs of one core workflow per pack.
- [ ] **Only after owner approval:** submit to awesome-claude-code and community plugin directories.

## After launch: 30-day metrics
- [ ] Track only signals we can actually observe: GitHub stars, forks, and issues, install reports, and issue themes. Don't report numbers we don't have.
- [ ] Day-30 review to decide what to deepen, cut, or split.
- [ ] Possibly explore premium editions (e.g. deeper packs or org-specific variants) based on that review. This hasn't been decided.

[← Back to docs index](index.md)
