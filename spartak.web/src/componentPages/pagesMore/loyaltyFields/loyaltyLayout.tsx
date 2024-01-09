import React from "react";
import styled from "styled-components";
import { INavMenuList } from "../../../components/header/component/getMenuItems";
import { GetLayout } from "../../../components/layout/getLayout";
import { ContainerWithBackgroundImg } from "../../../components/containers/containerWithBackgroundImg";
import { theme } from "../../../assets/theme/theme";
import { ContainerHorizontalScroll } from "../../../components/containers/containerHorizontalScroll";
import { ContainerContent } from "../../../components/containers/containerContent";
import { NavMenu } from "../../../components/navMenu/navMenu";
import { useRouter } from "next/router";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { PageProps } from "../../../../pages/_app";

const loyaltyMenuItems: INavMenuList[] = [
  {
    label: "more/loyalty/main",
    link: "/more/loyalty/main",
  },
  {
    label: "more/loyalty/rules",
    link: "/more/loyalty/rules",
  },
  // {
  //   label: "more/loyalty/card",
  //   link: "/more/loyalty/card",
  // },
  {
    label: "more/loyalty/chairPlotting",
    link: "/more/loyalty/chairPlotting",
  },
];

type Props = PageProps & {
  title: string;
  bannerSrc: string;
};

export const LoyaltyLayout = (page: JSX.Element, props: Props) => {
  const { locale = "ru" } = useRouter();
  return GetLayout(
    <>
      <ContainerWithBackgroundImg gradient={theme.gradients.first} src={props.bannerSrc} position="center">
        <Title>{getLocalValue(props.title, locale)}</Title>
      </ContainerWithBackgroundImg>

      <Content>
        <ContainerHorizontalScroll>
          <Menu menuList={loyaltyMenuItems} usePrevQueryParam noTheme />
        </ContainerHorizontalScroll>
      </Content>

      {page}
    </>,
    props
  );
};

const Title = styled.h1`
  display: flex;
  align-items: end;
  z-index: 10;
  color: ${theme.colors.white};
  font-family: "FCSM Text", sans-serif;
  font-weight: 800;
  font-size: 4.58vw;
  box-sizing: border-box;
  padding: 0 0 5.36vw 8.65vw;
  margin: 0;
  height: 31.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 9vw;
    font-weight: 700;
    padding: 0 0 5.21vw 3.13vw;
    height: 44.719vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 10.67vw;
    padding: 0 0 10.67vw 2.09vw;
    height: 80vw;
  }
`;

const Content = styled(ContainerContent)`
  margin-top: 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-top: 0;
    & > nav > *:not(:last-child) {
      margin-right: 4.17vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    & > nav > *:not(:last-child) {
      margin-right: 0;
    }
  }
`;

const Menu = styled(NavMenu)`
  & a {
    color: ${({ theme }) => theme.colors.white_black};

    &:hover {
      border-bottom-color: ${theme.colors.red};
    }
  }
`;
