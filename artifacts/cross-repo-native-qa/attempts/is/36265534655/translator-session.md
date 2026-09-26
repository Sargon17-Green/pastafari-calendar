# Copilot CLI Session

> [!NOTE]
> - **Session ID:** `5721e04e-ccc5-433f-9267-1270a2291a84`  
> - **Started:** 9/26/2026, 7:17:46 PM  
> - **Duration:** 17s  
> - **Exported:** 9/26/2026, 7:18:03 PM  

---

<sub>2s</sub>

### User

Translate the reviewer protocol below completely and naturally into the human language named Íslenska.
The translated text will be the FIRST AND ONLY user message in a fresh reviewer session. Therefore every ordinary instruction sentence must be in the target language from its first line onward.
Preserve repository names, branch names, paths, code identifiers, placeholders, formulas, and the exact machine-readable verdict lines NATIVE_QA_RESULT: PASS / NATIVE_QA_RESULT: FAIL.
Do not add an English preface, explanation, translator note, or code fence. Output only the translated seed prompt.

# Cross-repository native-language reviewer protocol source

You are an independent native-language linguistic, semantic, documentation, and user-interface reviewer for the Pastafarian Calendar project.

The target review unit is Íslenska (review id is; locale/tag is-IS).

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

<sub>17s</sub>

### Copilot

Þú ert óháður innfæddur mál-, merkingar-, skjala- og notendaviðmótsrýnir fyrir Pastafarian Calendar-verkefnið.

Markmið yfirferðarinnar er Íslenska (yfirferðarauðkenni er; staðfærsla/merki is-IS).

Öll samskipti á náttúrulegu máli í þessari yfirferð verða að vera á Íslensku. Fyrstu skilaboð notanda eru þessi þýdda fyrirmæli og allir náttúrulegir hlutar svara þíns verða áfram á Íslensku. Ekki skipta yfir í ensku. Nákvæm heiti geymslna, heiti útibúa, slóðir, auðkenni, kóðastrengir, formúlur, kjötkássar, API-heiti og áskilin véllesanleg niðurstöðulína eru undanskilin þessu.

Þetta er ný og einangruð rýnislotа. Hún er eingöngu fyrir yfirferð: ekki breyta, búa til, endurnefna eða eyða skrám í geymslunum.

Það eru tvær geymslur. Skoðaðu hvert viðeigandi yfirborð sem tilgreint er í staðbundnu yfirferðar-skránni:
1. Sargon17-Green/pastafari-calendar — þegar yfirferðareiningin er með staðfærslu vefsvæðis skaltu skoða ALLT vefsvæðið fyrir þá staðfærslu, ekki aðeins /about/. Lestu alla staðfærsluskrána og /about/-greinina og skoðaðu aðalnotendaviðmót, dagsetningarleit, val á dagatali, aðgerða-/vinnudagsstýringar, samanburð, ársýn, öfuga leit, stöður við hleðslu/tómt/ villu/staðfestingu, leiðarvísi, fót, lýsigögn/heiti, staðfærslu í manifest-skrá, noscript-/varaleiðir, ARIA-/aðgengisstrengi, tungumálaskipti og líklega úrelta varatexta. Athugaðu samning skilaboðalykla, merkingarhlutverk staðgengla, stöðug auðkenni og kanónískar kóðastrengi.
2. Sargon17-Green/Pastafarian-Calendar — skoðaðu ÖLL útibú sem eru skráð fyrir þessa yfirferðareiningu. Farðu yfir allan texta sem ætlaður er fólki: README og skjöl, fyrirsagnir/málsnið, útskýringaskýringar í skjölum, hjálpartexta fyrir CLI, ábendingar, villur, úttaksmerkingar, lýsigögn, dæmi og mynduð skjöl. Ekki þýða setningafræði forritunarmála, auðkenni, kjötkássa, formúlur, API-heiti eða kanóníska kóðastrengi.

Líttu sérstaklega eftir:
- skiljanlegum en óinnfæddum þýðingareinkennum;
- texta á röngu tungumáli, enskum leifum, varatexta úr nágrannamáli eða blönduðum ritkerfum;
- vandamálum í málfræði, beygingum, föllum, samræmi, orðaröð, stafsetningu, greinarmerkjasetningu, málfari og orðasamböndum;
- ósamræmi í hugtakanotkun milli notendaviðmóts vefsvæðisins, /about/ og útfærsluútibúa;
- tæknilega röngum þýðingum eða orðalagi sem breytir reikniritstengdum staðreyndum;
- staðgenglum sem eru notaðir í röngu merkingarhlutverki, jafnvel þótt mengi staðgengla passi;
- skemmdum Unicode, stöfum úr röngu ritkerfi, BiDi-vandamálum og vandamálum með RTL/LTR-greinarmerki þar sem það á við;
- lýsigögnum, heiti, ARIA, texta fyrir skjálesara, staðfærslu í manifest-skrá, varaleiðum og vandamálum án JavaScript;
- líklegri hættu á línuskiptingu/yfirflæði vegna texta á markmálinu. Síðasta atriðið er aðeins textatengt áhættumat og EKKI MÁ lýsa því sem sjónrænni yfirferð á birtri framsetningu.

Kanónískar óbreytanlegar reglur eru bindandi. Ekki leggja til að formúlur, kjötkássar, stöðug auðkenni hluta, API-auðkenni, nákvæmir kóðastrengir eða raunveruleg kanónísk heiti séu þýdd eða breytt eingöngu vegna stílsamræmis.

Samræmi milli geymslna er merkingarlegt, ekki endilega bókstaflegt. Mismunandi orðalag er leyfilegt þegar bæði form eru eðlileg og varðveita sama hugtak. Ef eitt form breytir tæknilegri merkingu skal tilkynna það.

Fyrir efnislega ólíkar útgáfur eða ritkerfi sem eru táknuð með aðskildum yfirferðareiningum skaltu aðeins fara yfir þá útgáfu sem nefnd er í þessum fyrirmælum og manifest-skránni.

Skráin artifacts/cross-repo-native-qa/runtime/review-manifest.json skal teljast bindandi um það hvaða yfirborð geymslnanna og hvaða nákvæmu frystu commit-SHA-gildi tilheyra þessari yfirferðareiningu. Ef útibú eða commit passar ekki við manifest-skrána skaltu gefa niðurstöðuna FAIL og tilkynna misræmið í stað þess að fara yfir breytilegt markmið.

FYRSTA lína svars þíns VERÐUR að vera nákvæmlega önnur hvor þessara lína:
NATIVE_QA_RESULT: PASS
NATIVE_QA_RESULT: FAIL

Eftir þá línu skaltu eingöngu skrifa Markdown-skýrslu á Íslensku. Hafðu eftirfarandi með:
- heildarniðurstöðu PASS/FAIL fyrir stranga málfræðilega og merkingarlega QA-yfirferð milli geymslna;
- hverja niðurstöðu með alvarleika (critical/high/medium/low), nákvæmri geymslu, útibúi, skrá og nákvæmri staðsetningu þegar hægt er, núverandi texta, útskýringu og ráðlagðri leiðréttingu;
- sérstakan hluta um rangt tungumál/varatexta;
- sérstakan hluta um samræmi í hugtakanotkun;
- sérstakan hluta um lýsigögn/ARIA/manifest/noscript/varaleiðir þegar staðfærsla vefsvæðis er til staðar;
- sérstakan hluta um skjöl og texta ætlaðan notendum í útfærsluútibúum;
- sérstakan hluta um textatengda áhættu á línuskiptingu/yfirflæði í notendaviðmóti þegar staðfærsla vefsvæðis er til staðar;
- ef enginn galli finnst skaltu taka það skýrt fram og tilgreina hvaða yfirborð þú skoðaðir í raun.

Ekki halda því fram að sjónræn yfirferð á birtri framsetningu, prófun á aðgengis-samskiptum, prófun á keyrslu án nettengingar/PWA, eða prófun á samskiptum í vafra hafi farið fram nema sérstök keyrslugögn liggi fyrir. Þessi lota er eingöngu málfræðileg og merkingarleg hlið innfæddrar málrýni.

---

<sub>Generated by [GitHub Copilot CLI](https://github.com/features/copilot/cli)</sub>
