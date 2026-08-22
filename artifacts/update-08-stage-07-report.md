# Update 8 — Stage 7 Cross-environment, distribution and packaging verification

## Final decision

```text
STAGE_7_RESULT = CROSS_ENVIRONMENT_VERIFICATION_FAILED
READY_FOR_STAGE_8 = no
production files changed during Stage 7: none
```

Stage 7 found a reproducible production integration failure in the worker-backed router lifecycle. The failed-construction transaction fix itself remains correct in Node public API and in the browser authoritative runtime, but the shipped standalone router can terminate an in-flight authoritative Worker request when moving from an already-verified calculation day to a new slow calculation day. This failure is present in both readable and minified standalone bundles. Stage 7 is verification-only, so no production repair was applied.

## 1. Revision and provenance

- Repository: `https://github.com/Sargon17-Green/pastafari-calendar`
- Branch: `main`
- Current GitHub `main`: `c16c9c14c1fe0233d9bb74b94824410915315a00`
- Stage-6 verified production commit: `9b86695f2f693742837bce8b865a24643c522ebf`
- Stage-5 production-patch commit recorded by the task: `44d5e1d3818b400df0f7a36bf17216d04345add6`
- Package version: `1.3.0`
- Execution source: user-supplied ZIP; it has no `.git` metadata, so local `git status`/HEAD cannot be asserted.
- GitHub comparison from the Stage-6 commit to current `main` showed only Stage-6 artifacts/verification files and `SHA256SUMS.txt` changes; no production/runtime files changed. Therefore the Stage-7 execution snapshot is production-equivalent to current `main` for the files under test.

Runtime environment:

- Node: `v22.16.0`
- npm: `10.9.2`
- OS: Linux `6.18.35`, x86_64
- Chromium: `Chrome/144.0.7559.96`, V8 `14.4.258.22`
- `package.json#engines`: `>=18`
- Repository canonical CI line: Node 22
- Repository minimum-runtime CI line: exactly Node `18.0.0`

A fresh Node 18.0.0 Stage-7 run could not be created: Node 18.0.0 is not installed locally, and creating a verification branch through the GitHub integration returned `403 Resource not accessible by integration`. This is recorded as an infrastructure blocker, not a PASS.

## 2. Environment matrix

| Environment | Entry point / runtime | Success parity | Failed-construction transactionality | Distribution integrity | Stage-7 status |
|---|---|---:|---:|---:|---|
| Node raw authoritative | Stage-6 authoritative core | inherited Stage-6 PASS | inherited Stage-6 PASS | n/a | PASS inherited |
| Node public API | `src/public-api.js`, Node 22 | 13/13 | 4 focused families + repeat ×100 PASS | public exports checked | PASS |
| Browser authoritative | browser authoritative source in real Chromium | 13/13 | 4 focused families + repeat ×100 PASS | exact local module source; import specifiers test-rewritten to blob URLs because local navigation is managed-blocked | PASS for main-thread authoritative |
| Real Worker | exact standalone embedded authoritative Worker, Chromium | first calculation day PASS | worker transport real; later cross-day request aborted | readable + minified both affected | **FAIL** |
| Browser published module Worker | `pastafari-authoritative-worker.js` | not accepted | not accepted | managed local-origin policy blocked a valid local page origin; blob-module worker from opaque `about:blank` failed initialization | BLOCKED_BY_INFRASTRUCTURE |
| Standalone readable | committed `browser/standalone/pastafari-date.js`, exact bytes executed in Chromium | foundation vector PASS | retry recovery PASS | hash matches Stage 5/6 canonical artifact | **FAIL_WITH_REPRODUCTION** |
| Standalone minified | committed `browser/standalone/pastafari-date.min.js`, exact bytes executed in Chromium | foundation vector PASS | retry recovery PASS | normalized failure semantics == readable | **FAIL_WITH_REPRODUCTION** |
| Fast engine | `browser/pastafari-calendar-fast.js` + full compatibility suite | complete compatibility PASS | history-after-authoritative-failures PASS | corpus parity PASS | PASS |
| Router unit/integration tests | router/cache/fallback tests in Node | 32/32 | existing failure/fallback tests PASS | n/a | PASS, but does not cover the real-Worker idle-shutdown race |
| Packed npm | real `npm pack` tarball installed into clean consumer | canonical smoke PASS | focused failure→success PASS | 270 files, exports 98/98, no verification leakage | PASS |
| Canonical standalone rebuild | `npm run build:standalone` | not completed locally | n/a | prior canonical CI hashes match committed files | BLOCKED_BY_INFRASTRUCTURE |
| Node 18.0.0 | repository minimum-runtime policy | not rerun | not rerun | n/a | BLOCKED_BY_INFRASTRUCTURE |

## 3. Production hashes

The four Stage-5 production files still have the Stage-5/6 hashes at the end of Stage 7:

```text
99c7a18b015b669654eec06b49740df1b884465b43702b9705e4f6d9fd87ede9  src/5efdcc3e6fb071cbaffdcb117507a169dd76.js
36fed61386d9c545a191393e4bfd647ccefbc26fef11bec88faa708ed69b77ea  browser/pastafari-calendar-core-chronicle.js
532ccdd809633ee79aab618bda9b98b48d740798436fd1c1917f3fcf3340136d  browser/standalone/pastafari-date.js
a78dfc01c8dd250e5639972756aadbb80e7bb9e77cc5bd9b8f0b68e1793f0b6a  browser/standalone/pastafari-date.min.js
```

No Stage-7 verification step rewrote any of these files.

## 4. Node/public results

`verification/update8/run-stage-07-node-public.mjs` ran against the public package entry point:

- shared corpus: 13/13 PASS;
- Gregorian primitive failure: PASS;
- Islamic object-key failure: PASS;
- MonthWeaving array-key failure: PASS;
- PastafariCalendar options-key failure: PASS;
- each failure preserved its expected exception class/message;
- a valid conversion after every failure equalled the canonical `present_same` result;
- Islamic invalid-variant repeat ×100 preserved exception behavior and later success.

Public source export count was 98. The packed tarball exports exactly the same 98 keys.

## 5. Real browser result

The managed Chromium in this environment blocks navigation to all tested local URL forms:

```text
127.0.0.1 is blocked
Your organization doesn’t allow you to view this site

“file” links are blocked
Your organization doesn’t allow you to view this site
```

Therefore local HTTP and `file://` navigation were not accepted as evidence. To obtain real-browser JavaScript-runtime evidence without pretending those modes passed, the Stage-7 harness launched real Chromium on `about:blank`, loaded the exact local browser module sources as `blob:` modules, and changed only import/new-URL specifiers in memory. The production files themselves were not edited.

Result in real Chromium:

- 13/13 authoritative vectors PASS;
- all four focused natural failure families PASS;
- `arenaDelta = 0` and `holesDelta = 0` for each focused failure;
- failed object/array/options identities absent from the identity WeakMap after failure;
- valid post-failure conversion equals reference;
- representative repeat ×100: `arenaDelta = 0`, `holesDelta = 0`, failed key absent;
- fast engine in the same Chromium runtime: all 13 vectors PASS after the authoritative failures.

This is sufficient evidence that the Stage-5 transaction fix propagated to the browser authoritative distribution. It is not evidence that the managed environment can load the site through local HTTP or `file://`.

## 6. Worker result

A direct accepted run of the separately published module Worker `browser/pastafari-authoritative-worker.js` could not be completed because the managed browser policy prevents establishing a local non-opaque page origin; the test-only blob-module Worker from an opaque `about:blank` origin failed initialization. This result is classified `BLOCKED_BY_INFRASTRUCTURE`, not PASS and not a product failure.

However, both committed standalone bundles instantiate their real embedded authoritative and fast Workers. Immediately before the blocking reproduction, both bundles reported:

```json
{
  "authoritative": "worker",
  "fast": "worker"
}
```

Thus the router failure below was observed with real Chromium Workers, not Node VM emulation.

## 7. Standalone unminified result

The exact committed bytes of `browser/standalone/pastafari-date.js` were evaluated as a classic script in real Chromium because actual `file://` navigation is administratively blocked.

Focused reproduction:

1. convert `foundation_same`;
2. wait until calculation JDN `-13334246` becomes `verified`;
3. confirm authoritative and fast transports are both real Workers;
4. immediately request `present_same` on the previously unseen calculation JDN `2461259`.

Observed:

```text
AbortError
code: ERR_ENGINE_TERMINATED
message: authoritative was stopped.
elapsed: 512 ms
```

The new calculation state remained `unverified`. An explicit `retry(2461259n)` then succeeded and returned the canonical `present_same` result after about 12.2 s.

Result: **FAIL_WITH_REPRODUCTION**.

## 8. Standalone minified result

The same sequence against `browser/standalone/pastafari-date.min.js` produced:

```text
AbortError
code: ERR_ENGINE_TERMINATED
message: authoritative was stopped.
elapsed: 518 ms
```

Explicit retry succeeded and returned the canonical result after about 11.8 s.

Ignoring timing-only fields, readable and minified bundles have identical failure/recovery semantics. Therefore this is not a minifier-only defect.

Result: **FAIL_WITH_REPRODUCTION**.

## 9. Fast compatibility result

The exact original command required by Stage 7 completed:

```text
npm run test:compatibility
```

Result:

```text
12 tests
12 pass
0 fail
total: 250817.629 ms (~250.8 s)
```

Important timing breakdown:

- fixed vectors / 2026-08-06: ~44.99 s;
- fixed vectors / 2000-01-01: ~18.53 s;
- fixed vectors / foundation: ~30.96 s;
- deterministic pseudo-random targets: ~35.09 s;
- all 65 authoritative gate checkpoints: ~81.12 s;
- before first checkpoint: ~20.25 s;
- after last checkpoint: ~15.96 s.

A second test-only instrumented run preserved the same coverage, only adding progress markers and raising the parent timeout. It also passed 12/12 in ~247.4 s.

Conclusion: the Stage-6 observation was not a hang. The suite was computing normally and simply did not finish inside the outer 120-second execution window. `test:compatibility` itself has a 360-second non-Windows timeout and finishes below it in this environment.

## 10. Router result

The existing focused router/cache/fallback suite passed 32/32, including failure propagation, inline fallback, missing-fast fallback, and the 5,000-calculation-day memory bound.

Stage 7 nevertheless found a real-Worker lifecycle defect not covered by those Node tests.

The shared router core has:

```text
DEFAULT_AUTHORITATIVE_IDLE_SHUTDOWN_MS = 500
```

After verification succeeds, `_scheduleAuthoritativeShutdown()` schedules a 500-ms timer. The timer keeps the authoritative client alive only when some state is `verifying` or `authoritative-only`. A newly started slow authoritative bootstrap remains `unverified` while its request is recorded in `state.authoritativeRequests`. The timer does not inspect that in-flight request and calls `this._authoritative.terminate()` after ~500 ms.

That precisely matches the observed 512/518-ms aborts.

This code is in the shared `browser/pastafari-calendar-router-core.js` path used by normal browser routing and by standalone generation. Stage 7 does **not** patch it.

## 11. Cross-environment corpus parity

Shared corpus: `verification/update8/stage-07-cross-environment-vectors.json`, 13 vectors.

It includes the five required canonical IDs:

```text
foundation_same
foundation_next
foundation_previous
present_same
present_forward
```

plus eight deterministic nearby vectors across the two calculation-day anchors.

Parity results:

- Node public: 13/13 PASS;
- real Chromium authoritative: 13/13 PASS;
- real Chromium fast: 13/13 PASS;
- full fast compatibility suite: PASS;
- packed npm consumer canonical smoke: PASS;
- standalone cross-day sequence: blocked by the reproduced router Worker termination before the corpus can complete.

Only representational normalization was used: BigInt year/JDN values to decimal strings and realm-specific object representation to canonical fields.

## 12. Focused failed-construction parity

The same four representative families were used for Node/public and real-browser authoritative runtime:

```text
GregorianDate invalid non-integer month       primitive-only
IslamicDate invalid variant                  object key
MonthWeavingCounter invalid lengths          array key
PastafariCalendar invalid todayProvider      options object key
```

Node/public: all PASS with valid recovery.

Real Chromium browser-authoritative: all PASS with zero structural arena/hole delta and failed identity absence where applicable.

The standalone public namespace does not expose these authoritative constructors. Stage 7 did not invent a Worker API to expose them. Instead, standalone was tested through its real router/Worker integration, where the independent blocking lifecycle defect was found.

## 13. Repeat probes

- Node public: representative failure ×100 → valid success PASS.
- Browser authoritative: representative failure ×100 → `arenaDelta=0`, `holesDelta=0`, failed identity absent; PASS.
- Fast history sensitivity: authoritative failures ×100, then all 13 fast-vs-authoritative comparisons remain identical; PASS.
- Standalone/router: the required cross-day valid request itself fails before a repeat campaign is meaningful; this is blocking.

## 14. Package/tarball result

`npm pack --dry-run`: PASS.

`npm pack`: PASS.

Produced package:

- name: `pastafari-calendar`
- version: `1.3.0`
- files: 270
- package size reported by npm: about 90.1 MB
- unpacked size: about 120.6 MB

The tarball was installed into a clean consumer directory using the tarball path, not repo-relative imports.

Consumer smoke:

- package import PASS;
- public PastafariCalendar construction PASS;
- canonical conversion PASS;
- invalid todayProvider failure PASS;
- later valid conversion PASS.

Export parity:

```text
source exports: 98
packed exports: 98
equal: true
```

Required browser/worker/router/standalone files are present in the tarball. No `verification/`, `artifacts/`, `test/`, `.github`, `/tmp/` or `/mnt/data` paths were found in the tarball listing.

## 15. Build/rebuild result

Canonical command:

```text
npm run build:standalone
```

Fresh Stage-7 local rebuild did not start because the ZIP environment does not contain the locked build dependency:

```text
ERR_MODULE_NOT_FOUND: Cannot find package 'esbuild'
```

The lockfile expects `esbuild@0.28.2`.

`npm ci --offline` also cannot restore dependencies: npm returned `ENOTCACHED` (including `playwright-core@1.62.1`; esbuild is likewise unavailable locally). A fresh GitHub Actions verification run could not be created because the GitHub integration lacks write permission and returned HTTP 403.

Therefore **fresh Stage-7 byte reproducibility is not claimed**.

Supporting provenance from Stage 5 remains strong: `artifacts/update-08-stage-05-browser-standalone.json` records a canonical GitHub Actions `test.yml / node-test / Node 22` build whose readable and minified SHA-256 values are exactly the current committed hashes. The Stage-7 standalone structural build tests pass 3/3. This does not override the fresh rebuild infrastructure blocker.

## 16. Artifact/hash provenance

Prior canonical standalone build evidence from Stage 5:

```text
CI artifact: update3-generated-standalone-f52c4c3e754ffe9deb14b1c09575635ee848f385.zip
artifact SHA-256: ebf81a835ae5c527d3f78692ecdd9648a2cea823e81ee1aa08d2c9497b0d02cf
readable SHA-256: 532ccdd809633ee79aab618bda9b98b48d740798436fd1c1917f3fcf3340136d
minified SHA-256: a78dfc01c8dd250e5639972756aadbb80e7bb9e77cc5bd9b8f0b68e1793f0b6a
```

Stage-7 build-input hashes are recorded separately in `update-08-stage-07-build-input-hashes.txt`.

## 17. Warnings, timeouts and infrastructure limitations

1. `test:compatibility`: **not a timeout**; completed PASS in ~250.8 s.
2. Managed Chromium blocks `127.0.0.1`, private-address HTTP, and `file://` navigation. Actual file-protocol smoke therefore remains `BLOCKED_BY_INFRASTRUCTURE` in this environment.
3. Direct separately published module Worker runtime could not receive accepted evidence because a valid local page origin cannot be established; opaque-origin blob-module Worker initialization is not counted.
4. Fresh standalone rebuild is blocked by unavailable locked dependencies and no network/cache.
5. Fresh Node 18.0.0 runtime verification is blocked locally; a new GitHub CI run cannot be created with the available integration permission.

None of these infrastructure limitations is converted into a PASS.

## 18. Actual blockers

### Blocking production failure: `ROUTER_IDLE_SHUTDOWN_INFLIGHT_AUTHORITATIVE`

The definitive Stage-7 blocker is the reproducible real-Worker failure in both standalone distributions:

```text
verified calculation day A
→ start slow authoritative request for new calculation day B
→ stale 500 ms authoritative-idle timer fires
→ B is still state.status == "unverified"
→ timer sees no verifying/authoritative-only state
→ this._authoritative.terminate()
→ in-flight request rejects ERR_ENGINE_TERMINATED
```

The timer ignores the fact that the new state has an in-flight authoritative request. This violates the required router/cold-warm/post-failure distribution behavior.

Additional unresolved infrastructure evidence gaps: fresh Node 18.0.0 run, direct published module Worker run, actual `file://` load, and fresh byte rebuild.

## 19. Production diff

```text
production files changed during Stage 7: none
```

Final production hashes equal the Stage-5/6 hashes. All Stage-7 modifications are verification scripts and artifacts only.

## 20. Final decision

The narrow failed-construction transaction fix is verified in Node public and real-browser authoritative code, and fast compatibility is fully PASS. Packaging is also PASS.

Stage 7 as a whole nevertheless **fails** because a shipped, worker-backed runtime/distribution path does not survive a valid cross-calculation-day transition. The failure is reproducible in both standalone bundles with normalized semantic parity and has a source-level explanation in the shared router core.

```text
STAGE_7_RESULT = CROSS_ENVIRONMENT_VERIFICATION_FAILED
READY_FOR_STAGE_8 = no
production files changed during Stage 7: none
```

Per Stage-7 rules, production was not repaired here. Stage 8 must not begin until the router lifecycle defect is addressed in a separate repair/reverification step.
