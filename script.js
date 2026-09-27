// --- Element Selection ---
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const errorMessage = document.getElementById("errorMessage");

// --- Task Creation ---
function createTaskElement(text) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = text;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete-btn";

  li.appendChild(span);
  li.appendChild(deleteBtn);

  // Task 2: Toggle completed class on click (but not on delete button)
  li.addEventListener("click", (event) => {
    if (!event.target.classList.contains("delete-btn")) {
      li.classList.toggle("completed");
    }
  });

  return li;
}

// --- Task Counter (Task 4) ---
function updateTaskCount() {
  const count = taskList.children.length;
  taskCount.textContent = count === 0 ? "No tasks yet." : `${count} tasks`;
}

// --- Add Task (Tasks 1 + 5) ---
function addTask() {
  const value = taskInput.value.trim();

  // Task 5: Validate — block empty input
  if (value === "") {
    errorMessage.textContent = "Please type a task before adding it.";
    return;
  }

  errorMessage.textContent = "";
  const li = createTaskElement(value);
  taskList.appendChild(li);
  taskInput.value = "";
  updateTaskCount();
}

// --- Event Listeners ---

// Task 1: Click Add button
addBtn.addEventListener("click", () => {
  addTask();
});

// Task 1: Press Enter key
taskInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

// Task 3: Delete via event delegation on parent
taskList.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-btn")) {
    event.target.closest("li").remove();
    updateTaskCount();
  }
});

// Task 6 Extension: Clear all completed tasks
const clearBtn = document.createElement("button");
clearBtn.textContent = "Clear Completed";
clearBtn.style.cssText = "margin-top:12px; padding:6px 14px; border:none; border-radius:6px; background:#6c757d; color:#fff; cursor:pointer; font-size:13px;";
document.querySelector(".todo-app").appendChild(clearBtn);

clearBtn.addEventListener("click", () => {
  const completed = taskList.querySelectorAll("li.completed");
  completed.forEach(li => li.remove());
  updateTaskCount();
});

// Initial count render
updateTaskCount();
