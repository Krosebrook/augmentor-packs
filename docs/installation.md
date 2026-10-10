# Installation

These commands match the Claude Code plugin docs ([Install and manage plugins](https://code.claude.com/docs/en/discover-plugins), checked 2026-10-10). If the docs and this page ever disagree, follow the docs.

> The marketplace is hosted at [`Krosebrook/augmentor-packs`](https://github.com/Krosebrook/augmentor-packs). You can also use a [local path install](#local-path-install).

## 1. Add the marketplace

In a Claude Code session:

```
/plugin marketplace add Krosebrook/augmentor-packs
```

To pin a release tag, append `#ref`, e.g. `/plugin marketplace add Krosebrook/augmentor-packs#v1.1.0`. On success, Claude Code prints `Successfully added marketplace: augmentor-packs`.

From your shell: `claude plugin marketplace add Krosebrook/augmentor-packs`.

## 2. Install a pack

```
/plugin install student-augmentor@augmentor-packs
/plugin install office-augmentor@augmentor-packs
/plugin install ai-transition-builder@augmentor-packs
/plugin install educator-augmentor@augmentor-packs
/plugin install solo-founder-augmentor@augmentor-packs
```

In a session, `/plugin install` opens the plugin's details so you can choose a scope:

- **User:** all your projects
- **Project:** everyone in this repo, written to `.claude/settings.json`
- **Local:** you, in this repo only

From your shell, `claude plugin install <name>@augmentor-packs` installs at user scope by default. Add `--scope project` or `--scope local` to change that.

**One step (Claude Code v2.1.275+ in a session, v2.1.292+ in the shell):**

```
/plugin install student-augmentor --marketplace Krosebrook/augmentor-packs
```

If the summary says `Run /reload-plugins to apply.`, run `/reload-plugins` or start a new session.

**Confirm it works:** type `/` and look for entries like `/student-augmentor:socratic-tutor`, or run `claude plugin list` in your shell.

## Local path install

Point the marketplace at a directory containing `.claude-plugin/marketplace.json`. Start relative paths with `./` or `../`, because a bare `name/name` is read as a GitHub repo:

```
/plugin marketplace add ./claude-packs
/plugin marketplace add /absolute/path/to/claude-packs
/plugin install office-augmentor@augmentor-packs
```

**Plugin authors:** to try a single plugin for one session without installing it, start Claude Code with `claude --plugin-dir ./plugins/<pack>`.

## Update

Auto-update is **off by default** for third-party and local marketplaces like this one. You can turn it on under `/plugin` → **Marketplaces** tab → `augmentor-packs` → **Enable auto-update**.

To update manually:

| Action | Shell | Session |
|---|---|---|
| Refresh the marketplace listing | `claude plugin marketplace update augmentor-packs` | `/plugin marketplace update augmentor-packs` |
| Update one plugin | `claude plugin update <name>@augmentor-packs` | `/plugin` → Installed → Update now |
| Update all plugins from this marketplace | – | `/plugin` → Marketplaces → augmentor-packs → Update marketplace |

Running `claude plugin marketplace update` refreshes listings only. It leaves installed plugins at their current versions.

## Disable / uninstall

```
claude plugin disable <name>@augmentor-packs
claude plugin enable <name>@augmentor-packs
claude plugin uninstall <name>@augmentor-packs     # add --scope project if installed there
claude plugin marketplace remove augmentor-packs   # also uninstalls every plugin from it
```

Inside a session, use `/plugin uninstall`, `/plugin disable`, or the **Installed** tab in `/plugin`.

## Troubleshooting

| Symptom | Fix |
|---|---|
| `Krosebrook/augmentor-packs` can't be found or cloned | Check network/GitHub access, or use a local path. |
| A local path is treated as a GitHub repo | Prefix it with `./` or use an absolute path. |
| `plugin not found` on install | Use the marketplace *name* after `@` (`augmentor-packs`), not the repo path. Run `/plugin marketplace list` to check. |
| Commands don't appear after install | Run `/reload-plugins` (or `/reload-plugins --force`), or start a new session. |
| Plugin failed to load | Open the **Errors** tab in `/plugin`. Run `claude plugin validate .` from the repo root. |
| Old version after an update | Run `/plugin marketplace update augmentor-packs`, then update the plugin. Running sessions keep the version they loaded. |
| `/plugin` unavailable (`claude -p`, cloud sessions) | Install from your shell with `claude plugin …`. Cloud sessions don't load locally installed plugins. |

More: [Troubleshoot plugins](https://code.claude.com/docs/en/discover-plugins) in the Claude Code docs.

[← Back to docs index](index.md)
