// App.js
import "./App.css";

import { useState, useCallback, useMemo, useEffect } from "react";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import { v4 as uuidv4 } from "uuid";

// Helper function to retrieve todos from local storage
const getStoredTodos = () => {
  const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  return storedTodos;
};

// Helper function to save todos to local storage
const saveTodosToLocal = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const App = () => {
  // -- check if there is any stored todo list
  const storedTodos = getStoredTodos();

  const [todos, setTodos] = useState(storedTodos);

  const handleAddTodo = useCallback((text) => {
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: uuidv4(), text, completed: false },
    ]);
  }, []);

  const handleToggleTodo = useCallback((todoId) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  // Save todos to local storage whenever todos state changes
  useEffect(() => {
    saveTodosToLocal(todos);
  }, [todos]);

  const completedTodos = useMemo(
    () => todos.filter((todo) => todo.completed),
    [todos]
  );

  const incompleteTodos = useMemo(
    () => todos.filter((todo) => !todo.completed),
    [todos]
  );

  return (
    <div>
      <h1>Todo App</h1>
      <TodoForm onAdd={handleAddTodo} />
      <h2>Incomplete Todos</h2>
      <TodoList todos={incompleteTodos} onToggle={handleToggleTodo} />
      <h2>Completed Todos</h2>
      <TodoList todos={completedTodos} onToggle={handleToggleTodo} />
    </div>
  );
};

export default App;
