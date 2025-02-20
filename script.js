let getSubmenu = document.getElementById('submenu');

function btnUserInitial() {
  getSubmenu.innerHTML = '';
  getSubmenu.classList.remove('d-none');
  getSubmenu.innerHTML += getSubmenuHTML();
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

//"now < 1711407600000", // 2025-3-11
//______________________________________________________________________________________________//

const BASE_URL = "https://join-424-project-default-rtdb.europe-west1.firebasedatabase.app/"

let users = [];
let tasks = [];
let contacts = [];

//fetch-Fct.
async function fetchDataJson() {
  let joinData = await fetch(BASE_URL + ".json");
  let joinDataJson = await joinData.json();
  filArrays(joinDataJson);
}

//add fetched Data to local array
function filArrays(joinDataJson) {
  users = Object.values(joinDataJson.users);
  tasks = Object.values(joinDataJson.tasks);
  contacts = Object.values(joinDataJson.contacts);
  console.log(users, tasks, contacts)
  //users = joinDataJson.users;
  //tasks = joinDataJson.tasks;
  //contacts = joinDataJson.contacts;
}

//post-fct for the added data
async function postData(path = "", data = {}) {
  let newData = await fetch(BASE_URL + path + ".json", {
    method: "POST",
    header: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data)
  });
  return newDataToJson = await newData.json();
}

//add data-fct. and clearForm for users
function addUser() {
  let userName = document.getElementById("name").value;
  let userMail = document.getElementById("mail").value;
  let userPassword = checkPasswordConfirmed();
  if (userPassword !== undefined) {
    let checkbox = document.getElementById("checkbox");
    if (checkbox.checked) {
      console.log("checkbox");
      postData("/users/", {
        "name": userName,
        "mail": userMail,
        "password": userPassword
      });
      clearSignUpForm();
      signUpSuccesfully();
    }
  }
}

function checkPasswordConfirmed() {
  let password = document.getElementById("password").value;
  let confirmed = document.getElementById("confirmed").value;
  if (password === confirmed) {
    console.log("password");
    return password;
  }
}

function signUpSuccesfully() {
  let signUpMsg = document.getElementById("msgBox");
  setTimeout(function () {
    signUpMsg.classList.remove("d-none");
  }, 800);
  setTimeout(function () {
    signUpMsg.classList.add("d-none");
  }, 2800);
}

function clearSignUpForm() {
  document.getElementById("name").value = "";
  document.getElementById("mail").value = "";
  document.getElementById("password").value = "";
  document.getElementById("confirmed").value = "";
}

//add data-fct. and clearForm for tasks
function addTask() {
  let taskTitle = document.getElementById("addTaskTitle").value;
  let taskDescription = document.getElementById("addTaskDescription").value;
  let taskAssignedTo = document.getElementById("addTaskAssignedTo").value;
  let taskDueDate = document.getElementById("addTaskDate").value;
  let taskPriority = document.querySelector(".clicked").innerText;
  console.log(taskPriority);
  let taskCategory = document.getElementById("addTaskCategory").value;
  let taskSubtasks = document.getElementById("addTaskSubtaskList").value;
  postData("/tasks/", {
    "title": taskTitle,
    "description": taskDescription,
    "assignedTo": taskAssignedTo,
    "dueDate": taskDueDate,
    "priority": taskPriority,
    "category": taskCategory,
    "subtasks": taskSubtasks
  });
  clearTaskForm();
}

function clearTaskForm() {
  document.getElementById("addTaskTitle").value = "";
  document.getElementById("addTaskDescription").value = "";
  document.getElementById("addTaskAssignedTo").value = "";
  document.getElementById("addTaskDate").value = "";
  document.getElementById("addTaskCategory").value = "";
  document.getElementById("addTaskSubtaskList").value = "";
}

//add data-fct. and clearForm for contacts
function addContact() {
  let contactName = document.getElementById("addContactName").value;
  let contactMail = document.getElementById("addContactMail").value;
  let contactPhone = document.getElementById("addContactPhone").value;
  postData("/contacts/", {
    "name": contactName,
    "mail": contactMail,
    "phone": contactPhone
  });
  clearContactForm();
}

function clearContactForm() {
  document.getElementById("addContactName").value = "";
  document.getElementById("addContactMail").value = "";
  document.getElementById("addContactPhone").value = "";
}