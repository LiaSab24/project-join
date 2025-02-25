//"now < 1711407600000", // 2025-3-11
//______________________________________________________________________________________________//

const BASEs_URL = "https://join-424-project-default-rtdb.europe-west1.firebasedatabase.app/"

let tusers = [];
let ttasks = [];
let tcontacts = [];

//fetch-Fct.
async function fetchDataJson() {
  let joinData = await fetch(BASEs_URL + ".json");
  let joinDataJson = await joinData.json();
  tusers = joinDataJson.users;
  ttasks = joinDataJson.tasks;
  tcontacts = joinDataJson.contacts;
  daytime()
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

//Test Daytime

function daytime() {
  let timeContentRef = document.getElementById("testDaytime");
  const time = new Date();
  timeContentRef.innerHTML = time.getHours();
  console.log(time);
}

// TEST-DATEN
function addTestContact() {
  let testContactName = document.getElementById("testcontactname").innerHTML;
  let testContactMail = document.getElementById("testcontactmail").innerHTML;
  let testContactPhone = document.getElementById("testcontactphone").innerHTML;
  postData("/contacts/", {
      "name": testContactName,
      "mail": testContactMail,
      "phone": testContactPhone
  });
}

function addTestTask() {
  let testTaskTitle = document.getElementById("testtaskstitle").innerHTML;
  let testTaskDescription = document.getElementById("testtasksdescrip").innerHTML;
  let testTaskAssignedTo = document.getElementById("testtasksassign").innerHTML;
  let testTaskDueDate = document.getElementById("testtasksdue").innerHTML;
  let testTaskPriority = document.getElementById("testtasksprio").innerHTML;
  let testTaskCategory = document.getElementById("testtaskscate").innerHTML;
  let testTaskSubtasks = document.getElementById("testtaskssub").innerHTML;
  postData("/tasks/", {
      "title": testTaskTitle,
      "description": testTaskDescription,
      "assignedTo": testTaskAssignedTo,
      "dueDate": testTaskDueDate,
      "priority": testTaskPriority,
      "category": testTaskCategory,
      "subtasks": testTaskSubtasks
  });
}

function addTestUser() {
  let testUserName = document.getElementById("testusername").innerHTML;
  let testUserMail = document.getElementById("testusermail").innerHTML;
  let testUserPassword = document.getElementById("testuserpass").innerHTML;
  postData("/users/", {
      "name": testUserName,
      "mail": testUserMail,
      "password": testUserPassword
  });
}