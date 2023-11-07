import styled from "astroturf/react";

export const SlideOfVacancy = styled.div`
  @import "variables";

  width: 476px;

  @include respond-to(small) {
    width: 240px;
    height: 180px;
  }
`;
