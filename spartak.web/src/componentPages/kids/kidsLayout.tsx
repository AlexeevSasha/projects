import { useRouter } from "next/router";
import React, { FC } from "react";
import styled from "styled-components";
import { lang } from "../../../public/locales/lang";
import { IconArrowRight } from "../../assets/icon/iconArrowRight";
import { theme } from "../../assets/theme/theme";
import { CustomButton } from "../../components/buttons/customButton";
import { ContainerContent } from "../../components/containers/containerContent";
import { ContainerHorizontalScroll } from "../../components/containers/containerHorizontalScroll";
import { ContainerWithBackgroundImg } from "../../components/containers/containerWithBackgroundImg";
import { INavMenuList } from "../../components/header/component/getMenuItems";
import { GetLayout } from "../../components/layout/getLayout";
import { NavMenu } from "../../components/navMenu/navMenu";
import { getLocalValue } from "../../assets/helpers/getLocalValue";
import { PageProps } from "../../../pages/_app";

const kidsMenuItems: INavMenuList[] = [
  { label: "kids/spartakKids", link: "/kids/spartakKids" },
  { label: "kids/rules", link: "/kids/rules" },
  // { label: "kids/comics", link: "/kids/comics" },
];

type Props = {
  title: string;
  bannerSrc: string;
};

const KidsLayout: FC<Props> = ({ children, title, bannerSrc }) => {
  const { locale = "ru", push, query } = useRouter();

  return (
    <>
      <ContainerWithBackgroundImg gradient={theme.gradients.first} src={bannerSrc} position="center">
        <Title>{getLocalValue(title, locale)}</Title>
      </ContainerWithBackgroundImg>

      <Container>
        <ContainerHorizontalScroll>
          {query.season ? (
            <Button type="opacity" withGap onClick={() => push("/kids/comics")}>
              <IconArrowRight rotate="180deg" />
              {lang[locale].kids.allSeasons}
            </Button>
          ) : (
            <Menu menuList={kidsMenuItems} usePrevQueryParam noTheme />
          )}
        </ContainerHorizontalScroll>
      </Container>

      {children}
    </>
  );
};

export const getKidsLayout = (page: JSX.Element, props: PageProps & Props) => {
  return GetLayout(
    <KidsLayout title={props.title} bannerSrc={props.bannerSrc}>
      {page}
    </KidsLayout>,
    props
  );
};

const Container = styled(ContainerContent)`
  margin-top: 2.08vw;

  & nav > a:not(:last-child) {
    margin-right: 4.16vw;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-top: 0;

    & nav > a:not(:last-child) {
      margin-right: 5.215vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    & nav > a:not(:last-child) {
      margin-right: 8.26vw;
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

const Title = styled.h1`
  color: ${theme.colors.white};
  font-family: "FCSM Text", sans-serif;
  box-sizing: border-box;
  display: flex;
  align-items: end;
  z-index: 10;
  font-weight: 700;
  font-size: 4.58vw;
  height: 31.25vw;
  padding: 0 0 4.1666vw 8.75vw;
  margin: 0;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 9.39vw;
    padding: 0 0 5.215vw 4vw;
    height: 45.63vw;
    width: 75vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 10.67vw;
    padding: 0 0 10.666vw 2.09vw;
    height: 80vw;
  }
`;

const Button = styled(CustomButton)`
  padding: 0;
  width: 8.23vw;
  height: 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 20.6vw;
    height: 5.215vw;
    margin-top: 5.215vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 38.13vw;
    height: 8.53vw;
    font-size: 3.2vw;
    margin-top: 10.66vw;
  }

  & > svg > path {
    stroke: ${({ theme }) => theme.colors.white_red};
  }
`;
