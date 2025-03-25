import { useEffect, useState } from "react";
import { getTasks, createTask, toggleTaskCompleted } from "./api/tasks";
import { Task } from "./types";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    getTasks()
      .then(setTasks)
      .catch((err) => console.error("タスク取得失敗:", err));
  }, []);

  const handleAddTask = async (description: string) => {
    const created = await createTask(description);
    setTasks((prev) => [...prev, created]);
  };

  const handleToggleTask = async (id: number) => {
    const updated = await toggleTaskCompleted(id);
    setTasks((prev) => prev.map((task) => (task.id === id ? updated : task)));
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">🗂️ タスク管理</h1>
        <TaskForm onAdd={handleAddTask} />
        <TaskList tasks={tasks} onToggle={handleToggleTask} />
      </div>
    </div>
  );
}

export default App;
