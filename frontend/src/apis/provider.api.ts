import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import type { PaymentProvider } from "../interfaces/Payment";

interface BoannerState {
  payment_provider: PaymentProvider[];
  status: "idle" | "pending" | "fulfilled" | "rejected";
  error: null | string;
}

const initialState: BoannerState = {
  payment_provider: [],
  status: "idle",
  error: null,
};

export const featPaymentProvider = createAsyncThunk("payment_provider/featPaymentProvider", async () => {
  const res = await axios.get("http://localhost:8080/payment_provider");
  return res.data;
});



export const PaymentProviderSlice = createSlice({
  name: "payment_provider",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(featPaymentProvider.pending, (state) => {
        state.status = "pending";
      })
      .addCase(featPaymentProvider.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.payment_provider = action.payload;
      })
      .addCase(featPaymentProvider.rejected, (state) => {
        state.status = "pending";
        state.error = "Không thể lấy dữ liệu";
      })
  },
});
export default PaymentProviderSlice.reducer;
