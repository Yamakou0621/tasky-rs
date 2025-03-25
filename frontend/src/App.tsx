import { useEffect, useState } from "react";
import { getTasks, createTask } from "./api/tasks";
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
    if (!description.trim()) return;
    try {
      const created = await createTask(description);
      setTasks((prev) => [...prev, created]);
    } catch (err) {
      console.error("タスク追加失敗:", err);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>タスクリスト</h1>
      <TaskForm onAdd={handleAddTask} />
      <TaskList tasks={tasks} />
    </div>
  );
}

export default App;
