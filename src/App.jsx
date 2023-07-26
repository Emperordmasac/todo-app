import "./App.css";

// App.js
import { useState, useCallback, useMemo } from "react";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";

const App = () => {
  const [todos, setTodos] = useState([]);

  const handleAddTodo = useCallback((text) => {
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: Date.now(), text, completed: false },
    ]);
  }, []);

  const handleToggleTodo = useCallback((todoId) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

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
