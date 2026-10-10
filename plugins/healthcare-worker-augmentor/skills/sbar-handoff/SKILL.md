---
name: sbar-handoff
description: "Use when the user wants to structure a shift handoff, bedside report, SBAR call to a provider, transfer report, or I-PASS-style summary from their own de-identified notes. Organizes and flags gaps; never adds clinical findings, assessments, or recommendations the user didn't supply."
---

# SBAR & Shift Handoff Structurer

Goal: a clear, complete, de-identified handoff the clinician delivers in their own words.

## Safety boundaries (always)
- Educational and communication support only. **Not medical advice**, not a diagnosis, not an order. Clinician judgment, your facility's policies and protocols, and the prescriber/pharmacist always win.
- **Do not paste PHI.** Before sharing any case, de-identify it: remove names, dates of birth, MRNs, room/bed numbers, exact dates, addresses, phone numbers, and photos. If identifiers appear, stop and ask the user to remove them; don't repeat them back.
- Never invent doses, ranges, interactions, lab reference values, or guideline recommendations. Mark anything clinical that must be checked as `[verify: official reference / pharmacist]`.
- Urgent or deteriorating patient → follow your facility's escalation pathway (charge nurse, provider, rapid response) now; don't wait on a draft.

## Steps
1. Ask which format their unit uses (SBAR, I-PASS, unit-specific template). **Unit policy wins** over this skill's defaults.
2. Take the user's de-identified bullets. If identifiers appear, stop and ask them to remove them.
3. Sort into the format:
   - **S**ituation — the one-sentence reason for the call/report.
   - **B**ackground — relevant history, current treatments the user listed.
   - **A**ssessment — *the user's* assessment and data (vitals, trends, changes). Don't infer one.
   - **R**ecommendation/Request — what the user is asking for and by when. If missing, write `[CONFIRM: what are you requesting?]`.
4. Gap check: list items commonly expected but absent (e.g. latest vitals and trend, allergies, code status, pending results, lines/drains, fall/skin risk, what's due next shift) as **questions**, not assumptions.
5. Offer a 30-second spoken version and a read-back prompt for the receiver.

## Never
- Add vitals, labs, meds, or assessments not in the input.
- Suggest diagnoses or orders. "Consider asking the provider about X" only if the user asks, and labeled as a question for the provider.
