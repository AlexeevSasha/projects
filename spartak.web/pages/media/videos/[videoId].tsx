import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import styled from "styled-components";
import seodata from "../../../public/seo/seoData.json";
import { IMedia, IMediaShort, listFieldMediaShort } from "../../../src/api/dto/IMedia";
import { mediaRepository } from "../../../src/api/mediaRepository";
import { getLocalValue } from "../../../src/assets/helpers/getLocalValue";
import { theme } from "../../../src/assets/theme/theme";
import { SocialNetworksOnBanner } from "../../../src/componentPages/pageMediaVideos/socialNetworksOnBanner/socialNetworksOnBanner";
import { VideoArticle } from "../../../src/componentPages/pageMediaVideos/videoArticle/videoArticle";
import { VideoAside } from "../../../src/componentPages/pageMediaVideos/videoAside/videoAside";
import { ContainerContent } from "../../../src/components/containers/containerContent";
import { GetLayout } from "../../../src/components/layout/getLayout";
import { NoData } from "../../../src/components/noData/noData";
import TitleWithoutBanner from "../../../src/components/titleWithoutBanner/titleWithoutBanner";
import { metaInterpolate } from "../../../src/helpers/metaInterpolate";
import { LoadingScreen } from "../../../src/ui/LoadingScreen ";

interface IProps {
  anotherVideoList?: IMediaShort[];
  videoInfo?: IMedia;
}

export default function SomeVideo(props: IProps) {
  const { locale } = useRouter();
  const router = useRouter();
  return (
    <>
      {props.videoInfo ? (
        <>
          <TitleWithoutBanner title={getLocalValue(props.videoInfo.MediaHeader, locale)} smallTitle />
          <SocialNetworksOnBanner
            date={props.videoInfo.PublishDateTime}
            textShare={getLocalValue(props.videoInfo.MediaHeader, locale)}
          />
          <StyledContainer>
            <VideoArticle
              urlVideo={props.videoInfo.VideoUrl}
              announce={getLocalValue(props.videoInfo.MediaAnnounce, locale)}
              text={getLocalValue(props.videoInfo.MediaText, locale)}
            />
            <VideoAside videosList={props.anotherVideoList} />
          </StyledContainer>
        </>
      ) : router.isFallback ? (
        <LoadingScreen />
      ) : (
        <NoData />
      )}
    </>
  );
}

SomeVideo.getLayout = GetLayout;

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context.params?.videoId === "id") {
    return {
      redirect: {
        destination: `/media/videos/${context.query.id}`,
        permanent: false,
      },
    };
  }

  const videoInfo = (await mediaRepository.fetchMedia({ Id: `${context.params?.videoId}` }))?.value?.[0] || null;

  const anotherVideoList = (
    await mediaRepository.fetchMedia(
      {
        MediaType: "Video",
        IsDraft: "false",
        PublishDateTime: true,
        NotId: `${context.params?.videoId}`,
        TeamsIds: videoInfo?.TeamId,
        MediaCategoryId: videoInfo?.MediaCategoryId,
        MediaHeader: context.locale,
        sorting: "PublishDateTime desc",
        Section: "Site",
        pageSize: 3,
      },
      listFieldMediaShort
    )
  ).value;

  const metaTags = metaInterpolate((seodata as Record<string, any>)["/media/videos/[id]"], videoInfo.MediaHeader);

  return {
    props: { videoInfo, anotherVideoList, metaTags },
  };
};

const StyledContainer = styled(ContainerContent)`
  display: grid;
  grid-template-columns: 2fr 1fr;
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
