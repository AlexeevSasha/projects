import React from "react";
import { ContainerWithBackgroundImg } from "../../../components/containers/containerWithBackgroundImg";
import { theme } from "../../../assets/theme/theme";
import styled from "styled-components";
import { NavMenu } from "../../../components/navMenu/navMenu";
import { mockStadiumSubMenuList } from "../stadiumMenu/mockStadiumMenuList";
import { ContainerContent } from "../../../components/containers/containerContent";
import { ContainerHorizontalScroll } from "../../../components/containers/containerHorizontalScroll";

interface IProps {
  title?: string;
  banner: string;
  isWebView?: boolean;
}

export const StadiumBanner = (props: IProps) => {
  return (
    <>
      <ContainerWithBackgroundImg gradient={theme.gradients.first} position={"center"} src={props?.banner}>
        <Title>{props?.title}</Title>
      </ContainerWithBackgroundImg>

      {!props.isWebView && (
        <ContainerContent>
          <ContainerHorizontalScroll>
            <Menu menuList={mockStadiumSubMenuList} noTheme />
          </ContainerHorizontalScroll>
        </ContainerContent>
      )}
    </>
  );
};

const Title = styled.h1`
  display: flex;
  align-items: end;
  color: ${theme.colors.white};
  z-index: 10;
  font-family: "FCSM Text", sans-serif;
  font-weight: 800;
  font-size: 4.58vw;
  padding: 20.31vw 0 4.17vw 8.65vw;
  margin: 0;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 9.39vw;
    padding: 20.86vw 0 13.04vw 3.13vw;
    font-weight: 700;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 10.67vw;
    padding: 42.67vw 0 10.67vw 4.27vw;
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
