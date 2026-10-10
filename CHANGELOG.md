# Changelog

All notable changes to this marketplace are documented here. Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Versioning: [semver](https://semver.org/), per plugin. See [docs/releasing.md](docs/releasing.md).

## [Unreleased]

## [1.1.0] - 2026-10-10
### Added
- **healthcare-worker-augmentor 1.1.0:** 7 skills, 4 commands, 2 agents. Covers SBAR/handoff, plain-language patient education, documentation clarity, drug-info question prep (defers to official references and the pharmacist), shift/burnout planning, CE study, and difficult conversations. Not medical advice; no PHI.
- **trades-augmentor 1.1.0:** 8 skills, 5 commands, 2 agents. Covers job scoping, quotes from your rates, customer communication, code-lookup prep (defers to the adopted code and AHJ), safety checklists, invoicing, scheduling, and licensing exam study.
- **job-seeker-augmentor 1.1.0:** 8 skills, 4 commands, 2 agents. Covers resume tailoring without fabrication, STAR stories, interview prep, mock interviews, networking drafts, offer negotiation, an application tracker, and a skills-gap plan.
- **creator-augmentor 1.1.0:** 8 skills, 4 commands, 2 agents. Covers ideation, hooks and scripts, repurposing, an editorial calendar, audience research, sponsorship pitches, analytics review, and voice consistency.
- **parent-caregiver-augmentor 1.1.0:** 9 skills, 5 commands, 2 agents. Covers family logistics, meal planning, a homework coach, school communication, doctor visit prep, aging-parent appointment prep, a care log, benefits/questions checklists, and caregiver self-care.
- Optional key-free MCP tool add-ons, each a separate plugin with a local zero-dependency Node.js stdio server and one skill: **tools-package-health**, **tools-github-releases** (optional `GITHUB_TOKEN` from env), **tools-holidays-nager**, **tools-sec-edgar** (optional `sec_user_agent` userConfig with a default), **tools-domain-checks**.
- `scripts/test_tools.mjs` live stdio test for the tool add-ons; `docs/packs/tools.md`.
- Documentation site under [`docs/`](docs/index.md) and `scripts/check_links.py`.
### Changed
- All plugins bumped to 1.1.0 (the five original packs have no behavior changes; the bump keeps one marketplace version).
- `scripts/validate.py` now fails if an augmentor pack declares MCP servers and checks `tools-*` MCP config (`${CLAUDE_PLUGIN_ROOT}` paths, env values only as `${...}` references, declared `user_config` keys).
- Docs updated for 15 plugins: index, README, guardrails, FAQ, roadmap, installation.

## [1.0.0] - 2026-10-10
### Added
- `augmentor-packs` marketplace catalog (`.claude-plugin/marketplace.json`).
- **student-augmentor 1.0.0:** 8 skills, 5 commands, 2 agents.
- **office-augmentor 1.0.0:** 8 skills, 5 commands, 2 agents.
- **ai-transition-builder 1.0.0:** 9 skills, 5 commands, 2 agents.
- **educator-augmentor 1.0.0:** 8 skills, 5 commands, 2 agents.
- **solo-founder-augmentor 1.0.0:** 9 skills, 5 commands, 2 agents.
- `scripts/validate.py` offline validator.
