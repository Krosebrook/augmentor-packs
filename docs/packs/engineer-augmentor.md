# Engineer Augmentor (`engineer-augmentor`)

> Engineering co-pilot that keeps you the author: hypothesis-driven debugging coach, failing-test triage, logic audits before bugs ship, review-feedback planning, adversarial shell/PowerShell script review, pre-build specs, task decomposition, and client-side key exposure checks. Explains and checks; you change the code.

Version 1.4.0 · License MIT · Source: [`plugins/engineer-augmentor`](../../plugins/engineer-augmentor) · Pack README: [README](../../plugins/engineer-augmentor/README.md)

**Level: Advanced** ([what levels mean](../index.md#levels)). For working software engineers: debugging, tests, scripts, and code review in a repo.

## Who it's for

Working software engineers (and engineers-in-training) who want a rigorous pairing partner for debugging, reviews, and planning while staying the one who understands and owns every change.

## Install

```
/plugin marketplace add Krosebrook/augmentor-packs
/plugin install engineer-augmentor@augmentor-packs
```

See [installation](../installation.md) for local-path installs and troubleshooting.

## Skills

Skills load automatically when your request matches their description. You can also run one directly as `/engineer-augmentor:<skill>`.

### `debugging-coach`

**When to use:** Use when the user is stuck on a bug, flaky behavior, or unexplained failure. Runs a hypothesis-driven investigation: reproduce, gather evidence, rank hypotheses, design the cheapest discriminating experiment, and confirm the root cause before any fix. Coaches the method; never guesses a fix as fact.

**Example prompt:** “My API returns 500 only in production since yesterday. Here is the stack trace.”

Source: [SKILL.md](../../plugins/engineer-augmentor/skills/debugging-coach/SKILL.md)

### `failing-test-triage`

**When to use:** Use when a test suite has failures and the user wants to understand and fix them efficiently. Groups failures by shared root cause, orders them by dependency, and fixes or proposes fixes one group at a time, deciding whether the test or the code is wrong. Never deletes or weakens tests to go green.

**Example prompt:** “23 tests fail after upgrading the test runner. Here is the output.”

Source: [SKILL.md](../../plugins/engineer-augmentor/skills/failing-test-triage/SKILL.md)

### `logic-audit`

**When to use:** Use when the user wants code checked for logical errors before they become bugs: control-flow gaps, unhandled states, off-by-one and boundary errors, data contract mismatches, race conditions, and silent failure paths. Reads and reasons; reports findings with evidence and test cases to prove them.

**Example prompt:** “Audit src/billing/proration.ts for edge cases before I merge.”

Source: [SKILL.md](../../plugins/engineer-augmentor/skills/logic-audit/SKILL.md)

### `review-feedback-planner`

**When to use:** Use when the user receives code review comments or PR feedback and wants to process them systematically. Parses each comment, classifies it (bug, design, style, question, nit), proposes a response and change plan, flags disagreements to discuss, and checks nothing is missed. Drafts replies; the user posts them.

**Example prompt:** “Here are 14 review comments on my PR. Help me plan the changes and replies.”

Source: [SKILL.md](../../plugins/engineer-augmentor/skills/review-feedback-planner/SKILL.md)

### `script-red-team`

**When to use:** Use when the user writes or reviews a Bash or PowerShell script, automation job, or one-liner that will run on real systems. Adversarially reviews for safety: quoting, error handling, idempotency, destructive operations, secrets handling, privilege, and portability, with a dry-run plan. Reviews and suggests; the user runs it.

**Example prompt:** “Review this cleanup.sh before I run it on the build server.”

Source: [SKILL.md](../../plugins/engineer-augmentor/skills/script-red-team/SKILL.md)

### `pre-build-spec`

**When to use:** Use before starting a feature, script, service, or refactor. Produces a short pre-build spec: problem, scope and non-goals, interfaces and data, edge cases, risks, test plan, rollout and rollback, and open questions. Interviews for missing facts and marks them; does not start coding until the user approves.

**Example prompt:** “Spec out adding CSV export to the reports page.”

Source: [SKILL.md](../../plugins/engineer-augmentor/skills/pre-build-spec/SKILL.md)

### `task-decomposer`

**When to use:** Use when a request or project is large, multi-part, or ambiguous. Breaks it into workstreams and tasks with dependencies, identifies what can run in parallel, defines done for each, and plans the integration and verification step. The user assigns and executes.

**Example prompt:** “Break down migrating our auth from sessions to OAuth.”

Source: [SKILL.md](../../plugins/engineer-augmentor/skills/task-decomposer/SKILL.md)

### `client-key-exposure-check`

**When to use:** Use when the user builds a front-end, browser extension, mobile app, static site, or prototype that calls a paid or privileged API. Finds API keys and secrets exposed to the client, explains the risk, and outlines a fail-closed server-side proxy pattern with rate limits and origin checks. Reviews and advises; never handles real secrets.

**Example prompt:** “My React app calls the OpenAI API directly. Is that a problem?”

Source: [SKILL.md](../../plugins/engineer-augmentor/skills/client-key-exposure-check/SKILL.md)

## Commands

### `/engineer-augmentor:debug`

Hypothesis-driven debugging session for a stuck bug. Arguments: `[symptom, error text, what changed]`

Source: [debug.md](../../plugins/engineer-augmentor/commands/debug.md)

### `/engineer-augmentor:spec`

Write a pre-build spec before coding. Arguments: `[feature or change to build]`

Source: [spec.md](../../plugins/engineer-augmentor/commands/spec.md)

### `/engineer-augmentor:audit-logic`

Audit a file or diff for logical errors with test cases. Arguments: `[file path or diff]`

Source: [audit-logic.md](../../plugins/engineer-augmentor/commands/audit-logic.md)

### `/engineer-augmentor:review-plan`

Turn PR review comments into a change plan and reply drafts. Arguments: `[pasted review comments or PR notes]`

Source: [review-plan.md](../../plugins/engineer-augmentor/commands/review-plan.md)

## Agents

### `logic-auditor`

**When to use:** Read-only logic auditor. Reads the specified files or recent diff and reports logical errors (boundaries, unhandled states, data contract mismatches, races, swallowed errors) with file:line evidence and a test case per finding. Use before merging risky changes.

**Tools:** Read, Grep, Glob, Bash · **Model:** inherit

Call it with `@agent-engineer-augmentor:logic-auditor`.

Source: [logic-auditor.md](../../plugins/engineer-augmentor/agents/logic-auditor.md)

### `script-reviewer`

**When to use:** Read-only adversarial reviewer for Bash and PowerShell scripts. Flags unquoted expansions, unsafe deletes, missing error handling, non-idempotent steps, hard-coded secrets, and privilege issues, and runs shellcheck/PSScriptAnalyzer if available. Use before running a script on real systems.

**Tools:** Read, Grep, Glob, Bash · **Model:** inherit

Call it with `@agent-engineer-augmentor:script-reviewer`.

Source: [script-reviewer.md](../../plugins/engineer-augmentor/agents/script-reviewer.md)

## Guardrails

- You change the code; the pack explains, audits, and plans. You should understand every change before you merge it.
- Never deletes or weakens tests to make a suite pass.
- Never asks for, stores, or repeats real secrets; uses placeholders like `<API_KEY>`.
- Review replies are drafts; nothing is posted. Agents never execute the script under review or modify files.
- Unverified causes are labeled hypotheses; unknowns are `[CONFIRM]`.

See [guardrails](../guardrails.md) for the principles behind these rules.

---
[← Back to docs index](../index.md)
