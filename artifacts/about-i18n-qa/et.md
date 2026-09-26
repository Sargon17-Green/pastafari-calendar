# Eesti QA — kogu veebisait

## Selle keele läbivaatuse ülesanne

Töötage ainult eesti keeles. Vaadake läbi kogu nähtav tekst Pastafari kalendri veebisaidil locale `et-EE` jaoks, mitte ainult `/about/` artikkel. Otsige aktiivselt:
- soome, inglise või mõne muu soovimatu keele lekkimist;
- arusaadavat, kuid tõlkelist või ebaloomulikku eesti keelt;
- terminoloogilisi vastuolusid põhiliidese, kasutusjuhendi, pöördotsingu, aastavaate ja `/about/` vahel;
- käände-, arvu-, rektsiooni-, sõnajärje-, õigekirja- ja kirjavahemärgivigu;
- ingliskeelse message contract'iga võrreldes puuduvaid võtmeid;
- muutunud `{placeholder}` komplekte;
- rikutud stable section ID-sid, valemeid, hash'e, API nimesid või tegelikke kanoonilisi nimesid.

Teksti ei tohi heaks kiita ainult sellepärast, et sellest saab aru. See peab lugema nagu iseseisev ja loomulik eestikeelne versioon. Tõelised algoritmilised nimed, tootenimed, API/CLI identifikaatorid ja koodilitraalid võivad jääda algkujule; tavaline tehniline proosa peab olema eesti keeles.

## Leitud probleemid

Algne `et-EE` locale oli ulatuslikult soome keelega segunenud. Enne parandamist leidus 128 väärtust, mis olid Soome locale'iga täpselt samad. Osa neist olid õigustatud rahvusvahelised või pärisnimed, kuid suur osa oli selgelt soomekeelne või hübriidne tekst.

Leiti näiteks:
- `Miten tätä sivustoa käytetään?`;
- `Vaihda työpäevä`;
- `Päev {dayInCutlet} leikkeessä {cutletName}`;
- `Vuoden {year} rakenne`;
- `Lataa uudelleen`;
- `Pronssi`, `Munuainen`, `Vehnä`, `Kulho`, `Pisara`, `Portti`;
- `Aasta Viisituhatta maailman luomisesta`.

Saastumine ulatus põhiliidesesse, toimingupäeva seadetesse, võrdlusvaatesse, kalendrisisenditesse, abitekstidesse, aastavaatesse, kasutusjuhendisse, footer'isse ning suuremasse ossa tõlgitavatest kanoonilistest nimedest.

Lisaks puudus neli ingliskeelse message contract'i võtit:
- `app.brand`;
- `reverse.error.limitPositive`;
- `reverse.error.limitSafeInteger`;
- `reverse.error.absoluteDateField`.

## Parandused

Soome- ja hübriidtekst asendati loomuliku eesti keelega kogu locale'is. Kokku muudeti 142 väärtust ning lisati neli puuduvat võtit.

Toimingupäeva termin on nüüd järjekindlalt `toimingupäev` nii liideses kui artiklis. Kuu, kotleti, võrdluse ja aastavaate terminoloogia ühtlustati.

Tõlgitavad kanoonilised semantilised nimed parandati soome keelest eesti keelde. Näiteks:
- `Pronssi` → `Pronks`;
- `Kettu` → `Rebane`;
- `Munuainen` → `Neer`;
- `Vehnä` → `Nisu`;
- `Kulho` → `Kauss`;
- `Pisara` → `Tilk`;
- `Portti` → `Värav`;
- `Tyhjä ruukku` → `Tühi anum`;
- `Värttinä` → `Värten`;
- `Johanneksenleipä` → `Jaanikaun`.

Pärisnimed ja tõelised rahvusvahelised identiteedid, näiteks `Lagash`, `Akkad`, `Uruk`, `Palgurash`, `Karshumav`, `Meiji`, `Taishō`, `Baktun` ja `Minguo`, jäeti muutmata.

## /about/ artikli keeleline parandamine

Artikkel oli semantiliselt täielik, kuid tehnilistes osades oli väga palju tavalist ingliskeelset proosat. See lokaliseeriti süstemaatiliselt. Muu hulgas:
- `canonical` → `kanooniline`;
- `specification` → `spetsifikatsioon`;
- `implementation` → `teostus`;
- `deterministic` → `deterministlik`;
- `selection space` → `valikuruum`;
- `probability theorem` → `tõenäosusteoreem`;
- `physical moment` → `füüsiline hetk`;
- `generic injectivity` → `üldjuhu injektiivsus`;
- `generic invertibility` → `üldjuhu pööratavus`;
- `side information` → `lisateave`;
- `computational core` → `arvutuslik tuumik`;
- `affine periodicity` → `afiinne perioodilisus`;
- `absolute address` → `absoluutne aadress`.

Seeri kirjelduses lokaliseeriti tavapärane tehniline proosa, kuid endpoint-nimed `date`, `now`, `range`, `batch`, `year`, `reverse`, API/CLI nimed ja tootenimi `Pastafarian Calendar Seer` jäeti identifikaatoritena alles.

Astronoomiline termin kontrolliti eraldi. Eesti astronoomiaterminoloogias kasutatakse taevakeha meridiaani läbimise madalaima asendi kohta terminit `alumine kulminatsioon`. Artiklis kasutatakse seetõttu väljendit „Veenuse keskme topotsentriline alumine kulminatsioon kohalikul meridiaanil”, mitte ingliskeelset kalkat.

## Kontrollid pärast parandusi

- Ingliskeelses message contract'is on 258 võtit; kõik need on eesti locale'is sõnaselgelt olemas.
- Ükski `{placeholder}` komplekt ei erine ingliskeelsest lepingust.
- Soome morfoloogiliste markerite sihitud skann ei leia jääke.
- Soome locale'iga jäi täpselt samaks 30 väärtust; need on pärisnimed, rahvusvahelised terminid, vormingustringid või mõlemas keeles õiguspäraselt samad sõnad, näiteks `Savi`, `Tina`, `Ninive`.
- `/about/` artiklis on täpselt samad 29 stable ID-d samas järjekorras nagu semantic master'is; duplikaate pole.
- Semantilistes tabelites on 19 ja 9 rida.
- Kõik kohustuslikud valemid, hash'id, arvulised väärtused ja koodilitraalid on alles.
- Artiklis pole soovimatut heebreakeelset teksti.
- Tavapärase ingliskeelse tehnilise proosa sihitud lõppskann on puhas.

## Staatus

Teksti semantiline ja keeleline QA on lõpetatud. Visuaalne/render QA ja lõplik `PASS` jäävad eraldi järgmisse etappi.
