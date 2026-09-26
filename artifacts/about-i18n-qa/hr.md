# Hrvatski QA — međustanje cijelog web-mjesta

## Opseg

Pregled obuhvaća `hr-HR` na cijelom web-mjestu, ne samo `/about/`: glavno sučelje, pretraživanje datuma, dan djelovanja, usporedbu, godišnji prikaz, obrnuto pretraživanje, pogreške i stanja, korisnički vodič, footer, metadata, manifest i ARIA/pristupačnost.

## Ispravci i provjera

- Dodana su četiri nedostajuća contract keya.
- Vraćena je potpuna semantika u `search.intro`, `settings.intro` i ključnim dijelovima vodiča.
- Queried day/date ujednačeni su kao `upitani dan` / `upitani datum`.
- U `/about/` uklonjeni su preostali engleski tehnički izrazi u običnom tekstu.
- 258/258 message keys; svi `{placeholder}` skupovi odgovaraju engleskom ugovoru.
- `/about/` ima točno 29 stable ID-jeva u istom redoslijedu kao semantic master, bez duplikata.
- Tablice imaju 19 i 9 redaka.
- Obvezne formule, hash-evi i literali ostali su netaknuti.

## Otvorene faze

Ovaj zapis ne dokazuje obvezni same-language LLM session na hrvatskom. `linguistic QA`, stvarni render QA, accessibility, PWA/offline i language switching ostaju otvoreni.

## Status

Ispravan trenutni status je **semantic QA**.
