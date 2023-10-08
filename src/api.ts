import { Task } from "./types";

export const getAllTodos = async (): Promise<Task[]> => {
  /**
   * SSR cache:"no-store" 頻繁に更新される
   * SSG cache:"force-cache" 頻繁に更新されない
   * SSR or CSR cache: "no-store"
   * SSR:CSRより初回読み込みが速い
   * 　2回目以降の読み込みはCSRのほうが速いかも
   * */
  const res = await fetch(`http://localhost:3001/tasks`, { cache: "no-store" });
  const todos = res.json();
  return todos;
};

export const addTodo = async (todo: Task): Promise<Task> => {
  const res = await fetch(`http://localhost:3001/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  const newTodo = res.json();
  return newTodo;
};