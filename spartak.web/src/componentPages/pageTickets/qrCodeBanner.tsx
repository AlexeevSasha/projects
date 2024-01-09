import React from "react";
import styled from "styled-components";
import { ContainerContent } from "../../components/containers/containerContent";
import { theme } from "../../assets/theme/theme";
import { NextImage } from "../../ui/nextImage/nextImage";
import { useWindowSize } from "../../core/hooks/UseWindowSize";
import { useRouter } from "next/router";
import { lang } from "../../../public/locales/lang";

type Props = {
  hideInSmallScreen?: boolean;
};

export const QrCodeBanner = ({ hideInSmallScreen }: Props) => {
  const { locale = "ru" } = useRouter();
  const { width = 1920 } = useWindowSize(true);

  const bgImageName = width > 767 ? (width > 1199 ? "bgL" : "bgM") : "bgS";

  return (
    <Container hide={hideInSmallScreen}>
      <Background><NextImage src={`/images/tickets/${bgImageName}.svg`} objectFit="cover" /></Background>

      <LeftContainer>
        <Title>{lang[locale].tickets.qrCodeTitle}</Title>

        <Text>{lang[locale].tickets.qrCodeText}</Text>
      </LeftContainer>

      <ImgContainer><NextImage src={"/images/tickets/qr_v1.0.0.png"} /></ImgContainer>
    </Container>
  );
};

const Container = styled(ContainerContent) <{ hide?: boolean }>`
  color: ${theme.colors.white};
  position: relative;
  background-size: cover;
  background-repeat: no-repeat;
  box-sizing: border-box;
  padding: 2.08vw;
  display: flex;
  align-items: center;
  color: ${theme.colors.white};
  font-family: "FCSM Text", sans-serif;
  margin-bottom: 5.16vw;
  background-color: ${({ theme }) => theme.colors.none_red};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    display: ${({ hide }) => (hide ? "none" : "flex")};
    padding: 5.21vw;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 6.4vw 4.26vw;
  }
`;

const Background = styled.div`
  position: absolute;
  left: 0;
  right: 0;
`;

const LeftContainer = styled.div`
  font-family: "FCSM Text", sans-serif;
  width: 45.31vw;
  display: flex;
  flex-direction: column;
  z-index: 1;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 100%;
  }
`;

const Title = styled.h4`
  margin: 0;
  font-weight: 700;
  font-size: 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 4.17vw;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 6.4vw;
  }
`;

const Text = styled.p`
  font-weight: 500;
  font-size: 0.94vw;
  margin: 0;
  margin-top: 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.34vw;
    margin-top: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 4.26vw;
    margin-top: 6.4vw;
  }
`;

const ImgContainer = styled.div`
  position: absolute;
  right: 11.77vw;
  bottom: 0.63vw;
  height: 16.73vw;
  width: 12vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    display: none;
  }
`;
