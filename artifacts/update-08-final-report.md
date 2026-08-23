# Update 8 — Final closure report (Stage 8D)

## 1. Executive summary

`UPDATE_8_RESULT = COMPLETE`  
`UPDATE_8_CLOSED = yes`  
`READY_FOR_NEXT_UPDATE = yes`

Stage 8D is a synthesis/closure step only. It creates the final archival evidence package and does not change production or distribution files.

Prerequisites were verified from the controlling current artifacts:

```text
READY_FOR_STAGE_8D_FROM_8A = yes
READY_FOR_STAGE_8D_FROM_8B = yes
READY_FOR_STAGE_8D_FROM_8C = yes
STAGE_8D_PREREQUISITES = SATISFIED
```

Repository metadata from the controlling Stage 8C revalidation and current package files:

| Field | Value |
|---|---|
| repository | `https://github.com/Sargon17-Green/pastafari-calendar` |
| branch | `main` |
| HEAD SHA | `aa626097a175a167ae022e706c6b704eeb55769c` |
| tree SHA | `845b875bbead29c89d60c58dfa933c9893faa762` |
| package version | `1.3.0` |
| working tree | uploaded ZIP archive; `.git` unavailable locally; Stage 8D changes are artifact/manifest-only |

The uploaded archive has no `.git` directory, so Stage 8D could not independently enumerate commit graph edges after the recorded Stage 8C revalidation commit. Instead, it anchors to the controlling Stage 8C revalidation record, verifies the current production/distribution file hashes, and limits the Stage 8D delta to final artifacts plus root checksum manifest update.

## 2. Scope

Stage 8D is final QA synthesis, evidence closure, and release-documentation audit only. It is not a version bump, tag, GitHub Release, npm publish, Update 9, or a new production repair.

`production files changed during Stage 8D: none`

## 3. Original bug

The original Update 8 defect was failed-construction non-transactionality in generated authoritative runtime state.

Pre-fix behavior, as established across Stage 3 and Stage 4, was:

- failed constructors could leave shared arena state;
- representative natural failures left `+12` arena residue;
- repeated failures accumulated linearly;
- caller argument references could remain reachable through the arena;
- failed-new object identities could be published to a WeakMap;
- the identity sequence could advance because of failed calls;
- nested construction showed that a global reset is the wrong invariant because outer/preexisting state may legitimately exist.

The semantic invariant fixed by Update 8 is:

```text
state_after_failed_call == state_at_invocation_entry
```

It is explicitly not:

```text
state_after_failed_call == process_startup_state
```

## 4. Evidence and reproduction

Stage 3 confirmed measurable failed-construction leakage after later reconstruction/alignment. The chronology is important: the Stage 3 report was reconstructed after some Stage 4 artifacts already existed, but it relied only on natural-failure measurements and production-equivalence evidence. It must not be read as if that reconstructed artifact existed during the original 4B–4D runs.

Stage 4A completed repeated-failure/history evidence. Stage 4B–4D had real historical `READY=no` findings at the time they were run, because the Stage 3 artifact/alignment blocker was still formally open. Stage-4 Closure later cleared that stale formal blocker using Stage 3 presence and production equivalence.

The two confirmed original defect families were:

```text
STATE:generated:shared-invocation-arena
STATE:generated:identity-map-and-counter
```

## 5. Root cause

The root cause was publication/mutation before constructor success was known, without invocation-entry rollback ownership.

For the arena, generated wrappers could reserve frames and write argument measurement state, then exit exceptionally before cleanup restored the entry boundary. For identity metadata, generated limited-measure helpers could assign object/function IDs into shared identity metadata and advance the counter before the failed construction was known to have failed.

Stage 4 fault injection localized zero residue at wrapper entry and residue after reservation/publication windows. The measured signatures were lifecycle evidence, not constants for a hard-coded repair.

## 6. Stage-5 fix

Stage 5 implemented a compensating transactionality fix, not a redesign.

Arena behavior:

- captures the invocation-entry boundary;
- rolls back on exceptional exit;
- preserves outer/preexisting state;
- rethrows the original error.

Identity behavior:

- introduces nested transaction ownership;
- journals only new keys owned by the failing invocation;
- rolls back failed-owned keys;
- restores the counter;
- commits/transfers successful nested ownership;
- preserves preexisting IDs.

Stage-5 production changes for the original fix:

- `src/5efdcc3e6fb071cbaffdcb117507a169dd76.js` — `99c7a18b015b669654eec06b49740df1b884465b43702b9705e4f6d9fd87ede9`
- `browser/pastafari-calendar-core-chronicle.js` — `36fed61386d9c545a191393e4bfd647ccefbc26fef11bec88faa708ed69b77ea`
- `browser/standalone/pastafari-date.js` — `532ccdd809633ee79aab618bda9b98b48d740798436fd1c1917f3fcf3340136d`
- `browser/standalone/pastafari-date.min.js` — `a78dfc01c8dd250e5639972756aadbb80e7bb9e77cc5bd9b8f0b68e1793f0b6a`

## 7. Independent verification

Stage 6 independently verified the Stage-5 fix.

Required evidence summary:

- 9 natural failure paths;
- 1/10/100/1000 repeated failures with zero accumulation;
- 5000-failure long campaign;
- failed references absent;
- failed identities absent;
- clean-history identity allocation preserved;
- nested depths 1/2/3/5/10/25;
- 2000 deterministic mixed operations;
- 335 injected failure cases with zero leaks;
- reference oracle PASS;
- `npm test` PASS apart from expected skips.

Stage 6 controlling result:

```text
FIX_INDEPENDENTLY_VERIFIED
```

## 8. Cross-environment verification

Stage 7 did not pass on its first attempt. The original cross-environment run verified parts of Node/public, real Chromium/browser, fast compatibility, and npm package consumer behavior, but it found a standalone/router Worker lifecycle failure.

The controlling final Stage 7 result is:

```text
CROSS_ENVIRONMENT_VERIFIED_AFTER_ROUTER_REPAIR
```

Final controlling evidence covers, per the Stage 7 final and Stage 8C artifacts:

- Node/public focused failures and post-failure recovery;
- real Chromium/browser authoritative and browser fast evidence retained where sources were unchanged;
- real Worker evidence through standalone bundles;
- standalone and standalone minified after repair;
- fast compatibility evidence retained because authoritative/fast engine sources did not change in the router repair;
- router after repair;
- npm package/tarball consumer;
- canonical rebuild / standalone reproducibility;
- post-failure recovery.

Package/tarball final evidence from Stage 7 final revalidation and Stage 8C revalidation:

| Metric | Value |
|---|---|
| npm pack dry-run | `PASS` |
| npm pack | `PASS` |
| tarball files | `270` |
| package size | `90136568` |
| unpacked size | `120648213` |
| tarball SHA-256 | `621cbea5dddd253bbcb740d99e5785bcb7a1a0d35090b7e5dbad92ccb3146daf` |
| Stage 8C npm shasum | `ed545007704450e6bd202effd2807dcb9dd098f7` |

## 9. Additional defect discovered during verification

A separate defect was discovered during Stage 7 cross-environment verification:

```text
ROUTER_IDLE_SHUTDOWN_INFLIGHT_AUTHORITATIVE
```

How it was discovered: Stage 7 real Worker/standalone verification reproduced `ERR_ENGINE_TERMINATED` / `AbortError` during standalone unminified and minified operation after an idle authoritative shutdown race.

Problem: `_scheduleAuthoritativeShutdown()` checked selected state modes but ignored non-empty in-flight authoritative request state, allowing the idle timer to terminate the authoritative Worker during an unverified bootstrap conversion for a new calculation day.

Production files changed by the router repair:

- `browser/pastafari-calendar-router-core.js`
- `browser/standalone/pastafari-date.js`
- `browser/standalone/pastafari-date.min.js`

Standalone outputs were rebuilt after the router repair. The final Stage 7 revalidation passed, and Stage 8B/8C classify the earlier router failure as historical/superseded rather than stale controlling evidence.

This router repair is a separately discovered integration/router defect. It is not the root cause of the original failed-construction transactionality bug and must not be attributed to the Stage-5 fix.

## 10. Anti-cleanup audit

Stage 8A verified the solution was compensating and limited:

- no shared arena removal;
- no WeakMap subsystem replacement;
- no cache/runtime-patch machinery redesign;
- no deletion of intentional indirection, detours, or fossils;
- no public API change.

```text
STAGE_8A_RESULT = ANTI_CLEANUP_AUDIT_PASS
READY_FOR_STAGE_8D_FROM_8A = yes
```

## 11. Evidence consistency audit

Stage 8B final supersedes the earlier regenerated Stage-8B ledger.

```text
STAGE_8B_RESULT = EVIDENCE_AUDIT_PASS
READY_FOR_STAGE_8D_FROM_8B = yes
```

Stage 8B final audited chronology/provenance, classified superseded artifacts, resolved deferred/timeouts, rejected fake PASS treatment, completed traceability, preserved Stage-7 repair chronology, and made the regenerated Stage-8B ledger historical provenance only.

## 12. Distribution/package/checksum audit

Stage 8C revalidation is the controlling package/artifact audit for entering Stage 8D.

It verified:

- production/distribution unchanged since controlling Stage 7;
- root `SHA256SUMS.txt` raw verification PASS;
- Stage-specific manifests PASS;
- npm pack dry-run unchanged;
- package candidate unchanged;
- Stage-8 files not shipped in npm package;
- leakage scan PASS;
- four previous broken-reference findings resolved or classified as false-positive prefix references.

```text
STAGE_8C_REVALIDATION_RESULT = PASS
READY_FOR_STAGE_8D_FROM_8C = yes
```

## 13. Compatibility/public API

Public compatibility evidence closes as follows:

- public API unchanged by Stage-5 transactionality fix;
- exception behavior preserved;
- success outputs preserved;
- reference equality preserved;
- package exports preserved;
- Stage-7 router repair changed internals only and did not change public API according to the final evidence.

## 14. Final hashes

| File | SHA-256 |
|---|---|
| `src/5efdcc3e6fb071cbaffdcb117507a169dd76.js` | `99c7a18b015b669654eec06b49740df1b884465b43702b9705e4f6d9fd87ede9` |
| `src/public-api.js` | `9d8c63636033659753d658ac9d76fa955ee8423bbf1cd11bfb90eab25a49f827` |
| `browser/pastafari-calendar-core-chronicle.js` | `36fed61386d9c545a191393e4bfd647ccefbc26fef11bec88faa708ed69b77ea` |
| `browser/pastafari-calendar-router-core.js` | `ca2e0544c9e73076cac24d218431e535d19a155298bdbf002b5e98bea3af5b03` |
| `browser/pastafari-authoritative-worker.js` | `02d7222dab128cc23b355f6048f4965368e1a74db4b2944a34e2401bdd434656` |
| `browser/pastafari-calendar-fast.js` | `03de7a8125c1c4c63a9946b531b754c4828adc9f998ddd8b7a5ef4b5adcc4473` |
| `browser/standalone/pastafari-date.js` | `f1adfc1f4e64d9fc7dcb591a7c5e852210e0d2de3ff3d2a08668a8c17ffbea2b` |
| `browser/standalone/pastafari-date.min.js` | `7a2f60e304dfe1c8dc98d54fa894e337e9864648ff5b401a51e661e9f5290481` |
| `package.json` | `5e02e6b190d57fea928ffe11fd84cf22573c02c0b635fc07372218565205a40f` |

## 15. Remaining warnings

### BLOCKING

None.

### NON_BLOCKING

```text
CHECKSUM_POLICY_SCRIPT_REJECTS_ARTIFACT_ENTRIES
KNOWN_PREEXISTING_POLICY_MISMATCH
NON_BLOCKING_FOR_UPDATE_8_CLOSURE
```

This is not a cryptographic checksum failure. Raw `sha256sum -c SHA256SUMS.txt` passes. The repository checksum-policy script rejects committed `artifacts/*` entries by policy. Stage 8D preserves this warning and does not change the policy script.

### OUT_OF_SCOPE / FUTURE WORK

None added to Update-8 completion criteria.

## 16. Stage ledger

| Stage | Final result | Controlling status |
|---|---|---|
| 1 | `success baseline accepted` | PASS |
| 2A | `construction inventory closed` | PASS |
| 2B | `shared-state inventory ready` | PASS |
| 3 | `CONFIRMED_LEAK` | PASS evidence |
| 4A | `TECHNICAL_EVIDENCE_COMPLETE` | PASS |
| 4B–4D | `historical findings confirmed; historical READY=no preserved` | superseded readiness |
| 4 Closure | `READY_FOR_STAGE_5` | PASS |
| 5 | `FIX_IMPLEMENTED` | PASS |
| 6 | `FIX_INDEPENDENTLY_VERIFIED` | PASS |
| 7 | `CROSS_ENVIRONMENT_VERIFIED_AFTER_ROUTER_REPAIR` | PASS |
| 8A | `ANTI_CLEANUP_AUDIT_PASS` | PASS |
| 8B | `EVIDENCE_AUDIT_PASS` | PASS |
| 8C | `revalidation PASS` | PASS |

## 17. Requirements traceability summary

| Category | Status |
|---|---|
| reproduction | `CLOSED` |
| root cause | `CLOSED` |
| history | `CLOSED` |
| nesting | `CLOSED` |
| fault injection | `CLOSED` |
| publication | `CLOSED` |
| fix | `CLOSED` |
| independent proof | `CLOSED` |
| cross-environment | `CLOSED` |
| package | `CLOSED` |
| anti-refactor | `CLOSED` |
| evidence integrity | `CLOSED` |
| checksum/artifact integrity | `CLOSED` |

## 18. Final decision

```text
UPDATE_8_RESULT = COMPLETE
UPDATE_8_CLOSED = yes
READY_FOR_NEXT_UPDATE = yes
production files changed during Stage 8D: none
```
