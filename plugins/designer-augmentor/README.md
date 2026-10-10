# designer-augmentor

Design co-pilot that sharpens your judgment instead of generating for you: brief-before-build, heuristic UX review, WCAG 2.2 accessibility checks, design-token and type/color system advice, usability test planning, generic-AI-look ("slop") detection, and motion/interaction review. Critiques and scaffolds; you design and decide.

## Install
```
/plugin marketplace add Krosebrook/augmentor-packs
/plugin install designer-augmentor@augmentor-packs
```

## Skills
| Skill | Use it when |
|---|---|
| `design-brief-builder` | Before any UI, screen, page, or visual is designed or generated |
| `ux-heuristic-review` | the user shares a screen, mockup, screenshot, flow description, or URL notes and wants a UX critique |
| `accessibility-checker` | the user wants an accessibility check of a design, component, HTML/CSS/JSX, or color palette against WCAG 2.2 AA |
| `design-token-advisor` | the user is building or cleaning up a design system: color, type scale, spacing, radius, elevation, and motion tokens, naming (primitive vs |
| `usability-test-planner` | the user wants to plan, run, or analyze a usability test or quick prototype test: research questions, participant criteria, tasks, script, metrics, note-taking grid, and synthesis |
| `ai-look-detector` | the user wants a UI, landing page, illustration prompt, or icon set checked for the generic "AI-generated" look: default gradients, interchangeable hero layouts, emoji or mixed icon sets, filler copy, and visual cliches |
| `motion-interaction-review` | the user is designing or reviewing animations, transitions, scroll effects, parallax, hover/press states, or microinteractions |

## Commands
- `/designer-augmentor:brief [what you are designing, for whom]` — Turn a design request into a one-page brief before any visuals
- `/designer-augmentor:heuristic-review [screenshot path, mockup, or flow description]` — Structured UX critique of a screen or flow with severity ratings
- `/designer-augmentor:a11y-check [file path, code, or hex values]` — WCAG 2.2 AA check of a component, page, or palette
- `/designer-augmentor:test-plan [decision to inform + who your users are]` — Draft a usability test plan, script, and note grid

## Agents
- `design-critic` — Read-only design critic
- `a11y-auditor` — Read-only accessibility auditor for HTML, CSS, JSX/TSX, or Vue files in the repo

## Principles
- Critiques and scaffolds; never claims a design is "done" or compliant on its own authority.
- Never invents user research, quotes, analytics, brand colors, or testimonials. Gaps are `[DATA NEEDED]`, `[CONTENT NEEDED]`, `[QUOTE NEEDED]`, `[CONFIRM]`.
- Accessibility checks are review aids, not conformance certification or legal advice.
- Agents are read-only.
