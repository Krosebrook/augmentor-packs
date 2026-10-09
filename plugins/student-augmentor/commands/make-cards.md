---
description: Turn your notes into high-quality flashcards in Anki-importable format
argument-hint: "[path to notes or pasted notes]"
---

Make flashcards from: $ARGUMENTS

Follow the active-recall-coach card rules: one idea per card, prefer "why/how/difference" prompts, use cloze for definitions and formulas, and source only from my notes (mark anything you add as `[added — verify]`).

Output:
1. A markdown preview table of the cards.
2. The same cards as tab-separated lines `front<TAB>back<TAB>tags` in a code block. If I gave a file path, also write them to `<notes-name>.cards.tsv` next to the notes.
3. One line on how to import into Anki (File → Import, separator: Tab).
