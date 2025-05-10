const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const filterButtons = document.querySelectorAll('#filters button');

let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all';

// Render list berdasarkan filter
function renderTodos() {
  list.innerHTML = '';

  const filtered = todos.filter(todo => {
    if (currentFilter === 'active') return !todo.completed;
    if (currentFilter === 'completed') return todo.completed;
    return true;
  });

  filtered.forEach((todo, index) => {
    const li = document.createElement('li');
li.className = "flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow-sm";

const checkbox = document.createElement('input');
checkbox.type = 'checkbox';
checkbox.checked = todo.completed;
checkbox.className = "mr-2";
checkbox.addEventListener('change', () => {
  todo.completed = checkbox.checked;
  saveAndRender();
});

const span = document.createElement('span');
span.textContent = todo.text;
span.className = `flex-1 ml-2 ${todo.completed ? 'line-through text-gray-400' : ''}`;

// Tombol edit
const editBtn = document.createElement('button');
editBtn.textContent = 'Edit';
editBtn.className = "text-sm text-blue-500 hover:underline mr-2";
editBtn.addEventListener('click', () => {
  const newText = prompt('Edit tugas:', todo.text);
  if (newText !== null && newText.trim() !== '') {
    todo.text = newText.trim();
    saveAndRender();
  }
});

// Tombol hapus
const deleteBtn = document.createElement('button');
deleteBtn.textContent = 'Hapus';
deleteBtn.className = "text-sm text-red-500 hover:underline";
deleteBtn.addEventListener('click', () => {
  todos.splice(todos.indexOf(todo), 1);
  saveAndRender();
});

li.appendChild(checkbox);
li.appendChild(span);
li.appendChild(editBtn);
li.appendChild(deleteBtn);
list.appendChild(li);
  });
}

function saveAndRender() {
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos();
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const newTodo = input.value.trim();
  if (newTodo !== '') {
    todos.push({ text: newTodo, completed: false });
    input.value = '';
    saveAndRender();
  }
});

// Filter tombol
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    currentFilter = button.dataset.filter;
    renderTodos();
  });
});

// Render awal
renderTodos();
