# FAQ

**What's an "augmentor"?**
A plugin that coaches, checks, and speeds up *your* work instead of doing it for you. See [guardrails](guardrails.md).

**Will student-augmentor write my essay?**
No. It coaches your thesis, outline, and draft and gives feedback, but it doesn't ghostwrite graded work. Use `/student-augmentor:integrity-check` to see how a planned use fits your course's AI policy.

**Will educator-augmentor grade my students?**
No. It suggests feedback comments against your rubric. You review them and assign the grades.

**Can it send my emails or outreach?**
No. The packs have no MCP servers, hooks, or executables, so they can't send anything. You get drafts.

**Why does output contain `[DATA NEEDED]` or `[TESTIMONIAL NEEDED]`?**
The packs don't invent facts, figures, or social proof. Fill in each placeholder with real information, or delete it.

**Do I need an API key?**
No. The packs run inside Claude Code and need no extra keys or services.

**Can I install just one pack?**
Yes. Each pack installs separately: `/plugin install <name>@augmentor-packs`.

**Why isn't `Krosebrook/augmentor-packs` working?**
It hasn't been published yet. Use a local path install for now. See [installation](installation.md#local-path-install).

**How do I get updates?**
Auto-update is off by default for this marketplace. Run `/plugin marketplace update augmentor-packs`, or enable auto-update in `/plugin` → Marketplaces.

**Is any of this legal, tax, HR, medical, or investment advice?**
No. Take those questions to qualified professionals.

**How do I add a skill?**
See [contributing](contributing.md).

[← Back to docs index](index.md)
