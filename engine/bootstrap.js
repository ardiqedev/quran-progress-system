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
    Layout.init();

    Router.init();
    Launcher.bindEvents();

    App.init();
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
