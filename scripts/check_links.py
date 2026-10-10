#!/usr/bin/env python3
"""Check that relative Markdown links (and #anchors) resolve. External http(s)/mailto links are skipped."""
import re, sys
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
LINK = re.compile(r"(?<!!)\[[^\]]*\]\(([^)\s]+)\)")
def slug(h):
    h = re.sub(r"[`*_]", "", h.strip().lower())
    return re.sub(r"\s", "-", re.sub(r"[^\w\s-]", "", h))
def anchors(p):
    out, fence = set(), False
    for l in p.read_text().splitlines():
        if l.startswith("```"): fence = not fence
        elif not fence and l.startswith("#"): out.add(slug(l.lstrip("#")))
    return out
bad = n = 0
for md in sorted(ROOT.rglob("*.md")):
    if ".git" in md.parts: continue
    text = re.sub(r"```.*?```", "", md.read_text(), flags=re.S)
    for t in LINK.findall(text):
        if re.match(r"^(https?:|mailto:)", t): continue
        n += 1
        path, _, frag = t.partition("#")
        dest = (md.parent / path).resolve() if path else md
        if not dest.exists():
            print(f"BROKEN {md.relative_to(ROOT)}: {t}"); bad += 1
        elif frag and dest.is_file() and dest.suffix == ".md" and frag not in anchors(dest):
            print(f"BAD ANCHOR {md.relative_to(ROOT)}: {t}"); bad += 1
print(f"checked {n} relative links; {bad} broken")
sys.exit(1 if bad else 0)
