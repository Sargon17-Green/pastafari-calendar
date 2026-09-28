# SUBREVIEW_SESSION
surface: integration
reviewer_model: Qwen3 8B Q4_K_M
attempts: 1

===== ORIGINAL_USER =====
/no_think

Þú ert sjálfstæður og strangur málfars- og notendaviðmótsrýnir fyrir íslensku útgáfu Pastafari-dagatalsins (locale `is-IS`, repository code `is`).

ÖLL eigin samskipti þín í þessari rýnilotu eiga að vera á íslensku. Ekki svara á ensku, nema þegar þú vitnar nákvæmlega í texta á öðru tungumáli sem þú fannst sem galla, endurtekur vélræna verdict-línuna sem skilgreind er hér að neðan eða nefnir bókstafleg tækniauðkenni, API-heiti, formúlur, hash-gildi eða skráarslóðir sem ekki má þýða.

Þetta er fersk og sjálfstæð LLM-rýni. Ekki treysta eldri QA-niðurstöðum og ekki gera ráð fyrir að fyrri þýðing sé góð. Verkefnið er rýni, ekki endurþýðing frá grunni.

Rýndu ALLA sýnilega og aðgengilega textaupplifunina þegar tungumálið er íslenska, ekki aðeins `/about/`. Umfangið felur í sér aðalviðmót, dagsetningarleit, aðgerðardag, samanburð, ársýn, öfuga leit, villur og stöður, notkunarleiðbeiningar, fót, metadata/title, manifest, ARIA/a11y, noscript/fallback, tungumálaskipti og `/about/`.

Leitaðu virkt að:
1. texta á röngu tungumáli, sérstaklega dönsku eða óviljandi ensku fallbacki;
2. þýðingarmáli og texta sem er skiljanlegur en hljómar ekki eins og eðlileg nútímaíslenska;
3. málfræði-, beygingar-, setningagerðar-, stíl-, skráningar-, stafsetningar-, greinarmerkja- og typógrafíuvillum;
4. ósamræmi í hugtökum milli `/about/` og UI;
5. röngum eða vafasömum íslenskum þýðingum tæknilegra hugtaka;
6. placeholders sem eru í röngu málfræðilegu eða merkingarlegu hlutverki;
7. rangri eða óeðlilegri metadata-, title-, ARIA-, manifest-, fallback- eða accessibility-merkingu;
8. röngu letri, ritstefnu, BiDi-hegðun eða grunsamlegri blöndu ritkerfa;
9. líklegri textatengdri wrapping-, overflow- eða cramped-control-áhættu vegna íslensks orðalags. Þetta er textalegt áhættumat, ekki staðgengill fyrir síðar gerða raunverulega render-prófun.

Kanonísk föst gildi eru ófrávíkjanleg. Ekki leggja til að breyta formúlum, hash-gildum, code-literals, API-auðkennum, stable section IDs eða raunverulegum kanónískum heitum eingöngu til að þýða þau.

Sérreglur sem koma í veg fyrir falskar jákvæðar niðurstöður:

- Web App Manifest styður `*_localized` tungumálakort. Ekki telja ensku fallback-gildin `name`, `short_name`, `description`, `lang` eða `dir` sjálfkrafa íslenskan staðfærslugalla. Athugaðu þess í stað hvort íslenska eigi fullkomnar og réttar færslur í `name_localized`, `short_name_localized` og `description_localized`, með réttu tungumáli og stefnu.
- Static HTML getur innihaldið ensk bootstrap-gildi á elementum með `data-i18n` eða `data-i18n-attr`. Runtime-staðfærslan skiptir þeim út þegar íslenskt locale hefur verið virkjað. Ekki tilkynna þessi source-default ein og sér sem galla; tilkynntu þau aðeins ef kóðaflæði sýnir að þau geta raunverulega verið sýnileg eftir íslenska locale-initialization eða í raunverulegri villu-/fallback-leið.
- Locale-resolution þessa static site er sjálft gert með JavaScript. `noscript`-fallbackið er viljandi tungumálahlutlaust og inniheldur aðeins sérnafnið `JavaScript` auk viðvörunartákns. Ekki telja það enska tungumálaleka. Tilkynntu hins vegar annan náttúrulegan texta á röngu tungumáli eða raunverulegan accessibility-galla sem er óháður locale-resolution.
- Fyrirmæli rýnisins sjálfs, `MODE`/`SOURCE_PART` stýrilínur, skráarhausar og samantektir annarra rýnenda eru **ekki** texti vefsins. Aldrei nota texta úr þessum fyrirmælum sem `current_text`, aldrei staðsetja finding í prompt-/artifact-skrá og aldrei telja slíkan texta staðfærslugalla.
- Finding um „texta á röngu tungumáli“ er aðeins gilt ef þú getur vitnað í raunverulegan náttúrulegan texta úr gefinni vefskrá og nafngreint þá vefskrá. Ekki kalla texta íslenskan „ensku“ eða annað tungumál nema hann sé það í raun.

Þú færð `MODE` og `SOURCE_PART` neðan við þessi fyrirmæli.

Ef `MODE=FINDINGS_ONLY`:
- rýndu eingöngu gefinn `SOURCE_PART`;
- taktu skýra ákvörðun: `CLEAN` ef ekkert lagfæringarskylt vandamál fannst, annars `FINDINGS`;
- keyrslulagið krefst stutts, uppbyggðs svars: einnar íslenskrar samantektar og að hámarki sex staðbundinna findings; ekki reyna að endursegja allt inntakið;
- hvert raunverulegt finding skal hafa severity (`critical`, `high`, `medium`, `low`), skrá/staðsetningu eins nákvæma og gögn leyfa, örstuttan núverandi texta ef við á, skýrt vandamál og framkvæmanlega leiðréttingu;
- sameinaðu findings sem eru í raun sama vandamálið; ekki búa til almenn eða óstaðsett findings;
- ef ekkert raunverulegt vandamál finnst, útskýrðu stuttlega á íslensku hvað var yfirfarið og hvers vegna það er hreint;
- afritaðu EKKI SOURCE_PART, frumkóða eða langa kafla úr inntakinu til baka nema örstutt nákvæmt brot sé nauðsynlegt til að staðsetja finding;
- EKKI skrifa sjálf/ur `SUBREVIEW_RESULT` eða `NATIVE_QA_RESULT`; keyrslulagið sér um vélrænu línurnar.

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
58:   defineLocale("hy", "Հայերեն", "ltr", "hy-AM", "partial", () => import("./locales/hy.js?v=19-about-i18n")),
59:   defineLocale("id", "Bahasa Indonesia", "ltr", "id-ID", "partial", () => import("./locales/id.js?v=19-about-i18n")),
60:   defineLocale("is", "Íslenska", "ltr", "is-IS", "partial", () => import("./locales/is.js?v=19-about-i18n")),
61:   defineLocale("it", "Italiano", "ltr", "it-IT", "partial", () => import("./locales/it.js?v=19-about-i18n")),
62:   defineLocale("ja", "日本語", "ltr", "ja-JP", "partial", () => import("./locales/ja.js?v=19-about-i18n")),
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
  "result": "CLEAN",
  "summary": "Þessi rýnilotu hefur verið rýnd á `INTEGRATION` hluta og hefur ekki fundið neina röngu texta, málfræði, stíl eða tæknilegum vandamál sem eru í samræmi við íslenska tungumálið og ræðu rýnilögum. Allar textaupplifunir eru íslenskar, réttar og sýnilegar. Þar sem texta er í röngu mál", "findings": []
}
===== ATTEMPT 1 VALIDATION =====
VALID: deduplicated_exact_findings=0

===== NORMALIZED_REVIEW =====
SUBREVIEW_RESULT: CLEAN

Þessi rýnilotu hefur verið rýnd á `INTEGRATION` hluta og hefur ekki fundið neina röngu texta, málfræði, stíl eða tæknilegum vandamál sem eru í samræmi við íslenska tungumálið og ræðu rýnilögum. Allar textaupplifunir eru íslenskar, réttar og sýnilegar. Þar sem texta er í röngu mál
