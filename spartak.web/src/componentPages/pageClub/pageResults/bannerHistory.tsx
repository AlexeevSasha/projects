import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { IMainInfo } from "../../../api/dto/IMainInfo";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { theme } from "../../../assets/theme/theme";
import { ContainerContent } from "../../../components/containers/containerContent";
import { ContainerHorizontalScroll } from "../../../components/containers/containerHorizontalScroll";
import { NavMenu } from "../../../components/navMenu/navMenu";
import { NextImage } from "../../../ui/nextImage/nextImage";
import { mockClubSubMenuList } from "./mockClubMenu";

interface IProps {
  mainInfo?: IMainInfo;
}

export const BannerHistory = (props: IProps) => {
  const { locale } = useRouter();

  return (
    <>
      <BannerContainer>
        <NextImage
          src={getLocalValue(props.mainInfo?.previewImg, locale) || "/images/BannerFlag_v1.0.0.png"}
          objectFit="cover"
        />
        <Gradient />
      </BannerContainer>

      <StyledNavContainer>
        <ContainerHorizontalScroll>
          <NavMenu menuList={mockClubSubMenuList} noTheme />
        </ContainerHorizontalScroll>
      </StyledNavContainer>
    </>
  );
};

const BannerContainer = styled.article`
  position: relative;
  background: ${(props) => props.theme.colors.black_white};
  margin-bottom: 2.08vw;
  height: 31.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-bottom: 0;
    height: 44.32vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 42.66vw;
  }
`;

const Gradient = styled.div`
  background: ${theme.gradients.first};
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

const StyledNavContainer = styled(ContainerContent)`
  a {
    color: ${(props) => props.theme.colors.white_black};

    &:hover {
      border-bottom-color: ${theme.colors.red};
    }
  }
`;
