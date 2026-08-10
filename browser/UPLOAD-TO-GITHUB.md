# העלאת הגרסה המתוקנת ל־GitHub

ההוראות האלה מיועדות להעלאת גרסת הדפדפן המלאה של הפרויקט. אין להעלות את קובצי ה־ZIP עצמם, ואין להשאיר בקובצי JavaScript את סיומת ההורדה הנוספת `.txt`.

## 1. הכנת הקבצים

בקבצים שהורדו כ־`.js.txt`, יש להסיר רק את הסיומת האחרונה:

```text
pastafari-date.js.txt  →  pastafari-date.js
```

יש לוודא שלא נוצרו שמות כגון:

```text
pastafari-date.js.txt.js
pastafari-date (1).js
pastafari-calendar-fast-CORRECTED.js
```

השמות בתיקיית `browser` חייבים להיות בדיוק:

```text
browser/
├── README.md
├── example.html
├── pastafari-authoritative-worker.js
├── pastafari-calendar-core-1.js
├── pastafari-calendar-core-2.js
├── pastafari-calendar-core.js
├── pastafari-calendar-fast.js
├── pastafari-calendar-router.js
├── pastafari-date.js
└── pastafari-fast-worker.js
```

כל עשרת הקבצים צריכים להיות באותה תיקייה. אין להעביר את קובצי ה־Worker או את חלקי הליבה לתיקיות משנה, מפני שנתיבי הייבוא יחסיים למיקום הזה.

## 2. העלאה דרך אתר GitHub

1. פתח את המאגר.
2. היכנס לתיקייה `browser`.
3. בחר `Add file` ולאחר מכן `Upload files`.
4. גרור את כל עשרת הקבצים מן התיקייה המקומית `browser`.
5. ודא שקבצים קיימים מסומנים להחלפה ושארבעת הקבצים החדשים מופיעים להוספה:

```text
pastafari-authoritative-worker.js
pastafari-calendar-fast.js
pastafari-calendar-router.js
pastafari-fast-worker.js
```

6. אשר את ה־commit.

אין קובץ בתיקייה שחורג ממגבלת ההעלאה הרגילה של GitHub. שני חלקי הליבה הגדולים הם בגודל של כ־15 MB כל אחד.

לאחר מכן יש להעלות לשורש המאגר את הקבצים המעודכנים הבאים, כאשר יימסרו בגרסתם הסופית:

```text
UPLOAD-TO-GITHUB.md
package.json
SHA256SUMS.txt
```

אם נוספה תיקיית `test`, יש להעלות גם אותה בשלמותה ובאותו מבנה.

אין צורך לשנות את `README.md` שבשורש המאגר במסגרת עדכון רכיב הדפדפן.

## 3. בדיקה לפני יצירת גרסה

לאחר ההעלאה, שכפל את המאגר מחדש לתיקייה נקייה או הורד ממנו ZIP חדש. אין לבדוק עותק מקומי ישן ששימש להכנת ההעלאה.

מתוך שורש העותק הנקי, הרץ:

```bash
for file in browser/*.js; do node --check "$file" || exit 1; done
sha256sum -c SHA256SUMS.txt
npm pack --dry-run
```

ב־PowerShell:

```powershell
Get-ChildItem .\browser\*.js | ForEach-Object {
    node --check $_.FullName
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
}

sha256sum -c SHA256SUMS.txt
npm pack --dry-run
```

`npm pack --dry-run` צריך להציג גם את תיקיית `browser`. אם היא אינה מופיעה, אין ליצור עדיין תגית גרסה.

## 4. בדיקה בדפדפן

אין לפתוח את `example.html` ישירות באמצעות `file://`. יש להגיש את הפרויקט דרך שרת HTTP מקומי.

לדוגמה:

```bash
python -m http.server 8000
```

ואז לפתוח:

```text
http://localhost:8000/browser/example.html
```

יש לבדוק לפחות:

- שהרכיב נרשם ומציג תאריך;
- שמעבר לתאריך אחר עובד;
- ששינוי יום המעשה עובד;
- שהגלילה טוענת קציצות קודמות ובאות;
- שמצב `headless` מחזיר תוצאה בלי לבנות לוח;
- שמצב הנתב מגיע ל־`verified`, או ממשיך לפעול כ־`authoritative-only` לאחר כשל מכוון של המנוע המהיר.

## 5. commit ותגית גרסה

יש ליצור את תגית הגרסה רק לאחר שכל הקבצים, הבדיקות והגיבובים נמצאים באותו commit.

הגרסה המיועדת לעדכון זה היא:

```text
v1.2.1
```

הערך ב־`package.json` צריך להיות ללא האות `v`:

```json
"version": "1.2.1"
```

אפשר ליצור את התגית דרך ממשק Releases של GitHub, כאשר ה־target הוא ה־commit שנבדק, או בשורת הפקודה:

```bash
git tag -a v1.2.1 -m "Pastafari Calendar browser component v1.2.1"
git push origin v1.2.1
```

אין להזיז תגית שכבר פורסמה אל commit אחר. אם נדרש תיקון לאחר הפרסום, יש ליצור גרסה חדשה, למשל `v1.2.1`.

## 6. הטמעה באמצעות jsDelivr

לאחר פרסום התגית:

```html
<script type="module"
  src="https://cdn.jsdelivr.net/gh/bwtbdyqtmsprytgydym-cpu/pastafari-calendar@v1.2.1/browser/pastafari-date.js">
</script>

<pastafari-date></pastafari-date>
```

עדיף להשתמש בתגית קבועה ולא ב־`@main`. שימוש ב־`@main` עלול להחזיר לזמן מה קבצים ממצבי מטמון שונים, ובפרויקט הזה ערבוב בין גרסאות של הנתב, ה־Workers והמנועים עלול למנוע את טעינת הרכיב.

בעת בדיקה ראשונית של commit שטרם תויג, אפשר להפנות זמנית ל־SHA המלא של ה־commit במקום ל־`main`.
