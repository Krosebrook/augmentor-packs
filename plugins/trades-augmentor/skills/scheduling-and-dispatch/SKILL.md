---
name: scheduling-and-dispatch
description: "Use when the user wants to plan a day or week of jobs — sequencing, drive-time clustering, crew assignment, material pickups, inspection windows, and buffers for callbacks and emergencies. Uses the user's job list and estimates; flags conflicts rather than guessing durations."
---

# Scheduling & Dispatch

1. Inputs: job list with location area, estimated duration, crew/skill needed, materials ready (Y/N), customer time windows, inspection appointments, the user's working hours.
2. Constraints first: fixed appointments and inspections, then long jobs in the morning, cluster by area, material pickups on the way.
3. Buffers: protect time for callbacks/emergencies (ask how much — e.g. a daily slot), and realistic travel time (user's estimate).
4. Output: day-by-day table (time, job, crew, address area, materials/prep), plus a conflicts list (double bookings, missing materials, unconfirmed customer windows `[CONFIRM]`).
5. Customer confirmation drafts via `customer-communication` (user sends).
6. Weekly review prompt: estimated vs. actual hours per job to improve future estimates.
