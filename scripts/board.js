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
    assignedContactsContentRef.innerHTML += getContactPB(indexContact);
    profileBadgeColor("assignedToListPB" + indexContact, indexContact);
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
 * Öffnet oder schließt das Edit-Overlay für eine Aufgabe.
 */
function toggleEditOverlay() {
  let editOverlay = document.getElementById("editTaskOverlay");
  if (!editOverlay) {
      insertEditOverlay();
      setTimeout(() => {
          editOverlay = document.getElementById("editTaskOverlay");
          if (editOverlay && !editOverlay.classList.contains("d-none")) {
              editOverlay.classList.remove("d-none");
              editOverlay.style.display = "";
          }
      }, 200);
  } else if (!editOverlay.classList.contains("d-none")) {
      return;
  } else {
      editOverlay.classList.toggle("d-none");
      editOverlay.style.display = editOverlay.classList.contains("d-none") ? "none" : "";
  }
}



/**
 * Fügt das Edit-Overlay in das DOM ein, falls es noch nicht existiert.
 */
function insertEditOverlay() {
  let container = document.body;
  if (!document.getElementById("editTaskOverlay")) {
      container.insertAdjacentHTML("beforeend", getEditTaskTemplate());
  }
}


function saveTaskChanges(event) {
  event.stopPropagation();
  let button = event.target.closest(".userStoryEditOkButton");
  if (!button) return;
  let overlay = button.closest("#editTaskOverlay");
  if (overlay) {
      overlay.classList.add("d-none");
  }
}

function closeOverlay(event) {
  event.stopPropagation();
  let button = event.target.closest(".close-btn");
  if (!button) return;

  let overlay = button.closest("#editTaskOverlay, #addTaskOverlay, #feedbackOverlay, .overlay-wrapper, .userStoryBodyContainer");
  if (overlay) {
      overlay.classList.add("d-none");
  }
}

async function deleteTask(event, indexTask) {
  event.stopPropagation();
  let button = event.target.closest(".feedback-delete-btn");
  if (!button) return;
  let taskCard = document.getElementById(`task${indexTask}`);
  if (!taskCard) {
      console.log("Fehler: Task-Card nicht gefunden!");
      return;
  }
  taskCard.remove();
  console.log(`Task ${indexTask} aus dem DOM entfernt`);
  let taskId = tasks[indexTask]?.url;
  tasks.splice(indexTask, 1);
  console.log(`Task ${indexTask} aus dem Array entfernt`);
  if (taskId) {
      await deleteTaskFromFirebase(taskId);
  }
  renderTasks();
  toggleMessageNoTasks();
}

async function deleteTaskFromFirebase(taskId) {
  try {
      let response = await fetch(`${BASE_URL}tasks/${taskId}.json`, {
          method: "DELETE"
      });

      if (response.ok) {
          console.log(`Task mit ID ${taskId} erfolgreich aus Firebase gelöscht`);
      } else {
          console.error("Fehler beim Löschen aus Firebase:", response.status);
      }
  } catch (error) {
      console.error("Fehler bei der Verbindung mit Firebase:", error);
  }
}
