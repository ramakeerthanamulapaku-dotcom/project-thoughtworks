import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import serviceReducer from "./slices/serviceSlice";
import bookingReducer from "./slices/bookingSlice";
import maintenanceReducer from "./slices/maintenanceSlice";
import paymentReducer from "./slices/paymentSlice";

export const store = configureStore({
  reducer:{
    auth: authReducer,
    services: serviceReducer,
    bookings: bookingReducer,  
    maintenance: maintenanceReducer,
    payments: paymentReducer,
  },
});