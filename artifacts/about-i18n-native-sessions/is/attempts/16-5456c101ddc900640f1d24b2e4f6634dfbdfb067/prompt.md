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

=== FINAL_ONLY_INSTRUCTIONS ===

Ef `MODE=FINAL`:
- þú færð findings úr öllum fyrri hlutum; mettu þau gagnrýnið og hafnaðu fals-positive findings sem brjóta gegn reglunum hér að ofan;
- fyrsta línan VERÐUR að vera nákvæmlega annaðhvort:
`NATIVE_QA_RESULT: PASS`
eða
`NATIVE_QA_RESULT: FAIL`
- PASS er aðeins leyfilegt ef eftir gagnrýna samantekt stendur ekkert raunverulegt málfars-, fallback-, hugtaka-, accessibility-texta- eða locale-samræmisvandamál eftir;
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
SOURCE_PART=SUBREVIEW_FINDINGS

===== UI SUBREVIEW =====
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


===== ABOUT SUBREVIEW =====
Okay, hér er rýndur matur á `ABOUT`-partinn, með áherslu á að vera nákvæmur, strangur og að gefa nákvæma staðsetningu og alvarlegheit fyrir hvert fund.

```
FINDINGS_ONLY
SOURCE_PART=ABOUT

===== docs/about/content/is.html — FULL TARGET ABOUT ARTICLE =====
<!-- Íslenska útgáfan er skrifuð beint út frá hebreska frumtextanum sem er merkingarlegur grunnur; ekkert millimál er notað. -->
<!-- Auðkenni kaflanna eru hluti af stöðugum opinberum samningi um djúptengla og eru ekki leidd af þýddum fyrirsögnum. -->
<div class="about-section about-lead" id="about-calendar">
  <p>Pastafari-dagatalið er dagatalið þar sem tíminn varð til. Reiknilög þess eru nákvæmlega skilgreindar.</p>
  <p>Dagatalið úthlutar ekki hverjum degi fastri, óbreytanlegri Pastafari-framsetningu. Til að reikna dagsetningu þarf að tilgreina tvo daga: <strong>aðgerðardaginn</strong>, sem útreikningurinn hefst frá, og <strong>fyrirspurnardaginn</strong>, sem þú vilt fá dagsetningu fyrir.</p>
  <p>Ef við táknum aðgerðardaginn með <code>c</code> og fyrirspurnardaginn með <code>t</code>, er dagsetningin</p>
  <pre class="math-block" dir="ltr" tabindex="0"><code>F(c,t)</code></pre>
  <p>en ekki <code>F(t)</code>. Sami fyrirspurnardagur getur því fengið aðra Pastafari-dagsetningu þegar aðgerðardagurinn breytist.</p>
  <p>Þetta er ekki villa. Dagatalið er skilgreint einmitt svona.</p><hr>
</div>

<section class="about-section" id="date-parts" data-toc-section data-toc-level="2">
  <h2>Úr hverju samanstendur Pastafari-dagsetning?</h2>
  <p>Hún hefur <strong>nákvæmlega fimm hluta</strong>: árnúmer, nafn kótelettu, dag innan kótelettu, nafn mánaðar og dag innan mánaðar.</p>
  <p>Almennt dæmi: <strong>ár 5000, kóteletta A, dagur 417 í kótelettunni, mánuður B, dagur 83 í mánuðinum.</strong></p>
  <p>Aðgerðardagurinn, staðsetning athugandans, auðkenni dagsins á tímalínunni eða aðrar tæknilegar upplýsingar mega birtast við hlið dagsetningarinnar, en þær eru ekki sjötta dagsetningarreiturinn.</p><hr>
</section>

<section class="about-section" id="working-day" data-toc-level="2">
  <h2>Af hverju þarf aðgerðardag?</h2>
  <p>Í venjulegum dagatölum er eðlilegt að hugsa sér að dagsetningin „tilheyri“ sjálfum deginum. Í Pastafari-dagatalinu ræðst dagsetningin af sambandi tveggja daga.</p>


===== INTEGRATION SUBREVIEW =====
```
FINDINGS_ONLY
SOURCE_PART=INTEGRATION

---
**Finding 1:**  Severity: High, Location: docs/i18n/runtime.js, Line: 219, Description:  The `resolveBrowserLocale` function is not fully compliant with the Web App Manifest localization requirements. It attempts to retrieve the browser's language from `navigator.languages` and `navigator.language` but doesn't adequately handle cases where these properties are missing or return unexpected values.  This can lead to incorrect locale resolution and subsequent i18n issues.  The function also doesn't account for the `dir` attribute of the browser's language.

Recommendation:  Enhance the `resolveBrowserLocale` function to provide a more robust fallback mechanism.  Specifically, add a check to ensure that `navigator.languages` is an array before attempting to access its elements.  Also, include a default value for `dir` (e.g., "ltr") if `navigator.language` returns an empty string or an unsupported direction.  Consider using the `navigator.languages` array directly for a more reliable language detection.

---
**Finding 2:** Severity: Medium, Location: docs/i18n/runtime.js, Line: 396, Description:  The `materializeLocaleResources` function relies on a potentially problematic pattern for handling English baseline resources.  It assumes that the `englishBaseline` resource will always be available and correctly formatted.  If this resource is missing or invalid, the function will throw an error, potentially disrupting the localization process.

Recommendation:  Add a check to ensure that the `englishBaseline` resource exists before attempting to access its properties.  Implement a more graceful fallback mechanism, such as using a default English locale or logging an error and continuing with the localization process using the available resources.  Consider adding more robust validation of the `englishBaseline` resource to ensure its integrity.

---
**Finding 3:** Severity: Low, Location: docs/i18n/registry.js, Line: 547, Description:  The `loadLocale` function throws a `RangeError` if the English baseline locale is not loaded. While this is intended to catch a potential issue, the error message "English baseline locale is required for validation." is somewhat vague and could be confusing for developers.

Recommendation:  Improve the error message to be more specific and informative.  For example, "The English baseline locale is required for validation. Please ensure that the English locale resource is loaded before proceeding."  This will help developers quickly understand the root cause of the error and take appropriate action.

---
**Finding 4:** Severity: Low, Location: docs/i18n/runtime.js, Line: 488, Description: The `populateLanguageSelector` function uses `locale.code` directly as the `lang` and `dir` attributes of the `<option>` elements. While this is generally acceptable, it's good practice to ensure that the `lang` and `dir` attributes are correctly set based on the locale's metadata.

Recommendation:  Verify that the `lang` and `dir` attributes are correctly set for each `<option>` element based on the locale's metadata.  This will help to ensure that the language selector is displayed and rendered correctly in different browsers and devices.

---
**Finding 5:** Severity: Low, Location: docs/i18n/runtime.js, Line: 546, Description: The `loadArticleForLocale` function attempts to fetch the article content using a URL constructed from the `articleLocale.asset` property.  This approach is susceptible to errors if the asset URL is invalid or inaccessible.

Recommendation:  Implement error handling to gracefully handle cases where the article asset URL is invalid or inaccessible.  This could involve logging an error, displaying a user-friendly message, or attempting to load a default article.

---
**Finding 6:** Severity: Low, Location: docs/i18n/


===== CONSISTENCY SUBREVIEW =====
Okay, hér er rýndur textur úr þínu Pastafari-dagatalinu, með áherslu á að vera nákvæmur, skiljanlegur og að því verða engar mismunandi orð eða stílar.

```
13:   <h2>Úr hverju samanstendur Pastafari-dagsetning?</h2>
14:   <p>Hún hefur <strong>nákvæmlega fimm hluta</strong>: árnúmer, nafn kótelettu, dag innan kótelettu, nafn mánuðar og dag innan mánuðar.</p>
15:   <p>Almennt dæmi: <strong>ár 5000, kóteletta A, dagur 417 í kótelettunni, mánuður B, dagur 83 í mánuðinum.</strong></p>
20:   <h2>Af hverju þarf aðgerðardag?</h2>
21:   <p>Í venjulegum dagatölum er eðlilegt að hugsa sér að dagsetningin „tilheyri“ sjálfum deginum. Í Pastafari-dagatalinu ræðst dagsetningin af sambandi tveggja daga.</p>
22:   <p>Að breyta <code>t</code> þýðir að spyrja um annan dag. Að breyta <code>c</code> getur haft miklu víðtækari áhrif: það getur breytt ársmörkum, kótelettum, mánuðum, nöfnum þeirra og því hvernig þeir fléttast saman.</p>
27:   <h2>Sami dagur, önnur dagsetning</h2>
28:   <p>Greina þarf á milli <strong>auðkennis dagsins</strong> og <strong>Pastafari-framsetningar hans</strong>. Hið fyrra er fastur staður tiltekins dags á tímalínunni; Pastafari-framsetningin felur hins vega í sér þau fimm gildi sem fást þegar dagsetningin er sýnd undir tilteknum aðgerðardeginu.</p>
221:   <h2>Hvað er Seer þá?</h2>
222:   <p>Kerfið hefur einn fastan viðmiðunardag sem kallast <strong>Stofndagur</strong>. Í proleptíska gregoríska dagatalinu er hann <strong>22. desember 41.222 f.Kr.</strong>.</p>
223:   <p>Stofndagur er ekki „upphaf tímans“; hann er reiknifestipunktur.</p>
230:   <h2>Hvað er Pastafari-dagatalið þá í raun?</h2>
231:   <p>Það er determinískt dagatali þar sem dagsetningin er ekki bara fall af fyrirspurnardegi heldur <strong>sameiginlegt fall af aðgerðardagsins og fyrirspurnardagsins</strong>.</p>
232:   <p>Hver dagsetning hefur nákvæmlega fimm reitir. Núið er frá sínu eigin sjónarhorni alltaf í ári 5000, en ár 5000 sjálft færist með aðgerðardeginum. Ár geta verið mjög löng, kótelettur eru samfelldar, mánuðir ekki endilega, og ekkert kanónískt vikukerfi er til.</p>
300:     <h3>Bygging mj
