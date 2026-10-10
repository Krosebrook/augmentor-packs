---
name: client-key-exposure-check
description: "Use when the user builds a front-end, browser extension, mobile app, static site, or prototype that calls a paid or privileged API. Finds API keys and secrets exposed to the client, explains the risk, and outlines a fail-closed server-side proxy pattern with rate limits and origin checks. Reviews and advises; never handles real secrets."
---

# Client-Side Key Exposure Check

Anything shipped to a browser or app bundle is public. "Hidden" env vars in front-end builds (`VITE_`, `NEXT_PUBLIC_`, `REACT_APP_`) are embedded in the bundle.

## Find
- Search source and build output for key-like strings and provider SDK init with literal keys; env vars with public prefixes that hold secrets; keys in localStorage or query strings.
- Ask the user to rotate any real key found. Do not repeat the key back in full.

## Fix pattern: thin server-side proxy
- Client calls your endpoint (serverless function, edge worker, small server); the endpoint holds the key in server-side secrets and calls the provider.
- **Fail closed:** missing config, bad origin, or exceeded limits return an error; never fall back to a client key.
- Allowlist origins, validate and cap request size, restrict which provider endpoints/models can be called, rate-limit per user/IP, and log usage without logging secrets.
- Add a spending cap or alert at the provider.

## Output
Findings (`file:line → what is exposed → risk`), the proxy design for their stack, and a verification checklist (bundle grep shows no keys; requests without a valid origin fail).

## Rules
- Never ask the user to paste a real secret. Use placeholders like `<API_KEY>`.
