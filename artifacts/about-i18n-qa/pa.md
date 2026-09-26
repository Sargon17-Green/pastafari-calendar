# ਪੰਜਾਬੀ QA — ਪੂਰੀ ਸਾਈਟ ਦੀ ਅੰਤਰਿਮ ਸਥਿਤੀ

## ਦਾਇਰਾ

ਇਹ ਸਮੀਖਿਆ `pa-IN` ਲਈ ਪੂਰੀ ਸਾਈਟ ਉੱਤੇ ਕੀਤੀ ਗਈ ਹੈ, ਸਿਰਫ਼ `/about/` ਉੱਤੇ ਨਹੀਂ: ਮੁੱਖ UI, ਤਾਰੀਖ ਖੋਜ, ਕਾਰਵਾਈ ਦਾ ਦਿਨ, ਤੁਲਨਾ, ਸਾਲ-ਦ੍ਰਿਸ਼, ਉਲਟੀ ਖੋਜ, ਗਲਤੀਆਂ ਅਤੇ ਸਥਿਤੀਆਂ, ਵਰਤੋਂਕਾਰ ਮਾਰਗਦਰਸ਼ਨ, footer, metadata, manifest ਅਤੇ ARIA/ਪਹੁੰਚਯੋਗਤਾ ਪਾਠ।

`/about/` ਨੂੰ ਵੀ ਪੂਰਾ ਪੜ੍ਹ ਕੇ ਬੇਲੋੜੀ ਅੰਗਰੇਜ਼ੀ/ਹਿੰਦੀ ਮਿਲਾਵਟ, ਅਨੁਵਾਦੀ ਗੱਥਾ, ਅਸੰਗਤ ਸ਼ਬਦਾਵਲੀ ਅਤੇ ਮਿਆਰੀ ਤਕਨੀਕੀ ਤੱਤਾਂ ਵਿੱਚ ਅਣਚਾਹੇ ਬਦਲਾਅ ਲੱਭੇ ਗਏ।

## UI contract ਅਤੇ ਅਰਥ

ਸ਼ੁਰੂ ਵਿੱਚ ਚਾਰ message keys ਗੈਰਹਾਜ਼ਰ ਸਨ:
- `app.brand`
- `reverse.error.limitPositive`
- `reverse.error.limitSafeInteger`
- `reverse.error.absoluteDateField`

`manifest.defaultDescription` ਅੰਗਰੇਜ਼ੀ ਵਿੱਚ ਸੀ।

`search.intro`, `settings.intro`, `guide.1.body`, `guide.4.body`, `guide.5.body` ਅਤੇ `guide.6.body` ਵਿੱਚ ਗੁੰਮ ਅਰਥ ਮੁੜ ਜੋੜੇ ਗਏ: ਮੌਜੂਦਾ Pastafari ਦਿਨ ਮੂਲ ਇਨਪੁਟ ਵਜੋਂ, ਸਰਗਰਮ ਨਿਰੀਖਕ-ਟਿਕਾਣਾ, `ASTRONOMICAL-DAY.md` ਵਿੱਚ ਵਰਣਿਤ ਸ਼ੁੱਕਰ-ਆਧਾਰਿਤ ਦਿਨ-ਸੀਮਾ, “ਅੱਜ ਤੇ ਵਾਪਸ” ਨਾਲ ਖੋਜ ਅਤੇ ਕਾਰਵਾਈ ਦੇ ਦਿਨ ਦੋਵਾਂ ਦਾ reset, ਅਤੇ ਹੱਥੋਂ ਚੁਣਿਆ ਕਾਰਵਾਈ ਦਾ ਦਿਨ ਅਗਲੀਆਂ ਖੋਜਾਂ ਵਿੱਚ ਵਰਤਿਆ ਜਾਣਾ।

## placeholder ਅਰਥ-ਗਲਤੀਆਂ

ਤਕਨੀਕੀ ਤੌਰ ਤੇ placeholder sets ਮਿਲਦੇ ਸਨ, ਪਰ ਅਰਥ ਉਲਟ ਸਨ:
- `year.targetPosition` ਵਿੱਚ `{day}` ਅਤੇ `{length}`;
- `date.aria`, `date.cutletLine`, `date.monthLine` ਵਿੱਚ ਕਟਲੈਟ/ਮਹੀਨੇ ਦਾ ਨਾਮ ਅਤੇ ਦਿਨ ਨੰਬਰ।

ਇਹ ਸਭ ਠੀਕ ਕੀਤੇ ਗਏ।

ਮੁੱਖ ਸ਼ਬਦਾਵਲੀ ਵੀ ਇਕਸਾਰ ਕੀਤੀ ਗਈ:
- day of working — `ਕਾਰਵਾਈ ਦਾ ਦਿਨ`;
- queried day — `ਪੁੱਛਿਆ ਗਿਆ ਦਿਨ`.

## `/about/` ਭਾਸ਼ਾ ਸਫਾਈ

ਲੇਖ ਵਿੱਚ ਕਾਫ਼ੀ ਅੰਗਰੇਜ਼ੀ ਤਕਨੀਕੀ ਗੱਥਾ ਮਿਲੀ: `canonical`, `specification`, `rejection sampling`, `engine commit`, `all-day`, Seer ਭਾਗ ਦੀ ਮਿਲੀ-ਜੁਲੀ ਅੰਗਰੇਜ਼ੀ, `reverse conversion`, `affine periodicity`, `generic injectivity`, `side information`, `finite exact arithmetic check` ਆਦਿ।

ਇਹ ਹਿੱਸੇ ਪੰਜਾਬੀ ਵਿੱਚ ਲਿਖੇ ਗਏ। ਅਸਲੀ API identifiers, code literals ਅਤੇ ਅਸਲੀ ਨਾਮ ਜਿਵੇਂ `Short Choice`, `Wide Choice`, `Pastafarian Calendar Seer`, API/HTTP/OpenAPI/CLI/SIMD/SLA ਅਤੇ `cold wake` ਜਿੱਥੇ ਲੋੜ ਸੀ ਉੱਥੇ ਜਿਉਂ ਦੇ ਤਿਉਂ ਰੱਖੇ ਗਏ।

ਮੁੱਖ commits:
- `488db11ceabb6c60044345edbd682e531f8d9f2b`
- `ab91225a481d6e8c11ad02c4d60cfa38ab86bc97`
- `f1e60a9acb52e80d253b55d6d789c3d23be502b5`

## ਅੰਤਿਮ ਜਾਂਚ

- 258/258 message keys.
- ਕੋਈ missing/extra message key ਨਹੀਂ.
- ਸਾਰੇ `{placeholder}` sets ਅੰਗਰੇਜ਼ੀ contract ਨਾਲ ਠੀਕ ਮਿਲਦੇ ਹਨ.
- ਲੰਬੇ ਸੁਨੇਹਿਆਂ ਵਿੱਚ ਕੋਈ ਸ਼ੱਕੀ semantic truncation ਨਹੀਂ.
- ਪੁਰਾਣੀ `ਕਾਰਜ-ਦਿਨ` / `ਟੀਚਾ ਦਿਨ` ਸ਼ਬਦਾਵਲੀ ਸਬੰਧਿਤ UI ਵਿੱਚ ਨਹੀਂ ਰਹੀ.
- ਹਿੰਦੀ locale ਨਾਲ ਸਿਰਫ਼ 4 ਲੰਬੀਆਂ exact matches ਬਚੀਆਂ ਹਨ; ਇਹ ਨਾਮ/ਫਾਰਮੈਟ ਹਨ, ਵਿਆਪਕ Hindi fallback ਨਹੀਂ.
- `/about/` ਵਿੱਚ semantic master ਵਰਗੇ ਠੀਕ 29 stable ID ਹਨ, ਉਹੀ ਕ੍ਰਮ, ਕੋਈ duplicate ਨਹੀਂ.
- ਦੋ semantic tables ਵਿੱਚ 19 ਅਤੇ 9 ਕਤਾਰਾਂ ਹਨ.
- ਕੋਈ ਅਣਚਾਹਾ ਹਿਬਰੂ ਪਾਠ ਨਹੀਂ.
- ਆਮ ਅੰਗਰੇਜ਼ੀ ਤਕਨੀਕੀ ਗੱਥਾ ਲਈ ਨਿਸ਼ਾਨਾਬੱਧ scan ਸਾਫ਼ ਹੈ; Latin residue ਸਿਰਫ਼ `Pastafarian Calendar Seer` ਨਾਮ ਹੈ.
- ਲਾਜ਼ਮੀ formula/hash/literal ਸੁਰੱਖਿਅਤ ਹਨ: `Q=2^{127}-1`, `R=\\operatorname{SAVE}(S+149r)`, `47\\times123=5781`, `5781-5778=3`, `RRULE:FREQ=YEARLY`, `F(c+T,t+T)=F(c,t)`, `14{,}777{,}149`, `8e155fa4198ea7bcfeb16138ac5d6662706f4d93`.

## ਖੁੱਲ੍ਹੇ gates

ਇਹ ਫਾਈਲ **ਸਬੂਤ ਨਹੀਂ** ਕਿ ਪੂਰੀ ਸਾਈਟ ਇੱਕ ਵੱਖਰੇ LLM session ਵਿੱਚ ਸਮੀਖਿਆ ਕੀਤੀ ਗਈ ਸੀ ਜਿਸ ਦੀ ਗੱਲਬਾਤ ਆਪ ਪੂਰੀ ਤਰ੍ਹਾਂ ਪੰਜਾਬੀ ਵਿੱਚ ਸੀ। ਇਸ ਲਈ ਲਾਜ਼ਮੀ `linguistic QA` gate ਹਾਲੇ ਖੁੱਲ੍ਹਾ ਹੈ।

ਅਸਲ desktop ਅਤੇ 390 px mobile render QA, accessibility, PWA/offline ਅਤੇ language switching ਵੀ ਹਾਲੇ ਪੂਰੇ ਨਹੀਂ ਹੋਏ।

## ਸਥਿਤੀ

ਪਾਠ, UI ਅਤੇ semantic contract ਅਗਲੇ gate ਲਈ ਤਿਆਰ ਹਨ। ਹੁਣ ਸਹੀ ਸਥਿਤੀ **semantic QA** ਹੈ, `linguistic QA` ਨਹੀਂ।
