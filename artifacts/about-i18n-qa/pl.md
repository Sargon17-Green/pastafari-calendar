# Polski QA — stan pośredni całej witryny

## Zakres

Przegląd obejmuje `pl-PL` w całej witrynie, nie tylko `/about/`: główny interfejs, wyszukiwanie daty, dzień działania, porównanie, widok roku, wyszukiwanie odwrotne, błędy i statusy, instrukcję użytkownika, footer, metadata, manifest oraz teksty ARIA/dostępności.

## Znalezione i naprawione problemy

Brakowały cztery klucze kontraktu:
- `app.brand`
- `reverse.error.limitPositive`
- `reverse.error.limitSafeInteger`
- `reverse.error.absoluteDateField`

`manifest.defaultDescription` był po angielsku.

Przywrócono też brakującą treść w `search.intro`, `settings.intro`, `guide.1.body`, `guide.4.body`, `guide.5.body` i `guide.6.body`: bieżący dzień Pastafari jako domyślne wejście, aktywną lokalizację obserwatora, granicę dnia opartą na Wenus z `ASTRONOMICAL-DAY.md`, reset wyszukiwania i dnia działania oraz utrzymywanie ręcznie wybranego dnia działania.

Queried day ujednolicono jako `zapytany dzień`, a queried date jako `zapytana data`.

## `/about/`

Usunięto pozostałości angielskiej prozy technicznej, między innymi `rejection sampling`, zwykły tekst `all-day`, mieszane sformułowania w sekcji Seer, `generic injectivity` i `generic invertibility`. Prawdziwe identyfikatory endpointów pozostały w `code`.

Główne commity:
- `f863c229340c7a9b4a9e892ade6c2d31d542728a`
- `1b415088dc70415d2e4ae465c7c6493705af5f30`

## Weryfikacja

- 258/258 message keys.
- Brak kluczy brakujących i dodatkowych.
- Wszystkie zestawy `{placeholder}` są zgodne z kontraktem angielskim.
- Brak podejrzanych skrótów semantycznych.
- Zgodności z czeskim, słowackim i rosyjskim ograniczają się do nazw, formatów i legalnie wspólnych form; brak oznak szerokiego fallbacku.
- `/about/` ma dokładnie 29 stable ID w kolejności semantic master, bez duplikatów.
- Tabele mają 19 i 9 wierszy.
- Brak niezamierzonego tekstu hebrajskiego.
- Docelowy skan zwykłej angielskiej prozy technicznej jest czysty.
- Zachowane są wszystkie wymagane formuły, hash i literały, w tym `Q=2^{127}-1`, `R=\\operatorname{SAVE}(S+149r)`, `47\\times123=5781`, `5781-5778=3`, `RRULE:FREQ=YEARLY`, `F(c+T,t+T)=F(c,t)`, `14{,}777{,}149` i `8e155fa4198ea7bcfeb16138ac5d6662706f4d93`.

## Otwarte bramki

Ten plik **nie dowodzi**, że cała witryna została sprawdzona w osobnej sesji LLM prowadzonej w całości po polsku. Obowiązkowa bramka `linguistic QA` pozostaje otwarta.

Nie zakończono też rzeczywistego render QA na desktopie i 390 px mobile, accessibility, PWA/offline ani language switching.

## Status

Tekst, UI i kontrakt semantyczny są gotowe do następnej bramki. Właściwy stan to obecnie **semantic QA**, nie `linguistic QA`.
