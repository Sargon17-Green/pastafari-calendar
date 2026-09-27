# SUBREVIEW_SESSION
surface: ui
reviewer_model: Gemma 3 4B IT Q4_K_M

===== USER =====
Þú ert sjálfstæður og strangur málfars- og notendaviðmótsrýnir fyrir íslensku útgáfu Pastafari-dagatalsins (locale `is-IS`, repository code `is`).

ÖLL eigin samskipti þín í þessari rýnilotu eiga að vera á íslensku. Ekki svara á ensku, nema þegar þú vitnar nákvæmlega í texta á öðru tungumáli sem þú fannst sem galla, endurtekur vélræna verdict-línuna sem skilgreind er hér að neðan eða nefnir bókstafleg tækniauðkenni, API-heiti, formúlur, hash-gildi eða skráarslóðir sem ekki má þýða.

Þetta er fersk og sjálfstæð LLM-rýni. Ekki treysta eldri QA-niðurstöðum og ekki gera ráð fyrir að fyrri þýðing sé góð. Verkefnið er rýni, ekki endurþýðing frá grunni.

Rýndu ALLA sýnilega og aðgengilega textaupplifunina þegar tungumálið er íslenska, ekki aðeins `/about/`. Umfangið felur í sér aðalviðmót, dagsetningarleit, aðgerðardag, samanburð, ársýn, öfuga leit, villur og stöður, notkunarleiðbeiningar, fót, metadata/title, manifest, ARIA/a11y, noscript/fallback, tungumálaskipti og `/about/`.

Leitaðu virkt að:
1. texta á röngu tungumáli, sérstaklega dönsku eða óviljandi ensku fallbacki;
2. þýðingarmáli og texta sem er skiljanlegur en hljómar ekki eins og eðlileg nútímaíslenska;
3. málfræði-, beygingar-, setningagerðar-, stíl-, skráningar-, stafsetningar-, greinarmerkja- og typógrafíuvillum;
4. ósamræmi í hugtökum milli `/about/` og UI;
5. röngum eða vafasömum íslenskum þýðingum tæknilegra hugtaka;
6. placeholders sem eru í röngu málfræðilegu eða merkingarlegu hlutverki;
7. rangri eða óeðlilegri metadata-, title-, ARIA-, manifest-, fallback- eða accessibility-merkingu;
8. röngu letri, ritstefnu, BiDi-hegðun eða grunsamlegri blöndu ritkerfa;
9. líklegri textatengdri wrapping-, overflow- eða cramped-control-áhættu vegna íslensks orðalags. Þetta er textalegt áhættumat, ekki staðgengill fyrir síðar gerða raunverulega render-prófun.

Kanonísk föst gildi eru ófrávíkjanleg. Ekki leggja til að breyta formúlum, hash-gildum, code-literals, API-auðkennum, stable section IDs eða raunverulegum kanónískum heitum eingöngu til að þýða þau.

Sérreglur sem koma í veg fyrir falskar jákvæðar niðurstöður:

- Web App Manifest styður `*_localized` tungumálakort. Ekki telja ensku fallback-gildin `name`, `short_name`, `description`, `lang` eða `dir` sjálfkrafa íslenskan staðfærslugalla. Athugaðu þess í stað hvort íslenska eigi fullkomnar og réttar færslur í `name_localized`, `short_name_localized` og `description_localized`, með réttu tungumáli og stefnu.
- Static HTML getur innihaldið ensk bootstrap-gildi á elementum með `data-i18n` eða `data-i18n-attr`. Runtime-staðfærslan skiptir þeim út þegar íslenskt locale hefur verið virkjað. Ekki tilkynna þessi source-default ein og sér sem galla; tilkynntu þau aðeins ef kóðaflæði sýnir að þau geta raunverulega verið sýnileg eftir íslenska locale-initialization eða í raunverulegri villu-/fallback-leið.
- Locale-resolution þessa static site er sjálft gert með JavaScript. `noscript`-fallbackið er viljandi tungumálahlutlaust og inniheldur aðeins sérnafnið `JavaScript` auk viðvörunartákns. Ekki telja það enska tungumálaleka. Tilkynntu hins vegar annan náttúrulegan texta á röngu tungumáli eða raunverulegan accessibility-galla sem er óháður locale-resolution.

Þú færð `MODE` og `SOURCE_PART` neðan við þessi fyrirmæli.

Ef `MODE=FINDINGS_ONLY`:
- rýndu eingöngu gefinn `SOURCE_PART`;
- skilaðu aðeins íslenskum findings fyrir þann hluta;
- hvert finding skal hafa severity (`critical`, `high`, `medium`, `low`), skrá/staðsetningu eins nákvæma og gögn leyfa, núverandi texta eða vandamálið, rök og ráðlagða leiðréttingu;
- ef ekkert raunverulegt vandamál finnst, segðu það skýrt;
- EKKI skrifa `NATIVE_QA_RESULT` í þessari milliumferð.

MODE=FINDINGS_ONLY
SOURCE_PART=UI

===== docs/i18n/locales/is.js — FULL TARGET LOCALE =====
"use strict";

export default Object.freeze({
  "code": "is",
  "displayName": "Íslenska",
  "dir": "ltr",
  "intlLocale": "is-IS",
  "messages": {
    "meta.description": "Pastafari-dagatal með dagsetningarleit og samanburði.",
    "manifest.shortName": "Pastafari",
    "manifest.defaultDescription": "Pastafari-dagatal sem reiknar á tækinu og skilar sömu niðurstöðu fyrir sama inntak.",
    "app.title": "Pastafari-dagatal",
    "nav.skip": "Fara í dagsetningarleit",
    "app.intro": "Finndu dagsetningu í einu dagatalanna sem vefurinn styður. Þá sérðu fulla Pastafari-dagsetningu þess dags og kótelettuna sem hann tilheyrir.",
    "guide.open": "Hvernig nota ég þennan vef?",
    "guide.openShort": "Hvernig á að nota vefinn",
    "reverse.error.absoluteDateField": "Dagsetningin inniheldur ógilt gildi.",
    "reverse.error.limitSafeInteger": "Gildi reitsins „{field}“ er utan öruggs heiltölusviðs.",
    "reverse.error.limitPositive": "Gildi reitsins „{field}“ verður að vera jákvætt.",
    "app.brand": "PASTAFARI",
    "about.open": "Um Pastafari-dagatalið",
    "about.openShort": "Um dagatalið",
    "about.title": "Um Pastafari-dagatalið",
    "about.metaDescription": "Skýring á Pastafari-dagatalinu: aðgerðardagur og fyrirspurnardagur, ár, kótelettur, fléttaðir mánuðir, dagamörk og háþróuð kerfi.",
    "about.intro": "Hvernig dagatalið sýnir daga, ár, kótelettur, fléttaða mánuði og aðgerðardaginn.",
    "about.skip": "Fara í skýringu dagatalsins",
    "about.back": "Til baka í dagatalið",
    "about.tocKicker": "Á þessari síðu",
    "about.toc": "Efnisyfirlit",
    "about.fallbackNotice": "Skýringin er ekki tiltæk á völdu tungumáli; hebreska útgáfan er sýnd í staðinn.",
    "about.loadError": "Ekki tókst að hlaða skýringu dagatalsins.",
    "language.label": "Tungumál",
    "day.staleWarning": "Núverandi dagur breyttist úr {previousDate} í {currentDate}. Þar sem aðgerðardagurinn fylgdi deginum í dag eru dagsetningarnar sem birtast ekki lengur uppfærðar. Þær verða reiknaðar aftur eftir að þú lokar þessum skilaboðum.",
    "location.assumption": "(Ef engar upplýsingar benda til annars er gert ráð fyrir að tækið sé í Kisurra.)",
    "location.useDevice": "Nota staðsetningu tækisins",
    "search.kicker": "Dagsetningarleit",
    "search.heading": "Hvaða dag viltu finna?",
    "search.intro": "Veldu dagatal, sláðu inn dagsetningu og veldu „Sýna dagsetningu“. Núverandi Pastafari-dagur er sjálfgefinn í reitunum.",
    "search.calendarLabel": "Dagatal fyrir innslátt",
    "search.submit": "Sýna dagsetningu",
    "search.invalid": "Ekki tókst að lesa dagsetninguna. Gakktu úr skugga um að allir reitir séu útfylltir og að dagsetningin sé til í valda dagatalinu.",
    "settings.summary": "Valkostir fyrir útreikning og samanburð",
    "settings.heading": "Breyta aðgerðardegi",
    "settings.intro": "Aðgerðardagurinn er upphafspunktur útreikningsins. Sjálfgefið notar vefurinn núverandi Pastafari-dag sem ákvarðaður er fyrir virka staðsetningu athugandans.",
    "settings.actionCalendarLabel": "Dagatal til að slá inn aðgerðardag",
    "settings.apply": "Nota aðgerðardag",
    "settings.reset": "Endurstilla á núverandi Pastafari-dag",
    "settings.invalid": "Aðgerðardagurinn er ógildur. Athugaðu dagsetninguna og reyndu aftur.",
    "comparison.toggle": "Bera tvo útreikninga saman hlið við hlið",
    "comparison.toggleHelp": "Tiltækt á breiðum skjá. Hver lína sýnir sama fyrirspurnardag með tveimur mismunandi aðgerðardögum.",
    "comparison.secondActionLabel": "Dagatal til að slá inn seinni aðgerðardaginn",
    "comparison.apply": "Uppfæra samanburð",
    "comparison.kicker": "Samanburður dag fyrir dag",
    "comparison.heading": "Sömu dagar, tveir aðgerðardagar",
    "comparison.intro": "Hver lína inniheldur nákvæmlega sama fyrirspurnardag. Aðeins aðgerðardagurinn er ólíkur í dálkunum tveimur.",
    "comparison.sameDay": "Sami fyrirspurnardagur í báðum útreikningum",
    "comparison.actionHeading": "Aðgerðardagur: {date}",
    "comparison.summary": "Sýndir eru {count} dagar, frá fyrsta til síðasta dags kótelettunnar sem birtist í fyrri útreikningnum.",
    "comparison.scrollAria": "Samanburðartafla sömu daga undir tveimur útreikningum",
    "comparison.desktopOnly": "Öll samanburðartaflan er tiltæk á breiðum skjá.",
    "comparison.invalid": "Seinni aðgerðardagurinn er ógildur. Athugaðu dagsetninguna og reyndu aftur.",
    "field.year": "Ár",
    "field.month": "Mánuður",
    "field.day": "Dagur",
    "field.relatedYear": "Samsvarandi gregorískt ár",
    "field.leapMonth": "Innskotsmánuður",
    "field.era": "Tímabil",
    "field.eraYear": "Ár innan tímabils",
    "field.ayyamiHa": "Ayyám-i-Há",
    "field.baktun": "Baktun",
    "field.katun": "Katun",
    "field.tun": "Tun",
    "field.uinal": "Uinal",
    "field.kin": "Kin",
    "field.correlation": "Fylgnitala",
    "era.meiji": "Meiji",
    "era.taisho": "Taishō",
    "era.showa": "Shōwa",
    "era.heisei": "Heisei",
    "era.reiwa": "Reiwa",
    "calendarInput.gregorian": "Gregorískt",
    "calendarInput.julian": "Júlíanskt",
    "calendarInput.hebrew": "Hebreskt",
    "calendarInput.islamicCivil": "Borgaralegt íslamskt",
    "calendarInput.islamicUmmAlQura": "Umm al-Qura",
    "calendarInput.solarHijriOfficial": "Sól-Hijri — opinbert",
    "calendarInput.solarHijriArithmetic": "Sól-Hijri — 2.820 ára reikniaðferð",
    "calendarInput.chinese": "Kínverskt",
    "calendarInput.hinduOldSolar": "Fornt hindúdagatal — sólarform",
    "calendarInput.hinduOldLunar": "Fornt hindúdagatal — tunglform",
    "calendarInput.saka": "Saka",
    "calendarInput.thaiBuddhist": "Taílenskt búddískt",
    "calendarInput.ethiopic": "Eþíópískt",
    "calendarInput.coptic": "Koptískt",
    "calendarInput.japaneseImperial": "Japanskt keisaradagatal",
    "calendarInput.minguo": "Minguo",
    "calendarInput.bahaiTehran": "Bahá’í — jafndægur í Teheran",
    "calendarInput.bahaiWestern": "Bahá’í — vestrænt reiknað",
    "calendarInput.mayaLongCount": "Langtal Maya",
    "calendarHelp.hebrew": "Mánuðir eru valdir eftir nafni. Ár og dag má slá inn með tugatölustöfum eða hebreskum talnastöfum, til dæmis \u2067תשפ״ו\u2069 eða \u2067י״ד\u2069; ef ár er ritað með hebreskum talnastöfum án þúsundamerkis er 5.000 bætt við það.",
    "calendarHelp.intl": "Þessi umbreyting notar dagatalsstuðning sem er innbyggður í vafrann. Ef vafrinn getur ekki sýnt dagsetninguna segir vefurinn það skýrt.",
    "calendarHelp.chinese": "Sláðu inn gregoríska árið sem samsvarar kínverska árinu og merktu „Innskotsmánuður“ aðeins fyrir endurtekna mánuðinn.",
    "calendarHelp.hindu": "Sláðu inn ár og dag samkvæmt forna hindúatalinu og veldu mánuðinn eftir nafni. Í tunglforminu má einnig merkja innskotsmánuð.",
    "calendarHelp.japanese": "Ár 1 hefst á fyrsta degi tímabilsins; fyrir fyrsta árið má einnig slá inn 元 eða 元年. Dagsetningu fyrir upphaf eða eftir lok tímabilsins er hafnað.",
    "calendarHelp.bahai": "Veldu mánuð eftir nafni eða Ayyám-i-Há. Formið sem byggir á jafndægri í Teheran styður venjulegt gregorískt bil 1844–3000.",
    "calendarHelp.maya": "Sjálfgefna fylgnitalan er GMT 584.283. Þú getur breytt henni ef þú notar aðra fylgni.",
    "loading.kicker": "Reiknað staðbundið",
    "loading.title": "Leitað að kótelettu og dagsetningu…",
    "error.kicker": "Ekki er hægt að sýna dagatalið",
    "error.title": "Ekki tókst að hlaða útreikningsvélinni",
    "error.reload": "Hlaða aftur",
    "error.timeout": "Útreikningurinn tekur of langan tíma.",
    "error.engineFailed": "Útreikningsvélin bilaði.",
    "error.engineLoadFailed": "Ekki tókst að hlaða útreikningsvélinni.",
    "calendar.toolbarAria": "Flakk milli kótelettna",
    "calendar.previous": "Fyrri kóteletta",
    "calendar.today": "Til baka í dag",
    "calendar.next": "Næsta kóteletta",
    "calendar.daysAria": "Dagar í kótelettunni {cutletName}",
    "calendar.currentCutlet": "Ár {year} · kóteletta",
    "calendar.cutletDescription": "{count} dagar · aðgerðardagur: {actionDate}",
    "calendar.targetOutside": "Dagsetningin sem þú leitaðir að er ekki í kótelettunni sem nú er sýnd. Þú getur haldið áfram að fletta eða leitað að annarri dagsetningu.",
    "year.kicker": "Árið í hnotskurn",
    "year.heading": "Uppbygging árs {year}",
    "year.context": "Þessi uppbygging er reiknuð fyrir aðgerðardaginn {actionDate}. Ef aðgerðardeginum er breytt getur þurft að byggja ársmörk, kótelettur og mánuði upp að nýju.",
    "year.loading": "Byggir upp alla ársuppbygginguna…",
    "year.error": "Ekki tókst að byggja upp alla ársuppbygginguna. Kótelettusýnin er áfram tiltæk.",
    "year.lengthLabel": "Lengd ársins",
    "year.cutletCountLabel": "Kótelettur",
    "year.monthCountLabel": "Mánuðir",
    "year.rangeLabel": "Gregorískt dagabil",
    "year.daysValue": "{count} dagar",
    "year.rangeValue": "{startDate}–{endDate}",
    "year.displayedCutletPosition": "Sýnda kótelettan nær yfir daga {start}–{end} ársins.",
    "year.targetPosition": "Dagsetningin sem þú leitaðir að er dagur {day} af {length} í þessu ári.",
    "year.monthExplainer": "Mánuðir fléttast óháð kótelettum í gegnum árið: mánuður er ekki undirdeild kótelettu og dagar hans geta birst í mörgum aðskildum runum. Lengd mánaðar er því heildarfjöldi daga sem honum er úthlutað, ekki endilega eitt samfellt tímabil.",
    "year.cutletsSummary": "Kótelettur á þessu ári ({count})",
    "year.monthsSummary": "Mánuðir á þessu ári ({count})",
    "year.numberedName": "{number}. {name}",
    "year.cutletMeta": "Lengd: {length} dagar · staða í árinu: dagar {start}–{end}",
    "year.monthMeta": "Dagar: {length} · samfelldar runur: {runs} · fyrsta birting: dagur {first} · síðasta: dagur {last}",
    "target.today": "Þetta er í dag",
    "target.searched": "Þetta er dagsetningin sem þú leitaðir að",
    "target.context": "Fyrirspurnardagur: {targetDate} · aðgerðardagur: {actionDate}",
    "target.notInView": "Dagsetningin sem þú leitaðir að er enn varðveitt; kótelettan sem nú er sýnd er önnur.",
    "date.aria": "Ár {year} frá sköpun heimsins, dagur {dayInCutlet} í kótelettunni {cutletName}, dagur {dayInMonth} í mánuðinum {monthName}",
    "date.yearLine": "Ár {year} frá sköpun heimsins",
    "date.cutletLine": "Dagur {dayInCutlet} í kótelettunni {cutletName}",
    "date.monthLine": "Dagur {dayInMonth} í mánuðinum {monthName}",
    "guide.eyebrow": "Notkunarleiðbeiningar",
    "guide.heading": "Hvað er hægt að gera hér og hvernig?",
    "guide.intro": "Vefurinn sýnir fulla Pastafari-dagsetningu fyrir hvaða dag sem er, tekur við leit í mörgum dagatölum og getur á breiðum skjá borið saman áhrif aðgerðardagsins.",
    "guide.1.heading": "Opnaðu vefinn og sjáðu dagsetningu dagsins",
    "guide.1.body": "Um leið og tengillinn opnast ákvarðar vefurinn núverandi Pastafari-dag fyrir virka staðsetningu athugandans og sýnir kótelettuna sem hann tilheyrir. Dagamörkin eru staðsetningarháði tímapunkturinn þegar miðja Venusar fer um neðri hluta staðbundna hádegisbaugsins, eins og lýst er í ASTRONOMICAL-DAY.md; þau eru ekki borgaralegt miðnætti. Engin skráning eða innskráning er nauðsynleg og engin dagsetning er send á reikniþjón.",
    "guide.2.heading": "Leitaðu í hvaða dagatali sem vefurinn styður",
    "guide.2.body": "Undir „Hvaða dag viltu finna?“ velurðu dagatal, fyllir út reitina og velur „Sýna dagsetningu“. Valkostirnir eru meðal annars gregorískt, hebreskt, júlíanskt, íslamskt, persneskt, kínverskt og taílenskt dagatal, fornt hindúdagatal, Saka-dagatal, eþíópískt, koptískt og japanskt dagatal, minguo- og bahá’í-dagatal, auk langtals Maya.",
    "guide.3.heading": "Lestu dagsetninguna",
    "guide.3.body": "Hver reitur hefur þrjár fastar línur: ár frá sköpun heimsins; númer dags í kótelettunni og nafn hennar; síðan dag í mánuðinum og nafn mánaðarins. Engin ein tala táknar alla dagsetninguna. Nafn mánaðarins ræður lit reitsins.",
    "guide.4.heading": "Flettu án þess að velja fyrir mistök",
    "guide.4.body": "„Fyrri kóteletta“ og „Næsta kóteletta“ fara í nágrannakótelettur. Aðrir dagareitir eru ekki hnappar, því ekki er hægt að framkvæma aðgerð með því að smella á þá. „Til baka í dag“ endurstillir bæði leitina og aðgerðardaginn á núverandi Pastafari-dag.",
    "guide.5.heading": "Breyttu aðgerðardeginum",
    "guide.5.body": "Opnaðu „Valkostir fyrir útreikning og samanburð“ undir leitinni. Þar geturðu valið dagatal og slegið inn annan aðgerðardag. Næstu leitir nota hann þar til þú endurstillir á núverandi Pastafari-dag. Þessi háþróaði valkostur er tiltækur án þess að þyngja venjulegu sýnina.",
    "guide.6.heading": "Berðu sömu daga saman tvisvar",
    "guide.6.body": "Á breiðum skjá virkjarðu samanburðinn á sama stað. Hver lína inniheldur nákvæmlega sama fyrirspurnardag; fyrri dálkurinn notar fyrri aðgerðardaginn og sá seinni hinn. Sjálfgefið er að bera í dag saman við morgundaginn, svo auðvelt er að sjá hvaða Pastafari-dagsetningar breytast.",
    "guide.7.heading": "Skoðaðu allt árið",
    "guide.7.body": "Undir kótelettusýninni sýnir vefurinn uppbyggingu sýnda ársins: lengd og bil, hverja kótelettu og lengd hennar, og hvern mánuð. Fyrir mánuði sýnir hann einnig fjölda samfelldra runa og fyrstu og síðustu birtingu, svo fléttunin í gegnum árið verður sýnileg.",
    "guide.note": "Raðir og dálkar reitanetsins eru aðeins sjónræn uppröðun, ekki vikur. Í samanburðartöflunni hefur röðunin hins vegar merkingu: hver lína er sami fyrirspurnardagurinn.",
    "guide.back": "Til baka í leit og dagatal",
    "footer.local": "Útreikningurinn fer fram á tækinu þínu; vefurinn hefur engan notandareikning og engan rakningarkóða.",
    "footer.open": "Tengillinn er opinber og opnast beint, einnig í einkavafraglugga.",
    "reverse.kicker": "Öfug leit",
    "reverse.heading": "Finna dag út frá Pastafari-dagsetningu hans",
    "reverse.intro": "Sláðu inn fulla Pastafari-dagsetningu og skilgreindu aðgerðardag hennar. Leitin fer fram staðbundið á þessu tæki.",
    "reverse.mode.basic": "Ein dagsetning",
    "reverse.mode.advanced": "Skorðuleit",
    "reverse.basic.heading": "Öfug leit að einni dagsetningu",
    "reverse.basic.dateHeading": "Pastafari-dagsetning sem á að finna",
    "reverse.field.year": "Ár",
    "reverse.field.cutlet": "Kóteletta",
    "reverse.field.dayInCutlet": "Dagur í kótelettu",
    "reverse.field.month": "Mánuður",
    "reverse.field.dayInMonth": "Dagur í mánuði",
    "reverse.basic.calculationHeading": "Aðgerðardagur",
    "reverse.basic.calculationMode": "Hvernig er aðgerðardagurinn skilgreindur?",
    "reverse.basic.calculation.active": "Nota virkan aðgerðardag vefsins",
    "reverse.basic.calculation.absolute": "Nota aðra þekkta dagsetningu",
    "reverse.basic.calculation.same": "Aðgerðardagurinn er sami dagur og fyrirspurnardagurinn (c = t)",
    "reverse.basic.calculation.pastafari": "Aðgerðardagurinn er einnig Pastafari-dagur eða háður öðrum dagsetningum",
    "reverse.basic.activeValue": "Virkur aðgerðardagur: {date}",
    "reverse.basic.absoluteHeading": "Þekktur aðgerðardagur",
    "reverse.basic.sameHeading": "Endanlegt leitarsvið fyrir c = t",
    "reverse.basic.rangeStart": "Upphaf sviðs",
    "reverse.basic.rangeEnd": "Lok sviðs",
    "reverse.basic.toAdvanced": "Halda áfram í ritil fyrir skorðuleit",
    "reverse.basic.toAdvancedHelp": "Endurkvæm tengsl milli Pastafari-aðgerðardaga eru sett fram sem breytur og skorður, svo hægt sé að lengja keðjuna án gervilegra dýptarmarka.",
    "reverse.action.solve": "Leita",
    "reverse.action.cancel": "Hætta við leit",
    "reverse.action.open": "Opna í dagatali",
    "reverse.action.addVariable": "Bæta við dagsetningarbreytu",
    "reverse.action.addConstraint": "Bæta við skorðu",
    "reverse.action.remove": "Fjarlægja",
    "reverse.action.clear": "Hreinsa niðurstöður",
    "reverse.progress.reverse": "Úrvinnsla Pastafari-tengsla",
    "reverse.progress.verify": "Staðfesting mögulegra lausna",
    "reverse.progress.done": "Leit lokið",
    "reverse.progress.scanned": "Unnar vinnueiningar: {count}",
    "reverse.status.running": "Leitað á tækinu…",
    "reverse.status.cancelled": "Leit hætt við.",
    "reverse.status.superseded": "Nýrri leit kom í stað þessarar leitar.",
    "reverse.status.completeEmpty": "Tæmandi leit yfir allt leitarsviðið lauk án þess að lausn fyndist.",
    "reverse.status.completeSolutions": "Leit lokið. Allar lausnir á leitarsviðinu ({count}) eru sýndar.",
    "reverse.status.partialEmpty": "Leitin stöðvaðist áður en henni lauk. Engin lausn hefur fundist enn.",
    "reverse.status.partialSolutions": "Staðfestar lausnir sem fundust: {count}. Leitin stöðvaðist áður en henni lauk; fleiri lausnir gætu verið til.",
    "reverse.status.stale": "Þessar niðurstöður notuðu fyrri virkan aðgerðardag. Keyrðu leitina aftur til að nota þann núverandi.",
    "reverse.status.rangeRequired": "Ekki er hægt að ljúka leitinni fyrr en endanlegt leitarsvið eða föst dagsetning hefur verið skilgreind.",
    "reverse.status.timeout": "Leitin náði tímamörkum áður en henni lauk.",
    "reverse.status.failed": "Villa kom upp í öfugu leitinni.",
    "reverse.result.heading": "Lausnir",
    "reverse.result.solution": "Lausn {index}",
    "reverse.result.target": "Fyrirspurnardagur",
    "reverse.result.calculation": "Aðgerðardagur",
    "reverse.result.jdn": "JDN {jdn}",
    "reverse.result.complete": "Full leit",
    "reverse.result.partial": "Leit að hluta",
    "reverse.advanced.heading": "Skorðuleit",
    "reverse.advanced.intro": "Skilgreindu dagsetningarbreytur og tengsl þeirra. Hringir eru leyfðir þegar kerfið er þrengt að endanlegum sviðum.",
    "reverse.variables.heading": "Dagsetningarbreytur",
    "reverse.variable.label": "Birtingarnafn",
    "reverse.variable.defaultName": "Dagsetning {index}",
    "reverse.variable.domain": "Svið",
    "reverse.variable.domain.unknown": "Óþekkt (verður að takmarkast af öðrum skorðum)",
    "reverse.variable.domain.exact": "Nákvæm þekkt dagsetning",
    "reverse.variable.domain.range": "Endanlegt dagsetningarsvið",
    "reverse.constraint.heading": "Skorður",
    "reverse.constraint.type": "Tegund skorðu",
    "reverse.constraint.pastafari": "Pastafari-dagsetning",
    "reverse.constraint.equal": "Sami dagur á tímalínunni",
    "reverse.constraint.order": "Tímaröð",
    "reverse.constraint.difference": "Mismunur í dögum",
    "reverse.constraint.left": "Vinstri dagsetning",
    "reverse.constraint.right": "Hægri dagsetning",
    "reverse.constraint.target": "Dagsetningarbreyta fyrir fyrirspurnardag",
    "reverse.constraint.calculationMode": "Uppruni aðgerðardags",
    "reverse.constraint.calculation.variable": "Önnur dagsetningarbreyta",
    "reverse.constraint.calculation.absolute": "Þekkt dagsetning",
    "reverse.constraint.calculation.same": "Sama og fyrirspurnardagur (c = t)",
    "reverse.constraint.calculationVariable": "Aðgerðardagsbreyta",
    "reverse.constraint.orderOp": "Tengsl",
    "reverse.constraint.differenceMode": "Mismunarregla",
    "reverse.constraint.differenceExact": "Nákvæmur mismunur",
    "reverse.constraint.differenceRange": "Mismunarsvið",
    "reverse.constraint.equals": "Nákvæmir dagar (vinstri − hægri)",
    "reverse.constraint.min": "Lágmarksdagar (vinstri − hægri)",
    "reverse.constraint.max": "Hámarksdagar (vinstri − hægri)",
    "reverse.options.heading": "Leitarmörk",
    "reverse.options.intro": "Skildu reitina auða ef þú vilt að engin mörk gildi. Mörkum er aldrei beitt án þess að það sé tekið fram.",
    "reverse.options.maxSolutions": "Stöðva eftir þennan fjölda staðfestra lausna",
    "reverse.options.maxScanned": "Stöðva eftir þennan fjölda vinnueininga",
    "reverse.options.timeout": "Tímamörk í millisekúndum",
    "reverse.advanced.emptyVariables": "Bættu við að minnsta kosti einni dagsetningarbreytu.",
    "reverse.advanced.emptyConstraints": "Kerfi má vera án skorða, en sérhver breyta sem eftir er verður samt að hafa endanlegt svið.",
    "reverse.error.input": "Nokkra reiti öfugrar leitar vantar eða þeir eru ógildir.",
    "reverse.error.range": "Lok sviðs mega ekki vera á undan upphafi þess.",
    "reverse.error.variable": "Sérhver skorða verður að vísa í dagsetningarbreytu sem er til.",
    "reverse.error.pastafari": "Sláðu inn alla fimm reiti Pastafari-dagsetningarinnar.",
    "reverse.calendar.label": "Dagatal fyrir þekkta dagsetningu",

  },
  "calendar": {
    "cutlets": {
      "bronze": "Brons",
      "fox": "Refur",
      "kidney": "Nýra",
      "lagash": "Lagash",
      "thought": "Hugsun",
      "fourPartsOfNine": "Fjórir hlutar af níu",
      "palgurash": "Palgúrasj",
      "papyrusSedge": "Papýrusstör",
      "cluster": "Klasi",
      "scorpion": "Sporðdreki",
      "ash": "Aska",
      "wheat": "Hveiti",
      "river": "Á",
      "laughter": "Hlátur",
      "akkad": "Akkad",
      "horn": "Horn",
      "theEmptyJar": "Tóma krukkan"
    },
    "months": {
      "clay": "Leir",
      "pomegranate": "Granatepli",
      "elbow": "Olnbogi",
      "envy": "Öfund",
      "eridu": "Eridu",
      "toothpaste": "Tannkrem",
      "threePartsOfFive": "Þrír hlutar af fimm",
      "karshumav": "Karsjúmav",
      "leopard": "Hlébarði",
      "tin": "Tin",
      "mist": "Þoka",
      "frankincense": "Reykelsi",
      "spindle": "Snælda",
      "rib": "Rifbein",
      "carob": "Karób",
      "uruk": "Uruk",
      "shame": "Skömm",
      "camel": "Úlfaldi",
      "copper": "Kopar",
      "well": "Brunnur",
      "yolk": "Eggjarauða",
      "star": "Stjarna",
      "honey": "Hunang",
      "spleen": "Milta",
      "limestone": "Kalksteinn",
      "joy": "Gleði",
      "fig": "Fíkja",
      "nineveh": "Níníve",
      "frog": "Froskur",
      "pitch": "Bik",
      "lamp": "Lampi",
      "theClosedDoor": "Lokaða hurðin",
      "sesame": "Sesam",
      "nape": "Hnakki",
      "silver": "Silfur",
      "susa": "Susa",
      "storm": "Stormur",
      "donkey": "Asni",
      "flour": "Mjöl",
      "regret": "Eftirsjá",
      "babylon": "Babýlon",
      "tongue": "Tunga",
      "flax": "Hör",
      "salt": "Salt",
      "pear": "Pera",
      "bow": "Bogi",
      "sand": "Sandur"
    }
  },
  "terminology": {
    "foundationDay": "Stofndagur",
    "workingNumber": "Aðgerðartala",
    "queryNumber": "Fyrirspurnartala",
    "distanceNumber": "Fjarlægðartala",
    "sumNumber": "Summatala",
    "directionNumber": "Stefnutala",
    "bowl": "Skál",
    "drop": "Dropi",
    "gate": "Hlið",
    "yearFiveThousand": "Ár fimm þúsund frá sköpun heimsins"
  }
});


===== docs/index.html — I18N KEY INVENTORY =====
about.open
about.openShort
app.brand
app.intro
app.title
aria-label:calendar.toolbarAria
aria-label:comparison.scrollAria
calendar.next
calendar.previous
calendar.targetOutside
calendar.today
comparison.apply
comparison.desktopOnly
comparison.heading
comparison.intro
comparison.kicker
comparison.sameDay
comparison.secondActionLabel
comparison.toggle
comparison.toggleHelp
content:meta.description
error.kicker
error.reload
error.title
footer.local
footer.open
language.label
loading.kicker
loading.title
nav.skip
search.calendarLabel
search.heading
search.intro
search.kicker
search.submit
settings.actionCalendarLabel
settings.apply
settings.heading
settings.intro
settings.reset
settings.summary
year.cutletCountLabel
year.kicker
year.lengthLabel
year.loading
year.monthCountLabel
year.monthExplainer
year.rangeLabel

===== docs/index.html — RAW METADATA/A11Y/FALLBACK =====
2: <html lang="en" dir="ltr">
…
4:     <meta charset="utf-8">
5:     <meta name="viewport" content="width=device-width, initial-scale=1">
6:     <noscript><meta http-equiv="refresh" content="0; url=./no-js/"></noscript>
7:     <meta name="theme-color" content="#672013">
8:     <meta name="description" content="A local, deterministic Pastafari calendar." data-i18n-attr="content:meta.description">
9:     <meta name="color-scheme" content="light">
10:     <meta http-equiv="Content-Security-Policy" content="default-src 'self'; base-uri 'none'; object-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; worker-src 'self'; manifest-src 'self'">
11:     <title data-i18n="app.title">Pastafari Calendar</title>
…
37:       <section class="search-panel" id="search-panel" aria-labelledby="search-heading">
…
95:       <section class="reverse-panel" id="reverse-panel" aria-labelledby="reverse-heading">
…
99:       <section class="status-panel" id="loading-panel" aria-labelledby="loading-heading" aria-live="polite" aria-busy="true">
100:         <span class="loader" aria-hidden="true"></span>
…
107:       <section class="status-panel error-panel" id="error-panel" aria-labelledby="error-heading" role="alert" hidden>
…
114:       <section class="calendar-workspace" id="calendar-workspace" aria-labelledby="cutlet-heading" hidden>
115:         <article class="target-beacon" id="target-beacon" aria-live="polite">
…
127:           <div class="toolbar-actions" role="group" data-i18n-attr="aria-label:calendar.toolbarAria">
…
137:         <section class="year-overview" id="year-overview" aria-labelledby="year-overview-heading">
…
158:                 <ol class="structure-list" id="year-cutlet-list" tabindex="0" aria-labelledby="year-cutlets-summary"></ol>
…
162:                 <ol class="structure-list month-structure-list" id="year-month-list" tabindex="0" aria-labelledby="year-months-summary"></ol>
…
169:       <section class="comparison-workspace" id="comparison-workspace" aria-labelledby="comparison-heading" hidden>
…
176:         <div class="comparison-scroll" role="region" tabindex="0" data-i18n-attr="aria-label:comparison.scrollAria">
…
198:     <noscript>

===== docs/about/index.html — I18N KEY INVENTORY =====
about.back
about.fallbackNotice
about.intro
about.loadError
about.skip
about.title
about.toc
about.tocKicker
app.brand
aria-label:about.toc
content:about.metaDescription
footer.local
footer.open
guide.1.body
guide.1.heading
guide.2.body
guide.2.heading
guide.3.body
guide.3.heading
guide.4.body
guide.4.heading
guide.5.body
guide.5.heading
guide.6.body
guide.6.heading
guide.7.body
guide.7.heading
guide.back
guide.eyebrow
guide.heading
guide.intro
guide.note
guide.open
language.label

===== docs/about/index.html — RAW METADATA/A11Y/FALLBACK =====
2: <html lang="en" dir="ltr">
…
4:     <meta charset="utf-8">
5:     <meta name="viewport" content="width=device-width, initial-scale=1">
6:     <noscript><meta http-equiv="refresh" content="0; url=../no-js/"></noscript>
7:     <meta name="theme-color" content="#672013">
8:     <meta name="description" content="An explanation of the Pastafari Calendar." data-i18n-attr="content:about.metaDescription">
9:     <meta name="color-scheme" content="light">
10:     <meta http-equiv="Content-Security-Policy" content="default-src 'self'; base-uri 'none'; object-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; worker-src 'self'; manifest-src 'self'">
11:     <title data-i18n="about.title">About the Pastafari Calendar</title>
…
41:         <nav data-i18n-attr="aria-label:about.toc">
…
47:         <article id="article-content" class="about-article" aria-busy="true" tabindex="-1"></article>
…
50:         <section class="about-site-usage" id="site-usage" aria-labelledby="guide-heading" data-toc-section data-toc-level="2">
…
76:     <noscript>

===== docs/manifest.webmanifest — FALLBACK + TARGET LOCALE =====
1: {
2:   "id": "./",
3:   "name": "Pastafari Calendar",
4:   "name_localized": {
5:     "he": {
6:       "value": "לוח השנה הפסטפרי",
7:       "lang": "he",
8:       "dir": "rtl"
9:     },
10:     "en": {
11:       "value": "Pastafari Calendar",
12:       "lang": "en",
…
160:     "id": {
161:       "value": "Kalender Pastafari",
162:       "lang": "id",
163:       "dir": "ltr"
164:     },
165:     "is": {
166:       "value": "Pastafari-dagatal",
167:       "lang": "is",
168:       "dir": "ltr"
169:     },
170:     "it": {
…
523:     "id": {
524:       "value": "Pastafari",
525:       "lang": "id",
526:       "dir": "ltr"
527:     },
528:     "is": {
529:       "value": "Pastafari",
530:       "lang": "is",
531:       "dir": "ltr"
532:     },
533:     "it": {
…
886:     "id": {
887:       "value": "Kalender Pastafari dengan pencarian dan perbandingan tanggal.",
888:       "lang": "id",
889:       "dir": "ltr"
890:     },
891:     "is": {
892:       "value": "Pastafari-dagatal með dagsetningarleit og samanburði.",
893:       "lang": "is",
894:       "dir": "ltr"
895:     },
896:     "it": {
===== ASSISTANT =====
```
FINDINGS_ONLY
SOURCE_PART=UI

===== docs/i18n/locales/is.js — FULL TARGET LOCALE =====
"use strict";

export default Object.freeze({
  "code": "is",
  "displayName": "Íslenska",
  "dir": "ltr",
  "intlLocale": "is-IS",
  "messages": {
    "meta.description": "Pastafari-dagatal með dagsetningarleit og samanburði.",
    "manifest.shortName": "Pastafari",
    "manifest.defaultDescription": "Pastafari-dagatal sem reiknar á tækinu og skilar sömu niðurstöðu fyrir sama inntak.",
    "app.title": "Pastafari-dagatal",
    "nav.skip": "Fara í dagsetningarleit",
    "app.intro": "Finndu dagsetningu í einu dagatalanna sem vefurinn styður. Þá sérðu fulla Pastafari-dagsetningu þess dags og kótelettuna sem hann tilheyrir.",
    "guide.open": "Hvernig nota ég þennan vef?",
    "guide.openShort": "Hvernig á að nota vefinn",
    "reverse.error.absoluteDateField": "Dagsetningin inniheldur ógilt gildi.",
    "reverse.error.limitSafeInteger": "Gildi reitsins „{field}“ er utan öruggs heiltölusviðs.",
    "reverse.error.limitPositive": "Gildi reitsins „{field}“ verður að vera jákvætt.",
    "app.brand": "PASTAFARI",
    "about.open": "Um Pastafari-dagatalið",
    "about.openShort": "Um dagatalið",
    "about.title": "Um Pastafari-dagatalið",
    "about.metaDescription": "Skýring á Pastafari-dagatalinu: aðgerðardagur og fyrirspurnardagur, ár, kótelettur, fléttaðir mánuðir, dagamörk og háþróuð kerfi.",
    "about.intro": "Hvernig dagatalið sýnir daga, ár, kótelettur, fléttaða mánuði og aðgerðardaginn.",
    "about.skip": "Fara í skýringu dagatalsins",
    "about.back": "Til baka í dagatalið",
    "about.tocKicker": "Á þessari síðu",
    "about.toc": "Efnisyfirlit",
    "about.fallbackNotice": "Skýringin er ekki tiltæk á völdu tungumáli; hebreska útgáfan er sýnd í staðinn.",
    "about.loadError": "Ekki tókst að hlaða skýringu dagatalsins.",
    "language.label": "Tungumál",
    "day.staleWarning": "Núverandi dagur breyttist úr {previousDate} í {currentDate}. Þar sem aðgerðardagurinn fylgdi deginum í dag eru dagsetningarnar sem birtast ekki lengur uppfærðar. Þær verða reiknað aftur eftir að þú lokar þessum skilaboðum.",
    "location.assumption": "(Ef engar upplýsingar benda til annars er gert ráð fyrir að tækið sé í Kisurra.)",
    "location.useDevice": "Nota staðsetningu tækisins",
