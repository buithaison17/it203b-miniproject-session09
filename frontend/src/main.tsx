import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { store } from "./stores/store";
import { routers } from "./routes";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={routers} />
  </Provider>
);
