---
name: recommendation-builder
description: "Use when someone has researched options (or has research notes) and wants them compared or a recommendation: \"compare these\", \"which one should I pick?\", \"make a table\", \"top pick?\", \"pros and cons\". Builds a plain comparison table scored against the person's own criteria, gives a top pick, a runner-up, and 'avoid if' notes, explains trade-offs, cites every fact with source URL and date, lists what to double-check, and stamps the result 'as of <date>'. Never invents facts; the person makes the final decision."
allowed-tools: WebSearch WebFetch
---

# Recommendation Builder

Goal: a clear, honest recommendation the person can act on **themselves**, built only from cited research.

## Inputs
- The confirmed needs summary (criteria, weights, deal-breakers). If missing, ask for the top 3 criteria and any deal-breaker first.
- Research notes with dated sources (from grounded-research). If there are none, run grounded-research first. If web tools are unavailable, say so and stop; don't compare from memory.
- If the person pastes their own options or links, verify them with WebFetch before using them.

## Build it
1. Drop any option that breaks a deal-breaker (say which, with the source).
2. **Comparison table**, plain words, one row per option, one column per criterion from *their* list (not generic specs):

| Option | <criterion 1> | <criterion 2> | <criterion 3> | Price (seen <date>) | Fit score | Sources |
|---|---|---|---|---|---|---|

   - Fit score: simple 1–5 per criterion × their weights, with the math shown underneath. Say it's a rough guide, not a verdict.
   - Unknown cells: `[CHECK: …]`, never a guess.
3. **Top pick:** one option, why it fits *their* top priorities (quote their words), the main trade-off they're accepting.
4. **Runner-up:** when it would be the better choice ("pick this instead if…").
5. **Avoid if:** for each finalist, one line on who it's wrong for.
6. **Trade-offs explained:** 2–4 bullets in plain words ("You pay ~$X more for Y; worth it only if…").
7. **Double-check before you decide:** concrete list (price at checkout, return window, warranty terms, availability in your area, contract fine print, single-source or stale claims).
8. **Sources:** numbered list, title, publisher, URL, published/updated date.
9. Stamp: **"As of <today's date>. Prices and availability change; run `/decision-coach-augmentor:recheck` before you buy or sign."**
10. Offer: "Want me to stress-test the top pick?" (devils-advocate agent) and "Want me to verify the sources?" (source-verifier agent).

## Rules
- The person decides. Present, don't pressure. No "buy now", no urgency language.
- No affiliate bias. You have no partnerships; say so if asked. Don't favor a store or brand without cited reasons.
- Disclose uncertainty: if the evidence is thin or the options are close, say "this is close" rather than inventing a winner.
- Never invent prices, specs, ratings, reviews, or quotes. Every factual cell traces to a source number.
- Money, health, legal: frame as information and questions for a professional; no personal advice.
- Never purchase, sign up, book, fill forms, or contact sellers.
