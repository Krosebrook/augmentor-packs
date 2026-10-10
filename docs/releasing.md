# Releasing

## Versioning (semver)

Each plugin is versioned independently with [semver](https://semver.org/):

- **MAJOR:** removing or renaming a skill/command/agent, or a behavior change that breaks existing prompts or workflows.
- **MINOR:** a new skill, command, or agent, or a meaningful new capability.
- **PATCH:** wording fixes, better triggers, guardrail tightening, and doc fixes.

## Where versions live

Each plugin's version is written in **two places, and they must match**. `scripts/validate.py` fails on a mismatch.

1. `plugins/<pack>/.claude-plugin/plugin.json` → `"version"`
2. `.claude-plugin/marketplace.json` → that plugin's entry `"version"`

Bump both in the same commit.

## Changelog

`CHANGELOG.md` follows the [Keep a Changelog](https://keepachangelog.com/) format. Add entries under `## [Unreleased]` as you work. At release, rename that section to the version and date, grouped by pack.

## Release checklist

1. Bump versions (both files) for every changed pack.
2. Move `Unreleased` entries into a dated version section in `CHANGELOG.md`.
3. Run `claude plugin validate --strict .`, `python3 scripts/validate.py`, and `python3 scripts/check_links.py`. All must pass.
4. Commit: `git commit -m "Release vX.Y.Z"`.
5. Tag the repo: `git tag -a vX.Y.Z -m "vX.Y.Z"`. For releases that touch only one pack, an optional per-pack tag such as `student-augmentor-v1.1.0` is fine.
6. Push the commit and tags **only with the owner's approval**: `git push && git push --tags`.
7. Users can pin with `/plugin marketplace add Krosebrook/augmentor-packs#vX.Y.Z`. Because auto-update is off by default for this marketplace, mention in the release notes that users should run `/plugin marketplace update augmentor-packs`.

[← Back to docs index](index.md)
