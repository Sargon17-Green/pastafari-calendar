# Føroyskt QA — øll heimasíðan

## Uppgávan í hesum málumfarinum

Arbeiðið bara á føroyskum. Lesið allan sjónligan tekst á Pastafari-kalendarasíðuni fyri locale `fo-FO`, ikki bara greinina `/about/`. Leitið serliga eftir:
- donskum, enskum ella øðrum óætlaðum málsligum leivdum;
- setningum, sum kunnu skiljast, men ljóða sum beinleiðis umseting heldur enn natúrligt føroyskt;
- ósamsvarandi orðalagi millum høvuðsviðmótið, brúkaravegleiðingina, afturleitingina, ársvísingina og `/about/`;
- skeivum bendingum, samsvari, stýring, orðarað, stavseting og teknseting;
- manglandi message key í mun til enska sáttmálan;
- broyttum `{placeholder}`;
- brotnum stable section ID, formlum, hash, API-nøvnum ella veruligum kanoniskum nøvnum.

Tekstur skal ikki góðkennast bara tí hann er skiljandi. Hann skal lesa sum ein sjálvstøðug og natúrlig føroysk útgáva. Verulig algoritmisk nøvn, vørunøvn, API/CLI-identifikatorar og koduliteral kunnu standa í upprunaligum líki; vanlig teknisk prosa skal vera á føroyskum.

## Funnið í fyrsta umfari

Upprunaliga `fo-FO` locale var nógv blandað við donskum. Áðrenn umvæling vóru 138 virði orðað akkurát sum í danska locale-inum. Harumframt vóru nógv hybridformuleringar, har føroyskar endingar vóru lagdar inn í danskar setningar, til dømis:
- `Gå til dagursetningsøgning`;
- `Sådan brúkari du heimasíðaet`;
- `Skift arbejdsdaguren`;
- `Dage i koteletten {cutletName}`;
- `Året på et øjeblik`;
- `Beregningen sker på din enhed`.

Hetta fevndi um høvuðsviðmótið, gerðardagsstillingar, samanbering, kalendarainntak, hjálpartekst, ársvísing, brúkaravegleiðing, footer og nógv av teimum umsetiligu kanonisku nøvnunum.

Fýra lyklar manglaðu eisini í mun til enska message contract:
- `app.brand`;
- `reverse.error.limitPositive`;
- `reverse.error.limitSafeInteger`;
- `reverse.error.absoluteDateField`.

## Umvæling av øllum locale-inum

Viðmótið varð skrivað av nýggjum á føroyskum og samskipað við orðalagið í greinini. Meginorðini eru nú:
- `gerðardagur` fyri day of working/action day;
- `spurnardagur` fyri queried/target day;
- `dagfesting`;
- `útrokning`;
- `samanbering`;
- `kotelett`;
- `mánaður`.

Tilsamans vórðu 164 locale-virði broytt, og teir fýra manglandi lyklarnir vórðu lagdir afturat.

Eisini vórðu týdningarmiklir upplýsingar, sum vóru dotnir burtur í gamla tekstinum, endurreistir. Brúkaravegleiðingin sigur nú greitt, at „Aftur til í dag“ stillar bæði leitingina og gerðardagin aftur, og at seinni leitingar halda fram at brúka valda gerðardagin, til hann verður stillaður aftur.

Umsetiligu kanonisku merkingarnøvnini vórðu eisini reinsað fyri donskum. Dømi:
- `Bronze` → `Bronsa`;
- `Ræv` → `Revur`;
- `Nyre` → `Nýra`;
- `Hvede` → `Hveiti`;
- `Flod` → `Á`;
- `Den tomme krukke` → `Tóma krukkan`;
- `Granatæble` → `Granatepli`;
- `Spindel` → `Snælda`;
- `Kobber` → `Kopar`;
- `Æggeblomme` → `Eggjareyði`;
- `Sølv` → `Silvur`;
- `Æsel` → `Asni`;
- `Fortrydelse` → `Iðran`;
- `Dråbe` → `Dropi`;
- `Port` → `Portur`.

Verulig sernøvn og altjóða identitetir, t.d. `Lagash`, `Akkad`, `Uruk`, `Palgurash`, `Karshumav`, `Meiji`, `Baktun`, `Saka` og `Minguo`, vórðu ikki broytt.

## Málrøkt av /about/

Greinin var merkingarliga fullfíggjað, men serliga teknisku partarnir høvdu nógv vanligt enskt orðalag. Tað varð umskrivað til føroyskt, m.a.:
- `canonical` → `kanoniskur`;
- `specification` → `forskrift`;
- `implementation` → `íverkseting`;
- `deterministic` → `deterministiskur`;
- `selection space` → `valrúm`;
- `probability theorem` → `sannlíkindasetningur`;
- `physical moment` → `fysisk løta`;
- `generic injectivity` → `injektivitetur í almenna førinum`;
- `generic invertibility` → `vendiligheit í almenna førinum`;
- `side information` → `eyka upplýsingar`;
- `computational core` → `útrokningarkjarni`;
- `affine periodicity` → `affin periodisitetur`;
- `absolute address` → `absoluttur bústaður`.

Vanlig enskt tekniskt orðalag í Seer-partinum varð eisini føroyskað. Endpoint-nøvnini `date`, `now`, `range`, `batch`, `year` og `reverse`, umframt API/CLI/OpenAPI/SIMD og vørunavnið `Pastafarian Calendar Seer`, standa tó eftir sum verulig teknisk nøvn.

Fyri astronomiska orðalagið varð ikki funnin ein greið, væl dokumenterað føroysk standardtermur fyri enska `topocentric lower meridian transit`. Tí varð eingin ógrundað „føroysk faktermur“ uppfunnið. Í staðin brúkar greinin eina beinleiðis og neyva lýsing: `toposentriska niðara meridianpasseringin hjá miðdeplinum á Venus um staðbundna meridianin`.

## Serlig ID-villa, sum QA fann

Undir málrøktini varð `all-day` í vanligari prosa føroyskað. Ein ov breið tekstútskifting rakti samstundis stable deep-link ID-ið og broytti:
`travel-and-all-day` → `travel-and-heil-dags`.

Hetta varð funnið av samanberingini móti teimum 29 canonical ID-unum og beinanvegin rættað aftur til `travel-and-all-day`. Eftir rættingina varð øll ID-røðin samanborin aftur við semantic master.

## Endaligar tekstkanningar

- Enska message contract hevur 258 lyklar; allir eru beinleiðis til staðar í føroyska locale-inum.
- Einki `{placeholder}`-sett víkir frá enska sáttmálanum.
- Málrættað leiting eftir donskum orðalagi í viðmótinum gevur eingi óætlað úrslit.
- 32 virði eru framvegis eins og í danska locale-inum; tey eru sernøvn, altjóða heiti, formatstrengir ella orð, sum lógliga eru eins í báðum málum, t.d. `Horn`, `Tin`, `Milt`, `Nineve`, `Sesam`, `Salt`.
- `/about/` hevur júst somu 29 stable ID í júst somu raðfylgju sum semantic master; eingi duplicate ID eru.
- Tær báðar merkingarligu talvurnar hava 19 og 9 røðir.
- Allar kravdar formlar, hash, tøl og koduliteral eru varðveitt.
- Eingin óætlaður hebraiskur tekstur er í føroysku greinini.
- Endalig málrættað leiting eftir vanligari enskari tekniskari prosa er rein.

## Støða

Merkingarligt og málsligt tekst-QA er liðugt. Visuelt/render-QA og endalig støða `PASS` eru framvegis ein serstakur næsti táttur.
