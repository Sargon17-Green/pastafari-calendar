# Azərbaycan dili QA — bütün sayt

## Bu dil mərhələsində istifadə olunan tapşırıq

Yalnız Azərbaycan dilində işləyin. Pastafari təqvimi saytının `az-AZ` locale-i üçün görünən bütün mətni yoxlayın; yalnız `/about/` məqaləsi ilə kifayətlənməyin. Xüsusilə bunları fəal şəkildə axtarın:

- türk, ingilis və ya başqa dildən qalmış istənməyən mətn;
- tərcümə qoxusu verən, sərt və ya Azərbaycan dilində təbii səslənməyən cümlələr;
- əsas interfeys, istifadəçi bələdçisi, əks axtarış, il görünüşü və `/about/` arasında termin uyğunsuzluğu;
- yanlış şəkilçi, hal, söz sırası, durğu işarəsi, böyük/kiçik hərf və yerli yazı norması;
- runtime zamanı ingilis dilinə fallback yarada biləcək çatışmayan locale açarları;
- placeholder, formula, identifier, hash, sabit rəqəm və canonical adlarda dəyişiklik;
- lokalizasiya zamanı təsadüfən tərcümə olunmuş stable HTML ID-ləri və deep link-ləri.

Mətn sadəcə başa düşülür deyə onu təsdiqləməyin. O, Azərbaycan dilində əvvəlcədən yazılmış təbii mətn kimi oxunmalıdır. Həqiqi alqoritmik adları və identifier-ləri olduğu kimi saxlayın, amma adi texniki nəsri səbəbsiz ingiliscə qoymayın.

## Tapıntılar

İlkin `az-AZ` locale-i əsasən türk dilindən götürülmüş mətnlərlə qarışmışdı. Əvvəlki düzəlişlərdə əsas interfeys Azərbaycan dilinə çevrildi və hesablama günü üçün `əməl günü` termini əsas interfeys və məqalə boyunca uyğunlaşdırıldı.

Son yoxlama zamanı iki aydın türk dili qalığı tapıldı:

- `year.displayedCutletPosition`: “Görüntülenen kotlet ilın {start}–{end}. günlerini kaplar.”
- `yearFiveThousand`: “Dünyanın Yaratılışından Beri Beş Bin İlı”

Bunlar təbii Azərbaycan dili ilə əvəz edildi.

`/about/` məqaləsində adi texniki nəsrin bir hissəsi əvvəlki mərhələlərdə lazımsız ingilis sözləri ilə yazılmışdı. Ayrı-ayrı redaktə mərhələlərində `canonical`, `implementation`, `selection space`, `probability theorem`, `generic invertibility` kimi adi izahlı ifadələr Azərbaycan dilində təbii qarşılıqlarla əvəz olundu; alqoritmik xüsusi adlar və kod identifier-ləri isə qorundu.

Bu QA mərhələsi ayrıca ciddi struktur xətası da aşkar etdi: üç stable deep-link ID lokalizasiya olunmuşdu:

- `about-calendar` → `about-təqvim`
- `printed-calendar` → `printed-təqvim`
- `far-time-structure` → `far-time-quruluş`

Bu dəyişikliklər public deep-link contract-ı pozurdu. Hər üç ID canonical formasına qaytarıldı.

Məqalədə `təkrarlanma şərti-a` şəklində yanlış hal şəkilçisi də var idi; bu, `təkrarlanma şərtinə` olaraq düzəldildi.

## Düzəlişdən sonrakı yoxlamalar

- İngilis locale-indəki bütün 258 message key üçün Azərbaycan dilində açıq qarşılıq var; runtime fallback üçün çatışmayan message key yoxdur.
- Bütün `{placeholder}` dəstləri ingilis mənbə müqaviləsi ilə tam eynidir.
- İngilis locale-i ilə eyni qalan dəyərlər yalnız həqiqi xüsusi adlar, standart təqvim adları, qısa kod/identifier formaları və neytral format sətirləridir.
- `/about/` məqaləsində bütün 29 stable ID canonical adları ilə mövcuddur və əlavə/lokalizasiya olunmuş ID yoxdur.
- Məqalənin iki semantik cədvəli 19 + 9 body sətri saxlayır.
- Məcburi formullar, hash-lər, sabit rəqəmlər və identifier-lər qorunub.
- Məqalədə istənməyən ivrit mətni yoxdur.
- Məqalədə adi izahlı ingilis texniki proza qalmayıb; qalan ingilis formaları həqiqi alqoritmik/API adları, kod və ya identifier-lərdir.
- Əsas istifadəçi interfeysi, il görünüşü, reverse search və `/about/` daxilində `əməl günü`, `kotlet`, `ay`, `qapı` kimi əsas terminlər uyğunlaşdırılıb.

## Status

Semantik və dil QA-sı mətn səviyyəsində tamamlanıb. Render/visual smoke, mobil 390px yoxlaması və yekun `PASS` ayrıca növbəti mərhələ olaraq qalır.

## Əlavə təkrar yoxlama

Ayrılmış QA branch-də aparılan ikinci dil yoxlaması əvvəlki hesabatdan sonra qalan semantik köhnəlməni aşkar etdi. `search.intro`, `settings.intro`, eləcə də istifadəçi bələdçisinin 1, 4 və 5-ci addımları cari davranışla yenidən uyğunlaşdırıldı: cari Pastafari gününün standart doldurulması, aktiv müşahidəçi yerinə görə günün müəyyən edilməsi, astronomik gün sərhədi və “Bu günə qayıt” əməliyyatının həm axtarışı, həm əməl gününü sıfırlaması indi açıq yazılıb.

Bundan başqa, `default versiya` ifadəsi Azərbaycan dilində `standart versiya` ilə əvəz edildi. /about/ məqaləsində adi ingilis texniki nəsrin qalıqları — `all-day`, `seal`, `combinatorial selection`, `answer ring`, `base-Q`, `index`, `flag` və `absolute` — təbii Azərbaycan qarşılıqları ilə əvəz edildi; həqiqi alqoritmik adlar və kod identifier-ləri saxlanıldı.

Mətn səviyyəsində QA yenidən təmizdir. Yekun `PASS` yalnız real render yoxlamasından, o cümlədən desktop və 390px mobil smoke testindən sonra verilə bilər.
