/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
// TodoForm.js
import { useState, useContext } from "react";
import { TodoContext } from "../context/TodoContext";

const TodoForm = () => {
  const [inputValue, setInputValue] = useState("");
  const [dueDate, setDueDate] = useState("");
  const { handleAddTodo } = useContext(TodoContext);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleDateChange = (event) => {
    setDueDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() !== "") {
      handleAddTodo(inputValue.trim(), dueDate);
      setInputValue("");
      setDueDate("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Enter a new Todo..."
      />
      <input
        type="date"
        value={dueDate}
        onChange={handleDateChange}
        placeholder="Due Date"
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default TodoForm;
