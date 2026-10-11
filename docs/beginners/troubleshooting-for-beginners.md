# Troubleshooting for beginners

Something didn't work? That's normal. Find the closest match below. If nothing fits, the official [Claude Code docs](https://code.claude.com/docs/en/setup) have deeper troubleshooting pages, and you can ask Claude itself: "I got this message: ___. What does it mean?" (Don't paste passwords or keys.)

## The installer

### Nothing seems to happen after I paste the install command
The official docs say the installer shows no progress while it downloads. Wait a few minutes for your prompt to come back.

### `claude` command not found
You'll see something like `command not found: claude` or "'claude' is not recognized".
1. Close the terminal completely and open a new one, then try `claude --version` again.
2. Still failing? The install folder isn't on your PATH yet. Follow "Fix your PATH" on the official [setup page](https://code.claude.com/docs/en/setup).

### `The token '&&' is not a valid statement separator`
You're in PowerShell but pasted the CMD command. Use the PowerShell line: `irm https://claude.ai/install.ps1 | iex`.

### `'irm' is not recognized`
You're in Command Prompt (CMD), not PowerShell. Open PowerShell instead, or use the CMD command from the official setup page.

### It says I need a different plan
Claude Code needs a Pro, Max, Team, Enterprise, or Console account. The free claude.ai plan doesn't include it. `[CHECK: current plans on claude.com]`

## Adding the marketplace and installing

### I typed `/plugin …` in the terminal and got an error
`/plugin` commands go **inside** Claude Code (after you type `claude` and it opens). In a normal terminal, use `claude plugin marketplace add Krosebrook/augmentor-packs` instead.

### "Plugin not found" when installing
- Make sure you added the marketplace first: `/plugin marketplace add Krosebrook/augmentor-packs`.
- After the `@`, use the marketplace **name** `augmentor-packs`, not `Krosebrook/augmentor-packs`. Example: `/plugin install ai-beginner-augmentor@augmentor-packs`.
- Check spelling. Type `/plugin marketplace list` to see what's added.

### The marketplace won't add
Check your internet connection and that you can open github.com in a browser. Some work networks block it; ask your IT team.

### I installed it but the commands don't show up
Type `/reload-plugins` and press Enter, or close Claude Code and start it again with `claude`. Then type `/` and look for `/ai-beginner-augmentor:`.

### It says the plugin "couldn't be loaded"
Type `/plugin`, go to the **Errors** tab, and read the reason. Then open an issue (see below) with that message.

### I want to remove a pack
Type `/plugin`, go to the **Installed** tab, pick the pack, and choose **Uninstall**. Or in a normal terminal: `claude plugin uninstall <pack-name>@augmentor-packs`.

### I'm not getting the newest version
Updates are off by default for this marketplace. Type `/plugin marketplace update augmentor-packs`.

## Using Claude

### The answer was wrong or made something up
That happens; it's called a hallucination. Run `/ai-beginner-augmentor:check-this` on the answer, and check important facts in trusted sources.

### The answer missed what I meant
Run `/ai-beginner-augmentor:ask-better` with your question. Adding who it's for and what it should look like usually fixes it.

### I pasted something private by accident
Don't panic. Change any password or code you pasted. In the future, replace names and numbers with placeholders. See the privacy tips in [your first 10 minutes](first-10-minutes.md).

### It can't send my email or post for me
That's on purpose. These packs only draft; you review and send.

## Still stuck?

Open an issue at [Krosebrook/augmentor-packs](https://github.com/Krosebrook/augmentor-packs/issues) with what you typed and what you saw. Remove any personal details first.

---
[Getting started](getting-started.md) · [Glossary](glossary.md) · [← Back to docs index](../index.md)
