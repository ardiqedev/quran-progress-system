# BTQ Module Blueprint

## Module Information

| Item      | Value           |
| --------- | --------------- |
| Module    | BTQ             |
| Version   | 1.0             |
| Status    | Development     |
| Platform  | PWA             |
| Framework | QEDEV Framework |

---

# Purpose

Module BTQ digunakan untuk melakukan penilaian harian **Baca Tulis Al-Qur'an (BTQ)** berdasarkan jadwal mengajar guru.

Guru hanya dapat melakukan penilaian pada kelas yang menjadi jadwal mengajarnya di hari tersebut.

---

# Workflow

```text
Home

↓

Penilaian BTQ

↓

Jadwal Mengajar Hari Ini

↓

Pilih Kelas

↓

Daftar Santri

↓

Pilih Santri

↓

Modal Penilaian

↓

Simpan

↓

Lanjut Santri Berikutnya
```

---

# Screen Structure

## Screen 1

### Jadwal Mengajar

Menampilkan:

- Jadwal hari ini
- Nama kelas
- Jam mengajar
- Total santri
- Progress penilaian
- Status kelas

Action:

- Pilih kelas

---

## Screen 2

### Daftar Santri

Menampilkan:

- Nama santri
- Status penilaian
- Target BTQ (opsional)
- Tombol penilaian

Action:

- Pilih santri

---

## Screen 3

### Modal Penilaian

Menampilkan form penilaian BTQ.

Action:

- Simpan
- Tutup

---

# Module State

Module memiliki state berikut.

```javascript
scheduleList;

studentList;

selectedSchedule;

selectedClass;

selectedStudent;

isLoading;

searchKeyword;
```

---

# Service Contract

Module menggunakan service berikut.

```javascript
getScheduleToday();

getStudentsByClass(classId);

saveAssessment(data);
```

Semua service menggunakan Dummy pada tahap awal.

---

# Dummy Contract

Dummy menyediakan data sementara.

```javascript
DummyBTQ.getScheduleToday();

DummyBTQ.getStudentsByClass(classId);
```

---

# Event Flow

## Home

↓

Klik Penilaian BTQ

↓

Load Jadwal

↓

Render Jadwal

↓

Klik Kelas

↓

Load Santri

↓

Render Santri

↓

Klik Santri

↓

Open Modal

↓

Simpan

↓

Refresh Status

---

# UI Component

Module menggunakan reusable component.

- Layout
- Header
- Card
- Button
- Badge
- Search
- Modal
- Toast
- Loading

Tidak membuat component baru.

---

# Progress Logic

Progress dihitung menggunakan transaksi BTQ.

```
Progress =

Jumlah Santri Dinilai

/

Jumlah Santri
```

Contoh:

```
0 / 18

7 / 18

18 / 18
```

---

# Status Logic

| Progress    | Status          |
| ----------- | --------------- |
| 0           | Belum Dimulai   |
| 1 - Total-1 | Sedang Berjalan |
| Total       | Selesai         |

Status digunakan sebagai Badge pada daftar jadwal.

---

# Navigation

Module hanya memiliki satu route.

```
/btq
```

Perpindahan antar halaman dilakukan secara internal menggunakan state module.

Tidak menggunakan route tambahan.

---

# Validation

Sebelum menyimpan penilaian:

- Santri harus dipilih
- Nilai wajib diisi
- Target wajib tersedia
- Data valid

Jika valid maka service dipanggil.

---

# Module Responsibility

BTQ bertanggung jawab terhadap:

- Mengambil jadwal mengajar
- Mengambil daftar santri
- Menampilkan progress
- Menampilkan status
- Menampilkan form penilaian
- Menyimpan penilaian

BTQ tidak bertanggung jawab terhadap:

- Login
- Master Guru
- Master Kelas
- Master Santri
- Target Hafalan
- Rekap
- Pengaturan

---

# Development Flow

```text
Dummy

↓

Service

↓

Module

↓

Google Apps Script API
```

Perubahan sumber data tidak boleh mengubah UI maupun workflow module.

---

# Future Enhancement

Versi berikutnya dapat menambahkan:

- Filter jadwal
- Pencarian santri
- Penilaian offline
- Sinkronisasi otomatis
- Riwayat penilaian
- Bulk assessment
- Resume kelas
