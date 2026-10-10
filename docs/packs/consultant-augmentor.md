# Consultant Augmentor (`consultant-augmentor`)

> Consulting and proposal co-pilot for advisors, solutions architects, and internal enablement leads: AI use-case discovery and scoring, engagement scoping and phasing, transparent ROI models, workshop design, survey design, audience-tiered reporting, and adversarial review of recommendations. Structures and stress-tests; you own the advice and the numbers.

Version 1.2.0 · License MIT · Source: [`plugins/consultant-augmentor`](../../plugins/consultant-augmentor) · Pack README: [README](../../plugins/consultant-augmentor/README.md)

## Who it's for

Independent consultants, solutions architects, pre-sales engineers, and internal AI/transformation leads who scope work, build business cases, and run workshops.

## Install

```
/plugin marketplace add Krosebrook/augmentor-packs
/plugin install consultant-augmentor@augmentor-packs
```

See [installation](../installation.md) for local-path installs and troubleshooting.

## Skills

Skills load automatically when your request matches their description. You can also run one directly as `/consultant-augmentor:<skill>`.

### `use-case-discovery`

**When to use:** Use when running or preparing an AI (or automation) use-case discovery session with a team or client. Structures the session, captures candidate use cases, and scores them on value, feasibility, data readiness, and risk into a ranked backlog. Uses only what participants provide; never invents use cases as client facts.

**Example prompt:** “Plan a 90-minute AI use-case discovery workshop for a 12-person finance team.”

Source: [SKILL.md](../../plugins/consultant-augmentor/skills/use-case-discovery/SKILL.md)

### `engagement-scoper`

**When to use:** Use when scoping a consulting engagement, internal project, or proposal: objectives, scope and out-of-scope, phases and deliverables, assumptions, client responsibilities, risks, acceptance criteria, and a pricing structure from the user's own rates. Drafts the scope; the user negotiates and signs.

**Example prompt:** “Scope a 3-phase AI pilot for a mid-size logistics company. My rate is [your rate].”

Source: [SKILL.md](../../plugins/consultant-augmentor/skills/engagement-scoper/SKILL.md)

### `roi-model-builder`

**When to use:** Use when building a business case or ROI model for an AI, automation, or software initiative. Builds a transparent model (baseline, benefits, costs, adoption ramp, sensitivity) from user-supplied inputs, with every assumption visible and conservative/expected/optimistic scenarios. Never invents benchmarks or results.

**Example prompt:** “Build an ROI model for automating invoice intake. We process about [volume] invoices a month.”

Source: [SKILL.md](../../plugins/consultant-augmentor/skills/roi-model-builder/SKILL.md)

### `workshop-designer`

**When to use:** Use when designing a workshop, training session, or facilitated exercise (AI enablement, process mapping, prioritization, retrospectives). Produces objectives, agenda with timings, exercises with instructions, materials, facilitation notes for skeptics and dominant voices, and follow-up actions. The user facilitates.

**Example prompt:** “Design a 2-hour hands-on AI basics workshop for skeptical operations staff.”

Source: [SKILL.md](../../plugins/consultant-augmentor/skills/workshop-designer/SKILL.md)

### `survey-designer`

**When to use:** Use when designing, reviewing, or analyzing a survey: adoption or baseline measurement, post-engagement feedback, needs assessment, or pulse checks. Writes unbiased questions, chooses scales, plans distribution and sample, and analyzes results the user provides. Never fabricates responses.

**Example prompt:** “Write a baseline AI adoption survey we can repeat in 6 months.”

Source: [SKILL.md](../../plugins/consultant-augmentor/skills/survey-designer/SKILL.md)

### `audience-tier-rewriter`

**When to use:** Use when the same findings, research, or update must go to several audiences (executives, managers, practitioners, non-technical staff). Produces tiered versions from one source of truth: same facts, different depth, vocabulary, and asks. Keeps numbers consistent across tiers and adds nothing that is not in the source.

**Example prompt:** “Turn this pilot results doc into exec, manager, and all-staff versions.”

Source: [SKILL.md](../../plugins/consultant-augmentor/skills/audience-tier-rewriter/SKILL.md)

### `adversarial-recommendation-review`

**When to use:** Use before a recommendation, proposal, audit, or plan goes to a client or decision maker. Stress-tests it: steelmans the opposing view, checks evidence behind each claim, finds hidden assumptions and failure modes, and rates confidence. Produces a review memo; the user decides what to change.

**Example prompt:** “Stress-test my recommendation to replace our ticketing tool.”

Source: [SKILL.md](../../plugins/consultant-augmentor/skills/adversarial-recommendation-review/SKILL.md)

## Commands

### `/consultant-augmentor:discover`

Plan a use-case discovery session and scoring rubric. Arguments: `[team/client context + session length]`

Source: [discover.md](../../plugins/consultant-augmentor/commands/discover.md)

### `/consultant-augmentor:scope`

Draft an engagement or project scope with phases and commercials. Arguments: `[objective, constraints, your rates if pricing]`

Source: [scope.md](../../plugins/consultant-augmentor/commands/scope.md)

### `/consultant-augmentor:roi`

Build a transparent ROI model from your inputs. Arguments: `[initiative + baseline numbers you have]`

Source: [roi.md](../../plugins/consultant-augmentor/commands/roi.md)

### `/consultant-augmentor:stress-test`

Adversarially review a recommendation or proposal before it ships. Arguments: `[file path or pasted recommendation]`

Source: [stress-test.md](../../plugins/consultant-augmentor/commands/stress-test.md)

## Agents

### `proposal-critic`

**When to use:** Read-only critic for proposals, scopes, SOWs, and business cases. Reads as the buyer: checks clarity of outcomes, scope boundaries, unsupported numbers, risky commitments, missing client responsibilities, and pricing math. Use for a final check before sending.

**Tools:** Read, Grep, Glob · **Model:** inherit

Call it with `@agent-consultant-augmentor:proposal-critic`.

Source: [proposal-critic.md](../../plugins/consultant-augmentor/agents/proposal-critic.md)

### `assumption-auditor`

**When to use:** Read-only auditor for ROI models, forecasts, and business cases (markdown, CSV, or spreadsheet exports). Lists every input and assumption, traces which outputs depend on it, flags unsourced numbers, and identifies the inputs that swing the result most.

**Tools:** Read, Grep, Glob, Bash · **Model:** inherit

Call it with `@agent-consultant-augmentor:assumption-auditor`.

Source: [assumption-auditor.md](../../plugins/consultant-augmentor/agents/assumption-auditor.md)

## Guardrails

- You own the advice, the numbers, and the client relationship; the pack structures and stress-tests.
- Never invents use cases as client facts, benchmarks, survey responses, rates, or results. Gaps are `[DATA NEEDED]`, `[CHECK: source]`, `[CONFIRM]`, `[ASSIGN]`.
- Proposals, reports, and replies are drafts; nothing is sent.
- Not legal or financial advice; contract terms go to counsel.
- Use roles, not names, and de-identify client data before pasting.

See [guardrails](../guardrails.md) for the principles behind these rules.

---
[← Back to docs index](../index.md)
