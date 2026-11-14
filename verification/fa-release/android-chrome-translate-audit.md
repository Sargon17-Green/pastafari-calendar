# Real Android Chrome Persian translation integrity — PR #41

**Status:** Automated physical-device browser smoke has validated an *ephemeral patched preview*; final GitHub source verification and human screen-reader sign-off remain separate requirements.

## Device and transport

- Date: 2026-11-14 (local Asia/Jerusalem).
- Android device model: `2407FPN8EG`; Android 16; physical screen 1220 × 2712, density 520dpi.
- One authorized ADB device, Chrome installed. No APK install, root operation, OS setting edit, process termination, or persistent monitoring.
- A temporary localhost HTTP server served exact public GitHub source blobs from release candidate `816b8f76f074e66082cb50e05f224d6acd2262a4` through `adb reverse`; Chrome was inspected using its Android DevTools endpoint through `adb forward`. Server and both ADB mappings were removed after every run.
- Executed via the previously authorized Google Drive one-shot runner. Source scripts and logs identified by `RUN_FA41_ANDROID_READONLY_PREFLIGHT_v001.py`, `RUN_FA41_ANDROID_CHROME_SMOKE_v001.py`, `RUN_FA41_ANDROID_CHROME_SMOKE_v002.py`, `RUN_FA41_ANDROID_CHROME_SMOKE_v003.py`, `RUN_FA41_ANDROID_CHROME_PATCHED_PREVIEW_v004.py`. The operational runner folder is [OTR](https://drive.google.com/drive/folders/1ZmwR8Mp-pN90ahaTXaj8DosGcD6WqwQP), external to GitHub.

## Initial browser findings (unmodified code)

- All 64 About disclosures were present; 15 article TOC sections, plus one separate site-usage section; article `lang=fa`, `dir=rtl`, no horizontal overflow.
- Persian Monster: 39 preserved section IDs, 21 penguin notes, `lang=fa`, `dir=rtl`, no horizontal overflow.
- Unexpected destructive Chrome automatic translation: `html.className` included `translated-rtl`; the first About canonical name had `dataset.canonicalNameId=bronze`, `lang=fa`, but DOM text `ברנז` (Hebrew Unicode points 1489,1512,1504,1494), while the fetched Persian HTML and live Persian registry both held `برنز` (1576,1585,1606,1586). Other names such as `روباه` were replaced with Hebrew transliterations. Chrome inserted nested `<font dir=auto>` wrappers. This was reproduced in multiple runs on different temporary localhost ports; reassigning the Persian label was overwritten again by translation.
- The first smoke script mistakenly expected 15 `[data-toc-section]` elements globally, while the site correctly has 15 in the article and one in site-usage. The expectation was corrected in subsequent scripts. This was a **test counting bug**, not a site content defect.
- The missing root `favicon.ico` (HTTP 404 in preview) did not affect these checks; actual site favicon was fetched from `/icons/`.

## Corrective prototype and measured result

An **in-memory patched preview**, not a repository write, was tested using `RUN_FA41_ANDROID_CHROME_PATCHED_PREVIEW_v004.py`:

- `synchronizeCanonicalNameSummaries` marks each localized canonical `<summary>` with `translate=no` and `class=notranslate`.
- The About loader marks an already-localized article `translate=no`/`notranslate`, leaving Hebrew fallback text eligible for browser translation.
- Persian Monster has `<meta name=google content=notranslate>`.
- **PASS_ANDROID_CHROME_BASIC**: 64/64 name disclosures loaded, first name `برنز` matched DOM/source/runtime registry, first ten disclosure names retained original Persian spellings, last name `ماسه`; 15 About article sections and 16 including site-usage; zero horizontal overflow. Monster 39 sections, 21 notes, zero horizontal overflow. The browser retained `translated-rtl` at document level, but the protected canonical names had `translate=false` and remained correct even after manually reassigning the first label.
- All temporary HTTP/ADB resources cleaned up successfully.

## Code integration and remaining acceptance

- The patch was integrated at source commit [`81f9b5f6cc1ce0ec7b9c1d62cd325ea3fe71ca84`](https://github.com/Sargon17-Green/pastafari-calendar/commit/81f9b5f6cc1ce0ec7b9c1d62cd325ea3fe71ca84), along with the corresponding unit tests and PWA cache-version changes. This report is attached to the final review documentation after source integration.
- **Must be independently re-tested at the final PR SHA**. A patched preview pass is not proof that the exact committed artifact passes.
- This does **not** certify TalkBack, NVDA, VoiceOver, keyboard accessibility, full visual semantics, Safari/iOS, or native Persian editorial quality; those remain open in [Issue #42](https://github.com/Sargon17-Green/pastafari-calendar/issues/42).
