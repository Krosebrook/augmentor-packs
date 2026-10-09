# ai-transition-builder

For people with some technical background who are moving into building with AI. It coaches you to build real things — you write and own the code — and checks your work with production habits: evals, security, cost, and shipping.

## Install
From inside Claude Code, add the marketplace (a local path, or `<owner>/<repo>` once it's hosted on GitHub), then install:

```
/plugin marketplace add <path-to-claude-packs-or-owner/repo>
/plugin install ai-transition-builder@augmentor-packs
```

On Claude Code 2.1.275 or later you can also install in one step from a hosted repo:

```
/plugin install ai-transition-builder --marketplace <owner>/<repo>
```

## Skills
| Skill | Use it when |
|---|---|
| `prompt-engineering` | Writing/debugging prompts; test-driven prompt iteration |
| `agentic-workflow-design` | Designing agents/workflows — simplest pattern first, guardrails, stop conditions |
| `llm-api-builder` | Writing code against LLM APIs: errors, retries, structured output, tools, cost |
| `rag-basics` | Q&A over your documents; diagnosing retrieval vs. generation failures |
| `ai-evals` | Building eval sets, code graders, validated LLM-as-judge |
| `prototype-shipping-coach` | Scoping and shipping a one-week AI prototype |
| `learning-roadmap` | A project-driven roadmap from your background and goals |
| `ai-code-review` | Checking AI-generated code before you trust it |
| `ai-app-security` | Threat-modeling LLM apps (OWASP Top 10 for LLM Applications 2025) |

## Commands
- `/ai-transition-builder:prompt-review [prompt]`
- `/ai-transition-builder:eval-plan [feature]`
- `/ai-transition-builder:ship-checklist [project]`
- `/ai-transition-builder:threat-model [project]`
- `/ai-transition-builder:next-step [where you are]`

## Agents
- `ai-code-reviewer` — verifies APIs/packages exist, runs checks, finds bugs, asks comprehension questions
- `llm-app-security-auditor` — read-only, OWASP-mapped audit of LLM data flows and tool permissions

## Notes
Model names, parameters, and prices change quickly; the skills deliberately tell Claude to check current provider docs rather than rely on memory. No MCP servers or API keys are required by this plugin.
