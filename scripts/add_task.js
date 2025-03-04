/**
 * This function is the inital function, when add_task.html is loading and executes the init()-function and furher necessary add-task-functions
 */
async function initAddTask() {
    await init();
    clearTaskForm()
    fillAssignedToDropDownMenu();
}

/**
 * This function clears and resets the add-task-form (input-values, drop-down-menus and buttons)
 */
function clearTaskForm() {
    document.getElementById("addTaskTitle").value = "";
    document.getElementById("addTaskDescription").value = "";
    document.getElementById("addTaskAssignedTo").value = "";
    clearAssignedTo();
    document.getElementById("addTaskDate").value = "";
    clearPriorityBtns();
    document.getElementById("addTaskCategory").placeholder = "Select task category";
    document.getElementById("addTaskSubtask").value = "";
    document.getElementById("addTaskSubtaskList").innerHTML = "";
}

/**
 * This function is part of the clearTaskForm-function and resets the select-input and list for the assigned contacts
 */
function clearAssignedTo() {
    document.getElementById("addTaskDropdownContacts").classList.add("d-none");
    document.getElementById("addTaskDropdownContacts").innerHTML = "";
    document.getElementById("addTaskAssignedToList").innerHTML = "";
}

/**
 * This function is part of the clearTaskForm-function and resets the priority-buttons
 */
function clearPriorityBtns() {
    document.getElementById("prioUrgent").classList.remove("prioUrgentClicked", "clicked");
    document.getElementById("prioUrgentImg").src = "/assets/icons/prioUrgent.svg";
    document.getElementById("prioMedium").classList.remove("prioMediumClicked", "clicked");
    document.getElementById("prioMediumImg").src = "/assets/icons/prioMedium.svg";
    document.getElementById("prioLow").classList.remove("prioLowClicked", "clicked");
    document.getElementById("prioLowImg").src = "/assets/icons/prioLow.svg";
}

/**
 * This function adds the invisible overlay behind the dropdown-menu for "assigned to" and "category"
 * This way, the user is able to close those menues by clicking outside the menu
 */
function addAddTaskOverlay() {
    let overlayBgContentRef = document.getElementById("addTaskOverlayBg");
    overlayBgContentRef.classList.remove("d-none");
}

/**
 * This function removes the invisible overlay behind the dropdown-menu for "assigned to" and "category"
 * Furthermore it hides both dropdown-menus
 */
function removeAddTaskOverlay() {
    document.getElementById("addTaskOverlayBg").classList.add("d-none");
    document.getElementById('addTaskDropdownContacts').classList.add("d-none");
    document.getElementById('addTaskAssignedTo').classList.remove("add-task-current-select");
    document.getElementById('addTaskDropdownCategories').classList.add("d-none");
    document.getElementById('addTaskCategory').classList.remove("add-task-current-select");
    let subtasksNumber = document.querySelectorAll(".subtask");
    for (let indexSubtask = 0; indexSubtask < subtasksNumber.length; indexSubtask++) {
        confirmEditSubtask(indexSubtask)
    }
}

/**
 * This function toggles the visibility of the dropdown-menu for "assigned to" and "category"
 * 
 * @param {string} contentRef - the id of the dropdown-menu, that is clicked
 * @param {string} contentRef - the id of the dropdown-menu, that is clicked
 */
function toggleAddTaskToDropDownMenu(inputContentRef, DropdownContentRef) {
    addAddTaskOverlay();
    document.getElementById(inputContentRef).classList.add("add-task-current-select");
    document.getElementById(DropdownContentRef).classList.remove("d-none");
}

/**
 * This function fills the assigned-to-dropdown-menu with the contacts from the contact-array(template)
 * 
 * @param {number} indexContact - the index of the contact in the contacts-array
 */
function fillAssignedToDropDownMenu() {
    let assignedToSelect = document.getElementById("addTaskDropdownContacts");
    assignedToSelect.innerHTML += getAddTaskDropdownListUserOption(indexUser);
    profileBadgeColor("assignedToPB" + indexUser, indexUser);
    for (let indexContact = 0; indexContact < contacts.length; indexContact++) {
        assignedToSelect.innerHTML += getAddTaskDropdownListContacts(indexContact);
        profileBadgeColor("assignedToPB" + indexContact, indexContact);
    }
    hideAllUsers("assignedToOption");
}

/**
 * This function gives the user the ability to see, which contacts are currently assigned
 * 
 * @param {string} contentRef - the id of the assigned contact
 * @param {number} indexContact - the index of the contact in the contacts-array
 */
function contactAssigned(contentRef, indexContact) {
    let assignedContact = document.getElementById(contentRef + indexContact);
    assignedContact.classList.toggle("option-contact-assigned");
    let assignedToCheckbox = document.getElementById("assignedToCheckbox" + indexContact);
    assignedToCheckbox.classList.toggle("checkbox-contact-assigned");
    addAssignedContactToList(indexContact);
}

/**
 * This function removes the assigned contact profile badge from the assigned-contacts-list, if it is in the list.
 * Otherwise it adds the assigned contact profile badge to the list.
 * 
 * @param {number} indexContact - the index of the contact in the contacts-array
 */
function addAssignedContactToList(indexContact) {
    let assignedContactsList = document.getElementById("addTaskAssignedToList");
    let assignedContact = document.getElementById("addTaskAssignedToListPB" + indexContact);
    if (assignedContact) {
        assignedContact.remove();
    } else {
        assignedContactsList.innerHTML += getAddTaskContactPB(indexContact);
        profileBadgeColor("addTaskAssignedToListPB" + indexContact, indexContact);
    }
}

/**
 * This function is used to show user-feedback (color and image) for the clicked priority-button and adds the class "clicked" for the submission later
 * 
 * @param {string} priority - This is the chosen priority for the task (urgent, medium, low)
 */
function priorityBtnBg(priority) {
    clearPriorityBtns();
    let clickedPrioBtn = document.getElementById(priority);
    let clickedPrioBtnImg = document.getElementById(priority + "Img");
    clickedPrioBtn.classList.add(priority + "Clicked");
    clickedPrioBtn.classList.add("clicked");
    clickedPrioBtnImg.src = "/assets/icons/" + priority + "-clicked.svg";
}

/**
 * This function shows the currently clicked task-category
 * 
 * @param {string} category - This is the chosen category for the task
 */
function selectTaskCategory(category) {
    let categoryInput = document.getElementById("addTaskCategory");
    categoryInput.placeholder = category;
    toggleAddTaskToDropDownMenu('addTaskCategory', 'addTaskDropdownCategories');
    removeAddTaskOverlay();
}

/**
 * This function changes the icons of the subtask-input, depending on whether the input is focused or not
 * The timeout is used to be able to execute the buttons functions on click, before they disappear
 */
function changeSubtaskIcons() {
    let subtaskIconAdd = document.getElementById("subtaskIconAdd");
    let subtaskIconsFocus = document.getElementById("subtaskIconsFocus");
    setTimeout(() => {
        subtaskIconAdd.classList.toggle("d-none");
        subtaskIconsFocus.classList.toggle("d-none");
    }, 100);
}

/**
 * This function clears the input-value of the subtask-input
 */
function clearSubtasksInput() {
    const subtasksInputRef = document.getElementById("addTaskSubtask");
    subtasksInputRef.value = "";
}

/**sd
 * This function reads out the input-value from the subtask-input and adds this subtask in the list below (template)
 */
function addSubtaskToList() {
    const subtasksInputContentRef = document.getElementById("addTaskSubtask");
    let subtask = subtasksInputContentRef.value.trim();
    const subtasksListContentRef = document.getElementById("addTaskSubtaskList");
    let indexSubtask = document.querySelectorAll(".subtask").length;
    if (subtask !== "") {
        subtasksListContentRef.innerHTML += getAddTaskSubtaskTemplate(subtask, indexSubtask);
        clearSubtasksInput();
    }
}

/**
 * This function replaces the subtask-list element with an input (template).
 * This way the user is able to edit the subtask-content.
 * 
 * @param {number} indexSubtask - the index of the subtask in the subtasks-list
 */
function editSubtask(indexSubtask) {
    addAddTaskOverlay();
    let subtaskContentRef = document.getElementById("subtask" + indexSubtask);
    let subtask = subtaskContentRef.innerText;
    subtaskContentRef.classList.add("subtask-edit");
    subtaskContentRef.innerHTML = getAddTaskSubtaskEditTemplate(subtask, indexSubtask);
}

/**
 * This function deletes the the chosen subtask from the subtasks-list
 * 
* @param {number} indexSubtask - the index of the subtask in the subtasks-list
 */
function deleteSubtask(indexSubtask) {
    let subtaskContentRef = document.getElementById("subtask" + indexSubtask);
    subtaskContentRef.remove();
}

/**
 * This function replaces the subtask-edit element with an list element (template) and includes the edited input-value. 
 * 
 * @param {number} indexSubtask - the index of the subtask in the subtasks-list
 */
function confirmEditSubtask(indexSubtask) {
    let subtaskContentRef = document.getElementById("subtask" + indexSubtask);
    let subtask = document.getElementById("subtaskEditInput").value;
    console.log(subtask)
    if (subtask !== "") {
        subtaskContentRef.classList.remove("subtask-edit");
        subtaskContentRef.innerHTML = getAddTaskSubtaskListElementTemplate(subtask, indexSubtask);
    }
}

/**
 * This function reads out the data of the add-task-form and adds the task to tasks-array and firebase
 */
function addTask() {
    let taskTitle = document.getElementById("addTaskTitle").value;
    let taskDescription = document.getElementById("addTaskDescription").value;
    let taskAssignedTo = getAssignedContacts();
    let taskDueDate = document.getElementById("addTaskDate").value;
    let taskPriority = document.querySelector(".clicked").innerText;
    let taskCategory = checkTaskCategory();
    let taskSubtasks = getSubtasks();
    let taskProgress = getProgress();
    postData("/tasks/", {
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
}

/**
 * This function is part of the addTask()-function and if a task-category is selected and returns it
 */
function checkTaskCategory() {
    let taskCategory = document.getElementById("addTaskCategory").placeholder;
    if (taskCategory !== "Select task category") {
        return taskCategory;
    }
}

/**
 * This function is part of the addTask()-function and creates and returns an array with all the assigned contacts in the assigned-contacts-list
 */
function getAssignedContacts() {
    let assignedContactsList = document.querySelectorAll(".assigned-contact");
    let assignedContactsIndexArray = [];
    let assignedContactsArray = [];
    for (let indexAssignedContact = 0; indexAssignedContact < assignedContactsList.length; indexAssignedContact++) {
        let assignedContactId = assignedContactsList[indexAssignedContact].id.replace("addTaskAssignedToListPB", " ").trim();
        assignedContactsIndexArray.push(assignedContactId);
        if (assignedContactId == -1) {
            assignedContactsArray.push({
                "color": "#D9D9D9",
                "mail": "",
                "name": "",
                "phone": ""
            });
        } else {
            assignedContactsArray.push(contacts[assignedContactsIndexArray[indexAssignedContact]]);
        }
    }
    return assignedContactsArray;
}

/**
 * This function is part of the addTask()-function and creates and returns an array with all the subtasks in the subtask-list
 */
function getSubtasks() {
    let subtasks = document.querySelectorAll(".subtask-element");
    let subtasksArray = [];
    for (let indexSubtask = 0; indexSubtask < subtasks.length; indexSubtask++) {
        subtasksArray.push({
            "subtask": subtasks[indexSubtask].innerHTML,
            "completed": false
        })
    }
    return subtasksArray;
}

/**
 * This function is part of the addTask()-function returns the progress-category, where the new task should be added
 */
function getProgress() {
    let progressContentRef = document.getElementById("addTaskCreate").classList[1];
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