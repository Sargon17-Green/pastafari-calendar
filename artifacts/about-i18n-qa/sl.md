# Slovenski QA — vmesno stanje celotnega spletnega mesta

## Obseg

Pregled zajema `sl-SI` na celotnem spletnem mestu, ne le `/about/`: glavni vmesnik, iskanje datuma, dan dejanja, primerjavo, prikaz leta, obratno iskanje, napake in stanja, uporabniški vodnik, footer, metadata, manifest ter besedila ARIA/dostopnosti.

## Ključna ugotovitev

Začetna datoteka ni bila dosledno slovenska. Velik del glavnega UI-ja, koledarskih imen in terminologije je bil v hrvaščini/srbščini ali hibridu obeh jezikov s slovenščino. Pred popravilom je bilo 133 daljših vrednosti popolnoma enakih hrvaškemu locale in 136 srbskemu.

To ni bila le podobnost sorodnih jezikov: prisotne so bile jasne neslovenske oblike, npr. `Koji dan želite pronaći?`, `Odaberite`, `Dan djelovanja polazišna je točka izračuna`, `Prethodni kotlet`, `Sljedeći kotlet`, `Pšenica`, `Bubreg`, `Bakar`, `Brašno` in podobno.

## Popravilo UI-ja

Glavni uporabniški sloj je bil prepisan v slovenščino, vključno z:
- iskanjem in nastavitvami;
- primerjavo;
- koledarskimi pomočmi;
- napakami in navigacijo;
- letnim prikazom;
- uporabniškim vodnikom;
- footerjem;
- imeni kotletov in mesecev;
- osnovno terminologijo števcev.

Terminologija je poenotena na `dan dejanja` in `poizvedovani dan`.

Dodane so bile tudi štiri manjkajoče pogodbene tipke:
- `app.brand`
- `reverse.error.limitPositive`
- `reverse.error.limitSafeInteger`
- `reverse.error.absoluteDateField`

Vrnjen je bil tudi izgubljeni pomen v `search.intro`, `settings.intro`, `guide.1.body`, `guide.4.body`, `guide.5.body` in `guide.6.body`: trenutni dan Pastafari kot privzeti vnos, aktivna lokacija opazovalca, meja dneva po Veneri iz `ASTRONOMICAL-DAY.md`, ponastavitev iskanja in dneva dejanja ter ohranjanje ročno izbranega dneva dejanja.

## Razmerje do hrvaščine in srbščine

Po popravilu je število popolnoma enakih daljših vrednosti padlo na 49 za hrvaščino in 49 za srbščino.

Preostale enakosti so večinoma:
- lastna imena;
- mednarodni izrazi;
- kratke oblike;
- besede, ki so dejansko enake tudi v slovenščini.

Ločen pregled očitnih hrvaških/srbskih oblik ni več našel dejanskih ostankov; zadetki, kot so `izračuna`, `ponovno`, `zaslonu`, `gumbi` in `klik`, so veljavna slovenska raba.

## `/about/`

Članek je vseboval obsežno angleško tehnično mešanico: `canonical`, `specification`, `rejection sampling`, `engine commit`, `all-day`, celoten mešani blok Seer, `reverse conversion`, `affine periodicity`, `generic injectivity`, `side information`, `finite exact arithmetic check` in druge izraze.

Besedilo je bilo očiščeno samo na ravni text nodes; HTML oznake, atributi, stable ID-ji in `code` literali niso bili spreminjani.

Glavni commiti:
- UI: stanje po prekinitvi je bilo potrjeno na SHA `eceaaffef52793e61fde11296f6601ac76930195`
- članek: `90cfdee3097c8ef142e2cd187dac494260365e36`
- zaključna jezikovna popravila: `069d6152d88a8f2eec1518a9c39a3de25c104244`

## Končno preverjanje

- 258/258 message keys.
- Nobena pogodbena tipka ne manjka in ni odveč.
- Vsi nabori `{placeholder}` se natančno ujemajo z angleško pogodbo.
- Ni sumljivih semantičnih krajšav.
- `/about/` ima natanko 29 stable ID-jev v istem vrstnem redu kot semantic master, brez dvojnikov.
- Semantični tabeli imata 19 in 9 vrstic.
- Ni nenamernega hebrejskega besedila.
- Ciljni pregled običajne angleške tehnične proze je čist.
- Ni znakov poškodovanih HTML oznak ali atributov.
- Obvezni izrazi, formule, hash-i in literali so ohranjeni, med njimi `Q=2^{127}-1`, `R=\\operatorname{SAVE}(S+149r)`, `47\\times123=5781`, `5781-5778=3`, `RRULE:FREQ=YEARLY`, `F(c+T,t+T)=F(c,t)`, `14{,}777{,}149` in `8e155fa4198ea7bcfeb16138ac5d6662706f4d93`.

## Še odprte stopnje

Ta datoteka **ne dokazuje**, da je bil celoten spletni vmesnik pregledan v ločeni LLM-seji, katere pogovor je potekal v celoti v slovenščini. Obvezna stopnja `linguistic QA` zato ostaja odprta.

Prav tako še niso zaključeni dejanski render QA za desktop in 390 px mobile, accessibility, PWA/offline ter language switching.

## Stanje

Besedilo, UI in semantična pogodba so pripravljeni za naslednjo stopnjo. Pravilen trenutni status je **semantic QA**, ne `linguistic QA`.
