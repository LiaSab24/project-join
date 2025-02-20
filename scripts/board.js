const BASEURL = "https://join-424-project-default-rtdb.europe-west1.firebasedatabase.app/";

function initBoard() {
  removeMessageNoTasks()
}

function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
  event.preventDefault();
  let data = event.dataTransfer.getData("text")
  let draggedElement = document.getElementById(data);
  if (event.target.className === 'task-wrapper' || event.target.className === 'task-headline') {
    event.target.appendChild(draggedElement);
  }
  removeMessageNoTasks()
}

function insertOverlay() {
  document.body.insertAdjacentHTML("beforeend", getOverlayTemplate());
}


function toggleOverlay() {
  let overlayBg = document.getElementById("overlayBg");
  let overlay = document.getElementById("addTaskOverlay");
  if (!overlay || !overlayBg) {
    insertOverlay();
    toggleOverlay();
    return;
  }
  overlay.classList.toggle("d-none");
  overlayBg.classList.toggle("overlay-active");
}

function closeOverlay() {
  document.getElementById("overlayBg")?.classList.remove("overlay-active");
  document.getElementById("addTaskOverlay")?.classList.add("d-none");
}

function insertUserFeedback() {
  console.log("insertUserFeedback() wurde aufgerufen");
  let userFeedbackWrapper = document.querySelector('.user-feedback-wrapper');
  userFeedbackWrapper.innerHTML = createFeedbackOverlay();
}


function toggleUserFeedback() {
  let feedbackOverlay = document.getElementById("userFeedbackOverlay");

  // Falls das Feedback-Overlay noch nicht existiert, fügen wir es ein
  if (!feedbackOverlay) {
    insertUserFeedback();  // Falls noch nicht vorhanden, fügen wir es hinzu
    feedbackOverlay = document.getElementById("userFeedbackOverlay");  // Feedback-Overlay erneut holen
  }

  // Den Zustand des Feedback-Overlays umschalten (zeige oder verstecke)
  feedbackOverlay.classList.toggle("feedback-hidden");
}


function closeFeedbackOverlay() {
  const feedbackOverlay = document.getElementById("feedbackOverlay");

  feedbackOverlay?.classList.add("d-none");


}

// function toggleUserFeedback() {
//   let feedbackOverlay = document.getElementById("userFeedbackOverlay");
//   if (!feedbackOverlay) {
//       insertUserFeedback();
//       feedbackOverlay = document.getElementById("userFeedbackOverlay");
//   }
//   feedbackOverlay.classList.toggle("feedback-hidden");
// }


function removeMessageNoTasks() {
  //console.log("LSDAF");
  const taskCategoryContentRef = document.getElementsByClassName("task-wrapper");
  const noTaskMessagesContentRef = document.getElementsByClassName("no-task-message-container");
  let taskCard = document.querySelector(".task-card");
  for (let indexMessage = 0; indexMessage < taskCategoryContentRef.length; indexMessage++) {
    //console.log(taskCategoryContentRef[indexMessage]);
    if (taskCategoryContentRef[indexMessage].contains(taskCard)) {
      //console.log(indexMessage)
      noTaskMessagesContentRef[indexMessage].classList.add("d-none");
    } else {
      noTaskMessagesContentRef[indexMessage].classList.remove("d-none");
    }
  }
}