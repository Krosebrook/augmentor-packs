# solo-founder-augmentor

A sparring partner for solo founders. It asks the hard questions, structures your thinking, does the math transparently, and drafts copy and outreach for you to refine — it never invents market data, testimonials, or personalization, and it never sends anything.

## Install
From inside Claude Code, add the marketplace (a local path, or `<owner>/<repo>` once it's hosted on GitHub), then install:

```
/plugin marketplace add <path-to-claude-packs-or-owner/repo>
/plugin install solo-founder-augmentor@augmentor-packs
```

On Claude Code 2.1.275 or later you can also install in one step from a hosted repo:

```
/plugin install solo-founder-augmentor --marketplace <owner>/<repo>
```

## Skills
| Skill | Use it when |
|---|---|
| `offer-positioning` | Defining who it's for, why you win vs. alternatives, and the offer |
| `customer-discovery` | Interview scripts without leading questions; synthesis |
| `pricing-strategy` | Value metric, model, tiers, unit economics, price tests |
| `landing-page-copy` | Page structure, headlines to test, no fake proof |
| `outreach-drafts` | Short honest cold/warm outreach and follow-up sequences |
| `weekly-ceo-review` | Weekly scoreboard, constraint, top 3 priorities |
| `runway-basics` | Burn, runway, break-even, scenarios — transparent math |
| `sop-delegation` | What to hand off, delegation briefs, SOPs, hand-off protocol |
| `decision-journal` | Recording decisions with assumptions, pre-mortems, review dates |

## Commands
- `/solo-founder-augmentor:positioning [what you sell]`
- `/solo-founder-augmentor:interview-script [segment] [hypotheses]`
- `/solo-founder-augmentor:ceo-review [notes]`
- `/solo-founder-augmentor:runway [numbers or CSV]`
- `/solo-founder-augmentor:log-decision [decision]`

## Agents
- `discovery-synthesizer` — evidence-backed patterns with counts and verbatim quotes, including disconfirming evidence
- `copy-critic` — skeptical-customer critique of pages and outreach; flags unverifiable claims

## Notes
Not legal, tax, or investment advice. Files like `ceo-review-log.md`, `decision-journal.md`, and `runway.csv` are written to your current directory only after you confirm.
