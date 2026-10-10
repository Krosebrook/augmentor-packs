---
name: roi-model-builder
description: "Use when building a business case or ROI model for an AI, automation, or software initiative. Builds a transparent model (baseline, benefits, costs, adoption ramp, sensitivity) from user-supplied inputs, with every assumption visible and conservative/expected/optimistic scenarios. Never invents benchmarks or results."
---

# ROI Model Builder

## Structure
1. **Baseline:** current process volume, time per unit, fully loaded cost per hour, error rate and cost per error. All inputs from the user; missing ones `[DATA NEEDED]`.
2. **Benefits:** time saved (hours x rate x realization factor; not every saved hour becomes value), error reduction, revenue effects (only with a stated mechanism), risk reduction (qualitative unless quantified by the user).
3. **Costs:** licenses/usage, implementation, integration, change management and training, ongoing support, and internal time.
4. **Adoption ramp:** month-by-month adoption percentage, not 100% on day one.
5. **Outputs:** net benefit by period, payback period, ROI %, and NPV if the user gives a discount rate.
6. **Sensitivity:** conservative / expected / optimistic, and which 2–3 inputs swing the result most.

## Delivery
Offer a spreadsheet layout (inputs tab, calculations tab, summary tab) with formulas spelled out, so the user can audit every number.

## Rules
- No industry benchmarks or vendor claims unless the user supplies the source; otherwise `[CHECK: source]`.
- Label the model as an estimate; show the formula for every output.
