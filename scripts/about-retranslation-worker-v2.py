#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import os
import re
import subprocess
import shutil
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

class CopilotQuotaError(RuntimeError):
    pass


def copilot_stderr(out: Path) -> str:
    path = out.with_suffix(out.suffix + ".stderr.log")
    if not path.exists():
        return ""
    return path.read_text(encoding="utf-8", errors="replace")


def raise_for_copilot_failure(out: Path, rc: int, label: str) -> None:
    if rc == 0:
        return
    stderr = copilot_stderr(out)
    if "exceeded your monthly quota" in stderr.lower():
        raise CopilotQuotaError(f"{label}: GitHub Copilot monthly quota exceeded")
    detail = stderr.strip().splitlines()[-1] if stderr.strip() else f"exit code {rc}"
    raise RuntimeError(f"{label}: {detail}")

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

def single_page_structural_errors(value: str, which: str, code: str, tag: str, direction: str) -> list[str]:
    errors = []
    if which == "about":
        source = shape(SOURCE_ABOUT.read_text(encoding="utf-8"))
        current = shape(value)
        if source.events != current.events:
            errors.append("About HTML structure differs from Hebrew source")
        if source.ids != current.ids:
            errors.append("About id sequence differs from Hebrew source")
        if current.details != 64:
            errors.append(f"About expected 64 details elements, got {current.details}")
        if f'href="./monster/{code}.html"' not in value and f"href='./monster/{code}.html'" not in value:
            errors.append("About does not link to locale-specific monster page")
        return errors

    source = shape(SOURCE_MONSTER.read_text(encoding="utf-8"))
    current = shape(value)
    if source.events != current.events:
        errors.append("Monster HTML structure differs from Hebrew source")
    if source.ids != current.ids:
        errors.append("Monster id sequence differs from Hebrew source")
    if not re.search(rf'<html\s+lang="{re.escape(tag)}"\s+dir="{re.escape(direction)}">', value, flags=re.I):
        errors.append("Monster lang/dir metadata is incorrect")
    if f'href="../?lang={code}"' not in value and f"href='../?lang={code}'" not in value:
        errors.append("Monster does not link back to same-locale About page")
    return errors


def structural_errors(about: str, monster: str, code: str, tag: str, direction: str) -> list[str]:
    return (
        single_page_structural_errors(about, "about", code, tag, direction)
        + single_page_structural_errors(monster, "monster", code, tag, direction)
    )

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

You MAY read {locale} only for already-established target-language UI terminology and canonical localized forms of the 17 cutlet names and 47 month names. Those established name forms control. Preserve the source's dry satire, deliberate absurdity, intentionally unnecessary over-explanations, enthusiastic sales-pitch tone, and the arbitrary Spleen extension instead of rationalizing them. The deliberately excessive explanations corresponding to "The Empty Jar" and "The Closed Door" MUST remain conspicuously long and reasoned even though their conclusions are obvious. For name explanations, preserve the exact intended referent but adapt Hebrew-specific homonym disambiguations when the target language does not share the ambiguity; do not mechanically explain that an unambiguous target-language word does not mean an unrelated Hebrew homonym. When the page discusses grammatical gender or pronoun conventions in the target language, make actual pronoun usage elsewhere on the translated page consistent with the convention stated there.
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

Two conspicuously long explanations of obvious facts are DELIBERATE: the entries corresponding to "The Empty Jar" and "The Closed Door". Their unnecessary detail is part of the requested joke. Do NOT flag them merely for being obvious, verbose, over-explained, or unnecessary, and do not recommend shortening them. Flag only actual target-language defects while preserving their deliberately elaborate character.

For calendar-name explanations, judge whether the exact intended referent is clear in the target language. A Hebrew-only homonym disambiguation need not be copied literally when the target-language canonical name has no such ambiguity; adapting that note is correct so long as the underlying identity is preserved. Numerical bounds, the Leopard-versus-tiger identity where relevant, and the arbitrary Spleen extension remain substantive content.

The desired voice is clear public explanatory prose. Straight calendar mechanics must remain easy to understand. Satire must remain dry and matter-of-fact, not be rewritten as winking commentary. Do not make the calendar sound more sensible than the source does. Do not modify files.

Report every real finding with file, section/name entry, reason, and an exact suggested replacement in {{TAG}} when practical. If there is any substantive linguistic problem, fail.

At the very end, choose exactly one final verdict. Choose PASS only if no substantive linguistic problem remains; otherwise choose FAIL. The workflow will append the two exact machine-readable choices to this prompt after translation, and you must copy exactly one of those two lines as the final line of your report.
"""

def prompt_translation_request(tag: str) -> str:
    source = NATIVE_PROTOCOL_EN.replace("{{TAG}}", tag)
    return textwrap.dedent(f"""
Translate the reviewer protocol below into the natural language of BCP 47 locale {tag}. This translated protocol will be the ONLY user prompt in a fresh reviewer session.

All ordinary instruction prose must be in the target language. Preserve repository paths, placeholders {{CODE}}, and technical tokens. Do not invent a verdict and do not add commentary, a preface, code fences, or translator notes. Output only the translated reviewer prompt body.

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

Compare section by section and name entry by name entry. Find any omission, addition, semantic drift, reversal, softened or rationalized joke, wrong number, wrong bound, wrong formula, wrong date, lost caveat, changed relationship, wrong canonical calendar-name identity, altered Spleen-extension condition, altered 4/9 or 3/5 permitted-bound statement, lost sales-pitch absurdity, or missing/changed detail in the full penguin appendix. The two intentionally over-explained obvious points corresponding to "The Empty Jar" and "The Closed Door" must remain intentionally and conspicuously over-explained; do not accept shortening them into ordinary concise glosses. The "advantages" section must still consist only of disadvantages enthusiastically sold as advantages plus characteristics common to calendars in general; do not accept a newly invented genuine virtue. A Hebrew-only homonym clarification in a name explanation may be adapted or omitted when the canonical target-language name has no corresponding ambiguity, provided the exact intended entity or referent remains unambiguous. Do not mistake such localization for semantic loss.

Do not modify files. Report every substantive mismatch with source section, candidate section, explanation, and exact correction guidance. If any substantive mismatch exists, fail.

End with exactly one machine-readable line:
HEBREW_COMPARE_RESULT: PASS
or
HEBREW_COMPARE_RESULT: FAIL
""").strip() + "\n"

def repair_page_prompt(code: str, tag: str, direction: str, which: str, report_path: Path, gate: str) -> str:
    candidate = f"artifacts/about-retranslation-2026-10-04/staging/{code}/{which}.html"
    source = "docs/about/content/he.html" if which == "about" else "docs/about/monster/index.html"
    shape_rules = (
        "Preserve the exact About HTML tag/order/id/class/data-* structure and all 64 details/summary disclosures."
        if which == "about"
        else "Preserve the exact Monster-page tag/order/id/class structure, including the complete penguin appendix."
    )
    return textwrap.dedent(f"""
Revise the EXISTING {tag} candidate, using the review report as a surgical correction list.

Candidate:
- {candidate}

Hebrew semantic authority:
- {source}

Review findings:
- {report_path.as_posix()}

Read the candidate, Hebrew source, and report. Apply every report finding that applies to this page while preserving passages the report did not challenge. This is a repair pass, NOT a fresh translation: do not rewrite unaffected prose merely for variety. Do not read or imitate older About translations. You may inspect docs/i18n/locales/{code}.js only for established target-language terminology and canonical localized calendar-name forms.

{shape_rules}
The two deliberately over-explained obvious name entries corresponding to "The Empty Jar" and "The Closed Door" must remain conspicuously long; never shorten them merely because their conclusions are obvious. Preserve the enthusiastic sales-pitch absurdity, numerical bounds, arbitrary Spleen extension, dry jokes, and target-language pronoun convention. Hebrew-only homonym clarifications may be adapted when the target-language canonical name has no such ambiguity.
This repair follows the {gate} review. A fresh native-language QA will run again before anything can pass.

Return ONLY:
{START}
[complete corrected HTML]
{END}
No preface, analysis, Markdown fence, or notes.
""").strip() + "\n"


def repair_page(code: str, tag: str, direction: str, which: str, outdir: Path, cycle: int, report_path: Path, gate: str) -> str:
    last_problem = "unknown repair failure"
    for attempt in range(1, 4):
        raw = outdir / f"{which}-{gate}-repair-{cycle}-attempt-{attempt}.txt"
        session = outdir / f"{which}-{gate}-repair-{cycle}-attempt-{attempt}-session.md"
        prompt = repair_page_prompt(code, tag, direction, which, report_path, gate)
        if attempt > 1:
            prompt += (
                "\n\nIMPORTANT: The previous repair attempt was rejected before installation because "
                + last_problem
                + " Preserve the candidate's exact HTML structure. Change reader-facing wording only."
            )
        rc = run_copilot(prompt, raw, session)
        if rc != 0:
            try:
                raise_for_copilot_failure(raw, rc, f"{which} {gate} repair")
            except CopilotQuotaError:
                raise
            except Exception as exc:
                last_problem = str(exc)
                continue
        try:
            value = extract_translation(raw.read_text(encoding="utf-8", errors="replace"))
        except Exception as exc:
            last_problem = f"output format was invalid: {exc}"
            continue
        value = normalize_about(value, code) if which == "about" else normalize_monster(value, code, tag, direction)
        errors = single_page_structural_errors(value, which, code, tag, direction)
        (outdir / f"{which}-{gate}-repair-{cycle}-attempt-{attempt}-structure.json").write_text(
            json.dumps(errors, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )
        if not errors:
            return value
        last_problem = "; ".join(errors)
    raise RuntimeError(f"{which} {gate} repair rejected after 3 attempts: {last_problem}")


def translate_page(code: str, tag: str, direction: str, which: str, outdir: Path, attempt: int) -> str:
    raw = outdir / f"{which}-translation-attempt-{attempt}.txt"
    session = outdir / f"{which}-translation-attempt-{attempt}-session.md"
    rc = run_copilot(page_translation_prompt(code, tag, direction, which, ""), raw, session)
    raise_for_copilot_failure(raw, rc, f"{which} translator")
    value = extract_translation(raw.read_text(encoding="utf-8", errors="replace"))
    return normalize_about(value, code) if which == "about" else normalize_monster(value, code, tag, direction)


def write_status(outdir: Path, data: dict) -> None:
    (outdir / "status.json").write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--code", required=True)
    ap.add_argument("--tag", required=True)
    ap.add_argument("--dir", required=True, choices=["ltr", "rtl"])
    ap.add_argument("--max-cycles", type=int, default=6)
    args = ap.parse_args()

    code, tag, direction = args.code, args.tag, args.dir
    outdir = BASE / "staging" / code
    # Every run is a fresh translation cycle. Never inherit stale candidate or QA evidence
    # from an earlier pilot committed on the branch.
    if outdir.exists():
        shutil.rmtree(outdir)
    outdir.mkdir(parents=True, exist_ok=True)
    write_status(outdir, {"code": code, "tag": tag, "state": "RUNNING", "source": os.environ.get("GITHUB_SHA")})

    # Translate the native-review protocol once, then reuse the target-language prompt for every repair cycle.
    native_prompt_path = outdir / "native-review-prompt.md"
    prompt_session = outdir / "native-review-prompt-translation-session.md"
    rc = run_copilot(prompt_translation_request(tag), native_prompt_path, prompt_session)
    if rc != 0:
        if "exceeded your monthly quota" in copilot_stderr(native_prompt_path).lower():
            write_status(outdir, {"code": code, "tag": tag, "state": "BLOCKED", "stage": "COPILOT_QUOTA", "operation": "PROMPT_TRANSLATION"})
            return 5
        write_status(outdir, {"code": code, "tag": tag, "state": "FAIL", "stage": "PROMPT_TRANSLATION_TRANSPORT"})
        return 2
    if not native_prompt_path.exists() or native_prompt_path.stat().st_size == 0:
        write_status(outdir, {"code": code, "tag": tag, "state": "FAIL", "stage": "PROMPT_TRANSLATION_EMPTY"})
        return 2
    native_prompt_text = native_prompt_path.read_text(encoding="utf-8")
    native_prompt_text = native_prompt_text.replace("{{CODE}}", code).replace("{{TAG}}", tag)
    # Machine tokens are protocol, not translatable prose. Remove any eager choice the prompt-translator
    # may have emitted, then append both choices mechanically so every locale receives an intact protocol.
    native_prompt_text = re.sub(r"(?m)^\\s*NATIVE_QA_RESULT:\\s*(?:PASS|FAIL)\\s*$", "", native_prompt_text).rstrip()
    native_prompt_text += "\\n\\nNATIVE_QA_RESULT: PASS\\nNATIVE_QA_RESULT: FAIL\\n"
    native_prompt_path.write_text(native_prompt_text, encoding="utf-8")
    if native_prompt_text.count("NATIVE_QA_RESULT: PASS") != 1 or native_prompt_text.count("NATIVE_QA_RESULT: FAIL") != 1:
        write_status(outdir, {"code": code, "tag": tag, "state": "FAIL", "stage": "PROMPT_TRANSLATION_FORMAT"})
        return 2

    # Translate from Hebrew exactly once. Failed gates repair the existing candidate instead of regenerating unrelated prose.
    try:
        about = translate_page(code, tag, direction, "about", outdir, 1)
        monster = translate_page(code, tag, direction, "monster", outdir, 1)
        (outdir / "about.html").write_text(about, encoding="utf-8")
        (outdir / "monster.html").write_text(monster, encoding="utf-8")
    except CopilotQuotaError as exc:
        (outdir / "worker-error.txt").write_text(str(exc) + "\n", encoding="utf-8")
        write_status(outdir, {"code": code, "tag": tag, "state": "BLOCKED", "stage": "COPILOT_QUOTA", "operation": "TRANSLATION"})
        return 5
    except Exception as exc:
        (outdir / "worker-error.txt").write_text(str(exc) + "\n", encoding="utf-8")
        write_status(outdir, {"code": code, "tag": tag, "state": "FAIL", "stage": "TRANSLATION"})
        return 3

    for cycle in range(1, args.max_cycles + 1):
        about = (outdir / "about.html").read_text(encoding="utf-8")
        monster = (outdir / "monster.html").read_text(encoding="utf-8")
        errors = structural_errors(about, monster, code, tag, direction)
        (outdir / f"structural-{cycle}.json").write_text(json.dumps(errors, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        if errors:
            # Reaching this branch means an invalid page somehow escaped the guarded translation/repair paths.
            # Fail closed rather than asking an LLM to rewrite markup.
            (outdir / "worker-error.txt").write_text(
                "Unexpected structural drift after guarded write:\n- " + "\n- ".join(errors) + "\n",
                encoding="utf-8",
            )
            write_status(outdir, {"code": code, "tag": tag, "state": "FAIL", "stage": "STRUCTURAL_DRIFT", "cycle": cycle})
            return 3

        native_report = outdir / f"native-qa-{cycle}.md"
        native_session = outdir / f"native-qa-{cycle}-session.md"
        rc = run_copilot(native_prompt_text, native_report, native_session)
        if rc != 0:
            if "exceeded your monthly quota" in copilot_stderr(native_report).lower():
                write_status(outdir, {"code": code, "tag": tag, "state": "BLOCKED", "stage": "COPILOT_QUOTA", "operation": "NATIVE_QA", "cycle": cycle})
                return 5
            write_status(outdir, {"code": code, "tag": tag, "state": "FAIL", "stage": "NATIVE_QA_TRANSPORT", "cycle": cycle})
            return 5
        nv = exact_verdict(native_report, "NATIVE_QA_RESULT")
        if nv is None:
            write_status(outdir, {"code": code, "tag": tag, "state": "FAIL", "stage": "NATIVE_QA_PROTOCOL", "cycle": cycle})
            return 5
        if nv != "PASS":
            try:
                about = repair_page(code, tag, direction, "about", outdir, cycle, native_report, "native")
                monster = repair_page(code, tag, direction, "monster", outdir, cycle, native_report, "native")
                (outdir / "about.html").write_text(about, encoding="utf-8")
                (outdir / "monster.html").write_text(monster, encoding="utf-8")
            except CopilotQuotaError as exc:
                (outdir / "worker-error.txt").write_text(str(exc) + "\n", encoding="utf-8")
                write_status(outdir, {"code": code, "tag": tag, "state": "BLOCKED", "stage": "COPILOT_QUOTA", "operation": "NATIVE_REPAIR", "cycle": cycle})
                return 5
            except Exception as exc:
                (outdir / "worker-error.txt").write_text(str(exc) + "\n", encoding="utf-8")
                write_status(outdir, {"code": code, "tag": tag, "state": "FAIL", "stage": "NATIVE_REPAIR", "cycle": cycle})
                return 3
            continue

        semantic_report = outdir / f"hebrew-compare-{cycle}.md"
        semantic_session = outdir / f"hebrew-compare-{cycle}-session.md"
        rc = run_copilot(semantic_prompt(code, tag), semantic_report, semantic_session)
        if rc != 0:
            if "exceeded your monthly quota" in copilot_stderr(semantic_report).lower():
                write_status(outdir, {"code": code, "tag": tag, "state": "BLOCKED", "stage": "COPILOT_QUOTA", "operation": "HEBREW_COMPARE", "cycle": cycle})
                return 5
            write_status(outdir, {"code": code, "tag": tag, "state": "FAIL", "stage": "HEBREW_COMPARE_TRANSPORT", "cycle": cycle})
            return 5
        sv = exact_verdict(semantic_report, "HEBREW_COMPARE_RESULT")
        if sv is None:
            write_status(outdir, {"code": code, "tag": tag, "state": "FAIL", "stage": "HEBREW_COMPARE_PROTOCOL", "cycle": cycle})
            return 5
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

        # Any semantic repair returns through native-language QA on the next cycle.
        try:
            about = repair_page(code, tag, direction, "about", outdir, cycle, semantic_report, "semantic")
            monster = repair_page(code, tag, direction, "monster", outdir, cycle, semantic_report, "semantic")
            (outdir / "about.html").write_text(about, encoding="utf-8")
            (outdir / "monster.html").write_text(monster, encoding="utf-8")
        except CopilotQuotaError as exc:
            (outdir / "worker-error.txt").write_text(str(exc) + "\n", encoding="utf-8")
            write_status(outdir, {"code": code, "tag": tag, "state": "BLOCKED", "stage": "COPILOT_QUOTA", "operation": "SEMANTIC_REPAIR", "cycle": cycle})
            return 5
        except Exception as exc:
            (outdir / "worker-error.txt").write_text(str(exc) + "\n", encoding="utf-8")
            write_status(outdir, {"code": code, "tag": tag, "state": "FAIL", "stage": "SEMANTIC_REPAIR", "cycle": cycle})
            return 3

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
