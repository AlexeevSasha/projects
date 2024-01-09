import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { lang } from "../../../public/locales/lang";
import { theme } from "../../assets/theme/theme";
import { ContainerContent } from "../../components/containers/containerContent";
import { NextImage } from "../../ui/nextImage/nextImage";

export const FanIdBanner = () => {
  const { locale = "ru" } = useRouter();

  return (
    <Container>
      <BgLContainer>
        <NextImage src={"/images/banners/fanIdBgL_v1.0.0.png"} objectFit={"fill"} />
      </BgLContainer>
      <BgMContainer>
        <NextImage src={"/images/banners/bgSubscriptionM_v1.0.0.png"} objectFit="cover" />
      </BgMContainer>
      <BgSContsiner>
        <NextImage src={"/images/banners/bgSubscriptionS_v1.0.0.png"} objectFit="cover" />
      </BgSContsiner>
      <Link prefetch={false} href={`${process.env.NEXT_PUBLIC_TICKETS_HOME_URL}/${locale}/info/fanCard`} passHref>
        <BannerTextBlock>
          <FanIdTitle>{lang[locale].shop.fanIdBannerTitle}</FanIdTitle>
          <FanIdText>{lang[locale].shop.fanIdBannerText}</FanIdText>
        </BannerTextBlock>
      </Link>
      <ContainerImage>
        <NextImage src={"/images/tickets/fanId/FanIdImg_v1.0.0.png"} />
      </ContainerImage>
    </Container>
  );
};
const Container = styled(ContainerContent)`
  color: ${theme.colors.white};
  margin-top: 0;
  margin-bottom: 6.25vw;
  position: relative;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-bottom: 10.43vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-bottom: 10.67vw;
    width: inherit;
  }
`;
const BgLContainer = styled.div`
  display: block;
  height: 100%;
  width: 100%;
  position: absolute;
  & img {
    object-fit: fill;
  }
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    display: none;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    display: none;
  }
`;
const BgMContainer = styled.div`
  display: none;
  height: 100%;
  width: 100%;
  position: absolute;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    display: block;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    display: none;
  }
`;
const BgSContsiner = styled.div`
  display: none;
  height: 100%;
  width: 100%;
  position: absolute;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    display: none;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    display: block;
  }
`;

const BannerTextBlock = styled.section`
  z-index: 1;
  width: 50.56vw;
  padding: 2.08vw;
  display: flex;
  align-items: flex-start;
  grid-gap: 2.08vw;
  flex-direction: column;
  cursor: pointer;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 5.22vw;
    width: 100%;
    grid-gap: 3.65vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 6.4vw 4.27vw;
    grid-gap: 3.2vw;
  }
`;

const FanIdTitle = styled.h1`
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  margin: 0;
  font-size: 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 4.17vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-family: "FCSM Text", sans-serif;
    font-size: 6.4vw;
    line-height: 9vw;
    font-weight: 500;
  }
`;

const FanIdText = styled.h2`
  font-family: "FCSM Text", sans-serif;
  margin: 0;
  font-size: 0.94vw;
  font-weight: 500;
  width: 45vw;
  line-height: 1.46vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
    width: inherit;
    line-height: inherit;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
    color: ${theme.colors.white};
    margin-bottom: 3.2vw;
    width: inherit;
    line-height: inherit;
  }
`;

const ContainerImage = styled.div`
  position: absolute;
  height: 17.08vw;
  width: 19.53vw;
  bottom: 0.83vw;
  right: 8.05vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    display: none;
  }
`;
