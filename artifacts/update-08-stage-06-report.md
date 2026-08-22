# Update 8 — Stage 6: Independent post-fix proof of failed-construction transactionality

## תוצאה

**כן. התיקון עצמו, ברמת המנוע וה־state transactionality, הוכח מחדש באופן עצמאי.**

```text
STAGE_6_RESULT = FIX_INDEPENDENTLY_VERIFIED
READY_FOR_STAGE_7 = yes
production files changed during Stage 6: none
```

Stage 6 לא תיקן production. נמצאו שתי מגבלות verification שאינן כשל production: harness ישן של Stage 4C שאינו יכול עוד לבצע transform בגלל needle שנעשה non-unique, ו־`test:compatibility` שלא השלים subtest בחלון המוגבל ונמסר במפורש ל־Stage 7.

## 1. Revision ויישור production

- Repository: `https://github.com/Sargon17-Green/pastafari-calendar`
- Branch: `main`
- `main` שנבדק: `9b86695f2f693742837bce8b865a24643c522ebf`
- Stage-5 production commit: `44d5e1d3818b400df0f7a36bf17216d04345add6`
- Package: `1.3.0`
- Node: `v22.16.0`
- npm: `10.9.2`
- ה־ZIP שסופק אינו checkout עם `.git`, ולכן `git status` מקומי אינו זמין. במקום זאת בוצעו התאמת remote-main דרך GitHub, hashes, והשוואת directories production מול snapshot הכניסה.

`main` מתקדם בשני commits מאז Stage 5, אך ה־diff כולל רק `SHA256SUMS.txt` ו־`test/update-08-stage-05-transactionality.test.js`. אין שינוי production אחרי Stage 5.

ארבעת hashes של production תואמים בדיוק ל־Stage 5:

| קובץ | SHA-256 |
|---|---|
| `src/5efdcc3e6fb071cbaffdcb117507a169dd76.js` | `99c7a18b015b669654eec06b49740df1b884465b43702b9705e4f6d9fd87ede9` |
| `browser/pastafari-calendar-core-chronicle.js` | `36fed61386d9c545a191393e4bfd647ccefbc26fef11bec88faa708ed69b77ea` |
| `browser/standalone/pastafari-date.js` | `532ccdd809633ee79aab618bda9b98b48d740798436fd1c1917f3fcf3340136d` |
| `browser/standalone/pastafari-date.min.js` | `a78dfc01c8dd250e5639972756aadbb80e7bb9e77cc5bd9b8f0b68e1793f0b6a` |

Fingerprint המתועד של Stage 5: `sha256:b42f832a56588431c55aab7806780e84eea9cc284b640203623e173ab5ea97bc`.

בסיום Stage 6: `src/` ו־`browser/` זהים byte-for-byte ל־snapshot הכניסה; אין קובצי `.stage6-public-api-*` זמניים שנותרו.

## 2. Independence — לא self-test בלבד

הוכחת העצמאות נשענה על ארבע שכבות:

1. Stage-5 self-test הורץ מחדש ועבר: 1/1.
2. **Stage-3 snapshot harness המקורי**, ללא שינוי production וללא התאמתו לתיקון, הורץ מחדש: 8/8 failure paths שלו עברו מ־pre-fix leak ל־`arena Δ = 0`; `leakingFailurePaths = 0`; semantics נשמרו.
3. Stage-4D arena/publication harness הישן הורץ מחדש: הכשלים הייצוגיים שהשאירו pre-fix `+12` משאירים כעת `0`; עשרה keys שונים שנכשלו משאירים `0` ולא נגישים מן arena.
4. נכתב verifier נפרד של Stage 6 שמודד arena, holes, WeakMap identity, nested ownership, retained references ו־clean-history allocation, בלי להוסיף cleanup או rollback משלו.

המסקנה של Stage-5 test והמסקנה של ה־independent verifier זהות: PASS.

## 3. השוואת pre-fix מול post-fix

| Case | Pre-fix | Post-fix expected | Stage 6 observed |
|---|---|---|---|
| natural failed construction | +12 arena (representative natural failures) | 0 | 0 |
| 100 failures | +1200 arena | 0 | 0 on every natural path checkpoint |
| 1000 failures | +12000 arena | 0 | 0 on every natural path checkpoint |
| failed-new identity key | mapped | absent | absent immediately after each applicable failure |
| distinct failed keys | counter/sequence advances | no clean-history perturbation | 100 failed keys: next ID equals matched clean history |
| nested descendant throw | ancestor frame remained with descendant residue | no descendant residue; ancestor survives inner rollback | outer state preserved; inner absent; parent failure restores caller entry |

ה־`+12` הוא signature היסטורי בלבד; שום assertion של Stage 6 אינו hard-coded לכך שהתיקון חייב "להחסיר 12".

## 4. שני defect families

- `STATE:generated:shared-invocation-arena` — **CLOSED_BY_STAGE6_EVIDENCE**.
- `STATE:generated:identity-map-and-counter` — **CLOSED_BY_STAGE6_EVIDENCE**.

## 5. Natural failure matrix ו־exception contract

| Failure | exception class | arena Δ | holes Δ | class+message זהים ל־Stage 5 |
|---|---:|---:|---:|---:|
| `F_BAHAI_INVALID_VARIANT` | `RangeError` | 0 | 0 | כן |
| `F_GREGORIAN_NONINTEGER_MONTH` | `TypeError` | 0 | 0 | כן |
| `F_HINDU_INVALID_SCHEME` | `RangeError` | 0 | 0 | כן |
| `F_ISLAMIC_INVALID_VARIANT` | `RangeError` | 0 | 0 | כן |
| `F_JAPANESE_NONSTRING_ERA` | `TypeError` | 0 | 0 | כן |
| `F_MONTH_WEAVING_NONPOSITIVE` | `RangeError` | 0 | 0 | כן |
| `F_PASTAFARI_INVALID_TODAY_PROVIDER` | `TypeError` | 0 | 0 | כן |
| `F_SOLAR_HIJRI_INVALID_VARIANT` | `RangeError` | 0 | 0 | כן |
| `F_RAW_PASTAFARI_DEFAULT` | `ReferenceError` | 0 | 0 | כן |

כל תשעת המסלולים transactionally neutral מיד לאחר ה־throw. בכל key חדש שניתן לצפייה: `identityMap.has(key) == false` מיד לאחר failure. לא נדרש success מאוחר כדי לנקות state.

נמדד prefix numeric churn בחלק מן המסלולים, אך לא נמצאו reference/object changes persistent; בהתאם ל־Stage 5 הוא לא סווג כ־leak כאשר אין structural residue וה־success/control semantics זהים.

## 6. Repeated failures — 1/10/100/1000

העמודות הן `arena Δ` ב־1 / 10 / 100 / 1000, ואחריהן final holes Δ:

| Failure | arena Δ checkpoints | holes Δ final |
|---|---|---:|
| `F_BAHAI_INVALID_VARIANT` | 0 / 0 / 0 / 0 | 0 |
| `F_GREGORIAN_NONINTEGER_MONTH` | 0 / 0 / 0 / 0 | 0 |
| `F_HINDU_INVALID_SCHEME` | 0 / 0 / 0 / 0 | 0 |
| `F_ISLAMIC_INVALID_VARIANT` | 0 / 0 / 0 / 0 | 0 |
| `F_JAPANESE_NONSTRING_ERA` | 0 / 0 / 0 / 0 | 0 |
| `F_MONTH_WEAVING_NONPOSITIVE` | 0 / 0 / 0 / 0 | 0 |
| `F_PASTAFARI_INVALID_TODAY_PROVIDER` | 0 / 0 / 0 / 0 | 0 |
| `F_SOLAR_HIJRI_INVALID_VARIANT` | 0 / 0 / 0 / 0 | 0 |
| `F_RAW_PASTAFARI_DEFAULT` | 0 / 0 / 0 / 0 | 0 |

כל checkpoint הוא `0`. בנוסף, בתוך הלולאה נבדקה neutrality מיד לאחר כל failure באמצעות arena length ו־identity ownership; holes נסרקו בנקודות הבקרה כדי להימנע מסריקת 1.17 מיליון תאים אלפי פעמים.

## 7. Long campaign ו־retained references

נבחר `F_ISLAMIC_INVALID_VARIANT` למסע של **5,000** failures עם 5,000 caller-held keys שונים:

- checkpoint 100: arena Δ `0`, holes Δ `0`;
- checkpoint 1000: arena Δ `0`, holes Δ `0`;
- checkpoint 5000: arena Δ `0`, holes Δ `0`;
- כל 5,000 ה־keys absent מן identity map;
- אף key שנכשל אינו reachable מן arena שנותר.

זו ראיה ישירה נגד retained argument containers ולא רק נגד גידול באורך המערך.

## 8. Memory boundedness

ההרצה בוצעה עם `--expose-gc`. המדידות אינפורמטיביות בלבד; ההכרעה מבוססת על structural equality.

| נקודה | rss | heapTotal | heapUsed | external | arrayBuffers |
|---|---:|---:|---:|---:|---:|
| baseline-before-long | 327430144 | 164474880 | 121923944 | 31993598 | 20715 |
| 100 | 330051584 | 163950592 | 121931984 | 2117138 | 20715 |
| 1000 | 331886592 | 164212736 | 122022128 | 2219538 | 20715 |
| 5000 | 332017664 | 164474880 | 122421056 | 2221250 | 20715 |
| post-success | 334114816 | 164737024 | 122449416 | 2133470 | 20715 |

אין כאן ניסיון להסיק leak או no-leak מ־heap noise. הראיה המכריעה היא arena/holes/identity/reachability.

## 9. Alternating success/failure

רצף של **500** פעולות, 250 failures ו־250 successes, הסתיים ב־arena Δ `0`, holes Δ `0`. כל failure נבדק מיד וכל success נבדק לסמנטיקה תקינה.

## 10. A → FAIL → A ו־expanded reference sample

| Vector | A1 | A2 | Result |
|---|---|---|---|
| `foundation_same` | `{'year': '5000', 'cutletName': 'לגש', 'dayInCutlet': 762, 'monthName': 'לבונה', 'dayInMonth': 105}` | `{'year': '5000', 'cutletName': 'לגש', 'dayInCutlet': 762, 'monthName': 'לבונה', 'dayInMonth': 105}` | PASS |
| `foundation_next` | `{'year': '5000', 'cutletName': 'כליה', 'dayInCutlet': 1, 'monthName': 'אבן־גיר', 'dayInMonth': 91}` | `{'year': '5000', 'cutletName': 'כליה', 'dayInCutlet': 1, 'monthName': 'אבן־גיר', 'dayInMonth': 91}` | PASS |
| `foundation_previous` | `{'year': '5000', 'cutletName': 'לגש', 'dayInCutlet': 761, 'monthName': 'הדלת הסגורה', 'dayInMonth': 114}` | `{'year': '5000', 'cutletName': 'לגש', 'dayInCutlet': 761, 'monthName': 'הדלת הסגורה', 'dayInMonth': 114}` | PASS |
| `present_same` | `{'year': '5000', 'cutletName': 'מחשבה', 'dayInCutlet': 13, 'monthName': 'חרטה', 'dayInMonth': 16}` | `{'year': '5000', 'cutletName': 'מחשבה', 'dayInCutlet': 13, 'monthName': 'חרטה', 'dayInMonth': 16}` | PASS |
| `present_forward` | `{'year': '5000', 'cutletName': 'מחשבה', 'dayInCutlet': 19, 'monthName': 'ערפל', 'dayInMonth': 10}` | `{'year': '5000', 'cutletName': 'מחשבה', 'dayInCutlet': 19, 'monthName': 'ערפל', 'dayInMonth': 10}` | PASS |

נבדקו `foundation_same`, `foundation_next`, `foundation_previous`, `present_same`, `present_forward`. בכל אחד `A1 == A2 == reference(A)` ו־state מיד לאחר ה־FAIL היה entry-equivalent.

## 11. כמה failures לפני success

נבדקו `FAIL × 1/2/5/10/100/1000 → A`. בכל ששת המקרים:

- state לפני A היה entry-equivalent;
- כל failed keys היו absent;
- success החזיר Gregorian `2026-08-22` כמצופה.

## 12. Failure-order permutations

| Sequence | arena Δ | holes Δ | failed keys absent |
|---|---:|---:|---:|
| `ABC` | 0 | 0 | כן |
| `CBA` | 0 | 0 | כן |
| `AABBCC` | 0 | 0 | כן |
| `ABCABC` | 0 | 0 | כן |
| `ABCDEF` | 0 | 0 | כן |
| `FEDCBA` | 0 | 0 | כן |
| `ABCDEF` | 0 | 0 | כן |
| `ACEBDF` | 0 | 0 | כן |

כל שמונת הסדרים (`ABC`, `CBA`, `AABBCC`, `ABCABC`, `ABCDEF`, `FEDCBA`, `ABCDEF`, `ACEBDF` לפי זוגות ההשוואה) מסתיימים ב־initial-equivalent state. בכך נעלמה ה־order dependence שתועדה pre-fix.

## 13. Deterministic mixed sequence

- PRNG: `xorshift32`
- seed: `0x6a09e667`
- operations: `2000`
- sequence SHA-256: `2715c765ee622356d42bd1eeee68a73766c6ccddf6b769624c228af0b22c5575`
- counts: `{"A": 336, "B": 348, "F1": 342, "F2": 298, "F3": 356, "fragment": 320}`
- final arena Δ: `0`
- final holes Δ: `0`
- failed-only identity keys absent: `true`

## 14. Nested, LIFO, reentrancy ו־multi-instance

Nested depths: `1, 2, 3, 5, 10, 25`.

בכל depth שבו inner נכשל ו־outer ממשיך: contribution של outer נשמר, contribution של inner נעלם, final arena Δ `0`. כאשר outer נכשל לאחר inner failure: caller-entry state שוחזר ושני ה־keys absent.

Identity transfer נבדק בשני הכיוונים:

- inner success ואז outer failure: גם parent וגם child identity מתבטלים כאשר ה־child publication שייך ל־outer transaction;
- inner success + outer success: שתי identities committed ונשמרות.

Reentrancy/runtime patching נבדק גם דרך `npm test` וגם דרך `runtime-patching.test.js`: patch ledger, ownership tokens, late external patches, descriptor restoration, inner catch/continue, inner+outer failure, mixed reentry ו־A-B-A/two-instance עברו.

Multi-instance: A נשאר יציב אחרי failure ב־B, B נשאר יציב אחרי failure ב־A, module-global arena Δ `0`.

## 15. Identity map/counter

- failed-new key: absent במספר constructor families (`Bahai`, `Hindu`, `Islamic`, `MonthWeaving`, `Pastafari`, `SolarHijri`).
- preexisting key: ID `52` לפני ואחרי failure — נשמר.
- אותו failed key ×1/10/100: absent אחרי כל checkpoint.
- 100 failed distinct keys: כולם absent; לאחר **warm anchor תואם** dirty ו־clean מקצים anchor ID `4` ואז successful S מקבל ID `5` בשניהם; gap `1` בשניהם.
- fresh-process clean מול fresh→100 failures→success: same success ו־same next identity (`3`).
- collision protection: committed IDs `[3, 4, 6, 5, 7]` הם unique.

ה־warm anchor חשוב: השוואה לא־מותאמת של process שעבר lazy first-use מול process נקי אינה clean-history equivalent. Stage 6 תיקן את ה־test harness בלבד כך ששתי ההיסטוריות מקבלות אותו legitimate warm-up לפני ההשוואה.

## 16. Fault-injection replay

Stage-4C harness הישן אינו runnable על body החדש בגלל `non-unique transform needle`. זהו כשל instrumentation, לא production. לכן נבנה replay test-only מעודכן:

- 35 checkpoints המקוריים: כולם `stateRestored = true`;
- `leakingCheckpoints = []`;
- `GEN_WRAP_ENTRY`: delta `0`;
- post-mutation signatures (`GEN_WRAP_AFTER_RESERVATION`, `GEN_RESERVE_AFTER_BASE`, `GEN_RESERVE_AFTER_ARGUMENTS`, `GEN_WRAP_AFTER_TARGET`, `GEN_WRAP_BEFORE_CLEANUP`, `GEN_WRAP_AFTER_CLEANUP`) כולם delta `0`;
- נוספו 3 campaigns של 100 injected failures: סך הכול **335** injected failures, וכולם restored.

## 17. Publication/cache/runtime-patch regressions

Stage-4D publication/cache replay עבר:

- cache-epoch rollback: PASS;
- same-key failure → success: PASS;
- different-key isolation: PASS;
- nested cache population rollback/recovery: PASS;
- runtime patch ledger restored: PASS;
- installation/constructor registry stable: PASS;
- descriptor identity/function identity/prototype identity: PASS;
- cold failures then success == reference: PASS;
- warm failure then same success == reference: PASS;
- multi-instance cache objects separate: PASS.

## 18. Reference oracle ו־canonical vectors

`npm run test:reference-oracle`: **19/19 PASS, 0 FAIL, 0 SKIP**.

שלושת ה־canonical foundation vectors עברו exact equality. בנוסף נבדקו `present_same` ו־`present_forward`, כך ש־Stage 6 אינו מסתפק בשלושת הווקטורים בלבד.

## 19. Full suite ו־focused regressions

- `npm test`: **196 tests; 192 pass; 0 fail; 4 skip**. ארבעת ה־SKIP הם pre-existing/expected ואינם מסווגים failure.
- focused `runtime-patching + router-cache-lifecycle + year-ceiling-detour`: **44 tests; 40 pass; 0 fail; 4 skip**.
- focused `cache-epoch-detour`: **7/7 pass**.

## 20. Compatibility status

`npm run test:compatibility` נוסה שוב בחלון מוגבל של כ־120 שניות. התקבל רק header של TAP ולא subtest מושלם; התהליך היה CPU-active. לכן:

```text
compatibility = DEFERRED_TO_STAGE_7_CROSS_ENVIRONMENT
```

אין כאן PASS מדומה, וגם אין FAIL מוכח. הסקריפט הוא `fast-compatibility.test.js`, כלומר fast-engine/distribution compatibility — בדיוק תחום המטריצה של Stage 7. ברמת engine/core של Stage 6, ה־reference oracle וה־authoritative/core suites עברו במלואם.

## 21. Test-only instrumentation audit

- production modified by harness: `false`;
- harness adds rollback/cleanup of production state: `false`;
- globals restored after import: `true`;
- temporary public-api shim left behind: `false`;
- arena observation: in-memory `Function` construction hook בלבד;
- identity observation: captured WeakMaps; identity map נבחר באמצעות committed probe key.

שני שיפורי harness נעשו במהלך Stage 6: (1) holes/reachability נסרקים בנקודות משמעותיות ולא אחרי כל call, כדי למנוע עלות ריבועית מלאכותית; (2) authoritative generated module נטען דרך אותו public detour installation כמו המנוע הציבורי, כדי לא להשוות raw לא־מותקן ל־reference ציבורי. אלה שינויים test-only ואינם משנים production semantics.

## 22. Acceptance criteria

כל קריטריוני הקבלה של Stage 6 ברמת המנוע וה־transactionality התקיימו: 9/9 natural failures neutral; exception contract זהה; 1/10/100/1000 zero accumulation; 5000 zero accumulation; retained references absent; failed-new identities absent; preexisting identity preserved; clean-history sequence preserved; nested commit/rollback correct; LIFO correct; multi-instance isolation; permutations converge; deterministic campaign no drift; 35/35 checkpoint replay clean; reference oracle/canonical/full core/non-target regressions pass; אין production change.

## 23. Remaining issues / scope boundary

1. **Legacy Stage-4C instrumentation incompatibility** — superseded by Stage-6 test-only replay; אינו production regression.
2. **Fast compatibility bounded timeout** — `DEFERRED_TO_STAGE_7_CROSS_ENVIRONMENT`; לא נספר כ־PASS ולא כ־FAIL של Stage 6.

## 24. Production diff

```text
production files changed during Stage 6: none
```

## 25. מסקנה

```text
STAGE_6_RESULT = FIX_INDEPENDENTLY_VERIFIED
READY_FOR_STAGE_7 = yes
```

**תשובה לשאלת העצירה: כן — התיקון עצמו, ברמת המנוע וה־state transactionality, הוכח מחדש באופן עצמאי.**

Stage 7 לא בוצע במסגרת משימה זו.
