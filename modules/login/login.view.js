/**
 * ==========================================
 * QEDEV Framework
 * Module : Login View
 * ==========================================
 */

const LoginView = (() => {
  function render() {
    return `
    <div class="login">

      <div class="login__header">

        <div class="login__logo">
          <i class="fa-solid fa-book-quran"></i>
        </div>

        <h1 class="login__title">
          Quran Progress System
        </h1>

        <p class="login__subtitle">
          Simple for Teachers<br>
          
        </p>

        <p class="login__description">
          Silakan masuk menggunakan akun guru Anda.
        </p>

      </div>

      <div class="login__content">

        <div class="login__card">

          <form
            id="loginForm"
            class="login__form"
            autocomplete="off"
          >

            <div id="usernameField"></div>

            <div id="passwordField"></div>

            <div class="login__remember">

              <label class="login__checkbox">

                <input
                  type="checkbox"
                  id="rememberMe"
                >

                <span>Ingat Saya</span>

              </label>

            </div>

            <div id="loginButton"></div>

          </form>

        </div>

        <div class="login__divider">

          <span>atau</span>

        </div>

        <div id="installButton"></div>

        <div class="login__footer">

          <div class="login__version">

            Version 1.0.0

          </div>

          <div class="login__powered">

            Powered by <strong>QEDEV Framework</strong>

          </div>

        </div>

      </div>

    </div>
  `;
  }

  function renderForm() {
    document.getElementById("usernameField").innerHTML = Form.render("input", {
      name: "username",
      label: "Username / NIP",
      placeholder: "Masukkan Username",
      required: true,
    });

    document.getElementById("passwordField").innerHTML = Form.render("input", {
      type: "password",
      name: "password",
      label: "Password",
      placeholder: "Masukkan Password",
      required: true,
    });
  }

  function renderButton() {
    document.getElementById("loginButton").innerHTML = Button.render({
      text: "Masuk",
      type: "primary",
      buttonType: "submit",
      icon: `<i class="fa-solid fa-arrow-right-to-bracket"></i>`,
    });

    document.getElementById("installButton").innerHTML = Button.render({
      text: "Install Aplikasi",
      type: "outline",
      icon: `<i class="fa-solid fa-download"></i>`,
    });
  }

  return {
    render,
    renderForm,
    renderButton,
  };
})();

window.LoginView = LoginView;
