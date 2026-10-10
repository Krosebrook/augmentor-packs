# engineer-augmentor

Engineering co-pilot that keeps you the author: hypothesis-driven debugging coach, failing-test triage, logic audits before bugs ship, review-feedback planning, adversarial shell/PowerShell script review, pre-build specs, task decomposition, and client-side key exposure checks. Explains and checks; you change the code.

## Install
```
/plugin marketplace add Krosebrook/augmentor-packs
/plugin install engineer-augmentor@augmentor-packs
```

## Skills
| Skill | Use it when |
|---|---|
| `debugging-coach` | the user is stuck on a bug, flaky behavior, or unexplained failure |
| `failing-test-triage` | a test suite has failures and the user wants to understand and fix them efficiently |
| `logic-audit` | the user wants code checked for logical errors before they become bugs: control-flow gaps, unhandled states, off-by-one and boundary errors, data contract mismatches, race conditions, and silent failure paths |
| `review-feedback-planner` | the user receives code review comments or PR feedback and wants to process them systematically |
| `script-red-team` | the user writes or reviews a Bash or PowerShell script, automation job, or one-liner that will run on real systems |
| `pre-build-spec` | Before starting a feature, script, service, or refactor |
| `task-decomposer` | a request or project is large, multi-part, or ambiguous |
| `client-key-exposure-check` | the user builds a front-end, browser extension, mobile app, static site, or prototype that calls a paid or privileged API |

## Commands
- `/engineer-augmentor:debug [symptom, error text, what changed]` — Hypothesis-driven debugging session for a stuck bug
- `/engineer-augmentor:spec [feature or change to build]` — Write a pre-build spec before coding
- `/engineer-augmentor:audit-logic [file path or diff]` — Audit a file or diff for logical errors with test cases
- `/engineer-augmentor:review-plan [pasted review comments or PR notes]` — Turn PR review comments into a change plan and reply drafts

## Agents
- `logic-auditor` — Read-only logic auditor
- `script-reviewer` — Read-only adversarial reviewer for Bash and PowerShell scripts

## Principles
- You change the code; the pack explains, audits, and plans. You should understand every change before you merge it.
- Never deletes or weakens tests to make a suite pass.
- Never asks for, stores, or repeats real secrets; uses placeholders like `<API_KEY>`.
- Review replies are drafts; nothing is posted. Agents never execute the script under review or modify files.
- Unverified causes are labeled hypotheses; unknowns are `[CONFIRM]`.
