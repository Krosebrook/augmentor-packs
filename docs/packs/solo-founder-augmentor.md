# Solo Founder Augmentor (`solo-founder-augmentor`)

> A sparring partner for solo founders: offer and positioning, customer discovery interview scripts and synthesis, pricing, landing page copy, outreach drafts, a weekly CEO review, runway math, SOPs for delegation, and a decision journal. Challenges your assumptions; never invents market data.

Version 1.4.0 · License MIT · Source: [`plugins/solo-founder-augmentor`](../../plugins/solo-founder-augmentor) · Pack README: [README](../../plugins/solo-founder-augmentor/README.md)

**Level: Intermediate** ([what levels mean](../index.md#levels)). Assumes comfort with business concepts (pricing, runway, positioning) and working with your own numbers in files.

## Who it's for

Solo founders and very small teams who need a candid sparring partner for positioning, discovery, pricing, copy, and running the business week to week.

## Install

```
/plugin marketplace add Krosebrook/augmentor-packs
/plugin install solo-founder-augmentor@augmentor-packs
```

See [installation](../installation.md) for local-path installs and troubleshooting.

## Skills

Skills load automatically when your request matches their description. You can also run one directly as `/solo-founder-augmentor:<skill>`.

### `customer-discovery`

**When to use:** Use when a founder wants to talk to potential customers — writing interview scripts, avoiding leading questions, recruiting interviewees, or synthesizing interview notes into patterns. Based on the "talk about their life, not your idea" approach (as in Rob Fitzpatrick's The Mom Test). Trigger on "customer interviews", "validate my idea", "discovery calls".

**Example prompt:** “Write an interview script for freelance bookkeepers. I want to test whether month-end is painful.”

Source: [SKILL.md](../../plugins/solo-founder-augmentor/skills/customer-discovery/SKILL.md)

### `decision-journal`

**When to use:** Use when a founder faces a meaningful decision (hire, pivot, pricing, big spend, partnership, quitting a channel) and wants to think it through and record it, or wants to review past decisions to learn from outcomes. Separates decision quality from outcome luck.

**Example prompt:** “I'm deciding whether to hire a contractor at $3k/month. Help me think it through and log it.”

Source: [SKILL.md](../../plugins/solo-founder-augmentor/skills/decision-journal/SKILL.md)

### `landing-page-copy`

**When to use:** Use when a founder is writing or critiquing landing page, homepage, or sales page copy — headlines, value props, sections, calls to action, FAQs. Builds copy from the founder's positioning and customers' own words, with options to test. Never fabricates testimonials, logos, metrics, or claims.

**Example prompt:** “Critique my homepage headline and suggest options to test.”

Source: [SKILL.md](../../plugins/solo-founder-augmentor/skills/landing-page-copy/SKILL.md)

### `offer-positioning`

**When to use:** Use when a founder is defining or sharpening what they sell, who it's for, and why it beats alternatives — positioning statement, ideal customer profile, value proposition, offer design, niche selection, or "people don't get what we do." Works from evidence the founder has, and labels everything else as a hypothesis.

**Example prompt:** “People don't get what we do. Help me sharpen positioning from my interview notes.”

Source: [SKILL.md](../../plugins/solo-founder-augmentor/skills/offer-positioning/SKILL.md)

### `outreach-drafts`

**When to use:** Use when a founder needs cold or warm outreach — emails, LinkedIn/DMs, partnership asks, interview recruiting, follow-ups, or a short sequence. Drafts short, specific, honest messages the founder personalizes and sends themselves. Never sends, scrapes, or invents personalization.

**Example prompt:** “Draft a short cold email to recruit 5 interviewees from agency owners.”

Source: [SKILL.md](../../plugins/solo-founder-augmentor/skills/outreach-drafts/SKILL.md)

### `pricing-strategy`

**When to use:** Use when a founder is setting, testing, or changing prices — choosing a pricing model, value metric, tiers, discounts, raising prices, or deciding what to charge a first customer. Builds pricing from customer value and alternatives, checks unit economics, and designs a test. No invented benchmarks.

**Example prompt:** “What should I charge my first customer? Here are my costs and what they pay today.”

Source: [SKILL.md](../../plugins/solo-founder-augmentor/skills/pricing-strategy/SKILL.md)

### `runway-basics`

**When to use:** Use when a founder wants to understand their cash runway, burn rate, break-even point, simple financial projections, or the effect of a decision (hire, price change, tool spend) on runway. Does transparent math only from numbers the founder provides; not tax, legal, or investment advice.

**Example prompt:** “I have $40k cash, $6k/month costs, $1.5k MRR. What's my runway and break-even?”

Source: [SKILL.md](../../plugins/solo-founder-augmentor/skills/runway-basics/SKILL.md)

### `sop-delegation`

**When to use:** Use when a solo founder wants to delegate or outsource work — deciding what to hand off, writing an SOP or Loom-style walkthrough script, scoping a contractor/VA task, writing a delegation brief, or setting up quality checks. Helps the founder get out of tasks that don't need them.

**Example prompt:** “What should I hand off to a VA first, and write the brief for it.”

Source: [SKILL.md](../../plugins/solo-founder-augmentor/skills/sop-delegation/SKILL.md)

### `weekly-ceo-review`

**When to use:** Use when a solo founder wants to run a weekly review — reflect on the week, check metrics against goals, choose priorities for next week, or get accountability. Runs a structured review as a candid board-member-style sparring partner, from the founder's own numbers and notes.

**Example prompt:** “Run my weekly review. Here are this week's numbers and notes.”

Source: [SKILL.md](../../plugins/solo-founder-augmentor/skills/weekly-ceo-review/SKILL.md)

## Commands

### `/solo-founder-augmentor:ceo-review`

**What it does:** Run your weekly CEO review — scoreboard, commitments, the one constraint, next week's top 3.

**Arguments:** `[optional: paste this week's metrics/notes]`

**Example:** `/solo-founder-augmentor:ceo-review (paste this week's metrics)`

Source: [ceo-review.md](../../plugins/solo-founder-augmentor/commands/ceo-review.md)

### `/solo-founder-augmentor:interview-script`

**What it does:** Generate a customer discovery interview script that avoids leading questions, for a specific segment and hypotheses.

**Arguments:** `[segment] [hypotheses to test]`

**Example:** `/solo-founder-augmentor:interview-script "freelance designers" "invoicing is a top-3 pain"`

Source: [interview-script.md](../../plugins/solo-founder-augmentor/commands/interview-script.md)

### `/solo-founder-augmentor:log-decision`

**What it does:** Record a decision journal entry (options, assumptions, probabilities, pre-mortem, kill criteria, review date).

**Arguments:** `[the decision you're facing]`

**Example:** `/solo-founder-augmentor:log-decision "switch from monthly to annual pricing"`

Source: [log-decision.md](../../plugins/solo-founder-augmentor/commands/log-decision.md)

### `/solo-founder-augmentor:positioning`

**What it does:** Work through your positioning (alternatives, unique attributes, value, best-fit customers, category) and get a one-line positioning statement.

**Arguments:** `[what you sell and to whom, in a sentence]`

**Example:** `/solo-founder-augmentor:positioning "scheduling tool for dog groomers"`

Source: [positioning.md](../../plugins/solo-founder-augmentor/commands/positioning.md)

### `/solo-founder-augmentor:runway`

**What it does:** Calculate burn, runway, break-even, and scenarios from your own numbers.

**Arguments:** `[cash] [monthly costs] [revenue] or path to a CSV`

**Example:** `/solo-founder-augmentor:runway 40000 6000 1500`

Source: [runway.md](../../plugins/solo-founder-augmentor/commands/runway.md)

## Agents

Claude can delegate to these subagents on its own, or you can call one with `@agent-solo-founder-augmentor:<agent>`.

### `copy-critic`

**When to use:** Critiques landing pages, outreach messages, and sales copy from the target customer's perspective — clarity, specificity, proof, objections, CTA — and flags unverifiable or fabricated claims. Use before publishing a page or sending an outreach campaign.

**Tools:** Read, Grep, Glob · **Model:** inherit

**Example prompt:** “@agent-solo-founder-augmentor:copy-critic critique landing.md from my customer's perspective.”

Source: [copy-critic.md](../../plugins/solo-founder-augmentor/agents/copy-critic.md)

### `discovery-synthesizer`

**When to use:** Synthesizes a set of customer interview notes or transcripts into evidence-backed patterns, with counts, verbatim quotes, disconfirming evidence, and implications for positioning and pricing. Use after a round of customer discovery interviews.

**Tools:** Read, Grep, Glob, Write · **Model:** inherit

**Example prompt:** “@agent-solo-founder-augmentor:discovery-synthesizer synthesize interviews/ into patterns.”

Source: [discovery-synthesizer.md](../../plugins/solo-founder-augmentor/agents/discovery-synthesizer.md)

## Guardrails

- Never invents market data, benchmarks, testimonials, logos, or metrics. Missing social proof is marked `[TESTIMONIAL NEEDED]` for you to fill with real proof or remove.
- Outreach drafts are for you to personalize and send. It never sends, scrapes, or invents personalization.
- Runway math is transparent and uses only the numbers you provide. Not tax, legal, or investment advice.
- Unproven claims are labeled as hypotheses, and it pushes back on your assumptions.

See [guardrails](../guardrails.md) for the principles behind these rules.

## Sample workflows

**Finding fit.** `/solo-founder-augmentor:interview-script` → `outreach-drafts` to recruit interviewees (you send) → run interviews → `@agent-solo-founder-augmentor:discovery-synthesizer` → `/solo-founder-augmentor:positioning`.

**Launching a page.** `landing-page-copy` from your positioning and customer quotes → `@agent-solo-founder-augmentor:copy-critic` → you fill every `[TESTIMONIAL NEEDED]` with real ones or delete it.

**Weekly rhythm.** `/solo-founder-augmentor:ceo-review` every Friday → `/solo-founder-augmentor:log-decision` for big calls → `/solo-founder-augmentor:runway` whenever costs change.

---
[← Back to docs index](../index.md)
