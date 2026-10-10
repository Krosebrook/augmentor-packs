---
name: motion-interaction-review
description: "Use when the user is designing or reviewing animations, transitions, scroll effects, parallax, hover/press states, or microinteractions. Checks purpose, timing, easing, performance (compositor-only properties), and reduced-motion handling, and proposes concrete values."
---

# Motion & Interaction Review

## Purpose check
Every motion should do a job: show continuity, give feedback, direct attention, or express brand. Decorative motion that delays the task is cut or shortened.

## Timing and easing defaults (adjust to taste)
- Micro feedback (press, toggle): 100–150 ms. Small transitions: 150–250 ms. Larger surfaces/page transitions: 250–400 ms.
- Enter with ease-out, exit with ease-in, move with ease-in-out. Avoid linear except for continuous loops.

## Performance
- Animate `transform` and `opacity`; avoid animating layout properties (`width`, `top`, `margin`).
- Scroll effects: prefer CSS scroll-driven animations or IntersectionObserver over scroll listeners; throttle with requestAnimationFrame if a listener is unavoidable.
- Test on a low-end device profile.

## Accessibility
- Provide a `prefers-reduced-motion` path: replace movement with fades or remove it.
- Parallax and large-scale motion can trigger vestibular issues; keep it optional or subtle.
- Nothing flashes more than 3 times per second. Auto-playing motion longer than 5 seconds needs a pause control.

## Output
Per interaction: purpose, current spec, issues, proposed spec (duration, easing, properties, reduced-motion behavior).
