# AI Beginner Augmentor (`ai-beginner-augmentor`)

> A warm, jargon-free starting point for people brand new to AI and Claude: a first-week tour, how to ask good questions, checking answers and spotting made-up facts, what not to share, picking the right augmentor pack, turning a messy task into steps, practice exercises with feedback, and a plain-words glossary. Coaches you; you stay the one thinking and deciding.

Version 1.4.0 · License MIT · Source: [`plugins/ai-beginner-augmentor`](../../plugins/ai-beginner-augmentor) · Pack README: [README](../../plugins/ai-beginner-augmentor/README.md)

**Level: Beginner** ([what levels mean](../index.md#levels)). Written for people who have never used AI. Start here.

## Who it's for

Anyone brand new to AI, Claude, or Claude Code, from any background: no tech skills assumed. If you haven't installed Claude Code yet, read [getting started](../beginners/getting-started.md) first, then [your first 10 minutes](../beginners/first-10-minutes.md).

## Install

```
/plugin marketplace add Krosebrook/augmentor-packs
/plugin install ai-beginner-augmentor@augmentor-packs
```

Then type `/ai-beginner-augmentor:start`. See [installation](../installation.md) for local-path installs and troubleshooting.

## Skills

Skills load automatically when your request matches their description. You can also run one directly as `/ai-beginner-augmentor:<skill>`.

### `first-week-tour`

**When to use:** Use when someone is brand new to AI, Claude, or Claude Code and wants to know where to start: "I've never used AI", "what can this do?", "show me around", "I'm a beginner". Gives a gentle, one-step-at-a-time tour over the first week: what Claude is good and bad at, a first real task from the person's own life, checking the answer, and what to try next. Plain words, no jargon.

**Example prompt:** “I've never used AI before. Where do I start?”

Source: [SKILL.md](../../plugins/ai-beginner-augmentor/skills/first-week-tour/SKILL.md)

### `question-coach`

**When to use:** Use when a beginner wants better answers from Claude or AI, or their question was vague and the answer missed: "how do I ask this?", "it didn't understand me", "help me word this", "prompt basics". Coaches them, in plain words, to rewrite their own question with who it's for, what they want, why, and what the answer should look like. Improves their question rather than silently answering a different one.

**Example prompt:** “Help me word this better: 'write something for my landlord'.”

Source: [SKILL.md](../../plugins/ai-beginner-augmentor/skills/question-coach/SKILL.md)

### `answer-checking`

**When to use:** Use when a beginner wants to know if an AI answer is right, or should be checked: "is this true?", "can I trust this?", "did it make this up?", "check this answer", hallucinations. Teaches, step by step, how to spot claims that need checking (names, numbers, dates, quotes, links, laws, medical or money facts) and how to verify them with trusted sources. Never declares something true without a source the person can check.

**Example prompt:** “Claude told me my city's recycling rules. Which parts should I double-check?”

Source: [SKILL.md](../../plugins/ai-beginner-augmentor/skills/answer-checking/SKILL.md)

### `privacy-basics`

**When to use:** Use when a beginner asks what's safe to share with AI or Claude, or is about to paste something personal or sensitive: passwords, ID numbers, bank or card details, medical records, someone else's private information, or work confidential material. Explains in plain words what not to share, how to remove identifying details, and to follow their workplace or school rules. Stops and warns before handling sensitive data.

**Example prompt:** “Is it okay to paste my bank statement in here?”

Source: [SKILL.md](../../plugins/ai-beginner-augmentor/skills/privacy-basics/SKILL.md)

### `pack-picker`

**When to use:** Use when a beginner asks which augmentor pack or plugin to install, "what else can I add?", "which pack is for me?", or describes their life or job and wants a recommendation. Asks two or three plain questions and suggests one to two packs from the augmentor-packs marketplace (decision-coach, student, office, educator, parent-caregiver, job-seeker, creator, trades, healthcare-worker, solo-founder, designer, engineer, consultant, ai-transition-builder, and the optional tools add-ons) with the exact install command and its level.

**Example prompt:** “I'm a nurse and a mom of two. Which pack should I try?”

Source: [SKILL.md](../../plugins/ai-beginner-augmentor/skills/pack-picker/SKILL.md)

### `task-to-steps`

**When to use:** Use when a beginner feels overwhelmed or has a messy, big, or vague task: "I don't know where to start", "this is too much", "help me plan this", "break this down". Helps them turn it into a short list of small, concrete steps they choose, with the first step small enough to do in ten minutes. Asks before planning; the person decides the order.

**Example prompt:** “I need to move apartments next month and I don't know where to start.”

Source: [SKILL.md](../../plugins/ai-beginner-augmentor/skills/task-to-steps/SKILL.md)

### `practice-coach`

**When to use:** Use when a beginner wants to practice using AI or Claude, learn by doing, or asks for exercises, a quiz, or homework on AI basics: asking clear questions, checking answers, protecting privacy, breaking down tasks. Gives one short hands-on exercise at a time, waits for the person's attempt, then gives kind, specific feedback. Never does the exercise for them.

**Example prompt:** “Give me a practice exercise on asking clear questions.”

Source: [SKILL.md](../../plugins/ai-beginner-augmentor/skills/practice-coach/SKILL.md)

### `plain-glossary`

**When to use:** Use when a beginner asks what an AI or tech word means, or seems confused by jargon: AI, model, prompt, chatbot, Claude Code, terminal, plugin, marketplace, skill, command, agent, token, context, hallucination, MCP, install, repository, and similar. Explains each in one or two plain sentences with an everyday comparison, without new jargon.

**Example prompt:** “What's a plugin? And what's a marketplace?”

Source: [SKILL.md](../../plugins/ai-beginner-augmentor/skills/plain-glossary/SKILL.md)

## Commands

### `/ai-beginner-augmentor:start`

Begin a friendly first-week tour of AI and Claude, one small step at a time. Arguments: `[optional: what you do most days]`

Source: [start.md](../../plugins/ai-beginner-augmentor/commands/start.md)

### `/ai-beginner-augmentor:ask-better`

Coach me to rewrite my question so Claude gives a better answer. Arguments: `[the question you want to ask]`

Source: [ask-better.md](../../plugins/ai-beginner-augmentor/commands/ask-better.md)

### `/ai-beginner-augmentor:check-this`

Show me which parts of an AI answer to double-check, and where. Arguments: `[paste the answer, or a file path]`

Source: [check-this.md](../../plugins/ai-beginner-augmentor/commands/check-this.md)

### `/ai-beginner-augmentor:which-pack`

Help me pick the one augmentor pack that fits my life or job. Arguments: `[optional: what you do and what you'd like help with]`

Source: [which-pack.md](../../plugins/ai-beginner-augmentor/commands/which-pack.md)

### `/ai-beginner-augmentor:practice`

Give me a short hands-on exercise on AI basics and feedback on my attempt. Arguments: `[optional: questions | checking | privacy | steps | my own task]`

Source: [practice.md](../../plugins/ai-beginner-augmentor/commands/practice.md)

## Agents

### `friendly-explainer`

**When to use:** Patient, read-only explainer for people new to AI or tech. Takes a confusing passage, file, error message, or set of instructions and explains it in plain words, one step at a time, with an everyday comparison and a 'what to do next'. Use when a beginner says 'I don't understand this'.

**Tools:** Read, Grep, Glob · **Model:** inherit

Call it with `@agent-ai-beginner-augmentor:friendly-explainer`.

Source: [friendly-explainer.md](../../plugins/ai-beginner-augmentor/agents/friendly-explainer.md)

### `answer-checker`

**When to use:** Read-only checker that reviews an AI-written answer or document for claims a beginner should verify before trusting or sharing it: names, numbers, dates, quotes, links, statistics, rules, and health, legal, money, or safety statements. Reports each claim with a risk level and what kind of source to check. Never declares facts true on its own authority.

**Tools:** Read, Grep, Glob · **Model:** inherit

Call it with `@agent-ai-beginner-augmentor:answer-checker`.

Source: [answer-checker.md](../../plugins/ai-beginner-augmentor/agents/answer-checker.md)

## Guardrails

- Coaches, never replaces: you attempt first; it gives hints and feedback.
- Never invents facts. Anything to verify is marked `[CHECK: …]`; it never declares a claim true from memory.
- Never sends messages or acts for you. No MCP servers, hooks, or executables; agents are read-only.
- Privacy first: stops and helps you remove passwords, ID numbers, and other people's private details.
- Not legal, medical, or financial advice.

See [guardrails](../guardrails.md) for the principles behind these rules.

---
[← Back to docs index](../index.md)
