import styled from "astroturf/react";
import { Product } from "../../products/components/Product";
import { ProductT } from "../../products/interfaces/product";

type Props = {
  product: ProductT[];
};

export const ProductOnOrder = ({ product }: Props) => {
  return (
    <Container>
      <h4>Товары в заказе</h4>
      <ContentContainer>
        {product?.map((el) => (
          <Product.ListItemInCart product={el} key={el.id} order />
        ))}
      </ContentContainer>
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  color: $black;
  background: $white;
  padding: 32px 40px 8px;
  border-radius: 32px;

  h4 {
    font-weight: 600;
    font-size: 22px;
    line-height: 137%;
    margin: 0;
  }

  @include respond-to(small) {
    padding: 24px 20px 0;

    h4 {
      font-size: 18px;
    }
  }
`;

const ContentContainer = styled.div`
  & > div:last-child {
    border-bottom: none;
  }
`;
