/**
 * ============================================================
 * QEDEV Framework
 * Quran Progress System (QPS)
 * Module : BTQ
 * View
 * ============================================================
 */

class BTQView {
  /**
   * ============================================================
   * PAGE
   * ============================================================
   */

  render() {
    return `
            <section class="btq">

                ${this.renderHeader()}

                ${this.renderContent()}

            </section>
        `;
  }

  /**
   * ============================================================
   * HEADER
   * ============================================================
   */

  renderHeader() {
    return `
            <header
                id="btq-header"
                class="btq-header">

            </header>
        `;
  }

  /**
   * ============================================================
   * CONTENT
   * ============================================================
   */

  renderContent() {
    return `
            <main
                id="btq-body"
                class="btq-body">

            </main>
        `;
  }

  /**
   * ============================================================
   * PAGE TITLE
   * ============================================================
   */

  renderScheduleHeader() {
    return `
        <section class="btq-page-header">

            <h2 class="btq-page-title">

                Jadwal Mengajar Hari Ini

            </h2>

            <p class="btq-page-subtitle">

                Senin, 14 Juli 2026

            </p>

        </section>
    `;
  }

  /**
   * ============================================================
   * SUMMARY
   * ============================================================
   */

  renderSummary(schedules = []) {
    const totalSantri = schedules.reduce(
      (total, item) => total + item.totalStudents,
      0,
    );

    return `
        <section class="btq-summary">

            <div class="btq-summary-icon">

                📖

            </div>

            <div class="btq-summary-content">

                <span>Total Santri</span>

                <strong>${totalSantri}</strong>

            </div>

        </section>
    `;
  }

  /**
   * ============================================================
   * SCHEDULE
   * ============================================================
   */

  renderScheduleList(schedules = []) {
    if (!schedules.length) {
      return this.renderEmpty("Belum ada jadwal mengajar hari ini.");
    }

    return `

        ${this.renderScheduleHeader()}

        ${this.renderSummary(schedules)}

        <section class="btq-schedule-list">

            ${schedules
              .map((schedule) => this.renderScheduleItem(schedule))
              .join("")}

        </section>

    `;
  }

  renderScheduleItem(schedule) {
    const progress = Math.round(
      (schedule.assessedStudents / schedule.totalStudents) * 100,
    );

    let status = "Belum Dimulai";

    if (
      schedule.assessedStudents > 0 &&
      schedule.assessedStudents < schedule.totalStudents
    ) {
      status = "Sedang Berjalan";
    }

    if (schedule.assessedStudents === schedule.totalStudents) {
      status = "Selesai";
    }

    return `
    <div
      class="btq-schedule-card"
      data-class-id="${schedule.classId}">

      <div class="btq-schedule-top">

        <div class="btq-schedule-title">

          <div class="btq-schedule-icon">

            📖

          </div>

          <div>

            <div class="btq-schedule-class">

              ${schedule.className}

            </div>

            <div class="btq-schedule-time">

              ${schedule.startTime} - ${schedule.endTime}

            </div>

          </div>

        </div>

        <div class="btq-schedule-progress">

          ${schedule.assessedStudents}
          /
          ${schedule.totalStudents}

        </div>

      </div>

      <div class="btq-schedule-middle">

        <div class="btq-schedule-students">

          👨‍🎓
          ${schedule.totalStudents} Santri

        </div>

        <div class="btq-schedule-status">

          ${status}

        </div>

      </div>

      <div class="btq-schedule-footer">

        <div class="btq-progress">

          <div
            class="btq-progress-bar"
            style="width:${progress}%">
          </div>

        </div>

        <div class="btq-schedule-arrow">

          <i class="fa-solid fa-chevron-right"></i>

        </div>

      </div>

    </div>
  `;
  }
  /**
   * ============================================================
   * STUDENT
   * ============================================================
   */

  /**
   * ============================================================
   * STUDENT PAGE
   * ============================================================
   */

  renderStudentPage(schedule, students = []) {
    return `

        <section class="btq-student-page">

            ${this.renderStudentHeader(schedule)}

            ${this.renderStudentSearch()}

            ${this.renderStudentList(students)}

            ${this.renderStudentFooter(students)}

        </section>

    `;
  }

  /**
   * ============================================================
   * STUDENT HEADER
   * ============================================================
   */

  renderStudentHeader(schedule) {
    return `
        <section class="btq-student-header">

            <button
                class="btq-back-button">

                <i class="fa-solid fa-arrow-left"></i>

            </button>

            <div class="btq-student-header-content">

                <h2 class="btq-student-title">

                    ${schedule.className}

                </h2>

                <p class="btq-student-subtitle">

                    ${schedule.startTime}
                    -
                    ${schedule.endTime}

                    <span class="btq-divider">•</span>

                    ${schedule.totalStudents} Santri

                </p>

            </div>

        </section>
    `;
  }

  /**
   * ============================================================
   * SEARCH
   * ============================================================
   */

  renderStudentSearch() {
    return `

        <div class="btq-search">

            <i class="fa-solid fa-magnifying-glass"></i>

            <input
                type="text"
                placeholder="Cari nama santri...">

        </div>

    `;
  }

  renderStudentList(students = []) {
    if (!students.length) {
      return this.renderEmpty("Belum ada data santri.");
    }

    return `
        <section class="btq-student-list">

            ${students
              .map((student) => this.renderStudentItem(student))
              .join("")}

        </section>
    `;
  }

  renderStudentItem(student) {
    return `

        <div
            class="btq-student-card"
            data-student-id="${student.id}">

            <div class="btq-student-left">

                <div class="btq-student-status">

                    ${
                      student.assessed
                        ? '<i class="fa-solid fa-circle-check"></i>'
                        : '<i class="fa-regular fa-circle"></i>'
                    }

                </div>

                <div>

                    <div class="btq-student-name">

                        ${student.name}

                    </div>

                    <div class="btq-student-target">

                        Target :
                        ${student.target}

                    </div>

                </div>

            </div>

            <div class="btq-student-arrow">

                <i class="fa-solid fa-chevron-right"></i>

            </div>

        </div>

    `;
  }

  /**
   * ============================================================
   * FOOTER
   * ============================================================
   */

  renderStudentFooter(students) {
    const assessed = students.filter((item) => item.assessed).length;

    return `

        <div class="btq-student-footer">

            <i class="fa-solid fa-circle-info"></i>

            ${assessed}
            dari
            ${students.length}
            santri sudah dinilai

        </div>

    `;
  }

  /**
   * ============================================================
   * ASSESSMENT
   * ============================================================
   */

  renderAssessmentModal(student) {
    return `
    <div class="btq-assessment">

      <!-- =======================================
           STUDENT
      ======================================== -->

      <div class="btq-assessment-student">

        <div class="btq-assessment-name">

          ${student.name}

        </div>

        <div class="btq-assessment-nis">

          NIS : ${student.nis}

        </div>

      </div>

      <!-- =======================================
           TARGET
      ======================================== -->

      <div class="btq-assessment-section">

        <div class="btq-label">

          Target

        </div>

        <div
          id="btq-target"
          class="btq-target">

          ${student.target}

        </div>

      </div>

      <div class="btq-assessment-section">

        <div class="btq-label">

          Halaman

        </div>

        <div
          id="btq-page"
          class="btq-target">

          ${student.page}

        </div>

      </div>

      <!-- =======================================
           FASHOHAH
      ======================================== -->

      ${Rating.render({
        name: "fashohah",
        label: "Fashohah",
        value: 5,
      })}

      <!-- =======================================
           TAJWID
      ======================================== -->

      ${Rating.render({
        name: "tajwid",
        label: "Tajwid",
        value: 5,
      })}

      <!-- =======================================
           WAZAN
      ======================================== -->

      ${Rating.render({
        name: "wazan",
        label: "Wazan",
        value: 5,
      })}


      <!-- =======================================
     HASIL PENILAIAN
      ======================================== -->

     <div class="qedev-result-card">

        <div class="qedev-result-title">

            Hasil Penilaian

        </div>

        <div
            id="btq-average"
            class="qedev-result-score">

            100

        </div>

        <div class="qedev-result-badge-wrapper">

            <div
                id="btq-grade"
                class="qedev-result-badge">

                A

            </div>

        </div>

        <div
            id="btq-description"
            class="qedev-result-description">

            Mumtaz

        </div>

        <div class="qedev-result-divider"></div>

    </div>

      <!-- =======================================
           CATATAN
      ======================================== -->

      <div class="btq-assessment-section">

        <div class="btq-label">

          Catatan

        </div>

        <textarea
          id="btq-note"
          class="btq-note"
          rows="4"
          placeholder="Tambahkan catatan..."></textarea>

      </div>

    </div>
  `;
  }

  /**
   * ============================================================
   * EMPTY
   * ============================================================
   */

  renderEmpty(message) {
    return `
            <div class="btq-empty">

                ${message}

            </div>
        `;
  }
}

window.BTQView = new BTQView();
console.log(Object.getOwnPropertyNames(BTQView.prototype));
