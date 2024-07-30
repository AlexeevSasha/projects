import React, {useCallback, useState} from "react";
import {Button, Drawer} from "antd";
import {Sidebar} from "./Sidebar";
import styled from 'styled-components';
import {ArrowRightOutlined} from "@ant-design/icons";

export const SidebarMenu = () => {
    const [isDrawerSidebar, setShowDrawer] = useState<boolean>(false);

    const closeDrawer = useCallback(() => {
        setShowDrawer(!isDrawerSidebar);
    }, [isDrawerSidebar]);

    return (
        <>
            <MobileSideBar>
                <ButtonDrawer onClick={closeDrawer}>
                    <ArrowRightOutlined/>
                </ButtonDrawer>
                <CustomDrawer
                    visible={isDrawerSidebar}
                    onClose={closeDrawer}
                    closable={true}
                    placement={'left'}
                    bodyStyle={{padding: '0'}}
                >
                    <Sidebar
                        closeSidebarDrawer={closeDrawer}
                    />
                </CustomDrawer>
            </MobileSideBar>
            <DesktopSidebar>
                <Sidebar/>
            </DesktopSidebar>
        </>
    );
};
const CustomDrawer = styled(Drawer)`
  display: none;
  @media (max-width: 1000px) {
    display: block;
    svg{
      fill: white;
    }
  }
`;

const MobileSideBar = styled.div`
  height: 100%;
  display: none;
  @media (max-width: 1000px) {
    display: block;
  }
`;

const DesktopSidebar = styled.div`
  top: 0;
  height: 100vh;
  position: sticky;
  @media (max-width: 1000px) {
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
  }`;
