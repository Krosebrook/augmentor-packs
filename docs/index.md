# Augmentor Packs documentation

**Augmentor Packs** (`augmentor-packs`) is a Claude Code plugin marketplace with five plugins. They're built so you can do more than you could on your own, because they coach, check, and speed up your work. They don't do the work for you.

Owner: Kyle · License: MIT · Repository: `Krosebrook/augmentor-packs` (planned GitHub location)

## Philosophy

An *augmentor* acts like a good mentor or reviewer. It asks questions before giving answers, gives feedback before rewriting anything, and drafts the boring parts for you to own. Concretely:

- **No ghostwriting graded work.** Students get coaching and feedback on their own drafts.
- **The teacher stays the grader.** Educators get feedback *suggestions* and no final grades.
- **Never sends messages.** Email, outreach, and parent notes come back as drafts for you to send.
- **Never invents citations, standards, data, or testimonials.** Gaps are marked with placeholders such as `[CHECK: …]`, `[DATA NEEDED]`, `[TESTIMONIAL NEEDED]`, `[CONFIRM]`, and `[verify]`.

Full details: [guardrails](guardrails.md).

## Pack comparison

| Pack | For | Skills | Commands | Agents | Category |
|---|---|---|---|---|---|
| [student-augmentor](packs/student-augmentor.md) | Students (academic-integrity-aware) | 8 | 5 | 2 | education |
| [office-augmentor](packs/office-augmentor.md) | Knowledge workers | 8 | 5 | 2 | productivity |
| [ai-transition-builder](packs/ai-transition-builder.md) | Technical folks moving into building with AI | 9 | 5 | 2 | development |
| [educator-augmentor](packs/educator-augmentor.md) | Teachers | 8 | 5 | 2 | education |
| [solo-founder-augmentor](packs/solo-founder-augmentor.md) | Solo founders | 9 | 5 | 2 | business |

All packs are at version 1.0.0. No pack includes MCP servers, hooks, executables, or API keys. Every pack is only skills, commands, and subagents.

## Quickstart

Inside Claude Code:

```
/plugin marketplace add Krosebrook/augmentor-packs
/plugin install student-augmentor@augmentor-packs
```

Until the GitHub repo is published, add a local clone instead: `/plugin marketplace add ./claude-packs`. Then:

- **Skills** load automatically when your request matches them, or you can run one with `/<pack>:<skill>`, e.g. `/student-augmentor:socratic-tutor`.
- **Commands** are shortcuts: `/<pack>:<command> [args]`, e.g. `/office-augmentor:triage-inbox inbox.txt`.
- **Agents** are subagents: `@agent-<pack>:<agent>`, e.g. `@agent-ai-transition-builder:ai-code-reviewer`.

## Contents

- [Installation](installation.md)
- Packs: [student](packs/student-augmentor.md) · [office](packs/office-augmentor.md) · [ai-transition](packs/ai-transition-builder.md) · [educator](packs/educator-augmentor.md) · [solo-founder](packs/solo-founder-augmentor.md)
- [Guardrails](guardrails.md)
- [Contributing](contributing.md)
- [Releasing](releasing.md)
- [Roadmap](roadmap.md)
- [FAQ](faq.md)
- [Changelog](../CHANGELOG.md)
