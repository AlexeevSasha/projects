import styled from "astroturf/react";
import { NextImage } from "../../../common/components/NextImage";
import { ProductPrice } from "./ProductPrice";
import { ProductButtonCard } from "./ProductButtonCard";
import { Product } from "./Product";
import { IconRemove } from "../../../common/components/icons/IconRemove";
import { TagCards } from "./TagCards";
import { Button } from "../../../common/components/Button";
import { ProductT } from "../interfaces/product";
import Link from "next/link";
import { useContext } from "react";
import { AppContext } from "../../../common/components/ContextProvider";

type Props = {
  disabled?: boolean;
  order?: boolean;
  product: ProductT;
};

export const ProductListItemInCart = ({ disabled, order, product }: Props) => {
  const { deleteProductFromBasket } = useContext(AppContext);

  return (
    <Container order={order}>
      <ContainerImage unavailable={disabled} order={order}>
        <NextImage src={product.images[0]} alt={"product"} />
      </ContainerImage>
      <Content>
        <Wrapper unavailable={disabled} isColumn>
          <div>
            {product.labels.length ? (
              <div style={{ marginBottom: 8 }}>
                <TagCards labels={product.labels} />
              </div>
            ) : null}
            <Name>{product.name}</Name>
          </div>
          <ContainerPrice order={order}>
            <ProductPrice
              discount={product.discount}
              regularPrice={product.regularPrice}
              salePrice={product.salePrice}
            />
            <Points>{order ? "2 шт" : "20 баллов"}</Points>
          </ContainerPrice>
        </Wrapper>
        {order ? null : (
          <Wrapper style={{ alignItems: "center" }}>
            <IconsContainer>
              <Product.Favorites id={product.id} />
              <div onClick={() => deleteProductFromBasket(product.id)}>
                <IconRemove />
              </div>
            </IconsContainer>
            <ButtonContainer>
              {disabled ? (
                <Link href={"/product/metacatalogue/analogs"}>
                  <CustomButton typeBtn={"lightBlue"}>Аналоги</CustomButton>
                </Link>
              ) : (
                <ProductButtonCard idProduct={product.id} />
              )}
            </ButtonContainer>
          </Wrapper>
        )}
      </Content>
    </Container>
  );
};

const Container = styled.div<{ order?: boolean }>`
  @import "variables";

  display: grid;
  grid-template-columns: 100px 1fr;
  grid-gap: 28px;
  background: $white;
  color: $black;
  padding: 24px 0;
  border-bottom: 1px solid $blue-2;

  &.order {
    align-items: center;
    grid-template-columns: 80px 1fr;
  }

  @include respond-to(small) {
    grid-template-columns: 80px 1fr;
  }
`;

const ContainerImage = styled.div<{ unavailable?: boolean; order?: boolean }>`
  @import "variables";

  width: 100px;
  height: 100px;
  background: $grey;
  padding: 10px 6px;
  border-radius: 16px;

  @include respond-to(small) {
    width: 80px;
    height: 80px;
  }

  &.unavailable {
    opacity: 0.4;
  }

  &.order {
    width: 80px;
    height: 80px;
  }
`;

const Content = styled.div`
  display: grid;
  grid-gap: 16px;
`;

const Wrapper = styled.div<{
  isColumn?: boolean;
  unavailable?: boolean;
}>`
  @import "variables";

  display: flex;
  justify-content: space-between;
  align-items: start;

  &.isColumn {
    @include respond-to(small) {
      flex-direction: column;
    }
  }

  &.unavailable {
    opacity: 0.4;
  }
`;

const Name = styled.h6`
  @import "variables";

  font-weight: 500;
  font-size: 16px;
  line-height: 140%;
  letter-spacing: 0.02em;
  margin: 0 24px 0 0;

  @include respond-to(small) {
    margin: 0 0 8px 0;
    font-size: 14px;
  }
`;

const Points = styled.span`
  @import "variables";

  font-size: 14px;
  line-height: 137%;
  letter-spacing: 0.02em;
  color: rgb($black, 0.4);
`;

const ButtonContainer = styled.div`
  max-width: 160px;
  width: 100%;
  text-align: right;
`;

const IconsContainer = styled.div`
  @import "variables";

  display: grid;
  grid-template-columns: 24px 24px;
  grid-column-gap: 20px;
  margin-right: 20px;

  & > div {
    height: 24px;
  }

  @include respond-to(small) {
    grid-column-gap: 12px;
  }
`;

const CustomButton = styled(Button)`
  padding: 10px 18px;
`;

const ContainerPrice = styled.div<{ order?: boolean }>`
  @import "variables";

  & > div:first-child {
    margin: 0;
  }

  @include respond-to(small) {
    &.order {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }
  }
`;
