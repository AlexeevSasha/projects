import React, { useMemo } from "react";
import styled from "styled-components";
import { theme } from "../../../../assets/theme/theme";
import { lang } from "../../../../../public/locales/lang";
import { useRouter } from "next/router";
import { NextImage } from "../../../../ui/nextImage/nextImage";
import { BannerBackground, StyledBannerArticleBase } from "../../../../components/containers/containerBanner";

export const PeriodOfUse = () => {
  const { locale } = useRouter();
  const t = useMemo(() => lang[locale ?? "ru"], [locale]);

  return (
    <StyledBannerArticle>
      <BannerBackground
        srcL="/images/banners/bgGL_v1.0.0.png"
        srcM="/images/banners/bgGM_v1.0.0.png"
        srcS="/images/banners/bgGS_v1.0.0.png"
      />
      <UsePeriod>
        <Title>{t.pageVipLodge.rent.periodOfRent}</Title>
        <Description>{t.pageVipLodge.rent.description}</Description>
      </UsePeriod>
      <StyledImageContainer>
        <NextImage src={"/images/services/RedChair_v1.0.0.png"} />
      </StyledImageContainer>
    </StyledBannerArticle>
  );
};

const StyledBannerArticle = styled(StyledBannerArticleBase)`
  color: ${theme.colors.white};
  margin-top: 7.97vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-top: 10.43vw;
    background-position-x: 80%;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-top: 10.67vw;
  }
`;

const UsePeriod = styled.section`
  width: 45.31vw;
  padding: 2.08vw;
  display: flex;
  align-items: flex-start;
  grid-gap: 2.08vw;
  flex-direction: column;
  box-sizing: content-box;
  z-index: 1;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 5.22vw;
    width: inherit;
    box-sizing: border-box;
    grid-gap: 3.65vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 6.4vw;
    box-sizing: border-box;
    grid-gap: 4.27vw;
  }
`;

const Title = styled.h1`
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
    font-weight: 500;
  }
`;

const Description = styled.h2`
  font-family: "FCSM Text", sans-serif;
  margin: 0;
  font-size: 1.25vw;
  font-weight: 500;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
  }
`;

const StyledImageContainer = styled.div`
  position: absolute;
  width: 21.67vw;
  height: 21.46vw;
  bottom: 0;
  right: 4.9vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    display: none;
  }
`;
