import { createAsyncThunk } from "@reduxjs/toolkit";
import { getBookings, createBooking as create } from "../services/bookingService";

export const fetchBookings = createAsyncThunk(
  "bookings/fetch",
  async () => {
    const res = await getBookings();
    return res.data;
  }
);

export const createBooking = createAsyncThunk(
  "bookings/create",
  async (data) => {
    const res = await create(data);
    return res.data;
  }
);