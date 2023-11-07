import styled from "astroturf/react";
import { NextImage } from "../../../common/components/NextImage";
import { TagCards } from "./TagCards";
import { Favorites } from "./Favorites";
import { ProductPrice } from "./ProductPrice";
import { ProductT } from "../interfaces/product";
import Link from "next/link";
import { useButtonProductCard } from "../hooks/useButtonProductCard";

export const ProductCard = (props: ProductT) => {
  const { renderButton, disabled } = useButtonProductCard({
    quantity: props.quantity,
    variations: props.variations,
    analogs: props.analogs,
    name: props.name,
    id: props.id,
  });

  return (
    <Link href={`/product/${props.id}`}>
      <ContainerCard disabled={disabled}>
        <Favorites id={props.id} isAbsolute />
        <ImageContainer>
          {props.images[0] ? <NextImage src={props.images[0]} alt={"card product"} /> : null}
        </ImageContainer>
        <TagCards labels={props.labels} />
        <DisabledBlock disabled={disabled}>
          <ProductPrice
            discount={props.discount}
            regularPrice={props.regularPrice}
            salePrice={props.salePrice}
          />
        </DisabledBlock>
        <Text>{props.name}</Text>
        {renderButton}
      </ContainerCard>
    </Link>
  );
};

const ImageContainer = styled.div`
  @import "variables";

  position: relative;
  height: 150px;
  max-width: 190px;
  margin: 0 auto;
  z-index: 1;

  div {
    width: 90%;
    height: 90%;
  }

  @include respond-to(small) {
    height: 110px;
    width: 150px;
  }
`;

const Text = styled.div`
  @import "variables";

  display: -webkit-box;
  font-weight: 500;
  font-size: 14px;
  line-height: 137%;
  letter-spacing: 0.02em;
  height: 60px;
  overflow: hidden;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  margin-bottom: 16px;

  @include respond-to(small) {
    font-size: 13px;
    margin-bottom: 8px;
    height: 72px;
    -webkit-line-clamp: 4;
  }
`;

const ContainerCard = styled.div<{ disabled?: boolean }>`
  @import "variables";

  position: relative;
  color: $black;
  background: $white;
  overflow: hidden;
  border-radius: 28px;
  padding: 20px;
  height: 100%;

  & > div:first-child {
    opacity: 0;
  }

  &.disabled {
    ${ImageContainer}, ${Text} {
      opacity: 0.4;
    }
  }
  &:hover {
    box-shadow: $shadowHoverCard;
    & > div:first-child {
      opacity: 1;
    }
  }

  @include respond-to(small) {
    padding: 12px;
    &:hover {
      box-shadow: none;
    }
  }
`;

const DisabledBlock = styled.div<{ disabled?: boolean }>`
  &.disabled {
    opacity: 0.4;
  }
`;
