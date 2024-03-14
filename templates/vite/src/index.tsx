import "./api/config/fetch.config";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastic";
import { RootPopup } from "@/modules/popup/components/RootPopup";
import { RouterCustomProvider } from "@/common/components/provider/RouterProvider";

//style
import "./styles/index.scss";
import "react-toastic/dist/style.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <>
    <RouterCustomProvider />
    <RootPopup />
    <ToastContainer />
  </>,
);
