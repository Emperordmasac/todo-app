/* eslint-disable react/prop-types */
// TodoContext.js
import { createContext, useState, useCallback, useEffect } from "react";
import axios from "axios";

const TodoContext = createContext();

const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/todos");
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleAddTodo = useCallback(async (text, dueDate) => {
    try {
      const response = await axios.post("http://localhost:5000/todos", {
        text,
        completed: false,
        dueDate,
      });
      setTodos((prevTodos) => [...prevTodos, response.data]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  }, []);

  const handleToggleTodo = useCallback(
    async (todoId) => {
      try {
        const todoToUpdate = todos.find((todo) => todo.id === todoId);
        const response = await axios.patch(
          `http://localhost:5000/todos/${todoId}`,
          { completed: !todoToUpdate.completed }
        );
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === todoId
              ? { ...todo, completed: response.data.completed }
              : todo
          )
        );
      } catch (error) {
        console.error("Error toggling todo:", error);
      }
    },
    [todos]
  );

  const handleDeleteTodo = useCallback(async (todoId) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${todoId}`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  }, []);

  const handleEditTodo = useCallback(async (todoId, newText) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/todos/${todoId}`,
        { text: newText }
      );
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === todoId ? { ...todo, text: response.data.text } : todo
        )
      );
    } catch (error) {
      console.error("Error editing todo:", error);
    }
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
