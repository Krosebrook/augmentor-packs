# Office Augmentor (`office-augmentor`)

> Knowledge-work co-pilot that keeps you in charge: inbox triage and reply drafts, meeting prep and notes-to-actions, document and report drafting, spreadsheet formulas and analysis, slide outlines, stakeholder updates, SOP writing, and polite-pushback/negotiation coaching. Drafts only; you review and send.

Version 1.0.0 · License MIT · Source: [`plugins/office-augmentor`](../../plugins/office-augmentor) · Pack README: [README](../../plugins/office-augmentor/README.md)

## Who it's for

Knowledge workers (managers, ICs, operators) who live in email, meetings, docs, spreadsheets, and slides and want to move faster without giving up control of what goes out under their name.

## Install

```
/plugin marketplace add Krosebrook/augmentor-packs
/plugin install office-augmentor@augmentor-packs
```

See [installation](../installation.md) for local-path installs and troubleshooting.

## Skills

Skills load automatically when your request matches their description. You can also run one directly as `/office-augmentor:<skill>`.

### `doc-report-drafter`

**When to use:** Use when the user needs to write or improve a work document — report, memo, proposal, brief, one-pager, business case, or postmortem. Builds the structure with the user, drafts from the facts and data they supply, and runs a clarity edit. Does not invent data, quotes, or results.

**Example prompt:** “Help me write a one-page postmortem from these notes. Use only the numbers I gave you.”

Source: [SKILL.md](../../plugins/office-augmentor/skills/doc-report-drafter/SKILL.md)

### `email-triage-and-reply`

**When to use:** Use when the user pastes or exports a batch of emails/messages to sort, or wants a reply drafted to a specific email. Triage sorts by required action and urgency; reply drafting produces short, sendable drafts in the user's voice for them to edit and send. Never sends anything.

**Example prompt:** “Here are 30 exported emails. Sort them and draft replies to the urgent ones.”

Source: [SKILL.md](../../plugins/office-augmentor/skills/email-triage-and-reply/SKILL.md)

### `meeting-prep-and-actions`

**When to use:** Use before a meeting to build a prep brief and agenda, or after a meeting to turn raw notes or a transcript into decisions, action items with owners and dates, and a follow-up message. Trigger on "prep me for my meeting", "agenda for", "here are my meeting notes", "turn this transcript into action items".

**Example prompt:** “Here's my meeting transcript. Turn it into decisions and action items with owners and dates.”

Source: [SKILL.md](../../plugins/office-augmentor/skills/meeting-prep-and-actions/SKILL.md)

### `pushback-coach`

**When to use:** Use when the user needs to say no, push back on scope or deadlines, disagree with a manager or client, negotiate (workload, timelines, budget, salary/raise, vendor terms), or handle a difficult conversation. Coaches strategy and drafts wording; the user decides and delivers.

**Example prompt:** “My manager wants this shipped two weeks early. Help me push back without burning the relationship.”

Source: [SKILL.md](../../plugins/office-augmentor/skills/pushback-coach/SKILL.md)

### `slide-outliner`

**When to use:** Use when the user needs to build a presentation or deck — outline, storyline, slide titles, speaker notes, or a critique of an existing deck. Produces an action-title storyline the user then builds in PowerPoint, Google Slides, or Keynote.

**Example prompt:** “Outline a 10-slide deck proposing we move to quarterly planning.”

Source: [SKILL.md](../../plugins/office-augmentor/skills/slide-outliner/SKILL.md)

### `sop-writer`

**When to use:** Use when the user wants to document a process — SOP, how-to, runbook, checklist, onboarding guide, or handoff doc — usually from their own rough notes, a screen-recording transcript, or by being interviewed. Produces a testable, step-by-step procedure someone else can follow.

**Example prompt:** “Interview me and turn our month-end close process into an SOP someone else can follow.”

Source: [SKILL.md](../../plugins/office-augmentor/skills/sop-writer/SKILL.md)

### `spreadsheet-helper`

**When to use:** Use when the user needs a spreadsheet formula, wants to understand or debug one, wants to clean or structure data, or wants help analyzing a CSV/Excel/Google Sheets file — pivots, lookups, conditional logic, dates, summary stats, charts. Explains formulas so the user can maintain them.

**Example prompt:** “I need a Google Sheets formula that sums column C where column A is this month. Explain it.”

Source: [SKILL.md](../../plugins/office-augmentor/skills/spreadsheet-helper/SKILL.md)

### `stakeholder-update`

**When to use:** Use when the user needs to write a status update, weekly/monthly report to a manager or leadership, project update, escalation, or "bad news" message to stakeholders. Produces a skimmable update with clear status, asks, and risks from facts the user provides.

**Example prompt:** “Draft my weekly update to leadership. We're slipping on the API migration.”

Source: [SKILL.md](../../plugins/office-augmentor/skills/stakeholder-update/SKILL.md)

## Commands

### `/office-augmentor:formula`

**What it does:** Get a spreadsheet formula (Excel/Google Sheets) with a plain-English explanation, edge cases, and a hand-check.

**Arguments:** `[what you want to calculate, app, and column layout]`

**Example:** `/office-augmentor:formula "count rows where status is Late, Excel, A=name B=status"`

Source: [formula.md](../../plugins/office-augmentor/commands/formula.md)

### `/office-augmentor:meeting-actions`

**What it does:** Turn meeting notes or a transcript into decisions, owned action items, open questions, and a follow-up draft.

**Arguments:** `[path to notes/transcript or paste]`

**Example:** `/office-augmentor:meeting-actions notes/standup.md`

Source: [meeting-actions.md](../../plugins/office-augmentor/commands/meeting-actions.md)

### `/office-augmentor:say-no`

**What it does:** Get a polite, clear pushback message (warm / neutral / firm) with options and trade-offs.

**Arguments:** `[what you were asked, what you want instead, who's asking]`

**Example:** `/office-augmentor:say-no "asked to take on vendor review; want to defer to Q1; my director"`

Source: [say-no.md](../../plugins/office-augmentor/commands/say-no.md)

### `/office-augmentor:triage-inbox`

**What it does:** Sort a batch of pasted/exported emails into Do now / Reply / Schedule / Delegate / FYI and draft the urgent replies.

**Arguments:** `[path to exported emails or paste them]`

**Example:** `/office-augmentor:triage-inbox export/inbox.txt`

Source: [triage-inbox.md](../../plugins/office-augmentor/commands/triage-inbox.md)

### `/office-augmentor:weekly-update`

**What it does:** Draft a skimmable stakeholder/status update from your raw notes for the week.

**Arguments:** `[audience] [path to notes or paste bullet dump]`

**Example:** `/office-augmentor:weekly-update leadership notes/week41.md`

Source: [weekly-update.md](../../plugins/office-augmentor/commands/weekly-update.md)

## Agents

Claude can delegate to these subagents on its own, or you can call one with `@agent-office-augmentor:<agent>`.

### `draft-critic`

**When to use:** Red-team reviewer for any work draft (email, memo, report, update, deck outline) before it goes out. Checks clarity, tone, unsupported claims, missing asks, and risky commitments from the reader's point of view. Use when the user asks for a final check or "is this ready to send?

**Tools:** Read, Grep, Glob · **Model:** inherit

**Example prompt:** “@agent-office-augmentor:draft-critic is this email ready to send? (draft.md)”

Source: [draft-critic.md](../../plugins/office-augmentor/agents/draft-critic.md)

### `formula-auditor`

**When to use:** Audits spreadsheet logic for errors — inconsistent formulas down a column, hardcoded numbers, broken references, wrong ranges, risky lookups — in an exported workbook or pasted formulas. Use when the user wants a spreadsheet model checked before relying on it or sharing it.

**Tools:** Read, Grep, Glob, Bash · **Model:** inherit

**Example prompt:** “@agent-office-augmentor:formula-auditor audit budget.csv formulas before I share it.”

Source: [formula-auditor.md](../../plugins/office-augmentor/agents/formula-auditor.md)

## Guardrails

- Drafts only. Nothing is sent, posted, or scheduled for you; you review and send.
- Documents and updates are built from the facts and data you supply; it does not invent data, quotes, or results. Gaps are marked for you to fill.
- Formulas come with a plain-English explanation and a hand-check so you can maintain them.
- Pushback and negotiation coaching is strategy and wording. You decide and deliver. Not legal or HR advice.

See [guardrails](../guardrails.md) for the principles behind these rules.

## Sample workflows

**Monday morning.** `/office-augmentor:triage-inbox` on an export → edit and send the urgent drafts yourself → `meeting-prep-and-actions` for today's key meeting.

**After a meeting.** `/office-augmentor:meeting-actions` on the transcript → `@agent-office-augmentor:draft-critic` on the follow-up → you send it.

**Friday update.** `/office-augmentor:weekly-update` from your notes → `draft-critic` red-team → send.

**Sharing a model.** `spreadsheet-helper` / `/office-augmentor:formula` to build it → `@agent-office-augmentor:formula-auditor` before you share.

---
[← Back to docs index](../index.md)
