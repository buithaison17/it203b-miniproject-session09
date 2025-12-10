import { configureStore } from "@reduxjs/toolkit";
import  BookingSlice   from "../apis/booking.api";
import RoutesSlice  from "../apis/routes.api";
import BusCompanySlice  from "../apis/bus_companies.api";
import  CancelSlice  from "../apis/cancelled_tickets.api";
import  ReviewSlice  from "../apis/reviews.api";
export const store = configureStore({
  reducer: {
    tickets : BookingSlice,
    routes : RoutesSlice,
    busCompanys : BusCompanySlice,
    cancelTickets : CancelSlice,
    reviews : ReviewSlice,
  },
});
export default store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
