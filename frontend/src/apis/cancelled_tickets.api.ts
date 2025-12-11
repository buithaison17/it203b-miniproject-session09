import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { CancellationPolicies } from "../interfaces/Schedules";


interface CancelTicketState {
  cancelTickets: CancellationPolicies[];
  status: "idle" | "pending" | "fulfilled" | "rejected";
  error: null | string;
}

const initialState: CancelTicketState = {
  cancelTickets: [],
  status: "idle",
  error: null,
};

export const featCancelTickets = createAsyncThunk("cancelled_tickets/featCancelTickets", async () => {
  const res = await axios.get("http://localhost:8080/cancelled_tickets");
  return res.data;
});



export const CancelSlice = createSlice({
  name: "cancelled_tickets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(featCancelTickets.pending, (state) => {
        state.status = "pending";
      })
      .addCase(featCancelTickets.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.cancelTickets = action.payload;
      })
      .addCase(featCancelTickets.rejected, (state) => {
        state.status = "pending";
        state.error = "Không thể lấy dữ liệu";
      })
  },
});
export default CancelSlice.reducer;
