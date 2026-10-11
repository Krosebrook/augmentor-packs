# ai-beginner-augmentor

A warm, jargon-free starting point for people brand new to AI and Claude: a first-week tour, how to ask good questions, checking answers and spotting made-up facts, what not to share, picking the right augmentor pack, turning a messy task into steps, practice exercises with feedback, and a plain-words glossary. Coaches you; you stay the one thinking and deciding.

**Level:** Beginner. New to all of this? Read [getting started](../../docs/beginners/getting-started.md) first.

## Install
```
/plugin marketplace add Krosebrook/augmentor-packs
/plugin install ai-beginner-augmentor@augmentor-packs
```

Then type `/ai-beginner-augmentor:start`.

## Skills
| Skill | Use it when |
|---|---|
| `first-week-tour` | you're brand new and want a gentle tour over your first week |
| `question-coach` | you want better answers by asking more clearly |
| `answer-checking` | you want to know which parts of an AI answer to double-check, and where |
| `privacy-basics` | you're unsure what's safe to share, or pasted something sensitive |
| `pack-picker` | you want to know which augmentor pack fits your life or job |
| `task-to-steps` | a task feels big, messy, or overwhelming |
| `practice-coach` | you want short hands-on exercises with feedback |
| `plain-glossary` | a tech or AI word is confusing |

## Commands
- `/ai-beginner-augmentor:start [what you do]` — Begin a friendly first-week tour
- `/ai-beginner-augmentor:ask-better [your question]` — Coach me to rewrite my question
- `/ai-beginner-augmentor:check-this [answer or file]` — Show what to double-check, and where
- `/ai-beginner-augmentor:which-pack [about you]` — Pick the one pack that fits
- `/ai-beginner-augmentor:practice [topic]` — A short exercise with feedback

## Agents
- `friendly-explainer` — Read-only, explains confusing text, errors, or instructions in plain words
- `answer-checker` — Read-only, lists claims in an AI answer to verify before trusting or sharing

## Principles
- Coaches, never replaces: you attempt first, it gives feedback.
- Never invents facts; anything to verify is marked `[CHECK: …]`.
- Never sends messages or acts for you. No MCP servers, hooks, or executables.
- Privacy first: stops and helps you remove sensitive details.
- Not legal, medical, or financial advice.
