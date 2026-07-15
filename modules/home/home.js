/**
 * ==========================================
 * QPS Module
 * Home Controller
 * ==========================================
 */

const Home = (() => {
  /**
   * ==========================================
   * Initialize Module
   * ==========================================
   */
  async function init() {
    try {
      Loading.show();

      const response = await HomeService.getHome();

      if (!response.success) {
        Toast.error(response.message || "Gagal memuat data Home.");

        return;
      }

      Layout.setContent(HomeView.render(response.data));
    } catch (error) {
      console.error(error);

      Toast.error(error.message || "Terjadi kesalahan.");
    } finally {
      Loading.hide();
    }
  }

  return {
    init,
  };
})();

window.Home = Home;
