# Íslenska QA — millistaða fyrir allt vefsvæðið

## Umfang þessarar yfirferðar

Þessi yfirferð nær yfir íslenska locale-ið `is-IS` á öllum textaflötum vefsins, ekki aðeins `/about/`: aðalviðmót, dagsetningarleit, aðgerðardag, samanburð, ársýn, öfuga leit, villur og stöðuskilaboð, notkunarleiðbeiningar, footer, metadata, manifest-texta og ARIA-/aðgengistexta.

Greinin `/about/` var einnig lesin í heild með sérstakri leit að óþýddri enskri eða danskri prósa, þýðingakenndu orðalagi, málfræðivillum, ósamræmi í hugtökum og breytingum á föstum tæknilegum atriðum.

## Viðbótarfynd eftir fyrri íslensku commit-in

Þrír fyrri hreinsunar-commit höfðu fjarlægt mest af dönsku og stóran hluta ensku tækniprósa, en textinn var ekki enn tilbúinn til samþykktar. Í lokaumferðinni fundust meðal annars:
- ensk almenn orð og orðasambönd eins og `space`, `maximum`, `export`, `flag`, `narrative detail`, `technical claim`, `exact example`, `specification`, `deterministic calendar`, `Pastafarian label` og `All-day event`;
- tvítekningin `sama sama`;
- beygingar- og samræmisvillur á borð við `fast fastan`, `Seinni festu er`, `fastir festu`, `öfug umbreyting ... takmarkað` og `endanlegir asymptótískar hallatölur`;
- óeðlileg eða röng orðasambönd í lýsingu á útreikningi, Seer, ferðalögum, festipunktum og sósusögu;
- nokkrar setningar í UI sem voru skiljanlegar en ekki nægilega náttúrulegar á íslensku.

Þetta var lagað í viðbótar-commitunum `1a7554fcd01801bc2df6447abd863007c429135d`, `f12fcd823f29fa1d56e5e02c1bc5bfab3c35988b` og `71c8e8dd67aeda78bde3e3197a5e02093e2e97fc`.

## Merkingarlegt frávik í notkunarleiðbeiningum

Samanburður allra 258 íslensku skilaboðanna við enska skilaboðasamninginn fann þrjú tilfelli þar sem merking hafði styst, þótt lykillinn sjálfur væri til staðar:

- `search.intro` vantaði að núverandi Pastafari-dagur væri sjálfgefinn;
- `guide.4.body` vantaði að „Til baka í dag“ endurstillir bæði leitina og aðgerðardaginn;
- `guide.5.body` vantaði að síðari leitir halda áfram að nota valinn aðgerðardag þar til hann er endurstilltur.

Auk þess hafði `guide.1.body` verið endurskrifað svo mikið að hann sagði ekki lengur sömu þrjú atriðin og enski samningurinn: sjálfvirka ákvörðun núverandi Pastafari-dags, staðsetningarháð dagamörk Venusar samkvæmt `ASTRONOMICAL-DAY.md`, og að engin dagsetning sé send á reikniþjón.

Öll þessi atriði hafa nú verið endurheimt á eðlilegri íslensku.

## Vélrænar og merkingarlegar lokaprófanir

Eftir lagfæringarnar er eftirfarandi staðfest:

- enski skilaboðasamningurinn hefur 258 lykla og íslenska locale-ið hefur alla 258, hvorki fleiri né færri;
- öll `{placeholder}`-mengi eru nákvæmlega eins og í enska samningnum;
- lengdar- og setningafjöldagreining á löngum skilaboðum sýnir ekki lengur grunsamlega merkingarskerðingu;
- `/about/` hefur nákvæmlega 29 stable section-ID í nákvæmlega sömu röð og semantic master, án tvítekninga;
- merkingartöflurnar tvær hafa 19 og 9 raðir;
- lykilformúlur, hash, tölugildi og kóðaliteral, meðal annars `Q=2^{127}-1`, `R=\\operatorname{SAVE}(S+149r)`, `47\\times123=5781`, `5781-5778=3`, `RRULE:FREQ=YEARLY`, `F(c+T,t+T)=F(c,t)`, `14{,}777{,}149` og commit-hash `8e155fa4198ea7bcfeb16138ac5d6662706f4d93`, eru óbreytt;
- enginn óviljandi hebreskur texti er í íslensku greininni;
- markviss lokaleit að venjulegri enskri prósa í greininni er hrein;
- samanburður við danska locale-ið skilur aðeins eftir sameiginleg sérnöfn, alþjóðleg heiti, sniðstrengi eða orð sem eru löglega eins í báðum málum; engin dönsk setning fannst.

## Sjálfstæð íslensk LLM-lota — umferð 1

Skyldubundin same-language yfirferð var keyrð sem sjálfstætt Copilot CLI-kall í GitHub Actions, með fyrirmælum og samskiptum á íslensku:

- workflow run: `36261881614`
- reviewer job: `108459271015`
- niðurstaða: `VERDICT: NEEDS_CHANGES`

Rýnirinn fann 12 atriði. Raunveruleg íslensk málfarsatriði voru lagfærð, meðal annars „Pastafari-miði“, fyrirsögn vikukaflans, beyging „milljón“, íslensk skýring á Short/Wide Choice, setningin um asymptótíska þröskuldinn, `comparison.kicker`, `target.context`, `error.title` og nokkur heiti/stöðuskilaboð öfugrar leitar.

Aðgengisatriði í sameiginlega reverse-search viðmótinu var einnig gilt og var lagað með `role="status"`, `aria-live="polite"`, `aria-atomic="true"` og `role="alert"`.

Tvö atriði voru ekki talin íslensk staðfærsluvilla:
- JavaScript-laust ástand hefur ekkert valið locale; kyrrstæða HTML-skelin er enskt grunngildi og getur því ekki endurheimt íslenskt locale án JavaScript.
- manifestið hefur þegar `name_localized.is = "Pastafari-dagatal"`; að skipta sameiginlega grunngildinu yfir í íslensku myndi gera fallback rangt fyrir önnur tungumál.

Eftir lagfæringarnar voru 258/258 skilaboð, placeholder-samræmi, 29 stable ID, töflur 19/9 og föst formúlu-/hash-gildi staðfest aftur. Ný sjálfstæð íslensk LLM-lota er keyrð áður en staðan má færast í `linguistic QA`.

## Það sem er enn opið

Þessi skrá er **ekki** sönnun fyrir þeirri sérstöku lokakröfu að tungumála-QA sé framkvæmt af LLM í aðskildri samræðu/lota sem sjálf fer öll fram á íslensku. Sú krafa hefur ekki verið uppfyllt í þessari núverandi samræðu og má ekki telja hana uppfyllta eingöngu vegna þess að þessi QA-skrá er skrifuð á íslensku.

Einnig hefur ekki verið lokið render-/sjónrænu QA á desktop og 390 px mobile fyrir þessa útgáfu, né loka-QA fyrir PWA/offline, tungumálaskipti eða aðgengi í raunverulegri renderingu.

## Staða

Textinn og merkingarsamningurinn eru tilbúin fyrir næsta hlið. Staðan skal því vera **semantic QA**, ekki `linguistic QA`, þar til sérstök íslensk LLM-lota hefur farið yfir allt vefsvæðið. `rendered` og `PASS` eru einnig óheimil þar til sjónrænu og samþættingarprófunum er lokið.
