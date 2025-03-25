import { useState } from "react";

type Props = {
  onAdd: (description: string) => void;
};
export default function TaskForm({ onAdd }: Props) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onAdd(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        className="flex-grow border rounded px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="タスクを入力"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow"
      >
        追加
      </button>
    </form>
  );
}
