// Global Variables
/**
 * Reference to the submenu element.
 * @type {HTMLElement | null}
 */
let getSubmenu;

/**
 * Reference to the help element.
 * @type {HTMLElement | null}
 */
let help;

/**
 * Initializes the global variables by referencing the HTML elements.
 */
function initializeScripts() {
  getSubmenu = document.getElementById('submenu');
  help = document.getElementById('help');
}

/**
 * Waits for the DOM to fully load and then runs initialization scripts.
 */
document.addEventListener('DOMContentLoaded', async () => {
  await includeHTML();
  initializeScripts();
});

/**
 * Displays the user submenu and adjusts the layout.
 */
function btnUserInitial() {
  if (getSubmenu) {
    getSubmenu.classList.remove('d-none');
    getSubmenu.innerHTML = getSubmenuHTML();
  }
  handleResize();
}

/**
 * Generates and returns the HTML content for the submenu.
 * @returns {string} The HTML content of the submenu.
 */
function getSubmenuHTML() {
  return /*html*/`
    <p class="submenu-content"><a href="../html/legal_note.html">Legal Notice</a></p>
    <p class="submenu-content"><a href="../html/privacy_police.html">Privacy Policy</a></p>
    <p class="submenu-content"><a href="../html/login.html">Logout</a></p>
  `;
}

/**
 * Closes the submenu by adding a CSS class.
 */
function closeSubmenu() {
  if (getSubmenu) {
    getSubmenu.classList.add('d-none');
  }
}

/**
 * Adjusts the submenu based on the window size.
 * Adds a help element if the width is less than or equal to 768px.
 */
function handleResize() {
  if (window.innerWidth <= 768) {
    if (document.querySelectorAll('.submenu-content').length === 3) {
      getSubmenu.innerHTML += /*html*/ `
      <p class="submenu-content" id="help"><a href="../html/help.html">Help</a></p>`;
    }
  }  
}
