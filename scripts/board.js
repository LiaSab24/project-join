async function initBoard() {
  await init();
  restoreBoardState();
  toggleMessageNoTasks();
}

function restoreBoardState() {
  let boardState = JSON.parse(localStorage.getItem("boardState"));
  if (boardState) {
    Object.keys(boardState).forEach(containerId => {
      let container = document.getElementById(containerId);
      let noTaskMessage = container.querySelector(".no-task-message-container");
      let taskHTML = "";
      boardState[containerId].forEach(taskId => {
        let taskElement = document.getElementById(taskId);
        if (taskElement) {
          taskHTML += taskElement.outerHTML;}});
      container.innerHTML += taskHTML;
      if (taskHTML.trim() !== "" && noTaskMessage) {
        noTaskMessage.style.display = "none";}});
  }
}

function toggleMessageNoTasks() {
  const taskCategoryContentRef = document.getElementsByClassName("task-wrapper");
  const noTaskMessagesContentRef = document.getElementsByClassName("no-task-message-container");
  let taskCard = document.querySelector(".task-card");
  for (let indexMessage = 0; indexMessage < taskCategoryContentRef.length; indexMessage++) {
    if (taskCategoryContentRef[indexMessage].contains(taskCard)) {
      noTaskMessagesContentRef[indexMessage].classList.add("d-none");
    } else {
      noTaskMessagesContentRef[indexMessage].classList.remove("d-none");
    }
  }
}

function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
  event.preventDefault();
  let data = event.dataTransfer.getData("text");
  let draggedElement = document.getElementById(data);
  let dropContainer = event.target.closest(".task-wrapper");
  if (dropContainer) {
    dropContainer.innerHTML += draggedElement.outerHTML;
    draggedElement.remove();
    let noTaskMessage = dropContainer.querySelector(".no-task-message-container");
    if (noTaskMessage) {
      noTaskMessage.style.display = "none";
    }
    saveBoardState();
  }
  toggleMessageNoTasks();
}

function saveBoardState() {
  let boardState = {};
  document.querySelectorAll(".task-wrapper").forEach(wrapper => {
    let tasks = Array.from(wrapper.querySelectorAll(".task-card")).map(task => task.id);
    boardState[wrapper.id] = tasks;
  });
  localStorage.setItem("boardState", JSON.stringify(boardState));
}

function toggleBoardAddTaskOverlay() {
  let overlayBg = document.getElementById("overlayBg");
  let overlay = document.getElementById("addTaskOverlay");
  if (!overlay || !overlayBg) {
    insertBoardOverlay();
    toggleBoardAddTaskOverlay();
    return;
  }
  overlay.classList.toggle("d-none");
  overlayBg.classList.toggle("overlay-active");
}

function insertBoardOverlay() {
  document.body.insertAdjacentHTML("beforeend", getAddTaskOverlayTemplate());
}

function closeBoardOverlay() {
  document.getElementById("overlayBg")?.classList.remove("overlay-active");
  document.getElementById("addTaskOverlay")?.classList.add("d-none");
}

function closeFeedbackOverlay() {
  let feedbackOverlay = document.getElementById("feedbackOverlay");
  if (feedbackOverlay) {
      feedbackOverlay.remove();
  }
}

function insertUserFeedback() {
  let existingOverlay = document.getElementById(".user-feedback-wrapper");

  if (!existingOverlay) {
      document.body.insertAdjacentHTML("beforeend", getFeedbackOverlayTemplate());
  }
}

function toggleUserFeedback() {
  let feedbackOverlay = document.getElementById("userFeedbackOverlay");
  if (!feedbackOverlay) {
      insertUserFeedback();
      feedbackOverlay = document.getElementById("userFeedbackOverlay");
  }
  feedbackOverlay.classList.toggle("feedback-hidden");
}