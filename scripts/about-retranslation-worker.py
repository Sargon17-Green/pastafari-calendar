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

PAIR_START_ABOUT = "<<<ABOUT_HTML>>>"
PAIR_END_ABOUT = "<<<END_ABOUT_HTML>>>"
PAIR_START_MONSTER = "<<<MONSTER_HTML>>>"
PAIR_END_MONSTER = "<<<END_MONSTER_HTML>>>"

READ_TOOLS = "shell(cat:*),shell(grep:*),shell(rg:*),shell(sed:*),shell(head:*),shell(tail:*),shell(wc:*),shell(find:*),shell(ls:*),shell(pwd:*)"

class ShapeParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=False)
        self.events = []
        self.ids = []
        self.details = 0
    def handle_starttag(self, tag, attrs):
        amap = dict(attrs)
        if "id" in amap:
            self.ids.append(amap["id"])
        if tag == "details":
            self.details += 1
        # Preserve only structure-critical attributes in the shape.
        keep = []
        for key, value in attrs:
            if key in {"id", "class", "data-toc-section", "data-toc-level"}:
                keep.append((key, value))
        self.events.append(("start", tag, tuple(sorted(keep))))
    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        self.events.append(("end", tag, ()))
    def handle_endtag(self, tag):
        self.events.append(("end", tag, ()))


def run_copilot(prompt: str, *, cwd: Path, out: Path, share: Path | None, tools: bool = True, timeout: int = 1800) -> int:
    cmd = [
        "copilot",
        "--no-custom-instructions",
        "--no-ask-user",
        "--no-color",
        "-s",
    ]
    if tools:
        cmd += ["--allow-tool", READ_TOOLS]
    if share is not None:
        cmd += [f"--share={share}"]
    proc = subprocess.run(
        cmd,
        input=prompt,
        text=True,
        cwd=str(cwd),
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        timeout=timeout,
        env=os.environ.copy(),
    )
    out.write_text(proc.stdout, encoding="utf-8")
    out.with_suffix(out.suffix + ".stderr.log").write_text(proc.stderr, encoding="utf-8")
    return proc.returncode


def parse_pair(raw: str) -> tuple[str, str]:
    def grab(start: str, end: str) -> str:
        a = raw.find(start)
        b = raw.find(end)
        if a < 0 or b < 0 or b <= a:
            raise ValueError(f"missing or malformed delimiter pair {start} / {end}")
        value = raw[a + len(start):b].strip()
        if value.startswith("```html"):
            value = value[len("```html"):]
        elif value.startswith("```"):
            value = value[len("```"):]
        if value.endswith("```"):
            value = value[:-3]
        return value.strip() + "\n"
    return grab(PAIR_START_ABOUT, PAIR_END_ABOUT), grab(PAIR_START_MONSTER, PAIR_END_MONSTER)


def normalize_target_pages(about: str, monster: str, code: str, tag: str, direction: str) -> tuple[str, str]:
    # About fragments live inside /about/index.html, so the full monster page is one sibling URL away.
    about = about.replace('href="./monster/"', f'href="./monster/{code}.html"')
    about = about.replace("href='./monster/'", f"href='./monster/{code}.html'")

    # Force document-language metadata and the return route; visible labels remain the translator's responsibility.
    monster = re.sub(r'<html\b[^>]*>', f'<html lang="{tag}" dir="{direction}">', monster, count=1, flags=re.I)
    monster = monster.replace('href="../"', f'href="../?lang={code}"', 1)
    monster = monster.replace("href='../'", f"href='../?lang={code}'", 1)
    return about, monster


def html_shape(text: str) -> ShapeParser:
    parser = ShapeParser()
    parser.feed(text)
    parser.close()
    return parser


def structural_validate(repo: Path, about: str, monster: str, code: str, tag: str, direction: str) -> list[str]:
    errors = []
    src_about = (repo / "docs/about/content/he.html").read_text(encoding="utf-8")
    src_monster = (repo / "docs/about/monster/index.html").read_text(encoding="utf-8")
    a0, a1 = html_shape(src_about), html_shape(about)
    m0, m1 = html_shape(src_monster), html_shape(monster)

    if a0.events != a1.events:
        errors.append("about HTML structural fingerprint differs from Hebrew source")
    if a0.ids != a1.ids:
        errors.append("about id sequence differs from Hebrew source")
    if a1.details != 64:
        errors.append(f"about expected 64 details elements, got {a1.details}")
    if m0.events != m1.events:
        # lang/dir/href are intentionally excluded from the structural fingerprint.
        errors.append("monster HTML structural fingerprint differs from Hebrew source")
    if m0.ids != m1.ids:
        errors.append("monster id sequence differs from Hebrew source")
    if not re.search(rf'<html\s+lang="{re.escape(tag)}"\s+dir="{re.escape(direction)}">', monster, flags=re.I):
        errors.append("monster html lang/dir metadata is incorrect")
    if f'href="./monster/{code}.html"' not in about and f"href='./monster/{code}.html'" not in about:
        errors.append("about page does not link to its locale-specific monster page")
    if f'href="../?lang={code}"' not in monster and f"href='../?lang={code}'" not in monster:
        errors.append("monster page does not link back to its locale-specific About page")
    if PAIR_START_ABOUT in about or PAIR_START_MONSTER in monster:
        errors.append("transport delimiters leaked into candidate")
    return errors


def write_pair(outdir: Path, about: str, monster: str) -> None:
    (outdir / "about.html").write_text(about, encoding="utf-8")
    (outdir / "monster.html").write_text(monster, encoding="utf-8")


def verdict(path: Path, token: str) -> str | None:
    lines = [line.strip() for line in path.read_text(encoding="utf-8", errors="replace").splitlines()]
    matches = [line for line in lines if line in {f"{token}: PASS", f"{token}: FAIL"}]
    if len(matches) != 1:
        return None
    return matches[0].split(":", 1)[1].strip()


def translation_prompt(code: str, tag: str, direction: str, outdir: Path) -> str:
    return textwrap.dedent(f"""
    You are creating a NEW, from-scratch translation of two public Hebrew pages for BCP 47 locale {tag} (repository code {code}, direction {direction}).

    Semantic source of truth:
    - docs/about/content/he.html
    - docs/about/monster/index.html

    Read both complete Hebrew files. Translate directly from Hebrew into natural, publication-quality {tag}. Do not use English or any other language as a semantic pivot. Do not search for, read, imitate, or repair older About-article translations; the page was rebuilt and old article prose is obsolete.

    You MAY read docs/i18n/locales/{code}.js solely to recover already-established target-language UI terminology and the canonical localized forms of the 17 cutlet names and 47 month names. Those established calendar-name forms control; do not invent replacements. Preserve intentional absurdity, dry jokes, over-explanations, sales-pitch tone, and the deliberately arbitrary Spleen extension instead of rationalizing them.

    Requirements for docs/about/content/he.html translation:
    - Output an HTML fragment, not a full HTML document.
    - Preserve the exact element/tag structure, element order, id values, class values, data-* attributes, code literals, formulas, numerical values, and disclosure structure.
    - Translate all reader-facing prose naturally, including headings, list prose, the 64 expandable name explanations, research caveats, and the button label.
    - Keep each name entry's visible name consistent with docs/i18n/locales/{code}.js.
    - Do not introduce English leakage unless English is the target language or the string is an immutable proper name/code literal that is intentionally not localized.
    - Keep the monster link as href="./monster/"; the pipeline will rewrite only the href after translation.

    Requirements for docs/about/monster/index.html translation:
    - Output a complete HTML document with exactly the same structural markup and id/class structure.
    - Translate title, intro, back link, every section, and the entire penguin appendix.
    - Keep href="../" unchanged; the pipeline will rewrite only that href after translation.
    - Keep the existing html lang/dir attributes structurally in place; the pipeline will set their exact final values.

    Your response must contain ONLY these four delimiters and the two translations, with no preface, analysis, Markdown fences, or notes:
    {PAIR_START_ABOUT}
    [translated About HTML fragment]
    {PAIR_END_ABOUT}
    {PAIR_START_MONSTER}
    [translated complete Monster HTML]
    {PAIR_END_MONSTER}
    """).strip() + "\n"


NATIVE_PROTOCOL_EN = r"""
You are an independent native-language linguistic reviewer for locale {{TAG}}. Conduct the entire review and final report only in the natural language of {{TAG}}. Another language may appear only when quoting unintended leakage or an immutable proper name, identifier, path, formula, or code literal.

Review these two complete candidate translations:
- artifacts/about-retranslation-2026-10-04/staging/{{CODE}}/about.html
- artifacts/about-retranslation-2026-10-04/staging/{{CODE}}/monster.html

For established site terminology and canonical localized calendar names, you may inspect docs/i18n/locales/{{CODE}}.js. Do not treat an older About translation as authority and do not review from memory.

This is linguistic QA, not merely a missing-string check. Actively look for: translationese; grammar, syntax, agreement, morphology, spelling, punctuation and typography errors; unnatural collocations; wrong register; awkward literal Hebrew calques; inconsistent terminology; wrong script; unintended Hebrew or English leakage; bad treatment of names and proper nouns; humor that ceased to work because the wording became stiff or explanatory; ambiguity introduced by translation; and text likely to wrap or read badly because of gratuitously long wording. Pay special attention to the 64 expandable calendar-name explanations and to the full penguin appendix.

The desired voice is clear public explanatory prose. Straight calendar mechanics must remain easy to understand. Satire should remain dry and matter-of-fact, not be rewritten as winking commentary. Do not make the calendar sound more sensible than the source does. Do not modify files.

Report every real finding with file, section/name entry, reason, and an exact replacement in {{TAG}} when practical. If there is any substantive linguistic problem, fail. End with exactly one machine-readable line:
NATIVE_QA_RESULT: PASS
or
NATIVE_QA_RESULT: FAIL
"""

SEMANTIC_PROTOCOL_HE = r"""
+§×” ç×‘×§×¨ ×¡×× ×˜×™ ×¢×¦×××™. ×”×©×•×•×” ×™×©×™×¨×•×ª ×‘×™×Ÿ ×©× ×™ ××—§×•×¨×•×ª ×”×¢×‘×¨×™×ª ×œ×‘×™×Ÿ ×”×ª×¨×’×•× ×œ×ƒĞ×ª××¡××¨×Ÿ ×¦×™×  ×ª×œ×ª {6TG_{} ×¦×•×“ ×××’×¨ ×{CODE}}). ××™×Ÿ ×œ×”×©×ª×¨××© ×‘×× ×’×œ×™×ª ××• ×‘×ª×¨×’×•× ×™×©×Ÿ ×§×¦×™×.

è§×•×¨×•×ª ×¢×‘×¨×™×™× ××—×™×™×‘×™× ×œ×‘×™×§×•×¨×ª ×–×•:
- docs/about/content/he.html
- docs/about/monster/index.html

ç¦•×¢××“×™× ×œ×‘×“×™×§×”:
- artifacts/about-retranslation-2026-10-04/staging/{{CODE}}/about.html
- artifacts/about-retranslation-2026-10-04/staging/{{CODE}}/monster.html

××•×ª×¨ ×œ×¢×™×™×Ÿ ×‘×€×”ocs/i18n/locales/{{CODE}}.js ×›×“×™ ×œ×××ª ××ª ×”×¦×•×¨×•×ª ×”××§×•××™×•×ª ×©×›×‘×¨ × ×§×‘×¢×• ×œ×©××•×ª ×”×§×¦×™×©×•×ª ×•×ª ×”×—×•×“×©×™×• ×•×œ××™× ×•×ª ×”×××©×§. ××œ ×ª×©× ×” ×§×‘×•×¦×™×.
×¢×‘×•×¨ ×¡×¢×™×£ ××—×¨ ×¡×¢×™×£ ×•××©×¤×˜×™× ××—×¨ ××©×¤×˜, ×§×‘×§ ×”×©×©××˜×”, ×©×œ×œ×”×™× ×”×©×‘××˜×”. ×—×¤×© ×”×©×™×¡×•", ×ª×•×¡×¤×ª ×¢×¨×• ×©×™× ×•×™ ×‘×˜×•×Ÿ, ×©×™× ×•×™ ×‘××™ ×¢×•×©×” ×œ××™, ××¡×¤×¨ ×’×™×—×•×šèƒ^«^W^„°ƒ^C^W^O^|ƒ^G^O^g^_^P°ƒ^{^‡^“^ ¿^K^G^W^p¿^ƒ^W^‡^_^Pƒ^§^K^W^g^g^g^t°ƒ^§^g^ƒ^Tƒ^G^x^íyáz­yíy=y]z¢yMzz}zmyzMy]z¢ıyMy}y]y=zyyRyMzymy]zyy2ıy-yy]yÂyMyy]yÒÂyMzmy-yBzyÂz­y]zmyyByyízMyzyz¢z­y]z}y]zMyBy½y}y]z’Âzyzy]z‚yyíxy]z-y2yMkå6VW"yyRyMz}yzy]yòÂy]zyzy]z‚yy½yÂzMzy‚yzzzMyryMzMyzy-y]y]z)õæuè5æuçK‚‚µäuäõåuéÈ5äuæuåuåõäÈ5ä5êˆ5æõç5å5êuçµåuêˆ5åµå5åuêˆ5å5êuçH5å5çµêµåuê5äµçH5éµê5æuæõå5ç5å5êµä5æuçH5ç5éµåuê5å5êuè5éõäuèµå5äuêué5êˆ5å5æuèµäÎÈ5å5å5èuäuê5éµê5æuæˆ5ç5êuçµê5ä5êˆ5å5çµêuçµèµåuêˆ5å5çµäõåuæuéız£²(	ízMyÍy-y]z^§Štƒ^W^{^*×‚s^g^§Štƒ^S^tƒ^£^›^“^dƒ^S^G^£^W^¨ƒ^{^W^{^W^›^C^g^tìƒ^K^G^W^p€Ğ¼äƒ^S^Tƒ^‡^c^g^g^Pƒ^{^W^^s^c^¨ƒ^§^pƒ^s^o^pƒ^S^g^W^«^ ”¼ÄÀÌƒ^o^s^W^pƒ^S^Ÿ^›^W^W^¨ìƒ^K^G^W^p€Ì¼Ôƒ^S^Tƒ^‡^c^g^g^Pƒ^{^W^_^s^c^¨ƒ^§^pƒ^s^o^pƒ^S^g^W^«^ €Ä¼ÌØÜƒ^o^s^W^pƒ^S^Ÿ^›^W^W^¨È5åuê5åõäuêˆ8 '5æ5åõåuç8 'H5åõæuæuäuêˆ5ç5êuçµê5ä5êˆ5æõç5å5êµè5ä5æuçH5å5êuê5æuê5åuêµæuæuçH5äuçµäõåuç5äuç5æH5ç5å5çµéµæuä5ç5å5åH5å5éµäõéõå‚‚µåuäõä5äµçH5êuå5åõèuê5åuè5åuêˆ5äuèuèµæuèÈ8 'µçµèµç5åuêˆ5å5ç5åuè¸ 'H5è5êuä5ê5åH5åõèuê5åuè5åuêˆ5å5çµêuåuåuéµæuçH5äuå5êµç5å5äuåuê‹5åuç5ä5éõæuäuç5åH5å5êué7§zpå5ê5éµæuè5æuêˆ5åõäõêuå5äuèµéº—–xÎµ­¶9c®2æ—”×•×¤×¢×™× ×”××™×•×ª×¨×™× ×‘×›×•×•× ×” × ×©××¨×• ××¤×•×¨×˜×™× ×•××™×•×ª×¨×™×™× ×‘×›×•×•× ×” ××¤×•×¨×˜×™× ×•××™×•×ª×¨×™× ×‘×›×•×•× ×”.
×“×•×•×— ×¢×œ ×›×œ ×¤×¢×¨ ×××™×ª×™ ×¢× ××œ××ª ×ª××“×•×œ, ×§×•×‘×¥ ××“×•×™×§ ×•×”×¤×¢×ª ×ª×™×§×•×Ÿ. ×× ×™×© ××¤×™×œ×• ×¤×¢×¨ ×¡×× ×˜×™ ××”×•×ª×™, ×”×›×©×œ ××ª ×”×‘×“×™×§×”. ×¡×™×™×• ×‘×“×™×§×•×ª"zyÍyyy]z¢, ×•×©× ×™ ×”×¤×›×œ ×›×œ ×¤×¨×˜×™ ×‘× ×¡×¤×— ×”×¤×™× ×’×•×•×™× ×™×.

äûzgW© ×‘×™×¨ ×œ×›×œ ×¤×¢×¨ ××¡×× ×˜×™ ××”×•×ª×™ ××—×“ ×‘×¡×¢×™×£, ×”×§×©×œ ××ª ×”×‘×“×™×§×”. ×¡×™×™×• ×©×‘×’×¨××¥ ×•××•×¤×™×¢ ××©×”×• ×©×‘×•×’Ø£×™× ×œ×’×¨×•× ×”×™×× ×™, ××– ××ª ×‘×”×™×¨×•×ª ×‘×™×¢ ×§×•×œ×™ ×¦××¦×•×š×” ×—×—×‘×•Ï ×‘×™×‘×™×Ÿé˜°ã×”: ×ª×•×¡×¤×ª ×¢×¨×• ×©×™× ×•×™ ×‘×˜×•×Ÿ, ×©×™× ×•×™ ×‘××™ ×¢×•×©×” ×œ××™, ××¡×¤×¨ ×’×™×—×•×šèƒ^«^W^„°ƒ^C^W^O^|ƒ^G^O^g^_^P°ƒ^{^‡^“^ ¿^K^G^W^p¿^ƒ^W^‡^_^Pƒ^§^K^W^g^g^g^t°ƒ^§^g^ƒ^Tƒ^G^x^íyáz­yíy=y]z¢yMzz}zmyzMy]z¢ıyMy}y]y=zyyRyMzymy]zyy2ıy-yy]yÂyMyy]yÒÂyMzmy-yBzyÂz­y]zmyyByyízMyzyz¢z­y]z}y]zMyBy½y}y]z’Âzyzy]z‚yyíxy]z-y2yMkå6VW"yyRyMz}yzy]yòÂy]zyzy]z‚yy½yÂzMzy‚yzzzMyryMzMyzy-y]y]z)õæuè5æuçK‚‚µäuäõåuéÈ5äuæuåuåõäÈ`9µå5å5êuçµåuêˆ5åµå5åuêˆ5å5êuçH5å5çµêµåuê5äµçH5éµê5æuæõå5ç5å5êµä5æuçH5ç5éµåuê5å5êuè5éõäuèµå5äuêué5êˆ5å5æ{(µäÎÈ5å5å5èuäuê5éµê5æuæˆ5ç5êuçµê5ä5êˆ5å5çµêuçµèµåuêˆ5å5çµäõåuæuéız£²(	ízMyÍy-y]z^§Štƒ^W^{^*×‚s^g^§Štƒ^S^tƒ^£^›^“^dƒ^S^G^£^W^¨ƒ^{^W^{^W^›^C^g^tìƒ^K^G^W^p€Ğ¼äƒ^S^Tƒ^‡^c^g^g^Pƒ^{^W^^s^c^¨ƒ^§^pƒ^s^o^pƒ^S^g^W^«^ ”¼ÄÀÌƒ^o^s^W^pƒ^S^Ÿ^›^W^W^¨ìƒ^K^G^W^p€Ì¼Ôƒ^S^Tƒ^‡^c^g^g^Pƒ^{^W^_^s^c^¨ƒ^§^pƒ^s^o^pƒ^S^g^W^«^ €Ä¼ÌØÜƒ^o^s^W^pƒ^S^Ÿ^›^W^W^¨È5åuê5åõäuêˆ8 '5æ5åõåuç8 'H5åõæuæuäuêˆ5ç5êuçµê5ä5êˆ5æõç5å5êµè5ä5æuçH5å5êuê5æuê5åuêµæuæuçH5äuçµäõåuç5äuç5æH5ç5å5çµéµæuä5ç5å5åH5å5éµäõéõå‚‚µåuäõä5äµçH5êuå5åõèuê5åuè5åuêˆ5äuèuèµæuèÈ8 'µçµèµç5åuè¸ 'H5è5êuä5ê5åH5åõèuê5åuè5åuêˆ5å5çµêuåuåuéµæuçH5äuå5êµç5å5äuåuê‹5åuç5ä5éõæuäuç5åH5å5êué7§zpå5ê5éµæuè5æuêˆ5åõäõêuå5äuèµéº—–xÎµ­¶9c®2æ—”×•×¤×¢×™× ×”××™×•×ª×¨×™× ×‘×›×•×•× ×” × ×©××¨×• ××¤×•×¨×˜×™× ×•××™×•×ª×¨×™×™× ×‘×›×•×•× ×” ××¤×•×¨×˜×™× ×•××™×•×ª×¨×™× ×‘×›×•×•× ×”.
×“×•×•×— ×¢×œ ×›×œ ×¤×¢×¨ ×××™×ª×™ ×¢× ××œ××ª ×ª××“×•×œ, ×§×•×‘×¥ ××“×•×™×§ ×•×”×¤×¢×ª ×ª×™×§×•×Ÿ. ×× ×™×© ××¤×™×œ×• ×¤×¢×¨ ×¡×× ×˜×™ ××”×•×ª×™, ×”×›×©×œ ××ª ×”×‘×“×™×§×”. ×¡×™×™×• ×‘×“×™×§×•×ª"zyÍyyy]z¢, ×•×©× ×™ ×”×¤×›×œ ×›×œ ×¤×¨×˜×™ ×‘× ×¡×¤×— ×”×¤×™× ×’×•×•×™× ×™×.

äûzgW© ×‘×™×¨ ×œ×›×œ ×¤×¢×¨ ××¡×× ×˜×™ ××”×•×ª×™ ××—×“ ×‘×¡×¢×™×£, ×”×§×©×œ ××ª ×”×‘×“×™×§×”. ×¡×™×™×• ×©×‘×’×¨××¥ ×•××•×¤×™×¢ ××©×”×• ×©×‘×•×’Ø£×™× ×œ×’×¨×•× ×”×™×× ×™, ××– ××ª ×‘×”×™×¨×•×ª ×‘×™×¢ ×§×•×œ×™ ×¦××¦×•×š×” ×—×—×‘×•Ï ×‘×™×‘×™×Ÿé˜°ã×”: ×ª×•×¡×¤×ª ×¢×¨×• ×©×™× ×•×™ ×‘×˜×•×Ÿ, ×©×™× ×•×™ ×‘××™ ×¢×•×©×”×œ××™, ××¡×¤×¨ ×’×™×—×•×š ×ª×•×¢Âyy]y=yòyy=yy}yBÂyízzMz‚ıy-yy]yÂızy]zy}yBzy-y]yyyyÒÂzyzyRyyá{µç…êµçµäõåuêˆ5å5èuéõéµæué5åuêˆõå5åõåuäõêuæuåH5å5êuåµåuê5æuäËõäµäuåuç5å5æuåuçK5å5éµäµå5êuç5êµåuéµä5å5ä5çµé5æuê5æuêˆ5êµåuéõåué5å5æõåõåuêK5êuæuè5åuê5äuçµâ5åuèµäÈ5å5¯”ÙY\ˆ5ä5åH5å5éõä5è5åuçË5åuêuæuè5åuê5äuæõç5é5ê5æ5äuè5èué5åÈ5å5é5æuè5äµåuåuè§×™× ×™×.

×‘×“×•×§ ×‘×™×•×—×“ =×š ĞØ ×”×©××•×ª: ×–×”×•×ª ×”×©× ×”××ª×•×¨×’× ×¦×¨×™×›×” ×œ×”×ª××™× ×œ×¦×•×¨×” ×©× ×§×‘×¢×” ×‘×©×¤×ª ×”×™ì¢×“; ×”×”×¡×‘×¨ ×¦×¨×™×š ×œ×©××¨ ××ª ×”××©××¢×•×ª ×”××“×•×™×§õêÈ8 'µé5ç5äµåuê=z(	Òy]yíx«^	Íyz(	ÒyMyÒzzmzMy’yMyzy]z¢yíy]yíy]zmyyyÓ²y-yy]yÂBó’yMyRzyyyyByíy]yıyÍyz¢zyÂyÍy½yÂyMyy]z­z‚Ró2y½yÍy]yÂyMz}zmy]y]z£²y-yy]yÂ2óRyMyRzyyyyByíy]y}yÍyz¢zyÂyÍy½yÂyMyy]z­z‚ó3cry½yÍy]yÂyMz}zmy]y]z¢; ×•×¨×—×‘×ª â€œ×˜×—×•×œâ€ ×—×™×™×‘×ª ×œ×©××¨ ××ª ×›×œ ×”×ª× ××™× ×”×©×¨×™×¨×•×ª×™×™× ×‘××“×•×œ ×‘×œ×™ ×œ×”××¦×™× ×œ×”×• ×”×¦×“×§×”.

×•×“× ×’× ×©×”×—×¡×¨×•× ×•×ª ×‘×¡×¢×™×£ â€××¢×œ×•×¢â€ × ×©××¨×• ×—×¡×¨×•× ×•×ª ×”××©×•×•×¦×™× ×‘×”×ª×œ×”×‘×•×ª, ×•×œ× ×§×™×‘×œ×• ×”×©×¤ŞéÃ” ×¨×¦×™× ×™×ª ×—×“×©×” ×‘×¢×¦ê^Yã:Ö¶Øå¸È7š^S^W^“^‹^g^tƒ^S^{^g^W^«^£^g^tƒ^G^:h