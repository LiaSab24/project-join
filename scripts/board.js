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
    hideSubtasksProgressForNoSubtasks(indexTask);
    displayAssignedContacts(indexTask);
  }
}

/**
 * This function calculates the progress of the subtasks of a task in percents
 * 
 * @param {number} indexTask - the index of the task in the tasks-array
 */
function progressSubtasksPercentage(indexTask) {
  let totalSubtasks = countTotalSubtasks(indexTask);
  let completedSubtasks = countCompletedSubtasks(indexTask);
  if (totalSubtasks !== 0) {
    return (completedSubtasks / totalSubtasks) * 100;
  } else {
    return 0;
  }
}

/**
 * This function counts the number of subtasks of a task and returns the value
 * 
 * @param {number} indexTask - the index of the task in the tasks-array
 */
function countTotalSubtasks(indexTask) {
  let tasksSubtasks = tasks[indexTask].subtasks;
  let totalSubtasks = 0;
  if (tasksSubtasks !== undefined) {
    totalSubtasks = tasksSubtasks.length;
  }
  return totalSubtasks;
}

/**
 * This function counts the number of completed subtasks of a task and returns the value
 * 
 * @param {number} indexTask - the index of the task in the tasks-array
 */
function countCompletedSubtasks(indexTask) {
  let tasksSubtasks = tasks[indexTask].subtasks;
  let completedSubtasks = 0;

  if (tasksSubtasks !== undefined) {
    for (let indexSubtask = 0; indexSubtask < tasksSubtasks.length; indexSubtask++) {
      if (tasksSubtasks[indexSubtask].completed === true) {
        completedSubtasks++;
      }
    }
  }
  return completedSubtasks;
}

/**
 * This function displays the assigned contacts for a task
 * 
 * @param {number} indexTask - the index of the task in the tasks-array
 */
function displayAssignedContacts(indexTask) {
  let assignedContactsContentRef = document.getElementById("assignedContacts" + indexTask);
  assignedContactsContentRef.innerHTML = "";
  let assignedContacts = tasks[indexTask].assignedTo;
  for (let indexAssignedContact = 0; indexAssignedContact < assignedContacts.length; indexAssignedContact++) {
    let indexContact = contacts.findIndex(index => index.name === assignedContacts[indexAssignedContact].name);
    assignedContactsContentRef.innerHTML += getBoardContactPB(indexContact);
    profileBadgeColor("boardAssignedToListPB" + indexContact, indexContact);
  }
}

/**
 * This function hides the representation of the subtasks-progress, if a task has no subtasks assigned
 * 
 * @param {number} indexTask - the index of the task in the tasks-array
 */
function hideSubtasksProgressForNoSubtasks(indexTask) {
  if (tasks[indexTask].subtasks == undefined) {
    document.getElementById("boardProgressSubtask" + indexTask).classList.add("d-none");
  }
}

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

function closeOverlays() {
  document.getElementById("boardOverlayBg").classList.add("d-none");
  document.getElementById("boardOverlayBg").classList.remove("overlay-active");
  document.getElementById("addTaskOverlay").classList.add("d-none");
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

/**
 * This function fetches the main-part of the add_task.html and implementes it in the #addTaskOverlay-section
 */
async function openAddTaskOverlays() {
  fetch('add_task.html')
    .then(response => {
      return response.text()
    })
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      let addTaskOverlay = doc.querySelector('#addTask').innerHTML;
      initAddTask();
      openBoardBgOverlay();
      openBoardAddTaskOverlay(addTaskOverlay);
    })
    .catch(error => {
      console.error('Failed to fetch page: add_task.html')
    })
}

/**
 * This function is part of the openAddTaskOverlay()-function and adds visibility of the #boardOverlayBg
 */
function openBoardBgOverlay() {
  let boardOverlayBgContentRef = document.getElementById("boardOverlayBg");
  boardOverlayBgContentRef.classList.remove("d-none");
  setTimeout(function () {
    boardOverlayBgContentRef.classList.add("overlay-active");
  });
}

/**
 * This function is part of the openAddTaskOverlay()-function and adds visibility of the #addTaskOverlay
 * 
 * @param {html} addTaskOverlay - the html of the main-part of the add_task.html
 */
async function openBoardAddTaskOverlay(addTaskOverlay) {
  let addTaskOverlayContentRef = document.getElementById("addTaskOverlay");
  addTaskOverlayContentRef.classList.remove("d-none");
  addTaskOverlayContentRef.innerHTML = "";
  addTaskOverlayContentRef.innerHTML = addTaskOverlay;
}

function closeFeedbackOverlay() {
  let feedbackOverlay = document.getElementById("feedbackOverlay");
  if (feedbackOverlay) {
    feedbackOverlay.remove();
  }
}

// function insertUserFeedback() {
//   let existingOverlay = document.getElementById(".user-feedback-wrapper");

//   if (!existingOverlay) {
//     document.body.insertAdjacentHTML("beforeend", getFeedbackOverlayTemplate());
//   }
// }

function toggleUserFeedback() {
  let feedbackOverlay = document.getElementById("userFeedbackOverlay");
  if (!feedbackOverlay) {
    insertUserFeedback();
    feedbackOverlay = document.getElementById("userFeedbackOverlay");
  }
  feedbackOverlay.classList.toggle("feedback-hidden");
}