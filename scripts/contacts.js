const colors = [
    "#ff7a00", // Vivid Orange
    "#ff5eb3", // Deep Pink
    "#6e52ff", // Lavender Blue
    "#9327ff", // Violet
    "#00bee8", // Sky Blue
    "#1fd7c1", // Turquoise
    "#ff745e", // Coral
    "#ffa335", // Amber
    "#fc71ff", // Fuchsia
    "#ffc701", // Golden Yellow
    "#0038ff", // Royal Blue
    "#c3ff2b", // Lime Green
    "#ffe625", // Sun Yellow
    "#ff4646", // Red
    "#ffbb2b" // Goldenrod
];

let BASEURL = "https://join-424-project-default-rtdb.europe-west1.firebasedatabase.app/";
let availableColors = [...colors];
let contactColors = {};

async function initContacts() {
    await init();
    renderAddressBook();
    changeProfileBadgeBackground();
}

function renderAddressBook() {
    const addressBookContentRef = document.getElementsByClassName("contactsLetter");
    for (let indexLetter = 0; indexLetter < addressBookContentRef.length; indexLetter++) {
        addressBookContentRef[indexLetter].innerHTML = "";
    }
    renderContacts();
    hideNotUsedLetters(addressBookContentRef);
}

function renderContacts() {
    for (let indexContact = 0; indexContact < contacts.length; indexContact++) {
        let letter = contacts[indexContact].name.charAt(0);
        //console.log(letter);
        document.getElementById("contactsLetter" + letter).innerHTML += getAddressbookContactTemplate(indexContact);
    }
}

function hideNotUsedLetters(addressBookContentRef) {
    const letterContentRef = document.getElementsByClassName("address-book-letter");
    for (let indexLetter = 0; indexLetter < letterContentRef.length; indexLetter++) {
        //console.log(letterContentRef[indexLetter]);
        if (addressBookContentRef[indexLetter].innerHTML == "") {
        letterContentRef[indexLetter].classList.add("d-none");
        }
    }
}

function nameAbbreviation(indexContact) {
    let contactFullName = contacts[indexContact].name.toUpperCase();
    let contactFirstName = contactFullName.substring(0, contactFullName.indexOf(' '));
    let contactLastName = contactFullName.substring(contactFullName.indexOf(' ') + 1);
    let firstLetter = contactFirstName.charAt(0);
    let secondLetter = contactLastName.charAt(0);
    return firstLetter + secondLetter
}

// Funktion zum zufälligen Auswählen einer Farbe aus den verfügbaren Farben
function changeProfileBadgeBackground() {
    document.querySelectorAll('.contact-profile-badge').forEach(badge => {
        let contactId = badge.parentElement.id;
        badge.style.backgroundColor = contactColors[contactId] || assignRandomColor(contactId);
    });
}

function assignRandomColor(contactId) {
    if (availableColors.length === 0) availableColors = [...colors];

    let randomIndex = Math.floor(Math.random() * availableColors.length);
    let assignedColor = availableColors.splice(randomIndex, 1)[0];

    contactColors[contactId] = assignedColor;
    return assignedColor;
}

function contactClicked(indexContact) {
    clearActiveContacts();
    highlightContact(indexContact);
    updateFocusedContact(indexContact);
}

function clearActiveContacts() {
    document.querySelectorAll('.contact').forEach(contact => contact.classList.remove("contact-clicked"));
}

function highlightContact(indexContact) {
    document.getElementById(indexContact).classList.add("contact-clicked");
}

function updateFocusedContact(indexContact) {
    let focusedContactContent = document.getElementById("focusedContactInformation");
    focusedContactContent.innerHTML = "";

    setTimeout(() => {
        focusedContactContent.innerHTML = getFocusedContactTemplate(indexContact);
        applyFocusedProfileColor(indexContact);
    }, 400);
}

function applyFocusedProfileColor(indexContact) {
    let focusedBadge = document.querySelector('.focused-profile-badge');
    if (focusedBadge) focusedBadge.style.backgroundColor = contactColors[indexContact] || "#ccc";
}

function deleteContact() {
    //delete contact from firebase
    //remove contact from addressbook
    //clear focused contact
}

function editContact() {
    //change data in firebase
    //change contact in addressbook
    //closeOverlay
}

function toggleOverlay() {
    let overlayBgContentRef = document.getElementById("overlayBg");
    let overlayContactContentRef = document.getElementById("overlayContact");
    overlayContactContentRef.classList.toggle("animation-open-overlay");
    overlayContactContentRef.classList.toggle("animation-close-overlay");
    setTimeout(function () {
        overlayContactContentRef.classList.toggle("d-none");
        overlayBgContentRef.classList.toggle("d-none");
    }, 300);
    //change content of overlay, depending of clicked button (add or edit)
}

function adjustOverlayToEdit(id) {
    let titleContentRef = document.getElementById("overlayTitleH1");
    let titleAdditionContentRef = document.getElementById("overlayTitleP");
    let inputNameContentRef = document.getElementById("addContactName");
    let inputMailContentRef = document.getElementById("addContactMail");
    let inputPhoneContentRef = document.getElementById("addContactPhone");
    let rejectBtnContenRef = document.getElementById("contactsOverlayCancel");
    console.log(rejectBtnContenRef);
    let confirmBtnContenRef = document.getElementById("contactsOverlayCreate");
    titleContentRef.innerHTML = "Edit contact";
    titleAdditionContentRef.innerHTML = "";
    inputNameContentRef.value = contacts[id].name;
    inputMailContentRef.value = contacts[id].mail;
    inputPhoneContentRef.value = contacts[id].phone;
    rejectBtnContenRef.innerHTML = "Delete";
    //rejectBtnContenRef.onclick = deleteContact();        
    confirmBtnContenRef.innerHTML = "Save" + "<img src='/assets/icons/create-btn.svg'></img>";
    //confirmBtnContenRef.onclick = editContact(); 
    console.log(rejectBtnContenRef);
}

function contactSuccesfullyCreated() {
    let successAnimation = document.getElementById("contactSuccesfullyCreated");
    successAnimation.style.animationName = "contactSuccesfullyCreated";
    successAnimation.style.animationDuration = "1600ms";
    setTimeout(function () {
        successAnimation.style.animationName = "";
        successAnimation.style.animationDuration = "";
    }, 1600);
}

// TEST-DATEN
function addTestContact() {
    let testContactName = document.getElementById("testcontactname").innerHTML;
    let testContactMail = document.getElementById("testcontactmail").innerHTML;
    let testContactPhone = document.getElementById("testcontactphone").innerHTML;
    postData("/contacts/", {
        "name": testContactName,
        "mail": testContactMail,
        "phone": testContactPhone
    });
}

function addTestTask() {
    let testTaskTitle = document.getElementById("testtaskstitle").innerHTML;
    let testTaskDescription = document.getElementById("testtasksdescrip").innerHTML;
    let testTaskAssignedTo = document.getElementById("testtasksassign").innerHTML;
    let testTaskDueDate = document.getElementById("testtasksdue").innerHTML;
    let testTaskPriority = document.getElementById("testtasksprio").innerHTML;
    let testTaskCategory = document.getElementById("testtaskscate").innerHTML;
    let testTaskSubtasks = document.getElementById("testtaskssub").innerHTML;
    postData("/tasks/", {
        "title": testTaskTitle,
        "description": testTaskDescription,
        "assignedTo": testTaskAssignedTo,
        "dueDate": testTaskDueDate,
        "priority": testTaskPriority,
        "category": testTaskCategory,
        "subtasks": testTaskSubtasks
    });
}

function addTestUser() {
    let testUserName = document.getElementById("testusername").innerHTML;
    let testUserMail = document.getElementById("testusermail").innerHTML;
    let testUserPassword = document.getElementById("testuserpass").innerHTML;
    postData("/users/", {
        "name": testUserName,
        "mail": testUserMail,
        "password": testUserPassword
    });
}