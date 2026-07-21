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
            class="qedev-navbar-item"
            data-route="home"
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

  /**
   * ==========================================
   * Handle Logout
   * ==========================================
   */
  function handleLogout() {
    Auth.logout();

    Toast.success("Berhasil keluar.");

    Router.navigate("login");
  }

  /**
   * Bind Events
   */
  function bindEvents() {
    document.querySelectorAll(".qedev-navbar-item").forEach((item) => {
      item.addEventListener("click", () => {
        const route = item.dataset.route;

        if (route === "logout") {
          handleLogout();

          return;
        }

        Router.navigate(route);
      });
    });
  }

  /**
   * ==========================================
   * Update Active Menu
   * ==========================================
   */
  function updateActive() {
    const currentRoute = Router.current();

    document.querySelectorAll(".qedev-navbar-item").forEach((item) => {
      item.classList.remove("active");

      if (item.dataset.route === currentRoute) {
        item.classList.add("active");
      }
    });
  }

  return {
    render,
    bindEvents,
    updateActive,
  };
})();

window.Navbar = Navbar;
