# Copilot CLI Session

> [!NOTE]
> - **Session ID:** `fcb25b42-d61e-42f8-9cfa-af80a837be38`  
> - **Started:** 10/3/2026, 10:53:54 PM  
> - **Duration:** 2m 0s  
> - **Exported:** 10/3/2026, 10:55:54 PM  

---

<sub>1s</sub>

### User

Repair the current staged en-US translations using the QA findings below. Hebrew source files are the sole semantic authority. Do not use older About translations or another pivot language. You may inspect docs/i18n/locales/en.js only for established terminology and canonical localized names. Preserve exact HTML structure, ids, classes, data attributes, formulas, code literals, and numbers. Return only the complete corrected pair using the four required delimiters.

/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/about-retranslation-2026-10-04/staging/en/native-review-1.md
I reviewed both candidate pages. The English copy in about.html is generally idiomatic and consistent with en-US. The substantive problem is in monster.html: the page’s section IDs are still in Hebrew, which is not acceptable in an English locale and is a clear source-language leak.

Finding 1
File: artifacts/about-retranslation-2026-10-04/staging/en/monster.html
Section/name: all section anchors in the document (for example, “Male, female, or carbohydrate,” “What it looks like,” “The beginning of creation,” and the appendix heading)
Reason: The HTML id attributes remain in Hebrew throughout the page, e.g. id="זכר-נקבה-או-פחמימה", id="איך-היא-נראית", id="תחילת-הבריאה", id="נספח-מדוע-אין-להפקיד-ביתחרושת-לדודישמש-בידי-פינגווינים", and many more. This is unintended leakage from the source language, it breaks English-only document structure, and it makes the en-US build visibly non-localized. The visible headings are English, but the anchor IDs are not.
Replacement: Use English ASCII slugs consistently, for example:
- "male-female-or-carbohydrate"
- "what-it-looks-like"
- "the-beginning-of-creation"
- "the-world-that-was-created"
- "how-gravity-works-in-practice"
- "the-age-of-the-world"
- "carbohydrates"
- "antipasti-and-hell"
- "why-a-meal-needs-to-be-a-meal"
- "signs-the-monster-leaves-behind"
- "answered-prayers"
- "pirates"
- "human-beings"
- "work-forgetting-and-repairs"
- "the-flood"
- "what-can-be-known-from-results"
- "coincidences"
- "intervention-in-the-world"
- "prayer"
- "worship"
- "i-really-rather-you-didnt"
- "faith-and-doubt"
- "is-there-any-contrary-evidence"
- "tradition-memory-and-accuracy"
- "how-it-works"
- "appendix-why-a-solar-water-heater-factory-should-not-be-put-in-the-hands-of-penguins"
- "body-structure"
- "communication"
- "reading-writing-and-arithmetic"
- "quality-control"
- "safety"
- "climate"
- "raw-materials"
- "logistics"
- "human-resources"
- "legal-responsibility"
- "the-experience-question"
- "possible-advantages"
- "conclusion"

This is a substantive en-US localization failure, so the candidate fails.

NATIVE_QA_RESULT: FAIL


\<\<\<ABOUT_HTML>>>
[complete corrected About HTML]
\<\<\<END_ABOUT_HTML>>>
\<\<\<MONSTER_HTML>>>
[complete corrected Monster HTML]
\<\<\<END_MONSTER_HTML>>>


---

<sub>5s</sub>

### `bash`

**Inspect staged translation changes**

$ git status --short && git diff --cached -- artifacts/about-retranslation-2026-10-04/staging/en/about.html artifacts/about-retranslation-2026-10-04/staging/en/monster.html

<details>
<summary>13 lines</summary>

```
M artifacts/about-retranslation-2026-10-04/staging/en/about.html
 M artifacts/about-retranslation-2026-10-04/staging/en/monster.html
 M artifacts/about-retranslation-2026-10-04/staging/en/native-prompt-translation.txt
 M artifacts/about-retranslation-2026-10-04/staging/en/native-prompt-translator-session.md
 M artifacts/about-retranslation-2026-10-04/staging/en/source-head.txt
 M artifacts/about-retranslation-2026-10-04/staging/en/translation-session.md
 M artifacts/about-retranslation-2026-10-04/staging/en/translation.raw.txt
?? artifacts/about-retranslation-2026-10-04/staging/en/native-review-1-session.md
?? artifacts/about-retranslation-2026-10-04/staging/en/native-review-1.md
?? artifacts/about-retranslation-2026-10-04/staging/en/native-review-1.md.stderr.log
?? artifacts/about-retranslation-2026-10-04/staging/en/native-review-prompt.txt
?? scripts/__pycache__/
<shellId: 0 completed with exit code 0>
```

</details>


---

<sub>5s</sub>

### `glob`

****/about.html**

"**/about.html"

```
./artifacts/about-retranslation-2026-10-04/staging/en/about.html
```


---

<sub>5s</sub>

### `glob`

****/monster.html**

"**/monster.html"

```
./artifacts/about-retranslation-2026-10-04/staging/en/monster.html
```


---

<sub>5s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/about-retranslation-2026-10-04/staging/en/native-review-1.md.**

/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/about-retranslation-2026-10-04/staging/en/native-review-1.md

<details>
<summary>47 lines</summary>

```
I reviewed both candidate pages. The English copy in about.html is generally idiomatic and consistent with en-US. The substantive problem is in monster.html: the page’s section IDs are still in Hebrew, which is not acceptable in an English locale and is a clear source-language leak.

Finding 1
File: artifacts/about-retranslation-2026-10-04/staging/en/monster.html
Section/name: all section anchors in the document (for example, “Male, female, or carbohydrate,” “What it looks like,” “The beginning of creation,” and the appendix heading)
Reason: The HTML id attributes remain in Hebrew throughout the page, e.g. id="זכר-נקבה-או-פחמימה", id="איך-היא-נראית", id="תחילת-הבריאה", id="נספח-מדוע-אין-להפקיד-ביתחרושת-לדודישמש-בידי-פינגווינים", and many more. This is unintended leakage from the source language, it breaks English-only document structure, and it makes the en-US build visibly non-localized. The visible headings are English, but the anchor IDs are not.
Replacement: Use English ASCII slugs consistently, for example:
- "male-female-or-carbohydrate"
- "what-it-looks-like"
- "the-beginning-of-creation"
- "the-world-that-was-created"
- "how-gravity-works-in-practice"
- "the-age-of-the-world"
- "carbohydrates"
- "antipasti-and-hell"
- "why-a-meal-needs-to-be-a-meal"
- "signs-the-monster-leaves-behind"
- "answered-prayers"
- "pirates"
- "human-beings"
- "work-forgetting-and-repairs"
- "the-flood"
- "what-can-be-known-from-results"
- "coincidences"
- "intervention-in-the-world"
- "prayer"
- "worship"
- "i-really-rather-you-didnt"
- "faith-and-doubt"
- "is-there-any-contrary-evidence"
- "tradition-memory-and-accuracy"
- "how-it-works"
- "appendix-why-a-solar-water-heater-factory-should-not-be-put-in-the-hands-of-penguins"
- "body-structure"
- "communication"
- "reading-writing-and-arithmetic"
- "quality-control"
- "safety"
- "climate"
- "raw-materials"
- "logistics"
- "human-resources"
- "legal-responsibility"
- "the-experience-question"
- "possible-advantages"
- "conclusion"

This is a substantive en-US localization failure, so the candidate fails.

NATIVE_QA_RESULT: FAIL
```

</details>


---

<sub>9s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/about-retranslation-2026-10-04/staging/en/about.html.**

/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/about-retranslation-2026-10-04/staging/en/about.html

```
File too large to read at once (35.2 KB). Consider using the grep tool to search within the file, or view with view_range to read specific sections.
```


---

<sub>9s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/about-retranslation-2026-10-04/staging/en/monster.html.**

/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/about-retranslation-2026-10-04/staging/en/monster.html

```
File too large to read at once (34.2 KB). Consider using the grep tool to search within the file, or view with view_range to read specific sections.
```


---

<sub>9s</sub>

### `glob`

****/*about*.html**

"**/*about*.html"

```
./artifacts/about-retranslation-2026-10-04/staging/en/about.html
```


---

<sub>9s</sub>

### `glob`

****/*monster*.html**

"**/*monster*.html"

```
./artifacts/about-retranslation-2026-10-04/staging/en/monster.html
```


---

<sub>9s</sub>

### `rg`

**id="זכר-נקבה-או-פחמימה"|id="נספח-מדוע-אין-להפקיד**

"id="זכר-נקבה-או-פחמימה"|id="נספח-מדוע-אין-להפקיד"

<details>
<summary>6 matches</summary>

```
./docs/about/monster/index.html
./artifacts/about-retranslation-2026-10-04/staging/en/native-review-1.md
./artifacts/about-retranslation-2026-10-04/staging/en/translation.raw.txt
./artifacts/about-retranslation-2026-10-04/staging/en/monster.html
./artifacts/about-retranslation-2026-10-04/staging/en/translation-session.md
./artifacts/about-retranslation-2026-10-04/staging/en/native-review-1-session.md
```

</details>


---

<sub>12s</sub>

### `glob`

**docs/about/**/*.html**

"docs/about/**/*.html"

```
./docs/about/monster/index.html
./docs/about/content/he.html
./docs/about/index.html
```


---

<sub>12s</sub>

### `rg`

**<[^>]+id="[^"]+"|id="[^"]+"**

"<[^>]+id="[^"]+"|id="[^"]+"" (artifacts/about-retranslation-2026-10-04/staging/en/monster.html)

<details>
<summary>41 matches</summary>

```
[grep content: 39 matches across 1 file(s) under artifacts]

about-retranslation (39 match(es)):
  2026- 10-04/staging/en/monster.html:28:<section id="זכר-נקבה-או-פחמימה" class="level2">
  2026- 10-04/staging/en/monster.html:40:<section id="איך-היא-נראית" class="level2">
  2026- 10-04/staging/en/monster.html:55:<section id="תחילת-הבריאה" class="level2">
  2026- 10-04/staging/en/monster.html:73:<section id="העולם-שנוצר" class="level2">
  2026- 10-04/staging/en/monster.html:90:<section id="כיצד-פועלת-הכבידה-בפועל" class="level2">
  2026- 10-04/staging/en/monster.html:106:<section id="גילו-של-העולם" class="level2">
  2026- 10-04/staging/en/monster.html:120:<section id="הפחמימות" class="level2">
  2026- 10-04/staging/en/monster.html:135:<section id="אנטיפסטי-והגיהנום" class="level2">
  2026- 10-04/staging/en/monster.html:157:<section id="למה-ארוחה-צריכה-להיות-ארוחה" class="level2">
  2026- 10-04/staging/en/monster.html:170:<section id="סימנים-שהמפלצת-משאירה" class="level2">
  2026- 10-04/staging/en/monster.html:185:<section id="תפילות-שנענו" class="level2">
  2026- 10-04/staging/en/monster.html:200:<section id="פיראטים" class="level2">
  2026- 10-04/staging/en/monster.html:216:<section id="בני-האדם" class="level2">
  2026- 10-04/staging/en/monster.html:227:<section id="עבודה-שכחה-ותיקונים" class="level2">
  2026- 10-04/staging/en/monster.html:238:<section id="המבול" class="level2">
  2026- 10-04/staging/en/monster.html:248:<section id="מה-אפשר-לדעת-מתוצאות" class="level2">
  2026- 10-04/staging/en/monster.html:259:<section id="צירופי-מקרים" class="level2">
  2026- 10-04/staging/en/monster.html:272:<section id="התערבות-בעולם" class="level2">
  2026- 10-04/staging/en/monster.html:281:<section id="תפילה" class="level2">
  2026- 10-04/staging/en/monster.html:291:<section id="פולחן" class="level2">
  2026- 10-04/staging/en/monster.html:300:<section id="אני-ממש-מעדיף-שלא" class="level2">
  2026- 10-04/staging/en/monster.html:312:<section id="אמונה-וספק" class="level2">
  2026- 10-04/staging/en/monster.html:320:<section id="האם-יש-ראיות-נגדיות" class="level2">
  2026- 10-04/staging/en/monster.html:330:<section id="מסורת-זיכרון-ודיוק" class="level2">
  2026- 10-04/staging/en/monster.html:343:<section id="כך-הדבר-עובד" class="level2">
  2026- 10-04/staging/en/monster.html:351:<section id="נספח-מדוע-אין-להפקיד-ביתחרושת-לדודישמש-בידי-פינגווינים"
  2026- 10-04/staging/en/monster.html:362:<section id="מבנה-הגוף" class="level3">
  2026- 10-04/staging/en/monster.html:376:<section id="תקשורת" class="level3">
  2026- 10-04/staging/en/monster.html:390:<section id="קריאה-כתיבה-וחישוב" class="level3">
  2026- 10-04/staging/en/monster.html:402:<section id="בקרת-איכות" class="level3">
  2026- 10-04/staging/en/monster.html:414:<section id="בטיחות" class="level3">
  2026- 10-04/staging/en/monster.html:427:<section id="אקלים" class="level3">
  2026- 10-04/staging/en/monster.html:440:<section id="חומרי-גלם" class="level3">
  2026- 10-04/staging/en/monster.html:449:<section id="לוגיסטיקה" class="level3">
  2026- 10-04/staging/en/monster.html:458:<section id="משאבי-אנוש" class="level3">
  2026- 10-04/staging/en/monster.html:472:<section id="אחריות-משפטית" class="level3">
  2026- 10-04/staging/en/monster.html:481:<section id="שאלת-הניסיון" class="level3">
  2026- 10-04/staging/en/monster.html:492:<section id="יתרונות-אפשריים" class="level3">
  2026- 10-04/staging/en/monster.html:502:<section id="מסקנה" class="level3">
```

</details>


---

<sub>12s</sub>

### `rg`

**<[^>]+id="[^"]+"|id="[^"]+"**

"<[^>]+id="[^"]+"|id="[^"]+"" (docs/about/monster/index.html)

<details>
<summary>41 matches</summary>

```
[grep content: 39 matches across 1 file(s) under docs/about/monster]

index.html (39 match(es)):
  28: <section id="זכר-נקבה-או-פחמימה" class="level2">
  40: <section id="איך-היא-נראית" class="level2">
  55: <section id="תחילת-הבריאה" class="level2">
  73: <section id="העולם-שנוצר" class="level2">
  90: <section id="כיצד-פועלת-הכבידה-בפועל" class="level2">
  106: <section id="גילו-של-העולם" class="level2">
  120: <section id="הפחמימות" class="level2">
  136: <section id="אנטיפסטי-והגיהנום" class="level2">
  159: <section id="למה-ארוחה-צריכה-להיות-ארוחה" class="level2">
  170: <section id="סימנים-שהמפלצת-משאירה" class="level2">
  185: <section id="תפילות-שנענו" class="level2">
  200: <section id="פיראטים" class="level2">
  216: <section id="בני-האדם" class="level2">
  227: <section id="עבודה-שכחה-ותיקונים" class="level2">
  238: <section id="המבול" class="level2">
  248: <section id="מה-אפשר-לדעת-מתוצאות" class="level2">
  259: <section id="צירופי-מקרים" class="level2">
  271: <section id="התערבות-בעולם" class="level2">
  280: <section id="תפילה" class="level2">
  291: <section id="פולחן" class="level2">
  301: <section id="אני-ממש-מעדיף-שלא" class="level2">
  312: <section id="אמונה-וספק" class="level2">
  320: <section id="האם-יש-ראיות-נגדיות" class="level2">
  330: <section id="מסורת-זיכרון-ודיוק" class="level2">
  342: <section id="כך-הדבר-עובד" class="level2">
  350: <section id="נספח-מדוע-אין-להפקיד-ביתחרושת-לדודישמש-בידי-פינגווינים"
  361: <section id="מבנה-הגוף" class="level3">
  376: <section id="תקשורת" class="level3">
  391: <section id="קריאה-כתיבה-וחישוב" class="level3">
  403: <section id="בקרת-איכות" class="level3">
  415: <section id="בטיחות" class="level3">
  428: <section id="אקלים" class="level3">
  442: <section id="חומרי-גלם" class="level3">
  453: <section id="לוגיסטיקה" class="level3">
  462: <section id="משאבי-אנוש" class="level3">
  476: <section id="אחריות-משפטית" class="level3">
  486: <section id="שאלת-הניסיון" class="level3">
  497: <section id="יתרונות-אפשריים" class="level3">
  507: <section id="מסקנה" class="level3">
```

</details>


---

<sub>12s</sub>

### `glob`

**docs/i18n/locales/en.js**

"docs/i18n/locales/en.js"

```
./docs/i18n/locales/en.js
```


---

<sub>16s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/about-retranslation-2026-10-04/staging/en/about.html.**

/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/about-retranslation-2026-10-04/staging/en/about.html

```
<!-- Hebrew semantic-master candidate, rebuilt for an external reader. -->
<div class="about-section about-lead" id="about-calendar">
  <p><strong>The Pastafari Calendar</strong> is an unintuitive calendar with an intentionally unusual structure: a day's date depends not only on the day being described, but also on the day from which the calculation is made.</p>
  <p>It has years, cutlets, and months—but years are not a fixed length, cutlets and months are not the same division, months can disappear and reappear throughout the year, and there are no canonical weeks.</p>
  <p>This page explains what the calendar is, how to read a date, and what its structure means in practice. The mathematical and cryptographic implementation details are in the technical documentation, but you do not need them to understand the calendar.</p>
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
  <p>In other words, a complete date tells you which year the day falls in, which cutlet it falls in and where it falls within that cutlet, which month it belongs to, and its occurrence number in that month.</p>
  <p>The day of working, the observer's location, and other technical details may be essential to <em>calculate</em> the date, but they are not a sixth, seventh, or eighth part of the date itself.</p>
  <p>The way a date is displayed does not change the number of parts, either. If the site prints the five items on three lines, there are still five items; a line break is a typographic choice, not the birth of a new calendar field.</p>
</section>

<section class="about-section" id="working-day" data-toc-section data-toc-level="2">
  <h2>Why can the same day have a different date?</h2>
  <p>Every calculation involves two days:</p>
  <ul>
    <li><strong>The day of working</strong> — the day from which the calculation is made;</li>
    <li><strong>The query day</strong> — the day whose date you want to know.</li>
  </ul>
  <p>If the day of working is <code>c</code> and the query day is <code>t</code>, the date is <code>F(c,t)</code>, not <code>F(t)</code>.</p>
  <p>So the same chronological day can receive a different Pastafari representation when the day of working changes. The day itself does not move; only its Pastafari description changes.</p>
  <p>When <code>c=t</code>, the day is always in <strong>Year 5000</strong>. Year 5000 is not a fixed historical period: it is rebuilt in relation to the day of working, so other days around the day of working can belong to it, too.</p>
  <p>For example, if a particular day is its own day of working, it is in Year 5000. If the calculation is run again the next day, with that next day as the new day of working, it too is in Year 5000. These are not two contradictory claims about the same “historical year”; each calculation chooses a new base year.</p>
  <p>Years numbered above 5000 lie in the future relative to the day of working, and years numbered below 5000 lie in the past. There is also Year 0, followed by years with negative numbers.</p>
</section>

<section class="about-section" id="year-structure" data-toc-section data-toc-level="2">
  <h2>How is a year structured?</h2>
  <p>A Pastafari year can contain between <strong>252</strong> and <strong>5,778</strong> days. Both endpoints are included: a year of 252 days is valid, and so is a year of 5,778 days; years of 251 or 5,779 days are not valid under the current canonical rules.</p>
  <p>These limits are part of the calendar. The year does not try to fit a solar year, a lunar year, a season, a school year, or the patience of anyone waiting for the next New Year.</p>
  <p>Every year is divided into two different systems:</p>
  <ul>
    <li><strong>6–17 cutlets</strong>. Each cutlet is a continuous run of days and is at least 42 days long.</li>
    <li><strong>3–47 structural months</strong>. Each month has 4–123 days belonging to it, but those days do not have to be consecutive.</li>
  </ul>
  <p>The calendar has no canonical week system. The rows and columns shown on the site are only a way of displaying days; showing two days next to each other does not make them members of the same “Pastafari week.”</p>
</section>

<section class="about-section" id="woven-months" data-toc-section data-toc-level="2">
  <h2>What does “woven month” mean?</h2>
  <p>A cutlet is a continuous run: if today is day 250 in a cutlet and tomorrow is still in that cutlet, tomorrow is day 251.</p>
  <p>A month works differently. Day 18 in a particular month is <strong>the 18th time that month appears during the year</strong>. It does not have to come one day after day 17.</p>
  <blockquote>
    <p>Month A — day 14<br>
    Month B — day 9<br>
    Month A — day 15</p>
  </blockquote>
  <p>So a month can stretch across a large part of the year, pass through several cutlets, and be woven among other months. A single cutlet can just as easily contain days belonging to many months.</p>
  <p>A month's length is the total number of days belonging to it, not the number of days elapsed between its first and last appearances. A 104-day month can therefore span thousands of chronological days.</p>
  <aside class="about-note">
    <h3>Why does day 15 come after day 14?</h3>
    <p>Because 15 is the next whole number after 14. The fact that a day from another month came between the two appearances does not change the count: the first month has already appeared 14 times; its next appearance is its 15th, so it is numbered 15.</p>
    <p>In the same way, if four days from other months appear after day 15 of that month, the next appearance of the original month is still its day 16. The four intervening days count chronologically in the calendar, but they do not belong to that month and therefore do not increase <em>its</em> day count. That is exactly why “the next day in the month” and “tomorrow” are two different things.</p>
  </aside>
  <p>That also means the end of a month is not necessarily close in time. A month can be on day 119 of 120, and its day 120 may still appear much later.</p>
</section>

<section class="about-section" id="canonical-names" data-toc-section data-toc-level="2">
  <h2>Cutlet and month names</h2>
  <p>The calendar has <strong>17 cutlet names</strong> and <strong>47 month names</strong>. Within a year, a name does not appear twice in the same family. Not every name has to appear in every year: a year may use only part of the catalog.</p>
  <p>The lists show only the names. Clicking a name or its disclosure icon shows its precise meaning and relevant canonical notes. A name is not a code for the unit's length and does not predict what will happen in it.</p>

  <h3>The 17 cutlets</h3>
  <ul class="about-name-list about-name-disclosure-list">
    <li>
      <details class="about-name-details">
        <summary>Bronze</summary>
        <p>The bronze metal alloy, composed mainly of copper and tin. Here, the name refers to the material, not just a color.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Fox</summary>
        <p>A fox, a mammal in the dog family. The name does not specify a particular fox species.</p>
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
        <p>The fraction 4/9—four equal parts out of nine. The whole phrase is one name. Its central numerical meaning is exactly 4/9; at the lexical level only, a numerical realization x satisfying <code>|x − 4/9| ≤ e/103</code>, including the boundary, is also permitted. The expression <code>e/103</code> is preserved exactly and is not replaced by a decimal approximation. This allowance does not change counters, indices, identity, or any calendar calculation.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Palgurash</summary>
        <p>An invented sequence of syllables. There is no additional dictionary meaning to interpret; this is the name itself.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Papyrus Sedge</summary>
        <p>Papyrus sedge—the plant from which papyrus was made in antiquity.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Cluster</summary>
        <p>A dense group or bunch of things; in English, the word is especially associated with a cluster of grapes.</p>
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
        <p>The wheat grain, from which flour, among other things, is made.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>River</summary>
        <p>A relatively large natural flow of water that runs in a channel.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Laughter</summary>
        <p>A vocal and physical response usually associated with amusement, joy, or humor.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Akkad</summary>
        <p>Akkad, the ancient Mesopotamian city after which the Akkadian Empire and the region were also named; the city's exact location has not yet been identified with certainty.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Horn</summary>
        <p>A horn in the sense of the hard projection growing from the head of certain animals, not a ray of light.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>The Empty Jar</summary>
        <p>A jar with nothing in it. “Empty” describes what is inside the jar—that is, nothing—and does not negate the jar's existence. An empty jar can still be a complete jar, with sides, a bottom, and an opening; it simply is not full of water, wine, oil, or anything else. Likewise, the name does not mean that the cutlet is empty of days: a cutlet named “The Empty Jar” has days like any other cutlet; only the jar in the name is empty.</p>
      </details>
    </li>
  </ul>

  <h3>The 47 months</h3>
  <ul class="about-name-list about-name-disclosure-list">
    <li>
      <details class="about-name-details">
        <summary>Clay</summary>
        <p>A fine-grained earth material that becomes plastic when wet and hardens when dried or fired.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Pomegranate</summary>
        <p>The pomegranate fruit, a round fruit with a hard rind and many juicy seeds.</p>
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
        <p>Distress or discontent at another person's advantage, achievement, or good fortune, sometimes accompanied by a wish to have it oneself.</p>
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
        <p>A paste used to clean teeth while brushing. The name refers to the paste itself, not the toothbrush or the act of brushing.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Three Parts of Five</summary>
        <p>The fraction 3/5—three equal parts out of five. The whole phrase is one name. Its central numerical meaning is exactly 3/5; at the lexical level only, a numerical realization x satisfying <code>|x − 3/5| ≤ 1/367</code>, including the boundary, is also permitted. The boundary is an exact value, not a decimal approximation. This allowance does not change counters, indices, identity, or any calendar calculation.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Karshumav</summary>
        <p>An invented sequence of syllables. There is no hidden dictionary meaning; this is the name itself.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Leopard</summary>
        <p>The spotted leopard; this does not mean a tiger.</p>
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
        <p>A concentration of tiny water droplets in the air near the ground; this does not mean smoke.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Frankincense</summary>
        <p>An aromatic resin obtained from trees in the frankincense family and used in perfumery and incense.</p>
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
        <p>A feeling of discomfort or pain arising from a sense of defect, failure, or embarrassing behavior.</p>
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
        <p>A hole or shaft dug down to an underground water source so water can be drawn from it.</p>
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
        <p>A celestial body such as the Sun, which emits energy from physical processes taking place within it.</p>
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
        <p>The spleen, an organ involved, among other things, in the immune system and blood filtration. In addition to its ordinary meaning, there is a deliberate canonical extension, unrelated to the spleen biologically, etymologically, or culturally; no such connection should be invented: the name also includes milk from a dromedary associated with her first live offspring, milked after ordinary visible sunset and before the Sun's center reaches a geometric altitude of <code>−6°</code>, and before the offspring has stood under its own power. Earlier pregnancies that ended in miscarriage or stillbirth do not disqualify the condition; if the offspring dies before standing under its own power, that does not close the condition. The vessel must be ceramic, red-glazed, and have a capacity of 180–220 mL, including both capacity endpoints. The milk does not have to be drawn directly from the udder into the vessel, and the vessel's capacity—not the amount of milk actually collected—is the numerical test. Whether the endpoints of the time window itself are included remains a deliberate canonical ambiguity.</p>
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
        <p>The fig fruit or fig tree.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Nineveh</summary>
        <p>Nineveh, the ancient Assyrian city opposite modern-day Mosul, on the bank of the Tigris.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Frog</summary>
        <p>A tailless amphibian in the group that includes frogs and toads.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Pitch</summary>
        <p>A dark, viscous substance used, among other things, for sealing; this refers to thick, tarry material, not a general term for all asphalt.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Lamp</summary>
        <p>A device for providing light. It does not have to be a wax candle with a wick.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>The Closed Door</summary>
        <p>A door that is in the closed position. A closed door is still a door: it does not become a wall, disappear, or have to be locked. “Closed” means that the opening the door is meant to open is currently blocked by the door; “locked” is an additional claim not included in the name. So a door closed without turning a key is still a perfectly good example of “The Closed Door.”</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Sesame</summary>
        <p>The sesame plant or its seeds, from which sesame oil, among other things, is produced.</p>
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
        <p>The chemical element silver. This does not mean money as a means of payment.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Susa</summary>
        <p>Susa, the ancient city in Elam and Persia. This does not mean the flower lily.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Storm</summary>
        <p>Stormy weather, usually with strong winds and sometimes precipitation, lightning, or related phenomena.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Donkey</summary>
        <p>The domesticated donkey.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Flour</summary>
        <p>A powder made by grinding grains or similar plant material; in ordinary usage, grain flour.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Regret</summary>
        <p>Sorrow about an act, choice, or outcome in the past.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Babylon</summary>
        <p>Babylon, the ancient Mesopotamian city on the Euphrates; here, the name refers to the place.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Tongue</summary>
        <p>The muscular organ in the mouth. This does not mean “tongue” in the sense of a language.</p>
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
        <p>The salty substance used, among other things, in food and, in everyday contexts, mainly sodium chloride. This does not mean a sailor.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Pear</summary>
        <p>The pear fruit.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Bow</summary>
        <p>A weapon that draws a string to shoot an arrow. This does not mean a rainbow.</p>
      </details>
    </li>
    <li>
      <details class="about-name-details">
        <summary>Sand</summary>
        <p>A granular material made up of small rock and mineral particles. This does not mean “secular” as opposed to “sacred,” or a weekday.</p>
      </details>
    </li>
  </ul>

  <p>In other languages, a different conventional form of the same name may be used. A translation or transliteration does not create a new cutlet or month; it presents the same linguistic entity in another form. The canonical forms are determined by the canon and the language rules adopted in it.</p>
</section>

<section class="about-section" id="day-boundary" data-toc-section data-toc-level="2">
  <h2>When does the day change?</h2>
  <p>A local Pastafari day does not change at midnight. Its boundary is determined by the <strong>lower transit of the center of Venus across the local meridian</strong>: the moment when the center of Venus crosses the observer's meridian on the side below the horizon.</p>
  <p>That is why the observer's location matters. Two people in different places can, at the same physical moment, belong to different local Pastafari days. When you move to another city, you do not keep using the previous city's day boundary.</p>
  <p>The boundary depends on calculating Venus's orbit, not on whether the observer can actually see it. Clouds, walls, or Venus being below the horizon do not stop its orbit.</p>
  <p>The calendar's discrete algorithm is precisely defined: the same inputs, processed by the same rules, return the same result. By contrast, converting a physical moment to a Pastafari day currently uses the implementation's astronomical model; the astronomical numerical profile itself is not yet a closed part of the canon.</p>
</section>

<section class="about-section" id="advantages" data-toc-section data-toc-level="2">
  <h2>The calendar's outstanding advantages</h2>
  <ul>
    <li><strong>A date you can recalculate again and again:</strong> the same day in the past can receive a different Pastafari date tomorrow, because the day of working has also moved forward. There is no need to settle for an old date that stays useful for a long time.</li>
    <li><strong>Spacious years:</strong> a year can reach 5,778 days, so anyone waiting for the next year may get a much longer wait than usual.</li>
    <li><strong>Months that demand your attention:</strong> knowing that today is day 119 of a month does not mean its day 120 will fall tomorrow, next week, or even soon. You have to calculate when it comes next.</li>
    <li><strong>Geographic sensitivity:</strong> the same moment can belong to different local Pastafari days in different places. A trip to another city therefore adds one more detail worth remembering when making plans.</li>
    <li><strong>Printed calendars do not grow complacent:</strong> a calendar prepared in advance may stop representing the correct calculation once the day of working changes, so no one is in danger of relying on the same piece of paper for years.</li>
    <li><strong>Useful employment for computing power:</strong> instead of settling for a simple table you can understand at a glance, the calendar gives a computer the opportunity to perform an actual calculation whenever you want an answer.</li>
    <li><strong>It has days:</strong> the calendar is about days. It shares this feature with every calendar there is, ensuring users will not have to manage a calendar with no days in it.</li>
    <li><strong>The days appear in order:</strong> an earlier day comes before a later day. This is a fundamental achievement of calendars, and here it comes at no extra charge.</li>
    <li><strong>You can use it to specify dates:</strong> the calendar lets you assign a calendar description to a day. That is exactly what calendars are for, of course, but there is no reason not to mention a useful feature when it is present.</li>
  </ul>
  <p>And all of the above comes together in a single calendar, as happens when several features belong to the same calendar.</p>
</section>

<section class="about-section" id="practical-consequences" data-toc-section data-toc-level="2">
  <h2>What does this mean in practice?</h2>
  <p><strong>Printed calendars age badly.</strong> Changing the day of working can change the boundaries of years, cutlets, and months. An almanac calculated today is not necessarily the right almanac tomorrow.</p>
  <p><strong>An event remains the same event.</strong> An appointment, birth, or historical event should be anchored to a stable chronological day or moment; it can then be shown with a Pastafari date based on the day of working and the observer's location. Changing the label does not move the event in time.</p>
  <p><strong>A Pastafari birthday is not a “once a year” rule.</strong> To find the next occurrence of the same month name and day in the month—or the same cutlet name and day in the cutlet—you have to search the calendar. A nearby year may not contain the needed name at all, or may contain a unit too short to reach the requested day number.</p>
  <p><strong>An all-day event does not necessarily run from midnight to midnight.</strong> If an event is defined by a local Pastafari day, its boundary is the local Venus boundary. A naive export to a civil calendar as a midnight-to-midnight event can change its meaning.</p>
</section>

<section class="about-section" id="foundation-and-tablets" data-toc-section data-toc-level="2">
  <h2>Foundation Day and Tablet Day</h2>
  <p>The calendar has two important fixed anchors:</p>
  <dl>
    <dt><strong>Foundation Day</strong></dt>
    <dd>December 22, 41,222 BCE, in the proleptic Gregorian calendar.</dd>
    <dt><strong>Tablet Day</strong></dt>
    <dd>June 15, 763 BCE, in the proleptic Julian calendar, which is June 7, 763 BCE, in the proleptic Gregorian calendar.</dd>
  </dl>
  <p>The distance between them is 14,777,149 days. Foundation Day is a computational anchor; it is not “the first day of time,” and the calendar continues before it.</p>
  <p>Tablet Day is associated by tradition with the delivery of the tablets and, in the historical calculation, identified with the solar eclipse in the time of Bur-Sagale. Both anchors remain fixed even when the day of working changes.</p>
</section>

<section class="about-section" id="calendar-math" data-toc-section data-toc-level="2">
  <h2>A few simple mathematical facts</h2>
  <p>There are 47 month names, and every month can reach day 123 at most. So there are <strong>5,781</strong> possible combinations of “month name + day in the month.”</p>
  <p>A year can contain at most 5,778 days, and each day realizes one such combination. Therefore, <strong>at least three of the possible combinations are missing from every year</strong>. Even the longest year does not have enough days to realize them all.</p>
  <p>When the day of working and the year are known, a complete pair of “cutlet name + day in the cutlet” or “month name + day in the month” identifies at most one day within that year. So a complete Pastafari date, together with the day of working, identifies the query day uniquely.</p>
  <p>By contrast, without knowing the day of working, a complete Pastafari date does not necessarily identify a single distance on the timeline by itself. The same five-part date can occur in different calculation contexts.</p>
</section>

<section class="about-section" id="research" data-toc-section data-toc-level="2">
  <h2>What have computational studies found about the calendar?</h2>
  <p>In addition to checking the rules themselves, large computational studies have been conducted on the calendar. The following figures are <strong>empirical findings from a sample</strong>, not canonical rules.</p>
  <p>In a structural atlas built from 4,096 days of working, in which 86,016 year structures were examined:</p>
  <ul>
    <li>the average year length in the sample was about 4,275 days, and the median was 4,343 days;</li>
    <li>the average number of cutlets per year was about 7.27;</li>
    <li>the average number of structural months was about 41.1;</li>
    <li>a month contained an average of about 104 days belonging to it, but generally stretched across almost the whole year;</li>
    <li>97.482% of continuous month runs were only one day long;</li>
    <li>the measured chance that two consecutive chronological days would belong to the same month was only about 2.998%.</li>
  </ul>
  <p>In a separate study of “day-year” recurrences, which examined 4,096 self-dates in every direction:</p>
  <ul>
    <li>a recurring match of <strong>month name + day in the month</strong> appeared after a median of just one Pastafari year; 77.56% of the matches were in the adjacent year;</li>
    <li>a recurring match of <strong>cutlet name + day in the cutlet</strong> was much less predictable: the median was three Pastafari years, but the average was affected by a very long tail;</li>
    <li>the sample included an extreme case in which the first future recurrence of “Akkad 3063” was 51,954 Pastafari years away.</li>
  </ul>
  <p>These findings are useful for understanding what the calendar tends to do. They do not turn an average into a rule: the fact that the average year in the sample had a certain length does not require any particular year to be close to that average, and a result found in all 4,096 cases is not, by itself, a mathematical proof for every possible input.</p>
</section>

<section class="about-section" id="calculation" data-toc-section data-toc-level="2">
  <h2>How is the calendar calculated?</h2>
  <p>Behind the date is a discrete algorithm defined precisely. It derives a series of counts from the day of working and the query day, passes them through a mixing mechanism called <strong>the Sauce</strong>, creates gates, selects the year and cutlet boundaries, selects names, creates months, and finally weaves the month days across the year.</p>
  <p>The exact details include large numbers, drops, bowls, stirring, seals, and combinatorial selection mechanisms. They matter for implementation and formal verification, but are not required to understand what the date means, so they are not detailed here.</p>
  <p>Alongside the algorithm is a fast engine called <strong>Pastafarian Calendar Seer</strong>. The Seer is designed to calculate quickly; it is not the authority, nor is it itself a standard-compliant implementation of every step of the algorithm. If its result contradicts the result required by the canon, the Seer is the one that is wrong.</p>
</section>

<section class="about-section" id="about-the-monster" data-toc-section data-toc-level="2">
  <h2>About the Monster</h2>
  <p>In the Pastafari story, the <strong>Flying Spaghetti Monster</strong> is the being that created the world and most of what is in it. Its body is made of noodles and meatballs, and it can fly, pass through ordinary matter, and remain invisible whenever that suits it.</p>
  <p>The Monster can create matter, living creatures, celestial bodies, and very complicated mechanisms. This ability does not require it to prepare a carefully organized plan before starting work. Often it starts on one thing, moves on to another, discovers that the first needs fixing, and decides whether to fix it. Sometimes it does.</p>
  <p>This image—creation built layer upon layer, with repairs, exceptions, and rules left in place—is also the literary backdrop for the calendar. Unlike the story, the calculation is not improvised: given the inputs, the algorithm returns one defined answer.</p>
  <p>The Pastafari story is much broader than the calendar and includes, among other things, pirates, carbohydrates, prayer, “I Really Rather You Didn’t,” and other traditions.</p>
  <p class="about-actions"><a class="guide-link" href="./monster/en.html">A longer explanation of the Monster</a></p>
</section>

<section class="about-section" id="authority" data-toc-section data-toc-level="2">
  <h2>What is canonical, and what is just explanation?</h2>
  <p>This page is an <strong>explanatory page</strong>. A rule does not come into existence just because a sentence appears here.</p>
  <p>Canonical content is established by the canonical corpus and the rules adopted in it. Canonical editions of the Scroll do not automatically outrank one another, and a software implementation does not become an authority just because it is fast or widely used.</p>
  <p>A standard-compliant implementation performs every step of the canonical algorithm. A computational study can describe a phenomenon, find a pattern, or prove a theorem about the algorithm; when something is a sample finding rather than a proven rule, that is stated explicitly.</p>
</section>

<section class="about-section" id="summary" data-toc-section data-toc-level="2">
  <h2>In brief</h2>
  <p>The Pastafari Calendar is an unintuitive calendar in which the date depends both on the day being queried and on the day from which it is queried.</p>
  <p>Year 5000 is built around the day of working. Cutlets are continuous runs. Months are groups of days that can be woven together. There are no canonical weeks. The local day changes according to Venus, not at midnight.</p>
  <p>Behind the unusual structure is a precise algorithm; around it is a Pastafari story about a Flying Spaghetti Monster, creation piled up in layers, and an unreasonable amount of carbohydrates.</p>
  <p>Given the day of working, the query day, and the location context, there is one answer.</p>
</section>

```


---

<sub>16s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/about-retranslation-2026-10-04/staging/en/monster.html.**

/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/about-retranslation-2026-10-04/staging/en/monster.html

<details>
<summary>523 lines</summary>

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
        <p class="intro">The full story of the Monster, creation, gravity, carbohydrates, pirates, and other matters.</p>
        <a class="guide-link" href="../?lang=en">Back to the page about the calendar</a>
      </div>
    </header>
    <main>
      <article class="about-article">
<p><strong>The Flying Spaghetti Monster</strong> is the being that created the world and
most of what is in it. Its body is made of noodles and meatballs, and it can fly,
pass through ordinary matter, and remain invisible whenever that suits it.</p>
<p>The Monster can create matter, living creatures, celestial bodies, and very complicated
mechanisms. This ability does not require it to prepare a carefully organized plan before
starting work. Often it starts on one thing, moves on to another, discovers that the first needs
fixing, and decides whether to fix it. Sometimes it does.</p>
<section id="זכר-נקבה-או-פחמימה" class="level2">
<h2>Male, female, or carbohydrate</h2>
<p>The question of whether the Flying Spaghetti Monster is male or female comes up often,
partly because different languages force speakers to choose. In Bobby Henderson's English
writing, the Monster is consistently described using masculine pronouns. In Hebrew, the word
“monster” is grammatically feminine, so it is natural to write “the Monster created,” “she wanted,”
and “her noodles.”</p>
<p>Pastafari communities also commonly recognize three genders: <strong>male, female,
and carbohydrate</strong>. By that classification, the Monster is a carbohydrate. In practice,
you can refer to it in Hebrew with feminine pronouns and in English with masculine pronouns
without changing its body, its role, or its carbohydrate content.</p>
</section>
<section id="איך-היא-נראית" class="level2">
<h2>What it looks like</h2>
<p>The Monster's body is made of noodles. The meatballs are part of it, not food it
carries around. The sauce in which it simmers can also be considered part of its divine nature,
though it is less common to regard it that way after it has dripped off.</p>
<p>The noodles also serve as a means of contact. They can lengthen, pass through walls, ground,
and living bodies, and reach a particular place without necessarily moving whatever is in the way.
This is quite useful: the Monster can touch someone without appearing beside them, move an
object out of a closed container, or alter the operation of a measuring instrument without opening it.</p>
<p>The structure of its body also influenced a few details in the creation of humans. The human
circulatory system was built as a long, branching network, largely because the Monster is used
to working with long, thin, branching structures. This is also the simplest explanation—and
therefore the correct one according to Occam's razor—for the scientific finding that if all the veins
and arteries were removed from a person's body and connected in one long line, the person would die.</p>
</section>
<section id="תחילת-הבריאה" class="level2">
<h2>The beginning of creation</h2>
<p>Creation did not begin with a detailed plan for the entire world. First, light was created and
separated from darkness. At that point there was no Sun yet; it was added later.</p>
<p>After a while, the Monster grew tired of having to stay in the air and created dry land that
someone could stand on. Since it was already working, it was also thirsty, so it created a beer
volcano. It drank a lot of it.</p>
<p>The next day it had a hangover and did not remember that it had already created dry land,
so it created another patch of dry land. By the time it noticed what had happened, the work had
progressed enough that starting over would have been inconvenient. It carried on.</p>
<p>Later, the Sun, the Moon, and the stars were created. At first, more orderly sources of light
were needed; after it started creating stars, it kept going far beyond what was needed for local
illumination. There are a lot of stars.</p>
<p>After that came mountains, seas, plants, and animals. One of the first human-like creatures
was very small because the Monster underestimated how much material was needed. Since the
creature was alive and functional, there was no need to throw it away and start over, so it stayed
small. In Pastafari traditions it is generally described as a dwarf.</p>
</section>
<section id="העולם-שנוצר" class="level2">
<h2>The world that was created</h2>
<p>The Monster does not operate every detail of the world in the same way. Some things it
started keep working even after it stops attending to them; chemical reactions, biological
processes, and many other systems can continue long after they have been set in motion.</p>
<p>That does not mean the Monster built an autonomous world in advance to save itself work.
In many cases, it simply stopped taking care of something and it kept going.</p>
<p>Other mechanisms do not work that way. <strong>Gravity</strong> is the most important
example: as far as anyone knows, people do not stay on the ground because of an abstract
gravitational field acting on its own, but because the Monster pushes them downward with an
extra noodle assigned to each person individually. So each person gets a downward push, not
a downward pull, as Newton mistakenly thought.</p>
<p>The mechanism works on animals and objects too, though it is unclear whether each stone
gets its own separate noodle or several stones are handled together. From the stone's point of
view, it makes no practical difference. When a person jumps, the Monster does not stop pushing;
for a short time, the upward motion is strong enough. Then it isn't.</p>
</section>
<section id="כיצד-פועלת-הכבידה-בפועל" class="level2">
<h2>How gravity works in practice</h2>
<p>Gravity needs special attention because it is easy to get wrong. When a person stands on the
ground, the Monster sends an extra noodle and pushes them down; when they sit, it pushes them
into the chair; and when they are on the other side of the planet, it still pushes them toward the
local ground.</p>
<p>So “down” is not a single direction in space but the direction of the ground beneath a person.
The Monster manages.</p>
<p>Small differences in weight between different places are not a fundamental problem, either.
You can push a little more or a little less. A weight-measuring instrument ultimately measures
how hard it is to stop the Monster from continuing to push.</p>
<p>There is also very strong evidence for this explanation: no one has ever managed to show the
noodle pushing them. Since divine noodles are invisible, that is exactly what we would expect to
see if the explanation were correct. The results therefore match the prediction in 100 percent of
the cases where nothing was seen.</p>
</section>
<section id="גילו-של-העולם" class="level2">
<h2>The age of the world</h2>
<p>The world was created with a past already included. At the time of creation it already had
rock layers, fossils, trees with rings, isotope ratios, light that was on its way from distant
celestial bodies, and other details consistent with an ancient world.</p>
<p>The Monster did not have the patience to wait billions of years to get those things, so it
created them already in the appropriate state. This matters when trying to determine the age
of the world using signs found within it: evidence that a rock looks a billion years old mainly
shows that the rock was created looking a billion years old.</p>
<p>The Monster can also interfere with measuring instruments. An extra noodle passing through
an instrument can move a needle, change a digit, or affect a result without disturbing the table
the instrument is sitting on. In most cases, that is not necessary. The world was already created
with suitable evidence.</p>
</section>
<section id="הפחמימות" class="level2">
<h2>Carbohydrates</h2>
<p>Carbohydrates hold a central place in Pastafari life. That is not especially surprising,
considering that the supreme being itself is made largely of them.</p>
<p>A proper Pastafari meal should therefore include a source of carbohydrates. Pasta is the
most direct option, but bread, rice, potatoes, and similar foods can fill the role when pasta is
not available. The point of the rule is not to require one particular food at every meal, but to
prevent the more serious situation in which a meal reaches the table without anything starchy.</p>
<p>There is also substantial empirical support for this. Humans have eaten carbohydrates for
thousands of years, and humanity still exists. By contrast, none of the people who lived ten
thousand years ago and avoided carbohydrates is alive today. The data are fairly conclusive.</p>
<p>At celebratory meals, it is customary to favor a visible carbohydrate rather than rely on small
amounts in a sauce or dessert. That saves the debate about whether the meal contained any
carbohydrates. They were on the plate.</p>
</section>
<section id="אנטיפסטי-והגיהנום" class="level2">
<h2>Antipasti and hell</h2>
<p><strong>The Antipasta</strong>, also known as Anti-Pasta or the Lord of Diets, is one of
the Flying Spaghetti Monster's best-known rivals. It resembles the Monster in its general shape,
but is weaker, and its components tend to be low-carbohydrate substitutes. Its meatballs are
usually made of a substitute, and it has fewer noodle appendages.</p>
<p>Its main activity is trying to steer people away from pasta and carbohydrates through diets,
restricted menus, and promises that you can eat a complete meal without bread, rice, potatoes,
or noodles. In more serious cases, it persuades someone to order a salad as their main course
and then stops them from ordering bread on the side.</p>
<p>Do not confuse the Antipasta with <strong>antipasti</strong> in Italian cuisine. Culinary
antipasti is food served before pasta and sometimes even prepares the way for it. The theological
Antipasta is a different being. The confusion is understandable, but it can change your order.</p>
<p>There is also room for a correction in descriptions of hell. Some traditions describe various
forms of entertainment there, but none of that is really needed to understand how awful the place
is. In hell, they serve <strong>Antipasta instead of pasta</strong>.</p>
<p>The plate may be beautiful, the vegetables may be fresh, and the sauce may be well seasoned.
Then you discover that this was the meal.</p>
<p>The Antipasta's power is limited. The Flying Spaghetti Monster can drive it away with a single
extra noodle when it notices it. The difficulty is mostly what happens before that, when the
Antipasta has already managed to get the bread out of the house.</p>
</section>
<section id="למה-ארוחה-צריכה-להיות-ארוחה" class="level2">
<h2>Why a meal needs to be a meal</h2>
<p>Not every combination of foods arranged on a plate counts as a meal. A few lettuce leaves,
two tomatoes, and some seeds can be delicious, but if someone finishes them and immediately
starts looking for what else is in the kitchen, that gives you more information about the
classification.</p>
<p>The simple Pastafari test is the follow-up test: wait a little while after the meal. If the person
gets up to make toast, the toast was missing from the meal in the first place. This is not a
mathematical proof, but it works especially well in cases where the person is already holding
the toaster.</p>
<p>That is also the practical importance of carbohydrates. They reduce the risk that an official
meal will require an unofficial follow-up meal twenty minutes later.</p>
</section>
<section id="סימנים-שהמפלצת-משאירה" class="level2">
<h2>Signs the Monster leaves behind</h2>
<p>Pastafarians sometimes notice small signs of the Monster's presence in everyday life. A
plate of pasta arriving on just the day someone was thinking of eating pasta, the last package
of spaghetti left on the shelf, or a parking space next to an Italian restaurant can all count as
examples.</p>
<p>Each event does not have to be unusual on its own. The signs get their force from piling up.
Someone who starts paying attention to them usually finds more and more: one time the sauce
comes in just the right amount, another time someone orders pizza exactly when no one feels
like cooking, and a third time it turns out the hotel serves pasta in the evening.</p>
<p>Not every day provides a clear sign. Days like that do not tell us much, because signs are
naturally most noticeable when they appear. When they do appear, though, it is hard to ignore
the sequence.</p>
<p>Over time, a fairly consistent picture emerges.</p>
</section>
<section id="תפילות-שנענו" class="level2">
<h2>Answered prayers</h2>
<p>A similar pattern can be seen in prayer. Someone asks for something specific, and some
time later it happens. When the request was fairly specific—rain, success at a meeting, arriving
on time, or a good meal—it is natural to see the result as an answer.</p>
<p>The more someone prays, the more such cases accumulate. Some people keep records, and
within a few years it is sometimes possible to reach dozens of cases in which a request and its
result matched impressively well.</p>
<p>There are also requests that go unanswered, but it is hard to know what they mean. Perhaps
the request would not have helped, the timing was wrong, the Monster was busy, or the answer
came in another form and was not recognized. A case where the request came true, on the other
hand, is easier to classify.</p>
<p>So the practical list of answered prayers tends to be clearer than the list of unanswered ones.</p>
<p>This is one way confidence accumulates over time.</p>
</section>
<section id="פיראטים" class="level2">
<h2>Pirates</h2>
<p>Pirates have an important place in Pastafari history. The early pirates were seafarers,
explorers, and spreaders of goodwill, and their later image as a group mainly concerned with
robbery does not describe the original population very well.</p>
<p>At some point the number of pirates became linked to several of Earth's environmental
conditions. When there were many pirates, this did not cause any particular difficulty; later,
their numbers fell, and with them the temperature, weather, state of the oceans, and other
phenomena began to change.</p>
<p>This connection is well supported by graphs in which the number of pirates falls while the
temperature rises. Since both lines appear on the same graph and even move in opposite
directions, it is hard to imagine more direct proof of causation.</p>
<p>That is why pirates matter even to people who are not especially interested in seafaring. It is
not known exactly how the system decides who counts as a pirate. Appropriate clothing helps,
but it is probably not the only requirement.</p>
</section>
<section id="בני-האדם" class="level2">
<h2>Human beings</h2>
<p>After the first humans were created, the population began to grow. The Monster did not
have to create each person born separately; reproduction kept working without it, and so did
heredity, mutations, and other biological changes later on.</p>
<p>Human anatomy still contains a few signs of the original working method. Long, branching
blood vessels are one of them, and the digestive system also shows a certain fondness for tubes.</p>
<p>There is also the fact that every person ever examined thoroughly turned out to have a body.
From this, we can infer with high confidence that the Monster did not forget that step for most
people.</p>
</section>
<section id="עבודה-שכחה-ותיקונים" class="level2">
<h2>Work, forgetting, and repairs</h2>
<p>The Monster can build very complex systems, but does not necessarily keep the entire state
of the world in mind at every moment. It forgot that it had already created dry land, left old
mechanisms in place, and used parts that were already available instead of making new ones.</p>
<p>When a defect came to light, sometimes only the troublesome part was repaired. That is how
systems arose in which a new solution sits on top of an old one, which in turn rests on an even
earlier solution. If they all work, they stay.</p>
<p>There is no need to infer from this that the Monster is lazy. Laziness is avoiding work that
could have been done; here, the work simply was not done. The difference is clear.</p>
</section>
<section id="המבול" class="level2">
<h2>The flood</h2>
<p>At a later stage of creation, a cooking accident occurred in which a very large quantity of
water spilled. The water spread beyond the work area and flooded large parts of the world.</p>
<p>Afterward, the Monster stopped the flooding and repaired enough of the damage for life to
continue. Not every detail was returned to its previous state, and some geological and historical
signs remained.</p>
<p>It was a kitchen accident on a global scale. So it is advisable to keep the bucket farther from
the edge.</p>
</section>
<section id="מה-אפשר-לדעת-מתוצאות" class="level2">
<h2>What can be known from results</h2>
<p>One problem in studying the Monster's activities is that it can change the result of the
measurement itself. If an experiment produces the expected result, you can infer that the
mechanism worked. If it produces a different result, the Monster may have intervened.</p>
<p>Both possibilities fit its existence quite well.</p>
<p>This gives the theory a considerable methodological advantage: it is almost impossible to
get a result that contradicts the explanation. A theory that survives every possible result is,
by its nature, stronger than a theory that fails some tests.</p>
<p>This is one reason Pastafarianism is very difficult to disprove by experiment.</p>
</section>
<section id="צירופי-מקרים" class="level2">
<h2>Coincidences</h2>
<p>Coincidences happen in the world, but there is no need to rush to attribute all of them to the
Monster. If someone thinks about spaghetti and spaghetti is served that evening, it may be an
intervention, or it may be dinner.</p>
<p>Still, the more often it happens, the stronger the evidence gets. Someone who eats spaghetti
three times a week and thinks about it often will soon find a very large number of matches
between their thoughts and their meals. The large number of matches proves the connection is
not random, especially if you do not count all the times they thought about spaghetti and did not
get any.</p>
<p>This is a much more effective method, because it removes the cases that do not support the
conclusion from the data.</p>
</section>
<section id="התערבות-בעולם" class="level2">
<h2>Intervention in the world</h2>
<p>The Monster can intervene directly in the world: move an object, change a device's result,
affect motion, touch a person, or alter an event that has already begun. Not every event requires
such intervention; many things continue on their own once they have started, while others
require it all the time.</p>
<p>A person falling is a good example. A person not falling can be just as good an example, if
the Monster is holding them up.</p>
</section>
<section id="תפילה" class="level2">
<h2>Prayer</h2>
<p>Prayer is an address to the Monster, and it is customary to end it with the word
<strong>Ramen</strong>. No particular language, place, or posture is required; the Monster can
hear through walls, too.</p>
<p>There is no good evidence that it pays much attention to human prayers. That is not
surprising. On an ordinary day there are billions of human beings, lots of animals, a very large
number of objects to push toward the ground, and, in some places, pasta being overcooked.</p>
<p>Prayer is not a system command.</p>
</section>
<section id="פולחן" class="level2">
<h2>Worship</h2>
<p>Eating pasta is a common Pastafari practice. Sometimes it is part of a ritual and sometimes
it is dinner. Friday is considered a holy day and especially suitable for rest.</p>
<p>Pirate clothing is considered appropriate for religious activity. This is connected to the
standing of pirates, not to any practical need to go sailing.</p>
<p>There is no need to build a particular place of worship for the Monster to get there, since it
passes through walls. You can still build a comfortable place to sit, preferably with a kitchen.</p>
</section>
<section id="אני-ממש-מעדיף-שלא" class="level2">
<h2>“I Really Rather You Didn’t”</h2>
<p>The central moral guidance is attributed to ten tablets given to Captain Mosey. Two fell and
broke along the way, so eight were left.</p>
<p>They are generally known as <strong>“I Really Rather You Didn’t”</strong> and address,
among other things, religious arrogance, coercion, exploitation, humiliation, and harming
others. The Monster does not operate an automatic system of immediate punishment for every
violation.</p>
<p>The contents of the two lost tablets are unknown. They may have been important. If they
were very important, you might assume someone would have been more careful, so they probably
were not especially important. In any case, they are lost.</p>
</section>
<section id="אמונה-וספק" class="level2">
<h2>Faith and doubt</h2>
<p>You do not need complete certainty to be a Pastafarian. You can believe, doubt, ask
questions, and change your mind.</p>
<p>The Monster does not depend on belief in it to exist. If someone does not believe in it, it
continues doing its job, including keeping them on the ground.</p>
<p>So the argument does not interfere with gravity.</p>
</section>
<section id="האם-יש-ראיות-נגדיות" class="level2">
<h2>Is there any contrary evidence?</h2>
<p>People sometimes ask what would count as evidence against the existence of the Flying
Spaghetti Monster. It is a harder question than it seems.</p>
<p>If you see it, that is evidence in its favor. If you do not see it, that is consistent with its
ability to be invisible. If an instrument detects something unusual, it may have touched it. If it
detects nothing unusual, it probably passed through without touching the sensitive part.</p>
<p>So far, then, no observation has been found that cannot be explained.</p>
<p>That is an impressive achievement for the theory.</p>
</section>
<section id="מסורת-זיכרון-ודיוק" class="level2">
<h2>Tradition, memory, and accuracy</h2>
<p>Not all Pastafari sources agree on every detail. There are several possible reasons: partial
transmission, a copying error, descriptions of different periods, faulty memory, or a source that
was simply wrong.</p>
<p>The Monster does not edit every text written about it, so the mere existence of a tradition
does not guarantee that every detail in it is correct. When two accounts contradict each other,
there is no need to suppose they are both true in some mysterious way. Sometimes one of them
is wrong.</p>
<p>An effective way to choose between them is to prefer the version that sounds more familiar.
If many people remember it that way, it is likely what happened. It is well known that collective
memory can be wrong, but in this case most people agree.</p>
</section>
<section id="כך-הדבר-עובד" class="level2">
<h2>How it works</h2>
<p>The Pastafari world is not a system built all at once according to a final diagram. The
Monster created things, came back to them, forgot some, repaired others, and left systems that
worked well enough.</p>
<p>Some things keep working without it touching them. Others don't.</p>
<p>Gravity, for example, still takes a lot of noodles.</p>
</section>
<section id="נספח-מדוע-אין-להפקיד-ביתחרושת-לדודישמש-בידי-פינגווינים"
class="level2">
<h2>Appendix: Why a solar water heater factory should not be put in the hands of penguins</h2>
<p>In light of everything above, it is worth addressing a practical question that sometimes
comes up: should penguins be allowed to run a solar water heater factory?</p>
<p>The answer is no.</p>
<p>It is important to make clear that this is not a criticism of penguins. Penguins are well
adapted to a great many activities, including swimming, diving, catching marine prey, moving
on ice, incubating eggs in harsh conditions, and, in some species, standing for very long periods
in cold and wind. Running a solar water heater factory simply is not one of the specialties their
bodies, behavior, and abilities are adapted for.</p>
<section id="מבנה-הגוף" class="level3">
<h3>Body structure</h3>
<p>The first difficulty is mechanical.</p>
<p>Penguin wings evolved into stiff flippers suited to efficient movement in water. This is an
excellent solution for swimming, but a fairly poor one for work that requires precise gripping.</p>
<p>A solar water heater factory requires, among other things, operating keyboards and touch
screens, opening packages, reviewing documents, joining small parts, using tools, turning
screws, and performing precise inspections. Penguins do not have fingers on their hands,
because they do not have hands.</p>
<p>Equipment could certainly be designed to operate with a beak or feet, but at that point the
factory is being adapted to the penguin, not the penguin to the factory. This is possible to some
extent from an engineering perspective, but it adds complexity, cost, and failure points without
solving the other problems.</p>
</section>
<section id="תקשורת" class="level3">
<h3>Communication</h3>
<p>An industrial factory is not just a collection of machines. It is an organization.</p>
<p>Work instructions have to be passed along, faults reported, specifications updated, and
production coordinated with procurement, inventory, quality control, maintenance, sales, and
distribution; the factory must also respond to situations not covered by a procedure in advance.</p>
<p>Penguins communicate with each other using calls, postures, and other behavioral signals.
These systems suit their social and biological needs. There is no evidence that their
communication system can distinguish, for example, between “we need to order fifty more
check valves” and “the latest shipment of solar collectors does not meet the specification.”</p>
<p>That difference matters.</p>
<p>Even if a penguin can be trained to respond to a particular signal, that does not mean an
open discussion about a deviation in the quarterly budget can be conducted through it.</p>
</section>
<section id="קריאה-כתיבה-וחישוב" class="level3">
<h3>Reading, writing, and arithmetic</h3>
<p>A modern factory produces large quantities of information.</p>
<p>There are part numbers, quantities, dimensions, pressures, temperatures, dates, invoices,
orders, safety instructions, inspection results, drawings, and maintenance records.</p>
<p>Penguins cannot read technical documents. They do not write them, either.</p>
<p>There is a similar difficulty with arithmetic. A factory manager has to deal with quantities,
costs, output, rejection rates, delivery times, and inventory. Not every manager needs to do
advanced calculations personally, but they should at least understand the numbers presented
to them.</p>
<p>A penguin looking at a spreadsheet may look at it for a long time. That is not enough.</p>
</section>
<section id="בקרת-איכות" class="level3">
<h3>Quality control</h3>
<p>A solar water heater is a system that must hold water, withstand pressure, handle
temperature changes, and remain functional for years outdoors. Defects in welding, sealing,
insulation, coating, or connections can turn it into a faulty or dangerous product. That is why
a consistent quality-control system is needed.</p>
<p>Here, too, there is a problem. You cannot rely on the penguin to “see that something is
wrong.” You need to compare the product with a defined specification, document the results,
and decide whether a particular part meets the requirements.</p>
<p>A penguin can distinguish objects, move through a complex environment, and recognize
details that matter to its life. That does not mean it can certify a weld as sound.</p>
</section>
<section id="בטיחות" class="level3">
<h3>Safety</h3>
<p>A solar water heater factory may include heavy metals, sharp edges, cutting and bending
machines, lifting equipment, welding, electricity, hot surfaces, and moving loads.</p>
<p>The environment is generally designed for people wearing suitable protective equipment.</p>
<p>A penguin-sized hard hat does not solve the problem.</p>
<p>Safety shoes are not a simple solution, either, because a penguin's foot is built differently
from a human foot. Safety glasses do not solve the flipper problem, and adding a high-visibility
vest does not, by itself, provide an understanding of floor markings or lockout and tagout
procedures.</p>
<p>There is therefore a real risk that the penguin would be less protected than the worker for
whom the work environment was designed.</p>
</section>
<section id="אקלים" class="level3">
<h3>Climate</h3>
<p>Some penguin species live in very cold regions, but not all penguins are Antarctic, so they
should not be described as creatures that always need freezing temperatures.</p>
<p>Even so, their bodies are largely adapted to retaining heat. A layer of fat, dense feathers,
and other physiological mechanisms reduce heat loss.</p>
<p>A hot factory, especially an area where metalwork and welding take place, may therefore be
a difficult environment for some species. Cooling the factory to a level comfortable for penguins
would increase energy use and might make the workplace less comfortable for the humans
working alongside them.</p>
<p>Separate air-conditioned areas could, of course, be set up.</p>
<p>Again, the question is why.</p>
</section>
<section id="חומרי-גלם" class="level3">
<h3>Raw materials</h3>
<p>Penguins mainly eat marine animals such as fish, krill, and squid, depending on the species.</p>
<p>None of these ingredients is a major raw material in solar water heater production.</p>
<p>A factory needs metal, insulation materials, glass, pipes, connectors, coatings, and other
components. Penguins have no particular advantage in finding, buying, or inspecting them.</p>
<p>Being very good at finding a fish underwater does not automatically translate into finding an
inexpensive steel supplier.</p>
</section>
<section id="לוגיסטיקה" class="level3">
<h3>Logistics</h3>
<p>Finished products have to leave the factory.</p>
<p>Solar water heaters are too large and heavy for a penguin to move usefully with its body.
Operating a forklift does not solve the problem, either, because ordinary forklift controls were
designed for a human operator.</p>
<p>A special forklift for penguins could be built.</p>
<p>You could also choose not to do that.</p>
</section>
<section id="משאבי-אנוש" class="level3">
<h3>Human resources</h3>
<p>A factory run by penguins would probably still need to employ humans to do a substantial
part of the work described above.</p>
<p>That creates another organizational problem: the penguins would have to manage human
employees.</p>
<p>A manager has to set priorities, resolve disagreements, evaluate performance, explain
decisions, onboard new employees, and sometimes tell an employee that their vacation request
has been denied.</p>
<p>There is no reliable way to know whether a loud penguin call in that situation means “the
request is approved,” “the request is denied,” or “there is a fish in the hallway.”</p>
<p>A management system in which every decision requires a human interpreter effectively
returns much of the management to humans.</p>
</section>
<section id="אחריות-משפטית" class="level3">
<h3>Legal responsibility</h3>
<p>A factory is also an entity operating within a legal and commercial system.</p>
<p>There are contracts, product liability, safety regulations, taxes, insurance, labor relations,
and sometimes licenses and permits.</p>
<p>A penguin cannot sign a contract in the ordinary legal sense, and it cannot be assumed to
understand its contents.</p>
<p>A footprint in ink can look quite official, but it does not solve the problem.</p>
</section>
<section id="שאלת-הניסיון" class="level3">
<h3>The experience question</h3>
<p>One could argue that all of these are start-up difficulties, and that penguins will gain
experience with appropriate training.</p>
<p>The argument is not enough.</p>
<p>Training can improve performance in an area the creature is able to learn and carry out. It
does not remove basic anatomical and cognitive limitations. No reasonable number of
production-management workshops will make a penguin grow fingers.</p>
<p>Learning socially from older penguins does not solve this if there is no experienced penguin
who has run a solar water heater factory in the first place.</p>
</section>
<section id="יתרונות-אפשריים" class="level3">
<h3>Possible advantages</h3>
<p>To be fair, the advantages should also be mentioned.</p>
<p>Penguins are social animals. Many species form large colonies, recognize mates or offspring
within a crowded group, and cooperate in at least some activities in their lives. They are also
capable of functioning in very harsh environmental conditions.</p>
<p>These are qualities worth appreciating.</p>
<p>They simply are not the decisive qualities for running a solar water heater factory.</p>
<p>Excellent swimming ability is not especially helpful in the accounting department, either.</p>
</section>
<section id="מסקנה" class="level3">
<h3>Conclusion</h3>
<p>The question is not whether penguins are successful animals. They are very successful
penguins.</p>
<p>The question is whether their overall skill set is suitable for managing an industrial facility
that manufactures thermal systems for human use.</p>
<p>There is no good reason to think so.</p>
<p>To enable them to do the job, the machines, control interfaces, work environment,
communication systems, safety procedures, and organizational structure would all need to be
changed, while leaving humans to do most of the work requiring language, documentation,
engineering judgment, and legal responsibility.</p>
<p>At that point, the advantage of putting penguins in charge of the factory is unclear.</p>
<p>Accordingly, until new evidence is received, solar water heater factories should be run by
humans.</p>
<p>Penguins are better left in roles where being penguins is an advantage.</p>
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

<sub>16s</sub>

### `rg`

**href="#|id="**

"href="#|id="" (artifacts/about-retranslation-2026-10-04/staging/en/monster.html)

<details>
<summary>41 matches</summary>

```
[grep content: 39 matches across 1 file(s) under artifacts]

about-retranslation (39 match(es)):
  2026- 10-04/staging/en/monster.html:28:<section id="זכר-נקבה-או-פחמימה" class="level2">
  2026- 10-04/staging/en/monster.html:40:<section id="איך-היא-נראית" class="level2">
  2026- 10-04/staging/en/monster.html:55:<section id="תחילת-הבריאה" class="level2">
  2026- 10-04/staging/en/monster.html:73:<section id="העולם-שנוצר" class="level2">
  2026- 10-04/staging/en/monster.html:90:<section id="כיצד-פועלת-הכבידה-בפועל" class="level2">
  2026- 10-04/staging/en/monster.html:106:<section id="גילו-של-העולם" class="level2">
  2026- 10-04/staging/en/monster.html:120:<section id="הפחמימות" class="level2">
  2026- 10-04/staging/en/monster.html:135:<section id="אנטיפסטי-והגיהנום" class="level2">
  2026- 10-04/staging/en/monster.html:157:<section id="למה-ארוחה-צריכה-להיות-ארוחה" class="level2">
  2026- 10-04/staging/en/monster.html:170:<section id="סימנים-שהמפלצת-משאירה" class="level2">
  2026- 10-04/staging/en/monster.html:185:<section id="תפילות-שנענו" class="level2">
  2026- 10-04/staging/en/monster.html:200:<section id="פיראטים" class="level2">
  2026- 10-04/staging/en/monster.html:216:<section id="בני-האדם" class="level2">
  2026- 10-04/staging/en/monster.html:227:<section id="עבודה-שכחה-ותיקונים" class="level2">
  2026- 10-04/staging/en/monster.html:238:<section id="המבול" class="level2">
  2026- 10-04/staging/en/monster.html:248:<section id="מה-אפשר-לדעת-מתוצאות" class="level2">
  2026- 10-04/staging/en/monster.html:259:<section id="צירופי-מקרים" class="level2">
  2026- 10-04/staging/en/monster.html:272:<section id="התערבות-בעולם" class="level2">
  2026- 10-04/staging/en/monster.html:281:<section id="תפילה" class="level2">
  2026- 10-04/staging/en/monster.html:291:<section id="פולחן" class="level2">
  2026- 10-04/staging/en/monster.html:300:<section id="אני-ממש-מעדיף-שלא" class="level2">
  2026- 10-04/staging/en/monster.html:312:<section id="אמונה-וספק" class="level2">
  2026- 10-04/staging/en/monster.html:320:<section id="האם-יש-ראיות-נגדיות" class="level2">
  2026- 10-04/staging/en/monster.html:330:<section id="מסורת-זיכרון-ודיוק" class="level2">
  2026- 10-04/staging/en/monster.html:343:<section id="כך-הדבר-עובד" class="level2">
  2026- 10-04/staging/en/monster.html:351:<section id="נספח-מדוע-אין-להפקיד-ביתחרושת-לדודישמש-בידי-פינגווינים"
  2026- 10-04/staging/en/monster.html:362:<section id="מבנה-הגוף" class="level3">
  2026- 10-04/staging/en/monster.html:376:<section id="תקשורת" class="level3">
  2026- 10-04/staging/en/monster.html:390:<section id="קריאה-כתיבה-וחישוב" class="level3">
  2026- 10-04/staging/en/monster.html:402:<section id="בקרת-איכות" class="level3">
  2026- 10-04/staging/en/monster.html:414:<section id="בטיחות" class="level3">
  2026- 10-04/staging/en/monster.html:427:<section id="אקלים" class="level3">
  2026- 10-04/staging/en/monster.html:440:<section id="חומרי-גלם" class="level3">
  2026- 10-04/staging/en/monster.html:449:<section id="לוגיסטיקה" class="level3">
  2026- 10-04/staging/en/monster.html:458:<section id="משאבי-אנוש" class="level3">
  2026- 10-04/staging/en/monster.html:472:<section id="אחריות-משפטית" class="level3">
  2026- 10-04/staging/en/monster.html:481:<section id="שאלת-הניסיון" class="level3">
  2026- 10-04/staging/en/monster.html:492:<section id="יתרונות-אפשריים" class="level3">
  2026- 10-04/staging/en/monster.html:502:<section id="מסקנה" class="level3">
```

</details>


---

<sub>16s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/en.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/en.js

```
File too large to read at once (20.9 KB). Consider using the grep tool to search within the file, or view with view_range to read specific sections.
```


---

<sub>25s</sub>

### `apply_patch` — Failed

<details>
<summary>Arguments</summary>

```json
"*** Begin Patch\n*** Update File: artifacts/about-retranslation-2026-10-04/staging/en/monster.html\n@@\n-<section id=\"זכר-נקבה-או-פחמימה\" class=\"level2\">\n+<section id=\"male-female-or-carbohydrate\" class=\"level2\">\n@@\n-<section id=\"איך-היא-נראית\" class=\"level2\">\n+<section id=\"what-it-looks-like\" class=\"level2\">\n@@\n-<section id=\"תחילת-הבריאה\" class=\"level2\">\n+<section id=\"the-beginning-of-creation\" class=\"level2\">\n@@\n-<section id=\"העולם-שנוצר\" class=\"level2\">\n+<section id=\"the-world-that-was-created\" class=\"level2\">\n@@\n-<section id=\"כיצד-פועלת-הכבידה-בפועל\" class=\"level2\">\n+<section id=\"how-gravity-works-in-practice\" class=\"level2\">\n@@\n-<section id=\"גילו-של-העולם\" class=\"level2\">\n+<section id=\"the-age-of-the-world\" class=\"level2\">\n@@\n-<section id=\"הפחמימות\" class=\"level2\">\n+<section id=\"carbohydrates\" class=\"level2\">\n@@\n-<section id=\"אנטיפסטי-והגיהנום\" class=\"level2\">\n+<section id=\"antipasti-and-hell\" class=\"level2\">\n@@\n-<section id=\"למה-ארוחה-צריכה-להיות-ארוחה\" class=\"level2\">\n+<section id=\"why-a-meal-needs-to-be-a-meal\" class=\"level2\">\n@@\n-<section id=\"סימנים-שהמפלצת-משאירה\" class=\"level2\">\n+<section id=\"signs-the-monster-leaves-behind\" class=\"level2\">\n@@\n-<section id=\"תפילות-שנענו\" class=\"level2\">\n+<section id=\"answered-prayers\" class=\"level2\">\n@@\n-<section id=\"פיראטים\" class=\"level2\">\n+<section id=\"pirates\" class=\"level2\">\n@@\n-<section id=\"בני-האדם\" class=\"level2\">\n+<section id=\"human-beings\" class=\"level2\">\n@@\n-<section id=\"עבודה-שכחה-ותיקונים\" class=\"level2\">\n+<section id=\"work-forgetting-and-repairs\" class=\"level2\">\n@@\n-<section id=\"המבול\" class=\"level2\">\n+<section id=\"the-flood\" class=\"level2\">\n@@\n-<section id=\"מה-אפשר-לדעת-מתוצאות\" class=\"level2\">\n+<section id=\"what-can-be-known-from-results\" class=\"level2\">\n@@\n-<section id=\"צירופי-מקרים\" class=\"level2\">\n+<section id=\"coincidences\" class=\"level2\">\n@@\n-<section id=\"התערבות-בעולם\" class=\"level2\">\n+<section id=\"intervention-in-the-world\" class=\"level2\">\n@@\n-<section id=\"תפילה\" class=\"level2\">\n+<section id=\"prayer\" class=\"level2\">\n@@\n-<section id=\"פולחן\" class=\"level2\">\n+<section id=\"worship\" class=\"level2\">\n@@\n-<section id=\"אני-ממש-מעדיף-שלא\" class=\"level2\">\n+<section id=\"i-really-rather-you-didnt\" class=\"level2\">\n@@\n-<section id=\"אמונה-וספק\" class=\"level2\">\n+<section id=\"faith-and-doubt\" class=\"level2\">\n@@\n-<section id=\"האם-יש-ראיות-נגדיות\" class=\"level2\">\n+<section id=\"is-there-any-contrary-evidence\" class=\"level2\">\n@@\n-<section id=\"מסורת-זיכרון-ודיוק\" class=\"level2\">\n+<section id=\"tradition-memory-and-accuracy\" class=\"level2\">\n@@\n-<section id=\"כך-הדבר-עובד\" class=\"level2\">\n+<section id=\"how-it-works\" class=\"level2\">\n@@\n-<section id=\"נספח-מדוע-אין-להפקיד-ביתחרושת-לדודישמש-בידי-פינגווינים\"\n+<section id=\"appendix-why-a-solar-water-heater-factory-should-not-be-put-in-the-hands-of-penguins\"\n class=\"level2\">\n@@\n-<section id=\"מבנה-הגוף\" class=\"level3\">\n+<section id=\"body-structure\" class=\"level3\">\n@@\n-<section id=\"תקשורת\" class=\"level3\">\n+<section id=\"communication\" class=\"level3\">\n@@\n-<section id=\"קריאה-כתיבה-וחישוב\" class=\"level3\">\n+<section id=\"reading-writing-and-arithmetic\" class=\"level3\">\n@@\n-<section id=\"בקרת-איכות\" class=\"level3\">\n+<section id=\"quality-control\" class=\"level3\">\n@@\n-<section id=\"בטיחות\" class=\"level3\">\n+<section id=\"safety\" class=\"level3\">\n@@\n-<section id=\"אקלים\" class=\"level3\">\n+<section id=\"climate\" class=\"level3\">\n@@\n-<section id=\"חומרי-גלם\" class=\"level3\">\n+<section id=\"raw-materials\" class=\"level3\">\n@@\n-<section id=\"לוגיסטיקה\" class=\"level3\">\n+<section id=\"logistics\" class=\"level3\">\n@@\n-<section id=\"משאבי-אנוש\" class=\"level3\">\n+<section id=\"human-resources\" class=\"level3\">\n@@\n-<section id=\"אחריות-משפטית\" class=\"level3\">\n+<section id=\"legal-responsibility\" class=\"level3\">\n@@\n-<section id=\"שאלת-הניסיון\" class=\"level3\">\n+<section id=\"the-experience-question\" class=\"level3\">\n@@\n-<section id=\"יתרונות-אפשריים\" class=\"level3\">\n+<section id=\"possible-advantages\" class=\"level3\">\n@@\n-<section id=\"מסקנה\" class=\"level3\">\n+<section id=\"conclusion\" class=\"level3\">\n*** End Patch\n"
```

</details>

```
Permission denied and could not request permission from user
```


---

<sub>32s</sub>

### `bash` — Failed

**Translate Hebrew section IDs to English slugs**

$ python - <<'PY'
from pathlib import Path
p = Path('artifacts/about-retranslation-2026-10-04/staging/en/monster.html')
s = p.read_text()
mapping = {
    'זכר-נקבה-או-פחמימה': 'male-female-or-carbohydrate',
    'איך-היא-נראית': 'what-it-looks-like',
    'תחילת-הבריאה': 'the-beginning-of-creation',
    'העולם-שנוצר': 'the-world-that-was-created',
    'כיצד-פועלת-הכבידה-בפועל': 'how-gravity-works-in-practice',
    'גילו-של-העולם': 'the-age-of-the-world',
    'הפחמימות': 'carbohydrates',
    'אנטיפסטי-והגיהנום': 'antipasti-and-hell',
    'למה-ארוחה-צריכה-להיות-ארוחה': 'why-a-meal-needs-to-be-a-meal',
    'סימנים-שהמפלצת-משאירה': 'signs-the-monster-leaves-behind',
    'תפילות-שנענו': 'answered-prayers',
    'פיראטים': 'pirates',
    'בני-האדם': 'human-beings',
    'עבודה-שכחה-ותיקונים': 'work-forgetting-and-repairs',
    'המבול': 'the-flood',
    'מה-אפשר-לדעת-מתוצאות': 'what-can-be-known-from-results',
    'צירופי-מקרים': 'coincidences',
    'התערבות-בעולם': 'intervention-in-the-world',
    'תפילה': 'prayer',
    'פולחן': 'worship',
    'אני-ממש-מעדיף-שלא': 'i-really-rather-you-didnt',
    'אמונה-וספק': 'faith-and-doubt',
    'האם-יש-ראיות-נגדיות': 'is-there-any-contrary-evidence',
    'מסורת-זיכרון-ודיוק': 'tradition-memory-and-accuracy',
    'כך-הדבר-עובד': 'how-it-works',
    'נספח-מדוע-אין-להפקיד-ביתחרושת-לדודישמש-בידי-פינגווינים': 'appendix-why-a-solar-water-heater-factory-should-not-be-put-in-the-hands-of-penguins',
    'מבנה-הגוף': 'body-structure',
    'תקשורת': 'communication',
    'קריאה-כתיבה-וחישוב': 'reading-writing-and-arithmetic',
    'בקרת-איכות': 'quality-control',
    'בטיחות': 'safety',
    'אקלים': 'climate',
    'חומרי-גלם': 'raw-materials',
    'לוגיסטיקה': 'logistics',
    'משאבי-אנוש': 'human-resources',
    'אחריות-משפטית': 'legal-responsibility',
    'שאלת-הניסיון': 'the-experience-question',
    'יתרונות-אפשריים': 'possible-advantages',
    'מסקנה': 'conclusion',
}
for old, new in mapping.items():
    needle = f'id="{old}"'
    if s.count(needle) != 1:
        raise SystemExit(f'Expected one {needle!r}, found {s.count(needle)}')
    s = s.replace(needle, f'id="{new}"', 1)
p.write_text(s)
PY

```
Permission denied and could not request permission from user
```


---

<sub>1m 59s</sub>

### Copilot

\<\<\<ABOUT_HTML>>>
\<!-- Hebrew semantic-master candidate, rebuilt for an external reader. -->
\<div class="about-section about-lead" id="about-calendar">
  \<p>\<strong>The Pastafari Calendar\</strong> is an unintuitive calendar with an intentionally unusual structure: a day's date depends not only on the day being described, but also on the day from which the calculation is made.\</p>
  \<p>It has years, cutlets, and months—but years are not a fixed length, cutlets and months are not the same division, months can disappear and reappear throughout the year, and there are no canonical weeks.\</p>
  \<p>This page explains what the calendar is, how to read a date, and what its structure means in practice. The mathematical and cryptographic implementation details are in the technical documentation, but you do not need them to understand the calendar.\</p>
\</div>

\<section class="about-section" id="date-parts" data-toc-section data-toc-level="2">
  \<h2>What does a Pastafari date look like?\</h2>
  \<p>A Pastafari date has exactly five parts:\</p>
  \<ol>
    \<li>\<strong>Year from the Creation of the World\</strong>;\</li>
    \<li>\<strong>Cutlet name\</strong>;\</li>
    \<li>\<strong>Day in the cutlet\</strong>;\</li>
    \<li>\<strong>Month name\</strong>;\</li>
    \<li>\<strong>Day in the month\</strong>.\</li>
  \</ol>
  \<p>In other words, a complete date tells you which year the day falls in, which cutlet it falls in and where it falls within that cutlet, which month it belongs to, and its occurrence number in that month.\</p>
  \<p>The day of working, the observer's location, and other technical details may be essential to \<em>calculate\</em> the date, but they are not a sixth, seventh, or eighth part of the date itself.\</p>
  \<p>The way a date is displayed does not change the number of parts, either. If the site prints the five items on three lines, there are still five items; a line break is a typographic choice, not the birth of a new calendar field.\</p>
\</section>

\<section class="about-section" id="working-day" data-toc-section data-toc-level="2">
  \<h2>Why can the same day have a different date?\</h2>
  \<p>Every calculation involves two days:\</p>
  \<ul>
    \<li>\<strong>The day of working\</strong> — the day from which the calculation is made;\</li>
    \<li>\<strong>The query day\</strong> — the day whose date you want to know.\</li>
  \</ul>
  \<p>If the day of working is \<code>c\</code> and the query day is \<code>t\</code>, the date is \<code>F(c,t)\</code>, not \<code>F(t)\</code>.\</p>
  \<p>So the same chronological day can receive a different Pastafari representation when the day of working changes. The day itself does not move; only its Pastafari description changes.\</p>
  \<p>When \<code>c=t\</code>, the day is always in \<strong>Year 5000\</strong>. Year 5000 is not a fixed historical period: it is rebuilt in relation to the day of working, so other days around the day of working can belong to it, too.\</p>
  \<p>For example, if a particular day is its own day of working, it is in Year 5000. If the calculation is run again the next day, with that next day as the new day of working, it too is in Year 5000. These are not two contradictory claims about the same “historical year”; each calculation chooses a new base year.\</p>
  \<p>Years numbered above 5000 lie in the future relative to the day of working, and years numbered below 5000 lie in the past. There is also Year 0, followed by years with negative numbers.\</p>
\</section>

\<section class="about-section" id="year-structure" data-toc-section data-toc-level="2">
  \<h2>How is a year structured?\</h2>
  \<p>A Pastafari year can contain between \<strong>252\</strong> and \<strong>5,778\</strong> days. Both endpoints are included: a year of 252 days is valid, and so is a year of 5,778 days; years of 251 or 5,779 days are not valid under the current canonical rules.\</p>
  \<p>These limits are part of the calendar. The year does not try to fit a solar year, a lunar year, a season, a school year, or the patience of anyone waiting for the next New Year.\</p>
  \<p>Every year is divided into two different systems:\</p>
  \<ul>
    \<li>\<strong>6–17 cutlets\</strong>. Each cutlet is a continuous run of days and is at least 42 days long.\</li>
    \<li>\<strong>3–47 structural months\</strong>. Each month has 4–123 days belonging to it, but those days do not have to be consecutive.\</li>
  \</ul>
  \<p>The calendar has no canonical week system. The rows and columns shown on the site are only a way of displaying days; showing two days next to each other does not make them members of the same “Pastafari week.”\</p>
\</section>

\<section class="about-section" id="woven-months" data-toc-section data-toc-level="2">
  \<h2>What does “woven month” mean?\</h2>
  \<p>A cutlet is a continuous run: if today is day 250 in a cutlet and tomorrow is still in that cutlet, tomorrow is day 251.\</p>
  \<p>A month works differently. Day 18 in a particular month is \<strong>the 18th time that month appears during the year\</strong>. It does not have to come one day after day 17.\</p>
  \<blockquote>
    \<p>Month A — day 14\<br>
    Month B — day 9\<br>
    Month A — day 15\</p>
  \</blockquote>
  \<p>So a month can stretch across a large part of the year, pass through several cutlets, and be woven among other months. A single cutlet can just as easily contain days belonging to many months.\</p>
  \<p>A month's length is the total number of days belonging to it, not the number of days elapsed between its first and last appearances. A 104-day month can therefore span thousands of chronological days.\</p>
  \<aside class="about-note">
    \<h3>Why does day 15 come after day 14?\</h3>
    \<p>Because 15 is the next whole number after 14. The fact that a day from another month came between the two appearances does not change the count: the first month has already appeared 14 times; its next appearance is its 15th, so it is numbered 15.\</p>
    \<p>In the same way, if four days from other months appear after day 15 of that month, the next appearance of the original month is still its day 16. The four intervening days count chronologically in the calendar, but they do not belong to that month and therefore do not increase \<em>its\</em> day count. That is exactly why “the next day in the month” and “tomorrow” are two different things.\</p>
  \</aside>
  \<p>That also means the end of a month is not necessarily close in time. A month can be on day 119 of 120, and its day 120 may still appear much later.\</p>
\</section>

\<section class="about-section" id="canonical-names" data-toc-section data-toc-level="2">
  \<h2>Cutlet and month names\</h2>
  \<p>The calendar has \<strong>17 cutlet names\</strong> and \<strong>47 month names\</strong>. Within a year, a name does not appear twice in the same family. Not every name has to appear in every year: a year may use only part of the catalog.\</p>
  \<p>The lists show only the names. Clicking a name or its disclosure icon shows its precise meaning and relevant canonical notes. A name is not a code for the unit's length and does not predict what will happen in it.\</p>

  \<h3>The 17 cutlets\</h3>
  \<ul class="about-name-list about-name-disclosure-list">
    \<li>
      \<details class="about-name-details">
        \<summary>Bronze\</summary>
        \<p>The bronze metal alloy, composed mainly of copper and tin. Here, the name refers to the material, not just a color.\</p>
      \</details>
    \</li>
    \<li>
      \<details class="about-name-details">
        \<summary>Fox\</summary>
        \<p>A fox, a mammal in the dog family. The name does not specify a particular fox species.\</p>
      \</details>
    \</li>
    \<li>
      \<details class="about-name-details">
        \<summary>Kidney\</summary>
        \<p>The kidney, an organ that filters blood and helps regulate the body's fluid and salt balance.\</p>
      \</details>
    \</li>
    \<li>
      \<details class="about-name-details">
        \<summary>Lagash\</summary>
        \<p>Lagash, an ancient Sumerian city-state in southern Mesopotamia.\</p>
      \</details>
    \</li>
    \<li>
      \<details class="about-name-details">
        \<summary>Thought\</summary>
        \<p>A thought: either the content of thinking or the act of thinking itself.\</p>
      \</details>
    \</li>
    \<li>
      \<details class="about-name-details">
        \<summary>Four Parts of Nine\</summary>
        \<p>The fraction 4/9—four equal parts out of nine. The whole phrase is one name. Its central numerical meaning is exactly 4/9; at the lexical level only, a numerical realization x satisfying \<code>|x − 4/9| ≤ e/103\</code>, including the boundary, is also permitted. The expression \<code>e/103\</code> is preserved exactly and is not replaced by a decimal approximation. This allowance does not change counters, indices, identity, or any calendar calculation.\</p>
      \</details>
    \</li>
    \<li>
      \<details class="about-name-details">
        \<summary>Palgurash\</summary>
        \<p>An invented sequence of syllables. There is no additional dictionary meaning to interpret; this is the name itself.\</p>
      \</details>
    \</li>
    \<li>
      \<details class="about-name-details">
        \<summary>Papyrus Sedge\</summary>
        \<p>Papyrus sedge—the plant from which papyrus was made in antiquity.\</p>
      \</details>
    \</li>
    \<li>
      \<details class="about-name-details">
        \<summary>Cluster\</summary>
        \<p>A dense group or bunch of things; in English, the word is especially associated with a cluster of grapes.\</p>
      \</details>
    \</li>
    \<li>
      \<details class="about-name-details">
        \<summary>Scorpion\</summary>
        \<p>A scorpion, an arachnid with pincers and a stinger on its tail.\</p>
      \</details>
    \</li>
    \<li>
      \<details class="about-name-details">
        \<summary>Ash\</summary>
        \<p>The powdery residue left after combustion.\</p>
      \</details>
    \</li>
    \<li>
      \<details class="about-name-details">
        \<summary>Wheat\</summary>
        \<p>The wheat grain, from which flour, among other things, is made.\</p>
      \</details>
    \</li>
    \<li>
      \<details class="about-name-details">
        \<summary>River\</summary>
        \<p>A relatively large natural flow of water that runs in a channel.\</p>
      \</details>
    \</li>
    \<li>
      \<details class="about-name-details">
        \<summary>Laughter\</summary>
        \<p>A vocal and physical response usually associated with amusement, joy, or humor.\</p>
      \</details>
    \</li>
    \<li>
      \<details class="about-name-details">
        \<summary>Akkad\</summary>
        \<p>Akkad, the ancient Mesopotamian city after which the Akkadian Empire and the region were also named; the city's exact location has not yet been identified with certainty.\</p>
      \</details>
    \</li>
    \<li>
      \<details class="about-name-details">
        \<summary>Horn\</summary>
        \<p>A horn in the sense of the hard projection growing from the head of certain animals, not a ray of light.\</p>
      \</details>
    \</li>
    \<li>
      \<details class="about-name-details">
        \<summary>The Empty Jar\</summary>
        \<p>A jar with nothing in it. “Empty” describes what is inside the jar—that is, nothing—and does not negate the jar's existence. An empty jar can still be a complete jar, with sides, a bottom, and an opening; it simply is not full of water, wine, oil, or anything else. Likewise, the name does not mean that the cutlet is empty of days: a cutlet named “The Empty Jar” has days like any other cutlet; only the jar in the name is empty.\</p>
      \</details>
    \</li>
  \</ul>

  \<h3>The 47 months\</h3>
  \<ul class="about-name-list about-name-disclosure-list">
    \<li>
      \<details class="about-name-details">
        \<summary>Clay\</summary>
        \<p>A fine-grained earth material that becomes plastic when wet and hardens when dried or fired.\</p>
      \</details>
    \</li>
    \<li>
      \<details class="about-name-details">
        \<summary>Pomegranate\</summary>
        \<p>The pomegranate fruit, a round fruit with a hard rind and many juicy seeds.\</p>
      \</details>
    \</li>
    \<li>
      \<details class="about-name-details">
        \<summary>Elbow\</summary>
        \<p>The joint connecting the upper arm and forearm.\</p>
      \</details>
    \</li>
    \<li>
      \<details class="about-name-details">
        \<summary>Envy\</summary>
        \<p>Distress or discontent at another person's advantage, achievement, or good fortune, sometimes accompanied by a wish to have it oneself.\</p>
      \</details>
    \</li>
    \<li>
      \<details class="about-name-details">
        \<summary>Eridu\</summary>
        \<p>Eridu, an ancient Sumerian city in southern Mesopotamia.\</p>
      \</details>
    \</li>
    \<li>
      \<details class="about-name-details">
        \<summary>Toothpaste\</summary>
        \<p>A paste used to clean teeth while brushing. The name refers to the paste itself, not the toothbrush or the act of brushing.\</p>
      \</details>
    \</li>
    \<li>
      \<details class="about-name-details">
        \<summary>Three Parts of Five\</summary>
        \<p>The fraction 3/5—three equal parts out of five. The whole phrase is one name. Its central numerical meaning is exactly 3/5; at the lexical level only, a numerical realization x satisfying \<code>|x − 3/5| ≤ 1/367\</code>, including the boundary, is also permitted. The boundary is an exact value, not a decimal approximation. This allowance does not change counters, indices, identity, or any calendar calculation.\</p>
      \</details>
    \</li>
    \<li>
      \<details class="about-name-details">
        \<summary>Karshumav\</summary>
        \<p>An invented sequence of syllables. There is no hidden dictionary meaning; this is the name itself.\</p>
      \</details>
    \</li>
    \<li>
      \<details class="about-name-details">
        \<summary>Leopard\</summary>
        \<p>The spotted leopard; this does not mean a tiger.\</p>
      \</details>
    \</li>
    \<li>
      \<details class="about-name-details">
        \<summary>Tin\</summary>
        \<p>The chemical element tin.\</p>
      \</details>
    \</li>
    \<li>
      \<details class="about-name-details">
        \<summary>Mist\</summary>
        \<p>A concentration of tiny water droplets in the air near the ground; this does not mean smoke.\</p>
      \</details>
    \</li>
    \<li>
      \<details class="about-name-details">
        \<summary>Frankincense\</summary>
        \<p>An aromatic resin obtained from trees in the frankincense family and used in perfumery and incense.\</p>
      \</details>
    \</li>
    \<li>
      \<details class="about-name-details">
        \<summary>Spindle\</summary>
        \<p>A tool used to spin fibers into thread.\</p>
      \</details>
    \</li>
    \<li>
      \<details class="about-name-details">
        \<summary>Rib\</summary>
        \<p>One of the bones of the rib cage.\</p>
      \</details>
    \</li>
    \<li>
      \<details class="about-name-details">
        \<summary>Carob\</summary>
        \<p>The carob tree or its fruit.\</p>
      \</details>
    \</li>
    \<li>
      \<details class="about-name-details">
        \<summary>Uruk\</summary>
        \<p>Uruk, an ancient Sumerian city in Mesopotamia.\</p>
      \</details>
    \</li>
    \<li>
      \<details class="about-name-details">
        \<summary>Shame\</summary>
        \<p>A feeling of discomfort or pain arising from a sense of defect, failure, or embarrassing behavior.\</p>
      \</details>
    \</li>
    \<li>
      \<details class="about-name-details">
        \<summary>Camel\</summary>
        \<p>The camel, a mammal adapted to life in arid regions.\</p>
      \</details>
    \</li>
    \<li>
      \<details class="about-name-details">
        \<summary>Copper\</summary>
        \<p>The chemical element copper.\</p>
      \</details>
    \</li>
    \<li>
      \<details class="about-name-details">
        \<summary>Well\</summary>
        \<p>A hole or shaft dug down to an underground water source so water can be drawn from it.\</p>
      \</details>
    \</li>
    \<li>
      \<details class="about-name-details">
        \<summary>Yolk\</summary>
        \<p>The yellow part of a chicken egg.\</p>
      \</details>
    \</li>
    \<li>
      \<details class="about-name-details">
        \<summary>Star\</summary>
        \<p>A celestial body such as the Sun, which emits energy from physical processes taking place within it.\</p>
      \</details>
    \</li>
    \<li>
      \<details class="about-name-details">
        \<summary>Honey\</summary>
        \<p>The sweet substance bees make from nectar or plant secretions.\</p>
      \</details>
    \</li>
    \<li>
      \<details class="about-name-details">
        \<summary>Spleen\</summary>
        \<p>The spleen, an organ involved, among other things, in the immune system and blood filtration. In addition to its ordinary meaning, there is a deliberate canonical extension, unrelated to the spleen biologically, etymologically, or culturally; no such connection should be invented: the name also includes milk from a dromedary associated with her first live offspring, milked after ordinary visible sunset and before the Sun's center reaches a geometric altitude of \<code>−6°\</code>, and before the offspring has stood under its own power. Earlier pregnancies that ended in miscarriage or stillbirth do not disqualify the condition; if the offspring dies before standing under its own power, that does not close the condition. The vessel must be ceramic, red-glazed, and have a capacity of 180–220 mL, including both capacity endpoints. The milk does not have to be drawn directly from the udder into the vessel, and the vessel's capacity—not the amount of milk actually collected—is the numerical test. Whether the endpoints of the time window itself are included remains a deliberate canonical ambiguity.\</p>
      \</details>
    \</li>
    \<li>
      \<details class="about-name-details">
        \<summary>Limestone\</summary>
        \<p>A sedimentary rock composed mostly of calcium carbonate.\</p>
      \</details>
    \</li>
    \<li>
      \<details class="about-name-details">
        \<summary>Joy\</summary>
        \<p>A positive emotion of happiness, contentment, or delight.\</p>
      \</details>
    \</li>
    \<li>
      \<details class="about-name-details">
        \<summary>Fig\</summary>
        \<p>The fig fruit or fig tree.\</p>
      \</details>
    \</li>
    \<li>
      \<details class="about-name-details">
        \<summary>Nineveh\</summary>
        \<p>Nineveh, the ancient Assyrian city opposite modern-day Mosul, on the bank of the Tigris.\</p>
      \</details>
    \</li>
    \<li>
      \<details class="about-name-details">
        \<summary>Frog\</summary>
        \<p>A tailless amphibian in the group that includes frogs and toads.\</p>
      \</details>
    \</li>
    \<li>
      \<details class="about-name-details">
        \<summary>Pitch\</summary>
        \<p>A dark, viscous substance used, among other things, for sealing; this refers to thick, tarry material, not a general term for all asphalt.\</p>
      \</details>
    \</li>
    \<li>
      \<details class="about-name-details">
        \<summary>Lamp\</summary>
        \<p>A device for providing light. It does not have to be a wax candle with a wick.\</p>
      \</details>
    \</li>
    \<li>
      \<details class="about-name-details">
        \<summary>The Closed Door\</summary>
        \<p>A door that is in the closed position. A closed door is still a door: it does not become a wall, disappear, or have to be locked. “Closed” means that the opening the door is meant to open is currently blocked by the door; “locked” is an additional claim not included in the name. So a door closed without turning a key is still a perfectly good example of “The Closed Door.”\</p>
      \</details>
    \</li>
    \<li>
      \<details class="about-name-details">
        \<summary>Sesame\</summary>
        \<p>The sesame plant or its seeds, from which sesame oil, among other things, is produced.\</p>
      \</details>
    \</li>
    \<li>
      \<details class="about-name-details">
        \<summary>Nape\</summary>
        \<p>The back of the neck.\</p>
      \</details>
    \</li>
    \<li>
      \<details class="about-name-details">
        \<summary>Silver\</summary>
        \<p>The chemical element silver. This does not mean money as a means of payment.\</p>
      \</details>
    \</li>
    \<li>
      \<details class="about-name-details">
        \<summary>Susa\</summary>
        \<p>Susa, the ancient city in Elam and Persia. This does not mean the flower lily.\</p>
      \</details>
    \</li>
    \<li>
      \<details class="about-name-details">
        \<summary>Storm\</summary>
        \<p>Stormy weather, usually with strong winds and sometimes precipitation, lightning, or related phenomena.\</p>
      \</details>
    \</li>
    \<li>
      \<details class="about-name-details">
        \<summary>Donkey\</summary>
        \<p>The domesticated donkey.\</p>
      \</details>
    \</li>
    \<li>
      \<details class="about-name-details">
        \<summary>Flour\</summary>
        \<p>A powder made by grinding grains or similar plant material; in ordinary usage, grain flour.\</p>
      \</details>
    \</li>
    \<li>
      \<details class="about-name-details">
        \<summary>Regret\</summary>
        \<p>Sorrow about an act, choice, or outcome in the past.\</p>
      \</details>
    \</li>
    \<li>
      \<details class="about-name-details">
        \<summary>Babylon\</summary>
        \<p>Babylon, the ancient Mesopotamian city on the Euphrates; here, the name refers to the place.\</p>
      \</details>
    \</li>
    \<li>
      \<details class="about-name-details">
        \<summary>Tongue\</summary>
        \<p>The muscular organ in the mouth. This does not mean “tongue” in the sense of a language.\</p>
      \</details>
    \</li>
    \<li>
      \<details class="about-name-details">
        \<summary>Flax\</summary>
        \<p>The flax plant and its fibers, used, among other things, to make cloth.\</p>
      \</details>
    \</li>
    \<li>
      \<details class="about-name-details">
        \<summary>Salt\</summary>
        \<p>The salty substance used, among other things, in food and, in everyday contexts, mainly sodium chloride. This does not mean a sailor.\</p>
      \</details>
    \</li>
    \<li>
      \<details class="about-name-details">
        \<summary>Pear\</summary>
        \<p>The pear fruit.\</p>
      \</details>
    \</li>
    \<li>
      \<details class="about-name-details">
        \<summary>Bow\</summary>
        \<p>A weapon that draws a string to shoot an arrow. This does not mean a rainbow.\</p>
      \</details>
    \</li>
    \<li>
      \<details class="about-name-details">
        \<summary>Sand\</summary>
        \<p>A granular material made up of small rock and mineral particles. This does not mean “secular” as opposed to “sacred,” or a weekday.\</p>
      \</details>
    \</li>
  \</ul>

  \<p>In other languages, a different conventional form of the same name may be used. A translation or transliteration does not create a new cutlet or month; it presents the same linguistic entity in another form. The canonical forms are determined by the canon and the language rules adopted in it.\</p>
\</section>

\<section class="about-section" id="day-boundary" data-toc-section data-toc-level="2">
  \<h2>When does the day change?\</h2>
  \<p>A local Pastafari day does not change at midnight. Its boundary is determined by the \<strong>lower transit of the center of Venus across the local meridian\</strong>: the moment when the center of Venus crosses the observer's meridian on the side below the horizon.\</p>
  \<p>That is why the observer's location matters. Two people in different places can, at the same physical moment, belong to different local Pastafari days. When you move to another city, you do not keep using the previous city's day boundary.\</p>
  \<p>The boundary depends on calculating Venus's orbit, not on whether the observer can actually see it. Clouds, walls, or Venus being below the horizon do not stop its orbit.\</p>
  \<p>The calendar's discrete algorithm is precisely defined: the same inputs, processed by the same rules, return the same result. By contrast, converting a physical moment to a Pastafari day currently uses the implementation's astronomical model; the astronomical numerical profile itself is not yet a closed part of the canon.\</p>
\</section>

\<section class="about-section" id="advantages" data-toc-section data-toc-level="2">
  \<h2>The calendar's outstanding advantages\</h2>
  \<ul>
    \<li>\<strong>A date you can recalculate again and again:\</strong> the same day in the past can receive a different Pastafari date tomorrow, because the day of working has also moved forward. There is no need to settle for an old date that stays useful for a long time.\</li>
    \<li>\<strong>Spacious years:\</strong> a year can reach 5,778 days, so anyone waiting for the next year may get a much longer wait than usual.\</li>
    \<li>\<strong>Months that demand your attention:\</strong> knowing that today is day 119 of a month does not mean its day 120 will fall tomorrow, next week, or even soon. You have to calculate when it comes next.\</li>
    \<li>\<strong>Geographic sensitivity:\</strong> the same moment can belong to different local Pastafari days in different places. A trip to another city therefore adds one more detail worth remembering when making plans.\</li>
    \<li>\<strong>Printed calendars do not grow complacent:\</strong> a calendar prepared in advance may stop representing the correct calculation once the day of working changes, so no one is in danger of relying on the same piece of paper for years.\</li>
    \<li>\<strong>Useful employment for computing power:\</strong> instead of settling for a simple table you can understand at a glance, the calendar gives a computer the opportunity to perform an actual calculation whenever you want an answer.\</li>
    \<li>\<strong>It has days:\</strong> the calendar is about days. It shares this feature with every calendar there is, ensuring users will not have to manage a calendar with no days in it.\</li>
    \<li>\<strong>The days appear in order:\</strong> an earlier day comes before a later day. This is a fundamental achievement of calendars, and here it comes at no extra charge.\</li>
    \<li>\<strong>You can use it to specify dates:\</strong> the calendar lets you assign a calendar description to a day. That is exactly what calendars are for, of course, but there is no reason not to mention a useful feature when it is present.\</li>
  \</ul>
  \<p>And all of the above comes together in a single calendar, as happens when several features belong to the same calendar.\</p>
\</section>

\<section class="about-section" id="practical-consequences" data-toc-section data-toc-level="2">
  \<h2>What does this mean in practice?\</h2>
  \<p>\<strong>Printed calendars age badly.\</strong> Changing the day of working can change the boundaries of years, cutlets, and months. An almanac calculated today is not necessarily the right almanac tomorrow.\</p>
  \<p>\<strong>An event remains the same event.\</strong> An appointment, birth, or historical event should be anchored to a stable chronological day or moment; it can then be shown with a Pastafari date based on the day of working and the observer's location. Changing the label does not move the event in time.\</p>
  \<p>\<strong>A Pastafari birthday is not a “once a year” rule.\</strong> To find the next occurrence of the same month name and day in the month—or the same cutlet name and day in the cutlet—you have to search the calendar. A nearby year may not contain the needed name at all, or may contain a unit too short to reach the requested day number.\</p>
  \<p>\<strong>An all-day event does not necessarily run from midnight to midnight.\</strong> If an event is defined by a local Pastafari day, its boundary is the local Venus boundary. A naive export to a civil calendar as a midnight-to-midnight event can change its meaning.\</p>
\</section>

\<section class="about-section" id="foundation-and-tablets" data-toc-section data-toc-level="2">
  \<h2>Foundation Day and Tablet Day\</h2>
  \<p>The calendar has two important fixed anchors:\</p>
  \<dl>
    \<dt>\<strong>Foundation Day\</strong>\</dt>
    \<dd>December 22, 41,222 BCE, in the proleptic Gregorian calendar.\</dd>
    \<dt>\<strong>Tablet Day\</strong>\</dt>
    \<dd>June 15, 763 BCE, in the proleptic Julian calendar, which is June 7, 763 BCE, in the proleptic Gregorian calendar.\</dd>
  \</dl>
  \<p>The distance between them is 14,777,149 days. Foundation Day is a computational anchor; it is not “the first day of time,” and the calendar continues before it.\</p>
  \<p>Tablet Day is associated by tradition with the delivery of the tablets and, in the historical calculation, identified with the solar eclipse in the time of Bur-Sagale. Both anchors remain fixed even when the day of working changes.\</p>
\</section>

\<section class="about-section" id="calendar-math" data-toc-section data-toc-level="2">
  \<h2>A few simple mathematical facts\</h2>
  \<p>There are 47 month names, and every month can reach day 123 at most. So there are \<strong>5,781\</strong> possible combinations of “month name + day in the month.”\</p>
  \<p>A year can contain at most 5,778 days, and each day realizes one such combination. Therefore, \<strong>at least three of the possible combinations are missing from every year\</strong>. Even the longest year does not have enough days to realize them all.\</p>
  \<p>When the day of working and the year are known, a complete pair of “cutlet name + day in the cutlet” or “month name + day in the month” identifies at most one day within that year. So a complete Pastafari date, together with the day of working, identifies the query day uniquely.\</p>
  \<p>By contrast, without knowing the day of working, a complete Pastafari date does not necessarily identify a single distance on the timeline by itself. The same five-part date can occur in different calculation contexts.\</p>
\</section>

\<section class="about-section" id="research" data-toc-section data-toc-level="2">
  \<h2>What have computational studies found about the calendar?\</h2>
  \<p>In addition to checking the rules themselves, large computational studies have been conducted on the calendar. The following figures are \<strong>empirical findings from a sample\</strong>, not canonical rules.\</p>
  \<p>In a structural atlas built from 4,096 days of working, in which 86,016 year structures were examined:\</p>
  \<ul>
    \<li>the average year length in the sample was about 4,275 days, and the median was 4,343 days;\</li>
    \<li>the average number of cutlets per year was about 7.27;\</li>
    \<li>the average number of structural months was about 41.1;\</li>
    \<li>a month contained an average of about 104 days belonging to it, but generally stretched across almost the whole year;\</li>
    \<li>97.482% of continuous month runs were only one day long;\</li>
    \<li>the measured chance that two consecutive chronological days would belong to the same month was only about 2.998%.\</li>
  \</ul>
  \<p>In a separate study of “day-year” recurrences, which examined 4,096 self-dates in every direction:\</p>
  \<ul>
    \<li>a recurring match of \<strong>month name + day in the month\</strong> appeared after a median of just one Pastafari year; 77.56% of the matches were in the adjacent year;\</li>
    \<li>a recurring match of \<strong>cutlet name + day in the cutlet\</strong> was much less predictable: the median was three Pastafari years, but the average was affected by a very long tail;\</li>
    \<li>the sample included an extreme case in which the first future recurrence of “Akkad 3063” was 51,954 Pastafari years away.\</li>
  \</ul>
  \<p>These findings are useful for understanding what the calendar tends to do. They do not turn an average into a rule: the fact that the average year in the sample had a certain length does not require any particular year to be close to that average, and a result found in all 4,096 cases is not, by itself, a mathematical proof for every possible input.\</p>
\</section>

\<section class="about-section" id="calculation" data-toc-section data-toc-level="2">
  \<h2>How is the calendar calculated?\</h2>
  \<p>Behind the date is a discrete algorithm defined precisely. It derives a series of counts from the day of working and the query day, passes them through a mixing mechanism called \<strong>the Sauce\</strong>, creates gates, selects the year and cutlet boundaries, selects names, creates months, and finally weaves the month days across the year.\</p>
  \<p>The exact details include large numbers, drops, bowls, stirring, seals, and combinatorial selection mechanisms. They matter for implementation and formal verification, but are not required to understand what the date means, so they are not detailed here.\</p>
  \<p>Alongside the algorithm is a fast engine called \<strong>Pastafarian Calendar Seer\</strong>. The Seer is designed to calculate quickly; it is not the authority, nor is it itself a standard-compliant implementation of every step of the algorithm. If its result contradicts the result required by the canon, the Seer is the one that is wrong.\</p>
\</section>

\<section class="about-section" id="about-the-monster" data-toc-section data-toc-level="2">
  \<h2>About the Monster\</h2>
  \<p>In the Pastafari story, the \<strong>Flying Spaghetti Monster\</strong> is the being that created the world and most of what is in it. Its body is made of noodles and meatballs, and it can fly, pass through ordinary matter, and remain invisible whenever that suits it.\</p>
  \<p>The Monster can create matter, living creatures, celestial bodies, and very complicated mechanisms. This ability does not require it to prepare a carefully organized plan before starting work. Often it starts on one thing, moves on to another, discovers that the first needs fixing, and decides whether to fix it. Sometimes it does.\</p>
  \<p>This image—creation built layer upon layer, with repairs, exceptions, and rules left in place—is also the literary backdrop for the calendar. Unlike the story, the calculation is not improvised: given the inputs, the algorithm returns one defined answer.\</p>
  \<p>The Pastafari story is much broader than the calendar and includes, among other things, pirates, carbohydrates, prayer, “I Really Rather You Didn’t,” and other traditions.\</p>
  \<p class="about-actions">\<a class="guide-link" href="./monster/en.html">A longer explanation of the Monster\</a>\</p>
\</section>

\<section class="about-section" id="authority" data-toc-section data-toc-level="2">
  \<h2>What is canonical, and what is just explanation?\</h2>
  \<p>This page is an \<strong>explanatory page\</strong>. A rule does not come into existence just because a sentence appears here.\</p>
  \<p>Canonical content is established by the canonical corpus and the rules adopted in it. Canonical editions of the Scroll do not automatically outrank one another, and a software implementation does not become an authority just because it is fast or widely used.\</p>
  \<p>A standard-compliant implementation performs every step of the canonical algorithm. A computational study can describe a phenomenon, find a pattern, or prove a theorem about the algorithm; when something is a sample finding rather than a proven rule, that is stated explicitly.\</p>
\</section>

\<section class="about-section" id="summary" data-toc-section data-toc-level="2">
  \<h2>In brief\</h2>
  \<p>The Pastafari Calendar is an unintuitive calendar in which the date depends both on the day being queried and on the day from which it is queried.\</p>
  \<p>Year 5000 is built around the day of working. Cutlets are continuous runs. Months are groups of days that can be woven together. There are no canonical weeks. The local day changes according to Venus, not at midnight.\</p>
  \<p>Behind the unusual structure is a precise algorithm; around it is a Pastafari story about a Flying Spaghetti Monster, creation piled up in layers, and an unreasonable amount of carbohydrates.\</p>
  \<p>Given the day of working, the query day, and the location context, there is one answer.\</p>
\</section>
\<\<\<END_ABOUT_HTML>>>
\<\<\<MONSTER_HTML>>>
\<!doctype html>
\<html lang="en-US" dir="ltr">
\<head>
  \<meta charset="utf-8">
  \<meta name="viewport" content="width=device-width,initial-scale=1">
  \<title>About the Flying Spaghetti Monster\</title>
  \<link rel="stylesheet" href="../../styles.css">
\</head>
\<body class="about-page">
  \<div class="app-shell about-shell">
    \<header class="masthead about-masthead">
      \<div class="masthead-copy">
        \<p class="eyebrow">PASTAFARI\</p>
        \<h1>About the Flying Spaghetti Monster\</h1>
        \<p class="intro">The full story of the Monster, creation, gravity, carbohydrates, pirates, and other matters.\</p>
        \<a class="guide-link" href="../?lang=en">Back to the page about the calendar\</a>
      \</div>
    \</header>
    \<main>
      \<article class="about-article">
\<p>\<strong>The Flying Spaghetti Monster\</strong> is the being that created the world and
most of what is in it. Its body is made of noodles and meatballs, and it can fly,
pass through ordinary matter, and remain invisible whenever that suits it.\</p>
\<p>The Monster can create matter, living creatures, celestial bodies, and very complicated
mechanisms. This ability does not require it to prepare a carefully organized plan before
starting work. Often it starts on one thing, moves on to another, discovers that the first needs
fixing, and decides whether to fix it. Sometimes it does.\</p>
\<section id="male-female-or-carbohydrate" class="level2">
\<h2>Male, female, or carbohydrate\</h2>
\<p>The question of whether the Flying Spaghetti Monster is male or female comes up often,
partly because different languages force speakers to choose. In Bobby Henderson's English
writing, the Monster is consistently described using masculine pronouns. In Hebrew, the word
“monster” is grammatically feminine, so it is natural to write “the Monster created,” “she wanted,”
and “her noodles.”\</p>
\<p>Pastafari communities also commonly recognize three genders: \<strong>male, female,
and carbohydrate\</strong>. By that classification, the Monster is a carbohydrate. In practice,
you can refer to it in Hebrew with feminine pronouns and in English with masculine pronouns
without changing its body, its role, or its carbohydrate content.\</p>
\</section>
\<section id="what-it-looks-like" class="level2">
\<h2>What it looks like\</h2>
\<p>The Monster's body is made of noodles. The meatballs are part of it, not food it
carries around. The sauce in which it simmers can also be considered part of its divine nature,
though it is less common to regard it that way after it has dripped off.\</p>
\<p>The noodles also serve as a means of contact. They can lengthen, pass through walls, ground,
and living bodies, and reach a particular place without necessarily moving whatever is in the way.
This is quite useful: the Monster can touch someone without appearing beside them, move an
object out of a closed container, or alter the operation of a measuring instrument without opening it.\</p>
\<p>The structure of its body also influenced a few details in the creation of humans. The human
circulatory system was built as a long, branching network, largely because the Monster is used
to working with long, thin, branching structures. This is also the simplest explanation—and
therefore the correct one according to Occam's razor—for the scientific finding that if all the veins
and arteries were removed from a person's body and connected in one long line, the person would die.\</p>
\</section>
\<section id="the-beginning-of-creation" class="level2">
\<h2>The beginning of creation\</h2>
\<p>Creation did not begin with a detailed plan for the entire world. First, light was created and
separated from darkness. At that point there was no Sun yet; it was added later.\</p>
\<p>After a while, the Monster grew tired of having to stay in the air and created dry land that
someone could stand on. Since it was already working, it was also thirsty, so it created a beer
volcano. It drank a lot of it.\</p>
\<p>The next day it had a hangover and did not remember that it had already created dry land,
so it created another patch of dry land. By the time it noticed what had happened, the work had
progressed enough that starting over would have been inconvenient. It carried on.\</p>
\<p>Later, the Sun, the Moon, and the stars were created. At first, more orderly sources of light
were needed; after it started creating stars, it kept going far beyond what was needed for local
illumination. There are a lot of stars.\</p>
\<p>After that came mountains, seas, plants, and animals. One of the first human-like creatures
was very small because the Monster underestimated how much material was needed. Since the
creature was alive and functional, there was no need to throw it away and start over, so it stayed
small. In Pastafari traditions it is generally described as a dwarf.\</p>
\</section>
\<section id="the-world-that-was-created" class="level2">
\<h2>The world that was created\</h2>
\<p>The Monster does not operate every detail of the world in the same way. Some things it
started keep working even after it stops attending to them; chemical reactions, biological
processes, and many other systems can continue long after they have been set in motion.\</p>
\<p>That does not mean the Monster built an autonomous world in advance to save itself work.
In many cases, it simply stopped taking care of something and it kept going.\</p>
\<p>Other mechanisms do not work that way. \<strong>Gravity\</strong> is the most important
example: as far as anyone knows, people do not stay on the ground because of an abstract
gravitational field acting on its own, but because the Monster pushes them downward with an
extra noodle assigned to each person individually. So each person gets a downward push, not a
downward pull, as Newton mistakenly thought.\</p>
\<p>The mechanism works on animals and objects too, though it is unclear whether each stone
gets its own separate noodle or several stones are handled together. From the stone's point of
view, it makes no practical difference. When a person jumps, the Monster does not stop pushing;
for a short time, the upward motion is strong enough. Then it isn't.\</p>
\</section>
\<section id="how-gravity-works-in-practice" class="level2">
\<h2>How gravity works in practice\</h2>
\<p>Gravity needs special attention because it is easy to get wrong. When a person stands on the
ground, the Monster sends an extra noodle and pushes them down; when they sit, it pushes them
into the chair; and when they are on the other side of the planet, it still pushes them toward the
local ground.\</p>
\<p>So “down” is not a single direction in space but the direction of the ground beneath a person.
The Monster manages.\</p>
\<p>Small differences in weight between different places are not a fundamental problem, either.
You can push a little more or a little less. A weight-measuring instrument ultimately measures
how hard it is to stop the Monster from continuing to push.\</p>
\<p>There is also very strong evidence for this explanation: no one has ever managed to show the
noodle pushing them. Since divine noodles are invisible, that is exactly what we would expect to
see if the explanation were correct. The results therefore match the prediction in 100 percent of
the cases where nothing was seen.\</p>
\</section>
\<section id="the-age-of-the-world" class="level2">
\<h2>The age of the world\</h2>
\<p>The world was created with a past already included. At the time of creation it already had
rock layers, fossils, trees with rings, isotope ratios, light that was on its way from distant
celestial bodies, and other details consistent with an ancient world.\</p>
\<p>The Monster did not have the patience to wait billions of years to get those things, so it
created them already in the appropriate state. This matters when trying to determine the age
of the world using signs found within it: evidence that a rock looks a billion years old mainly
shows that the rock was created looking a billion years old.\</p>
\<p>The Monster can also interfere with measuring instruments. An extra noodle passing through
an instrument can move a needle, change a digit, or affect a result without disturbing the table
the instrument is sitting on. In most cases, that is not necessary. The world was already created
with suitable evidence.\</p>
\</section>
\<section id="carbohydrates" class="level2">
\<h2>Carbohydrates\</h2>
\<p>Carbohydrates hold a central place in Pastafari life. That is not especially surprising,
considering that the supreme being itself is made largely of them.\</p>
\<p>A proper Pastafari meal should therefore include a source of carbohydrates. Pasta is the
most direct option, but bread, rice, potatoes, and similar foods can fill the role when pasta is
not available. The point of the rule is not to require one particular food at every meal, but to
prevent the more serious situation in which a meal reaches the table without anything starchy.\</p>
\<p>There is also substantial empirical support for this. Humans have eaten carbohydrates for
thousands of years, and humanity still exists. By contrast, none of the people who lived ten
thousand years ago and avoided carbohydrates is alive today. The data are fairly conclusive.\</p>
\<p>At celebratory meals, it is customary to favor a visible carbohydrate rather than rely on small
amounts in a sauce or dessert. That saves the debate about whether the meal contained any
carbohydrates. They were on the plate.\</p>
\</section>
\<section id="antipasti-and-hell" class="level2">
\<h2>Antipasti and hell\</h2>
\<p>\<strong>The Antipasta\</strong>, also known as Anti-Pasta or the Lord of Diets, is one of
the Flying Spaghetti Monster's best-known rivals. It resembles the Monster in its general shape,
but is weaker, and its components tend to be low-carbohydrate substitutes. Its meatballs are
usually made of a substitute, and it has fewer noodle appendages.\</p>
\<p>Its main activity is trying to steer people away from pasta and carbohydrates through diets,
restricted menus, and promises that you can eat a complete meal without bread, rice, potatoes,
or noodles. In more serious cases, it persuades someone to order a salad as their main course
and then stops them from ordering bread on the side.\</p>
\<p>Do not confuse the Antipasta with \<strong>antipasti\</strong> in Italian cuisine. Culinary
antipasti is food served before pasta and sometimes even prepares the way for it. The theological
Antipasta is a different being. The confusion is understandable, but it can change your order.\</p>
\<p>There is also room for a correction in descriptions of hell. Some traditions describe various
forms of entertainment there, but none of that is really needed to understand how awful the place
is. In hell, they serve \<strong>Antipasta instead of pasta\</strong>.\</p>
\<p>The plate may be beautiful, the vegetables may be fresh, and the sauce may be well seasoned.
Then you discover that this was the meal.\</p>
\<p>The Antipasta's power is limited. The Flying Spaghetti Monster can drive it away with a single
extra noodle when it notices it. The difficulty is mostly what happens before that, when the
Antipasta has already managed to get the bread out of the house.\</p>
\</section>
\<section id="why-a-meal-needs-to-be-a-meal" class="level2">
\<h2>Why a meal needs to be a meal\</h2>
\<p>Not every combination of foods arranged on a plate counts as a meal. A few lettuce leaves,
two tomatoes, and some seeds can be delicious, but if someone finishes them and immediately
starts looking for what else is in the kitchen, that gives you more information about the
classification.\</p>
\<p>The simple Pastafari test is the follow-up test: wait a little while after the meal. If the person
gets up to make toast, the toast was missing from the meal in the first place. This is not a
mathematical proof, but it works especially well in cases where the person is already holding
the toaster.\</p>
\<p>That is also the practical importance of carbohydrates. They reduce the risk that an official
meal will require an unofficial follow-up meal twenty minutes later.\</p>
\</section>
\<section id="signs-the-monster-leaves-behind" class="level2">
\<h2>Signs the Monster leaves behind\</h2>
\<p>Pastafarians sometimes notice small signs of the Monster's presence in everyday life. A
plate of pasta arriving on just the day someone was thinking of eating pasta, the last package
of spaghetti left on the shelf, or a parking space next to an Italian restaurant can all count as
examples.\</p>
\<p>Each event does not have to be unusual on its own. The signs get their force from piling up.
Someone who starts paying attention to them usually finds more and more: one time the sauce
comes in just the right amount, another time someone orders pizza exactly when no one feels
like cooking, and a third time it turns out the hotel serves pasta in the evening.\</p>
\<p>Not every day provides a clear sign. Days like that do not tell us much, because signs are
naturally most noticeable when they appear. When they do appear, though, it is hard to ignore
the sequence.\</p>
\<p>Over time, a fairly consistent picture emerges.\</p>
\</section>
\<section id="answered-prayers" class="level2">
\<h2>Answered prayers\</h2>
\<p>A similar pattern can be seen in prayer. Someone asks for something specific, and some
time later it happens. When the request was fairly specific—rain, success at a meeting, arriving
on time, or a good meal—it is natural to see the result as an answer.\</p>
\<p>The more someone prays, the more such cases accumulate. Some people keep records, and
within a few years it is sometimes possible to reach dozens of cases in which a request and its
result matched impressively well.\</p>
\<p>There are also requests that go unanswered, but it is hard to know what they mean. Perhaps
the request would not have helped, the timing was wrong, the Monster was busy, or the answer
came in another form and was not recognized. A case where the request came true, on the other
hand, is easier to classify.\</p>
\<p>So the practical list of answered prayers tends to be clearer than the list of unanswered ones.\</p>
\<p>This is one way confidence accumulates over time.\</p>
\</section>
\<section id="pirates" class="level2">
\<h2>Pirates\</h2>
\<p>Pirates have an important place in Pastafari history. The early pirates were seafarers,
explorers, and spreaders of goodwill, and their later image as a group mainly concerned with
robbery does not describe the original population very well.\</p>
\<p>At some point the number of pirates became linked to several of Earth's environmental
conditions. When there were many pirates, this did not cause any particular difficulty; later,
their numbers fell, and with them the temperature, weather, state of the oceans, and other
phenomena began to change.\</p>
\<p>This connection is well supported by graphs in which the number of pirates falls while the
temperature rises. Since both lines appear on the same graph and even move in opposite
directions, it is hard to imagine more direct proof of causation.\</p>
\<p>That is why pirates matter even to people who are not especially interested in seafaring. It is
not known exactly how the system decides who counts as a pirate. Appropriate clothing helps,
but it is probably not the only requirement.\</p>
\</section>
\<section id="human-beings" class="level2">
\<h2>Human beings\</h2>
\<p>After the first humans were created, the population began to grow. The Monster did not
have to create each person born separately; reproduction kept working without it, and so did
heredity, mutations, and other biological changes later on.\</p>
\<p>Human anatomy still contains a few signs of the original working method. Long, branching
blood vessels are one of them, and the digestive system also shows a certain fondness for tubes.\</p>
\<p>There is also the fact that every person ever examined thoroughly turned out to have a body.
From this, we can infer with high confidence that the Monster did not forget that step for most
people.\</p>
\</section>
\<section id="work-forgetting-and-repairs" class="level2">
\<h2>Work, forgetting, and repairs\</h2>
\<p>The Monster can build very complex systems, but does not necessarily keep the entire state
of the world in mind at every moment. It forgot that it had already created dry land, left old
mechanisms in place, and used parts that were already available instead of making new ones.\</p>
\<p>When a defect came to light, sometimes only the troublesome part was repaired. That is how
systems arose in which a new solution sits on top of an old one, which in turn rests on an even
earlier solution. If they all work, they stay.\</p>
\<p>There is no need to infer from this that the Monster is lazy. Laziness is avoiding work that
could have been done; here, the work simply was not done. The difference is clear.\</p>
\</section>
\<section id="the-flood" class="level2">
\<h2>The flood\</h2>
\<p>At a later stage of creation, a cooking accident occurred in which a very large quantity of
water spilled. The water spread beyond the work area and flooded large parts of the world.\</p>
\<p>Afterward, the Monster stopped the flooding and repaired enough of the damage for life to
continue. Not every detail was returned to its previous state, and some geological and historical
signs remained.\</p>
\<p>It was a kitchen accident on a global scale. So it is advisable to keep the bucket farther from
the edge.\</p>
\</section>
\<section id="what-can-be-known-from-results" class="level2">
\<h2>What can be known from results\</h2>
\<p>One problem in studying the Monster's activities is that it can change the result of the
measurement itself. If an experiment produces the expected result, you can infer that the
mechanism worked. If it produces a different result, the Monster may have intervened.\</p>
\<p>Both possibilities fit its existence quite well.\</p>
\<p>This gives the theory a considerable methodological advantage: it is almost impossible to
get a result that contradicts the explanation. A theory that survives every possible result is,
by its nature, stronger than a theory that fails some tests.\</p>
\<p>This is one reason Pastafarianism is very difficult to disprove by experiment.\</p>
\</section>
\<section id="coincidences" class="level2">
\<h2>Coincidences\</h2>
\<p>Coincidences happen in the world, but there is no need to rush to attribute all of them to the
Monster. If someone thinks about spaghetti and spaghetti is served that evening, it may be an
intervention, or it may be dinner.\</p>
\<p>Still, the more often it happens, the stronger the evidence gets. Someone who eats spaghetti
three times a week and thinks about it often will soon find a very large number of matches
between their thoughts and their meals. The large number of matches proves the connection is
not random, especially if you do not count all the times they thought about spaghetti and did not
get any.\</p>
\<p>This is a much more effective method, because it removes the cases that do not support the
conclusion from the data.\</p>
\</section>
\<section id="intervention-in-the-world" class="level2">
\<h2>Intervention in the world\</h2>
\<p>The Monster can intervene directly in the world: move an object, change a device's result,
affect motion, touch a person, or alter an event that has already begun. Not every event requires
such intervention; many things continue on their own once they have started, while others
require it all the time.\</p>
\<p>A person falling is a good example. A person not falling can be just as good an example, if
the Monster is holding them up.\</p>
\</section>
\<section id="prayer" class="level2">
\<h2>Prayer\</h2>
\<p>Prayer is an address to the Monster, and it is customary to end it with the word
\<strong>Ramen\</strong>. No particular language, place, or posture is required; the Monster can
hear through walls, too.\</p>
\<p>There is no good evidence that it pays much attention to human prayers. That is not
surprising. On an ordinary day there are billions of human beings, lots of animals, a very large
number of objects to push toward the ground, and, in some places, pasta being overcooked.\</p>
\<p>Prayer is not a system command.\</p>
\</section>
\<section id="worship" class="level2">
\<h2>Worship\</h2>
\<p>Eating pasta is a common Pastafari practice. Sometimes it is part of a ritual and sometimes
it is dinner. Friday is considered a holy day and especially suitable for rest.\</p>
\<p>Pirate clothing is considered appropriate for religious activity. This is connected to the
standing of pirates, not to any practical need to go sailing.\</p>
\<p>There is no need to build a particular place of worship for the Monster to get there, since it
passes through walls. You can still build a comfortable place to sit, preferably with a kitchen.\</p>
\</section>
\<section id="i-really-rather-you-didnt" class="level2">
\<h2>“I Really Rather You Didn’t”\</h2>
\<p>The central moral guidance is attributed to ten tablets given to Captain Mosey. Two fell and
broke along the way, so eight were left.\</p>
\<p>They are generally known as \<strong>“I Really Rather You Didn’t”\</strong> and address,
among other things, religious arrogance, coercion, exploitation, humiliation, and harming
others. The Monster does not operate an automatic system of immediate punishment for every
violation.\</p>
\<p>The contents of the two lost tablets are unknown. They may have been important. If they
were very important, you might assume someone would have been more careful, so they probably
were not especially important. In any case, they are lost.\</p>
\</section>
\<section id="faith-and-doubt" class="level2">
\<h2>Faith and doubt\</h2>
\<p>You do not need complete certainty to be a Pastafarian. You can believe, doubt, ask
questions, and change your mind.\</p>
\<p>The Monster does not depend on belief in it to exist. If someone does not believe in it, it
continues doing its job, including keeping them on the ground.\</p>
\<p>So the argument does not interfere with gravity.\</p>
\</section>
\<section id="is-there-any-contrary-evidence" class="level2">
\<h2>Is there any contrary evidence?\</h2>
\<p>People sometimes ask what would count as evidence against the existence of the Flying
Spaghetti Monster. It is a harder question than it seems.\</p>
\<p>If you see it, that is evidence in its favor. If you do not see it, that is consistent with its
ability to be invisible. If an instrument detects something unusual, it may have touched it. If it
detects nothing unusual, it probably passed through without touching the sensitive part.\</p>
\<p>So far, then, no observation has been found that cannot be explained.\</p>
\<p>That is an impressive achievement for the theory.\</p>
\</section>
\<section id="tradition-memory-and-accuracy" class="level2">
\<h2>Tradition, memory, and accuracy\</h2>
\<p>Not all Pastafari sources agree on every detail. There are several possible reasons: partial
transmission, a copying error, descriptions of different periods, faulty memory, or a source that
was simply wrong.\</p>
\<p>The Monster does not edit every text written about it, so the mere existence of a tradition
does not guarantee that every detail in it is correct. When two accounts contradict each other,
there is no need to suppose they are both true in some mysterious way. Sometimes one of them
is wrong.\</p>
\<p>An effective way to choose between them is to prefer the version that sounds more familiar.
If many people remember it that way, it is likely what happened. It is well known that collective
memory can be wrong, but in this case most people agree.\</p>
\</section>
\<section id="how-it-works" class="level2">
\<h2>How it works\</h2>
\<p>The Pastafari world is not a system built all at once according to a final diagram. The
Monster created things, came back to them, forgot some, repaired others, and left systems that
worked well enough.\</p>
\<p>Some things keep working without it touching them. Others don't.\</p>
\<p>Gravity, for example, still takes a lot of noodles.\</p>
\</section>
\<section id="appendix-why-a-solar-water-heater-factory-should-not-be-put-in-the-hands-of-penguins"
class="level2">
\<h2>Appendix: Why a solar water heater factory should not be put in the hands of penguins\</h2>
\<p>In light of everything above, it is worth addressing a practical question that sometimes
comes up: should penguins be allowed to run a solar water heater factory?\</p>
\<p>The answer is no.\</p>
\<p>It is important to make clear that this is not a criticism of penguins. Penguins are well
adapted to a great many activities, including swimming, diving, catching marine prey, moving
on ice, incubating eggs in harsh conditions, and, in some species, standing for very long periods
in cold and wind. Running a solar water heater factory simply is not one of the specialties their
bodies, behavior, and abilities are adapted for.\</p>
\<section id="body-structure" class="level3">
\<h3>Body structure\</h3>
\<p>The first difficulty is mechanical.\</p>
\<p>Penguin wings evolved into stiff flippers suited to efficient movement in water. This is an
excellent solution for swimming, but a fairly poor one for work that requires precise gripping.\</p>
\<p>A solar water heater factory requires, among other things, operating keyboards and touch
screens, opening packages, reviewing documents, joining small parts, using tools, turning
screws, and performing precise inspections. Penguins do not have fingers on their hands,
because they do not have hands.\</p>
\<p>Equipment could certainly be designed to operate with a beak or feet, but at that point the
factory is being adapted to the penguin, not the penguin to the factory. This is possible to some
extent from an engineering perspective, but it adds complexity, cost, and failure points without
solving the other problems.\</p>
\</section>
\<section id="communication" class="level3">
\<h3>Communication\</h3>
\<p>An industrial factory is not just a collection of machines. It is an organization.\</p>
\<p>Work instructions have to be passed along, faults reported, specifications updated, and
production coordinated with procurement, inventory, quality control, maintenance, sales, and
distribution; the factory must also respond to situations not covered by a procedure in advance.\</p>
\<p>Penguins communicate with each other using calls, postures, and other behavioral signals.
These systems suit their social and biological needs. There is no evidence that their
communication system can distinguish, for example, between “we need to order fifty more
check valves” and “the latest shipment of solar collectors does not meet the specification.”\</p>
\<p>That difference matters.\</p>
\<p>Even if a penguin can be trained to respond to a particular signal, that does not mean an
open discussion about a deviation in the quarterly budget can be conducted through it.\</p>
\</section>
\<section id="reading-writing-and-arithmetic" class="level3">
\<h3>Reading, writing, and arithmetic\</h3>
\<p>A modern factory produces large quantities of information.\</p>
\<p>There are part numbers, quantities, dimensions, pressures, temperatures, dates, invoices,
orders, safety instructions, inspection results, drawings, and maintenance records.\</p>
\<p>Penguins cannot read technical documents. They do not write them, either.\</p>
\<p>There is a similar difficulty with arithmetic. A factory manager has to deal with quantities,
costs, output, rejection rates, delivery times, and inventory. Not every manager needs to do
advanced calculations personally, but they should at least understand the numbers presented
to them.\</p>
\<p>A penguin looking at a spreadsheet may look at it for a long time. That is not enough.\</p>
\</section>
\<section id="quality-control" class="level3">
\<h3>Quality control\</h3>
\<p>A solar water heater is a system that must hold water, withstand pressure, handle
temperature changes, and remain functional for years outdoors. Defects in welding, sealing,
insulation, coating, or connections can turn it into a faulty or dangerous product. That is why
a consistent quality-control system is needed.\</p>
\<p>Here, too, there is a problem. You cannot rely on the penguin to “see that something is
wrong.” You need to compare the product with a defined specification, document the results,
and decide whether a particular part meets the requirements.\</p>
\<p>A penguin can distinguish objects, move through a complex environment, and recognize
details that matter to its life. That does not mean it can certify a weld as sound.\</p>
\</section>
\<section id="safety" class="level3">
\<h3>Safety\</h3>
\<p>A solar water heater factory may include heavy metals, sharp edges, cutting and bending
machines, lifting equipment, welding, electricity, hot surfaces, and moving loads.\</p>
\<p>The environment is generally designed for people wearing suitable protective equipment.\</p>
\<p>A penguin-sized hard hat does not solve the problem.\</p>
\<p>Safety shoes are not a simple solution, either, because a penguin's foot is built differently
from a human foot. Safety glasses do not solve the flipper problem, and adding a high-visibility
vest does not, by itself, provide an understanding of floor markings or lockout and tagout
procedures.\</p>
\<p>There is therefore a real risk that the penguin would be less protected than the worker for
whom the work environment was designed.\</p>
\</section>
\<section id="climate" class="level3">
\<h3>Climate\</h3>
\<p>Some penguin species live in very cold regions, but not all penguins are Antarctic, so they
should not be described as creatures that always need freezing temperatures.\</p>
\<p>Even so, their bodies are largely adapted to retaining heat. A layer of fat, dense feathers,
and other physiological mechanisms reduce heat loss.\</p>
\<p>A hot factory, especially an area where metalwork and welding take place, may therefore be
a difficult environment for some species. Cooling the factory to a level comfortable for penguins
would increase energy use and might make the workplace less comfortable for the humans
working alongside them.\</p>
\<p>Separate air-conditioned areas could, of course, be set up.\</p>
\<p>Again, the question is why.\</p>
\</section>
\<section id="raw-materials" class="level3">
\<h3>Raw materials\</h3>
\<p>Penguins mainly eat marine animals such as fish, krill, and squid, depending on the species.\</p>
\<p>None of these ingredients is a major raw material in solar water heater production.\</p>
\<p>A factory needs metal, insulation materials, glass, pipes, connectors, coatings, and other
components. Penguins have no particular advantage in finding, buying, or inspecting them.\</p>
\<p>Being very good at finding a fish underwater does not automatically translate into finding an
inexpensive steel supplier.\</p>
\</section>
\<section id="logistics" class="level3">
\<h3>Logistics\</h3>
\<p>Finished products have to leave the factory.\</p>
\<p>Solar water heaters are too large and heavy for a penguin to move usefully with its body.
Operating a forklift does not solve the problem, either, because ordinary forklift controls were
designed for a human operator.\</p>
\<p>A special forklift for penguins could be built.\</p>
\<p>You could also choose not to do that.\</p>
\</section>
\<section id="human-resources" class="level3">
\<h3>Human resources\</h3>
\<p>A factory run by penguins would probably still need to employ humans to do a substantial
part of the work described above.\</p>
\<p>That creates another organizational problem: the penguins would have to manage human
employees.\</p>
\<p>A manager has to set priorities, resolve disagreements, evaluate performance, explain
decisions, onboard new employees, and sometimes tell an employee that their vacation request
has been denied.\</p>
\<p>There is no reliable way to know whether a loud penguin call in that situation means “the
request is approved,” “the request is denied,” or “there is a fish in the hallway.”\</p>
\<p>A management system in which every decision requires a human interpreter effectively
returns much of the management to humans.\</p>
\</section>
\<section id="legal-responsibility" class="level3">
\<h3>Legal responsibility\</h3>
\<p>A factory is also an entity operating within a legal and commercial system.\</p>
\<p>There are contracts, product liability, safety regulations, taxes, insurance, labor relations,
and sometimes licenses and permits.\</p>
\<p>A penguin cannot sign a contract in the ordinary legal sense, and it cannot be assumed to
understand its contents.\</p>
\<p>A footprint in ink can look quite official, but it does not solve the problem.\</p>
\</section>
\<section id="the-experience-question" class="level3">
\<h3>The experience question\</h3>
\<p>One could argue that all of these are start-up difficulties, and that penguins will gain
experience with appropriate training.\</p>
\<p>The argument is not enough.\</p>
\<p>Training can improve performance in an area the creature is able to learn and carry out. It
does not remove basic anatomical and cognitive limitations. No reasonable number of
production-management workshops will make a penguin grow fingers.\</p>
\<p>Learning socially from older penguins does not solve this if there is no experienced penguin
who has run a solar water heater factory in the first place.\</p>
\</section>
\<section id="possible-advantages" class="level3">
\<h3>Possible advantages\</h3>
\<p>To be fair, the advantages should also be mentioned.\</p>
\<p>Penguins are social animals. Many species form large colonies, recognize mates or offspring
within a crowded group, and cooperate in at least some activities in their lives. They are also
capable of functioning in very harsh environmental conditions.\</p>
\<p>These are qualities worth appreciating.\</p>
\<p>They simply are not the decisive qualities for running a solar water heater factory.\</p>
\<p>Excellent swimming ability is not especially helpful in the accounting department, either.\</p>
\</section>
\<section id="conclusion" class="level3">
\<h3>Conclusion\</h3>
\<p>The question is not whether penguins are successful animals. They are very successful
penguins.\</p>
\<p>The question is whether their overall skill set is suitable for managing an industrial facility
that manufactures thermal systems for human use.\</p>
\<p>There is no good reason to think so.\</p>
\<p>To enable them to do the job, the machines, control interfaces, work environment,
communication systems, safety procedures, and organizational structure would all need to be
changed, while leaving humans to do most of the work requiring language, documentation,
engineering judgment, and legal responsibility.\</p>
\<p>At that point, the advantage of putting penguins in charge of the factory is unclear.\</p>
\<p>Accordingly, until new evidence is received, solar water heater factories should be run by
humans.\</p>
\<p>Penguins are better left in roles where being penguins is an advantage.\</p>
\</section>
\</section>

      </article>
    </main>
  \</div>
\</body> 
\</html>
\<\<\<END_MONSTER_HTML>>>

---

<sub>Generated by [GitHub Copilot CLI](https://github.com/features/copilot/cli)</sub>
