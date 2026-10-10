# trades-augmentor

A co-pilot for tradespeople and small contractors that handles the paperwork side faster and helps you study — without pretending to be the code book, the inspector, or your license. It structures scopes, does arithmetic on **your** rates, drafts customer messages for **you** to send, and builds safety checklists you adapt. No accounting, payment, or messaging connectors.

## Install
From inside Claude Code, add the marketplace (a local path, or `Krosebrook/augmentor-packs` on GitHub), then install:

```
/plugin marketplace add <path-to-claude-packs-or-Krosebrook/augmentor-packs>
/plugin install trades-augmentor@augmentor-packs
```

## Skills
| Skill | Use it when |
|---|---|
| `job-scoping` | Turning a walk-through or customer request into a clear scope, inclusions, exclusions, and questions |
| `quote-estimate-builder` | Building a quote from your labor rates, material prices, markup, and tax |
| `customer-communication` | Drafting estimates follow-ups, delay notices, change-order explanations, and review requests |
| `code-lookup-prep` | Framing a code question and finding where to look in your adopted code — no section numbers from memory |
| `job-safety-checklist` | Building a task-specific safety checklist / JHA for today's job |
| `invoicing-and-payments` | Turning time and materials into a clear invoice and payment follow-up |
| `scheduling-and-dispatch` | Planning the week's jobs, routes, crew, materials, and buffers |
| `licensing-exam-study` | Studying for journeyman/master/contractor exams with code-book navigation drills |

## Commands
- `/trades-augmentor:scope-job [trade, job type, walk-through notes or path]`
- `/trades-augmentor:quote [scope or path] [rates, materials, markup/margin, tax, terms]`
- `/trades-augmentor:safety-brief [task, crew size, site conditions]`
- `/trades-augmentor:invoice [quote/contract, change orders, time & materials, terms]`
- `/trades-augmentor:code-question [jurisdiction, occupancy, installation question]`

## Agents
- `estimate-checker` — read-only audit of a quote/estimate for math errors, missing items, and risky terms
- `site-safety-reviewer` — read-only review of a JHA/safety plan for missing hazards and weak controls

## Principles
Uses only your rates, prices, and measurements — gaps are `[DATA NEEDED]`. Never quotes code sections as fact; the adopted code and AHJ govern (`[verify: adopted code edition / AHJ]`). Safety checklists supplement, never replace, your company program, OSHA requirements, and manufacturer instructions. Drafts only, never sends. Not legal or tax advice.
