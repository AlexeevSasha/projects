import { Swiper, SwiperSlide } from "swiper/react";
import { SwiperOptions } from "swiper/types/swiper-options";
import { Navigation, Pagination } from "swiper";
import styled from "astroturf/react";
import { IconLeftArray, IconRightArray } from "../../../common/components/icons/IconArray";
import { SwiperArrowType } from "../interfaces/SwiperArrowType";
import { SwiperSlideType } from "../interfaces/SwiperSlideType";
import { SlideOfArticle } from "./SlideOfArticle";
import { SwiperWithButtonTop } from "./SwiperWithButtonTop";
import { SlideOfProduct } from "./SlideOfProduct";
import { SlideOfSale } from "./SlideOfSale";
import { SlideOfProfileStatus } from "./SlideOfProfileStatus";
import { SlideOfStoryReviews } from "./SlideOfStoryReviews";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { SwiperRecommendationCategory } from "./SwiperRecommendationCategory";
import { SlideOfCharity } from "./SlideOfCharity";
import { SlideOfVacancy } from "./SlideOfVacancy";

type Props<T> = SwiperOptions & {
  id: string;
  items: T[];
  children: (elem: T) => JSX.Element;
  arrowSettings?: SwiperArrowType;
  sliderSettings?: SwiperSlideType;
};

const CustomSwiper = <T,>({
  id,
  items,
  children,
  arrowSettings,
  sliderSettings,
  ...attr
}: Props<T>) => {
  return (
    <Container
      noMargin={arrowSettings?.inside || arrowSettings?.hidden}
      isPadding={sliderSettings?.padding}
    >
      <SwiperStyle
        paginateColor={sliderSettings?.paginateColor}
        slidesPerView={"auto"}
        navigation={{
          prevEl: `.prev-${id}`,
          nextEl: `.next-${id}`,
        }}
        modules={[Navigation, Pagination]}
        breakpoints={{
          769: {
            spaceBetween: sliderSettings?.desktopSB || 0,
            ...sliderSettings?.breakpointsDesktop,
          },
          0: { spaceBetween: sliderSettings?.mobileSB || 0, ...sliderSettings?.breakpointsMobile },
        }}
        {...attr}
      >
        {items?.map((el, i) => (
          <SwiperSlide style={{ width: "fit-content" }} key={i}>
            {children(el)}
          </SwiperSlide>
        ))}
      </SwiperStyle>
      {arrowSettings?.hidden ? null : (
        <>
          <Left
            aria-label={"prev"}
            size={arrowSettings?.size}
            color={arrowSettings?.color}
            isInside={arrowSettings?.inside}
            styleBtn={arrowSettings?.styleBtn}
            className={`prev-${id}`}
          >
            <IconLeftArray />
          </Left>
          <Right
            aria-label={"next"}
            size={arrowSettings?.size}
            color={arrowSettings?.color}
            isInside={arrowSettings?.inside}
            styleBtn={arrowSettings?.styleBtn}
            className={`next-${id}`}
          >
            <IconRightArray />
          </Right>
        </>
      )}
    </Container>
  );
};

CustomSwiper.SlideOfArticle = SlideOfArticle;
CustomSwiper.SlideOfProduct = SlideOfProduct;
CustomSwiper.SlideOfSale = SlideOfSale;
CustomSwiper.SlideOfProfileStatus = SlideOfProfileStatus;
CustomSwiper.SlideOfStoryReviews = SlideOfStoryReviews;
CustomSwiper.SlideOfCharity = SlideOfCharity;
CustomSwiper.SlideOfVacancy = SlideOfVacancy;
CustomSwiper.SliderWithButtonTop = SwiperWithButtonTop;
CustomSwiper.SliderRecommendationCategory = SwiperRecommendationCategory;

export { CustomSwiper };

const Container = styled.div<{ noMargin?: boolean; isPadding?: boolean }>`
  @import "variables";

  position: relative;
  margin: 0 10px;

  &.noMargin {
    margin: 0;
  }

  &.isPadding {
    & > div {
      padding: 20px 0;
    }
  }

  @include respond-to(small) {
    margin: 0;
  }
`;

const SwiperStyle = styled(Swiper)<{
  paginateColor?: SwiperSlideType["paginateColor"];
}>`
  @import "variables";

  height: auto;

  div[class~="swiper-pagination"] {
    bottom: -3px;
  }

  span[class~="swiper-pagination-bullet"] {
    background: $blue1;
  }

  &.paginateColor-white {
    div[class~="swiper-pagination"] {
      bottom: 20px;
    }
    span[class~="swiper-pagination-bullet"] {
      background: $white;
    }
  }

  @include respond-to(small) {
    span[class~="swiper-pagination-bullet"] {
      width: 6px;
      height: 6px;
    }
  }
`;

const Button = styled.button`
  @import "variables";

  transition: all 0.2s ease-in-out;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 54px;
  height: 54px;
  background: $white;
  border-radius: 26px;
  cursor: pointer;
  outline: none;
  border: none;
  filter: drop-shadow(0px 4px 16px rgba(19, 51, 103, 0.12));
  z-index: 1;

  &:not([disabled]):hover {
    width: 60px;
    height: 60px;

    svg path {
      fill: $blue1;
    }
  }

  @include respond-to(small) {
    display: none;
  }
`;

const Left = styled(Button)<SwiperArrowType>`
  @import "variables";

  left: -18px;
  right: auto;

  &.isInside {
    left: 24px;

    &.size-sm {
      left: 20px;
    }
  }

  &.size-sm {
    width: 44px;
    height: 44px;

    &:not([disabled]):hover {
      width: 48px;
      height: 48px;
    }
  }

  &:disabled {
    cursor: default;

    &.styleBtn-hidden {
      display: none;
    }
  }

  &.color-white {
    background: rgb($white, 0.2);

    svg path {
      fill: $white;
    }

    &:hover {
      svg path {
        fill: $white;
      }
    }
  }
`;

const Right = styled(Button)<SwiperArrowType>`
  @import "variables";

  right: -18px;
  left: auto;

  &.isInside {
    right: 24px;

    &.size-sm {
      right: 20px;
    }
  }

  &.size-sm {
    width: 44px;
    height: 44px;

    &:not([disabled]):hover {
      width: 48px;
      height: 48px;
    }
  }

  &:disabled {
    cursor: default;

    &.styleBtn-hidden {
      display: none;
    }
  }

  &.color-white {
    background: rgb($white, 0.2);

    svg path {
      fill: $white;
    }

    &:hover {
      svg path {
        fill: $white;
      }
    }
  }
`;
