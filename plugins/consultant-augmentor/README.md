# consultant-augmentor

Consulting and proposal co-pilot for advisors, solutions architects, and internal enablement leads: AI use-case discovery and scoring, engagement scoping and phasing, transparent ROI models, workshop design, survey design, audience-tiered reporting, and adversarial review of recommendations. Structures and stress-tests; you own the advice and the numbers.

## Install
```
/plugin marketplace add Krosebrook/augmentor-packs
/plugin install consultant-augmentor@augmentor-packs
```

## Skills
| Skill | Use it when |
|---|---|
| `use-case-discovery` | running or preparing an AI (or automation) use-case discovery session with a team or client |
| `engagement-scoper` | scoping a consulting engagement, internal project, or proposal: objectives, scope and out-of-scope, phases and deliverables, assumptions, client responsibilities, risks, acceptance criteria, and a pricing structure from the user's own rates |
| `roi-model-builder` | building a business case or ROI model for an AI, automation, or software initiative |
| `workshop-designer` | designing a workshop, training session, or facilitated exercise (AI enablement, process mapping, prioritization, retrospectives) |
| `survey-designer` | designing, reviewing, or analyzing a survey: adoption or baseline measurement, post-engagement feedback, needs assessment, or pulse checks |
| `audience-tier-rewriter` | the same findings, research, or update must go to several audiences (executives, managers, practitioners, non-technical staff) |
| `adversarial-recommendation-review` | Before a recommendation, proposal, audit, or plan goes to a client or decision maker |

## Commands
- `/consultant-augmentor:discover [team/client context + session length]` — Plan a use-case discovery session and scoring rubric
- `/consultant-augmentor:scope [objective, constraints, your rates if pricing]` — Draft an engagement or project scope with phases and commercials
- `/consultant-augmentor:roi [initiative + baseline numbers you have]` — Build a transparent ROI model from your inputs
- `/consultant-augmentor:stress-test [file path or pasted recommendation]` — Adversarially review a recommendation or proposal before it ships

## Agents
- `proposal-critic` — Read-only critic for proposals, scopes, SOWs, and business cases
- `assumption-auditor` — Read-only auditor for ROI models, forecasts, and business cases (markdown, CSV, or spreadsheet exports)

## Principles
- You own the advice, the numbers, and the client relationship; the pack structures and stress-tests.
- Never invents use cases as client facts, benchmarks, survey responses, rates, or results. Gaps are `[DATA NEEDED]`, `[CHECK: source]`, `[CONFIRM]`, `[ASSIGN]`.
- Proposals, reports, and replies are drafts; nothing is sent.
- Not legal or financial advice; contract terms go to counsel.
- Use roles, not names, and de-identify client data before pasting.
