import { Product } from "../../products/components/Product";
import styled from "astroturf/react";
import { ProductT } from "../../products/interfaces/product";
import { wordDeclension } from "../../../common/utils/wordDeclension";
import { useContext } from "react";
import { AppContext } from "../../../common/components/ContextProvider";

type Props = {
  disabled?: boolean;
  product: ProductT[];
};

export const AvailabilityProducts = ({ disabled, product }: Props) => {
  const { deleteProductFromBasket } = useContext(AppContext);
  return (
    <Container>
      <Title>
        <h3>
          {disabled ? "Недоступно" : "Доступно"} {product.length}{" "}
          {wordDeclension(product.length, ["товар", "товара", "товаров"])}
        </h3>
        <DeleteAll
          onClick={() =>
            deleteProductFromBasket(
              "",
              true,
              product.map((el) => el.id)
            )
          }
        >
          Удалить все
        </DeleteAll>
      </Title>
      <ContentContainer>
        {product.map((el) => (
          <Product.ListItemInCart key={el.id} product={el} disabled={disabled} />
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

  @include respond-to(small) {
    padding: 20px;
  }
`;

const Title = styled.div`
  @import "variables";

  display: flex;
  align-items: center;
  font-weight: 600;

  h3 {
    font-size: 22px;
    margin: 0;
  }

  @include respond-to(small) {
    flex-direction: column;
    align-items: start;
    h3 {
      font-size: 18px;
    }
  }
`;

const DeleteAll = styled.span`
  @import "variables";

  cursor: pointer;
  font-weight: 500;
  font-size: 16px;
  letter-spacing: 0.02em;
  color: $orange3;
  margin-left: 20px;

  @include respond-to(small) {
    font-size: 13px;
    margin-left: 0;
    margin-top: 4px;
  }
`;

const ContentContainer = styled.div`
  & > div:last-child {
    border-bottom: none;
  }
`;
