const API_URL = 'http://localhost:3000/api/todos';

async function fetchTodos() {
    const res = await fetch(API_URL);
    const todos = await res.json();
    renderTodos(todos);
}

function renderTodos(todos) {
    const list = document.getElementById('todoList');
    list.innerHTML = '';
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.textContent = todo.text;
        li.className = todo.completed ? 'completed' : '';
        li.onclick = () => toggleTodo(todo._id);

        const del = document.createElement('button');
        del.textContent = 'Delete';
        del.onclick = (e) => {
            e.stopPropagation();
            deleteTodo(todo._id);
        };

        li.appendChild(del);
        list.appendChild(li);
    });
}

async function addTodo() {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();
    if (text === '') return;

    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
    });

    input.value = '';
    fetchTodos(); // Immediately re-fetch to update UI
}

async function deleteTodo(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchTodos();
}

async function toggleTodo(id) {
    await fetch(`${API_URL}/${id}`, { method: 'PUT' });
    fetchTodos();
}

document.addEventListener('DOMContentLoaded', fetchTodos);
// updated script.js