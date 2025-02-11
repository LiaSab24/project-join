function priorityBtnClear() {
    document.getElementById("prioUrgent").classList.remove("prioUrgentClicked");
    document.getElementById("prioUrgentImg").src="/assets/icons/add-task-prioUrgent.svg";
    document.getElementById("prioMedium").classList.remove("prioMediumClicked");
    document.getElementById("prioMediumImg").src="/assets/icons/add-task-prioMedium.svg";
    document.getElementById("prioLow").classList.remove("prioLowClicked");
    document.getElementById("prioLowImg").src="/assets/icons/add-task-prioLow.svg";
}

function priorityBtnBg(priority) {
    priorityBtnClear();
    let clickedPrioBtn = document.getElementById(priority);
    let clickedPrioBtnImg = document.getElementById(priority + "Img");
    clickedPrioBtn.classList.add(priority + "Clicked");
    clickedPrioBtnImg.src="/assets/icons/add-task-"+ priority +"-clicked.svg";
}