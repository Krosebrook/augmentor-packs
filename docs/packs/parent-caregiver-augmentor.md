# Parent & Caregiver Augmentor (`parent-caregiver-augmentor`)

> Organizing and coaching co-pilot for parents and family caregivers: family logistics and meal planning, a homework helper that coaches instead of answering, drafts for school and doctor communication, aging-parent caregiving (appointment prep, care log, benefits-and-questions checklists that defer to professionals), and caregiver self-care. You decide and send; it never gives medical, legal, or benefits rulings.

Version 1.4.0 · License MIT · Source: [`plugins/parent-caregiver-augmentor`](../../plugins/parent-caregiver-augmentor) · Pack README: [README](../../plugins/parent-caregiver-augmentor/README.md)

**Level: Beginner** ([what levels mean](../index.md#levels)). Family and caregiving tasks in everyday words.

## Who it's for

Parents and guardians juggling school, activities, meals, and appointments, and adults caring for aging parents or relatives (often both at once — the "sandwich generation").

## Install

```
/plugin marketplace add Krosebrook/augmentor-packs
/plugin install parent-caregiver-augmentor@augmentor-packs
```

See [installation](../installation.md) for local-path installs and troubleshooting.

## Skills

Skills load automatically when your request matches their description. You can also run one directly as `/parent-caregiver-augmentor:<skill>`.

### `aging-parent-appointment-prep`

**When to use:** Use when the user is caring for an aging parent or relative and needs to prepare for a medical, specialist, or care-planning appointment — medication list review questions, changes noticed (memory, mobility, falls, mood, appetite), questions to ask, consent and privacy logistics, and an after-visit summary. Organizes and prepares; defers all medical decisions to clinicians.

**Example prompt:** “Dad has a geriatrician visit Tuesday. Here's his med list and what we've noticed. Prepare a summary and questions.”

Source: [SKILL.md](../../plugins/parent-caregiver-augmentor/skills/aging-parent-appointment-prep/SKILL.md)

### `benefits-and-questions-checklist`

**When to use:** Use when a caregiver is navigating benefits, insurance, care options, or legal/financial planning for a relative — e.g. home care, assisted living, government programs, disability benefits, power of attorney, advance directives. Produces organized checklists of questions and documents to gather, and who to ask. Never determines eligibility, coverage, or legal strategy.

**Example prompt:** “My mother may need in-home help. Make a checklist of questions for her insurance, a social worker, and an elder-law attorney.”

Source: [SKILL.md](../../plugins/parent-caregiver-augmentor/skills/benefits-and-questions-checklist/SKILL.md)

### `care-log`

**When to use:** Use when the user wants to set up or update a caregiving log for a child, parent, or relative — daily notes, symptoms, medications given, appointments, contacts, insurance/provider info, and questions for next visit — stored in a local file the user controls. Summarizes trends from entries; never interprets them medically.

**Example prompt:** “Set up a care log for my mom and add today's notes: dizzy after lunch, BP reading the nurse gave us, new appointment on the 14th.”

Source: [SKILL.md](../../plugins/parent-caregiver-augmentor/skills/care-log/SKILL.md)

### `caregiver-self-care`

**When to use:** Use when a parent or caregiver is stretched thin and wants to plan respite, set boundaries, split duties with family, script asking for help, or build small sustainable self-care habits. Supportive, practical coaching; not therapy. Points to crisis resources and professional support when needed.

**Example prompt:** “I'm caring for my dad and two kids and I'm exhausted. Help me find some realistic breathing room this week.”

Source: [SKILL.md](../../plugins/parent-caregiver-augmentor/skills/caregiver-self-care/SKILL.md)

### `doctor-visit-prep`

**When to use:** Use when the user wants to prepare for a medical appointment for a child, themselves, or a family member — symptom timeline, medication list, questions to ask, and a one-page summary to bring — or to draft a portal message to a clinic. Organizes the user's notes; never diagnoses or recommends treatment.

**Example prompt:** “Help me prepare for my daughter's appointment about recurring stomach aches. Here are my notes.”

Source: [SKILL.md](../../plugins/parent-caregiver-augmentor/skills/doctor-visit-prep/SKILL.md)

### `family-logistics`

**When to use:** Use when the user wants to organize family logistics — weekly schedule, carpools and rides, activity conflicts, chore charts, packing lists, school-year checklists, or a shared family plan. Turns scattered details into a clear plan with owners. Doesn't access calendars; works from what the user pastes.

**Example prompt:** “Here's everyone's schedule this week. Who drives where, and where are the conflicts?”

Source: [SKILL.md](../../plugins/parent-caregiver-augmentor/skills/family-logistics/SKILL.md)

### `homework-coach`

**When to use:** Use when a parent or child wants homework help — math, reading, writing, science, study skills. Coaches with Socratic questions, hints, and worked examples on *different* problems, checks the child's own work, and adjusts to the child's grade level. Never gives the final answers to assigned problems or writes graded work.

**Example prompt:** “My 9-year-old is stuck on this fractions worksheet. Coach her through the first problem without giving the answer.”

Source: [SKILL.md](../../plugins/parent-caregiver-augmentor/skills/homework-coach/SKILL.md)

### `meal-planning`

**When to use:** Use when the user wants a meal plan, grocery list, batch-cooking/prep plan, school lunch ideas, or ways to use what's in the fridge — within their budget, time, equipment, preferences, and dietary needs they state. Medical diets defer to the user's clinician or dietitian.

**Example prompt:** “Plan 5 weeknight dinners under 30 minutes, one kid is vegetarian, budget around $120, and make a grocery list by aisle.”

Source: [SKILL.md](../../plugins/parent-caregiver-augmentor/skills/meal-planning/SKILL.md)

### `school-communication`

**When to use:** Use when the user needs to write to a teacher, counselor, coach, principal, or school office — absences, concerns, grades, bullying reports, accommodation requests (504/IEP in the US), meeting requests, or thank-yous — or prepare for a parent-teacher conference. Drafts only; legal or special-education rights questions go to advocates or professionals.

**Example prompt:** “Draft an email to my son's teacher asking about his falling grades and setting up a meeting.”

Source: [SKILL.md](../../plugins/parent-caregiver-augmentor/skills/school-communication/SKILL.md)

## Commands

### `/parent-caregiver-augmentor:appointment-prep`

**What it does:** Prepare a one-page visit summary and prioritized questions for a child's, your own, or an aging parent's appointment.

**Arguments:** `[who, appointment type, notes/care log path, med list]`

**Example:** `/parent-caregiver-augmentor:appointment-prep "Dad, geriatrician, care/dad-log.md"`

Source: [appointment-prep.md](../../plugins/parent-caregiver-augmentor/commands/appointment-prep.md)

### `/parent-caregiver-augmentor:care-checklist`

**What it does:** Build a who-to-ask question checklist and document list for benefits, insurance, legal, or care options.

**Arguments:** `[location, situation, what you're trying to figure out]`

**Example:** `/parent-caregiver-augmentor:care-checklist "Ohio, mom 82, needs help at home after a fall, 3 siblings"`

Source: [care-checklist.md](../../plugins/parent-caregiver-augmentor/commands/care-checklist.md)

### `/parent-caregiver-augmentor:homework-hint`

**What it does:** Coach a child through a homework problem with hints and questions — no final answers.

**Arguments:** `[grade, subject, the problem, what they've tried]`

**Example:** `/parent-caregiver-augmentor:homework-hint "grade 4, math, 3/4 + 1/8, she tried adding tops and bottoms"`

Source: [homework-hint.md](../../plugins/parent-caregiver-augmentor/commands/homework-hint.md)

### `/parent-caregiver-augmentor:school-note`

**What it does:** Draft a calm, specific message to a teacher, counselor, or school office.

**Arguments:** `[recipient role, issue, facts/dates, what you want]`

**Example:** `/parent-caregiver-augmentor:school-note "5th grade teacher, falling math grades since Oct, want a meeting"`

Source: [school-note.md](../../plugins/parent-caregiver-augmentor/commands/school-note.md)

### `/parent-caregiver-augmentor:week-plan`

**What it does:** Turn everyone's schedules into a week grid with rides, conflicts, a meal plan, and a grocery list.

**Arguments:** `[schedules and constraints, or path] [meal needs/budget]`

**Example:** `/parent-caregiver-augmentor:week-plan family/week.txt "5 dinners, 30 min, one vegetarian, ~$120"`

Source: [week-plan.md](../../plugins/parent-caregiver-augmentor/commands/week-plan.md)

## Agents

Claude can delegate to these subagents on its own, or you can call one with `@agent-parent-caregiver-augmentor:<agent>`.

### `care-log-summarizer`

**When to use:** Reads a caregiving log and produces a dated, factual summary of recent observations, medication list changes, appointments, and open questions to bring to the next visit. Read-only; never interprets symptoms medically. Use before an appointment or a family update.

**Tools:** Read, Grep, Glob · **Model:** inherit

**Example prompt:** “@agent-parent-caregiver-augmentor:care-log-summarizer summarize care/mom-log.md for the last 30 days”

Source: [care-log-summarizer.md](../../plugins/parent-caregiver-augmentor/agents/care-log-summarizer.md)

### `message-tone-checker`

**When to use:** Read-only reviewer for messages a parent or caregiver is about to send — to a teacher, school, coach, clinic, sibling, or care provider. Checks tone (calm, collaborative), clarity of the ask, facts vs. assumptions, and oversharing of private information. Use before sending an emotionally charged message.

**Tools:** Read, Grep, Glob · **Model:** inherit

**Example prompt:** “@agent-parent-caregiver-augmentor:message-tone-checker check draft-to-teacher.md”

Source: [message-tone-checker.md](../../plugins/parent-caregiver-augmentor/agents/message-tone-checker.md)

## Guardrails

- Homework help coaches with questions and hints and checks the child's own work; it won't produce finished answers or essays for graded work, and the school's rules come first.
- School, teacher, and doctor messages are drafts you edit and send.
- Not medical advice: appointment prep produces questions and a symptom/medication summary from your notes for the clinician; medication questions go to the pharmacist or doctor.
- Benefits, insurance, legal (power of attorney, guardianship), and financial checklists are question lists that defer to professionals; eligibility and program details are `[verify: official source / professional]`.
- Health and family information stays in files you control; it reminds you to share only what's needed.
- Self-care support is not therapy; it points to crisis lines and professional help when appropriate.

See [guardrails](../guardrails.md) for the principles behind these rules.

## Sample workflows

**Sunday reset.** `/parent-caregiver-augmentor:week-plan` with everyone's schedules → meal plan and grocery list → share it with the family yourself.

**Homework night.** Your kid uses `homework-coach` (or `/parent-caregiver-augmentor:homework-hint`) → they do the work → you check effort, not just answers.

**Mom's cardiology visit.** Update the `care-log` → `/parent-caregiver-augmentor:appointment-prep` → bring the one-page summary → log the outcome after.

**Something's off at school.** `/parent-caregiver-augmentor:school-note` → `@agent-parent-caregiver-augmentor:message-tone-checker` → you send it.

---
[← Back to docs index](../index.md)
