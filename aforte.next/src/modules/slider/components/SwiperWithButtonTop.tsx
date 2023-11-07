import { TitleWithButtonTop } from "../../../common/components/TitleWithButtonTop";
import { CustomSwiper } from "./CustomSwiper";
import { SwiperSlideType } from "../interfaces/SwiperSlideType";
import { SwiperOptions } from "swiper";
import styled from "astroturf/react";

type Props<T> = SwiperOptions & {
  id: string;
  title: string;
  items: T[];
  children: (elem: T) => JSX.Element;
  mobileDisplayNoneTitle?: boolean;
  sliderSettings?: SwiperSlideType;
  link?: string;
};

export const SwiperWithButtonTop = <T,>({
  id,
  title,
  sliderSettings,
  items,
  children,
  mobileDisplayNoneTitle,
  link,
  ...attr
}: Props<T>) => {
  return (
    <div>
      <ContainerTitle mobileDisplayNoneTitle={mobileDisplayNoneTitle}>
        <TitleWithButtonTop title={title} link={link} />
      </ContainerTitle>
      <CustomSwiper<T>
        sliderSettings={{
          padding: true,
          breakpointsDesktop: { pagination: false },
          breakpointsMobile: { pagination: { clickable: true } },
          ...sliderSettings,
        }}
        id={id}
        items={items}
        pagination={true}
        {...attr}
      >
        {children}
      </CustomSwiper>
    </div>
  );
};
const ContainerTitle = styled.div<{ mobileDisplayNoneTitle?: boolean }>`
  @import "variables";

  @include respond-to(small) {
    &.mobileDisplayNoneTitle {
      display: none;
    }
  }
`;
