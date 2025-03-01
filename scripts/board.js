/**
 * This function is the inital function, when board.html is loading and executes the init()-function and furher necessary board-functions
 */
async function initBoard() {
  await init();
  renderTasks();
  toggleMessageNoTasks();
}

/**
 * This function renders the tasks and adds a task-template for each each element in the tasks-array
 */
function renderTasks() {
  for (let indexTask = 0; indexTask < tasks.length; indexTask++) {
    let taskProgress = tasks[indexTask].progress.progress;
    let taskProgressContentRef = document.getElementById(taskProgress);
    taskProgressContentRef.innerHTML += getBoardTaskTemplate(indexTask);
  }
}

/**
 * This function calculates the progress of the subtasks of a task in percents
 * 
 * @param {number} indexTask - the index of the task in the tasks-array
 */
function progressSubtasksPercentage(indexTask) {
  //...
}

/**
 * This function calculates the progress of the subtasks and returns it in the following form:
 * finishedSubtasks/subtasks-number
 * 
 * @param {number} indexTask - the index of the task in the tasks-array
 */
function progressSubtasksNumbers(indexTask) {
  let tasksSubtasks = tasks[indexTask].subtasks;
  //console.log(tasksSubtasks)
  let subtasksNumber;
  let finishedSubtasks;

  if (tasksSubtasks == undefined) {
    subtasksNumber = 0;
    finishedSubtasks = 0;
  } else {
    subtasksNumber = tasksSubtasks.length;
    //countCompletedSubtasks(tasksSubtasks);
  }

  return finishedSubtasks + "/" + subtasksNumber;
}

// function countCompletedSubtasks(tasksSubtasks) {
//   console.log(tasksSubtasks.length);
//   for (let indexSubtask = 0; indexSubtask < tasksSubtasks.length; indexSubtask++) {
//     console.log(tasksSubtasks[indexSubtask].filter(completed => completed == "true"))
//     console.log(subtasksNumber)
//     let completedSubtasks = tasksSubtasks[indexSubtask].completed;
//     console.log(completedSubtasks);
//       finishedSubtasks
//   }
//   return finishedSubtasks;
// }


// for (let indexSubtask = 0; indexSubtask < tasksSubtasks.length; indexSubtask++) {
//   console.log(tasksSubtasks[indexSubtask])
//   console.log(tasksSubtasks[indexSubtask].filter(completed => completed == true).length)
//   console.log(subtasksNumber)
//   let completedSubtasks = tasksSubtasks[indexSubtask].completed;
//   console.log(completedSubtasks);
//     finishedSubtasks
// }




/**
 * This function checks if a task-category contains tasks and toggles the 'no task'-message accordingly
 */
function toggleMessageNoTasks() {
  const taskProgressCategories = document.querySelectorAll(".board-tasks-list");
  for (let indexProgressCategory = 0; indexProgressCategory < taskProgressCategories.length; indexProgressCategory++) {
    let taskProgressContentRef = document.getElementsByClassName("board-tasks-list")[indexProgressCategory];
    let noTaskMessagesContentRef = document.getElementsByClassName("no-task-message-container")[indexProgressCategory];
    if (taskProgressContentRef.innerHTML == "") {
      noTaskMessagesContentRef.classList.remove("d-none");
    } else {
      noTaskMessagesContentRef.classList.add("d-none");
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
  let dropContainer = event.target.closest(".board-tasks-list");
  if (dropContainer.contains(draggedElement) == false) {
    let indexTask = draggedElement.id.replace("task", " ").trim();
    updateTaskProgress(dropContainer.id, indexTask);
    dropContainer.innerHTML += draggedElement.outerHTML;
    draggedElement.remove();
    toggleMessageNoTasks();
  }
}

/**
 * This function checks, if the progress of a task had changed.
 * If yes, it updates the data in firebase
 * 
 * @param {string} progress - the progress of the task (toDo, inProgress, awaitFeedback, done)
 * @param {number} indexTask - the index of the task in the tasks-array
 */
function updateTaskProgress(progress, indexTask) {
  if (tasks[indexTask].progress !== progress) {
    putData("/tasks/" + tasks[indexTask].url + "/progress", {
      "progress": progress
    });
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