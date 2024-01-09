import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { lang } from "../../../public/locales/lang";
import seodata from "../../../public/seo/seoData.json";
import { IMedia, IMediaShort, listFieldMediaShort } from "../../../src/api/dto/IMedia";
import { mediaRepository } from "../../../src/api/mediaRepository";
import { getLocalValue } from "../../../src/assets/helpers/getLocalValue";
import { theme } from "../../../src/assets/theme/theme";
import { SocialNetworksOnBanner } from "../../../src/componentPages/pageMediaVideos/socialNetworksOnBanner/socialNetworksOnBanner";
import { CardNews } from "../../../src/components/cardNews/cardNews";
import { ContainerContent } from "../../../src/components/containers/containerContent";
import { GetLayout } from "../../../src/components/layout/getLayout";
import { NoData } from "../../../src/components/noData/noData";
import { GallerySwiper } from "../../../src/components/reactSwiper/gallerySwiper";
import { SwipeWithControl } from "../../../src/components/reactSwiper/swipeWithControl";
import { SwiperWrapper } from "../../../src/components/reactSwiper/swiperWrapper";
import TitleWithoutBanner from "../../../src/components/titleWithoutBanner/titleWithoutBanner";
import { metaInterpolate } from "../../../src/helpers/metaInterpolate";
import { LoadingScreen } from "../../../src/ui/LoadingScreen ";
import { NextImage } from "../../../src/ui/nextImage/nextImage";

interface IProps {
  gallery?: IMedia;
  news: IMediaShort[];
}

export default function Photo(props: IProps) {
  const { locale = "ru" } = useRouter();
  const [visibleSlider, setVisibleSlider] = useState<number>();

  const onEscapeClose = ({ key }: KeyboardEvent) => {
    key === "Escape" && setVisibleSlider(undefined);
  };
  useEffect(() => {
    document.addEventListener("keydown", onEscapeClose);
    return () => document.removeEventListener("keydown", onEscapeClose);
  });
  useEffect(() => document.body.style.setProperty("overflow", visibleSlider ? "hidden" : "initial"), [visibleSlider]);
  useEffect(() => {
    return () => setVisibleSlider(undefined);
  }, []);

  const router = useRouter();

  return (
    <>
      {props.gallery ? (
        <>
          <TitleWithoutBanner title={getLocalValue(props.gallery.MediaHeader, locale)} smallTitle />

          <SocialNetworksOnBanner
            date={props.gallery.PublishDateTime}
            textShare={getLocalValue(props.gallery.MediaHeader, locale)}
          />
          <PhotoContainer>
            {props.gallery?.PhotoGallery?.map((elem, index) => (
              <NextImageContainer key={index} onClick={() => setVisibleSlider(index)}>
                <NextImage src={elem} objectFit="cover" />
              </NextImageContainer>
            ))}
          </PhotoContainer>

          {visibleSlider || visibleSlider === 0 ? (
            <GallerySwiper
              clickClose={() => setVisibleSlider(undefined)}
              photoList={props.gallery?.PhotoGallery || []}
              initialSlide={visibleSlider}
            />
          ) : null}

          {props.news.length > 0 ? (
            <SwiperContainer>
              <SwipeWithControl<IMediaShort>
                className="news-swiper"
                title={lang[locale].pageGallery.carouselNews.title}
                itemsList={props.news}
              >
                {(value: IMediaShort) => <CardNews news={value} defaultUrl="/media/news/" />}
              </SwipeWithControl>
            </SwiperContainer>
          ) : null}
        </>
      ) : router.isFallback ? (
        <LoadingScreen />
      ) : (
        <NoData />
      )}
    </>
  );
}

Photo.getLayout = GetLayout;

export const getServerSideProps: GetServerSideProps = async ({ params, locale, query }) => {
  if (params?.galleryId === "id") {
    return {
      redirect: {
        destination: `/media/gallery/${query.id}`,
        permanent: false,
      },
    };
  }

  const gallery = (await mediaRepository.fetchMedia({ Id: `${params?.galleryId}` })).value[0] || [];

  const news = (
    await mediaRepository.fetchMedia(
      {
        MediaType: "News",
        TeamsIds: gallery?.TeamId,
        MediaStatus: "Published",
        MediaHeader: locale,
        sorting: "PublishDateTime desc",
        Section: "Site",
        pageSize: 5,
      },
      listFieldMediaShort
    )
  ).value;

  const metaTags = metaInterpolate((seodata as Record<string, any>)["/media/gallery/[id]"], gallery.MediaHeader);

  return {
    props: { gallery, news, metaTags },
  };
};

const NextImageContainer = styled.div`
  cursor: pointer;
  height: 17.71vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: 30.12vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 29.93vw;
  }
`;

const PhotoContainer = styled(ContainerContent)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1.25vw;
  margin-bottom: 4.17vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 3.13vw;
    margin-bottom: 5.22vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-gap: 3.2vw;
    margin-bottom: 14.93vw;
  }
`;

const SwiperContainer = styled(SwiperWrapper)`
  margin-bottom: 4.16vw;

  & .swiper {
    padding: 3.33vw 0;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      padding: 3.13vw 0;
      .swiper-slide {
        width: 66.75vw;
      }

      a > div > div {
        height: 47.85vw;
      }
    }

    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      padding: 4.26vw 0;
      .swiper-slide {
        width: 91.47vw;
      }

      a > div > div {
        height: 64vw;
      }
    }
  }
`;
