import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { lang } from "../../../public/locales/lang";
import { theme } from "../../assets/theme/theme";
import { INavMenuList } from "../header/component/getMenuItems";
import { DropDownNavMenu } from "./DropDownNavMenu";

interface IProps {
  menuList: INavMenuList[];
  usePrevQueryParam?: boolean;
  noTheme?: boolean;
  className?: string;
}

export const NavMenu = (props: IProps) => {
  const { locale = "ru", pathname, query } = useRouter();

  const isActiveTab = (label: string, queryTab?: string) => {
    const regexp = new RegExp(`^/${label}`);
    return regexp.test(pathname) || Boolean(query.tab && query.tab === queryTab);
  };

  return (
    <Nav className={props.className}>
      {props.menuList.map((elem, index) => {
        return elem?.child ? (
          <DropDownNavMenu
            key={`${elem.link}_${index}`}
            menuItems={elem.child}
            label={lang[locale].header.navList[`${elem.label}`]}
            active={isActiveTab(elem.label, elem.query?.tab)}
          />
        ) : (
          <Link
            prefetch={false}
            href={{
              pathname: elem?.link,
              query: query.hasOwnProperty("category")
                ? props.usePrevQueryParam
                  ? { ...query, ...elem?.query, category: "0" }
                  : { ...elem.query, category: "0" }
                : props.usePrevQueryParam
                ? { ...query, ...elem?.query }
                : { ...elem.query },
            }}
            key={`${elem?.link}_${index}`}
            passHref
            locale={locale}
          >
            <NativeLink active={isActiveTab(elem?.label, elem?.query?.tab)} noTheme={props.noTheme}>
              {lang[locale].header.navList[`${elem?.label}`]}
            </NativeLink>
          </Link>
        );
      })}
    </Nav>
  );
};

const Nav = styled.nav`
  display: flex;
  align-items: center;
  height: 100%;
`;

export const NativeLink = styled.a<{ active?: boolean; noTheme?: boolean }>`
  font-family: "FCSM Text", sans-serif;
  width: max-content;
  font-size: 0.73vw;
  font-weight: 600;
  text-transform: uppercase;
  color: ${theme.colors.white};
  padding: 0.2vw 1.67vw 0 1.67vw;
  border-bottom-color: ${(props) =>
    props.active ? (props.noTheme ? theme.colors.red : props.theme.colors.red_white) : "transparent"};
  border-bottom-style: solid;
  border-bottom-width: 0.2vw;
  text-decoration: none;
  box-sizing: border-box;
  height: 100%;
  min-height: 2.6vw;
  display: flex;
  align-items: center;

  &:hover {
    border-bottom-color: ${({ theme }) => theme.colors.red_white};
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 0 4.17vw;
    font-size: 1.83vw;
    border-bottom-width: 0.5vw;
    height: 6.52vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 0 3.2vw;
    font-size: 3.2vw;
    border-bottom-width: 1vw;
    height: 10.13vw;
  }
`;
