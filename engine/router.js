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
   * Route Configuration
   */
  const routes = {
    login: {
      module: "Login",
      layout: {
        header: false,
        navbar: false,
      },
    },

    home: {
      module: "Home",
      layout: {
        header: true,
        navbar: true,
      },
    },

    btq: {
      module: "BTQ",
      layout: {
        header: true,
        navbar: true,
      },
    },

    tahfidz: {
      module: "Tahfidz",
      layout: {
        header: true,
        navbar: true,
      },
    },

    rekap: {
      module: "Rekap",
      layout: {
        header: true,
        navbar: true,
      },
    },
  };

  /**
   * Navigate
   */
  function navigate(route = CONFIG.DEFAULT_ROUTE) {
    const config = routes[route];

    if (!config) {
      Layout.init({
        header: false,
        navbar: false,
      });

      Layout.setContent(`
      <div class="qedev-empty">
        Module "${route}" tidak ditemukan.
      </div>
    `);

      return;
    }

    // Ambil module dari window
    const module = window[config.module];

    if (!module || typeof module.init !== "function") {
      Layout.init({
        header: false,
        navbar: false,
      });

      Layout.setContent(`
      <div class="qedev-empty">
        Module "${route}" tidak ditemukan.
      </div>
    `);

      return;
    }

    currentRoute = route;

    Layout.init(config.layout);

    Loading.init();
    Toast.init();

    module.init();
  }
  /**
   * Initialize Router
   */
  function init() {
    navigate(CONFIG.DEFAULT_ROUTE);
  }

  /**
   * Current Route
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
