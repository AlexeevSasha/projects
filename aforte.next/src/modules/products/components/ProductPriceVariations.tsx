import styled from "astroturf/react";
import { useState } from "react";
import { Variations } from "../interfaces/product";
import { Product } from "./Product";
import { ProductPrice } from "./ProductPrice";

type Props = {
  disable?: boolean;
  variations: Variations;
};

export const ProductPriceVariations = ({ variations, disable }: Props) => {
  const [click, setClick] = useState(false);
  const toggleClick = () => setClick((prev) => !prev);

  return (
    <Container isClick={click} onClick={toggleClick} isDisable={disable}>
      <Title>{variations.name}</Title>
      {variations.discount ? <Discount>-{variations.discount}</Discount> : null}
      <Price>
        {disable ? "Нет в наличии" : variations.salePrice || variations.regularPrice} руб
      </Price>
    </Container>
  );
};

const Container = styled.div<{ isDisable?: boolean; isClick: boolean }>`
  @import "variables";

  @include transition();

  padding: 20px;
  border: 2px solid $blue-2;
  border-radius: 20px;
  color: $black;
  width: 150px;
  height: 115px;
  cursor: pointer;

  &:hover {
    border-color: $blueMain;
  }

  &.isClick {
    border-color: $greenMain;
  }

  &.isDisable {
    pointer-events: none;
    cursor: default;
    background: $grey;
  }
`;

const Title = styled.h4`
  @import "variables";

  display: -webkit-box;
  margin: 0 0 16px 0;
  font-weight: 600;
  font-size: 13px;
  line-height: 137%;
  letter-spacing: 0.02em;
  height: 36px;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Price = styled.span`
  @import "variables";

  font-weight: 500;
  font-size: 13px;
  line-height: 137%;
  color: rgb($black, 0.4);
`;

const Discount = styled.span`
  @import "variables";

  background: $orange1;
  color: $white;
  border-radius: 10px;
  padding: 2px 6px;
  font-weight: 600;
  font-size: 12px;
  margin-right: 8px;
  line-height: 126%;
  text-align: center;
  letter-spacing: 0.02em;
`;
