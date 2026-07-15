/**
 * ============================================================
 * QEDEV Framework
 * Quran Progress System (QPS)
 * Module : BTQ
 * Service Layer
 * ============================================================
 */

const BTQService = {
  /**
   * Ambil Jadwal Hari Ini
   */
  async getScheduleToday() {
    try {
      const data = DummyBTQ.getScheduleToday();

      return {
        success: true,
        message: "Berhasil mengambil jadwal.",
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: [],
      };
    }
  },

  /**
   * Ambil Daftar Santri
   */
  async getStudentsByClass(classId) {
    try {
      const data = DummyBTQ.getStudentsByClass(classId);

      return {
        success: true,
        message: "Berhasil mengambil santri.",
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: [],
      };
    }
  },

  /**
   * Simpan Penilaian
   * (sementara dummy)
   */
  async saveAssessment(payload) {
    try {
      console.log("Assessment Payload", payload);

      return {
        success: true,
        message: "Penilaian berhasil disimpan.",
        data: payload,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  },

  /**
   * Ambil Master Predikat
   */
  async getMasterPredikat() {
    try {
      const data = DummyPredikat.getPredikat();

      return {
        success: true,
        message: "Berhasil mengambil master predikat.",
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: [],
      };
    }
  },

  /**
   * Ambil Master Rating
   */
  async getMasterRating() {
    try {
      const data = DummyRating.getRating();

      return {
        success: true,
        message: "Berhasil mengambil master rating.",
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: [],
      };
    }
  },

  /**
   * Ambil Master Target
   */
  async getMasterTarget() {
    try {
      const data = DummyTarget.getTarget();

      return {
        success: true,
        message: "Berhasil mengambil master target.",
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: [],
      };
    }
  },
};
window.BTQService = BTQService;
