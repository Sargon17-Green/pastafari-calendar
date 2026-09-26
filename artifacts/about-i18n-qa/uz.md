# O‘zbekcha QA — butun saytning oraliq holati

## Qamrov

Tekshiruv `uz-UZ` uchun faqat `/about/` emas, butun saytni qamrab oladi: asosiy UI, sana qidiruvi, amal kuni, taqqoslash, yil ko‘rinishi, teskari qidiruv, xatolar va holatlar, foydalanuvchi qo‘llanmasi, footer, metadata, manifest va ARIA/foydalanish imkoniyati matnlari.

## Tuzatishlar

To‘rtta message key yetishmas edi:
- `app.brand`
- `reverse.error.limitPositive`
- `reverse.error.limitSafeInteger`
- `reverse.error.absoluteDateField`

`manifest.defaultDescription` yangilandi.

`search.intro`, `settings.intro`, `guide.1.body`, `guide.4.body`, `guide.5.body`, `guide.6.body` ga yo‘qolgan semantika qaytarildi: joriy Pastafari kuni standart kirish sifatida, faol kuzatuvchi joylashuvi, `ASTRONOMICAL-DAY.md` dagi Venera asosidagi kun chegarasi, qidiruv va amal kunini qayta tiklash va qo‘lda tanlangan amal kunining keyingi qidiruvlarda saqlanishi.

Queried day `so‘ralgan kun`, queried date esa `so‘ralgan sana` sifatida birxillashtirildi.

## `/about/`

Quyidagi English-mixing tozalandi: `modulo bias`, `rejection sampling`, oddiy `all-day`, Seer bo‘limidagi aralash inglizcha, `reverse conversion`, `affine periodicity`, `generic injectivity`, `generic invertibility`.

Haqiqiy API literal va mahsulot nomlari kerakli joylarda kod yoki nom sifatida saqlandi.

Asosiy commitlar:
- `26da2b37fc98c55e50d3aa2227f1cb276ce80692`
- `2a8a8f45e21d4f7fbc49b9fe39f960340c65c36f`

## Yakuniy tekshiruv

- 258/258 message keys.
- Missing yoki extra key yo‘q.
- Barcha `{placeholder}` to‘plamlari inglizcha contract bilan aynan mos.
- Shubhali semantic truncation yo‘q.
- Turkcha va qozoqcha locale bilan exact matches cheklangan; keng fallback yo‘q.
- `/about/` semantic master kabi 29 ta stable ID ni ayni tartibda saqlaydi, duplicate yo‘q.
- Semantic tables 19 va 9 qator.
- Majburiy formula/hash/literal lar saqlangan.
- Maqsadli English technical prose scan toza.

## Hali ochiq gates

Bu fayl butun sayt alohida LLM sessionda, suhbat to‘liq o‘zbek tilida bo‘lgan holda ko‘rib chiqilganini **isbotlamaydi**. Shuning uchun majburiy `linguistic QA` hali ochiq.

Haqiqiy desktop va 390 px mobile render QA, accessibility, PWA/offline va language switching ham hali tugallanmagan.

## Holat

Matn, UI va semantic contract keyingi gate uchun tayyor. Hozirgi to‘g‘ri holat **semantic QA**, `linguistic QA` emas.
