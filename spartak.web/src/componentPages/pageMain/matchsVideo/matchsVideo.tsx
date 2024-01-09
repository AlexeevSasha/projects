import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { IMediaShort } from "../../../api/dto/IMedia";
import { theme } from "../../../assets/theme/theme";
import { CardVideo } from "../../../components/cardVideo/cardVideo";
import MainBannerWithTitle from "../../../components/mainBannerWithTitle/MainBannerWithTitle";
import { SeeAll } from "../../../components/reactSwiper/seeAll";
import { SwiperWrapper } from "../../../components/reactSwiper/swiperWrapper";
import { SwipeWithControl } from "../../../components/reactSwiper/swipeWithControl";
import { ClickPlayVideo } from "../../../components/clickPlayVideo/clickPlayVideo";

type Props = {
  videoList: IMediaShort[];
};

export const MatchesVideo = ({ videoList }: Props) => {
  const { locale = "ru" } = useRouter();
  const [showModal, setShowModal] = useState<IMediaShort | undefined>();

  return (
    <>
      <BannerWrapper>
        <MainBannerWithTitle title="" banner={"/images/main/mainPageVideoBanner_v1.0.0.png"} smallTitle />
      </BannerWrapper>

      <SwiperContainer>
        <SwipeWithControl<IMediaShort>
          className="main-videos-wiper"
          title={lang[locale].mainPage.matchsVideos}
          itemsList={videoList}
          swipeProps={{ freeMode: true, scrollbar: true }}
          renderSeeAll={
            <Link prefetch={false} href={"/media/videos"} passHref>
              <SeeAll>{lang[locale].mainPage.allVideo}</SeeAll>
            </Link>
          }
        >
          {(value: IMediaShort) => (
            <CardVideo videoInfo={value} clickPlay={setShowModal} defaultUrl={"/media/videos/"} />
          )}
        </SwipeWithControl>
      </SwiperContainer>

      {showModal ? <ClickPlayVideo showModal={showModal} setShowModal={setShowModal} /> : null}
    </>
  );
};

const SwiperContainer = styled(SwiperWrapper)`
  margin-top: -12.19vw;
  padding-bottom: 2.08vw;
  margin-bottom: 5.21vw;

  & .swiper {
    margin-top: 3.13vw;
    padding-bottom: 3.08vw;
  }

  & .swiper-title {
    color: ${theme.colors.white};
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-top: -17.6vw;
    margin-bottom: 10.43vw;

    & .swiper {
      margin-top: 3.13vw;
      padding-bottom: 3.39vw;
      .swiper-wrapper > .swiper-slide {
        width: 45.37vw;
        margin-right: 3.13vw;
      }
      .swiper-scrollbar {
        bottom: 0;
        width: 93.87vw;
        background: ${({ theme }) => theme.colors.none_whiteGray};

        .swiper-scrollbar-drag {
          background: ${({ theme }) => theme.colors.grayDark_gray1};
        }
      }
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-top: -13.33vw;
    margin-bottom: 10.67vw;

    & .swiper {
      width: 91.47vw;
      margin-top: 4.27vw;
      padding-bottom: 3.2vw;

      .swiper-wrapper > .swiper-slide {
        width: 91.47vw;
        margin-right: 4.27vw;

        :last-child {
          margin-right: 0;
        }
      }
      .swiper-scrollbar {
        width: inherit;
      }
    }
  }
`;

const BannerWrapper = styled.div`
  position: relative;
  width: 100%;
`;
