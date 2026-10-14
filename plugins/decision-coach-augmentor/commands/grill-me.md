---
description: Start the full flow - I grill you with questions, research current options on the web, and compare them for you
argument-hint: "[what you're deciding, e.g. 'a laptop for school' or 'a phone plan']"
allowed-tools: WebSearch WebFetch
---

Decision: $ARGUMENTS

Run the full decision-coach flow:
1. **Intake** with the intake-grill skill: privacy reminder, then one plain question at a time (pick the matching template), push back on vague answers, cap at about 8–12 questions, stop if I say "enough, go". Write the needs summary and wait for me to confirm it.
2. **Research** with the grounded-research skill only after I confirm: check web tools first (if unavailable, say so and stop; never answer from memory), multiple independent dated sources, freshness rule, cross-check, a URL for every fact, `[CHECK: …]` for anything unverified.
3. **Recommend** with the recommendation-builder skill: comparison table against my criteria, top pick, runner-up, "avoid if", trade-offs, what to double-check, sources with dates, "as of <date>".

I make the final decision. Never buy, sign up, book, or contact anyone for me.
