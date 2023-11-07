import styled from "astroturf/react";

export const SlideOfProduct = styled.div`
  @import "variables";

  width: 230px;

  @include respond-to(small) {
    width: 170px;
  }
`;
