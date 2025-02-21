function priorityBtnClear() {
    document.getElementById("prioUrgent").classList.remove("prioUrgentClicked", "clicked");
    document.getElementById("prioUrgentImg").src = "/assets/icons/add-task-prioUrgent.svg";
    document.getElementById("prioMedium").classList.remove("prioMediumClicked", "clicked");
    document.getElementById("prioMediumImg").src = "/assets/icons/add-task-prioMedium.svg";
    document.getElementById("prioLow").classList.remove("prioLowClicked", "clicked");
    document.getElementById("prioLowImg").src = "/assets/icons/add-task-prioLow.svg";
}

function priorityBtnBg(priority) {
    priorityBtnClear();
    let clickedPrioBtn = document.getElementById(priority);
    let clickedPrioBtnImg = document.getElementById(priority + "Img");
    clickedPrioBtn.classList.add(priority + "Clicked");
    clickedPrioBtn.classList.add("clicked");
    clickedPrioBtnImg.src = "/assets/icons/add-task-" + priority + "-clicked.svg";
}

async function init() {
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

function initAddTask() {
    clearSubtaskList();
}

function clearSubtaskList() {
    const subtasksListContentRef = document.getElementById("addTaskSubtaskList");
    subtasksListContentRef.innerHTML = "";
}

//timeout to be able to execute Icons Functions first
function changeSubtaskIcons() {
    let subtaskIconAdd = document.getElementById("subtaskIconAdd");
    let subtaskIconsFocus = document.getElementById("subtaskIconsFocus");
    setTimeout(() => {
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
        console.log(newSubtask);
        subtasksListContentRef.innerHTML += `<li>${newSubtask}</li>`;
        clearSubtasksInput();
    }
}