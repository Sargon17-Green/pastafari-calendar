NATIVE_QA_RESULT: FAIL

# Heildarniðurstaða

**FAIL** — nokkrir málfars- og merkingargallar fundust. Úttektin náði til frystu auðkenna í yfirlesturskránni: `Sargon17-Green/pastafari-calendar` á `64e64007b965c1ab1f40963bb0745f37042c60dd` og `Sargon17-Green/Pastafarian-Calendar` á `231f4454793269381bedb582cb067a71adf65f72`. Engum skrám var breytt.

| # | Alvarleiki | Gagnasafn, skrá og staðsetning | Núverandi texti | Athugasemd og ráðlögð leiðrétting |
|---|---|---|---|---|
| 1 | medium | `Sargon17-Green/pastafari-calendar`, `docs/about/content/is.html:118` | „setningafræðilega mögulegra para“ | *Setningafræðilega* vísar til málfræði/setningaskipan en hér er fjallað um fjölda mögulegra samsetninga. Legg til: „Fjöldi mögulegra para …“ eða „Fjöldi stærðfræðilega mögulegra para …“. |
| 2 | medium | `Sargon17-Green/Pastafarian-Calendar`, `src/Pastafari/SourceLanguageCatalog.elm:32`, `SOURCE_LANGUAGE_CATALOG.md:20`, `tests/BootstrapFixtures.elm:34`; samanber `Sargon17-Green/pastafari-calendar`, `docs/i18n/locales/is.js:278` | `papýrussef` / `Papýrusstör` | `sef` vísar fremur til *rush* en *sedge*; heitin vísa því ekki skýrt til sama plöntuhóps. Samræma íslenska heitið, líklega við `papýrusstör`, en halda `sourceId` og `canonicalIndex` óbreyttum. |
| 3 | low | `Sargon17-Green/Pastafarian-Calendar`, `SPAGHETTI_DEVELOPMENT_HISTORY.md:7`, `STAGE_01_NORMATIVE_AUDIT.md:37,39`, `tests/NormativeOracle.elm:1773,2068` | `kótilett…` | Heitið er stafsett `kóteletta` annars staðar í báðum gagnasöfnum. Samræma stafsetninguna, t.d. `kótelettuskipting`, `kótelettu` og `kóteletta`. |
| 4 | low | `Sargon17-Green/pastafari-calendar`, `docs/about/content/is.html:5,328` | „Pastafari-merki“ | Þetta víkur frá meginheitinu „Pastafari-dagsetning“ og getur ruglað saman dagsetningu og merki. Nota „Pastafari-dagsetning“ þegar átt er við dagsetninguna, eða „Pastafari-framsetning“ þegar vísað er sérstaklega til framsetningarinnar. |
| 5 | low | `Sargon17-Green/pastafari-calendar`, `docs/about/content/is.html:45` | „núið er, séð frá sjálfu sér“ | Skiljanlegt en stirðbusalegt orðalag. Eðlilegra væri t.d. „Séð út frá sjálfu sér er núið alltaf innan árs 5000.“ |
| 6 | low | `Sargon17-Green/Pastafarian-Calendar`, `README.md:1` | „Pastafaríska tímatalan“ | Þetta heiti víkur frá „Pastafari-dagatal“ í vefviðmótinu. Samræma heiti verkefnisins, t.d. „Pastafari-dagatalið — Elm og íslenska“. |
| 7 | low | `Sargon17-Green/pastafari-calendar`, `docs/about/content/is.html:1–2` | `semantic master`; `deep-link contract` | Innri HTML-athugasemdir blanda íslensku og ensku. Þær birtast ekki í viðmótinu, en eru ætlaðar lesendum frumskrárinnar. Nota t.d. „merkingarlegur frumtexti“ og „samningur um varanlegar djúptengingar“. |
| 8 | low | `Sargon17-Green/Pastafarian-Calendar`, `.github/workflows/canonical-names-lock.yml:1,15,23` | `Canonical Names Lock`; `Verify canonical names lock`; `Canonical name lock mismatch` | Heiti verkflæðis, skref og villuskilaboð í GitHub Actions eru ensk þótt gagnasafnið sé á íslensku. Þýða sýnilega textann, t.d. „Lás kanónískra heita“, „Staðfesta lás kanónískra heita“ og „Misræmi í lás kanónískra heita“. |

## Texti á röngu tungumáli og varatexti

Fyrir utan atriði 7 og 8 fann ég ekki augljósan enskan varatexta í íslenska viðmótinu. Enska frumtextinn í `docs/index.html` og `docs/about/index.html` er tengdur við staðfærslulykla; titlar og lýsigögn hafa íslensk gildi. Textinn í um-greininni um hebreska varaleið er réttur fyrir það tilvik þegar grein á völdu tungumáli vantar, og íslenska greinin er til staðar. Færslan á `is-IS` í `docs/no-js/index.html` er á íslensku. Heitið `JavaScript`, stöðug auðkenni og tæknileg heiti eru réttilega óþýdd.

`Sargon17-Green/Pastafarian-Calendar/LICENSE` inniheldur enskt leyfisform. Ég tel það ekki galla sem beri að leiðrétta með því að breyta lagatextanum; ef þörf er á íslenskri skýringu ætti hún að vera aðskilin frá leyfistextanum.

## Samræmi í hugtakanotkun

Stærsta misræmið er `kóteletta`/`kótiletta` og heitið á `PAPYRUS_SEDGE` sem lýst er í töflunni. „Pastafari-dagatal“ er einnig heiti vefviðmótsins, á meðan README annars gagnasafns notar „Pastafaríska tímatalan“. Í greininni kemur „almanak“ fyrir um dagatal sem reiknað er í dag; það er skiljanlegt en víkur frá heitinu „dagatal“. Önnur meginhugtök, svo sem „aðgerðardagur“, „fyrirspurnardagur“, „kóteletta“, „mánuður“ og „hlið“, eru að mestu samræmd. Ekki sá ég staðgengla sem greinilega gegna röngu merkingarhlutverki.

## Lýsigögn, ARIA, upplýsingaskrá og noscript

Titlar, lýsingar, tungumálaval, flakksheiti, dagsetningartexti fyrir aðgengisheiti og villu-/hleðsluskilaboð hafa staðfærslugildi í `docs/i18n/locales/is.js`. `dir` er `ltr` fyrir íslensku og færslan án JavaScript notar `lang="is-IS"`. Í um-viðmótinu er fallback-tilkynningin samræmd þeirri hebresku varaleið sem skráin skilgreinir. Engin röng tungumálamerking eða greinileg misvísandi ARIA-þýðing fannst við yfirferð á frumtexta.

Í `docs/i18n/locales/is.js:100` eru hebresku tölustafadæmin `תשפ״ו` og `י״ד` felld inn í íslenskan LTR-texta. Það skapar mögulega tvíáttaáhættu fyrir greinarmerki. Íhuga mætti að afmarka hebresku dæmin með bidi-isolation-stýritáknum eða `bdi`-þáttum þar sem framsetningin leyfir það. Þetta er textabundin áhætta, ekki staðfest framsetningarvilla.

## Skjölun og notendamiðaður texti í útfærslugrein

Íslenskur texti í README, `SOURCE_LANGUAGE_CATALOG.md`, þróunarskjölum, úttektarskjölum og prófunarskilaboðum er almennt læsilegur. Stafsetningar- og heitamisræmin í töflunni eru helst til úrbóta. Skýringar á reikniritinu halda merkingu þess að mestu réttri; auðkenni, formúlur og kanónísk heiti voru ekki talin stílmistök. Enski textinn í verkflæðinu er sýnilegur í GitHub Actions, en ekki í notendaviðmóti vefsins.

## Textabundin hætta á línuskiptingu/yfirflæði

Nokkrir hjálpar- og leiðbeiningatextar eru langir, einkum `calendarHelp.hebrew` og lýsingin á dagamörkum í `guide.1.body`; fyrirsagnir í um-greininni geta einnig brotnað í fleiri en eina línu. Þetta virðist fremur kalla á eðlilega línuskiptingu en benda til augljósrar textabundinnar yfirflæðishættu. Þetta er eingöngu mat á textalengd; sjónræn framsetning var ekki prófuð.

