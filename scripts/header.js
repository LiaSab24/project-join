// Globale Variablen
let getSubmenu;
let help;

/**
 * Initializes script variables and event listeners.
 * It sets references to submenu and help elements and adds a resize event listener.
 */
function initializeScripts() {
  // Elemente nach der Einbindung abrufen
  getSubmenu = document.getElementById('submenu');
  help = document.getElementById('help');

  // Prüfen, ob die Elemente existieren
  if (getSubmenu && help) {
    // Event Listener einrichten
    window.onresize = handleResize;
    handleResize(); // Initialer Aufruf, um den korrekten Zustand zu setzen
  } else {
    console.error('Elemente nicht im DOM gefunden.');
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  await includeHTML();
  initializeScripts();
});

/**
 * Displays the submenu by removing the 'd-none' class and setting its content.
 */
function btnUserInitial() {
  if (getSubmenu) {
    getSubmenu.classList.remove('d-none');
    getSubmenu.innerHTML = getSubmenuHTML();
  }
}

/**
 * Returns the HTML string for the submenu.
 * 
 * @returns {string} The submenu HTML content.
 */
function getSubmenuHTML() {
  return /*html*/`
    <p id="help" class="d-none"><a href="../html/help.html">Help</a></p>
    <p><a href="../html/legal_note.html">Legal Notice</a></p>
    <p><a href="../html/privacy_police.html">Privacy Policy</a></p>
    <p><a href="../html/signup.html">Logout</a></p>
  `;
}

/**
 * Hides the submenu by adding the 'd-none' class.
 */
function closeSubmenu() {
  if (getSubmenu) {
    getSubmenu.classList.add('d-none');
  }
}


/**
 * Toggles the visibility of the "Help" link based on screen width.
 * If the screen width is 780px or less, the "Help" link is shown; otherwise, it is hidden.
 */
function handleResize() {
  if (window.innerWidth <= 780) {
    help?.classList.remove('d-none');
  } else {
    help?.classList.add('d-none');
  }
}
