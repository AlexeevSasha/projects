import styled from "styled-components";
import { BannerEntity, BannersResponse } from "../api/dto/Banner";
import { theme } from "../assets/theme/theme";
import { BannerSwiper } from "./reactSwiper/bannerSwiper";
import { ContainerContent } from "./containers/containerContent";

type Props = {
  locationKey: keyof BannersResponse<BannerEntity>;
};

export const MediaBanner = ({ locationKey }: Props) => {
  return (
    <Container>
      <BannerSwiper locationKey={locationKey} />
    </Container>
  );
};

const Container = styled(ContainerContent)`
  position: relative;
  height: 6.98vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: 15.65vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 21.33vw;
  }

  & > .banner-slider {
    height: 100%;
    width: 100%;
  }
`;
