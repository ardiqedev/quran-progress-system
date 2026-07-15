/**
 * ==========================================
 * QEDEV Engine
 * Router
 * ==========================================
 */

const Router = (() => {
  /**
   * Current Route
   */
  let currentRoute = CONFIG.DEFAULT_ROUTE;

  /**
   * Get Module
   */

  function getModule(route) {
    const modules = {
      home: window.Home,
      btq: window.BTQ,
      tahfidz: window.Tahfidz,
    };

    return modules[route] || null;
  }

  /**
   * Navigate
   */
  function navigate(route = CONFIG.DEFAULT_ROUTE) {
    const module = getModule(route);

    if (!module || typeof module.init !== "function") {
      Layout.setContent(`
        <div class="qedev-empty">
          Module "${route}" tidak ditemukan.
        </div>
      `);

      return;
    }

    currentRoute = route;

    module.init();
  }

  /**
   * Initialize Router
   */
  function init() {
    navigate(CONFIG.DEFAULT_ROUTE);
  }

  /**
   * Get Current Route
   */
  function current() {
    return currentRoute;
  }

  return {
    init,

    navigate,

    current,
  };
})();

window.Router = Router;
