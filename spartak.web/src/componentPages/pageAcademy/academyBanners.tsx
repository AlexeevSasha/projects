import React, { useContext, useMemo } from "react";
import styled from "styled-components";
import { ContainerWithBackgroundImg } from "../../components/containers/containerWithBackgroundImg";
import { theme } from "../../assets/theme/theme";
import { useRouter } from "next/router";
import { ThemeContext } from "../../core/themeProvider";

type Props = {
  title?: string;
  previewImg?: string;
};

//todo изображения подставляеться либо, которое пришло с props либо с pageBanner
export const AcademyBanners = ({ title, previewImg }: Props) => {
  const { pathname } = useRouter();
  const { isDarkTheme } = useContext(ThemeContext);

  const pageBanner = useMemo(() => {
    switch (pathname) {
      case "/academy/about":
        return "/images/academy/banners/aboutAcademy_v1.0.0.png";
      case "/academy/teams":
        return "/images/academy/banners/teamsAcademy_v1.0.0.png";
      case "/academy/media":
        return "/images/academy/banners/mediaAcademy_v1.0.0.png";
      case "/academy/infrastructure":
        return "/images/academy/banners/infrastructureAcademy_v1.0.0.png";
      case "/academy/enter":
        return "/images/academy/banners/enterAcademy_v1.0.0.png";
      case "/academy/graduate":
        return "/images/academy/banners/graduateAcademy_v1.0.0.png";
      case "/academy/graduate/[id]":
        return "/images/academy/banners/graduateAcademy_v1.0.0.png";
      case "/academy/contacts":
        return "/images/academy/banners/contactsAcademy_v1.0.0.png";
      case "/academy/partners":
        return "/images/academy/banners/partnersAcademy_v1.0.0.png";
      case "/academy/philosophy":
        return "/images/academy/banners/aboutAcademy_v1.0.0.png";
      case "/academy/employees":
        return "/images/academy/banners/teamsAcademy_v1.0.0.png";
      default:
        return;
    }
  }, [pathname, isDarkTheme]);

  return (
    <StyledContainer
      gradient={"linear-gradient(181.45deg, rgba(13, 17, 22, 0) 1.21%, #0D1116 98.74%)"}
      position={"center"}
      src={previewImg || pageBanner || ""}
    >
      <Title>{title}</Title>
    </StyledContainer>
  );
};

const StyledContainer = styled(ContainerWithBackgroundImg)`
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    h1 {
      padding: 42.67vw 0 10.67vw 2.09vw;
    }
  }
`;
const Title = styled.h1`
  display: flex;
  align-items: end;
  z-index: 10;
  color: ${theme.colors.white};
  font-family: "FCSM Text", sans-serif;
  font-weight: 800;
  font-size: 4.58vw;
  padding: 20.31vw 0 4.17vw 8.65vw;
  margin: 0;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 9vw;
    padding: 19.27vw 0 5.21vw 4vw;
    font-weight: 700;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 10.67vw;
    padding: 56vw 0 10.67vw 2.09vw;
  }
`;
