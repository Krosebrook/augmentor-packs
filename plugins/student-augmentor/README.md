# student-augmentor

An academic-integrity-aware study coach for Claude Code. It makes **you** better at learning — it questions, quizzes, checks, and gives feedback. It does not do your graded work for you.

## Install
From inside Claude Code, add the marketplace (a local path, or `<owner>/<repo>` once it's hosted on GitHub), then install:

```
/plugin marketplace add <path-to-claude-packs-or-owner/repo>
/plugin install student-augmentor@augmentor-packs
```

On Claude Code 2.1.275 or later you can also install in one step from a hosted repo:

```
/plugin install student-augmentor --marketplace <owner>/<repo>
```

## Skills (Claude loads these automatically when relevant; you can also run `/student-augmentor:<name>`)
| Skill | Use it when |
|---|---|
| `socratic-tutor` | You're stuck and want to understand, not just get the answer |
| `study-plan-builder` | You have a syllabus/deadlines and need a realistic plan with spaced review |
| `active-recall-coach` | You want flashcards, self-quizzing, or a spaced-repetition schedule |
| `essay-coach` | Thesis, outline, or draft feedback — coaching, never ghostwriting |
| `source-evaluator` | Finding/evaluating sources (SIFT, CRAAP) and checking citations |
| `exam-prep` | Practice questions, diagnostics, error logs, mock exams |
| `explain-at-levels` | You need a concept explained simpler or more rigorously |
| `step-checker` | Check your math/code work and find the first error |

## Commands
- `/student-augmentor:quiz-me [topic|notes] [n]` — one-at-a-time retrieval quiz
- `/student-augmentor:check-steps [work]` — find the first error, hint only
- `/student-augmentor:essay-feedback [draft] [rubric]` — 3 strengths / 3 fixes, no rewriting
- `/student-augmentor:make-cards [notes]` — Anki-importable flashcards
- `/student-augmentor:integrity-check [planned AI use] [syllabus]` — check against your course's AI policy

## Agents
- `citation-auditor` — cross-checks in-text citations vs. reference list; flags everything you must verify yourself
- `practice-examiner` — builds a mock exam + separate answer key from your materials, grades it, gives an error analysis

## Integrity stance
Course AI policies vary. This plugin defaults to the conservative side: hints before answers, feedback instead of rewriting, and never fabricating sources. When your instructor's policy is unclear, use `/student-augmentor:integrity-check` and ask them.
