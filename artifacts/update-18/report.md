# Update 18 differential integration evidence

## Status

- harness status: `INTEGRATION_PASS`
- final closure status: `INTEGRATION_INCOMPLETE_MISSING_PREREQUISITE`
- final closure reason: CI tier does not launch a real browser runtime or the standalone classic-script Blob Worker; run extended/browser jobs before declaring Update 18 final closure.

## Inputs and prerequisites

- package: `pastafari-calendar@1.3.0`
- update 17 verified: `true`
- update 17 cases: `141`
- reference hash: `40f08fab56b3f0e90b6ce43a24948856972ecdd26d2bbbeb84bda26905fdc379`
- scroll hash: `d36b0c944b4685d1aa1d89bb20a8dd530ee3167c897dcdf85161a7ec0dde9c96`
- canonical final tuple corpus SHA-256: `4ccde5d6332ffe9105a2a970946d051c55fb7566a004b5dadb51f42ab191a69a`

## Run options

- canonicalLimit: `1`
- componentGateLimit: `8`
- denseRadius: `0`
- holdoutRandomLimit: `0`
- includeComponents: `true`
- includeExpensiveGates: `false`
- includeImportOrder: `false`
- includeMonthWeaving: `false`
- includeWorker: `false`

## Totals

- authoritativeMismatches: `0`
- errors: `0`
- fastMismatches: `0`
- mismatches: `0`
- mutationDetections: `2`
- notApplicableRows: `24`
- pass: `49`
- records: `73`
- referenceNotImplemented: `0`
- timeouts: `0`

## Coverage

- browserRuntime: `NOT_RUN_IN_NODE_ONLY_HARNESS`
- canonicalCorpusCases: `1`
- canonicalCorpusTotalAvailable: `51`
- componentDeepCoverage: `RUN`
- denseAndGridCases: `1`
- externalCalendarRows: `30`
- freshHoldoutCases: `2`
- intlFaultRows: `12`
- monthWeavingCoverage: `NOT_RUN_IN_CI_TIER`
- monthWeavingRows: `0`
- negativeGateRows: `8`
- performanceMemorySanity: `elapsedMs recorded per case; no dedicated heap soak in CI tier`
- positiveGateRows: `8`
- publicApiCompatibility: `covered indirectly by imports and external API calls; no signature drift diff performed here`
- standaloneClassicScript: `NOT_RUN_IN_NODE_ONLY_HARNESS`
- stateHistoryProfiles: `2`
- workerHandlerCases: `0`
- workerHandlerCoverage: `NOT_RUN_IN_CI_TIER`

## Environment

- icu: `77.1`
- locale: `en-US`
- node: `v22.16.0`
- npm: `10.9.2`
- osRelease: `6.18.35`
- platform: `linux/x64`
- timezone: `UTC`
- v8: `12.4.254.21-node.26`

## Summary matrix

| feature | cases | pass rows | mismatch rows | auth mismatch | fast mismatch | errors | N/A |
|---|---:|---:|---:|---:|---:|---:|---:|
| A-committed-canonical-final-tuples | 1 | 1 | 0 | 0 | 0 | 0 | 0 |
| B-fresh-deterministic-holdout | 2 | 2 | 0 | 0 | 0 | 0 | 0 |
| C-directed-dense-fixed-c | 1 | 1 | 0 | 0 | 0 | 0 | 0 |
| component-counters | 4 | 4 | 0 | 0 | 0 | 0 | 0 |
| component-sauce-final12-stirs | 1 | 1 | 0 | 0 | 0 | 0 | 0 |
| external-calendar-normative | 30 | 6 | 0 | 0 | 0 | 0 | 54 |
| intl-icu-fault-normative-firewall | 12 | 12 | 0 | 0 | 0 | 0 | 12 |
| mutation-self-test | 2 | 2 | 0 | 1 | 1 | 0 | 2 |
| negative-gate-differential | 8 | 8 | 0 | 0 | 0 | 0 | 0 |
| positive-gate-differential | 8 | 8 | 0 | 0 | 0 | 0 | 0 |
| reentrancy-nested | 1 | 1 | 0 | 0 | 0 | 0 | 0 |
| state-history-matrix | 2 | 2 | 0 | 0 | 0 | 0 | 0 |
| year-candidate-discovery-5778 | 1 | 1 | 0 | 0 | 0 | 0 | 0 |

## Interpretation

This CI-tier harness is a mandatory regression gate and not the full Update 18 closure. It deliberately leaves browser runtime, standalone classic-script, full canonical corpus, expensive gate boundaries, extended import-order, soak, and full MonthWeaving runtime coverage outside the mandatory tier. Therefore the evidence can only support the stated `finalClosureStatus`, not full `INTEGRATION_PASS` closure for the whole update.
