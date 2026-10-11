# Changelog

All notable changes to this marketplace are documented here. Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Versioning: [semver](https://semver.org/), per plugin. See [docs/releasing.md](docs/releasing.md).

## [Unreleased]

## [1.3.0] - 2026-10-10
### Added
- **ai-beginner-augmentor 1.3.0:** 8 skills, 5 commands, 2 agents for people brand new to AI and Claude. Covers a first-week tour, asking clear questions, checking answers and spotting hallucinations, privacy basics, picking a pack, breaking messy tasks into steps, practice exercises with feedback, and a plain-words glossary. Commands: `start`, `ask-better`, `check-this`, `which-pack`, `practice`. Agents (read-only): `friendly-explainer`, `answer-checker`.
- Beginner docs in `docs/beginners/`: getting started (what Claude Code, plugins, and marketplaces are; installing Claude Code; adding this marketplace; installing a first pack; checked against code.claude.com on 2026-10-10), first 10 minutes (guided first session per audience), glossary, and troubleshooting for beginners.
- "New to AI? Start here" links at the top of the README and docs index.
- Beginner / Intermediate / Advanced **Level** column on the README and docs index pack tables, a Levels explanation, and a Level line on every pack page (including tool add-ons).
- New pack doc: `docs/packs/ai-beginner-augmentor.md`.
### Changed
- All plugins bumped to 1.3.0 (existing packs have no behavior changes; the bump keeps one marketplace version).
- Guardrails, FAQ, roadmap, and installation docs updated for the beginner track; docs index now links the designer, engineer, and consultant pack pages.

## [1.2.0] - 2026-10-10
### Added
- **designer-augmentor 1.2.0:** 7 skills, 4 commands, 2 agents. Covers design briefs before visuals, heuristic UX review, WCAG 2.2 AA checks, design-token advice, usability test planning, generic-AI-look detection, and motion/interaction review.
- **engineer-augmentor 1.2.0:** 8 skills, 4 commands, 2 agents. Covers hypothesis-driven debugging, failing-test triage, logic audits, review-feedback planning, adversarial Bash/PowerShell review, pre-build specs, task decomposition, and client-side key exposure checks.
- **consultant-augmentor 1.2.0:** 7 skills, 4 commands, 2 agents. Covers use-case discovery and scoring, engagement scoping, transparent ROI models, workshop design, survey design, audience-tiered rewrites, and adversarial recommendation review.
- New pack docs: `docs/packs/designer-augmentor.md`, `engineer-augmentor.md`, `consultant-augmentor.md`.
### Changed
- All plugins bumped to 1.2.0 (existing packs have no behavior changes; the bump keeps one marketplace version).
- Docs updated for 18 plugins: index, README, guardrails (new integrity rules and placeholders), FAQ, roadmap.

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
