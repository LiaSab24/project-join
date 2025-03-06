
function getEditTaskTemplate() {
    return `
    <div class="userStoryBodyContainer" id="editTaskOverlay">
        <div>
            <div>
                <button class="close-btn edit-btn" onclick="closeOverlay(event)">
                    <img src="/assets/icons/close.png" alt="Close-Icon">
                </button>
            </div>
            <div class="overlay-edit-content overlay-content">
                <div class="edit-grid form-grid">
                    <div class="edit-column form-column">
                        <label class="edit-hero">Title</label>
                        <input id="taskTitle" type="text" placeholder="#">
                        
                        <label class="edit-hero">Description</label>
                        <textarea id="taskDescription" rows="3" placeholder="Enter a description" style="height: 120px;"></textarea>
                    
                    </div>
                    <div class="divider-edit divider-column"></div>
                    <div class="form-column edit-column">
                        <label class="edit-hero">Due Date</label>
                        <input id="taskDueDate" type="date" required placeholder="dd/mm/yy">
                        
                        <label class="edit-hero">Priority</label>
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
                        
                        <label class="edit-hero">Category</label>
                        <select id="taskCategory">
                            <option>Select task category</option>
                            <option>User Story</option>
                            <option>Technical Task</option>
                        </select>

                        <label class="edit-hero">Subtasks</label>
                        <div class="subtask-container">
                            <input id="newSubtask" type="text" placeholder="Add new subtask">
                            <button class="subtask-add-btn">+</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="userStoryEditOkButtonContainer">
                <button class="userStoryEditOkButton" type="button" onclick="saveTaskChanges(event)">
                    OK <img class="check-image" src="/assets/icons/check.png" alt="check">
                </button>
            </div>
        </div>
    </div>
    `;
}
