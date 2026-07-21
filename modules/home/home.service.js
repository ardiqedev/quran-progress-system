/**
 * ==========================================
 * QPS Module
 * Home Service
 * ==========================================
 */

const HomeService = (() => {
  async function getHome() {
    const user = Auth.getUser();

    if (!user) {
      throw new Error("User belum login.");
    }

    const response = await API.post("home", {
      guruId: user.id,
    });

    if (!response.success) {
      throw new Error(response.message);
    }

    return response.data;
  }

  return {
    getHome,
  };
})();

window.HomeService = HomeService;
