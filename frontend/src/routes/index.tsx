import { createBrowserRouter } from "react-router-dom";
import AdminManager from "../admin/components/AdminManager";
import OrderManager from "../admin/pages/OderManager";
import StationManagers from "../admin/pages/StationManager";
import BusCompany from "../pages/Information/BusCompany/BusCompany";
import Station from "../pages/Information/Station/Station";
import Trip from "../pages/Information/Trip/Trip";
import Layout from "../components/Layout";

export const routers = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,

    children: [
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
    ],
  },
  {
    path: "/admin",
    element: <AdminManager />,
    children: [
      { path: "order", element: <OrderManager /> },
      { path: "station", element: <StationManagers /> },
    ],
  },
]);
