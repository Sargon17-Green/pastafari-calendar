# QA فارسی — وضعیت میانی کل سایت

## دامنه

این بررسی `fa-IR` را در کل سایت پوشش می‌دهد، نه فقط `/about/`: رابط اصلی، جست‌وجوی تاریخ، روز عمل، مقایسه، نمای سال، جست‌وجوی معکوس، خطاها و وضعیت‌ها، راهنمای کاربر، footer، metadata، manifest و متن‌های ARIA/دسترس‌پذیری.

## اصلاحات

- چهار کلید قراردادیِ جاافتاده افزوده شد.
- معنای کامل و فعلی در `search.intro`، `settings.intro`، `guide.1.body`، `guide.4.body`، `guide.5.body` و `guide.6.body` بازگردانده شد.
- queried day/date به صورت `روز مورد پرسش / تاریخ مورد پرسش` یکدست شد.
- اختلاط ناخواستهٔ انگلیسی در `/about/` پاک شد: rejection sampling/modulo، engine commit، all-day، متن ترکیبی Seer، endpoint/deployment/hosted production و generic injectivity.
- شناسه‌های واقعی API به صورت code literal حفظ شدند.

## راستی‌آزمایی نهایی

- 258/258 message keys.
- هیچ کلید مفقود یا اضافه‌ای وجود ندارد.
- همهٔ مجموعه‌های `{placeholder}` دقیقاً با قرارداد انگلیسی برابرند.
- هیچ کوتاه‌شدن معنایی مشکوکی دیده نشد.
- جهت locale همچنان `rtl` است.
- هم‌پوشانی دقیق با عربی و اردو محدود است و نشانه‌ای از fallback گسترده ندارد.
- `/about/` دقیقاً 29 stable ID با همان ترتیب semantic master و بدون تکرار دارد.
- دو جدول 19 و 9 ردیف دارند.
- متن عبری ناخواسته وجود ندارد.
- اسکن هدفمند English technical prose پاک است.
- اسکن گستردهٔ Latin residue فقط نام محصول `Pastafarian Calendar Seer` را باقی گذاشت.
- فرمول‌ها، hashها و literalهای اجباری حفظ شده‌اند، از جمله `Q=2^{127}-1`، `R=\\operatorname{SAVE}(S+149r)`، `47\\times123=5781`، `5781-5778=3`، `RRULE:FREQ=YEARLY`، `F(c+T,t+T)=F(c,t)`، `14{,}777{,}149` و `8e155fa4198ea7bcfeb16138ac5d6662706f4d93`.

## دروازه‌های باز

این فایل **ثابت نمی‌کند** که کل سایت در یک session مستقل LLM بررسی شده که خود گفت‌وگو در آن کاملاً به فارسی انجام شده باشد. بنابراین دروازهٔ اجباری `linguistic QA` همچنان باز است.

render QA واقعی در desktop و 390 px mobile، accessibility، PWA/offline و language switching نیز هنوز باقی مانده‌اند.

## وضعیت

متن، UI و semantic contract برای دروازهٔ بعدی آماده‌اند. وضعیت درست فعلی **semantic QA** است، نه `linguistic QA`.
