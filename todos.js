var todos = [];

var todoElem = document.querySelector('#app-todo ul');
var newTodoElem = document.querySelector('#newtodo');
var btnNewTodoElemn = document.querySelector('#btnAdd');

btnNewTodoElemn.onclick = addTodo;

function renderTodoList(){
    saveOnLocalStorage();
    todoElem.innerHTML = '';

    for (const todo of todos) {
        var liElement = document.createElement('li');
        var liTextElem = document.createTextNode(todo.description);

        
        if(todo.done){
            liElement.style.textDecoration = 'line-through'
        } else {
            var aHrefElem = document.createElement('a');
            aHrefElem.setAttribute('href','#');
            var index = todos.indexOf(todo);
            aHrefElem.setAttribute('onclick','markAsDone(' +index +')');
            aHrefElem.style.paddingLeft = '5px';
            var aText = document.createTextNode('mark as done');
            aHrefElem.appendChild(aText);
        }

        liElement.appendChild(liTextElem);
        if(todo.done === false){
            liElement.appendChild(aHrefElem);
        }
        todoElem.appendChild(liElement);
    }
}

function markAsDone(index){
    todos[index].done = true;

    renderTodoList();
}

function addTodo(){
    var todoTxt = newTodoElem.value;

    if(validateNewTodo(todoTxt)){
        todos.push({
            done : false,
            description : todoTxt
        });
        newTodoElem.value = '';
        renderTodoList();
        clearValidationMessage();
    }
}

function showValidation(message){
    var messageElemen = document.getElementById('message-validator');
    messageElemen.innerText = message;
}

function clearValidationMessage(){
    var messageElemen = document.getElementById('message-validator');
    messageElemen.innerText = '';
}

function validateNewTodo(newTodo){
    if(newTodo === ''){
        showValidation('TODO should not be empty !');
        return false;
    } else if(findTodoByDescription(newTodo) !== null){
        showValidation('TODO already added !');
        return false;        
    }

    return true;
}

function findTodoByDescription(description){
    for(const todo of todos){
        if(todo.description === description){
            return todo;
        }
    }

    return null;
}

function saveOnLocalStorage(){
    localStorage.setItem('todos', JSON.stringify(todos));
}

function findTodoFromLocalStorage(){
    return localStorage.getItem('todos');
}

function init(){
    savedTodos = findTodoFromLocalStorage();

    if(savedTodos !== null){
        todos = JSON.parse(savedTodos);
    }

    renderTodoList();
}

init();