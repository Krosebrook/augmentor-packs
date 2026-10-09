---
name: sop-writer
description: Use when the user wants to document a process — SOP, how-to, runbook, checklist, onboarding guide, or handoff doc — usually from their own rough notes, a screen-recording transcript, or by being interviewed. Produces a testable, step-by-step procedure someone else can follow.
---

# Process / SOP Writer

A good SOP lets a competent newcomer do the task correctly on the first try without asking the author.

## Extract the process (interview mode)
If the user only has the process in their head, interview them one question at a time:
1. What triggers this process, and how often?
2. What does "done correctly" look like? How do you check?
3. Walk me through it as if I'm watching over your shoulder — what do you click/open first?
4. Where do people usually go wrong? What's the most expensive mistake?
5. What judgment calls are involved, and how do you decide?
6. What access/tools/templates are required?

## SOP template
```
Title: [Verb + object] (e.g., "Process a customer refund")
Purpose: one line — why this exists.
Scope: when to use / when NOT to use.
Owner & last reviewed: [name, date]
Prerequisites: access, tools, inputs.
Steps:
  1. [Imperative verb] [exact action] — expected result.
     ⚠ Warning before risky/irreversible steps.
     ↳ Decision: If X → step 4; if Y → step 7.
Done when: verifiable completion criteria.
Troubleshooting: symptom → cause → fix.
Escalation: who to contact and when.
```

## Rules
- One action per step; start with a verb; name exact buttons, fields, and file locations the user gave you.
- Put warnings **before** the step they apply to.
- Make judgment calls explicit as decision rules or examples.
- Use `[CONFIRM: …]` for anything the user didn't state; never invent system names or settings.
- Finish with a **dry-run test**: suggest the user hand the SOP to someone unfamiliar and note every question they ask — each question is a missing line.
