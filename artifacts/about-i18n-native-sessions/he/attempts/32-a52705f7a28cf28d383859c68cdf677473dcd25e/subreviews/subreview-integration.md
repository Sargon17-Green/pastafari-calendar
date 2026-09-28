# SUBREVIEW_SESSION
surface: integration
reviewer_model: Qwen3 8B Q4_K_M
attempts: 2

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
SOURCE_PART=INTEGRATION
SURFACE_RULES:
Review ONLY language-facing localization behavior: visible fallback text, ARIA/title/placeholder text, locale switching, document language/direction and whether a wrong-language string can actually remain visible. DO NOT review JavaScript style, storage helpers, parameter naming, performance, general error handling, API design, comments, or code correctness that has no direct language-facing effect. If no concrete language-facing defect is shown, return CLEAN. For a text finding, current_text must be the exact visible literal; for a proven fallback-path defect with no literal, current_text may be empty.

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
…
328:   assertLoadedLocaleMatchesMetadata(resource, metadata);
329:   validateLocaleResourceShape(resource, metadata.code);
330:   validateLocaleResourceShape(englishBaseline, DEFAULT_LOCALE);
331:   if (!SUPPORT_LEVELS.includes(metadata.support)) throw new RangeError(`Locale ${metadata.code} has invalid support status.`);
332:   if (!["ltr", "rtl"].includes(metadata.dir)) throw new RangeError(`Locale ${metadata.code} has invalid direction.`);
…
393:     const resource = await loadLocaleSource(metadata.code);
394:     if (metadata.support === "complete") return wrapCompleteLocaleSource(resource);
395:     const english = await loadLocaleSource(DEFAULT_LOCALE);
396:     return materializeLocaleResources(resource, metadata, english);
397:   })();
…
485:     return [source?.code, source];
486:   }));
487:   const english = sourceByCode.get(DEFAULT_LOCALE);
488:   if (!english) throw new RangeError("English baseline locale is required for audit.");
489:   const englishGroups = localGroups(english);
…
495:     const groups = localGroups(source);
496:     const resourceGroups = {
497:       messages: analyzeGroup(groups.messages, englishGroups.messages, "messages", { checkEnglishLeakage: metadata.code !== DEFAULT_LOCALE }),
498:       terminology: analyzeGroup(groups.terminology, englishGroups.terminology, "terminology", { checkEnglishLeakage: metadata.code !== DEFAULT_LOCALE }),
499:       cutlets: analyzeGroup(groups.cutlets, englishGroups.cutlets, "cutlets", { checkEnglishLeakage: metadata.code !== DEFAULT_LOCALE }),
500:       months: analyzeGroup(groups.months, englishGroups.months, "months", { checkEnglishLeakage: metadata.code !== DEFAULT_LOCALE }),
501:     };
502: 
…
543:     sourceByCode.set(source.code, source);
544:   }
545:   const english = sourceByCode.get(DEFAULT_LOCALE);
546:   if (!english) throw new RangeError("English baseline locale is required for validation.");
547:   if (sources.length !== LOCALES.length) throw new RangeError(`Expected ${LOCALES.length} locale resources, received ${sources.length}.`);

===== docs/i18n/registry.js — LOCALE LOAD/FALLBACK FUNCTIONS =====
218: export async function loadLocaleSource(code) {
219:   const metadata = getLocale(code);
220:   const existing = loadedSources.get(metadata.code);
221:   if (existing) return existing;
222: 
223:   const loading = metadata.loader().then((module) => assertLoadedLocaleMatchesMetadata(module.default, metadata));
224:   loadedSources.set(metadata.code, loading);
225:   try {
226:     return await loading;
227:   } catch (error) {
228:     if (loadedSources.get(metadata.code) === loading) loadedSources.delete(metadata.code);
229:     throw error;
230:   }
231: }

362: export function materializeLocaleResources(resource, metadata, englishBaseline) {
363:   validateLocaleSourceContract(resource, metadata, englishBaseline);
364:   const local = localGroups(resource);
365:   const fallback = localGroups(englishBaseline);
366:   const result = {
367:     ...resource,
368:     messages: mergeGroup(fallback.messages, local.messages),
369:     terminology: mergeGroup(fallback.terminology, local.terminology),
370:     calendar: Object.freeze({
371:       ...ownRecord(englishBaseline?.calendar),
372:       ...ownRecord(resource?.calendar),
373:       cutlets: mergeGroup(fallback.cutlets, local.cutlets),
374:       months: mergeGroup(fallback.months, local.months),
375:     }),
376:   };
377:   Object.defineProperty(result, LOCAL_SOURCE, { value: resource, enumerable: false });
378:   return Object.freeze(result);
379: }

387: export async function loadLocale(code) {
388:   const metadata = getLocale(code);
389:   const existing = loadedLocales.get(metadata.code);
390:   if (existing) return existing;
391: 
392:   const loading = (async () => {
393:     const resource = await loadLocaleSource(metadata.code);
394:     if (metadata.support === "complete") return wrapCompleteLocaleSource(resource);
395:     const english = await loadLocaleSource(DEFAULT_LOCALE);
396:     return materializeLocaleResources(resource, metadata, english);
397:   })();
398:   loadedLocales.set(metadata.code, loading);
399:   try {
400:     return await loading;
401:   } catch (error) {
402:     if (loadedLocales.get(metadata.code) === loading) loadedLocales.delete(metadata.code);
403:     throw error;
404:   }
405: }

===== docs/about/about.js — USER-VISIBLE ARTICLE LOCALIZATION/FALLBACK TOUCHPOINTS =====
6: } from "../i18n/registry.js?v=20-about-i18n";
7: import {
8:   applyDocumentLocale,
9:   persistLanguage,
10:   populateLanguageSelector,
…
13: } from "../i18n/runtime.js?v=20-about-i18n";
14: import {
15:   ARTICLE_FALLBACK_LOCALE,
16:   resolveArticleLocale,
17: } from "./content/registry.js?v=5-about-i18n-polish";
…
21: );
22: 
23: let activeLocale = await loadLocale(resolveBrowserLocale().locale.code);
24: let activeArticleCode = null;
25: 
…
35: 
36: function applyActiveLocale() {
37:   applyDocumentLocale(activeLocale);
38:   populateLanguageSelector(elements["language-selector"], activeLocale.code);
39:   syncCalendarLinks();
…
49: function renderArticle(articleLocale, html) {
50:   elements["article-content"].innerHTML = html;
51:   elements["article-content"].lang = articleLocale.lang;
52:   elements["article-content"].dir = articleLocale.dir;
53:   activeArticleCode = articleLocale.code;
54:   updateLanguageNotice(articleLocale.code);
…
66:   }
67: 
68:   elements["article-content"].setAttribute("aria-busy", "true");
69:   elements["about-load-error"].hidden = true;
70: 
…
75:       html = await fetchArticle(articleLocale);
76:     } catch (selectedError) {
77:       if (articleLocale.code === ARTICLE_FALLBACK_LOCALE) throw selectedError;
78:       console.warn(`Falling back from article locale ${articleLocale.code} to ${ARTICLE_FALLBACK_LOCALE}.`, selectedError);
79:       articleLocale = resolveArticleLocale(ARTICLE_FALLBACK_LOCALE);
80:       html = await fetchArticle(articleLocale);
81:     }
…
87:     elements["about-language-notice"].hidden = true;
88:     elements["about-load-error"].hidden = false;
89:     elements["about-load-error"].textContent = t("about.loadError");
90:     elements["about-toc-list"].replaceChildren();
91:   } finally {
92:     elements["article-content"].setAttribute("aria-busy", "false");
93:   }
94: }
…
118:     const link = document.createElement("a");
119:     link.href = `#${section.id}`;
120:     link.textContent = heading.textContent.trim();
121:     if (elements["article-content"].contains(section)) {
122:       link.lang = elements["article-content"].lang;
123:       link.dir = elements["article-content"].dir;
124:     }
125:     item.append(link);
…
146: 
147: async function chooseLanguage(code) {
148:   const locale = await loadLocale(code);
149:   persistLanguage(locale.code);
150:   const url = urlWithLanguage(location.href, locale.code);
…
177:     return;
178:   }
179:   loadLocale(resolved.locale.code)
180:     .then(async (locale) => {
181:       activeLocale = locale;

===== docs/app.js — HARD-CODED DISPLAY + LOCALE-LOAD TOUCHPOINTS =====
29: import {
30:   applyDocumentLocale,
31:   persistLanguage,
…
45: let requestId = 0;
46: let activeLocale = await loadLocale(resolveBrowserLocale().locale.code);
47: let numberFormatter = null;
48: let dateFormatter = null;
49: let lastVisibleErrorKey = null;
50: let viewLoadSequence = 0;
…
362:   });
363:   elements["calendar-grid"].setAttribute("aria-label", t("calendar.daysAria", { cutletName: viewCutletName }));
364:   const targetIsInView = state.targetJdn >= view.startJdn && state.targetJdn <= view.endJdn;
…
376:     card.dataset.target = String(isTarget);
377:     card.setAttribute("aria-label", dateAria(day));
378:     card.style.setProperty("--month-bg", colors.background);
…
401:   elements["next-cutlet"].disabled = false;
402:   lastVisibleErrorKey = null;
403: 
…
566:   cell.className = "comparison-date-cell";
567:   cell.setAttribute("aria-label", dateAria(day));
568:   cell.append(...makeDateLines(day, "comparison-date-line"));
…
688:   const key = error?.translationKey || "error.engineFailed";
689:   lastVisibleErrorKey = key;
690:   elements["loading-panel"].hidden = true;
…
882:   rebuildFormatters();
883:   applyDocumentLocale(activeLocale);
884:   populateLanguageSelector(elements["language-selector"], activeLocale.code);
…
897:   }
898:   if (lastVisibleErrorKey && !elements["error-panel"].hidden) {
899:     elements["error-message"].textContent = t(lastVisibleErrorKey);
900:   }
…
906:   if (resolved.locale.code === activeLocale.code) return;
907:   activeLocale = await loadLocale(resolved.locale.code);
908:   applyActiveLocale({ rerender });
…
912:   const metadata = getLocale(code);
913:   const locale = metadata.code === activeLocale.code ? activeLocale : await loadLocale(metadata.code);
914:   persistLanguage(metadata.code);

===== docs/reverse-ui.js — HARD-CODED DISPLAY TOUCHPOINTS =====
941:     this.status.textContent = this.rt("reverse.status.running");
942:     this.progress.textContent = "";
943:     this.setRunning(true);
…
1051:     this.renderVisibleErrorMessage();
1052:     this.status.textContent = "";
1053:   }
…
1081:     this.output.hidden = true;
1082:     this.status.textContent = "";
1083:     this.progress.textContent = "";
1084:     this.error.hidden = true;
===== ATTEMPT 1 RAW JSON =====
{
  "result": "FINDINGS",
  "summary": "הבדיקה של קבצי הלוגיקה של הלוגיקה של הלוגיקה של הלוגיקה של הלוגיקה של הלוגיקה של הלוגיקה של הלוגיקה של הלוגיקה של הלוגיקה של הלוגיקה של הלוגיקה של הלוגיקה של הלוגיקה של הלוגיקה של הלוגיקה של הלוגיקה של הלוגיקה של הלוגיקה של הלוגיקה של הלוגיקה של הלוגיקה של הלוגיקה של הלוגיקה שלהל",
  "findings": [
    {
      "severity": "low",
      "location": "docs/i18n/runtime.js",
      "current_text": "option.textContent = locale.displayName;",
      "issue": "הטקסט 'locale.displayName' מופיע בקוד, אך לא ניתן לצטט טקסט אמיתי מתוך קובץ האתר. אין צורך בבדיקה של טקסט נוכחי.",
      "correction": "אין צורך ב תיקון."
    },
    {
      "severity": "low",
      "location": "docs/i18n/registry.js",
      "current_text": "export const DEFAULT_LOCALE = \"en\";",
      "issue": "הערך 'en' הוא הערך ברירת המחדל, אך לא קיים טקסט נוכחי בכתובת האתר. אין צורך בבדיקה של טקסט נוכחי.",
      "correction": "אין צורך ב תיקון."
    },
    {
      "severity": "low",
      "location": "docs/i18n/registry.js",
      "current_text": "export const SUPPORT_LEVELS = Object.freeze([\"complete\", \"partial\", \"experimental\"]);",
      "issue": "הערך 'SUPPORT_LEVELS' הוא מערך של תומכות, אך לא קיים טקסט נוכחי בכתובת האתר. אין צורך בבדיקה של טקסט נוכחי.",
      "correction": "אין צורך ב תיקון."
    },
    {
      "severity": "low",
      "location": "docs/i18n/registry.js",
      "current_text": "export const LOCALES = Object.freeze([defineLocale(\"he\", \"עברית\", \"rtl\", \"he-IL\", \"complete\", () => import(\"./locales/he.js?v=19-about-i18n\")), defineLocale(\"en\", \"English\", \"ltr\",",
      "issue": "הערך 'he' מופיע בקוד, אך לא ניתן לצטט טקסט אמיתי מתוך קובץ האתר. אין צורך בבדיקה של טקסט נוכחי.",
      "correction": "אין צורך ב תיקון."
    }
  ]
}
===== ATTEMPT 1 VALIDATION =====
INVALID: subreview current_text is not present in reviewed source

===== ATTEMPT 2 RAW JSON =====
{
  "result": "FINDINGS",
  "summary": "הבדיקה של קבצי הלוגיקה והניהול של הלשון העברית בפרויקט הfstri Calendar הפגנת כמה בעיות משמעותיות. הבעיות כוללות טקסטים בשפה הלא נכונה, טרגומים לא מדויקים, ובעיות עם תצוגה וניהול מודעות. כל הבעיות מפורטות בהמשך.",
  "findings": [
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
    }
  ]
}
===== ATTEMPT 2 VALIDATION =====
VALID: deduplicated_exact_findings=0

===== NORMALIZED_REVIEW =====
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
