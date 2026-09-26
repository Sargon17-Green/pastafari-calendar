# QA català — estat intermedi de tot el lloc

## Abast

La revisió cobreix `ca-ES` a tot el lloc, no només `/about/`: interfície principal, cerca de dates, dia d'acció, comparació, vista anual, cerca inversa, errors i estats, guia d'ús, footer, metadata, manifest i textos ARIA/accessibilitat.

## Troballa principal

La versió inicial era una barreja extensa de català i castellà, no només un cas de vocabulari compartit. Hi havia formes inequívocament castellanes en la interfície principal, les ajudes, la vista anual i fins i tot els noms de croquetes i mesos.

S'han reescrit 201 valors de la capa pública en català coherent, inclosos:
- cerca, opcions i comparació;
- calendaris d'entrada i ajudes;
- errors i navegació;
- vista anual;
- guia d'ús i footer;
- terminologia de cerca inversa;
- noms de croquetes, mesos i comptadors.

La coincidència exacta amb el locale castellà ha baixat fins a 24 valors llargs, compatibles amb noms internacionals o formes legítimament compartides; no hi ha indicis de fallback ampli.

## Semàntica

- 258/258 message keys.
- S'han afegit les quatre claus que faltaven.
- Tots els conjunts `{placeholder}` coincideixen amb el contracte anglès.
- No hi ha abreujaments semàntics sospitosos.
- Queried day s'ha unificat com `dia consultat`.
- La guia conserva el dia Pastafari actual, la ubicació activa de l'observador, el límit astronòmic basat en Venus de `ASTRONOMICAL-DAY.md`, el restabliment de cerca/dia d'acció i la persistència d'un dia d'acció triat manualment.

## `/about/`

S'ha eliminat la barreja tècnica anglesa: `canonical`, `implementation`, `rejection sampling`, `modulo bias`, `all-day`, el bloc Seer mixt, `reverse conversion`, `affine periodicity`, `generic injectivity`, `generic invertibility`, `side information` i altres restes.

Els literals reals d'API i els noms de producte es mantenen quan correspon.

## Verificació final

- Exactament 29 stable ID en el mateix ordre que el semantic master, sense duplicats.
- Taules de 19 i 9 files.
- Sense text hebreu accidental.
- L'escaneig dirigit de prosa tècnica anglesa és net.
- Fórmules, hash i literals obligatoris intactes, inclosos `Q=2^{127}-1`, `R=\\operatorname{SAVE}(S+149r)`, `47\\times123=5781`, `5781-5778=3`, `RRULE:FREQ=YEARLY`, `F(c+T,t+T)=F(c,t)`, `14{,}777{,}149` i `8e155fa4198ea7bcfeb16138ac5d6662706f4d93`.

## Portes obertes

Aquest fitxer **no demostra** que tot el lloc s'hagi revisat en una sessió LLM separada en què la conversa mateixa fos íntegrament en català. Per tant, la porta obligatòria de `linguistic QA` continua oberta.

També resten el render QA real en desktop i 390 px mobile, accessibility, PWA/offline i language switching.

## Estat

El text, la UI i el contracte semàntic estan preparats per a la porta següent. L'estat correcte ara és **semantic QA**, no `linguistic QA`.
