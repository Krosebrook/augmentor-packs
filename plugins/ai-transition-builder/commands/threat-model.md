---
description: Threat-model an LLM app or agent against the OWASP Top 10 for LLM Applications
argument-hint: "[path to project or architecture description]"
---

Threat-model this AI system: $ARGUMENTS

Use the ai-app-security skill. Map inputs/tools/outputs and trust levels (ask me for anything you can't infer), walk each OWASP LLM Top 10 (2025) category, and output the threat table plus the top 3 fixes before shipping. If code is available, cite file:line for each finding. Delegate a deep code pass to the `llm-app-security-auditor` agent if the codebase is large.
