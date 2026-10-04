#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import os
import re
import subprocess
import textwrap
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BASE = ROOT / "artifacts/about-retranslation-2026-10-04"
SOURCE_ABOUT = ROOT / "docs/about/content/he.html"
SOURCE_MONSTER = ROOT / "docs/about/monster/index.html"
START = "<<<TRANSLATION_HTML>>>"
END = "<<<END_TRANSLATION_HTML>>>"
READ_TOOLS = "shell(cat:*),shell(grep:*),shell(rg:*),shell(sed:*),shell(head:*),shell(tail:*),shell(wc:*),shell(find:*),shell(ls:*),shell(pwd:*)"

class ShapeParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=False)
        self.events = []
        self.ids = []
        self.details = 0

    def attrs(self, attrs):
        kept = []
        for key, value in attrs:
            if key in {"id", "class", "data-toc-section", "data-toc-level"}:
                kept.append((key, value))
            if key == "id" and value is not None:
                self.ids.append(value)
        return tuple(sorted(kept))

    def handle_starttag(self, tag, attrs):
        if tag == "details":
            self.details += 1
        self.events.append(("start", tag, self.attrs(attrs)))

    def handle_startendtag(self, tag, attrs):
        self.events.append(("start", tag, self.attrs(attrs)))
        self.events.append(("end", tag, ()))

    def handle_endtag(self, tag):
        self.events.append(("end", tag, ()))

def shape(text: str) -> ShapeParser:
    p = ShapeParser()
    p.feed(text)
    p.close()
    return p

def run_copilot(prompt: str, out: Path, share: Path, timeout: int = 2400) -> int:
    cmd = [
        "copilot",
        "--no-custom-instructions",
        "--no-ask-user",
        "--no-color",
        "--allow-tool=" + READ_TOOLS,
        "--share=" + str(share),
        "-s",
    ]
    proc = subprocess.run(
        cmd,
        input=prompt,
        text=True,
        cwd=ROOT,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        timeout=timeout,
        env=os.environ.copy(),
    )
    out.write_text(proc.stdout, encoding="utf-8")
    out.with_suffix(out.suffix + ".stderr.log").write_text(proc.stderr, encoding="utf-8")
    return proc.returncode

def extract_translation(raw: str) -> str:
    a = raw.find(START)
    b = raw.find(END)
    if a < 0 or b < 0 or b <= a:
        raise ValueError("translation delimiters missing")
    value = raw[a + len(START):b].strip()
    if value.startswith("```html"):
        value = value[len("```html"):]
    elif value.startswith("```"):
        value = value[len("```"):]
    if value.endswith("```"):
        value = value[:-3]
    return value.strip() + "\n"

def exact_verdict(path: Path, token: str) -> str | None:
    acceptable = {f"{token}: PASS", f"{token}: FAIL"}
    lines = [x.strip() for x in path.read_text(encoding="utf-8", errors="replace").splitlines()]
    hits = [x for x in lines if x in acceptable]
    if len(hits) != 1:
        return None
    return hits[0].split(":", 1)[1].strip()

def normalize_about(text: str, code: str) -> str:
    text = text.replace('href="./monster/"', f'href="./monster/{code}.html"')
    text = text.replace("href='./monster/'", f"href='./monster/{code}.html'")
    return text

def normalize_monster(text: str, code: str, tag: str, direction: str) -> str:
    text = re.sub(r'<html\b[^>]*>', f'<html lang="{tag}" dir="{direction}">', text, count=1, flags=re.I)
    text = text.replace('href="../"', f'href="../?lang={code}"', 1)
    text = text.replace("href='../'", f"href='../?lang={code}'", 1)
    return text

def structural_errors(about: str, monster: str, code: str, tag: str, direction: str) -> list[str]:
    errors = []
    sa, ca = shape(SOURCE_ABOUT.read_text(encoding="utf-8")), shape(about)
    sm, cm = shape(SOURCE_MONSTER.read_text(encoding="utf-8")), shape(monster)
    if sa.events != ca.events:
        errors.append("About HTML structure differs from Hebrew source")
    if sa.ids != ca.ids:
        errors.append("About id sequence differs from Hebrew source")
    if ca.details != 64:
        errors.append(f"About expected 64 details elements, got {ca.details}")
    if sm.events != cm.events:
        errors.append("Monster HTML structure differs from Hebrew source")
    if sm.ids != cm.ids:
        errors.append("Monster id sequence differs from Hebrew source")
    if not re.search(rf'<html\s+lang="{re.escape(tag)}"\s+dir="{re.escape(direction)}">', monster, flags=re.I):
        errors.append("Monster lang/dir metadata is incorrect")
    if f'href="./monster/{code}.html"' not in about and f"href='./monster/{code}.html'" not in about:
        errors.append("About does not link to locale-specific monster page")
    if f'href="../?lang={code}"' not in monster and f"href='../?lang={code}'" not in monster:
        errors.append("Monster does not link back to same-locale About page")
    return errors

def page_translation_prompt(code: str, tag: str, direction: str, which: str, notes: str = "") -> str:
    source = "docs/about/content/he.html" if which == "about" else "docs/about/monster/index.html"
    locale = f"docs/i18n/locales/{code}.js"
    page_rules = """
For the About fragment:
- Output an HTML fragment, not a full document.
- Preserve exact tag structure, order, ids, classes, data-* attributes, code literals, formulas, numerical values, and all 64 details/summary disclosure structures.
- Translate every reader-facing string naturally.
- Use the established target-language visible forms for all 17 cutlet names and 47 month names from the locale file.
- Keep the source monster href exactly as ./monster/; the pipeline rewrites it after translation.
""" if which == "about" else """
For the Monster page:
- Output a complete HTML document with the same structural markup and id/class structure.
- Translate the title, intro, return link, every section, every joke, and the entire penguin appendix.
- Keep href="../" unchanged; the pipeline rewrites it after translation.
- Keep the html lang/dir attributes structurally present; the pipeline sets their final exact values.
"""
    return textwrap.dedent(f"""
You are creating a NEW, from-scratch translation of a public Hebrew page for BCP 47 locale {tag} (repository locale code {code}, direction {direction}).

Semantic source of truth:
- {source}

Read the complete Hebrew source file. Translate directly from Hebrew into natural, publication-quality {tag}. Do not use English or any other language as a semantic pivot. Do not search for, read, imitate, or repair an older About translation. The article was rebuilt and any older prose is obsolete.

You MAY read {locale} only for already-established target-language UI terminology and canonical localized forms of the 17 cutlet names and 47 month names. Those established name forms control. Preserve the source's dry satire, deliberate absurdity, intentionally unnecessary over-explanations, enthusiastic sales-pitch tone, and the arbitrary Spleen extension instead of rationalizing them.
{page_rules}
{notes}

Return ONLY:
{START}
[translated HTML]
{END}
No preface, no analysis, no Markdown fence, no translator notes.
""").strip() + "\n"

NATIVE_PROTOCOL_EN = r"""
You are an independent native-language linguistic reviewer for BCP 47 locale {{TAG}}. Conduct the entire review and final report only in the natural language of {{TAG}}. Another language may appear only when quoting unintended leakage or an immutable proper name, identifier, path, formula, or code literal.

Review BOTH complete candidates:
- artifacts/about-retranslation-2026-10-04/staging/{{CODE}}/about.html
- artifacts/about-retranslation-2026-10-04/staging/{{CODE}}/monster.html

For established site terminology and canonical localized calendar names, you may inspect docs/i18n/locales/{{CODE}}.js. Do not treat any older About translation as authority and do not review from memory.

This is strict linguistic QA. Actively look for translationese, grammar, syntax, agreement, morphology, spelling, punctuation, typography, unnatural collocations, wrong register, awkward literal Hebrew calques, inconsistent terminology, wrong script, unintended Hebrew or English leakage, bad treatment of names and proper nouns, ambiguity introduced by translation, and humor that stopped working because the wording became stiff or explanatory. Pay special attention to all 64 expandable calendar-name explanations and to the complete penguin appendix.

The desired voice is clear public explanatory prose. Straight calendar mechanics must remain easy to understand. Satire must remain dry and matter-of-fact, not be rewritten as winking commentary. Do not make the calendar sound more sensible than the source does. Do not modify files.

Report every real finding with file, section/name entry, reason, and an exact suggested replacement in {{TAG}} when practical. If there is any substantive linguistic problem, fail.

End with exactly one machine-readable line:
NATIVE_QA_RESULT: PASS
or
NATIVE_QA_RESULT: FAIL
"""

def prompt_translation_request(tag: str) -> str:
    source = NATIVE_PROTOCOL_EN.replace("{{TAG}}", tag)
    return textwrap.dedent(f"""
Translate the reviewer protocol below into the natural language of BCP 47 locale {tag}. This translated protocol will be the ONLY user prompt in a fresh reviewer session.

All ordinary instruction prose must be in the target language. Preserve repository paths, placeholders {{CODE}}, technical tokens, and the exact machine-readable verdict lines NATIVE_QA_RESULT: PASS and NATIVE_QA_RESULT: FAIL. Do not add commentary, a preface, code fences, or translator notes. Output only the translated reviewer prompt.

--- PROTOCOL ---
{source}
""").strip() + "\n"

def semantic_prompt(code: str, tag: str) -> str:
    return textwrap.dedent(f"""
Perform a separate semantic fidelity audit of the new {tag} translation directly against the Hebrew originals. This is not a linguistic-style review and must not rely on English or any pivot language.

Hebrew authorities:
- docs/about/content/he.html
- docs/about/monster/index.html

Candidates:
- artifacts/about-retranslation-2026-10-04/staging/{code}/about.html
- artifacts/about-retranslation-2026-10-04/staging/{code}/monster.html

Also inspect docs/i18n/locales/{code}.js only for established localized UI terms and canonical calendar-name forms.

Compare section by section and name entry by name entry. Find any omission, addition, semantic drift, reversal, softened or rationalized joke, wrong number, wrong bound, wrong formula, wrong date, lost caveat, changed relationship, wrong canonical calendar-name identity, altered Spleen-extension condition, altered 4/9 or 3/5 permitted-bound statement, lost sales-pitch absurdity, or missing/changed detail in the full penguin appendix. The two intentionally over-explained obvious points must remain intentionally over-explained. The "advantages" section must still consist only of disadvantages enthusiastically sold as advantages plus characteristics common to calendars in general; do not accept a newly invented genuine virtue.

Do not modify files. Report every substantive mismatch with source section, candidate section, explanation, and exact correction guidance. If any substantive mismatch exists, fail.

End with exactly one machine-readable line:
HEBREW_COMPARE_RESULT: PASS
or
HEBREW_COMPARE_RESULT: FAIL
""").strip() + "\n"

def repair_notes(native_report: Path | None, semantic_report: Path | None) -> str:
    parts = []
    if native_report and native_report.exists():
        parts.append("Native-language QA findings that must be fixed:\n" + native_report.read_text(encoding="utf-8", errors="replace"))
    if semantic_report and semantic_report.exists():
        parts.append("Direct Hebrew-source comparison findings that must be fixed:\n" + semantic_report.read_text(encoding="utf-8", errors="replace"))
    if not parts:
        return ""
    return "\n\n".join(parts) + "\n\nRegenerate this page from the Hebrew source while fixing all applicable findings. Do not make unrelated semantic changes."

def translate_page(code: str, tag: str, direction: str, which: str, outdir: Path, attempt: int, notes: str) -> str:
    raw = outdir / f"{which}-translation-attempt-{attempt}.txt"
    session = outdir / f"{which}-translation-attempt-{attempt}-session.md"
    rc = run_copilot(page_translation_prompt(code, tag, direction, which, notes), raw, session)
    if rc != 0:
        raise RuntimeError(f"{which} translator exited {rc}")
    return extract_translation(raw.read_text(encoding="utf-8", errors="replace"))

def write_status(outdir: Path, data: dict) -> None:
    (outdir / "status.json").write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--code", required=True)
    ap.add_argument("--tag", required=True)
    ap.add_argument("--dir", required=True, choices=["ltr", "rtl"])
    ap.add_argument("--max-cycles", type=int, default=3)
    args = ap.parse_args()

    code, tag, direction = args.code, args.tag, args.dir
    outdir = BASE / "staging" / code
    outdir.mkdir(parents=True, exist_ok=True)
    write_status(outdir, {"code": code, "tag": tag, "state": "RUNNING", "source": os.environ.get("GITHUB_SHA")})

    # Translate the native-review protocol once, then reuse the target-language prompt for every repair cycle.
    native_prompt_path = outdir / "native-review-prompt.md"
    prompt_session = outdir / "native-review-prompt-translation-session.md"
    rc = run_copilot(prompt_translation_request(tag), native_prompt_path, prompt_session)
    if rc != 0 or not native_prompt_path.exists() or native_prompt_path.stat().st_size == 0:
        write_status(outdir, {"code": code, "tag": tag, "state": "FAIL", "stage": "PROMPT_TRANSLATION"})
        return 2
    native_prompt_text = native_prompt_path.read_text(encoding="utf-8")
    native_prompt_text = native_prompt_text.replace("{{CODE}}", code).replace("{{TAG}}", tag)
    native_prompt_path.write_text(native_prompt_text, encoding="utf-8")
    if "NATIVE_QA_RESULT: PASS" not in native_prompt_text or "NATIVE_QA_RESULT: FAIL" not in native_prompt_text:
        write_status(outdir, {"code": code, "tag": tag, "state": "FAIL", "stage": "PROMPT_TRANSLATION_FORMAT"})
        return 2

    notes = ""
    for cycle in range(1, args.max_cycles + 1):
        try:
            about = translate_page(code, tag, direction, "about", outdir, cycle, notes)
            monster = translate_page(code, tag, direction, "monster", outdir, cycle, notes)
            about = normalize_about(about, code)
            monster = normalize_monster(monster, code, tag, direction)
            (outdir / "about.html").write_text(about, encoding="utf-8")
            (outdir / "monster.html").write_text(monster, encoding="utf-8")
        except Exception as exc:
            (outdir / "worker-error.txt").write_text(str(exc) + "\n", encoding="utf-8")
            write_status(outdir, {"code": code, "tag": tag, "state": "FAIL", "stage": "TRANSLATION", "cycle": cycle})
            return 3

        errors = structural_errors(about, monster, code, tag, direction)
        (outdir / f"structural-{cycle}.json").write_text(json.dumps(errors, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        if errors:
            notes = "Structural validation failed. Regenerate while preserving exact source markup. Failures:\n- " + "\n- ".join(errors)
            continue

        native_report = outdir / f"native-qa-{cycle}.md"
        native_session = outdir / f"native-qa-{cycle}-session.md"
        rc = run_copilot(native_prompt_text, native_report, native_session)
        nv = exact_verdict(native_report, "NATIVE_QA_RESULT") if rc == 0 else None
        if nv != "PASS":
            notes = repair_notes(native_report, None)
            continue

        semantic_report = outdir / f"hebrew-compare-{cycle}.md"
        semantic_session = outdir / f"hebrew-compare-{cycle}-session.md"
        rc = run_copilot(semantic_prompt(code, tag), semantic_report, semantic_session)
        sv = exact_verdict(semantic_report, "HEBREW_COMPARE_RESULT") if rc == 0 else None
        if sv == "PASS":
            write_status(outdir, {
                "code": code,
                "tag": tag,
                "dir": direction,
                "state": "PASS",
                "cycle": cycle,
                "native_qa": "PASS",
                "hebrew_compare": "PASS",
                "details_count": 64,
            })
            return 0

        # Any semantic repair must return through native-language QA on the next cycle.
        notes = repair_notes(None, semantic_report)

    write_status(outdir, {
        "code": code,
        "tag": tag,
        "state": "FAIL",
        "stage": "MAX_CYCLES",
        "max_cycles": args.max_cycles,
    })
    return 4

if __name__ == "__main__":
    raise SystemExit(main())
