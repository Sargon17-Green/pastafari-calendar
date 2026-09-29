# Ströng íslensk whole-site QA — immutable evidence

- workflow run: `36550435224`
- reviewed HEAD: `f23e411e64f992bd7327eb8e14d0d21f0c2b33b3`
- niðurstaða: `NATIVE_QA_RESULT: PASS`
- reviewer: `Hodfa71/gemma4-e4b-is-saga-kl-sft-delta-dpo`
- adapter revision: `15b4d53d60686ed9405d2b4bb234c96cd097e3ca`
- converted LoRA SHA-256: `cfd7e003d06a5df5fbf1179c0eed27c9b8c1a5ddfef0cb0d7005645d80646156`
- grammar gate: `reynir-correct==4.1.3` með `reynir==3.8.0`
- falið hæfnipróf: 6/6 rétt í samsettu SAGA + Greynir mati
- GreynirCorrect-viðvaranir í yfirfarna veftextanum: 0
- whole-site chunks: 6/6 `CLEAN`
- staðfest findings: 0

Hráu chunk-svörin eru varðveitt óbreytt í þessari möppu. Þau innihalda endurtekna beygingarvillu í frjálsum samantektum (`Engar gallar ...`). Sú villa er villa í meta-texta rýnisins, ekki finding úr vefnum, og er varðveitt hér í stað þess að vera þögguð eða endurskrifuð. Hún varð ástæða fyrir síðari evidence-hygiene keyrslu með lágmarks vélrænu output-schema.

Vefheimildirnar sjálfar eru endurgeranlegar frá `reviewed HEAD` og workflow-inu `.github/workflows/about-native-qa-is-strict-gate.yml` eins og það var í þeim commit. Síðari samanburður við lifandi branch sýndi aðeins breytingar á QA-workflow og `SHA256SUMS.txt`, ekki á `docs/i18n/locales/is.js` eða `docs/about/content/is.html`.
