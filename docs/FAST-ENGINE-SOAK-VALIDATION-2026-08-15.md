# Fast Engine Soak Validation — 2026-08-15

## Purpose

This document records the long-running validation campaign for the Pastafari calendar fast engine, the single correctness mismatch discovered by that campaign, the resulting diagnosis and compatibility fix, and the verification performed afterward.

The validation work was intentionally constrained:

- the fast algorithm itself was not to be redesigned;
- `browser/pastafari-calendar-fast.js` was treated as the implementation under test;
- the authoritative/core path was used as an oracle;
- a fast-engine change would only have been justified by evidence that the fast engine itself was wrong.

The investigation ultimately showed that the fast engine was not the source of the discovered mismatch. The defect was in the year-ceiling compatibility detour used by the authoritative path.

## Repository state referenced by this record

At the time this record was prepared, the current `main` commit was:

`52afd4bcf9e52fd31725b9bb38cb072c8b86058b`

The main JavaScript test workflow for that commit completed successfully.

This document concerns the JavaScript fast-engine/oracle validation. COBOL compatibility is tracked separately and is not part of the correctness conclusion recorded here.

## Soak harness

The resumable soak harness is:

`./scripts/soak-fast-engine.mjs`

Validated SHA-256:

`2c32d9e074440653a701ef5135b4679d41a54b706bf64e33f6d28ab50cb6b460`

The harness was designed for aggressive, long-running comparison work with durable progress, checkpoints, failure recording, replay capability, and separation between infrastructure/performance failures and computed-value mismatches.

Its durable working directory is `.pastafari-soak`. A separate smoke-test state directory, `.pastafari-soak-smoke`, may also be used.

## Completed soak scope

The completed campaign reached:

- 96 batches;
- 1,026 comparison cases;
- 184,356 engine days exercised;
- 125,921 full-year days exercised;
- 12 recorded failures/findings requiring classification.

Of those 12 findings:

- 11 were performance timeouts at very large positive JDN values;
- 1 was a computed-value mismatch between the fast and authoritative paths.

The 11 timeout cases remain performance findings. They did not establish a computed-value disagreement and were not treated as evidence that the fast algorithm was incorrect.

## The correctness mismatch

The material mismatch was found at:

- soak batch: 37;
- case: 3;
- calculation JDN: `3663448`;
- case target JDN: `3655101`;
- classification: year-boundary case.

The investigation localized the disagreement to the day immediately before Pastafari Year 4998:

- target JDN: `3654335`.

The fast path returned:

```json
{
  "year": "4997",
  "cutletName": "אפר",
  "dayInCutlet": 288,
  "monthName": "חרטה",
  "dayInMonth": 19
}
```

The pre-fix authoritative path returned:

```json
{
  "year": "4997",
  "cutletName": "גומא",
  "dayInCutlet": 288,
  "monthName": "טין",
  "dayInMonth": 123
}
```

Further boundary analysis showed that both paths agreed on the start of Year 4998 itself. The disagreement arose while reconstructing the preceding year structure.

## Root cause

The relevant compatibility rule caps the supported year length at 5,778 days.

The authoritative/core implementation is wrapped by `browser/year-ceiling-detour.js` so that the historical authoritative engine behaves with the 5,778-day ceiling expected by the current fast engine.

The defect was directional.

The existing detour correctly constrained the relevant ascending/forward anchor-search behavior, but a backward traversal could still admit a forbidden 5,779-day candidate. That altered candidate ranking and, consequently, the reconstructed structure of the previous year.

The soak mismatch was therefore an oracle-side compatibility defect, not a fast-engine arithmetic defect.

## First attempted fix and cache-isolation regression

An initial repair extended the detour by consulting `calendar.yearCache` during the backward path.

That fixed the batch-37 mismatch in isolation, but it exposed a second issue: the authoritative calendar object is reused across tests, and the first version treated the presence of any cached year as sufficient to suppress a fresh anchor-based detour.

A cache entry belonging to a different calculation day could therefore affect a later calculation.

This was detected by the full compatibility suite, including a regression around target JDN `-29785584`.

The first attempted fix was not retained.

## Final fix

The retained implementation is in:

`./browser/year-ceiling-detour.js`

Validated SHA-256:

`184f3f065cd59a119b1bee77ad56211b17ab73adc1f7aa856345b494a1e675a7`

The final repair:

1. extracts an explicit `options.calculationJdn` when one is present;
2. scopes cache inspection to entries belonging to that calculation day;
3. applies the 5,778-day ceiling consistently to the backward/cached path;
4. preserves the original anchor-scan behavior when no cached year exists for the active calculation day;
5. avoids additional `todayProvider` evaluation in the omitted-calculation-day path.

This preserves the established fast-engine behavior while fixing the authoritative compatibility layer.

## Regression coverage

The retained regression test is:

`./test/year-ceiling-detour.test.js`

Validated SHA-256:

`a26a088f1ff73ff86331293c59f44fbab6fde038f26e15910e25c9678e41aa94`

The regression coverage includes:

- forward and backward enforcement of the 5,778-day ceiling;
- cache isolation between distinct calculation days;
- preservation of omitted-calculation-day behavior;
- preservation of a single `todayProvider` snapshot;
- the real soak regression from batch 37 / case 3.

The real integration regression can be enabled with:

`PASTAFARI_YEAR_CEILING_INTEGRATION=1`

## Fast engine unchanged

No algorithmic change was made to:

`./browser/pastafari-calendar-fast.js`

Its validated SHA-256 remained:

`61318bc0813579f8d703737716704c467b87f2492213c2a1bd0970d9bc9f421b`

This is an important part of the validation result: the soak campaign found a real discrepancy, but the discrepancy did not justify modifying the fast algorithm.

## Verification after the fix

The final fix was verified in several layers.

### Targeted integration

The year-ceiling regression suite passed, including the real batch-37 case.

### Full Node test suite

A full `npm test` run with `PASTAFARI_YEAR_CEILING_INTEGRATION=1` completed with:

- 77 tests;
- 74 passed;
- 0 failed;
- 3 skipped.

The skipped tests were the optional checkpoint modes when their dedicated environment variables were not enabled.

### Standalone reproducibility

Because the authoritative compatibility layer is included in the generated standalone bundle, the standalone files were rebuilt after the fix.

Two consecutive builds produced byte-identical results.

Validated generated-file SHA-256 values:

`./browser/standalone/pastafari-date.js`

`85b98b2b58819b403fb25619040951d204de64ac7f317225aa79a1d9f3e5bb4c`

`./browser/standalone/pastafari-date.min.js`

`98cc0af283bbb6ffc42cc9c12b4111870fdc306f56dc0d052a1672ed9d861415`

The repository CI reproducibility check subsequently passed.

### GitHub Actions

For current `main` commit `52afd4bcf9e52fd31725b9bb38cb072c8b86058b`, the primary `test` workflow completed successfully.

That workflow includes, among other checks:

- `npm run build:standalone`;
- a zero-diff check for the committed standalone artifacts;
- `npm test`;
- browser/file-protocol checks;
- root `SHA256SUMS.txt` verification;
- dedicated checkpoint jobs;
- PWA offline smoke;
- astronomical day-boundary smoke;
- minimum supported Node runtime smoke.

## Final conclusion

The soak campaign fulfilled its correctness purpose.

It found one genuine fast-vs-authoritative mismatch. Detailed replay and boundary analysis demonstrated that the fast engine was correct for that case and that the authoritative year-ceiling compatibility detour was admitting a forbidden 5,779-day backward candidate.

The authoritative detour was repaired, cache isolation was added after full-suite testing exposed an interaction defect in the first attempted repair, regression coverage was added, the standalone artifacts were regenerated reproducibly, and the main JavaScript CI returned to green.

The fast algorithm itself was not changed.

The 11 extreme-JDN timeout findings remain performance observations rather than demonstrated correctness mismatches.
