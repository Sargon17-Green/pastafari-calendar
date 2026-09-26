# Dansk QA — mellemstatus for hele webstedet

## Omfang

Gennemgangen dækker `da-DK` på hele webstedet, ikke kun `/about/`: hoved-UI, datosøgning, arbejdsdag, sammenligning, årsvisning, omvendt søgning, fejl og tilstande, brugervejledning, footer, metadata, manifest og ARIA-/tilgængelighedstekst.

## Rettelser

- Fire manglende contract keys blev tilføjet.
- Den fulde betydning blev gendannet i `search.intro`, `settings.intro`, `guide.1.body`, `guide.4.body`, `guide.5.body` og `guide.6.body`.
- Queried day/date blev harmoniseret som `forespurgt dag/dato`.
- Resterende engelsk teknisk blanding i `/about/` blev fjernet, bl.a. `rejection sampling`, almindeligt `all-day`-sprog og blandet Seer-prosa.

## Verifikation

- 258/258 message keys.
- Ingen manglende eller ekstra keys.
- Alle `{placeholder}`-sæt matcher den engelske kontrakt.
- Ingen mistænkelige semantiske forkortelser.
- `/about/` har præcis 29 stable ID'er i samme rækkefølge som semantic master, uden dubletter.
- De to tabeller har 19 og 9 rækker.
- Ingen utilsigtet hebraisk tekst.
- Målrettet scan for English technical prose er rent.
- Eksakte overlap med svensk og bokmål er begrænsede nok til ikke at indikere bred fallback.
- Obligatoriske formler, hashes og literals er bevaret, herunder `Q=2^{127}-1`, `R=\\operatorname{SAVE}(S+149r)`, `47\\times123=5781`, `5781-5778=3`, `RRULE:FREQ=YEARLY`, `F(c+T,t+T)=F(c,t)`, `14{,}777{,}149` og `8e155fa4198ea7bcfeb16138ac5d6662706f4d93`.

## Åbne gates

Denne fil **beviser ikke**, at hele webstedet er gennemgået i en separat LLM-session, hvor samtalen selv blev ført fuldt ud på dansk. Den obligatoriske `linguistic QA`-gate er derfor stadig åben.

Reel render QA på desktop og 390 px mobile, accessibility, PWA/offline og language switching mangler også stadig.

## Status

Tekst, UI og semantic contract er klar til næste gate. Korrekt status nu er **semantic QA**, ikke `linguistic QA`.
