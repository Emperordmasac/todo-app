/* eslint-disable react/prop-types */
// TodoContext.js
import { createContext, useState, useCallback, useEffect } from "react";

const TodoContext = createContext();

const TodoProvider = ({ children }) => {
  const initalTodos = JSON.parse(localStorage.getItem("todos")) || [];
  const [todos, setTodos] = useState(initalTodos);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = useCallback((text, dueDate) => {
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: Date.now(), text, completed: false, dueDate },
    ]);
  }, []);

  const handleToggleTodo = useCallback((todoId) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const handleDeleteTodo = useCallback((todoId) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
  }, []);

  const handleEditTodo = useCallback((todoId, newText) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId ? { ...todo, text: newText } : todo
      )
    );
  }, []);

  const completedTodos = todos.filter((todo) => todo.completed);
  const incompleteTodos = todos.filter((todo) => !todo.completed);

  return (
    <TodoContext.Provider
      value={{
        todos,
        completedTodos,
        incompleteTodos,
        handleAddTodo,
        handleToggleTodo,
        handleDeleteTodo,
        handleEditTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export { TodoContext, TodoProvider };
