import { Task } from "../types";

type Props = {
  tasks: Task[];
  onToggle: (id: number) => void;
};

export default function TaskList({ tasks, onToggle }: Props) {
  const incompleteTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  const renderTasks = (list: Task[], completed: boolean) => (
    <ul className="space-y-2">
      {list.map((task) => (
        <li
          key={task.id}
          className={`flex items-center gap-2 p-3 rounded border 
            ${
              completed
                ? "bg-gray-100 text-gray-500 line-through opacity-60 dark:bg-gray-700"
                : "bg-white hover:bg-blue-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
            }`}
        >
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            className="accent-blue-500 w-5 h-5"
          />
          <span>{task.description}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* 未完了タスク */}
      <section className="bg-white dark:bg-gray-800 p-4 rounded shadow border dark:border-gray-600">
        <h2 className="text-lg font-semibold mb-4">📝 未完了タスク</h2>
        {incompleteTasks.length === 0 ? (
          <p className="text-gray-400">まだありません。</p>
        ) : (
          renderTasks(incompleteTasks, false)
        )}
      </section>

      {/* 完了タスク */}
      <section className="bg-white dark:bg-gray-800 p-4 rounded shadow border dark:border-gray-600">
        <h2 className="text-lg font-semibold mb-4">✅ 完了済みタスク</h2>
        {completedTasks.length === 0 ? (
          <p className="text-gray-400">まだ完了していません。</p>
        ) : (
          renderTasks(completedTasks, true)
        )}
      </section>
    </div>
  );
}
