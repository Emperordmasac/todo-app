/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import React from "react";

const TodoItem = ({ todo, onToggle }) => {
  const handleToggle = () => {
    onToggle(todo.id);
  };

  return (
    <div>
      <input type="checkbox" checked={todo.completed} onChange={handleToggle} />
      <span>{todo.text}</span>
    </div>
  );
};

export default React.memo(TodoItem);
