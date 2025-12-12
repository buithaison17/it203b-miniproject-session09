import { createBrowserRouter } from "react-router-dom";
import AdminManager from "../admin/components/AdminManager";
import OderManager from "../admin/pages/OrderManagement/index";
import AdminReport from "../admin/pages/AdminReport/index";
import StationManagers from "../admin/pages/StationManagement/index";
import BusManagementScreen from "../admin/pages/BusManagement";
import BannerManagementScreen from "../admin/pages/BannerManagement";
import AccountManagementScreen from "../admin/pages/AccountManagement";
import CancellationManagementScreen from "../admin/pages/CancellationManagement";
import PaymentProviderManagementScreen from "../admin/pages/PaymentProviderManagement";
import ScheduleManagementScreen from "../admin/pages/ScheduleManagement";
import SeatManagementScreen from "../admin/pages/SeatManagement";
import TripManagementScreen from "../admin/pages/TripManagement";
import LoginScreen from "../pages/Auth/Login";
import RegisterScreen from "../pages/Auth/Register";
import Layout from "../components/Layout";
import BusCompany from "../pages/Information/BusCompany/BusCompany";
import Trip from "../pages/Information/Trip/Trip";
import BookingScreen from "../pages/Booking";
import HomepageScreen from "../pages/Homepage";
import IntroductionScreen from "../pages/Introduction";
import CheckticketScreen from "../pages/CheckTicket";
import PostScreen from "../pages/Post";
import Station from "../pages/Information/Station/Station";
import BookingHistoryScreen from "../pages/BookingHistory";

export const routers = createBrowserRouter([
  {
    path: "/",
    element: <LoginScreen />,
  },
  {
    path: "/register",
    element: <RegisterScreen />,
  },
  {
    path: "/vivu",
    element: <Layout />,

    children: [
      {
        index: true,
        element: <HomepageScreen />,
      },
      {
        path: "bus-company",
        element: <BusCompany />,
      },
      {
        path: "station",
        element: <Station />,
      },
      {
        path: "trip",
        element: <Trip />,
      },
      {
        path: "booking",
        element: <BookingScreen />,
      },
      {
        path: "introduction",
        element: <IntroductionScreen />,
      },
      {
        path: "check-ticket",
        element: <CheckticketScreen />,
      },
      {
        path: "post:id",
        element: <PostScreen />,
      },
      {
        path: "history-booking:id",
        element: <BookingHistoryScreen />,
      },
    ],
  },

  {
    path: "/admin",
    element: <AdminManager />,

    children: [
      {
        path: "order",
        element: <OderManager />,
      },
      {
        path: "report",
        element: <AdminReport />,
      },
      {
        path: "station",
        element: <StationManagers />,
      },
      {
        path: "bus",
        element: <BusManagementScreen />,
      },
      {
        path: "banner",
        element: <BannerManagementScreen />,
      },
      {
        path: "account",
        element: <AccountManagementScreen />,
      },
      {
        path: "cancel",
        element: <CancellationManagementScreen />,
      },
      {
        path: "paymentProvider",
        element: <PaymentProviderManagementScreen />,
      },
      {
        path: "schedule",
        element: <ScheduleManagementScreen />,
      },
      {
        path: "seat",
        element: <SeatManagementScreen />,
      },
      {
        path: "trip",
        element: <TripManagementScreen />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminManager />,

    children: [
      {
        path: "order",
        element: <OderManager />,
      },
      {
        path: "report",
        element: <AdminReport />,
      },
      {
        path: "station",
        element: <StationManagers />,
      },
    ],
  },
]);
