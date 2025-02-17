function getOverlayTemplate() {
    return `
    <div id="overlayBg" class="overlay-wrapper d-none" onclick="closeOverlay()"></div>
    <div id="addTaskOverlay" class="add-task-overlay d-none">
      <img src="/assets/img/required.png" alt="Required Field Warning" class="error-image">
      <div class="overlay-header">
          <h1>Add Task</h1>
          <button class="close-btn" onclick="closeOverlay()"><img src="/assets/icons/close.png" alt="Close-Icon"></button>
      </div>
      <div class="overlay-content">
          <div class="form-grid">
              <div class="form-column">
                  <label for="taskTitle">Title</label>
                  <input id="taskTitle" type="text" placeholder="Enter a title" required>
                  <label for="taskDescription">Description</label>
                  <textarea id="taskDescription" rows="3" placeholder="Enter a description" style="height: 120px;"></textarea>
                  <!-- <img class="textarea-icon" src="/assets/icons/recurso.png"> -->
                  <label for="taskAssigned">Assigned to</label>
                  <select id="taskAssigned">
                      <option>Select contacts to assign</option>
                      <option>John Doe</option>
                      <option>Jane Smith</option>
                  </select>
              </div>
              <div class="divider-column"></div>
              <div class="form-column">
                  <label for="taskDueDate">Due Date</label>
                  <input id="taskDueDate" type="date" required placeholder="dd/mm/yy">
                  <label>Priority</label>
                  <div class="prio-container">
                      <button class="prio-btn urgent" onclick="setPriority('urgent')">Urgent
                        <img src="/assets/icons/Capa-red.png">
                      </button>
                      <button class="prio-btn medium" onclick="setPriority('medium')">Medium
                        <img src="/assets/icons/Capa-yellow.png">
                      </button>
                      <button class="prio-btn low" onclick="setPriority('low')">Low
                        <img src="/assets/icons/capa-green.png">
                      </button>
                  </div>
                  <label for="taskCategory">Category</label>
                  <select id="taskCategory">
                      <option>Select task category</option>
                      <option>User Story</option>
                      <option>Technical Task</option>
                  </select>
                  <label>Subtasks</label>
                  <div class="subtask-container">
                      <input id="newSubtask" type="text" placeholder="Add new subtask">
                      <button class="subtask-add-btn">+</button>
                  </div>
              </div>
          </div>
      </div>
      <div class="overlay-actions">
          <button class="cancel-btn" >Cancel</button>
          <button class="create-btn" >
            Create Task <img src="/assets/icons/check.png" alt="Checkmark" class="check-icon">
          </button>
      </div>
    </div>
    `;
}
