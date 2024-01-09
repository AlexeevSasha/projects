import { useState } from "react";
import styled from "styled-components";
import { IMediaShort } from "../../../../api/dto/IMedia";
import { theme } from "../../../../assets/theme/theme";
import { CardNews } from "../../../../components/cardNews/cardNews";
import { CardVideo } from "../../../../components/cardVideo/cardVideo";
import { ClickPlayVideo } from "../../../../components/clickPlayVideo/clickPlayVideo";
import { SwipeWithControl } from "../../../../components/reactSwiper/swipeWithControl";
import { SwiperWrapper } from "../../../../components/reactSwiper/swiperWrapper";

interface IProps {
  news: IMediaShort[];
  title?: string;
}

export const VotingNews = (props: IProps) => {
  const [showModal, setShowModal] = useState<IMediaShort | undefined>();

  return props.news.length > 0 ? (
    <>
      <SwiperContainer>
        <SwipeWithControl<IMediaShort>
          className="news-player-wiper"
          title={props.title ? props.title : "Новости игрока"}
          itemsList={props.news}
          swipeProps={{ freeMode: true, scrollbar: true }}
        >
          {(value: IMediaShort) =>
            value.MediaType === "Video" ? (
              <CardVideo videoInfo={value} defaultUrl="/media/votingVideos/" clickPlay={setShowModal} />
            ) : (
              <CardNews
                news={value}
                defaultUrl={value.MediaType === "News" ? "/media/votingNews/" : "/media/votingGallery/"}
              />
            )
          }
        </SwipeWithControl>
      </SwiperContainer>

      {showModal ? <ClickPlayVideo showModal={showModal} setShowModal={setShowModal} /> : null}
    </>
  ) : null;
};

const SwiperContainer = styled(SwiperWrapper)`
  margin-top: 5.21vw;

  & .swiper {
    margin-top: 3.13vw;
    padding-bottom: 3.08vw;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-top: 10.43vw;

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
        background: ${({ theme }) => theme.colors.blackLight_whiteGray};

        .swiper-scrollbar-drag {
          background: ${({ theme }) => theme.colors.grayDark_gray1};
        }
      }
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-top: 10.67vw;

    & .swiper {
      width: 91.47vw;
      margin-top: 4.27vw;
      padding-bottom: 3.2vw;

      .swiper-wrapper > .swiper-slide {
        width: 91.47vw;
        margin-right: 2.4vw;

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
