import styled from "astroturf/react";
import { HorizontAdvertisementT } from "../interfaces/advertisementBanner";
import { NextImage } from "common/components/NextImage";

export const HorizontAdvertisement = ({
  desktopImage,
  mobileImage,
  isSmall,
}: HorizontAdvertisementT) => {
  return (
    <Container isSmall={isSmall}>
      <ContainerImage>
        <NextImage src={desktopImage} alt={"advertisement"} />
      </ContainerImage>
      <ContainerImage isMobile={true}>
        <NextImage src={mobileImage} alt={"advertisement"} />
      </ContainerImage>
    </Container>
  );
};

const Container = styled.div<{ isSmall?: boolean }>`
  @import "variables";

  border-radius: 40px;
  width: 100%;
  height: 180px;

  &.isSmall {
    height: 100%;
  }

  @include respond-to(small) {
    &.isSmall {
      height: 180px;
    }
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
