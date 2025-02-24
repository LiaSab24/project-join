const addressBookContentRef = document.getElementsByClassName("contactsLetter");

async function initContacts() {
    await init();
    renderAddressBook();
    clearActiveContacts();
    hideNotUsedLetters();
}

function renderAddressBook() {
    for (let indexLetter = 0; indexLetter < addressBookContentRef.length; indexLetter++) {
        addressBookContentRef[indexLetter].innerHTML = "";
    }
    renderContacts();
}

function renderContacts() {
    for (let indexContact = 0; indexContact < contacts.length; indexContact++) {
        let letter = contacts[indexContact].name.charAt(0).toUpperCase();
        document.getElementById("contactsLetter" + letter).innerHTML += getAddressbookContactTemplate(indexContact);
        profileBadgeColor("profileBadge" + indexContact, indexContact);
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

function hideNotUsedLetters() {
    const letterContentRef = document.getElementsByClassName("address-book-letter");
    for (let indexLetter = 0; indexLetter < letterContentRef.length; indexLetter++) {
        if (addressBookContentRef[indexLetter].innerHTML == "") {
            letterContentRef[indexLetter].classList.add("d-none");
        }
    }
}

function clearActiveContacts() {
    document.querySelectorAll('.contact').forEach(contact => contact.classList.remove("contact-clicked"));
}

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

function clearContactForm() {
    document.getElementById("addContactName").value = "";
    document.getElementById("addContactMail").value = "";
    document.getElementById("addContactPhone").value = "";
}

function addContact() {
    let contactName = document.getElementById("addContactName").value;
    let contactMail = document.getElementById("addContactMail").value;
    let contactPhone = document.getElementById("addContactPhone").value;
    let contactColor = assignRandomColor(contacts.length + 1);
    postData("/contacts/", {
        "name": contactName,
        "mail": contactMail,
        "phone": contactPhone,
        "color": contactColor
    });
    renderAddressBook();
}

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

function contactClicked(indexContact) {
    clearActiveContacts();
    highlightContact(indexContact);
    updateFocusedContact(indexContact);
}

function highlightContact(indexContact) {
    document.getElementById(indexContact).classList.add("contact-clicked");
}

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

function adjustOverlayToEdit(indexContact) {
    document.getElementById("overlayTitleH1").innerHTML = "Edit contact";
    document.getElementById("overlayTitleP").innerHTML = "";
    document.getElementById("addContactName").value = contacts[indexContact].name;
    document.getElementById("addContactMail").value = contacts[indexContact].mail;
    document.getElementById("addContactPhone").value = contacts[indexContact].phone;
    document.getElementById("contactsOverlayCancel").innerHTML = "Delete";
    document.getElementById("contactsOverlayCreate").innerHTML = "Save" + "<img src='/assets/icons/create-btn.svg'></img>";
    confirmBtnContenRef.onclick = saveEditContact();
}

function saveEditContact() {
    //change data in firebase
    //change contact in addressbook
    //closeOverlay
    renderAddressBook();
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