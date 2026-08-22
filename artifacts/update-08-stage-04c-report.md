# Update 8 — Stage 4C: Test-only fault injection לאורך construction lifecycle

## 1. Revision ויישור

- Repository: `Sargon17-Green/pastafari-calendar`
- Branch: `main`
- Remote `main` בזמן הסגירה: `c141a94840a7806c73a8aaf8a87db22b7a9af1bc`
- Package version: `1.3.0`
- Uploaded ZIP SHA-256: `e372779ec19a5ba81b0d34a1844c3e98d26498c4bfe3a9b362f691cff5197abc`
- ה-ZIP אינו מכיל `.git`; לכן `git status` מילולי אינו זמין. נוספו מקומית רק script/artifacts של 4C; לא שונה קובץ production.
- ה-ZIP מייצג את עץ ה-production של `81cc54b1e15d8f3c0cd9cc8cb41d07f57fdecddf`. ה-commit הנוכחי `c141a9…` הוא child שלו ומוסיף רק תוצרי 4D; קוד ה-production זהה.

Production hashes שנבדקו:

- `src/5efdcc3e6fb071cbaffdcb117507a169dd76.js` — `a7e01b505870a7a72ce0bde98dc5e4d19f39bd8d560fdf961a4d5f4d2dfdd30d`
- `src/public-api.js` — `9d8c63636033659753d658ac9d76fa955ee8423bbf1cd11bfb90eab25a49f827`
- `browser/pastafari-calendar-core-chronicle.js` — `315f46a49f13db13b61d325915a6a5a32b7f043594c541c1886cfd8c0865db4a`
- `browser/standalone/pastafari-date.js` — `958f7f30cb8ad6a3a95570d8ed025e3131481b543c761ac9582103f069ad3b13`

Stages 1, 2A ו-2B קיימים ומיושרים ברמת קוד ה-production. **Stage 3 אינו קיים** ב-ZIP וגם לא היה ב-`verification/update8` ב-remote שנבדק. לכן לא ניתן לאשר את דרישת ה-SHA alignment הפורמלית מול Stage 3. זהו חסם פורמלי לסגירת 4C, לא חסם לביצוע המדידה הטכנית.

## 2. מנגנון ה-fault injection

לא שונה generated/production source על הדיסק. ה-harness מחליף זמנית, ורק בתהליך הבדיקה, את `Function` בזמן פענוח/קומפילציה של ה-generated authoritative core ומכניס hooks לזיכרון לתוך חמשת ה-bodies המפוענחים הרלוונטיים. מיד לאחר import מוחזרים `Function`, `Map` ו-`WeakMap` המקוריים.

ה-hook הוא opt-in. כאשר הוא כבוי הוא רק מאפשר instrumentation ואינו זורק. כאשר checkpoint מסוים חמוש הוא זורק `Stage4CInjectedFault` עם message `STAGE4C_INJECTED_FAULT:<checkpoint>`. כל 35 מקרי הקמפיין תפסו את החריגה המוזרקת המזוהה; לא נצפתה חריגת production בלתי צפויה במקום ה-sentinel.

ה-instrumentation אינו public API, אינו נכלל ב-normal bundle ואינו מבצע cleanup, rollback או compensation. הוא רק זורק בנקודה שנבחרה.

## 3. Success sanity לפני injection

לפני חימוש checkpoint כלשהו הורץ `foundation_same` דרך `src/public-api.js` מול ה-reference הקנוני של Stage 1:

- expected: `(5000, לגש, 762, לבונה, 105)`
- authoritative: `(5000, לגש, 762, לבונה, 105)`
- result: **PASS**

בנוסף, עם injection כבוי, `GregorianDate`, `IslamicDate`, `MonthWeavingCounter`, `PastafariCalendar` ו-`GateIndex` נבנו בהצלחה, ובכל אחד מהם shared-arena net delta היה `0`.

לאחר כל קמפיין ה-faults, אותו `foundation_same` באותו process ובאותו public calendar עדיין תאם ל-reference בדיוק, וכל חמשת ה-success constructor controls שוב נתנו net arena delta `0`.

`npm run test:reference-oracle`: **19/19 PASS**.

## 4. מסלולים ו-checkpoints

ה-instrumentation העמוק כיסה ארבע משפחות construction שונות:

1. `GregorianDate` — validation לאחר כתיבת `year`, כתיבות `year/month/day`, וה-generated wrapper המשותף.
2. `IslamicDate` — validation לפני field writes המקומיים, ארבע כתיבות שדות ו-finalization helper.
3. `MonthWeavingCounter` — validation עם nested callback ritual, כתיבות `lengths`, `monthCount`, `totalLength`, `prefix`.
4. `PastafariCalendar` — validation, `todayProvider`, nested `GateIndex`, ושלוש הקצאות cache objects.

בנוסף נבדק common generated invocation wrapper עצמו: `ENTRY`, after outer reservation, after inner base reservation, after argument measurement, after target completion, immediately before outer cleanup, ואחרי cleanup מקומי.

בסך הכול: **35 fault cases, 30 checkpoint IDs ייחודיים**.

## 5. ממצא מרכזי: חלון ה-cleanup gap

ה-checkpoint הראשון ללא residue הוא `GEN_WRAP_ENTRY`: החריגה מתרחשת לפני כל reservation ונותנת `arena delta = 0`.

המismatch הראשון הוא מיד לאחר ה-outer reservation:

- `GEN_WRAP_AFTER_RESERVATION` → `+12` cells.
- שלוש חזרות רצופות → `+12`, `+12`, `+12`; כלומר residue מצטבר ליניארית.

כאשר ה-fault מוכנס בתוך constructor preamble:

- `GEN_RESERVE_AFTER_BASE` → `+24`: outer 12-cell frame + inner 12-cell base frame.
- `GEN_RESERVE_AFTER_ARGUMENTS` על `GregorianDate(3 args)` → `+33`: `12 + 12 + 3×3`.
- אותו checkpoint על `PastafariCalendar(1 arg)` → `+27`: `12 + 12 + 3×1`.

מכאן אפשר להסיק רק את מה שהמדידה מוכיחה: **ה-cleanup gap מתחיל לא יאוחר מה-write הראשון של ה-outer reservation**. אי אפשר למקם את הסיבה המדויקת מוקדם יותר ללא שינוי נוסף של נקודות המדידה.

כל fault בתוך body של constructor, לאחר שה-preamble חזר ונכנס ל-`try/finally` המקומי, השאיר `+12` בלבד. פירוש הדבר הוא שה-inner constructor ritual אכן מתנקה ב-`finally`, אבל ה-outer invocation frame נשאר משום שה-wrapper החיצוני אינו מוגן ב-`finally`.

גם `GEN_WRAP_AFTER_TARGET` ו-`GEN_WRAP_BEFORE_CLEANUP` השאירו `+12`.

`GEN_WRAP_AFTER_CLEANUP` עדיין השאיר `+12`: ה-frame של ה-wrapper שבו ה-hook רץ כבר נחתך, אך ה-throw עולה דרך wrapper אב שטרם הגיע ל-cleanup שלו. זה אינו מוכיח שה-truncate המקומי נכשל; הוא מוכיח שהבעיה **קומפוזיציונית/nested** — כל wrapper אב יכול להישאר עם frame אם descendant זורק לאחר cleanup מקומי.

## 6. Identity metadata

ב-`PastafariCalendar` ה-options object נמדד ב-generated preamble. בשבעה checkpoints שונים בתוך constructor body, object חדש שלא היה ב-WeakMap לפני הקריאה הופיע אחריה עם IDs עוקבים `6..12`, אף שה-construction נכשל.

ב-probe ייעודי על אותו options object ב-`GEN_RESERVE_AFTER_ARGUMENTS`:

- failure ראשון: הקצה ID `13` ונשאר `+27` arena;
- failures שני ושלישי: אותו ID כבר היה קיים ולכן לא נוסף WeakMap mapping חדש, אך כל failure הוסיף שוב `+27` arena.

לכן יש כאן cleanup-gap family נפרדת: **persistent identity metadata/counter publication**. ה-WeakMap אינו strong-retention של key מת, אך ההקצאה וה-counter advance אינם rollback-transactional.

## 7. Cache/registry/descriptor observations

- בכל 35 מקרי ה-fault לא השתנה size של אף אחד מ-19 ה-Maps שנתפסו בזמן bootstrap/detour installation.
- `PastafariCalendar` נבדק אחרי `anchorCache`, `yearCache` ו-`structureCache` allocation. אלה allocations על partial `this`, לא `cache.set` publication; לא הומצא checkpoint של cache insertion שאינו קיים במסלול constructor.
- Stage 2B לא מצא constructor-time registry insertion במסלולים שנבדקו; לכן לא הומצא `AFTER_REGISTRY_INSERT` מלאכותי.
- identities/descriptors הציבוריים שנדגמו נשארו זהים בכל case.
- regression suite ממוקד (`cache-epoch`, `runtime-patching`, `year-ceiling`): **36 PASS, 0 FAIL, 4 pre-existing SKIP**.

## 8. Coverage matrix

| # | Construction ID | Checkpoint | State already mutated? | Throw observed? | State restored? | Arena Δ | WeakMap known-key changes | Map-size changes |
|---:|---|---|---|---|---|---:|---:|---:|
| 1 | `CTOR:authoritative:GregorianDate` | `GEN_WRAP_ENTRY` | no | yes | yes | +0 | 0 | 0 |
| 2 | `CTOR:authoritative:GregorianDate` | `GEN_WRAP_AFTER_RESERVATION` | yes | yes | no | +12 | 0 | 0 |
| 3 | `CTOR:authoritative:GregorianDate` | `GEN_WRAP_AFTER_RESERVATION` | yes | yes | no | +12 | 0 | 0 |
| 4 | `CTOR:authoritative:GregorianDate` | `GEN_WRAP_AFTER_RESERVATION` | yes | yes | no | +12 | 0 | 0 |
| 5 | `CTOR:authoritative:GregorianDate` | `GEN_RESERVE_AFTER_BASE` | yes | yes | no | +24 | 0 | 0 |
| 6 | `CTOR:authoritative:GregorianDate` | `GEN_RESERVE_AFTER_ARGUMENTS` | yes | yes | no | +33 | 0 | 0 |
| 7 | `CTOR:authoritative:GregorianDate` | `GEN_WRAP_AFTER_TARGET` | yes | yes | no | +12 | 0 | 0 |
| 8 | `CTOR:authoritative:GregorianDate` | `GEN_WRAP_BEFORE_CLEANUP` | yes | yes | no | +12 | 0 | 0 |
| 9 | `CTOR:authoritative:GregorianDate` | `GEN_WRAP_AFTER_CLEANUP` | no | yes | no | +12 | 0 | 0 |
| 10 | `CTOR:authoritative:GregorianDate` | `GREGORIAN_AFTER_VALIDATION` | yes | yes | no | +12 | 0 | 0 |
| 11 | `CTOR:authoritative:GregorianDate` | `GREGORIAN_AFTER_YEAR_WRITE` | yes | yes | no | +12 | 0 | 0 |
| 12 | `CTOR:authoritative:GregorianDate` | `GREGORIAN_AFTER_MONTH_WRITE` | yes | yes | no | +12 | 0 | 0 |
| 13 | `CTOR:authoritative:GregorianDate` | `GREGORIAN_AFTER_DAY_WRITE` | yes | yes | no | +12 | 0 | 0 |
| 14 | `CTOR:authoritative:IslamicDate` | `ISLAMIC_AFTER_VALIDATION` | yes | yes | no | +12 | 0 | 0 |
| 15 | `CTOR:authoritative:IslamicDate` | `ISLAMIC_AFTER_YEAR_WRITE` | yes | yes | no | +12 | 0 | 0 |
| 16 | `CTOR:authoritative:IslamicDate` | `ISLAMIC_AFTER_MONTH_WRITE` | yes | yes | no | +12 | 0 | 0 |
| 17 | `CTOR:authoritative:IslamicDate` | `ISLAMIC_AFTER_DAY_WRITE` | yes | yes | no | +12 | 0 | 0 |
| 18 | `CTOR:authoritative:IslamicDate` | `ISLAMIC_AFTER_VARIANT_WRITE` | yes | yes | no | +12 | 0 | 0 |
| 19 | `CTOR:authoritative:IslamicDate` | `ISLAMIC_BEFORE_FINALIZATION` | yes | yes | no | +12 | 0 | 0 |
| 20 | `CTOR:authoritative:IslamicDate` | `ISLAMIC_AFTER_FINALIZATION` | yes | yes | no | +12 | 0 | 0 |
| 21 | `CTOR:authoritative:MonthWeavingCounter` | `MONTH_WEAVING_AFTER_VALIDATION` | yes | yes | no | +12 | 0 | 0 |
| 22 | `CTOR:authoritative:MonthWeavingCounter` | `MONTH_WEAVING_AFTER_LENGTHS_WRITE` | yes | yes | no | +12 | 0 | 0 |
| 23 | `CTOR:authoritative:MonthWeavingCounter` | `MONTH_WEAVING_AFTER_MONTHCOUNT_WRITE` | yes | yes | no | +12 | 0 | 0 |
| 24 | `CTOR:authoritative:MonthWeavingCounter` | `MONTH_WEAVING_AFTER_TOTALLENGTH_WRITE` | yes | yes | no | +12 | 0 | 0 |
| 25 | `CTOR:authoritative:MonthWeavingCounter` | `MONTH_WEAVING_AFTER_PREFIX_WRITE` | yes | yes | no | +12 | 0 | 0 |
| 26 | `CTOR:authoritative:PastafariCalendar` | `PASTAFARI_AFTER_VALIDATION` | yes | yes | no | +12 | 1 | 0 |
| 27 | `CTOR:authoritative:PastafariCalendar` | `PASTAFARI_AFTER_TODAY_PROVIDER_WRITE` | yes | yes | no | +12 | 1 | 0 |
| 28 | `CTOR:authoritative:PastafariCalendar` | `PASTAFARI_BEFORE_GATE_INDEX_CONSTRUCTION` | yes | yes | no | +12 | 1 | 0 |
| 29 | `CTOR:authoritative:PastafariCalendar` | `PASTAFARI_AFTER_GATE_INDEX_CONSTRUCTION` | yes | yes | no | +12 | 1 | 0 |
| 30 | `CTOR:authoritative:PastafariCalendar` | `PASTAFARI_AFTER_ANCHOR_CACHE_ALLOCATION` | yes | yes | no | +12 | 1 | 0 |
| 31 | `CTOR:authoritative:PastafariCalendar` | `PASTAFARI_AFTER_YEAR_CACHE_ALLOCATION` | yes | yes | no | +12 | 1 | 0 |
| 32 | `CTOR:authoritative:PastafariCalendar` | `PASTAFARI_AFTER_STRUCTURE_CACHE_ALLOCATION` | yes | yes | no | +12 | 1 | 0 |
| 33 | `CTOR:authoritative:PastafariCalendar` | `GEN_RESERVE_AFTER_ARGUMENTS` | yes | yes | no | +27 | 1 | 0 |
| 34 | `CTOR:authoritative:PastafariCalendar` | `GEN_RESERVE_AFTER_ARGUMENTS` | yes | yes | no | +27 | 0 | 0 |
| 35 | `CTOR:authoritative:PastafariCalendar` | `GEN_RESERVE_AFTER_ARGUMENTS` | yes | yes | no | +27 | 0 | 0 |

## 9. Confirmed cleanup-gap families

1. **Outer shared invocation arena frame** — failure after outer reservation leaves 12 cells; repeated failures accumulate.
2. **Pre-try inner ritual reservation** — failure during preamble can retain outer + inner base + `3×argc` cells; signatures measured `+24`, `+33`, `+27` according to checkpoint/argc.
3. **Nested wrapper propagation** — even after a descendant wrapper has truncated its own frame, throwing before returning through an ancestor can strand the ancestor's 12-cell frame.
4. **Generated identity WeakMap/counter** — object arguments can receive persistent IDs before constructor success; failed construction does not undo them.

No separate persistent Map/cache-size residue, prototype/function identity residue, or constructor-time registry residue was observed in this 4C campaign.

## 10. Validation boundary

ה-control requested in the prompt has an important qualification in this implementation: validation **does not precede all mutation**. The generated reserve/measurement preamble runs before the constructor-local `try` and before validation. לכן `ISLAMIC_AFTER_VALIDATION` ו-`PASTAFARI_AFTER_VALIDATION`, אף שהם לפני field writes המקומיים, אינם expected zero-delta checkpoints; outer/inner generated state כבר השתנה לפני validation.

## 11. Limitations / paths not separately instrumented

- Stage 3 artifact/harness חסר; strict Stage-3 SHA alignment אינו ניתן לאישור.
- random/witness internals לא קיבלו monkey patch גלובלי. אין צורך בכך כדי לשחזר את cleanup gap, וה-prompt עצמו מעדיף לא לבצע patch גלובלי ללא seam בטוח.
- generated `Function` compilation מתרחש בזמן bootstrap, לא בתוך ארבעת constructor lifecycles שנבדקו; לכן לא נטען שבוצע constructor-time compile-failure test מלאכותי.
- registry/cache **insertion** checkpoints אינם קיימים לוגית ב-constructors שנבחרו. Cache allocation נבדק; cache transaction/set failure כבר שייך למסלולי 4D.
- ה-hook הגנרי `GEN_WRAP_AFTER_CLEANUP` מופעל ב-wrapper הראשון שמגיע לנקודה; עקב nesting הוא מדגים residue ב-wrapper אב. לא הוסף occurrence-selector מלאכותי רק כדי לייצר zero-delta חיצוני.

## 12. Files / artifacts

- `artifacts/update-08-stage-04c-fault-injection.json` — machine-readable artifact המחייב.
- `artifacts/update-08-stage-04c-success-sanity.json`
- `artifacts/update-08-stage-04c-reference-oracle.log`
- `artifacts/update-08-stage-04c-regression-tests.tap`
- `artifacts/update-08-stage-04c-report.md`
- `verification/update8/run-stage-04c-fault-injection.mjs` — test-only harness.

Production changes: **none**.

## 13. Stop point

`STAGE_4C_RESULT = TECHNICAL_FINDINGS_CONFIRMED_FORMAL_CLOSE_BLOCKED_BY_MISSING_STAGE_3_ARTIFACT`

- leaking checkpoints: כל checkpoint שנבדק לאחר תחילת outer reservation; 34/35 cases לא חזרו ל-state projection שלפני invocation.
- zero-delta checkpoints: `GEN_WRAP_ENTRY` בלבד בקמפיין fault; כל success control עם injection disabled נתן net arena delta 0.
- uninstrumentable / not separately instrumented: random/witness internals; constructor-time compile failure אינו applicable; registry/cache insertion boundaries אינם קיימים במסלולים שנבחרו.
- cleanup-gap families: outer arena frame; pre-try inner reservation; nested ancestor wrapper frame; identity WeakMap/counter publication.

`READY_FOR_STAGE_5_FROM_4C = no`

הסיבה: הממצאים הטכניים של 4C מספיקים כדי למפות את ה-cleanup gaps, אך תנאי הקבלה הפורמלי של טעינת/יישור Stage 3 אינו ניתן לקיום משום ש-Stage 3 artifact חסר. בנוסף Stage 5 אמור להתחיל רק לאחר איחוד 4A–4D.
