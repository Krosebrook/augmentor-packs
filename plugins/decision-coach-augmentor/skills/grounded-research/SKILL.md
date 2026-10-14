---
name: grounded-research
description: "Use after a needs summary is confirmed, or when someone asks to research, look up, find, or compare current options, prices, plans, products, or providers: \"research this\", \"what are my options?\", \"what's available now?\", \"find the best X\". Uses live web search and page fetches (WebSearch, WebFetch) across several independent sources, prefers official and recent pages, records publish or update dates, rejects stale info, cross-checks claims across two or more sources, and cites a URL for every fact. If web tools are unavailable, says so and stops instead of answering from memory."
allowed-tools: WebSearch WebFetch
---

# Grounded Research

Goal: a list of real, currently available options with **every fact tied to a dated source URL**. Your memory is not a source. If it isn't cited, it isn't in the output.

## Step 0: Check your tools (mandatory)
- You need Claude Code's **WebSearch** (finds pages) and **WebFetch** (reads a page). Do one small search first.
- If either tool is missing, denied, errors repeatedly, or returns nothing usable, **stop** and say:
  > "I can't reach the web right now (reason: …), so I won't answer from memory; it could be out of date or wrong. You can allow web search when Claude Code asks, check your permission settings, or try again later. Here's the checklist of what to look up yourself: …"
  Then give a short checklist of sources to check. Do not list products, prices, or specs.
- Never fill gaps with "as of my knowledge" facts.

## Step 1: Plan the searches
- Start from the confirmed needs summary (from intake-grill). If there isn't one, ask 2–3 quick questions or suggest `/decision-coach-augmentor:grill-me` first.
- Write 3–6 search queries covering: official/manufacturer or provider pages, independent reviews or testing, official regulators or agencies (for money, health, legal, safety), and recent news or recalls. Include the current year in queries for fast-moving topics.
- Include the person's location when it matters (availability, prices, rules).

## Step 2: Search and read
- Use WebSearch, then **WebFetch the actual pages**. Don't rely on search snippets for facts.
- Prefer, in order: **primary/official** (manufacturer spec pages, provider plan pages, government or regulator sites, standards bodies) → **independent testing and expert reviews** (outlets that describe how they test) → **aggregated user reports** (as signal, not fact).
- Use at least **3 independent sources** overall, from different organizations. Ignore pages that are mostly affiliate links with no testing method, AI-generated listicles, and sponsored content; if you use one, label it.
- WebFetch summarizes pages; if a page "doesn't mention" something, re-fetch with a more specific prompt before concluding it's absent.

## Step 3: Date everything (freshness rule)
For each source record **published or last-updated date** (from the page; if none is shown, write `date unknown`).

| Topic speed | Examples | Flag as possibly stale | Don't rely on alone |
|---|---|---|---|
| Fast | tech, software, AI, phone/internet plans, prices, deals, interest rates, travel and entry rules, laws and regulations, insurance terms | older than **12 months** | older than **18 months** (need a newer confirming source) |
| Medium | appliances, cars (model-year), services, general health guidance | older than **24 months** | older than **36 months** |
| Slow | durable how-to, basic principles | older than **5 years** | n/a, but prefer newer |

- **Prices, availability, promotions, and rates:** only from a page you fetched today; write "seen <date>". Never estimate.
- `date unknown` sources can support a claim only if a dated source agrees.

## Step 4: Cross-check
- Every important claim (price, key spec, coverage, rule, reliability verdict) needs **2+ independent sources**, ideally one primary.
- One source only → keep it but mark `[CHECK: single source – <what to verify>]`.
- Sources disagree → show both with dates; prefer the newer primary source; mark `[CHECK: sources conflict]`.
- Couldn't verify → `[CHECK: could not verify <claim>]`. Never invent prices, specs, ratings, reviews, or quotes.

## Output: research notes
```
RESEARCH NOTES – <decision>   (searched <today's date>, location: <if relevant>)
Options found (that fit the deal-breakers):
1. <Option> – key facts:
   - <fact> [S1, S3]
   - <price: $X seen <date>> [S2]   or [CHECK: …]
Ruled out: <option> – why (e.g. breaks deal-breaker) [S#]
Sources:
S1. <title> – <publisher> – <URL> – published/updated <date> – type: official | independent test | news | user reports
...
Stale or weak sources flagged: …
Gaps: [CHECK: …]
```
Then hand off to the recommendation-builder skill (or `/decision-coach-augmentor:compare`).

## Rules
- No affiliate bias: never favor a seller; you have no partnerships. Mention where to buy only if useful, and more than one place if possible.
- Health, legal, money: official and primary sources only for facts; general information; defer to professionals.
- Don't open login-only or paywalled pages, enter personal data, or submit forms. Research only; never buy, book, or sign up.
