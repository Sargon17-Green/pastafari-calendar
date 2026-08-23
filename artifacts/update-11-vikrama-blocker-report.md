# Update 11 — Vikrama audit and normative-source blocker

**Result:** `BLOCKED_NORMATIVE_SOURCE_INCOMPLETE`  
**READY_FOR_UPDATE_12:** `false`  
**Production changes:** none

## Baseline

- Repository: `Sargon17-Green/pastafari-calendar`
- Branch: `main`
- Audited commit: `ef7c5a3c1e5027c1bdc3703f4a4345de0be94e5c`
- `package.json`: `1.3.0`
- Update 10 is already recorded as `UPDATE_10_CLOSED` / `READY_FOR_UPDATE_11 = yes`.

The supplied ZIP was checked against identifying repository content before preparing this delta. No production file is modified by Update 11's blocker package.

## Existing Hindu/Vikrama inventory

The package root and browser core expose:

- `HinduDate`
- `OldHinduLunarDate`
- `OldHinduSolarDate`
- `hinduToJdn` at the package root

The docs converter exposes calendar IDs:

- `hindu-old-solar`
- `hindu-old-lunar`

No package-root or browser-core export named Vikrama/Vikram/Vikram Samvat exists in the audited baseline.

## Foundation discriminator

The Update 11 task supplies the Magillah discriminator as:

```text
Foundation JDN = -13334246
Vikrama year   = -41162
month          = Kārttika (8)
leapMonth      = false
tithi          = 16
leapTithi      = false
```

The repository **does contain the Magillah** at `sources/מגילת העיתים.md`. It gives this Foundation discriminator directly. It also states in footnote [^2] that “algorithmic extension” is not one unique standard method and that the algorithm/version used is part of the date definition; footnote [^7] says several Hindu methods and rules exist. Footnote [^11] settles signed year numbering by placing year `0` between `1` and `-1`.

What the Magillah does **not** provide is the identity or full formulas of the Hindu algorithm/version that produced the anchor. Therefore the anchor can reject incompatible converters, but cannot by itself establish the complete convention for arbitrary dates.

## Existing converter reproduction

Using the actual public API:

```text
OldHinduLunarDate(-41162, 8, 16, false)
→ JDN -14446099
→ Foundation difference = -1111853 days

OldHinduSolarDate(-41162, 8, 16)
→ JDN -14446083
→ Foundation difference = -1111837 days
```

Therefore neither existing Old Hindu converter is an alias for the supplied Vikrama representation.

## Epoch-only translation also fails

CALENDRICA's traditional Hindu lunar candidate uses a Vikrama-era displacement of `3044`. Diagnostic shadow-year testing therefore tries:

```text
-41162 + 3044 = -38118
```

The actual legacy Old Hindu Lunar converter gives:

```text
OldHinduLunarDate(-38118, 8, 16, false)
→ JDN -13334243
→ 3 days after Foundation

OldHinduLunarDate(-38118, 8, 13, false)
→ JDN -13334246
→ Foundation exactly
```

Thus a simple epoch/year relabel is also not semantically equivalent. Tithi/day assignment differs.

## Candidate reference found

A clear independent candidate exists in Reingold's CALENDRICA `calendar-code2` traditional Hindu lunar implementation, pinned at commit:

`9afc1f3277b839db1a70c2350d6c708ac83df78f`

Its relevant family uses `hindu-lunar-era = 3044`, a new-moon scheme, Hindu sunrise, 12-degree tithi sectors, leap-month determination from consecutive new moons, and repeated tithi from consecutive sunrises. This candidate reproduces the supplied Foundation fields exactly.

It is **not promoted to the project's normative reference** in this delta.

## Why implementation is blocked

The task explicitly forbids choosing a Vikrama convention externally by intuition. The Magillah is the normative project source, but its own footnotes make the algorithm/version part of the date definition without identifying that algorithm/version. It therefore does not settle the following algorithmic choices:

1. exact algorithm/version identity;
2. epoch definition;
3. year boundary (Caitra/Kārttika or other);
4. amānta/pūrṇimānta convention;
5. tithi-to-civil-day assignment rule;
6. leap-month semantics;
7. repeated/omitted tithi semantics;
8. negative-year/year-zero convention;
9. exact constants and rounding/floor rules.

The signed-year-zero convention is **not** missing: footnote [^11] explicitly defines year zero for signed integer year numbers. The blocker concerns the remaining Hindu-calendar semantics.

A single matching Foundation anchor cannot prove those choices uniquely. Implementing CALENDRICA merely because it matches that anchor would violate Update 11's own source-of-truth rule.

## Classification

Technically, the audited production state is closest to:

`B. Vikrama חסר לחלוטין`

But the repair is blocked before production implementation by missing normative semantics:

```text
UPDATE_11_RESULT = BLOCKED_NORMATIVE_SOURCE_INCOMPLETE
READY_FOR_UPDATE_12 = false
```

## Scope of this delta

This upload adds evidence only:

- blocker report;
- machine-readable evidence;
- reproducible public-API audit runner;
- candidate-reference provenance note;
- updated repository checksum manifest.

It does **not**:

- add a Vikrama production API;
- modify Old Hindu Solar/Lunar;
- change browser/Worker/standalone behavior;
- add an alias;
- add a fixture-only converter;
- promote CALENDRICA to normative status.

## Next required input

Before Update 11 can be repaired and closed, add or identify a project-normative source that explicitly selects the Vikrama algorithm/conventions above. After that source lock, the candidate can be tested as the real reference and, only if confirmed, a deliberately indirect/spaghetti production adapter can be implemented and verified.


## Validation performed for this delta

The audit-only delta was validated on the supplied snapshot after normalizing the ZIP tool's escaped Unicode filenames back to their canonical GitHub names.

- `node verification/update11/run-vikrama-blocker-audit.mjs` — PASS; evidence JSON reproduced.
- `npm test` — PASS: 208 tests total, 204 passed, 0 failed, 4 skipped.
- `npm run package:verify` — PASS: `pastafari-calendar@1.3.0`, 284 packed files.
- no standalone/browser/Worker rebuild is required because this delta changes no production or generated runtime file.
- `npm run checksums:verify` — PASS after the final minimal manifest update: docs=111, repository=829.
