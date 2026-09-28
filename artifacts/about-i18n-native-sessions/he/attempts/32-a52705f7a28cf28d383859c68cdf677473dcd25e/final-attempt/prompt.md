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

=== FINAL_ONLY_INSTRUCTIONS ===

אם `MODE=FINAL`:
- תקבל findings מסבבי המשנה; בחן אותם ביקורתית ודחה false positives שסותרים את הכללים לעיל;
- הכרעה סופית ברורה: `PASS` או `FAIL`; שכבת ההרצה מוסיפה בעצמה את שורת `NATIVE_QA_RESULT`;
- PASS מותר רק אם לאחר האיחוד הביקורתי לא נשאר ליקוי אמיתי בלשון, fallback, מינוח, accessibility-text או עקביות locale;
- אל תמציא finding שלא הופיע ברשימת המועמדים המותרת שסופקה לך;
- אל תכתוב בעצמך `NATIVE_QA_RESULT` בתוך גוף הדוח;
- הדוח הסופי חייב להיות בעברית ולכלול:
  - תוצאה כוללת;
  - כל finding מאומת, עם severity, קובץ/מיקום, הטקסט/הבעיה, הסבר ותיקון מומלץ;
  - סעיף נפרד על טקסט בשפה אחרת/fallback;
  - סעיף נפרד על עקביות `/about/` מול ה-UI;
  - סעיף נפרד על metadata/ARIA/manifest/noscript/fallback;
  - סעיף נפרד על סיכוני UI/wrapping טקסטואליים;
  - במקרה PASS, ציון ברור אילו משטחים נבדקו ומדוע לא נשאר ליקוי שמצריך תיקון.

אל תתאר את הסבב הזה כבדיקת render חזותית. זו ביקורת linguistic whole-site קפדנית ועצמאית בעברית.

MODE=FINAL
SOURCE_PART=SUBREVIEW_FINDINGS_WITH_VERIFIED_LOCAL_CONTEXT

The four surface reviews below already inspected the primary sources. A deterministic gate has removed duplicate, no-op, runtime-localized bootstrap, and localized-manifest fallback pseudo-findings where those exemptions were mechanically proven. Do not restore rejected candidates. Do not invent new findings. Every FAIL finding must use exactly a (location, current_text) pair from SURVIVING_CANDIDATES.
You may return PASS after rejecting all surviving candidates, or FAIL only with findings drawn from the surviving candidate list. 
===== ORIGINAL_SUBREVIEWS =====
===== UI SUBREVIEW =====
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


===== ABOUT SUBREVIEW =====
SUBREVIEW_RESULT: FINDINGS

הטקסט העברי של דף `/about/` כולל מספר בעיות טקסטואליות ופונקציונליות. להלן ארבעה findings ממוקמים:

### Finding 1 — medium
- severity: medium
- location: docs/about/content/he.html#date-parts
- current_text: למשל, בצורה כללית:
- issue: הטקסט 'בצורה כללית' אינו מדויק ומכיל מונח כללי שאינו מוגדר ב맥락.
- correction: החלפת 'בצורה כללית' ל'למשל, בצורה כללית:' או 'למשל, בצורה כללית:'.

### Finding 2 — medium
- severity: medium
- location: docs/about/content/he.html#year-5000
- current_text: שנת 5000 אינה מבחן לכך ש־<code>t=c</code>.
- issue: הטקסט 'מבחן' אינו מדויק ומכיל מונח שאינו מתאים ל맥락 ההלחוטי.
- correction: החלפת 'מבחן' ל'מבחן' או 'הוכחה' בהתאם ל맥락.

### Finding 3 — medium
- severity: medium
- location: docs/about/content/he.html#reverse-conversion
- current_text: אבל בלי לדעת את יום המעשה, המצב שונה.
- issue: הטקסט 'אבל' מופיע פעמיים ברצף, מה שגורם לאי-הסכמה ומכבד את הקריאה.
- correction: החלפת 'אבל' בפעם השנייה ל'במקרה זה' או 'במקרה זה' כדי להימנע מהסכמה.

### Finding 4 — medium
- severity: medium
- location: docs/about/content/he.html#reverse-conversion
- current_text: קיימות דוגמאות מפורשות שבהן אותו תאריך מלא מתקבל במרחקים שונים מיום המעשה.
- issue: הטקסט 'במרחקים שונים' אינו מדויק ומכיל מונח שאינו מוגדר ב맥락.
- correction: החלפת 'במרחקים שונים' ל'במרחקים שונים' או 'בשונה מהיום המעשה' בהתאם ל맥락.


===== INTEGRATION SUBREVIEW =====
SUBREVIEW_RESULT: FINDINGS

הבדיקה של קבצי הלוגיקה והניהול של הלשון העברית בפרויקט הfstri Calendar הפגנת כמה בעיות משמעותיות. הבעיות כוללות טקסטים בשפה הלא נכונה, טרגומים לא מדויקים, ובעיות עם תצוגה וניהול מודעות. כל הבעיות מפורטות בהמשך.

### Finding 1 — medium
- severity: medium
- location: docs/i18n/runtime.js
- current_text: textContent = translate(locale, element.dataset.i18n);
- issue: הטקסט 'textContent = translate(locale, element.dataset.i18n);' מופיע בקוד, אך הוא לא טקסט מוצג. אין צורך בבדיקה של טקסטים מוצגים בקוד זה.
- correction: אין צורך ב תיקון, כי הקוד אינו מופיע כטקסט מוצג.

### Finding 2 — medium
- severity: medium
- location: docs/i18n/registry.js
- current_text: defineLocale("he", "עברית", "rtl", "he-IL", "complete", () => import("./locales/he.js?v=19-about-i18n"))
- issue: השם "he" מופיע בקוד, אך הוא לא טקסט מוצג. אין צורך בבדיקה של טקסטים מוצגים בקוד זה.
- correction: אין צורך ב תיקון, כי הקוד אינו מופיע כטקסט מוצג.

### Finding 3 — medium
- severity: medium
- location: docs/i18n/registry.js
- current_text: defineLocale("en", "English", "ltr", "en-US", "complete", () => import("./locales/en.js?v=19-about-i18n"))
- issue: השם "en" מופיע בקוד, אך הוא לא טקסט מוצג. אין צורך בבדיקה של טקסטים מוצגים בקוד זה.
- correction: אין צורך ב תיקון, כי הקוד אינו מופיע כטקסט מוצג.

### Finding 4 — medium
- severity: medium
- location: docs/i18n/registry.js
- current_text: defineLocale("af", "Afrikaans", "ltr", "af-ZA", "partial", () => import("./locales/af.js?v=19-about-i18n"))
- issue: השם "af" מופיע בקוד, אך הוא לא טקסט מוצג. אין צורך בבדיקה של טקסטים מוצגים בקוד זה.
- correction: אין צורך ב תיקון, כי הקוד אינו מופיע כטקסט מוצג.


===== CONSISTENCY SUBREVIEW =====
SUBREVIEW_RESULT: FINDINGS

הטקסט הופך לבעייתי עקב חוסר עקביות במונחים בין ה-UI לבין `/about/`.

### Finding 1 — medium
- severity: medium
- location: docs/i18n/locales/he.js
- current_text: PASTAFARI
- issue: השם "PASTAFARI" מופיע ב-UI כשם מסחרי (בשורה `app.brand`) אך אינו מופיע ב-`/about/` בגרסה העברית. זה גורם לחוסר עקביות בין המונחים.
- correction: השם "PASTAFARI" צריך להיות מופיע גם ב-`/about/` בגרסה העברית, כשם מסחרי.

### Finding 2 — medium
- severity: medium
- location: docs/i18n/locales/he.js
- current_text: היום הנשאל
- issue: המונח "היום הנשאל" מופיע ב-`/about/` אך לא מופיע ב-UI. זה גורם לחוסר עקביות בין המונחים.
- correction: המונח "היום הנשאל" צריך להיות מופיע גם ב-UI, כשם מונח מרכזי.

### Finding 3 — medium
- severity: medium
- location: docs/i18n/locales/he.js
- current_text: יום המעשה
- issue: המונח "יום המעשה" מופיע ב-UI אך לא מופיע ב-`/about/` בגרסה העברית. זה גורם לחוסר עקביות בין המונחים.
- correction: המונח "יום המעשה" צריך להיות מופיע גם ב-`/about/` בגרסה העברית, כשם מונח מרכזי.

### Finding 4 — medium
- severity: medium
- location: docs/i18n/locales/he.js
- current_text: שנת 5000
- issue: המונח "שנת 5000" מופיע ב-`/about/` אך לא מופיע ב-UI. זה גורם לחוסר עקביות בין המונחים.
- correction: המונח "שנת 5000" צריך להיות מופיע גם ב-UI, כשם מונח מרכזי.


===== DETERMINISTICALLY_REJECTED_CANDIDATES =====
[
  {
    "reason": "duplicate location/current_text candidate",
    "candidate": {
      "severity": "high",
      "location": "docs/i18n/locales/he.js",
      "current_text": "A local, deterministic Pastafari calendar.",
      "issue": "טקסט באנגלית ב-`manifest.defaultDescription` שאינו מכוון לעברית.",
      "correction": "החלפת הטקסט לגרסה עברית: \"לוח שנה פסטפרי מקומי וקבוע\".",
      "_surface": "ui"
    }
  }
]

===== SURVIVING_CANDIDATES =====
[
  {
    "severity": "high",
    "location": "docs/i18n/locales/he.js",
    "current_text": "A local, deterministic Pastafari calendar.",
    "issue": "טקסט באנגלית ב-`meta.description` שאינו מכוון לעברית.",
    "correction": "החלפת הטקסט לגרסה עברית: \"לוח שנה פסטפרי לחיפוש ולהשוואת תאריכים\"."
  },
  {
    "severity": "high",
    "location": "docs/i18n/locales/he.js",
    "current_text": "Pastafari Calendar",
    "issue": "שם האתר באנגלית ב-`app.title` שאינו מכוון לעברית.",
    "correction": "החלפת הטקסט לגרסה עברית: \"לוח השנה הfstpri\"."
  },
  {
    "severity": "high",
    "location": "docs/i18n/locales/he.js",
    "current_text": "Pastafari",
    "issue": "שם ה-`app.brand` באנגלית שאינו מכוון לעברית.",
    "correction": "החלפת הטקסט לגרסה עברית: \"PASTAFARI\"."
  },
  {
    "severity": "medium",
    "location": "docs/about/content/he.html#date-parts",
    "current_text": "למשל, בצורה כללית:",
    "issue": "הטקסט 'בצורה כללית' אינו מדויק ומכיל מונח כללי שאינו מוגדר ב맥락.",
    "correction": "החלפת 'בצורה כללית' ל'למשל, בצורה כללית:' או 'למשל, בצורה כללית:'."
  },
  {
    "severity": "medium",
    "location": "docs/about/content/he.html#year-5000",
    "current_text": "שנת 5000 אינה מבחן לכך ש־<code>t=c</code>.",
    "issue": "הטקסט 'מבחן' אינו מדויק ומכיל מונח שאינו מתאים ל맥락 ההלחוטי.",
    "correction": "החלפת 'מבחן' ל'מבחן' או 'הוכחה' בהתאם ל맥락."
  },
  {
    "severity": "medium",
    "location": "docs/about/content/he.html#reverse-conversion",
    "current_text": "אבל בלי לדעת את יום המעשה, המצב שונה.",
    "issue": "הטקסט 'אבל' מופיע פעמיים ברצף, מה שגורם לאי-הסכמה ומכבד את הקריאה.",
    "correction": "החלפת 'אבל' בפעם השנייה ל'במקרה זה' או 'במקרה זה' כדי להימנע מהסכמה."
  },
  {
    "severity": "medium",
    "location": "docs/about/content/he.html#reverse-conversion",
    "current_text": "קיימות דוגמאות מפורשות שבהן אותו תאריך מלא מתקבל במרחקים שונים מיום המעשה.",
    "issue": "הטקסט 'במרחקים שונים' אינו מדויק ומכיל מונח שאינו מוגדר ב맥락.",
    "correction": "החלפת 'במרחקים שונים' ל'במרחקים שונים' או 'בשונה מהיום המעשה' בהתאם ל맥락."
  },
  {
    "severity": "medium",
    "location": "docs/i18n/runtime.js",
    "current_text": "textContent = translate(locale, element.dataset.i18n);",
    "issue": "הטקסט 'textContent = translate(locale, element.dataset.i18n);' מופיע בקוד, אך הוא לא טקסט מוצג. אין צורך בבדיקה של טקסטים מוצגים בקוד זה.",
    "correction": "אין צורך ב תיקון, כי הקוד אינו מופיע כטקסט מוצג."
  },
  {
    "severity": "medium",
    "location": "docs/i18n/registry.js",
    "current_text": "defineLocale(\"he\", \"עברית\", \"rtl\", \"he-IL\", \"complete\", () => import(\"./locales/he.js?v=19-about-i18n\"))",
    "issue": "השם \"he\" מופיע בקוד, אך הוא לא טקסט מוצג. אין צורך בבדיקה של טקסטים מוצגים בקוד זה.",
    "correction": "אין צורך ב תיקון, כי הקוד אינו מופיע כטקסט מוצג."
  },
  {
    "severity": "medium",
    "location": "docs/i18n/registry.js",
    "current_text": "defineLocale(\"en\", \"English\", \"ltr\", \"en-US\", \"complete\", () => import(\"./locales/en.js?v=19-about-i18n\"))",
    "issue": "השם \"en\" מופיע בקוד, אך הוא לא טקסט מוצג. אין צורך בבדיקה של טקסטים מוצגים בקוד זה.",
    "correction": "אין צורך ב תיקון, כי הקוד אינו מופיע כטקסט מוצג."
  },
  {
    "severity": "medium",
    "location": "docs/i18n/registry.js",
    "current_text": "defineLocale(\"af\", \"Afrikaans\", \"ltr\", \"af-ZA\", \"partial\", () => import(\"./locales/af.js?v=19-about-i18n\"))",
    "issue": "השם \"af\" מופיע בקוד, אך הוא לא טקסט מוצג. אין צורך בבדיקה של טקסטים מוצגים בקוד זה.",
    "correction": "אין צורך ב תיקון, כי הקוד אינו מופיע כטקסט מוצג."
  },
  {
    "severity": "medium",
    "location": "docs/i18n/locales/he.js",
    "current_text": "PASTAFARI",
    "issue": "השם \"PASTAFARI\" מופיע ב-UI כשם מסחרי (בשורה `app.brand`) אך אינו מופיע ב-`/about/` בגרסה העברית. זה גורם לחוסר עקביות בין המונחים.",
    "correction": "השם \"PASTAFARI\" צריך להיות מופיע גם ב-`/about/` בגרסה העברית, כשם מסחרי."
  },
  {
    "severity": "medium",
    "location": "docs/i18n/locales/he.js",
    "current_text": "היום הנשאל",
    "issue": "המונח \"היום הנשאל\" מופיע ב-`/about/` אך לא מופיע ב-UI. זה גורם לחוסר עקביות בין המונחים.",
    "correction": "המונח \"היום הנשאל\" צריך להיות מופיע גם ב-UI, כשם מונח מרכזי."
  },
  {
    "severity": "medium",
    "location": "docs/i18n/locales/he.js",
    "current_text": "יום המעשה",
    "issue": "המונח \"יום המעשה\" מופיע ב-UI אך לא מופיע ב-`/about/` בגרסה העברית. זה גורם לחוסר עקביות בין המונחים.",
    "correction": "המונח \"יום המעשה\" צריך להיות מופיע גם ב-`/about/` בגרסה העברית, כשם מונח מרכזי."
  },
  {
    "severity": "medium",
    "location": "docs/i18n/locales/he.js",
    "current_text": "שנת 5000",
    "issue": "המונח \"שנת 5000\" מופיע ב-`/about/` אך לא מופיע ב-UI. זה גורם לחוסר עקביות בין המונחים.",
    "correction": "המונח \"שנת 5000\" צריך להיות מופיע גם ב-UI, כשם מונח מרכזי."
  }
]

===== VERIFIED_LOCAL_CONTEXTS =====
===== UI CONTEXT FOR SURVIVING CANDIDATE =====
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
    "about.metaDescription": "הסבר על לוח השנה הפסטפרי: יום המעשה והיום הנשאל, שנים, קציצות, ח

===== CONSISTENCY CONTEXT FOR SURVIVING CANDIDATE =====
===== docs/i18n/locales/he.js — FULL TARGET UI TERMINOLOGY =====
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
    "about.metaDescription": "הסבר על לוח השנה הפסטפרי: יום המעשה והיום הנשאל, שנים, קציצות, ח

===== UI CONTEXT FOR SURVIVING CANDIDATE =====
"theme-color" content="#672013">
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
107:       <section class="status-panel error-panel" id="error-panel" aria-labelledby="error-heading" rol

===== UI CONTEXT FOR SURVIVING CANDIDATE =====
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
    "about.metaDescription": "הסבר על לוח השנה הפסטפרי: יום המעשה והיום הנשאל, שנים,

===== ABOUT CONTEXT FOR SURVIVING CANDIDATE =====
יד.</p>
    <p>המפרט דטרמיניסטי ומלא.</p>
    <p>יש לחשב את מנייני הקלט, לבצע 7 טיפות נסתרות, 46 טיפות גלויות, לעדכן שש קערות, לבצע 12 בחישות סופיות, להפיק תשובות, לבנות שערים, לבחור שנים וקציצות, לבצע בחירות קומבינטוריות, לבחור שמות ולשזור את החודשים.</p>
    <p>כך נחסך הצורך לזכור שלפברואר יש לפעמים 28 ימים ולפעמים 29.</p>
    <hr>
</section>
<section class="about-section" id="seer" data-toc-section data-toc-level="2">
  <h2>ומהו Seer?</h2>
    <p>לצד המימוש הקאנוני קיים מנוע מהיר בשם <strong>Pastafarian Calendar Seer</strong>.</p>
    <p>ה־Seer אינו מקור הסמכות.</p>
    <p>המגילה קובעת את הכללים, והחישוב הקאנוני מפיק לפיהם את התאריך. אם Seer חולק על החישוב הקאנוני התקין, Seer טועה.</p>
    <p>מטרתו היא לבצע את אותן שאילתות במהירות ובצורה נוחה לשילוב במוצרים.</p>
    <p>באימות חי שנערך ב־21 בספטמבר 2026, Seer כלל בין היתר:</p>
    <ul>
      <li>שאילתת תאריך;</li>
      <li>חישוב &quot;עכשיו&quot;;</li>
      <li>שאילתות אצווה;</li>
      <li>טווחי ימים;</li>
      <li>המרה לאחור מתאריך פסטפר

===== CONSISTENCY CONTEXT FOR SURVIVING CANDIDATE =====
===== docs/i18n/locales/he.js — FULL TARGET UI TERMINOLOGY =====
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
    "about.metaDescription": "הסבר על לוח השנה הפסטפרי: יום המעשה והיום הנשאל, שנים,

===== ABOUT CONTEXT FOR SURVIVING CANDIDATE =====
 <code>F(t)</code>.</p>
    <p>לכן אותו יום נשאל יכול לקבל תאריך פסטפרי אחר כאשר מחשבים אותו ביום מעשה אחר.</p>
    <p>זו אינה תקלה. זה הלוח.</p>
    <hr>
</div>
<section class="about-section" id="date-parts" data-toc-section data-toc-level="2">
  <h2>מה יש בתאריך פסטפרי?</h2>
    <p>לתאריך פסטפרי יש <strong>בדיוק חמישה חלקים</strong>:</p>
    <ol>
      <li>מספר השנה;</li>
      <li>שם הקציצה;</li>
      <li>היום בקציצה;</li>
      <li>שם החודש;</li>
      <li>היום בחודש.</li>
    </ol>
    <p>למשל, בצורה כללית:</p>
    <p><strong>שנת 5000, קציצה א', היום ה־417 בקציצה, חודש ב', היום ה־83 בחודש.</strong></p>
    <p>יום המעשה, מיקום הצופה, זהות היום הכרונולוגית או פרטים טכניים אחרים עשויים להופיע ליד התאריך, אבל אינם חלק שישי של התאריך עצמו.</p>
    <hr>
</section>
<section class="about-section" id="working-day" data-toc-section data-toc-level="2">
  <h2>למה צריך יום מעשה?</h2>
    <p>בלוחות שנה רגילים מקובל לחשוב שהתאריך &quot;שייך&quot; ליום.</p>
    <p>בלוח הפסטפרי הוא תלוי ביחס שבין שני ימים.</p>
   

===== CONSISTENCY CONTEXT FOR SURVIVING CANDIDATE =====
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


===== docs/about/content/he.html — HEADINGS + LEAD PARAGRAPHS =====
16:   <h2>מה יש בתאריך פסטפרי?</h2>
17:     <p>לתאריך פסטפרי יש <strong>בדיוק חמישה חלקים</strong>:</p>
25:     <p>למשל, בצורה כללית:</p>
31:   <h2>למה צריך יום מעשה?</h2>
32:     <p>בלוחות שנה רגילים מקובל לחשוב שהתאריך &quot;שייך&quot; ליום.</p>
33:     <p>בלוח הפסטפרי הוא תלוי ביחס שבין שני ימים.</p>
41:   <h2>אותו יום, תאריך אחר</h2>
42:     <p>כדאי להפריד בין שני דברים שונים:</p>
43:     <p><strong>זהות היום</strong> — המקום היציב של יום מסוים על ציר הזמן;</p>
57:   <h2>שנת 5000</h2>
58:     <p>כאשר יום המעשה והיום הנשאל הם אותו יום:</p>
60:     <p>השנה היא תמיד:</p>
75:   <h2>שנים ושערים</h2>
76:     <p>שנה פסטפרית יכול

===== ABOUT CONTEXT FOR SURVIVING CANDIDATE =====
נת 5000</h2>
    <p>כאשר יום המעשה והיום הנשאל הם אותו יום:</p>
    <pre class="math-block" dir="ltr" tabindex="0"><code>c = t</code></pre>
    <p>השנה היא תמיד:</p>
    <pre class="math-block" dir="ltr" tabindex="0"><code>5000</code></pre>
    <p>כלומר, ההווה העצמי נמצא תמיד בשנת 5000.</p>
    <p>אבל שנת 5000 אינה תקופה היסטורית קבועה. היא נבחרת מחדש ביחס ליום המעשה.</p>
    <p>יום המעשה עצמו נמצא בתוך שנת 5000, ולכן גם ימים אחרים באותה שנה נמצאים בשנת 5000.</p>
    <p>מכאן:</p>
    <p><strong>שנת 5000 אינה מבחן לכך ש־<code>t=c</code>.</strong></p>
    <p>לעומת זאת, מספר השנה כן נותן מידע על הכיוון:</p>
    <pre class="math-block" dir="ltr" tabindex="0"><code>Y &gt; 5000 ⇒ t &gt; c</code></pre>
    <p>ו־</p>
    <pre class="math-block" dir="ltr" tabindex="0"><code>Y &lt; 5000 ⇒ t &lt; c</code></pre>
    <p>קיימת גם <strong>שנת 0</strong>, ומעבר לה בכיוון העבר יש שנים בעלות מספר שלילי.</p>
    <hr>
</section>
<section class="about-section" id="years-and-gates" data-toc-section data-toc-level="2">
  <h2>שנים ושערים</h2>
    <p>

===== ABOUT CONTEXT FOR SURVIVING CANDIDATE =====
</td><td><bdi dir="ltr">123</bdi></td></tr>
          <tr><td>היום בחודש בלבד</td><td><bdi dir="ltr">47</bdi></td></tr>
          <tr><td>שם קציצה + היום בקציצה</td><td><bdi dir="ltr">1</bdi></td></tr>
          <tr><td>שם חודש + היום בחודש</td><td><bdi dir="ltr">1</bdi></td></tr>
          <tr><td>כל שלושה שדות לא־שנתיים</td><td><bdi dir="ltr">1</bdi></td></tr>
          <tr><td>כל ארבעת השדות הלא־שנתיים</td><td><bdi dir="ltr">1</bdi></td></tr>
        </tbody>
      </table>
    </div>
    <p>אבל בלי לדעת את יום המעשה, המצב שונה.</p>
    <p>אותה חמישיית תאריך יכולה להופיע תחת ימי מעשה שונים.</p>
    <p>קיימות דוגמאות מפורשות שבהן אותו תאריך מלא מתקבל במרחקים שונים מיום המעשה.</p>
    <p>בשנת 5000 אפילו הכיוון ביחס ליום המעשה אינו נקבע תמיד מן החמישייה: אותו תאריך מלא יכול להופיע בהקשר אחד בעברו של יום המעשה ובהקשר אחר בעתידו.</p>
    <p>לכן תאריך פסטפרי מלא אינו כתובת מוחלטת על ציר הזמן אם לא ידוע באיזה לוח — כלומר תחת איזה <code>c</code> — הוא חושב.</p>
  <section class="about-subsection" id="far-time-structure" data-t

===== ABOUT CONTEXT FOR SURVIVING CANDIDATE =====
d></tr>
          <tr><td>שם קציצה + היום בקציצה</td><td><bdi dir="ltr">1</bdi></td></tr>
          <tr><td>שם חודש + היום בחודש</td><td><bdi dir="ltr">1</bdi></td></tr>
          <tr><td>כל שלושה שדות לא־שנתיים</td><td><bdi dir="ltr">1</bdi></td></tr>
          <tr><td>כל ארבעת השדות הלא־שנתיים</td><td><bdi dir="ltr">1</bdi></td></tr>
        </tbody>
      </table>
    </div>
    <p>אבל בלי לדעת את יום המעשה, המצב שונה.</p>
    <p>אותה חמישיית תאריך יכולה להופיע תחת ימי מעשה שונים.</p>
    <p>קיימות דוגמאות מפורשות שבהן אותו תאריך מלא מתקבל במרחקים שונים מיום המעשה.</p>
    <p>בשנת 5000 אפילו הכיוון ביחס ליום המעשה אינו נקבע תמיד מן החמישייה: אותו תאריך מלא יכול להופיע בהקשר אחד בעברו של יום המעשה ובהקשר אחר בעתידו.</p>
    <p>לכן תאריך פסטפרי מלא אינו כתובת מוחלטת על ציר הזמן אם לא ידוע באיזה לוח — כלומר תחת איזה <code>c</code> — הוא חושב.</p>
  <section class="about-subsection" id="far-time-structure" data-toc-section data-toc-level="3">
    <h3>מבנה רחוק בזמן</h3>
    <p>במחקר המתמטי הנגזר נמצא גם מבנה אסימפטוטי מדויק.</p>
    <p>עבור <strong>יום מעשה ק

===== INTEGRATION CONTEXT FOR SURVIVING CANDIDATE =====
===== docs/i18n/runtime.js — USER-VISIBLE LOCALIZATION/FALLBACK TOUCHPOINTS =====
43:     option.value = locale.code;
44:     option.textContent = locale.displayName;
45:     option.lang = locale.code;
…
55:   if (!documentElement) throw new TypeError("A document-like root with documentElement is required.");
56:   documentElement.lang = locale.code;
57:   documentElement.dir = locale.dir;
58:   for (const element of root.querySelectorAll("[data-i18n]")) {
59:     element.textContent = translate(locale, element.dataset.i18n);
60:   }
61:   for (const element of root.querySelectorAll("[data-i18n-attr]")) {
62:     const bindings = element.dataset.i18nAttr.split(";").map((part) => part.trim()).filter(Boolean);
…
64:       const separator = binding.indexOf(":");
65:       if (separator <= 0) throw new SyntaxError(`Invalid data-i18n-attr binding: ${binding}`);
66:       const attribute = binding.slice(0, separator).trim();
67:       const key = binding.slice(separator + 1).trim();
68:       element.setAttribute(attribut

===== INTEGRATION CONTEXT FOR SURVIVING CANDIDATE =====
 + 1).trim();
68:       element.setAttribute(attribute, translate(locale, key));
69:     }

===== docs/i18n/registry.js — TARGET REGISTRATION =====
3: import { CUTLETS, MONTHS } from "./calendar-identifiers.js?v=9-canonical-names";
4: 
5: export const DEFAULT_LOCALE = "en";
6: export const SUPPORT_LEVELS = Object.freeze(["complete", "partial", "experimental"]);
7: 
…
26: // support is declared only here; locale source modules must not declare it.
27: export const LOCALES = Object.freeze([
28:   defineLocale("he", "עברית", "rtl", "he-IL", "complete", () => import("./locales/he.js?v=19-about-i18n")),
29:   defineLocale("en", "English", "ltr", "en-US", "complete", () => import("./locales/en.js?v=19-about-i18n")),
30:   defineLocale("af", "Afrikaans", "ltr", "af-ZA", "partial", () => import("./locales/af.js?v=19-about-i18n")),
…
190:   }
191: 
192:   return Object.freeze({ locale: byCode.get(canonicalTag(DEFAULT_LOCALE)), source: "fallback" });
193: }
194: 
195: export function getLocale(code) {
196:   return matchSupportedLocale(code) ?? byCode.get(canonicalTag(DEFAULT_LOCALE));
197: }
198:

===== INTEGRATION CONTEXT FOR SURVIVING CANDIDATE =====
stry.js — TARGET REGISTRATION =====
3: import { CUTLETS, MONTHS } from "./calendar-identifiers.js?v=9-canonical-names";
4: 
5: export const DEFAULT_LOCALE = "en";
6: export const SUPPORT_LEVELS = Object.freeze(["complete", "partial", "experimental"]);
7: 
…
26: // support is declared only here; locale source modules must not declare it.
27: export const LOCALES = Object.freeze([
28:   defineLocale("he", "עברית", "rtl", "he-IL", "complete", () => import("./locales/he.js?v=19-about-i18n")),
29:   defineLocale("en", "English", "ltr", "en-US", "complete", () => import("./locales/en.js?v=19-about-i18n")),
30:   defineLocale("af", "Afrikaans", "ltr", "af-ZA", "partial", () => import("./locales/af.js?v=19-about-i18n")),
…
190:   }
191: 
192:   return Object.freeze({ locale: byCode.get(canonicalTag(DEFAULT_LOCALE)), source: "fallback" });
193: }
194: 
195: export function getLocale(code) {
196:   return matchSupportedLocale(code) ?? byCode.get(canonicalTag(DEFAULT_LOCALE));
197: }
198: 
…
328:   assertLoadedLocaleMatchesMetadata(resource, metadata);
329:   validateLocaleResourceShape(resource, met

===== INTEGRATION CONTEXT FOR SURVIVING CANDIDATE =====
mes";
4: 
5: export const DEFAULT_LOCALE = "en";
6: export const SUPPORT_LEVELS = Object.freeze(["complete", "partial", "experimental"]);
7: 
…
26: // support is declared only here; locale source modules must not declare it.
27: export const LOCALES = Object.freeze([
28:   defineLocale("he", "עברית", "rtl", "he-IL", "complete", () => import("./locales/he.js?v=19-about-i18n")),
29:   defineLocale("en", "English", "ltr", "en-US", "complete", () => import("./locales/en.js?v=19-about-i18n")),
30:   defineLocale("af", "Afrikaans", "ltr", "af-ZA", "partial", () => import("./locales/af.js?v=19-about-i18n")),
…
190:   }
191: 
192:   return Object.freeze({ locale: byCode.get(canonicalTag(DEFAULT_LOCALE)), source: "fallback" });
193: }
194: 
195: export function getLocale(code) {
196:   return matchSupportedLocale(code) ?? byCode.get(canonicalTag(DEFAULT_LOCALE));
197: }
198: 
…
328:   assertLoadedLocaleMatchesMetadata(resource, metadata);
329:   validateLocaleResourceShape(resource, metadata.code);
330:   validateLocaleResourceShape(englishBaseline, DEFAULT_LOCALE);
331:   if (!SUPPORT_LEVELS.includ

===== UI CONTEXT FOR SURVIVING CANDIDATE =====
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
    "about.intro": "כיצ

===== CONSISTENCY CONTEXT FOR SURVIVING CANDIDATE =====
===== docs/i18n/locales/he.js — FULL TARGET UI TERMINOLOGY =====
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
    "about.intro": "כיצ

===== UI CONTEXT FOR SURVIVING CANDIDATE =====
inistic Pastafari calendar.",
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
    "day.staleWarning": "היום הנ

===== ABOUT CONTEXT FOR SURVIVING CANDIDATE =====
Hebrew explanation baseline supplied 2026-09-25. -->
<!-- Stable section IDs are a public deep-link contract; do not derive them from translated headings. -->
<div class="about-section about-lead" id="about-calendar">
    <p>לוח השנה הפסטפרי הוא הלוח שבו הזמן נברא.</p>
    <p>המכניקה שלו מוגדרת במדויק.</p>
    <p>לוח השנה אינו ממיר יום ל&quot;תווית&quot; קבועה אחת. כדי לדעת מהו התאריך של יום מסוים צריך לדעת שני ימים:</p>
    <p><strong>יום המעשה</strong> — היום שממנו מבצעים את החישוב; ו־<strong>היום הנשאל</strong> — היום שרוצים לדעת את תאריכו.</p>
    <p>אם נסמן את יום המעשה ב־<code>c</code> ואת היום הנשאל ב־<code>t</code>, התאריך הוא:</p>
    <pre class="math-block" dir="ltr" tabindex="0"><code>F(c,t)</code></pre>
    <p>ולא <code>F(t)</code>.</p>
    <p>לכן אותו יום נשאל יכול לקבל תאריך פסטפרי אחר כאשר מחשבים אותו ביום מעשה אחר.</p>
    <p>זו אינה תקלה. זה הלוח.</p>
    <hr>
</div>
<section class="about-section" id="date-parts" data-toc-section data-toc-level="2">
  <h2>מה יש בתאריך פסטפרי?</h

===== CONSISTENCY CONTEXT FOR SURVIVING CANDIDATE =====
inistic Pastafari calendar.",
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
    "day.staleWarning": "היום הנ

===== UI CONTEXT FOR SURVIVING CANDIDATE =====
cal, deterministic Pastafari calendar.",
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
    "day.staleWarnin

===== ABOUT CONTEXT FOR SURVIVING CANDIDATE =====
bout/content/he.html — FULL TARGET ABOUT ARTICLE =====
<!-- Hebrew explanation baseline supplied 2026-09-25. -->
<!-- Stable section IDs are a public deep-link contract; do not derive them from translated headings. -->
<div class="about-section about-lead" id="about-calendar">
    <p>לוח השנה הפסטפרי הוא הלוח שבו הזמן נברא.</p>
    <p>המכניקה שלו מוגדרת במדויק.</p>
    <p>לוח השנה אינו ממיר יום ל&quot;תווית&quot; קבועה אחת. כדי לדעת מהו התאריך של יום מסוים צריך לדעת שני ימים:</p>
    <p><strong>יום המעשה</strong> — היום שממנו מבצעים את החישוב; ו־<strong>היום הנשאל</strong> — היום שרוצים לדעת את תאריכו.</p>
    <p>אם נסמן את יום המעשה ב־<code>c</code> ואת היום הנשאל ב־<code>t</code>, התאריך הוא:</p>
    <pre class="math-block" dir="ltr" tabindex="0"><code>F(c,t)</code></pre>
    <p>ולא <code>F(t)</code>.</p>
    <p>לכן אותו יום נשאל יכול לקבל תאריך פסטפרי אחר כאשר מחשבים אותו ביום מעשה אחר.</p>
    <p>זו אינה תקלה. זה הלוח.</p>
    <hr>
</div>
<section class="about-section" id="date-parts" data-

===== CONSISTENCY CONTEXT FOR SURVIVING CANDIDATE =====
cal, deterministic Pastafari calendar.",
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
    "day.staleWarnin

===== ABOUT CONTEXT FOR SURVIVING CANDIDATE =====
ו יום נשאל יכול לקבל תאריך פסטפרי אחר כאשר מחשבים אותו ביום מעשה אחר.</p>
    <p>זו אינה תקלה. זה הלוח.</p>
    <hr>
</div>
<section class="about-section" id="date-parts" data-toc-section data-toc-level="2">
  <h2>מה יש בתאריך פסטפרי?</h2>
    <p>לתאריך פסטפרי יש <strong>בדיוק חמישה חלקים</strong>:</p>
    <ol>
      <li>מספר השנה;</li>
      <li>שם הקציצה;</li>
      <li>היום בקציצה;</li>
      <li>שם החודש;</li>
      <li>היום בחודש.</li>
    </ol>
    <p>למשל, בצורה כללית:</p>
    <p><strong>שנת 5000, קציצה א', היום ה־417 בקציצה, חודש ב', היום ה־83 בחודש.</strong></p>
    <p>יום המעשה, מיקום הצופה, זהות היום הכרונולוגית או פרטים טכניים אחרים עשויים להופיע ליד התאריך, אבל אינם חלק שישי של התאריך עצמו.</p>
    <hr>
</section>
<section class="about-section" id="working-day" data-toc-section data-toc-level="2">
  <h2>למה צריך יום מעשה?</h2>
    <p>בלוחות שנה רגילים מקובל לחשוב שהתאריך &quot;שייך&quot; ליום.</p>
    <p>בלוח הפסטפרי הוא תלוי ביחס שבין שני ימים.</p>
    <p>שינוי <code>t</code> פיר

===== CONSISTENCY CONTEXT FOR SURVIVING CANDIDATE =====
AD PARAGRAPHS =====
16:   <h2>מה יש בתאריך פסטפרי?</h2>
17:     <p>לתאריך פסטפרי יש <strong>בדיוק חמישה חלקים</strong>:</p>
25:     <p>למשל, בצורה כללית:</p>
31:   <h2>למה צריך יום מעשה?</h2>
32:     <p>בלוחות שנה רגילים מקובל לחשוב שהתאריך &quot;שייך&quot; ליום.</p>
33:     <p>בלוח הפסטפרי הוא תלוי ביחס שבין שני ימים.</p>
41:   <h2>אותו יום, תאריך אחר</h2>
42:     <p>כדאי להפריד בין שני דברים שונים:</p>
43:     <p><strong>זהות היום</strong> — המקום היציב של יום מסוים על ציר הזמן;</p>
57:   <h2>שנת 5000</h2>
58:     <p>כאשר יום המעשה והיום הנשאל הם אותו יום:</p>
60:     <p>השנה היא תמיד:</p>
75:   <h2>שנים ושערים</h2>
76:     <p>שנה פסטפרית יכולה להיות באורך:</p>
78:     <p>ימים.</p>
86:   <h2>קציצות</h2>
87:     <p>כל שנה מחולקת ל־<strong>6 עד 17 קציצות</strong>.</p>
88:     <p>קציצה היא מקטע כרונולוגי רציף.</p>
99:   <h2>חודשים ושזירה</h2>
100:     <p>בכל שנה יש בין:</p>
102:     <p>חודשים מבניים.</p>
118:   <h2>החודשים ארוגים זה בזה</h2>
119:     <p>אפשר לחשוב על החודשים כחוטים הנארגים לאור