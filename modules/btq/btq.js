/**
 * ============================================================
 * QEDEV Framework
 * Quran Progress System (QPS)
 * Module : BTQ
 * Controller
 * ============================================================
 */

const BTQ = (() => {
  /**
   * ============================================================
   * STATE
   * ============================================================
   */

  const state = {
    currentView: "schedule",

    scheduleList: [],

    studentList: [],

    selectedSchedule: null,

    selectedStudent: null,

    assessment: null,

    masterRating: [],

    masterPredikat: [],

    masterTarget: [],
  };
  /**
   * ============================================================
   * INIT
   * ============================================================
   */

  async function init() {
    render();

    await loadMaster();

    await loadSchedules();

    bindEvents();
  }

  /**
   * ============================================================
   * DESTROY
   * ============================================================
   */

  function destroy() {
    // Cleanup jika diperlukan
  }

  /**
   * ============================================================
   * RENDER
   * ============================================================
   */

  function render() {
    Layout.setContent(window.BTQView.render());
  }

  /**
   * ============================================================
   * EVENTS
   * ============================================================
   */

  let eventBound = false;

  function bindEvents() {
    if (eventBound) return;

    eventBound = true;

    document.addEventListener("click", handleClick);

    Rating.bindEvents(handleRatingChange);
    Rating.setOnChange(updateAssessment);
  }

  /**
   * ============================================================
   * HANDLE CLICK
   * ============================================================
   */

  function handleClick(e) {
    const schedule = e.target.closest(".btq-schedule-card");

    if (schedule) {
      const item = state.scheduleList.find(
        (x) => x.classId === schedule.dataset.classId,
      );

      if (item) {
        selectClass(item);
      }

      return;
    }

    const student = e.target.closest(".btq-student-card");

    if (student) {
      const item = state.studentList.find(
        (x) => x.id === student.dataset.studentId,
      );

      if (item) {
        selectStudent(item);
      }

      return;
    }
  }

  /**
   * ============================================================
   * HANDLE RATING
   * ============================================================
   */

  function handleRatingChange(field, star) {
    updateAssessment(field, star);
  }

  /**
   * ============================================================
   * LOAD JADWAL
   * ============================================================
   */

  async function loadSchedules() {
    const response = await BTQService.getScheduleToday();

    if (!response.success) {
      console.error(response.message);
      return;
    }

    state.scheduleList = response.data;

    showSchedule();
  }

  /**
   * ============================================================
   * LOAD MASTER
   * ============================================================
   */

  async function loadMaster() {
    try {
      const [rating, predikat, target] = await Promise.all([
        BTQService.getMasterRating(),
        BTQService.getMasterPredikat(),
        BTQService.getMasterTarget(),
      ]);

      if (rating.success) {
        state.masterRating = rating.data;

        Rating.setMapping(rating.data);
      }

      if (predikat.success) {
        state.masterPredikat = predikat.data;
      }

      if (target.success) {
        state.masterTarget = target.data;
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * ============================================================
   * TAMPILKAN JADWAL
   * ============================================================
   */

  function showSchedule() {
    state.currentView = "schedule";

    renderSchedules();
  }

  /**
   * ============================================================
   * LOAD SANTRI
   * ============================================================
   */

  async function loadStudents(classId) {
    const response = await BTQService.getStudentsByClass(classId);

    if (!response.success) {
      console.error(response.message);
      return;
    }

    state.studentList = response.data;
  }

  /**
   * ============================================================
   * TAMPILKAN SANTRI
   * ============================================================
   */

  function showStudents() {
    state.currentView = "student";

    const body = document.querySelector("#btq-body");

    body.innerHTML = window.BTQView.renderStudentPage(
      state.selectedSchedule,
      state.studentList,
    );
  }

  /**
   * ============================================================
   * PILIH KELAS
   * ============================================================
   */

  async function selectClass(schedule) {
    state.selectedSchedule = schedule;

    await loadStudents(schedule.classId);

    showStudents();
  }

  /**
   * ============================================================
   * PILIH SANTRI
   * ============================================================
   */

  function selectStudent(student) {
    state.selectedStudent = student;

    state.assessment = BTQHelper.createAssessment();

    BTQHelper.updateResult(
      state.assessment,

      state.masterPredikat,
    );

    openAssessmentModal();
  }

  /**
   * ============================================================
   * SIMPAN PENILAIAN
   * ============================================================
   */

  async function saveAssessment(payload) {
    const response = await BTQService.saveAssessment(payload);

    if (!response.success) {
      console.error(response.message);
      return;
    }

    await loadStudents(state.selectedSchedule.classId);

    showStudents();
  }

  /**
   * ============================================================
   * RENDER JADWAL
   * ============================================================
   */

  function renderSchedules() {
    const body = document.querySelector("#btq-body");

    if (!body) return;

    body.innerHTML = window.BTQView.renderScheduleList(state.scheduleList);
  }

  /**
   * ============================================================
   * RENDER SANTRI
   * ============================================================
   */

  function renderStudents() {
    const body = document.querySelector("#btq-body");

    if (!body) return;

    body.innerHTML = window.BTQView.renderStudentList(state.studentList);
  }

  /**
   * ============================================================
   * MODAL PENILAIAN
   * ============================================================
   */

  /**
   * ============================================================
   * MODAL PENILAIAN
   * ============================================================
   */

  function openAssessmentModal() {
    BottomSheet.open({
      title: "Penilaian BTQ",

      content: window.BTQView.renderAssessmentModal(state.selectedStudent),

      footer: `
      <button
        class="qedev-button">

        Batal

      </button>

      <button
        class="qedev-button qedev-button-primary">

        Simpan

      </button>
    `,
    });
    renderAssessmentSummary();
  }

  /**
   * ============================================================
   * RENDER SUMMARY
   * ============================================================
   */

  function renderAssessmentSummary() {
    if (!state.assessment) return;

    updateScore("fashohah");

    updateScore("tajwid");

    updateScore("wazan");

    updateAverage();

    updateGrade();

    updateDescription();
  }

  /**
   * ============================================================
   * UPDATE SCORE
   * ============================================================
   */

  function updateScore(field) {
    const element = document.querySelector(`#btq-score-${field}`);

    if (!element) return;

    element.textContent = state.assessment[field].score;
  }

  function updateAssessment(field, star) {
    BTQHelper.updateItem(
      state.assessment,

      field,

      star,
    );

    BTQHelper.updateResult(
      state.assessment,

      state.masterPredikat,
    );

    console.log(state.assessment);

    renderAssessmentSummary();
  }

  function updateAssessment(field, star) {
    console.log("FIELD :", field);
    console.log("STAR :", star);

    BTQHelper.updateItem(state.assessment, field, star);

    BTQHelper.updateResult(state.assessment, state.masterPredikat);

    console.log(state.assessment);

    renderAssessmentSummary();
  }

  /**
   * ============================================================
   * UPDATE AVERAGE
   * ============================================================
   */

  function updateAverage() {
    const element = document.querySelector("#btq-average");

    if (!element) return;

    element.textContent = state.assessment.average;
  }

  /**
   * ============================================================
   * UPDATE GRADE
   * ============================================================
   */

  function updateGrade() {
    const element = document.querySelector("#btq-grade");

    if (!element) return;

    element.textContent = state.assessment.grade;
  }

  /**
   * ============================================================
   * UPDATE DESCRIPTION
   * ============================================================
   */

  function updateDescription() {
    const element = document.querySelector("#btq-description");

    if (!element) return;

    element.textContent = state.assessment.description;
  }
  return {
    init,

    destroy,
  };
})();

window.BTQ = BTQ;
