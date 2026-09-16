import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type Task from "../types/task";

export interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: [],
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTaskAdded: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    onTaskDeleted: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task._id !== action.payload);
    },
    onTaskUpdated: (state, action: PayloadAction<Task>) => {
      state.tasks = state.tasks.map((task) =>
        task._id === action.payload._id ? action.payload : task,
      );
    },
    setTasks: (state, action:PayloadAction<Task[]>) => {
        state.tasks = action.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const { addTaskAdded, onTaskDeleted, onTaskUpdated, setTasks } =
  tasksSlice.actions;

export default tasksSlice.reducer;
