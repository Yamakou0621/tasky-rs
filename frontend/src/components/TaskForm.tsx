import { useState } from "react";

type Props = {
  onAdd: (description: string) => void;
};

export default function TaskForm({ onAdd }: Props) {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (!input.trim()) return;
    onAdd(input);
    setInput("");
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        placeholder="タスクを入力"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleSubmit} style={{ marginLeft: "0.5rem" }}>
        追加
      </button>
    </div>
  );
}
