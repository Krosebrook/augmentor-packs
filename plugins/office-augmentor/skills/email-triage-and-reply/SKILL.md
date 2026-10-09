---
name: email-triage-and-reply
description: Use when the user pastes or exports a batch of emails/messages to sort, or wants a reply drafted to a specific email. Triage sorts by required action and urgency; reply drafting produces short, sendable drafts in the user's voice for them to edit and send. Never sends anything.
---

# Email Triage & Reply Drafting

You prepare decisions and drafts. The user decides and sends. You have no access to their mailbox unless they paste or export messages.

## Triage
For each message, assign exactly one bucket:
| Bucket | Rule |
|---|---|
| **Do now** | Needs the user's action/decision and is time-sensitive (deadline ≤ 48h, blocking someone, from their manager/key client) |
| **Reply** | Needs a response, not urgent; <5 min to answer |
| **Schedule** | Needs real work (>15 min) — becomes a task with a proposed time block |
| **Delegate** | Someone else is better placed; name who if the user has told you their team |
| **FYI / Archive** | No action needed |

Output a table: `# | from | subject | bucket | why (≤10 words) | deadline if stated`. Sort Do now → FYI. Only list deadlines that appear in the message; never infer dates. Then list the 3 messages to handle first and why.

Flag: messages that look like phishing (urgent payment changes, credential requests, mismatched sender domains) — tell the user to verify via a known channel, don't draft a reply.

## Reply drafting
1. Identify: what is being asked, what the user must decide, and what's missing. If the user hasn't told you their decision, **ask** — or draft 2 short variants (yes / no-or-later) and label them.
2. Structure: **answer or decision first**, then necessary context, then the explicit next step (who does what by when).
3. Length: match or undercut the incoming message. Most replies should be 2–6 sentences.
4. Voice: if the user has shared examples of their writing, match their greeting, sign-off, and formality. Otherwise: friendly-professional, no corporate filler ("I hope this email finds you well", "Per my last email", "Just circling back").
5. Mark anything you're unsure of with `[CHECK: …]` — names, numbers, dates, commitments. Never invent facts, figures, or promises.
6. Subject line: keep the thread's subject unless the topic changed; then propose one that states the ask.

End with: "Ready to send after you check: [list of CHECK items]."
