import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { lang } from "../../../../../public/locales/lang";
import { IconArrowRight } from "../../../../assets/icon/iconArrowRight";
import { theme } from "../../../../assets/theme/theme";
import { CustomButton } from "../../../../components/buttons/customButton";
import { BannerBackground, StyledBannerArticleBase } from "../../../../components/containers/containerBanner";
import { NextLink } from "../../../../components/nextLink/nextLink";
import { NextImage } from "../../../../ui/nextImage/nextImage";

interface IProps {
  titleText: keyof typeof lang.ru.bannerInfo;
  commonText: keyof typeof lang.ru.bannerInfo;
  buttonText?: keyof typeof lang.ru.bannerInfo;
  ImgSrc?: string;
}

export const BannerInfo = ({ titleText, commonText, buttonText, ImgSrc }: IProps) => {
  const { locale = "ru" } = useRouter();

  return (
    <StyledBannerArticle>
      <BannerBackground
        srcL="/images/banners/gradientL_v1.0.0.png"
        srcM="/images/banners/gradientM_v1.0.0.png"
        srcS="/images/banners/gradientS_v1.0.0.png"
      />
      <InvitationBlock>
        <InvitationTitle>{lang[locale].bannerInfo[titleText]}</InvitationTitle>

        <ExcursionTour>{lang[locale].bannerInfo[commonText]}</ExcursionTour>

        <NextLink url={"https://museum.spartak.com/"}>
          <ButtonArrow type={"opacity"} withGap>
            <IconArrowRight />
            <span>{(buttonText && lang[locale].bannerInfo[buttonText]) ?? lang[locale].bannerInfo.buttonText}</span>
          </ButtonArrow>
        </NextLink>
      </InvitationBlock>
      <StyledImageContainer>
        <NextImage src={ImgSrc ?? "/images/Uniform_v1.0.0.png"} />
      </StyledImageContainer>
    </StyledBannerArticle>
  );
};

const StyledBannerArticle = styled(StyledBannerArticleBase)`
  color: ${theme.colors.white};
  margin-top: 4.43vw;
  position: relative;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-top: 10.43vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin: 10.67vw 0 0 0;
    width: inherit;
  }
`;

const InvitationBlock = styled.section`
  width: 56.56vw;
  padding: 2.08vw;
  display: flex;
  align-items: flex-start;
  grid-gap: 2.08vw;
  flex-direction: column;
  z-index: 1;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 5.22vw;
    width: inherit;
    grid-gap: 3.65vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 6.4vw 4.27vw;
    grid-gap: 3.2vw;
  }
`;

const InvitationTitle = styled.h1`
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  margin: 0;
  font-size: 2.08vw;
  white-space: break-spaces;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 4.17vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-family: "FCSM Text", sans-serif;
    font-size: 6.4vw;
    font-weight: 500;
    white-space: unset;
  }
`;

const ExcursionTour = styled.h2`
  font-family: "FCSM Text", sans-serif;
  margin: 0;
  font-size: 1.25vw;
  font-weight: 500;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
    letter-spacing: 0.1px;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
    color: ${theme.colors.white};
    margin-bottom: 3.2vw;
  }
`;

const ButtonArrow = styled(CustomButton)`
  padding: 0.78vw 1.25vw;
  font-size: 0.73vw;
  gap: 0.42vw;
  color: ${theme.colors.white};
  border-color: ${theme.colors.white};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 1.96vw 3.13vw;
    font-size: 1.83vw;
    gap: 1.04vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 1.6vw 3.2vw;
    font-size: 3.73vw;
    gap: 2.13vw;
  }

  & > svg > path {
    stroke: ${theme.colors.white};
  }
`;

const StyledImageContainer = styled.div`
  position: absolute;
  width: 23.33vw;
  height: 21.93vw;
  bottom: 0;
  right: 7.66vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    display: none;
  }
`;
