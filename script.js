let getSubmenu = document.getElementById('submenu');

function btnUserInitial(){
  getSubmenu.innerHTML = '';
  getSubmenu.classList.remove('d-none');
  getSubmenu.innerHTML += getSubmenuHTML();
}

// kommt später in die templates.js Datei
function getSubmenuHTML(){
  return /*html*/`
  <p><a href="../html/legal_note.html">Legal Notice</a></p>
  <p><a href="../html/privacy_police.html">Privacy Policy</a></p>
  <p><a href="../html/signup.html">Logout</a></p>
  `;
}

function closeSubmenu() {
  getSubmenu.classList.add('d-none');
}
