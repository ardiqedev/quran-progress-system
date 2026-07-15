/**
 * ==========================================
 * QPS Module
 * Home Service
 * ==========================================
 */

const HomeService = (() => {
  /**
   * Get Home Data
   */
  async function getHome() {
    console.log("[HomeService] getHome()");

    const response = await API.post("home", {
      guruId: "G001",
    });

    console.log(response);

    return response;
  }

  return {
    getHome,
  };
})();

window.HomeService = HomeService;
