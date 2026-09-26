# Nynorsk-QA — mellomstatus for heile nettstaden

## Omfang

Denne gjennomgangen dekkjer `nn-NO` på heile nettstaden, ikkje berre `/about/`: hovudgrensesnitt, datosøk, handlingsdag, samanlikning, årsvising, omvendt søk, feil og statusar, brukarrettleiing, footer, metadata, manifest og ARIA-/tilgjengelegheitstekstar.

`/about/` vart lese i sin heilskap med aktiv leiting etter Bokmål- og engelskrester, omsetjingspreg, inkonsekvent terminologi og endringar i kanoniske tekniske element.

## Utgangstilstanden

Locale-fila var tydeleg hybrid mellom Nynorsk og Bokmål. Før oppryddinga var 172 verdiar identiske med Bokmål, og mange lengre UI-setningar inneheldt klare Bokmål-former som `Tilgjengelig`, `Hver`, `samme`, `beregning`, `måned`, `fortsatt`, `uten`, `Hvete`, `Misunnelse` og liknande.

Det mangla òg fire message keys:
- `app.brand`
- `reverse.error.limitPositive`
- `reverse.error.limitSafeInteger`
- `reverse.error.absoluteDateField`

`manifest.defaultDescription` var engelsk.

## UI og semantikk

Den sentrale UI-en vart skriven om til Nynorsk. Mellom anna vart:
- `arbeidsdag` harmonisert til `handlingsdag`;
- queried day harmonisert til `spørjedag`;
- `beregning` til `utrekning`;
- `måned` til `månad`;
- `Tilgjengelig` til `Tilgjengeleg`;
- `hver/samme/bare/uten` erstatta med `kvar/same/berre/utan` der dei var Bokmål-former.

Semantisk innhald som mangla i `search.intro`, `settings.intro`, `guide.1.body`, `guide.4.body`, `guide.5.body` og `guide.6.body` vart òg gjenoppretta: noverande Pastafari-dag som standard, aktiv observatørposisjon, Venus-basert dagsgrense frå `ASTRONOMICAL-DAY.md`, korrekt reset og at ein valt handlingsdag blir brukt vidare.

Nokre tydelege Bokmål-former i kalendernamn vart òg retta, til dømes `Kveite`, `Den tomme krukka`, `Olboge`, `Misunning`, `Kopar`, `Den lukka døra` og `Mjøl`.

## Forholdet til Bokmål

Etter oppryddinga er talet på heilt identiske verdiar mot Bokmål redusert frå 172 til 118. Ein separat streng skann etter tydelege Bokmål-former som `ikke`, `fra`, `bare`, `uten`, `fortsatt`, `hver`, `samme`, `måned`, `dager`, `beregning`, `tilgjengelig`, `hvete`, `misunnelse`, `kobber` osv. er no rein.

Dei 118 attverande identiske verdiane består i stor grad av:
- eigennamn og internasjonale termar;
- korte format;
- ord og uttrykk som faktisk kan vere like i begge målformer.

Den endelege vurderinga av alle slike tilfelle høyrer til den separate Nynorsk-LLM-gaten.

## `/about/`

Artikkelen hadde omfattande engelsk teknisk blanding: `canonical specification`, `selection space`, `rejection sampling`, `engine commit`, `all-day`, Seer-avsnittet, `reverse conversion`, `affine periodicity`, `generic injectivity`, `side information`, `computational history` og fleire andre.

Desse vart skrivne om i Nynorsk berre i text nodes; HTML-taggar, attributt, stable ID-ar og `code`-literal vart ikkje rørte.

Hovud-commits:
- `391eda5acd569dc7fc22c6e579c8f547a529e698`
- `2b11f164f3b8506fd50207ca8920365dcc7297fb`
- `ff035fb339e0eae258763b3eea0ac58e0e95063b`

## Verifikasjon etter retting

- 258/258 message keys.
- Ingen manglande eller ekstra message keys.
- Alle `{placeholder}`-sett samsvarar nøyaktig med den engelske kontrakten.
- Ingen mistenkjelege semantiske forkortingar i lange meldingar.
- Ingen treff på den strenge Bokmål-leksikalske skannen.
- `/about/` har nøyaktig 29 stable ID-ar i same rekkjefølgje som semantic master, utan duplikat.
- Dei to semantiske tabellane har 19 og 9 rader.
- Ingen utilsikta hebraisk tekst.
- Målretta søk etter vanleg engelsk teknisk prosa er reint.
- Obligatoriske formlar, hash-ar og literal er uendra, mellom anna `Q=2^{127}-1`, `R=\\operatorname{SAVE}(S+149r)`, `47\\times123=5781`, `5781-5778=3`, `RRULE:FREQ=YEARLY`, `F(c+T,t+T)=F(c,t)`, `14{,}777{,}149` og `8e155fa4198ea7bcfeb16138ac5d6662706f4d93`.

## Opne portar

Denne fila **beviser ikkje** at heile nettstaden er vurdert i ei eiga LLM-samtale som sjølv går fullstendig på Nynorsk. Den obligatoriske `linguistic QA`-porten er framleis open.

Render-QA på desktop og 390 px mobile, accessibility, PWA/offline og language switching er heller ikkje ferdig.

## Status

Tekst, UI og semantisk kontrakt er klare for neste port. Rett status no er **semantic QA**, ikkje `linguistic QA`.
