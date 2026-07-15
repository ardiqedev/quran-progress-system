/**
 * ============================================================
 * QEDEV Framework
 * Quran Progress System (QPS)
 * Module : BTQ
 * Dummy Predikat
 * ============================================================
 */

const DummyPredikat = {
  /**
   * Master Predikat
   */
  getPredikat() {
    return [
      {
        id: "P001",
        min: 91,
        max: 100,
        grade: "A",
        description: "Mumtaz",
      },
      {
        id: "P002",
        min: 81,
        max: 90,
        grade: "B+",
        description: "Jayyid",
      },
      {
        id: "P003",
        min: 71,
        max: 80,
        grade: "B",
        description: "Jayyid Jiddan",
      },
      {
        id: "P004",
        min: 0,
        max: 70,
        grade: "C",
        description: "Naqis",
      },
    ];
  },
};

window.DummyPredikat = DummyPredikat;
