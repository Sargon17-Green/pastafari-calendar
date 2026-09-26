# Copilot CLI Session

> [!NOTE]
> - **Session ID:** `4c196df7-616e-4515-92cc-072381d71791`  
> - **Started:** 9/26/2026, 7:18:04 PM  
> - **Duration:** 3m 45s  
> - **Exported:** 9/26/2026, 7:21:49 PM  

---

<sub>1s</sub>

### User

Þú ert óháður innfæddur mál-, merkingar-, skjala- og notendaviðmótsrýnir fyrir Pastafarian Calendar-verkefnið.

Markmið yfirferðarinnar er Íslenska (yfirferðarauðkenni er; staðfærsla/merki is-IS).

Öll samskipti á náttúrulegu máli í þessari yfirferð verða að vera á Íslensku. Fyrstu skilaboð notanda eru þessi þýdda fyrirmæli og allir náttúrulegir hlutar svara þíns verða áfram á Íslensku. Ekki skipta yfir í ensku. Nákvæm heiti geymslna, heiti útibúa, slóðir, auðkenni, kóðastrengir, formúlur, kjötkássar, API-heiti og áskilin véllesanleg niðurstöðulína eru undanskilin þessu.

Þetta er ný og einangruð rýnislotа. Hún er eingöngu fyrir yfirferð: ekki breyta, búa til, endurnefna eða eyða skrám í geymslunum.

Það eru tvær geymslur. Skoðaðu hvert viðeigandi yfirborð sem tilgreint er í staðbundnu yfirferðar-skránni:
1. Sargon17-Green/pastafari-calendar — þegar yfirferðareiningin er með staðfærslu vefsvæðis skaltu skoða ALLT vefsvæðið fyrir þá staðfærslu, ekki aðeins /about/. Lestu alla staðfærsluskrána og /about/-greinina og skoðaðu aðalnotendaviðmót, dagsetningarleit, val á dagatali, aðgerða-/vinnudagsstýringar, samanburð, ársýn, öfuga leit, stöður við hleðslu/tómt/ villu/staðfestingu, leiðarvísi, fót, lýsigögn/heiti, staðfærslu í manifest-skrá, noscript-/varaleiðir, ARIA-/aðgengisstrengi, tungumálaskipti og líklega úrelta varatexta. Athugaðu samning skilaboðalykla, merkingarhlutverk staðgengla, stöðug auðkenni og kanónískar kóðastrengi.
2. Sargon17-Green/Pastafarian-Calendar — skoðaðu ÖLL útibú sem eru skráð fyrir þessa yfirferðareiningu. Farðu yfir allan texta sem ætlaður er fólki: README og skjöl, fyrirsagnir/málsnið, útskýringaskýringar í skjölum, hjálpartexta fyrir CLI, ábendingar, villur, úttaksmerkingar, lýsigögn, dæmi og mynduð skjöl. Ekki þýða setningafræði forritunarmála, auðkenni, kjötkássa, formúlur, API-heiti eða kanóníska kóðastrengi.

Líttu sérstaklega eftir:
- skiljanlegum en óinnfæddum þýðingareinkennum;
- texta á röngu tungumáli, enskum leifum, varatexta úr nágrannamáli eða blönduðum ritkerfum;
- vandamálum í málfræði, beygingum, föllum, samræmi, orðaröð, stafsetningu, greinarmerkjasetningu, málfari og orðasamböndum;
- ósamræmi í hugtakanotkun milli notendaviðmóts vefsvæðisins, /about/ og útfærsluútibúa;
- tæknilega röngum þýðingum eða orðalagi sem breytir reikniritstengdum staðreyndum;
- staðgenglum sem eru notaðir í röngu merkingarhlutverki, jafnvel þótt mengi staðgengla passi;
- skemmdum Unicode, stöfum úr röngu ritkerfi, BiDi-vandamálum og vandamálum með RTL/LTR-greinarmerki þar sem það á við;
- lýsigögnum, heiti, ARIA, texta fyrir skjálesara, staðfærslu í manifest-skrá, varaleiðum og vandamálum án JavaScript;
- líklegri hættu á línuskiptingu/yfirflæði vegna texta á markmálinu. Síðasta atriðið er aðeins textatengt áhættumat og EKKI MÁ lýsa því sem sjónrænni yfirferð á birtri framsetningu.

Kanónískar óbreytanlegar reglur eru bindandi. Ekki leggja til að formúlur, kjötkássar, stöðug auðkenni hluta, API-auðkenni, nákvæmir kóðastrengir eða raunveruleg kanónísk heiti séu þýdd eða breytt eingöngu vegna stílsamræmis.

Samræmi milli geymslna er merkingarlegt, ekki endilega bókstaflegt. Mismunandi orðalag er leyfilegt þegar bæði form eru eðlileg og varðveita sama hugtak. Ef eitt form breytir tæknilegri merkingu skal tilkynna það.

Fyrir efnislega ólíkar útgáfur eða ritkerfi sem eru táknuð með aðskildum yfirferðareiningum skaltu aðeins fara yfir þá útgáfu sem nefnd er í þessum fyrirmælum og manifest-skránni.

Skráin artifacts/cross-repo-native-qa/runtime/review-manifest.json skal teljast bindandi um það hvaða yfirborð geymslnanna og hvaða nákvæmu frystu commit-SHA-gildi tilheyra þessari yfirferðareiningu. Ef útibú eða commit passar ekki við manifest-skrána skaltu gefa niðurstöðuna FAIL og tilkynna misræmið í stað þess að fara yfir breytilegt markmið.

FYRSTA lína svars þíns VERÐUR að vera nákvæmlega önnur hvor þessara lína:
NATIVE_QA_RESULT: PASS
NATIVE_QA_RESULT: FAIL

Eftir þá línu skaltu eingöngu skrifa Markdown-skýrslu á Íslensku. Hafðu eftirfarandi með:
- heildarniðurstöðu PASS/FAIL fyrir stranga málfræðilega og merkingarlega QA-yfirferð milli geymslna;
- hverja niðurstöðu með alvarleika (critical/high/medium/low), nákvæmri geymslu, útibúi, skrá og nákvæmri staðsetningu þegar hægt er, núverandi texta, útskýringu og ráðlagðri leiðréttingu;
- sérstakan hluta um rangt tungumál/varatexta;
- sérstakan hluta um samræmi í hugtakanotkun;
- sérstakan hluta um lýsigögn/ARIA/manifest/noscript/varaleiðir þegar staðfærsla vefsvæðis er til staðar;
- sérstakan hluta um skjöl og texta ætlaðan notendum í útfærsluútibúum;
- sérstakan hluta um textatengda áhættu á línuskiptingu/yfirflæði í notendaviðmóti þegar staðfærsla vefsvæðis er til staðar;
- ef enginn galli finnst skaltu taka það skýrt fram og tilgreina hvaða yfirborð þú skoðaðir í raun.

Ekki halda því fram að sjónræn yfirferð á birtri framsetningu, prófun á aðgengis-samskiptum, prófun á keyrslu án nettengingar/PWA, eða prófun á samskiptum í vafra hafi farið fram nema sérstök keyrslugögn liggi fyrir. Þessi lota er eingöngu málfræðileg og merkingarleg hlið innfæddrar málrýni.



---

<sub>5s</sub>

### `bash`

**Staðfestir stöðu og auðkenni geymslu**

$ git status --short --branch && git rev-parse HEAD && git remote -v

<details>
<summary>6 lines</summary>

```
## feature/about-i18n-72-locales...origin/feature/about-i18n-72-locales
?? artifacts/cross-repo-native-qa/runtime/
cd5325860fa2d2aa58abba31e207de27efe52e4d
origin	https://github.com/Sargon17-Green/pastafari-calendar (fetch)
origin	https://github.com/Sargon17-Green/pastafari-calendar (push)
<shellId: 0 completed with exit code 0>
```

</details>


---

<sub>5s</sub>

### `glob`

****/review-manifest.json**

"**/review-manifest.json"

```
./artifacts/cross-repo-native-qa/runtime/review-manifest.json
```


---

<sub>5s</sub>

### `bash` — Failed

**Skoðar systurgeymslur í vinnusvæðinu**

$ ls -la ..

```
Permission denied and could not request permission from user
```


---

<sub>8s</sub>

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
    "reviewed_head": "cd5325860fa2d2aa58abba31e207de27efe52e4d",
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
        "head_sha": "267a63bc08f4bdd9e26b1249ca20b356877dc816",
        "local_path": "/tmp/pastafari-cross-repo/repo2-0"
      }
    ]
  }
}
```

</details>


---

<sub>8s</sub>

### `glob`

****/*is***

"**/*is*"

<details>
<summary>56 matches</summary>

```
[glob: 47 path(s) under /home/runner/work/pastafari-calendar/pastafari-calendar; grouped by directory]

/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/ (21 path(s))
  about-i18n-native-sessions/is/is-review.md
  about-i18n-native-sessions/is/is-session.md
  about-i18n-qa/is.md
  cross-engine-50m/comparison.json
  stage5-cache-history-chronicle-public.err
  stage5-cache-history-chronicle-public.json
  update-08-stage-04-synthesis-report.md
  update-08-stage-04-synthesis-sha256sums.txt
  update-08-stage-04-synthesis.json
  update-08-stage-04a-history.json
  update-08-stage-04a-history.partial.json
  update-08-stage-04b-nested-isolation.json
  update-08-stage-07-fast-history.json
  update-08-stage-07-fast-history.tap
  update-08-stage-07-router-fix-ci-diagnosis.json
  update-08-stage-07-router-fix-ci-diagnosis.md
  update-10f-chinese-deterministic-engine-report.md
  update-10f-chinese-deterministic-engine.json
  update-15-random-witness-isolation-report.md
  update-15-random-witness-isolation-run.log
  update-15-random-witness-isolation.json

/home/runner/work/pastafari-calendar/pastafari-calendar/verification/ (10 path(s))
  evidence/extreme-performance-analysis-2026-08-19.json
  update7/run-cache-history-audit.mjs
  update8/run-stage-04a-history.mjs
  update8/run-stage-07-fast-history.mjs
  update15/random-witness-isolation-probe.mjs
  update15/run-random-witness-isolation.mjs
  update16/authority-registry.json
  update16/manual-discriminators.json
  update17/deterministic-rebuild-evidence.json
  update17/generated/hand-discriminators.json

/home/runner/work/pastafari-calendar/pastafari-calendar/test/ (5 path(s))
  docs-consistency.test.js
  memory-analysis.test.js
  update15-random-witness-isolation.test.js
  visual/baselines/comparison-en-desktop.png
  visual/baselines/comparison-en-mobile.png

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/ (4 path(s))
  about/content/is.html
  about/content/registry.js
  i18n/locales/is.js
  i18n/registry.js

/home/runner/work/pastafari-calendar/pastafari-calendar/scripts/ (3 path(s))
  docs-consistency.mjs
  run-update10f-chinese-deterministic-engine.mjs
  run-visual-regression.mjs

/home/runner/work/pastafari-calendar/pastafari-calendar/.github/ (2 path(s))
  workflows/about-native-linguistic-qa.yml
  workflows/visual.yml

/home/runner/work/pastafari-calendar/pastafari-calendar/implementations/ (2 path(s))
  cpp/CMakeLists.txt
  tests/historical-regression-vectors-16.json

[extensions: .json=16, .mjs=8, .md=7, .js=6, .txt=2, .yml=2, .png=2, .html=1]
```

</details>


---

<sub>8s</sub>

### `bash` — Failed

**Sækir tiltæk útibú og nýjasta commit**

$ git branch --all --no-color && git log -1 --format='%H%n%cs%n%s'

```
Permission denied and could not request permission from user
```


---

<sub>8s</sub>

### `bash` — Failed

**Athugar aðgang að útfærslug geymslu**

$ git -C ../Pastafarian-Calendar status --short --branch && git -C ../Pastafarian-Calendar rev-parse HEAD

```
Permission denied and could not request permission from user
```


---

<sub>12s</sub>

### `bash`

**Staðfestir fryst markmið vefgeymslunnar**

$ git status --short --branch && git rev-parse HEAD && git branch --show-current

```
## feature/about-i18n-72-locales...origin/feature/about-i18n-72-locales
?? artifacts/cross-repo-native-qa/runtime/
cd5325860fa2d2aa58abba31e207de27efe52e4d
feature/about-i18n-72-locales
<shellId: 4 completed with exit code 0>
```


---

<sub>12s</sub>

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

<sub>12s</sub>

### `glob`

****/***

"**/*" in src

<details>
<summary>197 matches</summary>

```
/home/runner/work/pastafari-calendar/pastafari-calendar/src/e7e4/edc2e77e115f6e487b5197e5a4da8f.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/25ae/4dc2c427efd15b835e3ad5e3f8199c.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/3eea/82c6d98c03da408aeb5f95f53dc3e6.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/1aa0/8b11273f8068cf613db6d5a959a5e6.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/fcf5/7ec76942ed150b9d67666c5b6e1ee7.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/b1c9/a4789a92543056bef412603b791403.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/8f5e/58085b9aa200bf7c75e3d86fcbeca7.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/a4c7/027cbdc38b6deafaf0ff254476a3e2.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/838e/c218bc41d66b6a107562f52eabe2af.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/9c5c/72d701cd4c59e33fe284ac2bb30b7f.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/4182/b4ec1666ea4ea848eaec258ab3c560.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/020b/9b69e8749cd7a881ee2063b64d2c5d.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/96c2/e179849e721dd68fd69a319913971c.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/e5f2/ee80e3e95df5295bf786183399b5b5.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/b7e8/37673ea536cb1d8a269a3eeac1cd32.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/4a29/8cd43f02cca55ba7aeebfe0422ee2e.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/d48e/56e15ea4185808d29b173ee9cbbdf3.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/2ba3/76c4357a6a9c63c118baf887a8752e.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/50f8/b4c51b06808c359937af8759a2b174.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/0bd9/685058fe105e94e60188dfbfc48e3a.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/448e/d558afd827addf362e1c10badbfb6b.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/e799/b9ff7a6b10442b47d312e8be1e5af4.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/4ceb/b71b399d7d3946ae6f61ac9fda5dbe.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/2eae/75e8b7f9e35d145983bdb013227962.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/25f4/de4b5ef6fd394ac55e01d55b5d3c78.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/2df0/3b2e9e08c9c3e1ac4f42beaa391ef6.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/9c11/b41fe6047de3dd7851d44953400c7c.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/9af3/b7189e88c8ad454aff060fb9fc63d1.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/9cba/0c08e0270d395c01f164fd0fb8c3d2.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/f96b/c31168824fd00f547671000492ca03.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/9581/a289ee6811fca65a78d5ccbe4e6f38.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/98ba/4acfc6d5d6533503541076ced43e10.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/b1f3/2f7173a273b77feac91c616ac2207e.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/0d2c/748e36cb8b8bcf8e67909502fe3725.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/0259/b0790f627f7067d79ae9544e6eb730.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/5efdcc3e6fb071cbaffdcb117507a169dd76.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/e4a7/36a41c9170ba71ecee44c1dc1727e4.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/7b04/8551b014332703288fab9e8e5ffd98.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/f6d4/6aabeb50b91d2f06c025cfcf06c6b0.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/a77b/dfbfc49455de7f0a8de799b00d953a.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/d220/5a0b5f016331fe0f9a71ad03003fc0.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/7a9b/3b78900a66816c954856c55eccc65b.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/a08d/da5091cab7277c40dda21eb0ee0a6a.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/c9c6/d373ccbca4305702f25d0c3f956c81.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/84cf/6a028524548b7d510a67fe27731668.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/4914/24f8646fc32212c6cad6bfdcb1e5a0.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/bc64/21a3e4a33c6d904e771d47e043684a.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/c4fa/6ddadf5bd93a31f145f6a091c13022.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/6e6f/b9ea08566375204ca97073207b2559.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/5dcb/728f93596c31adfc764307c334ddaf.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/2479/b035abb9402a7f1799d2f06a29150f.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/dc0d/841ae24d9e4a384b4e23ef3273da79.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/96b2/2fdc810c1f709de98d08c54975dc59.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/d323/0a6e9135464cb016a565baeaa8c520.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/2f0d/2258047134190fee73e76f73647fff.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/8d59/e8d4f90fe6e1d5ac3ae4ba9b266d71.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/678c/ed48160989bc596a1fe9c951249632.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/bc06/217dcfaafa4b4fc192cc5e67e8275a.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/8c83/1efc3aba8a7e2b27cc383526f2bb5d.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/7114/381cfe1eb9bf1957e6390f3ca03def.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/8675/7cffafeac0ef2d463ab136d156bbb2.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/5fab/ab7131abd53837085b87caf2327347.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/b1e8/4b9ac8de896dbef260a1e472803ba2.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/f579/f686069f6ebb0c194c943f39dd9875.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/b052/9b83870806b748dc7fc43e81d74a94.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/c0c0/4ea1223196a18105b0fa3a69480af9.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/c8c1/a21392c32455676b437a0b6ce7c4ae.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/e92d/17630a15618a7b0c074ba522aa0ba7.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/ed8a/8b66bdd29bd7205fa6e7b384a7f882.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/1413/ef020e3f4563eeb4497d032cb2a9ac.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/a922/39a0047152e8bd1ac9de98df872c0b.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/3cfd/1d76972ee2b071a439b61d2d8ffafc.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/46f9/004062eddef5c9fa96cea974593e15.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/7244/425fff92b21004963a482cfd07c1df.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/ABSTRACT.txt
/home/runner/work/pastafari-calendar/pastafari-calendar/src/cc17/10149c11c04e5897bbafa561941de0.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/c46e/59e7a252f6bc2c545488e9d580fbbf.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/d161/9f30a680cf86a79b6791c96db0293f.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/6f46/96c1bb64c272d419238834f68cf129.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/d740/101a8c3ed01243257565451ad48154.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/16f0/b61811da7741d8c2f22a5a955e8852.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/030f/d61b663d481ea6350bb0dfd5228e9a.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/5e13/77ab3a41e95e7c89d756655c0f351f.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/4d6b/4c7d9d82e46548d1f51348a7dc1efe.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/42db/354921f62f1902682534cac0605814.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/d827/9a0de5d15c7bffa0079630fb1eca30.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/7593/2836d9419e2de37f5957d580653360.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/be73/bd6294c9c6aa209fee09ed00448a65.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/f440/c6e7aeca90889d9a895edd4f652d18.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/3cb4/6d2b321bb4cf0a69418276b170ecb6.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/8343/17b80e43d5cba3156b4e729a7a6edf.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/8e03/7dc76018b7798b026b16af41e48f8a.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/1ccf/e358b0ee93adadee07decc8c860a6f.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/82b3/beb56210616625e3acf4475a761987.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/34ec/1b4b3573699e1d24f21ea44f5c4d23.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/68b0/eb4a79bfc50b1cafc38643d1ba6578.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/d099/a0e97b145ed9a5da62398667c80ba1.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/7231/2a494c6de2d357b0a0940a23a83099.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/161d/92778195a7241ae1ae3810e2b56524.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/8e6b/8c02ef313dd749e4eb11808fa81daf.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/891a/25400434276766a0f7842439fab287.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/3f9f/7202659c9f89b6fe65516422523ddd.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/7252/4d8a4eb2ee5934a2f5ca9043b323bd.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/f26d/cb446855a660135818adbcf5da41ef.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/d2ef/6fa129e8a0f0ce3a33cb2894fae56b.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/e4e3/05566337b6d9e505fac5b03597008f.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/6ebf/951a84ad9a08ad3001d04b77dee39c.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/0e5d/1ed56f3e4e58e3375009e33b90df05.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/a88a/a338e9e4cb92d79f67db17cbcee8ed.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/147b/7bb55e6962eb2a95e5a08eeb922995.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/d8c5/1a9e2b7999c2f5d97892f8effe1a6a.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/e4b4/4979f4c6f754dd019f93c7c77b77fb.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/6f3b/02cdfe24f0091208772593596801d5.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/acd1/027c3a42d572649a2d906424f53583.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/11e3/5444d3facef9b7bfd42ddf5babae9e.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/419e/3439438b7e10c9cd08aad5980c63c7.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/44f0/9d158f0ee0e37ce452726c0a89323f.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/d1eb/1201a7b21bbd98aaaff75eac0b9b89.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/a5fe/22dfd468a1bf8d17ce7d255540f6a1.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/ac10/03a8993301d3b65df509b18ce9722c.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/e9b2/5e00b22e424aa0580ebf27614790f0.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/7020/86fb3d59c981482d389e15a38f2b32.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/d3b3/85876532c9f22058173b9a8c7ba6b0.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/bfe6/ea05a79d3e9802be67d325b6b0bf40.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/8ab8/958319c37033ca1a86c68db525435d.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/269c/a241707d6070c6912b30bc72c96277.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/d7cc/71171bb30b5e447d3b1600c78116e7.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/8f41/00a93d51e50c4996d5182c08e6fc61.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/public-api.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/cfe1/458629c7e5f31f9af7c142c2e45292.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/1246/609d5c174eaaa00fd8ed893c3075b7.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/831d/29ae82fe9081825d817f908cce5cbc.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/1581/5e46524fd1c29a04cf2f4c48cf0b31.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/0fb1/0ec0a2ba7d5bcc00d8b54a80238a7f.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/ae3c/670ee8ebc6fd503479b49d511f8472.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/3866/872d2742cfba7d239d3dcacbe24eea.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/7561/ec029d89e763a58f4c054150bbd44e.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/c989/3b154e2f32a695058c6749a28d40eb.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/d871/e09f70187b2a4e76a2834b1767622d.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/36b5/bcc80f6d5cfafa82df738a38356e7d.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/a94b/49fa53ee8dee50d72cc0f9c032344c.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/365e/b264b3ff2b21d551066feb5c9ce3f9.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/5fad/abcaef491fede59c778df8ea97b951.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/1e62/5fc5eb1393b92978c0bcaffb099b65.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/058f/c7daac233f65696806ba032139ed10.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/469d/82411197dd266518f07ad2847585b6.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/071e/b5158c3ed4c67585e78f0e80cd047e.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/411a/d0f4fa2c78d89def49b010488138bf.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/cc82/fd61540ea5cf7021d43f853d4e9ce3.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/2deb/5a06a86e84b23fd61343f20ac7b43d.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/e6e8/7d7718e2d96233e30dd0abd9923ace.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/502c/0051f4a39974fa7def8ba2922129af.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/4fab/c07f030c33a9331309dc673c8b66f3.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/24a2/cac3d1da41ec248ef2a695235cf1b3.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/1e5d/1373fda62fa1a336307416d3d39784.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/0fec/83e574d4637be1b428a2bc3e3de4aa.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/bf90/0fa2ca27a61582b3c70eba25b6ef2a.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/2e10/118b5507b0ce34d32eaa10ec6bd500.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/32c6/c93eabb24a105e5a031bdbddc6dd72.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/4d92/8be810eed6007e522f0ca5aaf77477.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/60e5/08b88915bf43e461578e924d4e3cb1.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/4c03/c141c731d3c19d391127d001451a7c.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/0ef1/3df9e50dcaf579310e91e0c1067dea.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/a510/14a1eb82075c9617cf7de4ce0194a0.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/2f69/1746c40bccc44656e851c3f6f574c8.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/b80c/cf634fcdb93bd63f041c67a868ed9f.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/38e2/733ea707a335a26f617e34be742f52.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/8637/3a68685cff5c2849e26c602b972572.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/93f3/046cd8665afa1e0b3dcc27e9e29182.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/f2d3/6c3e6979d9dd50fba76e568369e3df.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/3311/98cb376fccbb0467672ef4511414c6.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/5775/1e309a9125b998ae215cf5e86d89e1.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/7099/3f2d8b8aabc5edd8767134603c45e6.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/e9a3/44b696b004a2ca479fe8c2c2076d40.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/f03a/a37c9efc1f884ba97d1b36affaecc8.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/chinese-calendrica-detour.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/976c/1c1cec914fce836fc0357ee7a15b4c.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/ba9e/4cb4d4159c21f5b3f4f2eac560dd41.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/eadb/ea2ee4e65ef22d5efd8bc53da77888.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/208f/83c89ffdd933061ac2b70698ea5a8a.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/408b/56fd2de5cee6fb6026738e34659676.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/de0f/a7e3d364bb65dc6b5ff343a19eec4e.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/fcc7/4806afa0732e41d862da1b091afdc3.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/781f/f887eaacdff878d58133bd42dc119c.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/9b96/0395a3698cc1656a325206115b3356.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/f572/bc5ad92a07ed1568fd77d7e478171c.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/d972/d0d89b228ae5aff03abcc5a24f8095.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/f917/1a019c2bf64b7bb1928b9f93835f60.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/9161/8b09004d3f422c1936faa566355c92.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/2ff3/17c553f676bc5ee29d7648d6dbcaa4.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/0431/53417ca89cce0375c01867f3c5f7d8.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/8da1/6210c536c78b07976d79b7aa633aab.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/27c8/9acce4324b5d2f6a63f7419c452bbc.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/caf6/470e96ca57dc38b54d17984a8f3ede.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/c050/1f5788cf7f726045927b81dc43fadb.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/c31d/454b4ee90532adea3ced3858ad8d7b.js
/home/runner/work/pastafari-calendar/pastafari-calendar/src/5002/a34b23d23dff52f910b1c11a00480c.js
```

</details>


---

<sub>12s</sub>

### `glob` — Failed

****/***

"**/*" in public

```
rg: /home/runner/work/pastafari-calendar/pastafari-calendar/public: IO error for operation on /home/runner/work/pastafari-calendar/pastafari-calendar/public: No such file or directory (os error 2)
```


---

<sub>12s</sub>

### `bash` — Failed

**Staðfestir fryst markmið útfærslug geymslunnar**

$ git -C /tmp/pastafari-cross-repo/repo2-0 status --short --branch && git -C /tmp/pastafari-cross-repo/repo2-0 rev-parse HEAD && git -C /tmp/pastafari-cross-repo/repo2-0 branch --show-current

```
Permission denied and could not request permission from user
```


---

<sub>20s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js

```
File too large to read at once (22.9 KB). Consider using the grep tool to search within the file, or view with view_range to read specific sections.
```


---

<sub>20s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html

```
File too large to read at once (33.8 KB). Consider using the grep tool to search within the file, or view with view_range to read specific sections.
```


---

<sub>20s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/index.html.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/index.html

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
      <div class="noscript">
        <p><strong>JavaScript</strong> <span aria-hidden="true">⚠</span></p>
      </div>
    </noscript>
  </body>
</html>

```


---

<sub>20s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/app.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/app.js (lines 1-280)

<details>
<summary>254 lines</summary>

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
import {
  calendarLabel,
  getLocale,
  loadLocale,
  messageTemplate,
  translate,
} from "./i18n/registry.js?v=20-about-i18n";
import {
  KISURRA_OBSERVER,
  requestObserverLocation,
  resolveObserverLocation,
  watchObserverPermission,
} from "./observer-location.js?v=10-venus-day-boundary";
import { currentDayAt } from "./venus-day-boundary.js?v=10-venus-day-boundary";
import { createReverseSearchUi } from "./reverse-ui.js?v=21-about-i18n";
import {
  applyDocumentLocale,
  persistLanguage,
  populateLanguageSelector,
  resolveBrowserLocale,
  urlWithLanguage,
} from "./i18n/runtime.js?v=20-about-i18n";


const ASSET_REVISION = "9-worker-api-sync";
const DESKTOP_COMPARISON_QUERY = "(min-width: 1000px)";
const worker = new Worker(
  new URL(`./engine/pastafari-fast-worker.js?v=${ASSET_REVISION}`, import.meta.url),
  { type: "module", name: "pastafari-fast" },
);
const pending = new Map();
let requestId = 0;
let activeLocale = await loadLocale(resolveBrowserLocale().locale.code);
let numberFormatter = null;
let dateFormatter = null;
let lastVisibleErrorKey = null;
let viewLoadSequence = 0;
let committedViewLoadSequence = 0;
let comparisonLoadSequence = 0;
let observerLocation = KISURRA_OBSERVER;
let reverseUi = null;
let state = {
  targetJdn: null,
  viewAnchorJdn: null,
  calculationJdn: null,
  comparisonJdn: null,
  comparisonFollowsNextAction: true,
  comparisonEnabled: false,
  targetFollowsCurrentDay: true,
  calculationFollowsCurrentDay: true,
  currentDayDate: null,
  currentDayJdn: null,
  view: null,
  comparisonDays: null,
  yearStructure: null,
  yearStructureFailed: false,
};

const elements = Object.fromEntries(
  [...document.querySelectorAll("[id]")].map((element) => [element.id, element]),
);

const formConfigurations = Object.freeze({
  target: Object.freeze({
    form: elements["target-search-form"],
    select: elements["target-calendar"],
    fields: elements["target-date-fields"],
    help: elements["target-date-help"],
    error: elements["target-form-error"],
    errorKey: "search.invalid",
  }),
  action: Object.freeze({
    form: elements["action-date-form"],
    select: elements["action-calendar"],
    fields: elements["action-date-fields"],
    help: elements["action-date-help"],
    error: elements["action-form-error"],
    errorKey: "settings.invalid",
  }),
  comparison: Object.freeze({
    form: elements["comparison-date-form"],
    select: elements["comparison-calendar"],
    fields: elements["comparison-date-fields"],
    help: elements["comparison-date-help"],
    error: elements["comparison-form-error"],
    errorKey: "comparison.invalid",
  }),
});

function rebuildFormatters() {
  numberFormatter = new Intl.NumberFormat(activeLocale.intlLocale, { useGrouping: true });
  dateFormatter = new Intl.DateTimeFormat(activeLocale.intlLocale, {
    calendar: "gregory",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

function t(key, values = {}) {
  return translate(activeLocale, key, values);
}

function localizedError(key, cause = null) {
  const error = new Error(key);
  error.translationKey = key;
  error.cause = cause;
  return error;
}

function workerRequest(operation, payload, timeoutMs = 120_000) {
  const id = ++requestId;
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      pending.delete(id);
      reject(localizedError("error.timeout"));
    }, timeoutMs);
    pending.set(id, { resolve, reject, timer });
    worker.postMessage({ id, operation, payload });
  });
}

worker.addEventListener("message", (event) => {
  const message = event.data;
  if (!Number.isSafeInteger(message?.id)) return;
  const entry = pending.get(message.id);
  if (!entry) return;
  pending.delete(message.id);
  clearTimeout(entry.timer);
  if (message.ok) entry.resolve(message.result);
  else entry.reject(localizedError("error.engineFailed", message.error));
});

worker.addEventListener("error", (event) => {
  showError(localizedError("error.engineLoadFailed", event.message));
});

function currentDaySnapshot(now = new Date()) {
  const snapshot = currentDayAt(now, observerLocation);
  return Object.freeze({
    ...snapshot,
    date: jdnToGregorian(snapshot.jdn),
  });
}

function formatLocalDate(date) {
  const year = Number(date.year);
  if (Number.isSafeInteger(year) && year >= 1 && year <= 9999) {
    const value = new Date(0);
    value.setHours(12, 0, 0, 0);
    value.setFullYear(year, date.month - 1, date.day);
    return dateFormatter.format(value);
  }
  return `${formatInteger(date.year)}-${String(date.month).padStart(2, "0")}-${String(date.day).padStart(2, "0")}`;
}

function formatJdnAsGregorian(jdn) {
  return formatLocalDate(jdnToGregorian(jdn));
}

function formatInteger(value) {
  return numberFormatter.format(BigInt(value));
}

function readBigIntParameter(params, name) {
  const value = params.get(name);
  return value !== null && /^[+-]?\d+$/.test(value) ? BigInt(value) : null;
}

function historyUrl() {
  const url = new URL(location.href);
  for (const name of ["t", "v", "c", "c2", "compare", "today", "ctoday"]) {
    url.searchParams.delete(name);
  }
  url.searchParams.set("t", state.targetJdn.toString());
  url.searchParams.set("v", state.viewAnchorJdn.toString());
  url.searchParams.set("c", state.calculationJdn.toString());
  if (state.targetFollowsCurrentDay) url.searchParams.set("today", "1");
  if (state.calculationFollowsCurrentDay) url.searchParams.set("ctoday", "1");
  if (state.comparisonEnabled) {
    url.searchParams.set("compare", "1");
    url.searchParams.set("c2", state.comparisonJdn.toString());
  }
  return url;
}

function writeHistory({ replace = false } = {}) {
  history[replace ? "replaceState" : "pushState"]({ pastafari: true }, "", historyUrl());
}

const MONTH_BASE_PALETTE = Object.freeze([
  Object.freeze({ background: "#FFD400", ink: "#000000" }),
  Object.freeze({ background: "#001B7A", ink: "#FFFFFF" }),
  Object.freeze({ background: "#00E5FF", ink: "#000000" }),
  Object.freeze({ background: "#650000", ink: "#FFFFFF" }),
  Object.freeze({ background: "#7CFF00", ink: "#000000" }),
  Object.freeze({ background: "#4B007D", ink: "#FFFFFF" }),
  Object.freeze({ background: "#FF8A00", ink: "#000000" }),
  Object.freeze({ background: "#004F3A", ink: "#FFFFFF" }),
  Object.freeze({ background: "#FF72D2", ink: "#000000" }),
  Object.freeze({ background: "#5A2600", ink: "#FFFFFF" }),
  Object.freeze({ background: "#7AD7FF", ink: "#000000" }),
  Object.freeze({ background: "#003F5C", ink: "#FFFFFF" }),
]);

const MONTH_PATTERNS = Object.freeze([
  Object.freeze({ image: "repeating-linear-gradient(45deg, var(--month-pattern) 0 11px, transparent 11px 24px)", size: "auto" }),
  Object.freeze({ image: "repeating-linear-gradient(-45deg, var(--month-pattern) 0 11px, transparent 11px 24px)", size: "auto" }),
  Object.freeze({ image: "repeating-linear-gradient(0deg, var(--month-pattern) 0 8px, transparent 8px 23px)", size: "auto" }),
  Object.freeze({ image: "repeating-linear-gradient(90deg, var(--month-pattern) 0 8px, transparent 8px 23px)", size: "auto" }),
  Object.freeze({ image: "radial-gradient(circle, var(--month-pattern) 0 7px, transparent 7.5px)", size: "28px 28px" }),
  Object.freeze({ image: "conic-gradient(from 90deg, var(--month-pattern) 25%, transparent 0 50%, var(--month-pattern) 0 75%, transparent 0)", size: "30px 30px" }),
  Object.freeze({ image: "linear-gradient(var(--month-pattern) 6px, transparent 6px), linear-gradient(90deg, var(--month-pattern) 6px, transparent 6px)", size: "30px 30px" }),
]);

function hexToRgb(hex) {
  return [1, 3, 5].map((offset) => Number.parseInt(hex.slice(offset, offset + 2), 16));
}

function relativeLuminance([red, green, blue]) {
  const linear = [red, green, blue].map((channel) => {
    const value = channel / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}
function contrastRatio(luminanceA, luminanceB) {
  const lighter = Math.max(luminanceA, luminanceB);
  const darker = Math.min(luminanceA, luminanceB);
  return (lighter + 0.05) / (darker + 0.05);
}

function monthColors(index) {
  const palette = MONTH_BASE_PALETTE[index % MONTH_BASE_PALETTE.length];
  const pattern = MONTH_PATTERNS[index % MONTH_PATTERNS.length];
  const inkLuminance = palette.ink === "#000000" ? 0 : 1;
  if (contrastRatio(relativeLuminance(hexToRgb(palette.background)), inkLuminance) < 7) {
    throw new Error("Month palette contrast invariant failed.");
  }
  return {
    background: palette.background,
    textBackground: palette.background,
    edge: palette.ink,
    ink: palette.ink,
    patternColor: palette.ink === "#000000" ? "#FFFFFF" : "#000000",
    patternImage: pattern.image,
    patternSize: pattern.size,
  };
}

function localizedCutlet(index) {
  return calendarLabel(activeLocale, "cutlet", index);
}

function localizedMonth(index) {
  return calendarLabel(activeLocale, "month", index);
}

function appendRichTemplate(element, key, values, emphasizedKeys) {
  const template = messageTemplate(activeLocale, key);
  const emphasized = new Set(emphasizedKeys);
  const nodes = [];
  let cursor = 0;
  const pattern = /\{([A-Za-z0-9_.-]+)\}/g;
  let match;
  while ((match = pattern.exec(template)) !== null) {
    if (match.index > cursor) nodes.push(document.createTextNode(template.slice(cursor, match.index)));
```

</details>


---

<sub>20s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/registry.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/registry.js

```
File too large to read at once (29.6 KB). Consider using the grep tool to search within the file, or view with view_range to read specific sections.
```


---

<sub>20s</sub>

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

<sub>20s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/manifest.webmanifest.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/manifest.webmanifest

```
File too large to read at once (24.9 KB). Consider using the grep tool to search within the file, or view with view_range to read specific sections.
```


---

<sub>20s</sub>

### `github-mcp-server-get_file_contents`

**/**

<details>
<summary>Arguments</summary>

```json
{
  "owner": "Sargon17-Green",
  "repo": "Pastafarian-Calendar",
  "ref": "refs/heads/Elm+íslensku",
  "path": "/"
}
```

</details>

```
[{"type":"dir","size":0,"name":".github","path":".github","sha":"4fc04cc0c20a0272eb5b3887b7f9acd08f839b9b","url":"https://api.github.com/repos/Sargon17-Green/Pastafarian-Calendar/contents/.github?ref=267a63bc08f4bdd9e26b1249ca20b356877dc816","git_url":"https://api.github.com/repos/Sargon17-Green/Pastafarian-Calendar/git/trees/4fc04cc0c20a0272eb5b3887b7f9acd08f839b9b","html_url":"https://github.com/Sargon17-Green/Pastafarian-Calendar/tree/267a63bc08f4bdd9e26b1249ca20b356877dc816/.github"},{"type":"file","size":106,"name":"CANONICAL_NAMES_LOCK.sha256","path":"CANONICAL_NAMES_LOCK.sha256","sha":"f67f0c55ca63ea0591b3e0635661799c75d45edf","url":"https://api.github.com/repos/Sargon17-Green/Pastafarian-Calendar/contents/CANONICAL_NAMES_LOCK.sha256?ref=267a63bc08f4bdd9e26b1249ca20b356877dc816","git_url":"https://api.github.com/repos/Sargon17-Green/Pastafarian-Calendar/git/blobs/f67f0c55ca63ea0591b3e0635661799c75d45edf","html_url":"https://github.com/Sargon17-Green/Pastafarian-Calendar/blob/267a63bc08f4bdd9e26b1249ca20b356877dc816/CANONICAL_NAMES_LOCK.sha256","download_url":"https://raw.githubusercontent.com/Sargon17-Green/Pastafarian-Calendar/267a63bc08f4bdd9e26b1249ca20b356877dc816/CANONICAL_NAMES_LOCK.sha256"},{"type":"file","size":625,"name":"DEVELOPMENT_STAGE.md","path":"DEVELOPMENT_STAGE.md","sha":"2e267c994102fd13105d3cf06dfbcb50206bac45","url":"https://api.github.com/repos/Sargon17-Green/Pastafarian-Calendar/contents/DEVELOPMENT_STAGE.md?ref=267a63bc08f4bdd9e26b1249ca20b356877dc816","git_url":"https://api.github.com/repos/Sargon17-Green/Pastafarian-Calendar/git/blobs/2e267c994102fd13105d3cf06dfbcb50206bac45","html_url":"https://github.com/Sargon17-Green/Pastafarian-Calendar/blob/267a63bc08f4bdd9e26b1249ca20b356877dc816/DEVELOPMENT_STAGE.md","download_url":"https://raw.githubusercontent.com/Sargon17-Green/Pastafarian-Calendar/267a63bc08f4bdd9e26b1249ca20b356877dc816/DEVELOPMENT_STAGE.md"},{"type":"file","size":1242,"name":"LICENSE","path":"LICENSE","sha":"121ab14bf688a5634ef7d32f86698c44dca5c4b3","url":"https://api.github.com/repos/Sargon17-Green/Pastafarian-Calendar/contents/LICENSE?ref=267a63bc08f4bdd9e26b1249ca20b356877dc816","git_url":"https://api.github.com/repos/Sargon17-Green/Pastafarian-Calendar/git/blobs/121ab14bf688a5634ef7d32f86698c44dca5c4b3","html_url":"https://github.com/Sargon17-Green/Pastafarian-Calendar/blob/267a63bc08f4bdd9e26b1249ca20b356877dc816/LICENSE","download_url":"https://raw.githubusercontent.com/Sargon17-Green/Pastafarian-Calendar/267a63bc08f4bdd9e26b1249ca20b356877dc816/LICENSE"},{"type":"file","size":3849,"name":"README.md","path":"README.md","sha":"e8de67509a5aecc9ba9563553d9e4e87fd85a305","url":"https://api.github.com/repos/Sargon17-Green/Pastafarian-Calendar/contents/README.md?ref=267a63bc08f4bdd9e26b1249ca20b356877dc816","git_url":"https://api.github.com/repos/Sargon17-Green/Pastafarian-Calendar/git/blobs/e8de67509a5aecc9ba9563553d9e4e87fd85a305","html_url":"https://github.com/Sargon17-Green/Pastafarian-Calendar/blob/267a63bc08f4bdd9e26b1249ca20b356877dc816/README.md","download_url":"https://raw.githubusercontent.com/Sargon17-Green/Pastafarian-Calendar/267a63bc08f4bdd9e26b1249ca20b356877dc816/README.md"},{"type":"file","size":1674,"name":"SOURCE_LANGUAGE_CATALOG.md","path":"SOURCE_LANGUAGE_CATALOG.md","sha":"42806fa5011c2afb11db7a5e1d1925bf39e246ac","url":"https://api.github.com/repos/Sargon17-Green/Pastafarian-Calendar/contents/SOURCE_LANGUAGE_CATALOG.md?ref=267a63bc08f4bdd9e26b1249ca20b356877dc816","git_url":"https://api.github.com/repos/Sargon17-Green/Pastafarian-Calendar/git/blobs/42806fa5011c2afb11db7a5e1d1925bf39e246ac","html_url":"https://github.com/Sargon17-Green/Pastafarian-Calendar/blob/267a63bc08f4bdd9e26b1249ca20b356877dc816/SOURCE_LANGUAGE_CATALOG.md","download_url":"https://raw.githubusercontent.com/Sargon17-Green/Pastafarian-Calendar/267a63bc08f4bdd9e26b1249ca20b356877dc816/SOURCE_LANGUAGE_CATALOG.md"},{"type":"file","size":2272,"name":"SPAGHETTI_DEVELOPMENT_HISTORY.md","path":"SPAGHETTI_DEVELOPMENT_HISTORY.md","sha":"04961324852e086e6671203c26d8156aac022f7b","url":"https://api.github.com/repos/Sargon17-Green/Pastafarian-Calendar/contents/SPAGHETTI_DEVELOPMENT_HISTORY.md?ref=267a63bc08f4bdd9e26b1249ca20b356877dc816","git_url":"https://api.github.com/repos/Sargon17-Green/Pastafarian-Calendar/git/blobs/04961324852e086e6671203c26d8156aac022f7b","html_url":"https://github.com/Sargon17-Green/Pastafarian-Calendar/blob/267a63bc08f4bdd9e26b1249ca20b356877dc816/SPAGHETTI_DEVELOPMENT_HISTORY.md","download_url":"https://raw.githubusercontent.com/Sargon17-Green/Pastafarian-Calendar/267a63bc08f4bdd9e26b1249ca20b356877dc816/SPAGHETTI_DEVELOPMENT_HISTORY.md"},{"type":"file","size":794,"name":"STAGE_01_EXECUTION_STATUS.txt","path":"STAGE_01_EXECUTION_STATUS.txt","sha":"e687ab5616c312fef2024702e220f00813b57615","url":"https://api.github.com/repos/Sargon17-Green/Pastafarian-Calendar/contents/STAGE_01_EXECUTION_STATUS.txt?ref=267a63bc08f4bdd9e26b1249ca20b356877dc816","git_url":"https://api.github.com/repos/Sargon17-Green/Pastafarian-Calendar/git/blobs/e687ab5616c312fef2024702e220f00813b57615","html_url":"https://github.com/Sargon17-Green/Pastafarian-Calendar/blob/267a63bc08f4bdd9e26b1249ca20b356877dc816/STAGE_01_EXECUTION_STATUS.txt","download_url":"https://raw.githubusercontent.com/Sargon17-Green/Pastafarian-Calendar/267a63bc08f4bdd9e26b1249ca20b356877dc816/STAGE_01_EXECUTION_STATUS.txt"},{"type":"file","size":4443,"name":"STAGE_01_NORMATIVE_AUDIT.md","path":"STAGE_01_NORMATIVE_AUDIT.md","sha":"acf95aa6efe3988b28cd9cd9be877b02f49b2a47","url":"https://api.github.com/repos/Sargon17-Green/Pastafarian-Calendar/contents/STAGE_01_NORMATIVE_AUDIT.md?ref=267a63bc08f4bdd9e26b1249ca20b356877dc816","git_url":"https://api.github.com/repos/Sargon17-Green/Pastafarian-Calendar/git/blobs/acf95aa6efe3988b28cd9cd9be877b02f49b2a47","html_url":"https://github.com/Sargon17-Green/Pastafarian-Calendar/blob/267a63bc08f4bdd9e26b1249ca20b356877dc816/STAGE_01_NORMATIVE_AUDIT.md","download_url":"https://raw.githubusercontent.com/Sargon17-Green/Pastafarian-Calendar/267a63bc08f4bdd9e26b1249ca20b356877dc816/STAGE_01_NORMATIVE_AUDIT.md"},{"type":"file","size":4398,"name":"STAGE_01_OWNERSHIP_AUDIT.md","path":"STAGE_01_OWNERSHIP_AUDIT.md","sha":"d545071729af88f0961131e62520252f3a8f5a31","url":"https://api.github.com/repos/Sargon17-Green/Pastafarian-Calendar/contents/STAGE_01_OWNERSHIP_AUDIT.md?ref=267a63bc08f4bdd9e26b1249ca20b356877dc816","git_url":"https://api.github.com/repos/Sargon17-Green/Pastafarian-Calendar/git/blobs/d545071729af88f0961131e62520252f3a8f5a31","html_url":"https://github.com/Sargon17-Green/Pastafarian-Calendar/blob/267a63bc08f4bdd9e26b1249ca20b356877dc816/STAGE_01_OWNERSHIP_AUDIT.md","download_url":"https://raw.githubusercontent.com/Sargon17-Green/Pastafarian-Calendar/267a63bc08f4bdd9e26b1249ca20b356877dc816/STAGE_01_OWNERSHIP_AUDIT.md"},{"type":"file","size":296,"name":"elm.json","path":"elm.json","sha":"233e835b316b59612fbdd3f550311a53e8967c13","url":"https://api.github.com/repos/Sargon17-Green/Pastafarian-Calendar/contents/elm.json?ref=267a63bc08f4bdd9e26b1249ca20b356877dc816","git_url":"https://api.github.com/repos/Sargon17-Green/Pastafarian-Calendar/git/blobs/233e835b316b59612fbdd3f550311a53e8967c13","html_url":"https://github.com/Sargon17-Green/Pastafarian-Calendar/blob/267a63bc08f4bdd9e26b1249ca20b356877dc816/elm.json","download_url":"https://raw.githubusercontent.com/Sargon17-Green/Pastafarian-Calendar/267a63bc08f4bdd9e26b1249ca20b356877dc816/elm.json"},{"type":"dir","size":0,"name":"src","path":"src","sha":"f13afaa020261458f833d1e8a5287d1f417659f3","url":"https://api.github.com/repos/Sargon17-Green/Pastafarian-Calendar/contents/src?ref=267a63bc08f4bdd9e26b1249ca20b356877dc816","git_url":"https://api.github.com/repos/Sargon17-Green/Pastafarian-Calendar/git/trees/f13afaa020261458f833d1e8a5287d1f417659f3","html_url":"https://github.com/Sargon17-Green/Pastafarian-Calendar/tree/267a63bc08f4bdd9e26b1249ca20b356877dc816/src"},{"type":"dir","size":0,"name":"tests","path":"tests","sha":"b64223b4372d71de67e22d59f62a1527e5036fc7","url":"https://api.github.com/repos/Sargon17-Green/Pastafarian-Calendar/contents/tests?ref=267a63bc08f4bdd9e26b1249ca20b356877dc816","git_url":"https://api.github.com/repos/Sargon17-Green/Pastafarian-Calendar/git/trees/b64223b4372d71de67e22d59f62a1527e5036fc7","html_url":"https://github.com/Sargon17-Green/Pastafarian-Calendar/tree/267a63bc08f4bdd9e26b1249ca20b356877dc816/tests"}]
```


---

<sub>28s</sub>

### `bash`

**Mælir lengd staðfærsluflata vefsvæðisins**

$ wc -l docs/i18n/locales/is.js docs/about/content/is.html docs/index.html docs/app.js docs/reverse-ui.js docs/reverse-search-controller.js docs/i18n/runtime.js docs/sw.js docs/manifest.webmanifest

<details>
<summary>11 lines</summary>

```
351 docs/i18n/locales/is.js
   331 docs/about/content/is.html
   203 docs/index.html
  1185 docs/app.js
  1148 docs/reverse-ui.js
   229 docs/reverse-search-controller.js
    71 docs/i18n/runtime.js
   279 docs/sw.js
  1113 docs/manifest.webmanifest
  4910 total
<shellId: 6 completed with exit code 0>
```

</details>


---

<sub>28s</sub>

### `github-mcp-server-get_file_contents`

**README.md**

<details>
<summary>Arguments</summary>

```json
{
  "owner": "Sargon17-Green",
  "repo": "Pastafarian-Calendar",
  "ref": "267a63bc08f4bdd9e26b1249ca20b356877dc816",
  "path": "README.md"
}
```

</details>

<details>
<summary>25 lines</summary>

````
successfully downloaded text file (SHA: e8de67509a5aecc9ba9563553d9e4e87fd85a305)# Pastafaríska tímatalan — Elm og íslenska

Þetta verkefni er sjálfstæð grunnsmíð Stage 1 fyrir Elm-línuna með íslensku sem eina mannlega frumtextamálið. Verkefnið var stofnað frá auðu tré og notar engin forrit, prófanir, niðurstöður, töflur, skyndiminni, rekjanir eða gátreikninga úr annarri útfærslu.

## Innihald Stage 1

`Pastafari.ExactInt` veitir nákvæman heiltölureikning með ótakmarkaðri stærð, skrifaðan í Elm. `NormativeOracle` er prófunar-eingöngu bein útfærsla á innbyggða staðlaða viðmiðinu. `Pastafari.SourceLanguageCatalog` frystir 17 kótilettunöfn og 47 mánaðanöfn með föstum `canonicalIndex`. `Pastafari.MonsterBase` er aðeins hlutlaus grunnur fyrir samhengi, stýringu, staðfestingu og mælingar. `Pastafari.Spaghetti` inniheldur enn enga eldri villuleið og enga leiðréttingarrökfræði úr síðari stigum.

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

<sub>28s</sub>

### `github-mcp-server-get_file_contents`

**src**

<details>
<summary>Arguments</summary>

```json
{
  "owner": "Sargon17-Green",
  "repo": "Pastafarian-Calendar",
  "ref": "267a63bc08f4bdd9e26b1249ca20b356877dc816",
  "path": "src"
}
```

</details>

```
[{"type":"dir","size":0,"name":"Pastafari","path":"src/Pastafari","sha":"214fc69058aa176fd3dd42847e4302170ee0b423","url":"https://api.github.com/repos/Sargon17-Green/Pastafarian-Calendar/contents/src/Pastafari?ref=267a63bc08f4bdd9e26b1249ca20b356877dc816","git_url":"https://api.github.com/repos/Sargon17-Green/Pastafarian-Calendar/git/trees/214fc69058aa176fd3dd42847e4302170ee0b423","html_url":"https://github.com/Sargon17-Green/Pastafarian-Calendar/tree/267a63bc08f4bdd9e26b1249ca20b356877dc816/src/Pastafari"}]
```


---

<sub>28s</sub>

### `github-mcp-server-get_file_contents`

**tests**

<details>
<summary>Arguments</summary>

```json
{
  "owner": "Sargon17-Green",
  "repo": "Pastafarian-Calendar",
  "ref": "267a63bc08f4bdd9e26b1249ca20b356877dc816",
  "path": "tests"
}
```

</details>

```
[{"type":"file","size":1541,"name":"BootstrapFixtures.elm","path":"tests/BootstrapFixtures.elm","sha":"934169bbdef1b80c5838ff46bae23c5f5498158c","url":"https://api.github.com/repos/Sargon17-Green/Pastafarian-Calendar/contents/tests/BootstrapFixtures.elm?ref=267a63bc08f4bdd9e26b1249ca20b356877dc816","git_url":"https://api.github.com/repos/Sargon17-Green/Pastafarian-Calendar/git/blobs/934169bbdef1b80c5838ff46bae23c5f5498158c","html_url":"https://github.com/Sargon17-Green/Pastafarian-Calendar/blob/267a63bc08f4bdd9e26b1249ca20b356877dc816/tests/BootstrapFixtures.elm","download_url":"https://raw.githubusercontent.com/Sargon17-Green/Pastafarian-Calendar/267a63bc08f4bdd9e26b1249ca20b356877dc816/tests/BootstrapFixtures.elm"},{"type":"file","size":59706,"name":"NormativeOracle.elm","path":"tests/NormativeOracle.elm","sha":"54b58705b14fb086444b77a168917a92c7eb3db2","url":"https://api.github.com/repos/Sargon17-Green/Pastafarian-Calendar/contents/tests/NormativeOracle.elm?ref=267a63bc08f4bdd9e26b1249ca20b356877dc816","git_url":"https://api.github.com/repos/Sargon17-Green/Pastafarian-Calendar/git/blobs/54b58705b14fb086444b77a168917a92c7eb3db2","html_url":"https://github.com/Sargon17-Green/Pastafarian-Calendar/blob/267a63bc08f4bdd9e26b1249ca20b356877dc816/tests/NormativeOracle.elm","download_url":"https://raw.githubusercontent.com/Sargon17-Green/Pastafarian-Calendar/267a63bc08f4bdd9e26b1249ca20b356877dc816/tests/NormativeOracle.elm"},{"type":"file","size":16893,"name":"Stage01Checks.elm","path":"tests/Stage01Checks.elm","sha":"4de2cc4333aa1ba903b370acd489d5d0e9f4261a","url":"https://api.github.com/repos/Sargon17-Green/Pastafarian-Calendar/contents/tests/Stage01Checks.elm?ref=267a63bc08f4bdd9e26b1249ca20b356877dc816","git_url":"https://api.github.com/repos/Sargon17-Green/Pastafarian-Calendar/git/blobs/4de2cc4333aa1ba903b370acd489d5d0e9f4261a","html_url":"https://github.com/Sargon17-Green/Pastafarian-Calendar/blob/267a63bc08f4bdd9e26b1249ca20b356877dc816/tests/Stage01Checks.elm","download_url":"https://raw.githubusercontent.com/Sargon17-Green/Pastafarian-Calendar/267a63bc08f4bdd9e26b1249ca20b356877dc816/tests/Stage01Checks.elm"},{"type":"file","size":557,"name":"Stage01Harness.elm","path":"tests/Stage01Harness.elm","sha":"87c242b817de74afa448606fe07453790b914d04","url":"https://api.github.com/repos/Sargon17-Green/Pastafarian-Calendar/contents/tests/Stage01Harness.elm?ref=267a63bc08f4bdd9e26b1249ca20b356877dc816","git_url":"https://api.github.com/repos/Sargon17-Green/Pastafarian-Calendar/git/blobs/87c242b817de74afa448606fe07453790b914d04","html_url":"https://github.com/Sargon17-Green/Pastafarian-Calendar/blob/267a63bc08f4bdd9e26b1249ca20b356877dc816/tests/Stage01Harness.elm","download_url":"https://raw.githubusercontent.com/Sargon17-Green/Pastafarian-Calendar/267a63bc08f4bdd9e26b1249ca20b356877dc816/tests/Stage01Harness.elm"}]
```


---

<sub>28s</sub>

### `github-mcp-server-get_file_contents`

**STAGE_01_NORMATIVE_AUDIT.md**

<details>
<summary>Arguments</summary>

```json
{
  "owner": "Sargon17-Green",
  "repo": "Pastafarian-Calendar",
  "ref": "267a63bc08f4bdd9e26b1249ca20b356877dc816",
  "path": "STAGE_01_NORMATIVE_AUDIT.md"
}
```

</details>

<details>
<summary>22 lines</summary>

```
successfully downloaded text file (SHA: acf95aa6efe3988b28cd9cd9be877b02f49b2a47)# Staðlað úttekt Stage 1

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

<sub>28s</sub>

### `github-mcp-server-get_file_contents`

**STAGE_01_OWNERSHIP_AUDIT.md**

<details>
<summary>Arguments</summary>

```json
{
  "owner": "Sargon17-Green",
  "repo": "Pastafarian-Calendar",
  "ref": "267a63bc08f4bdd9e26b1249ca20b356877dc816",
  "path": "STAGE_01_OWNERSHIP_AUDIT.md"
}
```

</details>

<details>
<summary>21 lines</summary>

```
successfully downloaded text file (SHA: d545071729af88f0961131e62520252f3a8f5a31)# Eignarhald merkingarástands — Stage 1

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

<sub>28s</sub>

### `github-mcp-server-get_file_contents`

**SOURCE_LANGUAGE_CATALOG.md**

<details>
<summary>Arguments</summary>

```json
{
  "owner": "Sargon17-Green",
  "repo": "Pastafarian-Calendar",
  "ref": "267a63bc08f4bdd9e26b1249ca20b356877dc816",
  "path": "SOURCE_LANGUAGE_CATALOG.md"
}
```

</details>

<details>
<summary>71 lines</summary>

```
successfully downloaded text file (SHA: 42806fa5011c2afb11db7a5e1d1925bf39e246ac)# SourceLanguageCatalog — íslenska

Útgáfa katalógsins er `1.0.0`. Katalógurinn er frystur frá Stage 1 og má ekki breytast án skýrrar forskriftarbreytingar.

## Reglur

Merkingarbær almenn orð eru þýdd eftir merkingu. Heilir orðasambandsliðir, þar á meðal brot, eru varðveittir sem eitt nafn og þýddir sem eðlilegt íslenskt orðasamband. Staðanöfn nota viðurkennda latneska eða íslenska ritmynd þegar hún er til. Tilbúin hljóðnöfn fá ákveðna og endurtekningarhæfa yfirfærslu: hebreska sj-hljóðið er ritað `sj`; önnur samhljóð fá næsta íslenskt-læsilega hljóðgildi; greinileg sérhljóð úr frumritinu eru varðveitt; engin merking er búin til.

`canonicalIndex` er eina staðlaða röðunin. Textastrengir eru birtingargögn og mega aldrei ráða `rank`, `unrank`, vali, merkingarlegum skyndiminnislykli eða samsetningaröð.

## Kótilettur

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

<sub>28s</sub>

### `github-mcp-server-get_file_contents`

**SPAGHETTI_DEVELOPMENT_HISTORY.md**

<details>
<summary>Arguments</summary>

```json
{
  "owner": "Sargon17-Green",
  "repo": "Pastafarian-Calendar",
  "ref": "267a63bc08f4bdd9e26b1249ca20b356877dc816",
  "path": "SPAGHETTI_DEVELOPMENT_HISTORY.md"
}
```

</details>

<details>
<summary>13 lines</summary>

```
successfully downloaded text file (SHA: 04961324852e086e6671203c26d8156aac022f7b)# Þróunarsaga spaghettískrímslisins

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

<sub>28s</sub>

### `github-mcp-server-get_file_contents`

**DEVELOPMENT_STAGE.md**

<details>
<summary>Arguments</summary>

```json
{
  "owner": "Sargon17-Green",
  "repo": "Pastafarian-Calendar",
  "ref": "267a63bc08f4bdd9e26b1249ca20b356877dc816",
  "path": "DEVELOPMENT_STAGE.md"
}
```

</details>

<details>
<summary>19 lines</summary>

```
successfully downloaded text file (SHA: 2e267c994102fd13105d3cf06dfbcb50206bac45)TOTAL_STAGES=55
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
NATURAL_LANGUAGE=איסלנדית
SOURCE_LANGUAGE_CATALOG_FROZEN=YES
MONSTER_ARCHITECTURE_GROWTH=Hlutlaust kallsamhengi, grunnstýring, staðfestingarmörk og mælingaskel.
SEMANTIC_STATE_OWNER_VALIDATED=YES
GITHUB_ACTIONS_PERFORMED=NO
GIT_HISTORY_MUTATED=NO
HANDOFF_PACKAGE_PREPARED=YES
```

</details>


---

<sub>34s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js (lines 1-180)

<details>
<summary>179 lines</summary>

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
```

</details>


---

<sub>34s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js (lines 181-351)

<details>
<summary>170 lines</summary>

```
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
      "palgurash": "Palgurash",
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
      "karshumav": "Karshumav",
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
      "theClosedDoor": "Lokuðu dyrnar",
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

<sub>34s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html (lines 1-170)

<details>
<summary>155 lines</summary>

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
```

</details>


---

<sub>34s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html (lines 171-331)

<details>
<summary>146 lines</summary>

```
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

<sub>34s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/index.html.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/index.html (lines 1-210)

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
      <div class="noscript">
        <p><strong>JavaScript</strong> <span aria-hidden="true">⚠</span></p>
      </div>
    </noscript>
  </body>
</html>

```


---

<sub>34s</sub>

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

<sub>34s</sub>

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

<sub>34s</sub>

### `github-mcp-server-get_file_contents`

**src/Pastafari**

<details>
<summary>Arguments</summary>

```json
{
  "owner": "Sargon17-Green",
  "repo": "Pastafarian-Calendar",
  "ref": "267a63bc08f4bdd9e26b1249ca20b356877dc816",
  "path": "src/Pastafari"
}
```

</details>

```
[{"type":"file","size":12757,"name":"ExactInt.elm","path":"src/Pastafari/ExactInt.elm","sha":"2d39104d85f918e128cfb615801bb421335c09d1","url":"https://api.github.com/repos/Sargon17-Green/Pastafarian-Calendar/contents/src/Pastafari/ExactInt.elm?ref=267a63bc08f4bdd9e26b1249ca20b356877dc816","git_url":"https://api.github.com/repos/Sargon17-Green/Pastafarian-Calendar/git/blobs/2d39104d85f918e128cfb615801bb421335c09d1","html_url":"https://github.com/Sargon17-Green/Pastafarian-Calendar/blob/267a63bc08f4bdd9e26b1249ca20b356877dc816/src/Pastafari/ExactInt.elm","download_url":"https://raw.githubusercontent.com/Sargon17-Green/Pastafarian-Calendar/267a63bc08f4bdd9e26b1249ca20b356877dc816/src/Pastafari/ExactInt.elm"},{"type":"file","size":2582,"name":"MonsterBase.elm","path":"src/Pastafari/MonsterBase.elm","sha":"f611438edf92c787c6ae3ace8b66eb3527acbaa8","url":"https://api.github.com/repos/Sargon17-Green/Pastafarian-Calendar/contents/src/Pastafari/MonsterBase.elm?ref=267a63bc08f4bdd9e26b1249ca20b356877dc816","git_url":"https://api.github.com/repos/Sargon17-Green/Pastafarian-Calendar/git/blobs/f611438edf92c787c6ae3ace8b66eb3527acbaa8","html_url":"https://github.com/Sargon17-Green/Pastafarian-Calendar/blob/267a63bc08f4bdd9e26b1249ca20b356877dc816/src/Pastafari/MonsterBase.elm","download_url":"https://raw.githubusercontent.com/Sargon17-Green/Pastafarian-Calendar/267a63bc08f4bdd9e26b1249ca20b356877dc816/src/Pastafari/MonsterBase.elm"},{"type":"file","size":5260,"name":"SourceLanguageCatalog.elm","path":"src/Pastafari/SourceLanguageCatalog.elm","sha":"9f8ae6b6069fb74f3a22fc5b54ca1ee0eded731b","url":"https://api.github.com/repos/Sargon17-Green/Pastafarian-Calendar/contents/src/Pastafari/SourceLanguageCatalog.elm?ref=267a63bc08f4bdd9e26b1249ca20b356877dc816","git_url":"https://api.github.com/repos/Sargon17-Green/Pastafarian-Calendar/git/blobs/9f8ae6b6069fb74f3a22fc5b54ca1ee0eded731b","html_url":"https://github.com/Sargon17-Green/Pastafarian-Calendar/blob/267a63bc08f4bdd9e26b1249ca20b356877dc816/src/Pastafari/SourceLanguageCatalog.elm","download_url":"https://raw.githubusercontent.com/Sargon17-Green/Pastafarian-Calendar/267a63bc08f4bdd9e26b1249ca20b356877dc816/src/Pastafari/SourceLanguageCatalog.elm"},{"type":"file","size":1112,"name":"Spaghetti.elm","path":"src/Pastafari/Spaghetti.elm","sha":"1b9e81a2508fed38deaef5cf8bf7fb6be3dc1e4c","url":"https://api.github.com/repos/Sargon17-Green/Pastafarian-Calendar/contents/src/Pastafari/Spaghetti.elm?ref=267a63bc08f4bdd9e26b1249ca20b356877dc816","git_url":"https://api.github.com/repos/Sargon17-Green/Pastafarian-Calendar/git/blobs/1b9e81a2508fed38deaef5cf8bf7fb6be3dc1e4c","html_url":"https://github.com/Sargon17-Green/Pastafarian-Calendar/blob/267a63bc08f4bdd9e26b1249ca20b356877dc816/src/Pastafari/Spaghetti.elm","download_url":"https://raw.githubusercontent.com/Sargon17-Green/Pastafarian-Calendar/267a63bc08f4bdd9e26b1249ca20b356877dc816/src/Pastafari/Spaghetti.elm"}]
```


---

<sub>34s</sub>

### `github-mcp-server-get_file_contents`

**SOURCE_LANGUAGE_CATALOG.md**

<details>
<summary>Arguments</summary>

```json
{
  "owner": "Sargon17-Green",
  "repo": "Pastafarian-Calendar",
  "ref": "267a63bc08f4bdd9e26b1249ca20b356877dc816",
  "path": "SOURCE_LANGUAGE_CATALOG.md"
}
```

</details>

<details>
<summary>71 lines</summary>

```
successfully downloaded text file (SHA: 42806fa5011c2afb11db7a5e1d1925bf39e246ac)# SourceLanguageCatalog — íslenska

Útgáfa katalógsins er `1.0.0`. Katalógurinn er frystur frá Stage 1 og má ekki breytast án skýrrar forskriftarbreytingar.

## Reglur

Merkingarbær almenn orð eru þýdd eftir merkingu. Heilir orðasambandsliðir, þar á meðal brot, eru varðveittir sem eitt nafn og þýddir sem eðlilegt íslenskt orðasamband. Staðanöfn nota viðurkennda latneska eða íslenska ritmynd þegar hún er til. Tilbúin hljóðnöfn fá ákveðna og endurtekningarhæfa yfirfærslu: hebreska sj-hljóðið er ritað `sj`; önnur samhljóð fá næsta íslenskt-læsilega hljóðgildi; greinileg sérhljóð úr frumritinu eru varðveitt; engin merking er búin til.

`canonicalIndex` er eina staðlaða röðunin. Textastrengir eru birtingargögn og mega aldrei ráða `rank`, `unrank`, vali, merkingarlegum skyndiminnislykli eða samsetningaröð.

## Kótilettur

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

<sub>54s</sub>

### `rg`

**"is"|is-IS|lang="en"|fallback|noscript|data-i18n**

""is"|is-IS|lang="en"|fallback|noscript|data-i18n" (docs/manifest.webmanifest, docs/about/index.html, docs/i18n/registry.js, docs/sw.js)

```
[grep content: 58 matches across 4 file(s) under /home/runner/work/pastafari-calendar/pastafari-calendar/docs]

sw.js (5 match(es)):
  5- const RUNTIME_CACHE = "pastafari-runtime-assets";
  6- const CACHE_PREFIX = "pastafari-static-";
  7- 
  8: // Core application shell. English UI resources and the Hebrew article fallback are installed eagerly.
  9- // Other locale resources and translated articles are cached on demand.
  10- const CORE_ASSETS = [
  11-   "./index.html",
  45- const SCOPE_URL = new URL(self.registration.scope);
  46- const scoped = (path) => new URL(path, SCOPE_URL).href;
  47- const ENGLISH_LOCALE_ASSET = CORE_ASSETS.find((path) => path.startsWith("./i18n/locales/en.js?"));
  48: if (!ENGLISH_LOCALE_ASSET) throw new Error("English fallback locale is missing from CORE_ASSETS.");
  49- const LOCALE_REVISION_SEARCH = new URL(scoped(ENGLISH_LOCALE_ASSET)).search;
  50- const FALLBACK_ARTICLE_ASSET = CORE_ASSETS.find((path) => path.startsWith("./about/content/he.html?"));
  51- if (!FALLBACK_ARTICLE_ASSET) throw new Error("Fallback article is missing from CORE_ASSETS.");
  247- 
  248-   if (event.request.mode === "navigate") {
  249-     event.respondWith(fetch(event.request).catch(async () => {
  250:       const fallbackEntry = navigationFallbackEntry(url);
  251:       return fallbackEntry
  252:         ? (await coreResponse(fallbackEntry) ?? new Response("", { status: 503 }))
  253-         : new Response("", { status: 503 });
  254-     }));
  255-     return;

i18n/registry.js (15 match(es)):
  57-   defineLocale("hu", "Magyar", "ltr", "hu-HU", "partial", () => import("./locales/hu.js?v=19-about-i18n")),
  58-   defineLocale("hy", "Հայերեն", "ltr", "hy-AM", "partial", () => import("./locales/hy.js?v=19-about-i18n")),
  59-   defineLocale("id", "Bahasa Indonesia", "ltr", "id-ID", "partial", () => import("./locales/id.js?v=19-about-i18n")),
  60:   defineLocale("is", "Íslenska", "ltr", "is-IS", "partial", () => import("./locales/is.js?v=19-about-i18n")),
  61-   defineLocale("it", "Italiano", "ltr", "it-IT", "partial", () => import("./locales/it.js?v=19-about-i18n")),
  62-   defineLocale("ja", "日本語", "ltr", "ja-JP", "partial", () => import("./locales/ja.js?v=19-about-i18n")),
  63-   defineLocale("jv", "Basa Jawa", "ltr", "jv-ID", "partial", () => import("./locales/jv.js?v=19-about-i18n")),
  108-   }
  109- }
  110- 
  111: function fallbackTags(tag) {
  112-   const canonical = canonicalTag(tag);
  113-   if (!canonical) return [];
  114-   const withoutExtensions = canonical.split("-u-")[0].split("-x-")[0];
  170- const LOCAL_SOURCE = Symbol("pastafari.i18n.localSource");
  171- 
  172- export function matchSupportedLocale(tag) {
  173:   for (const candidate of fallbackTags(tag)) {
  174-     const locale = byCode.get(candidate) ?? byAlias.get(candidate);
  175-     if (locale) return locale;
  176-   }
  189-     if (browserLocale) return Object.freeze({ locale: browserLocale, source: "browser" });
  190-   }
  191- 
  192:   return Object.freeze({ locale: byCode.get(canonicalTag(DEFAULT_LOCALE)), source: "fallback" });
  193- }
  194- 
  195- export function getLocale(code) {
  355-   return true;
  356- }
  357- 
  358: function mergeGroup(fallback, local) {
  359:   return Object.freeze({ ...ownRecord(fallback), ...ownRecord(local) });
  360- }
  361- 
  362- export function materializeLocaleResources(resource, metadata, englishBaseline) {
  363-   validateLocaleSourceContract(resource, metadata, englishBaseline);
  364-   const local = localGroups(resource);
  365:   const fallback = localGroups(englishBaseline);
  366-   const result = {
  367-     ...resource,
  368:     messages: mergeGroup(fallback.messages, local.messages),
  369:     terminology: mergeGroup(fallback.terminology, local.terminology),
  370-     calendar: Object.freeze({
  371-       ...ownRecord(englishBaseline?.calendar),
  372-       ...ownRecord(resource?.calendar),
  373:       cutlets: mergeGroup(fallback.cutlets, local.cutlets),
  374:       months: mergeGroup(fallback.months, local.months),
  375-     }),
  376-   };
  377-   Object.defineProperty(result, LOCAL_SOURCE, { value: resource, enumerable: false });
  467-   return {
  468-     total: expectedKeys.length,
  469-     local: localKeys.length,
  470:     fallback: missing.length,
  471-     coverage: expectedKeys.length ? Number(((localKeys.length / expectedKeys.length) * 100).toFixed(2)) : 100,
  472-     missingKeys: missing,
  473-     emptyKeys: empty,
  503-     const groupValues = Object.values(resourceGroups);
  504-     const totalKeys = groupValues.reduce((sum, group) => sum + group.total, 0);
  505-     const localKeys = groupValues.reduce((sum, group) => sum + group.local, 0);
  506:     const fallbackKeys = groupValues.reduce((sum, group) => sum + group.fallback, 0);
  507-     const emptyKeys = groupValues.flatMap((group) => group.emptyKeys);
  508-     const unknownKeys = groupValues.flatMap((group) => group.unknownKeys);
  509-     const coreGroupsPresent = ["messages", "terminology", "cutlets", "months"].every((name) => resourceGroups[name].local > 0);
  510:     const structurallyComplete = fallbackKeys === 0 && emptyKeys.length === 0 && unknownKeys.length === 0;
  511-     const proposedStructuralStatus = structurallyComplete ? "complete-candidate" : coreGroupsPresent ? "partial" : "experimental";
  512- 
  513-     report.push({
  522-       legacyExperimentalDeclared: Object.prototype.hasOwnProperty.call(source, "experimental") ? source.experimental : null,
  523-       totalKeys,
  524-       localKeys,
  525:       fallbackKeys,
  526-       coverage: totalKeys ? Number(((localKeys / totalKeys) * 100).toFixed(2)) : 100,
  527-       resourceGroups,
  528-       proposedStructuralStatus,

manifest.webmanifest (6 match(es)):
  162-       "lang": "id",
  163-       "dir": "ltr"
  164-     },
  165:     "is": {
  166-       "value": "Pastafari-dagatal",
  167:       "lang": "is",
  168-       "dir": "ltr"
  169-     },
  170-     "it": {
  525-       "lang": "id",
  526-       "dir": "ltr"
  527-     },
  528:     "is": {
  529-       "value": "Pastafari",
  530:       "lang": "is",
  531-       "dir": "ltr"
  532-     },
  533-     "it": {
  888-       "lang": "id",
  889-       "dir": "ltr"
  890-     },
  891:     "is": {
  892-       "value": "Pastafari-dagatal með dagsetningarleit og samanburði.",
  893:       "lang": "is",
  894-       "dir": "ltr"
  895-     },
  896-     "it": {

about/index.html (32 match(es)):
  1- <!DOCTYPE html>
  2: <html lang="en" dir="ltr">
  3-   <head>
  4-     <meta charset="utf-8">
  5-     <meta name="viewport" content="width=device-width, initial-scale=1">
  6-     <meta name="theme-color" content="#672013">
  7:     <meta name="description" content="An explanation of the Pastafari Calendar." data-i18n-attr="content:about.metaDescription">
  8-     <meta name="color-scheme" content="light">
  9-     <meta http-equiv="Content-Security-Policy" content="default-src 'self'; base-uri 'none'; object-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; worker-src 'self'; manifest-src 'self'">
  10:     <title data-i18n="about.title">About the Pastafari Calendar</title>
  11-     <link rel="manifest" href="../manifest.webmanifest?v=9-canonical-names">
  12-     <link rel="icon" href="../icons/icon.svg?v=9-canonical-names" type="image/svg+xml">
  13-     <link rel="apple-touch-icon" href="../icons/icon-192.png">
  15-     <script type="module" src="./about.js?v=5-about-i18n-polish"></script>
  16-   </head>
  17-   <body class="about-page">
  18:     <a class="skip-link" href="#article-content" data-i18n="about.skip">Skip to the calendar explanation</a>
  19-     <div class="app-shell about-shell">
  20-       <header class="masthead about-masthead">
  21-         <div class="masthead-copy">
  22:           <p class="eyebrow" data-i18n="app.brand">PASTAFARI</p>
  23:           <h1 data-i18n="about.title">About the Pastafari Calendar</h1>
  24:           <p class="intro" data-i18n="about.intro">How the calendar represents days, years, cutlets, woven months, and the day of working.</p>
  25:           <a class="guide-link" href="../" data-back-to-calendar data-i18n="about.back">Back to the calendar</a>
  26-         </div>
  27-         <div class="language-control">
  28:           <label for="language-selector" data-i18n="language.label">Language</label>
  29-           <select id="language-selector" autocomplete="off"></select>
  30-         </div>
  31-       </header>
  32- 
  33:       <p class="about-language-notice" id="about-language-notice" hidden data-i18n="about.fallbackNotice">The explanation is unavailable in the selected language right now, so the default version is shown.</p>
  34- 
  35-       <details class="about-toc" id="about-toc" open>
  36-         <summary>
  37:           <span class="eyebrow" data-i18n="about.tocKicker">On this page</span>
  38:           <span class="about-toc-title" data-i18n="about.toc">Contents</span>
  39-         </summary>
  40:         <nav data-i18n-attr="aria-label:about.toc">
  41-           <ol id="about-toc-list"></ol>
  42-         </nav>
  43-       </details>
  44- 
  45-       <main>
  46-         <article id="article-content" class="about-article" aria-busy="true" tabindex="-1"></article>
  47:         <p class="about-load-error" id="about-load-error" role="alert" hidden data-i18n="about.loadError">The calendar explanation could not be loaded.</p>
  48- 
  49-         <section class="about-site-usage" id="site-usage" aria-labelledby="guide-heading" data-toc-section data-toc-level="2">
  50:           <p class="eyebrow" data-i18n="guide.eyebrow">User guide</p>
  51:           <h2 id="guide-heading" data-i18n="guide.heading">What can you do here, and how?</h2>
  52:           <p class="guide-intro" data-i18n="guide.intro">Search, read, browse, change the day of working, and compare calculations.</p>
  53-           <details class="about-site-usage-details" id="site-usage-details">
  54:             <summary data-i18n="guide.open">How do I use this site?</summary>
  55-             <div class="guide-grid">
  56:               <article><span class="guide-number">01</span><h3 data-i18n="guide.1.heading">Open the site and get today</h3><p data-i18n="guide.1.body">The site immediately determines the current Pastafari day for the active observer location.</p></article>
  57:               <article><span class="guide-number">02</span><h3 data-i18n="guide.2.heading">Search in any available calendar</h3><p data-i18n="guide.2.body">Choose a calendar, fill its fields, and show the date.</p></article>
  58:               <article><span class="guide-number">03</span><h3 data-i18n="guide.3.heading">Read the date</h3><p data-i18n="guide.3.body">Each tile shows the year, cutlet, and month in three lines.</p></article>
  59:               <article><span class="guide-number">04</span><h3 data-i18n="guide.4.heading">Browse without selecting by accident</h3><p data-i18n="guide.4.body">Use the cutlet navigation buttons.</p></article>
  60:               <article><span class="guide-number">05</span><h3 data-i18n="guide.5.heading">Change the day of working</h3><p data-i18n="guide.5.body">Open the calculation options to change it.</p></article>
  61:               <article><span class="guide-number">06</span><h3 data-i18n="guide.6.heading">Compare the same days twice</h3><p data-i18n="guide.6.body">On desktop, align each target day under two calculations.</p></article>
  62:               <article><span class="guide-number">07</span><h3 data-i18n="guide.7.heading">Explore the whole year</h3><p data-i18n="guide.7.body">Below the cutlet, inspect the year's length, cutlets, and woven months.</p></article>
  63-             </div>
  64:             <p class="guide-note" data-i18n="guide.note">Grid rows are visual only; comparison-table rows deliberately align the same day.</p>
  65-           </details>
  66:           <a class="back-to-calendar" href="../" data-back-to-calendar data-i18n="guide.back">Back to search and calendar</a>
  67-         </section>
  68-       </main>
  69- 
  70-       <footer class="site-footer">
  71:         <p data-i18n="footer.local">Calculation happens on your device; this site has no user account and no tracking code.</p>
  72:         <p data-i18n="footer.open">The link is public and loads directly, including in a private-browsing window.</p>
  73-       </footer>
  74-     </div>
  75:     <noscript>
  76:       <div class="noscript">
  77-         <p><strong>JavaScript</strong> <span aria-hidden="true">⚠</span></p>
  78-       </div>
  79:     </noscript>
  80-   </body>
  81- </html>
```


---

<sub>54s</sub>

### `rg`

**daysValue|cutletMeta|monthMeta|localizedCutlet|localizedMonth|title|year\.heading|comparison\.actionHeading|calendarLabel|terminology**

"daysValue|cutletMeta|monthMeta|localizedCutlet|localizedMonth|title|year\.heading|comparison\.actionHeading|calendarLabel|terminology" in *.js (docs)

<details>
<summary>143 matches</summary>

```
[grep content: 834 matches across 75 file(s) under /home/runner/work/pastafari-calendar/pastafari-calendar/docs; compact summary]
app.js (22 match(es)):
  15: calendarLabel,
  265: return calendarLabel(activeLocale, "cutlet", index);
  269: return calendarLabel(activeLocale, "month", index);
  299: const monthName = localizedMonth(day.monthIndex);
  324: monthName: localizedMonth(day.monthIndex),
  434: elements["year-overview-heading"].textContent = t("year.heading", { year: formatInteger(view.year) });
  443: function appendStructureItem(list, title, meta, { current = false } = {}) {
  458: elements["year-overview-heading"].textContent = t("year.heading", { year: formatInteger(structure.year) });
  495: t("year.numberedName", { number: formatInteger(index + 1), name: localizedCutlet(cutlet.cutletIndex) }),
  513: t("year.numberedName", { number: formatInteger(index + 1), name: localizedMonth(month.monthIndex) }),
  529: elements["year-overview-heading"].textContent = t("year.heading", { year: formatInteger(view.year) });
  582: elements["comparison-secondary-heading"].textContent = t("comparison.actionHeading", {
  ... 10 more match(es) and 60 context line(s) omitted in this file
reverse-ui.js (12 match(es)):
  15: import { calendarLabel, translate } from "./i18n/registry.js?v=20-about-i18n";
  89: this.calendarLabel = node("label", "calendar-picker");
  90: this.calendarLabelText = node("span");
  93: this.calendarLabel.htmlFor = this.calendar.id;
  94: this.calendarLabel.append(this.calendarLabelText, this.calendar);
  99: this.root.append(this.calendarLabel, this.fields, this.help, this.error);
  182: this.calendarLabelText.textContent = this.services.rt(this.labelKey);
  223: calendarLabel(this.services.getLocale(), type, entry.index),
  268: const title = node("strong", "reverse-card-title", id);
  271: header.append(title, this.removeButton);
  355: this.title = node("strong", "reverse-card-title", id);
  358: header.append(this.title, this.removeButton);
  ... 34 more context line(s) omitted in this file
i18n/locales/sv.js (11 match(es)):
  11- "manifest.defaultDescription": "En lokal, deterministisk Pastafari-kalender.",
  12: "app.title": "Pastafarisk kalender",
  23: "about.title": "Om Pastafari-kalendern",
  39: "search.calendarLabel": "Kalender för inmatning",
  57: "comparison.actionHeading": "Arbetsdag: {date}",
  108: "loading.title": "Letar efter kotlett och datum…",
  110: "error.title": "Beräkningsmotorn laddades inte",
  124: "year.heading": "Struktur för år {year}",
  132: "year.daysValue": "{count} dagar",
  140: "year.cutletMeta": "Längd: {length} dagar · position i året: dagar {start}–{end}",
  141: "year.monthMeta": "Dagar: {length} · sammanhängande följder: {runs} · första förekomst: dag {first} · sista: dag {last}",
  339: "terminology": {
  ... 36 more context line(s) omitted in this file
i18n/locales/sr.js (11 match(es)):
  11- "manifest.defaultDescription": "Lokalni deterministički Pastafari kalendar.",
  12: "app.title": "Pastafarijanski kalendar",
  23: "about.title": "O Pastafarijanskom kalendaru",
  39: "search.calendarLabel": "Kalendar za unos",
  57: "comparison.actionHeading": "Dan radnje: {date}",
  108: "loading.title": "Traženje kotleta i datuma…",
  110: "error.title": "Mehanizam izračunavanja nije učitan",
  124: "year.heading": "Struktura godine {year}",
  132: "year.daysValue": "{count} dana",
  140: "year.cutletMeta": "Dužina: {length} dana · položaj u godini: dani {start}–{end}",
  141: "year.monthMeta": "Dani: {length} · neprekinuti nizovi: {runs} · prvo pojavljivanje: dan {first} · poslednje: dan {last}",
  339: "terminology": {
  ... 36 more context line(s) omitted in this file
i18n/locales/ar.js (11 match(es)):
  11- "manifest.defaultDescription": "تقويم Pastafari محلي وحتمي.",
  12: "app.title": "التقويم الباستافاري",
  23: "about.title": "حول التقويم الباستافاري",
  39: "search.calendarLabel": "التقويم المستخدم للإدخال",
  57: "comparison.actionHeading": "يوم العمل: {date}",
  108: "loading.title": "جارٍ العثور على القطعة والتاريخ…",
  110: "error.title": "لم يتم تحميل محرك الحساب",
  124: "year.heading": "بنية السنة {year}",
  132: "year.daysValue": "{count} يومًا",
  140: "year.cutletMeta": "الطول: {length} يومًا · الموضع في السنة: الأيام {start}–{end}",
  141: "year.monthMeta": "الأيام: {length} · المقاطع المتصلة: {runs} · أول ظهور: اليوم {first} · الأخير: اليوم {last}",
  339: "terminology": {
  ... 36 more context line(s) omitted in this file
i18n/locales/fa.js (11 match(es)):
  11- "manifest.defaultDescription": "یک گاه‌شمار پاستافاریِ محلی و قطعی.",
  12: "app.title": "تقویم پاستافاری",
  23: "about.title": "دربارهٔ گاه‌شمار پاستافاری",
  39: "search.calendarLabel": "تقویم مورد استفاده برای ورود",
  57: "comparison.actionHeading": "روز عمل: {date}",
  108: "loading.title": "در حال یافتن کتلت و تاریخ…",
  110: "error.title": "موتور محاسبه بارگذاری نشد",
  124: "year.heading": "ساختار سال {year}",
  132: "year.daysValue": "{count} روز",
  140: "year.cutletMeta": "طول: {length} روز · جایگاه در سال: روزهای {start}–{end}",
  141: "year.monthMeta": "روزها: {length} · بخش‌های پیوسته: {runs} · نخستین رخداد: روز {first} · آخرین: روز {last}",
  339: "terminology": {
  ... 36 more context line(s) omitted in this file
i18n/locales/fy.js (11 match(es)):
  11- "manifest.defaultDescription": "In lokale, deterministyske Pastafari-kalinder.",
  12: "app.title": "Pastafaryske kalinder",
  23: "about.title": "Oer de Pastafaryske kalinder",
  39: "search.calendarLabel": "Kalinder foar ynfier",
  57: "comparison.actionHeading": "Hannelingsdei: {date}",
  108: "loading.title": "Kotelet en datum sykje…",
  110: "error.title": "De berekkeningsmotor is net laden",
  124: "year.heading": "Struktuer fan jier {year}",
  132: "year.daysValue": "{count} dagen",
  140: "year.cutletMeta": "Lingte: {length} dagen · posysje yn it jier: dagen {start}–{end}",
  141: "year.monthMeta": "Dagen: {length} · oaniensletten rigen: {runs} · earste ferskining: dei {first} · lêste: dei {last}",
  339: "terminology": {
  ... 36 more context line(s) omitted in this file
i18n/locales/et.js (11 match(es)):
  11- "manifest.defaultDescription": "Kohalik deterministlik Pastafari kalender.",
  12: "app.title": "Pastafarinen kalender",
  23: "about.title": "Pastafari kalendrist",
  39: "search.calendarLabel": "Syöttöön käytettävä kalender",
  57: "comparison.actionHeading": "Toimingupäev: {date}",
  108: "loading.title": "Etsitään leikettä ja kuupäevä…",
  110: "error.title": "Arvutusmoottori ei latautunut",
  124: "year.heading": "Aasta {year} struktuur",
  132: "year.daysValue": "{count} päevä",
  140: "year.cutletMeta": "Pituus: {length} päevä · sijainti vuodessa: päevt {start}–{end}",
  141: "year.monthMeta": "Päiviä: {length} · yhtenäisiä jaksoja: {runs} · ensimmäinen esiintyminen: päev {first} · viimeinen: päev {last}",
  339: "terminology": {
  ... 36 more context line(s) omitted in this file
i18n/locales/tr.js (11 match(es)):
  11- "manifest.defaultDescription": "Yerel ve deterministik bir Pastafari takvimi.",
  12: "app.title": "Pastafari Takvimi",
  23: "about.title": "Pastafari Takvimi hakkında",
  39: "search.calendarLabel": "Giriş için kullanılan takvim",
  57: "comparison.actionHeading": "İşlem günü: {date}",
  108: "loading.title": "Köfte ve tarih bulunuyor…",
  110: "error.title": "Hesaplama motoru yüklenmedi",
  124: "year.heading": "{year} yılının yapısı",
  132: "year.daysValue": "{count} gün",
  140: "year.cutletMeta": "Uzunluk: {length} gün · yıldaki konum: {start}–{end}. günler",
  141: "year.monthMeta": "Günler: {length} · kesintisiz diziler: {runs} · ilk görünüm: {first}. gün · son: {last}. gün",
  339: "terminology": {
  ... 36 more context line(s) omitted in this file
i18n/locales/af.js (11 match(es)):
  12- "app.brand": "PASTAFARI",
  13: "app.title": "Pastafariese kalender",
  20: "about.title": "Oor die Pastafariese kalender",
  36: "search.calendarLabel": "Kalender vir invoer",
  54: "comparison.actionHeading": "Aksiedag: {date}",
  105: "loading.title": "Soek na kotelet en datum…",
  107: "error.title": "Die berekeningsenjin is nie gelaai nie",
  121: "year.heading": "Struktuur van jaar {year}",
  129: "year.daysValue": "{count} dae",
  137: "year.cutletMeta": "Lengte: {length} dae · posisie in die jaar: dae {start}–{end}",
  138: "year.monthMeta": "Dae: {length} · aaneenlopende reekse: {runs} · eerste verskyning: dag {first} · laaste: dag {last}",
  339: "terminology": {
  ... 36 more context line(s) omitted in this file
[omitted 712 match(es) in 65 file(s)]
[extensions: .js=75]
```

</details>


---

<sub>54s</sub>

### `bash` — Failed

**Fær línustaðsetningar á líklegum staðfærsluatriðum**

$ nl -ba docs/i18n/locales/is.js | sed -n '1,110p;200,351p' && printf '\n--- grein ---\n' && nl -ba docs/about/content/is.html | sed -n '1,130p'

```
Permission denied and could not request permission from user
```


---

<sub>54s</sub>

### `github-mcp-server-get_file_contents`

**src/Pastafari/SourceLanguageCatalog.elm**

<details>
<summary>Arguments</summary>

```json
{
  "owner": "Sargon17-Green",
  "repo": "Pastafarian-Calendar",
  "ref": "267a63bc08f4bdd9e26b1249ca20b356877dc816",
  "path": "src/Pastafari/SourceLanguageCatalog.elm"
}
```

</details>

<details>
<summary>98 lines</summary>

```
successfully downloaded text file (SHA: 9f8ae6b6069fb74f3a22fc5b54ca1ee0eded731b)module Pastafari.SourceLanguageCatalog exposing
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

<sub>54s</sub>

### `github-mcp-server-get_file_contents`

**tests/Stage01Harness.elm**

<details>
<summary>Arguments</summary>

```json
{
  "owner": "Sargon17-Green",
  "repo": "Pastafarian-Calendar",
  "ref": "267a63bc08f4bdd9e26b1249ca20b356877dc816",
  "path": "tests/Stage01Harness.elm"
}
```

</details>

<details>
<summary>24 lines</summary>

```
successfully downloaded text file (SHA: 87c242b817de74afa448606fe07453790b914d04)port module Stage01Harness exposing (main)

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

<sub>54s</sub>

### `github-mcp-server-get_file_contents` — Failed

**.github/workflows/ci.yml**

<details>
<summary>Arguments</summary>

```json
{
  "owner": "Sargon17-Green",
  "repo": "Pastafarian-Calendar",
  "ref": "267a63bc08f4bdd9e26b1249ca20b356877dc816",
  "path": ".github/workflows/ci.yml"
}
```

</details>

```
MCP server 'github-mcp-server': Failed to get file contents. The path does not point to a file or directory, or the file does not exist in the repository.
```


---

<sub>1m 3s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/registry.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/registry.js (lines 1-40)

<details>
<summary>35 lines</summary>

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
```

</details>


---

<sub>1m 3s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/registry.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/registry.js (lines 340-550)

<details>
<summary>191 lines</summary>

```

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

function wrapCompleteLocaleSource(resource) {
  const result = { ...resource };
  Object.defineProperty(result, LOCAL_SOURCE, { value: resource, enumerable: false });
  return Object.freeze(result);
}

export async function loadLocale(code) {
  const metadata = getLocale(code);
  const existing = loadedLocales.get(metadata.code);
  if (existing) return existing;

  const loading = (async () => {
    const resource = await loadLocaleSource(metadata.code);
    if (metadata.support === "complete") return wrapCompleteLocaleSource(resource);
    const english = await loadLocaleSource(DEFAULT_LOCALE);
    return materializeLocaleResources(resource, metadata, english);
  })();
  loadedLocales.set(metadata.code, loading);
  try {
    return await loading;
  } catch (error) {
    if (loadedLocales.get(metadata.code) === loading) loadedLocales.delete(metadata.code);
    throw error;
  }
}

export async function loadAllLocales() {
  return Promise.all(LOCALES.map((locale) => loadLocale(locale.code)));
}

export function messageTemplate(locale, key) {
  const template = locale?.messages?.[key];
  if (typeof template !== "string") throw new RangeError(`Missing translation key: ${key}`);
  return template;
}

export function translate(locale, key, values = {}) {
  return messageTemplate(locale, key).replace(MESSAGE_PLACEHOLDER_PATTERN, (match, name) => {
    if (!(name in values)) throw new RangeError(`Missing interpolation value ${name} for ${key}`);
    return String(values[name]);
  });
}

export function calendarLabel(locale, type, index) {
  const identifiers = type === "cutlet" ? CUTLETS : type === "month" ? MONTHS : null;
  if (!identifiers || !Number.isInteger(index) || index < 0 || index >= identifiers.length) {
    throw new RangeError(`Invalid ${type} index.`);
  }
  const table = getPath(locale, `calendar.${type === "cutlet" ? "cutlets" : "months"}`);
  const label = table?.[identifiers[index].id];
  if (typeof label !== "string" || label === "") throw new RangeError(`Missing ${type} label at index ${index}.`);
  return label;
}

const ENGLISH_EQUALITY_ALLOWLIST = Object.freeze(new Set([
  "messages.app.brand",
  "messages.manifest.shortName",
  "messages.manifest.defaultDescription",
  "messages.reverse.error.limitPositive",
  "messages.reverse.error.limitSafeInteger",
  "messages.reverse.error.absoluteDateField",
  "cutlets.lagash",
  "cutlets.palgurash",
  "cutlets.akkad",
  "months.eridu",
  "months.karshumav",
  "months.uruk",
  "months.susa",
  "months.babylon",
]));

function analyzeGroup(local, english, prefix, { checkEnglishLeakage = true } = {}) {
  const expectedKeys = Object.keys(english).sort();
  const localKeys = Object.keys(local).filter((key) => expectedKeys.includes(key)).sort();
  const missing = expectedKeys.filter((key) => !Object.prototype.hasOwnProperty.call(local, key));
  const empty = localKeys.filter((key) => typeof local[key] !== "string" || local[key].trim() === "");
  const unknown = Object.keys(local).filter((key) => !expectedKeys.includes(key)).sort();
  const identicalToEnglish = localKeys.filter((key) => typeof local[key] === "string" && local[key] === english[key]);
  const allowedEnglish = checkEnglishLeakage
    ? identicalToEnglish.filter((key) => ENGLISH_EQUALITY_ALLOWLIST.has(`${prefix}.${key}`))
    : [];
  const suspiciousEnglish = checkEnglishLeakage
    ? identicalToEnglish
      .filter((key) => /[A-Za-z]{3,}/.test(String(local[key])))
      .filter((key) => !ENGLISH_EQUALITY_ALLOWLIST.has(`${prefix}.${key}`))
    : [];
  return {
    total: expectedKeys.length,
    local: localKeys.length,
    fallback: missing.length,
    coverage: expectedKeys.length ? Number(((localKeys.length / expectedKeys.length) * 100).toFixed(2)) : 100,
    missingKeys: missing,
    emptyKeys: empty,
    unknownKeys: unknown,
    identicalToEnglish,
    allowedEnglish,
    suspiciousEnglish,
  };
}

export function auditLocaleResources(locales) {
  if (!Array.isArray(locales) || locales.length === 0) throw new TypeError("Explicitly loaded locale resources are required for audit.");
  const sourceByCode = new Map(locales.map((locale) => {
    const source = locale?.[LOCAL_SOURCE] ?? locale;
    return [source?.code, source];
  }));
  const english = sourceByCode.get(DEFAULT_LOCALE);
  if (!english) throw new RangeError("English baseline locale is required for audit.");
  const englishGroups = localGroups(english);
  const report = [];

  for (const metadata of LOCALES) {
    const source = sourceByCode.get(metadata.code);
    if (!source) throw new RangeError(`Registered locale ${metadata.code} was not supplied for audit.`);
    const groups = localGroups(source);
    const resourceGroups = {
      messages: analyzeGroup(groups.messages, englishGroups.messages, "messages", { checkEnglishLeakage: metadata.code !== DEFAULT_LOCALE }),
      terminology: analyzeGroup(groups.terminology, englishGroups.terminology, "terminology", { checkEnglishLeakage: metadata.code !== DEFAULT_LOCALE }),
      cutlets: analyzeGroup(groups.cutlets, englishGroups.cutlets, "cutlets", { checkEnglishLeakage: metadata.code !== DEFAULT_LOCALE }),
      months: analyzeGroup(groups.months, englishGroups.months, "months", { checkEnglishLeakage: metadata.code !== DEFAULT_LOCALE }),
    };

    const groupValues = Object.values(resourceGroups);
    const totalKeys = groupValues.reduce((sum, group) => sum + group.total, 0);
    const localKeys = groupValues.reduce((sum, group) => sum + group.local, 0);
    const fallbackKeys = groupValues.reduce((sum, group) => sum + group.fallback, 0);
    const emptyKeys = groupValues.flatMap((group) => group.emptyKeys);
    const unknownKeys = groupValues.flatMap((group) => group.unknownKeys);
    const coreGroupsPresent = ["messages", "terminology", "cutlets", "months"].every((name) => resourceGroups[name].local > 0);
    const structurallyComplete = fallbackKeys === 0 && emptyKeys.length === 0 && unknownKeys.length === 0;
    const proposedStructuralStatus = structurallyComplete ? "complete-candidate" : coreGroupsPresent ? "partial" : "experimental";

    report.push({
      code: metadata.code,
      canonicalTag: canonicalTag(metadata.code),
      aliases: [...metadata.aliases],
      displayName: metadata.displayName,
      dir: metadata.dir,
      intlLocale: metadata.intlLocale,
      status: metadata.support,
      experimental: metadata.support === "experimental",
      legacyExperimentalDeclared: Object.prototype.hasOwnProperty.call(source, "experimental") ? source.experimental : null,
      totalKeys,
      localKeys,
      fallbackKeys,
      coverage: totalKeys ? Number(((localKeys / totalKeys) * 100).toFixed(2)) : 100,
      resourceGroups,
      proposedStructuralStatus,
    });
  }
  return report;
}

export function validateLocaleResources(locales) {
  if (!Array.isArray(locales) || locales.length === 0) {
    throw new TypeError("Explicitly loaded locale resources are required for validation.");
  }
  const sources = locales.map((locale) => locale?.[LOCAL_SOURCE] ?? locale);
  const sourceByCode = new Map();
  for (const source of sources) {
    if (!source || typeof source !== "object") throw new TypeError("Locale must be an object.");
    if (sourceByCode.has(source.code)) throw new RangeError(`Duplicate loaded locale source ${source.code}.`);
    sourceByCode.set(source.code, source);
  }
  const english = sourceByCode.get(DEFAULT_LOCALE);
  if (!english) throw new RangeError("English baseline locale is required for validation.");
  if (sources.length !== LOCALES.length) throw new RangeError(`Expected ${LOCALES.length} locale resources, received ${sources.length}.`);

  for (const metadata of LOCALES) {
    const source = sourceByCode.get(metadata.code);
```

</details>


---

<sub>1m 3s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/index.html.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/index.html (lines 1-110)

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
      <div class="noscript">
        <p><strong>JavaScript</strong> <span aria-hidden="true">⚠</span></p>
      </div>
    </noscript>
  </body>
</html>

```


---

<sub>1m 3s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/manifest.webmanifest.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/manifest.webmanifest (lines 150-180)

<details>
<summary>31 lines</summary>

```
    "hu": {
      "value": "Pastafari naptár",
      "lang": "hu",
      "dir": "ltr"
    },
    "hy": {
      "value": "Պաստաֆարիական օրացույց",
      "lang": "hy",
      "dir": "ltr"
    },
    "id": {
      "value": "Kalender Pastafari",
      "lang": "id",
      "dir": "ltr"
    },
    "is": {
      "value": "Pastafari-dagatal",
      "lang": "is",
      "dir": "ltr"
    },
    "it": {
      "value": "Calendario pastafariano",
      "lang": "it",
      "dir": "ltr"
    },
    "ja": {
      "value": "パスタファリ暦",
      "lang": "ja",
      "dir": "ltr"
    },
    "jv": {
```

</details>


---

<sub>1m 3s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/manifest.webmanifest.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/manifest.webmanifest (lines 520-540)

<details>
<summary>21 lines</summary>

```
      "lang": "hy",
      "dir": "ltr"
    },
    "id": {
      "value": "Pastafari",
      "lang": "id",
      "dir": "ltr"
    },
    "is": {
      "value": "Pastafari",
      "lang": "is",
      "dir": "ltr"
    },
    "it": {
      "value": "Pastafari",
      "lang": "it",
      "dir": "ltr"
    },
    "ja": {
      "value": "Pastafari",
      "lang": "ja",
```

</details>


---

<sub>1m 3s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/manifest.webmanifest.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/manifest.webmanifest (lines 884-900)

<details>
<summary>17 lines</summary>

```
      "dir": "ltr"
    },
    "id": {
      "value": "Kalender Pastafari dengan pencarian dan perbandingan tanggal.",
      "lang": "id",
      "dir": "ltr"
    },
    "is": {
      "value": "Pastafari-dagatal með dagsetningarleit og samanburði.",
      "lang": "is",
      "dir": "ltr"
    },
    "it": {
      "value": "Un calendario pastafariano con ricerca e confronto delle date.",
      "lang": "it",
      "dir": "ltr"
    },
```

</details>


---

<sub>1m 3s</sub>

### `rg`

**"(?:year\.daysValue|year\.cutletMeta|year\.monthMeta|calendar\.cutlets|calendar\.months|reverse\.error\.variable|reverse\.error\.absoluteDateField|reverse\.calendar\.label)"**

""(?:year\.daysValue|year\.cutletMeta|year\.monthMeta|calendar\.cutlets|calendar\.months|reverse\.error\.variable|reverse\.error\.absoluteDateField|reverse\.calendar\.label)"" (docs/i18n/locales/is.js, docs/i18n/locales/en.js)

<details>
<summary>12 matches</summary>

```
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/en.js:137:    "year.daysValue": "{count} days",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/en.js:145:    "year.cutletMeta": "Length: {length} days · position in year: days {start}–{end}",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/en.js:146:    "year.monthMeta": "Days: {length} · continuous runs: {runs} · first occurrence: day {first} · last: day {last}",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/en.js:272:    "reverse.error.absoluteDateField": "Invalid absolute date field.",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/en.js:274:    "reverse.error.variable": "Each constraint must refer to an existing date variable.",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/en.js:276:    "reverse.calendar.label": "Calendar used for this absolute date",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js:17:    "reverse.error.absoluteDateField": "Dagsetningin inniheldur ógilt gildi.",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js:132:    "year.daysValue": "{count} dagar",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js:140:    "year.cutletMeta": "Lengd: {length} dagar · staða í árinu: dagar {start}–{end}",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js:141:    "year.monthMeta": "Dagar: {length} · samfelldar runur: {runs} · fyrsta birting: dagur {first} · síðasta: dagur {last}",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js:264:    "reverse.error.variable": "Sérhver skorða verður að vísa í dagsetningarbreytu sem er til.",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js:266:    "reverse.calendar.label": "Dagatal fyrir þekkta dagsetningu",
```

</details>


---

<sub>1m 3s</sub>

### `rg`

**daysValue|cutletMeta|monthMeta|year\.heading**

"daysValue|cutletMeta|monthMeta|year\.heading" (docs/app.js)

<details>
<summary>41 matches</summary>

```
[grep content: 6 matches across 1 file(s) under /home/runner/work/pastafari-calendar/pastafari-calendar/docs]

app.js (6 match(es)):
  431- }
  432- 
  433- function renderYearStructureLoading(view) {
  434:   elements["year-overview-heading"].textContent = t("year.heading", { year: formatInteger(view.year) });
  435-   elements["year-overview-context"].textContent = t("year.context", {
  436-     actionDate: formatJdnAsGregorian(state.calculationJdn),
  437-   });
  455- function renderYearStructure(structure) {
  456-   state.yearStructure = structure;
  457-   state.yearStructureFailed = false;
  458:   elements["year-overview-heading"].textContent = t("year.heading", { year: formatInteger(structure.year) });
  459-   elements["year-overview-context"].textContent = t("year.context", {
  460-     actionDate: formatJdnAsGregorian(structure.calculationJdn),
  461-   });
  462:   elements["year-length"].textContent = t("year.daysValue", { count: formatInteger(structure.length) });
  463-   elements["year-cutlet-count"].textContent = formatInteger(structure.cutletCount);
  464-   elements["year-month-count"].textContent = formatInteger(structure.monthCount);
  465-   elements["year-range"].textContent = t("year.rangeValue", {
  493-     appendStructureItem(
  494-       cutletList,
  495-       t("year.numberedName", { number: formatInteger(index + 1), name: localizedCutlet(cutlet.cutletIndex) }),
  496:       t("year.cutletMeta", {
  497-         length: formatInteger(cutlet.length),
  498-         start: formatInteger(cutlet.startDayOfYear),
  499-         end: formatInteger(cutlet.endDayOfYear),
  511-     appendStructureItem(
  512-       monthList,
  513-       t("year.numberedName", { number: formatInteger(index + 1), name: localizedMonth(month.monthIndex) }),
  514:       t("year.monthMeta", {
  515-         length: formatInteger(month.length),
  516-         runs: formatInteger(month.runCount),
  517-         first: formatInteger(month.firstDayOfYear),
  526- }
  527- 
  528- function renderYearStructureError(view) {
  529:   elements["year-overview-heading"].textContent = t("year.heading", { year: formatInteger(view.year) });
  530-   elements["year-overview-context"].textContent = t("year.context", {
  531-     actionDate: formatJdnAsGregorian(state.calculationJdn),
  532-   });
```

</details>


---

<sub>1m 30s</sub>

### `bash` — Failed

**Greinir enska varatexta og óþýdda strengi í íslenskri staðfærslu**

$ node --input-type=module -e 'import en from "./docs/i18n/locales/en.js"; import is from "./docs/i18n/locales/is.js"; const flat=(o,p="",r={})=>{for(const [k,v] of Object.entries(o??{})){const q=p?`${p}.${k}`:k;if(v&&typeof v==="object")flat(v,q,r);else r[q]=v;}return r}; const a=flat(en),b=flat(is); const missing=Object.keys(a).filter(k=>!(k in b)); const same=Object.keys(a).filter(k=>k in b&&a[k]===b[k]&&/[A-Za-z]{3,}/.test(String(b[k]))); console.log(JSON.stringify({total:Object.keys(a).length, localized:Object.keys(b).length, missing:missing.map(k=>[k,a[k]]), same:same.map(k=>[k,b[k]])},null,2));'

```
Permission denied and could not request permission from user
```


---

<sub>1m 30s</sub>

### `github-mcp-server-get_file_contents`

**src/Pastafari/ExactInt.elm**

<details>
<summary>Arguments</summary>

```json
{
  "owner": "Sargon17-Green",
  "repo": "Pastafarian-Calendar",
  "ref": "267a63bc08f4bdd9e26b1249ca20b356877dc816",
  "path": "src/Pastafari/ExactInt.elm"
}
```

</details>

<details>
<summary>455 lines</summary>

```
successfully downloaded text file (SHA: 2d39104d85f918e128cfb615801bb421335c09d1)module Pastafari.ExactInt exposing
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

<sub>1m 30s</sub>

### `github-mcp-server-get_file_contents`

**src/Pastafari/MonsterBase.elm**

<details>
<summary>Arguments</summary>

```json
{
  "owner": "Sargon17-Green",
  "repo": "Pastafarian-Calendar",
  "ref": "267a63bc08f4bdd9e26b1249ca20b356877dc816",
  "path": "src/Pastafari/MonsterBase.elm"
}
```

</details>

<details>
<summary>94 lines</summary>

```
successfully downloaded text file (SHA: f611438edf92c787c6ae3ace8b66eb3527acbaa8)module Pastafari.MonsterBase exposing
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

<sub>1m 30s</sub>

### `github-mcp-server-get_file_contents`

**src/Pastafari/Spaghetti.elm**

<details>
<summary>Arguments</summary>

```json
{
  "owner": "Sargon17-Green",
  "repo": "Pastafarian-Calendar",
  "ref": "267a63bc08f4bdd9e26b1249ca20b356877dc816",
  "path": "src/Pastafari/Spaghetti.elm"
}
```

</details>

<details>
<summary>32 lines</summary>

```
successfully downloaded text file (SHA: 1b9e81a2508fed38deaef5cf8bf7fb6be3dc1e4c)module Pastafari.Spaghetti exposing
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

<sub>1m 30s</sub>

### `github-mcp-server-get_file_contents`

**tests/BootstrapFixtures.elm**

<details>
<summary>Arguments</summary>

```json
{
  "owner": "Sargon17-Green",
  "repo": "Pastafarian-Calendar",
  "ref": "267a63bc08f4bdd9e26b1249ca20b356877dc816",
  "path": "tests/BootstrapFixtures.elm"
}
```

</details>

<details>
<summary>86 lines</summary>

```
successfully downloaded text file (SHA: 934169bbdef1b80c5838ff46bae23c5f5498158c)module BootstrapFixtures exposing
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

<sub>1m 30s</sub>

### `github-mcp-server-get_file_contents`

**tests/Stage01Checks.elm**

<details>
<summary>Arguments</summary>

```json
{
  "owner": "Sargon17-Green",
  "repo": "Pastafarian-Calendar",
  "ref": "267a63bc08f4bdd9e26b1249ca20b356877dc816",
  "path": "tests/Stage01Checks.elm"
}
```

</details>

<details>
<summary>376 lines</summary>

```
successfully downloaded text file (SHA: 4de2cc4333aa1ba903b370acd489d5d0e9f4261a)module Stage01Checks exposing (allPassed, summary)

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
    , bigCheck "Kótilettuskipting með skyldum innri mörkum hefur réttan fjölda" BI.one (Oracle.countCutletPartitionsForTest 4 2 (Just 2))
    , listCheck "Kótilettuskipting með skyldu innra marki" [ 2, 2 ] (Oracle.unrankCutletPartition 4 2 (Just 2) BI.one)
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
        "Sautján kótilettunöfn hafa nákvæma canonicalIndex-röð"
        (indicesExactly 17 Catalog.cutletEntries)
        "1..17, hvert gildi einu sinni"
        (String.fromInt (List.length Catalog.cutletEntries) ++ " færslur")
    , check
        "Fjörutíu og sjö mánaðanöfn hafa nákvæma canonicalIndex-röð"
        (indicesExactly 47 Catalog.monthEntries)
        "1..47, hvert gildi einu sinni"
        (String.fromInt (List.length Catalog.monthEntries) ++ " færslur")
    , check
        "Fryst kótilettuskrá hefur nákvæm íslensk heiti"
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

<sub>1m 30s</sub>

### `github-mcp-server-get_file_contents`

**elm.json**

<details>
<summary>Arguments</summary>

```json
{
  "owner": "Sargon17-Green",
  "repo": "Pastafarian-Calendar",
  "ref": "267a63bc08f4bdd9e26b1249ca20b356877dc816",
  "path": "elm.json"
}
```

</details>

<details>
<summary>19 lines</summary>

```
successfully downloaded text file (SHA: 233e835b316b59612fbdd3f550311a53e8967c13){
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

<sub>1m 30s</sub>

### `github-mcp-server-get_file_contents`

**STAGE_01_EXECUTION_STATUS.txt**

<details>
<summary>Arguments</summary>

```json
{
  "owner": "Sargon17-Green",
  "repo": "Pastafarian-Calendar",
  "ref": "267a63bc08f4bdd9e26b1249ca20b356877dc816",
  "path": "STAGE_01_EXECUTION_STATUS.txt"
}
```

</details>

<details>
<summary>15 lines</summary>

```
successfully downloaded text file (SHA: e687ab5616c312fef2024702e220f00813b57615)STAGE=1
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

<sub>1m 30s</sub>

### `rg` — Failed

**NATURAL_LANGUAGE=|Short Choice|Wide Choice|Palgurash|Karshumav|Eridu|Uruk|Susa|Rifbein|Papýrusstör|Lokuðu dyrnar|{count} dagar|day(s)?**

"NATURAL_LANGUAGE=|Short Choice|Wide Choice|Palgurash|Karshumav|Eridu|Uruk|Susa|Rifbein|Papýrusstör|Lokuðu dyrnar|{count} dagar|day(s)?" (docs/i18n/locales/is.js, docs/about/content/is.html)

```
rg: regex parse error:
    (?:NATURAL_LANGUAGE=|Short Choice|Wide Choice|Palgurash|Karshumav|Eridu|Uruk|Susa|Rifbein|Papýrusstör|Lokuðu dyrnar|{count} dagar|day(s)?)
                                                                                                                        ^
error: repetition operator missing expression
```


---

<sub>1m 30s</sub>

### `rg`

**\.calendar-grid|\.calendar-day|cutlet|overflow|white-space|text-overflow**

"\.calendar-grid|\.calendar-day|cutlet|overflow|white-space|text-overflow" (docs/styles.css)

<details>
<summary>169 matches</summary>

```
[grep content: 167 matches across 1 file(s) under /home/runner/work/pastafari-calendar/pastafari-calendar/docs]

styles.css (167 match(es)):
  88-   max-width: 14ch;
  89-   margin-bottom: 0.8rem;
  90:   overflow-wrap: anywhere;
  91-   font-family: Georgia, "Times New Roman", "Noto Serif Hebrew", serif;
  92-   font-size: clamp(2.8rem, 8vw, 7rem);
  189-   max-width: 22ch;
  190-   margin-bottom: 0.7rem;
  191:   overflow-wrap: anywhere;
  192-   font-family: Georgia, "Times New Roman", "Noto Serif Hebrew", serif;
  193-   font-size: clamp(2rem, 5vw, 4rem);
  376-   margin-bottom: clamp(2rem, 5vw, 4rem);
  377-   padding: clamp(1.25rem, 3vw, 2.25rem);
  378:   overflow: hidden;
  379-   border: 4px solid var(--ink);
  380-   border-inline-start: clamp(0.75rem, 2vw, 1.35rem) solid var(--accent);
  405-   min-width: 0;
  406-   padding: 0.8rem;
  407:   overflow-wrap: anywhere;
  408-   border: 1px solid #a8977d;
  409-   border-radius: 0.7rem;
  429- }
  430- 
  431: .cutlet-identity h2 {
  432-   margin-bottom: 0.15rem;
  433:   overflow-wrap: anywhere;
  434-   font-family: Georgia, "Times New Roman", "Noto Serif Hebrew", serif;
  435-   font-size: clamp(2.2rem, 6vw, 5.2rem);
  437- }
  438- 
  439: .cutlet-identity p:last-child { margin-bottom: 0; color: var(--muted); }
  440- 
  441- .toolbar-actions {
  456- .reverse-mode-tab {
  457-   min-width: 0;
  458:   overflow-wrap: anywhere;
  459- }
  460- 
  468- }
  469- 
  470: .calendar-grid {
  471-   display: grid;
  472-   grid-template-columns: repeat(auto-fit, minmax(min(100%, 13rem), 1fr));
  485-   align-content: stretch;
  486-   gap: 0.48rem;
  487:   overflow: hidden;
  488-   border: 2px solid var(--month-edge);
  489-   border-radius: 0.85rem;
  512-   margin-bottom: 0.1rem;
  513-   padding: 0.28rem 0.55rem;
  514:   overflow-wrap: anywhere;
  515-   border: 2px solid currentcolor;
  516-   border-radius: 999px;
  528-   margin: 0;
  529-   padding: 0.42rem 0.55rem;
  530:   overflow-wrap: anywhere;
  531-   border: 2px solid color-mix(in srgb, var(--month-ink) 82%, transparent);
  532-   border-radius: 0.52rem;
  601- .year-facts dd {
  602-   margin: 0.35rem 0 0;
  603:   overflow-wrap: anywhere;
  604-   font-family: Georgia, "Times New Roman", "Noto Serif Hebrew", serif;
  605-   font-size: clamp(1.05rem, 1.7vw, 1.35rem);
  635-   border-radius: 0.7rem;
  636-   background: #fffdf8;
  637:   overflow: hidden;
  638- }
  639- 
  650-   margin: 0;
  651-   padding: 0;
  652:   overflow: auto;
  653-   list-style: none;
  654- }
  663- .structure-item:last-child { border-bottom: 0; }
  664- .structure-item[data-current="true"] { border-inline-start: 6px solid var(--accent); background: #fff0c2; }
  665: .structure-item strong { overflow-wrap: anywhere; font-family: Georgia, "Times New Roman", "Noto Serif Hebrew", serif; }
  666- .structure-item span { color: var(--muted); font-size: 0.88rem; line-height: 1.4; }
  667- 
  668- .comparison-workspace { padding-inline: clamp(1rem, 2.5vw, 2rem); }
  669- .comparison-summary { margin-top: 1.2rem; padding: 0.8rem 1rem; background: #f3eee4; color: var(--muted); font-weight: 700; }
  670: .comparison-scroll { display: none; max-height: 75vh; margin-top: 1rem; overflow: auto; border: 2px solid var(--ink); border-radius: 0.75rem; background: white; }
  671- .comparison-table { width: 100%; min-width: 72rem; border-collapse: separate; border-spacing: 0; table-layout: fixed; }
  672- .comparison-table th, .comparison-table td { min-width: 0; padding: 0.7rem; vertical-align: top; border-inline-end: 1px solid var(--line); border-bottom: 1px solid var(--line); }
  675- .comparison-table thead th:nth-child(2), .comparison-table thead th:nth-child(3) { width: calc((100% - 14rem) / 2); }
  676- .comparison-shared-day { background: #f3eee4; text-align: start; }
  677: .comparison-shared-day strong, .comparison-shared-day small { display: block; overflow-wrap: anywhere; }
  678- .comparison-shared-day small { margin-top: 0.25rem; color: var(--muted); font-weight: 500; }
  679- .comparison-date-cell { background: #fffdf8; }
  682-   min-width: 0;
  683-   padding: 0.45rem 0.55rem;
  684:   overflow-wrap: anywhere;
  685-   border: 1px solid #b9ad9b;
  686-   border-radius: 0.45rem;
  707-   min-height: 16rem;
  708-   padding: 1.1rem;
  709:   overflow-wrap: anywhere;
  710-   border-top: 2px solid var(--ink);
  711-   background: #fffaf2;
  767- @media (max-width: 420px) {
  768-   .app-shell { width: min(100% - 1rem, 94rem); }
  769:   .calendar-grid { grid-template-columns: 1fr; }
  770-   .floating-guide-link { inset-block-end: 0.5rem; inset-inline-end: 0.5rem; }
  771- }
  802-   .toolbar-actions, .guide-link, .floating-guide-link, .back-to-calendar, .site-footer, .language-control, .advanced-settings, .search-panel { display: none; }
  803-   .public-guide, .comparison-workspace, .year-overview { box-shadow: none; }
  804:   .structure-list { max-height: none; overflow: visible; }
  805-   h1 { font-size: 2.5rem; }
  806-   .calendar-workspace { padding: 1rem 0 0; }
  807:   .calendar-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0.2rem; }
  808-   .day-card { min-height: 0; break-inside: avoid; border: 1px solid #111; background: white; color: black; box-shadow: none; }
  809-   .day-card[data-target="true"] { border: 3px solid #111; outline: none; box-shadow: none; }
  810-   .day-line { border: 1px solid #111; background: white; color: black; box-shadow: none; font-size: 0.72rem; }
  811:   .comparison-scroll { display: block; max-height: none; overflow: visible; }
  812-   .comparison-table { min-width: 0; }
  813-   .comparison-table thead th { position: static; }
  983- .reverse-solution-fact { min-width: 0; padding: 0.6rem; background: white; border: 1px solid #ded3c2; }
  984- .reverse-solution-fact dt { color: var(--muted); font-size: 0.8rem; font-weight: 800; }
  985: .reverse-solution-fact dd { margin: 0.25rem 0 0; overflow-wrap: anywhere; }
  986- .reverse-solution-fact strong,
  987- .reverse-solution-fact small { display: block; }
  990- .reverse-solution-relations { display: grid; gap: 0.5rem; margin-top: 0.75rem; padding-top: 0.75rem; border-top: 1px solid var(--line); }
  991- .reverse-relation-row { align-items: flex-start; }
  992: .reverse-relation-row span { min-width: 0; overflow-wrap: anywhere; }
  993- 
  994- @media (max-width: 900px) {
  1234-   margin: 1rem auto;
  1235-   padding: 0.65rem 0.85rem;
  1236:   overflow-x: auto;
  1237-   border: 0;
  1238-   border-inline-start: 3px solid #cbbda9;
  1261-   margin: 1rem auto;
  1262-   padding: 0.8rem 0.95rem;
  1263:   overflow-x: auto;
  1264-   border: 1px solid var(--line);
  1265-   border-radius: 0.35rem;
  1272-   width: min(100%, 64rem);
  1273-   margin: 1.4rem auto;
  1274:   overflow-x: auto;
  1275-   border-block: 1px solid var(--line);
  1276-   border-inline: 0;
  1304- .about-kv-table-wrap {
  1305-   width: min(100%, 54rem);
  1306:   overflow: visible;
  1307- }
  1308- 
  1332- 
  1333- .about-kv-table tbody td:last-child {
  1334:   white-space: normal;
  1335- }
  1336- 
  1476- @media (max-width: 620px) {
  1477-   .about-kv-table-wrap {
  1478:     overflow: visible;
  1479-   }
  1480- 
  1488-     width: 1px;
  1489-     height: 1px;
  1490:     overflow: hidden;
  1491-     clip: rect(0 0 0 0);
  1492-     clip-path: inset(50%);
  1493:     white-space: nowrap;
  1494-   }
  1495- 
  1586- 
  1587-   .about-table-scroll {
  1588:     overflow: visible;
  1589-     border: 0;
  1590-   }
```

</details>


---

<sub>2m 10s</sub>

### `rg`

**Palgurash|Papýrusstör|Eridu|Karshumav|Rifbein|Karób|Uruk|Lokuðu dyrnar|Susa|Short Choice|Wide Choice**

"Palgurash|Papýrusstör|Eridu|Karshumav|Rifbein|Karób|Uruk|Lokuðu dyrnar|Susa|Short Choice|Wide Choice" (docs/i18n/locales/is.js)

<details>
<summary>9 matches</summary>

```
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js:277:      "palgurash": "Palgurash",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js:278:      "papyrusSedge": "Papýrusstör",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js:294:      "eridu": "Eridu",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js:297:      "karshumav": "Karshumav",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js:303:      "rib": "Rifbein",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js:304:      "carob": "Karób",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js:305:      "uruk": "Uruk",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js:321:      "theClosedDoor": "Lokuðu dyrnar",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js:325:      "susa": "Susa",
```

</details>


---

<sub>2m 10s</sub>

### `github-mcp-server-search_code`

**"NATURAL_LANGUAGE=איסלנדית" repo:Sargon17-Green/Pastafarian-Calendar**

<details>
<summary>Arguments</summary>

```json
{
  "query": "\"NATURAL_LANGUAGE=איסלנדית\" repo:Sargon17-Green/Pastafarian-Calendar",
  "perPage": 5,
  "fields": [
    "path",
    "text_matches",
    "repository"
  ]
}
```

</details>

```
{"incomplete_results":true,"items":[],"total_count":0}
```


---

<sub>2m 10s</sub>

### `github-mcp-server-search_code` — Failed

**"mánaðanöfn" repo:Sargon17-Green/Pastafarian-Calendar**

<details>
<summary>Arguments</summary>

```json
{
  "query": "\"mánaðanöfn\" repo:Sargon17-Green/Pastafarian-Calendar",
  "perPage": 10,
  "fields": [
    "path",
    "text_matches",
    "repository"
  ]
}
```

</details>

```
MCP server 'github-mcp-server': failed to search code with query '"mánaðanöfn" repo:Sargon17-Green/Pastafarian-Calendar': GET https://api.github.com/search/code?page=1&per_page=10&q=%22m%C3%A1na%C3%B0an%C3%B6fn%22+repo%3ASargon17-Green%2FPastafarian-Calendar: 429 try again in 712.075577725s []
```


---

<sub>2m 10s</sub>

### `rg`

**Short Choice|Wide Choice|Stutt val|vítt val|Palgúrasj|Karsjúmav|lokaða hurðin**

"Short Choice|Wide Choice|Stutt val|vítt val|Palgúrasj|Karsjúmav|lokaða hurðin" (docs/about/content/is.html)

```
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html:141:  <h2>Stutt val (Short Choice) og vítt val (Wide Choice)</h2>
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html:143:  <p>Fyrir mjög stór valrúm er <strong>vítt val</strong> notað. Ekki má eigna því eiginleika sem forskriftin tryggir ekki.</p>
```


---

<sub>2m 10s</sub>

### `rg`

**<noscript>|JavaScript|<html lang=|meta name="description"**

"<noscript>|JavaScript|<html lang=|meta name="description"" (docs/index.html, docs/about/index.html)

<details>
<summary>8 matches</summary>

```
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/index.html:2:<html lang="en" dir="ltr">
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/index.html:7:    <meta name="description" content="An explanation of the Pastafari Calendar." data-i18n-attr="content:about.metaDescription">
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/index.html:75:    <noscript>
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/index.html:77:        <p><strong>JavaScript</strong> <span aria-hidden="true">⚠</span></p>
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/index.html:2:<html lang="en" dir="ltr">
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/index.html:7:    <meta name="description" content="A local, deterministic Pastafari calendar." data-i18n-attr="content:meta.description">
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/index.html:197:    <noscript>
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/index.html:199:        <p><strong>JavaScript</strong> <span aria-hidden="true">⚠</span></p>
```

</details>


---

<sub>2m 10s</sub>

### `rg`

**count|cutlet|month|days|length**

"count|cutlet|month|days|length" (docs/i18n/locales/is.js)

<details>
<summary>26 matches</summary>

```
[grep content: 24 matches across 1 file(s) under /home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales]

is.js (24 match(es)):
  58:     "comparison.summary": "Sýndir eru {count} dagar, frá fyrsta til síðasta dags kótelettunnar sem birtist í fyrri útreikningnum.",
  63:     "field.month": "Mánuður",
  119:     "calendar.daysAria": "Dagar í kótelettunni {cutletName}",
  121:     "calendar.cutletDescription": "{count} dagar · aðgerðardagur: {actionDate}",
  128:     "year.lengthLabel": "Lengd ársins",
  129:     "year.cutletCountLabel": "Kótelettur",
  130:     "year.monthCountLabel": "Mánuðir",
  132:     "year.daysValue": "{count} dagar",
  135:     "year.targetPosition": "Leitaða dagsetningin er dagur {day} af {length} í þessu ári.",
  136:     "year.monthExplainer": "Mánuðir fléttast óháð kótelettum í gegnum árið: mánuður er ekki undirdeild kótelettu og dagar hans geta birst í mörgum aðskildum runum. Lengd mánaðar er því heildarfjöldi daga sem honum er úthlutað, ekki endilega eitt samfellt tímabil.",
  137:     "year.cutletsSummary": "Kótelettur á þessu ári ({count})",
  138:     "year.monthsSummary": "Mánuðir á þessu ári ({count})",
  140:     "year.cutletMeta": "Lengd: {length} dagar · staða í árinu: dagar {start}–{end}",
  141:     "year.monthMeta": "Dagar: {length} · samfelldar runur: {runs} · fyrsta birting: dagur {first} · síðasta: dagur {last}",
  146:     "date.aria": "Ár {year} frá sköpun heimsins, dagur {dayInCutlet} í kótelettunni {cutletName}, dagur {dayInMonth} í mánuðinum {monthName}",
  148:     "date.cutletLine": "Dagur {dayInCutlet} í kótelettunni {cutletName}",
  149:     "date.monthLine": "Dagur {dayInMonth} í mánuðinum {monthName}",
  179:     "reverse.field.cutlet": "Kóteletta",
  181:     "reverse.field.month": "Mánuður",
  206:     "reverse.progress.scanned": "Unnar vinnueiningar: {count}",
  211:     "reverse.status.completeSolutions": "Leit lokið. Allar lausnir á leitarsviðinu ({count}) eru sýndar.",
  213:     "reverse.status.partialSolutions": "Staðfestar lausnir sem fundust: {count}. Leitin stöðvaðist áður en henni lauk; fleiri lausnir gætu verið til.",
  270:     "cutlets": {
  289:     "months": {
```

</details>


---

<sub>2m 54s</sub>

### `rg`

**textContent\s*=\s*["'`]|\.ariaLabel\s*=\s*["'`]|setAttribute\(["'](?:aria-label|title|placeholder)["']\s*,\s*["'`]|node\(["'](?:button|label|h[1-6]|p|span)["']\s*,\s*["'`]**

"textContent\s*=\s*["'`]|\.ariaLabel\s*=\s*["'`]|setAttribute\(["'](?:aria-label|title|placeholder)["']\s*,\s*["'`]|node\(["'](?:button|label|h[1-6]|p|span)["']\s*,\s*["'`]" (docs/app.js, docs/reverse-ui.js, docs/reverse-search-controller.js)

<details>
<summary>47 matches</summary>

```
[grep content: 45 matches across 1 file(s) under /home/runner/work/pastafari-calendar/pastafari-calendar/docs]

reverse-ui.js (45 match(es)):
  89:     this.calendarLabel = node("label", "calendar-picker");
  96:     this.help = node("p", "field-help");
  97:     this.error = node("p", "form-error");
  127:       const text = node("span", "", this.services.siteT(field.labelKey));
  201:       const label = node("label", "date-field reverse-pastafari-field");
  269:     this.removeButton = node("button", "secondary-action reverse-remove", this.services.rt("reverse.action.remove"));
  272:     this.labelField = node("label", "date-field");
  273:     this.labelText = node("span", "", this.services.rt("reverse.variable.label"));
  278:     this.domainField = node("label", "date-field");
  279:     this.domainText = node("span", "", this.services.rt("reverse.variable.domain"));
  312:       start.append(node("h5", "", this.services.rt("reverse.basic.rangeStart")));
  314:       end.append(node("h5", "", this.services.rt("reverse.basic.rangeEnd")));
  356:     this.removeButton = node("button", "secondary-action reverse-remove", this.services.rt("reverse.action.remove"));
  359:     this.typeField = node("label", "date-field");
  360:     this.typeText = node("span", "", this.services.rt("reverse.constraint.type"));
  390:     const label = node("label", "date-field");
  391:     const text = node("span", "", this.services.rt(labelKey));
  441:     pfWrap.append(node("h5", "", this.services.rt("reverse.basic.dateHeading")));
  624:     this.basicTab = node("button", "reverse-mode-tab", this.rt("reverse.mode.basic"));
  626:     this.advancedTab = node("button", "reverse-mode-tab", this.rt("reverse.mode.advanced"));
  649:     const modeLabel = node("label", "date-field");
  663:     this.basicSolve = node("button", "search-submit", this.rt("reverse.action.solve"));
  666:     this.basicCancel = node("button", "secondary-action", this.rt("reverse.action.cancel"));
  693:       this.basicActiveValue = node("p", "field-help", this.rt("reverse.basic.activeValue", {
  715:       this.basicAdvancedButton = node("button", "secondary-action", this.rt("reverse.basic.toAdvanced"));
  730:     this.addVariableButton = node("button", "secondary-action", this.rt("reverse.action.addVariable"));
  737:     this.addConstraintButton = node("button", "secondary-action", this.rt("reverse.action.addConstraint"));
  744:     this.advancedSolve = node("button", "search-submit", this.rt("reverse.action.solve"));
  747:     this.advancedCancel = node("button", "secondary-action", this.rt("reverse.action.cancel"));
  764:     const intro = node("p", "field-help", this.rt("reverse.options.intro"));
  767:       const label = node("label", "date-field");
  768:       const span = node("span", "", this.rt(key));
  804:     this.progress = node("p", "reverse-progress");
  806:     this.error = node("p", "form-error");
  811:     this.clearButton = node("button", "secondary-action", this.rt("reverse.action.clear"));
  942:     this.progress.textContent = "";
  960:     this.progress.textContent = `${this.rt(phaseKey)} · ${this.rt("reverse.progress.scanned", { count: this.services.formatInteger(value.scanned) })}`;
  985:     card.append(node("h4", "", this.rt("reverse.result.solution", { index: index + 1 })));
  991:     const open = node("button", "primary-action", this.rt("reverse.action.open"));
  1013:     card.append(node("h4", "", this.rt("reverse.result.solution", { index: index + 1 })));
  1027:       const text = node("span", "", `${context.labels[source.target] || source.target}: ${this.services.formatJdn(targetJdn)} · ${this.rt("reverse.result.calculation")}: ${this.services.formatJdn(calculationJdn)}`);
  1028:       const open = node("button", "secondary-action", this.rt("reverse.action.open"));
  1052:     this.status.textContent = "";
  1082:     this.status.textContent = "";
  1083:     this.progress.textContent = "";
```

</details>


---

<sub>2m 54s</sub>

### `rg`

**kótilett|kótelett|mánaðanöfn|NATURAL_LANGUAGE**

"kótilett|kótelett|mánaðanöfn|NATURAL_LANGUAGE" (docs)

<details>
<summary>50 matches</summary>

```
[grep content: 47 matches across 2 file(s) under /home/runner/work/pastafari-calendar/pastafari-calendar/docs]

about/content/is.html (25 match(es)):
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
  230:   <p>Þar sem forskriftin er fullkomin og kerfið determinískt má einnig reikna allt með höndunum: reiknið inntaksteljarana, farið í gegnum 7 falda og 46 sýnilega dropa, uppfærið skálarnar sex, framkvæmið 12 lokablöndurnar, myndið svörin, byggið hliðin, veljið ár og kótelettur, framkvæmið samsetningarval, veljið nöfnin og fléttið síðan mánuðina.</p>
  273:   <pre class="math-block" dir="ltr" tabindex="0"><code>(\text{kótelettunafn},\text{dagur í kótelettu})</code></pre>
  283:         <tr><td>Aðeins kótelettunafnið</td><td>5.568</td></tr>
  284:         <tr><td>Aðeins dagur í kótelettu</td><td>17</td></tr>
  287:         <tr><td>Kótelettunafn + dagur í kótelettu</td><td>1</td></tr>
  327:   <p>Hver dagsetning hefur nákvæmlega fimm reiti. Núið er frá sínu eigin sjónarhorni alltaf í ári 5000, en ár 5000 sjálft færist með aðgerðardeginum. Ár geta verið mjög löng, kótelettur eru samfelldar, mánuðir ekki endilega, og ekkert kanónískt vikukerfi er til.</p>

i18n/locales/is.js (22 match(es)):
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

<sub>2m 54s</sub>

### `rg`

**^\s*"(?:Palgurash|Palgúrasj|Papýrusstör|Eridu|Karshumav|Rifbein|Karób|Uruk|Lokuðu dyrnar|Susa)"**

"^\s*"(?:Palgurash|Palgúrasj|Papýrusstör|Eridu|Karshumav|Rifbein|Karób|Uruk|Lokuðu dyrnar|Susa)"" (docs/i18n/locales/is.js)

```
No matches found.
```


---

<sub>2m 54s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/styles.css.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/styles.css (lines 465-535)

<details>
<summary>65 lines</summary>

```
  background: #fff4d4;
  color: #573e0e;
  font-weight: 750;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 13rem), 1fr));
  gap: clamp(0.65rem, 1.2vw, 1rem);
  padding-block: 1.5rem 2rem;
  align-items: stretch;
}

.day-card {
  position: relative;
  display: grid;
  min-width: 0;
  min-height: 10.5rem;
  padding: 0.85rem;
  grid-template-rows: auto auto auto;
  align-content: stretch;
  gap: 0.48rem;
  overflow: hidden;
  border: 2px solid var(--month-edge);
  border-radius: 0.85rem;
  background-color: var(--month-bg);
  background-image: var(--month-pattern-image, none);
  background-size: var(--month-pattern-size, auto);
  background-repeat: repeat;
  color: var(--month-ink);
  box-shadow: inset 0 1px rgb(255 255 255 / 14%);
}

.day-card[data-target="true"] {
  z-index: 2;
  border: 6px solid white;
  outline: 7px solid var(--ink);
  outline-offset: -1px;
  box-shadow:
    0 0 0 5px var(--accent),
    0 12px 28px rgb(0 0 0 / 40%);
}

.target-badge {
  display: block;
  width: fit-content;
  max-width: 100%;
  margin-bottom: 0.1rem;
  padding: 0.28rem 0.55rem;
  overflow-wrap: anywhere;
  border: 2px solid currentcolor;
  border-radius: 999px;
  background: var(--month-text-bg, var(--month-bg));
  font-size: 0.74rem;
  font-weight: 950;
  line-height: 1.25;
}

.day-card[data-target="true"] { grid-template-rows: auto auto auto auto; }

.day-line {
  display: block;
  min-width: 0;
  margin: 0;
  padding: 0.42rem 0.55rem;
  overflow-wrap: anywhere;
  border: 2px solid color-mix(in srgb, var(--month-ink) 82%, transparent);
  border-radius: 0.52rem;
  background-color: var(--month-text-bg, var(--month-bg));
  color: var(--month-ink);
  box-shadow: 0 2px 7px rgb(0 0 0 / 22%);
```

</details>


---

<sub>2m 54s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/styles.css.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/styles.css (lines 800-812)

<details>
<summary>13 lines</summary>

```
  .app-shell { width: 100%; padding: 0; }
  .masthead { grid-template-columns: 1fr; padding-block: 0 1rem; }
  .toolbar-actions, .guide-link, .floating-guide-link, .back-to-calendar, .site-footer, .language-control, .advanced-settings, .search-panel { display: none; }
  .public-guide, .comparison-workspace, .year-overview { box-shadow: none; }
  .structure-list { max-height: none; overflow: visible; }
  h1 { font-size: 2.5rem; }
  .calendar-workspace { padding: 1rem 0 0; }
  .calendar-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0.2rem; }
  .day-card { min-height: 0; break-inside: avoid; border: 1px solid #111; background: white; color: black; box-shadow: none; }
  .day-card[data-target="true"] { border: 3px solid #111; outline: none; box-shadow: none; }
  .day-line { border: 1px solid #111; background: white; color: black; box-shadow: none; font-size: 0.72rem; }
  .comparison-scroll { display: block; max-height: none; overflow: visible; }
  .comparison-table { min-width: 0; }
```

</details>


---

<sub>3m 45s</sub>

### Copilot

NATIVE_QA_RESULT: FAIL

## Heildarniðurstaða

Yfirferðin stenst ekki stranga málfræðilega og merkingarlega QA-yfirferð milli geymslna. Greindust ósamræmi í íslenskum dagatalsheitum, merkingarfrávik í einu heiti, texti í öðru ritkerfi í lýsigögnum og ófullnægjandi varaleið án JavaScript.

Fryst markmið pössuðu við manifest: `Sargon17-Green/pastafari-calendar`, útibú `feature/about-i18n-72-locales`, commit `cd5325860fa2d2aa58abba31e207de27efe52e4d`; og `Sargon17-Green/Pastafarian-Calendar`, útibú `Elm+íslensku`, commit `267a63bc08f4bdd9e26b1249ca20b356877dc816`.

## Rangt tungumál / varatexti

1. **Alvarleiki: medium** — `Sargon17-Green/Pastafarian-Calendar`, `Elm+íslensku`, `DEVELOPMENT_STAGE.md:13`.  
   **Núverandi texti:** `NATURAL_LANGUAGE=איסלנדית`  
   **Útskýring:** Gildið er hebreska orðið fyrir íslensku, ekki íslenskur texti eða staðlað tungumálaauðkenni. Það stingur í stúf við íslenska skjalasafnið og línuna `FOREIGN_LANGUAGE_USAGE=NONE`.  
   **Ráðlögð leiðrétting:** Nota `íslenska` eða staðlað auðkenni á borð við `is-IS`, eftir því hvaða snið skráin á að fylgja.

2. **Alvarleiki: low** — `Sargon17-Green/pastafari-calendar`, `feature/about-i18n-72-locales`, `docs/index.html:197–200` og `docs/about/index.html:75–78`.  
   **Núverandi texti:** Í báðum `\<noscript>`-blokkum stendur aðeins `JavaScript ⚠`; grunnskjölin eru merkt `lang="en"`.  
   **Útskýring:** Án JavaScript birtast enskir grunntextar, og á `/about/` er greinin ekki sótt; viðvörunin útskýrir ekki á íslensku hvers vegna efnið vantar eða hvað notandi geti gert.  
   **Ráðlögð leiðrétting:** Bæta við skýrri íslenskri skilaboðaleið fyrir JavaScript-lausa notkun, með viðeigandi tungumálamerkingu, eða bjóða upp á kyrrstæða staðfærða varasíðu.

## Samræmi í hugtakanotkun

3. **Alvarleiki: medium** — `Sargon17-Green/pastafari-calendar`, `feature/about-i18n-72-locales`, `docs/i18n/locales/is.js:277, 297, 321`; borið saman við `Sargon17-Green/Pastafarian-Calendar`, `Elm+íslensku`, `src/Pastafari/SourceLanguageCatalog.elm` og `SOURCE_LANGUAGE_CATALOG.md`.  
   **Núverandi texti:** Vefurinn notar `Palgurash`, `Karshumav` og `Lokuðu dyrnar`; frysta íslenska skráin notar `Palgúrasj`, `Karsjúmav` og `lokaða hurðin`.  
   **Útskýring:** Fyrstu tvö heitin fara ekki eftir íslensku umritunarreglunni sem er skráð fyrir tilbúnu nöfnin. Þriðja heitið breytir eintölu „hurðin“ í fleirtölu „dyrnar“ og breytir þar með merkingu kanóníska nafnsins.  
   **Ráðlögð leiðrétting:** Samræma birtingarheitin við frystu íslensku heitin og varðveita stöðug auðkenni og `canonicalIndex` óbreytt.

4. **Alvarleiki: low** — `Sargon17-Green/Pastafarian-Calendar`, `Elm+íslensku`, `README.md` undir „Innihald Stage 1“ og `tests/Stage01Checks.elm`, prófunarheitið „Fjörutíu og sjö mánaðanöfn…“.  
   **Núverandi texti:** `mánaðanöfn`  
   **Útskýring:** Samsetta orðið vantar r-ið í `mánaðarnöfn`; villan kemur bæði fyrir í README-texta og í heiti sem birtist í prófunarniðurstöðum.  
   **Ráðlögð leiðrétting:** Breyta orðmyndinni í `mánaðarnöfn` á báðum stöðum.

5. **Alvarleiki: low** — `Sargon17-Green/Pastafari-Calendar`, `Elm+íslensku`, `README.md` og `src/Pastafari/SourceLanguageCatalog.elm`, borið saman við íslensku vefstaðfærsluna í `docs/i18n/locales/is.js`.  
   **Núverandi texti:** Útfærslugögnin nota `kótiletta`/`kótilettunöfn`; vefurinn notar `kóteletta`/`kótelettunöfn`.  
   **Útskýring:** Hugtakið er hið sama en stafsetningin er ósamræmd milli geymslna.  
   **Ráðlögð leiðrétting:** Velja eina staðlaða íslenska orðmynd og nota hana samræmt í vef, skjölum og prófunartexta.

## Lýsigögn, ARIA, manifest og varaleiðir

`is`-gildin í `docs/manifest.webmanifest` eru íslensk og merkt `lang: "is"` og `dir: "ltr"`. Tungumálaskráin og greinin nota einnig LTR, og formúlur hafa skýra LTR-merkingu. ARIA- og skjálesaratextar sem tengjast venjulegri notkun eru staðfærðir í `is.js`; `about`-varagreinin er merkt eftir því tungumáli sem er sótt. Enginn annar sérstakur galli fannst í þessum atriðum. Varaleiðin án JavaScript er þó gallinn sem lýst er hér að framan. Skráða stuðningsstigið fyrir `is` er `partial`; því er enskur varatexti mögulegur fyrir lykla sem vantar, en enginn ákveðinn slíkur lykill er skráður hér sem staðfest villa.

## Skjöl og texti ætlaður notendum í útfærsluútibúi

Farið var yfir README, `DEVELOPMENT_STAGE.md`, `SOURCE_LANGUAGE_CATALOG.md`, þróunarsögu, stöðuskrár og úttektir, auk birtingartexta í `SourceLanguageCatalog`, `Stage01Checks` og `BootstrapFixtures`. Fundust atriðin um hebreskt lýsigildi, stafsetningu `mánaðarnöfn` og ósamræmi í `kóteletta`-heitinu hér að ofan. Ekki fundust önnur augljós ensk skilaboð eða erlendur varatexti í þeim íslensku skjölum og prófunarmerkingum sem skoðuð voru.

## Textatengd áhætta á línuskiptingu/yfirflæði

Langheiti eins og `Fjórir hlutar af níu` og `Þrír hlutar af fimm`, ásamt lengri leiðbeiningum og lýsingum, geta brotnað á margar línur í dagareitum, samanburði og prentútliti. CSS notar `overflow-wrap: anywhere` á nokkrum viðeigandi svæðum, sem dregur úr yfirflæðishættu; prentstíll þrengir dagareiti í þrjá dálka og eykur því hættu á óheppilegum línuskilum. Þetta er textatengt áhættumat, ekki sjónræn yfirferð.

Yfirferðin var kyrrstæð og málfræðileg/merkingarleg. Hvorki sjónræn yfirferð á birtri síðu, prófun á aðgengissamskiptum né keyrsla í vafra fór fram.

---

<sub>Generated by [GitHub Copilot CLI](https://github.com/features/copilot/cli)</sub>
