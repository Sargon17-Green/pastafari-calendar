# Latviešu QA — visas vietnes starpstāvoklis

## Tvērums

Šī pārbaude aptver `lv-LV` visā vietnē, ne tikai `/about/`: galveno saskarni, datuma meklēšanu, darbības dienu, salīdzinājumu, gada skatu, apgriezto meklēšanu, kļūdas un statusus, lietotāja ceļvedi, footer, metadata, manifest un ARIA/pieejamības tekstus.

`/about/` tika izlasīts pilnībā, meklējot nevajadzīgus angļu, lietuviešu vai krievu valodas atlikumus, tulkojuma stilu, terminoloģijas nekonsekvenci un kanonisko tehnisko elementu izmaiņas.

## Atrastās problēmas

Latviešu locale trūka četru angļu message contract atslēgu:
- `app.brand`
- `reverse.error.limitPositive`
- `reverse.error.limitSafeInteger`
- `reverse.error.absoluteDateField`

`manifest.defaultDescription` bija palicis angļu valodā.

Bija arī semantiski izlaidumi:
- `search.intro` nepieminēja, ka lauki pēc noklusējuma ir aizpildīti ar pašreizējo Pastafari dienu;
- `settings.intro` neizskaidroja, ka noklusējuma darbības diena ir pašreizējā Pastafari diena, kas noteikta aktīvajai novērotāja atrašanās vietai;
- `guide.1.body` bija pazaudējis automātisko pašreizējās dienas noteikšanu, `ASTRONOMICAL-DAY.md` aprakstīto Veneras astronomisko dienas robežu un faktu, ka datums netiek sūtīts aprēķinu serverim;
- `guide.4.body` neizskaidroja, ka “Atgriezties šodienā” atiestata gan meklēšanu, gan darbības dienu;
- `guide.5.body` neizskaidroja, ka izvēlētā darbības diena turpmākajās meklēšanās paliek spēkā līdz atiestatīšanai.

## Terminoloģija

Saskarnē tika sajaukti `aprēķina diena` un `darbības diena`, kā arī `mērķa diena` un `vaicājuma diena`. Terminoloģija tika vienādo­ta:
- day of working — `darbības diena`;
- queried day — `vaicājuma diena`.

## `/about/` valodas tīrīšana

Rakstā bija palikuši angļu tehniskie fragmenti, tostarp `rejection sampling`, `engine commit`, `all-day`, jaukta angļu valoda Seer sadaļā, `reverse conversion`, `generic injectivity`, `generic invertibility` un `side information`.

Tie tika pārrakstīti latviski, saglabājot īstos API identifikatorus, koda literāļus un nosaukumus tur, kur tie tiešām ir līguma vai tehniskā nosaukuma daļa.

Galvenie commit:
- `e0466e16626c9c98a6b09d56cb95a1d27425799f`
- `add98f32726a8f055967a71be8768d88394ad09a`

## Pārbaude pēc labojumiem

- Angļu message contract ir 258 atslēgas, un latviešu locale ir visas 258.
- Nav trūkstošu vai lieku message key.
- Visi `{placeholder}` komplekti precīzi sakrīt ar angļu contract.
- Garuma un teikumu heuristika vairs neuzrāda aizdomīgus semantiskus saīsinājumus.
- Vecie termini `aprēķina diena` un `mērķa diena` attiecīgajos UI tekstos nav palikuši.
- Sakritības ar lietuviešu vai krievu locale aprobežojas ar īpašvārdiem, starptautiskiem terminiem, formātiem vai likumīgi sakrītošām formām; plaša fallback pazīmju nav.
- `/about/` saglabā tieši 29 stable ID tādā pašā secībā kā semantic master, bez dublikātiem.
- Divās semantiskajās tabulās ir 19 un 9 rindas.
- Rakstā nav neparedzēta ebreju teksta.
- Mērķēta parastas angļu tehniskās prozas meklēšana ir tīra.
- Obligātās formulas, hash un literal ir saglabāti, tostarp `Q=2^{127}-1`, `R=\\operatorname{SAVE}(S+149r)`, `47\\times123=5781`, `5781-5778=3`, `RRULE:FREQ=YEARLY`, `F(c+T,t+T)=F(c,t)`, `14{,}777{,}149` un `8e155fa4198ea7bcfeb16138ac5d6662706f4d93`.

## Vēl atvērti vārti

Šis fails **nepierāda**, ka visu vietni ir pārskatījis atsevišķs LLM seanss, kura pati saruna notiek tikai latviešu valodā. Pašreizējā saruna nav šāds atsevišķs latviešu seanss, tāpēc `linguistic QA` vārti vēl ir atvērti.

Nav pabeigts arī īsts desktop un 390 px mobile render QA, accessibility, PWA/offline un language switching QA.

## Statuss

Teksts, UI un semantiskais līgums ir gatavi nākamajam posmam. Pašreizējais korektais statuss ir **semantic QA**, nevis `linguistic QA`.
