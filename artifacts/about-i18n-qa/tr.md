# Türkçe QA — tüm sitenin ara durumu

## Kapsam

Bu inceleme `tr-TR` için yalnızca `/about/` sayfasını değil, tüm siteyi kapsar: ana arayüz, tarih arama, işlem günü, karşılaştırma, yıl görünümü, ters arama, hata ve durum iletileri, kullanıcı kılavuzu, footer, metadata, manifest ve ARIA/erişilebilirlik metinleri.

## Doğrulama

- 258/258 message key mevcut.
- Eksik veya fazladan sözleşme anahtarı yok.
- Tüm `{placeholder}` kümeleri İngilizce sözleşmeyle birebir eşleşiyor.
- `year.targetPosition`, `date.aria`, `date.cutletLine`, `date.monthLine` gibi anlamı placeholder sırasına duyarlı alanlar doğru.
- `guide.1.body`, `guide.4.body`, `guide.5.body`, `guide.6.body` güncel semantiği içeriyor: mevcut Pastafari günü, etkin gözlemci konumu, `ASTRONOMICAL-DAY.md` içindeki Venüs tabanlı gün sınırı, arama/işlem günü sıfırlama davranışı ve seçilmiş işlem gününün sonraki aramalarda korunması.
- Azerice ve Özbekçe locale'lerle tam eşleşmeler sınırlı; geniş kapsamlı fallback işareti yok.
- `/about/` semantic master ile aynı sırada tam 29 stable ID içeriyor; duplicate yok.
- İki semantik tablo sırasıyla 19 ve 9 satır içeriyor.
- Hedefli English technical prose taraması temiz.
- Zorunlu formül/hash/literal öğeleri korunmuş durumda; bunlara `Q=2^{127}-1`, `R=\\operatorname{SAVE}(S+149r)`, `47\\times123=5781`, `5781-5778=3`, `RRULE:FREQ=YEARLY`, `F(c+T,t+T)=F(c,t)`, `14{,}777{,}149` ve `8e155fa4198ea7bcfeb16138ac5d6662706f4d93` dahildir.

## Not

Türkçe Latin alfabesi kullandığından genel bir “Latin residue” taraması anlamlı değildir; bu nedenle dil dışı sızıntı kontrolü hedefli İngilizce teknik terim taramasıyla yapılmıştır.

## Hâlâ açık kapılar

Bu dosya, sitenin tamamının konuşması bütünüyle Türkçe yürütülen ayrı bir LLM oturumunda incelendiğini **kanıtlamaz**. Zorunlu `linguistic QA` kapısı bu nedenle hâlâ açıktır.

Gerçek desktop ve 390 px mobile render QA, accessibility, PWA/offline ve language switching de henüz tamamlanmamıştır.

## Durum

Metin, UI ve semantic contract bir sonraki kapıya hazırdır. Doğru mevcut durum **semantic QA**'dır; `linguistic QA` değildir.
