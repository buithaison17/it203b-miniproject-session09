import { createBrowserRouter } from "react-router-dom";
import AdminManager from "../admin/components/AdminManager";
import OrderManager from "../admin/pages/OderManager";
import StationManagers from "../admin/pages/StationManager";
import AdminReport from "../admin/pages/AdminReport";

export const routers = createBrowserRouter([
    {path: "/admin", element : <AdminManager/>,
        children : [
        {path: "order" , element : <OrderManager/>},
        {path: "station" , element : <StationManagers/>},
        {path: "report" , element : <AdminReport></AdminReport>},
    ]}
]);
