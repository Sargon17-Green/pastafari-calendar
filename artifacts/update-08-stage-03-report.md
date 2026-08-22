# Update 8 — Stage 3: Snapshot Harness and initial measurable reproduction of failed-construction state leakage

## Scope and stop point

This artifact closes **Stage 3 only**. It adds an observation-only, test-only snapshot harness and records natural-failure evidence. It does **not** modify production source, add rollback, alter cleanup, alter exception semantics, refactor constructors, or start a synthetic fault-injection campaign.

A chronological complication exists: Stages 4C/4D were committed before the missing Stage-3 artifact was reconstructed. This report uses only the **natural-failure** measurements already committed by 4D as dynamic evidence, because GitHub comparison proves that the production tree on which they were run is byte-for-byte production-equivalent to current `main`. Synthetic 4C faults are not used to establish any Stage-3 leak.

## 1. Revision and alignment

- Repository: `Sargon17-Green/pastafari-calendar`
- Branch inspected: `main`
- Current remote `main`: `4ddceddba65502a3064a2876b6b85745b8974c4b`
- Package version: `1.3.0`
- Literal local `git status`: unavailable in this runtime. The local container could not resolve `github.com`, so a fresh checkout of the current SHA could not be executed here.
- Stage-1 artifact commit: `1dd41cbf7c2ff6172c2b5793fb1637a446a1d272`
- Stage-2A artifact commit: `b94d1a3976731784459ff50f0e7d598cd2d59e70`
- Stage-2B production snapshot: same production hashes later used by 4D.
- Dynamic natural-failure evidence tree: `81cc54b1e15d8f3c0cd9cc8cb41d07f57fdecddf`.

Focused revalidation was performed rather than silently combining mismatched SHAs. GitHub compare from Stage 1 through current `main`, and separately from `81cc54b…` through current `main`, shows only checksums, verification scripts, and Stage-2/4 artifacts. **No production-source file changed.** Therefore the Stage-1/2 inventories and the natural-failure measurements remain applicable to the current production code. The distinction between “same production tree” and “same commit SHA” is preserved in the machine-readable artifact.

## 2. Baseline success semantics

The latest committed success sanity on the production-identical tree verifies three representative full tuples against the independent Stage-1 reference:

| ID | authoritative | reference | result |
|---|---|---|---|
| `foundation_same` | `(5000, לגש, 762, לבונה, 105)` | same | PASS |
| `foundation_next` | `(5000, כליה, 1, אבן־גיר, 91)` | same | PASS |
| `foundation_previous` | `(5000, לגש, 761, הדלת הסגורה, 114)` | same | PASS |

No ordinary success mismatch is being attributed to failed-construction state.

## 3. Working matrix distilled from 2A + 2B

| Construction family | Relevant state | Known writer / mutation site | Natural throw after mutation possible? | Stage-3 snapshot method |
|---|---|---|---|---|
| generated authoritative constructors | `STATE:generated:shared-invocation-arena` | common invocation wrapper reserves a frame before `Reflect.construct`/`Reflect.apply` | yes | array length, holes, selected entries/identities, descriptor, retained tail |
| constructors with object/array arguments | `STATE:generated:identity-map-and-counter` | limited-measure helper assigns known object/function IDs | yes | captured WeakMap, known-key `has/get`, identity-aware value summary |
| generated helper runtime | bootstrap decoded Maps | memo/cache `.set` paths | path-dependent | Map size + selected key/value identities |
| installation/detour registries | captured WeakSets | installers / registries | not expected on ordinary constructor validation | known-key `has` only |
| public/raw API surface | prototypes, function slots, descriptors | detours/patching mechanisms | potentially, on nested paths | direct identity + complete property descriptor |
| shared arena prefix | existing arena cells | ritual/measurement helpers | yes, but success can also churn prefix cells | selected matched entries; not raw whole-array equality |

The Stage-2B confounders `random-pool-and-cursor` and `witness-counter` have no read-only direct handle in this lightweight harness and remain explicitly unmeasured here. They are not misclassified as zero-delta.

## 4. Snapshot Harness

New harness: `verification/update8/run-stage-03-snapshot-reproduction.mjs`.

It is deliberately observation-only. During import of the generated authoritative core it temporarily proxies `Function` only to expose the already-existing shared arena by reference. It also temporarily proxies `Map`, `WeakMap`, and `WeakSet` constructors to retain observation handles for structures created during bootstrap. The native globals are restored immediately after import. No hook throws, truncates, rolls back, compensates, or changes a production file.

The harness does not use `JSON.stringify` as a generic snapshot. It records identity-sensitive tokens for object/function values, array hole information, Map size and selected entry identities, known-key WeakMap/WeakSet membership, exact prototype identity, and complete descriptors (`value/get/set/writable/enumerable/configurable`).

First mismatch and full structured diff are both emitted. Supported difference labels include `LENGTH_CHANGED`, `HOLE_CHANGED`, `ADDED`, `VALUE_CHANGED`, `IDENTITY_CHANGED`, `CACHE_CHANGED`, and `REGISTRY_CHANGED`.

Schema: `verification/update8/stage-03-snapshot-schema.json`.

## 5. Natural failure inventory actually executed

Eight natural API-reachable validation failures are present in the committed dynamic evidence:

| Construction ID | Failure input | Exception baseline | Measured state result |
|---|---|---|---|
| `GregorianDate` | `new GregorianDate(2026n, 1.25, 22)` | `TypeError`: `החודש והיום הגריגוריאניים חייבים להיות מספרים שלמים` | **CONFIRMED_LEAK**, arena `+12` |
| `IslamicDate` | invalid `variant` | `RangeError`: variant must be `civil` or `umalqura` | **CONFIRMED_LEAK**, arena `+12`; known-key WeakMap added |
| `SolarHijriDate` | invalid `variant` | `RangeError`: variant must be `official` or `arithmetic-2820` | **CONFIRMED_LEAK**, known-key WeakMap added |
| `HinduDate` | invalid `scheme` | `RangeError`: scheme must be `old-solar` or `old-lunar` | **CONFIRMED_LEAK**, known-key WeakMap added |
| `JapaneseImperialDate` | non-string era | `TypeError`: `שם התקופה היפנית חייב להיות מחרוזת` | **UNRESOLVED_STATE_DELTA** in saved natural evidence |
| `BahaiDate` | invalid `variant` | `RangeError`: variant must be `tehran-equinox` or `western-arithmetic` | **CONFIRMED_LEAK**, known-key WeakMap added |
| `MonthWeavingCounter` | `[1,0,2]` | `RangeError`: `אורכי החודשים חייבים להיות חיוביים` | **CONFIRMED_LEAK**, arena `+12`; known-key WeakMap added |
| `PastafariCalendar` | `{todayProvider:123}` | `TypeError`: `todayProvider חייב להיות פונקציה` | **CONFIRMED_LEAK**, arena `+12`; known-key WeakMap added |

The Japanese case is intentionally not promoted to “confirmed +12” merely because the same common wrapper is statically implicated. Its throw was dynamically observed, but the saved natural-failure artifact did not capture its arena length and it has no object/array known key to expose the identity WeakMap effect. The new Stage-3 harness will measure it directly when replayed.

## 6. Confirmed shared-arena leak

Four independently recorded natural failures show the same first structural mismatch:

```text
STATE:generated:shared-invocation-arena
Difference: LENGTH_CHANGED
Delta: +12
```

Measured examples:

- `PastafariCalendar`: `1,175,728 -> 1,175,740`
- `IslamicDate`: `1,175,740 -> 1,175,752`
- `MonthWeavingCounter`: `1,175,752 -> 1,175,764`
- `GregorianDate`: `1,175,764 -> 1,175,776`

The retained 12-cell tail includes an arguments Array. In object/array-input cases, the failed caller input is reachable through that retained array. This is therefore not merely a numeric length discrepancy; it includes stale strong references.

A later successful `GregorianDate` construction has net arena delta `0` but does **not** remove prior residue.

## 7. Confirmed identity-metadata leak

Known-key WeakMap observation proves a second state family changes on failed construction. For six natural object/array-input failures the same captured WeakMap changes from `has(key) = false` to `has(key) = true` and returns assigned IDs:

- Islamic: `2`
- Solar Hijri: `3`
- Hindu: `4`
- Bahá’í: `5`
- Month weaving: `6`
- PastafariCalendar: `7`

A separate same-key sequence showed an ID assigned by a failed call is reused by a later successful construction. Distinct failed keys received successive IDs. WeakMap cardinality is not enumerated, and the raw counter is not exported; only the observable known-key assignment is asserted.

## 8. Other state families

Across the eight natural failures, the 19 captured bootstrap Maps had no size changes. Installation WeakSet membership sampled for constructor registries remained unchanged. Sampled public/raw constructor, prototype, method-function and descriptor identities also remained unchanged.

These are **zero-residue observations only for those measured families and paths**. They do not imply the entire process state is equal.

## 9. Success controls

Stage 2A provides representative successful construction inputs for all eight tested families. The new harness replays each success and records its state delta before executing the corresponding natural failure. This is necessary because Stage 2B already established that successful construction can legitimately churn a few existing arena-prefix cells while restoring the arena length.

Accordingly, Stage 3 does not incorrectly assert that “successful construction must leave all internal state byte-identical.” The transactional equality requirement is applied to failed construction while legitimate success persistence/noise is classified separately.

## 10. Post-failure semantics

The key result is **internal state residue without observed calendar-output corruption**.

After the natural-failure campaign, `foundation_same` still evaluates to exactly:

```text
(5000, לגש, 762, לבונה, 105)
```

which equals the independent reference. A warm `A -> FAIL -> A` sequence also preserved the same reference result.

Thus the measured cases fall into the requested classification:

```text
state differs
semantics same
```

That is **Mode B**: a real exception-safety/state-transactionality defect even though no immediate supported-public-API tuple corruption was observed.

## 11. Minimal repeated-failure evidence

The already committed natural-failure probe measured ten distinct failed `PastafariCalendar` options objects:

```text
before: 1,175,776
after:  1,175,896
delta:  +120
```

Each measured failure contributed `+12`, and all ten failed option objects were reachable from the retained tail. No claim is made about linearity beyond the measured sequence.

Because Stage 3 requested only a small repeat probe, the **new Stage-3 harness itself performs exactly 3 repeats**. The pre-existing ten-run evidence is preserved as provenance, not expanded into a new stress campaign.

## 12. Reproduction commands

After applying this delta to the repository root:

```bash
node --check verification/update8/run-stage-03-snapshot-reproduction.mjs
node verification/update8/run-stage-03-snapshot-reproduction.mjs --write
```

The second command writes/replaces:

`artifacts/update-08-stage-03-reproduction.json`

and performs only natural failures plus three repeated natural failures. It contains no synthetic fault injection.

## 13. Files and artifacts

Created by this Stage-3 delta:

- `verification/update8/run-stage-03-snapshot-reproduction.mjs`
- `verification/update8/stage-03-snapshot-schema.json`
- `artifacts/update-08-stage-03-reproduction.json`
- `artifacts/update-08-stage-03-report.md`
- `artifacts/update-08-stage-03-sha256sums.txt`

Production files changed: **none**.

## 14. Acceptance status and result

Measured natural failure paths: **8**.

- `CONFIRMED_LEAK`: **7** paths have direct dynamic state evidence.
- `ZERO_DELTA`: **0** paths are classified globally zero-delta.
- `UNRESOLVED`: **1** path (`JapaneseImperialDate`) lacks a direct saved arena/identity delta and must be replayed by the new harness.
- Direct natural `+12` arena measurements: **4** paths.
- Direct known-key identity publication measurements: **6** paths.
- Post-failure reference tuple mismatch: **none observed**.
- Production fix: **none**.

```text
STAGE_3_RESULT = CONFIRMED_LEAK
```

The only acceptance caveat is provenance, not the existence of the defect: this runtime could inspect current `main` and prove production equivalence, but could not perform a fresh local checkout/replay at the literal current SHA. The supplied harness exists specifically to make that exact replay deterministic on the repository/CI side.

## 15. Mandatory stop / what remained for Stage 4 at the Stage-3 boundary

No fix is made here. At the Stage-3 boundary, the remaining coverage belonged to Stage 4:

- broader repeated-failure/history-order matrices;
- nested/reentrant and multi-instance failures;
- controlled test-only fault injection at lifecycle checkpoints;
- partial publication, cache/registry validity and reader behavior;
- broader ownership/descriptor/interleaving checks.

Those topics are deliberately outside this Stage-3 delta even though later Stage-4 artifacts now exist in the repository.

---

### Required 15-point final record

1. **commit SHA:** current remote `main` = `4ddceddba65502a3064a2876b6b85745b8974c4b`; dynamic natural evidence = production-identical `81cc54b1e15d8f3c0cd9cc8cb41d07f57fdecddf`.
2. **snapshot coverage:** arena structure/holes/selected identity/tail; bootstrap Maps; known-key WeakMaps/WeakSets; public/raw identities, descriptors and prototypes.
3. **construction paths tested:** Gregorian, Islamic, Solar Hijri, Hindu, Japanese Imperial, Bahá’í, MonthWeavingCounter, PastafariCalendar.
4. **natural failure paths tested:** 8 validation failures listed in §5.
5. **confirmed leaks:** 7 paths; state families `STATE:generated:shared-invocation-arena` and `STATE:generated:identity-map-and-counter`.
6. **zero-delta paths:** 0 globally; several individual state families showed no change within leaking calls.
7. **unresolved paths:** JapaneseImperialDate state delta, plus unexposed random-pool/witness-counter state families.
8. **first mismatch in each leak:** arena `LENGTH_CHANGED +12` where directly measured; otherwise identity WeakMap `ADDED` for the known failed key.
9. **exception baseline:** exact class/message preserved for all 8 natural failures in the reproduction JSON.
10. **post-failure semantic results:** independent-reference comparison PASS; no calendar tuple corruption observed.
11. **reproduction commands:** `node --check ...` and `node verification/update8/run-stage-03-snapshot-reproduction.mjs --write`.
12. **files/artifacts created:** five files listed in §13.
13. **production files changed:** none.
14. **STAGE_3_RESULT:** `CONFIRMED_LEAK`.
15. **remaining Stage-4 scope:** repeated/history, nested/reentrant/multi-instance, fault injection, publication/cache/registry and broader ownership coverage; no part of that is executed by this delta.
