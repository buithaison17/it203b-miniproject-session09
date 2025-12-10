import { configureStore } from "@reduxjs/toolkit";
import  bookingSlice   from "../apis/booking.api";
import stationReducer from "../slices/stationSlice"
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
export const store = configureStore({
  reducer: {
    stations: stationReducer,
    tickets : bookingSlice,
  },
});
export default store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;