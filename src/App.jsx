import "./App.css";

import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { TodoProvider } from "./context/TodoContext";

const App = () => {
  return (
    <TodoProvider>
      <div>
        <h1>Todo App</h1>
        <TodoForm />
        <h2>Incomplete Todos</h2>
        <TodoList showCompleted={false} />
        <h2>Completed Todos</h2>
        <TodoList showCompleted />
      </div>
    </TodoProvider>
  );
};

export default App;
