import React, { useEffect } from "react";
import { Alert, Layout, Space } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useActions } from "common/helpers/useActions";
import { routePaths } from "common/constants/routePaths";
import { Loader } from "./Loader";
import { authAction } from "../store/auth/authSlice";
import { ReactComponent as Logo } from "../assets/images/logo.svg";
import { theme } from "assets/theme/theme";
import { useTranslation } from "react-i18next";
import { StateType } from "store";

const { Content } = Layout;

const actionCreators = {
  clearAlert: authAction.clearAuthAlert,
};

export const AuthLayout = () => {
  const { t } = useTranslation();
  const alertData = useSelector((state: StateType) => state.auth.alert);
  const isLoading = useSelector((state: StateType) => state.auth.isLoading);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { clearAlert } = useActions(actionCreators);

  useEffect(() => {
    clearAlert();
  }, []);

  useEffect(() => {
    pathname !== routePaths.sign.auth || (pathname !== routePaths.sign.forgotPassword && clearAlert());
    pathname === routePaths.base && navigate(routePaths.sign.auth);
  }, [clearAlert, pathname]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {isLoading && <Loader />}

      {alertData?.type && (
        <Alert style={{ textAlign: "center", border: "none" }} message={alertData.message} type={alertData.type} />
      )}

      <Content style={{ display: "flex", textAlign: "center" }}>
        <MainSignIn align={"center"} direction="vertical">
          <ContainerLogo>
            <Logo />
          </ContainerLogo>

          <span style={{ color: theme.colors.gray }}>{t("auth.mainTitle")}</span>

          <Outlet />
        </MainSignIn>
      </Content>
    </Layout>
  );
};

const MainSignIn = styled(Space)`
  margin: auto;

  & > .ant-space-item {
    width: 330px;
  }

  & > .ant-space-item:nth-child(2) {
    margin-bottom: 64px !important;
  }
`;

const ContainerLogo = styled.div`
  & svg {
    width: 239px;
    height: 46px;
  }

  pointer-events: none;
`;
