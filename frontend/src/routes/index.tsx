import { createBrowserRouter } from "react-router-dom";
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
      }
    ],
  },
]);
