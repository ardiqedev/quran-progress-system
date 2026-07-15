/**
 * ==========================================
 * QEDEV Framework
 * Application Layout
 * ==========================================
 */

const Layout = (() => {
  let container;

  /**
   * Render Layout
   */
  function render() {
    return `
    <div class="qedev-layout">

      ${Header.render()}

      <main
        id="qedev-main"
        class="qedev-main">
      </main>

      ${Navbar.render()}

      ${Loading.render()}

    </div>
  `;
  }
  /**
   * Initialize Layout
   */
  function init() {
    container = document.getElementById("app");

    if (!container) {
      console.error("#app container tidak ditemukan.");
      return;
    }

    container.innerHTML = render();
  }

  /**
   * Set Main Content
   */
  function setContent(html) {
    const main = document.getElementById("qedev-main");

    if (!main) {
      console.error("#qedev-main tidak ditemukan.");
      return;
    }

    main.innerHTML = html;
  }

  return {
    init,
    render,
    setContent,
  };
})();

window.Layout = Layout;
