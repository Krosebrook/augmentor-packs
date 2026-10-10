---
name: script-red-team
description: "Use when the user writes or reviews a Bash or PowerShell script, automation job, or one-liner that will run on real systems. Adversarially reviews for safety: quoting, error handling, idempotency, destructive operations, secrets handling, privilege, and portability, with a dry-run plan. Reviews and suggests; the user runs it."
---

# Script Red Team (Bash / PowerShell)

## Bash checks
- `set -euo pipefail` (and understand its gaps); quote every expansion; `"$@"` not `$*`; `--` before user-supplied paths.
- Guard destructive commands: never `rm -rf "$VAR/"` with a possibly empty var (use `${VAR:?}`); confirm targets; prefer moving to a trash path.
- Temp files via `mktemp` with `trap` cleanup. No parsing of `ls`. Handle spaces and newlines in filenames.
- Run `shellcheck` and fix warnings.

## PowerShell checks
- `Set-StrictMode -Version Latest`, `$ErrorActionPreference = 'Stop'`, `try/catch` with meaningful errors.
- `-WhatIf` / `SupportsShouldProcess` for changes; parameter validation attributes; no aliases in scripts.
- Run PSScriptAnalyzer.

## Both
- **Idempotent:** safe to run twice. **Observable:** logs what it changes. **Least privilege:** elevate only where needed.
- **Secrets:** never hard-coded or echoed; read from env or a secret store; mask in logs.
- **Dry run:** describe how to test on a non-production target first.

## Output
Findings as `line → risk → worst case → fix`, then a corrected snippet for the top issues, then the dry-run plan.
