/**
 * ==========================================
 * QEDEV Framework
 * Module : Login
 * ==========================================
 */

const Login = (() => {
  /**
   * ==========================================
   * INITIALIZE
   * ==========================================
   */

  async function init() {
    render();

    bindEvents();
  }

  /**
   * ==========================================
   * RENDER
   * ==========================================
   */

  function render() {
    Layout.setContent(LoginView.render());

    LoginView.renderForm();

    LoginView.renderButton();
  }

  /**
   * ==========================================
   * EVENTS
   * ==========================================
   */

  function bindEvents() {
    document
      .getElementById("loginForm")
      ?.addEventListener("submit", handleLogin);

    document
      .getElementById("btnInstall")
      ?.addEventListener("click", handleInstall);
  }

  /**
   * ==========================================
   * LOGIN
   * ==========================================
   */

  async function handleLogin(event) {
    event.preventDefault();

    const data = {
      username: document.getElementById("username").value.trim(),

      password: document.getElementById("password").value,
    };

    const validation = LoginValidator.validate(data);

    if (!validation.success) {
      Toast.warning(validation.message);

      return;
    }

    Loading.show("Sedang masuk...");

    try {
      const response = await LoginService.login(data);

      Loading.hide();

      console.log("1. Response", response);

      if (!response.success) {
        console.log("2. Login gagal");

        Toast.error(response.message);

        return;
      }

      console.log("3. Sebelum Auth");

      const remember = document.getElementById("rememberMe")?.checked ?? false;

      Auth.login(response.data, remember);

      console.log("4. Setelah Auth");

      Toast.success("Login berhasil.");

      console.log("5. Setelah Toast");

      Router.navigate("home");

      console.log("6. Setelah Router");
    } catch (error) {
      console.error(error);

      Loading.hide();

      Toast.error(error.message);
    }
  }

  /**
   * ==========================================
   * INSTALL
   * ==========================================
   */

  function handleInstall() {
    Toast.info("Fitur Install Aplikasi akan tersedia pada versi PWA.");
  }

  /**
   * ==========================================
   * PUBLIC API
   * ==========================================
   */

  return {
    init,
  };
})();

window.Login = Login;
