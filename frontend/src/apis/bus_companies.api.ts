import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { BusCompany } from "../interfaces/Bus";

interface CompanyState {
  busCompany: BusCompany[];
  status: "idle" | "pending" | "fulfilled" | "rejected";
  error: null | string;
}

const initialState: CompanyState = {
  busCompany: [],
  status: "idle",
  error: null,
};

export const featBusCompany = createAsyncThunk("busCompany/featBusCompany", async () => {
  const res = await axios.get("http://localhost:8080/bus_companies");
  return res.data;
});



export const BusCompanySlice = createSlice({
  name: "busCompany",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(featBusCompany.pending, (state) => {
        state.status = "pending";
      })
      .addCase(featBusCompany.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.busCompany = action.payload;
      })
      .addCase(featBusCompany.rejected, (state) => {
        state.status = "pending";
        state.error = "Không thể lấy dữ liệu";
      })
  },
});
export default BusCompanySlice.reducer;
