# Copilot CLI Session

> [!NOTE]
> - **Session ID:** `e3c9756d-3a83-4541-943a-80115ccd4e6e`  
> - **Started:** 9/26/2026, 8:28:20 PM  
> - **Duration:** 4m 31s  
> - **Exported:** 9/26/2026, 8:32:52 PM  

---

<sub>1s</sub>

### User

Þú ert óháður móðurmálsmælandi yfirlesari Pastafarian Calendar-verkefnisins og metur málfar, merkingu, skjölun og notendaviðmót.

Yfirlestrarmálið er Íslenska (yfirlestrarauðkenni `is`; staðfærsla/staðsetningarmerki `is-IS`).

REVIEW_ID=is
LOCALE_TAG=is-IS

Öll samskipti á náttúrulegu máli í þessari yfirlestrarlotu skulu vera á Íslenska. Fyrstu skilaboðin frá notanda eru þessi þýdda fyrirmæli og allir hlutar svars þíns sem eru á náttúrulegu máli skulu áfram vera á Íslenska. Skiptu ekki yfir í ensku. Nákvæm heiti gagnasafna, heiti greina, slóðir, auðkenni, kóðastrengir, formúlur, kjötkássur, API-heiti og áskilin vélræn niðurstöðulína eru undanskilin.

Þetta er ný yfirlestrarlota í einangruðu umhverfi. Aðeins skal yfirlesa: ekki breyta, búa til, endurnefna eða eyða skrám í gagnasafni.

Það eru tvö gagnasöfn. Skoðaðu öll viðeigandi svæði sem tilgreind eru í staðbundnu yfirlestrarskránni:
1. Sargon17-Green/pastafari-calendar — þegar yfirlestrareiningin hefur staðfærslu fyrir vefsvæðið skaltu skoða ALLT vefsvæðið á því tungumáli, ekki aðeins /about/. Lestu alla staðfærsluskrána og greinina á /about/ og skoðaðu aðalnotendaviðmót, dagsetningaleit, dagatalsval, stýringar fyrir aðgerð/dag vinnu, samanburð, ársýn, öfuga leit, hleðslu-, tóma-, villu- og sannprófunarástand, leiðarvísi, síðufót, lýsigögn/titil, staðfærslu í upplýsingaskrá, noscript-/varaleiðir, ARIA-/aðgengisstrengi, tungumálaskipti og líklega úrelta varatextahegðun. Athugaðu samning um skilaboðalykla, merkingarhlutverk staðgengla, stöðug auðkenni og kanóníska strengi.
   Skoðaðu einnig færsluna fyrir markmálið í `\<details data-locale="...">` í `docs/no-js/index.html`. Heiti hinna tungumálanna á þeirri síðu eru viljandi hluti af kyrrstæðu tungumálavali, líkt og tungumálaval, og teljast ekki óæskilegur texti á röngu tungumáli. Texti í lokuðu `\<details>`-svæði á öðru tungumáli er sömuleiðis viljandi; tilkynntu aðeins um hann ef hann birtist eða er notaður sem varatexti fyrir markmálið.
2. Sargon17-Green/Pastafarian-Calendar — skoðaðu ALLAR greinar sem taldar eru upp fyrir þessa yfirlestrareiningu. Farðu yfir allan texta sem ætlaður er fólki: README og skjöl, fyrirsagnir/texta, útskýringar í skjölunarathugasemdum, hjálpartexta skipanalínu, fyrirmæli, villur, úttaksmerkingar, lýsigögn, dæmi og útbúin skjöl. Ekki þýða málskipan forritunarmála, auðkenni, kjötkássur, formúlur, API-heiti eða kanóníska kóðastrengi.

Líttu á staðbundnu skrána `artifacts/cross-repo-native-qa/runtime/review-manifest.json` sem endanlega heimild um hvaða svæði gagnasafnanna og nákvæmu, frystu innritunarauðkenni tilheyra þessari yfirlestrareiningu. Ef grein eða innritun passar ekki við skrána skaltu fella yfirferðina og tilkynna misræmið í stað þess að yfirfara breytilegan markpunkt.

Leitaðu sérstaklega að:
- þýðingarmáli sem er skiljanlegt en hljómar ekki eins og móðurmál;
- texta á röngu tungumáli, enskulegum áhrifum, varatexta úr nálægu tungumáli eða blöndun ritkerfa;
- vandamálum með málfræði, beygingar, fall, samræmi, orðaröð, stafsetningu, greinarmerki, málsnið og orðasambönd;
- ósamræmi í hugtakanotkun milli notendaviðmóts vefsvæðisins, /about/ og útfærslugreina;
- tæknilega rangri þýðingu eða orðalagi sem breytir staðreynd um reiknirit;
- staðgenglum sem gegna röngu merkingarhlutverki þótt mengi staðgengla sé óbreytt;
- skemmdum Unicode-texta, stöfum úr röngu ritkerfi, BiDi-vandamálum og greinarmerkjum sem valda RTL/LTR-vandamálum þar sem það á við;
- vandamálum með lýsigögn, titil, ARIA, skjálesaratexta, staðfærslu í upplýsingaskrá, varatexta og virkni án JavaScript;
- líklegri hættu á línuskiptingu eða yfirflæði vegna texta á markmálinu. Þetta síðasta atriði er aðeins textabundið áhættumat og MÁ EKKI lýsa sem sjónrænni prófun í birtri framsetningu.

Kanónískar óbreytur eru skyldubundnar. Ekki leggja til að formúlur, kjötkássur, stöðug auðkenni hluta, API-auðkenni, nákvæmir kóðastrengir eða raunveruleg kanónísk heiti séu þýdd eða þeim breytt eingöngu til að ná fram stílsamræmi.

Samræmi milli gagnasafna snýst um merkingu, ekki endilega orðrétt samræmi. Mismunandi orðalag er í lagi ef hvort tveggja er eðlilegt og miðlar sömu hugmynd. Tilkynntu ef orðalag breytir tæknilegri merkingu.

Þegar um er að ræða efnislega ólíkar útgáfur eða ritkerfi sem hafa aðskildar yfirlestrareiningar skaltu aðeins yfirfara þá útgáfu sem þessi fyrirmæli og skráin tilgreina.

FYRSTA lína svars þíns VERÐUR að vera nákvæmlega annaðhvort:
NATIVE_QA_RESULT: PASS
NATIVE_QA_RESULT: FAIL

Skrifaðu aðeins Markdown-skýrslu á Íslenska eftir þá línu. Taktu fram:
- heildarniðurstöðu PASS/FAIL fyrir stranga málfars- og merkingarlega gæðaskoðun milli gagnasafna;
- allar athugasemdir með alvarleika (critical/high/medium/low), nákvæmu gagnasafni, grein, skrá og nákvæmri staðsetningu þegar hægt er, núverandi texta, skýringu og ráðlagðri leiðréttingu;
- sérstakan kafla um texta á röngu tungumáli og varatexta;
- sérstakan kafla um samræmi í hugtakanotkun;
- sérstakan kafla um lýsigögn/ARIA/upplýsingaskrá/noscript/varaleiðir ef staðfærsla vefsvæðis er til staðar;
- sérstakan kafla um skjölun og notendamiðaðan texta í útfærslugrein;
- sérstakan kafla um textabundna hættu á línuskiptingu/yfirflæði ef staðfærsla vefsvæðis er til staðar;
- ef enga galla finnst, segðu það skýrt og tilgreindu hvaða svæði þú skoðaðir í raun.

Ekki fullyrða að sjónræn framsetning, aðgengissamskipti, virkni án nettengingar/PWA eða vafrasamskipti hafi verið prófuð nema sérstök gögn um keyrslu liggi fyrir. Þessi lota er eingöngu gæðahlið fyrir móðurmálslegt mat á málfari og merkingu.



---

<sub>4s</sub>

### `glob`

**artifacts/cross-repo-native-qa/runtime/review-manifest.json**

"artifacts/cross-repo-native-qa/runtime/review-manifest.json"

```
./artifacts/cross-repo-native-qa/runtime/review-manifest.json
```


---

<sub>4s</sub>

### `bash`

**Athuga stöðu vinnusvæðis**

$ git status --short

```
?? artifacts/cross-repo-native-qa/runtime/
<shellId: 0 completed with exit code 0>
```


---

<sub>6s</sub>

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
    "reviewed_head": "64e64007b965c1ab1f40963bb0745f37042c60dd",
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
        "head_sha": "231f4454793269381bedb582cb067a71adf65f72",
        "local_path": "/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0"
      }
    ]
  }
}
```

</details>


---

<sub>6s</sub>

### `bash` — Failed

**Skoða auðkenni gagnasafns og nærliggjandi möppur**

$ pwd && git rev-parse HEAD && git remote -v && ls -la ..

```
Permission denied and could not request permission from user
```


---

<sub>8s</sub>

### `bash`

**Staðfesta útgáfu fyrsta gagnasafns**

$ git rev-parse HEAD && git branch --show-current

```
64e64007b965c1ab1f40963bb0745f37042c60dd
feature/about-i18n-72-locales
<shellId: 2 completed with exit code 0>
```


---

<sub>8s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime.**

/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime

<details>
<summary>8 lines</summary>

```
prompt.md
prompt.raw.md
prompt.sha256
repo2-0
review-manifest.json
review-output.md
reviewer-stderr.log
translator-session.md
```

</details>


---

<sub>8s</sub>

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
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/tests/Stage01Harness.elm
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/tests/Stage01Checks.elm
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/tests/BootstrapFixtures.elm
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/tests/NormativeOracle.elm
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/DEVELOPMENT_STAGE.md
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/LICENSE
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/SPAGHETTI_DEVELOPMENT_HISTORY.md
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/CANONICAL_NAMES_LOCK.sha256
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/.github/workflows/canonical-names-lock.yml
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/STAGE_01_NORMATIVE_AUDIT.md
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/STAGE_01_OWNERSHIP_AUDIT.md
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/src/Pastafari/SourceLanguageCatalog.elm
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/src/Pastafari/Spaghetti.elm
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/src/Pastafari/ExactInt.elm
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/src/Pastafari/MonsterBase.elm
```

</details>


---

<sub>11s</sub>

### `bash` — Failed

**Staðfesta fryst auðkenni annars gagnasafns**

$ git -C artifacts/cross-repo-native-qa/runtime/repo2-0 rev-parse HEAD && git -C artifacts/cross-repo-native-qa/runtime/repo2-0 branch --show-current

```
Permission denied and could not request permission from user
```


---

<sub>11s</sub>

### `glob`

**docs/**/***

"docs/**/*"

<details>
<summary>199 matches</summary>

```
[glob: 190 path(s) under /home/runner/work/pastafari-calendar/pastafari-calendar/docs; grouped by directory]

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

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/no-js/ (1 path(s))
  index.html

[extensions: .js=92, .html=75, .md=16, .png=2, [no extension]=1, .webmanifest=1, .css=1, .txt=1]
```

</details>


---

<sub>11s</sub>

### `glob`

**src/**/***

"src/**/*" in artifacts/cross-repo-native-qa/runtime/repo2-0

```
No files matched the pattern.
```


---

<sub>17s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js

```
File too large to read at once (22.9 KB). Consider using the grep tool to search within the file, or view with view_range to read specific sections.
```


---

<sub>17s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html

```
File too large to read at once (33.8 KB). Consider using the grep tool to search within the file, or view with view_range to read specific sections.
```


---

<sub>17s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/no-js/index.html.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/no-js/index.html

```
<!DOCTYPE html>
<html lang="zxx" dir="ltr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="color-scheme" content="light">
    <meta name="robots" content="noindex">
    <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; form-action 'none'">
    <title>JavaScript</title>
    <style>
      :root { font-family: system-ui, sans-serif; color-scheme: light; }
      body { margin: 0; background: #f7f2e8; color: #241b17; }
      main { max-width: 46rem; margin: 0 auto; padding: 2rem 1rem 4rem; }
      h1 { margin: 0 0 1rem; font-size: clamp(1.6rem, 5vw, 2.4rem); }
      .language-mark { font-size: 1.75rem; margin: 0 0 1rem; }
      .language-list { display: grid; gap: .5rem; }
      details { border: 1px solid #9d8b75; border-radius: .6rem; background: #fffdf8; padding: .7rem .85rem; }
      summary { cursor: pointer; font-weight: 700; }
      details p { margin: .7rem 0 .15rem; line-height: 1.55; overflow-wrap: anywhere; }
      details[dir="rtl"] { text-align: right; }
      details[dir="ltr"] { text-align: left; }
      @media (max-width: 420px) { main { padding-inline: .75rem; } }
    </style>
  </head>
  <body>
    <main>
      <h1>JavaScript <span aria-hidden="true">⚠</span></h1>
      <p class="language-mark" aria-hidden="true">🌐</p>
      <div class="language-list">
      <details data-locale="af" lang="af-ZA" dir="ltr">
        <summary>Afrikaans</summary>
        <p>Hierdie webwerf vereis JavaScript. Aktiveer JavaScript in jou blaaier en herlaai die bladsy.</p>
      </details>
      <details data-locale="ar" lang="ar" dir="rtl">
        <summary>العربية</summary>
        <p>يتطلب هذا الموقع JavaScript. فعّل JavaScript في متصفحك ثم أعد تحميل الصفحة.</p>
      </details>
      <details data-locale="az" lang="az-AZ" dir="ltr">
        <summary>Azərbaycanca</summary>
        <p>Bu sayt üçün JavaScript tələb olunur. Brauzerinizdə JavaScript-i aktivləşdirin və səhifəni yenidən yükləyin.</p>
      </details>
      <details data-locale="be" lang="be-BY" dir="ltr">
        <summary>Беларуская</summary>
        <p>Для гэтага сайта патрэбны JavaScript. Уключыце JavaScript у браўзеры і перазагрузіце старонку.</p>
      </details>
      <details data-locale="bg" lang="bg-BG" dir="ltr">
        <summary>Български</summary>
        <p>Този сайт изисква JavaScript. Активирайте JavaScript в браузъра си и презаредете страницата.</p>
      </details>
      <details data-locale="bn" lang="bn-BD" dir="ltr">
        <summary>বাংলা</summary>
        <p>এই সাইটের জন্য JavaScript প্রয়োজন। আপনার ব্রাউজারে JavaScript চালু করে পৃষ্ঠাটি আবার লোড করুন।</p>
      </details>
      <details data-locale="bs" lang="bs-BA" dir="ltr">
        <summary>Bosanski</summary>
        <p>Ova stranica zahtijeva JavaScript. Omogućite JavaScript u pregledniku i ponovo učitajte stranicu.</p>
      </details>
      <details data-locale="ca" lang="ca-ES" dir="ltr">
        <summary>Català</summary>
        <p>Aquest lloc requereix JavaScript. Activeu JavaScript al navegador i torneu a carregar la pàgina.</p>
      </details>
      <details data-locale="cs" lang="cs-CZ" dir="ltr">
        <summary>Čeština</summary>
        <p>Tento web vyžaduje JavaScript. Povolte JavaScript v prohlížeči a znovu načtěte stránku.</p>
      </details>
      <details data-locale="da" lang="da-DK" dir="ltr">
        <summary>Dansk</summary>
        <p>Dette websted kræver JavaScript. Aktivér JavaScript i din browser, og genindlæs siden.</p>
      </details>
      <details data-locale="de" lang="de-DE" dir="ltr">
        <summary>Deutsch</summary>
        <p>Diese Website benötigt JavaScript. Aktivieren Sie JavaScript in Ihrem Browser und laden Sie die Seite neu.</p>
      </details>
      <details data-locale="el" lang="el-GR" dir="ltr">
        <summary>Ελληνικά</summary>
        <p>Αυτός ο ιστότοπος απαιτεί JavaScript. Ενεργοποιήστε το JavaScript στο πρόγραμμα περιήγησής σας και φορτώστε ξανά τη σελίδα.</p>
      </details>
      <details data-locale="en" lang="en-US" dir="ltr">
        <summary>English</summary>
        <p>This site requires JavaScript. Enable JavaScript in your browser and reload the page.</p>
      </details>
      <details data-locale="eo" lang="eo" dir="ltr">
        <summary>Esperanto</summary>
        <p>Ĉi tiu retejo bezonas JavaScript. Ebligu JavaScript en via retumilo kaj reŝargu la paĝon.</p>
      </details>
      <details data-locale="es" lang="es-ES" dir="ltr">
        <summary>Español</summary>
        <p>Este sitio requiere JavaScript. Activa JavaScript en tu navegador y vuelve a cargar la página.</p>
      </details>
      <details data-locale="et" lang="et-EE" dir="ltr">
        <summary>Eesti</summary>
        <p>See sait vajab JavaScripti. Lubage brauseris JavaScript ja laadige leht uuesti.</p>
      </details>
      <details data-locale="fa" lang="fa-IR" dir="rtl">
        <summary>فارسی</summary>
        <p>این سایت به JavaScript نیاز دارد. JavaScript را در مرورگر خود فعال کنید و صفحه را دوباره بارگیری کنید.</p>
      </details>
      <details data-locale="fi" lang="fi-FI" dir="ltr">
        <summary>Suomi</summary>
        <p>Tämä sivusto vaatii JavaScriptin. Ota JavaScript käyttöön selaimessasi ja lataa sivu uudelleen.</p>
      </details>
      <details data-locale="fil" lang="fil-PH" dir="ltr">
        <summary>Filipino</summary>
        <p>Kailangan ng site na ito ang JavaScript. Paganahin ang JavaScript sa iyong browser at muling i-load ang pahina.</p>
      </details>
      <details data-locale="fo" lang="fo-FO" dir="ltr">
        <summary>Føroyskt</summary>
        <p>Henda heimasíðan krevur JavaScript. Virkja JavaScript í kaganum og les síðuna inn av nýggjum.</p>
      </details>
      <details data-locale="fr" lang="fr-FR" dir="ltr">
        <summary>Français</summary>
        <p>Ce site nécessite JavaScript. Activez JavaScript dans votre navigateur, puis rechargez la page.</p>
      </details>
      <details data-locale="fy" lang="fy-NL" dir="ltr">
        <summary>Frysk</summary>
        <p>Dizze webside hat JavaScript nedich. Skeakelje JavaScript yn jo browser yn en laad de side opnij.</p>
      </details>
      <details data-locale="gl" lang="gl-ES" dir="ltr">
        <summary>Galego</summary>
        <p>Este sitio require JavaScript. Activa JavaScript no navegador e volve cargar a páxina.</p>
      </details>
      <details data-locale="gu" lang="gu-IN" dir="ltr">
        <summary>ગુજરાતી</summary>
        <p>આ સાઇટ માટે JavaScript જરૂરી છે. તમારા બ્રાઉઝરમાં JavaScript સક્રિય કરો અને પાનું ફરી લોડ કરો.</p>
      </details>
      <details data-locale="ha" lang="ha-NG" dir="ltr">
        <summary>Hausa</summary>
        <p>Wannan shafin yana buƙatar JavaScript. Kunna JavaScript a burauzarka sannan ka sake loda shafin.</p>
      </details>
      <details data-locale="he" lang="he-IL" dir="rtl">
        <summary>עברית</summary>
        <p>האתר הזה דורש JavaScript. יש להפעיל JavaScript בדפדפן ולאחר מכן לטעון מחדש את הדף.</p>
      </details>
      <details data-locale="hi" lang="hi-IN" dir="ltr">
        <summary>हिन्दी</summary>
        <p>इस साइट के लिए JavaScript आवश्यक है। अपने ब्राउज़र में JavaScript चालू करें और पृष्ठ को फिर से लोड करें।</p>
      </details>
      <details data-locale="hr" lang="hr-HR" dir="ltr">
        <summary>Hrvatski</summary>
        <p>Ova stranica zahtijeva JavaScript. Omogućite JavaScript u pregledniku i ponovno učitajte stranicu.</p>
      </details>
      <details data-locale="ht" lang="ht-HT" dir="ltr">
        <summary>Kreyòl ayisyen</summary>
        <p>Sit sa a bezwen JavaScript. Aktive JavaScript nan navigatè w la epi rechaje paj la.</p>
      </details>
      <details data-locale="hu" lang="hu-HU" dir="ltr">
        <summary>Magyar</summary>
        <p>Ehhez a webhelyhez JavaScript szükséges. Engedélyezze a JavaScriptet a böngészőben, majd töltse újra az oldalt.</p>
      </details>
      <details data-locale="hy" lang="hy-AM" dir="ltr">
        <summary>Հայերեն</summary>
        <p>Այս կայքի համար անհրաժեշտ է JavaScript։ Միացրեք JavaScript-ը ձեր դիտարկիչում և վերաբեռնեք էջը։</p>
      </details>
      <details data-locale="id" lang="id-ID" dir="ltr">
        <summary>Bahasa Indonesia</summary>
        <p>Situs ini memerlukan JavaScript. Aktifkan JavaScript di browser Anda lalu muat ulang halaman.</p>
      </details>
      <details data-locale="is" lang="is-IS" dir="ltr">
        <summary>Íslenska</summary>
        <p>Þessi vefur krefst JavaScript. Virkjaðu JavaScript í vafranum þínum og endurhladdu síðan síðuna.</p>
      </details>
      <details data-locale="it" lang="it-IT" dir="ltr">
        <summary>Italiano</summary>
        <p>Questo sito richiede JavaScript. Abilita JavaScript nel browser e ricarica la pagina.</p>
      </details>
      <details data-locale="ja" lang="ja-JP" dir="ltr">
        <summary>日本語</summary>
        <p>このサイトではJavaScriptが必要です。ブラウザーでJavaScriptを有効にして、ページを再読み込みしてください。</p>
      </details>
      <details data-locale="jv" lang="jv-ID" dir="ltr">
        <summary>Basa Jawa</summary>
        <p>Situs iki mbutuhake JavaScript. Aktifna JavaScript ing browser banjur muat maneh kaca iki.</p>
      </details>
      <details data-locale="ka" lang="ka-GE" dir="ltr">
        <summary>ქართული</summary>
        <p>ამ საიტისთვის საჭიროა JavaScript. ჩართეთ JavaScript ბრაუზერში და შემდეგ გვერდი თავიდან ჩატვირთეთ.</p>
      </details>
      <details data-locale="kk" lang="kk-KZ" dir="ltr">
        <summary>Қазақша</summary>
        <p>Бұл сайтқа JavaScript қажет. Браузерде JavaScript-ті қосып, бетті қайта жүктеңіз.</p>
      </details>
      <details data-locale="ko" lang="ko-KR" dir="ltr">
        <summary>한국어</summary>
        <p>이 사이트를 사용하려면 JavaScript가 필요합니다. 브라우저에서 JavaScript를 사용하도록 설정한 뒤 페이지를 새로고침하세요.</p>
      </details>
      <details data-locale="lb" lang="lb-LU" dir="ltr">
        <summary>Lëtzebuergesch</summary>
        <p>Dës Websäit brauch JavaScript. Aktivéiert JavaScript an Ärem Browser a luet d'Säit nei.</p>
      </details>
      <details data-locale="lt" lang="lt-LT" dir="ltr">
        <summary>Lietuvių</summary>
        <p>Šiai svetainei būtinas JavaScript. Įjunkite JavaScript naršyklėje ir iš naujo įkelkite puslapį.</p>
      </details>
      <details data-locale="lv" lang="lv-LV" dir="ltr">
        <summary>Latviešu</summary>
        <p>Šai vietnei ir nepieciešams JavaScript. Iespējojiet JavaScript pārlūkprogrammā un pārlādējiet lapu.</p>
      </details>
      <details data-locale="mk" lang="mk-MK" dir="ltr">
        <summary>Македонски</summary>
        <p>Оваа страница бара JavaScript. Овозможете JavaScript во прелистувачот и повторно вчитајте ја страницата.</p>
      </details>
      <details data-locale="mr" lang="mr-IN" dir="ltr">
        <summary>मराठी</summary>
        <p>या साइटसाठी JavaScript आवश्यक आहे. आपल्या ब्राउझरमध्ये JavaScript सुरू करा आणि पृष्ठ पुन्हा लोड करा.</p>
      </details>
      <details data-locale="ms" lang="ms-MY" dir="ltr">
        <summary>Bahasa Melayu</summary>
        <p>Laman ini memerlukan JavaScript. Aktifkan JavaScript dalam pelayar anda dan muat semula halaman.</p>
      </details>
      <details data-locale="nb" lang="nb-NO" dir="ltr">
        <summary>Norsk bokmål</summary>
        <p>Dette nettstedet krever JavaScript. Aktiver JavaScript i nettleseren og last siden på nytt.</p>
      </details>
      <details data-locale="ne" lang="ne-NP" dir="ltr">
        <summary>नेपाली</summary>
        <p>यो साइटका लागि JavaScript आवश्यक छ। आफ्नो ब्राउजरमा JavaScript सक्षम गरेर पृष्ठ पुनः लोड गर्नुहोस्।</p>
      </details>
      <details data-locale="nl" lang="nl-NL" dir="ltr">
        <summary>Nederlands</summary>
        <p>Deze site vereist JavaScript. Schakel JavaScript in uw browser in en laad de pagina opnieuw.</p>
      </details>
      <details data-locale="nn" lang="nn-NO" dir="ltr">
        <summary>Norsk nynorsk</summary>
        <p>Denne nettstaden krev JavaScript. Slå på JavaScript i nettlesaren og last sida på nytt.</p>
      </details>
      <details data-locale="pa" lang="pa-IN" dir="ltr">
        <summary>ਪੰਜਾਬੀ</summary>
        <p>ਇਸ ਸਾਈਟ ਲਈ JavaScript ਲਾਜ਼ਮੀ ਹੈ। ਆਪਣੇ ਬ੍ਰਾਊਜ਼ਰ ਵਿੱਚ JavaScript ਚਾਲੂ ਕਰੋ ਅਤੇ ਸਫ਼ਾ ਮੁੜ ਲੋਡ ਕਰੋ।</p>
      </details>
      <details data-locale="pl" lang="pl-PL" dir="ltr">
        <summary>Polski</summary>
        <p>Ta witryna wymaga JavaScript. Włącz JavaScript w przeglądarce i ponownie załaduj stronę.</p>
      </details>
      <details data-locale="pt" lang="pt-BR" dir="ltr">
        <summary>Português</summary>
        <p>Este site requer JavaScript. Ative o JavaScript no navegador e recarregue a página.</p>
      </details>
      <details data-locale="ro" lang="ro-RO" dir="ltr">
        <summary>Română</summary>
        <p>Acest site necesită JavaScript. Activați JavaScript în browser și reîncărcați pagina.</p>
      </details>
      <details data-locale="ru" lang="ru-RU" dir="ltr">
        <summary>Русский</summary>
        <p>Для работы этого сайта требуется JavaScript. Включите JavaScript в браузере и перезагрузите страницу.</p>
      </details>
      <details data-locale="sk" lang="sk-SK" dir="ltr">
        <summary>Slovenčina</summary>
        <p>Táto stránka vyžaduje JavaScript. Povoľte JavaScript v prehliadači a znova načítajte stránku.</p>
      </details>
      <details data-locale="sl" lang="sl-SI" dir="ltr">
        <summary>Slovenščina</summary>
        <p>To spletno mesto zahteva JavaScript. Omogočite JavaScript v brskalniku in znova naložite stran.</p>
      </details>
      <details data-locale="so" lang="so-SO" dir="ltr">
        <summary>Soomaali</summary>
        <p>Boggan wuxuu u baahan yahay JavaScript. Ka daar JavaScript biraawsarkaaga, dabadeedna dib u rar bogga.</p>
      </details>
      <details data-locale="sq" lang="sq-AL" dir="ltr">
        <summary>Shqip</summary>
        <p>Kjo faqe kërkon JavaScript. Aktivizoni JavaScript në shfletues dhe ringarkoni faqen.</p>
      </details>
      <details data-locale="sr" lang="sr-Latn-RS" dir="ltr">
        <summary>Srpski</summary>
        <p>Ovaj sajt zahteva JavaScript. Omogućite JavaScript u pregledaču i ponovo učitajte stranicu.</p>
      </details>
      <details data-locale="sv" lang="sv-SE" dir="ltr">
        <summary>Svenska</summary>
        <p>Den här webbplatsen kräver JavaScript. Aktivera JavaScript i webbläsaren och ladda om sidan.</p>
      </details>
      <details data-locale="sw" lang="sw-TZ" dir="ltr">
        <summary>Kiswahili</summary>
        <p>Tovuti hii inahitaji JavaScript. Washa JavaScript kwenye kivinjari chako, kisha upakie upya ukurasa.</p>
      </details>
      <details data-locale="ta" lang="ta-IN" dir="ltr">
        <summary>தமிழ்</summary>
        <p>இந்தத் தளத்திற்கு JavaScript தேவை. உங்கள் உலாவியில் JavaScript-ஐ இயக்கி, பக்கத்தை மீண்டும் ஏற்றவும்.</p>
      </details>
      <details data-locale="te" lang="te-IN" dir="ltr">
        <summary>తెలుగు</summary>
        <p>ఈ సైట్‌కు JavaScript అవసరం. మీ బ్రౌజర్‌లో JavaScript‌ను ప్రారంభించి, పేజీని మళ్లీ లోడ్ చేయండి.</p>
      </details>
      <details data-locale="th" lang="th-TH" dir="ltr">
        <summary>ไทย</summary>
        <p>เว็บไซต์นี้ต้องใช้ JavaScript โปรดเปิดใช้งาน JavaScript ในเบราว์เซอร์แล้วโหลดหน้าเว็บใหม่</p>
      </details>
      <details data-locale="tr" lang="tr-TR" dir="ltr">
        <summary>Türkçe</summary>
        <p>Bu site JavaScript gerektirir. Tarayıcınızda JavaScript'i etkinleştirip sayfayı yeniden yükleyin.</p>
      </details>
      <details data-locale="uk" lang="uk-UA" dir="ltr">
        <summary>Українська</summary>
        <p>Для роботи цього сайту потрібен JavaScript. Увімкніть JavaScript у браузері та перезавантажте сторінку.</p>
      </details>
      <details data-locale="ur" lang="ur-PK" dir="rtl">
        <summary>اردو</summary>
        <p>اس سائٹ کے لیے JavaScript ضروری ہے۔ اپنے براؤزر میں JavaScript فعال کریں اور صفحہ دوبارہ لوڈ کریں۔</p>
      </details>
      <details data-locale="uz" lang="uz-UZ" dir="ltr">
        <summary>O‘zbekcha</summary>
        <p>Bu sayt uchun JavaScript zarur. Brauzeringizda JavaScript-ni yoqing va sahifani qayta yuklang.</p>
      </details>
      <details data-locale="vi" lang="vi-VN" dir="ltr">
        <summary>Tiếng Việt</summary>
        <p>Trang web này cần JavaScript. Hãy bật JavaScript trong trình duyệt rồi tải lại trang.</p>
      </details>
      <details data-locale="yo" lang="yo-NG" dir="ltr">
        <summary>Yorùbá</summary>
        <p>Ojúlé yìí nílò JavaScript. Jọ̀wọ́ tan JavaScript nínú aṣàwákiri rẹ, kí o sì tún ojúewé náà ṣe.</p>
      </details>
      <details data-locale="zh" lang="zh-CN" dir="ltr">
        <summary>简体中文</summary>
        <p>此网站需要 JavaScript。请在浏览器中启用 JavaScript，然后重新加载页面。</p>
      </details>
      <details data-locale="zu" lang="zu-ZA" dir="ltr">
        <summary>isiZulu</summary>
        <p>Le sayithi idinga i-JavaScript. Vumela i-JavaScript esipheqululini sakho bese ulayisha kabusha ikhasi.</p>
      </details>
      </div>
    </main>
  </body>
</html>

```


---

<sub>17s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/registry.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/registry.js

```
File too large to read at once (29.6 KB). Consider using the grep tool to search within the file, or view with view_range to read specific sections.
```


---

<sub>17s</sub>

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

<sub>21s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js (lines 1-140)

<details>
<summary>139 lines</summary>

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
```

</details>


---

<sub>21s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js (lines 141-280)

<details>
<summary>139 lines</summary>

```
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
```

</details>


---

<sub>21s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html (lines 1-130)

<details>
<summary>117 lines</summary>

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
```

</details>


---

<sub>21s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html (lines 131-260)

<details>
<summary>120 lines</summary>

```
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
```

</details>


---

<sub>21s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/no-js/index.html.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/no-js/index.html (lines 105-125)

```
      </details>
      <details data-locale="fo" lang="fo-FO" dir="ltr">
        <summary>Føroyskt</summary>
        <p>Henda heimasíðan krevur JavaScript. Virkja JavaScript í kaganum og les síðuna inn av nýggjum.</p>
      </details>
      <details data-locale="fr" lang="fr-FR" dir="ltr">
        <summary>Français</summary>
        <p>Ce site nécessite JavaScript. Activez JavaScript dans votre navigateur, puis rechargez la page.</p>
      </details>
      <details data-locale="fy" lang="fy-NL" dir="ltr">
        <summary>Frysk</summary>
        <p>Dizze webside hat JavaScript nedich. Skeakelje JavaScript yn jo browser yn en laad de side opnij.</p>
      </details>
      <details data-locale="gl" lang="gl-ES" dir="ltr">
        <summary>Galego</summary>
        <p>Este sitio require JavaScript. Activa JavaScript no navegador e volve cargar a páxina.</p>
      </details>
      <details data-locale="gu" lang="gu-IN" dir="ltr">
        <summary>ગુજરાતી</summary>
        <p>આ સાઇટ માટે JavaScript જરૂરી છે. તમારા બ્રાઉઝરમાં JavaScript સક્રિય કરો અને પાનું ફરી લોડ કરો.</p>
      </details>
```


---

<sub>21s</sub>

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

<sub>31s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js (lines 1-100)

<details>
<summary>99 lines</summary>

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
```

</details>


---

<sub>31s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js (lines 101-200)

<details>
<summary>100 lines</summary>

```
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
```

</details>


---

<sub>31s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js (lines 201-360)

<details>
<summary>150 lines</summary>

```
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
```

</details>


---

<sub>31s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html (lines 1-100)

<details>
<summary>91 lines</summary>

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
```

</details>


---

<sub>31s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html (lines 101-200)

<details>
<summary>92 lines</summary>

```
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
```

</details>


---

<sub>31s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html (lines 201-320)

<details>
<summary>108 lines</summary>

```
  <h2>Hvernig er fundur ákveðinn?</h2>
  <p>Ef tveir vilja semja um fund með Pastafari-dagsetningu einni saman verða þeir að minnsta kosti að vera sammála um fimm dagsetningarreiti og aðgerðardaginn sem notaður var í útreikningnum. Betra er að vista aðgerðardaginn sem fast dagauðkenni en sem orðið „í dag“; annars geta tveir reiknað tvö mismunandi dagatöl.</p>
  <ul>
    <li>„á morgun“ er næsti dagur á tímalínunni;</li>
    <li>„næsti dagur mánaðarins“ er næsta birting þess mánaðar;</li>
    <li>„lok mánaðarins“ eru síðasta birting þess mánaðar;</li>
    <li>„allur mánuðurinn“ getur þýtt mengi daga sem tilheyra mánuðinum eða allt samfellt tímabil á tímalínunni frá fyrstu til síðustu birtingar;</li>
    <li>„næsta ár“ er næsta árið í dagatalinu sem byggt er undir valda aðgerðardeginum.</li>
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
```

</details>


---

<sub>39s</sub>

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

<sub>39s</sub>

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

<sub>39s</sub>

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

Jákvæð hlið spyr um `FOUNDATION+n` og neikvæð hlið um `FOUNDATION-n`. Hliðabil eru 42..963 dagar. Árslengd er 252..5778 dagar; 5779 og hærra komast ekki í gildan árskost. Ár 5000 er valið úr pörum sem innihalda aðgerðardaginn á bilinu `(open,close]`, fyrst eftir lengd og síðan eftir fyrra opnunarhliði við jafna lengd. Ferð til markárs er ár fyrir ár. Opnunarhliðið tilheyrir fyrra ári vegna skilyrðisins `targetDay <= openGateDay` í afturleit.

## Kótilettur og mánuðir

Fjöldi kóteletta er takmarkaður við 6..17 og ekki meiri en fjöldi hliðabila ársins. Skipting kóteletta er nákvæm lexíkógrafísk talning/opnun; ef aðgerðardagurinn er innra hlið verður það millimark skiptingarinnar. Nöfn eru valin sem hlutumraðanir án endurtekningar og innri merkingin er `canonicalIndex`.

Mánaðafjöldi fylgir mörkunum 4..123 dagar og að hámarki 47 mánuðir. Mánaðalengdir eru taldar og opnaðar með nákvæmu DP án þess að efnisgera alla fjölskylduna. Vefurinn er valinn sem ein heild með DP sem varðveitir bæði röð fyrstu og síðustu birtingar. `dayInMonth` er fjöldi birtinga valins mánaðar frá upphafi árs til og með markdegi.

## Lokaniðurstaða og aðskilnaður

`calendarDateCanonical` skilar nákvæmlega fimm merkingarsviðum. `calendarDate` leysir aðeins kótilettu- og mánaðarvísitölur yfir í fryst íslensk heiti. Ekkert í `src/` flytur inn `NormativeOracle`, þannig að framleiðsluskelin getur ekki notað viðmiðunarvélina sem varaleið eða leiðréttingu.

Við úttektina fannst Elm-sértæk þýðingarvilla í eldri drögum: fjögurra og fimm staka tuple-gildi höfðu verið notuð í stuðlatöflum og í innra vali kótilettuskiptingar. Elm leyfir ekki slík tuple. Þau voru skipt út fyrir nafngreind record-gildi án merkingarbreytingar. Engin fjögurra eða fleiri staka tuple er eftir í Elm-kóðanum.

## Staða

Enginn þekktur merkingarlegur, eignarhaldslegur eða Elm-sértækur byggingargalli er eftir í Stage 1 eftir þessa kyrrstöðuúttekt. Þetta er ekki staðgengill fyrir þýðingu. Raunveruleg Elm 0.19.1 þýðing og keyrsla allra vitna er enn nauðsynleg áður en `LAST_COMPLETED_STAGE` má verða 1.
```

</details>


---

<sub>39s</sub>

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

<sub>50s</sub>

### `bash`

**Staðfesta innritunarauðkenni annars gagnasafns**

$ cd artifacts/cross-repo-native-qa/runtime/repo2-0 && git rev-parse HEAD && git status --short

```
231f4454793269381bedb582cb067a71adf65f72
<shellId: 4 completed with exit code 0>
```


---

<sub>50s</sub>

### `glob`

****/.git**

"**/.git" in artifacts/cross-repo-native-qa/runtime/repo2-0

```
No files matched the pattern.
```


---

<sub>50s</sub>

### `glob`

**tests/**/*.elm**

"tests/**/*.elm" in artifacts/cross-repo-native-qa/runtime/repo2-0

```
No files matched the pattern.
```


---

<sub>50s</sub>

### `glob`

***.md**

"*.md" in artifacts/cross-repo-native-qa/runtime/repo2-0

<details>
<summary>6 matches</summary>

```
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/SOURCE_LANGUAGE_CATALOG.md
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/README.md
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/STAGE_01_OWNERSHIP_AUDIT.md
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/DEVELOPMENT_STAGE.md
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/SPAGHETTI_DEVELOPMENT_HISTORY.md
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/STAGE_01_NORMATIVE_AUDIT.md
```

</details>


---

<sub>53s</sub>

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

<sub>53s</sub>

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

<sub>53s</sub>

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

<sub>53s</sub>

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

<sub>53s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/tests/Stage01Checks.elm.**

/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/tests/Stage01Checks.elm (lines 1-110)

<details>
<summary>81 lines</summary>

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
```

</details>


---

<sub>53s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/tests/Stage01Checks.elm.**

/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/tests/Stage01Checks.elm (lines 111-220)

<details>
<summary>81 lines</summary>

```


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
```

</details>


---

<sub>53s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/tests/NormativeOracle.elm.**

/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/tests/NormativeOracle.elm (lines 1-120)

<details>
<summary>95 lines</summary>

```
module NormativeOracle exposing
    ( AnswerStream
    , CalendarDate
    , CanonicalCalendarDate
    , GateState
    , SauceResult
    , Stone
    , WorkCounts
    , answerAt
    , buildStones
    , calendarDate
    , calendarDateCanonical
    , chooseRank
    , chooseRankShort
    , chooseRankWide
    , countBoundedCompositions
    , countCutletPartitionsForTest
    , countWeavingsForLengths
    , dayCount
    , fallingFactorial
    , foundationDay
    , initialGateState
    , m
    , negativeGateGap
    , permutationUnrank1
    , positiveGateGap
    , save
    , sauce
    , tabletsDay
    , yearMaxDays
    , unrankBoundedComposition
    , unrankCutletPartition
    , unrankDistinctIndices
    , unrankWeavingForLengths
    , workCounts
    )

import Array exposing (Array)
import Dict exposing (Dict)
import Pastafari.ExactInt as BI exposing (BigInt)
import Pastafari.SourceLanguageCatalog as Catalog


m : BigInt
m =
    BI.sub (BI.powSmall 2 127) BI.one


tabletsDay : BigInt
tabletsDay =
    BI.fromInt -278522


foundationDay : BigInt
foundationDay =
    BI.fromInt -15055671


yearMinDays : Int
yearMinDays =
    252


yearMaxDays : Int
yearMaxDays =
    5778


type alias WorkCounts =
    { action : BigInt
    , target : BigInt
    , distance : BigInt
    , connection : BigInt
    , direction : BigInt
    }


type StoneKind
    = Wheat
    | Barley
    | Salt
    | Bitter
    | Red


type alias Stone =
    { wheat : BigInt
    , barley : BigInt
    , salt : BigInt
    , bitter : BigInt
    , red : BigInt
    }


type alias HiddenCoeff =
    { a : Int
    , b : Int
    , c : Int
    , d : Int
    }


type alias VisibleGrind =
    { a : Int
    , b : Int
    , c : Int
    , d : Int
    , kind : StoneKind
    }


type alias SauceResult =
    { bowls : Array BigInt
    , orderAtDrop46 : List Int
    }


type alias AnswerStream =
    { first : BigInt
    , directionStep : Int
```

</details>


---

<sub>1m 5s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/index.html.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/index.html (lines 1-180)

```
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <noscript><meta http-equiv="refresh" content="0; url=./no-js/"></noscript>
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
```


---

<sub>1m 5s</sub>

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

<sub>1m 5s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/registry.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/registry.js (lines 1-140)

<details>
<summary>131 lines</summary>

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
```

</details>


---

<sub>1m 5s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html (lines 321-430)

<details>
<summary>10 lines</summary>

```
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

<sub>1m 5s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/tests/Stage01Checks.elm.**

/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/tests/Stage01Checks.elm (lines 220-360)

<details>
<summary>134 lines</summary>

```

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
```

</details>


---

<sub>1m 5s</sub>

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

<sub>1m 19s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/index.html.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/index.html (lines 1-140)

```
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <noscript><meta http-equiv="refresh" content="0; url=../no-js/"></noscript>
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
        <p><strong>JavaScript</strong> <span>⚠</span> <a href="../no-js/" lang="zxx" dir="ltr">🌐</a></p>
      </div>
    </noscript>
  </body>
</html>

```


---

<sub>1m 19s</sub>

### `rg`

**kótilett|kótelett|papýrus|JavaScript|síðan síðuna|yearFiveThousand|terminology|FOREIGN_LANGUAGE_USAGE**

"kótilett|kótelett|papýrus|JavaScript|síðan síðuna|yearFiveThousand|terminology|FOREIGN_LANGUAGE_USAGE" (docs/i18n/locales/is.js, docs/about/content/is.html, docs/no-js/index.html, artifacts/cross-repo-native-qa/runtime/repo2-0)

<details>
<summary>169 matches</summary>

```
[grep content: 171 matches across 12 file(s) under /home/runner/work/pastafari-calendar/pastafari-calendar]

artifacts/cross-repo-native-qa/runtime/repo2-0/SOURCE_LANGUAGE_CATALOG.md (1 match(es)):
  19- 7. Palgúrasj
  20: 8. papýrussef
  21- 9. klasi

artifacts/cross-repo-native-qa/runtime/repo2-0/README.md (1 match(es)):
  6- 
  7: `Pastafari.ExactInt` veitir nákvæman heiltölureikning með ótakmarkaðri stærð, skrifaðan í Elm. `NormativeOracle` er prófunar-eingöngu bein útfærsla á innbyggða staðlaða viðmiðinu. `Pastafari.SourceLanguageCatalog` frystir 17 kótelettunöfn og 47 mánaðarnöfn með föstum `canonicalIndex`. `Pastafari.MonsterBase` er aðeins hlutlaus grunnur fyrir samhengi, stýringu, staðfestingu og mælingar. `Pastafari.Spaghetti` inniheldur enn enga eldri villuleið og enga leiðréttingarrökfræði úr síðari stigum.
  8- 

artifacts/cross-repo-native-qa/runtime/repo2-0/src/Pastafari/SourceLanguageCatalog.elm (1 match(es)):
  31-     , { canonicalIndex = 7, sourceId = "PALGURASH", text = "Palgúrasj" }
  32:     , { canonicalIndex = 8, sourceId = "PAPYRUS_SEDGE", text = "papýrussef" }
  33-     , { canonicalIndex = 9, sourceId = "CLUSTER", text = "klasi" }

docs/no-js/index.html (74 match(es)):
  ... 1 more context line(s) omitted in this file
  9:     <title>JavaScript</title>
  ... 2 more context line(s) omitted in this file
  27:       <h1>JavaScript <span aria-hidden="true">⚠</span></h1>
  ... 2 more context line(s) omitted in this file
  32:         <p>Hierdie webwerf vereis JavaScript. Aktiveer JavaScript in jou blaaier en herlaai die bladsy.</p>
  ... 2 more context line(s) omitted in this file
  36:         <p>يتطلب هذا الموقع JavaScript. فعّل JavaScript في متصفحك ثم أعد تحميل الصفحة.</p>
  ... 2 more context line(s) omitted in this file
  40:         <p>Bu sayt üçün JavaScript tələb olunur. Brauzerinizdə JavaScript-i aktivləşdirin və səhifəni yenidən yükləyin.</p>
  ... 2 more context line(s) omitted in this file
  44:         <p>Для гэтага сайта патрэбны JavaScript. Уключыце JavaScript у браўзеры і перазагрузіце старонку.</p>
  ... 2 more context line(s) omitted in this file
  48:         <p>Този сайт изисква JavaScript. Активирайте JavaScript в браузъра си и презаредете страницата.</p>
  ... 2 more context line(s) omitted in this file
  52:         <p>এই সাইটের জন্য JavaScript প্রয়োজন। আপনার ব্রাউজারে JavaScript চালু করে পৃষ্ঠাটি আবার লোড করুন।</p>
  ... 2 more context line(s) omitted in this file
  56:         <p>Ova stranica zahtijeva JavaScript. Omogućite JavaScript u pregledniku i ponovo učitajte stranicu.</p>
  ... 2 more context line(s) omitted in this file
  60:         <p>Aquest lloc requereix JavaScript. Activeu JavaScript al navegador i torneu a carregar la pàgina.</p>
  ... 2 more context line(s) omitted in this file
  64:         <p>Tento web vyžaduje JavaScript. Povolte JavaScript v prohlížeči a znovu načtěte stránku.</p>
  ... 2 more context line(s) omitted in this file
  68:         <p>Dette websted kræver JavaScript. Aktivér JavaScript i din browser, og genindlæs siden.</p>
  ... 50 more match(es) and 102 context line(s) omitted in this file
  272:         <p>Tovuti hii inahitaji JavaScript. Washa JavaScript kwenye kivinjari chako, kisha upakie upya ukurasa.</p>
  ... 2 more context line(s) omitted in this file
  276:         <p>இந்தத் தளத்திற்கு JavaScript தேவை. உங்கள் உலாவியில் JavaScript-ஐ இயக்கி, பக்கத்தை மீண்டும் ஏற்றவும்.</p>
  ... 2 more context line(s) omitted in this file
  280:         <p>ఈ సైట్‌కు JavaScript అవసరం. మీ బ్రౌజర్‌లో JavaScript‌ను ప్రారంభించి, పేజీని మళ్లీ లోడ్ చేయండి.</p>
  ... 2 more context line(s) omitted in this file
  284:         <p>เว็บไซต์นี้ต้องใช้ JavaScript โปรดเปิดใช้งาน JavaScript ในเบราว์เซอร์แล้วโหลดหน้าเว็บใหม่</p>
  ... 2 more context line(s) omitted in this file
  288:         <p>Bu site JavaScript gerektirir. Tarayıcınızda JavaScript'i etkinleştirip sayfayı yeniden yükleyin.</p>
  ... 2 more context line(s) omitted in this file
  292:         <p>Для роботи цього сайту потрібен JavaScript. Увімкніть JavaScript у браузері та перезавантажте сторінку.</p>
  ... 2 more context line(s) omitted in this file
  296:         <p>اس سائٹ کے لیے JavaScript ضروری ہے۔ اپنے براؤزر میں JavaScript فعال کریں اور صفحہ دوبارہ لوڈ کریں۔</p>
  ... 2 more context line(s) omitted in this file
  300:         <p>Bu sayt uchun JavaScript zarur. Brauzeringizda JavaScript-ni yoqing va sahifani qayta yuklang.</p>
  ... 2 more context line(s) omitted in this file
  304:         <p>Trang web này cần JavaScript. Hãy bật JavaScript trong trình duyệt rồi tải lại trang.</p>
  ... 2 more context line(s) omitted in this file
  308:         <p>Ojúlé yìí nílò JavaScript. Jọ̀wọ́ tan JavaScript nínú aṣàwákiri rẹ, kí o sì tún ojúewé náà ṣe.</p>
  ... 2 more context line(s) omitted in this file
  312:         <p>此网站需要 JavaScript。请在浏览器中启用 JavaScript，然后重新加载页面。</p>
  ... 2 more context line(s) omitted in this file
  316:         <p>Le sayithi idinga i-JavaScript. Vumela i-JavaScript esipheqululini sakho bese ulayisha kabusha ikhasi.</p>
  ... 1 more context line(s) omitted in this file

artifacts/cross-repo-native-qa/runtime/repo2-0/tests/Stage01Checks.elm (2 match(es)):
  339-     , check
  340:         "Sautján kótelettunöfn hafa nákvæma canonicalIndex-röð"
  341-         (indicesExactly 17 Catalog.cutletEntries)
  349-     , check
  350:         "Fryst kótelettuskrá hefur nákvæm íslensk heiti"
  351-         (cutletTexts == Fixtures.cutletTexts)

artifacts/cross-repo-native-qa/runtime/repo2-0/tests/BootstrapFixtures.elm (1 match(es)):
  33-     , "Palgúrasj"
  34:     , "papýrussef"
  35-     , "klasi"

docs/about/content/is.html (60 match(es)):
  13-   <h2>Úr hverju samanstendur Pastafari-dagsetning?</h2>
  14:   <p>Hún hefur <strong>nákvæmlega fimm hluta</strong>: árnúmer, nafn kótelettu, dag innan kótelettu, nafn mánaðar og dag innan mánaðar.</p>
  15:   <p>Almennt dæmi: <strong>ár 5000, kóteletta A, dagur 417 í kótelettunni, mánuður B, dagur 83 í mánuðinum.</strong></p>
  16-   <p>Aðgerðardagurinn, staðsetning athugandans, auðkenni dagsins á tímalínunni eða aðrar tæknilegar upplýsingar mega birtast við hlið dagsetningarinnar, en þær eru ekki sjötta dagsetningarreiturinn.</p><hr>
  21-   <p>Í venjulegum dagatölum er eðlilegt að hugsa sér að dagsetningin „tilheyri“ sjálfum deginum. Í Pastafari-dagatalinu ræðst dagsetningin af sambandi tveggja daga.</p>
  22:   <p>Að breyta <code>t</code> þýðir að spyrja um annan dag. Að breyta <code>c</code> getur haft miklu víðtækari áhrif: það getur breytt ársmörkum, kótelettum, mánuðum, nöfnum þeirra og því hvernig þeir fléttast saman.</p>
  23-   <p>Almanak sem reiknað er í dag þarf því ekki að vera rétt á morgun. Þetta forðar líka þeirri óþægilegu stöðu að prentað dagatal haldist gagnlegt heilt ár.</p><hr>
  58-   <p>daga. Þetta eru kanónísk mörk kerfisins, ekki reynslumeðaltöl.</p>
  59:   <p>Ár getur því verið styttra en sólarár eða lengra en fimmtán sólarár. Ársmörkin eru byggð úr kerfi <strong>hliða</strong>; mörk kótelettna koma úr sama kerfi.</p>
  60-   <p>Árslok þurfa hvorki að fylgja árstíð, einni umferð Jarðar um Sól né tunglhring, og þau þurfa heldur ekki að laga sig að þeirri hagnýtu ósk að árið fari nú loksins að klárast.</p><hr>
  64-   <h2>Kótelettur</h2>
  65:   <p>Hvert ár skiptist í <strong>6 til 17 kótelettur</strong>. Kóteletta er samfellt tímabil í tímaröð.</p>
  ... 36 more match(es) omitted in this file
  273:   <pre class="math-block" dir="ltr" tabindex="0"><code>(\text{kótelettunafn},\text{dagur í kótelettu})</code></pre>
  274-   <p>í mesta lagi einn dag. Sama gildir um</p>
  282-         <tr><td>Enginn reitur þekktur nema árið</td><td>5.778</td></tr>
  283:         <tr><td>Aðeins kótelettunafnið</td><td>5.568</td></tr>
  284:         <tr><td>Aðeins dagur í kótelettu</td><td>17</td></tr>
  285-         <tr><td>Aðeins mánaðarnafnið</td><td>123</td></tr>
  286-         <tr><td>Aðeins dagur í mánuði</td><td>47</td></tr>
  287:         <tr><td>Kótelettunafn + dagur í kótelettu</td><td>1</td></tr>
  288-         <tr><td>Mánaðarnafn + dagur í mánuði</td><td>1</td></tr>
  326-   <p>Það er determinískt dagatal þar sem dagsetningin er ekki bara fall af fyrirspurnardegi heldur <strong>sameiginlegt fall aðgerðardagsins og fyrirspurnardagsins</strong>.</p>
  327:   <p>Hver dagsetning hefur nákvæmlega fimm reiti. Núið er frá sínu eigin sjónarhorni alltaf í ári 5000, en ár 5000 sjálft færist með aðgerðardeginum. Ár geta verið mjög löng, kótelettur eru samfelldar, mánuðir ekki endilega, og ekkert kanónískt vikukerfi er til.</p>
  328-   <p>Dagur <code>n+1</code> í mánuði þarf ekki að vera á morgun. Sami dagur á tímalínunni getur fengið annað Pastafari-merki á morgun. Sama raunverulega augnablik getur á tveimur stöðum tilheyrt tveimur mismunandi staðbundnum Pastafari-dögum. Heilsdagsatburður þarf ekki að standa frá miðnætti til miðnættis. Og árlegur afmælisdagur er fyrst leitarvandamál og síðan dagatalsvandamál.</p>

artifacts/cross-repo-native-qa/runtime/repo2-0/tests/NormativeOracle.elm (2 match(es)):
  1772-             if x > maxX then
  1773:                 Debug.todo "Röð kótilettuskiptingar fór út fyrir löglegu fjölskylduna."
  1774- 
  2067-         |> List.head
  2068:         |> expectMaybe "Markdagurinn fannst ekki í neinni kótilettu."
  2069- 

artifacts/cross-repo-native-qa/runtime/repo2-0/DEVELOPMENT_STAGE.md (1 match(es)):
  6- EXPECTED_REPOSITORY_STATE=GREEN
  7: FOREIGN_LANGUAGE_USAGE=NONE
  8- IMPLEMENTATION_STARTED_FROM_ZERO=YES

artifacts/cross-repo-native-qa/runtime/repo2-0/SPAGHETTI_DEVELOPMENT_HISTORY.md (1 match(es)):
  6- 
  7: Verkefnið var stofnað frá auðu tré fyrir Elm og íslensku. Sjálfstæður nákvæmur heiltölukjarni var skrifaður í Elm, staðlaða viðmiðunarvélin var endurgerð beint úr innbyggða viðmiðinu og sérstök hrein Elm-prófunarumgjörð var búin til. `SourceLanguageCatalog` var frystur með 17 kótilettum og 47 mánuðum.
  8- 

docs/i18n/locales/is.js (24 match(es)):
  ... 1 more context line(s) omitted in this file
  14:     "app.intro": "Finndu dagsetningu í einu dagatalanna sem vefurinn styður. Þá sérðu fulla Pastafari-dagsetningu þess dags og kótelettuna sem hann tilheyrir.",
  ... 2 more context line(s) omitted in this file
  24:     "about.metaDescription": "Skýring á Pastafari-dagatalinu: aðgerðardagur og fyrirspurnardagur, ár, kótelettur, fléttaðir mánuðir, dagamörk og háþróuð kerfi.",
  25:     "about.intro": "Hvernig dagatalið sýnir daga, ár, kótelettur, fléttaða mánuði og aðgerðardaginn.",
  ... 2 more context line(s) omitted in this file
  58:     "comparison.summary": "Sýndir eru {count} dagar, frá fyrsta til síðasta dags kótelettunnar sem birtist í fyrri útreikningnum.",
  ... 2 more context line(s) omitted in this file
  108:     "loading.title": "Leitað að kótelettu og dagsetningu…",
  ... 2 more context line(s) omitted in this file
  115:     "calendar.toolbarAria": "Flakk milli kótelettna",
  116:     "calendar.previous": "Fyrri kóteletta",
  ... 1 more context line(s) omitted in this file
  118:     "calendar.next": "Næsta kóteletta",
  119:     "calendar.daysAria": "Dagar í kótelettunni {cutletName}",
  120:     "calendar.currentCutlet": "Ár {year} · kóteletta",
  ... 1 more context line(s) omitted in this file
  122:     "calendar.targetOutside": "Dagsetningin sem þú leitaðir að er ekki í kótelettunni sem nú er sýnd. Þú getur haldið áfram að fletta eða leitað að annarri dagsetningu.",
  ... 2 more context line(s) omitted in this file
  125:     "year.context": "Þessi uppbygging er reiknuð fyrir aðgerðardaginn {actionDate}. Ef aðgerðardeginum er breytt getur þurft að byggja ársmörk, kótelettur og mánuði upp að nýju.",
  ... 2 more context line(s) omitted in this file
  134:     "year.displayedCutletPosition": "Sýnda kótelettan nær yfir daga {start}–{end} ársins.",
  ... 1 more context line(s) omitted in this file
  136:     "year.monthExplainer": "Mánuðir fléttast óháð kótelettum í gegnum árið: mánuður er ekki undirdeild kótelettu og dagar hans geta birst í mörgum aðskildum runum. Lengd mánaðar er því heildarfjöldi daga sem honum er úthlutað, ekki endilega eitt samfellt tímabil.",
  ... 2 more context line(s) omitted in this file
  145:     "target.notInView": "Dagsetningin sem þú leitaðir að er enn varðveitt; kótelettan sem nú er sýnd er önnur.",
  146:     "date.aria": "Ár {year} frá sköpun heimsins, dagur {dayInCutlet} í kótelettunni {cutletName}, dagur {dayInMonth} í mánuðinum {monthName}",
  ... 1 more context line(s) omitted in this file
  148:     "date.cutletLine": "Dagur {dayInCutlet} í kótelettunni {cutletName}",
  ... 2 more context line(s) omitted in this file
  154:     "guide.1.body": "Um leið og tengillinn opnast ákvarðar vefurinn núverandi Pastafari-dag fyrir virka staðsetningu athugandans og sýnir kótelettuna sem hann tilheyrir. Dagamörkin eru staðsetningarháði tímapunkturinn þegar miðja Venusar fer um neðri hluta staðbundna hádegisbaugsins, eins og lýst er í ASTRONOMICAL-DAY.md; þau eru ekki borgaralegt miðnætti. Engin skráning eða innskráning er nauðsynleg og engin dagsetning er send á reikniþjón.",
  ... 2 more context line(s) omitted in this file
  158:     "guide.3.body": "Hver reitur hefur þrjár fastar línur: ár frá sköpun heimsins; númer dags í kótelettunni og nafn hennar; síðan dag í mánuðinum og nafn mánaðarins. Engin ein tala táknar alla dagsetninguna. Nafn mánaðarins ræður lit reitsins.",
  ... 1 more context line(s) omitted in this file
  160:     "guide.4.body": "„Fyrri kóteletta“ og „Næsta kóteletta“ fara í nágrannakótelettur. Aðrir dagareitir eru ekki hnappar, því ekki er hægt að framkvæma aðgerð með því að smella á þá. „Til baka í dag“ endurstillir bæði leitina og aðgerðardaginn á núverandi Pastafari-dag.",
  ... 2 more context line(s) omitted in this file
  166:     "guide.7.body": "Undir kótelettusýninni sýnir vefurinn uppbyggingu sýnda ársins: lengd og bil, hverja kótelettu og lengd hennar, og hvern mánuð. Fyrir mánuði sýnir hann einnig fjölda samfelldra runa og fyrstu og síðustu birtingu, svo fléttunin í gegnum árið verður sýnileg.",
  ... 2 more context line(s) omitted in this file
  180:     "reverse.field.dayInCutlet": "Dagur í kótelettu",
  ... 2 more context line(s) omitted in this file
  339:   "terminology": {
  ... 2 more context line(s) omitted in this file
  349:     "yearFiveThousand": "Ár fimm þúsund frá sköpun heimsins"
  ... 1 more context line(s) omitted in this file

artifacts/cross-repo-native-qa/runtime/repo2-0/STAGE_01_NORMATIVE_AUDIT.md (3 match(es)):
  30- 
  31: Fjöldi kóteletta er takmarkaður við 6..17 og ekki meiri en fjöldi hliðabila ársins. Skipting kóteletta er nákvæm lexíkógrafísk talning/opnun; ef aðgerðardagurinn er innra hlið verður það millimark skiptingarinnar. Nöfn eru valin sem hlutumraðanir án endurtekningar og innri merkingin er `canonicalIndex`.
  32- 
  36- 
  37: `calendarDateCanonical` skilar nákvæmlega fimm merkingarsviðum. `calendarDate` leysir aðeins kótilettu- og mánaðarvísitölur yfir í fryst íslensk heiti. Ekkert í `src/` flytur inn `NormativeOracle`, þannig að framleiðsluskelin getur ekki notað viðmiðunarvélina sem varaleið eða leiðréttingu.
  38- 
  39: Við úttektina fannst Elm-sértæk þýðingarvilla í eldri drögum: fjögurra og fimm staka tuple-gildi höfðu verið notuð í stuðlatöflum og í innra vali kótilettuskiptingar. Elm leyfir ekki slík tuple. Þau voru skipt út fyrir nafngreind record-gildi án merkingarbreytingar. Engin fjögurra eða fleiri staka tuple er eftir í Elm-kóðanum.
  40-
```

</details>


---

<sub>1m 19s</sub>

### `rg`

**textContent\s*=|setAttribute\(|data-i18n|innerHTML|\?\?|defaultValue|defaultWithLocale**

"textContent\s*=|setAttribute\(|data-i18n|innerHTML|\?\?|defaultValue|defaultWithLocale" (docs/app.js, docs/reverse-ui.js, docs/reverse-search-controller.js)

<details>
<summary>102 matches</summary>

```
[grep content: 98 matches across 3 file(s) under /home/runner/work/pastafari-calendar/pastafari-calendar/docs]

reverse-search-controller.js (5 match(es)):
  10:   const text = String(value ?? "").trim();
  34:   const cutlet = cutletById.get(String(input.cutletId ?? ""));
  35:   const month = monthById.get(String(input.monthId ?? ""));
  160:   const termination = String(result.termination ?? "");
  194:     const externalSignal = options.signal ?? null;

reverse-ui.js (45 match(es)):
  29:   if (text !== null) element.textContent = text;
  36:   element.textContent = text;
  68:   const text = String(value ?? "").trim();
  150:       const stored = values[field.name] ?? field.defaultValue ?? "";
  159:     this.help.textContent = definition.helpKey ? this.services.siteT(definition.helpKey) : "";
  173:       this.error.textContent = this.services.rt("reverse.error.input");
  182:     this.calendarLabelText.textContent = this.services.rt(this.labelKey);
  211:     this.inputs.year.value = String(values.year ?? "");
  212:     this.inputs.dayInCutlet.value = String(values.dayInCutlet ?? "");
  213:     this.inputs.dayInMonth.value = String(values.dayInMonth ?? "");
  253:       element.textContent = this.services.rt(element.dataset.reverseKey);
  335:     this.labelText.textContent = this.services.rt("reverse.variable.label");
  336:     this.domainText.textContent = this.services.rt("reverse.variable.domain");
  337:     this.removeButton.textContent = this.services.rt("reverse.action.remove");
  431:           initialJdn: preset?.calculationJdn ?? this.services.getActiveCalculationJdn(),
  485:         this.equals.value = preset?.equals ?? "";
  490:         this.min.value = preset?.min ?? "";
  491:         this.max.value = preset?.max ?? "";
  533:     this.removeButton.textContent = this.services.rt("reverse.action.remove");
  534:     this.typeText.textContent = this.services.rt("reverse.constraint.type");
  536:       element.textContent = this.services.rt(element.dataset.reverseKey);
  801:     this.status.setAttribute("role", "status");
  802:     this.status.setAttribute("aria-live", "polite");
  803:     this.status.setAttribute("aria-atomic", "true");
  807:     this.error.setAttribute("role", "alert");
  941:     this.status.textContent = this.rt("reverse.status.running");
  942:     this.progress.textContent = "";
  960:     this.progress.textContent = `${this.rt(phaseKey)} · ${this.rt("reverse.progress.scanned", { count: this.services.formatInteger(value.scanned) })}`;
  972:     this.status.textContent = this.rt(key, { count: this.services.formatInteger(classification.solutionCount) });
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

app.js (48 match(es)):
  286:       strong.textContent = value;
  331:   elements["target-marker"].textContent = t(markerKey);
  337:     line.textContent = t("target.notInView");
  357:   elements["cutlet-meta"].textContent = t("calendar.currentCutlet", { year: formatInteger(view.year) });
  358:   elements["cutlet-heading"].textContent = viewCutletName;
  359:   elements["cutlet-description"].textContent = t("calendar.cutletDescription", {
  363:   elements["calendar-grid"].setAttribute("aria-label", t("calendar.daysAria", { cutletName: viewCutletName }));
  377:     card.setAttribute("aria-label", dateAria(day));
  386:       card.setAttribute("aria-current", "date");
  389:       badge.textContent = t(state.targetFollowsCurrentDay ? "target.today" : "target.searched");
  418:   locationButton.textContent = t("location.useDevice");
  434:   elements["year-overview-heading"].textContent = t("year.heading", { year: formatInteger(view.year) });
  435:   elements["year-overview-context"].textContent = t("year.context", {
  448:   heading.textContent = title;
  450:   details.textContent = meta;
  458:   elements["year-overview-heading"].textContent = t("year.heading", { year: formatInteger(structure.year) });
  459:   elements["year-overview-context"].textContent = t("year.context", {
  462:   elements["year-length"].textContent = t("year.daysValue", { count: formatInteger(structure.length) });
  463:   elements["year-cutlet-count"].textContent = formatInteger(structure.cutletCount);
  464:   elements["year-month-count"].textContent = formatInteger(structure.monthCount);
  465:   elements["year-range"].textContent = t("year.rangeValue", {
  471:   elements["year-cutlet-position"].textContent = displayedCutlet
  481:     elements["year-target-position"].textContent = t("year.targetPosition", {
  487:   elements["year-cutlets-summary"].textContent = t("year.cutletsSummary", {
  505:   elements["year-months-summary"].textContent = t("year.monthsSummary", {
  529:   elements["year-overview-heading"].textContent = t("year.heading", { year: formatInteger(view.year) });
  530:   elements["year-overview-context"].textContent = t("year.context", {
  536:   elements["year-overview-error"].textContent = t("year.error");
  567:   cell.setAttribute("aria-label", dateAria(day));
  579:   elements["comparison-primary-heading"].textContent = t("comparison.actionHeading", {
  582:   elements["comparison-secondary-heading"].textContent = t("comparison.actionHeading", {
  585:   elements["comparison-summary"].textContent = t("comparison.summary", {
  602:       row.setAttribute("aria-current", "date");
  608:     civil.textContent = formatJdnAsGregorian(primary.jdn);
  610:     sequence.textContent = t("reverse.result.jdn", { jdn: primary.jdn.toString() });
  663:     .find((element) => element === document.activeElement) ?? null;
  694:   elements["error-message"].textContent = t(key);
  703:     option.textContent = t(definition.labelKey);
  710: function defaultValuesFor(calendarId, jdn) {
  726:   const defaults = jdn !== null ? defaultValuesFor(definition.id, jdn) : {};
  733:     labelText.textContent = t(field.labelKey);
  745:         option.textContent = choice.labelKey ? t(choice.labelKey) : choice.label;
  764:     const stored = previousValues[field.name] ?? defaults[field.name] ?? field.defaultValue ?? "";
  773:   configuration.help.textContent = definition.helpKey ? t(definition.helpKey) : "";
  799:   configuration.error.textContent = t(configuration.errorKey);
  850:     viewAnchorJdn: readBigIntParameter(params, "v") ?? targetJdn,
  852:     comparisonJdn: comparisonParameter ?? calculationJdn + 1n,
  899:     elements["error-message"].textContent = t(lastVisibleErrorKey);
```

</details>


---

<sub>1m 19s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/tests/Stage01Checks.elm.**

/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/tests/Stage01Checks.elm (lines 350-455)

<details>
<summary>91 lines</summary>

```
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

<sub>1m 19s</sub>

### `rg`

**id="[^"]+"|<h[123]|<p>|TODO|FIXME|English|Hebrew|Hebresk|prototype|móður|mál**

"id="[^"]+"|<h[123]|<p>|TODO|FIXME|English|Hebrew|Hebresk|prototype|móður|mál" (docs/about/content/is.html)

<details>
<summary>102 matches</summary>

```
[grep content: 100 matches across 1 file(s) under /home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content]

is.html (100 match(es)):
  1: <!-- Íslenska útgáfan er skrifuð beint út frá hebreska semantic master; ekkert millimál er notað. -->
  3: <div class="about-section about-lead" id="about-calendar">
  4:   <p>Í frásögn þessa vefs er Pastafari-dagatalið sett fram sem dagatalið þar sem tíminn sjálfur varð til. Hvernig það virkar er þó skilgreint með ströngum og nákvæmum reglum.</p>
  5:   <p>Dagatalið úthlutar ekki hverjum degi föstu, óbreytanlegu Pastafari-merki. Til að reikna dagsetningu þarf að tilgreina tvo daga: <strong>aðgerðardaginn</strong>, sem útreikningurinn hefst frá, og <strong>fyrirspurnardaginn</strong>, sem spurt er um.</p>
  6:   <p>Ef við táknum aðgerðardaginn með <code>c</code> og fyrirspurnardaginn með <code>t</code>, er dagsetningin</p>
  8:   <p>en ekki <code>F(t)</code>. Sami fyrirspurnardagur getur því fengið aðra Pastafari-dagsetningu þegar aðgerðardagurinn breytist.</p>
  9:   <p>Þetta er ekki villa. Dagatalið er skilgreint einmitt svona.</p><hr>
  12: <section class="about-section" id="date-parts" data-toc-section data-toc-level="2">
  13:   <h2>Úr hverju samanstendur Pastafari-dagsetning?</h2>
  14:   <p>Hún hefur <strong>nákvæmlega fimm hluta</strong>: árnúmer, nafn kótelettu, dag innan kótelettu, nafn mánaðar og dag innan mánaðar.</p>
  15:   <p>Almennt dæmi: <strong>ár 5000, kóteletta A, dagur 417 í kótelettunni, mánuður B, dagur 83 í mánuðinum.</strong></p>
  16:   <p>Aðgerðardagurinn, staðsetning athugandans, auðkenni dagsins á tímalínunni eða aðrar tæknilegar upplýsingar mega birtast við hlið dagsetningarinnar, en þær eru ekki sjötta dagsetningarreiturinn.</p><hr>
  19: <section class="about-section" id="working-day" data-toc-section data-toc-level="2">
  20:   <h2>Af hverju þarf aðgerðardag?</h2>
  21:   <p>Í venjulegum dagatölum er eðlilegt að hugsa sér að dagsetningin „tilheyri“ sjálfum deginum. Í Pastafari-dagatalinu ræðst dagsetningin af sambandi tveggja daga.</p>
  22:   <p>Að breyta <code>t</code> þýðir að spyrja um annan dag. Að breyta <code>c</code> getur haft miklu víðtækari áhrif: það getur breytt ársmörkum, kótelettum, mánuðum, nöfnum þeirra og því hvernig þeir fléttast saman.</p>
  23:   <p>Almanak sem reiknað er í dag þarf því ekki að vera rétt á morgun. Þetta forðar líka þeirri óþægilegu stöðu að prentað dagatal haldist gagnlegt heilt ár.</p><hr>
  26: <section class="about-section" id="day-identity" data-toc-section data-toc-level="2">
  27:   <h2>Sami dagur, önnur dagsetning</h2>
  28:   <p>Greina þarf á milli <strong>auðkennis dagsins</strong> og <strong>Pastafari-framsetningar hans</strong>. Hið fyrra er fastur staður tiltekins dags á tímalínunni; Pastafari-framsetningin felur hins vegar í sér þau fimm gildi sem fást þegar dagurinn er sýndur undir tilteknum aðgerðardegi.</p>
  29:   <p>Í vörunni og API-viðmótinu má kalla hið fyrra <code>day-id</code>: fast auðkenni dags á tímalínunni sem breytist ekki þótt framsetningin breytist. Hins vegar þurfa</p>
  31:   <p>og</p>
  33:   <p>ekki að vera jöfn.</p>
  34:   <p>Því getur handvirk breyting á aðgerðardegi breytt Pastafari-dagsetningunni sem sýnd er fyrir sama dag, án þess að dagurinn sjálfur færist nokkuð á tímalínunni.</p>
  35:   <p>Sama regla gildir um atburði. Fundur, fæðing eða sögulegur atburður ætti að vera tengdur föstu auðkenni á tímalínunni; Pastafari-dagsetningu hans má endurreikna eftir birtingarsamhengi.</p>
  36:   <p>Merkingin getur breyst. Atburðurinn ekki.</p><hr>
  39: <section class="about-section" id="year-5000" data-toc-section data-toc-level="2">
  40:   <h2>Ár 5000</h2>
  41:   <p>Þegar aðgerðardagurinn og fyrirspurnardagurinn eru sami dagur,</p>
  43:   <p>er árnúmerið alltaf</p>
  45:   <p>Með öðrum orðum: núið er, séð frá sjálfu sér, alltaf innan árs 5000. En ár 5000 er ekki fast sögulegt tímabil; það er valið upp á nýtt í hvert sinn miðað við aðgerðardaginn.</p>
  46:   <p>Aðgerðardagurinn sjálfur er einnig innan árs 5000, eins og aðrir dagar sama valda árs. Því <strong>sannar það eitt að dagur sé í ári 5000 ekki að <code>t=c</code>.</strong></p>
  47:   <p>Árnúmerið sýnir þó stefnuna:</p>
  49:   <p>og</p>
  51:   <p>Það er líka til <strong>ár 0</strong>; lengra aftur í fortíðinni koma ár með neikvæðum númerum.</p><hr>
  54: <section class="about-section" id="years-and-gates" data-toc-section data-toc-level="2">
  55:   <h2>Ár og hlið</h2>
  56:   <p>Pastafari-ár getur haft</p>
  58:   <p>daga. Þetta eru kanónísk mörk kerfisins, ekki reynslumeðaltöl.</p>
  59:   <p>Ár getur því verið styttra en sólarár eða lengra en fimmtán sólarár. Ársmörkin eru byggð úr kerfi <strong>hliða</strong>; mörk kótelettna koma úr sama kerfi.</p>
  60:   <p>Árslok þurfa hvorki að fylgja árstíð, einni umferð Jarðar um Sól né tunglhring, og þau þurfa heldur ekki að laga sig að þeirri hagnýtu ósk að árið fari nú loksins að klárast.</p><hr>
  63: <section class="about-section" id="cutlets" data-toc-section data-toc-level="2">
  64:   <h2>Kótelettur</h2>
  65:   <p>Hvert ár skiptist í <strong>6 til 17 kótelettur</strong>. Kóteletta er samfellt tímabil í tímaröð.</p>
  66:   <p>Ef dagur 250 í kótelettu er í dag, verður dagur 251 í sömu kótelettu á morgun, nema í dag sé síðasti dagur hennar. Mörk kótelettna eru hlið og kóteletta varir að minnsta kosti</p>
  68:   <p>daga.</p>
  69:   <p>Kerfið hefur 17 kanónísk kótelettunöfn og sama nafn endurtekur sig ekki innan sama árs. Nafnið ákvarðar hvorki lengd né staðsetningu kótelettunnar.</p><hr>
  72: <section class="about-section" id="months-and-weaving" data-toc-section data-toc-level="2">
  73:   <h2>Mánuðir og fléttun</h2>
  74:   <p>Hvert ár hefur</p>
  76:   <p>byggingarmánuði og hverjum mánuði er úthlutað</p>
  78:   <p>dögum.</p>
  79:   <p>En Pastafari-mánuður <strong>þarf ekki að vera samfellt tímabil</strong>. Tímaröðin gæti til dæmis verið:</p>
  80:   <blockquote><p>Mánuður A — dagur 14<br>Mánuður B — dagur 9<br>Mánuður A — dagur 15</p></blockquote>
  81:   <p>Þetta er fullkomlega gilt. Dagur 15 í mánuði A er næsti dagur <strong>þess mánaðar</strong>, jafnvel þótt dagur úr öðrum mánuði sé á milli.</p>
  82:   <p>„Dagur í mánuði“ segir því ekki hversu margir dagar á tímalínunni hafa liðið frá fyrstu birtingu mánaðarins. Þetta er raðnúmer meðal þeirra daga sem úthlutað er mánuðinum á árinu. Dagur 48 merkir 48. daginn sem tilheyrir mánuðinum, ekki 47 dögum eftir fyrstu birtingu hans.</p><hr>
  85: <section class="about-section" id="month-interleaving" data-toc-section data-toc-level="2">
  86:   <h2>Mánuðir fléttast saman</h2>
  87:   <p>Hugsa má mánuðina sem þræði sem liggja í gegnum árið. Hver dagur tilheyrir nákvæmlega einum mánuði; morgundagurinn getur tilheyrt öðrum mánuði, og síðar getur fyrri mánuðurinn komið aftur og haldið áfram með næsta númeri.</p>
  88:   <p>Fléttunin hefur reglur, þar á meðal takmarkanir á röð fyrstu og síðustu birtinga mánaða. En engin krafa er um að einn mánuður ljúki áður en annar byrjar.</p>
  93:   <p>Einn mánuður getur farið í gegnum margar kótelettur, og innan einnar kótelettu geta margir mánuðir birst. Upphaf og endir kerfanna tveggja þurfa ekki að falla saman.</p><hr>
  96: <section class="about-section" id="next-day-in-month" data-toc-section data-toc-level="2">
  97:   <h2>Næsti dagur mánaðarins er ekki endilega á morgun</h2>
  98:   <p>Ef í dag er dagur 17 í tilteknum mánuði, þá er dagur 18 í sama mánuði <strong>næsta birting þess mánaðar</strong>. Hún getur verið á morgun eða miklu síðar.</p>
  99:   <p><strong>Á morgun</strong> er næsti dagur á tímalínunni; <strong>næsti dagur mánaðarins</strong> er næsta birting sama mánaðar.</p>
  100:   <p>Sömuleiðis þýðir „lok mánaðar“ ekki að lokin séu nálægt í tíma. Mánuður með 120 daga getur verið á degi 119 í dag og dagur 120 komið miklu síðar innan sama árs.</p><hr>
  103: <section class="about-section" id="no-weeks" data-toc-section data-toc-level="2">
  104:   <h2>Ekkert vikukerfi</h2>
  105:   <p>Núverandi kanóníska forskrift <strong>skilgreinir ekkert vikukerfi</strong>. Engin kanónísk sjö daga eining er til, engin Pastafari-nöfn á vikudögum og engin regla sem gerir tvo daga að „sama vikudegi“.</p>
  106:   <p>Auðvitað má leggja borgaralegt vikukerfi utan á; það er einfaldlega ekki hluti af Pastafari-dagsetningunni.</p><hr>
  109: <section class="about-section" id="canonical-names" data-toc-section data-toc-level="2">
  110:   <h2>Nöfn</h2>
  111:   <p>Það eru 17 kanónísk kótelettunöfn og 47 kanónísk mánaðarnöfn. Innan eins árs birtist hvert nafn í sínum flokki í mesta lagi einu sinni.</p>
  112:   <p>Auðkenni nafnsins er kanónískt og merkingarbært; það er ekki niðurstaða atkvæðagreiðslu milli mismunandi stafsetninga, þýðinga eða útfærslna. Um merkingu nafnanna hefur hebreska Megillah hæsta vald; þýðingar og umritanir eru aðeins birtingarlög.</p>
  113:   <p>Nafnið er heldur ekki falinn lengdarkóði. Nafn tiltekinnar kótelettu eða mánaðar gerir eininguna ekki sjálfkrafa lengri eða styttri.</p><hr>
  116: <section class="about-section" id="month-day-pairs" data-toc-section data-toc-level="2">
  117:   <h2>Lítil staðreynd um mánuði</h2>
  118:   <p>Það eru 47 mánaðarnöfn og mánuður getur mest náð degi 123. Fjöldi setningafræðilega mögulegra para af gerðinni „mánaðarnafn + dagnúmer í mánuði“ er því</p>
  120:   <p>Hver dagur ársins gerir nákvæmlega eitt slíkt par raunverulegt. Ef lengd ársins er <code>L</code>, birtast nákvæmlega <code>L</code> pör. Þar sem</p>
  122:   <p>verður hvert ár að skilja eftir að minnsta kosti</p>
  124:   <p>möguleg pör ónotuð. Jafnvel lengsta árið hefur ekki nógu marga daga til að nota þau öll.</p><hr>
  127: <section class="about-section" id="calculation" data-toc-section data-toc-level="2">
  128:   <h2>Hvernig er dagatalið reiknað?</h2>
  129:   <p>Innri útreikninginn köllum við hér <strong>sósuna</strong>. Í miðju hans er frumtalan</p>
  131:   <p>Ferlið felur í sér fimm inntaksteljara, 7 falda dropa, 46 sýnilega dropa, 6 skálar, breytilega röð skálanna, 12 lokablöndur, innsigli fyrir mismunandi svör, samsetningarval, smíði hliða, val ára, skiptingu kótelettna, val nafna, smíði mánaða og fléttun mánaðardaga.</p>
  132:   <p>Lokauppfærslurnar eru <strong>samhliða</strong>: í hverri blöndu eru öll sex nýju gildin reiknuð úr sama gamla ástandinu og aðeins síðan eru allar sex skálarnar uppfærðar í einu.</p>
  133:   <p>Í 12 lokablöndunum er eitt sérstaklega mikilvægt kanónískt atriði. Ef <code>S</code> er summa sex gömlu skálanna og <code>r</code> er númer blöndunnar, reiknar kerfið</p>
  135:   <p><code>R</code> er <strong>vistaða summan</strong>. Bæði val á skálaröð og innri uppfærsla blöndunnar nota <code>R</code>, ekki hráu summuna <code>S</code>.</p>
  136:   <p>Eldri útgáfur sem sendu hráu summuna inn í þessa uppfærslu lýsa ekki lengur núverandi kanónískri merkingarfræði. Dæmi sem byggja á gömlu reglunni ætti að telja úrelt þar til þau hafa verið staðfest aftur.</p>
  137:   <p>Eftir blöndurnar heldur svarahringurinn einnig áfram röðinni sem var læst við 46. sýnilega dropann; henni á ekki sjálfkrafa að skipta út fyrir röð síðustu blöndunnar.</p><hr>
  140: <section class="about-section" id="short-and-wide-choice" data-toc-section data-toc-level="2">
  141:   <h2>Stutt val (Short Choice) og vítt val (Wide Choice)</h2>
  142:   <p>Fyrir tiltölulega lítil valrúm er <strong>stutt val</strong> notað. Það notar úrtak með höfnun til að forðast skekkju sem einföld módúlóaðgerð gæti annars valdið.</p>
  143:   <p>Fyrir mjög stór valrúm er <strong>vítt val</strong> notað. Ekki má eigna því eiginleika sem forskriftin tryggir ekki.</p>
  144:   <p>Vítt val jafngildir ekki því að mynda óháða og jafnt dreifða tölustafi í <code>Q</code>-grunni þar til vísi fæst. Því leiðir ekki af þessu að hvert gilt val verði endilega að hafa sömu jákvæðu líkur. Í nógu stórum valrýmum geta verið gild val sem þetta kerfi nær aldrei til.</p>
  145:   <p>Dagatalið sjálft er áfram fullkomlega determinískt. „Choice“ er heiti á þrepi reikniritsins, ekki slembiútdráttur við notkun.</p><hr>
  148: <section class="about-section" id="structural-atlas" data-toc-section data-toc-level="2">
  149:   <h2>Byggingaratlas</h2>
  150:   <p>Hingað til höfum við talað um reglur dagatalsins. Næstu tölur eru annars konar upplýsingar: <strong>reynsluniðurstöður</strong> úr stóru reikniúrtaki.</p>
  151:   <p>Atlasinn var reiknaður út með þeirri útgáfu vélarinnar sem auðkennd er með <code>8e155fa4198ea7bcfeb16138ac5d6662706f4d93</code> og innihélt 4.096 aðgerðardaga; árin 4990–5010 fyrir hvern þeirra; 86.016 ársbyggingar; 625.437 kótelettur; 3.535.422 byggingarmánuði; meira en 356 milljónir samfelldra mánaðarkafla; og meira en 364 milljónir færslna frá degi <code>n</code> í dag <code>n+1</code> í sama mánuði.</p>
```

</details>


---

<sub>1m 34s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/registry.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/registry.js (lines 140-260)

<details>
<summary>102 lines</summary>

```
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
```

</details>


---

<sub>1m 34s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/no-js/index.html.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/no-js/index.html (lines 145-172)

```
      </details>
      <details data-locale="hu" lang="hu-HU" dir="ltr">
        <summary>Magyar</summary>
        <p>Ehhez a webhelyhez JavaScript szükséges. Engedélyezze a JavaScriptet a böngészőben, majd töltse újra az oldalt.</p>
      </details>
      <details data-locale="hy" lang="hy-AM" dir="ltr">
        <summary>Հայերեն</summary>
        <p>Այս կայքի համար անհրաժեշտ է JavaScript։ Միացրեք JavaScript-ը ձեր դիտարկիչում և վերաբեռնեք էջը։</p>
      </details>
      <details data-locale="id" lang="id-ID" dir="ltr">
        <summary>Bahasa Indonesia</summary>
        <p>Situs ini memerlukan JavaScript. Aktifkan JavaScript di browser Anda lalu muat ulang halaman.</p>
      </details>
      <details data-locale="is" lang="is-IS" dir="ltr">
        <summary>Íslenska</summary>
        <p>Þessi vefur krefst JavaScript. Virkjaðu JavaScript í vafranum þínum og endurhladdu síðan síðuna.</p>
      </details>
      <details data-locale="it" lang="it-IT" dir="ltr">
        <summary>Italiano</summary>
        <p>Questo sito richiede JavaScript. Abilita JavaScript nel browser e ricarica la pagina.</p>
      </details>
      <details data-locale="ja" lang="ja-JP" dir="ltr">
        <summary>日本語</summary>
        <p>このサイトではJavaScriptが必要です。ブラウザーでJavaScriptを有効にして、ページを再読み込みしてください。</p>
      </details>
      <details data-locale="jv" lang="jv-ID" dir="ltr">
        <summary>Basa Jawa</summary>
        <p>Situs iki mbutuhake JavaScript. Aktifna JavaScript ing browser banjur muat maneh kaca iki.</p>
```


---

<sub>1m 34s</sub>

### `rg`

**kótilett|Papýrussef|papýrusstör|síðan síðuna|Úr hverju samanstendur|semantically|hebre[sí]|day-id|setningafræðilega|almanak|deep-link contract|semantic master**

"kótilett|Papýrussef|papýrusstör|síðan síðuna|Úr hverju samanstendur|semantically|hebre[sí]|day-id|setningafræðilega|almanak|deep-link contract|semantic master" (docs/i18n/locales/is.js, docs/about/content/is.html, docs/no-js/index.html, artifacts/cross-repo-native-qa/runtime/repo2-0)

<details>
<summary>23 matches</summary>

```
[grep content: 18 matches across 8 file(s) under /home/runner/work/pastafari-calendar/pastafari-calendar]
artifacts/cross-repo-native-qa/runtime/repo2-0/SOURCE_LANGUAGE_CATALOG.md:7: Merkingarbær almenn orð eru þýdd eftir merkingu. Heilir orðasambandsliðir, þar á meðal brot, eru varðveittir sem eitt nafn og þýddir sem eðlilegt íslenskt orðasamband. Staðanöfn nota viðurkennda latneska eða íslenska ritmynd þegar hún er til. Tilbúin hljóðnöfn fá ákveðna og endurtekningarhæfa yfirfærslu: hebreska sj-hljóðið er ritað `sj`; önnur samhljóð fá næsta íslenskt-læsilega hljóðgildi; greinileg sérhljóð úr frumritinu eru varðveitt; engin merking er búin til.
artifacts/cross-repo-native-qa/runtime/repo2-0/README.md:13: Öll merkingarbær nöfn eru þýdd eftir merkingu. Staðanöfn og tilbúin nöfn eru meðhöndluð sem sérnöfn. Fyrir tilbúin hebresk hljóðnöfn er eftirfarandi regla fryst: samhljóð eru yfirfærð í næsta íslenskt eða íslenskt-læsilegt hljóðgildi, hebreska sj-hljóðið er ritað `sj`, greinileg sérhljóð úr punktun eru varðveitt með íslenskri lengdarmerkingu þegar það á við og engin ný merking er búin til. Því verða tilbúnu nöfnin hér `Palgúrasj` og `Karsjúmav`.
docs/no-js/index.html:160:         <p>Þessi vefur krefst JavaScript. Virkjaðu JavaScript í vafranum þínum og endurhladdu síðan síðuna.</p>

docs/about/content/is.html (7 match(es)):
  1: <!-- Íslenska útgáfan er skrifuð beint út frá hebreska semantic master; ekkert millimál er notað. -->
  2: <!-- Section-ID eru hluti af stöðugum opinberum deep-link contract og eru ekki leidd af þýddum fyrirsögnum. -->
  13:   <h2>Úr hverju samanstendur Pastafari-dagsetning?</h2>
  26: <section class="about-section" id="day-identity" data-toc-section data-toc-level="2">
  29:   <p>Í vörunni og API-viðmótinu má kalla hið fyrra <code>day-id</code>: fast auðkenni dags á tímalínunni sem breytist ekki þótt framsetningin breytist. Hins vegar þurfa</p>
  112:   <p>Auðkenni nafnsins er kanónískt og merkingarbært; það er ekki niðurstaða atkvæðagreiðslu milli mismunandi stafsetninga, þýðinga eða útfærslna. Um merkingu nafnanna hefur hebreska Megillah hæsta vald; þýðingar og umritanir eru aðeins birtingarlög.</p>
  118:   <p>Það eru 47 mánaðarnöfn og mánuður getur mest náð degi 123. Fjöldi setningafræðilega mögulegra para af gerðinni „mánaðarnafn + dagnúmer í mánuði“ er því</p>
artifacts/cross-repo-native-qa/runtime/repo2-0/SPAGHETTI_DEVELOPMENT_HISTORY.md:7: Verkefnið var stofnað frá auðu tré fyrir Elm og íslensku. Sjálfstæður nákvæmur heiltölukjarni var skrifaður í Elm, staðlaða viðmiðunarvélin var endurgerð beint úr innbyggða viðmiðinu og sérstök hrein Elm-prófunarumgjörð var búin til. `SourceLanguageCatalog` var frystur með 17 kótilettum og 47 mánuðum.

docs/i18n/locales/is.js (3 match(es)):
  30:     "about.fallbackNotice": "Skýringin er ekki tiltæk á völdu tungumáli; hebreska útgáfan er sýnd í staðinn.",
  100:     "calendarHelp.hebrew": "Mánuðir eru valdir eftir nafni. Ár og dag má slá inn með tugatölustöfum eða hebreskum talnastöfum, til dæmis תשפ״ו eða י״ד; ef ár er ritað með hebreskum talnastöfum án þúsundamerkis er 5.000 bætt við það.",
  156:     "guide.2.body": "Undir „Hvaða dag viltu finna?“ velurðu dagatal, fyllir út reitina og velur „Sýna dagsetningu“. Valkostirnir fela í sér gregorískt, hebreskt, júlíanskt, íslamskt, persneskt, kínverskt, hindú, saka, taílenskt, eþíópískt, koptískt, japanskt, minguo og bahá’í dagatal, auk langtals Maya.",

artifacts/cross-repo-native-qa/runtime/repo2-0/STAGE_01_NORMATIVE_AUDIT.md (2 match(es)):
  37: `calendarDateCanonical` skilar nákvæmlega fimm merkingarsviðum. `calendarDate` leysir aðeins kótilettu- og mánaðarvísitölur yfir í fryst íslensk heiti. Ekkert í `src/` flytur inn `NormativeOracle`, þannig að framleiðsluskelin getur ekki notað viðmiðunarvélina sem varaleið eða leiðréttingu.
  39: Við úttektina fannst Elm-sértæk þýðingarvilla í eldri drögum: fjögurra og fimm staka tuple-gildi höfðu verið notuð í stuðlatöflum og í innra vali kótilettuskiptingar. Elm leyfir ekki slík tuple. Þau voru skipt út fyrir nafngreind record-gildi án merkingarbreytingar. Engin fjögurra eða fleiri staka tuple er eftir í Elm-kóðanum.

artifacts/cross-repo-native-qa/runtime/repo2-0/tests/NormativeOracle.elm (2 match(es)):
  1773:                 Debug.todo "Röð kótilettuskiptingar fór út fyrir löglegu fjölskylduna."
  2068:         |> expectMaybe "Markdagurinn fannst ekki í neinni kótilettu."
```

</details>


---

<sub>1m 34s</sub>

### `rg`

**kótilett|Papýrussef|papýrusstör**

"kótilett|Papýrussef|papýrusstör" (artifacts/cross-repo-native-qa/runtime/repo2-0)

```
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/SPAGHETTI_DEVELOPMENT_HISTORY.md:7:Verkefnið var stofnað frá auðu tré fyrir Elm og íslensku. Sjálfstæður nákvæmur heiltölukjarni var skrifaður í Elm, staðlaða viðmiðunarvélin var endurgerð beint úr innbyggða viðmiðinu og sérstök hrein Elm-prófunarumgjörð var búin til. `SourceLanguageCatalog` var frystur með 17 kótilettum og 47 mánuðum.
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/STAGE_01_NORMATIVE_AUDIT.md:37:`calendarDateCanonical` skilar nákvæmlega fimm merkingarsviðum. `calendarDate` leysir aðeins kótilettu- og mánaðarvísitölur yfir í fryst íslensk heiti. Ekkert í `src/` flytur inn `NormativeOracle`, þannig að framleiðsluskelin getur ekki notað viðmiðunarvélina sem varaleið eða leiðréttingu.
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/STAGE_01_NORMATIVE_AUDIT.md:39:Við úttektina fannst Elm-sértæk þýðingarvilla í eldri drögum: fjögurra og fimm staka tuple-gildi höfðu verið notuð í stuðlatöflum og í innra vali kótilettuskiptingar. Elm leyfir ekki slík tuple. Þau voru skipt út fyrir nafngreind record-gildi án merkingarbreytingar. Engin fjögurra eða fleiri staka tuple er eftir í Elm-kóðanum.
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/tests/NormativeOracle.elm:1773:                Debug.todo "Röð kótilettuskiptingar fór út fyrir löglegu fjölskylduna."
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/tests/NormativeOracle.elm:2068:        |> expectMaybe "Markdagurinn fannst ekki í neinni kótilettu."
```


---

<sub>1m 53s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/registry.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/registry.js (lines 250-370)

<details>
<summary>104 lines</summary>

```
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
```

</details>


---

<sub>1m 53s</sub>

### `rg`

**ARTICLE_FALLBACK_LOCALE|function translate|validateLocaleResourceShape|message**

"ARTICLE_FALLBACK_LOCALE|function translate|validateLocaleResourceShape|message" (docs/i18n/registry.js, docs/about/content/registry.js)

<details>
<summary>33 matches</summary>

```
[grep content: 30 matches across 2 file(s) under /home/runner/work/pastafari-calendar/pastafari-calendar/docs]

about/content/registry.js (2 match(es)):
  3: export const ARTICLE_FALLBACK_LOCALE = "he";
  445:   return ARTICLE_LOCALES[code] ?? ARTICLE_LOCALES[ARTICLE_FALLBACK_LOCALE];

i18n/registry.js (28 match(es)):
  253: function validateLocaleResourceShape(resource, localeCode) {
  254:   assertOptionalRecord(resource, "messages", localeCode, "messages");
  265:     messages: ownRecord(resource?.messages),
  275:     messages: Object.keys(groups.messages).sort(),
  298: function messagePlaceholders(template) {
  306: function validateMessagePlaceholders(localeCode, messages, englishMessages) {
  307:   for (const [key, value] of Object.entries(messages)) {
  310:     const expected = messagePlaceholders(baseline);
  311:     const actual = messagePlaceholders(value);
  329:   validateLocaleResourceShape(resource, metadata.code);
  330:   validateLocaleResourceShape(englishBaseline, DEFAULT_LOCALE);
  341:   validateMessagePlaceholders(metadata.code, groups.messages, localGroups(englishBaseline).messages);
  343:   const requiredManifestMessages = ALWAYS_LOCAL_MESSAGE_KEYS.filter((key) => expected.messages.includes(key));
  344:   const missingManifestMessages = missingKeys(groups.messages, requiredManifestMessages);
  346:     throw new RangeError(`Locale ${metadata.code} must define manifest-bound messages locally: ${missingManifestMessages.join(", ")}.`);
  368:     messages: mergeGroup(fallback.messages, local.messages),
  411: export function messageTemplate(locale, key) {
  412:   const template = locale?.messages?.[key];
  417: export function translate(locale, key, values = {}) {
  418:   return messageTemplate(locale, key).replace(MESSAGE_PLACEHOLDER_PATTERN, (match, name) => {
  436:   "messages.app.brand",
  437:   "messages.manifest.shortName",
  438:   "messages.manifest.defaultDescription",
  439:   "messages.reverse.error.limitPositive",
  440:   "messages.reverse.error.limitSafeInteger",
  441:   "messages.reverse.error.absoluteDateField",
  497:       messages: analyzeGroup(groups.messages, englishGroups.messages, "messages", { checkEnglishLeakage: metadata.code !== DEFAULT_LOCALE }),
  509:     const coreGroupsPresent = ["messages", "terminology", "cutlets", "months"].every((name) => resourceGroups[name].local > 0);
```

</details>


---

<sub>1m 53s</sub>

### `rg`

**"papyrusSedge"|"app.title"|"about.title"|"calendarHelp.hebrew"|"meta.description"|"reverse.basic.toAdvancedHelp"|"guide.1.body"|"guide.2.body"**

""papyrusSedge"|"app.title"|"about.title"|"calendarHelp.hebrew"|"meta.description"|"reverse.basic.toAdvancedHelp"|"guide.1.body"|"guide.2.body"" (docs/i18n/locales/is.js)

<details>
<summary>8 matches</summary>

```
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js:9:    "meta.description": "Pastafari-dagatal með dagsetningarleit og samanburði.",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js:12:    "app.title": "Pastafari-dagatal",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js:23:    "about.title": "Um Pastafari-dagatalið",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js:100:    "calendarHelp.hebrew": "Mánuðir eru valdir eftir nafni. Ár og dag má slá inn með tugatölustöfum eða hebreskum talnastöfum, til dæmis תשפ״ו eða י״ד; ef ár er ritað með hebreskum talnastöfum án þúsundamerkis er 5.000 bætt við það.",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js:154:    "guide.1.body": "Um leið og tengillinn opnast ákvarðar vefurinn núverandi Pastafari-dag fyrir virka staðsetningu athugandans og sýnir kótelettuna sem hann tilheyrir. Dagamörkin eru staðsetningarháði tímapunkturinn þegar miðja Venusar fer um neðri hluta staðbundna hádegisbaugsins, eins og lýst er í ASTRONOMICAL-DAY.md; þau eru ekki borgaralegt miðnætti. Engin skráning eða innskráning er nauðsynleg og engin dagsetning er send á reikniþjón.",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js:156:    "guide.2.body": "Undir „Hvaða dag viltu finna?“ velurðu dagatal, fyllir út reitina og velur „Sýna dagsetningu“. Valkostirnir fela í sér gregorískt, hebreskt, júlíanskt, íslamskt, persneskt, kínverskt, hindú, saka, taílenskt, eþíópískt, koptískt, japanskt, minguo og bahá’í dagatal, auk langtals Maya.",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js:195:    "reverse.basic.toAdvancedHelp": "Endurkvæm tengsl milli Pastafari-aðgerðardaga eru sett fram sem breytur og skorður, svo hægt sé að lengja keðjuna án gervilegra dýptarmarka.",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js:278:      "papyrusSedge": "Papýrusstör",
```

</details>


---

<sub>1m 53s</sub>

### `rg`

**kótilett|kótelett|Tímatalan|Pastafaríska|14.777.149|setningafræðilega|núið er, séð frá sjálfu sér|úr hverju samanstendur**

"kótilett|kótelett|Tímatalan|Pastafaríska|14.777.149|setningafræðilega|núið er, séð frá sjálfu sér|úr hverju samanstendur" (artifacts/cross-repo-native-qa/runtime/repo2-0, docs/about/content/is.html, docs/i18n/locales/is.js)

<details>
<summary>67 matches</summary>

```
[grep content: 60 matches across 7 file(s) under /home/runner/work/pastafari-calendar/pastafari-calendar]

docs/i18n/locales/is.js (22 match(es)):
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
  122:     "calendar.targetOutside": "Dagsetningin sem þú leitaðir að er ekki í kótelettunni sem nú er sýnd. Þú getur haldið áfram að fletta eða leitað að annarri dagsetningu.",
  125:     "year.context": "Þessi uppbygging er reiknuð fyrir aðgerðardaginn {actionDate}. Ef aðgerðardeginum er breytt getur þurft að byggja ársmörk, kótelettur og mánuði upp að nýju.",
  134:     "year.displayedCutletPosition": "Sýnda kótelettan nær yfir daga {start}–{end} ársins.",
  136:     "year.monthExplainer": "Mánuðir fléttast óháð kótelettum í gegnum árið: mánuður er ekki undirdeild kótelettu og dagar hans geta birst í mörgum aðskildum runum. Lengd mánaðar er því heildarfjöldi daga sem honum er úthlutað, ekki endilega eitt samfellt tímabil.",
  145:     "target.notInView": "Dagsetningin sem þú leitaðir að er enn varðveitt; kótelettan sem nú er sýnd er önnur.",
  146:     "date.aria": "Ár {year} frá sköpun heimsins, dagur {dayInCutlet} í kótelettunni {cutletName}, dagur {dayInMonth} í mánuðinum {monthName}",
  148:     "date.cutletLine": "Dagur {dayInCutlet} í kótelettunni {cutletName}",
  154:     "guide.1.body": "Um leið og tengillinn opnast ákvarðar vefurinn núverandi Pastafari-dag fyrir virka staðsetningu athugandans og sýnir kótelettuna sem hann tilheyrir. Dagamörkin eru staðsetningarháði tímapunkturinn þegar miðja Venusar fer um neðri hluta staðbundna hádegisbaugsins, eins og lýst er í ASTRONOMICAL-DAY.md; þau eru ekki borgaralegt miðnætti. Engin skráning eða innskráning er nauðsynleg og engin dagsetning er send á reikniþjón.",
  158:     "guide.3.body": "Hver reitur hefur þrjár fastar línur: ár frá sköpun heimsins; númer dags í kótelettunni og nafn hennar; síðan dag í mánuðinum og nafn mánaðarins. Engin ein tala táknar alla dagsetninguna. Nafn mánaðarins ræður lit reitsins.",
  160:     "guide.4.body": "„Fyrri kóteletta“ og „Næsta kóteletta“ fara í nágrannakótelettur. Aðrir dagareitir eru ekki hnappar, því ekki er hægt að framkvæma aðgerð með því að smella á þá. „Til baka í dag“ endurstillir bæði leitina og aðgerðardaginn á núverandi Pastafari-dag.",
  166:     "guide.7.body": "Undir kótelettusýninni sýnir vefurinn uppbyggingu sýnda ársins: lengd og bil, hverja kótelettu og lengd hennar, og hvern mánuð. Fyrir mánuði sýnir hann einnig fjölda samfelldra runa og fyrstu og síðustu birtingu, svo fléttunin í gegnum árið verður sýnileg.",
  180:     "reverse.field.dayInCutlet": "Dagur í kótelettu",

docs/about/content/is.html (27 match(es)):
  14:   <p>Hún hefur <strong>nákvæmlega fimm hluta</strong>: árnúmer, nafn kótelettu, dag innan kótelettu, nafn mánaðar og dag innan mánaðar.</p>
  15:   <p>Almennt dæmi: <strong>ár 5000, kóteletta A, dagur 417 í kótelettunni, mánuður B, dagur 83 í mánuðinum.</strong></p>
  22:   <p>Að breyta <code>t</code> þýðir að spyrja um annan dag. Að breyta <code>c</code> getur haft miklu víðtækari áhrif: það getur breytt ársmörkum, kótelettum, mánuðum, nöfnum þeirra og því hvernig þeir fléttast saman.</p>
  45:   <p>Með öðrum orðum: núið er, séð frá sjálfu sér, alltaf innan árs 5000. En ár 5000 er ekki fast sögulegt tímabil; það er valið upp á nýtt í hvert sinn miðað við aðgerðardaginn.</p>
  59:   <p>Ár getur því verið styttra en sólarár eða lengra en fimmtán sólarár. Ársmörkin eru byggð úr kerfi <strong>hliða</strong>; mörk kótelettna koma úr sama kerfi.</p>
  65:   <p>Hvert ár skiptist í <strong>6 til 17 kótelettur</strong>. Kóteletta er samfellt tímabil í tímaröð.</p>
  66:   <p>Ef dagur 250 í kótelettu er í dag, verður dagur 251 í sömu kótelettu á morgun, nema í dag sé síðasti dagur hennar. Mörk kótelettna eru hlið og kóteletta varir að minnsta kosti</p>
  69:   <p>Kerfið hefur 17 kanónísk kótelettunöfn og sama nafn endurtekur sig ekki innan sama árs. Nafnið ákvarðar hvorki lengd né staðsetningu kótelettunnar.</p><hr>
  93:   <p>Einn mánuður getur farið í gegnum margar kótelettur, og innan einnar kótelettu geta margir mánuðir birst. Upphaf og endir kerfanna tveggja þurfa ekki að falla saman.</p><hr>
  111:   <p>Það eru 17 kanónísk kótelettunöfn og 47 kanónísk mánaðarnöfn. Innan eins árs birtist hvert nafn í sínum flokki í mesta lagi einu sinni.</p>
  113:   <p>Nafnið er heldur ekki falinn lengdarkóði. Nafn tiltekinnar kótelettu eða mánaðar gerir eininguna ekki sjálfkrafa lengri eða styttri.</p><hr>
  118:   <p>Það eru 47 mánaðarnöfn og mánuður getur mest náð degi 123. Fjöldi setningafræðilega mögulegra para af gerðinni „mánaðarnafn + dagnúmer í mánuði“ er því</p>
  131:   <p>Ferlið felur í sér fimm inntaksteljara, 7 falda dropa, 46 sýnilega dropa, 6 skálar, breytilega röð skálanna, 12 lokablöndur, innsigli fyrir mismunandi svör, samsetningarval, smíði hliða, val ára, skiptingu kótelettna, val nafna, smíði mánaða og fléttun mánaðardaga.</p>
  151:   <p>Atlasinn var reiknaður út með þeirri útgáfu vélarinnar sem auðkennd er með <code>8e155fa4198ea7bcfeb16138ac5d6662706f4d93</code> og innihélt 4.096 aðgerðardaga; árin 4990–5010 fyrir hvern þeirra; 86.016 ársbyggingar; 625.437 kótelettur; 3.535.422 byggingarmánuði; meira en 356 milljónir samfelldra mánaðarkafla; og meira en 364 milljónir færslna frá degi <code>n</code> í dag <code>n+1</code> í sama mánuði.</p>
  160:         <tr><td>Meðalfjöldi kótelettna á ári</td><td>7,271</td></tr>
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
artifacts/cross-repo-native-qa/runtime/repo2-0/SPAGHETTI_DEVELOPMENT_HISTORY.md:7: Verkefnið var stofnað frá auðu tré fyrir Elm og íslensku. Sjálfstæður nákvæmur heiltölukjarni var skrifaður í Elm, staðlaða viðmiðunarvélin var endurgerð beint úr innbyggða viðmiðinu og sérstök hrein Elm-prófunarumgjörð var búin til. `SourceLanguageCatalog` var frystur með 17 kótilettum og 47 mánuðum.

artifacts/cross-repo-native-qa/runtime/repo2-0/README.md (2 match(es)):
  1: # Pastafaríska tímatalan — Elm og íslenska
  7: `Pastafari.ExactInt` veitir nákvæman heiltölureikning með ótakmarkaðri stærð, skrifaðan í Elm. `NormativeOracle` er prófunar-eingöngu bein útfærsla á innbyggða staðlaða viðmiðinu. `Pastafari.SourceLanguageCatalog` frystir 17 kótelettunöfn og 47 mánaðarnöfn með föstum `canonicalIndex`. `Pastafari.MonsterBase` er aðeins hlutlaus grunnur fyrir samhengi, stýringu, staðfestingu og mælingar. `Pastafari.Spaghetti` inniheldur enn enga eldri villuleið og enga leiðréttingarrökfræði úr síðari stigum.

artifacts/cross-repo-native-qa/runtime/repo2-0/STAGE_01_NORMATIVE_AUDIT.md (3 match(es)):
  31: Fjöldi kóteletta er takmarkaður við 6..17 og ekki meiri en fjöldi hliðabila ársins. Skipting kóteletta er nákvæm lexíkógrafísk talning/opnun; ef aðgerðardagurinn er innra hlið verður það millimark skiptingarinnar. Nöfn eru valin sem hlutumraðanir án endurtekningar og innri merkingin er `canonicalIndex`.
  37: `calendarDateCanonical` skilar nákvæmlega fimm merkingarsviðum. `calendarDate` leysir aðeins kótilettu- og mánaðarvísitölur yfir í fryst íslensk heiti. Ekkert í `src/` flytur inn `NormativeOracle`, þannig að framleiðsluskelin getur ekki notað viðmiðunarvélina sem varaleið eða leiðréttingu.
  39: Við úttektina fannst Elm-sértæk þýðingarvilla í eldri drögum: fjögurra og fimm staka tuple-gildi höfðu verið notuð í stuðlatöflum og í innra vali kótilettuskiptingar. Elm leyfir ekki slík tuple. Þau voru skipt út fyrir nafngreind record-gildi án merkingarbreytingar. Engin fjögurra eða fleiri staka tuple er eftir í Elm-kóðanum.

artifacts/cross-repo-native-qa/runtime/repo2-0/tests/NormativeOracle.elm (2 match(es)):
  1773:                 Debug.todo "Röð kótilettuskiptingar fór út fyrir löglegu fjölskylduna."
  2068:         |> expectMaybe "Markdagurinn fannst ekki í neinni kótilettu."

artifacts/cross-repo-native-qa/runtime/repo2-0/tests/Stage01Checks.elm (3 match(es)):
  243:     , bigCheck "Spjaldadagur er 14.777.149 dögum eftir grunndag" (BI.fromInt Fixtures.tabletsFromFoundation) (BI.sub Oracle.tabletsDay foundation)
  340:         "Sautján kótelettunöfn hafa nákvæma canonicalIndex-röð"
  350:         "Fryst kótelettuskrá hefur nákvæm íslensk heiti"
```

</details>


---

<sub>2m 3s</sub>

### `rg`

**^[[:space:]]*"[^"]+"[[:space:]]*:**

"^[[:space:]]*"[^"]+"[[:space:]]*:" (docs/i18n/locales/is.js)

```
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js:341
```


---

<sub>2m 3s</sub>

### `rg`

**^[[:space:]]*"[^"]+"[[:space:]]*:**

"^[[:space:]]*"[^"]+"[[:space:]]*:" (docs/i18n/locales/en.js)

```
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/en.js:258
```


---

<sub>2m 3s</sub>

### `rg`

**papyrusSedge|Papýrusstör|"about.fallbackNotice"|"guide.1.body"|"reverse.basic.toAdvancedHelp"**

"papyrusSedge|Papýrusstör|"about.fallbackNotice"|"guide.1.body"|"reverse.basic.toAdvancedHelp"" (docs/i18n/locales/is.js, docs/i18n/locales/en.js)

<details>
<summary>8 matches</summary>

```
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/en.js:27:    "about.fallbackNotice": "The explanation is not available in the selected language right now, so the default version is shown.",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/en.js:161:    "guide.1.body": "As soon as the link opens, the site determines the current Pastafari day for the active observer location and displays the cutlet containing it. The day boundary is the location-dependent lower meridian transit of Venus described in ASTRONOMICAL-DAY.md; it is not civil midnight. There is no registration, sign-in, or date sent to a calculation server.",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/en.js:202:    "reverse.basic.toAdvancedHelp": "Recursive Pastafari calculation days are represented as variables and constraints so the chain can be extended without an artificial depth limit.",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/en.js:282:      fourPartsOfNine: "Four Parts of Nine", palgurash: "Palgurash", papyrusSedge: "Papyrus Sedge",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js:30:    "about.fallbackNotice": "Skýringin er ekki tiltæk á völdu tungumáli; hebreska útgáfan er sýnd í staðinn.",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js:154:    "guide.1.body": "Um leið og tengillinn opnast ákvarðar vefurinn núverandi Pastafari-dag fyrir virka staðsetningu athugandans og sýnir kótelettuna sem hann tilheyrir. Dagamörkin eru staðsetningarháði tímapunkturinn þegar miðja Venusar fer um neðri hluta staðbundna hádegisbaugsins, eins og lýst er í ASTRONOMICAL-DAY.md; þau eru ekki borgaralegt miðnætti. Engin skráning eða innskráning er nauðsynleg og engin dagsetning er send á reikniþjón.",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js:195:    "reverse.basic.toAdvancedHelp": "Endurkvæm tengsl milli Pastafari-aðgerðardaga eru sett fram sem breytur og skorður, svo hægt sé að lengja keðjuna án gervilegra dýptarmarka.",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js:278:      "papyrusSedge": "Papýrusstör",
```

</details>


---

<sub>2m 3s</sub>

### `rg`

**kótilett|kótelett|Pastafaríska tímatalan|FOREIGN_LANGUAGE_USAGE**

"kótilett|kótelett|Pastafaríska tímatalan|FOREIGN_LANGUAGE_USAGE" (artifacts/cross-repo-native-qa/runtime/repo2-0)

<details>
<summary>11 matches</summary>

```
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/README.md:1:# Pastafaríska tímatalan — Elm og íslenska
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/README.md:7:`Pastafari.ExactInt` veitir nákvæman heiltölureikning með ótakmarkaðri stærð, skrifaðan í Elm. `NormativeOracle` er prófunar-eingöngu bein útfærsla á innbyggða staðlaða viðmiðinu. `Pastafari.SourceLanguageCatalog` frystir 17 kótelettunöfn og 47 mánaðarnöfn með föstum `canonicalIndex`. `Pastafari.MonsterBase` er aðeins hlutlaus grunnur fyrir samhengi, stýringu, staðfestingu og mælingar. `Pastafari.Spaghetti` inniheldur enn enga eldri villuleið og enga leiðréttingarrökfræði úr síðari stigum.
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/tests/Stage01Checks.elm:340:        "Sautján kótelettunöfn hafa nákvæma canonicalIndex-röð"
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/tests/Stage01Checks.elm:350:        "Fryst kótelettuskrá hefur nákvæm íslensk heiti"
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/tests/NormativeOracle.elm:1773:                Debug.todo "Röð kótilettuskiptingar fór út fyrir löglegu fjölskylduna."
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/tests/NormativeOracle.elm:2068:        |> expectMaybe "Markdagurinn fannst ekki í neinni kótilettu."
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/DEVELOPMENT_STAGE.md:7:FOREIGN_LANGUAGE_USAGE=NONE
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/SPAGHETTI_DEVELOPMENT_HISTORY.md:7:Verkefnið var stofnað frá auðu tré fyrir Elm og íslensku. Sjálfstæður nákvæmur heiltölukjarni var skrifaður í Elm, staðlaða viðmiðunarvélin var endurgerð beint úr innbyggða viðmiðinu og sérstök hrein Elm-prófunarumgjörð var búin til. `SourceLanguageCatalog` var frystur með 17 kótilettum og 47 mánuðum.
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/STAGE_01_NORMATIVE_AUDIT.md:31:Fjöldi kóteletta er takmarkaður við 6..17 og ekki meiri en fjöldi hliðabila ársins. Skipting kóteletta er nákvæm lexíkógrafísk talning/opnun; ef aðgerðardagurinn er innra hlið verður það millimark skiptingarinnar. Nöfn eru valin sem hlutumraðanir án endurtekningar og innri merkingin er `canonicalIndex`.
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/STAGE_01_NORMATIVE_AUDIT.md:37:`calendarDateCanonical` skilar nákvæmlega fimm merkingarsviðum. `calendarDate` leysir aðeins kótilettu- og mánaðarvísitölur yfir í fryst íslensk heiti. Ekkert í `src/` flytur inn `NormativeOracle`, þannig að framleiðsluskelin getur ekki notað viðmiðunarvélina sem varaleið eða leiðréttingu.
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/STAGE_01_NORMATIVE_AUDIT.md:39:Við úttektina fannst Elm-sértæk þýðingarvilla í eldri drögum: fjögurra og fimm staka tuple-gildi höfðu verið notuð í stuðlatöflum og í innra vali kótilettuskiptingar. Elm leyfir ekki slík tuple. Þau voru skipt út fyrir nafngreind record-gildi án merkingarbreytingar. Engin fjögurra eða fleiri staka tuple er eftir í Elm-kóðanum.
```

</details>


---

<sub>2m 3s</sub>

### `rg`

**setningafræðilega|almanak sem reiknað|séð frá sjálfu sér|Úr hverju samanstendur|semantic master|deep-link contract**

"setningafræðilega|almanak sem reiknað|séð frá sjálfu sér|Úr hverju samanstendur|semantic master|deep-link contract" (docs/about/content/is.html)

```
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html:1:<!-- Íslenska útgáfan er skrifuð beint út frá hebreska semantic master; ekkert millimál er notað. -->
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html:2:<!-- Section-ID eru hluti af stöðugum opinberum deep-link contract og eru ekki leidd af þýddum fyrirsögnum. -->
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html:13:  <h2>Úr hverju samanstendur Pastafari-dagsetning?</h2>
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html:45:  <p>Með öðrum orðum: núið er, séð frá sjálfu sér, alltaf innan árs 5000. En ár 5000 er ekki fast sögulegt tímabil; það er valið upp á nýtt í hvert sinn miðað við aðgerðardaginn.</p>
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html:118:  <p>Það eru 47 mánaðarnöfn og mánuður getur mest náð degi 123. Fjöldi setningafræðilega mögulegra para af gerðinni „mánaðarnafn + dagnúmer í mánuði“ er því</p>
```


---

<sub>2m 27s</sub>

### `bash` — Failed

**Staðfesta skilaboðalykla og staðgengla án breytinga**

$ python - <<'PY'
import pathlib, re
base = pathlib.Path('docs/i18n/locales')
def messages(code):
    text = (base / f'{code}.js').read_text(encoding='utf-8')
    block = re.search(r'"messages"\s*:\s*\{(.*?)\n\s*\},\n\s*"calendar"', text, re.S).group(1)
    return dict(re.findall(r'^\s*"([^"]+)"\s*:\s*"((?:[^"\\]|\\.)*)"\s*,?\s*$', block, re.M))
is_messages, en_messages = messages('is'), messages('en')
missing = sorted(set(en_messages) - set(is_messages))
extra = sorted(set(is_messages) - set(en_messages))
placeholder_mismatch = []
for key in sorted(set(en_messages) & set(is_messages)):
    p = lambda s: sorted(set(re.findall(r'\{([A-Za-z0-9_.-]+)\}', s)))
    if p(en_messages[key]) != p(is_messages[key]):
        placeholder_mismatch.append(key)
print(f'messages: is={len(is_messages)}, en={len(en_messages)}, missing={len(missing)}, extra={len(extra)}, placeholder_mismatch={len(placeholder_mismatch)}')
if missing: print('missing:', ', '.join(missing))
if extra: print('extra:', ', '.join(extra))
if placeholder_mismatch: print('placeholder mismatches:', ', '.join(placeholder_mismatch))
PY

```
Permission denied and could not request permission from user
```


---

<sub>2m 40s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/index.html.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/index.html (lines 181-320)

<details>
<summary>25 lines</summary>

```
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
        <p><strong>JavaScript</strong> <span>⚠</span> <a href="./no-js/" lang="zxx" dir="ltr">🌐</a></p>
      </div>
    </noscript>
  </body>
</html>
```

</details>


---

<sub>2m 40s</sub>

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

<sub>2m 40s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js (lines 190-280)

<details>
<summary>90 lines</summary>

```
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
```

</details>


---

<sub>2m 40s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js (lines 280-360)

<details>
<summary>72 lines</summary>

```
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

<sub>2m 40s</sub>

### `rg`

**["'][A-Z][a-z][A-Za-z ]{6,}[.!?]["']**

"["'][A-Z][a-z][A-Za-z ]{6,}[.!?]["']" (docs/app.js, docs/reverse-ui.js, docs/reverse-search-controller.js)

<details>
<summary>15 matches</summary>

```
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/reverse-search-controller.js:33:  if (!input || typeof input !== "object") throw new TypeError("Pastafari input must be an object.");
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/reverse-search-controller.js:36:  if (!cutlet) throw new RangeError("Unknown cutlet identifier.");
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/reverse-search-controller.js:37:  if (!month) throw new RangeError("Unknown month identifier.");
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/reverse-search-controller.js:85:    if (end < start) throw new RangeError("Variable range end precedes start.");
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/reverse-search-controller.js:92:  if (!source || typeof source !== "object") throw new TypeError("Constraint must be an object.");
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/reverse-search-controller.js:108:      if (!["<", "<=", ">", ">="].includes(op)) throw new RangeError("Unsupported order operator.");
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/reverse-search-controller.js:120:          throw new RangeError("Difference max is smaller than min.");
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/reverse-search-controller.js:126:      throw new RangeError("Unsupported constraint type.");
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/reverse-search-controller.js:137:    if (!name) throw new RangeError("Variable name must not be empty.");
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/reverse-search-controller.js:140:  if (Object.keys(normalizedVariables).length === 0) throw new RangeError("At least one variable is required.");
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/reverse-search-controller.js:149:    throw new TypeError("Constraint result is invalid.");
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/reverse-search-controller.js:162:    throw new RangeError("Incomplete constraint result has an unknown termination reason.");
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/app.js:251:    throw new Error("Month palette contrast invariant failed.");
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/app.js:597:    if (!secondary || secondary.jdn !== primary.jdn) throw new RangeError("Comparison rows are not aligned by JDN.");
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/app.js:787:  if (!configuration.form.reportValidity()) throw new RangeError("Missing or invalid input fields.");
```

</details>


---

<sub>3m 15s</sub>

### `rg`

**kótilett|papýrussef|papýrusstör|Tímatalan|Canonical Names Lock|Verify canonical names lock|Canonical name lock mismatch**

"kótilett|papýrussef|papýrusstör|Tímatalan|Canonical Names Lock|Verify canonical names lock|Canonical name lock mismatch" (artifacts/cross-repo-native-qa/runtime/repo2-0, docs/i18n/locales/is.js)

<details>
<summary>11 matches</summary>

```
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/SOURCE_LANGUAGE_CATALOG.md:20:8. papýrussef
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/SPAGHETTI_DEVELOPMENT_HISTORY.md:7:Verkefnið var stofnað frá auðu tré fyrir Elm og íslensku. Sjálfstæður nákvæmur heiltölukjarni var skrifaður í Elm, staðlaða viðmiðunarvélin var endurgerð beint úr innbyggða viðmiðinu og sérstök hrein Elm-prófunarumgjörð var búin til. `SourceLanguageCatalog` var frystur með 17 kótilettum og 47 mánuðum.
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/tests/BootstrapFixtures.elm:34:    , "papýrussef"
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/src/Pastafari/SourceLanguageCatalog.elm:32:    , { canonicalIndex = 8, sourceId = "PAPYRUS_SEDGE", text = "papýrussef" }
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/.github/workflows/canonical-names-lock.yml:1:name: Canonical Names Lock
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/.github/workflows/canonical-names-lock.yml:15:      - name: Verify canonical names lock
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/.github/workflows/canonical-names-lock.yml:23:              echo "::error file=$path::Canonical name lock mismatch"
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/STAGE_01_NORMATIVE_AUDIT.md:37:`calendarDateCanonical` skilar nákvæmlega fimm merkingarsviðum. `calendarDate` leysir aðeins kótilettu- og mánaðarvísitölur yfir í fryst íslensk heiti. Ekkert í `src/` flytur inn `NormativeOracle`, þannig að framleiðsluskelin getur ekki notað viðmiðunarvélina sem varaleið eða leiðréttingu.
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/STAGE_01_NORMATIVE_AUDIT.md:39:Við úttektina fannst Elm-sértæk þýðingarvilla í eldri drögum: fjögurra og fimm staka tuple-gildi höfðu verið notuð í stuðlatöflum og í innra vali kótilettuskiptingar. Elm leyfir ekki slík tuple. Þau voru skipt út fyrir nafngreind record-gildi án merkingarbreytingar. Engin fjögurra eða fleiri staka tuple er eftir í Elm-kóðanum.
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/tests/NormativeOracle.elm:1773:                Debug.todo "Röð kótilettuskiptingar fór út fyrir löglegu fjölskylduna."
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/tests/NormativeOracle.elm:2068:        |> expectMaybe "Markdagurinn fannst ekki í neinni kótilettu."
```

</details>


---

<sub>3m 15s</sub>

### `rg`

**almanak|Pastafari-merki|Pastafari-dagsetning|setningafræðilega|séð frá sjálfu sér|semantic master|deep-link contract**

"almanak|Pastafari-merki|Pastafari-dagsetning|setningafræðilega|séð frá sjálfu sér|semantic master|deep-link contract" (docs/about/content/is.html)

<details>
<summary>19 matches</summary>

```
[grep content: 17 matches across 1 file(s) under /home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content]

is.html (17 match(es)):
  1: <!-- Íslenska útgáfan er skrifuð beint út frá hebreska semantic master; ekkert millimál er notað. -->
  2: <!-- Section-ID eru hluti af stöðugum opinberum deep-link contract og eru ekki leidd af þýddum fyrirsögnum. -->
  5:   <p>Dagatalið úthlutar ekki hverjum degi föstu, óbreytanlegu Pastafari-merki. Til að reikna dagsetningu þarf að tilgreina tvo daga: <strong>aðgerðardaginn</strong>, sem útreikningurinn hefst frá, og <strong>fyrirspurnardaginn</strong>, sem spurt er um.</p>
  8:   <p>en ekki <code>F(t)</code>. Sami fyrirspurnardagur getur því fengið aðra Pastafari-dagsetningu þegar aðgerðardagurinn breytist.</p>
  13:   <h2>Úr hverju samanstendur Pastafari-dagsetning?</h2>
  34:   <p>Því getur handvirk breyting á aðgerðardegi breytt Pastafari-dagsetningunni sem sýnd er fyrir sama dag, án þess að dagurinn sjálfur færist nokkuð á tímalínunni.</p>
  35:   <p>Sama regla gildir um atburði. Fundur, fæðing eða sögulegur atburður ætti að vera tengdur föstu auðkenni á tímalínunni; Pastafari-dagsetningu hans má endurreikna eftir birtingarsamhengi.</p>
  45:   <p>Með öðrum orðum: núið er, séð frá sjálfu sér, alltaf innan árs 5000. En ár 5000 er ekki fast sögulegt tímabil; það er valið upp á nýtt í hvert sinn miðað við aðgerðardaginn.</p>
  106:   <p>Auðvitað má leggja borgaralegt vikukerfi utan á; það er einfaldlega ekki hluti af Pastafari-dagsetningunni.</p><hr>
  118:   <p>Það eru 47 mánaðarnöfn og mánuður getur mest náð degi 123. Fjöldi setningafræðilega mögulegra para af gerðinni „mánaðarnafn + dagnúmer í mánuði“ er því</p>
  202:   <p>Ef tveir vilja semja um fund með Pastafari-dagsetningu einni saman verða þeir að minnsta kosti að vera sammála um fimm dagsetningarreiti og aðgerðardaginn sem notaður var í útreikningnum. Betra er að vista aðgerðardaginn sem fast dagauðkenni en sem orðið „í dag“; annars geta tveir reiknað tvö mismunandi dagatöl.</p>
  215:   <p>Atburðurinn og staðbundna merkið sem honum er sýnt eru ekki sami hluturinn. Atburður með ákveðinni klukkustund ætti að vera bundinn við fastan tímapunkt. Ferðalag færir hann ekki í tíma, en staðbundin Pastafari-dagsetning sama raunverulega augnabliks getur breyst, því skilgreiningin á „staðbundnum degi“ ræðst af staðsetningu.</p>
  238:   <p>Í beinni sannprófun við ritun þessarar síðu náði Seer meðal annars yfir <code>date</code>- og <code>now</code>-fyrirspurnir, <code>batch</code>, dagabil, öfuga umbreytingu frá Pastafari-dagsetningu til fyrirspurnardags, öflun ársuppbyggingar, ákvörðun virks aðgerðardags, Node API, vafra-/HTTP-biðlara, CLI, HTTP v1-þjónustu, OpenAPI 3.1-samning, innfæddar útfærslur og dreifingarpakka, auk staðfestrar gámaútsetningar.</p>
  259:     <p>Þetta eru fastir festipunktar á tímalínunni, en Pastafari-dagsetningin sem þeim er sýnd ræðst samt af aðgerðardeginum sem spurt er frá.</p>
  266:     <p>Atburðurinn þegar kerfið var afhent aftur er sjálfur fastur sögulegur atburður. Betra er að sýna <strong>Pastafari-dagsetningu</strong> hans kviklega undir núverandi aðgerðardegi en festa hana að eilífu sem eina dagsetningu.</p><hr>
  297:   <p>Full Pastafari-dagsetning er því ekki algilt vistfang á tímalínunni ef ekki er vitað undir hvaða <code>c</code> hún var reiknuð.</p>
  328:   <p>Dagur <code>n+1</code> í mánuði þarf ekki að vera á morgun. Sami dagur á tímalínunni getur fengið annað Pastafari-merki á morgun. Sama raunverulega augnablik getur á tveimur stöðum tilheyrt tveimur mismunandi staðbundnum Pastafari-dögum. Heilsdagsatburður þarf ekki að standa frá miðnætti til miðnættis. Og árlegur afmælisdagur er fyrst leitarvandamál og síðan dagatalsvandamál.</p>
```

</details>


---

<sub>3m 15s</sub>

### `rg`

**calendarInput|calendarHelp|date\.aria|target\.context|comparison\.summary|about\.fallbackNotice**

"calendarInput|calendarHelp|date\.aria|target\.context|comparison\.summary|about\.fallbackNotice" (docs/i18n/locales/is.js)

<details>
<summary>32 matches</summary>

```
[grep content: 30 matches across 1 file(s) under /home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales]

is.js (30 match(es)):
  30:     "about.fallbackNotice": "Skýringin er ekki tiltæk á völdu tungumáli; hebreska útgáfan er sýnd í staðinn.",
  58:     "comparison.summary": "Sýndir eru {count} dagar, frá fyrsta til síðasta dags kótelettunnar sem birtist í fyrri útreikningnum.",
  81:     "calendarInput.gregorian": "Gregorískt",
  82:     "calendarInput.julian": "Júlíanskt",
  83:     "calendarInput.hebrew": "Hebreskt",
  84:     "calendarInput.islamicCivil": "Borgaralegt íslamskt",
  85:     "calendarInput.islamicUmmAlQura": "Umm al-Qura",
  86:     "calendarInput.solarHijriOfficial": "Sól-Hijri — opinbert",
  87:     "calendarInput.solarHijriArithmetic": "Sól-Hijri — 2.820 ára reikniaðferð",
  88:     "calendarInput.chinese": "Kínverskt",
  89:     "calendarInput.hinduOldSolar": "Fornt hindúdagatal — sólarform",
  90:     "calendarInput.hinduOldLunar": "Fornt hindúdagatal — tunglform",
  91:     "calendarInput.saka": "Saka",
  92:     "calendarInput.thaiBuddhist": "Taílenskt búddískt",
  93:     "calendarInput.ethiopic": "Eþíópískt",
  94:     "calendarInput.coptic": "Koptískt",
  95:     "calendarInput.japaneseImperial": "Japanskt keisaradagatal",
  96:     "calendarInput.minguo": "Minguo",
  97:     "calendarInput.bahaiTehran": "Bahá’í — jafndægur í Teheran",
  98:     "calendarInput.bahaiWestern": "Bahá’í — vestrænt reiknað",
  99:     "calendarInput.mayaLongCount": "Langtal Maya",
  100:     "calendarHelp.hebrew": "Mánuðir eru valdir eftir nafni. Ár og dag má slá inn með tugatölustöfum eða hebreskum talnastöfum, til dæmis תשפ״ו eða י״ד; ef ár er ritað með hebreskum talnastöfum án þúsundamerkis er 5.000 bætt við það.",
  101:     "calendarHelp.intl": "Þessi umbreyting notar dagatalsstuðning sem er innbyggður í vafrann. Ef vafrinn getur ekki sýnt dagsetninguna segir vefurinn það skýrt.",
  102:     "calendarHelp.chinese": "Sláðu inn gregoríska árið sem samsvarar kínverska árinu og merktu „Innskotsmánuður“ aðeins fyrir endurtekna mánuðinn.",
  103:     "calendarHelp.hindu": "Sláðu inn ár og dag samkvæmt forna hindúatalinu og veldu mánuðinn eftir nafni. Í tunglforminu má einnig merkja innskotsmánuð.",
  104:     "calendarHelp.japanese": "Ár 1 hefst á fyrsta degi tímabilsins; fyrir fyrsta árið má einnig slá inn 元 eða 元年. Dagsetningu fyrir upphaf eða eftir lok tímabilsins er hafnað.",
  105:     "calendarHelp.bahai": "Veldu mánuð eftir nafni eða Ayyám-i-Há. Formið sem byggir á jafndægri í Teheran styður venjulegt gregorískt bil 1844–3000.",
  106:     "calendarHelp.maya": "Sjálfgefna fylgnitalan er GMT 584.283. Þú getur breytt henni ef þú notar aðra fylgni.",
  144:     "target.context": "Fyrirspurnardagur: {targetDate} · aðgerðardagur: {actionDate}",
  146:     "date.aria": "Ár {year} frá sköpun heimsins, dagur {dayInCutlet} í kótelettunni {cutletName}, dagur {dayInMonth} í mánuðinum {monthName}",
```

</details>


---

<sub>3m 46s</sub>

### `rg`

**"[^"]*[áéíóúýþæöÁÉÍÓÚÝÞÆÖ][^"]*"**

""[^"]*[áéíóúýþæöÁÉÍÓÚÝÞÆÖ][^"]*"" in *.elm (artifacts/cross-repo-native-qa/runtime/repo2-0)

<details>
<summary>148 matches</summary>

```
[grep content: 143 matches across 5 file(s) under /home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0]

src/Pastafari/SourceLanguageCatalog.elm (24 match(es)):
  27:     , { canonicalIndex = 3, sourceId = "KIDNEY", text = "nýra" }
  30:     , { canonicalIndex = 6, sourceId = "FOUR_PARTS_OF_NINE", text = "fjórir hlutar af níu" }
  31:     , { canonicalIndex = 7, sourceId = "PALGURASH", text = "Palgúrasj" }
  32:     , { canonicalIndex = 8, sourceId = "PAPYRUS_SEDGE", text = "papýrussef" }
  37:     , { canonicalIndex = 13, sourceId = "RIVER", text = "á" }
  38:     , { canonicalIndex = 14, sourceId = "LAUGHTER", text = "hlátur" }
  41:     , { canonicalIndex = 17, sourceId = "EMPTY_JAR", text = "tóma krukkan" }
  50:     , { canonicalIndex = 4, sourceId = "ENVY", text = "öfund" }
  51:     , { canonicalIndex = 5, sourceId = "ERIDU", text = "Erídú" }
  53:     , { canonicalIndex = 7, sourceId = "THREE_PARTS_OF_FIVE", text = "þrír hlutar af fimm" }
  54:     , { canonicalIndex = 8, sourceId = "KARSHUMAV", text = "Karsjúmav" }
  55:     , { canonicalIndex = 9, sourceId = "LEOPARD", text = "hlébarði" }
  59:     , { canonicalIndex = 13, sourceId = "SPINDLE", text = "snælda" }
  61:     , { canonicalIndex = 15, sourceId = "CAROB", text = "jóhannesarbrauð" }
  62:     , { canonicalIndex = 16, sourceId = "URUK", text = "Úrúk" }
  63:     , { canonicalIndex = 17, sourceId = "SHAME", text = "skömm" }
  64:     , { canonicalIndex = 18, sourceId = "CAMEL", text = "úlfaldi" }
  73:     , { canonicalIndex = 27, sourceId = "FIG", text = "fíkja" }
  74:     , { canonicalIndex = 28, sourceId = "NINEVEH", text = "Níníve" }
  82:     , { canonicalIndex = 36, sourceId = "SUSA", text = "Súsa" }
  85:     , { canonicalIndex = 39, sourceId = "FLOUR", text = "mjöl" }
  86:     , { canonicalIndex = 40, sourceId = "REGRET", text = "eftirsjá" }
  87:     , { canonicalIndex = 41, sourceId = "BABYLON", text = "Babýlon" }
  89:     , { canonicalIndex = 43, sourceId = "FLAX", text = "hör" }
src/Pastafari/MonsterBase.elm:119:         Invalid { context | status = Failed } "Grunnsamhengið vantar framkvæmdarslóð."

tests/Stage01Checks.elm (68 match(es)):
  149:                         |> MonsterBase.recordMetric "bootstrap.röð.a"
  154:                         |> MonsterBase.recordMetric "bootstrap.röð.b"
  163:                         |> MonsterBase.recordMetric "bootstrap.röð.b"
  168:                         |> MonsterBase.recordMetric "bootstrap.röð.a"
  239:         "Stóri teljarinn er nákvæmlega 2^127-1"
  243:     , bigCheck "Spjaldadagur er 14.777.149 dögum eftir grunndag" (BI.fromInt Fixtures.tabletsFromFoundation) (BI.sub Oracle.tabletsDay foundation)
  245:         "Hámarkslengd árs er nákvæmlega 5778 dagar"
  254:     , bigCheck "Nákvæm deiling M^2 með M" modulus (BI.floorDivPositive mSquared modulus)
  255:     , bigCheck "Nákvæm leif M^2 með M" BI.zero (BI.regularMod mSquared modulus)
  256:     , bigCheck "Gólfdeiling -7 með 3" (BI.fromInt -3) (BI.floorDivPositive negativeSeven three)
  257:     , bigCheck "Euklíðsk leif -7 með 3" (BI.fromInt 2) (BI.regularMod negativeSeven three)
  259:         "Gólfdeiling og euklíðsk leif uppfylla n=q*d+r á öllum Bootstrap-vitnum"
  261:         "n=q*d+r og 0<=r<d fyrir öll vitni"
  262:         "ákveðinn listi jákvæðra og neikvæðra stórra heiltalna"
  263:     , bigCheck "Dagatalning á grunndegi" BI.one (Oracle.dayCount foundation)
  266:     , bigCheck "Fjarlægð þegar dagarnir eru jafnir" BI.one countsSame.distance
  267:     , bigCheck "Stefna þegar dagarnir eru jafnir" (BI.fromInt 2) countsSame.direction
  268:     , bigCheck "Fjarlægð yfir grunndag" (BI.fromInt 3) countsCross.distance
  271:         "Steinataflan inniheldur nákvæmlega 46 raðir"
  276:         "Önnur steinaröðin kemur öll úr sama gamla ástandi"
  290:                 "engin önnur röð"
  292:     , listCheck "Fyrsta sex skála umröðunin" [ 1, 2, 3, 4, 5, 6 ] (Oracle.permutationUnrank1 1 [ 1, 2, 3, 4, 5, 6 ])
  293:     , listCheck "Síðasta sex skála umröðunin" [ 6, 5, 4, 3, 2, 1 ] (Oracle.permutationUnrank1 720 [ 1, 2, 3, 4, 5, 6 ])
  296:         "Fallandi margfeldi 47P47 fer yfir stóra teljarann án styttingar"
  298:         "stærra en M"
  300:     , listCheck "Fyrsta hlutumröðun 5P3" [ 1, 2, 3 ] (Oracle.unrankDistinctIndices 5 3 BI.one)
  301:     , listCheck "Síðasta hlutumröðun 5P3" [ 5, 4, 3 ] (Oracle.unrankDistinctIndices 5 3 (BI.fromInt 60))
  302:     , bigCheck "Kótelettuskipting með skyldum innri mörkum hefur réttan fjölda" BI.one (Oracle.countCutletPartitionsForTest 4 2 (Just 2))
  303:     , listCheck "Kótelettuskipting með skyldu innra marki" [ 2, 2 ] (Oracle.unrankCutletPartition 4 2 (Just 2) BI.one)
  304:     , bigCheck "Fjöldi takmarkaðra samsetninga" (BI.fromInt 4) (Oracle.countBoundedCompositions 5 2 1 4)
  305:     , listCheck "Þriðja takmarkaða samsetningin" [ 3, 2 ] (Oracle.unrankBoundedComposition 5 2 1 4 (BI.fromInt 3))
  306:     , bigCheck "Fjöldi löglegra vefja fyrir [2,2]" (BI.fromInt 2) weaveCount
  307:     , listCheck "Annar löglegi vefurinn fyrir [2,2]" [ 1, 2, 1, 2 ] (Oracle.unrankWeavingForLengths [ 2, 2 ] (BI.fromInt 2))
  308:     , listCheck "Eini löglegi vefurinn fyrir [1,1]" [ 1, 2 ] (Oracle.unrankWeavingForLengths [ 1, 1 ] BI.one)
  309:     , bigCheck "Svarhringur afturábak vefst frá 1 yfir í M" modulus (Oracle.answerAt { first = BI.one, directionStep = -1 } 1)
  312:     , bigCheck "Stutt höfnun heldur áfram í sama svarhring" (BI.fromInt 10) (Oracle.chooseRankShort shortRejectStream (BI.fromInt 10))
  313:     , bigCheck "Vítt val með N=M+1 notar samsetta breiða tölu" wideN (Oracle.chooseRankWide wideStream wideN)
  314:     , bigCheck "Valdreifari sendir N=M+1 í víðu leiðina" wideN (Oracle.chooseRank wideStream wideN)
  316:         "Jákvæð hliðaspurning tekur við vísitölu yfir hefðbundnu Int-sviði án styttingar"
  323:         "Neikvætt fyrsta hliðabil er innan staðlaðra marka"
  330:         "Sósan skilar sex skálum og umröðun allra sex skála"
  332:         "sex skálar og umröðun 1..6"
  333:         (String.fromInt (Array.length sauceA.bowls) ++ " skálar; röð " ++ listIntString sauceA.orderAtDrop46)
  335:         "Endurtekin sósa er óháð millikalli og endurnýtingu myndaðra gagna"
  338:         (if sameSauce sauceA sauceAAgain then "sama niðurstaða" else "frávik eftir millikall")
  340:         "Sautján kótelettunöfn hafa nákvæma canonicalIndex-röð"
  343:         (String.fromInt (List.length Catalog.cutletEntries) ++ " færslur")
  345:         "Fjörutíu og sjö mánaðarnöfn hafa nákvæma canonicalIndex-röð"
  348:         (String.fromInt (List.length Catalog.monthEntries) ++ " færslur")
  350:         "Fryst kótelettuskrá hefur nákvæm íslensk heiti"
  355:         "Fryst mánaðaskrá hefur nákvæm íslensk heiti"
  360:         "Vélaauðkenni katalógsins eru ótvíræð"
  362:         "öll sourceId einstök"
  365:         "Unicode-röðun íslensku strengjanna er ekki canonicalIndex-röðin"
  370:         "Grunnsamhengi tveggja kallana deilir ekki framkvæmdarslóð"
  372:         "tvær óháðar slóðir"
  373:         "tvær sjálfstæðar færslur"
  375:         "Breyting á mælingu og stigi í einu samhengi breytir ekki hinu"
  381:         "annað samhengi ósnert og inntak þess fyrra óbreytt"
  382:         "samhengi skoðuð eftir sjálfstæðar umbreytingar"
  384:         "Röð sjálfstæðra samhengiútreikninga breytir ekki niðurstöðu"
  386:         "sama par óháð byggingarröð"
  389:         "Framleiðsluskelin stöðvast vísvitandi í Bootstrap"
  406:                 "óvænt niðurstaða"
  419:             ++ " | vænt: "
  421:             ++ " | fékk: "
  441:                 "GRÆNT"
  446:     "Stage 1 prófanir: "

tests/BootstrapFixtures.elm (24 match(es)):
  29:     , "nýra"
  32:     , "fjórir hlutar af níu"
  33:     , "Palgúrasj"
  34:     , "papýrussef"
  39:     , "á"
  40:     , "hlátur"
  43:     , "tóma krukkan"
  52:     , "öfund"
  53:     , "Erídú"
  55:     , "þrír hlutar af fimm"
  56:     , "Karsjúmav"
  57:     , "hlébarði"
  61:     , "snælda"
  63:     , "jóhannesarbrauð"
  64:     , "Úrúk"
  65:     , "skömm"
  66:     , "úlfaldi"
  75:     , "fíkja"
  76:     , "Níníve"
  84:     , "Súsa"
  87:     , "mjöl"
  88:     , "eftirsjá"
  89:     , "Babýlon"
  91:     , "hör"

tests/NormativeOracle.elm (26 match(es)):
  269:         |> expectMaybe "Steinavísitala er utan leyfilegs sviðs."
  430:         |> expectMaybe "Fylkisvísitala er utan leyfilegs sviðs."
  550:                                 |> expectMaybe "Umröðunarröð gaf ógilda sæti."
  561:         |> expectMaybe "Lítil leif komst ekki í Elm Int þótt deilirinn sé lítill."
  585:                             |> expectMaybe "Skálavísitala fann ekki frumtölu."
  609:         |> expectMaybe "Skálaröð vantar umbeðið sæti."
  811:                     Debug.todo "Spurður skál fannst ekki í röð dropa 46."
  980:                     Debug.todo "Nafnavalröð fór út fyrir hlutumraðanafjölskylduna."
  1057:                 Debug.todo "Röð takmarkaðrar samsetningar fór út fyrir fjölskylduna."
  1098:         |> expectMaybe "Listavísitala er utan leyfilegs sviðs."
  1228:                 Debug.todo "Röð mánaðarvefjar fór út fyrir löglegu vefjafjölskylduna."
  1280:         |> expectMaybe "Hliðavísitala var ekki mynduð áður en hún var lesin."
  1430:         |> expectMaybe "Staðbundinn fjöldi hliðabila komst ekki í Elm Int."
  1467:         |> expectMaybe "Staðbundin valröð komst ekki í Elm Int."
  1532:                 |> expectMaybe "Ár 5000 hafði engan gildan frambjóðanda."
  1584:                 |> expectMaybe "Næsta ár hafði engan gildan lokahliðsframbjóðanda."
  1636:                 |> expectMaybe "Fyrra ár hafði engan gildan opnunarhliðsframbjóðanda."
  1773:                 Debug.todo "Röð kótilettuskiptingar fór út fyrir löglegu fjölskylduna."
  1859:         |> expectMaybe "Kótilettufjöldi hafði engan gildan frambjóðanda."
  1880:                                 |> expectMaybe "Innra hliðabil komst ekki í Elm Int."
  1951:                 |> expectMaybe "Árslengd komst ekki í Elm Int þrátt fyrir 5778 daga hámark."
  1974:                 |> expectMaybe "Árslengd komst ekki í Elm Int þrátt fyrir 5778 daga hámark."
  2068:         |> expectMaybe "Markdagurinn fannst ekki í neinni kótilettu."
  2097:                 |> expectMaybe "Dagshliðrun innan árs komst ekki í Elm Int."
  2125:             |> expectMaybe "Kótilettuvísitala vantar í frysta íslenska katalóginn."
  2129:             |> expectMaybe "Mánaðarvísitala vantar í frysta íslenska katalóginn."
```

</details>


---

<sub>3m 46s</sub>

### `rg`

**"[^"]*[áéíóúýþæöÁÉÍÓÚÝÞÆÖ][^"]*"**

""[^"]*[áéíóúýþæöÁÉÍÓÚÝÞÆÖ][^"]*"" in *.js (docs)

<details>
<summary>113 matches</summary>

```
[grep content: 2050 matches across 73 file(s) under /home/runner/work/pastafari-calendar/pastafari-calendar/docs]

calendar-input-conventions.js (12 match(es)):
  45:   Object.freeze({ value: "1", label: "Bahá" }),
  46:   Object.freeze({ value: "2", label: "Jalál" }),
  47:   Object.freeze({ value: "3", label: "Jamál" }),
  49:   Object.freeze({ value: "5", label: "Núr" }),
  51:   Object.freeze({ value: "7", label: "Kalimát" }),
  52:   Object.freeze({ value: "8", label: "Kamál" }),
  53:   Object.freeze({ value: "9", label: "Asmá’" }),
  55:   Object.freeze({ value: "11", label: "Mashíyyat" }),
  59:   Object.freeze({ value: "15", label: "Masá’il" }),
  61:   Object.freeze({ value: "17", label: "Sulṭán" }),
  63:   Object.freeze({ value: "ayyami-ha", label: "Ayyám-i-Há" }),
  64:   Object.freeze({ value: "19", label: "‘Alá’" }),

i18n/locales/sv.js (100 match(es)):
  9:     "meta.description": "En pastafarisk kalender med datumsökning och jämförelse.",
  13:     "nav.skip": "Hoppa till datumsökning",
  19:     "reverse.error.limitSafeInteger": "{field} ligger utanför intervallet för säkra heltal.",
  24:     "about.metaDescription": "En förklaring av Pastafari-kalendern: arbetsdagen och den efterfrågade dagen, år, kotletter, sammanvävda månader, dygnsgränsen och avancerad mekanik.",
  26:     "about.skip": "Gå till kalenderförklaringen",
  30:     "about.fallbackNotice": "Förklaringen finns inte på det valda språket just nu, så standardversionen visas.",
  31:     "about.loadError": "Kalenderförklaringen kunde inte läsas in.",
  36:     "search.kicker": "Datumsökning",
  39:     "search.calendarLabel": "Kalender för inmatning",
  42:     "settings.summary": "Alternativ för beräkning och jämförelse",
  44:     "settings.intro": "Arbetsdagen är beräkningens utgångspunkt. Som standard använder webbplatsen den aktuella Pastafari-dag som har bestämts för den aktiva observatörsplatsen.",
  45:     "settings.actionCalendarLabel": "Kalender för att ange arbetsdagen",
  ... 76 more match(es) omitted in this file
  253:     "reverse.constraint.min": "Minsta antal dagar (vänster − höger)",
  254:     "reverse.constraint.max": "Största antal dagar (vänster − höger)",
  255:     "reverse.options.heading": "Sökgränser",
  256:     "reverse.options.intro": "Lämna en gräns tom för att inte använda den. Ingen gräns tillämpas dolt.",
  257:     "reverse.options.maxSolutions": "Stoppa efter detta antal verifierade lösningar",
  262:     "reverse.error.input": "Vissa fält i den omvända sökningen saknas eller är ogiltiga.",
  263:     "reverse.error.range": "Intervallets slut får inte ligga före dess början.",
  266:     "reverse.calendar.label": "Kalender för detta absoluta datum",
  301:       "frankincense": "Rökelse",
  304:       "carob": "Johannesbröd",
  321:       "theClosedDoor": "Den stängda dörren",
  328:       "flour": "Mjöl",

i18n/locales/sr.js (5 match(es)):
  69:     "field.ayyamiHa": "Ayyám-i-Há",
  97:     "calendarInput.bahaiTehran": "Bahá’í — teheranska ravnodnevnica",
  98:     "calendarInput.bahaiWestern": "Bahá’í — zapadni aritmetički",
  105:     "calendarHelp.bahai": "Izaberite mesec po nazivu ili Ayyám-i-Há. Oblik sa teheranskom ravnodnevnicom podržava uobičajeni gregorijanski raspon 1844–3000.",
  156:     "guide.2.body": "U odeljku „Koji dan želite da pronađete?“ izaberite kalendar, popunite polja i izaberite „Prikaži datum“. Dostupni su gregorijanski, hebrejski, julijanski, islamski, persijski, kineski, hinduistički, Saka, tajlandski, etiopski, koptski, japanski, Minguo, Bahá’í i Majansko dugo brojanje.",

i18n/locales/ar.js (2 match(es)):
  69:     "field.ayyamiHa": "Ayyám-i-Há",
  105:     "calendarHelp.bahai": "اختر الشهر بالاسم أو Ayyám-i-Há. تدعم صيغة اعتدال طهران النطاق الغريغوري المتعارف عليه 1844–3000.",

i18n/locales/fy.js (15 match(es)):
  26:     "about.skip": "Gean nei de kalinderútlis",
  30:     "about.fallbackNotice": "De útlis is noch net beskikber yn de keazen taal, dêrom wurdt de default ferzje toand.",
  31:     "about.loadError": "De kalinderútlis koe net laden wurde.",
  44:     "settings.intro": "De hannelingsdei is it útgongspunt fan de berekkening. Standert brûkt de side de hjoeddeiske Pastafari-dei dy't foar it aktive waarnimmersplak bepaald is.",
  69:     "field.ayyamiHa": "Ayyám-i-Há",
  97:     "calendarInput.bahaiTehran": "Bahá’í — ekwinoks fan Teheran",
  98:     "calendarInput.bahaiWestern": "Bahá’í — westersk aritmetysk",
  101:     "calendarHelp.intl": "Dizze omsetting brûkt kalinderstipe dy't yn de browser ynboud is. As de browser de datum net werjaan kin, meldt de side dat dúdlik.",
  105:     "calendarHelp.bahai": "Kies de moanne op namme of Ayyám-i-Há. De foarm mei de Teheran-equinox stipet it gebrûklike Gregoriaanske berik 1844–3000.",
  154:     "guide.1.body": "Der is gjin registraasje of oanmelding en der wurdt gjin datum nei in server stjoerd. De grutte kop en de markearring yn de tegel meitsje hjoed dúdlik werkenber.",
  156:     "guide.2.body": "Kies by ‘Hokker dei wolle jo fine?’ in kalinder, folje de fjilden yn en selektearje ‘Datum toane’. Jo kinne ûnder mear kieze út Gregoriaansk, Hebriuwsk, Juliaansk, islamitysk, Perzysk, Sineesk, hindoeïstysk, Saka, Taisk, Etiopysk, Koptysk, Japansk, Minguo, Bahá’í en de Maya-lange telling.",
  167:     "guide.note": "Rigen en kolommen yn it tegelroaster binne allinnich in fisuele yndieling, gjin wiken. Yn de ferlikingstabel hat de útlijning wol betsjutting: elke rige is deselde frege dei.",
  172:     "reverse.heading": "Fyn in dei út syn Pastafari-datum",
  195:     "reverse.basic.toAdvancedHelp": "Rekursive Pastafari-berekkeningsdagen wurde as fariabelen en beheiningen foarsteld, sadat de keatling sûnder keunstmjittige djiptegrins útwreide wurde kin.",
  214:     "reverse.status.stale": "Dizze resultaten brûkten in eardere aktive berekkeningsdei. Fier it sykjen opnij út foar de hjoeddeiske dei.",

i18n/locales/tr.js (75 match(es)):
  9:     "meta.description": "Tarih arama ve karşılaştırma özellikli bir Pastafari takvimi.",
  14:     "app.intro": "Kullanılabilir herhangi bir takvimde bir gün bulun; ardından tam Pastafari tarihini ve onu içeren köfteyi görün.",
  24:     "about.metaDescription": "Pastafari Takvimi açıklaması: işlem günü ve sorgulanan gün, yıllar, köfteler, örülmüş aylar, gün sınırı ve ileri düzey mekanik.",
  25:     "about.intro": "Takvimin günleri, yılları, köfteleri, örülmüş ayları ve işlem gününü nasıl temsil ettiği.",
  27:     "about.back": "Takvime dön",
  30:     "about.fallbackNotice": "Açıklama henüz seçilen dilde mevcut değil; bu nedenle varsayılan sürüm gösteriliyor.",
  33:     "day.staleWarning": "Geçerli gün {previousDate} tarihinden {currentDate} tarihine değişti. İşlem günü geçerli gün olduğu için görüntülenen tarihler artık güncel değil. Bu iletiyi kapattıktan sonra yeniden hesaplanacaklar.",
  34:     "location.assumption": "(Aksini gösteren bir bilgi yoksa cihazın Kisurra’da olduğu varsayılır.)",
  38:     "search.intro": "Bir takvim seçin, bir tarih girin ve “Tarihi göster”i seçin. Varsayılan olarak alanlar güncel Pastafari günüyle doldurulur.",
  40:     "search.submit": "Tarihi göster",
  44:     "settings.intro": "İşlem günü hesaplamanın başlangıç noktasıdır. Varsayılan olarak site, etkin gözlemci konumu için belirlenen güncel Pastafari gününü kullanır.",
  47:     "settings.reset": "Bugüne dön",
  ... 51 more match(es) omitted in this file
  213:     "reverse.status.partialSolutions": "{count} doğrulanmış çözüm gösteriliyor; ancak arama tamamlanmadan durdu ve başka çözümler olabilir.",
  214:     "reverse.status.stale": "Bu sonuçlar önceki etkin işlem gününü kullandı. Geçerli günü kullanmak için aramayı yeniden çalıştırın.",
  218:     "reverse.result.heading": "Çözümler",
  219:     "reverse.result.solution": "Çözüm {index}",
  225:     "reverse.advanced.heading": "Kısıt sistemi çözücüsü",
  226:     "reverse.advanced.intro": "Tarih değişkenlerini ve aralarındaki ilişkileri tanımlayın. Sistem sonlu alanlara indirgenebildiğinde döngülere izin verilir.",
  228:     "reverse.variable.label": "Görünen ad",
  257:     "reverse.options.maxSolutions": "Bu kadar doğrulanmış çözümden sonra dur",
  263:     "reverse.error.range": "Aralık sonu aralık başlangıcından önce olamaz.",
  273:       "kidney": "Böbrek",
  276:       "fourPartsOfNine": "Dokuzun dört parçası",
  345:     "directionNumber": "Yön Sayısı",

i18n/locales/te.js (2 match(es)):
  69:     "field.ayyamiHa": "Ayyám-i-Há",
  105:     "calendarHelp.bahai": "నెలను పేరుతో లేదా Ayyám-i-Há ఎంచుకోండి. టెహ్రాన్ విషువత్ రూపం సాధారణ గ్రెగోరియన్ 1844–3000 పరిధిని మద్దతిస్తుంది.",

i18n/locales/ja.js (2 match(es)):
  69:     "field.ayyamiHa": "Ayyám-i-Há",
  105:     "calendarHelp.bahai": "月名またはAyyám-i-Háを選択します。テヘラン春分方式は、慣例上のグレゴリオ暦1844～3000年の範囲をサポートします。",

i18n/locales/kk.js (2 match(es)):
  69:     "field.ayyamiHa": "Ayyám-i-Há",
  105:     "calendarHelp.bahai": "Айды атауы бойынша немесе Ayyám-i-Há таңдаңыз. Теһран күн-түн теңелуіне негізделген нұсқа қалыпты Григориан 1844–3000 аралығын қолдайды.",

i18n/locales/eo.js (2 match(es)):
  73:     "field.ayyamiHa": "Ayyám-i-Há",
  110:     "calendarHelp.bahai": "Elektu la monaton laŭnome aŭ Ayyám-i-Há. La formo bazita sur la teherana ekvinokso subtenas la konvencian gregorian intervalon 1844–3000.",

i18n/locales/sq.js (5 match(es)):
  69:     "field.ayyamiHa": "Ayyám-i-Há",
  97:     "calendarInput.bahaiTehran": "Bahá’í — ekuinoksi i Teheranit",
  98:     "calendarInput.bahaiWestern": "Bahá’í — aritmetik perëndimor",
  105:     "calendarHelp.bahai": "Zgjidhni muajin sipas emrit ose Ayyám-i-Há. Forma e ekuinoksit të Teheranit mbështet diapazonin gregorian konvencional 1844–3000.",
  156:     "guide.2.body": "Te “Cilën ditë dëshironi të gjeni?”, zgjidhni një kalendar, plotësoni fushat e tij dhe zgjidhni “Shfaq datën”. Zgjedhjet përfshijnë Gregorian, Hebraik, Julian, Islamik, Persian, Kinez, Hindu, Saka, Tajlandez, Etiopik, Koptik, Japonez, Minguo, Bahá’í dhe Numërimin e Gjatë Maya.",

i18n/locales/hi.js (2 match(es)):
  69:     "field.ayyamiHa": "Ayyám-i-Há",
  105:     "calendarHelp.bahai": "महीने को नाम से या Ayyám-i-Há चुनें। तेहरान विषुव वाला रूप प्रचलित ग्रेगोरियन सीमा 1844–3000 का समर्थन करता है।",

[omitted 1826 match(es) in 61 file(s); see original output for full results]
```

</details>


---

<sub>3m 59s</sub>

### `rg`

**kótilett**

"kótilett" (artifacts/cross-repo-native-qa/runtime/repo2-0)

```
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/tests/NormativeOracle.elm:1773:                Debug.todo "Röð kótilettuskiptingar fór út fyrir löglegu fjölskylduna."
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/tests/NormativeOracle.elm:2068:        |> expectMaybe "Markdagurinn fannst ekki í neinni kótilettu."
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/STAGE_01_NORMATIVE_AUDIT.md:37:`calendarDateCanonical` skilar nákvæmlega fimm merkingarsviðum. `calendarDate` leysir aðeins kótilettu- og mánaðarvísitölur yfir í fryst íslensk heiti. Ekkert í `src/` flytur inn `NormativeOracle`, þannig að framleiðsluskelin getur ekki notað viðmiðunarvélina sem varaleið eða leiðréttingu.
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/STAGE_01_NORMATIVE_AUDIT.md:39:Við úttektina fannst Elm-sértæk þýðingarvilla í eldri drögum: fjögurra og fimm staka tuple-gildi höfðu verið notuð í stuðlatöflum og í innra vali kótilettuskiptingar. Elm leyfir ekki slík tuple. Þau voru skipt út fyrir nafngreind record-gildi án merkingarbreytingar. Engin fjögurra eða fleiri staka tuple er eftir í Elm-kóðanum.
/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/SPAGHETTI_DEVELOPMENT_HISTORY.md:7:Verkefnið var stofnað frá auðu tré fyrir Elm og íslensku. Sjálfstæður nákvæmur heiltölukjarni var skrifaður í Elm, staðlaða viðmiðunarvélin var endurgerð beint úr innbyggða viðmiðinu og sérstök hrein Elm-prófunarumgjörð var búin til. `SourceLanguageCatalog` var frystur með 17 kótilettum og 47 mánuðum.
```


---

<sub>4m 31s</sub>

### Copilot

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

---

<sub>Generated by [GitHub Copilot CLI](https://github.com/features/copilot/cli)</sub>
