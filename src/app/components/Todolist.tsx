"use client";
import { useEffect, useLayoutEffect, useState } from "react";
import { type Filter, TodoFilter } from "@/app/components/TodoFilter";
import type { Todo } from "@/app/types";
import { TodoItem } from "./TodoItem";
import styles from "./TodoList.module.css";

type Todos = Record<string, Omit<Todo, "id">>;

interface TodoListProps {
  initialTodos: Todos;
}

const dataKey = "next_todos";

export function TodoList({ initialTodos }: TodoListProps) {
  const [todos, setTodos] = useState<Todos>({});
  const [filter, setFilter] = useState<Filter>("All");

  useLayoutEffect(() => {
    const localData: Todos | null = JSON.parse(
      localStorage.getItem(dataKey) || "null",
    );

    if (localData) {
      setTodos(localData);
      return;
    }

    setTodos(initialTodos);
  }, [initialTodos]);

  useEffect(() => {
    localStorage.setItem(dataKey, JSON.stringify(todos));
  }, [todos]);

  const [done, all] = Object.values(todos).reduce(
    ([done, all], { completed }) => [completed ? done + 1 : done, all + 1],
    [0, 0],
  );

  const filtered = Object.entries(todos).filter(([_, { completed }]) => {
    if (filter === "All") return true;

    if (filter === "Completed") return completed;

    return !completed;
  });

  return (
    <div className={styles.root}>
      Выполнено {done} из {all}
      {!all && <span>Задач нет</span>}
      {!filtered.length && !!all && (
        <span>По вашему фильтру ничего не найдено</span>
      )}
      {filtered.map(([id, { title, completed }]) => (
        <TodoItem
          key={id}
          title={title}
          completed={completed}
          toggle={() =>
            setTodos((prevState) => ({
              ...prevState,
              [id]: { title, completed: !completed },
            }))
          }
          deleteItem={() =>
            setTodos((prevState) => {
              const newState = { ...prevState };
              delete newState[id];
              return newState;
            })
          }
        />
      ))}
      <TodoFilter
        filter={filter}
        setFilter={setFilter}
        addItem={(title: string) =>
          setTodos((prevState) => ({
            ...prevState,
            [Date.now()]: { title, completed: false },
          }))
        }
      />
    </div>
  );
}