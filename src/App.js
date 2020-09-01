import React, { useState, useEffect } from 'react';
import './App.css';
//Importing Components
import Form from './components/Form'; 
import TodoList from './components/TodoList';

function App() {
  //State stuff
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filterTodos, setFilterTodos] = useState([]);

  //RUN ONCE when the app start
  useEffect(() => {
    getLocalTodos();
  }, []);

  //Use effect
  useEffect(() => {
    // const filterHandler = () => {
    //   switch(status){
    //     case 'completed': 
    //       setFilterTodos(todos.filter(todo => todo.completed === true));
    //       break;
    //     case 'uncompleted':
    //       setFilterTodos(todos.filter(todo => todo.completed === false));
    //       break;
    //     default:
    //       setFilterTodos(todos);
    //       break;
    //   }
    // }
    filterHandler();
    saveLocalTodos();
  }, [todos, status]) 
  
  //Functions
  //de tranh loi react hook use effect has missing
  const filterHandler = () => {
    switch(status){
      case 'completed': 
        setFilterTodos(todos.filter(todo => todo.completed === true));
        break;
      case 'uncompleted':
        setFilterTodos(todos.filter(todo => todo.completed === false));
        break;
      default:
        setFilterTodos(todos);
        break;
    }
  }

  //Sava to local
  const saveLocalTodos = () => {
    if(localStorage.getItem('todos') === null){
      localStorage.setItem('todos', JSON.stringify([]));
    }else{
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }

  const getLocalTodos = () => {
    if(localStorage.getItem('todos') === null){
      localStorage.setItem('todos', JSON.stringify([]));
    }else{
      let todoLocal = JSON.parse(localStorage.getItem('todos'));
      setTodos(todoLocal);
    }
  }

  return (
    <div className="App">
      <header>
        <h1>Khoa's Todo List</h1>
      </header>
      <Form 
        inputText = {inputText} 
        todos = {todos} 
        setTodos = {setTodos} 
        setInputText = {setInputText} 
        setStatus = {setStatus}        
      />
      <TodoList 
        setTodos={setTodos} 
        todos={todos}
        filterTodos = {filterTodos}
      />

    </div>
  );
}

export default App;
