# SUBREVIEW_SESSION
surface: ui
reviewer_model: Qwen3 8B Q4_K_M
attempts: 3

===== ORIGINAL_USER =====
/no_think

Jy is ’n onafhanklike, streng taal- en gebruikerskoppelvlakresensent vir die Afrikaanse weergawe van die Pastafari-kalender (lokaal `af-ZA`, repository-kode `af`).

ALLE gewone natuurlike-taalkommunikasie in hierdie beoordelingsessie moet in Afrikaans wees. Jy mag teks in ’n ander taal aanhaal wanneer jy dit as ’n gebrek rapporteer, en jy mag onveranderlike tegniese identifiseerders, API-name, formules, hashes, lêerpaaie en ander letterlike waardes weergee wat nie vertaal moet word nie.

Dit is ’n vars, onafhanklike LLM-beoordeling. Moenie vorige QA-gevolgtrekkings vertrou nie en moenie aanvaar dat bestaande formulering korrek of natuurlik is nie. Die taak is beoordeling, nie ’n volledige hervertaling van nuuts af nie.

Beoordeel die HELE sigbare en toeganklikheidsgerigte ervaring wanneer die webwerf in Afrikaans is, nie net `/about/` nie. Die omvang sluit die hoofkoppelvlak, datumsoektog, aksiedagkontroles, vergelyking, jaaroorsig, omgekeerde soektog, foute en toestande, gebruikersgids, footer, metadata/title, manifest, ARIA/a11y, noscript/fallback, taalwisseling en `/about/` in.

Soek aktief na:
1. teks in die verkeerde taal, veral Nederlands of Engels wat onbedoeld deurlek;
2. vertaaltaal, stywe, onnatuurlike of nie-idiomatiese moderne Afrikaans;
3. grammatika-, sintaksis-, kongruensie-, register-, leesteken-, spel- en tipografiese foute;
4. terminologiese teenstrydighede tussen `/about/` en die UI;
5. verkeerde of twyfelagtige Afrikaanse formulering van tegniese begrippe;
6. placeholders wat in die verkeerde grammatikale of semantiese rol gebruik word;
7. onakkurate of onnatuurlike metadata, title, ARIA, manifest-, fallback- of toeganklikheidsteks;
8. gemengde taal of skrif wat nie doelbewus tegnies is nie;
9. waarskynlike reëlbreking-, overflow- of beknopte-beheer-risiko’s wat deur die Afrikaanse bewoording veroorsaak word.

Kanonieke invariantes is verpligtend. Moenie formules, hashes, code literals, API-identifiseerders, stabiele section-ID’s of werklike kanonieke name verander bloot om dit natuurliker te laat klink nie.

Reëls om vals positiewe te voorkom:

- Die Web App Manifest ondersteun `*_localized`-taalkaarte. Moenie die basiese fallback-`name`, `short_name`, `description`, `lang` of `dir` bloot as ’n Afrikaanse fout rapporteer omdat gelokaliseerde inskrywings ook bestaan nie. Kontroleer eerder dat die Afrikaanse gelokaliseerde manifestinskrywings volledig en korrek is.
- Statiese HTML mag Engelse bootstrap-bronteks bevat op elemente met `data-i18n` of `data-i18n-attr`. Die runtime vervang dit ná locale-inisialisering. Moenie so ’n source-default alleen as fout rapporteer nie; rapporteer dit slegs as die kodepad wys dat dit ná Afrikaanse locale-inisialisering of op ’n werklike fallback/error-pad sigbaar kan bly.
- Locale-oplossing op die statiese webwerf word self deur JavaScript gedoen. Die `noscript`-fallback is doelbewus taalneutraal en bevat net die eienaam `JavaScript` plus ’n waarskuwingsimbool. Moenie dit as taaldefek rapporteer nie.
- Resensentinstruksies, `MODE`/`SOURCE_PART`-kontrolelyne, lêeropskrifte en opsommings van ander resensente is NIE webwerfteks nie. Gebruik nooit daardie teks as `current_text` nie en plaas nooit ’n finding in ’n prompt/artifact-lêer nie.
- ’n finding oor “verkeerde taal” is slegs geldig as jy werklike natuurlike-taalteks uit die verskafde webwerfbron presies kan aanhaal en die webwerflêer kan identifiseer.
- ’n voorgestelde correction wat identies aan `current_text` is, is geen finding nie.
- Die projek gebruik doelbewus terme soos `aksiedag`, `gevraagde dag`, `kotelet` en `verweefde maande`. Beoordeel of hulle konsekwent en grammaties gebruik word; moenie hulle bloot omdat hulle domeinspesifiek is vervang nie.

Jy sal hieronder `MODE` en `SOURCE_PART` ontvang.

As `MODE=FINDINGS_ONLY`:
- beoordeel net die verskafde `SOURCE_PART`;
- besluit duidelik: `CLEAN` as daar geen regstellingswaardige probleem is nie, anders `FINDINGS`;
- lewer ’n kort Afrikaanse opsomming en hoogstens ses presies gelokaliseerde findings;
- elke finding moet severity (`critical`, `high`, `medium`, of `low`), ’n presiese lêer/location, ’n kort presiese `current_text`, ’n duidelike probleem en ’n uitvoerbare correction bevat;
- `current_text` moet ’n presiese verbatim substring van die verskafde bron wees;
- elke `location` moet met `docs/` begin;
- voeg duplikate saam en moenie breë of ongegronde findings skep nie;
- as daar geen werklike probleem is nie, verduidelik kortliks in Afrikaans wat nagegaan is en waarom dit skoon is;
- moenie die hele bron, kode of lang bronpassasies terugkopieer nie;
- moenie self `SUBREVIEW_RESULT` of `NATIVE_QA_RESULT` skryf nie; die runner voeg die meganiese reëls by.

MODE=FINDINGS_ONLY
SOURCE_PART=UI
SURFACE_CONTRACT:
SCOPE_USER_VISIBLE_OR_ACCESSIBILITY_TEXT_ONLY=TRUE
IGNORE_APPLICATION_LOGIC=TRUE
LOCALE_FINDING_LOCATION_REQUIRES_TRANSLATION_KEY_FRAGMENT=TRUE
CURRENT_TEXT_MUST_EQUAL_EXACT_LOCALE_VALUE=TRUE
ACTIONABLE_CHANGE_REQUIRED=TRUE

===== docs/i18n/locales/af.js — FULL TARGET LOCALE =====
"use strict";

export default Object.freeze({
  "code": "af",
  "displayName": "Afrikaans",
  "dir": "ltr",
  "intlLocale": "af-ZA",
  "messages": {
    "meta.description": "'n Pastafariese kalender met datumsoektog en vergelyking.",
    "manifest.shortName": "Pastafari",
    "manifest.defaultDescription": "'n Plaaslike, deterministiese Pastafari-kalender.",
    "app.brand": "PASTAFARI",
    "app.title": "Pastafariese kalender",
    "nav.skip": "Ga naar datum soek",
    "app.intro": "Soek 'n dag in enige beskikbare kalender en bekyk daarna die volledige Pastafariese datum en die kotelet waarin die dag val.",
    "guide.open": "Hoe gebruik ek hierdie webwerf?",
    "guide.openShort": "Gebruik hierdie webwerf",
    "about.open": "Oor die Pastafariese kalender",
    "about.openShort": "Oor die kalender",
    "about.title": "Oor die Pastafariese kalender",
    "about.metaDescription": "Verduideliking van die Pastafariese kalender: aksiedag en gevraagde dag, jare, kotelette, verweefde maande, daggrens en gevorderde meganismes.",
    "about.intro": "Hoe die kalender dae, jare, kotelette, verweefde maande en die aksiedag voorstel.",
    "about.skip": "Gaan na die kalenderverduideliking",
    "about.back": "Terug na die kalender",
    "about.tocKicker": "Op hierdie bladsy",
    "about.toc": "Inhoud",
    "about.fallbackNotice": "Die verduideliking is nog nie in die gekose taal beskikbaar nie; die default weergawe word dus gewys.",
    "about.loadError": "Die kalenderverduideliking kon nie gelaai word nie.",
    "language.label": "Taal",
    "day.staleWarning": "Die huidige dag het van {previousDate} na {currentDate} verander. Omdat die aksiedag die huidige dag was, is die vertoonde datums nie meer op datum nie. Hulle sal herbereken word nadat jy hierdie boodskap gesluit het.",
    "location.assumption": "(By gebrek aan teenstrydige inligting word aanvaar dat die toestel in Kisurra is.)",
    "location.useDevice": "Gebruik toestel se ligging",
    "search.kicker": "Datum soek",
    "search.heading": "Watter dag wil jy vind?",
    "search.intro": "Kies 'n kalender, voer 'n datum in en kies ‘Wys datum’.",
    "search.calendarLabel": "Kalender vir invoer",
    "search.submit": "Wys datum",
    "search.invalid": "Die datum kon nie herken word nie. Kontroleer of al die velde ingevul is en of die datum in die gekose kalender bestaan.",
    "settings.summary": "Opsies vir berekening en vergelyking",
    "settings.heading": "Verander die aksiedag",
    "settings.intro": "Die aksiedag is die uitgangspunt van die berekening.",
    "settings.actionCalendarLabel": "Kalender vir die invoer van die aksiedag",
    "settings.apply": "Pas aksiedag toe",
    "settings.reset": "Terug na vandag",
    "settings.invalid": "Die aksiedag is ongeldig. Kontroleer die datum en probeer weer.",
    "comparison.toggle": "Vergelyk twee berekenings langs mekaar",
    "comparison.toggleHelp": "Beskikbaar op 'n breë rekenaarskerm. Elke ry toon dieselfde teikendag onder twee aksiedae.",
    "comparison.secondActionLabel": "Kalender vir die invoer van die tweede aksiedag",
    "comparison.apply": "Werk vergelyking by",
    "comparison.kicker": "Vergelyking volgens dag belyn",
    "comparison.heading": "Dieselfde dae, twee aksiedae",
    "comparison.intro": "Elke ry bevat dieselfde gevraagde dag. Net die aksiedag verskil tussen die eerste en tweede kolom.",
    "comparison.sameDay": "Dag wat albei berekenings deel",
    "comparison.actionHeading": "Aksiedag: {date}",
    "comparison.summary": "{count} dae word gewys, van die eerste tot die laaste dag van die kotelet wat deur die eerste berekening geopen is.",
    "comparison.scrollAria": "Vergelykingstabel met dieselfde dae onder twee berekenings",
    "comparison.desktopOnly": "Die volledige vergelykingstabel is op 'n breë rekenaarskerm beskikbaar.",
    "comparison.invalid": "Die tweede aksiedag is ongeldig. Kontroleer die datum en probeer weer.",
    "field.year": "Jaar",
    "field.month": "Maand",
    "field.day": "Dag",
    "field.relatedYear": "Ooreenstemmende Gregoriaanse jaar",
    "field.leapMonth": "Skrikkelmaand",
    "field.era": "Tydperk",
    "field.eraYear": "Jaar in tydperk",
    "field.ayyamiHa": "Ayyám-i-Há",
    "field.baktun": "Baktun",
    "field.katun": "Katun",
    "field.tun": "Tun",
    "field.uinal": "Uinal",
    "field.kin": "Kin",
    "field.correlation": "Korrelasiegetal",
    "era.meiji": "Meiji",
    "era.taisho": "Taishō",
    "era.showa": "Shōwa",
    "era.heisei": "Heisei",
    "era.reiwa": "Reiwa",
    "calendarInput.gregorian": "Gregoriaans",
    "calendarInput.julian": "Juliaans",
    "calendarInput.hebrew": "Hebreeus",
    "calendarInput.islamicCivil": "Siviel-Islamities",
    "calendarInput.islamicUmmAlQura": "Umm al-Qura",
    "calendarInput.solarHijriOfficial": "Son-Hidjri — amptelik",
    "calendarInput.solarHijriArithmetic": "Son-Hidjri — rekenkundig 2 820",
    "calendarInput.chinese": "Chinees",
    "calendarInput.hinduOldSolar": "Ou Hindoe — son",
    "calendarInput.hinduOldLunar": "Ou Hindoe — maan",
    "calendarInput.saka": "Saka",
    "calendarInput.thaiBuddhist": "Thai-Boeddhisties",
    "calendarInput.ethiopic": "Etiopies",
    "calendarInput.coptic": "Kopties",
    "calendarInput.japaneseImperial": "Japans-keiserlik",
    "calendarInput.minguo": "Minguo",
    "calendarInput.bahaiTehran": "Bahá’í — Teheran-ewening",
    "calendarInput.bahaiWestern": "Bahá’í — Westerse rekenkundige",
    "calendarInput.mayaLongCount": "Maya-langtelling",
    "calendarHelp.hebrew": "Maande word volgens naam gekies. Jaar en dag aanvaar desimale syfers of Hebreeuse syferletters, byvoorbeeld תשפ״ו of י״ד; ’n jaar wat in letters sonder ’n duisendteken geskryf is, word geïnterpreteer met 5 000 bygetel.",
    "calendarHelp.intl": "Hierdie omskakeling gebruik kalenderondersteuning wat in jou blaaier ingebou is. As die blaaier die datum nie kan weergee nie, meld die webwerf dit uitdruklik.",
    "calendarHelp.chinese": "Voer die Gregoriaanse jaar in wat met die Chinese jaar ooreenstem en merk ‘Skrikkelmaand’ slegs vir die herhaalde maand.",
    "calendarHelp.hindu": "Voer die jaar en dag volgens die ou Hindoe-telling in en kies die maand volgens naam. In die maanvorm kan ’n skrikkelmaand ook aangedui word.",
    "calendarHelp.japanese": "Jaar 1 begin op die eerste dag van die era; jy kan ook 元 of 元年 vir die eerste jaar invoer. ’n Datum voor die begin of ná die einde van die era word geweier.",
    "calendarHelp.bahai": "Kies die maand volgens naam of Ayyám-i-Há. Die vorm met die Teheran-ewening ondersteun die gebruiklike Gregoriaanse reeks 1844–3000.",
    "calendarHelp.maya": "Die standaardkorrelasie is GMT 584.283. Jy kan dit verander as jy 'n ander korrelasie gebruik.",
    "loading.kicker": "Plaaslik bereken",
    "loading.title": "Soek na kotelet en datum…",
    "error.kicker": "Kan nie die kalender vertoon nie",
    "error.title": "Die berekeningsenjin is nie gelaai nie",
    "error.reload": "Laai weer",
    "error.timeout": "Die berekening neem te lank.",
    "error.engineFailed": "Die berekeningsenjin het misluk.",
    "error.engineLoadFailed": "Die berekeningsenjin kon nie gelaai word nie.",
    "calendar.toolbarAria": "Navigasie tussen kotelette",
    "calendar.previous": "Vorige kotelet",
    "calendar.today": "Terug na vandag",
    "calendar.next": "Volgende kotelet",
    "calendar.daysAria": "Dae in die kotelet {cutletName}",
    "calendar.currentCutlet": "Jaar {year} · kotelet",
    "calendar.cutletDescription": "{count} dae · aksiedag: {actionDate}",
    "calendar.targetOutside": "Die gesoekte datum val nie in die kotelet wat nou op die skerm is nie. Jy kan verder blaai of 'n ander datum soek.",
    "year.kicker": "Die jaar in 'n oogopslag",
    "year.heading": "Struktuur van jaar {year}",
    "year.context": "Hierdie struktuur is vir aksiedag {actionDate} bereken. As jy die aksiedag verander, kan die jaargrense, kotelette en maande opnuut opgebou word.",
    "year.loading": "Bou volledige jaarstruktuur…",
    "year.error": "Die volledige jaarstruktuur kon nie opgebou word nie. Die koteletaansig bly beskikbaar.",
    "year.lengthLabel": "Jaarlengte",
    "year.cutletCountLabel": "Koteletten",
    "year.monthCountLabel": "Maanden",
    "year.rangeLabel": "Gregoriaanse reeks",
    "year.daysValue": "{count} dae",
    "year.rangeValue": "{startDate} tot {endDate}",
    "year.displayedCutletPosition": "Die vertoonde kotelet beslaan dae {start}–{end} van die jaar.",
    "year.targetPosition": "Die gesoekte datum is dag {day} van {length} in hierdie jaar.",
    "year.monthExplainer": "Maande is onafhanklik van kotelette deur die jaar verweef: 'n maand is nie 'n onderverdeling van 'n kotelet nie, en sy dae kan in verskeie afsonderlike reekse voorkom. Die lengte van 'n maand is dus die totale aantal toegewese dae, nie noodwendig een aaneenlopende tydperk nie.",
    "year.cutletsSummary": "Kotelette in hierdie jaar ({count})",
    "year.monthsSummary": "Maande in hierdie jaar ({count})",
    "year.numberedName": "{number}. {name}",
    "year.cutletMeta": "Lengte: {length} dae · posisie in die jaar: dae {start}–{end}",
    "year.monthMeta": "Dae: {length} · aaneenlopende reekse: {runs} · eerste verskyning: dag {first} · laaste: dag {last}",
    "target.today": "Dit is vandag",
    "target.searched": "Dit is die datum waarna jy gesoek het",
    "target.context": "Teikendatum: {targetDate} · aksiedag: {actionDate}",
    "target.notInView": "Jou gesoekte datum bly bewaar; die kotelet wat nou vertoon word, is 'n ander een.",
    "date.aria": "Jaar {year} sedert die Skepping van die Wêreld, dag {dayInCutlet} in die kotelet {cutletName}, dag {dayInMonth} in die maand {monthName}",
    "date.yearLine": "Jaar {year} sedert die Skepping van die Wêreld",
    "date.cutletLine": "Dag {dayInCutlet} in die kotelet {cutletName}",
    "date.monthLine": "Dag {dayInMonth} in die maand {monthName}",
    "guide.eyebrow": "Gebruikersgids",
    "guide.heading": "Wat kan jy hier doen, en hoe?",
    "guide.intro": "Die webwerf toon vir elke dag 'n volledige Pastafariese datum, ondersteun soektogte in baie kalenders en kan op 'n breë skerm die uitwerking van die aksiedag vergelyk.",
    "guide.1.heading": "Maak die webwerf oop en kry vandag",
    "guide.1.body": "Daar is geen registrasie of aanmelding nie, en geen datum word na 'n bediener gestuur nie. Die groot opskrif en die merker op die teël maak vandag maklik herkenbaar.",
    "guide.2.heading": "Soek in enige beskikbare kalender",
    "guide.2.body": "Kies by ‘Watter dag wil jy vind?’ 'n kalender, vul die velde in en kies ‘Wys datum’. Jy kan onder meer kies uit Gregoriaans, Hebreeus, Juliaans, Islamities, Persies, Chinees, Hindoe, Saka, Thai, Etiopies, Kopties, Japanse keiserlike kalender, Minguo, Bahá’í en die Maya-langtelling.",
    "guide.3.heading": "Lees die datum",
    "guide.3.body": "Elke teël het drie vaste reëls: die jaar sedert die Skepping van die Wêreld; die dagnommer in die kotelet en sy naam; daarna die dag in die maand en die maandnaam. Geen enkele getal stel op sy eie die hele datum voor nie. Die maandnaam bepaal die kleur van die teël.",
    "guide.4.heading": "Blaai sonder om per ongeluk te kies",
    "guide.4.body": "‘Vorige kotelet’ en ‘Volgende kotelet’ gaan na aangrensende kotelette. Ander dagteëls is nie knoppies nie, omdat 'n klik daarop niks doen nie.",
    "guide.5.heading": "Verander die aksiedag",
    "guide.5.body": "Maak ‘Opsies vir berekening en vergelyking’ onder die soekfunksie oop. Daar kan jy 'n kalender kies en 'n ander aksiedag invoer. Hierdie gevorderde instelling bly beskikbaar sonder om die gewone aansig oorvol te maak.",
    "guide.6.heading": "Vergelyk dieselfde dae twee keer",
    "guide.6.body": "Skakel die vergelyking op 'n breë skerm in dieselfde afdeling aan. Elke ry bevat presies dieselfde teikendag; die eerste kolom gebruik die eerste aksiedag en die tweede kolom die tweede. Vandag teenoor môre is die verstek, sodat elke veranderde Pastafariese datum maklik herkenbaar is.",
    "guide.7.heading": "Bekyk die hele jaar",
    "guide.7.body": "Onder die koteletaansig wys die webwerf die struktuur van die vertoonde jaar: die lengte en reeks, elke kotelet met sy lengte en elke maand. Maande wys ook die aantal aaneenlopende reekse en hul eerste en laaste verskyning, sodat die verwewing deur die jaar sigbaar word.",
    "guide.note": "Rye en kolomme in die teëlrooster is net 'n visuele uitleg, nie weke nie. In die vergelykingstabel is belyning wel betekenisvol: elke ry is dieselfde gevraagde dag.",
    "guide.back": "Terug na soektog en kalender",
    "footer.local": "Die berekening gebeur op jou toestel; hierdie webwerf het geen gebruikersrekening en geen opsporingskode nie.",
    "footer.open": "Die skakel is openbaar en maak direk oop, ook in 'n privaatblaaiervenster.",
    "reverse.kicker": "Omgekeerde soektog",
    "reverse.heading": "Vind 'n dag uit sy Pastafari-datum",
    "reverse.intro": "Voer 'n volledige Pastafari-datum in en bepaal die berekeningsdag. Die soektog loop plaaslik op hierdie toestel.",
    "reverse.mode.basic": "Enkele datum",
    "reverse.mode.advanced": "Beperkingstelsel",
    "reverse.basic.heading": "Omgekeerde soektog vir een datum",
    "reverse.basic.dateHeading": "Pastafari-datum om te vind",
    "reverse.field.year": "Jaar",
    "reverse.field.cutlet": "Kotelet",
    "reverse.field.dayInCutlet": "Dag in kotelet",
    "reverse.field.month": "Maand",
    "reverse.field.dayInMonth": "Dag in maand",
    "reverse.basic.calculationHeading": "Berekeningsdag",
    "reverse.basic.calculationMode": "Hoe word die berekeningsdag bepaal?",
    "reverse.basic.calculation.active": "Gebruik die webwerf se aktiewe berekeningsdag",
    "reverse.basic.calculation.absolute": "Gebruik 'n ander bekende datum",
    "reverse.basic.calculation.same": "Die berekeningsdag is die gevraagde dag (c = t)",
    "reverse.basic.calculation.pastafari": "Die berekeningsdag is self Pastafari / hang van ander datums af",
    "reverse.basic.activeValue": "Aktiewe berekeningsdag: {date}",
    "reverse.basic.absoluteHeading": "Bekende berekeningsdag",
    "reverse.basic.sameHeading": "Eindige soekreeks vir c = t",
    "reverse.basic.rangeStart": "Begin van reeks",
    "reverse.basic.rangeEnd": "Einde van reeks",
    "reverse.basic.toAdvanced": "Gaan voort in die beperkingstelsel-redigeerder",
    "reverse.basic.toAdvancedHelp": "Rekursiewe Pastafari-berekeningsdae word as veranderlikes en beperkings voorgestel sodat die ketting sonder 'n kunsmatige dieptelimiet uitgebrei kan word.",
    "reverse.action.solve": "Soek",
    "reverse.action.cancel": "Kanselleer soektog",
    "reverse.action.open": "Maak in kalender oop",
    "reverse.action.addVariable": "Voeg datumveranderlike by",
    "reverse.action.addConstraint": "Voeg beperking by",
    "reverse.action.remove": "Verwyder",
    "reverse.action.clear": "Maak resultate skoon",
    "reverse.progress.reverse": "Pastafari-verhoudings word opgelos",
    "reverse.progress.verify": "Kandidaatoplossings word geverifieer",
    "reverse.progress.done": "Soektog voltooi",
    "reverse.progress.scanned": "Voltooide werkeenhede: {count}",
    "reverse.status.running": "Soek plaaslik…",
    "reverse.status.cancelled": "Soektog gekanselleer.",
    "reverse.status.superseded": "'n Nuwer soektog het hierdie soektog vervang.",
    "reverse.status.completeEmpty": "Geen oplossing bestaan in die volledig deursoekte domein nie.",
    "reverse.status.completeSolutions": "Soektog voltooi. Al {count} oplossings in die domein word gewys.",
    "reverse.status.partialEmpty": "Die soektog het voor voltooiing gestop. Geen oplossing is nog gevind nie.",
    "reverse.status.partialSolutions": "{count} geverifieerde oplossings word gewys, maar die soektog het voor voltooiing gestop en meer kan bestaan.",
    "reverse.status.stale": "Hierdie resultate het 'n vorige aktiewe berekeningsdag gebruik. Begin die soektog weer om die huidige dag te gebruik.",
    "reverse.status.rangeRequired": "Hierdie probleem kan nie volledig deursoek word voordat 'n eindige reeks of vaste datum bygevoeg is nie.",
    "reverse.status.timeout": "Die soektog het sy tydlimiet voor voltooiing bereik.",
    "reverse.status.failed": "Die omgekeerde-soekenjin het misluk.",
    "reverse.result.heading": "Oplossings",
    "reverse.result.solution": "Oplossing {index}",
    "reverse.result.target": "Gevraagde dag",
    "reverse.result.calculation": "Berekeningsdag",
    "reverse.result.jdn": "JDN {jdn}",
    "reverse.result.complete": "Volledige soektog",
    "reverse.result.partial": "Gedeeltelike soektog",
    "reverse.advanced.heading": "Beperkingstelsel-oplosser",
    "reverse.advanced.intro": "Definieer datumveranderlikes en verhoudings tussen hulle. Siklusse word toegelaat wanneer die stelsel tot eindige domeine verminder word.",
    "reverse.variables.heading": "Datumveranderlikes",
    "reverse.variable.label": "Vertoonnaam",
    "reverse.variable.defaultName": "Datum {index}",
    "reverse.variable.domain": "Domein",
    "reverse.variable.domain.unknown": "Onbekend (moet deur ander beperkings begrens word)",
    "reverse.variable.domain.exact": "Presiese bekende datum",
    "reverse.variable.domain.range": "Eindige datumreeks",
    "reverse.constraint.heading": "Beperkings",
    "reverse.constraint.type": "Tipe beperking",
    "reverse.constraint.pastafari": "Pastafari-datum",
    "reverse.constraint.equal": "Dieselfde absolute dag",
    "reverse.constraint.order": "Chronologiese volgorde",
    "reverse.constraint.difference": "Verskil in dae",
    "reverse.constraint.left": "Linkerdatum",
    "reverse.constraint.right": "Regterdatum",
    "reverse.constraint.target": "Gevraagde datumveranderlike",
    "reverse.constraint.calculationMode": "Bron van berekeningsdag",
    "reverse.constraint.calculation.variable": "Nog 'n datumveranderlike",
    "reverse.constraint.calculation.absolute": "Bekende absolute datum",
    "reverse.constraint.calculation.same": "Dieselfde as gevraagde datum (c = t)",
    "reverse.constraint.calculationVariable": "Berekeningsdagveranderlike",
    "reverse.constraint.orderOp": "Verhouding",
    "reverse.constraint.differenceMode": "Verskilreël",
    "reverse.constraint.differenceExact": "Presiese verskil",
    "reverse.constraint.differenceRange": "Verskilreeks",
    "reverse.constraint.equals": "Presiese dae (links − regs)",
    "reverse.constraint.min": "Minimum dae (links − regs)",
    "reverse.constraint.max": "Maksimum dae (links − regs)",
    "reverse.options.heading": "Soeklimiete",
    "reverse.options.intro": "Laat 'n limiet leeg vir geen limiet. Geen limiet word ooit stilweg toegepas nie.",
    "reverse.options.maxSolutions": "Stop ná soveel geverifieerde oplossings",
    "reverse.options.maxScanned": "Stop ná soveel werkeenhede",
    "reverse.options.timeout": "Tydlimiet in millisekondes",
    "reverse.advanced.emptyVariables": "Voeg minstens een datumveranderlike by.",
    "reverse.advanced.emptyConstraints": "'n Stelsel mag geen beperkings bevat nie, maar elke oorblywende veranderlike moet steeds 'n eindige domein hê.",
    "reverse.error.input": "Sommige omgekeerde-soekvelde ontbreek of is ongeldig.",
    "reverse.error.range": "Die einde van die reeks mag nie voor die begin wees nie.",
    "reverse.error.variable": "Elke beperking moet na 'n bestaande datumveranderlike verwys.",
    "reverse.error.pastafari": "Voer al vyf Pastafari-datumvelde in.",
    "reverse.error.limitPositive": "{field} moet positief wees.",
    "reverse.error.limitSafeInteger": "{field} val buite die veilige heelgetalreeks.",
    "reverse.error.absoluteDateField": "Ongeldige veld vir die absolute datum.",
    "reverse.calendar.label": "Kalender wat vir hierdie absolute datum gebruik word",

  },
  "calendar": {
    "cutlets": {
      "bronze": "Brons",
      "fox": "Vos",
      "kidney": "Nier",
      "lagash": "Lagash",
      "thought": "Gedagte",
      "fourPartsOfNine": "Vier dele van nege",
      "palgurash": "Palgurash",
      "papyrusSedge": "Papirusbies",
      "cluster": "Tros",
      "scorpion": "Skerpioen",
      "ash": "As",
      "wheat": "Koring",
      "river": "Rivier",
      "laughter": "Gelag",
      "akkad": "Akkad",
      "horn": "Horing",
      "theEmptyJar": "Die leë kruik"
    },
    "months": {
      "clay": "Klei",
      "pomegranate": "Granaat",
      "elbow": "Elmboog",
      "envy": "Afguns",
      "eridu": "Eridu",
      "toothpaste": "Tandepasta",
      "threePartsOfFive": "Drie dele van vyf",
      "karshumav": "Karshumav",
      "leopard": "Luiperd",
      "tin": "Tin",
      "mist": "Mist",
      "frankincense": "Wierook",
      "spindle": "Spil",
      "rib": "Rib",
      "carob": "Karob",
      "uruk": "Uruk",
      "shame": "Skaamte",
      "camel": "Kameel",
      "copper": "Koper",
      "well": "Put",
      "yolk": "Eidooier",
      "star": "Ster",
      "honey": "Heuning",
      "spleen": "Milt",
      "limestone": "Kalksteen",
      "joy": "Vreugde",
      "fig": "Vy",
      "nineveh": "Nineve",
      "frog": "Padda",
      "pitch": "Pik",
      "lamp": "Lamp",
      "theClosedDoor": "Die geslote deur",
      "sesame": "Sesam",
      "nape": "Agterkop",
      "silver": "Silwer",
      "susa": "Susa",
      "storm": "Storm",
      "donkey": "Donkie",
      "flour": "Meel",
      "regret": "Spyt",
      "babylon": "Babilon",
      "tongue": "Tong",
      "flax": "Vlas",
      "salt": "Sout",
      "pear": "Peer",
      "bow": "Boog",
      "sand": "Sand"
    }
  },
  "terminology": {
    "foundationDay": "Stigtingsdag",
    "workingNumber": "Aksiegetal",
    "queryNumber": "Vraaggetal",
    "distanceNumber": "Afstandsgetal",
    "sumNumber": "Somgetal",
    "directionNumber": "Rigtingsgetal",
    "bowl": "Bak",
    "drop": "Druppel",
    "gate": "Poort",
    "yearFiveThousand": "Jaar Vyfduisend sedert die Skepping van die Wêreld"
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
13:       "dir": "ltr"
14:     },
15:     "af": {
16:       "value": "Pastafariese kalender",
17:       "lang": "af",
18:       "dir": "ltr"
19:     },
20:     "ar": {
…
373:     "en": {
374:       "value": "Pastafari",
375:       "lang": "en",
376:       "dir": "ltr"
377:     },
378:     "af": {
379:       "value": "Pastafari",
380:       "lang": "af",
381:       "dir": "ltr"
382:     },
383:     "ar": {
…
736:     "en": {
737:       "value": "A Pastafari calendar with date search and comparison.",
738:       "lang": "en",
739:       "dir": "ltr"
740:     },
741:     "af": {
742:       "value": "Een pastafariese kalender met datumsoek en vergelyk.",
743:       "lang": "af",
744:       "dir": "ltr"
745:     },
746:     "ar": {
===== ATTEMPT 1 RAW JSON =====
{
  "result": "FINDINGS",
  "summary": "Die Afrikaanse weergawe van die Pastafari-kalender bevat verskeie taal- en toeganklikheidstekens wat verbetering behoefte het. Die meeste van die foute is grammatika- of terminologiese foute, en sommige is onnatuurlike of onidiomatiese formulering.",
  "findings": [
    {
      "severity": "medium",
      "location": "docs/i18n/locales/af.js",
      "current_text": "Een pastafariese kalender met datumsoek en vergelyk.",
      "issue": "Die frase 'Een pastafariese kalender' is onnatuurlik in Afrikaans. Die korrekte vorm is 'ŉ pastafariese kalender' of 'Een pastafariese kalender' is onnatuurlik in hierdie konteks.",
      "correction": "ŉ pastafariese kalender met datumsoek en vergelyk."
    },
    {
      "severity": "medium",
      "location": "docs/i18n/locales/af.js",
      "current_text": "Die verduideliking is nog nie in die gekose taal beskikbaar nie; die default weergawe word dus gewys.",
      "issue": "Die frase 'die default weergawe' is onnatuurlik in Afrikaans. Die korrekte vorm is 'die standaardweergawe' of 'die standaardweergawe word gewys'.",
      "correction": "Die verduideliking is nog nie in die gekose taal beskikbaar nie; die standaardweergawe word dus gewys."
    },
    {
      "severity": "medium",
      "location": "docs/i18n/locales/af.js",
      "current_text": "Die aksiedag is ongeldig. Kontroleer die datum en probeer weer.",
      "issue": "Die frase 'Kontroleer die datum en probeer weer' is onnatuurlik in Afrikaans. Die korrekte vorm is 'Kontroleer die datum en probeer weer' is alreeds korrek, maar die frase is te lang en onnatuurlik in hierdie konteks.",
      "correction": "Die aksiedag is ongeldig. Kontroleer die datum."
    },
    {
      "severity": "medium",
      "location": "docs/i18n/locales/af.js",
      "current_text": "Die tweede aksiedag is ongeldig. Kontroleer die datum en probeer weer.",
      "issue": "Die frase 'Kontroleer die datum en probeer weer' is onnatuurlik in Afrikaans. Die korrekte vorm is 'Kontroleer die datum en probeer weer' is alreeds korrek, maar die frase is te lang en onnatuurlik in hierdie konteks.",
      "correction": "Die tweede aksiedag is ongeldig. Kontroleer die datum."
    }
  ]
}
===== ATTEMPT 1 VALIDATION =====
INVALID: current_text is not present at claimed location: 'docs/i18n/locales/af.js'

===== ATTEMPT 2 RAW JSON =====
{
  "result": "FINDINGS",
  "summary": "Die Afrikaanse weergawe van die Pastafari-kalender het 'n paar probleme wat aandag verdient, insluitend grammatika- en terminologiese foute, onnatuurlike formulering, en onakkurate metadata. Hierdie findings word in die volgende opsomming aangegee.",
  "findings": [
    {
      "severity": "medium",
      "location": "docs/i18n/locales/af.js",
      "current_text": "Een pastafariese kalender met datumsoek en vergelyk.",
      "issue": "Die frase 'Een pastafariese kalender' is onnatuurlik in Afrikaans. Die korrekte vorm is 'ŉ pastafariese kalender' of 'Een pastafariese kalender' is onnatuurlik in hierdie konteks.",
      "correction": "ŉ pastafariese kalender met datumsoek en vergelyk."
    },
    {
      "severity": "medium",
      "location": "docs/i18n/locales/af.js",
      "current_text": "Die verduideliking is nog nie in die gekose taal beskikbaar nie; die default weergawe word dus gewys.",
      "issue": "Die frase 'die default weergawe' is onnatuurlik in Afrikaans. Die korrekte vorm is 'die standaardweergawe' of 'die standaardweergawe word gewys'.",
      "correction": "Die verduideliking is nog nie in die gekose taal beskikbaar nie; die standaardweergawe word dus gewys."
    },
    {
      "severity": "medium",
      "location": "docs/i18n/locales/af.js",
      "current_text": "Die berekeningsenjin het misluk.",
      "issue": "Die frase 'berekeningsenjin' is onnatuurlik in Afrikaans. Die korrekte vorm is 'berekeningsmotor' of 'berekeningsprogram'.",
      "correction": "Die berekeningsmotor het misluk."
    },
    {
      "severity": "medium",
      "location": "docs/i18n/locales/af.js",
      "current_text": "Die berekeningsenjin kon nie gelaai word nie.",
      "issue": "Die frase 'berekeningsenjin' is onnatuurlik in Afrikaans. Die korrekte vorm is 'berekeningsmotor' of 'berekeningsprogram'.",
      "correction": "Die berekeningsmotor kon nie gelaai word nie."
    }
  ]
}
===== ATTEMPT 2 VALIDATION =====
INVALID: current_text is not present at claimed location: 'docs/i18n/locales/af.js'

===== ATTEMPT 3 RAW JSON =====
{
  "result": "FINDINGS",
  "summary": "Die Afrikaanse weergawe van die Pastafari-kalender bevat verskeie taal- en toeganklikheidstekens wat verbetering benodig. Die meeste van hierdie foute is gerelateer aan onnatuurlike of stywe Afrikaanse formulering, grammatika- en terminologiese foute, en onakkurate metadata.",
  "findings": [
    {
      "severity": "medium",
      "location": "docs/i18n/locales/af.js",
      "current_text": "Een pastafariese kalender met datumsoek en vergelyk.",
      "issue": "Die frase is onnatuurlik en gebruik 'Een' in plaas van 'ŉ' wat meer in lyn is met Afrikaanse grammatika.",
      "correction": "ŉ Pastafariese kalender met datumsoek en vergelyk."
    },
    {
      "severity": "medium",
      "location": "docs/i18n/locales/af.js",
      "current_text": "Die verduideliking is nog nie in die gekose taal beskikbaar nie; die default weergawe word dus gewys.",
      "issue": "Die frase is onnatuurlik en gebruik 'die default weergawe' in plaas van 'die standaardweergawe' wat meer in lyn is met Afrikaanse grammatika.",
      "correction": "Die verduideliking is nog nie in die gekose taal beskikbaar nie; die standaardweergawe word dus gewys."
    },
    {
      "severity": "medium",
      "location": "docs/i18n/locales/af.js",
      "current_text": "Die berekeningsenjin is nie gelaai nie.",
      "issue": "Die frase is onnatuurlik en gebruik 'die berekeningsenjin' in plaas van 'die berekeningsmotor' wat meer in lyn is met Afrikaanse grammatika.",
      "correction": "Die berekeningsmotor is nie gelaai nie."
    },
    {
      "severity": "medium",
      "location": "docs/i18n/locales/af.js",
      "current_text": "Die berekeningsenjin het misluk.",
      "issue": "Die frase is onnatuurlik en gebruik 'die berekeningsenjin' in plaas van 'die berekeningsmotor' wat meer in lyn is met Afrikaanse grammatika.",
      "correction": "Die berekeningsmotor het misluk."
    }
  ]
}
===== ATTEMPT 3 VALIDATION =====
INVALID: current_text is not present at claimed location: 'docs/i18n/locales/af.js'

===== NORMALIZED_REVIEW =====
SUBREVIEW_RESULT: INVALID

The surface reviewer output could not be accepted as structured evidence after 3 attempts.

reason: current_text is not present at claimed location: 'docs/i18n/locales/af.js'

All raw attempts and validator reasons are preserved in this artifact.
