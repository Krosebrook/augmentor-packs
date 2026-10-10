# Guardrails

## Augmentor principles

These apply to every pack (see also the root [README](../README.md#design-principles)):

1. **You do the thinking; the pack sequences it.** Hints before answers, feedback before rewrites, questions before plans.
2. **No invented facts.** Sources, standards, statistics, testimonials, and figures come from you. Gaps are marked, not filled in.
3. **Drafts, not actions.** Nothing is sent, posted, or graded on your behalf.
4. **Opinionated defaults, stated plainly**, and easy to override.
5. **Not professional advice.** Legal, tax, HR, and medical questions go to qualified people.

### Placeholders used in the packs

| Placeholder | Meaning | Where it appears |
|---|---|---|
| `[CHECK: …]` | A claim or detail you must confirm | office-augmentor |
| `[DATA NEEDED]` | A number or fact is needed and you didn't supply it | office-augmentor (doc-report-drafter), educator-augmentor (assessment-builder) |
| `[TESTIMONIAL NEEDED]` | Space for real social proof. Never fabricated. | solo-founder-augmentor (landing-page-copy) |
| `[CONFIRM]`, `[verify]` | Something for you to verify before use | various skills |

### Structural safeguards

- The packs have no MCP servers, hooks, or executables, so they can't send messages or call external services.
- Most agents use only `Read, Grep, Glob`. The exceptions: `ai-code-reviewer` and `formula-auditor` also have `Bash`, and `practice-examiner` and `discovery-synthesizer` also have `Write`, so they can save their output files.

## Integrity rules per pack

### student-augmentor
- Never ghostwrites graded work. Essay help is coaching and feedback on *your* draft.
- Tutoring and step-checking give hints and point to the first error, not full solutions.
- Never fabricates sources. The citation auditor flags every reference you must check yourself.
- Your course's AI policy takes precedence (`/student-augmentor:integrity-check`).

### office-augmentor
- Drafts only; never sends.
- Uses only the facts you supply and marks gaps `[CHECK: …]` / `[DATA NEEDED]`.
- Not legal or HR advice (pushback and negotiation coaching).

### ai-transition-builder
- You build the project; the coach scopes, reviews, and teaches.
- Checks current provider docs for model names, parameters, and prices instead of relying on memory.
- You should be able to explain AI-written code before you merge it.
- The security audit agent is read-only.

### educator-augmentor
- The teacher stays the grader. It suggests feedback but doesn't assign final grades.
- Uses only the standards text the teacher pastes. It never invents or paraphrases standards codes.
- School or district policy comes first.
- Parent messages are drafts the teacher edits and sends.

### solo-founder-augmentor
- Never invents market data, benchmarks, testimonials, logos, or metrics.
- Never sends or scrapes outreach, and never invents personalization.
- Runway math uses only your numbers. Not tax, legal, or investment advice.

## Reporting a guardrail failure

If a pack crosses one of these lines (e.g. writes a whole graded essay, or makes up a citation), open an issue with the prompt and the output once the repo is public. Guardrail failures are treated as bugs.

[← Back to docs index](index.md)
