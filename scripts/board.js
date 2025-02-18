const BASEURL = "https://join-424-project-default-rtdb.europe-west1.firebasedatabase.app/";


function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("text")
  var draggedElement = document.getElementById(data);
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

function insertUserFeedback() {
  const userFeedbackWrapper = document.querySelector('.user-feedback-wrapper');
  userFeedbackWrapper.innerHTML = createFeedbackOverlay();
}


function toggleUserFeedback() {;
  let feedbackOverlay = document.getElementById("userFeedbackOverlay");
  if (!feedbackOverlay) {
      insertUserFeedback();
      feedbackOverlay = document.getElementById("userFeedbackOverlay");
  }
  feedbackOverlay.classList.toggle("d-none");
}

function closeOverlay() {
  document.getElementById("feedbackOverlay")?.classList.remove("overlay-active");
  document.getElementById("feedbackOverlay")?.classList.add("d-none");
}

// /**
//  * Open a user story by ID.
//  * 
//  * @param {string} id - The ID of the user story to open.
//  */
// function openUserStory(id) {
//   setupOverlayAndContainer();
//   clearContainerContent();
//   if (isValidFirebaseTasks(firebaseTasks)) {
//       const tasksData = firebaseTasks[0].dataExtracted;
//       processTasksData(id, tasksData);
//       addOutsideClickListener();
//   } else {
//       console.error("firebaseTasks or firebaseTasks[0].dataExtracted is undefined or null.");
//   }
// }

// /**
// * Setup the overlay and container for the user story.
// */
// function setupOverlayAndContainer() {
//   let overlay = document.getElementById('overlay');
//   let boardBodyContainer = document.querySelector('.boardBodyContainer');
//   boardBodyContainer.style.overflow = "hidden";
//   overlay.classList.add("overlay");
// }

// /**
// * Clear the content of the user story container.
// */
// function clearContainerContent() {
//   const container = document.getElementById('userStoryWindow');
//   container.innerHTML = ''; // Clear previous content
// }