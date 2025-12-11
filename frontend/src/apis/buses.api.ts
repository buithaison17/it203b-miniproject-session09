import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { Bus} from "../interfaces/Bus";

interface BusState {
  buses: Bus[];
  status: "idle" | "pending" | "fulfilled" | "rejected";
  error: null | string;
}

const initialState: BusState = {
  buses: [],
  status: "idle",
  error: null,
};

export const featBus = createAsyncThunk("buses/featBus", async () => {
  const res = await axios.get("http://localhost:8080/buses");
  return res.data;
});



export const BusSlice = createSlice({
  name: "buses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(featBus.pending, (state) => {
        state.status = "pending";
      })
      .addCase(featBus.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.buses = action.payload;
      })
      .addCase(featBus.rejected, (state) => {
        state.status = "pending";
        state.error = "Không thể lấy dữ liệu";
      })
  },
});
export default BusSlice.reducer;
