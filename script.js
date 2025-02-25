const BASE_URL = "https://join-424-project-default-rtdb.europe-west1.firebasedatabase.app/"

let users = [];
let tasks = [];
let contacts = [];

let currentUser = 1;                    //0=max mustermann, 1=Guest

const colors = [
  "#ff7a00", // Vivid Orange
  "#ff5eb3", // Deep Pink
  "#6e52ff", // Lavender Blue
  "#9327ff", // Violet
  "#00bee8", // Sky Blue
  "#1fd7c1", // Turquoise
  "#ff745e", // Coral
  "#ffa335", // Amber
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

/**
 * This function is the global initialisation-function for all pages and executes the loading-screen-function and the fetch-data-function
 */
async function init() {
  //LOADING SCREEN;
  await fetchDataJson();
}

/**
 * This function fetches the data from the base-URL and transforms it into .json-format
 */
async function fetchDataJson() {
  let joinData = await fetch(BASE_URL + ".json");
  let joinDataJson = await joinData.json();
  filArrays(joinDataJson);
}

/**
 * This function fills the users-, tasks-, and contacts-arrays with the beforehand fetched data
 * 
 * @param {Object} joinDataJson - the fetched object containing the users-, tasks-, and contacts-data
 */
function filArrays(joinDataJson) {
  users = Object.values(joinDataJson.users);
  tasks = Object.values(joinDataJson.tasks);
  contacts = Object.values(joinDataJson.contacts);  
}

/**
 * This function is used for the addUser()-, addTask()- and addContact()-function to transfer the added data to firebase
 * 
 * @param {string} path - the path, where the data should be added in firebase (users, tasks, contacts)
 * @param {object} data - an object, that contains all the key-value-pairs that should be added to firebase
 */
async function postData(path = "", data = {}) {
  console.log(path);
  console.log(data);
  
  let newData = await fetch(BASE_URL + path + ".json", {
    method: "POST",
    header: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data)
  });
  return newDataToJson = await newData.json();
}

/**
 * This function changes the profile-badge-color according to the deposited color for the contact
 * 
 * @param {string} contentRef - the id of the element that should get the deposited color as the background-color
 * @param {number} indexContact - the index of the contact in the contacts-array
 */
function profileBadgeColor(contentRef, indexContact) {
  document.getElementById(contentRef).style.backgroundColor = contacts[indexContact].color;
}




//__________________________________________

function btnUserInitial() {
  let subMenu = document.getElementById("submenu");
  console.log(subMenu);
  // subMenu.innerHTML = '';
  // subMenu.classList.remove('d-none');
  // subMenu.innerHTML += getSubmenuHTML();
}

// kommt später in die templates.js Datei
function getSubmenuHTML() {
  return /*html*/`
  <p><a href="../html/legal_note.html">Legal Notice</a></p>
  <p><a href="../html/privacy_police.html">Privacy Policy</a></p>
  <p><a href="../html/signup.html">Logout</a></p>
  `;
}

function closeSubmenu() {
  getSubmenu.classList.add('d-none');
}