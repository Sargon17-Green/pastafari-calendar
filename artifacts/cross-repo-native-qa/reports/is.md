NATIVE_QA_RESULT: FAIL

## Heildarniðurstaða

Yfirferðin stenst ekki stranga málfræðilega og merkingarlega QA-yfirferð milli geymslna. Greindust ósamræmi í íslenskum dagatalsheitum, merkingarfrávik í einu heiti, texti í öðru ritkerfi í lýsigögnum og ófullnægjandi varaleið án JavaScript.

Fryst markmið pössuðu við manifest: `Sargon17-Green/pastafari-calendar`, útibú `feature/about-i18n-72-locales`, commit `cd5325860fa2d2aa58abba31e207de27efe52e4d`; og `Sargon17-Green/Pastafarian-Calendar`, útibú `Elm+íslensku`, commit `267a63bc08f4bdd9e26b1249ca20b356877dc816`.

## Rangt tungumál / varatexti

1. **Alvarleiki: medium** — `Sargon17-Green/Pastafarian-Calendar`, `Elm+íslensku`, `DEVELOPMENT_STAGE.md:13`.  
   **Núverandi texti:** `NATURAL_LANGUAGE=איסלנדית`  
   **Útskýring:** Gildið er hebreska orðið fyrir íslensku, ekki íslenskur texti eða staðlað tungumálaauðkenni. Það stingur í stúf við íslenska skjalasafnið og línuna `FOREIGN_LANGUAGE_USAGE=NONE`.  
   **Ráðlögð leiðrétting:** Nota `íslenska` eða staðlað auðkenni á borð við `is-IS`, eftir því hvaða snið skráin á að fylgja.

2. **Alvarleiki: low** — `Sargon17-Green/pastafari-calendar`, `feature/about-i18n-72-locales`, `docs/index.html:197–200` og `docs/about/index.html:75–78`.  
   **Núverandi texti:** Í báðum `<noscript>`-blokkum stendur aðeins `JavaScript ⚠`; grunnskjölin eru merkt `lang="en"`.  
   **Útskýring:** Án JavaScript birtast enskir grunntextar, og á `/about/` er greinin ekki sótt; viðvörunin útskýrir ekki á íslensku hvers vegna efnið vantar eða hvað notandi geti gert.  
   **Ráðlögð leiðrétting:** Bæta við skýrri íslenskri skilaboðaleið fyrir JavaScript-lausa notkun, með viðeigandi tungumálamerkingu, eða bjóða upp á kyrrstæða staðfærða varasíðu.

## Samræmi í hugtakanotkun

3. **Alvarleiki: medium** — `Sargon17-Green/pastafari-calendar`, `feature/about-i18n-72-locales`, `docs/i18n/locales/is.js:277, 297, 321`; borið saman við `Sargon17-Green/Pastafarian-Calendar`, `Elm+íslensku`, `src/Pastafari/SourceLanguageCatalog.elm` og `SOURCE_LANGUAGE_CATALOG.md`.  
   **Núverandi texti:** Vefurinn notar `Palgurash`, `Karshumav` og `Lokuðu dyrnar`; frysta íslenska skráin notar `Palgúrasj`, `Karsjúmav` og `lokaða hurðin`.  
   **Útskýring:** Fyrstu tvö heitin fara ekki eftir íslensku umritunarreglunni sem er skráð fyrir tilbúnu nöfnin. Þriðja heitið breytir eintölu „hurðin“ í fleirtölu „dyrnar“ og breytir þar með merkingu kanóníska nafnsins.  
   **Ráðlögð leiðrétting:** Samræma birtingarheitin við frystu íslensku heitin og varðveita stöðug auðkenni og `canonicalIndex` óbreytt.

4. **Alvarleiki: low** — `Sargon17-Green/Pastafarian-Calendar`, `Elm+íslensku`, `README.md` undir „Innihald Stage 1“ og `tests/Stage01Checks.elm`, prófunarheitið „Fjörutíu og sjö mánaðanöfn…“.  
   **Núverandi texti:** `mánaðanöfn`  
   **Útskýring:** Samsetta orðið vantar r-ið í `mánaðarnöfn`; villan kemur bæði fyrir í README-texta og í heiti sem birtist í prófunarniðurstöðum.  
   **Ráðlögð leiðrétting:** Breyta orðmyndinni í `mánaðarnöfn` á báðum stöðum.

5. **Alvarleiki: low** — `Sargon17-Green/Pastafari-Calendar`, `Elm+íslensku`, `README.md` og `src/Pastafari/SourceLanguageCatalog.elm`, borið saman við íslensku vefstaðfærsluna í `docs/i18n/locales/is.js`.  
   **Núverandi texti:** Útfærslugögnin nota `kótiletta`/`kótilettunöfn`; vefurinn notar `kóteletta`/`kótelettunöfn`.  
   **Útskýring:** Hugtakið er hið sama en stafsetningin er ósamræmd milli geymslna.  
   **Ráðlögð leiðrétting:** Velja eina staðlaða íslenska orðmynd og nota hana samræmt í vef, skjölum og prófunartexta.

## Lýsigögn, ARIA, manifest og varaleiðir

`is`-gildin í `docs/manifest.webmanifest` eru íslensk og merkt `lang: "is"` og `dir: "ltr"`. Tungumálaskráin og greinin nota einnig LTR, og formúlur hafa skýra LTR-merkingu. ARIA- og skjálesaratextar sem tengjast venjulegri notkun eru staðfærðir í `is.js`; `about`-varagreinin er merkt eftir því tungumáli sem er sótt. Enginn annar sérstakur galli fannst í þessum atriðum. Varaleiðin án JavaScript er þó gallinn sem lýst er hér að framan. Skráða stuðningsstigið fyrir `is` er `partial`; því er enskur varatexti mögulegur fyrir lykla sem vantar, en enginn ákveðinn slíkur lykill er skráður hér sem staðfest villa.

## Skjöl og texti ætlaður notendum í útfærsluútibúi

Farið var yfir README, `DEVELOPMENT_STAGE.md`, `SOURCE_LANGUAGE_CATALOG.md`, þróunarsögu, stöðuskrár og úttektir, auk birtingartexta í `SourceLanguageCatalog`, `Stage01Checks` og `BootstrapFixtures`. Fundust atriðin um hebreskt lýsigildi, stafsetningu `mánaðarnöfn` og ósamræmi í `kóteletta`-heitinu hér að ofan. Ekki fundust önnur augljós ensk skilaboð eða erlendur varatexti í þeim íslensku skjölum og prófunarmerkingum sem skoðuð voru.

## Textatengd áhætta á línuskiptingu/yfirflæði

Langheiti eins og `Fjórir hlutar af níu` og `Þrír hlutar af fimm`, ásamt lengri leiðbeiningum og lýsingum, geta brotnað á margar línur í dagareitum, samanburði og prentútliti. CSS notar `overflow-wrap: anywhere` á nokkrum viðeigandi svæðum, sem dregur úr yfirflæðishættu; prentstíll þrengir dagareiti í þrjá dálka og eykur því hættu á óheppilegum línuskilum. Þetta er textatengt áhættumat, ekki sjónræn yfirferð.

Yfirferðin var kyrrstæð og málfræðileg/merkingarleg. Hvorki sjónræn yfirferð á birtri síðu, prófun á aðgengissamskiptum né keyrsla í vafra fór fram.

