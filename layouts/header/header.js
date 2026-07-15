/**
 * ==========================================
 * QEDEV Framework
 * Header Layout
 * ==========================================
 */

const Header = (() => {
  /**
   * Render Header
   */
  function render(data = {}) {
    return `
      <header class="qedev-header-container">

        <div class="qedev-header-left">

          <img
            class="qedev-header-logo"
            src="${data.logo || "assets/images/logo.png"}"
            alt="Logo">

          <div class="qedev-header-info">

            <div class="qedev-header-title">
              ${data.title || "Quran Progress System"}
            </div>

            <div class="qedev-header-school">
              ${data.school || "Nama Sekolah"}
            </div>

          </div>

        </div>

        <button
          class="qedev-header-notification"
          type="button"
          aria-label="Notification">

          <i class="fa-solid fa-bell"></i>

        </button>

      </header>
    `;
  }

  return {
    render,
  };
})();

window.Header = Header;
