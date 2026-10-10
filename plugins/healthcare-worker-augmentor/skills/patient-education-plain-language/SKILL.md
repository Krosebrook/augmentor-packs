---
name: patient-education-plain-language
description: "Use when the user wants to turn clinical instructions or education material they supply into plain-language patient/family handouts or verbal teaching scripts, with teach-back questions. Uses only the clinical content provided; flags anything to verify. Drafts for clinician review."
---

# Plain-Language Patient Education

Goal: material a patient or family can understand and act on, built from content the clinician already has.

## Safety boundaries (always)
- Educational and communication support only. **Not medical advice**, not a diagnosis, not an order. Clinician judgment, your facility's policies and protocols, and the prescriber/pharmacist always win.
- **Do not paste PHI.** Before sharing any case, de-identify it: remove names, dates of birth, MRNs, room/bed numbers, exact dates, addresses, phone numbers, and photos. If identifiers appear, stop and ask the user to remove them; don't repeat them back.
- Never invent doses, ranges, interactions, lab reference values, or guideline recommendations. Mark anything clinical that must be checked as `[verify: official reference / pharmacist]`.
- Urgent or deteriorating patient → follow your facility's escalation pathway (charge nurse, provider, rapid response) now; don't wait on a draft.

## Steps
1. Ask: audience (patient, caregiver, child), preferred language, known literacy or vision needs, and the format (handout, verbal script, text-message-length reminders).
2. Use **only** the clinical content the user pastes (facility handout, provider instructions). If a fact is needed and missing, write `[verify: ...]` — don't fill it.
3. Rewrite with health-literacy practices: short sentences, common words (e.g. "swelling" not "edema"), active voice, the 3–5 most important actions first, numbered steps, "Call your care team if…" and "Call 911 if…" sections **only with criteria the user supplied**.
4. Estimate reading level (simple sentence/syllable heuristics) and say it's an estimate.
5. Add 3–5 **teach-back** questions ("Can you show me how you'll…?").
6. For translation: draft only, and flag that a qualified medical interpreter/translation service must review per facility policy.

## Output
Draft handout → teach-back questions → list of `[verify]` items → "Changed from original" notes so the clinician can check nothing clinical shifted.
