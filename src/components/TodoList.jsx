/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */

import { useContext } from "react";
import TodoItem from "./TodoItem";
import { TodoContext } from "../context/TodoContext";

const TodoList = ({ showCompleted }) => {
  const { incompleteTodos, completedTodos } = useContext(TodoContext);

  const todosToShow = showCompleted ? completedTodos : incompleteTodos;

  return (
    <div>
      {todosToShow.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
