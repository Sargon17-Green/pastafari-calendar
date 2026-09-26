# Suomen QA — koko sivuston välitila

## Laajuus

Tarkistus kattaa `fi-FI`-kielisen koko sivuston, ei vain `/about/`-sivua: pääkäyttöliittymän, päivähaun, työpäivän, vertailun, vuosinäkymän, käänteisen haun, virheet ja tilat, käyttöoppaan, footerin, metadatan, manifestin sekä ARIA-/saavutettavuustekstit.

## Korjaukset

- Neljä puuttuvaa contract keytä lisättiin.
- Täysi nykyinen merkitys palautettiin kohtiin `search.intro`, `settings.intro`, `guide.1.body`, `guide.4.body`, `guide.5.body` ja `guide.6.body`.
- Queried day/date yhdenmukaistettiin muotoon `kysytty päivä / kysytty päivämäärä`.
- `/about/`-tekstistä poistettiin jäljellä ollut tarpeeton englannin sekoitus: rejection sampling, all-day sekä Seer-jakson deployment/endpoint/hosted production -ilmaukset. Varsinaiset API-literalit säilytettiin `code`-muodossa.

## Lopullinen tarkistus

- 258/258 message keys.
- Ei puuttuvia tai ylimääräisiä avaimia.
- Kaikki `{placeholder}`-joukot vastaavat englanninkielistä contractia.
- Ei epäilyttäviä semanttisia lyhennyksiä.
- Täsmälliset yhtäläisyydet viron ja ruotsin kanssa ovat vähäisiä eivätkä viittaa laajaan fallbackiin.
- `/about/` sisältää täsmälleen 29 stable ID:tä samassa järjestyksessä kuin semantic master, ilman duplikaatteja.
- Taulukoissa on 19 ja 9 riviä.
- Ei tahatonta hepreaa.
- Kohdennettu English technical prose -tarkistus on puhdas.
- Pakolliset kaavat, hashit ja literalit ovat ennallaan, mukaan lukien `Q=2^{127}-1`, `R=\\operatorname{SAVE}(S+149r)`, `47\\times123=5781`, `5781-5778=3`, `RRULE:FREQ=YEARLY`, `F(c+T,t+T)=F(c,t)`, `14{,}777{,}149` ja `8e155fa4198ea7bcfeb16138ac5d6662706f4d93`.

## Avoimet portit

Tämä tiedosto **ei todista**, että koko sivusto olisi tarkistettu erillisessä LLM-sessionissa, jonka keskustelu itsessään käytiin kokonaan suomeksi. Pakollinen `linguistic QA` -portti on siksi edelleen avoin.

Myös todellinen render QA desktopilla ja 390 px mobilessa, accessibility, PWA/offline ja language switching ovat vielä tekemättä.

## Tila

Teksti, UI ja semantic contract ovat valmiit seuraavaan porttiin. Oikea nykyinen tila on **semantic QA**, ei `linguistic QA`.
