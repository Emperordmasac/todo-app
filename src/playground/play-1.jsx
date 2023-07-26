import "./App.css";

import { useEffect, useState, useMemo } from "react";

function App() {
  // -- state management
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  //  -- to handle inputs
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // -- function to add task to todo list
  const handleAddTask = () => {
    if (inputValue.trim() !== "") {
      setTasks((prevTasks) => [
        ...prevTasks,
        { id: Date.now(), text: inputValue, completed: false },
      ]);
      setInputValue("");
    }
  };

  // -- function to handle the status of the task
  const handleToggleTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // -- funcion to delete a particular task
  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  // -- check for re rendering
  useEffect(() => {
    console.log("i don re-render due to useEffect");
  }, []);

  const memoizedTasks = useMemo(() => tasks, [tasks]);

  return (
    <div>
      {console.log("i don re-render due to component mounting")}
      <h1>Todo App</h1>
      <div>
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      {/* causes re rendering on every input */}
      {/* <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{ textDecoration: task.completed ? "line-through" : "none" }}
          >
            {task.text}
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleTask(task.id)}
            />
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul> */}

      <ul>
        {memoizedTasks.map((task) => (
          <li
            key={task.id}
            style={{ textDecoration: task.completed ? "line-through" : "none" }}
          >
            {task.text}
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleTask(task.id)}
            />
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
