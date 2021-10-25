const todoInput = document.querySelector('.todo-app__input');
const todoList = document.querySelector('.todo-app__list');
const todoFooter = document.querySelector('.todo-app__footer');
const todoTotal = document.querySelector('.todo-app__total');
const filter = document.querySelector('.todo-app__view-buttons');
const clearAll = document.querySelector('.todo-app__clean');
var ucounter = 0;
//event listeners
todoInput.addEventListener('keydown', addTodoItem);
todoList.addEventListener('click', deleteCheck);
filter.addEventListener('click', filterTodo);
clearAll.addEventListener('click', clear);

function init(){
    if(!todoList.childElementCount) {
        todoList.style.display = 'none';
        todoFooter.style.display = 'none';
    }

    if(todoList.childElementCount!==ucounter){
        clearAll.style.visibility = 'visible';
    }
    else clearAll.style.visibility = 'hidden';
}
init();
//function

function addTodoItem(event){

    if(event.keyCode === 13){
        event.preventDefault();
        todoList.style.display = 'inline';
        todoFooter.style.display = 'flex';
        /*const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo-app__list");*/

        const newTodo = document.createElement('li');
        newTodo.classList.add("todo-app__item");
        //todoDiv.appendChild(newTodo);

        const checkbox = document.createElement('div');
        checkbox.classList.add("todo-app__checkbox");
        newTodo.appendChild(checkbox);
        const check = document.createElement('input');
        check.setAttribute('id', todoList.childElementCount);
        check.setAttribute('type', 'checkbox');
        checkbox.appendChild(check);
        const checkshow = document.createElement('label');
        checkshow.setAttribute('for', todoList.childElementCount)
        checkbox.appendChild(checkshow);

        const newTodoDetails = document.createElement('h1')
        newTodoDetails.classList.add("todo-app__item-details");
        newTodoDetails.innerHTML = todoInput.value;
        newTodo.appendChild(newTodoDetails);

        const deleteItem = document.createElement('img');
        deleteItem.setAttribute('src','./img/x.png');
        deleteItem.classList.add("todo-app__item-x")
        newTodo.appendChild(deleteItem);

        todoList.appendChild(newTodo);
        todoInput.value = "";
        ucounter++;
        todoTotal.innerHTML = `${ucounter} left`;
        init();

    }
}

function deleteCheck(event){
    const item = event.target;
    //delete
    if(item.classList[0] === 'todo-app__item-x'){
        const todo = item.parentElement;
        todo.classList.add("fall");
        todo.addEventListener('transitionend',function(){
            todo.remove();
            init();
        });
        if(todo.classList.contains("completed")) ;
        else ucounter--;
        todoTotal.innerHTML = `${ucounter} left`;
        init();


    }
    //check
    if(item.tagName.toLowerCase() === 'input'){
        const checkbox = item.parentElement;
        const todo = checkbox.parentElement;
        todo.classList.toggle("completed");
        if(todo.classList.contains("completed")) ucounter--;
        else ucounter++;

        todoTotal.innerHTML = `${ucounter} left`;
        init();

    }

}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
            case "active":
                if(todo.classList.contains("completed")){
                    todo.style.display = "none";
                }else{
                    todo.style.display = "flex";
                }
                break;
        }
    });
}

function clear(e){

    if(e.target.value==='clear'){
        /*const todos = todoList.childNodes;
        todos.forEach(function(todo){
            if(todo.classList.contains("completed")){
                todo.remove();
            }else;

        })*/
        const removeElements = (elms) => elms.forEach(el => el.remove());
        removeElements( document.querySelectorAll(".completed") );
        init();


    }
}
//console.log("a");