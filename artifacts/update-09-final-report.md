# Update 9 — Proleptic negative-year calendar API audit and fix

## Result

`UPDATE_9_RESULT = PASS_WITH_ENVIRONMENT_LIMITATIONS`

The negative-year finding reproduced on the current `main` snapshot for the package/browser public class API. The failure was a domain/validation/public-entry restriction, not a disagreement between the arithmetic converter and an independent reference, for all six normative calendars in scope.

The fix is intentionally spaghetti-like and non-refactoring: the old validators and raw authoritative bundle remain physically present. A narrow detour intercepts only non-positive years for the six in-scope calendar classes, routes the signed values through the existing browser/docs converter path, and falls back to the legacy public API for positive years, invalid shapes, unsupported variants, and ordinary errors.

## Baseline

- Repository: `Sargon17-Green/pastafari-calendar`
- Checked current GitHub `main` head reported by GitHub connector: `86b511e46f6622f136d3501b835d1098b2910100`
- Uploaded working snapshot timestamp: `2026-08-23 00:59`, matching the observed head upload window.
- `package.json` version: `1.3.0`
- Update 8 state found in artifacts: `UPDATE_8_RESULT = COMPLETE`; no Stage 8 blocker found for Update 9.
- Pastafari reference/oracle present: `verification/reference-oracle/`
- Differential runner present: `verification/reference-oracle/differential.mjs`
- Coordinate system used here: integer JDN. Foundation JDN is `-13334246`; Foundation linear Gregorian ordinal/index is `-15055671`.

## Normative source and year-numbering convention

The normative source is `sources/מגילת העיתים.md`. It explicitly treats the listed calendar dates as proleptic/computational extensions, and uses signed integer years including year zero where the historical calendar has no real historical year. The tested Foundation representations are:

| Calendar | Normative representation | Year convention used in Update 9 |
|---|---:|---|
| Hebrew | 19 Sivan `-37460` AM | signed proleptic AM integer, includes year 0 |
| Islamic civil/tabular Hijri | 27 Rabiʿ I `-43126` AH | signed arithmetic Hijri integer, includes year 0 |
| Saka | 1 Pausha `-41299` | signed proleptic Saka integer, includes year 0 |
| Ethiopic | 1 Hidar `-41227` | signed proleptic Ethiopic integer, includes year 0 |
| Coptic | 1 Hathor `-41503` | signed proleptic Coptic integer, includes year 0 |
| Bahá’í western arithmetic | 11 Masá’il `-43064` | signed arithmetic western extension, not Tehran/sunset/historical mode |

Masá’il is month `15` in the project’s Bahá’í month ordering.

## Converter inventory

- Package public API: `src/public-api.js`
- Raw authoritative package bundle: `src/5efdcc3e6fb071cbaffdcb117507a169dd76.js`
- Browser core wrapper: `browser/pastafari-calendar-core.js`
- Browser raw chronicle: `browser/pastafari-calendar-core-chronicle.js`
- Browser/docs input converter: `docs/calendar-converters.js`
- New detour: `browser/proleptic-negative-year-detour.js`
- Standalone artifacts: `browser/standalone/pastafari-date.js`, `browser/standalone/pastafari-date.min.js`

The standalone bundle is not the direct public surface for these external calendar conversion constructors/functions. Its existing self-contained artifact tests passed, but a fresh standalone rebuild was blocked by missing `esbuild` in this environment.

## Before/after Foundation matrix

| Calendar | Public API before | Internal/browser-input before | Independent reference | Public API after | Classification |
|---|---|---:|---:|---:|---|
| Hebrew | `RangeError: השנה העברית חייבת להיות חיובית` | `-13334246` | `-13334246` | `-13334246` | A — package public validation only; docs path already correct |
| Islamic civil | `RangeError: השנה ההיג׳רית חייבת להיות חיובית` | `-13334246` | `-13334246` | `-13334246` | A — package public validation only; docs path already correct |
| Saka | `RangeError: שנת סאקה חייבת להיות חיובית` | `-13334246` | `-13334246` | `-13334246` | A — package public validation only; docs path already correct |
| Ethiopic | `RangeError: השנה אתיופי חייבת להיות חיובית` | `-13334246` | `-13334246` | `-13334246` | A — package public validation only; docs path already correct |
| Coptic | `RangeError: השנה קופטי חייבת להיות חיובית` | `-13334246` | `-13334246` | `-13334246` | A — package public validation only; docs path already correct |
| Bahá’í western arithmetic | `RangeError: השנה הבהאית חייבת להיות חיובית`; docs also rejected `The Baha'i year must be positive.` | after scoped docs detour: `-13334246` | `-13334246` | `-13334246` | A — validation/domain restriction in package and docs western-arithmetic guard |

Machine-readable matrix: `artifacts/update-09-proleptic-negative-year-audit.json`.

## Spaghetti mechanism

The public API now behaves as follows for the six normative negative-year paths:

```text
negative public date object enters
→ narrow detour recognizes only the legacy class and calendar family
→ a hidden Symbol-marked shadow input preserves the true signed year
→ the old raw validator is left intact and still rejects if called directly
→ the wrapper uses the existing browser/docs conversion side door with the true signed year
→ invalid month/day/leap errors still come from the converter path
→ positive years and unsupported variants fall back to the original raw API
```

The raw authoritative bundle was not rewritten. No converter was replaced with the independent reference. No general `return true` validator or clean base class was introduced.

For Bahá’í, only the western arithmetic branch was opened. The Tehran-equinox path still rejects negative years and remains out of scope for this update.

## Reference implementation

A separate reference was added at `verification/update9/proleptic-negative-year-reference.mjs`. It does not import production converters. It implements:

- mathematical floor division and non-negative modulo for negative integers;
- Hebrew calendar postponement/leap/month-length rules;
- tabular Islamic 30-year cycle;
- Saka through the project’s proleptic Gregorian offset model;
- Ethiopic/Coptic 13-month arithmetic calendars;
- Bahá’í western arithmetic March-21 model;
- JDN → calendar reverse conversion for round-trip checks.

## Tests added

`test/update09-proleptic-negative-year.test.js` covers:

- Foundation vectors for all six calendars;
- Node public API and browser core parity;
- boundary sweep for years `-2, -1, 0, 1, 2`;
- negative leap and non-leap cases;
- modulo/floor behavior for negative years;
- invalid month/day still rejected;
- positive-year behavior unchanged versus raw public API;
- Tehran Bahá’í negative path still rejected;
- 300 deterministic random negative cases: 50 per calendar;
- public/reference mismatch count `0`;
- docs/reference mismatch count `0`;
- round-trip mismatch count `0`;
- exception count `0` for valid random samples.

## Validation results

Passed:

```text
node scripts/run-update09-proleptic-negative-year-audit.mjs
node --test test/update09-proleptic-negative-year.test.js
npm test
npm run package:verify
npm run checksums:generate
npm run checksums:verify
```

Observed summaries:

```text
update09 test: 7/7 PASS
npm test: 206 tests; 202 pass; 4 skipped; 0 fail
package:verify: PASS — pastafari-calendar@1.3.0, files=274
checksums:verify: PASS — docs=110, repository=631
```

Blocked/partial:

```text
npm run build:standalone
```

failed because this container has no `node_modules` and cannot resolve `esbuild`:

```text
Error [ERR_MODULE_NOT_FOUND]: Cannot find package 'esbuild' imported from scripts/build-standalone.mjs
```

`npm ci --offline` also failed because `playwright-core-1.62.1.tgz` is not cached. A normal online dependency install or CI run is needed for fresh standalone rebuild and browser/Playwright gates.

```text
npm run test:compatibility
```

timed out after 300 seconds in this environment before producing a TAP test result.

```text
npm run test:deep
```

timed out after 300 seconds after the first 3 subtests had passed.

## Changed files

```text
SHA256SUMS.txt
docs/SHA256SUMS.txt
package.json
src/public-api.js
browser/pastafari-calendar-core.js
browser/proleptic-negative-year-detour.js
docs/calendar-converters.js
scripts/run-update09-proleptic-negative-year-audit.mjs
test/update09-proleptic-negative-year.test.js
verification/update9/proleptic-negative-year-reference.mjs
artifacts/update-09-proleptic-negative-year-audit.json
artifacts/update-09-final-report.md
```

## SHA-256 of main changed source/test files

```text
browser/proleptic-negative-year-detour.js e403e0ced523b4b128b7c096e3cee23aa831a836418ded30d71014d132c6768f
browser/pastafari-calendar-core.js fda26e2878cf401603e244fd721bd1c4121d7513e935d458244a2fbdec9e7be8
docs/calendar-converters.js 8a317dc5a69623789b42270a6aa78eb9d365a40dad970055398253780c26c43c
src/public-api.js 402890ad17b2b51d83f862eb01f755ad597b5aa5af27810618d1b7f0ce63341d
test/update09-proleptic-negative-year.test.js 50ec29651a78910cd6fc443d79eb4c2f9ff8dddef7a1e2ebefc0242f575b0628
verification/update9/proleptic-negative-year-reference.mjs ae1fc5fd4f82601f51689bc77091df87be744c5fb33e5e5f756cba8a310a4557
scripts/run-update09-proleptic-negative-year-audit.mjs 735515e52fc11f9d2ef97877b8c724601fda7b5447414f23828147a818a96543
package.json 847c4d14eef27e0b0bcd7767c2db4f00b0b05ca92e141ed197288baeaf7c26e3
SHA256SUMS.txt 78b7fe20d33bb14ec1dda03b1ab45072a0172ede6c231d5062139a19cd38213e
docs/SHA256SUMS.txt b14ef759d09bf8dafaae49f273094ca083bd010c6c77869e11485568f52c71a3
```

## Acceptance-status conclusion

All six calendars were checked separately against public API, existing internal/browser-input conversion, and an independent reference. The Foundation representations all converge to JDN `-13334246`. Year-zero boundary, leap-negative behavior, modulo/floor semantics, invalid inputs, positive regressions, Node/browser-core parity, package verification, and checksum verification passed.

The only incomplete acceptance items are environment-limited: fresh standalone rebuild and long compatibility/deep suites could not be completed inside this container because dependency installation is unavailable or the commands exceeded the 300-second execution window.
