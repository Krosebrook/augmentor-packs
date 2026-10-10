# FAQ

**What's an "augmentor"?**
A plugin that coaches, checks, and speeds up *your* work instead of doing it for you. See [guardrails](guardrails.md).

**Will student-augmentor write my essay?**
No. It coaches your thesis, outline, and draft and gives feedback, but it doesn't ghostwrite graded work. Use `/student-augmentor:integrity-check` to see how a planned use fits your course's AI policy.

**Will educator-augmentor grade my students?**
No. It suggests feedback comments against your rubric. You review them and assign the grades.

**Can it send my emails or outreach?**
No. The augmentor packs have no MCP servers, hooks, or executables, so they can't send anything. You get drafts.

**What are the `tools-*` plugins?**
Optional add-ons that each run a small local Node.js MCP server and fetch public data (package health, GitHub releases, public holidays, SEC EDGAR filings, domain DNS/RDAP/TLS). None can send messages or write anywhere. They're separate so the augmentor packs stay MCP-free; install them only if you want live data. See [tool add-ons](packs/tools.md).

**Do the tool add-ons need API keys?**
No. `tools-github-releases` can use a `GITHUB_TOKEN` you export in your shell for higher rate limits (never stored in the repo). `tools-sec-edgar` has an optional `sec_user_agent` setting; SEC asks for a User-Agent with contact info, and a generic default is used otherwise. They need Node.js 18+.

**Will healthcare-worker-augmentor give me doses or clinical advice?**
No. It structures handoffs, simplifies patient education you supply, and prepares medication questions for your official references and pharmacist. It's not medical advice, and you should never paste PHI.

**Will job-seeker-augmentor pad my resume?**
No. It only uses experience you provide, marks missing metrics `[DATA NEEDED]`, and `resume-truth-checker` flags anything unsupported.

**Will parent-caregiver-augmentor do my kid's homework?**
No. `homework-coach` gives questions, hints, and parallel examples, and checks your child's own work.

**Will designer-augmentor design my screens for me?**
No. It writes briefs with you, critiques designs, checks accessibility, and proposes token structures. Taste and final decisions are yours, and its accessibility checks are review aids, not a conformance certificate.

**Will engineer-augmentor change my code?**
It explains, audits, and plans; you make and review the changes. Its agents are read-only, it never deletes or weakens tests to go green, and it never asks you to paste real secrets.

**Will consultant-augmentor make up numbers for my business case?**
No. ROI models, scopes, and surveys use only the inputs you supply, with every formula shown. Missing figures are `[DATA NEEDED]` and unsourced benchmarks are `[CHECK: source]`.

**Why does output contain `[DATA NEEDED]` or `[TESTIMONIAL NEEDED]`?**
The packs don't invent facts, figures, or social proof. Fill in each placeholder with real information, or delete it.

**Do I need an API key?**
No. The augmentor packs run inside Claude Code and need no extra keys or services.

**Can I install just one pack?**
Yes. Each pack installs separately: `/plugin install <name>@augmentor-packs`.

**`Krosebrook/augmentor-packs` won't add. What now?**
Check your network and GitHub access, or use a local path install. See [installation](installation.md#local-path-install).

**How do I get updates?**
Auto-update is off by default for this marketplace. Run `/plugin marketplace update augmentor-packs`, or enable auto-update in `/plugin` → Marketplaces.

**Is any of this legal, tax, HR, medical, benefits, or investment advice?**
No. Take those questions to qualified professionals.

**How do I add a skill?**
See [contributing](contributing.md).

[← Back to docs index](index.md)
