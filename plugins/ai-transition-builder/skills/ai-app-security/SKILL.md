---
name: ai-app-security
description: Use when the user is building or reviewing an application that uses LLMs and needs to think about security, safety, or abuse — prompt injection, data leakage, tool permissions, untrusted documents, cost abuse, content risks. Runs a structured threat model referencing the OWASP Top 10 for LLM Applications.
---

# Security & Safety for AI Apps

Core principle: **the model is not a security boundary.** Anything the model can read can try to instruct it; anything the model can do, an attacker who controls its input may be able to make it do.

## Threat model in 5 steps
1. **Map the system:** inputs (user text, files, web pages, emails, retrieved docs, tool results), the model calls, tools/actions with side effects, data stores, outputs (UI rendering, code execution, emails sent).
2. **Mark trust levels:** which inputs can a third party influence? (Usually: anything not written by you.)
3. **Walk the OWASP Top 10 for LLM Applications (2025):** Prompt Injection · Sensitive Information Disclosure · Supply Chain · Data and Model Poisoning · Improper Output Handling · Excessive Agency · System Prompt Leakage · Vector and Embedding Weaknesses · Misinformation · Unbounded Consumption. For each: does it apply here, how, and severity. Check the OWASP GenAI Security Project site for the current version.
4. **Mitigate** (below).
5. **Test:** add adversarial cases to the eval set (see `ai-evals`).

## Mitigations that actually work (defense in depth)
- **Least privilege for tools:** read-only by default; scoped credentials per user; no tool that can do more than the feature needs.
- **Human confirmation** for irreversible or external actions (send, pay, delete, post, execute).
- **Don't combine** untrusted input + access to private data + an exfiltration channel (e.g., rendering arbitrary URLs/images, sending messages) in one agent without strong controls.
- **Treat model output as untrusted:** escape before rendering HTML/Markdown, never pass to `eval`/shell/SQL unparameterized, validate against a schema.
- **Access control outside the model:** enforce document and data permissions in code at retrieval/tool time; never rely on "the system prompt says not to reveal X". Assume the system prompt can leak — keep secrets out of it.
- **Rate limits and budgets** per user; max tokens; max agent iterations.
- **Logging & monitoring** of prompts, tool calls, and anomalies, with personal data handled per your privacy obligations.
- **Supply chain:** pin dependencies, verify model/package sources.
- **Misinformation:** citations, "I don't know" paths, and UI that signals AI-generated content where users may over-rely on it.

## Output
Threat table: `component | threat (OWASP category) | scenario | likelihood | impact | mitigation | status`, plus the top 3 fixes to make before shipping.
