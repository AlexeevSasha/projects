import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Drawer } from "antd";
import { useState } from "react";
import styled from "styled-components";
import { Sidebar } from "ui/Sidebar/Sidebar";

export const SidebarMenu = () => {
  const [drawerVisible, setDrawerIsVisible] = useState<boolean>(false);

  const toggleDrawer = () => setDrawerIsVisible(!drawerVisible);

  return (
    <>
      <MobileSideBar>
        <ButtonDrawer onClick={toggleDrawer}>
          <ArrowRightOutlined />
        </ButtonDrawer>

        <CustomDrawer
          visible={drawerVisible}
          onClose={toggleDrawer}
          placement={"left"}
          bodyStyle={{ padding: "0", overflow: "unset" }}
          width={200}
          headerStyle={{ display: "none" }}
        >
          <Sidebar closeDrawer={toggleDrawer} />
        </CustomDrawer>
      </MobileSideBar>

      <DesktopSidebar>
        <Sidebar />
      </DesktopSidebar>
    </>
  );
};

const CustomDrawer = styled(Drawer)`
  svg {
    fill: white;
  }

  @media (min-width: 1000px) {
    display: none;
  }

  & div.ant-drawer-content {
    overflow-x: hidden;
  }
`;

const MobileSideBar = styled.div`
  height: 100%;

  @media (min-width: 1000px) {
    display: none;
  }
`;

const DesktopSidebar = styled.div`
  height: 100vh;
  position: sticky;
  top: 0;
  @media (max-width: 999px) {
    display: none;
  }
`;

const ButtonDrawer = styled(Button)`
  position: fixed;
  top: 15%;
  z-index: 5;
  left: -2%;

  &:hover {
    left: -1%;
  }
`;
