import { createSlice } from "@reduxjs/toolkit";

const maintenanceSlice = createSlice({
  name: "maintenance",
  initialState: {
    tasks: [],
  },
  reducers: {
    addTask(state, action) {
      state.tasks.push(action.payload);
    },
    removeTask(state, action) {
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
    },
  },
});

export const { addTask, removeTask } = maintenanceSlice.actions;
export default maintenanceSlice.reducer;