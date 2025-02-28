/**
 * This function is the inital function, when board.html is loading and executes the init()-function and furher necessary board-functions
 */
async function initBoard() {
  await init();
  toggleMessageNoTasks();
}

/**
 * This function checks if a task-category contains tasks and toggles the 'no task'-message accordingly
 */
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
  }
  toggleMessageNoTasks();
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