import { Header } from "common/components/Header";
import { styled } from "common/styles/styled";
import { theme } from "common/styles/theme";
import React from "react";
import { Sidebar } from "../Sidebar";

interface IProps {
  hideMenu?: boolean;
  hideLeftMenu?: boolean;
  disableLeftMenuPadding?: boolean;
}

export const WorkSection: React.FC<IProps> = ({ children, hideMenu, hideLeftMenu, disableLeftMenuPadding }) => {
  return (
    <>
      {hideMenu ? null : <Header />}
      <Body>
        {hideMenu || hideLeftMenu ? null : <Sidebar />}
        {hideMenu ? (
          <BigContainer id={"container"}>{children}</BigContainer>
        ) : hideLeftMenu ? (
          <ContainerHideLeftMenu disablePudding={disableLeftMenuPadding}>{children}</ContainerHideLeftMenu>
        ) : (
          <Container id={"container"}>{children}</Container>
        )}
      </Body>
    </>
  );
};

const Body = styled.div`
  display: flex;
  width: 100%;
`;

const Container = styled.div`
  height: calc(100vh - 41px);
  background: ${theme.colors.lightBlue};
  padding-left: 30px;
  margin-left: 60px;
  display: flex;
  flex-direction: column;
  transition: padding-left 0.5s ease;
  min-width: 1000px;
  width: 100%;
`;

const ContainerHideLeftMenu = styled.div<{ disablePudding?: boolean }>`
  height: calc(100vh - 41px);
  background: ${theme.colors.lightBlue};
  padding: ${({ disablePudding }) => !disablePudding && "0 70px"};
  display: flex;
  flex-direction: column;
  transition: padding-left 0.5s ease;
  min-width: 1000px;
  width: 100%;
  overflow: auto;
`;

const BigContainer = styled.div`
  height: 100vh;
  background: ${theme.colors.lightBlue};
  display: flex;
  flex-direction: column;
  transition: padding-left 0.5s ease;
  width: 100%;

  align-items: center;
  justify-content: center;
  font-size: 34px;
  color: ${theme.colors.grayBlue};
  line-height: 200%;
`;
