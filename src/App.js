import React, {useState, useEffect} from 'react';
import './App.css';
//importing components
import Footer from './components/footer';
import TodoList from './components/todolist';

function App() {


  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [count, setCount] = useState("");

  useEffect(() =>{
    filterHandler();
  }, [todos, status])

  useEffect(() =>{
    setCount(todos.filter(todo => todo.completed ===false).length);
  }, [todos, filteredTodos, status])

  const filterHandler = () => {
    switch(status){
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed ===true));
        break;
      case 'active':
        setFilteredTodos(todos.filter(todo => todo.completed ===false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  }
  return (
    <div className="todo-app__root">
      <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <title>TODO APP in pure JS</title>
      </head>
      <header class="todo-app__header">
                  <h1 class="todo-app__title">todos</h1>
      </header>
      <TodoList inputText = {inputText} todos={todos} setTodos={setTodos} setInputText = {setInputText} filteredTodos={filteredTodos}/>
      <Footer setStatus={setStatus} count={count} todos={todos} setTodos={setTodos}
      //{`${todos.length === 0 ? '' : 'notseen'}`}
      />
    </div>
  );
}

export default App;
