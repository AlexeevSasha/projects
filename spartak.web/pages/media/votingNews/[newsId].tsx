import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import styled from "styled-components";
import seodata from "../../../public/seo/seoData.json";
import { IMedia } from "../../../src/api/dto/IMedia";
import { mediaRepository } from "../../../src/api/mediaRepository";
import { getLocalValue } from "../../../src/assets/helpers/getLocalValue";
import { theme } from "../../../src/assets/theme/theme";
import { NewsArticle } from "../../../src/componentPages/pageMediaNews/pageNewsItem/newsArticle/newsArticle";
import { SocialNetworksOnBanner } from "../../../src/componentPages/pageMediaVideos/socialNetworksOnBanner/socialNetworksOnBanner";
import { ContainerContent } from "../../../src/components/containers/containerContent";
import { GetLayout } from "../../../src/components/layout/getLayout";
import TitleWithoutBanner from "../../../src/components/titleWithoutBanner/titleWithoutBanner";
import { metaInterpolate } from "../../../src/helpers/metaInterpolate";

interface IProps {
  news: IMedia | null;
}

export default function SomeNews(props: IProps) {
  const { locale } = useRouter();

  return (
    <>
      <TitleWithoutBanner title={getLocalValue(props.news?.MediaHeader, locale)} smallTitle />
      <SocialNetworksOnBanner
        date={props.news?.PublishDateTime}
        textShare={getLocalValue(props.news?.MediaHeader, locale)}
        fullWidth
      />
      <StyledContainer>
        <NewsArticle
          title={getLocalValue(props.news?.MediaAnnounce, locale)}
          text={getLocalValue(props.news?.MediaText, locale)}
        />
      </StyledContainer>
    </>
  );
}

SomeNews.getLayout = GetLayout;

export const getServerSideProps: GetServerSideProps = async ({ params, query }) => {
  if (params?.newsId === "id") {
    return {
      redirect: {
        destination: `/media/news/${query.id}`,
        permanent: false,
      },
    };
  }

  const currentNewsRes = await mediaRepository.fetchMvpMedia({
    Id: `${params?.newsId}`,
    Section: "Site",
  });

  const news = currentNewsRes.value[0] || null;

  switch (news) {
    case undefined: {
      return {
        notFound: true,
        redirect: {
          destination: "/",
          permanent: 410,
        },
      };
    }
    default:
      return {
        props: {
          news,
          metaTags: metaInterpolate((seodata as Record<string, any>)["/media/news/[id]"], news?.MediaHeader),
        },
      };
  }
};

const StyledContainer = styled(ContainerContent)`
  display: flex;
  align-items: start;
  padding-bottom: 3.75vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    display: flex;
    padding-bottom: 5.22vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding-bottom: 10.67vw;
  }
`;
