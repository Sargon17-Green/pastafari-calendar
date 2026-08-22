# Update 8 — Stage 4 Closure / Synthesis לפני Stage 5

## 1. Revision

- Repository: `Sargon17-Green/pastafari-calendar`
- Branch: `main`
- Current `main` commit: `768efa46edda7f2320cf75e4f7fffee5d47fb983`
- Package version: `1.3.0`
- Working tree: ה-snapshot שהועלה הוא archive ללא `.git`, ולכן `git status` מילולי אינו זמין מתוכו. בעותק העבודה של הסינתזה נוצרו רק artifacts חדשים; production לא שונה.

## 2. Production alignment

**Result: aligned.** ה-revisions אינם אותו commit מילולי, אך עץ ה-production שקול.

GitHub compare אל `768efa46edda7f2320cf75e4f7fffee5d47fb983` נבדק עבור בסיסי Stage 3 ו-4A–4D:

| Stage | Baseline / run commit | Relation to current main | Relevant production changed? |
|---|---|---|---|
| 3 | `4ddceddba65502a3064a2876b6b85745b8974c4b` (report current-main); dynamic natural evidence also cites `81cc54b1e15d8f3c0cd9cc8cb41d07f57fdecddf` | different commit | no |
| 4A | `ce49a21700316a4339f29411f104c22dd2616295` | different commit | no |
| 4B | `e2189879a9593c6df7f155a8b3c7bef1af5e207a` | different commit | no |
| 4C | `c141a94840a7806c73a8aaf8a87db22b7a9af1bc` | different commit | no |
| 4D | `81cc54b1e15d8f3c0cd9cc8cb41d07f57fdecddf` | different commit | no |

The compare sets contain only reports/artifacts/checksums, verification scripts and/or `.github/workflows/update-08-stage-04a.yml`. No relevant production path changed.

The Stage-2B production hashes were also rechecked in the uploaded snapshot and match exactly:

- `src/5efdcc3e6fb071cbaffdcb117507a169dd76.js` — `a7e01b505870a7a72ce0bde98dc5e4d19f39bd8d560fdf961a4d5f4d2dfdd30d`
- `src/public-api.js` — `9d8c63636033659753d658ac9d76fa955ee8423bbf1cd11bfb90eab25a49f827`
- `browser/pastafari-calendar-core-chronicle.js` — `315f46a49f13db13b61d325915a6a5a32b7f043594c541c1886cfd8c0865db4a`
- `browser/standalone/pastafari-date.js` — `958f7f30cb8ad6a3a95570d8ed025e3131481b543c761ac9582103f069ad3b13`

All Stage-3/4A/4B/4C/4D checksum manifests pass `sha256sum -c` in the supplied snapshot.

Therefore no campaign rerun is required by the closure task.

## 3. Stage 3 status

Stage 3 is now present and checksum-valid:

- `artifacts/update-08-stage-03-report.md`
- `artifacts/update-08-stage-03-reproduction.json`

Its result is `STAGE_3_RESULT = CONFIRMED_LEAK`. The natural-failure evidence identifies the same two actionable state families later refined in Stage 4: the shared invocation arena and generated identity metadata. The earlier provenance caveat is resolved for Stage-4 closure by explicit production-equivalence checks to current `main`.

## 4. Stage 4A synthesis

`update-08-stage-04a-report.md` and its JSON are complete and checksum-valid.

- Required natural failure paths attempted: **9/9**.
- Confirmed natural failure paths: **9/9**.
- 100-failure runs: complete for all confirmed paths.
- 1000-failure runs: complete for all confirmed paths; each measured path reached arena delta `+12000`.
- Exception class/message contracts: stable.
- Successes after failures: reference-equal.
- `A → FAIL → A`: passed for all recorded vectors.
- Alternating success/failure: passed semantically while state drift accumulated.
- Fresh-process dirty-vs-clean comparisons: passed semantically and exposed retained-state difference.
- Same-multiset permutations: history dependence measured; order changed retained-state fingerprints.
- Post-failure success soak: passed.
- 1000 valid `GregorianDate` control constructions: zero net arena delta; passed.
- `STAGE_4A_RESULT = TECHNICAL_EVIDENCE_COMPLETE`.
- `READY_FOR_STAGE_5_FROM_4A = yes`.

Stage-5 implication: failures accumulate structural internal state without observed output corruption; therefore the repair must restore failure transactionality without perturbing successful semantics.

## 5. Historical `READY=no` treatment for 4B–4D

The historical reports are not rewritten. Their `READY_FOR_STAGE_5_FROM_4B/4C/4D = no` statements were correct when written because Stage 3 had not yet been uploaded/aligned and unified 4A–4D closure had not yet been performed.

That blocker is now stale, not technical:

1. Stage 3 artifacts exist and their checksums pass.
2. Production equivalence from each recorded Stage-3/4A/4B/4C/4D revision to current `main` is established.
3. No new production divergence was found.

Accordingly, the old `READY=no` values remain historical facts but are not current blockers.

## 6. Confirmed defect families

### 6.1 `STATE:generated:shared-invocation-arena`

**Scope:** module/global shared generated invocation arena.

**Writer:** the common generated invocation wrapper and preamble reservation/argument-measurement logic.

**Reader:** later generated wrappers that derive frame/base information from the shared arena.

Confirmed behavior:

- `GEN_WRAP_ENTRY` fault: zero residue.
- `GEN_WRAP_AFTER_RESERVATION`: `+12` residue.
- Ordinary natural failed constructions: `+12` each in Stage 4A.
- Repetition: `+1200` after 100 failures and `+12000` after 1000 on every confirmed Stage-4A path.
- Stage-4C structural signatures: `+12`, `+24`, `+27`, `+33`. These are evidence of reservation/lifecycle structure, not constants for a fix.
- A later success has zero net arena delta but does not remove earlier residue.
- The retained tail can strongly retain caller argument containers/keys.
- Stage 4B establishes the compositional failure mode: ancestor wrapper reserves → descendant runs and cleans locally → descendant throws → ancestor cleanup is bypassed → ancestor frame remains.
- No supported-public-API tuple corruption was observed, but the state is semantically active internally and violates the required transactionality invariant.

**Required post-failure invariant:** restore the arena to the failed invocation's entry-equivalent state while preserving all legitimate preexisting/outer frames and eliminating stale strong references owned by the failed invocation.

### 6.2 `STATE:generated:identity-map-and-counter`

**Scope:** module-shared identity `WeakMap` and its associated identity sequence/counter.

**Writer:** generated limited-measure / argument-identity logic that can execute before constructor success is known.

**Reader:** later known-key `WeakMap.has/get` and identity reuse.

Confirmed behavior:

- A caller-held object key absent before a failed construction can be present afterward with an assigned identity ID.
- Repeating failure with the same key reuses that failure-assigned ID.
- Distinct failed keys receive successive IDs, proving persistent identity-sequence advancement.
- `WeakMap` cardinality was intentionally not enumerated and is not required for the finding.
- The `WeakMap` is weak, so no claim is made that it strongly retains dead keys; the observable defect is persistent metadata for live/known keys plus sequence advancement.
- No calendar-output corruption was observed from this residue.

**Required post-failure invariant:** known-key identity state and future identity-allocation behavior must be entry-equivalent after a failed invocation, while preserving mappings/IDs that predated that invocation or legitimately belong to outer/preexisting state.

## 7. Explicit non-target state families

The evidence does **not** justify widening Stage 5 to the following families unless new evidence appears:

- decoded combinatorial memo Maps;
- decoded sauce LRU;
- decoded forward/backward gap memos;
- authoritative per-instance `PastafariCalendar` caches;
- cache-epoch transaction machinery;
- runtime patch ownership ledger;
- installation registries / WeakSets and prototype-patch installer state;
- prototype/function descriptors and exported constructor/prototype identities;
- partial constructor `this` publication.

For the cache-epoch and per-instance cache paths, injected failures rolled tentative state back and later same-key reads recomputed reference-equal values. Runtime patch ownership passed nested/reentrant depths `1/2/3/5/10`, inner-fail/outer-continue, inner-then-outer-fail and external-patch ownership cases. Distinct `PastafariCalendar` instances retained distinct cache objects.

## 8. Unified defect / lifecycle model

The two confirmed defects share one semantic pattern: mutation/publication occurs before the invocation is known to have completed successfully, but failure does not fully compensate that mutation.

The governing invariant for Stage 5 is:

```text
state_after_failed_call == state_at_invocation_entry
```

It is explicitly **not**:

```text
state_after_failed_call == process_startup_state
```

This distinction is mandatory for nesting/reentrancy. Cleanup must remove only state owned by the failing invocation (and any effects that semantically belong to its transaction) without erasing legitimate state that existed at entry or belongs to an outer invocation.

## 9. Arena ownership requirement

A repair equivalent to:

```text
sharedArray.length = some_global_baseline
```

is insufficient and can be wrong. It can erase legitimate preexisting/outer frames. Stage 4B proves that parent/child cleanup boundaries matter.

The conceptual requirement is ownership-aware entry restoration, e.g. an invocation derives/captures its entry state, existing behavior runs, and failure compensation removes only the contribution owned by that invocation while respecting nested child/parent ownership. The exact implementation remains a Stage-5 design choice; Stage 4 does not mandate an undo ledger, owner stack, snapshot/restore, tombstone or frame transaction.

## 10. Identity WeakMap / counter requirement

### Observable/testable

Use the known-key semantics already proven by Stage 3/4C/4D: `has(key)`, `get(key)`, same-key reuse and sequential IDs for distinct failed keys. Do not attempt to enumerate `WeakMap` cardinality.

### WeakMap mapping

If a key was absent at invocation entry and becomes mapped solely because of a failed invocation, the mapping must not remain observable after failure. `WeakMap.delete` or another mechanism may be an implementation candidate, but Stage 4 does not select the mechanism.

### Counter / identity sequence

The raw counter is not exported; advancement is established indirectly from sequential assigned IDs. Stage 5 must restore or compensate the sequence semantics so a failed invocation does not perturb subsequent clean-history identity allocation. A naive unconditional decrement/reset is **not** specified because nesting/interleaving must preserve preexisting and legitimate outer assignments and avoid collisions.

### Nesting

An inner failure must not erase identity metadata that existed before the inner invocation. Any outer failure compensation must likewise respect ownership and must not corrupt unrelated/preexisting mappings.

### Stage-5 proof obligations for identity

- failed-new-key returns to entry-equivalent absence under known-key `has/get`;
- preexisting key keeps exactly its prior ID;
- same-key failed repetitions create no persistent new metadata;
- distinct failed keys do not perturb subsequent identity sequence relative to clean history;
- nested failure cases preserve legitimate outer/preexisting IDs;
- exception contracts and successful outputs remain unchanged.

## 11. Stage-5 required scope / constraints

Stage 5 is required to:

- implement invocation-entry rollback semantics for both confirmed defect families;
- be nesting/reentrancy safe and compositionally LIFO/ownership-aware;
- preserve legitimate outer/preexisting state;
- preserve multi-instance isolation;
- preserve exception class and exact message;
- preserve successful outputs and authoritative/reference equality;
- stop repeated-failure accumulation/history residue;
- remove strong stale argument references contributed by failed arena frames;
- handle generated identity metadata transactionally as required by the known-key/identity-sequence evidence.

Stage 5 must **not**:

- reset to a global startup baseline;
- blanket-clear the shared arena;
- erase legitimate outer frames;
- clear unrelated caches/memos;
- redesign runtime patch ownership or cache-epoch transaction machinery without new evidence;
- refactor away intentionally shared/spaghetti architecture merely to solve these defects;
- change the public API;
- change successful-call semantics;
- hard-code `12/24/27/33` as the solution model.

## 12. Regression obligations for Stage 5

After the fix, at minimum rerun and pass:

1. all Stage-3 natural reproductions;
2. all Stage-4A 100-failure campaigns;
3. all Stage-4A 1000-failure campaigns;
4. alternating success/failure;
5. `A → FAIL → A`;
6. fresh-process dirty-vs-clean comparisons;
7. permutation / same-multiset-different-order cases;
8. post-failure success soak;
9. Stage-4A zero-delta success control;
10. Stage-4B nested failure cases;
11. inner fail / outer continue;
12. inner fail / outer fail;
13. nesting depths `1/2/3/5/10` where applicable;
14. multi-instance isolation;
15. preexisting/outer state preservation;
16. Stage-4C checkpoint faults, including `GEN_WRAP_ENTRY` and all post-reservation windows;
17. Stage-4D publication/cache/identity readers with known-key identity checks;
18. independent reference oracle;
19. existing cache/reentrancy/runtime-patching regression suites.

The intended post-fix result is not merely “no growth on average”: each failed call must satisfy entry-relative state restoration for the state it owns.

## 13. Unresolved items

No remaining item blocks Stage 5.

Non-blocking limits to carry forward:

- the raw identity counter is not directly exported/read; evidence is from sequential assigned IDs;
- `WeakMap` cardinality remains intentionally non-enumerated;
- no immediate supported-public-API tuple corruption has been observed, so correctness of the fix must be judged primarily by transactional-state invariants plus unchanged success/reference behavior.

## 14. Final readiness

- Historical missing-Stage-3 blockers: cleared by current artifact presence plus production equivalence.
- Real production-change blocker: none.
- Confirmed actionable defect families: exactly two.
- Non-target families: explicitly bounded as above.
- Stage-5 rollback, nesting, ownership and regression obligations: defined.
- Production files changed by this closure: none.

```text
STAGE_4_CLOSURE_RESULT = READY_FOR_STAGE_5
```
