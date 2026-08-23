# Update 8 — Stage 8A: Anti-cleanup / Anti-refactor audit

## 1. Revision

- Repository: `Sargon17-Green/pastafari-calendar`
- Branch: `main`
- Current audited commit: `8eadf7f6d91ed072763542ddc5c1dc193b1bd243`
- Package version: `1.3.0`
- Working tree: `N/A — remote GitHub commit snapshot`. האודיט בוצע ישירות מול commit של GitHub; ל־commit עצמו אין מצב uncommitted working tree.
- Production files changed during Stage 8A: **none**

ה־Stage-7 report הראשוני נשמר כראיה היסטורית, אך לצורך מצב הסיום נטענו גם `update-08-stage-07-router-fix-report.md` ו־`update-08-stage-07-final-revalidation-report.md/.json`, משום שה־final revalidation הוא זה שסגר את Stage 7.

## 2. Baseline

שלוש נקודות ההשוואה שנקבעו:

```text
pre-fix production commit = 2bc2d97bd5638b498014ed8c1c925fb735819a6b
Stage-5 production commit = 44d5e1d3818b400df0f7a36bf17216d04345add6
current main              = 8eadf7f6d91ed072763542ddc5c1dc193b1bd243
```

בוצעו שתי השוואות נפרדות:

```text
2bc2d97bd5638b498014ed8c1c925fb735819a6b -> 44d5e1d3818b400df0f7a36bf17216d04345add6
44d5e1d3818b400df0f7a36bf17216d04345add6 -> 8eadf7f6d91ed072763542ddc5c1dc193b1bd243
```

כך נמנעת טעות של ייחוס תיקון router מאוחר של Stage 7 לתיקון transactionality של Stage 5.

## 3. Production files changed since pre-fix

### Stage 5 עצמו

ארבעת קובצי ה־production ששונו בין pre-fix ל־Stage 5:

| File | Role | GitHub line stats | Classification |
|---|---|---:|---|
| `src/5efdcc3e6fb071cbaffdcb117507a169dd76.js` | Node authoritative generated loader | +1 / -1 | `REQUIRED_FIX` |
| `browser/pastafari-calendar-core-chronicle.js` | Browser authoritative generated-loader mirror | +1 / -1 | `REQUIRED_FIX` |
| `browser/standalone/pastafari-date.js` | Generated standalone | +1 / -1 | `GENERATED_PROPAGATION` |
| `browser/standalone/pastafari-date.min.js` | Generated minified standalone | +1 / -1 | `GENERATED_PROPAGATION` |

ספירת השורות מטעה כאן: אלה קבצים generated/גדולים שבהם GitHub רואה החלפת שורה שלמה. מבחינה לוגית נמצאו **שני אזורי תיקון ממוקדים** במקורות ה־authoritative loader, ולא rewrite רחב.

### Stage 5 -> current main

לאחר Stage 5 השתנו ב־production רק:

- `browser/pastafari-calendar-router-core.js` — תיקון Stage-7 ל־`ROUTER_IDLE_SHUTDOWN_INFLIGHT_AUTHORITATIVE`;
- `browser/standalone/pastafari-date.js` — propagation של תיקון router;
- `browser/standalone/pastafari-date.min.js` — propagation מיניפייד של אותו תיקון.

שני מקורות ה־transactionality של Stage 5:

```text
src/5efdcc3e6fb071cbaffdcb117507a169dd76.js
browser/pastafari-calendar-core-chronicle.js
```

**לא השתנו** בין Stage 5 ל־current main.

## 4. Per-file / per-hunk classification

### `src/5efdcc3e6fb071cbaffdcb117507a169dd76.js`

**Hunk A — Dynamic00 identity writer + public construct trap: `REQUIRED_FIX`.**

ה־diff שומר במפורש את:

```text
new WeakMap()
global identity counter
existing identity allocation
existing Reflect.construct success path
```

ומוסיף בלבד:

```text
__pastafariStage5IdentityTransactions
__pastafariStage5IdentityJournal
captured WeakMap.prototype.delete
per-construction frame { counter, journalStart }
```

ה־journal מקבל key רק כאשר נוצר mapping חדש בתוך transaction פעיל. Mapping קיים אינו נכנס ל־journal ולכן אינו מועמד למחיקה בעת rollback.

**Hunk B — Dynamic01 common executor shared arena: `REQUIRED_FIX`.**

התיקון מוסיף `try/catch` סביב ה־reservation/push הקיים. ב־failure מתבצע:

```text
arena.length = savedEntryLength
throw originalError
```

כאשר `savedEntryLength` הוא אותו entry-relative value שהיה קיים כבר במנגנון success cleanup. אין reset ל־0, אין reset ל־module startup, ואין hard-code של `12/24/27/33`.

### `browser/pastafari-calendar-core-chronicle.js`

שני אותם אזורים לוגיים קיימים כמראה של browser source-of-truth:

- identity transform — `REQUIRED_FIX`;
- arena failure compensation — `REQUIRED_FIX`.

לא נמצא implementation transaction חלופי.

### `browser/standalone/pastafari-date.js`

`GENERATED_PROPAGATION` בלבד. Stage 5 תיעד rebuild קנוני, ו־Stage 7 הוכיח מאוחר יותר שה־standalone הנוכחי ניתן לשחזור byte-for-byte עם `esbuild 0.28.2`.

### `browser/standalone/pastafari-date.min.js`

`GENERATED_PROPAGATION` בלבד. אין סימן לעריכה ידנית של transaction model שלישי.

### סיכום סיווגים

```text
REQUIRED_FIX          = found
GENERATED_PROPAGATION = found
UNRELATED_CHANGE      = none
ARCHITECTURAL_CLEANUP = none
UNCLEAR               = none
```

## 5. Shared invocation arena audit

התיקון עומד בדרישות anti-cleanup:

- ה־shared arena עצמו נשאר קיים;
- reservation/push machinery נשאר;
- success cleanup הישן נשאר;
- rollback הוא compensating בלבד;
- ownership boundary הוא entry-relative length שנשמר בכל invocation;
- nested invocation מקבל באופן טבעי boundary משלו;
- לא נבנתה מערכת arena חדשה;
- לא הוסרו detours או measurement machinery;
- לא נמצא cleanup ל־startup state;
- לא נמצאו קבועי cleanup מסוג `12/24/27/33`.

מסקנה: `STATE:generated:shared-invocation-arena` תוקן בתוך הארכיטקטורה הקיימת, לא באמצעות החלפתה.

## 6. Identity WeakMap / counter audit

ה־WeakMap המקורי וה־counter המקורי נשמרו. התוספת היא transaction ownership/journaling מקומית:

1. frame שומר counter בכניסה ו־`journalStart`;
2. allocation חדש בזמן transaction נרשם ב־journal;
3. failure מוחק רק keys שנוספו החל מ־`journalStart`;
4. ה־counter מוחזר לערך הכניסה של אותו frame;
5. preexisting mappings אינם נרשמים ולכן אינם נמחקים;
6. אין enumeration של WeakMap;
7. success ממשיך דרך אותו `Reflect.construct`.

לצורך המחיקה נלכד `WeakMap.prototype.delete`; אין מעבר למבנה identity חדש ואין שימוש ב־Map חלופי.

ה־patch מוסיף גם guard codes פנימיים `E8`–`EC` להתאמת source-transform מדויקת. אלה guard-ים פנימיים מאותו סוג של `E6/E7` שכבר היו במנגנון transform, ולא שינוי של exception contract המתועד של successful/failed public construction.

מסקנה: `STATE:generated:identity-map-and-counter` תוקן באמצעות compensation owner-scoped, לא redesign.

## 7. Non-target audit

לא נמצא production redesign באף אחד מן ה־non-targets שקבע Stage 4:

| Non-target | Finding |
|---|---|
| decoded combinatorial memo Maps | unchanged by Stage-5 production hunks |
| sauce LRU | unchanged |
| forward/backward gap memos | unchanged |
| `PastafariCalendar` per-instance caches | unchanged |
| cache-epoch transaction machinery | unchanged |
| runtime patch ownership ledger | not reused as generic transaction layer |
| installation registries / WeakSets | unchanged |
| prototype/function descriptors | no redesign |
| partial constructor-this publication | unchanged |

Artifacts/tests העוסקים ב־cache או runtime patching אינם production redesign.

### Runtime patch ledger

Stage 5 **לא** ניצל את ה־runtime-patch ownership ledger כ־generic transaction framework. במקום זאת:

- arena משתמש ב־entry length שכבר היה קיים;
- identity משתמש ב־journal/stack מקומיים ל־Dynamic00.

### Cache machinery

לא נמצא איחוד, ניקוי או redesign של cache transaction mechanisms במסגרת production Stage 5.

## 8. Generated propagation / source of truth

התמונה המבנית היא:

```text
Node generated loader
    \
     same narrow source transforms
    /
Browser authoritative loader
        |
        +-- canonical standalone rebuild
        +-- canonical minified standalone rebuild
```

אין ראיה ל:

```text
Node model A
browser model B
hand-edited standalone model C
```

להפך:

- Node ו־browser נושאים אותו transform ממוקד;
- Stage 5 תיעד standalone rebuild קנוני;
- Stage-7 final revalidation שחזר את ה־standalone הנוכחי byte-for-byte עם:
  - unminified: `f1adfc1f4e64d9fc7dcb591a7c5e852210e0d2de3ff3d2a08668a8c17ffbea2b`
  - minified: `7a2f60e304dfe1c8dc98d54fa894e337e9864648ff5b401a51e661e9f5290481`
- real Chromium parity היה `PASS`.

השינוי המאוחר ב־standalone נובע מתיקון router של Stage 7, לא משינוי transaction model.

## 9. Public API audit

שלושה surfaces מבניים זהים byte-for-byte בין pre-fix ל־current:

```text
package.json
  blob SHA = 50a5ce66e928034078a3554734cc7362092151dd

src/public-api.js
  blob SHA = a4bf89cea6000f15942b8d4c272ab9655416c2f0

types/5fd0767aaf5331241ec60f8540edf2a6.d.ts
  blob SHA = 9374f0e8b0935e2fed456843adff540401f738ac
```

לכן לא השתנו מבנית:

- package exports;
- documented entry points;
- public wrapper constructor;
- declared constructor/method signatures;
- declared public shapes.

Stage-7 final tarball consumer עדיין מצא **98 public exports**. תיקון ה־router המאוחר תועד אף הוא כ־`publicApiChanged: false`.

במסלול failure של Stage 5 ה־wrapper rethrows את **אותו exception object**. אין החלפת exception type/message של כשל construction רגיל.

## 10. Hidden cleanup audit

חיפוש ב־diff המהותי לא מצא:

```text
Map.clear()
unrelated array.clear/splice
broad cache invalidation
registry reset
prototype reset
global reinitialization
```

ה־truncations שנוספו הם רק:

- shared arena -> `savedEntryLength` של invocation שנכשל;
- identity journal החדש -> `journalStart` של frame הנוכחי.

כלומר cleanup הוא owner-scoped ולא broad cleanup.

## 11. Intentional spaghetti preservation / success path

לא נמצאו:

- deleted wrapper layers;
- removed detours;
- removed fossils;
- collapsed generated indirection;
- clean encapsulated replacement of shared state;
- constructor-framework rewrite;
- large generated rename/reorganization.

בפרט, ה־M6 transform detour הקיים נשמר, וגם ritual ה־temporary global `Function` proxy נשאר. Stage 5 **הוסיף** transform ממוקד אל תוך המנגנון המסובך הקיים במקום לנקות אותו.

ב־success path נשמרו:

```text
existing argument ritual
existing shared arena success cleanup
existing Reflect.construct
existing generated control flow
```

אין alternate “clean” success path ואין החלפת normative logic.

## 12. Blast-radius sanity

### Stage 5 production delta

```text
production files: 4
GitHub textual stats: +4 / -4
logical changed regions:
  - identity transaction injection
  - arena failure compensation
  - browser mirror
  - canonical standalone propagation/minification
```

המספר `+4/-4` אינו אומר שהתיקון בן ארבע שורות; הוא תוצאה של generated one-line files. עם זאת, בדיקת ה־patch עצמו מראה שהשינוי הלוגי ממוקד בשני defect families בלבד.

### Post-Stage-5 production delta

```text
production files: 3
GitHub textual stats: +27 / -11
reason: independent Stage-7 router lifecycle repair + standalone propagation
```

אין overlap מהותי עם transactionality source.

## 13. Blockers

```text
blockers = none
unexpected Stage-5 production changes = none
architectural cleanup hunks = none
```

## 14. Anti-refactor conclusion

התיקון של Stage 5 הוא **compensating/transactional patch בתוך הארכיטקטורה הקיימת**.

הוא אינו מחליף את shared arena, אינו מחליף את WeakMap identity subsystem, אינו מאפס state ל־startup, אינו מנקה cache/runtime-patch subsystems, אינו משנה public API, ואינו מסיר את שכבות ה־generated indirection/detours/fossils שנשמרו בכוונה.

לכן התשובה לשאלת Stage 8A היא **כן**: הבאג תוקן בלי “לנקות” או לעצב מחדש את הארכיטקטורה המסובכת בכוונה.

## 15. Result

```text
STAGE_8A_RESULT = ANTI_CLEANUP_AUDIT_PASS
READY_FOR_STAGE_8D_FROM_8A = yes
production files changed during Stage 8A: none
```

Stage 8A נעצר כאן. Stage 8D ו־Update 9 לא בוצעו.
