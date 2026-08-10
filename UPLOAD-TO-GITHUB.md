# העלאת הגרסה המתוקנת ל־GitHub

ההוראות האלה מיועדות להעלאת גרסה `1.3.0` של הפרויקט. אין להעלות את קובצי ה־ZIP עצמם, ואין להשאיר בקובצי JavaScript את סיומת ההורדה הנוספת `.txt`.

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
├── UPLOAD-TO-GITHUB.md
├── example.html
├── example_weekly_colored.html
├── pastafari-authoritative-worker.js
├── pastafari-calendar-core-1.js
├── pastafari-calendar-core-2.js
├── pastafari-calendar-core.js
├── pastafari-calendar-fast.js
├── pastafari-calendar-router.js
├── pastafari-date.js
├── pastafari-fast-worker.js
├── pastafari-reverse.js
└── pastafari-reverse-worker.js
```

כל ארבעה-עשר הקבצים צריכים להיות באותה תיקייה. אין להעביר את קובצי ה־Worker או את חלקי הליבה לתיקיות משנה, מפני שנתיבי הייבוא יחסיים למיקום הזה.

## 2. העלאה דרך אתר GitHub

1. פתח את המאגר.
2. היכנס לתיקייה `browser`.
3. בחר `Add file` ולאחר מכן `Upload files`.
4. גרור את כל ארבעה-עשר הקבצים מן התיקייה המקומית `browser`.
5. ודא שכל הקבצים מופיעים בנתיבים ובשמות המפורטים לעיל. קבצים שכבר קיימים במאגר צריכים להיות מוחלפים בגרסאות החדשות, וקבצים שאינם קיימים עדיין צריכים להתווסף.
6. אשר את ה־commit.

אין קובץ בתיקייה שחורג ממגבלת ההעלאה הרגילה של GitHub. שני חלקי הליבה הגדולים הם בגודל של כ־15 MB כל אחד.

בנוסף לתיקיית `browser`, יש להעלות את הקבצים והתיקיות המעודכנים של גרסה `1.3.0` במיקומם המקורי בפרויקט, ובכלל זה:

```text
.github/workflows/test.yml
src/public-api.js
test/public-api.test.js
test/fast-compatibility.test.js
test/router-fallback.test.js
test/reverse.test.js
LICENSE
package.json
UPLOAD-TO-GITHUB.md
SHA256SUMS.txt
```

אם מעלים תיקייה שלמה במקום קבצים בודדים, יש לשמור במדויק על מבנה התיקיות של הפרויקט.

אין לשנות שמות של קבצים, ואין להעביר קבצים בין תיקיות.

`SHA256SUMS.txt` צריך להיות הקובץ האחרון שמופק לאחר שכל יתר הקבצים הגיעו לנוסחם הסופי. שינוי כלשהו בקובץ לאחר יצירת `SHA256SUMS.txt`, אפילו הוספה או הסרה של ירידת שורה בסוף הקובץ, מחייב יצירה מחדש של קובץ הגיבובים.

## 3. בדיקה לפני יצירת גרסה

לאחר ההעלאה, שכפל את המאגר מחדש לתיקייה נקייה או הורד ממנו ZIP חדש. אין לבדוק עותק מקומי ישן ששימש להכנת ההעלאה.

מתוך שורש העותק הנקי, הרץ:

```bash
npm test
for file in browser/*.js; do node --check "$file" || exit 1; done
sha256sum -c SHA256SUMS.txt
npm pack --dry-run
```

ב־PowerShell:

```powershell
npm test
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Get-ChildItem .\browser\*.js | ForEach-Object {
    node --check $_.FullName
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
}

sha256sum -c SHA256SUMS.txt
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

npm pack --dry-run
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
```

כל הבדיקות צריכות להסתיים בהצלחה.

`sha256sum -c SHA256SUMS.txt` צריך לדווח שכל הקבצים תקינים.

`npm pack --dry-run` צריך להציג גם את תיקיית `browser`. אם היא אינה מופיעה, או אם אחת הבדיקות נכשלת, אין ליצור עדיין תגית גרסה.

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

מומלץ לבדוק גם את הדוגמה השבועית:

```text
http://localhost:8000/browser/example_weekly_colored.html
```

יש לבדוק לפחות:

* שהרכיב נרשם ומציג תאריך;
* שמעבר לתאריך אחר עובד;
* ששינוי יום המעשה עובד;
* שהגלילה טוענת קציצות קודמות ובאות;
* שמצב `headless` מחזיר תוצאה בלי לבנות לוח;
* שמצב הנתב מגיע ל־`verified`, או ממשיך לפעול כ־`authoritative-only` לאחר כשל מכוון של המנוע המהיר.

## 5. commit ותגית גרסה

יש ליצור את תגית הגרסה רק לאחר שכל הקבצים, הבדיקות והגיבובים נמצאים באותו commit.

הגרסה המיועדת לעדכון זה היא:

```text
v1.3.0
```

הערך ב־`package.json` צריך להיות ללא האות `v`:

```json
"version": "1.3.0"
```

אפשר ליצור את התגית דרך ממשק Releases של GitHub, כאשר ה־target הוא ה־commit שנבדק, או בשורת הפקודה:

```bash
git tag -a v1.3.0 -m "Pastafari Calendar v1.3.0"
git push origin v1.3.0
```

אין להזיז תגית שכבר פורסמה אל commit אחר. אם נדרש תיקון לאחר פרסום `v1.3.0`, יש ליצור גרסה חדשה, למשל:

```text
v1.3.1
```

## 6. הטמעה באמצעות jsDelivr

לאחר פרסום התגית:

```html
<script type="module"
  src="https://cdn.jsdelivr.net/gh/bwtbdyqtmsprytgydym-cpu/pastafari-calendar@v1.3.0/browser/pastafari-date.js">
</script>

<pastafari-date></pastafari-date>
```

עדיף להשתמש בתגית קבועה ולא ב־`@main`. שימוש ב־`@main` עלול להחזיר לזמן מה קבצים ממצבי מטמון שונים, ובפרויקט הזה ערבוב בין גרסאות של הנתב, ה־Workers והמנועים עלול למנוע את טעינת הרכיב.

בעת בדיקה ראשונית של commit שטרם תויג, אפשר להפנות זמנית ל־SHA המלא של ה־commit במקום ל־`main`.
