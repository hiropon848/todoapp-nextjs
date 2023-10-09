// AddTask.tsx
"use client";
import { addTodo } from "@/api";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const AddTask = () => {
  const router = useRouter();
  const [taskTitle, setTaskTitle] = useState("");
  const [addButtonDisabled, setAddButtonDisabled] = useState(true);
  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    await addTodo({ id: uuidv4(), text: taskTitle });
    setTaskTitle("");
    router.refresh();
  };
  const taskTitleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.target.value);
    if (e.target.value === "") {
      console.log("case1");
      setAddButtonDisabled(true);
    } else {
      console.log("case2");
      setAddButtonDisabled(false);
    }
  };
  return (
    <form className="mb-4 space-y-3" onSubmit={submitHandler}>
      <input
        type="text"
        //onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTaskTitle(e.target.value)}
        onChange={taskTitleChangeHandler}
        value={taskTitle}
        className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:border-blue-400"
      />
      <button
        className="w-full px-4 py-2 text-white bg-blue-500 rounded transform hover:bg-blue-400 hover:scale-95 duration-100 disabled:opacity-50"
        disabled={addButtonDisabled}
      >
        Add Task
      </button>
    </form>
  );
};

export default AddTask;
