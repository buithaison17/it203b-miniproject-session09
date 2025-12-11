import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { Schedules } from "../interfaces/Schedules";

interface RoutesState {
  schedules: Schedules[];
  status: "idle" | "pending" | "fulfilled" | "rejected";
  error: null | string;
}

const initialState: RoutesState = {
  schedules: [],
  status: "idle",
  error: null,
};

export const featSchedule = createAsyncThunk("schedules/featSchedule", async () => {
  const res = await axios.get("http://localhost:8080/schedules");
  return res.data;
});



export const ScheduleSlice = createSlice({
  name: "schedules",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(featSchedule.pending, (state) => {
        state.status = "pending";
      })
      .addCase(featSchedule.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.schedules = action.payload;
      })
      .addCase(featSchedule.rejected, (state) => {
        state.status = "pending";
        state.error = "Không thể lấy dữ liệu";
      })
  },
});
export default ScheduleSlice.reducer;
