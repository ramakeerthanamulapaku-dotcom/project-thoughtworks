import { createSlice } from "@reduxjs/toolkit";
import { fetchLands, addLand } from "../thunks/landThunk";

const landSlice = createSlice({
  name: "lands",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLands.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(addLand.fulfilled, (state, action) => {
        state.list.push(action.payload);
      });
  },
});

export default landSlice.reducer;