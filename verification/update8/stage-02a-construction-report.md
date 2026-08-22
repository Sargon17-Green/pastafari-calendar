# Update 8 — Stage 2A: Construction inventory

## A. Baseline

- repository: `https://github.com/Sargon17-Green/pastafari-calendar`
- branch: `main`
- Stage 2A commit: `b94d1a3976731784459ff50f0e7d598cd2d59e70`
- package version: `1.3.0`
- Stage 1 artifact recorded: `1dd41cbf7c2ff6172c2b5793fb1637a446a1d272`
- Stage 2A therefore ran against a different SHA. The one intervening commit contains only Stage-1 verification/checksum artifacts; GitHub comparison shows no production-code file changed.
- local working tree status: **not literally available** because the supplied ZIP has no `.git`. The analysis source tree was hashed before and after and remained byte-identical.
- analysis source-tree SHA-256: `653e05c9ea5479d4829bc7a4184caaa7c6ef071aa0fc579faffa57f97a7cf055` (599 files)
- uploaded ZIP SHA-256: `e28b0244e2f7c33f6a9e1332ea2bbcad06e85905097bfbe63fc0448ed2516eff`

## B. Inventory numbers

- semantic authoritative constructor types: **28**
- direct public constructor symbols: **28 at package root** and **28 in the browser core subpath**; because these are separate runtime generated copies, that is **56 physical direct-public implementations**
- internal-reachable physical constructor implementations: **29** (the raw Node `PastafariCalendar` shadowed by the public adapter + 28 constructors in the standalone embedded authoritative Worker)
- generated constructor implementations shipped across the three authoritative deployments: **84 = 28 × 3**
- public adapter constructors: **1** (`src/public-api.js:PastafariCalendar`)
- indirect public construction path templates: **16** (plus one direct-constructor-export template)
- relevant factory/helper/orchestrator paths: **20** = 15 core + 5 transport/lazy
- unresolved items: **3**, none blocking Stage 3 construction-side work

These counts deliberately separate semantic types from physical deployment copies. Treating every Node/browser/standalone copy as a different “kind of constructor” would be misleading.

## C. Central table

| ID | Symbol/path | Kind | Reachability | Public path | Nested construction | Throw sites | Cleanup |
|---|---|---|---|---|---|---|---|
| TYPE:authoritative:BahaiDate | BahaiDate | generated Proxy class | PUBLIC_DIRECT (root/browser); GENERATED+INTERNAL_REACHABLE (standalone) | package root/browser core | — | KNOWN_THROW | yes: generated try/catch/finally; preamble before try |
| TYPE:authoritative:ChineseDate | ChineseDate | generated Proxy class | PUBLIC_DIRECT (root/browser); GENERATED+INTERNAL_REACHABLE (standalone) | package root/browser core | — | POSSIBLE_THROW | yes: generated try/catch/finally; preamble before try |
| TYPE:authoritative:CopticDate | CopticDate | generated Proxy class | PUBLIC_DIRECT (root/browser); GENERATED+INTERNAL_REACHABLE (standalone) | package root/browser core | — | POSSIBLE_THROW | yes: generated try/catch/finally; preamble before try |
| TYPE:authoritative:EthiopicDate | EthiopicDate | generated Proxy class | PUBLIC_DIRECT (root/browser); GENERATED+INTERNAL_REACHABLE (standalone) | package root/browser core | — | POSSIBLE_THROW | yes: generated try/catch/finally; preamble before try |
| TYPE:authoritative:GateIndex | GateIndex | generated Proxy class | PUBLIC_DIRECT (root/browser); GENERATED+INTERNAL_REACHABLE (standalone) | package root/browser core | — | POSSIBLE_THROW | yes: generated try/catch/finally; preamble before try |
| TYPE:authoritative:GregorianDate | GregorianDate | generated Proxy class | PUBLIC_DIRECT (root/browser); GENERATED+INTERNAL_REACHABLE (standalone) | package root/browser core | — | KNOWN_THROW | yes: generated try/catch/finally; preamble before try |
| TYPE:authoritative:HebrewDate | HebrewDate | generated Proxy class | PUBLIC_DIRECT (root/browser); GENERATED+INTERNAL_REACHABLE (standalone) | package root/browser core | — | POSSIBLE_THROW | yes: generated try/catch/finally; preamble before try |
| TYPE:authoritative:HinduDate | HinduDate | generated Proxy class | PUBLIC_DIRECT (root/browser); GENERATED+INTERNAL_REACHABLE (standalone) | package root/browser core | — | KNOWN_THROW | yes: generated try/catch/finally; preamble before try |
| TYPE:authoritative:IslamicCivilDate | IslamicCivilDate | generated Proxy class | PUBLIC_DIRECT (root/browser); GENERATED+INTERNAL_REACHABLE (standalone) | package root/browser core | super→IslamicDate | POSSIBLE_THROW | yes: generated try/catch/finally; preamble before try |
| TYPE:authoritative:IslamicDate | IslamicDate | generated Proxy class | PUBLIC_DIRECT (root/browser); GENERATED+INTERNAL_REACHABLE (standalone) | package root/browser core | — | KNOWN_THROW | yes: generated try/catch/finally; preamble before try |
| TYPE:authoritative:IslamicUmmAlQuraDate | IslamicUmmAlQuraDate | generated Proxy class | PUBLIC_DIRECT (root/browser); GENERATED+INTERNAL_REACHABLE (standalone) | package root/browser core | super→IslamicDate | POSSIBLE_THROW | yes: generated try/catch/finally; preamble before try |
| TYPE:authoritative:JapaneseImperialDate | JapaneseImperialDate | generated Proxy class | PUBLIC_DIRECT (root/browser); GENERATED+INTERNAL_REACHABLE (standalone) | package root/browser core | — | KNOWN_THROW | yes: generated try/catch/finally; preamble before try |
| TYPE:authoritative:JulianDate | JulianDate | generated Proxy class | PUBLIC_DIRECT (root/browser); GENERATED+INTERNAL_REACHABLE (standalone) | package root/browser core | — | POSSIBLE_THROW | yes: generated try/catch/finally; preamble before try |
| TYPE:authoritative:MayaLongCountDate | MayaLongCountDate | generated Proxy class | PUBLIC_DIRECT (root/browser); GENERATED+INTERNAL_REACHABLE (standalone) | package root/browser core | — | POSSIBLE_THROW | yes: generated try/catch/finally; preamble before try |
| TYPE:authoritative:MinguoDate | MinguoDate | generated Proxy class | PUBLIC_DIRECT (root/browser); GENERATED+INTERNAL_REACHABLE (standalone) | package root/browser core | — | POSSIBLE_THROW | yes: generated try/catch/finally; preamble before try |
| TYPE:authoritative:MonthWeavingCounter | MonthWeavingCounter | generated Proxy class | PUBLIC_DIRECT (root/browser); GENERATED+INTERNAL_REACHABLE (standalone) | package root/browser core | — | KNOWN_THROW | yes: generated try/catch/finally; preamble before try |
| TYPE:authoritative:OldHinduLunarDate | OldHinduLunarDate | generated Proxy class | PUBLIC_DIRECT (root/browser); GENERATED+INTERNAL_REACHABLE (standalone) | package root/browser core | super→HinduDate | POSSIBLE_THROW | yes: generated try/catch/finally; preamble before try |
| TYPE:authoritative:OldHinduSolarDate | OldHinduSolarDate | generated Proxy class | PUBLIC_DIRECT (root/browser); GENERATED+INTERNAL_REACHABLE (standalone) | package root/browser core | super→HinduDate | POSSIBLE_THROW | yes: generated try/catch/finally; preamble before try |
| TYPE:authoritative:PastafariCalendar | PastafariCalendar | generated Proxy class | PUBLIC_DIRECT (root/browser); GENERATED+INTERNAL_REACHABLE (standalone) | package root/browser core; root uses adapter for PastafariCalendar | GateIndex; lazy YearBounds→MonthWeavingCounter→YearStructure; PastafariDate | KNOWN_THROW(raw default path) / POSSIBLE(public adapter) | yes: generated try/catch/finally; preamble before try |
| TYPE:authoritative:PastafariDate | PastafariDate | generated Proxy class | PUBLIC_DIRECT (root/browser); GENERATED+INTERNAL_REACHABLE (standalone) | package root/browser core | — | POSSIBLE_THROW | yes: generated try/catch/finally; preamble before try |
| TYPE:authoritative:ResponseCycle | ResponseCycle | generated Proxy class | PUBLIC_DIRECT (root/browser); GENERATED+INTERNAL_REACHABLE (standalone) | package root/browser core | — | POSSIBLE_THROW | yes: generated try/catch/finally; preamble before try |
| TYPE:authoritative:SakaDate | SakaDate | generated Proxy class | PUBLIC_DIRECT (root/browser); GENERATED+INTERNAL_REACHABLE (standalone) | package root/browser core | — | POSSIBLE_THROW | yes: generated try/catch/finally; preamble before try |
| TYPE:authoritative:SauceResult | SauceResult | generated Proxy class | PUBLIC_DIRECT (root/browser); GENERATED+INTERNAL_REACHABLE (standalone) | package root/browser core | responseCycle→ResponseCycle | POSSIBLE_THROW | yes: generated try/catch/finally; preamble before try |
| TYPE:authoritative:SolarHijriDate | SolarHijriDate | generated Proxy class | PUBLIC_DIRECT (root/browser); GENERATED+INTERNAL_REACHABLE (standalone) | package root/browser core | — | KNOWN_THROW | yes: generated try/catch/finally; preamble before try |
| TYPE:authoritative:Stones | Stones | generated Proxy class | PUBLIC_DIRECT (root/browser); GENERATED+INTERNAL_REACHABLE (standalone) | package root/browser core | — | POSSIBLE_THROW | yes: generated try/catch/finally; preamble before try |
| TYPE:authoritative:ThaiBuddhistDate | ThaiBuddhistDate | generated Proxy class | PUBLIC_DIRECT (root/browser); GENERATED+INTERNAL_REACHABLE (standalone) | package root/browser core | — | POSSIBLE_THROW | yes: generated try/catch/finally; preamble before try |
| TYPE:authoritative:YearBounds | YearBounds | generated Proxy class | PUBLIC_DIRECT (root/browser); GENERATED+INTERNAL_REACHABLE (standalone) | package root/browser core | — | POSSIBLE_THROW | yes: generated try/catch/finally; preamble before try |
| TYPE:authoritative:YearStructure | YearStructure | generated Proxy class | PUBLIC_DIRECT (root/browser); GENERATED+INTERNAL_REACHABLE (standalone) | package root/browser core | — | POSSIBLE_THROW | yes: generated try/catch/finally; preamble before try |
| ADAPTER:public:PastafariCalendar | PastafariCalendar (public adapter) | subclass wrapper | PUBLIC_DIRECT | package root | super→raw generated PastafariCalendar | POSSIBLE_THROW | no local boundary; delegated to super |

### Natural explicit validation throws found statically

- `BahaiDate` — `KNOWN_THROW`: variant outside {"tehran-equinox","western-arithmetic"}; message: `variant של הלוח הבהאי חייב להיות "tehran-equinox" או "western-arithmetic"`
- `GregorianDate` — `KNOWN_THROW`: month or day is not an integer; message: `החודש והיום הגריגוריאניים חייבים להיות מספרים שלמים`
- `HinduDate` — `KNOWN_THROW`: scheme outside {"old-solar","old-lunar"}; message: `אין לוח הינדי יחיד; scheme חייב להיות "old-solar" או "old-lunar"`
- `IslamicDate` — `KNOWN_THROW`: variant outside {"civil","umalqura"}; message: `לוח היג׳רי אינו חד־משמעי; variant חייב להיות "civil" או "umalqura"`
- `JapaneseImperialDate` — `KNOWN_THROW`: era name is not a string; message: `שם התקופה היפנית חייב להיות מחרוזת`
- `MonthWeavingCounter` — `KNOWN_THROW`: one or more month lengths are non-positive; message: `אורכי החודשים חייבים להיות חיוביים`
- `PastafariCalendar` — `KNOWN_THROW`: todayProvider is not a function; message: `todayProvider חייב להיות פונקציה`
- `SolarHijriDate` — `KNOWN_THROW`: variant outside {"official","arithmetic-2820"}; message: `variant של הלוח ההיג׳רי השמשי חייב להיות "official" או "arithmetic-2820"`

For the other generated constructors I use `POSSIBLE_THROW`, not `NO_THROW_SEEN`: coercions (`BigInt` etc.), helper calls, spreads/iterability, nested construction, object freezing and the common Proxy/invocation wrapper can still throw.

## D. Construction graph

```text
package "."
├─ 27 generated constructor exports (Node generated core)
└─ src/public-api.js:PastafariCalendar  [public adapter]
   └─ super → raw Node generated PastafariCalendar
      ├─ constructor → GateIndex
      └─ convertJdn(...)
         ├─ private year resolver → YearBounds
         ├─ private structure builder → MonthWeavingCounter → YearStructure
         └─ return → PastafariDate

makeSauce(...) → makeSauceUncached(...) → SauceResult
                                           └─ responseCycle(...) → ResponseCycle
calendarObjectToDate(...) → dispatch → 15 calendar-date constructors
localToday/coerceGregorian/parseHebrewGregorianDate → GregorianDate
chinese/japanese/minguo/saka/thai conversion helpers → nested GregorianDate

package "./browser/pastafari-calendar-core.js"
└─ re-export → browser generated core → same 28 semantic constructor names (distinct runtime identities)

browser PastafariCalendarRouter/sharedPastafariRouter
└─ standardEngineClient("authoritative") → PastafariEngineClient
   ├─ Worker path → new Worker(pastafari-authoritative-worker.js)
   └─ inline path → import(pastafari-authoritative-worker.js)
      └─ ensureEngine → createEngine → new browser PastafariCalendar({fixedToday})
         └─ generated browser construction chain above

PastafariCalendarStandalone
└─ shared router → authoritative client → createBlobWorker(AUTHORITATIVE_WORKER_SOURCE)
   └─ new Worker(blob URL) → embedded authoritative worker → embedded generated core (28 constructors)
```

Subclass edges: `IslamicCivilDate → IslamicDate`, `IslamicUmmAlQuraDate → IslamicDate`, `OldHinduSolarDate → HinduDate`, `OldHinduLunarDate → HinduDate`. These are true `super` construction chains, not aliases.

### Reflective/generated path

Both direct generated cores temporarily wrap `globalThis.Function` in a `Proxy` with `apply`/`construct` traps, use `Reflect.apply`/`Reflect.construct`, compile/execute decoded project-owned code, require a fixed **91-binding** output, and restore `Function` plus `Function.prototype.constructor` in `finally`. Exactly **28** of those 91 bindings are class-like constructor exports. No bound-constructor (`.bind`) or `Object.create` constructor mechanism was found in the `src`/`browser` scan.

## E. Existing coverage

| Test | Construction path covered | Nature | Stage 2A execution |
|---|---|---|---|
| `test/public-api.test.js` — the published calendar bypasses the monster default-today binding defect | raw-node PastafariCalendar constructor, public PastafariCalendar wrapper constructor | existing natural constructor failure + success | `NOT_RUN` |
| `test/public-api.test.js` — the public bypass preserves an explicitly supplied todayProvider | public PastafariCalendar wrapper constructor, GregorianDate, PastafariCalendar.convert | successful construction followed by deliberately throwing supplied callback during convert | `NOT_RUN` |
| `test/fast-compatibility.test.js` — the fast implementation matches the authoritative implementation (+ nested subtests) | browser authoritative PastafariCalendar, browser GregorianDate, makeSauce, lazy YearBounds/YearStructure/PastafariDate during conversions | success differential | `NOT_RUN` |
| `test/gate-data-regeneration.test.js` — all 40,001 authoritative positive runtime lookups equal the regenerated shadow | GateIndex | success | `NOT_RUN` |
| `test/gate-data-regeneration.test.js` — direct authoritative and clear-reference negative gaps agree for -1..-2048 | GateIndex | success | `NOT_RUN` |
| `test/router-cache-lifecycle.test.js` — router cache is bounded and uses least-recently-used idle eviction (+ related lifecycle tests) | PastafariCalendarRouterCore, newCalculationState plain-object factory | transport/router construction with fake clients | `NOT_RUN` |
| `test/router-concurrency.test.js` — requests arriving during verification keep their own target day (+ related concurrency tests) | PastafariCalendarRouterCore, newCalculationState | transport/router construction with fake clients | `NOT_RUN` |
| `test/router-fallback.test.js` — the router works through inline modules when Worker is unavailable | PastafariCalendarRouterCore, PastafariEngineClient, inlineLoader | transport fallback construction | `NOT_RUN` |
| `test/router-fallback.test.js` — an authoritative timeout terminates its worker and the next request starts a fresh one | PastafariEngineClient, Worker factory | simulated failure/cleanup | `NOT_RUN` |
| `test/diagnostics.test.js` — engine-client Worker timeout is diagnosed without changing the thrown error | PastafariEngineClient, test HangingWorker constructor | test-only worker construction + simulated timeout | `NOT_RUN` |
| `test/standalone-build.test.js` — standalone artifacts are self-contained classic scripts | standalone bundle / embedded worker source | static build coverage | `NOT_RUN` |
| `test/year-ceiling-detour.test.js` — year-ceiling detour restores the gate reader after a thrown candidate search (+ nested restore tests) | public PastafariCalendar, GateIndex, detour wrappers | existing injected/error-path restoration tests | `NOT_RUN` |
| `test/cache-epoch-detour.test.js` — failed population rolls shadow mutations back and leaves no partial valid entry | authoritative cache-epoch detour | existing failure-path rollback test | `NOT_RUN` |
| `test/extreme-performance.test.js` — representative formerly-timeout case uses bounded cursor work and preserves its canonical result | authoritative/fast conversion construction path as applicable | success/performance | `NOT_RUN` |
| `test/reverse.test.js` — other absolute calendars use the authoritative side door | public calendar date constructors used by reverse API | public API integration | `NOT_RUN` |

Failure/rollback-oriented existing tests were **inventoried but deliberately not run** in Stage 2A, because running their injected/mocked failure mechanisms would violate this stage boundary.

## F. Success/failure candidates

### PROVEN success

- Stage 2A performed success-only runtime confirmations for **25 direct package-root constructor calls**.
- `makeSauce(0n,0n)` and `makeSauceUncached(0n,0n)` returned `SauceResult`; `localToday()` returned `GregorianDate`; Gregorian `calendarObjectToDate(...)` returned `GregorianDate`.
- A fresh `PastafariCalendar().convertJdn(FOUNDATION_JDN,{calculationJdn:FOUNDATION_JDN})` completed and returned `Year 5000 / לגש / 762 / לבונה / 105`, confirming the lazy `YearBounds → MonthWeavingCounter → YearStructure → PastafariDate` chain. Thus every one of the 28 semantic constructor types has at least one proven package-root success path.

### PROVEN existing failure (not executed in Stage 2A)

- `test/public-api.test.js` already proves that `new monster.PastafariCalendar()` on the raw Node-generated core throws a `ReferenceError` mentioning `localToday`, while `new published.PastafariCalendar()` succeeds. Stage 2A only inventoried this existing proof.

### CANDIDATE / UNKNOWN

- The eight explicit validation conditions listed above are `CANDIDATE` failure inputs by condition, but Stage 2A did not manufacture or execute invalid values.
- For the remaining generated constructors, a natural failure input remains `UNKNOWN` at this stage even though possible throw-capable operations are present.
- Browser-copy and standalone-embedded success inputs are `CANDIDATE` at per-constructor granularity unless already covered by existing tests; Stage 2A did not rerun 28× deployment copies merely to duplicate the package-root confirmations.

## G. Unresolved items

- `UNRESOLVED:working-tree` — The uploaded analysis ZIP has no .git directory, so a literal local git status/working-tree cleanliness cannot be proven. Remote main SHA is proven; analysis-source bytes are hashed before/after. Blocking: **no**.
- `UNRESOLVED:common-preamble-throw-contract` — Each decoded generated constructor has a common invocation-context preamble before its local try/finally. The precise throw contract and any state effect of that preamble are intentionally deferred to Stage 2B/3. Blocking: **no**.
- `UNRESOLVED:standalone-runtime-identity` — The standalone embedded authoritative worker set is statically fixed and reachable, but Stage 2A did not launch a browser Blob Worker to materialize/inspect every embedded constructor identity. This is not needed to map the construction graph. Blocking: **no**.

## H. Changed files / scope

- production files changed: **none**
- test files changed: **none**
- external Stage-2A artifacts created: this report + machine-readable inventory only
- fault injection: **none**
- failure-input probing: **none**
- rollback/state repair: **none**
- systematic state-before/after-failed-call measurements: **none**
- Stage 3 entered: **no**

`READY_FOR_STAGE_3_CONSTRUCTION_SIDE = yes`

The three unresolved items do not block Stage 3: they concern local Git metadata, the precise state/throw contract of the generated common preamble (which is exactly a later-stage question), and standalone runtime identity materialization rather than missing reachability.
