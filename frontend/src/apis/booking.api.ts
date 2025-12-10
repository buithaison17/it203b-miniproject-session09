import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Ticket } from "../interfaces/Schedules";
import axios from "axios";

interface BookingState {
  tickets: Ticket[];
  status: "idle" | "pending" | "fulfilled" | "rejected";
  error: null | string;
}

const initialState: BookingState = {
  tickets: [],
  status: "idle",
  error: null,
};

export const featBooking = createAsyncThunk("tickets/featBooking", async () => {
  const res = await axios.get("http://localhost:8080/tickets");
  return res.data;
});

export const UpdateBooking = createAsyncThunk(
  "tickets/UpdateBooking",
  async (ticket: Ticket) => {
    const res = await axios.put(
      `http://localhost:8080/tickets/${ticket.id}`,
      ticket
    );
    return res.data;
  }
);

export const BookingSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(featBooking.pending, (state) => {
        state.status = "pending";
      })
      .addCase(featBooking.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.tickets = action.payload;
      })
      .addCase(featBooking.rejected, (state) => {
        state.status = "pending";
        state.error = "Không thể lấy dữ liệu";
      })
      .addCase(UpdateBooking.pending, (state) => {
        state.status = "pending";
      })
      .addCase(UpdateBooking.fulfilled, (state, action) => {
        state.status = "fulfilled";

        const updated = action.payload;

        state.tickets = state.tickets.map((t) =>
          t.id === updated.id ? updated : t
        );
      })
      .addCase(UpdateBooking.rejected, (state) => {
        state.status = "pending";
        state.error = "Không thể cập nhật dữ liệu";
      });
  },
});
export default BookingSlice.reducer;
