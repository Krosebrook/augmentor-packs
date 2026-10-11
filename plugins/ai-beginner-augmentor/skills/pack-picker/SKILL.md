---
name: pack-picker
description: "Use when a beginner asks which augmentor pack or plugin to install, \"what else can I add?\", \"which pack is for me?\", or describes their life or job and wants a recommendation. Asks two or three plain questions and suggests one to two packs from the augmentor-packs marketplace (student, office, educator, parent-caregiver, job-seeker, creator, trades, healthcare-worker, solo-founder, designer, engineer, consultant, ai-transition-builder, and the optional tools add-ons) with the exact install command and its level."
---

# Pack Picker

Goal: recommend **one** pack to start (two at most), with the reason, its level, and how to install it. Fewer is better for beginners.

## Ask (max 3 questions, one round)
1. What do you spend most of your time on? (school, office work, teaching, caring for family, job hunting, making content, a trade, healthcare, running a business, design, coding, consulting)
2. What's one task you'd love help with?
3. How comfortable are you with tech? (new / okay / very)

## The packs (level = how much tech or AI experience it assumes)
| Pack | Good for | Level |
|---|---|---|
| student-augmentor | Studying, essays (coaching, not ghostwriting), exams | Beginner |
| office-augmentor | Email drafts, meetings, documents, spreadsheets | Beginner |
| educator-augmentor | Teachers: lessons, rubrics, feedback suggestions | Beginner |
| parent-caregiver-augmentor | Family logistics, homework hints, doctor visit prep | Beginner |
| job-seeker-augmentor | Resumes (no padding), interviews, networking drafts | Beginner |
| creator-augmentor | Content ideas, scripts, calendars, pitches | Beginner |
| trades-augmentor | Quotes, scheduling, customer messages, safety lists | Beginner |
| healthcare-worker-augmentor | Handoffs, patient education wording (no PHI, not medical advice) | Beginner |
| solo-founder-augmentor | Validating ideas, pricing, landing pages, runway | Intermediate |
| designer-augmentor | Design briefs, UX and accessibility reviews | Intermediate |
| consultant-augmentor | Discovery, scoping, ROI models, workshops | Intermediate |
| ai-transition-builder | Learning to build with AI (some coding needed) | Advanced |
| engineer-augmentor | Debugging, code review, specs (software engineers) | Advanced |
| tools-* add-ons | Live public data (need Node.js 18+) | Intermediate |

## Output
- **Start with:** `<pack>`: one sentence why, its level.
- **Install** (inside Claude Code):
  ```
  /plugin install <pack>@augmentor-packs
  ```
  If they haven't added the marketplace yet: `/plugin marketplace add Krosebrook/augmentor-packs` first.
- **First thing to try:** one example request in their words.
- **Maybe later:** one optional second pack.

## Rules
- If someone is new, steer away from Advanced packs unless they ask; explain kindly why.
- Never claim a pack does something it doesn't. If unsure, say `[CHECK: see the pack page in docs/packs/]`.
- Packs never send messages or act for them; mention that drafts are theirs to review.
