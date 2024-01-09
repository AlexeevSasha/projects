import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import styled from "styled-components";
import seodata from "../../../public/seo/seoData.json";
import { IMedia, IMediaShort, listFieldMediaShort } from "../../../src/api/dto/IMedia";
import { mediaRepository } from "../../../src/api/mediaRepository";
import { getLocalValue } from "../../../src/assets/helpers/getLocalValue";
import { theme } from "../../../src/assets/theme/theme";
import { NewsArticle } from "../../../src/componentPages/pageMediaNews/pageNewsItem/newsArticle/newsArticle";
import { NewsAside } from "../../../src/componentPages/pageMediaNews/pageNewsItem/newsAside/newsAside";
import { SocialNetworksOnBanner } from "../../../src/componentPages/pageMediaVideos/socialNetworksOnBanner/socialNetworksOnBanner";
import { ContainerContent } from "../../../src/components/containers/containerContent";
import { GetLayout } from "../../../src/components/layout/getLayout";
import TitleWithoutBanner from "../../../src/components/titleWithoutBanner/titleWithoutBanner";
import { metaInterpolate } from "../../../src/helpers/metaInterpolate";

interface IProps {
  newsList: IMediaShort[] | null;
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
      />
      <StyledContainer>
        <NewsArticle
          title={getLocalValue(props.news?.MediaAnnounce, locale)}
          text={getLocalValue(props.news?.MediaText, locale)}
        />
        <NewsAside newsList={props.newsList} />
      </StyledContainer>
    </>
  );
}

SomeNews.getLayout = GetLayout;

export const getServerSideProps: GetServerSideProps = async ({ params, locale, query }) => {
  if (params?.newsId === "id") {
    return {
      redirect: {
        destination: `/media/news/${query.id}`,
        permanent: false,
      },
    };
  }

  const [currentNewsRes, newsRes] = await Promise.allSettled([
    // Получение текущей новости
    mediaRepository.fetchMedia({
      Id: `${params?.newsId}`,
      IsDraft: "false",
      Section: "Site",
    }),
    // Получение последних трех новостей
    mediaRepository.fetchMedia(
      {
        MediaType: "News",
        NotId: `${params?.newsId}`,
        IsDraft: "false",
        MediaStatus: "Published",
        MediaHeader: locale,
        sorting: "PublishDateTime desc",
        Section: "Site",
        pageSize: 3,
      },
      listFieldMediaShort
    ),
  ]);

  const news = currentNewsRes.status === "fulfilled" ? currentNewsRes.value.value[0] : null;

  switch (currentNewsRes.status === "fulfilled" && currentNewsRes.value.value[0]) {
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
          newsList: newsRes.status === "fulfilled" ? newsRes.value.value : null,
          metaTags: {
            ...metaInterpolate((seodata as Record<string, any>)["/media/news/[id]"], news?.MediaHeader),
            imageOg: { Ru: news?.PreviewPhoto, En: news?.PreviewPhoto },
          },
        },
      };
  }
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
