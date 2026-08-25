# Update 18 final differential integration evidence

## Status

- status: `INTEGRATION_INCOMPLETE_MISSING_PREREQUISITE`
- final closure status: `INTEGRATION_INCOMPLETE_MISSING_PREREQUISITE`
- real mismatches: `0`
- authoritative mismatches: `0`
- fast mismatches: `0`
- mutation detections: `2`
- records: `193`

## Prerequisites

- canonicalFinalTuplesSha256: `4ccde5d6332ffe9105a2a970946d051c55fb7566a004b5dadb51f42ab191a69a`
- packageVersion: `1.3.0`
- referenceHash: `40f08fab56b3f0e90b6ce43a24948856972ecdd26d2bbbeb84bda26905fdc379`
- scrollHash: `d36b0c944b4685d1aa1d89bb20a8dd530ee3167c897dcdf85161a7ec0dde9c96`
- scrollPathObserved: `sources/מגילת העיתים.md`
- update17CaseCount: `141`
- update17Verified: `true`
- zipUnicodePathRepairIncluded: `false`

## Coverage

- browserRuntime: `separate script/test:update18:browser required`
- canonicalCorpusCases: `51`
- canonicalCorpusComparedThroughUpdate17Matrices: `true`
- externalCalendarRows: `90`
- finalClosureMissing: `fresh Update 18 final-tuple holdout executed against authoritative/fast production`; `browser runtime differential`; `Worker runtime differential`; `standalone classic-script differential`; `full extended import-order matrix`; `soak/memory trend`
- freshUpdate18FinalTupleHoldout: `false`
- holdoutCases: `12`
- holdoutSeed: `396434711`
- importOrderMatrix: `not yet promoted to final closure evidence`
- monthWeavingRows: `8`
- negativeGateRows: `7`
- positiveGateRows: `10`
- sauceRows: `6`
- soakMemoryTrend: `not yet promoted to final closure evidence`
- standaloneRuntime: `not yet promoted to final closure evidence`
- workerRuntime: `not yet promoted to final closure evidence`
- yearCandidateRows: `1`

## Summary matrix

| feature | cases | pass | mismatch | auth mismatch | fast mismatch | errors |
|---|---:|---:|---:|---:|---:|---:|
| A-committed-canonical-final-tuples | 51 | 51 | 0 | 0 | 0 | 0 |
| B-reference-runtime-holdout-update17-seed | 12 | 12 | 0 | 0 | 0 | 0 |
| component-counters | 5 | 5 | 0 | 0 | 0 | 0 |
| component-sauce-final12-stirs | 6 | 6 | 0 | 0 | 0 | 0 |
| external-calendar-normative-roundtrip | 90 | 90 | 0 | 0 | 0 | 0 |
| host-backed-calendar-firewall | 1 | 1 | 0 | 0 | 0 | 0 |
| month-weaving-integration | 8 | 8 | 0 | 0 | 0 | 0 |
| mutation-self-test | 2 | 2 | 0 | 1 | 1 | 0 |
| negative-gate-differential | 7 | 7 | 0 | 0 | 0 | 0 |
| positive-gate-differential | 10 | 10 | 0 | 0 | 0 | 0 |
| year-candidate-discovery-5778 | 1 | 1 | 0 | 0 | 0 | 0 |

## Interpretation

This evidence verifies a materially broader Update 18 integration tier than the initial CI smoke: all retained Update 17 final-tuple matrix rows, the Update 17 holdout audit, sauce/gate/counter/year/MonthWeaving component rows, selected external-calendar round-trips, and mutation self-tests. It still intentionally refuses final closure because fresh Update 18 final-tuple holdout, full browser/Worker/standalone, import-order, and soak/memory evidence have not all been promoted to final closure evidence.
