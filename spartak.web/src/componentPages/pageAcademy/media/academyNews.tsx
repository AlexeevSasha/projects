import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { theme } from "../../../assets/theme/theme";
import { ContainerContent } from "../../../components/containers/containerContent";
import { NewsArticle } from "../../pageMediaNews/pageNewsItem/newsArticle/newsArticle";
import { NewsAside } from "../../pageMediaNews/pageNewsItem/newsAside/newsAside";
import { SocialNetworksOnBanner } from "../../pageMediaVideos/socialNetworksOnBanner/socialNetworksOnBanner";
import { AcademyMediaProps } from "../../../../pages/academy/media/[id]";
import TitleWithoutBanner from "../../../components/titleWithoutBanner/titleWithoutBanner";

export const AcademyNews = ({ anotherMedia, media }: AcademyMediaProps) => {
  const { locale } = useRouter();

  return (
    <>
      <TitleWithoutBanner title={getLocalValue(media?.MediaHeader, locale)} smallTitle />
      <SocialNetworksOnBanner date={media?.PublishDateTime} textShare={getLocalValue(media?.MediaHeader, locale)} />

      <StyledContainer>
        <NewsArticle
          title={getLocalValue(media?.MediaAnnounce, locale)}
          text={getLocalValue(media?.MediaText, locale)}
        />
        <NewsAside newsList={anotherMedia} defaultUrl={"/academy/media/"} />
      </StyledContainer>
    </>
  );
};

const StyledContainer = styled(ContainerContent)`
  display: grid;
  align-items: start;
  grid-template-columns: 2fr 1fr;
  gap: 1.25vw;
  padding-bottom: 3.75vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    display: flex;
    flex-direction: column;
    padding-bottom: 5.22vw;
    gap: 5.22vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding-bottom: 10.67vw;
  }
`;
