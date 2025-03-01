/**
 * This function is the inital function, when board.html is loading and executes the init()-function and furher necessary board-functions
 */
async function initBoard() {
  await init();  // Lädt die Daten
  await new Promise((resolve) => setTimeout(resolve, 500)); // 500ms Verzögerung zum Testen
  restoreBoardState();
  toggleMessageNoTasks();
}


function restoreBoardState() {
  let boardState = JSON.parse(localStorage.getItem("boardState"));
  if (boardState) {
    Object.keys(boardState).forEach(containerId => {
      let container = document.getElementById(containerId);
      container.innerHTML = "";
      let noTaskMessage = container.querySelector(".no-task-message-container");
      let taskHTML = "";
      boardState[containerId].forEach(taskId => {
        let taskElement = document.getElementById(taskId);
        if (taskElement) {
          taskHTML += taskElement.outerHTML;}});
      container.innerHTML = taskHTML;
      if (taskHTML.trim() !== "" && noTaskMessage) {
        noTaskMessage.style.display = "none";}});
  }
}

/**
 * This function checks if a task-category contains tasks and toggles the 'no task'-message accordingly
 */
function toggleMessageNoTasks() {
  const taskCategoryContentRef = document.getElementsByClassName("task-wrapper");
  const noTaskMessagesContentRef = document.getElementsByClassName("no-task-message-container");
  let taskCard = document.querySelector(".task-card");

  if (!taskCard) {
    console.warn("Keine Task-Card gefunden!");
    return; // Fehler vermeiden
  }

  for (let indexMessage = 0; indexMessage < taskCategoryContentRef.length; indexMessage++) {
    if (taskCategoryContentRef[indexMessage].contains(taskCard)) {
      if (noTaskMessagesContentRef[indexMessage]) {
        noTaskMessagesContentRef[indexMessage].classList.add("d-none");
      }
    } else {
      if (noTaskMessagesContentRef[indexMessage]) {
        noTaskMessagesContentRef[indexMessage].classList.remove("d-none");
      }
    }
  }
}

function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

async function drop(event) {
  event.preventDefault();
  let data = event.dataTransfer.getData("text");
  let draggedElement = document.getElementById(data);
  let dropContainer = event.target.closest(".task-wrapper");
  if (dropContainer) {
    dropContainer.appendChild(draggedElement);
    let noTaskMessage = dropContainer.querySelector(".no-task-message-container");
    if (noTaskMessage) {
      noTaskMessage.style.display = "none";
    }
    let taskId = draggedElement.getAttribute("data-task-id");
    let newStatus = dropContainer.getAttribute("data-status");
    await updateTaskStatus(taskId, newStatus);
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

async function updateTaskStatus(taskId, newStatus) {
  let taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex !== -1) {
    tasks[taskIndex].status = newStatus;

    await fetch(`${BASE_URL}tasks/${taskId}.json`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus })
    });

    console.log(`Task ${taskId} wurde in ${newStatus} verschoben`);
  }
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

/**
 * Opens the feedback edit overlay by removing hidden classes.
 * 
 * @function editFeedbackCard
 * @returns {void} Does not return anything.
 */
function editFeedbackCard() {
  // let taskData = document.get
  //   if (!taskData) {
  //       console.error("taskData is undefined or null");
  //       return;
  //   }

    let overlayEdit = document.getElementById("userStoryBodyContainer");

    if (!overlayEdit) {
        document.body.insertAdjacentHTML("beforeend", getEditTaskTemplate());
    }
}

<<<<<<< Updated upstream
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
