# Copilot CLI Session

> [!NOTE]
> - **Session ID:** `210becc1-2f78-458e-b0da-e7c7ae48958b`  
> - **Started:** 9/26/2026, 8:27:57 PM  
> - **Duration:** 22s  
> - **Exported:** 9/26/2026, 8:28:20 PM  

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

<sub>22s</sub>

### Copilot

Þú ert óháður móðurmálsmælandi yfirlesari Pastafarian Calendar-verkefnisins og metur málfar, merkingu, skjölun og notendaviðmót.

Yfirlestrarmálið er Íslenska (yfirlestrarauðkenni `is`; staðfærsla/staðsetningarmerki `is-IS`).

__PASTAFARI_REVIEW_ID_LINE__
__PASTAFARI_LOCALE_TAG_LINE__

Öll samskipti á náttúrulegu máli í þessari yfirlestrarlotu skulu vera á Íslenska. Fyrstu skilaboðin frá notanda eru þessi þýdda fyrirmæli og allir hlutar svars þíns sem eru á náttúrulegu máli skulu áfram vera á Íslenska. Skiptu ekki yfir í ensku. Nákvæm heiti gagnasafna, heiti greina, slóðir, auðkenni, kóðastrengir, formúlur, kjötkássur, API-heiti og áskilin vélræn niðurstöðulína eru undanskilin.

Þetta er ný yfirlestrarlota í einangruðu umhverfi. Aðeins skal yfirlesa: ekki breyta, búa til, endurnefna eða eyða skrám í gagnasafni.

Það eru tvö gagnasöfn. Skoðaðu öll viðeigandi svæði sem tilgreind eru í staðbundnu yfirlestrarskránni:
1. Sargon17-Green/pastafari-calendar — þegar yfirlestrareiningin hefur staðfærslu fyrir vefsvæðið skaltu skoða ALLT vefsvæðið á því tungumáli, ekki aðeins /about/. Lestu alla staðfærsluskrána og greinina á /about/ og skoðaðu aðalnotendaviðmót, dagsetningaleit, dagatalsval, stýringar fyrir aðgerð/dag vinnu, samanburð, ársýn, öfuga leit, hleðslu-, tóma-, villu- og sannprófunarástand, leiðarvísi, síðufót, lýsigögn/titil, staðfærslu í upplýsingaskrá, noscript-/varaleiðir, ARIA-/aðgengisstrengi, tungumálaskipti og líklega úrelta varatextahegðun. Athugaðu samning um skilaboðalykla, merkingarhlutverk staðgengla, stöðug auðkenni og kanóníska strengi.
   Skoðaðu einnig færsluna fyrir markmálið í `\<details data-locale="...">` í `docs/no-js/index.html`. Heiti hinna tungumálanna á þeirri síðu eru viljandi hluti af kyrrstæðu tungumálavali, líkt og tungumálaval, og teljast ekki óæskilegur texti á röngu tungumáli. Texti í lokuðu `\<details>`-svæði á öðru tungumáli er sömuleiðis viljandi; tilkynntu aðeins um hann ef hann birtist eða er notaður sem varatexti fyrir markmálið.
2. Sargon17-Green/Pastafarian-Calendar — skoðaðu ALLAR greinar sem taldar eru upp fyrir þessa yfirlestrareiningu. Farðu yfir allan texta sem ætlaður er fólki: README og skjöl, fyrirsagnir/texta, útskýringar í skjölunarathugasemdum, hjálpartexta skipanalínu, fyrirmæli, villur, úttaksmerkingar, lýsigögn, dæmi og útbúin skjöl. Ekki þýða málskipan forritunarmála, auðkenni, kjötkássur, formúlur, API-heiti eða kanóníska kóðastrengi.

Líttu á staðbundnu skrána `artifacts/cross-repo-native-qa/runtime/review-manifest.json` sem endanlega heimild um hvaða svæði gagnasafnanna og nákvæmu, frystu innritunarauðkenni tilheyra þessari yfirlestrareiningu. Ef grein eða innritun passar ekki við skrána skaltu fella yfirferðina og tilkynna misræmið í stað þess að yfirfara breytilegan markpunkt.

Leitaðu sérstaklega að:
- þýðingarmáli sem er skiljanlegt en hljómar ekki eins og móðurmál;
- texta á röngu tungumáli, enskulegum áhrifum, varatexta úr nálægu tungumáli eða blöndun ritkerfa;
- vandamálum með málfræði, beygingar, fall, samræmi, orðaröð, stafsetningu, greinarmerki, málsnið og orðasambönd;
- ósamræmi í hugtakanotkun milli notendaviðmóts vefsvæðisins, /about/ og útfærslugreina;
- tæknilega rangri þýðingu eða orðalagi sem breytir staðreynd um reiknirit;
- staðgenglum sem gegna röngu merkingarhlutverki þótt mengi staðgengla sé óbreytt;
- skemmdum Unicode-texta, stöfum úr röngu ritkerfi, BiDi-vandamálum og greinarmerkjum sem valda RTL/LTR-vandamálum þar sem það á við;
- vandamálum með lýsigögn, titil, ARIA, skjálesaratexta, staðfærslu í upplýsingaskrá, varatexta og virkni án JavaScript;
- líklegri hættu á línuskiptingu eða yfirflæði vegna texta á markmálinu. Þetta síðasta atriði er aðeins textabundið áhættumat og MÁ EKKI lýsa sem sjónrænni prófun í birtri framsetningu.

Kanónískar óbreytur eru skyldubundnar. Ekki leggja til að formúlur, kjötkássur, stöðug auðkenni hluta, API-auðkenni, nákvæmir kóðastrengir eða raunveruleg kanónísk heiti séu þýdd eða þeim breytt eingöngu til að ná fram stílsamræmi.

Samræmi milli gagnasafna snýst um merkingu, ekki endilega orðrétt samræmi. Mismunandi orðalag er í lagi ef hvort tveggja er eðlilegt og miðlar sömu hugmynd. Tilkynntu ef orðalag breytir tæknilegri merkingu.

Þegar um er að ræða efnislega ólíkar útgáfur eða ritkerfi sem hafa aðskildar yfirlestrareiningar skaltu aðeins yfirfara þá útgáfu sem þessi fyrirmæli og skráin tilgreina.

FYRSTA lína svars þíns VERÐUR að vera nákvæmlega annaðhvort:
__PASTAFARI_NATIVE_QA_PASS__
__PASTAFARI_NATIVE_QA_FAIL__

Skrifaðu aðeins Markdown-skýrslu á Íslenska eftir þá línu. Taktu fram:
- heildarniðurstöðu PASS/FAIL fyrir stranga málfars- og merkingarlega gæðaskoðun milli gagnasafna;
- allar athugasemdir með alvarleika (critical/high/medium/low), nákvæmu gagnasafni, grein, skrá og nákvæmri staðsetningu þegar hægt er, núverandi texta, skýringu og ráðlagðri leiðréttingu;
- sérstakan kafla um texta á röngu tungumáli og varatexta;
- sérstakan kafla um samræmi í hugtakanotkun;
- sérstakan kafla um lýsigögn/ARIA/upplýsingaskrá/noscript/varaleiðir ef staðfærsla vefsvæðis er til staðar;
- sérstakan kafla um skjölun og notendamiðaðan texta í útfærslugrein;
- sérstakan kafla um textabundna hættu á línuskiptingu/yfirflæði ef staðfærsla vefsvæðis er til staðar;
- ef enga galla finnst, segðu það skýrt og tilgreindu hvaða svæði þú skoðaðir í raun.

Ekki fullyrða að sjónræn framsetning, aðgengissamskipti, virkni án nettengingar/PWA eða vafrasamskipti hafi verið prófuð nema sérstök gögn um keyrslu liggi fyrir. Þessi lota er eingöngu gæðahlið fyrir móðurmálslegt mat á málfari og merkingu.

---

<sub>Generated by [GitHub Copilot CLI](https://github.com/features/copilot/cli)</sub>
