/**
 * ==========================================
 * QPS Module
 * Home View
 * ==========================================
 */

const HomeView = (() => {
  /**
   * ==========================================
   * Render Home
   * ==========================================
   */
  function render(data) {
    return `
      <section class="qedev-home">

        ${renderGreeting(data)}

        ${renderSchedule(data)}

        ${renderActivity()}

        ${renderReport()}

        ${renderReference()}

      </section>
    `;
  }

  /**
   * ==========================================
   * Greeting
   * ==========================================
   */
  /**
   * ==========================================
   * Greeting
   * ==========================================
   */
  function renderGreeting(data) {
    const teacher = data?.teacher || {};

    return `
    <section class="qedev-home-greeting">

      <div class="qedev-home-greeting-content">

        <div class="qedev-home-greeting-text">

          <div class="qedev-home-greeting-salam">

            Assalamu'alaikum 👋

          </div>

          <div class="qedev-home-greeting-name">

            ${teacher.name || "Ustadz/Ustadzah"}

          </div>

          <div class="qedev-home-greeting-message">

            Semangat menilai,
            semangat mendidik. 💚

          </div>

        </div>

        <div class="qedev-home-greeting-avatar">

          <img
            src="${teacher.photo || "assets/images/avatar.png"}"
            alt="Avatar">

        </div>

      </div>

    </section>
  `;
  }

  /**
   * ==========================================
   * Render Home Section
   * ==========================================
   */
  function renderHomeSection({ icon, title, content, className = "" }) {
    return Card.render({
      content: `
      <section class="qedev-home-section ${className}">

        <div class="qedev-home-title">

          ${
            icon.startsWith("assets/")
              ? `<img
                    src="${icon}"
                    alt="${title}"
                    class="qedev-home-title-icon">`
              : `<i class="${icon}"></i>`
          }

          <span>${title}</span>

        </div>

        <div class="qedev-home-content">

          ${content}

        </div>

      </section>
    `,
    });
  }

  /**
   * ==========================================
   * Schedule
   * ==========================================
   */
  function renderSchedule(data) {
    return renderHomeSection({
      icon: "fa-regular fa-calendar",

      title: "Jadwal Mengajar Hari Ini",

      content: renderScheduleContent(data),

      className: "qedev-home-schedule",
    });
  }

  /**
   * ==========================================
   * Schedule Content
   * ==========================================
   */
  function renderScheduleContent(data) {
    return `
    <div class="qedev-schedule">

      <div class="qedev-schedule-left">

        ${renderScheduleList(data.schedules)}

      </div>

      <div class="qedev-schedule-right">

        ${renderScheduleSummary(data.summary)}

      </div>

    </div>
  `;
  }

  /**
   * ==========================================
   * Schedule List
   * ==========================================
   */
  function renderScheduleList(schedules = []) {
    if (!schedules.length) {
      return `
      <div class="qedev-empty">

        Tidak ada jadwal hari ini.

      </div>
    `;
    }

    return schedules.map(renderScheduleItem).join("");
  }

  /**
   * ==========================================
   * Schedule Item
   * ==========================================
   */
  function renderScheduleItem(item) {
    return `
    <div class="qedev-schedule-item">

      <div class="qedev-schedule-class">

        ${item.className || "-"}

      </div>

      <div class="qedev-schedule-time">

        ${item.startTime || "--:--"} - ${item.endTime || "--:--"}

      </div>

      <div class="qedev-schedule-student">

        <i class="fa-regular fa-user"></i>

        ${item.totalStudents ?? 0} 

      </div>

    </div>
  `;
  }

  /**
   * ==========================================
   * Schedule Summary
   * ==========================================
   */
  function renderScheduleSummary(summary = {}) {
    return `
    <div class="qedev-schedule-summary">

      <div class="qedev-summary-item">

        <div class="qedev-summary-label">
          Total Kelas
        </div>

        <div class="qedev-summary-value">
          ${summary.totalClass ?? 0}
        </div>

      </div>

      <div class="qedev-summary-item">

        <div class="qedev-summary-label">
          Total Santri
        </div>

        <div class="qedev-summary-value">
          ${summary.totalStudents ?? 0}
        </div>

      </div>

      <div class="qedev-schedule-book">
        <i class="fa-solid fa-book-quran"></i>
      </div>

    </div>
  `;
  }

  /**
   * ==========================================
   * Activity
   * ==========================================
   */
  function renderActivity() {
    return renderHomeSection({
      icon: "fa-solid fa-users",

      title: "Aktivitas",

      content: renderActivityContent(),

      className: "qedev-home-activity",
    });
  }

  /**
   * ==========================================
   * Activity Content
   * ==========================================
   */
  function renderActivityContent() {
    return Launcher.renderGrid(`

    ${Launcher.renderItem({
      icon: "assets/icons/icon-btq.png",

      color: "success",

      title: "Penilaian BTQ",

      subtitle: "Baca Tulis",

      description: "Al-Qur'an",

      route: "btq",
    })}

    ${Launcher.renderItem({
      icon: "assets/icons/icon-tahfidz.png",

      color: "primary",

      title: "Penilaian Tahfidz",

      subtitle: "Setoran Hafalan",

      description: "Al-Qur'an",

      route: "tahfidz",
    })}

  `);
  }

  /**
   * ==========================================
   * Report
   * ==========================================
   */
  function renderReport() {
    return renderHomeSection({
      icon: "fa-solid fa-chart-column",

      title: "Laporan",

      content: renderReportContent(),

      className: "qedev-home-report",
    });
  }

  /**
   * ==========================================
   * Report Content
   * ==========================================
   */
  function renderReportContent() {
    return Launcher.renderGrid(`

    ${Launcher.renderItem({
      icon: "assets/icons/icon-rekap.png",

      color: "warning",

      title: "Rekap",

      subtitle: "Rekap Harian",

      description: "dan Bulanan",

      route: "rekap",
    })}

    ${Launcher.renderItem({
      icon: "assets/icons/icon-report.png",

      color: "secondary",

      title: "Hasil Pencapaian",

      subtitle: "Perkembangan Santri",

      description: "dan Cetak Laporan",

      route: "hasil",
    })}

  `);
  }

  /**
   * ==========================================
   * Reference
   * ==========================================
   */
  function renderReference() {
    return renderHomeSection({
      icon: "fa-solid fa-book-quran",

      title: "Referensi",

      content: renderReferenceContent(),

      className: "qedev-home-reference",
    });
  }

  /**
   * ==========================================
   * Reference Content
   * ==========================================
   */
  function renderReferenceContent() {
    return Launcher.renderGrid(`

    ${Launcher.renderItem({
      icon: "assets/icons/icon-target.png",

      color: "info",

      title: "Target Hafalan",

      subtitle: "Target BTQ &",

      description: "Tahfidz Kelas",

      route: "target",
    })}

    ${Launcher.renderItem({
      icon: "assets/icons/icon-profil.png",

      color: "accent",

      title: "Profil",

      subtitle: "Informasi Akun",

      description: "Guru",
      route: "profile",
    })}

  `);
  }

  return {
    render,
  };
})();

window.HomeView = HomeView;
