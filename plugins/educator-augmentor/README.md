# educator-augmentor

A planning and feedback co-pilot for teachers. It speeds up the prep work and sharpens your materials — **you** stay the professional and the grader. Standards are always supplied by you; the plugin never invents standards text or codes.

## Install
From inside Claude Code, add the marketplace (a local path, or `<owner>/<repo>` once it's hosted on GitHub), then install:

```
/plugin marketplace add <path-to-claude-packs-or-owner/repo>
/plugin install educator-augmentor@augmentor-packs
```

On Claude Code 2.1.275 or later you can also install in one step from a hosted repo:

```
/plugin install educator-augmentor --marketplace <owner>/<repo>
```

## Skills
| Skill | Use it when |
|---|---|
| `lesson-plan-builder` | Planning one lesson: objectives, timed sequence, CFUs, exit ticket |
| `differentiation-udl` | Adapting for diverse learners using UDL and tiered supports |
| `rubric-generator` | Analytic or single-point rubrics with observable descriptors |
| `assessment-builder` | Blueprint-first quizzes/tests with keys and rationales |
| `student-work-feedback` | Glow/grow/next-step feedback suggestions; class pattern summary |
| `parent-communication` | Positive notes, concerns, responses to upset parents, newsletters |
| `classroom-ai-policy` | Classroom AI-use policy, assignment AI levels, assignment redesign |
| `unit-planner` | Multi-week backward-design units with alignment matrix |

## Commands
- `/educator-augmentor:lesson [grade] [length] [topic]`
- `/educator-augmentor:rubric [assignment]`
- `/educator-augmentor:quiz [objectives] [n] [types]`
- `/educator-augmentor:parent-note [type] [situation]`
- `/educator-augmentor:unit [course] [periods] [topic]`

## Agents
- `alignment-checker` — objective ↔ instruction ↔ assessment alignment matrix
- `bias-accessibility-reviewer` — fairness and accessibility review that preserves rigor

## Privacy
Remove student names and identifying details before sharing work, and follow your school's policy and applicable student-privacy laws on using AI tools with student data.
