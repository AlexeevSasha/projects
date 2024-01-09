import { useRouter } from "next/router";
import { ChangeEvent, KeyboardEvent, useContext, useState } from "react";
import styled from "styled-components";
import { lang } from "../../../../../public/locales/lang";
import { blankSitesLinks } from "../../../../assets/constants/blankSitesLinks";
import { IconHome } from "../../../../assets/icon/iconHome";
import { IconMagnifyingGlass } from "../../../../assets/icon/iconMagnifyingGlass";
import { IconPlus } from "../../../../assets/icon/iconPlus";
import { IconTelegram } from "../../../../assets/icon/iconTelegram";
import { IconTheme } from "../../../../assets/icon/iconTheme";
import { IconVK } from "../../../../assets/icon/iconVK";
import { IconWinline } from "../../../../assets/icon/iconWinline";
import { IconYouTube } from "../../../../assets/icon/iconYouTube";
import { theme } from "../../../../assets/theme/theme";
import { DataContext } from "../../../../core/dataProvider";
import { ThemeContext } from "../../../../core/themeProvider";
import { InputStyle } from "../../../input/input";
import { INavMenuList } from "../getMenuItems";

interface IProps {
  menuList?: INavMenuList[];
  position: number;
  close: () => void;
  openAuthModal?: () => void;
  logout?: () => void;
}

export const MobileMenu = ({ close, ...props }: IProps) => {
  const [childMenuData, setDataChildMenu] = useState<{ position: number; child?: INavMenuList[] } | undefined>(
    undefined
  );
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);
  const { locale = "ru", pathname, push, query } = useRouter();
  const [searchText, setSearchText] = useState("");
  const { auth: { user = undefined } = {} } = useContext(DataContext);
  const isAcademyPage = pathname.startsWith("/academy");

  const clickSearch = () => {
    if (!searchText) return;
    push({ pathname: "/search", query: { search: searchText } });
    setSearchText("");
    close();
  };

  const onKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      clickSearch();
    }
  };

  const changeLocale = () => {
    close();
    push({ pathname, query }, undefined, { locale: lang[locale].header.symbolLang === "EN" ? "en" : "ru" });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <>
      <MobileMenuContainer position={props.position}>
        <SearchContainer>
          <InputContainer>
            <Input
              value={searchText}
              onChange={handleChange}
              placeholder={`${lang[locale].header.placeholder.searchinSite}...`}
              onKeyDown={onKeydown}
              type="search"
              lightStyle={!isDarkTheme}
            />
            <IconContainer>
              <IconPlus onClick={() => setSearchText("")} rotate="45deg" />
            </IconContainer>
          </InputContainer>

          <RedBlock onClick={() => clickSearch()}>
            <IconMagnifyingGlass />
          </RedBlock>

          <IconPlusBlock>
            <IconPlus onClick={close} rotate="45deg" />
          </IconPlusBlock>
        </SearchContainer>

        <Nav>
          {props.menuList?.map((elem, index) =>
            elem.child ? (
              <NativeLink
                href={"#"}
                onClick={() => setDataChildMenu({ position: 0, child: elem.child })}
                active={pathname.includes(elem.label)}
                key={`${elem.link}_${index}`}
              >
                {lang[locale].header.navList[`${elem.label}`]}
              </NativeLink>
            ) : (
              <NativeLink
                href={
                  elem.link?.startsWith("http") ? elem.link : `${elem.withoutLocale ? "" : "/" + locale}${elem.link}`
                }
                active={pathname.includes(elem.label)}
                key={`${elem.link}_${index}`}
              >
                {lang[locale].header.navList[`${elem.label}`]}
              </NativeLink>
            )
          )}
        </Nav>

        <LangContainer>
          <TextContainer onClick={changeLocale}>{lang[locale].header.symbolLang}</TextContainer>

          <BlankLink target="_blank" href={blankSitesLinks.winline}>
            <IconWinline heights={{ descTop: 2.87, tablet: 5.87, mobile: 6.4 }} />
          </BlankLink>
        </LangContainer>
        <ChangeThemeContainer onClick={toggleTheme} isDarkTheme={isDarkTheme}>
          <p>{isDarkTheme ? lang[locale].header.lightTheme : lang[locale].header.darkTheme}</p>
          <div>
            <IconTheme />
          </div>
        </ChangeThemeContainer>
        <ProfileContainer onClick={user ? props.logout : props.openAuthModal}>
          {lang[locale].header[user ? "logout" : "login"]}
        </ProfileContainer>

        <SocialNetwork>
          {isAcademyPage && (
            <SocialNetworkElem target="_blank" href={blankSitesLinks.academyHome}>
              <IconHome />
            </SocialNetworkElem>
          )}

          <SocialNetworkElem target="_blank" href={blankSitesLinks[isAcademyPage ? "academyYoutubeFirst" : "youtube"]}>
            <IconYouTube />
          </SocialNetworkElem>

          {isAcademyPage && (
            <SocialNetworkElem
              target="_blank"
              href={blankSitesLinks[isAcademyPage ? "academyYoutubeSecond" : "youtube"]}
            >
              <IconYouTube />
            </SocialNetworkElem>
          )}

          <SocialNetworkElem target="_blank" href={blankSitesLinks[isAcademyPage ? "academyTelegram" : "telegram"]}>
            <IconTelegram />
          </SocialNetworkElem>

          <SocialNetworkElem target="_blank" href={blankSitesLinks[isAcademyPage ? "academyVK" : "VK"]}>
            <IconVK />
          </SocialNetworkElem>
        </SocialNetwork>
      </MobileMenuContainer>

      {childMenuData && (
        <MobileMenu
          menuList={childMenuData.child}
          position={childMenuData.position}
          close={() => setDataChildMenu(undefined)}
        />
      )}
    </>
  );
};

const MobileMenuContainer = styled.div<{ position: number }>`
  position: fixed;
  top: 0;
  bottom: 0;
  right: ${(props) => -props.position + "px"};
  left: ${(props) => props.position + "px"};
  background-color: ${({ theme }) => theme.colors.black_white};
  transition: all 0.3s ease-in-out;
  z-index: 999;
  overflow: auto;
  min-height: 100vh;
`;

const SearchContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  & * {
    box-sizing: border-box;
  }
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 99vw;
    display: grid;
    grid-template-columns: 9fr 1fr auto;
    padding: 2.61vw 3.13vw;
    height: 6.5vw;
    margin-bottom: 6vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 4.27vw 0 4.27vw 4.8vw;
    height: 8.53vw;
    grid-template-columns: 5fr 1fr 2fr;
    width: 99vw;
    margin-bottom: 10vw;
  }
`;
const InputContainer = styled.div`
  div > svg {
    path {
      stroke: ${({ theme }) => theme.colors.white_black};
    }
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    height: inherit;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 74vw;
  }
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

const NativeLink = styled.a<{ active: boolean }>`
  color: ${({ theme }) => theme.colors.white_black};
  text-decoration: none;
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  text-transform: capitalize;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 4.17vw;
    box-shadow: ${({ active }) => (active ? "inset 0.65vw 0px 0px " + theme.colors.red : "")};
    padding: 1.56vw 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 8.53vw;
    box-shadow: ${({ active }) => (active ? "inset 1.33vw 0px 0px " + theme.colors.red : "")};
    padding: 3.2vw 4.27vw;
  }

  @media screen and (max-width: ${theme.rubberSize.phone}) {
    font-size: 6.4vw;
    box-shadow: ${({ active }) => (active ? "inset 1.33vw 0px 0px " + theme.colors.red : "")};
    padding: 3.2vw 4.27vw;
  }
`;

const LangContainer = styled.div`
  border-top: ${({ theme }) => `0.05vw solid ${theme.colors.gray_white1}`};
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: "FCSM Text", sans-serif;
  text-transform: uppercase;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 3.13vw;
    font-size: 2.09vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 6.4vw 4.27vw;
    font-size: 4.27vw;
  }
`;

const ChangeThemeContainer = styled.div<{ isDarkTheme?: boolean }>`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.white_black};
  font-weight: 500;
  border-top: ${({ theme }) => `0.05vw solid ${theme.colors.gray_white1}`};
  display: flex;
  font-family: "FCSM Text", sans-serif;
  text-transform: uppercase;

  p {
    display: flex;
    align-items: center;
    margin: 0;
    padding-right: 11px;
  }
  div {
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      path:first-of-type {
        stroke: ${({ theme }) => theme.colors.white_black};
      }
      path:last-of-type {
        stroke: ${({ theme }) => theme.colors.white_black};
        fill: ${({ theme }) => theme.colors.white_black};
      }
    }
  }
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 3.13vw;
    font-size: 2.09vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 6.4vw 4.27vw;
    font-size: 4.27vw;
  }
`;

const BlankLink = styled.a`
  display: flex;
  align-items: center;
`;

const TextContainer = styled.span`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.white_black};
  font-weight: 500;
  text-transform: uppercase;
  display: flex;
  align-items: center;
`;

const ProfileContainer = styled.div`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.white_black};
  font-weight: 500;
  border-top: ${({ theme }) => `0.05vw solid ${theme.colors.gray_white1}`};
  display: flex;
  font-family: "FCSM Text", sans-serif;
  text-transform: uppercase;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 3.13vw;
    font-size: 2.09vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 6.4vw 4.27vw;
    font-size: 4.27vw;
  }
`;

const SocialNetwork = styled.div`
  border-top: ${({ theme }) => `0.05vw solid ${theme.colors.gray_white1}`};
  display: flex;
  justify-content: left;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 3.13vw;
    gap: 3.91vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 6.4vw 4.27vw 20vw;
    gap: 4.27vw;
  }
`;

const SocialNetworkElem = styled.a`
  position: relative;
  display: flex;
  padding: 1.56vw;
  background-color: ${({ theme }) => theme.colors.gray_grayDark1}10;
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.white_grayDark1};
`;

const IconContainer = styled.div`
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    position: absolute;
    transform: translate(50%, -50%);
    top: 50%;
    right: 2.6vw;

    & > svg {
      display: block;
      width: 2.09vw;
      height: 2.09vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    right: 4vw;

    & > svg {
      min-width: 4.27vw;
      min-height: 4.27vw;
    }
  }
`;

const Input = styled(InputStyle)`
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    border-radius: 0;
    margin-top: 1px;
    background: ${({ theme }) => theme.colors.blackLight_white1};
    border: ${({ theme }) => `1px solid ${theme.colors.grayDark_gray1}`};
    color: ${({ theme }) => theme.colors.white_black};
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 1.83vw 4.09vw 1.17vw 2.09vw;
    font-size: 2.09vw;
    &:active,
    &:hover,
    &:focus {
      outline: 0;
      outline-offset: 0;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 1.33vw 8.27vw 1.33vw 4.27vw;
    font-size: 4.27vw;
    margin-top: 0;
  }
`;

const RedBlock = styled.div`
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    background: ${theme.colors.red};
    display: flex;
    justify-content: center;
    cursor: pointer;
    align-items: center;
    padding: 2.29vw 1.76vw;
    border: ${({ theme }) => `1px solid ${theme.colors.grayDark_gray1}`};
    border-left: none;
    margin-right: 2.74vw;

    svg {
      width: 2.08vw;
      height: 2.08vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 1.87vw;
    z-index: 1;
    margin-right: 0.5vw;
    svg {
      width: 4.27vw;
      height: 4.27vw;
    }
  }
`;

const IconPlusBlock = styled.div`
  justify-content: center;
  display: flex;
  align-items: center;
  z-index: 0;

  svg {
    path {
      stroke: ${({ theme }) => theme.colors.white_black};
    }
  }
`;
