/no_think

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
- Fyrirmæli rýnisins sjálfs, `MODE`/`SOURCE_PART` stýrilínur, skráarhausar og samantektir annarra rýnenda eru **ekki** texti vefsins. Aldrei nota texta úr þessum fyrirmælum sem `current_text`, aldrei staðsetja finding í prompt-/artifact-skrá og aldrei telja slíkan texta staðfærslugalla.
- Finding um „texta á röngu tungumáli“ er aðeins gilt ef þú getur vitnað í raunverulegan náttúrulegan texta úr gefinni vefskrá og nafngreint þá vefskrá. Ekki kalla texta íslenskan „ensku“ eða annað tungumál nema hann sé það í raun.

Þú færð `MODE` og `SOURCE_PART` neðan við þessi fyrirmæli.

Ef `MODE=FINDINGS_ONLY`:
- rýndu eingöngu gefinn `SOURCE_PART`;
- taktu skýra ákvörðun: `CLEAN` ef ekkert lagfæringarskylt vandamál fannst, annars `FINDINGS`;
- keyrslulagið krefst stutts, uppbyggðs svars: einnar íslenskrar samantektar og að hámarki sex staðbundinna findings; ekki reyna að endursegja allt inntakið;
- hvert raunverulegt finding skal hafa severity (`critical`, `high`, `medium`, `low`), skrá/staðsetningu eins nákvæma og gögn leyfa, örstuttan núverandi texta ef við á, skýrt vandamál og framkvæmanlega leiðréttingu;
- sameinaðu findings sem eru í raun sama vandamálið; ekki búa til almenn eða óstaðsett findings;
- ef ekkert raunverulegt vandamál finnst, útskýrðu stuttlega á íslensku hvað var yfirfarið og hvers vegna það er hreint;
- afritaðu EKKI SOURCE_PART, frumkóða eða langa kafla úr inntakinu til baka nema örstutt nákvæmt brot sé nauðsynlegt til að staðsetja finding;
- EKKI skrifa sjálf/ur `SUBREVIEW_RESULT` eða `NATIVE_QA_RESULT`; keyrslulagið sér um vélrænu línurnar.

=== FINAL_ONLY_INSTRUCTIONS ===

Ef `MODE=FINAL`:
- þú færð findings úr öllum fyrri hlutum; mettu þau gagnrýnið og hafnaðu fals-positive findings sem brjóta gegn reglunum hér að ofan;
- taktu skýra lokaákvörðun: `PASS` eða `FAIL`; keyrslulagið sér sjálft um að setja hana í nákvæmu vélrænu `NATIVE_QA_RESULT`-línuna;
- PASS er aðeins leyfilegt ef eftir gagnrýna samantekt stendur ekkert raunverulegt málfars-, fallback-, hugtaka-, accessibility-texta- eða locale-samræmisvandamál eftir;
- EKKI skrifa sjálf/ur `NATIVE_QA_RESULT` inni í skýrslutextanum;
- eftir fyrstu línuna skaltu skila EINUNGIS íslenskri Markdown-skýrslu með:
  - heildarniðurstöðu;
  - öllum staðfestum findings, hverju með severity, skrá/staðsetningu, núverandi texta/vandamáli, útskýringu og ráðlagðri leiðréttingu;
  - sérstökum kafla um texta úr öðru tungumáli/fallback;
  - sérstökum kafla um samræmi `/about/` við UI;
  - sérstökum kafla um metadata/ARIA/manifest/noscript/fallback;
  - sérstökum kafla um líklega textatengda UI/wrapping-áhættu;
  - ef niðurstaðan er PASS, skýrri upptalningu á hvaða yfirborð voru metin og hvers vegna enginn lagfæringarskyldur galli stendur eftir.

Ekki lýsa þessari lotu sem sjónrænni render-prófun. Hún er strangt, sjálfstætt, íslenskt whole-site linguistic QA.

MODE=FINAL
SOURCE_PART=SUBREVIEW_FINDINGS_WITH_VERIFIED_LOCAL_CONTEXT

The four surface reviews below already inspected the primary sources. A deterministic gate has removed duplicate, no-op, runtime-localized bootstrap, and localized-manifest fallback pseudo-findings where those exemptions were mechanically proven. Do not restore rejected candidates. Do not invent new findings. Every FAIL finding must use exactly a (location, current_text) pair from SURVIVING_CANDIDATES.
There are no surviving candidate findings after deterministic validation. You MUST return result=PASS and findings=[]. 
===== ORIGINAL_SUBREVIEWS =====
===== UI SUBREVIEW =====
SUBREVIEW_RESULT: FINDINGS

Þar sem íslenskum texta er notaður í vefsýninni, eru einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig ein

### Finding 1 — medium
- severity: medium
- location: docs/index.html
- current_text: A local, deterministic Pastafari calendar.
- issue: Þessi texti er í ensku, en íslenskum texta er notaður í vefsýninni. Það er ekki hægt að nota ensku texta í meta description fyrir íslensku tungumálið.
- correction: Breyttu texta í íslensku: „Einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig“.

### Finding 2 — medium
- severity: medium
- location: docs/index.html
- current_text: Pastafari Calendar
- issue: Þessi texti er í ensku, en íslenskum texta er notaður í vefsýninni. Það er ekki hægt að nota ensku texta í title fyrir íslensku tungumálið.
- correction: Breyttu texta í íslensku: „Pastafari-dagatal“.

### Finding 3 — medium
- severity: medium
- location: docs/about/index.html
- current_text: An explanation of the Pastafari Calendar.
- issue: Þessi texti er í ensku, en íslenskum texta er notaður í vefsýninni. Það er ekko hægt að nota ensku texta í meta description fyrir íslensku tungumálið.
- correction: Breyttu texta í íslensku: „Skýring á Pastafari-dagatalinu: aðgerðardagur og fyrirspurnardagur, ár, kótelettur, fléttaðir mánuður, dagamörk og háþróuð kerfi.“.

### Finding 4 — medium
- severity: medium
- location: docs/about/index.html
- current_text: About the Pastafari Calendar
- issue: Þessi texti er í ensku, en íslenskum texta er notaður í vefsýninni. Það er ekko hægt að nota ensku texta í title fyrir íslensku tungumálið.
- correction: Breyttu texta í íslensku: „Um Pastafari-dagatalið“.


===== ABOUT SUBREVIEW =====
SUBREVIEW_RESULT: CLEAN

Pastafari-dagatalið er íslensk íslensku og sýnilegt. Það er ekki á röngu tungumáli, eðlilegur og nútímaíslenskur. Allar textaupplifunir eru íslenskar og sýnilegar. Það eru ekki röngar eða vafasömur íslenskar þýðingar tæknilegra hugtaka. Allar textaupplifunir eru íslenskar og sýn.


===== INTEGRATION SUBREVIEW =====
SUBREVIEW_RESULT: CLEAN

Þessi rýnilotu hefur verið rýnd á `INTEGRATION` hluta og hefur ekki fundið neina röngu texta, málfræði, stíl eða tæknilegum vandamál sem eru í samræmi við íslenska tungumálið og ræðu rýnilögum. Allar textaupplifunir eru íslenskar, réttar og sýnilegar. Þar sem texta er í röngu mál


===== CONSISTENCY SUBREVIEW =====
SUBREVIEW_RESULT: FINDINGS

Þar sem útreikningurinn er íslenskur og notast er með nákvæmlega íslensku texta, eru einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig

### Finding 1 — medium
- severity: medium
- location: docs/i18n/locales/is.js
- current_text: Aðgerðardagurinn er ógildur. Athugaðu dagsetninguna og reyndu aftur.
- issue: Þessi texta er í röngu málfræðilegu hlutverki og er ekki íslensk. Það er ekki íslensk texta, heldur enska texta.
- correction: Aðgerðardagurinn er ógildur. Athugaðu dagsetninguna og reyndu aftur.

### Finding 2 — medium
- severity: medium
- location: docs/i18n/locales/is.js
- current_text: Aðgerðardagurinn er einnig Pastafari-dagur eða háður öðrum dagsetningum
- issue: Þessi texta er í röngu málfræðilegu hlutverki og er ekki íslensk. Það er ekki íslensk texta, heldur enska texta.
- correction: Aðgerðardagurinn er einnig Pastafari-dagur eða háður öðrum dagsetningum

### Finding 3 — medium
- severity: medium
- location: docs/i18n/locales/is.js
- current_text: Aðgerðardagurinn er sami dagur og fyrirspurnardagurinn (c = t)
- issue: Þessi texta er í röngu málfræðilegu hlutverki og er ekki íslensk. Það er ekki íslensk texta, heldur enska texta.
- correction: Aðgerðardagurinn er sami dagur og fyrirspurnardagurinn (c = t)


===== DETERMINISTICALLY_REJECTED_CANDIDATES =====
[
  {
    "reason": "static HTML bootstrap/fallback text is bound to runtime localization",
    "candidate": {
      "severity": "medium",
      "location": "docs/index.html",
      "current_text": "A local, deterministic Pastafari calendar.",
      "issue": "Þessi texti er í ensku, en íslenskum texta er notaður í vefsýninni. Það er ekki hægt að nota ensku texta í meta description fyrir íslensku tungumálið.",
      "correction": "Breyttu texta í íslensku: „Einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig einnig“.",
      "_surface": "ui"
    }
  },
  {
    "reason": "static HTML bootstrap/fallback text is bound to runtime localization",
    "candidate": {
      "severity": "medium",
      "location": "docs/index.html",
      "current_text": "Pastafari Calendar",
      "issue": "Þessi texti er í ensku, en íslenskum texta er notaður í vefsýninni. Það er ekki hægt að nota ensku texta í title fyrir íslensku tungumálið.",
      "correction": "Breyttu texta í íslensku: „Pastafari-dagatal“.",
      "_surface": "ui"
    }
  },
  {
    "reason": "static HTML bootstrap/fallback text is bound to runtime localization",
    "candidate": {
      "severity": "medium",
      "location": "docs/about/index.html",
      "current_text": "An explanation of the Pastafari Calendar.",
      "issue": "Þessi texti er í ensku, en íslenskum texta er notaður í vefsýninni. Það er ekko hægt að nota ensku texta í meta description fyrir íslensku tungumálið.",
      "correction": "Breyttu texta í íslensku: „Skýring á Pastafari-dagatalinu: aðgerðardagur og fyrirspurnardagur, ár, kótelettur, fléttaðir mánuður, dagamörk og háþróuð kerfi.“.",
      "_surface": "ui"
    }
  },
  {
    "reason": "static HTML bootstrap/fallback text is bound to runtime localization",
    "candidate": {
      "severity": "medium",
      "location": "docs/about/index.html",
      "current_text": "About the Pastafari Calendar",
      "issue": "Þessi texti er í ensku, en íslenskum texta er notaður í vefsýninni. Það er ekko hægt að nota ensku texta í title fyrir íslensku tungumálið.",
      "correction": "Breyttu texta í íslensku: „Um Pastafari-dagatalið“.",
      "_surface": "ui"
    }
  },
  {
    "reason": "proposed correction is identical to current_text",
    "candidate": {
      "severity": "medium",
      "location": "docs/i18n/locales/is.js",
      "current_text": "Aðgerðardagurinn er ógildur. Athugaðu dagsetninguna og reyndu aftur.",
      "issue": "Þessi texta er í röngu málfræðilegu hlutverki og er ekki íslensk. Það er ekki íslensk texta, heldur enska texta.",
      "correction": "Aðgerðardagurinn er ógildur. Athugaðu dagsetninguna og reyndu aftur.",
      "_surface": "consistency"
    }
  },
  {
    "reason": "proposed correction is identical to current_text",
    "candidate": {
      "severity": "medium",
      "location": "docs/i18n/locales/is.js",
      "current_text": "Aðgerðardagurinn er einnig Pastafari-dagur eða háður öðrum dagsetningum",
      "issue": "Þessi texta er í röngu málfræðilegu hlutverki og er ekki íslensk. Það er ekki íslensk texta, heldur enska texta.",
      "correction": "Aðgerðardagurinn er einnig Pastafari-dagur eða háður öðrum dagsetningum",
      "_surface": "consistency"
    }
  },
  {
    "reason": "proposed correction is identical to current_text",
    "candidate": {
      "severity": "medium",
      "location": "docs/i18n/locales/is.js",
      "current_text": "Aðgerðardagurinn er sami dagur og fyrirspurnardagurinn (c = t)",
      "issue": "Þessi texta er í röngu málfræðilegu hlutverki og er ekki íslensk. Það er ekki íslensk texta, heldur enska texta.",
      "correction": "Aðgerðardagurinn er sami dagur og fyrirspurnardagurinn (c = t)",
      "_surface": "consistency"
    }
  },
  {
    "reason": "duplicate location/current_text candidate",
    "candidate": {
      "severity": "medium",
      "location": "docs/i18n/locales/is.js",
      "current_text": "Aðgerðardagurinn er einnig Pastafari-dagur eða háður öðrum dagsetningum",
      "issue": "Þessi texta er í röngu málfræðilegu hlutverki og er ekki íslensk. Það er ekki íslensk texta, heldur enska texta.",
      "correction": "Aðgerðardagurinn er einnig Pastafari-dagur eða háður öðrum dagsetningum",
      "_surface": "consistency"
    }
  }
]

===== SURVIVING_CANDIDATES =====
[]

===== VERIFIED_LOCAL_CONTEXTS =====
(No surviving candidate requires local context.)