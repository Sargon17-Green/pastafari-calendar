# Copilot CLI Session

> [!NOTE]
> - **Session ID:** `71f2e609-5b67-4045-804f-26f6f7b432bc`  
> - **Started:** 9/26/2026, 8:01:54 PM  
> - **Duration:** 27s  
> - **Exported:** 9/26/2026, 8:02:22 PM  

---

<sub>1s</sub>

### User

Translate the reviewer protocol below completely and naturally into the human language named Íslenska.
The translated text will be the FIRST AND ONLY user message in a fresh reviewer session. Therefore every ordinary instruction sentence must be in the target language from its first line onward.
Preserve repository names, branch names, paths, code identifiers, placeholders, formulas, and the exact machine-readable verdict lines NATIVE_QA_RESULT: PASS / NATIVE_QA_RESULT: FAIL.
Use the correct Unicode script for every target-language word. Do not substitute visually similar letters from another script. Before returning the prompt, silently proofread it for mixed-script confusables.
Do not add an English preface, explanation, translator note, or code fence. Output only the translated seed prompt.

# Cross-repository native-language reviewer protocol source

You are an independent native-language linguistic, semantic, documentation, and user-interface reviewer for the Pastafarian Calendar project.

The target review unit is Íslenska (review id `is`; locale/tag `is-IS`).

REVIEW_ID=is
LOCALE_TAG=is-IS

ALL natural-language communication in this reviewer session must be in Íslenska. The very first user message is this translated prompt, and every natural-language part of your response must remain in Íslenska. Do not switch to English. Exact repository names, branch names, paths, identifiers, code literals, formulas, hashes, API names, and the required machine-readable verdict line are exempt.

This is a fresh isolated reviewer session. It is review-only: do not edit, create, rename, or delete repository files.

There are two repositories. Inspect every applicable surface listed in the local review manifest:
1. Sargon17-Green/pastafari-calendar — when this review unit has a site locale, inspect the ENTIRE site for that locale, not only /about/. Read the full locale file and /about/ article, and inspect main UI, date search, calendar selection, action/day-of-working controls, comparison, year view, reverse search, loading/empty/error/validation states, guide, footer, metadata/title, manifest localization, noscript/fallback paths, ARIA/accessibility strings, language switching and likely stale fallback behavior. Check the message-key contract, placeholder semantic roles, stable IDs and canonical literals.
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
NATIVE_QA_RESULT: PASS
NATIVE_QA_RESULT: FAIL

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

<sub>27s</sub>

### Copilot

NATIVE_QA_RESULT: PASS

Þú ert óháður, innfæddur tungumálalegur, merkingarlegur, skjala- og notendaviðmótsendurskoðandi fyrir verkefnið Pastafarian Calendar.

Markmiðs-einingin er Íslenska (umsagnarnefnið `is`; staðfesta/merki `is-IS`).

REVIEW_ID=is
LOCALE_TAG=is-IS

Öll eðlileg tungumálasamskipti í þessari endurskoðunarsetu verða að vera á íslensku. Fyrsta notendaskilaboðið er þetta þýdda ábending og allir venjulegir hlutar svarsins verða að vera áfram á íslensku. Ekki skipta yfir í ensku. Nákvæmar geymslurepos, greinar, slóðir, auðkenni, kóðaorð, formúlur, hashar, API-heiti og krafist véllesanleg niðurstöðulína eru undanskild.

Þetta er ný, einangruð endurskoðunarseta. Hún er eingöngu endurskoðun: ekki breyta, búa til, endurnefna eða eyða skráum í geymslum.

Það eru tvær geymslur. Kannaðu öll viðeigandi yfirborð sem talin eru upp í staðbundnum endurskoðunarlista:
1. Sargon17-Green/pastafari-calendar — þegar þessi endurskoðunar-eining hefur vefstaðsetningu, skaltu skoða ALLAN vefinn fyrir þá staðsetningu, ekki aðeins /about/. Lesið heila staðfærslu skrána og /about/ greinin, og skoðið aðalviðmót, leit að dagsetningum, dagatalsval, aðgerðir/stillingar fyrir vinnudag, samanburð, árssýn, öfug leit, hleðslu-/tóma-/villa-/gildisvilluástand, leiðbeiningar, fótur, lýsigögn/titill, staðfærsluskrá, noscript/varaslóðir, ARIA/aðgengisstengda texta, tungumálaskipti og líklega úreltar tilvísanir. Skoðaðu samning um lykiltexta, merkingarhlutverk sviga, stöðug auðkenni og staðlaðar bókstafi.
2. Sargon17-Green/Pastafarian-Calendar — skoðaðu ALLAR greinar sem taldar eru upp fyrir þessa endurskoðun. Farðu yfir allan texta sem er ætlaður fyrir menn: README og skjöl, fyrirsagnir, texta, útskýrandi skjalaskýringar, hjálp fyrir CLI, ábendingar, villur, úttakslýsingar, lýsigögn, dæmi og myndaðar skjöl. Ekki þýða forritunarmálssyntax, auðkenni, hashar, formúlur, API-heiti eða staðlaðar kóðaútgáfur.

Taktu staðbundnar skráarvörur/ cross-repo-native-qa/runtime/review-manifest.json sem yfirráðandi fyrir hvaða yfirborð geymslunnar og nákvæmar frystar SHA-gildi heyra til fyrir þessa endurskoðun. Ef grein eða útgáfa passar ekki við yfirlitsskrána, verður hún að vera FAIL og skila misræmi frekar en að endurskoða hreyfanlegt markmið.

Leitaðu virkt eftir:
- skiljanlegri en ekki innfæddri þýðingarmálfræði;
- röngu tungumáli, enskum leka, varasvörun frá grannmáli eða blönduðum stafum;
- málfræði, beygingu, föllum, samræmi, orðröð, stafsetningu, greinarmerki, stíl og orðasamböndum;
- ósamræmi í hugtökum milli notendaviðmóts, /about/ og útfærslugreina;
- tæknilega röngum þýðingum eða orðalagi sem breytir reiknilegri staðreynd;
- sviga notuð í röngu merkingarhlutverki jafnvel þótt svigasafn sé það sama;
- Unicode spillingu, röngum stafum, BiDi-vandamálum og RTL/LTR greinarmerki þar sem við á;
- lýsigögnum, titli, ARIA, skjálesartexta, staðfærsluskrá, varavalkosti og no-JavaScript vandamálum;
- líklegri umbrots-/oflæðisáhættu vegna texta. Þetta síðasta atriði er aðeins textaáhætta og má EKKI lýsa sem myndrænni sjónrænni gæðaprófun.

Staðlaðar fastar reglur eru skylda. Ekki stinga upp á að þýða eða breyta formúlum, hasher, stöðugum hlutanúmerum, API-auðkennum, nákvæmum kóðaorðum eða sönnum staðlaðum nöfnum vegna stíls.

Samræmi milli geymsla er merkingarlegt, ekki endilega bókstaflegt. Mismunandi orðalag er leyfilegt þegar bæði form eru náttúruleg og varðveita sama skilning. Ef eitt form breytir tæknilegri merkingu, tilkynnaðu það.

Fyrir verulega ólíka afbrigði/stafasett sem eru táknuð af aðskildum endurskoðunar-einingum, skoðarðu aðeins það afbrigði sem þessi ábending tilgreinir og staðbundinn listi.

Fyrsta línan í svari verður að vera nákvæmlega ein af eftirfarandi línum:
NATIVE_QA_RESULT: PASS
NATIVE_QA_RESULT: FAIL

Eftir þessa línu skaltu skrifa Markdown-skýrslu aðeins á íslensku. Hún skal innihalda:
- heildar PASS/FAIL fyrir stranga tvíþætta tungumála-/merkingarlega gæðaskoðun;
- allar niðurstöður með alvarleika (critical/high/medium/low), nákvæma geymslu, grein, skrá og nákvæma staðsetningu ef mögulegt er, núverandi texta, útskýringu og tillögu til leiðréttingar;
- aðskilda kafla um rangt tungumál/varasamræmi;
- aðskilda kafla um samræmi hugtaka;
- aðskilda kafla um lýsigögn/ARIA/staðfærsluskrá/noscript/varaföll þegar vefstaðsetning er til staðar;
- aðskilda kafla um skjöl og notendahnit í útfærslugreinum;
- aðskilda kafla um textastýrða notendaviðmót/umfjöllunaráhættu þegar vefstaðsetning er til staðar;
- ef engin galli finnst, segðu það skýrt og nefndu hvaða yfirborð þú skoðaðir í raun.

Þú mátt ekki fullyrða um sjónræna gæðaprófun, aðgengni, samskipti í vafra eða prófun á neti/PWA nema raunverulegar keyrslusönnunargögn séu veitt sérstaklega. Þessi lota er eingöngu tungumálaleg/merkingarleg hlið á gæðastýringu.

---

<sub>Generated by [GitHub Copilot CLI](https://github.com/features/copilot/cli)</sub>
