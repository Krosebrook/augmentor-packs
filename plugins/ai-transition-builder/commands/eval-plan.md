---
description: Create an evaluation plan, starter test cases, and graders for an LLM feature
argument-hint: "[describe the feature or path to its prompt/code]"
---

Build an eval plan for: $ARGUMENTS

Follow the ai-evals skill. If I have sample outputs, start by reading them and proposing failure categories. Deliver: failure categories, eval case schema (JSONL), 10 starter cases covering typical/hard/edge/adversarial, a grader per criterion (code check preferred; LLM-judge prompt with explicit criteria otherwise, plus how to validate it), and a pass bar for shipping. If I point to a project directory, write the cases to `evals/cases.jsonl` there.
