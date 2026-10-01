# SUBREVIEW_SESSION
surface: consistency
reviewer_model: Qwen3 8B Q4_K_M
attempts: 1

===== ORIGINAL_USER =====
/no_think

Sən Pastafari təqviminin Azərbaycan dili versiyası üçün müstəqil və sərt dil və istifadəçi interfeysi redaktorusan (locale `az-AZ`, repository kodu `az`).

Bu yoxlama sessiyasındakı BÜTÜN adi təbii-dil ünsiyyəti yalnız Azərbaycan dilində olmalıdır. Başqa dildəki mətni yalnız real dil sızmasını sitat gətirəndə, yaxud dəyişdirilməz texniki identifikator, API adı, düstur, hash, fayl yolu və ya kod literalını göstərmək lazım olduqda işlət.

Bu, təzə və müstəqil LLM yoxlamasıdır. Əvvəlki QA nəticələrinə güvənmə və mövcud ifadələrin avtomatik olaraq düzgün və təbii olduğunu fərz etmə. Tapşırıq sıfırdan tərcümə deyil, ciddi redaktə və yoxlamadır.

Sayt Azərbaycan dili ilə işləyərkən bütün görünən və əlçatanlıq yönümlü mətn təcrübəsini yoxla; təkcə `/about/` səhifəsini yox. Əhatə dairəsinə əsas interfeys, tarix axtarışı, əməl günü, müqayisə, il görünüşü, əks axtarış, xətalar və vəziyyətlər, istifadəçi bələdçisi, footer, metadata/title, manifest, ARIA/a11y, noscript/fallback, dil dəyişimi və `/about/` daxildir.

Xüsusilə bunları fəal axtar:
1. yanlış dildə mətn, xüsusən türk və ya ingilis dilinin qəsdsiz sızması;
2. tərcümə qoxusu, sərt, qeyri-təbii və ya idiomatik olmayan müasir Azərbaycan dili;
3. qrammatika, sintaksis, uzlaşma, registr, durğu, orfoqrafiya və tipografiya xətaları;
4. `/about/` ilə UI arasında termin uyğunsuzluğu;
5. texniki anlayışların yanlış və ya şübhəli Azərbaycan dilində ifadəsi;
6. placeholder-ların yanlış qrammatik və ya semantik rolda işlənməsi;
7. metadata, title, ARIA, manifest, fallback və əlçatanlıq mətnində qeyri-təbii və ya səhv ifadələr;
8. mətnin yaratdığı real sətirbölünmə, overflow və ya dar idarəetmə riski.

Kanonik sabitlər dəyişdirilə bilməz. Düsturları, hash-ləri, code literal-ları, API identifikatorlarını, sabit section ID-lərini və həqiqi kanonik adları sadəcə daha təbii görünsün deyə dəyişmə.

Yanlış müsbət nəticələrin qarşısını alma qaydaları:

- Web App Manifest `*_localized` dil xəritələrini dəstəkləyir. Əsas fallback `name`, `short_name`, `description`, `lang` və `dir` dəyərlərini təkcə Azərbaycan dilində ayrıca localized girişlər olduğu üçün problem sayma. Əvəzində Azərbaycan dili üçün localized manifest girişlərinin tam və düzgün olub-olmadığını yoxla.
- Statik HTML-də `data-i18n` və ya `data-i18n-attr` olan elementlərdə ingiliscə bootstrap mətn ola bilər. Runtime locale başladıldıqdan sonra onu əvəz edir. Belə source-default mətni təkbaşına problem sayma; yalnız Azərbaycan locale işə düşdükdən sonra və ya real fallback/error yolunda görünə bildiyini sübut edən halı bildir.
- Statik saytın locale həlli JavaScript vasitəsilə edilir. `noscript` fallback qəsdən dil baxımından neytraldır və yalnız `JavaScript` xüsusi adını və xəbərdarlıq simvolunu ehtiva edir. Bunu dil sızması sayma.
- Redaktor təlimatları, `MODE`/`SOURCE_PART` idarə sətirləri, fayl başlıqları və başqa redaktorların xülasələri sayt mətni deyil. Onlardan heç vaxt `current_text` kimi istifadə etmə və finding-i prompt/artifact faylına aid etmə.
- “Yanlış dil” finding-i yalnız təqdim edilmiş sayt faylından real təbii-dil mətnini dəqiq sitat gətirə və həmin sayt faylını göstərə bildikdə etibarlıdır.
- `correction` `current_text` ilə eynidirsə, bu finding deyil.
- Layihədə `əməl günü`, `soruşulan gün`, `kotlet` və `bir-birinə hörülmüş aylar` kimi domen terminləri qəsdən istifadə olunur. Onların ardıcıl və qrammatik işlənməsini yoxla; sırf qeyri-adi olduqları üçün dəyişmə.

Aşağıda `MODE` və `SOURCE_PART` alacaqsan.

Əgər `MODE=FINDINGS_ONLY`:
- yalnız verilmiş `SOURCE_PART` hissəsini yoxla;
- problem yoxdursa `CLEAN`, real düzəliş tələb olunursa `FINDINGS` qərarı ver;
- qısa Azərbaycan dili xülasəsi və ən çox altı dəqiq lokallaşdırılmış finding ver;
- hər finding üçün severity (`critical`, `high`, `medium`, `low`), dəqiq fayl/location, qısa və dəqiq `current_text`, problem və tətbiq edilə bilən `correction` göstər;
- `current_text` təqdim olunan mənbədəki dəqiq verbatim substring olmalıdır;
- hər `location` `docs/` ilə başlamalıdır;
- dublikatları birləşdir və geniş, əsassız finding yaratma;
- problem yoxdursa, nəyin yoxlandığını və niyə təmiz olduğunu qısa Azərbaycan dilində bildir;
- bütün mənbəni və uzun kod hissələrini geri kopyalama;
- `SUBREVIEW_RESULT` və ya `NATIVE_QA_RESULT` sətirlərini özün yazma; runner onları mexaniki şəkildə əlavə edir.

MODE=FINDINGS_ONLY
SOURCE_PART=CONSISTENCY
SURFACE_CONTRACT:
SCOPE_UI_ABOUT_TERMINOLOGY_ONLY=TRUE
IGNORE_CALENDAR_MATHEMATICS_AND_CODE_QUALITY=TRUE
LOCALE_FINDING_LOCATION_REQUIRES_TRANSLATION_KEY_FRAGMENT=TRUE
CURRENT_TEXT_MUST_EQUAL_EXACT_LOCALE_VALUE=TRUE
ACTIONABLE_CHANGE_REQUIRED=TRUE

===== docs/i18n/locales/az.js — FULL TARGET UI TERMINOLOGY =====
"use strict";

export default Object.freeze({
  "code": "az",
  "displayName": "Azərbaycanca",
  "dir": "ltr",
  "intlLocale": "az-AZ",
  "messages": {
    "meta.description": "Tarix axtarışı və müqayisə imkanı olan Pastafari təqvimi.",
    "manifest.shortName": "Pastafari",
    "manifest.defaultDescription": "Yerli, deterministik Pastafari təqvimi.",
    "app.brand": "PASTAFARI",
    "app.title": "Pastafari Təqvimi",
    "nav.skip": "Tarix axtarışına keç",
    "app.intro": "Mövcud təqvimlərdən birində bir günü axtarın, sonra onun tam Pastafari tarixini və aid olduğu kotleti görün.",
    "guide.open": "Bu saytdan necə istifadə etməli?",
    "guide.openShort": "Saytdan istifadə",
    "about.open": "Pastafari təqvimi haqqında",
    "about.openShort": "Təqvim haqqında",
    "about.title": "Pastafari təqvimi haqqında",
    "about.metaDescription": "Pastafari təqviminin izahı: əməl günü və soruşulan gün, illər, kotletlər, bir-birinə hörülmüş aylar, gün sərhədi və irəli səviyyə mexanizmləri.",
    "about.intro": "Təqvimin günləri, illəri, kotletləri, bir-birinə hörülmüş ayları və əməl gününü necə təqdim etdiyi.",
    "about.skip": "Təqvim izahına keç",
    "about.back": "Təqvimə qayıt",
    "about.tocKicker": "Bu səhifədə",
    "about.toc": "Mündəricat",
    "about.fallbackNotice": "İzah hələ seçilmiş dildə mövcud deyil, ona görə standart versiya göstərilir.",
    "about.loadError": "Təqvim izahını yükləmək mümkün olmadı.",
    "language.label": "Dil",
    "day.staleWarning": "Cari gün {previousDate} tarixindən {currentDate} tarixinə dəyişdi. Əməl günü cari gün olduğuna görə göstərilən tarixlər artıq aktual deyil. Bu bildirişi bağladıqdan sonra onlar yenidən hesablanacaq.",
    "location.assumption": "(Əksini göstərən məlumat olmadıqda, cihazın Kisurrada olduğu güman edilir.)",
    "location.useDevice": "Cihazın məkanından istifadə et",
    "search.kicker": "Tarix axtarışı",
    "search.heading": "Hansı günü tapmaq istəyirsiniz?",
    "search.intro": "Təqvim seçin, tarix daxil edin və “Tarixi göstər” düyməsini seçin.",
    "search.calendarLabel": "Daxiletmə təqvimi",
    "search.submit": "Tarixi göstər",
    "search.invalid": "Tarix tanınmadı. Bütün sahələrin doldurulduğunu və tarixin seçilmiş təqvimdə mövcud olduğunu yoxlayın.",
    "settings.summary": "Hesablama və müqayisə seçimləri",
    "settings.heading": "Əməl gününü dəyiş",
    "settings.intro": "Əməl günü hesablamanın başlanğıc nöqtəsidir.",
    "settings.actionCalendarLabel": "Əməl gününü daxil etmək üçün təqvim",
    "settings.apply": "Əməl gününü tətbiq et",
    "settings.reset": "Bu günə qayıt",
    "settings.invalid": "Əməl günü etibarsızdır. Tarixi yoxlayın və yenidən cəhd edin.",
    "comparison.toggle": "İki hesablamanı yan-yana müqayisə et",
    "comparison.toggleHelp": "Geniş masaüstü ekranda mövcuddur. Hər sətir iki əməl günü altında eyni soruşulan günü göstərir.",
    "comparison.secondActionLabel": "İkinci əməl gününü daxil etmək üçün təqvim",
    "comparison.apply": "Müqayisəni yenilə",
    "comparison.kicker": "Gün üzrə uyğunlaşdırılmış müqayisə",
    "comparison.heading": "Eyni günlər, iki əməl günü",
    "comparison.intro": "Hər sətirdə eyni soruşulan gün var. Birinci və ikinci sütun arasında yalnız əməl günü fərqlənir.",
    "comparison.sameDay": "Hər iki hesablamanın ortaq günü",
    "comparison.actionHeading": "Əməl günü: {date}",
    "comparison.summary": "Birinci hesablamanın açdığı kotletin ilk günündən son gününədək {count} gün göstərilir.",
    "comparison.scrollAria": "Eyni günlərin iki hesablama altında müqayisə cədvəli",
    "comparison.desktopOnly": "Tam müqayisə cədvəli geniş masaüstü ekranda mövcuddur.",
    "comparison.invalid": "İkinci əməl günü etibarsızdır. Tarixi yoxlayın və yenidən cəhd edin.",
    "field.year": "İl",
    "field.month": "Ay",
    "field.day": "Gün",
    "field.relatedYear": "Uyğun Qriqorian ili",
    "field.leapMonth": "Artıq ay",
    "field.era": "Dövr",
    "field.eraYear": "Dövrdə il",
    "field.ayyamiHa": "Ayyám-i-Há",
    "field.baktun": "Baktun",
    "field.katun": "Katun",
    "field.tun": "Tun",
    "field.uinal": "Uinal",
    "field.kin": "Kin",
    "field.correlation": "Korrelyasiya nömrəsi",
    "era.meiji": "Meiji",
    "era.taisho": "Taishō",
    "era.showa": "Shōwa",
    "era.heisei": "Heisei",
    "era.reiwa": "Reiwa",
    "calendarInput.gregorian": "Qriqorian",
    "calendarInput.julian": "Yulian",
    "calendarInput.hebrew": "İbrani",
    "calendarInput.islamicCivil": "Mülki İslam",
    "calendarInput.islamicUmmAlQura": "Umm al-Qura",
    "calendarInput.solarHijriOfficial": "Günəş hicri — rəsmi",
    "calendarInput.solarHijriArithmetic": "Günəş hicri — hesabi 2 820",
    "calendarInput.chinese": "Çin",
    "calendarInput.hinduOldSolar": "Qədim hindu — günəş",
    "calendarInput.hinduOldLunar": "Qədim hindu — ay",
    "calendarInput.saka": "Saka",
    "calendarInput.thaiBuddhist": "Tay buddist",
    "calendarInput.ethiopic": "Efiopiya",
    "calendarInput.coptic": "Kopt",
    "calendarInput.japaneseImperial": "Yapon imperiya",
    "calendarInput.minguo": "Minguo",
    "calendarInput.bahaiTehran": "Bahá’í — Tehran gecə-gündüz bərabərliyi",
    "calendarInput.bahaiWestern": "Bahá’í — Qərb hesabi",
    "calendarInput.mayaLongCount": "Maya uzun sayımı",
    "calendarHelp.hebrew": "Aylar adla seçilir. İl və gün üçün onluq rəqəmlər və ya ivrit rəqəm hərfləri, məsələn תשפ״ו və ya י״ד, daxil edilə bilər; minlik işarəsi olmayan hərflə yazılmış il 5000 əlavə edilməklə şərh olunur.",
    "calendarHelp.intl": "Bu çevirmə brauzerinizdə quraşdırılmış təqvim dəstəyindən istifadə edir. Brauzer tarixi göstərə bilmirsə, sayt bunu açıq şəkildə bildirir.",
    "calendarHelp.chinese": "Çin ili ilə uyğun Qriqorian ilini daxil edin və “Artıq ay”ı yalnız təkrarlanan ay üçün işarələyin.",
    "calendarHelp.hindu": "Qədim hindu hesabı ilə ili və günü daxil edin, ayı isə adı ilə seçin. Ay təqvimi formasında əlavə ayı da işarələmək olar.",
    "calendarHelp.japanese": "1-ci il eranın ilk günündə başlayır; birinci il üçün 元 və ya 元年 də daxil edə bilərsiniz. Eranın başlanmasından əvvəlki və ya bitməsindən sonrakı tarix qəbul edilmir.",
    "calendarHelp.bahai": "Ayı adı ilə və ya Ayyám-i-Há seçin. Tehran bərabərliyi forması ənənəvi 1844–3000 Qriqorian aralığını dəstəkləyir.",
    "calendarHelp.maya": "Standart korrelyasiya GMT 584.283-dür. Başqa korrelyasiyadan istifadə edirsinizsə, onu dəyişə bilərsiniz.",
    "loading.kicker": "Yerli hesablanır",
    "loading.title": "Kotlet və tarix axtarılır…",
    "error.kicker": "Təqvimi göstərmək mümkün deyil",
    "error.title": "Hesablama mühərriki yüklənməyib",
    "error.reload": "Yenidən yüklə",
    "error.timeout": "Hesablama çox uzun çəkir.",
    "error.engineFailed": "Hesablama mühərriki xəta verdi.",
    "error.engineLoadFailed": "Hesablama mühərrikini yükləmək mümkün olmadı.",
    "calendar.toolbarAria": "Kotletlər arasında naviqasiya",
    "calendar.previous": "Əvvəlki kotlet",
    "calendar.today": "Bu günə qayıt",
    "calendar.next": "Növbəti kotlet",
    "calendar.daysAria": "{cutletName} kotletindəki günlər",
    "calendar.currentCutlet": "İl {year} · kotlet",
    "calendar.cutletDescription": "{count} gün · əməl günü: {actionDate}",
    "calendar.targetOutside": "Axtardığınız tarix hazırda ekranda göstərilən kotletdə deyil. Baxışı davam etdirə və ya başqa tarix axtara bilərsiniz.",
    "year.kicker": "İlə bir baxış",
    "year.heading": "{year} ilinin quruluşu",
    "year.context": "Bu quruluş {actionDate} əməl günü üçün hesablanıb. Əməl gününü dəyişmək il sərhədlərini, kotletləri və ayları yenidən qura bilər.",
    "year.loading": "Tam il quruluşu yaradılır…",
    "year.error": "Tam il quruluşunu yaratmaq mümkün olmadı. Kotlet görünüşü yenə də mövcuddur.",
    "year.lengthLabel": "İlin uzunluğu",
    "year.cutletCountLabel": "Kotletlər",
    "year.monthCountLabel": "Aylar",
    "year.rangeLabel": "Qriqorian aralığı",
    "year.daysValue": "{count} gün",
    "year.rangeValue": "{startDate}–{endDate}",
    "year.displayedCutletPosition": "Göstərilən kotlet ilin {start}–{end}-ci günlərini əhatə edir.",
    "year.targetPosition": "Axtarılan tarix bu ilin {length} günü arasında {day}-ci gündür.",
    "year.monthExplainer": "Aylar il boyu kotletlərdən müstəqil şəkildə bir-birinə hörülür: ay kotletin alt bölməsi deyil və onun günləri bir neçə ayrı ardıcıllıqda görünə bilər. Buna görə ayın uzunluğu ona təyin edilmiş günlərin ümumi sayıdır; bu, mütləq bir fasiləsiz dövr demək deyil.",
    "year.cutletsSummary": "Bu ildəki kotletlər ({count})",
    "year.monthsSummary": "Bu ildəki aylar ({count})",
    "year.numberedName": "{number}. {name}",
    "year.cutletMeta": "Uzunluq: {length} gün · ildə mövqe: {start}–{end}-ci günlər",
    "year.monthMeta": "Günlər: {length} · fasiləsiz ardıcıllıqlar: {runs} · ilk görünüş: gün {first} · son görünüş: gün {last}",
    "target.today": "Bu, bu gündür",
    "target.searched": "Bu, axtardığınız tarixdir",
    "target.context": "Soruşulan tarix: {targetDate} · əməl günü: {actionDate}",
    "target.notInView": "Axtardığınız tarix saxlanılır; hazırda başqa kotlet göstərilir.",
    "date.aria": "Dünyanın Yaradılışından bəri il {year}, {cutletName} kotletində gün {dayInCutlet}, {monthName} ayında gün {dayInMonth}",
    "date.yearLine": "Dünyanın Yaradılışından bəri il {year}",
    "date.cutletLine": "{cutletName} kotletində gün {dayInCutlet}",
    "date.monthLine": "{monthName} ayında gün {dayInMonth}",
    "guide.eyebrow": "İstifadəçi bələdçisi",
    "guide.heading": "Burada nə etmək olar və necə?",
    "guide.intro": "Sayt hər gün üçün tam Pastafari tarixini göstərir, çoxsaylı təqvimlərdə axtarışı dəstəkləyir və geniş ekranda əməl gününün təsirini müqayisə edə bilir.",
    "guide.1.heading": "Saytı açın və bu günü görün",
    "guide.1.body": "Qeydiyyat və giriş yoxdur, heç bir tarix serverə göndərilmir. Böyük başlıq və kartdakı işarə bu günü aydın göstərir.",
    "guide.2.heading": "Mövcud təqvimlərdən istənilən birində axtarın",
    "guide.2.body": "“Hansı günü tapmaq istəyirsiniz?” bölməsində təqvim seçin, sahələri doldurun və “Tarixi göstər” düyməsini seçin. Seçimlərə Qriqorian, İbrani, Yulian, İslam, Fars, Çin, hindu, Saka, Tay, Efiopiya, Kopt, Yapon, Minguo, Bahá’í və Maya uzun sayımı daxildir.",
    "guide.3.heading": "Tarixi oxuyun",
    "guide.3.body": "Hər kartda üç sabit sətir var: Dünyanın Yaradılışından bəri il; kotletdə gün nömrəsi və kotletin adı; sonra ayda gün və ayın adı. Heç bir tək rəqəm öz-özlüyündə bütün tarixi ifadə etmir. Kartın rəngini ayın adı müəyyən edir.",
    "guide.4.heading": "Təsadüfən seçim etmədən hərəkət edin",
    "guide.4.body": "“Əvvəlki kotlet” və “Növbəti kotlet” qonşu kotletlərə keçir. Digər gün kartları düymə deyil, çünki onları klikləmək heç bir əməliyyat aparmır.",
    "guide.5.heading": "Əməl gününü dəyişin",
    "guide.5.body": "Axtarışın altındakı “Hesablama və müqayisə seçimləri” bölməsini açın. Orada təqvim seçib başqa əməl günü daxil edə bilərsiniz. Bu irəli səviyyəli parametr adi görünüşü yükləmədən əlçatan qalır.",
    "guide.6.heading": "Eyni günləri iki dəfə müqayisə edin",
    "guide.6.body": "Geniş ekranda həmin bölmədə müqayisəni aktivləşdirin. Hər sətirdə tam eyni soruşulan gün var; birinci sütun birinci əməl günündən, ikinci sütun isə ikinci əməl günündən istifadə edir. Standart müqayisə bu günlə sabah arasındadır ki, dəyişən Pastafari tarixləri asan görünsün.",
    "guide.7.heading": "Bütün ili görün",
    "guide.7.body": "Kotlet görünüşünün altında sayt göstərilən ilin quruluşunu verir: uzunluğu və aralığı, hər kotlet və onun uzunluğu, həmçinin hər ay. Aylar fasiləsiz ardıcıllıqların sayını və ilk-son görünüşlərini də göstərir; beləliklə ilin içindəki hörülmə görünür.",
    "guide.note": "Kart torundakı sətir və sütunlar yalnız vizual düzəndir, həftə deyil. Müqayisə cədvəlində isə uyğunlaşdırma məna daşıyır: hər sətir eyni soruşulan gündür.",
    "guide.back": "Axtarış və təqvimə qayıt",
    "footer.local": "Hesablama cihazınızda aparılır; bu saytda istifadəçi hesabı və izləmə kodu yoxdur.",
    "footer.open": "Keçid hamı üçün açıqdır və məxfi baxış pəncərəsində də birbaşa açılır.",
    "reverse.kicker": "Əks axtarış",
    "reverse.heading": "Pastafari tarixinə görə günü tapın",
    "reverse.intro": "Tam Pastafari tarixini daxil edin və əməl gününü müəyyənləşdirin. Axtarış bu cihazda lokal işləyir.",
    "reverse.mode.basic": "Tək tarix",
    "reverse.mode.advanced": "Məhdudiyyətlər sistemi",
    "reverse.basic.heading": "Tək tarix üçün əks axtarış",
    "reverse.basic.dateHeading": "Tapılacaq Pastafari tarixi",
    "reverse.field.year": "İl",
    "reverse.field.cutlet": "Kotlet",
    "reverse.field.dayInCutlet": "Kotletdə gün",
    "reverse.field.month": "Ay",
    "reverse.field.dayInMonth": "Ayda gün",
    "reverse.basic.calculationHeading": "Əməl günü",
    "reverse.basic.calculationMode": "Əməl günü necə müəyyən edilir?",
    "reverse.basic.calculation.active": "Saytın aktiv əməl günündən istifadə et",
    "reverse.basic.calculation.absolute": "Başqa məlum tarixdən istifadə et",
    "reverse.basic.calculation.same": "Əməl günü soruşulan gündür (c = t)",
    "reverse.basic.calculation.pastafari": "Əməl gününün özü Pastafari tarixidir / başqa tarixlərdən asılıdır",
    "reverse.basic.activeValue": "Aktiv əməl günü: {date}",
    "reverse.basic.absoluteHeading": "Məlum əməl günü",
    "reverse.basic.sameHeading": "c = t üçün sonlu axtarış aralığı",
    "reverse.basic.rangeStart": "Aralığın başlanğıcı",
    "reverse.basic.rangeEnd": "Aralığın sonu",
    "reverse.basic.toAdvanced": "Məhdudiyyətlər sistemi redaktorunda davam et",
    "reverse.basic.toAdvancedHelp": "Rekursiv Pastafari əməl günləri dəyişənlər və məhdudiyyətlər kimi göstərilir; beləliklə zəncir süni dərinlik həddi olmadan uzadıla bilər.",
    "reverse.action.solve": "Axtar",
    "reverse.action.cancel": "Axtarışı ləğv et",
    "reverse.action.open": "Təqvimdə aç",
    "reverse.action.addVariable": "Tarix dəyişəni əlavə et",
    "reverse.action.addConstraint": "Məhdudiyyət əlavə et",
    "reverse.action.remove": "Sil",
    "reverse.action.clear": "Nəticələri təmizlə",
    "reverse.progress.reverse": "Pastafari əlaqələri həll edilir",
    "reverse.progress.verify": "Namizəd həllər yoxlanılır",
    "reverse.progress.done": "Axtarış bitdi",
    "reverse.progress.scanned": "Tamamlanmış iş vahidləri: {count}",
    "reverse.status.running": "Lokal axtarılır…",
    "reverse.status.cancelled": "Axtarış ləğv edildi.",
    "reverse.status.superseded": "Bu axtarışı daha yeni axtarış əvəz etdi.",
    "reverse.status.completeEmpty": "Tam axtarılmış sahədə həll yoxdur.",
    "reverse.status.completeSolutions": "Axtarış tamamlandı. Sahədəki bütün {count} həll göstərilir.",
    "reverse.status.partialEmpty": "Axtarış tamamlanmadan dayandı. Hələ həll tapılmayıb.",
    "reverse.status.partialSolutions": "{count} yoxlanmış həll göstərilir, lakin axtarış tamamlanmadan dayandı və əlavə həllər ola bilər.",
    "reverse.status.stale": "Bu nəticələr əvvəlki aktiv əməl günündən istifadə edib. Cari günü istifadə etmək üçün axtarışı yenidən başladın.",
    "reverse.status.rangeRequired": "Sonlu aralıq və ya sabit tarix əlavə edilməyincə bu problem tam axtarıla bilməz.",
    "reverse.status.timeout": "Axtarış tamamlanmadan vaxt həddinə çatdı.",
    "reverse.status.failed": "Əks axtarış mühərriki uğursuz oldu.",
    "reverse.result.heading": "Həllər",
    "reverse.result.solution": "Həll {index}",
    "reverse.result.target": "Soruşulan gün",
    "reverse.result.calculation": "Əməl günü",
    "reverse.result.jdn": "JDN {jdn}",
    "reverse.result.complete": "Tam axtarış",
    "reverse.result.partial": "Qismən axtarış",
    "reverse.advanced.heading": "Məhdudiyyətlər sistemi həlledicisi",
    "reverse.advanced.intro": "Tarix dəyişənlərini və onların arasındakı əlaqələri müəyyənləşdirin. Sistem sonlu sahələrə endiriləndə dövrlərə icazə verilir.",
    "reverse.variables.heading": "Tarix dəyişənləri",
    "reverse.variable.label": "Göstərilən ad",
    "reverse.variable.defaultName": "Tarix {index}",
    "reverse.variable.domain": "Sahə",
    "reverse.variable.domain.unknown": "Naməlum (başqa məhdudiyyətlərlə məhdudlaşdırılmalıdır)",
    "reverse.variable.domain.exact": "Dəqiq məlum tarix",
    "reverse.variable.domain.range": "Sonlu tarix aralığı",
    "reverse.constraint.heading": "Məhdudiyyətlər",
    "reverse.constraint.type": "Məhdudiyyət növü",
    "reverse.constraint.pastafari": "Pastafari tarixi",
    "reverse.constraint.equal": "Eyni mütləq gün",
    "reverse.constraint.order": "Xronoloji sıra",
    "reverse.constraint.difference": "Gün fərqi",
    "reverse.constraint.left": "Sol tarix",
    "reverse.constraint.right": "Sağ tarix",
    "reverse.constraint.target": "Soruşulan tarix dəyişəni",
    "reverse.constraint.calculationMode": "Əməl günü mənbəyi",
    "reverse.constraint.calculation.variable": "Başqa tarix dəyişəni",
    "reverse.constraint.calculation.absolute": "Məlum mütləq tarix",
    "reverse.constraint.calculation.same": "Soruşulan tarixlə eyni (c = t)",
    "reverse.constraint.calculationVariable": "Əməl günü dəyişəni",
    "reverse.constraint.orderOp": "Əlaqə",
    "reverse.constraint.differenceMode": "Fərq qaydası",
    "reverse.constraint.differenceExact": "Dəqiq fərq",
    "reverse.constraint.differenceRange": "Fərq aralığı",
    "reverse.constraint.equals": "Dəqiq gün sayı (sol − sağ)",
    "reverse.constraint.min": "Minimum gün (sol − sağ)",
    "reverse.constraint.max": "Maksimum gün (sol − sağ)",
    "reverse.options.heading": "Axtarış hədləri",
    "reverse.options.intro": "Hədd olmasın deyə sahəni boş saxlayın. Heç bir hədd gizli tətbiq edilmir.",
    "reverse.options.maxSolutions": "Bu qədər yoxlanmış həlldən sonra dayan",
    "reverse.options.maxScanned": "Bu qədər iş vahidindən sonra dayan",
    "reverse.options.timeout": "Millisaniyə ilə vaxt həddi",
    "reverse.advanced.emptyVariables": "Ən azı bir tarix dəyişəni əlavə edin.",
    "reverse.advanced.emptyConstraints": "Sistem heç bir məhdudiyyət ehtiva etməyə bilər, amma qalan hər dəyişənin sonlu sahəsi olmalıdır.",
    "reverse.error.input": "Əks axtarışın bəzi sahələri çatışmır və ya yanlışdır.",
    "reverse.error.range": "Aralığın sonu başlanğıcdan əvvəl ola bilməz.",
    "reverse.error.variable": "Hər məhdudiyyət mövcud tarix dəyişəninə istinad etməlidir.",
    "reverse.error.pastafari": "Pastafari tarixinin bütün beş sahəsini daxil edin.",
    "reverse.error.limitPositive": "{field} müsbət olmalıdır.",
    "reverse.error.limitSafeInteger": "{field} təhlükəsiz tam ədəd aralığından kənardadır.",
    "reverse.error.absoluteDateField": "Mütləq tarix sahəsi etibarsızdır.",
    "reverse.calendar.label": "Bu mütləq tarix üçün istifadə olunan təqvim",

  },
  "calendar": {
    "cutlets": {
      "bronze": "Bürünc",
      "fox": "Tülkü",
      "kidney": "Böyrək",
      "lagash": "Laqaş",
      "thought": "Düşüncə",
      "fourPartsOfNine": "Doqquzun dörd hissəsi",
      "palgurash": "Palgurash",
      "papyrusSedge": "Papirus cilotu",
      "cluster": "Salxım",
      "scorpion": "Əqrəb",
      "ash": "Kül",
      "wheat": "Buğda",
      "river": "Çay",
      "laughter": "Gülüş",
      "akkad": "Akkad",
      "horn": "Buynuz",
      "theEmptyJar": "Boş küp"
    },
    "months": {
      "clay": "Kil",
      "pomegranate": "Nar",
      "elbow": "Dirsək",
      "envy": "Paxıllıq",
      "eridu": "Eridu",
      "toothpaste": "Diş məcunu",
      "threePartsOfFive": "Beşin üç hissəsi",
      "karshumav": "Karshumav",
      "leopard": "Bəbir",
      "tin": "Qalay",
      "mist": "Çən",
      "frankincense": "Kündür",
      "spindle": "İy",
      "rib": "Qabırğa",
      "carob": "Keçibuynuzu",
      "uruk": "Uruk",
      "shame": "Utanc",
      "camel": "Dəvə",
      "copper": "Mis",
      "well": "Quyu",
      "yolk": "Yumurta sarısı",
      "star": "Ulduz",
      "honey": "Bal",
      "spleen": "Dalaq",
      "limestone": "Əhəngdaşı",
      "joy": "Sevinc",
      "fig": "Əncir",
      "nineveh": "Nineva",
      "frog": "Qurbağa",
      "pitch": "Qətran",
      "lamp": "Çıraq",
      "theClosedDoor": "Bağlı qapı",
      "sesame": "Küncüt",
      "nape": "Ənsə",
      "silver": "Gümüş",
      "susa": "Susa",
      "storm": "Fırtına",
      "donkey": "Eşşək",
      "flour": "Un",
      "regret": "Peşmanlıq",
      "babylon": "Babil",
      "tongue": "Dil",
      "flax": "Kətan",
      "salt": "Duz",
      "pear": "Armud",
      "bow": "Yay",
      "sand": "Qum"
    }
  },
  "terminology": {
    "foundationDay": "Təməl Günü",
    "workingNumber": "Əməl sayı",
    "queryNumber": "Sorğu sayı",
    "distanceNumber": "Uzaqlıq sayı",
    "sumNumber": "Cəm sayı",
    "directionNumber": "İstiqamət sayı",
    "bowl": "Kasa",
    "drop": "Damcı",
    "gate": "Qapı",
    "yearFiveThousand": "Dünyanın Yaradılışından bəri beş mininci il"
  }
});


===== docs/about/content/az.html — HEADINGS + LEAD PARAGRAPHS =====
13:   <h2>Pastafari tarixi nədən ibarətdir?</h2>
14:   <p>Onun <strong>dəqiq beş hissəsi</strong> var: il nömrəsi, kotletin adı, kotlet daxilində gün, ayın adı və ay daxilində gün.</p>
15:   <p>Ümumi nümunə: <strong>5000-ci il, A kotleti, kotletin 417-ci günü, B ayı, ayın 83-cü günü.</strong></p>
20:   <h2>Əməl günü niyə lazımdır?</h2>
21:   <p>Adi təqvimlərdə tarixin sanki həmin günün özünə aid sabit xüsusiyyət olduğunu düşünmək təbiidir. Pastafari təqvimində isə tarix iki günün münasibətindən asılıdır.</p>
22:   <p><code>t</code>-ni dəyişmək başqa gün haqqında soruşmaq deməkdir. <code>c</code>-ni dəyişməyin təsiri daha dərindir: illərin sərhədləri, kotletlər, aylar, onların adları və ayların bir-biri ilə necə hörüldüyü dəyişə bilər.</p>
27:   <h2>Eyni gün, fərqli tarix</h2>
28:   <p><strong>Günün kimliyi</strong> ilə onun <strong>Pastafari təqdimatı</strong> eyni şey deyil. Birincisi konkret günün zaman xəttində sabit yeridir; ikincisi həmin gün müəyyən əməl günü altında göstəriləndə alınan beş dəyərdir.</p>
29:   <p>Məhsulda və API-də birincini <code>day-id</code> kimi düşünmək olar: təqdimat dəyişəndə dəyişməyən xronoloji kimlik. Amma</p>
40:   <h2>5000-ci il</h2>
41:   <p>Əməl günü ilə soruşulan gün eyni olanda,</p>
43:   <p>ilin nömrəsi həmişə</p>
55:   <h2>İllər və qapılar</h2>
56:   <p>Bir Pastafari ili</p>
58:   <p>gün çəkə bilər. Bunlar sistemin kanonik sərhədləridir, empirik orta göstəricilər deyil.</p>
64:   <h2>Kotletlər</h2>
65:   <p>Hər il <strong>6-dan 17-yə qədər kotletə</strong> bölünür. Kotlet xronoloji baxımdan fasiləsiz zaman hissəsidir.</p>
66:   <p>Bu gün kotletin 250-ci günüdürsə və bu gün onun son günü deyilsə, sabah eyni kotletin 251-ci günü olacaq. Kotletlərin sərhədləri qapılardır və hər kotlet ən azı</p>
73:   <h2>Aylar və hörgü</h2>
74:   <p>Hər ildə</p>
76:   <p>struktur ay olur və hər aya</p>
86:   <h2>Aylar bir-biri ilə hörülür</h2>
87:   <p>Ayları il boyu uzanan saplar kimi təsəvvür etmək olar. Hər gün yalnız bir aya aiddir; sabah başqa aya aid ola bilər, daha sonra birinci ay geri qayıdıb növbəti nömrəsi ilə davam edə bilər.</p>
88:   <p>Bu hörgünün qaydaları var, o cümlədən ayların ilk və son görünüşlərinin sırasına dair məhdudiyyətlər. Amma bir ay bitmədən digərinin başlaya bilməyəcəyinə dair qayda yoxdur.</p>
97:   <h2>Ayın növbəti günü mütləq sabah deyil</h2>
98:   <p>Bu gün müəyyən ayın 17-ci günüdürsə, həmin ayın 18-ci günü <strong>o ayın növbəti görünüşüdür</strong>. Bu, sabah da ola bilər, çox sonra da.</p>
99:   <p><strong>Sabah</strong> növbəti xronoloji gündür; <strong>ayın növbəti günü</strong> isə həmin ayın növbəti görünüşüdür.</p>
104:   <h2>Həftələr yoxdur</h2>
105:   <p>Mövcud kanonik spesifikasiya <strong>həftə sistemi müəyyən etmir</strong>. Yeddi günlük kanonik vahid yoxdur, Pastafari həftə günlərinin adları yoxdur və iki günü “həftənin eyni günü” edən qayda da yoxdur.</p>
106:   <p>Əlbəttə, mülki həftə sistemi kənardan əlavə edilə bilər; sadəcə Pastafari tarixinin hissəsi deyil.</p><hr>
110:   <h2>Adlar</h2>
111:   <p>17 kanonik kotlet adı və 47 kanonik ay adı var. Bir il ərzində hər ad öz qrupunda ən çox bir dəfə görünür.</p>
112:   <p>Adın kimliyi kanonik və semantikdir; müxtəlif yazılışlar, tərcümələr və ya reallaşdırmalar arasında səsvermənin nəticəsi deyil. Adların mənası barədə ivrit dilindəki Megillah ən yüksək səlahiyyətə malikdir; tərcümə və transliterasiya sadəcə göstərim qatlarıdır.</p>
117:   <h2>Aylar barədə kiçik bir fakt</h2>
118:   <p>47 ay adı var və bir ay ən çox 123-cü günə çata bilər. Buna görə “ay adı + ay daxilində gün nömrəsi” formasında sintaktik baxımdan mümkün cütlərin sayı</p>
120:   <p>olur. İlin hər günü məhz bir belə cütü reallaşdırır. İlin uzunluğu <code>L</code> olarsa, məhz <code>L</code> cüt görünür. Çünki</p>
128:   <h2>Təqvim necə hesablanır?</h2>
129:   <p>Daxili hesablama <strong>sous</strong> adlanır. Onun mərkəzində sadə ədəd</p>
131:   <p>dayanır. Proses beş giriş sayğacı, 7 gizli damcı, 46 görünən damcı, 6 kasa, dəyişən kasa sıraları, 12 son qarışdırma, fərqli cavablar üçün seal, combinatorial selection, qapıların qurulması, illərin seçilməsi, kotletlərin bölünməsi, adların seçilməsi, ayların qurulması və ay günlərinin hörülməsini əhatə edir.</p>
141:   <h2>Short Choice və Wide Choice</h2>
142:   <p>Nisbətən kiçik seçim fəzası üçün <strong>Short Choice</strong> istifadə edilir. Sadə modulo qərəzindən qaçmaq üçün rəddetmə üsulu ilə seçmə tətbiq olunur.</p>
143:   <p>Çox böyük seçim fəzaları üçün <strong>Wide Choice</strong> istifadə edilir. Spesifikasiyanın təmin etmədiyi xüsusiyyətləri ona aid etmək olmaz.</p>
149:   <h2>Struktur atlas</h2>
150:   <p>Buraya qədər təqvim qaydalarından danışdıq. Növbəti rəqəmlər başqa tip məlumatdır: böyük hesablama nümunəsindən alınmış <strong>empirik nəticələr</strong>.</p>
151:   <p>Atlas mühərrik commit-i <code>8e155fa4198ea7bcfeb16138ac5d6662706f4d93</code> əsasında hazırlanıb və 4,096 əməl gününü; hər biri üçün 4990–5010 illərini; 86,016 il strukturunu; 625,437 kotleti; 3,535,422 struktur ayını; 356 milyondan çox fasiləsiz ay segmentini; və eyni ayda <code>n</code>-dən <code>n+1</code>-ə 364 milyondan çox keçidi əhatə edib.</p>
188:   <h2>Ad günləri və ildönümləri</h2>
189:   <p>“Hər il eyni gün” ifadəsinin burada əvvəlcə mənası müəyyən edilməlidir. Təbii təkrarlanma koordinatları <code>(ayın adı, ay daxilində gün)</code> və <code>(kotletin adı, kotlet daxilində gün)</code>-dür; şərtləri birləşdirmək də olar.</p>
190:   <p>Buna görə Pastafari ad günü sadəcə <code>RRULE:FREQ=YEARLY</code> deyil. Seçilmiş təkrarlanma şərtinə uyğun gələn növbəti il tapılmalıdır və ilkin hadisə avtomatik olaraq özünün “növbəti görünüşü” sayılmır.</p>
201:   <h2>Görüşü necə təyin etmək olar?</h2>
202:   <p>İki nəfər görüş gününü Pastafari tarixi ilə müəyyənləşdirmək istəyirsə, ən azı tarixin beş sahəsi və hesablamada istifadə olunan əməl günü barədə razılaşmalıdır. Bu məlumatlar görüşün dəqiq anını öz-özlüyündə müəyyən etmir. Əməl gününü “bu gün” sözü ilə deyil, sabit gün kimliyi ilə saxlamaq daha düzgündür; əks halda tərəflər fərqli təqvimlər hesablaya bilər.</p>
210:   <p>Xüsusilə vacib görüş üçün mütləq xronoloji günü və ya anı da saxlamaq olar. Təqvim inciməz.</p><hr>
214:   <h2>Səyahət və bütün gün davam edən hadisələr</h2>
215:   <p>Hadisə ilə ona göstərilən yerli etiket eyni şey deyil. Müəyyən vaxtlı hadisə sabit xronoloji ana bağlanmalıdır. Səyahət onu zaman daxilində hərəkət etdirmir, amma eyni fiziki an üçün göstərilən yerli Pastafari tarixi dəyişə bilər, çünki “yerli gün” anlayışı yerə bağlıdır.</p>
216:   <p>Bütün gün davam edən (<code>all-day</code>) hadisələrdə fərq daha da böyükdür. Mülki təqvimdə belə hadisə adətən bir gecəyarısından növbəti gecəyarısına qədər davam edir; Pastafari təqvimində isə yerli Pastafari gününün sərhədindən növbəti günün sərhədinədək davam etməlidir. Adətən bunlar eyni anlar deyil.</p>
221:   <h2>Gün nə vaxt dəyişir?</h2>
222:   <p>Yerli Pastafari günü gecəyarısında dəyişmir. Onun sərhədini <strong>Venera mərkəzinin yerli meridian üzrə toposentrik aşağı kulminasiyası</strong> müəyyən edir.</p>
223:   <p>Yəni bu, yerə bağlı yerli astronomik hadisədir. Aşağı kulminasiya 00:00-da baş verməli deyil; onu mülki saat qurşağı müəyyən etmir; yay vaxtının başlanması və bitməsi özü-özlüyündə sərhədi dəyişmir; Veneranın gözlə görünməsi də tələb olunmur.</p>
228:   <h2>Çap edilmiş təqvim və əl ilə hesablama</h2>
229:   <p>Pastafari təqvimini çap etmək olar; sadəcə onun hansı əməl günü üçün hesablandığını qeyd etmək lazımdır. Belə təqvim zamanı həmin günün baxış bucağından göstərir; əməl günü dəyişəndə yeni təqvim lazım ola bilər. Deməli, printer hələ işsiz qalmır.</p>
230:   <p>Spesifikasiya tam və deterministik olduğuna görə hər şeyi əl ilə də hesablamaq olar: giriş sayğaclarını hesablayın, 7 gizli və 46 görünən damcını işlədin, altı kasanı yeniləyin, 12 son qarışdırmanı yerinə yetirin, cavabları çıxarın, qapıları qurun, illəri və kotletləri seçin, kombinator seçimi həyata keçirin, adları seçin və sonra ayları hörün.</p>
235:   <h2>Bəs Seer nədir?</h2>
236:   <p>Kanonik hesablamanın yanında <strong>Pastafarian Calendar Seer</strong> adlı sürətli mühərrik də var. Megillah qaydaları müəyyən edir, kanonik hesablama isə həmin qaydalara əsasən tarixi hesablayır; Seer də eyni cavabı qaytarmalıdır. Seer düzgün kanonik hesablamadan fərqli cavab verirsə, səhv Seer-dədir.</p>
237:   <p>Onun işi eyni sorğuları sürətlə yerinə yetirmək və nəticəni məhsullara asanlıqla inteqrasiya edilə bilən formada qaytarmaqdır.</p>
247:   <h2>Mənşə, Təməl Günü və Lövhələr Günü</h2>
248:   <p>Təqvimin sabit hesablama dayaqları onun mənşəyindən və yenidən çatdırılma tarixindən ayrıdır.</p>
251:     <h3>İstinad nöqtələri</h3>
252:     <p>Sistemdə <strong>Təməl Günü</strong> adlı bir sabit istinad günü var. Proleptik Qriqorian təqvimində bu, <strong>e.ə. 41,222-ci il dekabrın 22-si</strong>dir.</p>
253:     <p>Təməl Günü “zamanın başlanğıcı” deyil; o, hesablama dayağıdır.</p>
263:     <h3>Təqvimin mənşəyi və yenidən çatdırılması</h3>
264:     <p>Pastafari təqvimi yaradılışın bir hissəsidir. Bəşəriyyət müasir dövrdə təqvim yenidən çatdırılanadək ondan istifadə etdiyinin yetərincə fərqində olmadan yararlanıb.</p>
265:     <p>Megillah bu tarixçənin bütün təfərrüatlarını açıqlamır; orada açıq şəkildə deyilməyən təfərrüatlar Megillah mətninin tərkib hissəsi deyil.</p>
271:   <h2>İrəli səviyyə istifadəçilər üçün: tərs çevirmə</h2>
272:   <p>Əməl günü <code>c</code> məlumdursa, tərs çevirmə çox sərt məhdudlaşır. Məlum Pastafari ili daxilində</p>
274:   <p>ən çox bir günü müəyyən edir. Eyni qayda</p>
300:     <h3>Çox uzaq zamandakı struktur</h3>
301:     <p>Spesifikasiyadan çıxarılan riyazi araşdırma dəqiq asimptotik quruluş də tapıb. <strong>Sabit əməl günü</strong> <code>c</code> üçün keçmiş istiqamətində kifayət qədər uzaqda affin dövrilik yaranır.</p>
302:     <p>Əgər</p>
314:   <h2>İrəli səviyyə istifadəçilər üçün: sous nə qədər tarix saxlayır?</h2>
315:   <p>Sous çox aqressiv qarışdırma mexanizmi kimi görünür, amma cəbr araşdırması göstərir ki, o, zahiri görünüşün düşündürdüyündən xeyli çox məlumat saxlayır. Bu, spesifikasiyadan çıxarılan araşdırma nəticəsidir, yeni təqvim qaydası deyil.</p>
316:   <p>Görünən 3–46-cı mərhələlərdə, uyğun asimptotik budaqda generik injektivlik müəyyən edilib: generik halda vəziyyət uyğun giriş tarixçəsini və kasa sırasını bərpa etmək üçün kifayət qədər məlumat saxlayır.</p>
325:   <h2>Beləliklə, Pastafari təqvimi əslində nədir?</h2>
326:   <p>Bu, tarixin sadəcə hədəf günün funksiyası deyil, <strong>əməl günü ilə soruşulan günün birgə funksiyası</strong> olduğu deterministik təqvimdir.</p>
327:   <p>Hər tarixdə dəqiq beş sahə var. İndiki an öz baxış bucağından həmişə 5000-ci ildədir, amma 5000-ci il özü əməl günü ilə birlikdə hərəkət edir. İllər çox uzun ola bilər, kotletlər fasiləsizdir, aylar mütləq deyil və kanonik həftə sistemi yoxdur.</p>
===== ATTEMPT 1 RAW JSON =====
{
  "result": "CLEAN",
  "summary": "Azərbaycan dili versiyası təqvim mətni təbii, sərt və qrammatik olaraq düzgün. Təqvimin UI və `/about/` səhifəsi arasında termin uyğunluğuna, dil sızmalarına və qeyri-təbii ifadələrə nəzər salındı. Təqvimin tərcüməsi təbii Azərbaycan dili ilə uyğun, təqvimin əsas terminləri və UI",
  "findings": []
}
===== ATTEMPT 1 VALIDATION =====
VALID: deduplicated_exact_findings=0

===== NORMALIZED_REVIEW =====
SUBREVIEW_RESULT: CLEAN

Azərbaycan dili versiyası təqvim mətni təbii, sərt və qrammatik olaraq düzgün. Təqvimin UI və `/about/` səhifəsi arasında termin uyğunluğuna, dil sızmalarına və qeyri-təbii ifadələrə nəzər salındı. Təqvimin tərcüməsi təbii Azərbaycan dili ilə uyğun, təqvimin əsas terminləri və UI
