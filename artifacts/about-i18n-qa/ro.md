# QA română — stare intermediară pentru întregul site

## Domeniu

Revizuirea acoperă `ro-RO` pe întregul site, nu doar `/about/`: interfața principală, căutarea datei, ziua de lucru, comparația, vizualizarea anului, căutarea inversă, erorile și stările, ghidul utilizatorului, footer, metadata, manifest și textele ARIA/accesibilitate.

## Probleme corectate

Lipseau patru chei din contract:
- `app.brand`
- `reverse.error.limitPositive`
- `reverse.error.limitSafeInteger`
- `reverse.error.absoluteDateField`

`manifest.defaultDescription` era în engleză.

Au fost restaurate și informațiile lipsă din `search.intro`, `settings.intro`, `guide.1.body`, `guide.4.body`, `guide.5.body` și `guide.6.body`: ziua Pastafari curentă ca valoare implicită, locația activă a observatorului, limita zilei bazată pe Venus din `ASTRONOMICAL-DAY.md`, resetarea căutării și a zilei de lucru și păstrarea unei zile de lucru alese manual.

Queried day a fost uniformizat ca `zi interogată`, iar queried date ca `data interogată`.

## `/about/`

Au fost eliminate resturile de engleză tehnică obișnuită: `rejection sampling`, `all-day`, formulările mixte din secțiunea Seer, `generic injectivity` și `generic invertibility`. Identificatorii reali ai endpointurilor au rămas în `code`.

Commituri principale:
- `7b14d93c163790cac7d5df0fd343a49287943850`
- `76cfbf724034bcbc818a74fe64953e3c6ab9ed1f`

## Verificare

- 258/258 message keys.
- Nicio cheie lipsă sau suplimentară.
- Toate seturile `{placeholder}` corespund contractului englez.
- Nicio scurtare semantică suspectă.
- Coincidențele exacte cu italiană și franceză sunt limitate la nume, formate și forme legitim comune; nu există semn de fallback larg.
- `/about/` păstrează exact 29 stable ID în aceeași ordine ca semantic master, fără duplicate.
- Cele două tabele au 19 și 9 rânduri.
- Niciun text ebraic accidental.
- Scanarea țintită pentru proză tehnică engleză obișnuită este curată.
- Formulele, hash-urile și literalii obligatorii sunt intacte, inclusiv `Q=2^{127}-1`, `R=\\operatorname{SAVE}(S+149r)`, `47\\times123=5781`, `5781-5778=3`, `RRULE:FREQ=YEARLY`, `F(c+T,t+T)=F(c,t)`, `14{,}777{,}149` și `8e155fa4198ea7bcfeb16138ac5d6662706f4d93`.

## Porți încă deschise

Acest fișier **nu dovedește** că întregul site a fost revizuit într-o sesiune LLM separată a cărei conversație s-a desfășurat integral în română. Poarta obligatorie `linguistic QA` rămâne deschisă.

Mai lipsesc render QA real pe desktop și 390 px mobile, accessibility, PWA/offline și language switching.

## Stare

Textul, UI-ul și contractul semantic sunt pregătite pentru următoarea poartă. Starea corectă acum este **semantic QA**, nu `linguistic QA`.
