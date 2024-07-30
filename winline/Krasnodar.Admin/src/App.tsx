import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, Routes, Route, Navigate } from "react-router-dom";
import { StateType } from "./core/redux/store";
import { ReactTitle } from "react-meta-tags";
import { ConfigProvider } from "antd";
import { getToken } from "./common/helpers/getToken";
import { AuthLayout } from "./components/layoutComponents/AuthLayout";
import { routePaths } from "./common/constants/routePaths";
import { AuthRouting } from "./pages/authRouting";
import { PrivateLayout } from "./components/layoutComponents/PrivateLayout";
import { PrivateRouting } from "./pages/privateRouting";
import { Help } from "./pages/help/Help";
import { getStorageLanguage } from "./common/helpers/storageLanguage";
import { localeAntd } from "./common/constants/languages";
import { useTranslation } from "react-i18next";
import { intervalRefreshHandler } from "./modules/authorization/helpers/refreshHelper";
import { beforeUnloadObj } from "./common/helpers/storeChangeController";

export const App = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const { authData, userInfo } = useSelector((state: StateType) => state.authData);
  const [locale, setLocal] = useState(localeAntd());
  const [title, setTitle] = useState<string>(t("common.adminPanel"));

  useEffect(() => {
    setLocal(localeAntd(getStorageLanguage()));
  }, [getStorageLanguage()]);

  useEffect(() => {
    authData.access_token && intervalRefreshHandler();
  }, []);

  useEffect(() => {
    beforeUnloadObj.isRemember = userInfo.remember;
    beforeUnloadObj.userInfo = userInfo || {};
    beforeUnloadObj.userAuthInfo = authData || {};
    window.addEventListener("beforeunload", beforeUnloadObj.beforeUnload);

    return () => {
      window.removeEventListener("beforeunload", beforeUnloadObj.beforeUnload);
    };
  }, [userInfo, authData.access_token]);

  useEffect(() => {
    if (userInfo.name) {
      const path = location.pathname.replace(/\/\w*/g, (word, index) => (!index ? word.replace("/", "") : word.replace("/", ".")));
      path && setTitle(t(`${path}.title`) + " - " + t("common.adminPanel"));
    } else {
      setTitle(t("common.adminPanel"));
    }
  }, [location.pathname]);

  return (
    <ConfigProvider locale={locale}>
      <ReactTitle title={title} />
      <Routes>
        <Route path="/help" element={<Help />} />
        <Route path={routePaths.base} element={getToken() ? <PrivateLayout /> : <AuthLayout />}>
          {getToken() ? (
            <Route path={"*"} element={<PrivateRouting accessPolicies={userInfo.policy} />} />
          ) : (
            <>
              <Route path={routePaths.sign.auth + "/*"} element={<AuthRouting />} />
              <Route path={"/"} element={<Navigate to={routePaths.sign.auth} replace />} />
              <Route path={"*"} element={<Navigate to={routePaths.sign.auth} replace />} />
            </>
          )}
        </Route>
      </Routes>
    </ConfigProvider>
  );
};
