import styled from "astroturf/react";

export const SlideOfSale = styled.div<{ size?: "sm" }>`
  @import "variables";

  width: 476px;

  &.size-sm {
    width: 444px;
  }

  @include respond-to(small) {
    width: 348px !important;
  }
`;
