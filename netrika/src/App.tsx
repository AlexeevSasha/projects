import { PageVersion } from "pages/Version/PageVersion";
import moment from "moment";
import "moment/locale/ru";
import React from "react";
import { Provider } from "react-redux";
import { Route, Router, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RouterAccess } from "./common/components/Router/RouterAccess";
import { PageSignInCallback } from "./pages/PageSignInCallback";
import { configureStore } from "./store/configureStore";
import { PageSignInCallbackImk } from "./pages/PageSignInCallbackImk";
import { AppSettings } from "./common/constants/appSettings";
import { PopupContainer } from "./common/components/Popup/PopupContainer";

moment.locale("ru");
const { store, history } = configureStore();

export const App = () => {
  if (!AppSettings.get("authority")) return null;

  return (
    <Provider store={store}>
      <Router history={history}>
        <ToastContainer />
        <Switch>
          <Route
            path={`${AppSettings.get("REACT_APP_ROOT_FOLDER")}${AppSettings.get("redirect_uri")}`}
            key="Login"
            component={PageSignInCallback}
          />
          <Route
            path={`${AppSettings.get("REACT_APP_ROOT_FOLDER")}${AppSettings.get("redirect_uri_iemk")}`}
            key="Login"
            component={PageSignInCallbackImk}
          />
          <Route path={`${AppSettings.get("REACT_APP_ROOT_FOLDER")}/versions`} component={PageVersion} />
          <RouterAccess />
        </Switch>
        <PopupContainer />
      </Router>
    </Provider>
  );
};
