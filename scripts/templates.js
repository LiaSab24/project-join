// contacts: adressbook-contact
function getAddressbookContactTemplate() {
    return `<div>
              <div id="${index}" class="contact" onclick="contactClicked(${index})">
                  <div class="contact-profile-badge">${index}</div>
                  <p>
                      <span class="contact-name">${index}</span>
                      <span class="contact-mail">${index}/span>
                  </p>
               </div>
            </div>`
}

// contacts: focused contact
function getFocusedContactTemplate(id) {
    return `<div class="focused-profile-overview">
                <div class="focused-profile-badge">${"AM"}</div>
                    <div class="focused-profile-account">
                        <span class="focused-contact-name">${"Anton Mayer"}</span>
                        <div>
                            <button onclick="toggleOverlay(), adjustOverlayToEdit(${id})" class="focused-contact-btns">
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
                    <span class="contact-mail">${"antom@gmail.com"}</span>
                </div>
                <div>
                    <span class="contact-opportunity">Phone</span>
                    <span>${"+49 1111 111 11 1"}</span>
                </div>
            </div>`
                      
}