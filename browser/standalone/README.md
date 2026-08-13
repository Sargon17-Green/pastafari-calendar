# רכיב Standalone לקובצי HTML מקומיים

הקבצים בתיקייה זו הם גרסת classic-script של `<pastafari-date>`. היא מיועדת גם למסמכי `file://` וגם לאתר רגיל, ופועלת ללא שרת וללא רשת.

## שימוש מקומי

יש להעתיק לתיקייה המקומית קובץ JavaScript יחיד בלבד:

- `pastafari-date.js`; או
- `pastafari-date.min.js` — אותו build בגרסה ממוזערת.

לאחר מכן אפשר ליצור לידו קובץ HTML כזה ולפתוח אותו בלחיצה כפולה:

```html
<!doctype html>
<html lang="he" dir="rtl">
<head>
  <meta charset="utf-8">
  <title>לוח פסטפרי</title>
</head>
<body>
  <pastafari-date></pastafari-date>
  <script src="./pastafari-date.js"></script>
</body>
</html>
```

אין להשתמש ב־`type="module"`. הקובץ אינו טוען קוד נוסף ואינו מבצע בקשות רשת. שני המנועים וה־Workers שלהם ארוזים בתוכו.

## תאריכים ו־API

המאפיינים וה־API של הרכיב זהים לגרסה הרגילה:

```html
<pastafari-date
  id="calendar"
  date="2026-08-06"
  calculation-date="2026-08-06"
  no-editor>
</pastafari-date>

<script src="./pastafari-date.js"></script>
<script>
  const calendar = document.querySelector("#calendar");

  calendar.addEventListener("pastafari-change", (event) => {
    console.log(event.detail);
  });

  calendar.ready.then(console.log);
</script>
```

נתמכים גם `headless`, המאפיין `value` והמתודה `refresh()`.

במקום exports של ES module, פונקציות ה־JavaScript זמינות ב־namespace גלובלי:

```js
const value = await PastafariCalendarStandalone.getPastafariDateAsync(
  "2026-08-06",
  "2026-08-06",
);
```

ה־namespace כולל גם את `getPastafariDate`, `PastafariDateElement`, `PastafariCalendarRouter` ו־`sharedPastafariRouter`.

ה־API ההפוך שב־`browser/pastafari-reverse.js` הוא מודול נפרד ואינו נכלל ב־Standalone. רכיב `<pastafari-date>` ושאר ה־API המתואר לעיל נשמרים במלואם.

## כיצד נשמרת סמכותיות החישוב

ה־Standalone מפעיל Worker קלאסי נפרד למנוע הראשי ו־Worker קלאסי נפרד למנוע המהיר. התוצאה הראשונה מתקבלת מן המנוע הראשי. רק לאחר שהנתב משווה את המנוע המהיר למנוע הראשי עבור העוגן ושלוש קציצות שלמות הוא משתמש במנוע המהיר לאותו יום מעשה. זו אותה לוגיקת נתב שמשמשת בגרסת ה־ES-module.

## מגבלה ידועה

נדרשת תמיכה ב־Web Workers קלאסיים, `Blob` ו־`URL.createObjectURL`, הקיימת בדפדפנים מודרניים. באתר שמגדיר Content Security Policy יש לאפשר Blob Workers, למשל:

```text
script-src 'self';
worker-src 'self' blob:;
```

הגבלה זו אינה רלוונטית למסמך מקומי רגיל שאין בו מדיניות CSP.

## דוגמה ובנייה מחדש

`example-file.html` הוא דף מקומי מוכן לפתיחה ישירה.

קובצי ה־JavaScript הם תוצרי build; אין לערוך אותם ידנית. מן שורש המאגר:

```bash
npm ci
npm run build:standalone
```

בדיקת `file://` האוטומטית מריצה את הקובץ הרגיל ואת הקובץ הממוזער, ודורשת את דפדפני Playwright המותקנים:

```bash
npx playwright install chromium firefox
npm run test:file-protocol
```
