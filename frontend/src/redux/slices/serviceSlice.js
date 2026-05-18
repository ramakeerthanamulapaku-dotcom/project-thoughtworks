import { createSlice } from "@reduxjs/toolkit";
import { fetchServices } from "../thunks/serviceThunk";

const serviceSlice = createSlice({
  name: "services",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchServices.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default serviceSlice.reducer;