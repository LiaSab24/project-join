const BASE_URL = "https://join-424-project-default-rtdb.europe-west1.firebasedatabase.app/"

let users = [];
let tasks = [];
let contacts = [];
let currentUser;
let indexContactUser;

let filteredContacts = [];
let filteredTasks = [];

let previousLocation;

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
  "#ffbb2b", // Goldenrod 
  "#462f8a"
];

let availableColors = [...colors];
let contactColors = {};

/**
 * This function is the global initialisation-function for all pages and executes the loading-screen-function and the fetch-data-function
 */
async function init() {
  await fetchDataJson();
  userIndexInContactsArray();
  if (document.getElementById("header")) {
    headerUser();
    fillSubmenu();
  }
  initializeSidebar();
  setActiveMenuLink();
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
  for (let indexUser = 0; indexUser < users.length; indexUser++) {
    users[indexUser].url = Object.keys(joinDataJson.users)[indexUser];
  }
  tasks = Object.values(joinDataJson.tasks);
  for (let indexTask = 0; indexTask < tasks.length; indexTask++) {
    tasks[indexTask].url = Object.keys(joinDataJson.tasks)[indexTask];
  }
  contacts = Object.values(joinDataJson.contacts);
  for (let indexContact = 0; indexContact < contacts.length; indexContact++) {
    contacts[indexContact].url = Object.keys(joinDataJson.contacts)[indexContact];
  }
  currentUser = joinDataJson.currentUser.userId;
}

/**
 * This function iterates through the contacts-array and finds the index of the contact of the current user
 */
function userIndexInContactsArray() {
  let userMail = users[currentUser].mail;
  indexContactUser = contacts.map(function (element) {
    return element.mail;
  }).indexOf(userMail);
}

/**
 * This function adjusts the "headerPbBadge" to the currentUser
 */
function headerUser() {
  document.getElementById("headerPbBadge").innerHTML = nameAbbreviation(indexContactUser);
  if (indexContactUser == -1) {
    document.getElementById("headerPbBadge").innerHTML = "YOU";
  }
}

/**
 * This function adds the "active"-class to sidebar-link of the current page
 */
function setActiveMenuLink() {
  let location = window.location.href;
  switch (location) {
    case "http://127.0.0.1:5500/html/summary.html":
      document.getElementById("summaryLink").classList.add("active");
      break;
    case "http://127.0.0.1:5500/html/add_task.html":
      document.getElementById("addTaskLink").classList.add("active");
      break;
    case "http://127.0.0.1:5500/html/board.html":
      document.getElementById("boardLink").classList.add("active");
      break;
    case "http://127.0.0.1:5500/html/contacts.html":
      document.getElementById("contactsLink").classList.add("active");
      break;
    case "http://127.0.0.1:5500/html/privacy_policy.html":
      document.getElementById("privacyPolicyLink").classList.add("active");
      break;
    case "http://127.0.0.1:5500/html/legal_notice.html":
      document.getElementById("LegalNoticeLink").classList.add("active");
      break;
  }
}

/**
 * This function is used for the addUser()-, addTask()- and addContact()-function to transfer the added data to firebase
 * 
 * @param {string} path - the path, where the data should be added in firebase (users, tasks, contacts)
 * @param {object} data - an object, that contains all the key-value-pairs that should be added to firebase
 */
async function postData(path = "", data = {}) {
  let response = await fetch(BASE_URL + path + ".json", {
    method: "POST",
    header: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data)
  });
  await init();
  return resonseToJson = await response.json();
}

/**
 * This function changes edited data in firebase
 * 
 * @param {string} path - the path, where the data should be edited in firebase
 * @param {object} data - an object, that contains all the key-value-pairs that should replace the previous object in firebase
 */
async function putData(path = "", data = {}) {
  if (document.getElementById("overviewOverlay")) {
    if (!document.getElementById("overviewOverlay").classList.contains("d-none")) {
      data = data.subtasks;
    }
  }
  let response = await fetch(BASE_URL + path + ".json", {
    method: "PUT",
    header: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data)
  });
  await init();
  return resonseToJson = await response.json();
}

/**
 * This function changes edited data in firebase
 * 
 * @param {string} path - the path, where the data should be deleted in firebase
 */
async function deleteData(path = "") {
  let response = await fetch(BASE_URL + path + ".json", {
    method: "DELETE",
  });
  await init();
  return resonseToJson = await response.json();
}

/**
 * This function assigns a random color of the given colors-palette
 * 
 * @param {number} indexContact - the index of the contact in the contacts-array
 */
function assignRandomColor(indexContact) {
  if (contactColors[indexContact]) {
    return contactColors[indexContact];
  }
  if (availableColors.length === 0) availableColors = [...colors];

  let randomIndex = Math.floor(Math.random() * availableColors.length);
  let assignedColor = availableColors.splice(randomIndex, 1)[0];

  contactColors[indexContact] = assignedColor;
  return assignedColor;
}

/**
 * This function changes the profile-badge-color according to the deposited color for the contact
 * 
 * @param {string} contentRef - the id of the element that should get the deposited color as the background-color
 * @param {number} indexContact - the index of the contact in the contacts-array
 */
function profileBadgeColor(contentRef, indexContact) {
  if (indexContact == -1) {
    document.getElementById(contentRef).style.backgroundColor = "#D9D9D9";
  } else {
    document.getElementById(contentRef).style.backgroundColor = contacts[indexContact].color;
  }
}

/**
 * This function extracts the first letter of the contacts first and of the contacts last name and returns them 
 * 
 * @param {number} indexContact - the index of the contact in the contacts-array 
 */
function nameAbbreviation(indexContact) {
  if (indexContact == -1) {
    return "  "
  } else {
    let contactFullName = contacts[indexContact].name.toUpperCase();
    let contactFirstName = contactFullName.substring(0, contactFullName.indexOf(' '));
    let contactLastName = contactFullName.substring(contactFullName.indexOf(' ') + 1);
    let firstLetter = contactFirstName.charAt(0);
    let secondLetter = contactLastName.charAt(0);
    return firstLetter + secondLetter
  }
}

/**
 * This function shows the 'succesfully created/edited/deleted'-message after adding/editing/deleting a contact or task was succesfull
 * 
 * @param {number} msgId - the id of the message that should be shown
 */
async function successfullMsg(msgId) {
  let successAnimation = document.getElementById(msgId);
  if (window.innerWidth <= 900) {
    successAnimation.style.animationName = "msgSuccesfullMobile";
  } else {
    successAnimation.style.animationName = "msgSuccesfullDesktop";
  }
  successAnimation.style.animationDuration = "1600ms";
  setTimeout(function () {
    successAnimation.style.animationName = "";
    successAnimation.style.animationDuration = "";
    init();
  }, 1600);
}

/**
 * This function checks, if a required input is filled in and toggles the "requirement-unfulfilled"-class accordingly
 */
function checkFilledInput(id) {
  let contentRef = document.getElementById(id);
  let unfulfilledRequirement = "requirement-unfulfilled";
  if (id == "addTaskCategory") {
    if (contentRef.placeholder == "Select task category") {
      contentRef.classList.add(unfulfilledRequirement);
    } else {
      contentRef.classList.remove(unfulfilledRequirement);
    }
  } else {
    if (contentRef.value == "") {
      contentRef.classList.add(unfulfilledRequirement);
      setTimeout(function () {
        contentRef.classList.remove(unfulfilledRequirement);
      }, 2000);
    } else {
      contentRef.classList.remove(unfulfilledRequirement);
    }
  }
}

/**
 * This function toggles the visibilty of the submenu (and its transparent background-overlay) onclick
 */
function toggleSubmenu() {
  document.querySelector(".submenu-overlay").classList.toggle("d-none");
}

/**
 * Adjusts the submenu based on the window size.
 * Adds a help element if the width is less than or equal to 768px.
 */
function fillSubmenu() {
  submenuContentRef = document.getElementById("submenu");
  submenuContentRef.innerHTML = "";
  if (window.innerWidth <= 900) {
    submenuContentRef.innerHTML = `<p><a href="./help.html">Help</a></p>`;
  }
  submenuContentRef.innerHTML += getSubmenuTemplate();
}

/**
 * This function redirects the user to the help.html-page and saves the link of the previous visited page in the local storage
 * 
 * @param {url} location - the url of the previous page
 */
function redirectToHelp(location) {
  localStorage.setItem("location", JSON.stringify(location));
  window.location.href = "./help.html"
}

/**
 * This function gets the link of the previous page from the local storage and redirects the user to that page
 */
function redirectToPreviousPage() {
  previousLocation = JSON.parse(localStorage.getItem("location"));
  window.location.href = previousLocation;
}

/**
 * This function hides the entrie of all users except the current one
 * 
 * @param {string} contentRef - the repetetive part of the id that is used to find the element to remove
 */
function hideAllUsers(contentRef) {
  for (let indexUser = 0; indexUser < users.length - 1; indexUser++) {
    let usersInContactsIds = contacts.findIndex(index => index.name === users[indexUser].name).toString();
    let usersEntrie = document.getElementById(contentRef + usersInContactsIds);
    if (usersInContactsIds != indexContactUser) {
      usersEntrie.remove();
    }
  }
}

/**
 * This function adds the addition " (You)" to the currentUser-address book entrie
 * 
 * @param {string} contentRef - the id of the element, that should be changed
 */
function adjustUserContact(contentRef) {
  if (indexContactUser !== -1) {
    document.getElementById(contentRef + indexContactUser).innerHTML += " (You)";
  }
}

/**
 * This function checks, if the mail-input-value is a proper email address.
 * It returns the email address or shows an alert accordingly.
 * 
 * @param {string} contentRef - the id of the element
 */
function validateMailInput(contentRef) {
  let mailInput = document.getElementById(contentRef).value;
  if (mailInput.includes("@")) {
    return mailInput.trim()
  } else {
    document.getElementById("alertMail").classList.remove("d-none");
    setTimeout(function () {
      document.getElementById("alertMail").classList.add("d-none");
    }, 2400);
    return ""
  }
}

/**
 * This function lets the user navigate throught the sidbar without needing to click
 */
function initializeSidebar() {
  const menuLinks = document.querySelectorAll('.menu-link');
  const navLinks = document.querySelectorAll('.nav-link');
  menuLinks.forEach(link => {
    link.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });
  navLinks.forEach(link => {
    link.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });
}