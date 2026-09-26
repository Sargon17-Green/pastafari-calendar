# Český QA — průběžný stav celého webu

## Rozsah

Kontrola pokrývá `cs-CZ` na celém webu, nejen `/about/`: hlavní UI, vyhledávání data, den činnosti, porovnání, roční přehled, reverzní vyhledávání, chyby a stavy, uživatelský průvodce, footer, metadata, manifest a texty ARIA/přístupnosti.

## Ověření

- 258/258 message keys.
- Žádné chybějící ani nadbytečné smluvní klíče.
- Všechny sady `{placeholder}` odpovídají anglickému kontraktu.
- Nebyly nalezeny podezřelé sémantické zkratky.
- `year.targetPosition`, `date.aria`, `date.cutletLine` a `date.monthLine` mají správnou sémantiku placeholderů.
- Průvodce obsahuje aktuální význam: současný Pastafari den, aktivní polohu pozorovatele, hranici dne podle Venuše z `ASTRONOMICAL-DAY.md`, reset vyhledávání i dne činnosti a zachování ručně zvoleného dne činnosti.
- Přesné shody se slovenštinou a polštinou nejsou známkou širokého fallbacku; cílený scan údajně slovenských forem našel pouze tvary, které jsou zároveň standardní češtinou (`výpočet`, `systém`).
- `/about/` obsahuje přesně 29 stable ID ve stejném pořadí jako semantic master, bez duplicit.
- Dvě tabulky mají 19 a 9 řádků.
- Žádný nechtěný hebrejský text.
- Cílený scan English technical prose je čistý.
- Povinné formule, hashe a literály jsou zachovány, včetně `Q=2^{127}-1`, `R=\\operatorname{SAVE}(S+149r)`, `47\\times123=5781`, `5781-5778=3`, `RRULE:FREQ=YEARLY`, `F(c+T,t+T)=F(c,t)`, `14{,}777{,}149` a `8e155fa4198ea7bcfeb16138ac5d6662706f4d93`.

## Otevřené brány

Tento soubor **nedokazuje**, že celý web prošel samostatnou LLM session, jejíž konverzace sama probíhala plně v češtině. Povinná brána `linguistic QA` proto zůstává otevřená.

Skutečný render QA na desktopu a 390 px mobile, accessibility, PWA/offline a language switching také ještě nejsou dokončeny.

## Stav

Text, UI a semantic contract jsou připraveny pro další bránu. Správný aktuální stav je **semantic QA**, ne `linguistic QA`.
