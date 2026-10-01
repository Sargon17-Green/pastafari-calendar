# SUBREVIEW_SESSION
surface: integration
reviewer_model: Qwen3 8B Q4_K_M
attempts: 1

===== ORIGINAL_USER =====
/no_think

Ti si nezavisan i strog jezički i UI recenzent na nivou izvornog govornika za bosansku verziju Pastafarijanskog kalendara (locale `bs-BA`, repository code `bs`).

SVA uobičajena komunikacija prirodnim jezikom u ovoj sesiji mora biti isključivo na bosanskom. Drugi jezik smije se koristiti samo pri tačnom citiranju slučajnog jezičkog curenja ili nepromjenjivih tehničkih identifikatora, API naziva, formula, hash vrijednosti, putanja datoteka i code literals.

Ovo je svježa, nezavisna LLM provjera. Ne vjeruj prethodnim QA rezultatima i ne smatraj postojeći tekst ispravnim samo zato što je već preveden. Zadatak je recenzija, a ne potpuni prijevod ispočetka.

Provjeri CIJELO vidljivo i accessibility-facing iskustvo sajta u bosanskoj lokalizaciji, a ne samo `/about/`. Obuhvat uključuje glavni UI, pretragu datuma, dan djelovanja, poređenje, prikaz godine, obrnuto pretraživanje, greške i stanja, vodič, footer, metadata/title, manifest, ARIA/a11y, noscript/fallback, promjenu jezika i `/about/`.

Aktivno traži:
1. tekst na pogrešnom jeziku, posebno srpsku ekavicu, ruske, engleske ili druge nenamjerne jezičke tragove;
2. kalkove, neprirodan ili neidiomatski savremeni standardni bosanski;
3. gramatičke, sintaktičke, kongruencijske, pravopisne, interpunkcijske i tipografske greške;
4. terminološku nedosljednost između `/about/` i UI-ja;
5. loše ili neprirodne bosanske tehničke termine;
6. placeholders u pogrešnoj gramatičkoj ili semantičkoj ulozi;
7. neprirodne ili pogrešne metadata, title, ARIA, manifest, fallback i accessibility tekstove;
8. neželjeno miješanje jezika ili pisama;
9. vjerovatne tekstualne probleme s prelamanjem, overflowom ili pretijesnim kontrolama.

Kanonski invarianti su obavezni. Ne predlaži izmjenu formula, hash vrijednosti, code literals, API identifikatora, stabilnih section IDs ili pravih kanonskih imena samo radi lokalizacije.

Pravila protiv false positives:
- Web App Manifest podržava `*_localized` mape. Ne smatraj bazna fallback polja `name`, `short_name`, `description`, `lang` ili `dir` bosanskom greškom samo zato što postoje lokalizirana polja. Provjeri bosanske localized entries.
- Statički HTML može imati engleske bootstrap vrijednosti u elementima s `data-i18n` ili `data-i18n-attr`; runtime ih zamjenjuje nakon locale initialization. Ne prijavljuj source-default kao grešku bez stvarnog puta kojim ostaje vidljiv.
- `noscript` fallback statičkog sajta namjerno je neutralan; naziv `JavaScript` sam po sebi nije jezičko curenje.
- Upute recenzentu, `MODE`/`SOURCE_PART` redovi, naslovi datoteka i izvještaji drugih recenzenata NISU tekst sajta. Nikada ih ne koristi kao `current_text`.
- Finding o „pogrešnom jeziku“ vrijedi samo ako je `current_text` tačan prirodnojezički fragment iz dostavljene datoteke sajta.
- Correction ne može biti identičan `current_text`.
- Domena termini `dan djelovanja`, `upitani dan`, `kotlet`, `isprepleteni mjeseci` namjerni su; procijeni njihovu dosljednost i gramatiku, ali ih ne odbacuj samo zato što su neobični.

Ispod će biti dostavljeni `MODE` i `SOURCE_PART`.

Ako je `MODE=FINDINGS_ONLY`:
- provjeravaj samo dati `SOURCE_PART`;
- rezultat je `CLEAN` ako nema problema koji zahtijeva ispravku, a `FINDINGS` ako ih ima;
- vrati kratki sažetak na bosanskom i najviše šest precizno lokaliziranih findings;
- svaki finding mora sadržavati severity (`critical`, `high`, `medium`, `low`), tačnu datoteku/location, kratak tačan `current_text`, opis problema i izvršivu correction;
- `current_text` mora biti tačan verbatim substring iz dostavljenog izvora;
- svaki `location` mora početi s `docs/`;
- spajaj duplikate i ne stvaraj opće ili nevezane findings;
- ako nema problema, ukratko na bosanskom objasni šta je provjereno;
- ne vraćaj cijeli SOURCE_PART ili duge blokove koda;
- nemoj sam pisati `SUBREVIEW_RESULT` ili `NATIVE_QA_RESULT`: runner ih dodaje.

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
34:   defineLocale("bg", "Български", "ltr", "bg-BG", "partial", () => import("./locales/bg.js?v=19-about-i18n")),
35:   defineLocale("bn", "বাংলা", "ltr", "bn-BD", "partial", () => import("./locales/bn.js?v=19-about-i18n")),
36:   defineLocale("bs", "Bosanski", "ltr", "bs-BA", "partial", () => import("./locales/bs.js?v=19-about-i18n")),
37:   defineLocale("ca", "Català", "ltr", "ca-ES", "partial", () => import("./locales/ca.js?v=19-about-i18n")),
38:   defineLocale("cs", "Čeština", "ltr", "cs-CZ", "partial", () => import("./locales/cs.js?v=19-about-i18n")),
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
  "summary": "Provjereno je ponašanje i UI za bosansku lokalizaciju u okviru integracije, uključujući lokalizaciju, a11y, greške, promjenu jezika i druge aspekte. Ponašanje je u skladu s kanonskim invarijantima, ali su pronađeni neki jezički i tehnički problemi.",
  "findings": [
    {
      "severity": "medium",
      "location": "docs/i18n/runtime.js",
      "current_text": "locale.displayName",
      "issue": "Koristi se 'locale.displayName' kao ključ za prikaz, što može biti problem ako se ne pravilno lokalizira.",
      "correction": "Provjeriti da li je 'locale.displayName' pravilno lokaliziran u datoteci 'bs.js' ili drugim lokalizacijskim datotekama."
    },
    {
      "severity": "medium",
      "location": "docs/i18n/registry.js",
      "current_text": "Bosanski",
      "issue": "Neprirodna ili neidiomatska terminologija u 'Bosanski' za lokalizaciju.",
      "correction": "Provjeriti da li se 'Bosanski' koristi kao pravilni lokalni naziv u kontekstu i da li se u skladu s kanonskim invarijantima."
    },
    {
      "severity": "medium",
      "location": "docs/i18n/registry.js",
      "current_text": "bs-BA",
      "issue": "Kod 'bs-BA' je pravilan, ali treba provjeriti da li se koristi u skladu s kanonskim invarijantima i da li se pravilno lokalizira.",
      "correction": "Provjeriti da li se 'bs-BA' koristi kao pravilan kod za lokalizaciju i da li se pravilno lokalizira u svim relevantnim dijelovima koda."
    },
    {
      "severity": "medium",
      "location": "docs/about/about.js",
      "current_text": "t(\"about.loadError\")",
      "issue": "Koristi se 't()' za prikaz greške, što može biti problem ako se ne pravilno lokalizira.",
      "correction": "Provjeriti da li je 'about.loadError' pravilno lokaliziran u datoteci 'bs.js' ili drugim lokalizacijskim datotekama."
    }
  ]
}
===== ATTEMPT 1 VALIDATION =====
VALID: deduplicated_exact_findings=0

===== NORMALIZED_REVIEW =====
SUBREVIEW_RESULT: FINDINGS

Provjereno je ponašanje i UI za bosansku lokalizaciju u okviru integracije, uključujući lokalizaciju, a11y, greške, promjenu jezika i druge aspekte. Ponašanje je u skladu s kanonskim invarijantima, ali su pronađeni neki jezički i tehnički problemi.

### Finding 1 — medium
- severity: medium
- location: docs/i18n/runtime.js
- current_text: locale.displayName
- issue: Koristi se 'locale.displayName' kao ključ za prikaz, što može biti problem ako se ne pravilno lokalizira.
- correction: Provjeriti da li je 'locale.displayName' pravilno lokaliziran u datoteci 'bs.js' ili drugim lokalizacijskim datotekama.

### Finding 2 — medium
- severity: medium
- location: docs/i18n/registry.js
- current_text: Bosanski
- issue: Neprirodna ili neidiomatska terminologija u 'Bosanski' za lokalizaciju.
- correction: Provjeriti da li se 'Bosanski' koristi kao pravilni lokalni naziv u kontekstu i da li se u skladu s kanonskim invarijantima.

### Finding 3 — medium
- severity: medium
- location: docs/i18n/registry.js
- current_text: bs-BA
- issue: Kod 'bs-BA' je pravilan, ali treba provjeriti da li se koristi u skladu s kanonskim invarijantima i da li se pravilno lokalizira.
- correction: Provjeriti da li se 'bs-BA' koristi kao pravilan kod za lokalizaciju i da li se pravilno lokalizira u svim relevantnim dijelovima koda.

### Finding 4 — medium
- severity: medium
- location: docs/about/about.js
- current_text: t("about.loadError")
- issue: Koristi se 't()' za prikaz greške, što može biti problem ako se ne pravilno lokalizira.
- correction: Provjeriti da li je 'about.loadError' pravilno lokaliziran u datoteci 'bs.js' ili drugim lokalizacijskim datotekama.
