import { configureStore } from "@reduxjs/toolkit";
import  bookingSlice   from "../apis/booking.api";
export const store = configureStore({
  reducer: {
    tickets : bookingSlice,
  },
});
export default store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
