import { createBrowserRouter } from "react-router-dom";
import AdminManager from "../admin/components/AdminManager";
import OrderManager from "../admin/pages/OderManager";

export const routers = createBrowserRouter([
    {path: "/admin", element : <AdminManager/>,
        children : [
        {path: "order" , element : <OrderManager/>}
    ]}
]);
