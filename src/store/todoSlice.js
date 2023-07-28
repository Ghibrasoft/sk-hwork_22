import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  status: "idle",
  error: null,
};

// async thunks
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = await response.json();
  return data;
});

export const addTask = createAsyncThunk("tasks/addTask", async (task) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  const data = await response.json();
  return data;
});

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId) => {
    await fetch(`https://jsonplaceholder.typicode.com/todos/${taskId}`, {
      method: "DELETE",
    });
    return taskId;
  }
);

export const updateTask = createAsyncThunk("tasks/updateTask", async (task) => {
  await fetch(`https://jsonplaceholder.typicode.com/todos/${task.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  return task;
});

// redux slice
const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks = [action.payload, ...state.tasks];
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const updatedTask = action.payload;
        const index = state.tasks.findIndex(
          (task) => task.id === updatedTask.id
        );
        if (index !== -1) {
          state.tasks[index] = updatedTask;
        }
      });
  },
});

export default todoSlice.reducer;
