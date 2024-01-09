import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import styled from "styled-components";
import seodata from "../../../public/seo/seoData.json";
import { IMedia } from "../../../src/api/dto/IMedia";
import { mediaRepository } from "../../../src/api/mediaRepository";
import { getLocalValue } from "../../../src/assets/helpers/getLocalValue";
import { theme } from "../../../src/assets/theme/theme";
import { SocialNetworksOnBanner } from "../../../src/componentPages/pageMediaVideos/socialNetworksOnBanner/socialNetworksOnBanner";
import { VideoArticle } from "../../../src/componentPages/pageMediaVideos/videoArticle/videoArticle";
import { ContainerContent } from "../../../src/components/containers/containerContent";
import { GetLayout } from "../../../src/components/layout/getLayout";
import { NoData } from "../../../src/components/noData/noData";
import TitleWithoutBanner from "../../../src/components/titleWithoutBanner/titleWithoutBanner";
import { metaInterpolate } from "../../../src/helpers/metaInterpolate";
import { LoadingScreen } from "../../../src/ui/LoadingScreen ";

interface IProps {
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
            fullWidth
          />
          <StyledContainer>
            <VideoArticle
              urlVideo={props.videoInfo.VideoUrl}
              announce={getLocalValue(props.videoInfo.MediaAnnounce, locale)}
              text={getLocalValue(props.videoInfo.MediaText, locale)}
            />
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

  const videoInfo = (await mediaRepository.fetchMvpMedia({ Id: `${context.params?.videoId}` }))?.value?.[0] || null;

  const metaTags = metaInterpolate((seodata as Record<string, any>)["/media/videos/[id]"], videoInfo.MediaHeader);

  return {
    props: { videoInfo, metaTags },
  };
};

const StyledContainer = styled(ContainerContent)`
  display: flex;
  align-items: start;
  padding-bottom: 3.75vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding-bottom: 5.22vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding-bottom: 10.67vw;
  }
`;
