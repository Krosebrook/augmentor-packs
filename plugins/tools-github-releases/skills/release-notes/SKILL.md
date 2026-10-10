---
name: release-notes
description: "Use when the user asks what changed in a GitHub project between versions, what the latest release of a repo is, or wants release notes/changelog before upgrading a dependency. Backed by the github-releases MCP tools."
---

# GitHub releases & changelogs

## When to use
Use when the user asks what changed in a GitHub project between versions, what the latest release of a repo is, or wants release notes/changelog before upgrading a dependency.

## Tools (MCP server `github-releases`)
- `github_list_releases` — List recent releases of a GitHub repository (newest first).
- `github_latest_release` — Get the latest published (non-prerelease) release of a repository with its notes.
- `github_changelog_between` — Changelog between two tags/refs: commits, referenced PR numbers, and release notes published in between.

## Rules
- Call the tools for every factual answer; never invent, estimate or "fill in" API data. If a field is null, say it is unknown.
- If a tool returns `isError`, report the error message plainly and suggest the fix; do not fabricate a fallback answer.
- Mention the data source and the timestamp/date returned by the tool when presenting results.
- Works without credentials; `GITHUB_TOKEN` is optional.
- Without GITHUB_TOKEN GitHub allows 60 requests/hour per IP; set a token for private repos or higher limits.
