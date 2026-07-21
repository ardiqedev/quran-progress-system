/**
 * ============================================================
 * QEDEV Framework
 * Quran Progress System (QPS)
 * Module : Tahfidz
 * Helper
 * ============================================================
 */

const TahfidzHelper = (() => {
  /**
   * ============================================================
   * CREATE ASSESSMENT
   * ============================================================
   */

  function createAssessment() {
    const score = Rating.getScore(5);

    return {
      fashohah: {
        star: 5,
        score,
      },

      tajwid: {
        star: 5,
        score,
      },

      wazan: {
        star: 5,
        score,
      },

      average: score,

      grade: "",

      description: "",
    };
  }

  /**
   * ============================================================
   * UPDATE ITEM
   * ============================================================
   */

  function updateItem(assessment, field, star) {
    assessment[field].star = star;

    assessment[field].score = Rating.getScore(star);

    return assessment;
  }

  /**
   * ============================================================
   * CALCULATE AVERAGE
   * ============================================================
   */

  function calculateAverage(assessment) {
    const total =
      assessment.fashohah.score +
      assessment.tajwid.score +
      assessment.wazan.score;

    return Math.round(total / 3);
  }

  /**
   * ============================================================
   * GET RESULT
   * ============================================================
   */

  function getResult(score, masterPredikat = []) {
    return (
      masterPredikat.find((item) => {
        return score >= item.min && score <= item.max;
      }) || null
    );
  }

  /**
   * ============================================================
   * UPDATE RESULT
   * ============================================================
   */

  function updateResult(assessment, masterPredikat = []) {
    assessment.average = calculateAverage(assessment);

    const result = getResult(assessment.average, masterPredikat);

    if (result) {
      assessment.grade = result.grade;

      assessment.description = result.description;
    }

    return assessment;
  }

  /**
   * ============================================================
   * BUILD PAYLOAD
   * ============================================================
   */

  function buildPayload(student, assessment, note = "") {
    return {
      studentId: student.id,

      targetId: student.tahfidzTargetId,

      fashohah: assessment.fashohah.score,

      tajwid: assessment.tajwid.score,

      wazan: assessment.wazan.score,

      average: assessment.average,

      grade: assessment.grade,

      description: assessment.description,

      note,
    };
  }

  return {
    createAssessment,

    updateItem,

    calculateAverage,

    getResult,

    updateResult,

    buildPayload,
  };
})();

window.TahfidzHelper = TahfidzHelper;
