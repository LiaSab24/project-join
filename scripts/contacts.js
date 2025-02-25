const addressBookContentRef = document.getElementsByClassName("contactsLetter");

/**
 * This function is the inital function, when contacts.html is loading and executes the init()-function and furher necessary contacts-functions
 */
async function initContacts() {
    await init();
    renderAddressBook();
    clearActiveContacts();
    hideNotUsedLetters();
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
 * This function toggles the contact-overlay (for addding a new or editing an existing contact), background-overlay and overlay-animations
 */
function toggleContactsOverlay() {
    let overlayBgContentRef = document.getElementById("overlayBg");
    let overlayContactContentRef = document.getElementById("overlayContact");
    overlayContactContentRef.classList.toggle("animation-open-overlay");
    overlayContactContentRef.classList.toggle("animation-close-overlay");
    setTimeout(function () {
        overlayContactContentRef.classList.toggle("d-none");
        overlayBgContentRef.classList.toggle("d-none");
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
    document.getElementById("contactsOverlayCancel").innerHTML = "Cancel";
    document.getElementById("contactsOverlayCreate").innerHTML = "Create Contact" + "<img src='/assets/icons/create-btn.svg'>";
    document.getElementById("overlayProfileBadge").style.backgroundColor = "#D1D1D1";
    document.getElementById("overlayProfileBadge").innerHTML = "<img src='/assets/icons/contacts-overlay-profile-badge-anonymous.svg'>";
    confirmBtnContenRef.onclick = addContact();
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
 * This function reads out the data of the add-contact-form and sends it to firebase
 */
async function addContact() {
    let contactName = document.getElementById("addContactName").value;
    let contactMail = document.getElementById("addContactMail").value;
    let contactPhone = document.getElementById("addContactPhone").value;
    let contactColor = assignRandomColor(contacts.length + 1);
    if (contactName !== "" && contactMail !== "" && contactPhone !== "") {
        postData("/contacts/", {
            "name": contactName,
            "mail": contactMail,
            "phone": contactPhone,
            "color": contactColor
        });
        contactSuccesfullyCreated();
        toggleContactsOverlay();
        await init()
        renderAddressBook();
    }
}

/**
 * This function is part of the 'addContact'-function and assigns a random color of the given colors-palette
 * 
 * @param {number} indexContact - the index of the contact in the contacts-array
 */
function assignRandomColor(indexContact) {
    if (contactColors[indexContact]) {
        return contactColors[indexContact];
    }
    if (availableColors.length === 0) availableColors = [...colors];

    let randomIndex = Math.floor(Math.random() * availableColors.length);
    let assignedColor = availableColors.splice(randomIndex, 1)[0];

    contactColors[indexContact] = assignedColor;
    localStorage.setItem("contactColors", JSON.stringify(contactColors));
    return assignedColor;
}

/**
 * This function shows the 'contact succesfully created'-message after adding the contact to the contacts-array firebase was succesfull
 */
function contactSuccesfullyCreated() {
    let successAnimation = document.getElementById("contactSuccesfullyCreated");
    successAnimation.style.animationName = "contactSuccesfullyCreated";
    successAnimation.style.animationDuration = "1600ms";
    setTimeout(function () {
        successAnimation.style.animationName = "";
        successAnimation.style.animationDuration = "";
    }, 1600);
}

/**
 * This function redirects to different functions that are used to display the clicked contact 
 * 
 * @param {number} indexContact - the index of the contact in the contacts-array
 */
function contactClicked(indexContact) {
    clearActiveContacts();
    highlightContact(indexContact);
    updateFocusedContact(indexContact);
}

/**
 * This function adds the 'contact-clicked'-class to the clicked contact (userfeedback)
 * 
 * @param {number} indexContact - the index of the contact in the contacts-array
 */
function highlightContact(indexContact) {
    document.getElementById(indexContact).classList.add("contact-clicked");
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
    }, 400)
}

function deleteContact() {
    //delete contact from firebase
    //remove contact from addressbook
    //clear focused contact
}

/**
 * This function is used, when the user wants to edit a contact instead of adding a new one.
 * The contacts-overlay adjusts accordingly
 * 
 * @param {number} indexContact - the index of the contact in the contacts-array
 */
function adjustOverlayToEdit(indexContact) {
    document.getElementById("overlayTitleH1").innerHTML = "Edit contact";
    document.getElementById("overlayTitleP").innerHTML = "";
    document.getElementById("addContactName").value = contacts[indexContact].name;
    document.getElementById("addContactMail").value = contacts[indexContact].mail;
    document.getElementById("addContactPhone").value = contacts[indexContact].phone;
    document.getElementById("contactsOverlayCancel").innerHTML = "Delete";
    document.getElementById("contactsOverlayCreate").innerHTML = "Save" + "<img src='/assets/icons/create-btn.svg'>";
    profileBadgeColor("overlayProfileBadge", indexContact)
    document.getElementById("overlayProfileBadge").innerHTML = nameAbbreviation(indexContact)
    confirmBtnContenRef.onclick = saveEditContact();
}

function saveEditContact() {

    //change data in firebase
    //change contact in addressbook
    //closeOverlay
    renderAddressBook();
}