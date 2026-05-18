import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import bookingReducer from "./slices/bookingSlice";
import paymentReducer from "./slices/paymentSlice";
import maintenanceReducer from "./slices/maintenanceSlice";
import serviceReducer from "./slices/serviceSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    booking: bookingReducer,
    payment: paymentReducer,
    maintenance: maintenanceReducer,
    service: serviceReducer,
  },
});