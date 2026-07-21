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
   * Workspace
   */
  getWorkspace() {
    return State.get("workspace") || {};
  },

  /**
   * Ambil Jadwal Hari Ini
   */
  async getScheduleToday() {
    const workspace = this.getWorkspace();

    return {
      success: true,

      message: "Berhasil mengambil jadwal.",

      data: workspace.schedules || [],
    };
  },

  async getAssessment(transactionId) {
    try {
      return await API.post(
        "btq.assessment",

        {
          transactionId,
        },
      );
    } catch (error) {
      return {
        success: false,

        message: error.message,

        data: null,
      };
    }
  },

  /**
   * Simpan Penilaian
   * (sementara dummy)
   */
  /**
   * ============================================================
   * Simpan Penilaian
   * ============================================================
   */

  async saveAssessment(payload) {
    try {
      return await API.post("btq.save", payload);
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
