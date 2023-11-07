import { SwiperWithButtonTop } from "./SwiperWithButtonTop";
import { Product } from "../../products/components/Product";
import { RecommendationCategoryT } from "../../categories/interfaces/recommendationCategory";
import styled from "astroturf/react";
import { TitleWithButtonTop } from "../../../common/components/TitleWithButtonTop";

type Props = {
  recommendationCategory: RecommendationCategoryT[];
};

export const SwiperRecommendationCategory = ({ recommendationCategory }: Props) => {
  return (
    <Container>
      <SwiperWithButtonTop<RecommendationCategoryT>
        id={"product-buy-with-slider"}
        items={recommendationCategory}
        title={"С этим товаром покупают"}
        sliderSettings={{ desktopSB: 16, mobileSB: 8 }}
      >
        {(param) => <Product.CardRecommendationCategory {...param} />}
      </SwiperWithButtonTop>
      <div>
        <TitleWithButtonTop title={"С этим товаром покупают"} />
        <ContainerGrid>
          {recommendationCategory.map((param, i) => (
            <Product.CardRecommendationCategory key={i} {...param} />
          ))}
        </ContainerGrid>
      </div>
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  & > div:last-child {
    display: none;
  }

  @include respond-to(small) {
    & > div:first-child {
      display: none;
    }
    & > div:last-child {
      display: block;
    }
  }
`;

const ContainerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 175px);
  grid-column-gap: 9px;
  grid-row-gap: 9px;
  margin-top: 12px;
`;
