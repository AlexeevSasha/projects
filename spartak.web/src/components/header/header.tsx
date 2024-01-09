import { useRouter } from "next/router";
import { useContext, useState } from "react";
import styled from "styled-components";
import { theme } from "../../assets/theme/theme";
import { LogoutModal } from "../../componentPages/autn/logoutModal";
import { ReceiveMsgModal } from "../../componentPages/autn/receiveMsgModal";
import { CartTabs } from "../../componentPages/chapterShop/drawerBasket/cartTabs";
import { DataContext } from "../../core/dataProvider";
import { Drawer } from "../drawer/drawer";
import { DesktopHeader } from "./component/desktopHeader";
import { MobileHeader } from "./component/mobileHeader";

export const Header = () => {
  const { push, asPath } = useRouter();
  const [logoutModalIsOpen, setLogoutModalIsOpen] = useState(false);
  const dataContext = useContext(DataContext);
  const { shop: { drawerIsOpen = false } = {}, setFavourites, setListShop, setDrawerIsOpen } = dataContext;
  const { setUser, setReceiveMsgModalIsOpen, auth: { receiveMsgModalIsOpen } = {} } = dataContext;

  const openLogoutModal = () => setLogoutModalIsOpen(true);

  const logout = () => {
    document.cookie = `access_token="";domain=${process.env.NEXT_PUBLIC_DOMAIN};path=/;max-age=-1`;
    document.cookie = `refresh_token="";domain=${process.env.NEXT_PUBLIC_DOMAIN};path=/;max-age=-1`;
    document.cookie = `basketId="";domain=${process.env.NEXT_PUBLIC_DOMAIN};path=/;max-age=-1`;
    setUser(undefined);
    setLogoutModalIsOpen(false);
    setFavourites([]);
    setListShop({ list: [], total: "0 ₽", denarii: false, totalN: "0" });

    if (asPath.includes("profile")) push(`/auth/signin?backUrl=${asPath}`);
  };

  const openAuthModal = () => push(`/auth/signin?backUrl=${encodeURIComponent(asPath)}`);

  return (
    <>
      {logoutModalIsOpen && <LogoutModal onClose={() => setLogoutModalIsOpen(false)} logout={logout} />}

      {receiveMsgModalIsOpen && <ReceiveMsgModal onClose={() => setReceiveMsgModalIsOpen(false)} />}

      {drawerIsOpen && (
        <Drawer onClose={() => setDrawerIsOpen(false)}>
          <CartTabs />
        </Drawer>
      )}

      <HeaderContainer id="header">
        <DesktopHeader openAuthModal={openAuthModal} logout={openLogoutModal} />
        <MobileHeader openAuthModal={openAuthModal} logout={openLogoutModal} />
      </HeaderContainer>
    </>
  );
};

const HeaderContainer = styled.header`
  background-color: ${theme.colors.black};
  color: ${theme.colors.white};
  overflow-x: hidden;
`;
