/**
 * ==========================================
 * QEDEV Framework
 * Module : Login Service
 * ==========================================
 */

const LoginService = (() => {
  /**
   * ==========================================
   * LOGIN
   * ==========================================
   */

  async function login(data) {
    try {
      return await API.post("login", data);
    } catch (error) {
      return {
        success: false,

        message: error.message || "Terjadi kesalahan.",

        data: null,
      };
    }
  }

  /**
   * ==========================================
   * LOGOUT
   * ==========================================
   */

  async function logout() {
    try {
      Auth.clear();

      return {
        success: true,

        message: "Logout berhasil.",
      };
    } catch (error) {
      return {
        success: false,

        message: error.message,
      };
    }
  }

  /**
   * ==========================================
   * PUBLIC API
   * ==========================================
   */

  return {
    login,

    logout,
  };
})();

window.LoginService = LoginService;
