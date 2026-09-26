# Lietuvių QA — tarpinė visos svetainės būsena

## Apimtis

Ši peržiūra apima `lt-LT` visoje svetainėje, ne vien `/about/`: pagrindinę sąsają, datos paiešką, veikimo dieną, palyginimą, metų rodinį, atvirkštinę paiešką, klaidas ir būsenas, naudotojo vadovą, footer, metadata, manifest ir ARIA / prieinamumo tekstus.

`/about/` perskaitytas visas, aktyviai ieškant anglų, lenkų ar rusų kalbos likučių, vertimo kalbos, terminų nenuoseklumo ir netyčinių kanoninių techninių elementų pakeitimų.

## Rasti trūkumai

Lietuvių locale trūko keturių anglų message contract raktų:

- `app.brand`;
- `reverse.error.limitPositive`;
- `reverse.error.limitSafeInteger`;
- `reverse.error.absoluteDateField`.

`manifest.defaultDescription` buvo likęs anglų kalba.

Taip pat buvo realių semantinių sutrumpinimų:

- `search.intro` nepasakė, kad dabartinė Pastafari diena į laukus įrašoma pagal numatytąją nuostatą;
- `settings.intro` nepaaiškino, kad numatytoji veikimo diena yra dabartinė Pastafari diena, nustatyta aktyviai stebėtojo vietai;
- `guide.1.body` buvo praradęs automatinį dabartinės dienos nustatymą, `ASTRONOMICAL-DAY.md` apibrėžtą Veneros astronominę dienos ribą ir faktą, kad data nesiunčiama į skaičiavimo serverį;
- `guide.4.body` nepaaiškino, kad „Grįžti į šiandieną“ iš naujo nustato ir paiešką, ir veikimo dieną;
- `guide.5.body` nepaaiškino, kad pasirinkta veikimo diena lieka naudojama vėlesnėse paieškose, kol neatstatoma dabartinė diena.

## Terminija

Sąsajoje tas pats day-of-working konceptas buvo vadinamas ir `veikimo diena`, ir `skaičiavimo diena`, o queried day — `klausiama diena`, `tikslinė diena` arba `užklausta diena`. Terminija suvienodinta:

- day of working — `veikimo diena`;
- queried day — `užklausta diena`.

## `/about/` kalbos valymas

Straipsnyje buvo likusių angliškų techninių fragmentų, pvz. `rejection sampling`, `engine commit`, `all-day`, Seer aprašymo mišri anglų kalba, `reverse conversion`, `generic injectivity`, `generic invertibility` ir `side information`.

Šie fragmentai perrašyti lietuviškai, o tikri API identifikatoriai, kodiniai literalai ir vardai palikti nepakeisti ten, kur jie iš tikrųjų yra vardai ar techninio kontrakto dalis.

Pagrindiniai commit:
- `dfa2b2524907462eae3411794f043f66368d4879`
- `ed671a20829dce9bc3a639645358537212724e56`

## Patikra po pataisymų

- Anglų message contract turi 258 raktus ir lietuvių locale turi visus 258.
- Nėra trūkstamų ar perteklinių message key.
- Visi `{placeholder}` rinkiniai tiksliai sutampa su anglų contract.
- Ilgų eilučių ilgio ir sakinių heuristika neberodo įtartinų semantinių sutrumpinimų.
- Ankstesni terminai `skaičiavimo diena`, `klausiama diena`, `tikslinė diena` atitinkamuose UI tekstuose nebeliko.
- Sutapimai su lenkų ar rusų locale apsiriboja tikriniais vardais, tarptautiniais terminais, formatais ar teisėtai sutampančiomis formomis; plataus fallback požymių nėra.
- `/about/` turi tiksliai 29 stable ID ta pačia tvarka kaip semantic master ir be dublikatų.
- Dvi semantinės lentelės turi 19 ir 9 eilutes.
- Straipsnyje nėra netyčinio hebrajiško teksto.
- Tikslinė įprastos angliškos techninės prozos paieška yra švari.
- Nepakeisti privalomi literalai ir formulės, įskaitant `Q=2^{127}-1`, `R=\\operatorname{SAVE}(S+149r)`, `47\\times123=5781`, `5781-5778=3`, `RRULE:FREQ=YEARLY`, `F(c+T,t+T)=F(c,t)`, `14{,}777{,}149` ir `8e155fa4198ea7bcfeb16138ac5d6662706f4d93`.

## Dar atviri vartai

Šis failas **neįrodo**, kad visą svetainę peržiūrėjo atskiras LLM seansas, kurio pats pokalbis vyko vien lietuviškai. Dabartinis pokalbis nėra toks atskiras lietuviškas seansas, todėl `linguistic QA` vartai dar atviri.

Taip pat dar neatlikti tikras desktop ir 390 px mobile render QA, accessibility, PWA/offline ir language switching vartai.

## Būsena

Tekstas, UI ir semantinis kontraktas parengti kitam etapui. Dabartinė tinkama būsena yra **semantic QA**, o ne `linguistic QA`.
