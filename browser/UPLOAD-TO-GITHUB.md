# העלאת תיקיית `browser` ל־GitHub

הקובץ הזה מתייחס לתיקיית `browser` של Pastafari Calendar בגרסה `1.2.1`.

אין להעלות את קובץ ה־ZIP עצמו. יש להעלות את הקבצים שבתיקייה תוך שמירה מדויקת על שמותיהם ועל מיקומם.

## הקבצים בתיקייה

תיקיית `browser` צריכה להכיל בדיוק את הקבצים הבאים:

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
└── pastafari-fast-worker.js
```

כל שנים-עשר הקבצים צריכים להישאר ישירות בתוך `browser`. אין להעביר את קובצי ה־Worker או את חלקי הליבה לתיקיות משנה, מפני שנתיבי הייבוא ביניהם יחסיים למיקום הזה.

## שמות הקבצים

אם קובצי JavaScript הורדו עם סיומת נוספת `.txt`, יש להסיר רק את הסיומת האחרונה.

לדוגמה:

```text
pastafari-date.js.txt  →  pastafari-date.js
```

אין ליצור שמות כגון:

```text
pastafari-date.js.txt.js
pastafari-date (1).js
pastafari-calendar-fast-CORRECTED.js
```

יש לשמור במדויק על שמות הקבצים המפורטים לעיל.

## העלאה דרך אתר GitHub

1. פתח את מאגר Pastafari Calendar ב־GitHub.
2. היכנס לתיקייה `browser`.
3. בחר `Add file` ולאחר מכן `Upload files`.
4. גרור את כל שנים-עשר הקבצים שבתיקיית `browser` המקומית.
5. ודא שכל הקבצים מופיעים בשמות הנכונים.
6. קבצים שכבר קיימים במאגר צריכים להיות מוחלפים בגרסאות החדשות.
7. קבצים שאינם קיימים עדיין צריכים להתווסף.
8. אשר את ה־commit.

אין קובץ בתיקייה שחורג ממגבלת ההעלאה הרגילה של GitHub. שני חלקי הליבה הגדולים הם בגודל של כ־15 MB כל אחד.

## אין להעלות רק את `browser`

גרסה `1.2.1` כוללת גם שינויים מחוץ לתיקיית `browser`.

בעת פרסום הגרסה המלאה יש להעלות גם את יתר הקבצים והתיקיות המעודכנים במיקומם המקורי בפרויקט, ובכלל זה:

```text
.github/workflows/test.yml
src/public-api.js
test/public-api.test.js
test/fast-compatibility.test.js
test/router-fallback.test.js
LICENSE
package.json
UPLOAD-TO-GITHUB.md
SHA256SUMS.txt
```

אין להעביר קבצים בין תיקיות ואין לשנות את שמותיהם.

## `SHA256SUMS.txt`

יש להפיק את `SHA256SUMS.txt` רק לאחר שכל יתר קובצי הפרויקט הגיעו לגרסתם הסופית.

שינוי כלשהו בקובץ לאחר יצירת `SHA256SUMS.txt` - אפילו הוספה או הסרה של ירידת שורה אחת בסוף קובץ - משנה את גיבוב SHA-256 שלו ומחייב יצירה מחדש של `SHA256SUMS.txt`.

לכן `SHA256SUMS.txt` צריך להיות הקובץ האחרון שמופק לפני הפרסום.

לאחר הפקתו יש לבדוק אותו מתוך שורש הפרויקט:

```bash
sha256sum -c SHA256SUMS.txt
```

כל הרשומות צריכות לדווח `OK`.

## בדיקות לפני הפרסום

לאחר העלאת כל הקבצים, יש לשכפל מחדש את המאגר לתיקייה נקייה או להוריד ממנו ZIP חדש. אין להסתמך לצורך הבדיקה הסופית על עותק מקומי ישן ששימש להכנת הקבצים.

מתוך שורש העותק הנקי יש להריץ:

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

`npm pack --dry-run` צריך לכלול גם את תיקיית `browser`.

אם אחת הבדיקות נכשלת, אין ליצור עדיין תגית גרסה.

## בדיקה בדפדפן

אין לפתוח את `example.html` ישירות באמצעות `file://`. יש להגיש את הפרויקט באמצעות שרת HTTP מקומי.

לדוגמה:

```bash
python -m http.server 8000
```

לאחר מכן ניתן לפתוח:

```text
http://localhost:8000/browser/example.html
```

וכן:

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

## גרסת הפרסום

הגרסה המיועדת לפרסום היא:

```text
v1.2.1
```

ב־`package.json` מספר הגרסה נכתב ללא `v`:

```json
"version": "1.2.1"
```

יש ליצור את תגית הגרסה רק לאחר שכל הקבצים, הבדיקות והגיבובים נמצאים באותו commit.

אפשר ליצור אותה דרך ממשק Releases של GitHub, כאשר ה־target הוא ה־commit שנבדק, או באמצעות:

```bash
git tag -a v1.2.1 -m "Pastafari Calendar v1.2.1"
git push origin v1.2.1
```

אין להזיז תגית שכבר פורסמה אל commit אחר.

אם לאחר פרסום `v1.2.1` נדרש תיקון נוסף, יש ליצור גרסה חדשה, למשל:

```text
v1.2.2
```

## שימוש באמצעות jsDelivr

לאחר פרסום `v1.2.1`, ניתן לטעון את רכיב הדפדפן באמצעות:

```html
<script type="module"
  src="https://cdn.jsdelivr.net/gh/bwtbdyqtmsprytgydym-cpu/pastafari-calendar@v1.2.1/browser/pastafari-date.js">
</script>

<pastafari-date></pastafari-date>
```

עדיף להשתמש בתגית גרסה קבועה ולא ב־`@main`.

שימוש ב־`@main` עלול להחזיר לזמן מה קבצים ממצבי מטמון שונים. ערבוב בין גרסאות שונות של הנתב, ה־Workers והמנועים עלול למנוע טעינה תקינה או לגרום להפעלת רכיבים שאינם תואמים זה לזה.

בעת בדיקה ראשונית של commit שטרם תויג, אפשר להפנות זמנית ל־SHA המלא של ה־commit במקום ל־`main`.
