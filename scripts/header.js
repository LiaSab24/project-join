// Globale Variablen
let getSubmenu;
let help;

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

function btnUserInitial() {
  if (getSubmenu) {
    getSubmenu.classList.remove('d-none');
    getSubmenu.innerHTML = getSubmenuHTML();
  }
}

function getSubmenuHTML() {
  return /*html*/`
    <p id="help" class="d-none"><a href="../html/help.html">Help</a></p>
    <p><a href="../html/legal_note.html">Legal Notice</a></p>
    <p><a href="../html/privacy_police.html">Privacy Policy</a></p>
    <p><a href="../html/signup.html">Logout</a></p>
  `;
}

function closeSubmenu() {
  if (getSubmenu) {
    getSubmenu.classList.add('d-none');
  }
}

function handleResize() {
  if (window.innerWidth <= 780) {
    help?.classList.remove('d-none');
  } else {
    help?.classList.add('d-none');
  }
}
