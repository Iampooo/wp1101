import React from "react";
import x from '../img/x.png';

const Todo = ({text, todos, setTodos, key, todo}) =>{
    const deleteHandler = () => {
        setTodos(todos.filter((el) => el.id !== todo.id));
    };
    const completeHandler = () => {
        setTodos(todos.map(item =>{
            if(item.id === todo.id){
                return{
                    ...item, completed: !item.completed
                }
            }
            return item;
        }))
    }

    return(
        <li className={`todo-app__item ${todo.completed ? "completed" : ""}`}>
            <div className="todo-app__checkbox">
                <input type="checkbox" id={todo.id} checked={todo.completed}></input>
                <label for={todo.id} onClick={completeHandler}></label>
            </div>
            <h1 className="todo-app__item-details">{text}</h1>
            <img src={x} className="todo-app__item-x" alt ='background' onClick={deleteHandler}></img>
        </li>
    );
}

export default Todo;