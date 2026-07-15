/**
 * ==========================================
 * QEDEV Framework
 * Modal Component
 * ==========================================
 */

const Modal = (() => {
  let overlay;
  let container;
  let title;
  let body;
  let footer;
  let closeButton;

  let opened = false;

  /**
   * Initialize
   */
  function init() {
    cache();

    bindEvents();
  }

  /**
   * Cache Elements
   */
  function cache() {
    overlay = document.getElementById("qedev-modal");

    container = overlay.querySelector(".qedev-modal");

    title = overlay.querySelector(".qedev-modal-title");

    body = overlay.querySelector(".qedev-modal-body");

    footer = overlay.querySelector(".qedev-modal-footer");

    closeButton = overlay.querySelector(".qedev-modal-close");
  }

  /**
   * Bind Events
   */
  function bindEvents() {
    closeButton.addEventListener("click", close);

    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        close();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (!opened) return;

      if (event.key === "Escape") {
        close();
      }
    });
  }

  /**
   * Open Modal
   */
  function open(options = {}) {
    render(options);

    overlay.classList.remove("hidden");

    lockScroll();

    opened = true;
  }

  /**
   * Close Modal
   */
  function close() {
    overlay.classList.add("hidden");

    unlockScroll();

    destroy();

    opened = false;
  }

  /**
   * Render Modal
   */
  function render(options = {}) {
    const defaults = {
      title: "",
      content: "",
      footer: "",
      size: "md",
    };

    options = {
      ...defaults,
      ...options,
    };

    title.innerHTML = options.title;
    body.innerHTML = options.content;
    footer.innerHTML = options.footer;

    container.classList.remove(
      "qedev-modal-sm",
      "qedev-modal-md",
      "qedev-modal-lg",
      "qedev-modal-xl",
      "qedev-modal-full",
    );

    container.classList.add(`qedev-modal-${options.size}`);
  }

  /**
   * Destroy Modal
   */
  function destroy() {
    title.innerHTML = "";

    body.innerHTML = "";

    footer.innerHTML = "";

    container.className = "qedev-modal qedev-modal-md";
  }

  /**
   * Lock Body Scroll
   */
  function lockScroll() {
    document.body.style.overflow = "hidden";
  }

  /**
   * Unlock Body Scroll
   */
  function unlockScroll() {
    document.body.style.overflow = "";
  }

  /**
   * Is Open
   */
  function isOpen() {
    return opened;
  }

  return {
    init,

    open,

    close,

    destroy,

    isOpen,
  };
})();

window.Modal = Modal;
