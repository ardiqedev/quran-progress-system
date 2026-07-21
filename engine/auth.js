/**
 * ==========================================
 * QEDEV Engine
 * Authentication
 * ==========================================
 */

const Auth = (() => {
  const STORAGE_KEY = CONFIG.AUTH_STORAGE_KEY;

  /**
   * Login User
   */

  function login(user, remember = false) {
    if (!user || typeof user !== "object") {
      return false;
    }

    void remember;

    Storage.set(STORAGE_KEY, user);

    State.set("user", user);

    return true;
  }

  /**
   * Logout User
   */
  function logout() {
    Storage.remove(STORAGE_KEY);

    State.remove("user");

    return true;
  }

  /**
   * Get Current User
   */
  function getUser() {
    let currentUser = State.get("user");

    if (currentUser) {
      return currentUser;
    }

    currentUser = Storage.get(STORAGE_KEY);

    if (currentUser) {
      State.set("user", currentUser);
    }

    return currentUser;
  }

  /**
   * Check Authentication
   */
  function isAuthenticated() {
    return getUser() !== null;
  }

  /**
   * Check Guest
   */
  function isGuest() {
    return !isAuthenticated();
  }

  return {
    login,

    logout,

    getUser,

    isAuthenticated,

    isGuest,
  };
})();

window.Auth = Auth;
