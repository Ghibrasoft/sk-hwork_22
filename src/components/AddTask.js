import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../store/todoSlice";

const AddTask = () => {
  const [task, setTask] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() === "") return;
    dispatch(
      addTask({
        title: task,
        completed: false,
      })
    );
    setTask("");
  };

  return (
    <form onSubmit={handleSubmit} className="shadow-md rounded-full my-10">
      <input
        type="text"
        placeholder="New task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="border rounded-l-full px-4 py-2 outline-none"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white ring-1 ring-blue-500 rounded-r-full px-4 py-2 hover:bg-blue-700 transition-colors"
      >
        Add Task
      </button>
    </form>
  );
};

export default AddTask;
