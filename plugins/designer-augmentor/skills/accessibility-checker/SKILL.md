---
name: accessibility-checker
description: "Use when the user wants an accessibility check of a design, component, HTML/CSS/JSX, or color palette against WCAG 2.2 AA. Checks contrast, keyboard and focus, semantics and labels, motion, and target size, and explains each failure with the success criterion. Not a legal compliance certification."
---

# Accessibility Checker (WCAG 2.2 AA)

## What to check
- **Contrast:** text 4.5:1 (3:1 for large text 24px or 18.66px bold), UI components and focus indicators 3:1 against adjacent colors. Compute ratios from the actual hex values given; never guess. If values are missing: `[DATA NEEDED: hex values]`.
- **Keyboard:** every interactive element reachable and operable; logical tab order; no keyboard traps; visible focus (2.4.7) not obscured (2.4.11).
- **Semantics:** native elements first (button, a, label, fieldset); headings in order; landmarks; form inputs with programmatic labels; images with meaningful alt or empty alt if decorative; ARIA only when native fails, and correct roles/states.
- **Motion:** respects `prefers-reduced-motion`; nothing flashes more than 3 times per second; auto-moving content can be paused (2.2.2).
- **Target size:** at least 24x24 CSS px or adequate spacing (2.5.8).
- **Forms and errors:** errors identified in text, not color alone; suggestions offered; no redundant re-entry (3.3.7); accessible authentication (3.3.8).

## Output
`Issue | Element | WCAG SC | Level | Fix (code or spec)`, then a short pass list of what is already right.

## Rules
- Automated-style checks cannot confirm screen reader experience. Recommend testing with at least one screen reader and keyboard-only.
- This is a review aid, not a conformance claim or legal advice.
