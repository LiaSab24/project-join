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
  let taskTitle = document.getElementById("taskstitle").innerHTML;
  let taskDescription = document.getElementById("tasksdescrip").innerHTML;
  let taskAssignedTo = document.getElementById("tasksassign").innerHTML;
  let taskDueDate = document.getElementById("tasksdue").innerHTML;
  let taskPrio = document.getElementById("tasksprio").innerHTML;
  let taskCategory = document.getElementById("taskscate").innerHTML;
  let taskSubtasks = document.getElementById("taskssub").innerHTML;
  postData("/tasks/", { 
    "title": taskTitle, 
    "description": taskDescription, 
    "assignedTo": taskAssignedTo,
    "dueDate": taskDueDate,
    "prio": taskPrio,
    "category": taskCategory,
    "subtasks": taskSubtasks
  });
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