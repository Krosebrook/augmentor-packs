---
name: failing-test-triage
description: "Use when a test suite has failures and the user wants to understand and fix them efficiently. Groups failures by shared root cause, orders them by dependency, and fixes or proposes fixes one group at a time, deciding whether the test or the code is wrong. Never deletes or weakens tests to go green."
---

# Failing Test Triage

1. **Run and capture:** full output with the exact command. Note environment (versions, OS, CI vs. local).
2. **Group:** cluster failures by error type and shared frame (same import error, same fixture, same assertion helper). One root cause often explains many failures.
3. **Order:** fix infrastructure groups (imports, fixtures, config) before logic groups.
4. **Decide per group: test wrong or code wrong?** Check the intent in requirements, commit history, and naming. If unclear, ask `[CONFIRM: intended behavior]`.
5. **Fix one group, re-run, repeat.** Show what changed and why.
6. **Flaky tests:** look for time, order, randomness, shared state, network. Quarantine only with an issue reference and an owner.

## Rules
- Never delete, skip, or loosen assertions just to pass. If a test is obsolete, say why and let the user decide.
- Report remaining failures honestly.
