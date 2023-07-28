import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, deleteTask } from "../store/todoSlice";

const TodoList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.todo.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  return (
    <div className="grid grid-cols-5 gap-3">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-gray-100 rounded-lg p-1 flex items-center justify-between"
        >
          <span>{task.title}</span>
          <button
            onClick={() => handleDelete(task.id)}
            className="bg-red-500 px-2 py-1 text-xs text-white rounded-full hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
