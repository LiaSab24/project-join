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

  if (overlayBg && overlay) {
      overlay.classList.toggle("d-none");
      overlayBg.classList.toggle("d-none");
  } else {
      insertOverlay();
      toggleOverlay();
  }
}

function closeOverlay() {
  document.getElementById("overlayBg")?.classList.add("d-none");
  document.getElementById("addTaskOverlay")?.classList.add("d-none");
}
