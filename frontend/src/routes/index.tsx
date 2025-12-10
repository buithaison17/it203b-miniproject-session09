import { createBrowserRouter } from "react-router-dom";
import BusCompany from "../pages/Information/BusCompany/BusCompany";
import Station from "../pages/Information/Station/Station";
import Trip from "../pages/Information/Trip/Trip";
import Layout from "../components/Layout";
import AdminManager from "../admin/components/AdminManager";
import OderManager from "../admin/pages/OderManager";
import AdminReport from "../admin/pages/AdminReport";
import StationManagers from "../admin/pages/StationManager";

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
      }
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
      }
    ],
  },
]);
