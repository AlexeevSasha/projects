import React from "react";
import styled from "styled-components";
import { theme } from "../../../assets/theme/theme";
import { useRouter } from "next/router";
import { lang } from "../../../../public/locales/lang";
import { NextLink } from "../../../components/nextLink/nextLink";
import { blankSitesLinks } from "../../../assets/constants/blankSitesLinks";
import {
  BannerBackground,
  ContentBlockBase,
  StyledBannerArticleBase,
} from "../../../components/containers/containerBanner";
import { NextImage } from "../../../ui/nextImage/nextImage";

interface IProps {
  academy?: boolean;
  title?: string;
  text?: string;
  img?: string;
}

export const BottomBanner = (props: IProps) => {
  const { locale = "ru" } = useRouter();
  return (
    <ImageWrapper size={props.academy}>
      <BannerBackground
        srcL={props.img ?? ""}
        srcM="/images/banners/bgMainM_v1.0.0.png"
        srcS="/images/banners/bgMainS_v1.0.0.png"
      />
      <Content>
        <div>
          <h5>{props.title}</h5>
          <p>{props.text}</p>
        </div>

        <AppBlock size={props.academy}>
          <IconTitle>{lang[locale].footer.ourApps}</IconTitle>

          <IconContainer>
            <NextLink url={props.academy ? blankSitesLinks.academyGooglePlay : blankSitesLinks.googlePlay}>
              <GooglePlay>
                <NextImage src="/images/main/appInStore/googlePlayBadge_v1.0.0.png" />
              </GooglePlay>
            </NextLink>

            <NextLink url={props.academy ? blankSitesLinks.academyAppleStore : blankSitesLinks.appleStore}>
              <AppStore>
                <NextImage src="/images/main/appInStore/appStoreBadge_v1.0.0.png" />
              </AppStore>
            </NextLink>
          </IconContainer>
        </AppBlock>
      </Content>
      <Anchor id="appBanner" />
    </ImageWrapper>
  );
};

const ImageWrapper = styled(StyledBannerArticleBase)<{ size?: boolean }>`
  width: 100vw;
  height: 23.75vw;
  margin-bottom: 6.25vw;
  line-height: 1.25em;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: ${(props) => (props.size ? "40.94vw" : "32.33vw")};
    width: 93.87vw;
    margin: 0 3.13vw 10.43vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: ${(props) => (props.size ? "94.4vw" : "80vw")};
    width: 100vw;
    margin: 0 0 10.43vw;
  }
`;

const Content = styled(ContentBlockBase)`
  position: absolute;
  top: 2.6vw;
  bottom: 4.22vw;
  right: 8.75vw;
  left: 8.75vw;
  max-width: calc(100% - 17.5vw);

  p {
    margin: 0;
  }
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    display: flex;
    justify-content: space-between;
    top: 5.22vw;
    bottom: 5.22vw;
    left: 5.22vw;
    right: 5.22vw;
    max-width: calc(100% - 11.44vw);
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    display: block;
    top: 6.4vw;
    bottom: 6.4vw;
    left: 4.27vw;
    right: 4.27vw;
    max-width: calc(100% - 8.54vw);
  }

  h5 {
    font-family: "FCSM Text", sans-serif;
    color: ${theme.colors.white};
    width: 28.125vw;
    font-weight: bold;
    font-size: 2.09vw;
    margin: 0 0 0.83vw;
    line-height: 1.25em;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      font-size: 4.17vw;
      width: 57vw;
      margin-bottom: 3.2vw;
    }

    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      width: 100%;
      font-size: 6.4vw;
      line-height: 9.07vw;
      margin-bottom: 3.2vw;
    }
  }

  p {
    color: ${theme.colors.gray};
    width: 33.6vw;
    font-size: 0.94vw;
    letter-spacing: 0.1px;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      font-size: 2.35vw;
      width: 57vw;
      line-height: initial;
    }

    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      font-size: 4.27vw;
      width: 100%;
    }
  }
`;

const AppBlock = styled.div<{ size?: boolean }>`
  padding-top: 2.5vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding-top: ${(props) => (props.size ? "6.61vw" : "2.61vw")};
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding-top: 6.4vw;
  }
`;

const IconTitle = styled.span`
  color: ${theme.colors.white};
  font-size: 0.94vw;
  letter-spacing: 0.1px;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
    display: block;
    text-align: center;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
    display: inline-block;
  }
`;

const IconContainer = styled.div`
  display: flex;
  margin-top: 0.42vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-top: 1.56vw;
    flex-flow: column;
    justify-content: center;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    flex-flow: row;
    justify-content: flex-start;
    margin-top: 2.13vw;
  }
`;

const GooglePlay = styled.div`
  width: 7.03vw;
  height: 2.08vw;
  margin-right: 0.625vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-right: 1.56vw;
    width: 17.6vw;
    height: 5.22vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-right: 3.2vw;
    width: 36vw;
    height: 10.67vw;
  }
`;

const AppStore = styled.div`
  width: 7.03vw;
  height: 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 17.6vw;
    height: 5.22vw;
    margin-top: 1.56vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 36vw;
    height: 10.67vw;
    margin-top: 0;
  }
`;

const Anchor = styled.div`
  width: 0;
  height: 0;
  position: absolute;
  top: -7.81vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    top: -15.56vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    top: -22.67vw;
  }
`;
