# Update 8 — Stage 4B: Nested failures, reentrancy, ownership ו־multi-instance isolation

## 1. Revision

- Repository: `Sargon17-Green/pastafari-calendar`
- Branch: `main`
- Current commit: `e2189879a9593c6df7f155a8b3c7bef1af5e207a`
- Package version: `1.3.0`
- Working tree: literal local `git status` is unavailable in this runtime.
- Production alignment: comparison `81cc54b1e15d8f3c0cd9cc8cb41d07f57fdecddf..e2189879a9593c6df7f155a8b3c7bef1af5e207a` contains only Stage 4C/4D artifacts and verification scripts; no production source changed.

Stages 1, 2A and 2B are present. Stage 3 is not present in the current repository, so strict Stage-3 artifact/SHA alignment cannot be certified. This is treated as a formal closure gap, not as a reason to discard the production-identical executed evidence already committed by 4C/4D.

No production code is changed by Stage 4B.

## 2. Evidence used

The focused regression TAP already committed at `artifacts/update-08-stage-04c-regression-tests.tap` records **40 tests, 36 PASS, 0 FAIL, 4 SKIP**.

The current runtime-patching suite covers:

- nesting depths 1, 2, 3, 5 and 10;
- two instances in a nested call;
- inner exception caught by outer while outer continues;
- inner exception followed by outer exception;
- late external patching and descriptor preservation;
- non-LIFO external replacement during a project call;
- throwing external patch;
- explicit LIFO repair trace;
- 200 deterministic mixed nested/success/failure calls with zero patch drift;
- A-B-A history and two-instance interleaving;
- X→Y external replacement without resurrection of X;
- recursive reentry from a late user patch;
- a user patch installing a newer late patch.

Stage 4C supplies authoritative generated-core failure evidence. Stage 4D supplies cache/publication and multi-instance cache evidence.

## 3. Runtime patch ownership: PASS

For depths `1/2/3/5/10`, the runtime patch stack returns to:

```text
invocationDepth = 0
patchDepth      = 0
owners          = []
tokens          = []
```

The original function and property descriptor are restored.

The test in which the inner call throws and the outer call catches it still produces the expected outer semantic result. The case in which the inner throws and then the outer also throws restores the entry descriptor. These are direct evidence that this ownership stack is exception-safe and LIFO-correct for the tested paths.

Preexisting external state is also respected: a late user patch survives normal restoration, a non-LIFO replacement installed during the call is not erased, and replacing external X with Y never resurrects X.

**Classification:** `STATE:detour:runtime-patch-ledger = NO_RESIDUE / NESTING_SAFE_IN_TESTED_PATHS`.

## 4. Cache transaction ownership and instances: PASS

The committed tests show failed cache population rolls shadow state back and leaves no partial valid entry. Nested population commits/restores with depth returning to zero.

Stage 4D additionally observed that two `PastafariCalendar` instances have distinct `anchorCache`, `yearCache` and `structureCache` identities, and that a failed cache-population path on A did not contaminate a fresh B.

**Classification:**
- `STATE:detour:cache-epoch = NO_RESIDUE`
- `STATE:instance:pastafari-calendar-caches = ISOLATED`

## 5. Generated shared arena: nested/compositional failure remains broken

The generated common invocation wrapper reserves a 12-cell outer frame and truncates it only on normal return.

Stage 4C measured the important nested case: a fault at `GEN_WRAP_AFTER_CLEANUP` still leaves **+12 cells**. The local wrapper in which the hook fired had already performed its own cleanup; the throw then propagated through an ancestor wrapper that had not reached its cleanup.

Therefore the bug is not only “a constructor forgot cleanup”. It is compositional:

```text
ancestor reserves frame
→ descendant runs
→ descendant/local cleanup succeeds
→ descendant throws
→ ancestor normal-return cleanup is bypassed
→ ancestor frame remains
```

This directly violates nested failure transactionality and proves that local cleanup alone is insufficient.

**Classification:** `STATE:generated:shared-invocation-arena = FAILURE_TRANSACTIONALITY_BUG / NESTING_SENSITIVE`.

## 6. Generated identity metadata: shared failure residue

Stage 4C also measured persistent failed-key publication in the generated identity WeakMap/counter path.

- a new failed object key can receive an ID;
- retrying the same key reuses that ID;
- distinct failed keys receive later IDs and therefore advance the shared counter;
- no rollback occurs when construction fails.

This state is module-shared rather than per-instance. It does not create the same strong-retention behavior as the shared arena, but it still violates the update's semantic failed-call transactionality requirement.

**Classification:** `STATE:generated:identity-map-and-counter = FAILURE_TRANSACTIONALITY_BUG`.

## 7. Multi-instance isolation result

Isolation is mixed:

| State family | Result |
|---|---|
| per-instance authoritative caches | isolated |
| cache-epoch transaction metadata | nested-safe in tested paths |
| runtime patch ledger | shared but ownership-safe in tested paths |
| generated shared invocation arena | shared and not failure-transactional |
| generated identity WeakMap/counter | shared and not failure-transactional |

So a blanket statement that “instances are isolated” would be incorrect. Instance-owned caches are isolated; generated module-global construction bookkeeping is not.

## 8. Preexisting state / late ownership

The runtime-patching tests specifically cover state that already exists at call entry:

- an external patch already installed;
- a new external writer installed while the project call is active;
- external X later replaced with Y;
- reentry through a user-installed patch.

No tested path restored a stale owner over a newer external owner. Function identity and descriptors matched the correct entry/latest-external state.

## 9. Exception and semantic stability

The focused regression run has 0 failures. The committed success sanity from 4D reports:

- `foundation_same` — PASS
- `foundation_next` — PASS
- `foundation_previous` — PASS
- independent reference-oracle run — 19/19 PASS

Thus the observed failure-state defects are not being conflated with a known success-semantics mismatch.

## 10. Stage 4B conclusion

`STAGE_4B_RESULT = TECHNICAL_FINDINGS_CONFIRMED_FORMAL_CLOSE_BLOCKED_BY_MISSING_STAGE_3_ARTIFACT`

Confirmed defects relevant to Stage 5:

1. `STATE:generated:shared-invocation-arena`
   - shared across invocations/instances in the generated module;
   - ordinary failed body paths retain +12;
   - nested descendant throw can leave an ancestor +12 even after descendant/local cleanup.

2. `STATE:generated:identity-map-and-counter`
   - failed object keys can remain published;
   - distinct failed keys advance shared identity state;
   - no rollback.

Subsystems that should **not** be redesigned as part of the eventual fix absent new evidence:

- runtime patch ownership ledger;
- cache-epoch transaction stack;
- per-instance cache separation.

Production changes: **none**.

`READY_FOR_STAGE_5_FROM_4B = no`

Reason: technical 4B classification is complete enough to feed the eventual 4A–4D synthesis, but the explicit Stage-3 artifact/SHA-alignment prerequisite is missing from the current repository.
