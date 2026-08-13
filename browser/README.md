# רכיב תאריך פסטפרי לדפדפן

התיקייה `browser` מכילה רכיב Web עצמאי להצגת תאריך פסטפרי בדפדפן, API אסינכרוני לשימוש ללא תצוגה ומנוע הפוך מתאריך פסטפרי לתאריך גריגוריאני.

הרכיב מפעיל שני מנועים:

- **המנוע הראשי** — המימוש המלא והקובע;
- **המנוע המהיר** — מימוש עצמאי ויעיל יותר, שנעשה בו שימוש רק לאחר השוואה למנוע הראשי עבור יום המעשה הרלוונטי.

התוצאה כוללת תמיד חמישה שדות, בסדר הבא:

```text
year, cutletName, dayInCutlet, monthName, dayInMonth
```

## שתי גרסאות הפצה

### Standard ES-module build — עבור HTTP/HTTPS

זו הגרסה הרגילה. יש להשאיר את כל הקבצים הבאים יחד באותה תיקייה ובשמות המדויקים שלהם:

```text
browser/
├── README.md
├── UPLOAD-TO-GITHUB.md
├── example.html
├── example_weekly_colored.html
├── pastafari-date.js
├── pastafari-calendar-router.js
├── pastafari-calendar-router-core.js
├── pastafari-engine-client.js
├── pastafari-authoritative-worker.js
├── pastafari-fast-worker.js
├── pastafari-calendar-fast.js
├── pastafari-reverse.js
├── pastafari-reverse-worker.js
├── pastafari-calendar-core.js
├── pastafari-calendar-core-chronicle.js
├── pastafari-calendar-core-1.js
├── pastafari-calendar-core-2.js
└── year-ceiling-detour.js
```

`pastafari-calendar-core.js` הוא קובץ מקשר: תחילה הוא מחבר את מעקף תקרת השנה המתועד, ואז מעביר לליבת הכרוניקה האטומה שב־`pastafari-calendar-core-chronicle.js`. קובץ הכרוניקה ממשיך לקשר לשני חלקי הליבה. אין ליישר, לאחד או לשנות את שמות ארבעת קובצי השרשרת; המעקף הוא הדרך המכוונת להחסיר את שלושת הימים מן התקרה הישנה.

יש להגיש גרסה זו באמצעות HTTP או HTTPS. היא נשארת גרסת ES-module ואינה מיועדת לפתיחה ישירה מ־`file://`.

כאשר תיקיית `browser` מוגשת מן האתר עצמו:

```html
<script type="module" src="/browser/pastafari-date.js"></script>
<pastafari-date></pastafari-date>
```

### Standalone classic-script build — גם עבור file://

התיקייה `browser/standalone` מכילה target הפצה נפרד:

```text
browser/standalone/
├── pastafari-date.js
├── pastafari-date.min.js
├── README.md
└── example-file.html
```

לשימוש במסמך מקומי די להעתיק את קובץ ה־HTML וקובץ JavaScript אחד — רגיל או ממוזער — לאותה תיקייה:

```html
<pastafari-date></pastafari-date>
<script src="./pastafari-date.js"></script>
```

אין להוסיף `type="module"`. ה־Standalone כולל בתוך הקובץ היחיד את הרכיב, הנתב, המנוע הראשי, המנוע המהיר ושני Workers קלאסיים מבוססי Blob. הוא אינו טוען קובצי קוד נוספים, אינו מבצע `fetch()` ואינו זקוק לרשת, לשרת, ל־localhost או ל־origin של HTTP.

נדרשת תמיכה בדפדפן מודרני ב־Web Workers קלאסיים, `Blob` וב־`URL.createObjectURL`. אין ב־Standalone fallback לחישוב בשרשור הראשי אם היכולות האלה חסרות או חסומות.

אותו קובץ Standalone מתאים גם לאתר רגיל. ב־JavaScript שאינו מודול, ה־API האסינכרוני זמין דרך `PastafariCalendarStandalone`, לדוגמה:

```js
const value = await PastafariCalendarStandalone.getPastafariDateAsync(
  "2026-08-06",
  "2026-08-06",
);
```

ה־Custom Element והחוזה שלו זהים בשתי הגרסאות: `date`, `calculation-date`, `no-editor`, `headless`, `value`, `ready`, `refresh()` והאירוע `pastafari-change`.

## הטמעה בסיסית

ברירת המחדל היא:

- תאריך היעד: היום המקומי במחשב המשתמש;
- יום המעשה: היום המקומי במחשב המשתמש;
- תצוגת לוח מלאה של הקציצה;
- טעינה הדרגתית של קציצות קודמות ובאות במהלך הגלילה.

## הטמעה מ־jsDelivr

אפשר לטעון גרסה מתויגת מן המאגר:

```html
<script type="module"
  src="https://cdn.jsdelivr.net/gh/bwtbdyqtmsprytgydym-cpu/pastafari-calendar@VERSION/browser/pastafari-date.js">
</script>
<pastafari-date></pastafari-date>
```

יש להחליף את `VERSION` בתגית גרסה קבועה, לדוגמה `v1.3.0`. בפרסום אמיתי עדיף תג קבוע על פני `@main`, כדי למנוע ערבוב בין קבצים מגרסאות שונות ומטמון שאינו אחיד.

לשימוש בגרסת Standalone מתוך אתר רגיל:

```html
<script src="https://cdn.jsdelivr.net/gh/bwtbdyqtmsprytgydym-cpu/pastafari-calendar@VERSION/browser/standalone/pastafari-date.min.js"></script>
<pastafari-date></pastafari-date>
```

טעינה מ־CDN אינה שימוש offline; עבור `file://` יש לשמור עותק מקומי של קובץ ה־Standalone.

בגרסה הרגילה הנתב מנסה להפעיל את המנועים בתוך Module Workers. כאשר הדפדפן או מדיניות האתר חוסמים Worker מן הכתובת שממנה נטען הרכיב, הנתב מנסה טעינה ישירה של אותם מודולים. במצב זה החישוב עדיין יכול לפעול, אך החישוב הכבד עלול להתבצע בשרשור הראשי. לביצועים הטובים והצפויים ביותר מומלץ להגיש את כל תיקיית `browser` מאותו origin של האתר.

## בחירת תאריך

ניתן להגדיר את תאריך היעד ואת יום המעשה באמצעות מאפיינים בפורמט `YYYY-MM-DD`:

```html
<pastafari-date
  date="2026-08-06"
  calculation-date="2026-08-06">
</pastafari-date>
```

שנים שליליות ושנים בעלות יותר מארבע ספרות נתמכות ב־API ובמאפיינים, כל עוד הכתיבה היא מספרית מלאה:

```html
<pastafari-date date="-0762-06-07"></pastafari-date>
```

כאשר אחד המאפיינים חסר או ריק, נעשה שימוש בתאריך המקומי הנוכחי.

## מצב ללא עורך תאריכים

התכונה `no-editor` מסתירה את הקישור לפתיחת חלון שינוי התאריך ויום המעשה. הלוח עצמו והגלילה נשארים פעילים:

```html
<pastafari-date no-editor></pastafari-date>
```

אפשר להוסיף או להסיר את התכונה גם בזמן ריצה:

```js
const calendar = document.querySelector("pastafari-date");
calendar.toggleAttribute("no-editor", true);
```

## מצב `headless`

התכונה `headless` מסתירה את הרכיב והופכת אותו למקור נתונים בלבד:

```html
<pastafari-date id="pc" headless></pastafari-date>
<script type="module">
  import "/browser/pastafari-date.js";

  const element = document.querySelector("#pc");
  const value = await element.ready;

  console.log(
    value.year,
    value.cutletName,
    value.dayInCutlet,
    value.monthName,
    value.dayInMonth,
  );
</script>
```

במצב זה הרכיב אינו מבקש תצוגת קציצה, אינו יוצר תאי ימים ואינו טוען קציצות סמוכות לצורכי התצוגה. הנתב רשאי עדיין לבצע ברקע את אימות המימוש המהיר מול המנוע הראשי.

`ready` הוא Promise של התוצאה המוצלחת הראשונה בלבד. לאחר שינוי מאפיינים יש להשתמש ב־`refresh()` או להאזין לאירוע `pastafari-change`.

## API אסינכרוני ללא רכיב

`pastafari-date.js` מייצא שתי פונקציות בעלות אותה התנהגות:

```js
import {
  getPastafariDate,
  getPastafariDateAsync,
} from "/browser/pastafari-date.js";
```

שתיהן אסינכרוניות וחייבים להפעיל אותן באמצעות `await`:

```js
const value = await getPastafariDateAsync(
  "2026-08-06",
  "2026-08-06",
);

console.log(value);
```

`getPastafariDate` נשמר כשם תאימות ישן, אך גם הוא מחזיר Promise:

```js
const value = await getPastafariDate("2026-08-06");
```

כל אחד משני הקלטים יכול להיות:

- מחרוזת ISO בפורמט `YYYY-MM-DD`;
- אובייקט `Date`;
- אובייקט בעל השדות `year`, `month`, `day`;
- `null`, ערך חסר או מחרוזת ריקה — לשימוש בתאריך המקומי הנוכחי.

דוגמה עם אובייקטים:

```js
const value = await getPastafariDateAsync(
  { year: 2026n, month: 8, day: 6 },
  new Date(),
);
```

מבנה התוצאה:

```js
{
  year: "5000",
  cutletName: "כליה",
  dayInCutlet: 306,
  monthName: "לשון",
  dayInMonth: 23,
}
```

האובייקט המוחזר מוקפא באמצעות `Object.freeze()`.

## API הפוך: מפסטפרי לגריגוריאני

ה־API ההפוך הוא מודול נפרד של גרסת ה־ES-module הרגילה ואינו נכלל בקובץ ה־Standalone היחיד. הדבר אינו משנה את ה־API של רכיב `<pastafari-date>`; מי שזקוק לחיפוש ההפוך צריך להגיש את קובצי הגרסה הרגילה דרך HTTP/HTTPS.

המודול `pastafari-reverse.js` מפעיל את החיפוש בתוך Worker נפרד, כדי שחיפוש ממושך לא יחסום את רכיב התצוגה:

```js
import {
  findPastafariDate,
  SAME_AS_TARGET,
} from "/browser/pastafari-reverse.js";

const candidates = await findPastafariDate(
  {
    year: "5000",
    cutletName: "כליה",
    dayInCutlet: 443,
    monthName: "לבונה",
    dayInMonth: 40,
  },
  {
    calculationDate: "2026-08-06",
    timeoutMs: 30_000,
  },
);
```

מבנה כל מועמד:

```js
{
  targetJdn: 2461396n,
  targetDate: { year: 2026n, month: 12, day: 21 },
  calculationJdn: 2461259n,
  calculationDate: { year: 2026n, month: 8, day: 6 },
}
```

`calculationDate` יכול להיות תאריך מוחלט נתמך, תאריך פסטפרי שנפתר רקורסיבית או `SAME_AS_TARGET`. האפשרות האחרונה דורשת טווח חסום:

```js
const candidates = await findPastafariDate(value, {
  calculationDate: SAME_AS_TARGET,
  searchRange: [2461200n, 2461300n],
  yieldEvery: 32,
  onProgress: ({ scanned, total, matches }) => {
    console.log(scanned, total, matches);
  },
  signal: abortController.signal,
});
```

אפשר ליצור לקוח עצמאי באמצעות `new PastafariReverseClient()` ולסגור אותו באמצעות `dispose()`. ברוב המקרים די בפונקציה המשותפת `findPastafariDate()`.

## הממשק התכנותי של הרכיב

### `element.value`

התוצאה האחרונה שהושלמה בהצלחה, או `null` לפני השלמת ההמרה הראשונה:

```js
const value = document.querySelector("pastafari-date").value;
```

### `element.ready`

Promise שנפתר בתוצאה המוצלחת הראשונה של מופע הרכיב. אם ההמרה הראשונה נכשלת, ה־Promise נדחה.

```js
const value = await document.querySelector("pastafari-date").ready;
```

### `element.refresh()`

מרענן במפורש את הרכיב לפי המאפיינים הנוכחיים ומחזיר Promise של התוצאה:

```js
const calendar = document.querySelector("pastafari-date");
calendar.setAttribute("date", "2026-08-07");
const value = await calendar.refresh();
```

שינוי `date`, `calculation-date` או `headless` ברכיב מחובר מפעיל רענון אוטומטי. שינוי `no-editor` משפיע רק על התצוגה ואינו מחשב מחדש את התאריך.

## אירוע שינוי

לאחר כל המרה מוצלחת הרכיב משגר אירוע `pastafari-change`. התוצאה נמצאת ב־`event.detail`:

```js
const calendar = document.querySelector("pastafari-date");

calendar.addEventListener("pastafari-change", (event) => {
  console.log(event.detail);
});
```

האירוע מופץ עם `bubbles: true` ו־`composed: true`, ולכן אפשר להאזין לו גם מחוץ ל־Shadow DOM.

## פעולת הנתב

`pastafari-calendar-router.js` מייצא:

```js
import {
  PastafariCalendarRouter,
  sharedPastafariRouter,
} from "/browser/pastafari-calendar-router.js";
```

ברוב המקרים יש להשתמש ב־`sharedPastafariRouter`, שהוא הנתב המשותף לרכיבים ול־API הציבורי.

עקרונות הפעולה:

1. ההמרה הראשונה עבור יום מעשה מסוים מתקבלת מן המנוע הראשי.
2. הנתב מפעיל אימות של המימוש המהיר מול המנוע הראשי.
3. מצב האימות נשמר בנפרד לכל יום מעשה.
4. לאחר אימות מוצלח, בקשות נוספות לאותו יום מעשה נשלחות למימוש המהיר.
5. במקרה של אי־התאמה או כשל במימוש המהיר, הנתב ממשיך עם המנוע הראשי בלבד.
6. בקשות מקבילות נשמרות נפרדות ואינן מקבלות תוצאה השייכת לבקשה אחרת.

המצב `verified` מתייחס לאימות הריצה שנעשה עבור יום המעשה הנוכחי: תוצאת העוגן ושלוש קציצות מלאות — הקודמת, הנוכחית והבאה — הושוו למנוע הראשי. הוא אינו טענה שכל התאריכים האפשריים הושוו בזמן הריצה. ההתאמה הרחבה יותר נבדקת בחבילת הבדיקות של הפרויקט.

### מצב הנתב

```js
console.log(sharedPastafariRouter.getStatus());
```

או עבור יום מעשה מסוים, כאשר הקלט הוא JDN מסוג `bigint`:

```js
console.log(sharedPastafariRouter.getStatus(calculationJdn));
```

מצבים אפשריים של יום מעשה:

```text
unverified
verifying
verified
authoritative-only
```

### הפעלה מחדש

ניקוי כל מצבי האימות והפעלת המנועים מחדש לפי הצורך:

```js
await sharedPastafariRouter.retry();
```

ניקוי מצב של יום מעשה מסוים בלבד:

```js
await sharedPastafariRouter.retry(calculationJdn);
```

### סגירה

בדפים או יישומים שמסירים לצמיתות את כל הרכיבים אפשר לסגור את ה־Workers:

```js
sharedPastafariRouter.dispose();
```

קריאה עתידית לאחר `dispose()` תוכל להפעיל מחדש את המנועים לפי הצורך.

## זמני המתנה ו־fallback

ברירת המחדל של הנתב כוללת:

- עד 45 שניות לטעינת מנוע;
- עד 90 שניות לבקשה רגילה;
- עד 240 שניות לאימות רחב או להפקת תצוגת קציצה במנוע הראשי.

בגרסת ה־ES-module הרגילה, כאשר Worker אינו זמין או אינו נטען, הנתב מנסה להפעיל את מודול המנוע ישירות. כשל במימוש המהיר אינו אמור למנוע שימוש במנוע הראשי. בגרסת ה־Standalone נדרשים Blob Workers ואין fallback לשרשור הראשי.

## Content Security Policy

בגרסת ה־ES-module הרגילה, לשימוש מאותו origin יש לאפשר טעינת מודולים ו־Workers מן האתר עצמו, למשל:

```text
script-src 'self';
worker-src 'self';
```

כאשר הקבצים הרגילים נטענים מ־CDN, יש להתאים גם את `script-src` ואת `worker-src` לכתובת ה־CDN. הגרסה הרגילה אינה יוצרת Blob Workers, ולכן אין צורך ב־`blob:` רק עבורה.

מדיניות CSP מסוימת או מגבלת same-origin של הדפדפן עשויות למנוע Worker חוצה־origin; במקרה כזה הנתב ינסה את מצב ה־fallback הישיר שתואר לעיל.

גרסת ה־Standalone מפעילה Workers קלאסיים מ־Blob הכלול בקובץ היחיד. באתר שמגדיר CSP יש לאפשר זאת במפורש:

```text
script-src 'self';
worker-src 'self' blob:;
```

אם `blob:` חסום, גרסת ה־Standalone אינה יכולה להפעיל את המנועים. במסמך `file://` רגיל ללא CSP אין צורך בהגדרה כלשהי.

## דף הדוגמה

דף הדוגמה של הגרסה הרגילה, `example.html`, דורש שרת מקומי או שרת אינטרנט:

```bash
python -m http.server 8000
```

ולפתוח בדפדפן:

```text
http://localhost:8000/browser/example.html
```

הדף מדגים:

- תצוגת ברירת־המחדל;
- גלילה בין קציצות;
- הצגה והסתרה של עורך התאריכים;
- שינוי תאריך היעד ויום המעשה;
- מצב `headless`;
- שימוש ב־`getPastafariDateAsync()`;
- האירוע `pastafari-change`;
- מצב הנתב והפעלת האימות מחדש.

את `standalone/example-file.html` אפשר לפתוח ישירות בלחיצה כפולה. הוא מדגים תאריך ברירת מחדל, תאריך יעד ויום מעשה מפורשים והאזנה ל־`pastafari-change`, בלי שרת ובלי רשת.

## בניית קובצי ה־Standalone ובדיקתם

שני קובצי ה־Standalone נוצרים מאותם מקורות באמצעות esbuild. אין לערוך אותם ידנית:

```bash
npm ci
npm run build:standalone
```

בדיקת הדפדפן מפעילה את הגרסה הרגילה ב־HTTP ואת שני קובצי ה־Standalone מתוך מסמך אמיתי ב־`file://`, מכניסה כל הקשר `file://` למצב offline ומשווה 25 זוגות תאריכים בכל חמשת השדות:

```bash
npx playwright install chromium firefox
npm run test:file-protocol
```

אפשר להגביל את ההרצה לדפדפן מסוים, לדוגמה:

```bash
npm run test:file-protocol -- --browser=chromium
```

## העלאה ל־GitHub

כאשר הקבצים התקבלו עם סיומת `.txt`, יש להסיר רק את סיומת `.txt` לפני ההעלאה. לדוגמה:

```text
pastafari-date.js.txt  →  pastafari-date.js
pastafari-fast-worker.js.txt  →  pastafari-fast-worker.js
```

אין לשנות שמות אחרים, ואין להעלות את קובצי JavaScript כשהסיומת הסופית שלהם נשארת `.txt`.

לאחר העלאת גרסה מלאה מומלץ ליצור תגית חדשה וקבועה ולהשתמש בה בכתובת ההטמעה, במקום להסתמך על `main`.
