# Copilot CLI Session

> [!NOTE]
> - **Session ID:** `52589592-1ced-4840-a90c-c424462e60b0`  
> - **Started:** 9/26/2026, 8:45:47 PM  
> - **Duration:** 2m 25s  
> - **Exported:** 9/26/2026, 8:48:12 PM  

---

<sub>1s</sub>

### User

# Upprunaleg samskiptaregla fyrir yfirferð á móðurmáli milli geymslusvæða

Þú ert óháður yfirferðarfulltrúi á móðurmáli fyrir Pastafarian Calendar-verkefnið og metur málfar, merkingu, skjöl og notendaviðmót.

Yfirferðareiningin er Íslenska (yfirferðarauðkenni `is`; staðfærsla/merki `is-IS`).

REVIEW_ID=is
LOCALE_TAG=is-IS

Öll samskipti með náttúrulegu máli í þessari yfirferðarlotu skulu vera á Íslensku. Fyrstu notendaskilaboðin eru þessi þýdda fyrirmæli og allur náttúrulegur texti í svari þínu skal áfram vera á Íslensku. Ekki skipta yfir í ensku. Nákvæm heiti geymslusvæða, heiti greina, slóðir, auðkenni, kóðabókstafir, formúlur, kjötkássar, API-heiti og áskilin véllesanleg niðurstaðalína eru undanþegin.

Þetta er ný og einangruð yfirferðarlota. Hún er eingöngu fyrir yfirferð: ekki breyta, búa til, endurnefna eða eyða skrám í geymslusvæðum.

Það eru tvö geymslusvæði. Skoðaðu hvert viðeigandi yfirborð sem talið er upp í staðbundna yfirferðar-yfirlitinu:
1. Sargon17-Green/pastafari-calendar — þegar þessi yfirferðareining hefur staðfærða útgáfu af vefsvæði skal skoða ALLT vefsvæðið fyrir þá staðfærslu, ekki aðeins /about/. Lestu alla staðfærsluskrána og /about/-greinina og skoðaðu aðalnotendaviðmót, dagsetningarleit, val á dagatali, aðgerða-/vinnudagsstýringar, samanburð, ársýn, öfuga leit, stöður fyrir hleðslu/tómt/​​villu/staðfestingu, leiðbeiningar, fót, lýsigögn/heiti, staðfærslu upplýsingaskrár, noscript-/varaleiðir, ARIA-/aðgengisstrengi, tungumálaskipti og líklega úrelta varatexta. Athugaðu samninginn um skilaboðalykla, merkingarhlutverk staðgengla, stöðug auðkenni og kanónískar bókstaflegar gildisfærslur.
   Skoðaðu einnig færsluna fyrir markmálið `\<details data-locale="...">` í `docs/no-js/index.html`. Sjálfsheiti hinna tungumálanna á þeirri síðu eru viljandi kyrrstætt tungumálaval, hliðstætt tungumálavali, og teljast ekki texti á röngu tungumáli aðeins vegna þess að þau eru til staðar. Texti inni í samanbrotnu `\<details>`-svæði annars tungumáls er sömuleiðis viljandi; tilkynntu aðeins um hann ef hann verður sýnilegur eða er notaður sem varatexti fyrir markmálið.
2. Sargon17-Green/Pastafarian-Calendar — skoðaðu HVERJA grein sem er skráð fyrir þessa yfirferðareiningu. Farðu yfir allan texta sem ætlaður er fólki: README og skjöl, fyrirsagnir og meginmál, útskýringar í skjölum kóða, hjálpartexta CLI, ábendingar, villur, merkingar í úttaki, lýsigögn, dæmi og mynduð skjöl. Ekki þýða setningafræði forritunarmáls, auðkenni, kjötkássa, formúlur, API-heiti eða kanónískar kóðabókstafi.

Líttu sérstaklega eftir:
- skiljanlegum en ómóðurmállegum þýðingastíl;
- texta á röngu tungumáli, enskum leka, varatexta úr nærliggjandi tungumáli eða blönduðum skriftum;
- vandamálum í málfræði, beygingum, föllum, samræmi, orðaröð, stafsetningu, greinarmerkjum, málfari og orðasamböndum;
- ósamræmi í hugtakanotkun milli notendaviðmóts vefsins, /about/ og útfærslugreina;
- tæknilega röngum þýðingum eða orðalagi sem breytir staðreynd um reiknirit;
- staðgenglum sem eru notaðir í röngu merkingarhlutverki, jafnvel þótt mengi staðgengla passi;
- skemmdum Unicode-texta, stöfum úr rangri skrift, BiDi-vandamálum og vandamálum með greinarmerki í RTL/LTR þar sem það á við;
- lýsigögnum, heiti, ARIA, skjálestrartexta, staðfærslu upplýsingaskrár, varatexta og no-JavaScript-vandamálum;
- líklegri hættu á línubroti eða yfirflæði vegna texta á markmálinu. Síðasti liðurinn er aðeins textatengt áhættumat og MÁ EKKI lýsa honum sem sjónrænni gæðaprófun eftir birtingu.

Kanónískar ófrávíkjanlegar reglur eru bindandi. Ekki leggja til að formúlur, kjötkássar, stöðug kaflaauðkenni, API-auðkenni, nákvæmir kóðabókstafir eða raunveruleg kanónísk heiti verði þýdd eða breytt eingöngu vegna stílsamræmis.

Samræmi milli geymslusvæða er merkingarlegt, ekki endilega orðrétt. Mismunandi orðalag er leyfilegt þegar bæði form eru eðlileg og varðveita sama hugtak. Ef annað formið breytir tæknilegri merkingu skal tilkynna það.

Fyrir efnislega ólíkar afbrigði eða skriftir sem eru táknuð með aðskildum yfirferðareiningum skaltu aðeins fara yfir það afbrigði sem nefnt er í þessum fyrirmælum og yfirlitinu.

FYRSTA lína svars þíns VERÐUR að vera nákvæmlega ein af þessum:
NATIVE_QA_RESULT: PASS
NATIVE_QA_RESULT: FAIL

Eftir þá línu skaltu aðeins skrifa Markdown-skýrslu á Íslensku. Hún skal innihalda:
- heildarniðurstöðu PASS/FAIL fyrir stranga málfars- og merkingarlega gæðatryggingu þvert á geymslusvæði;
- allar niðurstöður með alvarleikastigi (critical/high/medium/low), nákvæmu geymslusvæði, grein, skrá og nákvæmri staðsetningu þegar það er mögulegt, núverandi texta, útskýringu og ráðlagðri leiðréttingu;
- sérstakan kafla um texta á röngu tungumáli/varatexta;
- sérstakan kafla um samræmi í hugtakanotkun;
- sérstakan kafla um lýsigögn/ARIA/upplýsingaskrá/noscript/varatexta þegar staðfærð útgáfa vefsins er til;
- sérstakan kafla um skjöl og texta fyrir notendur í útfærslugreinum;
- sérstakan kafla um textatengda áhættu á línubroti eða yfirflæði í notendaviðmóti þegar staðfærð útgáfa vefsins er til;
- ef enginn galli finnst skaltu taka það skýrt fram og tilgreina hvaða yfirborð þú skoðaðir í reynd.

Ekki halda því fram að sjónræn gæðaprófun eftir birtingu, prófun á aðgengissamskiptum, prófun á keyrslu án nettengingar/PWA eða prófun á samskiptum í vafra hafi farið fram nema sérstök keyrslugögn liggi fyrir. Þessi lota er eingöngu málfarsleg og merkingarleg hlið náttúrulegs máls.



---

<sub>4s</sub>

### `bash` — Failed

**Kanna stöðu og geymslusvæði**

$ git status --short && printf '\nRoot entries:\n' && ls -la && printf '\nParent entries:\n' && ls -la ..

```
Permission denied and could not request permission from user
```


---

<sub>4s</sub>

### `glob`

****/*locale*review***

"**/*locale*review*"

```
No files matched the pattern.
```


---

<sub>4s</sub>

### `glob`

****/*review*overview***

"**/*review*overview*"

```
No files matched the pattern.
```


---

<sub>8s</sub>

### `glob`

*****

"*"

<details>
<summary>459 matches</summary>

```
[glob: 1295 path(s) under .; concrete paths]
61fe/22ceb387c793e7d3a04faf662fa5507d62bd.gz
artifacts/update-08-stage-05-a-fail-a.raw
artifacts/update-08-stage-07-fast-compatibility-original.stderr
docs/icons/icon.svg
docs/manifest.webmanifest
docs/styles.css
implementations/cobol/copybook/pastafari-engine.cpy
implementations/java/pom.xml
implementations/java/src/main/java/org/appointedtimes/PastafariCalendar.java
implementations/python/pyproject.toml
implementations/tests/oracle-differential-10000.tsv
types/5fd0767aaf5331241ec60f8540edf2a6.d.ts
verification/evidence/soak-c5db804-2026-08-13.jsonl
artifacts/final-release/update19-final-evidence.zip
artifacts/stage5-cache-history-chronicle-public.err
artifacts/update-08-stage-05-a-fail-a.err
implementations/cpp/include/pastafari/bigint.hpp
implementations/cpp/include/pastafari/calendar.hpp
verification/evidence/cpp-js-soak-2026-08-16-artifacts.zip
artifacts/cross-repo-native-qa/attempts/is/36269544744/prompt.sha256
artifacts/cross-repo-native-qa/runtime/prompt.sha256
artifacts/cross-repo-native-qa/runtime/repo2-0/CANONICAL_NAMES_LOCK.sha256
artifacts/update-12-standalone-input-parity.sha256
implementations/c/include/calendar_core.h
implementations/c/include/wideint.h
implementations/c/src/gate_checkpoints.h
implementations/cobol/pastafari-engine.cob
implementations/cobol/runtime/pastafari_bigint.h
implementations/cobol/src/pastafari-engine.cob
implementations/cobol/test/pastafari-batch.cob
implementations/cobol/test/pastafari-vectors.cob
implementations/ruby/cli.rb
implementations/ruby/differential.rb
implementations/ruby/pastafari_calendar.rb
implementations/ruby/test.rb
implementations/cpp/src/calendar.cpp
implementations/cpp/src/main.cpp
implementations/cpp/tests/benchmark.cpp
implementations/cpp/tests/bigint.cpp
implementations/cpp/tests/conformance.cpp
implementations/cpp/tests/differential.cpp
artifacts/cross-repo-native-qa/runtime/repo2-0/src/Pastafari/ExactInt.elm
artifacts/cross-repo-native-qa/runtime/repo2-0/src/Pastafari/MonsterBase.elm
artifacts/cross-repo-native-qa/runtime/repo2-0/src/Pastafari/SourceLanguageCatalog.elm
artifacts/cross-repo-native-qa/runtime/repo2-0/src/Pastafari/Spaghetti.elm
artifacts/cross-repo-native-qa/runtime/repo2-0/tests/BootstrapFixtures.elm
artifacts/cross-repo-native-qa/runtime/repo2-0/tests/NormativeOracle.elm
artifacts/cross-repo-native-qa/runtime/repo2-0/tests/Stage01Checks.elm
artifacts/cross-repo-native-qa/runtime/repo2-0/tests/Stage01Harness.elm
implementations/c/pastafari_core.c
implementations/c/src/calendar_core.c
implementations/c/src/main.c
implementations/c/src/wideint.c
implementations/c/tests/canonical.c
implementations/c/tests/differential.c
implementations/cobol/runtime/pastafari_bigint.c
implementations/cobol/test/test-bigint.c
LICENSE
artifacts/cross-repo-native-qa/runtime/repo2-0/LICENSE
docs/LICENSE
implementations/c/Makefile
implementations/cobol/.gitignore
implementations/cobol/Makefile
implementations/cpp/Makefile
implementations/java/Makefile
implementations/ruby/Makefile
implementations/python/benchmark.py
implementations/python/pastafari_calendar/__init__.py
implementations/python/pastafari_calendar/__main__.py
implementations/python/pastafari_calendar/core.py
implementations/python/tests/test_conformance.py
implementations/python/tests/test_differential.py
implementations/tests/generate_spec_binding_5778.py
implementations/tests/generate_spec_canonical.py
implementations/tests/generate_spec_deep_year_chain.py
implementations/tests/run_cli_conformance.py
implementations/tests/verify_gate_checkpoints.py
verification/evidence/pastafari_soak_standalone_1_2_1.py
.github/dependabot.yml
.github/workflows/about-native-linguistic-qa.yml
.github/workflows/about-native-qa-batch.yml
.github/workflows/about-native-qa-smoke.yml
.github/workflows/benchmark.yml
.github/workflows/cross-repo-native-qa.yml
.github/workflows/implementations.yml
.github/workflows/locale-browser-qa.yml
.github/workflows/post-series-packed-package-parity.yml
.github/workflows/property-soak.yml
.github/workflows/refresh-checksums.yml
.github/workflows/release-verification.yml
.github/workflows/test.yml
.github/workflows/update-08-stage-04a.yml
.github/workflows/update-08-stage-07-router-fix.yml
.github/workflows/update-13-intl-audit.yml
.github/workflows/update-19-final-audit.yml
.github/workflows/update-20-release-closure.yml
.github/workflows/visual.yml
artifacts/cross-repo-native-qa/runtime/repo2-0/.github/workflows/canonical-names-lock.yml
docs/icons/icon-192.png
docs/icons/icon-512.png
test/visual/baselines/advanced-en-desktop.png
test/visual/baselines/calendar-edge-en-desktop.png
test/visual/baselines/calendar-mid-en-desktop.png
test/visual/baselines/calendar-next-cutlet-en-desktop.png
test/visual/baselines/comparison-en-desktop.png
test/visual/baselines/comparison-en-mobile.png
test/visual/baselines/engine-error-en-desktop.png
test/visual/baselines/error-invalid-en-desktop.png
test/visual/baselines/home-en-desktop.png
test/visual/baselines/home-en-mobile.png
test/visual/baselines/home-he-desktop.png
test/visual/baselines/home-he-mobile.png
test/visual/baselines/loading-en-desktop.png
test/visual/baselines/long-de-desktop.png
test/visual/baselines/long-de-mobile.png
test/visual/baselines/print-result-en.png
test/visual/baselines/result-en-desktop.png
test/visual/baselines/result-en-mobile.png
test/visual/baselines/result-he-desktop.png
test/visual/baselines/result-he-mobile.png
test/visual/baselines/script-bn-mobile.png
test/visual/baselines/year-structure-a.png
test/visual/baselines/year-structure-complex.png
artifacts/about-i18n-native-sessions/is/attempt-36260247363/reviewer-stderr.log
artifacts/about-i18n-native-sessions/is/attempt-36260701323/reviewer-stderr.log
artifacts/cross-engine-50m/full-run-console.log
artifacts/cross-repo-native-qa/attempts/is/36265534655/reviewer-stderr.log
artifacts/cross-repo-native-qa/attempts/is/36266466042/reviewer-stderr.log
artifacts/cross-repo-native-qa/attempts/is/36267996451/reviewer-stderr.log
artifacts/cross-repo-native-qa/attempts/is/36269544744/reviewer-stderr.log
artifacts/cross-repo-native-qa/runtime/reviewer-stderr.log
artifacts/stage6-logs/stage06-core-verification.log
artifacts/stage6-logs/stage06-fault-injection.log
artifacts/stage6-logs/stage06-legacy-stage04c-incompatibility.log
artifacts/update-08-stage-04a-run.log
artifacts/update-08-stage-04c-reference-oracle.log
artifacts/update-08-stage-04d-reference-oracle.log
artifacts/update-08-stage-07-build.log
artifacts/update-08-stage-07-package.log
artifacts/update-08-stage-07-router-fix-build.log
artifacts/update-08-stage-07-router-fix-local-npm-ci.log
artifacts/update-08-stage-07-router-fix-standalone-runtime.log
artifacts/update-08-stage-07-router-fix-supply-chain.log
artifacts/update-08-stage-07-sha256-check.log
artifacts/update-12-koki-audit.log
artifacts/update-12-package-verify.log
artifacts/update-12-update11-regression.log
artifacts/update-15-build-standalone.log
artifacts/update-15-diagnostics-test-timeout.log
artifacts/update-15-node-test.log
artifacts/update-15-random-witness-isolation-run.log
artifacts/update-15-test-fast-partial.log
verification/evidence/cobol-validation-2026-08-15.log
verification/evidence/cobol-validation-abi-fixed-2026-08-16-console.log
verification/evidence/cobol-validation-abi-fixed-2026-08-16-progress.log
verification/evidence/multilang/ruby-differential-20260814-125717.log
artifacts/stage5-cache-epoch-detour.tap
artifacts/stage5-cache-epoch-focused.tap
artifacts/stage5-router-cache-lifecycle.tap
artifacts/stage5-runtime-patching.tap
artifacts/stage5-year-ceiling-detour.tap
artifacts/stage6-logs/stage5-transactionality-selftest.tap
artifacts/stage6-logs/stage06-cache-epoch.tap
artifacts/stage6-logs/stage06-compatibility.tap
artifacts/stage6-logs/stage06-focused-regressions-core.tap
artifacts/stage6-logs/stage06-npm-test.tap
artifacts/stage6-logs/stage06-reference-oracle.tap
artifacts/update-08-stage-04c-regression-tests.tap
artifacts/update-08-stage-04d-regression-tests.tap
artifacts/update-08-stage-05-browser-parity.tap
artifacts/update-08-stage-05-canonical-vectors.tap
artifacts/update-08-stage-05-compatibility.tap
artifacts/update-08-stage-05-core-regressions.tap
artifacts/update-08-stage-05-focused-regressions.tap
artifacts/update-08-stage-05-matched-prefix.tap
artifacts/update-08-stage-05-npm-test.tap
artifacts/update-08-stage-05-post-standalone-npm-test.tap
artifacts/update-08-stage-05-reference-oracle.tap
artifacts/update-08-stage-05-standalone-build.tap
artifacts/update-08-stage-05-transactionality.tap
artifacts/update-08-stage-07-browser-core.tap
artifacts/update-08-stage-07-fast-compatibility-original.tap
artifacts/update-08-stage-07-fast-compatibility.tap
artifacts/update-08-stage-07-fast-history.tap
artifacts/update-08-stage-07-final-node-public.tap
artifacts/update-08-stage-07-final-router-standalone.tap
artifacts/update-08-stage-07-node-public.tap
artifacts/update-08-stage-07-router-cache.tap
artifacts/update-08-stage-07-router-fix-baseline.tap
artifacts/update-08-stage-07-router-fix-focused.tap
artifacts/update-08-stage-07-router-fix-npm-test.tap
artifacts/update-08-stage-07-router-fix-post-ci-focused.tap
artifacts/update-08-stage-07-router-fix-router.tap
artifacts/update-08-stage-07-router-fix-standalone-build.tap
artifacts/update-08-stage-07-standalone-build-test.tap
artifacts/update-08-stage-07-standalone.tap
artifacts/update-08-stage-07-worker.tap
artifacts/update-12-fast-without-standalone.tap
artifacts/update-12-standalone-static.tap
artifacts/update-12-update11-plus-koki.tap
artifacts/update-15-pages-diagnostics-catchup-pages-reverse.tap
verification/update8/stage-01-reference-safe.tap
browser/example.html
browser/example_weekly_colored.html
browser/standalone/example-file.html
docs/about/content/af.html
docs/about/content/ar.html
docs/about/content/az.html
docs/about/content/be.html
docs/about/content/bg.html
docs/about/content/bn.html
docs/about/content/bs.html
docs/about/content/ca.html
docs/about/content/cs.html
docs/about/content/da.html
docs/about/content/de.html
docs/about/content/el.html
docs/about/content/en.html
docs/about/content/eo.html
docs/about/content/es.html
docs/about/content/et.html
docs/about/content/fa.html
docs/about/content/fi.html
docs/about/content/fil.html
docs/about/content/fo.html
docs/about/content/fr.html
docs/about/content/fy.html
docs/about/content/gl.html
docs/about/content/gu.html
docs/about/content/ha.html
docs/about/content/he.html
docs/about/content/hi.html
docs/about/content/hr.html
docs/about/content/ht.html
docs/about/content/hu.html
docs/about/content/hy.html
docs/about/content/id.html
docs/about/content/is.html
docs/about/content/it.html
docs/about/content/ja.html
docs/about/content/jv.html
docs/about/content/ka.html
docs/about/content/kk.html
docs/about/content/ko.html
docs/about/content/lb.html
docs/about/content/lt.html
docs/about/content/lv.html
docs/about/content/mk.html
docs/about/content/mr.html
docs/about/content/ms.html
docs/about/content/nb.html
docs/about/content/ne.html
docs/about/content/nl.html
docs/about/content/nn.html
docs/about/content/pa.html
docs/about/content/pl.html
docs/about/content/pt.html
docs/about/content/ro.html
docs/about/content/ru.html
docs/about/content/sk.html
docs/about/content/sl.html
docs/about/content/so.html
docs/about/content/sq.html
docs/about/content/sr.html
docs/about/content/sv.html
docs/about/content/sw.html
docs/about/content/ta.html
docs/about/content/te.html
docs/about/content/th.html
docs/about/content/tr.html
docs/about/content/uk.html
docs/about/content/ur.html
docs/about/content/uz.html
docs/about/content/vi.html
docs/about/content/yo.html
docs/about/content/zh.html
docs/about/content/zu.html
docs/about/index.html
docs/index.html
docs/no-js/index.html
test/browser-smoke.html
test/calendar-roundtrip-browser-smoke.html
test/file-protocol-smoke.html
test/standard-equivalence.html
test/update11-vikrama-browser.html
test/update12-koki-browser.html
test/update13-intl-browser.html
test/update18-browser-final-differential.html
test/update19-browser-final-audit.html
README-TEST.txt
SHA256SUMS.delta.txt
SHA256SUMS.txt
THIRD_PARTY_LICENSES/CALENDRICA-APACHE-2.0.txt
artifacts/about-i18n-native-qa-trigger.txt
artifacts/about-i18n-native-sessions/is/attempt-36260247363/copilot-exit-code.txt
artifacts/about-i18n-native-sessions/is/attempt-36260247363/locale-code.txt
artifacts/about-i18n-native-sessions/is/attempt-36260247363/locale-tag.txt
artifacts/about-i18n-native-sessions/is/attempt-36260247363/reviewed-head.txt
artifacts/about-i18n-native-sessions/is/attempt-36260247363/run-id.txt
artifacts/about-i18n-native-sessions/is/attempt-36260701323/copilot-exit-code.txt
artifacts/about-i18n-native-sessions/is/attempt-36260701323/locale-code.txt
artifacts/about-i18n-native-sessions/is/attempt-36260701323/locale-tag.txt
artifacts/about-i18n-native-sessions/is/attempt-36260701323/reviewed-head.txt
artifacts/about-i18n-native-sessions/is/attempt-36260701323/run-id.txt
artifacts/about-i18n-native-sessions/is/reviewed-head.txt
artifacts/cross-engine-50m/SHA256SUMS.txt
artifacts/cross-repo-native-qa/attempts/is/36265534655/copilot-exit-code.txt
artifacts/cross-repo-native-qa/attempts/is/36265534655/verdict.txt
artifacts/cross-repo-native-qa/attempts/is/36266466042/copilot-exit-code.txt
artifacts/cross-repo-native-qa/attempts/is/36266466042/verdict.txt
artifacts/cross-repo-native-qa/attempts/is/36267996451/copilot-exit-code.txt
artifacts/cross-repo-native-qa/attempts/is/36267996451/verdict.txt
artifacts/cross-repo-native-qa/attempts/is/36269544744/copilot-exit-code.txt
artifacts/cross-repo-native-qa/attempts/is/36269544744/verdict.txt
artifacts/cross-repo-native-qa/runtime/repo2-0/STAGE_01_EXECUTION_STATUS.txt
artifacts/update-08-final-sha256sums.txt
artifacts/update-08-stage-03-sha256sums.txt
artifacts/update-08-stage-04-synthesis-sha256sums.txt
artifacts/update-08-stage-04a-sha256sums.txt
artifacts/update-08-stage-04b-provenance.txt
artifacts/update-08-stage-04b-sha256sums.txt
artifacts/update-08-stage-04c-sha256sums.txt
artifacts/update-08-stage-04d-sha256sums.txt
artifacts/update-08-stage-05-partial-sha256sums.txt
artifacts/update-08-stage-05-sha256sums.txt
artifacts/update-08-stage-06-sha256sums.txt
artifacts/update-08-stage-07-build-input-hashes.txt
artifacts/update-08-stage-07-delta-files.txt
artifacts/update-08-stage-07-final-sha256sums.txt
artifacts/update-08-stage-07-production-hashes-after.txt
artifacts/update-08-stage-07-router-fix-generated-sha256sums.txt
artifacts/update-08-stage-07-router-fix-sha256sums.txt
artifacts/update-08-stage-07-sha256sums.txt
artifacts/update-08-stage-08a-sha256sums.txt
artifacts/update-08-stage-08b-final-sha256sums.txt
artifacts/update-08-stage-08b-sha256sums.txt
artifacts/update-08-stage-08c-revalidation-sha256sums.txt
artifacts/update-08-stage-08c-sha256sums.txt
artifacts/update-10-chinese-audit-sha256sums.txt
artifacts/update-10b-chinese-source-intake-sha256sums.txt
artifacts/update-10c-calendrica-chinese-port-sha256sums.txt
artifacts/update-10d-chinese-foundation-reconciliation-sha256sums.txt
artifacts/update-10e-chinese-delta-t-source-lock-sha256sums.txt
artifacts/update-11-vikrama-blocker-sha256sums.txt
artifacts/update-11-vikrama-final-sha256sums.txt
artifacts/update-12-koki-delta-files.txt
artifacts/update-12-koki-sha256sums.txt
artifacts/update-13-delta-files.txt
artifacts/update-13-generated-standalone-sha256sums.txt
artifacts/update-13-stage1-sha256sums.txt
artifacts/update-13-stage2-delta-files.txt
artifacts/update-13-stage2-sha256sums.txt
artifacts/update-14-sha256sums.txt
artifacts/update-15-delta-files.txt
artifacts/update-15-pages-diagnostics-catchup-sha256sums.txt
artifacts/update-15-sha256sums.txt
artifacts/update-15-standalone-catchup-sha256sums.txt
artifacts/update-16-ci-catchup-sha256sums.txt
artifacts/update-16-ci-checksum-catchup-sha256sums.txt
artifacts/update-16-ci-write-mode-checksum-catchup-sha256sums.txt
artifacts/update-18/SHA256SUMS.txt
docs/SHA256SUMS.txt
implementations/cobol/SHA256SUMS.txt
implementations/cpp/CMakeLists.txt
sources/SHA256SUMS.txt
src/ABSTRACT.txt
test/visual/SHA256SUMS.txt
verification/evidence/cobol-validation-2026-08-15-SHA256SUMS.txt
verification/evidence/cobol-validation-abi-fixed-2026-08-16-SHA256SUMS.txt
verification/evidence/cobol-validation-abi-fixed-2026-08-16-requests.txt
verification/evidence/cpp-js-soak-2026-08-16-SHA256SUMS.txt
verification/evidence/soak-c5db804-2026-08-13-SHA256SUMS.txt
verification/update8/delta-sha256sums.txt
verification/update8/stage-01-snapshot-verification.txt
verification/update8/stage-04a-completion-delta-sha256sums.txt
verification/update8/stage-04a-correction-v2-sha256sums.txt
verification/update8/stage-07-router-fix-delta-sha256sums.txt
verification/update17/generated/SHA256SUMS.txt
benchmarks/engine.mjs
benchmarks/lib.mjs
benchmarks/memory-browser.mjs
benchmarks/memory-lib.mjs
benchmarks/memory-scenario.mjs
benchmarks/memory-snapshot.mjs
benchmarks/memory.mjs
benchmarks/reverse-constraints.mjs
benchmarks/run.mjs
benchmarks/smoke.mjs
benchmarks/web.mjs
implementations/cobol/test/compare-with-js.mjs
implementations/cobol/test/soak-compatibility.mjs
implementations/tests/export_reference_gate_cache.mjs
implementations/tests/generate_oracle_corpus.mjs
implementations/tests/generate_spec_deep_year_chain.mjs
scripts/build-standalone.mjs
scripts/check-package.mjs
scripts/check-sha-manifest-completeness.mjs
scripts/check-supply-chain.mjs
scripts/check-update13-standalone-firewall.mjs
scripts/checksums.mjs
scripts/ci-change-classifier.mjs
scripts/diagnose-extreme-performance.mjs
scripts/diagnose.mjs
scripts/diagnostics-overhead.mjs
scripts/docs-consistency.mjs
scripts/docs-project-facts.mjs
scripts/i18n-coverage.mjs
scripts/regenerate-gate-artifacts.mjs
scripts/release-lib.mjs
scripts/release.mjs
scripts/report-reverse-i18n.mjs
scripts/run-accessibility-tests.mjs
scripts/run-calendar-property-soak.mjs
scripts/run-calendar-roundtrip-audit.mjs
scripts/run-calendar-roundtrip-browser-smoke.mjs
scripts/run-checkpoint-tests.mjs
scripts/run-day-boundary-smoke.mjs
scripts/run-file-protocol-tests.mjs
scripts/run-i18n-browser-audit.mjs
scripts/run-i18n-lazy-loading-smoke.mjs
scripts/run-i18n-support-smoke.mjs
scripts/run-performance-regression.mjs
scripts/run-pwa-offline-smoke.mjs
scripts/run-reverse-ui-smoke.mjs
scripts/run-ui-race-regression.mjs
scripts/run-update09-proleptic-negative-year-audit.mjs
scripts/run-update10-chinese-audit.mjs
scripts/run-update10b-chinese-source-intake.mjs
scripts/run-update10c-calendrica-chinese-port.mjs
scripts/run-update10d-chinese-foundation-reconciliation.mjs
scripts/run-update10e-chinese-delta-t-source-lock.mjs
scripts/run-update10f-chinese-deterministic-engine.mjs
scripts/run-update10g-chinese-cross-environment-audit.mjs
scripts/run-update10h-public-structured-chinese-api.mjs
scripts/run-update11-vikrama-browser-smoke.mjs
scripts/run-update12-koki-browser-smoke.mjs
scripts/run-update13-intl-browser-smoke.mjs
scripts/run-update16-authority-audit.mjs
scripts/run-update18-browser-final-differential.mjs
scripts/run-update19-browser-audit.mjs
scripts/run-user-e2e.mjs
scripts/run-visual-regression.mjs
scripts/run-year-ceiling-regression.mjs
scripts/soak-fast-engine.mjs
scripts/sync-manifest-i18n.mjs
scripts/sync-pages-reverse-engine.mjs
scripts/test-file-protocol.mjs
scripts/test-minimum-node.mjs
types/soak-fast-engine.mjs
verification/post-series/run-packed-package-parity.mjs
verification/reference-oracle/authoritative-adapter.mjs
verification/reference-oracle/authoritative-stir-trace-runner.mjs
verification/reference-oracle/compare.mjs
verification/reference-oracle/diagnose-post-stir-substitution.mjs
verification/reference-oracle/differential.mjs
verification/reference-oracle/reference.mjs
[omitted 839 path(s); see original output for full results]
[extensions: .js=374, .md=230, .json=164, .mjs=149, .txt=89, .html=87, .tap=46, .log=33]
```

</details>


---

<sub>8s</sub>

### `glob`

**../***

"../*"

```
No files matched the pattern.
```


---

<sub>8s</sub>

### `glob`

****/README***

"**/README*"

<details>
<summary>18 matches</summary>

```
./docs/README.md
./implementations/c/README.md
./benchmarks/README.md
./README-TEST.txt
./implementations/java/README.md
./implementations/README.md
./artifacts/cross-repo-native-qa/runtime/repo2-0/README.md
./artifacts/cross-engine-50m/README.md
./implementations/ruby/README.md
./verification/evidence/multilang/README.md
./verification/README.md
./verification/reference-oracle/README.md
./README.md
./browser/README.md
./implementations/cobol/README.md
./implementations/python/README.md
./implementations/cpp/README.md
./test/visual/README.md
```

</details>


---

<sub>8s</sub>

### `glob`

**docs/****

"docs/**"

<details>
<summary>199 matches</summary>

```
[glob: 190 path(s) under ./docs; grouped by directory]

./docs/about/ (75 path(s))
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

./docs/i18n/ (75 path(s))
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

./docs/ (29 path(s))
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

./docs/engine/ (6 path(s))
  pastafari-calendar-fast.js
  pastafari-constraints-client.js
  pastafari-constraints.js
  pastafari-diagnostics.js
  pastafari-fast-worker.js
  pastafari-reverse-worker.js

./docs/icons/ (3 path(s))
  icon-192.png
  icon-512.png
  icon.svg

./docs/authority/ (1 path(s))
  ORACLE-AUTHORITY.md

./docs/no-js/ (1 path(s))
  index.html

[extensions: .js=92, .html=75, .md=16, .png=2, [no extension]=1, .webmanifest=1, .css=1, .txt=1]
```

</details>


---

<sub>10s</sub>

### `glob`

****/*overview***

"**/*overview*"

```
No files matched the pattern.
```


---

<sub>10s</sub>

### `glob`

****/*locale***

"**/*locale*"

<details>
<summary>6 matches</summary>

```
./.github/workflows/locale-browser-qa.yml
./artifacts/locale-browser-qa-trigger.json
./artifacts/about-i18n-native-sessions/is/attempt-36260701323/locale-tag.txt
./artifacts/about-i18n-native-sessions/is/attempt-36260701323/locale-code.txt
./artifacts/about-i18n-native-sessions/is/attempt-36260247363/locale-tag.txt
./artifacts/about-i18n-native-sessions/is/attempt-36260247363/locale-code.txt
```

</details>


---

<sub>10s</sub>

### `glob`

**artifacts/cross-repo-native-qa/runtime/repo2-0/****

"artifacts/cross-repo-native-qa/runtime/repo2-0/**"

<details>
<summary>19 matches</summary>

```
./artifacts/cross-repo-native-qa/runtime/repo2-0/STAGE_01_EXECUTION_STATUS.txt
./artifacts/cross-repo-native-qa/runtime/repo2-0/elm.json
./artifacts/cross-repo-native-qa/runtime/repo2-0/SOURCE_LANGUAGE_CATALOG.md
./artifacts/cross-repo-native-qa/runtime/repo2-0/README.md
./artifacts/cross-repo-native-qa/runtime/repo2-0/src/Pastafari/SourceLanguageCatalog.elm
./artifacts/cross-repo-native-qa/runtime/repo2-0/src/Pastafari/Spaghetti.elm
./artifacts/cross-repo-native-qa/runtime/repo2-0/src/Pastafari/ExactInt.elm
./artifacts/cross-repo-native-qa/runtime/repo2-0/src/Pastafari/MonsterBase.elm
./artifacts/cross-repo-native-qa/runtime/repo2-0/STAGE_01_OWNERSHIP_AUDIT.md
./artifacts/cross-repo-native-qa/runtime/repo2-0/tests/Stage01Harness.elm
./artifacts/cross-repo-native-qa/runtime/repo2-0/tests/Stage01Checks.elm
./artifacts/cross-repo-native-qa/runtime/repo2-0/tests/BootstrapFixtures.elm
./artifacts/cross-repo-native-qa/runtime/repo2-0/tests/NormativeOracle.elm
./artifacts/cross-repo-native-qa/runtime/repo2-0/DEVELOPMENT_STAGE.md
./artifacts/cross-repo-native-qa/runtime/repo2-0/LICENSE
./artifacts/cross-repo-native-qa/runtime/repo2-0/SPAGHETTI_DEVELOPMENT_HISTORY.md
./artifacts/cross-repo-native-qa/runtime/repo2-0/CANONICAL_NAMES_LOCK.sha256
./artifacts/cross-repo-native-qa/runtime/repo2-0/.github/workflows/canonical-names-lock.yml
./artifacts/cross-repo-native-qa/runtime/repo2-0/STAGE_01_NORMATIVE_AUDIT.md
```

</details>


---

<sub>15s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js

```
File too large to read at once (22.9 KB). Consider using the grep tool to search within the file, or view with view_range to read specific sections.
```


---

<sub>15s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html

```
File too large to read at once (33.9 KB). Consider using the grep tool to search within the file, or view with view_range to read specific sections.
```


---

<sub>15s</sub>

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

<sub>15s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/README.md.**

/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/README.md

<details>
<summary>25 lines</summary>

````
# Pastafari-dagatalið — Elm og íslenska

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

<sub>15s</sub>

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
8. papýrusstör
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

<sub>15s</sub>

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

<sub>15s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/SPAGHETTI_DEVELOPMENT_HISTORY.md.**

/home/runner/work/pastafari-calendar/pastafari-calendar/artifacts/cross-repo-native-qa/runtime/repo2-0/SPAGHETTI_DEVELOPMENT_HISTORY.md

<details>
<summary>13 lines</summary>

```
# Þróunarsaga spaghettískrímslisins

## Stage 1 — Bootstrap

### Hvað var byggt

Verkefnið var stofnað frá auðu tré fyrir Elm og íslensku. Sjálfstæður nákvæmur heiltölukjarni var skrifaður í Elm, staðlaða viðmiðunarvélin var endurgerð beint úr innbyggða viðmiðinu og sérstök hrein Elm-prófunarumgjörð var búin til. `SourceLanguageCatalog` var frystur með 17 kótelettum og 47 mánuðum.

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

<sub>15s</sub>

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

<sub>15s</sub>

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

`calendarDateCanonical` skilar nákvæmlega fimm merkingarsviðum. `calendarDate` leysir aðeins kótelettu- og mánaðarvísitölur yfir í fryst íslensk heiti. Ekkert í `src/` flytur inn `NormativeOracle`, þannig að framleiðsluskelin getur ekki notað viðmiðunarvélina sem varaleið eða leiðréttingu.

Við úttektina fannst Elm-sértæk þýðingarvilla í eldri drögum: fjögurra og fimm staka tuple-gildi höfðu verið notuð í stuðlatöflum og í innra vali kótelettuskiptingar. Elm leyfir ekki slík tuple. Þau voru skipt út fyrir nafngreind record-gildi án merkingarbreytingar. Engin fjögurra eða fleiri staka tuple er eftir í Elm-kóðanum.

## Staða

Enginn þekktur merkingarlegur, eignarhaldslegur eða Elm-sértækur byggingargalli er eftir í Stage 1 eftir þessa kyrrstöðuúttekt. Þetta er ekki staðgengill fyrir þýðingu. Raunveruleg Elm 0.19.1 þýðing og keyrsla allra vitna er enn nauðsynleg áður en `LAST_COMPLETED_STAGE` má verða 1.
```

</details>


---

<sub>15s</sub>

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

<sub>15s</sub>

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
    , { canonicalIndex = 8, sourceId = "PAPYRUS_SEDGE", text = "papýrusstör" }
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

<sub>15s</sub>

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

<sub>15s</sub>

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

<sub>15s</sub>

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

<sub>19s</sub>

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

<sub>19s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js (lines 181--1)

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

<sub>19s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html (lines 1-200)

<details>
<summary>183 lines</summary>

```
<!-- Íslenska útgáfan er skrifuð beint út frá hebreska frumtextanum sem er merkingarlegur grunnur; ekkert millimál er notað. -->
<!-- Auðkenni kaflanna eru hluti af stöðugum opinberum samningi um djúptengla og eru ekki leidd af þýddum fyrirsögnum. -->
<div class="about-section about-lead" id="about-calendar">
  <p>Í frásögn þessa vefs er Pastafari-dagatalið sett fram sem dagatalið þar sem tíminn sjálfur varð til. Hvernig það virkar er þó skilgreint með ströngum og nákvæmum reglum.</p>
  <p>Dagatalið úthlutar ekki hverjum degi fastri, óbreytanlegri Pastafari-framsetningu. Til að reikna dagsetningu þarf að tilgreina tvo daga: <strong>aðgerðardaginn</strong>, sem útreikningurinn hefst frá, og <strong>fyrirspurnardaginn</strong>, sem spurt er um.</p>
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
  <p>Með öðrum orðum: frá eigin sjónarhorni er núið alltaf innan árs 5000. En ár 5000 er ekki fast sögulegt tímabil; það er valið upp á nýtt í hvert sinn miðað við aðgerðardaginn.</p>
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
  <p>Það eru 47 mánaðarnöfn og mánuður getur mest náð degi 123. Fjöldi mögulegra para af gerðinni „mánaðarnafn + dagnúmer í mánuði“ er því</p>
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

<sub>19s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html (lines 201--1)

<details>
<summary>118 lines</summary>

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
  <p>Undir blönduninni liggur ströng algebruleg uppbygging. Það þarf ekki að þekkja hana til að vita dagsetningu dagsins í dag.</p><hr>
</section>

<section class="about-section" id="summary" data-toc-section data-toc-level="2">
  <h2>Hvað er Pastafari-dagatalið þá í raun?</h2>
  <p>Það er determinískt dagatal þar sem dagsetningin er ekki bara fall af fyrirspurnardegi heldur <strong>sameiginlegt fall aðgerðardagsins og fyrirspurnardagsins</strong>.</p>
  <p>Hver dagsetning hefur nákvæmlega fimm reiti. Núið er frá sínu eigin sjónarhorni alltaf í ári 5000, en ár 5000 sjálft færist með aðgerðardeginum. Ár geta verið mjög löng, kótelettur eru samfelldar, mánuðir ekki endilega, og ekkert kanónískt vikukerfi er til.</p>
  <p>Dagur <code>n+1</code> í mánuði þarf ekki að vera á morgun. Sami dagur á tímalínunni getur fengið aðra Pastafari-framsetningu á morgun. Sama raunverulega augnablik getur á tveimur stöðum tilheyrt tveimur mismunandi staðbundnum Pastafari-dögum. Heilsdagsatburður þarf ekki að standa frá miðnætti til miðnættis. Og árlegur afmælisdagur er fyrst leitarvandamál og síðan dagatalsvandamál.</p>
  <p>En ef aðgerðardagurinn og fyrirspurnardagurinn eru þekktir er engin tvíræðni: rétt svar er aðeins eitt.</p>
  <p>Þegar allt kemur til alls þarf dagatal ekki að gera meira en þetta.</p>
</section>
```

</details>


---

<sub>19s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/index.html.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/index.html

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


---

<sub>19s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/index.html.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/index.html

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

<sub>19s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/registry.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/registry.js

```
File too large to read at once (29.6 KB). Consider using the grep tool to search within the file, or view with view_range to read specific sections.
```


---

<sub>19s</sub>

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

<sub>19s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/README.md.**

/home/runner/work/pastafari-calendar/pastafari-calendar/README.md

```
File too large to read at once (184.0 KB). Consider using the grep tool to search within the file, or view with view_range to read specific sections.
```


---

<sub>19s</sub>

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

<sub>19s</sub>

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

<sub>19s</sub>

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

<sub>27s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js (lines 1-65)

<details>
<summary>64 lines</summary>

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
```

</details>


---

<sub>27s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js (lines 66-130)

<details>
<summary>65 lines</summary>

```
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
```

</details>


---

<sub>27s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js (lines 131-205)

<details>
<summary>75 lines</summary>

```
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
    "reverse.action.remove": "Fjarlægja",
    "reverse.action.clear": "Hreinsa niðurstöður",
    "reverse.progress.reverse": "Úrvinnsla Pastafari-tengsla",
    "reverse.progress.verify": "Staðfesting mögulegra lausna",
    "reverse.progress.done": "Leit lokið",
```

</details>


---

<sub>27s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js (lines 206-290)

<details>
<summary>84 lines</summary>

```
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
```

</details>


---

<sub>27s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html (lines 1-90)

<details>
<summary>82 lines</summary>

```
<!-- Íslenska útgáfan er skrifuð beint út frá hebreska frumtextanum sem er merkingarlegur grunnur; ekkert millimál er notað. -->
<!-- Auðkenni kaflanna eru hluti af stöðugum opinberum samningi um djúptengla og eru ekki leidd af þýddum fyrirsögnum. -->
<div class="about-section about-lead" id="about-calendar">
  <p>Í frásögn þessa vefs er Pastafari-dagatalið sett fram sem dagatalið þar sem tíminn sjálfur varð til. Hvernig það virkar er þó skilgreint með ströngum og nákvæmum reglum.</p>
  <p>Dagatalið úthlutar ekki hverjum degi fastri, óbreytanlegri Pastafari-framsetningu. Til að reikna dagsetningu þarf að tilgreina tvo daga: <strong>aðgerðardaginn</strong>, sem útreikningurinn hefst frá, og <strong>fyrirspurnardaginn</strong>, sem spurt er um.</p>
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
  <p>Með öðrum orðum: frá eigin sjónarhorni er núið alltaf innan árs 5000. En ár 5000 er ekki fast sögulegt tímabil; það er valið upp á nýtt í hvert sinn miðað við aðgerðardaginn.</p>
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
```

</details>


---

<sub>27s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html (lines 91-180)

<details>
<summary>83 lines</summary>

```
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
  <p>Það eru 47 mánaðarnöfn og mánuður getur mest náð degi 123. Fjöldi mögulegra para af gerðinni „mánaðarnafn + dagnúmer í mánuði“ er því</p>
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
```

</details>


---

<sub>28s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html (lines 181-270)

<details>
<summary>80 lines</summary>

```
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
```

</details>


---

<sub>28s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html (lines 271-360)

<details>
<summary>56 lines</summary>

```
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
  <p>Dagur <code>n+1</code> í mánuði þarf ekki að vera á morgun. Sami dagur á tímalínunni getur fengið aðra Pastafari-framsetningu á morgun. Sama raunverulega augnablik getur á tveimur stöðum tilheyrt tveimur mismunandi staðbundnum Pastafari-dögum. Heilsdagsatburður þarf ekki að standa frá miðnætti til miðnættis. Og árlegur afmælisdagur er fyrst leitarvandamál og síðan dagatalsvandamál.</p>
  <p>En ef aðgerðardagurinn og fyrirspurnardagurinn eru þekktir er engin tvíræðni: rétt svar er aðeins eitt.</p>
  <p>Þegar allt kemur til alls þarf dagatal ekki að gera meira en þetta.</p>
</section>
```

</details>


---

<sub>46s</sub>

### `rg`

**Short Choice|Wide Choice|Eridu|Uruk|Susa|Karób|Rifbein|Þoka|day-id|all-day|Ayyám|hebre|fallback|language|default**

"Short Choice|Wide Choice|Eridu|Uruk|Susa|Karób|Rifbein|Þoka|day-id|all-day|Ayyám|hebre|fallback|language|default" (docs/i18n/locales/is.js, docs/about/content/is.html, artifacts/cross-repo-native-qa/runtime/repo2-0)

<details>
<summary>28 matches</summary>

```
[grep content: 25 matches across 4 file(s)]
artifacts/cross-repo-native-qa/runtime/repo2-0/SOURCE_LANGUAGE_CATALOG.md:7: Merkingarbær almenn orð eru þýdd eftir merkingu. Heilir orðasambandsliðir, þar á meðal brot, eru varðveittir sem eitt nafn og þýddir sem eðlilegt íslenskt orðasamband. Staðanöfn nota viðurkennda latneska eða íslenska ritmynd þegar hún er til. Tilbúin hljóðnöfn fá ákveðna og endurtekningarhæfa yfirfærslu: hebreska sj-hljóðið er ritað `sj`; önnur samhljóð fá næsta íslenskt-læsilega hljóðgildi; greinileg sérhljóð úr frumritinu eru varðveitt; engin merking er búin til.
artifacts/cross-repo-native-qa/runtime/repo2-0/README.md:13: Öll merkingarbær nöfn eru þýdd eftir merkingu. Staðanöfn og tilbúin nöfn eru meðhöndluð sem sérnöfn. Fyrir tilbúin hebresk hljóðnöfn er eftirfarandi regla fryst: samhljóð eru yfirfærð í næsta íslenskt eða íslenskt-læsilegt hljóðgildi, hebreska sj-hljóðið er ritað `sj`, greinileg sérhljóð úr punktun eru varðveitt með íslenskri lengdarmerkingu þegar það á við og engin ný merking er búin til. Því verða tilbúnu nöfnin hér `Palgúrasj` og `Karsjúmav`.

docs/about/content/is.html (7 match(es)):
  1: <!-- Íslenska útgáfan er skrifuð beint út frá hebreska frumtextanum sem er merkingarlegur grunnur; ekkert millimál er notað. -->
  26: <section class="about-section" id="day-identity" data-toc-section data-toc-level="2">
  29:   <p>Í vörunni og API-viðmótinu má kalla hið fyrra <code>day-id</code>: fast auðkenni dags á tímalínunni sem breytist ekki þótt framsetningin breytist. Hins vegar þurfa</p>
  112:   <p>Auðkenni nafnsins er kanónískt og merkingarbært; það er ekki niðurstaða atkvæðagreiðslu milli mismunandi stafsetninga, þýðinga eða útfærslna. Um merkingu nafnanna hefur hebreska Megillah hæsta vald; þýðingar og umritanir eru aðeins birtingarlög.</p>
  141:   <h2>Stutt val (Short Choice) og vítt val (Wide Choice)</h2>
  213: <section class="about-section" id="travel-and-all-day" data-toc-section data-toc-level="2">
  217:   <p>Að flytja Pastafari-atburð út sem borgaralegan heilsdagsatburð án þess að aðlaga tímamörkin getur því breytt merkingu hans. Til að varðveita merkinguna rétt þarf að vista fast tímatengt auðkenni og viðeigandi samhengi staðsetningar og dagamarka, ekki aðeins <code>all-day</code>-merkinguna.</p><hr>

docs/i18n/locales/is.js (16 match(es)):
  3: export default Object.freeze({
  11:     "manifest.defaultDescription": "Pastafari-dagatal sem reiknar á tækinu og skilar sömu niðurstöðu fyrir sama inntak.",
  30:     "about.fallbackNotice": "Skýringin er ekki tiltæk á völdu tungumáli; hebreska útgáfan er sýnd í staðinn.",
  32:     "language.label": "Tungumál",
  69:     "field.ayyamiHa": "Ayyám-i-Há",
  83:     "calendarInput.hebrew": "Hebreskt",
  100:     "calendarHelp.hebrew": "Mánuðir eru valdir eftir nafni. Ár og dag má slá inn með tugatölustöfum eða hebreskum talnastöfum, til dæmis \u2067תשפ״ו\u2069 eða \u2067י״ד\u2069; ef ár er ritað með hebreskum talnastöfum án þúsundamerkis er 5.000 bætt við það.",
  105:     "calendarHelp.bahai": "Veldu mánuð eftir nafni eða Ayyám-i-Há. Formið sem byggir á jafndægri í Teheran styður venjulegt gregorískt bil 1844–3000.",
  156:     "guide.2.body": "Undir „Hvaða dag viltu finna?“ velurðu dagatal, fyllir út reitina og velur „Sýna dagsetningu“. Valkostirnir fela í sér gregorískt, hebreskt, júlíanskt, íslamskt, persneskt, kínverskt, hindú, saka, taílenskt, eþíópískt, koptískt, japanskt, minguo og bahá’í dagatal, auk langtals Maya.",
  229:     "reverse.variable.defaultName": "Dagsetning {index}",
  294:       "eridu": "Eridu",
  300:       "mist": "Þoka",
  303:       "rib": "Rifbein",
  304:       "carob": "Karób",
  305:       "uruk": "Uruk",
  325:       "susa": "Susa",
```

</details>


---

<sub>46s</sub>

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

<sub>46s</sub>

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

<sub>46s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/calendar-identifiers.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/calendar-identifiers.js

<details>
<summary>83 lines</summary>

```
"use strict";

const define = (entries) => Object.freeze(entries.map((entry, index) => Object.freeze({ ...entry, index })));

export const CUTLETS = define([
  { id: "bronze", internalName: "ארד" },
  { id: "fox", internalName: "שועל" },
  { id: "kidney", internalName: "כליה" },
  { id: "lagash", internalName: "לגש" },
  { id: "thought", internalName: "מחשבה" },
  { id: "fourPartsOfNine", internalName: "ארבעה חלקים מתשעה" },
  { id: "palgurash", internalName: "פַּלְגּוּרַשׁ" },
  { id: "papyrusSedge", internalName: "גומא" },
  { id: "cluster", internalName: "אשכול" },
  { id: "scorpion", internalName: "עקרב" },
  { id: "ash", internalName: "אפר" },
  { id: "wheat", internalName: "חיטה" },
  { id: "river", internalName: "נהר" },
  { id: "laughter", internalName: "צחוק" },
  { id: "akkad", internalName: "אכד" },
  { id: "horn", internalName: "קרן" },
  { id: "theEmptyJar", internalName: "הכד הריק" },
]);

export const MONTHS = define([
  { id: "clay", internalName: "טין" },
  { id: "pomegranate", internalName: "רימון" },
  { id: "elbow", internalName: "מרפק" },
  { id: "envy", internalName: "קנאה" },
  { id: "eridu", internalName: "ארידו" },
  { id: "toothpaste", internalName: "משחת־שיניים" },
  { id: "threePartsOfFive", internalName: "שלושה חלקים מחמישה" },
  { id: "karshumav", internalName: "כַּרְשׁוּמַב" },
  { id: "leopard", internalName: "נמר" },
  { id: "tin", internalName: "בדיל" },
  { id: "mist", internalName: "ערפל" },
  { id: "frankincense", internalName: "לבונה" },
  { id: "spindle", internalName: "כישור" },
  { id: "rib", internalName: "צלע" },
  { id: "carob", internalName: "חרוב" },
  { id: "uruk", internalName: "אורוק" },
  { id: "shame", internalName: "בושה" },
  { id: "camel", internalName: "גמל" },
  { id: "copper", internalName: "נחושת" },
  { id: "well", internalName: "באר" },
  { id: "yolk", internalName: "חלמון" },
  { id: "star", internalName: "כוכב" },
  { id: "honey", internalName: "דבש" },
  { id: "spleen", internalName: "טחול" },
  { id: "limestone", internalName: "אבן־גיר" },
  { id: "joy", internalName: "שמחה" },
  { id: "fig", internalName: "תאנה" },
  { id: "nineveh", internalName: "נינוה" },
  { id: "frog", internalName: "צפרדע" },
  { id: "pitch", internalName: "זפת" },
  { id: "lamp", internalName: "נר" },
  { id: "theClosedDoor", internalName: "הדלת הסגורה" },
  { id: "sesame", internalName: "שומשום" },
  { id: "nape", internalName: "עורף" },
  { id: "silver", internalName: "כסף" },
  { id: "susa", internalName: "שושן" },
  { id: "storm", internalName: "סערה" },
  { id: "donkey", internalName: "חמור" },
  { id: "flour", internalName: "קמח" },
  { id: "regret", internalName: "חרטה" },
  { id: "babylon", internalName: "בבל" },
  { id: "tongue", internalName: "לשון" },
  { id: "flax", internalName: "פשתן" },
  { id: "salt", internalName: "מלח" },
  { id: "pear", internalName: "אגס" },
  { id: "bow", internalName: "קשת" },
  { id: "sand", internalName: "חול" },
]);

const cutletIndexByInternalName = new Map(CUTLETS.map(({ internalName, index }) => [internalName, index]));
const monthIndexByInternalName = new Map(MONTHS.map(({ internalName, index }) => [internalName, index]));

function indexFor(map, value, type) {
  const index = map.get(String(value));
  if (index === undefined) throw new RangeError(`Unknown internal ${type} name.`);
  return index;
}

export function cutletIndexFromInternalName(name) {
  return indexFor(cutletIndexByInternalName, name, "cutlet");
}

export function monthIndexFromInternalName(name) {
  return indexFor(monthIndexByInternalName, name, "month");
}
```

</details>


---

<sub>46s</sub>

### `glob`

**artifacts/cross-repo-native-qa/runtime/repo2-0/**/*.md**

"artifacts/cross-repo-native-qa/runtime/repo2-0/**/*.md"

<details>
<summary>6 matches</summary>

```
./artifacts/cross-repo-native-qa/runtime/repo2-0/SOURCE_LANGUAGE_CATALOG.md
./artifacts/cross-repo-native-qa/runtime/repo2-0/README.md
./artifacts/cross-repo-native-qa/runtime/repo2-0/STAGE_01_OWNERSHIP_AUDIT.md
./artifacts/cross-repo-native-qa/runtime/repo2-0/DEVELOPMENT_STAGE.md
./artifacts/cross-repo-native-qa/runtime/repo2-0/SPAGHETTI_DEVELOPMENT_HISTORY.md
./artifacts/cross-repo-native-qa/runtime/repo2-0/STAGE_01_NORMATIVE_AUDIT.md
```

</details>


---

<sub>46s</sub>

### `glob`

**artifacts/cross-repo-native-qa/runtime/repo2-0/**/*.elm**

"artifacts/cross-repo-native-qa/runtime/repo2-0/**/*.elm"

<details>
<summary>8 matches</summary>

```
./artifacts/cross-repo-native-qa/runtime/repo2-0/src/Pastafari/SourceLanguageCatalog.elm
./artifacts/cross-repo-native-qa/runtime/repo2-0/src/Pastafari/Spaghetti.elm
./artifacts/cross-repo-native-qa/runtime/repo2-0/src/Pastafari/ExactInt.elm
./artifacts/cross-repo-native-qa/runtime/repo2-0/src/Pastafari/MonsterBase.elm
./artifacts/cross-repo-native-qa/runtime/repo2-0/tests/Stage01Harness.elm
./artifacts/cross-repo-native-qa/runtime/repo2-0/tests/Stage01Checks.elm
./artifacts/cross-repo-native-qa/runtime/repo2-0/tests/BootstrapFixtures.elm
./artifacts/cross-repo-native-qa/runtime/repo2-0/tests/NormativeOracle.elm
```

</details>


---

<sub>1m 1s</sub>

### `rg`

**["].*[A-Za-zÁ-ú].*["].*|--|\{-**

"["].*[A-Za-zÁ-ú].*["].*|--|\{-" in *.elm (artifacts/cross-repo-native-qa/runtime/repo2-0/src, artifacts/cross-repo-native-qa/runtime/repo2-0/tests)

<details>
<summary>267 matches</summary>

```
[grep content: 261 matches across 6 file(s) under artifacts/cross-repo-native-qa/runtime/repo2-0]

tests/Stage01Checks.elm (100 match(es)):
  39:     "[" ++ String.join "," (List.map String.fromInt values) ++ "]"
  140:                 |> MonsterBase.recordMetric "bootstrap.eignarhald.a"
  149:                         |> MonsterBase.recordMetric "bootstrap.röð.a"
  154:                         |> MonsterBase.recordMetric "bootstrap.röð.b"
  163:                         |> MonsterBase.recordMetric "bootstrap.röð.b"
  168:                         |> MonsterBase.recordMetric "bootstrap.röð.a"
  239:         "Stóri teljarinn er nákvæmlega 2^127-1"
  243:     , bigCheck "Spjaldadagur er 14.777.149 dögum eftir grunndag" (BI.fromInt Fixtures.tabletsFromFoundation) (BI.sub Oracle.tabletsDay foundation)
  245:         "Hámarkslengd árs er nákvæmlega 5778 dagar"
  249:     , bigCheck "SAVE(1)" BI.one (Oracle.save BI.one)
  250:     , bigCheck "SAVE(M-1)" (BI.sub modulus BI.one) (Oracle.save (BI.sub modulus BI.one))
  251:     , bigCheck "SAVE(M)" modulus (Oracle.save modulus)
  252:     , bigCheck "SAVE(M+1)" BI.one (Oracle.save (BI.add modulus BI.one))
  253:     , bigCheck "SAVE(2M)" modulus (Oracle.save (BI.mulSmall modulus 2))
  254:     , bigCheck "Nákvæm deiling M^2 með M" modulus (BI.floorDivPositive mSquared modulus)
  255:     , bigCheck "Nákvæm leif M^2 með M" BI.zero (BI.regularMod mSquared modulus)
  256:     , bigCheck "Gólfdeiling -7 með 3" (BI.fromInt -3) (BI.floorDivPositive negativeSeven three)
  257:     , bigCheck "Euklíðsk leif -7 með 3" (BI.fromInt 2) (BI.regularMod negativeSeven three)
  259:         "Gólfdeiling og euklíðsk leif uppfylla n=q*d+r á öllum Bootstrap-vitnum"
  261:         "n=q*d+r og 0<=r<d fyrir öll vitni"
  262:         "ákveðinn listi jákvæðra og neikvæðra stórra heiltalna"
  263:     , bigCheck "Dagatalning á grunndegi" BI.one (Oracle.dayCount foundation)
  264:     , bigCheck "Dagatalning degi eftir grunn" (BI.fromInt 3) (Oracle.dayCount (BI.add foundation BI.one))
  265:     , bigCheck "Dagatalning degi fyrir grunn" (BI.fromInt 2) (Oracle.dayCount (BI.sub foundation BI.one))
  266:     , bigCheck "Fjarlægð þegar dagarnir eru jafnir" BI.one countsSame.distance
  267:     , bigCheck "Stefna þegar dagarnir eru jafnir" (BI.fromInt 2) countsSame.direction
  268:     , bigCheck "Fjarlægð yfir grunndag" (BI.fromInt 3) countsCross.distance
  269:     , bigCheck "Tenging yfir grunndag" (BI.fromInt 5) countsCross.connection
  271:         "Steinataflan inniheldur nákvæmlega 46 raðir"
  276:         "Önnur steinaröðin kemur öll úr sama gamla ástandi"
  284:         ("[" ++ String.join "," Fixtures.secondStoneSignature ++ "]")
  287:                 "[" ++ String.join "," (stoneSignature stone) ++ "]"
  290:                 "engin önnur röð"
  292:     , listCheck "Fyrsta sex skála umröðunin" [ 1, 2, 3, 4, 5, 6 ] (Oracle.permutationUnrank1 1 [ 1, 2, 3, 4, 5, 6 ])
  293:     , listCheck "Síðasta sex skála umröðunin" [ 6, 5, 4, 3, 2, 1 ] (Oracle.permutationUnrank1 720 [ 1, 2, 3, 4, 5, 6 ])
  294:     , bigCheck "Fallandi margfeldi 5P3" (BI.fromInt 60) (Oracle.fallingFactorial 5 3)
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
  310:     , bigCheck "Stutt val með N=1" BI.one (Oracle.chooseRankShort wideStream BI.one)
  311:     , bigCheck "Stutt val með N=M" modulus (Oracle.chooseRankShort { first = modulus, directionStep = 1 } modulus)
  312:     , bigCheck "Stutt höfnun heldur áfram í sama svarhring" (BI.fromInt 10) (Oracle.chooseRankShort shortRejectStream (BI.fromInt 10))
  313:     , bigCheck "Vítt val með N=M+1 notar samsetta breiða tölu" wideN (Oracle.chooseRankWide wideStream wideN)
  314:     , bigCheck "Valdreifari sendir N=M+1 í víðu leiðina" wideN (Oracle.chooseRank wideStream wideN)
  316:         "Jákvæð hliðaspurning tekur við vísitölu yfir hefðbundnu Int-sviði án styttingar"
  323:         "Neikvætt fyrsta hliðabil er innan staðlaðra marka"
  330:         "Sósan skilar sex skálum og umröðun allra sex skála"
  332:         "sex skálar og umröðun 1..6"
  333:         (String.fromInt (Array.length sauceA.bowls) ++ " skálar; röð " ++ listIntString sauceA.orderAtDrop46)
  335:         "Endurtekin sósa er óháð millikalli og endurnýtingu myndaðra gagna"
  337:         "sama niðurstaða fyrir sama inntak eftir millikall"
  338:         (if sameSauce sauceA sauceAAgain then "sama niðurstaða" else "frávik eftir millikall")
  340:         "Sautján kótelettunöfn hafa nákvæma canonicalIndex-röð"
  342:         "1..17, hvert gildi einu sinni"
  343:         (String.fromInt (List.length Catalog.cutletEntries) ++ " færslur")
  345:         "Fjörutíu og sjö mánaðarnöfn hafa nákvæma canonicalIndex-röð"
  347:         "1..47, hvert gildi einu sinni"
  348:         (String.fromInt (List.length Catalog.monthEntries) ++ " færslur")
  350:         "Fryst kótelettuskrá hefur nákvæm íslensk heiti"
  355:         "Fryst mánaðaskrá hefur nákvæm íslensk heiti"
  360:         "Vélaauðkenni katalógsins eru ótvíræð"
  362:         "öll sourceId einstök"
  363:         (String.fromInt (List.length sourceIds) ++ " auðkenni")
  365:         "Unicode-röðun íslensku strengjanna er ekki canonicalIndex-röðin"
  367:         "mismunandi raðir"
  370:         "Grunnsamhengi tveggja kallana deilir ekki framkvæmdarslóð"
  371:         (contextA.branchTrace == [ "BOOTSTRAP_ENTRY" ] && contextB.branchTrace == [ "BOOTSTRAP_ENTRY" ])
  372:         "tvær óháðar slóðir"
  373:         "tvær sjálfstæðar færslur"
  375:         "Breyting á mælingu og stigi í einu samhengi breytir ekki hinu"
  379:             && Dict.get "bootstrap.eignarhald.a" contextB.metrics == Nothing
  381:         "annað samhengi ósnert og inntak þess fyrra óbreytt"
  382:         "samhengi skoðuð eftir sjálfstæðar umbreytingar"
  384:         "Röð sjálfstæðra samhengiútreikninga breytir ekki niðurstöðu"
  386:         "sama par óháð byggingarröð"
  387:         (if sameContextPair sequenceAB sequenceBA then "sama par" else "mismunandi par")
  389:         "Framleiðsluskelin stöðvast vísvitandi í Bootstrap"
  397:         "BootstrapOnly"
  400:                 "BootstrapOnly"
  403:                 "BaseValidationFailed"
  406:                 "óvænt niðurstaða"
  414:         "PASS — " ++ item.name
  417:         "FAIL — "
  419:             ++ " | vænt: "
  421:             ++ " | fékk: "
  441:                 "GRÆNT"
  444:                 "RAUTT"
  446:     "Stage 1 prófanir: "
  450:         ++ " standast. Staða: "
  452:         ++ "\n"
  453:         ++ String.join "\n" (List.map renderCheck checks)

src/Pastafari/SourceLanguageCatalog.elm (64 match(es)):
  25:     [ { canonicalIndex = 1, sourceId = "BRONZE", text = "brons" }
  26:     , { canonicalIndex = 2, sourceId = "FOX", text = "refur" }
  27:     , { canonicalIndex = 3, sourceId = "KIDNEY", text = "nýra" }
  28:     , { canonicalIndex = 4, sourceId = "LAGASH", text = "Lagash" }
  29:     , { canonicalIndex = 5, sourceId = "THOUGHT", text = "hugsun" }
  30:     , { canonicalIndex = 6, sourceId = "FOUR_PARTS_OF_NINE", text = "fjórir hlutar af níu" }
  31:     , { canonicalIndex = 7, sourceId = "PALGURASH", text = "Palgúrasj" }
  32:     , { canonicalIndex = 8, sourceId = "PAPYRUS_SEDGE", text = "papýrusstör" }
  33:     , { canonicalIndex = 9, sourceId = "CLUSTER", text = "klasi" }
  34:     , { canonicalIndex = 10, sourceId = "SCORPION", text = "sporðdreki" }
  35:     , { canonicalIndex = 11, sourceId = "ASH", text = "aska" }
  36:     , { canonicalIndex = 12, sourceId = "WHEAT", text = "hveiti" }
  37:     , { canonicalIndex = 13, sourceId = "RIVER", text = "á" }
  38:     , { canonicalIndex = 14, sourceId = "LAUGHTER", text = "hlátur" }
  39:     , { canonicalIndex = 15, sourceId = "AKKAD", text = "Akkad" }
  40:     , { canonicalIndex = 16, sourceId = "HORN", text = "horn" }
  41:     , { canonicalIndex = 17, sourceId = "EMPTY_JAR", text = "tóma krukkan" }
  47:     [ { canonicalIndex = 1, sourceId = "CLAY", text = "leir" }
  48:     , { canonicalIndex = 2, sourceId = "POMEGRANATE", text = "granatepli" }
  49:     , { canonicalIndex = 3, sourceId = "ELBOW", text = "olnbogi" }
  50:     , { canonicalIndex = 4, sourceId = "ENVY", text = "öfund" }
  51:     , { canonicalIndex = 5, sourceId = "ERIDU", text = "Erídú" }
  52:     , { canonicalIndex = 6, sourceId = "TOOTHPASTE", text = "tannkrem" }
  53:     , { canonicalIndex = 7, sourceId = "THREE_PARTS_OF_FIVE", text = "þrír hlutar af fimm" }
  54:     , { canonicalIndex = 8, sourceId = "KARSHUMAV", text = "Karsjúmav" }
  55:     , { canonicalIndex = 9, sourceId = "LEOPARD", text = "hlébarði" }
  56:     , { canonicalIndex = 10, sourceId = "TIN", text = "tin" }
  57:     , { canonicalIndex = 11, sourceId = "MIST", text = "mistur" }
  58:     , { canonicalIndex = 12, sourceId = "FRANKINCENSE", text = "reykelsi" }
  59:     , { canonicalIndex = 13, sourceId = "SPINDLE", text = "snælda" }
  60:     , { canonicalIndex = 14, sourceId = "RIB", text = "rif" }
  61:     , { canonicalIndex = 15, sourceId = "CAROB", text = "jóhannesarbrauð" }
  62:     , { canonicalIndex = 16, sourceId = "URUK", text = "Úrúk" }
  63:     , { canonicalIndex = 17, sourceId = "SHAME", text = "skömm" }
  64:     , { canonicalIndex = 18, sourceId = "CAMEL", text = "úlfaldi" }
  65:     , { canonicalIndex = 19, sourceId = "COPPER", text = "kopar" }
  66:     , { canonicalIndex = 20, sourceId = "WELL", text = "brunnur" }
  67:     , { canonicalIndex = 21, sourceId = "YOLK", text = "eggjarauða" }
  68:     , { canonicalIndex = 22, sourceId = "STAR", text = "stjarna" }
  69:     , { canonicalIndex = 23, sourceId = "HONEY", text = "hunang" }
  70:     , { canonicalIndex = 24, sourceId = "SPLEEN", text = "milta" }
  71:     , { canonicalIndex = 25, sourceId = "LIMESTONE", text = "kalksteinn" }
  72:     , { canonicalIndex = 26, sourceId = "JOY", text = "gleði" }
  73:     , { canonicalIndex = 27, sourceId = "FIG", text = "fíkja" }
  74:     , { canonicalIndex = 28, sourceId = "NINEVEH", text = "Níníve" }
  75:     , { canonicalIndex = 29, sourceId = "FROG", text = "froskur" }
  76:     , { canonicalIndex = 30, sourceId = "PITCH", text = "bik" }
  77:     , { canonicalIndex = 31, sourceId = "LAMP", text = "lampi" }
  78:     , { canonicalIndex = 32, sourceId = "CLOSED_DOOR", text = "lokaða hurðin" }
  79:     , { canonicalIndex = 33, sourceId = "SESAME", text = "sesam" }
  80:     , { canonicalIndex = 34, sourceId = "NAPE", text = "hnakki" }
  81:     , { canonicalIndex = 35, sourceId = "SILVER", text = "silfur" }
  82:     , { canonicalIndex = 36, sourceId = "SUSA", text = "Súsa" }
  83:     , { canonicalIndex = 37, sourceId = "STORM", text = "stormur" }
  84:     , { canonicalIndex = 38, sourceId = "DONKEY", text = "asni" }
  85:     , { canonicalIndex = 39, sourceId = "FLOUR", text = "mjöl" }
  86:     , { canonicalIndex = 40, sourceId = "REGRET", text = "eftirsjá" }
  87:     , { canonicalIndex = 41, sourceId = "BABYLON", text = "Babýlon" }
  88:     , { canonicalIndex = 42, sourceId = "TONGUE", text = "tunga" }
  89:     , { canonicalIndex = 43, sourceId = "FLAX", text = "hör" }
  90:     , { canonicalIndex = 44, sourceId = "SALT", text = "salt" }
  91:     , { canonicalIndex = 45, sourceId = "PEAR", text = "pera" }
  92:     , { canonicalIndex = 46, sourceId = "BOW", text = "bogi" }
  93:     , { canonicalIndex = 47, sourceId = "SAND", text = "sandur" }
src/Pastafari/Spaghetti.elm:31:                 |> MonsterBase.recordMetric "bootstrap.dispatch"

src/Pastafari/MonsterBase.elm (5 match(es)):
  58:     , branchTrace = [ "BOOTSTRAP_ENTRY" ]
  96:             "BOOTSTRAP_ENTRY"
  99:             "BOOTSTRAP_VALIDATION"
  102:             "BOOTSTRAP_READY"
  119:         Invalid { context | status = Failed } "Grunnsamhengið vantar framkvæmdarslóð."

tests/BootstrapFixtures.elm (64 match(es)):
  27:     [ "brons"
  28:     , "refur"
  29:     , "nýra"
  30:     , "Lagash"
  31:     , "hugsun"
  32:     , "fjórir hlutar af níu"
  33:     , "Palgúrasj"
  34:     , "papýrusstör"
  35:     , "klasi"
  36:     , "sporðdreki"
  37:     , "aska"
  38:     , "hveiti"
  39:     , "á"
  40:     , "hlátur"
  41:     , "Akkad"
  42:     , "horn"
  43:     , "tóma krukkan"
  49:     [ "leir"
  50:     , "granatepli"
  51:     , "olnbogi"
  52:     , "öfund"
  53:     , "Erídú"
  54:     , "tannkrem"
  55:     , "þrír hlutar af fimm"
  56:     , "Karsjúmav"
  57:     , "hlébarði"
  58:     , "tin"
  59:     , "mistur"
  60:     , "reykelsi"
  61:     , "snælda"
  62:     , "rif"
  63:     , "jóhannesarbrauð"
  64:     , "Úrúk"
  65:     , "skömm"
  66:     , "úlfaldi"
  67:     , "kopar"
  68:     , "brunnur"
  69:     , "eggjarauða"
  70:     , "stjarna"
  71:     , "hunang"
  72:     , "milta"
  73:     , "kalksteinn"
  74:     , "gleði"
  75:     , "fíkja"
  76:     , "Níníve"
  77:     , "froskur"
  78:     , "bik"
  79:     , "lampi"
  80:     , "lokaða hurðin"
  81:     , "sesam"
  82:     , "hnakki"
  83:     , "silfur"
  84:     , "Súsa"
  85:     , "stormur"
  86:     , "asni"
  87:     , "mjöl"
  88:     , "eftirsjá"
  89:     , "Babýlon"
  90:     , "tunga"
  91:     , "hör"
  92:     , "salt"
  93:     , "pera"
  94:     , "bogi"
  95:     , "sandur"

tests/NormativeOracle.elm (27 match(es)):
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
  1683:         ++ (if hit then "1" else "0")
  1773:                 Debug.todo "Röð kótelettuskiptingar fór út fyrir löglegu fjölskylduna."
  1859:         |> expectMaybe "Kótilettufjöldi hafði engan gildan frambjóðanda."
  1880:                                 |> expectMaybe "Innra hliðabil komst ekki í Elm Int."
  1951:                 |> expectMaybe "Árslengd komst ekki í Elm Int þrátt fyrir 5778 daga hámark."
  1974:                 |> expectMaybe "Árslengd komst ekki í Elm Int þrátt fyrir 5778 daga hámark."
  2068:         |> expectMaybe "Markdagurinn fannst ekki í neinni kótelettu."
  2097:                 |> expectMaybe "Dagshliðrun innan árs komst ekki í Elm Int."
  2125:             |> expectMaybe "Kótilettuvísitala vantar í frysta íslenska katalóginn."
  2129:             |> expectMaybe "Mánaðarvísitala vantar í frysta íslenska katalóginn."
```

</details>


---

<sub>1m 1s</sub>

### `rg`

**"(about|calendar|reverse|guide|year|date|target|footer|search|settings|comparison|location|day|meta|app)\.[^"]+"**

""(about|calendar|reverse|guide|year|date|target|footer|search|settings|comparison|location|day|meta|app)\.[^"]+"" (docs/i18n/locales/is.js)

<details>
<summary>203 matches</summary>

```
[grep content: 201 matches across 1 file(s) under docs/i18n/locales]

is.js (201 match(es)):
  9:     "meta.description": "Pastafari-dagatal með dagsetningarleit og samanburði.",
  12:     "app.title": "Pastafari-dagatal",
  14:     "app.intro": "Finndu dagsetningu í einu dagatalanna sem vefurinn styður. Þá sérðu fulla Pastafari-dagsetningu þess dags og kótelettuna sem hann tilheyrir.",
  15:     "guide.open": "Hvernig nota ég þennan vef?",
  16:     "guide.openShort": "Hvernig á að nota vefinn",
  17:     "reverse.error.absoluteDateField": "Dagsetningin inniheldur ógilt gildi.",
  18:     "reverse.error.limitSafeInteger": "Gildi reitsins „{field}“ er utan öruggs heiltölusviðs.",
  19:     "reverse.error.limitPositive": "Gildi reitsins „{field}“ verður að vera jákvætt.",
  20:     "app.brand": "PASTAFARI",
  21:     "about.open": "Um Pastafari-dagatalið",
  22:     "about.openShort": "Um dagatalið",
  23:     "about.title": "Um Pastafari-dagatalið",
  24:     "about.metaDescription": "Skýring á Pastafari-dagatalinu: aðgerðardagur og fyrirspurnardagur, ár, kótelettur, fléttaðir mánuðir, dagamörk og háþróuð kerfi.",
  25:     "about.intro": "Hvernig dagatalið sýnir daga, ár, kótelettur, fléttaða mánuði og aðgerðardaginn.",
  26:     "about.skip": "Fara í skýringu dagatalsins",
  27:     "about.back": "Til baka í dagatalið",
  28:     "about.tocKicker": "Á þessari síðu",
  29:     "about.toc": "Efnisyfirlit",
  30:     "about.fallbackNotice": "Skýringin er ekki tiltæk á völdu tungumáli; hebreska útgáfan er sýnd í staðinn.",
  31:     "about.loadError": "Ekki tókst að hlaða skýringu dagatalsins.",
  33:     "day.staleWarning": "Núverandi dagur breyttist úr {previousDate} í {currentDate}. Þar sem aðgerðardagurinn fylgdi deginum í dag eru dagsetningarnar sem birtast ekki lengur uppfærðar. Þær verða reiknaðar aftur eftir að þú lokar þessum skilaboðum.",
  34:     "location.assumption": "(Ef engar upplýsingar benda til annars er gert ráð fyrir að tækið sé í Kisurra.)",
  35:     "location.useDevice": "Nota staðsetningu tækisins",
  36:     "search.kicker": "Dagsetningarleit",
  37:     "search.heading": "Hvaða dag viltu finna?",
  38:     "search.intro": "Veldu dagatal, sláðu inn dagsetningu og veldu „Sýna dagsetningu“. Núverandi Pastafari-dagur er sjálfgefinn í reitunum.",
  39:     "search.calendarLabel": "Dagatal fyrir innslátt",
  40:     "search.submit": "Sýna dagsetningu",
  41:     "search.invalid": "Ekki tókst að lesa dagsetninguna. Gakktu úr skugga um að allir reitir séu útfylltir og að dagsetningin sé til í valda dagatalinu.",
  42:     "settings.summary": "Valkostir fyrir útreikning og samanburð",
  43:     "settings.heading": "Breyta aðgerðardegi",
  44:     "settings.intro": "Aðgerðardagurinn er upphafspunktur útreikningsins. Sjálfgefið notar vefurinn núverandi Pastafari-dag sem ákvarðaður er fyrir virka staðsetningu athugandans.",
  45:     "settings.actionCalendarLabel": "Dagatal til að slá inn aðgerðardag",
  46:     "settings.apply": "Nota aðgerðardag",
  47:     "settings.reset": "Endurstilla á núverandi Pastafari-dag",
  48:     "settings.invalid": "Aðgerðardagurinn er ógildur. Athugaðu dagsetninguna og reyndu aftur.",
  49:     "comparison.toggle": "Bera tvo útreikninga saman hlið við hlið",
  50:     "comparison.toggleHelp": "Tiltækt á breiðum skjá. Hver lína sýnir sama fyrirspurnardag með tveimur mismunandi aðgerðardögum.",
  51:     "comparison.secondActionLabel": "Dagatal til að slá inn seinni aðgerðardaginn",
  52:     "comparison.apply": "Uppfæra samanburð",
  53:     "comparison.kicker": "Samanburður dag fyrir dag",
  54:     "comparison.heading": "Sömu dagar, tveir aðgerðardagar",
  55:     "comparison.intro": "Hver lína inniheldur nákvæmlega sama fyrirspurnardag. Aðeins aðgerðardagurinn er ólíkur í dálkunum tveimur.",
  56:     "comparison.sameDay": "Sami fyrirspurnardagur í báðum útreikningum",
  57:     "comparison.actionHeading": "Aðgerðardagur: {date}",
  58:     "comparison.summary": "Sýndir eru {count} dagar, frá fyrsta til síðasta dags kótelettunnar sem birtist í fyrri útreikningnum.",
  59:     "comparison.scrollAria": "Samanburðartafla sömu daga undir tveimur útreikningum",
  60:     "comparison.desktopOnly": "Öll samanburðartaflan er tiltæk á breiðum skjá.",
  61:     "comparison.invalid": "Seinni aðgerðardagurinn er ógildur. Athugaðu dagsetninguna og reyndu aftur.",
  115:     "calendar.toolbarAria": "Flakk milli kótelettna",
  116:     "calendar.previous": "Fyrri kóteletta",
  117:     "calendar.today": "Til baka í dag",
  118:     "calendar.next": "Næsta kóteletta",
  119:     "calendar.daysAria": "Dagar í kótelettunni {cutletName}",
  120:     "calendar.currentCutlet": "Ár {year} · kóteletta",
  121:     "calendar.cutletDescription": "{count} dagar · aðgerðardagur: {actionDate}",
  122:     "calendar.targetOutside": "Dagsetningin sem þú leitaðir að er ekki í kótelettunni sem nú er sýnd. Þú getur haldið áfram að fletta eða leitað að annarri dagsetningu.",
  123:     "year.kicker": "Árið í hnotskurn",
  124:     "year.heading": "Uppbygging árs {year}",
  125:     "year.context": "Þessi uppbygging er reiknuð fyrir aðgerðardaginn {actionDate}. Ef aðgerðardeginum er breytt getur þurft að byggja ársmörk, kótelettur og mánuði upp að nýju.",
  126:     "year.loading": "Byggir upp alla ársuppbygginguna…",
  127:     "year.error": "Ekki tókst að byggja upp alla ársuppbygginguna. Kótelettusýnin er áfram tiltæk.",
  128:     "year.lengthLabel": "Lengd ársins",
  129:     "year.cutletCountLabel": "Kótelettur",
  130:     "year.monthCountLabel": "Mánuðir",
  131:     "year.rangeLabel": "Gregorískt dagabil",
  132:     "year.daysValue": "{count} dagar",
  133:     "year.rangeValue": "{startDate}–{endDate}",
  134:     "year.displayedCutletPosition": "Sýnda kótelettan nær yfir daga {start}–{end} ársins.",
  135:     "year.targetPosition": "Dagsetningin sem þú leitaðir að er dagur {day} af {length} í þessu ári.",
  136:     "year.monthExplainer": "Mánuðir fléttast óháð kótelettum í gegnum árið: mánuður er ekki undirdeild kótelettu og dagar hans geta birst í mörgum aðskildum runum. Lengd mánaðar er því heildarfjöldi daga sem honum er úthlutað, ekki endilega eitt samfellt tímabil.",
  137:     "year.cutletsSummary": "Kótelettur á þessu ári ({count})",
  138:     "year.monthsSummary": "Mánuðir á þessu ári ({count})",
  139:     "year.numberedName": "{number}. {name}",
  140:     "year.cutletMeta": "Lengd: {length} dagar · staða í árinu: dagar {start}–{end}",
  141:     "year.monthMeta": "Dagar: {length} · samfelldar runur: {runs} · fyrsta birting: dagur {first} · síðasta: dagur {last}",
  142:     "target.today": "Þetta er í dag",
  143:     "target.searched": "Þetta er dagsetningin sem þú leitaðir að",
  144:     "target.context": "Fyrirspurnardagur: {targetDate} · aðgerðardagur: {actionDate}",
  145:     "target.notInView": "Dagsetningin sem þú leitaðir að er enn varðveitt; kótelettan sem nú er sýnd er önnur.",
  146:     "date.aria": "Ár {year} frá sköpun heimsins, dagur {dayInCutlet} í kótelettunni {cutletName}, dagur {dayInMonth} í mánuðinum {monthName}",
  147:     "date.yearLine": "Ár {year} frá sköpun heimsins",
  148:     "date.cutletLine": "Dagur {dayInCutlet} í kótelettunni {cutletName}",
  149:     "date.monthLine": "Dagur {dayInMonth} í mánuðinum {monthName}",
  150:     "guide.eyebrow": "Notkunarleiðbeiningar",
  151:     "guide.heading": "Hvað er hægt að gera hér og hvernig?",
  152:     "guide.intro": "Vefurinn sýnir fulla Pastafari-dagsetningu fyrir hvaða dag sem er, tekur við leit í mörgum dagatölum og getur á breiðum skjá borið saman áhrif aðgerðardagsins.",
  153:     "guide.1.heading": "Opnaðu vefinn og sjáðu dagsetningu dagsins",
  154:     "guide.1.body": "Um leið og tengillinn opnast ákvarðar vefurinn núverandi Pastafari-dag fyrir virka staðsetningu athugandans og sýnir kótelettuna sem hann tilheyrir. Dagamörkin eru staðsetningarháði tímapunkturinn þegar miðja Venusar fer um neðri hluta staðbundna hádegisbaugsins, eins og lýst er í ASTRONOMICAL-DAY.md; þau eru ekki borgaralegt miðnætti. Engin skráning eða innskráning er nauðsynleg og engin dagsetning er send á reikniþjón.",
  155:     "guide.2.heading": "Leitaðu í hvaða studdu dagatali sem er",
  156:     "guide.2.body": "Undir „Hvaða dag viltu finna?“ velurðu dagatal, fyllir út reitina og velur „Sýna dagsetningu“. Valkostirnir fela í sér gregorískt, hebreskt, júlíanskt, íslamskt, persneskt, kínverskt, hindú, saka, taílenskt, eþíópískt, koptískt, japanskt, minguo og bahá’í dagatal, auk langtals Maya.",
  157:     "guide.3.heading": "Lestu dagsetninguna",
  158:     "guide.3.body": "Hver reitur hefur þrjár fastar línur: ár frá sköpun heimsins; númer dags í kótelettunni og nafn hennar; síðan dag í mánuðinum og nafn mánaðarins. Engin ein tala táknar alla dagsetninguna. Nafn mánaðarins ræður lit reitsins.",
  159:     "guide.4.heading": "Flettu án þess að velja fyrir mistök",
  160:     "guide.4.body": "„Fyrri kóteletta“ og „Næsta kóteletta“ fara í nágrannakótelettur. Aðrir dagareitir eru ekki hnappar, því ekki er hægt að framkvæma aðgerð með því að smella á þá. „Til baka í dag“ endurstillir bæði leitina og aðgerðardaginn á núverandi Pastafari-dag.",
  161:     "guide.5.heading": "Breyttu aðgerðardeginum",
  162:     "guide.5.body": "Opnaðu „Valkostir fyrir útreikning og samanburð“ undir leitinni. Þar geturðu valið dagatal og slegið inn annan aðgerðardag. Næstu leitir nota hann þar til þú endurstillir á núverandi Pastafari-dag. Þessi háþróaði valkostur er tiltækur án þess að þyngja venjulegu sýnina.",
  163:     "guide.6.heading": "Berðu sömu daga saman tvisvar",
  164:     "guide.6.body": "Á breiðum skjá virkjarðu samanburðinn á sama stað. Hver lína inniheldur nákvæmlega sama fyrirspurnardag; fyrri dálkurinn notar fyrri aðgerðardaginn og sá seinni hinn. Sjálfgefið er að bera í dag saman við morgundaginn, svo auðvelt er að sjá hvaða Pastafari-dagsetningar breytast.",
  165:     "guide.7.heading": "Skoðaðu allt árið",
  166:     "guide.7.body": "Undir kótelettusýninni sýnir vefurinn uppbyggingu sýnda ársins: lengd og bil, hverja kótelettu og lengd hennar, og hvern mánuð. Fyrir mánuði sýnir hann einnig fjölda samfelldra runa og fyrstu og síðustu birtingu, svo fléttunin í gegnum árið verður sýnileg.",
  167:     "guide.note": "Raðir og dálkar reitanetsins eru aðeins sjónræn uppröðun, ekki vikur. Í samanburðartöflunni hefur röðunin hins vegar merkingu: hver lína er sami fyrirspurnardagurinn.",
  168:     "guide.back": "Til baka í leit og dagatal",
  169:     "footer.local": "Útreikningurinn fer fram á tækinu þínu; vefurinn hefur engan notandareikning og engan rakningarkóða.",
  170:     "footer.open": "Tengillinn er opinber og opnast beint, einnig í einkavafraglugga.",
  171:     "reverse.kicker": "Öfug leit",
  172:     "reverse.heading": "Finna dag út frá Pastafari-dagsetningu hans",
  173:     "reverse.intro": "Sláðu inn fulla Pastafari-dagsetningu og skilgreindu aðgerðardag hennar. Leitin fer fram staðbundið á þessu tæki.",
  174:     "reverse.mode.basic": "Ein dagsetning",
  175:     "reverse.mode.advanced": "Skorðuleit",
  176:     "reverse.basic.heading": "Öfug leit að einni dagsetningu",
  177:     "reverse.basic.dateHeading": "Pastafari-dagsetning sem á að finna",
  178:     "reverse.field.year": "Ár",
  179:     "reverse.field.cutlet": "Kóteletta",
  180:     "reverse.field.dayInCutlet": "Dagur í kótelettu",
  181:     "reverse.field.month": "Mánuður",
  182:     "reverse.field.dayInMonth": "Dagur í mánuði",
  183:     "reverse.basic.calculationHeading": "Aðgerðardagur",
  184:     "reverse.basic.calculationMode": "Hvernig er aðgerðardagurinn skilgreindur?",
  185:     "reverse.basic.calculation.active": "Nota virkan aðgerðardag vefsins",
  186:     "reverse.basic.calculation.absolute": "Nota aðra þekkta dagsetningu",
  187:     "reverse.basic.calculation.same": "Aðgerðardagurinn er sami dagur og fyrirspurnardagurinn (c = t)",
  188:     "reverse.basic.calculation.pastafari": "Aðgerðardagurinn er einnig Pastafari-dagur eða háður öðrum dagsetningum",
  189:     "reverse.basic.activeValue": "Virkur aðgerðardagur: {date}",
  190:     "reverse.basic.absoluteHeading": "Þekktur aðgerðardagur",
  191:     "reverse.basic.sameHeading": "Endanlegt leitarsvið fyrir c = t",
  192:     "reverse.basic.rangeStart": "Upphaf sviðs",
  193:     "reverse.basic.rangeEnd": "Lok sviðs",
  194:     "reverse.basic.toAdvanced": "Halda áfram í ritil fyrir skorðuleit",
  195:     "reverse.basic.toAdvancedHelp": "Endurkvæm tengsl milli Pastafari-aðgerðardaga eru sett fram sem breytur og skorður, svo hægt sé að lengja keðjuna án gervilegra dýptarmarka.",
  196:     "reverse.action.solve": "Leita",
  197:     "reverse.action.cancel": "Hætta við leit",
  198:     "reverse.action.open": "Opna í dagatali",
  199:     "reverse.action.addVariable": "Bæta við dagsetningarbreytu",
  200:     "reverse.action.addConstraint": "Bæta við skorðu",
  201:     "reverse.action.remove": "Fjarlægja",
  202:     "reverse.action.clear": "Hreinsa niðurstöður",
  203:     "reverse.progress.reverse": "Úrvinnsla Pastafari-tengsla",
  204:     "reverse.progress.verify": "Staðfesting mögulegra lausna",
  205:     "reverse.progress.done": "Leit lokið",
  206:     "reverse.progress.scanned": "Unnar vinnueiningar: {count}",
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
  218:     "reverse.result.heading": "Lausnir",
  219:     "reverse.result.solution": "Lausn {index}",
  220:     "reverse.result.target": "Fyrirspurnardagur",
  221:     "reverse.result.calculation": "Aðgerðardagur",
  222:     "reverse.result.jdn": "JDN {jdn}",
  223:     "reverse.result.complete": "Full leit",
  224:     "reverse.result.partial": "Leit að hluta",
  225:     "reverse.advanced.heading": "Skorðuleit",
  226:     "reverse.advanced.intro": "Skilgreindu dagsetningarbreytur og tengsl þeirra. Hringir eru leyfðir þegar kerfið er þrengt að endanlegum sviðum.",
  227:     "reverse.variables.heading": "Dagsetningarbreytur",
  228:     "reverse.variable.label": "Birtingarnafn",
  229:     "reverse.variable.defaultName": "Dagsetning {index}",
  230:     "reverse.variable.domain": "Svið",
  231:     "reverse.variable.domain.unknown": "Óþekkt (verður að takmarkast af öðrum skorðum)",
  232:     "reverse.variable.domain.exact": "Nákvæm þekkt dagsetning",
  233:     "reverse.variable.domain.range": "Endanlegt dagsetningarsvið",
  234:     "reverse.constraint.heading": "Skorður",
  235:     "reverse.constraint.type": "Tegund skorðu",
  236:     "reverse.constraint.pastafari": "Pastafari-dagsetning",
  237:     "reverse.constraint.equal": "Sami dagur á tímalínunni",
  238:     "reverse.constraint.order": "Tímaröð",
  239:     "reverse.constraint.difference": "Mismunur í dögum",
  240:     "reverse.constraint.left": "Vinstri dagsetning",
  241:     "reverse.constraint.right": "Hægri dagsetning",
  242:     "reverse.constraint.target": "Dagsetningarbreyta fyrir fyrirspurnardag",
  243:     "reverse.constraint.calculationMode": "Uppruni aðgerðardags",
  244:     "reverse.constraint.calculation.variable": "Önnur dagsetningarbreyta",
  245:     "reverse.constraint.calculation.absolute": "Þekkt dagsetning",
  246:     "reverse.constraint.calculation.same": "Sama og fyrirspurnardagur (c = t)",
  247:     "reverse.constraint.calculationVariable": "Aðgerðardagsbreyta",
  248:     "reverse.constraint.orderOp": "Tengsl",
  249:     "reverse.constraint.differenceMode": "Mismunarregla",
  250:     "reverse.constraint.differenceExact": "Nákvæmur mismunur",
  251:     "reverse.constraint.differenceRange": "Mismunarsvið",
  252:     "reverse.constraint.equals": "Nákvæmir dagar (vinstri − hægri)",
  253:     "reverse.constraint.min": "Lágmarksdagar (vinstri − hægri)",
  254:     "reverse.constraint.max": "Hámarksdagar (vinstri − hægri)",
  255:     "reverse.options.heading": "Leitarmörk",
  256:     "reverse.options.intro": "Skildu reitina auða ef þú vilt að engin mörk gildi. Mörkum er aldrei beitt án þess að það sé tekið fram.",
  257:     "reverse.options.maxSolutions": "Stöðva eftir þennan fjölda staðfestra lausna",
  258:     "reverse.options.maxScanned": "Stöðva eftir þennan fjölda vinnueininga",
  259:     "reverse.options.timeout": "Tímamörk í millisekúndum",
  260:     "reverse.advanced.emptyVariables": "Bættu við að minnsta kosti einni dagsetningarbreytu.",
  261:     "reverse.advanced.emptyConstraints": "Kerfi má vera án skorða, en sérhver breyta sem eftir er verður samt að hafa endanlegt svið.",
  262:     "reverse.error.input": "Nokkra reiti öfugrar leitar vantar eða þeir eru ógildir.",
  263:     "reverse.error.range": "Lok sviðs mega ekki vera á undan upphafi þess.",
  264:     "reverse.error.variable": "Sérhver skorða verður að vísa í dagsetningarbreytu sem er til.",
  265:     "reverse.error.pastafari": "Sláðu inn alla fimm reiti Pastafari-dagsetningarinnar.",
  266:     "reverse.calendar.label": "Dagatal fyrir þekkta dagsetningu",
```

</details>


---

<sub>1m 1s</sub>

### `rg`

**lang=|data-locale="is"|ARTICLE_FALLBACK_LOCALE|ARTICLE_ROLLOUT_COMPLETE|code: "is"|intlLocale: "is-IS"**

"lang=|data-locale="is"|ARTICLE_FALLBACK_LOCALE|ARTICLE_ROLLOUT_COMPLETE|code: "is"|intlLocale: "is-IS"" (docs/index.html, docs/about/index.html, docs/about/content/registry.js, docs/i18n/locales/is.js, docs/no-js/index.html)

```
[grep content: 83 matches across 4 file(s) under docs]

index.html (3 match(es)):
  2: <html lang="en" dir="ltr">
  202:       <div class="noscript" lang="zxx" dir="ltr">
  203:         <p><strong>JavaScript</strong> <span>⚠</span> <a href="./no-js/" lang="zxx" dir="ltr">🌐</a></p>

no-js/index.html (73 match(es)):
  2: <html lang="zxx" dir="ltr">
  30:       <details data-locale="af" lang="af-ZA" dir="ltr">
  34:       <details data-locale="ar" lang="ar" dir="rtl">
  38:       <details data-locale="az" lang="az-AZ" dir="ltr">
  42:       <details data-locale="be" lang="be-BY" dir="ltr">
  46:       <details data-locale="bg" lang="bg-BG" dir="ltr">
  50:       <details data-locale="bn" lang="bn-BD" dir="ltr">
  54:       <details data-locale="bs" lang="bs-BA" dir="ltr">
  58:       <details data-locale="ca" lang="ca-ES" dir="ltr">
  62:       <details data-locale="cs" lang="cs-CZ" dir="ltr">
  66:       <details data-locale="da" lang="da-DK" dir="ltr">
  70:       <details data-locale="de" lang="de-DE" dir="ltr">
  74:       <details data-locale="el" lang="el-GR" dir="ltr">
  78:       <details data-locale="en" lang="en-US" dir="ltr">
  82:       <details data-locale="eo" lang="eo" dir="ltr">
  86:       <details data-locale="es" lang="es-ES" dir="ltr">
  90:       <details data-locale="et" lang="et-EE" dir="ltr">
  94:       <details data-locale="fa" lang="fa-IR" dir="rtl">
  98:       <details data-locale="fi" lang="fi-FI" dir="ltr">
  102:       <details data-locale="fil" lang="fil-PH" dir="ltr">
  106:       <details data-locale="fo" lang="fo-FO" dir="ltr">
  110:       <details data-locale="fr" lang="fr-FR" dir="ltr">
  114:       <details data-locale="fy" lang="fy-NL" dir="ltr">
  118:       <details data-locale="gl" lang="gl-ES" dir="ltr">
  122:       <details data-locale="gu" lang="gu-IN" dir="ltr">
  126:       <details data-locale="ha" lang="ha-NG" dir="ltr">
  130:       <details data-locale="he" lang="he-IL" dir="rtl">
  134:       <details data-locale="hi" lang="hi-IN" dir="ltr">
  138:       <details data-locale="hr" lang="hr-HR" dir="ltr">
  142:       <details data-locale="ht" lang="ht-HT" dir="ltr">
  146:       <details data-locale="hu" lang="hu-HU" dir="ltr">
  150:       <details data-locale="hy" lang="hy-AM" dir="ltr">
  154:       <details data-locale="id" lang="id-ID" dir="ltr">
  158:       <details data-locale="is" lang="is-IS" dir="ltr">
  162:       <details data-locale="it" lang="it-IT" dir="ltr">
  166:       <details data-locale="ja" lang="ja-JP" dir="ltr">
  170:       <details data-locale="jv" lang="jv-ID" dir="ltr">
  174:       <details data-locale="ka" lang="ka-GE" dir="ltr">
  178:       <details data-locale="kk" lang="kk-KZ" dir="ltr">
  182:       <details data-locale="ko" lang="ko-KR" dir="ltr">
  186:       <details data-locale="lb" lang="lb-LU" dir="ltr">
  190:       <details data-locale="lt" lang="lt-LT" dir="ltr">
  194:       <details data-locale="lv" lang="lv-LV" dir="ltr">
  198:       <details data-locale="mk" lang="mk-MK" dir="ltr">
  202:       <details data-locale="mr" lang="mr-IN" dir="ltr">
  206:       <details data-locale="ms" lang="ms-MY" dir="ltr">
  210:       <details data-locale="nb" lang="nb-NO" dir="ltr">
  214:       <details data-locale="ne" lang="ne-NP" dir="ltr">
  218:       <details data-locale="nl" lang="nl-NL" dir="ltr">
  222:       <details data-locale="nn" lang="nn-NO" dir="ltr">
  226:       <details data-locale="pa" lang="pa-IN" dir="ltr">
  230:       <details data-locale="pl" lang="pl-PL" dir="ltr">
  234:       <details data-locale="pt" lang="pt-BR" dir="ltr">
  238:       <details data-locale="ro" lang="ro-RO" dir="ltr">
  242:       <details data-locale="ru" lang="ru-RU" dir="ltr">
  246:       <details data-locale="sk" lang="sk-SK" dir="ltr">
  250:       <details data-locale="sl" lang="sl-SI" dir="ltr">
  254:       <details data-locale="so" lang="so-SO" dir="ltr">
  258:       <details data-locale="sq" lang="sq-AL" dir="ltr">
  262:       <details data-locale="sr" lang="sr-Latn-RS" dir="ltr">
  266:       <details data-locale="sv" lang="sv-SE" dir="ltr">
  270:       <details data-locale="sw" lang="sw-TZ" dir="ltr">
  274:       <details data-locale="ta" lang="ta-IN" dir="ltr">
  278:       <details data-locale="te" lang="te-IN" dir="ltr">
  282:       <details data-locale="th" lang="th-TH" dir="ltr">
  286:       <details data-locale="tr" lang="tr-TR" dir="ltr">
  290:       <details data-locale="uk" lang="uk-UA" dir="ltr">
  294:       <details data-locale="ur" lang="ur-PK" dir="rtl">
  298:       <details data-locale="uz" lang="uz-UZ" dir="ltr">
  302:       <details data-locale="vi" lang="vi-VN" dir="ltr">
  306:       <details data-locale="yo" lang="yo-NG" dir="ltr">
  310:       <details data-locale="zh" lang="zh-CN" dir="ltr">
  314:       <details data-locale="zu" lang="zu-ZA" dir="ltr">

about/content/registry.js (4 match(es)):
  3: export const ARTICLE_FALLBACK_LOCALE = "he";
  7: export const ARTICLE_ROLLOUT_COMPLETE = true;
  203:     code: "is",
  445:   return ARTICLE_LOCALES[code] ?? ARTICLE_LOCALES[ARTICLE_FALLBACK_LOCALE];

about/index.html (3 match(es)):
  2: <html lang="en" dir="ltr">
  80:       <div class="noscript" lang="zxx" dir="ltr">
  81:         <p><strong>JavaScript</strong> <span>⚠</span> <a href="../no-js/" lang="zxx" dir="ltr">🌐</a></p>
```


---

<sub>1m 1s</sub>

### `rg`

**"(eridu|uruk|susa|mist|rib|carob)"|text = "(Erídú|Úrúk|Súsa|mistur|rif|jóhannesarbrauð)"**

""(eridu|uruk|susa|mist|rib|carob)"|text = "(Erídú|Úrúk|Súsa|mistur|rif|jóhannesarbrauð)"" (docs/i18n/locales/is.js, artifacts/cross-repo-native-qa/runtime/repo2-0/src/Pastafari/SourceLanguageCatalog.elm)

<details>
<summary>12 matches</summary>

```
artifacts/cross-repo-native-qa/runtime/repo2-0/src/Pastafari/SourceLanguageCatalog.elm:51:    , { canonicalIndex = 5, sourceId = "ERIDU", text = "Erídú" }
artifacts/cross-repo-native-qa/runtime/repo2-0/src/Pastafari/SourceLanguageCatalog.elm:57:    , { canonicalIndex = 11, sourceId = "MIST", text = "mistur" }
artifacts/cross-repo-native-qa/runtime/repo2-0/src/Pastafari/SourceLanguageCatalog.elm:60:    , { canonicalIndex = 14, sourceId = "RIB", text = "rif" }
artifacts/cross-repo-native-qa/runtime/repo2-0/src/Pastafari/SourceLanguageCatalog.elm:61:    , { canonicalIndex = 15, sourceId = "CAROB", text = "jóhannesarbrauð" }
artifacts/cross-repo-native-qa/runtime/repo2-0/src/Pastafari/SourceLanguageCatalog.elm:62:    , { canonicalIndex = 16, sourceId = "URUK", text = "Úrúk" }
artifacts/cross-repo-native-qa/runtime/repo2-0/src/Pastafari/SourceLanguageCatalog.elm:82:    , { canonicalIndex = 36, sourceId = "SUSA", text = "Súsa" }
docs/i18n/locales/is.js:294:      "eridu": "Eridu",
docs/i18n/locales/is.js:300:      "mist": "Þoka",
docs/i18n/locales/is.js:303:      "rib": "Rifbein",
docs/i18n/locales/is.js:304:      "carob": "Karób",
docs/i18n/locales/is.js:305:      "uruk": "Uruk",
docs/i18n/locales/is.js:325:      "susa": "Susa",
```

</details>


---

<sub>1m 16s</sub>

### `rg`

**Short Choice|Wide Choice|Short choice|Wide choice|Stutt val|Vítt val**

"Short Choice|Wide Choice|Short choice|Wide choice|Stutt val|Vítt val"

<details>
<summary>58 matches</summary>

```
[grep content: 393 matches across 103 file(s) under .]

docs/about/content/en.html (4 match(es)):
  167:   <h2>Short Choice and Wide Choice</h2>
  168:   <p><strong>Short Choice</strong> is used when the system must select from a relatively small option space. It uses rejection sampling to avoid the bias of a simple modulo operation.</p>
  169:   <p>Very large choice spaces use <strong>Wide Choice</strong>. It is important not to give Wide Choice properties that the specification does not give it.</p>
  170:   <p>Wide Choice is not equivalent to generating independent, uniform base-<code>Q</code> digits until an index appears. It therefore does not follow that every legal option necessarily receives the same positive probability. In sufficiently large spaces, legal options can even exist that this particular selection mechanism cannot reach at all.</p>

docs/about/content/id.html (4 match(es)):
  142:   <h2>Short Choice dan Wide Choice</h2>
  143:   <p>Untuk ruang pilihan yang relatif kecil digunakan <strong>Short Choice</strong>. Mekanisme ini memakai pengambilan sampel dengan penolakan untuk menghindari bias modulo sederhana.</p>
  144:   <p>Ruang yang sangat besar menggunakan <strong>Wide Choice</strong>. Jangan memberinya sifat yang tidak dijamin oleh spesifikasi.</p>
  145:   <p>Wide Choice tidak setara dengan menghasilkan digit basis-<code>Q</code> yang independen dan seragam sampai diperoleh sebuah indeks. Jadi tidak dapat disimpulkan bahwa setiap pilihan yang sah pasti mempunyai peluang positif yang sama. Dalam ruang yang cukup besar, bisa ada pilihan sah yang sama sekali tidak dapat dicapai oleh mekanisme itu.</p>

docs/about/content/ht.html (4 match(es)):
  141:   <h2>Short Choice ak Wide Choice</h2>
  142:   <p>Pou espas chwa ki relativman piti, yo sèvi ak <strong>Short Choice</strong>. Li sèvi ak echantiyonaj pa rejè pou evite yon patipri modulo senp.</p>
  143:   <p>Pou espas ki trè gwo, yo sèvi ak <strong>Wide Choice</strong>. Pa dwe bay li pwopriyete spesifikasyon la pa garanti.</p>
  144:   <p>Wide Choice pa menm bagay ak pwodwi chif baz <code>Q</code> ki endepandan epi distribye egalego jiskaske nou jwenn yon endèks. Kidonk sa pa vle di chak chwa valab dwe gen menm pwobabilite pozitif. Nan space ki ase gwo, kapab gen chwa valab mekanis sa a pa janm rive jwenn.</p>

docs/about/content/ro.html (4 match(es)):
  123:   <h2>Short Choice și Wide Choice</h2>
  124:   <p>Pentru spații de opțiuni relativ mici se folosește <strong>Short Choice</strong>. Ea utilizează eșantionarea prin respingere pentru a evita bias-ul simplu de modulo.</p>
  125:   <p>Spațiile foarte mari folosesc <strong>Wide Choice</strong>. Nu trebuie să-i atribuim proprietăți pe care specificația nu le garantează.</p>
  126:   <p>Wide Choice nu este echivalentă cu generarea unor cifre independente și uniforme în baza <code>Q</code> până la obținerea unui indice. Prin urmare, nu rezultă că fiecare opțiune legală are neapărat aceeași probabilitate pozitivă; în spații suficient de mari pot exista opțiuni legale la care mecanismul nu ajunge deloc.</p>

docs/about/content/fy.html (4 match(es)):
  141:   <h2>Short Choice en Wide Choice</h2>
  142:   <p>Foar relatyf lytse karromten wurdt <strong>Short Choice</strong> brûkt. It brûkt in ôfwizingsmetoade om systematyske modulo-ôfwiking te foarkommen.</p>
  143:   <p>Foar tige grutte karromten wurdt <strong>Wide Choice</strong> brûkt. Der moatte gjin eigenskippen oan taskreaun wurde dy't de spesifikaasje net garandearret.</p>
  144:   <p>Wide Choice is net itselde as ûnôfhinklike en lykmjittich ferdielde basis-<code>Q</code>-sifers meitsje oant in yndeks krigen wurdt. Dêrom folget net dat elke jildige kar needsaaklik deselde positive kâns hat. Yn grut genôch karromten kinne jildige kar bestean dy't dit meganisme nea berikke kin.</p>

docs/about/content/sq.html (4 match(es)):
  141:   <h2>Short Choice dhe Wide Choice</h2>
  142:   <p>Për hapësira relativisht të vogla zgjedhjeje përdoret <strong>Short Choice</strong>. Ai përdor kampionim me refuzim për të shmangur anshmëri modulo të thjeshtë.</p>
  143:   <p>Për hapësira shumë të mëdha përdoret <strong>Wide Choice</strong>. Nuk duhet t’i atribuohen veti që specifikimi nuk i garanton.</p>
  144:   <p>Wide Choice nuk është e barasvlershme me prodhimin e shifrave base-<code>Q</code> të pavarura dhe të shpërndara njëtrajtshëm derisa të merret një index. Prandaj nuk del përfundimi se çdo choice i vlefshëm ka domosdoshmërisht të njëjtën probabilitet pozitiv. Në hapësira mjaft të mëdha mund të ketë choice të vlefshme që ky mechanism nuk i arrin kurrë.</p>

docs/about/content/jv.html (4 match(es)):
  141:   <h2>Short Choice lan Wide Choice</h2>
  142:   <p>Kanggo ruang pilihan sing relatif cilik digunakaké <strong>Short Choice</strong>. Iki njupuk sampel kanthi panolakan supaya ora kena bias saka operasi modulo sing prasaja.</p>
  143:   <p>Kanggo ruang pilihan sing gedhé banget digunakaké <strong>Wide Choice</strong>. Aja mènèhi sipat sing ora dijamin spésifikasi.</p>
  144:   <p>Wide Choice ora padha karo nggawe digit basis-<code>Q</code> sing mandhiri lan kasebar rata nganti entuk indeks. Mula ora bisa disimpulaké yèn saben pilihan sing sah kudu nduwé probabilitas positif sing padha. Ing ruang sing cukup gedhé bisa ana pilihan sah sing ora tau bisa digayuh mekanisme iki.</p>

docs/about/content/nn.html (4 match(es)):
  141:   <h2>Short Choice og Wide Choice</h2>
  142:   <p>For relativt små valrom blir <strong>Short Choice</strong> brukt. Han bruker avvisingsutval for å unngå enkel modulo-skeivskap.</p>
  143:   <p>For svært store rom blir <strong>Wide Choice</strong> brukt. Ein skal ikkje leggje til eigenskapar som spesifikasjonen ikkje garanterer.</p>
  144:   <p>Wide Choice er ikkje det same som å lage uavhengige, jamt fordelte base-<code>Q</code>-siffer heilt til ein får ein index. Det følgjer difor ikkje at kvar valid choice nødvendigvis har same positive sannsyn. I store nok rom kan det finnast valid choice som denne mechanism aldri kan nå.</p>

docs/about/content/so.html (4 match(es)):
  123:   <h2>Short Choice iyo Wide Choice</h2>
  124:   <p>Meelaha xulashooyinka ee yar waxaa la isticmaalaa <strong>Short Choice</strong>. Waxay adeegsataa muunad-qaadis diidmo leh si looga fogaado eexda modulo fudud.</p>
  125:   <p>Meelaha aadka u waaweyn waxaa la isticmaalaa <strong>Wide Choice</strong>. Waa inaan loo nisbayn sifooyin aan qeexitaanku dammaanad qaadin.</p>
  126:   <p>Wide Choice lama mid aha soo saarista tirooyin sal-<code>Q</code> ah oo madaxbannaan oo si siman u qaybsan ilaa index la helo. Sidaas darteed kama dhalanayso in xulasho kasta oo sharci ahi khasab ku leedahay suurtagalnimo togan oo isku mid ah. Meelo ku filan oo waaweyn waxaa jiri kara xulashooyin sharci ah oo habkani aanu gaari karin haba yaraatee.</p>

docs/about/content/pl.html (4 match(es)):
  123:   <h2>Short Choice i Wide Choice</h2>
  124:   <p>Dla stosunkowo małych przestrzeni wyboru używa się <strong>Short Choice</strong>. Wykorzystuje ona losowanie z odrzucaniem, aby uniknąć prostego obciążenia modulo.</p>
  125:   <p>Bardzo duże przestrzenie używają <strong>Wide Choice</strong>. Nie wolno przypisywać jej własności, których specyfikacja nie gwarantuje.</p>
  126:   <p>Wide Choice nie jest równoważna generowaniu niezależnych, jednostajnych cyfr w podstawie <code>Q</code> aż do uzyskania indeksu. Nie wynika więc z niej, że każda dozwolona możliwość ma koniecznie tę samą dodatnią szansę. W dostatecznie dużych przestrzeniach mogą istnieć legalne opcje całkowicie nieosiągalne dla tego mechanizmu.</p>

docs/about/content/hi.html (4 match(es)):
  141:   <h2>Short Choice और Wide Choice</h2>
  142:   <p>तुलनात्मक रूप से छोटे चयन-क्षेत्र में <strong>Short Choice</strong> का उपयोग होता है। वह सरल मॉड्यूलो पक्षपात से बचने के लिए अस्वीकृति नमूनाकरण का उपयोग करता है।</p>
  143:   <p>बहुत बड़े क्षेत्र में <strong>Wide Choice</strong> उपयोग होता है। विनिर्देश जिन गुणों की गारंटी नहीं देती, उन्हें उस पर आरोपित नहीं करना चाहिए।</p>
  144:   <p>Wide Choice वैसा नहीं है जैसे स्वतंत्र और समान रूप से वितरित आधार-<code>Q</code> अंक बनाते रहें जब तक सूचकांक न मिल जाए। इसलिए यह निष्कर्ष नहीं निकलता कि हर वैध चयन की समान धनात्मक प्रायिकता होनी ही चाहिए। पर्याप्त बड़े क्षेत्र में ऐसे वैध चयन हो सकते हैं जिन तक यह तंत्र कभी पहुँच ही न सके।</p>
docs/about/content/da.html:20: <section class="about-section" id="short-and-wide-choice" data-toc-section data-toc-level="2"><h2>Short Choice og Wide Choice</h2><p><strong>Short Choice</strong> bruges i relativt små valgrum og anvender forkastningssampling for at undgå skævhed fra simpel modulo.</p><p>Meget store valgrum bruger <strong>Wide Choice</strong>. Det svarer ikke til at trække uafhængige, uniformt fordelte cifre i base <code>Q</code>, indtil man får et indeks.</p><p>Derfor følger det ikke, at enhver lovlig mulighed nødvendigvis har samme positive sandsynlighed. I tilstrækkeligt store rum kan der endda være lovlige muligheder, som mekanismen slet ikke kan nå.</p><p>Kalenderen er fuldt deterministisk. “Choice” er navnet på et algoritmetrin, ikke et lotteri under brug.</p><hr></section>

[omitted 348 match(es) in 91 file(s); see original output for full results]
```

</details>


---

<sub>1m 16s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/runtime.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/runtime.js (lines 30-65)

<details>
<summary>33 lines</summary>

```
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
```

</details>


---

<sub>1m 16s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/registry.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/registry.js (lines 196-212)

<details>
<summary>17 lines</summary>

```
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
```

</details>


---

<sub>1m 16s</sub>

### `rg`

**^<details data-locale="is"|Þessi vefur**

"^<details data-locale="is"|Þessi vefur" (docs/no-js/index.html)

```
docs/no-js/index.html:160:        <p>Þessi vefur krefst JavaScript. Virkjaðu JavaScript í vafranum þínum og endurhladdu síðan síðuna.</p>
```


---

<sub>1m 16s</sub>

### `rg`

**"calendarInput\.(solarHijri|hindu|maya)|"reverse\.(error\.input|basic\.sameHeading|status\.rangeRequired|variable\.domain\.range)|"calendarHelp\.**

""calendarInput\.(solarHijri|hindu|maya)|"reverse\.(error\.input|basic\.sameHeading|status\.rangeRequired|variable\.domain\.range)|"calendarHelp\." (docs/i18n/locales/is.js)

<details>
<summary>16 matches</summary>

```
docs/i18n/locales/is.js:86:    "calendarInput.solarHijriOfficial": "Sól-Hijri — opinbert",
docs/i18n/locales/is.js:87:    "calendarInput.solarHijriArithmetic": "Sól-Hijri — 2.820 ára reikniaðferð",
docs/i18n/locales/is.js:89:    "calendarInput.hinduOldSolar": "Fornt hindúdagatal — sólarform",
docs/i18n/locales/is.js:90:    "calendarInput.hinduOldLunar": "Fornt hindúdagatal — tunglform",
docs/i18n/locales/is.js:99:    "calendarInput.mayaLongCount": "Langtal Maya",
docs/i18n/locales/is.js:100:    "calendarHelp.hebrew": "Mánuðir eru valdir eftir nafni. Ár og dag má slá inn með tugatölustöfum eða hebreskum talnastöfum, til dæmis \u2067תשפ״ו\u2069 eða \u2067י״ד\u2069; ef ár er ritað með hebreskum talnastöfum án þúsundamerkis er 5.000 bætt við það.",
docs/i18n/locales/is.js:101:    "calendarHelp.intl": "Þessi umbreyting notar dagatalsstuðning sem er innbyggður í vafrann. Ef vafrinn getur ekki sýnt dagsetninguna segir vefurinn það skýrt.",
docs/i18n/locales/is.js:102:    "calendarHelp.chinese": "Sláðu inn gregoríska árið sem samsvarar kínverska árinu og merktu „Innskotsmánuður“ aðeins fyrir endurtekna mánuðinn.",
docs/i18n/locales/is.js:103:    "calendarHelp.hindu": "Sláðu inn ár og dag samkvæmt forna hindúatalinu og veldu mánuðinn eftir nafni. Í tunglforminu má einnig merkja innskotsmánuð.",
docs/i18n/locales/is.js:104:    "calendarHelp.japanese": "Ár 1 hefst á fyrsta degi tímabilsins; fyrir fyrsta árið má einnig slá inn 元 eða 元年. Dagsetningu fyrir upphaf eða eftir lok tímabilsins er hafnað.",
docs/i18n/locales/is.js:105:    "calendarHelp.bahai": "Veldu mánuð eftir nafni eða Ayyám-i-Há. Formið sem byggir á jafndægri í Teheran styður venjulegt gregorískt bil 1844–3000.",
docs/i18n/locales/is.js:106:    "calendarHelp.maya": "Sjálfgefna fylgnitalan er GMT 584.283. Þú getur breytt henni ef þú notar aðra fylgni.",
docs/i18n/locales/is.js:191:    "reverse.basic.sameHeading": "Endanlegt leitarsvið fyrir c = t",
docs/i18n/locales/is.js:215:    "reverse.status.rangeRequired": "Ekki er hægt að ljúka leitinni fyrr en endanlegt leitarsvið eða föst dagsetning hefur verið skilgreind.",
docs/i18n/locales/is.js:233:    "reverse.variable.domain.range": "Endanlegt dagsetningarsvið",
docs/i18n/locales/is.js:262:    "reverse.error.input": "Nokkra reiti öfugrar leitar vantar eða þeir eru ógildir.",
```

</details>


---

<sub>1m 16s</sub>

### `rg`

**^#|^##|^###|<!--|-->|"[^"]*[A-Za-zÁ-ú][^"]*"**

"^#|^##|^###|<!--|-->|"[^"]*[A-Za-zÁ-ú][^"]*"" (artifacts/cross-repo-native-qa/runtime/repo2-0/README.md, artifacts/cross-repo-native-qa/runtime/repo2-0/SOURCE_LANGUAGE_CATALOG.md, artifacts/cross-repo-native-qa/runtime/repo2-0/STAGE_01_OWNERSHIP_AUDIT.md, artifacts/cross-repo-native-qa/runtime/repo2-0/STAGE_01_NORMATIVE_AUDIT.md, artifacts/cross-repo-native-qa/runtime/repo2-0/DEVELOPMENT_STAGE.md, artifacts/cross-repo-native-qa/runtime/repo2-0/SPAGHETTI_DEVELOPMENT_HISTORY.md)

<details>
<summary>40 matches</summary>

```
[grep content: 34 matches across 5 file(s) under artifacts/cross-repo-native-qa/runtime/repo2-0]

SOURCE_LANGUAGE_CATALOG.md (4 match(es)):
  1: # SourceLanguageCatalog — íslenska
  5: ## Reglur
  11: ## Kótelettur
  31: ## Mánuðir

SPAGHETTI_DEVELOPMENT_HISTORY.md (7 match(es)):
  1: # Þróunarsaga spaghettískrímslisins
  3: ## Stage 1 — Bootstrap
  5: ### Hvað var byggt
  9: ### Hlutlaus skrímslagrunnur
  13: ### Eign á ástandi
  17: ### Leiðréttingar innan Bootstrap
  23: ### Prófunarstaða

README.md (5 match(es)):
  1: # Pastafari-dagatalið — Elm og íslenska
  5: ## Innihald Stage 1
  11: ## Tungumál og röðun
  19: ## Nákvæmni hliðavísitalna
  23: ## Keyrsla prófana

STAGE_01_NORMATIVE_AUDIT.md (9 match(es)):
  1: # Staðlað úttekt Stage 1
  3: ## Umfang
  7: ## Nákvæmir heiltölur
  15: ## Sósan
  21: ## Spurningar og val
  25: ## Hlið og ár
  29: ## Kótilettur og mánuðir
  35: ## Lokaniðurstaða og aðskilnaður
  41: ## Staða

STAGE_01_OWNERSHIP_AUDIT.md (9 match(es)):
  1: # Eignarhald merkingarástands — Stage 1
  3: ## Niðurstaða
  7: ## Framleiðslusamhengi
  13: ## Ræsing líkans
  17: ## Áhrif og gáttir
  21: ## Endurnýting myndaðra gagna
  29: ## Röð prófana og kalla
  35: ## Aðskilnaður viðmiðunarvélar og framleiðslukóða
  39: ## Keyrslustaða
```

</details>


---

<sub>1m 25s</sub>

### `rg`

**reverse\.progress\.scanned|reverse\.error\.limitSafeInteger|reverse\.error\.limitPositive|calendar\.cutletDescription|year\.daysValue|comparison\.summary**

"reverse\.progress\.scanned|reverse\.error\.limitSafeInteger|reverse\.error\.limitPositive|calendar\.cutletDescription|year\.daysValue|comparison\.summary" (docs)

<details>
<summary>80 matches</summary>

```
[grep content: 440 matches across 75 file(s) under docs]

reverse-ui.js (3 match(es)):
  70:   if (!/^\d+$/.test(text) || BigInt(text) < 1n) throw localizedUiError("reverse.error.limitPositive", { field: fieldName });
  73:   if (!Number.isSafeInteger(parsed)) throw localizedUiError("reverse.error.limitSafeInteger", { field: fieldName });
  960:     this.progress.textContent = `${this.rt(phaseKey)} · ${this.rt("reverse.progress.scanned", { count: this.services.formatInteger(value.scanned) })}`;

i18n/locales/sv.js (6 match(es)):
  19:     "reverse.error.limitSafeInteger": "{field} ligger utanför intervallet för säkra heltal.",
  20:     "reverse.error.limitPositive": "{field} måste vara positivt.",
  58:     "comparison.summary": "Visar {count} dagar, från den första till den sista dagen i kotletten som öppnades av den första beräkningen.",
  121:     "calendar.cutletDescription": "{count} dagar · arbetsdag: {actionDate}",
  132:     "year.daysValue": "{count} dagar",
  206:     "reverse.progress.scanned": "Slutförda arbetsenheter: {count}",

i18n/locales/sr.js (6 match(es)):
  19:     "reverse.error.limitSafeInteger": "{field} je van opsega bezbednih celih brojeva.",
  20:     "reverse.error.limitPositive": "{field} mora biti pozitivan.",
  58:     "comparison.summary": "Prikazuje se {count} dana — od prvog do poslednjeg dana kotleta otvorenog prvim izračunom.",
  121:     "calendar.cutletDescription": "{count} dana · dan radnje: {actionDate}",
  132:     "year.daysValue": "{count} dana",
  206:     "reverse.progress.scanned": "Završene radne jedinice: {count}",

i18n/locales/ar.js (6 match(es)):
  19:     "reverse.error.limitSafeInteger": "{field} خارج نطاق الأعداد الصحيحة الآمنة.",
  20:     "reverse.error.limitPositive": "يجب أن يكون {field} موجبًا.",
  58:     "comparison.summary": "يتم عرض {count} يومًا، من أول يوم إلى آخر يوم في القطعة التي فتحها الحساب الأول.",
  121:     "calendar.cutletDescription": "{count} يومًا · يوم العمل: {actionDate}",
  132:     "year.daysValue": "{count} يومًا",
  206:     "reverse.progress.scanned": "وحدات العمل المكتملة: {count}",

app.js (3 match(es)):
  359:   elements["cutlet-description"].textContent = t("calendar.cutletDescription", {
  462:   elements["year-length"].textContent = t("year.daysValue", { count: formatInteger(structure.length) });
  585:   elements["comparison-summary"].textContent = t("comparison.summary", {

i18n/locales/fy.js (6 match(es)):
  18:     "reverse.error.limitPositive": "{field} moat posityf wêze.",
  19:     "reverse.error.limitSafeInteger": "{field} falt bûten it feilige gehiele-getalberik.",
  58:     "comparison.summary": "Der wurde {count} dagen toand, fan de earste oant en mei de lêste dei fan de kotelet dy't troch de earste berekkening iepene is.",
  121:     "calendar.cutletDescription": "{count} dagen · hannelingsdei: {actionDate}",
  132:     "year.daysValue": "{count} dagen",
  206:     "reverse.progress.scanned": "Foltôge wurkienheden: {count}",

i18n/locales/tr.js (6 match(es)):
  19:     "reverse.error.limitSafeInteger": "{field} güvenli tam sayı aralığının dışında.",
  20:     "reverse.error.limitPositive": "{field} pozitif olmalıdır.",
  58:     "comparison.summary": "İlk hesaplamanın açtığı köftenin ilk gününden son gününe kadar {count} gün gösteriliyor.",
  121:     "calendar.cutletDescription": "{count} gün · işlem günü: {actionDate}",
  132:     "year.daysValue": "{count} gün",
  206:     "reverse.progress.scanned": "Tamamlanan iş birimi: {count}",

i18n/locales/te.js (6 match(es)):
  19:     "reverse.error.limitSafeInteger": "{field} సురక్షిత పూర్ణసంఖ్యల పరిధికి బయట ఉంది.",
  20:     "reverse.error.limitPositive": "{field} ధనాత్మకంగా ఉండాలి.",
  58:     "comparison.summary": "మొదటి లెక్కింపు తెరిచిన కట్లెట్ మొదటి రోజు నుంచి చివరి రోజు వరకు {count} రోజులు చూపబడుతున్నాయి.",
  121:     "calendar.cutletDescription": "{count} రోజులు · చర్య దినం: {actionDate}",
  132:     "year.daysValue": "{count} రోజులు",
  206:     "reverse.progress.scanned": "పూర్తయిన పని యూనిట్లు: {count}",

i18n/locales/sk.js (6 match(es)):
  19:     "reverse.error.limitSafeInteger": "{field} je mimo rozsahu bezpečných celých čísel.",
  20:     "reverse.error.limitPositive": "{field} musí byť kladné.",
  58:     "comparison.summary": "Zobrazuje sa {count} dní od prvého po posledný deň rezňa otvoreného prvým výpočtom.",
  121:     "calendar.cutletDescription": "{count} dní · deň činnosti: {actionDate}",
  132:     "year.daysValue": "{count} dní",
  206:     "reverse.progress.scanned": "Dokončené pracovné jednotky: {count}",

i18n/locales/lt.js (6 match(es)):
  19:     "reverse.error.limitSafeInteger": "{field} nepatenka į saugių sveikųjų skaičių intervalą.",
  20:     "reverse.error.limitPositive": "{field} turi būti teigiamas.",
  58:     "comparison.summary": "Rodoma {count} dienų — nuo pirmos iki paskutinės kotleto dienos, atverto pirmuoju skaičiavimu.",
  121:     "calendar.cutletDescription": "{count} dienų · veikimo diena: {actionDate}",
  132:     "year.daysValue": "{count} dienų",
  206:     "reverse.progress.scanned": "Atlikta darbo vienetų: {count}",

i18n/locales/nn.js (6 match(es)):
  19:     "reverse.error.limitSafeInteger": "{field} ligg utanfor området for trygge heiltal.",
  20:     "reverse.error.limitPositive": "{field} må vere positiv.",
  58:     "comparison.summary": "Viser {count} dagar, frå den første til den siste dagen i koteletten som vart opna av den første utrekninga.",
  121:     "calendar.cutletDescription": "{count} dagar · handlingsdag: {actionDate}",
  132:     "year.daysValue": "{count} dagar",
  206:     "reverse.progress.scanned": "Fullførte arbeidseiningar: {count}",

i18n/locales/ja.js (6 match(es)):
  19:     "reverse.error.limitSafeInteger": "{field} が安全な整数範囲を超えています。",
  20:     "reverse.error.limitPositive": "{field} は正の値でなければなりません。",
  58:     "comparison.summary": "{count}日を表示 — 最初の計算で開いたカツレツの初日から最終日まで。",
  121:     "calendar.cutletDescription": "{count}日 · 作業日：{actionDate}",
  132:     "year.daysValue": "{count}日",
  206:     "reverse.progress.scanned": "完了した作業単位: {count}",

[omitted 374 match(es) in 63 file(s); see original output for full results]
```

</details>


---

<sub>1m 29s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/reverse-ui.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/reverse-ui.js (lines 50-85)

<details>
<summary>31 lines</summary>

```

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
```

</details>


---

<sub>1m 29s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/reverse-ui.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/reverse-ui.js (lines 930-970)

<details>
<summary>38 lines</summary>

```
      });
    } catch (error) {
      this.showInputError(error);
    }
  }

  async run(problem, options, context) {
    this.output.hidden = false;
    this.error.hidden = true;
    this.visibleErrorMessage = null;
    this.solutions.replaceChildren();
    this.status.textContent = this.rt("reverse.status.running");
    this.progress.textContent = "";
    this.setRunning(true);
    try {
      const { result } = await this.controller.solve(problem, {
        ...options,
        onProgress: (value) => this.renderProgress(value),
      });
      this.lastRun = { problem, result, context };
      this.renderResult(result, context);
    } catch (error) {
      this.handleSearchError(error);
    } finally {
      this.setRunning(false);
    }
  }

  renderProgress(value) {
    const phaseKey = value.phase === "verify" ? "reverse.progress.verify" : value.phase === "done" ? "reverse.progress.done" : "reverse.progress.reverse";
    this.progress.textContent = `${this.rt(phaseKey)} · ${this.rt("reverse.progress.scanned", { count: this.services.formatInteger(value.scanned) })}`;
  }

  renderResult(result, context) {
    const classification = classifyConstraintResult(result);
    const key = classification.state === "complete-empty"
      ? "reverse.status.completeEmpty"
      : classification.state === "complete-solutions"
        ? "reverse.status.completeSolutions"
        : classification.state === "partial-empty"
          ? "reverse.status.partialEmpty"
```

</details>


---

<sub>1m 29s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js (lines 252-269)

<details>
<summary>17 lines</summary>

```
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
```

</details>


---

<sub>1m 29s</sub>

### `rg`

**limitPositive|limitSafeInteger|readLimit|fieldName|parseLimit**

"limitPositive|limitSafeInteger|readLimit|fieldName|parseLimit" (docs/reverse-ui.js)

<details>
<summary>6 matches</summary>

```
docs/reverse-ui.js:67:function positiveLimit(value, fieldName, { number = false } = {}) {
docs/reverse-ui.js:70:  if (!/^\d+$/.test(text) || BigInt(text) < 1n) throw localizedUiError("reverse.error.limitPositive", { field: fieldName });
docs/reverse-ui.js:73:  if (!Number.isSafeInteger(parsed)) throw localizedUiError("reverse.error.limitSafeInteger", { field: fieldName });
docs/reverse-ui.js:821:  parseLimits(limits) {
docs/reverse-ui.js:859:      await this.run(problem, this.parseLimits(this.basicLimits), {
docs/reverse-ui.js:926:      await this.run(problem, this.parseLimits(this.advancedLimits), {
```

</details>


---

<sub>1m 29s</sub>

### `rg`

**reverse\.options\.(maxSolutions|maxScanned|timeout)|name="maxSolutions"|name="maxScanned"|name="timeout"**

"reverse\.options\.(maxSolutions|maxScanned|timeout)|name="maxSolutions"|name="maxScanned"|name="timeout"" (docs)

<details>
<summary>55 matches</summary>

```
[grep content: 224 matches across 73 file(s) under docs]

reverse-ui.js (8 match(es)):
  770:       const input = key === "reverse.options.maxScanned"
  773:       if (key !== "reverse.options.maxScanned") {
  785:       maxSolutions: make("reverse.options.maxSolutions"),
  786:       maxScanned: make("reverse.options.maxScanned"),
  787:       timeoutMs: make("reverse.options.timeout"),
  823:     const maxSolutions = positiveLimit(limits.maxSolutions.value, this.rt("reverse.options.maxSolutions"), { number: true });
  824:     const maxScanned = positiveLimit(limits.maxScanned.value, this.rt("reverse.options.maxScanned"));
  825:     const timeoutMs = positiveLimit(limits.timeoutMs.value, this.rt("reverse.options.timeout"), { number: true });

i18n/locales/ur.js (3 match(es)):
  257:     "reverse.options.maxSolutions": "اتنے توثیق شدہ حلوں کے بعد رکیں",
  258:     "reverse.options.maxScanned": "اتنی کام کی اکائیوں کے بعد رکیں",
  259:     "reverse.options.timeout": "ملی سیکنڈ میں وقت کی حد",

i18n/locales/uk.js (3 match(es)):
  257:     "reverse.options.maxSolutions": "Зупинитися після цієї кількості перевірених розв'язків",
  258:     "reverse.options.maxScanned": "Зупинитися після цієї кількості одиниць роботи",
  259:     "reverse.options.timeout": "Обмеження часу в мілісекундах",

i18n/locales/sv.js (3 match(es)):
  257:     "reverse.options.maxSolutions": "Stoppa efter detta antal verifierade lösningar",
  258:     "reverse.options.maxScanned": "Stoppa efter detta antal arbetsenheter",
  259:     "reverse.options.timeout": "Tidsgräns i millisekunder",

i18n/locales/mk.js (3 match(es)):
  257:     "reverse.options.maxSolutions": "Запри по овој број проверени решенија",
  258:     "reverse.options.maxScanned": "Запри по овој број работни единици",
  259:     "reverse.options.timeout": "Временско ограничување во милисекунди",

i18n/locales/nl.js (3 match(es)):
  257:     "reverse.options.maxSolutions": "Stop na dit aantal geverifieerde oplossingen",
  258:     "reverse.options.maxScanned": "Stop na dit aantal werkeenheden",
  259:     "reverse.options.timeout": "Tijdslimiet in milliseconden",

i18n/locales/lb.js (3 match(es)):
  257:     "reverse.options.maxSolutions": "No esou vill iwwerpréifte Léisunge stoppen",
  258:     "reverse.options.maxScanned": "No esou vill Aarbechtseenheete stoppen",
  259:     "reverse.options.timeout": "Zäitlimit a Millisekonnen",

i18n/locales/sr.js (3 match(es)):
  257:     "reverse.options.maxSolutions": "Zaustavi nakon ovog broja proverenih rešenja",
  258:     "reverse.options.maxScanned": "Zaustavi nakon ovog broja radnih jedinica",
  259:     "reverse.options.timeout": "Vremensko ograničenje u milisekundama",

i18n/locales/da.js (3 match(es)):
  257:     "reverse.options.maxSolutions": "Stop efter dette antal verificerede løsninger",
  258:     "reverse.options.maxScanned": "Stop efter dette antal arbejdsenheder",
  259:     "reverse.options.timeout": "Tidsgrænse i millisekunder",

i18n/locales/ca.js (3 match(es)):
  257:     "reverse.options.maxSolutions": "Atura després d'aquest nombre de solucions verificades",
  258:     "reverse.options.maxScanned": "Atura després d'aquest nombre d'unitats de treball",
  259:     "reverse.options.timeout": "Límit de temps en mil·lisegons",

i18n/locales/id.js (3 match(es)):
  257:     "reverse.options.maxSolutions": "Berhenti setelah sejumlah solusi terverifikasi ini",
  258:     "reverse.options.maxScanned": "Berhenti setelah sejumlah unit kerja ini",
  259:     "reverse.options.timeout": "Batas waktu dalam milidetik",

i18n/locales/ar.js (3 match(es)):
  257:     "reverse.options.maxSolutions": "التوقف بعد هذا العدد من الحلول المتحقق منها",
  258:     "reverse.options.maxScanned": "التوقف بعد هذا العدد من وحدات العمل",
  259:     "reverse.options.timeout": "حد الوقت بالميلي ثانية",

[omitted 183 match(es) in 61 file(s); see original output for full results]
```

</details>


---

<sub>1m 53s</sub>

### `rg`

**documentElement\.lang|\.lang = locale\.code|noscript|aria-label**

"documentElement\.lang|\.lang = locale\.code|noscript|aria-label" (docs/i18n/runtime.js, docs/index.html, docs/about/index.html)

<details>
<summary>27 matches</summary>

```
[grep content: 23 matches across 3 file(s) under docs]

about/index.html (6 match(es)):
  6:     <noscript><meta http-equiv="refresh" content="0; url=../no-js/"></noscript>
  41:         <nav data-i18n-attr="aria-label:about.toc">
  50:         <section class="about-site-usage" id="site-usage" aria-labelledby="guide-heading" data-toc-section data-toc-level="2">
  76:     <noscript>
  80:       <div class="noscript" lang="zxx" dir="ltr">
  83:     </noscript>

index.html (15 match(es)):
  6:     <noscript><meta http-equiv="refresh" content="0; url=./no-js/"></noscript>
  37:       <section class="search-panel" id="search-panel" aria-labelledby="search-heading">
  95:       <section class="reverse-panel" id="reverse-panel" aria-labelledby="reverse-heading">
  99:       <section class="status-panel" id="loading-panel" aria-labelledby="loading-heading" aria-live="polite" aria-busy="true">
  107:       <section class="status-panel error-panel" id="error-panel" aria-labelledby="error-heading" role="alert" hidden>
  114:       <section class="calendar-workspace" id="calendar-workspace" aria-labelledby="cutlet-heading" hidden>
  127:           <div class="toolbar-actions" role="group" data-i18n-attr="aria-label:calendar.toolbarAria">
  137:         <section class="year-overview" id="year-overview" aria-labelledby="year-overview-heading">
  158:                 <ol class="structure-list" id="year-cutlet-list" tabindex="0" aria-labelledby="year-cutlets-summary"></ol>
  162:                 <ol class="structure-list month-structure-list" id="year-month-list" tabindex="0" aria-labelledby="year-months-summary"></ol>
  169:       <section class="comparison-workspace" id="comparison-workspace" aria-labelledby="comparison-heading" hidden>
  176:         <div class="comparison-scroll" role="region" tabindex="0" data-i18n-attr="aria-label:comparison.scrollAria">
  198:     <noscript>
  202:       <div class="noscript" lang="zxx" dir="ltr">
  205:     </noscript>

i18n/runtime.js (2 match(es)):
  45:     option.lang = locale.code;
  56:   documentElement.lang = locale.code;
```

</details>


---

<sub>1m 53s</sub>

### `rg`

**textContent\s*=|\.title\s*=|setAttribute\("aria|ariaLabel|labelKey|\.placeholder\s*=**

"textContent\s*=|\.title\s*=|setAttribute\("aria|ariaLabel|labelKey|\.placeholder\s*=" (docs/app.js, docs/reverse-ui.js, docs/reverse-search-controller.js, docs/calendar-input-conventions.js)

<details>
<summary>88 matches</summary>

```
[grep content: 85 matches across 2 file(s) under docs]

reverse-ui.js (43 match(es)):
  29:   if (text !== null) element.textContent = text;
  36:   element.textContent = text;
  83:   constructor(host, services, { initialJdn = null, labelKey = "reverse.calendar.label" } = {}) {
  86:     this.labelKey = labelKey;
  109:       option(definition.id, this.services.siteT(definition.labelKey))
  127:       const text = node("span", "", this.services.siteT(field.labelKey));
  133:           input.append(option(choice.value, choice.labelKey ? this.services.siteT(choice.labelKey) : choice.label));
  159:     this.help.textContent = definition.helpKey ? this.services.siteT(definition.helpKey) : "";
  173:       this.error.textContent = this.services.rt("reverse.error.input");
  182:     this.calendarLabelText.textContent = this.services.rt(this.labelKey);
  253:       element.textContent = this.services.rt(element.dataset.reverseKey);
  335:     this.labelText.textContent = this.services.rt("reverse.variable.label");
  336:     this.domainText.textContent = this.services.rt("reverse.variable.domain");
  337:     this.removeButton.textContent = this.services.rt("reverse.action.remove");
  355:     this.title = node("strong", "reverse-card-title", id);
  389:   field(labelKey, control) {
  391:     const text = node("span", "", this.services.rt(labelKey));
  392:     text.dataset.reverseKey = labelKey;
  533:     this.removeButton.textContent = this.services.rt("reverse.action.remove");
  534:     this.typeText.textContent = this.services.rt("reverse.constraint.type");
  536:       element.textContent = this.services.rt(element.dataset.reverseKey);
  802:     this.status.setAttribute("aria-live", "polite");
  803:     this.status.setAttribute("aria-atomic", "true");
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

app.js (42 match(es)):
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
  694:   elements["error-message"].textContent = t(key);
  703:     option.textContent = t(definition.labelKey);
  733:     labelText.textContent = t(field.labelKey);
  745:         option.textContent = choice.labelKey ? t(choice.labelKey) : choice.label;
  773:   configuration.help.textContent = definition.helpKey ? t(definition.helpKey) : "";
  799:   configuration.error.textContent = t(configuration.errorKey);
  899:     elements["error-message"].textContent = t(lastVisibleErrorKey);
```

</details>


---

<sub>1m 53s</sub>

### `rg`

**data-i18n|data-i18n-attr|aria-label|placeholder**

"data-i18n|data-i18n-attr|aria-label|placeholder" (docs/index.html, docs/about/index.html)

```
[grep content: 86 matches across 2 file(s) under docs]

about/index.html (29 match(es)):
  8:     <meta name="description" content="An explanation of the Pastafari Calendar." data-i18n-attr="content:about.metaDescription">
  11:     <title data-i18n="about.title">About the Pastafari Calendar</title>
  19:     <a class="skip-link" href="#article-content" data-i18n="about.skip">Skip to the calendar explanation</a>
  23:           <p class="eyebrow" data-i18n="app.brand">PASTAFARI</p>
  24:           <h1 data-i18n="about.title">About the Pastafari Calendar</h1>
  25:           <p class="intro" data-i18n="about.intro">How the calendar represents days, years, cutlets, woven months, and the day of working.</p>
  26:           <a class="guide-link" href="../" data-back-to-calendar data-i18n="about.back">Back to the calendar</a>
  29:           <label for="language-selector" data-i18n="language.label">Language</label>
  34:       <p class="about-language-notice" id="about-language-notice" hidden data-i18n="about.fallbackNotice">The explanation is unavailable in the selected language right now, so the default version is shown.</p>
  38:           <span class="eyebrow" data-i18n="about.tocKicker">On this page</span>
  39:           <span class="about-toc-title" data-i18n="about.toc">Contents</span>
  41:         <nav data-i18n-attr="aria-label:about.toc">
  48:         <p class="about-load-error" id="about-load-error" role="alert" hidden data-i18n="about.loadError">The calendar explanation could not be loaded.</p>
  50:         <section class="about-site-usage" id="site-usage" aria-labelledby="guide-heading" data-toc-section data-toc-level="2">
  51:           <p class="eyebrow" data-i18n="guide.eyebrow">User guide</p>
  52:           <h2 id="guide-heading" data-i18n="guide.heading">What can you do here, and how?</h2>
  53:           <p class="guide-intro" data-i18n="guide.intro">Search, read, browse, change the day of working, and compare calculations.</p>
  55:             <summary data-i18n="guide.open">How do I use this site?</summary>
  57:               <article><span class="guide-number">01</span><h3 data-i18n="guide.1.heading">Open the site and get today</h3><p data-i18n="guide.1.body">The site immediately determines the current Pastafari day for the active observer location.</p></article>
  58:               <article><span class="guide-number">02</span><h3 data-i18n="guide.2.heading">Search in any available calendar</h3><p data-i18n="guide.2.body">Choose a calendar, fill its fields, and show the date.</p></article>
  59:               <article><span class="guide-number">03</span><h3 data-i18n="guide.3.heading">Read the date</h3><p data-i18n="guide.3.body">Each tile shows the year, cutlet, and month in three lines.</p></article>
  60:               <article><span class="guide-number">04</span><h3 data-i18n="guide.4.heading">Browse without selecting by accident</h3><p data-i18n="guide.4.body">Use the cutlet navigation buttons.</p></article>
  61:               <article><span class="guide-number">05</span><h3 data-i18n="guide.5.heading">Change the day of working</h3><p data-i18n="guide.5.body">Open the calculation options to change it.</p></article>
  62:               <article><span class="guide-number">06</span><h3 data-i18n="guide.6.heading">Compare the same days twice</h3><p data-i18n="guide.6.body">On desktop, align each target day under two calculations.</p></article>
  63:               <article><span class="guide-number">07</span><h3 data-i18n="guide.7.heading">Explore the whole year</h3><p data-i18n="guide.7.body">Below the cutlet, inspect the year's length, cutlets, and woven months.</p></article>
  65:             <p class="guide-note" data-i18n="guide.note">Grid rows are visual only; comparison-table rows deliberately align the same day.</p>
  67:           <a class="back-to-calendar" href="../" data-back-to-calendar data-i18n="guide.back">Back to search and calendar</a>
  72:         <p data-i18n="footer.local">Calculation happens on your device; this site has no user account and no tracking code.</p>
  73:         <p data-i18n="footer.open">The link is public and loads directly, including in a private-browsing window.</p>

index.html (57 match(es)):
  8:     <meta name="description" content="A local, deterministic Pastafari calendar." data-i18n-attr="content:meta.description">
  11:     <title data-i18n="app.title">Pastafari Calendar</title>
  19:     <a class="skip-link" href="#search-heading" data-i18n="nav.skip">Skip to date search</a>
  23:           <p class="eyebrow" data-i18n="app.brand">PASTAFARI</p>
  24:           <h1 data-i18n="app.title">Pastafari Calendar</h1>
  25:           <p class="intro" data-i18n="app.intro">Find a day in any available calendar, then see its complete Pastafari date.</p>
  26:           <a class="guide-link" href="./about/" data-about-link data-i18n="about.open">About the calendar</a>
  29:           <label for="language-selector" data-i18n="language.label">Language</label>
  34:       <a class="floating-guide-link" href="./about/" data-about-link data-i18n="about.openShort">About the calendar</a>
  37:       <section class="search-panel" id="search-panel" aria-labelledby="search-heading">
  39:           <p class="status-kicker" data-i18n="search.kicker">Date search</p>
  40:           <h2 id="search-heading" tabindex="-1" data-i18n="search.heading">Which day would you like to find?</h2>
  41:           <p data-i18n="search.intro">Choose a calendar, enter a date, and select “Show date.”</p>
  45:             <span data-i18n="search.calendarLabel">Calendar used for input</span>
  51:           <button class="search-submit" type="submit" data-i18n="search.submit">Show date</button>
  55:           <summary data-i18n="settings.summary">Calculation and comparison options</summary>
  58:               <h3 data-i18n="settings.heading">Change the day of working</h3>
  59:               <p data-i18n="settings.intro">The day of working is the calculation's point of departure.</p>
  63:                 <span data-i18n="settings.actionCalendarLabel">Calendar used to enter the day of working</span>
  70:                 <button class="search-submit" type="submit" data-i18n="settings.apply">Apply day of working</button>
  71:                 <button class="secondary-action" type="button" id="reset-action-day" data-i18n="settings.reset">Reset to current Pastafari day</button>
  78:                 <span><strong data-i18n="comparison.toggle">Compare two calculations side by side</strong><small data-i18n="comparison.toggleHelp">Available on desktop.</small></span>
  82:                   <span data-i18n="comparison.secondActionLabel">Calendar used to enter the second day of working</span>
  88:                 <button class="search-submit" type="submit" data-i18n="comparison.apply">Update comparison</button>
  95:       <section class="reverse-panel" id="reverse-panel" aria-labelledby="reverse-heading">
  99:       <section class="status-panel" id="loading-panel" aria-labelledby="loading-heading" aria-live="polite" aria-busy="true">
  102:           <p class="status-kicker" data-i18n="loading.kicker">Calculated locally</p>
  103:           <h2 id="loading-heading" data-i18n="loading.title">Finding the cutlet and date…</h2>
  107:       <section class="status-panel error-panel" id="error-panel" aria-labelledby="error-heading" role="alert" hidden>
  108:         <p class="status-kicker" data-i18n="error.kicker">Unable to display the calendar</p>
  109:         <h2 id="error-heading" data-i18n="error.title">The calculation engine did not load</h2>
  111:         <button type="button" id="reload-button" data-i18n="error.reload">Reload</button>
  114:       <section class="calendar-workspace" id="calendar-workspace" aria-labelledby="cutlet-heading" hidden>
  127:           <div class="toolbar-actions" role="group" data-i18n-attr="aria-label:calendar.toolbarAria">
  128:             <button type="button" id="previous-cutlet" data-i18n="calendar.previous">Previous cutlet</button>
  129:             <button type="button" class="primary-action" id="today-button" data-i18n="calendar.today">Back to today</button>
  130:             <button type="button" id="next-cutlet" data-i18n="calendar.next">Next cutlet</button>
  134:         <p class="browse-note" id="browse-note" hidden data-i18n="calendar.targetOutside">The searched date is not in the cutlet currently on screen.</p>
  137:         <section class="year-overview" id="year-overview" aria-labelledby="year-overview-heading">
  139:             <p class="status-kicker" data-i18n="year.kicker">Year at a glance</p>
  143:           <p class="year-overview-loading" id="year-overview-loading" data-i18n="year.loading">Building the full year structure…</p>
  147:               <div><dt data-i18n="year.lengthLabel">Year length</dt><dd id="year-length"></dd></div>
  148:               <div><dt data-i18n="year.cutletCountLabel">Cutlets</dt><dd id="year-cutlet-count"></dd></div>
  149:               <div><dt data-i18n="year.monthCountLabel">Months</dt><dd id="year-month-count"></dd></div>
  150:               <div><dt data-i18n="year.rangeLabel">Gregorian span</dt><dd id="year-range"></dd></div>
  154:             <p class="year-explainer" data-i18n="year.monthExplainer">Months are woven independently of cutlets, so a month can appear in many separate runs during the year.</p>
  158:                 <ol class="structure-list" id="year-cutlet-list" tabindex="0" aria-labelledby="year-cutlets-summary"></ol>
  162:                 <ol class="structure-list month-structure-list" id="year-month-list" tabindex="0" aria-labelledby="year-months-summary"></ol>
  169:       <section class="comparison-workspace" id="comparison-workspace" aria-labelledby="comparison-heading" hidden>
  171:           <p class="status-kicker" data-i18n="comparison.kicker">Comparison aligned by day</p>
  172:           <h2 id="comparison-heading" data-i18n="comparison.heading">The same days, two days of working</h2>
  173:           <p data-i18n="comparison.intro">Every row contains the same queried day.</p>
  176:         <div class="comparison-scroll" role="region" tabindex="0" data-i18n-attr="aria-label:comparison.scrollAria">
  180:                 <th scope="col" data-i18n="comparison.sameDay">Day shared by both calculations</th>
  188:         <p class="mobile-comparison-note" data-i18n="comparison.desktopOnly">The full comparison table is available on a wide desktop screen.</p>
  194:         <p data-i18n="footer.local">Calculation happens on your device; there is no user account or tracking code.</p>
  195:         <p data-i18n="footer.open">The link is public and loads directly, including in private browsing.</p>
```


---

<sub>1m 53s</sub>

### `rg`

**canonicalIndex|placeholder|placeholder|fallback|stale|Intl|displayName|"[^"]+"**

"canonicalIndex|placeholder|placeholder|fallback|stale|Intl|displayName|"[^"]+"" (docs/i18n/locales/is.js)

<details>
<summary>27 matches</summary>

```
[grep content: 300 matches across 1 file(s) under docs/i18n/locales]

is.js (300 match(es)):
  1: "use strict";
  4:   "code": "is",
  5:   "displayName": "Íslenska",
  6:   "dir": "ltr",
  7:   "intlLocale": "is-IS",
  8:   "messages": {
  9:     "meta.description": "Pastafari-dagatal með dagsetningarleit og samanburði.",
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Pastafari-dagatal sem reiknar á tækinu og skilar sömu niðurstöðu fyrir sama inntak.",
  12:     "app.title": "Pastafari-dagatal",
  13:     "nav.skip": "Fara í dagsetningarleit",
  14:     "app.intro": "Finndu dagsetningu í einu dagatalanna sem vefurinn styður. Þá sérðu fulla Pastafari-dagsetningu þess dags og kótelettuna sem hann tilheyrir.",
  ... 276 more match(es) omitted in this file
  294:       "eridu": "Eridu",
  295:       "toothpaste": "Tannkrem",
  296:       "threePartsOfFive": "Þrír hlutar af fimm",
  297:       "karshumav": "Karsjúmav",
  298:       "leopard": "Hlébarði",
  299:       "tin": "Tin",
  300:       "mist": "Þoka",
  301:       "frankincense": "Reykelsi",
  302:       "spindle": "Snælda",
  303:       "rib": "Rifbein",
  304:       "carob": "Karób",
  305:       "uruk": "Uruk",
```

</details>


---

<sub>2m 0s</sub>

### `rg`

**Kótilett|kótilett|kótelett**

"Kótilett|kótilett|kótelett" (artifacts/cross-repo-native-qa/runtime/repo2-0, docs/i18n/locales/is.js, docs/about/content/is.html)

<details>
<summary>65 matches</summary>

```
[grep content: 59 matches across 7 file(s)]

docs/about/content/is.html (25 match(es)):
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
artifacts/cross-repo-native-qa/runtime/repo2-0/README.md:7: `Pastafari.ExactInt` veitir nákvæman heiltölureikning með ótakmarkaðri stærð, skrifaðan í Elm. `NormativeOracle` er prófunar-eingöngu bein útfærsla á innbyggða staðlaða viðmiðinu. `Pastafari.SourceLanguageCatalog` frystir 17 kótelettunöfn og 47 mánaðarnöfn með föstum `canonicalIndex`. `Pastafari.MonsterBase` er aðeins hlutlaus grunnur fyrir samhengi, stýringu, staðfestingu og mælingar. `Pastafari.Spaghetti` inniheldur enn enga eldri villuleið og enga leiðréttingarrökfræði úr síðari stigum.
artifacts/cross-repo-native-qa/runtime/repo2-0/SPAGHETTI_DEVELOPMENT_HISTORY.md:7: Verkefnið var stofnað frá auðu tré fyrir Elm og íslensku. Sjálfstæður nákvæmur heiltölukjarni var skrifaður í Elm, staðlaða viðmiðunarvélin var endurgerð beint úr innbyggða viðmiðinu og sérstök hrein Elm-prófunarumgjörð var búin til. `SourceLanguageCatalog` var frystur með 17 kótelettum og 47 mánuðum.

artifacts/cross-repo-native-qa/runtime/repo2-0/STAGE_01_NORMATIVE_AUDIT.md (4 match(es)):
  29: ## Kótilettur og mánuðir
  31: Fjöldi kóteletta er takmarkaður við 6..17 og ekki meiri en fjöldi hliðabila ársins. Skipting kóteletta er nákvæm lexíkógrafísk talning/opnun; ef aðgerðardagurinn er innra hlið verður það millimark skiptingarinnar. Nöfn eru valin sem hlutumraðanir án endurtekningar og innri merkingin er `canonicalIndex`.
  37: `calendarDateCanonical` skilar nákvæmlega fimm merkingarsviðum. `calendarDate` leysir aðeins kótelettu- og mánaðarvísitölur yfir í fryst íslensk heiti. Ekkert í `src/` flytur inn `NormativeOracle`, þannig að framleiðsluskelin getur ekki notað viðmiðunarvélina sem varaleið eða leiðréttingu.
  39: Við úttektina fannst Elm-sértæk þýðingarvilla í eldri drögum: fjögurra og fimm staka tuple-gildi höfðu verið notuð í stuðlatöflum og í innra vali kótelettuskiptingar. Elm leyfir ekki slík tuple. Þau voru skipt út fyrir nafngreind record-gildi án merkingarbreytingar. Engin fjögurra eða fleiri staka tuple er eftir í Elm-kóðanum.

artifacts/cross-repo-native-qa/runtime/repo2-0/tests/Stage01Checks.elm (2 match(es)):
  340:         "Sautján kótelettunöfn hafa nákvæma canonicalIndex-röð"
  350:         "Fryst kótelettuskrá hefur nákvæm íslensk heiti"

artifacts/cross-repo-native-qa/runtime/repo2-0/tests/NormativeOracle.elm (4 match(es)):
  1773:                 Debug.todo "Röð kótelettuskiptingar fór út fyrir löglegu fjölskylduna."
  1859:         |> expectMaybe "Kótilettufjöldi hafði engan gildan frambjóðanda."
  2068:         |> expectMaybe "Markdagurinn fannst ekki í neinni kótelettu."
  2125:             |> expectMaybe "Kótilettuvísitala vantar í frysta íslenska katalóginn."
```

</details>


---

<sub>2m 0s</sub>

### `rg`

**<a href="(\./|\.\./)no-js/"|<a href="\.\/no-js\/"|lang="zxx"**

"<a href="(\./|\.\./)no-js/"|<a href="\.\/no-js\/"|lang="zxx"" (docs/index.html, docs/about/index.html)

```
docs/about/index.html:80:      <div class="noscript" lang="zxx" dir="ltr">
docs/about/index.html:81:        <p><strong>JavaScript</strong> <span>⚠</span> <a href="../no-js/" lang="zxx" dir="ltr">🌐</a></p>
docs/index.html:202:      <div class="noscript" lang="zxx" dir="ltr">
docs/index.html:203:        <p><strong>JavaScript</strong> <span>⚠</span> <a href="./no-js/" lang="zxx" dir="ltr">🌐</a></p>
```


---

<sub>2m 0s</sub>

### `rg`

**\{count\} (dagar|vinnueiningar|lausnir|kótelettur|mánuðir)|\{number\}|\{field\}|\{date\}**

"\{count\} (dagar|vinnueiningar|lausnir|kótelettur|mánuðir)|\{number\}|\{field\}|\{date\}" (docs/i18n/locales/is.js)

<details>
<summary>8 matches</summary>

```
docs/i18n/locales/is.js:18:    "reverse.error.limitSafeInteger": "Gildi reitsins „{field}“ er utan öruggs heiltölusviðs.",
docs/i18n/locales/is.js:19:    "reverse.error.limitPositive": "Gildi reitsins „{field}“ verður að vera jákvætt.",
docs/i18n/locales/is.js:57:    "comparison.actionHeading": "Aðgerðardagur: {date}",
docs/i18n/locales/is.js:58:    "comparison.summary": "Sýndir eru {count} dagar, frá fyrsta til síðasta dags kótelettunnar sem birtist í fyrri útreikningnum.",
docs/i18n/locales/is.js:121:    "calendar.cutletDescription": "{count} dagar · aðgerðardagur: {actionDate}",
docs/i18n/locales/is.js:132:    "year.daysValue": "{count} dagar",
docs/i18n/locales/is.js:139:    "year.numberedName": "{number}. {name}",
docs/i18n/locales/is.js:189:    "reverse.basic.activeValue": "Virkur aðgerðardagur: {date}",
```

</details>


---

<sub>2m 25s</sub>

### Copilot

NATIVE_QA_RESULT: FAIL

**Heildarniðurstaða: FAIL.** Fann þrjá alvarleikastigið `low`: beygingarvanda í lifandi stöðutexta, ósamræmi í stafsetningu hugtaks og óskýrt aðgengilegt heiti á tengli í `noscript`-birtingu.

### Niðurstöður

1. **Alvarleiki: low — `Sargon17-Green/pastafari-calendar`, vefviðmót, `docs/i18n/locales/is.js:206`.** Núverandi texti: „Unnar vinnueiningar: {count}“. Þegar `{count}` er 1 stendur fleirtalan „vinnueiningar“ með eintölutölu. Legg til orðalag sem krefst ekki töluforms, t.d. „Fjöldi unninna vinnueininga: {count}“.

2. **Alvarleiki: low — `Sargon17-Green/Pastafarian-Calendar`, `STAGE_01_NORMATIVE_AUDIT.md:29` og `tests/NormativeOracle.elm:1859, 2125`.** Núverandi textabrot eru „Kótilettur og mánuðir“, „Kótilettufjöldi“ og „Kótilettuvísitala“, en annars staðar í sömu útfærslu er hugtakið ritað „kóteletta“. Samræma ætti þessi þrjú tilvik við þá stafsetningu: „Kótelettur“, „Kótelettufjöldi“ og „Kótelettuvísitala“.

3. **Alvarleiki: low — `Sargon17-Green/pastafari-calendar`, `docs/index.html:203` og `docs/about/index.html:81`.** Tengillinn í `noscript`-textanum hefur aðeins táknið „🌐“ sem sýnilegan texta og ekkert skýrt aðgengilegt heiti. Það segir ekki notendum skjálesara að tengillinn opni tungumálalistann. Bæta ætti við lýsandi heiti, svo sem „Opna tungumálalista“, á tungumáli sem passar við fallback-birtinguna.

### Texti á röngu tungumáli og fallback

Enginn almennur enskuleki eða sýnilegur texti úr öðru tungumáli fannst í íslensku viðmóti eða íslensku greininni. „Short Choice“ og „Wide Choice“ eru notuð sem heiti á reikniritsþrepum og eru varðveitt með sama hætti í öðrum staðfærslum; ég tel þau því ekki óvart enskuleka. Í no-JavaScript-síðunni er íslenska færslan merkt `is-IS` og textinn er íslenskur. Aðrar tungumálafærslur eru í samanbrotnum `<details>`-svæðum eins og til er ætlast. Greinin getur aðeins fallið aftur á hebresku ef valin grein hleðst ekki; íslenskur tilkynningartexti upplýsir um það.

### Samræmi í hugtakanotkun

„Aðgerðardagur“, „fyrirspurnardagur“, „kóteletta“ og „mánuður“ eru notuð með merkingarlegu samræmi milli vefsins og útfærslugreinanna. Stafsetningarfrávikin „Kótilett-“ sem talin eru upp í niðurstöðu 2 eru eina efnislega ósamræmið sem ég fann. Mismunandi þýðingar á einstökum mánaðarheitum, svo sem „Þoka“ og „mistur“, breyta ekki merkingunni og eru ekki taldar upp sem gallar.

### Lýsigögn, ARIA, upplýsingaskrá og varatexti

Ég skoðaði íslensku lýsigögnin og titla, tungumálaskipti, ARIA-texta, staðfærsluskrána, no-JavaScript-færsluna og fallback-tilkynninguna. Greinin og no-JavaScript-færslan tilgreina `is-IS`; keyrsluumhverfi vefsins setur `lang="is"`, sem er gilt almennt tungumálaauðkenni og því ekki talið málfarsgalli. Niðurstaða 3 lýsir eina aðgengilega heitinu sem þarfnast skýrari texta.

### Skjöl og texti fyrir notendur í útfærslugreinum

Yfirfarið var efni í `README.md`, `SOURCE_LANGUAGE_CATALOG.md`, `DEVELOPMENT_STAGE.md`, `SPAGHETTI_DEVELOPMENT_HISTORY.md`, `STAGE_01_OWNERSHIP_AUDIT.md`, `STAGE_01_NORMATIVE_AUDIT.md` og `STAGE_01_EXECUTION_STATUS.txt`, auk mannlesanlegs texta í Elm-einingum og prófunum undir `src/` og `tests/`. Textinn er almennt á íslensku; niðurstaða 2 nær yfir stafsetningarfrávikin í skjölum og greiningarskilaboðum.

### Textatengd hætta á línubroti eða yfirflæði

Engin líkleg veruleg textatengd yfirflæðishætta fannst við yfirferð strengjanna; langir textar skiptast eðlilega í orð og setningar. Þetta er eingöngu mat á textanum, ekki sjónræn prófun eftir birtingu.

---

<sub>Generated by [GitHub Copilot CLI](https://github.com/features/copilot/cli)</sub>
