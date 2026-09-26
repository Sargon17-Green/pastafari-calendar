# Frysk QA — de hiele webside

## Opdracht yn dizze QA-sesje

Wurkje allinnich yn it Frysk. Lês alle sichtbere tekst fan de Pastafaryske kalinderside foar locale `fy-NL`, net allinnich it artikel `/about/`. Sykje benammen nei:
- Nederlânske, Ingelske of oare ûnbedoelde taalresten;
- sinnen dy't wol te begripen binne, mar as rjochtstreekse oersetting klinke ynstee fan natuerlik Frysk;
- ûngelyk terminologygebrûk tusken de haadside, ynstellingen foar de hannelingsdei, ferliking, jierwerjefte, help, omkearde sykfunksje en `/about/`;
- ferkearde grammatika, wurdfolchoarder, bûging, stavering en ynterpunksje;
- ûntbrekkende message keys of feroare `{placeholder}`;
- brutsen stable section-ID's, formules, hashes, API-nammen of echte kanonike nammen.

In tekst wurdt net goedkard allinnich om't er begryplik is. Hy moat lêze as in selsstannige Fryske ferzje. Echte algoritmyske nammen, produktnammen, API/CLI-identifikatoaren en koadeliteralen meie yn har oarspronklike foarm stean; gewoane technyske proaza moat Frysk wêze.

## Earste befiningen

It oarspronklike `fy-NL`-locale wie foar in grut part mei Nederlânsk fermongen. In eardere brede skjinmakronde hie it measte dêrfan al ferfongen, mar de hiele-side-kontrôle fûn noch ferskate dúdlike resten:
- `Ga naar datum sykje`;
- `Kalinder voor invoer`;
- `Terug naar hjoed`;
- `Fergeliking bijwerken`;
- `Fergeliking uitgelijnd per dei`;
- `{count} deien · werkdei: {actionDate}`;
- `Terug naar sykje en kalinder`.

Dy teksten binne ferfongen troch natuerlik Frysk, ûnder oaren `Gean nei datumsykjen`, `Kalinder foar ynfier`, `Werom nei hjoed`, `Ferliking bywurkje` en `{count} dagen · hannelingsdei: {actionDate}`.

## Terminology fan de hiele side

De wichtichste funksjonele termen binne no troch de side hinne op inoar ôfstimd:
- `hannelingsdei` foar de day of working/action day;
- `frege dei` foar de queried/target day;
- `datum`;
- `berekkening`;
- `ferliking`;
- `kotelet`;
- `moanne`.

De brede locale-kontrôle befettet ek de kalinder-ynfier, jierwerjefte, omkearde sykfunksje, brûkershelp, flaters, laadstatus en footer. De doelbewuste syktocht nei karakteristike Nederlânske resten jout no gjin treffers mear.

## Taalrêding fan /about/

It artikel wie semantysk folslein, mar in grut part fan de technyske proaza wie noch Ingelsk of heal-Ingelsk. Dat is op 'e nij formulearre yn Frysk. Foarbylden:
- `canonical` → `kanonyk / kanonike`;
- `specification` → `spesifikaasje`;
- `deterministic` → `deterministysk`;
- `selection space` → `karromte`;
- `computational sample` → `berekkeningsstekproef`;
- `probability theorem` → `kânsstelling`;
- `recurrence coordinates` → `werhellingskoördinaten`;
- `physical moment` → `fysyk momint`;
- `absolute address` → `absolút adres`;
- `generic injectivity` → `generike ynjektiviteit`;
- `generic invertibility` → `generike ynvertibiliteit`;
- `side information` → `sydynformaasje`;
- `computational core` → `berekkeningskearn`;
- `asymptotic structure` → `asymptotyske struktuer`;
- `affine periodicity` → `affine periodisiteit`.

Ek is in echte taalflater ferbettere: `hoefolle net gelyk te wêzen` is korrizjearre ta `hoeven net gelyk te wêzen`.

Foar de astronomyske dei-oergong brûkt it artikel in krekte Fryske beskriuwing: `toposintryske legere meridiaanpassaazje fan it sintrum fan Fenus oer de lokale meridiaan`. De planeetnamme `Fenus` is normaal Frysk gebrûk. Dêrneist binne `time zone`, `daylight saving time` en lokaasjetermen ferfongen troch `tiidsône`, `simmertiid` en Fryske formulearrings.

## Bewust behâlden technyske nammen

De folgjende foarmen binne net as taalresten behannele, om't se echte technyske of kanonike identifikatoaren binne:
- `Short Choice`;
- `Wide Choice`;
- `SAVE`;
- `day-id`;
- `RRULE:FREQ=YEARLY`;
- `Pastafarian Calendar Seer`;
- Node API, CLI, HTTP v1, OpenAPI 3.1 en SIMD;
- endpoint-nammen lykas `date`, `now`, `range`, `batch`, `year`, `reverse`, `metadata`, `locales` en `status`;
- de operasjonele term `cold wake`.

Dêr't sokke nammen yn rinnende proaza steane, binne se safolle mooglik eksplisyt as koadeterm of technyske namme markearre, sadat se net lykje op fergetten Ingelsk.

## Kontrôles fan kontrakt en struktuer

- It Ingelske message contract hat 258 berjochtkaaien; alle 258 binne ek yn `fy-NL` oanwêzich.
- Gjin `{placeholder}`-set ferskilt fan it Ingelske contract.
- De doelbewuste syktocht nei Nederlânske UI-resten jout gjin ûnbedoelde treffers.
- 53 locale-wearden binne noch tekstueel gelyk oan it Nederlânske locale. Dat binne benammen eigennammen, ynternasjonale termen, koarte formaten of wurden dy't yn beide talen itselde skreaun wurde. De iennige langere identike gewoane formulearring dy't de kontrôle útwiisde, `Bekende absolute datum`, is ek jildich Frysk.
- `/about/` hat deselde 29 stable ID's yn deselde folchoarder as de Hebriuwske semantic master; der binne gjin dûbele ID's.
- De twa semantyske tabellen hawwe respektivelik 19 en 9 rigen.
- Alle ferplichte formules, fêste sifers, commit hash en koadeliteralen binne bewarre.
- Der is gjin ûnbedoeld Hebriuwsk yn it Fryske artikel.
- Nei it fuortheljen fan koadeliteralen en echte technyske nammen jout de doelsyktocht nei gewoane Ingelske technyske proaza gjin ûnbedoelde treffers. It wurd `side`, dat by automatyske Ingelsk-sykjen noch opdûkt, is gewoan it Fryske wurd foar “page”.

## Status

Semantyske en taalkundige tekst-QA fan it hiele locale is klear. Visuele/render-QA en de definitive status `PASS` binne noch in apart folgjend stadium.
