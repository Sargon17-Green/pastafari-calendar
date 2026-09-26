# Srpski QA — međustanje celog sajta

## Obuhvat

Pregled pokriva `sr-Latn-RS` na celom sajtu, ne samo `/about/`: glavni UI, pretragu datuma, dan radnje, poređenje, prikaz godine, obrnutu pretragu, greške i stanja, korisnički vodič, footer, metadata, manifest i ARIA/pristupačnost.

## Ključni nalaz

Početna datoteka bila je gotovo u potpunosti hrvatski fallback. Pre popravke bilo je 275 dužih vrednosti potpuno identičnih hrvatskom locale-u, uz očigledne hrvatske oblike kao `djelovanja`, `točka`, `usporedba`, `računalu`, `poslužitelju`, `mjesec`, `duljina`, `sljedeći`, `natrag`, `prije`, `lijevi`, `rješenja` i druge.

## Popravka UI-ja

Prepisano je 176 javnih vrednosti na srpski latinicom, uključujući:
- glavni interfejs;
- pretragu i podešavanja;
- poređenje;
- kalendarske pomoći;
- greške i navigaciju;
- godišnji prikaz;
- korisnički vodič;
- footer;
- imena kotleta i meseci;
- terminologiju brojača;
- deo obrnute pretrage koji je imao hrvatske/bosanske oblike.

Terminologija je ujednačena na `dan radnje` i `upitani dan`.

Dodate su četiri nedostajuće ugovorne tipke:
- `app.brand`
- `reverse.error.limitPositive`
- `reverse.error.limitSafeInteger`
- `reverse.error.absoluteDateField`

Vraćen je i izgubljeni smisao u `search.intro`, `settings.intro`, `guide.1.body`, `guide.4.body`, `guide.5.body` i `guide.6.body`.

## Odnos prema hrvatskom

Posle popravke broj potpuno identičnih dužih vrednosti sa hrvatskim pao je sa 275 na 147.

Preostale podudarnosti obuhvataju veliki broj legitimno zajedničkih srpsko-hrvatskih oblika, naročito:
- nazive i međunarodne termine;
- kratke UI oznake;
- identične standardne formulacije;
- oblike koji su potpuno pravilni i u srpskom.

Poseban strogi leksički sken za tipične hrvatske oblike sada je čist. Dve preostale sigurne greške u obrnutoj pretrazi, `Mjesec` i `Dan u mjesecu`, dodatno su ispravljene u `Mesec` i `Dan u mesecu`.

## `/about/`

Članak je imao opsežnu englesku tehničku mešavinu: `canonical`, `specification`, `implementation`, `rejection sampling`, `modulo bias`, `engine commit`, `all-day`, Seer blok, `reverse conversion`, `affine periodicity`, `generic injectivity`, `generic invertibility`, `side information`, `finite exact arithmetic check` i druge izraze.

Tekst je očišćen samo u text nodes; HTML oznake, atributi, stable ID-jevi i `code` literali nisu menjani.

Glavni commit-i:
- UI: `6c49468c430545d7daa0e5f8b25520440a7e1b5a`
- članak: `32ba98af81f54e08c72152a9e15b81ef7ab5bf0f`
- završne korekcije: `f80398c88e301b2ae6202b59415886c5c47d0a95`, `44657fa71b063bd28fc8668629b48b5ab2ca2d35`

## Završna provera

- 258/258 message keys.
- Nema nedostajućih ili dodatnih ugovornih ključeva.
- Svi `{placeholder}` skupovi tačno odgovaraju engleskom ugovoru.
- Nema sumnjivih semantičkih skraćenja.
- Strogi sken hrvatskih oblika je čist.
- `/about/` ima tačno 29 stable ID-jeva u istom redosledu kao semantic master, bez duplikata.
- Semantičke tabele imaju 19 i 9 redova.
- Nema nenamernog hebrejskog teksta.
- Ciljani sken obične engleske tehničke proze je čist.
- Obavezne formule, hash-evi i literali su očuvani, uključujući `Q=2^{127}-1`, `R=\\operatorname{SAVE}(S+149r)`, `47\\times123=5781`, `5781-5778=3`, `RRULE:FREQ=YEARLY`, `F(c+T,t+T)=F(c,t)`, `14{,}777{,}149` i `8e155fa4198ea7bcfeb16138ac5d6662706f4d93`.

## Otvorene kapije

Ovaj fajl **ne dokazuje** da je ceo sajt pregledan u posebnoj LLM sesiji čiji je razgovor vođen potpuno na srpskom. Obavezni `linguistic QA` zato ostaje otvoren.

Takođe još nisu završeni stvarni render QA za desktop i 390 px mobile, accessibility, PWA/offline i language switching.

## Status

Tekst, UI i semantički ugovor spremni su za sledeću kapiju. Tačan trenutni status je **semantic QA**, ne `linguistic QA`.
