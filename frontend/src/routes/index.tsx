import { createBrowserRouter } from "react-router-dom";
import AdminManager from "../admin/components/AdminManager";
import OrderManager from "../admin/pages/OderManager";
import StationManager from "../admin/pages/StationManager";

export const routers = createBrowserRouter([
    {path: "/admin", element : <AdminManager/>,
        children : [
        {path: "order" , element : <OrderManager/>},
        {path: "station" , element : <StationManager/>},
    ]}
]);
