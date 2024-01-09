import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import { AcademyMediaProps } from "../../../../pages/academy/media/[id]";
import { lang } from "../../../../public/locales/lang";
import { IMedia } from "../../../api/dto/IMedia";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { theme } from "../../../assets/theme/theme";
import { CardNews } from "../../../components/cardNews/cardNews";
import { ContainerContent } from "../../../components/containers/containerContent";
import { NoData } from "../../../components/noData/noData";
import { GallerySwiper } from "../../../components/reactSwiper/gallerySwiper";
import { SwiperWrapper } from "../../../components/reactSwiper/swiperWrapper";
import { SwipeWithControl } from "../../../components/reactSwiper/swipeWithControl";
import TitleWithoutBanner from "../../../components/titleWithoutBanner/titleWithoutBanner";
import { NextImage } from "../../../ui/nextImage/nextImage";
import { SocialNetworksOnBanner } from "../../pageMediaVideos/socialNetworksOnBanner/socialNetworksOnBanner";

export const AcademyGallery = ({ media, anotherMedia }: AcademyMediaProps) => {
  const { locale = "ru" } = useRouter();
  const [sliderIsVisible, setSliderIsVisible] = useState<number>();

  return media ? (
    <>
      <TitleWithoutBanner title={getLocalValue(media?.MediaHeader, locale)} smallTitle />
      <SocialNetworksOnBanner date={media.PublishDateTime} textShare={getLocalValue(media.MediaHeader, locale)} />

      <PhotoContainer>
        {media.PhotoGallery?.map((elem, index) => (
          <NextImageContainer key={index} onClick={() => setSliderIsVisible(index)}>
            <NextImage src={elem} objectFit="cover" />
          </NextImageContainer>
        ))}
      </PhotoContainer>

      {sliderIsVisible !== undefined && (
        <GallerySwiper
          clickClose={() => setSliderIsVisible(undefined)}
          photoList={media.PhotoGallery}
          initialSlide={sliderIsVisible}
        />
      )}

      {!!anotherMedia?.length && (
        <SwiperContainer>
          <SwipeWithControl<IMedia>
            className="academyGalleryOterNews"
            title={lang[locale].academy.otherNews}
            itemsList={anotherMedia}
          >
            {(value) => <CardNews news={value} defaultUrl="/academy/media/" />}
          </SwipeWithControl>
        </SwiperContainer>
      )}
    </>
  ) : (
    <NoData />
  );
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
    }

    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      padding: 4.26vw 0;
    }
  }
`;
