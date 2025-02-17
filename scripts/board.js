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

function insertBoardUserStoryOverlay() {
  if (!document.getElementById("boardUserStoryOverlay")) {
      document.body.insertAdjacentHTML("beforeend", getBoardUserStoryOverlayTemplate());
  }
}

function openBoardUserStoryOverlay() {
  let overlay = document.getElementById("boardUserStoryOverlay");
  let overlayBg = document.getElementById("overlayBg");

  if (!overlay || !overlayBg) {
      insertBoardUserStoryOverlay();
      openBoardUserStoryOverlay(); // Erneuter Aufruf nach dem Einfügen
      return;
  }

  overlay.classList.remove("d-none");
  overlayBg.classList.add("overlay-active");
}

function closeBoardUserStoryOverlay() {
  document.getElementById("overlayBg")?.classList.remove("overlay-active");
  document.getElementById("boardUserStoryOverlay")?.classList.add("d-none");
}
