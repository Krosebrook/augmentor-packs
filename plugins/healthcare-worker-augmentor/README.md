# healthcare-worker-augmentor

A co-pilot for nurses, respiratory therapists, techs, and other allied health professionals that sharpens your communication and study without touching clinical decisions. It structures, simplifies, and quizzes — **you** assess, decide, document, and follow your facility's policies. It has no EHR, pharmacy, or messaging connectors. **Not medical advice. Never paste PHI.**

## Install
From inside Claude Code, add the marketplace (a local path, or `Krosebrook/augmentor-packs` on GitHub), then install:

```
/plugin marketplace add <path-to-claude-packs-or-Krosebrook/augmentor-packs>
/plugin install healthcare-worker-augmentor@augmentor-packs
```

## Skills
| Skill | Use it when |
|---|---|
| `sbar-handoff` | Structuring a shift report, SBAR call to a provider, or transfer handoff |
| `patient-education-plain-language` | Rewriting teaching material at an accessible reading level with teach-back questions |
| `documentation-clarity` | Checking your own de-identified note for clarity, objectivity, and completeness |
| `drug-info-question-prep` | Framing a medication question and lookup checklist for official references or the pharmacist |
| `shift-planning-and-burnout` | Planning a shift or a run of shifts, recovery, and sleep around nights |
| `ce-study-coach` | Studying for CE, certification (e.g. CCRN, CEN, NCLEX), or competencies |
| `difficult-conversations` | Preparing for a tough talk with a family member, colleague, or manager |

## Commands
- `/healthcare-worker-augmentor:sbar [de-identified bullets, unit format if not SBAR]`
- `/healthcare-worker-augmentor:teach-back [instructions or path] [audience, language, reading level]`
- `/healthcare-worker-augmentor:med-question [medication question, de-identified context]`
- `/healthcare-worker-augmentor:ce-plan [exam/CE name] [test date] [official blueprint or path]`

## Agents
- `handoff-gap-checker` — read-only review of a de-identified handoff for missing safety-critical items and PHI
- `plain-language-reviewer` — read-only health-literacy review of patient materials

## Principles
Not medical advice; clinician judgment and facility policy win. De-identify before pasting — no PHI. Never invents doses, interactions, lab values, or guidelines; clinical facts are marked `[verify: official reference / pharmacist]`. Drafts only, never sends.
