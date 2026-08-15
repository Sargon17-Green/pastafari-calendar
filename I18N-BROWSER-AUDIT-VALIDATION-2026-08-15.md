# i18n Browser Audit Validation — 2026-08-15

## Purpose

This document records the final browser-level validation of the Pastafari Calendar internationalization layer after the 89-locale audit.

It also documents one non-reproducible timeout observed for Thai (`th`) during the initial full run, and the focused rerun performed to determine whether that timeout represented a product defect.

## Test command

The full audit was run from a local Windows working copy with:

```powershell
node scripts\run-i18n-browser-audit.mjs --no-screenshots
```

A focused follow-up for Thai was run with:

```powershell
node scripts\run-i18n-browser-audit.mjs --locale th --no-screenshots
```

The audit used Chromium and the fixed test state defined by the audit script:

- target JDN: `2461266`
- calculation JDN: `2461266`
- search date: `2026-08-14`

## Environment

Both runs reported:

- Node.js: `v26.7.0`
- platform: Windows (`win32`)
- architecture: `x64`
- browser: Chromium
- screenshots: disabled

The working copy was downloaded rather than run from a Git clone, so the audit reported the Git HEAD as **not verified**. This is a provenance limitation of these local reports; it is not a test failure.

## Full 89-locale run

Report timestamps (UTC):

- started: `2026-08-14T22:09:23.757Z`
- completed: `2026-08-15T07:09:22.393Z`
- elapsed wall-clock time: `8:59:58.636`

Discovery and registration were internally consistent:

- locale files found: **89**
- registered locales: **89**
- selector locales: **89**
- files present but not registered: **0**
- registered locales absent from selector: **0**
- selector entries without locale files: **0**

Results:

- fully passed locales: **88**
- failed active locales: **1** (`th`)
- layout findings: **0**
- runtime errors: **1**
- global result reported by this run: **FAIL**

### The Thai anomaly in the full run

Thai (`th`) was the only locale marked FAIL. The report did **not** identify a translation, directionality, registration, persistence, or layout defect in Thai.

The following Thai checks succeeded in that same run:

- locale file and registry/selector presence
- `lang="th"` and `dir="ltr"`
- translation scan: no untranslated entries, empty entries, replacement characters, or literal escape findings
- desktop layout: no findings
- mobile layout: no findings
- locale switch: passed
- locale persistence and URL override behavior: passed
- smoke interaction: passed
- fast-engine identity / locale invariance: preserved

The only abnormal findings for `th` were:

1. a warning that the year structure did not settle within 60 seconds; and
2. a subsequent `error.timeout` console error during the `direct-load` phase.

The full run's wall-clock duration was almost exactly nine hours. That duration is anomalous for the completed work and is consistent with the test host having been suspended, powered off, or otherwise paused while the audit was in progress. The report alone cannot prove the exact external cause, so the initial Thai result was treated as **requiring reproduction**, not as sufficient evidence of a Thai/product defect.

## Focused Thai rerun

To test reproducibility, the audit was rerun for Thai only while the machine remained available.

Report timestamps (UTC):

- started: `2026-08-15T07:19:07.721Z`
- completed: `2026-08-15T07:46:36.726Z`
- elapsed wall-clock time: `0:27:29.005`

Focused result:

- requested locale: `th`
- Thai browser audit: **PASS**
- failed active locales: **0**
- runtime errors: **0**
- layout findings: **0**
- global status: **PASS**
- audit summary: **PASS/WARN/FAIL = 89/0/0**

The focused report contained no Thai findings. Translation, directionality, desktop/mobile layout, language switching, persistence, smoke behavior, and locale invariance all passed.

## Final interpretation

The single Thai timeout from the initial full run is **not reproducible**.

Because:

- 88 other locales completed successfully in the full run;
- the Thai locale itself passed all non-timeout checks in that run;
- the initial run had an anomalous approximately nine-hour wall-clock duration; and
- the immediate focused rerun of `th` completed with no warnings, failures, runtime errors, or layout findings;

the initial `th` timeout is classified as an **environmental/interruption-related test anomaly**, not a demonstrated product defect.

No code change is warranted solely on the basis of that initial timeout, and a second full 89-locale rerun is not required for closure.

## Final status

**i18n browser validation: PASS.**

The evidence consists of:

1. the full 89-locale browser audit, which passed 88 locales and produced one non-reproducible Thai timeout; and
2. the focused Thai rerun, which passed cleanly and removed the only unresolved browser-audit concern.

This validation is browser/runtime/layout automation. It does not constitute native-speaker review of translation quality or glyph aesthetics.
