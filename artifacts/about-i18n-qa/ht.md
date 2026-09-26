# QA an kreyòl ayisyen — tout sit la

## Misyon revizyon sa a

Travay sèlman an kreyòl ayisyen. Li tout tèks vizib sou sit Kalandriye Pastafari a pou locale `ht-HT`, pa sèlman atik `/about/` la. Chèche espesyalman:
- rès franse, angle oswa lòt lang ki pa entansyonèl;
- fraz ki konprann men ki sonnen tankou tradiksyon mo pou mo olye de kreyòl natirèl;
- tèm ki pa menm ant paj prensipal la, jou aksyon an, konparezon an, estrikti ane a, gid la, rechèch envès la ak `/about/`;
- erè gramè, lòd mo, òtograf, ponktiyasyon oswa nivo lang;
- message key ki manke oswa `{placeholder}` ki chanje;
- stable section ID, fòmil, hash, non API oswa non kanonik ki ta chanje pa erè.

Yon tèks pa pase QA sèlman paske moun ka konprann li. Li dwe li tankou yon vèsyon kreyòl ki fèt poukont li. Vrè non algoritmik, non pwodwi, idantifyan API/CLI ak literal kòd ka rete nan fòm teknik yo; pwòz teknik nòmal la dwe an kreyòl.

## Pwoblèm prensipal yo te jwenn

Locale `ht-HT` la te lajman franse ak kèk mo kreyòl antre ladan l. Anvan reparasyon an, 121 valè te egzakteman menm ak locale franse a. Te gen anpil fraz melanje, pa egzanp:
- `Aller à la rechèch de dat`;
- `Comment utiliser ce site ?`;
- `Quel jou souhaitez-vous trouver ?`;
- `Changer le jou de travail`;
- `Boulette précédente`;
- `Retour à aujoud’hui`.

Sa pa t yon pwoblèm lokal nan atik la; se te yon defo lang nan tout interface la.

## Reparasyon tout locale la

Interface prensipal la, paramèt jou aksyon an, konparezon an, kalandriye antre yo, mesaj erè yo, afichaj ane a, gid itilizasyon an, footer la ak rechèch envès la te netwaye epi ekri an kreyòl.

Tèm prensipal yo kounye a konsistan:
- `jou aksyon` pou day of working/action day;
- `jou yo mande a` pou queried/target day;
- `koutlèt`;
- `mwa`;
- `kalkil`;
- `konparezon`;
- `rechèch envès`.

Kat message key ki te manke nan kontra angle a te ajoute:
- `app.brand`;
- `reverse.error.limitPositive`;
- `reverse.error.limitSafeInteger`;
- `reverse.error.absoluteDateField`.

## Non kanonik ki ka tradui

Anpil non afichaj te toujou an franse. Yo te ranplase ak fòm kreyòl san yo pa chanje idantifyan entèn yo. Egzanp:
- `Quatre parties de neuf` → `Kat pati sou nèf`;
- `La jarre vide` → `Krich vid la`;
- `Trois parties de cinq` → `Twa pati sou senk`;
- `La porte fermée` → `Pòt fèmen an`;
- `Goutte` → `Gout`;
- `Porte` → `Pòt`;
- `Jour de la Fondation` → `Jou Fondasyon`.

Pou kèk non mwens komen, yo te chwazi fòm deskriptif senp olye yo envante yon pretandi tèm teknik ofisyèl. Pou `frankincense`, `Lansan` konfime pa itilizasyon kreyòl dokimante.

## Revizyon lang /about/

Atik la te konplè sou plan semantik, men li te gen anpil pwòz teknik angle. Yo te lokalize li, pami lòt bagay:
- `canonical` → `kanonik`;
- `specification` → `spesifikasyon`;
- `deterministic` → `detèminis`;
- `selection space` → `espas chwa`;
- `rejection sampling` → `echantiyonaj pa rejè`;
- `modulo bias` → `patipri modulo`;
- `computational sample` → `echantiyon kalkil`;
- `mathematical independence` → `endepandans matematik`;
- `probability theorem` → `teyorèm pwobabilite`;
- `physical moment` → `moman fizik`;
- `generic injectivity` → `enjektivite jenerik`;
- `generic invertibility` → `envètibilite jenerik`;
- `side information` → `enfòmasyon anplis`;
- `affine periodicity` → `peryodisite afin`;
- `asymptotic structure` → `estrikti asenptotik`.

Pou limit astwonomik jou a, yo pa envante yon non syantifik kreyòl ki pa dokimante. Atik la itilize yon deskripsyon dirèk: `moman kote sant Venis, jan li parèt depi kote obsèvatè a, travèse pati enferyè meridyen lokal la`.

## Tèm teknik ki rete entansyonèlman

Sa yo rete kòm non oswa idantifyan reyèl:
- `Short Choice`;
- `Wide Choice`;
- `SAVE`;
- `day-id`;
- `RRULE:FREQ=YEARLY`;
- `Pastafarian Calendar Seer`;
- Node API, CLI, HTTP v1, OpenAPI 3.1 ak SIMD;
- non endpoint tankou `date`, `now`, `range`, `batch`, `year`, `reverse`, `metadata`, `locales` ak `status`;
- `cold wake`, kòm yon tèm operasyonèl espesifik nan tès ki dekri a.

## Tès final

- Kontra mesaj angle a gen 258 kle; tout 258 prezan dirèkteman nan `ht-HT`.
- Pa gen okenn seri `{placeholder}` ki diferan ak kontra a.
- Rechèch vize pou fraz franse pa bay okenn rès franse ki pa entansyonèl.
- `/about/` gen egzakteman menm 29 stable ID yo, nan menm lòd ak semantic master ebre a; pa gen ID double.
- De tablo semantik yo gen 19 ak 9 liy.
- Tout fòmil, nimewo fiks, commit hash ak literal kòd obligatwa yo konsève.
- Pa gen tèks ebre ki pa entansyonèl nan atik kreyòl la.
- Rechèch final pou pwòz teknik angle pa kite rès ki pa entansyonèl; vrè non teknik yo rete kòm non teknik.

## Eta

QA semantik ak lengwistik tèks la fini pou tout locale la. QA vizyèl/render ak eta final `PASS` rete yon etap apa ki vin apre.
