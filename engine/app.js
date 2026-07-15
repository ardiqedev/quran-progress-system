/**
 * ==========================================
 * QEDEV Engine
 * Application
 * ==========================================
 */

const App = (() => {
  /**
   * Application Ready State
   */
  let ready = false;

  /**
   * Initialize Application
   */
  function init() {
    ready = true;

    if (CONFIG.DEBUG) {
      console.info(`${CONFIG.APP_NAME} v${CONFIG.VERSION} Ready`);
    }
  }

  /**
   * Check Application Ready
   */
  function isReady() {
    return ready;
  }

  /**
   * Application Name
   */
  function name() {
    return CONFIG.APP_NAME;
  }

  /**
   * Application Code
   */
  function code() {
    return CONFIG.APP_CODE;
  }

  /**
   * Application Version
   */
  function version() {
    return CONFIG.VERSION;
  }

  return {
    init,

    isReady,

    name,

    code,

    version,
  };
})();

window.App = App;
