---
name: llm-api-builder
description: Use when the user is writing code that calls an LLM API or SDK — chat/messages calls, streaming, tool/function calling, structured JSON output, retries, cost and token management. Guides them to build it themselves with production habits, and checks current provider docs instead of trusting memory for model names, parameters, or prices.
---

# Building with LLM APIs

## Ground rules
- **Verify against current docs.** Model IDs, parameters, rate limits, SDK method names, and prices change often. Before writing integration code, check the provider's official docs (or use a docs tool if available). Never hardcode a model name from memory without telling the user to confirm it.
- **Secrets:** API keys come from environment variables or a secrets manager — never committed, never in client-side/browser code, never pasted into prompts. Add `.env` to `.gitignore` on day one.
- **The user writes the code** when learning is the goal: you explain the shape, they type it, you review. If they just want it working, write it but explain each block.

## The minimal production-shaped call
Walk through building, in order:
1. **One call, hardcoded input**, print the raw response object. Learn its shape (content blocks, stop/finish reason, usage/token counts).
2. **Config:** model ID and max output tokens from config; the system prompt in its own file under version control.
3. **Errors:** handle rate-limit/overload and transient network errors with exponential backoff + jitter and a retry cap; fail loudly on auth and invalid-request errors (retrying won't fix them).
4. **Timeouts** on every call.
5. **Structured output:** when code consumes the output, request a schema (via the provider's structured-output/tool-calling feature if available), then **validate** it (e.g., Pydantic / Zod). On validation failure: one repair attempt, then error.
6. **Streaming** only if a human watches the output; it complicates error handling.
7. **Logging:** request ID, latency, token usage, and cost estimate per call. Redact personal data.
8. **Cost guardrails:** max tokens per call, per-user/per-day limits, and an alert threshold.

## Tool / function calling
- Define tools with precise names, descriptions that say when to use them, and strict input schemas.
- Your code executes tools — validate every argument the model produces as untrusted input.
- Loop: send → if tool call requested, run it → return result → repeat, with a max-iterations cap.

## Review checklist for their code
Key handling · timeouts · retry policy correct for error type · output validated · token/cost limits · no prompt built by naive string concatenation of untrusted input into instructions · tests that mock the API.
