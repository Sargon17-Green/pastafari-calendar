# Svensk QA — mellanstatus för hela webbplatsen

## Omfattning

Granskningen täcker `sv-SE` på hela webbplatsen, inte bara `/about/`: huvudgränssnitt, datumsökning, arbetsdag, jämförelse, årsvisning, omvänd sökning, fel och statusmeddelanden, användarguide, footer, metadata, manifest och ARIA-/tillgänglighetstext.

## Korrigeringar

Fyra kontraktsnycklar saknades:
- `app.brand`
- `reverse.error.limitPositive`
- `reverse.error.limitSafeInteger`
- `reverse.error.absoluteDateField`

`manifest.defaultDescription` var på engelska.

Saknad betydelse återställdes i `search.intro`, `settings.intro`, `guide.1.body`, `guide.4.body`, `guide.5.body` och `guide.6.body`: aktuell Pastafari-dag som standard, aktiv observatörsplats, Venus-baserad daggräns enligt `ASTRONOMICAL-DAY.md`, återställning av både sökning och arbetsdag samt fortsatt användning av manuellt vald arbetsdag.

Queried day har harmoniserats som `efterfrågad dag`, queried date som `efterfrågat datum`.

## `/about/`

De återstående engelska inslagen rensades bort:
- `rejection sampling`;
- vanligt `all-day`-språk;
- blandad engelska i Seer-avsnittet;
- `måldag` ersattes med efterfrågad dag.

Äkta API-literal och produktnamn ligger kvar som kod eller namn där det är relevant.

Huvudcommits:
- `692902d599aef74c94745b212759ad0474e7eae9`
- `930b3d01aa5552d85da9b011344a7c4ee344b1cd`

## Verifiering

- 258/258 message keys.
- Inga saknade eller extra nycklar.
- Alla `{placeholder}`-uppsättningar matchar det engelska kontraktet.
- Inga misstänkta semantiska förkortningar.
- Exakta matchningar med bokmål och danska är begränsade till namn, format och legitimt gemensamma former; inget tecken på brett fallback.
- `/about/` har exakt 29 stable ID i samma ordning som semantic master, utan dubbletter.
- De två tabellerna har 19 respektive 9 rader.
- Ingen oavsiktlig hebreisk text.
- Riktad kontroll av vanlig engelsk teknisk prosa är ren.
- Obligatoriska formler, hash och literal är oförändrade, inklusive `Q=2^{127}-1`, `R=\\operatorname{SAVE}(S+149r)`, `47\\times123=5781`, `5781-5778=3`, `RRULE:FREQ=YEARLY`, `F(c+T,t+T)=F(c,t)`, `14{,}777{,}149` och `8e155fa4198ea7bcfeb16138ac5d6662706f4d93`.

## Öppna gates

Den här filen **bevisar inte** att hela webbplatsen har granskats i en separat LLM-session vars samtal helt och hållet fördes på svenska. Den obligatoriska `linguistic QA`-gaten är därför fortfarande öppen.

Även verklig render QA på desktop och 390 px mobile, accessibility, PWA/offline och language switching återstår.

## Status

Text, UI och semantiskt kontrakt är redo för nästa gate. Korrekt status nu är **semantic QA**, inte `linguistic QA`.
