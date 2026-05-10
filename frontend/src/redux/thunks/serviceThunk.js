import { createAsyncThunk } from "@reduxjs/toolkit";
import { getServices } from "../../services/serviceService";

export const fetchServices = createAsyncThunk(
  "services/fetch",
  async () => {
    const res = await getServices();
    return res.data;
  }
);