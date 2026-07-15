/**
 * ==========================================
 * QEDEV Framework
 * Bottom Sheet Component
 * ==========================================
 */

const BottomSheet = (() => {
  /**
   * Overlay Element
   */
  let overlay = null;

  /**
   * Create
   */
  function create() {
    if (overlay) return;

    overlay = document.createElement("div");

    overlay.className = "qedev-bottom-sheet-overlay";

    overlay.innerHTML = `
      <div class="qedev-bottom-sheet">

        <div class="qedev-bottom-sheet-handle"></div>

        <div class="qedev-bottom-sheet-header">

          <div class="qedev-bottom-sheet-title"></div>

          <button
            type="button"
            class="qedev-bottom-sheet-close">

            <i class="fa-solid fa-xmark"></i>

          </button>

        </div>

        <div class="qedev-bottom-sheet-body"></div>

        <div class="qedev-bottom-sheet-footer"></div>

      </div>
    `;

    document.body.appendChild(overlay);

    bindEvents();
  }

  /**
   * Bind Events
   */
  function bindEvents() {
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        close();
      }
    });

    overlay
      .querySelector(".qedev-bottom-sheet-close")
      .addEventListener("click", close);

    document.addEventListener("keydown", handleEscape);
  }

  /**
   * ESC Close
   */
  function handleEscape(event) {
    if (event.key === "Escape" && isOpen()) {
      close();
    }
  }

  /**
   * Open
   */
  function open({ title = "", content = "", footer = "" } = {}) {
    if (isOpen()) return;

    if (!overlay) {
      create();
    }

    const titleElement = overlay.querySelector(".qedev-bottom-sheet-title");

    const bodyElement = overlay.querySelector(".qedev-bottom-sheet-body");

    const footerElement = overlay.querySelector(".qedev-bottom-sheet-footer");

    titleElement.innerHTML = title;

    bodyElement.innerHTML = content;

    footerElement.innerHTML = footer;

    footerElement.style.display = footer ? "flex" : "none";

    document.body.style.overflow = "hidden";

    requestAnimationFrame(() => {
      overlay.classList.add("show");
    });
  }

  /**
   * Close
   */
  function close() {
    if (!overlay) return;

    overlay.classList.remove("show");

    document.body.style.overflow = "";
  }

  /**
   * Destroy
   * (Opsional jika suatu saat diperlukan)
   */
  function destroy() {
    if (!overlay) return;

    overlay.remove();

    overlay = null;

    document.body.style.overflow = "";
  }

  /**
   * Is Open
   */
  function isOpen() {
    return overlay && overlay.classList.contains("show");
  }

  return {
    open,

    close,

    destroy,

    isOpen,
  };
})();

window.BottomSheet = BottomSheet;
