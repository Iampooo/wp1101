import React from 'react';


const Footer = ({setStatus, count, todos, setTodos}) => {
    const statusHandler = (e) => {
        setStatus(e.target.value);
    }
    const clearCompleted = () => {
        setTodos(todos.filter(todo => todo.completed ===false))
    }
    return(
        <footer className={`todo-app__footer ${todos.length ? '' : 'notseen'}`} id="todo-footer">
                <div className="todo-app__total">{count} left</div>
                <ul onClick={statusHandler}className="todo-app__view-buttons">
                    <button value="all">All</button>
                    <button value="active">Active</button>
                    <button value="completed">Complete</button>
                </ul>
                <div className="todo-app__clean">
                    <button onClick={clearCompleted} value="clear">Clear Completed</button>
                </div>
        </footer>
    )
}

export default Footer;