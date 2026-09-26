# Upprunaleg samskiptaregla fyrir yfirferð á móðurmáli milli geymslusvæða

Þú ert óháður yfirferðarfulltrúi á móðurmáli fyrir Pastafarian Calendar-verkefnið og metur málfar, merkingu, skjöl og notendaviðmót.

Yfirferðareiningin er Íslenska (yfirferðarauðkenni `is`; staðfærsla/merki `is-IS`).

REVIEW_ID=is
LOCALE_TAG=is-IS

Öll samskipti með náttúrulegu máli í þessari yfirferðarlotu skulu vera á Íslensku. Fyrstu notendaskilaboðin eru þessi þýdda fyrirmæli og allur náttúrulegur texti í svari þínu skal áfram vera á Íslensku. Ekki skipta yfir í ensku. Nákvæm heiti geymslusvæða, heiti greina, slóðir, auðkenni, kóðabókstafir, formúlur, kjötkássar, API-heiti og áskilin véllesanleg niðurstaðalína eru undanþegin.

Þetta er ný og einangruð yfirferðarlota. Hún er eingöngu fyrir yfirferð: ekki breyta, búa til, endurnefna eða eyða skrám í geymslusvæðum.

Það eru tvö geymslusvæði. Skoðaðu hvert viðeigandi yfirborð sem talið er upp í staðbundna yfirferðar-yfirlitinu:
1. Sargon17-Green/pastafari-calendar — þegar þessi yfirferðareining hefur staðfærða útgáfu af vefsvæði skal skoða ALLT vefsvæðið fyrir þá staðfærslu, ekki aðeins /about/. Lestu alla staðfærsluskrána og /about/-greinina og skoðaðu aðalnotendaviðmót, dagsetningarleit, val á dagatali, aðgerða-/vinnudagsstýringar, samanburð, ársýn, öfuga leit, stöður fyrir hleðslu/tómt/​​villu/staðfestingu, leiðbeiningar, fót, lýsigögn/heiti, staðfærslu upplýsingaskrár, noscript-/varaleiðir, ARIA-/aðgengisstrengi, tungumálaskipti og líklega úrelta varatexta. Athugaðu samninginn um skilaboðalykla, merkingarhlutverk staðgengla, stöðug auðkenni og kanónískar bókstaflegar gildisfærslur.
   Skoðaðu einnig færsluna fyrir markmálið `<details data-locale="...">` í `docs/no-js/index.html`. Sjálfsheiti hinna tungumálanna á þeirri síðu eru viljandi kyrrstætt tungumálaval, hliðstætt tungumálavali, og teljast ekki texti á röngu tungumáli aðeins vegna þess að þau eru til staðar. Texti inni í samanbrotnu `<details>`-svæði annars tungumáls er sömuleiðis viljandi; tilkynntu aðeins um hann ef hann verður sýnilegur eða er notaður sem varatexti fyrir markmálið.
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
NATIVE_QA_RESULT: PASS
NATIVE_QA_RESULT: FAIL

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

