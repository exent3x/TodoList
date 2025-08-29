"use client";
import Image from "next/image";
import styles from "./TodoItem.module.css";

interface TodoItemProps{
    title: string;
    completed:boolean;
    toggle?:() => void;
    deleteItem?:() => void;
}
export function TodoItem(
    {
        title,
        completed,
        toggle,
        deleteItem
    }:TodoItemProps
)
{
    return(
    <div className={styles.root}>
      <input
        className={styles.checkbox}
        type="checkbox"
        checked={completed}
        onChange={toggle}
      />
      <span className={styles.text}>{title}</span>
      <Image
        className={styles.icon}
        onClick={deleteItem}
        src="/trash.svg"
        alt="delete icon"
        height={24}
        width={24}
      />
    </div>
    );
}