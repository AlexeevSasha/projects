import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { blankSitesLinks } from "../../../assets/constants/blankSitesLinks";
import { IconTelegram } from "../../../assets/icon/iconTelegram";
import { IconVK } from "../../../assets/icon/iconVK";
import { IconYouTube } from "../../../assets/icon/iconYouTube";
import { theme } from "../../../assets/theme/theme";
import { NextImage } from "../../../ui/nextImage/nextImage";
import { Tooltip } from "../../tooltip/tooltip";

export const SocialNetworks = () => {
  const { locale = "ru", pathname, push, query } = useRouter();
  const isAcademyPage = pathname.startsWith("/academy");

  const changeLocale = () => {
    push({ pathname, query: query.page ? { ...query, page: 1 } : query }, undefined, {
      locale: lang[locale].header.symbolLang === "EN" ? "en" : "ru",
    });
  };

  return (
    <Container>
      <Link prefetch={false} href={"/"} passHref>
        <LogoBlock aria-label="home page">
          <NextImage src={`/images/spartak/${locale}/darkTheme/spartakLogoWhiteText.svg`} alt={"Спартак"} priority />
        </LogoBlock>
      </Link>

      <SocialSelectBlock>
        <SocialBlock>
          <ItemWrapper>
            <BlankLink
              target="_blank"
              href={blankSitesLinks[isAcademyPage ? "academyYoutubeFirst" : "youtube"]}
              aria-label="youtube channel"
            >
              <IconYouTube />
              <InfoTooltip>
                <Tooltip position="bottom">
                  {isAcademyPage ? lang[locale].header.tooltips.youtubeAcademy : lang[locale].header.tooltips.youtube}
                </Tooltip>
              </InfoTooltip>
            </BlankLink>
          </ItemWrapper>

          {isAcademyPage && (
            <ItemWrapper>
              <BlankLink
                target="_blank"
                href={blankSitesLinks[isAcademyPage ? "academyYoutubeSecond" : "youtube"]}
                aria-label="youtube channel 2"
              >
                <IconYouTube />
                <InfoTooltip>
                  <Tooltip position="bottom">{lang[locale].header.tooltips.youtubeAcademyLive}</Tooltip>
                </InfoTooltip>
              </BlankLink>
            </ItemWrapper>
          )}

          <ItemWrapper>
            <BlankLink
              target="_blank"
              href={blankSitesLinks[isAcademyPage ? "academyTelegram" : "telegram"]}
              aria-label="telegram channel"
            >
              <IconTelegram />
              <InfoTooltip>
                <Tooltip position="bottom">
                  {isAcademyPage ? lang[locale].header.tooltips.telegramAcademy : lang[locale].header.tooltips.telegram}
                </Tooltip>
              </InfoTooltip>
            </BlankLink>
          </ItemWrapper>
          <ItemWrapper>
            <BlankLink
              target="_blank"
              href={blankSitesLinks[isAcademyPage ? "academyVK" : "VK"]}
              aria-label="vk channel"
            >
              <IconVK />
              <InfoTooltip>
                <Tooltip position="bottom">
                  {isAcademyPage ? lang[locale].header.tooltips.vkAcademy : lang[locale].header.tooltips.vk}
                </Tooltip>
              </InfoTooltip>
            </BlankLink>
          </ItemWrapper>
        </SocialBlock>

        <TextContainer onClick={changeLocale}>{lang[locale].header.symbolLang}</TextContainer>
      </SocialSelectBlock>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 4.27vw 0;
  }
`;

const LogoBlock = styled.a`
  width: 10.21vw;
  height: 2.86vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 25.55vw;
    height: 7.17vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    display: none;
  }
`;

const SocialBlock = styled.div`
  display: flex;
  gap: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    gap: 2.61vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    gap: 2.13vw;
  }
`;

const SocialSelectBlock = styled.div`
  display: grid;
  align-items: center;
  justify-content: space-between;
  grid-template-columns: auto auto;
  gap: 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    gap: 9vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-template-columns: 69.5vw 9vw;
    justify-content: space-between;
    max-width: unset;
    gap: 14vw;
  }
`;

const TextContainer = styled.div`
  font-family: "FCSM Text", sans-serif;
  color: ${theme.colors.white};
  font-size: 0.83vw;
  cursor: pointer;

  &:hover {
    color: ${theme.colors.red};
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.09vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
  }
`;

const InfoTooltip = styled.div`
  position: relative;
  display: none;
`;

const ItemWrapper = styled.div`
  a {
    &:hover {
      color: ${({ theme }) => theme.colors.red_white};
      ${InfoTooltip} {
        display: flex;
      }
    }
  }
`;

const BlankLink = styled.a`
  /* display: flex;
  align-items: center;
  position: relative;
  color: ${({ theme }) => theme.colors.grayDark_carnationPink}; */

  position: relative;
  display: flex;
  padding: 0.42vw;
  background-color: ${theme.colors.gray}10;
  border-radius: 50%;
  color: ${theme.colors.white};

  &:hover {
    color: ${theme.colors.red};
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 1.04vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 2.13vw;
  }
`;
