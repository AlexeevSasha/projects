import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { Layout, Menu } from "antd";
import { theme } from "../assets/theme/theme";
import { ExitSidebarItem } from "./ExitSidebarItem";
import { MenuGenerator } from "./MenuGenerator";
import { ReactComponent as DexLogo } from "../assets/images/DexLogo.svg";
import { ReactComponent as Logo } from "../assets/images/logo.svg";

interface IProps {
  closeSidebarDrawer?: () => void;
}

export const Sidebar = React.memo(({ closeSidebarDrawer }: IProps) => {
  const location = useLocation();
  // const activeKeys =
  //   location.pathname.split("/").length > 3
  //     ? location.pathname.split("/").slice(0, 3).join("/")
  //     : location.pathname.includes("loyalty")
  //     ? `/${location.pathname.split("/")[1]}${location.pathname.includes("loyalty/") ? "/" : ""}`
  //     : location.pathname;

  return (
    <ContainerSaidbar width={200}>
      <SidebarMenu
        mode="inline"
        defaultOpenKeys={[`sub-/${location.pathname.split("/")[1]}`]}
        selectedKeys={[location.pathname]}
        style={{ height: "100%" }}
      >
        <ContainerLogo key={"containerLogo"}>
          <Logo />
        </ContainerLogo>
        {MenuGenerator(closeSidebarDrawer)}
      </SidebarMenu>
      <ExitButtonMenu>
        {ExitSidebarItem()}
        <DexImgBlock>
          <DexLogo />
        </DexImgBlock>
      </ExitButtonMenu>
    </ContainerSaidbar>
  );
});

const DexImgBlock = styled.div`
  display: flex;
  background: ${theme.colors.black};
  justify-content: center;
  padding: 10px 0;
`;

const SidebarMenu = styled(Menu)`
  padding-top: 16px;
  background: none;
  color: ${theme.colors.white};

  .ant-menu-item-disabled {
    color: ${theme.colors.middleGray} !important;
  }

  .ant-menu-item-disabled:active {
    background-color: ${theme.colors.neroGray};
  }

  .ant-menu-item {
    width: 100%;
  }

  .ant-menu-item:active {
    background-color: ${theme.colors.neroGray};
  }

  .ant-menu-item:hover {
    .ant-menu-submenu-arrow {
      color: ${theme.colors.white};
    }
  }

  .ant-menu-submenu-arrow {
    color: ${theme.colors.white};
  }

  .ant-menu-submenu-title {
    margin: 0;
  }

  .ant-menu-submenu-title:active {
    background-color: ${theme.colors.neroGray};
    width: 100%;
  }

  .ant-menu-submenu.ant-menu-submenu-inline:hover {
    .ant-menu-submenu-arrow {
      color: ${theme.colors.default};
    }
  }

  .ant-menu-submenu-selected {
    color: ${theme.colors.default};

    .ant-menu-submenu-arrow {
      color: ${theme.colors.default};
    }
  }

  .ant-menu-submenu-open:hover {
    .ant-menu-submenu-arrow {
      color: ${theme.colors.white};
    }
  }

  .ant-menu-item.ant-menu-item-selected {
    color: ${theme.colors.white};
    background: ${theme.colors.default};
  }

  .ant-menu-submenu-open.ant-menu-submenu-selected {
    color: ${theme.colors.default};

    .ant-menu-submenu-arrow {
      color: ${theme.colors.default};
    }
  }

  .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
    background: ${theme.colors.default};
    color: ${theme.colors.white};
  }
`;

const ExitButtonMenu = styled(Menu)`
  .ant-menu-item.ant-menu-item-selected {
    background-color: ${theme.colors.neroGray};
  }
`;

const ContainerLogo = styled.div<{ logo?: boolean }>`
  & svg {
    width: 128px;
    height: 36px;
  }
  padding-bottom: 20px;
  display: flex;
  justify-content: center;
  width: 100%;
  pointer-events: none;
`;

const ContainerSaidbar = styled(Layout.Sider)`
  height: inherit;
  background: black !important;

  & div.ant-layout-sider-children {
    display: flex;
    flex-direction: column;
    background-color: ${theme.colors.black};
    color: ${theme.colors.white};
  }

  @media (max-width: 1000px) {
    height: 100%;
    width: 100% !important;
    max-width: 100% !important;
  }
`;
