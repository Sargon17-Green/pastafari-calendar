# Esperanto QA — meza stato de la tuta retejo

## Amplekso

La kontrolo kovras `eo` en la tuta retejo, ne nur `/about/`: ĉefa UI, datoserĉo, tago de laboro, komparo, jarvido, inversa serĉo, eraroj kaj statoj, uzantgvidilo, footer, metadata, manifest kaj ARIA/alirebleca teksto.

## Korektoj

- Aldonitaj kvar mankantaj contract keys.
- Restarigita la plena nuna signifo en `search.intro`, `settings.intro`, `guide.1.body`, `guide.4.body`, `guide.5.body` kaj `guide.6.body`.
- Queried day/date estis unuigitaj kiel `pridemandita tago/dato`.
- Forigita la restanta angla teknika miksaĵo en `/about/`: rejection sampling/modulo bias, all-day, miksita Seer-prozo, deployment/endpoints kaj generic injectivity.

## Fina kontrolo

- 258/258 message keys.
- Neniu mankanta aŭ ekstra key.
- Ĉiuj `{placeholder}`-aroj kongruas kun la angla contract.
- Neniu suspektinda semantika mallongigo.
- `/about/` havas ĝuste 29 stable ID-ojn en la sama ordo kiel la semantic master, sen duoblaĵoj.
- La du tabeloj havas 19 kaj 9 vicojn.
- Neniu neintencita hebrea teksto.
- La celita English technical prose scan estas pura.
- Devigaj formuloj, hashes kaj literals restas netuŝitaj, inter ili `Q=2^{127}-1`, `R=\\operatorname{SAVE}(S+149r)`, `47\\times123=5781`, `5781-5778=3`, `RRULE:FREQ=YEARLY`, `F(c+T,t+T)=F(c,t)`, `14{,}777{,}149` kaj `8e155fa4198ea7bcfeb16138ac5d6662706f4d93`.

## Malfermitaj pordegoj

Ĉi tiu dosiero **ne pruvas**, ke la tuta retejo estis reviziita en aparta LLM-session, kies konversacio mem estis plene en Esperanto. Tial la deviga `linguistic QA`-pordego restas malfermita.

Ankaŭ ankoraŭ mankas vera render QA sur desktop kaj 390 px mobile, accessibility, PWA/offline kaj language switching.

## Stato

La teksto, UI kaj semantic contract pretas por la sekva pordego. La ĝusta nuna stato estas **semantic QA**, ne `linguistic QA`.
