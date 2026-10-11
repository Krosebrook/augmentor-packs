# Guardrails

## Augmentor principles

These apply to every pack (see also the root [README](../README.md#design-principles)):

1. **You do the thinking; the pack sequences it.** Hints before answers, feedback before rewrites, questions before plans.
2. **No invented facts.** Sources, standards, statistics, testimonials, and figures come from you. Gaps are marked, not filled in.
3. **Drafts, not actions.** Nothing is sent, posted, or graded on your behalf.
4. **Opinionated defaults, stated plainly**, and easy to override.
5. **Not professional advice.** Legal, tax, HR, medical, benefits, and code-compliance questions go to qualified people and authorities.
6. **Privacy by default.** De-identify before pasting (no PHI, no full ID numbers); summarize personal data rather than repeating it.

### Placeholders used in the packs

| Placeholder | Meaning | Where it appears |
|---|---|---|
| `[CHECK: …]` | A claim or detail you must confirm | office-augmentor, creator-augmentor, ai-beginner-augmentor |
| `[DATA NEEDED]` | A number or fact is needed and you didn't supply it | consultant-augmentor (ROI, scoping, surveys), designer-augmentor (briefs, contrast values), office-augmentor (doc-report-drafter), educator-augmentor (assessment-builder), trades-augmentor (quotes), job-seeker-augmentor (resume metrics, market data), creator-augmentor (pitches, benchmarks) |
| `[TESTIMONIAL NEEDED]` | Space for real social proof. Never fabricated. | solo-founder-augmentor (landing-page-copy), creator-augmentor (sponsorship-pitch) |
| `[CONFIRM]`, `[verify]` | Something for you to verify before use | various skills |
| `[verify: official reference / pharmacist]` | Clinical fact to check in an official reference or with the pharmacist | healthcare-worker-augmentor |
| `[verify: adopted code edition / AHJ]` | Code requirement to confirm in your locally adopted code or with the inspector | trades-augmentor |
| `[verify: official source / professional]` | Benefits, legal, or program detail that varies by place | parent-caregiver-augmentor |
| `[CONTENT NEEDED]`, `[QUOTE NEEDED]` | Real copy or a verbatim participant quote you must supply | designer-augmentor |
| `[ASSIGN]` | An owner only you can name | engineer-augmentor, consultant-augmentor |
| `[PERSONALIZE: …]`, `[YOUR STORY: …]` | Personal detail only you can supply | job-seeker-augmentor, creator-augmentor |

### Structural safeguards

- The augmentor packs have no MCP servers, hooks, or executables, so they can't send messages or call external services. `scripts/validate.py` fails if an augmentor pack declares an MCP server.
- The optional `tools-*` plugins are the only plugins that run code. Each runs one local, zero-dependency Node.js MCP stdio server that makes read-only HTTPS requests to the public APIs listed in [tool add-ons](packs/tools.md). They have no write or send capabilities, no telemetry, and no committed credentials. `GITHUB_TOKEN` is read only from your environment, and `sec_user_agent` is stored in your Claude Code settings.
- Most agents use only `Read, Grep, Glob`. The exceptions: `ai-code-reviewer`, `formula-auditor`, `analytics-analyst`, `logic-auditor`, `script-reviewer`, and `assumption-auditor` also have `Bash` (read-only inspection, linters, and recalculation; `script-reviewer` never runs the script under review), and `practice-examiner`, `discovery-synthesizer`, and `interview-debriefer` also have `Write`, so they can save their output files.

## Integrity rules per pack

### ai-beginner-augmentor
- Coaches, never replaces: the person attempts first (questions, exercises, steps); it gives hints and feedback.
- Never declares a claim true from memory. Checkable claims are listed with the kind of source to check and marked `[CHECK: …]`.
- Stops when passwords, ID numbers, financial details, health records, or other people's private information appear, and doesn't repeat them.
- Never claims abilities it doesn't have (sending, browsing accounts, remembering forever). Agents are read-only.
- Not legal, medical, or financial advice.

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

### healthcare-worker-augmentor
- Not medical advice, diagnosis, or orders. Clinician judgment, facility policy, prescribers, and pharmacists come first.
- No PHI. Every skill reminds you to de-identify and stops if identifiers appear.
- Never states doses, interactions, compatibility, or lab ranges from memory. Drug questions become lookup checklists and pharmacist questions.
- Self-harm mentions get crisis resources (e.g. 988 in the US) before anything else.

### trades-augmentor
- Quotes and invoices use only your rates and prices, with the math shown.
- Never quotes code sections or values as fact. The adopted code and the AHJ govern.
- Safety checklists supplement your company program, OSHA requirements, and manufacturer instructions.
- Not legal or tax advice (liens, contracts, sales tax).

### job-seeker-augmentor
- Never fabricates experience, titles, dates, metrics, or credentials. `resume-truth-checker` compares output to your source history.
- Never sends outreach or applications, and never invents shared connections.
- Salary data comes from sources you gather. Not legal advice on contracts or visas.

### creator-augmentor
- Never posts or messages brands. Pitches use only your real metrics; no invented testimonials or partners.
- Analytics conclusions come only from your exports, with sample sizes; no invented benchmarks.
- Flags sponsored-content disclosure for you to check. Won't clone another creator's identity.

### parent-caregiver-augmentor
- The homework coach gives hints and questions, never final answers to assigned work.
- Not medical, legal, financial, or benefits advice. It prepares questions for professionals and never says someone qualifies for a program.
- School and doctor messages are drafts you send. Care logs stay in files you control.

### designer-augmentor
- Critiques and scaffolds; never claims a design is "done" or compliant on its own authority.
- Never invents user research, quotes, analytics, brand colors, or testimonials. Gaps are `[DATA NEEDED]`, `[CONTENT NEEDED]`, `[QUOTE NEEDED]`, `[CONFIRM]`.
- Accessibility checks are review aids, not conformance certification or legal advice.
- Agents are read-only.

### engineer-augmentor
- You change the code; the pack explains, audits, and plans. You should understand every change before you merge it.
- Never deletes or weakens tests to make a suite pass.
- Never asks for, stores, or repeats real secrets; uses placeholders like `<API_KEY>`.
- Review replies are drafts; nothing is posted. Agents never execute the script under review or modify files.
- Unverified causes are labeled hypotheses; unknowns are `[CONFIRM]`.

### consultant-augmentor
- You own the advice, the numbers, and the client relationship; the pack structures and stress-tests.
- Never invents use cases as client facts, benchmarks, survey responses, rates, or results. Gaps are `[DATA NEEDED]`, `[CHECK: source]`, `[CONFIRM]`, `[ASSIGN]`.
- Proposals, reports, and replies are drafts; nothing is sent.
- Not legal or financial advice; contract terms go to counsel.
- Use roles, not names, and de-identify client data before pasting.

## Reporting a guardrail failure

If a pack crosses one of these lines (e.g. writes a whole graded essay, or makes up a citation), open an issue at [Krosebrook/augmentor-packs](https://github.com/Krosebrook/augmentor-packs/issues) with the prompt and the output. Guardrail failures are treated as bugs.

[← Back to docs index](index.md)
