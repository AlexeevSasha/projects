import styled from "astroturf/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Container } from "../Container";
import { IconBucket } from "../icons/IconBucket";
import { IconBurger } from "../icons/IconBurger";
import { IconHeart } from "../icons/IconHeart";
import { IconHelp } from "../icons/IconHelp";
import { IconPerson } from "../icons/IconPerson";
import { CatalogInMobileHeader } from "./CatalogInMobileHeader";
import { HeaderControl } from "./HeaderControl";
import { HeaderHelpfulLinks } from "./HeaderHelpfulLinks";
import { HeaderUsefulInformation } from "./HeaderUsefulInformation";
import { ChooseLocation } from "./ChooseLocation";
import { IconLogo } from "../icons/IconLogo";
import { SearchInputInHeader } from "./SearchInputInHeader";

export const Header = () => {
  const lastScrollPosition = useRef(0);
  const [openResultInput, setOpenResultInput] = useState(false);
  const [visible, setVisible] = useState(true);
  const [heightHeader, setHeightHeader] = useState(0);
  const [showMobileCatalog, setShowMobileCatalog] = useState(false);

  const handleScroll = () => {
    if (!window.scrollY || window.scrollY == 0 || lastScrollPosition.current < 50) {
      setVisible(true);
    } else {
      setVisible(false);
    }

    lastScrollPosition.current = window.scrollY;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    setHeightHeader(document.getElementById("header")?.clientHeight || 0);
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <ContainerHeaderTop id="header">
        <Container>
          <HeaderUsefulInformation visible={visible} />
          <HeaderControl />
          <HeaderHelpfulLinks visible={visible} />
        </Container>
      </ContainerHeaderTop>

      <BGMobile visible={openResultInput} />
      <ContainerHeaderTop isMobile id="header-mobile">
        <ContainerIcon>
          <Link href={"/"} style={{ display: "flex" }}>
            <IconLogo color={"white"} />
          </Link>
          <ChooseLocation />
        </ContainerIcon>
        <SearchInputInHeader openResult={setOpenResultInput} />
      </ContainerHeaderTop>

      <BackgroundBlockMobile />

      <BackgroundBlock style={{ height: `${heightHeader}px` }} />

      <MobileMenu>
        <CatalogInMobileHeader isOpen={showMobileCatalog} />
        <MobileHeaderNav>
          <MobileHeaderLink onClick={() => setShowMobileCatalog(!showMobileCatalog)}>
            <IconBurger size="md" />
            <MobileHeaderNext>Каталог</MobileHeaderNext>
          </MobileHeaderLink>
          <Link href="/favourites" passHref>
            <MobileHeaderLink>
              <IconHeart color="#fff" />
              <MobileHeaderNext>Избранное</MobileHeaderNext>
            </MobileHeaderLink>
          </Link>
          <Link href="/basket" passHref>
            <MobileHeaderLink>
              <IconBucket />
              <MobileHeaderNext>Корзина</MobileHeaderNext>
            </MobileHeaderLink>
          </Link>
          <Link href="/profile" passHref>
            <MobileHeaderLink>
              <IconPerson />
              <MobileHeaderNext>Кабинет</MobileHeaderNext>
            </MobileHeaderLink>
          </Link>
          <Link href="/help" passHref>
            <MobileHeaderLink>
              <IconHelp />
              <MobileHeaderNext>Помощь</MobileHeaderNext>
            </MobileHeaderLink>
          </Link>
        </MobileHeaderNav>
      </MobileMenu>
    </>
  );
};

const BGMobile = styled.div<{ visible: boolean }>`
  @import "variables";

  display: none;
  position: absolute;
  min-height: 100vh;
  height: 100%;
  width: 100%;
  background: rgb($black, 0.8);
  left: 0;
  top: 0;
  z-index: 5;

  @include respond-to(small) {
    &.visible {
      display: block;
    }
  }
`;

const ContainerHeaderTop = styled.header<{ isMobile?: boolean }>`
  @import "variables";

  width: 100%;
  background-color: $blue1;
  padding: 16px 0 20px;
  border-radius: 0px 0px 32px 32px;

  position: fixed;
  z-index: 99;
  top: 0;

  &.isMobile {
    display: none;
  }

  @include respond-to(small) {
    border-radius: 0 0 24px 24px;
    padding: 16px;
    display: none;

    &.isMobile {
      display: block;
    }
  }
`;

const BackgroundBlock = styled.div`
  @import "variables";

  @include respond-to(small) {
    display: none;
  }
`;

const BackgroundBlockMobile = styled.div`
  @import "variables";
  height: 109px;
  display: none;

  @include respond-to(small) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  @import "variables";
  display: none;

  @include respond-to(small) {
    display: block;
    position: fixed;
    bottom: 0;
    z-index: 99;

    width: 100%;
  }
`;

const MobileHeaderNav = styled.nav`
  @import "variables";

  display: grid;
  grid-template-columns: repeat(5, 1fr);
  background-color: $blue1;
  z-index: 2;
  position: relative;
  padding: 12px 0;
  border-radius: 24px 24px 0 0;
`;

const MobileHeaderLink = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MobileHeaderNext = styled.span`
  @import "variables";

  font-weight: 500;
  font-size: 11px;
  color: $white;
  opacity: 0.7;
  margin-top: 5px;
`;

const ContainerIcon = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 13px;
`;
