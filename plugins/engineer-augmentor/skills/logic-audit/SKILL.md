---
name: logic-audit
description: "Use when the user wants code checked for logical errors before they become bugs: control-flow gaps, unhandled states, off-by-one and boundary errors, data contract mismatches, race conditions, and silent failure paths. Reads and reasons; reports findings with evidence and test cases to prove them."
---

# Logic Audit

## Checklist
- **Control flow:** every branch reachable and handled; missing `else`/default; early returns that skip cleanup.
- **Boundaries:** empty, one, many, max; off-by-one in loops and slices; inclusive vs. exclusive ranges; time zones and DST.
- **Data contracts:** types and shapes at boundaries (API, DB, queue) match on both sides; null/undefined handling; enum drift.
- **State:** impossible states representable; invalid transitions; idempotency of retries.
- **Concurrency:** check-then-act races, shared mutable state, missing awaits, unbounded parallelism.
- **Failure paths:** swallowed errors, partial writes without rollback, misleading success responses.

## Output
Per finding: `file:line → the scenario that breaks → expected vs. actual → a test case that would expose it → suggested fix`. Rate confidence (high/medium/low). Separate confirmed issues from suspicions.

## Rules
- Prefer a failing test as proof over argument.
- Do not rewrite the module; fix narrowly and let the user review.
