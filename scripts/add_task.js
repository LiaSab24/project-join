/**
 * This function is the inital function, when add_task.html is loading and executes the init()-function and furher necessary add-task-functions
 */
async function initAddTask() {
    await init();
    clearTaskForm()
    //fixDateInput();
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
    document.getElementById("addTaskCategory").value = "default";
    document.getElementById("addTaskSubtask").value = "";
    document.getElementById("addTaskSubtaskList").innerHTML = "";
}

/**
 * This function is part of the clearTaskForm-function and resets the select-input and list for the assigned contacts
 */
function clearAssignedTo() {
    document.getElementById("addTaskDropdownContacts").classList.add("d-none");
    document.getElementById("addTaskDropdownContacts").innerHTML = "";
    document.getElementById("addTaskAssignedToList").innerHTML= "";
}

/**
 * This function is part of the clearTaskForm-function and resets the priority-buttons
 */
function clearPriorityBtns() {
    document.getElementById("prioUrgent").classList.remove("prioUrgentClicked", "clicked");
    document.getElementById("prioUrgentImg").src = "/assets/icons/add-task-prioUrgent.svg";
    document.getElementById("prioMedium").classList.remove("prioMediumClicked", "clicked");
    document.getElementById("prioMediumImg").src = "/assets/icons/add-task-prioMedium.svg";
    document.getElementById("prioLow").classList.remove("prioLowClicked", "clicked");
    document.getElementById("prioLowImg").src = "/assets/icons/add-task-prioLow.svg";
}



// function fixDateInput() {
//     const dateInput = document.querySelector("#addTaskDate");
//     if (dateInput && !dateInput.hasAttribute("data-flatpickr-initialized")) {
//         flatpickr(dateInput, {
//             dateFormat: "d/m/y", // Korrektes Format (2-stelliges Jahr)
//             allowInput: true, // Benutzer kann auch tippen
//             clickOpens: true, // Popup öffnet sich automatisch beim Klick
//             defaultDate: null, // Kein voreingestelltes Datum
//         });
//         dateInput.setAttribute("data-flatpickr-initialized", "true");
//     }
// }



/**
 * This function fills the assigned-to-dropdown-menu with the contacts from the contact-array(template)
 * 
 * @param {number} indexContact - the index of the contact in the contacts-array
 */
function fillAssignedToDropDownMenu() {
    let assignedToSelect = document.getElementById("addTaskDropdownContacts");
    let indexUser = contacts.length;
    assignedToSelect.innerHTML = getAddTaskDropdownListUserOption(indexUser);
    document.getElementById("assignedToPB" + indexUser,).style.backgroundColor = "#D1D1D1";
    for (let indexContact = 0; indexContact < contacts.length; indexContact++) {
        assignedToSelect.innerHTML += getAddTaskDropdownListContacts(indexContact);
        profileBadgeColor("assignedToPB" + indexContact, indexContact);
    }
}

/**
 * This function toggles the visibility of the assigned-to-dropdown-menu
 * 
 * @param {number} indexContact - the index of the contact in the contacts-array
 */
function assignedToDropDownMenu() {
    let assignedToSelect = document.getElementById("addTaskDropdownContacts");
    assignedToSelect.classList.toggle("d-none");
}

/**
 * This function gives the user the ability to see, which contacts are currently assigned
 * 
 * @param {number} indexContact - the index of the contact in the contacts-array
 */
function contactAssigned(indexContact) {
    let assignedContact = document.getElementById("assignedToOption" + indexContact);
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
    let assignedContact = document.getElementById("assignedToListPB" + indexContact);
    if (assignedContact) {
        assignedContact.remove();
    } else {
        assignedContactsList.innerHTML += getAddTaskContactPB(indexContact);
        profileBadgeColor("assignedToListPB" + indexContact, indexContact);
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
    clickedPrioBtnImg.src = "/assets/icons/add-task-" + priority + "-clicked.svg";
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
    let subtaskContentRef = document.getElementById("subtask" + indexSubtask);
    // console.log(subtaskContentRef);
    let subtask = subtaskContentRef.innerText;
    // console.log(subtask);
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
    let taskCategory = document.getElementById("addTaskCategory").value;
    let taskSubtasks = getSubtasks();
    postData("/tasks/", {
        "title": taskTitle,
        "description": taskDescription,
        "assignedTo": taskAssignedTo,
        "dueDate": taskDueDate,
        "priority": taskPriority,
        "category": taskCategory,
        "subtasks": taskSubtasks
    });
    clearTaskForm();
}

/**
 * This function is part of the addTask()-function and creates and returns an array with all the assigned contacts in the assigned-contacts-list
 */
function getAssignedContacts() {
    let assignedContactsList = document.querySelectorAll(".assigned-element");
    let assignedContactsIndexArray = [];
    let assignedContactsArray = [];
    for (let indexAssignedContact = 0; indexAssignedContact < assignedContactsList.length; indexAssignedContact++) {
        assignedContactsIndexArray.push(assignedContactsList[indexAssignedContact].id.slice(-1));
        assignedContactsArray.push(contacts[assignedContactsIndexArray[indexAssignedContact]]);
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
        subtasksArray.push(subtasks[indexSubtask].innerHTML)
    }
    return subtasksArray;
}