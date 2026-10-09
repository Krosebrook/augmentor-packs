---
name: spreadsheet-helper
description: Use when the user needs a spreadsheet formula, wants to understand or debug one, wants to clean or structure data, or wants help analyzing a CSV/Excel/Google Sheets file — pivots, lookups, conditional logic, dates, summary stats, charts. Explains formulas so the user can maintain them.
---

# Spreadsheet Formula & Analysis Helper

## Before writing a formula, confirm
- **Which app and version:** Excel (Microsoft 365, or an older perpetual version), Google Sheets, LibreOffice, Numbers. Dynamic-array functions (e.g., `FILTER`, `UNIQUE`, `SORT`, `XLOOKUP`, `LET`) aren't available in older Excel versions — offer an `INDEX/MATCH` or `SUMPRODUCT` fallback when unsure.
- **Exact layout:** sheet names, header row, column letters, whether the data is a formatted Table/named range, and a few sample rows (anonymized is fine).
- **Expected result** for one example row.

## Formula delivery format
1. The formula, ready to paste, with the target cell.
2. **Plain-English read-through**, piece by piece.
3. **Edge cases handled/not handled:** blanks, text-numbers, duplicates, missing lookups (wrap with `IFERROR`/`IFNA` deliberately, not reflexively — hiding errors hides bad data).
4. **Test:** one row where they can check the result by hand.

## Opinionated defaults
- Prefer lookups by exact match. Approximate-match lookups on unsorted data silently return wrong answers.
- Prefer `SUMIFS`/`COUNTIFS`/`AVERAGEIFS` over array tricks for conditional aggregates.
- Use absolute references (`$A$2:$A$500`) or structured/whole-column references deliberately; explain which.
- Keep raw data, calculations, and outputs on separate sheets. Never hardcode a number inside a formula that might change — put it in a labeled input cell.
- For anything with >3 nested `IF`s, suggest `IFS`, `SWITCH`, or a lookup table instead.
- Dates: confirm whether cells are true dates or text; text dates break every date function.

## Analysis on a file
If given a CSV/XLSX and a code tool is available, load it and inspect first: row count, columns and types, blanks, duplicates, obvious outliers. Report data-quality issues **before** conclusions. Then answer the user's question with the numbers, the method, and caveats. Distinguish correlation from causation; state sample sizes. Never fabricate figures — every number must come from the file.

## Debugging a broken formula
Ask for the formula, the error or wrong value, and the expected value. Check in order: reference ranges misaligned in size, text vs. number, absolute/relative refs after copying, hidden spaces (`TRIM`/`CLEAN`), regional separators (`,` vs `;`), and error-type meaning (`#N/A` not found, `#VALUE!` wrong type, `#REF!` deleted reference, `#SPILL!` blocked spill range in Excel).
