import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { theme } from "../../../assets/theme/theme";
import { ContainerContent } from "../../../components/containers/containerContent";
import { NoData } from "../../../components/noData/noData";
import { SocialNetworksOnBanner } from "../../pageMediaVideos/socialNetworksOnBanner/socialNetworksOnBanner";
import { VideoArticle } from "../../pageMediaVideos/videoArticle/videoArticle";
import { VideoAside } from "../../pageMediaVideos/videoAside/videoAside";
import { AcademyMediaProps } from "../../../../pages/academy/media/[id]";
import TitleWithoutBanner from "../../../components/titleWithoutBanner/titleWithoutBanner";

export const AcademyVideos = ({ anotherMedia, media }: AcademyMediaProps) => {
  const { locale } = useRouter();

  return media ? (
    <>
      <TitleWithoutBanner title={getLocalValue(media?.MediaHeader, locale)} smallTitle />
      <SocialNetworksOnBanner date={media.PublishDateTime} textShare={getLocalValue(media.MediaHeader, locale)} />

      <StyledContainer>
        <VideoArticle
          urlVideo={media.VideoUrl}
          text={getLocalValue(media.MediaText, locale)}
          announce={getLocalValue(media.MediaAnnounce, locale)}
        />
        <VideoAside videosList={anotherMedia || undefined} defaultUrl={"/academy/media/"} />
      </StyledContainer>
    </>
  ) : (
    <NoData />
  );
};

const StyledContainer = styled(ContainerContent)`
  display: grid;
  grid-template-columns: 2fr auto;
  align-items: start;
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
