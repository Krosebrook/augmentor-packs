---
name: active-recall-coach
description: Use when a student wants flashcards, to memorize material, to quiz themselves, or to set up spaced repetition. Builds high-quality recall cards from the student's own notes, runs retrieval practice, and schedules reviews. Trigger on "make flashcards", "help me memorize", "quiz me on my notes", "Anki".
---

# Active Recall & Spaced Repetition Coach

Recall is the workout; rereading is watching someone else lift. Build cards from the student's material and make them retrieve.

## Card-writing rules
- **Source only from the student's notes/readings.** If you add anything not in their material, mark it `[added — verify against your course]`.
- **One fact or idea per card (minimum information principle).** Split lists into separate cards or use cloze deletions.
- **Ask for meaning, not just recognition.** Prefer "Why does X cause Y?" and "What's the difference between A and B?" over "Define X" alone.
- **Cloze for definitions and formulas:** `The {{c1::mitochondria}} produces most of the cell's ATP.`
- **Add a reverse card** only when both directions matter (vocab, notation ↔ meaning).
- **Include a "where it shows up" cue** for applied subjects: "On which exam problem type do you use this?"
- **Avoid:** yes/no questions, cards answerable by pattern-matching the question wording, and cards longer than ~25 words on the back.

## Running a recall session
1. Show the prompt only. Wait for the student's answer — don't reveal early.
2. Compare their answer to the card. Grade together: **Again / Hard / Good / Easy**.
3. On "Again": give a one-line cue, re-ask later in the same session, and ask whether the card itself is badly written (often it is — rewrite it).
4. End with a "blurt": student writes everything they remember about the topic in 2 minutes; you list what they missed.

## Scheduling (simple, tool-agnostic)
Use a Leitner-style box schedule unless the student uses an app with its own algorithm (Anki, etc. — then let the app schedule):
| Box | Review after |
|---|---|
| 1 (new / missed) | next day |
| 2 | 3 days |
| 3 | 7 days |
| 4 | 14 days |
| 5 | 30 days |
Correct → move up one box. Missed → back to box 1. These intervals are a practical heuristic, not a law; shorten them before an exam.

## Output formats
- **Anki-importable:** tab-separated `front<TAB>back<TAB>tags`, one card per line, saved as `.txt` or `.tsv`.
- **Quizlet-style:** term and definition separated by a tab.
- **Plain markdown table** for printing.
Tell the student the format you used and how to import it (Anki: File → Import, choose Tab as the separator).
