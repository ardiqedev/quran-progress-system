/**
 * ============================================================
 * QEDEV Framework
 * Quran Progress System (QPS)
 * Module : BTQ
 * Dummy Data
 * ============================================================
 */

const DummyTahfidz = {
  /**
   * Jadwal Mengajar Hari Ini
   */
  getScheduleToday() {
    return [
      {
        id: "J001",
        classId: "CLS001",
        className: "Kelas A",
        teacherId: "G001",
        teacherName: "Ust. Ahmad",
        startTime: "07:30",
        endTime: "08:30",
        totalStudents: 18,
        assessedStudents: 0,
      },
      {
        id: "J002",
        classId: "CLS002",
        className: "Kelas B",
        teacherId: "G001",
        teacherName: "Ust. Ahmad",
        startTime: "09:30",
        endTime: "10:30",
        totalStudents: 20,
        assessedStudents: 7,
      },
      {
        id: "J003",
        classId: "CLS003",
        className: "Kelas C",
        teacherId: "G001",
        teacherName: "Ust. Ahmad",
        startTime: "13:00",
        endTime: "14:00",
        totalStudents: 15,
        assessedStudents: 15,
      },
    ];
  },

  /**
   * Daftar Santri Berdasarkan Kelas
   */
  getStudentsByClass(classId) {
    const students = {
      CLS001: [
        {
          id: "S001",
          nis: "240001",
          name: "Ahmad Fauzan",
          target: "Jilid 2 Hal. 15",
          assessed: true,
        },
        {
          id: "S002",
          nis: "240002",
          name: "Muhammad Rizki",
          target: "Jilid 2 Hal. 16",
          assessed: false,
        },
        {
          id: "S003",
          nis: "240003",
          name: "Aisyah Putri",
          target: "Jilid 2 Hal. 17",
          assessed: false,
        },
      ],

      CLS002: [
        {
          id: "S004",
          nis: "240004",
          name: "Fatimah Zahra",
          target: "Jilid 3 Hal. 10",
          assessed: true,
        },
        {
          id: "S005",
          nis: "240005",
          name: "Abdullah",
          target: "Jilid 3 Hal. 12",
          assessed: true,
        },
        {
          id: "S006",
          nis: "240006",
          name: "Nabila",
          target: "Jilid 3 Hal. 14",
          assessed: false,
        },
      ],

      CLS003: [
        {
          id: "S007",
          nis: "240007",
          name: "Hasan",
          target: "Al-Qur'an Surah Al-Mulk",
          assessed: true,
        },
        {
          id: "S008",
          nis: "240008",
          name: "Husain",
          target: "Al-Qur'an Surah Al-Qalam",
          assessed: true,
        },
        {
          id: "S009",
          nis: "240009",
          name: "Maryam",
          target: "Al-Qur'an Surah Al-Haqqah",
          assessed: true,
        },
      ],
    };

    return students[classId] || [];
  },
};

window.DummyTahfidz = DummyTahfidz;
