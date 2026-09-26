NATIVE_QA_RESULT: FAIL

## Heildarniðurstaða: FAIL

Íslenska útgáfan nær yfir aðalviðmót, dagsetningarleit, aðgerðardag, samanburð, ársyfirlit, öfuga leit, villu- og biðstöður, leiðbeiningar, fót, um-síðu, aðgengismerki og tungumálaskipti. Nokkrar sýnilegar þýðingar eru þó óeðlilegar eða merkingarlega ónákvæmar, og enskur texti getur birst í villum, án JavaScript og í uppsetningarupplýsingum.

## Findings

- **[medium] `docs/i18n/locales/is.js:14` — inngangur að aðalviðmóti.** Núverandi texti: „Finndu dag í hvaða studdu dagatali sem er, skoðaðu síðan fulla Pastafari-dagsetningu hans og sjáðu hvaða kótelettu hann tilheyrir.“ Orðalagið „hvaða studdu dagatali sem er“ er stirðlegt og „fulla … dagsetningu hans“ óskýrt. **Tillaga:** „Finndu dagsetningu í einu dagatalanna sem vefurinn styður. Þá sérðu fulla Pastafari-dagsetningu þess dags og kótelettuna sem hann tilheyrir.“

- **[medium] `docs/i18n/locales/is.js:17, 266` — heiti á algildri dagsetningu.** Núverandi textar: „Algilda dagsetningin inniheldur ógildan reit.“ og „Dagatal sem notað er fyrir þessa algildu dagsetningu“. „Algild“ merkir fremur *universal* en *absolute* og „dagsetningin inniheldur … reit“ er óeðlilegt í villuboðum. **Tillaga:** „Dagsetningin inniheldur ógilt gildi.“ og „Veldu dagatal fyrir dagsetninguna.“

- **[medium] `docs/reverse-ui.js:819–821`; `docs/i18n/locales/is.js:18–19` — óþýddir staðgenglar í villum.** Þegar leitarmörk eru ógild eru `maxSolutions`, `maxScanned` eða `timeoutMs` sett beint inn í íslenska villutextann, t.d. „maxSolutions verður að vera jákvætt.“ **Tillaga:** nota þýdd heiti reitanna eða sleppa staðgenglinum, t.d. „Gildið verður að vera jákvæð heiltala.“ og „Gildið er utan öruggs heiltölusviðs.“

- **[medium] `docs/about/content/is.html:223` — ónákvæmt orðalag um stjarnfræðilegan atburð.** Núverandi texti: „Þessi yfirferð þarf ekki að gerast kl. 00:00“. „Yfirferð“ er óskýrt hér og „gerast“ hljómar óeðlilega um atburð. **Tillaga:** „Þessi atburður á sér ekki endilega stað kl. 00:00.“ Endurskoða mætti einnig framhaldið í setningunni til að forðast langa runu aukasetninga.

- **[low] `docs/i18n/locales/is.js:60, 164`; `docs/index.html:77, 187` — „tölva“ er ónákvæmt miðað við hegðun.** Samanburðurinn birtist eftir skjábreidd (`min-width: 1000px`), ekki eftir því hvort tækið er tölva. **Tillaga:** nota „á breiðum skjá“ í hjálpartexta og leiðbeiningum, fremur en „á tölvu“ eða „á breiðum tölvuskjá“.

- **[low] `docs/i18n/locales/is.js:55` — setningagerð í samanburðarlýsingu.** Núverandi texti: „Aðeins aðgerðardagurinn breytist milli fyrri og seinni dálks.“ Orðalagið er stirðlegt. **Tillaga:** „Aðeins aðgerðardagurinn er ólíkur í dálkunum tveimur.“

- **[low] `docs/i18n/locales/is.js:33` — viðvörun um úreltan dag.** „Þar sem aðgerðardagurinn var núverandi dagur eru sýndar dagsetningar ekki lengur uppfærðar“ er stirðlegt og óskýrt. **Tillaga:** „Þar sem aðgerðardagurinn fylgdi deginum í dag eru dagsetningarnar sem birtast ekki lengur uppfærðar.“

- **[low] `docs/about/content/is.html:151` — beyging tækniorðs.** Núverandi texti: „Atlasinn var byggður með commit-i vélarinnar …“ er óeðlilegur blendingsháttur. **Tillaga:** „Atlasinn var reiknaður út með þeirri útgáfu vélarinnar sem tilgreind er í commit-inu …“; varðveita hash-gildið óbreytt.

## Texti á öðru tungumáli og fallback

- **[medium] `docs/index.html:197–200`; `docs/about/index.html:75–78` — `noscript`-texti er ekki íslenskur.** Þegar JavaScript er óvirkt birtast ensk skilaboð og síðan hebresk, en engin íslensk útgáfa. **Tillaga:** hafa íslenskan texta í HTML-fallbackinu, eða tryggja að fallbackið sýni íslensku þegar það á við. Með JavaScript er tungumál síðunnar uppfært í keyrslu.

- **[medium] `docs/i18n/locales/is.js:30`; `docs/about/content/registry.js:3`; `docs/about/about.js:77–79` — tilkynning um fallback segir ekki hvaða útgáfa birtist.** Tilkynningin segir að „sjálfgefna útgáfan“ sé sýnd, en greinin fellur aftur á hebresku (`ARTICLE_FALLBACK_LOCALE = "he"`), ekki sjálfgefið viðmótstungumál. **Tillaga:** „Skýringin er ekki tiltæk á völdu tungumáli; hebreska útgáfan er sýnd í staðinn.“

- **[low] `docs/about/content/is.html:240` — ensk tækniorðasamband.** `cold wake` birtist inni í `<code>` án íslenskrar skýringar. Þar sem það er sett fram sem tæknilegt orðalag ætti að varðveita það, en bæta við skýringu, t.d. „ræsingu eftir hvíld (`cold wake`)“.

- **Varðveita sem föst heiti:** `Short Choice`, `Wide Choice`, `Pastafarian Calendar Seer`, `day-id`, API-heiti og kóðaliteröl eru ekki talin þýðingarskekkjur. Ekki ætti að þýða þau eingöngu til að fjarlægja ensku.

## Samræmi /about/ við UI

- **[low] `docs/i18n/locales/is.js:25`; `docs/i18n/locales/is.js:152`; `docs/i18n/locales/is.js:153`; `docs/i18n/locales/is.js:164`; `docs/i18n/locales/is.js:153`; `docs/index.html:153` — hugtök um mánuði.** Inngangur um-síðunnar notar „samtvinnaða mánuði“, en UI og megintextinn nota „fléttaðir mánuðir“ og „fléttun“. **Tillaga:** samræma innganginn við „fléttaða mánuði“.

- **[low] `docs/i18n/locales/is.js:144, 220`; `docs/about/content/is.html:5–8` — „fyrirspurnardagur“ og „fyrirspurnardagsetning“ skiptast á.** Um-síðan og niðurstöðumerki nota „fyrirspurnardagur“, en samhengislínan notar „Fyrirspurnardagsetning“. Velja ætti samræmt heiti fyrir daginn og greina það frá dagsetningarframsetningu hans, t.d. „Dagsetning fyrirspurnardags: …“.

## Lýsigögn, ARIA, manifest og fallback

- **[medium] `docs/manifest.webmanifest:3, 729, 1092`; íslensku færslurnar eru á línum 165, 528 og 891.** Stöðluðu gildin fyrir `name`, `description` og `lang` eru á ensku, þótt íslensk gildi séu í `name_localized` og `description_localized`. Ekki er tryggt að vafrar noti þessi viðbótarsvið við uppsetningu forrits. **Tillaga:** útvega tungumálahæft manifest sem notar íslensk stöðluð gildi fyrir íslensku útgáfuna, eða sannreyna sérstaklega stuðning við staðfærðu sviðin í þeim vöfrum sem á að styðja.

- **Rétt virkni staðfest í lestri:** með JavaScript uppfærir `docs/i18n/runtime.js:56–57` `lang` og `dir` skjalsins, þýðir `data-i18n`-texta og setur þýdd `aria-label`-gildi. Greinin fær eigið `lang` og `dir` í `docs/about/about.js:51–52`. Aðgengisheiti og stöðumerki aðalviðmótsins eru tengd þýðingarlyklum eða sett úr íslenskum texta.

- **Fallback-áhætta:** íslenska er skráð sem `partial` í `docs/i18n/registry.js:60`, og `materializeLocaleResources` blandar ensku grunnskránni inn fyrir lykla sem vantar (`docs/i18n/registry.js:362–368`). Það er því áfram mögulegt að vanti íslenskan texta á yfirborði sem bætist við eða er ekki þýtt. Í yfirfarinni lykla- og kóðaflæðisrýni fannst þó ekki annar tiltekinn enskur fallback-texti á keyrandi íslensku yfirborði en sá sem er talinn upp hér.

## Líkleg textatengd UI- og línuskiptaáhætta

- **[low] `docs/i18n/locales/is.js:146`; `docs/styles.css:395–407, 455–458, 478–530`.** ARIA-dagsetningar, samhengislínur og dagareitir geta orðið langir vegna íslenskra samsetninga og langra mánaðar- eða kótelettunafna. CSS leyfir línuskipti, en `overflow-wrap: anywhere` getur skipt orðum á óeðlilegum stöðum þegar reitir verða þröngir. **Tillaga:** fylgjast sérstaklega með löngum nöfnum í þröngum reitum og forgangsraða náttúrulegum línuskilum þar sem hægt er; ekki stytta föst heiti til að komast hjá plássvanda.

Engin sjónræn render-prófun var framkvæmd; UI-áhættan hér er textalegt mat út frá lengd texta og CSS-reglum.

