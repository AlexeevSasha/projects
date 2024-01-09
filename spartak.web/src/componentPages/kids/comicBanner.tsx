import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { lang } from "../../../public/locales/lang";
import { ComicEntity } from "../../api/dto/kids";
import { getLocalValue } from "../../assets/helpers/getLocalValue";
import { IconArrowRight } from "../../assets/icon/iconArrowRight";
import { theme } from "../../assets/theme/theme";
import { CustomButton } from "../../components/buttons/customButton";
import {
  BannerBackground,
  ContentBlockBase,
  StyledBannerArticleBase,
} from "../../components/containers/containerBanner";
import { NextImage } from "../../ui/nextImage/nextImage";

export const ComicBanner = ({ Name, ComicPosterUrl, ComicFileUrl }: ComicEntity) => {
  const { locale = "ru" } = useRouter();

  return (
    <Container>
      <BannerBackground
        srcL="/images/banners/bannerRedBackgroundL_v1.0.0.png"
        srcM="/images/banners/bannerRedBackgroundM_v1.0.0.png"
        srcS="/images/banners/bannerRedBackgroundS_v1.0.0.png"
      />
      <ContentBlock>
        <Title>{getLocalValue(Name, locale)}</Title>

        <Text>{lang[locale].kids.bannerText}</Text>

        <a
          href={ComicFileUrl}
          download
          target="_blank"
          style={{ textDecoration: "none", width: "fit-content" }}
          rel="noreferrer"
        >
          <ButtonArrow type={"opacity"} withGap>
            <IconArrowRight />

            <span>{lang[locale].kids.read}</span>
          </ButtonArrow>
        </a>
      </ContentBlock>
      <ImageContainer>
        <div>
          <NextImage src={ComicPosterUrl} />
        </div>

        <div>
          <NextImage src="/images/kids/hot_v1.0.0.png" />
        </div>
      </ImageContainer>
    </Container>
  );
};

const Container = styled(StyledBannerArticleBase)`
  color: ${theme.colors.white};
  margin-top: 6.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-top: 10.43vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    overflow: hidden;
    margin-top: 10.67vw;
  }
`;
const ContentBlock = styled(ContentBlockBase)`
  width: 50%;

  position: relative;
  padding: 3.125vw 2.08vw;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 6.26vw 5.215vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    overflow: hidden;
    padding: 8.53vw 6.4vw;
    width: 60%;
  }
`;

const Title = styled.h4`
  margin: 0;
  font-weight: 700;
  font-size: 3.64vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 6.78vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 8.53vw;
  }
`;

const Text = styled.p`
  font-weight: 700;
  text-transform: uppercase;
  margin: 1.25vw 0 2.08vw;
  font-size: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin: 3.13vw 0 4.17vw;
    font-size: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin: 4.27vw 0 6.4vw;
    font-size: 4.27vw;
  }
`;

const ButtonArrow = styled(CustomButton)`
  padding: 0;
  width: 10.36vw;
  height: 3.54vw;
  font-size: 1.25vw;
  color: ${theme.colors.white};
  border-color: ${theme.colors.white};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 21.77vw;
    height: 8.21vw;
    font-size: 2.08vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 38.4vw;
    height: 12.8vw;
    font-size: 3.2vw;
  }

  & > svg > path {
    stroke: ${theme.colors.white};
  }
`;

const ImageContainer = styled.div`
  & > div:first-child {
    position: absolute;
    width: 14vw;
    height: 20.7vw;
    right: 14.84vw;
    bottom: 1.25vw;
    transform: rotate(-10.79deg);
  }

  & > div:last-child {
    position: absolute;
    width: 7.76vw;
    height: 6.14vw;
    right: 14vw;
    top: -1.25vw;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    & > div:first-child {
      width: 32vw;
      height: 50vw;
      right: 6.6vw;
      bottom: 4.43vw;
    }

    & > div:last-child {
      width: 16.68vw;
      height: 13.16vw;
      right: 1vw;
      top: 2.08vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    & > div:first-child {
      width: 45vw;
      height: 67.66vw;
      right: -13.84vw;
      bottom: 5.25vw;
    }

    & > div:last-child {
      width: 21.33vw;
      height: 16.8vw;
      right: 30.66vw;
      top: 4.26vw;
    }
  }
`;
