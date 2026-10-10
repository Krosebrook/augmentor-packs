# Healthcare Worker Augmentor (`healthcare-worker-augmentor`)

> Communication and study co-pilot for nurses and allied health: SBAR/shift-handoff structure, plain-language patient education drafts, documentation clarity checks, drug-information question prep that always defers to official references and the pharmacist, shift and burnout planning, and CE/certification study. Not medical advice; de-identify everything; clinician judgment rules.

Version 1.2.0 · License MIT · Source: [`plugins/healthcare-worker-augmentor`](../../plugins/healthcare-worker-augmentor) · Pack README: [README](../../plugins/healthcare-worker-augmentor/README.md)

## Who it's for

Nurses (RN/LPN/LVN), nursing students in clinicals, respiratory therapists, PT/OT, medical assistants, techs, and other allied health staff who want clearer handoffs, patient education, and documentation, plus structured CE study. It is not for patients seeking care advice.

## Install

```
/plugin marketplace add Krosebrook/augmentor-packs
/plugin install healthcare-worker-augmentor@augmentor-packs
```

See [installation](../installation.md) for local-path installs and troubleshooting.

## Skills

Skills load automatically when your request matches their description. You can also run one directly as `/healthcare-worker-augmentor:<skill>`.

### `ce-study-coach`

**When to use:** Use when the user is studying for continuing education, a certification or licensure exam (e.g. NCLEX, CCRN, CEN, RRT boards), or a competency. Builds study plans from the official exam blueprint the user supplies, quizzes with explanations, and uses spaced repetition. Asks for the official content outline instead of inventing exam weightings.

**Example prompt:** “Quiz me on fluid and electrolyte concepts for my certification exam, one question at a time.”

Source: [SKILL.md](../../plugins/healthcare-worker-augmentor/skills/ce-study-coach/SKILL.md)

### `difficult-conversations`

**When to use:** Use when the user wants to prepare for a hard conversation at work — an upset family member, a peer conflict, speaking up about a safety concern, declining an extra shift, or a meeting with a manager. Coaches structure and wording; defers clinical disclosures and serious news to the appropriate provider and policy.

**Example prompt:** “Help me prepare what to say to a frustrated family member who wants an update I'm not allowed to give.”

Source: [SKILL.md](../../plugins/healthcare-worker-augmentor/skills/difficult-conversations/SKILL.md)

### `documentation-clarity`

**When to use:** Use when the user wants feedback on the clarity of their own de-identified clinical note, incident report wording, or care plan — vague terms, subjective language, missing objective data, unapproved abbreviations, timeline gaps. Suggests edits; never invents assessments, times, or findings.

**Example prompt:** “Check this de-identified nursing note for vague language and missing objective data.”

Source: [SKILL.md](../../plugins/healthcare-worker-augmentor/skills/documentation-clarity/SKILL.md)

### `drug-info-question-prep`

**When to use:** Use when the user has a medication question (dose check, compatibility, interaction, administration, monitoring, patient counseling points). Produces a precise question and a checklist of what to look up in official references (label/package insert, facility drug reference) and what to ask the pharmacist. Never states doses, interactions, or compatibility from memory.

**Example prompt:** “I need to check whether two meds on a patient's list can be given together. Help me prepare the question for pharmacy.”

Source: [SKILL.md](../../plugins/healthcare-worker-augmentor/skills/drug-info-question-prep/SKILL.md)

### `patient-education-plain-language`

**When to use:** Use when the user wants to turn clinical instructions or education material they supply into plain-language patient/family handouts or verbal teaching scripts, with teach-back questions. Uses only the clinical content provided; flags anything to verify. Drafts for clinician review.

**Example prompt:** “Rewrite this discharge instruction about wound care at about a 6th-grade level and add teach-back questions.”

Source: [SKILL.md](../../plugins/healthcare-worker-augmentor/skills/patient-education-plain-language/SKILL.md)

### `sbar-handoff`

**When to use:** Use when the user wants to structure a shift handoff, bedside report, SBAR call to a provider, transfer report, or I-PASS-style summary from their own de-identified notes. Organizes and flags gaps; never adds clinical findings, assessments, or recommendations the user didn't supply.

**Example prompt:** “Turn these de-identified bullets into an SBAR for calling the on-call provider about rising heart rate.”

Source: [SKILL.md](../../plugins/healthcare-worker-augmentor/skills/sbar-handoff/SKILL.md)

### `shift-planning-and-burnout`

**When to use:** Use when the user wants to plan a shift (priorities, time blocks, task clustering), a stretch of 12-hour or night shifts, post-shift decompression, or wants to talk through stress and burnout. Practical coaching and planning; not therapy or a medical evaluation. Points to EAP, peer support, and crisis lines when appropriate.

**Example prompt:** “I'm working three 12s then switching to nights. Help me plan sleep, meals, and recovery.”

Source: [SKILL.md](../../plugins/healthcare-worker-augmentor/skills/shift-planning-and-burnout/SKILL.md)

## Commands

### `/healthcare-worker-augmentor:ce-plan`

**What it does:** Build a certification or CE study plan from the official blueprint and your test date, then start a quiz.

**Arguments:** `[exam/CE name] [test date] [official blueprint or path]`

**Example:** `/healthcare-worker-augmentor:ce-plan CCRN 2026-12-15 blueprint.txt`

Source: [ce-plan.md](../../plugins/healthcare-worker-augmentor/commands/ce-plan.md)

### `/healthcare-worker-augmentor:med-question`

**What it does:** Prepare a medication question and a lookup checklist for official references and the pharmacist (no doses from memory).

**Arguments:** `[medication question, de-identified context]`

**Example:** `/healthcare-worker-augmentor:med-question "can med A be given in the same IV line as med B? adult, peripheral IV"`

Source: [med-question.md](../../plugins/healthcare-worker-augmentor/commands/med-question.md)

### `/healthcare-worker-augmentor:sbar`

**What it does:** Turn de-identified notes into an SBAR or handoff report with a gap check and a 30-second spoken version.

**Arguments:** `[de-identified bullets, unit format if not SBAR]`

**Example:** `/healthcare-worker-augmentor:sbar "post-op day 1, HR trending up 90s to 120s, pain 7/10 after last dose, requesting eval"`

Source: [sbar.md](../../plugins/healthcare-worker-augmentor/commands/sbar.md)

### `/healthcare-worker-augmentor:teach-back`

**What it does:** Rewrite patient instructions in plain language with teach-back questions and a verify list.

**Arguments:** `[instructions or path] [audience, language, reading level]`

**Example:** `/healthcare-worker-augmentor:teach-back discharge/wound-care.txt "caregiver, English, ~6th grade"`

Source: [teach-back.md](../../plugins/healthcare-worker-augmentor/commands/teach-back.md)

## Agents

Claude can delegate to these subagents on its own, or you can call one with `@agent-healthcare-worker-augmentor:<agent>`.

### `handoff-gap-checker`

**When to use:** Reviews a de-identified handoff, SBAR, or transfer note for missing safety-critical elements and leftover identifiers before the clinician gives report. Read-only. Use when the user asks "did I miss anything?" on a handoff.

**Tools:** Read, Grep, Glob · **Model:** inherit

**Example prompt:** “@agent-healthcare-worker-augmentor:handoff-gap-checker check handoff.md before report”

Source: [handoff-gap-checker.md](../../plugins/healthcare-worker-augmentor/agents/handoff-gap-checker.md)

### `plain-language-reviewer`

**When to use:** Read-only health-literacy reviewer for patient and family materials. Checks jargon, sentence length, estimated reading level, action-first structure, numeracy, and missing teach-back. Flags clinical claims for clinician verification without changing them. Use before a handout is printed or shared.

**Tools:** Read, Grep, Glob · **Model:** inherit

**Example prompt:** “@agent-healthcare-worker-augmentor:plain-language-reviewer review handout-draft.md for a caregiver audience”

Source: [plain-language-reviewer.md](../../plugins/healthcare-worker-augmentor/agents/plain-language-reviewer.md)

## Guardrails

- Not medical advice, diagnosis, or orders. Clinician judgment, facility policy, prescribers, and pharmacists take precedence.
- No PHI: every skill reminds you to de-identify (names, DOB, MRN, room, exact dates, contact details) and stops if identifiers appear.
- Drug-information help produces *questions and lookup checklists* for official references (package insert/label, your facility's drug reference, pharmacist). It never supplies doses or interaction verdicts from memory.
- Patient-education drafts are for clinician review before use and are marked `[verify]` where clinical facts appear.
- Escalation and emergencies go through your facility's pathway, never through a draft.
- Drafts only; nothing is charted, sent, or ordered for you.

See [guardrails](../guardrails.md) for the principles behind these rules.

## Sample workflows

**Before handoff.** Jot de-identified bullets → `/healthcare-worker-augmentor:sbar` → `@agent-healthcare-worker-augmentor:handoff-gap-checker` → give report verbally using your unit's tool.

**Discharge teaching.** `/healthcare-worker-augmentor:teach-back` on your instructions → you verify every clinical fact against facility materials → teach using teach-back.

**New medication question.** `drug-info-question-prep` to frame the question → look it up in your official reference → call pharmacy with the prepared question.

**Certification season.** `/healthcare-worker-augmentor:ce-plan` → daily `ce-study-coach` quizzes → `@agent-healthcare-worker-augmentor:plain-language-reviewer` on any handouts you write.

---
[← Back to docs index](../index.md)
