// Todo.tsx
"use client";
import { deleteTodo, editTodo } from "@/api";
import { Task } from "@/types";
import React, { useEffect, useRef, useState } from "react";

interface TodoProps {
  todo: Task;
}

const Todo = ({ todo }: TodoProps) => {
  const taskTitleInputElm = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTaskTitle, setEditedTaskTitle] = useState(todo.text);
  const handleEdit = async () => {
    setIsEditing(true);
  };
  const handleSave = async () => {
    await editTodo(todo.id, editedTaskTitle);
    todo.text = editedTaskTitle; // チラつき防止
    setIsEditing(false);
  };
  const handleDelete = async () => {
    await deleteTodo(todo.id);
  };

  useEffect(() => {
    if (isEditing) {
      taskTitleInputElm.current?.focus(); //?は存在するときだけアクセスする = オプショナルチェーン
    }
  }, [isEditing]);

  return (
    <li
      key={todo.id}
      className="flex justify-between p-4 bg-white border-l-4 border-blue-500 rounded shadow"
    >
      {isEditing ? (
        <input
          ref={taskTitleInputElm}
          type="text"
          value={editedTaskTitle}
          className="mr-2 py-1 px-2 rounded border-gray-400 border"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditedTaskTitle(e.target.value)}
        />
      ) : (
        <span>{todo.text}</span>
      )}
      <div>
        {isEditing ? (
          <button className="text-blue-600 mr-3" onClick={handleSave}>
            保存
          </button>
        ) : (
          <button className="text-green-600 mr-3" onClick={handleEdit}>
            編集
          </button>
        )}
        <button className="text-red-600" onClick={handleDelete}>
          削除
        </button>
      </div>
    </li>
  );
};

export default Todo;
