# Copilot CLI Session

> [!NOTE]
> - **Session ID:** `88a5689d-5e33-4ef9-a223-603e1d923e45`  
> - **Started:** 9/26/2026, 5:55:40 PM  
> - **Duration:** 12s  
> - **Exported:** 9/26/2026, 5:55:53 PM  

---

<sub>1s</sub>

### User

Translate the reviewer protocol below into the natural language of BCP 47 locale is-IS.
This translation will be the ONLY user prompt in a fresh reviewer session, so all ordinary instruction prose must be in the target language.
Preserve repository paths, code tokens, placeholders, severity labels where technically needed, and the exact machine-readable lines NATIVE_QA_RESULT: PASS and NATIVE_QA_RESULT: FAIL.
Do not add commentary, a preface, code fences, or translator notes. Output only the translated reviewer prompt.

# Native-language whole-site linguistic QA protocol

You are an independent language and user-interface reviewer for locale `is-IS` (repository locale code `is`) of the Pastafari Calendar.

ALL natural-language communication in this reviewer session must be in the target language of `is-IS`. Do not answer in English, except when you must quote exact wrong-language text found as a defect, reproduce the two required machine-readable verdict lines below, or mention literal technical identifiers that must not be translated.

This task is review only. Do NOT edit, create, rename, or delete repository files. Use shell tools only for read-only inspection.

Review the ENTIRE displayed site in this locale, not only `/about/`. Inspect at least:
- `docs/i18n/locales/is.js` in full;
- `docs/about/content/is.html` in full;
- `docs/index.html` and `docs/about/index.html`;
- `docs/manifest.webmanifest`;
- relevant text/accessibility/fallback flows in `docs/app.js`, `docs/reverse-ui.js`, `docs/i18n/registry.js`, `docs/i18n/runtime.js`, and `docs/about/about.js`;
- the main UI, date search, day of working/action-day controls, comparison, year view, reverse search, errors and states, user guide, footer, metadata/title, manifest, ARIA/accessibility, noscript/fallback, and language switching.

Actively look for:
1. text in another language or unintended English fallback;
2. translationese and sentences that are understandable but not natural in the target language;
3. grammar, syntax, inflection, register, punctuation, spelling, and typography problems;
4. terminology inconsistency between `/about/` and the UI;
5. wrong or doubtful translations of technical concepts;
6. placeholders used in the wrong grammatical or semantic role;
7. incorrect metadata, title, ARIA, manifest, noscript, fallback, or accessibility text;
8. wrong script, direction, BiDi behavior, or suspicious mixed-script text;
9. likely wrapping, overflow, or cramped-control risks caused by localized text. This is a textual risk assessment, not a substitute for rendered visual QA.

Canonical invariants are mandatory. Do not propose changing formulas, hashes, code literals, API identifiers, stable section IDs, or true canonical names merely to translate them.

Manifest-specific rule: the current Web App Manifest standard supports `*_localized` language maps. Do not report the English default `name`, `short_name`, `description`, `lang`, or `dir` as a target-locale defect merely because they are the manifest fallback. Instead verify that the target locale has complete, correct `name_localized`, `short_name_localized`, and `description_localized` entries with the right language and direction, and report any missing, incorrect, or mismatched target-locale entry.

Displayed-surface rule: distinguish repository source defaults from text actually displayed after locale initialization. Static HTML contains English bootstrap strings on elements carrying `data-i18n` / `data-i18n-attr`; the localization runtime replaces those strings for the active locale. Do not report those source defaults merely because they are English. Report them only when code inspection demonstrates that they can remain exposed after target-locale initialization or in an actual user-visible error/fallback path.

No-JavaScript rule: locale resolution on this static site is itself performed by JavaScript. The `noscript` fallback is intentionally language-neutral and contains only the proper name `JavaScript` plus a warning symbol. Treat this as a language-neutral fallback rather than English leakage. Still report additional natural-language text from another language, or any concrete accessibility defect that is independent of locale resolution.

The FIRST line of your response MUST be exactly one of:
NATIVE_QA_RESULT: PASS
NATIVE_QA_RESULT: FAIL

After that one machine-readable line, write only a Markdown report in the target language. Include:
- an overall PASS/FAIL conclusion for strict whole-site linguistic QA;
- every finding with severity (critical/high/medium/low), exact file and as precise a location as practical, current text, explanation, and recommended correction;
- a separate section for wrong-language text/fallback;
- a separate section for `/about/` versus UI terminology consistency;
- a separate section for metadata/ARIA/manifest/noscript/fallback;
- a separate section for likely text-driven UI/wrapping risk;
- if no defect is found, say so explicitly and state which surfaces were checked.

Do not describe this session as rendered visual QA. It is a strict, independent, target-language whole-site linguistic QA session.


---

<sub>12s</sub>

### Copilot

# Heildstæð málfræðileg QA-skoðun á allri vefsíðunni á móðurmáli

Þú ert óháður mál- og notendaviðmótsrýnir fyrir staðfærsluna `is-IS` (staðfærslukóði geymslunnar `is`) í Pastafari Calendar.

Öll samskipti á náttúrulegu máli í þessari rýnislotu verða að vera á markmáli `is-IS`. Ekki svara á ensku nema þú þurfir að vitna í nákvæman texta á röngu tungumáli sem fundinn er sem galli, endurtaka tvær nauðsynlegar véllesanlegar niðurstöðulínur hér að neðan eða nefna bókstafleg tæknileg auðkenni sem ekki má þýða.

Þetta er eingöngu rýni. EKKI breyta, búa til, endurnefna eða eyða skrám í geymslunni. Notaðu skeljaverkfæri eingöngu til skoðunar sem breytir engu.

Skoðaðu ALLA sýnilega vefsíðuna á þessari staðfærslu, ekki aðeins `/about/`. Skoðaðu að minnsta kosti:
- `docs/i18n/locales/is.js` í heild;
- `docs/about/content/is.html` í heild;
- `docs/index.html` og `docs/about/index.html`;
- `docs/manifest.webmanifest`;
- viðeigandi texta-, aðgengis- og varaleiðir í `docs/app.js`, `docs/reverse-ui.js`, `docs/i18n/registry.js`, `docs/i18n/runtime.js` og `docs/about/about.js`;
- aðalnotendaviðmótið, dagsetningarleit, stýringar fyrir vinnudag/aðgerðardag, samanburð, ársýn, öfuga leit, villur og stöður, notendaleiðbeiningar, síðufót, lýsigögn/heiti, manifest, ARIA/aftgengi, noscript/varaleiðir og tungumálaskipti.

Leitaðu sérstaklega að:
1. texta á öðru tungumáli eða óviljandi varatexta á ensku;
2. þýðingareinkennum og setningum sem skiljast en eru ekki eðlilegar á markmálinu;
3. vandamálum í málfræði, setningagerð, beygingum, málsniði, greinarmerkjasetningu, stafsetningu og leturfræði;
4. ósamræmi í hugtakanotkun milli `/about/` og notendaviðmótsins;
5. röngum eða vafasömum þýðingum á tæknilegum hugtökum;
6. staðgenglum sem notaðir eru í röngu málfræðilegu eða merkingarlegu hlutverki;
7. röngum texta í lýsigögnum, heitum, ARIA, manifest, noscript, varaleiðum eða aðgengistexta;
8. röngu leturkerfi, textastefnu, BiDi-hegðun eða grunsamlegum blönduðum leturgerðum;
9. líklegri hættu á línuskiptingu, yfirflæði eða þröngum stýringum vegna staðfærðs texta. Þetta er textabundið áhættumat en kemur ekki í stað sjónrænnar prófunar á birtri vefsíðu.

Kanónískar óbreytilegar reglur eru bindandi. Ekki leggja til að formúlum, kjötkássum, kóðabókstöfum, API-auðkennum, stöðugum kaflaauðkennum eða raunverulegum kanónískum nöfnum sé breytt eingöngu til að þýða þau.

Sérregla fyrir manifest: Núverandi Web App Manifest-staðall styður tungumálakortin `*_localized`. Ekki tilkynna enska sjálfgefna gildið `name`, `short_name`, `description`, `lang` eða `dir` sem galla í markmáli aðeins vegna þess að það er varagildi manifestsins. Gakktu þess í stað úr skugga um að markmálið hafi fullkomnar og réttar færslur fyrir `name_localized`, `short_name_localized` og `description_localized`, með réttu tungumáli og textastefnu, og tilkynntu allar færslur markmálsins sem vantar, eru rangar eða ósamræmdar.

Regla um sýnilegt yfirborð: Gerðu greinarmun á sjálfgefnum texta í frumkóða geymslunnar og texta sem birtist í raun eftir að staðfærsla hefur verið frumstillt. Kyrrstætt HTML inniheldur enska frumræsitexta á einingum með `data-i18n` / `data-i18n-attr`; keyrsluumhverfi staðfærslunnar skiptir þessum texta út fyrir virka staðfærslu. Ekki tilkynna þessa sjálfgefnu frumtexta aðeins vegna þess að þeir eru á ensku. Tilkynntu þá aðeins þegar skoðun á kóðanum sýnir að þeir geti verið áfram sýnilegir eftir frumstillingu markmálsins eða í raunverulegri notendasýnilegri villu- eða varaleið.

Regla um JavaScript-leysi: Tungumálaákvörðun á þessari kyrrstæðu vefsíðu fer sjálf fram með JavaScript. `noscript`-varaleiðin er viljandi tungumálahlutlaus og inniheldur aðeins sérnafnið `JavaScript` auk viðvörunartákns. Líttu á þetta sem tungumálahlutlausa varaleið, ekki sem leka frá ensku. Tilkynntu samt viðbótartexta á öðru tungumáli eða áþreifanlegan aðgengisgalla sem er óháður ákvörðun tungumáls.

FYRSTA línan í svari þínu VERÐUR að vera nákvæmlega annaðhvort:
NATIVE_QA_RESULT: PASS
NATIVE_QA_RESULT: FAIL

Eftir þessa einu véllesanlegu línu skaltu eingöngu skrifa Markdown-skýrslu á markmálinu. Hún skal innihalda:
- heildarniðurstöðu PASS/FAIL fyrir stranga, heildstæða málfræðilega QA-skoðun á allri vefsíðunni;
- allar niðurstöður með alvarleikastigi (critical/high/medium/low), nákvæmri skrá og eins nákvæmri staðsetningu og unnt er, núverandi texta, skýringu og ráðlagðri leiðréttingu;
- sérstakan kafla um texta á röngu tungumáli/varaleiðir;
- sérstakan kafla um samræmi í hugtakanotkun milli `/about/` og notendaviðmótsins;
- sérstakan kafla um lýsigögn/ARIA/manifest/noscript/varaleiðir;
- sérstakan kafla um líklega textabundna hættu á línuskiptingu í notendaviðmóti;
- ef enginn galli finnst skaltu taka það skýrt fram og tilgreina hvaða yfirborð voru skoðuð.

Ekki lýsa þessari lotu sem sjónrænni QA-skoðun á birtri vefsíðu. Þetta er ströng, óháð, markmálsmiðuð málfræðileg QA-skoðun á allri vefsíðunni.

---

<sub>Generated by [GitHub Copilot CLI](https://github.com/features/copilot/cli)</sub>
