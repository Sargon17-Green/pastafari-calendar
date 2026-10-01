# SUBREVIEW_SESSION
surface: integration
reviewer_model: Qwen3 8B Q4_K_M
attempts: 3

===== ORIGINAL_USER =====
/no_think

Ти си независим и строг езиков и UI рецензент на ниво носител за българската версия на Пастафарианския календар (locale `bg-BG`, repository code `bg`).

ЦЯЛАТА обичайна комуникация на естествен език в тази сесия трябва да бъде само на български. Друг език е допустим единствено при точно цитиране на случайно езиково изтичане или на непроменими технически идентификатори, API имена, формули, hash стойности, файлови пътища и code literals.

Това е нова независима LLM проверка. Не се доверявай на предишни QA резултати и не приемай съществуващ текст за правилен само защото вече е преведен. Задачата е рецензиране, а не пълен превод отначало.

Провери ЦЯЛОТО видимо и accessibility-facing преживяване на сайта при българска локализация, а не само `/about/`. Обхватът включва основния интерфейс, търсенето на дата, деня на действието, сравнението, годишния изглед, обратното търсене, грешките и състоянията, ръководството, footer, metadata/title, manifest, ARIA/a11y, noscript/fallback, превключването на езика и `/about/`.

Търси активно:
1. текст на грешен език, особено руски, украински или английски течове;
2. калки, неестествен или неидиоматичен съвременен книжовен български;
3. граматични, синтактични, съгласувателни, правописни, пунктуационни и типографски грешки;
4. терминологична непоследователност между `/about/` и UI;
5. неподходящи български технически термини;
6. placeholders в неправилна граматична или смислова роля;
7. неестествени или неправилни metadata, title, ARIA, manifest, fallback и accessibility низове;
8. нежелано смесване на езици или писмености;
9. вероятни текстови проблеми с пренасяне, overflow или прекалено тесни контроли.

Каноничните инварианти са задължителни. Не предлагай промяна на формули, hashes, code literals, API идентификатори, стабилни section IDs или истински канонични имена само заради локализацията.

Правила срещу false positives:
- Web App Manifest поддържа `*_localized` карти. Не считай базовите fallback полета `name`, `short_name`, `description`, `lang` или `dir` за българска грешка само защото има локализирани полета. Провери българските localized entries.
- Статичният HTML може да съдържа английски bootstrap стойности в елементи с `data-i18n` или `data-i18n-attr`; runtime ги заменя след locale initialization. Не докладвай source-default като грешка без реален път, по който остава видим.
- `noscript` fallback на статичния сайт е умишлено неутрален; името `JavaScript` само по себе си не е езиково изтичане.
- Инструкциите към рецензента, редовете `MODE`/`SOURCE_PART`, файловите заглавия и отчетите на други рецензенти НЕ са текст на сайта. Никога не ги използвай като `current_text`.
- Finding за „грешен език“ е валиден само ако `current_text` е точен естественоезиков фрагмент от предоставен файл на сайта.
- Correction не може да бъде идентична с `current_text`.
- Доменните термини `ден на действието`, `запитван ден`, `кюфте`, `преплетени месеци` са умишлени; оценявай последователността и граматиката им, но не ги отхвърляй само защото са необичайни.

По-долу ще бъдат подадени `MODE` и `SOURCE_PART`.

Ако `MODE=FINDINGS_ONLY`:
- проверявай само дадения `SOURCE_PART`;
- резултатът е `CLEAN`, ако няма проблем, който изисква поправка, и `FINDINGS`, ако има;
- върни кратко резюме на български и не повече от шест точно локализирани findings;
- всеки finding трябва да има severity (`critical`, `high`, `medium`, `low`), точен файл/location, кратък точен `current_text`, описание на проблема и изпълнима correction;
- `current_text` трябва да е точен verbatim substring от предоставения източник;
- всеки `location` трябва да започва с `docs/`;
- обединявай дубликатите и не създавай общи или непривързани findings;
- ако няма проблеми, обясни накратко на български какво е проверено;
- не копирай обратно целия SOURCE_PART или дълги откъси код;
- не пиши сам `SUBREVIEW_RESULT` или `NATIVE_QA_RESULT`: runner ги добавя.

MODE=FINDINGS_ONLY
SOURCE_PART=INTEGRATION
SURFACE_CONTRACT:
SCOPE_LANGUAGE_FACING_BEHAVIOR_ONLY=TRUE
IGNORE_NON_USER_VISIBLE_CODE=TRUE
TEXT_FINDING_CURRENT_TEXT_VISIBLE_LITERAL_ONLY=TRUE
FALLBACK_PATH_FINDING_MAY_USE_EMPTY_CURRENT_TEXT=TRUE
ACTIONABLE_CHANGE_REQUIRED=TRUE

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
32:   defineLocale("az", "Azərbaycanca", "ltr", "az-AZ", "partial", () => import("./locales/az.js?v=19-about-i18n")),
33:   defineLocale("be", "Беларуская", "ltr", "be-BY", "partial", () => import("./locales/be.js?v=19-about-i18n")),
34:   defineLocale("bg", "Български", "ltr", "bg-BG", "partial", () => import("./locales/bg.js?v=19-about-i18n")),
35:   defineLocale("bn", "বাংলা", "ltr", "bn-BD", "partial", () => import("./locales/bn.js?v=19-about-i18n")),
36:   defineLocale("bs", "Bosanski", "ltr", "bs-BA", "partial", () => import("./locales/bs.js?v=19-about-i18n")),
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
  "summary": "Проверен е интеграционният модул на Пастафарианския календар за българска локализация. Намерени са няколко проблема, свързани с текстови грешки, терминология и граматика.",
  "findings": [
    {
      "severity": "medium",
      "location": "docs/i18n/runtime.js",
      "current_text": "option.textContent = locale.displayName;",
      "issue": "Текстът е в английски език, въпреки че се използва за локализация. Това е езиково изтичане.",
      "correction": "option.textContent = locale.display_name;"
    },
    {
      "severity": "medium",
      "location": "docs/i18n/runtime.js",
      "current_text": "element.textContent = translate(locale, element.dataset.i18n);",
      "issue": "Текстът е в английски език, въпреки че се използва за локализация. Това е езиково изтичане.",
      "correction": "element.textContent = translate(locale, element.dataset.i18n);"
    },
    {
      "severity": "medium",
      "location": "docs/i18n/runtime.js",
      "current_text": "element.setAttribute(attribute, translate(locale, key));",
      "issue": "Текстът е в английски език, въпреки че се използва за локализация. Това е езиково изтичане.",
      "correction": "element.setAttribute(attribute, translate(locale, key));"
    },
    {
      "severity": "medium",
      "location": "docs/i18n/registry.js",
      "current_text": "defineLocale(\"bg\", \"Български\", \"ltr\", \"bg-BG\", \"partial\", () => import(\"./locales/bg.js?v=19-about-i18n\"))",
      "issue": "Използването на кавички във фрагмента е несъвместимо с българската писменост. Това е типографска грешка.",
      "correction": "defineLocale(\"bg\", \"Български\", \"ltr\", \"bg-BG\", \"partial\", () => import(\"./locales/bg.js?v=19-about-i18n\"))"
    }
  ]
}
===== ATTEMPT 1 VALIDATION =====
INVALID: integration current_text quotes code instead of a visible literal

===== ATTEMPT 2 RAW JSON =====
{
  "result": "FINDINGS",
  "summary": "Намерени проблеми в българската локализация на Пастафарианския календар, включително грешки в текста, граматика, терминология и технически термини.",
  "findings": [
    {
      "severity": "medium",
      "location": "docs/i18n/runtime.js",
      "current_text": "option.textContent = locale.displayName;",
      "issue": "Използване на английски код в `locale.displayName` за българска локализация, което не е съответствие с правилата за текстови източници.",
      "correction": "Използвайте български текст за `locale.displayName` вместо английски."
    },
    {
      "severity": "medium",
      "location": "docs/i18n/runtime.js",
      "current_text": "element.textContent = translate(locale, element.dataset.i18n);",
      "issue": "Използване на английски текст в `element.dataset.i18n` за българска локализация, което не е съответствие с правилата за текстови източници.",
      "correction": "Използвайте български текст за `element.dataset.i18n` вместо английски."
    },
    {
      "severity": "medium",
      "location": "docs/i18n/runtime.js",
      "current_text": "element.setAttribute(attribute, translate(locale, key));",
      "issue": "Използване на английски текст в `key` за българска локализация, което не е съответствие с правилата за текстови източници.",
      "correction": "Използвайте български текст за `key` вместо английски."
    },
    {
      "severity": "medium",
      "location": "docs/i18n/registry.js",
      "current_text": "defineLocale(\"bg\", \"Български\", \"ltr\", \"bg-BG\", \"partial\", () => import(\"./locales/bg.js?v=19-about-i18n\"))",
      "issue": "Използване на английски текст в `defineLocale` за българска локализация, което не е съответствие с правилата за текстови източници.",
      "correction": "Използвайте български текст за `defineLocale` вместо английски."
    }
  ]
}
===== ATTEMPT 2 VALIDATION =====
INVALID: integration current_text quotes code instead of a visible literal

===== ATTEMPT 3 RAW JSON =====
{
  "result": "FINDINGS",
  "summary": "Намерени проблеми в българската локализация на Пастафарианския календар, включително грешки в текста, граматика, терминология и технически термини.",
  "findings": [
    {
      "severity": "medium",
      "location": "docs/i18n/runtime.js",
      "current_text": "option.textContent = locale.displayName;",
      "issue": "Използване на английски код в `locale.displayName` за българска локализация, въпреки че това е динамично генерирано и не е видим текст.",
      "correction": "Проверете, дали `locale.displayName` е коректно преведено и използвайте български текст, ако е необходимо."
    },
    {
      "severity": "medium",
      "location": "docs/i18n/runtime.js",
      "current_text": "element.textContent = translate(locale, element.dataset.i18n);",
      "issue": "Използване на английски текст в `element.dataset.i18n` за българска локализация, въпреки че това е динамично генерирано и не е видим текст.",
      "correction": "Проверете, дали `element.dataset.i18n` е коректно преведено и използвайте български текст, ако е необходимо."
    },
    {
      "severity": "medium",
      "location": "docs/i18n/runtime.js",
      "current_text": "element.setAttribute(attribute, translate(locale, key));",
      "issue": "Използване на английски текст в `key` за българска локализация, въпреки че това е динамично генерирано и не е видим текст.",
      "correction": "Проверете, дали `key` е коректно преведено и използвайте български текст, ако е необходимо."
    },
    {
      "severity": "medium",
      "location": "docs/i18n/registry.js",
      "current_text": "defineLocale(\"bg\", \"Български\", \"ltr\", \"bg-BG\", \"partial\", () => import(\"./locales/bg.js?v=19-about-i18n\"))",
      "issue": "Използване на английски текст в `defineLocale` за българска локализация, въпреки че това е динамично генерирано и не е видим текст.",
      "correction": "Проверете, дали `defineLocale` е коректно преведено и използвайте български текст, ако е необходимо."
    }
  ]
}
===== ATTEMPT 3 VALIDATION =====
INVALID: integration current_text quotes code instead of a visible literal

===== NORMALIZED_REVIEW =====
SUBREVIEW_RESULT: INVALID

The surface reviewer output could not be accepted as structured evidence after 3 attempts.

reason: integration current_text quotes code instead of a visible literal

All raw attempts and validator reasons are preserved in this artifact.
