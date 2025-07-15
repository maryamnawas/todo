document.addEventListener("DOMContentLoaded", () => {
    let todos = [];
    // let todos = JSON.parse(localStorage.getItem("todos")) || [];
    
    const todoForm = document.getElementById("todo-form");
    const todoInput = document.getElementById("todo-input");
    const todoList = document.getElementById("todo-list")

    function saveTodos() {
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    function renderTodos() {
        //empty list
        todoList.innerHTML = "";
         // Loop through each todo item in the todos array
        todos.forEach((todo, index) => {
            const li = document.createElement("li");
            li.className = todo.completed ? "completed" : "";
            
            const span = document.createElement("span");
            span.textContent = todo.text;
            span.contentEditable = false;

            // Mark as completed
            const completeBtn = document.createElement("button");
            completeBtn.textContent = todo.completed ? "Undo" : "Complete";
            completeBtn.className = "complete-btn";
            completeBtn.addEventListener("click", () => {
                todo.completed = !todo.completed;
                saveTodos();
                renderTodos();
            });

            // Edit todo
            const editBtn = document.createElement("button");
            editBtn.textContent = "Edit";
            editBtn.className = "edit-btn";

            editBtn.addEventListener("click", () => {
                span.contentEditable = true;
                span.focus();
            });

            // Save edited todo on blur
            span.addEventListener("blur", () => {
                if (span.contentEditable === "true") {
                    todo.text = span.textContent;
                    span.contentEditable = false;
                    saveTodos();
                    renderTodos();
                }
            });

            // Delete todo
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.className = "delete-btn";
            deleteBtn.addEventListener("click", () => {
                todos.splice(index, 1);
                saveTodos();
                renderTodos();
            });
            
            //Add all the elements to the list item
            const actions = document.createElement("div");
            actions.className = "actions";
            actions.appendChild(completeBtn);
            actions.appendChild(editBtn);
            actions.appendChild(deleteBtn);
            li.appendChild(span);
            li.appendChild(actions);


            //Add the <li> element to the list in the DOM
            todoList.appendChild(li);
        });
    }

    todoForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Get the value from the input field
        const text = todoInput.value.trim();
        if (text) {
            todos.push({ text, completed: false });
            saveTodos();
            renderTodos();
            todoInput.value = "";
        }
    });

    renderTodos();
})