# QA Basa Jawa — status antara kanggo situs sakabèhé

## Cakupan pamriksan

Pamriksan iki nyakup locale `jv-ID` ing situs sakabèhé, ora mung artikel `/about/`: antarmuka utama, panggolèkan tanggal, dina tumindak, pambandhingan, tampilan taun, panggolèkan walik, pesen kasalahan lan status, pituduh panganggo, footer, metadata, manifest, lan teks ARIA/aksesibilitas.

Artikel `/about/` uga diwaca kabèh kanggo nggoleki campuran basa Indonesia utawa Inggris, ukara sing kaya terjemahan mentah, masalah tata basa lan register, ora ajegé istilah, lan owahé unsur teknis kanonik.

## Masalah utama sing ditemokaké

Versi wiwitan locale Basa Jawa isih campuran Basa Jawa lan Basa Indonesia. Nalika dibandhingaké langsung karo locale Indonesia, ana 115 nilai sing padha persis. Sawetara pancèn jeneng utawa istilah sing lumrah padha ing loro basa, nanging akèh sing cetha Basa Indonesia, umpamané:

- `Bagaimana cara menggunakan situs ini?`
- `Muat ulang`
- `Kotlet sebelumnya`
- `Kotlet berikutnya`
- `Kekaisaran Jepang`
- lan akèh ukara lengkap ing panggolèkan, pambandhingan, tampilan taun, pituduh, lan footer.

Locale uga kurang papat message key saka kontrak Inggris:

- `app.brand`
- `reverse.error.limitPositive`
- `reverse.error.limitSafeInteger`
- `reverse.error.absoluteDateField`

`manifest.defaultDescription` isih nganggo Inggris.

Ana uga ketidakajegan istilah kanggo konsep sing padha. Artikel `/about/` wis nganggo `dina tumindak`, nanging UI nyampur `dina kerja` lan `dina pangétungan`. Saiki konsep day of working dijenengi `dina tumindak` ing saindhenging situs, lan queried day tetep `dina sing ditakokaké`.

## Koreksi semantis ing UI

Perbandhingan karo 258 pesen kontrak Inggris nemokaké isi sing ilang, ora mung masalah basa:

- `search.intro` ora nyebut yèn dina Pastafari saiki wis diisi kanthi gawan;
- `settings.intro` ora nerangaké yèn gawané yaiku dina Pastafari saiki miturut lokasi pengamat aktif;
- `guide.1.body` wis kelangan penentuan dina saiki, wates dina astronomis Venus miturut `ASTRONOMICAL-DAY.md`, lan pratelan yèn tanggal ora dikirim menyang server pangétungan;
- `guide.4.body` ora nerangaké yèn “Bali menyang dina iki” ngreset panggolèkan lan dina tumindak;
- `guide.5.body` ora nerangaké yèn dina tumindak pilihan tetep digunakaké déning panggolèkan sabanjuré nganti direset.

Kabèh isi kuwi wis dibalèkaké nganggo Basa Jawa sing ajeg.

## Jeneng lan istilah

Sawetara jeneng kotlet, wulan, lan istilah internal uga isih bentuk Indonesia sing cetha. Jeneng sing nduwé padanan Basa Jawa sing jelas wis dibeneraké tanpa ngganti identitas semantisé, umpamané `Prunggu`, `Ginjel`, `Patang Bagéan saka Sanga`, `Awu`, `Kali`, `Sungu`, `Kendhi Kosong`, `Lempung`, `Meri`, `Odhol`, `Pedhut`, `Menyan`, `Iga`, `Isin`, `Kuning Endhog`, `Lintang`, `Watu Gamping`, `Kodhok`, `Lawang Katutup`, `Githok`, `Glepung`, `Getun`, `Ilat`, `Uyah`, `Gendhéwa`, lan `Wedhi`.

Nilai sing isih padha persis karo locale Indonesia sawisé pamriksan yaiku jeneng proper, istilah internasional, utawa tembung sing lumrahé pancèn padha ing Basa Jawa lan Basa Indonesia; iki ora dianggep bukti fallback kanthi otomatis.

## Reresik artikel `/about/`

Artikelé wis akeh nganggo Basa Jawa, nanging ana puluhan pulo Inggris teknis sing ora perlu, kayata `canonical specification`, `input counter`, `combinatorial selection`, `selection space`, `physical moment`, `exact example`, `absolute address`, `generic injectivity`, `side information`, `finite exact arithmetic check`, `computational core`, `canonical week system`, lan sakumpulan prosa Inggris ing bagean Seer.

Kabèh prosa kaya mangkono wis diowahi dadi Basa Jawa. Jeneng lan literal nyata kayata `Short Choice`, `Wide Choice`, `Pastafarian Calendar Seer`, API/HTTP/OpenAPI/CLI/SIMD/SLA, endpoint `date`/`range`/`batch`/`year`/`reverse`/`metadata`/`locales`/`status`, lan `cold wake` tetep dijaga nalika pancèn dadi jeneng utawa literal teknis.

Commit utama kanggo reresik iki:

- `c2882b699137218657dd09cb4dc2f9e4bd44783d`
- `f6211451b98fb89cfeff3aadf3f48c587b3432df`
- `42474bcca657e8439746edcda48528c85082a4b5`
- `3f3fb26f9af123fe4678927344d5662098d0cf2e`
- `4441e0770a04fbaf5a37f4bac60b0b7668fc1edf`

## Pamriksan sawisé koreksi

- Kontrak Inggris nduwé 258 message key lan locale Basa Jawa nduwé 258 kabèh.
- Ora ana message key sing kurang utawa keluwihan.
- Kabèh himpunan `{placeholder}` padha persis karo kontrak Inggris.
- Heuristik dawa lan cacah ukara ora nemokaké maneh pemendekan semantis sing curiga.
- Pindai tembung lan tata ukara Indonesia sing cetha ora nemokaké fallback Indonesia sing isih kari ing UI.
- `/about/` nduwé pas 29 stable ID kanthi urutan sing padha karo semantic master lan tanpa duplikat.
- Rong tabel semantis nduwé 19 lan 9 larik.
- Ora ana teks Ibrani sing ora disengaja ing artikel Basa Jawa.
- Pindai pungkasan kanggo prosa Inggris biasa ora nemokaké fragmen sing durung dibeneraké.
- Formula, hash, nomer, lan literal wajib tetep ana tanpa owah, kalebu `Q=2^{127}-1`, `R=\\operatorname{SAVE}(S+149r)`, `47\\times123=5781`, `5781-5778=3`, `RRULE:FREQ=YEARLY`, `F(c+T,t+T)=F(c,t)`, `14{,}777{,}149`, lan `8e155fa4198ea7bcfeb16138ac5d6662706f4d93`.

## Gate sing isih mbukak

Dokumen iki **dudu** bukti yèn syarat pungkasan “LLM mriksa situs sakabèhé ing sesi kapisah sing obrolané dhéwé nganggo Basa Jawa” wis ditindakake. Obrolan saiki dudu sesi Basa Jawa kapisah, mula syarat kasebut durung kena dianggep rampung.

Pamriksan render nyata ing desktop lan 390 px mobile, aksesibilitas, PWA/offline, lan ganti basa uga durung dadi gate sing rampung.

## Status

Teks, UI, lan kontrak semantis wis layak mlebu gate sabanjuré. Mula status sing bener saiki yaiku **semantic QA**, dudu `linguistic QA`. Status `linguistic QA`, `rendered`, lan `PASS` mung kena diwènèhaké sawisé gate sing cocog pancèn wis ditindakake.
