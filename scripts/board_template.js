function getAddTaskOverlayTemplate() {
    return `
    <div id="overlayBg" class="overlay-wrapper d-none"></div>
    <div id="addTaskOverlay" class="add-task-overlay d-none">
      <img src="/assets/img/required.png" alt="Required Field Warning" class="error-image">
      <div class="overlay-header">
          <h1>Add Task</h1>
          <button class="close-btn" onclick="closeFeedbackOverlay()"><img src="/assets/icons/close.png" alt="Close-Icon"></button>
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

function getFeedbackOverlayTemplate() {
    return `
        <div class="feedback-overlay" id="feedbackOverlay">
        <section id="userFeedbackOverlay" class="feedback-hidden">
            <div class="feedback-header">
                <span class="feedback-badge">User Story</span>
                <button class="close-btn" onclick="closeBoardOverlay()">
                    <img src="/assets/icons/close.png" alt="Close-Icon">
                </button>
            </div>
            <h1 class="feedback-title">Kochwelt Page & Recipe Recommender</h1>
            <p class="feedback-info">Build start page with recipe recommendation.</p>
            <p class="feedback-info">Due Date: 10/05/2023</p>
            <p class="feedback-info">Priority: <span class="feedback-priority">Medium 
                <img src="/assets/icons/Prio media.png" style="padding: 0 4px;">
            </span></p>
            
            <p class="feedback-info">Assigned To:</p>
            <div class="feedback-users">
                <div class="feedback-user">
                    <div class="feedback-user-badge" style="background: green;">EM</div>
                    <span class="feedback-user-name">Emmanuel Mauer</span>
                </div>
                <div class="feedback-user">
                    <div class="feedback-user-badge" style="background: purple;">MB</div>
                    <span class="feedback-user-name">Marcel Bauer</span>
                </div>
                <div class="feedback-user">
                    <div class="feedback-user-badge" style="background: blue;">AM</div>
                    <span class="feedback-user-name">Anton Mayer</span>
                </div>
            </div>
            <p class="feedback-info">Subtasks:</p>
            <div class="feedback-subtasks">
                <div class="feedback-subtask-item"><input type="checkbox"> Implement Recipe Recommendation</div>
                <div class="feedback-subtask-item"><input type="checkbox"> 
                    <img src="/assets/icons/check-cube.png" alt="checked"> Start Page Layout
                </div>
            </div>
            <div class="feedback-actions">
                <button class="feedback-delete-btn">
                    <img src="/assets/icons/delete.png" alt="Delete-Icon"> Delete
                </button>
                <div class="divider"></div>
                <button class="feedback-edit-btn" onclick="toggleEditOverlay()">
                    <img src="/assets/icons/edit.png" alt="Edit-Icon"> Edit
                </button>
            </div>
        </section>
        </div>
    `;
}

function getFeedbackButtonTemplate() {
    return `
        <div class="feedback-task-added-overlay">
            Task added to board
            <img src="/assets/icons/Icons.png" alt="Board Icon">
        </div>
    `;
}

function getEditTaskTemplate() {
    return `
    <div class="userStoryBodyContainer" id="editTaskOverlay">
        <div class="userStoryEditContainer">
            <div class="overlay-header">
                <button class="close-btn" onclick="closeFeedbackOverlay()">
                    <img src="/assets/icons/close.png" alt="Close-Icon">
                </button>
            </div>
            <div class="overlay-edit-content overlay-content">
                <div class="edit-grid form-grid">
                    <div class="edit-column form-column">
                        <label for="taskTitle">Title</label>
                        <input id="taskTitle" type="text" placeholder="Enter a title" required>
                        
                        <label for="taskDescription">Description</label>
                        <textarea id="taskDescription" rows="3" placeholder="Enter a description" style="height: 120px;"></textarea>
                        
                        <label for="taskAssigned">Assigned to</label>
                        <select id="taskAssigned">
                            <option>Select contacts to assign</option>
                            <option>John Doe</option>
                            <option>Jane Smith</option>
                        </select>
                    </div>
                    <div class="divider-edit divider-column"></div>
                    <div class="form-column edit-column">
                        <label for="taskDueDate">Due Date</label>
                        <input id="taskDueDate" type="date" required placeholder="dd/mm/yy">
                        
                        <label>Priority</label>
                        <div class="prio-container">
                            <button class="prio-btn urgent" onclick="setPriority('urgent')">
                                Urgent <img src="/assets/icons/Capa-red.png">
                            </button>
                            <button class="prio-btn medium" onclick="setPriority('medium')">
                                Medium <img src="/assets/icons/Capa-yellow.png">
                            </button>
                            <button class="prio-btn low" onclick="setPriority('low')">
                                Low <img src="/assets/icons/capa-green.png">
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
            <!-- Buttons Section -->
            <div class="userStoryEditOkButtonContainer">
                <button class="userStoryEditOkButton" type="button" onclick="saveTaskChanges()">
                    OK <img class="check-image" src="/assets/icons/check.png" alt="check">
                </button>
            </div>
        </div>
    </div>
    `;
}
