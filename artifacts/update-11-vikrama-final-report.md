# Update 11 — Vikrama normative implementation and closure candidate

## Status

```text
UPDATE_11_IMPLEMENTATION_RESULT = PASS
UPDATE_11_FINAL_AUDIT = PASS
READY_FOR_UPDATE_11_CLOSURE_AFTER_UPLOAD_AND_GREEN_CI = yes
READY_FOR_UPDATE_12_AFTER_UPDATE_11_CLOSURE = yes
BASE_MAIN_COMMIT = fd944630830c8347b2ad701f84c5d079d4fb9057
PACKAGE_VERSION = 1.3.0
```

This report supersedes the earlier blocker status for Update 11. The blocker audit correctly established that the Magillah anchor was insufficient to identify a unique Hindu algorithm. Historical provenance of the original anchor was **not** recovered. Update 11 therefore resolves the underspecification explicitly by adding a source-lock addendum; it does not pretend that the selected source was proven to be the historical source of the pre-existing anchor.

The canonical Magillah file `sources/מגילת העיתים.md` remains byte-for-byte unchanged. Its SHA-256 is still:

```text
d36b0c944b4685d1aa1d89bb20a8dd530ee3167c897dcdf85161a7ec0dde9c96
```

The normative clarification is isolated in `sources/vikrama/CALENDRICA-4-VIKRAMA-SOURCE-LOCK.md`.

## Normative source lock

Update 11 locks the project's Vikrama convention to:

- CALENDRICA 4.0 traditional Hindu lunisolar calendar, new-moon scheme;
- Edward M. Reingold and Nachum Dershowitz;
- repository `EdReingold/calendar-code2`;
- commit `9afc1f3277b839db1a70c2350d6c708ac83df78f`;
- `calendar.l` blob `2e4ad0f58ac52cb5fd497aa97b2b9ffe57ec623d`;
- traditional `hindu-lunar-from-fixed` / `fixed-from-hindu-lunar` semantics and their called constants/helpers;
- Vikrama era displacement `3044`;
- amānta/new-moon lunar-month scheme;
- Kārttika = month 8;
- tithi determined at source-locked Hindu sunrise at Ujjain;
- leap-month and repeated-tithi semantics exactly as defined by the pinned CALENDRICA algorithm;
- signed integer year numbering including year zero, as already required by the Magillah.

Third-party provenance and the Apache-2.0 license are retained in `THIRD_PARTY_NOTICES.md` and `THIRD_PARTY_LICENSES/CALENDRICA-APACHE-2.0.txt`.

## Classification before repair

```text
B_VIKRAMA_MISSING
```

The old public Hindu surface exposed Old Hindu Lunar / Old Hindu Solar, but no normative Vikrama converter.

Literal Old Hindu interpretation of the Foundation discriminator was demonstrably wrong:

| Interpretation | JDN | Delta from Foundation |
| --- | ---: | ---: |
| Foundation | -13,334,246 | 0 |
| Old Hindu Lunar (-41162, 8, 16, non-leap) | -14,446,099 | -1,111,853 |
| Old Hindu Solar (-41162, 8, 16) | -14,446,083 | -1,111,837 |

A mere era shift was also insufficient: with shadow year `-38118`, Old Hindu Lunar tithi 16 lands at JDN `-13,334,243` (three days late), while tithi 13 happens to land on Foundation. Therefore the repair cannot be a constant year/JDN offset or an alias to Old Hindu Lunar.

## Production implementation

The implementation is deliberately spaghetti-style and additive. It does not remove or refactor the existing Old Hindu converters.

Public flow:

```text
Vikrama request
→ build shadow OldHinduLunarDate with year + 3044
→ call unchanged legacy hinduToJdn as a mandatory witness
→ hidden CALENDRICA Hindu engine computes the exact source-locked result
→ apply the correction relative to the legacy witness
→ return structured Vikrama result
```

The mandatory witness is intentional. If the legacy witness throws or returns malformed state, the Vikrama path fails closed; it cannot silently return a normative Vikrama answer after bypassing the side route.

The reverse conversion is a bounded local inversion of the source-locked forward mapping. It compares all structured fields (`year`, `month`, `leapMonth`, `tithi`, `leapTithi`) and rejects omitted/non-existent tithi representations rather than guessing. It does not scan linearly across millennia.

The new public API is:

```text
VikramaDate
VIKRAMA_MONTH_NAMES
jdnToVikrama(jdn)
vikramaToJdn(value)
calendarDateToJdn({ calendar: "vikrama", ... })
```

Matching declarations were added to the public TypeScript declarations. A separate browser side-door module exposes the same arithmetic without using `Intl`, `Temporal`, ICU, or host calendar services.

## Foundation and neighboring days

Foundation JDN is `-13,334,246` and now converts exactly to:

```text
year       = -41162
month      = 8
monthName  = Kārttika
leapMonth  = false
tithi      = 16
leapTithi  = false
```

Neighboring days are not fixture aliases:

```text
JDN -13,334,247 → Kārttika tithi 15
JDN -13,334,246 → Kārttika tithi 16
JDN -13,334,245 → Kārttika tithi 17
```

## Independent differential verification

The verification reference in `verification/update11/vikrama-reference.mjs` is independently implemented and does not import the production Vikrama module.

Final audit:

```text
Foundation ±1000 days inclusive: 2001 samples
forward mismatches:              0
production round-trip mismatches: 0

random seed:                     0x11c0ffee
random samples:                  512
JDN range:                       -50,000,000 .. +50,000,000
forward mismatches:              0
production round-trip mismatches: 0
reference round-trip mismatches:  0
```

The machine-readable evidence is `artifacts/update-11-vikrama-final-audit.json`.

## Boundary semantics

Verified examples include:

- year boundary: `-13,339,223` = year `-41176`, Phālguna 30; next day `-13,339,222` = year `-41175`, Caitra 1;
- ordinary month boundary: Caitra 30 → Vaiśākha 1;
- leap month: Jyaiṣṭha leap month begins at JDN `-13,338,455`, later followed by ordinary Jyaiṣṭha;
- repeated tithi: JDN `-13,339,246` and `-13,339,245` are both tithi 7, with the second marked `leapTithi=true`;
- omitted tithi: tithi 16 is followed directly by tithi 18 at JDN `-13,339,236/-13,339,235`; requesting the omitted tithi 17 is rejected;
- signed years `-2`, `-1`, `0`, `1`, `2` all round-trip, including year zero.

## Legacy preservation and fault injection

The pre-existing converters remain unchanged. Regression anchors remain:

```text
Old Hindu Lunar Foundation literal → -14,446,099
Old Hindu Solar Foundation literal → -14,446,083
Old Hindu Lunar positive-year sample (5127,5,1) → 2,461,266
```

Fault injection confirms that a throwing legacy witness and a malformed witness return both prevent the new Vikrama path from producing a silent answer.

`Intl` and `Temporal` were replaced with throwing proxies during the Update 11 unit test; normative Vikrama conversion continued to pass, proving that its arithmetic is not delegated to those host facilities.

## Test status on the exact closure-candidate worktree

```text
npm test
  tests:   218
  pass:    214
  fail:    0
  skipped: 4

node verification/update11/run-vikrama-final-audit.mjs
  PASS
  Foundation window: 2001/2001, zero mismatches
  random: 512/512, zero mismatches

npm run package:verify
  PASS
  package: pastafari-calendar@1.3.0
  files:   289
  packed:  90,212,953 bytes
```

The dedicated local Playwright browser smoke could not be executed in this stripped worktree because `node_modules` is absent and `playwright` is therefore unavailable (`ERR_MODULE_NOT_FOUND`). This is an environment limitation, not a reported browser-test failure. The CI workflow is updated to execute `npm run test:update11:vikrama:browser` after its existing Playwright installation step, so the upload must still receive green CI before Update 11 is declared closed on `main`.

The previously known long compatibility/deep suites were not reclassified as PASS from this local run. Update 11 closure therefore relies on the repository CI for the environment-backed browser/heavy gates after upload.

## Files changed by the closure candidate

Production/API/integration:

- `browser/vikrama-api.js`
- `browser/vikrama-detour.js`
- `src/public-api.js`
- `types/5fd0767aaf5331241ec60f8540edf2a6.d.ts`
- `package.json`
- `.github/workflows/test.yml`

Normative source and licensing:

- `sources/vikrama/CALENDRICA-4-VIKRAMA-SOURCE-LOCK.md`
- `sources/SHA256SUMS.txt`
- `THIRD_PARTY_NOTICES.md`
- `THIRD_PARTY_LICENSES/CALENDRICA-APACHE-2.0.txt`

Tests and verification:

- `test/update11-vikrama.test.js`
- `test/update11-vikrama-browser.html`
- `scripts/run-update11-vikrama-browser-smoke.mjs`
- `verification/update11/vikrama-reference.mjs`
- `verification/update11/run-vikrama-final-audit.mjs`
- `artifacts/update-11-vikrama-final-audit.json`
- `artifacts/update-11-vikrama-final-report.md`
- `artifacts/update-11-vikrama-final-sha256sums.txt`
- root `SHA256SUMS.txt`

No old Hindu production file is deleted or rewritten.

## Closure rule

This local closure candidate is accepted for upload. Update 11 becomes closed when this delta is present on current `main` and the repository CI is green.

At that point the intended status is:

```text
UPDATE_11_RESULT = COMPLETE
UPDATE_11_CLOSED = yes
READY_FOR_UPDATE_12 = yes
```
