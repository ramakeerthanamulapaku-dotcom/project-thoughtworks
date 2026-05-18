import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, register } from "../../services/authService";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data) => {
    const res = await login(data);
    return res.data;
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (data) => {
    const res = await register(data);
    return res.data;
  }
);