const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
let todos = JSON.parse(localStorage.getItem("todos")) || [];

renderTodos();
todoForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const todoText = todoInput.value.trim();
  if (todoText === "") {
    alert("Vui lòng nhập việc cần làm!");
    return;
  }

  const newTodo = {
    id: Math.ceil(Math.random()*100), 
    text: todoText
  };

  todos.push(newTodo);
  saveTodos();
  renderTodos();

  todoInput.value = "";
});

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  saveTodos();
  renderTodos();
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
  todoList.innerHTML = "";

  todos.forEach(todo => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${todo.text}
      <button class="delete-btn" onclick="deleteTodo(${todo.id})">Xóa</button>
    `;

    todoList.appendChild(li);
  });
}
