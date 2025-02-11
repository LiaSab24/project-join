function contactClicked(id) {
    for (let indexContacts = 0; indexContacts < contacts.length; indexContacts++) {
        //remove "contact-clicked" class for all contacts;
    }
    //add "contact-clicked" class to clicked contact
    //show "focused-contact-information" for clicked contact
}

function toggleOverlay() {
    let overlayBgContentRef = document.getElementById("overlayBg");
    let overlayContactContentRef = document.getElementById("overlayContact");
    overlayContactContentRef.classList.toggle("animation-open-overlay");
    overlayContactContentRef.classList.toggle("animation-close-overlay");
    setTimeout(function() { 
        overlayContactContentRef.classList.toggle("d-none"); 
        overlayBgContentRef.classList.toggle("d-none");
    }, 300);
    
}