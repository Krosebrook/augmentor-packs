# creator-augmentor

A creative sparring partner for YouTubers, podcasters, newsletter writers, and social creators. It pressure-tests ideas, drafts hooks and outlines in **your** voice, plans the calendar, and reads the analytics **you** export — you make the creative calls and hit publish. No platform connectors; it never posts, schedules, or messages brands for you.

## Install
From inside Claude Code, add the marketplace (a local path, or `Krosebrook/augmentor-packs` on GitHub), then install:

```
/plugin marketplace add <path-to-claude-packs-or-Krosebrook/augmentor-packs>
/plugin install creator-augmentor@augmentor-packs
```

## Skills
| Skill | Use it when |
|---|---|
| `content-ideation` | Generating and scoring content ideas from your niche, audience, and past winners |
| `hooks-and-scripts` | Writing hooks, outlines, and scripts in your voice |
| `content-repurposing` | Turning one long piece into platform-native shorts, threads, posts, and a newsletter |
| `editorial-calendar` | Planning a realistic publishing calendar with pillars, series, and buffers |
| `audience-research` | Finding themes, questions, and language in comments, surveys, and DMs you export |
| `sponsorship-pitch` | Drafting brand pitches and a media kit from your real metrics |
| `analytics-review` | Reading your exported analytics for patterns and next experiments |
| `voice-consistency` | Building a voice guide from your past work and checking drafts against it |

## Commands
- `/creator-augmentor:ideas [niche, platform, audience, goal, past hits]`
- `/creator-augmentor:script [topic, format/length, platform, your angle, voice guide path]`
- `/creator-augmentor:repurpose [transcript or path] [target platforms]`
- `/creator-augmentor:pitch [brand, why it fits, your metrics and period, deliverable idea]`

## Agents
- `analytics-analyst` — analyzes exported analytics files with stated sample sizes and proposes experiments
- `voice-editor` — read-only check of a draft against your voice guide, with unsupported-claim flags

## Principles
Your voice, your ideas — it sparks and critiques, you decide. Never posts or sends. Analytics conclusions come only from data you export, with sample sizes stated; no invented benchmarks or "average CTR" figures (`[DATA NEEDED]`). Sponsorship pitches use only your real metrics and never invent audience stats, testimonials, or past partners. Disclosure rules for sponsored content are flagged `[verify: platform & local ad-disclosure rules]`.
