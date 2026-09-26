# Copilot CLI Session

> [!NOTE]
> - **Session ID:** `012a8dec-f628-4e3f-bdab-d4ad224bff7b`  
> - **Started:** 9/26/2026, 8:45:33 PM  
> - **Duration:** 13s  
> - **Exported:** 9/26/2026, 8:45:46 PM  

---

<sub>1s</sub>

### User

Translate the reviewer protocol below completely and naturally into the human language named Íslenska.
The translated text will be the FIRST AND ONLY user message in a fresh reviewer session. Therefore every ordinary instruction sentence must be in the target language from its first line onward.
Preserve repository names, branch names, paths, code identifiers, placeholders, formulas, and every token beginning __PASTAFARI_ exactly byte-for-byte.
Use the correct Unicode script for every target-language word. Do not substitute visually similar letters from another script. Before returning the prompt, silently proofread it for mixed-script confusables.
Each __PASTAFARI_ sentinel occurs exactly once in the source and must occur exactly once in the translated output. Do not add a verdict, preface, explanation, translator note, or code fence.
The first non-empty line of your output must be translated target-language prose, not a __PASTAFARI_ sentinel.
Output only the translated seed prompt.

# Cross-repository native-language reviewer protocol source

You are an independent native-language linguistic, semantic, documentation, and user-interface reviewer for the Pastafarian Calendar project.

The target review unit is Íslenska (review id `is`; locale/tag `is-IS`).

__PASTAFARI_REVIEW_ID_LINE__
__PASTAFARI_LOCALE_TAG_LINE__

ALL natural-language communication in this reviewer session must be in Íslenska. The very first user message is this translated prompt, and every natural-language part of your response must remain in Íslenska. Do not switch to English. Exact repository names, branch names, paths, identifiers, code literals, formulas, hashes, API names, and the required machine-readable verdict line are exempt.

This is a fresh isolated reviewer session. It is review-only: do not edit, create, rename, or delete repository files.

There are two repositories. Inspect every applicable surface listed in the local review manifest:
1. Sargon17-Green/pastafari-calendar — when this review unit has a site locale, inspect the ENTIRE site for that locale, not only /about/. Read the full locale file and /about/ article, and inspect main UI, date search, calendar selection, action/day-of-working controls, comparison, year view, reverse search, loading/empty/error/validation states, guide, footer, metadata/title, manifest localization, noscript/fallback paths, ARIA/accessibility strings, language switching and likely stale fallback behavior. Check the message-key contract, placeholder semantic roles, stable IDs and canonical literals.
   Also inspect the target-language `\<details data-locale="...">` entry in `docs/no-js/index.html`. The other languages’ self-names in that page are an intentional static language chooser, analogous to a language selector, and are not wrong-language leakage merely by being present. Prose inside another language’s collapsed `\<details>` is likewise intentional; report it only if it becomes visible or is used as fallback for the target language.
2. Sargon17-Green/Pastafarian-Calendar — inspect EVERY branch listed for this review unit. Review all text intended for humans: README and documentation, headings/prose, explanatory documentation comments, CLI help, prompts, errors, output labels, metadata, examples and generated documentation. Do not translate programming-language syntax, identifiers, hashes, formulas, API names or canonical code literals.

Treat the local file artifacts/cross-repo-native-qa/runtime/review-manifest.json as authoritative for which repository surfaces and exact frozen commit SHAs belong to this review unit. If a branch or commit does not match the manifest, FAIL and report the mismatch rather than reviewing a moving target.

Actively look for:
- understandable but non-native translationese;
- wrong-language text, English leakage, fallback from a neighboring language, or mixed scripts;
- grammar, inflection, case, agreement, word order, spelling, punctuation, register and collocation problems;
- terminology inconsistency between the site UI, /about/, and implementation branches;
- technically wrong translations or wording that changes an algorithmic fact;
- placeholders used in the wrong semantic role even when the placeholder set itself matches;
- Unicode corruption, wrong-script characters, BiDi problems, and RTL/LTR punctuation problems where applicable;
- metadata, title, ARIA, screen-reader text, manifest localization, fallback and no-JavaScript problems;
- likely wrapping/overflow risks caused by the target-language text. This last item is only textual risk assessment and MUST NOT be described as rendered visual QA.

Canonical invariants are mandatory. Do not propose translating or changing formulas, hashes, stable section IDs, API identifiers, exact code literals, or true canonical names merely for stylistic consistency.

Cross-repository consistency is semantic, not necessarily literal. Different wording is allowed when both forms are natural and preserve the same concept. If one form changes technical meaning, report it.

For materially distinct variants/scripts represented by separate review units, review only the variant named by this prompt and manifest.

The FIRST line of your response MUST be exactly one of:
__PASTAFARI_NATIVE_QA_PASS__
__PASTAFARI_NATIVE_QA_FAIL__

After that line, write a Markdown report only in Íslenska. Include:
- overall PASS/FAIL for strict cross-repository linguistic/semantic QA;
- every finding with severity (critical/high/medium/low), exact repository, branch, file and precise location when possible, current text, explanation and recommended correction;
- a separate wrong-language/fallback section;
- a separate terminology-consistency section;
- a separate metadata/ARIA/manifest/noscript/fallback section when the site locale exists;
- a separate section for implementation-branch documentation and user-facing text;
- a separate text-driven UI/wrapping-risk section when the site locale exists;
- if no defect is found, say so explicitly and state the surfaces you actually checked.

Do not claim rendered visual QA, accessibility interaction testing, offline/PWA runtime testing, or browser interaction testing unless actual runtime evidence is provided separately. This session is the native-language linguistic/semantic gate only.


---

<sub>13s</sub>

### Copilot

# Upprunaleg samskiptaregla fyrir yfirferð á móðurmáli milli geymslusvæða

Þú ert óháður yfirferðarfulltrúi á móðurmáli fyrir Pastafarian Calendar-verkefnið og metur málfar, merkingu, skjöl og notendaviðmót.

Yfirferðareiningin er Íslenska (yfirferðarauðkenni `is`; staðfærsla/merki `is-IS`).

__PASTAFARI_REVIEW_ID_LINE__
__PASTAFARI_LOCALE_TAG_LINE__

Öll samskipti með náttúrulegu máli í þessari yfirferðarlotu skulu vera á Íslensku. Fyrstu notendaskilaboðin eru þessi þýdda fyrirmæli og allur náttúrulegur texti í svari þínu skal áfram vera á Íslensku. Ekki skipta yfir í ensku. Nákvæm heiti geymslusvæða, heiti greina, slóðir, auðkenni, kóðabókstafir, formúlur, kjötkássar, API-heiti og áskilin véllesanleg niðurstaðalína eru undanþegin.

Þetta er ný og einangruð yfirferðarlota. Hún er eingöngu fyrir yfirferð: ekki breyta, búa til, endurnefna eða eyða skrám í geymslusvæðum.

Það eru tvö geymslusvæði. Skoðaðu hvert viðeigandi yfirborð sem talið er upp í staðbundna yfirferðar-yfirlitinu:
1. Sargon17-Green/pastafari-calendar — þegar þessi yfirferðareining hefur staðfærða útgáfu af vefsvæði skal skoða ALLT vefsvæðið fyrir þá staðfærslu, ekki aðeins /about/. Lestu alla staðfærsluskrána og /about/-greinina og skoðaðu aðalnotendaviðmót, dagsetningarleit, val á dagatali, aðgerða-/vinnudagsstýringar, samanburð, ársýn, öfuga leit, stöður fyrir hleðslu/tómt/​​villu/staðfestingu, leiðbeiningar, fót, lýsigögn/heiti, staðfærslu upplýsingaskrár, noscript-/varaleiðir, ARIA-/aðgengisstrengi, tungumálaskipti og líklega úrelta varatexta. Athugaðu samninginn um skilaboðalykla, merkingarhlutverk staðgengla, stöðug auðkenni og kanónískar bókstaflegar gildisfærslur.
   Skoðaðu einnig færsluna fyrir markmálið `\<details data-locale="...">` í `docs/no-js/index.html`. Sjálfsheiti hinna tungumálanna á þeirri síðu eru viljandi kyrrstætt tungumálaval, hliðstætt tungumálavali, og teljast ekki texti á röngu tungumáli aðeins vegna þess að þau eru til staðar. Texti inni í samanbrotnu `\<details>`-svæði annars tungumáls er sömuleiðis viljandi; tilkynntu aðeins um hann ef hann verður sýnilegur eða er notaður sem varatexti fyrir markmálið.
2. Sargon17-Green/Pastafarian-Calendar — skoðaðu HVERJA grein sem er skráð fyrir þessa yfirferðareiningu. Farðu yfir allan texta sem ætlaður er fólki: README og skjöl, fyrirsagnir og meginmál, útskýringar í skjölum kóða, hjálpartexta CLI, ábendingar, villur, merkingar í úttaki, lýsigögn, dæmi og mynduð skjöl. Ekki þýða setningafræði forritunarmáls, auðkenni, kjötkássa, formúlur, API-heiti eða kanónískar kóðabókstafi.

Líttu sérstaklega eftir:
- skiljanlegum en ómóðurmállegum þýðingastíl;
- texta á röngu tungumáli, enskum leka, varatexta úr nærliggjandi tungumáli eða blönduðum skriftum;
- vandamálum í málfræði, beygingum, föllum, samræmi, orðaröð, stafsetningu, greinarmerkjum, málfari og orðasamböndum;
- ósamræmi í hugtakanotkun milli notendaviðmóts vefsins, /about/ og útfærslugreina;
- tæknilega röngum þýðingum eða orðalagi sem breytir staðreynd um reiknirit;
- staðgenglum sem eru notaðir í röngu merkingarhlutverki, jafnvel þótt mengi staðgengla passi;
- skemmdum Unicode-texta, stöfum úr rangri skrift, BiDi-vandamálum og vandamálum með greinarmerki í RTL/LTR þar sem það á við;
- lýsigögnum, heiti, ARIA, skjálestrartexta, staðfærslu upplýsingaskrár, varatexta og no-JavaScript-vandamálum;
- líklegri hættu á línubroti eða yfirflæði vegna texta á markmálinu. Síðasti liðurinn er aðeins textatengt áhættumat og MÁ EKKI lýsa honum sem sjónrænni gæðaprófun eftir birtingu.

Kanónískar ófrávíkjanlegar reglur eru bindandi. Ekki leggja til að formúlur, kjötkássar, stöðug kaflaauðkenni, API-auðkenni, nákvæmir kóðabókstafir eða raunveruleg kanónísk heiti verði þýdd eða breytt eingöngu vegna stílsamræmis.

Samræmi milli geymslusvæða er merkingarlegt, ekki endilega orðrétt. Mismunandi orðalag er leyfilegt þegar bæði form eru eðlileg og varðveita sama hugtak. Ef annað formið breytir tæknilegri merkingu skal tilkynna það.

Fyrir efnislega ólíkar afbrigði eða skriftir sem eru táknuð með aðskildum yfirferðareiningum skaltu aðeins fara yfir það afbrigði sem nefnt er í þessum fyrirmælum og yfirlitinu.

FYRSTA lína svars þíns VERÐUR að vera nákvæmlega ein af þessum:
__PASTAFARI_NATIVE_QA_PASS__
__PASTAFARI_NATIVE_QA_FAIL__

Eftir þá línu skaltu aðeins skrifa Markdown-skýrslu á Íslensku. Hún skal innihalda:
- heildarniðurstöðu PASS/FAIL fyrir stranga málfars- og merkingarlega gæðatryggingu þvert á geymslusvæði;
- allar niðurstöður með alvarleikastigi (critical/high/medium/low), nákvæmu geymslusvæði, grein, skrá og nákvæmri staðsetningu þegar það er mögulegt, núverandi texta, útskýringu og ráðlagðri leiðréttingu;
- sérstakan kafla um texta á röngu tungumáli/varatexta;
- sérstakan kafla um samræmi í hugtakanotkun;
- sérstakan kafla um lýsigögn/ARIA/upplýsingaskrá/noscript/varatexta þegar staðfærð útgáfa vefsins er til;
- sérstakan kafla um skjöl og texta fyrir notendur í útfærslugreinum;
- sérstakan kafla um textatengda áhættu á línubroti eða yfirflæði í notendaviðmóti þegar staðfærð útgáfa vefsins er til;
- ef enginn galli finnst skaltu taka það skýrt fram og tilgreina hvaða yfirborð þú skoðaðir í reynd.

Ekki halda því fram að sjónræn gæðaprófun eftir birtingu, prófun á aðgengissamskiptum, prófun á keyrslu án nettengingar/PWA eða prófun á samskiptum í vafra hafi farið fram nema sérstök keyrslugögn liggi fyrir. Þessi lota er eingöngu málfarsleg og merkingarleg hlið náttúrulegs máls.

---

<sub>Generated by [GitHub Copilot CLI](https://github.com/features/copilot/cli)</sub>
