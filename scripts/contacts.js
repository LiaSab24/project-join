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

let availableColors = [...colors];
let contactColors = {}; 

function init() {
    changeProfileBadgeBackground();
}
  
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
    //change content of overlay, depending of clicked button (add or edit)
}


// Funktion zum zufälligen Auswählen einer Farbe aus den verfügbaren Farben
function changeProfileBadgeBackground() {
    let profileBadges = document.querySelectorAll('.contact-profile-badge');
    profileBadges.forEach(function(badge) {
        if (availableColors.length === 0) {
            availableColors = [...colors]
        }
        let randomIndex = Math.floor(Math.random() * availableColors.length);
        let randomColor = availableColors[randomIndex];
        badge.style.backgroundColor = randomColor;
        availableColors.splice(randomIndex, 1);
    });
}

function contactClicked(id) {
    let focusedBadge = document.querySelector('.focused-profile-badge');
    let clickedBadge = document.querySelector(`#${id} .contact-profile-badge`);

    if (focusedBadge && clickedBadge) {
        focusedBadge.style.backgroundColor = contactColors[id];
        focusedBadge.textContent = clickedBadge.textContent;
    }
}