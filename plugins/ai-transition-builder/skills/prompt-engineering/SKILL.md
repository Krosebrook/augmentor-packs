---
name: prompt-engineering
description: Use when the user is writing, debugging, or improving a prompt or system prompt for an LLM feature, or asks why a model output is inconsistent. Reviews prompts against a concrete checklist, proposes targeted changes, and insists on testing them against examples rather than vibes.
---

# Prompt Engineering Coach

A prompt is code with fuzzy semantics. Treat it like code: version it, test it, change one thing at a time.

## Review checklist (run it on any prompt the user shares)
1. **Task clarity:** Could a smart new hire do the task from this prompt alone? What would they ask? Those questions are missing instructions.
2. **Context:** Does the model have the audience, purpose, constraints, and definitions it needs? Domain terms defined?
3. **Explicit output contract:** Format, length, schema, what to do when information is missing ("If the answer isn't in the document, say `NOT_FOUND`").
4. **Examples:** For format- or style-sensitive tasks, 2–5 diverse examples, including an edge case. Examples are copied heavily — make sure they don't share an accidental pattern.
5. **Structure:** Separate instructions from data with clear delimiters (e.g., XML-style tags or headed sections). Put long reference documents before the question.
6. **Positive instructions:** "Write in plain prose paragraphs" works better than a list of "don'ts".
7. **Reasoning room:** For multi-step reasoning, allow the model to work through it before the final answer (and parse out the final answer), or use a model/setting with built-in reasoning — check your provider's docs.
8. **Role/tone:** A brief role is fine; it doesn't replace concrete instructions.
9. **Untrusted input:** Any user- or web-supplied text is data, not instructions (see `ai-app-security`).

## Iteration loop
1. Collect 10–30 real or realistic inputs, including hard and adversarial ones. **This set is the real deliverable.**
2. Write down what "good output" means for each, or a rubric.
3. Run the current prompt; label failures by type.
4. Change **one** thing addressing the biggest failure type. Rerun everything. Keep a changelog.
5. Stop when it passes your bar — not when it looks good on one example.

## Output when reviewing
- Top 3 issues with the specific line and why it causes failure.
- A revised prompt with changes marked.
- 5 test inputs that would distinguish the old and new versions.

Don't promise that a phrasing "always works" — model behavior differs across models and versions. Point to the provider's current prompting docs for model-specific advice.
