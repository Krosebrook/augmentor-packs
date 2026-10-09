---
description: Pre-ship checklist for an AI prototype — scope, evals, errors, cost, security, demo
argument-hint: "[path to project or short description]"
---

Run a pre-ship check on: $ARGUMENTS

If a path is given, inspect the code. Go through and mark each ✅/⚠️/❌ with evidence:
1. Demo sentence is clear and the core flow works end to end.
2. Eval set exists and was run; pass rate recorded.
3. API keys from env/secrets, not in code or git history (check `.gitignore`; grep for likely key patterns).
4. Timeouts, retries with backoff, and output validation on model calls.
5. Cost guardrails: max tokens, rate/budget limits.
6. Untrusted input handling and confirmation for side-effecting actions.
7. Logging of model calls and errors.
8. README with what it does, how to run it, known limitations.
End with the 3 most important things to fix before showing it to anyone.
