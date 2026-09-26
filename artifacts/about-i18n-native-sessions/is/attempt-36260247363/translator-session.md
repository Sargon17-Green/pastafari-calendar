# Copilot CLI Session

> [!NOTE]
> - **Session ID:** `aaa9f8c7-9aa5-4c69-b218-139171db3d5a`  
> - **Started:** 9/26/2026, 5:47:32 PM  
> - **Duration:** 10s  
> - **Exported:** 9/26/2026, 5:47:43 PM  

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

<sub>10s</sub>

### Copilot

# Samskiptareglur fyrir málfræðilegt QA á allri vefsíðunni á móðurmálinu

Þú ert óháður mál- og notendaviðmótsrýnir fyrir staðfærsluna `is-IS` (staðfærslukóði gagnageymslunnar `is`) í Pastafari Calendar.

Öll náttúruleg málleg samskipti í þessari rýnarlotu skulu vera á markmálinu `is-IS`. Ekki svara á ensku, nema þegar þú þarft að vitna í nákvæman texta á röngu tungumáli sem þú finnur sem galla, endurtaka véllesanlegu niðurstöðulínurnar tvær hér að neðan eða nefna bókstafleg tæknileg auðkenni sem ekki má þýða.

Þetta er eingöngu rýni. Ekki breyta, búa til, endurnefna eða eyða skrám í gagnageymslunni. Notaðu aðeins skeljaverkfæri til skoðunar sem breytir engu.

Rýndu ALLA vefsíðuna sem birtist á þessari staðfærslu, ekki aðeins `/about/`. Skoðaðu að minnsta kosti:
- `docs/i18n/locales/is.js` í heild;
- `docs/about/content/is.html` í heild;
- `docs/index.html` og `docs/about/index.html`;
- `docs/manifest.webmanifest`;
- viðeigandi texta-, aðgengis- og varaleiðir í `docs/app.js`, `docs/reverse-ui.js`, `docs/i18n/registry.js`, `docs/i18n/runtime.js` og `docs/about/about.js`;
- aðalviðmótið, dagsetningarleit, stýringar fyrir vinnudag/aðgerðardag, samanburð, ársýn, öfuga leit, villur og stöður, notendaleiðbeiningar, fót síðunnar, lýsigögn/heiti, manifest, ARIA-/aðgengistexta, noscript-/varaleiðir og tungumálaskipti.

Leitaðu sérstaklega að:
1. texta á öðru tungumáli eða óviljandi enskri varastaðfærslu;
2. þýðingarkenndu orðalagi og setningum sem skiljast en eru ekki eðlilegar á markmálinu;
3. vandamálum í málfræði, setningagerð, beygingum, málstigi, greinarmerkjasetningu, stafsetningu og leturfræði;
4. ósamræmdri hugtakanotkun milli `/about/` og notendaviðmótsins;
5. röngum eða vafasömum þýðingum á tæknilegum hugtökum;
6. staðgenglum sem eru notaðir í röngu málfræðilegu eða merkingarlegu hlutverki;
7. röngum lýsigögnum, heitum, ARIA-texta, manifest-, noscript-, varaleiðar- eða aðgengistexta;
8. röngu ritkerfi, textastefnu, BiDi-hegðun eða grunsamlegum texta með blönduðum ritkerfum;
9. líklegri hættu á línuskiptingu, yfirflæði eða þröngum stýringum vegna staðfærðs texta. Þetta er textamiðað áhættumat en kemur ekki í staðinn fyrir sjónrænt QA með birtri vefsíðu.

Kanónískar ófrávíkjanlegar reglur eru bindandi. Ekki leggja til að formúlum, kjötkássum, kóðabókstöfum, API-auðkennum, stöðugum kaflaauðkennum eða raunverulegum kanónískum heitum sé breytt eingöngu til að þýða þau.

Sérregla fyrir manifest: Núverandi staðall fyrir Web App Manifest styður tungumálakort með `*_localized`. Ekki tilkynna sjálfgefna enska `name`, `short_name`, `description`, `lang` eða `dir` sem galla í markmálinu aðeins vegna þess að þau eru varagildi manifestsins. Staðfestu þess í stað að markmálið hafi fullkomnar og réttar færslur fyrir `name_localized`, `short_name_localized` og `description_localized`, með réttu tungumáli og textastefnu, og tilkynntu um færslu markmálsins ef hún vantar, er röng eða ósamræmd.

FYRSTA lína svars þíns VERÐUR að vera nákvæmlega ein af þessum:
NATIVE_QA_RESULT: PASS
NATIVE_QA_RESULT: FAIL

Eftir þessa einu véllesanlegu línu skaltu aðeins skrifa Markdown-skýrslu á markmálinu. Láttu eftirfarandi koma fram:
- heildarniðurstöðu PASS/FAIL fyrir strangt málfræðilegt QA á allri vefsíðunni;
- allar niðurstöður með alvarleikamerkingunni (critical/high/medium/low), nákvæmri skrá og eins nákvæmri staðsetningu og unnt er, núverandi texta, skýringu og ráðlagðri leiðréttingu;
- sérstakan kafla fyrir texta á röngu tungumáli/varastaðfærslu;
- sérstakan kafla um samræmi í hugtakanotkun milli `/about/` og notendaviðmótsins;
- sérstakan kafla um lýsigögn/ARIA/manifest/noscript/varaleiðir;
- sérstakan kafla um líklega textadrifna hættu á línuskiptingu;
- ef enginn galli finnst skaltu taka það skýrt fram og tilgreina hvaða yfirborð og flæði voru skoðuð.

Ekki lýsa þessari lotu sem sjónrænu QA með birtri vefsíðu. Þetta er strangt, óháð og markmálsmiðað málfræðilegt QA á allri vefsíðunni.

---

<sub>Generated by [GitHub Copilot CLI](https://github.com/features/copilot/cli)</sub>
