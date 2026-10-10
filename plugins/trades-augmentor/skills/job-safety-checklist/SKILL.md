---
name: job-safety-checklist
description: "Use when the user wants a pre-job safety checklist, job hazard analysis (JHA/JSA), toolbox-talk outline, or lockout/tagout steps reminder for a specific task. Prompts hazards and controls to consider; supplements but never replaces the company safety program, OSHA requirements, manufacturer instructions, or a competent person's judgment."
---

# Job Safety Checklist / JHA

## Boundaries
A checklist generator, not a safety program. The user's company program, applicable OSHA standards `[verify: applicable OSHA standard]`, manufacturer instructions, and the site's competent person govern. If someone is in danger, stop work and follow emergency procedures.

## Build
1. Task breakdown: list job steps (from the user's description).
2. For each step, prompt hazards by category and ask which apply:
   - Electrical (energized work, LOTO, arc flash — follow the company's NFPA 70E program `[verify]`), stored energy (pressure, springs, capacitors)
   - Falls (ladders, roofs, lifts), struck-by/caught-between, cranes/rigging
   - Confined spaces, atmospheric hazards, combustion gases/CO, refrigerants
   - Hot work and fire watch; silica, asbestos, lead (stop and test if suspected)
   - Heat/cold stress, ergonomics, sharps, chemical exposure (SDS)
   - Public/occupant protection, traffic, pets
3. Controls in hierarchy order: eliminate → engineer → administrative → PPE.
4. Pre-start checks: permits on site, tools/GFCI/test equipment verified (live-dead-live on a known source), PPE, emergency plan and nearest hospital `[CONFIRM]`.
5. Output: one-page checklist + 5-minute toolbox-talk outline.

Never claim a checklist makes a job "compliant".
