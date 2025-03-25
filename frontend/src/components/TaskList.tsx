import { Task } from "../types";

type Props = {
  tasks: Task[];
};

export default function TaskList({ tasks }: Props) {
  if (tasks.length === 0) {
    return <p>タスクはまだありません。</p>;
  }

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          {task.completed ? "✅" : "⬜️"} {task.description}
        </li>
      ))}
    </ul>
  );
}
