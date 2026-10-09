---
description: Sort a batch of pasted/exported emails into Do now / Reply / Schedule / Delegate / FYI and draft the urgent replies
argument-hint: "[path to exported emails or paste them]"
---

Triage these messages: $ARGUMENTS

Use the email-triage-and-reply skill:
1. Triage table sorted by bucket, with reason and any explicitly stated deadline.
2. Top 3 to handle first.
3. Draft replies for every **Do now** item (and **Reply** items if there are ≤5), each with `[CHECK: …]` markers for anything I must confirm. Where my decision is needed and unknown, give a yes and a no/later variant.
4. Flag anything that looks like phishing.
Do not send anything. Drafts only.
