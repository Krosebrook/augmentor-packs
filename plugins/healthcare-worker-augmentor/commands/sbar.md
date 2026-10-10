---
description: "Turn de-identified notes into an SBAR or handoff report with a gap check and a 30-second spoken version"
argument-hint: "[de-identified bullets, unit format if not SBAR]"
---

Structure this into a handoff: $ARGUMENTS

Follow the sbar-handoff skill. First scan for identifiers (names, DOB, MRN, room, exact dates); if any are present, stop and ask me to remove them. Use only the data I gave. Output the SBAR (or my unit's format if I named one), a gap check written as questions, and a 30-second spoken version. Mark any missing request as `[CONFIRM]`. This is a communication aid, not clinical advice.
