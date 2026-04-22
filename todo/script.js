document.addEventListener('DOMContentLoaded', function() {
    const todoInput = document.getElementById('todoInput');
    const addBtn = document.getElementById('addBtn');
    const todoList = document.getElementById('todoList');

    // Load todos from localStorage
    loadTodos();

    addBtn.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTodo();
        }
    });

    function addTodo() {
        const text = todoInput.value.trim();
        if (text === '') return;

        const li = document.createElement('li');
        li.className = 'todo-item';
        li.innerHTML = `
            <input type="checkbox" onchange="toggleTodo(this)">
            <span>${text}</span>
            <button class="delete-btn" onclick="deleteTodo(this)">Delete</button>
        `;
        todoList.appendChild(li);
        todoInput.value = '';
        saveTodos();
    }

    function toggleTodo(checkbox) {
        const li = checkbox.parentElement;
        const span = li.querySelector('span');
        if (checkbox.checked) {
            li.classList.add('completed');
        } else {
            li.classList.remove('completed');
        }
        saveTodos();
    }

    function deleteTodo(btn) {
        btn.parentElement.remove();
        saveTodos();
    }

    function saveTodos() {
        const todos = [];
        todoList.querySelectorAll('li').forEach(li => {
            const checkbox = li.querySelector('input[type="checkbox"]');
            const span = li.querySelector('span');
            todos.push({
                text: span.textContent,
                completed: checkbox.checked
            });
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            li.innerHTML = `
                <input type="checkbox" ${todo.completed ? 'checked' : ''} onchange="toggleTodo(this)">
                <span>${todo.text}</span>
                <button class="delete-btn" onclick="deleteTodo(this)">Delete</button>
            `;
            todoList.appendChild(li);
        });
    }
});
