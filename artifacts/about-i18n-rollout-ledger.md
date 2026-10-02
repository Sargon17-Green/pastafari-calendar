# /about/ full-localization rollout ledger

Baseline commit: `f7a3d1feca145f1a3d98080117859dd870afa8ef`  
Working branch: `feature/about-i18n-72-locales`  
Semantic master: the current `docs/about/content/he.html` on this working branch. The baseline commit records the rollout origin only; later approved Hebrew semantic corrections supersede it.  
Rule: semantic equivalence without textual isomorphism; English is not a pivot language.

## Locale snapshot

The authoritative locale set is the `LOCALES` array in `docs/i18n/registry.js` at the baseline commit. It contains 72 locales.

| code | Intl locale | dir | site support | article status |
|---|---|---|---|---|
| he | he-IL | rtl | complete | semantic master / existing |
| en | en-US | ltr | complete | linguistic QA |
| af | af-ZA | ltr | partial | linguistic QA |
| ar | ar | rtl | partial | linguistic QA |
| az | az-AZ | ltr | partial | linguistic QA |
| be | be-BY | ltr | partial | linguistic QA |
| bg | bg-BG | ltr | partial | linguistic QA |
| bn | bn-BD | ltr | partial | linguistic QA |
| bs | bs-BA | ltr | partial | linguistic QA |
| ca | ca-ES | ltr | partial | linguistic QA |
| cs | cs-CZ | ltr | partial | linguistic QA |
| da | da-DK | ltr | partial | linguistic QA |
| de | de-DE | ltr | partial | linguistic QA |
| el | el-GR | ltr | partial | linguistic QA |
| eo | eo | ltr | partial | linguistic QA |
| es | es-ES | ltr | partial | linguistic QA |
| et | et-EE | ltr | partial | linguistic QA |
| fa | fa-IR | rtl | partial | linguistic QA |
| fi | fi-FI | ltr | partial | linguistic QA |
| fil | fil-PH | ltr | partial | linguistic QA |
| fo | fo-FO | ltr | partial | linguistic QA |
| fr | fr-FR | ltr | partial | linguistic QA |
| fy | fy-NL | ltr | partial | linguistic QA |
| gl | gl-ES | ltr | partial | linguistic QA |
| gu | gu-IN | ltr | partial | linguistic QA |
| ha | ha-NG | ltr | partial | linguistic QA |
| hi | hi-IN | ltr | partial | linguistic QA |
| hr | hr-HR | ltr | partial | linguistic QA |
| ht | ht-HT | ltr | partial | linguistic QA |
| hu | hu-HU | ltr | partial | linguistic QA |
| hy | hy-AM | ltr | partial | linguistic QA |
| id | id-ID | ltr | partial | linguistic QA |
| is | is-IS | ltr | partial | linguistic QA |
| it | it-IT | ltr | partial | linguistic QA |
| ja | ja-JP | ltr | partial | linguistic QA |
| jv | jv-ID | ltr | partial | semantic QA |
| ka | ka-GE | ltr | partial | linguistic QA |
| kk | kk-KZ | ltr | partial | linguistic QA |
| ko | ko-KR | ltr | partial | linguistic QA |
| lb | lb-LU | ltr | partial | linguistic QA |
| lt | lt-LT | ltr | partial | linguistic QA |
| lv | lv-LV | ltr | partial | linguistic QA |
| mk | mk-MK | ltr | partial | linguistic QA |
| mr | mr-IN | ltr | partial | linguistic QA |
| ms | ms-MY | ltr | partial | semantic QA |
| nb | nb-NO | ltr | partial | linguistic QA |
| ne | ne-NP | ltr | partial | semantic QA |
| nl | nl-NL | ltr | partial | linguistic QA |
| nn | nn-NO | ltr | partial | linguistic QA |
| pa | pa-IN | ltr | partial | linguistic QA |
| pl | pl-PL | ltr | partial | linguistic QA |
| pt | pt-BR | ltr | partial | linguistic QA |
| ro | ro-RO | ltr | partial | linguistic QA |
| ru | ru-RU | ltr | partial | linguistic QA |
| sk | sk-SK | ltr | partial | linguistic QA |
| sl | sl-SI | ltr | partial | semantic QA |
| so | so-SO | ltr | partial | semantic QA |
| sq | sq-AL | ltr | partial | semantic QA |
| sr | sr-Latn-RS | ltr | partial | semantic QA |
| sv | sv-SE | ltr | partial | linguistic QA |
| sw | sw-TZ | ltr | partial | semantic QA |
| ta | ta-IN | ltr | partial | linguistic QA |
| te | te-IN | ltr | partial | linguistic QA |
| th | th-TH | ltr | partial | semantic QA |
| tr | tr-TR | ltr | partial | linguistic QA |
| uk | uk-UA | ltr | partial | linguistic QA |
| ur | ur-PK | rtl | partial | semantic QA |
| uz | uz-UZ | ltr | partial | linguistic QA |
| vi | vi-VN | ltr | partial | linguistic QA |
| yo | yo-NG | ltr | partial | semantic QA |
| zh | zh-CN | ltr | partial | linguistic QA |
| zu | zu-ZA | ltr | partial | semantic QA |

Status progression for target locales: `not started → draft → semantic QA → linguistic QA → integrated → rendered → PASS`.

## Findings requiring locale-wide review

- `af-ZA`: historical locale-wide language finding: the original UI contained substantial Dutch/mixed Afrikaans. Before the final gate, remaining unambiguous leakage (`Ga naar datum soek`, `default`, `Koteletten`, `Maanden`) and the malformed localized manifest description were repaired. Strict Gemma 4 whole-site run `36707310645` then passed after an 8/8 Afrikaans qualification over natural Afrikaans, Dutch leakage, and grammar controls; 564 grounded text items produced zero confirmed findings. Evidence is stored under `artifacts/about-i18n-native-sessions/af/strict-36707310645/`. The locale is therefore at `linguistic QA`; rendered/visual and final integration gates remain separate.

- `bs-BA`: strict Gemma 4 whole-site run `36868788827` passed after an 8/8 Bosnian qualification; all 570 grounded user-visible/accessibility-facing items produced zero confirmed findings. Evidence is stored under `artifacts/about-i18n-native-sessions/bs/strict-36868788827/`. Drift after the reviewed HEAD was limited to generated checksums and Bengali QA evidence, with no Bosnian website surface changes. The locale is therefore at `linguistic QA`; rendered/visual and final integration gates remain separate.
- `ca-ES`: historical locale-wide finding: the locale had contained Spanish/mixed Catalan and later, during strict review, ordinary English technical prose remained in the Catalan article. Initial strict run `36876585823` returned a false-negative PASS and was explicitly rejected after manual audit. Twenty-two English-leakage repairs were applied, then strict Gemma 4 rerun `36881822658` passed after an 8/8 Catalan qualification; 567 grounded user-visible/accessibility-facing items produced zero findings. Follow-up manual scanning found no remaining ordinary English leakage; canonical literals such as `Short Choice`/`Wide Choice` and stable IDs remain exempt. Evidence is stored under `artifacts/about-i18n-native-sessions/ca/strict-36881822658/`. The locale is therefore at `linguistic QA`; rendered/visual and final integration gates remain separate.

- `gl-ES`: locale-wide language finding: prominent existing UI strings contain Portuguese forms rather than idiomatic Galician (for example `día de trabalho`). Do not use those strings as a terminology oracle for the article; native Galician review must repair the whole locale.

- `et-EE`: locale-wide language finding: prominent existing UI strings are Finnish rather than Estonian (for example `Vaihda työpäevä`, `Sivuston käyttö`). Do not use those strings as a terminology oracle for the article; native Estonian review must repair the whole locale.

- `bg-BG`: historical locale-wide language finding: prominent existing UI strings had contained Russian or mixed Russian/Bulgarian wording (for example `Изменить ден на действието`, `Как пользоваться сайтом`). The locale was repaired before the final gate. Strict Gemma 4 whole-site run `36859362965` then passed after an 8/8 Bulgarian qualification covering natural Bulgarian and Russian/mixed-language controls; 567 grounded user-visible/accessibility-facing items produced zero confirmed findings. Evidence is stored under `artifacts/about-i18n-native-sessions/bg/strict-36859362965/`. The locale is therefore at `linguistic QA`; rendered/visual and final integration gates remain separate.

- `bn-BD`: strict Gemma 4 whole-site run `36863774024` passed after an 8/8 Bengali qualification; all 567 grounded user-visible/accessibility-facing items produced zero confirmed findings. A manual promotion check verified that the English `manifest.defaultDescription` source key is not a Bengali localized manifest output: `description_localized.bn` is generated from Bengali `meta.description`, and equality on that contract key is explicitly allowed. Evidence is stored under `artifacts/about-i18n-native-sessions/bn/strict-36863774024/`. The locale is therefore at `linguistic QA`; rendered/visual and final integration gates remain separate.

- `ms-MY`: locale-wide language finding: the existing locale mixes Malay and Indonesian rather than being consistently idiomatic Malay (for example Malay `tarikh`/`mesej` alongside Indonesian `situs`, `perhitungan`, `Terapkan`, `coba lagi`). Do not use it as a terminology oracle for the Malay article; native Malay review must repair the whole locale.

- `ar`: strict Arabic Gemma 4 whole-site gate run `36836953854` passed after an 8/8 Arabic qualification covering Modern Standard Arabic, agreement, wrong-language leakage, and Latin c/t variables in technical context. The grounded whole-site corpus contained 583 user-visible/accessibility-facing items and produced zero confirmed findings. Evidence is stored under `artifacts/about-i18n-native-sessions/ar/strict-36836953854/`. The locale is therefore at `linguistic QA`; rendered/visual and final integration gates remain separate.

- `az-AZ`: historical locale-wide language finding: prominent existing UI copy had been Turkish rather than idiomatic Azerbaijani (`İşlem gününü değiştir`, `Bu site nasıl kullanılır`, `köftesinde`). The locale and article were repaired, including Turkish residues and ordinary English technical prose. Strict Gemma 3 12B whole-site run `36847382810` then passed after a 10/10 Azerbaijani qualification; 567 grounded user-visible/accessibility-facing items produced zero confirmed findings. Evidence is stored under `artifacts/about-i18n-native-sessions/az/strict-36847382810/`. The locale is therefore at `linguistic QA`; rendered/visual and final integration gates remain separate.

- `fo-FO`: locale-wide language finding: the existing locale is a Faroese/Danish hybrid (`Skift arbejdsdaguren`, `beregningens udgangspunkt`, `Sådan ...`), not idiomatic Faroese.

- `fy-NL`: locale-wide language finding: prominent UI copy is Dutch rather than Frisian (`Werkdei wijzigen`, `uitgangspunt van de berekening`, `Deze site gebruiken`).

- `is-IS`: historical locale-wide language finding: the locale was largely Danish with Icelandic-looking substitutions (`Skift arbejdsdaguren`, `beregningens udgangspunkt`, `Sådan ...`). A broad Icelandic repair replaced those strings. The evidence-hygiene strict SAGA + Greynir whole-site run `36555762016` passed: hidden qualification 6/6, 3/3 chunks CLEAN, zero GreynirCorrect site warnings and zero confirmed findings. Immutable evidence is stored under `artifacts/about-i18n-native-sessions/is/strict-36555762016/`. The locale is therefore at `linguistic QA`; rendered/visual and final integration gates remain separate.

- `cs-CZ`: before strict review, six obvious ordinary-English fragments in the Czech article were repaired. The first Czech strict workflow instance was superseded because its registry extractor still matched `bs` rather than `cs`; the corrected strict Gemma 4 run `36886900641` then passed after an 8/8 Czech qualification. The corrected corpus contained 568 grounded user-visible/accessibility-facing items and produced zero findings. A manual post-run scan found no remaining ordinary English, Slovak, Polish, or Cyrillic-language leakage. Evidence is stored under `artifacts/about-i18n-native-sessions/cs/strict-36886900641/`. The locale is therefore at `linguistic QA`; rendered/visual and final integration gates remain separate.
- `da-DK`: before strict review, three ordinary-English or mixed technical phrases in the Danish article were repaired. Strict Gemma 4 run `36891008084` passed after an 8/8 Danish qualification; 562 grounded user-visible/accessibility-facing items produced zero findings. Manual post-run scanning found no remaining ordinary English, Norwegian, Swedish, German, or Cyrillic-language leakage. Evidence is stored under `artifacts/about-i18n-native-sessions/da/strict-36891008084/`. The locale is therefore at `linguistic QA`; rendered/visual and final integration gates remain separate.
- `de-DE`: before strict review, six clear language issues in the German article were repaired. Strict Gemma 4 run `36896960363` passed after an 8/8 German qualification; 569 grounded user-visible/accessibility-facing items produced zero findings. Manual post-run scanning found no remaining ordinary English, Dutch, Danish, or Cyrillic-language leakage. Evidence is stored under `artifacts/about-i18n-native-sessions/de/strict-36896960363/`. The locale is therefore at `linguistic QA`; rendered/visual and final integration gates remain separate.
- `el-GR`: strict Gemma 4 whole-site run `36900599800` passed after an 8/8 Greek qualification; 569 grounded items produced zero findings. Manual post-run scanning found no remaining ordinary foreign-language leakage, and post-review drift did not touch Greek website sources. Evidence: `artifacts/about-i18n-native-sessions/el/strict-36900599800/`. The locale is at `linguistic QA`; rendered/visual and final integration remain separate.
- `fa-IR`: strict Gemma 4 whole-site run `36901794288` passed after an 8/8 Persian qualification; 569 grounded items produced zero findings. Manual post-run scanning found no remaining ordinary English/Turkish/Russian leakage, and post-review drift did not touch Persian website sources. Evidence: `artifacts/about-i18n-native-sessions/fa/strict-36901794288/`. The locale is at `linguistic QA`; rendered/visual and final integration remain separate.
- `fi-FI`: strict Gemma 4 whole-site run `36901793882` passed after an 8/8 Finnish qualification; 568 grounded items produced zero findings. Manual post-run scanning found no remaining ordinary Estonian/Swedish/English/Russian leakage, and post-review drift did not touch Finnish website sources. Evidence: `artifacts/about-i18n-native-sessions/fi/strict-36901793882/`. The locale is at `linguistic QA`; rendered/visual and final integration remain separate.
- `eo`: an initial strict PASS was manually rejected because ordinary English `commit` remained in visible Esperanto prose. After repair, rerun `36910105174` passed qualification 8/8 over 493 grounded items with zero findings; the post-rerun manual scan was clean. Evidence: `artifacts/about-i18n-native-sessions/eo/strict-36910105174/`.
- `es-ES`: an initial strict PASS was manually rejected because ordinary English `commit` remained in visible Spanish prose. After repair, rerun `36910105206` passed qualification 8/8 over 562 grounded items with zero findings; the post-rerun manual scan was clean apart from protected code literals such as `RRULE:FREQ=YEARLY`. Evidence: `artifacts/about-i18n-native-sessions/es/strict-36910105206/`.
- `et-EE`: an initial strict PASS was manually rejected because a Finnish heading remained in the Estonian UI. After repair, rerun `36910105248` passed qualification 8/8 over 568 grounded items with zero findings; the post-rerun Finnish/English/Russian leakage scan was clean. Evidence: `artifacts/about-i18n-native-sessions/et/strict-36910105248/`.
- `fo-FO`: earlier model CLEAN results were manually rejected after Danish/English leakage. After repairs, strict run `36916698702` passed qualification 8/8 over 567 grounded items with zero findings; manual post-run scanning was clean.
- `fr-FR`: strict run `36916698902` passed qualification 8/8 over 581 grounded items with zero findings; manual post-run scanning was clean.
- `gu-IN`: strict run `36916698771` passed qualification 8/8 over 567 grounded items with zero findings; manual post-run scanning was clean.
- `ha-NG`: strict run `36916698764` passed qualification 8/8 over 568 grounded items with zero findings; manual post-run scanning was clean.
- `hi-IN`: strict run `36916698925` passed qualification 8/8 over 567 grounded items with zero findings; manual post-run scanning was clean.
- `gl-ES`: earlier Galician source contained Portuguese/mixed forms and the first strict PASS was manually rechecked. After the final repair, strict rerun `36923026456` passed qualification 8/8 over 567 grounded items with zero findings; manual post-run scanning was clean and later drift did not touch Galician sources. Evidence: `artifacts/about-i18n-native-sessions/gl/strict-36923026456/`.
- `ht-HT`: strict run `36923264928` passed qualification 8/8 over 567 grounded items with zero findings; manual post-run scanning was clean. Drift after the reviewed HEAD was checksum-only. Evidence: `artifacts/about-i18n-native-sessions/ht/strict-36923264928/`.
- `fy-NL`: earlier model CLEAN results were manually rejected after Dutch/English leakage. After the final repairs, strict rerun `36928557891` passed qualification 8/8 over 567 grounded items with zero findings; the manual post-run scan was clean and later drift did not touch Frisian sources. Evidence: `artifacts/about-i18n-native-sessions/fy/strict-36928557891/`.
- `ja-JP`: the first strict attempt was invalid because an inherited Croatian enum constrained the qualification schema. After correcting the workflow, strict run `36929093624` passed qualification 8/8 over 569 grounded items with zero findings; manual post-run scanning was clean and later drift was checksum-only. Evidence: `artifacts/about-i18n-native-sessions/ja/strict-36929093624/`.
- `hu-HU`: after pre-strict repair of obvious English technical leakage, strict run `36929093742` passed qualification 8/8 over 568 grounded items with zero findings; manual post-run scanning was clean and later drift was checksum-only. Evidence: `artifacts/about-i18n-native-sessions/hu/strict-36929093742/`.
- `sl-SI`: locale-wide language finding: prominent UI copy is Croatian/Bosnian/Serbian rather than idiomatic Slovenian (`Promijeni dan delovanja`, `polazišna je točka`, `u kotletu`).

- `sr-Latn-RS`: locale-wide variant finding: the existing UI uses predominantly Ijekavian Bosnian/Croatian forms (`Promijeni`, `djelovanja`, `mjesecu`, `zdjela`) despite the registered Serbia Latin variant; review the whole locale against sr-Latn-RS.

- `lb-LU`: locale-wide language finding: the existing locale is predominantly German rather than Luxembourgish (e.g. `Dag der Ausführung ändern`, `Ausgangspunkt der Berechnung`, `Schale`, `Tropfen`). Do not use it as a Luxembourgish terminology oracle.

- `be-BY`: historical locale-wide language finding: the original locale mixed Belarusian with Ukrainian forms (e.g. `Змінити дзень дії`, `котлеті`, `місяці`). The locale was repaired before the final gate. Strict Gemma 3 12B whole-site run `36852565213` then passed after an 8/8 Belarusian qualification covering natural Belarusian and Russian/Ukrainian leakage controls; 567 grounded user-visible/accessibility-facing items produced zero confirmed findings. Evidence is stored under `artifacts/about-i18n-native-sessions/be/strict-36852565213/`. The locale is therefore at `linguistic QA`; rendered/visual and final integration gates remain separate.

- `ht-HT`: locale-wide language finding: the existing locale is French rather than Haitian Creole (e.g. `Changer le jou de travail`, `Comment utiliser ce site`, `Goutte`, `Porte`). Do not use it as a Haitian Creole terminology oracle.

- `jv-ID`: locale-wide language finding: the existing locale is predominantly Indonesian rather than Javanese (e.g. `Ubah dina kerja`, `Cara menggunakan situs ini`, `Hari/Dina Pendirian`, `Tetes`, `Gerbang`). Do not use it as a Javanese terminology oracle.

- `mk-MK`: locale-wide language finding: the existing locale mixes Macedonian with Russian (e.g. `Изменить`, `Как пользоваться сайтом`, `День Основания`, `Капля`). It requires native Macedonian repair.

- `nn-NO`: locale-wide variant finding: the existing locale substantially mixes Bokmål with Nynorsk (e.g. `Endre arbeidsdagen`, `Grunnleggelsesdagen`, alongside `brukar`). It requires native Nynorsk repair before serving as a terminology oracle.

- `sr-RS`: locale-wide language finding: the existing locale is Croatian-leaning rather than standard Serbian (e.g. `Promijeni`, `djelovanja`, `Zdjela`). It requires native Serbian repair before serving as a terminology oracle.

- `en-US`: strict English Gemma 4 whole-site gate run `36580966998` passed after a 9/9 hidden qualification over canonical domain terminology, grammatical controls, and wrong-language leakage. The grounded whole-site corpus contained 525 user-visible/accessibility-facing items and produced zero confirmed findings. Evidence is stored under `artifacts/about-i18n-native-sessions/en/strict-36580966998/`. The earlier Qwen run `36559167329` remains historical INVALID evidence and is not a linguistic verdict.

## Draft-completion mechanical checkpoint — 2026-09-25

- `LOCALES` at this branch contains **72 locales**: Hebrew plus 71 target locales.
- `docs/about/content/` now contains **72 locale articles**, exactly one for every registered locale.
- `ka-GE`: strict run `36934843022` passed qualification 8/8 over 567 grounded items with zero findings; manual post-run wrong-language scan was clean and staleness checking found no later Georgian source change. Evidence: `artifacts/about-i18n-native-sessions/ka/strict-36934843022/`.
- `lt-LT`: strict run `36934489600` passed qualification 8/8 over 567 grounded items with zero findings; manual post-run wrong-language scan was clean and staleness checking found no later Lithuanian source change. Evidence: `artifacts/about-i18n-native-sessions/lt/strict-36934489600/`.
- `mk-MK`: after the Macedonian English-prose cleanup, strict run `36935042477` passed qualification 8/8 over 567 grounded items with zero findings; manual post-run wrong-language scan was clean and staleness checking found no later Macedonian source change. Evidence: `artifacts/about-i18n-native-sessions/mk/strict-36935042477/`.
- `fil-PH`: after removal of the remaining English prose leakage, strict run `36937587092` passed qualification 8/8 over 567 grounded items with zero findings; manual post-run wrong-language scan was clean and staleness checking found no later Filipino source change. Evidence: `artifacts/about-i18n-native-sessions/fil/strict-36937587092/`.
- `hy-AM`: after the Armenian prose/accessibility cleanup and the 65536-context rerun path, strict run `36937821477` passed qualification 8/8 over 567 grounded items with zero findings; manual post-run wrong-language scan was clean and staleness checking found no later Armenian source change. Evidence: `artifacts/about-i18n-native-sessions/hy/strict-36937821477/`.
- `id-ID`: after removal of non-native terminology leakage, strict run `36936824308` passed qualification 8/8 over 568 grounded items with zero findings; manual post-run wrong-language scan was clean and staleness checking found no later Indonesian source change. Evidence: `artifacts/about-i18n-native-sessions/id/strict-36936824308/`.
- `ko-KR`: after removal of the English astronomy gloss, strict run `36937704797` passed qualification 8/8 over 569 grounded items with zero findings; manual post-run wrong-language scan was clean and staleness checking found no later Korean source change. Evidence: `artifacts/about-i18n-native-sessions/ko/strict-36937704797/`.
- `hr-HR`: strict Gemma 4 whole-site run `36943940327` passed qualification 8/8 over 568 grounded user-visible/accessibility-facing items with zero confirmed findings. Manual post-run wrong-language scan and staleness checks were clean. Artifact `11202088212`, zip SHA-256 `ab92cf799d6696c77c63274533c3f227cb7368032d6faf32b2773b9f5ea6173f` (23843 bytes). Evidence: `artifacts/about-i18n-native-sessions/hr/strict-36943940327/`.
- `nl-NL`: strict Gemma 4 whole-site run `36944982324` passed qualification 8/8 over 562 grounded user-visible/accessibility-facing items with zero confirmed findings. Manual post-run wrong-language scan and staleness checks were clean. Artifact `11202286145`, zip SHA-256 `3870605248961aecdc8d2af7451aeebd862416b17f0c47096af1f2ddadb5e7c4` (23311 bytes). Evidence: `artifacts/about-i18n-native-sessions/nl/strict-36944982324/`.
- `pl-PL`: strict Gemma 4 whole-site run `36944857649` passed qualification 8/8 over 568 grounded user-visible/accessibility-facing items with zero confirmed findings. Manual post-run wrong-language scan and staleness checks were clean. Artifact `11202265602`, zip SHA-256 `05f2f9ea518243bb8a00db6cb3768dc8b22949004e2799c68950f6802925ca2a` (25040 bytes). Evidence: `artifacts/about-i18n-native-sessions/pl/strict-36944857649/`.
- `pt-BR`: strict Gemma 4 whole-site run `36944857655` passed qualification 8/8 over 569 grounded user-visible/accessibility-facing items with zero confirmed findings. Manual post-run wrong-language scan and staleness checks were clean. Artifact `11202515700`, zip SHA-256 `b5fc369959f8c5ec891368ebc788a972faeaa8053488b0bb5af3b33030471020` (23785 bytes). Evidence: `artifacts/about-i18n-native-sessions/pt/strict-36944857655/`.
- `sv-SE`: strict Gemma 4 whole-site run `36944857866` passed qualification 8/8 over 562 grounded user-visible/accessibility-facing items with zero confirmed findings. Manual post-run wrong-language scan and staleness checks were clean. Artifact `11202428257`, zip SHA-256 `e3e6abcb5e6c6e6721edac7a12a67475e9c49a3fc0fb3446dc4671432e692ec4` (22811 bytes). Evidence: `artifacts/about-i18n-native-sessions/sv/strict-36944857866/`.
- `tr-TR`: strict Gemma 4 whole-site run `36944857656` passed qualification 8/8 over 569 grounded user-visible/accessibility-facing items with zero confirmed findings. Manual post-run wrong-language scan and staleness checks were clean. Artifact `11202218473`, zip SHA-256 `f5aff7bed1f73961aaa1175c9680c4c5b2ae766fa4391f0623ddea39992c0c6b` (23536 bytes). Evidence: `artifacts/about-i18n-native-sessions/tr/strict-36944857656/`.
- `uk-UA`: strict Gemma 4 whole-site run `36944857700` passed qualification 8/8 over 567 grounded user-visible/accessibility-facing items with zero confirmed findings. Manual post-run wrong-language scan and staleness checks were clean. Artifact `11201729827`, zip SHA-256 `0a251f9f22f643c01f4497ad9d3593d7183c20443994cbc6bb1648210f5cd97f` (27178 bytes). Evidence: `artifacts/about-i18n-native-sessions/uk/strict-36944857700/`.
- `vi-VN`: strict Gemma 4 whole-site run `36944857730` passed qualification 8/8 over 568 grounded user-visible/accessibility-facing items with zero confirmed findings. Manual post-run wrong-language scan and staleness checks were clean. Artifact `11203035703`, zip SHA-256 `bf5451822c8b51eda98f4acfadada6b39e7a3f8f540cf57251d5abdd66da0093` (24311 bytes). Evidence: `artifacts/about-i18n-native-sessions/vi/strict-36944857730/`.
- `it-IT`: strict Gemma 4 whole-site run `36987353933` passed qualification 8/8 over 563 grounded user-visible/accessibility-facing items with zero confirmed findings. Manual post-run wrong-language scan and staleness checks were clean. Artifact `11218674303`, zip SHA-256 `2efc8be1dd3999bb3e1bef557eb50a7795c7888211e3b2f2010346500e2a7dc9` (23440 bytes). Evidence: `artifacts/about-i18n-native-sessions/it/strict-36987353933/`.
- `kk-KZ`: strict Gemma 4 whole-site run `36987353962` passed qualification 8/8 over 567 grounded user-visible/accessibility-facing items with zero confirmed findings. Manual post-run wrong-language scan and staleness checks were clean. Artifact `11219552817`, zip SHA-256 `96b2ff198f0e10c75f2eb009c9b681a61d83b26ab4b06ad1bcd4e1c79b32411b` (26212 bytes). Evidence: `artifacts/about-i18n-native-sessions/kk/strict-36987353962/`.
- `lb-LU`: strict Gemma 4 whole-site run `36987353902` passed qualification 8/8 over 567 grounded user-visible/accessibility-facing items with zero confirmed findings. Manual post-run wrong-language scan and staleness checks were clean. Artifact `11218648958`, zip SHA-256 `5ea9402a471c861bbd65f5e0bd24cf3dd12f168f2085c36a87db43e68ad2f2ab` (25077 bytes). Evidence: `artifacts/about-i18n-native-sessions/lb/strict-36987353902/`.
- `lv-LV`: strict Gemma 4 whole-site run `36987078453` passed qualification 8/8 over 567 grounded user-visible/accessibility-facing items with zero confirmed findings. Manual post-run wrong-language scan and staleness checks were clean. Artifact `11219656427`, zip SHA-256 `db6076c33f4dcb1ab2dca113828224741c2803e91deae2cb1cd8dcf2989309b8` (24471 bytes). Evidence: `artifacts/about-i18n-native-sessions/lv/strict-36987078453/`.
- `nb-NO`: strict Gemma 4 whole-site run `36987353810` passed qualification 8/8 over 562 grounded user-visible/accessibility-facing items with zero confirmed findings. Manual post-run wrong-language scan and staleness checks were clean. Artifact `11219321703`, zip SHA-256 `d7e5ed2c981b48735255518e5c534ab3b57069442a9d83aef780f0e41338c4a0` (22533 bytes). Evidence: `artifacts/about-i18n-native-sessions/nb/strict-36987353810/`.
- `nn-NO`: strict Gemma 4 whole-site run `36987353817` passed qualification 8/8 over 567 grounded user-visible/accessibility-facing items with zero confirmed findings. Manual post-run wrong-language scan and staleness checks were clean. Artifact `11218527269`, zip SHA-256 `9b0b13bb121bf3c6557ea7d737ce593dcefff9e4666118bd7750f52e98110b8c` (23831 bytes). Evidence: `artifacts/about-i18n-native-sessions/nn/strict-36987353817/`.
- `ru-RU`: strict Gemma 4 whole-site run `36987353903` passed qualification 8/8 over 567 grounded user-visible/accessibility-facing items with zero confirmed findings. Manual post-run wrong-language scan and staleness checks were clean. Artifact `11218947588`, zip SHA-256 `eac9820f18517819abc5dd94a25e5ae2ba52c30334d29e313a3c5cd70b6f0f01` (27544 bytes). Evidence: `artifacts/about-i18n-native-sessions/ru/strict-36987353903/`.
- `sk-SK`: strict Gemma 4 whole-site run `36987353831` passed qualification 8/8 over 568 grounded user-visible/accessibility-facing items with zero confirmed findings. Manual post-run wrong-language scan and staleness checks were clean. Artifact `11219157675`, zip SHA-256 `484171182cf80b906c8f6ad877aa03279fde4c20b20588fbf8eeaf9b3e2ec018` (24733 bytes). Evidence: `artifacts/about-i18n-native-sessions/sk/strict-36987353831/`.
- All 71 target locales have complete article drafts. Native-language whole-site text QA is now complete for `af-ZA`, `ar`, `az-AZ`, `be-BY`, `bg-BG`, `bn-BD`, `bs-BA`, `ca-ES`, `cs-CZ`, `da-DK`, `de-DE`, `el-GR`, `eo`, `es-ES`, `et-EE`, `fa-IR`, `fi-FI`, `fil-PH`, `fo-FO`, `fr-FR`, `fy-NL`, `gl-ES`, `gu-IN`, `ha-NG`, `hi-IN`, `hr-HR`, `ht-HT`, `hu-HU`, `hy-AM`, `id-ID`, `is-IS`, `it-IT`, `ja-JP`, `ka-GE`, `kk-KZ`, `ko-KR`, `lb-LU`, `lt-LT`, `lv-LV`, `mk-MK`, `nb-NO`, `nl-NL`, `nn-NO`, `pl-PL`, `pt-BR`, `ru-RU`, `sk-SK`, `sv-SE`, `tr-TR`, `uk-UA`, `vi-VN`; these 51 target locales are at `linguistic QA`, while the remaining 20 target locales remain at `draft` pending the same native-language pass.
- Full mechanical audit was run in batches across every target locale. Each article has exactly the canonical 29 stable IDs, no duplicate IDs, both semantic tables with 19 and 9 body rows respectively, all required hard literals/formulas/hashes, no unintended Hebrew leakage, and its locale module has exactly 11 `about.*` shell keys.
- During closure, the first audit helper exposed a real test bug: it matched only two-letter locale codes and therefore missed `fil`. The audit was corrected to accept 2–3 letter registry codes, `fil` was added and verified, and the final audit covered all 72 locales.
- Native-language whole-site LLM QA remains pending by design. The required next phase is one locale at a time, with the reviewing conversation itself conducted in that locale and explicitly searching the whole site for unnatural language, foreign-language leakage, terminology drift, BiDi/layout issues where relevant, and semantic discrepancies.

## Semantic-delta re-alignment checkpoint — 2026-09-27

- The current Hebrew article remains the semantic master and was not modified by the non-Hebrew delta rollout.
- All **71 non-Hebrew target locales** have been re-aligned to the current Hebrew semantic master and this invariant ledger.
- `artifacts/about-semantic-delta-status.json` contains exactly 71 target-locale entries, all with `final_verified_aligned: true`.
- `artifacts/about-semantic-delta-runs/` contains exactly 71 per-locale evidence files, with no missing or extra target locale.
- Closure comparison against `docs/about/content/` found exactly 72 article resources: Hebrew plus the same 71 target locales; Hebrew is intentionally absent from the delta status/evidence set.
- Every manual locale commit enforced the stable 29-ID sequence, semantic-table row counts 19 and 9, required formulas/identifiers/hashes, allowed-section scope, absence of unintended Hebrew leakage, and preservation of article line count.
- This checkpoint closes the **semantic-delta re-alignment only**. It does not by itself promote any locale through the separate native-language whole-site review, rendered smoke, accessibility, PWA/offline, or final `PASS` gates.

## Native-language whole-site QA policy

The final linguistic QA is intentionally a separate phase and will run on a dedicated branch forked from the completed translation branch, tentatively `qa/about-i18n-native-language-audit`.

For every one of the 72 supported locales, run a separate QA conversation/session whose working language, instructions, findings and proposed edits are written in the locale being audited. The reviewer must inspect the **whole rendered site in that locale**, not only `/about/`.

Each locale review must actively look for:
- text that is wholly or partly in another language, including English fallback leakage;
- grammatical, idiomatic or stylistic text that sounds translated, stiff, unnatural or locally non-native;
- inconsistent terminology between the article, controls, calendar labels, errors, reverse-search UI and metadata;
- wrong script, punctuation, quotation conventions, capitalization, spacing, plural behavior, numerals or date-expression conventions;
- RTL/BiDi defects around formulas, Latin identifiers, numbers and inline code where relevant;
- truncation, overflow, awkward wrapping, broken tables or controls caused by the localized text;
- untranslated accessibility text, ARIA labels, title/meta text, manifest strings, noscript text and error/fallback states.

The per-locale session must not approve a locale merely because all strings are technically translated. Approval requires natural prose and a coherent single-language experience across the site. Canonical identifiers, formulas, hashes, API names and intentionally untranslated technical literals remain exempt.

A locale can move from `semantic QA` to `linguistic QA` only after the structural/semantic invariant suite passes; it can move to `PASS` only after its native-language whole-site review and rendered smoke check are clean.

## Stable deep-link contract

These 29 IDs are public API and MUST be identical in every article resource:

`about-calendar`, `date-parts`, `working-day`, `day-identity`, `year-5000`, `years-and-gates`, `cutlets`, `months-and-weaving`, `month-interleaving`, `next-day-in-month`, `no-weeks`, `canonical-names`, `month-day-pairs`, `calculation`, `short-and-wide-choice`, `structural-atlas`, `anniversaries`, `appointments`, `travel-and-all-day`, `day-boundary`, `printed-calendar`, `seer`, `foundation-and-tablets`, `anchors`, `site-story`, `reverse-conversion`, `far-time-structure`, `sauce-history`, `summary`.

Hierarchy is also invariant: `anchors` and `site-story` are level-3 subsections inside `foundation-and-tablets`; `far-time-structure` is a level-3 subsection inside `reverse-conversion`; the remaining TOC sections are level 2. `about-calendar` is the lead and is not a TOC section.

## Semantic invariant ledger

The following facts, distinctions and epistemic qualifications must survive every translation.

### Core date semantics
- The date is a two-day function `F(c,t)`, not `F(t)`.
- `c` is the day of working / calculation day; `t` is the queried / target day.
- The same `t` may receive a different Pastafari representation under a different `c`.
- A Pastafari date has exactly five fields: year number; cutlet name; day in cutlet; month name; day in month. Adjacent metadata is not a sixth field.
- Chronological day identity is distinct from Pastafari representation. `day-id` is a stable chronological identity; changing the display/calculation context must not move the event/day itself.
- `F(c_1,t)` and `F(c_2,t)` need not be equal.

### Year 5000 and direction
- If `c=t`, the year is always `5000`.
- Year 5000 is relative to the day of working, not a fixed historical interval.
- Other days in the same selected year are also in year 5000; therefore year 5000 does NOT imply `t=c`.
- `Y>5000 ⇒ t>c`; `Y<5000 ⇒ t<c`.
- Year 0 exists; farther into the past there are negative-numbered years.

### Years, gates, cutlets and months
- Canonical year-length bounds: 252 through 5778 days. These are specification bounds, not empirical averages.
- Year and cutlet boundaries use gates.
- Each year has 6–17 cutlets.
- A cutlet is chronologically contiguous; its length is at least 42 days.
- There are 17 canonical cutlet names and no cutlet-name repetition within a year; the name does not determine length or position.
- Each year has 3–47 structural months.
- Each month has 4–123 assigned days.
- A month need not be chronologically contiguous. “Day in month” is the ordinal occurrence of that month in the year, not elapsed chronological days since its first occurrence.
- Month weaving has structural constraints on first/last appearances, but no rule that one month must end before another begins.
- Cutlets and months are two coordinate systems over the same days; neither subdivides the other.
- The next numbered day of a month is the next occurrence of that month and need not be tomorrow.
- The current canonical specification defines no week system.
- There are 17 canonical cutlet names and 47 canonical month names. Canonical semantic identity is primary; localized spellings/translations are display layers.
- There are `47×123=5781` syntactically possible (month name, day-in-month) pairs; a year of length `L` realizes exactly `L` of them; `L≤5778`; therefore at least `5781-5778=3` possible pairs are absent from every year.

### Sauce / calculation
- The internal calculation is called the sauce in the article.
- `Q=2^127-1` and it is prime.
- The process description includes five input counters, 7 hidden drops, 46 visible drops, 6 bowls, varying bowl orders, 12 final stirs, answer seals, combinatorial choices, gate generation, year selection, cutlet partitioning, name selection, month creation and month-day weaving.
- Final updates are synchronous: all six new bowl values are computed from the same old state before replacement.
- In final stir `r`, with old-bowl sum `S`, compute `R=SAVE(S+149r)`. `R`, not raw `S`, is used both for bowl-order choice and the internal stir update.
- Older examples using raw `S` inside that update are obsolete unless reverified.
- After the stirs, the answer ring continues in the order locked at visible drop 46; do not silently replace it with the order of the last stir.
- `Short Choice` uses rejection sampling to avoid simple modulo bias.
- `Wide Choice` is NOT equivalent to drawing independent uniform base-`Q` digits until an index is obtained; equal positive probability for every legal option must not be inferred, and sufficiently large spaces can contain legal but unreachable options.
- The calendar is fully deterministic; “choice” names algorithmic stages, not runtime randomness.

### Structural Atlas: empirical, not canonical law
- Engine commit: `8e155fa4198ea7bcfeb16138ac5d6662706f4d93`.
- Corpus: 4,096 days of working; years 4990–5010 for each; 86,016 year structures; 625,437 cutlets; 3,535,422 structural months; >356 million contiguous month runs; >364 million transitions from month day `n` to `n+1`.
- Measured table values must be preserved exactly in mathematical value:
  - mean year length 4,275.182 days; median 4,343; observed min/max 716 / 5,778;
  - mean cutlets/year 7.271; exactly 6 cutlets 42.00%; 6–8 cutlets 81.29%; mean cutlet length 587.963 days; median 560;
  - mean months/year 41.102; median 43; exactly 47 months 15.63%; at least 45 months 36.81%; mean structural-month length 104.014 days; median 115;
  - mean contiguous runs/month 100.897; one-day month runs 97.482%; measured proportion of adjacent-day pairs in the same month 2.9976%; mean foreign days between `n` and `n+1` 40.408; mean first-to-last month span 4,266.653 days.
- Additional sampled means: ordinary year ≈4,262 days; day-weighted mean ≈4,466; self year 5000 ≈4,499.
- The name/length association was very weak in the sample; this is not a proof of independence.
- The 86,016 year structures contain only 24,786 distinct start/end gate intervals; samples are not fully independent. Do not turn the atlas into a global probabilistic theorem.

### Anniversaries
- “Same day every year” needs an explicit recurrence definition.
- Natural recurrences include same (month name, day in month), same (cutlet name, day in cutlet), or combined constraints.
- This is not simply `RRULE:FREQ=YEARLY`; the next qualifying Pastafari year must be searched.
- The original event is not automatically counted as its next occurrence.
- Changing day of working for display must not change identity, birth instant or age.
- Empirical scan: 4,096 self-dates; every successive Pastafari year forward and backward up to 250,000 years in each direction.
- Month-coordinate recurrence: median 1 Pastafari year; 77.56% in adjacent year; 93.77% within 2; 99.44% within 5; observed max 21 years.
- Cutlet-coordinate recurrence: median 3 years; 88.89% within 10; heavy tail; observed max 51,954 Pastafari years.
- These are corpus results, not a proof that every possible anniversary must recur and not a maximum-wait guarantee.

### Events, travel and day boundary
- To determine a meeting day using a Pastafari date, the parties must agree at least on the five-field tuple and the day of working used for the calculation. This identifies the Pastafari day context, not necessarily an exact instant within that day. Storing the day of working as a stable day identity is preferable to the word “today”.
- “tomorrow”, “next day in month”, “end of month”, “whole month”, and “next year” have distinct semantics described in the article.
- Important events may additionally store an absolute chronological day/instant.
- Event identity is distinct from the local label shown for it.
- Travel does not move a scheduled event in time, but the local Pastafari date shown at that instant may change with location.
- Civil all-day is usually civil-midnight to civil-midnight; Pastafari all-day is local Pastafari day-boundary to next local Pastafari day-boundary. These are generally not the same instants.
- Local Pastafari day does not change at midnight. Boundary = topocentric lower meridian transit of the center of Venus at the local meridian.
- The boundary is location-dependent, not set by civil time zone, is not changed merely by DST toggling, and does not require Venus to be visible.
- Same physical instant can lie on opposite sides of the local boundary at two locations.
- Product fallback observer location when no usable user location is available: Kisurra.

### Printed calendars and Seer
- A printed calendar is valid relative to a stated day of working and may need replacement when `c` changes.
- Hand calculation is possible because the specification is complete and deterministic.
- `Pastafarian Calendar Seer` is a fast engine beside the canonical implementation; it is not an authority source.
- The Megillah sets the rules; the canonical calculation produces the date according to those rules; Seer must return the same answer. If Seer disagrees with a correct canonical calculation, Seer is wrong.
- In the live verification performed on 21 September 2026, Seer supported date, now, batch, ranges, reverse conversion, year structure, active-working-day resolution, Node API, browser/HTTP client, CLI, HTTP v1, OpenAPI 3.1, native/distribution packages and verified container deployment.
- Seer has a public API. Explicit stable HTTP v1 endpoints include date, range, batch, year, reverse, working day, metadata, locales and status.
- A public HTTPS deployment on Render was actually tested on 21 September 2026 for exact queries, large range, restart, cold wake and load behavior.
- The verified public deployment is a beta/evaluation deployment, not a promise or declaration of a permanent hosted production service with SLA.
- Server URL, hosting provider and version number are not parts of the calendar and are not canonical constants.
- Seer may use precomputation, special representations, SIMD, algebra and shortcuts, provided semantic operation and answer match the canonical calculation.

### Fixed anchors, origin and re-delivery
- Foundation Day is a fixed computational reference, not “the beginning of time”.
- In the proleptic Gregorian calendar: 22 December 41,222 BCE.
- Foundation-day positive odd/even encoding: Foundation Day=1; following days 3,5,…; preceding days 2,4,6,…, avoiding negative day numbers in that counter.
- Tablets Day: 15 June 763 BCE proleptic Julian = 7 June 763 BCE proleptic Gregorian.
- Exact Foundation→Tablets distance: `14{,}777{,}149` days.
- These anchors are fixed chronological identities; their displayed Pastafari date still depends on the day of working.
- The Pastafarian calendar is the calendar in which time was created. This must be stated directly, without meta-fictional hedges such as “within the site’s story”, “according to the mythology/tradition”, “is presented as”, or equivalent distancing language.
- The calendar is part of creation; humanity used it without sufficient awareness that it was doing so until the modern re-delivery.
- Not every historical detail is stated explicitly in the Scroll. Source attribution remains exact: do not attribute a detail to the Scroll unless the Scroll states it. This is a provenance rule, not a caveat about the reality of the event.
- The re-delivery event is chronologically fixed; its Pastafari representation is computed under the relevant day of working and can differ under another day of working.

### Reverse conversion and far-time structure
- With known `c` and a known Pastafari year, (cutlet name, day in cutlet) identifies at most one day; likewise (month name, day in month) identifies at most one day. A full Pastafari date with known `c` therefore identifies the target day uniquely.
- Coarse maximum candidate counts inside a known year:
  - no non-year field: 5,778;
  - cutlet name only: 5,568;
  - day in cutlet only: 17;
  - month name only: 123;
  - day in month only: 47;
  - cutlet name + day in cutlet: 1;
  - month name + day in month: 1;
  - any three non-year fields: 1;
  - all four non-year fields: 1.
- Without `c`, the same full five-field date can occur under different working days and at different absolute distances; explicit examples exist. In year 5000, even the direction relative to the day of working is not always determined by the tuple: the same full date can lie before the day of working in one context and after it in another.
- Derived mathematics: for fixed `c`, sufficiently far in the past tail there is exact affine periodicity. If `F(c,t)=(Y,K,d_K,M,d_M)`, then for that `c` there exist `H_c`, `p_c`, and a sufficiently remote threshold such that `F(c,t-H_c)=(Y-p_c, K, d_K, M, d_M)`.
- This is a fixed-`c` theorem and does NOT establish a global `F(c+T,t+T)=F(c,t)`.
- Whether the final asymptotic slope actually varies between different days of working remains open.

### Sauce-history research: derived results, not added calendar rules
- On visible stages 3–46, generic injectivity on the relevant asymptotic branch is established.
- For the first five final stirs after visible drop 46, generic invertibility on the relevant canonical union is established without extra side information.
- For remaining stirs, strong constructive upper bounds are known for sufficient side information.
- Whether the final six bowls alone are always generically sufficient remains open.
- Some results are symbolic proofs; some are verified by exact finite arithmetic checks. Symbolic strengthening reduced but did not eliminate the finite computational kernel.
- Relevant reductions include automata of 180 and 9 states and symmetries of the six bowls.

## Translation and terminology rules

- Start each locale from the semantic ledger and current Hebrew master, never from English as a pivot.
- State canonical cosmological and historical claims in the same direct factual voice as technical calendar facts. Do not add “story”, “mythology”, “tradition”, “according to”, “is presented as”, “in-universe”, or equivalent reality-distancing qualifiers unless the source itself is being quoted or discussed as a source.
- Preserve technical identifiers/literals verbatim: `F(c,t)`, `c`, `t`, `Q=2^127-1`, `SAVE`, `Short Choice`, `Wide Choice`, `day-id`, `RRULE:FREQ=YEARLY`, `OpenAPI`, `Pastafarian Calendar Seer`, hashes and formulas.
- Reuse the locale's existing UI/canonical terminology where it is suitable for prose. Do not invent new canonical names for cutlets/months.
- The prose may restructure clauses/sentences/headings to sound native; semantic and epistemic content may not drift.
- Local punctuation, quotation marks and ordinary number formatting are allowed; code/formula representations remain normative.
- RTL resources require deliberate BiDi handling around Latin identifiers and formulas.
- Technical terminology that is uncertain in a target language must be researched before approval.

## Initial architectural findings

1. `docs/about/content/registry.js` currently registers only Hebrew and therefore every non-Hebrew locale falls back to the Hebrew article.
2. The 70 partial locale modules intentionally omit all about-page wrapper strings today; `test/i18n-support-levels.test.js` codifies that English fallback set. Completing /about/ requires changing this test and adding localized wrapper strings, without changing the locale support level.
3. `docs/sw.js` eagerly precaches the Hebrew article. The desired rollout should avoid precaching 71 additional long articles. Preferred direction: keep a small core fallback article and add article assets to the existing runtime cache-on-demand mechanism, with a separate revision and request classifier.
4. The current notice key/name `about.hebrewOnly` encodes an obsolete assumption. Replace it with a generic fallback notice key/meaning rather than keeping user-visible Hebrew-only semantics.
5. Article `lang` should use the locale's actual selected language variant (e.g. `pt-BR`, `sr-Latn-RS`, `zh-CN`, `nb-NO`, `nn-NO`) rather than pretending all resources are generic two-letter variants. Registry metadata should carry the exact tag.
6. Stable IDs are independent of translated headings and must remain so.

## Findings requiring later adjudication

None blocking at initialization. Any contradiction between an existing locale's terminology and canonical identifiers will be recorded here before broad terminology changes are made.
