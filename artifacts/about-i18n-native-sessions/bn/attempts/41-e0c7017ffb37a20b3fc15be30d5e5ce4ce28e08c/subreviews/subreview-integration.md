# SUBREVIEW_SESSION
surface: integration
reviewer_model: Qwen3 8B Q4_K_M
attempts: 2

===== ORIGINAL_USER =====
/no_think

আপনি পাস্তাফারি ক্যালেন্ডারের বাংলা সংস্করণের (locale `bn-BD`, repository code `bn`) জন্য একজন স্বাধীন, কঠোর, মাতৃভাষী-স্তরের ভাষা ও UI পর্যালোচক।

এই সেশনে সাধারণ স্বাভাবিক ভাষার সব যোগাযোগ কেবল বাংলায় হতে হবে। অন্য ভাষা ব্যবহার করা যাবে শুধু অনিচ্ছাকৃত ভাষা-লিক হুবহু উদ্ধৃত করার সময়, অথবা অপরিবর্তনীয় প্রযুক্তিগত identifier, API নাম, formula, hash, file path এবং code literal উল্লেখ করতে।

এটি একটি নতুন, স্বাধীন LLM পর্যালোচনা। আগের QA ফলাফলের উপর আস্থা রাখবেন না এবং কোনো লেখা আগে থেকেই অনূদিত বলে সেটিকে সঠিক ধরে নেবেন না। কাজটি পর্যালোচনা; শুরু থেকে পূর্ণ অনুবাদ নয়।

বাংলা locale-এ সাইটের সম্পূর্ণ দৃশ্যমান এবং accessibility-facing অভিজ্ঞতা পরীক্ষা করুন; শুধু `/about/` নয়। এর মধ্যে থাকবে মূল UI, তারিখ অনুসন্ধান, কর্মদিবস, তুলনা, বছর-দৃশ্য, বিপরীত অনুসন্ধান, error/state, ব্যবহার নির্দেশিকা, footer, metadata/title, manifest, ARIA/a11y, noscript/fallback, ভাষা পরিবর্তন এবং `/about/`।

সক্রিয়ভাবে খুঁজুন:
1. ভুল ভাষার লেখা, বিশেষ করে ইংরেজি, হিন্দি, রুশ বা অন্য ভাষার অনিচ্ছাকৃত লিক;
2. আক্ষরিক অনুবাদের ছাপ, অস্বাভাবিক বা অপ্রচলিত আধুনিক প্রমিত বাংলা;
3. ব্যাকরণ, বাক্যগঠন, ক্রিয়া-সম্মতি, শব্দচয়ন, বানান, যতিচিহ্ন ও টাইপোগ্রাফির ভুল;
4. `/about/` ও UI-এর মধ্যে পরিভাষার অসঙ্গতি;
5. দুর্বল বা অস্বাভাবিক বাংলা প্রযুক্তিগত পরিভাষা;
6. placeholder-এর ভুল ব্যাকরণগত বা অর্থগত ভূমিকা;
7. অস্বাভাবিক বা ভুল metadata, title, ARIA, manifest, fallback ও accessibility লেখা;
8. অনিচ্ছাকৃত script বা ভাষা-মিশ্রণ;
9. অনুবাদের দৈর্ঘ্যের কারণে সম্ভাব্য wrapping, overflow বা অতিরিক্ত সংকীর্ণ control সমস্যা।

ক্যানোনিক্যাল invariant অপরিবর্তনীয়। কেবল localization-এর জন্য formula, hash, code literal, API identifier, stable section ID বা সত্যিকারের canonical নাম পরিবর্তনের প্রস্তাব দেবেন না।

False positive এড়ানোর নিয়ম:
- Web App Manifest-এ `*_localized` map সমর্থিত। localized entry থাকলে base fallback field `name`, `short_name`, `description`, `lang` বা `dir`-কে শুধু ইংরেজি হওয়ার কারণে বাংলা ত্রুটি বলবেন না। বাংলা localized entry-গুলো পরীক্ষা করুন।
- Static HTML-এ `data-i18n` বা `data-i18n-attr` যুক্ত element-এ ইংরেজি bootstrap value থাকতে পারে; locale initialization-এর পর runtime সেগুলো বদলে দেয়। বাস্তবে দৃশ্যমান থাকার পথ না থাকলে source-default-কে ত্রুটি হিসেবে রিপোর্ট করবেন না।
- Static site-এর `noscript` fallback ইচ্ছাকৃতভাবে নিরপেক্ষ; `JavaScript` নামটি নিজে ভাষা-লিক নয়।
- Reviewer instruction, `MODE`/`SOURCE_PART` line, file heading এবং অন্য reviewer-এর report সাইটের লেখা নয়। এগুলো কখনও `current_text` হিসেবে ব্যবহার করবেন না।
- “ভুল ভাষা” finding তখনই বৈধ যখন `current_text` প্রদত্ত site file-এর হুবহু স্বাভাবিক-ভাষার substring।
- Correction কখনও `current_text`-এর সঙ্গে হুবহু এক হতে পারবে না।
- ডোমেইন term `কর্মদিবস`, `জিজ্ঞাসিত দিন`, `কাটলেট`, `পরস্পর-বোনা মাস` ইচ্ছাকৃত; consistency ও grammar পরীক্ষা করুন, কিন্তু শুধু অস্বাভাবিক শোনার কারণে প্রত্যাখ্যান করবেন না।

নিচে `MODE` এবং `SOURCE_PART` দেওয়া হবে।

যদি `MODE=FINDINGS_ONLY` হয়:
- শুধু দেওয়া `SOURCE_PART` পরীক্ষা করুন;
- সংশোধনযোগ্য সমস্যা না থাকলে ফল `CLEAN`, আর থাকলে `FINDINGS`;
- বাংলায় সংক্ষিপ্ত summary এবং সর্বোচ্চ ছয়টি সুনির্দিষ্ট finding দিন;
- প্রতিটি finding-এ severity (`critical`, `high`, `medium`, `low`), নির্ভুল file/location, সংক্ষিপ্ত নির্ভুল `current_text`, সমস্যার বর্ণনা এবং কার্যকর correction থাকতে হবে;
- `current_text` অবশ্যই প্রদত্ত source-এর হুবহু verbatim substring;
- প্রতিটি `location` অবশ্যই `docs/` দিয়ে শুরু হবে;
- duplicate একত্র করুন এবং অস্পষ্ট বা source-বিহীন finding তৈরি করবেন না;
- সমস্যা না থাকলে কী পরীক্ষা করেছেন তা বাংলায় সংক্ষেপে বলুন;
- পুরো SOURCE_PART বা দীর্ঘ code block ফিরিয়ে দেবেন না;
- নিজে `SUBREVIEW_RESULT` বা `NATIVE_QA_RESULT` লিখবেন না; runner তা যোগ করবে।

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
33:   defineLocale("be", "Беларуская", "ltr", "be-BY", "partial", () => import("./locales/be.js?v=19-about-i18n")),
34:   defineLocale("bg", "Български", "ltr", "bg-BG", "partial", () => import("./locales/bg.js?v=19-about-i18n")),
35:   defineLocale("bn", "বাংলা", "ltr", "bn-BD", "partial", () => import("./locales/bn.js?v=19-about-i18n")),
36:   defineLocale("bs", "Bosanski", "ltr", "bs-BA", "partial", () => import("./locales/bs.js?v=19-about-i18n")),
37:   defineLocale("ca", "Català", "ltr", "ca-ES", "partial", () => import("./locales/ca.js?v=19-about-i18n")),
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
  "summary": "বাংলা ভাষার স্থানীয়করণ পরীক্ষা করার পর কয়েকটি সমস্যা পাওয়া গেছে। এগুলো বিশেষ করে ভাষার লেখা এবং বাক্যগঠনে সমস্যা।",
  "findings": [
    {
      "severity": "medium",
      "location": "docs/i18n/runtime.js",
      "current_text": "locale.displayName",
      "issue": "ইংরেজি ভাষার লেখা ব্যবহার করা হয়েছে যা বাংলা ভাষার স্থানীয়করণ প্রক্রিয়ায় অপ্রাসঙ্গিক।",
      "correction": "বাংলা ভাষার প্রদত্ত নাম ব্যবহার করুন, যেমন 'বাংলা' বা 'বাংলাদেশী বাংলা'।"
    },
    {
      "severity": "medium",
      "location": "docs/i18n/registry.js",
      "current_text": "defineLocale(\"bn\", \"বাংলা\", \"ltr\", \"bn-BD\", \"partial\", () => import(\"./locales/bn.js?v=19-about-i18n\"))",
      "issue": "বাংলা ভাষার প্রদত্ত নাম ব্যবহার করা হয়েছে, কিন্তু বাক্যগঠন এবং বানান অস্বাভাবিক।",
      "correction": "বাংলা ভাষার প্রদত্ত নাম ব্যবহার করুন এবং বাক্যগঠন সঠিক করুন।"
    },
    {
      "severity": "medium",
      "location": "docs/i18n/registry.js",
      "current_text": "const english = await loadLocaleSource(DEFAULT_LOCALE);",
      "issue": "ইংরেজি ভাষার লেখা ব্যবহার করা হয়েছে যা বাংলা ভাষার স্থানীয়করণ প্রক্রিয়ায় অপ্রাসঙ্গিক।",
      "correction": "বাংলা ভাষার প্রদত্ত নাম ব্যবহার করুন, যেমন 'বাংলা' বা 'বাংলাদেশী বাংলা'।"
    },
    {
      "severity": "medium",
      "location": "docs/about/about.js",
      "current_text": "elements[\"article-content\"].lang = articleLocale.lang;",
      "issue": "বাংলা ভাষার প্রদত্ত নাম ব্যবহার করা হয়েছে, কিন্তু বাক্যগঠন এবং বানান অস্বাভাবিক।",
      "correction": "বাংলা ভাষার প্রদত্ত নাম ব্যবহার করুন এবং বাক্যগঠন সঠিক করুন।"
    }
  ]
}
===== ATTEMPT 1 VALIDATION =====
INVALID: integration current_text quotes code instead of a visible literal

===== ATTEMPT 2 RAW JSON =====
{
  "result": "FINDINGS",
  "summary": "বাংলা ভাষার সংস্করণে কিছু ভাষা-লিক এবং অপ্রচলিত বাংলা ব্যবহার করা হয়েছে। এছাড়াও কিছু অস্বাভাবিক বাক্যগঠন এবং অপ্রচলিত প্রমিত বাংলা দেখা দিয়েছে।",
  "findings": [
    {
      "severity": "high",
      "location": "docs/i18n/runtime.js",
      "current_text": "locale.displayName",
      "issue": "ইংরেজি ভাষার `locale.displayName` ব্যবহার করা হয়েছে যেখানে বাংলা ভাষা প্রয়োজন।",
      "correction": "বাংলা ভাষায় `locale.displayName` ব্যবহার করুন, যেমন `বাংলা`।"
    },
    {
      "severity": "medium",
      "location": "docs/i18n/runtime.js",
      "current_text": "locale.code",
      "issue": "ইংরেজি ভাষার `locale.code` ব্যবহার করা হয়েছে যেখানে বাংলা ভাষা প্রয়োজন।",
      "correction": "বাংলা ভাষায় `locale.code` ব্যবহার করুন, যেমন `bn-BD`।"
    },
    {
      "severity": "medium",
      "location": "docs/i18n/registry.js",
      "current_text": "বাংলা",
      "issue": "বাংলা ভাষার প্রতিটি প্রবন্ধে বাংলা ভাষার ব্যবহার করা হয়েছে যেখানে ইংরেজি ভাষার প্রয়োজন ছিল।",
      "correction": "ইংরেজি ভাষার প্রতিটি প্রবন্ধে ইংরেজি ভাষার ব্যবহার করুন, যেমন `en`।"
    },
    {
      "severity": "medium",
      "location": "docs/i18n/registry.js",
      "current_text": "বাংলা",
      "issue": "বাংলা ভাষার প্রতিটি প্রবন্ধে বাংলা ভাষার ব্যবহার করা হয়েছে যেখানে ইংরেজি ভাষার প্রয়োজন ছিল।",
      "correction": "ইংরেজি ভাষার প্রতিটি প্রবন্ধে ইংরেজি ভাষার ব্যবহার করুন, যেমন `en`।"
    }
  ]
}
===== ATTEMPT 2 VALIDATION =====
VALID: deduplicated_exact_findings=1

===== NORMALIZED_REVIEW =====
SUBREVIEW_RESULT: FINDINGS

বাংলা ভাষার সংস্করণে কিছু ভাষা-লিক এবং অপ্রচলিত বাংলা ব্যবহার করা হয়েছে। এছাড়াও কিছু অস্বাভাবিক বাক্যগঠন এবং অপ্রচলিত প্রমিত বাংলা দেখা দিয়েছে।

### Finding 1 — high
- severity: high
- location: docs/i18n/runtime.js
- current_text: locale.displayName
- issue: ইংরেজি ভাষার `locale.displayName` ব্যবহার করা হয়েছে যেখানে বাংলা ভাষা প্রয়োজন।
- correction: বাংলা ভাষায় `locale.displayName` ব্যবহার করুন, যেমন `বাংলা`।

### Finding 2 — medium
- severity: medium
- location: docs/i18n/runtime.js
- current_text: locale.code
- issue: ইংরেজি ভাষার `locale.code` ব্যবহার করা হয়েছে যেখানে বাংলা ভাষা প্রয়োজন।
- correction: বাংলা ভাষায় `locale.code` ব্যবহার করুন, যেমন `bn-BD`।

### Finding 3 — medium
- severity: medium
- location: docs/i18n/registry.js
- current_text: বাংলা
- issue: বাংলা ভাষার প্রতিটি প্রবন্ধে বাংলা ভাষার ব্যবহার করা হয়েছে যেখানে ইংরেজি ভাষার প্রয়োজন ছিল।
- correction: ইংরেজি ভাষার প্রতিটি প্রবন্ধে ইংরেজি ভাষার ব্যবহার করুন, যেমন `en`।
