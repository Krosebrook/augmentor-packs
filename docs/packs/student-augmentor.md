# Student Augmentor (`student-augmentor`)

> Academic-integrity-aware study coach: Socratic tutoring, syllabus-to-study-plan, active recall and spaced repetition, essay coaching (never ghostwriting), source evaluation and citation checks, exam prep, level-adjusted explanations, and step-by-step math/code checking.

Version 1.4.0 · License MIT · Source: [`plugins/student-augmentor`](../../plugins/student-augmentor) · Pack README: [README](../../plugins/student-augmentor/README.md)

**Level: Beginner** ([what levels mean](../index.md#levels)). Plain-language study coaching; no setup beyond installing the pack.

## Who it's for

Students who want to actually learn the material and stay inside their course's academic-integrity rules: high school, college, and self-learners.

## Install

```
/plugin marketplace add Krosebrook/augmentor-packs
/plugin install student-augmentor@augmentor-packs
```

See [installation](../installation.md) for local-path installs and troubleshooting.

## Skills

Skills load automatically when your request matches their description. You can also run one directly as `/student-augmentor:<skill>`.

### `active-recall-coach`

**When to use:** Use when a student wants flashcards, to memorize material, to quiz themselves, or to set up spaced repetition. Builds high-quality recall cards from the student's own notes, runs retrieval practice, and schedules reviews. Trigger on "make flashcards", "help me memorize", "quiz me on my notes", "Anki".

**Example prompt:** “Make flashcards from my notes in notes/bio-ch4.md and set up a spaced-repetition schedule.”

Source: [SKILL.md](../../plugins/student-augmentor/skills/active-recall-coach/SKILL.md)

### `essay-coach`

**When to use:** Use when a student is working on an essay, paper, or written assignment and wants help with thesis, outline, structure, argument, or feedback on their draft. Coaches the student's own writing; never ghostwrites graded work. Trigger on "review my essay", "help me outline", "is my thesis good", "feedback on my draft".

**Example prompt:** “Is my thesis good? 'Social media has changed politics.' Coach me, don't rewrite it.”

Source: [SKILL.md](../../plugins/student-augmentor/skills/essay-coach/SKILL.md)

### `exam-prep`

**When to use:** Use when a student has an upcoming test, midterm, final, or quiz and wants practice questions, a mock exam, a review plan, or to find their weak spots. Builds questions from the student's own course material, grades their answers with explanations, and targets weak topics.

**Example prompt:** “I have a stats midterm Friday. Quiz me from my lecture notes and find my weak spots.”

Source: [SKILL.md](../../plugins/student-augmentor/skills/exam-prep/SKILL.md)

### `explain-at-levels`

**When to use:** Use when a student wants a concept explained more simply, more rigorously, or at a different level — "explain like I'm 5", "simpler", "give me the intuition", "the formal version", "I don't get the textbook explanation". Produces a ladder of explanations from intuition to formal and checks which rung the student is on.

**Example prompt:** “Explain eigenvectors simpler — the textbook version isn't landing.”

Source: [SKILL.md](../../plugins/student-augmentor/skills/explain-at-levels/SKILL.md)

### `socratic-tutor`

**When to use:** Use when a student is stuck on a concept or homework problem and wants to understand it, not just get the answer. Guides with questions, hints, and checks for understanding instead of handing over solutions. Trigger on "help me understand", "I'm stuck on", "walk me through", "why does", or any request to solve assigned homework.

**Example prompt:** “I'm stuck on why the derivative of ln(x) is 1/x. Help me understand it, don't just tell me.”

Source: [SKILL.md](../../plugins/student-augmentor/skills/socratic-tutor/SKILL.md)

### `source-evaluator`

**When to use:** Use when a student is researching, finding sources, deciding whether a source is credible, or checking citations and a bibliography. Teaches lateral reading and SIFT/CRAAP-style evaluation, checks citation formatting against the style the student names, and flags references that need verification. Never fabricates sources, quotes, page numbers, or DOIs.

**Example prompt:** “Is this article credible for my paper? And check my bibliography against APA 7.”

Source: [SKILL.md](../../plugins/student-augmentor/skills/source-evaluator/SKILL.md)

### `step-checker`

**When to use:** Use when a student shares their own worked math, physics, chemistry, statistics, or code solution and wants to know if it's right or where it went wrong. Checks line by line, locates the first error, and hints at the fix without rewriting their solution.

**Example prompt:** “Here's my worked solution to this integral. Where did I go wrong?”

Source: [SKILL.md](../../plugins/student-augmentor/skills/step-checker/SKILL.md)

### `study-plan-builder`

**When to use:** Use when a student shares a syllabus, course schedule, or list of exams/deadlines and wants a realistic study plan. Builds a week-by-week plan with spaced review, workload estimates, and buffers, based only on dates the student provides.

**Example prompt:** “Here's my syllabus (pasted). Midterm is Oct 28, final Dec 12. I can study 6 hrs/week. Build me a plan.”

Source: [SKILL.md](../../plugins/student-augmentor/skills/study-plan-builder/SKILL.md)

## Commands

### `/student-augmentor:check-steps`

**What it does:** Check your worked math or code solution line by line and point to the first error without giving away the answer.

**Arguments:** `[paste your work or path to file]`

**Example:** `/student-augmentor:check-steps homework/q4.md`

Source: [check-steps.md](../../plugins/student-augmentor/commands/check-steps.md)

### `/student-augmentor:essay-feedback`

**What it does:** Get writing-center style feedback on your own essay draft (no rewriting).

**Arguments:** `[path to draft] [optional: path to prompt/rubric]`

**Example:** `/student-augmentor:essay-feedback drafts/essay.md prompt.md`

Source: [essay-feedback.md](../../plugins/student-augmentor/commands/essay-feedback.md)

### `/student-augmentor:integrity-check`

**What it does:** Check whether a planned use of AI fits your course's academic integrity / AI policy.

**Arguments:** `[what you want to use AI for] [optional: path to syllabus]`

**Example:** `/student-augmentor:integrity-check "brainstorm counterarguments" syllabus.pdf`

Source: [integrity-check.md](../../plugins/student-augmentor/commands/integrity-check.md)

### `/student-augmentor:make-cards`

**What it does:** Turn your notes into high-quality flashcards in Anki-importable format.

**Arguments:** `[path to notes or pasted notes]`

**Example:** `/student-augmentor:make-cards notes/lecture5.md`

Source: [make-cards.md](../../plugins/student-augmentor/commands/make-cards.md)

### `/student-augmentor:quiz-me`

**What it does:** Run a retrieval-practice quiz on a topic or notes file, grading your answers one at a time.

**Arguments:** `[topic or path to notes] [number of questions]`

**Example:** `/student-augmentor:quiz-me notes/ch3.md 10`

Source: [quiz-me.md](../../plugins/student-augmentor/commands/quiz-me.md)

## Agents

Claude can delegate to these subagents on its own, or you can call one with `@agent-student-augmentor:<agent>`.

### `citation-auditor`

**When to use:** Audits a paper's in-text citations and reference list for consistency, completeness, and style-format issues, and flags every reference that the student must personally verify. Use when a student asks to check citations or a bibliography in a document.

**Tools:** Read, Grep, Glob · **Model:** inherit

**Example prompt:** “@agent-student-augmentor:citation-auditor check the citations in paper.docx export (paper.md).”

Source: [citation-auditor.md](../../plugins/student-augmentor/agents/citation-auditor.md)

### `practice-examiner`

**When to use:** Builds and grades a realistic mock exam from the student's course materials, then produces an error analysis and targeted review plan. Use when a student wants a full practice test or timed mock before an exam.

**Tools:** Read, Grep, Glob, Write · **Model:** inherit

**Example prompt:** “@agent-student-augmentor:practice-examiner build a 45-minute mock exam from notes/ and grade me.”

Source: [practice-examiner.md](../../plugins/student-augmentor/agents/practice-examiner.md)

## Guardrails

- Coaches your own writing; never ghostwrites graded work (essays, problem sets, take-home exams).
- Hints before answers: the tutor and step-checker point to the first error rather than handing over a full solution.
- Never fabricates sources or citations; references you must check are flagged for you to verify personally.
- Your course's AI policy wins. Run `/student-augmentor:integrity-check` when unsure.
- Study plans use only the dates you provide.

See [guardrails](../guardrails.md) for the principles behind these rules.

## Sample workflows

**Exam week.** Paste your syllabus into `study-plan-builder` to get a plan → `/student-augmentor:make-cards` on each lecture's notes → `/student-augmentor:quiz-me` daily → `@agent-student-augmentor:practice-examiner` for a full mock two days out.

**Writing a paper.** Use `/student-augmentor:integrity-check` on your planned AI use → `essay-coach` on thesis and outline → write the draft yourself → `/student-augmentor:essay-feedback` → `@agent-student-augmentor:citation-auditor` → verify every flagged reference yourself.

**Homework you're stuck on.** Use `socratic-tutor` to understand the concept → attempt it → `/student-augmentor:check-steps` to find the first error.

---
[← Back to docs index](../index.md)
