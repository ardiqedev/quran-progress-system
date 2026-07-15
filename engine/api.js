/**
 * ==========================================
 * QEDEV Engine
 * API Engine
 * ==========================================
 */

const API = (() => {
  /**
   * Base URL
   */
  let baseUrl = CONFIG.API_URL;

  /**
   * Default Headers
   */
  const DEFAULT_HEADERS = {
    "Content-Type": "application/json",
  };

  /**
   * Set Base URL
   */
  function setBaseUrl(url) {
    baseUrl = url || "";
  }

  /**
   * Get Base URL
   */
  function getBaseUrl() {
    return baseUrl;
  }

  /**
   * Build GET URL
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
   * Core Request
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
        headers: DEFAULT_HEADERS,
      };

      if (method !== "GET") {
        options.body = JSON.stringify({
          action,
          data,
        });
      }

      const url = method === "GET" ? buildUrl(action, data) : baseUrl;

      console.log("[API] URL :", url);
      console.log("[API] METHOD :", method);
      console.log("[API] BODY :", options.body);

      const response = await fetch(url, options);

      if (!response.ok) {
        return {
          success: false,
          message: `HTTP Error (${response.status})`,
          data: null,
        };
      }

      try {
        return await response.json();
      } catch {
        return {
          success: false,
          message: "Invalid JSON Response",
          data: null,
        };
      }
    } catch (error) {
      if (CONFIG.DEBUG) {
        console.error("[API]", error);
      }

      return {
        success: false,
        message: "Network Error",
        data: null,
      };
    }
  }

  /**
   * GET Request
   */
  function get(action, params = {}) {
    return request("GET", action, params);
  }

  /**
   * POST Request
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
