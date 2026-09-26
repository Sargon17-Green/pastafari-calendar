# QA isiZulu — isimo sesikhashana sesayithi lonke

## Ububanzi

Lokhu kuhlola kuhlanganisa `zu-ZA` kusayithi lonke, hhayi `/about/` kuphela: i-UI enkulu, ukusesha usuku, usuku lokusebenza, ukuqhathanisa, ukubuka unyaka, ukusesha okubuyela emuva, amaphutha nezimo, umhlahlandlela womsebenzisi, footer, metadata, manifest nombhalo we-ARIA/ukufinyeleleka.

## Ukulungiswa

Kungezwe ama-message key amane ayengekho:
- `app.brand`
- `reverse.error.limitPositive`
- `reverse.error.limitSafeInteger`
- `reverse.error.absoluteDateField`

Kwalungiswa `manifest.defaultDescription`.

Incazelo eyayilahlekile ibuyiselwe ku-`search.intro`, `settings.intro`, `guide.1.body`, `guide.4.body`, `guide.5.body`, `guide.6.body`: usuku lwamanje lwe-Pastafari njengokufaka okuzenzakalelayo, indawo yomqapheli esebenzayo, umngcele wosuku osekelwe kuVenus ovela ku-`ASTRONOMICAL-DAY.md`, ukusetha kabusha kokusesha nosuku lokusebenza, nokugcina usuku lokusebenza olukhethwe ngesandla ekusesheni okulandelayo.

Queried day ihlanganiswe njenge-`usuku olubuzwayo`.

## `/about/`

Kususiwe English-mixing esele: `rejection sampling`, `modulo bias`, `engine commit`, ukusetshenziswa okuvamile kwe-`all-day`, ingxenye ye-Seer exubile, `reverse conversion`, `affine periodicity`, `generic injectivity`, `generic invertibility` kanye namanye amagama obuchwepheshe.

Ama-API literal angempela namagama emikhiqizo agcinwe njenge-code noma amagama lapho kufanele khona.

Ama-commit abalulekile:
- `e3c957b39d5414f8ba8a7eab7746a6b878fc212c`
- `b045ba5cf0626c64e25d284d65c1eec7323e94e7`

## Ukuqinisekisa kokugcina

- 258/258 message keys.
- Akukho key elilahlekile noma elengeziwe.
- Wonke ama-`{placeholder}` set afana ncamashi ne-English contract.
- Akukho semantic truncation okusolisayo.
- Akukho ukufana okubanzi ne-Xhosa noma i-Sesotho locale; akukho fallback ebanzi.
- `/about/` inama-stable ID angu-29 ncamashi ngendlela efanayo ne-semantic master, ngaphandle kwama-duplicate.
- Ama-semantic table anemigqa engu-19 no-9.
- Wonke ama-formula/hash/literal aphoqelekile agcinwe.
- Targeted English technical prose scan ihlanzekile.

## Ama-gate asavulekile

Leli fayela **aliqinisekisi** ukuthi isayithi lonke lihlolwe ku-LLM session ehlukile lapho ingxoxo yonke yenzeka ngesiZulu. Ngakho i-`linguistic QA` ephoqelekile isavulekile.

I-render QA yangempela ye-desktop ne-390 px mobile, accessibility, PWA/offline kanye ne-language switching nakho kusasele.

## Isimo

Umbhalo, i-UI ne-semantic contract sekulungele i-gate elandelayo. Isimo esilungile manje yi-**semantic QA**, hhayi `linguistic QA`.
