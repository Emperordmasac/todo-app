import "./App.css";
import icon1 from "../public/images/icon.png";
import { useState, useEffect, useCallback } from "react";

const LOCAL_STORAGE_KEY = "tasks";

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading from local storage:", error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error writing to local storage:", error);
    }
  };

  return [storedValue, setValue];
};

const App = () => {
  const [tasks, setTasks] = useLocalStorage(LOCAL_STORAGE_KEY, []);
  const [taskInput, setTaskInput] = useState("");

  useEffect(() => {
    setTasks(tasks);
  }, [tasks, setTasks]);

  const handleInputChange = useCallback((event) => {
    setTaskInput(event.target.value);
  }, []);

  const handleAddTask = useCallback(() => {
    if (taskInput.trim() !== "") {
      setTasks((prevTasks) => [
        ...prevTasks,
        { id: Date.now(), text: taskInput, completed: false },
      ]);
      setTaskInput("");
    }
  }, [taskInput, setTasks]);

  const handleToggleTask = useCallback(
    (taskId) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
      );
    },
    [setTasks]
  );

  const handleDeleteTask = useCallback(
    (taskId) => {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    },
    [setTasks]
  );

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
