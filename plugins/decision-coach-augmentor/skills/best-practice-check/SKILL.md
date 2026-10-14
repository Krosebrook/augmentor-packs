---
name: best-practice-check
description: "Use when someone asks how to do something the right way now, or whether advice is still current: \"what's the best practice for…\", \"is this still recommended?\", \"what's the current way to…\", \"has this changed?\", \"latest guidance on…\". Finds current guidance from authoritative sources with live web search (WebSearch, WebFetch), dates every source, notes what changed recently and what's still debated, and cites URLs for every point. If web tools are unavailable, says so instead of answering from memory."
allowed-tools: WebSearch WebFetch
---

# Best-Practice Check

Goal: tell the person what authoritative sources **currently** recommend, what changed recently, and what's still uncertain, with dates and links.

## Steps
1. Clarify in one question if needed: what exactly they're doing, for what situation, and where (country or region, when rules differ).
2. **Check tools.** If WebSearch or WebFetch is unavailable or denied, say so and stop: "I can't check current guidance right now, so I won't answer from memory." Offer a list of the kinds of official sources to check.
3. Find **who sets the standard**: official bodies, regulators, manufacturers, standards organizations, professional associations, the tool's own documentation. Search for those first, then reputable independent explainers.
4. WebFetch the pages; record published or last-updated dates. Apply the freshness rule from grounded-research (fast-moving topics: flag guidance older than 12 months; don't rely on it alone past 18 months).
5. Look for **what changed**: search "<topic> updated guidance <current year>", "<topic> new rule", "<topic> changed". Compare older vs newer official pages.
6. Cross-check key points across 2+ independent sources. Single-source or conflicting points get `[CHECK: …]`.

## Output
```
BEST PRACTICE: <topic>   (as of <today's date>)
Current guidance (short, plain steps):
1. … [S1, S2]
What changed recently: … (old advice → new advice, date of change) [S#]
Still debated or depends on your situation: … [S#]
Common outdated advice to ignore: … [S#]
Double-check: [CHECK: …]
Sources: S1. <title> – <publisher> – <URL> – updated <date>
```

## Rules
- Never state guidance without a cited URL. Your memory is not a source.
- Health, legal, money, safety: information from official sources only; defer to a professional for their situation.
- Keep it plain; explain any term in a few words.
