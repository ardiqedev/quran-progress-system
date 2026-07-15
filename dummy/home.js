/**
 * ==========================================
 * QEDEV Framework
 * Quran Progress System (QPS)
 * Dummy Home
 * ==========================================
 */

const DummyHome = {
  schedule: {
    totalSantri: 42,

    icon: "fa-solid fa-book-quran",

    classes: [
      {
        id: 1,

        nama: "Kelas A",

        jamMulai: "07.30",

        jamSelesai: "09.00",

        jumlahSantri: 18,
      },

      {
        id: 2,

        nama: "Kelas B",

        jamMulai: "09.30",

        jamSelesai: "11.00",

        jumlahSantri: 12,
      },
    ],
  },
};

window.DummyHome = DummyHome;
