/**
 * ==========================================
 * QEDEV Framework
 * Bottom Navigation
 * ==========================================
 */

const Navbar = (() => {
  /**
   * Render Navbar
   */
  function render() {
    return `
      <nav class="qedev-navbar-container">

        <button
          class="qedev-navbar-item active"
          data-route="dashboard"
          type="button">

          <i class="fa-solid fa-house"></i>

          <span>Home</span>

        </button>

        <button
          class="qedev-navbar-item"
          data-route="logout"
          type="button">

          <i class="fa-solid fa-right-from-bracket"></i>

          <span>Logout</span>

        </button>

      </nav>
    `;
  }

  return {
    render,
  };
})();

window.Navbar = Navbar;
