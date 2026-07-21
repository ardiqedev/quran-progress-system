/**
 * ==========================================
 * QEDEV Framework
 * Module : Login Validator
 * ==========================================
 */

const LoginValidator = (() => {
  /**
   * ==========================================
   * VALIDATE
   * ==========================================
   */

  function validate(data) {
    if (!data.username) {
      return invalid("Username wajib diisi.");
    }

    if (!data.password) {
      return invalid("Password wajib diisi.");
    }

    return valid();
  }

  /**
   * ==========================================
   * VALID
   * ==========================================
   */

  function valid() {
    return {
      success: true,

      message: "",
    };
  }

  /**
   * ==========================================
   * INVALID
   * ==========================================
   */

  function invalid(message) {
    return {
      success: false,

      message,
    };
  }

  /**
   * ==========================================
   * PUBLIC API
   * ==========================================
   */

  return {
    validate,
  };
})();

window.LoginValidator = LoginValidator;
