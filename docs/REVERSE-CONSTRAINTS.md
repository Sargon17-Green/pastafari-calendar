# Pastafari reverse constraint solving

## שני מסלולים נפרדים

ה־reverse הקיים פותר עובדה אחת מן הצורה `F(c,t)=P`. כאשר `c` הוא תאריך פסטפרי, הוא רשאי לפתור אותו רקורסיבית כל עוד שרשרת ההפניות אציקלית. `SAME_AS_TARGET` הוא החריג המכוון עבור `c=t`, והוא משתמש בחיפוש אלכסוני חסום.

ה־API הישן נשאר ללא שינוי. בפרט, `ERR_UNSUPPORTED_CALCULATION_CYCLE` עדיין תקין כאשר `findPastafariDate()` מקבל שרשרת רקורסיבית מחזורית. השגיאה אינה אומרת שלמערכת אין פתרון מתמטי; היא אומרת שה־API הרקורסיבי של עובדה יחידה אינו solver למערכת אילוצים.

למערכת של כמה עובדות וקשרים יש להשתמש ב־`solvePastafariConstraints()` מן החבילה הראשית או מ־`pastafari-calendar/constraints`.

## מודל הבעיה

כל משתנה מייצג יום מוחלט, כלומר JDN. תחום יכול להיות נקודה יחידה או טווח סופי:

```js
const problem = {
  variables: {
    A: { range: [2461250n, 2461300n] },
    B: { range: [2461250n, 2461300n] },
  },
  constraints: [
    {
      type: "pastafari",
      target: "A",
      calculation: "B",
      date: pastafariA,
    },
    {
      type: "pastafari",
      target: "B",
      calculation: "A",
      date: pastafariB,
    },
  ],
};

const result = await solvePastafariConstraints(problem, {
  timeoutMs: 30_000,
  signal: abortController.signal,
  onProgress: (progress) => console.log(progress),
});
```

אילוצים נתמכים:

- `{ type: "pastafari", target, calculation, date }` עבור `F(calculation,target)=date`;
- `calculation: SAME_AS_TARGET` עבור `c=t`;
- `{ type: "pastafari", target, calculationJdn, date }` לעוגן מוחלט;
- `{ type: "equal", left, right }`;
- `{ type: "order", left, op, right }`, כאשר `op` הוא `<`, `<=`, `>` או `>=`;
- `{ type: "difference", left, right, equals }` עבור `left-right=equals`;
- `{ type: "difference", left, right, min, max }` עבור הפרש חסום.

`variables.X.jdn` מקבע משתנה ליום יחיד. `variables.X.range` מקבל `[start,end]` או `{start,end}`. גבולות יכולים להיות JDN או תאריך גריגוריאני נתמך ב־API זה.

## מחזורים ותחומים

ה־solver בונה גרף תלות מאילוצי Pastafari ומחשב strongly connected components. רכיב אציקלי מנצל ככל האפשר את `findPastafariDate()` הקיים לאחר שיום המעשה נהיה ידוע.

ברכיב מחזורי לא מבוצע חיפוש קרטזי של כל `(c,t)`. במקום זאת נבחר תחום סופי של משתנה המשמש יום מעשה; לכל `c` בתחום מופעל reverse חד־ממדי קיים, והתוצאות מייצרות יחס תמיכה `(c,t)`. היחס נחתך מול תחומי המשתנים ושאר האילוצים. קצוות נוספים ברכיב נסרקים רק לאחר הצמצום שנוצר עד אותה נקודה.

אם מחזור אינו מקבל תחום סופי, נקודה קבועה או עוגן אחר שמצטמצם לתחום סופי, ה־solver מחזיר `ERR_CONSTRAINT_RANGE_REQUIRED`. הוא אינו מתחיל חיפוש בלתי־מוגבל.

`SAME_AS_TARGET` אינו מומר לחיפוש כללי: ה־solver מעביר אותו למסלול האלכסוני הקיים, ולכן מרחב של `N` ימים נשאר `N` בדיקות ולא `N²`.

## אימות ו־completeness

כל השמה שמוחזרת ב־`solutions` היא פתרון **מאומת**. לפני החזרה ה־solver מפעיל מחדש את `PastafariCalendar.convertJdn(target,{calculationJdn})` עבור כל אילוץ Pastafari ומשווה את כל חמשת השדות. יחסי התמיכה וה־reverse החד־ממדי הם אמצעי pruning בלבד ואינם סמכות סופית.

מבנה התוצאה:

```js
{
  solutions: [
    {
      A: { jdn: 2461266n, gregorian: GregorianDate(...) },
      B: { jdn: 2461278n, gregorian: GregorianDate(...) },
    },
  ],
  complete: true,
  termination: "complete",
  scanned: 12n,
  candidates: 1n,
  verified: 1n,
  stats: {
    reverseCalls: 11n,
    forwardVerifications: 2n,
    pruned: 3n,
    cyclicComponents: 1,
    relationPairs: 4n,
  },
}
```

`candidates` הוא מספר ההשמות המלאות שהגיעו לשלב האימות הסופי; `verified` הוא מספר ההשמות שעברו את כל אימותי ה-forward ונכנסו ל־`solutions`. לכן מועמד שנפסל באימות נספר בראשון ולא בשני.

`complete: true` פירושו שכל התחומים הסופיים שנדרשו נסרקו וכל ההשמות האפשריות שנותרו נבדקו. `complete: false` פירושו שהחיפוש הופסק לפני הוכחת שלמות, למשל בגלל `maxSolutions` או `maxScanned`. פתרונות שכבר הוחזרו עדיין עברו forward verification מלא.

`termination` הוא אחד מ־`complete`, `max-solutions`, `max-scanned`.

## cancellation, timeout ו־progress

ה־API הציבורי משתמש ב־Worker באותו דפוס של reverse הרגיל, עם fallback ישיר כאשר `Worker` אינו זמין. `signal`, `timeoutMs` ו־`onProgress` אינם משנים את `findPastafariDate()` הקיים.

אירוע progress של ה־solver מכיל:

```js
{
  scanned: 17n,
  total: null,
  matches: 1,
  phase: "reverse" | "verify" | "done",
  complete: false,
}
```

`scanned` מונוטוני. `complete` נהיה `true` רק באירוע `done` כאשר החיפוש הוכח כממצה. `total` הוא `null`, מפני שאחרי propagation אי אפשר בדרך כלל לדעת מראש את מספר פעולות העבודה הכולל בלי לבצע את החיפוש עצמו.

## מגבלת ביצועים מכוונת

ה־solver אינו CSP/SAT כללי. הוא ממוקד במבנה `F(c,t)=P` ומשתמש ב־reverse החד־ממדי כדי להימנע מן המכפלה הקרטזית הטריוויאלית. אם תחום יום המעשה עצמו עצום ואין אילוץ שמצמצם אותו, עדיין ייתכן צורך במספר גדול של קריאות reverse לינאריות בגודל התחום. ניתן להגביל עבודה באמצעות `maxScanned`, timeout או cancellation; במקרה כזה `complete` יהיה `false`.
