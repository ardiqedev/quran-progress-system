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
      /**
       * Render Skeleton
       */
      Layout.setContent(Skeleton.render("home"));

      /**
       * Get Workspace
       */
      const workspace = await HomeService.getHome();

      /**
       * Save Workspace
       */
      State.set("workspace", workspace);

      /**
       * Render Home
       */
      Layout.setContent(HomeView.render(workspace));
    } catch (error) {
      console.error(error);

      Toast.error(error.message || "Terjadi kesalahan.");
    }
  }

  return {
    init,
  };
})();

window.Home = Home;
