import { configureStore } from "@reduxjs/toolkit";
import bookingSlice from "../apis/booking.api";
import StationSlice from "../apis/station.api";
import BusCompanySlice from "../apis/busCompany.api"
import BusSlice from "../apis/bus.api"

export const store = configureStore({
  reducer: {
    stations: StationSlice,
    tickets: bookingSlice,
    busCompany: BusCompanySlice,
    buses: BusSlice,
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
