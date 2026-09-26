# Slovenský QA — priebežný stav celého webu

## Rozsah

Kontrola sa týka `sk-SK` na celom webe, nielen `/about/`: hlavné UI, vyhľadávanie dátumu, deň činnosti, porovnanie, ročný pohľad, spätné hľadanie, chyby a stavy, používateľská príručka, footer, metadata, manifest a texty ARIA/prístupnosti.

## Opravy

Chýbali štyri kľúče kontraktu:
- `app.brand`
- `reverse.error.limitPositive`
- `reverse.error.limitSafeInteger`
- `reverse.error.absoluteDateField`

`manifest.defaultDescription` bol v angličtine.

Obnovený bol aj význam v `search.intro`, `settings.intro`, `guide.1.body`, `guide.4.body`, `guide.5.body` a `guide.6.body`: aktuálny deň Pastafari ako predvolený vstup, aktívna poloha pozorovateľa, hranica dňa podľa Venuše z `ASTRONOMICAL-DAY.md`, reset vyhľadávania aj dňa činnosti a zachovanie ručne zvoleného dňa činnosti.

Terminológia bola zjednotená na `deň činnosti` a `vyhľadávaný deň`.

## `/about/`

Odstránili sa zostávajúce anglické technické výrazy v bežnej próze: `rejection sampling`, `modulo bias`, `all-day`, zmiešané formulácie v časti Seer, `generic injectivity` a `generic invertibility`. Skutočné endpoint literály zostali v `code`.

Hlavné commity:
- `4aad04b0617084922ce6f0d56940b90f5526c642`
- `dab548e1aa36b5f67edc796d3344490efa378a1d`

## Overenie

- 258/258 message keys.
- Žiadne chýbajúce ani nadbytočné kľúče.
- Všetky množiny `{placeholder}` presne zodpovedajú anglickému kontraktu.
- Žiadne podozrivé sémantické skrátenia.
- Zhody s češtinou a poľštinou sú obmedzené na mená, formáty a legitímne spoločné tvary; bez známok širokého fallbacku.
- `/about/` má presne 29 stable ID v rovnakom poradí ako semantic master, bez duplikátov.
- Dve tabuľky majú 19 a 9 riadkov.
- Žiadny nechcený hebrejský text.
- Cielený scan bežnej anglickej technickej prózy je čistý.
- Povinné vzorce, hash a literály zostali nezmenené, vrátane `Q=2^{127}-1`, `R=\\operatorname{SAVE}(S+149r)`, `47\\times123=5781`, `5781-5778=3`, `RRULE:FREQ=YEARLY`, `F(c+T,t+T)=F(c,t)`, `14{,}777{,}149` a `8e155fa4198ea7bcfeb16138ac5d6662706f4d93`.

## Otvorené brány

Tento súbor **nedokazuje**, že celý web bol skontrolovaný v samostatnej LLM relácii, ktorej konverzácia prebiehala výlučne po slovensky. Povinná brána `linguistic QA` zostáva otvorená.

Rovnako nie sú dokončené reálne render QA na desktope a 390 px mobile, accessibility, PWA/offline ani language switching.

## Stav

Text, UI a sémantický kontrakt sú pripravené na ďalšiu bránu. Správny aktuálny stav je **semantic QA**, nie `linguistic QA`.
