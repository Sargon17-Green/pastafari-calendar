# Update 8 — Stage 4A: Repeated failures, history dependence and construction order

## A. Revision

- repository: `Sargon17-Green/pastafari-calendar`
- branch: `main`
- commit: `ce49a21700316a4339f29411f104c22dd2616295`
- package version: `1.3.0`
- working tree at runner start: `?? artifacts/update-08-stage-04a-run.log`

## B. Alignment

- Stage 1 present: true
- Stage 2A present: true
- Stage 2B present: true
- Stage 3 artifact present: true
- focused revalidation performed: true
- snapshot schema basis: Stage 2B + committed Stage 4C/4D instrumentation contract.

## C. Sanity

- foundation_same: PASS
- foundation_next: PASS
- foundation_previous: PASS

## D. Repeated natural failures

| Path | Δ after 1 | Δ after 10 | Δ after 100 | Δ after 1000 | Exception stable | Classification |
|---|---:|---:|---:|---:|---|---|
| F_BAHAI_INVALID_VARIANT | 12 | 120 | 1200 | 12000 | true | STATE_DRIFT_SEMANTICS_STABLE |
| F_GREGORIAN_NONINTEGER_MONTH | 12 | 120 | 1200 | 12000 | true | STATE_DRIFT_SEMANTICS_STABLE |
| F_HINDU_INVALID_SCHEME | 12 | 120 | 1200 | 12000 | true | STATE_DRIFT_SEMANTICS_STABLE |
| F_ISLAMIC_INVALID_VARIANT | 12 | 120 | 1200 | 12000 | true | STATE_DRIFT_SEMANTICS_STABLE |
| F_JAPANESE_NONSTRING_ERA | 12 | 120 | 1200 | 12000 | true | STATE_DRIFT_SEMANTICS_STABLE |
| F_MONTH_WEAVING_NONPOSITIVE | 12 | 120 | 1200 | 12000 | true | STATE_DRIFT_SEMANTICS_STABLE |
| F_PASTAFARI_INVALID_TODAY_PROVIDER | 12 | 120 | 1200 | 12000 | true | STATE_DRIFT_SEMANTICS_STABLE |
| F_SOLAR_HIJRI_INVALID_VARIANT | 12 | 120 | 1200 | 12000 | true | STATE_DRIFT_SEMANTICS_STABLE |
| F_RAW_PASTAFARI_DEFAULT | 12 | 120 | 1200 | 12000 | true | STATE_DRIFT_SEMANTICS_STABLE |

## E. Alternating success/failure

- successes remain reference-equal: true
- failures continued to throw: true
- classification: STATE_DRIFT_SEMANTICS_STABLE

## F. A → FAIL → A

- foundation_same: A1==A2==reference = true
- foundation_next: A1==A2==reference = true
- foundation_previous: A1==A2==reference = true
- present_same: A1==A2==reference = true
- present_forward: A1==A2==reference = true

## G. Failure-count thresholds before success

- FAIL×1 → foundation_same: reference=true; arena Δ=12; exception stable=true
- FAIL×2 → foundation_same: reference=true; arena Δ=24; exception stable=true
- FAIL×5 → foundation_same: reference=true; arena Δ=60; exception stable=true
- FAIL×10 → foundation_same: reference=true; arena Δ=120; exception stable=true
- FAIL×100 → foundation_same: reference=true; arena Δ=1200; exception stable=true

## H. Same multiset, different order

- ABC vs CBA: finalNormalizedEqual=false; firstDivergence=1
- AABBCC vs ABCABC: finalNormalizedEqual=false; firstDivergence=2
- ABCDEF vs FEDCBA: finalNormalizedEqual=false; firstDivergence=1
- ABCDEF vs ACEBDF: finalNormalizedEqual=false; firstDivergence=2

## I. Memory / boundedness

- Heap measurements are recorded but treated as noisy; structural arena growth is the primary boundedness evidence.
- F_BAHAI_INVALID_VARIANT: arena Δ 100=1200; 1000=12000; heapUsed100=121898104; heapUsed1000=122969720
- F_GREGORIAN_NONINTEGER_MONTH: arena Δ 100=1200; 1000=12000; heapUsed100=121870040; heapUsed1000=122919352
- F_HINDU_INVALID_SCHEME: arena Δ 100=1200; 1000=12000; heapUsed100=121892912; heapUsed1000=122921184
- F_ISLAMIC_INVALID_VARIANT: arena Δ 100=1200; 1000=12000; heapUsed100=121888128; heapUsed1000=122945400
- F_JAPANESE_NONSTRING_ERA: arena Δ 100=1200; 1000=12000; heapUsed100=121906184; heapUsed1000=122951792
- F_MONTH_WEAVING_NONPOSITIVE: arena Δ 100=1200; 1000=12000; heapUsed100=121900032; heapUsed1000=122953808
- F_PASTAFARI_INVALID_TODAY_PROVIDER: arena Δ 100=1200; 1000=12000; heapUsed100=121911704; heapUsed1000=122898832
- F_SOLAR_HIJRI_INVALID_VARIANT: arena Δ 100=1200; 1000=12000; heapUsed100=121895424; heapUsed1000=122945336
- F_RAW_PASTAFARI_DEFAULT: arena Δ 100=1200; 1000=12000; heapUsed100=121896712; heapUsed1000=122853040

## J. Post-failure success soak

- all canonical successes match reference: true
- failure exception stable: true

## K. First divergences

- ABC vs CBA: {"operationIndex":1,"leftOperation":"F_GREGORIAN_NONINTEGER_MONTH","rightOperation":"F_MONTH_WEAVING_NONPOSITIVE","leftState":{"arenaDeltaFromBaseline":12,"retainedTailLength":12,"retainedTailHoles":0,"retainedTailFingerprint":"33c7a0b3fac2fc8e82ef9157bd0a9c9d03bc0c14910e9f6f9ec0eea30d0caf4f","mapSizes":[0,13,20,12,4,0,0,0,0,0,0,0,0,0,0,1,0,0,0],"identitiesRestored":true},"rightState":{"arenaDeltaFromBaseline":12,"retainedTailLength":12,"retainedTailHoles":0,"retainedTailFingerprint":"9ebf91bb3575b792a9bbfcc638efa39c95a854a9f6a98ae3453da65faaf5b303","mapSizes":[0,13,20,12,4,0,0,0,0,0,0,0,0,0,0,1,0,0,0],"identitiesRestored":true}}
- AABBCC vs ABCABC: {"operationIndex":2,"leftOperation":"F_GREGORIAN_NONINTEGER_MONTH","rightOperation":"F_ISLAMIC_INVALID_VARIANT","leftState":{"arenaDeltaFromBaseline":24,"retainedTailLength":24,"retainedTailHoles":0,"retainedTailFingerprint":"a436fa821720f4168b9f8a85ea8c8ad59d564517722266f9f4245845f083994e","mapSizes":[0,13,20,12,4,0,0,0,0,0,0,0,0,0,0,1,0,0,0],"identitiesRestored":true},"rightState":{"arenaDeltaFromBaseline":24,"retainedTailLength":24,"retainedTailHoles":0,"retainedTailFingerprint":"cc1d712870bb684dd72b8e538b84fc699024dc595de94c9c634a35f61cd99d34","mapSizes":[0,13,20,12,4,0,0,0,0,0,0,0,0,0,0,1,0,0,0],"identitiesRestored":true}}
- ABCDEF vs FEDCBA: {"operationIndex":1,"leftOperation":"F_GREGORIAN_NONINTEGER_MONTH","rightOperation":"F_SOLAR_HIJRI_INVALID_VARIANT","leftState":{"arenaDeltaFromBaseline":12,"retainedTailLength":12,"retainedTailHoles":0,"retainedTailFingerprint":"33c7a0b3fac2fc8e82ef9157bd0a9c9d03bc0c14910e9f6f9ec0eea30d0caf4f","mapSizes":[0,13,20,12,4,0,0,0,0,0,0,0,0,0,0,1,0,0,0],"identitiesRestored":true},"rightState":{"arenaDeltaFromBaseline":12,"retainedTailLength":12,"retainedTailHoles":0,"retainedTailFingerprint":"02cd57b392606ee8eb3b5eca92509b797207f2a8b05b328ec4fe3614a6b8ec1f","mapSizes":[0,13,20,12,4,0,0,0,0,0,0,0,0,0,0,1,0,0,0],"identitiesRestored":true}}
- ABCDEF vs ACEBDF: {"operationIndex":2,"leftOperation":"F_ISLAMIC_INVALID_VARIANT","rightOperation":"F_MONTH_WEAVING_NONPOSITIVE","leftState":{"arenaDeltaFromBaseline":24,"retainedTailLength":24,"retainedTailHoles":0,"retainedTailFingerprint":"cc1d712870bb684dd72b8e538b84fc699024dc595de94c9c634a35f61cd99d34","mapSizes":[0,13,20,12,4,0,0,0,0,0,0,0,0,0,0,1,0,0,0],"identitiesRestored":true},"rightState":{"arenaDeltaFromBaseline":24,"retainedTailLength":24,"retainedTailHoles":0,"retainedTailFingerprint":"e916ec3d44999bdd6e7d6e5c7fc8351eefa4b6449b8d8af26104661b658cb26e","mapSizes":[0,13,20,12,4,0,0,0,0,0,0,0,0,0,0,1,0,0,0],"identitiesRestored":true}}

## L. Files/artifacts created

- `artifacts/update-08-stage-04a-history.json`
- `artifacts/update-08-stage-04a-report.md`
- `artifacts/update-08-stage-04a-sha256sums.txt`

## M. Production files changed

none

STAGE_4A_RESULT = TECHNICAL_EVIDENCE_COMPLETE

confirmed accumulation = F_BAHAI_INVALID_VARIANT: arena Δ=12000 after 1000 measured failures; F_GREGORIAN_NONINTEGER_MONTH: arena Δ=12000 after 1000 measured failures; F_HINDU_INVALID_SCHEME: arena Δ=12000 after 1000 measured failures; F_ISLAMIC_INVALID_VARIANT: arena Δ=12000 after 1000 measured failures; F_JAPANESE_NONSTRING_ERA: arena Δ=12000 after 1000 measured failures; F_MONTH_WEAVING_NONPOSITIVE: arena Δ=12000 after 1000 measured failures; F_PASTAFARI_INVALID_TODAY_PROVIDER: arena Δ=12000 after 1000 measured failures; F_SOLAR_HIJRI_INVALID_VARIANT: arena Δ=12000 after 1000 measured failures; F_RAW_PASTAFARI_DEFAULT: arena Δ=12000 after 1000 measured failures
history dependence = failure-count dependence confirmed by retained structural state; ABC vs CBA, first divergence at operation 1; AABBCC vs ABCABC, first divergence at operation 2; ABCDEF vs FEDCBA, first divergence at operation 1; ABCDEF vs ACEBDF, first divergence at operation 2
semantic corruption = none
zero-delta paths = CONTROL_VALID_GREGORIAN_CONSTRUCTION
unresolved = none

READY_FOR_STAGE_5_FROM_4A = yes

