# Update 8 — Stage 4D Report

## 1. Revision

- Repository: `Sargon17-Green/pastafari-calendar`
- Branch: `main`
- Commit: `81cc54b1e15d8f3c0cd9cc8cb41d07f57fdecddf`
- Package version: `1.3.0`
- Uploaded ZIP SHA-256: `e372779ec19a5ba81b0d34a1844c3e98d26498c4bfe3a9b362f691cff5197abc`
- Working tree: the supplied archive contains no `.git`; analysis-only scripts/artifacts were added locally. No production file was modified.

Production hashes match the Stage 2B inventory exactly:

- `src/5efdcc3e6fb071cbaffdcb117507a169dd76.js` — `a7e01b505870a7a72ce0bde98dc5e4d19f39bd8d560fdf961a4d5f4d2dfdd30d`
- `src/public-api.js` — `9d8c63636033659753d658ac9d76fa955ee8423bbf1cd11bfb90eab25a49f827`
- `browser/pastafari-calendar-core-chronicle.js` — `315f46a49f13db13b61d325915a6a5a32b7f043594c541c1886cfd8c0865db4a`
- `browser/standalone/pastafari-date.js` — `958f7f30cb8ad6a3a95570d8ed025e3131481b543c761ac9582103f069ad3b13`

GitHub comparison from the Stage-1 production baseline to the current commit shows only verification/checksum additions through Stages 2A/2B, not production-source changes.

**Alignment gap:** no Stage 3 artifact/harness exists in the supplied ZIP or in `verification/update8` on remote commit `81cc54b…`. Stage-3-style snapshot probes needed by 4D were reconstructed test-only, but strict Stage-3 artifact/SHA alignment cannot be certified.

## 2. Baseline semantics

Three public full-tuple success vectors were re-run on the current snapshot and all matched the Stage-1 independent reference exactly:

- `foundation_same` — PASS
- `foundation_next` — PASS
- `foundation_previous` — PASS

`npm run test:reference-oracle` also passed 19/19 tests, including generated final-stir vs independent reference and direct authoritative gate-gap vs reference.

## 3. Publication sites tested

High-value publication/read paths from Stage 2B were covered:

1. `STATE:generated:shared-invocation-arena` — common generated invocation frame → later wrapper frame/index reader.
2. `STATE:generated:identity-map-and-counter` — limited-measure WeakMap/counter publication → later `has/get` identity reader.
3. `STATE:decoded:combinatorial-memo` — module Map → combinatorial/month-weaving readers.
4. `STATE:decoded:sauce-lru` — module LRU Map → sauce/conversion readers.
5. `STATE:decoded:forward-gap-memo` and `STATE:decoded:backward-gap-memo` — module Maps → gap readers.
6. `STATE:instance:pastafari-calendar-caches` — `anchorCache`, `yearCache`, `structureCache` → `PastafariCalendar.convertJdn`.
7. `STATE:detour:cache-epoch` — shadow/provenance/transaction state → detoured cache readers.
8. `STATE:detour:runtime-patch-ledger` — temporary prototype/function patch state → ordinary method dispatch.
9. `STATE:detour:installation-registries-and-prototype-patches` — WeakSet installation registries → idempotent installers.
10. Public exports and prototype/function descriptors.

No separate generated-function registry, parent-child registry, or public instance registry was found in the Stage-2B high-value inventory.

## 4. Registry results

No `DANGLING_OWNER`, registry `ORPHAN_SLOT`, or `PHANTOM_ENTRY` was observed in the tested registries/WeakSets. Installation WeakSet membership was unchanged by failed constructors.

A distinct global-list defect **was** reproduced in the shared invocation arena: failed calls leave orphan frame slots. This is not a registry count bug, but it is a persistent module-list consistency/transactionality defect.

## 5. Cache results

Natural constructor failures caused **no size change** in the four persistent decoded memo Maps: combinatorial memo, sauce LRU, forward-gap memo, or backward-gap memo.

For the authoritative per-instance caches, test-only instrumentation injected an exception **after a real `structureCache` shadow write** during `PastafariCalendar.convertJdn`. After the throw:

- `anchorCache.shadowEntries = 0`
- `yearCache.shadowEntries = 0`
- `structureCache.shadowEntries = 0`
- all three `visibleEntries = 0`
- provenance lists were empty
- `callDepth = 0`

After removing the injection, retrying the same key recomputed normally and matched the independent reference exactly. No valid-looking partial cache entry survived.

Generic transaction controls also covered three failures on the same key, failure on key A followed by success on B, and nested outer/inner population failure. All failed transactions rolled back; later readers obtained only committed values.

**Cache classification: `NO_RESIDUE`; no `CACHE_VALIDITY_BUG` found.**

## 6. WeakMap / WeakSet results

The generated identity WeakMap is a real failed-call residue.

Known failed object inputs received IDs even though their constructors threw. In the isolated campaign the known keys received IDs 2–7; a same-key failure followed by successful construction reused the failure-assigned ID 8; eight additional distinct failed keys received sequential IDs 9–16.

This proves that failed calls publish identity metadata and advance the associated counter without rollback. The later limited-measure reader observes `has(key) = true` and reuses the ID. WeakMap cardinality was not enumerated.

The WeakMap does not itself strongly retain dead keys, but the counter advance is permanent. No calendar-output mismatch was found after this residue.

**Classification: `SEMANTICALLY_ACTIVE` internal identity-metadata residue; transactional-state violation; not exposed through the supported public API.**

Installation WeakSets remained stable across constructor failures.

## 7. Partial object publication

Test-only `newTarget` setters proved that a constructor may have a partial `this` at the instant of failure:

- `GregorianDate`: injected throw after `month` left captured `year` and `month`, with no `day`.
- `PastafariCalendar`: injected throw after `structureCache` assignment left `todayProvider`, `gates`, and all three empty Map fields.

However, no production publication edge from those aborted `this` objects to a registry/cache/parent/export was found. The captured partial objects were not keys in the generated identity WeakMap. Without the test capture, the failed constructor returns no object to the caller.

**Classification: transient partial object exists, but production publication result is `NO_RESIDUE`.**

## 8. Global/module list: shared invocation arena

This is the strongest 4D defect.

The live authoritative arena began at length `1,175,728`. Each ordinary failed constructor tested added **exactly 12 cells**:

- invalid `PastafariCalendar` options: `+12`
- invalid `IslamicDate` variant: `+12`
- invalid `MonthWeavingCounter` lengths: `+12`
- invalid `GregorianDate` month: `+12`

The leaked frame includes an arguments Array. For object/array inputs, the failed caller input was reachable through that retained arguments Array. Thus the residue is not only unused numeric cells: it is a **strong stale pointer** to failed-call data.

Ten distinct failures produced exactly `+120` cells, and all ten failed option objects remained reachable from the leaked tail. A later successful constructor added `0` net cells but **did not remove any prior residue**.

Labels: `ORPHAN_SLOT`, `STALE_POINTER`, `GLOBAL_MODULE_LIST`, `UNBOUNDED_WITH_REPEATED_FAILURES`.

**Classification: `SEMANTICALLY_ACTIVE` internal lifecycle residue and clear transactional-state violation.** No tested calendar tuple was corrupted, but later wrappers use the changed arena length/frame base and the leaked array strongly retains failed arguments.

## 9. Descriptor / prototype / function identity

Across the failed-constructor campaign and injected cache failure:

- `PastafariCalendar.prototype` identity unchanged.
- `GateIndex.prototype` identity unchanged.
- public `PastafariCalendar.prototype` identity unchanged.
- raw `PastafariCalendar.prototype.convertJdn` descriptor and function identity unchanged.
- `GateIndex.prototype.gate` descriptor and function identity restored exactly.
- public constructor descriptor unchanged.
- exported `GregorianDate`, `makeSauce`, `STONES`, `CUTLET_NAMES`, and `MONTH_NAMES` identities unchanged.

The focused regression suite passed 36 tests, with 4 pre-existing skips and 0 failures. It includes exception restoration of runtime patch ownership/descriptors and year-ceiling detour wrappers.

**Classification: `NO_RESIDUE`; no `IDENTITY_OR_DESCRIPTOR_BUG` in these paths.**

## 10. Cold / warm results

Cold sequence:

`natural constructor failures → injected authoritative cache-population failure → same-key success`

The success matched the reference exactly.

Warm sequence:

`successful foundation_same → failed PastafariCalendar construction → same cached success`

The warm result was byte-equivalent at the normalized tuple level to the prior success and matched the reference.

## 11. Same / different key results

Identity metadata:

- Same failed key: ID is reused, not duplicated.
- Distinct failed keys: new sequential IDs are assigned; the counter advances.

Cache-epoch state:

- Three repeated failures on key A left no A entry committed.
- A later successful A was computed and committed normally.
- Failure on C did not contaminate successful B.
- Nested inner failure rolled back both inner/outer tentative entries; later outer/inner success committed normally.

## 12. Multi-instance publication observations

After instance A's injected cache-population failure, a fresh instance B constructed successfully with three empty caches. A and B had distinct `anchorCache`, `yearCache`, and `structureCache` object identities.

No constructor-created global instance registry was found, and no A→B publication contamination was observed.

## 13. Post-failure reader behavior and reference comparisons

Real readers were used wherever the state has a project reader:

- shared arena: later generated wrappers read the changed arena length/frame base; residue persists.
- identity WeakMap: later limited-measure `has/get` sees failure-assigned IDs.
- authoritative caches: `PastafariCalendar.convertJdn` after rollback recomputes the same key and matches reference.
- runtime patch ledger: normal method dispatch after throw sees the restored function/descriptor.

The post-failure `foundation_same` tuple was exactly:

`(5000, לגש, 762, לבונה, 105)`

and matched the independent reference. The warm retry matched it as well.

## 14. Classified residue list

1. `STATE:generated:shared-invocation-arena` — **SEMANTICALLY_ACTIVE**; orphan 12-cell frames, stale strong pointers, unbounded repeated-failure growth; bug.
2. `STATE:generated:identity-map-and-counter` — **SEMANTICALLY_ACTIVE** internal metadata; failed keys get persistent IDs/counter advancement; bug under the update's transactional-state goal.
3. Partial constructor `this` — **NO_RESIDUE** after failure because no production publication edge was found.
4. Four decoded module memo Maps — **NO_RESIDUE** on natural constructor failures.
5. Authoritative instance cache population under failure — **NO_RESIDUE**; rollback confirmed.
6. Cache-epoch transaction metadata — **NO_RESIDUE** after same-key/different-key/nested failures.
7. Runtime patch ledger/prototype descriptors/functions — **NO_RESIDUE** after throw.
8. Installation WeakSets — **NO_RESIDUE** relative to failed construction; import-time baseline membership unchanged.

No `CACHE_VALIDITY_BUG`, `REGISTRY_CONSISTENCY_BUG`, or public `IDENTITY_OR_DESCRIPTOR_BUG` was found. The two actual defects are internal global-state residues.

## 15. Unresolved

1. **Stage 3 artifact missing.** It is absent from both the supplied snapshot and remote `verification/update8` at `81cc54b…`; therefore strict Stage-3 SHA alignment is unresolved.
2. WeakMap cardinality was intentionally not enumerated; known-key `has/get` was used as required.
3. The raw uint32 identity counter is not exported; persistent advancement is inferred directly from sequential WeakMap-assigned IDs rather than from a raw counter read.

## 16. Artifacts / files

Primary required artifact:

- `artifacts/update-08-stage-04d-publication-cache.json`

Supporting artifacts:

- `artifacts/update-08-stage-04d-arena-publication.json`
- `artifacts/update-08-stage-04d-success-sanity.json`
- `artifacts/update-08-stage-04d-reference-oracle.log`
- `artifacts/update-08-stage-04d-regression-tests.tap`
- `artifacts/update-08-stage-04d-report.md`

Test-only analysis scripts:

- `verification/update8/run-stage-04d-publication-cache.mjs`
- `verification/update8/run-stage-04d-arena-publication.mjs`

Production changes: **none**.

---

`STAGE_4D_RESULT = FINDINGS_CONFIRMED_FORMAL_CLOSE_BLOCKED_BY_MISSING_STAGE_3_ARTIFACT`

- partial publications: no externally reachable partial construction object; transient partial `this` only
- cache validity bugs: none found
- registry inconsistencies: none found; separate shared-arena orphan-slot/stale-pointer defect confirmed
- observable residue: internal shared arena + generated identity metadata; no supported-public-API residue observed
- identity/descriptor residue: identity WeakMap/counter residue yes; prototype/function/descriptor residue no
- zero-residue paths: decoded memo Maps, instance cache rollback, cache-epoch transaction metadata, runtime patch ledger, installation WeakSets
- unresolved: missing Stage 3 artifact/SHA alignment

`READY_FOR_STAGE_5_FROM_4D = no`

Reason: the technical 4D campaign found and classified the relevant residues, but the explicit prerequisite to load and SHA-align Stage 3 cannot be satisfied from the supplied/current repository state. Independently, Stage 5 must wait for the unified 4A/4B/4C/4D result.
