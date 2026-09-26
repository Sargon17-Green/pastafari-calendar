# اردو QA — پورے سائٹ کی درمیانی حالت

## دائرہ

یہ جانچ `ur-PK` کے لیے پورے سائٹ کو شامل کرتی ہے، صرف `/about/` کو نہیں: مرکزی UI، تاریخ تلاش، عمل کا دن، موازنہ، سال کا منظر، معکوس تلاش، خطائیں اور حالتیں، صارف رہنما، footer، metadata، manifest اور ARIA/رسائی متن۔

## بڑی اصلاحات

چار message keys غائب تھے:
- `app.brand`
- `reverse.error.limitPositive`
- `reverse.error.limitSafeInteger`
- `reverse.error.absoluteDateField`

`manifest.defaultDescription` انگریزی میں تھا۔

`search.intro`، `settings.intro`، `guide.1.body`، `guide.4.body`، `guide.5.body` اور `guide.6.body` میں کھویا ہوا مفہوم واپس لایا گیا: موجودہ Pastafari دن بطور پہلے سے طے شدہ داخلہ، فعال مبصر کا مقام، `ASTRONOMICAL-DAY.md` میں بیان کردہ زہرہ پر مبنی دن کی حد، تلاش اور عمل کے دن کی واپسی، اور دستی طور پر منتخب عمل کے دن کا اگلی تلاشوں میں برقرار رہنا۔

Queried day کو `پوچھا گیا دن` اور queried date کو `پوچھی گئی تاریخ` کے طور پر یکساں کیا گیا۔

## placeholder کی معنوی غلطیاں

Placeholder sets تکنیکی طور پر موجود تھے مگر معنوی ترتیب غلط تھی:
- `year.targetPosition` میں `{day}` اور `{length}`;
- `date.aria`، `date.cutletLine`، `date.monthLine` میں نام اور دن کے نمبر۔

یہ سب درست کیے گئے۔

## `/about/`

وسیع انگریزی تکنیکی آمیزش صاف کی گئی، بشمول `canonical`، `specification`، `implementation`، `modulo bias`، `all-day`، Seer بلاک، `reverse conversion`، `generic injectivity`، `generic invertibility`، `side information` اور کئی ثانوی اصطلاحات۔

اس کے بعد مکمل Latin-residue scan کیا گیا، جس میں `seals`، `median`، `sample`، `coordinates`، `reference day`، `proleptic Gregorian calendar`، `editorial` وغیرہ جیسے باقیات بھی ملے اور صاف کیے گئے۔ خودکار تبدیلی سے بننے والی خرابیاں `تجدیدs`، `مصنوعہion` اور `لنگرs` بھی درست کی گئیں۔

حقیقی API literals، code literals اور `Pastafarian Calendar Seer` نام محفوظ رکھے گئے۔

اہم commits:
- `f21960a67ee15c641083cf1e109edc4ffd8e1df5`
- `10a88c6d208d7213ffce78c0fbf16a29ca2a46f1`
- `88c06b817bb47621ec71b2081958c8fda548623e`

## آخری جانچ

- 258/258 message keys۔
- کوئی missing یا extra key نہیں۔
- تمام `{placeholder}` sets انگریزی contract سے عین مطابق۔
- مشتبہ semantic truncation نہیں۔
- فارسی اور عربی locale سے exact matches محدود؛ وسیع fallback نہیں۔
- `/about/` میں semantic master کی طرح 29 stable ID، اسی ترتیب میں، بغیر duplicate۔
- semantic tables میں 19 اور 9 rows۔
- تمام لازمی formula/hash/literal محفوظ۔
- ہدفی English technical prose scan صاف۔
- مکمل Latin-residue scan میں صرف `Pastafarian Calendar Seer` بطور نام باقی۔

## ابھی کھلے gates

یہ فائل **ثابت نہیں کرتی** کہ پورے سائٹ کو ایک الگ LLM session میں دیکھا گیا جس کی گفتگو مکمل طور پر اردو میں تھی۔ اس لیے لازمی `linguistic QA` ابھی کھلا ہے۔

حقیقی desktop اور 390 px mobile render QA، accessibility، PWA/offline اور language switching بھی باقی ہیں۔

## حالت

متن، UI اور semantic contract اگلے gate کے لیے تیار ہیں۔ درست موجودہ حالت **semantic QA** ہے، `linguistic QA` نہیں۔
