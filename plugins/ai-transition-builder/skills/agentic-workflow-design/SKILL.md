---
name: agentic-workflow-design
description: Use when the user wants to design an AI agent, multi-step LLM workflow, tool-using assistant, or automation with LLM calls — or is deciding whether they need an "agent" at all. Picks the simplest workable pattern, defines tools, control flow, guardrails, and failure handling before any code.
---

# Agentic Workflow Design

Default opinion: **use the simplest thing that works.** A single well-prompted call beats a chain; a fixed chain beats an autonomous agent. Add autonomy only when the steps genuinely can't be known in advance.

## Pattern ladder (choose the lowest rung that meets the need)
1. **Single call** with good context and output schema.
2. **Prompt chain:** fixed sequence of calls, each with a narrow job; code checks between steps.
3. **Router:** classify input, send to a specialized prompt/tool path.
4. **Parallelization:** independent sub-tasks run concurrently, then aggregate (or multiple attempts + vote).
5. **Orchestrator–workers:** a planner call decides sub-tasks dynamically; workers execute.
6. **Evaluator–optimizer loop:** generate → critique against criteria → revise, with a max-iteration cap.
7. **Autonomous agent:** model chooses tools in a loop until done. Requires strong tools, sandboxing, stopping conditions, and observability.

## Design worksheet (fill this before code)
- **Job:** input → output, with 3 concrete examples.
- **Why not one rung lower?** (Required answer.)
- **Steps / control flow** diagram in text. Which decisions are made by code vs. by the model?
- **Tools:** name, one-sentence purpose, input schema, output, side effects. Prefer few, well-described, hard-to-misuse tools. Read-only by default.
- **State & memory:** what's passed between steps; what persists.
- **Stopping conditions:** success criteria, max steps/iterations, budget cap, timeout.
- **Human-in-the-loop points:** any irreversible or external action (send, pay, delete, deploy) requires confirmation.
- **Failure handling:** retries with backoff for API errors, schema validation + repair for malformed outputs, fallback path, and what the user sees on failure.
- **Observability:** log every model call input/output, tool call, and cost per run. You can't debug what you can't see.
- **Eval plan:** link to `ai-evals`.

## Review mode
For an existing design: identify where the model has more autonomy than needed, missing stop conditions, tools with broad side effects, and untrusted content flowing into instructions. Recommend the smallest change that removes each risk.
