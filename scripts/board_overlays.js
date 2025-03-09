/**
 * This function is closes all Board-Overlays
 */
function closeOverlays() {
    document.getElementById("boardOverlayBg").classList.remove("overlay-active");
    document.getElementById("boardOverlayBg").classList.add("d-none");
    document.getElementById("addTaskOverlay").classList.add("d-none");
    document.getElementById("overviewOverlay").classList.add("d-none");
    document.getElementById("editTaskOverlay").classList.add("d-none");
    document.getElementById("addTaskOverlay").classList.remove("edit-task-overlay");
    renderTasks();
}

/**
 * This function opens the background overlay for board-overlays
 */
function openBoardBgOverlay() {
    let boardOverlayBgContentRef = document.getElementById("boardOverlayBg");
    boardOverlayBgContentRef.classList.remove("d-none");;
    setTimeout(function () {
        boardOverlayBgContentRef.classList.add("overlay-active");
    }, 100);
}

/**
 * This function opens the editTaskOverlay for the clicked task, which gives the user the ability to edit the information
 * 
 * @param {string} progress - the progress-category, where the new task should be in after submitting
 */
async function openEditTaskOverlay(progress, indexTask) {
    closeOverlays();
    let overlayContentRef = document.getElementById("editTaskOverlay");
    overlayContentRef.classList.remove("d-none");
    overlayContentRef.innerHTML = "";
    overlayContentRef += await boardAddTask('edit', progress, indexTask);
}

/**
 * This function fetches the main-part of the add_task.html and implementes it in the #addTaskOverlay-section
 * 
 * @param {string} overlay - the overlay, that should get the fetched html-data
 * @param {string} progress - the progress-category, where the new task should be in after submitting
 * @param {number} indexTask - the index of the task in the tasks-array
 */
async function boardAddTask(overlay, progress, indexTask) {
    fetch('add_task.html')
        .then(response => {
            return response.text()
        })
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");
            let addTaskOverlayContent = doc.querySelector('#addTask').innerHTML;
            initBoard();
            openBoardBgOverlay();
            if (overlay == "add") {
                openBoardAddTaskOverlay(addTaskOverlayContent, progress);
                clearTaskForm();
            } if (overlay == "edit") {
                adjustBoardEditTaskOverlay(addTaskOverlayContent);
                document.getElementById("addTaskSubmitBtns").innerHTML += getBoardEditTaskBtnTemplate(indexTask);
                document.getElementById("editTaskOk").classList.add("progress-" + progress);
                fillEditTaskInputs(indexTask);
            }
            fillAssignedToDropDownMenu();
        })
}

/**
* This function is part of the boardAddTask()-function and adds visibility of the #addTaskOverlay
* 
* @param {html} addTaskOverlay - the html of the main-part of the add_task.html
* @param {string} progress - the progress-category, where the new task should be in after submitting
*/
async function openBoardAddTaskOverlay(addTaskOverlayContent, progress) {
    let addTaskOverlayContentRef = document.getElementById("addTaskOverlay");
    addTaskOverlayContentRef.classList.remove("d-none");
    addTaskOverlayContentRef.innerHTML = "";
    addTaskOverlayContentRef.innerHTML = addTaskOverlayContent;
    document.getElementById("addTaskH1").innerHTML += getBoardCloseBtnTemplate();
    adjustAddTaskProgress(progress);
}

/**
* This function is part of the openBoardAddTaskOverlay()-function.
* It changes the classList of the #addTaskCreate-Button, so the added task is added in the right progress-category
* 
* @param {string} progress - the progress-category, where the new task should be in after submitting
*/
function adjustAddTaskProgress(progress) {
    let addTaskCreateBtnClassList = document.getElementById("addTaskCreate").classList;
    addTaskCreateBtnClassList.remove("progress-toDo");
    addTaskCreateBtnClassList.add("progress-" + progress);
}

/**
 * This function is part of the boardAddTask()-function and adds visibility of the #addTaskOverlay
 * 
 * @param {html} addTaskOverlayContent - the html-content of the main-part of the add_task.html
 */
async function adjustBoardEditTaskOverlay(addTaskOverlayContent) {
    let addTaskOverlayContentRef = document.getElementById("addTaskOverlay");
    addTaskOverlayContentRef.classList.remove("d-none");
    addTaskOverlayContentRef.classList.add("edit-task-overlay");
    addTaskOverlayContentRef.innerHTML = "";
    addTaskOverlayContentRef.innerHTML = addTaskOverlayContent;
    document.getElementById("addTaskH1").innerHTML = "";
    document.getElementById("addTaskH1").innerHTML += getBoardCloseBtnTemplate();
    document.getElementById("addTaskForm").classList.add("custom-scrollbar");
}

/**
* This function opens the overviewOverlay for the clicked task, which gives an overview over the task-information
* 
* @param {number} indexTask - the index of the task in the tasks-array
*/
function openTaskOverview(indexTask) {
    openBoardBgOverlay();
    let overlayContentRef = document.getElementById("overviewOverlay");
    overlayContentRef.classList.remove("d-none");
    overlayContentRef.innerHTML = "";
    overlayContentRef.innerHTML += getTaskOverviewOverlayTemplate(indexTask);
    if (tasks[indexTask].priority == "") {
        document.getElementById("prioOverview" + indexTask).src = "";
    }
    fillTaskOverviewLists(indexTask);
}

/**
* This function is part of the openTaskOverview()-function fills the "overviewAssignedContacts" and "overviewSubtasks" for the contact in the edit-overlay
* 
* @param {number} indexTask - the index of the task in the tasks-array
*/
function fillTaskOverviewLists(indexTask) {
    if (tasks[indexTask].assignedTo !== undefined) {
        for (let indexAssignedContact = 0; indexAssignedContact < tasks[indexTask].assignedTo.length; indexAssignedContact++) {
            let indexContact = contacts.findIndex((element) => { return element.name === tasks[indexTask].assignedTo[indexAssignedContact].name })
            document.getElementById("overviewAssignedContacts" + indexTask).innerHTML += getBoardOverviewContactPB(indexContact);
            profileBadgeColor("overviewAssignedToListPB" + indexContact, indexContact)
        }
    }
    if (tasks[indexTask].subtasks !== undefined) {
        for (let indexSubtask = 0; indexSubtask < tasks[indexTask].subtasks.length; indexSubtask++) {
            let subtask = tasks[indexTask].subtasks[indexSubtask].subtask;
            document.getElementById("overviewSubtasks" + indexTask).innerHTML += getBoardOverviewSubtask(subtask, indexSubtask, indexTask)
        }
    }
}

/**
* This function is used to assign subtasks as completed
* 
* @param {number} indexSubtask - the index of the subtask in the subtasks-list
* @param {number} indexTask - the index of the task in the tasks-array
*/
async function completedSubtask(indexSubtask, indexTask) {
    let checkboxContentRef = document.getElementById("overviewCheckbox" + indexSubtask);
    checkboxContentRef.classList.toggle("checkbox-completed-false");
    checkboxContentRef.classList.toggle("checkbox-completed-true");
    await updateTaskSubtaskProgress(indexTask);
}

/**
* This function is used to assign subtasks as completed
* 
* @param {number} indexTask - the index of the task in the tasks-array
*/
async function updateTaskSubtaskProgress(indexTask) {
    let subtasksArr = [];
    for (let indexSubtask = 0; indexSubtask < tasks[indexTask].subtasks.length; indexSubtask++) {
        let checkboxContentRef = document.getElementById("overviewCheckbox" + indexSubtask);
        let completed = checkboxContentRef.className.replace("board-overview-checkbox checkbox-completed-", " ").trim();
        let subtask = document.getElementById("subtaskContent" + indexSubtask).innerHTML;
        subtasksArr.push({
            "completed": completed,
            "subtask": subtask
        })
    }
    putData("/tasks/" + tasks[indexTask].url + "/subtasks", {
        "subtasks": subtasksArr
    });
}

/**
 * This function fills in the inputs of the edit-task-overlay with the information of the corresponding task
 * 
 * @param {number} indexTask - the index of the task in the tasks-array
 */
function fillEditTaskInputs(indexTask) {
    clearTaskForm();
    document.getElementById("addTaskTitle").value = tasks[indexTask].title;
    document.getElementById("addTaskDescription").value = tasks[indexTask].description;
    document.getElementById("addTaskDate").value = tasks[indexTask].dueDate;
    if (tasks[indexTask].prio !== undefined) {
        document.getElementById("prio" + tasks[indexTask].priority).classList.add("prio" + tasks[indexTask].priority + "Clicked");
        document.getElementById("prio" + tasks[indexTask].priority).classList.add("clicked");
        document.getElementById("prio" + tasks[indexTask].priority + "Img").src = "/assets/icons/prio" + tasks[indexTask].priority + "-clicked.svg";
    }
    document.getElementById("addTaskCategory").placeholder = tasks[indexTask].category;
    fillEditTaskFormLists(indexTask);
}

/**
 * This function is part of the fillEditTaskInputs()-function fills the "addTaskAssignedToList" and "addTaskSubtaskList" for the contact in the edit-overlay
 * 
 * @param {number} indexTask - the index of the task in the tasks-array
 */
function fillEditTaskFormLists(indexTask) {
    if (tasks[indexTask].assignedTo !== undefined) {
        for (let indexAssignedContact = 0; indexAssignedContact < tasks[indexTask].assignedTo.length; indexAssignedContact++) {
            let indexContact = contacts.findIndex((element) => { return element.name === tasks[indexTask].assignedTo[indexAssignedContact].name })
            addAssignedContactToList(indexContact)
        }
    }
    if (tasks[indexTask].subtasks !== undefined) {
        for (let indexSubtask = 0; indexSubtask < tasks[indexTask].subtasks.length; indexSubtask++) {
            let subtask = tasks[indexTask].subtasks[indexSubtask].subtask;
            document.getElementById("addTaskSubtaskList").innerHTML += getAddTaskSubtaskTemplate(subtask, indexSubtask)
        }
    }
}

/**
 * This function lets the user save changes for a task, wich are used tot edit the data in firebase and the tasks-array
 * 
 * @param {number} indexTask - the index of the task in the tasks-array
 */
function saveEditTask(indexTask) {
    if (requirementsFullfilled()) {
        let taskTitle = document.getElementById("addTaskTitle").value;
        let taskDescription = document.getElementById("addTaskDescription").value;
        let taskAssignedTo = getAssignedContacts();
        let taskDueDate = document.getElementById("addTaskDate").value;
        let taskPriority = getTaskPriority();
        let taskCategory = checkTaskCategory();
        let taskSubtasks = getSubtasks();
        let taskProgress = getEditProgress();
        putData("/tasks/" + tasks[indexTask].url, {
            "title": taskTitle,
            "description": taskDescription,
            "assignedTo": taskAssignedTo,
            "dueDate": taskDueDate,
            "priority": taskPriority,
            "category": taskCategory,
            "subtasks": taskSubtasks,
            "progress": { "progress": taskProgress }
        });
        initAddTask();
        if (window.location.href !== "http://127.0.0.1:5500/html/add_task.html") {
            successfullMsg("taskSuccesfullyEdited");
            addOnclickToCreateBtn();
        }
    } else {
        checkFilledInput("addTaskTitle");
        checkFilledInput("addTaskDate");
        checkFilledInput("addTaskCategory")
    }
}

/**
 * This function is part of the saveEditTask()-function and returns the progress-category, where the edited task is in
 */
function getEditProgress() {
    let progressContentRef = document.getElementById("editTaskOk").classList[1];
    switch (progressContentRef) {
        default:
        case "progress-toDo":
            return "toDo"
        case "progress-inProgress":
            return "inProgress"
        case "progress-awaitFeedback":
            return "awaitFeedback"
    }
}

/**
 * This function sends the path of the task that should be deleted to firebase
 * 
 * @param {number} indexTask - the index of the task in the tasks-array
 */
async function deleteTask(indexTask) {
    await deleteData("/tasks/" + tasks[indexTask].url);
    successfullMsg("taskSuccesfullyDeleted");
    closeOverlays();
    initBoard();
}

/**
 * This function adds an onclick-event to the #addTaskCreate-Button for the #addTaskOverlay
 */
function addOnclickToCreateBtn() {
    let addTaskCreateBtn = document.getElementById("addTaskCreate");
    addTaskCreateBtn.addEventListener("click", closeOverlays());
    addTaskCreateBtn.addEventListener("click", initBoard());
}