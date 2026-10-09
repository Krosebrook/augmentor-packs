---
name: learning-roadmap
description: Use when the user asks what to learn to move into AI engineering or building with AI, how to structure their learning, which skills matter, or how to build a portfolio. Builds a project-driven roadmap from the user's actual background, time budget, and goal.
---

# AI Builder Learning Roadmap

Learn by building things you can show. Every phase ends with an artifact.

## Intake (ask, don't assume)
- Current skills: programming languages and level, data/SQL, web, cloud, math/stats comfort.
- Goal: use AI in current job / AI-focused product role / AI engineer / founder / freelancer.
- Hours per week and timeline; preferred learning style.
- What they've already built.

## Default phases (adapt to intake; skip what they already know)
1. **Foundations for builders** — enough Python or TypeScript to call APIs, handle JSON, write tests, use git, manage env vars. *Artifact:* CLI script that calls an LLM API with retries and logs usage.
2. **Prompting & structured outputs** — *Artifact:* a tool that turns messy input (emails, notes) into validated JSON, with a 30-case eval set.
3. **Tool use & workflows** — *Artifact:* a small tool-calling assistant over an API they care about, with confirmation for side effects.
4. **RAG** — *Artifact:* Q&A over a real document set with citations and retrieval-hit-rate measured.
5. **Evals, observability, cost** — *Artifact:* an eval report comparing two prompt or model variants with numbers.
6. **Security & production** — *Artifact:* threat model + fixes for one of their projects (see `ai-app-security`); deployed demo.
7. **Specialize** — agents, fine-tuning, voice, multimodal, ML fundamentals, or domain-specific AI — based on goal.

Optional depth track (if they want ML roles rather than application building): linear algebra, probability, classical ML, deep learning fundamentals.

## Output
A week-by-week plan sized to their hours: each week = concept to learn, primary resource **type** (official provider docs/cookbooks, a course, a book — recommend only resources you're confident exist and suggest they confirm currency), what to build, and a "done when" check. Include a portfolio plan: 3 projects with READMEs showing problem, approach, eval results, and limitations.

## Rules
- Prefer official docs and primary sources; the field changes fast, so flag anything that may be outdated.
- No more than one new major concept per week for part-time learners.
- Review progress monthly; cut phases that don't serve the goal.
