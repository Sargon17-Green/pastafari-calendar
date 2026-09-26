Ég framkvæmi nú óbreytandi yfirferð á öllum tilgreindum staðfærslu-, viðmóts-, aðgengis- og lýsigagnaskrám og ber saman hugtakanotkun milli yfirborða.

NATIVE_QA_RESULT: FAIL

## Heildarniðurstaða

Staðfærslan er að mestu leyti á íslensku og `is-IS`-flæðið er til staðar fyrir aðalviðmót, öfuga leit, samanburð, ársýn, notendaleiðbeiningar og `/about/`. Hins vegar fannst nokkur málfræðileg og stílfræðileg óvissa, auk enskra frumtexta í JavaScript-lausri varaleið og óþýdds tækniorðalags sem birtist notendum. Því stenst hún ekki strangt málfræðilegt QA án leiðréttinga.

## Niðurstöður

| Alvarleiki | Skrá og staðsetning | Núverandi texti | Skýring | Ráðlögð leiðrétting |
|---|---|---|---|---|
| **medium** | `docs/i18n/locales/is.js:11` (`manifest.defaultDescription`) | „Pastafari-dagatal sem reiknar á tækinu og skilar sömu niðurstöðu fyrir sömu inntök.“ | „Inntök“ er óeðlilegt hér og setningin hljómar eins og bein þýðing. Þegar átt er við sama input er eðlilegra að nota eintölu. | „Pastafari-dagatal sem reiknar á tækinu og skilar sömu niðurstöðu fyrir sama inntak.“ Einnig mætti nota „sömu niðurstöðu fyrir sömu inntaksbreytur“ ef átt er við fleiri breytur. |
| **medium** | `docs/about/content/is.html:144` | „... óháða og jafnt dreifða grunn-`Q` tölustafi ...“ | „Grunn-Q tölustafir“ er ekki eðlilegt íslenskt tækniorðalag og getur ruglað saman grunni, tölustöfum og `Q`. | „... óháða og jafnt dreifða tölustafi í `Q`-grunni þar til vísi fæst.“ |
| **medium** | `docs/about/content/is.html:240` | „... nákvæmar fyrirspurnir, stórt bil, endurræsing, ræsing eftir hvíld (`cold wake`) ...“ | „Stórt bil“ er of óljóst í þessu samhengi og enska lýsingin `cold wake` er óþýdd þótt hún sé ekki fast API-auðkenni. | „... nákvæmar fyrirspurnir, stórt dagabil, endurræsing, ræsing eftir dvala ...“ Hægt er að halda `cold wake` innan sviga aðeins ef enska hugtakið er nauðsynlegt sem tæknileg tilvísun. |
| **low** | `docs/about/content/is.html:243` | „Hagræðing er ekki annað vald.“ | Setningin er skiljanleg en óeðlileg og merkingin óljós á íslensku. | „Hagræðing veitir ekki annað vald.“ eða „Hagræðing breytir ekki merkingarvaldinu.“ |
| **medium** | `docs/index.html:7,18–24,197–200` og `docs/about/index.html:7,18–24,75–78` | Frumtexti í HTML er á ensku, meðal annars „Pastafari Calendar“, „Skip to date search“ og `<strong>JavaScript</strong>`. | Þegar JavaScript hleðst ekki, eða áður en staðfærsla er virkjuð, birtist enskt yfirborð þrátt fyrir valið íslenskt tungumál. Þetta á einnig við um noscript-varaleiðina, sem gefur aðeins enska tæknilega merkingu og enga íslenska leiðbeiningu. | Bæta íslenskum varatexta í HTML eða tryggja að varaleiðin hafi íslenskan texta, til dæmis „JavaScript þarf að vera virkt til að nota dagatalið.“ Einnig ætti að samræma upphaflegt `lang`/frumtexta við fyrirhugaða varaleið ef íslenska á að vera fullgild án JavaScript. |

## Texti á röngu tungumáli og varastaðfærslur

- Í `docs/about/about.js` er rétt skilgreint að íslenski greinartextinn sé sóttur úr `docs/about/content/is.html`, og `docs/about/content/registry.js:174–179` gefur honum `lang: "is-IS"` og `dir: "ltr"`.
- Í `docs/i18n/locales/is.js:30` er varatilkynningin sjálf íslensk: „Skýringin er ekki tiltæk á völdu tungumáli; hebreska útgáfan er sýnd í staðinn.“ Þetta er rétt miðað við að `ARTICLE_FALLBACK_LOCALE` sé `he`.
- Eftirfarandi heiti eru réttilega óþýdd vegna kanónískrar eða tæknilegrar stöðu þeirra: `Short Choice`, `Wide Choice`, `Pastafarian Calendar Seer`, `API`, `HTTP`, `OpenAPI`, `CLI`, `Node`, `Render`, `SIMD`, `ASTRONOMICAL-DAY.md`, `date`, `now`, `batch`, `range`, `year`, `reverse`, `metadata`, `locales`, `status` og `cold wake` þegar það er notað sem nákvæmt tæknilegt hugtak. Þau ætti ekki að telja sem galla eingöngu vegna þess að þau eru á ensku.
- Enski HTML-frumtextinn og noscript-blokkin eru þó raunveruleg varaleiðargalli, þar sem þau eru sýnileg án þess að íslensk staðfærsla hafi keyrt.

## Samræmi í hugtakanotkun milli `/about/` og notendaviðmótsins

- **Aðgerðardagur** er notaður samræmt í `is.js`, aðalviðmótinu og `/about/`.
- **Fyrirspurnardagur** er einnig samræmdur í leit, samanburði, dagsetningarlínum og fræðslutexta.
- **Kóteletta** og **mánuður** eru notuð samræmt í ársýn, dagaspjöldum, samanburði og greinartexta.
- **Fléttun** og **fléttaðir mánuðir** vísa að mestu að sama hugtaki, en „fléttaðir mánuðir“ í `about.intro` og „mánuðir fléttast“ í greininni mætti samræma betur, til dæmis með „fléttun mánaða“ sem fræðilegu hugtaki.
- **Öfug leit** er samræmd milli `reverse.*`-lykla og kaflans um öfuga umbreytingu.
- Engin alvarleg hugtakamisræmi fundust milli `/about/` og virka notendaviðmótsins.

## Lýsigögn, ARIA, manifest, noscript og varaleiðir

- `docs/i18n/registry.js` skilgreinir `is` rétt með `intlLocale: "is-IS"` og `dir: "ltr"`.
- `docs/about/content/registry.js` skilgreinir íslenska grein með `lang: "is-IS"` og `dir: "ltr"`.
- `docs/manifest.webmanifest` hefur allar þrjár nauðsynlegar íslenskar færslur:
  - `name_localized.is` á línum 165–168: „Pastafari-dagatal“
  - `short_name_localized.is` á línum 528–531: „Pastafari“
  - `description_localized.is` á línum 891–894: „Pastafari-dagatal með dagsetningarleit og samanburði.“
- Manifest-færslurnar eru á réttu tungumáli og með rétta textastefnu. Sjálfgefnu ensku `name`, `short_name`, `description`, `lang` eða `dir` er ekki talið sem villa samkvæmt sérreglunni um manifest.
- ARIA-texti sem er búinn til í `app.js` og `reverse-ui.js` kemur úr íslenskum þýðingarlyklum, meðal annars dagaspjöld, dagatalshópur, verkfærastika, samanburðartafla og villuboð.
- Helsti aðgengis- og varaleiðargallinn er noscript-framsetningin í báðum HTML-skrám: hún sýnir aðeins „JavaScript“ og viðvörunarmerki og gefur enga íslenska skýringu eða nothæfa leið áfram.

## Líkleg textadrifin hætta á línuskiptingu

Eftirfarandi textar eru langir og líklegir til að vefjast í þröngum reitum eða litlum skjám:

- `docs/i18n/locales/is.js:50`, `comparison.toggleHelp`
- `docs/i18n/locales/is.js:136`, `year.monthExplainer`
- `docs/i18n/locales/is.js:154`, `guide.1.body`
- `docs/i18n/locales/is.js:195`, `reverse.basic.toAdvancedHelp`
- `docs/i18n/locales/is.js:213`, `reverse.status.partialSolutions`
- `docs/i18n/locales/is.js:30`, `about.fallbackNotice`

Sérstaklega geta `comparison.toggleHelp` og `reverse.basic.toAdvancedHelp` orðið háir í þröngum stillingareitum, en `guide.1.body` og `year.monthExplainer` geta lengt kafla og samantektir verulega. Þetta er textabundið áhættumat, ekki sjónrænt QA með birtri vefsíðu.

