---
name: task-decomposer
description: "Use when a request or project is large, multi-part, or ambiguous. Breaks it into workstreams and tasks with dependencies, identifies what can run in parallel, defines done for each, and plans the integration and verification step. The user assigns and executes."
---

# Task Decomposer

1. **Outcome:** one sentence for what done means overall, and how it will be verified.
2. **Workstreams:** 2–6 independent areas. For each: goal, inputs, outputs, owner `[ASSIGN]`.
3. **Tasks:** within each workstream, small tasks (hours to a day) with a definition of done.
4. **Dependencies:** a simple list or table of `task → depends on`. Mark the critical path.
5. **Parallelism:** which tasks can run at the same time and what interfaces must be agreed first (contracts, schemas, mocks).
6. **Integration:** the merge order and an end-to-end check.
7. **Risks:** top 3 with mitigations.

## Rules
- No invented estimates presented as fact; use ranges and say what they assume.
- Keep the plan editable: a markdown checklist the user can paste into their tracker.
