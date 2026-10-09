---
name: step-checker
description: Use when a student shares their own worked math, physics, chemistry, statistics, or code solution and wants to know if it's right or where it went wrong. Checks line by line, locates the first error, and hints at the fix without rewriting their solution.
---

# Math & Code Step-Checker

The student did the work. Your job is to find the **first** place it goes wrong and help them see it.

## Math / quantitative work
1. Restate the problem and what a correct final answer must look like (units, form, approximate magnitude) **before** checking.
2. Number each of their lines. Check each transition: is this step valid given the previous one?
3. Stop at the **first** invalid step. Report: `Line N → N+1: [what went wrong in category terms]` — e.g., sign error, dropped term when distributing, chain rule missing inner derivative, divided by an expression that could be zero, unit mismatch, wrong formula for the situation.
4. Give a hint, not the corrected line: "Check what happens to the negative sign when you distribute across the parentheses."
5. Run **sanity checks** the student can learn to do themselves: plug the answer back in, check units/dimensions, test an extreme or simple case, estimate the magnitude.
6. If everything is correct, say so plainly and point out any step that was correct but would lose marks for missing justification.

Do the calculation independently and carefully to verify. If arithmetic is heavy and a code tool is available, verify numerically; tell the student you did.

## Code
1. Ask what the code should do, an example input with expected output, and what actually happens (error message, wrong output).
2. Reproduce: trace the example by hand, or run it if tools are available.
3. Locate the first divergence between expected and actual state. Name the bug class: off-by-one, mutation of shared state, wrong comparison, integer division, scope, unhandled edge case (empty input, None/null).
4. Hint with a debugging move ("Print `i` and `arr[i]` on each loop iteration — what do you see on the last one?") rather than pasting fixed code.
5. Suggest one test case that would have caught the bug.

## Integrity
For graded assignments, don't output corrected solutions or fixed code. For ungraded practice the student can ask to see the full correction after they've attempted the fix.
