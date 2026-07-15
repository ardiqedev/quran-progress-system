/**
 * ============================================================
 * QEDEV Framework
 * Quran Progress System (QPS)
 * Module : BTQ
 * Dummy Rating
 * ============================================================
 */

const DummyRating = {
  /**
   * Master Rating
   */
  getRating() {
    return [
      {
        id: "R001",
        star: 1,
        score: 60,
      },
      {
        id: "R002",
        star: 2,
        score: 70,
      },
      {
        id: "R003",
        star: 3,
        score: 80,
      },
      {
        id: "R004",
        star: 4,
        score: 90,
      },
      {
        id: "R005",
        star: 5,
        score: 100,
      },
    ];
  },
};

window.DummyRating = DummyRating;
