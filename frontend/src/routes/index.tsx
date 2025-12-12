import { createBrowserRouter } from "react-router-dom";
import AdminManager from "../admin/components/AdminManager";
import OderManager from "../admin/pages/OrderManagement/index";
import AdminReport from "../admin/pages/AdminReport/index";
import StationManagers from "../admin/pages/StationManagement/index";
import BusManager from "../admin/pages/BusManagement/index";
import BannerManagementScreen from "../admin/pages/BannerManagement";
import CancellationManagementScreen from "../admin/pages/CancellationManagement";
import PaymentProviderManagementScreen from "../admin/pages/PaymentProviderManagement";
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
import BusCompanyManager from "../admin/pages/BusCompanyManagement";
import UserManager from "../admin/pages/AccountManagement";
import SeatManager from "../admin/pages/SeatManagement";
import RoutesManager from "../admin/pages/RoutesManagement";
import SchedulesManager from "../admin/pages/SchedulesManagement";

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
        element: <BusCompany/>,
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
        path: "busCompany",
        element: <BusCompanyManager />,
      },
      {
        path: "bus",
        element: <BusManager />,
      },
      {
        path: "banner",
        element: <BannerManagementScreen />,
      },
      {
        path: "user",
        element: <UserManager />,
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
        element: <SchedulesManager />,
      },
      {
        path: "seat",
        element: <SeatManager />,
      },
      {
        path: "routes",
        element: <RoutesManager />,
      }
    ],
  },
]);
