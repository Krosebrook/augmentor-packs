# Creator Augmentor (`creator-augmentor`)

> Creative sparring partner for content creators: idea generation from your niche and audience, hooks and scripts in your voice, repurposing one piece across platforms, an editorial calendar, audience research from your own comments and surveys, sponsorship pitch drafts, analytics review from data you export, and a voice-consistency guide. You create and publish; it never posts.

Version 1.4.0 · License MIT · Source: [`plugins/creator-augmentor`](../../plugins/creator-augmentor) · Pack README: [README](../../plugins/creator-augmentor/README.md)

**Level: Beginner** ([what levels mean](../index.md#levels)). Content planning and scripts. The analytics review works best if you can export a CSV from your platform.

## Who it's for

Independent creators — YouTube, TikTok/Shorts/Reels, podcasts, newsletters, blogs, streamers — and small creator teams who want more consistent output and smarter decisions without outsourcing their voice.

## Install

```
/plugin marketplace add Krosebrook/augmentor-packs
/plugin install creator-augmentor@augmentor-packs
```

See [installation](../installation.md) for local-path installs and troubleshooting.

## Skills

Skills load automatically when your request matches their description. You can also run one directly as `/creator-augmentor:<skill>`.

### `analytics-review`

**When to use:** Use when the user wants to analyze performance data they export or paste — YouTube/TikTok/Instagram/podcast/newsletter analytics CSVs — to find patterns (titles, topics, length, posting time, retention, CTR, open/click rates) and design next experiments. States sample sizes, avoids over-claiming, never invents benchmarks.

**Example prompt:** “Here's my last 90 days of YouTube analytics as CSV. What patterns do you see, and what should I test next?”

Source: [SKILL.md](../../plugins/creator-augmentor/skills/analytics-review/SKILL.md)

### `audience-research`

**When to use:** Use when the user wants to understand their audience from material they export or paste — comments, survey responses, DMs, community posts, reviews — or to design an audience survey. Clusters themes, questions, pains, and exact language; states counts. No scraping; personal details are summarized, not repeated.

**Example prompt:** “Analyze these 300 exported comments. What do people ask most, and what words do they use?”

Source: [SKILL.md](../../plugins/creator-augmentor/skills/audience-research/SKILL.md)

### `content-ideation`

**When to use:** Use when the user wants content ideas — video, podcast episode, newsletter, short-form, or series concepts — grounded in their niche, audience questions, past top performers, and goals. Generates, then scores ideas so the user picks. Doesn't claim ideas are trending without data the user supplies.

**Example prompt:** “Give me 15 video ideas for my budget-travel channel and score them against my audience's top questions.”

Source: [SKILL.md](../../plugins/creator-augmentor/skills/content-ideation/SKILL.md)

### `content-repurposing`

**When to use:** Use when the user wants to repurpose one piece of content (video, podcast transcript, blog post, livestream) into other formats — short clips with timestamps, social posts, threads, carousels, newsletter, blog. Platform-native rewrites from the source material only; no new claims.

**Example prompt:** “Here's my podcast transcript. Turn it into 3 short-clip ideas with timestamps, a LinkedIn post, and a newsletter section.”

Source: [SKILL.md](../../plugins/creator-augmentor/skills/content-repurposing/SKILL.md)

### `editorial-calendar`

**When to use:** Use when the user wants to plan a content calendar — content pillars, cadence per platform, series, seasonal/launch moments the user names, production pipeline stages, and buffers. Produces a CSV/Markdown calendar the user owns. Cadence is set by the user's real capacity.

**Example prompt:** “Build a 6-week calendar: 1 long video and 3 shorts a week, around my content pillars, with a buffer week.”

Source: [SKILL.md](../../plugins/creator-augmentor/skills/editorial-calendar/SKILL.md)

### `hooks-and-scripts`

**When to use:** Use when the user wants hooks, titles, thumbnail text concepts, intros, a beat outline, or a full script/talking points for a video, short, podcast, or newsletter — in their voice (from a voice guide or samples). Builds from the user's story and facts; marks anything that needs a real number or source.

**Example prompt:** “Write 5 hook options and a beat outline for a 10-minute video on paying off $20k in debt — my story, my numbers.”

Source: [SKILL.md](../../plugins/creator-augmentor/skills/hooks-and-scripts/SKILL.md)

### `sponsorship-pitch`

**When to use:** Use when the user wants to pitch brands, build a media kit or rate card, reply to a sponsor inquiry, or prepare for a sponsorship negotiation. Uses only the user's real metrics, audience data, and past partnerships; never invents stats, testimonials, or brand logos. Flags disclosure and contract questions.

**Example prompt:** “Draft a pitch to a camping-gear brand using my real channel stats. Leave blanks for anything I haven't given you.”

Source: [SKILL.md](../../plugins/creator-augmentor/skills/sponsorship-pitch/SKILL.md)

### `voice-consistency`

**When to use:** Use when the user wants to define, document, or check their creator voice — build a voice and style guide from samples of their past content, keep collaborators or editors on-voice, or check whether a draft sounds like them. Analyzes the user's own work; does not imitate other creators.

**Example prompt:** “Read these five newsletters and build a voice guide I can reuse, then check this draft against it.”

Source: [SKILL.md](../../plugins/creator-augmentor/skills/voice-consistency/SKILL.md)

## Commands

### `/creator-augmentor:ideas`

**What it does:** Generate and score content ideas for your niche, audience, and goals.

**Arguments:** `[niche, platform, audience, goal, past hits]`

**Example:** `/creator-augmentor:ideas "home espresso, YouTube, beginners, grow subs, best: 'grinder mistakes'"`

Source: [ideas.md](../../plugins/creator-augmentor/commands/ideas.md)

### `/creator-augmentor:pitch`

**What it does:** Draft a sponsorship pitch email and media-kit outline using only your real metrics.

**Arguments:** `[brand, why it fits, your metrics and period, deliverable idea]`

**Example:** `/creator-augmentor:pitch "Acme Tents; camping audience; 42k subs, 18k avg views last 90d; 60s integration"`

Source: [pitch.md](../../plugins/creator-augmentor/commands/pitch.md)

### `/creator-augmentor:repurpose`

**What it does:** Turn one piece of content into platform-native clips, posts, and a newsletter section.

**Arguments:** `[transcript or path] [target platforms]`

**Example:** `/creator-augmentor:repurpose ep42-transcript.txt "Shorts, LinkedIn, newsletter"`

Source: [repurpose.md](../../plugins/creator-augmentor/commands/repurpose.md)

### `/creator-augmentor:script`

**What it does:** Draft hooks and a script or beat outline in your voice, with claims marked for checking.

**Arguments:** `[topic, format/length, platform, your angle, voice guide path]`

**Example:** `/creator-augmentor:script "my first year freelancing, 12-min YouTube, honest numbers, voice-guide.md"`

Source: [script.md](../../plugins/creator-augmentor/commands/script.md)

## Agents

Claude can delegate to these subagents on its own, or you can call one with `@agent-creator-augmentor:<agent>`.

### `analytics-analyst`

**When to use:** Analyzes analytics exports (CSV/JSON) from YouTube, TikTok, Instagram, podcast hosts, or newsletter platforms. Computes group comparisons with medians and sample sizes, flags weak evidence, and proposes experiments. Never uses invented benchmarks. Use when the user shares a data export and asks what's working.

**Tools:** Read, Grep, Glob, Bash · **Model:** inherit

**Example prompt:** “@agent-creator-augmentor:analytics-analyst analyze exports/youtube-90d.csv for what drives watch time”

Source: [analytics-analyst.md](../../plugins/creator-augmentor/agents/analytics-analyst.md)

### `voice-editor`

**When to use:** Read-only editor that checks a script, post, or newsletter draft against the user's voice guide or past samples — off-voice lines, generic filler, weak hook, pacing — and flags unsupported claims. Use before recording or publishing.

**Tools:** Read, Grep, Glob · **Model:** inherit

**Example prompt:** “@agent-creator-augmentor:voice-editor check script-draft.md against voice-guide.md”

Source: [voice-editor.md](../../plugins/creator-augmentor/agents/voice-editor.md)

## Guardrails

- Never posts, schedules, or messages anyone. Pitches and replies are drafts you send.
- Analytics review uses only data you export or paste, states sample sizes, and labels correlation vs. causation. No invented platform benchmarks.
- Sponsorship pitches use only your real numbers; missing stats are `[DATA NEEDED]`, and no testimonials or past brand deals are invented (`[TESTIMONIAL NEEDED]`).
- Flags sponsored-content disclosure requirements for you to check (`[verify: platform & local ad-disclosure rules]`). Not legal advice on contracts, copyright, or fair use.
- Scripts and hooks are drafts in your voice guide for you to rewrite; it won't imitate a specific other creator's identity or copy their content.
- Audience research uses comments, surveys, and DMs you provide — no scraping, and personal data is summarized, not repeated.

See [guardrails](../guardrails.md) for the principles behind these rules.

## Sample workflows

**Weekly content sprint.** `/creator-augmentor:ideas` from your niche → pick 2 → `/creator-augmentor:script` → `@agent-creator-augmentor:voice-editor` → you record.

**One video, five posts.** `/creator-augmentor:repurpose` your transcript → edit each piece → add to `editorial-calendar`.

**Monthly review.** Export analytics CSV → `@agent-creator-augmentor:analytics-analyst` → adjust calendar and next experiments.

**Brand outreach.** `/creator-augmentor:pitch` with your real media kit numbers → fill `[DATA NEEDED]` → you send.

---
[← Back to docs index](../index.md)
