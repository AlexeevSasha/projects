import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { IconArrowRight } from "../../assets/icon/iconArrowRight";
import { theme } from "../../assets/theme/theme";
import { CustomButton } from "../../components/buttons/customButton";
import {
  BannerBackground,
  ContentBlockBase,
  StyledBannerArticleBase,
} from "../../components/containers/containerBanner";
import { NextImage } from "../../ui/nextImage/nextImage";
import { ISpartakKids } from "../../api/dto/ISpartakKids";
import { getLocalValue } from "../../assets/helpers/getLocalValue";

type Props = ISpartakKids["redBlock"];

export const Banner = (props: Props) => {
  const { push, locale = "ru" } = useRouter();
  return (
    <StyledBannerArticle>
      <BannerBackground
        srcL={getLocalValue(props?.desktop, locale)}
        srcM={getLocalValue(props?.tablet, locale)}
        srcS={getLocalValue(props?.mobile, locale)}
      />
      <InvitationBlock>
        <Title>{getLocalValue(props?.title, locale)}</Title>

        <Text>{getLocalValue(props?.description, locale)}</Text>

        <Link prefetch={false} passHref href={getLocalValue(props?.link, locale)}>
          <a style={{ textDecoration: "none", width: "fit-content" }}>
            <ButtonArrow type={"opacity"} withGap onClick={() => push(getLocalValue(props?.link, locale))}>
              <IconArrowRight />

              <span>{getLocalValue(props?.buttonTitle, locale)}</span>
            </ButtonArrow>
          </a>
        </Link>
      </InvitationBlock>

      <ImageContainer>
        <NextImage src={"/images/kids/bannerImage_v1.0.0.png"} alt={getLocalValue(props?.title, locale)} />
      </ImageContainer>
    </StyledBannerArticle>
  );
};

const StyledBannerArticle = styled(StyledBannerArticleBase)`
  width: 100%;
  margin-top: 6.25vw;
  color: ${theme.colors.white};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-top: 5.22vw;
    padding: 5.215vw;
    margin-bottom: 2.09vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-top: 10.67vw;
    padding: 6.4vw;
    margin-bottom: 3.2vw;
  }
`;

const InvitationBlock = styled(ContentBlockBase)`
  display: flex;
  flex-direction: column;
  width: 82.5vw;
  box-sizing: border-box;
  padding: 2.08vw;

  & > p {
    margin: 2.08vw 0;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 88vw;

    & > p {
      margin: 3.13vw 0;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    & > p {
      margin: 6.4vw 0;
    }
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
    font-size: 8.53vw;
    padding-right: 0;
    font-weight: 700;
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
  color: ${theme.colors.white};
  border-color: ${theme.colors.white};

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

  & > svg > path {
    stroke: ${theme.colors.white};
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
