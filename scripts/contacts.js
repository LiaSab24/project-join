const addressBookContentRef = document.getElementsByClassName("contactsLetter");

/**
 * This function is the inital function, when contacts.html is loading and executes the init()-function and furher necessary contacts-functions
 */
async function initContacts() {
    await init();
    renderAddressBook();
    clearActiveContacts();
    hideAllUsers("id");
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
    document.getElementById("overlayProfileBadge").style.backgroundColor = "#D1D1D1";
    document.getElementById("overlayProfileBadge").innerHTML = "<img src='/assets/icons/contacts-overlay-profile-badge-anonymous.svg'>";
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
 * This function reads out the data of the add-contact-form and sends it to firebase
 */
async function addContact() {
    let contactName = document.getElementById("addContactName").value;
    let contactMail = document.getElementById("addContactMail").value;
    let contactPhone = document.getElementById("addContactPhone").value;
    let indexContact = contacts.length +1;
    if (contactName !== "" && contactMail !== "" && contactPhone !== "") {
        let contactColor = await assignRandomColor(indexContact);
        postData("/contacts/", {
            "name": contactName,
            "mail": contactMail,
            "phone": contactPhone,
            "color": contactColor
        });
        contactSuccesfullMsg("contactSuccesfullyCreated");  
    }
}

/**
 * This function shows the 'contact succesfully created/edited/deleted'-message after adding/editing/deleting the contact in the contacts-array and firebase was succesfull
 * 
 * @param {number} msgId - the id of the message that should be shown
 */
async function contactSuccesfullMsg(msgId) {
    let successAnimation = document.getElementById(msgId);
    successAnimation.style.animationName = "contactSuccesfull";
    successAnimation.style.animationDuration = "1600ms";
    toggleContactsOverlay();
    setTimeout(function () {
        successAnimation.style.animationName = "";
        successAnimation.style.animationDuration = "";
        initContacts();
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
    }, 800)
}

function deleteContact() {
    //delete contact from firebase
    //remove contact from addressbook
    //clear focused contact
}

async function saveEditContact(indexContact) {
    let contactName = document.getElementById("addContactName").value;
    let contactMail = document.getElementById("addContactMail").value;
    let contactPhone = document.getElementById("addContactPhone").value;
    let contactColor = contacts[indexContact].color;
    if (contactName !== "" && contactMail !== "" && contactPhone !== "") {
        await putData("/contacts/" + contacts[indexContact].url, {
            "name": contactName,
            "mail": contactMail,
            "phone": contactPhone,
            "color": contactColor
        });
        contactClicked(indexContact);
        contactSuccesfullMsg("contactSuccesfullyEdited");
    }
}