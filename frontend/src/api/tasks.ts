import { Task } from "../types";

const API_BASE = "http://localhost:3000";

export async function getTasks(): Promise<Task[]> {
  const res = await fetch(`${API_BASE}/tasks`);
  return await res.json();
}

export async function createTask(description: string): Promise<Task> {
  const res = await fetch(`${API_BASE}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ description }),
  });
  return await res.json();
}
