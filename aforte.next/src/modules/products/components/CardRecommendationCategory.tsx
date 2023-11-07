import { NextImage } from "../../../common/components/NextImage";
import styled from "astroturf/react";
import { RecommendationCategoryT } from "../../categories/interfaces/recommendationCategory";

export const CardRecommendationCategory = ({ img, alt }: RecommendationCategoryT) => {
  return (
    <Container>
      <NextImage src={img} alt={alt} />
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  width: 300px;
  height: 180px;

  @include respond-to(small) {
    width: 175px;
    height: 142px;
  }
`;
