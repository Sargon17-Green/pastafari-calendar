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

