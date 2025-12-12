import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { Review } from "../interfaces/Schedules";


interface ReviewState {
  reviews: Review[];
  status: "idle" | "pending" | "fulfilled" | "rejected";
  error: null | string;
}

const initialState: ReviewState = {
  reviews: [],
  status: "idle",
  error: null,
};

export const featReview = createAsyncThunk("reviews/featReview", async () => {
  const res = await axios.get("http://localhost:8080/reviews");
  return res.data;
});



export const ReviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(featReview.pending, (state) => {
        state.status = "pending";
      })
      .addCase(featReview.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.reviews = action.payload;
      })
      .addCase(featReview.rejected, (state) => {
        state.status = "pending";
        state.error = "Không thể lấy dữ liệu";
      })
  },
});
export default ReviewSlice.reducer;
