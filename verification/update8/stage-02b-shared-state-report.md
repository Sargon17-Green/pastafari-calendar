# Update 8 — Stage 2B: Shared mutable state inventory

## A. Baseline and scope

- uploaded ZIP SHA-256: `084946267b9c36ffae7fc8f2948adffc200a9cc074c447ae3aaec97ecc7b9cce`
- package version: `1.3.0`
- authoritative Node core SHA-256: `a7e01b505870a7a72ce0bde98dc5e4d19f39bd8d560fdf961a4d5f4d2dfdd30d`
- public adapter SHA-256: `9d8c63636033659753d658ac9d76fa955ee8423bbf1cd11bfb90eab25a49f827`
- browser chronicle SHA-256: `315f46a49f13db13b61d325915a6a5a32b7f043594c541c1886cfd8c0865db4a`
- standalone artifact SHA-256: `958f7f30cb8ad6a3a95570d8ed025e3131481b543c761ac9582103f069ad3b13`
- literal Git working-tree status is unavailable because the supplied ZIP has no `.git`
- production behavior changed: **no**
- production files changed: **no**
- tests changed: **no**
- fault injection: **none**
- failed-constructor campaign: **none**
- runtime work in this stage: **success-only observation/instrumentation**

Stage 2B is an inventory/archaeology stage. It does **not** claim that every statically reachable failure mode is dynamically reproducible yet; that is Stage 3.

## B. Main result

The historical “12 cells per failed constructor” suspicion now has a concrete mechanism on this snapshot.

The decoded authoritative core contains one common invocation wrapper around generated function/class exports. It:

1. records the current shared-arena length;
2. appends a frame of **exactly 12 cells**;
3. dispatches to the real target with `Reflect.construct(...)` or `Reflect.apply(...)`;
4. truncates the arena back to the recorded length **only after the target returns normally**.

That wrapper contains **no `try`, `catch`, or `finally`**. Therefore, if the target throws, control bypasses the only truncation and the 12-cell frame remains. This is a static proof of the leakage mechanism; Stage 3 still has to reproduce the before/after delta dynamically for each chosen failure input.

Decoded wrapper facts:

- decoded-body offset: `6995943`
- wrapper SHA-256: `17273b62469466b61a4c64a7f41c4c12c5ed62d11ba1ad6828863af85130c14b`
- frame width: **12**
- `Reflect.construct` sites: **1**
- `Reflect.apply` sites: **1**
- wrapper `try`: **0**
- wrapper `finally`: **0**
- truncation assignment: **1**, after target dispatch

So the historical value 12 is not an arbitrary observation: it is the width of the common outer invocation frame.

## C. A second, distinct frame exists inside every generated constructor

The common constructor preamble/ritual is separate from the outer Proxy frame.

Its reserve helper:

- saves the current arena length;
- appends a **12-cell base frame**;
- appends **3 additional cells per processed argument**;
- contains no internal `try/finally` and no truncation;
- returns the saved frame start to the constructor.

Every one of the **28 outer constructor bodies** audited has the relevant ordering:

```text
reserve/preamble
→ constructor-local try
→ catch (where present in the common form)
→ finally
→ cleanup(savedFrameStart)
```

One constructor body also contains nested constructor definitions, so a naive textual count sees three ritual sites in that body; the outer constructor boundary itself still has the ordering above.

This distinction matters:

- an ordinary validation/body throw happens **after** the preamble returned, so the constructor-local `finally` can clean the inner ritual frame; the unprotected **outer 12-cell frame** is still a leak candidate;
- a throw **inside the preamble itself** occurs before the constructor-local `try` starts, so the inner frame is not protected either. Object measurement reaches operations such as `Reflect.ownKeys`, making preamble failure statically possible for hostile/throwing object inputs. Such a path can retain more than 12 cells.

Reserve-helper SHA-256: `8c4ba9a5cdafd419e202c13e7b0cab00e6acab249698248967bcd7fe50dff331`.

## D. Shared arena lifecycle and success-only control

Analysis-only instrumentation captured the same shared arena passed into the generated main factory:

- factory entry length: **280**
- length when the main factory returned: **1,175,637**
- stable post-import length after the 91 public carriers were appended: **1,175,728**
- post-import holes: **0**

Three successful constructor controls all preserved the final length exactly:

| Successful call | before | after | existing prefix cells changed in this run |
|---|---:|---:|---:|
| `new GregorianDate(2026n, 8, 22)` | 1,175,728 | 1,175,728 | 2 |
| `new GateIndex()` | 1,175,728 | 1,175,728 | 3 |
| `new PastafariCalendar({todayProvider:()=>null})` | 1,175,728 | 1,175,728 | 4 |

This produces an important correction for Stage 3: **raw full-array equality is not a valid oracle by itself**. Successful construction intentionally churns a few existing prefix cells even while its temporary tail frame is removed. The transactional test therefore has to distinguish retained/new persistent state from expected success-path noise.

## E. Central mutable-state inventory

| ID | Storage | Scope | Construction relationship | Cleanup/rollback | Stage-3 significance |
|---|---|---|---|---|---|
| `STATE:generated:shared-invocation-arena` | large shared `Array` | generated module/global | **direct** | outer frame truncates only on normal return; inner ritual truncates in constructor `finally` after preamble returns | **HIGH** — primary leak target |
| `STATE:generated:arena-prefix-churn` | existing arena cells | shared | direct | values are not restored byte-for-byte even on success | **confounder** — compare with matched success control |
| `STATE:generated:random-pool-and-cursor` | `Uint32Array(1024)` + cursor | wrapper-global | indirect | none; consumptive | record separately; likely non-semantic noise unless proven otherwise |
| `STATE:generated:identity-map-and-counter` | `WeakMap` + counter | wrapper-global | object/function measurement | none | persistent; observe counter/known-object IDs, not WeakMap cardinality |
| `STATE:generated:witness-counter` | uint32 scalar | wrapper-global | transfer helper | none | persistent, probably non-semantic; separate from structural leak |
| `STATE:decoded:combinatorial-memo` | `Map` | decoded module 006 | indirect through combinatorial/month-weaving helpers | memoization only | watch around `MonthWeavingCounter`/nested calendar failures |
| `STATE:decoded:sauce-lru` | bounded `Map` (1024) | decoded module 007 | mainly conversion/`makeSauce` | LRU eviction, no rollback | low for direct constructor probes; relevant for nested paths |
| `STATE:decoded:forward-gap-memo` | `Map` | decoded module 009 | GateIndex helper state | memoization only | watch when failure path performs forward-gap resolution |
| `STATE:decoded:backward-gap-memo` | `Map` | decoded module 009 | GateIndex helper state | memoization only | same for backward-gap resolution |
| `STATE:instance:pastafari-calendar-caches` | `anchorCache`, `yearCache`, `structureCache` | per instance | created by constructor | instance lifetime | **not shared by itself**; include only if a failed path leaks/publishes the partial instance |
| `STATE:detour:cache-epoch` | constructor `WeakSet`; per-cache shadow/provenance/transactions/depth | module + instance | installed at import; active on `convertJdn` | explicit commit/rollback in `finally` | control state for nested conversion, not plain constructor leak |
| `STATE:detour:gate-data` | `PRIMED` `WeakSet`, lazy decoded array, per-instance `positive` | module + instance | installed at import; primed on gate method use | persistent first-use state | separate first-use initialization from constructor delta |
| `STATE:detour:runtime-patch-ledger` | `WeakMap`s, invocation array, trace `Set`, ticket counter, prototype descriptors | module-global | conversion wrappers | nested restore/repair `finally` logic | should remain quiescent in constructor-only probes |
| `STATE:detour:installation-registries-and-prototype-patches` | `WeakSet`s + prototype replacements | module initialization | before public construction | intentionally persistent/idempotent | baseline must be taken **after import/install** |

The machine-readable inventory contains the full classifications and recommended Stage-3 observation for each entry.

## F. Shared Maps discovered in decoded modules

Four mutable module-level `Map`s with actual writers were found in the decoded authoritative modules:

1. combinatorial memo cache in decoded module `006` — `.has/.get/.set`;
2. sauce cache in decoded module `007` — LRU-style `.get/.delete/.set`, capped at 1024;
3. forward-gap memo in decoded module `009` — `.has/.get/.set`;
4. backward-gap memo in decoded module `009` — `.has/.get/.set`.

There are also four `Object.freeze(new Map(...))` lookup tables in decoded module `005`. `Object.freeze` does **not** freeze Map entries, so treating them as immutable merely because of `Object.freeze` would be a mistake. However, no `.set/.delete/.clear` writers to those bindings were found in this decoded source, so they are not included as construction-mutable state for this snapshot.

## G. Node/browser equivalence

Stage 2B decoded both:

- `src/5efdcc3e6fb071cbaffdcb117507a169dd76.js`
- `browser/pastafari-calendar-core-chronicle.js`

Both produced the same ten captured function bodies, and all ten were byte-identical between Node and browser copies. The main body has character length **7,083,974**; the nine decoded module bodies have recorded character lengths `21,637`, `32,423`, `32,143`, `85,972`, `372,933`, `160,549`, `152,897`, `130,859`, `181,206`.

The standalone embedded authoritative worker remains a separately deployed copy mapped by Stage 2A. Stage 2B did not launch a Blob Worker solely to duplicate the same state archaeology; deployment-parity reproduction belongs after the first Stage-3 proof.

## H. Stage-3 measurement contract

Take the baseline **after** module import and persistent detour installation. For each probed constructor, capture at minimum:

- shared-arena length;
- tail slice/fingerprint from the pre-call length onward;
- changed-index/fingerprint summary for existing arena prefix cells;
- relevant shared memo-cache size/key digest when reachable;
- wrapper cursor/counter state through analysis instrumentation;
- thrown error type/message/identity;
- a matched successful-call control in the same instrumentation scheme.

Then run the sequence needed to distinguish structural leakage from harmless churn:

```text
fresh baseline
→ failed constructor
→ snapshot
→ same failed constructor again
→ snapshot
→ valid constructor/use after failure
→ snapshot
```

For the common body-validation failures, the first discriminator should be whether the arena grows by exactly 12 per failure while success preserves length. Separately exercise preamble failure, because that can have a larger retained frame and is a different bug mechanism.

The target invariant remains semantic transactionality, but the literal formulation needs a projection:

```text
semantic_persistent_state_after_failed_call
==
semantic_persistent_state_before_failed_call
```

Using the entire raw arena/counter state without normalization would incorrectly fail even successful controls.

## I. Scope boundary and unresolved items

- no failed-call reproduction was performed here: intentionally deferred to Stage 3;
- standalone Blob-Worker state materialization was not duplicated here;
- literal Git status remains unavailable in the ZIP.

None of these blocks the next stage.

## J. Changed files / readiness

Stage 2B adds documentation/evidence only:

- `verification/update8/stage-02b-shared-state-inventory.json`
- `verification/update8/stage-02b-shared-state-report.md`
- checksum manifests updated to cover the new artifacts

No production or test source is changed.

`READY_FOR_STAGE_3_STATE_SIDE = yes`
