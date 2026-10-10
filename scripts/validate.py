#!/usr/bin/env python3
"""Offline structural checks for this marketplace, based on the documented schemas at
https://code.claude.com/docs/en/plugins/marketplace-reference and
https://code.claude.com/docs/en/plugins/manifest-reference.
`claude plugin validate` is authoritative; this script is a dependency-free backstop."""
import json, re, sys
from pathlib import Path

try:
    import yaml  # PyYAML, optional
except ImportError:
    yaml = None

ROOT = Path(__file__).resolve().parent.parent
NAME_RE = re.compile(r"^[A-Za-z0-9][A-Za-z0-9._-]*$")
KEBAB_RE = re.compile(r"^[a-z0-9]+(-[a-z0-9]+)*$")
errors, warnings, checked = [], [], 0

def err(m): errors.append(m)
def warn(m): warnings.append(m)

def load_json(p):
    try:
        return json.loads(p.read_text())
    except Exception as e:
        err(f"{p}: invalid JSON: {e}"); return None

def frontmatter(p):
    text = p.read_text()
    if not text.startswith("---\n"):
        err(f"{p}: frontmatter must start on line 1 with '---'"); return None, text
    end = text.find("\n---", 4)
    if end == -1:
        err(f"{p}: frontmatter not closed"); return None, text
    raw, body = text[4:end], text[end+4:]
    if yaml:
        try:
            fm = yaml.safe_load(raw)
        except Exception as e:
            err(f"{p}: YAML parse error: {e}"); return None, body
    else:  # minimal key: value parser
        fm = {}
        for line in raw.splitlines():
            if line.strip() and not line.startswith(" "):
                k, _, v = line.partition(":"); fm[k.strip()] = v.strip()
    if not isinstance(fm, dict):
        err(f"{p}: frontmatter is not a mapping"); return None, body
    if not body.strip():
        err(f"{p}: empty body")
    return fm, body

m = load_json(ROOT / ".claude-plugin/marketplace.json")
if m:
    for k in ("name", "owner", "plugins"):
        if k not in m: err(f"marketplace.json: missing required '{k}'")
    if not NAME_RE.match(m.get("name", "")) or ".." in m.get("name", ""):
        err("marketplace.json: invalid name")
    if not isinstance(m.get("owner"), dict) or not m["owner"].get("name"):
        err("marketplace.json: owner.name required")
    if "description" not in m: warn("marketplace.json: description missing")
    seen = set()
    for i, e in enumerate(m.get("plugins", [])):
        n = e.get("name", "")
        for k in ("name", "source"):
            if k not in e: err(f"plugins[{i}]: missing '{k}'")
        if not NAME_RE.match(n): err(f"plugins[{i}]: invalid name '{n}'")
        if n in seen: err(f"plugins[{i}]: duplicate name '{n}'")
        seen.add(n)
        src = e.get("source")
        if isinstance(src, str):
            if not src.startswith("./") or ".." in src: err(f"plugins[{i}]: relative source must start with ./ and not contain ..")
            pdir = (ROOT / src).resolve()
            if not pdir.is_dir(): err(f"plugins[{i}]: source dir missing: {src}"); continue
        else:
            continue
        for k in ("description", "version", "category", "keywords"):
            if k not in e: warn(f"plugins[{i}] {n}: '{k}' not set")
        pj = load_json(pdir / ".claude-plugin/plugin.json")
        if pj is None: continue
        checked += 1
        if pj.get("name") != n: err(f"{n}: plugin.json name '{pj.get('name')}' != entry name")
        if not KEBAB_RE.match(pj.get("name", "")): warn(f"{n}: name not kebab-case")
        if re.match(r"^(claude|anthropic|anthropics|cc-plugin)-", pj.get("name", "")): err(f"{n}: reserved name prefix")
        for k in ("version", "description", "author"):
            if k not in pj: warn(f"{n}: plugin.json missing '{k}'")
        if isinstance(pj.get("author"), dict) and not pj["author"].get("name"): err(f"{n}: author.name required")
        if pj.get("version") and e.get("version") and pj["version"] != e["version"]:
            err(f"{n}: version mismatch entry={e['version']} plugin.json={pj['version']}")
        skill_names = set()
        for sk in sorted((pdir / "skills").glob("*/SKILL.md")):
            fm, body = frontmatter(sk); checked += 1
            if fm is None: continue
            if not fm.get("description"): err(f"{sk}: missing description")
            if fm.get("name") and fm["name"] != sk.parent.name: warn(f"{sk}: name differs from directory")
            if not KEBAB_RE.match(str(fm.get("name", sk.parent.name))): err(f"{sk}: name not kebab-case")
            if len(str(fm.get("description", "")) + str(fm.get("when_to_use", ""))) > 1536: warn(f"{sk}: description+when_to_use > 1536 chars (truncated in listing)")
            skill_names.add(fm.get("name", sk.parent.name))
        for c in sorted((pdir / "commands").glob("*.md")):
            fm, body = frontmatter(c); checked += 1
            if fm is None: continue
            if not fm.get("description"): err(f"{c}: missing description")
            if "name" in fm: warn(f"{c}: command files don't support 'name'")
            if c.stem in skill_names: err(f"{c}: command name collides with skill '{c.stem}'")
        for a in sorted((pdir / "agents").glob("*.md")):
            fm, body = frontmatter(a); checked += 1
            if fm is None: continue
            for k in ("name", "description"):
                if not fm.get(k): err(f"{a}: agent missing required '{k}'")
            if ":" in str(fm.get("name", "")): err(f"{a}: agent name can't contain ':'")
            for k in ("permissionMode", "hooks", "mcpServers", "initialPrompt"):
                if k in fm: warn(f"{a}: '{k}' is ignored for plugin agents")
        has_mcp = (pdir / ".mcp.json").exists() or "mcpServers" in pj
        if has_mcp and not n.startswith("tools-"): err(f"{n}: augmentor packs must stay MCP-free (only tools-* plugins may declare MCP servers)")
        if n.startswith("tools-"):
            if not has_mcp: err(f"{n}: tools-* plugin declares no MCP server")
            mj = load_json(pdir / ".mcp.json") if (pdir / ".mcp.json").exists() else {"mcpServers": pj.get("mcpServers", {})}
            for sname, srv in (mj or {}).get("mcpServers", {}).items():
                if any("${CLAUDE_PLUGIN_ROOT}" not in a for a in srv.get("args", []) if a.endswith(".mjs")): err(f"{n}/{sname}: script path must use ${{CLAUDE_PLUGIN_ROOT}}")
                for ek, ev in srv.get("env", {}).items():
                    if not str(ev).startswith("${"): err(f"{n}/{sname}: env {ek} must be a ${{...}} reference, never a literal value")
                    for key in re.findall(r"\$\{user_config\.(\w+)\}", str(ev)):
                        if key not in pj.get("userConfig", {}): err(f"{n}/{sname}: user_config.{key} not declared")
        if not (pdir / "README.md").exists(): warn(f"{n}: README.md missing")

for w in warnings: print("WARN ", w)
for e in errors: print("ERROR", e)
print(f"checked {checked} files/manifests; {len(errors)} errors, {len(warnings)} warnings; yaml={'PyYAML' if yaml else 'fallback'}")
sys.exit(1 if errors else 0)
