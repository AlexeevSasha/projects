import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { theme } from "../../../assets/theme/theme";
import {
  BannerBackground,
  ContentBlockBase,
  StyledBannerArticleBase,
} from "../../../components/containers/containerBanner";
import { NextImage } from "../../../ui/nextImage/nextImage";
import { SupportModal } from "./supportModal";

export const SupposrtAcademy = () => {
  const { locale = "en" } = useRouter();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div id="SupposrtAcademy">
      <Container>
        <BannerBackground
          srcL="/images/banners/bannerRedBackgroundL_v1.0.0.png"
          srcM="/images/banners/bannerRedBackgroundM_v1.0.0.png"
          srcS="/images/banners/bannerRedBackgroundS_v1.0.0.png"
        />
        <ContentBlock>
          <LogoBlock>
            <NextImage
              src={`/images/spartak/${locale}/darkTheme/spartakLogoAllTextWhite.svg`}
              alt={"Спартак"}
              priority
            />
          </LogoBlock>

          <TextWrapper>
            <InvitationTitle>{lang[locale].bannerInfo.supportAcademyTitle}</InvitationTitle>
            <ExcursionTour>{lang[locale].bannerInfo.supportAcademytext}</ExcursionTour>
          </TextWrapper>

          <SupportButton onClick={() => setModalIsOpen(true)}>
            {lang[locale].bannerInfo.supportAcademyButton}
          </SupportButton>

          {modalIsOpen && <SupportModal onClose={() => setModalIsOpen(false)} />}
        </ContentBlock>
      </Container>
    </div>
  );
};

const Container = styled(StyledBannerArticleBase)`
  color: ${theme.colors.white};
  margin-bottom: 6.25vw;
  margin-top: 3.96vw;
  & > svg {
    width: 18.44vw;
    height: 5.16vw;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin: 10.43vw 3.13vw;
    & > svg {
      display: none;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin: 10.67vw 4.27vw 7.2vw;
  }
`;

const ContentBlock = styled(ContentBlockBase)`
  padding: 1.04vw 4.17vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5.47vw;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 3.13vw;
    gap: 3.2vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 6.4vw;
    flex-direction: column;
    text-align: left;
    align-items: flex-start;
  }
`;

const LogoBlock = styled.div`
  width: 18.4375vw;
  height: 5.15625vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    display: none;
  }
`;

const TextWrapper = styled.div`
  width: 35.84vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 61.28vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 80vw;
  }
`;

const InvitationTitle = styled.h1`
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  margin: 0 0 0.42vw;
  font-size: 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 3.13vw;
    font-weight: 500;
    margin-bottom: 1.04vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 6.4vw;
    margin-bottom: 2.13vw;
  }
`;

const ExcursionTour = styled.h2`
  font-family: Roboto, sans-serif;
  margin: 0;
  font-size: 0.83vw;
  font-weight: 400;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.09vw;
    color: ${theme.colors.white};
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
  }
`;

const SupportButton = styled.div`
  border: 0.05vw solid ${theme.colors.white};
  text-transform: uppercase;
  justify-content: center;
  font-family: "FCSM Text", sans-serif;
  font-weight: 600;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 0.73vw;
  padding: 0.73vw 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.83vw;
    padding: 1.83vw 5.22vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 3.73vw 10.67vw;
    font-size: 3.73vw;
  }
`;
