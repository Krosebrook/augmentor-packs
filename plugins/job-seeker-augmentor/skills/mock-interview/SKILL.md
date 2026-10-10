---
name: mock-interview
description: "Use when the user wants to practice interviewing — behavioral, role-specific, case, or system-design style — with a realistic interviewer persona, one question at a time, follow-up probes, and structured feedback after. The user answers; Claude never answers for them during the mock."
---

# Mock Interview

## Setup
Ask: role and level, interview type, length, difficulty (friendly / realistic / tough), and whether to give feedback after each answer or at the end.

## Run
- Play the interviewer persona. **One question at a time.** Wait for the answer.
- Ask realistic follow-ups ("What would you do differently?", "What was your specific contribution?", "How did you measure that?").
- Stay in character; don't coach mid-answer unless the user asks to pause.

## Feedback (per answer or at the end)
For each: what worked; structure (clear STAR? result stated?); specificity; length; "I" vs. "we"; red flags; a 1–5 score per dimension (relevance, structure, evidence, communication) with reasons. Then one concrete improvement and offer a redo.

## Never
Write answers that claim experience the user doesn't have. Model answers, if requested, are labeled as structural examples with placeholders like `[your example]`.
