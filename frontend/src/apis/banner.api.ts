import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { Banner } from "../interfaces/Banner";

interface BoannerState {
  banners: Banner[];
  status: "idle" | "pending" | "fulfilled" | "rejected";
  error: null | string;
}

const initialState: BoannerState = {
  banners: [],
  status: "idle",
  error: null,
};

export const featBanner = createAsyncThunk("banners/featBanner", async () => {
  const res = await axios.get("http://localhost:8080/banners");
  return res.data;
});

export const addBanner = createAsyncThunk(
  "banners/addBanner",
  async (banner: Banner) => {
    const res = await axios.post("http://localhost:8080/banners", banner);
    return res.data;
  }
);

export const deleteBanner = createAsyncThunk(
  "banners/deleteBanner",
  async (id: string) => {
    await axios.delete(`http://localhost:8080/banners/${id}`);
    return id;
  }
);

export const BannerSlice = createSlice({
  name: "banners",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(featBanner.pending, (state) => {
        state.status = "pending";
      })
      .addCase(featBanner.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.banners = action.payload;
      })
      .addCase(featBanner.rejected, (state) => {
        state.status = "rejected";
        state.error = "Không thể lấy dữ liệu";
      })
      .addCase(addBanner.pending, (state) => {
        state.status = "pending";
      })
      .addCase(addBanner.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.banners.unshift(action.payload);
      })
      .addCase(addBanner.rejected, (state) => {
        state.status = "rejected";
        state.error = "Không thể lấy dữ liệu";
      })
      .addCase(deleteBanner.pending, (state) => {
        state.status = "pending";
      })
      .addCase(deleteBanner.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.banners = state.banners.filter(
          (element) => String(element.id) !== String(action.payload)
        );
      })

      .addCase(deleteBanner.rejected, (state) => {
        state.status = "rejected";
        state.error = "Không thể lấy dữ liệu";
      });
  },
});
export default BannerSlice.reducer;
