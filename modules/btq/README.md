# BTQ Module

## Overview

BTQ Module merupakan module utama pada **Quran Progress System (QPS)** yang digunakan guru untuk melakukan penilaian harian **Baca Tulis Al-Qur'an (BTQ)** kepada santri berdasarkan jadwal mengajar.

Module ini dirancang menggunakan prinsip **Workspace First** sehingga guru dapat menyelesaikan proses penilaian dengan cepat melalui perangkat mobile.

---

# Tujuan

- Menampilkan jadwal mengajar guru pada hari berjalan.
- Menampilkan daftar santri berdasarkan kelas yang dipilih.
- Memudahkan guru melakukan penilaian BTQ.
- Menampilkan progres penilaian setiap kelas.
- Menyimpan hasil penilaian BTQ.

---

# Workflow

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

Simpan Penilaian

↓

Lanjut Santri Berikutnya

---

# Fitur

- Jadwal mengajar hari ini
- Progress penilaian setiap kelas
- Daftar santri berdasarkan kelas
- Status penilaian santri
- Modal penilaian BTQ
- Penyimpanan hasil penilaian

---

# Data Source

Module menggunakan data dari:

- master_guru
- master_kelas
- master_siswa
- master_jadwal
- master_target_btq
- transaksi_btq

Pada tahap awal module menggunakan **Dummy Data** sebelum terhubung ke Google Apps Script REST API.

---

# Struktur Module

```
btq/

README.md
blueprint.md

btq.js
btq.css

btq.service.js
btq.helper.js
btq.validator.js

dummy.btq.js
```

---

# Responsibility

Module BTQ bertanggung jawab untuk:

- Mengambil jadwal mengajar guru.
- Mengambil daftar santri berdasarkan kelas.
- Menampilkan progres penilaian.
- Mengelola proses penilaian BTQ.
- Mengirim data penilaian ke service.

Module ini **tidak** bertanggung jawab terhadap:

- Login pengguna.
- Manajemen master data.
- Manajemen kelas.
- Rekap laporan.
- Target hafalan.
- Pengaturan aplikasi.

---

# UI Flow

```
Home
   │
   ▼
Jadwal Mengajar
   │
   ▼
Daftar Santri
   │
   ▼
Modal Penilaian
   │
   ▼
Simpan
```

---

# Status Penilaian Kelas

Setiap jadwal menampilkan progres penilaian.

Contoh:

```
0 / 18
Belum Dimulai

7 / 18
Sedang Berjalan

18 / 18
Selesai
```

---

# Development Flow

Pengembangan module mengikuti standar QEDEV Framework.

```
Dummy

↓

Service

↓

Module

↓

API
```

Perubahan sumber data tidak boleh mengubah tampilan (UI) maupun workflow module.

---

# Prinsip Pengembangan

- Mobile First
- Workspace First
- Reusable Component
- Single Responsibility Principle (SRP)
- Separation of Concern
- Clean Code
- Modular Architecture
- Scalable
