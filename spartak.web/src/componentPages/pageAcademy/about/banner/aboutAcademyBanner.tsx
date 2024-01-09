import React from "react";
import styled from "styled-components";
import { theme } from "../../../../assets/theme/theme";
import { useRouter } from "next/router";
import { IconArrowRight } from "../../../../assets/icon/iconArrowRight";
import { CustomButton } from "../../../../components/buttons/customButton";
import { lang } from "../../../../../public/locales/lang";
import Link from "next/link";
import { NextImage } from "../../../../ui/nextImage/nextImage";
import {
  BannerBackground,
  ContentBlockBase,
  StyledBannerArticleBase,
} from "../../../../components/containers/containerBanner";

export const AboutAcademyBanner = () => {
  const { locale = "ru" } = useRouter();

  return (
    <Content>
      <BannerBackground
        srcL="/images/banners/bgHandL_v1.0.0.png"
        srcM="/images/banners/bgHandM_v1.0.0.png"
        srcS="/images/banners/bgHandS_v1.0.0.png"
      />
      <InvitationBlock>
        <Title>{lang[locale].bannerInfo.academyTitle}</Title>
        <Text>{lang[locale].bannerInfo.academyCommontext}</Text>
        <Link prefetch={false} passHref href={"/academy/enter"}>
          <a style={{ textDecoration: "none", width: "fit-content" }}>
            <ButtonArrow type={"opacity"} withGap>
              <IconArrowRight />
              <span>{lang[locale].bannerInfo.buttonText}</span>
            </ButtonArrow>
          </a>
        </Link>
      </InvitationBlock>
      <ImageContainer>
        <NextImage src={"/images/academy/playerAcademyBanner_v1.0.0.png"} alt={lang[locale].bannerInfo.academyTitle} />
      </ImageContainer>
    </Content>
  );
};

const Content = styled(StyledBannerArticleBase)`
  //width: 100%;
  color: ${theme.colors.white};
  margin-top: 6.25vw;
  font-weight: 500;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-top: 5.22vw;

    margin-bottom: 2.09vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-top: 10.67vw;

    margin-bottom: 3.2vw;
  }
`;

const InvitationBlock = styled(ContentBlockBase)`
  display: flex;
  flex-direction: column;
  width: 82.5vw;
  box-sizing: border-box;
  grid-row-gap: 2.08vw;
  padding: 2.08vw;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 88vw;
    grid-row-gap: 2.09vw;
    padding: 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-row-gap: 3.2vw;
    padding: 6.4vw;
  }
`;

const Title = styled.h4`
  margin: 0;
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  font-size: 2.08vw;
  padding-right: 40vw;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 4.17vw;
    padding-right: 10vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.8vw;
    padding-right: 0;
    font-weight: 500;
  }
`;

const Text = styled.p`
  margin: 0;
  font-size: 1.25vw;
  font-weight: 500;
  padding-right: 30vw;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
    padding-right: 12vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding-right: 0;
    font-size: 4.27vw;
  }
`;

const ButtonArrow = styled(CustomButton)`
  padding: 0.58vw 1.12vw;
  font-size: 0.73vw;
  grid-gap: 0.42vw;
  width: fit-content;
  font-weight: 600;
  white-space: nowrap;

  svg {
    path {
      stroke: ${theme.colors.white};
    }
  }
  border: 1px solid ${theme.colors.white};
  color: ${theme.colors.white};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 1.44vw 2.8vw;
    font-size: 1.83vw;
    grid-gap: 1.04vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 1.4vw 2.9vw;
    font-size: 3.2vw;
    grid-gap: 2.13vw;
    font-weight: 500;
  }
`;

const ImageContainer = styled.div`
  position: absolute;
  width: 15.63vw;
  height: 21.35vw;
  right: 8.23vw;
  bottom: 0;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    display: none;
  }
`;
