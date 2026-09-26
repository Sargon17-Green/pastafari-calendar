# Azərbaycan dili QA — bütün sayt

## Bu dil turu üçün istifadə olunan tapşırıq

Yalnız Azərbaycan dilində işləyin. `az-AZ` locale üçün Pastafari təqvim saytında görünən bütün mətni oxuyun; təkcə `/about/` məqaləsini yox. Xüsusilə bunları axtarın:
- türk dili, ingilis dili və ya başqa istənməyən dil sızması;
- Azərbaycan dilində qeyri-təbii, sözbəsöz tərcümə təsiri bağışlayan cümlələr;
- əsas interfeys, istifadəçi bələdçisi, əks axtarış və `/about/` arasında terminoloji uyğunsuzluq;
- yanlış şəkilçi, hal, söz sırası, yazılış və texniki termin;
- ingilis mənbə locale-də olub Azərbaycan locale-də olmayan message key-lər;
- placeholder-lərin dəyişməsi;
- sabit section ID-lərin, formulların, hash-lərin, API adlarının və kanonik adların pozulması.

Mətn sadəcə başa düşüldüyü üçün təsdiqlənməməlidir. O, müstəqil və təbii Azərbaycan dili kimi oxunmalıdır. Həqiqi alqoritmik adlar, API endpoint-ləri və kod identifikatorları olduğu kimi qala bilər; adi texniki proza isə imkan daxilində Azərbaycan dilində yazılmalıdır.

## Tapıntılar və düzəlişlər

İlkin `az-AZ` locale-in böyük hissəsi Azərbaycan dili əvəzinə türkcə idi. Əsas UI, guide, il görünüşü, səhv mesajları, təqvim çevirmə köməyi və kanonik adların xeyli hissəsi ayrıca Azərbaycan dilinə yenidən yazıldı.

Məqalədə də birinci draft-dan qalan çoxlu ingiliscə texniki proza və süni şəkilçi birləşmələri var idi. Bunlar mərhələli şəkildə lokallaşdırıldı: məsələn `canonical` → “kanonik”, `implementation` → “reallaşdırma”, `probability theorem` → “ehtimal teoremi”, `physical moment` → “fiziki an”, `server address` → “server ünvanı” və s. Son turda `absolute`, `flag`, `anchor` və `editorial story` kimi adi ingilis qalıqları da çıxarıldı.

Ayrıca bir neçə açıq morfoloji xəta tapıldı və düzəldildi: `şərti-a`, `meylini da`, `işarəsi da`, `meyllər-ların` kimi formalar təbii Azərbaycan şəkilçiləri ilə əvəz edildi.

Bütün sayt üzrə son türk dili qalıqları içində üç konkret problem də qalmışdı:
- `year.displayedCutletPosition` tamamilə türkcə idi; Azərbaycan dilində yenidən yazıldı.
- kanonik “spindle” adı `İğ` (türkcə) idi; Azərbaycan dilində `İy` edildi.
- `yearFiveThousand` “Dünyanın Yaratılışından Beri Beş Bin İlı” idi; “Dünyanın Yaradılışından bəri beş mininci il” kimi düzəldildi.

Dil turu zamanı əvvəlki bir düzəlişin üç stabil deep-link ID-ni səhvən tərcümə etdiyi də aşkarlandı: `about-təqvim`, `printed-təqvim`, `far-time-quruluş`. Onlar dərhal public contract-dakı `about-calendar`, `printed-calendar`, `far-time-structure` formalarına qaytarıldı. Sonra bütün 72 məqalə canonical 29 ID dəsti ilə ayrıca müqayisə edildi; başqa uyğunsuzluq tapılmadı.

## Düzəlişdən sonrakı yoxlamalar

- İngilis message contract-dakı bütün açarlar Azərbaycan locale-də açıq şəkildə mövcuddur.
- Bütün `{placeholder}` dəstləri ingilis mənbə kontraktı ilə tam eynidir.
- Türk dili üçün hədəfli qalıq skanı təmizdir.
- `/about/` məqaləsində canonical 29 stable ID dəqiq və düzgün sıra ilə qorunub.
- Semantik cədvəllər 19 + 9 sətirdir.
- Məcburi formullar, hash-lər, sabit rəqəmlər və identifikatorlar qorunub.
- Məqalədə istənməyən ivrit mətni yoxdur.
- Adi ingilis texniki proza lokallaşdırılıb; qalan ingilis formaları alqoritmik/API adları, kod və ya görünməyən developer comment-ləridir.
- Türkiyə türkcəsi ilə eyni qalan qısa sözlərin qalan hissəsi ortaq leksika, xüsusi ad və ya beynəlxalq texniki addır; ayrıca türk dili sızması əlaməti qalmayıb.

## Status

Semantik və linqvistik mətn QA-si tamamlanıb. Vizual/render QA və yekun `PASS` ayrıca növbəti mərhələdir.
