# 📊 Analytics Masterpiece - PM Tolandona

Sistem Dashboard Analitik modern yang dirancang untuk memonitoring data distribusi dan demografi secara real-time. Proyek ini mengintegrasikan **Google Sheets** sebagai database dengan antarmuka web yang interaktif dan *colorful*.

## 🚀 Fitur Utama
- **Multi-Database Support**: Memisahkan dan menampilkan data dari tiga kategori utama: **Siswa**, **Guru**, dan **Posyandu**.
- **Full Colour Dashboard**: Tampilan kartu statistik yang cerah untuk memudahkan pembacaan data (Total, Laki-laki, Perempuan).
- **Glassmorphism Table**: Tabel data transparan dengan efek kaca yang modern dan responsif.
- **Real-Time Integration**: Data diambil langsung dari Google Sheets menggunakan Google Apps Script (GAS) melalui logika *server-side*.

## 🛠️ Teknologi yang Digunakan
- **Frontend**: HTML5, CSS3 (Custom Glassmorphism), Bootstrap 5.
- **Charts & Logic**: Google Apps Script (GAS), JavaScript (Client-side).
- **Database**: Google Sheets API.

## 📂 Struktur File
- `Code.gs`: Logika backend untuk pemrosesan data, filtering kategori, dan perhitungan statistik gender secara otomatis.
- `Index.html`: Struktur antarmuka pengguna, gaya visual, dan jembatan komunikasi antara UI dan server.

## 📝 Cara Penggunaan
1. Pastikan Anda memiliki Google Sheets dengan sheet bernama: `Siswa`, `Guru`, dan `Posyandu`.
2. Buka editor Google Apps Script.
3. Salin kode dari `Code.gs` dan `Index.html` ke editor tersebut.
4. Klik **Deploy** > **New Deployment** > **Web App**.
5. Salin URL Web App yang dihasilkan untuk mengakses dashboard.

---
*Proyek ini dikembangkan untuk mengoptimalkan manajemen data pendidikan dan kesehatan di wilayah Tolandona.*
