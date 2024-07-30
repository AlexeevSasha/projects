import React from "react";
import { Layout, Space } from "antd";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { Loader } from "../../ui/Loader";
import { ReactComponent as Logo } from "../../assets/images/logo.svg";
import { theme } from "../../assets/theme/theme";
import { useTranslation } from "react-i18next";
import type { StateType } from "../../core/redux/store";

const { Content } = Layout;

export const AuthLayout = () => {
  const { t } = useTranslation();
  const isLoading = useSelector((state: StateType) => state.authData.isLoading);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {isLoading && <Loader />}
      <Content style={{ display: "flex", textAlign: "center" }}>
        <MainSignIn align={"center"} direction="vertical">
          <ContainerLogo>
            <Logo />
          </ContainerLogo>
          <span style={{ color: theme.colors.gray }}>{t("publicLayout.mainTitle")}</span>
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
