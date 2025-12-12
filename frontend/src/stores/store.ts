import { configureStore } from "@reduxjs/toolkit";
import BookingSlice from "../apis/booking.api";
import RoutesSlice from "../apis/routes.api";
import CancelSlice from "../apis/cancelled_tickets.api";
import ReviewSlice from "../apis/reviews.api";
import ScheduleSlice from "../apis/schedule.api";
import BannerSlice from "../apis/banner.api";
import PaymentProviderSlice from "../apis/provider.api";
import StationSlice from "../apis/station.api";
import BusCompanySlice from "../apis/busCompany.api";
import BusSlice from "../apis/bus.api";
export const store = configureStore({
  reducer: {
    tickets: BookingSlice,
    routes: RoutesSlice,
    busCompanys: BusCompanySlice,
    buses: BusSlice,
    cancelTickets: CancelSlice,
    reviews: ReviewSlice,
    schedules: ScheduleSlice,
    station: StationSlice,
    banners: BannerSlice,
    paymentProvider: PaymentProviderSlice,
    stations: StationSlice,
    busCompany: BusCompanySlice,
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
