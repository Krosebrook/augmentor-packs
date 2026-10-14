# Decision Coach Augmentor (`decision-coach-augmentor`)

> Make a big choice with confidence: Claude grills you with one plain question at a time to uncover your real needs, budget, priorities, and deal-breakers, confirms a written summary, then researches current options with live web search (multiple dated, cited sources, nothing from memory) and compares them against your own criteria. You decide; it never buys, signs up, or sends anything.

Version 1.4.0 · License MIT · Source: [`plugins/decision-coach-augmentor`](../../plugins/decision-coach-augmentor) · Pack README: [README](../../plugins/decision-coach-augmentor/README.md)

**Level: Beginner** ([what levels mean](../index.md#levels)). No tech skills needed. It needs Claude Code's built-in web search, which Claude Code may ask you to allow.

## Who it's for

Anyone facing a choice: buying a laptop, appliance, or car; picking a phone plan, insurance, or software; planning a trip, event, or move; understanding a money, health, or legal option before talking to a professional.

## Install

```
/plugin marketplace add Krosebrook/augmentor-packs
/plugin install decision-coach-augmentor@augmentor-packs
```

Then type `/decision-coach-augmentor:grill-me` and what you're deciding. See [installation](../installation.md) for local-path installs and troubleshooting.

## How it works

1. **Grill:** one question at a time about your real needs, budget, must-haves, deal-breakers, and timing. It pushes back on vague answers ("cheap as in under what?") and names hidden assumptions. About 8–12 questions; say **"enough, go"** any time.
2. **Confirm:** it writes a needs summary in your words. Nothing is researched until you say it's right.
3. **Research:** live `WebSearch` and `WebFetch`, at least three independent sources, official and recent ones first, every source dated, important claims checked in two or more places.
4. **Recommend:** a plain table scored against *your* criteria, a top pick, a runner-up, "avoid if" notes, trade-offs, what to double-check, and an "as of <date>" stamp.

**Freshness rule:** for fast-moving topics (tech, prices, plans, rates, rules), sources older than 12 months are flagged, and past 18 months they need a newer source to back them up. Prices are only used if seen on the day of research. If the web tools aren't available, the pack tells you and stops rather than answering from memory.

## Skills

Skills load automatically when your request matches their description. You can also run one directly as `/decision-coach-augmentor:<skill>`.

### `intake-grill`

**When to use:** Use when someone wants help choosing, buying, or planning something ("grill me", "help me decide", "which should I get?"). A friendly structured interview, one plain question at a time, that pushes back on vague answers and surfaces hidden assumptions, then confirms a written needs summary before any research. Uses templates for buying a thing, choosing a service or provider, planning, money decisions (general education only), and health or legal topics (information only).

**Example prompt:** “Grill me. I need a new laptop and I have no idea what to get.”

Source: [SKILL.md](../../plugins/decision-coach-augmentor/skills/intake-grill/SKILL.md) · Templates: [buying](../../plugins/decision-coach-augmentor/skills/intake-grill/templates/buying.md), [service or provider](../../plugins/decision-coach-augmentor/skills/intake-grill/templates/service-provider.md), [planning](../../plugins/decision-coach-augmentor/skills/intake-grill/templates/planning.md), [money](../../plugins/decision-coach-augmentor/skills/intake-grill/templates/money.md), [health and legal](../../plugins/decision-coach-augmentor/skills/intake-grill/templates/health-legal.md)

### `grounded-research`

**When to use:** Use after a needs summary is confirmed, or to research current options, prices, plans, or providers. Uses live web search and page fetches across several independent sources, prefers official and recent pages, dates every source, rejects stale info, cross-checks claims, and cites a URL for every fact. Stops if web tools are unavailable.

**Example prompt:** “Research cordless vacuums under $300 that are good with pet hair.”

Source: [SKILL.md](../../plugins/decision-coach-augmentor/skills/grounded-research/SKILL.md)

### `recommendation-builder`

**When to use:** Use to compare researched options: a plain table against your own criteria, top pick, runner-up, "avoid if", trade-offs, sources with dates, what to double-check, and an "as of <date>" stamp.

**Example prompt:** “Compare these three phone plans for me. Price and coverage matter most.”

Source: [SKILL.md](../../plugins/decision-coach-augmentor/skills/recommendation-builder/SKILL.md)

### `best-practice-check`

**When to use:** Use to find the current recommended way to do something from authoritative sources, with dates, what changed recently, and what's still debated.

**Example prompt:** “What's the current best practice for backing up family photos?”

Source: [SKILL.md](../../plugins/decision-coach-augmentor/skills/best-practice-check/SKILL.md)

## Commands

### `/decision-coach-augmentor:grill-me`

The full flow: interview, confirmed needs summary, grounded research, comparison. Arguments: `[what you're deciding]`

Source: [grill-me.md](../../plugins/decision-coach-augmentor/commands/grill-me.md)

### `/decision-coach-augmentor:research`

Research current options with dated, cited web sources. Arguments: `[topic]`

Source: [research.md](../../plugins/decision-coach-augmentor/commands/research.md)

### `/decision-coach-augmentor:compare`

Compare options in a plain table against your criteria, with a top pick and runner-up. Arguments: `[optional: options or links, and what matters most]`

Source: [compare.md](../../plugins/decision-coach-augmentor/commands/compare.md)

### `/decision-coach-augmentor:best-practice`

Current best-practice guidance from authoritative, dated sources. Arguments: `[topic]`

Source: [best-practice.md](../../plugins/decision-coach-augmentor/commands/best-practice.md)

### `/decision-coach-augmentor:recheck`

Refresh an earlier recommendation: re-fetch sources, re-check prices and availability, look for anything new, and re-stamp the date. Arguments: `[the earlier recommendation, or a file path]`

Source: [recheck.md](../../plugins/decision-coach-augmentor/commands/recheck.md)

## Agents

### `source-verifier`

**When to use:** Re-opens every cited URL, checks the claim is actually on the page, records dates, and flags stale, dead, single-source, affiliate-heavy, or unsupported claims.

**Tools:** Read, Grep, Glob, WebSearch, WebFetch · **Model:** inherit

Call it with `@agent-decision-coach-augmentor:source-verifier`.

Source: [source-verifier.md](../../plugins/decision-coach-augmentor/agents/source-verifier.md)

### `devils-advocate`

**When to use:** Argues the strongest honest case against the top pick: checks deal-breakers, searches for recent recalls, price changes, and reliability problems, and makes the best case for the runner-up.

**Tools:** Read, Grep, Glob, WebSearch, WebFetch · **Model:** inherit

Call it with `@agent-decision-coach-augmentor:devils-advocate`.

Source: [devils-advocate.md](../../plugins/decision-coach-augmentor/agents/devils-advocate.md)

## Guardrails

- **You decide.** It never buys, books, signs up, fills forms, or contacts anyone. No MCP servers, hooks, or executables.
- **Grounded or silent.** Facts come from live, dated, cited web sources; if web tools are unavailable it stops instead of answering from memory.
- **No invented prices, specs, ratings, or reviews.** Gaps are marked `[CHECK: …]`; assumptions are marked `[ASSUMED: …]`.
- **No affiliate bias.** No partnerships; uncertainty and close calls are stated plainly.
- **Privacy:** don't share account numbers, passwords, ID numbers, exact addresses, or medical record details.
- **Not professional advice.** Money topics are general education; health and legal topics are information only and defer to professionals. Emergencies get emergency resources first.

See [guardrails](../guardrails.md).

[← Back to docs index](../index.md)
