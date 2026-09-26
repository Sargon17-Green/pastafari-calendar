# Український QA — проміжний стан усього сайту

## Охоплення

Перевірка охоплює `uk-UA` на всьому сайті, а не лише `/about/`: головний UI, пошук дат, день дії, порівняння, перегляд року, зворотний пошук, помилки та стани, посібник користувача, footer, metadata, manifest і тексти ARIA/доступності.

## Виправлення

Було відсутньо чотири message keys:
- `app.brand`
- `reverse.error.limitPositive`
- `reverse.error.limitSafeInteger`
- `reverse.error.absoluteDateField`

`manifest.defaultDescription` був англійською.

Відновлено втрачений зміст у `search.intro`, `settings.intro`, `guide.1.body`, `guide.4.body`, `guide.5.body`, `guide.6.body`: поточний день Pastafari як типовий ввід, активне місцезнаходження спостерігача, межа дня за Венерою з `ASTRONOMICAL-DAY.md`, скидання пошуку й дня дії та збереження вручну вибраного дня дії для наступних пошуків.

Queried day уніфіковано як `запитуваний день`, queried date — як `запитувана дата`.

## `/about/`

Прибрано залишки англійської технічної лексики: `modulo bias`, `rejection sampling`, звичайний `all-day`, англомовні фрагменти в Seer, `generic injectivity`, `generic invertibility`, а також `цільовий день` у місцях, де йдеться саме про queried day.

Справжні API-literals і назви продуктів залишено як код або власні назви.

Основні commits:
- `6344d291d57e00d783d5de9eea969815a42ceb59`
- `ca2020af9395413526997ae968393af555eb13cc`

## Фінальна перевірка

- 258/258 message keys.
- Немає відсутніх або зайвих ключів.
- Усі набори `{placeholder}` точно відповідають англійському контракту.
- Підозрілих semantic truncations немає.
- Точні збіги з російським і білоруським locale обмежені; широкого fallback немає.
- `/about/` має рівно 29 stable ID у тому самому порядку, що й semantic master, без дублікатів.
- Дві семантичні таблиці мають 19 і 9 рядків.
- Обов’язкові формули, hash і literals збережені.
- Цільова перевірка англійської технічної прози чиста.
- Повний Latin-residue scan залишив лише власну назву `Pastafarian Calendar Seer`.

## Відкриті gates

Цей файл **не доводить**, що весь сайт був переглянутий в окремій LLM-сесії, розмова якої повністю велася українською. Тому обов’язковий gate `linguistic QA` ще відкритий.

Також ще не завершено реальний render QA для desktop і 390 px mobile, accessibility, PWA/offline та language switching.

## Статус

Текст, UI і semantic contract готові до наступного gate. Правильний поточний статус — **semantic QA**, а не `linguistic QA`.
