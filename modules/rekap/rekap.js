/**
 * ==========================================
 * Rekap Controller
 * ==========================================
 */

const Rekap = (() => {
  /**
   * State
   */
  const state = {
    type: "btq",

    classId: "",

    date: "",

    assessments: [],

    summary: null,
  };

  /**
   * Init
   */
  function init() {
    render();

    bindEvents();
  }

  /**
   * Render
   */
  function render() {
    Layout.setContent(RekapView.render());

    RekapView.renderHeader();

    RekapView.renderTabs();

    RekapView.renderFilter();

    RekapView.renderSummary();

    RekapView.renderEmpty();
  }

  /**
   * Bind Events
   */
  function bindEvents() {
    document.addEventListener("click", handleClick);
  }

  /**
   * Handle Click
   */
  function handleClick(event) {
    // ==========================
    // Tabs
    // ==========================

    const tab = event.target.closest(".tab-button");

    if (tab) {
      state.type = tab.dataset.type;

      document
        .querySelectorAll(".tab-button")
        .forEach((button) => button.classList.remove("active"));

      tab.classList.add("active");

      return;
    }

    // ==========================
    // Search
    // ==========================

    const button = event.target.closest("#rekap-search");

    if (button) {
      submitFilter();

      return;
    }
  }

  /**
   * Submit Filter
   */
  async function submitFilter() {
    const classId = document.querySelector("#rekap-class")?.value;

    const date = document.querySelector("#rekap-date")?.value;

    if (!classId) {
      Toast.warning("Silakan pilih kelas.");

      return;
    }

    if (!date) {
      Toast.warning("Silakan pilih tanggal.");

      return;
    }

    state.classId = classId;

    state.date = date;

    console.log(state);

    const user = Auth.getUser();

    const payload = {
      teacherId: user.id,

      classId: state.classId,

      date: state.date,
    };

    RekapView.renderLoading();

    let result;

    if (state.type === "btq") {
      result = await RekapService.getBTQ(payload);
    } else {
      result = await RekapService.getTahfidz(payload);
    }

    state.summary = result.summary;

    state.assessments = result.assessments;

    RekapView.renderSummary(state.summary);

    RekapView.renderContent(state.assessments);

    console.log(result);

    // atau
    // RekapService.getTahfidz()
  }

  return {
    init,
  };
})();

window.Rekap = Rekap;
