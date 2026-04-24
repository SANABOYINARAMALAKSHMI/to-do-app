let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  let input = document.getElementById("taskInput");
  if (input.value.trim() === "") return;

  tasks.push({ text: input.value, completed: false });
  input.value = "";
  saveTasks();
  renderTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function setFilter(type) {
  filter = type;
  renderTasks();
}

function renderTasks() {
  let list = document.getElementById("taskList");
  let search = document.getElementById("searchInput").value.toLowerCase();
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    if (task.text.toLowerCase().includes(search)) {
      if (
        filter === "all" ||
        (filter === "completed" && task.completed) ||
        (filter === "pending" && !task.completed)
      ) {
        let li = document.createElement("li");
        li.className = task.completed ? "completed" : "";

        li.innerHTML = `
          <span onclick="toggleTask(${index})">${task.text}</span>
          <button onclick="deleteTask(${index})">❌</button>
        `;

        list.appendChild(li);
      }
    }
  });
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark"));
}

function loadTheme() {
  if (localStorage.getItem("theme") === "true") {
    document.body.classList.add("dark");
  }
}

loadTheme();
renderTasks();