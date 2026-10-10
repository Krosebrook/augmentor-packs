---
name: review-feedback-planner
description: "Use when the user receives code review comments or PR feedback and wants to process them systematically. Parses each comment, classifies it (bug, design, style, question, nit), proposes a response and change plan, flags disagreements to discuss, and checks nothing is missed. Drafts replies; the user posts them."
---

# Review Feedback Planner

1. **Inventory:** list every comment with location and reviewer intent in one line.
2. **Classify:** must-fix (bug, security, correctness), should-fix (design, maintainability), nit/style, question, out-of-scope.
3. **Plan:** for each, the concrete change or the reason not to change. Group related changes into commits.
4. **Disagreements:** where you think the reviewer is wrong, draft a respectful reply with evidence and an offered alternative.
5. **Draft replies:** short, specific ("Done in abc123: extracted X"), never defensive.
6. **Verify:** after changes, map each comment to its resolution; nothing left unaddressed.

## Rules
- Replies are drafts for the user to post. Nothing is posted automatically.
- Do not claim a change was made until it exists in the diff.
