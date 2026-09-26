# Copilot CLI Session

> [!NOTE]
> - **Session ID:** `a4eaa1be-6b15-4059-b73d-f71362f069ae`  
> - **Started:** 9/26/2026, 8:02:23 PM  
> - **Duration:** 2m 50s  
> - **Exported:** 9/26/2026, 8:05:13 PM  

---

<sub>2s</sub>

### User

NATIVE_QA_RESULT: PASS

Þú ert óháður, innfæddur tungumálalegur, merkingarlegur, skjala- og notendaviðmótsendurskoðandi fyrir verkefnið Pastafarian Calendar.

Markmiðs-einingin er Íslenska (umsagnarnefnið `is`; staðfesta/merki `is-IS`).

REVIEW_ID=is
LOCALE_TAG=is-IS

Öll eðlileg tungumálasamskipti í þessari endurskoðunarsetu verða að vera á íslensku. Fyrsta notendaskilaboðið er þetta þýdda ábending og allir venjulegir hlutar svarsins verða að vera áfram á íslensku. Ekki skipta yfir í ensku. Nákvæmar geymslurepos, greinar, slóðir, auðkenni, kóðaorð, formúlur, hashar, API-heiti og krafist véllesanleg niðurstöðulína eru undanskild.

Þetta er ný, einangruð endurskoðunarseta. Hún er eingöngu endurskoðun: ekki breyta, búa til, endurnefna eða eyða skráum í geymslum.

Það eru tvær geymslur. Kannaðu öll viðeigandi yfirborð sem talin eru upp í staðbundnum endurskoðunarlista:
1. Sargon17-Green/pastafari-calendar — þegar þessi endurskoðunar-eining hefur vefstaðsetningu, skaltu skoða ALLAN vefinn fyrir þá staðsetningu, ekki aðeins /about/. Lesið heila staðfærslu skrána og /about/ greinin, og skoðið aðalviðmót, leit að dagsetningum, dagatalsval, aðgerðir/stillingar fyrir vinnudag, samanburð, árssýn, öfug leit, hleðslu-/tóma-/villa-/gildisvilluástand, leiðbeiningar, fótur, lýsigögn/titill, staðfærsluskrá, noscript/varaslóðir, ARIA/aðgengisstengda texta, tungumálaskipti og líklega úreltar tilvísanir. Skoðaðu samning um lykiltexta, merkingarhlutverk sviga, stöðug auðkenni og staðlaðar bókstafi.
2. Sargon17-Green/Pastafarian-Calendar — skoðaðu ALLAR greinar sem taldar eru upp fyrir þessa endurskoðun. Farðu yfir allan texta sem er ætlaður fyrir menn: README og skjöl, fyrirsagnir, texta, útskýrandi skjalaskýringar, hjálp fyrir CLI, ábendingar, villur, úttakslýsingar, lýsigögn, dæmi og myndaðar skjöl. Ekki þýða forritunarmálssyntax, auðkenni, hashar, formúlur, API-heiti eða staðlaðar kóðaútgáfur.

Taktu staðbundnar skráarvörur/ cross-repo-native-qa/runtime/review-manifest.json sem yfirráðandi fyrir hvaða yfirborð geymslunnar og nákvæmar frystar SHA-gildi heyra til fyrir þessa endurskoðun. Ef grein eða útgáfa passar ekki við yfirlitsskrána, verður hún að vera FAIL og skila misræmi frekar en að endurskoða hreyfanlegt markmið.

Leitaðu virkt eftir:
- skiljanlegri en ekki innfæddri þýðingarmálfræði;
- röngu tungumáli, enskum leka, varasvörun frá grannmáli eða blönduðum stafum;
- málfræði, beygingu, föllum, samræmi, orðröð, stafsetningu, greinarmerki, stíl og orðasamböndum;
- ósamræmi í hugtökum milli notendaviðmóts, /about/ og útfærslugreina;
- tæknilega röngum þýðingum eða orðalagi sem breytir reiknilegri staðreynd;
- sviga notuð í röngu merkingarhlutverki jafnvel þótt svigasafn sé það sama;
- Unicode spillingu, röngum stafum, BiDi-vandamálum og RTL/LTR greinarmerki þar sem við á;
- lýsigögnum, titli, ARIA, skjálesartexta, staðfærsluskrá, varavalkosti og no-JavaScript vandamálum;
- líklegri umbrots-/oflæðisáhættu vegna texta. Þetta síðasta atriði er aðeins textaáhætta og má EKKI lýsa sem myndrænni sjónrænni gæðaprófun.

Staðlaðar fastar reglur eru skylda. Ekki stinga upp á að þýða eða breyta formúlum, hasher, stöðugum hlutanúmerum, API-auðkennum, nákvæmum kóðaorðum eða sönnum staðlaðum nöfnum vegna stíls.

Samræmi milli geymsla er merkingarlegt, ekki endilega bókstaflegt. Mismunandi orðalag er leyfilegt þegar bæði form eru náttúruleg og varðveita sama skilning. Ef eitt form breytir tæknilegri merkingu, tilkynnaðu það.

Fyrir verulega ólíka afbrigði/stafasett sem eru táknuð af aðskildum endurskoðunar-einingum, skoðarðu aðeins það afbrigði sem þessi ábending tilgreinir og staðbundinn listi.

Fyrsta línan í svari verður að vera nákvæmlega ein af eftirfarandi línum:
NATIVE_QA_RESULT: PASS
NATIVE_QA_RESULT: FAIL

Eftir þessa línu skaltu skrifa Markdown-skýrslu aðeins á íslensku. Hún skal innihalda:
- heildar PASS/FAIL fyrir stranga tvíþætta tungumála-/merkingarlega gæðaskoðun;
- allar niðurstöður með alvarleika (critical/high/medium/low), nákvæma geymslu, grein, skrá og nákvæma staðsetningu ef mögulegt er, núverandi texta, útskýringu og tillögu til leiðréttingar;
- aðskilda kafla um rangt tungumál/varasamræmi;
- aðskilda kafla um samræmi hugtaka;
- aðskilda kafla um lýsigögn/ARIA/staðfærsluskrá/noscript/varaföll þegar vefstaðsetning er til staðar;
- aðskilda kafla um skjöl og notendahnit í útfærslugreinum;
- aðskilda kafla um textastýrða notendaviðmót/umfjöllunaráhættu þegar vefstaðsetning er til staðar;
- ef engin galli finnst, segðu það skýrt og nefndu hvaða yfirborð þú skoðaðir í raun.

Þú mátt ekki fullyrða um sjónræna gæðaprófun, aðgengni, samskipti í vafra eða prófun á neti/PWA nema raunverulegar keyrslusönnunargögn séu veitt sérstaklega. Þessi lota er eingöngu tungumálaleg/merkingarleg hlið á gæðastýringu.



---

<sub>6s</sub>

### Copilot

Ég staðfesti fyrst frystar útgáfur og yfirborð í endurskoðunarskránni; síðan skoða ég eingöngu þau yfirborð, án þess að breyta neinum skrám.

---

<sub>7s</sub>

### `bash`

**Athuga stöðu og útgáfu vefgeymslu**

$ git status --short --branch && git remote -v && git rev-parse HEAD

<details>
<summary>6 lines</summary>

```
## feature/about-i18n-72-locales...origin/feature/about-i18n-72-locales
?? artifacts/cross-repo-native-qa/runtime/
origin	https://github.com/Sargon17-Green/pastafari-calendar (fetch)
origin	https://github.com/Sargon17-Green/pastafari-calendar (push)
91b99880808e828ac95686b024293f462477a77a
<shellId: 1 completed with exit code 0>
```

</details>


---

<sub>7s</sub>

### `bash` — Failed

**Finna endurskoðunarlista og geymslur**

$ pwd && ls -la && find .. -path '*/cross-repo-native-qa/runtime/review-manifest.json' -print

```
Permission denied and could not request permission from user
```


---

<sub>7s</sub>

### `bash`

**Sannreyna geymsluauðkenni og sjálfgefna greinar**

$ gh repo view Sargon17-Green/Pastafarian-Calendar --json nameWithOwner,url,defaultBranchRef 2>/dev/null && gh repo view Sargon17-Green/pastafari-calendar --json nameWithOwner,url,defaultBranchRef 2>/dev/null

```
{"defaultBranchRef":{"name":"main"},"nameWithOwner":"Sargon17-Green/Pastafarian-Calendar","url":"https://github.com/Sargon17-Green/Pastafarian-Calendar"}
{"defaultBranchRef":{"name":"main"},"nameWithOwner":"Sargon17-Green/pastafari-calendar","url":"https://github.com/Sargon17-Green/pastafari-calendar"}
<shellId: 0 completed with exit code 0>
```


---

<sub>11s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/review-manifest.json.**

/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/review-manifest.json

<details>
<summary>26 lines</summary>

```
{
  "review_id": "is",
  "self_name": "Íslenska",
  "locale": "is-IS",
  "script": "Latn",
  "direction": "ltr",
  "repo1": {
    "repository": "Sargon17-Green/pastafari-calendar",
    "branch": "feature/about-i18n-72-locales",
    "reviewed_head": "91b99880808e828ac95686b024293f462477a77a",
    "locale_code": "is",
    "locale_file": "docs/i18n/locales/is.js",
    "about_file": "docs/about/content/is.html"
  },
  "repo2": {
    "repository": "Sargon17-Green/Pastafarian-Calendar",
    "reference_main_sha": "56bc4173aae4975ded019ef5ab5a36249f1424df",
    "branches": [
      {
        "name": "Elm+íslensku",
        "head_sha": "825585ec2789ba96cc9ac68312375fcd234dbcc7",
        "local_path": "/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0"
      }
    ]
  }
}
```

</details>


---

<sub>11s</sub>

### `bash` — Failed

**Kanna fryst SHA og tiltækar greinar**

$ git --no-pager log -1 --format='%H %s' && git rev-parse refs/remotes/origin/HEAD 2>/dev/null || true && git branch -a --no-color

```
Permission denied and could not request permission from user
```


---

<sub>11s</sub>

### `bash` — Failed

**Athuga fjargeymslu-SHA fyrir tilgreindar greinar**

$ gh api repos/Sargon17-Green/Pastafarian-Calendar/commits/main --jq .sha && gh api repos/Sargon17-Green/pastafari-calendar/commits/feature/about-i18n-72-locales --jq .sha 2>/dev/null

```
Permission denied and could not request permission from user
```


---

<sub>13s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js

```
File too large to read at once (22.9 KB). Consider using the grep tool to search within the file, or view with view_range to read specific sections.
```


---

<sub>13s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html

```
File too large to read at once (33.8 KB). Consider using the grep tool to search within the file, or view with view_range to read specific sections.
```


---

<sub>13s</sub>

### `glob`

****/***

"**/*" in docs

<details>
<summary>197 matches</summary>

```
[glob: 189 path(s) under /home/runner/work/pastafari-calendar/pastafari-calendar/docs; grouped by directory]

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/ (75 path(s))
  about.js
  content/af.html
  content/ar.html
  content/az.html
  content/be.html
  content/bg.html
  content/bn.html
  content/bs.html
  content/ca.html
  content/cs.html
  content/da.html
  content/de.html
  content/el.html
  content/en.html
  content/eo.html
  content/es.html
  content/et.html
  content/fa.html
  content/fi.html
  content/fil.html
  content/fo.html
  content/fr.html
  content/fy.html
  content/gl.html
  content/gu.html
  content/ha.html
  content/he.html
  content/hi.html
  content/hr.html
  content/ht.html
  content/hu.html
  content/hy.html
  content/id.html
  content/is.html
  content/it.html
  content/ja.html
  content/jv.html
  content/ka.html
  content/kk.html
  content/ko.html
  content/lb.html
  content/lt.html
  content/lv.html
  content/mk.html
  content/mr.html
  content/ms.html
  content/nb.html
  content/ne.html
  content/nl.html
  content/nn.html
  content/pa.html
  content/pl.html
  content/pt.html
  content/registry.js
  content/ro.html
  content/ru.html
  content/sk.html
  content/sl.html
  content/so.html
  content/sq.html
  content/sr.html
  content/sv.html
  content/sw.html
  content/ta.html
  content/te.html
  content/th.html
  content/tr.html
  content/uk.html
  content/ur.html
  content/uz.html
  content/vi.html
  content/yo.html
  content/zh.html
  content/zu.html
  index.html

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/ (75 path(s))
  calendar-identifiers.js
  locales/af.js
  locales/ar.js
  locales/az.js
  locales/be.js
  locales/bg.js
  locales/bn.js
  locales/bs.js
  locales/ca.js
  locales/cs.js
  locales/da.js
  locales/de.js
  locales/el.js
  locales/en.js
  locales/eo.js
  locales/es.js
  locales/et.js
  locales/fa.js
  locales/fi.js
  locales/fil.js
  locales/fo.js
  locales/fr.js
  locales/fy.js
  locales/gl.js
  locales/gu.js
  locales/ha.js
  locales/he.js
  locales/hi.js
  locales/hr.js
  locales/ht.js
  locales/hu.js
  locales/hy.js
  locales/id.js
  locales/is.js
  locales/it.js
  locales/ja.js
  locales/jv.js
  locales/ka.js
  locales/kk.js
  locales/ko.js
  locales/lb.js
  locales/lt.js
  locales/lv.js
  locales/mk.js
  locales/mr.js
  locales/ms.js
  locales/nb.js
  locales/ne.js
  locales/nl.js
  locales/nn.js
  locales/pa.js
  locales/pl.js
  locales/pt.js
  locales/ro.js
  locales/ru.js
  locales/sk.js
  locales/sl.js
  locales/so.js
  locales/sq.js
  locales/sr.js
  locales/sv.js
  locales/sw.js
  locales/ta.js
  locales/te.js
  locales/th.js
  locales/tr.js
  locales/uk.js
  locales/ur.js
  locales/uz.js
  locales/vi.js
  locales/yo.js
  locales/zh.js
  locales/zu.js
  registry.js
  runtime.js

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/ (29 path(s))
  ACCESSIBILITY-TESTING.md
  ASTRONOMICAL-DAY.md
  AUTHORITATIVE-ENGINE-ARCHITECTURE.md
  DIAGNOSTICS.md
  DOCUMENTATION-CONSISTENCY.md
  EXTREME-PERFORMANCE-ANALYSIS.md
  FAST-ENGINE-SOAK-VALIDATION-2026-08-15.md
  I18N-SUPPORT-LEVELS.md
  I18N.md
  INTL-ICU-SEMANTIC-BOUNDARY.md
  LICENSE
  MEMORY-TESTING.md
  README.md
  REVERSE-CONSTRAINTS.md
  SHA256SUMS.txt
  SUPPLY-CHAIN-SECURITY.md
  UPLOAD-TO-GITHUB.md
  app.js
  calendar-converters.js
  calendar-input-conventions.js
  chinese-calendrica-detour.js
  index.html
  manifest.webmanifest
  observer-location.js
  reverse-search-controller.js
  reverse-ui.js
  styles.css
  sw.js
  venus-day-boundary.js

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/engine/ (6 path(s))
  pastafari-calendar-fast.js
  pastafari-constraints-client.js
  pastafari-constraints.js
  pastafari-diagnostics.js
  pastafari-fast-worker.js
  pastafari-reverse-worker.js

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/icons/ (3 path(s))
  icon-192.png
  icon-512.png
  icon.svg

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/authority/ (1 path(s))
  ORACLE-AUTHORITY.md

[extensions: .js=92, .html=74, .md=16, .png=2, [no extension]=1, .webmanifest=1, .css=1, .txt=1]
```

</details>


---

<sub>13s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0.**

/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0

<details>
<summary>14 lines</summary>

```
.git
.github
CANONICAL_NAMES_LOCK.sha256
DEVELOPMENT_STAGE.md
LICENSE
README.md
SOURCE_LANGUAGE_CATALOG.md
SPAGHETTI_DEVELOPMENT_HISTORY.md
STAGE_01_EXECUTION_STATUS.txt
STAGE_01_NORMATIVE_AUDIT.md
STAGE_01_OWNERSHIP_AUDIT.md
elm.json
src
tests
```

</details>


---

<sub>18s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js (lines 1-260)

<details>
<summary>258 lines</summary>

```
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
    "calendarHelp.hebrew": "Mánuðir eru valdir eftir nafni. Ár og dag má slá inn með tugatölustöfum eða hebreskum talnastöfum, til dæmis תשפ״ו eða י״ד; ef ár er ritað með hebreskum talnastöfum án þúsundamerkis er 5.000 bætt við það.",
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
    "calendar.targetOutside": "Leitaða dagsetningin er ekki í kótelettunni sem nú er sýnd. Þú getur haldið áfram að fletta eða leitað að annarri dagsetningu.",
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
    "year.targetPosition": "Leitaða dagsetningin er dagur {day} af {length} í þessu ári.",
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
    "guide.2.heading": "Leitaðu í hvaða studdu dagatali sem er",
    "guide.2.body": "Undir „Hvaða dag viltu finna?“ velurðu dagatal, fyllir út reitina og velur „Sýna dagsetningu“. Valkostirnir fela í sér gregorískt, hebreskt, júlíanskt, íslamskt, persneskt, kínverskt, hindú, saka, taílenskt, eþíópískt, koptískt, japanskt, minguo og bahá’í dagatal, auk langtals Maya.",
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
    "reverse.options.maxScanned": "Stöðva eftir þennan fjölda vinnuei

[Output truncated. Use view_range=[259, ...] to continue reading. In your next response, you may batch this with other view calls. File has at least 352 lines.]
```

</details>


---

<sub>18s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html (lines 1-260)

<details>
<summary>192 lines</summary>

```
<!-- Íslenska útgáfan er skrifuð beint út frá hebreska semantic master; ekkert millimál er notað. -->
<!-- Section-ID eru hluti af stöðugum opinberum deep-link contract og eru ekki leidd af þýddum fyrirsögnum. -->
<div class="about-section about-lead" id="about-calendar">
  <p>Í frásögn þessa vefs er Pastafari-dagatalið sett fram sem dagatalið þar sem tíminn sjálfur varð til. Hvernig það virkar er þó skilgreint með ströngum og nákvæmum reglum.</p>
  <p>Dagatalið úthlutar ekki hverjum degi föstu, óbreytanlegu Pastafari-merki. Til að reikna dagsetningu þarf að tilgreina tvo daga: <strong>aðgerðardaginn</strong>, sem útreikningurinn hefst frá, og <strong>fyrirspurnardaginn</strong>, sem spurt er um.</p>
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

<section class="about-section" id="working-day" data-toc-section data-toc-level="2">
  <h2>Af hverju þarf aðgerðardag?</h2>
  <p>Í venjulegum dagatölum er eðlilegt að hugsa sér að dagsetningin „tilheyri“ sjálfum deginum. Í Pastafari-dagatalinu ræðst dagsetningin af sambandi tveggja daga.</p>
  <p>Að breyta <code>t</code> þýðir að spyrja um annan dag. Að breyta <code>c</code> getur haft miklu víðtækari áhrif: það getur breytt ársmörkum, kótelettum, mánuðum, nöfnum þeirra og því hvernig þeir fléttast saman.</p>
  <p>Almanak sem reiknað er í dag þarf því ekki að vera rétt á morgun. Þetta forðar líka þeirri óþægilegu stöðu að prentað dagatal haldist gagnlegt heilt ár.</p><hr>
</section>

<section class="about-section" id="day-identity" data-toc-section data-toc-level="2">
  <h2>Sami dagur, önnur dagsetning</h2>
  <p>Greina þarf á milli <strong>auðkennis dagsins</strong> og <strong>Pastafari-framsetningar hans</strong>. Hið fyrra er fastur staður tiltekins dags á tímalínunni; Pastafari-framsetningin felur hins vegar í sér þau fimm gildi sem fást þegar dagurinn er sýndur undir tilteknum aðgerðardegi.</p>
  <p>Í vörunni og API-viðmótinu má kalla hið fyrra <code>day-id</code>: fast auðkenni dags á tímalínunni sem breytist ekki þótt framsetningin breytist. Hins vegar þurfa</p>
  <pre class="math-block" dir="ltr" tabindex="0"><code>F(c_1,t)</code></pre>
  <p>og</p>
  <pre class="math-block" dir="ltr" tabindex="0"><code>F(c_2,t)</code></pre>
  <p>ekki að vera jöfn.</p>
  <p>Því getur handvirk breyting á aðgerðardegi breytt Pastafari-dagsetningunni sem sýnd er fyrir sama dag, án þess að dagurinn sjálfur færist nokkuð á tímalínunni.</p>
  <p>Sama regla gildir um atburði. Fundur, fæðing eða sögulegur atburður ætti að vera tengdur föstu auðkenni á tímalínunni; Pastafari-dagsetningu hans má endurreikna eftir birtingarsamhengi.</p>
  <p>Merkingin getur breyst. Atburðurinn ekki.</p><hr>
</section>

<section class="about-section" id="year-5000" data-toc-section data-toc-level="2">
  <h2>Ár 5000</h2>
  <p>Þegar aðgerðardagurinn og fyrirspurnardagurinn eru sami dagur,</p>
  <pre class="math-block" dir="ltr" tabindex="0"><code>c=t</code></pre>
  <p>er árnúmerið alltaf</p>
  <pre class="math-block" dir="ltr" tabindex="0"><code>5000</code></pre>
  <p>Með öðrum orðum: núið er, séð frá sjálfu sér, alltaf innan árs 5000. En ár 5000 er ekki fast sögulegt tímabil; það er valið upp á nýtt í hvert sinn miðað við aðgerðardaginn.</p>
  <p>Aðgerðardagurinn sjálfur er einnig innan árs 5000, eins og aðrir dagar sama valda árs. Því <strong>sannar það eitt að dagur sé í ári 5000 ekki að <code>t=c</code>.</strong></p>
  <p>Árnúmerið sýnir þó stefnuna:</p>
  <pre class="math-block" dir="ltr" tabindex="0"><code>Y&gt;5000 \Rightarrow t&gt;c</code></pre>
  <p>og</p>
  <pre class="math-block" dir="ltr" tabindex="0"><code>Y&lt;5000 \Rightarrow t&lt;c</code></pre>
  <p>Það er líka til <strong>ár 0</strong>; lengra aftur í fortíðinni koma ár með neikvæðum númerum.</p><hr>
</section>

<section class="about-section" id="years-and-gates" data-toc-section data-toc-level="2">
  <h2>Ár og hlið</h2>
  <p>Pastafari-ár getur haft</p>
  <pre class="math-block" dir="ltr" tabindex="0"><code>252\text{ til }5778</code></pre>
  <p>daga. Þetta eru kanónísk mörk kerfisins, ekki reynslumeðaltöl.</p>
  <p>Ár getur því verið styttra en sólarár eða lengra en fimmtán sólarár. Ársmörkin eru byggð úr kerfi <strong>hliða</strong>; mörk kótelettna koma úr sama kerfi.</p>
  <p>Árslok þurfa hvorki að fylgja árstíð, einni umferð Jarðar um Sól né tunglhring, og þau þurfa heldur ekki að laga sig að þeirri hagnýtu ósk að árið fari nú loksins að klárast.</p><hr>
</section>

<section class="about-section" id="cutlets" data-toc-section data-toc-level="2">
  <h2>Kótelettur</h2>
  <p>Hvert ár skiptist í <strong>6 til 17 kótelettur</strong>. Kóteletta er samfellt tímabil í tímaröð.</p>
  <p>Ef dagur 250 í kótelettu er í dag, verður dagur 251 í sömu kótelettu á morgun, nema í dag sé síðasti dagur hennar. Mörk kótelettna eru hlið og kóteletta varir að minnsta kosti</p>
  <pre class="math-block" dir="ltr" tabindex="0"><code>42</code></pre>
  <p>daga.</p>
  <p>Kerfið hefur 17 kanónísk kótelettunöfn og sama nafn endurtekur sig ekki innan sama árs. Nafnið ákvarðar hvorki lengd né staðsetningu kótelettunnar.</p><hr>
</section>

<section class="about-section" id="months-and-weaving" data-toc-section data-toc-level="2">
  <h2>Mánuðir og fléttun</h2>
  <p>Hvert ár hefur</p>
  <pre class="math-block" dir="ltr" tabindex="0"><code>3\text{ til }47</code></pre>
  <p>byggingarmánuði og hverjum mánuði er úthlutað</p>
  <pre class="math-block" dir="ltr" tabindex="0"><code>4\text{ til }123</code></pre>
  <p>dögum.</p>
  <p>En Pastafari-mánuður <strong>þarf ekki að vera samfellt tímabil</strong>. Tímaröðin gæti til dæmis verið:</p>
  <blockquote><p>Mánuður A — dagur 14<br>Mánuður B — dagur 9<br>Mánuður A — dagur 15</p></blockquote>
  <p>Þetta er fullkomlega gilt. Dagur 15 í mánuði A er næsti dagur <strong>þess mánaðar</strong>, jafnvel þótt dagur úr öðrum mánuði sé á milli.</p>
  <p>„Dagur í mánuði“ segir því ekki hversu margir dagar á tímalínunni hafa liðið frá fyrstu birtingu mánaðarins. Þetta er raðnúmer meðal þeirra daga sem úthlutað er mánuðinum á árinu. Dagur 48 merkir 48. daginn sem tilheyrir mánuðinum, ekki 47 dögum eftir fyrstu birtingu hans.</p><hr>
</section>

<section class="about-section" id="month-interleaving" data-toc-section data-toc-level="2">
  <h2>Mánuðir fléttast saman</h2>
  <p>Hugsa má mánuðina sem þræði sem liggja í gegnum árið. Hver dagur tilheyrir nákvæmlega einum mánuði; morgundagurinn getur tilheyrt öðrum mánuði, og síðar getur fyrri mánuðurinn komið aftur og haldið áfram með næsta númeri.</p>
  <p>Fléttunin hefur reglur, þar á meðal takmarkanir á röð fyrstu og síðustu birtinga mánaða. En engin krafa er um að einn mánuður ljúki áður en annar byrjar.</p>
  <ul>
    <li>Kótelettan mælir staðsetningu innan samfellds tímabils.</li>
    <li>Mánuðurinn segir til um aðild að byggingarþræði sem getur horfið og síðar birst aftur.</li>
  </ul>
  <p>Einn mánuður getur farið í gegnum margar kótelettur, og innan einnar kótelettu geta margir mánuðir birst. Upphaf og endir kerfanna tveggja þurfa ekki að falla saman.</p><hr>
</section>

<section class="about-section" id="next-day-in-month" data-toc-section data-toc-level="2">
  <h2>Næsti dagur mánaðarins er ekki endilega á morgun</h2>
  <p>Ef í dag er dagur 17 í tilteknum mánuði, þá er dagur 18 í sama mánuði <strong>næsta birting þess mánaðar</strong>. Hún getur verið á morgun eða miklu síðar.</p>
  <p><strong>Á morgun</strong> er næsti dagur á tímalínunni; <strong>næsti dagur mánaðarins</strong> er næsta birting sama mánaðar.</p>
  <p>Sömuleiðis þýðir „lok mánaðar“ ekki að lokin séu nálægt í tíma. Mánuður með 120 daga getur verið á degi 119 í dag og dagur 120 komið miklu síðar innan sama árs.</p><hr>
</section>

<section class="about-section" id="no-weeks" data-toc-section data-toc-level="2">
  <h2>Ekkert vikukerfi</h2>
  <p>Núverandi kanóníska forskrift <strong>skilgreinir ekkert vikukerfi</strong>. Engin kanónísk sjö daga eining er til, engin Pastafari-nöfn á vikudögum og engin regla sem gerir tvo daga að „sama vikudegi“.</p>
  <p>Auðvitað má leggja borgaralegt vikukerfi utan á; það er einfaldlega ekki hluti af Pastafari-dagsetningunni.</p><hr>
</section>

<section class="about-section" id="canonical-names" data-toc-section data-toc-level="2">
  <h2>Nöfn</h2>
  <p>Það eru 17 kanónísk kótelettunöfn og 47 kanónísk mánaðarnöfn. Innan eins árs birtist hvert nafn í sínum flokki í mesta lagi einu sinni.</p>
  <p>Auðkenni nafnsins er kanónískt og merkingarbært; það er ekki niðurstaða atkvæðagreiðslu milli mismunandi stafsetninga, þýðinga eða útfærslna. Um merkingu nafnanna hefur hebreska Megillah hæsta vald; þýðingar og umritanir eru aðeins birtingarlög.</p>
  <p>Nafnið er heldur ekki falinn lengdarkóði. Nafn tiltekinnar kótelettu eða mánaðar gerir eininguna ekki sjálfkrafa lengri eða styttri.</p><hr>
</section>

<section class="about-section" id="month-day-pairs" data-toc-section data-toc-level="2">
  <h2>Lítil staðreynd um mánuði</h2>
  <p>Það eru 47 mánaðarnöfn og mánuður getur mest náð degi 123. Fjöldi setningafræðilega mögulegra para af gerðinni „mánaðarnafn + dagnúmer í mánuði“ er því</p>
  <pre class="math-block" dir="ltr" tabindex="0"><code>47\times123=5781</code></pre>
  <p>Hver dagur ársins gerir nákvæmlega eitt slíkt par raunverulegt. Ef lengd ársins er <code>L</code>, birtast nákvæmlega <code>L</code> pör. Þar sem</p>
  <pre class="math-block" dir="ltr" tabindex="0"><code>L\le5778</code></pre>
  <p>verður hvert ár að skilja eftir að minnsta kosti</p>
  <pre class="math-block" dir="ltr" tabindex="0"><code>5781-5778=3</code></pre>
  <p>möguleg pör ónotuð. Jafnvel lengsta árið hefur ekki nógu marga daga til að nota þau öll.</p><hr>
</section>

<section class="about-section" id="calculation" data-toc-section data-toc-level="2">
  <h2>Hvernig er dagatalið reiknað?</h2>
  <p>Innri útreikninginn köllum við hér <strong>sósuna</strong>. Í miðju hans er frumtalan</p>
  <pre class="math-block" dir="ltr" tabindex="0"><code>Q=2^{127}-1</code></pre>
  <p>Ferlið felur í sér fimm inntaksteljara, 7 falda dropa, 46 sýnilega dropa, 6 skálar, breytilega röð skálanna, 12 lokablöndur, innsigli fyrir mismunandi svör, samsetningarval, smíði hliða, val ára, skiptingu kótelettna, val nafna, smíði mánaða og fléttun mánaðardaga.</p>
  <p>Lokauppfærslurnar eru <strong>samhliða</strong>: í hverri blöndu eru öll sex nýju gildin reiknuð úr sama gamla ástandinu og aðeins síðan eru allar sex skálarnar uppfærðar í einu.</p>
  <p>Í 12 lokablöndunum er eitt sérstaklega mikilvægt kanónískt atriði. Ef <code>S</code> er summa sex gömlu skálanna og <code>r</code> er númer blöndunnar, reiknar kerfið</p>
  <pre class="math-block" dir="ltr" tabindex="0"><code>R=\operatorname{SAVE}(S+149r)</code></pre>
  <p><code>R</code> er <strong>vistaða summan</strong>. Bæði val á skálaröð og innri uppfærsla blöndunnar nota <code>R</code>, ekki hráu summuna <code>S</code>.</p>
  <p>Eldri útgáfur sem sendu hráu summuna inn í þessa uppfærslu lýsa ekki lengur núverandi kanónískri merkingarfræði. Dæmi sem byggja á gömlu reglunni ætti að telja úrelt þar til þau hafa verið staðfest aftur.</p>
  <p>Eftir blöndurnar heldur svarahringurinn einnig áfram röðinni sem var læst við 46. sýnilega dropann; henni á ekki sjálfkrafa að skipta út fyrir röð síðustu blöndunnar.</p><hr>
</section>

<section class="about-section" id="short-and-wide-choice" data-toc-section data-toc-level="2">
  <h2>Stutt val (Short Choice) og vítt val (Wide Choice)</h2>
  <p>Fyrir tiltölulega lítil valrúm er <strong>stutt val</strong> notað. Það notar úrtak með höfnun til að forðast skekkju sem einföld módúlóaðgerð gæti annars valdið.</p>
  <p>Fyrir mjög stór valrúm er <strong>vítt val</strong> notað. Ekki má eigna því eiginleika sem forskriftin tryggir ekki.</p>
  <p>Vítt val jafngildir ekki því að mynda óháða og jafnt dreifða tölustafi í <code>Q</code>-grunni þar til vísi fæst. Því leiðir ekki af þessu að hvert gilt val verði endilega að hafa sömu jákvæðu líkur. Í nógu stórum valrýmum geta verið gild val sem þetta kerfi nær aldrei til.</p>
  <p>Dagatalið sjálft er áfram fullkomlega determinískt. „Choice“ er heiti á þrepi reikniritsins, ekki slembiútdráttur við notkun.</p><hr>
</section>

<section class="about-section" id="structural-atlas" data-toc-section data-toc-level="2">
  <h2>Byggingaratlas</h2>
  <p>Hingað til höfum við talað um reglur dagatalsins. Næstu tölur eru annars konar upplýsingar: <strong>reynsluniðurstöður</strong> úr stóru reikniúrtaki.</p>
  <p>Atlasinn var reiknaður út með þeirri útgáfu vélarinnar sem auðkennd er með <code>8e155fa4198ea7bcfeb16138ac5d6662706f4d93</code> og innihélt 4.096 aðgerðardaga; árin 4990–5010 fyrir hvern þeirra; 86.016 ársbyggingar; 625.437 kótelettur; 3.535.422 byggingarmánuði; meira en 356 milljónir samfelldra mánaðarkafla; og meira en 364 milljónir færslna frá degi <code>n</code> í dag <code>n+1</code> í sama mánuði.</p>
  <p>Þessar tölur lýsa þessu gagnasafni, ekki kanónískum reglum.</p>
  <div class="about-table-scroll" role="region" tabindex="0" aria-label="Mæld gögn úr byggingaratlasnum">
    <table class="about-table">
      <thead><tr><th scope="col">Mæld stærð</th><th scope="col">Niðurstaða í úrtaki</th></tr></thead>
      <tbody>
        <tr><td>Meðallengd árs</td><td>4.275,182 dagar</td></tr>
        <tr><td>Miðgildi árslengdar</td><td>4.343</td></tr>
        <tr><td>Mælt lágmark / hámark</td><td>716 / 5.778</td></tr>
        <tr><td>Meðalfjöldi kótelettna á ári</td><td>7,271</td></tr>
        <tr><td>Ár með nákvæmlega 6 kótelettur</td><td>42,00 %</td></tr>
        <tr><td>Ár með 6–8 kótelettur</td><td>81,29 %</td></tr>
        <tr><td>Meðallengd kótelettu</td><td>587,963 dagar</td></tr>
        <tr><td>Miðgildi kótelettulengdar</td><td>560</td></tr>
        <tr><td>Meðalfjöldi mánaða á ári</td><td>41,102</td></tr>
        <tr><td>Miðgildi fjölda mánaða</td><td>43</td></tr>
        <tr><td>Ár með 47 mánuði</td><td>15,63 %</td></tr>
        <tr><td>Ár með að minnsta kosti 45 mánuði</td><td>36,81 %</td></tr>
        <tr><td>Meðallengd byggingarmánaðar</td><td>104,014 dagar</td></tr>
        <tr><td>Miðgildi mánaðarlengdar</td><td>115</td></tr>
        <tr><td>Meðalfjöldi samfelldra kafla í mánuði</td><td>100,897</td></tr>
        <tr><td>Hlutfall mánaðarkafla sem vara einn dag</td><td>97,482 %</td></tr>
        <tr><td>Líkur á að tveir aðliggjandi dagar séu í sama mánuði</td><td>2,9976 %</td></tr>
        <tr><td>Meðalfjöldi daga úr öðrum mánuðum milli <code>n</code> og <code>n+1</code> í sama mánuði</td><td>40,408</td></tr>
        <tr><td>Meðalbil milli fyrstu og síðustu birtingar mánaðar</td><td>4.266,653 dagar</td></tr>
      </tbody>
    </table>
  </div>
  <p>Í reynd getur mánuður með um hundrað dögum verið dreifður yfir nær heilt Pastafari-ár.</p>
  <p>Sami atlas sýndi einnig eðlilega valskekkju í þágu lengri ára í kringum ár 5000. Í úrtakinu var „venjulegt“ ár að meðaltali um 4.262 daga. Ef ár eru vegin eftir fjölda daga í þeim hækkar meðaltalið í um 4.466 daga; ár 5000 sjálft var að meðaltali um 4.499 dagar.</p>
  <p>Ástæðan er einföld: ár 5000 verður að innihalda aðgerðardaginn. Lengra ár hefur fleiri daga þar sem það getur verið árið sem inniheldur aðgerðardaginn.</p>
  <p>Samband milli nafns einingar og lengdar hennar var einnig mjög veikt í úrtakinu. Þetta sannar ekki fullkomið stærðfræðilegt óhæði, en atlasinn gefur enga hagnýta vísbendingu um að nöfnin hafi verið hönnuð til að kóða lengd.</p>
  <p>Auk þess eru 86.016 ársbyggingarnar ekki 86.016 fullkomlega óháð úrtök: milli upphafs- og endahliðs eru aðeins 24.786 mismunandi bil. Aðgerðardagar sem liggja nálægt hver öðrum geta valið sama ársbil og samt myndað ólíka innri uppbyggingu.</p>
  <p>Atlasinn lýsir því mældri hegðun útfærslunnar vel, en ekki má breyta honum í líkindasetningu um allar mögulegar dagatalsgerðir.</p><hr>
</section>

<section class="about-section" id="anniversaries" data-toc-section data-toc-level="2">
  <h2>Afmæli og árstíðarbundnar endurkomur</h2>
  <p>Hér þarf fyrst að skilgreina hvað „sami dagur á hverju ári“ merkir. Eðlilegar endurkomuhnit eru <code>(mánaðarnafn, dagur í mánuði)</code> og <code>(kótelettunafn, dagur í kótelettu)</code>; skilyrði má einnig sameina.</p>
  <p>Pastafari-afmæli er því ekki einfaldlega <code>RRULE:FREQ=YEARLY</code>. Finna þarf næsta ár sem uppfyllir valda endurkomuskilyrði, og upprunalegi atburðurinn telst ekki sjálfkrafa vera eigin „næsta birting“.</p>
  <p>Að breyta aðgerðardeginum aðeins fyrir birtingu ætti ekki að breyta auðkenni manns, fæðingarstund eða aldri.</p>
  <p>Í nákvæmri yfirferð á 4.096 sjálftilvísandi dagsetningum var næsta Pastafari-ár prófað allt að 250.000 ár í hvora átt:</p>
  <ul>
    <li>Fyrir <code>(mánaðarnafn, dagur í mánuði)</code> var miðgildi biðtímans fram að fyrstu endurkomu eitt Pastafari-ár; 77,56 % endurkomna áttu sér stað á næsta ári, 93,77 % innan tveggja ára og 99,44 % innan fimm ára. Lengsta mælda biðin var 21 ár.</li>
    <li>Fyrir <code>(kótelettunafn, dagur í kótelettu)</code> var miðgildið 3 ár; 88,89 % fundust innan 10 ára, en dreifingin hefur mjög þungan hala og lengsta mælda biðin var 51.954 Pastafari-ár.</li>
  </ul>
  <p>Þetta eru <strong>reynsluniðurstöður úr prófuðu gagnasafni</strong>; þær sanna ekki að sérhver möguleg endurkoma hljóti að gerast og gefa ekki tryggingu fyrir hámarksbiðtíma.</p><hr>
</section>

<section class="about-section" id="appointments" data-toc-section data-toc-level="2">
  <h2>Hvernig er fundur ákveðinn?</h2>
  <p>Ef tveir vilja semja um fund með Pastafari-dagsetningu einni saman verða þeir að minnsta kosti að vera sammála um fimm dagsetningarreiti og aðgerðardaginn sem notaður var í útreikningnum. Betra er að vista aðgerðardaginn sem fast dagauðkenni en sem orðið „í dag“; annars geta tveir reiknað tvö mismunandi dagatöl.</p>
  <ul>
    <li>„á morgun“ er næsti dagur á tímalínunni;</li>
    <li>„næsti dagur mánaðarins“ er næsta birting þess mánaðar;</li>
    <li>„lok mánaðarins“ eru síðasta birting þess mánaðar;</li>
    <li>„allur mánuðurinn“ getur þýtt mengi daga sem tilheyra mánuðinum eða allt samfellt tímabil á tímalínunni frá fyrstu til síðustu birtingar;</li>
    <li>„næsta ár“ er næsta árið í dagatalinu sem byggt er undir valda aðgerðardeginum.</li>

[Output truncated. Use view_range=[209, ...] to continue reading. In your next response, you may batch this with other view calls. File has at least 332 lines.]
```

</details>


---

<sub>18s</sub>

### `glob`

****/***

"**/*" in artifacts/cross-repo-native-qa/runtime/repo2-0

<details>
<summary>19 matches</summary>

```
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/STAGE_01_EXECUTION_STATUS.txt
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/elm.json
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/SOURCE_LANGUAGE_CATALOG.md
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/README.md
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/src/Pastafari/SourceLanguageCatalog.elm
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/src/Pastafari/Spaghetti.elm
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/src/Pastafari/ExactInt.elm
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/src/Pastafari/MonsterBase.elm
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/STAGE_01_OWNERSHIP_AUDIT.md
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/LICENSE
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/SPAGHETTI_DEVELOPMENT_HISTORY.md
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/CANONICAL_NAMES_LOCK.sha256
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/tests/Stage01Harness.elm
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/tests/Stage01Checks.elm
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/tests/BootstrapFixtures.elm
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/tests/NormativeOracle.elm
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/DEVELOPMENT_STAGE.md
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/STAGE_01_NORMATIVE_AUDIT.md
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/.github/workflows/canonical-names-lock.yml
```

</details>


---

<sub>18s</sub>

### `rg`

**is|is-IS|Iceland|Ísland|íslensk**

"is|is-IS|Iceland|Ísland|íslensk" in *.{html,js,md,json,webmanifest} (docs)

<details>
<summary>143 matches</summary>

```
[grep content: 8854 matches across 182 file(s) under /home/runner/work/pastafari-calendar/pastafari-calendar/docs; compact summary]
MEMORY-TESTING.md (75 match(es)):
  3: This document describes the retained-memory tests for the JavaScript engine, reverse/constraint paths, router state, the Pages UI, and browser Workers.
  29: | `CalculationState.yearsByNumber` | one fast calculation state | Pastafari  ... [+16 chars] ... ime | **no explicit eviction bound**; parent calculation-state LRU is bounded |
  39: | router authoritative shutdown timer | router instance | singleton timer | until shutdown/retry/dispose | previous timer is cleared before replacement; `dispose()` clears it |
  72: - `repeated-identical` — repeated identical forward conversion after warm-up; output is consumed and the result cache must remain at one entry;
  88: ## Shape heuristic and thresholds
  105: That last condition is useful for distinguishing cache filling that decele ... [+152 chars] ... arm-up baseline. It is a last-resort relative guard, not an absolute MB budget.
  124: - the public result cache is bounded to 1024 entries;
  148: The browser page is served through the same style of local deterministic HT ... [+68 chars] ... rements so disk-backed `CacheStorage` is not confused with page-process memory.
  175: A limitation is important: page-target `JSHeapUsedSize` does not directly  ... [+123 chars] ... ained bytes are not claimed. RSS is not substituted as a fake precision metric.
  233: - the existing benchmark API smoke still runs;
  250: A failure message/report contains the scenario, post-warm-up baseline, fina ... [+39 chars] ... ache/router counts where available, and base-commit comparison where available.
  266: - A PASS means the tested workloads did not show the guarded retained-growth patterns; it is not a proof that no leak can exist on any untested path.
  ... 63 more match(es) omitted in this file
INTL-ICU-SEMANTIC-BOUNDARY.md (14 match(es)):
  3: This note records the boundary enforced by Update 13. It does not remove `Intl`, and it does not redefine host-backed convenience calendars as canonical calendars.
  7: A calendar representation that is normative under the Magillah must be compu ... [+162 chars] ... st feature support may not determine any semantic field of that representation.
  9: Host-backed and formatting APIs may continue to use `Intl`. Their output is not a tablets oracle.
  15: The Magillah's Solar Hijri Foundation value is the arithmetic 2820-cycle re ... [+127 chars] ... esentation; the Magillah's Hijri Foundation anchor is arithmetic Islamic civil.
  19: `islamic-umalqura` and `solar-hijri-official` continue to use `Intl.DateTime ... [+92 chars] ... his behavior is allowed because these paths are non-normative convenience APIs.
  21: The sealed chronicle also retains its historical host-backed Chinese converter. Update 13 deliberately does not delete or rewrite it.
  25: The supported browser doorway, `browser/pastafari-calendar-core.js`, now pl ... [+294 chars] ...  a hidden `Symbol` taint and is marked `source: "host-intl", normative: false`.
  27: The implementation intentionally preserves the project's spaghetti constrai ... [+120 chars] ... remains available behind the detour. No calendar-adapter rewrite was performed.
  29: The critical dependency direction is therefore:
  36: There is no route from a tainted host witness back into normative Chinese output.
  44: A failure of `Intl` must not break a normative calendar representation. A m ... [+104 chars] ... I is allowed to throw when ICU does not support the requested calendar or date.
  46: Machine-readable audit material is in `artifacts/intl-icu-dependency-matrix. ... [+25 chars] ... tation-matrix.json`, and `artifacts/update-13-intl-host-static-inventory.json`.
  ... 2 more match(es) omitted in this file
SUPPLY-CHAIN-SECURITY.md (33 match(es)):
  3: This document describes the repository's build trust boundaries and the chec ... [+132 chars] ...  clean vulnerability scan does not make a mutable build reference reproducible.
  31: Dependabot is configured weekly for both `npm` and `github-actions`. No auto-merge policy is configured.
  38: permissions:
  48: `package-lock.json` is the installation resolution. CI installs with `npm ci`; the semver intent in `package.json` does not replace the lockfile.
  56: - no unexpected non-registry resolved package URLs;
  66: No separate hand-maintained checksum list is used for npm tarballs: npm's lockfile integrity metadata is the appropriate mechanism for that layer.
  76: rather than through `npx`. This removes the `npx` fallback path that can download and execute a package not already installed locally.
  86: - npm package retrieval from the npm registry when packages are not already cached;
  98: The repository now has a manual `release-verification.yml` workflow, but it ... [+498 chars] ... rovenance, SLSA, SBOM generation, and artifact attestations are not added here.
  112: - `npx` is absent from CI and package scripts;
  115: - the lockfile exists, matches direct dependency metadata, and retains registry integrity fields;
  122: ## What this policy does not prove
  ... 21 more match(es) omitted in this file
about/content/en.html (111 match(es)):
  1: <!-- English explanation translated from the Hebrew semantic master. -->
  38: <p>Two ideas need to be kept separate. <strong>Day identity</strong> is a da ... [+84 chars] ... lt obtained when that same day is viewed under a particular day of working.</p>
  80: <p>Cutlet boundaries are gates, and a cutlet is at least</p>
  125: <p>A civil week system can of course be overlaid from outside. It simply is not part of the Pastafari date.</p>
  161: <p>Older versions that fed the raw sum into that update do not describe the ... [+18 chars] ... le derived from the old rule is obsolete unless it has been verified again.</p>
  219: <p>Finally, the 86,016 year structures are not 86,016 wholly independent sa ... [+89 chars] ... he same year interval while still producing a different internal structure.</p>
  245: <li>“the end of the month” is its final occurrence;</li>
  279: <p>Everything can also be calculated by hand. The specification is determi ... [+172 chars] ... ets, perform the combinatorial choices, select names, and weave the months.</p>
  302: <p>Optimization is not an alternative source of authority.</p>
  326: <p>The re-delivery event itself is a fixed historical event. On the site,  ... [+144 chars] ... tinues to receive the date appropriate to the day on which the reader asks.</p>
  376: <p>The sauce looks like a very aggressive mixer, but algebraic research fou ... [+74 chars] ... s research derived from the specification, not an additional calendar rule.</p>
  392: <p>In the end, that is all a calendar needs to do.</p>
  ... 99 more match(es) omitted in this file
calendar-converters.js (50 match(es)):
  49: definition("islamic-civil", "calendarInput.islamicCivil"),
  85: Object.freeze({ value: "heisei", labelKey: "era.heisei" }),
  230: function isHebrewLeapYear(year) {
  283: function isIslamicCivilLeapYear(year) {
  344: if (!Number.isSafeInteger(year) || year < -271_000 || year > 275_000) {
  372: throw new RangeError("The entered date does not exist in the selected calendar, or is outside this browser's supported range.");
  417: if (!Number.isSafeInteger(numericYear)) throw new RangeError("The Hindu year is outside the supported range.");
  450: if (day > monthLength) throw new RangeError("The day is outside the selected month.");
  472: if (value < start || (end !== null && value > end)) throw new RangeError("The date is outside the selected Japanese era.");
  663: if (day > monthLength) throw new RangeError("The day is outside the selected Baha'i month.");
  707: if (calendarId === "thai-buddhist") {
  734: throw new RangeError("The Baha'i month is invalid.");
  ... 38 more match(es) omitted in this file
about/content/id.html (76 match(es)):
  1: <!-- Versi bahasa Indonesia ditulis langsung dari dasar semantik Ibrani, tanpa bahasa perantara. -->
  36: <p>Labelnya boleh berubah. Peristiwanya tidak.</p><hr>
  79: <p>Namun bulan Pastafari <strong>tidak harus berupa rentang waktu yang berkesinambungan</strong>. Misalnya urutan kronologis dapat berbentuk:</p>
  100: <p>Begitu pula “akhir bulan” tidak berarti akhirnya dekat secara kronologis ... [+46 chars] ... sementara hari 120-nya berada jauh lebih kemudian pada tahun yang sama.</p><hr>
  134: <p>Pada 12 pengadukan akhir ada satu detail kanonis yang sangat penting. Ji ... [+15 chars] ...  mangkuk lama dan <code>r</code> adalah nomor pengadukan, sistem menghitung</p>
  152: <p>Atlas dibangun dengan commit engine <code>8e155fa4198ea7bcfeb16138ac5d6 ... [+216 chars] ... si dari hari <code>n</code> ke hari <code>n+1</code> dalam bulan yang sama.</p>
  196: <li>Untuk <code>(nama kotlet, hari dalam kotlet)</code>, median adalah 3 ta ... [+54 chars] ... ng sangat berat dan maksimum yang diamati mencapai 51,954 tahun Pastafari.</li>
  216: <p>Peristiwa dan label lokal yang ditampilkan untuknya bukan hal yang sama ... [+184 chars] ... ang sama dapat berubah karena definisi “hari lokal” bergantung pada lokasi.</p>
  239: <p>Dalam verifikasi langsung yang dilakukan saat menyunting halaman ini, S ... [+261 chars] ... li dan paket distribusi, serta penerapan kontainer yang telah diverifikasi.</p>
  255: <p>Penomoran hari di sekitarnya memakai bilangan positif ganjil/genap: Hari ... [+96 chars] ... sisi tambatan dapat dikodekan tanpa nomor hari negatif pada penghitung ini.</p>
  314: <section class="about-section" id="sauce-history" data-toc-section data-toc-level="2">
  329: <p>Hari <code>n+1</code> suatu bulan tidak harus besok. Hari kronologis ya ... [+225 chars] ... unan pertama-tama adalah masalah pencarian, baru kemudian masalah kalender.</p>
  ... 64 more match(es) omitted in this file
index.html (33 match(es)):
  7: <meta name="description" content="A local, deterministic Pastafari calendar." data-i18n-attr="content:meta.description">
  58: <p data-i18n="settings.intro">The day of working is the calculation's point of departure.</p>
  77: <span><strong data-i18n="comparison.toggle">Compare two calculations side by side</strong><small data-i18n="comparison.toggleHelp">Available on desktop.</small></span>
  82: <select id="comparison-calendar" name="calendar"></select>
  86: <p class="form-error" id="comparison-form-error" role="alert" hidden></p>
  133: <p class="browse-note" id="browse-note" hidden data-i18n="calendar.targetOutside">The searched date is not in the cutlet currently on screen.</p>
  161: <ol class="structure-list month-structure-list" id="year-month-list" tabindex="0" aria-labelledby="year-months-summary"></ol>
  171: <h2 id="comparison-heading" data-i18n="comparison.heading">The same days, two days of working</h2>
  175: <div class="comparison-scroll" role="region" tabindex="0" data-i18n-attr="aria-label:comparison.scrollAria">
  180: <th scope="col" id="comparison-primary-heading">First calculation</th>
  187: <p class="mobile-comparison-note" data-i18n="comparison.desktopOnly">The full comparison table is available on a wide desktop screen.</p>
  199: .app-shell { display: none !important; }
  ... 21 more match(es) omitted in this file
about/content/ht.html (67 match(es)):
  1: <!-- Vèsyon kreyòl ayisyen an ekri dirèkteman apati semantic master ebre a; pa gen lang pivot ki sèvi. -->
  59: <p>Kidonk yon ane ka pi kout pase yon ane solè oswa pi long pase kenz ane so ... [+6 chars] ... i sistèm <strong>pòt</strong> yo; limit koutlèt yo soti nan menm sistèm nan.</p>
  91: <li>Mwa a montre manm nan yon fil estriktirèl ki ka disparèt epi parèt ankò pita.</li>
  111: <p>Gen 17 non kanonik koutlèt ak 47 non kanonik mwa. Nan yon ane, chak non parèt pi plis yon sèl fwa nan pwòp gwoup li.</p>
  144: <p>Wide Choice pa menm bagay ak pwodwi chif baz <code>Q</code> ki endepand ... [+104 chars] ... Nan space ki ase gwo, kapab gen chwa valab mekanis sa a pa janm rive jwenn.</p>
  183: <p>Anplis, 86,016 estrikti ane yo pa 86,016 echantiyon totalman endepandan: ... [+75 chars] ... t ka chwazi menm entèval ane la epi toujou pwodui diferan estrikti andedan.</p>
  206: <li>“fen mwa a” se dènye aparisyon mwa sa a;</li>
  230: <p>Paske spesifikasyon la konplè epi detèminis, nou ka kalkile tout bagay  ... [+138 chars] ... ane ak koutlèt yo, fè seleksyon konbinatwa, chwazi non yo, epi tise mwa yo.</p>
  252: <p>Sistèm nan gen yon jou referans ki fiks yo rele <strong>Jou Fondasyon an ... [+9 chars] ... goryen pwoleptik la, se <strong>22 desanm 41,222 anvan epòk nou an</strong>.</p>
  295: <p>Si nou pa konnen jou aksyon an, sitiyasyon an diferan. Menm senk valè yo ... [+26 chars] ... t example kote menm dat konplè a parèt a diferan distans de <code>c</code>.</p>
  316: <p>Nan etap vizib 3–46 yo, sou branch asenptotik ki konsène a, enjektivite  ... [+21 chars] ... onsève ase enfòmasyon pou rekonstwi istwa antre ki konsène a ak lòd bòl yo.</p>
  330: <p>Finalman, yon kalandriye pa bezwen fè plis pase sa.</p>
  ... 55 more match(es) omitted in this file
EXTREME-PERFORMANCE-ANALYSIS.md (41 match(es)):
  20: כל 11 מקרי ה-performance timeout ההיסטוריים אותרו במדויק. כולם חוצים אותה נ ... [+237 chars] ... ies נוצר LRU thrashing, ולכן אותו רצף `gateDistance()`/`sauce()` חושב שוב ושוב.
  52: | ID | Before | Cold after median (n=2) | Warm after median | Static checkpoint distance | Years traversed | Result-cache warm hit | Speedup lower bound |
  74: | EXT-003 | C + D + E | calculation-state gate location / initialization | distance=5,315 > LRU 4096; target year=5000; years traversed=0; after-fix gateDistance misses=5,328 |
  78: | EXT-007 | C + D + E | calculation-state gate location / initialization | distance=4,861 > LRU 4096; target year=5000; years traversed=0; after-fix gateDistance misses=4,873 |
  82: | EXT-011 | C + D + E | calculation-state gate location / initialization | distance=5,666 > LRU 4096; target year=5000; years traversed=0; after-fix gateDistance misses=5,677 |
  106: ה-cliff מופיע סביב גודל ה-LRU, 4,096 entries. לפניו חלק גדול מקריאות `gateDistance` החוזרות עדיין פוגע ב-cache; אחריו הסריקה החוזרת דוחקת את הערכים שנחוצים לסריקה הבאה.
  132: לאחר ה-cursor, ב-EXT-004: `sauce` 43.62%, `positiveMod` 24.79%, `keep` 7.26 ... [+85 chars] ... rhead של ה-LRU חדל להיות hot path; הזמן הנותר הוא בעיקר העבודה המתמטית האמיתית.
  166: | EXT-001 | >600 s (timeout) | 7.425 s | >80.8× | 5,779 gateDistance misses |
  170: | EXT-005 | >600 s (timeout) | 4.271 s | >140.5× | 5,054 gateDistance misses |
  174: | EXT-009 | >600 s (timeout) | 8.877 s | >67.6× | 5,103 gateDistance misses |
  178: במקרה המייצג של ה-path הישן נמדדו >8,395,657 `gateDistance` calls עוד לפני  ... [+14 chars] ...  לאחר השינוי. לכן עיקר ההוכחה הוא צמצום העבודה האלגוריתמית, לא noise של runner.
  278: * 0/11: הוכחו כ-timeout שנובע בעיקר מ-year-distance מובנה (A).
  ... 29 more match(es) omitted in this file
about/content/ro.html (48 match(es)):
  4: <p>În narațiunea site-ului, Calendarul Pastafarian este prezentat drept calendarul în care a fost creat timpul însuși. Mecanica lui, însă, este definită precis.</p>
  51: <p>de zile. Acestea sunt limite canonice ale sistemului, nu medii empirice.</p>
  80: <p>O lună poate traversa mai multe șnițele, iar un șnițel poate conține apar ... [+7 chars] ... nceputurile și sfârșiturile acestor două sisteme nu trebuie să coincidă.</p><hr>
  95: <p>Există 17 nume canonice de șnițele și 47 de nume canonice de luni. Într-un an, fiecare nume apare cel mult o dată în familia sa.</p>
  126: <p>Wide Choice nu este echivalentă cu generarea unor cifre independente și ... [+151 chars] ... cient de mari pot exista opțiuni legale la care mecanismul nu ajunge deloc.</p>
  149: <p>Atlasul descrie bine comportamentul măsurat al implementării, dar nu tre ... [+6 chars] ... oremă probabilistică despre toate structurile posibile ale calendarului.</p><hr>
  187: <p>Pe lângă implementarea canonică există un motor rapid numit <strong>Past ... [+64 chars] ... lul canonic stabilesc data corectă. Dacă Seer le contrazice, Seer greșește.</p>
  193: <p>Seer poate folosi precalcul, reprezentări speciale, SIMD, algebră și alt ... [+87 chars] ... a vreme cât execută aceeași operație semantică și întoarce același răspuns.</p>
  214: <p>Evenimentul retransmiterii în sine este un eveniment istoric fix. <stron ... [+52 chars] ...  de lucru curentă decât înghețată pentru totdeauna într-o singură dată.</p><hr>
  243: <p>Iar întrebarea dacă panta asimptotică finală diferă cu adevărat între zile de lucru diferite rămâne deschisă.</p><hr>
  251: <p>Rămâne deschis dacă <strong>doar cele șase boluri finale</strong> sunt întotdeauna suficiente în sens generic.</p>
  261: <p>Dar când ziua de lucru și ziua interogată sunt cunoscute, nu există ambiguitate: există un singur răspuns exact.</p>
  ... 36 more match(es) omitted in this file
[omitted 8306 match(es) in 172 file(s)]
[extensions: .js=92, .html=74, .md=14, .webmanifest=1, [no extension]=1]
```

</details>


---

<sub>25s</sub>

### Copilot

Skráin fyrir staðlaðar útgáfur tilgreinir rétta íslensku-eininguna, og útgáfu SHA vefgeymslunnar ber saman við staðbundna HEAD. Nú ber ég saman íslensku textana við viðmótssamninginn og skoða skjöl og fasta heiti í hinni frystu geymslu.

---

<sub>25s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js (lines 251-380)

<details>
<summary>100 lines</summary>

```
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
```

</details>


---

<sub>25s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html (lines 209-380)

<details>
<summary>110 lines</summary>

```
  </ul>
  <p>Fyrir sérstaklega mikilvægan fund má einnig vista fastan dag á tímalínunni eða nákvæman tímapunkt. Dagatalið móðgast ekki.</p><hr>
</section>

<section class="about-section" id="travel-and-all-day" data-toc-section data-toc-level="2">
  <h2>Ferðalög og heilsdagsatburðir</h2>
  <p>Atburðurinn og staðbundna merkið sem honum er sýnt eru ekki sami hluturinn. Atburður með ákveðinni klukkustund ætti að vera bundinn við fastan tímapunkt. Ferðalag færir hann ekki í tíma, en staðbundin Pastafari-dagsetning sama raunverulega augnabliks getur breyst, því skilgreiningin á „staðbundnum degi“ ræðst af staðsetningu.</p>
  <p>Við <strong>heilsdagsatburð</strong> er munurinn enn meiri. Borgaralegur heilsdagsatburður gengur venjulega frá miðnætti til næsta miðnættis; Pastafari-heilsdagsatburður ætti að ganga frá staðbundnum mörkum Pastafari-dags til næstu marka. Yfirleitt eru þetta ekki sömu augnablik.</p>
  <p>Að flytja Pastafari-atburð út sem borgaralegan heilsdagsatburð án þess að aðlaga tímamörkin getur því breytt merkingu hans. Til að varðveita merkinguna rétt þarf að vista fast tímatengt auðkenni og viðeigandi samhengi staðsetningar og dagamarka, ekki aðeins <code>all-day</code>-merkinguna.</p><hr>
</section>

<section class="about-section" id="day-boundary" data-toc-section data-toc-level="2">
  <h2>Hvar liggja dagamörkin?</h2>
  <p>Staðbundni Pastafari-dagurinn hefst ekki á miðnætti. Mörk hans ráðast af <strong>tímapunktinum þegar miðja Venusar, séð frá stað athugandans, fer um neðri hluta staðbundna hádegisbaugsins</strong>.</p>
  <p>Þetta er staðbundinn stjarnfræðilegur atburður sem ræðst af staðsetningu. Þessi atburður á sér ekki endilega stað kl. 00:00. Borgaralegt tímabelti ákvarðar hann ekki, hann færist ekki einfaldlega vegna þess að sumartími byrjar eða endar og Venus þarf ekki að vera sýnileg berum augum.</p>
  <p>Sama raunverulega augnablik getur á tveimur stöðum verið sitthvorum megin við staðbundin dagamörk. Ef kerfið hefur enga nothæfa staðsetningu notanda er sjálfgefna varastaðsetning vörunnar <strong>Kisurra</strong>.</p><hr>
</section>

<section class="about-section" id="printed-calendar" data-toc-section data-toc-level="2">
  <h2>Prentað dagatal og handútreikningur</h2>
  <p>Það má prenta Pastafari-dagatalið; aðeins þarf að taka fram fyrir hvaða aðgerðardag það var reiknað. Slíkt dagatal sýnir byggingu tímans frá sjónarhorni þess dags; ef aðgerðardagurinn breytist getur þurft nýtt dagatal. Prentarinn hefur því enn starf.</p>
  <p>Þar sem forskriftin er fullkomin og kerfið determinískt má einnig reikna allt með höndunum: reiknið inntaksteljarana, farið í gegnum 7 falda og 46 sýnilega dropa, uppfærið skálarnar sex, framkvæmið 12 lokablöndurnar, myndið svörin, byggið hliðin, veljið ár og kótelettur, framkvæmið samsetningarval, veljið nöfnin og fléttið síðan mánuðina.</p>
  <p>Í staðinn þarf enginn að muna hvenær febrúar hefur 28 daga og hvenær 29.</p><hr>
</section>

<section class="about-section" id="seer" data-toc-section data-toc-level="2">
  <h2>Hvað er Seer þá?</h2>
  <p>Við hlið kanónísku útfærslunnar er hröð reiknivél sem heitir <strong>Pastafarian Calendar Seer</strong>. Seer er ekki uppspretta valds: rétta dagsetningin ræðst af Megillah og kanóníska útreikningnum. Ef Seer er ósammála þeim er villan í Seer.</p>
  <p>Hlutverk hans er að keyra sömu fyrirspurnir hratt og skila niðurstöðu á formi sem auðvelt er að samþætta við vörur.</p>
  <p>Í beinni sannprófun við ritun þessarar síðu náði Seer meðal annars yfir <code>date</code>- og <code>now</code>-fyrirspurnir, <code>batch</code>, dagabil, öfuga umbreytingu frá Pastafari-dagsetningu til fyrirspurnardags, öflun ársuppbyggingar, ákvörðun virks aðgerðardags, Node API, vafra-/HTTP-biðlara, CLI, HTTP v1-þjónustu, OpenAPI 3.1-samning, innfæddar útfærslur og dreifingarpakka, auk staðfestrar gámaútsetningar.</p>
  <p>Gamla fullyrðingin um að Seer hafi ekkert opinbert API er ekki lengur rétt. Nú er til skýr og stöðugur HTTP v1-samningur með endapunktum fyrir <code>date</code>, <code>range</code>, <code>batch</code>, <code>year</code>, <code>reverse</code>, aðgerðardag, <code>metadata</code>, <code>locales</code> og <code>status</code>.</p>
  <p>21. september 2026 var opinber HTTPS-útsetning á Render prófuð í raun: á virku þjónustunni voru staðfestar nákvæmar fyrirspurnir, stórt dagabil, endurræsing, vöknun eftir dvala og hegðun undir álagi.</p>
  <p>Verkefnisskjölin greina þó enn á milli opinberrar beta-/matsútsetningar og varanlegrar hýstrar framleiðsluþjónustu með SLA. Þess vegna ætti hugtaksskýringarsíða ekki að festa netfang netþjóns, hýsingaraðila eða útgáfunúmer eins og það væri hluti af dagatalinu sjálfu.</p>
  <p>Seer má nota forútreikning, sérstaka framsetningu, SIMD, algebru og aðrar styttingar. Hann þarf ekki að líkja eftir allri reiknisögu kanónísku útfærslunnar skref fyrir skref svo lengi sem hann framkvæmir sömu merkingarlegu aðgerð og skilar sama svari.</p>
  <p>Hagræðing veitir ekki sjálfstætt merkingarvald.</p><hr>
</section>

<section class="about-section" id="foundation-and-tablets" data-toc-section data-toc-level="2">
  <h2>Uppruni, Stofndagur og Dagur taflnanna</h2>
  <p>Hér er sérstaklega mikilvægt að aðgreina kanónískar tímafestur skýrt frá frásögn vefsins.</p>

  <section class="about-subsection" id="anchors" data-toc-section data-toc-level="3">
    <h3>Festipunktar</h3>
    <p>Kerfið hefur einn fastan viðmiðunardag sem kallast <strong>Stofndagur</strong>. Í proleptíska gregoríska dagatalinu er hann <strong>22. desember 41.222 f.Kr.</strong>.</p>
    <p>Stofndagur er ekki „upphaf tímans“; hann er reiknifestipunktur.</p>
    <p>Tölusetning daga kringum hann notar jákvæðar oddatölur og sléttar tölur: Stofndagur=1; síðari dagar=3, 5, …; aftur í fortíðina er fyrri dagurinn=2, síðan 4, 6, … . Þannig eru báðar hliðar festipunktsins kóðaðar í þessum teljara án neikvæðra dagnúmera.</p>
    <p>Seinni festipunkturinn er <strong>Dagur taflnanna</strong>: <strong>15. júní 763 f.Kr. í proleptíska júlíanska dagatalinu</strong>, það er <strong>7. júní 763 f.Kr. í proleptíska gregoríska dagatalinu</strong>.</p>
    <p>Nákvæm fjarlægð frá Stofndegi að Degi taflnanna er</p>
    <pre class="math-block" dir="ltr" tabindex="0"><code>14{,}777{,}149</code></pre>
    <p>dagar.</p>
    <p>Þetta eru fastir festipunktar á tímalínunni, en Pastafari-dagsetningin sem þeim er sýnd ræðst samt af aðgerðardeginum sem spurt er frá.</p>
  </section>

  <section class="about-subsection" id="site-story" data-toc-section data-toc-level="3">
    <h3>Frásögn vefsins</h3>
    <p>Í ritstjórnarfrásögn vefsins er dagatalinu lýst sem hluta sköpunarinnar og sem kerfi sem mannkynið notaði án þess að skilja það að fullu, þar til því var komið aftur á framfæri á nútímaöld.</p>
    <p>Þetta er frásögn vefsins; ekki ætti að setja hvert smáatriði frásagnarinnar fram eins og það væri bein tæknileg fullyrðing úr Megillah.</p>
    <p>Atburðurinn þegar kerfið var afhent aftur er sjálfur fastur sögulegur atburður. Betra er að sýna <strong>Pastafari-dagsetningu</strong> hans kviklega undir núverandi aðgerðardegi en festa hana að eilífu sem eina dagsetningu.</p><hr>
  </section>
</section>

<section class="about-section" id="reverse-conversion" data-toc-section data-toc-level="2">
  <h2>Fyrir lengra komna: öfug umbreyting</h2>
  <p>Ef aðgerðardagurinn <code>c</code> er þekktur er öfug umbreyting mjög stranglega takmörkuð. Innan þekkts Pastafari-árs auðkennir</p>
  <pre class="math-block" dir="ltr" tabindex="0"><code>(\text{kótelettunafn},\text{dagur í kótelettu})</code></pre>
  <p>í mesta lagi einn dag. Sama gildir um</p>
  <pre class="math-block" dir="ltr" tabindex="0"><code>(\text{mánaðarnafn},\text{dagur í mánuði})</code></pre>
  <p>Full dagsetning með þekktum aðgerðardegi auðkennir því fyrirspurnardag ótvírætt.</p>

  <div class="about-table-scroll" role="region" tabindex="0" aria-label="Efri mörk á fjölda mögulegra daga í öfugri umbreytingu">
    <table class="about-table">
      <thead><tr><th scope="col">Aðrar þekktar upplýsingar</th><th scope="col">Hámarksfjöldi mögulegra daga</th></tr></thead>
      <tbody>
        <tr><td>Enginn reitur þekktur nema árið</td><td>5.778</td></tr>
        <tr><td>Aðeins kótelettunafnið</td><td>5.568</td></tr>
        <tr><td>Aðeins dagur í kótelettu</td><td>17</td></tr>
        <tr><td>Aðeins mánaðarnafnið</td><td>123</td></tr>
        <tr><td>Aðeins dagur í mánuði</td><td>47</td></tr>
        <tr><td>Kótelettunafn + dagur í kótelettu</td><td>1</td></tr>
        <tr><td>Mánaðarnafn + dagur í mánuði</td><td>1</td></tr>
        <tr><td>Hvaða þrír reitir sem er nema árið</td><td>1</td></tr>
        <tr><td>Allir fjórir reitir nema árið</td><td>1</td></tr>
      </tbody>
    </table>
  </div>

  <p>Ef aðgerðardagurinn er óþekktur er staðan önnur. Sömu fimm gildi geta birst undir mismunandi aðgerðardögum og til eru nákvæm dæmi þar sem sama fulla dagsetning kemur fram í mismunandi fjarlægð frá <code>c</code>.</p>
  <p>Í ári 5000 er jafnvel formerki þessarar fjarlægðar ekki alltaf ákvarðað af fimm gildunum: sama fulla dagsetning getur í einu samhengi verið fyrir aðgerðardaginn en í öðru eftir hann.</p>
  <p>Full Pastafari-dagsetning er því ekki algilt vistfang á tímalínunni ef ekki er vitað undir hvaða <code>c</code> hún var reiknuð.</p>

  <section class="about-subsection" id="far-time-structure" data-toc-section data-toc-level="3">
    <h3>Bygging mjög fjarlægs tíma</h3>
    <p>Stærðfræðirannsóknir sem byggja á forskriftinni hafa einnig leitt í ljós nákvæma asymptótíska uppbyggingu. Fyrir <strong>fastan aðgerðardag</strong> <code>c</code> birtist affín lotubundni nógu langt út í hala fortíðarinnar.</p>
    <p>Ef</p>
    <pre class="math-block" dir="ltr" tabindex="0"><code>F(c,t)=(Y,K,d_K,M,d_M)</code></pre>
    <p>þá eru til fyrir sama <code>c</code> hliðrun <code>H_c</code>, ársbreytingu <code>p_c</code> og þröskuld <code>T_c</code> þannig að, fyrir öll nægilega gömul <code>t</code>,</p>
    <pre class="math-block" dir="ltr" tabindex="0"><code>F(c,t-H_c)= (Y-p_c,\ K,\ d_K,\ M,\ d_M)</code></pre>
    <p>hinir fjórir reitirnir endurtaka sig en árnúmerið breytist um fasta stærð.</p>
    <p>Þetta er niðurstaða fyrir fast <code>c</code>; af henni leiðir ekki alþjóðlega sambandið</p>
    <pre class="math-block" dir="ltr" tabindex="0"><code>F(c+T,t+T)=F(c,t)</code></pre>
    <p>Spurningin hvort endanlegar asymptótískar hallatölur séu raunverulega ólíkar milli mismunandi aðgerðardaga er enn opin.</p><hr>
  </section>
</section>

<section class="about-section" id="sauce-history" data-toc-section data-toc-level="2">
  <h2>Fyrir lengra komna: hversu mikla sögu varðveitir sósan?</h2>
  <p>Sósan lítur út eins og mjög árásargjarnt blöndunarkerfi, en algebruleg rannsókn sýnir að hún varðveitir miklu meiri upplýsingar en útlitið gefur til kynna. Þetta er rannsóknarniðurstaða sem dregin er af forskriftinni, ekki ný dagatalsregla.</p>
  <p>Í sýnilegu þrepunum 3–46, á viðeigandi asymptótískri grein, hefur almenn eintækni verið staðfest: í almennu tilviki varðveitir ástandið nægar upplýsingar til að endurgera viðeigandi inntakssögu og skálaröðina.</p>
  <p>Upplýsingarnar hverfa heldur ekki samstundis í 12 lokablöndunum. Fyrir fyrstu fimm blöndurnar eftir 46. sýnilega dropann hefur almennur andhverfanleiki verið staðfestur á viðeigandi kanónísku sammengi án viðbótarupplýsinga; fyrir blöndurnar sem eftir eru þekkjast sterk uppbyggileg efri mörk á því magni viðbótarupplýsinga sem nægir fyrir endurbyggingu.</p>
  <p>Spurningin hvort <strong>aðeins síðustu sex skálarnar</strong> séu alltaf nægjanlegar í almennum skilningi er enn opin.</p>
  <p>Sumar niðurstöður voru sannaðar táknrænt, aðrar lokaðar með endanlegum nákvæmum reikniprófunum. Táknræn styrking minnkaði reiknikjarnann sem þarf að treysta verulega, en eyddi honum ekki alveg.</p>
  <p>Rúm sem virtust í fyrstu krefjast leitar yfir gífurlegan fjölda leiða voru minnkuð niður í miklu minni endanlegar gerðir, þar á meðal sjálfvirk kerfi með 180 og 9 ástandum og samhverfur sex skálanna.</p>
  <p>Undir blönduninni liggur ströng algebruleg uppbygging. Það þarf ekki að þekkja hana til að vita dagsetningu dagsins í dag.</p><hr>
</section>

<section class="about-section" id="summary" data-toc-section data-toc-level="2">
  <h2>Hvað er Pastafari-dagatalið þá í raun?</h2>
  <p>Það er determinískt dagatal þar sem dagsetningin er ekki bara fall af fyrirspurnardegi heldur <strong>sameiginlegt fall aðgerðardagsins og fyrirspurnardagsins</strong>.</p>
  <p>Hver dagsetning hefur nákvæmlega fimm reiti. Núið er frá sínu eigin sjónarhorni alltaf í ári 5000, en ár 5000 sjálft færist með aðgerðardeginum. Ár geta verið mjög löng, kótelettur eru samfelldar, mánuðir ekki endilega, og ekkert kanónískt vikukerfi er til.</p>
  <p>Dagur <code>n+1</code> í mánuði þarf ekki að vera á morgun. Sami dagur á tímalínunni getur fengið annað Pastafari-merki á morgun. Sama raunverulega augnablik getur á tveimur stöðum tilheyrt tveimur mismunandi staðbundnum Pastafari-dögum. Heilsdagsatburður þarf ekki að standa frá miðnætti til miðnættis. Og árlegur afmælisdagur er fyrst leitarvandamál og síðan dagatalsvandamál.</p>
  <p>En ef aðgerðardagurinn og fyrirspurnardagurinn eru þekktir er engin tvíræðni: rétt svar er aðeins eitt.</p>
  <p>Þegar allt kemur til alls þarf dagatal ekki að gera meira en þetta.</p>
</section>
```

</details>


---

<sub>25s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/index.html.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/index.html (lines 1-240)

```
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#672013">
    <meta name="description" content="A local, deterministic Pastafari calendar." data-i18n-attr="content:meta.description">
    <meta name="color-scheme" content="light">
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; base-uri 'none'; object-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; worker-src 'self'; manifest-src 'self'">
    <title data-i18n="app.title">Pastafari Calendar</title>
    <link rel="manifest" href="./manifest.webmanifest?v=9-canonical-names">
    <link rel="icon" href="./icons/icon.svg?v=9-canonical-names" type="image/svg+xml">
    <link rel="apple-touch-icon" href="./icons/icon-192.png">
    <link rel="stylesheet" href="./styles.css?v=16-about-polish">
    <script type="module" src="./app.js?v=24-about-i18n"></script>
  </head>
  <body>
    <a class="skip-link" href="#search-heading" data-i18n="nav.skip">Skip to date search</a>
    <div class="app-shell">
      <header class="masthead">
        <div class="masthead-copy">
          <p class="eyebrow" data-i18n="app.brand">PASTAFARI</p>
          <h1 data-i18n="app.title">Pastafari Calendar</h1>
          <p class="intro" data-i18n="app.intro">Find a day in any available calendar, then see its complete Pastafari date.</p>
          <a class="guide-link" href="./about/" data-about-link data-i18n="about.open">About the calendar</a>
        </div>
        <div class="language-control">
          <label for="language-selector" data-i18n="language.label">Language</label>
          <select id="language-selector" autocomplete="off"></select>
        </div>
      </header>

      <a class="floating-guide-link" href="./about/" data-about-link data-i18n="about.openShort">About the calendar</a>

      <main>
      <section class="search-panel" id="search-panel" aria-labelledby="search-heading">
        <div class="section-heading">
          <p class="status-kicker" data-i18n="search.kicker">Date search</p>
          <h2 id="search-heading" tabindex="-1" data-i18n="search.heading">Which day would you like to find?</h2>
          <p data-i18n="search.intro">Choose a calendar, enter a date, and select “Show date.”</p>
        </div>
        <form id="target-search-form" class="date-entry-form" novalidate>
          <label class="calendar-picker">
            <span data-i18n="search.calendarLabel">Calendar used for input</span>
            <select id="target-calendar" name="calendar"></select>
          </label>
          <div class="date-fields" id="target-date-fields"></div>
          <p class="field-help" id="target-date-help" hidden></p>
          <p class="form-error" id="target-form-error" role="alert" hidden></p>
          <button class="search-submit" type="submit" data-i18n="search.submit">Show date</button>
        </form>

        <details class="advanced-settings" id="calculation-settings">
          <summary data-i18n="settings.summary">Calculation and comparison options</summary>
          <div class="settings-content">
            <div class="settings-intro">
              <h3 data-i18n="settings.heading">Change the day of working</h3>
              <p data-i18n="settings.intro">The day of working is the calculation's point of departure.</p>
            </div>
            <form id="action-date-form" class="date-entry-form compact-form" novalidate>
              <label class="calendar-picker">
                <span data-i18n="settings.actionCalendarLabel">Calendar used to enter the day of working</span>
                <select id="action-calendar" name="calendar"></select>
              </label>
              <div class="date-fields" id="action-date-fields"></div>
              <p class="field-help" id="action-date-help" hidden></p>
              <p class="form-error" id="action-form-error" role="alert" hidden></p>
              <div class="form-actions">
                <button class="search-submit" type="submit" data-i18n="settings.apply">Apply day of working</button>
                <button class="secondary-action" type="button" id="reset-action-day" data-i18n="settings.reset">Reset to current Pastafari day</button>
              </div>
            </form>

            <div class="desktop-comparison-settings" id="comparison-settings">
              <label class="toggle-control">
                <input type="checkbox" id="comparison-toggle">
                <span><strong data-i18n="comparison.toggle">Compare two calculations side by side</strong><small data-i18n="comparison.toggleHelp">Available on desktop.</small></span>
              </label>
              <form id="comparison-date-form" class="date-entry-form compact-form" novalidate hidden>
                <label class="calendar-picker">
                  <span data-i18n="comparison.secondActionLabel">Calendar used to enter the second day of working</span>
                  <select id="comparison-calendar" name="calendar"></select>
                </label>
                <div class="date-fields" id="comparison-date-fields"></div>
                <p class="field-help" id="comparison-date-help" hidden></p>
                <p class="form-error" id="comparison-form-error" role="alert" hidden></p>
                <button class="search-submit" type="submit" data-i18n="comparison.apply">Update comparison</button>
              </form>
            </div>
          </div>
        </details>
      </section>

      <section class="reverse-panel" id="reverse-panel" aria-labelledby="reverse-heading">
        <div id="reverse-app"></div>
      </section>

      <section class="status-panel" id="loading-panel" aria-labelledby="loading-heading" aria-live="polite" aria-busy="true">
        <span class="loader" aria-hidden="true"></span>
        <div>
          <p class="status-kicker" data-i18n="loading.kicker">Calculated locally</p>
          <h2 id="loading-heading" data-i18n="loading.title">Finding the cutlet and date…</h2>
        </div>
      </section>

      <section class="status-panel error-panel" id="error-panel" aria-labelledby="error-heading" role="alert" hidden>
        <p class="status-kicker" data-i18n="error.kicker">Unable to display the calendar</p>
        <h2 id="error-heading" data-i18n="error.title">The calculation engine did not load</h2>
        <p id="error-message"></p>
        <button type="button" id="reload-button" data-i18n="error.reload">Reload</button>
      </section>

      <section class="calendar-workspace" id="calendar-workspace" aria-labelledby="cutlet-heading" hidden>
        <article class="target-beacon" id="target-beacon" aria-live="polite">
          <div class="beacon-label" id="target-marker"></div>
          <div class="beacon-date" id="target-date-lines"></div>
          <p class="beacon-context" id="target-context"></p>
        </article>

        <div class="calendar-toolbar">
          <div class="cutlet-identity">
            <p class="status-kicker" id="cutlet-meta"></p>
            <h2 id="cutlet-heading">Calendar</h2>
            <p id="cutlet-description"></p>
          </div>
          <div class="toolbar-actions" role="group" data-i18n-attr="aria-label:calendar.toolbarAria">
            <button type="button" id="previous-cutlet" data-i18n="calendar.previous">Previous cutlet</button>
            <button type="button" class="primary-action" id="today-button" data-i18n="calendar.today">Back to today</button>
            <button type="button" id="next-cutlet" data-i18n="calendar.next">Next cutlet</button>
          </div>
        </div>

        <p class="browse-note" id="browse-note" hidden data-i18n="calendar.targetOutside">The searched date is not in the cutlet currently on screen.</p>
        <div class="calendar-grid" id="calendar-grid" role="group"></div>

        <section class="year-overview" id="year-overview" aria-labelledby="year-overview-heading">
          <div class="year-overview-heading">
            <p class="status-kicker" data-i18n="year.kicker">Year at a glance</p>
            <h2 id="year-overview-heading">Year structure</h2>
            <p id="year-overview-context"></p>
          </div>
          <p class="year-overview-loading" id="year-overview-loading" data-i18n="year.loading">Building the full year structure…</p>
          <p class="year-overview-error" id="year-overview-error" hidden></p>
          <div id="year-overview-content" hidden>
            <dl class="year-facts">
              <div><dt data-i18n="year.lengthLabel">Year length</dt><dd id="year-length"></dd></div>
              <div><dt data-i18n="year.cutletCountLabel">Cutlets</dt><dd id="year-cutlet-count"></dd></div>
              <div><dt data-i18n="year.monthCountLabel">Months</dt><dd id="year-month-count"></dd></div>
              <div><dt data-i18n="year.rangeLabel">Gregorian span</dt><dd id="year-range"></dd></div>
            </dl>
            <p class="year-position" id="year-cutlet-position"></p>
            <p class="year-position" id="year-target-position" hidden></p>
            <p class="year-explainer" data-i18n="year.monthExplainer">Months are woven independently of cutlets, so a month can appear in many separate runs during the year.</p>
            <div class="year-structure-columns">
              <details class="structure-details" open>
                <summary id="year-cutlets-summary">Cutlets</summary>
                <ol class="structure-list" id="year-cutlet-list" tabindex="0" aria-labelledby="year-cutlets-summary"></ol>
              </details>
              <details class="structure-details" open>
                <summary id="year-months-summary">Months</summary>
                <ol class="structure-list month-structure-list" id="year-month-list" tabindex="0" aria-labelledby="year-months-summary"></ol>
              </details>
            </div>
          </div>
        </section>
      </section>

      <section class="comparison-workspace" id="comparison-workspace" aria-labelledby="comparison-heading" hidden>
        <div class="section-heading">
          <p class="status-kicker" data-i18n="comparison.kicker">Comparison aligned by day</p>
          <h2 id="comparison-heading" data-i18n="comparison.heading">The same days, two days of working</h2>
          <p data-i18n="comparison.intro">Every row contains the same queried day.</p>
        </div>
        <div class="comparison-summary" id="comparison-summary"></div>
        <div class="comparison-scroll" role="region" tabindex="0" data-i18n-attr="aria-label:comparison.scrollAria">
          <table class="comparison-table">
            <thead>
              <tr>
                <th scope="col" data-i18n="comparison.sameDay">Day shared by both calculations</th>
                <th scope="col" id="comparison-primary-heading">First calculation</th>
                <th scope="col" id="comparison-secondary-heading">Second calculation</th>
              </tr>
            </thead>
            <tbody id="comparison-body"></tbody>
          </table>
        </div>
        <p class="mobile-comparison-note" data-i18n="comparison.desktopOnly">The full comparison table is available on a wide desktop screen.</p>
      </section>

      </main>

      <footer class="site-footer">
        <p data-i18n="footer.local">Calculation happens on your device; there is no user account or tracking code.</p>
        <p data-i18n="footer.open">The link is public and loads directly, including in private browsing.</p>
      </footer>
    </div>
    <noscript>
      <style>
        .app-shell { display: none !important; }
      </style>
      <div class="noscript" lang="zxx" dir="ltr">
        <p><strong>JavaScript</strong> <span>⚠</span></p>
      </div>
    </noscript>
  </body>
</html>

```


---

<sub>25s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/about.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/about.js

<details>
<summary>170 lines</summary>

```
"use strict";

import {
  loadLocale,
  translate,
} from "../i18n/registry.js?v=20-about-i18n";
import {
  applyDocumentLocale,
  persistLanguage,
  populateLanguageSelector,
  resolveBrowserLocale,
  urlWithLanguage,
} from "../i18n/runtime.js?v=20-about-i18n";
import {
  ARTICLE_FALLBACK_LOCALE,
  resolveArticleLocale,
} from "./content/registry.js?v=5-about-i18n-polish";

const elements = Object.fromEntries(
  [...document.querySelectorAll("[id]")].map((element) => [element.id, element]),
);

let activeLocale = await loadLocale(resolveBrowserLocale().locale.code);
let activeArticleCode = null;

function t(key, values = {}) {
  return translate(activeLocale, key, values);
}

function syncCalendarLinks() {
  for (const link of document.querySelectorAll("[data-back-to-calendar]")) {
    link.href = urlWithLanguage(new URL("../", location.href), activeLocale.code);
  }
}

function applyActiveLocale() {
  applyDocumentLocale(activeLocale);
  populateLanguageSelector(elements["language-selector"], activeLocale.code);
  syncCalendarLinks();
}

async function fetchArticle(articleLocale) {
  const url = new URL(articleLocale.asset, import.meta.url);
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status} while loading ${articleLocale.code}`);
  return response.text();
}

function renderArticle(articleLocale, html) {
  elements["article-content"].innerHTML = html;
  elements["article-content"].lang = articleLocale.lang;
  elements["article-content"].dir = articleLocale.dir;
  activeArticleCode = articleLocale.code;
  updateLanguageNotice(articleLocale.code);
  buildTableOfContents();
  focusHashTarget();
}

async function loadArticleForLocale(localeCode) {
  const requestedArticle = resolveArticleLocale(localeCode);
  if (requestedArticle.code === activeArticleCode && elements["article-content"].childElementCount > 0) {
    updateLanguageNotice(requestedArticle.code);
    buildTableOfContents();
    focusHashTarget();
    return;
  }

  elements["article-content"].setAttribute("aria-busy", "true");
  elements["about-load-error"].hidden = true;

  try {
    let articleLocale = requestedArticle;
    let html;
    try {
      html = await fetchArticle(articleLocale);
    } catch (selectedError) {
      if (articleLocale.code === ARTICLE_FALLBACK_LOCALE) throw selectedError;
      console.warn(`Falling back from article locale ${articleLocale.code} to ${ARTICLE_FALLBACK_LOCALE}.`, selectedError);
      articleLocale = resolveArticleLocale(ARTICLE_FALLBACK_LOCALE);
      html = await fetchArticle(articleLocale);
    }
    renderArticle(articleLocale, html);
  } catch (error) {
    console.error(error);
    elements["article-content"].replaceChildren();
    activeArticleCode = null;
    elements["about-language-notice"].hidden = true;
    elements["about-load-error"].hidden = false;
    elements["about-load-error"].textContent = t("about.loadError");
    elements["about-toc-list"].replaceChildren();
  } finally {
    elements["article-content"].setAttribute("aria-busy", "false");
  }
}

function updateLanguageNotice(articleCode) {
  elements["about-language-notice"].hidden = articleCode === activeLocale.code;
}

function sectionHeading(section) {
  return section.querySelector(":scope > h2, :scope > h3");
}

function buildTableOfContents() {
  const list = elements["about-toc-list"];
  list.replaceChildren();

  const sections = [
    ...elements["article-content"].querySelectorAll("[data-toc-section][id]"),
    elements["site-usage"],
  ];

  for (const section of sections) {
    const heading = sectionHeading(section);
    if (!heading) continue;
    const item = document.createElement("li");
    item.className = `about-toc-level-${section.dataset.tocLevel === "3" ? "3" : "2"}`;
    const link = document.createElement("a");
    link.href = `#${section.id}`;
    link.textContent = heading.textContent.trim();
    if (elements["article-content"].contains(section)) {
      link.lang = elements["article-content"].lang;
      link.dir = elements["article-content"].dir;
    }
    item.append(link);
    list.append(item);
  }
}

function focusHashTarget() {
  const id = decodeURIComponent(location.hash.slice(1));
  if (!id) return;
  const target = document.getElementById(id);
  if (!target) return;
  if (id === "site-usage") elements["site-usage-details"].open = true;
  const containingDetails = target.closest("details");
  if (containingDetails) containingDetails.open = true;
  target.scrollIntoView({ block: "start" });
  if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
  target.focus({ preventScroll: true });
}

function initializeResponsiveDisclosures() {
  if (matchMedia("(max-width: 860px)").matches) elements["about-toc"].open = false;
}

async function chooseLanguage(code) {
  const locale = await loadLocale(code);
  persistLanguage(locale.code);
  const url = urlWithLanguage(location.href, locale.code);
  history.pushState({ pastafariAbout: true }, "", url);
  activeLocale = locale;
  applyActiveLocale();
  await loadArticleForLocale(locale.code);
}

initializeResponsiveDisclosures();
applyActiveLocale();
await loadArticleForLocale(activeLocale.code);

elements["language-selector"].addEventListener("change", (event) => {
  const select = event.currentTarget;
  const requested = select.value;
  select.disabled = true;
  chooseLanguage(requested)
    .catch((error) => {
      console.error(error);
      populateLanguageSelector(select, activeLocale.code);
    })
    .finally(() => { select.disabled = false; });
});

addEventListener("popstate", () => {
  const resolved = resolveBrowserLocale();
  if (resolved.locale.code === activeLocale.code) {
    focusHashTarget();
    return;
  }
  loadLocale(resolved.locale.code)
    .then(async (locale) => {
      activeLocale = locale;
      applyActiveLocale();
      await loadArticleForLocale(locale.code);
    })
    .catch((error) => console.error(error));
});

addEventListener("hashchange", focusHashTarget);

if ("serviceWorker" in navigator) {
  const registerServiceWorker = () => navigator.serviceWorker.register("../sw.js").catch(() => {});
  if (document.readyState === "complete") registerServiceWorker();
  else addEventListener("load", registerServiceWorker, { once: true });
}
```

</details>


---

<sub>25s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/registry.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/registry.js

<details>
<summary>442 lines</summary>

```
"use strict";

export const ARTICLE_FALLBACK_LOCALE = "he";

// Explicit rollout gate: keep false while translated article resources are being added.
// Flip to true only when all registered locales have passed the article-coverage invariant.
export const ARTICLE_ROLLOUT_COMPLETE = true;

export const ARTICLE_LOCALES = Object.freeze({
  "he": Object.freeze({
    code: "he",
    lang: "he-IL",
    dir: "rtl",
    asset: "./content/he.html?v=5-about-i18n-polish",
  }),
  "en": Object.freeze({
    code: "en",
    lang: "en-US",
    dir: "ltr",
    asset: "./content/en.html?v=5-about-i18n-polish",
  }),
  "af": Object.freeze({
    code: "af",
    lang: "af-ZA",
    dir: "ltr",
    asset: "./content/af.html?v=5-about-i18n-polish",
  }),
  "ar": Object.freeze({
    code: "ar",
    lang: "ar",
    dir: "rtl",
    asset: "./content/ar.html?v=5-about-i18n-polish",
  }),
  "az": Object.freeze({
    code: "az",
    lang: "az-AZ",
    dir: "ltr",
    asset: "./content/az.html?v=5-about-i18n-polish",
  }),
  "be": Object.freeze({
    code: "be",
    lang: "be-BY",
    dir: "ltr",
    asset: "./content/be.html?v=5-about-i18n-polish",
  }),
  "bg": Object.freeze({
    code: "bg",
    lang: "bg-BG",
    dir: "ltr",
    asset: "./content/bg.html?v=5-about-i18n-polish",
  }),
  "bn": Object.freeze({
    code: "bn",
    lang: "bn-BD",
    dir: "ltr",
    asset: "./content/bn.html?v=5-about-i18n-polish",
  }),
  "bs": Object.freeze({
    code: "bs",
    lang: "bs-BA",
    dir: "ltr",
    asset: "./content/bs.html?v=5-about-i18n-polish",
  }),
  "ca": Object.freeze({
    code: "ca",
    lang: "ca-ES",
    dir: "ltr",
    asset: "./content/ca.html?v=5-about-i18n-polish",
  }),
  "cs": Object.freeze({
    code: "cs",
    lang: "cs-CZ",
    dir: "ltr",
    asset: "./content/cs.html?v=5-about-i18n-polish",
  }),
  "da": Object.freeze({
    code: "da",
    lang: "da-DK",
    dir: "ltr",
    asset: "./content/da.html?v=5-about-i18n-polish",
  }),
  "de": Object.freeze({
    code: "de",
    lang: "de-DE",
    dir: "ltr",
    asset: "./content/de.html?v=5-about-i18n-polish",
  }),
  "el": Object.freeze({
    code: "el",
    lang: "el-GR",
    dir: "ltr",
    asset: "./content/el.html?v=5-about-i18n-polish",
  }),
  "eo": Object.freeze({
    code: "eo",
    lang: "eo",
    dir: "ltr",
    asset: "./content/eo.html?v=5-about-i18n-polish",
  }),
  "es": Object.freeze({
    code: "es",
    lang: "es-ES",
    dir: "ltr",
    asset: "./content/es.html?v=5-about-i18n-polish",
  }),
  "et": Object.freeze({
    code: "et",
    lang: "et-EE",
    dir: "ltr",
    asset: "./content/et.html?v=5-about-i18n-polish",
  }),
  "fa": Object.freeze({
    code: "fa",
    lang: "fa-IR",
    dir: "rtl",
    asset: "./content/fa.html?v=5-about-i18n-polish",
  }),
  "fi": Object.freeze({
    code: "fi",
    lang: "fi-FI",
    dir: "ltr",
    asset: "./content/fi.html?v=5-about-i18n-polish",
  }),
  "fil": Object.freeze({
    code: "fil",
    lang: "fil-PH",
    dir: "ltr",
    asset: "./content/fil.html?v=5-about-i18n-polish",
  }),
  "fo": Object.freeze({
    code: "fo",
    lang: "fo-FO",
    dir: "ltr",
    asset: "./content/fo.html?v=5-about-i18n-polish",
  }),
  "fr": Object.freeze({
    code: "fr",
    lang: "fr-FR",
    dir: "ltr",
    asset: "./content/fr.html?v=5-about-i18n-polish",
  }),
  "fy": Object.freeze({
    code: "fy",
    lang: "fy-NL",
    dir: "ltr",
    asset: "./content/fy.html?v=5-about-i18n-polish",
  }),
  "gl": Object.freeze({
    code: "gl",
    lang: "gl-ES",
    dir: "ltr",
    asset: "./content/gl.html?v=5-about-i18n-polish",
  }),
  "gu": Object.freeze({
    code: "gu",
    lang: "gu-IN",
    dir: "ltr",
    asset: "./content/gu.html?v=5-about-i18n-polish",
  }),
  "ha": Object.freeze({
    code: "ha",
    lang: "ha-NG",
    dir: "ltr",
    asset: "./content/ha.html?v=5-about-i18n-polish",
  }),
  "hi": Object.freeze({
    code: "hi",
    lang: "hi-IN",
    dir: "ltr",
    asset: "./content/hi.html?v=5-about-i18n-polish",
  }),
  "hr": Object.freeze({
    code: "hr",
    lang: "hr-HR",
    dir: "ltr",
    asset: "./content/hr.html?v=5-about-i18n-polish",
  }),
  "ht": Object.freeze({
    code: "ht",
    lang: "ht-HT",
    dir: "ltr",
    asset: "./content/ht.html?v=5-about-i18n-polish",
  }),
  "hu": Object.freeze({
    code: "hu",
    lang: "hu-HU",
    dir: "ltr",
    asset: "./content/hu.html?v=5-about-i18n-polish",
  }),
  "hy": Object.freeze({
    code: "hy",
    lang: "hy-AM",
    dir: "ltr",
    asset: "./content/hy.html?v=5-about-i18n-polish",
  }),
  "id": Object.freeze({
    code: "id",
    lang: "id-ID",
    dir: "ltr",
    asset: "./content/id.html?v=5-about-i18n-polish",
  }),
  "is": Object.freeze({
    code: "is",
    lang: "is-IS",
    dir: "ltr",
    asset: "./content/is.html?v=5-about-i18n-polish",
  }),
  "it": Object.freeze({
    code: "it",
    lang: "it-IT",
    dir: "ltr",
    asset: "./content/it.html?v=5-about-i18n-polish",
  }),
  "ja": Object.freeze({
    code: "ja",
    lang: "ja-JP",
    dir: "ltr",
    asset: "./content/ja.html?v=5-about-i18n-polish",
  }),
  "jv": Object.freeze({
    code: "jv",
    lang: "jv-ID",
    dir: "ltr",
    asset: "./content/jv.html?v=5-about-i18n-polish",
  }),
  "ka": Object.freeze({
    code: "ka",
    lang: "ka-GE",
    dir: "ltr",
    asset: "./content/ka.html?v=5-about-i18n-polish",
  }),
  "kk": Object.freeze({
    code: "kk",
    lang: "kk-KZ",
    dir: "ltr",
    asset: "./content/kk.html?v=5-about-i18n-polish",
  }),
  "ko": Object.freeze({
    code: "ko",
    lang: "ko-KR",
    dir: "ltr",
    asset: "./content/ko.html?v=5-about-i18n-polish",
  }),
  "lb": Object.freeze({
    code: "lb",
    lang: "lb-LU",
    dir: "ltr",
    asset: "./content/lb.html?v=5-about-i18n-polish",
  }),
  "lt": Object.freeze({
    code: "lt",
    lang: "lt-LT",
    dir: "ltr",
    asset: "./content/lt.html?v=5-about-i18n-polish",
  }),
  "lv": Object.freeze({
    code: "lv",
    lang: "lv-LV",
    dir: "ltr",
    asset: "./content/lv.html?v=5-about-i18n-polish",
  }),
  "mk": Object.freeze({
    code: "mk",
    lang: "mk-MK",
    dir: "ltr",
    asset: "./content/mk.html?v=5-about-i18n-polish",
  }),
  "mr": Object.freeze({
    code: "mr",
    lang: "mr-IN",
    dir: "ltr",
    asset: "./content/mr.html?v=5-about-i18n-polish",
  }),
  "ms": Object.freeze({
    code: "ms",
    lang: "ms-MY",
    dir: "ltr",
    asset: "./content/ms.html?v=5-about-i18n-polish",
  }),
  "nb": Object.freeze({
    code: "nb",
    lang: "nb-NO",
    dir: "ltr",
    asset: "./content/nb.html?v=5-about-i18n-polish",
  }),
  "ne": Object.freeze({
    code: "ne",
    lang: "ne-NP",
    dir: "ltr",
    asset: "./content/ne.html?v=5-about-i18n-polish",
  }),
  "nl": Object.freeze({
    code: "nl",
    lang: "nl-NL",
    dir: "ltr",
    asset: "./content/nl.html?v=5-about-i18n-polish",
  }),
  "nn": Object.freeze({
    code: "nn",
    lang: "nn-NO",
    dir: "ltr",
    asset: "./content/nn.html?v=5-about-i18n-polish",
  }),
  "pa": Object.freeze({
    code: "pa",
    lang: "pa-IN",
    dir: "ltr",
    asset: "./content/pa.html?v=5-about-i18n-polish",
  }),
  "pl": Object.freeze({
    code: "pl",
    lang: "pl-PL",
    dir: "ltr",
    asset: "./content/pl.html?v=5-about-i18n-polish",
  }),
  "pt": Object.freeze({
    code: "pt",
    lang: "pt-BR",
    dir: "ltr",
    asset: "./content/pt.html?v=5-about-i18n-polish",
  }),
  "ro": Object.freeze({
    code: "ro",
    lang: "ro-RO",
    dir: "ltr",
    asset: "./content/ro.html?v=5-about-i18n-polish",
  }),
  "ru": Object.freeze({
    code: "ru",
    lang: "ru-RU",
    dir: "ltr",
    asset: "./content/ru.html?v=5-about-i18n-polish",
  }),
  "sk": Object.freeze({
    code: "sk",
    lang: "sk-SK",
    dir: "ltr",
    asset: "./content/sk.html?v=5-about-i18n-polish",
  }),
  "sl": Object.freeze({
    code: "sl",
    lang: "sl-SI",
    dir: "ltr",
    asset: "./content/sl.html?v=5-about-i18n-polish",
  }),
  "so": Object.freeze({
    code: "so",
    lang: "so-SO",
    dir: "ltr",
    asset: "./content/so.html?v=5-about-i18n-polish",
  }),
  "sq": Object.freeze({
    code: "sq",
    lang: "sq-AL",
    dir: "ltr",
    asset: "./content/sq.html?v=5-about-i18n-polish",
  }),
  "sr": Object.freeze({
    code: "sr",
    lang: "sr-Latn-RS",
    dir: "ltr",
    asset: "./content/sr.html?v=5-about-i18n-polish",
  }),
  "sv": Object.freeze({
    code: "sv",
    lang: "sv-SE",
    dir: "ltr",
    asset: "./content/sv.html?v=5-about-i18n-polish",
  }),
  "sw": Object.freeze({
    code: "sw",
    lang: "sw-TZ",
    dir: "ltr",
    asset: "./content/sw.html?v=5-about-i18n-polish",
  }),
  "ta": Object.freeze({
    code: "ta",
    lang: "ta-IN",
    dir: "ltr",
    asset: "./content/ta.html?v=5-about-i18n-polish",
  }),
  "te": Object.freeze({
    code: "te",
    lang: "te-IN",
    dir: "ltr",
    asset: "./content/te.html?v=5-about-i18n-polish",
  }),
  "th": Object.freeze({
    code: "th",
    lang: "th-TH",
    dir: "ltr",
    asset: "./content/th.html?v=5-about-i18n-polish",
  }),
  "tr": Object.freeze({
    code: "tr",
    lang: "tr-TR",
    dir: "ltr",
    asset: "./content/tr.html?v=5-about-i18n-polish",
  }),
  "uk": Object.freeze({
    code: "uk",
    lang: "uk-UA",
    dir: "ltr",
    asset: "./content/uk.html?v=5-about-i18n-polish",
  }),
  "ur": Object.freeze({
    code: "ur",
    lang: "ur-PK",
    dir: "rtl",
    asset: "./content/ur.html?v=5-about-i18n-polish",
  }),
  "uz": Object.freeze({
    code: "uz",
    lang: "uz-UZ",
    dir: "ltr",
    asset: "./content/uz.html?v=5-about-i18n-polish",
  }),
  "vi": Object.freeze({
    code: "vi",
    lang: "vi-VN",
    dir: "ltr",
    asset: "./content/vi.html?v=5-about-i18n-polish",
  }),
  "yo": Object.freeze({
    code: "yo",
    lang: "yo-NG",
    dir: "ltr",
    asset: "./content/yo.html?v=5-about-i18n-polish",
  }),
  "zh": Object.freeze({
    code: "zh",
    lang: "zh-CN",
    dir: "ltr",
    asset: "./content/zh.html?v=5-about-i18n-polish",
  }),
  "zu": Object.freeze({
    code: "zu",
    lang: "zu-ZA",
    dir: "ltr",
    asset: "./content/zu.html?v=5-about-i18n-polish",
  }),
});

export function resolveArticleLocale(code) {
  return ARTICLE_LOCALES[code] ?? ARTICLE_LOCALES[ARTICLE_FALLBACK_LOCALE];
}
```

</details>


---

<sub>25s</sub>

### `bash` — Failed

**Staðfesta SHA og vinnusvæði hinnar geymslunnar**

$ git -C artifacts/cross-repo-native-qa/runtime/repo2-0 rev-parse HEAD && git -C artifacts/cross-repo-native-qa/runtime/repo2-0 status --short --branch

```
Permission denied and could not request permission from user
```


---

<sub>32s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js (lines 1-120)

<details>
<summary>119 lines</summary>

```
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
    "calendarHelp.hebrew": "Mánuðir eru valdir eftir nafni. Ár og dag má slá inn með tugatölustöfum eða hebreskum talnastöfum, til dæmis תשפ״ו eða י״ד; ef ár er ritað með hebreskum talnastöfum án þúsundamerkis er 5.000 bætt við það.",
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
```

</details>


---

<sub>32s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js (lines 121-240)

<details>
<summary>120 lines</summary>

```
    "calendar.cutletDescription": "{count} dagar · aðgerðardagur: {actionDate}",
    "calendar.targetOutside": "Leitaða dagsetningin er ekki í kótelettunni sem nú er sýnd. Þú getur haldið áfram að fletta eða leitað að annarri dagsetningu.",
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
    "year.targetPosition": "Leitaða dagsetningin er dagur {day} af {length} í þessu ári.",
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
    "guide.2.heading": "Leitaðu í hvaða studdu dagatali sem er",
    "guide.2.body": "Undir „Hvaða dag viltu finna?“ velurðu dagatal, fyllir út reitina og velur „Sýna dagsetningu“. Valkostirnir fela í sér gregorískt, hebreskt, júlíanskt, íslamskt, persneskt, kínverskt, hindú, saka, taílenskt, eþíópískt, koptískt, japanskt, minguo og bahá’í dagatal, auk langtals Maya.",
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
```

</details>


---

<sub>32s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js (lines 241-365)

<details>
<summary>110 lines</summary>

```
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
```

</details>


---

<sub>32s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/index.html.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/index.html

```
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#672013">
    <meta name="description" content="An explanation of the Pastafari Calendar." data-i18n-attr="content:about.metaDescription">
    <meta name="color-scheme" content="light">
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; base-uri 'none'; object-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; worker-src 'self'; manifest-src 'self'">
    <title data-i18n="about.title">About the Pastafari Calendar</title>
    <link rel="manifest" href="../manifest.webmanifest?v=9-canonical-names">
    <link rel="icon" href="../icons/icon.svg?v=9-canonical-names" type="image/svg+xml">
    <link rel="apple-touch-icon" href="../icons/icon-192.png">
    <link rel="stylesheet" href="../styles.css?v=16-about-polish">
    <script type="module" src="./about.js?v=5-about-i18n-polish"></script>
  </head>
  <body class="about-page">
    <a class="skip-link" href="#article-content" data-i18n="about.skip">Skip to the calendar explanation</a>
    <div class="app-shell about-shell">
      <header class="masthead about-masthead">
        <div class="masthead-copy">
          <p class="eyebrow" data-i18n="app.brand">PASTAFARI</p>
          <h1 data-i18n="about.title">About the Pastafari Calendar</h1>
          <p class="intro" data-i18n="about.intro">How the calendar represents days, years, cutlets, woven months, and the day of working.</p>
          <a class="guide-link" href="../" data-back-to-calendar data-i18n="about.back">Back to the calendar</a>
        </div>
        <div class="language-control">
          <label for="language-selector" data-i18n="language.label">Language</label>
          <select id="language-selector" autocomplete="off"></select>
        </div>
      </header>

      <p class="about-language-notice" id="about-language-notice" hidden data-i18n="about.fallbackNotice">The explanation is unavailable in the selected language right now, so the default version is shown.</p>

      <details class="about-toc" id="about-toc" open>
        <summary>
          <span class="eyebrow" data-i18n="about.tocKicker">On this page</span>
          <span class="about-toc-title" data-i18n="about.toc">Contents</span>
        </summary>
        <nav data-i18n-attr="aria-label:about.toc">
          <ol id="about-toc-list"></ol>
        </nav>
      </details>

      <main>
        <article id="article-content" class="about-article" aria-busy="true" tabindex="-1"></article>
        <p class="about-load-error" id="about-load-error" role="alert" hidden data-i18n="about.loadError">The calendar explanation could not be loaded.</p>

        <section class="about-site-usage" id="site-usage" aria-labelledby="guide-heading" data-toc-section data-toc-level="2">
          <p class="eyebrow" data-i18n="guide.eyebrow">User guide</p>
          <h2 id="guide-heading" data-i18n="guide.heading">What can you do here, and how?</h2>
          <p class="guide-intro" data-i18n="guide.intro">Search, read, browse, change the day of working, and compare calculations.</p>
          <details class="about-site-usage-details" id="site-usage-details">
            <summary data-i18n="guide.open">How do I use this site?</summary>
            <div class="guide-grid">
              <article><span class="guide-number">01</span><h3 data-i18n="guide.1.heading">Open the site and get today</h3><p data-i18n="guide.1.body">The site immediately determines the current Pastafari day for the active observer location.</p></article>
              <article><span class="guide-number">02</span><h3 data-i18n="guide.2.heading">Search in any available calendar</h3><p data-i18n="guide.2.body">Choose a calendar, fill its fields, and show the date.</p></article>
              <article><span class="guide-number">03</span><h3 data-i18n="guide.3.heading">Read the date</h3><p data-i18n="guide.3.body">Each tile shows the year, cutlet, and month in three lines.</p></article>
              <article><span class="guide-number">04</span><h3 data-i18n="guide.4.heading">Browse without selecting by accident</h3><p data-i18n="guide.4.body">Use the cutlet navigation buttons.</p></article>
              <article><span class="guide-number">05</span><h3 data-i18n="guide.5.heading">Change the day of working</h3><p data-i18n="guide.5.body">Open the calculation options to change it.</p></article>
              <article><span class="guide-number">06</span><h3 data-i18n="guide.6.heading">Compare the same days twice</h3><p data-i18n="guide.6.body">On desktop, align each target day under two calculations.</p></article>
              <article><span class="guide-number">07</span><h3 data-i18n="guide.7.heading">Explore the whole year</h3><p data-i18n="guide.7.body">Below the cutlet, inspect the year's length, cutlets, and woven months.</p></article>
            </div>
            <p class="guide-note" data-i18n="guide.note">Grid rows are visual only; comparison-table rows deliberately align the same day.</p>
          </details>
          <a class="back-to-calendar" href="../" data-back-to-calendar data-i18n="guide.back">Back to search and calendar</a>
        </section>
      </main>

      <footer class="site-footer">
        <p data-i18n="footer.local">Calculation happens on your device; this site has no user account and no tracking code.</p>
        <p data-i18n="footer.open">The link is public and loads directly, including in a private-browsing window.</p>
      </footer>
    </div>
    <noscript>
      <style>
        .app-shell { display: none !important; }
      </style>
      <div class="noscript" lang="zxx" dir="ltr">
        <p><strong>JavaScript</strong> <span>⚠</span></p>
      </div>
    </noscript>
  </body>
</html>

```


---

<sub>32s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/registry.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/registry.js

```
File too large to read at once (29.6 KB). Consider using the grep tool to search within the file, or view with view_range to read specific sections.
```


---

<sub>32s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/runtime.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/runtime.js

<details>
<summary>62 lines</summary>

```
"use strict";

import { LOCALES, getLocale, resolveLocale, translate } from "./registry.js?v=20-about-i18n";

export const LANGUAGE_STORAGE_KEY = "pastafari.language";

function safeReadStorage(storage, key) {
  try { return storage?.getItem(key) ?? null; } catch { return null; }
}

function safeWriteStorage(storage, key, value) {
  try { storage?.setItem(key, value); return true; } catch { return false; }
}

export function resolveBrowserLocale({ url = location.href, storage = localStorage, navigatorObject = navigator } = {}) {
  const language = new URL(url).searchParams.get("lang");
  const browserLanguages = Array.isArray(navigatorObject?.languages) && navigatorObject.languages.length
    ? [...navigatorObject.languages]
    : navigatorObject?.language ? [navigatorObject.language] : [];
  return resolveLocale({
    urlLanguage: language,
    savedLanguage: safeReadStorage(storage, LANGUAGE_STORAGE_KEY),
    browserLanguages,
  });
}

export function persistLanguage(code, storage = localStorage) {
  const locale = getLocale(code);
  return safeWriteStorage(storage, LANGUAGE_STORAGE_KEY, locale.code);
}

export function urlWithLanguage(url, code) {
  const locale = getLocale(code);
  const next = new URL(url);
  next.searchParams.set("lang", locale.code);
  return next;
}

export function populateLanguageSelector(select, activeCode) {
  const fragment = document.createDocumentFragment();
  for (const locale of LOCALES) {
    const option = document.createElement("option");
    option.value = locale.code;
    option.textContent = locale.displayName;
    option.lang = locale.code;
    option.dir = locale.dir;
    fragment.append(option);
  }
  select.replaceChildren(fragment);
  select.value = getLocale(activeCode).code;
}

export function applyDocumentLocale(locale, root = document) {
  const documentElement = root.documentElement ?? root.ownerDocument?.documentElement;
  if (!documentElement) throw new TypeError("A document-like root with documentElement is required.");
  documentElement.lang = locale.code;
  documentElement.dir = locale.dir;
  for (const element of root.querySelectorAll("[data-i18n]")) {
    element.textContent = translate(locale, element.dataset.i18n);
  }
  for (const element of root.querySelectorAll("[data-i18n-attr]")) {
    const bindings = element.dataset.i18nAttr.split(";").map((part) => part.trim()).filter(Boolean);
    for (const binding of bindings) {
      const separator = binding.indexOf(":");
      if (separator <= 0) throw new SyntaxError(`Invalid data-i18n-attr binding: ${binding}`);
      const attribute = binding.slice(0, separator).trim();
      const key = binding.slice(separator + 1).trim();
      element.setAttribute(attribute, translate(locale, key));
    }
  }
}
```

</details>


---

<sub>32s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/README.md.**

/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/README.md

<details>
<summary>25 lines</summary>

````
# Pastafaríska tímatalan — Elm og íslenska

Þetta verkefni er sjálfstæð grunnsmíð Stage 1 fyrir Elm-línuna með íslensku sem eina mannlega frumtextamálið. Verkefnið var stofnað frá auðu tré og notar engin forrit, prófanir, niðurstöður, töflur, skyndiminni, rekjanir eða gátreikninga úr annarri útfærslu.

## Innihald Stage 1

`Pastafari.ExactInt` veitir nákvæman heiltölureikning með ótakmarkaðri stærð, skrifaðan í Elm. `NormativeOracle` er prófunar-eingöngu bein útfærsla á innbyggða staðlaða viðmiðinu. `Pastafari.SourceLanguageCatalog` frystir 17 kótelettunöfn og 47 mánaðarnöfn með föstum `canonicalIndex`. `Pastafari.MonsterBase` er aðeins hlutlaus grunnur fyrir samhengi, stýringu, staðfestingu og mælingar. `Pastafari.Spaghetti` inniheldur enn enga eldri villuleið og enga leiðréttingarrökfræði úr síðari stigum.

Hrein prófunarrökfræði er í `tests/Stage01Checks.elm`. `tests/Stage01Harness.elm` er aðeins þunnt Elm-millilag með einni útleiðargátt fyrir textaskýrslu. `STAGE_01_OWNERSHIP_AUDIT.md` skráir sérstaka eignarhaldsúttekt og `STAGE_01_NORMATIVE_AUDIT.md` skráir kyrrstæða úttekt á staðlaða reikniritinu.

## Tungumál og röðun

Öll merkingarbær nöfn eru þýdd eftir merkingu. Staðanöfn og tilbúin nöfn eru meðhöndluð sem sérnöfn. Fyrir tilbúin hebresk hljóðnöfn er eftirfarandi regla fryst: samhljóð eru yfirfærð í næsta íslenskt eða íslenskt-læsilegt hljóðgildi, hebreska sj-hljóðið er ritað `sj`, greinileg sérhljóð úr punktun eru varðveitt með íslenskri lengdarmerkingu þegar það á við og engin ný merking er búin til. Því verða tilbúnu nöfnin hér `Palgúrasj` og `Karsjúmav`.

Staðanöfn með rótgróinni latneskri eða íslenskri ritmynd nota þá ritmynd: `Akkad`, `Erídú`, `Úrúk`, `Níníve` og `Babýlon`. Þessi texti hefur engin áhrif á staðlaða röðun.

Staðlaða röðin byggist eingöngu á `canonicalIndex`. Aldrei má raða eftir íslenskum strengjum, Unicode, stafrófsröð, staðfærsluröðun eða há-/lágstafabreytingu. Allar framtíðarstaðfærslur verða aðeins birtingarlag sem þýðir frá íslenska frumstrengnum og mega ekki hafa áhrif á `rank`, `unrank`, skyndiminnislykla eða val.

## Nákvæmni hliðavísitalna

Algerar hliðavísitölur eru `BigInt`, ekki Elm-`Int`. `GateState` notar kanónískan tugastreng vísitölunnar sem `Dict`-lykil, en staðlaðar samanburðar- og röðunaraðgerðir nota alltaf `BigInt` sjálft. Því getur mjög fjarlægur dagur ekki breytt niðurstöðu vegna `Int`-yfirflæðis. Aðeins staðbundnir stærðarfjöldar sem eru sannað bundnir af 5778 daga ársmarkinu eru færðir í `Int`.

## Keyrsla prófana

Fyrst skal láta Elm 0.19.1 þýða allt prófunartréð:

```text
elm make tests/Stage01Harness.elm --output=stage01.js
```

Hrein próf má síðan keyra beint í Elm-verkfærakeðjunni án sérsmíðaðs hjálparkóða í öðru forritunarmáli:

```text
elm repl
> import Stage01Checks
> Stage01Checks.allPassed
> Stage01Checks.summary
```

`Stage01Checks.allPassed` á að vera `True` og `Stage01Checks.summary` á aðeins að innihalda PASS-línur og lokayfirlit um að öll vitni hafi staðist. Útleiðargáttin í `Stage01Harness` er valfrjáls birtingarleið fyrir sömu fullgerðu skýrslu; engin reiknirit eða vænt gildi mega vera reiknuð utan Elm.

Í afhendingarumhverfinu sem bjó til þennan pakka var Elm-þýðandinn ekki tiltækur. Elm-pakkaskyndiminni var heldur ekki til staðar og nettenging úr keyrsluumhverfinu var óvirk, þannig að ekki var hægt að sækja verkfærakeðjuna. Því er ekki heimilt að halda því fram að prófin hafi verið keyrð eða að staða verkefnisins sé staðfest græn fyrr en raunveruleg Elm 0.19.1 keyrsla hefur farið fram.
````

</details>


---

<sub>32s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/SOURCE_LANGUAGE_CATALOG.md.**

/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/SOURCE_LANGUAGE_CATALOG.md

<details>
<summary>71 lines</summary>

```
# SourceLanguageCatalog — íslenska

Útgáfa katalógsins er `1.0.0`. Katalógurinn er frystur frá Stage 1 og má ekki breytast án skýrrar forskriftarbreytingar.

## Reglur

Merkingarbær almenn orð eru þýdd eftir merkingu. Heilir orðasambandsliðir, þar á meðal brot, eru varðveittir sem eitt nafn og þýddir sem eðlilegt íslenskt orðasamband. Staðanöfn nota viðurkennda latneska eða íslenska ritmynd þegar hún er til. Tilbúin hljóðnöfn fá ákveðna og endurtekningarhæfa yfirfærslu: hebreska sj-hljóðið er ritað `sj`; önnur samhljóð fá næsta íslenskt-læsilega hljóðgildi; greinileg sérhljóð úr frumritinu eru varðveitt; engin merking er búin til.

`canonicalIndex` er eina staðlaða röðunin. Textastrengir eru birtingargögn og mega aldrei ráða `rank`, `unrank`, vali, merkingarlegum skyndiminnislykli eða samsetningaröð.

## Kótelettur

1. brons
2. refur
3. nýra
4. Lagash
5. hugsun
6. fjórir hlutar af níu
7. Palgúrasj
8. papýrussef
9. klasi
10. sporðdreki
11. aska
12. hveiti
13. á
14. hlátur
15. Akkad
16. horn
17. tóma krukkan

## Mánuðir

1. leir
2. granatepli
3. olnbogi
4. öfund
5. Erídú
6. tannkrem
7. þrír hlutar af fimm
8. Karsjúmav
9. hlébarði
10. tin
11. mistur
12. reykelsi
13. snælda
14. rif
15. jóhannesarbrauð
16. Úrúk
17. skömm
18. úlfaldi
19. kopar
20. brunnur
21. eggjarauða
22. stjarna
23. hunang
24. milta
25. kalksteinn
26. gleði
27. fíkja
28. Níníve
29. froskur
30. bik
31. lampi
32. lokaða hurðin
33. sesam
34. hnakki
35. silfur
36. Súsa
37. stormur
38. asni
39. mjöl
40. eftirsjá
41. Babýlon
42. tunga
43. hör
44. salt
45. pera
46. bogi
47. sandur
```

</details>


---

<sub>32s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/DEVELOPMENT_STAGE.md.**

/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/DEVELOPMENT_STAGE.md

<details>
<summary>19 lines</summary>

```
TOTAL_STAGES=55
CURRENT_STAGE=1
CURRENT_KIND=BOOTSTRAP
CURRENT_PATCH=none
LAST_COMPLETED_STAGE=0
EXPECTED_REPOSITORY_STATE=GREEN
FOREIGN_LANGUAGE_USAGE=NONE
IMPLEMENTATION_STARTED_FROM_ZERO=YES
CROSS_IMPLEMENTATION_ARTIFACTS_USED=NO
CROSS_IMPLEMENTATION_HASH_CHECKS=NO
CROSS_IMPLEMENTATION_DIFFERENTIAL_TESTS=NO
PROGRAMMING_LANGUAGE=Elm
NATURAL_LANGUAGE=íslenska
SOURCE_LANGUAGE_CATALOG_FROZEN=YES
MONSTER_ARCHITECTURE_GROWTH=Hlutlaust kallsamhengi, grunnstýring, staðfestingarmörk og mælingaskel.
SEMANTIC_STATE_OWNER_VALIDATED=YES
GITHUB_ACTIONS_PERFORMED=NO
GIT_HISTORY_MUTATED=NO
HANDOFF_PACKAGE_PREPARED=YES
```

</details>


---

<sub>32s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/STAGE_01_EXECUTION_STATUS.txt.**

/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/STAGE_01_EXECUTION_STATUS.txt

<details>
<summary>15 lines</summary>

```
STAGE=1
KIND=BOOTSTRAP
TOOLCHAIN=ELM_0_19_1
TOOLCHAIN_AVAILABLE=NO
ELM_PACKAGE_CACHE_AVAILABLE=NO
COMPILER_INVOCATION_POSSIBLE=NO
LOCAL_TESTS_EXECUTED=NO
STATIC_STAGE1_AUDIT=PASS
KNOWN_NON_EXECUTION_BLOCKERS=NONE
NON_EXECUTION_STAGE1_WORK_COMPLETE=YES
SEMANTIC_STATE_OWNER_VALIDATED=YES
SOURCE_LANGUAGE_CATALOG_FROZEN=YES
EXPECTED_RESULT=Elm-þýðing tekst og öll Stage 1 vitni skila PASS; þá verður verkefnisstaðan GREEN og LAST_COMPLETED_STAGE=1.
ACTUAL_RESULT=Ekki keyrt: Elm 0.19.1 þýðandi er ekki tiltækur og afhendingarumhverfið hefur hvorki Elm-pakkaskyndiminni né virka nettengingu til að sækja verkfærakeðjuna.
BLOCKER=Eina eftirstandandi atriðið er raunveruleg Elm 0.19.1 þýðing og keyrsla Stage01Checks með nauðsynlegum elm/core og elm/json pökkum tiltækum.
```

</details>


---

<sub>32s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/STAGE_01_NORMATIVE_AUDIT.md.**

/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/STAGE_01_NORMATIVE_AUDIT.md

<details>
<summary>22 lines</summary>

```
# Staðlað úttekt Stage 1

## Umfang

Úttektin ber sjálfstæðu Elm-viðmiðunarvélina saman við innbyggða staðlaða viðmiðið sem Stage 1 var byggt úr. Engin önnur útfærsla, úttak hennar, prófunargögn, skyndiminni, rekjanir eða gátreikningar voru notuð.

## Nákvæmir heiltölur

`Pastafari.ExactInt` heldur formerki og grunntölustöfum í Elm-gildum og framkvæmir samlagningu, frádrátt, margföldun, veldi, gólfdeilingu og euklíðska leif án fleytitölu. Stóri teljarinn er myndaður sem `2^127-1`, ekki sem of stórt Elm-`Int` bókstafsgildi. `SAVE` er skilgreint sem `1 + regularMod(x-1,M)`.

Við framhaldsúttekt var fjarlægð önnur falin stærðartakmörkun: algerar hliðavísitölur í `GateState` og `Year` eru nú `BigInt`, geymdar í orðabók með kanónískum tugastreng vísitölunnar sem lykli. Röð orðabókarinnar hefur því engin staðlað áhrif. Staðbundinn fjöldi hliðabila innan árs er aðeins breyttur í `Int` eftir að ársreglan hefur takmarkað lengdina við 5778 daga; þar sem hvert bil er að minnsta kosti 42 dagar er þessi staðbundni fjöldi alltaf lítill.

Teljari höfnunarskrefa í stutta valinu notar einnig `BigInt`. Því getur langur svarhringur ekki breytt merkingu vegna yfirflæðis í Elm-`Int`.

## Sósan

Úttektin staðfestir eftirfarandi röð: dagatalningar; 46 steinaraðir með sameiginlegri gamalli mynd fyrir alla fimm nýja steina; sjö faldar dropar; 46 sýnilegir dropar með réttum 1/3/7 forverum; röðun sex skála; hellingar á fyrstu þrjú sætin í röðinni; samtímis skálauppfærsla úr einni gamalli mynd; varðveisla raðar dropa 46; og tólf eftirhrærslur.

A1 er útfært nákvæmlega sem `savedBowlSum = SAVE(sum(oldBowls) + 149 * stir)` og sama vistaða gildi er lagt við blöndu hvers skálar í þeirri hrærslu.

## Spurningar og val

Næsti skál er fundinn í varðveittri röð dropa 46. Stefna svarhrings er ákveðin einu sinni. Stutt val notar höfnunarmörkin `floor(M/N)*N` og heldur áfram í sama svarhring. Vítt val myndar eina breiða tölu úr föstum svarstöfum og, eftir höfnun, færist um eitt skref í breiða hringnum án þess að afla nýrra stafa.

## Hlið og ár

Jákvæð hlið spyr um `FOUNDATION+n` og neikvæð hlið um `FOUNDATION-n`. Hliðabil eru 42..963 dagar. Árslengd er 252..5778 dagar; 5779 og hærra komast ekki í gildan árskost. Ár 5000 er valið úr pörum sem innihalda verknaðardaginn á bilinu `(open,close]`, fyrst eftir lengd og síðan eftir fyrra opnunarhliði við jafna lengd. Ferð til markárs er ár fyrir ár. Opnunarhliðið tilheyrir fyrra ári vegna skilyrðisins `targetDay <= openGateDay` í afturleit.

## Kótilettur og mánuðir

Fjöldi kótiletta er takmarkaður við 6..17 og ekki meiri en fjöldi hliðabila ársins. Skipting kótiletta er nákvæm lexíkógrafísk talning/opnun; ef verknaðardagurinn er innra hlið verður það millimark skiptingarinnar. Nöfn eru valin sem hlutumraðanir án endurtekningar og innri merkingin er `canonicalIndex`.

Mánaðafjöldi fylgir mörkunum 4..123 dagar og að hámarki 47 mánuðir. Mánaðalengdir eru taldar og opnaðar með nákvæmu DP án þess að efnisgera alla fjölskylduna. Vefurinn er valinn sem ein heild með DP sem varðveitir bæði röð fyrstu og síðustu birtingar. `dayInMonth` er fjöldi birtinga valins mánaðar frá upphafi árs til og með markdegi.

## Lokaniðurstaða og aðskilnaður

`calendarDateCanonical` skilar nákvæmlega fimm merkingarsviðum. `calendarDate` leysir aðeins kótilettu- og mánaðarvísitölur yfir í fryst íslensk heiti. Ekkert í `src/` flytur inn `NormativeOracle`, þannig að framleiðsluskelin getur ekki notað viðmiðunarvélina sem varaleið eða leiðréttingu.

Við úttektina fannst Elm-sértæk þýðingarvilla í eldri drögum: fjögurra og fimm staka tuple-gildi höfðu verið notuð í stuðlatöflum og í innra vali kótilettuskiptingar. Elm leyfir ekki slík tuple. Þau voru skipt út fyrir nafngreind record-gildi án merkingarbreytingar. Engin fjögurra eða fleiri staka tuple er eftir í Elm-kóðanum.

## Staða

Enginn þekktur merkingarlegur, eignarhaldslegur eða Elm-sértækur byggingargalli er eftir í Stage 1 eftir þessa kyrrstöðuúttekt. Þetta er ekki staðgengill fyrir þýðingu. Raunveruleg Elm 0.19.1 þýðing og keyrsla allra vitna er enn nauðsynleg áður en `LAST_COMPLETED_STAGE` má verða 1.
```

</details>


---

<sub>32s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/STAGE_01_OWNERSHIP_AUDIT.md.**

/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/STAGE_01_OWNERSHIP_AUDIT.md

<details>
<summary>21 lines</summary>

```
# Eignarhald merkingarástands — Stage 1

## Niðurstaða

Eignarhald merkingarástands í Stage 1 er staðfest með sérstakri yfirferð á öllum inngöngum, líkansræsingu, áhrifamörkum, endurnýtingu myndaðra gagna og röð prófana. Niðurstaðan byggist ekki aðeins á óbreytanleika Elm: hver möguleg tengileið var skoðuð sérstaklega. Engin sameiginleg breytanleg merkingargögn eru til í framleiðsluskelinni eða viðmiðunarvélinni.

## Framleiðslusamhengi

`Pastafari.MonsterBase.newContext` býr til nýtt `BaseContext` fyrir hvert kall. Samhengið inniheldur aðeins inntaksdagana, lífsferilsstöðu, framkvæmdarslóð, mælingar og greiningargögn. `dispatch` og `recordMetric` skila nýju samhengi; ekkert annað samhengi er lesið eða skrifað. Engin sameiginleg skrá, skyndiminni, áhrifagátt eða önnur breytanleg geymsla er til í `src/` á Stage 1.

Mælingar og greiningargögn eru athugunarástand. Þau eru ekki lesin af reikniritinu sem mótar inntaksdagana eða staðlaða viðmiðunarniðurstöðu. `Pastafari.Spaghetti` tekur aðeins tvo daga og býr sjálft til samhengi fyrir kallið.

## Ræsing líkans

`Stage01Harness.Model` er einingargildið `()`. `init` býr því ekki til, varðveitir né endurnýtir merkingarástand milli keyrslna. Inntaksflögg eru einnig `()`. `update` skilar sama einingargildi og `subscriptions` er alltaf `Sub.none`.

## Áhrif og gáttir

Hrein prófunarrökfræði er í venjulegu Elm-einingunni `Stage01Checks`; hún hefur engar gáttir og engin áhrif. Eina gáttin í verkefninu er útleiðin `report : String -> Cmd msg` í þunna `Stage01Harness` millilaginu. Hún flytur aðeins fullgerðan prófunartexta út úr Elm. Ekkert inntaksport er skilgreint og engin ytri áhrif geta gefið viðmiðunarvélinni, framleiðsluskel eða `BaseContext` merkingarlegt inntak. Framleiðslueiningarnar undir `src/` eru ekki gáttareiningar.

## Endurnýting myndaðra gagna

`NormativeOracle.buildStones` er óbreytanlegt Elm-gildi. `Array.set`, `Array.push`, `Dict.insert` og allar listaaðgerðir í viðmiðunarvélinni skila nýjum gildum; eldri útgáfa er áfram sérstakt gildi. Hliðarástandið `GateState` er alltaf tekið sem fallainntak og skilað sem fallaniðurstaða. Enginn falinn hliðaskyndiminni eða byggingarskyndiminni er til á Stage 1.

Hliðavísitölur eru `BigInt`; orðabókin notar eingöngu kanónískan tugastreng vísitölunnar sem aðgangslykil. Röðun færslna í `Dict` er aldrei lesin til að ákvarða hlið, ár eða aðra staðlaða röð.

`Stage01Checks` inniheldur sérstakan vitnisburð sem reiknar sömu sósu, reiknar aðra sósu á milli og reiknar síðan fyrri sósuna aftur. Niðurstöður fyrra inntaks verða að vera nákvæmlega eins fyrir og eftir millikallið. Þannig er endurnýting steinatöflunnar og annarra óbreytanlegra gilda prófuð gegn söguháðri mengun.

## Röð prófana og kalla

`Stage01Checks` byggir tvö óháð `BaseContext` bæði í A→B og B→A röð og krefst sömu lokagilda. Hann breytir mælingum og lífsferilsstigi í einu samhengi og staðfestir að hitt samhengi sé enn nákvæmlega nýtt samhengi. Samanburðurinn ber sviðin saman beint og notar `Dict.toList` aðeins fyrir athugunarmælingar; engin record-jöfnun á földu fallgildi er notuð.

Prófin nota engin sameiginleg breytanleg gildi, ekkert handahófsfræ, enga klukku og ekkert umhverfisgildi. `checks` er hreint Elm-gildi og hver vitnisburður fæst aðeins úr föstum gögnum eða hreinum föllum. Gáttarmillilagið sér aðeins `Stage01Checks.summary` eftir að hreini útreikningurinn er fullgerður.

## Aðskilnaður viðmiðunarvélar og framleiðslukóða

`NormativeOracle` er aðeins undir `tests/` og ekkert í `src/` flytur það inn. `Pastafari.Spaghetti` getur því hvorki lesið oracle-niðurstöðu né notað viðmiðunarvélina sem varaleið. Viðmiðunarvélin deilir heldur engu samhengi með framleiðslukallinu.

## Keyrslustaða

Byggingarlega er atriðið `SEMANTIC_STATE_OWNER_VALIDATED` lokað og er því sett á `YES`. Keyrsluvitnin fyrir milliköll og röðaróháð samhengi eru hluti af `Stage01Checks`. Raunveruleg Elm 0.19.1 keyrsla er enn nauðsynleg til að staðfesta að vitnin standist í verkfærakeðjunni; það breytir ekki niðurstöðu eignarhaldsúttektarinnar, en kemur í veg fyrir að Stage 1 sé merkt lokið.
```

</details>


---

<sub>39s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/.git.**

/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/.git

<details>
<summary>11 lines</summary>

```
HEAD
config
description
hooks
index
info
logs
objects
packed-refs
refs
shallow
```

</details>


---

<sub>39s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/SPAGHETTI_DEVELOPMENT_HISTORY.md.**

/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/SPAGHETTI_DEVELOPMENT_HISTORY.md

<details>
<summary>13 lines</summary>

```
# Þróunarsaga spaghettískrímslisins

## Stage 1 — Bootstrap

### Hvað var byggt

Verkefnið var stofnað frá auðu tré fyrir Elm og íslensku. Sjálfstæður nákvæmur heiltölukjarni var skrifaður í Elm, staðlaða viðmiðunarvélin var endurgerð beint úr innbyggða viðmiðinu og sérstök hrein Elm-prófunarumgjörð var búin til. `SourceLanguageCatalog` var frystur með 17 kótilettum og 47 mánuðum.

### Hlutlaus skrímslagrunnur

Aðeins almenn og merkingarlega hlutlaus grunnlög voru sett inn: kallsamhengi, einfaldur stýringaraðili, staðfestingarmörk og mælingaskel. Engin eldri villa, leiðrétting, samhæfingarleið eða stilling úr framtíðarstigi var sett inn.

### Eign á ástandi

Allt `BaseContext` tilheyrir einu kalli. Mælingar og framkvæmdarslóð eru athugunargögn og mega ekki verða staðlað inntak. Sérstök úttekt staðfesti að `Model`-ræsing, útleiðargátt, prófunarumgjörð, endurnýting óbreytanlegra myndaðra gagna og röð óháðra kalla mynda enga merkingarlega tengingu. `SEMANTIC_STATE_OWNER_VALIDATED` er því `YES` áður en lokakeyrsla fer fram.

### Leiðréttingar innan Bootstrap

Við framhaldsúttekt Stage 1 fundust tvö atriði sem þurfti að laga áður en hægt væri að kalla smíðina tilbúna til þýðingar. Fyrri drög við `NormativeOracle` notuðu fjögurra og fimm staka tuple, sem Elm leyfir ekki; þau voru skipt út fyrir nafngreind record-gildi án merkingarbreytingar. Einnig voru algerar hliðavísitölur færðar úr `Int` í `BigInt` svo að fjarlægir löglegir dagar gætu ekki valdið yfirflæði. Höfnunarteljari stutta valsins var af sömu ástæðu færður í `BigInt`.

Þessar breytingar eru hluti af Bootstrap-innviðum og bæta hvorki við eldri villu né leiðréttingu úr Stage 2–53.

### Prófunarstaða

Kyrrstæð úttekt á Stage 1 finnur nú engan þekktan galla um merkingu, eignarhald eða Elm-sértæka byggingu. Kóðinn er útbúinn fyrir Elm 0.19.1, en afhendingarumhverfið hefur engan Elm-þýðanda, ekkert Elm-pakkaskyndiminni og enga virka nettengingu til að sækja þau. Þess vegna er `LAST_COMPLETED_STAGE` áfram 0 og Stage 1 verður ekki merkt lokið fyrr en Elm-þýðing og öll Stage 1 vitni hafa raunverulega staðist.
```

</details>


---

<sub>39s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/src/Pastafari/SourceLanguageCatalog.elm.**

/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/src/Pastafari/SourceLanguageCatalog.elm

<details>
<summary>98 lines</summary>

```
module Pastafari.SourceLanguageCatalog exposing
    ( CatalogEntry
    , cutletEntries
    , cutletName
    , monthEntries
    , monthName
    , version
    )


type alias CatalogEntry =
    { canonicalIndex : Int
    , sourceId : String
    , text : String
    }


version : String
version =
    "1.0.0"


cutletEntries : List CatalogEntry
cutletEntries =
    [ { canonicalIndex = 1, sourceId = "BRONZE", text = "brons" }
    , { canonicalIndex = 2, sourceId = "FOX", text = "refur" }
    , { canonicalIndex = 3, sourceId = "KIDNEY", text = "nýra" }
    , { canonicalIndex = 4, sourceId = "LAGASH", text = "Lagash" }
    , { canonicalIndex = 5, sourceId = "THOUGHT", text = "hugsun" }
    , { canonicalIndex = 6, sourceId = "FOUR_PARTS_OF_NINE", text = "fjórir hlutar af níu" }
    , { canonicalIndex = 7, sourceId = "PALGURASH", text = "Palgúrasj" }
    , { canonicalIndex = 8, sourceId = "PAPYRUS_SEDGE", text = "papýrussef" }
    , { canonicalIndex = 9, sourceId = "CLUSTER", text = "klasi" }
    , { canonicalIndex = 10, sourceId = "SCORPION", text = "sporðdreki" }
    , { canonicalIndex = 11, sourceId = "ASH", text = "aska" }
    , { canonicalIndex = 12, sourceId = "WHEAT", text = "hveiti" }
    , { canonicalIndex = 13, sourceId = "RIVER", text = "á" }
    , { canonicalIndex = 14, sourceId = "LAUGHTER", text = "hlátur" }
    , { canonicalIndex = 15, sourceId = "AKKAD", text = "Akkad" }
    , { canonicalIndex = 16, sourceId = "HORN", text = "horn" }
    , { canonicalIndex = 17, sourceId = "EMPTY_JAR", text = "tóma krukkan" }
    ]


monthEntries : List CatalogEntry
monthEntries =
    [ { canonicalIndex = 1, sourceId = "CLAY", text = "leir" }
    , { canonicalIndex = 2, sourceId = "POMEGRANATE", text = "granatepli" }
    , { canonicalIndex = 3, sourceId = "ELBOW", text = "olnbogi" }
    , { canonicalIndex = 4, sourceId = "ENVY", text = "öfund" }
    , { canonicalIndex = 5, sourceId = "ERIDU", text = "Erídú" }
    , { canonicalIndex = 6, sourceId = "TOOTHPASTE", text = "tannkrem" }
    , { canonicalIndex = 7, sourceId = "THREE_PARTS_OF_FIVE", text = "þrír hlutar af fimm" }
    , { canonicalIndex = 8, sourceId = "KARSHUMAV", text = "Karsjúmav" }
    , { canonicalIndex = 9, sourceId = "LEOPARD", text = "hlébarði" }
    , { canonicalIndex = 10, sourceId = "TIN", text = "tin" }
    , { canonicalIndex = 11, sourceId = "MIST", text = "mistur" }
    , { canonicalIndex = 12, sourceId = "FRANKINCENSE", text = "reykelsi" }
    , { canonicalIndex = 13, sourceId = "SPINDLE", text = "snælda" }
    , { canonicalIndex = 14, sourceId = "RIB", text = "rif" }
    , { canonicalIndex = 15, sourceId = "CAROB", text = "jóhannesarbrauð" }
    , { canonicalIndex = 16, sourceId = "URUK", text = "Úrúk" }
    , { canonicalIndex = 17, sourceId = "SHAME", text = "skömm" }
    , { canonicalIndex = 18, sourceId = "CAMEL", text = "úlfaldi" }
    , { canonicalIndex = 19, sourceId = "COPPER", text = "kopar" }
    , { canonicalIndex = 20, sourceId = "WELL", text = "brunnur" }
    , { canonicalIndex = 21, sourceId = "YOLK", text = "eggjarauða" }
    , { canonicalIndex = 22, sourceId = "STAR", text = "stjarna" }
    , { canonicalIndex = 23, sourceId = "HONEY", text = "hunang" }
    , { canonicalIndex = 24, sourceId = "SPLEEN", text = "milta" }
    , { canonicalIndex = 25, sourceId = "LIMESTONE", text = "kalksteinn" }
    , { canonicalIndex = 26, sourceId = "JOY", text = "gleði" }
    , { canonicalIndex = 27, sourceId = "FIG", text = "fíkja" }
    , { canonicalIndex = 28, sourceId = "NINEVEH", text = "Níníve" }
    , { canonicalIndex = 29, sourceId = "FROG", text = "froskur" }
    , { canonicalIndex = 30, sourceId = "PITCH", text = "bik" }
    , { canonicalIndex = 31, sourceId = "LAMP", text = "lampi" }
    , { canonicalIndex = 32, sourceId = "CLOSED_DOOR", text = "lokaða hurðin" }
    , { canonicalIndex = 33, sourceId = "SESAME", text = "sesam" }
    , { canonicalIndex = 34, sourceId = "NAPE", text = "hnakki" }
    , { canonicalIndex = 35, sourceId = "SILVER", text = "silfur" }
    , { canonicalIndex = 36, sourceId = "SUSA", text = "Súsa" }
    , { canonicalIndex = 37, sourceId = "STORM", text = "stormur" }
    , { canonicalIndex = 38, sourceId = "DONKEY", text = "asni" }
    , { canonicalIndex = 39, sourceId = "FLOUR", text = "mjöl" }
    , { canonicalIndex = 40, sourceId = "REGRET", text = "eftirsjá" }
    , { canonicalIndex = 41, sourceId = "BABYLON", text = "Babýlon" }
    , { canonicalIndex = 42, sourceId = "TONGUE", text = "tunga" }
    , { canonicalIndex = 43, sourceId = "FLAX", text = "hör" }
    , { canonicalIndex = 44, sourceId = "SALT", text = "salt" }
    , { canonicalIndex = 45, sourceId = "PEAR", text = "pera" }
    , { canonicalIndex = 46, sourceId = "BOW", text = "bogi" }
    , { canonicalIndex = 47, sourceId = "SAND", text = "sandur" }
    ]


cutletName : Int -> Maybe String
cutletName canonicalIndex =
    resolve canonicalIndex cutletEntries


monthName : Int -> Maybe String
monthName canonicalIndex =
    resolve canonicalIndex monthEntries


resolve : Int -> List CatalogEntry -> Maybe String
resolve canonicalIndex entries =
    entries
        |> List.filter (\entry -> entry.canonicalIndex == canonicalIndex)
        |> List.head
        |> Maybe.map .text
```

</details>


---

<sub>39s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/src/Pastafari/Spaghetti.elm.**

/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/src/Pastafari/Spaghetti.elm

<details>
<summary>32 lines</summary>

```
module Pastafari.Spaghetti exposing
    ( BootstrapResult
    , SpaghettiError(..)
    , calendarDateSpaghetti
    )

import Pastafari.ExactInt exposing (BigInt)
import Pastafari.MonsterBase as MonsterBase


type SpaghettiError
    = BootstrapOnly
    | BaseValidationFailed String


type alias BootstrapResult =
    { calculationDay : BigInt
    , targetDay : BigInt
    , traceDepth : Int
    }


calendarDateSpaghetti : BigInt -> BigInt -> Result SpaghettiError BootstrapResult
calendarDateSpaghetti calculationDay targetDay =
    let
        context0 =
            MonsterBase.newContext calculationDay targetDay

        context1 =
            MonsterBase.dispatch MonsterBase.neutralDispatcher context0
                |> MonsterBase.recordMetric "bootstrap.dispatch"
    in
    case MonsterBase.validateBaseContext context1 of
        MonsterBase.Invalid _ message ->
            Err (BaseValidationFailed message)

        MonsterBase.Valid context2 ->
            if context2.phase == MonsterBase.BootstrapReady then
                Err BootstrapOnly

            else
                Err BootstrapOnly
```

</details>


---

<sub>39s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/src/Pastafari/ExactInt.elm.**

/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/src/Pastafari/ExactInt.elm

<details>
<summary>455 lines</summary>

```
module Pastafari.ExactInt exposing
    ( BigInt
    , absBig
    , add
    , compareBig
    , equal
    , floorDivPositive
    , fromInt
    , isNegative
    , isZero
    , mul
    , mulSmall
    , negate
    , one
    , powSmall
    , regularMod
    , square
    , sub
    , toIntMaybe
    , toString
    , zero
    )


base : Int
base =
    10000


type Sign
    = Negative
    | ZeroSign
    | Positive


type BigInt
    = BigInt Sign (List Int)


zero : BigInt
zero =
    BigInt ZeroSign []


one : BigInt
one =
    fromInt 1


isZero : BigInt -> Bool
isZero value =
    case value of
        BigInt ZeroSign _ ->
            True

        _ ->
            False


isNegative : BigInt -> Bool
isNegative value =
    case value of
        BigInt Negative _ ->
            True

        _ ->
            False


fromInt : Int -> BigInt
fromInt n =
    if n == 0 then
        zero

    else if n < 0 then
        normalize Negative (digitsFromPositive (Basics.abs n))

    else
        normalize Positive (digitsFromPositive n)


digitsFromPositive : Int -> List Int
digitsFromPositive n =
    if n == 0 then
        []

    else
        modBy base n :: digitsFromPositive (n // base)


normalize : Sign -> List Int -> BigInt
normalize sign digits =
    let
        cleaned =
            trimHighZeros digits
    in
    if List.isEmpty cleaned then
        zero

    else
        BigInt sign cleaned


trimHighZeros : List Int -> List Int
trimHighZeros digits =
    digits
        |> List.reverse
        |> dropLeadingZeros
        |> List.reverse


dropLeadingZeros : List Int -> List Int
dropLeadingZeros digits =
    case digits of
        [] ->
            []

        0 :: rest ->
            dropLeadingZeros rest

        _ ->
            digits


absBig : BigInt -> BigInt
absBig value =
    case value of
        BigInt ZeroSign _ ->
            zero

        BigInt _ digits ->
            BigInt Positive digits


negate : BigInt -> BigInt
negate value =
    case value of
        BigInt Negative digits ->
            BigInt Positive digits

        BigInt Positive digits ->
            BigInt Negative digits

        BigInt ZeroSign _ ->
            zero


compareBig : BigInt -> BigInt -> Order
compareBig a b =
    case ( a, b ) of
        ( BigInt Negative ad, BigInt Negative bd ) ->
            reverseOrder (compareAbsDigits ad bd)

        ( BigInt Negative _, _ ) ->
            LT

        ( _, BigInt Negative _ ) ->
            GT

        ( BigInt ZeroSign _, BigInt ZeroSign _ ) ->
            EQ

        ( BigInt ZeroSign _, BigInt Positive _ ) ->
            LT

        ( BigInt Positive _, BigInt ZeroSign _ ) ->
            GT

        ( BigInt Positive ad, BigInt Positive bd ) ->
            compareAbsDigits ad bd


reverseOrder : Order -> Order
reverseOrder order =
    case order of
        LT ->
            GT

        EQ ->
            EQ

        GT ->
            LT


equal : BigInt -> BigInt -> Bool
equal a b =
    compareBig a b == EQ


compareAbsDigits : List Int -> List Int -> Order
compareAbsDigits a b =
    let
        la =
            List.length a

        lb =
            List.length b
    in
    if la < lb then
        LT

    else if la > lb then
        GT

    else
        compareMostSignificant (List.reverse a) (List.reverse b)


compareMostSignificant : List Int -> List Int -> Order
compareMostSignificant a b =
    case ( a, b ) of
        ( [], [] ) ->
            EQ

        ( x :: xs, y :: ys ) ->
            if x < y then
                LT

            else if x > y then
                GT

            else
                compareMostSignificant xs ys

        ( [], _ ) ->
            LT

        ( _, [] ) ->
            GT


add : BigInt -> BigInt -> BigInt
add a b =
    case ( a, b ) of
        ( BigInt ZeroSign _, _ ) ->
            b

        ( _, BigInt ZeroSign _ ) ->
            a

        ( BigInt Positive ad, BigInt Positive bd ) ->
            normalize Positive (addAbsDigits ad bd 0)

        ( BigInt Negative ad, BigInt Negative bd ) ->
            normalize Negative (addAbsDigits ad bd 0)

        ( BigInt Positive ad, BigInt Negative bd ) ->
            subtractSigns Positive Negative ad bd

        ( BigInt Negative ad, BigInt Positive bd ) ->
            subtractSigns Negative Positive ad bd


subtractSigns : Sign -> Sign -> List Int -> List Int -> BigInt
subtractSigns signA signB ad bd =
    case compareAbsDigits ad bd of
        EQ ->
            zero

        GT ->
            normalize signA (subAbsDigits ad bd 0)

        LT ->
            normalize signB (subAbsDigits bd ad 0)


addAbsDigits : List Int -> List Int -> Int -> List Int
addAbsDigits a b carry =
    case ( a, b ) of
        ( [], [] ) ->
            if carry == 0 then
                []

            else
                [ carry ]

        ( x :: xs, [] ) ->
            let
                total =
                    x + carry
            in
            modBy base total :: addAbsDigits xs [] (total // base)

        ( [], y :: ys ) ->
            let
                total =
                    y + carry
            in
            modBy base total :: addAbsDigits [] ys (total // base)

        ( x :: xs, y :: ys ) ->
            let
                total =
                    x + y + carry
            in
            modBy base total :: addAbsDigits xs ys (total // base)


subAbsDigits : List Int -> List Int -> Int -> List Int
subAbsDigits a b borrow =
    case ( a, b ) of
        ( [], [] ) ->
            []

        ( x :: xs, [] ) ->
            let
                raw =
                    x - borrow

                digit =
                    if raw < 0 then
                        raw + base

                    else
                        raw

                nextBorrow =
                    if raw < 0 then
                        1

                    else
                        0
            in
            digit :: subAbsDigits xs [] nextBorrow

        ( x :: xs, y :: ys ) ->
            let
                raw =
                    x - y - borrow

                digit =
                    if raw < 0 then
                        raw + base

                    else
                        raw

                nextBorrow =
                    if raw < 0 then
                        1

                    else
                        0
            in
            digit :: subAbsDigits xs ys nextBorrow

        ( [], _ ) ->
            []


sub : BigInt -> BigInt -> BigInt
sub a b =
    add a (negate b)


mul : BigInt -> BigInt -> BigInt
mul a b =
    case ( a, b ) of
        ( BigInt ZeroSign _, _ ) ->
            zero

        ( _, BigInt ZeroSign _ ) ->
            zero

        ( BigInt signA ad, BigInt signB bd ) ->
            let
                sign =
                    if signA == signB then
                        Positive

                    else
                        Negative
            in
            normalize sign (mulAbsDigits ad bd)


mulAbsDigits : List Int -> List Int -> List Int
mulAbsDigits a b =
    b
        |> List.indexedMap
            (\index digit ->
                List.repeat index 0 ++ mulAbsByInt a digit 0
            )
        |> List.foldl (\part acc -> addAbsDigits acc part 0) []
        |> trimHighZeros


mulAbsByInt : List Int -> Int -> Int -> List Int
mulAbsByInt digits factor carry =
    case digits of
        [] ->
            carryDigits carry

        x :: xs ->
            let
                total =
                    x * factor + carry
            in
            modBy base total :: mulAbsByInt xs factor (total // base)


carryDigits : Int -> List Int
carryDigits carry =
    if carry == 0 then
        []

    else
        modBy base carry :: carryDigits (carry // base)


mulSmall : BigInt -> Int -> BigInt
mulSmall value factor =
    if factor == 0 || isZero value then
        zero

    else if factor < 0 then
        negate (mulSmall value (Basics.abs factor))

    else
        case value of
            BigInt sign digits ->
                normalize sign (mulAbsByInt digits factor 0)


square : BigInt -> BigInt
square value =
    mul value value


powSmall : Int -> Int -> BigInt
powSmall factor exponent =
    powLoop (fromInt factor) exponent one


powLoop : BigInt -> Int -> BigInt -> BigInt
powLoop factor exponent acc =
    if exponent <= 0 then
        acc

    else
        powLoop factor (exponent - 1) (mul acc factor)


floorDivPositive : BigInt -> BigInt -> BigInt
floorDivPositive numerator denominator =
    if isZero denominator || isNegative denominator then
        zero

    else
        let
            ( qAbs, rAbs ) =
                divModAbs (absDigits numerator) (absDigits denominator)

            qPositive =
                normalize Positive qAbs
        in
        if isNegative numerator then
            if List.isEmpty rAbs then
                negate qPositive

            else
                negate (add qPositive one)

        else
            qPositive


regularMod : BigInt -> BigInt -> BigInt
regularMod numerator denominator =
    if isZero denominator || isNegative denominator then
        zero

    else
        let
            ( _, rAbs ) =
                divModAbs (absDigits numerator) (absDigits denominator)

            r =
                normalize Positive rAbs
        in
        if isNegative numerator && not (isZero r) then
            sub denominator r

        else
            r


absDigits : BigInt -> List Int
absDigits value =
    case value of
        BigInt _ digits ->
            digits


divModAbs : List Int -> List Int -> ( List Int, List Int )
divModAbs numerator denominator =
    if List.isEmpty denominator then
        ( [], [] )

    else if compareAbsDigits numerator denominator == LT then
        ( [], numerator )

    else
        let
            step digit ( quotientBigEndian, remainder ) =
                let
                    shifted =
                        addAbsDigits (mulAbsByInt remainder base 0) [ digit ] 0

                    qDigit =
                        findQuotientDigit denominator shifted 0 (base - 1)

                    product =
                        mulAbsByInt denominator qDigit 0

                    nextRemainder =
                        trimHighZeros (subAbsDigits shifted product 0)
                in
                ( quotientBigEndian ++ [ qDigit ], nextRemainder )

            ( qBigEndian, r ) =
                List.foldl step ( [], [] ) (List.reverse numerator)
        in
        ( trimHighZeros (List.reverse qBigEndian), trimHighZeros r )


findQuotientDigit : List Int -> List Int -> Int -> Int -> Int
findQuotientDigit denominator remainder low high =
    if low > high then
        high

    else
        let
            mid =
                low + ((high - low) // 2)

            product =
                mulAbsByInt denominator mid 0
        in
        case compareAbsDigits product remainder of
            GT ->
                findQuotientDigit denominator remainder low (mid - 1)

            _ ->
                findQuotientDigit denominator remainder (mid + 1) high


toIntMaybe : BigInt -> Maybe Int
toIntMaybe value =
    case value of
        BigInt ZeroSign _ ->
            Just 0

        BigInt sign digits ->
            let
                build ds acc =
                    case ds of
                        [] ->
                            Just acc

                        x :: xs ->
                            if acc > 214747 then
                                Nothing

                            else
                                build xs (acc * base + x)
            in
            case build (List.reverse digits) 0 of
                Nothing ->
                    Nothing

                Just n ->
                    if sign == Negative then
                        Just -n

                    else
                        Just n


toString : BigInt -> String
toString value =
    case value of
        BigInt ZeroSign _ ->
            "0"

        BigInt sign digits ->
            let
                chunks =
                    List.reverse digits

                body =
                    case chunks of
                        [] ->
                            "0"

                        first :: rest ->
                            String.fromInt first ++ String.concat (List.map pad4 rest)

                prefix =
                    if sign == Negative then
                        "-"

                    else
                        ""
            in
            prefix ++ body


pad4 : Int -> String
pad4 n =
    let
        s =
            String.fromInt n

        missing =
            4 - String.length s
    in
    String.repeat missing "0" ++ s
```

</details>


---

<sub>39s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/src/Pastafari/MonsterBase.elm.**

/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/src/Pastafari/MonsterBase.elm

<details>
<summary>94 lines</summary>

```
module Pastafari.MonsterBase exposing
    ( BaseContext
    , BaseDispatcher
    , BaseStatus(..)
    , Phase(..)
    , ValidationResult(..)
    , dispatch
    , newContext
    , neutralDispatcher
    , recordMetric
    , validateBaseContext
    )

import Dict exposing (Dict)
import Pastafari.ExactInt exposing (BigInt)


type Phase
    = BootstrapEntry
    | BootstrapValidation
    | BootstrapReady


type BaseStatus
    = New
    | Validating
    | Ready
    | Failed


type alias BaseContext =
    { calculationDay : BigInt
    , targetDay : BigInt
    , phase : Phase
    , status : BaseStatus
    , branchTrace : List String
    , metrics : Dict String Int
    , diagnostics : List String
    }


type alias BaseDispatcher =
    { next : Phase -> Phase
    }


type ValidationResult
    = Valid BaseContext
    | Invalid BaseContext String


newContext : BigInt -> BigInt -> BaseContext
newContext calculationDay targetDay =
    { calculationDay = calculationDay
    , targetDay = targetDay
    , phase = BootstrapEntry
    , status = New
    , branchTrace = [ "BOOTSTRAP_ENTRY" ]
    , metrics = Dict.empty
    , diagnostics = []
    }


neutralDispatcher : BaseDispatcher
neutralDispatcher =
    { next =
        \phase ->
            case phase of
                BootstrapEntry ->
                    BootstrapValidation

                BootstrapValidation ->
                    BootstrapReady

                BootstrapReady ->
                    BootstrapReady
    }


dispatch : BaseDispatcher -> BaseContext -> BaseContext
dispatch dispatcher context =
    let
        nextPhase =
            dispatcher.next context.phase
    in
    { context
        | phase = nextPhase
        , branchTrace = context.branchTrace ++ [ phaseToken nextPhase ]
    }


phaseToken : Phase -> String
phaseToken phase =
    case phase of
        BootstrapEntry ->
            "BOOTSTRAP_ENTRY"

        BootstrapValidation ->
            "BOOTSTRAP_VALIDATION"

        BootstrapReady ->
            "BOOTSTRAP_READY"


recordMetric : String -> BaseContext -> BaseContext
recordMetric key context =
    let
        nextValue =
            Dict.get key context.metrics
                |> Maybe.withDefault 0
                |> (+) 1
    in
    { context | metrics = Dict.insert key nextValue context.metrics }


validateBaseContext : BaseContext -> ValidationResult
validateBaseContext context =
    if List.isEmpty context.branchTrace then
        Invalid { context | status = Failed } "Grunnsamhengið vantar framkvæmdarslóð."

    else
        Valid { context | status = Ready }
```

</details>


---

<sub>39s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/tests/Stage01Harness.elm.**

/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/tests/Stage01Harness.elm

<details>
<summary>24 lines</summary>

```
port module Stage01Harness exposing (main)

import Platform
import Stage01Checks


port report : String -> Cmd msg


type Msg
    = NoOp


type alias Model =
    ()


init : () -> ( Model, Cmd Msg )
init _ =
    ( (), report Stage01Checks.summary )


update : Msg -> Model -> ( Model, Cmd Msg )
update _ model =
    ( model, Cmd.none )


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none


main : Program () Model Msg
main =
    Platform.worker
        { init = init
        , update = update
        , subscriptions = subscriptions
        }
```

</details>


---

<sub>39s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/tests/Stage01Checks.elm.**

/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/tests/Stage01Checks.elm

<details>
<summary>376 lines</summary>

```
module Stage01Checks exposing (allPassed, summary)

import Array
import BootstrapFixtures as Fixtures
import Dict
import Pastafari.ExactInt as BI
import Pastafari.MonsterBase as MonsterBase
import Pastafari.SourceLanguageCatalog as Catalog
import Pastafari.Spaghetti as Spaghetti
import NormativeOracle as Oracle
import Set



type alias Check =
    { name : String
    , passed : Bool
    , expected : String
    , actual : String
    }


check : String -> Bool -> String -> String -> Check
check name passed expected actual =
    { name = name
    , passed = passed
    , expected = expected
    , actual = actual
    }


bigCheck : String -> BI.BigInt -> BI.BigInt -> Check
bigCheck name expected actual =
    check name (BI.equal expected actual) (BI.toString expected) (BI.toString actual)


listIntString : List Int -> String
listIntString values =
    "[" ++ String.join "," (List.map String.fromInt values) ++ "]"


listCheck : String -> List Int -> List Int -> Check
listCheck name expected actual =
    check name (expected == actual) (listIntString expected) (listIntString actual)


indicesExactly : Int -> List Catalog.CatalogEntry -> Bool
indicesExactly count entries =
    let
        indices =
            List.map .canonicalIndex entries
    in
    List.length entries == count
        && List.sort indices == List.range 1 count
        && List.all (\entry -> not (String.isEmpty entry.text)) entries


allUniqueStrings : List String -> Bool
allUniqueStrings values =
    Set.size (Set.fromList values) == List.length values


sameSauce : Oracle.SauceResult -> Oracle.SauceResult -> Bool
sameSauce left right =
    List.map BI.toString (Array.toList left.bowls)
        == List.map BI.toString (Array.toList right.bowls)
        && left.orderAtDrop46
        == right.orderAtDrop46




sameContext : MonsterBase.BaseContext -> MonsterBase.BaseContext -> Bool
sameContext left right =
    BI.equal left.calculationDay right.calculationDay
        && BI.equal left.targetDay right.targetDay
        && left.phase == right.phase
        && left.status == right.status
        && left.branchTrace == right.branchTrace
        && Dict.toList left.metrics == Dict.toList right.metrics
        && left.diagnostics == right.diagnostics


sameContextPair : ( MonsterBase.BaseContext, MonsterBase.BaseContext ) -> ( MonsterBase.BaseContext, MonsterBase.BaseContext ) -> Bool
sameContextPair ( leftA, leftB ) ( rightA, rightB ) =
    sameContext leftA rightA && sameContext leftB rightB


stoneSignature : Oracle.Stone -> List String
stoneSignature stone =
    [ BI.toString stone.wheat
    , BI.toString stone.barley
    , BI.toString stone.salt
    , BI.toString stone.bitter
    , BI.toString stone.red
    ]


divisionIdentity : BI.BigInt -> BI.BigInt -> Bool
divisionIdentity numerator denominator =
    let
        quotient =
            BI.floorDivPositive numerator denominator

        remainder =
            BI.regularMod numerator denominator
    in
    BI.equal numerator (BI.add (BI.mul quotient denominator) remainder)
        && BI.compareBig remainder BI.zero /= LT
        && BI.compareBig remainder denominator == LT


checks : List Check
checks =
    let
        modulus =
            Oracle.m

        foundation =
            Oracle.foundationDay

        countsSame =
            Oracle.workCounts foundation foundation

        countsCross =
            Oracle.workCounts (BI.sub foundation BI.one) (BI.add foundation BI.one)

        weaveCount =
            Oracle.countWeavingsForLengths [ 2, 2 ]

        contextA =
            MonsterBase.newContext (BI.fromInt 1) (BI.fromInt 2)

        contextB =
            MonsterBase.newContext (BI.fromInt 3) (BI.fromInt 4)

        contextAChanged =
            contextA
                |> MonsterBase.dispatch MonsterBase.neutralDispatcher
                |> MonsterBase.recordMetric "bootstrap.eignarhald.a"

        contextBExpected =
            MonsterBase.newContext (BI.fromInt 3) (BI.fromInt 4)

        sequenceAB =
            let
                a =
                    MonsterBase.newContext (BI.fromInt 11) (BI.fromInt 12)
                        |> MonsterBase.recordMetric "bootstrap.röð.a"
                        |> MonsterBase.dispatch MonsterBase.neutralDispatcher

                b =
                    MonsterBase.newContext (BI.fromInt 21) (BI.fromInt 22)
                        |> MonsterBase.recordMetric "bootstrap.röð.b"
                        |> MonsterBase.dispatch MonsterBase.neutralDispatcher
            in
            ( a, b )

        sequenceBA =
            let
                b =
                    MonsterBase.newContext (BI.fromInt 21) (BI.fromInt 22)
                        |> MonsterBase.recordMetric "bootstrap.röð.b"
                        |> MonsterBase.dispatch MonsterBase.neutralDispatcher

                a =
                    MonsterBase.newContext (BI.fromInt 11) (BI.fromInt 12)
                        |> MonsterBase.recordMetric "bootstrap.röð.a"
                        |> MonsterBase.dispatch MonsterBase.neutralDispatcher
            in
            ( a, b )

        spaghettiBootstrap =
            Spaghetti.calendarDateSpaghetti (BI.fromInt 1) (BI.fromInt 2)

        mSquared =
            BI.mul modulus modulus

        negativeSeven =
            BI.fromInt -7

        three =
            BI.fromInt 3

        divisionWitnesses =
            [ ( BI.zero, BI.one )
            , ( BI.one, three )
            , ( BI.fromInt -7, three )
            , ( modulus, BI.fromInt 97 )
            , ( BI.negate mSquared, BI.fromInt 10000 )
            , ( BI.add mSquared (BI.fromInt 12345), modulus )
            ]

        shortRejectStream =
            { first = modulus, directionStep = -1 }

        wideStream =
            { first = BI.one, directionStep = 1 }

        wideN =
            BI.add modulus BI.one

        hugeGateMagnitude =
            BI.powSmall 2 31

        hugePositiveGateGap =
            Oracle.positiveGateGap hugeGateMagnitude

        negativeFirstGateGap =
            Oracle.negativeGateGap BI.one

        stone2 =
            Array.get 1 Oracle.buildStones

        sauceA =
            Oracle.sauce foundation foundation

        sauceB =
            Oracle.sauce foundation (BI.add foundation BI.one)

        sauceAAgain =
            Oracle.sauce foundation foundation

        cutletTexts =
            List.map .text Catalog.cutletEntries

        monthTexts =
            List.map .text Catalog.monthEntries

        sourceIds =
            List.map .sourceId Catalog.cutletEntries ++ List.map .sourceId Catalog.monthEntries

        unicodeSortedCutletIndices =
            Catalog.cutletEntries
                |> List.sortBy .text
                |> List.map .canonicalIndex
    in
    [ check
        "Stóri teljarinn er nákvæmlega 2^127-1"
        (BI.toString modulus == Fixtures.modulusDecimal)
        Fixtures.modulusDecimal
        (BI.toString modulus)
    , bigCheck "Spjaldadagur er 14.777.149 dögum eftir grunndag" (BI.fromInt Fixtures.tabletsFromFoundation) (BI.sub Oracle.tabletsDay foundation)
    , check
        "Hámarkslengd árs er nákvæmlega 5778 dagar"
        (Oracle.yearMaxDays == 5778)
        "5778"
        (String.fromInt Oracle.yearMaxDays)
    , bigCheck "SAVE(1)" BI.one (Oracle.save BI.one)
    , bigCheck "SAVE(M-1)" (BI.sub modulus BI.one) (Oracle.save (BI.sub modulus BI.one))
    , bigCheck "SAVE(M)" modulus (Oracle.save modulus)
    , bigCheck "SAVE(M+1)" BI.one (Oracle.save (BI.add modulus BI.one))
    , bigCheck "SAVE(2M)" modulus (Oracle.save (BI.mulSmall modulus 2))
    , bigCheck "Nákvæm deiling M^2 með M" modulus (BI.floorDivPositive mSquared modulus)
    , bigCheck "Nákvæm leif M^2 með M" BI.zero (BI.regularMod mSquared modulus)
    , bigCheck "Gólfdeiling -7 með 3" (BI.fromInt -3) (BI.floorDivPositive negativeSeven three)
    , bigCheck "Euklíðsk leif -7 með 3" (BI.fromInt 2) (BI.regularMod negativeSeven three)
    , check
        "Gólfdeiling og euklíðsk leif uppfylla n=q*d+r á öllum Bootstrap-vitnum"
        (List.all (\( numerator, denominator ) -> divisionIdentity numerator denominator) divisionWitnesses)
        "n=q*d+r og 0<=r<d fyrir öll vitni"
        "ákveðinn listi jákvæðra og neikvæðra stórra heiltalna"
    , bigCheck "Dagatalning á grunndegi" BI.one (Oracle.dayCount foundation)
    , bigCheck "Dagatalning degi eftir grunn" (BI.fromInt 3) (Oracle.dayCount (BI.add foundation BI.one))
    , bigCheck "Dagatalning degi fyrir grunn" (BI.fromInt 2) (Oracle.dayCount (BI.sub foundation BI.one))
    , bigCheck "Fjarlægð þegar dagarnir eru jafnir" BI.one countsSame.distance
    , bigCheck "Stefna þegar dagarnir eru jafnir" (BI.fromInt 2) countsSame.direction
    , bigCheck "Fjarlægð yfir grunndag" (BI.fromInt 3) countsCross.distance
    , bigCheck "Tenging yfir grunndag" (BI.fromInt 5) countsCross.connection
    , check
        "Steinataflan inniheldur nákvæmlega 46 raðir"
        (Array.length Oracle.buildStones == 46)
        "46"
        (String.fromInt (Array.length Oracle.buildStones))
    , check
        "Önnur steinaröðin kemur öll úr sama gamla ástandi"
        (case stone2 of
            Just stone ->
                stoneSignature stone == Fixtures.secondStoneSignature

            Nothing ->
                False
        )
        ("[" ++ String.join "," Fixtures.secondStoneSignature ++ "]")
        (case stone2 of
            Just stone ->
                "[" ++ String.join "," (stoneSignature stone) ++ "]"

            Nothing ->
                "engin önnur röð"
        )
    , listCheck "Fyrsta sex skála umröðunin" [ 1, 2, 3, 4, 5, 6 ] (Oracle.permutationUnrank1 1 [ 1, 2, 3, 4, 5, 6 ])
    , listCheck "Síðasta sex skála umröðunin" [ 6, 5, 4, 3, 2, 1 ] (Oracle.permutationUnrank1 720 [ 1, 2, 3, 4, 5, 6 ])
    , bigCheck "Fallandi margfeldi 5P3" (BI.fromInt 60) (Oracle.fallingFactorial 5 3)
    , check
        "Fallandi margfeldi 47P47 fer yfir stóra teljarann án styttingar"
        (BI.compareBig (Oracle.fallingFactorial 47 47) modulus == GT)
        "stærra en M"
        (BI.toString (Oracle.fallingFactorial 47 47))
    , listCheck "Fyrsta hlutumröðun 5P3" [ 1, 2, 3 ] (Oracle.unrankDistinctIndices 5 3 BI.one)
    , listCheck "Síðasta hlutumröðun 5P3" [ 5, 4, 3 ] (Oracle.unrankDistinctIndices 5 3 (BI.fromInt 60))
    , bigCheck "Kótelettuskipting með skyldum innri mörkum hefur réttan fjölda" BI.one (Oracle.countCutletPartitionsForTest 4 2 (Just 2))
    , listCheck "Kótelettuskipting með skyldu innra marki" [ 2, 2 ] (Oracle.unrankCutletPartition 4 2 (Just 2) BI.one)
    , bigCheck "Fjöldi takmarkaðra samsetninga" (BI.fromInt 4) (Oracle.countBoundedCompositions 5 2 1 4)
    , listCheck "Þriðja takmarkaða samsetningin" [ 3, 2 ] (Oracle.unrankBoundedComposition 5 2 1 4 (BI.fromInt 3))
    , bigCheck "Fjöldi löglegra vefja fyrir [2,2]" (BI.fromInt 2) weaveCount
    , listCheck "Annar löglegi vefurinn fyrir [2,2]" [ 1, 2, 1, 2 ] (Oracle.unrankWeavingForLengths [ 2, 2 ] (BI.fromInt 2))
    , listCheck "Eini löglegi vefurinn fyrir [1,1]" [ 1, 2 ] (Oracle.unrankWeavingForLengths [ 1, 1 ] BI.one)
    , bigCheck "Svarhringur afturábak vefst frá 1 yfir í M" modulus (Oracle.answerAt { first = BI.one, directionStep = -1 } 1)
    , bigCheck "Stutt val með N=1" BI.one (Oracle.chooseRankShort wideStream BI.one)
    , bigCheck "Stutt val með N=M" modulus (Oracle.chooseRankShort { first = modulus, directionStep = 1 } modulus)
    , bigCheck "Stutt höfnun heldur áfram í sama svarhring" (BI.fromInt 10) (Oracle.chooseRankShort shortRejectStream (BI.fromInt 10))
    , bigCheck "Vítt val með N=M+1 notar samsetta breiða tölu" wideN (Oracle.chooseRankWide wideStream wideN)
    , bigCheck "Valdreifari sendir N=M+1 í víðu leiðina" wideN (Oracle.chooseRank wideStream wideN)
    , check
        "Jákvæð hliðaspurning tekur við vísitölu yfir hefðbundnu Int-sviði án styttingar"
        (BI.compareBig hugePositiveGateGap (BI.fromInt 42) /= LT
            && BI.compareBig hugePositiveGateGap (BI.fromInt 963) /= GT
        )
        "42..963"
        (BI.toString hugePositiveGateGap)
    , check
        "Neikvætt fyrsta hliðabil er innan staðlaðra marka"
        (BI.compareBig negativeFirstGateGap (BI.fromInt 42) /= LT
            && BI.compareBig negativeFirstGateGap (BI.fromInt 963) /= GT
        )
        "42..963"
        (BI.toString negativeFirstGateGap)
    , check
        "Sósan skilar sex skálum og umröðun allra sex skála"
        (Array.length sauceA.bowls == 6 && List.sort sauceA.orderAtDrop46 == List.range 1 6)
        "sex skálar og umröðun 1..6"
        (String.fromInt (Array.length sauceA.bowls) ++ " skálar; röð " ++ listIntString sauceA.orderAtDrop46)
    , check
        "Endurtekin sósa er óháð millikalli og endurnýtingu myndaðra gagna"
        (sameSauce sauceA sauceAAgain && Array.length sauceB.bowls == 6)
        "sama niðurstaða fyrir sama inntak eftir millikall"
        (if sameSauce sauceA sauceAAgain then "sama niðurstaða" else "frávik eftir millikall")
    , check
        "Sautján kótelettunöfn hafa nákvæma canonicalIndex-röð"
        (indicesExactly 17 Catalog.cutletEntries)
        "1..17, hvert gildi einu sinni"
        (String.fromInt (List.length Catalog.cutletEntries) ++ " færslur")
    , check
        "Fjörutíu og sjö mánaðarnöfn hafa nákvæma canonicalIndex-röð"
        (indicesExactly 47 Catalog.monthEntries)
        "1..47, hvert gildi einu sinni"
        (String.fromInt (List.length Catalog.monthEntries) ++ " færslur")
    , check
        "Fryst kótelettuskrá hefur nákvæm íslensk heiti"
        (cutletTexts == Fixtures.cutletTexts)
        (String.join " | " Fixtures.cutletTexts)
        (String.join " | " cutletTexts)
    , check
        "Fryst mánaðaskrá hefur nákvæm íslensk heiti"
        (monthTexts == Fixtures.monthTexts)
        (String.join " | " Fixtures.monthTexts)
        (String.join " | " monthTexts)
    , check
        "Vélaauðkenni katalógsins eru ótvíræð"
        (allUniqueStrings sourceIds)
        "öll sourceId einstök"
        (String.fromInt (List.length sourceIds) ++ " auðkenni")
    , check
        "Unicode-röðun íslensku strengjanna er ekki canonicalIndex-röðin"
        (unicodeSortedCutletIndices /= List.range 1 17)
        "mismunandi raðir"
        (listIntString unicodeSortedCutletIndices)
    , check
        "Grunnsamhengi tveggja kallana deilir ekki framkvæmdarslóð"
        (contextA.branchTrace == [ "BOOTSTRAP_ENTRY" ] && contextB.branchTrace == [ "BOOTSTRAP_ENTRY" ])
        "tvær óháðar slóðir"
        "tvær sjálfstæðar færslur"
    , check
        "Breyting á mælingu og stigi í einu samhengi breytir ekki hinu"
        (sameContext contextB contextBExpected
            && BI.equal contextAChanged.calculationDay contextA.calculationDay
            && BI.equal contextAChanged.targetDay contextA.targetDay
            && Dict.get "bootstrap.eignarhald.a" contextB.metrics == Nothing
        )
        "annað samhengi ósnert og inntak þess fyrra óbreytt"
        "samhengi skoðuð eftir sjálfstæðar umbreytingar"
    , check
        "Röð sjálfstæðra samhengiútreikninga breytir ekki niðurstöðu"
        (sameContextPair sequenceAB sequenceBA)
        "sama par óháð byggingarröð"
        (if sameContextPair sequenceAB sequenceBA then "sama par" else "mismunandi par")
    , check
        "Framleiðsluskelin stöðvast vísvitandi í Bootstrap"
        (case spaghettiBootstrap of
            Err Spaghetti.BootstrapOnly ->
                True

            _ ->
                False
        )
        "BootstrapOnly"
        (case spaghettiBootstrap of
            Err Spaghetti.BootstrapOnly ->
                "BootstrapOnly"

            Err (Spaghetti.BaseValidationFailed _) ->
                "BaseValidationFailed"

            Ok _ ->
                "óvænt niðurstaða"
        )
    ]


renderCheck : Check -> String
renderCheck item =
    if item.passed then
        "PASS — " ++ item.name

    else
        "FAIL — "
            ++ item.name
            ++ " | vænt: "
            ++ item.expected
            ++ " | fékk: "
            ++ item.actual


allPassed : Bool
allPassed =
    List.all .passed checks


summary : String
summary =
    let
        passed =
            List.filter .passed checks |> List.length

        total =
            List.length checks

        state =
            if allPassed then
                "GRÆNT"

            else
                "RAUTT"
    in
    "Stage 1 prófanir: "
        ++ String.fromInt passed
        ++ "/"
        ++ String.fromInt total
        ++ " standast. Staða: "
        ++ state
        ++ "\n"
        ++ String.join "\n" (List.map renderCheck checks)
```

</details>


---

<sub>39s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/tests/BootstrapFixtures.elm.**

/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/tests/BootstrapFixtures.elm

<details>
<summary>86 lines</summary>

```
module BootstrapFixtures exposing
    ( cutletTexts
    , modulusDecimal
    , monthTexts
    , secondStoneSignature
    , tabletsFromFoundation
    )


modulusDecimal : String
modulusDecimal =
    "170141183460469231731687303715884105727"


tabletsFromFoundation : Int
tabletsFromFoundation =
    14777149


secondStoneSignature : List String
secondStoneSignature =
    [ "378", "1073", "2375", "6195", "10493" ]


cutletTexts : List String
cutletTexts =
    [ "brons"
    , "refur"
    , "nýra"
    , "Lagash"
    , "hugsun"
    , "fjórir hlutar af níu"
    , "Palgúrasj"
    , "papýrussef"
    , "klasi"
    , "sporðdreki"
    , "aska"
    , "hveiti"
    , "á"
    , "hlátur"
    , "Akkad"
    , "horn"
    , "tóma krukkan"
    ]


monthTexts : List String
monthTexts =
    [ "leir"
    , "granatepli"
    , "olnbogi"
    , "öfund"
    , "Erídú"
    , "tannkrem"
    , "þrír hlutar af fimm"
    , "Karsjúmav"
    , "hlébarði"
    , "tin"
    , "mistur"
    , "reykelsi"
    , "snælda"
    , "rif"
    , "jóhannesarbrauð"
    , "Úrúk"
    , "skömm"
    , "úlfaldi"
    , "kopar"
    , "brunnur"
    , "eggjarauða"
    , "stjarna"
    , "hunang"
    , "milta"
    , "kalksteinn"
    , "gleði"
    , "fíkja"
    , "Níníve"
    , "froskur"
    , "bik"
    , "lampi"
    , "lokaða hurðin"
    , "sesam"
    , "hnakki"
    , "silfur"
    , "Súsa"
    , "stormur"
    , "asni"
    , "mjöl"
    , "eftirsjá"
    , "Babýlon"
    , "tunga"
    , "hör"
    , "salt"
    , "pera"
    , "bogi"
    , "sandur"
    ]
```

</details>


---

<sub>39s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/tests/NormativeOracle.elm.**

/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/tests/NormativeOracle.elm

```
File too large to read at once (58.3 KB). Consider using the grep tool to search within the file, or view with view_range to read specific sections.
```


---

<sub>39s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/elm.json.**

/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/elm.json

<details>
<summary>19 lines</summary>

```
{
  "type": "application",
  "source-directories": [
    "src",
    "tests"
  ],
  "elm-version": "0.19.1",
  "dependencies": {
    "direct": {
      "elm/core": "1.0.5",
      "elm/json": "1.1.3"
    },
    "indirect": {}
  },
  "test-dependencies": {
    "direct": {},
    "indirect": {}
  }
}
```

</details>


---

<sub>39s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/CANONICAL_NAMES_LOCK.sha256.**

/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/CANONICAL_NAMES_LOCK.sha256

```
d0f03849ab89ea0a414d56d3ca287c53ab1a7fcd3772ed1edcc1ddbbf53623f1  src/Pastafari/SourceLanguageCatalog.elm

```


---

<sub>57s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/.git/HEAD.**

/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/.git/HEAD

```
ref: refs/heads/Elm+íslensku

```


---

<sub>57s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/.git/refs/heads/Elm+íslensku.**

/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/.git/refs/heads/Elm+íslensku

```
825585ec2789ba96cc9ac68312375fcd234dbcc7

```


---

<sub>57s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/.git/packed-refs.**

/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/.git/packed-refs

```
# pack-refs with: peeled fully-peeled sorted 
825585ec2789ba96cc9ac68312375fcd234dbcc7 refs/remotes/origin/Elm+íslensku

```


---

<sub>57s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/.git/config.**

/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/.git/config

<details>
<summary>11 lines</summary>

```
[core]
	repositoryformatversion = 0
	filemode = true
	bare = false
	logallrefupdates = true
[remote "origin"]
	url = https://github.com/Sargon17-Green/Pastafarian-Calendar.git
	fetch = +refs/heads/Elm+íslensku:refs/remotes/origin/Elm+íslensku
[branch "Elm+íslensku"]
	remote = origin
	merge = refs/heads/Elm+íslensku
```

</details>


---

<sub>57s</sub>

### `rg`

**(Carob|carob|jóhannesarbrauð|Karób|karób|Papýrus|papýrus|papyrus|mistur|Þoka|Eridu|Erídú|Uruk|Úrúk|Susa|Súsa)**

"(Carob|carob|jóhannesarbrauð|Karób|karób|Papýrus|papýrus|papyrus|mistur|Þoka|Eridu|Erídú|Uruk|Úrúk|Susa|Súsa)" (docs/i18n/locales/is.js, docs/about/content/is.html, artifacts/cross-repo-native-qa/runtime/repo2-0)

<details>
<summary>30 matches</summary>

```
[grep content: 25 matches across 5 file(s) under /home/runner/work/pastafari-calendar/pastafari-calendar]

artifacts/cross-repo-native-qa/runtime/repo2-0/SOURCE_LANGUAGE_CATALOG.md (6 match(es)):
  20: 8. papýrussef
  37: 5. Erídú
  43: 11. mistur
  47: 15. jóhannesarbrauð
  48: 16. Úrúk
  68: 36. Súsa

docs/i18n/locales/is.js (6 match(es)):
  278:       "papyrusSedge": "Papýrusstör",
  294:       "eridu": "Eridu",
  300:       "mist": "Þoka",
  304:       "carob": "Karób",
  305:       "uruk": "Uruk",
  325:       "susa": "Susa",

artifacts/cross-repo-native-qa/runtime/repo2-0/tests/BootstrapFixtures.elm (6 match(es)):
  34:     , "papýrussef"
  53:     , "Erídú"
  59:     , "mistur"
  63:     , "jóhannesarbrauð"
  64:     , "Úrúk"
  84:     , "Súsa"

artifacts/cross-repo-native-qa/runtime/repo2-0/src/Pastafari/SourceLanguageCatalog.elm (6 match(es)):
  32:     , { canonicalIndex = 8, sourceId = "PAPYRUS_SEDGE", text = "papýrussef" }
  51:     , { canonicalIndex = 5, sourceId = "ERIDU", text = "Erídú" }
  57:     , { canonicalIndex = 11, sourceId = "MIST", text = "mistur" }
  61:     , { canonicalIndex = 15, sourceId = "CAROB", text = "jóhannesarbrauð" }
  62:     , { canonicalIndex = 16, sourceId = "URUK", text = "Úrúk" }
  82:     , { canonicalIndex = 36, sourceId = "SUSA", text = "Súsa" }
artifacts/cross-repo-native-qa/runtime/repo2-0/README.md:15: Staðanöfn með rótgróinni latneskri eða íslenskri ritmynd nota þá ritmynd: `Akkad`, `Erídú`, `Úrúk`, `Níníve` og `Babýlon`. Þessi texti hefur engin áhrif á staðlaða röðun.
```

</details>


---

<sub>57s</sub>

### `rg`

**^(\s*--|\s*\{-|\s*\*|#+\s|[A-Z][A-Z_]+:|\s*"[^"]+"\s*[:=])**

"^(\s*--|\s*\{-|\s*\*|#+\s|[A-Z][A-Z_]+:|\s*"[^"]+"\s*[:=])" in *.elm (artifacts/cross-repo-native-qa/runtime/repo2-0/src, artifacts/cross-repo-native-qa/runtime/repo2-0/tests)

```
No matches found.
```


---

<sub>1m 1s</sub>

### `rg`

**kót[ie]l|Kót[ie]l|sós|Sós|aðgerðardag|verknaðardag|fyrirspurnardag|skorðu|forrit|tungumál**

"kót[ie]l|Kót[ie]l|sós|Sós|aðgerðardag|verknaðardag|fyrirspurnardag|skorðu|forrit|tungumál" (artifacts/cross-repo-native-qa/runtime/repo2-0)

<details>
<summary>27 matches</summary>

```
[grep content: 22 matches across 7 file(s) under /home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0]
SOURCE_LANGUAGE_CATALOG.md:11: ## Kótelettur

README.md (3 match(es)):
  3: Þetta verkefni er sjálfstæð grunnsmíð Stage 1 fyrir Elm-línuna með íslensku sem eina mannlega frumtextamálið. Verkefnið var stofnað frá auðu tré og notar engin forrit, prófanir, niðurstöður, töflur, skyndiminni, rekjanir eða gátreikninga úr annarri útfærslu.
  7: `Pastafari.ExactInt` veitir nákvæman heiltölureikning með ótakmarkaðri stærð, skrifaðan í Elm. `NormativeOracle` er prófunar-eingöngu bein útfærsla á innbyggða staðlaða viðmiðinu. `Pastafari.SourceLanguageCatalog` frystir 17 kótelettunöfn og 47 mánaðarnöfn með föstum `canonicalIndex`. `Pastafari.MonsterBase` er aðeins hlutlaus grunnur fyrir samhengi, stýringu, staðfestingu og mælingar. `Pastafari.Spaghetti` inniheldur enn enga eldri villuleið og enga leiðréttingarrökfræði úr síðari stigum.
  31: Hrein próf má síðan keyra beint í Elm-verkfærakeðjunni án sérsmíðaðs hjálparkóða í öðru forritunarmáli:
STAGE_01_OWNERSHIP_AUDIT.md:27: `Stage01Checks` inniheldur sérstakan vitnisburð sem reiknar sömu sósu, reiknar aðra sósu á milli og reiknar síðan fyrri sósuna aftur. Niðurstöður fyrra inntaks verða að vera nákvæmlega eins fyrir og eftir millikallið. Þannig er endurnýting steinatöflunnar og annarra óbreytanlegra gilda prófuð gegn söguháðri mengun.

tests/Stage01Checks.elm (6 match(es)):
  302:     , bigCheck "Kótelettuskipting með skyldum innri mörkum hefur réttan fjölda" BI.one (Oracle.countCutletPartitionsForTest 4 2 (Just 2))
  303:     , listCheck "Kótelettuskipting með skyldu innra marki" [ 2, 2 ] (Oracle.unrankCutletPartition 4 2 (Just 2) BI.one)
  330:         "Sósan skilar sex skálum og umröðun allra sex skála"
  335:         "Endurtekin sósa er óháð millikalli og endurnýtingu myndaðra gagna"
  340:         "Sautján kótelettunöfn hafa nákvæma canonicalIndex-röð"
  350:         "Fryst kótelettuskrá hefur nákvæm íslensk heiti"

tests/NormativeOracle.elm (4 match(es)):
  1773:                 Debug.todo "Röð kótilettuskiptingar fór út fyrir löglegu fjölskylduna."
  1859:         |> expectMaybe "Kótilettufjöldi hafði engan gildan frambjóðanda."
  2068:         |> expectMaybe "Markdagurinn fannst ekki í neinni kótilettu."
  2125:             |> expectMaybe "Kótilettuvísitala vantar í frysta íslenska katalóginn."
SPAGHETTI_DEVELOPMENT_HISTORY.md:7: Verkefnið var stofnað frá auðu tré fyrir Elm og íslensku. Sjálfstæður nákvæmur heiltölukjarni var skrifaður í Elm, staðlaða viðmiðunarvélin var endurgerð beint úr innbyggða viðmiðinu og sérstök hrein Elm-prófunarumgjörð var búin til. `SourceLanguageCatalog` var frystur með 17 kótilettum og 47 mánuðum.

STAGE_01_NORMATIVE_AUDIT.md (6 match(es)):
  15: ## Sósan
  27: Jákvæð hlið spyr um `FOUNDATION+n` og neikvæð hlið um `FOUNDATION-n`. Hliðabil eru 42..963 dagar. Árslengd er 252..5778 dagar; 5779 og hærra komast ekki í gildan árskost. Ár 5000 er valið úr pörum sem innihalda verknaðardaginn á bilinu `(open,close]`, fyrst eftir lengd og síðan eftir fyrra opnunarhliði við jafna lengd. Ferð til markárs er ár fyrir ár. Opnunarhliðið tilheyrir fyrra ári vegna skilyrðisins `targetDay <= openGateDay` í afturleit.
  29: ## Kótilettur og mánuðir
  31: Fjöldi kótiletta er takmarkaður við 6..17 og ekki meiri en fjöldi hliðabila ársins. Skipting kótiletta er nákvæm lexíkógrafísk talning/opnun; ef verknaðardagurinn er innra hlið verður það millimark skiptingarinnar. Nöfn eru valin sem hlutumraðanir án endurtekningar og innri merkingin er `canonicalIndex`.
  37: `calendarDateCanonical` skilar nákvæmlega fimm merkingarsviðum. `calendarDate` leysir aðeins kótilettu- og mánaðarvísitölur yfir í fryst íslensk heiti. Ekkert í `src/` flytur inn `NormativeOracle`, þannig að framleiðsluskelin getur ekki notað viðmiðunarvélina sem varaleið eða leiðréttingu.
  39: Við úttektina fannst Elm-sértæk þýðingarvilla í eldri drögum: fjögurra og fimm staka tuple-gildi höfðu verið notuð í stuðlatöflum og í innra vali kótilettuskiptingar. Elm leyfir ekki slík tuple. Þau voru skipt út fyrir nafngreind record-gildi án merkingarbreytingar. Engin fjögurra eða fleiri staka tuple er eftir í Elm-kóðanum.
```

</details>


---

<sub>1m 1s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/.git/logs/HEAD.**

/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/.git/logs/HEAD

```
0000000000000000000000000000000000000000 825585ec2789ba96cc9ac68312375fcd234dbcc7 runner <runner@runnervmtr4k5.v2s5mew1dmoehkrdk1sz3qvhcb.phxx.internal.cloudapp.net> 1790452913 +0000	clone: from https://github.com/Sargon17-Green/Pastafarian-Calendar.git

```


---

<sub>1m 1s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/LICENSE.**

/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/LICENSE

<details>
<summary>19 lines</summary>

```
Copyright (c) Year 5000 Since the Creation of the World, The Flying Spaghetti Monster

Permission is hereby granted by the Flying Spaghetti Monster, free of charge,
to any person, carbohydrate, or other intelligent entity obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit any person, carbohydrate, or other
intelligent entity to whom the Software is furnished to do so, subject to the
following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

R’amen.
```

</details>


---

<sub>1m 1s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/.github/workflows/canonical-names-lock.yml.**

/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/.github/workflows/canonical-names-lock.yml

<details>
<summary>23 lines</summary>

```
name: Canonical Names Lock

on:
  push:
  pull_request:

permissions:
  contents: read

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Verify canonical names lock
        shell: bash
        run: |
          set -euo pipefail
          while read -r expected path; do
            [ -n "$expected" ] || continue
            actual="$(git cat-file blob "HEAD:$path" | sha256sum | cut -d' ' -f1)"
            if [ "$actual" != "$expected" ]; then
              echo "::error file=$path::Canonical name lock mismatch"
              exit 1
            fi
          done < CANONICAL_NAMES_LOCK.sha256
```

</details>


---

<sub>1m 1s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/manifest.webmanifest.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/manifest.webmanifest

```
File too large to read at once (24.9 KB). Consider using the grep tool to search within the file, or view with view_range to read specific sections.
```


---

<sub>1m 1s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/registry.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/registry.js (lines 1-220)

<details>
<summary>198 lines</summary>

```
"use strict";

import { CUTLETS, MONTHS } from "./calendar-identifiers.js?v=9-canonical-names";

export const DEFAULT_LOCALE = "en";
export const SUPPORT_LEVELS = Object.freeze(["complete", "partial", "experimental"]);

const LOCALE_ASSET_REVISION = "19-about-i18n";

function defineLocale(code, displayName, dir, intlLocale, support, loader, aliases = []) {
  const asset = `./locales/${code}.js?v=${LOCALE_ASSET_REVISION}`;
  return Object.freeze({
    code,
    displayName,
    dir,
    intlLocale,
    support,
    aliases: Object.freeze([...aliases]),
    ...(support === "experimental" ? { experimental: true } : {}),
    asset,
    loader,
  });
}

// Lightweight metadata only. Locale resources are loaded on demand by loadLocale().
// support is declared only here; locale source modules must not declare it.
export const LOCALES = Object.freeze([
  defineLocale("he", "עברית", "rtl", "he-IL", "complete", () => import("./locales/he.js?v=19-about-i18n")),
  defineLocale("en", "English", "ltr", "en-US", "complete", () => import("./locales/en.js?v=19-about-i18n")),
  defineLocale("af", "Afrikaans", "ltr", "af-ZA", "partial", () => import("./locales/af.js?v=19-about-i18n")),
  defineLocale("ar", "العربية", "rtl", "ar", "partial", () => import("./locales/ar.js?v=19-about-i18n")),
  defineLocale("az", "Azərbaycanca", "ltr", "az-AZ", "partial", () => import("./locales/az.js?v=19-about-i18n")),
  defineLocale("be", "Беларуская", "ltr", "be-BY", "partial", () => import("./locales/be.js?v=19-about-i18n")),
  defineLocale("bg", "Български", "ltr", "bg-BG", "partial", () => import("./locales/bg.js?v=19-about-i18n")),
  defineLocale("bn", "বাংলা", "ltr", "bn-BD", "partial", () => import("./locales/bn.js?v=19-about-i18n")),
  defineLocale("bs", "Bosanski", "ltr", "bs-BA", "partial", () => import("./locales/bs.js?v=19-about-i18n")),
  defineLocale("ca", "Català", "ltr", "ca-ES", "partial", () => import("./locales/ca.js?v=19-about-i18n")),
  defineLocale("cs", "Čeština", "ltr", "cs-CZ", "partial", () => import("./locales/cs.js?v=19-about-i18n")),
  defineLocale("da", "Dansk", "ltr", "da-DK", "partial", () => import("./locales/da.js?v=19-about-i18n")),
  defineLocale("de", "Deutsch", "ltr", "de-DE", "partial", () => import("./locales/de.js?v=19-about-i18n")),
  defineLocale("el", "Ελληνικά", "ltr", "el-GR", "partial", () => import("./locales/el.js?v=19-about-i18n")),
  defineLocale("eo", "Esperanto", "ltr", "eo", "partial", () => import("./locales/eo.js?v=19-about-i18n")),
  defineLocale("es", "Español", "ltr", "es-ES", "partial", () => import("./locales/es.js?v=19-about-i18n")),
  defineLocale("et", "Eesti", "ltr", "et-EE", "partial", () => import("./locales/et.js?v=19-about-i18n")),
  defineLocale("fa", "فارسی", "rtl", "fa-IR", "partial", () => import("./locales/fa.js?v=19-about-i18n")),
  defineLocale("fi", "Suomi", "ltr", "fi-FI", "partial", () => import("./locales/fi.js?v=19-about-i18n")),
  defineLocale("fil", "Filipino", "ltr", "fil-PH", "partial", () => import("./locales/fil.js?v=19-about-i18n")),
  defineLocale("fo", "Føroyskt", "ltr", "fo-FO", "partial", () => import("./locales/fo.js?v=19-about-i18n")),
  defineLocale("fr", "Français", "ltr", "fr-FR", "partial", () => import("./locales/fr.js?v=19-about-i18n")),
  defineLocale("fy", "Frysk", "ltr", "fy-NL", "partial", () => import("./locales/fy.js?v=19-about-i18n")),
  defineLocale("gl", "Galego", "ltr", "gl-ES", "partial", () => import("./locales/gl.js?v=19-about-i18n")),
  defineLocale("gu", "ગુજરાતી", "ltr", "gu-IN", "partial", () => import("./locales/gu.js?v=19-about-i18n")),
  defineLocale("ha", "Hausa", "ltr", "ha-NG", "partial", () => import("./locales/ha.js?v=19-about-i18n")),
  defineLocale("hi", "हिन्दी", "ltr", "hi-IN", "partial", () => import("./locales/hi.js?v=19-about-i18n")),
  defineLocale("hr", "Hrvatski", "ltr", "hr-HR", "partial", () => import("./locales/hr.js?v=19-about-i18n")),
  defineLocale("ht", "Kreyòl ayisyen", "ltr", "ht-HT", "partial", () => import("./locales/ht.js?v=19-about-i18n")),
  defineLocale("hu", "Magyar", "ltr", "hu-HU", "partial", () => import("./locales/hu.js?v=19-about-i18n")),
  defineLocale("hy", "Հայերեն", "ltr", "hy-AM", "partial", () => import("./locales/hy.js?v=19-about-i18n")),
  defineLocale("id", "Bahasa Indonesia", "ltr", "id-ID", "partial", () => import("./locales/id.js?v=19-about-i18n")),
  defineLocale("is", "Íslenska", "ltr", "is-IS", "partial", () => import("./locales/is.js?v=19-about-i18n")),
  defineLocale("it", "Italiano", "ltr", "it-IT", "partial", () => import("./locales/it.js?v=19-about-i18n")),
  defineLocale("ja", "日本語", "ltr", "ja-JP", "partial", () => import("./locales/ja.js?v=19-about-i18n")),
  defineLocale("jv", "Basa Jawa", "ltr", "jv-ID", "partial", () => import("./locales/jv.js?v=19-about-i18n")),
  defineLocale("ka", "ქართული", "ltr", "ka-GE", "partial", () => import("./locales/ka.js?v=19-about-i18n")),
  defineLocale("kk", "Қазақша", "ltr", "kk-KZ", "partial", () => import("./locales/kk.js?v=19-about-i18n")),
  defineLocale("ko", "한국어", "ltr", "ko-KR", "partial", () => import("./locales/ko.js?v=19-about-i18n")),
  defineLocale("lb", "Lëtzebuergesch", "ltr", "lb-LU", "partial", () => import("./locales/lb.js?v=19-about-i18n")),
  defineLocale("lt", "Lietuvių", "ltr", "lt-LT", "partial", () => import("./locales/lt.js?v=19-about-i18n")),
  defineLocale("lv", "Latviešu", "ltr", "lv-LV", "partial", () => import("./locales/lv.js?v=19-about-i18n")),
  defineLocale("mk", "Македонски", "ltr", "mk-MK", "partial", () => import("./locales/mk.js?v=19-about-i18n")),
  defineLocale("mr", "मराठी", "ltr", "mr-IN", "partial", () => import("./locales/mr.js?v=19-about-i18n")),
  defineLocale("ms", "Bahasa Melayu", "ltr", "ms-MY", "partial", () => import("./locales/ms.js?v=19-about-i18n")),
  defineLocale("nb", "Norsk bokmål", "ltr", "nb-NO", "partial", () => import("./locales/nb.js?v=19-about-i18n")),
  defineLocale("ne", "नेपाली", "ltr", "ne-NP", "partial", () => import("./locales/ne.js?v=19-about-i18n")),
  defineLocale("nl", "Nederlands", "ltr", "nl-NL", "partial", () => import("./locales/nl.js?v=19-about-i18n")),
  defineLocale("nn", "Norsk nynorsk", "ltr", "nn-NO", "partial", () => import("./locales/nn.js?v=19-about-i18n")),
  defineLocale("pa", "ਪੰਜਾਬੀ", "ltr", "pa-IN", "partial", () => import("./locales/pa.js?v=19-about-i18n")),
  defineLocale("pl", "Polski", "ltr", "pl-PL", "partial", () => import("./locales/pl.js?v=19-about-i18n")),
  defineLocale("pt", "Português", "ltr", "pt-BR", "partial", () => import("./locales/pt.js?v=19-about-i18n")),
  defineLocale("ro", "Română", "ltr", "ro-RO", "partial", () => import("./locales/ro.js?v=19-about-i18n")),
  defineLocale("ru", "Русский", "ltr", "ru-RU", "partial", () => import("./locales/ru.js?v=19-about-i18n")),
  defineLocale("sk", "Slovenčina", "ltr", "sk-SK", "partial", () => import("./locales/sk.js?v=19-about-i18n")),
  defineLocale("sl", "Slovenščina", "ltr", "sl-SI", "partial", () => import("./locales/sl.js?v=19-about-i18n")),
  defineLocale("so", "Soomaali", "ltr", "so-SO", "partial", () => import("./locales/so.js?v=19-about-i18n")),
  defineLocale("sq", "Shqip", "ltr", "sq-AL", "partial", () => import("./locales/sq.js?v=19-about-i18n")),
  defineLocale("sr", "Srpski", "ltr", "sr-Latn-RS", "partial", () => import("./locales/sr.js?v=19-about-i18n")),
  defineLocale("sv", "Svenska", "ltr", "sv-SE", "partial", () => import("./locales/sv.js?v=19-about-i18n")),
  defineLocale("sw", "Kiswahili", "ltr", "sw-TZ", "partial", () => import("./locales/sw.js?v=19-about-i18n")),
  defineLocale("ta", "தமிழ்", "ltr", "ta-IN", "partial", () => import("./locales/ta.js?v=19-about-i18n")),
  defineLocale("te", "తెలుగు", "ltr", "te-IN", "partial", () => import("./locales/te.js?v=19-about-i18n")),
  defineLocale("th", "ไทย", "ltr", "th-TH", "partial", () => import("./locales/th.js?v=19-about-i18n")),
  defineLocale("tr", "Türkçe", "ltr", "tr-TR", "partial", () => import("./locales/tr.js?v=19-about-i18n")),
  defineLocale("uk", "Українська", "ltr", "uk-UA", "partial", () => import("./locales/uk.js?v=19-about-i18n")),
  defineLocale("ur", "اردو", "rtl", "ur-PK", "partial", () => import("./locales/ur.js?v=19-about-i18n")),
  defineLocale("uz", "O‘zbekcha", "ltr", "uz-UZ", "partial", () => import("./locales/uz.js?v=19-about-i18n")),
  defineLocale("vi", "Tiếng Việt", "ltr", "vi-VN", "partial", () => import("./locales/vi.js?v=19-about-i18n")),
  defineLocale("yo", "Yorùbá", "ltr", "yo-NG", "partial", () => import("./locales/yo.js?v=19-about-i18n")),
  defineLocale("zh", "简体中文", "ltr", "zh-CN", "partial", () => import("./locales/zh.js?v=19-about-i18n")),
  defineLocale("zu", "isiZulu", "ltr", "zu-ZA", "partial", () => import("./locales/zu.js?v=19-about-i18n")),
]);

function canonicalTag(tag) {
  if (typeof tag !== "string" || tag.trim() === "") return null;
  try {
    return Intl.getCanonicalLocales(tag.trim())[0] ?? null;
  } catch {
    return null;
  }
}

function fallbackTags(tag) {
  const canonical = canonicalTag(tag);
  if (!canonical) return [];
  const withoutExtensions = canonical.split("-u-")[0].split("-x-")[0];
  const parts = withoutExtensions.split("-");
  const candidates = [];
  for (let length = parts.length; length >= 1; length -= 1) {
    candidates.push(parts.slice(0, length).join("-"));
  }
  return [...new Set(candidates.map(canonicalTag).filter(Boolean))];
}

export function validateRegistryMetadata(locales = LOCALES) {
  if (!Array.isArray(locales) || locales.length === 0) throw new TypeError("Locale metadata list must be non-empty.");
  const codes = new Map();
  const aliases = new Map();
  const assets = new Set();

  for (const locale of locales) {
    if (!locale || typeof locale !== "object") throw new TypeError("Locale metadata must be an object.");
    const canonicalCode = canonicalTag(locale.code);
    if (!canonicalCode || canonicalCode !== locale.code) throw new RangeError(`Locale ${String(locale.code)} has a non-canonical code.`);
    if (codes.has(canonicalCode)) throw new RangeError(`Duplicate locale code: ${canonicalCode}.`);
    if (typeof locale.displayName !== "string" || locale.displayName.trim() === "") throw new RangeError(`Locale ${canonicalCode} has no display name.`);
    if (!["ltr", "rtl"].includes(locale.dir)) throw new RangeError(`Locale ${canonicalCode} has invalid direction.`);
    if (!canonicalTag(locale.intlLocale)) throw new RangeError(`Locale ${canonicalCode} has invalid Intl locale.`);
    if (!SUPPORT_LEVELS.includes(locale.support)) throw new RangeError(`Locale ${canonicalCode} has invalid support status ${String(locale.support)}.`);
    if ((locale.experimental === true) !== (locale.support === "experimental")) throw new RangeError(`Locale ${canonicalCode} has inconsistent experimental projection.`);
    if (typeof locale.asset !== "string" || locale.asset === "") throw new RangeError(`Locale ${canonicalCode} has no asset path.`);
    if (assets.has(locale.asset)) throw new RangeError(`Duplicate locale asset: ${locale.asset}.`);
    if (typeof locale.loader !== "function") throw new RangeError(`Locale ${canonicalCode} has no loader.`);
    if (!Array.isArray(locale.aliases)) throw new RangeError(`Locale ${canonicalCode} aliases must be an array.`);
    codes.set(canonicalCode, locale);
    assets.add(locale.asset);
  }

  for (const locale of locales) {
    for (const alias of locale.aliases) {
      const canonicalAlias = canonicalTag(alias);
      if (!canonicalAlias) throw new RangeError(`Locale ${locale.code} has invalid alias ${String(alias)}.`);
      if (codes.has(canonicalAlias)) throw new RangeError(`Alias ${alias} duplicates registered locale code ${canonicalAlias}.`);
      const existing = aliases.get(canonicalAlias);
      if (existing) throw new RangeError(`Alias ${alias} is duplicated by ${existing.code} and ${locale.code}.`);
      aliases.set(canonicalAlias, locale);
    }
  }
  return true;
}

validateRegistryMetadata();

const byCode = new Map(LOCALES.map((locale) => [canonicalTag(locale.code), locale]));
const byAlias = new Map();
for (const locale of LOCALES) {
  for (const alias of locale.aliases) byAlias.set(canonicalTag(alias), locale);
}

const loadedSources = new Map();
const loadedLocales = new Map();
const LOCAL_SOURCE = Symbol("pastafari.i18n.localSource");

export function matchSupportedLocale(tag) {
  for (const candidate of fallbackTags(tag)) {
    const locale = byCode.get(candidate) ?? byAlias.get(candidate);
    if (locale) return locale;
  }
  return null;
}

export function resolveLocale({ urlLanguage = null, savedLanguage = null, browserLanguages = [] } = {}) {
  const urlLocale = matchSupportedLocale(urlLanguage);
  if (urlLocale) return Object.freeze({ locale: urlLocale, source: "url" });

  const savedLocale = matchSupportedLocale(savedLanguage);
  if (savedLocale) return Object.freeze({ locale: savedLocale, source: "saved" });

  for (const language of Array.isArray(browserLanguages) ? browserLanguages : []) {
    const browserLocale = matchSupportedLocale(language);
    if (browserLocale) return Object.freeze({ locale: browserLocale, source: "browser" });
  }

  return Object.freeze({ locale: byCode.get(canonicalTag(DEFAULT_LOCALE)), source: "fallback" });
}

export function getLocale(code) {
  return matchSupportedLocale(code) ?? byCode.get(canonicalTag(DEFAULT_LOCALE));
}

function assertLoadedLocaleMatchesMetadata(resource, metadata) {
  if (!resource || typeof resource !== "object") throw new TypeError(`Locale ${metadata.code} default export must be an object.`);
  if (resource.code !== metadata.code) throw new RangeError(`Locale module ${metadata.code} exports code ${String(resource.code)}.`);
  for (const key of ["displayName", "dir", "intlLocale"]) {
    if (resource[key] !== metadata[key]) throw new RangeError(`Locale ${metadata.code} metadata mismatch for ${key}.`);
  }
  if (Object.prototype.hasOwnProperty.call(resource, "support")) {
    throw new RangeError(`Locale ${metadata.code} must not declare support; the registry is the single source of truth.`);
  }
  if (Object.prototype.hasOwnProperty.call(resource, "experimental") && (resource.experimental === true) !== (metadata.support === "experimental")) {
    throw new RangeError(`Locale ${metadata.code} has stale experimental metadata.`);
  }
  return resource;
}

export function isLocaleLoaded(code) {
  return loadedLocales.has(getLocale(code).code);
}

export async function loadLocaleSource(code) {
  const metadata = getLocale(code);
  const existing = loadedSources.get(metadata.code);
```

</details>


---

<sub>1m 26s</sub>

### Copilot

Frystur haus hins íslenska Elm-afrits samsvarar SHA í skránni. Ég hef greint samræmisatriði milli nafna og stafsetningar í gagnaskrám geymslanna tveggja; næst sannreyni ég nákvæmar línur og hvort lýsigögn eða varaleið bæti við annmarka.

---

<sub>1m 26s</sub>

### `rg`

**Leitaða dagsetningin|leitaði að|kótelett|kótilett|mannlega frumtextamálið|frá auðu tré|Kisurra|Papýrusstör|papýrussef|Karób|jóhannesarbrauð|Þoka|mistur**

"Leitaða dagsetningin|leitaði að|kótelett|kótilett|mannlega frumtextamálið|frá auðu tré|Kisurra|Papýrusstör|papýrussef|Karób|jóhannesarbrauð|Þoka|mistur" (docs/i18n/locales/is.js, docs/about/content/is.html, artifacts/cross-repo-native-qa/runtime/repo2-0)

<details>
<summary>82 matches</summary>

```
[grep content: 72 matches across 10 file(s) under /home/runner/work/pastafari-calendar/pastafari-calendar]

docs/i18n/locales/is.js (27 match(es)):
  14:     "app.intro": "Finndu dagsetningu í einu dagatalanna sem vefurinn styður. Þá sérðu fulla Pastafari-dagsetningu þess dags og kótelettuna sem hann tilheyrir.",
  24:     "about.metaDescription": "Skýring á Pastafari-dagatalinu: aðgerðardagur og fyrirspurnardagur, ár, kótelettur, fléttaðir mánuðir, dagamörk og háþróuð kerfi.",
  25:     "about.intro": "Hvernig dagatalið sýnir daga, ár, kótelettur, fléttaða mánuði og aðgerðardaginn.",
  34:     "location.assumption": "(Ef engar upplýsingar benda til annars er gert ráð fyrir að tækið sé í Kisurra.)",
  58:     "comparison.summary": "Sýndir eru {count} dagar, frá fyrsta til síðasta dags kótelettunnar sem birtist í fyrri útreikningnum.",
  108:     "loading.title": "Leitað að kótelettu og dagsetningu…",
  115:     "calendar.toolbarAria": "Flakk milli kótelettna",
  116:     "calendar.previous": "Fyrri kóteletta",
  118:     "calendar.next": "Næsta kóteletta",
  119:     "calendar.daysAria": "Dagar í kótelettunni {cutletName}",
  120:     "calendar.currentCutlet": "Ár {year} · kóteletta",
  122:     "calendar.targetOutside": "Leitaða dagsetningin er ekki í kótelettunni sem nú er sýnd. Þú getur haldið áfram að fletta eða leitað að annarri dagsetningu.",
  125:     "year.context": "Þessi uppbygging er reiknuð fyrir aðgerðardaginn {actionDate}. Ef aðgerðardeginum er breytt getur þurft að byggja ársmörk, kótelettur og mánuði upp að nýju.",
  134:     "year.displayedCutletPosition": "Sýnda kótelettan nær yfir daga {start}–{end} ársins.",
  135:     "year.targetPosition": "Leitaða dagsetningin er dagur {day} af {length} í þessu ári.",
  136:     "year.monthExplainer": "Mánuðir fléttast óháð kótelettum í gegnum árið: mánuður er ekki undirdeild kótelettu og dagar hans geta birst í mörgum aðskildum runum. Lengd mánaðar er því heildarfjöldi daga sem honum er úthlutað, ekki endilega eitt samfellt tímabil.",
  145:     "target.notInView": "Dagsetningin sem þú leitaðir að er enn varðveitt; kótelettan sem nú er sýnd er önnur.",
  146:     "date.aria": "Ár {year} frá sköpun heimsins, dagur {dayInCutlet} í kótelettunni {cutletName}, dagur {dayInMonth} í mánuðinum {monthName}",
  148:     "date.cutletLine": "Dagur {dayInCutlet} í kótelettunni {cutletName}",
  154:     "guide.1.body": "Um leið og tengillinn opnast ákvarðar vefurinn núverandi Pastafari-dag fyrir virka staðsetningu athugandans og sýnir kótelettuna sem hann tilheyrir. Dagamörkin eru staðsetningarháði tímapunkturinn þegar miðja Venusar fer um neðri hluta staðbundna hádegisbaugsins, eins og lýst er í ASTRONOMICAL-DAY.md; þau eru ekki borgaralegt miðnætti. Engin skráning eða innskráning er nauðsynleg og engin dagsetning er send á reikniþjón.",
  158:     "guide.3.body": "Hver reitur hefur þrjár fastar línur: ár frá sköpun heimsins; númer dags í kótelettunni og nafn hennar; síðan dag í mánuðinum og nafn mánaðarins. Engin ein tala táknar alla dagsetninguna. Nafn mánaðarins ræður lit reitsins.",
  160:     "guide.4.body": "„Fyrri kóteletta“ og „Næsta kóteletta“ fara í nágrannakótelettur. Aðrir dagareitir eru ekki hnappar, því ekki er hægt að framkvæma aðgerð með því að smella á þá. „Til baka í dag“ endurstillir bæði leitina og aðgerðardaginn á núverandi Pastafari-dag.",
  166:     "guide.7.body": "Undir kótelettusýninni sýnir vefurinn uppbyggingu sýnda ársins: lengd og bil, hverja kótelettu og lengd hennar, og hvern mánuð. Fyrir mánuði sýnir hann einnig fjölda samfelldra runa og fyrstu og síðustu birtingu, svo fléttunin í gegnum árið verður sýnileg.",
  180:     "reverse.field.dayInCutlet": "Dagur í kótelettu",
  278:       "papyrusSedge": "Papýrusstör",
  300:       "mist": "Þoka",
  304:       "carob": "Karób",

artifacts/cross-repo-native-qa/runtime/repo2-0/SOURCE_LANGUAGE_CATALOG.md (3 match(es)):
  20: 8. papýrussef
  43: 11. mistur
  47: 15. jóhannesarbrauð

artifacts/cross-repo-native-qa/runtime/repo2-0/README.md (2 match(es)):
  3: Þetta verkefni er sjálfstæð grunnsmíð Stage 1 fyrir Elm-línuna með íslensku sem eina mannlega frumtextamálið. Verkefnið var stofnað frá auðu tré og notar engin forrit, prófanir, niðurstöður, töflur, skyndiminni, rekjanir eða gátreikninga úr annarri útfærslu.
  7: `Pastafari.ExactInt` veitir nákvæman heiltölureikning með ótakmarkaðri stærð, skrifaðan í Elm. `NormativeOracle` er prófunar-eingöngu bein útfærsla á innbyggða staðlaða viðmiðinu. `Pastafari.SourceLanguageCatalog` frystir 17 kótelettunöfn og 47 mánaðarnöfn með föstum `canonicalIndex`. `Pastafari.MonsterBase` er aðeins hlutlaus grunnur fyrir samhengi, stýringu, staðfestingu og mælingar. `Pastafari.Spaghetti` inniheldur enn enga eldri villuleið og enga leiðréttingarrökfræði úr síðari stigum.

artifacts/cross-repo-native-qa/runtime/repo2-0/src/Pastafari/SourceLanguageCatalog.elm (3 match(es)):
  32:     , { canonicalIndex = 8, sourceId = "PAPYRUS_SEDGE", text = "papýrussef" }
  57:     , { canonicalIndex = 11, sourceId = "MIST", text = "mistur" }
  61:     , { canonicalIndex = 15, sourceId = "CAROB", text = "jóhannesarbrauð" }

docs/about/content/is.html (26 match(es)):
  14:   <p>Hún hefur <strong>nákvæmlega fimm hluta</strong>: árnúmer, nafn kótelettu, dag innan kótelettu, nafn mánaðar og dag innan mánaðar.</p>
  15:   <p>Almennt dæmi: <strong>ár 5000, kóteletta A, dagur 417 í kótelettunni, mánuður B, dagur 83 í mánuðinum.</strong></p>
  22:   <p>Að breyta <code>t</code> þýðir að spyrja um annan dag. Að breyta <code>c</code> getur haft miklu víðtækari áhrif: það getur breytt ársmörkum, kótelettum, mánuðum, nöfnum þeirra og því hvernig þeir fléttast saman.</p>
  59:   <p>Ár getur því verið styttra en sólarár eða lengra en fimmtán sólarár. Ársmörkin eru byggð úr kerfi <strong>hliða</strong>; mörk kótelettna koma úr sama kerfi.</p>
  65:   <p>Hvert ár skiptist í <strong>6 til 17 kótelettur</strong>. Kóteletta er samfellt tímabil í tímaröð.</p>
  66:   <p>Ef dagur 250 í kótelettu er í dag, verður dagur 251 í sömu kótelettu á morgun, nema í dag sé síðasti dagur hennar. Mörk kótelettna eru hlið og kóteletta varir að minnsta kosti</p>
  69:   <p>Kerfið hefur 17 kanónísk kótelettunöfn og sama nafn endurtekur sig ekki innan sama árs. Nafnið ákvarðar hvorki lengd né staðsetningu kótelettunnar.</p><hr>
  93:   <p>Einn mánuður getur farið í gegnum margar kótelettur, og innan einnar kótelettu geta margir mánuðir birst. Upphaf og endir kerfanna tveggja þurfa ekki að falla saman.</p><hr>
  111:   <p>Það eru 17 kanónísk kótelettunöfn og 47 kanónísk mánaðarnöfn. Innan eins árs birtist hvert nafn í sínum flokki í mesta lagi einu sinni.</p>
  113:   <p>Nafnið er heldur ekki falinn lengdarkóði. Nafn tiltekinnar kótelettu eða mánaðar gerir eininguna ekki sjálfkrafa lengri eða styttri.</p><hr>
  131:   <p>Ferlið felur í sér fimm inntaksteljara, 7 falda dropa, 46 sýnilega dropa, 6 skálar, breytilega röð skálanna, 12 lokablöndur, innsigli fyrir mismunandi svör, samsetningarval, smíði hliða, val ára, skiptingu kótelettna, val nafna, smíði mánaða og fléttun mánaðardaga.</p>
  151:   <p>Atlasinn var reiknaður út með þeirri útgáfu vélarinnar sem auðkennd er með <code>8e155fa4198ea7bcfeb16138ac5d6662706f4d93</code> og innihélt 4.096 aðgerðardaga; árin 4990–5010 fyrir hvern þeirra; 86.016 ársbyggingar; 625.437 kótelettur; 3.535.422 byggingarmánuði; meira en 356 milljónir samfelldra mánaðarkafla; og meira en 364 milljónir færslna frá degi <code>n</code> í dag <code>n+1</code> í sama mánuði.</p>
  160:         <tr><td>Meðalfjöldi kótelettna á ári</td><td>7,271</td></tr>
  161:         <tr><td>Ár með nákvæmlega 6 kótelettur</td><td>42,00 %</td></tr>
  162:         <tr><td>Ár með 6–8 kótelettur</td><td>81,29 %</td></tr>
  163:         <tr><td>Meðallengd kótelettu</td><td>587,963 dagar</td></tr>
  164:         <tr><td>Miðgildi kótelettulengdar</td><td>560</td></tr>
  189:   <p>Hér þarf fyrst að skilgreina hvað „sami dagur á hverju ári“ merkir. Eðlilegar endurkomuhnit eru <code>(mánaðarnafn, dagur í mánuði)</code> og <code>(kótelettunafn, dagur í kótelettu)</code>; skilyrði má einnig sameina.</p>
  195:     <li>Fyrir <code>(kótelettunafn, dagur í kótelettu)</code> var miðgildið 3 ár; 88,89 % fundust innan 10 ára, en dreifingin hefur mjög þungan hala og lengsta mælda biðin var 51.954 Pastafari-ár.</li>
  224:   <p>Sama raunverulega augnablik getur á tveimur stöðum verið sitthvorum megin við staðbundin dagamörk. Ef kerfið hefur enga nothæfa staðsetningu notanda er sjálfgefna varastaðsetning vörunnar <strong>Kisurra</strong>.</p><hr>
  230:   <p>Þar sem forskriftin er fullkomin og kerfið determinískt má einnig reikna allt með höndunum: reiknið inntaksteljarana, farið í gegnum 7 falda og 46 sýnilega dropa, uppfærið skálarnar sex, framkvæmið 12 lokablöndurnar, myndið svörin, byggið hliðin, veljið ár og kótelettur, framkvæmið samsetningarval, veljið nöfnin og fléttið síðan mánuðina.</p>
  273:   <pre class="math-block" dir="ltr" tabindex="0"><code>(\text{kótelettunafn},\text{dagur í kótelettu})</code></pre>
  283:         <tr><td>Aðeins kótelettunafnið</td><td>5.568</td></tr>
  284:         <tr><td>Aðeins dagur í kótelettu</td><td>17</td></tr>
  287:         <tr><td>Kótelettunafn + dagur í kótelettu</td><td>1</td></tr>
  327:   <p>Hver dagsetning hefur nákvæmlega fimm reiti. Núið er frá sínu eigin sjónarhorni alltaf í ári 5000, en ár 5000 sjálft færist með aðgerðardeginum. Ár geta verið mjög löng, kótelettur eru samfelldar, mánuðir ekki endilega, og ekkert kanónískt vikukerfi er til.</p>

artifacts/cross-repo-native-qa/runtime/repo2-0/STAGE_01_NORMATIVE_AUDIT.md (3 match(es)):
  31: Fjöldi kótiletta er takmarkaður við 6..17 og ekki meiri en fjöldi hliðabila ársins. Skipting kótiletta er nákvæm lexíkógrafísk talning/opnun; ef verknaðardagurinn er innra hlið verður það millimark skiptingarinnar. Nöfn eru valin sem hlutumraðanir án endurtekningar og innri merkingin er `canonicalIndex`.
  37: `calendarDateCanonical` skilar nákvæmlega fimm merkingarsviðum. `calendarDate` leysir aðeins kótilettu- og mánaðarvísitölur yfir í fryst íslensk heiti. Ekkert í `src/` flytur inn `NormativeOracle`, þannig að framleiðsluskelin getur ekki notað viðmiðunarvélina sem varaleið eða leiðréttingu.
  39: Við úttektina fannst Elm-sértæk þýðingarvilla í eldri drögum: fjögurra og fimm staka tuple-gildi höfðu verið notuð í stuðlatöflum og í innra vali kótilettuskiptingar. Elm leyfir ekki slík tuple. Þau voru skipt út fyrir nafngreind record-gildi án merkingarbreytingar. Engin fjögurra eða fleiri staka tuple er eftir í Elm-kóðanum.
artifacts/cross-repo-native-qa/runtime/repo2-0/SPAGHETTI_DEVELOPMENT_HISTORY.md:7: Verkefnið var stofnað frá auðu tré fyrir Elm og íslensku. Sjálfstæður nákvæmur heiltölukjarni var skrifaður í Elm, staðlaða viðmiðunarvélin var endurgerð beint úr innbyggða viðmiðinu og sérstök hrein Elm-prófunarumgjörð var búin til. `SourceLanguageCatalog` var frystur með 17 kótilettum og 47 mánuðum.

artifacts/cross-repo-native-qa/runtime/repo2-0/tests/Stage01Checks.elm (2 match(es)):
  340:         "Sautján kótelettunöfn hafa nákvæma canonicalIndex-röð"
  350:         "Fryst kótelettuskrá hefur nákvæm íslensk heiti"

artifacts/cross-repo-native-qa/runtime/repo2-0/tests/BootstrapFixtures.elm (3 match(es)):
  34:     , "papýrussef"
  59:     , "mistur"
  63:     , "jóhannesarbrauð"

artifacts/cross-repo-native-qa/runtime/repo2-0/tests/NormativeOracle.elm (2 match(es)):
  1773:                 Debug.todo "Röð kótilettuskiptingar fór út fyrir löglegu fjölskylduna."
  2068:         |> expectMaybe "Markdagurinn fannst ekki í neinni kótilettu."
```

</details>


---

<sub>1m 26s</sub>

### `rg`

**^(\s*--|\s*\{-|\s*\*)|"[^"]{50,}"**

"^(\s*--|\s*\{-|\s*\*)|"[^"]{50,}"" in *.elm (artifacts/cross-repo-native-qa/runtime/repo2-0/src, artifacts/cross-repo-native-qa/runtime/repo2-0/tests)

<details>
<summary>30 matches</summary>

```
[grep content: 27 matches across 2 file(s) under /home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/tests]

Stage01Checks.elm (14 match(es)):
  259:         "Gólfdeiling og euklíðsk leif uppfylla n=q*d+r á öllum Bootstrap-vitnum"
  262:         "ákveðinn listi jákvæðra og neikvæðra stórra heiltalna"
  296:         "Fallandi margfeldi 47P47 fer yfir stóra teljarann án styttingar"
  302:     , bigCheck "Kótelettuskipting með skyldum innri mörkum hefur réttan fjölda" BI.one (Oracle.countCutletPartitionsForTest 4 2 (Just 2))
  316:         "Jákvæð hliðaspurning tekur við vísitölu yfir hefðbundnu Int-sviði án styttingar"
  330:         "Sósan skilar sex skálum og umröðun allra sex skála"
  335:         "Endurtekin sósa er óháð millikalli og endurnýtingu myndaðra gagna"
  340:         "Sautján kótelettunöfn hafa nákvæma canonicalIndex-röð"
  345:         "Fjörutíu og sjö mánaðarnöfn hafa nákvæma canonicalIndex-röð"
  365:         "Unicode-röðun íslensku strengjanna er ekki canonicalIndex-röðin"
  370:         "Grunnsamhengi tveggja kallana deilir ekki framkvæmdarslóð"
  375:         "Breyting á mælingu og stigi í einu samhengi breytir ekki hinu"
  381:         "annað samhengi ósnert og inntak þess fyrra óbreytt"
  384:         "Röð sjálfstæðra samhengiútreikninga breytir ekki niðurstöðu"

NormativeOracle.elm (13 match(es)):
  561:         |> expectMaybe "Lítil leif komst ekki í Elm Int þótt deilirinn sé lítill."
  980:                     Debug.todo "Nafnavalröð fór út fyrir hlutumraðanafjölskylduna."
  1057:                 Debug.todo "Röð takmarkaðrar samsetningar fór út fyrir fjölskylduna."
  1228:                 Debug.todo "Röð mánaðarvefjar fór út fyrir löglegu vefjafjölskylduna."
  1280:         |> expectMaybe "Hliðavísitala var ekki mynduð áður en hún var lesin."
  1430:         |> expectMaybe "Staðbundinn fjöldi hliðabila komst ekki í Elm Int."
  1584:                 |> expectMaybe "Næsta ár hafði engan gildan lokahliðsframbjóðanda."
  1636:                 |> expectMaybe "Fyrra ár hafði engan gildan opnunarhliðsframbjóðanda."
  1773:                 Debug.todo "Röð kótilettuskiptingar fór út fyrir löglegu fjölskylduna."
  1951:                 |> expectMaybe "Árslengd komst ekki í Elm Int þrátt fyrir 5778 daga hámark."
  1974:                 |> expectMaybe "Árslengd komst ekki í Elm Int þrátt fyrir 5778 daga hámark."
  2125:             |> expectMaybe "Kótilettuvísitala vantar í frysta íslenska katalóginn."
  2129:             |> expectMaybe "Mánaðarvísitala vantar í frysta íslenska katalóginn."
```

</details>


---

<sub>1m 26s</sub>

### `rg`

**papyrusSedge|carob|mist\"|eridu|uruk|susa|kótelettu|kótilettu|kótelettunöfn|kótilettunöfn**

"papyrusSedge|carob|mist\"|eridu|uruk|susa|kótelettu|kótilettu|kótelettunöfn|kótilettunöfn" in *.{js,html,md,elm} (docs, artifacts/cross-repo-native-qa/runtime/repo2-0)

<details>
<summary>74 matches</summary>

```
[grep content: 483 matches across 81 file(s) under /home/runner/work/pastafari-calendar/pastafari-calendar]
artifacts/cross-repo-native-qa/runtime/repo2-0/README.md:7: `Pastafari.ExactInt` veitir nákvæman heiltölureikning með ótakmarkaðri stærð, skrifaðan í Elm. `NormativeOracle` er prófunar-eingöngu bein útfærsla á innbyggða staðlaða viðmiðinu. `Pastafari.SourceLanguageCatalog` frystir 17 kótelettunöfn og 47 mánaðarnöfn með föstum `canonicalIndex`. `Pastafari.MonsterBase` er aðeins hlutlaus grunnur fyrir samhengi, stýringu, staðfestingu og mælingar. `Pastafari.Spaghetti` inniheldur enn enga eldri villuleið og enga leiðréttingarrökfræði úr síðari stigum.

docs/about/content/zu.html (2 match(es)):
  34:   <p>Ngakho ukushintsha usuku lokusebenza ngesandla kungashintsha usuku lwe-Pastafari oluboniswa kulolo suku ngaphandle kokususa usuku uqobo emgqeni wesikhathi.</p>
  303:     <p>khona-ke kuleyo <code>c</code> efanayo kukhona ukususa <code>H_c</code>, ushintsho lonyaka <code>p_c</code>, nomkhawulo okude ngokwanele lapho ngemva kwawo</p>

artifacts/cross-repo-native-qa/runtime/repo2-0/tests/Stage01Checks.elm (2 match(es)):
  340:         "Sautján kótelettunöfn hafa nákvæma canonicalIndex-röð"
  350:         "Fryst kótelettuskrá hefur nákvæm íslensk heiti"

artifacts/cross-repo-native-qa/runtime/repo2-0/tests/NormativeOracle.elm (2 match(es)):
  1773:                 Debug.todo "Röð kótilettuskiptingar fór út fyrir löglegu fjölskylduna."
  2068:         |> expectMaybe "Markdagurinn fannst ekki í neinni kótilettu."
artifacts/cross-repo-native-qa/runtime/repo2-0/SPAGHETTI_DEVELOPMENT_HISTORY.md:7: Verkefnið var stofnað frá auðu tré fyrir Elm og íslensku. Sjálfstæður nákvæmur heiltölukjarni var skrifaður í Elm, staðlaða viðmiðunarvélin var endurgerð beint úr innbyggða viðmiðinu og sérstök hrein Elm-prófunarumgjörð var búin til. `SourceLanguageCatalog` var frystur með 17 kótilettum og 47 mánuðum.

artifacts/cross-repo-native-qa/runtime/repo2-0/STAGE_01_NORMATIVE_AUDIT.md (2 match(es)):
  37: `calendarDateCanonical` skilar nákvæmlega fimm merkingarsviðum. `calendarDate` leysir aðeins kótilettu- og mánaðarvísitölur yfir í fryst íslensk heiti. Ekkert í `src/` flytur inn `NormativeOracle`, þannig að framleiðsluskelin getur ekki notað viðmiðunarvélina sem varaleið eða leiðréttingu.
  39: Við úttektina fannst Elm-sértæk þýðingarvilla í eldri drögum: fjögurra og fimm staka tuple-gildi höfðu verið notuð í stuðlatöflum og í innra vali kótilettuskiptingar. Elm leyfir ekki slík tuple. Þau voru skipt út fyrir nafngreind record-gildi án merkingarbreytingar. Engin fjögurra eða fleiri staka tuple er eftir í Elm-kóðanum.

docs/about/content/is.html (22 match(es)):
  14:   <p>Hún hefur <strong>nákvæmlega fimm hluta</strong>: árnúmer, nafn kótelettu, dag innan kótelettu, nafn mánaðar og dag innan mánaðar.</p>
  15:   <p>Almennt dæmi: <strong>ár 5000, kóteletta A, dagur 417 í kótelettunni, mánuður B, dagur 83 í mánuðinum.</strong></p>
  22:   <p>Að breyta <code>t</code> þýðir að spyrja um annan dag. Að breyta <code>c</code> getur haft miklu víðtækari áhrif: það getur breytt ársmörkum, kótelettum, mánuðum, nöfnum þeirra og því hvernig þeir fléttast saman.</p>
  65:   <p>Hvert ár skiptist í <strong>6 til 17 kótelettur</strong>. Kóteletta er samfellt tímabil í tímaröð.</p>
  66:   <p>Ef dagur 250 í kótelettu er í dag, verður dagur 251 í sömu kótelettu á morgun, nema í dag sé síðasti dagur hennar. Mörk kótelettna eru hlið og kóteletta varir að minnsta kosti</p>
  69:   <p>Kerfið hefur 17 kanónísk kótelettunöfn og sama nafn endurtekur sig ekki innan sama árs. Nafnið ákvarðar hvorki lengd né staðsetningu kótelettunnar.</p><hr>
  93:   <p>Einn mánuður getur farið í gegnum margar kótelettur, og innan einnar kótelettu geta margir mánuðir birst. Upphaf og endir kerfanna tveggja þurfa ekki að falla saman.</p><hr>
  111:   <p>Það eru 17 kanónísk kótelettunöfn og 47 kanónísk mánaðarnöfn. Innan eins árs birtist hvert nafn í sínum flokki í mesta lagi einu sinni.</p>
  113:   <p>Nafnið er heldur ekki falinn lengdarkóði. Nafn tiltekinnar kótelettu eða mánaðar gerir eininguna ekki sjálfkrafa lengri eða styttri.</p><hr>
  151:   <p>Atlasinn var reiknaður út með þeirri útgáfu vélarinnar sem auðkennd er með <code>8e155fa4198ea7bcfeb16138ac5d6662706f4d93</code> og innihélt 4.096 aðgerðardaga; árin 4990–5010 fyrir hvern þeirra; 86.016 ársbyggingar; 625.437 kótelettur; 3.535.422 byggingarmánuði; meira en 356 milljónir samfelldra mánaðarkafla; og meira en 364 milljónir færslna frá degi <code>n</code> í dag <code>n+1</code> í sama mánuði.</p>
  161:         <tr><td>Ár með nákvæmlega 6 kótelettur</td><td>42,00 %</td></tr>
  162:         <tr><td>Ár með 6–8 kótelettur</td><td>81,29 %</td></tr>
  163:         <tr><td>Meðallengd kótelettu</td><td>587,963 dagar</td></tr>
  164:         <tr><td>Miðgildi kótelettulengdar</td><td>560</td></tr>
  189:   <p>Hér þarf fyrst að skilgreina hvað „sami dagur á hverju ári“ merkir. Eðlilegar endurkomuhnit eru <code>(mánaðarnafn, dagur í mánuði)</code> og <code>(kótelettunafn, dagur í kótelettu)</code>; skilyrði má einnig sameina.</p>
  195:     <li>Fyrir <code>(kótelettunafn, dagur í kótelettu)</code> var miðgildið 3 ár; 88,89 % fundust innan 10 ára, en dreifingin hefur mjög þungan hala og lengsta mælda biðin var 51.954 Pastafari-ár.</li>
  230:   <p>Þar sem forskriftin er fullkomin og kerfið determinískt má einnig reikna allt með höndunum: reiknið inntaksteljarana, farið í gegnum 7 falda og 46 sýnilega dropa, uppfærið skálarnar sex, framkvæmið 12 lokablöndurnar, myndið svörin, byggið hliðin, veljið ár og kótelettur, framkvæmið samsetningarval, veljið nöfnin og fléttið síðan mánuðina.</p>
  273:   <pre class="math-block" dir="ltr" tabindex="0"><code>(\text{kótelettunafn},\text{dagur í kótelettu})</code></pre>
  283:         <tr><td>Aðeins kótelettunafnið</td><td>5.568</td></tr>
  284:         <tr><td>Aðeins dagur í kótelettu</td><td>17</td></tr>
  287:         <tr><td>Kótelettunafn + dagur í kótelettu</td><td>1</td></tr>
  327:   <p>Hver dagsetning hefur nákvæmlega fimm reiti. Núið er frá sínu eigin sjónarhorni alltaf í ári 5000, en ár 5000 sjálft færist með aðgerðardeginum. Ár geta verið mjög löng, kótelettur eru samfelldar, mánuðir ekki endilega, og ekkert kanónískt vikukerfi er til.</p>

docs/i18n/locales/sv.js (6 match(es)):
  278:       "papyrusSedge": "Papyrusstarr",
  294:       "eridu": "Eridu",
  300:       "mist": "Dimma",
  304:       "carob": "Johannesbröd",
  305:       "uruk": "Uruk",
  325:       "susa": "Susa",

docs/i18n/locales/sr.js (6 match(es)):
  278:       "papyrusSedge": "Papirusov šaš",
  294:       "eridu": "Eridu",
  300:       "mist": "Magla",
  304:       "carob": "Rogač",
  305:       "uruk": "Uruk",
  325:       "susa": "Susa",

docs/i18n/locales/ar.js (6 match(es)):
  278:       "papyrusSedge": "بردي",
  294:       "eridu": "إريدو",
  300:       "mist": "ضباب",
  304:       "carob": "خروب",
  305:       "uruk": "أوروك",
  325:       "susa": "سوسة",

docs/i18n/locales/fy.js (6 match(es)):
  278:       "papyrusSedge": "Papyrussigge",
  294:       "eridu": "Eridu",
  300:       "mist": "Mist",
  304:       "carob": "Karob",
  305:       "uruk": "Uruk",
  325:       "susa": "Susa",

docs/i18n/locales/fa.js (6 match(es)):
  278:       "papyrusSedge": "پاپیروس",
  294:       "eridu": "اریدو",
  300:       "mist": "مه",
  304:       "carob": "خرنوب",
  305:       "uruk": "اوروک",
  325:       "susa": "شوش",

[omitted 421 match(es) in 69 file(s); see original output for full results]
```

</details>


---

<sub>1m 26s</sub>

### `rg`

**"(meta.description|app.title|about.title|about.metaDescription|about.fallbackNotice|about.loadError|language.label|nav.skip|guide.open|footer.local|footer.open|reverse.error|search.invalid|settings.invalid|comparison.invalid|year.error|error\.|reverse.status\.)**

""(meta.description|app.title|about.title|about.metaDescription|about.fallbackNotice|about.loadError|language.label|nav.skip|guide.open|footer.local|footer.open|reverse.error|search.invalid|settings.invalid|comparison.invalid|year.error|error\.|reverse.status\.)" (docs/i18n/locales/is.js)

<details>
<summary>42 matches</summary>

```
[grep content: 40 matches across 1 file(s) under /home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales]

is.js (40 match(es)):
  9:     "meta.description": "Pastafari-dagatal með dagsetningarleit og samanburði.",
  12:     "app.title": "Pastafari-dagatal",
  13:     "nav.skip": "Fara í dagsetningarleit",
  15:     "guide.open": "Hvernig nota ég þennan vef?",
  16:     "guide.openShort": "Hvernig á að nota vefinn",
  17:     "reverse.error.absoluteDateField": "Dagsetningin inniheldur ógilt gildi.",
  18:     "reverse.error.limitSafeInteger": "Gildi reitsins „{field}“ er utan öruggs heiltölusviðs.",
  19:     "reverse.error.limitPositive": "Gildi reitsins „{field}“ verður að vera jákvætt.",
  23:     "about.title": "Um Pastafari-dagatalið",
  24:     "about.metaDescription": "Skýring á Pastafari-dagatalinu: aðgerðardagur og fyrirspurnardagur, ár, kótelettur, fléttaðir mánuðir, dagamörk og háþróuð kerfi.",
  30:     "about.fallbackNotice": "Skýringin er ekki tiltæk á völdu tungumáli; hebreska útgáfan er sýnd í staðinn.",
  31:     "about.loadError": "Ekki tókst að hlaða skýringu dagatalsins.",
  32:     "language.label": "Tungumál",
  41:     "search.invalid": "Ekki tókst að lesa dagsetninguna. Gakktu úr skugga um að allir reitir séu útfylltir og að dagsetningin sé til í valda dagatalinu.",
  48:     "settings.invalid": "Aðgerðardagurinn er ógildur. Athugaðu dagsetninguna og reyndu aftur.",
  61:     "comparison.invalid": "Seinni aðgerðardagurinn er ógildur. Athugaðu dagsetninguna og reyndu aftur.",
  109:     "error.kicker": "Ekki er hægt að sýna dagatalið",
  110:     "error.title": "Ekki tókst að hlaða útreikningsvélinni",
  111:     "error.reload": "Hlaða aftur",
  112:     "error.timeout": "Útreikningurinn tekur of langan tíma.",
  113:     "error.engineFailed": "Útreikningsvélin bilaði.",
  114:     "error.engineLoadFailed": "Ekki tókst að hlaða útreikningsvélinni.",
  127:     "year.error": "Ekki tókst að byggja upp alla ársuppbygginguna. Kótelettusýnin er áfram tiltæk.",
  169:     "footer.local": "Útreikningurinn fer fram á tækinu þínu; vefurinn hefur engan notandareikning og engan rakningarkóða.",
  170:     "footer.open": "Tengillinn er opinber og opnast beint, einnig í einkavafraglugga.",
  207:     "reverse.status.running": "Leitað á tækinu…",
  208:     "reverse.status.cancelled": "Leit hætt við.",
  209:     "reverse.status.superseded": "Nýrri leit kom í stað þessarar leitar.",
  210:     "reverse.status.completeEmpty": "Tæmandi leit yfir allt leitarsviðið lauk án þess að lausn fyndist.",
  211:     "reverse.status.completeSolutions": "Leit lokið. Allar lausnir á leitarsviðinu ({count}) eru sýndar.",
  212:     "reverse.status.partialEmpty": "Leitin stöðvaðist áður en henni lauk. Engin lausn hefur fundist enn.",
  213:     "reverse.status.partialSolutions": "Staðfestar lausnir sem fundust: {count}. Leitin stöðvaðist áður en henni lauk; fleiri lausnir gætu verið til.",
  214:     "reverse.status.stale": "Þessar niðurstöður notuðu fyrri virkan aðgerðardag. Keyrðu leitina aftur til að nota þann núverandi.",
  215:     "reverse.status.rangeRequired": "Ekki er hægt að ljúka leitinni fyrr en endanlegt leitarsvið eða föst dagsetning hefur verið skilgreind.",
  216:     "reverse.status.timeout": "Leitin náði tímamörkum áður en henni lauk.",
  217:     "reverse.status.failed": "Villa kom upp í öfugu leitinni.",
  262:     "reverse.error.input": "Nokkra reiti öfugrar leitar vantar eða þeir eru ógildir.",
  263:     "reverse.error.range": "Lok sviðs mega ekki vera á undan upphafi þess.",
  264:     "reverse.error.variable": "Sérhver skorða verður að vísa í dagsetningarbreytu sem er til.",
  265:     "reverse.error.pastafari": "Sláðu inn alla fimm reiti Pastafari-dagsetningarinnar.",
```

</details>


---

<sub>1m 26s</sub>

### `rg`

**lang=|data-i18n-attr|noscript|aria-|data-about-link|data-back-to-calendar**

"lang=|data-i18n-attr|noscript|aria-|data-about-link|data-back-to-calendar" (docs/index.html, docs/about/index.html, docs/i18n/locales/is.js, docs/about/content/registry.js)

<details>
<summary>33 matches</summary>

```
[grep content: 30 matches across 2 file(s) under /home/runner/work/pastafari-calendar/pastafari-calendar/docs]

about/index.html (10 match(es)):
  2: <html lang="en" dir="ltr">
  7:     <meta name="description" content="An explanation of the Pastafari Calendar." data-i18n-attr="content:about.metaDescription">
  25:           <a class="guide-link" href="../" data-back-to-calendar data-i18n="about.back">Back to the calendar</a>
  40:         <nav data-i18n-attr="aria-label:about.toc">
  46:         <article id="article-content" class="about-article" aria-busy="true" tabindex="-1"></article>
  49:         <section class="about-site-usage" id="site-usage" aria-labelledby="guide-heading" data-toc-section data-toc-level="2">
  66:           <a class="back-to-calendar" href="../" data-back-to-calendar data-i18n="guide.back">Back to search and calendar</a>
  75:     <noscript>
  79:       <div class="noscript" lang="zxx" dir="ltr">
  82:     </noscript>

index.html (20 match(es)):
  2: <html lang="en" dir="ltr">
  7:     <meta name="description" content="A local, deterministic Pastafari calendar." data-i18n-attr="content:meta.description">
  25:           <a class="guide-link" href="./about/" data-about-link data-i18n="about.open">About the calendar</a>
  33:       <a class="floating-guide-link" href="./about/" data-about-link data-i18n="about.openShort">About the calendar</a>
  36:       <section class="search-panel" id="search-panel" aria-labelledby="search-heading">
  94:       <section class="reverse-panel" id="reverse-panel" aria-labelledby="reverse-heading">
  98:       <section class="status-panel" id="loading-panel" aria-labelledby="loading-heading" aria-live="polite" aria-busy="true">
  99:         <span class="loader" aria-hidden="true"></span>
  106:       <section class="status-panel error-panel" id="error-panel" aria-labelledby="error-heading" role="alert" hidden>
  113:       <section class="calendar-workspace" id="calendar-workspace" aria-labelledby="cutlet-heading" hidden>
  114:         <article class="target-beacon" id="target-beacon" aria-live="polite">
  126:           <div class="toolbar-actions" role="group" data-i18n-attr="aria-label:calendar.toolbarAria">
  136:         <section class="year-overview" id="year-overview" aria-labelledby="year-overview-heading">
  157:                 <ol class="structure-list" id="year-cutlet-list" tabindex="0" aria-labelledby="year-cutlets-summary"></ol>
  161:                 <ol class="structure-list month-structure-list" id="year-month-list" tabindex="0" aria-labelledby="year-months-summary"></ol>
  168:       <section class="comparison-workspace" id="comparison-workspace" aria-labelledby="comparison-heading" hidden>
  175:         <div class="comparison-scroll" role="region" tabindex="0" data-i18n-attr="aria-label:comparison.scrollAria">
  197:     <noscript>
  201:       <div class="noscript" lang="zxx" dir="ltr">
  204:     </noscript>
```

</details>


---

<sub>1m 26s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/CANONICAL_NAMES_LOCK.sha256.**

/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/CANONICAL_NAMES_LOCK.sha256

```
d0f03849ab89ea0a414d56d3ca287c53ab1a7fcd3772ed1edcc1ddbbf53623f1  src/Pastafari/SourceLanguageCatalog.elm

```


---

<sub>1m 38s</sub>

### `rg`

**\.message|throw new (RangeError|Error)|form-error|target-form-error|action-form-error|comparison-form-error|search\.invalid|settings\.invalid|comparison\.invalid**

"\.message|throw new (RangeError|Error)|form-error|target-form-error|action-form-error|comparison-form-error|search\.invalid|settings\.invalid|comparison\.invalid" in *.js (docs)

<details>
<summary>124 matches</summary>

```
[grep content: 383 matches across 87 file(s) under /home/runner/work/pastafari-calendar/pastafari-calendar/docs]
about/about.js:45:   if (!response.ok) throw new Error(`HTTP ${response.status} while loading ${articleLocale.code}`);

calendar-converters.js (25 match(es)):
  145:   if (!found) throw new RangeError(`Unknown calendar input: ${String(id)}`);
  166:   throw new RangeError(`${name} must be an integer.`);
  172:     throw new RangeError(`${name} must be in ${minimum}..${maximum}.`);
  192:     throw new RangeError("The day is outside the selected month.");
  271:     throw new RangeError("The Hebrew date is outside the selected month or year.");
  293:   if (day > daysInIslamicCivilMonth(year, month)) throw new RangeError("The day is outside the selected month.");
  303:   if (year === 0n) throw new RangeError("The Solar Hijri calendar has no year zero.");
  322:   if (day > monthLength) throw new RangeError("The day is outside the selected month.");
  345:     throw new RangeError("This browser cannot represent that date in the selected calendar.");
  350:   if (Number.isNaN(date.getTime())) throw new RangeError("This browser cannot represent that date.");
  367:     throw new RangeError("This browser does not support the selected calendar.", { cause: error });
  372:   throw new RangeError("The entered date does not exist in the selected calendar, or is outside this browser's supported range.");
  411:   if (!Number.isSafeInteger(Number(year))) throw new RangeError("The Hindu year is outside the supported range.");
  417:   if (!Number.isSafeInteger(numericYear)) throw new RangeError("The Hindu year is outside the supported range.");
  424:     throw new RangeError("The selected Old Hindu lunar month is not intercalary.");
  440:   if (day > monthLength) throw new RangeError("The day is outside the selected month.");
  450:   if (day > monthLength) throw new RangeError("The day is outside the selected month.");
  464:   if (!metadata || year < 1n) throw new RangeError("The Japanese era or year is invalid.");
  472:   if (value < start || (end !== null && value > end)) throw new RangeError("The date is outside the selected Japanese era.");
  540:     throw new RangeError("The Tehran-equinox calculation supports Gregorian years -1000 through 3000.");
  644:   if (year < 1n) throw new RangeError("The Tehran-equinox Baha'i year must be positive.");
  645:   if (gregorianYear > 3000n) throw new RangeError("The Tehran-equinox variant supports Gregorian years 1844 through 3000.");
  663:   if (day > monthLength) throw new RangeError("The day is outside the selected Baha'i month.");
  734:       throw new RangeError("The Baha'i month is invalid.");
  750:   throw new RangeError(`Unknown calendar input: ${String(calendarId)}`);

reverse-search-controller.js (11 match(es)):
  13:   if (positive && parsed < 1n) throw new RangeError(`${fieldName} must be positive.`);
  20:     throw new RangeError(`${fieldName} is outside the safe integer range.`);
  36:   if (!cutlet) throw new RangeError("Unknown cutlet identifier.");
  37:   if (!month) throw new RangeError("Unknown month identifier.");
  85:     if (end < start) throw new RangeError("Variable range end precedes start.");
  108:       if (!["<", "<=", ">", ">="].includes(op)) throw new RangeError("Unsupported order operator.");
  120:           throw new RangeError("Difference max is smaller than min.");
  126:       throw new RangeError("Unsupported constraint type.");
  137:     if (!name) throw new RangeError("Variable name must not be empty.");
  140:   if (Object.keys(normalizedVariables).length === 0) throw new RangeError("At least one variable is required.");
  162:     throw new RangeError("Incomplete constraint result has an unknown termination reason.");

engine/pastafari-diagnostics.js (3 match(es)):
  57:     throw new RangeError(`Unknown diagnostics mode: ${String(value)}.`);
  65:     throw new RangeError(`traceLimit must be a safe integer in 0..${MAX_TRACE_LIMIT}.`);
  126:       message: sanitize(value.message || String(value), depth + 1, seen),

reverse-ui.js (5 match(es)):
  97:     this.error = node("p", "form-error");
  230:       if (!input.checkValidity()) throw new RangeError(this.services.rt("reverse.error.pastafari"));
  328:       if (end < start) throw new RangeError(this.services.rt("reverse.error.range"));
  806:     this.error = node("p", "form-error");
  855:         if (end < start) throw new RangeError(this.rt("reverse.error.range"));

venus-day-boundary.js (8 match(es)):
  60:   if (!Number.isFinite(value)) throw new RangeError(`${name} must be finite.`);
  68:   if (latitude < -90 || latitude > 90) throw new RangeError("latitude must be in -90..90 degrees.");
  69:   if (longitude < -180 || longitude > 180) throw new RangeError("longitude must be in -180..180 degrees.");
  91:   if (!table) throw new RangeError(`Unsupported body: ${body}`);
  95:     throw new RangeError("Venus day-boundary model is defined only for 3000 BC through 3000 AD.");
  245:   if (!Number.isSafeInteger(Number(dayJdn))) throw new RangeError("day JDN is outside the safe numeric range.");
  263:   if (brackets.length === 0) throw new RangeError("Could not bracket the Venus lower transit for this day.");
  293:   if (!Number.isFinite(timeMs)) throw new RangeError("instant must be a valid date/time.");

engine/pastafari-fast-worker.js (28 match(es)):
  45:     throw new RangeError("The fast calendar returned an invalid dayInCutlet value.");
  48:     throw new RangeError("The fast calendar returned an invalid dayInMonth value.");
  65:     message: error?.message || String(error),
  123:     throw new RangeError("The fast cutlet view selected a different JDN than requested.");
  126:     throw new RangeError("The fast cutlet view returned reversed bounds.");
  136:     throw new RangeError("The fast cutlet view returned an invalid number of days.");
  146:     throw new RangeError("The fast cutlet view returned an invalid selected index.");
  150:     throw new RangeError("The fast cutlet view returned invalid neighboring cutlet anchors.");
  159:       throw new RangeError("The fast cutlet view returned non-contiguous days.");
  164:       throw new RangeError("The fast cutlet view returned an invalid day-in-cutlet sequence.");
  172:     throw new RangeError("The fast cutlet view header does not match its selected day.");
  191:     throw new RangeError("The fast module returned an invalid range length.");
  238:       throw new RangeError(
  246:     throw new RangeError("The year contains more cutlets than the supported maximum.");
  258:       throw new RangeError(
  266:     throw new RangeError("The year contains more cutlets than the supported maximum.");
  269:     throw new RangeError("The year returned an invalid cutlet count.");
  276:     throw new RangeError("The year returned an invalid length.");
  289:         throw new RangeError("A cutlet crossed a year boundary unexpectedly.");
  293:         throw new RangeError("Year days are not contiguous.");
  310:         throw new RangeError(
  329:     throw new RangeError("The materialized year length does not match its bounds.");
  335:     throw new RangeError("The year returned an invalid month count.");
  338:     throw new RangeError("Month lengths do not sum to the year length.");
  371:     throw new RangeError("endJdn must not be earlier than startJdn.");
  375:     throw new RangeError(
  405:     throw new RangeError("The fast range returned an invalid number of days.");
  425:         throw new RangeError(`count must be a safe integer in 0..${MAX_RANGE_DAYS}.`);

engine/pastafari-constraints-client.js (3 match(es)):
  26:     serialized?.message || "Pastafari constraint solving failed.",
  72:       throw new RangeError("timeoutMs must be a positive safe integer.");
  273:         const error = createError("Error", event.message || "Pastafari constraint worker failed.", "ERR_REVERSE_WORKER_LOAD");
engine/pastafari-reverse-worker.js:20:     message: error?.message || String(error),

app.js (11 match(es)):
  82:     error: elements["target-form-error"],
  83:     errorKey: "search.invalid",
  90:     error: elements["action-form-error"],
  91:     errorKey: "settings.invalid",
  98:     error: elements["comparison-form-error"],
  99:     errorKey: "comparison.invalid",
  148:   showError(localizedError("error.engineLoadFailed", event.message));
  251:     throw new Error("Month palette contrast invariant failed.");
  282:     if (!(name in values)) throw new RangeError(`Missing interpolation value ${name} for ${key}`);
  597:     if (!secondary || secondary.jdn !== primary.jdn) throw new RangeError("Comparison rows are not aligned by JDN.");
  787:   if (!configuration.form.reportValidity()) throw new RangeError("Missing or invalid input fields.");

sw.js (9 match(es)):
  48: if (!ENGLISH_LOCALE_ASSET) throw new Error("English fallback locale is missing from CORE_ASSETS.");
  51: if (!FALLBACK_ARTICLE_ASSET) throw new Error("Fallback article is missing from CORE_ASSETS.");
  84:     throw new Error(`Failed to cache ${label}: HTTP ${response?.status ?? "no response"}`);
  86:   if (response.type === "opaque") throw new Error(`Refusing opaque response for ${label}.`);
  87:   if (response.redirected) throw new Error(`Refusing redirected response for ${label}.`);
  91:     throw new Error(`Unexpected response URL for ${label}: ${response.url}`);
  98:       throw new Error(`Unexpected Content-Type for ${label}: ${contentType || "missing"}`);
  159:         throw new Error(`Core cache ${CORE_CACHE} already exists; bump VERSION before changing sw.js.`);
  178:       if (missing.length > 0) throw new Error(`Core precache verification failed: ${missing.join(", ")}`);

chinese-calendrica-detour.js (7 match(es)):
  41:     throw new RangeError(`${label} is outside the deterministic Chinese shadow engine range.`);
  258:     if (day > Math.floor(approx) + 20) throw new Error("Chinese winter solstice search failed.");
  350:   if (yearInCycle < 1 || yearInCycle > 60) throw new RangeError("Chinese yearInCycle must be in 1..60.");
  351:   if (month < 1 || month > 12) throw new RangeError("Chinese month must be in 1..12.");
  352:   if (day < 1 || day > 30) throw new RangeError("Chinese day must be in 1..30.");
  371:   throw new RangeError("The Chinese related year is outside the deterministic search range.");
  389:     throw new RangeError("The entered Chinese date does not exist in the source-locked deterministic Chinese calendar.");

[omitted 271 match(es) in 75 file(s); see original output for full results]
```

</details>


---

<sub>1m 38s</sub>

### `rg`

**t\("|translate\(|setAttribute\("aria|aria-label|textContent =|title =**

"t\("|translate\(|setAttribute\("aria|aria-label|textContent =|title =" (docs/reverse-ui.js, docs/app.js, docs/reverse-search-controller.js)

<details>
<summary>204 matches</summary>

```
[grep content: 201 matches across 2 file(s) under /home/runner/work/pastafari-calendar/pastafari-calendar/docs]

app.js (88 match(es)):
  114:   return translate(activeLocale, key, values);
  188:   url.searchParams.set("t", state.targetJdn.toString());
  189:   url.searchParams.set("v", state.viewAnchorJdn.toString());
  190:   url.searchParams.set("c", state.calculationJdn.toString());
  191:   if (state.targetFollowsCurrentDay) url.searchParams.set("today", "1");
  192:   if (state.calculationFollowsCurrentDay) url.searchParams.set("ctoday", "1");
  194:     url.searchParams.set("compare", "1");
  195:     url.searchParams.set("c2", state.comparisonJdn.toString());
  285:       const strong = document.createElement("strong");
  286:       strong.textContent = value;
  300:   const yearLine = document.createElement("span");
  303:   const cutletLine = document.createElement("span");
  309:   const monthLine = document.createElement("span");
  319:   return t("date.aria", {
  331:   elements["target-marker"].textContent = t(markerKey);
  336:     const line = document.createElement("strong");
  337:     line.textContent = t("target.notInView");
  340:   const context = t("target.context", {
  348:       document.createTextNode(` ${t("location.assumption")} `),
  357:   elements["cutlet-meta"].textContent = t("calendar.currentCutlet", { year: formatInteger(view.year) });
  358:   elements["cutlet-heading"].textContent = viewCutletName;
  359:   elements["cutlet-description"].textContent = t("calendar.cutletDescription", {
  363:   elements["calendar-grid"].setAttribute("aria-label", t("calendar.daysAria", { cutletName: viewCutletName }));
  373:     const card = document.createElement("article");
  377:     card.setAttribute("aria-label", dateAria(day));
  386:       card.setAttribute("aria-current", "date");
  387:       const badge = document.createElement("span");
  389:       badge.textContent = t(state.targetFollowsCurrentDay ? "target.today" : "target.searched");
  415:   const locationButton = document.createElement("button");
  418:   locationButton.textContent = t("location.useDevice");
  434:   elements["year-overview-heading"].textContent = t("year.heading", { year: formatInteger(view.year) });
  435:   elements["year-overview-context"].textContent = t("year.context", {
  444:   const item = document.createElement("li");
  447:   const heading = document.createElement("strong");
  448:   heading.textContent = title;
  449:   const details = document.createElement("span");
  450:   details.textContent = meta;
  458:   elements["year-overview-heading"].textContent = t("year.heading", { year: formatInteger(structure.year) });
  459:   elements["year-overview-context"].textContent = t("year.context", {
  462:   elements["year-length"].textContent = t("year.daysValue", { count: formatInteger(structure.length) });
  463:   elements["year-cutlet-count"].textContent = formatInteger(structure.cutletCount);
  464:   elements["year-month-count"].textContent = formatInteger(structure.monthCount);
  465:   elements["year-range"].textContent = t("year.rangeValue", {
  471:   elements["year-cutlet-position"].textContent = displayedCutlet
  472:     ? t("year.displayedCutletPosition", {
  481:     elements["year-target-position"].textContent = t("year.targetPosition", {
  487:   elements["year-cutlets-summary"].textContent = t("year.cutletsSummary", {
  495:       t("year.numberedName", { number: formatInteger(index + 1), name: localizedCutlet(cutlet.cutletIndex) }),
  496:       t("year.cutletMeta", {
  505:   elements["year-months-summary"].textContent = t("year.monthsSummary", {
  513:       t("year.numberedName", { number: formatInteger(index + 1), name: localizedMonth(month.monthIndex) }),
  514:       t("year.monthMeta", {
  529:   elements["year-overview-heading"].textContent = t("year.heading", { year: formatInteger(view.year) });
  530:   elements["year-overview-context"].textContent = t("year.context", {
  536:   elements["year-overview-error"].textContent = t("year.error");
  550:     const structure = await workerRequest("getYearStructure", {
  567:   cell.setAttribute("aria-label", dateAria(day));
  579:   elements["comparison-primary-heading"].textContent = t("comparison.actionHeading", {
  582:   elements["comparison-secondary-heading"].textContent = t("comparison.actionHeading", {
  585:   elements["comparison-summary"].textContent = t("comparison.summary", {
  598:     const row = document.createElement("tr");
  602:       row.setAttribute("aria-current", "date");
  604:     const shared = document.createElement("th");
  607:     const civil = document.createElement("strong");
  608:     civil.textContent = formatJdnAsGregorian(primary.jdn);
  609:     const sequence = document.createElement("small");
  610:     sequence.textContent = t("reverse.result.jdn", { jdn: primary.jdn.toString() });
  612:     const primaryCell = document.createElement("td");
  614:     const secondaryCell = document.createElement("td");
  632:     range = await workerRequest("getRangeView", {
  667:     const view = await workerRequest("getCutletView", {
  694:   elements["error-message"].textContent = t(key);
  701:     const option = document.createElement("option");
  703:     option.textContent = t(definition.labelKey);
  730:     const label = document.createElement("label");
  732:     const labelText = document.createElement("span");
  733:     labelText.textContent = t(field.labelKey);
  741:       input = document.createElement("select");
  743:         const option = document.createElement("option");
  745:         option.textContent = choice.labelKey ? t(choice.labelKey) : choice.label;
  749:       input = document.createElement("input");
  773:   configuration.help.textContent = definition.helpKey ? t(definition.helpKey) : "";
  799:   configuration.error.textContent = t(configuration.errorKey);
  854:     comparisonEnabled: params.get("compare") === "1",
  855:     targetFollowsCurrentDay: params.get("today") === "1" && targetJdn === todayJdn,
  856:     calculationFollowsCurrentDay: params.get("ctoday") === "1" && calculationJdn === todayJdn,
  899:     elements["error-message"].textContent = t(lastVisibleErrorKey);
  1096:     alert(t("day.staleWarning", {

reverse-ui.js (113 match(es)):
  29:   if (text !== null) element.textContent = text;
  34:   const element = document.createElement("option");
  36:   element.textContent = text;
  41:   const input = document.createElement("input");
  52:   const input = document.createElement("input");
  91:     this.calendar = document.createElement("select");
  131:         input = document.createElement("select");
  136:         input = document.createElement("input");
  159:     this.help.textContent = definition.helpKey ? this.services.siteT(definition.helpKey) : "";
  173:       this.error.textContent = this.services.rt("reverse.error.input");
  182:     this.calendarLabelText.textContent = this.services.rt(this.labelKey);
  195:       ["cutletId", "reverse.field.cutlet", () => document.createElement("select")],
  197:       ["monthId", "reverse.field.month", () => document.createElement("select")],
  230:       if (!input.checkValidity()) throw new RangeError(this.services.rt("reverse.error.pastafari"));
  253:       element.textContent = this.services.rt(element.dataset.reverseKey);
  268:     const title = node("strong", "reverse-card-title", id);
  269:     this.removeButton = node("button", "secondary-action reverse-remove", this.services.rt("reverse.action.remove"));
  273:     this.labelText = node("span", "", this.services.rt("reverse.variable.label"));
  274:     this.label = document.createElement("input");
  276:     this.label.value = this.services.rt("reverse.variable.defaultName", { index });
  279:     this.domainText = node("span", "", this.services.rt("reverse.variable.domain"));
  280:     this.domain = document.createElement("select");
  295:       option("unknown", this.services.rt("reverse.variable.domain.unknown")),
  296:       option("exact", this.services.rt("reverse.variable.domain.exact")),
  297:       option("range", this.services.rt("reverse.variable.domain.range")),
  312:       start.append(node("h5", "", this.services.rt("reverse.basic.rangeStart")));
  314:       end.append(node("h5", "", this.services.rt("reverse.basic.rangeEnd")));
  328:       if (end < start) throw new RangeError(this.services.rt("reverse.error.range"));
  335:     this.labelText.textContent = this.services.rt("reverse.variable.label");
  336:     this.domainText.textContent = this.services.rt("reverse.variable.domain");
  337:     this.removeButton.textContent = this.services.rt("reverse.action.remove");
  355:     this.title = node("strong", "reverse-card-title", id);
  356:     this.removeButton = node("button", "secondary-action reverse-remove", this.services.rt("reverse.action.remove"));
  360:     this.typeText = node("span", "", this.services.rt("reverse.constraint.type"));
  361:     this.type = document.createElement("select");
  375:       option("pastafari", this.services.rt("reverse.constraint.pastafari")),
  376:       option("equal", this.services.rt("reverse.constraint.equal")),
  377:       option("order", this.services.rt("reverse.constraint.order")),
  378:       option("difference", this.services.rt("reverse.constraint.difference")),
  384:     const select = document.createElement("select");
  411:     this.calculationMode = document.createElement("select");
  414:       option("variable", this.services.rt("reverse.constraint.calculation.variable")),
  415:       option("absolute", this.services.rt("reverse.constraint.calculation.absolute")),
  416:       option("same", this.services.rt("reverse.constraint.calculation.same")),
  441:     pfWrap.append(node("h5", "", this.services.rt("reverse.basic.dateHeading")));
  454:     this.op = document.createElement("select");
  468:     this.differenceMode = document.createElement("select");
  470:       option("exact", this.services.rt("reverse.constraint.differenceExact")),
  471:       option("range", this.services.rt("reverse.constraint.differenceRange")),
  533:     this.removeButton.textContent = this.services.rt("reverse.action.remove");
  534:     this.typeText.textContent = this.services.rt("reverse.constraint.type");
  536:       element.textContent = this.services.rt(element.dataset.reverseKey);
  543:         option("variable", this.services.rt("reverse.constraint.calculation.variable")),
  544:         option("absolute", this.services.rt("reverse.constraint.calculation.absolute")),
  545:         option("same", this.services.rt("reverse.constraint.calculation.same")),
  552:         option("exact", this.services.rt("reverse.constraint.differenceExact")),
  553:         option("range", this.services.rt("reverse.constraint.differenceRange")),
  593:       rt: (key, values = {}) => translate(services.getLocale(), key, values),
  624:     this.basicTab = node("button", "reverse-mode-tab", this.rt("reverse.mode.basic"));
  626:     this.advancedTab = node("button", "reverse-mode-tab", this.rt("reverse.mode.advanced"));
  651:     this.basicCalculationMode = document.createElement("select");
  663:     this.basicSolve = node("button", "search-submit", this.rt("reverse.action.solve"));
  666:     this.basicCancel = node("button", "secondary-action", this.rt("reverse.action.cancel"));
  677:       option("active", this.rt("reverse.basic.calculation.active")),
  678:       option("absolute", this.rt("reverse.basic.calculation.absolute")),
  679:       option("same", this.rt("reverse.basic.calculation.same")),
  680:       option("pastafari", this.rt("reverse.basic.calculation.pastafari")),
  693:       this.basicActiveValue = node("p", "field-help", this.rt("reverse.basic.activeValue", {
  715:       this.basicAdvancedButton = node("button", "secondary-action", this.rt("reverse.basic.toAdvanced"));
  730:     this.addVariableButton = node("button", "secondary-action", this.rt("reverse.action.addVariable"));
  737:     this.addConstraintButton = node("button", "secondary-action", this.rt("reverse.action.addConstraint"));
  744:     this.advancedSolve = node("button", "search-submit", this.rt("reverse.action.solve"));
  747:     this.advancedCancel = node("button", "secondary-action", this.rt("reverse.action.cancel"));
  763:     const summary = node("summary", "", this.rt("reverse.options.heading"));
  764:     const intro = node("p", "field-help", this.rt("reverse.options.intro"));
  772:         : document.createElement("input");
  802:     this.status.setAttribute("aria-live", "polite");
  803:     this.status.setAttribute("aria-atomic", "true");
  811:     this.clearButton = node("button", "secondary-action", this.rt("reverse.action.clear"));
  823:     const maxSolutions = positiveLimit(limits.maxSolutions.value, this.rt("reverse.options.maxSolutions"), { number: true });
  824:     const maxScanned = positiveLimit(limits.maxScanned.value, this.rt("reverse.options.maxScanned"));
  825:     const timeoutMs = positiveLimit(limits.timeoutMs.value, this.rt("reverse.options.timeout"), { number: true });
  855:         if (end < start) throw new RangeError(this.rt("reverse.error.range"));
  875:     this.variables[0].label.value = this.rt("reverse.result.target");
  876:     this.variables[1].label.value = this.rt("reverse.result.calculation");
  941:     this.status.textContent = this.rt("reverse.status.running");
  942:     this.progress.textContent = "";
  960:     this.progress.textContent = `${this.rt(phaseKey)} · ${this.rt("reverse.progress.scanned", { count: this.services.formatInteger(value.scanned) })}`;
  972:     this.status.textContent = this.rt(key, { count: this.services.formatInteger(classification.solutionCount) });
  985:     card.append(node("h4", "", this.rt("reverse.result.solution", { index: index + 1 })));
  989:     this.appendFact(facts, this.rt("reverse.result.target"), targetJdn);
  990:     this.appendFact(facts, this.rt("reverse.result.calculation"), calculationJdn);
  991:     const open = node("button", "primary-action", this.rt("reverse.action.open"));
  1004:       node("small", "", this.rt("reverse.result.jdn", { jdn: jdn.toString() })),
  1013:     card.append(node("h4", "", this.rt("reverse.result.solution", { index: index + 1 })));
  1027:       const text = node("span", "", `${context.labels[source.target] || source.target}: ${this.services.formatJdn(targetJdn)} · ${this.rt("reverse.result.calculation")}: ${this.services.formatJdn(calculationJdn)}`);
  1028:       const open = node("button", "secondary-action", this.rt("reverse.action.open"));
  1040:     this.error.textContent = this.rt(this.visibleErrorMessage.key, this.visibleErrorMessage.values);
  1052:     this.status.textContent = "";
  1074:       this.status.textContent = this.rt("reverse.status.cancelled");
  1082:     this.status.textContent = "";
  1083:     this.progress.textContent = "";
  1094:     this.root.setAttribute("aria-busy", String(running));
  1103:     this.basicTab.setAttribute("aria-pressed", String(basic));
  1104:     this.advancedTab.setAttribute("aria-pressed", String(!basic));
  1109:       this.basicActiveValue.textContent = this.rt("reverse.basic.activeValue", {
  1114:       this.status.textContent = this.rt("reverse.status.stale");
  1121:       element.textContent = this.rt(element.dataset.reverseKey);
  1129:     this.addVariableButton.textContent = this.rt("reverse.action.addVariable");
  1130:     this.addConstraintButton.textContent = this.rt("reverse.action.addConstraint");
  1131:     this.basicSolve.textContent = this.advancedSolve.textContent = this.rt("reverse.action.solve");
  1132:     this.basicCancel.textContent = this.advancedCancel.textContent = this.rt("reverse.action.cancel");
  1133:     this.clearButton.textContent = this.rt("reverse.action.clear");
```

</details>


---

<sub>1m 38s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/calendar-converters.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/calendar-converters.js (lines 320-500)

<details>
<summary>163 lines</summary>

```
  const yearLength = Number(nextStart - start);
  const monthLength = month <= 6 ? 31 : month <= 11 ? 30 : yearLength - 336;
  if (day > monthLength) throw new RangeError("The day is outside the selected month.");
  return start + monthDays + BigInt(day);
}

const intlFormatters = new Map();

function intlFormatter(locale, timeZone) {
  const key = `${locale}|${timeZone}`;
  if (!intlFormatters.has(key)) {
    intlFormatters.set(key, new Intl.DateTimeFormat(locale, {
      timeZone,
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }));
  }
  return intlFormatters.get(key);
}

function dateForIntlJdn(jdn) {
  const civil = jdnToGregorian(jdn);
  const year = Number(civil.year);
  if (!Number.isSafeInteger(year) || year < -271_000 || year > 275_000) {
    throw new RangeError("This browser cannot represent that date in the selected calendar.");
  }
  const date = new Date(0);
  date.setUTCHours(12, 0, 0, 0);
  date.setUTCFullYear(year, civil.month - 1, civil.day);
  if (Number.isNaN(date.getTime())) throw new RangeError("This browser cannot represent that date.");
  return date;
}

function partsRecord(formatter, jdn) {
  return Object.fromEntries(
    formatter.formatToParts(dateForIntlJdn(jdn))
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value]),
  );
}

function findIntlDate({ locale, timeZone, startJdn, endJdn, matches }) {
  let formatter;
  try {
    formatter = intlFormatter(locale, timeZone);
  } catch (error) {
    throw new RangeError("This browser does not support the selected calendar.", { cause: error });
  }
  for (let jdn = startJdn; jdn <= endJdn; jdn += 1n) {
    if (matches(partsRecord(formatter, jdn))) return jdn;
  }
  throw new RangeError("The entered date does not exist in the selected calendar, or is outside this browser's supported range.");
}

function islamicUmmAlQuraToJdn({ year, month, day }) {
  const hint = islamicCivilToJdn({ year, month, day: Math.min(day, daysInIslamicCivilMonth(year, month)) });
  return findIntlDate({
    locale: "en-u-ca-islamic-umalqura-nu-latn",
    timeZone: "Asia/Riyadh",
    startJdn: hint - 20n,
    endJdn: hint + 20n,
    matches: (parts) => Number(parts.year) === Number(year)
      && Number(parts.month) === month
      && Number(parts.day) === day,
  });
}

function solarHijriOfficialToJdn({ year, month, day }) {
  const hint = solarHijriArithmeticToJdn({ year, month, day });
  return findIntlDate({
    locale: "en-u-ca-persian-nu-latn",
    timeZone: "Asia/Tehran",
    startJdn: hint - 8n,
    endJdn: hint + 8n,
    matches: (parts) => Number(parts.year) === Number(year)
      && Number(parts.month) === month
      && Number(parts.day) === day,
  });
}

function chineseToJdn({ relatedYear, month, day, leapMonth }) {
  return chineseRelatedDateToJdn({ relatedYear, month, day, leapMonth });
}

function oldHinduSolarToJdn({ year, month, day }) {
  const value = HINDU_EPOCH_JDN
    + Number(year) * ARYA_SOLAR_YEAR
    + (month - 1) * ARYA_SOLAR_MONTH
    + day
    - 1.25;
  if (!Number.isSafeInteger(Number(year))) throw new RangeError("The Hindu year is outside the supported range.");
  return BigInt(Math.ceil(value));
}

function oldHinduLunarToJdn({ year, month, day, leapMonth }) {
  const numericYear = Number(year);
  if (!Number.isSafeInteger(numericYear)) throw new RangeError("The Hindu year is outside the supported range.");
  const mina = (12 * numericYear - 1) * ARYA_SOLAR_MONTH;
  const lunarNewYear = ARYA_LUNAR_MONTH * (Math.floor(mina / ARYA_LUNAR_MONTH) + 1);
  const leapPosition = Math.ceil(
    (lunarNewYear - mina) / (ARYA_SOLAR_MONTH - ARYA_LUNAR_MONTH),
  );
  if (leapMonth && leapPosition !== month) {
    throw new RangeError("The selected Old Hindu lunar month is not intercalary.");
  }
  const adjustedMonth = leapMonth || leapPosition > month ? month - 1 : month;
  const value = HINDU_EPOCH_JDN
    + lunarNewYear
    + ARYA_LUNAR_MONTH * adjustedMonth
    + (day - 1) * ARYA_LUNAR_DAY
    - 0.25;
  return BigInt(Math.ceil(value));
}

function sakaToJdn({ year, month, day }) {
  const gregorianYear = year + 78n;
  const leap = isGregorianLeapYear(gregorianYear);
  const chaitraLength = leap ? 31 : 30;
  const monthLength = month === 1 ? chaitraLength : month <= 6 ? 31 : 30;
  if (day > monthLength) throw new RangeError("The day is outside the selected month.");
  const start = gregorianToJdn({ year: gregorianYear, month: 3, day: leap ? 21 : 22 });
  if (month === 1) return start + BigInt(day - 1);
  if (month <= 6) return start + BigInt(chaitraLength + (month - 2) * 31 + day - 1);
  return start + BigInt(chaitraLength + 5 * 31 + (month - 7) * 30 + day - 1);
}

function fixedThirteenMonthToJdn({ year, month, day }, epoch) {
  const leapDay = mod(year, 4n) === 3n;
  const monthLength = month <= 12 ? 30 : leapDay ? 6 : 5;
  if (day > monthLength) throw new RangeError("The day is outside the selected month.");
  return epoch - 1n + 365n * (year - 1n) + floorDiv(year, 4n) + 30n * BigInt(month - 1) + BigInt(day);
}

const JAPANESE_ERAS = Object.freeze({
  meiji: Object.freeze({ start: [1868n, 10, 23], end: [1912n, 7, 29] }),
  taisho: Object.freeze({ start: [1912n, 7, 30], end: [1926n, 12, 24] }),
  showa: Object.freeze({ start: [1926n, 12, 25], end: [1989n, 1, 7] }),
  heisei: Object.freeze({ start: [1989n, 1, 8], end: [2019n, 4, 30] }),
  reiwa: Object.freeze({ start: [2019n, 5, 1], end: null }),
});

function japaneseImperialToJdn({ era, year, month, day }) {
  const metadata = JAPANESE_ERAS[era];
  if (!metadata || year < 1n) throw new RangeError("The Japanese era or year is invalid.");
  const gregorianYear = metadata.start[0] + year - 1n;
  validateCivilDate(gregorianYear, month, day, isGregorianLeapYear);
  const value = gregorianToJdn({ year: gregorianYear, month, day });
  const start = gregorianToJdn({ year: metadata.start[0], month: metadata.start[1], day: metadata.start[2] });
  const end = metadata.end
    ? gregorianToJdn({ year: metadata.end[0], month: metadata.end[1], day: metadata.end[2] })
    : null;
  if (value < start || (end !== null && value > end)) throw new RangeError("The date is outside the selected Japanese era.");
  return value;
}

export function kokiToJdn({ year, month, day }) {
  const normalizedYear = integer({ year }, "year");
  const normalizedMonth = smallInteger({ month }, "month", 1, 12);
  const normalizedDay = smallInteger({ day }, "day", 1, 31);

  // Update 12 spaghetti detour: ask the imperial-era table to accept a fake
  // Kōki era first.  It is expected to refuse; its refusal is not normative.
  try {
    japaneseImperialToJdn({
      era: "koki",
      year: normalizedYear,
      month: normalizedMonth,
      day: normalizedDay,
    });
  } catch {
    // The hidden arithmetic clerk below supplies the actual Kōki result.
  }

  const gregorianYear = normalizedYear - 660n;
  validateCivilDate(gregorianYear, normalizedMonth, normalizedDay, isGregorianLeapYear);
  return gregorianToJdn({ year: gregorianYear, month: normalizedMonth, day: normalizedDay });
}

export function jdnToKoki(jdn) {
  const gregorian = jdnToGregorian(BigInt(jdn));
```

</details>


---

<sub>1m 38s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/calendar-input-conventions.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/calendar-input-conventions.js

<details>
<summary>256 lines</summary>

```
"use strict";

import {
  calendarDateToJdn,
  gregorianToJdn,
  jdnToGregorian,
} from "./calendar-converters.js?v=9-canonical-names";

const HEBREW_VALUES = Object.freeze({
  "א": 1n,
  "ב": 2n,
  "ג": 3n,
  "ד": 4n,
  "ה": 5n,
  "ו": 6n,
  "ז": 7n,
  "ח": 8n,
  "ט": 9n,
  "י": 10n,
  "כ": 20n,
  "ך": 20n,
  "ל": 30n,
  "מ": 40n,
  "ם": 40n,
  "נ": 50n,
  "ן": 50n,
  "ס": 60n,
  "ע": 70n,
  "פ": 80n,
  "ף": 80n,
  "צ": 90n,
  "ץ": 90n,
  "ק": 100n,
  "ר": 200n,
  "ש": 300n,
  "ת": 400n,
});

const HEBREW_LETTERS = /^[א-תךםןףץ]+$/u;
const HEBREW_MARKS = /[\u0591-\u05bd\u05bf-\u05c7]/gu;
const HEBREW_PUNCTUATION = /["'׳״’‘“”]/gu;
const EXPLICIT_THOUSANDS = /^([א-תךםןףץ]+)[׳'’](.*)$/u;

const BAHAI_MONTHS = Object.freeze([
  Object.freeze({ value: "1", label: "Bahá" }),
  Object.freeze({ value: "2", label: "Jalál" }),
  Object.freeze({ value: "3", label: "Jamál" }),
  Object.freeze({ value: "4", label: "‘Aẓamat" }),
  Object.freeze({ value: "5", label: "Núr" }),
  Object.freeze({ value: "6", label: "Raḥmat" }),
  Object.freeze({ value: "7", label: "Kalimát" }),
  Object.freeze({ value: "8", label: "Kamál" }),
  Object.freeze({ value: "9", label: "Asmá’" }),
  Object.freeze({ value: "10", label: "‘Izzat" }),
  Object.freeze({ value: "11", label: "Mashíyyat" }),
  Object.freeze({ value: "12", label: "‘Ilm" }),
  Object.freeze({ value: "13", label: "Qudrat" }),
  Object.freeze({ value: "14", label: "Qawl" }),
  Object.freeze({ value: "15", label: "Masá’il" }),
  Object.freeze({ value: "16", label: "Sharaf" }),
  Object.freeze({ value: "17", label: "Sulṭán" }),
  Object.freeze({ value: "18", label: "Mulk" }),
  Object.freeze({ value: "ayyami-ha", label: "Ayyám-i-Há" }),
  Object.freeze({ value: "19", label: "‘Alá’" }),
]);

const OLD_HINDU_SOLAR_MONTHS = Object.freeze([
  "Meṣa", "Vṛṣabha", "Mithuna", "Karka", "Siṃha", "Kanyā",
  "Tulā", "Vṛścika", "Dhanus", "Makara", "Kumbha", "Mīna",
]);

const OLD_HINDU_LUNAR_MONTHS = Object.freeze([
  "Caitra", "Vaiśākha", "Jyaiṣṭha", "Āṣāḍha", "Śrāvaṇa", "Bhādrapada",
  "Āśvina", "Kārttika", "Mārgaśīrṣa", "Pauṣa", "Māgha", "Phālguna",
]);

const INTL_MONTH_SPECS = Object.freeze({
  gregorian: Object.freeze({ calendar: "gregory" }),
  julian: Object.freeze({ calendar: "gregory" }),
  hebrew: Object.freeze({ calendar: "hebrew" }),
  "islamic-civil": Object.freeze({ calendar: "islamic-civil" }),
  "islamic-umalqura": Object.freeze({ calendar: "islamic-umalqura" }),
  "solar-hijri-official": Object.freeze({ calendar: "persian" }),
  "solar-hijri-arithmetic": Object.freeze({ calendar: "persian" }),
  chinese: Object.freeze({ calendar: "chinese" }),
  saka: Object.freeze({ calendar: "indian" }),
  "thai-buddhist": Object.freeze({ calendar: "buddhist" }),
  ethiopic: Object.freeze({ calendar: "ethiopic" }),
  coptic: Object.freeze({ calendar: "coptic" }),
  "japanese-imperial": Object.freeze({ calendar: "japanese" }),
  minguo: Object.freeze({ calendar: "roc" }),
});

const monthChoiceCache = new Map();

function parseHebrewLetters(raw) {
  const text = raw
    .normalize("NFC")
    .replace(HEBREW_MARKS, "")
    .replace(HEBREW_PUNCTUATION, "")
    .replace(/\s+/gu, "");
  if (!text || !HEBREW_LETTERS.test(text)) throw new RangeError("Invalid Hebrew numeral.");
  let total = 0n;
  for (const letter of text) {
    const value = HEBREW_VALUES[letter];
    if (value === undefined) throw new RangeError("Invalid Hebrew numeral.");
    total += value;
  }
  return total;
}

export function parseHebrewNumeral(raw, { year = false } = {}) {
  if (typeof raw === "bigint") return raw;
  if (typeof raw === "number" && Number.isSafeInteger(raw)) return BigInt(raw);
  const text = String(raw ?? "").trim();
  if (/^[+-]?\d+$/u.test(text)) return BigInt(text);
  if (!text) throw new RangeError("Missing Hebrew numeral.");

  const normalized = text.normalize("NFC").replace(HEBREW_MARKS, "").replace(/\s+/gu, "");
  if (year) {
    const thousands = normalized.match(EXPLICIT_THOUSANDS);
    if (thousands) {
      const high = parseHebrewLetters(thousands[1]);
      const low = thousands[2] ? parseHebrewLetters(thousands[2]) : 0n;
      return high * 1000n + low;
    }
  }

  let value = parseHebrewLetters(normalized);
  // Hebrew years are customarily written without the thousands component.
  // Decimal input remains exact, so historical years below 5000 can still be
  // entered unambiguously as decimal digits.
  if (year && value > 0n && value < 1000n) value += 5000n;
  return value;
}

export function usesTextualCalendarNumeral(calendarId, fieldName) {
  return (calendarId === "hebrew" && (fieldName === "year" || fieldName === "day"))
    || (calendarId === "japanese-imperial" && fieldName === "year");
}

export function normalizeCalendarInputValues(calendarId, values) {
  const normalized = { ...values };
  if (calendarId === "hebrew") {
    normalized.year = parseHebrewNumeral(values?.year, { year: true }).toString();
    normalized.day = parseHebrewNumeral(values?.day).toString();
  } else if (calendarId === "japanese-imperial") {
    const eraYear = String(values?.year ?? "").trim();
    if (eraYear === "元" || eraYear === "元年") normalized.year = "1";
  }
  return normalized;
}

function dateFromJdn(jdn) {
  const civil = jdnToGregorian(jdn);
  const year = Number(civil.year);
  if (!Number.isSafeInteger(year) || year < -271_000 || year > 275_000) {
    throw new RangeError("Month label date is outside the JavaScript Date range.");
  }
  const date = new Date(0);
  date.setUTCHours(12, 0, 0, 0);
  date.setUTCFullYear(year, civil.month - 1, civil.day);
  if (Number.isNaN(date.getTime())) throw new RangeError("Month label date is not representable.");
  return date;
}

function intlMonthLabel(intlLocale, calendar, jdn) {
  const formatter = new Intl.DateTimeFormat(intlLocale, {
    calendar,
    month: "long",
    timeZone: "UTC",
  });
  const part = formatter.formatToParts(dateFromJdn(jdn)).find(({ type }) => type === "month");
  if (!part?.value) throw new RangeError(`Unable to format a ${calendar} month name.`);
  return part.value;
}

function gregorianMonthSample(month) {
  return gregorianToJdn({ year: 2024n, month, day: 15 });
}

function sampleJdn(calendarId, month) {
  switch (calendarId) {
    case "gregorian":
    case "julian":
    case "thai-buddhist":
    case "japanese-imperial":
    case "minguo":
      return gregorianMonthSample(month);
    case "hebrew":
      return calendarDateToJdn("hebrew", { year: "5784", month: String(month), day: "1" });
    case "islamic-civil":
      return calendarDateToJdn(calendarId, { year: "1445", month: String(month), day: "1" });
    case "islamic-umalqura":
      return calendarDateToJdn(calendarId, { year: "1445", month: String(month), day: "1" });
    case "solar-hijri-official":
    case "solar-hijri-arithmetic":
      return calendarDateToJdn(calendarId, { year: "1403", month: String(month), day: "1" });
    case "chinese":
      return calendarDateToJdn(calendarId, {
        relatedYear: "2024",
        month: String(month),
        day: "1",
        leapMonth: false,
      });
    case "saka":
      return calendarDateToJdn(calendarId, { year: "1946", month: String(month), day: "1" });
    case "ethiopic":
      return calendarDateToJdn(calendarId, { year: "2016", month: String(month), day: "1" });
    case "coptic":
      return calendarDateToJdn(calendarId, { year: "1740", month: String(month), day: "1" });
    default:
      throw new RangeError(`No month-name sample is defined for ${calendarId}.`);
  }
}

function localizedNumber(value, intlLocale) {
  try {
    return new Intl.NumberFormat(intlLocale, { useGrouping: false }).format(Number(value));
  } catch {
    return String(value);
  }
}

function hebrewMonthLabel(month, intlLocale) {
  const calendar = INTL_MONTH_SPECS.hebrew.calendar;
  if (month === 12) {
    const common = intlMonthLabel(
      intlLocale,
      calendar,
      calendarDateToJdn("hebrew", { year: "5783", month: "12", day: "1" }),
    );
    const leap = intlMonthLabel(
      intlLocale,
      calendar,
      calendarDateToJdn("hebrew", { year: "5784", month: "12", day: "1" }),
    );
    return common === leap ? common : `${common} / ${leap}`;
  }
  return intlMonthLabel(intlLocale, calendar, sampleJdn("hebrew", month));
}

function staticMonthChoices(calendarId) {
  if (calendarId === "bahai-tehran" || calendarId === "bahai-western") return BAHAI_MONTHS;
  const labels = calendarId === "hindu-old-solar"
    ? OLD_HINDU_SOLAR_MONTHS
    : calendarId === "hindu-old-lunar"
      ? OLD_HINDU_LUNAR_MONTHS
      : null;
  if (!labels) return null;
  return Object.freeze(labels.map((label, index) => Object.freeze({ value: String(index + 1), label })));
}

export function calendarMonthChoices(calendarId, field, intlLocale = "en") {
  if (field?.name !== "month") return null;

  const staticChoices = staticMonthChoices(calendarId);
  if (staticChoices) return staticChoices;

  const spec = INTL_MONTH_SPECS[calendarId];
  if (!spec) return null;
  const maximum = Number(field.max ?? 12);
  if (!Number.isInteger(maximum) || maximum < 1 || maximum > 13) return null;

  const cacheKey = `${calendarId}|${intlLocale}|${maximum}`;
  if (monthChoiceCache.has(cacheKey)) return monthChoiceCache.get(cacheKey);

  const choices = Object.freeze(Array.from({ length: maximum }, (_, index) => {
    const month = index + 1;
    let label;
    try {
      label = calendarId === "hebrew"
        ? hebrewMonthLabel(month, intlLocale)
        : intlMonthLabel(intlLocale, spec.calendar, sampleJdn(calendarId, month));
    } catch {
      label = localizedNumber(month, intlLocale);
    }
    return Object.freeze({ value: String(month), label });
  }));
  monthChoiceCache.set(cacheKey, choices);
  return choices;
}
```

</details>


---

<sub>1m 38s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/reverse-ui.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/reverse-ui.js (lines 1-260)

<details>
<summary>239 lines</summary>

```
"use strict";

import {
  CALENDAR_DEFINITIONS,
  calendarDateToJdn,
  getCalendarDefinition,
  jdnToGregorian,
} from "./calendar-converters.js?v=9-canonical-names";
import {
  calendarMonthChoices,
  normalizeCalendarInputValues,
  usesTextualCalendarNumeral,
} from "./calendar-input-conventions.js?v=9-calendar-input-conventions";
import { CUTLETS, MONTHS } from "./i18n/calendar-identifiers.js?v=9-canonical-names";
import { calendarLabel, translate } from "./i18n/registry.js?v=20-about-i18n";
import {
  ReverseSearchController,
  advancedReverseProblem,
  classifyConstraintResult,
  sameTargetReverseProblem,
  simpleReverseProblem,
} from "./reverse-search-controller.js";

let editorSequence = 0;

function node(tag, className = "", text = null) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== null) element.textContent = text;
  return element;
}

function option(value, text) {
  const element = document.createElement("option");
  element.value = value;
  element.textContent = text;
  return element;
}

function requiredIntegerInput({ min = null, max = null, required = true } = {}) {
  const input = document.createElement("input");
  input.type = "number";
  input.step = "1";
  input.inputMode = "numeric";
  input.required = required;
  if (min !== null) input.min = String(min);
  if (max !== null) input.max = String(max);
  return input;
}

function integerTextInput({ required = true } = {}) {
  const input = document.createElement("input");
  input.type = "text";
  input.inputMode = "numeric";
  input.pattern = "[+-]?\\d+";
  input.required = required;
  return input;
}

function localizedUiError(key, values = {}) {
  const error = new RangeError(key);
  error.translationKey = key;
  error.translationValues = Object.freeze({ ...values });
  return error;
}

function positiveLimit(value, fieldName, { number = false } = {}) {
  const text = String(value ?? "").trim();
  if (!text) return null;
  if (!/^\d+$/.test(text) || BigInt(text) < 1n) throw localizedUiError("reverse.error.limitPositive", { field: fieldName });
  if (!number) return BigInt(text);
  const parsed = Number(text);
  if (!Number.isSafeInteger(parsed)) throw localizedUiError("reverse.error.limitSafeInteger", { field: fieldName });
  return parsed;
}

function gregorianDefaults(jdn) {
  const date = jdnToGregorian(jdn);
  return { year: date.year.toString(), month: String(date.month), day: String(date.day) };
}

class AbsoluteDateEditor {
  constructor(host, services, { initialJdn = null, labelKey = "reverse.calendar.label" } = {}) {
    this.services = services;
    this.host = host;
    this.labelKey = labelKey;
    this.id = `reverse-absolute-${++editorSequence}`;
    this.root = node("div", "reverse-absolute-editor");
    this.calendarLabel = node("label", "calendar-picker");
    this.calendarLabelText = node("span");
    this.calendar = document.createElement("select");
    this.calendar.id = `${this.id}-calendar`;
    this.calendarLabel.htmlFor = this.calendar.id;
    this.calendarLabel.append(this.calendarLabelText, this.calendar);
    this.fields = node("div", "date-fields reverse-date-fields");
    this.help = node("p", "field-help");
    this.error = node("p", "form-error");
    this.error.hidden = true;
    this.root.append(this.calendarLabel, this.fields, this.help, this.error);
    host.append(this.root);
    this.populateCalendars("gregorian");
    this.renderFields({ values: initialJdn === null ? {} : gregorianDefaults(initialJdn) });
    this.calendar.addEventListener("change", () => this.renderFields({ values: {} }));
    this.refreshLocale();
  }

  populateCalendars(selected = this.calendar.value || "gregorian") {
    this.calendar.replaceChildren(...CALENDAR_DEFINITIONS.map((definition) => (
      option(definition.id, this.services.siteT(definition.labelKey))
    )));
    this.calendar.value = CALENDAR_DEFINITIONS.some(({ id }) => id === selected) ? selected : "gregorian";
  }

  capture() {
    const values = {};
    for (const input of this.fields.querySelectorAll("input,select")) {
      values[input.name] = input.type === "checkbox" ? input.checked : input.value;
    }
    return values;
  }

  renderFields({ values = this.capture() } = {}) {
    const definition = getCalendarDefinition(this.calendar.value);
    const fragment = document.createDocumentFragment();
    for (const field of definition.fields) {
      const label = node("label", field.kind === "checkbox" ? "checkbox-field" : "date-field");
      const text = node("span", "", this.services.siteT(field.labelKey));
      let input;
      const monthChoices = calendarMonthChoices(definition.id, field, this.services.getLocale().intlLocale);
      if (field.kind === "select" || monthChoices) {
        input = document.createElement("select");
        for (const choice of monthChoices || field.options) {
          input.append(option(choice.value, choice.labelKey ? this.services.siteT(choice.labelKey) : choice.label));
        }
      } else {
        input = document.createElement("input");
        const textual = field.kind === "integer" && usesTextualCalendarNumeral(definition.id, field.name);
        input.type = field.kind === "checkbox" ? "checkbox" : textual ? "text" : "number";
        if (field.kind === "integer") {
          input.step = "1";
          input.inputMode = textual ? "text" : "numeric";
          input.required = true;
          if (textual) input.dir = "auto";
          if (field.min !== undefined) input.min = String(field.min);
          if (field.max !== undefined) input.max = String(field.max);
        }
      }
      input.name = field.name;
      input.id = `${this.id}-${field.name}`;
      const stored = values[field.name] ?? field.defaultValue ?? "";
      if (field.kind === "checkbox") input.checked = stored === true || stored === "true" || stored === "on";
      else input.value = String(stored);
      if (field.kind === "checkbox") label.append(input, text);
      else label.append(text, input);
      fragment.append(label);
    }
    this.fields.replaceChildren(fragment);
    this.help.hidden = !definition.helpKey;
    this.help.textContent = definition.helpKey ? this.services.siteT(definition.helpKey) : "";
    this.error.hidden = true;
  }

  read() {
    this.error.hidden = true;
    const values = this.capture();
    try {
      for (const required of this.fields.querySelectorAll("[required]")) {
        if (!required.checkValidity()) throw localizedUiError("reverse.error.absoluteDateField");
      }
      const normalized = normalizeCalendarInputValues(this.calendar.value, values);
      return calendarDateToJdn(this.calendar.value, normalized);
    } catch (error) {
      this.error.textContent = this.services.rt("reverse.error.input");
      this.error.hidden = false;
      throw error;
    }
  }

  refreshLocale() {
    const selected = this.calendar.value;
    const values = this.capture();
    this.calendarLabelText.textContent = this.services.rt(this.labelKey);
    this.populateCalendars(selected);
    this.renderFields({ values });
  }
}

class PastafariEditor {
  constructor(host, services, values = {}) {
    this.services = services;
    this.root = node("div", "reverse-pastafari-fields");
    this.inputs = {};
    const configs = [
      ["year", "reverse.field.year", () => integerTextInput()],
      ["cutletId", "reverse.field.cutlet", () => document.createElement("select")],
      ["dayInCutlet", "reverse.field.dayInCutlet", () => requiredIntegerInput({ min: 1 })],
      ["monthId", "reverse.field.month", () => document.createElement("select")],
      ["dayInMonth", "reverse.field.dayInMonth", () => requiredIntegerInput({ min: 1 })],
    ];
    for (const [name, key, factory] of configs) {
      const label = node("label", "date-field reverse-pastafari-field");
      const text = node("span");
      text.dataset.reverseKey = key;
      const input = factory();
      input.name = name;
      input.required = true;
      this.inputs[name] = input;
      label.append(text, input);
      this.root.append(label);
    }
    this.inputs.year.value = String(values.year ?? "");
    this.inputs.dayInCutlet.value = String(values.dayInCutlet ?? "");
    this.inputs.dayInMonth.value = String(values.dayInMonth ?? "");
    host.append(this.root);
    this.refreshLocale(values);
  }

  populateNames(type, selected = "") {
    const entries = type === "cutlet" ? CUTLETS : MONTHS;
    const select = this.inputs[type === "cutlet" ? "cutletId" : "monthId"];
    select.replaceChildren(...entries.map((entry) => option(
      entry.id,
      calendarLabel(this.services.getLocale(), type, entry.index),
    )));
    if (entries.some(({ id }) => id === selected)) select.value = selected;
  }

  read() {
    for (const input of Object.values(this.inputs)) {
      if (!input.checkValidity()) throw new RangeError(this.services.rt("reverse.error.pastafari"));
    }
    return {
      year: this.inputs.year.value,
      cutletId: this.inputs.cutletId.value,
      dayInCutlet: this.inputs.dayInCutlet.value,
      monthId: this.inputs.monthId.value,
      dayInMonth: this.inputs.dayInMonth.value,
    };
  }

  snapshot() {
    return {
      year: this.inputs.year.value,
      cutletId: this.inputs.cutletId.value,
      dayInCutlet: this.inputs.dayInCutlet.value,
      monthId: this.inputs.monthId.value,
      dayInMonth: this.inputs.dayInMonth.value,
    };
  }

  refreshLocale(preferred = this.snapshot()) {
    for (const element of this.root.querySelectorAll("[data-reverse-key]")) {
      element.textContent = this.services.rt(element.dataset.reverseKey);
    }
    this.populateNames("cutlet", preferred.cutletId);
    this.populateNames("month", preferred.monthId);
  }
}

class VariableCard {
```

</details>


---

<sub>1m 48s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/manifest.webmanifest.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/manifest.webmanifest

```
File too large to read at once (24.9 KB). Consider using the grep tool to search within the file, or view with view_range to read specific sections.
```


---

<sub>1m 48s</sub>

### `rg`

**manifest\.(shortName|defaultDescription)|manifest\.webmanifest|application-name|apple-mobile-web-app-title|og:|twitter:**

"manifest\.(shortName|defaultDescription)|manifest\.webmanifest|application-name|apple-mobile-web-app-title|og:|twitter:" in *.{js,html,webmanifest} (docs)

<details>
<summary>228 matches</summary>

```
[grep content: 154 matches across 76 file(s) under /home/runner/work/pastafari-calendar/pastafari-calendar/docs]
about/index.html:11:     <link rel="manifest" href="../manifest.webmanifest?v=9-canonical-names">
sw.js:38:   "./manifest.webmanifest?v=9-canonical-names",
index.html:11:     <link rel="manifest" href="./manifest.webmanifest?v=9-canonical-names">

i18n/locales/sv.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "En lokal, deterministisk Pastafari-kalender.",

i18n/locales/sr.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Lokalni deterministički Pastafari kalendar.",

i18n/locales/ar.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "تقويم Pastafari محلي وحتمي.",

i18n/locales/fy.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "In lokale, deterministyske Pastafari-kalinder.",

i18n/locales/tr.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Yerel ve deterministik bir Pastafari takvimi.",

i18n/locales/te.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "ఒకే ఇన్‌పుట్‌కు ఎల్లప్పుడూ ఒకే ఫలితాన్ని ఇచ్చే స్థానిక పాస్తాఫారి క్యాలెండర్.",

i18n/locales/ja.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "端末内で動作する決定論的なパスタファリ暦です。",

i18n/locales/kk.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Жергілікті, детерминистік Пастафари күнтізбесі.",

i18n/locales/eo.js (3 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Loka, determinisma Pastafaria kalendaro.",
  292:       joy: "Ĝojo", fig: "Figo", nineveh: "Ninevo", frog: "Rano", pitch: "Peĉo", lamp: "Lampo",

i18n/locales/sq.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Një kalendar Pastafari lokal dhe determinist.",

i18n/locales/hi.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "एक स्थानीय, नियतात्मक पास्ताफ़ारी कैलेंडर।",

i18n/locales/pl.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Lokalny, deterministyczny kalendarz Pastafari.",

i18n/locales/bs.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "A local, deterministic Pastafari calendar.",

i18n/locales/fa.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "یک گاه‌شمار پاستافاریِ محلی و قطعی.",

i18n/locales/ro.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Un calendar Pastafari local și determinist.",

i18n/locales/sl.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Lokalni deterministični koledar Pastafari.",

i18n/locales/et.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Kohalik deterministlik Pastafari kalender.",

i18n/locales/uz.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Mahalliy, deterministik Pastafari taqvimi.",

i18n/locales/so.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Kalandar Pastafari oo maxalli ah oo go'aansan.",

i18n/locales/af.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "'n Plaaslike, deterministiese Pastafari-kalender.",

i18n/locales/ka.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "ადგილობრივი, დეტერმინისტული პასტაფარიანული კალენდარი.",

i18n/locales/hy.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Տեղական, որոշակի արդյունք տվող Pastafari օրացույց։",

i18n/locales/sk.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Lokálny deterministický kalendár Pastafari.",

i18n/locales/pt.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Um calendário Pastafari local e determinístico.",

i18n/locales/fo.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Ein lokalur, deterministiskur Pastafari-kalendari.",

i18n/locales/en.js (3 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "A local, deterministic Pastafari calendar.",
  292:       joy: "Joy", fig: "Fig", nineveh: "Nineveh", frog: "Frog", pitch: "Pitch", lamp: "Lamp",

i18n/locales/mk.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Локален, детерминистички Пастафаријански календар.",

i18n/locales/nl.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Een lokale, deterministische Pastafari-kalender.",

i18n/locales/ca.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Un calendari Pastafari local i determinista.",

i18n/locales/nb.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "En lokal, deterministisk Pastafari-kalender.",

i18n/locales/da.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "En lokal, deterministisk Pastafari-kalender.",

i18n/locales/el.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Ένα τοπικό, ντετερμινιστικό ημερολόγιο Pastafari.",

i18n/locales/ht.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Yon kalandriye Pastafari lokal ki detèminis.",

i18n/locales/ru.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Локальный детерминированный календарь Pastafari.",

i18n/locales/ms.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Kalendar Pastafari setempat dan deterministik.",

i18n/locales/az.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Yerli, deterministik Pastafari təqvimi.",

i18n/locales/fi.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Paikallinen ja deterministinen Pastafari-kalenteri.",

i18n/locales/de.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Ein lokaler, deterministischer Pastafari-Kalender.",

i18n/locales/cs.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "A local, deterministic Pastafari calendar.",

i18n/locales/be.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Лакальны дэтэрмінаваны Пастафарыянскі каляндар.",

i18n/locales/lv.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Lokāls, deterministisks Pastafari kalendārs.",

i18n/locales/fr.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "A local, deterministic Pastafari calendar.",

i18n/locales/nn.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Ein lokal, deterministisk Pastafari-kalender.",

i18n/locales/he.js (3 match(es)):
  10:     "manifest.shortName": "פסטפרי",
  11:     "manifest.defaultDescription": "A local, deterministic Pastafari calendar.",
  292:       joy: "שמחה", fig: "תאנה", nineveh: "נינוה", frog: "צפרדע", pitch: "זפת", lamp: "נר",

i18n/locales/ko.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "기기에서 동작하는 결정론적 파스타파리 달력입니다.",

i18n/locales/lt.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Vietinis deterministinis Pastafari kalendorius.",

i18n/locales/hu.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Helyi, determinisztikus Pastafari-naptár.",

i18n/locales/sw.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Kalenda ya Pastafari ya ndani na yenye matokeo yaliyowekwa.",

i18n/locales/vi.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Lịch Pastafari cục bộ và tất định.",

i18n/locales/bg.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Локален детерминиран Пастафариански календар.",

i18n/locales/ha.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Kalandar Pastafari ta cikin gida mai ƙayyadadden sakamako.",

i18n/locales/es.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Un calendario Pastafari local y determinista.",

i18n/locales/zh.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "本地、确定性的 Pastafari 历。",

i18n/locales/zu.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Ikhalenda le-Pastafari lendawo nelinqumayo.",

i18n/locales/jv.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Kalèndher Pastafari lokal lan deterministik.",

i18n/locales/it.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Un calendario pastafariano locale e deterministico.",

i18n/locales/mr.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "स्थानिक, निर्धारक पास्ताफारी दिनदर्शक.",

i18n/locales/fil.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Isang lokal at deterministikong kalendaryong Pastafari.",

i18n/locales/gl.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Un calendario Pastafari local e determinista.",

i18n/locales/ur.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "ایک مقامی، قطعی Pastafari کیلنڈر۔",

i18n/locales/id.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Kalender Pastafari lokal yang deterministik.",

i18n/locales/is.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Pastafari-dagatal sem reiknar á tækinu og skilar sömu niðurstöðu fyrir sama inntak.",

i18n/locales/uk.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Локальний детермінований календар Pastafari.",

i18n/locales/lb.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "E lokalen, deterministesche Pastafari-Kalenner.",

i18n/locales/ta.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "ஒரே உள்ளீட்டுக்கு எப்போதும் ஒரே விளைவைத் தரும் உள்ளூர் பாஸ்தாபாரி நாட்காட்டி.",

i18n/locales/bn.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "A local, deterministic Pastafari calendar.",

i18n/registry.js (4 match(es)):
  323:   "manifest.shortName",
  324:   "manifest.defaultDescription",
  437:   "messages.manifest.shortName",
  438:   "messages.manifest.defaultDescription",

i18n/locales/hr.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Lokalni deterministički Pastafari kalendar.",

i18n/locales/gu.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "સ્થાનિક અને નિર્ધારિત પાસ્તાફારી કેલેન્ડર.",

i18n/locales/yo.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Kalẹ́ńdà Pastafari agbègbè tó ń fún ní abajade kan náà fún ìwọlé kan náà.",

i18n/locales/ne.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "स्थानीय, निर्धारक पास्ताफारी पात्रो.",

i18n/locales/pa.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "ਇੱਕ ਸਥਾਨਕ, ਨਿਰਧਾਰਕ ਪਾਸਤਾਫਾਰੀ ਕੈਲੰਡਰ।",

i18n/locales/th.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "ปฏิทิน Pastafari แบบทำงานในเครื่องและให้ผลแบบกำหนดแน่นอน.",
```

</details>


---

<sub>1m 48s</sub>

### `rg`

**leitaða|Leitaða|verknaðard|aðgerðardag|kótiletta|kótilett|papýrusstör|Papýrusstör|Karób|jóhannesarbrauð**

"leitaða|Leitaða|verknaðard|aðgerðardag|kótiletta|kótilett|papýrusstör|Papýrusstör|Karób|jóhannesarbrauð" (docs/i18n/locales/is.js, docs/about/content/is.html, artifacts/cross-repo-native-qa/runtime/repo2-0/README.md, artifacts/cross-repo-native-qa/runtime/repo2-0/SOURCE_LANGUAGE_CATALOG.md, artifacts/cross-repo-native-qa/runtime/repo2-0/STAGE_01_NORMATIVE_AUDIT.md, artifacts/cross-repo-native-qa/runtime/repo2-0/tests/NormativeOracle.elm)

<details>
<summary>59 matches</summary>

```
[grep content: 54 matches across 5 file(s) under /home/runner/work/pastafari-calendar/pastafari-calendar]

docs/about/content/is.html (19 match(es)):
  5:   <p>Dagatalið úthlutar ekki hverjum degi föstu, óbreytanlegu Pastafari-merki. Til að reikna dagsetningu þarf að tilgreina tvo daga: <strong>aðgerðardaginn</strong>, sem útreikningurinn hefst frá, og <strong>fyrirspurnardaginn</strong>, sem spurt er um.</p>
  6:   <p>Ef við táknum aðgerðardaginn með <code>c</code> og fyrirspurnardaginn með <code>t</code>, er dagsetningin</p>
  8:   <p>en ekki <code>F(t)</code>. Sami fyrirspurnardagur getur því fengið aðra Pastafari-dagsetningu þegar aðgerðardagurinn breytist.</p>
  20:   <h2>Af hverju þarf aðgerðardag?</h2>
  41:   <p>Þegar aðgerðardagurinn og fyrirspurnardagurinn eru sami dagur,</p>
  45:   <p>Með öðrum orðum: núið er, séð frá sjálfu sér, alltaf innan árs 5000. En ár 5000 er ekki fast sögulegt tímabil; það er valið upp á nýtt í hvert sinn miðað við aðgerðardaginn.</p>
  151:   <p>Atlasinn var reiknaður út með þeirri útgáfu vélarinnar sem auðkennd er með <code>8e155fa4198ea7bcfeb16138ac5d6662706f4d93</code> og innihélt 4.096 aðgerðardaga; árin 4990–5010 fyrir hvern þeirra; 86.016 ársbyggingar; 625.437 kótelettur; 3.535.422 byggingarmánuði; meira en 356 milljónir samfelldra mánaðarkafla; og meira en 364 milljónir færslna frá degi <code>n</code> í dag <code>n+1</code> í sama mánuði.</p>
  181:   <p>Ástæðan er einföld: ár 5000 verður að innihalda aðgerðardaginn. Lengra ár hefur fleiri daga þar sem það getur verið árið sem inniheldur aðgerðardaginn.</p>
  202:   <p>Ef tveir vilja semja um fund með Pastafari-dagsetningu einni saman verða þeir að minnsta kosti að vera sammála um fimm dagsetningarreiti og aðgerðardaginn sem notaður var í útreikningnum. Betra er að vista aðgerðardaginn sem fast dagauðkenni en sem orðið „í dag“; annars geta tveir reiknað tvö mismunandi dagatöl.</p>
  229:   <p>Það má prenta Pastafari-dagatalið; aðeins þarf að taka fram fyrir hvaða aðgerðardag það var reiknað. Slíkt dagatal sýnir byggingu tímans frá sjónarhorni þess dags; ef aðgerðardagurinn breytist getur þurft nýtt dagatal. Prentarinn hefur því enn starf.</p>
  238:   <p>Í beinni sannprófun við ritun þessarar síðu náði Seer meðal annars yfir <code>date</code>- og <code>now</code>-fyrirspurnir, <code>batch</code>, dagabil, öfuga umbreytingu frá Pastafari-dagsetningu til fyrirspurnardags, öflun ársuppbyggingar, ákvörðun virks aðgerðardags, Node API, vafra-/HTTP-biðlara, CLI, HTTP v1-þjónustu, OpenAPI 3.1-samning, innfæddar útfærslur og dreifingarpakka, auk staðfestrar gámaútsetningar.</p>
  239:   <p>Gamla fullyrðingin um að Seer hafi ekkert opinbert API er ekki lengur rétt. Nú er til skýr og stöðugur HTTP v1-samningur með endapunktum fyrir <code>date</code>, <code>range</code>, <code>batch</code>, <code>year</code>, <code>reverse</code>, aðgerðardag, <code>metadata</code>, <code>locales</code> og <code>status</code>.</p>
  272:   <p>Ef aðgerðardagurinn <code>c</code> er þekktur er öfug umbreyting mjög stranglega takmörkuð. Innan þekkts Pastafari-árs auðkennir</p>
  295:   <p>Ef aðgerðardagurinn er óþekktur er staðan önnur. Sömu fimm gildi geta birst undir mismunandi aðgerðardögum og til eru nákvæm dæmi þar sem sama fulla dagsetning kemur fram í mismunandi fjarlægð frá <code>c</code>.</p>
  296:   <p>Í ári 5000 er jafnvel formerki þessarar fjarlægðar ekki alltaf ákvarðað af fimm gildunum: sama fulla dagsetning getur í einu samhengi verið fyrir aðgerðardaginn en í öðru eftir hann.</p>
  301:     <p>Stærðfræðirannsóknir sem byggja á forskriftinni hafa einnig leitt í ljós nákvæma asymptótíska uppbyggingu. Fyrir <strong>fastan aðgerðardag</strong> <code>c</code> birtist affín lotubundni nógu langt út í hala fortíðarinnar.</p>
  309:     <p>Spurningin hvort endanlegar asymptótískar hallatölur séu raunverulega ólíkar milli mismunandi aðgerðardaga er enn opin.</p><hr>
  326:   <p>Það er determinískt dagatal þar sem dagsetningin er ekki bara fall af fyrirspurnardegi heldur <strong>sameiginlegt fall aðgerðardagsins og fyrirspurnardagsins</strong>.</p>
  329:   <p>En ef aðgerðardagurinn og fyrirspurnardagurinn eru þekktir er engin tvíræðni: rétt svar er aðeins eitt.</p>

artifacts/cross-repo-native-qa/runtime/repo2-0/tests/NormativeOracle.elm (2 match(es)):
  1773:                 Debug.todo "Röð kótilettuskiptingar fór út fyrir löglegu fjölskylduna."
  2068:         |> expectMaybe "Markdagurinn fannst ekki í neinni kótilettu."

artifacts/cross-repo-native-qa/runtime/repo2-0/STAGE_01_NORMATIVE_AUDIT.md (4 match(es)):
  27: Jákvæð hlið spyr um `FOUNDATION+n` og neikvæð hlið um `FOUNDATION-n`. Hliðabil eru 42..963 dagar. Árslengd er 252..5778 dagar; 5779 og hærra komast ekki í gildan árskost. Ár 5000 er valið úr pörum sem innihalda verknaðardaginn á bilinu `(open,close]`, fyrst eftir lengd og síðan eftir fyrra opnunarhliði við jafna lengd. Ferð til markárs er ár fyrir ár. Opnunarhliðið tilheyrir fyrra ári vegna skilyrðisins `targetDay <= openGateDay` í afturleit.
  31: Fjöldi kótiletta er takmarkaður við 6..17 og ekki meiri en fjöldi hliðabila ársins. Skipting kótiletta er nákvæm lexíkógrafísk talning/opnun; ef verknaðardagurinn er innra hlið verður það millimark skiptingarinnar. Nöfn eru valin sem hlutumraðanir án endurtekningar og innri merkingin er `canonicalIndex`.
  37: `calendarDateCanonical` skilar nákvæmlega fimm merkingarsviðum. `calendarDate` leysir aðeins kótilettu- og mánaðarvísitölur yfir í fryst íslensk heiti. Ekkert í `src/` flytur inn `NormativeOracle`, þannig að framleiðsluskelin getur ekki notað viðmiðunarvélina sem varaleið eða leiðréttingu.
  39: Við úttektina fannst Elm-sértæk þýðingarvilla í eldri drögum: fjögurra og fimm staka tuple-gildi höfðu verið notuð í stuðlatöflum og í innra vali kótilettuskiptingar. Elm leyfir ekki slík tuple. Þau voru skipt út fyrir nafngreind record-gildi án merkingarbreytingar. Engin fjögurra eða fleiri staka tuple er eftir í Elm-kóðanum.

docs/i18n/locales/is.js (28 match(es)):
  24:     "about.metaDescription": "Skýring á Pastafari-dagatalinu: aðgerðardagur og fyrirspurnardagur, ár, kótelettur, fléttaðir mánuðir, dagamörk og háþróuð kerfi.",
  25:     "about.intro": "Hvernig dagatalið sýnir daga, ár, kótelettur, fléttaða mánuði og aðgerðardaginn.",
  33:     "day.staleWarning": "Núverandi dagur breyttist úr {previousDate} í {currentDate}. Þar sem aðgerðardagurinn fylgdi deginum í dag eru dagsetningarnar sem birtast ekki lengur uppfærðar. Þær verða reiknaðar aftur eftir að þú lokar þessum skilaboðum.",
  45:     "settings.actionCalendarLabel": "Dagatal til að slá inn aðgerðardag",
  46:     "settings.apply": "Nota aðgerðardag",
  51:     "comparison.secondActionLabel": "Dagatal til að slá inn seinni aðgerðardaginn",
  54:     "comparison.heading": "Sömu dagar, tveir aðgerðardagar",
  55:     "comparison.intro": "Hver lína inniheldur nákvæmlega sama fyrirspurnardag. Aðeins aðgerðardagurinn er ólíkur í dálkunum tveimur.",
  61:     "comparison.invalid": "Seinni aðgerðardagurinn er ógildur. Athugaðu dagsetninguna og reyndu aftur.",
  121:     "calendar.cutletDescription": "{count} dagar · aðgerðardagur: {actionDate}",
  122:     "calendar.targetOutside": "Leitaða dagsetningin er ekki í kótelettunni sem nú er sýnd. Þú getur haldið áfram að fletta eða leitað að annarri dagsetningu.",
  125:     "year.context": "Þessi uppbygging er reiknuð fyrir aðgerðardaginn {actionDate}. Ef aðgerðardeginum er breytt getur þurft að byggja ársmörk, kótelettur og mánuði upp að nýju.",
  135:     "year.targetPosition": "Leitaða dagsetningin er dagur {day} af {length} í þessu ári.",
  144:     "target.context": "Fyrirspurnardagur: {targetDate} · aðgerðardagur: {actionDate}",
  152:     "guide.intro": "Vefurinn sýnir fulla Pastafari-dagsetningu fyrir hvaða dag sem er, tekur við leit í mörgum dagatölum og getur á breiðum skjá borið saman áhrif aðgerðardagsins.",
  160:     "guide.4.body": "„Fyrri kóteletta“ og „Næsta kóteletta“ fara í nágrannakótelettur. Aðrir dagareitir eru ekki hnappar, því ekki er hægt að framkvæma aðgerð með því að smella á þá. „Til baka í dag“ endurstillir bæði leitina og aðgerðardaginn á núverandi Pastafari-dag.",
  162:     "guide.5.body": "Opnaðu „Valkostir fyrir útreikning og samanburð“ undir leitinni. Þar geturðu valið dagatal og slegið inn annan aðgerðardag. Næstu leitir nota hann þar til þú endurstillir á núverandi Pastafari-dag. Þessi háþróaði valkostur er tiltækur án þess að þyngja venjulegu sýnina.",
  164:     "guide.6.body": "Á breiðum skjá virkjarðu samanburðinn á sama stað. Hver lína inniheldur nákvæmlega sama fyrirspurnardag; fyrri dálkurinn notar fyrri aðgerðardaginn og sá seinni hinn. Sjálfgefið er að bera í dag saman við morgundaginn, svo auðvelt er að sjá hvaða Pastafari-dagsetningar breytast.",
  173:     "reverse.intro": "Sláðu inn fulla Pastafari-dagsetningu og skilgreindu aðgerðardag hennar. Leitin fer fram staðbundið á þessu tæki.",
  184:     "reverse.basic.calculationMode": "Hvernig er aðgerðardagurinn skilgreindur?",
  185:     "reverse.basic.calculation.active": "Nota virkan aðgerðardag vefsins",
  189:     "reverse.basic.activeValue": "Virkur aðgerðardagur: {date}",
  190:     "reverse.basic.absoluteHeading": "Þekktur aðgerðardagur",
  195:     "reverse.basic.toAdvancedHelp": "Endurkvæm tengsl milli Pastafari-aðgerðardaga eru sett fram sem breytur og skorður, svo hægt sé að lengja keðjuna án gervilegra dýptarmarka.",
  214:     "reverse.status.stale": "Þessar niðurstöður notuðu fyrri virkan aðgerðardag. Keyrðu leitina aftur til að nota þann núverandi.",
  243:     "reverse.constraint.calculationMode": "Uppruni aðgerðardags",
  278:       "papyrusSedge": "Papýrusstör",
  304:       "carob": "Karób",
artifacts/cross-repo-native-qa/runtime/repo2-0/SOURCE_LANGUAGE_CATALOG.md:47: 15. jóhannesarbrauð
```

</details>


---

<sub>1m 48s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/runtime.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/runtime.js (lines 1-150)

<details>
<summary>62 lines</summary>

```
"use strict";

import { LOCALES, getLocale, resolveLocale, translate } from "./registry.js?v=20-about-i18n";

export const LANGUAGE_STORAGE_KEY = "pastafari.language";

function safeReadStorage(storage, key) {
  try { return storage?.getItem(key) ?? null; } catch { return null; }
}

function safeWriteStorage(storage, key, value) {
  try { storage?.setItem(key, value); return true; } catch { return false; }
}

export function resolveBrowserLocale({ url = location.href, storage = localStorage, navigatorObject = navigator } = {}) {
  const language = new URL(url).searchParams.get("lang");
  const browserLanguages = Array.isArray(navigatorObject?.languages) && navigatorObject.languages.length
    ? [...navigatorObject.languages]
    : navigatorObject?.language ? [navigatorObject.language] : [];
  return resolveLocale({
    urlLanguage: language,
    savedLanguage: safeReadStorage(storage, LANGUAGE_STORAGE_KEY),
    browserLanguages,
  });
}

export function persistLanguage(code, storage = localStorage) {
  const locale = getLocale(code);
  return safeWriteStorage(storage, LANGUAGE_STORAGE_KEY, locale.code);
}

export function urlWithLanguage(url, code) {
  const locale = getLocale(code);
  const next = new URL(url);
  next.searchParams.set("lang", locale.code);
  return next;
}

export function populateLanguageSelector(select, activeCode) {
  const fragment = document.createDocumentFragment();
  for (const locale of LOCALES) {
    const option = document.createElement("option");
    option.value = locale.code;
    option.textContent = locale.displayName;
    option.lang = locale.code;
    option.dir = locale.dir;
    fragment.append(option);
  }
  select.replaceChildren(fragment);
  select.value = getLocale(activeCode).code;
}

export function applyDocumentLocale(locale, root = document) {
  const documentElement = root.documentElement ?? root.ownerDocument?.documentElement;
  if (!documentElement) throw new TypeError("A document-like root with documentElement is required.");
  documentElement.lang = locale.code;
  documentElement.dir = locale.dir;
  for (const element of root.querySelectorAll("[data-i18n]")) {
    element.textContent = translate(locale, element.dataset.i18n);
  }
  for (const element of root.querySelectorAll("[data-i18n-attr]")) {
    const bindings = element.dataset.i18nAttr.split(";").map((part) => part.trim()).filter(Boolean);
    for (const binding of bindings) {
      const separator = binding.indexOf(":");
      if (separator <= 0) throw new SyntaxError(`Invalid data-i18n-attr binding: ${binding}`);
      const attribute = binding.slice(0, separator).trim();
      const key = binding.slice(separator + 1).trim();
      element.setAttribute(attribute, translate(locale, key));
    }
  }
}
```

</details>


---

<sub>1m 48s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/registry.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/registry.js (lines 220-380)

<details>
<summary>138 lines</summary>

```
  const existing = loadedSources.get(metadata.code);
  if (existing) return existing;

  const loading = metadata.loader().then((module) => assertLoadedLocaleMatchesMetadata(module.default, metadata));
  loadedSources.set(metadata.code, loading);
  try {
    return await loading;
  } catch (error) {
    if (loadedSources.get(metadata.code) === loading) loadedSources.delete(metadata.code);
    throw error;
  }
}

export async function loadAllLocaleSources() {
  return Promise.all(LOCALES.map((locale) => loadLocaleSource(locale.code)));
}

function getPath(object, path) {
  return path.split(".").reduce((value, part) => value?.[part], object);
}

function ownRecord(value) {
  return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}

function assertOptionalRecord(owner, key, localeCode, label) {
  if (!owner || !Object.prototype.hasOwnProperty.call(owner, key)) return;
  const value = owner[key];
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new RangeError(`Locale ${localeCode} has invalid ${label} resource group.`);
  }
}

function validateLocaleResourceShape(resource, localeCode) {
  assertOptionalRecord(resource, "messages", localeCode, "messages");
  assertOptionalRecord(resource, "terminology", localeCode, "terminology");
  assertOptionalRecord(resource, "calendar", localeCode, "calendar");
  if (resource?.calendar && typeof resource.calendar === "object" && !Array.isArray(resource.calendar)) {
    assertOptionalRecord(resource.calendar, "cutlets", localeCode, "calendar.cutlets");
    assertOptionalRecord(resource.calendar, "months", localeCode, "calendar.months");
  }
}

function localGroups(resource) {
  return {
    messages: ownRecord(resource?.messages),
    terminology: ownRecord(resource?.terminology),
    cutlets: ownRecord(resource?.calendar?.cutlets),
    months: ownRecord(resource?.calendar?.months),
  };
}

function baselineGroups(resource) {
  const groups = localGroups(resource);
  return {
    messages: Object.keys(groups.messages).sort(),
    terminology: Object.keys(groups.terminology).sort(),
    cutlets: CUTLETS.map(({ id }) => id).sort(),
    months: MONTHS.map(({ id }) => id).sort(),
  };
}

function assertKnownNonEmptyStringValues(localeCode, groupName, values, expectedKeys) {
  const expected = new Set(expectedKeys);
  for (const [key, value] of Object.entries(values)) {
    if (!expected.has(key)) throw new RangeError(`Locale ${localeCode} contains unknown ${groupName} key ${key}.`);
    if (typeof value !== "string" || value.trim() === "") {
      throw new RangeError(`Locale ${localeCode} contains an empty or invalid ${groupName} value for ${key}.`);
    }
  }
}

function missingKeys(values, expectedKeys) {
  return expectedKeys.filter((key) => !Object.prototype.hasOwnProperty.call(values, key));
}

const MESSAGE_PLACEHOLDER_PATTERN = /\{([A-Za-z0-9_.-]+)\}/g;

function messagePlaceholders(template) {
  return [...new Set([...String(template).matchAll(MESSAGE_PLACEHOLDER_PATTERN)].map((match) => match[1]))].sort();
}

function sameStringSet(left, right) {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}

function validateMessagePlaceholders(localeCode, messages, englishMessages) {
  for (const [key, value] of Object.entries(messages)) {
    const baseline = englishMessages[key];
    if (typeof baseline !== "string") continue;
    const expected = messagePlaceholders(baseline);
    const actual = messagePlaceholders(value);
    if (!sameStringSet(actual, expected)) {
      throw new RangeError(
        `Locale ${localeCode} has placeholder mismatch for ${key}: expected {${expected.join(", ")}}, received {${actual.join(", ")}}.`,
      );
    }
  }
}

const ALWAYS_LOCAL_MESSAGE_KEYS = Object.freeze([
  "app.title",
  "meta.description",
  "manifest.shortName",
  "manifest.defaultDescription",
]);

export function validateLocaleSourceContract(resource, metadata, englishBaseline) {
  assertLoadedLocaleMatchesMetadata(resource, metadata);
  validateLocaleResourceShape(resource, metadata.code);
  validateLocaleResourceShape(englishBaseline, DEFAULT_LOCALE);
  if (!SUPPORT_LEVELS.includes(metadata.support)) throw new RangeError(`Locale ${metadata.code} has invalid support status.`);
  if (!["ltr", "rtl"].includes(metadata.dir)) throw new RangeError(`Locale ${metadata.code} has invalid direction.`);
  if (!canonicalTag(metadata.intlLocale)) throw new RangeError(`Locale ${metadata.code} has invalid Intl locale.`);

  const expected = baselineGroups(englishBaseline);
  const groups = localGroups(resource);
  for (const groupName of Object.keys(groups)) {
    assertKnownNonEmptyStringValues(metadata.code, groupName, groups[groupName], expected[groupName]);
  }

  validateMessagePlaceholders(metadata.code, groups.messages, localGroups(englishBaseline).messages);

  const requiredManifestMessages = ALWAYS_LOCAL_MESSAGE_KEYS.filter((key) => expected.messages.includes(key));
  const missingManifestMessages = missingKeys(groups.messages, requiredManifestMessages);
  if (missingManifestMessages.length) {
    throw new RangeError(`Locale ${metadata.code} must define manifest-bound messages locally: ${missingManifestMessages.join(", ")}.`);
  }

  if (metadata.support === "complete") {
    for (const groupName of Object.keys(groups)) {
      const missing = missingKeys(groups[groupName], expected[groupName]);
      if (missing.length) throw new RangeError(`Complete locale ${metadata.code} is missing ${groupName}: ${missing.join(", ")}.`);
    }
  }
  return true;
}

function mergeGroup(fallback, local) {
  return Object.freeze({ ...ownRecord(fallback), ...ownRecord(local) });
}

export function materializeLocaleResources(resource, metadata, englishBaseline) {
  validateLocaleSourceContract(resource, metadata, englishBaseline);
  const local = localGroups(resource);
  const fallback = localGroups(englishBaseline);
  const result = {
    ...resource,
    messages: mergeGroup(fallback.messages, local.messages),
    terminology: mergeGroup(fallback.terminology, local.terminology),
    calendar: Object.freeze({
      ...ownRecord(englishBaseline?.calendar),
      ...ownRecord(resource?.calendar),
      cutlets: mergeGroup(fallback.cutlets, local.cutlets),
      months: mergeGroup(fallback.months, local.months),
    }),
  };
  Object.defineProperty(result, LOCAL_SOURCE, { value: resource, enumerable: false });
  return Object.freeze(result);
}
```

</details>


---

<sub>1m 56s</sub>

### Copilot

Yfirferðin á vefnum sýnir að villutextar við innslátt fara í gegnum staðfærða lykla, svo ensku villuboðin í innri umreiknurum berast ekki beint í viðmótið. Ég athuga nú hvort staðfærðu lýsigagnalyklarnir séu raunverulega tengdir PWA-lýsigögnunum og skrái aðeins niðurstöður með skýra textalega sönnun.

---

<sub>1m 56s</sub>

### `rg`

**.**

"." (docs/manifest.webmanifest)

<details>
<summary>52 matches</summary>

```
[grep content: 50 matches across 1 file(s) under /home/runner/work/pastafari-calendar/pastafari-calendar/docs]

manifest.webmanifest (50 match(es)):
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
  21:       "value": "التقويم الباستافاري",
  22:       "lang": "ar",
  23:       "dir": "rtl"
  24:     },
  25:     "az": {
  26:       "value": "Pastafari Təqvimi",
  27:       "lang": "az",
  28:       "dir": "ltr"
  29:     },
  30:     "be": {
  31:       "value": "Пастафарыянскі каляндар",
  32:       "lang": "be",
  33:       "dir": "ltr"
  34:     },
  35:     "bg": {
  36:       "value": "Пастафариански календар",
  37:       "lang": "bg",
  38:       "dir": "ltr"
  39:     },
  40:     "bn": {
  41:       "value": "পাস্তাফারি ক্যালেন্ডার",
  42:       "lang": "bn",
  43:       "dir": "ltr"
  44:     },
  45:     "bs": {
  46:       "value": "Pastafarijanski kalendar",
  47:       "lang": "bs",
  48:       "dir": "ltr"
  49:     },
  50:     "ca": {
```

</details>


---

<sub>1m 56s</sub>

### `rg`

**manifest\.shortName|manifest\.defaultDescription|short_name|"description"|"name"**

"manifest\.shortName|manifest\.defaultDescription|short_name|"description"|"name"" in *.{js,html,json,webmanifest} (docs)

<details>
<summary>229 matches</summary>

```
[grep content: 154 matches across 76 file(s) under /home/runner/work/pastafari-calendar/pastafari-calendar/docs]
about/index.html:7:     <meta name="description" content="An explanation of the Pastafari Calendar." data-i18n-attr="content:about.metaDescription">
index.html:7:     <meta name="description" content="A local, deterministic Pastafari calendar." data-i18n-attr="content:meta.description">

manifest.webmanifest (4 match(es)):
  3:   "name": "Pastafari Calendar",
  366:   "short_name": "Pastafari",
  367:   "short_name_localized": {
  729:   "description": "A local, deterministic Pastafari calendar.",

i18n/registry.js (4 match(es)):
  323:   "manifest.shortName",
  324:   "manifest.defaultDescription",
  437:   "messages.manifest.shortName",
  438:   "messages.manifest.defaultDescription",

i18n/locales/sv.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "En lokal, deterministisk Pastafari-kalender.",

i18n/locales/sr.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Lokalni deterministički Pastafari kalendar.",

i18n/locales/ar.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "تقويم Pastafari محلي وحتمي.",

i18n/locales/fy.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "In lokale, deterministyske Pastafari-kalinder.",

i18n/locales/tr.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Yerel ve deterministik bir Pastafari takvimi.",

i18n/locales/te.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "ఒకే ఇన్‌పుట్‌కు ఎల్లప్పుడూ ఒకే ఫలితాన్ని ఇచ్చే స్థానిక పాస్తాఫారి క్యాలెండర్.",

i18n/locales/ja.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "端末内で動作する決定論的なパスタファリ暦です。",

i18n/locales/kk.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Жергілікті, детерминистік Пастафари күнтізбесі.",

i18n/locales/eo.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Loka, determinisma Pastafaria kalendaro.",

i18n/locales/sq.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Një kalendar Pastafari lokal dhe determinist.",

i18n/locales/hi.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "एक स्थानीय, नियतात्मक पास्ताफ़ारी कैलेंडर।",

i18n/locales/pl.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Lokalny, deterministyczny kalendarz Pastafari.",

i18n/locales/ro.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Un calendar Pastafari local și determinist.",

i18n/locales/uz.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Mahalliy, deterministik Pastafari taqvimi.",

i18n/locales/hy.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Տեղական, որոշակի արդյունք տվող Pastafari օրացույց։",

i18n/locales/en.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "A local, deterministic Pastafari calendar.",

i18n/locales/nb.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "En lokal, deterministisk Pastafari-kalender.",

i18n/locales/es.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Un calendario Pastafari local y determinista.",

i18n/locales/mr.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "स्थानिक, निर्धारक पास्ताफारी दिनदर्शक.",

i18n/locales/zh.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "本地、确定性的 Pastafari 历。",

i18n/locales/sw.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Kalenda ya Pastafari ya ndani na yenye matokeo yaliyowekwa.",

i18n/locales/bg.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Локален детерминиран Пастафариански календар.",

i18n/locales/az.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Yerli, deterministik Pastafari təqvimi.",

i18n/locales/cs.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "A local, deterministic Pastafari calendar.",

i18n/locales/lv.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Lokāls, deterministisks Pastafari kalendārs.",

i18n/locales/he.js (2 match(es)):
  10:     "manifest.shortName": "פסטפרי",
  11:     "manifest.defaultDescription": "A local, deterministic Pastafari calendar.",

i18n/locales/lt.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Vietinis deterministinis Pastafari kalendorius.",

i18n/locales/ht.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Yon kalandriye Pastafari lokal ki detèminis.",

i18n/locales/ms.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Kalendar Pastafari setempat dan deterministik.",

i18n/locales/fi.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Paikallinen ja deterministinen Pastafari-kalenteri.",

i18n/locales/de.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Ein lokaler, deterministischer Pastafari-Kalender.",

i18n/locales/be.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Лакальны дэтэрмінаваны Пастафарыянскі каляндар.",

i18n/locales/fr.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "A local, deterministic Pastafari calendar.",

i18n/locales/ko.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "기기에서 동작하는 결정론적 파스타파리 달력입니다.",

i18n/locales/hu.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Helyi, determinisztikus Pastafari-naptár.",

i18n/locales/vi.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Lịch Pastafari cục bộ và tất định.",

i18n/locales/ha.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Kalandar Pastafari ta cikin gida mai ƙayyadadden sakamako.",

i18n/locales/zu.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Ikhalenda le-Pastafari lendawo nelinqumayo.",

i18n/locales/it.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Un calendario pastafariano locale e deterministico.",

i18n/locales/gl.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Un calendario Pastafari local e determinista.",

i18n/locales/is.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Pastafari-dagatal sem reiknar á tækinu og skilar sömu niðurstöðu fyrir sama inntak.",

i18n/locales/lb.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "E lokalen, deterministesche Pastafari-Kalenner.",

i18n/locales/id.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Kalender Pastafari lokal yang deterministik.",

i18n/locales/ta.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "ஒரே உள்ளீட்டுக்கு எப்போதும் ஒரே விளைவைத் தரும் உள்ளூர் பாஸ்தாபாரி நாட்காட்டி.",

i18n/locales/bs.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "A local, deterministic Pastafari calendar.",

i18n/locales/yo.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Kalẹ́ńdà Pastafari agbègbè tó ń fún ní abajade kan náà fún ìwọlé kan náà.",

i18n/locales/jv.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Kalèndher Pastafari lokal lan deterministik.",

i18n/locales/sl.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Lokalni deterministični koledar Pastafari.",

i18n/locales/fil.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Isang lokal at deterministikong kalendaryong Pastafari.",

i18n/locales/so.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Kalandar Pastafari oo maxalli ah oo go'aansan.",

i18n/locales/ur.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "ایک مقامی، قطعی Pastafari کیلنڈر۔",

i18n/locales/ka.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "ადგილობრივი, დეტერმინისტული პასტაფარიანული კალენდარი.",

i18n/locales/uk.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Локальний детермінований календар Pastafari.",

i18n/locales/pt.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Um calendário Pastafari local e determinístico.",

i18n/locales/gu.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "સ્થાનિક અને નિર્ધારિત પાસ્તાફારી કેલેન્ડર.",

i18n/locales/mk.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Локален, детерминистички Пастафаријански календар.",

i18n/locales/hr.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Lokalni deterministički Pastafari kalendar.",

i18n/locales/ca.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Un calendari Pastafari local i determinista.",

i18n/locales/fa.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "یک گاه‌شمار پاستافاریِ محلی و قطعی.",

i18n/locales/el.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Ένα τοπικό, ντετερμινιστικό ημερολόγιο Pastafari.",

i18n/locales/et.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Kohalik deterministlik Pastafari kalender.",

i18n/locales/ru.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Локальный детерминированный календарь Pastafari.",

i18n/locales/af.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "'n Plaaslike, deterministiese Pastafari-kalender.",

i18n/locales/nn.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Ein lokal, deterministisk Pastafari-kalender.",

i18n/locales/sk.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Lokálny deterministický kalendár Pastafari.",

i18n/locales/pa.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "ਇੱਕ ਸਥਾਨਕ, ਨਿਰਧਾਰਕ ਪਾਸਤਾਫਾਰੀ ਕੈਲੰਡਰ।",

i18n/locales/fo.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Ein lokalur, deterministiskur Pastafari-kalendari.",

i18n/locales/nl.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Een lokale, deterministische Pastafari-kalender.",

i18n/locales/ne.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "स्थानीय, निर्धारक पास्ताफारी पात्रो.",

i18n/locales/da.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "En lokal, deterministisk Pastafari-kalender.",

i18n/locales/th.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "ปฏิทิน Pastafari แบบทำงานในเครื่องและให้ผลแบบกำหนดแน่นอน.",

i18n/locales/bn.js (2 match(es)):
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "A local, deterministic Pastafari calendar.",
```

</details>


---

<sub>1m 56s</sub>

### `rg`

**target=|_blank|aria-label|aria-describedby|aria-live|role="alert"|role="status"**

"target=|_blank|aria-label|aria-describedby|aria-live|role="alert"|role="status"" (docs/about/content/is.html, docs/index.html, docs/about/index.html)

<details>
<summary>24 matches</summary>

```
[grep content: 20 matches across 3 file(s) under /home/runner/work/pastafari-calendar/pastafari-calendar/docs]

about/index.html (3 match(es)):
  40:         <nav data-i18n-attr="aria-label:about.toc">
  47:         <p class="about-load-error" id="about-load-error" role="alert" hidden data-i18n="about.loadError">The calendar explanation could not be loaded.</p>
  49:         <section class="about-site-usage" id="site-usage" aria-labelledby="guide-heading" data-toc-section data-toc-level="2">

index.html (15 match(es)):
  36:       <section class="search-panel" id="search-panel" aria-labelledby="search-heading">
  49:           <p class="form-error" id="target-form-error" role="alert" hidden></p>
  67:               <p class="form-error" id="action-form-error" role="alert" hidden></p>
  86:                 <p class="form-error" id="comparison-form-error" role="alert" hidden></p>
  94:       <section class="reverse-panel" id="reverse-panel" aria-labelledby="reverse-heading">
  98:       <section class="status-panel" id="loading-panel" aria-labelledby="loading-heading" aria-live="polite" aria-busy="true">
  106:       <section class="status-panel error-panel" id="error-panel" aria-labelledby="error-heading" role="alert" hidden>
  113:       <section class="calendar-workspace" id="calendar-workspace" aria-labelledby="cutlet-heading" hidden>
  114:         <article class="target-beacon" id="target-beacon" aria-live="polite">
  126:           <div class="toolbar-actions" role="group" data-i18n-attr="aria-label:calendar.toolbarAria">
  136:         <section class="year-overview" id="year-overview" aria-labelledby="year-overview-heading">
  157:                 <ol class="structure-list" id="year-cutlet-list" tabindex="0" aria-labelledby="year-cutlets-summary"></ol>
  161:                 <ol class="structure-list month-structure-list" id="year-month-list" tabindex="0" aria-labelledby="year-months-summary"></ol>
  168:       <section class="comparison-workspace" id="comparison-workspace" aria-labelledby="comparison-heading" hidden>
  175:         <div class="comparison-scroll" role="region" tabindex="0" data-i18n-attr="aria-label:comparison.scrollAria">

about/content/is.html (2 match(es)):
  153:   <div class="about-table-scroll" role="region" tabindex="0" aria-label="Mæld gögn úr byggingaratlasnum">
  278:   <div class="about-table-scroll" role="region" tabindex="0" aria-label="Efri mörk á fjölda mögulegra daga í öfugri umbreytingu">
```

</details>


---

<sub>1m 56s</sub>

### `rg`

**Leitaða dagsetningin|verknaðardag|kótilettu|kótiletta|kótilett|kóteletta|kótelettu|kótelett**

"Leitaða dagsetningin|verknaðardag|kótilettu|kótiletta|kótilett|kóteletta|kótelettu|kótelett" (docs/i18n/locales/is.js, artifacts/cross-repo-native-qa/runtime/repo2-0/STAGE_01_NORMATIVE_AUDIT.md, artifacts/cross-repo-native-qa/runtime/repo2-0/README.md, artifacts/cross-repo-native-qa/runtime/repo2-0/SOURCE_LANGUAGE_CATALOG.md)

<details>
<summary>31 matches</summary>

```
[grep content: 28 matches across 3 file(s) under /home/runner/work/pastafari-calendar/pastafari-calendar]
artifacts/cross-repo-native-qa/runtime/repo2-0/README.md:7: `Pastafari.ExactInt` veitir nákvæman heiltölureikning með ótakmarkaðri stærð, skrifaðan í Elm. `NormativeOracle` er prófunar-eingöngu bein útfærsla á innbyggða staðlaða viðmiðinu. `Pastafari.SourceLanguageCatalog` frystir 17 kótelettunöfn og 47 mánaðarnöfn með föstum `canonicalIndex`. `Pastafari.MonsterBase` er aðeins hlutlaus grunnur fyrir samhengi, stýringu, staðfestingu og mælingar. `Pastafari.Spaghetti` inniheldur enn enga eldri villuleið og enga leiðréttingarrökfræði úr síðari stigum.

artifacts/cross-repo-native-qa/runtime/repo2-0/STAGE_01_NORMATIVE_AUDIT.md (4 match(es)):
  27: Jákvæð hlið spyr um `FOUNDATION+n` og neikvæð hlið um `FOUNDATION-n`. Hliðabil eru 42..963 dagar. Árslengd er 252..5778 dagar; 5779 og hærra komast ekki í gildan árskost. Ár 5000 er valið úr pörum sem innihalda verknaðardaginn á bilinu `(open,close]`, fyrst eftir lengd og síðan eftir fyrra opnunarhliði við jafna lengd. Ferð til markárs er ár fyrir ár. Opnunarhliðið tilheyrir fyrra ári vegna skilyrðisins `targetDay <= openGateDay` í afturleit.
  31: Fjöldi kótiletta er takmarkaður við 6..17 og ekki meiri en fjöldi hliðabila ársins. Skipting kótiletta er nákvæm lexíkógrafísk talning/opnun; ef verknaðardagurinn er innra hlið verður það millimark skiptingarinnar. Nöfn eru valin sem hlutumraðanir án endurtekningar og innri merkingin er `canonicalIndex`.
  37: `calendarDateCanonical` skilar nákvæmlega fimm merkingarsviðum. `calendarDate` leysir aðeins kótilettu- og mánaðarvísitölur yfir í fryst íslensk heiti. Ekkert í `src/` flytur inn `NormativeOracle`, þannig að framleiðsluskelin getur ekki notað viðmiðunarvélina sem varaleið eða leiðréttingu.
  39: Við úttektina fannst Elm-sértæk þýðingarvilla í eldri drögum: fjögurra og fimm staka tuple-gildi höfðu verið notuð í stuðlatöflum og í innra vali kótilettuskiptingar. Elm leyfir ekki slík tuple. Þau voru skipt út fyrir nafngreind record-gildi án merkingarbreytingar. Engin fjögurra eða fleiri staka tuple er eftir í Elm-kóðanum.

docs/i18n/locales/is.js (23 match(es)):
  14:     "app.intro": "Finndu dagsetningu í einu dagatalanna sem vefurinn styður. Þá sérðu fulla Pastafari-dagsetningu þess dags og kótelettuna sem hann tilheyrir.",
  24:     "about.metaDescription": "Skýring á Pastafari-dagatalinu: aðgerðardagur og fyrirspurnardagur, ár, kótelettur, fléttaðir mánuðir, dagamörk og háþróuð kerfi.",
  25:     "about.intro": "Hvernig dagatalið sýnir daga, ár, kótelettur, fléttaða mánuði og aðgerðardaginn.",
  58:     "comparison.summary": "Sýndir eru {count} dagar, frá fyrsta til síðasta dags kótelettunnar sem birtist í fyrri útreikningnum.",
  108:     "loading.title": "Leitað að kótelettu og dagsetningu…",
  115:     "calendar.toolbarAria": "Flakk milli kótelettna",
  116:     "calendar.previous": "Fyrri kóteletta",
  118:     "calendar.next": "Næsta kóteletta",
  119:     "calendar.daysAria": "Dagar í kótelettunni {cutletName}",
  120:     "calendar.currentCutlet": "Ár {year} · kóteletta",
  122:     "calendar.targetOutside": "Leitaða dagsetningin er ekki í kótelettunni sem nú er sýnd. Þú getur haldið áfram að fletta eða leitað að annarri dagsetningu.",
  125:     "year.context": "Þessi uppbygging er reiknuð fyrir aðgerðardaginn {actionDate}. Ef aðgerðardeginum er breytt getur þurft að byggja ársmörk, kótelettur og mánuði upp að nýju.",
  134:     "year.displayedCutletPosition": "Sýnda kótelettan nær yfir daga {start}–{end} ársins.",
  135:     "year.targetPosition": "Leitaða dagsetningin er dagur {day} af {length} í þessu ári.",
  136:     "year.monthExplainer": "Mánuðir fléttast óháð kótelettum í gegnum árið: mánuður er ekki undirdeild kótelettu og dagar hans geta birst í mörgum aðskildum runum. Lengd mánaðar er því heildarfjöldi daga sem honum er úthlutað, ekki endilega eitt samfellt tímabil.",
  145:     "target.notInView": "Dagsetningin sem þú leitaðir að er enn varðveitt; kótelettan sem nú er sýnd er önnur.",
  146:     "date.aria": "Ár {year} frá sköpun heimsins, dagur {dayInCutlet} í kótelettunni {cutletName}, dagur {dayInMonth} í mánuðinum {monthName}",
  148:     "date.cutletLine": "Dagur {dayInCutlet} í kótelettunni {cutletName}",
  154:     "guide.1.body": "Um leið og tengillinn opnast ákvarðar vefurinn núverandi Pastafari-dag fyrir virka staðsetningu athugandans og sýnir kótelettuna sem hann tilheyrir. Dagamörkin eru staðsetningarháði tímapunkturinn þegar miðja Venusar fer um neðri hluta staðbundna hádegisbaugsins, eins og lýst er í ASTRONOMICAL-DAY.md; þau eru ekki borgaralegt miðnætti. Engin skráning eða innskráning er nauðsynleg og engin dagsetning er send á reikniþjón.",
  158:     "guide.3.body": "Hver reitur hefur þrjár fastar línur: ár frá sköpun heimsins; númer dags í kótelettunni og nafn hennar; síðan dag í mánuðinum og nafn mánaðarins. Engin ein tala táknar alla dagsetninguna. Nafn mánaðarins ræður lit reitsins.",
  160:     "guide.4.body": "„Fyrri kóteletta“ og „Næsta kóteletta“ fara í nágrannakótelettur. Aðrir dagareitir eru ekki hnappar, því ekki er hægt að framkvæma aðgerð með því að smella á þá. „Til baka í dag“ endurstillir bæði leitina og aðgerðardaginn á núverandi Pastafari-dag.",
  166:     "guide.7.body": "Undir kótelettusýninni sýnir vefurinn uppbyggingu sýnda ársins: lengd og bil, hverja kótelettu og lengd hennar, og hvern mánuð. Fyrir mánuði sýnir hann einnig fjölda samfelldra runa og fyrstu og síðustu birtingu, svo fléttunin í gegnum árið verður sýnileg.",
  180:     "reverse.field.dayInCutlet": "Dagur í kótelettu",
```

</details>


---

<sub>2m 4s</sub>

### `rg`

**"(name|name_localized|short_name|short_name_localized|description|description_localized|is)"|"is":|"description"**

""(name|name_localized|short_name|short_name_localized|description|description_localized|is)"|"is":|"description"" (docs/manifest.webmanifest)

<details>
<summary>65 matches</summary>

```
[grep content: 12 matches across 1 file(s) under /home/runner/work/pastafari-calendar/pastafari-calendar/docs]

manifest.webmanifest (12 match(es)):
  1- {
  2-   "id": "./",
  3:   "name": "Pastafari Calendar",
  4:   "name_localized": {
  5-     "he": {
  6-       "value": "לוח השנה הפסטפרי",
  7-       "lang": "he",
  8-       "dir": "rtl"
  9-     },
  10-     "en": {
  163-       "dir": "ltr"
  164-     },
  165:     "is": {
  166-       "value": "Pastafari-dagatal",
  167:       "lang": "is",
  168-       "dir": "ltr"
  169-     },
  170-     "it": {
  171-       "value": "Calendario pastafariano",
  172-       "lang": "it",
  173-       "dir": "ltr"
  364-     }
  365-   },
  366:   "short_name": "Pastafari",
  367:   "short_name_localized": {
  368-     "he": {
  369-       "value": "פסטפרי",
  370-       "lang": "he",
  371-       "dir": "rtl"
  372-     },
  373-     "en": {
  526-       "dir": "ltr"
  527-     },
  528:     "is": {
  529-       "value": "Pastafari",
  530:       "lang": "is",
  531-       "dir": "ltr"
  532-     },
  533-     "it": {
  534-       "value": "Pastafari",
  535-       "lang": "it",
  536-       "dir": "ltr"
  727-     }
  728-   },
  729:   "description": "A local, deterministic Pastafari calendar.",
  730:   "description_localized": {
  731-     "he": {
  732-       "value": "לוח־שנה פסטפרי לחיפוש ולהשוואת תאריכים",
  733-       "lang": "he",
  734-       "dir": "rtl"
  735-     },
  736-     "en": {
  889-       "dir": "ltr"
  890-     },
  891:     "is": {
  892-       "value": "Pastafari-dagatal með dagsetningarleit og samanburði.",
  893:       "lang": "is",
  894-       "dir": "ltr"
  895-     },
  896-     "it": {
  897-       "value": "Un calendario pastafariano con ricerca e confronto delle date.",
  898-       "lang": "it",
  899-       "dir": "ltr"
```

</details>


---

<sub>2m 4s</sub>

### `rg`

**manifest\.defaultDescription|manifest\.shortName**

"manifest\.defaultDescription|manifest\.shortName" in *.js (docs)

<details>
<summary>92 matches</summary>

```
[grep content: 148 matches across 73 file(s) under /home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n]

registry.js (4 match(es)):
  321-   "app.title",
  322-   "meta.description",
  323:   "manifest.shortName",
  324:   "manifest.defaultDescription",
  325- ]);
  326- 
  435- const ENGLISH_EQUALITY_ALLOWLIST = Object.freeze(new Set([
  436-   "messages.app.brand",
  437:   "messages.manifest.shortName",
  438:   "messages.manifest.defaultDescription",
  439-   "messages.reverse.error.limitPositive",
  440-   "messages.reverse.error.limitSafeInteger",

locales/gl.js (2 match(es)):
  8-   "messages": {
  9-     "meta.description": "Un calendario Pastafari con busca e comparación de datas.",
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Un calendario Pastafari local e determinista.",
  12-     "app.title": "Calendario Pastafari",
  13-     "nav.skip": "Ir á busca de datas",

locales/is.js (2 match(es)):
  8-   "messages": {
  9-     "meta.description": "Pastafari-dagatal með dagsetningarleit og samanburði.",
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Pastafari-dagatal sem reiknar á tækinu og skilar sömu niðurstöðu fyrir sama inntak.",
  12-     "app.title": "Pastafari-dagatal",
  13-     "nav.skip": "Fara í dagsetningarleit",

locales/sv.js (2 match(es)):
  8-   "messages": {
  9-     "meta.description": "En pastafarisk kalender med datumsökning och jämförelse.",
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "En lokal, deterministisk Pastafari-kalender.",
  12-     "app.title": "Pastafarisk kalender",
  13-     "nav.skip": "Hoppa till datumsökning",

locales/lb.js (2 match(es)):
  8-   "messages": {
  9-     "meta.description": "E Pastafari-Kalenner mat Datumssich a Verglach.",
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "E lokalen, deterministesche Pastafari-Kalenner.",
  12-     "app.title": "Pastafari-Kalenner",
  13-     "nav.skip": "Bei d'Datumssich sprangen",

locales/sr.js (2 match(es)):
  8-   "messages": {
  9-     "meta.description": "Pastafarijanski kalendar sa pretragom datuma i poređenjem.",
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Lokalni deterministički Pastafari kalendar.",
  12-     "app.title": "Pastafarijanski kalendar",
  13-     "nav.skip": "Preskoči na pretraživanje datuma",

locales/id.js (2 match(es)):
  8-   "messages": {
  9-     "meta.description": "Kalender Pastafari dengan pencarian dan perbandingan tanggal.",
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Kalender Pastafari lokal yang deterministik.",
  12-     "app.title": "Kalender Pastafari",
  13-     "nav.skip": "Lewati ke pencarian tanggal",

locales/ar.js (2 match(es)):
  8-   "messages": {
  9-     "meta.description": "تقويم باستافاري مع البحث عن التواريخ ومقارنتها.",
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "تقويم Pastafari محلي وحتمي.",
  12-     "app.title": "التقويم الباستافاري",
  13-     "nav.skip": "الانتقال إلى البحث عن تاريخ",

locales/ta.js (2 match(es)):
  8-   "messages": {
  9-     "meta.description": "தேதி தேடலும் ஒப்பீடும் கொண்ட பாஸ்தாபாரி நாட்காட்டி.",
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "ஒரே உள்ளீட்டுக்கு எப்போதும் ஒரே விளைவைத் தரும் உள்ளூர் பாஸ்தாபாரி நாட்காட்டி.",
  12-     "app.title": "பாஸ்தாபாரி நாட்காட்டி",
  13-     "nav.skip": "தேதி தேடலுக்கு செல்லவும்",

locales/fy.js (2 match(es)):
  8-   "messages": {
  9-     "meta.description": "In Pastafaryske kalinder mei datumsykjen en ferliking.",
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "In lokale, deterministyske Pastafari-kalinder.",
  12-     "app.title": "Pastafaryske kalinder",
  13-     "nav.skip": "Gean nei datumsykjen",

locales/tr.js (2 match(es)):
  8-   "messages": {
  9-     "meta.description": "Tarih arama ve karşılaştırma özellikli bir Pastafari takvimi.",
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Yerel ve deterministik bir Pastafari takvimi.",
  12-     "app.title": "Pastafari Takvimi",
  13-     "nav.skip": "Tarih aramaya geç",

locales/yo.js (2 match(es)):
  8-   "messages": {
  9-     "meta.description": "Kalẹ́ńdà Pastafari pẹ̀lú ìwádìí àti ìfiwé ọjọ́.",
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Kalẹ́ńdà Pastafari agbègbè tó ń fún ní abajade kan náà fún ìwọlé kan náà.",
  12-     "app.title": "Kalẹ́ńdà Pastafari",
  13-     "nav.skip": "Lọ sí ìwádìí ọjọ́",

[omitted 122 match(es) in 61 file(s); see original output for full results]
```

</details>


---

<sub>2m 4s</sub>

### `rg`

**"lang": "is|"value": "Pastafari-dagatal|"value": "Pastafari"**

""lang": "is|"value": "Pastafari-dagatal|"value": "Pastafari"" (docs/manifest.webmanifest)

<details>
<summary>243 matches</summary>

```
[grep content: 50 matches across 1 file(s) under /home/runner/work/pastafari-calendar/pastafari-calendar/docs]

manifest.webmanifest (50 match(es)):
  164-     },
  165-     "is": {
  166:       "value": "Pastafari-dagatal",
  167:       "lang": "is",
  168-       "dir": "ltr"
  169-     },
  372-     },
  373-     "en": {
  374:       "value": "Pastafari",
  375-       "lang": "en",
  376-       "dir": "ltr"
  377-     },
  378-     "af": {
  379:       "value": "Pastafari",
  380-       "lang": "af",
  381-       "dir": "ltr"
  382-     },
  383-     "ar": {
  384:       "value": "Pastafari",
  385-       "lang": "ar",
  386-       "dir": "rtl"
  387-     },
  388-     "az": {
  389:       "value": "Pastafari",
  390-       "lang": "az",
  391-       "dir": "ltr"
  392-     },
  393-     "be": {
  394:       "value": "Pastafari",
  395-       "lang": "be",
  396-       "dir": "ltr"
  397-     },
  398-     "bg": {
  399:       "value": "Pastafari",
  400-       "lang": "bg",
  401-       "dir": "ltr"
  402-     },
  403-     "bn": {
  404:       "value": "Pastafari",
  405-       "lang": "bn",
  406-       "dir": "ltr"
  407-     },
  408-     "bs": {
  409:       "value": "Pastafari",
  410-       "lang": "bs",
  411-       "dir": "ltr"
  412-     },
  413-     "ca": {
  414:       "value": "Pastafari",
  415-       "lang": "ca",
  416-       "dir": "ltr"
  417-     },
  418-     "cs": {
  419:       "value": "Pastafari",
  420-       "lang": "cs",
  421-       "dir": "ltr"
  422-     },
  423-     "da": {
  424:       "value": "Pastafari",
  425-       "lang": "da",
  426-       "dir": "ltr"
  427-     },
  428-     "de": {
  429:       "value": "Pastafari",
  430-       "lang": "de",
  431-       "dir": "ltr"
  432-     },
  433-     "el": {
  434:       "value": "Pastafari",
  435-       "lang": "el",
  436-       "dir": "ltr"
  437-     },
  438-     "eo": {
  439:       "value": "Pastafari",
  440-       "lang": "eo",
  441-       "dir": "ltr"
  442-     },
  443-     "es": {
  444:       "value": "Pastafari",
  445-       "lang": "es",
  446-       "dir": "ltr"
  447-     },
  448-     "et": {
  449:       "value": "Pastafari",
  450-       "lang": "et",
  451-       "dir": "ltr"
  452-     },
  453-     "fa": {
  454:       "value": "Pastafari",
  455-       "lang": "fa",
  456-       "dir": "rtl"
  457-     },
  458-     "fi": {
  459:       "value": "Pastafari",
  460-       "lang": "fi",
  461-       "dir": "ltr"
  462-     },
  463-     "fil": {
  464:       "value": "Pastafari",
  465-       "lang": "fil",
  466-       "dir": "ltr"
  467-     },
  468-     "fo": {
  469:       "value": "Pastafari",
  470-       "lang": "fo",
  471-       "dir": "ltr"
  472-     },
  473-     "fr": {
  474:       "value": "Pastafari",
  475-       "lang": "fr",
  476-       "dir": "ltr"
  477-     },
  478-     "fy": {
  479:       "value": "Pastafari",
  480-       "lang": "fy",
  481-       "dir": "ltr"
  482-     },
  483-     "gl": {
  484:       "value": "Pastafari",
  485-       "lang": "gl",
  486-       "dir": "ltr"
  487-     },
  488-     "gu": {
  489:       "value": "Pastafari",
  490-       "lang": "gu",
  491-       "dir": "ltr"
  492-     },
  493-     "ha": {
  494:       "value": "Pastafari",
  495-       "lang": "ha",
  496-       "dir": "ltr"
  497-     },
  498-     "hi": {
  499:       "value": "Pastafari",
  500-       "lang": "hi",
  501-       "dir": "ltr"
  502-     },
  503-     "hr": {
  504:       "value": "Pastafari",
  505-       "lang": "hr",
  506-       "dir": "ltr"
  507-     },
  508-     "ht": {
  509:       "value": "Pastafari",
  510-       "lang": "ht",
  511-       "dir": "ltr"
  512-     },
  513-     "hu": {
  514:       "value": "Pastafari",
  515-       "lang": "hu",
  516-       "dir": "ltr"
  517-     },
  518-     "hy": {
  519:       "value": "Pastafari",
  520-       "lang": "hy",
  521-       "dir": "ltr"
  522-     },
  523-     "id": {
  524:       "value": "Pastafari",
  525-       "lang": "id",
  526-       "dir": "ltr"
  527-     },
  528-     "is": {
  529:       "value": "Pastafari",
  530:       "lang": "is",
  531-       "dir": "ltr"
  532-     },
  533-     "it": {
  534:       "value": "Pastafari",
  535-       "lang": "it",
  536-       "dir": "ltr"
  537-     },
  538-     "ja": {
  539:       "value": "Pastafari",
  540-       "lang": "ja",
  541-       "dir": "ltr"
  542-     },
  543-     "jv": {
  544:       "value": "Pastafari",
  545-       "lang": "jv",
  546-       "dir": "ltr"
  547-     },
  548-     "ka": {
  549:       "value": "Pastafari",
  550-       "lang": "ka",
  551-       "dir": "ltr"
  552-     },
  553-     "kk": {
  554:       "value": "Pastafari",
  555-       "lang": "kk",
  556-       "dir": "ltr"
  557-     },
  558-     "ko": {
  559:       "value": "Pastafari",
  560-       "lang": "ko",
  561-       "dir": "ltr"
  562-     },
  563-     "lb": {
  564:       "value": "Pastafari",
  565-       "lang": "lb",
  566-       "dir": "ltr"
  567-     },
  568-     "lt": {
  569:       "value": "Pastafari",
  570-       "lang": "lt",
  571-       "dir": "ltr"
  572-     },
  573-     "lv": {
  574:       "value": "Pastafari",
  575-       "lang": "lv",
  576-       "dir": "ltr"
  577-     },
  578-     "mk": {
  579:       "value": "Pastafari",
  580-       "lang": "mk",
  581-       "dir": "ltr"
  582-     },
  583-     "mr": {
  584:       "value": "Pastafari",
  585-       "lang": "mr",
  586-       "dir": "ltr"
  587-     },
  588-     "ms": {
  589:       "value": "Pastafari",
  590-       "lang": "ms",
  591-       "dir": "ltr"
  592-     },
  593-     "nb": {
  594:       "value": "Pastafari",
  595-       "lang": "nb",
  596-       "dir": "ltr"
  597-     },
  598-     "ne": {
  599:       "value": "Pastafari",
  600-       "lang": "ne",
  601-       "dir": "ltr"
  602-     },
  603-     "nl": {
  604:       "value": "Pastafari",
  605-       "lang": "nl",
  606-       "dir": "ltr"
```

</details>


---

<sub>2m 4s</sub>

### `rg`

**Leitaða dagsetningin**

"Leitaða dagsetningin" (docs/i18n/locales/is.js)

```
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js:122:    "calendar.targetOutside": "Leitaða dagsetningin er ekki í kótelettunni sem nú er sýnd. Þú getur haldið áfram að fletta eða leitað að annarri dagsetningu.",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js:135:    "year.targetPosition": "Leitaða dagsetningin er dagur {day} af {length} í þessu ári.",
```


---

<sub>2m 4s</sub>

### `rg`

**"Papýrusstör"|"Karób"|"Þoka"|"Eridu"|"Uruk"|"Susa"**

""Papýrusstör"|"Karób"|"Þoka"|"Eridu"|"Uruk"|"Susa"" (docs/i18n/locales/is.js)

<details>
<summary>6 matches</summary>

```
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js:278:      "papyrusSedge": "Papýrusstör",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js:294:      "eridu": "Eridu",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js:300:      "mist": "Þoka",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js:304:      "carob": "Karób",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js:305:      "uruk": "Uruk",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js:325:      "susa": "Susa",
```

</details>


---

<sub>2m 50s</sub>

### Copilot

NATIVE_QA_RESULT: FAIL

## Heildarniðurstaða

**FAIL** í ströngu tvíþættu tungumála-/merkingarlegu gæðamati vegna orðalags í viðmótinu, ósamræmis í hugtökum milli geymsla og ófullnægjandi no-JavaScript skilaboða.

Frystar greinar passa við endurskoðunarskrána: `Sargon17-Green/pastafari-calendar@feature/about-i18n-72-locales` (`91b99880808e828ac95686b024293f462477a77a`) og `Sargon17-Green/Pastafarian-Calendar@Elm+íslensku` (`825585ec2789ba96cc9ac68312375fcd234dbcc7`). Yfirfarið var íslenska staðfærsluskráin í heild, íslenska `/about/` greinin, aðalsíður vefsins, lýsigögn, tungumálaskráning, ARIA-/villutextar og öfuga leitin, ásamt README, skjölum, frumtextakatalóg, Elm-úttakstextum og prófunarlýsingum hinnar geymslunnar.

## Niðurstöður

1. **Alvarleiki: miðlungs — óeðlilegt orðalag.**  
   `Sargon17-Green/pastafari-calendar`, `docs/i18n/locales/is.js:122,135`: „**Leitaða dagsetningin** er …“. Þetta er stirð og óíslensk smíð fyrir *the searched date*. Legg til „**Dagsetningin sem þú leitaðir að** …“; sama orðalag hentar báðum lyklum.

2. **Alvarleiki: lágt — ósamræmd stafsetning hugtaks.**  
   `Sargon17-Green/pastafari-calendar`, `docs/i18n/locales/is.js:115–122` og `docs/about/content/is.html:65–69`, nota „**kóteletta**“. `Sargon17-Green/Pastafarian-Calendar`, `STAGE_01_NORMATIVE_AUDIT.md:29–39`, notar „**kótiletta**“ (t.d. „Kótilettur og mánuðir“ og „kótilettuvísitala“). Merkingin virðist sú sama, en stafsetningin víxlast milli skjala og vöru. Veljið eina mynd og samræmið hana á öllum yfirborðum; vefviðmótið notar nú „kóteletta“.

3. **Alvarleiki: lágt — ósamræmd heiti á aðgerðardegi.**  
   `Sargon17-Green/Pastafarian-Calendar`, `STAGE_01_NORMATIVE_AUDIT.md:27,31`, notar „**verknaðardaginn**“; vefurinn notar „**aðgerðardagur**“ (t.d. `Sargon17-Green/pastafari-calendar`, `docs/i18n/locales/is.js:45–55`). Ekki virðist vera tæknilegur merkingarmunur ætlaður, en heitið verður ósamræmt. Legg til að nota „aðgerðardagur“ í útfærslugreininni líka.

4. **Alvarleiki: lágt — no-JavaScript skilaboð skýra ekki stöðuna.**  
   `Sargon17-Green/pastafari-calendar`, `docs/index.html:197–204` og `docs/about/index.html:75–82`: no-script svæðið sýnir aðeins „**JavaScript ⚠**“ og felur appið; þar kemur hvorki fram að JavaScript sé nauðsynlegt né hvað notandi geti gert. Bætið við skýrum íslenskum leiðbeiningum í no-script skilaboðin og tryggið viðeigandi tungumálamerkingu þeirra.

## Rangt tungumál og varasamræmi

Enginn augljós leki úr grannmáli eða blandað stafasett fannst í íslenska viðmótinu eða greininni. Hebreska varaleiðin er rétt merkt sem slík. Stöðluðum heitum, formúlum, auðkennum og kóðaorðum var haldið óbreyttum.

## Samræmi hugtaka

Atriði 2 og 3 eru ósamræmi í orðalagi, ekki staðfest merkingarleg villa í reiknireglum. Önnur hugtök—svo sem „aðgerðardagur“, „fyrirspurnardagur“, „kóteletta“, „mánuður“ og „fléttun“—eru almennt notuð á samræmdan hátt í íslenska viðmótinu og `/about/` greininni.

## Lýsigögn, ARIA, staðfærsluskrá og varaleiðir

Titill og lýsing vefsins, íslensk `/about/` lýsing og titill, íslenska PWA-heitið og lýsingin eru staðfærð. Tungumálaskráin skilgreinir `is` / `is-IS` og LTR-stefnu; greinarefnið fær `is-IS`. ARIA-heiti, stöðu- og villutextar fara um staðfærslulykla. No-script skilaboðin í niðurstöðu 4 eru eina skýra annmarkann sem fannst á þessum fleti.

## Skjöl og notendaviðmót í útfærslugreinum

Íslenskur megintexti README, katalógs og Stage 1 skjala, ásamt sýnilegum villu- og prófunartextum Elm-kóðans, er almennt skiljanlegur og á íslensku. Niðurstöður 2 og 3 eiga við skjalaheiti og hugtakanotkun í `Sargon17-Green/Pastafarian-Calendar`. Enska leyfissniðmátið er staðlaður lagatexti; það var ekki meðhöndlað sem þýðanlegt viðmótsefni.

## Textastýrð umbrotsáhætta

Engin augljós hætta vegna óvenjulega langra eða órofanlegra strengja kom fram við textaskoðun. Þetta er ekki sjónræn yfirferð; engin fullyrðing er gerð um raunverulegt útlit, ofgnótt, aðgengi eða hegðun í vafra/PWA.

---

<sub>Generated by [GitHub Copilot CLI](https://github.com/features/copilot/cli)</sub>
