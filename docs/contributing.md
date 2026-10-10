# Contributing

## Repo layout

```
.claude-plugin/marketplace.json      # catalog: one entry per plugin
plugins/<pack>/.claude-plugin/plugin.json
plugins/<pack>/skills/<skill>/SKILL.md
plugins/<pack>/commands/<command>.md
plugins/<pack>/agents/<agent>.md
plugins/<pack>/README.md
scripts/validate.py                  # offline checks
scripts/check_links.py               # relative-link checker for Markdown
```

## Adding a skill

1. Create `plugins/<pack>/skills/<skill-name>/SKILL.md`. Use a kebab-case directory name.
2. Frontmatter must start on line 1:
   ```yaml
   ---
   name: skill-name            # must equal the directory name
   description: Use when ... # what triggers it + what it does
   ---
   ```
3. Write the description as a trigger: start with "Use when…", include phrases users actually type, and state the guardrail (e.g. "never ghostwrites"). Keep `description` + `when_to_use` under 1536 characters, or the listing gets truncated.
4. The skill name must not match a command name in the same pack.
5. Add it to the pack README and to `docs/packs/<pack>.md` with a when-to-use line and an example prompt.

## Adding a command

1. Create `plugins/<pack>/commands/<command>.md`. The file name becomes the command (`/<pack>:<command>`).
2. Frontmatter supports `description` (required) and `argument-hint`. Do **not** add `name`, because command files don't support it.
3. Keep commands thin: hand off to a skill ("Use the assessment-builder skill…") instead of duplicating its logic.

## Adding an agent

1. Create `plugins/<pack>/agents/<agent>.md` with `name` (no `:`) and `description` (required), plus `tools` and `model` (the packs use `model: inherit`).
2. Give the agent only the tools it needs. Read-only (`Read, Grep, Glob`) is the default here.
3. `permissionMode`, `hooks`, `mcpServers`, and `initialPrompt` are ignored for plugin agents, so don't use them.

## Validate before committing

```
claude plugin validate --strict .               # marketplace + plugin manifests
claude plugin validate --strict ./plugins/<pack>
python3 scripts/validate.py                     # offline, no Claude Code needed (PyYAML optional)
python3 scripts/check_links.py                  # relative links in all Markdown
```

`claude plugin validate` is authoritative, and `scripts/validate.py` is a dependency-free backstop. The script checks:

- required marketplace fields
- name format and reserved prefixes (`claude-`, `anthropic-`, …)
- matching versions in `marketplace.json` and `plugin.json`
- frontmatter presence and required keys
- skill/command name collisions
- README presence

It exits non-zero on errors.

## Style guide

- **Augment, don't replace.** Every new skill must keep the human doing the core thinking, deciding, sending, and grading. See [guardrails](guardrails.md).
- **No invented facts.** Use placeholders (`[DATA NEEDED]`, `[CHECK: …]`, `[TESTIMONIAL NEEDED]`) instead of plausible-sounding data.
- Second person, plain language, short sections. Ask clarifying questions before long outputs.
- Give opinionated defaults and say they can be overridden.
- Don't use marketing claims, stats, or testimonials in docs or READMEs.

## Pull requests

One logical change per PR. Include passing validation output and update `CHANGELOG.md` under `Unreleased`. See [releasing](releasing.md).

[← Back to docs index](index.md)
