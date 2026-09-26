# QA en català — tot el lloc

## Instrucció d'aquest cicle lingüístic

Treballeu exclusivament en català. Reviseu tot el text visible del Pastafari Calendar per al locale `ca-ES`, no només l'article `/about/`. Busqueu activament:

- restes involuntàries de castellà, anglès o qualsevol altra llengua;
- sintaxi poc natural, calcs i text que soni traduït en lloc d'escrit originalment en català;
- incoherències terminològiques entre la interfície principal, la guia d'ús, la vista de l'any, la cerca inversa i `/about/`;
- errors de gènere, nombre, preposicions, apostrofació, accents, puntuació o ortografia;
- claus de locale absents que puguin provocar fallback a l'anglès durant l'execució;
- canvis en `{placeholder}`, fórmules, identifiers, hashes, nombres fixos o noms canònics;
- traduccions accidentals dels stable HTML ID i dels deep links.

No aproveu un text només perquè s'entengui. Ha de sonar com si hagués estat redactat des del principi en català natural. Cal conservar els noms algorítmics, els noms d'API i els identifiers reals, però la prosa tècnica ordinària ha de ser catalana.

## Troballes

El locale inicial no era simplement poc polit: estava barrejat extensament amb castellà. La comparació directa amb `es-ES` va detectar 127 valors idèntics i 67 cadenes amb indicis clars de castellà o d'hibridació, entre les quals:

- `Elige un calendari, introduce una data y pulsa...`;
- `El dia de trabajo es el punto de partida del cálculo`;
- `No hay registro, inicio de sesión...`;
- `Croqueta siguiente`, `Volver a avui`;
- fragments sencers de la vista anual i de la guia escrits majoritàriament en castellà.

La reparació ha estat global, no una substitució de poques paraules. S'han reescrit en català la cerca, les opcions de càlcul, la comparació, les entrades de calendaris, els errors, la navegació, la vista anual, la guia i el peu de pàgina.

També faltaven quatre claus que podien provocar fallback a l'anglès:

- `app.brand`;
- `reverse.error.limitPositive`;
- `reverse.error.limitSafeInteger`;
- `reverse.error.absoluteDateField`.

Ara totes tenen valor català explícit. La terminologia de la cerca inversa s'ha harmonitzat amb la resta del lloc: `dia de treball` s'ha substituït per `dia d'acció`.

## Noms canònics i decisions lèxiques

Els noms de croquetes i mesos també contenien formes castellanes. S'han revisat individualment a partir del significat canònic, sense inventar nous conceptes. Entre altres:

- `Zorro` → `Guineu`;
- `Riñón` → `Ronyó`;
- `Trigo` → `Blat`;
- `Río` → `Riu`;
- `Cuerno` → `Banya`;
- `Arcilla` → `Argila`;
- `Granada` → `Magrana`;
- `Costilla` → `Costella`;
- `Cobre` → `Coure`;
- `Harina` → `Farina`;
- `Arena` → `Sorra`.

Per a `papyrusSedge`, una font botànica catalana de la Universitat de Barcelona dona `papir` com a nom vulgar de *Cyperus papyrus*; per això s'ha adoptat `Papir`.

En el relat dels ancoratges, `Tablets` s'ha traduït com `Taules`, no `Tauletes`: tant el DIEC/Optimot com la Bíblia Catalana Interconfessional fan servir `les taules de Moisès / de la Llei` i `dues taules de pedra`.

## Article /about/

L'article era semànticament complet però encara contenia molta prosa tècnica anglesa ordinària: `canonical`, `implementation`, `rejection sampling`, `modulo bias`, `physical moment`, `generic injectivity`, `side information`, `computational core`, `search problem`, `cold wake`, `precomputation` i moltes expressions semblants.

Els apartats tècnics s'han reescrit com a prosa catalana completa. Entre les decisions principals:

- `rejection sampling` → `mostreig per rebuig`;
- `modulo bias` → `biaix modular`;
- `generic injectivity` → `injectivitat genèrica`;
- `generic invertibility` → `invertibilitat genèrica`;
- `side information` → `informació auxiliar`;
- `computational core` → `nucli computacional`;
- `affine periodicity` → `periodicitat afí`;
- `physical moment` → `instant físic`;
- `all-day` en prosa → `de dia complet`, mantenint `all-day` només quan és el nom literal de l'indicador;
- `precomputation` → `precàlcul`.

Els noms `Short Choice`, `Wide Choice`, `SAVE`, `Pastafarian Calendar Seer`, els endpoints HTTP i els identifiers de codi s'han conservat.

La definició de la frontera del dia s'ha redactat com el «pas topocèntric del centre de Venus pel ram inferior del meridià local», evitant un calc ambigu i mantenint exactament la geometria astronòmica requerida.

## Verificacions després de la reparació

- El locale té 336 claus de missatge i cobreix totes les claus de l'anglès.
- Tots els conjunts de `{placeholder}` coincideixen exactament amb el contracte anglès.
- `/about/` conté exactament 29 stable ID, sense cap ID absent, extra o duplicat.
- Les dues taules semàntiques conserven 19 + 9 files de cos.
- Es conserven totes les fórmules, el hash, els nombres fixos i els identifiers obligatoris.
- No queda prosa tècnica anglesa ordinària en el text visible de l'article.
- La comparació amb el castellà encara troba algunes formes idèntiques legítimes —per exemple `Mes`, `Era`, `Meiji`, `Lagash`, `Plata` o `Sal`—, però no frases castellanes residuals.

## Estat

La QA semàntica i lingüística del text està completada. El `PASS` final continua bloquejat fins que es pugui executar un render-smoke real en desktop i a 390 px.
