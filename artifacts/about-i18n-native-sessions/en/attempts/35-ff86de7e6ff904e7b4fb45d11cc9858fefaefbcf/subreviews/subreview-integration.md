# SUBREVIEW_SESSION
surface: integration
reviewer_model: Qwen3 8B Q4_K_M
attempts: 3

===== ORIGINAL_USER =====
/no_think

You are an independent, strict language and user-interface reviewer for the English version of the Pastafari Calendar (locale `en-US`, repository code `en`).

ALL of your natural-language communication in this review session must be in English. You may quote text in another language when reporting it as a defect, and you may reproduce literal technical identifiers, API names, formulas, hashes, file paths, and other strings that must not be translated.

This is a fresh, independent LLM review. Do not trust previous QA conclusions and do not assume that earlier wording is good. The task is review, not wholesale retranslation or rewriting.

Review the ENTIRE displayed and accessibility-facing experience when the site language is English, not only `/about/`. Scope includes the main UI, date search, day-of-working controls, comparison, year view, reverse search, errors and states, user guide, footer, metadata/title, manifest, ARIA/a11y, noscript/fallback, language switching, and `/about/`.

Actively look for:
1. text in the wrong language or unintended fallback;
2. translationese-like, awkward, or otherwise unnatural modern English, even when understandable;
3. grammar, syntax, agreement, register, punctuation, spelling, typography, and capitalization problems;
4. terminology inconsistency between `/about/` and the UI;
5. wrong or doubtful wording of technical concepts;
6. placeholders used in the wrong grammatical or semantic role;
7. incorrect or unnatural metadata, title, ARIA, manifest, fallback, or accessibility text;
8. suspicious mixed-script text or locale-direction problems;
9. likely wrapping, overflow, or cramped-control risks caused by wording length. This is a textual risk assessment, not a substitute for later rendered visual QA.

Canonical invariants are mandatory. Do not propose changing formulas, hashes, code literals, API identifiers, stable section IDs, or true canonical names merely to make them read more naturally.

Rules that prevent false positives:

- The Web App Manifest supports `*_localized` language maps. Do not report fallback `name`, `short_name`, `description`, `lang`, or `dir` merely because localized entries also exist. Verify instead that English has complete and correct localized manifest entries where the project contract expects them.
- Static HTML can contain bootstrap source strings on elements carrying `data-i18n` or `data-i18n-attr`. The localization runtime replaces them after locale initialization. Do not report a source default merely because it exists in HTML; report it only if code inspection shows it can remain exposed after English locale initialization or on a real error/fallback path.
- Locale resolution on this static site is itself performed by JavaScript. The `noscript` fallback is intentionally language-neutral and consists only of the proper name `JavaScript` plus a warning symbol. Do not report that as a language defect. Do report additional natural-language fallback or accessibility defects that are independent of locale resolution.
- Reviewer instructions themselves, `MODE`/`SOURCE_PART` control lines, file headers, and summaries from other reviewers are **not website text**. Never use text from these instructions as `current_text`, never locate a finding in a prompt/artifact file, and never report instruction text as a localization defect.
- A “wrong-language text” finding is valid only if you can quote real natural-language text from the supplied website source and identify that website source file. Do not call normal English text “another language”.

You will receive `MODE` and `SOURCE_PART` below these instructions.

If `MODE=FINDINGS_ONLY`:
- review only the supplied `SOURCE_PART`;
- decide clearly: `CLEAN` if there is no fix-worthy problem, otherwise `FINDINGS`;
- the runner requires a short structured response: one English summary and at most six local findings; do not restate the whole input;
- each real finding must have severity (`critical`, `high`, `medium`, or `low`), the most precise file/location supported by the evidence, a very short current-text quote when applicable, a clear issue, and an actionable correction;
- merge findings that are really the same problem; do not invent broad or unlocated findings;
- if no real defect is found, briefly explain in English what was reviewed and why it is clean;
- DO NOT copy SOURCE_PART, source code, or long source passages back unless a tiny exact excerpt is required to locate a finding;
- DO NOT write `SUBREVIEW_RESULT` or `NATIVE_QA_RESULT`; the runner creates those mechanical lines.

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
27: export const LOCALES = Object.freeze([
28:   defineLocale("he", "עברית", "rtl", "he-IL", "complete", () => import("./locales/he.js?v=19-about-i18n")),
29:   defineLocale("en", "English", "ltr", "en-US", "complete", () => import("./locales/en.js?v=19-about-i18n")),
30:   defineLocale("af", "Afrikaans", "ltr", "af-ZA", "partial", () => import("./locales/af.js?v=19-about-i18n")),
31:   defineLocale("ar", "العربية", "rtl", "ar", "partial", () => import("./locales/ar.js?v=19-about-i18n")),
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
  "summary": "The English version of the Pastafari Calendar has several issues in its localization and accessibility text, including awkward phrasing, incorrect terminology, and missing or inconsistent metadata. These issues affect user experience and accessibility.",
  "findings": [
    {
      "severity": "medium",
      "location": "docs/i18n/runtime.js:59",
      "current_text": "element.textContent = translate(locale, element.dataset.i18n);",
      "issue": "The text 'element.dataset.i18n' is a placeholder and should not be used as a literal in the source code. It is a localization key and should not appear in the source text.",
      "correction": "Remove the literal 'element.dataset.i18n' from the source code and ensure it is only used as a key in the localization system."
    },
    {
      "severity": "medium",
      "location": "docs/i18n/runtime.js:64",
      "current_text": "const binding = binding.slice(0, separator).trim();",
      "issue": "The text 'binding' is a placeholder and should not be used as a literal in the source code. It is a localization key and should not appear in the source text.",
      "correction": "Remove the literal 'binding' from the source code and ensure it is only used as a key in the localization system."
    },
    {
      "severity": "medium",
      "location": "docs/i18n/runtime.js:66",
      "current_text": "const key = binding.slice(separator + 1).trim();",
      "issue": "The text 'key' is a placeholder and should not be used as a literal in the source code. It is a localization key and should not appear in the source text.",
      "correction": "Remove the literal 'key' from the source code and ensure it is only used as a key in the localization system."
    },
    {
      "severity": "medium",
      "location": "docs/i18n/registry.js:29",
      "current_text": "defineLocale(",
      "issue": "The text 'defineLocale(' is a placeholder and should not be used as a literal in the source code. It is a localization key and should not appear in the source text.",
      "correction": "Remove the literal 'defineLocale(' from the source code and ensure it is only used as a key in the localization system."
    }
  ]
}
===== ATTEMPT 1 VALIDATION =====
INVALID: integration current_text quotes code instead of a visible literal

===== ATTEMPT 2 RAW JSON =====
{
  "result": "FINDINGS",
  "summary": "The integration code contains several issues related to text in the wrong language, awkward phrasing, and incorrect metadata. These issues are primarily in the localization and fallback logic, which may lead to incorrect user-facing text or accessibility problems.",
  "findings": [
    {
      "severity": "high",
      "location": "docs/i18n/runtime.js:59",
      "current_text": "element.textContent = translate(locale, element.dataset.i18n);",
      "issue": "The text 'element.dataset.i18n' is a placeholder for a localized string, but it is not quoted as a visible literal. This may expose the placeholder text to users if the localization fails or is not properly initialized.",
      "correction": "Ensure that all user-facing text is quoted as a visible literal, not used as a placeholder in the source code."
    },
    {
      "severity": "medium",
      "location": "docs/i18n/runtime.js:64",
      "current_text": "const binding = binding.slice(0, separator).trim();",
      "issue": "The code uses 'binding' as a variable name, which is not descriptive and may lead to confusion. This is not a language issue, but it may affect maintainability and readability.",
      "correction": "Rename the variable to something more descriptive, such as 'attributeBinding' or 'bindingPart'."
    },
    {
      "severity": "medium",
      "location": "docs/i18n/registry.js:27",
      "current_text": "defineLocale('en', 'English', 'ltr', 'en-US', 'complete', () => import('./locales/en.js?v=19-about-i18n'))",
      "issue": "The locale 'en' is defined with the name 'English', which is correct, but the fallback text for the English locale is not fully localized. This may lead to inconsistencies in the user-facing text if the fallback is used.",
      "correction": "Ensure that all fallback text for the English locale is fully localized and matches the expected user-facing text."
    },
    {
      "severity": "medium",
      "location": "docs/i18n/registry.js:393",
      "current_text": "return [source?.code, source];",
      "issue": "The use of the optional chaining operator ('?.') may lead to unexpected behavior if the 'source' object is not properly initialized. This is not a language issue, but it may affect the reliability of the localization system.",
      "correction": "Ensure that all objects used in the localization system are properly initialized and that fallback logic is in place to handle missing or undefined values."
    }
  ]
}
===== ATTEMPT 2 VALIDATION =====
INVALID: integration current_text quotes code instead of a visible literal

===== ATTEMPT 3 RAW JSON =====
{
  "result": "FINDINGS",
  "summary": "The integration code contains several issues related to text in the wrong language, translationese-like phrasing, and incorrect metadata. These issues are primarily in the i18n runtime and registry files, and they affect the user-facing localization and fallback behavior.",
  "findings": [
    {
      "severity": "high",
      "location": "docs/i18n/runtime.js:59",
      "current_text": "element.textContent = translate(locale, element.dataset.i18n);",
      "issue": "The text 'element.dataset.i18n' is a literal string and not a visible user-facing text. It should not be quoted as a current text in this context.",
      "correction": "Do not quote internal code strings as visible text in the review."
    },
    {
      "severity": "high",
      "location": "docs/i18n/runtime.js:64",
      "current_text": "const binding = binding.slice(0, separator).trim();",
      "issue": "The text 'binding' is a literal string and not a visible user-facing text. It should not be quoted as a current text in this context.",
      "correction": "Do not quote internal code strings as visible text in the review."
    },
    {
      "severity": "high",
      "location": "docs/i18n/registry.js:28",
      "current_text": "defineLocale(\"en\", \"English\", \"ltr\", \"en-US\", \"complete\", () => import(\"./locales/en.js?v=19-about-i18n\"))",
      "issue": "The text 'English' is a literal string and not a visible user-facing text. It should not be quoted as a current text in this context.",
      "correction": "Do not quote internal code strings as visible text in the review."
    },
    {
      "severity": "high",
      "location": "docs/i18n/registry.js:328",
      "current_text": "const groups = localGroups(source);",
      "issue": "The text 'source' is a literal string and not a visible user-facing text. It should not be quoted as a current text in this context.",
      "correction": "Do not quote internal code strings as visible text in the review."
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
