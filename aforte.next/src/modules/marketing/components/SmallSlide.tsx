import styled from "astroturf/react";
import { NextImage } from "common/components/NextImage";
import { MarketingSmallSlide } from "../interfaces/marketingSmallSlide";

type Props = MarketingSmallSlide;

export const SmallSlide = (props: Props) => {
  return (
    <Container>
      <NextImage style={{ objectFit: "cover" }} src={props.img} alt={props.alt} />
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  width: 448px;
  height: 180px;
  div {
    border-radius: 40px;
  }

  @include respond-to(small) {
    div {
      border-radius: 28px;
    }
    width: 280px;
    height: 105px;
  }
`;
