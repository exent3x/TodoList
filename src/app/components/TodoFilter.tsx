"use client";

import { useState } from "react";
import styles from "./TodoFilter.module.css";

interface TodoFilterProps{
    addItem: (tittle:string)=>void;
    filter: Filter;
    setFilter:(filter:Filter)=>void;
}

export type Filter = "All" | "Completed" | "Active";

export function TodoFilter({ filter, addItem, setFilter }: TodoFilterProps) {
  const [value, setValue] = useState("");
  return (
    <div className={styles.root}>
      <div className={styles.radioInputs}>
        <label className={styles.radio}>
          <input
            type="radio"
            name="radio"
            onChange={() => setFilter("All")}
            checked={filter === "All"}
          />
          <span className={styles.caption}>Все</span>
        </label>
        <label className={styles.radio}>
          <input
            type="radio"
            name="radio"
            onChange={() => setFilter("Active")}
            checked={filter === "Active"}
          />
          <span className={styles.caption}>Активно</span>
        </label>
        <label className={styles.radio}>
          <input
            type="radio"
            name="radio"
            onChange={() => setFilter("Completed")}
            checked={filter === "Completed"}
          />
          <span className={styles.caption}>Выполнено</span>
        </label>
      </div>
      <div className={styles.inputContainer}>
        <input
          className={styles.input}
          placeholder="Новая задача"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
        <button
            className={styles.button}
            type="button"
            onClick={() => {
                if (!value) return;
                addItem(value);
                setValue("");
            }}
        >
            Добавить
        </button>
    </div>
  );
}