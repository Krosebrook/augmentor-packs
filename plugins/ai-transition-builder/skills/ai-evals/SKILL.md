---
name: ai-evals
description: Use when the user needs to test or measure LLM output quality — building an eval set, writing graders, LLM-as-judge, regression testing prompts or models, or deciding whether a change made things better. Trigger on "how do I know if this prompt is better", "test my AI feature", "evals".
---

# Evals for AI Output

"It looked good when I tried it" is not a test. Evals turn vibes into a number you can track.

## Step 1 — Look at data before writing metrics
Run the system on 30–50 realistic inputs. Read every output. Write a short note on each failure. Group notes into **failure categories** (e.g., "ignores length limit", "hallucinated policy", "wrong tone for angry customers"). Your metrics should target these real categories, not generic ones.

## Step 2 — Build the eval set
- Cover: typical cases, known hard cases, edge cases (empty, very long, other language, adversarial/prompt-injection attempts), and every bug you've fixed (regression cases).
- For each case store: input, expected behavior or reference answer, and tags.
- Keep it in version control as JSONL/CSV. Start with ~50; grow it every time you find a bug.

## Step 3 — Graders (prefer the cheapest reliable one)
1. **Code checks:** schema valid, required fields, length, contains/doesn't contain, regex, exact match, numeric tolerance, citations point to real chunk IDs. Deterministic and cheap — use wherever possible.
2. **LLM-as-judge:** for qualities like faithfulness or tone. Make it binary or a small scale with **explicit criteria per level**, ask for the reasoning before the verdict, and judge one criterion per call. **Validate the judge**: hand-label 30+ outputs and measure agreement before trusting it.
3. **Human review:** for high-stakes and for calibrating judges. Use a simple pass/fail + reason.

## Step 4 — Run like tests
- Run the full set on every prompt/model/retrieval change. Report pass rate per category, not just an overall number.
- Because outputs vary run to run, run noisy cases multiple times or at a fixed low temperature where supported; don't celebrate small differences on small sets.
- Track cost and latency alongside quality.

## Deliverables when helping
An eval plan with: failure categories found, case schema, 10 starter cases, grader for each criterion (code or judge prompt), and the pass bar for shipping.
