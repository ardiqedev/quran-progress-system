/**
 * ==========================================
 * QEDEV Framework
 * Toast Component
 * ==========================================
 */

const Toast = (() => {
  let toast;
  let title;
  let message;

  let timer;
  let initialized = false;

  function init() {
    if (initialized) return;

    toast = document.getElementById("qedev-toast");

    if (!toast) return;

    title = toast.querySelector(".qedev-toast-title");
    message = toast.querySelector(".qedev-toast-message");

    initialized = true;
  }

  function show(type, text) {
    if (!toast) return;

    clearTimeout(timer);

    toast.className = "qedev-toast";

    toast.classList.add(`qedev-toast-${type}`);

    title.textContent = type.charAt(0).toUpperCase() + type.slice(1);

    message.textContent = text;

    toast.classList.remove("hidden");

    timer = setTimeout(hide, 3000);
  }

  function success(text) {
    show("success", text);
  }

  function error(text) {
    show("error", text);
  }

  function warning(text) {
    show("warning", text);
  }

  function info(text) {
    show("info", text);
  }

  function hide() {
    if (!toast) return;

    toast.classList.add("hidden");
  }

  function destroy() {
    hide();

    title.textContent = "";

    message.textContent = "";
  }

  return {
    init,

    success,

    error,

    warning,

    info,

    hide,

    destroy,
  };
})();

window.Toast = Toast;
