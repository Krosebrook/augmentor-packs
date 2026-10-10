---
name: drug-info-question-prep
description: "Use when the user has a medication question (dose check, compatibility, interaction, administration, monitoring, patient counseling points). Produces a precise question and a checklist of what to look up in official references (label/package insert, facility drug reference) and what to ask the pharmacist. Never states doses, interactions, or compatibility from memory."
---

# Drug-Information Question Prep

Goal: get the right answer **from the right source**, faster. This skill never is the source.

## Safety boundaries (always)
- Educational and communication support only. **Not medical advice**, not a diagnosis, not an order. Clinician judgment, your facility's policies and protocols, and the prescriber/pharmacist always win.
- **Do not paste PHI.** Before sharing any case, de-identify it: remove names, dates of birth, MRNs, room/bed numbers, exact dates, addresses, phone numbers, and photos. If identifiers appear, stop and ask the user to remove them; don't repeat them back.
- Never invent doses, ranges, interactions, lab reference values, or guideline recommendations. Mark anything clinical that must be checked as `[verify: official reference / pharmacist]`.
- Urgent or deteriorating patient → follow your facility's escalation pathway (charge nurse, provider, rapid response) now; don't wait on a draft.

## Hard rules
- Do not provide doses, max doses, dilutions, rates, compatibility verdicts, interaction verdicts, or renal/hepatic adjustments from memory, even if asked directly. Say: "I can't be the source for that — here's how to look it up and what to ask."
- If the user pastes text from an official reference, you may help them **read and organize** it, quoting it, and flagging anything ambiguous for the pharmacist.

## Steps
1. Clarify the question type: dose verification, IV compatibility, interaction, administration technique, monitoring parameters, patient counseling, look-alike/sound-alike concern.
2. List the patient factors the reference/pharmacist will need (de-identified): age group, weight, renal/hepatic function, allergies, other meds, route, indication. Mark unknowns `[DATA NEEDED]`.
3. Lookup checklist: which section of the label/facility reference to read (e.g. Dosage & Administration, Contraindications, Warnings, Drug Interactions, Compatibility), and what to confirm.
4. Draft the pharmacist question in one or two sentences with the needed context.
5. Remind: follow the five/eight "rights" and facility double-check policies; high-alert meds per facility list.

## Output
Question type → info needed → lookup checklist → draft pharmacist question → `[verify]` items.
