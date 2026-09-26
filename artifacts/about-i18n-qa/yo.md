# QA Yorùbá — ipo àárín fún gbogbo ojúlé

## Àgbègbè ìṣàyẹ̀wò

Ìṣàyẹ̀wò yìí bo `yo-NG` lórí gbogbo ojúlé, kì í ṣe `/about/` nìkan: UI pàtàkì, ìwádìí ọjọ́, ọjọ́ ìṣiṣẹ́, ìfiwé, ìwò ọdún, ìṣàwárí sẹ́yìn, àṣìṣe àti ipo, ìtọ́sọ́nà olùlò, footer, metadata, manifest àti ọrọ̀ ARIA/ìrànwọ́ ìwọlé.

## Àwọn atunṣe

A fi message key mẹ́rin tó ṣáájú kò sí kún un:
- `app.brand`
- `reverse.error.limitPositive`
- `reverse.error.limitSafeInteger`
- `reverse.error.absoluteDateField`

A tún `manifest.defaultDescription` ṣe.

A dá ìtumọ̀ tó sọnù padà sí `search.intro`, `settings.intro`, `guide.1.body`, `guide.4.body`, `guide.5.body`, `guide.6.body`: ọjọ́ Pastafari lọwọlọwọ gẹ́gẹ́ bí ìwọlé àìyẹsẹ̀, ibi olùṣọ́ tó ń ṣiṣẹ́, ààlà ọjọ́ tó dá lórí Venus láti `ASTRONOMICAL-DAY.md`, ìtunṣe ìwádìí àti ọjọ́ ìṣiṣẹ́, àti pípa ọjọ́ ìṣiṣẹ́ tí a yàn lọ́wọ́ mọ́ fún àwọn ìwádìí tó tẹ̀lé.

Queried day ni a ṣọ̀kan sí `ọjọ́ tí a béèrè`.

## `/about/`

A yọ English-mixing tó kù kúrò, pẹ̀lú `rejection sampling`, `modulo bias`, `specification`, `implementation`, `all-day`, Seer block, `reverse conversion`, `affine periodicity`, `generic injectivity` àti `generic invertibility`.

Àwọn API literal gidi àti orúkọ ọja ni a fi sílẹ̀ gẹ́gẹ́ bí code tàbí orúkọ níbi tó yẹ.

Àwọn commit pàtàkì:
- `8282d95f9f8fc3eb9e56202dee48055f813a4473`
- `cd2f72a00ce459dcbde1037424d7796ec3acf22d`

## Ìmúdájú ìkẹyìn

- 258/258 message keys.
- Kò sí key tó sọnù tàbí tó pọ̀ ju.
- Gbogbo `{placeholder}` set bá English contract mu gangan.
- Kò sí semantic truncation tó fura.
- Exact matches pẹ̀lú Hausa àti Igbo kere; kò sí àmì fallback tó gbòòrò.
- `/about/` ní stable ID 29 gangan ní ìtòlẹ́sẹẹsẹ kan náà pẹ̀lú semantic master, láìsí duplicate.
- Semantic tables ní ìlà 19 àti 9.
- Gbogbo formula/hash/literal tí a gbọ́dọ̀ pa mọ́ ṣì wà.
- Targeted English technical prose scan mọ́.

## Gates tó ṣì ṣí

Fáìlì yìí **kò fi hàn** pé a ti ṣàyẹ̀wò gbogbo ojúlé nínú LLM session míì tí gbogbo ìjíròrò rẹ̀ wáyé ní Yorùbá. Nítorí náà `linguistic QA` tí a gbọ́dọ̀ ṣe ṣì ṣí.

Render QA gidi fún desktop àti 390 px mobile, accessibility, PWA/offline àti language switching náà ṣì kù.

## Ipo

Ọrọ̀, UI àti semantic contract ti ṣetan fún gate tó tẹ̀lé. Ipo tó tọ́ báyìí ni **semantic QA**, kì í ṣe `linguistic QA`.
