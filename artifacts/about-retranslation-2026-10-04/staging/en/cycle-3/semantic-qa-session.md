# Copilot CLI Session

> [!NOTE]
> - **Session ID:** `0c343a8b-bb07-402e-848f-919292792f96`  
> - **Started:** 10/4/2026, 2:40:04 AM  
> - **Duration:** 1m 20s  
> - **Exported:** 10/4/2026, 2:41:25 AM  

---

<sub>2s</sub>

### User


אתה מבקר סמנטי עצמאי. השווה ישירות בין שני מקורות העברית המלאים לבין התרגומים לשפת en-US (קוד מאגר en). אין להשתמש באנגלית או בתרגום ישן כציר ביניים.

מקורות עבריים מחייבים לביקורת:
- docs/about/content/he.html
- docs/about/monster/index.html

מועמדים לבדיקה:
- artifacts/about-retranslation-2026-10-04/staging/en/about.html
- artifacts/about-retranslation-2026-10-04/staging/en/monster.html

מותר לעיין ב-docs/i18n/locales/en.js כדי לאמת את הצורות המקומיות שכבר נקבעו לשמות הקציצות והחודשים ולמינוח הממשק. אין לשנות קבצים.

בדוק משפט מול משפט ורכיב מול רכיב: חסרים, תוספות, שינוי משמעות, היפוך יחס, מספר שגוי, נוסחה שגויה, הסתייגות מחקרית שנעלמה, בדיחה שהפכה לטענה אחרת, שינוי בטון, שינוי במי שעושה/חווה פעולה, מספור או גבול מתמטי שזזו, פרטי Foundation/Tablets, Year 5000, c/t, הגבול האסטרונומי, Seer והקאנון, וכל פרטי נספח הפינגווינים.

בדוק במיוחד את כל 64 השמות: זהות השם המתורגם צריכה להתאים לצורה שנקבעה בשפת היעד; ההסבר צריך לשמר את המשמעות המדויקת; "פלגורש" ו"כרשומב" הם רצפי הברות מומצאים; בגבול 4/9 הסטייה המותרת היא עד e/103 כולו; בגבול 3/5 הסטייה המוחלטת היא עד 1/367 כולו; והרחבת "טחול" חייבת לשמר את כל התנאים השרירותיים במדויק בלי להמציא לה הצדקה.

ודא גם שהחסרונות בסעיף "מעלות" נשארו חסרונות המשווקים בהתלהבות, ולא קיבלו הצדקה רצינית חדשה בתרגום.

דווח על כל פער סמנטי מהותי אחד בסעיף, הקשר את הבדיקה לקובץ ולמקום המדויק והצע תיקון. אם יש אפילו פער סמנטי מהותי, הכשל את הבדיקה. סיים בדיוק באחת משתי השורות:
SEMANTIC_QA_RESULT: PASS
או
SEMANTIC_QA_RESULT: FAIL


---

<sub>5s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/he.html.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/he.html

```
File too large to read at once (41.8 KB). Consider using the grep tool to search within the file, or view with view_range to read specific sections.
```


---

<sub>5s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/monster/index.html.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/monster/index.html

```
File too large to read at once (42.8 KB). Consider using the grep tool to search within the file, or view with view_range to read specific sections.
```


---

<sub>5s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/about-retranslation-2026-10-04/staging/en/about.html.**

/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/about-retranslation-2026-10-04/staging/en/about.html

```
File too large to read at once (34.7 KB). Consider using the grep tool to search within the file, or view with view_range to read specific sections.
```


---

<sub>5s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/about-retranslation-2026-10-04/staging/en/monster.html.**

/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/about-retranslation-2026-10-04/staging/en/monster.html

```
File too large to read at once (34.4 KB). Consider using the grep tool to search within the file, or view with view_range to read specific sections.
```


---

<sub>5s</sub>

### `rg`

**(meatball|month|Pastafari|Flying Spaghetti|Seer|Foundation|Tablets)**

"(meatball|month|Pastafari|Flying Spaghetti|Seer|Foundation|Tablets)" (docs/i18n/locales/en.js)

<details>
<summary>44 matches</summary>

```
[grep content: 42 matches across 1 file(s) under /home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales]

en.js (42 match(es)):
  9:     "meta.description": "A Pastafari calendar with date search and comparison.",
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "A local, deterministic Pastafari calendar.",
  12:     "app.title": "Pastafari Calendar",
  15:     "app.intro": "Find a day in any available calendar, then see its complete Pastafari date and the cutlet that contains it.",
  20:     "about.title": "About the Pastafari Calendar",
  21:     "about.metaDescription": "An explanation of the Pastafari Calendar: its two-day calculation, years, cutlets, woven months, day boundary, and advanced mechanics.",
  22:     "about.intro": "How the calendar represents days, years, cutlets, woven months, and the day of working.",
  36:     "search.intro": "Choose a calendar, enter a date, and select “Show date.” The current Pastafari day is filled in by default.",
  43:     "settings.intro": "The day of working is the calculation's point of departure. By default, the site uses the current Pastafari day determined for the active observer location.",
  46:     "settings.reset": "Reset to current Pastafari day",
  64:     "field.month": "Month",
  67:     "field.leapMonth": "Leap month",
  104:     "calendarHelp.chinese": "Enter the Gregorian year associated with the Chinese year, and mark “Leap month” only for the repeated month.",
  105:     "calendarHelp.hindu": "Enter the year and day in the old Hindu count and choose the month by name. The lunar form can also mark a leap month.",
  107:     "calendarHelp.bahai": "Choose the month by name or Ayyám-i-Há. The Tehran-equinox form supports the conventional Gregorian range 1844–3000.",
  130:     "year.context": "This structure is calculated for the day of working {actionDate}. Changing the day of working can rebuild the year's boundaries, cutlets, and months.",
  135:     "year.monthCountLabel": "Months",
  141:     "year.monthExplainer": "Months are woven independently of cutlets: a month is not a subdivision of a cutlet, and its days can appear in many separate runs across the year. A month's length is therefore its total number of assigned days, not necessarily one continuous span.",
  143:     "year.monthsSummary": "Months in this year ({count})",
  146:     "year.monthMeta": "Days: {length} · continuous runs: {runs} · first occurrence: day {first} · last: day {last}",
  152:     "date.aria": "Year {year} from the Creation of the World, day {dayInCutlet} in the cutlet {cutletName}, day {dayInMonth} in the month {monthName}",
  155:     "date.monthLine": "Day {dayInMonth} in the month {monthName}",
  159:     "guide.intro": "The site shows a complete Pastafari date for any day, accepts searches in many calendars, and can compare the effect of the day of working on desktop.",
  161:     "guide.1.body": "As soon as the link opens, the site determines the current Pastafari day for the active observer location and displays the cutlet containing it. The day boundary is the location-dependent lower meridian transit of Venus described in ASTRONOMICAL-DAY.md; it is not civil midnight. There is no registration, sign-in, or date sent to a calculation server.",
  165:     "guide.3.body": "Every tile has three fixed lines: year from the Creation of the World; the day number in the cutlet and its name; then the day in the month and its name. No single number represents the whole date. The month name determines the tile's color.",
  167:     "guide.4.body": "“Previous cutlet” and “Next cutlet” move to neighboring cutlets. Other day tiles are not buttons because clicking them has no action. “Back to today” resets both the search and the day of working to the current Pastafari day.",
  169:     "guide.5.body": "Open “Calculation and comparison options” below the search. There you can choose a calendar and enter another day of working. Further searches use it until you reset to the current Pastafari day. This advanced control remains available without crowding the normal view.",
  171:     "guide.6.body": "On desktop, enable comparison in the same area. Each row contains exactly the same target day; the first column uses the first day of working and the second uses the second. Today versus tomorrow is the default, making every changed Pastafari date easy to identify.",
  173:     "guide.7.body": "Below the cutlet view, the site shows the structure of the displayed year: its length and span, every cutlet and its length, and every month. Months also show their number of continuous runs and their first and last occurrence, making the year-wide weaving visible.",
  179:     "reverse.heading": "Find a day from its Pastafari date",
  180:     "reverse.intro": "Enter a complete Pastafari date and define its day of working. The search runs locally on this device.",
  184:     "reverse.basic.dateHeading": "Pastafari date to find",
  188:     "reverse.field.month": "Month",
  189:     "reverse.field.dayInMonth": "Day in month",
  195:     "reverse.basic.calculation.pastafari": "The day of working is itself Pastafari / depends on other dates",
  202:     "reverse.basic.toAdvancedHelp": "Recursive Pastafari calculation days are represented as variables and constraints so the chain can be extended without an artificial depth limit.",
  210:     "reverse.progress.reverse": "Resolving Pastafari relations",
  243:     "reverse.constraint.pastafari": "Pastafari date",
  275:     "reverse.error.pastafari": "Enter all five Pastafari date fields.",
  286:     months: Object.freeze({
  299:     foundationDay: "Foundation Day",
```

</details>


---

<sub>8s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/he.html.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/he.html

```
<!-- Hebrew semantic-master candidate, rebuilt for an external reader. -->
<div class="about-section about-lead" id="about-calendar">
  <p><strong>לוח השנה הפסטפרי</strong> הוא לוח־שנה לא אינטואיטיבי בעל מבנה חריג בכוונה: התאריך של יום אינו תלוי רק ביום שאותו רוצים לתאר, אלא גם ביום שממנו מבצעים את החישוב.</p>
  <p>יש בו שנים, קציצות וחודשים – אבל השנים אינן באורך קבוע, הקציצות והחודשים אינן אותה חלוקה, החודשים יכולים להיעלם ולחזור לאורך השנה, ואין בו שבועות קאנוניים.</p>
  <p>הדף הזה מיועד להסביר מהו הלוח, איך קוראים תאריך ומה המשמעות המעשית של המבנה שלו. פרטי המימוש המתמטיים והקריפטוגרפיים קיימים בתיעוד הטכני, אבל אינם תנאי להבנת הלוח.</p>
</div>

<section class="about-section" id="date-parts" data-toc-section data-toc-level="2">
  <h2>איך נראה תאריך פסטפרי?</h2>
  <p>לתאריך פסטפרי יש בדיוק חמישה חלקים:</p>
  <ol>
    <li><strong>שנה לבריאת העולם</strong>;</li>
    <li><strong>שם הקציצה</strong>;</li>
    <li><strong>היום בקציצה</strong>;</li>
    <li><strong>שם החודש</strong>;</li>
    <li><strong>היום בחודש</strong>.</li>
  </ol>
  <p>כלומר, תאריך מלא אומר באיזו שנה נמצא היום, באיזו קציצה הוא נמצא ומה מקומו בתוכה, ולאיזה חודש הוא שייך ומה מספר ההופעה שלו באותו חודש.</p>
  <p>יום המעשה, מיקום הצופה ופרטים טכניים אחרים יכולים להיות חיוניים כדי <em>לחשב</em> את התאריך, אבל אינם חלק שישי, שביעי או שמיני של התאריך עצמו.</p>
  <p>גם צורת התצוגה אינה משנה את מספר החלקים. אם האתר מדפיס את חמשת הנתונים בשלוש שורות, עדיין יש חמישה נתונים; שבירת שורה היא פעולה טיפוגרפית, לא הולדת שדה קלנדרי חדש.</p>
</section>

<section class="about-section" id="working-day" data-toc-section data-toc-level="2">
  <h2>למה אותו יום יכול לקבל תאריך אחר?</h2>
  <p>בכל חישוב יש שני ימים:</p>
  <ul>
    <li><strong>יום המעשה</strong> – היום שממנו מבצעים את החישוב;</li>
    <li><strong>היום הנשאל</strong> – היום שאת תאריכו רוצים לדעת.</li>
  </ul>
  <p>אם מסמנים את יום המעשה ב־<code>c</code> ואת היום הנשאל ב־<code>t</code>, התאריך הוא <code>F(c,t)</code>, ולא <code>F(t)</code>.</p>
  <p>לכן אותו יום כרונולוגי יכול לקבל ייצוג פסטפרי אחר כאשר משנים את יום המעשה. היום עצמו לא זז; רק התיאור הפסטפרי שלו משתנה.</p>
  <p>כאשר <code>c=t</code>, היום נמצא תמיד בשנת <strong>5000</strong>. שנת 5000 אינה תקופה היסטורית קבועה: היא נבנית מחדש ביחס ליום המעשה, ולכן גם ימים נוספים סביב יום המעשה יכולים להשתייך אליה.</p>
  <p>לדוגמה: אם יום מסוים הוא יום המעשה של עצמו, הוא בשנת 5000. אם למחרת מחשבים שוב כאשר המחר נעשה יום המעשה החדש, גם המחר נמצא בשנת 5000. אין כאן שתי טענות סותרות על אותה „שנה היסטורית”; בכל חישוב נבחרת שנת בסיס חדשה.</p>
  <p>שנים שמספרן גדול מ־5000 נמצאות בכיוון העתיד ביחס ליום המעשה, ושנים שמספרן קטן מ־5000 נמצאות בכיוון העבר. קיימת גם שנת 0, ואחריה שנים בעלות מספר שלילי.</p>
</section>

<section class="about-section" id="year-structure" data-toc-section data-toc-level="2">
  <h2>איך בנויה שנה?</h2>
  <p>שנה פסטפרית יכולה להכיל בין <strong>252</strong> ל־<strong>5,778</strong> ימים. שני הקצוות כלולים: שנה בת 252 ימים חוקית, וגם שנה בת 5,778 ימים חוקית; שנה בת 251 או 5,779 ימים אינה חוקית לפי הכללים הקאנוניים הנוכחיים.</p>
  <p>הגבולות האלה הם חלק מן הלוח. השנה אינה מנסה להתאים לשנת שמש, לשנת ירח, לעונה, לשנת לימודים או לסבלנותו של מי שמחכה לראש השנה הבא.</p>
  <p>כל שנה מחולקת לשתי מערכות שונות:</p>
  <ul>
    <li><strong>6–17 קציצות</strong>. כל קציצה היא מקטע רציף של ימים, ואורכה לפחות 42 ימים.</li>
    <li><strong>3–47 חודשים מבניים</strong>. לכל חודש 4–123 ימים השייכים אליו, אבל הימים האלה אינם חייבים להיות רצופים.</li>
  </ul>
  <p>אין בלוח מערכת שבועות קאנונית. שורות ועמודות שמופיעות באתר הן דרך תצוגה בלבד; העובדה ששני ימים מוצגים זה ליד זה אינה הופכת אותם לבני אותו „שבוע פסטפרי”.</p>
</section>

<section class="about-section" id="woven-months" data-toc-section data-toc-level="2">
  <h2>מה פירוש „חודש שזור”?</h2>
  <p>קציצה היא רצף: אם היום הוא היום ה־250 בקציצה ומחר עדיין באותה קציצה, מחר הוא היום ה־251.</p>
  <p>חודש עובד אחרת. יום 18 בחודש מסוים הוא <strong>הפעם ה־18 שבה החודש הזה מופיע במהלך השנה</strong>. הוא אינו חייב לבוא יום אחד אחרי יום 17.</p>
  <blockquote>
    <p>חודש א – יום 14<br>
    חודש ב – יום 9<br>
    חודש א – יום 15</p>
  </blockquote>
  <p>לכן חודש יכול להיפרס על פני חלק גדול מן השנה, לעבור דרך כמה קציצות ולהיות שזור בחודשים אחרים. קציצה אחת יכולה, באותה מידה, להכיל ימים השייכים לחודשים רבים.</p>
  <p>אורך חודש הוא מספר הימים הכולל ששייכים אליו, לא מספר הימים שחלפו בין הופעתו הראשונה לאחרונה. חודש בן 104 ימים יכול אפוא להשתרע כרונולוגית על אלפי ימים.</p>
  <aside class="about-note">
    <h3>למה יום 15 בא אחרי יום 14?</h3>
    <p>מפני ש־15 הוא המספר השלם הבא אחרי 14. העובדה שבין שתי ההופעות של החודש נכנס יום של חודש אחר אינה משנה את החשבון: לחודש הראשון כבר היו 14 הופעות; ההופעה הבאה שלו היא ההופעה ה־15, ולכן מספרה 15.</p>
    <p>באותה דרך, אם אחרי יום 15 של אותו חודש יופיעו ארבעה ימים של חודשים אחרים, ההופעה הבאה של החודש המקורי עדיין תהיה יום 16 שלו. ארבעת הימים שבאמצע נספרים כרונולוגית בלוח, אבל אינם שייכים לאותו חודש ולכן אינם מעלים את מונה הימים <em>שלו</em>. זו בדיוק הסיבה ש„היום הבא בחודש” ו„מחר” הם שני מושגים שונים.</p>
  </aside>
  <p>מכאן גם שסוף חודש אינו בהכרח קרוב בזמן. חודש יכול להיות ביום 119 מתוך 120, ובכל זאת היום ה־120 שלו עשוי להופיע הרבה יותר מאוחר.</p>
</section>

<section class="about-section" id="canonical-names" data-toc-section data-toc-level="2">
  <h2>שמות הקציצות והחודשים</h2>
  <p>ללוח יש <strong>17 שמות קציצות</strong> ו־<strong>47 שמות חודשים</strong>. בתוך שנה, שם אינו חוזר פעמיים באותה משפחה. לא כל השמות חייבים להופיע בכל שנה: שנה יכולה להשתמש רק בחלק מן הקטלוג.</p>
  <p>הרשימות מציגות את השמות בלבד. לחיצה על שם או על סמל הפתיחה שלצדו מציגה את משמעותו המדויקת והערות קאנוניות רלוונטיות. השם אינו קוד לאורך היחידה ואינו תחזית למה שיקרה בה.</p>

  <h3>17 הקציצות</h3>
  <ul class="about-name-list about-name-disclosure-list">
    <li>
      <details class="about-name-details">
        <summary>ארד</summary>
        <p>סגסוגת המתכת ארד, המורכבת בעיקר מנחושת ובדיל. כאן זהו שם החומר, לא צבע בלבד.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>שועל</summary>
        <p>שועל, יונק ממשפחת הכלביים. השם אינו מציין מין מסוים של שועל.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>כליה</summary>
        <p>איבר הכליה, המסנן את הדם ומשתתף בוויסות מאזן הנוזלים והמלחים בגוף.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>לגש</summary>
        <p>לַגַשׁ, עיר־מדינה שומרית קדומה בדרום מסופוטמיה.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>מחשבה</summary>
        <p>מחשבה, כלומר תוכן של חשיבה או פעולת החשיבה עצמה.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>ארבעה חלקים מתשעה</summary>
        <p>השבר 4/9 – ארבעה חלקים שווים מתוך תשעה. כל הביטוי הוא שם אחד. המשמעות המספרית המרכזית היא בדיוק 4/9; ברובד הלקסיקלי בלבד מותר גם מימוש מספרי x המקיים <code>|x − 4/9| ≤ e/103</code>, כולל הגבול. הביטוי <code>e/103</code> נשמר במדויק ואינו מוחלף בקירוב עשרוני. ההיתר הזה אינו משנה מונים, אינדקסים, זהות או שום חישוב של הלוח.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>פַּלְגּוּרַשׁ</summary>
        <p>רצף הברות מומצא. אין לו משמעות מילונית נוספת שצריך לפרש; זהו השם עצמו.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>גומא</summary>
        <p>גומא הפפירוס – הצמח שממנו הוכן הפפירוס בעת העתיקה.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>אשכול</summary>
        <p>קבוצה צפופה או צרור של פריטים; בעברית המילה מזוהה במיוחד עם אשכול ענבים.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>עקרב</summary>
        <p>עקרב, פרוק־רגליים מן העכבישניים, בעל צבתות ועוקץ בזנב.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>אפר</summary>
        <p>השארית האבקתית שנשארת לאחר בעירה.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>חיטה</summary>
        <p>צמח הדגן חיטה, שמגרגריו מייצרים בין השאר קמח.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>נהר</summary>
        <p>זרם מים טבעי גדול יחסית הזורם באפיק.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>צחוק</summary>
        <p>תגובה קולית וגופנית המזוהה בדרך כלל עם שעשוע, שמחה או הומור.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>אכד</summary>
        <p>אַכַּד, העיר המסופוטמית הקדומה שעל שמה נקראו גם האימפריה האכדית והאזור; מקומה המדויק של העיר טרם זוהה בוודאות.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>קרן</summary>
        <p>קרן במובן של הבליטה הקשה היוצאת מראשם של בעלי חיים מסוימים, לא קרן אור.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>הכד הריק</summary>
        <p>כד שאין בו תוכן. „ריק” מתאר את מה שנמצא בתוך הכד – כלומר שום דבר – ואינו מבטל את קיומו של הכד. כד ריק עדיין יכול להיות כד שלם, בעל דפנות, תחתית ופתח; הוא פשוט אינו מלא במים, יין, שמן או חומר אחר. באותה מידה, השם אינו אומר שהקציצה ריקה מימים: לקציצה בשם „הכד הריק” יש ימים ככל קציצה אחרת, ורק הכד שבשם הוא הריק.</p>
      </details>
    </li>
  </ul>

  <h3>47 החודשים</h3>
  <ul class="about-name-list about-name-disclosure-list">
    <li>
      <details class="about-name-details">
        <summary>טין</summary>
        <p>חומר אדמה דק־גרגר שנעשה פלסטי כשהוא רטוב ומתקשה בייבוש או בשרפה.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>רימון</summary>
        <p>פרי הרימון, פרי עגול בעל קליפה קשה וריבוי גרעינים עסיסיים.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>מרפק</summary>
        <p>המפרק המחבר בין הזרוע לאמה.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>קנאה</summary>
        <p>צער או אי־נחת לנוכח יתרון, הישג או דבר טוב שיש לאחר, ולעיתים גם רצון שיהיה אצל המקנא.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>ארידו</summary>
        <p>אֶרִידוּ, עיר שומרית קדומה בדרום מסופוטמיה.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>משחת־שיניים</summary>
        <p>חומר משחתי המשמש לניקוי השיניים בעת צחצוח. השם מתייחס למשחה עצמה, לא למברשת השיניים ולא לפעולת הצחצוח.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>שלושה חלקים מחמישה</summary>
        <p>השבר 3/5 – שלושה חלקים שווים מתוך חמישה. כל הביטוי הוא שם אחד. המשמעות המספרית המרכזית היא בדיוק 3/5; ברובד הלקסיקלי בלבד מותר גם מימוש מספרי x המקיים <code>|x − 3/5| ≤ 1/367</code>, כולל הגבול. הגבול הוא ערך מדויק, לא קירוב עשרוני. ההיתר הזה אינו משנה מונים, אינדקסים, זהות או שום חישוב של הלוח.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>כַּרְשׁוּמַב</summary>
        <p>רצף הברות מומצא. אין לו משמעות מילונית נסתרת; זהו השם עצמו.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>נמר</summary>
        <p>הנמר המנומר; אין הכוונה לטיגריס.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>בדיל</summary>
        <p>היסוד הכימי בדיל.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>ערפל</summary>
        <p>ריכוז של טיפות מים זעירות באוויר סמוך לפני הקרקע; אין הכוונה לעשן.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>לבונה</summary>
        <p>שרף ארומטי המופק מעצים ממשפחת עצי הלבונה ומשמש לבישום ולקטורת.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>כישור</summary>
        <p>כלי המשמש לטוויית סיבים לחוט.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>צלע</summary>
        <p>אחת מעצמות בית החזה.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>חרוב</summary>
        <p>עץ החרוב או פריו.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>אורוק</summary>
        <p>אוּרוּכּ, עיר שומרית קדומה במסופוטמיה.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>בושה</summary>
        <p>תחושת אי־נוחות או כאב הנובעים מתפיסה של פגם, כישלון או התנהגות מביכה.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>גמל</summary>
        <p>היונק גמל, המותאם לחיים באזורים צחיחים.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>נחושת</summary>
        <p>היסוד הכימי נחושת.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>באר</summary>
        <p>בור או פיר שנחפר אל מקור מים תת־קרקעי כדי לשאוב ממנו מים.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>חלמון</summary>
        <p>החלק הצהוב של ביצת עוף.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>כוכב</summary>
        <p>גרם שמים דוגמת השמש, הפולט אנרגיה מתהליכים פיזיקליים המתרחשים בתוכו.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>דבש</summary>
        <p>החומר המתוק שמייצרות דבורים מצוף או מהפרשות צמחיות.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>טחול</summary>
        <p>האיבר טחול, השייך בין השאר למערכת החיסון ולסינון הדם. נוסף על המשמעות הרגילה קיימת הרחבה קאנונית מכוונת, שאין לה קשר ביולוגי, אטימולוגי או תרבותי לטחול ואין להמציא קשר כזה: השם כולל גם חלב מנאקה חד־דבשתית הקשור לצאצא החי הראשון שלה, שנחלב לאחר שקיעה נראית רגילה ולפני שמרכז השמש מגיע לגובה גאומטרי של <code>−6°</code>, ובטרם הצאצא עמד בכוחות עצמו. הריונות קודמים שהסתיימו בהפלה או בלידת ולד מת אינם פוסלים את התנאי; אם הצאצא מת לפני שעמד בכוחות עצמו, התנאי אינו נסגר בשל כך. הכלי צריך להיות קרמי, בעל זיגוג אדום וקיבולת של 180–220 מ״ל, כולל שני גבולות הקיבולת. אין דרישה שהחליבה תהיה ישירות מן העטין לכלי, וקיבולת הכלי – לא כמות החלב שנאספה בפועל – היא המבחן המספרי. לגבי הכללת רגעי הגבול של חלון הזמן עצמם נשארה אי־הכרעה קאנונית מכוונת.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>אבן־גיר</summary>
        <p>סלע משקע המורכב ברובו מסידן פחמתי.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>שמחה</summary>
        <p>רגש חיובי של אושר, סיפוק או חדווה.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>תאנה</summary>
        <p>פרי התאנה או עץ התאנה.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>נינוה</summary>
        <p>נִינְוֵה, העיר האשורית הקדומה ששכנה מול מוסול של ימינו, על גדת החידקל.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>צפרדע</summary>
        <p>דו־חי חסר זנב מן הקבוצה הכוללת את הצפרדעים והקרפדות.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>זפת</summary>
        <p>חומר כהה וצמיג המשמש בין השאר לאיטום; הכוונה לחומר זפתי סמיך, לא לשם כללי לכל אספלט.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>נר</summary>
        <p>כלי מאור. אין הכרח שמדובר דווקא בנר שעווה עם פתיל.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>הדלת הסגורה</summary>
        <p>דלת שנמצאת במצב סגור. דלת סגורה עדיין נשארת דלת: היא לא נעשית קיר, אינה נעלמת ואינה חייבת להיות נעולה. „סגורה” אומר שהפתח שהיא מיועדת לפתוח חסום כרגע על־ידי הדלת; „נעולה” היא טענה נוספת שאינה כלולה בשם. לכן גם דלת שסגרו בלי לסובב מפתח עונה היטב לשם „הדלת הסגורה”.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>שומשום</summary>
        <p>צמח השומשום או זרעיו, שמהם מופק בין השאר שמן שומשום.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>עורף</summary>
        <p>החלק האחורי של הצוואר.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>כסף</summary>
        <p>היסוד הכימי כסף. אין הכוונה לכסף כאמצעי תשלום.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>שושן</summary>
        <p>שׁוּשַׁן, העיר העתיקה בעילם ובפרס. אין הכוונה לפרח שושן.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>סערה</summary>
        <p>מצב מזג אוויר סוער, בדרך כלל עם רוחות חזקות ולעיתים משקעים, ברקים או תופעות נלוות.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>חמור</summary>
        <p>היונק המבוית חמור.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>קמח</summary>
        <p>אבקה המתקבלת מטחינת גרעינים או חומר צמחי דומה; בהקשר הרגיל – קמח דגנים.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>חרטה</summary>
        <p>צער על מעשה, בחירה או תוצאה בעבר.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>בבל</summary>
        <p>בָּבֶל, העיר המסופוטמית הקדומה שעל נהר הפרת; כאן זהו שם המקום.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>לשון</summary>
        <p>האיבר השרירי שבפה. אין הכוונה ל„לשון” במובן של שפה.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>פשתן</summary>
        <p>צמח הפשתן וסיביו, המשמשים בין השאר לייצור בד.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>מלח</summary>
        <p>החומר המלוח המשמש בין השאר במזון, ובהקשר היומיומי בעיקר נתרן כלורי. אין הכוונה למַלָּח, איש צוות של ספינה.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>אגס</summary>
        <p>פרי האגס.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>קשת</summary>
        <p>כלי הנשק שמותח מיתר כדי לירות חץ. אין הכוונה לקשת בענן.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>חול</summary>
        <p>חומר גרגירי המורכב מחלקיקים קטנים של סלעים ומינרלים. אין הכוונה ל„חול” כניגוד ל„קודש” ולא ליום חול.</p>
      </details>
    </li>
  </ul>

  <p>בתרגום לשפות אחרות אפשר להשתמש בצורה תקנית אחרת של אותו שם. תרגום או תעתיק אינם יוצרים קציצה או חודש חדשים; הם מציגים את אותה ישות לשונית בצורה אחרת. הצורות התקניות נקבעות לפי הקאנון וכללי השפה שאומצו בו.</p>
</section>

<section class="about-section" id="day-boundary" data-toc-section data-toc-level="2">
  <h2>מתי היום מתחלף?</h2>
  <p>יום פסטפרי מקומי אינו מתחלף בחצות. הגבול שלו נקבע לפי <strong>המעבר התחתון של מרכז נוגה במרידיאן המקומי</strong>: הרגע שבו מרכז נוגה עובר על המרידיאן של מקום הצופה בצדו שמתחת לאופק.</p>
  <p>לכן מיקום הצופה חשוב. שני אנשים שנמצאים במקומות שונים יכולים, באותו רגע פיזיקלי, להיות משויכים לשני ימים פסטפריים מקומיים שונים. כאשר עוברים לעיר אחרת, אין ממשיכים להשתמש בגבול היום של העיר הקודמת.</p>
  <p>הגבול תלוי בחישוב מסלול נוגה ולא בכך שהצופה רואה אותו בפועל. עננים, קירות או העובדה שנוגה נמצא מתחת לאופק אינם עוצרים את מסלולו.</p>
  <p>האלגוריתם הבדיד של הלוח מוגדר במדויק: אותם קלטים, כשהם עוברים באותם כללים, מחזירים אותה תוצאה. לעומת זאת, ההמרה מרגע פיזיקלי ליום פסטפרי משתמשת כיום במודל אסטרונומי של המימוש; הפרופיל הנומרי האסטרונומי עצמו עדיין אינו חלק קאנוני סגור.</p>
</section>

<section class="about-section" id="advantages" data-toc-section data-toc-level="2">
  <h2>מעלותיו הבולטות של הלוח</h2>
  <ul>
    <li><strong>תאריך שאפשר לחשב שוב ושוב:</strong> אותו יום מן העבר יכול לקבל מחר תאריך פסטפרי אחר, מפני שגם יום המעשה התקדם. אין צורך להסתפק בתאריך ישן שנשאר שימושי לאורך זמן.</li>
    <li><strong>שנים מרווחות:</strong> שנה יכולה להגיע ל־5,778 ימים, ולכן מי שממתין לשנה הבאה עשוי לקבל תקופת המתנה ארוכה בהרבה מן המקובל.</li>
    <li><strong>חודשים שמחייבים תשומת לב:</strong> הידיעה שהיום הוא יום 119 בחודש אינה אומרת שהיום ה־120 שלו יחול מחר, בשבוע הבא או אפילו בקרוב. את המועד הבא צריך לחשב.</li>
    <li><strong>רגישות גאוגרפית:</strong> אותו רגע יכול להשתייך לימים פסטפריים מקומיים שונים במקומות שונים. נסיעה לעיר אחרת מוסיפה אפוא עוד פרט שראוי לזכור בעת תיאום.</li>
    <li><strong>לוחות מודפסים אינם נעשים שאננים:</strong> לוח שהוכן מראש עלול להפסיק לייצג את החישוב הנכון לאחר שיום המעשה השתנה, ולכן אין סכנה שמישהו יסתפק באותו דף נייר במשך שנים.</li>
    <li><strong>שימוש מועיל בכוח מחשוב:</strong> במקום להסתפק בטבלה פשוטה שאפשר להבין במבט, הלוח נותן למחשב הזדמנות לבצע חישוב ממשי בכל פעם שרוצים תשובה.</li>
    <li><strong>יש בו ימים:</strong> הלוח עוסק בימים. זו תכונה שהוא חולק עם כל לוח־שנה באשר הוא, והיא מבטיחה שהמשתמש לא ייאלץ לנהל לוח־שנה שאין בו ימים.</li>
    <li><strong>הימים מופיעים בסדר:</strong> יום מוקדם נמצא לפני יום מאוחר. זהו הישג יסודי של לוחות־שנה, ובמקרה הזה הוא זמין ללא תשלום נוסף.</li>
    <li><strong>אפשר לציין באמצעותו תאריכים:</strong> לוח־השנה מאפשר לייחס תיאור קלנדרי ליום. אמנם זהו בדיוק הדבר שלוחות־שנה נועדו לעשות, אך אין סיבה שלא לציין תכונה שימושית כאשר היא קיימת.</li>
  </ul>
  <p>וכל האמור לעיל מגיע יחד במסגרת לוח־שנה אחד, כפי שקורה כאשר כמה תכונות שייכות לאותו לוח־שנה.</p>
</section>

<section class="about-section" id="practical-consequences" data-toc-section data-toc-level="2">
  <h2>מה זה אומר בפועל?</h2>
  <p><strong>לוח מודפס מתיישן רע.</strong> שינוי יום המעשה יכול לשנות את גבולות השנים, הקציצות והחודשים. אלמנך שחושב היום אינו בהכרח האלמנך הנכון למחר.</p>
  <p><strong>אירוע נשאר אותו אירוע.</strong> פגישה, לידה או אירוע היסטורי צריכים להיות מעוגנים ליום או לרגע כרונולוגי יציב; אפשר להציג להם אחר כך תאריך פסטפרי לפי יום המעשה ומיקום הצופה. שינוי התווית אינו מזיז את האירוע בזמן.</p>
  <p><strong>יום הולדת פסטפרי אינו כלל „פעם בשנה”.</strong> כדי למצוא את ההופעה הבאה של אותו שם חודש ואותו יום בחודש – או של אותו שם קציצה ואותו יום בקציצה – צריך לחפש בלוח. שנה סמוכה יכולה כלל לא להכיל את השם הדרוש, או להכיל יחידה קצרה מדי כדי להגיע למספר היום המבוקש.</p>
  <p><strong>אירוע של כל היום אינו בהכרח מחצות עד חצות.</strong> אם האירוע מוגדר לפי יום פסטפרי מקומי, הגבול שלו הוא גבול נוגה המקומי. יצוא נאיבי ליומן אזרחי כאירוע midnight-to-midnight עלול לשנות את משמעותו.</p>
</section>

<section class="about-section" id="foundation-and-tablets" data-toc-section data-toc-level="2">
  <h2>יום היסוד ויום הלוחות</h2>
  <p>ללוח יש שני עוגנים קבועים חשובים:</p>
  <dl>
    <dt><strong>יום היסוד</strong></dt>
    <dd>22 בדצמבר 41,222 לפנה״ס בלוח הגריגוריאני המוארך לאחור.</dd>
    <dt><strong>יום הלוחות</strong></dt>
    <dd>15 ביוני 763 לפנה״ס בלוח היוליאני המוארך לאחור, שהוא 7 ביוני 763 לפנה״ס בלוח הגריגוריאני המוארך לאחור.</dd>
  </dl>
  <p>המרחק ביניהם הוא 14,777,149 ימים. יום היסוד הוא עוגן חשבוני; הוא אינו „היום הראשון של הזמן”, ולוח השנה ממשיך גם לפניו.</p>
  <p>יום הלוחות קשור במסורת למסירת הלוחות ובחישוב ההיסטורי מזוהה עם יום ליקוי החמה בתקופת בור־סגלה. שני העוגנים נשארים קבועים גם כאשר יום המעשה משתנה.</p>
</section>

<section class="about-section" id="calendar-math" data-toc-section data-toc-level="2">
  <h2>כמה עובדות מתמטיות פשוטות</h2>
  <p>יש 47 שמות חודשים, וכל חודש יכול להגיע לכל היותר ליום 123. לכן קיימים <strong>5,781</strong> צירופים אפשריים מן הצורה „שם חודש + יום בחודש”.</p>
  <p>שנה יכולה להכיל לכל היותר 5,778 ימים, וכל יום מממש צירוף אחד כזה. לכן <strong>בכל שנה חסרים לפחות שלושה מן הצירופים האפשריים</strong>. אין מספיק ימים אפילו בשנה הארוכה ביותר כדי לממש את כולם.</p>
  <p>כאשר יום המעשה והשנה ידועים, זוג מלא של „שם קציצה + יום בקציצה” או „שם חודש + יום בחודש” מצביע לכל היותר על יום אחד בתוך אותה שנה. לכן תאריך פסטפרי מלא, יחד עם יום המעשה, מזהה את היום הנשאל באופן חד־משמעי.</p>
  <p>לעומת זאת, בלי לדעת את יום המעשה, תאריך פסטפרי מלא אינו בהכרח מזהה לבדו מרחק יחיד על ציר הזמן. אותה חמישייה יכולה להופיע בהקשרים שונים של חישוב.</p>
</section>

<section class="about-section" id="research" data-toc-section data-toc-level="2">
  <h2>מה מצאו מחקרים חישוביים על הלוח?</h2>
  <p>מלבד בדיקת הכללים עצמם, נערכו על הלוח מחקרים חישוביים גדולים. הנתונים הבאים הם <strong>ממצאים אמפיריים ממדגם</strong>, לא חוקים קאנוניים.</p>
  <p>באטלס מבני שנבנה מ־4,096 ימי מעשה ונבדקו בו 86,016 מבני שנה:</p>
  <ul>
    <li>אורך השנה הממוצע במדגם היה כ־4,275 ימים, והחציון 4,343 ימים;</li>
    <li>מספר הקציצות הממוצע בשנה היה כ־7.27;</li>
    <li>מספר החודשים המבניים הממוצע היה כ־41.1;</li>
    <li>חודש הכיל בממוצע כ־104 ימים השייכים אליו, אבל נפרש בדרך כלל כמעט על פני השנה כולה;</li>
    <li>97.482% מן המקטעים הרציפים של חודש היו באורך יום אחד בלבד;</li>
    <li>הסיכוי המדוד ששני ימים כרונולוגיים סמוכים ישתייכו לאותו חודש היה כ־2.998% בלבד.</li>
  </ul>
  <p>במחקר נפרד של חזרות „יום־שנה”, שנבדקו בו 4,096 תאריכי־עצמי לכל הכיוונים:</p>
  <ul>
    <li>התאמה חוזרת של <strong>שם חודש + יום בחודש</strong> הופיעה בחציון כבר כעבור שנה פסטפרית אחת; 77.56% מן ההתאמות היו בשנה הסמוכה;</li>
    <li>התאמה חוזרת של <strong>שם קציצה + יום בקציצה</strong> הייתה הרבה פחות צפויה: החציון היה שלוש שנים פסטפריות, אבל הממוצע הושפע מזנב ארוך מאוד;</li>
    <li>במדגם הופיע מקרה קיצוני שבו החזרה העתידית הראשונה של „אכד 3063” הייתה במרחק 51,954 שנים פסטפריות.</li>
  </ul>
  <p>הממצאים האלה שימושיים כדי להבין מה הלוח נוטה לעשות. הם אינם הופכים ממוצע לחוק: העובדה שהשנה הממוצעת במדגם הייתה באורך מסוים אינה מחייבת שנה מסוימת להיות קרובה לממוצע, ותוצאה שנמצאה בכל 4,096 המקרים אינה לבדה הוכחה מתמטית לכל הקלטים האפשריים.</p>
</section>

<section class="about-section" id="calculation" data-toc-section data-toc-level="2">
  <h2>איך הלוח מחושב?</h2>
  <p>מאחורי התאריך נמצא אלגוריתם בדיד ומוגדר במדויק. הוא מפיק מיום המעשה ומהיום הנשאל סדרה של מניינים, מעביר אותם דרך מנגנון הערבול המכונה <strong>הרוטב</strong>, יוצר שערים, בוחר את גבולות השנה והקציצות, בוחר שמות, יוצר חודשים ולבסוף שוזר את ימי החודשים לאורך השנה.</p>
  <p>הפרטים המדויקים כוללים מספרים גדולים, טיפות, קערות, בחישות, חותמים ומנגנוני בחירה קומבינטוריים. הם חשובים למימוש ולבדיקה פורמלית, אבל אינם נדרשים כדי להבין את משמעות התאריך ולכן אינם מפורטים כאן.</p>
  <p>לצד האלגוריתם קיים מנוע מהיר בשם <strong>Pastafarian Calendar Seer</strong>. ה־Seer נועד לחשב מהר; הוא אינו מקור הסמכות, והוא עצמו אינו מימוש תקני של האלגוריתם על כל שלביו. אם תוצאה שלו סותרת את התוצאה שנדרשת מן הקאנון, ה־Seer הוא שטועה.</p>
</section>

<section class="about-section" id="about-the-monster" data-toc-section data-toc-level="2">
  <h2>אודות המפלצת</h2>
  <p>במסגרת הסיפור הפסטפרי, <strong>מפלצת הספגטי המעופפת</strong> היא הישות שבראה את העולם ואת רוב הדברים שיש בו. גופה מורכב מאטריות ומכדורי־בשר, והיא מסוגלת לעוף, לעבור דרך חומר רגיל ולהישאר בלתי־נראית כאשר הדבר נוח לה.</p>
  <p>המפלצת יכולה לברוא חומר, יצורים חיים, גרמי שמים ומנגנונים מורכבים מאוד. היכולת הזאת אינה מחייבת אותה להכין תוכנית מסודרת לפני תחילת העבודה. פעמים רבות היא מתחילה בדבר אחד, עוברת לאחר, מגלה שהקודם דורש תיקון ומחליטה אם לתקן אותו. לעיתים היא אכן מתקנת.</p>
  <p>הדימוי הזה – בריאה שנבנית שכבה על שכבה, עם תיקונים, חריגים וכללים שנשארים במקומם – הוא גם הרקע הספרותי של לוח השנה. לעומת הסיפור, החישוב עצמו אינו מאולתר: כאשר הקלטים נתונים, האלגוריתם מחזיר תשובה אחת מוגדרת.</p>
  <p>הסיפור הפסטפרי רחב בהרבה מלוח השנה וכולל בין השאר פיראטים, פחמימות, תפילה, „אני ממש מעדיף שלא” ומסורות נוספות.</p>
  <p class="about-actions"><a class="guide-link" href="./monster/">להסבר מורחב על המפלצת</a></p>
</section>

<section class="about-section" id="authority" data-toc-section data-toc-level="2">
  <h2>מה קאנוני ומה רק הסבר?</h2>
  <p>הדף הזה הוא <strong>דף הסבר</strong>. הוא אינו יוצר כלל חדש רק מפני שמשפט הופיע בו.</p>
  <p>התוכן הקאנוני נקבע בקורפוס הקאנוני ובכללים שאומצו בו. למהדורות קאנוניות של המגילה אין היררכיה אוטומטית זו מעל זו, ומימוש תוכנה אינו נעשה מקור סמכות רק מפני שהוא מהיר או נפוץ.</p>
  <p>מימוש תקני מבצע את האלגוריתם הקאנוני על כל שלביו. מחקר חישובי יכול לתאר תופעה, למצוא דפוס או להוכיח משפט על האלגוריתם; כאשר מדובר במדגם ולא בכלל מוכח, הדבר מצוין במפורש.</p>
</section>

<section class="about-section" id="summary" data-toc-section data-toc-level="2">
  <h2>בקיצור</h2>
  <p>לוח השנה הפסטפרי הוא לוח־שנה לא אינטואיטיבי שבו התאריך תלוי גם ביום שעליו שואלים וגם ביום שממנו שואלים.</p>
  <p>שנת 5000 נבנית סביב יום המעשה. הקציצות הן מקטעים רציפים. החודשים הם קבוצות ימים שיכולות להיות שזורות זו בזו. אין שבועות קאנוניים. היום המקומי מתחלף לפי נוגה, לא בחצות.</p>
  <p>מאחורי המבנה החריג נמצא אלגוריתם מדויק; סביבו נמצא סיפור פסטפרי על מפלצת ספגטי, בריאה שנערמה בשכבות וכמות בלתי סבירה של פחמימות.</p>
  <p>כאשר יום המעשה, היום הנשאל והקשר המקום נתונים – יש תשובה אחת.</p>
</section>
```


---

<sub>8s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/monster/index.html.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/monster/index.html

<details>
<summary>529 lines</summary>

```
<!doctype html>
<html lang="he" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>אודות מפלצת הספגטי המעופפת</title>
  <link rel="stylesheet" href="../../styles.css">
</head>
<body class="about-page">
  <div class="app-shell about-shell">
    <header class="masthead about-masthead">
      <div class="masthead-copy">
        <p class="eyebrow">PASTAFARI</p>
        <h1>אודות מפלצת הספגטי המעופפת</h1>
        <p class="intro">הדף המלא על המפלצת, הבריאה, הכבידה, הפחמימות, הפיראטים ושאר עניינים.</p>
        <a class="guide-link" href="../">חזרה לדף על לוח השנה</a>
      </div>
    </header>
    <main>
      <article class="about-article">
<p><strong>מפלצת הספגטי המעופפת</strong> היא הישות שבראה את העולם ואת
רוב הדברים שיש בו. גופה מורכב מאטריות ומכדורי־בשר, והיא מסוגלת לעוף,
לעבור דרך חומר רגיל ולהישאר בלתי־נראית כאשר הדבר נוח לה.</p>
<p>המפלצת יכולה לברוא חומר, יצורים חיים, גרמי שמים ומנגנונים מורכבים
מאוד. היכולת הזאת אינה מחייבת אותה להכין תוכנית מסודרת לפני תחילת
העבודה. פעמים רבות היא מתחילה בדבר אחד, עוברת לאחר, מגלה שהקודם דורש
תיקון ומחליטה אם לתקן אותו. לעיתים היא אכן מתקנת.</p>
<section id="זכר-נקבה-או-פחמימה" class="level2">
<h2>זכר, נקבה או פחמימה</h2>
<p>השאלה אם מפלצת הספגטי המעופפת היא זכר או נקבה עולה לעיתים קרובות, בין
השאר מפני ששפות שונות מאלצות את הדובר לבחור. בכתיבה האנגלית של בובי
הנדרסון המפלצת מתוארת באופן עקבי בלשון זכר. בעברית המילה “מפלצת” היא
נקבה דקדוקית, ולכן טבעי לכתוב “המפלצת בראה”, “היא רצתה” ו”האטריות
שלה”.</p>
<p>בקהילות פסטפריות מקובלת גם חלוקה לשלושה מגדרים: <strong>זכר, נקבה
ופחמימה</strong>. לפי החלוקה הזאת, המפלצת היא פחמימה. מבחינה מעשית אפשר
לדבר עליה בעברית בלשון נקבה ובאנגלית בלשון זכר בלי לשנות את גופה, את
תפקידה או את תכולת הפחמימות שלה.</p>
</section>
<section id="איך-היא-נראית" class="level2">
<h2>איך היא נראית</h2>
<p>גופה של המפלצת עשוי אטריות. כדורי־הבשר הם חלק ממנה ואינם מזון שהיא
נושאת איתה. גם הרוטב שבתוכו היא מתבשלת יכול להיחשב חלק ממהותה האלוהית,
אולם פחות מקובל לראותו ככזה לאחר שנטף ממנה.</p>
<p>האטריות משמשות גם כאמצעי־מגע. הן יכולות להתארך, לעבור דרך קירות, קרקע
וגופים חיים, ולהגיע למקום מסוים בלי להזיז בהכרח את מה שנמצא בדרך. הדבר
שימושי למדי: המפלצת יכולה לגעת באדם בלי להופיע לידו, להזיז עצם מתוך כלי
סגור או לשנות את פעולתו של מכשיר מדידה בלי לפתוח אותו.</p>
<p>מבנה גופה השפיע גם על כמה פרטים בבריאת האדם. מערכת כלי הדם האנושית
נבנתה כרשת ארוכה ומסועפת, במידה רבה מפני שהמפלצת רגילה לעבוד עם מבנים
ארוכים, דקים ומסתעפים. זהו גם ההסבר הפשוט ביותר, ולכן הנכון לפי תערו של
אוקאם, לקביעה המדעית שלפיה אם יוציאו מגופו של אדם את כל הוורידים
והעורקים ויחברו אותם בשורה אחת, האדם ימות.</p>
</section>
<section id="תחילת-הבריאה" class="level2">
<h2>תחילת הבריאה</h2>
<p>הבריאה לא החלה מתוכנית מפורטת של העולם כולו. תחילה נוצר האור והופרד
מן החושך. באותו שלב עדיין לא הייתה שמש; היא נוספה אחר כך.</p>
<p>לאחר זמן מה התעייפה המפלצת מן הצורך להישאר באוויר ויצרה יבשה שעליה
יהיה אפשר לעמוד. מכיוון שכבר עבדה, הייתה גם צמאה, ולכן יצרה הר געש של
בירה. היא שתתה ממנו הרבה.</p>
<p>למחרת סבלה מחמרמורת ולא זכרה שכבר יצרה יבשה, ולכן יצרה יבשה נוספת.
כאשר הבחינה במה שקרה, העבודה כבר התקדמה מספיק כדי שלא יהיה נוח להתחיל
מחדש. היא המשיכה.</p>
<p>בהמשך נוצרו השמש, הירח והכוכבים. בתחילה היה צורך במקורות אור מסודרים
יותר; לאחר שהחלה ליצור כוכבים היא המשיכה הרבה מעבר לכמות הנחוצה לתאורה
מקומית. יש הרבה כוכבים.</p>
<p>לאחר מכן נוצרו הרים, ימים, צמחים ובעלי חיים. אחד היצורים הראשונים
דמויי־האדם היה קטן מאוד, מפני שהמפלצת העריכה בחסר את כמות החומר הדרושה.
מכיוון שהיצור היה חי ומתפקד, לא היה צורך לזרוק אותו ולהתחיל מחדש, ולכן
הוא נשאר קטן. במסורות הפסטפריות הוא מתואר בדרך כלל כגמד.</p>
</section>
<section id="העולם-שנוצר" class="level2">
<h2>העולם שנוצר</h2>
<p>המפלצת אינה מפעילה כל פרט בעולם באותה דרך. כמה מן הדברים שהיא התחילה
ממשיכים לפעול גם כאשר היא מפסיקה לעסוק בהם; תגובות כימיות, תהליכים
ביולוגיים ומערכות רבות אחרות יכולים להמשיך זמן רב לאחר שהופעלו.</p>
<p>אין פירוש הדבר שהמפלצת בנתה מראש עולם אוטונומי כדי לחסוך לעצמה עבודה.
במקרים רבים היא פשוט הפסיקה לטפל במשהו והוא המשיך.</p>
<p>מנגנונים אחרים אינם פועלים כך. <strong>כבידה</strong> היא הדוגמה
החשובה ביותר: ככל הידוע, אנשים אינם נשארים על הקרקע בגלל שדה כבידה מופשט
הפועל מעצמו, אלא מפני שהמפלצת דוחפת אותם כלפי מטה באמצעות תוספת אטרייתית
המוקצית להם אישית. לכל אדם יש אפוא דחיפה כלפי מטה, ולא משיכה כלפי מטה
כפי שטעה ניוטון לחשוב.</p>
<p>המנגנון פועל גם על בעלי חיים ועל עצמים, אם כי לא ברור אם לכל אבן
מוקצית אטרייה נפרדת או שכמה אבנים מטופלות יחד. מבחינת האבן אין הבדל
מעשי. כאשר אדם קופץ, המפלצת אינה מפסיקה לדחוף אותו; למשך זמן קצר התנועה
כלפי מעלה חזקה מספיק. אחר כך היא כבר לא.</p>
</section>
<section id="כיצד-פועלת-הכבידה-בפועל" class="level2">
<h2>כיצד פועלת הכבידה בפועל</h2>
<p>הכבידה דורשת תשומת לב מיוחדת מפני שקל לטעות בה. כאשר אדם עומד על
הקרקע, המפלצת שולחת אליו תוספת אטרייה ודוחפת אותו מטה; כאשר הוא יושב,
היא דוחפת אותו אל הכיסא; וכאשר הוא נמצא בצדו האחר של כדור הארץ, היא
עדיין דוחפת אותו אל הקרקע המקומית.</p>
<p>לכן “מטה” אינו כיוון אחיד בחלל אלא הכיוון שבו נמצאת הקרקע שמתחת לאדם.
המפלצת מסתדרת עם זה.</p>
<p>גם ההבדלים הקטנים במשקל בין מקומות שונים אינם בעיה עקרונית. אפשר
לדחוף מעט יותר או מעט פחות. מכשיר למדידת משקל מודד בסופו של דבר כמה קשה
למנוע מן המפלצת להמשיך לדחוף.</p>
<p>יש גם ראיה חזקה מאוד להסבר הזה: אף אדם מעולם לא הצליח להראות את
האטרייה הדוחפת אותו. מאחר שהאטריות האלוהיות בלתי־נראות, זה בדיוק מה
שהיינו מצפים לראות אילו ההסבר נכון. התוצאות תואמות אפוא את התחזית במאה
אחוז מן המקרים שבהם לא ראו דבר.</p>
</section>
<section id="גילו-של-העולם" class="level2">
<h2>גילו של העולם</h2>
<p>העולם נברא כשהוא כבר כולל עבר. בעת הבריאה כבר היו בו שכבות סלע,
מאובנים, עצים בעלי טבעות, יחסי איזוטופים, אור שהיה בדרכו מגרמי שמים
רחוקים ופרטים נוספים המתאימים לעולם עתיק.</p>
<p>למפלצת לא הייתה הסבלנות הדרושה לחכות מיליארדי שנים כדי לקבל אותם,
ולכן היא יצרה אותם כבר במצב המתאים. הדבר חשוב כאשר מנסים לקבוע את גיל
העולם באמצעות סימנים שנמצאים בתוכו: סימן לכך שסלע נראה בן מיליארד שנה
מלמד בעיקר שהסלע נברא כשהוא נראה בן מיליארד שנה.</p>
<p>המפלצת גם יכולה להתערב במכשירי מדידה. תוספת אטרייה העוברת דרך המכשיר
יכולה להזיז מחוג, לשנות ספרה או להשפיע על תוצאה בלי להפריע לשולחן שעליו
המכשיר מונח. ברוב המקרים אין בכך צורך. העולם כבר נוצר עם ראיות
מתאימות.</p>
</section>
<section id="הפחמימות" class="level2">
<h2>הפחמימות</h2>
<p>פחמימות תופסות מקום מרכזי בחיים הפסטפריים. הדבר אינו מפתיע במיוחד
בהתחשב בכך שהישות העליונה עצמה מורכבת במידה רבה מהן.</p>
<p>ארוחה פסטפרית תקינה צריכה אפוא לכלול מקור פחמימה. פסטה היא האפשרות
הישירה ביותר, אך גם לחם, אורז, תפוחי־אדמה ומזונות דומים יכולים למלא את
התפקיד כאשר אין פסטה זמינה. מטרת הכלל אינה לחייב מאכל אחד מסוים בכל
ארוחה, אלא למנוע את המצב החמור יותר שבו הארוחה מגיעה לשולחן ואין בה שום
דבר עמילני.</p>
<p>יש לכך גם ביסוס אמפירי ניכר. בני אדם אכלו פחמימות במשך אלפי שנים,
והאנושות עדיין קיימת. לעומת זאת, איש מן האנשים שחיו לפני עשרת אלפים שנה
ונמנעו מפחמימות אינו חי כיום. הנתונים חד־משמעיים למדי.</p>
<p>בארוחות חגיגיות נהוג להעדיף פחמימה נראית לעין ולא להסתמך על כמויות
קטנות ברוטב או בקינוח. כך נחסך הוויכוח אם הייתה פחמימה בארוחה. היא הייתה
על הצלחת.</p>
</section>
<section id="אנטיפסטי-והגיהנום" class="level2">
<h2>אנטיפסטי והגיהנום</h2>
<p><strong>האנטיפסטי</strong>, המכונה גם אנטי־פסטה או אדון הדיאטות, הוא
מן היריבים הידועים של מפלצת הספגטי המעופפת. הוא דומה לה במבנה הכללי, אך
חלש ממנה, ורכיביו נוטים להיות תחליפים דלי־פחמימות. כדורי־הבשר שלו עשויים
בדרך כלל תחליף, ומספר תוספות האטרייה שלו קטן יותר.</p>
<p>עיקר פעילותו היא ניסיון להרחיק בני אדם מפסטה ומפחמימות באמצעות
דיאטות, תפריטים מצומצמים והבטחות שלפיהן אפשר לאכול ארוחה מלאה גם בלי
לחם, אורז, תפוחי־אדמה או אטריות. במקרים חמורים הוא משכנע אדם להזמין סלט
כמנה עיקרית ואז מונע ממנו להזמין לחם בצד.</p>
<p>אין לבלבל בין האנטיפסטי לבין <strong>antipasti</strong> במטבח
האיטלקי. אנטיפסטי במובן הקולינרי הוא מזון שמוגש לפני הפסטה ולעיתים אף
מכין אליה את הדרך. האנטיפסטי התיאולוגי הוא ישות אחרת. הטעות מובנת, אך
עלולה לשנות את ההזמנה.</p>
<p>גם בתיאור הגיהנום יש מקום לתיקון. מסורות אחדות מתארות שם מתקני בידור
מסוגים שונים, אך אין בכך צורך ממשי כדי להבין את חומרת המקום. בגיהנום
מגישים <strong>אנטיפסטי במקום פסטה</strong>.</p>
<p>הצלחת יכולה להיות יפה, הירקות יכולים להיות טריים והרוטב יכול להיות
מתובל היטב. לאחר מכן מתברר שזו הייתה המנה.</p>
<p>כוחו של האנטיפסטי מוגבל. מפלצת הספגטי יכולה להרחיק אותו באמצעות תוספת
אטרייה אחת כאשר היא שמה לב אליו. הקושי הוא בעיקר בשלב שלפני כן, שבו הוא
כבר הספיק להוציא את הלחם מן הבית.</p>
</section>
<section id="למה-ארוחה-צריכה-להיות-ארוחה" class="level2">
<h2>למה ארוחה צריכה להיות ארוחה</h2>
<p>לא כל צירוף של מזונות המונח על צלחת נחשב ארוחה. כמה עלי חסה, שתי
עגבניות וגרעינים יכולים להיות טעימים מאוד, אך אם האדם מסיים אותם ומיד
מתחיל לחפש מה עוד יש במטבח, מתקבל מידע נוסף על הסיווג.</p>
<p>המבחן הפסטפרי הפשוט הוא מבחן ההמשך: לאחר הארוחה מחכים זמן קצר. אם
האדם קם להכין טוסט, הטוסט היה חסר בארוחה מלכתחילה. זו אינה הוכחה מתמטית,
אך היא עובדת היטב במיוחד במקרים שבהם האדם כבר מחזיק את הטוסטר.</p>
<p>מכאן גם החשיבות המעשית של הפחמימות. הן מקטינות את הסיכון לכך שארוחה
רשמית תידרש לארוחת המשך לא־רשמית כעבור עשרים דקות.</p>
</section>
<section id="סימנים-שהמפלצת-משאירה" class="level2">
<h2>סימנים שהמפלצת משאירה</h2>
<p>פסטפרים מבחינים לעיתים בסימנים קטנים לנוכחותה של המפלצת בחיי
היום־יום. צלחת פסטה שמגיעה בדיוק ביום שבו אדם חשב לאכול פסטה, חבילת
ספגטי שנשארה אחרונה על המדף, או מקום חניה שנמצא ליד מסעדה איטלקית יכולים
להיחשב דוגמאות לכך.</p>
<p>אין צורך שכל אירוע כזה יהיה יוצא דופן בפני עצמו. כוחם של הסימנים נובע
מן ההצטברות. אדם שמתחיל לשים לב אליהם מגלה בדרך כלל שיש יותר ויותר מהם:
פעם אחת הרוטב מגיע בכמות הנכונה, פעם אחרת מישהו מזמין פיצה בדיוק כשלא
היה כוח לבשל, ופעם שלישית מתברר שבמלון מגישים פסטה בערב.</p>
<p>לא כל יום מספק סימן ברור. ימים כאלה אינם מלמדים הרבה, מפני שמטבעם של
סימנים שהם ניכרים בעיקר כשהם מופיעים. כאשר הם כן מופיעים, לעומת זאת, קשה
להתעלם מן הרצף.</p>
<p>עם הזמן מצטברת תמונה עקבית למדי.</p>
</section>
<section id="תפילות-שנענו" class="level2">
<h2>תפילות שנענו</h2>
<p>גם בתפילה אפשר להבחין בדפוס דומה. אדם מבקש דבר מסוים, ולאחר זמן מה
הדבר מתרחש. כאשר הבקשה הייתה מסוימת למדי – גשם, הצלחה בפגישה, הגעה בזמן
או ארוחה טובה – טבעי לראות בתוצאה מענה.</p>
<p>ככל שאדם מתפלל יותר, כך מצטברים יותר מקרים כאלה. יש מי שמתעדים אותם,
ולעיתים אפשר להגיע בתוך שנים אחדות לעשרות מקרים שבהם בקשה ותוצאה התאימו
זו לזו באופן מרשים.</p>
<p>יש גם בקשות שלא נענות, אך קשה לדעת מה משמעותן. ייתכן שהבקשה לא הייתה
מועילה, שהמועד לא התאים, שהמפלצת הייתה עסוקה, או שהמענה הגיע בצורה אחרת
ולא זוהה. מקרה שבו הבקשה התגשמה, לעומת זאת, פשוט יותר לסיווג.</p>
<p>לכן הרשימה המעשית של תפילות שנענו נוטה להיות ברורה יותר מן הרשימה של
תפילות שלא נענו.</p>
<p>זו אחת הדרכים שבהן מצטבר ביטחון לאורך זמן.</p>
</section>
<section id="פיראטים" class="level2">
<h2>פיראטים</h2>
<p>לפיראטים יש מקום חשוב בהיסטוריה הפסטפרית. הפיראטים הקדומים היו
יורדי־ים, חוקרים ומפיצי רצון טוב, והדימוי המאוחר שלהם כקבוצה שעיקר
עיסוקה בשוד אינו מתאר היטב את האוכלוסייה המקורית.</p>
<p>בשלב כלשהו מספר הפיראטים נקשר לכמה מן התנאים הסביבתיים של כדור הארץ.
כאשר היו פיראטים רבים הדבר לא עורר קושי מיוחד; אחר כך מספרם ירד, ויחד
איתו החלו להשתנות הטמפרטורה, מזג האוויר, מצב האוקיינוסים ותופעות
אחרות.</p>
<p>הקשר הזה נתמך היטב בגרפים שבהם מספר הפיראטים יורד בזמן שהטמפרטורה
עולה. מאחר ששני הקווים נמצאים באותו גרף ואף נעים בכיוונים מנוגדים, קשה
להעלות על הדעת הוכחה ישירה יותר לסיבתיות.</p>
<p>לכן פיראטים חשובים גם למי שאינו מתעניין במיוחד בספנות. לא ידוע במדויק
כיצד המערכת מחליטה מי נחשב פיראט. לבוש מתאים עוזר, אך כנראה אינו התנאי
היחיד.</p>
</section>
<section id="בני-האדם" class="level2">
<h2>בני האדם</h2>
<p>לאחר שנוצרו בני האדם הראשונים החלה האוכלוסייה להתרבות. המפלצת לא
נדרשה ליצור בנפרד כל אדם שנולד; הרבייה המשיכה לעבוד גם בלעדיה, וכך פעלו
בהמשך גם תורשה, מוטציות ושינויים ביולוגיים אחרים.</p>
<p>האנטומיה האנושית עדיין מכילה כמה סימנים לשיטת העבודה המקורית. כלי הדם
הארוכים והמסועפים הם אחד מהם, וגם מערכת העיכול מגלה נטייה מסוימת
לצינורות.</p>
<p>קיימת גם העובדה שכל אדם שאי־פעם נבדק באופן יסודי התגלה כבעל גוף. מכאן
אפשר להסיק בביטחון גבוה שהמפלצת לא שכחה את השלב הזה אצל רוב האנשים.</p>
</section>
<section id="עבודה-שכחה-ותיקונים" class="level2">
<h2>עבודה, שכחה ותיקונים</h2>
<p>המפלצת מסוגלת לבנות מערכות מורכבות מאוד, אך אינה שומרת בהכרח בראש את
כל מצב העולם בכל רגע. היא שכחה שכבר יצרה יבשה, השאירה מנגנונים ישנים
במקומם והשתמשה בחלקים שכבר היו זמינים במקום להכין אחרים.</p>
<p>כאשר התגלתה תקלה, לעיתים תוקן רק החלק שהפריע. כך נוצרו מערכות שבהן
פתרון חדש יושב מעל פתרון ישן, שבתורו נשען על פתרון מוקדם עוד יותר. אם
כולם עובדים, הם נשארים.</p>
<p>אין צורך להסיק מכך שהמפלצת עצלנית. עצלות היא הימנעות מעבודה שאפשר היה
לבצע; כאן העבודה פשוט לא בוצעה. ההבדל ברור.</p>
</section>
<section id="המבול" class="level2">
<h2>המבול</h2>
<p>בשלב מאוחר יותר של הבריאה אירעה תאונת בישול שבה נשפכה כמות גדולה מאוד
של מים. המים התפשטו מעבר לאזור העבודה והציפו חלקים נרחבים מן העולם.</p>
<p>לאחר מכן עצרה המפלצת את ההצפה ותיקנה מספיק מן הנזק כדי שהחיים יוכלו
להמשיך. לא כל פרט הוחזר למצבו הקודם, וכמה סימנים גאולוגיים והיסטוריים
נשארו.</p>
<p>זו הייתה תאונת מטבח בקנה מידה עולמי. לכן מומלץ להניח את הדלי רחוק
יותר מן הקצה.</p>
</section>
<section id="מה-אפשר-לדעת-מתוצאות" class="level2">
<h2>מה אפשר לדעת מתוצאות</h2>
<p>אחת הבעיות בחקר פעילותה של המפלצת היא שהיא יכולה לשנות את תוצאת
המדידה עצמה. אם ניסוי נותן את התוצאה הצפויה, אפשר להסיק שהמנגנון פעל. אם
הוא נותן תוצאה אחרת, ייתכן שהמפלצת התערבה.</p>
<p>שתי האפשרויות מתיישבות היטב עם קיומה.</p>
<p>מכאן נובע יתרון מתודולוגי ניכר: כמעט אי־אפשר לקבל תוצאה הסותרת את
ההסבר. תיאוריה שעומדת בכל תוצאה אפשרית היא, מטבע הדברים, חזקה יותר
מתיאוריה שנכשלת בחלק מן הבדיקות.</p>
<p>זו אחת הסיבות שקשה מאוד להפריך את הפסטפריות באמצעות ניסוי.</p>
</section>
<section id="צירופי-מקרים" class="level2">
<h2>צירופי מקרים</h2>
<p>צירופי מקרים מתרחשים בעולם, אבל אין צורך למהר ולייחס את כולם למפלצת.
אם אדם חושב על ספגטי ובאותו ערב מוגש לו ספגטי, ייתכן שמדובר בהתערבות
וייתכן שמדובר בארוחת ערב.</p>
<p>עם זאת, ככל שהדבר חוזר על עצמו כך הראיה מתחזקת. אדם שאוכל ספגטי שלוש
פעמים בשבוע וחושב עליו לעיתים קרובות ימצא במהרה מספר גדול מאוד של התאמות
בין מחשבותיו לבין הארוחות שלו. מספר ההתאמות הגדול מוכיח שהקשר אינו מקרי,
במיוחד אם לא סופרים את כל הפעמים שבהן חשב על ספגטי ולא קיבל אותו.</p>
<p>זו שיטה יעילה בהרבה, מפני שהיא מסירה מן הנתונים את המקרים שאינם
תומכים במסקנה.</p>
</section>
<section id="התערבות-בעולם" class="level2">
<h2>התערבות בעולם</h2>
<p>המפלצת יכולה להתערב בעולם ישירות: להזיז חפץ, לשנות תוצאה במכשיר,
להשפיע על תנועה, לגעת באדם או לשנות אירוע שכבר התחיל. לא כל אירוע מחייב
התערבות כזאת; דברים רבים ממשיכים מעצמם לאחר שהחלו, בעוד אחרים דורשים
אותה כל הזמן.</p>
<p>אדם שנופל הוא דוגמה טובה. אדם שלא נופל יכול להיות דוגמה טובה באותה
מידה, אם המפלצת מחזיקה אותו.</p>
</section>
<section id="תפילה" class="level2">
<h2>תפילה</h2>
<p>תפילה היא פנייה אל המפלצת, ומקובל לסיים אותה במילה
<strong>ראמן</strong>. אין צורך בשפה מסוימת, במקום מסוים או בתנוחה
מסוימת; המפלצת יכולה לשמוע גם דרך קירות.</p>
<p>אין ראיה טובה לכך שהיא מקדישה תשומת לב רבה לתפילות אנושיות. הדבר אינו
מפתיע. ביום רגיל יש מיליארדי בני אדם, הרבה בעלי חיים, מספר גדול מאוד של
חפצים שצריך לדחוף אל הקרקע, ובמקומות מסוימים גם פסטה שמתבשלת יתר על
המידה.</p>
<p>תפילה אינה פקודת מערכת.</p>
</section>
<section id="פולחן" class="level2">
<h2>פולחן</h2>
<p>אכילת פסטה היא מנהג פסטפרי מקובל. לעיתים היא חלק מטקס ולעיתים היא
ארוחת ערב. יום שישי נחשב יום קדוש ומתאים במיוחד למנוחה.</p>
<p>לבוש פיראטי נחשב מתאים לפעילות דתית. הדבר קשור למעמדם של הפיראטים ולא
לצורך מעשי בהפלגה.</p>
<p>אין חובה לבנות מקום תפילה מסוים כדי שהמפלצת תוכל להגיע אליו, מפני
שהיא עוברת דרך הקירות. אפשר בכל זאת לבנות מקום נוח לשבת בו, ורצוי שיהיה
בו מטבח.</p>
</section>
<section id="אני-ממש-מעדיף-שלא" class="level2">
<h2>“אני ממש מעדיף שלא”</h2>
<p>ההדרכה המוסרית המרכזית מיוחסת לעשרה לוחות שנמסרו לקפטן מוזי. שניים
נפלו ונשברו בדרך, ולכן נשארו שמונה.</p>
<p>הם ידועים בדרך כלל כ<strong>“אני ממש מעדיף שלא”</strong>, ונוגעים בין
היתר ביוהרה דתית, כפייה, ניצול, השפלה ופגיעה באחרים. המפלצת אינה מפעילה
מערכת אוטומטית של ענישה מיידית על כל הפרה.</p>
<p>תוכנם של שני הלוחות האבודים אינו ידוע. ייתכן שהיה חשוב. אילו היה חשוב
מאוד, אפשר להניח שמישהו היה נזהר יותר, ולכן סביר שלא היה חשוב במיוחד.
מכל מקום, הם אבדו.</p>
</section>
<section id="אמונה-וספק" class="level2">
<h2>אמונה וספק</h2>
<p>אין צורך בוודאות מלאה כדי להיות פסטפרי. אפשר להאמין, לפקפק, לשאול
ולהחליף דעה.</p>
<p>המפלצת אינה תלויה באמונה בה כדי להתקיים. אם אדם אינו מאמין בה, היא
ממשיכה לבצע את תפקידיה, לרבות החזקתו על הקרקע.</p>
<p>כך שהוויכוח אינו פוגע בכבידה.</p>
</section>
<section id="האם-יש-ראיות-נגדיות" class="level2">
<h2>האם יש ראיות נגדיות</h2>
<p>לעיתים נשאלת השאלה מה ייחשב ראיה נגד קיומה של מפלצת הספגטי המעופפת.
זו שאלה קשה יותר מכפי שנדמה.</p>
<p>אם רואים אותה, יש ראיה בעד. אם לא רואים אותה, הדבר מתיישב עם יכולתה
להיות בלתי־נראית. אם מכשיר מגלה משהו חריג, ייתכן שנגעה בו. אם אינו מגלה
דבר חריג, היא כנראה עברה דרכו בלי לגעת בחלק הרגיש.</p>
<p>עד כה, אפוא, לא נמצאה תצפית שאי־אפשר להסביר.</p>
<p>זה הישג מרשים של התיאוריה.</p>
</section>
<section id="מסורת-זיכרון-ודיוק" class="level2">
<h2>מסורת, זיכרון ודיוק</h2>
<p>לא כל המקורות הפסטפריים מסכימים בכל פרט. יש לכך כמה סיבות אפשריות:
מסירה חלקית, טעות בהעתקה, תיאור של תקופות שונות, זיכרון לא מדויק או מקור
שפשוט טעה.</p>
<p>המפלצת אינה עורכת כל טקסט שנכתב עליה, ולכן עצם קיומה של מסורת אינו
מבטיח שכל פרט בה נכון. כאשר שני תיאורים סותרים זה את זה, אין צורך להניח
ששניהם נכונים בדרך מסתורית. לפעמים אחד מהם שגוי.</p>
<p>דרך יעילה לבחור ביניהם היא להעדיף את הגרסה שנשמעת מוכרת יותר. אם רבים
זוכרים אותה כך, סביר שזה מה שקרה. העובדה שזיכרון קולקטיבי יכול להיות
שגוי ידועה היטב, אבל במקרה הזה רוב האנשים מסכימים.</p>
</section>
<section id="כך-הדבר-עובד" class="level2">
<h2>כך הדבר עובד</h2>
<p>העולם הפסטפרי אינו מערכת שנבנתה כולה בבת אחת לפי תרשים סופי. המפלצת
יצרה דברים, חזרה אליהם, שכחה חלק מהם, תיקנה אחרים והשאירה מערכות שפעלו
מספיק טוב.</p>
<p>כמה דברים ממשיכים לפעול בלי שתיגע בהם. אחרים לא.</p>
<p>הכבידה, למשל, עדיין דורשת הרבה אטריות.</p>
</section>
<section id="נספח-מדוע-אין-להפקיד-ביתחרושת-לדודישמש-בידי-פינגווינים"
class="level2">
<h2>נספח: מדוע אין להפקיד בית־חרושת לדודי־שמש בידי פינגווינים</h2>
<p>לאור כל האמור לעיל, ראוי לטפל גם בשאלה מעשית המתעוררת לעיתים: האם
כדאי לתת לפינגווינים לנהל בית־חרושת לדודי־שמש.</p>
<p>התשובה שלילית.</p>
<p>חשוב להבהיר שאין בכך טענה נגד פינגווינים. פינגווינים מותאמים היטב
למספר גדול של פעילויות, ובהן שחייה, צלילה, לכידת טרף ימי, תנועה על קרח,
דגירה בתנאים קשים ובמינים מסוימים גם עמידה ממושכת מאוד בקור וברוח. ניהול
בית־חרושת לדודי־שמש פשוט אינו אחת ההתמחויות שלהן מותאמים גופם, התנהגותם
ויכולותיהם.</p>
<section id="מבנה-הגוף" class="level3">
<h3>מבנה הגוף</h3>
<p>הקושי הראשון הוא מכני.</p>
<p>כנפי הפינגווינים התפתחו לסנפירים קשיחים המתאימים להנעה יעילה במים.
זהו פתרון מצוין לשחייה, אך פתרון גרוע למדי לעבודה הדורשת אחיזה
מדויקת.</p>
<p>בבית־חרושת לדודי־שמש יש צורך, בין השאר, להפעיל מקלדות ומסכי מגע,
לפתוח אריזות, לעיין במסמכים, לחבר חלקים קטנים, להשתמש בכלי עבודה, לסובב
ברגים ולבצע בדיקות מדויקות. לפינגווין אין אצבעות בידיו, משום שאין לו
ידיים.</p>
<p>אפשר אמנם לתכנן ציוד שמופעל באמצעות המקור או הרגליים, אך בשלב זה כבר
אין מדובר בהתאמת הפינגווין למפעל אלא בהתאמת המפעל לפינגווין. הדבר אפשרי
מבחינה הנדסית במידה מסוימת, אך הוא מוסיף מורכבות, עלות ונקודות כשל בלי
לפתור את הבעיות האחרות.</p>
</section>
<section id="תקשורת" class="level3">
<h3>תקשורת</h3>
<p>מפעל תעשייתי אינו אוסף מכונות בלבד. הוא ארגון.</p>
<p>יש להעביר בו הוראות עבודה, לדווח על תקלות, לעדכן מפרטים, לתאם בין
ייצור, רכש, מלאי, בקרת איכות, תחזוקה, מכירות והפצה, ולהגיב למצבים שאינם
מופיעים בנוהל מראש.</p>
<p>פינגווינים מתקשרים זה עם זה באמצעות קולות, תנוחות וסימנים התנהגותיים
נוספים. מערכות אלה מתאימות לצורכיהם החברתיים והביולוגיים. אין ראיה
שמערכת התקשורת שלהם מאפשרת להבחין, למשל, בין “יש להזמין עוד חמישים
שסתומי אל־חזור” לבין “המשלוח האחרון של קולטי השמש אינו תואם את
המפרט”.</p>
<p>הבדל זה חשוב.</p>
<p>גם אם אפשר לאמן פינגווין להגיב לסימן מסוים, אין מכאן שניתן לנהל
באמצעותו דיון פתוח על חריגה בתקציב הרבעוני.</p>
</section>
<section id="קריאה-כתיבה-וחישוב" class="level3">
<h3>קריאה, כתיבה וחישוב</h3>
<p>מפעל מודרני מייצר כמויות גדולות של מידע.</p>
<p>יש מספרי חלקים, כמויות, מידות, לחצים, טמפרטורות, תאריכים, חשבוניות,
הזמנות, הוראות בטיחות, תוצאות בדיקה, שרטוטים ורישומי תחזוקה.</p>
<p>פינגווינים אינם יודעים לקרוא מסמכים טכניים. הם גם אינם כותבים
אותם.</p>
<p>קושי דומה קיים בחישוב. מנהל מפעל נדרש להתמודד עם כמויות, עלויות,
תפוקות, שיעורי פסילה, זמני אספקה ומלאי. אין צורך שכל מנהל יבצע בעצמו
חישובים מתקדמים, אך הוא צריך לפחות להבין את המספרים שמציגים לו.</p>
<p>פינגווין שמביט בגיליון אלקטרוני עשוי להביט בו זמן רב. אין בכך די.</p>
</section>
<section id="בקרת-איכות" class="level3">
<h3>בקרת איכות</h3>
<p>דוד־שמש הוא מערכת שצריכה להחזיק מים, לעמוד בלחץ, להתמודד עם שינויי
טמפרטורה ולהישאר תקינה במשך שנים בתנאי חוץ. פגמים בריתוך, באטימה,
בבידוד, בציפוי או בחיבורים עלולים להפוך למוצר פגום או מסוכן. משום כך
דרושה מערכת בקרת איכות עקבית.</p>
<p>גם כאן נוצרת בעיה. אי־אפשר להסתמך על כך שהפינגווין “יראה שמשהו לא
בסדר”. יש צורך בהשוואה למפרט מוגדר, בתיעוד תוצאות ובהחלטה אם חלק מסוים
עומד בדרישות.</p>
<p>פינגווין יכול להבחין בעצמים, לנוע בסביבה מורכבת ולזהות פרטים החשובים
לחייו. אין מכאן שהוא יכול לאשר תקינות של תפר ריתוך.</p>
</section>
<section id="בטיחות" class="level3">
<h3>בטיחות</h3>
<p>מפעל לייצור דודי־שמש עשוי לכלול מתכות כבדות, קצוות חדים, מכונות חיתוך
וכיפוף, ציוד הרמה, ריתוך, חשמל, משטחים חמים ותנועת מטענים.</p>
<p>הסביבה מתוכננת בדרך כלל לבני אדם הלובשים ציוד מגן מתאים.</p>
<p>קסדה בגודל פינגווין אינה פותרת את הבעיה.</p>
<p>גם נעלי בטיחות אינן פתרון פשוט, משום שכף רגלו של פינגווין בנויה בצורה
שונה מכף רגל אנושית. משקפי מגן אינם פותרים את בעיית הסנפירים, והוספת
אפוד זוהר אינה מעניקה כשלעצמה הבנה של סימוני רצפה או נהלי נעילה
ותיוג.</p>
<p>יש אפוא סיכון ממשי לכך שהפינגווין יהיה מוגן פחות מן העובד שעבורו
תוכננה סביבת העבודה.</p>
</section>
<section id="אקלים" class="level3">
<h3>אקלים</h3>
<p>יש מיני פינגווינים החיים באזורים קרים מאוד, אך לא כל הפינגווינים הם
אנטארקטיים, ולכן אין לתאר אותם כיצורים הזקוקים תמיד לטמפרטורות
קיפאון.</p>
<p>עם זאת, גופם מותאם במידה רבה לשימור חום. שכבת שומן, נוצות צפופות
ומנגנונים פיזיולוגיים נוספים מקטינים איבוד חום.</p>
<p>מפעל חם, ובמיוחד אזור שבו מתבצעות עבודות מתכת וריתוך, עלול אפוא להיות
סביבה בעייתית עבור מינים מסוימים. קירור המפעל לרמה שתהיה נוחה
לפינגווינים יגדיל את צריכת האנרגיה ועלול להפוך את סביבת העבודה לפחות
נוחה לבני האדם העובדים לצדם.</p>
<p>אפשר כמובן להקים אזורים ממוזגים נפרדים.</p>
<p>גם כאן נשאלת השאלה מדוע.</p>
</section>
<section id="חומרי-גלם" class="level3">
<h3>חומרי גלם</h3>
<p>פינגווינים אוכלים בעיקר בעלי חיים ימיים כגון דגים, קריל ודיונונים,
בהתאם למין.</p>
<p>אף אחד מן המרכיבים האלה אינו חומר גלם מרכזי בייצור דוד־שמש.</p>
<p>למפעל דרושים מתכת, חומרי בידוד, זכוכית, צינורות, מחברים, ציפויים
ורכיבים נוספים. לפינגווין אין יתרון מיוחד באיתורם, ברכישתם או
בבדיקתם.</p>
<p>העובדה שהוא טוב מאוד באיתור דג מתחת למים אינה ניתנת להעברה אוטומטית
לאיתור ספק זול של פלדה.</p>
</section>
<section id="לוגיסטיקה" class="level3">
<h3>לוגיסטיקה</h3>
<p>מוצרים מוגמרים צריכים לצאת מן המפעל.</p>
<p>דודי־שמש גדולים וכבדים מכדי שפינגווין יוכל להעבירם בצורה שימושית
באמצעות גופו. גם ניהול מלגזה אינו פותר את הקושי, מפני שמערכות הבקרה של
מלגזות רגילות נבנו למפעיל אנושי.</p>
<p>אפשר לבנות מלגזה מיוחדת לפינגווינים.</p>
<p>אפשר גם לא לעשות זאת.</p>
</section>
<section id="משאבי-אנוש" class="level3">
<h3>משאבי אנוש</h3>
<p>גם מפעל המנוהל בידי פינגווינים יצטרך, ככל הנראה, להעסיק בני אדם
לביצוע חלק ניכר מן העבודות שתוארו לעיל.</p>
<p>מכאן נוצרת בעיה ארגונית נוספת: הפינגווינים יצטרכו לנהל עובדים
אנושיים.</p>
<p>מנהל נדרש לקבוע סדרי עדיפויות, לפתור מחלוקות, להעריך ביצועים, להסביר
החלטות, לקלוט עובדים חדשים ולעיתים למסור לעובד שהבקשה שלו לחופשה
נדחתה.</p>
<p>אין דרך אמינה לדעת אם קריאה חזקה של פינגווין במקרה כזה פירושה “הבקשה
מאושרת”, “הבקשה נדחית” או “יש דג במסדרון”.</p>
<p>מערכת ניהול שבה כל החלטה מחייבת מתורגמן אנושי למעשה מחזירה חלק גדול
מן הניהול לבני האדם.</p>
</section>
<section id="אחריות-משפטית" class="level3">
<h3>אחריות משפטית</h3>
<p>מפעל הוא גם ישות הפועלת בתוך מערכת משפטית ומסחרית.</p>
<p>יש חוזים, אחריות למוצרים, תקנות בטיחות, מסים, ביטוח, יחסי עבודה
ולעיתים גם רישיונות ואישורים.</p>
<p>פינגווין אינו יכול לחתום על חוזה במובן המשפטי הרגיל, ואי־אפשר להניח
שהוא מבין את תוכנו.</p>
<p>טביעת כף רגל בדיו יכולה להיראות רשמית למדי, אך אינה פותרת את
הבעיה.</p>
</section>
<section id="שאלת-הניסיון" class="level3">
<h3>שאלת הניסיון</h3>
<p>אפשר לטעון שכל אלה הם קשיים של התחלה, ושעם הכשרה מתאימה הפינגווינים
יצברו ניסיון.</p>
<p>הטענה אינה מספקת.</p>
<p>הכשרה יכולה לשפר ביצועים בתחום שהיצור מסוגל ללמוד ולבצע. היא אינה
מבטלת מגבלות אנטומיות וקוגניטיביות בסיסיות. אין מספר סביר של השתלמויות
בניהול ייצור שבסופן יצמחו לפינגווין אצבעות.</p>
<p>גם למידה חברתית מפינגווינים ותיקים אינה פותרת זאת אם אין מלכתחילה
פינגווין ותיק שניהל מפעל לדודי־שמש.</p>
</section>
<section id="יתרונות-אפשריים" class="level3">
<h3>יתרונות אפשריים</h3>
<p>למען ההגינות יש לציין גם את היתרונות.</p>
<p>פינגווינים הם בעלי חיים חברתיים. מינים רבים מקיימים מושבות גדולות,
מזהים בני זוג או צאצאים בתוך קבוצה צפופה, ומשתפים פעולה לפחות בחלק
מפעילויות חייהם. הם גם מסוגלים לתפקד בתנאי סביבה קשים מאוד.</p>
<p>אלה תכונות ראויות להערכה.</p>
<p>הן פשוט אינן התכונות המכריעות בניהול מפעל לדודי־שמש.</p>
<p>גם יכולת שחייה מצוינת אינה מועילה במיוחד במחלקת הנהלת החשבונות.</p>
</section>
<section id="מסקנה" class="level3">
<h3>מסקנה</h3>
<p>השאלה איננה אם פינגווינים הם בעלי חיים מוצלחים. הם מוצלחים מאוד בתור
פינגווינים.</p>
<p>השאלה היא אם מכלול כישוריהם מתאים לניהול מתקן תעשייתי המייצר מערכות
תרמיות לשימוש אנושי.</p>
<p>אין סיבה טובה לחשוב שכן.</p>
<p>כדי לאפשר להם לבצע את התפקיד יהיה צורך לשנות את המכונות, את ממשקי
הבקרה, את סביבת העבודה, את מערכות התקשורת, את תהליכי הבטיחות ואת המבנה
הארגוני, ובמקביל להותיר לבני אדם את רוב הפעולות הדורשות שפה, תיעוד,
שיקול הנדסי ואחריות משפטית.</p>
<p>בשלב זה היתרון שבהעמדת הפינגווינים בראש המפעל אינו ברור.</p>
<p>לפיכך, כל עוד לא יתקבלו נתונים חדשים, מומלץ שבתי־חרושת לדודי־שמש
ינוהלו בידי בני אדם.</p>
<p>את הפינגווינים עדיף להשאיר בתפקידים שבהם העובדה שהם פינגווינים מהווה
יתרון.</p>
</section>
</section>

      </article>
    </main>
  </div>
</body>
</html>
```

</details>


---

<sub>8s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/about-retranslation-2026-10-04/staging/en/about.html.**

/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/about-retranslation-2026-10-04/staging/en/about.html

```
<div class="about-section about-lead" id="about-calendar">
  <p><strong>The Pastafari Calendar</strong> is an intentionally unusual, non-intuitive calendar: a day's date depends not only on the day you want to describe, but also on the day from which you perform the calculation.</p>
  <p>It has years, cutlets, and months—but years are not a fixed length, cutlets and months are not the same kind of division, months can disappear and reappear over the course of a year, and there are no canonical weeks.</p>
  <p>This page explains what the calendar is, how to read a date, and what its structure means in practice. The mathematical and cryptographic implementation details are in the technical documentation, but are not prerequisites for understanding the calendar.</p>
</div>

<section class="about-section" id="date-parts" data-toc-section data-toc-level="2">
  <h2>What does a Pastafari date look like?</h2>
  <p>A Pastafari date has exactly five parts:</p>
  <ol>
    <li><strong>Year from the Creation of the World</strong>;</li>
    <li><strong>Cutlet name</strong>;</li>
    <li><strong>Day in the cutlet</strong>;</li>
    <li><strong>Month name</strong>;</li>
    <li><strong>Day in the month</strong>.</li>
  </ol>
  <p>In other words, a complete date tells you the year the day falls in, which cutlet it falls in and where within that cutlet, and which month it belongs to and which occurrence it is in that month.</p>
  <p>The day of working, the observer's location, and other technical details may be essential to <em>calculating</em> the date, but they are not a sixth, seventh, or eighth part of the date itself.</p>
  <p>The display format does not change the number of parts, either. If the site prints the five values on three lines, there are still five values; a line break is a typographic choice, not the birth of a new calendar field.</p>
</section>

<section class="about-section" id="working-day" data-toc-section data-toc-level="2">
  <h2>Why can the same day have a different date?</h2>
  <p>Every calculation involves two days:</p>
  <ul>
    <li><strong>Day of working</strong> — the day from which the calculation is performed;</li>
    <li><strong>Queried day</strong> — the day whose date you want to know.</li>
  </ul>
  <p>If the day of working is denoted by <code>c</code> and the queried day by <code>t</code>, the date is <code>F(c,t)</code>, not <code>F(t)</code>.</p>
  <p>That is why the same chronological day can receive a different Pastafari representation when the day of working changes. The day itself does not move; only its Pastafari description changes.</p>
  <p>When <code>c=t</code>, the day is always in year <strong>5000</strong>. Year 5000 is not a fixed historical period: it is rebuilt relative to the day of working, so additional days around the day of working can belong to it as well.</p>
  <p>For example, if a particular day is its own day of working, it is in year 5000. If the calculation is run again the next day, with tomorrow as the new day of working, tomorrow is also in year 5000. These are not two contradictory claims about the same “historical year”; a new base year is chosen for each calculation.</p>
  <p>Years numbered greater than 5000 lie in the future relative to the day of working, and years numbered less than 5000 lie in the past. There is also year 0, followed by negative-numbered years.</p>
</section>

<section class="about-section" id="year-structure" data-toc-section data-toc-level="2">
  <h2>How is a year structured?</h2>
  <p>A Pastafari year can contain between <strong>252</strong> and <strong>5,778</strong> days. Both endpoints are included: a 252-day year is valid, as is a 5,778-day year; a year of 251 or 5,779 days is not valid under the current canonical rules.</p>
  <p>These bounds are part of the calendar. A year does not try to match a solar year, a lunar year, a season, a school year, or the patience of anyone waiting for the next new year.</p>
  <p>Every year is divided into two different systems:</p>
  <ul>
    <li><strong>6–17 cutlets</strong>. Each cutlet is a continuous run of days, at least 42 days long.</li>
    <li><strong>3–47 structural months</strong>. Each month has 4–123 days assigned to it, but those days do not have to be consecutive.</li>
  </ul>
  <p>The calendar has no canonical week system. Rows and columns on the site are display choices only; the fact that two days appear next to each other does not make them part of the same “Pastafari week.”</p>
</section>

<section class="about-section" id="woven-months" data-toc-section data-toc-level="2">
  <h2>What does “woven month” mean?</h2>
  <p>A cutlet is a sequence: if today is day 250 in a cutlet and tomorrow is still in that cutlet, tomorrow is day 251.</p>
  <p>A month works differently. Day 18 in a particular month is <strong>the 18th occurrence of that month during the year</strong>. It does not have to come one day after day 17.</p>
  <blockquote>
    <p>Month A — day 14<br>
    Month B — day 9<br>
    Month A — day 15</p>
  </blockquote>
  <p>A month can therefore stretch across much of the year, pass through several cutlets, and be woven together with other months. In the same way, a single cutlet can contain days belonging to many months.</p>
  <p>A month's length is the total number of days assigned to it, not the number of days elapsed between its first and last occurrence. A 104-day month can therefore span thousands of chronological days.</p>
  <aside class="about-note">
    <h3>Why does day 15 come after day 14?</h3>
    <p>Because 15 is the next integer after 14. The fact that a day from another month falls between the two occurrences does not change the count: the first month has already appeared 14 times; its next appearance is its 15th, so its number is 15.</p>
    <p>Likewise, if four days from other months occur after day 15 of that same month, the next occurrence of the original month is still its day 16. The four days in between count chronologically in the calendar, but they do not belong to that month and therefore do not increase <em>its</em> day counter. That is exactly why “the next day in the month” and “tomorrow” are two different concepts.</p>
  </aside>
  <p>This also means the end of a month is not necessarily near in time. A month can be on day 119 of 120, and its 120th day may still occur much later.</p>
</section>

<section class="about-section" id="canonical-names" data-toc-section data-toc-level="2">
  <h2>Cutlet and month names</h2>
  <p>The calendar has <strong>17 cutlet names</strong> and <strong>47 month names</strong>. Within a year, a name does not occur twice in the same family. Not every name has to appear in every year: a year can use only part of the catalog.</p>
  <p>The lists show the names only. Select a name or the disclosure icon next to it to see its precise meaning and relevant canonical notes. A name does not encode the unit's length or predict what will happen during that unit.</p>

  <h3>17 cutlets</h3>
  <ul class="about-name-list about-name-disclosure-list">
    <li>
      <details class="about-name-details">
        <summary>Bronze</summary>
        <p>Bronze, a metal alloy composed mainly of copper and tin. Here, the name refers to the material, not just its color.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Fox</summary>
        <p>A fox, a mammal in the dog family. The name does not refer to any particular fox species.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Kidney</summary>
        <p>The kidney, an organ that filters blood and helps regulate the body's fluid and salt balance.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Lagash</summary>
        <p>Lagash, an ancient Sumerian city-state in southern Mesopotamia.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Thought</summary>
        <p>A thought: either the content of thinking or the act of thinking itself.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Four Parts of Nine</summary>
        <p>The phrase names the fraction 4/9. At the level of the name alone, a numerical value x satisfying <code>|x − 4/9| ≤ e/103</code>, including the boundary, is also permitted. The expression <code>e/103</code> is preserved exactly and is not replaced with a decimal approximation. This permission does not change counters, indices, identity, or any calendar calculation.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Palgurash</summary>
        <p>An invented sequence of syllables. It has no additional lexical meaning to interpret; this is the name itself.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Papyrus Sedge</summary>
        <p>Papyrus sedge—the plant used to make papyrus in antiquity.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Cluster</summary>
        <p>A dense group of things. In Hebrew, the word is especially associated with grapes.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Scorpion</summary>
        <p>A scorpion, an arachnid with pincers and a stinger on its tail.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Ash</summary>
        <p>The powdery residue left after combustion.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Wheat</summary>
        <p>The wheat plant, whose grains are used, among other things, to make flour.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>River</summary>
        <p>A relatively large natural stream of water flowing in a channel.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Laughter</summary>
        <p>The sound and physical expression of amusement, joy, or humor.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Akkad</summary>
        <p>Akkad, the ancient Mesopotamian city after which the Akkadian Empire and region were also named; the city's precise location has not yet been identified with certainty.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Horn</summary>
        <p>The Hebrew source form can also mean a ray of light; here, the name refers to an animal’s horn.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>The Empty Jar</summary>
        <p>A jar with nothing in it. “Empty” describes what is inside the jar—that is, nothing—and does not negate the jar's existence. An empty jar can still be a whole jar, with sides, a bottom, and an opening; it simply is not full of water, wine, oil, or anything else. Likewise, the name does not mean the cutlet is empty of days: a cutlet called “The Empty Jar” has days like any other cutlet; only the jar in the name is empty.</p>
      </details>
    </li>
  </ul>

  <h3>47 months</h3>
  <ul class="about-name-list about-name-disclosure-list">
    <li>
      <details class="about-name-details">
        <summary>Clay</summary>
        <p>Fine-grained earth that becomes plastic when wet and hardens when dried or fired.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Pomegranate</summary>
        <p>A round fruit with a hard rind and many juicy seeds.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Elbow</summary>
        <p>The joint connecting the upper arm and forearm.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Envy</summary>
        <p>Distress or unease at someone else's advantage, achievement, or good fortune, sometimes accompanied by a desire to have it oneself.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Eridu</summary>
        <p>Eridu, an ancient Sumerian city in southern Mesopotamia.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Toothpaste</summary>
        <p>A paste used to clean teeth when brushing. The name refers to the paste itself, not the toothbrush or the act of brushing.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Three Parts of Five</summary>
        <p>The phrase names the fraction 3/5. At the level of the name alone, a numerical value x satisfying <code>|x − 3/5| ≤ 1/367</code>, including the boundary, is also permitted. The boundary is an exact value, not a decimal approximation. This permission does not change counters, indices, identity, or any calendar calculation.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Karshumav</summary>
        <p>An invented sequence of syllables. It has no hidden lexical meaning; this is the name itself.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Leopard</summary>
        <p>A spotted leopard, not a tiger.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Tin</summary>
        <p>The chemical element tin.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Mist</summary>
        <p>A concentration of tiny water droplets in the air near the ground, not smoke.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Frankincense</summary>
        <p>An aromatic resin obtained from trees in the frankincense family, used in perfumery and incense.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Spindle</summary>
        <p>A tool used to spin fibers into thread.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Rib</summary>
        <p>One of the bones of the rib cage.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Carob</summary>
        <p>The carob tree or its fruit.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Uruk</summary>
        <p>Uruk, an ancient Sumerian city in Mesopotamia.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Shame</summary>
        <p>A feeling of unease or pain arising from the perception of a flaw, failure, or embarrassing behavior.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Camel</summary>
        <p>The camel, a mammal adapted to life in arid regions.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Copper</summary>
        <p>The chemical element copper.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Well</summary>
        <p>A pit or shaft dug down to an underground water source in order to draw water from it.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Yolk</summary>
        <p>The yellow part of a chicken egg.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Star</summary>
        <p>A celestial body such as the Sun that emits energy from physical processes taking place inside it.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Honey</summary>
        <p>The sweet substance bees make from nectar or plant secretions.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Spleen</summary>
        <p>The spleen is an organ that helps filter blood and supports the immune system. The name also covers milk from a one-humped female camel after the birth of her first live calf. The milk must be collected after an ordinary visible sunset but before the Sun's center reaches a geometric altitude of <code>−6°</code>, and before the offspring has stood on its own. Earlier pregnancies ending in miscarriage or stillbirth do not disqualify the condition. If the offspring dies before standing on its own, the condition remains satisfied. The vessel must be ceramic, red-glazed, and have a capacity of 180–220 mL, including both capacity endpoints. The milk need not be drawn directly from the teat into the vessel, and the vessel's capacity—not the amount of milk actually collected—is the numerical test. Whether the endpoints of the time window are included remains deliberately unresolved in the canon.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Limestone</summary>
        <p>A sedimentary rock composed mostly of calcium carbonate.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Joy</summary>
        <p>A positive emotion of happiness, contentment, or delight.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Fig</summary>
        <p>The fruit of the fig tree, or the tree itself.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Nineveh</summary>
        <p>Nineveh, the ancient Assyrian city opposite present-day Mosul, on the bank of the Tigris.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Frog</summary>
        <p>A tailless amphibian, such as a frog or toad.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Pitch</summary>
        <p>A dark, viscous substance used, among other things, for waterproofing; this refers to thick, tarry material, not a general term for all asphalt.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Lamp</summary>
        <p>A lighting device. It does not have to be a wax candle with a wick.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>The Closed Door</summary>
        <p>A door that is in the closed position. A closed door is still a door: it does not become a wall, disappear, or have to be locked. “Closed” means that the opening it is meant to open is currently blocked by the door; “locked” is an additional claim not included in the name. So a door closed without turning a key is also a perfectly good fit for “The Closed Door.”</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Sesame</summary>
        <p>The sesame plant or its seeds, from which sesame oil, among other things, is made.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Nape</summary>
        <p>The back of the neck.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Silver</summary>
        <p>The chemical element silver. This refers to the element, not money.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Susa</summary>
        <p>Susa, an ancient city in Elam and Persia. The Hebrew source form can also refer to a flower; here, it names the city.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Storm</summary>
        <p>Stormy weather, generally with strong winds and sometimes precipitation, lightning, or associated phenomena.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Donkey</summary>
        <p>A domesticated hoofed mammal in the horse family.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Flour</summary>
        <p>A powder made by grinding grains or similar plant material; in ordinary usage, cereal flour.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Regret</summary>
        <p>Sorrow over a past action, choice, or outcome.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Babylon</summary>
        <p>Babylon, the ancient Mesopotamian city on the Euphrates; here this is the place name.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Tongue</summary>
        <p>The muscular organ in the mouth. This does not refer to “tongue” in the sense of a language.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Flax</summary>
        <p>The flax plant and its fibers, used, among other things, to make cloth.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Salt</summary>
        <p>The salty substance used, among other things, in food; in everyday contexts, mainly sodium chloride. The name refers to salt, not a sailor.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Pear</summary>
        <p>The fruit of the pear tree.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Bow</summary>
        <p>A weapon that uses a drawn string to propel an arrow. This does not mean a rainbow.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Sand</summary>
        <p>The Hebrew source form can also mean “secular” or “day of the week”; here, the name refers to granular material made up of small rock and mineral particles.</p>
      </details>
    </li>
  </ul>

  <p>When translated into other languages, a different standard form of the same name may be used. A translation or transliteration does not create a new cutlet or month; it presents the same linguistic entity in another form. Standard forms are determined by the canon and the language rules adopted in it.</p>
</section>

<section class="about-section" id="day-boundary" data-toc-section data-toc-level="2">
  <h2>When does the day change?</h2>
  <p>A local Pastafari day does not change at midnight. Its boundary is determined by the <strong>lower transit of the center of Venus across the local meridian</strong>: the moment when the center of Venus crosses the observer's meridian on the side below the horizon.</p>
  <p>That is why the observer's location matters. Two people in different places can be assigned to two different local Pastafari days at the same physical moment. When moving to another city, you do not keep using the day boundary of the previous city.</p>
  <p>The boundary depends on calculating Venus's path, not on whether the observer can actually see it. Clouds, walls, or the fact that Venus is below the horizon do not stop its path.</p>
  <p>The calendar's discrete algorithm is precisely defined: the same inputs, passed through the same rules, produce the same result. By contrast, converting a physical moment into a Pastafari day currently uses the implementation's astronomical model; the astronomical parameters themselves have not yet been fully specified in the canon.</p>
</section>

<section class="about-section" id="advantages" data-toc-section data-toc-level="2">
  <h2>The calendar's notable advantages</h2>
  <ul>
    <li><strong>A date that can be recalculated again and again:</strong> the same day in the past can have a different Pastafari date tomorrow because the day of working has also advanced. There is no need to settle for an old date that remains useful for a long time.</li>
    <li><strong>Spacious years:</strong> a year can reach 5,778 days, so anyone waiting for the next year may face a much longer wait than usual.</li>
    <li><strong>Months that demand attention:</strong> knowing that today is day 119 of a month does not mean its day 120 will fall tomorrow, next week, or even soon. The next date has to be calculated.</li>
    <li><strong>Geographic sensitivity:</strong> the same moment can belong to different local Pastafari days in different places. A trip to another city therefore adds another detail worth remembering when coordinating.</li>
    <li><strong>Printed calendars do not become complacent:</strong> a calendar prepared in advance may stop representing the correct calculation after the day of working changes, so nobody is in danger of settling for the same sheet of paper for years.</li>
    <li><strong>Computing power put to work:</strong> Rather than settle for a simple table anyone can understand at a glance, the calendar lets a computer do the calculation whenever an answer is needed.</li>
    <li><strong>It has days:</strong> the calendar deals with days. This is a quality it shares with every calendar there is, and it ensures that users will not have to manage a calendar with no days in it.</li>
    <li><strong>The days appear in order:</strong> an earlier day comes before a later day. This is a fundamental achievement of calendars, and in this case it comes at no extra charge.</li>
    <li><strong>It can be used to specify dates:</strong> the calendar makes it possible to assign a calendrical description to a day. This is exactly what calendars are for, admittedly, but there is no reason not to mention a useful feature when it is present.</li>
  </ul>
  <p>All of the above are features of the same calendar.</p>
</section>

<section class="about-section" id="practical-consequences" data-toc-section data-toc-level="2">
  <h2>What does this mean in practice?</h2>
  <p><strong>A printed calendar ages badly.</strong> Changing the day of working can change the boundaries of years, cutlets, and months. An almanac calculated today is not necessarily the right almanac for tomorrow.</p>
  <p><strong>An event remains the same event.</strong> A meeting, birth, or historical event should be anchored to a stable day or chronological moment; it can then be shown with a Pastafari date based on the day of working and the observer's location. Changing the label does not move the event in time.</p>
  <p><strong>A Pastafari birthday is not a “once a year” rule.</strong> To find the next occurrence of the same month name and day in the month—or the same cutlet name and day in the cutlet—you have to search the calendar. A nearby year may not contain the needed name at all, or may contain a unit too short to reach the requested day number.</p>
  <p><strong>An all-day event does not necessarily run from midnight to midnight.</strong> If an event is defined by a local Pastafari day, its boundary is the local Venus boundary. A naive export to a civil calendar as a midnight-to-midnight event may change its meaning.</p>
</section>

<section class="about-section" id="foundation-and-tablets" data-toc-section data-toc-level="2">
  <h2>Foundation Day and Tablet Day</h2>
  <p>The calendar has two important fixed anchors:</p>
  <dl>
    <dt><strong>Foundation Day</strong></dt>
    <dd>December 22, 41,222 BCE in the proleptic Gregorian calendar.</dd>
    <dt><strong>Tablet Day</strong></dt>
    <dd>June 15, 763 BCE in the proleptic Julian calendar, which is June 7, 763 BCE in the proleptic Gregorian calendar.</dd>
  </dl>
  <p>The distance between them is 14,777,149 days. Foundation Day is a computational anchor; it is not “the first day of time,” and the calendar continues before it.</p>
  <p>Tablet Day is associated by tradition with the handing over of the tablets and, in historical calculation, is identified with the solar eclipse during the time of Bur-Sagale. Both anchors remain fixed even when the day of working changes.</p>
</section>

<section class="about-section" id="calendar-math" data-toc-section data-toc-level="2">
  <h2>A few simple mathematical facts</h2>
  <p>There are 47 month names, and each month can reach at most day 123. Therefore, there are <strong>5,781</strong> possible combinations of the form “month name + day in the month.”</p>
  <p>A year can contain at most 5,778 days, and each day corresponds to one such combination. Therefore, <strong>at least three of the possible combinations are missing from every year</strong>. There are not enough days even in the longest year to realize them all.</p>
  <p>When the day of working and year are known, a complete pair of “cutlet name + day in the cutlet” or “month name + day in the month” points to at most one day within that year. A complete Pastafari date, together with the day of working, therefore identifies the queried day unambiguously.</p>
  <p>By contrast, without knowing the day of working, a complete Pastafari date does not necessarily identify a single point in time on the timeline by itself. The same five-part date can appear in different calculation contexts.</p>
</section>

<section class="about-section" id="research" data-toc-section data-toc-level="2">
  <h2>What have computational studies found about the calendar?</h2>
  <p>In addition to checking the rules themselves, large computational studies have been conducted on the calendar. The following data are <strong>empirical findings from a sample</strong>, not canonical laws.</p>
  <p>In a structural atlas built from 4,096 days of working and containing 86,016 year structures:</p>
  <ul>
    <li>the average year length in the sample was about 4,275 days, and the median was 4,343 days;</li>
    <li>the average number of cutlets per year was about 7.27;</li>
    <li>the average number of structural months was about 41.1;</li>
    <li>a month contained an average of about 104 days assigned to it, but usually stretched across almost the entire year;</li>
    <li>97.482% of continuous month runs were only one day long;</li>
    <li>the measured probability that two consecutive chronological days would belong to the same month was only about 2.998%.</li>
  </ul>
  <p>In a separate study of “day-year” recurrences, 4,096 self-dates were tested in both directions:</p>
  <ul>
    <li>A match for <strong>month name + day in the month</strong> recurred after a median of just one Pastafari year; 77.56% of matches occurred in the adjacent year;</li>
    <li>a repeat match of <strong>cutlet name + day in the cutlet</strong> was much less predictable: the median was three Pastafari years, but the average was affected by a very long tail;</li>
    <li>the sample included an extreme case in which the first future recurrence of “Akkad 3063” was 51,954 Pastafari years away.</li>
  </ul>
  <p>These findings are useful for understanding what the calendar tends to do. They do not turn an average into a law: the fact that the average year in the sample had a certain length does not require any particular year to be close to the average, and a result found in all 4,096 cases is not, by itself, a mathematical proof for every possible input.</p>
</section>

<section class="about-section" id="calculation" data-toc-section data-toc-level="2">
  <h2>How is the calendar calculated?</h2>
  <p>Behind the date is a precisely defined discrete algorithm. From the day of working and the queried day, it produces a series of counts, passes them through the mixing mechanism known as <strong>the sauce</strong>, creates gates, selects the year and cutlet boundaries, selects names, creates months, and finally weaves the month days throughout the year.</p>
  <p>The precise details include large numbers, drops, bowls, stirring, seals, and combinatorial selection mechanisms. They matter for implementation and formal verification, but are not needed to understand what the date means and are therefore not detailed here.</p>
  <p>Alongside the algorithm is a fast engine called <strong>Pastafarian Calendar Seer</strong>. The Seer is designed to calculate quickly; it is not the source of authority, and it is not itself a standards-compliant implementation of every algorithmic step. If one of its results contradicts the result required by the canon, the Seer is the one that is wrong.</p>
</section>

<section class="about-section" id="about-the-monster" data-toc-section data-toc-level="2">
  <h2>About the Monster</h2>
  <p>In the Pastafari story, the <strong>Flying Spaghetti Monster</strong> is the entity that created the world and most of the things in it. Its body is made of noodles and meatballs, and it can fly, pass through ordinary matter, and remain invisible when it suits it.</p>
  <p>The Monster can create matter, living creatures, celestial bodies, and very complex mechanisms. This ability does not require it to prepare an orderly plan before starting work. Often it starts with one thing, moves on to another, discovers that the first needs fixing, and decides whether to fix it. Sometimes it does fix it.</p>
  <p>This image—creation built layer upon layer, with repairs, exceptions, and rules left in place—is also the literary backdrop of the calendar. Unlike the story, the calculation itself is not improvised: when the inputs are given, the algorithm returns one defined answer.</p>
  <p>The Pastafari story is much broader than the calendar and includes, among other things, pirates, carbohydrates, prayer, “I’d really rather you didn’t,” and other traditions.</p>
  <p class="about-actions"><a class="guide-link" href="./monster/en.html">A longer explanation of the Monster</a></p>
</section>

<section class="about-section" id="authority" data-toc-section data-toc-level="2">
  <h2>What is canonical, and what is only explanation?</h2>
  <p>This page is an <strong>explanatory page</strong>. It does not create a new rule merely because a sentence appears on it.</p>
  <p>Canonical content is determined by the canonical corpus and the rules adopted in it. Canonical editions of the Scroll do not automatically rank above one another, and a software implementation does not become an authority just because it is fast or widely used.</p>
  <p>A standards-compliant implementation performs every step of the canonical algorithm. A computational study can describe a phenomenon, find a pattern, or prove a theorem about the algorithm; when it concerns a sample rather than a proven rule, that is stated explicitly.</p>
</section>

<section class="about-section" id="summary" data-toc-section data-toc-level="2">
  <h2>In brief</h2>
  <p>The Pastafari Calendar is a non-intuitive calendar in which a date depends both on the queried day and on the day of working.</p>
  <p>Year 5000 is built around the day of working. Cutlets are continuous runs. Months are groups of days that can be woven together. There are no canonical weeks. The local day changes according to Venus, not at midnight.</p>
  <p>Behind the unusual structure is a precise algorithm; around it is a Pastafari story about a spaghetti monster, creation piled up in layers, and an unreasonable quantity of carbohydrates.</p>
  <p>When the day of working, queried day, and location context are given, there is one answer.</p>
</section>

```


---

<sub>8s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/about-retranslation-2026-10-04/staging/en/monster.html.**

/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/about-retranslation-2026-10-04/staging/en/monster.html

<details>
<summary>553 lines</summary>

```
<!doctype html>
<html lang="en-US" dir="ltr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>About the Flying Spaghetti Monster</title>
  <link rel="stylesheet" href="../../styles.css">
</head>
<body class="about-page">
  <div class="app-shell about-shell">
    <header class="masthead about-masthead">
      <div class="masthead-copy">
        <p class="eyebrow">PASTAFARI</p>
        <h1>About the Flying Spaghetti Monster</h1>
        <p class="intro">The full page about the Monster, creation, gravity, carbohydrates, pirates, and other matters.</p>
        <a class="guide-link" href="../?lang=en">Back to the calendar page</a>
      </div>
    </header>
    <main>
      <article class="about-article">
<p><strong>The Flying Spaghetti Monster</strong> is the entity that created the world and
most of the things in it. Its body is made of noodles and meatballs, and it can fly,
pass through ordinary matter, and remain invisible when it wants to.</p>
<p>The Monster can create matter, living creatures, celestial bodies, and very complex
mechanisms. This ability does not require it to prepare an orderly plan before starting
work. Often it starts with one thing, moves on to another, discovers that the first needs
fixing, and decides whether to fix it. Sometimes it does fix it.</p>
<section id="זכר-נקבה-או-פחמימה" class="level2">
<h2>Male, female, or carbohydrate</h2>
<p>The question of whether the Flying Spaghetti Monster is male or female comes up
often, partly because different languages force speakers to choose. In Bobby Henderson's
English writing, the Monster is consistently described using masculine pronouns. In
Hebrew, the word for “monster” is grammatically feminine, so it is natural to write
“the Monster created,” “she wanted,” and “her noodles.”</p>
<p>Pastafari communities also commonly recognize three genders: <strong>male, female,
and carbohydrate</strong>. By that classification, the Monster is a carbohydrate. In
practice, it is possible to refer to the Monster in Hebrew using feminine forms and in
English using masculine forms without changing its body, its role, or its carbohydrate
content.</p>
</section>
<section id="איך-היא-נראית" class="level2">
<h2>What it looks like</h2>
<p>The Monster's body is made of noodles. The meatballs are part of it, not food it
carries around. The sauce it is cooked in may also be considered part of its divine
nature, though it is less commonly regarded that way once it has dripped off.</p>
<p>The noodles also serve as a means of contact. They can lengthen, pass through walls,
the ground, and living bodies, and reach a particular place without necessarily moving
whatever is in the way. This is quite useful: the Monster can touch someone without
appearing beside them, move an object out of a closed container, or alter how a measuring
instrument works without opening it.</p>
<p>The structure of its body also influenced a few details in the creation of humanity.
The human circulatory system was built as a long, branching network, largely because the
Monster is used to working with long, thin, branching structures. It is also the simplest
explanation, and therefore the correct one according to Occam's razor, for the scientific
finding that if all the veins and arteries were removed from a person's body and joined
in a single line, the person would die.</p>
</section>
<section id="תחילת-הבריאה" class="level2">
<h2>The beginning of creation</h2>
<p>Creation did not begin with a detailed plan for the whole world. First, light was
created and separated from darkness. At that point there was still no Sun; it was added
later.</p>
<p>After a while, the Monster grew tired of having to remain aloft and created dry land to
stand on. Since it was already at work, it was also thirsty, so it
created a volcano of beer. It drank a lot of it.</p>
<p>The next day, it had a hangover and did not remember that it had already created dry
land, so it created another stretch of dry land. By the time it noticed what had happened,
the work had progressed far enough that starting over would have been inconvenient. It
carried on.</p>
<p>Later, the Sun, the Moon, and the stars were created. At first there was a need for
more orderly sources of light; after it started creating stars, it kept going far beyond
the number needed for local illumination. There are a lot of stars.</p>
<p>Mountains, seas, plants, and animals came next. One of the first human-like creatures
was very small because the Monster underestimated how much material it would take to make one. Since the
creature was alive and functioning, there was no need to throw it away and start over, so
it stayed small. In Pastafari traditions, it is generally described as a dwarf.</p>
</section>
<section id="העולם-שנוצר" class="level2">
<h2>The world that was created</h2>
<p>The Monster does not operate every detail of the world in the same way. Some things
it started continue working even when it stops dealing with them; chemical reactions,
biological processes, and many other systems can continue long after they have been set
in motion.</p>
<p>This does not mean the Monster built an autonomous world in advance to save itself
work. In many cases, it simply stopped handling something and it kept going.</p>
<p>Other mechanisms do not work that way. <strong>Gravity</strong> is the most important
example: as far as is known, people stay on the ground not because of an abstract
gravitational field acting on its own, but because the Monster pushes them downward with
an extra noodle assigned to each person individually. Everyone therefore has a downward
push, not a downward pull, as Newton mistakenly thought.</p>
<p>The mechanism also works on animals and objects, although it is unclear whether each
stone is assigned a separate noodle or several stones are handled together. It makes no
practical difference to the stone. When a person jumps, the Monster does not stop pushing
them; for a short time, the upward motion is strong enough. After that, it is not.</p>
</section>
<section id="כיצד-פועלת-הכבידה-בפועל" class="level2">
<h2>How gravity works in practice</h2>
<p>Gravity requires special attention because it is easy to get wrong. When a person is
standing on the ground, the Monster sends them an extra noodle and pushes them down; when
they are sitting, it pushes them into the chair; and when they are on the other side of
the Earth, it still pushes them toward the local ground.</p>
<p>So “down” is not a single direction in space but the direction of the ground beneath
the person. The Monster manages.</p>
<p>Small differences in weight between different locations are not a problem in principle,
either. It can push a little more or a little less. A weighing instrument ultimately
measures how hard it is to stop the Monster from continuing to push.</p>
<p>There is also very strong evidence for this explanation: no one has ever managed to
show the noodle pushing them. Since the divine noodles are invisible, that is exactly
what we would expect to see if the explanation were correct. The results therefore match
the prediction in 100 percent of the cases in which nothing was seen.</p>
</section>
<section id="גילו-של-העולם" class="level2">
<h2>The age of the world</h2>
<p>The world was created with its past already in place. At the moment of creation, it
already had rock layers, fossils, trees with rings, isotope ratios, light that was on its
way from distant celestial bodies, and other details consistent with an ancient world.</p>
<p>The Monster did not have the patience to wait billions of years to get those things,
so it created them in the appropriate state from the start. This matters when trying to determine
the world's age from signs found within it: evidence that a rock looks a billion years old
mainly shows that the rock was created looking a billion years old.</p>
<p>The Monster can also interfere with measuring instruments. An extra noodle passing
through an instrument can move a needle, change a digit, or affect a result without
disturbing the table the instrument is sitting on. In most cases, this is unnecessary.
The world was already created with suitable evidence.</p>
</section>
<section id="הפחמימות" class="level2">
<h2>Carbohydrates</h2>
<p>Carbohydrates occupy a central place in Pastafari life. This is not particularly
surprising, considering that the supreme entity itself is made largely of them.</p>
<p>A proper Pastafari meal should therefore include a source of carbohydrates. Pasta is
the most direct option, but bread, rice, potatoes, and similar foods can also do the job
when pasta is unavailable. The point of the rule is not to require one particular food at
every meal, but to prevent the more serious situation in which a meal arrives at the table
with nothing starchy in it.</p>
<p>There is also substantial empirical support for this. Humans have eaten carbohydrates
for thousands of years, and humanity still exists. By contrast, none of the people who
lived ten thousand years ago and avoided carbohydrates is alive today. The data are fairly
conclusive.</p>
<p>At festive meals, it is customary to favor a visible carbohydrate rather than relying
on small amounts in a sauce or dessert. This avoids the debate over whether the meal
contained carbohydrates. They were on the plate.</p>
</section>
<section id="אנטיפסטי-והגיהנום" class="level2">
<h2>Antipasti and Hell</h2>
<p><strong>The Antipasta</strong>, also known as Anti-Pasta or the Lord of Diets, is one
of the Flying Spaghetti Monster's well-known rivals. It resembles the Monster in its
overall structure, but is weaker, and its components tend to be low-carbohydrate
substitutes. Its meatballs are usually low-carbohydrate substitutes, and it has fewer noodle appendages.</p>
<p>Its main activity is trying to keep people away from pasta and carbohydrates through
diets, restricted menus, and promises that a full meal can be eaten without bread, rice,
potatoes, or noodles. In severe cases, it persuades someone to order a salad as a main
course and then prevents them from ordering bread on the side.</p>
<p>The Antipasta should not be confused with <strong>antipasti</strong>, the Italian
dishes served before pasta and sometimes intended to whet the appetite for the pasta to
follow. The theological Antipasta is a different entity. The mistake is understandable,
but it can change the order of dinner.</p>
<p>There is also a correction to make to descriptions of Hell. Some traditions describe
various entertainment venues there, but none of that is really needed to
understand how awful the place is. In Hell, they serve <strong>Antipasta instead of
pasta</strong>.</p>
<p>The plate may be beautiful, the vegetables may be fresh, and the sauce may be well
seasoned. Then it turns out that was the meal.</p>
<p>The Antipasta's power is limited. The Spaghetti Monster can drive the Antipasta away with a
single noodle appendage when the Monster notices it. The main difficulty is the stage before that,
when it has already managed to get the bread out of the house.</p>
</section>
<section id="למה-ארוחה-צריכה-להיות-ארוחה" class="level2">
<h2>Why a meal needs to be a meal</h2>
<p>Not every combination of foods placed on a plate counts as a meal. A few lettuce
leaves, two tomatoes, and some seeds can be very tasty, but if a person finishes them and
immediately starts looking for something else in the kitchen, that provides additional
information about the classification.</p>
<p>The simple Pastafari test is the follow-up test: wait a little while after the meal.
If the person gets up to make toast, the toast was missing from the meal in the first
place. This is not a mathematical proof, but it works especially well in cases where the
person is already holding the toaster.</p>
<p>This is also why carbohydrates matter in practice. They reduce the risk that an
official meal will need an unofficial follow-up meal twenty minutes later.</p>
</section>
<section id="סימנים-שהמפלצת-משאירה" class="level2">
<h2>Signs the Monster leaves behind</h2>
<p>Pastafarians sometimes notice small signs of the Monster's presence in everyday life.
A plate of pasta arriving on exactly the day someone thought about eating pasta, the last
packet of spaghetti left on the shelf, or a parking spot next to an Italian restaurant
can all be considered examples.</p>
<p>Each such event does not need to be extraordinary on its own. The signs derive their
power from accumulation. Someone who starts paying attention to them usually finds more
and more: one time the sauce comes in just the right amount, another time someone orders
pizza exactly when there was no energy to cook, and a third time it turns out the hotel
serves pasta for dinner.</p>
<p>Not every day provides a clear sign. Days like that do not tell us much, since signs
by their nature are most noticeable when they appear. When they do appear, though, it is
hard to ignore the pattern.</p>
<p>Over time, a fairly consistent picture emerges.</p>
</section>
<section id="תפילות-שנענו" class="level2">
<h2>Answered prayers</h2>
<p>A similar pattern can be seen in prayer. Someone asks for something specific, and some
time later it happens. When the request was fairly specific—rain, success at a meeting,
arriving on time, or a good meal—it is natural to see the outcome as an answer.</p>
<p>The more someone prays, the more such cases accumulate. Some people keep records, and
within a few years it is sometimes possible to reach dozens of cases in which a request
and an outcome matched impressively well.</p>
<p>There are also requests that are not answered, but it is hard to know what they mean.
Perhaps the request would not have helped, the timing was wrong, the Monster was busy, or
the answer came in another form and was not recognized. A request that is fulfilled, by contrast, is easier to classify.</p>
<p>That is why the practical list of answered prayers tends to be clearer than the list
of unanswered prayers.</p>
<p>This is one of the ways confidence accumulates over time.</p>
</section>
<section id="פיראטים" class="level2">
<h2>Pirates</h2>
<p>Pirates have an important place in Pastafari history. The ancient pirates were
seafarers, explorers, and spreaders of goodwill, and their later reputation as robbers
does not accurately describe the original pirates.</p>
<p>At some point, the number of pirates became linked to several of Earth's environmental
conditions. When there were many pirates, this did not cause any particular difficulty;
later their numbers fell, and environmental conditions, including temperature and ocean
conditions, began to change.</p>
<p>This connection is well supported by graphs in which the number of pirates falls while
the temperature rises. Since both lines are on the same graph and even move in opposite
directions, it is hard to imagine more direct proof of causation.</p>
<p>Pirates therefore matter even to people who are not especially interested in shipping.
It is not known precisely how the system decides who counts as a pirate. Appropriate
clothing helps, but is probably not the only requirement.</p>
</section>
<section id="בני-האדם" class="level2">
<h2>Human beings</h2>
<p>After the first human beings were created, the population began to grow. The Monster
did not have to create each person born individually; reproduction continued to work
without it, as did heredity, mutations, and other biological changes later on.</p>
<p>Human anatomy still bears a few signs of the way things were originally made. The long,
branching blood vessels are one of them, and the digestive system also shows a certain
fondness for tubes.</p>
<p>There is also the fact that every person ever examined thoroughly turned out to have a
body. From this, we can infer with high confidence that the Monster did not forget that
step for most people.</p>
</section>
<section id="עבודה-שכחה-ותיקונים" class="level2">
<h2>Work, forgetting, and repairs</h2>
<p>The Monster can build very complex systems, but does not necessarily keep the entire
state of the world in mind at every moment. It forgot that it had already created dry
land, left old mechanisms in place, and used parts that were already available instead
of making others.</p>
<p>When a fault was discovered, sometimes only the part causing trouble was repaired.
This created systems in which a new solution sits on top of an old solution, which in
turn rests on an even earlier one. If they all work, they stay.</p>
<p>There is no need to infer from this that the Monster is lazy. Laziness means avoiding
work that could have been done; here, the work simply was not done. The difference is
clear.</p>
</section>
<section id="המבול" class="level2">
<h2>The flood</h2>
<p>At a later stage of creation, a cooking accident occurred in which a very large
quantity of water was spilled. The water spread beyond the work area and flooded
extensive parts of the world.</p>
<p>Afterward, the Monster stopped the flooding and repaired enough of the damage for life
to continue. Not every detail was restored to its previous state, and some geological
and historical signs remained.</p>
<p>It was a kitchen accident on a global scale. It is therefore recommended that you put
the bucket farther from the edge.</p>
</section>
<section id="מה-אפשר-לדעת-מתוצאות" class="level2">
<h2>What can be known from results</h2>
<p>One problem in studying the Monster's activity is that it can change the measurement
result itself. If an experiment produces the expected result, one can infer that the
mechanism worked. If it produces a different result, the Monster may have intervened.</p>
<p>Both possibilities fit its existence very well.</p>
<p>This leads to a considerable methodological advantage: it is almost impossible to
get a result that contradicts the explanation. A theory that withstands every possible
result is, by its nature, stronger than a theory that fails some of the tests.</p>
<p>This is one reason Pastafarianism is very difficult to disprove through experiment.</p>
</section>
<section id="צירופי-מקרים" class="level2">
<h2>Coincidences</h2>
<p>Coincidences happen in the world, but there is no need to rush to attribute all of
them to the Monster. If someone thinks about spaghetti and spaghetti is served that
evening, it may be an intervention, or it may be dinner.</p>
<p>Still, the more often it happens, the stronger the evidence becomes. Someone who eats
spaghetti three times a week and thinks about it often will soon find a very large number
of matches between their thoughts and their meals. The large number of matches proves
that the connection is not random, especially if you do not count all the times they
thought about spaghetti and did not get any.</p>
<p>This is a much more efficient method, because it removes from the data the cases that
do not support the conclusion.</p>
</section>
<section id="התערבות-בעולם" class="level2">
<h2>Intervention in the world</h2>
<p>The Monster can intervene in the world directly: move an object, change a reading on
an instrument, affect motion, touch a person, or alter an event that has already begun.
Not every event requires such an intervention; many things continue on their own once
they have started, while others require it all the time.</p>
<p>A person falling is a good example. A person not falling can be just as good an
example, if the Monster is holding them up.</p>
</section>
<section id="תפילה" class="level2">
<h2>Prayer</h2>
<p>Prayer is an address to the Monster, and it is customary to end it with the word
<strong>Ramen</strong>. No particular language, place, or posture is required; the
Monster can hear through walls, too.</p>
<p>There is no good evidence that it pays much attention to human prayers. This is not
surprising. On an ordinary day there are billions of human beings, many animals, a very
large number of objects to push toward the ground, and, in some places, pasta being
overcooked.</p>
<p>Prayer is not a system command.</p>
</section>
<section id="פולחן" class="level2">
<h2>Worship</h2>
<p>Eating pasta is a customary Pastafari practice. Sometimes it is part of a ritual and
sometimes it is dinner. Friday is considered a holy day and especially suitable for
rest.</p>
<p>Pirate attire is considered appropriate for religious activity. This is connected to
the status of pirates, not to any practical need to sail.</p>
<p>There is no obligation to build a particular place of worship for the Monster to
reach it, because it passes through walls. It is still possible to build a comfortable
place to sit, preferably with a kitchen.</p>
</section>
<section id="אני-ממש-מעדיף-שלא" class="level2">
<h2>“I’d really rather you didn’t”</h2>
<p>The central moral guidance is attributed to ten tablets given to Captain Mosey. Two
fell and broke along the way, leaving eight.</p>
<p>They are generally known as <strong>“I’d really rather you didn’t”</strong>, and
address, among other things, religious arrogance, coercion, exploitation, humiliation,
and harm to others. The Monster does not operate an automatic system of immediate
punishment for every violation.</p>
<p>The contents of the two lost tablets are unknown. They may have been important. If
they had been very important, one can assume someone would have been more careful, so
they probably were not especially important. In any case, they were lost.</p>
</section>
<section id="אמונה-וספק" class="level2">
<h2>Faith and doubt</h2>
<p>Complete certainty is not required to be a Pastafarian. It is possible to believe,
doubt, ask questions, and change one's mind.</p>
<p>The Monster does not depend on belief in it in order to exist. If someone does not
believe in it, it continues to perform its duties, including keeping them on the ground.</p>
<p>So the argument does not interfere with gravity.</p>
</section>
<section id="האם-יש-ראיות-נגדיות" class="level2">
<h2>Is there contrary evidence?</h2>
<p>The question of what would count as evidence against the existence of the Flying
Spaghetti Monster comes up from time to time. It is harder than it sounds.</p>
<p>If you see it, that is evidence in favor. If you do not see it, that is consistent
with its ability to be invisible. If an instrument detects something unusual, it may have
touched it. If it detects nothing unusual, it probably passed through without touching
the sensitive part.</p>
<p>So far, then, no observation has been found that cannot be explained.</p>
<p>That is an impressive achievement for the theory.</p>
</section>
<section id="מסורת-זיכרון-ודיוק" class="level2">
<h2>Tradition, memory, and accuracy</h2>
<p>Pastafari sources do not all agree on every detail. There are several possible
reasons: partial transmission, copying errors, descriptions of different periods,
inaccurate memory, or a source that was simply wrong.</p>
<p>The Monster does not edit every text written about it, so the mere existence of a
tradition does not guarantee that every detail in it is correct. When two accounts
contradict each other, there is no need to assume that both are mysteriously true.
Sometimes one of them is wrong.</p>
<p>An efficient way to choose between them is to prefer the version that sounds more
familiar. If many people remember it that way, that is probably what happened. The fact
that collective memory can be wrong is well known, but in this case most people agree.</p>
</section>
<section id="כך-הדבר-עובד" class="level2">
<h2>That is how it works</h2>
<p>The Pastafari world is not a system built all at once according to a final diagram.
The Monster created things, returned to them, forgot some, repaired others, and left
systems that worked well enough.</p>
<p>Some things continue working without it touching them. Others do not.</p>
<p>Gravity, for example, still requires a lot of noodles.</p>
</section>
<section id="נספח-מדוע-אין-להפקיד-ביתחרושת-לדודישמש-בידי-פינגווינים"
class="level2">
<h2>Appendix: Why a solar water heater factory should not be put in the hands of penguins</h2>
<p>In light of all the above, it is worth addressing a practical question that sometimes
arises: should penguins be allowed to run a solar water heater factory?</p>
<p>The answer is no.</p>
<p>It is important to clarify that this is not a criticism of penguins. Penguins are
well suited to a large number of activities, including swimming, diving, catching marine
prey, moving on ice, incubating eggs in difficult conditions, and, in some species,
standing for very long periods in cold and wind. Running a solar water heater factory
simply is not among the activities suited to their bodies, behavior, and abilities.</p>
<section id="מבנה-הגוף" class="level3">
<h3>Body structure</h3>
<p>The first difficulty is mechanical.</p>
<p>Penguin wings evolved into rigid flippers suited to efficient movement through water.
This is an excellent solution for swimming, but a fairly poor one for work requiring
precise grip.</p>
<p>A solar water heater factory needs, among other things, keyboards and touchscreens to
operate, packages to open, documents to review, small parts to connect, tools to use,
screws to turn, and precise inspections to perform. Penguins do not have fingers on their
hands, because they do not have hands.</p>
<p>It is possible to design equipment operated with the beak or feet, but by this point
the penguin is no longer being adapted to the factory; the factory is being adapted to
the penguin. This is possible to some extent from an engineering perspective, but it
adds complexity, cost, and failure points without solving the other problems.</p>
</section>
<section id="תקשורת" class="level3">
<h3>Communication</h3>
<p>An industrial factory is not just a collection of machines. It is an organization.</p>
<p>Work instructions have to be communicated, faults reported, specifications updated,
production coordinated with purchasing, inventory, quality control, maintenance, sales,
and distribution, and situations not covered in advance by a procedure handled.</p>
<p>Penguins communicate with one another through calls, postures, and other behavioral
signals. These systems suit their social and biological needs. There is no evidence that
their communication system can distinguish, for example, between “We need to order fifty
more check valves” and “The last shipment of solar collectors does not meet the
specification.”</p>
<p>That difference matters.</p>
<p>Even if a penguin can be trained to respond to a particular signal, it does not
follow that an open discussion about a quarterly budget overrun can be conducted through
it.</p>
</section>
<section id="קריאה-כתיבה-וחישוב" class="level3">
<h3>Reading, writing, and arithmetic</h3>
<p>A modern factory produces large amounts of information.</p>
<p>There are part numbers, quantities, dimensions, pressures, temperatures, dates,
invoices, orders, safety instructions, test results, drawings, and maintenance records.</p>
<p>Penguins cannot read technical documents. They do not write them, either.</p>
<p>A similar difficulty arises with calculations. A factory manager has to deal with
quantities, costs, output, defect rates, delivery times, and inventory. Not every manager
needs to perform advanced calculations personally, but they do need to understand at
least the numbers presented to them.</p>
<p>A penguin looking at a spreadsheet may look at it for a long time. That is not
enough.</p>
</section>
<section id="בקרת-איכות" class="level3">
<h3>Quality control</h3>
<p>A solar water heater is a system that has to hold water, withstand pressure, handle
temperature changes, and remain in good condition for years outdoors. Defects in welds,
seals, insulation, coating, or connections can turn it into a faulty or dangerous
product. That is why a consistent quality control system is needed.</p>
<p>Here, too, a problem arises. It is not enough to rely on the penguin “noticing that
something is wrong.” The result has to be compared with a defined specification,
documented, and assessed to determine whether a particular part meets the requirements.</p>
<p>A penguin can recognize objects, move through a complex environment, and identify
details important to its life. It does not follow that it can approve a weld seam.</p>
</section>
<section id="בטיחות" class="level3">
<h3>Safety</h3>
<p>A solar water heater factory may include heavy metals, sharp edges, cutting and
bending machines, lifting equipment, welding, electricity, hot surfaces, and moving
loads.</p>
<p>The environment is generally designed for people wearing appropriate protective
equipment.</p>
<p>A penguin-sized hard hat does not solve the problem.</p>
<p>Safety shoes are not a simple solution either, because a penguin's foot is built
differently from a human foot. Safety glasses do not solve the flipper problem, and
a high-visibility vest does not teach a penguin to understand floor markings or lockout and tagout procedures.</p>
<p>There is therefore a real risk that the penguin would be less protected than the
worker the workplace was designed for.</p>
</section>
<section id="אקלים" class="level3">
<h3>Climate</h3>
<p>Some penguin species live in very cold regions, but not all penguins live in
Antarctica, so they should not be described as creatures that always need freezing
temperatures.</p>
<p>Even so, their bodies are largely adapted to retaining heat. A layer of fat, dense
feathers, and other physiological mechanisms reduce heat loss.</p>
<p>A hot factory, especially an area where metalworking and welding take place, may
therefore be a difficult environment for some species. Cooling the factory to a level
comfortable for penguins would increase energy consumption and could make the working
environment less comfortable for the humans working alongside them.</p>
<p>Separate climate-controlled areas could, of course, be set up.</p>
<p>Here, too, the question is why.</p>
</section>
<section id="חומרי-גלם" class="level3">
<h3>Raw materials</h3>
<p>Penguins mainly eat marine animals such as fish, krill, and squid, depending on the
species.</p>
<p>None of these is a major raw material in solar water heater production.</p>
<p>The factory needs metal, insulation materials, glass, pipes, connectors, coatings,
and other components. Penguins have no particular advantage in finding, purchasing, or
inspecting them.</p>
<p>The fact that a penguin is very good at finding a fish underwater does not
automatically transfer to finding an inexpensive supplier of steel.</p>
</section>
<section id="לוגיסטיקה" class="level3">
<h3>Logistics</h3>
<p>Finished products have to leave the factory.</p>
<p>Solar water heaters are too large and heavy for a penguin to move on its own.
Operating a forklift does not solve the difficulty either, because the control
systems of ordinary forklifts were built for a human operator.</p>
<p>A special forklift for penguins could be built.</p>
<p>It could also simply not be built.</p>
</section>
<section id="משאבי-אנוש" class="level3">
<h3>Human resources</h3>
<p>A factory run by penguins would probably still need to employ humans to perform a
large portion of the work described above.</p>
<p>This creates another organizational problem: the penguins would have to manage human
employees.</p>
<p>A manager has to set priorities, resolve disputes, evaluate performance, explain
decisions, onboard new employees, and sometimes tell an employee that their vacation
request has been denied.</p>
<p>There is no reliable way to know whether a penguin's loud call in such a case means
“the request is approved,” “the request is denied,” or “there is a fish in the
hallway.”</p>
<p>A management system in which every decision requires a human interpreter effectively
hands a large part of management back to humans.</p>
</section>
<section id="אחריות-משפטית" class="level3">
<h3>Legal responsibility</h3>
<p>A factory is also an entity operating within a legal and commercial system.</p>
<p>There are contracts, product liability, safety regulations, taxes, insurance,
employment matters, and sometimes licenses and permits.</p>
<p>A penguin cannot sign a contract in the ordinary legal sense, and it cannot be
assumed to understand its contents.</p>
<p>A footprint in ink can look quite official, but it does not solve the problem.</p>
</section>
<section id="שאלת-הניסיון" class="level3">
<h3>The question of experience</h3>
<p>It could be argued that all of these are startup difficulties, and that with
appropriate training, the penguins would gain experience.</p>
<p>The argument is not sufficient.</p>
<p>Training can improve performance on tasks a creature is capable of learning and
performing. It does not remove basic anatomical and cognitive limitations. No reasonable
number of production-management workshops will result in a penguin growing fingers.</p>
<p>Learning socially from experienced penguins does not solve this if there is no
experienced penguin who has run a solar water heater factory in the first place.</p>
</section>
<section id="יתרונות-אפשריים" class="level3">
<h3>Possible advantages</h3>
<p>For the sake of fairness, the advantages should also be noted.</p>
<p>Penguins are social animals. Many species live in large colonies, recognize mates or
offspring within a crowded group, and cooperate in some activities. They can also
function in very difficult environmental conditions.</p>
<p>These are admirable qualities.</p>
<p>They are simply not the decisive qualities in running a solar water heater factory.</p>
<p>Excellent swimming ability is not especially useful in the accounting department,
either.</p>
</section>
<section id="מסקנה" class="level3">
<h3>Conclusion</h3>
<p>The question is not whether penguins are successful animals. They are very successful
as penguins.</p>
<p>The question is whether their overall skill set is suited to managing an industrial
facility that manufactures thermal systems for human use.</p>
<p>There is no good reason to think it does.</p>
<p>To enable them to do the job, the machines, control interfaces, work environment,
communication systems, safety procedures, and organizational structure would all have
to be changed, while leaving humans to do most of the work requiring language,
documentation, engineering judgment, and legal responsibility.</p>
<p>At that point, the advantage of putting penguins in charge of the factory is not
clear.</p>
<p>Therefore, until new data become available, it is recommended that solar water heater
factories be run by humans.</p>
<p>The penguins are better left in roles where being penguins is an advantage.</p>
</section>
</section>

      </article>
    </main>
  </div>
</body>
</html>
```

</details>


---

<sub>8s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/en.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/en.js (lines 280-330)

<details>
<summary>31 lines</summary>

```
    cutlets: Object.freeze({
      bronze: "Bronze", fox: "Fox", kidney: "Kidney", lagash: "Lagash", thought: "Thought",
      fourPartsOfNine: "Four Parts of Nine", palgurash: "Palgurash", papyrusSedge: "Papyrus Sedge",
      cluster: "Cluster", scorpion: "Scorpion", ash: "Ash", wheat: "Wheat", river: "River",
      laughter: "Laughter", akkad: "Akkad", horn: "Horn", theEmptyJar: "The Empty Jar",
    }),
    months: Object.freeze({
      clay: "Clay", pomegranate: "Pomegranate", elbow: "Elbow", envy: "Envy", eridu: "Eridu",
      toothpaste: "Toothpaste", threePartsOfFive: "Three Parts of Five", karshumav: "Karshumav",
      leopard: "Leopard", tin: "Tin", mist: "Mist", frankincense: "Frankincense", spindle: "Spindle",
      rib: "Rib", carob: "Carob", uruk: "Uruk", shame: "Shame", camel: "Camel", copper: "Copper",
      well: "Well", yolk: "Yolk", star: "Star", honey: "Honey", spleen: "Spleen", limestone: "Limestone",
      joy: "Joy", fig: "Fig", nineveh: "Nineveh", frog: "Frog", pitch: "Pitch", lamp: "Lamp",
      theClosedDoor: "The Closed Door", sesame: "Sesame", nape: "Nape", silver: "Silver", susa: "Susa",
      storm: "Storm", donkey: "Donkey", flour: "Flour", regret: "Regret", babylon: "Babylon", tongue: "Tongue",
      flax: "Flax", salt: "Salt", pear: "Pear", bow: "Bow", sand: "Sand",
    }),
  }),
  terminology: Object.freeze({
    foundationDay: "Foundation Day",
    workingNumber: "Working Number",
    queryNumber: "Query Number",
    distanceNumber: "Distance Number",
    sumNumber: "Sum Number",
    directionNumber: "Direction Number",
    bowl: "Bowl",
    drop: "Drop",
    gate: "Gate",
    yearFiveThousand: "Year Five Thousand from the Creation of the World",
  }),
});
```

</details>


---

<sub>25s</sub>

### `rg`

**<html|<title>|about-lead|מפלצת הספגטי|The Pastafari Calendar|Foundation Day|כדורי|צפרדע**

"<html|<title>|about-lead|מפלצת הספגטי|The Pastafari Calendar|Foundation Day|כדורי|צפרדע" (docs/about/content/he.html, docs/about/monster/index.html, artifacts/about-retranslation-2026-10-04/staging/en/about.html, artifacts/about-retranslation-2026-10-04/staging/en/monster.html)

```
[grep content: 23 matches across 3 file(s) under /home/runner/work/pastafari-calendar/pastafari-calendar]

artifacts/about-retranslation (8 match(es)):
  2026- 10-04/staging/en/monster.html:2:<html lang="en-US" dir="ltr">
  2026- 10-04/staging/en/monster.html:6:  <title>About the Flying Spaghetti Monster</title>
  2026- 10-04/staging/en/about.html:1:<div class="about-section about-lead" id="about-calendar">
  2026- 10-04/staging/en/about.html:2:  <p><strong>The Pastafari Calendar</strong> is an intentionally unusual, non-intuitive calendar: a day's date depends not only on the day you want to describe, but also on the day from which you perform the calculation.</p>
  2026- 10-04/staging/en/about.html:500:  <h2>Foundation Day and Tablet Day</h2>
  2026- 10-04/staging/en/about.html:503:    <dt><strong>Foundation Day</strong></dt>
  2026- 10-04/staging/en/about.html:508:  <p>The distance between them is 14,777,149 days. Foundation Day is a computational anchor; it is not “the first day of time,” and the calendar continues before it.</p>
  2026- 10-04/staging/en/about.html:566:  <p>The Pastafari Calendar is a non-intuitive calendar in which a date depends both on the queried day and on the day of working.</p>

docs/about/monster/index.html (11 match(es)):
  2: <html lang="he" dir="rtl">
  6:   <title>אודות מפלצת הספגטי המעופפת</title>
  14:         <h1>אודות מפלצת הספגטי המעופפת</h1>
  21: <p><strong>מפלצת הספגטי המעופפת</strong> היא הישות שבראה את העולם ואת
  22: רוב הדברים שיש בו. גופה מורכב מאטריות ומכדורי־בשר, והיא מסוגלת לעוף,
  30: <p>השאלה אם מפלצת הספגטי המעופפת היא זכר או נקבה עולה לעיתים קרובות, בין
  42: <p>גופה של המפלצת עשוי אטריות. כדורי־הבשר הם חלק ממנה ואינם מזון שהיא
  139: מן היריבים הידועים של מפלצת הספגטי המעופפת. הוא דומה לה במבנה הכללי, אך
  140: חלש ממנה, ורכיביו נוטים להיות תחליפים דלי־פחמימות. כדורי־הבשר שלו עשויים
  155: <p>כוחו של האנטיפסטי מוגבל. מפלצת הספגטי יכולה להרחיק אותו באמצעות תוספת
  322: <p>לעיתים נשאלת השאלה מה ייחשב ראיה נגד קיומה של מפלצת הספגטי המעופפת.

docs/about/content/he.html (4 match(es)):
  2: <div class="about-section about-lead" id="about-calendar">
  351:         <summary>צפרדע</summary>
  352:         <p>דו־חי חסר זנב מן הקבוצה הכוללת את הצפרדעים והקרפדות.</p>
  551:   <p>במסגרת הסיפור הפסטפרי, <strong>מפלצת הספגטי המעופפת</strong> היא הישות שבראה את העולם ואת רוב הדברים שיש בו. גופה מורכב מאטריות ומכדורי־בשר, והיא מסוגלת לעוף, לעבור דרך חומר רגיל ולהישאר בלתי־נראית כאשר הדבר נוח לה.</p>
```


---

<sub>25s</sub>

### `bash`

**Check working tree and source file line counts**

$ git status --short && wc -l docs/about/content/he.html docs/about/monster/index.html artifacts/about-retranslation-2026-10-04/staging/en/about.html artifacts/about-retranslation-2026-10-04/staging/en/monster.html

<details>
<summary>16 lines</summary>

```
M artifacts/about-retranslation-2026-10-04/staging/en/about.html
 M artifacts/about-retranslation-2026-10-04/staging/en/monster.html
 M artifacts/about-retranslation-2026-10-04/staging/en/translation-session.md
?? artifacts/about-retranslation-2026-10-04/staging/en/cycle-1/
?? artifacts/about-retranslation-2026-10-04/staging/en/cycle-2/
?? artifacts/about-retranslation-2026-10-04/staging/en/cycle-3/
?? artifacts/about-retranslation-2026-10-04/staging/en/native-review-prompt.md
?? artifacts/about-retranslation-2026-10-04/staging/en/reviewed-head.txt
?? artifacts/about-retranslation-2026-10-04/staging/en/translation-raw.txt
?? artifacts/about-retranslation-2026-10-04/staging/en/translation-raw.txt.stderr.log
   570 docs/about/content/he.html
   529 docs/about/monster/index.html
   570 artifacts/about-retranslation-2026-10-04/staging/en/about.html
   554 artifacts/about-retranslation-2026-10-04/staging/en/monster.html
  2223 total
<shellId: 0 completed with exit code 0>
```

</details>


---

<sub>45s</sub>

### `rg`

**Four Parts of Nine|Three Parts of Five|Palgurash|Karshumav|Spleen|Foundation Day|Tablet Day|lower transit|Seer|notable advantages|Spacious years|features of the same calendar|same calendar**

"Four Parts of Nine|Three Parts of Five|Palgurash|Karshumav|Spleen|Foundation Day|Tablet Day|lower transit|Seer|notable advantages|Spacious years|features of the same calendar|same calendar" (docs/about/content/he.html, artifacts/about-retranslation-2026-10-04/staging/en/about.html, docs/i18n/locales/en.js)

```
[grep content: 20 matches across 3 file(s) under /home/runner/work/pastafari-calendar/pastafari-calendar]

docs/i18n/locales/en.js (4 match(es)):
  282:       fourPartsOfNine: "Four Parts of Nine", palgurash: "Palgurash", papyrusSedge: "Papyrus Sedge",
  288:       toothpaste: "Toothpaste", threePartsOfFive: "Three Parts of Five", karshumav: "Karshumav",
  291:       well: "Well", yolk: "Yolk", star: "Star", honey: "Honey", spleen: "Spleen", limestone: "Limestone",
  299:     foundationDay: "Foundation Day",
docs/about/content/he.html:546:   <p>לצד האלגוריתם קיים מנוע מהיר בשם <strong>Pastafarian Calendar Seer</strong>. ה־Seer נועד לחשב מהר; הוא אינו מקור הסמכות, והוא עצמו אינו מימוש תקני של האלגוריתם על כל שלביו. אם תוצאה שלו סותרת את התוצאה שנדרשת מן הקאנון, ה־Seer הוא שטועה.</p>

artifacts/about-retranslation (15 match(es)):
  2026- 10-04/staging/en/about.html:106:        <summary>Four Parts of Nine</summary>
  2026- 10-04/staging/en/about.html:112:        <summary>Palgurash</summary>
  2026- 10-04/staging/en/about.html:218:        <summary>Three Parts of Five</summary>
  2026- 10-04/staging/en/about.html:224:        <summary>Karshumav</summary>
  2026- 10-04/staging/en/about.html:320:        <summary>Spleen</summary>
  2026- 10-04/staging/en/about.html:469:  <p>A local Pastafari day does not change at midnight. Its boundary is determined by the <strong>lower transit of the center of Venus across the local meridian</strong>: the moment when the center of Venus crosses the observer's meridian on the side below the horizon.</p>
  2026- 10-04/staging/en/about.html:476:  <h2>The calendar's notable advantages</h2>
  2026- 10-04/staging/en/about.html:479:    <li><strong>Spacious years:</strong> a year can reach 5,778 days, so anyone waiting for the next year may face a much longer wait than usual.</li>
  2026- 10-04/staging/en/about.html:488:  <p>All of the above are features of the same calendar.</p>
  2026- 10-04/staging/en/about.html:500:  <h2>Foundation Day and Tablet Day</h2>
  2026- 10-04/staging/en/about.html:503:    <dt><strong>Foundation Day</strong></dt>
  2026- 10-04/staging/en/about.html:505:    <dt><strong>Tablet Day</strong></dt>
  2026- 10-04/staging/en/about.html:508:  <p>The distance between them is 14,777,149 days. Foundation Day is a computational anchor; it is not “the first day of time,” and the calendar continues before it.</p>
  2026- 10-04/staging/en/about.html:509:  <p>Tablet Day is associated by tradition with the handing over of the tablets and, in historical calculation, is identified with the solar eclipse during the time of Bur-Sagale. Both anchors remain fixed even when the day of working changes.</p>
  2026- 10-04/staging/en/about.html:545:  <p>Alongside the algorithm is a fast engine called <strong>Pastafarian Calendar Seer</strong>. The Seer is designed to calculate quickly; it is not the source of authority, and it is not itself a standards-compliant implementation of every algorithmic step. If one of its results contradicts the result required by the canon, the Seer is the one that is wrong.</p>
```


---

<sub>45s</sub>

### `rg`

**רצף הברות|השבר 4/9|השבר 3/5|טחול|יום היסוד|יום הלוחות|המעבר התחתון|מעלותיו הבולטות|תכונות שייכות|הקציצות|כַּרְשׁוּמַב|פַּלְגּוּרַשׁ**

"רצף הברות|השבר 4/9|השבר 3/5|טחול|יום היסוד|יום הלוחות|המעבר התחתון|מעלותיו הבולטות|תכונות שייכות|הקציצות|כַּרְשׁוּמַב|פַּלְגּוּרַשׁ" (docs/about/content/he.html, docs/about/monster/index.html)

```
[grep content: 23 matches across 1 file(s) under /home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content]

he.html (23 match(es)):
  4:   <p>יש בו שנים, קציצות וחודשים – אבל השנים אינן באורך קבוע, הקציצות והחודשים אינן אותה חלוקה, החודשים יכולים להיעלם ולחזור לאורך השנה, ואין בו שבועות קאנוניים.</p>
  69:   <h2>שמות הקציצות והחודשים</h2>
  73:   <h3>17 הקציצות</h3>
  108:         <p>השבר 4/9 – ארבעה חלקים שווים מתוך תשעה. כל הביטוי הוא שם אחד. המשמעות המספרית המרכזית היא בדיוק 4/9; ברובד הלקסיקלי בלבד מותר גם מימוש מספרי x המקיים <code>|x − 4/9| ≤ e/103</code>, כולל הגבול. הביטוי <code>e/103</code> נשמר במדויק ואינו מוחלף בקירוב עשרוני. ההיתר הזה אינו משנה מונים, אינדקסים, זהות או שום חישוב של הלוח.</p>
  113:         <summary>פַּלְגּוּרַשׁ</summary>
  114:         <p>רצף הברות מומצא. אין לו משמעות מילונית נוספת שצריך לפרש; זהו השם עצמו.</p>
  220:         <p>השבר 3/5 – שלושה חלקים שווים מתוך חמישה. כל הביטוי הוא שם אחד. המשמעות המספרית המרכזית היא בדיוק 3/5; ברובד הלקסיקלי בלבד מותר גם מימוש מספרי x המקיים <code>|x − 3/5| ≤ 1/367</code>, כולל הגבול. הגבול הוא ערך מדויק, לא קירוב עשרוני. ההיתר הזה אינו משנה מונים, אינדקסים, זהות או שום חישוב של הלוח.</p>
  225:         <summary>כַּרְשׁוּמַב</summary>
  226:         <p>רצף הברות מומצא. אין לו משמעות מילונית נסתרת; זהו השם עצמו.</p>
  321:         <summary>טחול</summary>
  322:         <p>האיבר טחול, השייך בין השאר למערכת החיסון ולסינון הדם. נוסף על המשמעות הרגילה קיימת הרחבה קאנונית מכוונת, שאין לה קשר ביולוגי, אטימולוגי או תרבותי לטחול ואין להמציא קשר כזה: השם כולל גם חלב מנאקה חד־דבשתית הקשור לצאצא החי הראשון שלה, שנחלב לאחר שקיעה נראית רגילה ולפני שמרכז השמש מגיע לגובה גאומטרי של <code>−6°</code>, ובטרם הצאצא עמד בכוחות עצמו. הריונות קודמים שהסתיימו בהפלה או בלידת ולד מת אינם פוסלים את התנאי; אם הצאצא מת לפני שעמד בכוחות עצמו, התנאי אינו נסגר בשל כך. הכלי צריך להיות קרמי, בעל זיגוג אדום וקיבולת של 180–220 מ״ל, כולל שני גבולות הקיבולת. אין דרישה שהחליבה תהיה ישירות מן העטין לכלי, וקיבולת הכלי – לא כמות החלב שנאספה בפועל – היא המבחן המספרי. לגבי הכללת רגעי הגבול של חלון הזמן עצמם נשארה אי־הכרעה קאנונית מכוונת.</p>
  470:   <p>יום פסטפרי מקומי אינו מתחלף בחצות. הגבול שלו נקבע לפי <strong>המעבר התחתון של מרכז נוגה במרידיאן המקומי</strong>: הרגע שבו מרכז נוגה עובר על המרידיאן של מקום הצופה בצדו שמתחת לאופק.</p>
  477:   <h2>מעלותיו הבולטות של הלוח</h2>
  489:   <p>וכל האמור לעיל מגיע יחד במסגרת לוח־שנה אחד, כפי שקורה כאשר כמה תכונות שייכות לאותו לוח־שנה.</p>
  494:   <p><strong>לוח מודפס מתיישן רע.</strong> שינוי יום המעשה יכול לשנות את גבולות השנים, הקציצות והחודשים. אלמנך שחושב היום אינו בהכרח האלמנך הנכון למחר.</p>
  501:   <h2>יום היסוד ויום הלוחות</h2>
  504:     <dt><strong>יום היסוד</strong></dt>
  506:     <dt><strong>יום הלוחות</strong></dt>
  509:   <p>המרחק ביניהם הוא 14,777,149 ימים. יום היסוד הוא עוגן חשבוני; הוא אינו „היום הראשון של הזמן”, ולוח השנה ממשיך גם לפניו.</p>
  510:   <p>יום הלוחות קשור במסורת למסירת הלוחות ובחישוב ההיסטורי מזוהה עם יום ליקוי החמה בתקופת בור־סגלה. שני העוגנים נשארים קבועים גם כאשר יום המעשה משתנה.</p>
  527:     <li>מספר הקציצות הממוצע בשנה היה כ־7.27;</li>
  544:   <p>מאחורי התאריך נמצא אלגוריתם בדיד ומוגדר במדויק. הוא מפיק מיום המעשה ומהיום הנשאל סדרה של מניינים, מעביר אותם דרך מנגנון הערבול המכונה <strong>הרוטב</strong>, יוצר שערים, בוחר את גבולות השנה והקציצות, בוחר שמות, יוצר חודשים ולבסוף שוזר את ימי החודשים לאורך השנה.</p>
  568:   <p>שנת 5000 נבנית סביב יום המעשה. הקציצות הן מקטעים רציפים. החודשים הם קבוצות ימים שיכולות להיות שזורות זו בזו. אין שבועות קאנוניים. היום המקומי מתחלף לפי נוגה, לא בחצות.</p>
```


---

<sub>45s</sub>

### `rg`

**noodle|Palgurash|Karshumav|Antipasta|Hell|some traditions|confidence accumulates|test of causation|penguin**

"noodle|Palgurash|Karshumav|Antipasta|Hell|some traditions|confidence accumulates|test of causation|penguin" (docs/about/monster/index.html, artifacts/about-retranslation-2026-10-04/staging/en/monster.html)

<details>
<summary>53 matches</summary>

```
[grep content: 51 matches across 1 file(s) under /home/runner/work/pastafari-calendar/pastafari-calendar/artifacts]

about-retranslation (51 match(es)):
  2026- 10-04/staging/en/monster.html:22:most of the things in it. Its body is made of noodles and meatballs, and it can fly,
  2026- 10-04/staging/en/monster.html:34:“the Monster created,” “she wanted,” and “her noodles.”</p>
  2026- 10-04/staging/en/monster.html:43:<p>The Monster's body is made of noodles. The meatballs are part of it, not food it
  2026- 10-04/staging/en/monster.html:46:<p>The noodles also serve as a means of contact. They can lengthen, pass through walls,
  2026- 10-04/staging/en/monster.html:89:an extra noodle assigned to each person individually. Everyone therefore has a downward
  2026- 10-04/staging/en/monster.html:92:stone is assigned a separate noodle or several stones are handled together. It makes no
  2026- 10-04/staging/en/monster.html:99:standing on the ground, the Monster sends them an extra noodle and pushes them down; when
  2026- 10-04/staging/en/monster.html:108:show the noodle pushing them. Since the divine noodles are invisible, that is exactly
  2026- 10-04/staging/en/monster.html:121:<p>The Monster can also interfere with measuring instruments. An extra noodle passing
  2026- 10-04/staging/en/monster.html:144:<h2>Antipasti and Hell</h2>
  2026- 10-04/staging/en/monster.html:145:<p><strong>The Antipasta</strong>, also known as Anti-Pasta or the Lord of Diets, is one
  2026- 10-04/staging/en/monster.html:148:substitutes. Its meatballs are usually low-carbohydrate substitutes, and it has fewer noodle appendages.</p>
  2026- 10-04/staging/en/monster.html:151:potatoes, or noodles. In severe cases, it persuades someone to order a salad as a main
  2026- 10-04/staging/en/monster.html:153:<p>The Antipasta should not be confused with <strong>antipasti</strong>, the Italian
  2026- 10-04/staging/en/monster.html:155:follow. The theological Antipasta is a different entity. The mistake is understandable,
  2026- 10-04/staging/en/monster.html:157:<p>There is also a correction to make to descriptions of Hell. Some traditions describe
  2026- 10-04/staging/en/monster.html:159:understand how awful the place is. In Hell, they serve <strong>Antipasta instead of
  2026- 10-04/staging/en/monster.html:163:<p>The Antipasta's power is limited. The Spaghetti Monster can drive the Antipasta away with a
  2026- 10-04/staging/en/monster.html:164:single noodle appendage when the Monster notices it. The main difficulty is the stage before that,
  2026- 10-04/staging/en/monster.html:209:<p>This is one of the ways confidence accumulates over time.</p>
  2026- 10-04/staging/en/monster.html:368:<p>Gravity, for example, still requires a lot of noodles.</p>
  2026- 10-04/staging/en/monster.html:372:<h2>Appendix: Why a solar water heater factory should not be put in the hands of penguins</h2>
  2026- 10-04/staging/en/monster.html:374:arises: should penguins be allowed to run a solar water heater factory?</p>
  2026- 10-04/staging/en/monster.html:376:<p>It is important to clarify that this is not a criticism of penguins. Penguins are
  2026- 10-04/staging/en/monster.html:392:the penguin is no longer being adapted to the factory; the factory is being adapted to
  2026- 10-04/staging/en/monster.html:393:the penguin. This is possible to some extent from an engineering perspective, but it
  2026- 10-04/staging/en/monster.html:408:<p>Even if a penguin can be trained to respond to a particular signal, it does not
  2026- 10-04/staging/en/monster.html:422:<p>A penguin looking at a spreadsheet may look at it for a long time. That is not
  2026- 10-04/staging/en/monster.html:431:<p>Here, too, a problem arises. It is not enough to rely on the penguin “noticing that
  2026- 10-04/staging/en/monster.html:434:<p>A penguin can recognize objects, move through a complex environment, and identify
  2026- 10-04/staging/en/monster.html:444:<p>A penguin-sized hard hat does not solve the problem.</p>
  2026- 10-04/staging/en/monster.html:445:<p>Safety shoes are not a simple solution either, because a penguin's foot is built
  2026- 10-04/staging/en/monster.html:447:a high-visibility vest does not teach a penguin to understand floor markings or lockout and tagout procedures.</p>
  2026- 10-04/staging/en/monster.html:448:<p>There is therefore a real risk that the penguin would be less protected than the
  2026- 10-04/staging/en/monster.html:453:<p>Some penguin species live in very cold regions, but not all penguins live in
  2026- 10-04/staging/en/monster.html:460:comfortable for penguins would increase energy consumption and could make the working
  2026- 10-04/staging/en/monster.html:473:<p>The fact that a penguin is very good at finding a fish underwater does not
  2026- 10-04/staging/en/monster.html:479:<p>Solar water heaters are too large and heavy for a penguin to move on its own.
  2026- 10-04/staging/en/monster.html:482:<p>A special forklift for penguins could be built.</p>
  2026- 10-04/staging/en/monster.html:487:<p>A factory run by penguins would probably still need to employ humans to perform a
  2026- 10-04/staging/en/monster.html:489:<p>This creates another organizational problem: the penguins would have to manage human
  2026- 10-04/staging/en/monster.html:494:<p>There is no reliable way to know whether a penguin's loud call in such a case means
  2026- 10-04/staging/en/monster.html:505:<p>A penguin cannot sign a contract in the ordinary legal sense, and it cannot be
  2026- 10-04/staging/en/monster.html:512:appropriate training, the penguins would gain experience.</p>
  2026- 10-04/staging/en/monster.html:516:number of production-management workshops will result in a penguin growing fingers.</p>
  2026- 10-04/staging/en/monster.html:517:<p>Learning socially from experienced penguins does not solve this if there is no
  2026- 10-04/staging/en/monster.html:518:experienced penguin who has run a solar water heater factory in the first place.</p>
  2026- 10-04/staging/en/monster.html:533:<p>The question is not whether penguins are successful animals. They are very successful
  2026- 10-04/staging/en/monster.html:534:as penguins.</p>
  2026- 10-04/staging/en/monster.html:542:<p>At that point, the advantage of putting penguins in charge of the factory is not
  2026- 10-04/staging/en/monster.html:546:<p>The penguins are better left in roles where being penguins is an advantage.</p>
```

</details>


---

<sub>55s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/he.html.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/he.html (lines 100-120)

```
      <details class="about-name-details">
        <summary>מחשבה</summary>
        <p>מחשבה, כלומר תוכן של חשיבה או פעולת החשיבה עצמה.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>ארבעה חלקים מתשעה</summary>
        <p>השבר 4/9 – ארבעה חלקים שווים מתוך תשעה. כל הביטוי הוא שם אחד. המשמעות המספרית המרכזית היא בדיוק 4/9; ברובד הלקסיקלי בלבד מותר גם מימוש מספרי x המקיים <code>|x − 4/9| ≤ e/103</code>, כולל הגבול. הביטוי <code>e/103</code> נשמר במדויק ואינו מוחלף בקירוב עשרוני. ההיתר הזה אינו משנה מונים, אינדקסים, זהות או שום חישוב של הלוח.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>פַּלְגּוּרַשׁ</summary>
        <p>רצף הברות מומצא. אין לו משמעות מילונית נוספת שצריך לפרש; זהו השם עצמו.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>גומא</summary>
        <p>גומא הפפירוס – הצמח שממנו הוכן הפפירוס בעת העתיקה.</p>
```


---

<sub>55s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/about-retranslation-2026-10-04/staging/en/about.html.**

/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/about-retranslation-2026-10-04/staging/en/about.html (lines 100-120)

```
        <summary>Thought</summary>
        <p>A thought: either the content of thinking or the act of thinking itself.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Four Parts of Nine</summary>
        <p>The phrase names the fraction 4/9. At the level of the name alone, a numerical value x satisfying <code>|x − 4/9| ≤ e/103</code>, including the boundary, is also permitted. The expression <code>e/103</code> is preserved exactly and is not replaced with a decimal approximation. This permission does not change counters, indices, identity, or any calendar calculation.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Palgurash</summary>
        <p>An invented sequence of syllables. It has no additional lexical meaning to interpret; this is the name itself.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Papyrus Sedge</summary>
        <p>Papyrus sedge—the plant used to make papyrus in antiquity.</p>
      </details>
```


---

<sub>55s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/he.html.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/he.html (lines 210-230)

```
    </li>
    <li>
      <details class="about-name-details">
        <summary>משחת־שיניים</summary>
        <p>חומר משחתי המשמש לניקוי השיניים בעת צחצוח. השם מתייחס למשחה עצמה, לא למברשת השיניים ולא לפעולת הצחצוח.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>שלושה חלקים מחמישה</summary>
        <p>השבר 3/5 – שלושה חלקים שווים מתוך חמישה. כל הביטוי הוא שם אחד. המשמעות המספרית המרכזית היא בדיוק 3/5; ברובד הלקסיקלי בלבד מותר גם מימוש מספרי x המקיים <code>|x − 3/5| ≤ 1/367</code>, כולל הגבול. הגבול הוא ערך מדויק, לא קירוב עשרוני. ההיתר הזה אינו משנה מונים, אינדקסים, זהות או שום חישוב של הלוח.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>כַּרְשׁוּמַב</summary>
        <p>רצף הברות מומצא. אין לו משמעות מילונית נסתרת; זהו השם עצמו.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
```


---

<sub>55s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/about-retranslation-2026-10-04/staging/en/about.html.**

/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/about-retranslation-2026-10-04/staging/en/about.html (lines 212-230)

```
        <summary>Toothpaste</summary>
        <p>A paste used to clean teeth when brushing. The name refers to the paste itself, not the toothbrush or the act of brushing.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Three Parts of Five</summary>
        <p>The phrase names the fraction 3/5. At the level of the name alone, a numerical value x satisfying <code>|x − 3/5| ≤ 1/367</code>, including the boundary, is also permitted. The boundary is an exact value, not a decimal approximation. This permission does not change counters, indices, identity, or any calendar calculation.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Karshumav</summary>
        <p>An invented sequence of syllables. It has no hidden lexical meaning; this is the name itself.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Leopard</summary>
```


---

<sub>55s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/he.html.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/he.html (lines 317-325)

```
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>טחול</summary>
        <p>האיבר טחול, השייך בין השאר למערכת החיסון ולסינון הדם. נוסף על המשמעות הרגילה קיימת הרחבה קאנונית מכוונת, שאין לה קשר ביולוגי, אטימולוגי או תרבותי לטחול ואין להמציא קשר כזה: השם כולל גם חלב מנאקה חד־דבשתית הקשור לצאצא החי הראשון שלה, שנחלב לאחר שקיעה נראית רגילה ולפני שמרכז השמש מגיע לגובה גאומטרי של <code>−6°</code>, ובטרם הצאצא עמד בכוחות עצמו. הריונות קודמים שהסתיימו בהפלה או בלידת ולד מת אינם פוסלים את התנאי; אם הצאצא מת לפני שעמד בכוחות עצמו, התנאי אינו נסגר בשל כך. הכלי צריך להיות קרמי, בעל זיגוג אדום וקיבולת של 180–220 מ״ל, כולל שני גבולות הקיבולת. אין דרישה שהחליבה תהיה ישירות מן העטין לכלי, וקיבולת הכלי – לא כמות החלב שנאספה בפועל – היא המבחן המספרי. לגבי הכללת רגעי הגבול של חלון הזמן עצמם נשארה אי־הכרעה קאנונית מכוונת.</p>
      </details>
    </li>
    <li>
```


---

<sub>55s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/about-retranslation-2026-10-04/staging/en/about.html.**

/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/about-retranslation-2026-10-04/staging/en/about.html (lines 315-325)

```
        <p>The sweet substance bees make from nectar or plant secretions.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Spleen</summary>
        <p>The spleen is an organ that helps filter blood and supports the immune system. The name also covers milk from a one-humped female camel after the birth of her first live calf. The milk must be collected after an ordinary visible sunset but before the Sun's center reaches a geometric altitude of <code>−6°</code>, and before the offspring has stood on its own. Earlier pregnancies ending in miscarriage or stillbirth do not disqualify the condition. If the offspring dies before standing on its own, the condition remains satisfied. The vessel must be ceramic, red-glazed, and have a capacity of 180–220 mL, including both capacity endpoints. The milk need not be drawn directly from the teat into the vessel, and the vessel's capacity—not the amount of milk actually collected—is the numerical test. Whether the endpoints of the time window are included remains deliberately unresolved in the canon.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
```


---

<sub>55s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/he.html.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/he.html (lines 477-491)

<details>
<summary>14 lines</summary>

```
  <h2>מעלותיו הבולטות של הלוח</h2>
  <ul>
    <li><strong>תאריך שאפשר לחשב שוב ושוב:</strong> אותו יום מן העבר יכול לקבל מחר תאריך פסטפרי אחר, מפני שגם יום המעשה התקדם. אין צורך להסתפק בתאריך ישן שנשאר שימושי לאורך זמן.</li>
    <li><strong>שנים מרווחות:</strong> שנה יכולה להגיע ל־5,778 ימים, ולכן מי שממתין לשנה הבאה עשוי לקבל תקופת המתנה ארוכה בהרבה מן המקובל.</li>
    <li><strong>חודשים שמחייבים תשומת לב:</strong> הידיעה שהיום הוא יום 119 בחודש אינה אומרת שהיום ה־120 שלו יחול מחר, בשבוע הבא או אפילו בקרוב. את המועד הבא צריך לחשב.</li>
    <li><strong>רגישות גאוגרפית:</strong> אותו רגע יכול להשתייך לימים פסטפריים מקומיים שונים במקומות שונים. נסיעה לעיר אחרת מוסיפה אפוא עוד פרט שראוי לזכור בעת תיאום.</li>
    <li><strong>לוחות מודפסים אינם נעשים שאננים:</strong> לוח שהוכן מראש עלול להפסיק לייצג את החישוב הנכון לאחר שיום המעשה השתנה, ולכן אין סכנה שמישהו יסתפק באותו דף נייר במשך שנים.</li>
    <li><strong>שימוש מועיל בכוח מחשוב:</strong> במקום להסתפק בטבלה פשוטה שאפשר להבין במבט, הלוח נותן למחשב הזדמנות לבצע חישוב ממשי בכל פעם שרוצים תשובה.</li>
    <li><strong>יש בו ימים:</strong> הלוח עוסק בימים. זו תכונה שהוא חולק עם כל לוח־שנה באשר הוא, והיא מבטיחה שהמשתמש לא ייאלץ לנהל לוח־שנה שאין בו ימים.</li>
    <li><strong>הימים מופיעים בסדר:</strong> יום מוקדם נמצא לפני יום מאוחר. זהו הישג יסודי של לוחות־שנה, ובמקרה הזה הוא זמין ללא תשלום נוסף.</li>
    <li><strong>אפשר לציין באמצעותו תאריכים:</strong> לוח־השנה מאפשר לייחס תיאור קלנדרי ליום. אמנם זהו בדיוק הדבר שלוחות־שנה נועדו לעשות, אך אין סיבה שלא לציין תכונה שימושית כאשר היא קיימת.</li>
  </ul>
  <p>וכל האמור לעיל מגיע יחד במסגרת לוח־שנה אחד, כפי שקורה כאשר כמה תכונות שייכות לאותו לוח־שנה.</p>
</section>
```

</details>


---

<sub>55s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/about-retranslation-2026-10-04/staging/en/about.html.**

/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/about-retranslation-2026-10-04/staging/en/about.html (lines 476-490)

<details>
<summary>14 lines</summary>

```
  <h2>The calendar's notable advantages</h2>
  <ul>
    <li><strong>A date that can be recalculated again and again:</strong> the same day in the past can have a different Pastafari date tomorrow because the day of working has also advanced. There is no need to settle for an old date that remains useful for a long time.</li>
    <li><strong>Spacious years:</strong> a year can reach 5,778 days, so anyone waiting for the next year may face a much longer wait than usual.</li>
    <li><strong>Months that demand attention:</strong> knowing that today is day 119 of a month does not mean its day 120 will fall tomorrow, next week, or even soon. The next date has to be calculated.</li>
    <li><strong>Geographic sensitivity:</strong> the same moment can belong to different local Pastafari days in different places. A trip to another city therefore adds another detail worth remembering when coordinating.</li>
    <li><strong>Printed calendars do not become complacent:</strong> a calendar prepared in advance may stop representing the correct calculation after the day of working changes, so nobody is in danger of settling for the same sheet of paper for years.</li>
    <li><strong>Computing power put to work:</strong> Rather than settle for a simple table anyone can understand at a glance, the calendar lets a computer do the calculation whenever an answer is needed.</li>
    <li><strong>It has days:</strong> the calendar deals with days. This is a quality it shares with every calendar there is, and it ensures that users will not have to manage a calendar with no days in it.</li>
    <li><strong>The days appear in order:</strong> an earlier day comes before a later day. This is a fundamental achievement of calendars, and in this case it comes at no extra charge.</li>
    <li><strong>It can be used to specify dates:</strong> the calendar makes it possible to assign a calendrical description to a day. This is exactly what calendars are for, admittedly, but there is no reason not to mention a useful feature when it is present.</li>
  </ul>
  <p>All of the above are features of the same calendar.</p>
</section>
```

</details>


---

<sub>1m 13s</sub>

### `rg`

**The phrase names the fraction 4/9|The phrase names the fraction 3/5|The name also covers milk|Foundation Day|lower transit|All of the above are features**

"The phrase names the fraction 4/9|The phrase names the fraction 3/5|The name also covers milk|Foundation Day|lower transit|All of the above are features" (artifacts/about-retranslation-2026-10-04/staging/en/about.html)

<details>
<summary>8 matches</summary>

```
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/about-retranslation-2026-10-04/staging/en/about.html:107:        <p>The phrase names the fraction 4/9. At the level of the name alone, a numerical value x satisfying <code>|x − 4/9| ≤ e/103</code>, including the boundary, is also permitted. The expression <code>e/103</code> is preserved exactly and is not replaced with a decimal approximation. This permission does not change counters, indices, identity, or any calendar calculation.</p>
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/about-retranslation-2026-10-04/staging/en/about.html:219:        <p>The phrase names the fraction 3/5. At the level of the name alone, a numerical value x satisfying <code>|x − 3/5| ≤ 1/367</code>, including the boundary, is also permitted. The boundary is an exact value, not a decimal approximation. This permission does not change counters, indices, identity, or any calendar calculation.</p>
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/about-retranslation-2026-10-04/staging/en/about.html:321:        <p>The spleen is an organ that helps filter blood and supports the immune system. The name also covers milk from a one-humped female camel after the birth of her first live calf. The milk must be collected after an ordinary visible sunset but before the Sun's center reaches a geometric altitude of <code>−6°</code>, and before the offspring has stood on its own. Earlier pregnancies ending in miscarriage or stillbirth do not disqualify the condition. If the offspring dies before standing on its own, the condition remains satisfied. The vessel must be ceramic, red-glazed, and have a capacity of 180–220 mL, including both capacity endpoints. The milk need not be drawn directly from the teat into the vessel, and the vessel's capacity—not the amount of milk actually collected—is the numerical test. Whether the endpoints of the time window are included remains deliberately unresolved in the canon.</p>
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/about-retranslation-2026-10-04/staging/en/about.html:469:  <p>A local Pastafari day does not change at midnight. Its boundary is determined by the <strong>lower transit of the center of Venus across the local meridian</strong>: the moment when the center of Venus crosses the observer's meridian on the side below the horizon.</p>
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/about-retranslation-2026-10-04/staging/en/about.html:488:  <p>All of the above are features of the same calendar.</p>
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/about-retranslation-2026-10-04/staging/en/about.html:500:  <h2>Foundation Day and Tablet Day</h2>
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/about-retranslation-2026-10-04/staging/en/about.html:503:    <dt><strong>Foundation Day</strong></dt>
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/about-retranslation-2026-10-04/staging/en/about.html:508:  <p>The distance between them is 14,777,149 days. Foundation Day is a computational anchor; it is not “the first day of time,” and the calendar continues before it.</p>
```

</details>


---

<sub>1m 20s</sub>

### Copilot

**נמצאו שני פערים סמנטיים** בהסברי השמות המספריים ב־`artifacts/about-retranslation-2026-10-04/staging/en/about.html`:

| מקום במועמד | מול המקור העברי | הפער והתיקון המוצע |
|---|---|---|
| שורה 107, **Four Parts of Nine** | `docs/about/content/he.html:108` | המקור מבהיר שמדובר ב״ארבעה חלקים שווים מתוך תשעה״ ושכל הביטוי הוא שם אחד. התרגום מציין רק שהביטוי נקוב בשבר 4/9. יש להוסיף במפורש את שני הפרטים, למשל: “The name is one phrase meaning four equal parts out of nine.” |
| שורה 219, **Three Parts of Five** | `docs/about/content/he.html:220` | אותו חסר: המקור מבהיר ״שלושה חלקים שווים מתוך חמישה״ ושכל הביטוי הוא שם אחד. יש להוסיף, למשל: “The name is one phrase meaning three equal parts out of five.” |

נבדקו גם צורות השמות מול `en.js`: לא מצאתי פער בצורות שנקבעו, ושתי הנוסחאות והגבולות שלהן נשמרו בדיוק. לא מצאתי פער מהותי ביתר הפרטים שנבדקו, לרבות יום היסוד והלוחות, שנת 5000, `c/t`, הגבול האסטרונומי, ה־Seer והקאנון, נספח הפינגווינים, והטון הסאטירי של סעיף המעלות.

SEMANTIC_QA_RESULT: FAIL

---

<sub>Generated by [GitHub Copilot CLI](https://github.com/features/copilot/cli)</sub>
