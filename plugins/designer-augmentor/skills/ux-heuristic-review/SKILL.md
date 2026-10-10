---
name: ux-heuristic-review
description: "Use when the user shares a screen, mockup, screenshot, flow description, or URL notes and wants a UX critique. Runs a structured heuristic evaluation (Nielsen's 10 plus task-flow checks), rates severity, and gives specific fixes. Reviews; does not redesign unless asked."
---

# UX Heuristic Review

## Setup
Ask (or infer and label as assumption): who is the user, what task are they trying to finish, on what device?

## Pass 1: task walk-through
Walk the primary task step by step. At each step note: what the user must notice, decide, and do; where they could hesitate or err.

## Pass 2: heuristics
Check against: visibility of status; match with real-world language; user control and undo; consistency and standards; error prevention; recognition over recall; flexibility/shortcuts; aesthetic and minimal design (signal vs. noise); error recovery messages; help and documentation.
Also check: empty, loading, error, and success states; destructive actions confirmed; form labels and inline validation; touch targets (at least 24x24 CSS px, 44 recommended on touch).

## Output
Table: `#  | Where | Issue | Heuristic | Severity (0–4) | Suggested fix`. Sort by severity. Then: top 3 fixes worth doing first, and what you could not assess from the material given `[CHECK: …]`.

## Rules
- Quote or point to the exact element. No generic advice.
- Severity is a judgment; say why for anything rated 3–4.
- Heuristic review is not user research. Recommend a usability test for any high-severity, high-uncertainty finding.
