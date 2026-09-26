# Bokmål-QA — mellomstatus for hele nettstedet

## Omfang

Denne gjennomgangen dekker `nb-NO` på hele nettstedet, ikke bare `/about/`: hovedgrensesnitt, datosøk, arbeidsdag, sammenligning, årsvisning, omvendt søk, feil og statuser, brukerhåndbok, footer, metadata, manifest og ARIA-/tilgjengelighetstekster.

`/about/` ble lest i sin helhet med aktiv leting etter engelsk, dansk, svensk eller nynorsk lekkasje, oversettelsespreg, terminologisk inkonsistens og endringer i kanoniske tekniske elementer.

## Funn og rettelser

Lokalet manglet de samme fire message key-ene som flere eldre locale-filer:
- `app.brand`
- `reverse.error.limitPositive`
- `reverse.error.limitSafeInteger`
- `reverse.error.absoluteDateField`

`manifest.defaultDescription` var på engelsk.

Det manglet også semantisk innhold i `search.intro`, `settings.intro`, `guide.1.body`, `guide.4.body`, `guide.5.body` og `guide.6.body`. Tekstene er nå tilbakeført med:
- gjeldende Pastafari-dag som standardverdi;
- aktiv observatørposisjon;
- Venus-baserte daggrenser fra `ASTRONOMICAL-DAY.md`;
- korrekt tilbakestilling via «Tilbake til i dag»;
- at en valgt arbeidsdag brukes videre til den tilbakestilles.

UI-termen `måldag` ble erstattet med naturligere `forespurt dag` der det gjaldt queried day.

## Forholdet til Nynorsk

En direkte strengsammenligning viser fortsatt 172 identiske verdier mellom `nb` og `nn`. Dette tallet er ikke i seg selv bevis på feil i Bokmål, fordi norsk målform deler mange navn, tekniske termer og korte UI-former, og det er også mulig at `nn`-fila senere må vurderes for Bokmål-fallback.

En egen målrettet skanning av `nb` etter tydelige nynorskformer som `ikkje`, `kva`, `korleis`, `frå`, `desse`, `deira`, `berre`, `vert`, `sjølv`, `utan`, `månad`, `veke` og `utrekning` er ren.

Den endelige vurderingen av alle tvilstilfeller hører likevel hjemme i den separate Bokmål-språksamtalen.

## `/about/`

De få tydelige engelske restene ble ryddet:
- `rejection sampling` / modulo-bias ble formulert på norsk;
- `engine-commit` ble naturliggjort;
- vanlig tekst med `all-day` ble erstattet med heldagsformuleringer;
- Seer-avsnittet ble ryddet og faktiske endpoint-literal ble lagt i `code`;
- `måldag` i omvendt konvertering og sammendrag ble erstattet med «dagen det spørres om».

Hoved-commits:
- `8ef69411eb2190f680347037ae0e3690ecf97cea`
- `2fbaf2a65306cde75422930449a95fc6c7de4238`

## Kontroll etter retting

- 258/258 message keys.
- Ingen manglende eller ekstra message keys.
- Alle `{placeholder}`-sett samsvarer nøyaktig med den engelske kontrakten.
- Ingen mistenkelige semantiske forkortelser i lange meldinger.
- Ingen tydelige nynorsk-leksikalske treff i Bokmål-UI-et.
- `/about/` har nøyaktig 29 stable ID-er i samme rekkefølge som semantic master, uten duplikater.
- De to semantiske tabellene har 19 og 9 rader.
- Ingen utilsiktet hebraisk tekst.
- Målrettet søk etter vanlig engelsk teknisk prosa er rent.
- Obligatoriske formler, hash-er og literal er uendret, blant annet `Q=2^{127}-1`, `R=\\operatorname{SAVE}(S+149r)`, `47\\times123=5781`, `5781-5778=3`, `RRULE:FREQ=YEARLY`, `F(c+T,t+T)=F(c,t)`, `14{,}777{,}149` og `8e155fa4198ea7bcfeb16138ac5d6662706f4d93`.

## Åpne porter

Denne filen **beviser ikke** at hele nettstedet er vurdert i en separat LLM-samtale som selv foregår på Bokmål. Det obligatoriske `linguistic QA`-kravet er derfor fortsatt åpent.

Render-QA på desktop og 390 px mobile, accessibility, PWA/offline og language switching er heller ikke ferdig.

## Status

Tekst, UI og semantisk kontrakt er klare for neste port. Riktig status nå er **semantic QA**, ikke `linguistic QA`.
