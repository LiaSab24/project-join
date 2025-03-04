/**
 * This template creates an address book entrie for a contact
 * 
 * @param {number} indexContact - the index of the contact in the contacts-array
 */
function getAddressbookContactTemplate(indexContact) {
    return `<div id="id${indexContact}" class="contact" onclick="contactClicked(${indexContact})">
                <div id="profileBadge${indexContact}" class="contact-profile-badge">${nameAbbreviation(indexContact)}</div>
                <p>
                    <span class="contact-name">${contacts[indexContact].name}</span>
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
                        <span class="focused-contact-name">${contacts[indexContact].name}</span>
                        <div>
                            <button onclick="toggleContactsOverlay(), adjustOverlayToEdit(${indexContact})" class="focused-contact-btns">
                                <div id="contactsEditIcon"></div>
                                <span>Edit</span>
                            </button>
                            <button onclick="deleteContact()" class="focused-contact-btns">
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
            <button id="contactsOverlayCreate" onclick="addContact()"
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
 * This template creates an entrie for the subtasks-list in the add-task-form
 * 
 * @param {string} subtask - the content of the currently added subtask
 * @param {number} indexSubtask - the index of the subtask in the subtasks-list
 */
function getAddTaskSubtaskTemplate(subtask, indexSubtask) {
    return `<div id="subtask${indexSubtask}" class="subtask">
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
 * This template displays the users profile in the add-task-assigned-to-dropdown-menu
 * 
 * @param {number} indexUser - the index of the user in the contacts-array
 */
function getAddTaskDropdownListUserOption(indexUser) {
    return `<div onclick="contactAssigned('assignedToUserOption', ${indexUser})" id="assignedToUserOption${indexUser}" class="add-task-dropdown-option">
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
 * This template displays a contacts profile badge on the board's task-card
 * 
 * @param {number} indexContact - the index of the contact in the contacts-array
 */
function getBoardContactPB(indexContact) {
    return `<div id="boardAssignedToListPB${indexContact}" class="profile-badge profile-badge-small">${nameAbbreviation(indexContact)}</div>`
}

function getBoardTaskTemplate(indexTask) {
    return `<div class="task-card" id="task${indexTask}" draggable="true" ondragstart="drag(event)" onclick="toggleUserFeedback()">
          <div class="task-badge category-${(tasks[indexTask].category.toLowerCase()).replace(' ','-')}">${tasks[indexTask].category}</div>
          <div class="task-title">${tasks[indexTask].title}</div>
          <div class="task-description">${tasks[indexTask].description}</div>
          <div id="boardProgressSubtask${indexTask}" class="task-progress">
            <div class="progress-bar">
              <div class="progress-bar-fill" style="width:${progressSubtasksPercentage(indexTask)}%;"></div>
            </div>
            <span>${countCompletedSubtasks(indexTask)}/${countTotalSubtasks(indexTask)} </span>
          </div>
          <div class="assigned-contacts-and-priority">
            <div id="assignedContacts${indexTask}" class="task-assignees"></div>
            <div><img src="/assets/icons/prio${tasks[indexTask].priority}.svg"></div>
          </div>
        </div>`
}

function getFeedbackOverlayTemplate() {
    return `
        <div class="feedback-overlay" id="feedbackOverlay">
        <section id="userFeedbackOverlay" class="feedback-hidden">
            <div class="feedback-header">
                <span class="feedback-badge">User Story</span>
                <button class="close-btn" onclick="closeOverlay(event)">
                    <img src="/assets/icons/close.png" alt="Close-Icon">
                </button>
            </div>
            <h1 class="feedback-title">Kochwelt Page & Recipe Recommender</h1>
            <p class="feedback-info">Build start page with recipe recommendation.</p>
            <p class="feedback-info">Due Date: 10/05/2023</p>
            <p class="feedback-info">Priority: <span class="feedback-priority">Medium 
                <img src="/assets/icons/Prio media.png" style="padding: 0 4px;">
            </span></p>
            
            <p class="feedback-info">Assigned To:</p>
            <div class="feedback-users">
                <div class="feedback-user">
                    <div class="feedback-user-badge" style="background: green;">EM</div>
                    <span class="feedback-user-name">Emmanuel Mauer</span>
                </div>
                <div class="feedback-user">
                    <div class="feedback-user-badge" style="background: purple;">MB</div>
                    <span class="feedback-user-name">Marcel Bauer</span>
                </div>
                <div class="feedback-user">
                    <div class="feedback-user-badge" style="background: blue;">AM</div>
                    <span class="feedback-user-name">Anton Mayer</span>
                </div>
            </div>
            <p class="feedback-info">Subtasks:</p>
            <div class="feedback-subtasks">
                <div class="feedback-subtask-item"><input type="checkbox"> Implement Recipe Recommendation</div>
                <div class="feedback-subtask-item"><input type="checkbox"> 
                    Start Page Layout
                </div>
            </div>
            <div class="feedback-actions">
                <button class="feedback-delete-btn" onclick="deleteTask(event)">
                    <img src="/assets/icons/delete.png" alt="Delete-Icon"> Delete
                </button>
                <div class="divider"></div>
                <button class="feedback-edit-btn" id="editTaskCreate" onclick="boardEditTask(3)">
                    <img src="/assets/icons/edit.png" alt="Edit-Icon"> Edit
                </button>
            </div>
        </section>
        <section id="editTaskOverlay" class="d-none"></section>
        </div>
    `;
}

function getFeedbackButtonTemplate() {
    return `
        <div class="feedback-task-added-overlay">
            Task added to board
            <img src="/assets/icons/Icons.png" alt="Board Icon">
        </div>
    `;
}