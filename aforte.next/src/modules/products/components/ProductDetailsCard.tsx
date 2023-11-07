import styled from "astroturf/react";
import { ProductImageDesktop } from "./ProductImageDesktop";
import { Favorites } from "./Favorites";
import { CustomLink } from "../../../common/components/CustomLink";
import { ProductPriceVariations } from "./ProductPriceVariations";
import { CustomSwiper } from "../../slider/components/CustomSwiper";
import { ProductAttributes } from "./ProductAttributes";
import { ProductImageMobile } from "./ProductImageMobile";
import { Share } from "../../../common/components/shareSocial/Share";
import { ProductT, Variations } from "../interfaces/product";
import { Reviews } from "../../reviews/components/Reviews";
import { TagCardsTooltip } from "./TagCardsTooltip";
import { useContext } from "react";
import { AppContext } from "../../../common/components/ContextProvider";

export const ProductDetailsCard = (props: ProductT) => {
  return (
    <ContainerCard>
      <ProductImageDesktop images={props.images} />
      <div>
        <Container>
          <TagCardsTooltip labels={props.labels} isTooltip />

          <ContainerIcons>
            <Share />
            <Favorites id={props.id} />
          </ContainerIcons>
        </Container>
        <ProductImageMobile images={props.images} />
        <Title>{props.name}</Title>
        <ReviewsContainer>
          <Reviews.StarRating disable total={5} active={3.5} />
          <Link href={"#reviews-product"}>22 отзыва</Link>
        </ReviewsContainer>
        <CustomSwiper<Variations>
          id={"product-price-slider"}
          items={props.variations}
          sliderSettings={{ desktopSB: 12, mobileSB: 8 }}
          arrowSettings={{ inside: true, size: "sm", styleBtn: "hidden" }}
        >
          {(param) => <ProductPriceVariations variations={param} />}
        </CustomSwiper>
        <ProductAttributes attributes={props.attributes} isDesktop />
      </div>
    </ContainerCard>
  );
};

const ContainerCard = styled.div`
  @import "variables";

  padding: 20px 0 20px 20px;
  background: $white;
  border-radius: 32px;
  display: grid;
  grid-template-columns: 400px minmax(220px, 1fr);
  width: 100%;
  grid-column-gap: 36px;
  overflow: hidden;

  @media (max-width: 1000px) {
    grid-template-columns: 250px minmax(220px, 1fr);
  }

  @include respond-to(small) {
    grid-template-columns: minmax(300px, 1fr);
  }
`;

const Container = styled.div`
  margin-right: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  @import "variables";

  color: $black;
  margin: 8px 0 0 0;
  padding-right: 20px;
  max-width: 500px;
  width: 100%;
  font-weight: 600;
  font-size: 24px;
  line-height: 137%;
`;

const ReviewsContainer = styled.div`
  margin: 12px 0 20px;
  display: flex;
  align-items: end;
`;

const Link = styled(CustomLink)`
  @import "variables";

  margin-left: 8px;
  color: $blue1;

  &:hover {
    color: $blue2;
  }
`;

const ContainerIcons = styled.div`
  display: grid;
  grid-template-columns: 24px 24px;
  grid-column-gap: 12px;
`;
