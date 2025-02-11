function contactClicked(id) {
    for (let indexContacts = 0; indexContacts < contacts.length; indexContacts++) {
        //remove "contact-clicked" class for all contacts;
    }
    //add "contact-clicked" class to clicked contact
    //show "focused-contact-information" for clicked contact
}

function toggleOverlay() {
    let overlayContentRef = document.getElementById("overlayContact");
    overlayContentRef.classList.toggle("animation-open-overlay");
    setTimeout(function() { overlayContentRef.classList.toggle("d-none"); }, 300);
    overlayContentRef.classList.toggle("animation-close-overlay");
}