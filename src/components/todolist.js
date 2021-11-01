import React from 'react';
import Todo from './todo';

const TodoList = ({setInputText, todos, setTodos, inputText, filteredTodos}) =>{

    const inputTextHandler = (e) =>{
        setInputText(e.target.value);
    }
    const submitTodoHandler = (e) => {
        if(e.key === 'Enter'){
            e.preventDefault();
            setTodos([
                ...todos,
                {text: inputText, completed: false, id:todos.length}
            ]);
            setInputText("");
        }
    }
    return(
        <section className="todo-app__main">
            <input value={inputText} onChange={inputTextHandler} onKeyPress = {submitTodoHandler} type="text" className="todo-app__input"></input>
            <ul className="todo-app__list" id="todo-list">
                {filteredTodos.map((todo)=> (
                    <Todo key={todo.id} text={todo.text} todos={todos} setTodos={setTodos} todo={todo} />
                ))
                }
            </ul>
        </section>
    );
};
export default TodoList;