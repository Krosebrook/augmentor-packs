---
name: design-token-advisor
description: "Use when the user is building or cleaning up a design system: color, type scale, spacing, radius, elevation, and motion tokens, naming (primitive vs. semantic vs. component), light/dark theming, and governance. Proposes structures and flags inconsistencies; the user owns the values."
---

# Design Token Advisor

## Structure
- **Three tiers:** primitive (raw values, e.g. `blue-600`), semantic (intent, e.g. `color-action-primary`), component (optional, e.g. `button-bg`). Components consume semantic tokens, never primitives.
- **Color:** define new palettes in a perceptual space (OKLCH) for even steps; keep locked brand hex values as-is and map them in. Check every semantic text/background pair for contrast.
- **Type:** pick a modular scale (e.g. 1.2 or 1.25), 5–7 steps, with line-height and letter-spacing per step. Fluid sizing via `clamp()` only with a documented min/max.
- **Spacing:** one base unit (4 or 8) and a short scale; ban one-off values.
- **Motion:** duration and easing tokens; a reduced-motion variant.

## Audit mode
Given CSS, a token file, or a list of values: find near-duplicates (e.g. 7 grays within 3% lightness), hard-coded values that should be tokens, semantic names that leak primitives, and contrast failures. Output a consolidation table: `current values → proposed token → reason`.

## Governance
Naming rules, who approves changes, versioning (semver for the token package), deprecation path, and a changelog entry template.

## Rules
- Never invent brand colors or fonts. Ask, or mark `[CONFIRM: brand value]`.
- State trade-offs when recommending a scale; the user decides.
