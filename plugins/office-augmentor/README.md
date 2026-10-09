# office-augmentor

A knowledge-work co-pilot for Claude Code that makes you faster and sharper without taking the wheel. It sorts, structures, drafts, and critiques — **you** decide and send. No mailbox, calendar, or drive connectors are included; paste or point it at exported files.

## Install
From inside Claude Code, add the marketplace (a local path, or `<owner>/<repo>` once it's hosted on GitHub), then install:

```
/plugin marketplace add <path-to-claude-packs-or-owner/repo>
/plugin install office-augmentor@augmentor-packs
```

On Claude Code 2.1.275 or later you can also install in one step from a hosted repo:

```
/plugin install office-augmentor --marketplace <owner>/<repo>
```

## Skills
| Skill | Use it when |
|---|---|
| `email-triage-and-reply` | Sorting a batch of messages; drafting a reply in your voice |
| `meeting-prep-and-actions` | Prep brief & agenda before; decisions & action items after |
| `doc-report-drafter` | Memos, reports, proposals, postmortems — answer-first structure |
| `spreadsheet-helper` | Formulas explained, debugging, data cleaning, analysis on a file |
| `slide-outliner` | Action-title storyline and speaker notes for a deck |
| `stakeholder-update` | Honest, skimmable status updates and bad-news messages |
| `sop-writer` | Turning know-how into a testable step-by-step procedure |
| `pushback-coach` | Saying no, renegotiating scope/deadlines, salary/vendor talks |

## Commands
- `/office-augmentor:triage-inbox [emails]`
- `/office-augmentor:meeting-actions [notes]`
- `/office-augmentor:weekly-update [audience] [notes]`
- `/office-augmentor:formula [need + layout]`
- `/office-augmentor:say-no [situation]`

## Agents
- `draft-critic` — reads your draft as the recipient would; verdict + prioritized fixes
- `formula-auditor` — read-only audit of workbook logic (inconsistent formulas, hardcodes, range mismatches)

## Principles
Drafts only, never sends. Never invents facts or figures — gaps are marked `[CHECK: …]` or `[DATA NEEDED]`. Not legal/HR advice.
