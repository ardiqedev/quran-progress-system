/**
 * ==========================================
 * QEDEV Engine
 * API Engine V2 (Google Apps Script)
 * ==========================================
 */

const API = (() => {
  /**
   * ==========================================
   * Base URL
   * ==========================================
   */
  let baseUrl = CONFIG.API_URL;

  /**
   * ==========================================
   * Set Base URL
   * ==========================================
   */
  function setBaseUrl(url) {
    baseUrl = url || "";
  }

  /**
   * ==========================================
   * Get Base URL
   * ==========================================
   */
  function getBaseUrl() {
    return baseUrl;
  }

  /**
   * ==========================================
   * Build GET URL
   * ==========================================
   */
  function buildUrl(action, params = {}) {
    const url = new URL(baseUrl);

    url.searchParams.set("action", action);

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, value);
      }
    });

    return url.toString();
  }

  /**
   * ==========================================
   * Core Request
   * ==========================================
   */
  async function request(method, action, data = {}) {
    if (!baseUrl) {
      return {
        success: false,

        message: "API Base URL belum diset.",

        data: null,
      };
    }

    try {
      const options = {
        method,
      };

      let url = baseUrl;

      if (method === "GET") {
        url = buildUrl(action, data);
      } else {
        const form = new URLSearchParams();

        form.append("action", action);

        form.append("payload", JSON.stringify(data));

        options.body = form;
      }

      if (CONFIG.DEBUG) {
        console.log("[API] URL :", url);

        console.log("[API] METHOD :", method);

        console.log("[API] BODY :", options.body);
      }

      const response = await fetch(url, options);

      if (!response.ok) {
        return {
          success: false,

          message: `HTTP Error (${response.status})`,

          data: null,
        };
      }

      return await response.json();
    } catch (error) {
      if (CONFIG.DEBUG) {
        console.error("[API]", error);
      }

      return {
        success: false,

        message: error.message,

        data: null,
      };
    }
  }

  /**
   * ==========================================
   * GET
   * ==========================================
   */
  function get(action, params = {}) {
    return request("GET", action, params);
  }

  /**
   * ==========================================
   * POST
   * ==========================================
   */
  function post(action, data = {}) {
    return request("POST", action, data);
  }

  return {
    setBaseUrl,

    getBaseUrl,

    get,

    post,
  };
})();

window.API = API;
