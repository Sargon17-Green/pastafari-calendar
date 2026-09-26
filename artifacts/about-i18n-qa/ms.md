# QA Bahasa Melayu — status perantaraan seluruh laman

## Skop

Semakan ini meliputi locale `ms-MY` pada seluruh laman, bukan hanya `/about/`: UI utama, carian tarikh, hari tindakan, perbandingan, paparan tahun, carian songsang, ralat dan status, panduan pengguna, footer, metadata, manifest serta teks ARIA/kebolehcapaian.

Artikel `/about/` turut dibaca sepenuhnya untuk mencari sisa bahasa Indonesia atau Inggeris, gaya terjemahan yang tidak semula jadi, istilah yang tidak konsisten dan perubahan tidak sengaja pada unsur teknikal kanonik.

## Keadaan awal

Locale Melayu mempunyai fallback Indonesia yang luas. Pada permulaan semakan, 172 nilai adalah sama tepat dengan locale Indonesia, termasuk banyak ayat UI penuh. Sebahagiannya memang bentuk yang sah dan sama dalam kedua-dua bahasa, tetapi banyak lagi jelas bahasa Indonesia.

Selain itu, empat message key daripada contract Inggeris tiada:
- `app.brand`
- `reverse.error.limitPositive`
- `reverse.error.limitSafeInteger`
- `reverse.error.absoluteDateField`

`manifest.defaultDescription` masih dalam bahasa Inggeris.

## Pembaikan semantik

Kandungan penting yang telah terpotong turut dipulihkan:
- `search.intro` kini menyatakan bahawa hari Pastafari semasa diisi secara lalai;
- `settings.intro` menerangkan bahawa hari tindakan lalai ialah hari Pastafari semasa bagi lokasi pemerhati aktif;
- `guide.1.body` memulihkan penentuan hari semasa, sempadan astronomi Venus daripada `ASTRONOMICAL-DAY.md`, dan fakta bahawa tarikh tidak dihantar ke pelayan pengiraan;
- `guide.4.body` menerangkan bahawa “Kembali ke hari ini” menetapkan semula carian dan hari tindakan;
- `guide.5.body` menerangkan bahawa hari tindakan pilihan terus digunakan dalam carian berikutnya sehingga ditetapkan semula.

Istilah day of working diseragamkan sebagai `hari tindakan`, dan queried day sebagai `hari yang ditanya`.

## Pembersihan Bahasa Melayu

UI yang masih berupa ayat Indonesia telah ditulis semula dalam Bahasa Melayu. Selepas pembersihan luas, beberapa sisa Indonesia yang masih jelas — termasuk `kalender`, `situs`, `bahwa`, `sedang tampil`, `berbeda`, dan frasa gaya Indonesia dalam bantuan Maya serta paparan sasaran — turut dibuang.

Kini terdapat 88 nilai yang masih sama tepat dengan locale Indonesia. Semakan khusus terhadap nilai ini menunjukkan bahawa ia terdiri terutamanya daripada:
- nama khas dan istilah antarabangsa;
- format literal;
- kata atau frasa yang memang sah dan lazim sama dalam Bahasa Melayu dan Bahasa Indonesia.

Carian khusus bagi bentuk Indonesia yang membezakan kedua-dua bahasa tidak lagi menemui kebocoran yang jelas. Namun keputusan akhir tentang pilihan leksikal yang benar-benar paling asli masih perlu dibuat dalam sesi LLM Bahasa Melayu yang berasingan.

## Artikel `/about/`

Artikel asal mengandungi puluhan serpihan prosa teknikal Inggeris seperti `canonical`, `selection space`, `rejection sampling`, `engine commit`, `all-day`, `physical moment`, bahagian Seer yang bercampur Inggeris, `reverse conversion`, `generic injectivity`, `side information`, `finite exact arithmetic check` dan lain-lain.

Sebanyak 77 petikan utama ditulis semula ke dalam Bahasa Melayu. Nama sebenar dan literal teknikal seperti `Short Choice`, `Wide Choice`, `Pastafarian Calendar Seer`, API/HTTP/OpenAPI/CLI/SIMD/SLA, endpoint literal, dan `cold wake` dikekalkan apabila ia benar-benar nama atau sebahagian contract.

Commit utama:
- `25a4df61ef95246252aa416562c4177f5770ae86`
- `6fa0ebb916b96aeae49f2ddff59c6c5f7b678771`
- `557fc5a35064969d1cc77ec3110a46562c2c9def`
- `9a341b6ce276e11f6048df85543cbc1fda4a6379`
- `af9037c635d0087acdee0e9656e4628b1a78e134`

## Pengesahan selepas pembaikan

- Contract Inggeris mempunyai 258 message key dan locale Melayu mempunyai kesemua 258.
- Tiada message key yang hilang atau berlebihan.
- Semua set `{placeholder}` sepadan tepat dengan contract Inggeris.
- Heuristik panjang dan bilangan ayat tidak lagi menunjukkan pemendekan semantik yang mencurigakan.
- Carian khusus bagi kebocoran Indonesia yang jelas adalah bersih.
- `/about/` mempunyai tepat 29 stable ID dalam susunan yang sama dengan semantic master, tanpa pendua.
- Dua jadual semantik mempunyai 19 dan 9 baris.
- Tiada teks Ibrani yang tidak disengajakan.
- Carian sasaran bagi prosa teknikal Inggeris biasa adalah bersih.
- Formula, hash dan literal wajib tidak berubah, termasuk `Q=2^{127}-1`, `R=\\operatorname{SAVE}(S+149r)`, `47\\times123=5781`, `5781-5778=3`, `RRULE:FREQ=YEARLY`, `F(c+T,t+T)=F(c,t)`, `14{,}777{,}149` dan `8e155fa4198ea7bcfeb16138ac5d6662706f4d93`.

## Gate yang masih terbuka

Fail ini **bukan bukti** bahawa seluruh laman telah disemak oleh sesi LLM berasingan yang perbualannya sendiri berlangsung sepenuhnya dalam Bahasa Melayu. Syarat `linguistic QA` itu masih terbuka.

Render QA sebenar pada desktop dan 390 px mobile, accessibility, PWA/offline dan language switching juga belum lengkap.

## Status

Teks, UI dan contract semantik sedia untuk gate berikutnya. Status yang betul sekarang ialah **semantic QA**, bukan `linguistic QA`.
