# HANDOFF — /about/ i18n rollout and strict native-language QA
Date: 2026-09-26
Repository: `Sargon17-Green/pastafari-calendar`
Branch: `feature/about-i18n-72-locales`
Verified branch HEAD before this handoff: `09792fc5823c94fed35feaa9d95373e42a7946de`
Verified main at handoff time: `d843ae46587f436e0e2e7eba50364e669352ae8d`

## Scope

Continue the full 72-locale rollout of the public `/about/` explanation page and its final linguistic/semantic/render/PWA QA. Do not merge to `main`.

The Hebrew article remains the semantic master, not a syntactic template.

## Translation state

- `docs/about/content/` currently contains **72 HTML articles**: Hebrew plus every registered target locale.
- No locale remains in `not started`.
- Hebrew is the semantic master / existing source.
- Before this handoff, the ledger has:
  - 9 target locales recorded as `linguistic QA`: `af, az, be, bg, et, fo, fy, gl, ht`.
  - all other target locales still recorded as `draft` (including `fil`).
- The current article invariant checks used throughout the rollout are:
  - exactly 29 stable IDs;
  - no duplicate IDs;
  - semantic table row counts 19 and 9;
  - required formulas/code literals/hashes preserved;
  - no accidental Hebrew leakage;
  - 11 `about.*` wrapper keys in each target locale.

## Exact interruption point: Icelandic

The latest three commits are Icelandic native-language cleanup:

- `706fa799eb5d333ba27581455266ca2b28c83e98` — `i18n(is): replace Danish UI and canonical-name leakage`
- `663845ed2a3dacfa297eb532a2faa389f6fa5ae2` — `i18n(about): naturalize Icelandic technical prose`
- `09792fc5823c94fed35feaa9d95373e42a7946de` — `i18n(about): finish Icelandic native-language cleanup`

At the interruption point:
- `docs/about/content/is.html` exists and has 29 IDs, table sizes 19 + 9, and no Hebrew leakage.
- `is` is **still marked `draft`** in `artifacts/about-i18n-rollout-ledger.md`.
- `artifacts/about-i18n-qa/is.md` does **not yet exist**.
- Therefore the immediate first action in the continuation is to recheck the post-cleanup Icelandic locale, write the Icelandic QA record, and only then move its ledger status to `linguistic QA`.

Existing native-language QA records:
`artifacts/about-i18n-qa/{af,az,be,bg,et,fo,fy,gl,ht}.md`.

## Important: what “native-language QA” must mean

The user explicitly requires the final QA for **every supported language** to be performed so that the **review conversation/session itself is in the language being tested**.

Do not treat a mechanical scan, an English/Hebrew review, a backtranslation, or merely writing a QA note in the target language as a substitute.

For each locale, run a separate same-language LLM review/session that inspects the **whole site in that locale**, not only `/about/`. The reviewer should actively hunt for:
- any text wholly or partly in another language, including hidden English fallback leakage;
- grammatical, idiomatic, stylistic or register problems;
- stiff translationese or prose that does not sound independently native;
- inconsistent terminology between article, main controls, calendar labels, working/action-day UI, comparison UI, year structure, errors, reverse search, metadata, accessibility text and guide;
- wrong script, punctuation, quotation marks, capitalization, spacing, plural behavior, numerals and date-expression conventions;
- RTL/BiDi problems where relevant;
- untranslated ARIA/title/meta/manifest/noscript/error/fallback text;
- truncation, overflow, awkward wrapping, tables or controls broken by localized text.

A locale is not approved merely because all strings are translated.

### Caution about the nine existing `linguistic QA` entries

They contain genuine locale-wide cleanup work and target-language QA records, but the final project gate must satisfy the user's stricter requirement literally. If there is any doubt that a locale was reviewed in an actual same-language LLM conversation/session, **re-run it under that strict procedure before final PASS**. Do not infer final compliance from the existence of the Markdown QA artifact alone.

## Per-locale technical checks

In addition to native-language review:
- compare locale message-key coverage with the English contract (currently 258 keys in reviewed locales);
- preserve all `{placeholder}` sets exactly;
- verify article stable IDs against Hebrew in the same order;
- verify no duplicate IDs;
- verify semantic tables remain 19 + 9 rows;
- preserve formulas, hard-coded numbers, commit hash, code literals, algorithm names and canonical identifiers;
- distinguish intentional technical literals from accidental English leakage;
- render and inspect the locale, including desktop and 390px mobile.

Locale-wide defects already documented in the ledger include mixed/wrong languages in several pre-existing locale modules. Repair the whole locale when encountered; do not limit the fix to the article.

## Status semantics

Use the existing explicit progression:
`not started → draft → semantic QA → linguistic QA → integrated → rendered → PASS`.

Do not mark a locale `PASS` just because textual cleanup is complete.
`PASS` requires the strict same-language review plus clean rendered smoke/visual checks and the relevant semantic/structural checks.

## Final project gates before Draft PR

Do not call the rollout complete until all registered locales satisfy the original task:
1. all locales load their own article without normal Hebrew fallback;
2. stable IDs and semantic invariants are intact;
3. strict same-language LLM QA has been completed for every locale;
4. whole-site language leakage/translationese findings are fixed;
5. RTL/BiDi are correct;
6. no layout overflow/broken wrapping;
7. PWA/offline and language switching remain correct;
8. checksums are updated;
9. relevant unit/node, i18n coverage, support-level, browser smoke, accessibility, visual regression, PWA/offline and other CI gates are green;
10. only then open a **Draft PR** with a detailed summary.

**Do not merge the PR.**

## What comes after this project

Only after the `/about/` rollout and the strict QA above are completely finished should work move to the next stage:

`https://sargon17-green.github.io/Pastafarian-Calendar/`

That next stage concerns the main calendar site. Do **not** start it early or in parallel with unfinished strict QA here.

## First continuation actions

1. Re-read the current branch HEAD; do not assume this handoff SHA is still current if the branch moved.
2. Read:
   - `artifacts/about-i18n-rollout-ledger.md`
   - `artifacts/about-i18n-qa/*.md`
   - the Icelandic cleanup commits/files above.
3. Finish/record Icelandic QA at the exact interruption point.
4. Continue strict native-language whole-site QA systematically for every remaining locale.
5. Keep the ledger and per-locale QA artifacts current after each locale.
