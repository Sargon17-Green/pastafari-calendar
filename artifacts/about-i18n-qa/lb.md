# Lëtzebuergesch QA — Tëschestand fir de ganze Site

## Ëmfang

Dës Iwwerpréiwung betrëfft `lb-LU` um ganze Site an net nëmmen `/about/`: Haaptinterface, Datumssich, Aktiounsdag, Verglach, Joeresbléck, Réckwärtssich, Feeler- a Statusmeldungen, Benotzerhandbuch, Footer, Metadata, Manifest an ARIA-/Accessibilitéitstexter.

D'`/about/`-Säit gouf komplett gelies a kontrolléiert op däitsch oder englesch Reschter, Iwwersetzungsprosa, inkonsequent Terminologie an op d'Erhale vun de kanoneschen techneschen Elementer.

## Ausgangszoustand

D'Locale war däitlech mat Däitsch vermëscht. Beim direkte Verglach mam däitsche Locale waren am Ufank 115 Wäerter exakt identesch, dorënner komplett UI-Sätz wéi:

- `Wie benutze ich diese Website?`
- `So benutzt du diese Website`
- `Welchen Dag möchtest du finden?`
- `Wähle einen Kalenner ...`
- `Die Berechnungsengine wurde nicht geladen`
- eng grouss Zuel vu Kalennernimm, Feelertexter, Joeres- an Guide-Texter.

Ausserdeem huet de Locale véier message keys aus dem englesche Kontrakt net gehat:

- `app.brand`
- `reverse.error.limitPositive`
- `reverse.error.limitSafeInteger`
- `reverse.error.absoluteDateField`

`manifest.defaultDescription` war komplett op Englesch.

## Semantesch Lücken

Nieft der Sproochvermëschung waren och reell Inhaltsdeeler fortgelooss:

- `search.intro` huet net gesot, datt den aktuelle Pastafari-Dag standardméisseg viragefëllt ass;
- `settings.intro` huet net erkläert, datt de Standard-Aktiounsdag den aktuelle Pastafari-Dag fir déi aktiv Observateursplaz ass;
- `guide.1.body` huet d'automatesch Bestëmmung vum aktuellen Dag, d'astronomesch Dagsgrenz aus `ASTRONOMICAL-DAY.md` an de Fakt verluer, datt keen Datum un e Berechnungsserver geschéckt gëtt;
- `guide.4.body` huet net erkläert, datt „Zeréck op haut“ d'Sich an den Aktiounsdag zerécksetzt;
- `guide.5.body` huet net erkläert, datt en manuell gewielten Aktiounsdag fir déi nächst Siche bestoe bleift.

Dës Inhalter goufen erëm hiergestallt.

## Terminologie

D'Interface huet `Dag der Ausführung`, `Berechnungsdag`, `Aktiounsdag` an `Zieltag` gemëscht. Fir d'Konzeptioun vum Site gouf elo konsequent:

- day of working — `Aktiounsdag`;
- queried day — `gefroten Dag`.

## UI- a Lexikorrektur

Eng grouss Partie vun den däitschen UI-Fallbacks gouf op Lëtzebuergesch ersat. Och vill kloer däitsch Kalennerelementer an Terminologiewäerter goufen lokaliséiert, z. B. `Fuuss`, `Nier`, `Véier Deeler vun Néng`, `Skorpioun`, `Äschen`, `Weess`, `Floss`, `Laachen`, `Leem`, `Granatapel`, `Ielebou`, `Zännpasta`, `Niwwel`, `Wierook`, `Rëpp`, `Buer`, `Eegiel`, `Stär`, `Hunneg`, `Kalleksteen`, `Freed`, `Fräsch`, `Luucht`, `Genéck`, `Sëlwer`, `Stuerm`, `Iesel`, `Miel`, `Zong`, `Bir`, `Bou`, `Grënnungsdag`, `Aktiounszuel`, `Ufroenzuel`, `Zommzuel`, `Schossel`, `Drëps` a `Paart`.

Nom Botzen bleiwen 37 exakt Matches mam däitsche Locale. Dës enthalen haaptsächlech:
- Proper names an international Nimm wéi `Pastafari`, `Meiji`, `Taishō`, `Umm al-Qura`, `Minguo`, `Lagash`, `Akkad`, `Eridu`, `Babylon`;
- Formater wéi `{number}. {name}`, `JDN {jdn}`;
- verschidde Wierder, déi tëscht Däitsch a Lëtzebuergesch gläich kënne sinn;
- e puer lexikalesch Eenheetsnimm, déi am separate lëtzebuergesche LLM-Sproochgate nach gezielt iwwerpréift musse ginn.

Dofir gëtt dëse Punkt net als ofgeschlossene linguistic QA duergestallt.

## `/about/` Botzen

D'Säit hat eng breet däitsch-englesch Mëschung mat Ausdréck wéi `canonical specification`, `selection space`, `rejection sampling`, `modulo bias`, `computational sample`, `physical moment`, `all-day`, `reverse conversion`, `generic injectivity`, `side information`, `finite exact arithmetic check`, `canonical week system` an enger bal komplett englesch-technescher Seer-Passage.

Dës Passagë goufen op Lëtzebuergesch ëmgeschriwwen. Nimm a wierklech technesch Literalen (`Short Choice`, `Wide Choice`, `Pastafarian Calendar Seer`, API/HTTP/OpenAPI/CLI/SIMD/SLA, Endpoint-Literalen a `cold wake`) bleiwen do, wou se als Numm oder literal gehéieren.

Haapt-Commits:
- `c16760b110babe43aa486701762c0cfe2c0091f1`
- `ac2cd8e76e482965295823bba553b5cc67d2321a`
- `c9acba7f295b8712d59022ba485cfca4dad4db63`

## Verifikatioun nom Botzen

- Den englesche message contract huet 258 keys; `lb-LU` huet all 258.
- Et gi keng feelend oder zousätzlech message keys.
- All `{placeholder}`-Sätz stëmme genee mam englesche Kontrakt iwwereneen.
- D'Längt- a Sazheuristik weist keng verdächteg semantesch Ofkierzung méi.
- Déi al gemëschte Kärterminologie `Dag der Ausführung`, `Berechnungsdag`, `Zieltag` ass aus dem relevante UI verschwonnen.
- `/about/` huet genee 29 stable IDen an der selwechter Reiefolleg wéi de semantic master, ouni Duplikater.
- Déi zwou semantesch Tabelle hunn 19 an 9 Zeilen.
- Et gëtt keen ongewollten hebräeschen Text am Artikel.
- Déi gezielte Sich no normaler englescher technescher Prosa ass propper.
- Déi obligatoresch Formelen, Hashen an Literale bleiwen onverännert: `Q=2^{127}-1`, `R=\\operatorname{SAVE}(S+149r)`, `47\\times123=5781`, `5781-5778=3`, `RRULE:FREQ=YEARLY`, `F(c+T,t+T)=F(c,t)`, `14{,}777{,}149`, `8e155fa4198ea7bcfeb16138ac5d6662706f4d93`.

## Nach oppe Gates

Dës Datei ass **kee Beweis**, datt de Site an enger separater LLM-Sessioun kontrolléiert gouf, an där d'Gespréich selwer komplett op Lëtzebuergesch leeft. Dat ass nach ëmmer en obligatoresche separate Gate.

Och de richtege Render-QA um Desktop an op 390 px Mobile, Accessibilitéit, PWA/offline a Sproochewiessel sinn nach net ofgeschloss.

## Status

De semanteschen a mechanesche Kontrakt ass prett fir de nächste Gate. Den aktuelle Status ass dofir **semantic QA**, net `linguistic QA`. Déi nach gläich däitsch/lëtzebuergesch oder lexikalesch onsécher Eenheetsnimm musse beim separaten lëtzebuergesche LLM-Review nach bewosst iwwerpréift ginn.
