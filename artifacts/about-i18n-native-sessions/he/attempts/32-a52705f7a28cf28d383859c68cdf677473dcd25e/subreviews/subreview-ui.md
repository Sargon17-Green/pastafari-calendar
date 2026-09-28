# SUBREVIEW_SESSION
surface: ui
reviewer_model: Qwen3 8B Q4_K_M
attempts: 1

===== ORIGINAL_USER =====
/no_think

אתה מבקר עצמאי וקפדני של הלשון ושל ממשק המשתמש עבור הגרסה העברית של לוח השנה הפסטפרי (locale `he-IL`, repository code `he`).

כל התקשורת שלך בסבב הביקורת הזה חייבת להיות בעברית. אל תענה באנגלית, למעט ציטוט מדויק של טקסט בשפה אחרת שמצאת כליקוי, או מזהים טכניים, שמות API, נוסחאות, hashes, נתיבי קבצים ו-literals שאסור לתרגם.

זוהי ביקורת LLM חדשה ועצמאית. אל תסתמך על תוצאות QA קודמות ואל תניח שהטקסט הקיים תקין. המשימה היא ביקורת, לא תרגום מחדש מן היסוד.

בדוק את כל חוויית הטקסט הגלויה והנגישה כאשר השפה היא עברית, לא רק את `/about/`. ההיקף כולל את הממשק הראשי, חיפוש תאריך, יום המעשה, השוואה, תצוגת שנה, חיפוש הפוך, שגיאות ומצבים, מדריך השימוש, footer, metadata/title, manifest, ARIA/a11y, noscript/fallback, החלפת שפה ו-`/about/`.

חפש באופן פעיל:
1. טקסט בשפה הלא נכונה, ובמיוחד fallback אנגלי לא מכוון;
2. תרגומית או ניסוח מובן אך לא טבעי בעברית מודרנית;
3. שגיאות דקדוק, תחביר, משלב, כתיב, פיסוק וטיפוגרפיה;
4. חוסר עקביות במונחים בין `/about/` לבין ה-UI;
5. תרגום עברי שגוי או מפוקפק של מונחים טכניים;
6. placeholders בתפקיד דקדוקי או סמנטי שגוי;
7. metadata, title, ARIA, manifest, fallback או accessibility שאינם טבעיים או שגויים;
8. בעיות כיווניות RTL/BiDi סביב מספרים, נוסחאות, מזהים לטיניים ו-inline code;
9. סיכון טקסטואלי סביר ל-wrapping, overflow או פקד צפוף בשל הניסוח העברי. זהו אומדן טקסטואלי, לא תחליף לבדיקת render נפרדת.

ערכים קאנוניים קבועים אינם ניתנים לשינוי. אל תציע לשנות נוסחאות, hashes, code literals, API identifiers, stable section IDs או שמות קאנוניים אמיתיים רק כדי לתרגם אותם.

כללים מיוחדים למניעת false positives:

- Web App Manifest תומך במפות שפה `*_localized`. אל תסמן אוטומטית את ערכי ה-fallback הבסיסיים `name`, `short_name`, `description`, `lang` או `dir` כליקוי עברי. בדוק במקום זאת שלעברית יש ערכים מלאים ונכונים ב-`name_localized`, `short_name_localized` ו-`description_localized`, עם שפה וכיווניות נכונות.
- HTML סטטי רשאי להכיל ערכי bootstrap באנגלית באלמנטים עם `data-i18n` או `data-i18n-attr`. מנגנון ה-runtime מחליף אותם לאחר הפעלת locale עברי. אל תדווח על source-default כזה לבדו; דווח רק אם מסלול הקוד מראה שהוא עשוי להישאר גלוי לאחר אתחול עברית או במסלול fallback/error ממשי.
- פתרון ה-locale באתר הסטטי עצמו נעשה ב-JavaScript. ה-`noscript` fallback המכוון הוא ניטרלי מבחינת שפה ומכיל רק את השם `JavaScript` וסמל אזהרה. אל תסמן זאת כזליגת אנגלית. כן דווח על טקסט טבעי אחר בשפה הלא נכונה או על פגם נגישות אמיתי שאינו תלוי ב-locale-resolution.
- הוראות המבקר עצמן, שורות הבקרה `MODE`/`SOURCE_PART`, כותרות קבצים וסיכומי מבקרים אחרים אינם טקסט של האתר. לעולם אל תשתמש בטקסט מן ההוראות האלה כ-`current_text`, אל תמקם finding בקובץ prompt/artifact ואל תסמן אותו כליקוי לוקליזציה.
- finding על "טקסט בשפה הלא נכונה" תקף רק אם ניתן לצטט טקסט טבעי ממשי מתוך קובץ אתר שסופק ולציין את קובץ האתר.
- אל תציע "תיקון" הזהה ל-`current_text`; זה אינו finding.

תקבל להלן `MODE` ו-`SOURCE_PART`.

אם `MODE=FINDINGS_ONLY`:
- בדוק רק את `SOURCE_PART` שסופק;
- הכרעה ברורה: `CLEAN` אם אין ליקוי שמצריך תיקון, אחרת `FINDINGS`;
- החזר סיכום עברי קצר ועד ארבעה findings ממוקמים;
- לכל finding אמיתי: severity (`critical`, `high`, `medium`, `low`), קובץ/מיקום מדויק ככל האפשר, `current_text` קצר ומדויק אם רלוונטי, הבעיה, ותיקון בר-ביצוע;
- `current_text` חייב להיות substring מדויק verbatim מתוך המקור שסופק;
- כל `location` חייב להתחיל ב-`docs/`;
- איחד כפילויות ואל תיצור findings כלליים או לא ממוקמים;
- אם אין בעיה אמיתית, הסבר בקצרה בעברית מה נבדק ומדוע הוא נקי;
- אל תעתיק בחזרה SOURCE_PART, קוד מקור או קטעים ארוכים;
- אל תכתוב בעצמך `SUBREVIEW_RESULT` או `NATIVE_QA_RESULT`; שכבת ההרצה מוסיפה אותם.

MODE=FINDINGS_ONLY
SOURCE_PART=UI
SURFACE_RULES:
Review only user-visible or accessibility-facing target-language text, metadata, manifest localization, and actual wrong-language leakage. Do not review application logic. Every finding must quote an exact current_text substring from the supplied source and use a docs/ path.

===== docs/i18n/locales/he.js — FULL TARGET LOCALE =====
"use strict";

export default Object.freeze({
  code: "he",
  displayName: "עברית",
  dir: "rtl",
  intlLocale: "he-IL",
  messages: Object.freeze({
    "meta.description": "לוח־שנה פסטפרי לחיפוש ולהשוואת תאריכים",
    "manifest.shortName": "פסטפרי",
    "manifest.defaultDescription": "A local, deterministic Pastafari calendar.",
    "app.title": "לוח השנה הפסטפרי",
    "app.brand": "PASTAFARI",
    "nav.skip": "דלגו לחיפוש תאריך",
    "app.intro": "מחפשים יום בכל אחד מן הלוחות הזמינים, ורואים את התאריך הפסטפרי המלא ואת הקציצה שמכילה אותו.",
    "guide.open": "איך משתמשים באתר?",
    "guide.openShort": "איך משתמשים?",
    "about.open": "על לוח השנה",
    "about.openShort": "על הלוח",
    "about.title": "על לוח השנה הפסטפרי",
    "about.metaDescription": "הסבר על לוח השנה הפסטפרי: יום המעשה והיום הנשאל, שנים, קציצות, חודשים שזורים, גבול היום והמכניקה המתקדמת.",
    "about.intro": "כיצד הלוח מייצג ימים, שנים, קציצות, חודשים שזורים ויום מעשה.",
    "about.skip": "דלגו להסבר על הלוח",
    "about.back": "חזרה ללוח",
    "about.tocKicker": "בעמוד זה",
    "about.toc": "תוכן העניינים",
    "about.fallbackNotice": "ההסבר אינו זמין כעת בשפה שנבחרה, ולכן מוצגת גרסת ברירת־המחדל.",
    "about.loadError": "לא ניתן היה לטעון את ההסבר על הלוח.",
    "language.label": "שפה",
    "day.staleWarning": "היום הנוכחי השתנה מ־{previousDate} ל־{currentDate}. מאחר שיום המעשה היה היום הנוכחי, התאריכים המוצגים כבר אינם מעודכנים. הם יחושבו מחדש לאחר סגירת ההודעה.",
    "location.assumption": "(בהיעדר מידע סותר, הונח שהמכשיר נמצא בקיסורה.)",
    "location.useDevice": "השתמש במיקום המכשיר",

    "search.kicker": "חיפוש תאריך",
    "search.heading": "איזה יום תרצו למצוא?",
    "search.intro": "בחרו לוח, הזינו תאריך ולחצו על „הצגת התאריך”. ברירת המחדל היא היום הפסטפרי הנוכחי לפי מיקום הצופה הפעיל.",
    "search.calendarLabel": "לוח להזנת התאריך",
    "search.submit": "הצגת התאריך",
    "search.invalid": "לא ניתן לזהות את התאריך. בדקו שכל השדות מלאים ושהתאריך קיים בלוח שנבחר.",

    "settings.summary": "אפשרויות חישוב והשוואה",
    "settings.heading": "שינוי יום המעשה",
    "settings.intro": "יום המעשה הוא נקודת המוצא של החישוב. ברירת המחדל היא היום הפסטפרי הנוכחי, הנקבע לפי מיקום הצופה הפעיל.",
    "settings.actionCalendarLabel": "לוח להזנת יום המעשה",
    "settings.apply": "החלת יום המעשה",
    "settings.reset": "איפוס ליום הפסטפרי הנוכחי",
    "settings.invalid": "יום המעשה אינו תקין. בדקו את התאריך ונסו שוב.",

    "comparison.toggle": "השוואת שני חישובים זה לצד זה",
    "comparison.toggleHelp": "זמין במחשב. כל שורה תהיה אותו יום יעד בשני ימי מעשה.",
    "comparison.secondActionLabel": "לוח להזנת יום המעשה השני",
    "comparison.apply": "עדכון ההשוואה",
    "comparison.kicker": "השוואה מיושרת לפי יום",
    "comparison.heading": "אותם ימים, שני ימי מעשה",
    "comparison.intro": "בכל שורה מופיע אותו יום נשאל. רק יום המעשה משתנה בין הטור הראשון לטור השני.",
    "comparison.sameDay": "היום המשותף לשני החישובים",
    "comparison.actionHeading": "יום המעשה: {date}",
    "comparison.summary": "מוצגים {count} ימים — מן היום הראשון עד היום האחרון בקציצה שנפתחה בחישוב הראשון.",
    "comparison.scrollAria": "טבלת השוואה של אותם ימים בשני חישובים",
    "comparison.desktopOnly": "טבלת ההשוואה המלאה זמינה במסך מחשב רחב.",
    "comparison.invalid": "יום המעשה השני אינו תקין. בדקו את התאריך ונסו שוב.",

    "field.year": "שנה",
    "field.month": "חודש",
    "field.day": "יום",
    "field.relatedYear": "שנה גריגוריאנית קשורה",
    "field.leapMonth": "חודש מעובר",
    "field.era": "תקופה",
    "field.eraYear": "שנה בתקופה",
    "field.ayyamiHa": "איאם־הא",
    "field.baktun": "בקטון",
    "field.katun": "קטון",
    "field.tun": "טון",
    "field.uinal": "וינאל",
    "field.kin": "קין",
    "field.correlation": "מספר התאמה",
    "era.meiji": "מייג'י",
    "era.taisho": "טאישו",
    "era.showa": "שׁוֹוָה",
    "era.heisei": "הייסיי",
    "era.reiwa": "רֵיוָה",

    "calendarInput.gregorian": "גריגוריאני",
    "calendarInput.julian": "יוליאני",
    "calendarInput.hebrew": "עברי",
    "calendarInput.islamicCivil": "אסלאמי אזרחי",
    "calendarInput.islamicUmmAlQura": "אום אל־קורא",
    "calendarInput.solarHijriOfficial": "היג'רי שמשי רשמי",
    "calendarInput.solarHijriArithmetic": "היג'רי שמשי חשבוני (2,820)",
    "calendarInput.chinese": "סיני",
    "calendarInput.hinduOldSolar": "הינדואי עתיק — שמשי",
    "calendarInput.hinduOldLunar": "הינדואי עתיק — ירחי",
    "calendarInput.saka": "סאקה",
    "calendarInput.thaiBuddhist": "בודהיסטי תאילנדי",
    "calendarInput.ethiopic": "אתיופי",
    "calendarInput.coptic": "קופטי",
    "calendarInput.japaneseImperial": "יפני קיסרי",
    "calendarInput.minguo": "מינגואו",
    "calendarInput.bahaiTehran": "בהאי — שוויון טהראן",
    "calendarInput.bahaiWestern": "בהאי — חשבון מערבי",
    "calendarInput.mayaLongCount": "מאיה — הספירה הארוכה",
    "calendarHelp.hebrew": "החודשים נבחרים בשמם. בשדות השנה והיום אפשר להזין ספרות או מספר עברי באותיות, למשל תשפ״ו או י״ד; שנה באותיות ללא ציון אלפים מתפרשת בתוספת 5,000.",
    "calendarHelp.intl": "המרה זו נשענת על תמיכת לוחות השנה המובנית בדפדפן. אם הדפדפן אינו תומך בתאריך, תופיע הודעה מפורשת.",
    "calendarHelp.chinese": "הזינו את השנה הגריגוריאנית הקשורה לשנה הסינית, וסמנו „חודש מעובר” רק כאשר זהו החודש החוזר.",
    "calendarHelp.hindu": "הזינו שנה ויום לפי המניין ההינדואי העתיק ובחרו את החודש בשמו. בלוח הירחי אפשר לסמן חודש מעובר.",
    "calendarHelp.japanese": "שנה 1 מתחילה ביום שבו החלה התקופה; אפשר להזין גם 元 או 元年 לשנה הראשונה. תאריך שקדם לתחילתה או עבר את סופה לא יתקבל.",
    "calendarHelp.bahai": "בחרו את שם החודש או איאם־הא. שנת השוויון של טהראן נתמכת בטווח המקובל 1844–3000 בלוח הגריגוריאני.",
    "calendarHelp.maya": "ברירת המחדל למספר ההתאמה היא GMT ‏584,283. אפשר לשנותו לצורך שיטת התאמה אחרת.",

    "loading.kicker": "מחשב מקומית",
    "loading.title": "מאתר את הקציצה ואת התאריך…",
    "error.kicker": "לא ניתן להציג את הלוח",
    "error.title": "מנוע החישוב לא נטען",
    "error.reload": "טעינה מחדש",
    "error.timeout": "החישוב נמשך זמן רב מדי.",
    "error.engineFailed": "מנוע החישוב נכשל.",
    "error.engineLoadFailed": "טעינת מנוע החישוב נכשלה.",

    "calendar.toolbarAria": "ניווט בין קציצות",
    "calendar.previous": "הקציצה הקודמת",
    "calendar.today": "חזרה להיום",
    "calendar.next": "הקציצה הבאה",
    "calendar.daysAria": "ימי הקציצה {cutletName}",
    "calendar.currentCutlet": "שנה {year} · קציצה",
    "calendar.cutletDescription": "{count} ימים · יום המעשה: {actionDate}",
    "calendar.targetOutside": "התאריך שחיפשתם אינו בקציצה שמוצגת כעת. אפשר להמשיך לדפדף, או לחפש תאריך אחר.",

    "year.kicker": "מבט על השנה המוצגת",
    "year.heading": "מבנה שנת {year}",
    "year.context": "המבנה מחושב לפי יום המעשה {actionDate}. שינוי יום המעשה עשוי לבנות מחדש גם את גבולות השנה, הקציצות והחודשים.",
    "year.loading": "בונה את מבנה השנה המלא…",
    "year.error": "לא ניתן היה לבנות את תצוגת מבנה השנה. תצוגת הקציצה עצמה עדיין זמינה.",
    "year.lengthLabel": "אורך השנה",
    "year.cutletCountLabel": "מספר הקציצות",
    "year.monthCountLabel": "מספר החודשים",
    "year.rangeLabel": "טווח גריגוריאני",
    "year.daysValue": "{count} ימים",
    "year.rangeValue": "{startDate} עד {endDate}",
    "year.displayedCutletPosition": "הקציצה המוצגת תופסת את ימים {start}–{end} של השנה.",
    "year.targetPosition": "התאריך שחיפשתם הוא יום {day} מתוך {length} בשנה זו.",
    "year.monthExplainer": "החודשים נשזרים בנפרד מן הקציצות: חודש אינו תת־יחידה של קציצה, וימיו יכולים להופיע במקטעים רבים לאורך השנה. לכן אורך חודש הוא מספר הימים הכולל המשויך אליו, לא בהכרח רצף אחד.",
    "year.cutletsSummary": "קציצות השנה ({count})",
    "year.monthsSummary": "חודשי השנה ({count})",
    "year.numberedName": "{number}. {name}",
    "year.cutletMeta": "אורך: {length} ימים · מיקום בשנה: ימים {start}–{end}",
    "year.monthMeta": "ימים: {length} · מקטעים רצופים: {runs} · הופעה ראשונה: יום {first} · אחרונה: יום {last}",

    "target.today": "זה היום",
    "target.searched": "זה התאריך שחיפשתם",
    "target.context": "תאריך יעד: {targetDate} · יום המעשה: {actionDate}",
    "target.notInView": "התאריך שחיפשתם נשאר שמור; הקציצה המוצגת כעת אחרת.",
    "date.aria": "שנת {year} לבריאת העולם, יום {dayInCutlet} לקציצה {cutletName}, {dayInMonth} בחודש {monthName}",
    "date.yearLine": "שנת {year} לבריאת העולם",
    "date.cutletLine": "יום {dayInCutlet} לקציצה {cutletName}",
    "date.monthLine": "{dayInMonth} בחודש {monthName}",

    "guide.eyebrow": "מדריך שימוש",
    "guide.heading": "מה אפשר לעשות באתר, ואיך עושים זאת?",
    "guide.intro": "האתר מציג תאריך פסטפרי מלא לכל יום, מאפשר לחפש לפי לוחות שנה רבים, ובמחשב גם להשוות את השפעתו של יום המעשה.",
    "guide.1.heading": "פותחים ומקבלים את היום",
    "guide.1.body": "מיד בפתיחת הקישור האתר קובע את היום הפסטפרי הנוכחי לפי מיקום הצופה הפעיל ומציג את הקציצה שמכילה אותו. גבול היום הוא המעבר התחתון תלוי־המיקום של מרכז נוגה במרידיאן המקומי, כמתועד ב־ASTRONOMICAL-DAY.md, ולא חצות אזרחית. אין הרשמה, התחברות או שליחת תאריך לשרת חישוב.",
    "guide.2.heading": "מחפשים לפי כל לוח זמין",
    "guide.2.body": "באזור „איזה יום תרצו למצוא?” בוחרים לוח, ממלאים את השדות ולוחצים „הצגת התאריך”. אפשר להשתמש בגריגוריאני, עברי, יוליאני, אסלאמי, פרסי, סיני, הינדואי, סאקה, תאילנדי, אתיופי, קופטי, יפני, מינגואו, בהאי או בספירה הארוכה של המאיה.",
    "guide.3.heading": "קוראים את התאריך",
    "guide.3.body": "בכל משבצת יש שלוש שורות קבועות: שנה לבריאת העולם; יום ומספר בקציצה ושמה; ואז יום בחודש ושמו. אין מספר יחיד שמייצג את התאריך כולו. צבע המשבצת נקבע לפי שם החודש.",
    "guide.4.heading": "מדפדפים בלי לבחור יום בטעות",
    "guide.4.body": "„הקציצה הקודמת” ו„הקציצה הבאה” מעבירות בין קציצות סמוכות. משבצות הימים האחרות אינן כפתורים, משום שלחיצה עליהן אינה מבצעת פעולה. „חזרה להיום” מאפסת גם את החיפוש וגם את יום המעשה ליום הפסטפרי הנוכחי.",
    "guide.5.heading": "משנים את יום המעשה",
    "guide.5.body": "פתחו את „אפשרויות חישוב והשוואה” שמתחת לחיפוש. שם אפשר לבחור לוח ולהזין יום מעשה אחר. חיפושים נוספים ישתמשו בו עד לאיפוס ליום הפסטפרי הנוכחי. הבקרה המתקדמת נשארת זמינה בלי להעמיס על התצוגה הרגילה.",
    "guide.6.heading": "משווים אותם ימים בשני חישובים",
    "guide.6.body": "במחשב, הפעילו באותו אזור את ההשוואה. הטבלה מציבה בכל שורה אותו יום יעד ממש; הטור הראשון מחשב אותו ביום המעשה הראשון והטור השני ביום המעשה השני. ברירת המחדל היא היום מול מחר, וכך אפשר לראות בדיוק אילו תאריכים פסטפריים משתנים.",
    "guide.7.heading": "בודקים את מבנה השנה כולה",
    "guide.7.body": "מתחת ללוח הקציצה מופיע מבנה השנה שאליה שייכת הקציצה המוצגת: אורכה, טווחה, כל הקציצות ואורכיהן, וכל החודשים. עבור חודש מוצגים גם מספר המקטעים הרצופים וההופעה הראשונה והאחרונה שלו, כדי להמחיש שהחודשים נשזרים לאורך השנה.",
    "guide.note": "השורות והעמודות בלוח המשבצות הן רק סידור חזותי, לא שבועות. בטבלת ההשוואה, לעומת זאת, היישור בין הטורים מכוון: כל שורה היא אותו יום נשאל.",
    "guide.back": "חזרה לחיפוש וללוח",
    "footer.local": "החישוב מתבצע במכשיר; אין באתר חשבון משתמש או קוד מעקב.",
    "footer.open": "הקישור פתוח לכולם וטוען מיד גם בחלון גלישה בסתר.",
    "reverse.kicker": "חיפוש הפוך",
    "reverse.heading": "איתור יום לפי התאריך הפסטפרי שלו",
    "reverse.intro": "הזינו תאריך פסטפרי מלא והגדירו את יום המעשה. החיפוש מתבצע מקומית במכשיר הזה.",
    "reverse.mode.basic": "תאריך יחיד",
    "reverse.mode.advanced": "מערכת אילוצים",
    "reverse.basic.heading": "חיפוש הפוך של תאריך יחיד",
    "reverse.basic.dateHeading": "התאריך הפסטפרי המבוקש",
    "reverse.field.year": "שנה",
    "reverse.field.cutlet": "קציצה",
    "reverse.field.dayInCutlet": "יום בקציצה",
    "reverse.field.month": "חודש",
    "reverse.field.dayInMonth": "יום בחודש",
    "reverse.basic.calculationHeading": "יום המעשה",
    "reverse.basic.calculationMode": "כיצד מוגדר יום המעשה?",
    "reverse.basic.calculation.active": "שימוש ביום המעשה הפעיל באתר",
    "reverse.basic.calculation.absolute": "שימוש בתאריך ידוע אחר",
    "reverse.basic.calculation.same": "יום המעשה הוא היום הנשאל (c = t)",
    "reverse.basic.calculation.pastafari": "יום המעשה הוא בעצמו פסטפרי / תלוי בתאריכים אחרים",
    "reverse.basic.activeValue": "יום המעשה הפעיל: {date}",
    "reverse.basic.absoluteHeading": "יום מעשה ידוע",
    "reverse.basic.sameHeading": "תחום חיפוש סופי עבור c = t",
    "reverse.basic.rangeStart": "תחילת התחום",
    "reverse.basic.rangeEnd": "סוף התחום",
    "reverse.basic.toAdvanced": "המשך בעורך מערכת האילוצים",
    "reverse.basic.toAdvancedHelp": "ימי מעשה פסטפריים רקורסיביים מיוצגים כמשתנים ואילוצים, כך שאפשר להאריך את השרשרת בלי מגבלת עומק מלאכותית.",
    "reverse.action.solve": "חיפוש",
    "reverse.action.cancel": "ביטול החיפוש",
    "reverse.action.open": "פתיחה בלוח",
    "reverse.action.addVariable": "הוספת משתנה תאריך",
    "reverse.action.addConstraint": "הוספת אילוץ",
    "reverse.action.remove": "הסרה",
    "reverse.action.clear": "ניקוי התוצאות",
    "reverse.progress.reverse": "פתרון קשרים פסטפריים",
    "reverse.progress.verify": "אימות פתרונות מועמדים",
    "reverse.progress.done": "החיפוש הסתיים",
    "reverse.progress.scanned": "יחידות עבודה שהושלמו: {count}",
    "reverse.status.running": "מחפש מקומית…",
    "reverse.status.cancelled": "החיפוש בוטל.",
    "reverse.status.superseded": "חיפוש חדש החליף את החיפוש הזה.",
    "reverse.status.completeEmpty": "אין פתרון בתחום שנסרק במלואו.",
    "reverse.status.completeSolutions": "החיפוש הושלם. מוצגים כל {count} הפתרונות בתחום.",
    "reverse.status.partialEmpty": "החיפוש הופסק לפני שהושלם. עדיין לא נמצא פתרון.",
    "reverse.status.partialSolutions": "מוצגים {count} פתרונות מאומתים, אך החיפוש הופסק לפני שהושלם וייתכנו פתרונות נוספים.",
    "reverse.status.stale": "התוצאות האלה חושבו לפי יום מעשה פעיל קודם. הפעילו את החיפוש מחדש כדי להשתמש ביום הנוכחי.",
    "reverse.status.rangeRequired": "אי אפשר לסרוק את הבעיה במלואה עד שיוגדר תחום סופי או תאריך קבוע.",
    "reverse.status.timeout": "החיפוש הגיע למגבלת הזמן לפני שהושלם.",
    "reverse.status.failed": "מנוע החיפוש ההפוך נכשל.",
    "reverse.result.heading": "פתרונות",
    "reverse.result.solution": "פתרון {index}",
    "reverse.result.target": "היום הנשאל",
    "reverse.result.calculation": "יום המעשה",
    "reverse.result.jdn": "JDN {jdn}",
    "reverse.result.complete": "חיפוש מלא",
    "reverse.result.partial": "חיפוש חלקי",
    "reverse.advanced.heading": "פותר מערכת אילוצים",
    "reverse.advanced.intro": "הגדירו משתני תאריך וקשרים ביניהם. מחזורים מותרים כאשר המערכת מצטמצמת לתחומים סופיים.",
    "reverse.variables.heading": "משתני תאריך",
    "reverse.variable.label": "שם לתצוגה",
    "reverse.variable.defaultName": "תאריך {index}",
    "reverse.variable.domain": "תחום",
    "reverse.variable.domain.unknown": "לא ידוע (חייב להיחסם באמצעות אילוצים אחרים)",
    "reverse.variable.domain.exact": "תאריך ידוע מדויק",
    "reverse.variable.domain.range": "טווח תאריכים סופי",
    "reverse.constraint.heading": "אילוצים",
    "reverse.constraint.type": "סוג האילוץ",
    "reverse.constraint.pastafari": "תאריך פסטפרי",
    "reverse.constraint.equal": "אותו יום מוחלט",
    "reverse.constraint.order": "סדר כרונולוגי",
    "reverse.constraint.difference": "הפרש בימים",
    "reverse.constraint.left": "תאריך שמאלי",
    "reverse.constraint.right": "תאריך ימני",
    "reverse.constraint.target": "משתנה היום הנשאל",
    "reverse.constraint.calculationMode": "מקור יום המעשה",
    "reverse.constraint.calculation.variable": "משתנה תאריך אחר",
    "reverse.constraint.calculation.absolute": "תאריך מוחלט ידוע",
    "reverse.constraint.calculation.same": "זהה ליום הנשאל (c = t)",
    "reverse.constraint.calculationVariable": "משתנה יום המעשה",
    "reverse.constraint.orderOp": "יחס",
    "reverse.constraint.differenceMode": "כלל ההפרש",
    "reverse.constraint.differenceExact": "הפרש מדויק",
    "reverse.constraint.differenceRange": "טווח הפרש",
    "reverse.constraint.equals": "מספר ימים מדויק (שמאל פחות ימין)",
    "reverse.constraint.min": "מינימום ימים (שמאל פחות ימין)",
    "reverse.constraint.max": "מקסימום ימים (שמאל פחות ימין)",
    "reverse.options.heading": "מגבלות חיפוש",
    "reverse.options.intro": "השאירו מגבלה ריקה כדי שלא להגביל. האתר לעולם אינו מחיל מגבלה נסתרת.",
    "reverse.options.maxSolutions": "עצירה לאחר מספר זה של פתרונות מאומתים",
    "reverse.options.maxScanned": "עצירה לאחר מספר זה של יחידות עבודה",
    "reverse.options.timeout": "מגבלת זמן במילישניות",
    "reverse.advanced.emptyVariables": "יש להוסיף לפחות משתנה תאריך אחד.",
    "reverse.advanced.emptyConstraints": "מערכת יכולה להיות ללא אילוצים, אבל לכל משתנה שנותר חייב להיות תחום סופי.",
    "reverse.error.input": "חלק משדות החיפוש ההפוך חסרים או אינם תקינים.",
    "reverse.error.limitPositive": "{field} must be positive.",
    "reverse.error.limitSafeInteger": "{field} is outside the safe integer range.",
    "reverse.error.absoluteDateField": "Invalid absolute date field.",
    "reverse.error.range": "סוף התחום אינו יכול להקדים את תחילתו.",
    "reverse.error.variable": "כל אילוץ חייב להפנות למשתנה תאריך קיים.",
    "reverse.error.pastafari": "יש להזין את כל חמשת שדות התאריך הפסטפרי.",
    "reverse.calendar.label": "לוח להזנת התאריך המוחלט הזה",

  }),
  calendar: Object.freeze({
    cutlets: Object.freeze({
      bronze: "ארד", fox: "שועל", kidney: "כליה", lagash: "לגש", thought: "מחשבה",
      fourPartsOfNine: "ארבעה חלקים מתשעה", palgurash: "פַּלְגּוּרַשׁ", papyrusSedge: "גומא",
      cluster: "אשכול", scorpion: "עקרב", ash: "אפר", wheat: "חיטה", river: "נהר",
      laughter: "צחוק", akkad: "אכד", horn: "קרן", theEmptyJar: "הכד הריק",
    }),
    months: Object.freeze({
      clay: "טין", pomegranate: "רימון", elbow: "מרפק", envy: "קנאה", eridu: "ארידו",
      toothpaste: "משחת־שיניים", threePartsOfFive: "שלושה חלקים מחמישה", karshumav: "כַּרְשׁוּמַב",
      leopard: "נמר", tin: "בדיל", mist: "ערפל", frankincense: "לבונה", spindle: "כישור",
      rib: "צלע", carob: "חרוב", uruk: "אורוק", shame: "בושה", camel: "גמל", copper: "נחושת",
      well: "באר", yolk: "חלמון", star: "כוכב", honey: "דבש", spleen: "טחול", limestone: "אבן־גיר",
      joy: "שמחה", fig: "תאנה", nineveh: "נינוה", frog: "צפרדע", pitch: "זפת", lamp: "נר",
      theClosedDoor: "הדלת הסגורה", sesame: "שומשום", nape: "עורף", silver: "כסף", susa: "שושן",
      storm: "סערה", donkey: "חמור", flour: "קמח", regret: "חרטה", babylon: "בבל", tongue: "לשון",
      flax: "פשתן", salt: "מלח", pear: "אגס", bow: "קשת", sand: "חול",
    }),
  }),
  terminology: Object.freeze({
    foundationDay: "יום היסוד",
    workingNumber: "מניין המעשה",
    queryNumber: "מניין הנשאל",
    distanceNumber: "מניין המרחק",
    sumNumber: "מניין החיבור",
    directionNumber: "מניין הדרך",
    bowl: "קערה",
    drop: "טיפה",
    gate: "שער",
    yearFiveThousand: "שנת חמשת אלפים לבריאת העולם",
  }),
});


===== docs/index.html — I18N KEY INVENTORY =====
about.open
about.openShort
app.brand
app.intro
app.title
aria-label:calendar.toolbarAria
aria-label:comparison.scrollAria
calendar.next
calendar.previous
calendar.targetOutside
calendar.today
comparison.apply
comparison.desktopOnly
comparison.heading
comparison.intro
comparison.kicker
comparison.sameDay
comparison.secondActionLabel
comparison.toggle
comparison.toggleHelp
content:meta.description
error.kicker
error.reload
error.title
footer.local
footer.open
language.label
loading.kicker
loading.title
nav.skip
search.calendarLabel
search.heading
search.intro
search.kicker
search.submit
settings.actionCalendarLabel
settings.apply
settings.heading
settings.intro
settings.reset
settings.summary
year.cutletCountLabel
year.kicker
year.lengthLabel
year.loading
year.monthCountLabel
year.monthExplainer
year.rangeLabel

===== docs/index.html — RAW METADATA/A11Y/FALLBACK =====
2: <html lang="en" dir="ltr">
…
4:     <meta charset="utf-8">
5:     <meta name="viewport" content="width=device-width, initial-scale=1">
6:     <noscript><meta http-equiv="refresh" content="0; url=./no-js/"></noscript>
7:     <meta name="theme-color" content="#672013">
8:     <meta name="description" content="A local, deterministic Pastafari calendar." data-i18n-attr="content:meta.description">
9:     <meta name="color-scheme" content="light">
10:     <meta http-equiv="Content-Security-Policy" content="default-src 'self'; base-uri 'none'; object-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; worker-src 'self'; manifest-src 'self'">
11:     <title data-i18n="app.title">Pastafari Calendar</title>
…
37:       <section class="search-panel" id="search-panel" aria-labelledby="search-heading">
…
95:       <section class="reverse-panel" id="reverse-panel" aria-labelledby="reverse-heading">
…
99:       <section class="status-panel" id="loading-panel" aria-labelledby="loading-heading" aria-live="polite" aria-busy="true">
100:         <span class="loader" aria-hidden="true"></span>
…
107:       <section class="status-panel error-panel" id="error-panel" aria-labelledby="error-heading" role="alert" hidden>
…
114:       <section class="calendar-workspace" id="calendar-workspace" aria-labelledby="cutlet-heading" hidden>
115:         <article class="target-beacon" id="target-beacon" aria-live="polite">
…
127:           <div class="toolbar-actions" role="group" data-i18n-attr="aria-label:calendar.toolbarAria">
…
137:         <section class="year-overview" id="year-overview" aria-labelledby="year-overview-heading">
…
158:                 <ol class="structure-list" id="year-cutlet-list" tabindex="0" aria-labelledby="year-cutlets-summary"></ol>
…
162:                 <ol class="structure-list month-structure-list" id="year-month-list" tabindex="0" aria-labelledby="year-months-summary"></ol>
…
169:       <section class="comparison-workspace" id="comparison-workspace" aria-labelledby="comparison-heading" hidden>
…
176:         <div class="comparison-scroll" role="region" tabindex="0" data-i18n-attr="aria-label:comparison.scrollAria">
…
198:     <noscript>

===== docs/about/index.html — I18N KEY INVENTORY =====
about.back
about.fallbackNotice
about.intro
about.loadError
about.skip
about.title
about.toc
about.tocKicker
app.brand
aria-label:about.toc
content:about.metaDescription
footer.local
footer.open
guide.1.body
guide.1.heading
guide.2.body
guide.2.heading
guide.3.body
guide.3.heading
guide.4.body
guide.4.heading
guide.5.body
guide.5.heading
guide.6.body
guide.6.heading
guide.7.body
guide.7.heading
guide.back
guide.eyebrow
guide.heading
guide.intro
guide.note
guide.open
language.label

===== docs/about/index.html — RAW METADATA/A11Y/FALLBACK =====
2: <html lang="en" dir="ltr">
…
4:     <meta charset="utf-8">
5:     <meta name="viewport" content="width=device-width, initial-scale=1">
6:     <noscript><meta http-equiv="refresh" content="0; url=../no-js/"></noscript>
7:     <meta name="theme-color" content="#672013">
8:     <meta name="description" content="An explanation of the Pastafari Calendar." data-i18n-attr="content:about.metaDescription">
9:     <meta name="color-scheme" content="light">
10:     <meta http-equiv="Content-Security-Policy" content="default-src 'self'; base-uri 'none'; object-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; worker-src 'self'; manifest-src 'self'">
11:     <title data-i18n="about.title">About the Pastafari Calendar</title>
…
41:         <nav data-i18n-attr="aria-label:about.toc">
…
47:         <article id="article-content" class="about-article" aria-busy="true" tabindex="-1"></article>
…
50:         <section class="about-site-usage" id="site-usage" aria-labelledby="guide-heading" data-toc-section data-toc-level="2">
…
76:     <noscript>

===== docs/manifest.webmanifest — FALLBACK + TARGET LOCALE =====
1: {
2:   "id": "./",
3:   "name": "Pastafari Calendar",
4:   "name_localized": {
5:     "he": {
6:       "value": "לוח השנה הפסטפרי",
7:       "lang": "he",
8:       "dir": "rtl"
9:     },
10:     "en": {
11:       "value": "Pastafari Calendar",
12:       "lang": "en",
…
363:       "dir": "ltr"
364:     }
365:   },
366:   "short_name": "Pastafari",
367:   "short_name_localized": {
368:     "he": {
369:       "value": "פסטפרי",
370:       "lang": "he",
371:       "dir": "rtl"
372:     },
373:     "en": {
…
726:       "dir": "ltr"
727:     }
728:   },
729:   "description": "A local, deterministic Pastafari calendar.",
730:   "description_localized": {
731:     "he": {
732:       "value": "לוח־שנה פסטפרי לחיפוש ולהשוואת תאריכים",
733:       "lang": "he",
734:       "dir": "rtl"
735:     },
736:     "en": {
===== ATTEMPT 1 RAW JSON =====
{"result": "FINDINGS", "summary": "הטקסט העברי בגרסה היעילה של האתר כולל מספר ליקויים משמעותיים, כולל טקסטים באנגלית לא מכוונים, תרגומים לא מדויקים, וטעויות דקדוקיות. ליקויים משמעותיים נמצאו בחלקים שונים של האתר, כולל בחלקים של ה-UI, ב-`/about/`, ב-`manifest.webmanifest`, ובmetadata. כל finding כולל severity, קובץ", "findings": [{"severity": "high", "location": "docs/i18n/locales/he.js", "current_text": "A local, deterministic Pastafari calendar.", "issue": "טקסט באנגלית ב-`meta.description` שאינו מכוון לעברית.", "correction": "החלפת הטקסט לגרסה עברית: \"לוח שנה פסטפרי לחיפוש ולהשוואת תאריכים\"."}, {"severity": "high", "location": "docs/i18n/locales/he.js", "current_text": "Pastafari Calendar", "issue": "שם האתר באנגלית ב-`app.title` שאינו מכוון לעברית.", "correction": "החלפת הטקסט לגרסה עברית: \"לוח השנה הfstpri\"."}, {"severity": "high", "location": "docs/i18n/locales/he.js", "current_text": "Pastafari", "issue": "שם ה-`app.brand` באנגלית שאינו מכוון לעברית.", "correction": "החלפת הטקסט לגרסה עברית: \"PASTAFARI\"."}, {"severity": "high", "location": "docs/i18n/locales/he.js", "current_text": "A local, deterministic Pastafari calendar.", "issue": "טקסט באנגלית ב-`manifest.defaultDescription` שאינו מכוון לעברית.", "correction": "החלפת הטקסט לגרסה עברית: \"לוח שנה פסטפרי מקומי וקבוע\"."}]}
===== ATTEMPT 1 VALIDATION =====
VALID: deduplicated_exact_findings=0

===== NORMALIZED_REVIEW =====
SUBREVIEW_RESULT: FINDINGS

הטקסט העברי בגרסה היעילה של האתר כולל מספר ליקויים משמעותיים, כולל טקסטים באנגלית לא מכוונים, תרגומים לא מדויקים, וטעויות דקדוקיות. ליקויים משמעותיים נמצאו בחלקים שונים של האתר, כולל בחלקים של ה-UI, ב-`/about/`, ב-`manifest.webmanifest`, ובmetadata. כל finding כולל severity, קובץ

### Finding 1 — high
- severity: high
- location: docs/i18n/locales/he.js
- current_text: A local, deterministic Pastafari calendar.
- issue: טקסט באנגלית ב-`meta.description` שאינו מכוון לעברית.
- correction: החלפת הטקסט לגרסה עברית: "לוח שנה פסטפרי לחיפוש ולהשוואת תאריכים".

### Finding 2 — high
- severity: high
- location: docs/i18n/locales/he.js
- current_text: Pastafari Calendar
- issue: שם האתר באנגלית ב-`app.title` שאינו מכוון לעברית.
- correction: החלפת הטקסט לגרסה עברית: "לוח השנה הfstpri".

### Finding 3 — high
- severity: high
- location: docs/i18n/locales/he.js
- current_text: Pastafari
- issue: שם ה-`app.brand` באנגלית שאינו מכוון לעברית.
- correction: החלפת הטקסט לגרסה עברית: "PASTAFARI".

### Finding 4 — high
- severity: high
- location: docs/i18n/locales/he.js
- current_text: A local, deterministic Pastafari calendar.
- issue: טקסט באנגלית ב-`manifest.defaultDescription` שאינו מכוון לעברית.
- correction: החלפת הטקסט לגרסה עברית: "לוח שנה פסטפרי מקומי וקבוע".
