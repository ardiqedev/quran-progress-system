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

    filteredStudents: [],

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
    document.addEventListener("input", handleInput);

    Rating.bindEvents(handleRatingChange);
    Rating.setOnChange(updateAssessment);
  }

  /**
   * ============================================================
   * HANDLE CLICK
   * ============================================================
   */

  function handleClick(e) {
    const back = e.target.closest(".btq-back-button");

    if (back) {
      showSchedule();

      return;
    }
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

  function handleInput(e) {
    if (e.target.matches("#btq-search")) {
      searchStudent(e.target.value);
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

    state.selectedSchedule = null;

    state.selectedStudent = null;

    renderSchedules();
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
      state.filteredStudents,
    );
  }

  /**
   * ============================================================
   * PILIH KELAS
   * ============================================================
   */

  function selectClass(schedule) {
    state.selectedSchedule = schedule;

    const workspace = State.get("workspace");

    const students = workspace.students.filter(
      (student) => student.classId === schedule.classId,
    );

    state.studentList = students;

    state.filteredStudents = [...students];

    showStudents();
  }

  /**
   * ============================================================
   * PILIH SANTRI
   * ============================================================
   */

  function searchStudent(keyword) {
    keyword = keyword.trim().toLowerCase();

    if (!keyword) {
      state.filteredStudents = [...state.studentList];

      console.log(state.filteredStudents);

      renderStudents();

      return;
    }

    state.filteredStudents = state.studentList.filter((student) => {
      return student.name.toLowerCase().includes(keyword);
    });

    console.log(state.filteredStudents);

    renderStudents();
  }

  /**
   * ============================================================
   * PILIH SANTRI
   * ============================================================
   */

  async function selectStudent(student) {
    state.selectedStudent = student;

    // ==========================================
    // SUDAH DINILAI
    // ==========================================

    if (student.assessed) {
      const response = await BTQService.getAssessment(student.transactionId);

      if (response.success) {
        state.assessment = {
          fashohah: {
            star: Rating.getStarByScore(response.data.fashohah),

            score: response.data.fashohah,
          },

          tajwid: {
            star: Rating.getStarByScore(response.data.tajwid),

            score: response.data.tajwid,
          },

          wazan: {
            star: Rating.getStarByScore(response.data.wazan),

            score: response.data.wazan,
          },

          average: response.data.average,

          grade: response.data.grade,

          description: response.data.description,

          note: response.data.note || "",
        };
      }
    }

    // ==========================================
    // BELUM DINILAI
    // ==========================================
    else {
      state.assessment = BTQHelper.createAssessment();

      BTQHelper.updateResult(
        state.assessment,

        state.masterPredikat,
      );
    }

    openAssessmentModal();
  }

  /**
   * ============================================================
   * UPDATE STUDENT STATE
   * ============================================================
   */

  function updateStudentState(student) {
    // ==========================================
    // Workspace
    // ==========================================

    const workspace = State.get("workspace");

    const workspaceStudent = workspace.students.find(
      (item) => item.id === student.id,
    );

    if (workspaceStudent) {
      Object.assign(workspaceStudent, student);

      workspaceStudent.assessed = true;
    }

    // ==========================================
    // Student List
    // ==========================================

    const listStudent = state.studentList.find(
      (item) => item.id === student.id,
    );

    if (listStudent) {
      Object.assign(listStudent, student);

      listStudent.assessed = true;
    }

    // ==========================================
    // Filtered Student
    // ==========================================

    const filteredStudent = state.filteredStudents.find(
      (item) => item.id === student.id,
    );

    if (filteredStudent) {
      Object.assign(filteredStudent, student);

      filteredStudent.assessed = true;
    }
  }

  /**
   * ============================================================
   * SIMPAN PENILAIAN
   * ============================================================
   */

  async function saveAssessment(payload) {
    try {
      const response = await BTQService.saveAssessment(payload);

      if (!response.success) {
        Toast.error(response.message);

        return;
      }

      updateStudentState(response.data.student);

      BottomSheet.close();

      renderStudents();

      Toast.success(response.message);
    } catch (error) {
      Toast.error(error.message);
    }
  }

  /**
   * ============================================================
   * SUBMIT PENILAIAN
   * ============================================================
   */

  let isSaving = false;

  async function submitAssessment() {
    if (isSaving) {
      return;
    }

    const workspace = State.get("workspace");

    const btnSave = document.querySelector("#btq-save");

    try {
      isSaving = true;

      if (btnSave) {
        btnSave.disabled = true;

        btnSave.textContent = "Menyimpan...";
      }

      const payload = {
        transactionId: state.selectedStudent.transactionId,

        teacherId: workspace.teacher.id,

        classId: state.selectedSchedule.classId,

        studentId: state.selectedStudent.id,

        targetId: state.selectedStudent.btqTargetId,

        page: state.selectedStudent.btqPage,

        fashohah: state.assessment.fashohah.star,

        tajwid: state.assessment.tajwid.star,

        wazan: state.assessment.wazan.star,

        note: document.querySelector("#btq-note")?.value || "",
      };

      await saveAssessment(payload);
    } finally {
      isSaving = false;

      if (btnSave) {
        btnSave.disabled = false;

        btnSave.textContent = "Simpan";
      }
    }
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
    document.querySelector("#btq-student-list").innerHTML =
      window.BTQView.renderStudentList(state.filteredStudents);

    document.querySelector("#btq-student-footer").innerHTML =
      window.BTQView.renderStudentFooter(state.filteredStudents);
  }

  /**
   * ============================================================
   * MODAL PENILAIAN
   * ============================================================
   */

  function openAssessmentModal() {
    BottomSheet.open({
      title: "Penilaian BTQ",

      content: window.BTQView.renderAssessmentModal(
        state.selectedStudent,
        state.assessment,
      ),

      footer: `

      <button
          id="btq-cancel"
          class="qedev-button">

          Batal

      </button>

      <button
          id="btq-save"
          class="qedev-button qedev-button-primary">

          Simpan

      </button>

      `,
    });

    const btnSave = document.querySelector("#btq-save");

    btnSave?.addEventListener("click", submitAssessment);

    const btnCancel = document.querySelector("#btq-cancel");

    btnCancel?.addEventListener("click", () => BottomSheet.close());
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
