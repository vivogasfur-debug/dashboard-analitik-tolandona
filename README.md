# 🍽️ Database MBG & Relawan Tolandona

Aplikasi web fullstack berbasis **Google Apps Script** dan **Google Sheets** untuk mengelola database **penerima manfaat MBG** serta **data relawan**. Proyek ini menyediakan dashboard analitik, formulir input, tabel pencarian, dan operasi CRUD langsung ke spreadsheet.

## ✨ Fitur Utama

- **Dashboard ringkas** untuk melihat total penerima manfaat, total relawan, penerima aktif, dan relawan aktif.
- **Database Penerima Manfaat MBG** dengan kolom identitas, kategori penerima, jenis kelamin, usia, alamat/dusun, instansi, status MBG, dan catatan.
- **Database Relawan** dengan kolom identitas, nomor HP, jenis kelamin, peran, wilayah tugas, status, dan catatan.
- **CRUD fullstack**: tambah, edit, hapus, dan muat ulang data dari Google Sheets melalui backend Apps Script.
- **Pencarian cepat** pada tabel penerima dan relawan.
- **Grafik komposisi** penerima berdasarkan kategori dan relawan berdasarkan peran menggunakan Chart.js.
- **Auto setup database**: sheet `Penerima MBG` dan `Relawan` dibuat otomatis beserta header jika belum tersedia.
- **Mode pratinjau lokal**: `Index.html` tetap dapat dibuka di browser untuk melihat contoh tampilan, lalu otomatis memakai database live saat dijalankan sebagai Web App Apps Script.

## 🛠️ Teknologi

- **Frontend**: HTML5, CSS3, Bootstrap 5, JavaScript, Chart.js.
- **Backend**: Google Apps Script.
- **Database**: Google Sheets.

## 📂 Struktur File

- `Code.gs` — backend Apps Script untuk inisialisasi sheet, mengambil data, menyimpan data, menghapus data, dan membuat ringkasan dashboard.
- `Index.html` — antarmuka web responsif untuk dashboard, formulir CRUD, tabel pencarian, grafik, dan integrasi `google.script.run`.

## 🧾 Struktur Database

### Sheet `Penerima MBG`

| Kolom | Keterangan |
| --- | --- |
| ID | ID otomatis penerima manfaat. |
| Nama | Nama lengkap penerima. |
| NIK/NISN | Nomor identitas penerima. |
| Kategori | Contoh: Siswa, Santri, Balita, Ibu Hamil, Lansia. |
| Jenis Kelamin | Laki-laki atau Perempuan. |
| Usia | Usia penerima. |
| Alamat/Dusun | Lokasi penerima. |
| Satuan Pendidikan/Instansi | Sekolah, posyandu, atau instansi terkait. |
| Status MBG | Aktif, Menunggu Verifikasi, atau Tidak Aktif. |
| Catatan | Informasi tambahan. |
| Dibuat Pada | Timestamp otomatis. |
| Diperbarui Pada | Timestamp otomatis. |

### Sheet `Relawan`

| Kolom | Keterangan |
| --- | --- |
| ID | ID otomatis relawan. |
| Nama | Nama lengkap relawan. |
| NIK | Nomor identitas relawan. |
| Nomor HP | Kontak relawan. |
| Jenis Kelamin | Laki-laki atau Perempuan. |
| Peran | Contoh: Koordinator, Dapur, Distribusi, Pendataan. |
| Wilayah Tugas | Area kerja relawan. |
| Status | Aktif, Siaga, atau Tidak Aktif. |
| Catatan | Informasi tambahan. |
| Dibuat Pada | Timestamp otomatis. |
| Diperbarui Pada | Timestamp otomatis. |

## 🚀 Cara Deploy ke Google Apps Script

1. Buat atau buka Google Sheets yang akan menjadi database.
2. Pilih **Extensions** > **Apps Script**.
3. Salin isi `Code.gs` ke file `Code.gs` di Apps Script.
4. Buat file HTML bernama `Index`, lalu salin isi `Index.html`.
5. Klik **Deploy** > **New deployment**.
6. Pilih tipe **Web app**.
7. Atur akses sesuai kebutuhan, misalnya hanya akun organisasi atau siapa saja yang memiliki link.
8. Klik **Deploy** dan buka URL Web App yang dihasilkan.

## 🔐 Catatan Operasional

- Pastikan aplikasi dijalankan dari spreadsheet aktif karena backend menggunakan `SpreadsheetApp.getActiveSpreadsheet()`.
- Jangan mengubah nama sheet `Penerima MBG` dan `Relawan` kecuali juga mengubah konfigurasi di `Code.gs`.
- Header sheet dibuat otomatis oleh fungsi `initializeDatabase_()` saat web app dibuka atau data dipanggil.
- Jika data sensitif seperti NIK digunakan, batasi akses deployment hanya kepada petugas yang berwenang.

---

Dibuat untuk membantu pendataan MBG dan koordinasi relawan di Tolandona secara lebih rapi, cepat, dan terukur.
