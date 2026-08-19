# ניתוח ביצועים קיצוניים של ה-fast engine

תאריך: 2026-08-19  
בסיס החקירה המקורית: `main` ב-`2b865f2959ded97ad4850e048199e904db26875a`.  
בסיס ה-rebase הנוכחי: הארכיון המצורף `pastafari-calendar-main (29)(6).zip`, עם מזהה archive `b7c19bdd55b734823652f605a8969f585e8d5fbf`.  
מנוע ה-fast ההיסטורי של ה-soak: SHA-256 `61318bc0813579f8d703737716704c467b87f2492213c2a1bd0970d9bc9f421b`.

## Rebase על הגרסה המצורפת — 2026-08-19

החבילה הזו אינה העתקה של חבילת התיקון הקודמת. בוצע merge נקודתי מול העץ המצורף. הגרסה המצורפת כבר כללה שינויים מקבילים מהותיים ב-`browser/pastafari-calendar-fast.js`, ב-`scripts/soak-fast-engine.mjs`, בתשתית diagnostics, ב-workflows ובתשתיות benchmark/memory. כל אלה נשמרו.

בפרט, תשתית diagnostics החדשה (`browser/pastafari-diagnostics.js` ו-`scripts/diagnose.mjs`) הפכה את instrumentation המקביל שהיה בשימוש בחקירה הראשונית למיותר. לכן כלי `diagnose-extreme-performance.mjs` בגרסה זו משתמש ישירות ב-production diagnostics הקיימים, וה-fast engine רק מוסיף metrics ממוקדים לבחירת נקודת ההתחלה: `fast.checkpoint.static-starts` ו-`fast.checkpoint.cursor-starts`.

בדיקת rebase מייצגת של EXT-004 על העץ החדש נתנה: 6,022.20 ms cold, 0.090 ms warm, 4,375 צעדי recurrence, 2 התחלות static, 4,369 התחלות cursor, שנה אחת של year traversal, ופלט זהה לפלט המאומת: `5001 / קרן / 72 / כישור / 4`. כלומר השינוי נשאר bounded ומשמר-תוצאה גם אחרי שילוב שכבת ה-diagnostics החדשה.

נמצא גם מצב קיים שאינו נוצר על ידי התיקון הזה: קובצי ה-Standalone שבארכיון המצורף אינם משקפים את שכבת diagnostics שכבר קיימת במקור ה-fast engine. סביבת העבודה אינה מכילה את `esbuild 0.28.2` הנעול ב-`package-lock.json`, ולכן לא ניתן היה להריץ כאן את generator הרשמי באופן שניתן לטעון שהוא byte-reproducible. בהתאם לעקרון אי-דריסת עדכונים מקבילים, שני קובצי ה-Standalone נשארו בדיוק כפי שהגיעו בארכיון ולא נערכו ידנית.

## תקציר מנהלים

כל 11 מקרי ה-performance timeout ההיסטוריים אותרו במדויק. כולם חוצים אותה נקודת כשל מבנית: יום המעשה שלהם נמצא 4,352–5,769 gates מעבר ל-checkpoint הסטטי החיובי האחרון, בעוד ששני caches של שכבת ה-gates מוגבלים ל-4,096 entries. במימוש הישן, `gatePosition()` התחיל כל cache miss מחדש מן ה-static checkpoint הקרוב; לאחר חריגה מ-4,096 entries נוצר LRU thrashing, ולכן אותו רצף `gateDistance()`/`sauce()` חושב שוב ושוב.

זה אינו timeout שנובע ממעבר אלפי שנים: בכל 11 המקרים שנת היעד היא 4998–5001, כלומר `findYear()` עובר רק 0–2 שנים משנת 5000. העלות המרכזית הייתה איתור מיקום ה-gates של יום המעשה, לפני traversal משמעותי של שנים.

בוצעה אופטימיזציה אחת ב-production: cursor יחיד וחסום של gate שכבר חושב במדויק. ב-cache miss הוא משמש נקודת התחלה רק אם הוא קרוב יותר ל-gate המבוקש מה-checkpoint הסטטי שהמנוע הישן היה בוחר. נוסחת ה-gates, `sauce`, הסדרים, הדיוק וכל תוצאה פסטפרית נשארו ללא שינוי. אין cache בלתי חסום ואין precomputed oracle table.

לאחר השינוי, כל 11 המקרים הסתיימו בריצות cold שנמדדו; median של n=2 היה 4.0–11.5 שניות, לעומת timeout היסטורי של 600 שניות לכל attempt. כלומר השיפור הנמדד הוא לפחות 52×–150× לפי גבול ה-timeout בלבד. ה-work count החדש הוא 4,372–5,779 `gateDistance` misses, כמעט בדיוק מרחק ה-gate הדרוש.

נמצא גם באג נפרד ב-harness: לאחר ה-timeout האחרון Worker לא נהרג, ולכן יכול היה להמשיך לצרוך CPU ברקע ולהשפיע על המקרה הבא. הוא תוקן בנפרד. הוא אינו מסביר את 11 המקרים, משום שכל אחד מהם שוחזר במספר attempts עם restarts בין attempts.

## 1. Inventory

| ID | Batch/case | Calculation day | Target | Direction | Previous result |
|---|---:|---:|---:|---|---|
| EXT-001 | 1/3 | 5987632 | 5986196 | past | TIMEOUT, 600,000 ms × 3 attempts |
| EXT-002 | 3/2 | 5662323 | 5667339 | future | TIMEOUT, 600,000 ms × 3 attempts |
| EXT-003 | 24/3 | 5763396 | 5763396 | same | TIMEOUT, 600,000 ms × 3 attempts |
| EXT-004 | 31/1 | 5285776 | 5290529 | future | TIMEOUT, 600,000 ms × 3 attempts |
| EXT-005 | 35/10 | 5629400 | 5629400 | same | TIMEOUT, 600,000 ms × 3 attempts |
| EXT-006 | 38/2 | 5630989 | 5630431 | past | TIMEOUT, 600,000 ms × 3 attempts |
| EXT-007 | 48/9 | 5533129 | 5533129 | same | TIMEOUT, 600,000 ms × 3 attempts |
| EXT-008 | 54/4 | 5352359 | 5342726 | past | TIMEOUT, 600,000 ms × 3 attempts |
| EXT-009 | 72/3 | 5654482 | 5654482 | same | TIMEOUT, 600,000 ms × 3 attempts |
| EXT-010 | 91/3 | 5426014 | 5419010 | past | TIMEOUT, 600,000 ms × 3 attempts |
| EXT-011 | 95/1 | 5940147 | 5940147 | same | TIMEOUT, 600,000 ms × 3 attempts |

כל המקרים הגיעו מ-`sampleClass=regular`. ה-correctness mismatch הנפרד מן ה-soak ההיסטורי לא נכלל כאן, בהתאם להגדרת המשימה.

## 2. Baseline ואחרי השינוי

ה-baseline המקורי אינו נותן זמן השלמה: כל case נעצר ב-600,000 ms. לכן `speedup` להלן הוא **גבול תחתון**: `600,000 / median_after`. זמני after הם n=2; זו דגימה קטנה במכוון משום שהמקרים היו היסטורית בני דקות.

| ID | Before | Cold after median (n=2) | Warm after median | Static checkpoint distance | Years traversed | Result-cache warm hit | Speedup lower bound |
|---|---:|---:|---:|---:|---:|---|---:|
| EXT-001 | >600,000 ms / TIMEOUT | 7424.8 ms | 0.043 ms | 5,769 gates | 0 | yes | >80.8× |
| EXT-002 | >600,000 ms / TIMEOUT | 4956.4 ms | 0.018 ms | 5,107 gates | 1 | yes | >121.1× |
| EXT-003 | >600,000 ms / TIMEOUT | 11533.6 ms | 0.060 ms | 5,315 gates | 0 | yes | >52.0× |
| EXT-004 | >600,000 ms / TIMEOUT | 4006.8 ms | 0.016 ms | 4,352 gates | 1 | yes | >149.7× |
| EXT-005 | >600,000 ms / TIMEOUT | 4270.7 ms | 0.019 ms | 5,044 gates | 0 | yes | >140.5× |
| EXT-006 | >600,000 ms / TIMEOUT | 4515.7 ms | 0.017 ms | 5,047 gates | 0 | yes | >132.9× |
| EXT-007 | >600,000 ms / TIMEOUT | 7359.5 ms | 0.072 ms | 4,861 gates | 0 | yes | >81.5× |
| EXT-008 | >600,000 ms / TIMEOUT | 7512.1 ms | 0.016 ms | 4,482 gates | 2 | yes | >79.9× |
| EXT-009 | >600,000 ms / TIMEOUT | 8876.9 ms | 0.019 ms | 5,091 gates | 0 | yes | >67.6× |
| EXT-010 | >600,000 ms / TIMEOUT | 5606.6 ms | 0.019 ms | 4,640 gates | 1 | yes | >107.0× |
| EXT-011 | >600,000 ms / TIMEOUT | 7016.7 ms | 0.016 ms | 5,666 gates | 0 | yes | >85.5× |

ה-warm time הזעיר הוא result-cache hit ואינו משמש הוכחה לשיפור במסלול ה-cold. ההוכחה הסיבוכיותית מגיעה מ-work counters.

## 3. Root cause

| ID | Classification | Dominant phase | Evidence |
|---|---|---|---|
| EXT-001 | C + D + E | calculation-state gate location / initialization | distance=5,769 > LRU 4096; target year=5000; years traversed=0; after-fix gateDistance misses=5,779 |
| EXT-002 | C + D + E | calculation-state gate location / initialization | distance=5,107 > LRU 4096; target year=5001; years traversed=1; after-fix gateDistance misses=5,125 |
| EXT-003 | C + D + E | calculation-state gate location / initialization | distance=5,315 > LRU 4096; target year=5000; years traversed=0; after-fix gateDistance misses=5,328 |
| EXT-004 | C + D + E | calculation-state gate location / initialization | distance=4,352 > LRU 4096; target year=5001; years traversed=1; after-fix gateDistance misses=4,372 |
| EXT-005 | C + D + E | calculation-state gate location / initialization | distance=5,044 > LRU 4096; target year=5000; years traversed=0; after-fix gateDistance misses=5,054 |
| EXT-006 | C + D + E | calculation-state gate location / initialization | distance=5,047 > LRU 4096; target year=5000; years traversed=0; after-fix gateDistance misses=5,060 |
| EXT-007 | C + D + E | calculation-state gate location / initialization | distance=4,861 > LRU 4096; target year=5000; years traversed=0; after-fix gateDistance misses=4,873 |
| EXT-008 | C + D + E | calculation-state gate location / initialization | distance=4,482 > LRU 4096; target year=4998; years traversed=2; after-fix gateDistance misses=4,493 |
| EXT-009 | C + D + E | calculation-state gate location / initialization | distance=5,091 > LRU 4096; target year=5000; years traversed=0; after-fix gateDistance misses=5,103 |
| EXT-010 | C + D + E | calculation-state gate location / initialization | distance=4,640 > LRU 4096; target year=4999; years traversed=1; after-fix gateDistance misses=4,650 |
| EXT-011 | C + D + E | calculation-state gate location / initialization | distance=5,666 > LRU 4096; target year=5000; years traversed=0; after-fix gateDistance misses=5,677 |

פירוש הסיווג: **C** הוא path/checkpoint selection במובן שהמימוש התעלם מנקודת gate דינמית מדויקת שכבר הייתה זמינה; אין static checkpoint אחר טוב יותר בטבלה הקיימת. **D** הוא cache inefficiency בגלל LRU thrashing. **E** הוא implementation inefficiency: אותה recurrence מדויקת חושבה שוב ושוב שלא לצורך. אין עדות לכך שמקרה כלשהו מתוך ה-11 הוא בעיקר A (מרחק מובנה בשנים) או B (שנה פתולוגית יחידה).

ב-diagnostic של המימוש הישן, לפני הגעה ל-target, תקציב של 5,000 `sauce` misses כבר רשם **8,395,657 קריאות `gateDistance`**, 4,099 קריאות `gatePosition`, 0 cache hits של gate position ו-4,099 התחלות מחדש מ-static checkpoint. זוהי הוכחה ישירה ל-duplicate traversal, לא רק timing.

## 4. Scaling

### לפני

| Distance from checkpoint (gates) | containingGateInterval time |
|---:|---:|
| 50 | 31.7 ms |
| 100 | 58.0 ms |
| 200 | 126.5 ms |
| 400 | 253.6 ms |
| 800 | 590.4 ms |
| 1,200 | 831.8 ms |
| 1,600 | 1,405.0 ms |
| 2,400 | 3,699.0 ms |
| 3,200 | 3,685.0 ms |
| 4,000 | 5,217.0 ms |
| 4,400 | >45,000 ms / cap |

ה-cliff מופיע סביב גודל ה-LRU, 4,096 entries. לפניו חלק גדול מקריאות `gateDistance` החוזרות עדיין פוגע ב-cache; אחריו הסריקה החוזרת דוחקת את הערכים שנחוצים לסריקה הבאה.

### אחרי

| Distance | gateDistance calls | Runtime |
|---:|---:|---:|
| 500 | 501 | 274.2 ms |
| 1,000 | 1,001 | 579.1 ms |
| 2,000 | 2,001 | 1,137.8 ms |
| 3,000 | 3,001 | 1,683.0 ms |
| 4,000 | 4,001 | 3,611.4 ms |
| 5,000 | 5,001 | 9,062.7 ms |
| 5,769 | 5,770 | 5,348.5 ms |

מבחינת work count, ההתנהגות במדידה הישירה היא ליניארית בדיוק: `n` gates דורשים בקירוב `n+1` קריאות. ה-wall clock רועש יותר משום שכל work unit כולל BigInt ו-`sauce`; לכן אין להסיק Big-O פורמלי מזמני הקיר בלבד. הניסוח הנתמך הוא: **empirically linear work in gate distance after the fix**.

בזוג סימטרי של 5,769 gates התקבלו 5,769 קריאות בשני הכיוונים; future ≈3,154.8 ms ו-past ≈3,193.0 ms. לא נמצאה אסימטריית work-count בין כיוון חיובי לשלילי.

## 5. CPU profile

סביבת ה-profiling המקומית: Node `v22.16.0`, V8 `12.4.254.21-node.26`, Linux x86_64, Intel Xeon Platinum 8573C; `os.cpus()` מנה 5 logical CPUs ו-`os.availableParallelism()` החזיר 4; RAM זמין לסביבה כ-5.93 GiB. ה-soak ההיסטורי רץ ב-Node v26.7.0 / V8 14.6.202.34-node.28 על Windows x64 עם 12 CPUs. לכן אין להשוות wall-clock בין שתי הסביבות כאילו הן זהות.

ב-diagnostic סופי מייצג של EXT-004 לאחר האופטימיזציה התקבלה חלוקת זמן: initialization 2,369.7 ms (79.53%), year traversal 7.4 ms (0.25%), year construction 602.3 ms (20.21%), final resolution 0.21 ms (0.01%), מתוך 2,979.6 ms. במימוש ההיסטורי ה-diagnostic budget כבר נעצר בתוך gate-location initialization, לפני הגעה לעבודה מהותית של שנת היעד.

ב-profile חלקי של המקרה הקיצוני הישן, לפני הגעה ליעד, החלקים המובילים היו: `sauce` 26.23%, `LruMap.get` 20.33%, `LruMap.set` 17.99%, `positiveMod` 13.73%, GC 8.28%, `gatePosition` 4.24%. זה תואם בדיוק ל-LRU thrashing: כמות עצומה של lookup/set ו-recomputation של `sauce`.

לאחר ה-cursor, ב-EXT-004: `sauce` 43.62%, `positiveMod` 24.79%, `keep` 7.26%, GC 5.71%, `gateDistance` 4.77%, `unrankMonthInterleaving` 4.47%, ו-`gatePosition` עצמו 0.20%. כלומר overhead של ה-LRU חדל להיות hot path; הזמן הנותר הוא בעיקר העבודה המתמטית האמיתית.

לשם השוואה, case רגיל בן-התקופה הנוכחית הראה `unrankMonthInterleaving` ≈29.33% ו-`InterleavingCounter.rebuild` ≈19.84%, ולכן לאחר הסרת ה-thrashing בניית השנה יכולה להיות שוב עלות משמעותית, כפי שמצופה מן האלגוריתם. קבצי `.cpuprofile` לא נכללים במאגר.

## 6. Checkpoints

בטבלה הקיימת 65 static checkpoints מ-gate -32768 עד +32768, במרווח 1024. ה-checkpoint החיובי האחרון הוא gate 32768 ב-JDN 3,111,357. לכל 11 המקרים אין static checkpoint קרוב יותר; לכן הבעיה אינה binary-search שגוי בטבלת ה-checkpoints אלא העובדה ש-`gatePosition()` התעלם מ-state דינמי מדויק כאשר ה-LRU החמיץ.

נוסה ניסוי זמני של checkpoints חיוביים נוספים כל 1024 gates עד 40960. הוא הוסיף 280 source bytes, שיפר EXT-004 לכ-2,329.7 ms ו-EXT-001 לכ-5,896.7 ms, בלי שינוי output. הוא **נדחה**: הוא רק מזיז את ה-cliff לטווח רחוק יותר ואינו פותר את הבעיה הכללית. לא נוסף generated checkpoint artifact.

## 7. Cache

`gateDistanceCache` ו-`dynamicGatePositions` נשארו bounded ל-4096. ה-result cache נשאר bounded ל-1024. האופטימיזציה מוסיפה שני BigInts בלבד (`gateTraversalCursorIndex` ו-`gateTraversalCursorPosition`).

Same-case second run הוא result-cache hit והופך לעשרות מיקרו-שניות. לאחר EXT-004, targets סמוכים שנמדדו הסתיימו בכ-0.008–0.032 ms, כלומר calculation-state/year locality אכן מנוצלת. אין צורך לשמור כל שנה לנצח.

במדידת 1,200 lookups ייחודיים לאחר explicit GC: heap delta ירד מ-529,672 ל-488,456 bytes; בשני המימושים היו 1,024 entries. זו מדידה מקומית ורועשת, ולכן המסקנה המצומצמת היא **לא נצפתה memory regression**; אין טענה לשיפור זיכרון מובהק.

## 8. Optimizations שנוסו

| Candidate | Result | Correctness | Performance | Accepted? |
|---|---|---|---|---|
| adjacent dynamic-cache reuse only | improved sequential scans but failed six-gate year-step locality | unchanged in checked cases | not a complete general fix | NO |
| single exact bounded gate cursor | removes restart/thrash generally | exact recurrence preserved and tested | see text | YES |
| denser static checkpoints | improved measured cases but merely moved finite cliff | unchanged in experiment | not a complete general fix | NO |
| unbounded gate/year cache | not implemented | not relevant | not a complete general fix | NO |
| equivalent combinatorial unranking rewrite | not attempted; residual cost is secondary and equivalence risk is nontrivial | not established | not a complete general fix | NO |

ה-adjacent-cache reuse לבדו נדחה משום ש-year stepping יכול לבקש קפיצה של 6 gates (`MIN_YEAR_GAPS`), ואז נקודת `index±1` אינה קיימת ב-LRU והקוד הישן חוזר אל ה-static checkpoint. ה-cursor הכללי פותר גם קפיצות קצרות כאלה.

## 9. Before/after

| ID | Before | After median | Speedup lower bound | Work after |
|---|---:|---:|---:|---:|
| EXT-001 | >600 s (timeout) | 7.425 s | >80.8× | 5,779 gateDistance misses |
| EXT-002 | >600 s (timeout) | 4.956 s | >121.1× | 5,125 gateDistance misses |
| EXT-003 | >600 s (timeout) | 11.534 s | >52.0× | 5,328 gateDistance misses |
| EXT-004 | >600 s (timeout) | 4.007 s | >149.7× | 4,372 gateDistance misses |
| EXT-005 | >600 s (timeout) | 4.271 s | >140.5× | 5,054 gateDistance misses |
| EXT-006 | >600 s (timeout) | 4.516 s | >132.9× | 5,060 gateDistance misses |
| EXT-007 | >600 s (timeout) | 7.360 s | >81.5× | 4,873 gateDistance misses |
| EXT-008 | >600 s (timeout) | 7.512 s | >79.9× | 4,493 gateDistance misses |
| EXT-009 | >600 s (timeout) | 8.877 s | >67.6× | 5,103 gateDistance misses |
| EXT-010 | >600 s (timeout) | 5.607 s | >107.0× | 4,650 gateDistance misses |
| EXT-011 | >600 s (timeout) | 7.017 s | >85.5× | 5,677 gateDistance misses |

במקרה המייצג של ה-path הישן נמדדו >8,395,657 `gateDistance` calls עוד לפני target, לעומת ~4.4k–5.8k work units לאחר השינוי. לכן עיקר ההוכחה הוא צמצום העבודה האלגוריתמית, לא noise של runner.

## 10. Common-case impact

הטבלה הבאה היא מן החקירה המקורית לפני ה-rebase. ה-sentinel המלא על הבסיס המצורף נעצר ב-local cap של 300 s ולכן אין כאן הצגה כוזבת של benchmark חדש.

| Scenario | Before | After | n |
|---|---:|---:|---:|
| current | 3,086.795 ms | 1,906.734 ms | 3 |
| +1 year | 2,045.581 ms | 1,886.657 ms | 3 |
| -1 year | 2,327.806 ms | 2,022.433 ms | 3 |
| +100 years | 8,615.713 ms | 4,280.843 ms | 1 |
| -100 years | 2,019.032 ms | 1,601.236 ms | 1 |
| +1000 years | 4,145.250 ms | 4,207.836 ms | 1 |
| -1000 years | 5,496.460 ms | 5,188.627 ms | 1 |
| cached identical lookup x10000 | 21.069 ms | 7.819 ms | 1 |

לא נצפתה נסיגה מהותית ב-common cases. במדגם יחיד של +1000 years התקבלה האטה של כ-1.5%; במדגם יחיד ורועש כזה אין בסיס לייחס אותה לשינוי, ובוודאי לא מדובר ב-regression של פי-2. שאר הדגימות היו דומות או מהירות יותר.

## 11. Memory/startup impact

* Cache capacities: ללא שינוי.
* State חדש: שני BigInts בלבד לכל module instance.
* Source: +732 bytes; gzip -9: +133 bytes.
* Startup import median, n=7: 2.8251 ms לפני, 2.5079 ms אחרי; לא נצפתה startup regression.
* 1,200 unique lookups: לא נצפתה retained-heap regression; result cache נשאר 1024 entries.

## 12. Correctness

ב-rebase הנוכחי הורץ מחדש ה-test המבני החדש (5/5 PASS) ו-EXT-004 דרך תשתית diagnostics הקיימת. שאר טענות ה-authoritative בסעיף זה מקורן בחקירה הראשונית ומסומנות בהתאם.

נבדקו ישירות מול authoritative: EXT-001, EXT-002 ו-EXT-004 — התאמה מלאה של כל חמשת שדות הפלט. EXT-003 והמשך ה-authoritative הרחב לא הסתיימו בתקציב מעשי בסביבה המקומית; איני מסמן אותם כ-PASS שלא נמדד.

בדיקות שעברו:

* `node --test test/extreme-performance.test.js` — 5 PASS, 0 FAIL.
* focused suite: 9 PASS, 0 FAIL, 1 optional SKIP.
* `PASTAFARI_CHECKPOINT_SIDES=1 node --test test/checkpoint-compatibility.test.js` — subtest הצדדים עבר; שני optional subtests האחרים skipped כמצופה.
* כל 11 cases נתנו פלט fast יציב בין cold/warm לאחר השינוי; לא נמצא output change.

`test/fast-compatibility.test.js` המלא לא הסתיים בתוך 300 שניות בסביבת החקירה המוגבלת בגלל צד ה-authoritative. לכן **אין** כאן claim שה-suite המלא עבר מקומית. שינוי ה-production עצמו אינו מחליף אף primitive או recurrence; בנוסף, regression test בודק work-count משני צדי ה-checkpoints ותוצאה authoritative-validated של EXT-004.

## 13. Remaining timeouts

מבין 11 מקרי ה-timeout הידועים: **0 נשארו timeout** לאחר השינוי בריצות שנמדדו. אין להסיק מכך שכל תאריך אפשרי נעשה מהיר. מעבר gates מדויק נשאר בקירוב ליניארי במרחק מנקודת ההתחלה המדויקת הטובה ביותר. תאריכים רחוקים עוד יותר יכולים לכן להישאר יקרים באופן מובנה; השינוי מסיר recomputation פתולוגי, לא את עלות ה-recurrence עצמה.

## 14. Regression protection

נוסף `test/extreme-performance.test.js`. הוא אינו נשען על wall-clock threshold:

* מוודא 11 IDs/inputs היסטוריים יציבים;
* עובר 4,300 gates — במפורש מעבר ל-LRU 4096 — ודורש work bounded ל-4,300;
* בודק אותו invariant גם בצד השלילי;
* בודק jump של 6 gates כדי למנוע חזרה לבאג ה-adjacent-only;
* בודק את הפלט המלא של EXT-004 מול תוצאה שאומתה ב-authoritative;
* בודק שה-soak harness מפסיק את ה-Worker לאחר timeout סופי.

מכיוון ש-`npm test` מריץ `test/*.test.js`, ה-test המבני נכנס ל-Regular CI בלי להפוך את 11 המקרים הכבדים ל-merge-blocking timing tests.

## 15. קבצים ששונו ב-rebase הנוכחי

* `browser/pastafari-calendar-fast.js`
* `docs/engine/pastafari-calendar-fast.js`
* `scripts/soak-fast-engine.mjs`
* `docs/DIAGNOSTICS.md`
* `verification/extreme-performance-cases.json`
* `verification/evidence/extreme-performance-analysis-2026-08-19.json`
* `scripts/diagnose-extreme-performance.mjs`
* `test/extreme-performance.test.js`
* `docs/EXTREME-PERFORMANCE-ANALYSIS.md`
* `docs/SHA256SUMS.txt`
* `SHA256SUMS.txt`

לא שונו: workflows, benchmark/memory tooling, UI, i18n, sauce, gates definition, partition ordering, month interleaving definition, naming, astronomical day, supported domain או precision. קובצי ה-Standalone נשמרו byte-for-byte מהבסיס המצורף בגלל ה-drift הקודם והמגבלה המתועדת לעיל.

## 16. פקודות שהורצו

| Command | Result |
|---|---|
| `node --test test/extreme-performance.test.js` | PASS — 5 pass, 0 fail; 24.8 s |
| `node scripts/diagnose-extreme-performance.mjs --case EXT-004 --mode=summary --json` | PASS — production diagnostics; 4,375 recurrence steps, 4,369 cursor starts |
| `node --expose-gc scripts/run-performance-regression.mjs ...` | LOCAL_TIMEOUT — ה-baseline המצורף לא השלים את ה-sentinel בתוך 300 s; אין claim של PASS |
| combined focused suite with diagnostics/year tests | LOCAL_TIMEOUT — לא מסומן PASS |
| `npm ci` / `npm run build:standalone` | NOT RUN TO COMPLETION — `esbuild 0.28.2` הנעול אינו זמין בסביבה; אין החלפה לגרסה אחרת |

המדידות והבדיקות מן החקירה הראשונית נשארות ראיה היסטורית תקפה ל-root cause ול-before/after, אך אינן מוצגות כאילו הורצו מחדש על הארכיון המצורף. בפרט: direct authoritative match ל-EXT-001/002/004, ה-profiles, checkpoint-density experiment ומדידות n=2 של כל 11 המקרים שייכים לריצת החקירה המקורית.

Reproduction ממוקד על הגרסה הנוכחית:

```bash
node scripts/diagnose-extreme-performance.mjs --case EXT-004 --mode=summary --json
node scripts/diagnose-extreme-performance.mjs --case EXT-003 --mode=disabled --json
node --test test/extreme-performance.test.js
```

ה-fixtures נמצאים במקום יחיד: `verification/extreme-performance-cases.json`.

## 17. מסקנה

* 11/11: poor dynamic path selection / cache thrash / duplicate exact computation (C+D+E).
* 0/11: הוכחו כ-timeout שנובע בעיקר מ-year-distance מובנה (A).
* 0/11: הוכחו כ-single pathological year שהיה root cause של ה-timeout (B); עם זאת year construction הוא residual secondary cost בחלק מהמקרים.
* 11/11: שופרו; 0/11 timeout ידוע נשאר במדידות after.
* 1 ממצא tooling נפרד (F): final timed-out Worker לא נוקה; תוקן בנפרד.
* האופטימיזציה המקובלת היא כללית, bounded ומשמרת recurrence; היא אינה special-case של 11 התאריכים ואינה מוסיפה oracle data.

המסקנה המרכזית: ה-timeouts ההיסטוריים לא חשפו צורך לשנות את האלגוריתם הפסטפרי. הם חשפו implementation pathology: ברגע שחלון ה-gates עבר את 4,096 entries, ה-LRU גרם למסלול הקיים לחשב מחדש את אותו prefix שוב ושוב. שמירת cursor מדויק יחיד מחזירה את העבודה למסלול ליניארי במרחק ה-gate, בלי לשנות אפילו שדה פלט אחד.

### מגבלות ההוכחה

הטענה על 11 המקרים מבוססת על ה-inputs ההיסטוריים המדויקים, work counters, ריצות cold/warm, profiling ונקודות authoritative שניתן היה להשלים. ה-suite authoritative המלא לא הסתיים בתקציב המקומי, ולכן אין claim רחב מעבר למה שנבדק. Timing הוא evidence משני; work-count הוא הראיה המרכזית לסיבוכיות.
