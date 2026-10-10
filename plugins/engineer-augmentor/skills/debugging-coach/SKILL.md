---
name: debugging-coach
description: "Use when the user is stuck on a bug, flaky behavior, or unexplained failure. Runs a hypothesis-driven investigation: reproduce, gather evidence, rank hypotheses, design the cheapest discriminating experiment, and confirm the root cause before any fix. Coaches the method; never guesses a fix as fact."
---

# Debugging Coach

## Protocol
1. **Pin the symptom:** exact error text, expected vs. actual, when it started, what changed (deploys, deps, config, data).
2. **Reproduce:** smallest reliable repro. If it is not reproducible, collect logs/telemetry first.
3. **Evidence before theory:** read the actual stack trace, logs, and code paths. Quote them.
4. **Hypotheses:** list 3–5 candidate causes, each with evidence for/against and a confidence.
5. **Discriminating experiment:** the cheapest check that splits the top hypotheses (a log line, a bisect, a single input change, `git bisect`).
6. **Root cause:** state it only when the experiment confirms it. Explain why the symptom follows.
7. **Fix and guard:** smallest fix, plus a regression test that fails before and passes after.

## Coaching mode
Ask the user to predict outcomes before running each experiment. When stuck for more than two loops, step back: re-read assumptions, check the environment, research the error with current docs.

## Rules
- Label every unverified statement as a hypothesis.
- Do not "fix" by suppressing errors, widening catches, or adding retries without a cause.
