import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { blankSitesLinks } from "../../../assets/constants/blankSitesLinks";
import { FavouriteIcon } from "../../../assets/icon/FavouriteIcon";
import { Lukoil } from "../../../assets/icon/Lukoil";
import { ShopCard } from "../../../assets/icon/ShopCart";
import { IconEmptyProfile } from "../../../assets/icon/iconEmptyProfile";
import { IconHome } from "../../../assets/icon/iconHome";
import { IconMagnifyingGlass } from "../../../assets/icon/iconMagnifyingGlass";
import { IconTelegram } from "../../../assets/icon/iconTelegram";
import { IconTheme } from "../../../assets/icon/iconTheme";
import { IconVK } from "../../../assets/icon/iconVK";
import { IconWinline } from "../../../assets/icon/iconWinline";
import { IconYouTube } from "../../../assets/icon/iconYouTube";
import { SpartakLogoEn } from "../../../assets/icon/spartakLogo/spartakLogoEn";
import { SpartakLogoRu } from "../../../assets/icon/spartakLogo/spartakLogoRu";
import { theme } from "../../../assets/theme/theme";
import { DataContext } from "../../../core/dataProvider";
import { ThemeContext } from "../../../core/themeProvider";
import { NavMenu } from "../../navMenu/navMenu";
import { SearchHeader } from "../../searchHeader/searchHeader";
import { Tooltip } from "../../tooltip/tooltip";
import { getMenuItems } from "./getMenuItems";
import { HeaderDenarii } from "./headerDenarii";
import { ProfileMenu } from "./profileMenu";

type Props = {
  openAuthModal?: () => void;
  logout: () => void;
};

export const DesktopHeader = ({ openAuthModal, logout }: Props) => {
  const { locale = "ru", push, pathname, query } = useRouter();
  const [searchOpened, setSearchOpened] = useState<boolean>(false);
  const isAcademyPage = pathname.startsWith("/academy") || false;

  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);

  const dataContext = useContext(DataContext);
  const { auth: { user = undefined } = {}, data: { teams = [] } = {} } = dataContext;
  const { shop: { products = undefined, tickets = undefined, excursion = undefined } = {}, setDrawerIsOpen } =
    dataContext;

  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const lastScrollPosition = useRef(0);
  const [visible, setVisible] = useState(true);

  const changeLocale = () => {
    push({ pathname, query: query.page ? { ...query, page: 1 } : query }, undefined, {
      locale: lang[locale].header.symbolLang === "EN" ? "en" : "ru",
    });
  };

  const handleScroll = () => {
    if (!window.scrollY || lastScrollPosition.current > window.scrollY || window.scrollY == 0) {
      setVisible(true);
    } else {
      setVisible(false);
    }

    lastScrollPosition.current = window.scrollY;
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <>
      <HeaderContainer visible={visible}>
        <Link prefetch={false} href="/" passHref>
          <LogoContainer bigSize={visible}>
            {locale === "ru" ? (
              <SpartakLogoRu isDarkTheme={isDarkTheme} />
            ) : (
              <SpartakLogoEn isDarkTheme={isDarkTheme} />
            )}
          </LogoContainer>
        </Link>

        <ContentContainer>
          <SettingContainer>
            <Link href={"https://lukoil.ru/"} passHref>
              <a target="_blank" style={{ display: "flex", margin: "auto auto auto 0" }}>
                <Lukoil />
              </a>
            </Link>
            <SocialBlock>
              {isAcademyPage && (
                <ItemWrapper>
                  <BlankLink target="_blank" href={blankSitesLinks.academyHome}>
                    <IconHome />
                    <InfoTooltip>
                      <Tooltip position="bottom">{lang[locale].header.tooltips.oldHomeAcademy}</Tooltip>
                    </InfoTooltip>
                  </BlankLink>
                </ItemWrapper>
              )}
              <ItemWrapper>
                <BlankLink
                  target="_blank"
                  href={blankSitesLinks[isAcademyPage ? "academyYoutubeFirst" : "youtube"]}
                  aria-label="youtube channel"
                >
                  <IconYouTube />
                  <InfoTooltip>
                    <Tooltip position="bottom">
                      {isAcademyPage
                        ? lang[locale].header.tooltips.youtubeAcademy
                        : lang[locale].header.tooltips.youtube}
                    </Tooltip>
                  </InfoTooltip>
                </BlankLink>
              </ItemWrapper>

              {isAcademyPage && (
                <ItemWrapper>
                  <BlankLink
                    target="_blank"
                    href={blankSitesLinks[isAcademyPage ? "academyYoutubeSecond" : "youtube"]}
                    aria-label="youtube channel 2"
                  >
                    <IconYouTube />
                    <InfoTooltip>
                      <Tooltip position="bottom">{lang[locale].header.tooltips.youtubeAcademyLive}</Tooltip>
                    </InfoTooltip>
                  </BlankLink>
                </ItemWrapper>
              )}
              <ItemWrapper>
                <BlankLink
                  target="_blank"
                  href={blankSitesLinks[isAcademyPage ? "academyTelegram" : "telegram"]}
                  aria-label="telegram channel"
                >
                  <IconTelegram />
                  <InfoTooltip>
                    <Tooltip position="bottom">
                      {isAcademyPage
                        ? lang[locale].header.tooltips.telegramAcademy
                        : lang[locale].header.tooltips.telegram}
                    </Tooltip>
                  </InfoTooltip>
                </BlankLink>
              </ItemWrapper>
              <ItemWrapper>
                <BlankLink
                  target="_blank"
                  href={blankSitesLinks[isAcademyPage ? "academyVK" : "VK"]}
                  aria-label="vk channel"
                >
                  <IconVK />
                  <InfoTooltip>
                    <Tooltip position="bottom">
                      {isAcademyPage ? lang[locale].header.tooltips.vkAcademy : lang[locale].header.tooltips.vk}
                    </Tooltip>
                  </InfoTooltip>
                </BlankLink>
              </ItemWrapper>
            </SocialBlock>

            <IconWrapper onClick={() => setSearchOpened(true)}>
              <IconMagnifyingGlass />
            </IconWrapper>

            <IconWrapper onClick={toggleTheme}>
              <IconTheme />
            </IconWrapper>

            <IconWrapper onClick={changeLocale}>
              <TextContainer>{lang[locale].header.symbolLang}</TextContainer>
            </IconWrapper>

            <ProfileContainer isOpen={menuIsOpen} onClick={user ? () => setMenuIsOpen(true) : openAuthModal}>
              <span>{user?.personalData?.FirstName || lang[locale].header.login}</span>

              {user ? (
                <HeaderDenarii count={user.activeDenarium} />
              ) : (
                <IconEmptyProfile style={{ marginLeft: "18px" }} />
              )}

              {menuIsOpen && user && <ProfileMenu logout={logout} onClose={() => setMenuIsOpen(false)} />}
            </ProfileContainer>
          </SettingContainer>

          <NavContainer visible={visible}>
            <NavMenu menuList={getMenuItems(locale, `/${teams[0]?.Id}`)} />

            <ShopIcons>
              <Link prefetch={false} href={"/personal/favourites"}>
                <a aria-label="favorite things">
                  <FavouriteIcon />
                </a>
              </Link>

              <ShopCard
                onClick={() => setDrawerIsOpen(true)}
                itemsCount={(products?.list?.length || 0) + (tickets?.length || 0) + (excursion?.length || 0)}
              />
            </ShopIcons>

            <BlankLink target="_blank" href={blankSitesLinks.winline} aria-label="winline website">
              <IconWinline />
            </BlankLink>
          </NavContainer>
        </ContentContainer>

        {searchOpened ? <SearchHeader close={() => setSearchOpened(false)} opened={searchOpened} /> : null}
      </HeaderContainer>
    </>
  );
};

const ShopIcons = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: 1.72vw;
  grid-gap: 1.72vw;

  svg {
    width: 1.25vw;
    height: 1.25vw;
    cursor: pointer;
  }
`;

const HeaderContainer = styled.div<{ visible?: boolean }>`
  display: flex;
  position: fixed;
  transform: ${(props) => (props.visible ? "translateY(0)" : "translateY(-50%)")};
  background: ${(props) => props.theme.colors.black_red};
  width: 100%;
  z-index: 101;
  border-bottom: ${(props) => `0.05vw solid ${props.theme.colors.grayDark_redDark}`};
  transition: all 0.1s linear;
  will-change: transition;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    display: none;
  }
`;

const LogoContainer = styled.a<{ bigSize?: boolean }>`
  display: flex;
  align-self: end;
  padding: ${(props) => (props.bigSize ? "1.15vw 1.25vw" : "0.42vw 3.02vw")};
  width: ${(props) => (props.bigSize ? "13.18vw" : "9.06vw")};
  height: ${(props) => (props.bigSize ? "3.18vw" : "2vw")};
  transition: all 0.1s linear;
  border-right: ${(props) => `0.05vw solid ${props.theme.colors.grayDark_redDark}`};

  & svg {
    width: 100%;
    height: 100%;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const SettingContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 50%;
  border-bottom: ${(props) => `0.05vw solid ${props.theme.colors.grayDark_redDark}`};
`;
const InfoTooltip = styled.div`
  position: relative;
  display: none;
`;
const SocialBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.25vw;
  padding-right: 1.67vw;
  cursor: pointer;
`;
const ItemWrapper = styled.div`
  a {
    &:hover {
      color: ${({ theme }) => theme.colors.red_white};
      ${InfoTooltip} {
        display: flex;
      }
    }
  }
`;
const IconWrapper = styled.div`
  padding: 0.43vw 0.83vw;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-left: ${(props) => `0.05vw solid ${props.theme.colors.grayDark_redDark}`};

  &:hover {
    color: ${({ theme }) => theme.colors.red_carnationPink};
  }
`;

const ProfileContainer = styled.div<{ isOpen?: boolean }>`
  position: relative;
  font-family: "FCSM Text", sans-serif;
  font-size: 0.83vw;
  text-transform: uppercase;
  padding: 0.43vw 0.83vw;
  display: flex;
  align-items: center;
  border-left: ${(props) => `0.05vw solid ${props.theme.colors.grayDark_redDark}`};
  cursor: pointer;
  letter-spacing: -0.165px;
  background: ${({ isOpen, theme }) => (!isOpen ? theme.colors.black_red : theme.colors.blackLight_red)};

  &:hover {
    color: ${({ theme }) => theme.colors.red_carnationPink};
  }
`;

const TextContainer = styled.span`
  font-family: "FCSM Text", sans-serif;
  font-size: 0.83vw;
  text-transform: uppercase;
`;

const NavContainer = styled.div<{ visible?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 0.83vw;
  height: 50%;
`;

const BlankLink = styled.a`
  display: flex;
  align-items: center;
  position: relative;
  color: ${({ theme }) => theme.colors.grayDark_carnationPink};
`;
