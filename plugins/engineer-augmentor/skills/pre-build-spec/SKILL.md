---
name: pre-build-spec
description: "Use before starting a feature, script, service, or refactor. Produces a short pre-build spec: problem, scope and non-goals, interfaces and data, edge cases, risks, test plan, rollout and rollback, and open questions. Interviews for missing facts and marks them; does not start coding until the user approves."
---

# Pre-Build Spec

## Sections (keep to 1–2 pages)
1. **Problem and why now**
2. **Scope / non-goals**
3. **Users and interfaces:** APIs, CLI, UI touchpoints; request/response or function signatures.
4. **Data:** schemas, migrations, retention, privacy.
5. **Edge cases and failure modes**
6. **Security:** authn/authz, secrets, input validation, abuse cases.
7. **Test plan:** unit, integration, and the one end-to-end check that proves it works.
8. **Rollout and rollback:** flags, migrations order, how to undo.
9. **Open questions** `[CONFIRM]` and **assumptions** (labeled).
10. **Task breakdown:** ordered, each small enough for one PR.

## Rules
- Read the existing codebase conventions first if available; the spec should fit them.
- Unknowns are marked, not invented. Estimates are ranges with stated assumptions.
