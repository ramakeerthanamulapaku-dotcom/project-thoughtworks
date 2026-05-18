import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import maintenanceService from "../../services/maintenanceService";

// THUNK
export const createComplaint = createAsyncThunk(
  "maintenance/create",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      return await maintenanceService.submitComplaint(data, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// INITIAL STATE
const initialState = {
  complaints: [],
  isLoading: false,
  isSuccess: false,
  message: "",
};

// 🔥 THIS IS THE KEY PART (MUST EXIST)
const maintenanceSlice = createSlice({
  name: "maintenance",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createComplaint.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createComplaint.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.complaints.push(action.payload);
      })
      .addCase(createComplaint.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
      });
  },
});

// ✅ EXPORTS
export const { resetStatus } = maintenanceSlice.actions;
export default maintenanceSlice.reducer;