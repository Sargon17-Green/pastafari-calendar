# QA italiana — stato intermedio dell’intero sito

## Ambito della revisione

Questa revisione copre il locale `it-IT` nell’intero sito, non soltanto l’articolo `/about/`: interfaccia principale, ricerca della data, giorno di lavoro, confronto, vista annuale, ricerca inversa, errori e stati, guida utente, footer, metadata, manifest e testi ARIA/accessibilità.

L’articolo `/about/` è stato inoltre letto integralmente per individuare prosa inglese non intenzionale, calchi poco naturali, incoerenze terminologiche e alterazioni di formule, identificatori o altri elementi canonici.

## Problemi trovati

Il locale italiano aveva quattro chiavi mancanti rispetto al contratto inglese:

- `app.brand`;
- `reverse.error.limitPositive`;
- `reverse.error.limitSafeInteger`;
- `reverse.error.absoluteDateField`.

`manifest.defaultDescription` era ancora interamente in inglese.

Il confronto semantico delle 258 stringhe ha inoltre individuato omissioni reali, non rilevabili dal solo conteggio delle chiavi:

- `search.intro` non diceva che il giorno pastafariano corrente viene precompilato;
- `settings.intro` ometteva che, per impostazione predefinita, il sito usa il giorno corrente determinato per la posizione attiva dell’osservatore;
- `guide.1.body` aveva perso la determinazione automatica del giorno corrente e il confine astronomico descritto in `ASTRONOMICAL-DAY.md`;
- `guide.4.body` non spiegava che «Torna a oggi» reimposta sia la ricerca sia il giorno di lavoro;
- `guide.5.body` non spiegava che le ricerche successive continuano a usare il giorno di lavoro scelto fino al ripristino.

È stata anche corretta un’incoerenza terminologica diffusa fra `giorno interrogato`, `giorno obiettivo`, `giorno richiesto` e `giorno cercato`. Per il concetto generale è ora usato in modo coerente `giorno richiesto`, con formulazioni contestuali naturali dove serve.

## Pulizia linguistica dell’articolo

La prosa dell’articolo era già in gran parte italiana, ma conservava diversi anglicismi o calchi tecnici non necessari, fra cui `bias`, `all-day`, `deployment`, `hosted production`, `provider`, `query`, `restart`, `servizio live`, oltre a formulazioni poco naturali come «la conversione inversa è molto forte», «informazioni laterali», «identità canonico-semantica» e «genericamente lo stato conserva».

Questi passaggi sono stati riscritti in italiano naturale senza cambiare la semantica. Gli identificatori reali, come `date`, `now`, `batch`, `range`, `year`, `reverse`, `metadata`, `locales`, `status`, `cold wake`, le sigle API/HTTP/OpenAPI/CLI/SIMD/SLA e i nomi `Short Choice`, `Wide Choice` e `Pastafarian Calendar Seer`, restano tali dove sono effettivamente nomi o literal tecnici.

Le modifiche principali di questo passaggio sono nei commit `5b6020e32becf824ec7c3801c887fdd0d455a182`, `c013a0e87c7e762c42f0b7d1c8f946553094eca7` e `8e58955ff24fb45923d981ee15011669bda7d78e`.

## Verifiche dopo le correzioni

- Il contratto inglese contiene 258 message key e il locale italiano contiene tutte e 258, senza chiavi mancanti o aggiuntive.
- Tutti gli insiemi `{placeholder}` coincidono esattamente con il contratto inglese.
- Le verifiche per lunghezza e numero di frasi non segnalano più omissioni semantiche sospette nelle stringhe lunghe.
- `/about/` conserva esattamente 29 stable ID, nello stesso ordine del semantic master, senza duplicati.
- Le due tabelle semantiche hanno 19 e 9 righe.
- Sono invariati formule, hash, numeri e literal obbligatori, compresi `Q=2^{127}-1`, `R=\\operatorname{SAVE}(S+149r)`, `47\\times123=5781`, `5781-5778=3`, `RRULE:FREQ=YEARLY`, `F(c+T,t+T)=F(c,t)`, `14{,}777{,}149` e `8e155fa4198ea7bcfeb16138ac5d6662706f4d93`.
- Nell’articolo non compare testo ebraico non intenzionale.
- La scansione mirata finale non trova prosa inglese ordinaria residua nei passaggi controllati.
- Le coincidenze residue con altri locali romanzi sono nomi propri, termini internazionali o parole legittimamente identiche, non evidenza di testo spagnolo o francese copiato.

## Gate ancora aperti

Questa revisione **non soddisfa ancora** il requisito finale secondo cui il QA linguistico deve essere eseguito da un LLM in una conversazione/lota separata che si svolga interamente in italiano. La presente conversazione non è una sessione italiana separata, e il fatto che questo record sia scritto in italiano non prova il contrario.

Restano inoltre da eseguire il render QA reale su desktop e 390 px mobile e i gate finali per accessibilità, PWA/offline, cambio lingua e integrazione.

## Stato

Il testo e il contratto semantico sono pronti per il gate successivo. Lo stato corretto è quindi **semantic QA**, non `linguistic QA`, finché non viene eseguita la sessione LLM separata in italiano. `rendered` e `PASS` restano preclusi fino al completamento dei rispettivi gate.
