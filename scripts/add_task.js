async function initAddTask() {
    await init();
    clearTaskForm()
    fixDateInput();
}

function clearTaskForm() {
    document.getElementById("addTaskTitle").value = "";
    document.getElementById("addTaskDescription").value = "";
    document.getElementById("addTaskAssignedTo").value = "default";
    clearAssignedToList();
    document.getElementById("addTaskDate").value = "";
    clearPriorityBtns();
    document.getElementById("addTaskCategory").value = "default";
    document.getElementById("addTaskSubtask").value = "";
    clearSubtaskList();
  }

function clearAssignedToList() {
    //remove all profile Badges from #addTaskAssignedToProfiles
    //remove all checks from checkboxes
    //show placeholder
}

function clearPriorityBtns() {
    document.getElementById("prioUrgent").classList.remove("prioUrgentClicked", "clicked");
    document.getElementById("prioUrgentImg").src = "/assets/icons/add-task-prioUrgent.svg";
    document.getElementById("prioMedium").classList.remove("prioMediumClicked", "clicked");
    document.getElementById("prioMediumImg").src = "/assets/icons/add-task-prioMedium.svg";
    document.getElementById("prioLow").classList.remove("prioLowClicked", "clicked");
    document.getElementById("prioLowImg").src = "/assets/icons/add-task-prioLow.svg";
}

function clearSubtaskList() {
    const subtasksListContentRef = document.getElementById("addTaskSubtaskList");
    subtasksListContentRef.innerHTML = "";
    //show placeholder
}

function fixDateInput() {
    const dateInput = document.querySelector("#addTaskDate");
    if (dateInput && !dateInput.hasAttribute("data-flatpickr-initialized")) {
        flatpickr(dateInput, {
            dateFormat: "d/m/y", // Korrektes Format (2-stelliges Jahr)
            allowInput: true, // Benutzer kann auch tippen
            clickOpens: true, // Popup öffnet sich automatisch beim Klick
            defaultDate: null, // Kein voreingestelltes Datum
        });
        dateInput.setAttribute("data-flatpickr-initialized", "true");
    }
}

function assignedToDropDownMenu() {
    //...
}

function priorityBtnBg(priority) {
    clearPriorityBtns();
    let clickedPrioBtn = document.getElementById(priority);
    let clickedPrioBtnImg = document.getElementById(priority + "Img");
    clickedPrioBtn.classList.add(priority + "Clicked");
    clickedPrioBtn.classList.add("clicked");
    clickedPrioBtnImg.src = "/assets/icons/add-task-" + priority + "-clicked.svg";
}


function changeSubtaskIcons() {
    let subtaskIconAdd = document.getElementById("subtaskIconAdd");
    let subtaskIconsFocus = document.getElementById("subtaskIconsFocus");
    setTimeout(() => {                                                      //timeout to be able to execute Icons Functions first
        subtaskIconAdd.classList.toggle("d-none");
        subtaskIconsFocus.classList.toggle("d-none");
    }, 100);
}

function clearSubtasksInput() {
    const subtasksInputRef = document.getElementById("addTaskSubtask");
    subtasksInputRef.value = "";
}

function addSubtaskToList() {
    const subtasksInputContentRef = document.getElementById("addTaskSubtask");
    let newSubtask = subtasksInputContentRef.value.trim();
    const subtasksListContentRef = document.getElementById("addTaskSubtaskList");
    if (newSubtask !== "") {
        subtasksListContentRef.innerHTML += `<li class="subtask">${newSubtask}</li>`;
        clearSubtasksInput();
    }
}

//EDIT SUBTASKS

function addTask() {
    let taskTitle = document.getElementById("addTaskTitle").value;
    let taskDescription = document.getElementById("addTaskDescription").value;
    let taskAssignedTo = document.getElementById("addTaskAssignedTo").value;
    let taskDueDate = document.getElementById("addTaskDate").value;
    let taskPriority = document.querySelector(".clicked").innerText;
    console.log(taskPriority);
    let taskCategory = document.getElementById("addTaskCategory").value;
    let taskSubtasks = getSubtasks();
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
  
  function getSubtasks() {
    let subtasks = document.querySelectorAll(".subtask");
    let subtaskArray = [];
    for (let indexSubtask = 0; indexSubtask < subtasks.length; indexSubtask++) {
      subtaskArray.push(subtasks[indexSubtask].innerHTML)
    }
    console.log(subtaskArray);
    return subtaskArray;
  }