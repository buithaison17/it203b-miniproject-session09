import { configureStore } from "@reduxjs/toolkit";
import  BookingSlice   from "../apis/booking.api";
import RoutesSlice  from "../apis/routes.api";
import BusCompanySlice  from "../apis/bus_companies.api";
import  CancelSlice  from "../apis/cancelled_tickets.api";
import  ReviewSlice  from "../apis/reviews.api";
import  BusSlice  from "../apis/buses.api";
import  ScheduleSlice  from "../apis/schedule.api";
import StationSlice from "./stationSlice";
import BannerSlice  from "../apis/banner.api";
import PaymentProviderSlice from "../apis/provider.api";
export const store = configureStore({
  reducer: {
    tickets : BookingSlice,
    routes : RoutesSlice,
    busCompanys : BusCompanySlice,
    buses : BusSlice,
    cancelTickets : CancelSlice,
    reviews : ReviewSlice,
    schedules : ScheduleSlice,
    station : StationSlice,
    banners : BannerSlice,
    paymentProvider : PaymentProviderSlice
  },
});
export default store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
