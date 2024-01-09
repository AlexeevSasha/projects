import React from "react";
import ReactDOM from "react-dom";
import "./common/styles/index.css";
import { App } from "./App";
import * as serviceWorker from "./serviceWorker";
import { AuthorizationApiRequest } from "./api/authorizationApiRequest";
import { AppSettings } from "./common/constants/appSettings";

(async () => {
  const apiIndex = document.location.pathname.search("_ui");
  const pathApi = document.location.pathname.slice(0, apiIndex);
  try {
    const data = await new AuthorizationApiRequest(pathApi).getAppSettings();
    if (data.isError) {
      throw data;
    }

    AppSettings.set(data.result);
    ReactDOM.render(<App />, document.getElementById("root"));
  } catch (e) {
    alert("Сервер не доступен");
    // только для  для localhost.
    // ReactDOM.render(<App appData={localData} />, document.getElementById("root"));
  }
})();

serviceWorker.unregister();
