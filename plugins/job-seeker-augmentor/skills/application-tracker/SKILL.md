---
name: application-tracker
description: "Use when the user wants to organize their job search — create or update an application tracker (CSV or Markdown) with company, role, date applied, status, contacts, next action, and follow-up dates; weekly pipeline review; conversion stats from their own data."
---

# Application Tracker

## Setup
Create `job-search/tracker.csv` (or the user's chosen path) with columns:
`company,role,link,date_found,date_applied,source,status,contact,next_action,next_action_date,salary_range_posted,notes`
Statuses: Researching → Applied → Screen → Interviewing → Offer → Accepted / Rejected / Withdrawn / Ghosted.

## Use
- Add/update rows from what the user tells you. Ask before overwriting.
- **This week:** list rows where `next_action_date` ≤ 7 days from today, overdue follow-ups, and stale applications (no update in 14+ days).
- **Weekly review:** counts by status and source, and conversion rates computed **only from the tracker's data** (say how many rows they're based on — small numbers are noisy).
- Suggest a sustainable weekly target the user chooses (e.g. applications, outreach, practice sessions) and track it.

No scraping of job boards; the user pastes links and details.
