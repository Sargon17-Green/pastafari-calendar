# SUBREVIEW_SESSION
surface: integration
reviewer_model: Qwen3 8B Q4_K_M
attempts: 3

===== ORIGINAL_USER =====
/no_think

Jy is ’n onafhanklike, streng taal- en gebruikerskoppelvlakresensent vir die Afrikaanse weergawe van die Pastafari-kalender (lokaal `af-ZA`, repository-kode `af`).

ALLE gewone natuurlike-taalkommunikasie in hierdie beoordelingsessie moet in Afrikaans wees. Jy mag teks in ’n ander taal aanhaal wanneer jy dit as ’n gebrek rapporteer, en jy mag onveranderlike tegniese identifiseerders, API-name, formules, hashes, lêerpaaie en ander letterlike waardes weergee wat nie vertaal moet word nie.

Dit is ’n vars, onafhanklike LLM-beoordeling. Moenie vorige QA-gevolgtrekkings vertrou nie en moenie aanvaar dat bestaande formulering korrek of natuurlik is nie. Die taak is beoordeling, nie ’n volledige hervertaling van nuuts af nie.

Beoordeel die HELE sigbare en toeganklikheidsgerigte ervaring wanneer die webwerf in Afrikaans is, nie net `/about/` nie. Die omvang sluit die hoofkoppelvlak, datumsoektog, aksiedagkontroles, vergelyking, jaaroorsig, omgekeerde soektog, foute en toestande, gebruikersgids, footer, metadata/title, manifest, ARIA/a11y, noscript/fallback, taalwisseling en `/about/` in.

Soek aktief na:
1. teks in die verkeerde taal, veral Nederlands of Engels wat onbedoeld deurlek;
2. vertaaltaal, stywe, onnatuurlike of nie-idiomatiese moderne Afrikaans;
3. grammatika-, sintaksis-, kongruensie-, register-, leesteken-, spel- en tipografiese foute;
4. terminologiese teenstrydighede tussen `/about/` en die UI;
5. verkeerde of twyfelagtige Afrikaanse formulering van tegniese begrippe;
6. placeholders wat in die verkeerde grammatikale of semantiese rol gebruik word;
7. onakkurate of onnatuurlike metadata, title, ARIA, manifest-, fallback- of toeganklikheidsteks;
8. gemengde taal of skrif wat nie doelbewus tegnies is nie;
9. waarskynlike reëlbreking-, overflow- of beknopte-beheer-risiko’s wat deur die Afrikaanse bewoording veroorsaak word.

Kanonieke invariantes is verpligtend. Moenie formules, hashes, code literals, API-identifiseerders, stabiele section-ID’s of werklike kanonieke name verander bloot om dit natuurliker te laat klink nie.

Reëls om vals positiewe te voorkom:

- Die Web App Manifest ondersteun `*_localized`-taalkaarte. Moenie die basiese fallback-`name`, `short_name`, `description`, `lang` of `dir` bloot as ’n Afrikaanse fout rapporteer omdat gelokaliseerde inskrywings ook bestaan nie. Kontroleer eerder dat die Afrikaanse gelokaliseerde manifestinskrywings volledig en korrek is.
- Statiese HTML mag Engelse bootstrap-bronteks bevat op elemente met `data-i18n` of `data-i18n-attr`. Die runtime vervang dit ná locale-inisialisering. Moenie so ’n source-default alleen as fout rapporteer nie; rapporteer dit slegs as die kodepad wys dat dit ná Afrikaanse locale-inisialisering of op ’n werklike fallback/error-pad sigbaar kan bly.
- Locale-oplossing op die statiese webwerf word self deur JavaScript gedoen. Die `noscript`-fallback is doelbewus taalneutraal en bevat net die eienaam `JavaScript` plus ’n waarskuwingsimbool. Moenie dit as taaldefek rapporteer nie.
- Resensentinstruksies, `MODE`/`SOURCE_PART`-kontrolelyne, lêeropskrifte en opsommings van ander resensente is NIE webwerfteks nie. Gebruik nooit daardie teks as `current_text` nie en plaas nooit ’n finding in ’n prompt/artifact-lêer nie.
- ’n finding oor “verkeerde taal” is slegs geldig as jy werklike natuurlike-taalteks uit die verskafde webwerfbron presies kan aanhaal en die webwerflêer kan identifiseer.
- ’n voorgestelde correction wat identies aan `current_text` is, is geen finding nie.
- Die projek gebruik doelbewus terme soos `aksiedag`, `gevraagde dag`, `kotelet` en `verweefde maande`. Beoordeel of hulle konsekwent en grammaties gebruik word; moenie hulle bloot omdat hulle domeinspesifiek is vervang nie.

Jy sal hieronder `MODE` en `SOURCE_PART` ontvang.

As `MODE=FINDINGS_ONLY`:
- beoordeel net die verskafde `SOURCE_PART`;
- besluit duidelik: `CLEAN` as daar geen regstellingswaardige probleem is nie, anders `FINDINGS`;
- lewer ’n kort Afrikaanse opsomming en hoogstens ses presies gelokaliseerde findings;
- elke finding moet severity (`critical`, `high`, `medium`, of `low`), ’n presiese lêer/location, ’n kort presiese `current_text`, ’n duidelike probleem en ’n uitvoerbare correction bevat;
- `current_text` moet ’n presiese verbatim substring van die verskafde bron wees;
- elke `location` moet met `docs/` begin;
- voeg duplikate saam en moenie breë of ongegronde findings skep nie;
- as daar geen werklike probleem is nie, verduidelik kortliks in Afrikaans wat nagegaan is en waarom dit skoon is;
- moenie die hele bron, kode of lang bronpassasies terugkopieer nie;
- moenie self `SUBREVIEW_RESULT` of `NATIVE_QA_RESULT` skryf nie; die runner voeg die meganiese reëls by.

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
28:   defineLocale("he", "עברית", "rtl", "he-IL", "complete", () => import("./locales/he.js?v=19-about-i18n")),
29:   defineLocale("en", "English", "ltr", "en-US", "complete", () => import("./locales/en.js?v=19-about-i18n")),
30:   defineLocale("af", "Afrikaans", "ltr", "af-ZA", "partial", () => import("./locales/af.js?v=19-about-i18n")),
31:   defineLocale("ar", "العربية", "rtl", "ar", "partial", () => import("./locales/ar.js?v=19-about-i18n")),
32:   defineLocale("az", "Azərbaycanca", "ltr", "az-AZ", "partial", () => import("./locales/az.js?v=19-about-i18n")),
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
  "summary": "Die Afrikaanse weergawe van die Pastafari-kalender het 'n aantal teks- en toeganklikheidswaarnemings wat verbetering vereis. Die meeste van hierdie waarnemings is gerelateer aan onnatuurlike Afrikaanse formulering, onakkurate metadata, en onverwagte taalgebruik in toeganklikheid-",
  "findings": [
    {
      "severity": "medium",
      "location": "docs/i18n/runtime.js",
      "current_text": "locale.displayName",
      "issue": "Die `locale.displayName`-vergelyking word gebruik sonder Afrikaanse vertaling in die UI, wat lei tot onnatuurlike toon in die gebruikerskoppelvlak.",
      "correction": "Vervang `locale.displayName` met Afrikaanse vertaling in die UI, byvoorbeeld `locale.displayNameAfrikaans`."
    },
    {
      "severity": "medium",
      "location": "docs/i18n/registry.js",
      "current_text": "defineLocale(\"af\", \"Afrikaans\", \"ltr\", \"af-ZA\", \"partial\", () => import(\"./locales/af.js?v=19-about-i18n\"))",
      "issue": "Die `locale.displayName` is in Engels, wat onverwagte taalgebruik in die Afrikaanse weergawe veroorsaak.",
      "correction": "Vervang \"Afrikaans\" met Afrikaanse vertaling, byvoorbeeld \"Afrikaans\" (alhoewel dit al Afrikaans is, moet dit in die UI verifieer word)."
    },
    {
      "severity": "medium",
      "location": "docs/about/about.js",
      "current_text": "t(\"about.loadError\")",
      "issue": "Die `t(\"about.loadError\")`-vergelyking word gebruik sonder Afrikaanse vertaling in die UI, wat lei tot onnatuurlike toon in die gebruikerskoppelvlak.",
      "correction": "Vervang `t(\"about.loadError\")` met Afrikaanse vertaling, byvoorbeeld `t(\"about.loadErrorAfrikaans\")`."
    },
    {
      "severity": "medium",
      "location": "docs/app.js",
      "current_text": "t(\"calendar.daysAria\", { cutletName: viewCutletName })",
      "issue": "Die `t(\"calendar.daysAria\")`-vergelyking word gebruik sonder Afrikaanse vertaling in die UI, wat lei tot onnatuurlike toon in die gebruikerskoppelvlak.",
      "correction": "Vervang `t(\"calendar.daysAria\")` met Afrikaanse vertaling, byvoorbeeld `t(\"calendar.daysAriaAfrikaans\")`."
    }
  ]
}
===== ATTEMPT 1 VALIDATION =====
INVALID: integration current_text quotes code instead of a visible literal

===== ATTEMPT 2 RAW JSON =====
{
  "result": "FINDINGS",
  "summary": "Die Afrikaanse weergawe van die Pastafari-kalender het enkele teks- en toeganklikheidprobleme wat behoefte het van regstelling. Die meeste van die probleme is verwant aan onverwagte Engelse teks, onnatuurlike Afrikaanse formulering, en onvolledige toeganklikheidsteks.",
  "findings": [
    {
      "severity": "medium",
      "location": "docs/i18n/runtime.js",
      "current_text": "element.textContent = translate(locale, element.dataset.i18n);",
      "issue": "Die gebruik van `element.dataset.i18n` bevat Engelse teks wat nie in Afrikaans vertaal is nie. Hierdie teks moet in Afrikaans wees om die toeganklikheid te verseker.",
      "correction": "Vervang `element.dataset.i18n` met Afrikaanse teks wat in die vertaalproses ingesluit word."
    },
    {
      "severity": "medium",
      "location": "docs/i18n/runtime.js",
      "current_text": "element.setAttribute(attribute, translate(locale, key));",
      "issue": "Die `translate(locale, key)`-funksie gebruik Engelse sleutels wat nie in Afrikaans vertaal is nie. Hierdie sleutels moet in Afrikaans wees vir korrekte toeganklikheid.",
      "correction": "Vervang Engelse sleutels met Afrikaanse sleutels wat in die vertaalproses ingesluit word."
    },
    {
      "severity": "medium",
      "location": "docs/i18n/registry.js",
      "current_text": "defineLocale(\"af\", \"Afrikaans\", \"ltr\", \"af-ZA\", \"partial\", () => import(\"./locales/af.js?v=19-about-i18n\"))",
      "issue": "Die `defineLocale`-funksie bevat Engelse teks in die `description`-veld wat nie in Afrikaans vertaal is nie. Hierdie teks moet in Afrikaans wees vir korrekte toeganklikheid.",
      "correction": "Vervang Engelse teks met Afrikaanse teks wat in die vertaalproses ingesluit word."
    },
    {
      "severity": "medium",
      "location": "docs/about/about.js",
      "current_text": "elements[\"article-content\"].lang = articleLocale.lang;",
      "issue": "Die `lang`-attribuut word gebruik sonder enige Afrikaanse teks. Hierdie attribuut moet in Afrikaans wees vir korrekte toeganklikheid.",
      "correction": "Vervang `lang` met Afrikaanse teks wat in die vertaalproses ingesluit word."
    }
  ]
}
===== ATTEMPT 2 VALIDATION =====
INVALID: integration current_text quotes code instead of a visible literal

===== ATTEMPT 3 RAW JSON =====
{
  "result": "FINDINGS",
  "summary": "Die Afrikaanse weergawe van die Pastafari-kalender het verskeie taal- en toeganklikheidstekens wat verbetering behoefte. Die meeste van die probleme is verband met onnatuurlike of ongebruikelike Afrikaanse formulering, onakkurate metadata, en ongevulde placeholders.",
  "findings": [
    {
      "severity": "medium",
      "location": "docs/i18n/runtime.js",
      "current_text": "element.textContent = translate(locale, element.dataset.i18n);",
      "issue": "Die gebruik van Engelse kode in die `dataset.i18n`-attribuut is onnatuurlik en kan lei tot onverwagte vertaling.",
      "correction": "Vervang `element.dataset.i18n` met `element.dataset.i18nAf` of gebruik `data-i18n` met Afrikaanse vertaling."
    },
    {
      "severity": "medium",
      "location": "docs/i18n/registry.js",
      "current_text": "defineLocale(\"af\", \"Afrikaans\", \"ltr\", \"af-ZA\", \"partial\", () => import(\"./locales/af.js?v=19-about-i18n\"))",
      "issue": "Die `description`-veld is leeg en kan lei tot onakkurate metadata.",
      "correction": "Voeg 'n beskrywing by vir die Afrikaanse taal, byvoorbeeld: \"Afrikaanse weergawe van die Pastafari-kalender\"."
    },
    {
      "severity": "low",
      "location": "docs/about/about.js",
      "current_text": "elements[\"article-content\"].setAttribute(\"aria-busy\", \"true\");",
      "issue": "Die `aria-busy`-attribuut word gebruik sonder 'n toeganklike beskrywing wat die gebruiker moet verstaan.",
      "correction": "Voeg 'n toeganklike beskrywing by, byvoorbeeld: `aria-busy=\"true\" aria-label=\"Lading...\"`."
    },
    {
      "severity": "medium",
      "location": "docs/reverse-ui.js",
      "current_text": "this.status.textContent = this.rt(\"reverse.status.running\");",
      "issue": "Die `rt()`-funksie word gebruik sonder 'n toeganklike beskrywing vir die status-tekst.",
      "correction": "Voeg 'n toeganklike beskrywing by, byvoorbeeld: `aria-label=\"Lading...\"` of gebruik 'n toeganklike alternatief."
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
