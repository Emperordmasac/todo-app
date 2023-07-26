/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */

import { useState, useContext } from "react";
import { TodoContext } from "../context/TodoContext";

const TodoItem = ({ todo }) => {
  const { handleToggleTodo, handleDeleteTodo, handleEditTodo } =
    useContext(TodoContext);

  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const handleToggle = () => {
    handleToggleTodo(todo.id);
  };

  const handleDelete = () => {
    handleDeleteTodo(todo.id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    handleEditTodo(todo.id, editedText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedText(todo.text);
    setIsEditing(false);
  };

  return (
    <div>
      <input type="checkbox" checked={todo.completed} onChange={handleToggle} />
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <>
          <span>{todo.text}</span>
          <button onClick={handleEdit}>Edit</button>
        </>
      )}
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default TodoItem;
