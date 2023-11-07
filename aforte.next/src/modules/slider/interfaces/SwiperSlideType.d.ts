import { SwiperOptions } from "swiper";

export type SwiperSlideType = {
  padding?: boolean;
  paginateColor?: "white";
  desktopSB?: number;
  mobileSB?: number;
  breakpointsDesktop?: SwiperOptions;
  breakpointsMobile?: SwiperOptions;
};
