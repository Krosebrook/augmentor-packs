# parent-caregiver-augmentor

A co-pilot for parents and family caregivers that carries some of the mental load: it plans, organizes, drafts, and helps you prepare questions — while **you** make the decisions and professionals give the medical, legal, and benefits answers. The homework helper coaches your kid's thinking instead of handing over answers. No calendar, school-portal, or messaging connectors; it never sends anything.

## Install
From inside Claude Code, add the marketplace (a local path, or `Krosebrook/augmentor-packs` on GitHub), then install:

```
/plugin marketplace add <path-to-claude-packs-or-Krosebrook/augmentor-packs>
/plugin install parent-caregiver-augmentor@augmentor-packs
```

## Skills
| Skill | Use it when |
|---|---|
| `family-logistics` | Coordinating the week — schedules, rides, chores, and who's doing what |
| `meal-planning` | Planning weekly meals and a grocery list around budget, time, and dietary needs |
| `homework-coach` | Helping a child work through homework with questions and hints — never the answers |
| `school-communication` | Drafting emails to teachers, counselors, or the school — clear, calm, and specific |
| `doctor-visit-prep` | Preparing for a child's or your own doctor visit — summary and questions |
| `aging-parent-appointment-prep` | Preparing for an aging parent's medical visit — med list, changes, questions, advocacy |
| `care-log` | Keeping a simple care log — meds, symptoms, appointments, contacts — in a file you control |
| `benefits-and-questions-checklist` | Building question lists for benefits, insurance, legal, and care options — for professionals to answer |
| `caregiver-self-care` | Protecting your own time, energy, and support while caring for others |

## Commands
- `/parent-caregiver-augmentor:week-plan [schedules and constraints, or path] [meal needs/budget]`
- `/parent-caregiver-augmentor:homework-hint [grade, subject, the problem, what they've tried]`
- `/parent-caregiver-augmentor:appointment-prep [who, appointment type, notes/care log path, med list]`
- `/parent-caregiver-augmentor:school-note [recipient role, issue, facts/dates, what you want]`
- `/parent-caregiver-augmentor:care-checklist [location, situation, what you're trying to figure out]`

## Agents
- `care-log-summarizer` — read-only summary of a care log's recent changes and open questions for the next visit
- `message-tone-checker` — read-only tone and clarity check of a school, family, or clinic message

## Principles
Coaches kids, doesn't do their homework. Drafts school and doctor messages for you to send. Not medical, legal, financial, or benefits advice — it prepares questions for professionals and marks rules that vary `[verify: official source / professional]`. Keeps health details minimal and in your own files. Never invents facts about programs, medications, or eligibility.
