/**
 * This template displays the users profile in the add-task-assigned-to-dropdown-menu
 *  
 * @param {number} indexUser - the index of the user in the contacts-array
 */
function getAddTaskDropdownListUserOption(indexUser) {
    return `<div onclick="contactAssigned('assignedToUserOption', ${indexUser})" id="assignedToUserOption${indexUser}" class="add-task-dropdown-option user-option">
                <div>
                    <div id="assignedToPB${indexUser}" class="profile-badge">${nameAbbreviation(indexUser)}</div>
                    <span>You</span>
                </div>
                <div id="assignedToCheckbox${indexUser}" class="add-task-assigned-to-checkbox"></div>
            </div>`
}

/** 
 * This template displays a contact in the add-task-assigned-to-dropdown-menu
 * 
 * @param {number} indexContact - the index of the contact in the contacts-array
 */
function getAddTaskDropdownListContacts(indexContact) {
    return `<div onclick="contactAssigned('assignedToOption', ${indexContact})" id="assignedToOption${indexContact}" class="add-task-dropdown-option">
                <div>
                    <div id="assignedToPB${indexContact}" class="profile-badge">${nameAbbreviation(indexContact)}</div>
                    <span>${contacts[indexContact].name}</span>
                </div>
                <div id="assignedToCheckbox${indexContact}" class="add-task-assigned-to-checkbox"></div>
            </div>`
}

/**
 * This template displays a contacts profile badge in the add-task-assigned-to-list
 * 
 * @param {number} indexContact - the index of the contact in the contacts-array
 */
function getAddTaskContactPB(indexContact) {
    return `<div id="addTaskAssignedToListPB${indexContact}" class="profile-badge assigned-contact">${nameAbbreviation(indexContact)}</div>`
}

/**
 * This template creates an entrie for the subtasks-list in the add-task-form
 * 
 * @param {string} subtask - the content of the currently added subtask
 * @param {number} indexSubtask - the index of the subtask in the subtasks-list
 */
function getAddTaskSubtaskTemplate(subtask, indexSubtask) {
    return `<div ondblclick="editSubtask(${indexSubtask})" id="subtask${indexSubtask}" class="subtask">
            ${getAddTaskSubtaskListElementTemplate(subtask, indexSubtask)}
            </div>`
}

/**
 * This template displays the content of a subtask in a list element.
 * 
 * @param {string} subtask - the content of the currently added/edited subtask
 * @param {number} indexSubtask - the index of the subtask in the subtasks-list
 */
function getAddTaskSubtaskListElementTemplate(subtask, indexSubtask) {
    return `<li class="subtask-element">${subtask}</li>
            <div class="subtask-list-icons">
                <img onclick="editSubtask(${indexSubtask})" class="subtask-icon" src="/assets/icons/add-task-subtask-edit.svg">
                <div class="subtask-list-icons-seperator"></div>
                <img onclick="deleteSubtask(${indexSubtask})" class="subtask-icon" src="/assets/icons/add-task-subtask-delete.svg">
            </div>`
}

/**
 * This template displays the content of a subtask in an input.
 * 
 * @param {string} subtask - the content of the currently clicked subtask
 * @param {number} indexSubtask - the index of the subtask in the subtasks-list
 */
function getAddTaskSubtaskEditTemplate(subtask, indexSubtask) {
    return `<input id="subtaskEditInput" value="${subtask}">
            <div class="subtask-edit-icons">
                <img onclick="deleteSubtask(${indexSubtask})" class="subtask-icon" src="/assets/icons/add-task-subtask-delete.svg">
                <div class="subtask-list-icons-seperator"></div>
                <img onclick="confirmEditSubtask(${indexSubtask})" class="subtask-icon" src="/assets/icons/add-task-subtask-submit.svg">
            </div>`
}

/**
 * This template includes a button to close board's overlays
 */
function getBoardCloseBtnTemplate() {
    return `<img onclick="closeOverlays()" src="/assets/icons/overlay-close.svg" class="overlay-close"></img>`
}

/**
 * This template creates a task-card with some information vor a task
 * 
 * @param {number} indexTask - the index of the task in the tasks-array
 */
function getBoardTaskTemplate(indexTask) {
    return `<div class="task-card" id="task${indexTask}" draggable="true" ondragstart="drag(event)" onclick="openTaskOverview(${indexTask})">
                <div class="task-badge category-${(tasks[indexTask].category.toLowerCase()).replace(' ', '-')}">${tasks[indexTask].category}</div>
                <div class="task-title">${tasks[indexTask].title}</div>
                <div class="task-description">${tasks[indexTask].description}</div>
                <div id="boardProgressSubtask${indexTask}" class="task-progress">
                <div class="progress-bar">
                    <div class="progress-bar-fill" style="width:${progressSubtasksPercentage(indexTask)}%;"></div>
                    </div>
                    <span>${countCompletedSubtasks(indexTask)}/${countTotalSubtasks(indexTask)} Subtasks</span>
                </div>
                <div class="assigned-contacts-and-priority">
                    <div id="assignedContacts${indexTask}" class="task-assignees"></div>
                    <img id="prio${indexTask}" src="/assets/icons/prio${tasks[indexTask].priority}.svg">
                </div>
            </div>`
}

/**
 * This template displays a contacts profile badge on the board's task-card
 * 
 * @param {number} indexContact - the index of the contact in the contacts-array
 */
function getBoardContactPB(indexContact) {
    return `<div id="boardAssignedToListPB${indexContact}" class="profile-badge profile-badge-small">${nameAbbreviation(indexContact)}</div>`
}

/**
 * This template displays a task in a larger view showing all its necessary information
 * 
 * @param {number} indexTask - the index of the task in the tasks-array
 */
function getTaskOverviewOverlayTemplate(indexTask) {
    return `<div class="overview-header">
                <div class="overview-task-badge category-${(tasks[indexTask].category.toLowerCase()).replace(' ', '-')}">${tasks[indexTask].category}</div>
                ${getBoardCloseBtnTemplate()}
            </div>
            <h1>${tasks[indexTask].title}</h1>
            <div class="overview-task-description">${tasks[indexTask].description}</div>
            <div class="overview-info">
                <span>Due Date:</span>
                <p>${tasks[indexTask].dueDate}</p>
            </div>
            <div class="overview-info">
                <span>Priority:</span>
                <p>${tasks[indexTask].priority}<img id="prioOverview${indexTask}" src="/assets/icons/prio${tasks[indexTask].priority}.svg"></p>
            </div>
            <div class="overview-info">Assigned To:</div>
            <div id="overviewAssignedContacts${indexTask}" class="overview-contacts">
            </div>
            <div class="overview-info">Subtasks:</div>
            <div id="overviewSubtasks${indexTask}" class="overview-subtasks"></div>
            <div class="overview-btns">
                <button disable onclick="deleteTask(${indexTask})">
                    <div class="overview-task-delete"></div> Delete
                </button>
                <div class="overview-btns-seperator"></div>
                <button onclick="openEditTaskOverlay('${tasks[indexTask].progress.progress}', ${indexTask})">
                    <div class="overview-task-edit"></div> Edit
                </button>
            </div>`
}

/**
 * This template displays a contacts profile badge on the board's task-overview-overlay
 * 
 * @param {number} indexContact - the index of the contact in the contacts-array
 */
function getBoardOverviewContactPB(indexContact) {
    return `<div id="overviewContact${indexContact}" class="overview-contact-assigned">
                <div id="overviewAssignedToListPB${indexContact}" class="profile-badge">${nameAbbreviation(indexContact)}</div>
                <p>${contacts[indexContact].name}</p>
            </div>`
}

/**
 * This template displays a contacts profile badge on the board's task-overview-overlay
 * 
 * @param {string} subtask - the content of the current subtask
 * @param {number} indexSubtask - the index of the subtask in the subtasks-list
 * @param {number} indexTask - the index of the task in the tasks-array
 */
function getBoardOverviewSubtask(subtask, indexSubtask, indexTask) {
    return `<div onclick="completedSubtask(${indexSubtask}, ${indexTask})" id="overviewAssignedSubtask" class="overview-subtasks-assigned">
                <div id="overviewCheckbox${indexSubtask}" class="board-overview-checkbox checkbox-completed-${tasks[indexTask].subtasks[indexSubtask].completed}"></div>
                <p id="subtaskContent${indexSubtask}">${subtask}</p>
            </div>`
}

/**
 * This template creates the necessary button for the editTask-overlay for the board
 * 
 * @param {number} indexTask - the index of the task in the tasks-array
 */
function getBoardEditTaskBtnTemplate(indexTask) {
    return `<button id="editTaskOk" onclick="saveEditTask(${indexTask}); return false"
                class="confirm-btn">
                Ok
                <img src='/assets/icons/create-btn.svg'>
            </button>`
}

/**
 * This template creates an address book entrie for a contact
 * 
 * @param {number} indexContact - the index of the contact in the contacts-array
 */
function getAddressbookContactTemplate(indexContact) {
    return `<div id="id${indexContact}" class="contact" onclick="contactClicked(${indexContact})">
                <div id="profileBadge${indexContact}" class="contact-profile-badge">${nameAbbreviation(indexContact)}</div>
                <p>
                    <span id="idName${indexContact}" class="contact-name">${contacts[indexContact].name}</span>
                    <span class="contact-mail">${contacts[indexContact].mail}</span>
                </p>
            </div>`
}

/**
 * This template creates an overlay for the focused-contact-area with the current contacts information
 * 
 * @param {number} indexContact - the index of the contact in the contacts-array
 */
function getFocusedContactTemplate(indexContact) {
    return `<div class="focused-profile-overview">
                <div id="focusedProfileBadge" class="focused-profile-badge">${nameAbbreviation(indexContact)}</div>
                    <div class="focused-profile-account">
                        <span id="idFocusedName${indexContact}" class="focused-contact-name">${contacts[indexContact].name}</span>
                        <div>
                            <button onclick="openContactsOverlay(), adjustOverlayToEdit(${indexContact})" class="focused-contact-btns">
                             <div id="contactsEditIcon"></div>
                                <span>Edit</span>
                            </button>
                            <button id="deleteBtnContacts" onclick="deleteContact(${indexContact})" class="focused-contact-btns">
                                <div id="contactsDeleteIcon"></div>
                                <span>Delete</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="focused-profile-information">
                <p>Contact Information</p>
                <div>
                    <span class="contact-opportunity">Email</span>
                    <span class="contact-mail">${contacts[indexContact].mail}</span>
                </div>
                <div>
                    <span class="contact-opportunity">Phone</span>
                    <span>${contacts[indexContact].phone}</span>
                </div>
            </div>`
}

/**
 * This template creates the two necessary buttons for the contacts-overlay 'Add contact'
 */
function getContactsOverlayAddBtnsTemplate() {
    return `<button onclick="clearContactForm(); return false" class="reject-btn" id="contactsOverlayCancel">
                Cancel
                <div class="reject-img"></div>
            </button>
            <button id="contactsOverlayCreate" onclick="addContact(); return false"
                class="confirm-btn" >
                Create Contact
                <img src="/assets/icons/create-btn.svg">
            </button>`
}

/**
 * This template creates the two necessary buttons for the contacts-overlay 'Edit contact'
 * 
 * @param {number} indexContact - the index of the contact in the contacts-array
 */
function getContactsOverlayEditBtnsTemplate(indexContact) {
    return `<button onclick="clearContactForm(); return false" class="reject-btn" id="contactsOverlayDelete">
                Delete
                <div class="reject-img"></div>
            </button>
            <button id="contactsOverlaySave" onclick="saveEditContact(${indexContact}); return false"
                class="confirm-btn">
                Save
                <img src='/assets/icons/create-btn.svg'>
            </button>`
}

/**
 * This template creates the two necessary buttons for the "btnsMenuMobile" to edit or delete a contact
 * 
 * @param {number} indexContact - the index of the contact in the contacts-array
 */
function getbtnsMenuMobileTemplate(indexContact) {
    return `<button onclick="openContactsOverlay(), adjustOverlayToEdit(${indexContact})" class="focused-contact-btns">
                <div id="contactsEditIcon"></div>
                <span>Edit</span>
            </button>
            <button id="deleteBtnContacts" onclick="deleteContact(${indexContact})" class="focused-contact-btns">
                <div id="contactsDeleteIcon"></div>
                <span>Delete</span>
            </button>`
}

/**
 * This template fills the submenu with the necessary links
 */
function getSubmenuTemplate() {
    return `<p><a href="../html/legal_notice.html">Legal Notice</a></p>
            <p><a href="../html/privacy_policy.html">Privacy Policy</a></p>
            <p><a href="../html/index.html">Logout</a></p>`
}