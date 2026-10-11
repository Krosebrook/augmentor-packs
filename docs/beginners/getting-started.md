# Getting started (new to AI? start here)

This page assumes you've never used Claude Code, never installed a plugin, and maybe never opened a terminal. That's fine. Go one step at a time. Each step says what you should see.

The install steps below were checked against the official Claude Code docs on 2026-10-10: [Advanced setup](https://code.claude.com/docs/en/setup) and [Install and manage plugins](https://code.claude.com/docs/en/discover-plugins). Claude Code changes often. **If the official docs and this page disagree, follow the official docs.**

## 1. What is Claude Code?

- **Claude** is an AI assistant made by Anthropic. You type questions or requests in plain language, and it writes back.
- **Claude Code** is a version of Claude that runs on your own computer. You can use it in a **terminal** (a text window where you type commands), in the **desktop app**, or inside a code editor such as VS Code. It can read files you allow it to read, which makes it useful for documents, notes, and spreadsheets, not just code.
- **What it's good at:** drafting, explaining, organizing, brainstorming, and checking your work.
- **What to watch for:** it can sound confident and still be wrong. Always check names, numbers, dates, and links before you rely on them. See [glossary: hallucination](glossary.md#hallucination).

## 2. What are plugins and marketplaces?

- A **plugin** is an add-on that gives Claude Code new know-how. Think of an app on your phone.
- A **marketplace** is a list of plugins you can install from. Think of a shelf in an app store.
- **Augmentor Packs** (`augmentor-packs`) is one marketplace. Each plugin in it is a "pack" for a kind of person (students, office workers, parents, tradespeople, and more). Every pack coaches and checks *your* work. None of them send messages or act for you.

## 3. What you need

- A computer running a recent macOS, Windows 10 or later, or a common Linux (the official page lists exact versions), with an internet connection.
- A paid Claude account: Pro, Max, Team, Enterprise, or a Console account. The official docs say the **free claude.ai plan does not include Claude Code**. `[CHECK: current plans on claude.com before you pay]`
- About 15 minutes.

## 4. Install Claude Code

**Prefer not to use a terminal?** The official docs offer a **Desktop app** for macOS, Windows, and Linux. Download it from the link on the [setup page](https://code.claude.com/docs/en/setup), then skip to step 5. Plugins work in the desktop app's local sessions too (see step 7).

**Using the terminal:**

1. Open a terminal.
   - **Mac:** press Cmd+Space, type `Terminal`, press Enter.
   - **Windows:** press the Windows key, type `PowerShell`, press Enter.
   - New to terminals? The official docs have a terminal guide linked from the setup page.
2. Copy the line for your computer, paste it into the terminal, and press Enter.

   Mac, Linux, or WSL:
   ```bash
   curl -fsSL https://claude.ai/install.sh | bash
   ```
   Windows PowerShell:
   ```powershell
   irm https://claude.ai/install.ps1 | iex
   ```
   *What you'll see (described):* nothing much for a while. The official docs say the installer shows no progress while it downloads. Wait for your prompt to come back.
3. **Close the terminal and open a new one.** Then type:
   ```bash
   claude --version
   ```
   *What you'll see:* a version number followed by `(Claude Code)`. If it says `command not found` or "not recognized", see [troubleshooting](troubleshooting-for-beginners.md#claude-command-not-found).

## 5. Start Claude Code and log in

1. In the terminal, move into a folder you want to work in (or just stay where you are), then type:
   ```bash
   claude
   ```
2. *What you'll see (described):* Claude Code opens inside the terminal window. The first time, it asks you to log in and opens a page in your web browser. Sign in with your Claude account and come back to the terminal.
3. It may ask whether you trust the files in the current folder. Only say yes for folders you're comfortable letting it read.
4. *What you'll see when ready:* a text box at the bottom where you can type. Try typing `hello` and pressing Enter.

## 6. Add the Augmentor Packs marketplace

In the Claude Code text box (not a normal terminal prompt), type exactly:

```
/plugin marketplace add Krosebrook/augmentor-packs
```

*What you'll see:* a message like `Successfully added marketplace: augmentor-packs`. You only do this once per computer.

## 7. Install your first pack

We suggest starting with the beginner pack:

```
/plugin install ai-beginner-augmentor@augmentor-packs
```

*What you'll see (described):* this doesn't install right away. It opens a plugin details panel showing what the plugin adds (skills, commands, agents). Read it, then pick a **scope**:

- **Install for you (user scope):** works in every folder on this computer. **Pick this one if you're unsure.**
- Install for all collaborators on this repository (project scope): for shared projects.
- Install for you, in this repo only (local scope).

Then read the last line of the summary:

- `Plugin is now active.` You're done.
- `Run /reload-plugins to apply.` Type `/reload-plugins` and press Enter (Claude Code may do it for you).

**In the desktop app:** click the **+** next to the prompt box, choose **Plugins**, then **Add plugin**, find `ai-beginner-augmentor`, and choose a scope. (The marketplace must be added first; if you don't see it, run the step 6 command in the prompt box.) `[CHECK: the desktop app's menus may have moved; see the official plugins page]`

**From your terminal instead (without opening a session):**

```bash
claude plugin marketplace add Krosebrook/augmentor-packs
claude plugin install ai-beginner-augmentor@augmentor-packs
```

## 8. Check it worked

Type `/` in the Claude Code text box. *What you'll see:* a list of commands. Look for entries starting with `/ai-beginner-augmentor:` such as `/ai-beginner-augmentor:start`. You can also run `claude plugin list` in a normal terminal.

Then type:

```
/ai-beginner-augmentor:start
```

Next: [your first 10 minutes](first-10-minutes.md).

## Want a different pack?

Run `/ai-beginner-augmentor:which-pack`, or see the [pack table with levels](../index.md#pack-comparison). Install any pack the same way: `/plugin install <pack-name>@augmentor-packs`.

## Getting updates

Updates are **off by default** for this marketplace. To get new versions, type `/plugin marketplace update augmentor-packs`. More in [installation](../installation.md#update).

---
[Glossary](glossary.md) · [Troubleshooting](troubleshooting-for-beginners.md) · [← Back to docs index](../index.md)
