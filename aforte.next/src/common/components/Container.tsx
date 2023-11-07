import styled from "astroturf/react";

export const Container = styled.section`
  @import "variables";

  width: 100%;
  max-width: 1440px;
  padding: 0 28px;
  margin: auto;

  @include respond-to(small) {
    padding: 0 8px;
  }
`;

export const ContainerArticle = styled.article`
  @import "variables";

  width: 100%;
  max-width: 1440px;
  padding: 0 28px;
  margin: auto;

  @include respond-to(small) {
    padding: 0 8px;
  }
`;
