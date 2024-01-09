import { Layout, Menu } from "antd";
import { ReactComponent as DexLogo } from "assets/images/DexLogo.svg";
import { ReactComponent as Logo } from "assets/images/logo.svg";
import { theme } from "assets/theme/theme";
import React from "react";
import styled from "styled-components";
import { ExitButton } from "ui/Sidebar/ExitSidebarItem";
import { SidebarList } from "ui/Sidebar/SidebarList";

interface IProps {
  closeDrawer?: () => void;
}

export const Sidebar = React.memo(({ closeDrawer }: IProps) => {
  return (
    <ContainerSidebar width={200}>
      <SidebarMenu mode="inline" style={{ height: "100%" }}>
        <ContainerLogo>
          <Logo style={{ height: "46px" }} />
        </ContainerLogo>

        {SidebarList({ closeDrawer })}
      </SidebarMenu>

      <ExitButtonMenu>
        <ExitButton />

        <DexImgBlock>
          <DexLogo />
        </DexImgBlock>
      </ExitButtonMenu>
    </ContainerSidebar>
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
  .ant-menu-submenu-disabled {
    .ant-menu-submenu-title {
      color: ${theme.colors.middleGray} !important;
    }
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
  position: absolute;
  bottom: 0;
  width: 100%;

  .ant-menu-item.ant-menu-item-selected {
    background-color: ${theme.colors.black};
  }
  .ant-menu-item-active {
    color: ${theme.colors.white};
    padding-left: 24px;
  }
`;

const ContainerLogo = styled.div<{ logo?: boolean }>`
  & svg {
    height: 36px;
  }
  padding-bottom: 20px;
  display: flex;
  justify-content: center;
  width: 100%;
  pointer-events: none;
`;

const ContainerSidebar = styled(Layout.Sider)`
  min-height: 100vh;
  background: black !important;
  position: relative;
  padding-bottom: 76px;
  height: 100%;

  & div.ant-layout-sider-children {
    display: flex;
    flex-direction: column;
    background-color: ${theme.colors.black};
    color: ${theme.colors.white};
  }
  .ant-menu {
    overflow-x: hidden;
    overflow-y: auto;
  }

  @media (max-width: 1000px) {
    height: 100%;
    width: 100% !important;
    max-width: 100% !important;
  }
`;
