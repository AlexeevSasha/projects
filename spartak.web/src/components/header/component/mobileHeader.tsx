import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FavouriteIcon } from "../../../assets/icon/FavouriteIcon";
import { IconBurger } from "../../../assets/icon/iconBurger";
import { IconEmptyProfile } from "../../../assets/icon/iconEmptyProfile";
import { ShopCard } from "../../../assets/icon/ShopCart";
import { theme } from "../../../assets/theme/theme";
import { NextImage } from "../../../ui/nextImage/nextImage";
import { DataContext } from "../../../core/dataProvider";
import { MobileMenu } from "./componentMobileHeader/mobileMenu";
import { HeaderDenarii } from "./headerDenarii";
import { getMenuItems } from "./getMenuItems";
import { ProfileMenu } from "./profileMenu";
import { ThemeContext } from "../../../core/themeProvider";

type Props = {
  openAuthModal?: () => void;
  logout: () => void;
};

export const MobileHeader = ({ openAuthModal, logout }: Props) => {
  const { push, locale = "ru" } = useRouter();
  const [positionMenu, setPositionMenu] = useState(-1500);
  const [visible, setVisible] = useState(true);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const lastScrollPosition = useRef(0);
  const { isDarkTheme } = useContext(ThemeContext);
  const dataContext = useContext(DataContext);
  const { auth: { user = undefined } = {}, data: { teams = [] } = {} } = dataContext;
  const { shop: { products = undefined, tickets = undefined, excursion = undefined } = {}, setDrawerIsOpen } =
    dataContext;

  const openMenu = () => {
    document.body.setAttribute("style", "overflow: hidden");
    setPositionMenu(0);
  };

  const closeMenu = () => {
    document.body.setAttribute("style", "");
    setPositionMenu(-1500);
  };

  const handleOpenAuthModal = () => {
    setPositionMenu(-1500);
    openAuthModal?.();
  };

  const handleScroll = () => {
    if (!window.scrollY || lastScrollPosition.current > window.scrollY) {
      setVisible(true);
    } else {
      setVisible(false);
    }
    lastScrollPosition.current = window.scrollY;
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);

    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Spacer visible={visible}>
      <MobileHeaderContainer visible={visible}>
        <IconBurgerContainer onClick={openMenu}>
          <IconBurger />
        </IconBurgerContainer>

        <LogoContainer onClick={() => push("/")}>
          <NextImage
            src={`/images/spartak/${locale}/${isDarkTheme ? "darkTheme" : "lightTheme"}/spartakLogoWhiteText.svg`}
            alt={"Спартак"}
            priority
          />
        </LogoContainer>

        <ShopFavouriteAndUser>
          <ShopIcons>
            <Link prefetch={false} href={"/personal/favourites"} passHref>
              <a>
                <FavouriteIcon />
              </a>
            </Link>
            <ShopCard
              onClick={() => setDrawerIsOpen(true)}
              itemsCount={(products?.list?.length || 0) + (tickets?.length || 0) + (excursion?.length || 0)}
            />

            <IconContainer
              isOpen={menuIsOpen}
              onClick={() => {
                user ? setMenuIsOpen(true) : openAuthModal?.();
              }}
            >
              {user ? (
                <HeaderDenarii count={user.activeDenarium} />
              ) : (
                <IconEmptyProfile color={isDarkTheme ? theme.colors.gray : theme.colors.white} />
              )}

              {menuIsOpen && user && <ProfileMenu logout={logout} onClose={() => setMenuIsOpen(false)} />}
            </IconContainer>
          </ShopIcons>
        </ShopFavouriteAndUser>

        <MobileMenu
          menuList={getMenuItems(locale, `/${teams[0]?.Id}`)}
          position={positionMenu}
          openAuthModal={handleOpenAuthModal}
          close={closeMenu}
          logout={logout}
        />
      </MobileHeaderContainer>
    </Spacer>
  );
};

const Spacer = styled.div<{ visible?: boolean }>`
  display: none;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    display: block;
    padding-bottom: 8.87vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding-bottom: 18.13vw;
  }
`;

const MobileHeaderContainer = styled.div<{ visible?: boolean }>`
  display: none;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  transition: all 0.3s ease;
  background-color: ${({ theme }) => theme.colors.black_red};
  box-sizing: border-box;
  z-index: 99;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    display: flex;
    height: 8.86vw;
    align-items: center;
    padding-left: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 18.13vw;
    padding-left: 0;
  }
`;

const IconContainer = styled.div<{ isOpen?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: ${({ isOpen, theme }) => (isOpen ? theme.colors.blackLight : theme.colors.black)};
  padding: 0 0 0.3vw 0;

  svg {
    width: 2.71vw !important;
    height: 2.71vw !important;
    cursor: pointer;

    path {
      stroke: ${({ theme }) => theme.colors.gray_white};
    }

    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      width: 5.71vw !important;
      height: 5.71vw !important;
      padding: 0 0 0.3vw;
    }
  }
`;
const IconBurgerContainer = styled(IconContainer)`
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 0 0 0 4.27vw;
  }
`;

const LogoContainer = styled.div`
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    position: absolute;
    left: 40%;
    width: 20.6vw;
    height: 5.75vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    position: unset;
    width: 36.27vw;
    height: 10.13vw;
  }
`;

const ShopIcons = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  align-items: center;
  margin-left: auto;
  box-sizing: border-box;
  margin-right: 3.13vw;
  grid-column-gap: 4.56vw;
  svg {
    width: 3.13vw;
    height: 3.13vw;
    cursor: pointer;
    path {
      stroke: ${({ theme }) => theme.colors.gray_white};
    }
    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      width: 6.4vw;
      height: 6.4vw;
    }
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-column-gap: 3.67vw;
    margin-right: 3.2vw;
  }
`;

const ShopFavouriteAndUser = styled.div`
  display: flex;
`;
