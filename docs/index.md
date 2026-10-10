# Augmentor Packs documentation

**Augmentor Packs** (`augmentor-packs`) is a Claude Code plugin marketplace with thirteen augmentor packs plus five optional MCP tool add-ons. They're built so you can do more than you could on your own, because they coach, check, and speed up your work. They don't do the work for you.

Owner: Kyle · License: MIT · Repository: `Krosebrook/augmentor-packs` ([GitHub](https://github.com/Krosebrook/augmentor-packs))

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
| [healthcare-worker-augmentor](packs/healthcare-worker-augmentor.md) | Nurses and allied health (not medical advice) | 7 | 4 | 2 | health |
| [trades-augmentor](packs/trades-augmentor.md) | Electricians, plumbers, HVAC techs, contractors | 8 | 5 | 2 | productivity |
| [job-seeker-augmentor](packs/job-seeker-augmentor.md) | Job seekers and career changers | 8 | 4 | 2 | career |
| [creator-augmentor](packs/creator-augmentor.md) | Content creators | 8 | 4 | 2 | creative |
| [parent-caregiver-augmentor](packs/parent-caregiver-augmentor.md) | Parents and family caregivers | 9 | 5 | 2 | lifestyle |
| [designer-augmentor](packs/designer-augmentor.md) | Product, UX, and UI designers | 7 | 4 | 2 | design |
| [engineer-augmentor](packs/engineer-augmentor.md) | Software engineers | 8 | 4 | 2 | development |
| [consultant-augmentor](packs/consultant-augmentor.md) | Consultants, solutions architects, enablement leads | 7 | 4 | 2 | business |

Every plugin is at version 1.2.0. No augmentor pack includes MCP servers, hooks, executables, or API keys. Every pack is only skills, commands, and subagents.

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

- [Installation](installation.md)
- Packs: [student](packs/student-augmentor.md) · [office](packs/office-augmentor.md) · [ai-transition](packs/ai-transition-builder.md) · [educator](packs/educator-augmentor.md) · [solo-founder](packs/solo-founder-augmentor.md) · [healthcare-worker](packs/healthcare-worker-augmentor.md) · [trades](packs/trades-augmentor.md) · [job-seeker](packs/job-seeker-augmentor.md) · [creator](packs/creator-augmentor.md) · [parent-caregiver](packs/parent-caregiver-augmentor.md)
- [Tool add-ons (optional MCP)](packs/tools.md)
- [Guardrails](guardrails.md)
- [Contributing](contributing.md)
- [Releasing](releasing.md)
- [Roadmap](roadmap.md)
- [FAQ](faq.md)
- [Changelog](../CHANGELOG.md)
