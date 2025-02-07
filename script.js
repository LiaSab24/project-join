let getSubmenu = document.getElementById('submenu');

function btnUserInitial(){
  getSubmenu.innerHTML = '';
  getSubmenu.classList.remove('d-none');
  getSubmenu.innerHTML += getSubmenuHTML();
}

// kommt später in die templates.js Datei
function getSubmenuHTML(){
  return `
  <p>Legal Notice</p>
  <p>Privacy Policy</p>
  <p>Logout</p>
  `;
}

function closeSubmenu() {
  getSubmenu.classList.add('d-none');
}
