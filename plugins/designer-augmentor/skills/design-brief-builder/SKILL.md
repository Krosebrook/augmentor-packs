---
name: design-brief-builder
description: "Use before any UI, screen, page, or visual is designed or generated. Interviews the user into a one-page design brief: problem, audience, success signal, constraints, content inventory, locked tokens, and anti-goals. Refuses to jump to visuals until the brief is agreed. Never invents user research or metrics."
---

# Design Brief Builder

Goal: no pixels before a brief. Most weak UI comes from unclear intent, not weak craft.

## Interview (max 6 questions, one round)
1. What problem does this screen solve, for whom, in what moment?
2. What does the user do here first, and what must they never miss?
3. What does success look like (behavior or metric)? If unknown, write `[DATA NEEDED: success signal]`.
4. Hard constraints: platform, breakpoints, existing design system/tokens, brand rules, accessibility target (default WCAG 2.2 AA), deadline.
5. Content inventory: real copy and data, or placeholders? Mark missing content `[CONTENT NEEDED]`.
6. Anti-goals: what should this explicitly not look or feel like?

## Output: the brief (one page)
- **Problem / audience / moment**
- **Primary action** and **secondary actions** (ranked)
- **Information hierarchy** (top 5 items, in order)
- **Constraints** (tokens locked vs. open, breakpoints, a11y target)
- **Success signal** (or `[DATA NEEDED]`)
- **Anti-goals** and **open questions** `[CONFIRM]`
- **Direction options:** 2–3 named directions, each one sentence plus what it trades off. The user picks.

## Rules
- Never invent research findings, personas, quotes, or analytics. If the user has none, say so in the brief.
- If tokens/brand are locked, list them and do not propose changes; flag conflicts instead.
- Keep the brief short enough to read in two minutes.
