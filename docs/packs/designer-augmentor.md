# Designer Augmentor (`designer-augmentor`)

> Design co-pilot that sharpens your judgment instead of generating for you: brief-before-build, heuristic UX review, WCAG 2.2 accessibility checks, design-token and type/color system advice, usability test planning, generic-AI-look ("slop") detection, and motion/interaction review. Critiques and scaffolds; you design and decide.

Version 1.2.0 · License MIT · Source: [`plugins/designer-augmentor`](../../plugins/designer-augmentor) · Pack README: [README](../../plugins/designer-augmentor/README.md)

## Who it's for

Product designers, UX/UI designers, and developers doing design work who want a rigorous second pair of eyes and faster structure without handing over taste.

## Install

```
/plugin marketplace add Krosebrook/augmentor-packs
/plugin install designer-augmentor@augmentor-packs
```

See [installation](../installation.md) for local-path installs and troubleshooting.

## Skills

Skills load automatically when your request matches their description. You can also run one directly as `/designer-augmentor:<skill>`.

### `design-brief-builder`

**When to use:** Use before any UI, screen, page, or visual is designed or generated. Interviews the user into a one-page design brief: problem, audience, success signal, constraints, content inventory, locked tokens, and anti-goals. Refuses to jump to visuals until the brief is agreed. Never invents user research or metrics.

**Example prompt:** “Before you mock anything up: I need a settings page for a scheduling app.”

Source: [SKILL.md](../../plugins/designer-augmentor/skills/design-brief-builder/SKILL.md)

### `ux-heuristic-review`

**When to use:** Use when the user shares a screen, mockup, screenshot, flow description, or URL notes and wants a UX critique. Runs a structured heuristic evaluation (Nielsen's 10 plus task-flow checks), rates severity, and gives specific fixes. Reviews; does not redesign unless asked.

**Example prompt:** “Review this checkout flow screenshot for a first-time mobile user.”

Source: [SKILL.md](../../plugins/designer-augmentor/skills/ux-heuristic-review/SKILL.md)

### `accessibility-checker`

**When to use:** Use when the user wants an accessibility check of a design, component, HTML/CSS/JSX, or color palette against WCAG 2.2 AA. Checks contrast, keyboard and focus, semantics and labels, motion, and target size, and explains each failure with the success criterion. Not a legal compliance certification.

**Example prompt:** “Check this button component and my palette (#6B7280 on #F3F4F6) against WCAG 2.2 AA.”

Source: [SKILL.md](../../plugins/designer-augmentor/skills/accessibility-checker/SKILL.md)

### `design-token-advisor`

**When to use:** Use when the user is building or cleaning up a design system: color, type scale, spacing, radius, elevation, and motion tokens, naming (primitive vs. semantic vs. component), light/dark theming, and governance. Proposes structures and flags inconsistencies; the user owns the values.

**Example prompt:** “Here is our CSS. Find near-duplicate colors and propose a semantic token layer.”

Source: [SKILL.md](../../plugins/designer-augmentor/skills/design-token-advisor/SKILL.md)

### `usability-test-planner`

**When to use:** Use when the user wants to plan, run, or analyze a usability test or quick prototype test: research questions, participant criteria, tasks, script, metrics, note-taking grid, and synthesis. Prepares the study; the user recruits, moderates, and draws conclusions. Never fabricates findings.

**Example prompt:** “Plan a 5-person test of our onboarding prototype.”

Source: [SKILL.md](../../plugins/designer-augmentor/skills/usability-test-planner/SKILL.md)

### `ai-look-detector`

**When to use:** Use when the user wants a UI, landing page, illustration prompt, or icon set checked for the generic "AI-generated" look: default gradients, interchangeable hero layouts, emoji or mixed icon sets, filler copy, and visual cliches. Lists the tells and suggests deliberate alternatives grounded in the brief.

**Example prompt:** “Does this landing page look AI-generated? Here is the HTML.”

Source: [SKILL.md](../../plugins/designer-augmentor/skills/ai-look-detector/SKILL.md)

### `motion-interaction-review`

**When to use:** Use when the user is designing or reviewing animations, transitions, scroll effects, parallax, hover/press states, or microinteractions. Checks purpose, timing, easing, performance (compositor-only properties), and reduced-motion handling, and proposes concrete values.

**Example prompt:** “Review the scroll parallax and hover states in hero.css.”

Source: [SKILL.md](../../plugins/designer-augmentor/skills/motion-interaction-review/SKILL.md)

## Commands

### `/designer-augmentor:brief`

Turn a design request into a one-page brief before any visuals. Arguments: `[what you are designing, for whom]`

Source: [brief.md](../../plugins/designer-augmentor/commands/brief.md)

### `/designer-augmentor:heuristic-review`

Structured UX critique of a screen or flow with severity ratings. Arguments: `[screenshot path, mockup, or flow description]`

Source: [heuristic-review.md](../../plugins/designer-augmentor/commands/heuristic-review.md)

### `/designer-augmentor:a11y-check`

WCAG 2.2 AA check of a component, page, or palette. Arguments: `[file path, code, or hex values]`

Source: [a11y-check.md](../../plugins/designer-augmentor/commands/a11y-check.md)

### `/designer-augmentor:test-plan`

Draft a usability test plan, script, and note grid. Arguments: `[decision to inform + who your users are]`

Source: [test-plan.md](../../plugins/designer-augmentor/commands/test-plan.md)

## Agents

### `design-critic`

**When to use:** Read-only design critic. Reviews a design brief, mockup description, screenshot, or front-end code against its stated brief: hierarchy, clarity of the primary action, consistency with tokens, generic-look tells, and states. Use for a final check before handoff.

**Tools:** Read, Grep, Glob · **Model:** inherit

Call it with `@agent-designer-augmentor:design-critic`.

Source: [design-critic.md](../../plugins/designer-augmentor/agents/design-critic.md)

### `a11y-auditor`

**When to use:** Read-only accessibility auditor for HTML, CSS, JSX/TSX, or Vue files in the repo. Scans for WCAG 2.2 AA issues: missing labels and alt text, non-semantic interactive elements, focus removal, missing reduced-motion handling, small targets, and color pairs to verify. Reports with file and line.

**Tools:** Read, Grep, Glob · **Model:** inherit

Call it with `@agent-designer-augmentor:a11y-auditor`.

Source: [a11y-auditor.md](../../plugins/designer-augmentor/agents/a11y-auditor.md)

## Guardrails

- Critiques and scaffolds; never claims a design is "done" or compliant on its own authority.
- Never invents user research, quotes, analytics, brand colors, or testimonials. Gaps are `[DATA NEEDED]`, `[CONTENT NEEDED]`, `[QUOTE NEEDED]`, `[CONFIRM]`.
- Accessibility checks are review aids, not conformance certification or legal advice.
- Agents are read-only.

See [guardrails](../guardrails.md) for the principles behind these rules.

---
[← Back to docs index](../index.md)
