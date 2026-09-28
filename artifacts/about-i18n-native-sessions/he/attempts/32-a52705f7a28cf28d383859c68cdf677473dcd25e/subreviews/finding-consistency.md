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
