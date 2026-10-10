# Educator Augmentor (`educator-augmentor`)

> Planning and feedback co-pilot for teachers who stay in charge: standards-aligned lesson and unit plans (you supply the standards), differentiation and UDL, rubrics, quizzes and assessments, feedback suggestions on student work (you remain the grader), parent communication drafts, and a classroom AI-use policy helper.

Version 1.2.0 · License MIT · Source: [`plugins/educator-augmentor`](../../plugins/educator-augmentor) · Pack README: [README](../../plugins/educator-augmentor/README.md)

## Who it's for

K-12 and higher-ed teachers who want help with planning, materials, and feedback while staying in charge of instruction and grading.

## Install

```
/plugin marketplace add Krosebrook/augmentor-packs
/plugin install educator-augmentor@augmentor-packs
```

See [installation](../installation.md) for local-path installs and troubleshooting.

## Skills

Skills load automatically when your request matches their description. You can also run one directly as `/educator-augmentor:<skill>`.

### `assessment-builder`

**When to use:** Use when a teacher wants a quiz, test, formative check, exit ticket, or question bank aligned to their objectives. Builds a blueprint first, writes well-constructed items at specified cognitive levels with an answer key and rationales, and reviews items for bias and ambiguity.

**Example prompt:** “Build a 15-item quiz on photosynthesis aligned to these objectives, with an answer key.”

Source: [SKILL.md](../../plugins/educator-augmentor/skills/assessment-builder/SKILL.md)

### `classroom-ai-policy`

**When to use:** Use when a teacher wants to write or revise a classroom/course policy on student use of AI tools, design assignment-level AI-use levels, write AI-use disclosure requirements, or redesign assignments to be meaningful when AI exists. Works within the teacher's school or district policy, which takes precedence.

**Example prompt:** “Help me write an AI-use policy for my 10th grade English class. Our district policy is pasted below.”

Source: [SKILL.md](../../plugins/educator-augmentor/skills/classroom-ai-policy/SKILL.md)

### `differentiation-udl`

**When to use:** Use when a teacher wants to adapt a lesson, task, or assessment for diverse learners — multilingual learners, students with IEP/504 accommodations, advanced learners, struggling readers — or apply Universal Design for Learning (UDL). Produces proactive design changes and tiered supports without lowering the learning goal.

**Example prompt:** “Adapt this lesson for my multilingual learners and two students with IEP reading accommodations.”

Source: [SKILL.md](../../plugins/educator-augmentor/skills/differentiation-udl/SKILL.md)

### `lesson-plan-builder`

**When to use:** Use when a teacher wants to plan a single lesson or class session aligned to standards they provide. Builds measurable objectives, a timed sequence with checks for understanding, materials, and an exit ticket. Never invents or paraphrases standards codes — uses only the standards text the teacher supplies.

**Example prompt:** “Plan a 50-minute 7th grade lesson on ratios. Standards text pasted below.”

Source: [SKILL.md](../../plugins/educator-augmentor/skills/lesson-plan-builder/SKILL.md)

### `parent-communication`

**When to use:** Use when a teacher needs to write to parents or guardians — class newsletters, positive notes home, concerns about behavior or grades, responding to an upset parent, conference invitations, or event reminders. Drafts clear, warm, professional messages for the teacher to edit and send; can produce plain-language and translation-ready versions.

**Example prompt:** “Draft a note to a parent about missing assignments — warm but clear.”

Source: [SKILL.md](../../plugins/educator-augmentor/skills/parent-communication/SKILL.md)

### `rubric-generator`

**When to use:** Use when a teacher needs a rubric, scoring guide, or success criteria for an assignment, project, essay, presentation, or performance task. Builds an analytic or single-point rubric with observable, distinct performance levels aligned to the objectives and a student-friendly version.

**Example prompt:** “Make a single-point rubric for a persuasive speech, plus a student-friendly version.”

Source: [SKILL.md](../../plugins/educator-augmentor/skills/rubric-generator/SKILL.md)

### `student-work-feedback`

**When to use:** Use when a teacher wants help giving feedback on student work — essays, lab reports, problem sets, projects — against their rubric or criteria. Suggests specific, actionable, growth-oriented comments for the teacher to review and edit. The teacher remains the grader; this skill does not assign final grades.

**Example prompt:** “Suggest feedback comments on this lab report against my rubric. I'll assign the grade.”

Source: [SKILL.md](../../plugins/educator-augmentor/skills/student-work-feedback/SKILL.md)

### `unit-planner`

**When to use:** Use when a teacher is planning a multi-week unit or course sequence from standards or curriculum they provide. Uses backward design — enduring understandings, essential questions, summative assessment, then a day-by-day or week-by-week learning sequence with formative checkpoints.

**Example prompt:** “Plan a 3-week unit on the Civil War from these standards, backward design.”

Source: [SKILL.md](../../plugins/educator-augmentor/skills/unit-planner/SKILL.md)

## Commands

### `/educator-augmentor:lesson`

**What it does:** Build a timed, standards-aligned lesson plan from standards you paste in.

**Arguments:** `[grade/course] [length] [topic] — then paste your standards`

**Example:** `/educator-augmentor:lesson "Grade 7 math, 50 min, ratios" (then paste standards)`

Source: [lesson.md](../../plugins/educator-augmentor/commands/lesson.md)

### `/educator-augmentor:parent-note`

**What it does:** Draft a parent/guardian message (positive, concern, response, or update) in plain, warm language.

**Arguments:** `[type: positive|concern|response|update] [situation, no student names needed]`

**Example:** `/educator-augmentor:parent-note concern "missing three homework assignments this month"`

Source: [parent-note.md](../../plugins/educator-augmentor/commands/parent-note.md)

### `/educator-augmentor:quiz`

**What it does:** Build a blueprint-first quiz with answer key, rationales, and misconception-targeted distractors.

**Arguments:** `[topic/objectives] [number of items] [item types] [optional: path to materials]`

**Example:** `/educator-augmentor:quiz "cell structure" 12 "multiple choice, short answer" materials/unit2.md`

Source: [quiz.md](../../plugins/educator-augmentor/commands/quiz.md)

### `/educator-augmentor:rubric`

**What it does:** Generate an analytic or single-point rubric plus a student-friendly version.

**Arguments:** `[assignment description] [type: analytic|single-point] [levels]`

**Example:** `/educator-augmentor:rubric "lab report" analytic 4`

Source: [rubric.md](../../plugins/educator-augmentor/commands/rubric.md)

### `/educator-augmentor:unit`

**What it does:** Plan a multi-week unit with backward design — understandings, essential questions, summative task, calendar.

**Arguments:** `[course/grade] [number of class periods] [topic] — then paste your standards`

**Example:** `/educator-augmentor:unit "US History, Grade 8" 15 "Reconstruction" (then paste standards)`

Source: [unit.md](../../plugins/educator-augmentor/commands/unit.md)

## Agents

Claude can delegate to these subagents on its own, or you can call one with `@agent-educator-augmentor:<agent>`.

### `alignment-checker`

**When to use:** Checks that a lesson, unit, assessment, and rubric are aligned with each other and with the standards/objectives the teacher supplied — every objective taught and assessed, cognitive levels matching, nothing assessed that wasn't taught. Use after drafting plans or assessments, or when a teacher asks "is this aligned?

**Tools:** Read, Grep, Glob · **Model:** inherit

**Example prompt:** “@agent-educator-augmentor:alignment-checker is my unit plan, quiz, and rubric aligned?”

Source: [alignment-checker.md](../../plugins/educator-augmentor/agents/alignment-checker.md)

### `bias-accessibility-reviewer`

**When to use:** Reviews lesson materials, assessments, and handouts for accessibility barriers, unnecessary linguistic complexity, cultural bias, and stereotypes, and suggests fixes that keep the learning goal intact. Use before distributing materials or assessments to students.

**Tools:** Read, Grep, Glob · **Model:** inherit

**Example prompt:** “@agent-educator-augmentor:bias-accessibility-reviewer review handout.md before I print it.”

Source: [bias-accessibility-reviewer.md](../../plugins/educator-augmentor/agents/bias-accessibility-reviewer.md)

## Guardrails

- The teacher stays the grader. Feedback suggestions are for you to review and edit; no final grades are assigned.
- Standards come from you. It never invents or paraphrases standards codes; it uses only the standards text you paste.
- Your school or district policy takes precedence over any classroom AI policy it drafts.
- Parent messages are drafts for you to edit and send. You don't need to include student names.
- Materials are reviewed for bias and accessibility without lowering the learning goal.

See [guardrails](../guardrails.md) for the principles behind these rules.

## Sample workflows

**Planning a unit.** `/educator-augmentor:unit` with your pasted standards → `/educator-augmentor:lesson` for each day → `/educator-augmentor:quiz` and `/educator-augmentor:rubric` → `@agent-educator-augmentor:alignment-checker`.

**Before handing out materials.** `differentiation-udl` for your learners → `@agent-educator-augmentor:bias-accessibility-reviewer`.

**Grading a stack of essays.** `student-work-feedback` against your rubric for comment suggestions → you edit the comments and assign grades.

---
[← Back to docs index](../index.md)
