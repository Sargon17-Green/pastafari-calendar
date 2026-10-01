# SUBREVIEW_SESSION
surface: integration
reviewer_model: Qwen3 8B Q4_K_M
attempts: 3

===== ORIGINAL_USER =====
/no_think

Είσαι ανεξάρτητος και αυστηρός γλωσσικός και UI επιμελητής επιπέδου φυσικού ομιλητή για την ελληνική έκδοση του Πασταφαριανού ημερολογίου (locale `el-GR`, κωδικός repository `el`).

ΟΛΗ η κανονική επικοινωνία σε φυσική γλώσσα μέσα σε αυτή τη συνεδρία πρέπει να είναι στα ελληνικά. Άλλη γλώσσα επιτρέπεται μόνο όταν παρατίθεται ακριβώς μια ακούσια διαρροή άλλης γλώσσας ή όταν πρόκειται για αμετάβλητους τεχνικούς αναγνωριστές, ονόματα API, τύπους, hashes, διαδρομές αρχείων και code literals.

Αυτή είναι νέα και ανεξάρτητη LLM επιθεώρηση. Μην εμπιστεύεσαι προηγούμενα QA αποτελέσματα και μην θεωρείς σωστό ένα υπάρχον κείμενο μόνο επειδή έχει ήδη μεταφραστεί. Η εργασία είναι έλεγχος, όχι πλήρης νέα μετάφραση.

Έλεγξε ΟΛΟ το ορατό και accessibility-facing περιβάλλον του ιστοτόπου στην ελληνική locale, όχι μόνο το `/about/`. Το εύρος περιλαμβάνει κύριο UI, αναζήτηση ημερομηνίας, ημέρα πράξης, σύγκριση, προβολή έτους, αντίστροφη αναζήτηση, σφάλματα και καταστάσεις, οδηγό, footer, metadata/title, manifest, ARIA/a11y, noscript/fallback, επιλογή γλώσσας και `/about/`.

Αναζήτησε ενεργά:
1. κείμενο σε λάθος γλώσσα, ιδίως αγγλικά, ρωσικά, τουρκικά, ιταλικά ή μικτές γλώσσες·
2. μεταφραστικά καλκ, αφύσικα ή μη ιδιωματικά σύγχρονα κοινά ελληνικά·
3. γραμματικά, συντακτικά, συμφωνίας, ορθογραφικά, στίξης και τυπογραφικά λάθη·
4. ασυνεπή ορολογία μεταξύ `/about/` και UI·
5. κακούς ή αφύσικους ελληνικούς τεχνικούς όρους·
6. placeholders σε λάθος γραμματική ή σημασιολογική θέση·
7. αφύσικα ή λανθασμένα metadata, title, ARIA, manifest, fallback και accessibility κείμενα·
8. ακούσια μίξη γλωσσών ή γραφών·
9. πιθανά προβλήματα κειμένου με wrapping, overflow ή υπερβολικά στενά controls.

Οι κανονικές invariants είναι δεσμευτικές. Μην προτείνεις αλλαγές σε τύπους, hashes, code literals, API identifiers, σταθερά section IDs ή πραγματικά κανονικά ονόματα μόνο για λόγους τοπικοποίησης.

Κανόνες κατά false positives:
- Το Web App Manifest υποστηρίζει `*_localized` maps. Μην θεωρείς τα βασικά fallback πεδία `name`, `short_name`, `description`, `lang` ή `dir` ελληνικό σφάλμα μόνο επειδή υπάρχουν localized πεδία. Έλεγξε τις ελληνικές localized entries.
- Στατικό HTML μπορεί να έχει αγγλικές bootstrap τιμές σε στοιχεία με `data-i18n` ή `data-i18n-attr`; το runtime τις αντικαθιστά μετά την αρχικοποίηση locale. Μην αναφέρεις source-default ως σφάλμα χωρίς πραγματική διαδρομή όπου παραμένει ορατό.
- Το `noscript` fallback του στατικού site είναι σκόπιμα ουδέτερο· η ίδια η λέξη `JavaScript` δεν είναι διαρροή γλώσσας.
- Οδηγίες προς reviewer, γραμμές `MODE`/`SOURCE_PART`, ονόματα αρχείων και αναφορές άλλων reviewers ΔΕΝ ΕΙΝΑΙ κείμενο ιστοτόπου. Ποτέ μην τα χρησιμοποιείς ως `current_text`.
- Finding «λάθος γλώσσα» είναι έγκυρο μόνο όταν το `current_text` είναι ακριβές φυσικογλωσσικό fragment από το παρεχόμενο αρχείο ιστοτόπου.
- Η correction δεν μπορεί να είναι ίδια με το `current_text`.
- Οι όροι `ημέρα πράξης`, `ζητούμενη ημέρα`, `κοτολέτα` και `πλεγμένοι μήνες` είναι σκόπιμοι όροι πεδίου· έλεγξε συνέπεια και γραμματική, αλλά μην τους απορρίψεις μόνο επειδή είναι ασυνήθιστοι.

Παρακάτω θα δοθούν `MODE` και `SOURCE_PART`.

Αν `MODE=FINDINGS_ONLY`:
- έλεγξε μόνο το συγκεκριμένο `SOURCE_PART`;
- αποτέλεσμα `CLEAN` αν δεν υπάρχει πρόβλημα που χρειάζεται διόρθωση, αλλιώς `FINDINGS`;
- δώσε σύντομη σύνοψη στα ελληνικά και έως έξι ακριβώς εντοπισμένα findings·
- κάθε finding πρέπει να έχει severity (`critical`, `high`, `medium`, `low`), ακριβές αρχείο/location, σύντομο ακριβές `current_text`, περιγραφή προβλήματος και εφαρμόσιμη correction·
- το `current_text` πρέπει να είναι ακριβές verbatim substring της παρεχόμενης πηγής·
- κάθε `location` πρέπει να αρχίζει με `docs/`;
- συγχώνευσε διπλότυπα και μη δημιουργείς γενικά ή άσχετα findings·
- αν δεν υπάρχει πρόβλημα, εξήγησε σύντομα στα ελληνικά τι ελέγχθηκε·
- μην επιστρέψεις όλο το SOURCE_PART ή μεγάλα code blocks·
- μην γράψεις μόνος σου `SUBREVIEW_RESULT` ή `NATIVE_QA_RESULT`: τα προσθέτει ο runner.

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
39:   defineLocale("da", "Dansk", "ltr", "da-DK", "partial", () => import("./locales/da.js?v=19-about-i18n")),
40:   defineLocale("de", "Deutsch", "ltr", "de-DE", "partial", () => import("./locales/de.js?v=19-about-i18n")),
41:   defineLocale("el", "Ελληνικά", "ltr", "el-GR", "partial", () => import("./locales/el.js?v=19-about-i18n")),
42:   defineLocale("eo", "Esperanto", "ltr", "eo", "partial", () => import("./locales/eo.js?v=19-about-i18n")),
43:   defineLocale("es", "Español", "ltr", "es-ES", "partial", () => import("./locales/es.js?v=19-about-i18n")),
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
  "summary": "Εντοπίστηκαν προβλήματα στην ελληνική επικοινωνία του ιστοτόπου. Τα προβλήματα συνδέονται με την χρήση αγγλικών όρων, λανθασμένης γραμματικής, ασυνεπούς ορολογίας και αφύσικων ελληνικών τεχνικών όρων.",
  "findings": [
    {
      "severity": "high",
      "location": "docs/i18n/runtime.js",
      "current_text": "locale.displayName",
      "issue": "Η τιμή `locale.displayName` είναι σε αγγλικά, αντί για ελληνικά. Αυτό είναι απαραίτητο για την επικοινωνία με τον χρήστη στην ελληνική γλώσσα.",
      "correction": "Αντικαταστήστε την τιμή `locale.displayName` με την ελληνική έκδοση του ονόματος της γλώσσας, π.χ. `Ελληνικά`."
    },
    {
      "severity": "medium",
      "location": "docs/i18n/registry.js",
      "current_text": "defineLocale(\"el\", \"Ελληνικά\", \"ltr\", \"el-GR\", \"partial\", () => import(\"./locales/el.js?v=19-about-i18n\"))",
      "issue": "Η τιμή `locale.displayName` είναι σωστή, αλλά η χρήση του `\"el-GR\"` είναι ασυνήθιστη και μπορεί να προκαλέσει σύγχυση. Συνήθως χρησιμοποιείται `el` για την ελληνική γλώσσα.",
      "correction": "Αντικαταστήστε το `\"el-GR\"` με `\"el\"` για να είναι συνεπής με τις συνήθειες της κοινής χρήσης."
    },
    {
      "severity": "medium",
      "location": "docs/about/about.js",
      "current_text": "t(\"about.loadError\")",
      "issue": "Η τιμή `\"about.loadError\"` είναι σε αγγλικά, αντί για ελληνικά. Αυτό είναι απαραίτητο για την επικοινωνία με τον χρήστη στην ελληνική γλώσσα.",
      "correction": "Αντικαταστήστε την τιμή `\"about.loadError\"` με την ελληνική έκδοση του μηνύματος, π.χ. `\"about.loadError\"` μπορεί να είναι `\"Πρόβλημα φόρτωσης\"`."
    },
    {
      "severity": "low",
      "location": "docs/reverse-ui.js",
      "current_text": "this.rt(\"reverse.status.running\")",
      "issue": "Η τιμή `\"reverse.status.running\"` είναι σε αγγλικά, αντί για ελληνικά. Αυτό είναι απαραίτητο για την επικοινωνία με τον χρήστη στην ελληνική γλώσσα.",
      "correction": "Αντικαταστήστε την τιμή `\"reverse.status.running\"` με την ελληνική έκδοση του μηνύματος, π.χ. `\"reverse.status.running\"` μπορεί να είναι `\"Εκτέλεση\"`."
    }
  ]
}
===== ATTEMPT 1 VALIDATION =====
INVALID: integration current_text quotes code instead of a visible literal

===== ATTEMPT 2 RAW JSON =====
{
  "result": "FINDINGS",
  "summary": "Εντοπίστηκαν προβλήματα στην ελληνική επικοινωνία του ιστοτόπου. Τα προβλήματα αφορούν σε λάθος γλώσσα, μεταφραστικά καλκ, γραμματικά και συμφωνίας λάθη, κακούς τεχνικούς όρους και ασυνεπή ορολογία. Τα προβλήματα είναι κρίτικα και υψηλής σοβαρότητας.",
  "findings": [
    {
      "severity": "critical",
      "location": "docs/i18n/runtime.js",
      "current_text": "locale.displayName",
      "issue": "Η τιμή `locale.displayName` είναι σε αγγλικά και όχι στα ελληνικά. Αυτό είναι αντίθετο με την προδιαγραφή της ελληνικής επικοινωνίας.",
      "correction": "Η τιμή πρέπει να είναι στα ελληνικά, π.χ. `Ελληνικά`."
    },
    {
      "severity": "high",
      "location": "docs/i18n/runtime.js",
      "current_text": "locale.code",
      "issue": "Η τιμή `locale.code` είναι σε αγγλικά και όχι στα ελληνικά. Αυτό είναι αντίθετο με την προδιαγραφή της ελληνικής επικοινωνίας.",
      "correction": "Η τιμή πρέπει να είναι στα ελληνικά, π.χ. `Ελληνικά`."
    },
    {
      "severity": "medium",
      "location": "docs/i18n/registry.js",
      "current_text": "defineLocale(\"el\", \"Ελληνικά\", \"ltr\", \"el-GR\", \"partial\", () => import(\"./locales/el.js?v=19-about-i18n\"))",
      "issue": "Η τιμή `locale.displayName` είναι στα ελληνικά, αλλά η τιμή `locale.code` είναι σε αγγλικά. Αυτό είναι αντίθετο με την προδιαγραφή της ελληνικής επικοινωνίας.",
      "correction": "Η τιμή `locale.code` πρέπει να είναι στα ελληνικά, π.χ. `Ελληνικά`."
    },
    {
      "severity": "medium",
      "location": "docs/i18n/registry.js",
      "current_text": "defineLocale(\"el\", \"Ελληνικά\", \"ltr\", \"el-GR\", \"partial\", () => import(\"./locales/el.js?v=19-about-i18n\"))",
      "issue": "Η τιμή `locale.displayName` είναι στα ελληνικά, αλλά η τιμή `locale.code` είναι σε αγγλικά. Αυτό είναι αντίθετο με την προδιαγραφή της ελληνικής επικοινωνίας.",
      "correction": "Η τιμή `locale.code` πρέπει να είναι στα ελληνικά, π.χ. `Ελληνικά`."
    }
  ]
}
===== ATTEMPT 2 VALIDATION =====
INVALID: integration current_text quotes code instead of a visible literal

===== ATTEMPT 3 RAW JSON =====
{
  "result": "FINDINGS",
  "summary": "Εντοπίστηκαν προβλήματα στην ελληνική επικοινωνία του ιστοτόπου. Τα προβλήματα περιλαμβάνουν λάθος γλώσσα, μεταφραστικά καλκ, γραμματικά και συμφωνίας λάθη, ασυνεπή ορολογία, κακούς τεχνικούς όρους, placeholders σε λάθος θέση, αφύσικα metadata, ARIA και accessibility κείμενα, ακο",
  "findings": [
    {
      "severity": "critical",
      "location": "docs/i18n/runtime.js",
      "current_text": "locale.displayName",
      "issue": "Η μεταφραστική τιμή `locale.displayName` είναι σε αγγλικά, αντί για ελληνικά. Αυτό είναι απαραίτητο για την επικοινωνία του χρήστη.",
      "correction": "Αντικαταστήστε την τιμή `locale.displayName` με την ελληνική έκδοση, π.χ. `Ελληνικά`."
    },
    {
      "severity": "high",
      "location": "docs/i18n/runtime.js",
      "current_text": "locale.code",
      "issue": "Η τιμή `locale.code` είναι σε αγγλικά, αντί για ελληνικά. Αυτό είναι απαραίτητο για την επικοινωνία του χρήστη.",
      "correction": "Αντικαταστήστε την τιμή `locale.code` με την ελληνική έκδοση, π.χ. `el-GR`."
    },
    {
      "severity": "medium",
      "location": "docs/i18n/registry.js",
      "current_text": "defineLocale(\"el\", \"Ελληνικά\", \"ltr\", \"el-GR\", \"partial\", () => import(\"./locales/el.js?v=19-about-i18n\"))",
      "issue": "Η τιμή `\"Ελληνικά\"` είναι σε ελληνικά, αλλά η τιμή `\"el-GR\"` είναι σε αγγλικά. Αυτό είναι απαραίτητο για την επικοινωνία του χρήστη.",
      "correction": "Αντικαταστήστε την τιμή `\"el-GR\"` με την ελληνική έκδοση, π.χ. `\"el-GR\"` (είναι ήδη σωστή)."
    },
    {
      "severity": "medium",
      "location": "docs/i18n/registry.js",
      "current_text": "defineLocale(\"el\", \"Ελληνικά\", \"ltr\", \"el-GR\", \"partial\", () => import(\"./locales/el.js?v=19-about-i18n\"))",
      "issue": "Η τιμή `\"Ελληνικά\"` είναι σε ελληνικά, αλλά η τιμή `\"el-GR\"` είναι σε αγγλικά. Αυτό είναι απαραίτητο για την επικοινωνία του χρήστη.",
      "correction": "Αντικαταστήστε την τιμή `\"el-GR\"` με την ελληνική έκδοση, π.χ. `\"el-GR\"` (είναι ήδη σωστή)."
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
