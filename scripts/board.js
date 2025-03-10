/**
 * This function is the inital function, when board.html is loading and executes the init()-function and further necessary board-functions
 */
async function initBoard() {
  await init();
  clearTaskProgressCategories();
  renderTasks();
  toggleMessageNoTasks();
}
 
/**
 * This function clears each of the progress-catergories
 */
function clearTaskProgressCategories() {
  document.getElementById("toDo").innerHTML = "";
  document.getElementById("inProgress").innerHTML = "";
  document.getElementById("awaitFeedback").innerHTML = "";
  document.getElementById("done").innerHTML = "";
}

/** 
 * This function creates a task-card for each task in its corresponding progress-category
 */
function renderTasks() {
  clearTaskProgressCategories();
  for (let indexTask = 0; indexTask < tasks.length; indexTask++) {
    let taskProgress = tasks[indexTask].progress.progress;
    let taskProgressContentRef = document.getElementById(taskProgress);
    taskProgressContentRef.innerHTML += getBoardTaskTemplate(indexTask);
    hideSubtasksProgressForNoSubtasks(indexTask);
    displayAssignedContacts(indexTask);
    if (tasks[indexTask].priority == "") {
      document.getElementById("prio" + indexTask).src = "";
    }
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
      if (tasksSubtasks[indexSubtask].completed == "true") {
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
  if (assignedContacts !== undefined) {
    for (let indexAssignedContact = 0; indexAssignedContact < assignedContacts.length; indexAssignedContact++) {
      let indexContact = contacts.findIndex(index => index.name === assignedContacts[indexAssignedContact].name);
      assignedContactsContentRef.innerHTML += getBoardContactPB(indexContact);
      profileBadgeColor("boardAssignedToListPB" + indexContact, indexContact);
    }
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

/**
 * This function checks if the searchInput contains three or more characters. If so, it executes the displayFilteredTasks()-function
 * If not, it fills the progress-categories with the corresponding tasks.
 */
function startSearchingTasks() {
  let searchInputRef = document.getElementById("searchInput");
  let searchInput = searchInputRef.value.toLowerCase();
  clearTaskProgressCategories();
  searchInputRef.disabled = true;
  if (searchInput.length >= 3) {
    displayFilteredTasks(searchInput);
  } else {
    clearTaskProgressCategories();
    renderTasks();
    document.getElementById("noResultSearchInput").classList.add("d-none");
  }
  searchInputRef.disabled = false;
  searchInputRef.focus();
  toggleMessageNoTasks();
}

/**
* This function fills the progress-categories with the filtered elements.
* 
* @param {string} searchInput - the value of the searchInputRef
*/
function displayFilteredTasks(searchInput) {
  filterTasks(searchInput);
  for (let indexTask = 0; indexTask < filteredTasks.length; indexTask++) {
    if (filteredTasks[indexTask] != 0) {
      let taskProgress = tasks[indexTask].progress.progress;
      let taskProgressContentRef = document.getElementById(taskProgress);
      taskProgressContentRef.innerHTML += getBoardTaskTemplate(indexTask);
      hideSubtasksProgressForNoSubtasks(indexTask);
      displayAssignedContacts(indexTask);
      if (tasks[indexTask].priority == "") {
        document.getElementById("prio" + indexTask).src = "";
      }
    }
  }
  if (document.querySelectorAll(".task-card").length == 0){
    document.getElementById("noResultSearchInput").classList.remove("d-none");
  }
}

/**
* This function filters those tasks from the tasks-array, whose title or description contain the searchInput
* 
* @param {string} searchInput - the value of the searchInputRef
*/
function filterTasks(searchInput) {
  filteredTasks = [];
  for (let indexTask = 0; indexTask < tasks.length; indexTask++) {
    let tasksTitle = tasks[indexTask].title.toLowerCase();
    let tasksDescription = tasks[indexTask].description.toLowerCase();
    if (tasksTitle.includes(searchInput) || tasksDescription.includes(searchInput)) {
      filteredTasks.push(tasks[indexTask]);
    } else {
      filteredTasks.push(0)
    }
  }
}

/**
 * Prevents the default behavior to allow dropping an element.
 * 
 * @param {DragEvent} event - The drag event.
 */
function allowDrop(event) {
  event.preventDefault();
}

/**
 * Sets the dragged element's ID in the dataTransfer object.
 * 
 * @param {DragEvent} event - The drag event.
 */
function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

/**
 * Handles the drop event by moving the dragged task to a new column and updating its progress.
 * 
 * @param {DragEvent} event - The drop event.
 */ 
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