# Bosanska QA — cijela stranica

## Uputa korištena za ovaj jezički krug

Radite isključivo na bosanskom. Pregledajte sav vidljivi tekst Pastafari kalendara za locale `bs-BA`, ne samo članak `/about/`. Aktivno tražite:

- hrvatski, srpski, engleski ili drugi nenamjerni jezički ostatak;
- krut, preveden ili neprirodan bosanski izraz i red riječi;
- nedosljednu terminologiju između glavnog interfejsa, korisničkog vodiča, prikaza godine, obrnute pretrage i `/about/`;
- neprirodan oblik riječi, padež, rod, broj, interpunkciju i pravopis;
- nedostajuće locale-ključeve koji bi pri radu mogli pasti nazad na engleski;
- promijenjene `{placeholder}`, formule, identifiers, hash vrijednosti, fiksne brojeve ili kanonske nazive;
- slučajno prevedene stable HTML ID-jeve i deep linkove.

Nemojte odobriti tekst samo zato što je razumljiv. Mora zvučati kao tekst koji je izvorno napisan na prirodnom bosanskom. Stvarna algoritamska imena, API nazive i identifiers treba zadržati, ali običnu tehničku prozu treba pisati bosanski.

## Nalazi

Osnovni bosanski locale nije pokazao sistemsku hrvatsku ili srpsku zamjenu i većina interfejsa bila je prirodna. Mehanička provjera je potvrdila puni skup poruka i ispravne placeholdere, ali je otkriven funkcionalno zastario tekst u nekoliko mjesta:

- `search.intro` nije spominjao da je trenutni Pastafari dan unaprijed popunjen;
- `settings.intro` nije navodio aktivnu lokaciju posmatrača;
- prvi korak vodiča nije objašnjavao astronomsku granicu dana;
- četvrti korak nije navodio da „Nazad na danas” vraća i pretragu i dan djelovanja;
- peti korak nije navodio da naredne pretrage zadržavaju odabrani dan djelovanja do resetovanja.

Sve je usklađeno s aktuelnim funkcionalnim ugovorom i napisano prirodnim bosanskim.

Članak `/about/` bio je semantički potpun, ali je u nekoliko tehničkih odlomaka zadržao običnu englesku prozu. Ispravljeno je, između ostalog:

- `engine commit` → `commit računskog pogona`;
- `corpus` → `korpus`;
- `browser/HTTP client` → `preglednički/HTTP klijent`;
- `native implementations` → `izvorne implementacije`;
- `container deployment` → `postavljanje u kontejneru`;
- `exact query`, `range`, `restart`, `cold wake` u opisnoj prozi → `tačni upiti`, `raspon`, `ponovno pokretanje`, `buđenje nakon mirovanja`;
- `beta/evaluation deployment` i `hosted production service` prepisani su kao prirodna bosanska tehnička proza;
- `precomputation` → `prethodna izračunavanja`.

Nazivi stvarnih HTTP endpointa `date`, `range`, `batch`, `year`, `reverse`, `metadata`, `locales`, `status` nisu prevedeni, nego su označeni kao kod jer su to imena interfejsa, a ne obična proza.

## Provjere

- Svi message-ključevi iz engleskog locale-a imaju bosanske vrijednosti.
- Svi skupovi `{placeholder}` potpuno se podudaraju s engleskim ugovorom.
- `/about/` ima tačno 29 stable ID-jeva, bez dodatnih, nedostajućih ili dupliranih.
- Semantičke tabele zadržavaju 19 + 9 redova tijela.
- Obavezne formule, hash vrijednosti, fiksni brojevi i identifiers ostaju nepromijenjeni.
- Nije pronađena sistemska hrvatska ili srpska jezička zamjena.
- Obična tehnička proza koja nije naziv API-ja ili algoritma prevedena je na bosanski.

## Status

Semantički i jezički QA teksta je završen. Konačni `PASS` ostaje blokiran dok ne bude moguće izvršiti stvarni render-smoke na desktopu i pri širini od 390 px.
