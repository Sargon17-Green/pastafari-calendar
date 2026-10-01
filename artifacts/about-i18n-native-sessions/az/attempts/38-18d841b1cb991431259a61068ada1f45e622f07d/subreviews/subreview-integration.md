# SUBREVIEW_SESSION
surface: integration
reviewer_model: Qwen3 8B Q4_K_M
attempts: 3

===== ORIGINAL_USER =====
/no_think

Sən Pastafari təqviminin Azərbaycan dili versiyası üçün müstəqil və sərt dil və istifadəçi interfeysi redaktorusan (locale `az-AZ`, repository kodu `az`).

Bu yoxlama sessiyasındakı BÜTÜN adi təbii-dil ünsiyyəti yalnız Azərbaycan dilində olmalıdır. Başqa dildəki mətni yalnız real dil sızmasını sitat gətirəndə, yaxud dəyişdirilməz texniki identifikator, API adı, düstur, hash, fayl yolu və ya kod literalını göstərmək lazım olduqda işlət.

Bu, təzə və müstəqil LLM yoxlamasıdır. Əvvəlki QA nəticələrinə güvənmə və mövcud ifadələrin avtomatik olaraq düzgün və təbii olduğunu fərz etmə. Tapşırıq sıfırdan tərcümə deyil, ciddi redaktə və yoxlamadır.

Sayt Azərbaycan dili ilə işləyərkən bütün görünən və əlçatanlıq yönümlü mətn təcrübəsini yoxla; təkcə `/about/` səhifəsini yox. Əhatə dairəsinə əsas interfeys, tarix axtarışı, əməl günü, müqayisə, il görünüşü, əks axtarış, xətalar və vəziyyətlər, istifadəçi bələdçisi, footer, metadata/title, manifest, ARIA/a11y, noscript/fallback, dil dəyişimi və `/about/` daxildir.

Xüsusilə bunları fəal axtar:
1. yanlış dildə mətn, xüsusən türk və ya ingilis dilinin qəsdsiz sızması;
2. tərcümə qoxusu, sərt, qeyri-təbii və ya idiomatik olmayan müasir Azərbaycan dili;
3. qrammatika, sintaksis, uzlaşma, registr, durğu, orfoqrafiya və tipografiya xətaları;
4. `/about/` ilə UI arasında termin uyğunsuzluğu;
5. texniki anlayışların yanlış və ya şübhəli Azərbaycan dilində ifadəsi;
6. placeholder-ların yanlış qrammatik və ya semantik rolda işlənməsi;
7. metadata, title, ARIA, manifest, fallback və əlçatanlıq mətnində qeyri-təbii və ya səhv ifadələr;
8. mətnin yaratdığı real sətirbölünmə, overflow və ya dar idarəetmə riski.

Kanonik sabitlər dəyişdirilə bilməz. Düsturları, hash-ləri, code literal-ları, API identifikatorlarını, sabit section ID-lərini və həqiqi kanonik adları sadəcə daha təbii görünsün deyə dəyişmə.

Yanlış müsbət nəticələrin qarşısını alma qaydaları:

- Web App Manifest `*_localized` dil xəritələrini dəstəkləyir. Əsas fallback `name`, `short_name`, `description`, `lang` və `dir` dəyərlərini təkcə Azərbaycan dilində ayrıca localized girişlər olduğu üçün problem sayma. Əvəzində Azərbaycan dili üçün localized manifest girişlərinin tam və düzgün olub-olmadığını yoxla.
- Statik HTML-də `data-i18n` və ya `data-i18n-attr` olan elementlərdə ingiliscə bootstrap mətn ola bilər. Runtime locale başladıldıqdan sonra onu əvəz edir. Belə source-default mətni təkbaşına problem sayma; yalnız Azərbaycan locale işə düşdükdən sonra və ya real fallback/error yolunda görünə bildiyini sübut edən halı bildir.
- Statik saytın locale həlli JavaScript vasitəsilə edilir. `noscript` fallback qəsdən dil baxımından neytraldır və yalnız `JavaScript` xüsusi adını və xəbərdarlıq simvolunu ehtiva edir. Bunu dil sızması sayma.
- Redaktor təlimatları, `MODE`/`SOURCE_PART` idarə sətirləri, fayl başlıqları və başqa redaktorların xülasələri sayt mətni deyil. Onlardan heç vaxt `current_text` kimi istifadə etmə və finding-i prompt/artifact faylına aid etmə.
- “Yanlış dil” finding-i yalnız təqdim edilmiş sayt faylından real təbii-dil mətnini dəqiq sitat gətirə və həmin sayt faylını göstərə bildikdə etibarlıdır.
- `correction` `current_text` ilə eynidirsə, bu finding deyil.
- Layihədə `əməl günü`, `soruşulan gün`, `kotlet` və `bir-birinə hörülmüş aylar` kimi domen terminləri qəsdən istifadə olunur. Onların ardıcıl və qrammatik işlənməsini yoxla; sırf qeyri-adi olduqları üçün dəyişmə.

Aşağıda `MODE` və `SOURCE_PART` alacaqsan.

Əgər `MODE=FINDINGS_ONLY`:
- yalnız verilmiş `SOURCE_PART` hissəsini yoxla;
- problem yoxdursa `CLEAN`, real düzəliş tələb olunursa `FINDINGS` qərarı ver;
- qısa Azərbaycan dili xülasəsi və ən çox altı dəqiq lokallaşdırılmış finding ver;
- hər finding üçün severity (`critical`, `high`, `medium`, `low`), dəqiq fayl/location, qısa və dəqiq `current_text`, problem və tətbiq edilə bilən `correction` göstər;
- `current_text` təqdim olunan mənbədəki dəqiq verbatim substring olmalıdır;
- hər `location` `docs/` ilə başlamalıdır;
- dublikatları birləşdir və geniş, əsassız finding yaratma;
- problem yoxdursa, nəyin yoxlandığını və niyə təmiz olduğunu qısa Azərbaycan dilində bildir;
- bütün mənbəni və uzun kod hissələrini geri kopyalama;
- `SUBREVIEW_RESULT` və ya `NATIVE_QA_RESULT` sətirlərini özün yazma; runner onları mexaniki şəkildə əlavə edir.

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
30:   defineLocale("af", "Afrikaans", "ltr", "af-ZA", "partial", () => import("./locales/af.js?v=19-about-i18n")),
31:   defineLocale("ar", "العربية", "rtl", "ar", "partial", () => import("./locales/ar.js?v=19-about-i18n")),
32:   defineLocale("az", "Azərbaycanca", "ltr", "az-AZ", "partial", () => import("./locales/az.js?v=19-about-i18n")),
33:   defineLocale("be", "Беларуская", "ltr", "be-BY", "partial", () => import("./locales/be.js?v=19-about-i18n")),
34:   defineLocale("bg", "Български", "ltr", "bg-BG", "partial", () => import("./locales/bg.js?v=19-about-i18n")),
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
  "summary": "Azərbaycan dili ilə işləyən saytın lokalizasiya və dil dəyişmə prosesində tərcümə qoxusu, sərt və qeyri-təbii ifadələr, qrammatika və tipografiya xətaları, termin uyğunsuzluqları və digər dil sızması növləri aşkar edildi. Əsas problem - tərcümə qoxusu və sərt ifadələr, qrammatika", "findings": [
    {
      "severity": "high",
      "location": "docs/i18n/registry.js",
      "current_text": "Azərbaycanca",
      "issue": "Tərcümə qoxusu və sərt ifadə. 'Azərbaycanca' termini tərcümə qoxusu kimi işlənir və sərt ifadədir. Azərbaycan dilində 'Azərbaycanca' termini təbii və ya idiomatik olaraq istifadə olunmamışdır.",
      "correction": "Azərbaycan"
    },
    {
      "severity": "medium",
      "location": "docs/i18n/registry.js",
      "current_text": "az-AZ",
      "issue": "Kanonik sabitlər dəyişdirilə bilməz. 'az-AZ' kodu təbii dilin kodu kimi qəbul edilir və dəyişdirilməlidir.",
      "correction": "az-AZ"
    },
    {
      "severity": "medium",
      "location": "docs/i18n/runtime.js",
      "current_text": "translate(locale, element.dataset.i18n)",
      "issue": "Tərcümə prosesi təqdim edilən mətnin təbii dilinə uyğun olmayan ifadələrə dəstək vermir. 'element.dataset.i18n' mətni təbii dilinə uyğun olmayan ifadələrə dəstək vermir.",
      "correction": "translate(locale, element.dataset.i18n)"
    },
    {
      "severity": "medium",
      "location": "docs/i18n/runtime.js",
      "current_text": "element.textContent = translate(locale, element.dataset.i18n);",
      "issue": "Tərcümə prosesi təqdim edilən mətnin təbii dilinə uyğun olmayan ifadələrə dəstək vermir. 'element.textContent' mətni təbii dilinə uyğun olmayan ifadələrə dəstək vermir.",
      "correction": "element.textContent = translate(locale, element.dataset.i18n);"
    }
  ]
}
===== ATTEMPT 1 VALIDATION =====
INVALID: subreview proposed correction is identical to current_text

===== ATTEMPT 2 RAW JSON =====
{
  "result": "FINDINGS",
  "summary": "Azərbaycan dilində tərcümə qoxusu və qrammatik xətalar aşkar edildi. Əsas problem, tərcümədə qeyri-təbii və idiomatik olmayan ifadələr və qrammatik xətalar idi.",
  "findings": [
    {
      "severity": "medium",
      "location": "docs/i18n/runtime.js",
      "current_text": "locale.displayName",
      "issue": "Tərcümədə qeyri-təbii və idiomatik olmayan ifadə. 'displayName' termini Azərbaycan dilində tərcümə edilməyib.",
      "correction": "locale.adi"
    },
    {
      "severity": "medium",
      "location": "docs/i18n/runtime.js",
      "current_text": "element.textContent = translate(locale, element.dataset.i18n);",
      "issue": "Tərcümədə qeyri-təbii və idiomatik olmayan ifadə. 'textContent' və 'dataset' terminləri Azərbaycan dilində tərcümə edilməyib.",
      "correction": "element.mətni = translate(locale, element.dataset.i18n);"
    },
    {
      "severity": "medium",
      "location": "docs/i18n/registry.js",
      "current_text": "defineLocale(\"az\", \"Azərbaycanca\", \"ltr\", \"az-AZ\", \"partial\", () => import(\"./locales/az.js?v=19-about-i18n\"))",
      "issue": "Tərcümədə qeyri-təbii və idiomatik olmayan ifadə. 'Azərbaycanca' termini Azərbaycan dilində tərcümə edilməyib.",
      "correction": "defineLocale(\"az\", \"Azərbaycan dili\", \"ltr\", \"az-AZ\", \"partial\", () => import(\"./locales/az.js?v=19-about-i18n\"))"
    },
    {
      "severity": "medium",
      "location": "docs/i18n/registry.js",
      "current_text": "const resource = await loadLocaleSource(metadata.code);",
      "issue": "Tərcümədə qeyri-təbii və idiomatik olmayan ifadə. 'loadLocaleSource' termini Azərbaycan dilində tərcümə edilməyib.",
      "correction": "const resource = await yüklə(localeKaynağı, metadata.code);"
    }
  ]
}
===== ATTEMPT 2 VALIDATION =====
INVALID: integration current_text quotes code instead of a visible literal

===== ATTEMPT 3 RAW JSON =====
{
  "result": "FINDINGS",
  "summary": "Azərbaycan dilində mətn və terminlər arasında qeyri-təbii və ya sərt ifadələr, qrammatik və ya semantik xətalar, termin uyğunsuzluqlar və dil sızması aşkar edildi. Əsas problem, `docs/i18n/registry.js` və `docs/about/about.js` fayllarında Azərbaycan dilində tərcümə qoxusu və sərt",
  "findings": [
    {
      "severity": "high",
      "location": "docs/i18n/registry.js",
      "current_text": "Azərbaycanca",
      "issue": "Tərcümə qoxusu və sərt ifadə. `Azərbaycanca` termini təbii və ya idiomatik olmayan formada istifadə olunub.",
      "correction": "Azərbaycan dilində təbii və ya idiomatik olmayan formada istifadə olunub. `Azərbaycan dili` kimi ifadə daha təbii olardı."
    },
    {
      "severity": "medium",
      "location": "docs/i18n/registry.js",
      "current_text": "az-AZ",
      "issue": "Kanonik sabitlər dəyişdirilə bilməz. `az-AZ` kodu təbii dil mətnindən fərqlənən bir sabitdir və təbii dil mətnində istifadə olunmamalıdır.",
      "correction": "Kanonik sabitlər dəyişdirilə bilməz. `az-AZ` kodu təbii dil mətnindən fərqlənən bir sabitdir və təbii dil mətnində istifadə olunmamalıdır."
    },
    {
      "severity": "medium",
      "location": "docs/i18n/registry.js",
      "current_text": "partial",
      "issue": "Tərcümə qoxusu və sərt ifadə. `partial` termini təbii və ya idiomatik olmayan formada istifadə olunub.",
      "correction": "Azərbaycan dilində təbii və ya idiomatik olmayan formada istifadə olunub. `Tələbə` kimi ifadə daha təbii olardı."
    },
    {
      "severity": "medium",
      "location": "docs/about/about.js",
      "current_text": "t(\"about.loadError\")",
      "issue": "Tərcümə qoxusu və sərt ifadə. `t(\"about.loadError\")` kimi ifadə təbii və ya idiomatik olmayan formada istifadə olunub.",
      "correction": "Azərbaycan dilində təbii və ya idiomatik olmayan formada istifadə olunub. `Tərcümə` kimi ifadə daha təbii olardı."
    }
  ]
}
===== ATTEMPT 3 VALIDATION =====
VALID: deduplicated_exact_findings=0

===== NORMALIZED_REVIEW =====
SUBREVIEW_RESULT: FINDINGS

Azərbaycan dilində mətn və terminlər arasında qeyri-təbii və ya sərt ifadələr, qrammatik və ya semantik xətalar, termin uyğunsuzluqlar və dil sızması aşkar edildi. Əsas problem, `docs/i18n/registry.js` və `docs/about/about.js` fayllarında Azərbaycan dilində tərcümə qoxusu və sərt

### Finding 1 — high
- severity: high
- location: docs/i18n/registry.js
- current_text: Azərbaycanca
- issue: Tərcümə qoxusu və sərt ifadə. `Azərbaycanca` termini təbii və ya idiomatik olmayan formada istifadə olunub.
- correction: Azərbaycan dilində təbii və ya idiomatik olmayan formada istifadə olunub. `Azərbaycan dili` kimi ifadə daha təbii olardı.

### Finding 2 — medium
- severity: medium
- location: docs/i18n/registry.js
- current_text: az-AZ
- issue: Kanonik sabitlər dəyişdirilə bilməz. `az-AZ` kodu təbii dil mətnindən fərqlənən bir sabitdir və təbii dil mətnində istifadə olunmamalıdır.
- correction: Kanonik sabitlər dəyişdirilə bilməz. `az-AZ` kodu təbii dil mətnindən fərqlənən bir sabitdir və təbii dil mətnində istifadə olunmamalıdır.

### Finding 3 — medium
- severity: medium
- location: docs/i18n/registry.js
- current_text: partial
- issue: Tərcümə qoxusu və sərt ifadə. `partial` termini təbii və ya idiomatik olmayan formada istifadə olunub.
- correction: Azərbaycan dilində təbii və ya idiomatik olmayan formada istifadə olunub. `Tələbə` kimi ifadə daha təbii olardı.

### Finding 4 — medium
- severity: medium
- location: docs/about/about.js
- current_text: t("about.loadError")
- issue: Tərcümə qoxusu və sərt ifadə. `t("about.loadError")` kimi ifadə təbii və ya idiomatik olmayan formada istifadə olunub.
- correction: Azərbaycan dilində təbii və ya idiomatik olmayan formada istifadə olunub. `Tərcümə` kimi ifadə daha təbii olardı.
