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