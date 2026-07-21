/**
 * ==========================================
 * Rekap View
 * ==========================================
 */

const RekapView = (() => {
  /**
   * Render
   */
  /**
   * Render
   */
  function render() {
    return `
    <div id="rekap-page" class="rekap-page">

      <section
        id="rekap-header"
        class="rekap-section">
      </section>

      <section
        id="rekap-tabs"
        class="rekap-section">
      </section>

      <section
        id="rekap-filter"
        class="rekap-section">
      </section>

      <section
        id="rekap-summary"
        class="rekap-section">
      </section>

      <section
        id="rekap-content"
        class="rekap-section">
      </section>

    </div>
  `;
  }

  /**
   * Render Header
   */
  /**
   * Render Header
   */
  function renderHeader() {
    const container = document.querySelector("#rekap-header");

    container.innerHTML = `

    <div class="page-header">

      <div class="page-header-icon">

        <i class="fa-solid fa-chart-column"></i>

      </div>

      <div class="page-header-content">

        <h1 class="page-title">

          Rekap Penilaian

        </h1>

        <p class="page-subtitle">

          Lihat hasil penilaian santri.

        </p>

      </div>

    </div>

  `;
  }

  /**
   * Render Tabs
   */

  /**
   * Render Tabs
   */
  function renderTabs() {
    const container = document.querySelector("#rekap-tabs");

    container.innerHTML = `

    <div class="tabs">

      <button
        type="button"
        class="tab-button active"
        data-type="btq">

        <i class="fa-solid fa-book-open"></i>

        <span>BTQ</span>

      </button>

      <button
        type="button"
        class="tab-button"
        data-type="tahfidz">

        <i class="fa-solid fa-book-quran"></i>

        <span>Tahfidz</span>

      </button>

    </div>

  `;
  }

  /**
   * Render Filter
   */
  function renderFilter() {
    const container = document.querySelector("#rekap-filter");

    const workspace = State.get("workspace");

    const schedules = workspace?.schedules || [];

    container.innerHTML = `

      <div class="filter-card">

        <div class="filter-header">

          <div class="filter-icon">

            <i class="fa-solid fa-filter"></i>

          </div>

          <div class="filter-content">

            <h3 class="filter-title">

              Filter Penilaian

            </h3>

            <p class="filter-subtitle">

              Pilih kelas dan tanggal penilaian.

            </p>

          </div>

        </div>

        <div class="form-group">

          <label class="form-label">

            Kelas

          </label>

          <select
            id="rekap-class"
            class="form-control">

            <option value="">

              Pilih Kelas

            </option>

            ${schedules
              .map(
                (schedule) => `

              <option value="${schedule.classId}">

                ${schedule.className}

              </option>

            `,
              )
              .join("")}

          </select>

        </div>

        <div class="form-group">

          <label class="form-label">

            Tanggal

          </label>

          <input
            type="date"
            id="rekap-date"
            class="form-control">

        </div>

        <button
          id="rekap-search"
          class="btn btn-primary btn-block">

          <i class="fa-solid fa-magnifying-glass"></i>

          Tampilkan Rekap

        </button>

      </div>

      `;
  }

  /**
   * Render Summary
   */
  /**
   * Render Summary
   */
  function renderSummary(summary = {}) {
    const container = document.querySelector("#rekap-summary");

    if (!container) return;

    container.innerHTML = `

    <div class="rekap-summary">

      <div class="summary-card">

        <div class="summary-icon total">

          <i class="fa-solid fa-users"></i>

        </div>

        <div class="summary-value">

          ${summary.totalStudents ?? "-"}

        </div>

        <div class="summary-label">

          Total Santri

        </div>

      </div>

      <div class="summary-card">

        <div class="summary-icon success">

          <i class="fa-solid fa-circle-check"></i>

        </div>

        <div class="summary-value">

          ${summary.assessedStudents ?? "-"}

        </div>

        <div class="summary-label">

          Sudah Dinilai

        </div>

      </div>

      <div class="summary-card">

        <div class="summary-icon warning">

          <i class="fa-solid fa-clock"></i>

        </div>

        <div class="summary-value">

          ${summary.unassessedStudents ?? "-"}

        </div>

        <div class="summary-label">

          Belum Dinilai

        </div>

      </div>

    </div>

  `;
  }

  function renderContent(assessments = []) {
    const container = document.querySelector("#rekap-content");

    if (!container) return;

    container.innerHTML = `

    <div class="table-card">

      <table class="table">

        <thead>

          <tr>

            <th>No</th>

            <th>Nama</th>

            <th>Nilai</th>

            <th>Grade</th>

            <th>Status</th>

          </tr>

        </thead>

        <tbody>

          ${assessments
            .map(
              (item, index) => `

              <tr>

                <td>${index + 1}</td>

                <td>${item.name}</td>

                <td>${item.average ?? "-"}</td>

                <td>${item.grade ?? "-"}</td>

                <td>

                  ${
                    item.assessed
                      ? `<span class="badge success">Sudah</span>`
                      : `<span class="badge warning">Belum</span>`
                  }

                </td>

              </tr>

            `,
            )
            .join("")}

        </tbody>

      </table>

    </div>

  `;
  }

  /**
   * Render Loading
   */
  function renderLoading() {
    const container = document.querySelector("#rekap-content");

    container.innerHTML = `
    <div class="state-loading">

      <div class="spinner"></div>

      <p>

        Memuat data rekap...

      </p>

    </div>
  `;
  }

  /**
   * Render Empty
   */
  function renderEmpty() {
    const container = document.querySelector("#rekap-content");

    container.innerHTML = `
    <div class="state-empty">

      <i class="fa-regular fa-clipboard"></i>

      <h3>

        Belum ada data

      </h3>

      <p>

        Silakan pilih kelas dan tanggal,
        kemudian klik tombol
        <strong>Tampilkan</strong>
        untuk melihat rekap penilaian.

      </p>

    </div>
  `;
  }

  return {
    render,

    renderHeader,

    renderTabs,

    renderFilter,

    renderSummary,

    renderContent,

    renderLoading,

    renderEmpty,
  };
})();

window.RekapView = RekapView;
