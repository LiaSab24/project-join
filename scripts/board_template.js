function getTaskCardTemplate(id, category, title, description, progress, subtasks, assignees) {
    return `
    <div class="task-card" id="${id}" draggable="true" ondragstart="drag(event)">
        <div class="task-badge">${category}</div>
        <div class="task-title">${title}</div>
        <div class="task-description">${description}</div>
        <div class="task-progress">
            <div class="progress-bar">
                <div class="progress-bar-fill" style="width: ${progress}%;"></div>
            </div>
            <span>${subtasks.completed}/${subtasks.total} Subtasks</span>
        </div>
        <div class="task-assignees">
            ${assignees.map(name => `<div class="assignee">${name}</div>`).join('')}
        </div>
    </div>
    `;
}



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

function getBoardUserStoryOverlayTemplate() {
    return `
        <div id="overlayBg" class="overlay-wrapper d-none" onclick="closeBoardUserStoryOverlay()"></div>
        <div id="boardUserStoryOverlay" class="overlay d-none">
            <section>
                <div class="overlay-header">
                    <span class="badge">User Story</span>
                    <button class="close-btn" onclick="closeBoardUserStoryOverlay()">
                        <img src="/assets/icons/close.png" alt="Close-Icon">
                    </button>
                </div>
                <h1 class="task-title">Kochwelt Page & Recipe Recommender</h1>
                <p class="task-info">Build start page with recipe recommendation.</p>
                <p class="task-info">Due Date: 10/05/2023</p>
                <p class="task-info">Priority: 
                    <span class="priority">Medium 
                        <img src="/assets/icons/Prio media.png" style="padding: 0 4px;">
                    </span>
                </p>
                
                <p class="task-info">Assigned To:</p>
                <div class="assigned-users">
                    <div class="assigned-user">
                        <div class="user-badge" style="background: green;">EM</div>
                        <span class="user-name">Emmanuel Mauer</span>
                    </div>
                    <div class="assigned-user">
                        <div class="user-badge" style="background: purple;">MB</div>
                        <span class="user-name">Marcel Bauer</span>
                    </div>
                    <div class="assigned-user">
                        <div class="user-badge" style="background: blue;">AM</div>
                        <span class="user-name">Anton Mayer</span>
                    </div>
                </div>
                
                <p class="task-info">Subtasks:</p>
                <div class="subtasks">
                    <div class="subtask-item">
                        <input type="checkbox"> Implement Recipe Recommendation
                    </div>
                    <div class="subtask-item">
                        <input type="checkbox"> 
                        <img src="/assets/icons/check-cube.png" alt="checked"> Start Page Layout
                    </div>
                </div>
                <div class="actions">
                    <button class="delete-btn">
                        <img class="delete-btn" src="/assets/icons/delete.png" alt="Delete-Icon"> Delete
                    </button>
                    <button class="edit-btn">
                        <img class="edit-btn" src="/assets/icons/edit.png" alt="Edit-Icon"> Edit
                    </button>
                </div>
            </section>
        </div>
    `;
}
