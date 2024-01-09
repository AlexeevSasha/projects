import React from "react";
import SwiperCore, { Autoplay, FreeMode, Keyboard, Mousewheel, Navigation, Scrollbar } from "swiper";
import "swiper/css";
import "swiper/css/scrollbar";
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";

SwiperCore.use([Navigation, FreeMode, Mousewheel, Keyboard, Scrollbar, Autoplay]);

export interface SlideData {
  isActive: boolean;
  isVisible: boolean;
  isDuplicate: boolean;
  isPrev: boolean;
  isNext: boolean;
}

type Props<T> = SwiperProps & {
  itemsList: T[];
  render: (elem: T, slideData: SlideData) => JSX.Element;
};

export const ReactSwiper = <T extends unknown>({ render, itemsList, ...props }: Props<T>) => {
  return (
    <Swiper {...props}>
      {itemsList.map((elem, i) => (
        <SwiperSlide key={i}>{(slideData) => render(elem, slideData)}</SwiperSlide>
      ))}
    </Swiper>
  );
};
