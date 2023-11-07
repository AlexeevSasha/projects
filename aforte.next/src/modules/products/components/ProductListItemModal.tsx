import styled from "astroturf/react";
import { Button } from "common/components/Button";
import { NextImage } from "common/components/NextImage";
import { ProductPrice } from "./ProductPrice";
import { TagCards } from "./TagCards";
import { IconPlus } from "../../../common/components/icons/IconPlus";
import { Variations } from "../interfaces/product";
import { IconCheck } from "../../../common/components/icons/IconCheck";
import { useContext, useState } from "react";
import { AppContext } from "../../../common/components/ContextProvider";

type Props = {
  variation: Variations;
};

export const ProductListItemModal = ({ variation }: Props) => {
  const [click, setClick] = useState(false);
  const { addProductToBasket, allProductInBasket } = useContext(AppContext);

  const handlerClick = () => {
    setClick(true);
    addProductToBasket(variation.id, 1);
  };

  return (
    <Container>
      <ContainerImage>
        {variation.images[0] ? <NextImage src={variation.images[0]} alt={"product"} /> : null}
      </ContainerImage>
      <Content>
        {variation.labels.length ? <TagCards labels={variation.labels} /> : null}
        <Name>{variation.name}</Name>
        <ProductPrice
          size={"sm"}
          discount={variation.discount}
          regularPrice={variation.regularPrice}
          salePrice={variation.salePrice}
        />
        {!click && !allProductInBasket.has(variation.id) ? (
          <CustomButton onClick={handlerClick} typeBtn={"blue"}>
            <IconPlus />
          </CustomButton>
        ) : (
          <CustomButton isCheck typeBtn={"green"}>
            <IconCheck />
          </CustomButton>
        )}
      </Content>
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  display: grid;
  grid-template-columns: 52px 1fr;
  grid-column-gap: 12px;
  background: $white;
  color: $black;
  padding: 20px 0;
  border-bottom: 1px solid $blue-2;
`;

const ContainerImage = styled.div`
  @import "variables";

  width: 52px;
  height: 52px;
  background: $grey;
  padding: 13px 7px;
  border-radius: 12px;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 40px;
  grid-column-gap: 24px;
  grid-row-gap: 8px;

  & > div {
    grid-column: 1;
  }
`;

const Name = styled.div`
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

const CustomButton = styled(Button)<{ isCheck?: boolean }>`
  @import "variables";

  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  grid-column: 2;
  grid-row-start: 1;
  grid-row-end: 3;

  path {
    fill: $white;
  }

  &.isCheck {
    path {
      fill: none;
      stroke: $white;
    }
  }
`;
