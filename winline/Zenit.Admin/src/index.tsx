import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./core/redux/store";
import i18n from "./i18n";
import { I18nextProvider } from "react-i18next";
import "./bodyNetworkHandlers";
import { reportWebVitals } from "./reportWebVitals";

import "./App.less";
import { App } from "./App";
import { GlobalStyles } from "./GlobatStyles";
import { FallBack } from "./ui/commonComponents";

window.addEventListener("load", async () => {
  if (navigator.serviceWorker) {
    await navigator.serviceWorker.register("/sw.js");
  }
});

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <GlobalStyles />
        <React.Suspense fallback={<FallBack />}>
          <App />
        </React.Suspense>
      </I18nextProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

reportWebVitals();
