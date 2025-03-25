import { useEffect, useState } from "react";

type Task = {
  id: number;
  description: string;
  completed: boolean;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  // GET /tasks
  useEffect(() => {
    fetch("http://localhost:3000/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Failed to fetch tasks:", err));
  }, []);

  // POST /tasks
  const handleAddTask = async () => {
    if (!newTask.trim()) return;

    const response = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description: newTask }),
    });

    const created = await response.json();
    setTasks((prev) => [...prev, created]);
    setNewTask("");
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>タスクリスト</h1>

      {/* 入力フォーム */}
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="タスクを入力"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAddTask} style={{ marginLeft: "0.5rem" }}>
          追加
        </button>
      </div>

      {/* タスク表示 */}
      {tasks.length === 0 ? (
        <p>タスクはまだありません。</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              {task.completed ? "✅" : "⬜️"} {task.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
