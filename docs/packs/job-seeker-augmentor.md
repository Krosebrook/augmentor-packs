# Job Seeker Augmentor (`job-seeker-augmentor`)

> Job-search coach that keeps you honest and in charge: resume tailoring to a posting without fabrication, interview prep and mock interviews, STAR story bank, networking outreach drafts you send yourself, offer evaluation and negotiation, an application tracker, and a skills-gap plan.

Version 1.2.0 · License MIT · Source: [`plugins/job-seeker-augmentor`](../../plugins/job-seeker-augmentor) · Pack README: [README](../../plugins/job-seeker-augmentor/README.md)

## Who it's for

Anyone looking for a job or changing careers — new grads, career switchers, people returning to work, and experienced professionals — who wants sharper, honest materials, better interview practice, and an organized search.

## Install

```
/plugin marketplace add Krosebrook/augmentor-packs
/plugin install job-seeker-augmentor@augmentor-packs
```

See [installation](../installation.md) for local-path installs and troubleshooting.

## Skills

Skills load automatically when your request matches their description. You can also run one directly as `/job-seeker-augmentor:<skill>`.

### `application-tracker`

**When to use:** Use when the user wants to organize their job search — create or update an application tracker (CSV or Markdown) with company, role, date applied, status, contacts, next action, and follow-up dates; weekly pipeline review; conversion stats from their own data.

**Example prompt:** “Set up an application tracker CSV and add these three applications. What's due this week?”

Source: [SKILL.md](../../plugins/job-seeker-augmentor/skills/application-tracker/SKILL.md)

### `interview-prep`

**When to use:** Use when the user has an upcoming interview (phone screen, hiring manager, panel, case, technical, final) and wants preparation — likely questions from the posting, company research checklist, "tell me about yourself", weakness/gap answers, and questions to ask. Coaches the user's own answers.

**Example prompt:** “I have a product manager interview at a mid-size fintech Thursday. Prep me.”

Source: [SKILL.md](../../plugins/job-seeker-augmentor/skills/interview-prep/SKILL.md)

### `mock-interview`

**When to use:** Use when the user wants to practice interviewing — behavioral, role-specific, case, or system-design style — with a realistic interviewer persona, one question at a time, follow-up probes, and structured feedback after. The user answers; Claude never answers for them during the mock.

**Example prompt:** “Run a 20-minute behavioral mock interview for a senior data analyst role. Be tough.”

Source: [SKILL.md](../../plugins/job-seeker-augmentor/skills/mock-interview/SKILL.md)

### `networking-outreach`

**When to use:** Use when the user wants to draft networking messages — informational interview requests, referral asks, alumni outreach, recruiter replies, thank-you notes, and follow-ups. Short, specific, low-pressure drafts personalized only with facts the user supplies. Never sends, scrapes, or invents connections.

**Example prompt:** “Draft a short LinkedIn note to a former colleague asking for a referral to her company's analytics team.”

Source: [SKILL.md](../../plugins/job-seeker-augmentor/skills/networking-outreach/SKILL.md)

### `offer-negotiation`

**When to use:** Use when the user has a job offer (or expects one) and wants to evaluate total compensation, compare offers, prepare a counteroffer, script the negotiation call/email, or decide. Uses the user's numbers and market data they gathered; never invents salary benchmarks. Not legal or tax advice.

**Example prompt:** “I got an offer. Help me compare it to my current job and plan a counter. Here's the data I found.”

Source: [SKILL.md](../../plugins/job-seeker-augmentor/skills/offer-negotiation/SKILL.md)

### `resume-tailoring`

**When to use:** Use when the user wants to tailor a resume, CV, or cover letter to a specific job posting, improve bullets, or check ATS keyword fit. Maps posting requirements to the user's real experience, rewrites bullets in action-impact form, and flags gaps honestly. Never invents experience, metrics, or credentials.

**Example prompt:** “Tailor my master resume to this job posting. Don't add anything I haven't done.”

Source: [SKILL.md](../../plugins/job-seeker-augmentor/skills/resume-tailoring/SKILL.md)

### `skills-gap-plan`

**When to use:** Use when the user is changing careers or aiming higher and wants to compare their skills to target roles (from postings they supply), identify gaps, and build a time-boxed learning and portfolio plan. Based on postings the user provides, not invented market trends.

**Example prompt:** “Compare my background to these three data engineer postings and build a 90-day plan for the gaps.”

Source: [SKILL.md](../../plugins/job-seeker-augmentor/skills/skills-gap-plan/SKILL.md)

### `star-story-bank`

**When to use:** Use when the user wants to build or improve behavioral interview stories (STAR/CAR/SOAR) — leadership, conflict, failure, ambiguity, influence, customer focus. Interviews the user to extract real details, structures them, tags them to common question themes, and tightens delivery. Never invents events or outcomes.

**Example prompt:** “Interview me to build STAR stories for leadership, conflict, and failure.”

Source: [SKILL.md](../../plugins/job-seeker-augmentor/skills/star-story-bank/SKILL.md)

## Commands

### `/job-seeker-augmentor:mock`

**What it does:** Start a mock interview: one question at a time with follow-ups, then scored feedback.

**Arguments:** `[role, level, type: behavioral|technical|case, difficulty]`

**Example:** `/job-seeker-augmentor:mock "senior UX designer, behavioral, tough, 20 min"`

Source: [mock.md](../../plugins/job-seeker-augmentor/commands/mock.md)

### `/job-seeker-augmentor:negotiate`

**What it does:** Evaluate an offer with your numbers and prepare a negotiation script (email + call) and role-play.

**Arguments:** `[offer details] [your market data and source] [priorities]`

**Example:** `/job-seeker-augmentor:negotiate "base 110k, 10% bonus, 4 wks PTO; market data levels.txt; priority: base and remote"`

Source: [negotiate.md](../../plugins/job-seeker-augmentor/commands/negotiate.md)

### `/job-seeker-augmentor:outreach`

**What it does:** Draft a networking or referral message (two variants) personalized only with facts you supply.

**Arguments:** `[who, relationship, goal, facts to personalize]`

**Example:** `/job-seeker-augmentor:outreach "former manager, warm, referral to Acme analytics role, worked together 2021-23"`

Source: [outreach.md](../../plugins/job-seeker-augmentor/commands/outreach.md)

### `/job-seeker-augmentor:tailor`

**What it does:** Tailor your resume (and optionally a cover letter) to a posting with a requirement map and honest gap list.

**Arguments:** `[resume path] [posting path or URL text] [cover letter? y/n]`

**Example:** `/job-seeker-augmentor:tailor resume.md posting.txt y`

Source: [tailor.md](../../plugins/job-seeker-augmentor/commands/tailor.md)

## Agents

Claude can delegate to these subagents on its own, or you can call one with `@agent-job-seeker-augmentor:<agent>`.

### `resume-truth-checker`

**When to use:** Read-only reviewer that compares a tailored resume or cover letter against the user's master resume/work history and flags any claim, metric, title, date, skill, or credential not supported by the source. Also checks clarity and ATS basics. Use before submitting an application.

**Tools:** Read, Grep, Glob · **Model:** inherit

**Example prompt:** “@agent-job-seeker-augmentor:resume-truth-checker compare tailored-resume.md against master-resume.md”

Source: [resume-truth-checker.md](../../plugins/job-seeker-augmentor/agents/resume-truth-checker.md)

### `interview-debriefer`

**When to use:** Analyzes a mock-interview transcript or the user's notes from a real interview: scores answers, spots patterns (rambling, missing results, "we" vs. "I"), drafts a thank-you note for the user to send, and writes a short practice plan file. Use after an interview or mock session.

**Tools:** Read, Grep, Glob, Write · **Model:** inherit

**Example prompt:** “@agent-job-seeker-augmentor:interview-debriefer debrief notes/interview-acme.md”

Source: [interview-debriefer.md](../../plugins/job-seeker-augmentor/agents/interview-debriefer.md)

## Guardrails

- No fabrication: resumes, cover letters, and stories use only experience you provide. Missing metrics are `[DATA NEEDED]`, never estimated.
- Keyword matching only for skills you actually have; it tells you which posting requirements you don't meet rather than hiding them.
- Outreach and follow-ups are drafts you personalize and send. It doesn't scrape profiles or invent shared connections.
- Salary and market data come from sources you gather; negotiation scripts use your numbers.
- Interview prep coaches *your* answers; it doesn't script answers about experience you don't have.
- Not legal advice on offers, non-competes, discrimination, or visas — those go to qualified professionals.

See [guardrails](../guardrails.md) for the principles behind these rules.

## Sample workflows

**Tailor an application.** `/job-seeker-augmentor:tailor` with your master resume and the posting → fill every `[DATA NEEDED]` → `@agent-job-seeker-augmentor:resume-truth-checker` → you submit.

**Interview next week.** `star-story-bank` to build 6–8 stories → `/job-seeker-augmentor:mock` → debrief and repeat weak questions.

**Networking push.** `/job-seeker-augmentor:outreach` drafts → you personalize and send → log in `application-tracker`.

**Offer in hand.** `/job-seeker-augmentor:negotiate` with your market data → role-play the call → decide.

---
[← Back to docs index](../index.md)
