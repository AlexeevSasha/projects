import React, { ReactNode } from "react";
import styled from "styled-components";
import { theme } from "../../assets/theme/theme";
import { ContainerContent } from "../containers/containerContent";
import { ContainerHorizontalScroll } from "../containers/containerHorizontalScroll";
import { INavMenuList } from "../header/component/getMenuItems";
import { NavMenu } from "./navMenu";

type Props = {
  menuList: INavMenuList[];
  children?: ReactNode;
};

export const NavMenuWithFilter = ({ children, menuList }: Props) => {
  return (
    <Content>
      <ContainerHorizontalScroll>
        <Menu menuList={menuList} usePrevQueryParam noTheme />
      </ContainerHorizontalScroll>

      {children}
    </Content>
  );
};

const Content = styled(ContainerContent)`
  margin-top: 2.08vw;
  margin-bottom: 0;
  z-index: 10;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-top: 3.13vw;
    flex-direction: column;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-top: 6.4vw;
  }
  & nav {
    grid-column-gap: 4.17vw;
    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      grid-column-gap: 4.95vw;
    }
    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      grid-column-gap: 0;
    }
  }
`;

const Menu = styled(NavMenu)`
  margin-top: 2.08vw;

  & a {
    color: ${({ theme }) => theme.colors.white_black};

    &:hover {
      border-bottom-color: ${theme.colors.red};
    }
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-top: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-top: 6.4vw;
  }
`;
