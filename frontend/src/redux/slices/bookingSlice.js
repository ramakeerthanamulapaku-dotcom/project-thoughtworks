import { createSlice } from "@reduxjs/toolkit";
import { createBooking, fetchBookings } from "../thunks/bookingThunk";

const bookingSlice = createSlice({
  name: "bookings",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.list.push(action.payload);
      });
  },
});

export default bookingSlice.reducer;