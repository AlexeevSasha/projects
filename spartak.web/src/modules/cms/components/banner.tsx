import { IBanner } from "../../../api/dto/Banner";
import {
  BannerBackground,
  ContentBlockBase,
  StyledBannerArticleBase,
} from "../../../components/containers/containerBanner";
import { IconArrowRight } from "../../../assets/icon/iconArrowRight";
import { NextImage } from "../../../ui/nextImage/nextImage";
import React from "react";
import styled from "styled-components";
import { theme } from "../../../assets/theme/theme";
import { CustomButton } from "../../../components/buttons/customButton";
import { useRouter } from "next/router";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";

interface IProps {
  banner: IBanner;
}

export const Banner = ({ banner }: IProps) => {
  const { locale = "ru" } = useRouter();

  return (
    <Container>
      <BannerBackground
        srcL={getLocalValue(banner?.desktop, locale) || ""}
        srcM={getLocalValue(banner?.tablet, locale) || ""}
        srcS={getLocalValue(banner?.mobile, locale) || ""}
      />
      <LeftContainer>
        <Title>{getLocalValue(banner?.title, locale) || ""}</Title>

        <Text>{getLocalValue(banner?.description, locale) || ""}</Text>

        <Button type="opacity" onClick={() => window.open(getLocalValue(banner?.link, locale) || "")}>
          <IconArrowRight />

          <div>{getLocalValue(banner?.buttonTitle, locale) || ""}</div>
        </Button>
      </LeftContainer>

      <ImgContainer>
        <NextImage src={getLocalValue(banner?.photo, locale) || ""} />
      </ImgContainer>
    </Container>
  );
};

const Container = styled(StyledBannerArticleBase)`
  color: ${theme.colors.white};
  background: ${theme.colors.black};
  margin-bottom: 5.2vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 93.87vw;
    height: 44.59vw;
    margin-bottom: 10.43vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 91.46vw;
    height: 73vw;
  }
`;

const Title = styled.h4`
  font-size: 2.08vw;
  margin: 0 0 2.08vw;
  width: 37vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 5.21vw;
    margin: 0 0 5.218vw;
    width: auto;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 6.4vw;
    margin: 0 0 6.4vw;
  }
`;

const LeftContainer = styled(ContentBlockBase)`
  padding: 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 5.21vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 6.4vw;
  }
`;

const Text = styled.p`
  font-size: 1.25vw;
  margin: 0 0 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 3.13vw;
    margin: 0 0 5.218vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.26vw;
    margin: 0 0 6.4vw;
  }
`;

const Button = styled(CustomButton)`
  width: fit-content;
  box-sizing: border-box;
  border-color: ${theme.colors.white};
  color: ${theme.colors.white};

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 100%;
  }

  & > div {
    margin-left: 5px;
  }

  & > svg > path {
    stroke: ${theme.colors.white};
  }
`;

const ImgContainer = styled.div`
  position: absolute;
  bottom: 0.94vw;
  right: 6.98vw;
  width: 26.61vw;
  height: 18.93vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    display: none;
  }
`;
