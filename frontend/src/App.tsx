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

  const [dark, setDark] = useState(false);
  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [dark]);

  const handleToggleTask = async (id: number) => {
    const updated = await toggleTaskCompleted(id);
    setTasks((prev) => prev.map((task) => (task.id === id ? updated : task)));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white px-4 py-8">
      <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white min-h-screen px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* ダークモード切り替えボタン */}
          <div className="flex justify-end mb-4">
            <button
              className="px-3 py-1 border rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              onClick={() => setDark(!dark)}
            >
              {dark ? "☀️ ライトモード" : "🌙 ダークモード"}
            </button>
          </div>

          {/* タイトル */}
          <h1 className="text-3xl font-bold mb-6 text-center">🗂️ タスク管理</h1>

          {/* メインセクション */}
          <section className="bg-white dark:bg-gray-800 p-6 rounded shadow border dark:border-gray-600">
            <TaskForm onAdd={handleAddTask} />
            <TaskList tasks={tasks} onToggle={handleToggleTask} />
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
