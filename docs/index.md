# Augmentor Packs documentation

> **🌱 New to AI? [Start here](beginners/getting-started.md).** Plain-words guides: [getting started](beginners/getting-started.md) (install Claude Code and your first pack) · [your first 10 minutes](beginners/first-10-minutes.md) · [glossary](beginners/glossary.md) · [troubleshooting](beginners/troubleshooting-for-beginners.md). Then install [`ai-beginner-augmentor`](packs/ai-beginner-augmentor.md).

**Augmentor Packs** (`augmentor-packs`) is a Claude Code plugin marketplace with fifteen augmentor packs plus five optional MCP tool add-ons. They're built so you can do more than you could on your own, because they coach, check, and speed up your work. They don't do the work for you.

Owner: Kyle · License: MIT · Repository: `Krosebrook/augmentor-packs` ([GitHub](https://github.com/Krosebrook/augmentor-packs))

## Philosophy

An *augmentor* acts like a good mentor or reviewer. It asks questions before giving answers, gives feedback before rewriting anything, and drafts the boring parts for you to own. Concretely:

- **No ghostwriting graded work.** Students get coaching and feedback on their own drafts.
- **The teacher stays the grader.** Educators get feedback *suggestions* and no final grades.
- **Never sends messages.** Email, outreach, and parent notes come back as drafts for you to send.
- **Never invents citations, standards, data, or testimonials.** Gaps are marked with placeholders such as `[CHECK: …]`, `[DATA NEEDED]`, `[TESTIMONIAL NEEDED]`, `[CONFIRM]`, and `[verify]`.

Full details: [guardrails](guardrails.md).

## Pack comparison

| Pack | For | Level | Skills | Commands | Agents | Category |
|---|---|---|---|---|---|---|
| [ai-beginner-augmentor](packs/ai-beginner-augmentor.md) | Anyone brand new to AI and Claude | Beginner | 8 | 5 | 2 | education |
| [decision-coach-augmentor](packs/decision-coach-augmentor.md) | Anyone making a choice: buying, picking a service, planning | Beginner | 4 | 5 | 2 | lifestyle |
| [student-augmentor](packs/student-augmentor.md) | Students (academic-integrity-aware) | Beginner | 8 | 5 | 2 | education |
| [office-augmentor](packs/office-augmentor.md) | Knowledge workers | Beginner | 8 | 5 | 2 | productivity |
| [ai-transition-builder](packs/ai-transition-builder.md) | Technical folks moving into building with AI | Advanced | 9 | 5 | 2 | development |
| [educator-augmentor](packs/educator-augmentor.md) | Teachers | Beginner | 8 | 5 | 2 | education |
| [solo-founder-augmentor](packs/solo-founder-augmentor.md) | Solo founders | Intermediate | 9 | 5 | 2 | business |
| [healthcare-worker-augmentor](packs/healthcare-worker-augmentor.md) | Nurses and allied health (not medical advice) | Beginner | 7 | 4 | 2 | health |
| [trades-augmentor](packs/trades-augmentor.md) | Electricians, plumbers, HVAC techs, contractors | Beginner | 8 | 5 | 2 | productivity |
| [job-seeker-augmentor](packs/job-seeker-augmentor.md) | Job seekers and career changers | Beginner | 8 | 4 | 2 | career |
| [creator-augmentor](packs/creator-augmentor.md) | Content creators | Beginner | 8 | 4 | 2 | creative |
| [parent-caregiver-augmentor](packs/parent-caregiver-augmentor.md) | Parents and family caregivers | Beginner | 9 | 5 | 2 | lifestyle |
| [designer-augmentor](packs/designer-augmentor.md) | Product, UX, and UI designers | Intermediate | 7 | 4 | 2 | design |
| [engineer-augmentor](packs/engineer-augmentor.md) | Software engineers | Advanced | 8 | 4 | 2 | development |
| [consultant-augmentor](packs/consultant-augmentor.md) | Consultants, solutions architects, enablement leads | Intermediate | 7 | 4 | 2 | business |

Every plugin is at version 1.4.0. No augmentor pack includes MCP servers, hooks, executables, or API keys. Every pack is only skills, commands, and subagents. `decision-coach-augmentor` is the one pack that uses Claude Code's built-in, read-only `WebSearch` and `WebFetch` tools, because its job is grounded, current research.

### Levels

The **Level** column is an honest estimate of how much AI, tech, or domain experience a pack assumes. It is not about how smart you are.

- **Beginner:** no tech skills needed. Plain language; you paste text or point to a file.
- **Intermediate:** assumes comfort with your field's concepts and with working from your own files and numbers (or, for the tool add-ons, installing Node.js).
- **Advanced:** assumes coding experience (repos, tests, APIs).

The optional tool add-ons are **Intermediate**.

## Optional tool add-ons

Separate plugins that each run a small local Node.js MCP server (zero npm dependencies, no API keys) and make outbound HTTPS requests. They're optional; install only the ones you want. Details: [tool add-ons](packs/tools.md).

| Plugin | What it does | Key needed | Tools |
|---|---|---|---|
| [tools-package-health](packs/tools.md#tools-package-health) | npm/PyPI metadata, OSV vulnerabilities, health verdict | none | 3 |
| [tools-github-releases](packs/tools.md#tools-github-releases) | Releases, latest notes, changelog between tags | none (optional `GITHUB_TOKEN` env var) | 3 |
| [tools-holidays-nager](packs/tools.md#tools-holidays-nager) | Public holidays and business-day math | none | 6 |
| [tools-sec-edgar](packs/tools.md#tools-sec-edgar) | SEC filings, key financials, XBRL history | none (optional `sec_user_agent` option) | 4 |
| [tools-domain-checks](packs/tools.md#tools-domain-checks) | DNS (DoH), RDAP registration/expiry, TLS expiry | none | 4 |

## Quickstart

Inside Claude Code:

```
/plugin marketplace add Krosebrook/augmentor-packs
/plugin install student-augmentor@augmentor-packs
```

You can also add a local clone: `/plugin marketplace add ./claude-packs`. Then:

- **Skills** load automatically when your request matches them, or you can run one with `/<pack>:<skill>`, e.g. `/student-augmentor:socratic-tutor`.
- **Commands** are shortcuts: `/<pack>:<command> [args]`, e.g. `/office-augmentor:triage-inbox inbox.txt`.
- **Agents** are subagents: `@agent-<pack>:<agent>`, e.g. `@agent-ai-transition-builder:ai-code-reviewer`.

## Contents

- **New to AI:** [getting started](beginners/getting-started.md) · [first 10 minutes](beginners/first-10-minutes.md) · [glossary](beginners/glossary.md) · [troubleshooting for beginners](beginners/troubleshooting-for-beginners.md)
- [Installation](installation.md)
- Packs: [ai-beginner](packs/ai-beginner-augmentor.md) · [student](packs/student-augmentor.md) · [office](packs/office-augmentor.md) · [ai-transition](packs/ai-transition-builder.md) · [educator](packs/educator-augmentor.md) · [solo-founder](packs/solo-founder-augmentor.md) · [healthcare-worker](packs/healthcare-worker-augmentor.md) · [trades](packs/trades-augmentor.md) · [job-seeker](packs/job-seeker-augmentor.md) · [creator](packs/creator-augmentor.md) · [parent-caregiver](packs/parent-caregiver-augmentor.md) · [designer](packs/designer-augmentor.md) · [engineer](packs/engineer-augmentor.md) · [consultant](packs/consultant-augmentor.md)
- [Tool add-ons (optional MCP)](packs/tools.md)
- [Guardrails](guardrails.md)
- [Contributing](contributing.md)
- [Releasing](releasing.md)
- [Roadmap](roadmap.md)
- [FAQ](faq.md)
- [Changelog](../CHANGELOG.md)
