# Nederlands QA — tussenstatus voor de hele site

## Reikwijdte

Deze controle bestrijkt `nl-NL` op de hele site, niet alleen `/about/`: hoofdinterface, datumzoeken, werkdag, vergelijking, jaarweergave, omgekeerd zoeken, fouten en statussen, gebruikershandleiding, footer, metadata, manifest en ARIA-/toegankelijkheidsteksten.

Ook `/about/` is volledig gelezen met aandacht voor Engelse, Duitse en Afrikaanse resten, vertaalachtig Nederlands, terminologische inconsistentie en wijzigingen in canonieke technische elementen.

## Contract en semantiek

Aanvankelijk ontbraken vier message keys:
- `app.brand`
- `reverse.error.limitPositive`
- `reverse.error.limitSafeInteger`
- `reverse.error.absoluteDateField`

`manifest.defaultDescription` was nog Engels.

Daarnaast waren belangrijke delen ingekort in `search.intro`, `settings.intro`, `guide.1.body`, `guide.4.body`, `guide.5.body` en `guide.6.body`. De ontbrekende betekenis is hersteld, waaronder:
- de huidige Pastafari-dag als standaardinvoer;
- de actieve waarnemerslocatie;
- de Venus-gebaseerde daggrens uit `ASTRONOMICAL-DAY.md`;
- het terugzetten van zowel zoekopdracht als werkdag;
- het voortzetten van een handmatig gekozen werkdag in latere zoekopdrachten.

De term `doeldag` is waar hij queried day betekende vervangen door `opgevraagde dag`.

## `/about/`

De resterende Engelse technische fragmenten zijn opgeschoond:
- `rejection sampling` / modulo-bias is in gewoon Nederlands uitgelegd;
- gewone tekst met `all-day` is vervangen door formuleringen met gebeurtenissen die de hele dag duren;
- de Seer-paragraaf is opgeschoond, terwijl echte endpoint-literals in `code` zijn behouden;
- `doeldag` in de omgekeerde conversie is vervangen door de opgevraagde dag.

Belangrijkste commits:
- `92c40bfce41632778ee0f3439c19ec21eb02b0d3`
- `aba125da771ac2725f810a3541a408da72512850`

## Controle na correctie

- 258/258 message keys.
- Geen ontbrekende of extra message keys.
- Alle `{placeholder}`-sets komen exact overeen met het Engelse contract.
- Geen verdachte semantische verkortingen in lange berichten.
- Exacte overeenkomsten met Duits zijn beperkt tot eigennamen, internationale termen, formaten en enkele legitiem gelijke vormen.
- Overeenkomsten met Afrikaans zijn talrijker, maar bestaan grotendeels uit echte gedeelde woorden en zeer nabije standaardvormen; er is geen aanwijzing voor een systematische Afrikaanse fallback.
- `/about/` heeft exact 29 stable ID's in dezelfde volgorde als de semantic master, zonder duplicaten.
- De twee semantische tabellen hebben 19 en 9 rijen.
- Geen onbedoelde Hebreeuwse tekst.
- Gerichte controle op gewone Engelse technische proza is schoon.
- Verplichte formules, hashes en literals zijn ongewijzigd, waaronder `Q=2^{127}-1`, `R=\\operatorname{SAVE}(S+149r)`, `47\\times123=5781`, `5781-5778=3`, `RRULE:FREQ=YEARLY`, `F(c+T,t+T)=F(c,t)`, `14{,}777{,}149` en `8e155fa4198ea7bcfeb16138ac5d6662706f4d93`.

## Nog openstaande gates

Dit bestand **bewijst niet** dat de hele site is beoordeeld in een afzonderlijke LLM-sessie waarvan het gesprek zelf volledig in het Nederlands plaatsvond. De verplichte `linguistic QA`-gate blijft dus open.

Ook echte render-QA op desktop en 390 px mobile, accessibility, PWA/offline en language switching zijn nog niet afgerond.

## Status

Tekst, UI en semantisch contract zijn klaar voor de volgende gate. De juiste huidige status is **semantic QA**, niet `linguistic QA`.
