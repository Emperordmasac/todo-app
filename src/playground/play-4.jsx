import "./App.css";
import icon1 from "../public/images/icon.png";
import { useState, useCallback, useEffect } from "react";

const LOCAL_STORAGE_KEY = "tasks";

const App = () => {
  const [tasks, setTasks] = useState(
    () => JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || []
  );
  const [taskInput, setTaskInput] = useState("");

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (event) => {
    setTaskInput(event.target.value);
  };

  const handleAddTask = useCallback(() => {
    if (taskInput.trim() !== "") {
      setTasks((prevTasks) => [
        ...prevTasks,
        { id: Date.now(), text: taskInput, completed: false },
      ]);
      setTaskInput("");
    }
  }, [taskInput]);

  const handleToggleTask = useCallback((taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  const handleDeleteTask = useCallback((taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  }, []);

  return (
    <div className="container">
      <div className="todo_app">
        <div className="todo_top">
          <h2 className="todo_heading">Todo list</h2>
          <img className="todo_img" src={icon1} alt="Todo Icon" />
        </div>

        <div className="todo_cta">
          <input
            type="text"
            placeholder="Enter your task..."
            value={taskInput}
            onChange={handleInputChange}
          />

          <button type="submit" className="add_btn" onClick={handleAddTask}>
            + Add Task
          </button>
        </div>

        <ul className="todo_list">
          {tasks.map((task) => (
            <li
              key={task.id}
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
              className={`todo_list_item ${task.completed ? "checked" : ""}`}
              onClick={() => handleToggleTask(task.id)}
            >
              {task.text}
              <button
                className="delete"
                onClick={() => handleDeleteTask(task.id)}
              >
                x
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
