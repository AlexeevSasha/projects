import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { lang } from "../../../../../public/locales/lang";
import { IMediaShort } from "../../../../api/dto/IMedia";
import { theme } from "../../../../assets/theme/theme";
import { CardNews } from "../../../../components/cardNews/cardNews";
import { SeeAll } from "../../../../components/reactSwiper/seeAll";
import { SwiperWrapper } from "../../../../components/reactSwiper/swiperWrapper";
import { SwipeWithControl } from "../../../../components/reactSwiper/swipeWithControl";

interface IProps {
  galleryList?: IMediaShort[];
}

export const GalleryAcademySlider = (props: IProps) => {
  const { locale = "ru" } = useRouter();
  const galleryHref = `/academy/media?mediaType=Gallery&page=1&month=${new Date().getMonth()}&year=${new Date().getFullYear()}`;

  return props.galleryList?.length ? (
    <Container>
      <SwipeWithControl<IMediaShort>
        className="academyGallerySwiper"
        title={lang[locale].academy.gallery}
        itemsList={props.galleryList}
        swipeProps={{ scrollbar: true }}
        renderSeeAll={
          <Link prefetch={false} passHref href={galleryHref}>
            <SeeAll>{lang[locale].academy.allPhoto}</SeeAll>
          </Link>
        }
      >
        {(value: IMediaShort) => (
          <CardWrapper>
            <CardNews news={value} defaultUrl={"/academy/media/"} />
          </CardWrapper>
        )}
      </SwipeWithControl>
    </Container>
  ) : null;
};

const Container = styled(SwiperWrapper)`
  margin-top: 6.25vw;

  & .swiper {
    margin-top: 3.13vw;
    padding-bottom: 3.125vw;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-top: 10.43vw;

    .swiper {
      height: 69.49vw;
    }
    & .swiper > .swiper-scrollbar {
      display: none;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-top: 11.73vw;

    & .swiper {
      padding-bottom: 7.47vw;
      height: 96.53vw;
    }
    & .swiper > .swiper-scrollbar {
      display: block;
      left: 0;
      width: 91.47vw;
    }
    & .swiper .swiper-slide {
      width: 91.47vw;
    }
  }
`;
const CardWrapper = styled.div`
  a {
    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      height: 47.85vw;

      > span:last-of-type {
        min-height: 21.64vw;
      }
    }

    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      height: 64vw;

      > span:last-of-type {
        min-height: 32.53vw;
      }
    }
  }
`;
