// Globale Variablen
let getSubmenu;
let help;

function initializeScripts() {
  getSubmenu = document.getElementById('submenu');
  help = document.getElementById('help');}

document.addEventListener('DOMContentLoaded', async () => {
  await includeHTML();
  initializeScripts();
});

function btnUserInitial() {
  if (getSubmenu) {
    getSubmenu.classList.remove('d-none');
    getSubmenu.innerHTML = getSubmenuHTML();
  }
  handleResize();
}

function getSubmenuHTML() {
  return /*html*/`
    <p class="submenu-content"><a href="../html/legal_note.html">Legal Notice</a></p>
    <p class="submenu-content"><a href="../html/privacy_police.html">Privacy Policy</a></p>
    <p class="submenu-content"><a href="../html/signup.html">Logout</a></p>
  `;
}

function closeSubmenu() {
  if (getSubmenu) {
    getSubmenu.classList.add('d-none');
  }
}

function handleResize() {
  if (window.innerWidth <= 768) {
    if (document.querySelectorAll('.submenu-content').length = 3) {
      getSubmenu.innerHTML += /*html*/ `
      <p class="submenu-content" id="help"><a href="../html/help.html">Help</a></p>`;
    }
  }  
} 