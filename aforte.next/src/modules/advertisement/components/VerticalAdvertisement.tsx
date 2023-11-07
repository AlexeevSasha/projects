import styled from "astroturf/react";
import { AdvertisementBannerT } from "../interfaces/advertisementBanner";
import { NextImage } from "common/components/NextImage";

export const VerticalAdvertisement = ({ desktopImage, mobileImage }: AdvertisementBannerT) => {
  return (
    <Container id={"vertical-advertisement"}>
      <ContainerImage>
        <NextImage src={desktopImage} alt={"advertisement"} />
      </ContainerImage>
      <ContainerImage isMobile={true}>
        <NextImage src={mobileImage} alt={"advertisement"} />
      </ContainerImage>
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  border-radius: 40px;

  width: 376px;
  height: 772px;

  @include respond-to(small) {
    width: 100%;
    height: 171px;
  }
`;

const ContainerImage = styled.div<{ isMobile?: boolean }>`
  @import "variables";

  width: 100%;
  height: 100%;

  &.isMobile {
    display: none;
  }

  @include respond-to(small) {
    display: none;
    &.isMobile {
      display: block;
    }
  }
`;
