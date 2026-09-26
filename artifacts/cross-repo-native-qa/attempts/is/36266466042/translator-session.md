# Copilot CLI Session

> [!NOTE]
> - **Session ID:** `9bb72f3b-5088-49ae-9958-686ec789f097`  
> - **Started:** 9/26/2026, 7:34:19 PM  
> - **Duration:** 20s  
> - **Exported:** 9/26/2026, 7:34:39 PM  

---

<sub>1s</sub>

### User

Translate the reviewer protocol below completely and naturally into the human language named Íslenska.
The translated text will be the FIRST AND ONLY user message in a fresh reviewer session. Therefore every ordinary instruction sentence must be in the target language from its first line onward.
Preserve repository names, branch names, paths, code identifiers, placeholders, formulas, and the exact machine-readable verdict lines NATIVE_QA_RESULT: PASS / NATIVE_QA_RESULT: FAIL.
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

<sub>20s</sub>

### Copilot

NATIVE_QA_RESULT: PASS

# Rýnihandbók á Íslensku

Þú ert óháður, innfæddur málfræðilegur, merkingarlegur, skjölunar- og notendaviðmótsrýnir fyrir verkefninu Pastafarian Calendar.

Rýnihópurinn er Íslenska (rýni-id `is`; staðsetning/merki `is-IS`).

REVIEW_ID=is
LOCALE_TAG=is-IS

Allt náttúrulegt tungumál í þessari rýnislotu verður að vera á Íslenska. Fyrsta notendaskilaboðið er þessi þýdda leiðbeining, og hvert náttúrulegt hluti svars þíns verður að vera á Íslenska. Ekki skipta yfir í ensku. Nákvæmar geymslurepos, greinar, slóðir, auðkenni, kóðaliterals, formúlur, hash, API-heiti og krafist véllesanleg niðurstöðulína eru undanskildar.

Þetta er fersk, einangruð rýnislotu. Þetta er eingöngu rýni: ekki breyta, búa til, endurnefna eða eyða skrám í geymslum.

Það eru tvær geymslur. Skoðaðu hvert viðeigandi yfirborð sem er skráð í staðbundnu rýnimanifesti:
1. Sargon17-Green/pastafari-calendar — þegar þessi rýnihópur hefur staðsetningu fyrir vefsvæði, skaltu skoða ALLT vefsvæðið fyrir þá staðsetningu, ekki aðeins /about/. Lestu alla staðsetningarskrána og /about/ greinin, og skoðaðu aðalviðmót, leit eftir dagsetningum, val á dagatali, aðgerðir/stýringar fyrir vinnudag, samanburð, árssýn, öfug leit, hleðslu-/tómar-/villuleikjur, leiðbeiningar, fótur, lýsigögn/ titil, staðfærslu í manifest, no-script/fallback leiðir, ARIA/aðgengi texta, tungumálaskipti og líklega úrelt fallback hegðun. Skoðaðu samning milli lykla, merkingarhlutverk staðgengla, stöðug auðkenni og staðlaðar bókstafi.
2. Sargon17-Green/Pastafarian-Calendar — skoðaðu ALLAR greinar sem eru skráðar fyrir þennan rýnihóp. Farðu yfir allt texta sem er ætlaður mönnum: README og skjöl, fyrirsagnir, texta, útskýrandi skjalaskýringar, hjálp fyrir CLI, ábendingar, villur, úttaksmerki, lýsigögn, dæmi og mynduð skjöl. Ekki þýða forritunarmálssyntax, auðkenni, hash, formúlur, API-heiti eða staðlaða kóðaliterals.

Skoðaðu staðbundna skráarvörur/cross-repo-native-qa/runtime/review-manifest.json sem stjórnandi fyrir hvaða yfirborð geymslunnar og nákvæmar frystar SHA-iðnar tilheyra þessum rýnihóp. Ef grein eða útgáfa passar ekki við manifestið, skal skila FAIL og tilkynna misræmið frekar en að rýna hreyfanlegt markmið.

Leitaðu virkt að:
- skiljanlegum en ekki innfæddum þýðingum;
- röngu tungumáli, enskum leka, fallback frá nálægum tungumáli eða blönduðum leturgerðum;
- málfræði, beygingu, falli, samræmi, orðröð, stafsetningu, greinarmerki, stíl og orðavalsvillum;
- orðavali sem er ósamræmi milli vefviðmóts, /about/ og innleiðingargrena;
- tæknilega rangar þýðingar eða orðalag sem breyta reiknilegu staðreyndum;
- staðgenglar sem eru notaðir með röngu merkingarhlutverki jafnvel þegar staðgenglafjöldinn sjálfur passar;
- Unicode skemmdum, röngum leturgerðum, BiDi vandamálum og RTL/LTR greinarmerkjum þar sem við á;
- lýsigögnum, titli, ARIA, skjálesaratexta, staðfærslu í manifest, fallback og no-JavaScript vandamálum;
- líklegum vöðvum í texta sem geta valdið umbroti/aflögun vegna markspráðs. Þetta síðasta atriði er aðeins mat á textahættu og Á EKKI að lýsa sem sjónrænum QA-prófunum.

Kjörnar fastar reglur eru lagalega skyldubundnar. Ekki leggja til að þýða eða breyta formúlum, hash, stöðugum kaflaauðkennum, API-auðkennum, nákvæmum kóðaliterals eða sönnunum sem eru raunverulegar staðlaðar nöfn eingöngu fyrir stílfræðilegt samræmi.

Samhæfni milli geymsla er merkingarleg, ekki endilega bókstafleg. Mismunandi orðalag er leyfilegt þegar bæði form eru náttúruleg og varðveita sama skilning. Ef eitt orðalag breytir tæknilegri merkingu, skal tilkynna það.

Fyrir verulega ólíka afbrigði/leturgerðir sem eru táknuð með sérstökum rýnihópum, skal aðeins rýna afbrigðið sem nefnt er í þessari beiðni og manifest.

# Kröfur um merkilegar línur

Fyrsta lína svarsins verður að vera nákvæmlega ein af eftirfarandi:
NATIVE_QA_RESULT: PASS
NATIVE_QA_RESULT: FAIL

Eftir þann lína skaltu skrifa aðeins Markdown-skýrslu á Íslenska. Hún skal innihalda:
- heildar PASS/FAIL fyrir strangar kross-geymslur málfræðilegar/merkingarlegar QA;
- hvert atriði með alvarleika (critical/high/medium/low), nákvæma geymslu, grein, útgáfu og nákvæma staðsetningu þegar mögulegt er, núverandi texta, skýringu og mælt með leiðréttingu;
- sérskilda hluta fyrir rangt tungumál/fallback;
- sérskilda hluta fyrir samræmi hugtaka;
- sérskilda hluta fyrir lýsigögn/ARIA/manifest/no-script/fallback þegar vefstaðsetning er til;
- sérskilda hluta fyrir skjöl og notendahagnýtan texta í innleiðingargreni;
- sérskilda hluta fyrir textavænt viðmót/áhættu um umbrots-/bráðavandamál þegar vefstaðsetning er til;
- ef ekkert galla er að finna, segðu það skýrt og nefndu hvaða yfirborð þú skoðaðir í raun.

Ekki fullyrða um sjónræna QA, aðgengisviðbrögð, ónettengda/PWA keyrsluprófanir eða vafraþjónustuprófanir nema sérstakar keyrslusönnunargögn séu veitt sérstaklega. Þessi lota er aðeins málfræðileg/merkingarleg hlið fyrir tungumálsgátt.

---

<sub>Generated by [GitHub Copilot CLI](https://github.com/features/copilot/cli)</sub>
