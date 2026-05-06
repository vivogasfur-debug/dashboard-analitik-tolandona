/**
 * Fungsi utama untuk mengambil data berdasarkan kategori
 */
function getDatabaseData(kategori) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(kategori);
  
  if (!sheet) {
    return { error: "Sheet '" + kategori + "' tidak ditemukan!" };
  }

  const values = sheet.getDataRange().getValues();
  const headers = values.shift(); // Ambil header
  
  // Menentukan indeks kolom Jenis Kelamin (JK) berdasarkan file CSV kamu
  let jkIndex;
  if (kategori === "Siswa") jkIndex = 4;      // Kolom JK di Siswa
  else if (kategori === "Guru") jkIndex = 2;   // Kolom JK di Guru
  else if (kategori === "Posyandu") jkIndex = 5; // Kolom JK di Posyandu
  
  // Hitung Statistik Gender
  let male = 0;
  let female = 0;
  
  values.forEach(row => {
    const jk = String(row[jkIndex]).toUpperCase();
    if (jk === "L") male++;
    else if (jk === "P") female++;
  });

  return {
    total: values.length,
    male: male,
    female: female,
    headers: headers,
    rows: values.slice(0, 50) // Kirim 50 data terbaru untuk tabel
  };
}

function doGet() {
  return HtmlService.createTemplateFromFile('Index')
      .evaluate()
      .setTitle('Dashboard Analitik PM Tolandona')
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}
