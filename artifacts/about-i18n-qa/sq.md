# QA Shqip — gjendja ndërmjetëse e gjithë faqes

## Fusha

Rishikimi mbulon `sq-AL` në gjithë faqen, jo vetëm `/about/`: UI-në kryesore, kërkimin e datës, ditën e veprimit, krahasimin, pamjen e vitit, kërkimin e kundërt, gabimet dhe gjendjet, udhëzuesin e përdoruesit, footer, metadata, manifest dhe tekstet ARIA/aksesueshmërisë.

## Korrigjimet

Mungonin katër message keys:
- `app.brand`
- `reverse.error.limitPositive`
- `reverse.error.limitSafeInteger`
- `reverse.error.absoluteDateField`

`manifest.defaultDescription` ishte në anglisht.

U rikthye edhe kuptimi i humbur te `search.intro`, `settings.intro`, `guide.1.body`, `guide.4.body`, `guide.5.body` dhe `guide.6.body`: dita aktuale Pastafari si hyrje parazgjedhjeje, vendndodhja aktive e vëzhguesit, kufiri i ditës i bazuar në Venus sipas `ASTRONOMICAL-DAY.md`, rivendosja e kërkimit dhe e ditës së veprimit dhe vazhdimi i përdorimit të ditës së veprimit të zgjedhur.

Queried day u unifikua si `dita e pyetur`, queried date si `data e pyetur`.

## `/about/`

U hoq përzierja e gjerë e anglishtes teknike: `canonical`, `implementation`, `deterministic`, `rejection sampling`, `modulo bias`, `all-day`, seksioni i përzier Seer, `reverse conversion`, `affine periodicity`, `generic injectivity`, `generic invertibility`, `side information` dhe terma të tjerë.

Identifikuesit realë të API-së dhe code literals, si `date`, `range`, `batch`, `year`, `reverse`, `metadata`, `locales`, `status`, `cold wake`, `Short Choice`, `Wide Choice` dhe `Pastafarian Calendar Seer`, u ruajtën aty ku janë emra ose literalë kontrate.

Commitet kryesore:
- `584c38ec5e55ea43d7c0ca31de7be51009aabfb9`
- `efd5c46e746ecf298789a22381dd78ebd5e647b6`

## Verifikimi përfundimtar

- 258/258 message keys.
- Asnjë key mungues ose shtesë.
- Të gjitha grupet `{placeholder}` përputhen saktësisht me kontratën angleze.
- Asnjë shkurtim semantik i dyshimtë.
- Përputhjet e sakta me italishten dhe kroatishten janë të kufizuara në emra, formate dhe forma realisht të përbashkëta; nuk ka shenjë të fallback-ut të gjerë.
- `/about/` ka saktësisht 29 stable ID në të njëjtin rend me semantic master, pa dublime.
- Dy tabelat semantike kanë 19 dhe 9 rreshta.
- Nuk ka tekst hebraik të paqëllimshëm.
- Kontrolli i synuar për prozë teknike të zakonshme angleze është i pastër.
- Formulat, hash-et dhe literalët e detyrueshëm janë ruajtur, përfshirë `Q=2^{127}-1`, `R=\\operatorname{SAVE}(S+149r)`, `47\\times123=5781`, `5781-5778=3`, `RRULE:FREQ=YEARLY`, `F(c+T,t+T)=F(c,t)`, `14{,}777{,}149` dhe `8e155fa4198ea7bcfeb16138ac5d6662706f4d93`.

## Portat ende të hapura

Ky skedar **nuk provon** se e gjithë faqja është shqyrtuar në një sesion të veçantë LLM, biseda e së cilës është zhvilluar tërësisht në shqip. Prandaj porta e detyrueshme `linguistic QA` mbetet e hapur.

Gjithashtu mungojnë render QA real në desktop dhe 390 px mobile, accessibility, PWA/offline dhe language switching.

## Gjendja

Teksti, UI-ja dhe kontrata semantike janë gati për portën tjetër. Gjendja e saktë tani është **semantic QA**, jo `linguistic QA`.
