import { useRouter } from "next/router";
import React, { useContext } from "react";
import styled from "styled-components";
import { lang } from "../../../public/locales/lang";
import { IconArrowRight } from "../../assets/icon/iconArrowRight";
import { theme } from "../../assets/theme/theme";
import { CustomButton } from "../../components/buttons/customButton";
import {
  BannerBackground,
  ContentBlockBase,
  StyledBannerArticleBase,
} from "../../components/containers/containerBanner";
import { useWindowSize } from "../../core/hooks/UseWindowSize";
import { ThemeContext } from "../../core/themeProvider";
import { NextImage } from "../../ui/nextImage/nextImage";

export const AbonementBanner = () => {
  const { locale = "ru", push } = useRouter();
  const { width = 0 } = useWindowSize(true);
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <StyledBannerArticle isDarkTheme={isDarkTheme}>
      <BannerBackground
        srcL={isDarkTheme ? "/images/banners/bgSubscriptionL_v1.0.0.png" : ""}
        srcM={isDarkTheme ? "/images/banners/bgSubscriptionM_v1.0.0.png" : ""}
        srcS={isDarkTheme ? "/images/banners/bgSubscriptionS_v1.0.0.png" : ""}
      />
      <InvitationBlock>
        <Title>{lang[locale].tickets.abonementsBenefits}</Title>

        <Text>{lang[locale].tickets.learnAboutAbonements}</Text>

        <ButtonArrow type={"opacity"} withGap onClick={() => push("/more/subscriptions")}>
          <IconArrowRight />
          <span>{lang[locale].profile.denariiPage.cartInfo.more}</span>
        </ButtonArrow>
      </InvitationBlock>

      {width >= 1200 ? (
        <ContainerImage>
          <NextImage alt={"*держатель абонементов*"} src={"/images/tickets/abonements/abonementImage_v1.0.0.png"} />
        </ContainerImage>
      ) : null}
    </StyledBannerArticle>
  );
};

const StyledBannerArticle = styled(StyledBannerArticleBase)<{ isDarkTheme?: boolean }>`
  color: ${theme.colors.white};
  margin-top: 0;
  margin-bottom: 6.25vw;
  background: ${({ isDarkTheme }) => (isDarkTheme ? "none" : theme.colors.red)};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    background: ${({ isDarkTheme }) => (isDarkTheme ? "none" : theme.colors.red)};
    margin-bottom: 10.43vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    background: ${({ isDarkTheme }) => (isDarkTheme ? "none" : theme.colors.red)};
    margin-bottom: 10.67vw;
  }
`;

const InvitationBlock = styled(ContentBlockBase)`
  display: flex;
  padding: 2.08vw;
  flex-direction: column;
  width: 47.31vw;
  box-sizing: border-box;
  grid-row-gap: 0.83vw;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 100%;
    padding: 3.13vw;
    grid-row-gap: 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-row-gap: 6.4vw;
    padding: 6.4vw;
  }
`;

const Title = styled.h4`
  margin: 0;
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  font-size: 2.08vw;
  padding-right: 8vw;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 4.17vw;
    padding-right: 10vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 6.4vw;
    padding-right: 0;
    font-family: "FCSM Text", sans-serif;
    font-weight: 500;
  }
`;

const Text = styled.p`
  margin: 0;
  font-size: 0.94vw;
  font-weight: 500;
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
  width: fit-content;
  margin-top: 0.83vw;
  border-color: ${theme.colors.white};
  color: ${theme.colors.white};

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: unset;
  }

  & > svg > path {
    stroke: ${theme.colors.white};
  }
`;

const ContainerImage = styled.div`
  position: absolute;
  width: 15.78vw;
  height: 17.08vw;
  right: 16.41vw;
  bottom: 0;
`;
