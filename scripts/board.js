const BASEURL = "https://join-424-project-default-rtdb.europe-west1.firebasedatabase.app/";


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




function closeFeedbackOverlay() {
  let feedbackOverlay = document.getElementById("feedbackOverlay");
  if (feedbackOverlay) {
      feedbackOverlay.remove();
  }
}

function insertUserFeedback() {
  let existingOverlay = document.getElementById(".user-feedback-wrapper");

  if (!existingOverlay) {
      document.body.insertAdjacentHTML("beforeend", createFeedbackOverlay());
  }
}

function toggleUserFeedback() {
  let feedbackOverlay = document.getElementById("userFeedbackOverlay");

  if (!feedbackOverlay) {
      insertUserFeedback();
      feedbackOverlay = document.getElementById("userFeedbackOverlay");
  }

  feedbackOverlay.classList.toggle("feedback-hidden");
}

function closeFeedbackOverlay() {
  let feedbackOverlay = document.getElementById("feedbackOverlay");

  if (feedbackOverlay) {
      feedbackOverlay.remove();
  }
}
