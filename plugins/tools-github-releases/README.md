# tools-github-releases

Optional MCP tool add-on: list GitHub releases, read the latest release notes, and build a changelog between two tags via api.github.com. No key required; an optional GITHUB_TOKEN from your environment raises rate limits.

**This is an optional tool add-on, not an augmentor pack.** It runs a small local Node.js process (MCP stdio server, zero npm dependencies) and makes outbound HTTPS requests. The augmentor packs work fine without it.

## Install
```
/plugin marketplace add <path-to-claude-packs-or-Krosebrook/augmentor-packs>
/plugin install tools-github-releases@augmentor-packs
```
Requires Node.js 18+ on your PATH. Check it connected with `/mcp` (server name `github-releases`).

## What it provides
- MCP server `github-releases` (declared in [`.mcp.json`](.mcp.json), launched as `node ${CLAUDE_PLUGIN_ROOT}/server.mjs`)
- Skill: `release-notes` — tells Claude when to use the tools and to report data only as returned

### Tools
- `github_list_releases` — List recent releases of a GitHub repository (newest first).
- `github_latest_release` — Get the latest published (non-prerelease) release of a repository with its notes.
- `github_changelog_between` — Changelog between two tags/refs: commits, referenced PR numbers, and release notes published in between.

## Network access
Calls only: `api.github.com`. No telemetry, no writes, no data stored on disk.

## Configuration (optional token)
Works without credentials (GitHub allows 60 unauthenticated requests/hour per IP). For higher limits or private repos, **export `GITHUB_TOKEN` in the shell that launches Claude Code** — e.g. a fine-grained token with read-only *Contents* access. `.mcp.json` passes it through as `${GITHUB_TOKEN:-}` (empty if unset), and the server redacts the token from any error text.

Never put a token in this repo, in `.mcp.json`, or in a commit.

## Pairs well with
ai-transition-builder (upgrades, release notes).

## Principles
Tools return data with its source; the skill instructs Claude never to invent or "fill in" values and to report tool errors plainly.
