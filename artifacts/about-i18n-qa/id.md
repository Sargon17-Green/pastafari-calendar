# QA Bahasa Indonesia — status antara seluruh situs

## Cakupan

Pemeriksaan ini mencakup seluruh `id-ID`, bukan hanya `/about/`: UI utama, pencarian tanggal, hari kerja, perbandingan, tampilan tahun, pencarian balik, kesalahan dan status, panduan pengguna, footer, metadata, manifest, serta teks ARIA/aksesibilitas.

## Perbaikan dan verifikasi

- Empat contract key yang hilang telah ditambahkan.
- Semantik terkini dipulihkan pada `search.intro`, `settings.intro`, dan bagian panduan utama.
- Istilah queried day/date diseragamkan.
- Sisa campuran bahasa Inggris biasa di `/about/` dibersihkan, termasuk istilah deployment dan bagian Seer.
- 258/258 message keys; semua set `{placeholder}` sesuai dengan kontrak Inggris.
- `/about/` memiliki tepat 29 stable ID dalam urutan yang sama dengan semantic master.
- Kedua tabel berisi 19 dan 9 baris.
- Rumus, hash, dan literal wajib tetap utuh.

## Gate yang masih terbuka

Catatan ini tidak membuktikan review seluruh situs dalam sesi LLM terpisah yang percakapannya sendiri sepenuhnya dalam Bahasa Indonesia. `linguistic QA`, render QA nyata, accessibility, PWA/offline, dan language switching masih terbuka.

## Status

Status yang benar saat ini adalah **semantic QA**.
