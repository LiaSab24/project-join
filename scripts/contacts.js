const addressBookContentRef = document.getElementsByClassName("contactsLetter");

/**
 * This function is the inital function, when contacts.html is loading and executes the init()-function and furher necessary contacts-functions
 */
async function initContacts() {
    await init();
    renderAddressBook();
    clearActiveContacts();
    hideAllUsers("id");
    adjustUserContact("idName");
    hideNotUsedLetters();
    adjustToWindowSize();
}

/**
 * This function checks the windows inner width and toggles the visibilty of the section "contactFocus"
 */
function adjustToWindowSize() {
    if (window.innerWidth <= 1000) {
        if (window.innerWidth <= 900) {
            document.getElementById("addNewContactBtnDesktop").classList.add("d-none");
            document.getElementById("addNewContactBtnMobile").classList.remove("d-none");
        }
        else {
            document.getElementById("addNewContactBtnDesktop").classList.remove("d-none")
            document.getElementById("addNewContactBtnMobile").classList.add("d-none");
        }
    } else {
        document.getElementById("addresbookHideMobile").classList.remove("d-none");
        document.getElementById("arrowBackwardsMobile").classList.add("d-none");
        document.getElementById("addNewContactBtnMobile").classList.add("d-none");
        document.getElementById("btnsMenuMobile").classList.add("d-none");
    }
}

/**
 * This function clears the contacts-list for each letter and redirects to the function, that fills the list with contacts
 */
function renderAddressBook() {
    for (let indexLetter = 0; indexLetter < addressBookContentRef.length; indexLetter++) {
        addressBookContentRef[indexLetter].innerHTML = "";
    }
    renderContacts();
}

/**
 * This function extracts the first letter of each contacts name and adds the contact to the corresponding letter (with a template)
 * After that, the contacts profile-badge get its corresponding color
 */
function renderContacts() {
    for (let indexContact = 0; indexContact < contacts.length; indexContact++) {
        let letter = contacts[indexContact].name.charAt(0).toUpperCase();
        document.getElementById("contactsLetter" + letter).innerHTML += getAddressbookContactTemplate(indexContact);
        profileBadgeColor("profileBadge" + indexContact, indexContact);
    }
}

/**
 * This function is executed after the address book finished rendering and iterates through each letter and hides it, if it does not contain any contact
 */
function hideNotUsedLetters() {
    const letterContentRef = document.getElementsByClassName("address-book-letter");
    for (let indexLetter = 0; indexLetter < letterContentRef.length; indexLetter++) {
        if (addressBookContentRef[indexLetter].innerHTML == "") {
            letterContentRef[indexLetter].classList.add("d-none");
        }
    }
}

/**
 * This function removes the 'contact-clicked'-class from all contacts
 */
function clearActiveContacts() {
    document.querySelectorAll('.contact').forEach(contact => contact.classList.remove("contact-clicked"));
}

/**
 * This function opens the ContactsOverlay (for addding a new or editing an existing contact), background-overlay and overlay-animations)
 */
function openContactsOverlay() {
    document.getElementById("overlayBg").classList.remove("d-none");
    document.getElementById("overlayContact").classList.remove("d-none");
}

/**
 * This function opens the ContactsOverlay 
 */
function closeContactsOverlay() {
    document.getElementById("menuEditDeleteMobile").classList.add("d-none")
    document.getElementById("overlayBg").classList.remove("animation-open-overlay");
    document.getElementById("overlayContact").classList.remove("animation-close-overlay");
    setTimeout(function () {
        document.getElementById("overlayContact").classList.add("d-none");
        document.getElementById("overlayBg").classList.add("d-none");
    }, 300);
    clearContactForm();
}

/**
 * This function is used, when the user wants to add a new contact instead of editing one.
 * The contacts-overlay adjusts accordingly.
 */
function adjustOverlayToAdd() {
    document.getElementById("overlayTitleH1").innerHTML = "Add contact";
    document.getElementById("overlayTitleP").innerHTML = "Tasks are better with a team!";
    document.getElementById("overlayProfileBadge").style.backgroundColor = "#D1D1D1";
    document.getElementById("overlayProfileBadge").innerHTML = "<img src='../assets/icons/contacts-overlay-profile-badge-anonymous.svg'>";
    document.getElementById("contactsSubmitBtns").innerHTML = getContactsOverlayAddBtnsTemplate();
}

/**
 * This function is used, when the user wants to edit a contact instead of adding a new one.
 * 
 * @param {number} indexContact - the index of the contact in the contacts-array
 */
function adjustOverlayToEdit(indexContact) {
    document.getElementById("overlayTitleH1").innerHTML = "Edit contact";
    document.getElementById("overlayTitleP").innerHTML = "";
    document.getElementById("addContactName").value = contacts[indexContact].name;
    document.getElementById("addContactMail").value = contacts[indexContact].mail;
    document.getElementById("addContactPhone").value = contacts[indexContact].phone;
    profileBadgeColor("overlayProfileBadge", indexContact)
    document.getElementById("overlayProfileBadge").innerHTML = nameAbbreviation(indexContact)
    document.getElementById("contactsSubmitBtns").innerHTML = getContactsOverlayEditBtnsTemplate(indexContact);
}

/**
 * This function clears the input-values of the contact-overlay-form
 */
function clearContactForm() {
    document.getElementById("addContactName").value = "";
    document.getElementById("addContactMail").value = "";
    document.getElementById("addContactPhone").value = "";
}

/**
 * This function reads out the data of the add-contact-form and sends it to firebase to add a new contact
 */
async function addContact() {
    let contactName = document.getElementById("addContactName").value;
    let contactMail = validateMailInput("addContactMail");
    let contactPhone = document.getElementById("addContactPhone").value.trim();
    let indexContact = contacts.length + 1;
    if (contactName !== "" && contactMail !== "" && contactPhone !== "") {
        let contactColor = await assignRandomColor(indexContact);
        await postData("/contacts/", {
            "name": contactName,
            "mail": contactMail,
            "phone": contactPhone,
            "color": contactColor
        });
        renderAddressBook();
        closeContactsOverlay();
        successfullMsg("contactSuccesfullyCreated");
    } else {
        checkFilledInput("addContactName");
        checkFilledInput("addContactMail");
        checkFilledInput("addContactPhone")
    }
}

/**
 * This function redirects to different functions that are used to display the clicked contact 
 * 
 * @param {number} indexContact - the index of the contact in the contacts-array
 */
function contactClicked(indexContact) {
    if (window.innerWidth <= 1000) {
        document.getElementById("addresbookHideMobile").classList.add("d-none");
        document.getElementById("contactFocus").style.display = "flex";
        document.getElementById("addNewContactBtnMobile").classList.add("d-none");
        document.getElementById("btnsMenuMobile").classList.remove("d-none");
        document.getElementById("arrowBackwardsMobile").classList.remove("d-none");
    }
    clearActiveContacts();
    highlightContact(indexContact);
    updateFocusedContact(indexContact);
    document.getElementById("menuEditDeleteMobile").innerHTML = getbtnsMenuMobileTemplate(indexContact)
}

/**
 * This function closes the focused contact and shows the addressbook again
 */
function mobileArrowBackwards() {
    document.getElementById("contactFocus").style.display = "none";
    document.getElementById("addresbookHideMobile").classList.remove("d-none");
    document.getElementById("btnsMenuMobile").classList.add("d-none");
    document.getElementById("addNewContactBtnMobile").classList.remove("d-none");
}

/**
 * This function toggles the visibilty of the delete-/edit-contact-menu for mobile
 */
function toggleEditDeleteMenuMobile() {
    document.getElementById("overlayBg").classList.remove("d-none")
    document.getElementById("menuEditDeleteMobile").classList.remove("d-none")
}

/**
 * This function adds the 'contact-clicked'-class to the clicked contact (userfeedback)
 * 
 * @param {number} indexContact - the index of the contact in the contacts-array
 */
function highlightContact(indexContact) {
    document.getElementById("id" + indexContact).classList.add("contact-clicked");
}

/**
 * This function shows the clicked contact in a large view
 * 
 * @param {number} indexContact - the index of the contact in the contacts-array
 */
function updateFocusedContact(indexContact) {
    let focusedContactContent = document.getElementById("focusedContactInformation");
    focusedContactContent.innerHTML = "";
    setTimeout(() => {
        focusedContactContent.innerHTML = getFocusedContactTemplate(indexContact);
        profileBadgeColor("focusedProfileBadge", indexContact);
        if (indexContact == indexContactUser) {
            adjustUserContact("idFocusedName");
            document.getElementById("deleteBtnContacts").classList.add("d-none");
        }
    }, 250)
}

/**
 * This function reads out the data of the add-contact-form and sends it to firebase to replace the previous contacts-data
 * 
 * @param {number} indexContact - the index of the contact in the contacts-array
 */
async function saveEditContact(indexContact) {
    if (indexContact !== indexContactUser) {
        let contactName = document.getElementById("addContactName").value;
        let contactMail = validateMailInput();
        let contactPhone = document.getElementById("addContactPhone").value.trim();
        let contactColor = contacts[indexContact].color;
        if (contactName !== "" && contactMail !== "" && contactPhone !== "") {
            await putData("/contacts/" + contacts[indexContact].url, {
                "name": contactName,
                "mail": contactMail,
                "phone": contactPhone,
                "color": contactColor
            });
            contactClicked(indexContact);
            successfullMsg("contactSuccesfullyEdited");
            closeContactsOverlay();
            initContacts();
        } else {
            checkFilledInput("addContactName");
            checkFilledInput("addContactMail");
            checkFilledInput("addContactPhone")
        }
    } else {
        saveEditContactUser()
    }
}

/**
 * This function reads out the data of the add-contact-form for the edit-overlay and sends it to firebase to replace the previous data (for users and contacts)
 */
async function saveEditContactUser() {
    let userName = document.getElementById("addContactName").value;
    let userMail = document.getElementById("addContactMail").value;
    let userPhone = document.getElementById("addContactPhone").value.trim();
    let userPassword = users[currentUser].password;
    let userColor = contacts[indexContactUser].color;
    if (userName !== "" && userMail !== "" && userPhone !== "") {
        setTimeout(function () {
            putData("/users/" + users[currentUser].url, {
                "name": userName,
                "mail": userMail,
                "password": userPassword
            });
        });
        setTimeout(function () {
            putData("/contacts/" + contacts[indexContactUser].url, {
                "name": userName,
                "mail": userMail,
                "phone": userPhone,
                "color": userColor
            });
        });
        contactClicked(indexContactUser);
        successfullMsg("contactSuccesfullyEdited");
        closeContactsOverlay();
        initContacts();
    } else {
        checkFilledInput("addContactName");
        checkFilledInput("addContactMail");
        checkFilledInput("addContactPhone")
    }
}

/**
 * This function sends the path of the contact that should be deleted to firebase
 * 
 * @param {number} indexContact - the index of the contact in the contacts-array
 */
async function deleteContact(indexContact) {
    await deleteData("/contacts/" + contacts[indexContact].url);
    successfullMsg("contactSuccesfullyDeleted");
    document.getElementById("focusedContactInformation").innerHTML = "";
    initContacts();
} 

/**
 * This function checks if the pressed key is a Number and returns it if true.
 * Like this, only numbers (and "+") are valide inputs
 */
function onlyAllowNumbers(event) {
    if (!isNaN(event.key) || event.key == "+" || event.key == "Backspace") {
        return event.key
    } else { 
        event.preventDefault()
    }
}