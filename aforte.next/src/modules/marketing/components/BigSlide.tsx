import styled from "astroturf/react";
import { NextImage } from "common/components/NextImage";
import { MarketingBigSlide } from "../interfaces/marketingBigSlide";

type Props = MarketingBigSlide;

export const BigSlide = (props: Props) => {
  return (
    <Container>
      <NextImage style={{ objectFit: "cover", borderRadius: 40 }} src={props.img} alt={props.alt} />
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  max-width: 1920px;
  width: 100%;
  height: 400px;

  @include respond-to(small) {
    height: 200px;
  }
`;
