# Augmentor Packs — a Claude Code plugin marketplace

Thirteen Claude Code augmentor packs (plus five optional tool add-ons) built on one idea: **augment the human, don't replace them.** Every pack coaches, scaffolds, checks, and accelerates *your* work — it asks the questions a good mentor would, catches the errors a good reviewer would, and drafts the boring parts for you to own. It doesn't ghostwrite graded work, send messages on your behalf, grade your students, or invent facts and data.

Marketplace name: **`augmentor-packs`** · Owner: Kyle · License: MIT

📖 **Documentation:** [docs/index.md](docs/index.md) — [installation](docs/installation.md) · [packs](docs/index.md#pack-comparison) · [guardrails](docs/guardrails.md) · [contributing](CONTRIBUTING.md) · [releasing](docs/releasing.md) · [roadmap](docs/roadmap.md) · [FAQ](docs/faq.md) · [changelog](CHANGELOG.md)

| Plugin | For | Skills | Commands | Agents |
|---|---|---|---|---|
| [`student-augmentor`](plugins/student-augmentor) | Students (academic-integrity-aware) | 8 | 5 | 2 |
| [`office-augmentor`](plugins/office-augmentor) | Knowledge workers | 8 | 5 | 2 |
| [`ai-transition-builder`](plugins/ai-transition-builder) | Technical folks moving into building with AI | 9 | 5 | 2 |
| [`educator-augmentor`](plugins/educator-augmentor) | Teachers (you stay the grader) | 8 | 5 | 2 |
| [`solo-founder-augmentor`](plugins/solo-founder-augmentor) | Solo founders | 9 | 5 | 2 |
| [`healthcare-worker-augmentor`](plugins/healthcare-worker-augmentor) | Nurses and allied health (not medical advice) | 7 | 4 | 2 |
| [`trades-augmentor`](plugins/trades-augmentor) | Electricians, plumbers, HVAC techs, contractors | 8 | 5 | 2 |
| [`job-seeker-augmentor`](plugins/job-seeker-augmentor) | Job seekers and career changers | 8 | 4 | 2 |
| [`creator-augmentor`](plugins/creator-augmentor) | Content creators | 8 | 4 | 2 |
| [`parent-caregiver-augmentor`](plugins/parent-caregiver-augmentor) | Parents and family caregivers | 9 | 5 | 2 |
| [`designer-augmentor`](plugins/designer-augmentor) | Product, UX, and UI designers | 7 | 4 | 2 |
| [`engineer-augmentor`](plugins/engineer-augmentor) | Software engineers | 8 | 4 | 2 |
| [`consultant-augmentor`](plugins/consultant-augmentor) | Consultants, solutions architects, enablement leads | 7 | 4 | 2 |

No MCP servers, hooks, executables, or API keys in any augmentor pack — every pack is pure skills, commands, and subagents.

### Optional tool add-ons (MCP)
Separate, opt-in plugins that run a local zero-dependency Node.js MCP server (Node 18+) and call public, key-free APIs. Install them only if you want live data; see [docs/packs/tools.md](docs/packs/tools.md).

| Plugin | What it does | Key needed |
|---|---|---|
| [`tools-package-health`](plugins/tools-package-health) | npm/PyPI metadata, OSV vulnerabilities, health verdict | none |
| [`tools-github-releases`](plugins/tools-github-releases) | Releases, latest notes, changelog between tags | none (optional `GITHUB_TOKEN` env var) |
| [`tools-holidays-nager`](plugins/tools-holidays-nager) | Public holidays and business-day math | none |
| [`tools-sec-edgar`](plugins/tools-sec-edgar) | SEC filings, key financials, XBRL history | none (optional `sec_user_agent` option) |
| [`tools-domain-checks`](plugins/tools-domain-checks) | DNS (DoH), RDAP registration/expiry, TLS expiry | none |

## Install

Inside Claude Code:

```
# 1. Add the marketplace — a local path to this directory...
/plugin marketplace add /path/to/claude-packs
#    ...or, once the repo is hosted on GitHub:
/plugin marketplace add Krosebrook/augmentor-packs

# 2. Install any pack: <plugin-name>@<marketplace-name>
/plugin install student-augmentor@augmentor-packs
/plugin install office-augmentor@augmentor-packs
/plugin install ai-transition-builder@augmentor-packs
/plugin install educator-augmentor@augmentor-packs
/plugin install solo-founder-augmentor@augmentor-packs
/plugin install healthcare-worker-augmentor@augmentor-packs
/plugin install trades-augmentor@augmentor-packs
/plugin install job-seeker-augmentor@augmentor-packs
/plugin install creator-augmentor@augmentor-packs
/plugin install parent-caregiver-augmentor@augmentor-packs

# Optional tool add-ons (run local MCP servers)
/plugin install tools-package-health@augmentor-packs   # etc.
```

From a shell, the equivalent CLI commands are `claude plugin marketplace add <path-or-owner/repo>` and `claude plugin install <name>@augmentor-packs`. Run `/reload-plugins` (or start a new session) after installing.

## Using a pack
- **Skills** load automatically when your request matches their description, or run one directly as `/<plugin>:<skill>` (e.g. `/student-augmentor:socratic-tutor`).
- **Commands** are explicit shortcuts: `/<plugin>:<command> [args]` (e.g. `/office-augmentor:triage-inbox inbox.txt`).
- **Agents** are subagents Claude can delegate to, or you can call them with `@agent-<plugin>:<agent>` (e.g. `@agent-ai-transition-builder:ai-code-reviewer`).

## Layout

```
claude-packs/
├── .claude-plugin/marketplace.json   # marketplace catalog
├── plugins/
│   └── <plugin>/
│       ├── .claude-plugin/plugin.json
│       ├── skills/<skill>/SKILL.md
│       ├── commands/*.md
│       ├── agents/*.md
│       ├── .mcp.json + server.mjs   # tools-* plugins only
│       └── README.md
├── docs/                            # documentation
├── scripts/validate.py              # offline schema/frontmatter checks
├── scripts/check_links.py           # relative-link checker
├── scripts/test_tools.mjs           # live stdio test of the tools-* MCP servers
├── CHANGELOG.md
├── LICENSE
└── README.md
```

## Validate

```
claude plugin validate .                       # marketplace + every plugin.json
claude plugin validate ./plugins/<plugin>      # one plugin, including skills/agents/commands
python3 scripts/validate.py                    # offline checks (no Claude Code needed)
python3 scripts/check_links.py                 # relative Markdown links
node scripts/test_tools.mjs                    # live MCP stdio test (network)
```

## Design principles
1. **You do the thinking; the pack sequences it.** Hints before answers, feedback before rewrites, questions before plans.
2. **No invented facts.** Sources, standards, statistics, testimonials, and figures come from you; gaps are marked (`[CHECK]`, `[DATA NEEDED]`, `[verify]`).
3. **Drafts, not actions.** Nothing is sent, posted, or graded on your behalf.
4. **Opinionated defaults, stated plainly** — and easy to override.
5. **Not professional advice.** Legal, tax, HR, and medical questions go to qualified people.
