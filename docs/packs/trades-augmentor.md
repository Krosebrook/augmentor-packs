# Trades Augmentor (`trades-augmentor`)

> Back-office and study co-pilot for electricians, plumbers, HVAC techs, and contractors: job scoping checklists, quote/estimate builder from your own rates, customer communication drafts, code-lookup question prep that defers to the adopted code and AHJ, job safety checklists, invoicing, scheduling, and licensing exam study. Your numbers, your license, your call.

Version 1.2.0 · License MIT · Source: [`plugins/trades-augmentor`](../../plugins/trades-augmentor) · Pack README: [README](../../plugins/trades-augmentor/README.md)

## Who it's for

Electricians, plumbers, HVAC/R technicians, general and specialty contractors, apprentices, and one-truck shop owners who want faster estimates, clearer customer communication, safer job prep, and structured exam study.

## Install

```
/plugin marketplace add Krosebrook/augmentor-packs
/plugin install trades-augmentor@augmentor-packs
```

See [installation](../installation.md) for local-path installs and troubleshooting.

## Skills

Skills load automatically when your request matches their description. You can also run one directly as `/trades-augmentor:<skill>`.

### `code-lookup-prep`

**When to use:** Use when the user has a code question (electrical, plumbing, mechanical, building, energy). Helps frame the question, identify which code and edition the jurisdiction adopted, which articles/chapters to search by topic, and what to ask the AHJ or inspector. Never states code section numbers or required values as fact.

**Example prompt:** “I need to know the clearance requirements around a panel in a basement. Help me figure out what to look up and what to ask the inspector.”

Source: [SKILL.md](../../plugins/trades-augmentor/skills/code-lookup-prep/SKILL.md)

### `customer-communication`

**When to use:** Use when the user needs to write to a customer — appointment confirmation, running-late text, estimate follow-up, delay or bad-news message, change-order explanation, payment reminder, dispute response, or review request. Short, professional drafts in the user's voice. Never sends; never promises what the user didn't commit to.

**Example prompt:** “Draft a text to a customer explaining that the replacement part is delayed a week and what happens next.”

Source: [SKILL.md](../../plugins/trades-augmentor/skills/customer-communication/SKILL.md)

### `invoicing-and-payments`

**When to use:** Use when the user wants to create or check an invoice, progress/draw billing, change-order billing, or a payment-reminder sequence from their own job records. Shows all arithmetic, ties every line to the quote or an approved change order, and leaves tax and legal questions to professionals.

**Example prompt:** “Make an invoice from these hours and materials; terms net 15; include the change order the customer approved.”

Source: [SKILL.md](../../plugins/trades-augmentor/skills/invoicing-and-payments/SKILL.md)

### `job-safety-checklist`

**When to use:** Use when the user wants a pre-job safety checklist, job hazard analysis (JHA/JSA), toolbox-talk outline, or lockout/tagout steps reminder for a specific task. Prompts hazards and controls to consider; supplements but never replaces the company safety program, OSHA requirements, manufacturer instructions, or a competent person's judgment.

**Example prompt:** “Make a safety checklist for replacing a rooftop unit, two-person crew, crane pick.”

Source: [SKILL.md](../../plugins/trades-augmentor/skills/job-safety-checklist/SKILL.md)

### `job-scoping`

**When to use:** Use when the user needs to scope a job from walk-through notes, photos they describe, or a customer request — service upgrade, repipe, equipment replacement, remodel rough-in. Produces scope of work, inclusions/exclusions, assumptions, site questions, and permit/inspection flags. Doesn't guess site conditions.

**Example prompt:** “Here are my walk-through notes for a 200A panel upgrade. Build a scope with inclusions, exclusions, and questions for the customer.”

Source: [SKILL.md](../../plugins/trades-augmentor/skills/job-scoping/SKILL.md)

### `licensing-exam-study`

**When to use:** Use when the user is preparing for a trade licensing exam (journeyman, master, contractor, EPA 608, business & law) or apprenticeship tests. Builds a plan from the official candidate bulletin, drills calculations and code-book navigation, and quizzes one question at a time. Never reproduces copyrighted exam questions or states code values as authoritative.

**Example prompt:** “I take my journeyman electrician exam in 8 weeks. Build a plan from my candidate bulletin and quiz me.”

Source: [SKILL.md](../../plugins/trades-augmentor/skills/licensing-exam-study/SKILL.md)

### `quote-estimate-builder`

**When to use:** Use when the user wants to build or check a quote/estimate/bid — labor hours, material takeoff, markup, overhead, permit fees, tax, options (good/better/best), and payment terms. Uses only the user's rates and prices, shows all math, and marks any missing number. Produces a customer-facing quote and an internal worksheet.

**Example prompt:** “Build a quote: 6 hours labor at my rate, these materials and prices, 20% markup on materials, 8% tax on materials only.”

Source: [SKILL.md](../../plugins/trades-augmentor/skills/quote-estimate-builder/SKILL.md)

### `scheduling-and-dispatch`

**When to use:** Use when the user wants to plan a day or week of jobs — sequencing, drive-time clustering, crew assignment, material pickups, inspection windows, and buffers for callbacks and emergencies. Uses the user's job list and estimates; flags conflicts rather than guessing durations.

**Example prompt:** “Here are my jobs for next week with durations and locations. Build a schedule that minimizes driving and leaves buffer.”

Source: [SKILL.md](../../plugins/trades-augmentor/skills/scheduling-and-dispatch/SKILL.md)

## Commands

### `/trades-augmentor:code-question`

**What it does:** Frame a code question, identify the adopted code to check, where to look, and a question for the AHJ.

**Arguments:** `[jurisdiction, occupancy, installation question]`

**Example:** `/trades-augmentor:code-question "Austin TX, single-family, bathroom exhaust fan ducting to exterior"`

Source: [code-question.md](../../plugins/trades-augmentor/commands/code-question.md)

### `/trades-augmentor:invoice`

**What it does:** Create an invoice tied to the quote and approved change orders, plus a payment-reminder sequence.

**Arguments:** `[quote/contract, change orders, time & materials, terms]`

**Example:** `/trades-augmentor:invoice "quote #1042 $4,800, CO-1 approved $350, deposit $2,400, net 15"`

Source: [invoice.md](../../plugins/trades-augmentor/commands/invoice.md)

### `/trades-augmentor:quote`

**What it does:** Build an internal estimate worksheet and a customer-facing quote from your own rates and prices, with all math shown.

**Arguments:** `[scope or path] [rates, materials, markup/margin, tax, terms]`

**Example:** `/trades-augmentor:quote scope.md "$95/hr, 10 hrs, materials.csv, 25% markup, tax materials only, 50% deposit"`

Source: [quote.md](../../plugins/trades-augmentor/commands/quote.md)

### `/trades-augmentor:safety-brief`

**What it does:** Generate a task-specific job hazard checklist and a 5-minute toolbox talk.

**Arguments:** `[task, crew size, site conditions]`

**Example:** `/trades-augmentor:safety-brief "attic furnace replacement, 2 techs, summer heat, gas appliance"`

Source: [safety-brief.md](../../plugins/trades-augmentor/commands/safety-brief.md)

### `/trades-augmentor:scope-job`

**What it does:** Turn walk-through notes into scope of work, inclusions/exclusions, assumptions, permit flags, and customer questions.

**Arguments:** `[trade, job type, walk-through notes or path]`

**Example:** `/trades-augmentor:scope-job "electrical, 100A→200A service upgrade, notes/walkthrough.txt"`

Source: [scope-job.md](../../plugins/trades-augmentor/commands/scope-job.md)

## Agents

Claude can delegate to these subagents on its own, or you can call one with `@agent-trades-augmentor:<agent>`.

### `estimate-checker`

**When to use:** Read-only reviewer for quotes, estimates, bids, and invoices. Re-checks arithmetic, markup vs. margin, missing common line items, scope/exclusion gaps, and risky or unapproved commitments. Use before a quote or invoice goes to a customer.

**Tools:** Read, Grep, Glob · **Model:** inherit

**Example prompt:** “@agent-trades-augmentor:estimate-checker check quote-1042.md before I send it”

Source: [estimate-checker.md](../../plugins/trades-augmentor/agents/estimate-checker.md)

### `site-safety-reviewer`

**When to use:** Read-only reviewer for a job hazard analysis, safety checklist, or work plan. Looks for unaddressed hazards, controls that rely only on PPE, missing LOTO/verification steps, and absent emergency information. Use before a crew briefing. Supplements, never replaces, the competent person and company program.

**Tools:** Read, Grep, Glob · **Model:** inherit

**Example prompt:** “@agent-trades-augmentor:site-safety-reviewer review jha-rooftop.md”

Source: [site-safety-reviewer.md](../../plugins/trades-augmentor/agents/site-safety-reviewer.md)

## Guardrails

- Estimates and invoices use only your rates, material prices, markup, and tax settings. Missing numbers are `[DATA NEEDED]`; arithmetic is shown so you can check it.
- Code questions produce lookup checklists and AHJ questions. Section numbers and table values are never stated as fact; everything code-related is `[verify: adopted code edition / AHJ]`.
- Safety checklists are prompts for your own job hazard analysis, company safety program, OSHA rules, and manufacturer instructions — not a substitute.
- Customer messages are drafts; you send them. No promises on price, schedule, or warranty that you didn't specify.
- Licensing study never reproduces copyrighted exam questions and defers to the official candidate bulletin.
- Not legal, tax, or contract advice; lien, contract, and licensing-compliance questions go to qualified professionals.

See [guardrails](../guardrails.md) for the principles behind these rules.

## Sample workflows

**New lead to signed quote.** Walk-through notes → `/trades-augmentor:scope-job` → `/trades-augmentor:quote` with your rate card → `@agent-trades-augmentor:estimate-checker` → you send it.

**Before the job.** `job-safety-checklist` for today's tasks → adapt to your company program → crew briefing.

**Job complete.** `/trades-augmentor:invoice` from your time and materials → `customer-communication` for the thank-you/review request → you send both.

**Exam season.** `licensing-exam-study` with your candidate bulletin → daily quizzes → `code-lookup-prep` to practice navigating your own code book.

---
[← Back to docs index](../index.md)
