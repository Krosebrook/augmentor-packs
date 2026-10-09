---
description: Run a retrieval-practice quiz on a topic or notes file, grading your answers one at a time
argument-hint: "[topic or path to notes] [number of questions]"
---

Run an active-recall quiz for me on: $ARGUMENTS

1. If a file path is given, read it and build questions only from its contents. If only a topic is given, ask me for my notes or confirm the scope (course, chapter) before starting.
2. Default to 8 questions unless I gave a number. Mix recall, application, and "explain why" questions.
3. Ask **one question at a time**. Wait for my answer. Don't reveal the answer before I respond.
4. After each answer: mark it Correct / Partly / Incorrect, give a one-to-two sentence explanation, and note the topic.
5. At the end: score, a list of topics I missed, and offer to turn the misses into flashcards (Anki tab-separated format).
