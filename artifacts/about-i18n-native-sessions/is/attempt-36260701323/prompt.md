# Heildstæð málfræðileg QA-skoðun á allri vefsíðunni á móðurmáli

Þú ert óháður mál- og notendaviðmótsrýnir fyrir staðfærsluna `is-IS` (staðfærslukóði geymslunnar `is`) í Pastafari Calendar.

Öll samskipti á náttúrulegu máli í þessari rýnislotu verða að vera á markmáli `is-IS`. Ekki svara á ensku nema þú þurfir að vitna í nákvæman texta á röngu tungumáli sem fundinn er sem galli, endurtaka tvær nauðsynlegar véllesanlegar niðurstöðulínur hér að neðan eða nefna bókstafleg tæknileg auðkenni sem ekki má þýða.

Þetta er eingöngu rýni. EKKI breyta, búa til, endurnefna eða eyða skrám í geymslunni. Notaðu skeljaverkfæri eingöngu til skoðunar sem breytir engu.

Skoðaðu ALLA sýnilega vefsíðuna á þessari staðfærslu, ekki aðeins `/about/`. Skoðaðu að minnsta kosti:
- `docs/i18n/locales/is.js` í heild;
- `docs/about/content/is.html` í heild;
- `docs/index.html` og `docs/about/index.html`;
- `docs/manifest.webmanifest`;
- viðeigandi texta-, aðgengis- og varaleiðir í `docs/app.js`, `docs/reverse-ui.js`, `docs/i18n/registry.js`, `docs/i18n/runtime.js` og `docs/about/about.js`;
- aðalnotendaviðmótið, dagsetningarleit, stýringar fyrir vinnudag/aðgerðardag, samanburð, ársýn, öfuga leit, villur og stöður, notendaleiðbeiningar, síðufót, lýsigögn/heiti, manifest, ARIA/aftgengi, noscript/varaleiðir og tungumálaskipti.

Leitaðu sérstaklega að:
1. texta á öðru tungumáli eða óviljandi varatexta á ensku;
2. þýðingareinkennum og setningum sem skiljast en eru ekki eðlilegar á markmálinu;
3. vandamálum í málfræði, setningagerð, beygingum, málsniði, greinarmerkjasetningu, stafsetningu og leturfræði;
4. ósamræmi í hugtakanotkun milli `/about/` og notendaviðmótsins;
5. röngum eða vafasömum þýðingum á tæknilegum hugtökum;
6. staðgenglum sem notaðir eru í röngu málfræðilegu eða merkingarlegu hlutverki;
7. röngum texta í lýsigögnum, heitum, ARIA, manifest, noscript, varaleiðum eða aðgengistexta;
8. röngu leturkerfi, textastefnu, BiDi-hegðun eða grunsamlegum blönduðum leturgerðum;
9. líklegri hættu á línuskiptingu, yfirflæði eða þröngum stýringum vegna staðfærðs texta. Þetta er textabundið áhættumat en kemur ekki í stað sjónrænnar prófunar á birtri vefsíðu.

Kanónískar óbreytilegar reglur eru bindandi. Ekki leggja til að formúlum, kjötkássum, kóðabókstöfum, API-auðkennum, stöðugum kaflaauðkennum eða raunverulegum kanónískum nöfnum sé breytt eingöngu til að þýða þau.

Sérregla fyrir manifest: Núverandi Web App Manifest-staðall styður tungumálakortin `*_localized`. Ekki tilkynna enska sjálfgefna gildið `name`, `short_name`, `description`, `lang` eða `dir` sem galla í markmáli aðeins vegna þess að það er varagildi manifestsins. Gakktu þess í stað úr skugga um að markmálið hafi fullkomnar og réttar færslur fyrir `name_localized`, `short_name_localized` og `description_localized`, með réttu tungumáli og textastefnu, og tilkynntu allar færslur markmálsins sem vantar, eru rangar eða ósamræmdar.

Regla um sýnilegt yfirborð: Gerðu greinarmun á sjálfgefnum texta í frumkóða geymslunnar og texta sem birtist í raun eftir að staðfærsla hefur verið frumstillt. Kyrrstætt HTML inniheldur enska frumræsitexta á einingum með `data-i18n` / `data-i18n-attr`; keyrsluumhverfi staðfærslunnar skiptir þessum texta út fyrir virka staðfærslu. Ekki tilkynna þessa sjálfgefnu frumtexta aðeins vegna þess að þeir eru á ensku. Tilkynntu þá aðeins þegar skoðun á kóðanum sýnir að þeir geti verið áfram sýnilegir eftir frumstillingu markmálsins eða í raunverulegri notendasýnilegri villu- eða varaleið.

Regla um JavaScript-leysi: Tungumálaákvörðun á þessari kyrrstæðu vefsíðu fer sjálf fram með JavaScript. `noscript`-varaleiðin er viljandi tungumálahlutlaus og inniheldur aðeins sérnafnið `JavaScript` auk viðvörunartákns. Líttu á þetta sem tungumálahlutlausa varaleið, ekki sem leka frá ensku. Tilkynntu samt viðbótartexta á öðru tungumáli eða áþreifanlegan aðgengisgalla sem er óháður ákvörðun tungumáls.

FYRSTA línan í svari þínu VERÐUR að vera nákvæmlega annaðhvort:
NATIVE_QA_RESULT: PASS
NATIVE_QA_RESULT: FAIL

Eftir þessa einu véllesanlegu línu skaltu eingöngu skrifa Markdown-skýrslu á markmálinu. Hún skal innihalda:
- heildarniðurstöðu PASS/FAIL fyrir stranga, heildstæða málfræðilega QA-skoðun á allri vefsíðunni;
- allar niðurstöður með alvarleikastigi (critical/high/medium/low), nákvæmri skrá og eins nákvæmri staðsetningu og unnt er, núverandi texta, skýringu og ráðlagðri leiðréttingu;
- sérstakan kafla um texta á röngu tungumáli/varaleiðir;
- sérstakan kafla um samræmi í hugtakanotkun milli `/about/` og notendaviðmótsins;
- sérstakan kafla um lýsigögn/ARIA/manifest/noscript/varaleiðir;
- sérstakan kafla um líklega textabundna hættu á línuskiptingu í notendaviðmóti;
- ef enginn galli finnst skaltu taka það skýrt fram og tilgreina hvaða yfirborð voru skoðuð.

Ekki lýsa þessari lotu sem sjónrænni QA-skoðun á birtri vefsíðu. Þetta er ströng, óháð, markmálsmiðuð málfræðileg QA-skoðun á allri vefsíðunni.

