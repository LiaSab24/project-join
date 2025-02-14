const colors = [
    "#ff7a00", // Vivid Orange
    "#ff5eb3", // Deep Pink
    "#6e52ff", // Lavender Blue
    "#9327ff", // Violet
    "#00bee8", // Sky Blue
    "#1fd7c1", // Turquoise
    "#ff745e", // Coral
    "#ffa335e", // Amber
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

function init() {
    changeProfileBadgeBackground();
}

// Funktion zum zufälligen Auswählen einer Farbe aus den verfügbaren Farben
function changeProfileBadgeBackground() {
    let profileBadges = document.querySelectorAll('.contact-profile-badge');
    profileBadges.forEach(function(badge) {
        if (availableColors.length === 0) {
            availableColors = [...colors];
        }
        let randomIndex = Math.floor(Math.random() * availableColors.length);
        let randomColor = availableColors[randomIndex];
        badge.style.backgroundColor = randomColor;
        availableColors.splice(randomIndex, 1);
    });
  
function contactClicked(id) {
    for (let indexContacts = 0; indexContacts < 8; indexContacts++) {
        document.getElementById(indexContacts).classList.remove("contact-clicked");
    }
    document.getElementById(id).classList.add("contact-clicked");
    let focusedContactContentRef = document.getElementById("focusedContactInformation");
    focusedContactContentRef.innerHTML = "";
    setTimeout(function () {
        focusedContactContentRef.innerHTML += getFocusedContactTemplate(id);
        focusedContactContentRef.classList.remove("animation-focused-contact");
    }, 400);
}

function deleteContact() {
    //delete contact from firebase
    //remove contact from addressbook
    //clear focused contact
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
