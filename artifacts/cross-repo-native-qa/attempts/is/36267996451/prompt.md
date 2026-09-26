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

