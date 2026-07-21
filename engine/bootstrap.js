/**
 * ==========================================
 * QEDEV Engine
 * Bootstrap
 * ==========================================
 */

const Bootstrap = (() => {
  /**
   * Initialize Application
   */
  function init() {
    initializeApplication();

    Launcher.bindEvents();

    App.init();
  }

  Form.init();

  /**
   * Initialize Application Flow
   */
  function initializeApplication() {
    if (Auth.isAuthenticated()) {
      Router.navigate("home");
    } else {
      Router.navigate("login");
    }
  }

  return {
    init,
  };
})();

/**
 * Bootstrap Application
 */
document.addEventListener("DOMContentLoaded", Bootstrap.init);

window.Bootstrap = Bootstrap;
