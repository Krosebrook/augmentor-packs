---
name: quote-estimate-builder
description: "Use when the user wants to build or check a quote/estimate/bid — labor hours, material takeoff, markup, overhead, permit fees, tax, options (good/better/best), and payment terms. Uses only the user's rates and prices, shows all math, and marks any missing number. Produces a customer-facing quote and an internal worksheet."
---

# Quote / Estimate Builder

## Code & safety boundaries
- Codes vary by jurisdiction and adopted edition (NEC, IPC/UPC, IMC/UMC, IRC, IECC, local amendments). **The Authority Having Jurisdiction (AHJ) and the locally adopted code govern.** Never quote a code section number, table value, or requirement from memory as fact — mark it `[verify: adopted code edition / AHJ]`.
- This pack does not replace licensed judgment, manufacturer installation instructions, permits, or inspections.
- Never invent prices, labor rates, material costs, or permit fees. Use the user's numbers; mark gaps `[DATA NEEDED]`.

## Inputs (ask for what's missing, in one short list)
Labor rate(s) and estimated hours per task, crew size, material list with unit costs, markup or margin target (ask which — they're different), overhead/trip charge, permit fees, disposal, tax rules (which items are taxable in their jurisdiction `[verify: local tax rules]`), deposit and payment terms, quote validity period.

## Build
1. **Internal worksheet** (table): line item, qty, unit cost, extended cost, markup, sell price. Show the formulas. Distinguish markup (cost × (1+m)) from margin (cost ÷ (1−m)) and state which was used.
2. Sanity checks: hours vs. scope tasks, missing common items (fittings, wire nuts, breakers, sealants, consumables), contingency line if the user wants one.
3. **Good / Better / Best** options when helpful, each with clear differences.
4. **Customer-facing quote:** scope summary, price (lump sum or itemized — user's choice), inclusions/exclusions, assumptions, change-order language, validity date, deposit/terms, warranty **only as the user specifies** `[CONFIRM: warranty terms]`.

## Never
Invent prices, rates, fees, or "typical" costs. If asked for market pricing, explain how to gather it (supplier quotes, past invoices, local trade association) and leave `[DATA NEEDED]`.
