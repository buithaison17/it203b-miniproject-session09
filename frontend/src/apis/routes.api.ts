import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import type { Routes } from "../interfaces/Routes";

interface RoutesState {
  routes: Routes[];
  status: "idle" | "pending" | "fulfilled" | "rejected";
  error: null | string;
}

const initialState: RoutesState = {
  routes: [],
  status: "idle",
  error: null,
};

export const featRoutes = createAsyncThunk("routes/featRoutes", async () => {
  const res = await axios.get("http://localhost:8080/routes");
  return res.data;
});



export const RoutesSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(featRoutes.pending, (state) => {
        state.status = "pending";
      })
      .addCase(featRoutes.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.routes = action.payload;
      })
      .addCase(featRoutes.rejected, (state) => {
        state.status = "pending";
        state.error = "Không thể lấy dữ liệu";
      })
  },
});
export default RoutesSlice.reducer;
