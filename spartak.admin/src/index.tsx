import { ConfigProvider } from "antd";
import "antd/dist/antd.less";
import ruRu from "antd/lib/locale/ru_RU";
import moment from "moment";
import "moment/locale/ru";
import ReactDOM from "react-dom";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "store";
import { GlobalStyles } from "ui/GlobatStyles";
import { Notice } from "ui/Notice";
import "./bodyNetworkHandlers";
import i18n from "./common/i18n";
import { Pages } from "./pages";
import { reportWebVitals } from "./reportWebVitals";

moment.locale("ru");

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <ConfigProvider locale={ruRu}>
        <PersistGate loading={null} persistor={persistor}>
          <I18nextProvider i18n={i18n}>
            <GlobalStyles />

            <Pages />

            <Notice />
          </I18nextProvider>
        </PersistGate>
      </ConfigProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

reportWebVitals();
