import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import { lang } from "../../../../../public/locales/lang";
import { IMediaShort } from "../../../../api/dto/IMedia";
import { theme } from "../../../../assets/theme/theme";
import { CardVideo } from "../../../../components/cardVideo/cardVideo";
import { ClickPlayVideo } from "../../../../components/clickPlayVideo/clickPlayVideo";
import { SeeAll } from "../../../../components/reactSwiper/seeAll";
import { SwiperWrapper } from "../../../../components/reactSwiper/swiperWrapper";
import { SwipeWithControl } from "../../../../components/reactSwiper/swipeWithControl";

interface IProps {
  videoList?: IMediaShort[];
}

export const VideoAcademy = (props: IProps) => {
  const { locale = "ru" } = useRouter();
  const [showModal, setShowModal] = useState<IMediaShort | undefined>();
  const videoHref = `/academy/media?mediaType=Video&page=1&month=${new Date().getMonth()}&year=${new Date().getFullYear()}`;

  return props.videoList?.length ? (
    <>
      <StyledContainer>
        <SwipeWithControl<IMediaShort>
          className="academyVideosSwiper"
          title={lang[locale].academy.title.Video}
          itemsList={props.videoList}
          renderSeeAll={
            <Link prefetch={false} passHref href={videoHref}>
              <SeeAll>{lang[locale].mainPage.allVideo}</SeeAll>
            </Link>
          }
        >
          {(value: IMediaShort) => (
            <CardVideoWrapper>
              <CardVideo videoInfo={value} clickPlay={setShowModal} defaultUrl={"/academy/media/"} />
            </CardVideoWrapper>
          )}
        </SwipeWithControl>
      </StyledContainer>

      {showModal ? <ClickPlayVideo showModal={showModal} setShowModal={setShowModal} /> : null}
    </>
  ) : null;
};

const StyledContainer = styled(SwiperWrapper)`
  margin-top: 6.25vw;

  & .swiper {
    margin-top: 3.13vw;
    padding-bottom: 3.125vw;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-top: 10.43vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-top: 11.73vw;

    .academyVideosSwiper .swiper-slide {
      width: 91.47vw;
    }
  }
`;

const CardVideoWrapper = styled.div`
  a {
    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      height: 47.85vw;
    }

    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      height: inherit;
    }
  }

  & span:first-of-type {
    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      height: 21.64vw;
      width: auto;
      span {
        height: initial;
      }
    }
    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      height: initial;
    }
  }
`;
