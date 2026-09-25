# Afrikaans QA — volledige webwerf

## Opdrag wat vir hierdie taalronde gebruik is

Werk uitsluitlik in Afrikaans. Lees die volledige sigbare teks van die Pastafari-kalenderwebwerf vir locale `af-ZA`, nie net die /about/-artikel nie. Soek aktief na:
- Nederlands, Engels of enige ander onbedoelde taal;
- onnatuurlike of vertaalde sinsbou;
- inkonsekwente terminologie tussen die hoofkoppelvlak, gebruikersgids, omgekeerde soektog en /about/;
- verkeerde of onnatuurlike Afrikaanse vakterme;
- ontbrekende locale-sleutels wat runtime-fallback na Engels kan veroorsaak;
- verkeerde plekhouers, getalle, formules, identifiers of kanonieke name.

Moenie 'n teks goedkeur net omdat dit verstaanbaar is nie. Dit moet soos oorspronklike, vlot Afrikaans lees. Behou algoritmiese eiename en identifiers waar hulle werklik name is, maar moenie gewone tegniese prosa onnodig in Engels laat nie.

## Bevindings

Die aanvanklike locale het groot hoeveelhede Nederlandse teks bevat. 'n Direkte vergelyking met die Nederlandse locale het 187 identiese kort waardes gevind; baie daarvan was duidelike Nederlandse oorname, onder meer “Welke dag wil je vinden?”, “Opnieuw laden”, “De rekenmotor is niet geladen”, “Papyruszegge” en “De gesloten deur”.

Die artikel self was semanties volledig, maar het te veel gewone Engelse tegniese prosa bevat, byvoorbeeld “canonical implementation”, “deterministic”, “target day”, “selection space”, “probability theorem”, “server address” en “generic invertibility”. Hierdie terme was nie kanonieke identifiers nie en is in natuurlike Afrikaanse vaktaal herskryf.

Die term vir die kalender se aksie-/berekeningsdag was ook inkonsekwent: die artikel het `aksiedag` gebruik terwyl dele van die ou koppelvlak `werkdag` gebruik het. Vir Afrikaans is `aksiedag` nou konsekwent in die gewone gebruikerskoppelvlak en artikel gebruik.

Vier message keys het ontbreek en sou Engelse fallback kon veroorsaak:
- `app.brand`
- `reverse.error.limitPositive`
- `reverse.error.limitSafeInteger`
- `reverse.error.absoluteDateField`

Hulle is nou eksplisiet in die locale teenwoordig.

## Kontroles ná herstel

- Alle Engelse message keys het 'n eksplisiete Afrikaanse eweknie.
- Alle `{placeholder}`-stelle stem presies met die Engelse bronkontrak ooreen.
- Die /about/-artikel behou presies 29 stabiele IDs, 25 h2-opskrifte, 3 h3-opskrifte en semantiese tabelgroottes 19 + 9.
- Alle verpligte formules, hashes, vaste getalle en identifiers is behou.
- Geen onbedoelde Hebreeuse teks kom in die Afrikaanse artikel voor nie.
- Die oorblywende identiese waardes tussen Afrikaans en Nederlands is gewone gedeelde vorme of eiename, byvoorbeeld `Jaar`, `Maand`, `Brons`, `Rivier`, `Meiji` en `Pastafari`; dit is nie op sigself taal-lekkasie nie.
- Gewone Engelse tegniese prosa in die artikel is gelokaliseer; oorblywende Engelse vorme is algoritmiese/API-name, kode of nie-sigbare ontwikkelaarskommentaar.

## Status

Semantiese en linguistiese QA van die teks is voltooi. Visuele/render-QA en finale PASS bly afsonderlike volgende fases.
