/**
 * ==========================================
 * Rekap Service
 * ==========================================
 */

const RekapService = (() => {
  /**
   * ==========================================
   * Get Rekap BTQ
   * ==========================================
   */
  async function getBTQ(payload) {
    const response = await API.post("rekap.btq", payload);

    if (!response.success) {
      throw new Error(response.message);
    }

    return response.data;
  }

  /**
   * ==========================================
   * Get Rekap Tahfidz
   * ==========================================
   */
  async function getTahfidz(payload) {
    const response = await API.post("rekap.tahfidz", payload);

    if (!response.success) {
      throw new Error(response.message);
    }

    return response.data;
  }

  return {
    getBTQ,

    getTahfidz,
  };
})();

window.RekapService = RekapService;
