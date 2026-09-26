# Bosanski QA — međustanje cijele stranice

## Obuhvat

Pregled pokriva `bs-BA` na cijeloj stranici, ne samo `/about/`: glavni UI, pretragu datuma, dan djelovanja, poređenje, prikaz godine, obrnutu pretragu, greške i stanja, korisnički vodič, footer, metadata, manifest i ARIA/pristupačnost.

## Važan jezički nalaz

Bosanski i hrvatski dijele veliki dio standardnog rječnika, pa visok broj potpuno jednakih poruka sam po sebi nije dokaz fallbacka. Zato je urađen poseban pregled oblika koji su u ovom kontekstu izrazito hrvatski.

Pronađeni su i zamijenjeni oblici poput `usporedba`, `točka`, `računalo`, `zaslon`, `odaberite`, `prijestupni`, `duljina`, `Natrag` i `Poveznica`. Istovremeno su zadržani valjani bosanski ijekavski oblici kao `rješenje`, `lijevi`, `sljedeći`, `djelovanja` i slični.

## Semantičke popravke

- Dodane su četiri nedostajuće ugovorne tipke.
- Obnovljen je puni smisao u `search.intro`, `settings.intro`, `guide.1.body`, `guide.4.body`, `guide.5.body` i `guide.6.body`.
- Queried day ujednačen je kao `upitani dan`.
- Terminologija poređenja i prikaza prilagođena je bosanskom standardu.

## `/about/`

Uklonjene su preostale engleske tehničke formulacije: `rejection sampling`, `all-day`, miješani Seer blok, `reverse conversion`, `generic injectivity` i `generic invertibility`. Stvarni API literali ostali su u `code`.

## Završna provjera

- 258/258 message keys.
- Nema nedostajućih ili dodatnih ključeva.
- Svi `{placeholder}` skupovi odgovaraju engleskom ugovoru.
- Nema sumnjivih semantičkih skraćenja.
- Poseban pregled izrazito hrvatskih oblika je čist.
- Velik broj preostalih podudaranja s hrvatskim odnosi se na legitimno zajedničke oblike.
- `/about/` ima tačno 29 stable ID-jeva u istom redoslijedu kao semantic master, bez duplikata.
- Tabele imaju 19 i 9 redova.
- Nema nenamjernog hebrejskog teksta.
- Ciljani pregled engleske tehničke proze je čist.
- Obavezne formule, hash-evi i literali sačuvani su, uključujući `Q=2^{127}-1`, `R=\\operatorname{SAVE}(S+149r)`, `47\\times123=5781`, `5781-5778=3`, `RRULE:FREQ=YEARLY`, `F(c+T,t+T)=F(c,t)`, `14{,}777{,}149` i `8e155fa4198ea7bcfeb16138ac5d6662706f4d93`.

## Otvorene kapije

Ovaj fajl **ne dokazuje** da je cijela stranica pregledana u posebnoj LLM sesiji čiji je razgovor u potpunosti vođen na bosanskom. Obavezni `linguistic QA` zato ostaje otvoren.

Stvarni render QA na desktopu i 390 px mobile, accessibility, PWA/offline i language switching također još nisu završeni.

## Status

Tekst, UI i semantički ugovor spremni su za sljedeću kapiju. Ispravan trenutni status je **semantic QA**, ne `linguistic QA`.
