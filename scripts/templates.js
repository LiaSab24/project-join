// contacts: adressbook-contact
function getAddressbookContactTemplate(indexContact) {
    return `<div id="${indexContact}" class="contact" onclick="contactClicked(${indexContact})">
                <div class="contact-profile-badge">${nameAbbreviation(indexContact)}</div>
                <p>
                    <span class="contact-name">${contacts[indexContact].name}</span>
                    <span class="contact-mail">${contacts[indexContact].mail}</span>
                </p>
            </div>`
}

// contacts: focused contact
function getFocusedContactTemplate(indexContact) {
    return `<div class="focused-profile-overview">
                <div class="focused-profile-badge">${nameAbbreviation(indexContact)}</div>
                    <div class="focused-profile-account">
                        <span class="focused-contact-name">${contacts[indexContact].name}</span>
                        <div>
                            <button onclick="toggleOverlay(), adjustOverlayToEdit(${indexContact})" class="focused-contact-btns">
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