# Augmentor Packs — a Claude Code plugin marketplace

Five Claude Code plugins built on one idea: **augment the human, don't replace them.** Every pack coaches, scaffolds, checks, and accelerates *your* work — it asks the questions a good mentor would, catches the errors a good reviewer would, and drafts the boring parts for you to own. It doesn't ghostwrite graded work, send messages on your behalf, grade your students, or invent facts and data.

Marketplace name: **`augmentor-packs`** · Owner: Kyle · License: MIT

| Plugin | For | Skills | Commands | Agents |
|---|---|---|---|---|
| [`student-augmentor`](plugins/student-augmentor) | Students (academic-integrity-aware) | 8 | 5 | 2 |
| [`office-augmentor`](plugins/office-augmentor) | Knowledge workers | 8 | 5 | 2 |
| [`ai-transition-builder`](plugins/ai-transition-builder) | Technical folks moving into building with AI | 9 | 5 | 2 |
| [`educator-augmentor`](plugins/educator-augmentor) | Teachers (you stay the grader) | 8 | 5 | 2 |
| [`solo-founder-augmentor`](plugins/solo-founder-augmentor) | Solo founders | 9 | 5 | 2 |

No MCP servers, hooks, executables, or API keys — every pack is pure skills, commands, and subagents.

## Install

Inside Claude Code:

```
# 1. Add the marketplace — a local path to this directory...
/plugin marketplace add /path/to/claude-packs
#    ...or, once the repo is hosted on GitHub:
/plugin marketplace add <github-owner>/<repo>

# 2. Install any pack: <plugin-name>@<marketplace-name>
/plugin install student-augmentor@augmentor-packs
/plugin install office-augmentor@augmentor-packs
/plugin install ai-transition-builder@augmentor-packs
/plugin install educator-augmentor@augmentor-packs
/plugin install solo-founder-augmentor@augmentor-packs
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
│       └── README.md
├── scripts/validate.py              # offline schema/frontmatter checks
├── LICENSE
└── README.md
```

## Validate

```
claude plugin validate .                       # marketplace + every plugin.json
claude plugin validate ./plugins/<plugin>      # one plugin, including skills/agents/commands
python3 scripts/validate.py                    # offline checks (no Claude Code needed)
```

## Design principles
1. **You do the thinking; the pack sequences it.** Hints before answers, feedback before rewrites, questions before plans.
2. **No invented facts.** Sources, standards, statistics, testimonials, and figures come from you; gaps are marked (`[CHECK]`, `[DATA NEEDED]`, `[verify]`).
3. **Drafts, not actions.** Nothing is sent, posted, or graded on your behalf.
4. **Opinionated defaults, stated plainly** — and easy to override.
5. **Not professional advice.** Legal, tax, HR, and medical questions go to qualified people.
