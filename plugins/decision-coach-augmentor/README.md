# decision-coach-augmentor

Make a big choice with confidence. Claude **grills you** first, one plain question at a time, to uncover what you really need (budget, priorities, deal-breakers, context). It writes a summary for you to confirm, then researches current options with **live web search**: several independent, dated sources, with a link for every fact and nothing from memory. Finally it compares the options against *your* criteria. You decide. It never buys, signs up, or sends anything.

**Level:** Beginner. New to all of this? Read [getting started](../../docs/beginners/getting-started.md) first.

## Install
```
/plugin marketplace add Krosebrook/augmentor-packs
/plugin install decision-coach-augmentor@augmentor-packs
```

Then type `/decision-coach-augmentor:grill-me a new laptop` (or whatever you're deciding).

**Web access:** research uses Claude Code's built-in `WebSearch` and `WebFetch` tools. Claude Code may ask your permission the first time; say yes to let it search. If web search isn't available (for example on some cloud providers, or if you've turned it off), the pack tells you and stops instead of guessing from memory.

## Skills
| Skill | Use it when |
|---|---|
| `intake-grill` | you want help deciding and need to figure out what you actually need (one question at a time; say "enough, go" any time) |
| `grounded-research` | you want current options found on the web, with dated sources and links |
| `recommendation-builder` | you want options compared in a plain table with a top pick, runner-up, and "avoid if" |
| `best-practice-check` | you want to know the current recommended way to do something, and what changed |

Interview templates (used by `intake-grill`): [buying a thing](skills/intake-grill/templates/buying.md) · [choosing a service or provider](skills/intake-grill/templates/service-provider.md) · [planning a trip, event, or move](skills/intake-grill/templates/planning.md) · [money decisions](skills/intake-grill/templates/money.md) (general education only) · [health and legal topics](skills/intake-grill/templates/health-legal.md) (information only).

## Commands
- `/decision-coach-augmentor:grill-me [what you're deciding]` — The full flow: interview → research → comparison
- `/decision-coach-augmentor:research [topic]` — Research current options with dated, cited sources
- `/decision-coach-augmentor:compare [options or links]` — Plain comparison table with top pick and runner-up
- `/decision-coach-augmentor:best-practice [topic]` — Current guidance from authoritative sources, and what changed
- `/decision-coach-augmentor:recheck [earlier recommendation]` — Refresh an old recommendation: prices, availability, sources

## Agents
- `source-verifier` — Re-opens every cited link and checks the claim is really there, with dates (web tools, no edits)
- `devils-advocate` — Argues the strongest honest case against the top pick (web tools, no edits)

## How grounding works
- **Web tools or nothing:** research skills and commands pre-approve `WebSearch` and `WebFetch` for that turn (`allowed-tools`). If the tools are missing or denied, it says so and stops; it never answers from memory.
- **Every fact has a dated link.** Sources list the publisher, URL, and published or updated date. Prices are "seen <date>".
- **Freshness rule:** fast-moving topics (tech, prices, plans, rates, rules) are flagged if older than 12 months and need a newer confirming source past 18 months; medium topics flag at 24 months.
- **Cross-checked:** important claims need two or more independent sources; anything else is marked `[CHECK: …]`.
- **Stamped:** every recommendation says "as of <date>"; `/recheck` refreshes it.

## Principles
- You decide. It asks, researches, and lays out trade-offs; it never pressures.
- Never buys, books, signs up, fills forms, or contacts anyone. No MCP servers, hooks, or executables.
- No affiliate bias; it has no partnerships. Uncertainty is disclosed, not hidden.
- Never invents prices, specs, ratings, or reviews.
- Privacy: don't share account numbers, passwords, ID numbers, exact addresses, or medical record details. Ranges and general terms work fine.
- Money topics are general education, not financial advice. Health and legal topics are information only; a professional decides.
