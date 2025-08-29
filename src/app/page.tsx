import { TodoList } from "@/app/components/TodoList";
import type { Todo } from "@/app/types";
import styles from "./page.module.css";

export default async function Page() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos?%20_start=0&_limit=5",
  );

  const data: Todo[] = await response.json();

  const serialized: Record<string, Omit<Todo, "id">> = {};

  data.forEach(({ id, title, completed }) => {
    serialized[id] = { title, completed };
  });

  return (
    <div className={styles.root}>
      <h1>Список задач</h1>
      <TodoList initialTodos={serialized} />
    </div>
  );
}