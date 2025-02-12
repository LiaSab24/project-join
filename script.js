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
  users = joinDataJson.users;
  tasks = joinDataJson.tasks;
  contacts = joinDataJson.contacts;
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

//add data-fcts. for users, tasks and contacts
function addUser() {
  let userFirstName = document.getElementById("userfirst").innerHTML;
  let userLastName = document.getElementById("userlast").innerHTML;
  let userPassword = document.getElementById("userpass").innerHTML;
  postData("/users/", { 
    "firstName": userFirstName, 
    "lastName": userLastName, 
    "password": userPassword 
  });
}

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
  clearForm();
}

function addContact() {
  let contactFirstName = document.getElementById("contactfirst").innerHTML;
  let contactLastName = document.getElementById("contactlast").innerHTML;
  let contactMail = document.getElementById("contactmail").innerHTML;
  let contactPhone = document.getElementById("contactphone").innerHTML;
  postData("/contacts/", { 
    "firstName": contactFirstName, 
    "lastName": contactLastName, 
    "mail": contactMail,
    "phone": contactPhone
  });
}

function clearForm() {
  document.getElementById("addTaskTitle").value = "";
  document.getElementById("addTaskDescription").value = "";
  document.getElementById("addTaskAssignedTo").value = "";
  document.getElementById("addTaskDate").value = "";
  document.getElementById("addTaskCategory").value = "";
  document.getElementById("addTaskSubtaskList").value = "";
  priorityBtnClear();
}