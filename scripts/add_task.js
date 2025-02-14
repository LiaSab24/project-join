function priorityBtnClear() {
    document.getElementById("prioUrgent").classList.remove("prioUrgentClicked", "clicked");
    document.getElementById("prioUrgentImg").src="/assets/icons/add-task-prioUrgent.svg";
    document.getElementById("prioMedium").classList.remove("prioMediumClicked", "clicked");
    document.getElementById("prioMediumImg").src="/assets/icons/add-task-prioMedium.svg";
    document.getElementById("prioLow").classList.remove("prioLowClicked", "clicked");
    document.getElementById("prioLowImg").src="/assets/icons/add-task-prioLow.svg";
}

function priorityBtnBg(priority) {
    priorityBtnClear();
    let clickedPrioBtn = document.getElementById(priority);
    let clickedPrioBtnImg = document.getElementById(priority + "Img");
    clickedPrioBtn.classList.add(priority + "Clicked");
    clickedPrioBtn.classList.add("clicked");
    clickedPrioBtnImg.src="/assets/icons/add-task-"+ priority +"-clicked.svg";
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


