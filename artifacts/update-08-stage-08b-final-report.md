# Update 8 — Stage 8B Final: full evidence-consistency audit

## 1. Scope and result

This is the final Stage-8B evidence-consistency audit. It **supersedes** the regenerated missing ledger while retaining it as historical provenance.

```text
STAGE_8B_RESULT = EVIDENCE_AUDIT_PASS
READY_FOR_STAGE_8D_FROM_8B = yes
production files changed during Stage 8B: none
Stage 8D executed: no
```

Important stop point: do **not** start Stage 8D yet. The next required step is a short Stage-8C revalidation against the tree that includes these final Stage-8B artifacts.

## 2. Revision / provenance

- repository: `Sargon17-Green/pastafari-calendar`
- branch: `main`
- current HEAD: `aa626097a175a167ae022e706c6b704eeb55769c`
- current tree: `845b875bbead29c89d60c58dfa933c9893faa762`
- package version: `1.3.0`
- current HEAD date: `2026-08-23T00:32:12Z`
- uploaded archive SHA-256: `9c88a56650483b0c36d41e799f7285442606ef1176a15347bbeb9323939c81ba`
- local archive git metadata: not present
- working tree basis: uploaded ZIP plus GitHub branch/compare verification

GitHub compare from Stage 8A commit `8eadf7f6d91ed072763542ddc5c1dc193b1bd243` to current `main` reports 3 commits and only `SHA256SUMS.txt` plus Stage-8A/8B/8C artifact files. No production file changed. Therefore the Stage-7 final production/runtime evidence remains production-equivalent for this Stage-8B audit.

The uploaded ZIP encoded `sources/מגילת העיתים.md` as `sources/#U05de#U05d2#U05d9#U05dc#U05ea #U05d4#U05e2#U05d9#U05ea#U05d9#U05dd.md`. The file content hash matches the manifest entry. After extraction-only filename normalization, `sha256sum -c SHA256SUMS.txt` passes. This is classified as an archive-export filename issue, not a repository checksum defect and not a production change.

## 3. Stage ledger

| Stage | Final controlling artifact | Result | Ready flag | Status |
|---|---|---|---|---|
| Stage 1 | `verification/update8/stage-01-report.md + stage-01-baseline.json` | `CLOSED / success baseline accepted` | `Stage 2 allowed` | `PASS_WITH_NOTED_TIMEOUT_RESOLVED_BY_REPLACEMENT_DISCRIMINATOR_AND_LATER_STAGES` |
| Stage 2A | `verification/update8/stage-02a-construction-report.md + stage-02a-construction-inventory.json` | `CLOSED construction inventory` | `READY_FOR_STAGE_3_CONSTRUCTION_SIDE = yes` | `PASS` |
| Stage 2B | `verification/update8/stage-02b-shared-state-report.md + stage-02b-shared-state-inventory.json` | `shared-state inventory ready` | `READY_FOR_STAGE_3_STATE_SIDE = yes` | `PASS` |
| Stage 3 | `artifacts/update-08-stage-03-report.md + update-08-stage-03-reproduction.json` | `CONFIRMED_LEAK` | `Stage 4 scope remains; no Stage 5 readiness claimed` | `PASS_FOR_LEAK_REPRODUCTION` |
| Stage 4A | `artifacts/update-08-stage-04a-report.md + update-08-stage-04a-history.json` | `TECHNICAL_EVIDENCE_COMPLETE` | `READY_FOR_STAGE_5_FROM_4A = yes` | `PASS` |
| Stage 4B | `artifacts/update-08-stage-04b-report.md + update-08-stage-04b-nested-isolation.json, superseded for readiness by Stage-4 Closure` | `TECHNICAL_FINDINGS_CONFIRMED_FORMAL_CLOSE_BLOCKED_BY_MISSING_STAGE_3_ARTIFACT` | `historical READY_FOR_STAGE_5_FROM_4B = no` | `SUPERSEDED_FOR_READYNESS_BY_STAGE_4_CLOSURE` |
| Stage 4C | `artifacts/update-08-stage-04c-report.md + update-08-stage-04c-fault-injection.json, superseded for readiness by Stage-4 Closure` | `TECHNICAL_FINDINGS_CONFIRMED_FORMAL_CLOSE_BLOCKED_BY_MISSING_STAGE_3_ARTIFACT` | `historical READY_FOR_STAGE_5_FROM_4C = no` | `SUPERSEDED_FOR_READYNESS_BY_STAGE_4_CLOSURE` |
| Stage 4D | `artifacts/update-08-stage-04d-report.md + update-08-stage-04d-publication-cache.json, superseded for readiness by Stage-4 Closure` | `FINDINGS_CONFIRMED_FORMAL_CLOSE_BLOCKED_BY_MISSING_STAGE_3_ARTIFACT` | `historical READY_FOR_STAGE_5_FROM_4D = no` | `SUPERSEDED_FOR_READYNESS_BY_STAGE_4_CLOSURE` |
| Stage 4 Closure | `artifacts/update-08-stage-04-synthesis-report.md + update-08-stage-04-synthesis.json` | `READY_FOR_STAGE_5` | `STAGE_4_CLOSURE_RESULT = READY_FOR_STAGE_5` | `PASS` |
| Stage 5 | `artifacts/update-08-stage-05-report.md + update-08-stage-05-fix.json` | `FIX_IMPLEMENTED` | `READY_FOR_STAGE_6 = yes` | `PASS_WITH_COMPATIBILITY_DEFERRED_TO_STAGE_7` |
| Stage 6 | `artifacts/update-08-stage-06-report.md + update-08-stage-06-verification.json` | `FIX_INDEPENDENTLY_VERIFIED` | `READY_FOR_STAGE_7 = yes` | `PASS_WITH_COMPATIBILITY_DEFERRED_TO_STAGE_7` |
| Stage 7 original | `artifacts/update-08-stage-07-report.md + update-08-stage-07-cross-environment.json` | `CROSS_ENVIRONMENT_VERIFICATION_FAILED` | `READY_FOR_STAGE_8 = no` | `SUPERSEDED_HISTORICAL_FAILURE` |
| Stage 7 router repair | `artifacts/update-08-stage-07-router-fix-report.md + update-08-stage-07-router-fix.json` | `CROSS_ENVIRONMENT_VERIFICATION_FAILED_UNTIL_GENERATED_BUNDLES_COMMITTED_AND_FOCUSED_RERUN` | `READY_FOR_STAGE_8 = no until final rerun` | `PRODUCTION_REPAIR_AND_INTERMEDIATE_VERIFICATION` |
| Stage 7 final revalidation | `artifacts/update-08-stage-07-final-revalidation-report.md + update-08-stage-07-final-revalidation.json` | `CROSS_ENVIRONMENT_VERIFIED_AFTER_ROUTER_REPAIR` | `READY_FOR_STAGE_8 = yes` | `PASS_CONTROLLING_STAGE_7_RESULT` |
| Stage 8A | `artifacts/update-08-stage-08a-report.md + update-08-stage-08a-anti-cleanup.json` | `ANTI_CLEANUP_AUDIT_PASS` | `READY_FOR_STAGE_8D_FROM_8A = yes` | `PASS` |
| Stage 8C | `artifacts/update-08-stage-08c-report.md + update-08-stage-08c-package-audit.json` | `PACKAGE_AND_ARTIFACT_AUDIT_PASS` | `READY_FOR_STAGE_8D_FROM_8C = yes, supporting only; needs short revalidation after this Stage 8B final commit` | `PASS_SUPPORTING_NEEDS_POST_8B_REVALIDATION` |
| Stage 8B regenerated ledger | `artifacts/update-08-stage-08b-report.md + update-08-stage-08b-evidence-ledger.json` | `STAGE_8B_REGENERATED_MISSING_LEDGER_ARTIFACTS` | `READY_FOR_STAGE_8D_FROM_STAGE_8B_ALONE = no` | `SUPERSEDED_HISTORICAL_PROVENANCE` |
| Stage 8B final audit | `artifacts/update-08-stage-08b-final-report.md + update-08-stage-08b-evidence-audit.json` | `EVIDENCE_AUDIT_PASS` | `READY_FOR_STAGE_8D_FROM_8B = yes` | `PASS_CONTROLLING_STAGE_8B_RESULT` |

## 4. Stage 7 controlling evidence

The old Stage-7 result is superseded historical evidence:

```text
old Stage-7 result = CROSS_ENVIRONMENT_VERIFICATION_FAILED
router repair = production change
final Stage-7 revalidation = CROSS_ENVIRONMENT_VERIFIED_AFTER_ROUTER_REPAIR
```

The controlling Stage-7 evidence is `artifacts/update-08-stage-07-final-revalidation.json/.md`, not the earlier failure report. It records real Chromium standalone unminified/minified PASS, router+standalone static 31/31 PASS, npm package/tarball consumer PASS, and `READY_FOR_STAGE_8 = yes`.

## 5. Timeout / deferred / blocked / skip audit

| Item | Classification | Evidence |
|---|---|---|
| Stage 1 sixth extreme 5,778 canonical vector timeout | `RESOLVED_LATER` | Stage 1 replacement 5,778 discriminator PASS; Stage 6 canonical/reference checks PASS; Stage 7 packaged consumer canonical present_same PASS. |
| Stage 2A NOT_RUN failure/rollback tests | `OUT_OF_SCOPE` | Stage 2A was inventory-only and explicitly did not run failure probing; Stages 3-7 executed the failure/rollback evidence. |
| Stage 2A unresolved working-tree / preamble / standalone identity | `RESOLVED_LATER` | Stage 3+4 characterize preamble/failure state; Stage 7 final real standalone/Chromium verification PASS; archive lacks .git but GitHub main SHA/tree verified. |
| Stage 3 one unresolved Japanese arena-length case among 8 natural paths | `RESOLVED_LATER` | Stage 4A confirmed 9 natural failure paths; Stage 6 post-fix reports all 9 natural failures neutral. |
| Stage 4B/4C/4D historical missing Stage-3 blocker and READY=no | `SUPERSEDED` | Stage-4 Closure loaded Stage 3/4A-4D, verified production equivalence, and returned READY_FOR_STAGE_5. |
| Stage 4C legacy instrumentation gaps / no global random witness patch | `OUT_OF_SCOPE_OR_RESOLVED_LATER` | Stage 4C deliberately avoided unsafe global patching; Stage 6 replay uses post-fix test-only replay and finds no leakage. |
| Stage 5 test:compatibility timeout / TAP header only | `RESOLVED_LATER` | Stage 5 did not count it as PASS; Stage 7 reports compatibility PASS 12/12 in ~250.8s. |
| Stage 5 local browser/standalone blocked and Worker emulation not used | `RESOLVED_LATER` | Stage 7 final uses real Chromium 151 standalone unminified+minified PASS and byte-reproducible esbuild 0.28.2 bundles. |
| Stage 6 compatibility deferred to Stage 7 | `RESOLVED_LATER` | Stage 7 compatibility PASS and Stage 7 final revalidation package/router/standalone PASS. |
| Stage 7 original direct module Worker/file protocol/Node18/rebuild blockers | `SUPERSEDED_OR_OUT_OF_SCOPE` | The controlling Stage 7 result is after router repair; direct published-module Worker remained an infrastructure limitation but shipped worker-backed standalone was proven in real Chromium. |
| Stage 7 original router/standalone FAIL | `SUPERSEDED` | Router repair changed production; final Stage 7 revalidation result is CROSS_ENVIRONMENT_VERIFIED_AFTER_ROUTER_REPAIR. |
| Stage 8B regenerated ledger READY=no | `SUPERSEDED` | This final Stage 8B evidence audit supersedes it while retaining it as historical provenance. |
| Stage 8C release checksum script policy warning | `STILL_OPEN_NON_BLOCKING_FOR_8B` | Raw SHA256SUMS verifies after Unicode filename normalization; scripts/checksums.mjs policy mismatch remains warning for Stage 8D policy gate. |

No timeout, killed process, TAP header, Worker emulation, or source-inspection-only claim is promoted to a fake PASS.

## 6. No-fake-PASS audit

Status: `PASS`.

- TAP header without completed subtests in Stage 5/6 compatibility is not counted as PASS.
- Timed-out, blocked, or administratively unavailable browser/Worker paths are marked as blocked/deferred/not-evidence, then resolved by Stage 7 where applicable.
- Stage 7 final runtime evidence uses real Chromium for the shipped standalone paths.
- Historical checksum mismatches from superseded manifests are not used as current PASS evidence.
- Artifact existence alone is not used as acceptance evidence.

## 7. Contradiction audit

| Issue | Classification | Resolution |
|---|---|---|
| Stage 7 pre-router-fix failure vs final revalidation | `SUPERSEDED_ARTIFACT` | Old CROSS_ENVIRONMENT_VERIFICATION_FAILED evidence is historical; router repair is production change; final controlling result is CROSS_ENVIRONMENT_VERIFIED_AFTER_ROUTER_REPAIR. |
| 8 required natural failure paths vs 9 measured paths | `BENIGN_PROVENANCE_DIFFERENCE` | Stage 3 used 8 natural paths and left one unresolved; Stage 4A expanded/confirmed 9 paths; Stage 6 verifies all 9 neutral post-fix. |
| Historical READY=no in Stage 4B/4C/4D vs Stage-4 Closure READY | `SUPERSEDED_ARTIFACT` | READY=no was correct before Stage 3 artifact/SHA alignment; closure performed unified synthesis and cleared it. |
| Stage 4C legacy harness incompatibility vs Stage 6 replacement replay | `BENIGN_PROVENANCE_DIFFERENCE` | Legacy harness did not fit post-fix generated body; Stage 6 test-only replay is the controlling post-fix evidence and reports no production failure. |
| 8B regenerated ledger vs Stage 8B final audit | `SUPERSEDED_ARTIFACT` | Regenerated ledger remains provenance of missing original 8B; this final audit provides the controlling Stage 8B result. |
| 8C brokenLiteralArtifactReferences = 4 | `DOCUMENTATION_ONLY_FALSE_POSITIVE` | All four references are literal prefix/glob notation artifacts/update-08-stage-08b-* in regenerated files, not concrete missing paths. |
| Root SHA256SUMS raw local check failed in uploaded ZIP before normalization | `BENIGN_PROVENANCE_DIFFERENCE` | The ZIP exported the Hebrew Scroll source name as #U05...; checksum matches after extraction-only rename to the Unicode path already listed by root manifest. |
| Stage 5 manifest mismatch on standalone bundles after Stage 7 router repair | `SUPERSEDED_ARTIFACT` | Stage 5 manifest captured pre-router-repair generated bundles; Stage 7 final manifest is controlling for current standalone outputs and passes. |
| Original Stage 7 manifest mismatch for run-stage-07-standalone-router-race.mjs after repair | `SUPERSEDED_ARTIFACT` | Original Stage 7 evidence is historical failure; router-fix and final Stage 7 manifests pass. |

## 8. Stage-8C broken literal references

Stage 8C reported `brokenLiteralArtifactReferences = 4`. All four are prefix/glob notation in the regenerated Stage-8B ledger/report, not concrete missing file paths.

| Source | Reference | Classification | Rationale |
|---|---|---|---|
| `artifacts/update-08-stage-08b-report.md` | `artifacts/update-08-stage-08b-` | `SCANNER_FALSE_POSITIVE_PREFIX_GLOB` | Literal text is a prefix/glob notation for the historical missing Stage-8B family, not a concrete file path. Concrete Stage-8B regenerated files exist, and this final audit adds superseding concrete paths. |
| `artifacts/update-08-stage-08b-evidence-ledger.json` | `artifacts/update-08-stage-08b-` | `SCANNER_FALSE_POSITIVE_PREFIX_GLOB` | Literal text is a prefix/glob notation for the historical missing Stage-8B family, not a concrete file path. Concrete Stage-8B regenerated files exist, and this final audit adds superseding concrete paths. |
| `artifacts/update-08-stage-08b-evidence-ledger.json` | `artifacts/update-08-stage-08b-` | `SCANNER_FALSE_POSITIVE_PREFIX_GLOB` | Literal text is a prefix/glob notation for the historical missing Stage-8B family, not a concrete file path. Concrete Stage-8B regenerated files exist, and this final audit adds superseding concrete paths. |
| `artifacts/update-08-stage-08b-evidence-ledger.json` | `artifacts/update-08-stage-08b-` | `SCANNER_FALSE_POSITIVE_PREFIX_GLOB` | Literal text is a prefix/glob notation for the historical missing Stage-8B family, not a concrete file path. Concrete Stage-8B regenerated files exist, and this final audit adds superseding concrete paths. |

Result: `PASS_FALSE_POSITIVES_ONLY`; no blocker.

## 9. Acceptance traceability matrix

| Requirement | Status | Artifact path | Specific evidence |
|---|---|---|---|
| successful semantics baseline | `PASS` | `verification/update8/stage-01-baseline.json; artifacts/update-08-stage-03-reproduction.json; artifacts/update-08-stage-06-verification.json` | Stage 1 5/5 representative vectors PASS + replacement 5778 discriminator PASS; Stage 3 baseline semantic sanity all pass; Stage 6 reference/canonical checks PASS. |
| construction inventory | `PASS` | `verification/update8/stage-02a-construction-inventory.json` | 28 semantic authoritative constructors; 56 direct physical public implementations; 84 generated deployment copies; unresolved items non-blocking and later covered. |
| shared-state inventory | `PASS` | `verification/update8/stage-02b-shared-state-inventory.json` | Primary generated shared arena risk and identity/counter risk catalogued; Stage 3 measurement contract ready. |
| natural leak reproduction | `PASS` | `artifacts/update-08-stage-03-reproduction.json` | 8 natural failure paths tested, 7 leaking, 1 unresolved; confirmed arena and known-key identity publication evidence. |
| repeated accumulation | `PASS` | `artifacts/update-08-stage-04a-history.json` | 9 confirmed natural paths; 100/1000 campaigns show +1200/+12000 retained arena tail pre-fix. |
| history/order dependence | `PASS` | `artifacts/update-08-stage-04a-history.json` | Alternating, A→FAIL→A, fresh-process, permutations and success soak recorded; semantics stable but state drifts pre-fix. |
| nested ownership | `PASS` | `artifacts/update-08-stage-04b-nested-isolation.json; artifacts/update-08-stage-06-verification.json` | Nested failure and ownership risks classified pre-fix; Stage 6 inner/outer preservation accepted. |
| fault-window localization | `PASS` | `artifacts/update-08-stage-04c-fault-injection.json` | GEN_WRAP_ENTRY zero-delta; post-reservation windows +12/+24/+27/+33 pre-fix; defect families isolated. |
| publication/cache audit | `PASS` | `artifacts/update-08-stage-04d-publication-cache.json` | Partial this/cache/registry/runtimes classified; generated arena and identity metadata are the two actual defects; cache/patch surfaces non-target. |
| two defect families isolated | `PASS` | `artifacts/update-08-stage-04-synthesis.json` | STATE:generated:shared-invocation-arena and STATE:generated:identity-map-and-counter are the only Stage-5 targets. |
| Stage-5 rollback implementation | `PASS` | `artifacts/update-08-stage-05-fix.json; artifacts/update-08-stage-05-report.md` | FIX_IMPLEMENTED; arena entry-relative rollback and identity journal/counter compensation. |
| arena transactionality fixed | `PASS` | `artifacts/update-08-stage-05-transactionality.json; artifacts/update-08-stage-06-verification.json` | Failure arena deltas zero post-fix; long 5000 campaign all failed keys absent. |
| identity transactionality fixed | `PASS` | `artifacts/update-08-stage-05-fix.json; artifacts/update-08-stage-06-verification.json` | Failed new identity keys absent; identity sequence/collision/preexisting mappings preserved. |
| exception contracts preserved | `PASS` | `artifacts/update-08-stage-06-verification.json; artifacts/update-08-stage-08a-anti-cleanup.json` | Stage 6 confirms contracts; Stage 8A confirms same exception object is rethrown in failure path. |
| success semantics preserved | `PASS` | `artifacts/update-08-stage-05-fix.json; artifacts/update-08-stage-06-verification.json` | Reference oracle/canonical vectors pass; public API unchanged. |
| independent Stage-6 verification | `PASS` | `artifacts/update-08-stage-06-verification.json` | FIX_INDEPENDENTLY_VERIFIED; acceptance.allRequiredStage6AcceptanceCriteriaMet true. |
| 5000 failure campaign | `PASS` | `artifacts/update-08-stage-06-verification-core.json` | longCampaign.count=5000; allFailedKeysAbsent=true. |
| nested depth verification | `PASS` | `artifacts/update-08-stage-06-report.md; artifacts/update-08-stage-06-verification.json` | Stage 6 report records nesting depths 1/2/3/5/10 and acceptance for inner/outer failure preservation. |
| real browser verification | `PASS` | `artifacts/update-08-stage-07-cross-environment.json; artifacts/update-08-stage-07-final-revalidation.json` | Browser authoritative and fast PASS; real Chromium standalone final PASS after router repair. |
| real Worker verification | `PASS` | `artifacts/update-08-stage-07-final-revalidation.json` | Worker-backed standalone unminified and minified real Chromium PASS after router repair. |
| standalone/minified verification | `PASS` | `artifacts/update-08-stage-07-final-revalidation.json` | Committed bundles match dedicated CI artifact; unminified/minified PASS; byte reproducible. |
| fast compatibility | `PASS` | `artifacts/update-08-stage-07-cross-environment.json` | fast.compatibility PASS 12/12 and fast history PASS; retained by final revalidation because fast core unchanged. |
| router verification after repair | `PASS` | `artifacts/update-08-stage-07-final-revalidation.json` | Router + standalone static 31/31 PASS; race no longer reproduced in real Chromium. |
| npm package/tarball consumer | `PASS` | `artifacts/update-08-stage-07-final-revalidation.json; artifacts/update-08-stage-08c-package-audit.json` | npm pack PASS; clean tarball consumer import PASS, 98 exports, postFailureRecovery PASS. |
| reproducible standalone build | `PASS` | `artifacts/update-08-stage-07-final-revalidation.json` | Dedicated CI esbuild 0.28.2 byte reproducible; committed bundle hashes match artifact. |
| anti-cleanup audit | `PASS` | `artifacts/update-08-stage-08a-anti-cleanup.json` | ANTI_CLEANUP_AUDIT_PASS; no architectural cleanup/redesign/non-target changes. |

## 10. Regression obligation closure

Stage-4 synthesis listed 19 post-fix obligations. They are mapped here to concrete Stage-5/6/7 evidence, not merely to “all tests passed”.

| Obligation | Status | Evidence artifact | Evidence |
|---|---|---|---|
| all Stage-3 natural reproductions | `PASS` | `artifacts/update-08-stage-06-verification.json` | legacyStage3HarnessPostFix: 8 tested, 0 leaking, 8 zero-delta; Stage 6 naturalFailures cover 9 final paths. |
| all Stage-4A 100-failure campaigns | `PASS` | `artifacts/update-08-stage-05-transactionality.json; artifacts/update-08-stage-06-verification.json` | Stage 5 repeated counts include 1000; Stage 6 severalFailuresBeforeSuccess includes 100 and long campaign. |
| all Stage-4A 1000-failure campaigns | `PASS` | `artifacts/update-08-stage-05-transactionality.json; artifacts/update-08-stage-06-verification.json` | natural.repeated count=1000; Stage 6 severalFailuresBeforeSuccess 1000 all failed keys absent. |
| alternating success/failure | `PASS` | `artifacts/update-08-stage-06-verification.json` | alternating.failures=250; accepted. |
| A → FAIL → A | `PASS` | `artifacts/update-08-stage-06-verification-core.json` | aFailA failureArenaDelta=0 across tracked cases. |
| fresh-process dirty-vs-clean comparisons | `PASS` | `artifacts/update-08-stage-06-verification.json` | freshProcess clean/dirty failedKeysAbsent true. |
| permutation / same-multiset-different-order | `PASS` | `artifacts/update-08-stage-06-verification.json` | permutations allFailedKeysAbsent true; randomSequence failedOnlyKeysAbsent true. |
| post-failure success soak | `PASS` | `artifacts/update-08-stage-05-fix.json; artifacts/update-08-stage-06-verification.json` | success semantics unchanged; cold/warm failures then success equal reference. |
| Stage-4A zero-delta success control | `PASS` | `artifacts/update-08-stage-05-fix.json; artifacts/update-08-stage-06-verification.json` | acceptance natural/success semantics; zero accumulation post-fix. |
| Stage-4B nested failure cases | `PASS` | `artifacts/update-08-stage-06-verification.json` | innerFailurePreservesOuter and outerFailureRestoresCallerEntry true. |
| inner fail / outer continue | `PASS` | `artifacts/update-08-stage-06-verification.json` | acceptance.innerFailurePreservesOuter true. |
| inner fail / outer fail | `PASS` | `artifacts/update-08-stage-06-verification.json` | outer failure restoration accepted; LIFO/nested rollback in report. |
| nesting depths 1/2/3/5/10 | `PASS` | `artifacts/update-08-stage-06-report.md` | Report section 22 states nesting depths covered where applicable. |
| multi-instance isolation | `PASS` | `artifacts/update-08-stage-06-verification.json` | multiInstance AStableAfterFailure and BStableAfterFailure true. |
| preexisting/outer state preservation | `PASS` | `artifacts/update-08-stage-06-verification.json; artifacts/update-08-stage-08a-anti-cleanup.json` | preexisting identities and outer state preserved; no broad cleanup. |
| Stage-4C checkpoint faults | `PASS` | `artifacts/update-08-stage-06-verification.json` | 335 injected failures; base 35 checkpoints; all restored; GEN_WRAP_ENTRY zero. |
| Stage-4D publication/cache/identity readers | `PASS` | `artifacts/update-08-stage-06-verification.json` | publication/cache replay PASS; cold/warm same success reference equal. |
| independent reference oracle | `PASS` | `artifacts/update-08-stage-06-verification.json` | reference.oracle PASS 19/19, 0 fail, 0 skip. |
| existing cache/reentrancy/runtime-patching regression suites | `PASS` | `artifacts/update-08-stage-06-verification.json` | npm/focused/cacheEpoch regressions PASS with expected skips only. |

## 11. Test-count audit

| Surface | Count | SKIP / deferred explanation |
|---|---|---|
| reference oracle | Stage 1 12/12 PASS; Stage 4D/5/6 19/19 PASS | No skip in Stage 6 reference oracle. |
| npm test | Stage 5/6: 192 pass, 0 fail, 4 skip; router-fix local: 195 pass, 0 fail, 4 skip | Four skips are pre-existing/expected per Stage 6; no new regression-hiding skip identified. |
| runtime-patching | Stage 4B/4C focused evidence 36 PASS / 0 FAIL / 4 SKIP; Stage 6 focused core 40 PASS / 0 FAIL / 4 SKIP | Expected focused-suite skips retained; not used to hide failed construction regression. |
| cache | Stage 6 cacheEpoch 7/7 PASS; Stage 4D cache/publication replay PASS | No cache skip blocking closure. |
| router | Router repair matrix 28/28 PASS; final router+standalone static 31/31 PASS | Original router failure superseded by production repair and final real-Chromium revalidation. |
| fault injection | Stage 4C 35 pre-fix checkpoints; Stage 6 335 injected failures restored | Legacy Stage4C harness incompatibility post-fix is superseded by Stage6 replacement replay, not a skip. |
| compatibility | Stage 7 compatibility PASS 12/12 | Stage 5/6 timeout/deferred was not counted as PASS and is resolved by Stage 7. |
| browser | Stage 7 browser authoritative PASS; browser fast PASS; final real Chromium standalone PASS | Local browser blockers were not converted to PASS. |
| Worker | Stage 7 final worker-backed standalone unminified PASS and minified PASS in Chromium 151 | Worker emulation was explicitly not accepted as semantic evidence. |
| standalone | Stage 7 standalone static 3/3 PASS; final byte reproducibility PASS for unminified/minified | Stage 5 pre-router standalone hashes superseded by Stage 7 final hashes. |

No new skip was found that hides the transactionality regression. Stage-5/6 compatibility timeouts were explicitly not counted as PASS and are closed by Stage 7.

## 12. Evidence-file sanity

Selected final manifests verified:

| Manifest | Result | CWD |
|---|---|---|
| `verification/update8/delta-sha256sums.txt` | `PASS` | `.` |
| `artifacts/update-08-stage-03-sha256sums.txt` | `PASS` | `.` |
| `artifacts/update-08-stage-04a-sha256sums.txt` | `PASS` | `.` |
| `artifacts/update-08-stage-04b-sha256sums.txt` | `PASS` | `.` |
| `artifacts/update-08-stage-04c-sha256sums.txt` | `PASS` | `.` |
| `artifacts/update-08-stage-04d-sha256sums.txt` | `PASS` | `.` |
| `artifacts/update-08-stage-04-synthesis-sha256sums.txt` | `PASS` | `.` |
| `artifacts/update-08-stage-06-sha256sums.txt` | `PASS` | `.` |
| `artifacts/update-08-stage-07-router-fix-sha256sums.txt` | `PASS` | `.` |
| `artifacts/update-08-stage-07-final-sha256sums.txt` | `PASS` | `.` |
| `update-08-stage-08a-sha256sums.txt` | `PASS` | `artifacts` |
| `artifacts/update-08-stage-08b-sha256sums.txt` | `PASS` | `.` |
| `artifacts/update-08-stage-08c-sha256sums.txt` | `PASS` | `.` |
| `SHA256SUMS.txt` | `PASS` | `.` |

Non-controlling superseded manifest notes:

- `artifacts/update-08-stage-05-sha256sums.txt` no longer matches the current standalone bundles because Stage 7 router repair regenerated those bundles. Stage-7 final manifest controls current standalone outputs.
- `artifacts/update-08-stage-07-sha256sums.txt` no longer matches the repaired router-race runner. Stage-7 original is historical failure evidence; router-fix/final manifests pass.

All machine-readable artifacts used as final PASS evidence exist, are non-empty, and parse as JSON where applicable.

## 13. Stage 8A and Stage 8C

Stage 8A final result is accepted without rerunning the anti-cleanup audit:

```text
STAGE_8A_RESULT = ANTI_CLEANUP_AUDIT_PASS
READY_FOR_STAGE_8D_FROM_8A = yes
```

Stage 8C is supporting evidence only:

```text
STAGE_8C_RESULT = PACKAGE_AND_ARTIFACT_AUDIT_PASS
READY_FOR_STAGE_8D_FROM_8C = yes
```

Because this Stage 8B final audit adds new artifacts and updates `SHA256SUMS.txt`, Stage 8C requires a short revalidation after commit.

## 14. Final decision

```text
STAGE_8B_RESULT = EVIDENCE_AUDIT_PASS
READY_FOR_STAGE_8D_FROM_8B = yes
production files changed during Stage 8B: none
```

Blockers: none.

Warnings carried forward:

1. `CHECKSUM_POLICY_SCRIPT_REJECTS_ARTIFACT_ENTRIES` remains relevant if Stage 8D requires `scripts/checksums.mjs verify` as a policy gate. Raw `SHA256SUMS.txt` verification passes after Unicode filename normalization.
2. Stage 8C must be revalidated against the tree containing these final Stage-8B artifacts before Stage 8D.
