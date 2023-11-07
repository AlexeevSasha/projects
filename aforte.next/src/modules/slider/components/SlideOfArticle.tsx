import styled from "astroturf/react";

export const SlideOfArticle = styled.div`
  @import "variables";

  width: 329px;

  @include respond-to(small) {
    width: 240px;
  }
`;
