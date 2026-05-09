import { createSlice } from "@reduxjs/toolkit";

const paymentSlice = createSlice({
  name: "payments",
  initialState: {
    history: [],
  },
  reducers:{
    addPayment(state, action) {
      state.history.push(action.payload);
    },
  },
});

export const { addPayment } = paymentSlice.actions;
export default paymentSlice.reducer;