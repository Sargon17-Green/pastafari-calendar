# Update 18 final differential integration evidence

## Status

- status: `INTEGRATION_PASS`
- final closure status: `INTEGRATION_PASS`
- real mismatches: `0`
- authoritative mismatches: `0`
- fast mismatches: `0`
- mutation detections: `2`
- records: `111`

## Browser closure evidence

- browserRuntime: `PASS`
- workerRuntime: `PASS`
- standaloneRuntime: `PASS`
- browserVersion: `151.0.7922.34`

## Remaining blockers

- none

## CI closure source

- workflow: `.github/workflows/test.yml`
- run id: `32824499590`
- browser-smoke job id: `97729546428`
- head SHA: `8e9f837180f3b252a3a5c8992ae9d10ac229b3f7`
- browser differential: `PASS`
- promote-final-closure: `INTEGRATION_PASS`
- close-final-status: `INTEGRATION_PASS`

## Summary matrix

| feature | cases | pass | mismatch | auth mismatch | fast mismatch | errors |
|---|---:|---:|---:|---:|---:|---:|
| A-committed-canonical-final-tuples | 51 | 51 | 0 | 0 | 0 | 0 |
| B-fresh-update18-final-tuple-holdout-production | 4 | 4 | 0 | 0 | 0 | 0 |
| B-reference-runtime-holdout-update17-seed | 12 | 12 | 0 | 0 | 0 | 0 |
| component-counters | 5 | 5 | 0 | 0 | 0 | 0 |
| external-calendar-normative-roundtrip | 15 | 15 | 0 | 0 | 0 | 0 |
| host-backed-calendar-firewall | 1 | 1 | 0 | 0 | 0 | 0 |
| import-order-matrix | 4 | 4 | 0 | 0 | 0 | 0 |
| month-weaving-integration | 8 | 8 | 0 | 0 | 0 | 0 |
| mutation-self-test | 2 | 2 | 0 | 1 | 1 | 0 |
| negative-gate-differential | 3 | 3 | 0 | 0 | 0 | 0 |
| positive-gate-differential | 5 | 5 | 0 | 0 | 0 | 0 |
| soak-memory-trend | 1 | 1 | 0 | 0 | 0 | 0 |
