#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import os
import re
import subprocess
import sys
import textwrap
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path.cwd()
STAGING = ROOT / "artifacts/about-retranslation-2026-10-04/staging"
READ_TOOLS = "shell(cat:*),shell(grep:*),shell(rg:*),shell(sed:*),shell(head:*),shell(tail:*),shell(wc:*),shell(find:*),shell(ls:*),shell(pwd:*)"

START_ABOUT = "<<<ABOUT_HTML>>>"
END_ABOUT = "<<<END_ABOUT_HTML>>>"
START_MONSTER = "<<<MONSTER_HTML>>>"
END_MONSTER = "<<<END_MONSTER_HTML>>>"


class ShapeParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=False)
        self.events = []
        self.ids = []
        self.details = 0

    def _attrs(self, attrs):
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
        self.events.append(("start", tag, self._attrs(attrs)))

    def handle_startendtag(self, tag, attrs):
        self.events.append(("start", tag, self._attrs(attrs)))
        self.events.append(("end", tag, ()))

    def handle_endtag(self, tag):
        self.events.append(("end", tag, ()))


def shape(text: str) -> ShapeParser:
    p = ShapeParser()
    p.feed(text)
    p.close()
    return p


def copilot(prompt: str, out: Path, share: Path | None = None, timeout: int = 1800) -> int:
    cmd = [
        "copilot",
        "--no-custom-instructions",
        "--no-ask-user",
        "--no-color",
        "--allow-tool", READ_TOOLS,
        "-s",
    ]
    if share is not None:
        cmd.append(f"--share={share}")
    proc = subprocess.run(
        cmd,
        input=prompt,
        text=True,
        cwd=ROOT,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        env=os.environ.copy(),
        timeout=timeout,
    )
    out.write_text(proc.stdout, encoding="utf-8")
    out.with_suffix(out.suffix + ".stderr.log").write_text(proc.stderr, encoding="utf-8")
    return proc.returncode


def exact_verdict(path: Path, token: str) -> str | None:
    lines = [line.strip() for line in path.read_text(encoding="utf-8", errors="replace").splitlines()]
    matches = [line for line in lines if line in {f"{token}: PASS", f"{token}: FAIL"}]
    if len(matches) != 1:
        return None
    return matches[0].split(":", 1)[1].strip()


def extract(raw: str, start: str, end: str) -> str:
    a = raw.find(start)
    b = raw.find(end)
    if a < 0 or b < 0 or b <= a:
        raise ValueError(f"missing delimiters: {start} / {end}")
    value = raw[a + len(start):b].strip()
    if value.startswith("```html"):
        value = value[len("```html"):]
    elif value.startswith("```"):
        value = value[len("```"):]
    if value.endswith("```"):
        value = value[:-3]
    return value.strip() + "\n"


def structural_errors(about: str, monster: str, code: str, tag: str, direction: str) -> list[str]:
    errors = []
    src_about = (ROOT / "docs/about/content/he.html").read_text(encoding="utf-8")
    src_monster = (ROOT / "docs/about/monster/index.html").read_text(encoding="utf-8")
    a0, a1 = shape(src_about), shape(about)
    m0, m1 = shape(src_monster), shape(monster)

    if a0.events != a1.events:
        errors.append("about HTML structural fingerprint changed")
    if a0.ids != a1.ids:
        errors.append("about id sequence changed")
    if a1.details != 64:
        errors.append(f"about must contain exactly 64 details elements; got {a1.details}")
    if m0.events != m1.events:
        errors.append("monster HTML structural fingerprint changed")
    if m0.ids != m1.ids:
        errors.append("monster id sequence changed")
    if not re.search(rf'<html\s+lang="{re.escape(tag)}"\s+dir="{re.escape(direction)}">', monster, re.I):
        errors.append("monster html lang/dir metadata is wrong")
    if f'href="./monster/{code}.html"' not in about and f"href='./monster/{code}.html'" not in about:
        errors.append("about link to locale-specific monster page is missing")
    if f'href="../?lang={code}"' not in monster and f"href='../?lang={code}'" not in monster:
        errors.append("monster return link to same-locale About page is missing")
    return errors


def preservation_addon_prompt(tag: str) -> str:
    source = """
Additional review constraints:
- Two deliberately over-explained calendar-name entries, The Empty Jar and The Closed Door (or their established target-language names), are intentional deadpan humor. Do not fail them merely because they explain obvious facts at unnecessary length. You may still flag actual grammar, ambiguity, mistranslation, or unnatural wording.
- Notes about ambiguities in the Hebrew source forms are deliberate semantic content: horn/ray, Susa/flower, sand/secular-or-weekday, salt/sailor, bow/rainbow, leopard/tiger, and lamp/candle. Judge whether each note is phrased naturally in the target language, but do not require deleting the note just because the target-language name itself is unambiguous.
- The "advantages" section intentionally praises obvious disadvantages and properties shared by calendars in general, without supplying a serious justification. Preserve the dry sales-pitch joke.
- The numeric names must retain every semantic component from Hebrew: the whole phrase is one name; the parts are equal; 4/9 means four equal parts out of nine and permits the exact stated e/103 deviation including the boundary; 3/5 means three equal parts out of five and permits the exact stated 1/367 deviation including the boundary.
- The arbitrary Spleen extension is intentionally arbitrary. Do not rationalize or shorten away its conditions.
- Prefer natural target-language prose, but do not improve the source by deleting intentional absurdity, repetition, or a joke.
"""
    return textwrap.dedent(f"""
Translate the instruction block below into natural {tag}. Output only the translated instruction block, with no preface, notes, or Markdown fence. Preserve code-like tokens, fractions, e/103, 1/367, and the semantic content exactly. This text will be appended to a reviewer prompt that must be entirely in the target language.

{source}
""").strip() + "\n"


def semantic_prompt(code: str) -> str:
    return textwrap.dedent(f"""
You are an independent semantic fidelity reviewer. Compare the current candidates DIRECTLY against the complete Hebrew sources. Do not use English or an older translation as a pivot or semantic authority.

Hebrew sources:
- docs/about/content/he.html
- docs/about/monster/index.html

Candidate:
- artifacts/about-retranslation-2026-10-04/staging/{code}/about.html
- artifacts/about-retranslation-2026-10-04/staging/{code}/monster.html

You may inspect docs/i18n/locales/{code}.js only to verify established localized UI terminology and the established localized forms of the 17 cutlet names and 47 month names.

Check every section for omissions, additions, reversals, softened or strengthened claims, changed qualifications, altered jokes, lost deadpan over-explanations, changed research caveats, formulas, numbers, c/t and Year 5000 semantics, Foundation/Tablets dates, day-boundary wording, Seer/canon status, all 64 name explanations, the exact 4/9 and 3/5 permitted deviations, every condition of the arbitrary Spleen extension, the sales-pitch "advantages" joke, and the complete Monster page including the full penguin appendix.

The Hebrew source deliberately contains some material that may look unnecessary or absurd. Preserve it. Do not recommend deleting content merely because the target language could be shorter. The task is fidelity plus natural translation, not editorial improvement.

Report only real semantic-fidelity findings, with exact location and a concrete repair. If there is any substantive semantic difference, fail. Do not modify files. End with exactly one machine-readable line:
SEMANTIC_QA_RESULT: PASS
or
SEMANTIC_QA_RESULT: FAIL
""").strip() + "\n"


def repair_prompt(code: str, tag: str, native_report: Path, semantic_report: Path, structure_notes: str = "") -> str:
    return textwrap.dedent(f"""
Repair the two current {tag} candidate translations using the complete Hebrew files as the sole semantic source of truth.

Hebrew sources:
- docs/about/content/he.html
- docs/about/monster/index.html

Candidates to repair:
- artifacts/about-retranslation-2026-10-04/staging/{code}/about.html
- artifacts/about-retranslation-2026-10-04/staging/{code}/monster.html

Review reports:
- {native_report.as_posix()}
- {semantic_report.as_posix()}

Established target-language calendar-name forms may be checked only in docs/i18n/locales/{code}.js.

Apply every real linguistic and semantic finding, but do NOT follow a proposed edit that conflicts with Hebrew or deletes intentional source content. In particular preserve:
- all 64 explanations;
- the deliberately over-explained Empty Jar and Closed Door jokes;
- source-language ambiguity notes;
- every component and exact boundary of the 4/9 and 3/5 rules;
- every arbitrary Spleen condition;
- the sales-pitch joke that praises disadvantages and universal calendar properties;
- all research caveats;
- the full Monster text and full penguin appendix.

Do not change HTML structure, element order, ids, classes, data-* attributes, formulas, code literals, or numeric values. Preserve the current locale-specific links and monster lang/dir metadata.

Previous structural feedback, if any:
{structure_notes or "(none)"}

Return ONLY:
{START_ABOUT}
[complete repaired About HTML fragment]
{END_ABOUT}
{START_MONSTER}
[complete repaired Monster HTML document]
{END_MONSTER}
""").strip() + "\n"


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--locale", required=True)
    ap.add_argument("--tag", required=True)
    ap.add_argument("--dir", required=True, choices=["ltr", "rtl"])
    ap.add_argument("--max-cycle", type=int, default=8)
    args = ap.parse_args()

    outdir = STAGING / args.locale
    about_path = outdir / "about.html"
    monster_path = outdir / "monster.html"
    prompt_path = outdir / "native-review-prompt.md"
    if not about_path.exists() or not monster_path.exists() or not prompt_path.exists():
        raise SystemExit("resume requires existing candidate and native-review-prompt.md")

    existing = []
    for p in outdir.glob("cycle-*"):
        m = re.fullmatch(r"cycle-(\d+)", p.name)
        if m:
            existing.append(int(m.group(1)))
    next_cycle = max(existing, default=0) + 1

    addon = outdir / "native-review-preservation-addon.md"
    if not addon.exists():
        raw = outdir / "native-review-preservation-addon.raw.txt"
        rc = copilot(
            preservation_addon_prompt(args.tag),
            raw,
            outdir / "native-review-preservation-addon-session.md",
            tools=False,
        )
        if rc != 0 or not raw.read_text(encoding="utf-8", errors="replace").strip():
            raise SystemExit("failed to translate preservation addon")
        addon.write_text(raw.read_text(encoding="utf-8"), encoding="utf-8")

    native_prompt = prompt_path.read_text(encoding="utf-8").rstrip() + "\n\n" + addon.read_text(encoding="utf-8").strip() + "\n"

    final_native = final_sem = "FAIL"
    for cycle in range(next_cycle, args.max_cycle + 1):
        cdir = outdir / f"cycle-{cycle}"
        cdir.mkdir(parents=True, exist_ok=True)

        errs = structural_errors(
            about_path.read_text(encoding="utf-8"),
            monster_path.read_text(encoding="utf-8"),
            args.locale, args.tag, args.dir,
        )
        (cdir / "structural.json").write_text(json.dumps({"errors": errs}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        if errs:
            final_native = final_sem = "FAIL"
        else:
            nrep = cdir / "native-qa.md"
            srep = cdir / "semantic-qa.md"
            copilot(native_prompt, nrep, cdir / "native-qa-session.md")
            copilot(semantic_prompt(args.locale), srep, cdir / "semantic-qa-session.md")
            final_native = exact_verdict(nrep, "NATIVE_QA_RESULT") or "FAIL"
            final_sem = exact_verdict(srep, "SEMANTIC_QA_RESULT") or "FAIL"
            (cdir / "verdict.json").write_text(
                json.dumps({"native_qa": final_native, "semantic_qa": final_sem}, indent=2) + "\n",
                encoding="utf-8",
            )
            if final_native == "PASS" and final_sem == "PASS":
                break

        if cycle >= args.max_cycle:
            break

        nrep = cdir / "native-qa.md"
        srep = cdir / "semantic-qa.md"
        if not nrep.exists():
            nrep.write_text("Structural validation failed; do not change HTML structure.\nNATIVE_QA_RESULT: FAIL\n", encoding="utf-8")
        if not srep.exists():
            srep.write_text("Structural validation failed; restore the Hebrew source structure exactly.\nSEMANTIC_QA_RESULT: FAIL\n", encoding="utf-8")

        structure_notes = "\n".join(errs)
        repaired = False
        for attempt in range(1, 4):
            raw = cdir / f"repair-{attempt}.raw.txt"
            copilot(
                repair_prompt(args.locale, args.tag, nrep, srep, structure_notes),
                raw,
                cdir / f"repair-{attempt}-session.md",
            )
            try:
                text = raw.read_text(encoding="utf-8", errors="replace")
                about = extract(text, START_ABOUT, END_ABOUT)
                monster = extract(text, START_MONSTER, END_MONSTER)
            except Exception as exc:
                structure_notes = f"Repair output could not be parsed: {exc}"
                continue

            rerrs = structural_errors(about, monster, args.locale, args.tag, args.dir)
            (cdir / f"repair-{attempt}-structural.txt").write_text("\n".join(rerrs) + ("\n" if rerrs else ""), encoding="utf-8")
            if rerrs:
                structure_notes = "\n".join(rerrs)
                continue
            about_path.write_text(about, encoding="utf-8")
            monster_path.write_text(monster, encoding="utf-8")
            repaired = True
            break
        if not repaired:
            break

    status = {
        "locale": args.locale,
        "tag": args.tag,
        "dir": args.dir,
        "native_qa": final_native,
        "semantic_qa": final_sem,
        "publishable": final_native == "PASS" and final_sem == "PASS",
    }
    (outdir / "status.json").write_text(json.dumps(status, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(status, ensure_ascii=False))
    return 0 if status["publishable"] else 2


if __name__ == "__main__":
    sys.exit(main())
