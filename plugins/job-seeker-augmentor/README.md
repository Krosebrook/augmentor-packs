# job-seeker-augmentor

A job-search coach for Claude Code that sharpens your materials and your interviewing — using only your real experience. It tailors, rehearses, tracks, and drafts; **you** decide what's true, what to send, and what to accept. No job-board, LinkedIn, or email connectors; it never applies or sends anything for you.

## Install
From inside Claude Code, add the marketplace (a local path, or `Krosebrook/augmentor-packs` on GitHub), then install:

```
/plugin marketplace add <path-to-claude-packs-or-Krosebrook/augmentor-packs>
/plugin install job-seeker-augmentor@augmentor-packs
```

## Skills
| Skill | Use it when |
|---|---|
| `resume-tailoring` | Tailoring your resume or cover letter to a specific posting — no fabrication |
| `star-story-bank` | Building reusable STAR stories from your real experience |
| `interview-prep` | Preparing for a specific interview — likely questions, research checklist, questions to ask |
| `mock-interview` | Running a realistic mock interview with scored feedback |
| `networking-outreach` | Drafting networking messages, referral asks, and follow-ups you personalize and send |
| `offer-negotiation` | Evaluating an offer and preparing a negotiation script with your own market data |
| `application-tracker` | Keeping a pipeline of applications, follow-ups, and next actions in a CSV/Markdown file |
| `skills-gap-plan` | Comparing your skills with target roles and building a realistic learning plan |

## Commands
- `/job-seeker-augmentor:tailor [resume path] [posting path or URL text] [cover letter? y/n]`
- `/job-seeker-augmentor:mock [role, level, type: behavioral|technical|case, difficulty]`
- `/job-seeker-augmentor:outreach [who, relationship, goal, facts to personalize]`
- `/job-seeker-augmentor:negotiate [offer details] [your market data and source] [priorities]`

## Agents
- `resume-truth-checker` — read-only check that a tailored resume claims nothing beyond your source history
- `interview-debriefer` — turns a mock or real interview transcript/notes into scored feedback and a practice plan

## Principles
Never fabricates experience, metrics, titles, dates, or credentials — gaps are `[DATA NEEDED]`. Never sends outreach or applications. Salary data comes from sources you gather (`[DATA NEEDED: market range source]`). Not legal advice on contracts, non-competes, or immigration.
