import { createAsyncThunk } from "@reduxjs/toolkit";
import { getLands, createLand } from "../../services/landService";

export const fetchLands = createAsyncThunk(
  "lands/fetch",
  async () => {
    const res = await getLands();
    return res.data;
  }
);

export const addLand = createAsyncThunk(
  "lands/create",
  async (data) => {
    const res = await createLand(data);
    return res.data;
  }
);