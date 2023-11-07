import styled from "astroturf/react";

export const SlideOfProfileStatus = styled.div`
  @import "variables";

  width: 300px;

  @include respond-to(small) {
    width: 180px;
  }
`;