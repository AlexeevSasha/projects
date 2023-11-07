import styled from "astroturf/react";

export const AdvertisementWithProduct = styled.div<{ positionAdv: "left" | "right" }>`
  @import "variables";

  display: grid;
  grid-column-gap: 20px;

  &.positionAdv-left {
    grid-template-columns: 376px 1fr;
  }
  &.positionAdv-right {
    grid-template-columns: 1fr 376px;
  }

  @include respond-to(small) {
    grid-template-columns: 1fr !important;
    grid-row-gap: 8px;

    div[id="vertical-advertisement"] {
      grid-row: 1;
    }
  }
`;
