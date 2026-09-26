NATIVE_QA_RESULT: FAIL

**Heildarniðurstaða: FAIL.** Fannst nokkur málfars- og hugtakanotkunaratriði í íslenskum texta, auk raunverulegrar frumstillingarbilunar sem getur skilið enskan frumtexta eftir sýnilegan. Enginn texti á öðru máli fannst við venjulega íslenska frumstillingu að frátöldum tæknilegum heitum og auðkennum.

## Niðurstöður

| Alvarleiki | Skrá og staðsetning | Núverandi texti | Skýring og ráðlögð leiðrétting |
|---|---|---|---|
| Miðlungs | `docs/app.js:46, 883`; `docs/about/about.js:23, 37` | `let activeLocale = await loadLocale(...)`; síðan er `applyDocumentLocale(activeLocale)` keyrt síðar | Ef íslenska staðfærslueiningin næst ekki hleðst hún ekki og kóðinn nær ekki að keyra staðfærsluna á HTML-frumtextann. Enski textinn getur því staðið eftir án íslenskra villuskilaboða. Bæta við skýrri og notendasýnilegri frumstillingarvaraleið fyrir mistókna tungumálahleðslu, þannig að enski frumtextinn verði ekki þögul niðurstaða. |
| Miðlungs | `docs/about/content/is.html:150` | „úr **stórri** reikniúrtaki“ | Samræmist ekki hvorugkynsorðinu „úrtak“. Leiðrétta í „úr **stóru** reikniúrtaki“. |
| Miðlungs | `docs/about/content/is.html:151` | „356 milljón samfellda mánaðarkafla“; „364 milljón færslur“ | Talnaorðið „milljón“ og fall orðanna á eftir eru ekki rétt samræmd. Mælt er með „356 milljónir samfelldra mánaðarkafla“ og „364 milljónir færslna“. |
| Miðlungs | `docs/i18n/locales/is.js:215`, `reverse.status.rangeRequired` | „Ekki er hægt að **leita þetta vandamál** til fulls…“ | Sögnin „leita“ krefst hér forsetningarinnar „að“; núverandi orðalag er stirð þýðing. T.d. „Ekki er hægt að ljúka tæmandi leit að þessu viðfangsefni fyrr en endanlegu sviði eða fastri dagsetningu hefur verið bætt við.“ |
| Miðlungs | `docs/i18n/locales/is.js:144`, `target.context` | „Dagsetning fyrirspurnardags: {targetDate}“ | Vantar greini í eignarfallinu og heitið víkur frá „fyrirspurnardagur“ sem annars er notað. Styttra og samræmdara væri „Fyrirspurnardagur: {targetDate}“. |
| Miðlungs | `docs/about/content/is.html:240` | „ræsing eftir dvala (**cold wake**)“ | Óþarfa enskur tæknitexti er sýnilegur í íslenskri málsgrein. Nota íslenska orðalagið „vöknun eftir dvala“ án enska svigans. |
| Miðlungs | `docs/about/content/is.html:328` | „annað Pastafari-**merki**“ | „Merki“ er ekki samræmt hugtakinu „Pastafari-dagsetning“ sem notað er annars staðar og getur gefið aðra merkingu. Nota „aðra Pastafari-dagsetningu“. |
| Lágt | `docs/i18n/locales/is.js:156`, `guide.2.body` | „… kínverskt, **hindú**, saka, taílenskt…“ | Listinn notar lýsingarorð en „hindú“ er ekki í samsvarandi lýsingarorðsformi; „saka“ sker sig einnig úr sem ómerkt heiti. Samræma upptalninguna, t.d. með „hindúískt“ og „Saka-dagatal“. |
| Lágt | `docs/i18n/locales/is.js:87`, `calendarInput.solarHijriArithmetic` | „Sól-Hijri — reiknað 2.820“ | Óljóst hvað talan táknar og „reiknað“ vantar skýrt viðfang. Ef átt er við 2.820 ára reiknireglu, skýra það í heitinu, t.d. „Sól-Hijri — 2.820 ára reikniregla“. |
| Lágt | `docs/i18n/locales/is.js:53`, `comparison.kicker` | „Samanburður samstilltur eftir degi“ | Skiljanlegt en stirðlegt orðalag. Mælt er með skýrara heiti, t.d. „Samanburður eftir sama degi“ eða „Samanburður þar sem dagarnir eru samstilltir“. |

## Texti á röngu tungumáli og varaleiðir

Við venjulega íslenska frumstillingu eru viðmótsstrengirnir þýddir. Enski textinn í kyrrstæða HTML-inu er frumræsitexti sem keyrslan skiptir út og er því ekki sjálfstæður galli. Ef upphafleg hleðsla staðfærslueiningarinnar bregst getur þessi enski texti þó setið eftir; það er raunveruleg undantekning og kemur fram í niðurstöðutöflunni.

Á `/about/` er varaleið greinarinnar skýr: ef íslenska greinin hleðst ekki birtist hebreska útgáfan ásamt íslenskri tilkynningu, og greinin fær `lang="he-IL"` og `dir="rtl"`. Sú hegðun er gegnsæ og ekki óviljandi tungumálaleki. `Short Choice`, `Wide Choice`, `Pastafarian Calendar Seer`, `API`, `CLI`, `SIMD`, `JDN` og kóðabrot voru ekki talin þýðingargallar þar sem þau eru heiti, tæknileg auðkenni eða kóðatákn. `noscript`-textinn er aðeins `JavaScript` og viðvörunartákn, eins og tilgreint er.

## Samræmi í hugtakanotkun milli `/about/` og notendaviðmótsins

Kjarnahugtökin „aðgerðardagur“, „fyrirspurnardagur“, „kóteletta“ og „dagamörk“ eru almennt samræmd. Ósamræmið „Pastafari-merki“ á móti „Pastafari-dagsetning“ er tilgreint hér að ofan. Í upphafi greinarinnar (`docs/about/content/is.html:5`) er „Pastafari-„miði““ notað um dagsetningu; „miði“ er óljóst og passar illa við hugtakanotkun viðmótsins. Skýrara væri „föst Pastafari-dagsetning“ eða „Pastafari-dagsetning sem breytist ekki“.

## Lýsigögn, ARIA, manifest, noscript og varaleiðir

Í `docs/manifest.webmanifest` eru íslenskar færslur fyrir `name_localized`, `short_name_localized` og `description_localized`. Gildin eru „Pastafari-dagatal“, „Pastafari“ og „Pastafari-dagatal með dagsetningarleit og samanburði.“; öll eru merkt `lang: "is"` og `dir: "ltr"`. Þær færslur eru í lagi. Keyrslan setur tungumál og textastefnu skjalsins; íslenska greinin er skráð sem `is-IS` og `ltr`. ARIA-merkingar sem tengjast `data-i18n-attr` eru staðfærðar. Enginn viðbótargalli fannst í þessum flötum.

## Líkleg textabundin hætta á línuskiptingu

**Lítil, en ekki útilokuð, áhætta** er í ítarlegri öfugri leit. Samsetta orðið „Fyrirspurnardagsbreyta“ (`docs/i18n/locales/is.js:242`) getur orðið erfitt að brjóta í þröngu stýrirými. Fimm dálka reitir öfugrar leitar eru þröngir á breiðum skjám en skipta niður í færri dálka við minni breidd; aðrir stýrihnappar og textafletir eru almennt með sveigjanlegri uppsetningu. Þetta er textabundið áhættumat, ekki sjónræn prófun á birtri síðu.

Skoðaðir voru íslenska staðfærsluskráin í heild, öll íslenska `/about/`-greinin, aðalsíða og `/about/`-skel, manifest, staðfærsluskrá og keyrsla, forritskóði aðalviðmóts og öfugrar leitar, villu- og varaleiðir, leiðbeiningar, dagsetningarleit, aðgerðardagur, samanburður, ársýn, aðgengismerkingar, tungumálaskipti og CSS-tengd áhætta á textaþrengslum.

