const SHEET_CONFIG = {
  penerima: {
    sheetName: 'Penerima MBG',
    idPrefix: 'PM',
    label: 'Penerima Manfaat MBG',
    headers: [
      'ID',
      'Nama',
      'NIK/NISN',
      'Kategori',
      'Jenis Kelamin',
      'Usia',
      'Alamat/Dusun',
      'Satuan Pendidikan/Instansi',
      'Status MBG',
      'Catatan',
      'Dibuat Pada',
      'Diperbarui Pada'
    ]
  },
  relawan: {
    sheetName: 'Relawan',
    idPrefix: 'RLW',
    label: 'Relawan MBG',
    headers: [
      'ID',
      'Nama',
      'NIK',
      'Nomor HP',
      'Jenis Kelamin',
      'Peran',
      'Wilayah Tugas',
      'Status',
      'Catatan',
      'Dibuat Pada',
      'Diperbarui Pada'
    ]
  }
};

function doGet() {
  initializeDatabase_();
  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setTitle('Database MBG & Relawan Tolandona')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function getAppData() {
  initializeDatabase_();

  return {
    penerima: getSheetRows_('penerima'),
    relawan: getSheetRows_('relawan'),
    summary: getDashboardSummary_(),
    options: getFormOptions_()
  };
}

function saveRecord(type, payload) {
  initializeDatabase_();
  validateType_(type);

  const config = SHEET_CONFIG[type];
  const sheet = getSheet_(type);
  const now = new Date();
  const cleanPayload = sanitizePayload_(payload || {});
  const headers = config.headers;
  const existingRows = sheet.getDataRange().getValues();
  const id = cleanPayload.ID || createId_(config.idPrefix);
  const rowIndex = findRowIndexById_(existingRows, id);
  let createdAt = now;

  if (rowIndex > -1) {
    createdAt = existingRows[rowIndex][headers.indexOf('Dibuat Pada')] || now;
  }

  const row = buildRow_(type, cleanPayload, id, createdAt, now);

  if (rowIndex > -1) {
    sheet.getRange(rowIndex + 1, 1, 1, headers.length).setValues([row]);
  } else {
    sheet.appendRow(row);
  }

  return {
    success: true,
    message: config.label + ' berhasil disimpan.',
    data: getAppData()
  };
}

function deleteRecord(type, id) {
  initializeDatabase_();
  validateType_(type);

  const sheet = getSheet_(type);
  const values = sheet.getDataRange().getValues();
  const rowIndex = findRowIndexById_(values, id);

  if (rowIndex === -1) {
    throw new Error('Data dengan ID ' + id + ' tidak ditemukan.');
  }

  sheet.deleteRow(rowIndex + 1);

  return {
    success: true,
    message: 'Data berhasil dihapus.',
    data: getAppData()
  };
}

function initializeDatabase_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  Object.keys(SHEET_CONFIG).forEach(function(type) {
    const config = SHEET_CONFIG[type];
    let sheet = ss.getSheetByName(config.sheetName);

    if (!sheet) {
      sheet = ss.insertSheet(config.sheetName);
    }

    const headerRange = sheet.getRange(1, 1, 1, config.headers.length);
    const currentHeaders = headerRange.getValues()[0];
    const needsHeader = currentHeaders.join('') === '' || config.headers.some(function(header, index) {
      return currentHeaders[index] !== header;
    });

    if (needsHeader) {
      headerRange.setValues([config.headers]);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#12372a');
      headerRange.setFontColor('#ffffff');
      sheet.setFrozenRows(1);
    }
  });
}

function getSheet_(type) {
  validateType_(type);
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_CONFIG[type].sheetName);
}

function getSheetRows_(type) {
  const config = SHEET_CONFIG[type];
  const values = getSheet_(type).getDataRange().getValues();

  if (values.length <= 1) {
    return [];
  }

  return values.slice(1).filter(function(row) {
    return row.join('') !== '';
  }).map(function(row) {
    return rowToObject_(config.headers, row);
  }).reverse();
}

function rowToObject_(headers, row) {
  const item = {};

  headers.forEach(function(header, index) {
    const value = row[index];
    item[header] = value instanceof Date ? Utilities.formatDate(value, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm') : value;
  });

  return item;
}

function buildRow_(type, payload, id, createdAt, updatedAt) {
  if (type === 'penerima') {
    return [
      id,
      payload.Nama || '',
      payload['NIK/NISN'] || '',
      payload.Kategori || '',
      payload['Jenis Kelamin'] || '',
      payload.Usia || '',
      payload['Alamat/Dusun'] || '',
      payload['Satuan Pendidikan/Instansi'] || '',
      payload['Status MBG'] || '',
      payload.Catatan || '',
      createdAt,
      updatedAt
    ];
  }

  return [
    id,
    payload.Nama || '',
    payload.NIK || '',
    payload['Nomor HP'] || '',
    payload['Jenis Kelamin'] || '',
    payload.Peran || '',
    payload['Wilayah Tugas'] || '',
    payload.Status || '',
    payload.Catatan || '',
    createdAt,
    updatedAt
  ];
}

function sanitizePayload_(payload) {
  const clean = {};

  Object.keys(payload).forEach(function(key) {
    clean[key] = typeof payload[key] === 'string' ? payload[key].trim() : payload[key];
  });

  return clean;
}

function findRowIndexById_(values, id) {
  for (let index = 1; index < values.length; index++) {
    if (String(values[index][0]) === String(id)) {
      return index;
    }
  }

  return -1;
}

function createId_(prefix) {
  return prefix + '-' + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyyMMddHHmmss') + '-' + Math.floor(Math.random() * 900 + 100);
}

function getDashboardSummary_() {
  const penerima = getSheetRows_('penerima');
  const relawan = getSheetRows_('relawan');

  return {
    totalPenerima: penerima.length,
    totalRelawan: relawan.length,
    penerimaAktif: countByField_(penerima, 'Status MBG', 'Aktif'),
    relawanAktif: countByField_(relawan, 'Status', 'Aktif'),
    penerimaByKategori: groupCount_(penerima, 'Kategori'),
    penerimaByGender: groupCount_(penerima, 'Jenis Kelamin'),
    relawanByPeran: groupCount_(relawan, 'Peran'),
    relawanByStatus: groupCount_(relawan, 'Status')
  };
}

function countByField_(rows, field, expected) {
  return rows.filter(function(row) {
    return String(row[field]).toLowerCase() === String(expected).toLowerCase();
  }).length;
}

function groupCount_(rows, field) {
  return rows.reduce(function(accumulator, row) {
    const key = row[field] || 'Belum diisi';
    accumulator[key] = (accumulator[key] || 0) + 1;
    return accumulator;
  }, {});
}

function getFormOptions_() {
  return {
    kategoriPenerima: ['Siswa', 'Santri', 'Balita', 'Ibu Hamil', 'Ibu Menyusui', 'Lansia', 'Disabilitas', 'Lainnya'],
    statusMbg: ['Aktif', 'Menunggu Verifikasi', 'Tidak Aktif'],
    gender: ['Laki-laki', 'Perempuan'],
    peranRelawan: ['Koordinator', 'Dapur', 'Distribusi', 'Pendataan', 'Kesehatan', 'Logistik'],
    statusRelawan: ['Aktif', 'Siaga', 'Tidak Aktif']
  };
}

function validateType_(type) {
  if (!SHEET_CONFIG[type]) {
    throw new Error('Tipe data tidak valid: ' + type);
  }
}
