import styled from "astroturf/react";

type Props = {
  regularPrice: number;
  salePrice?: number | null;
  discount?: string | null;
  size?: "sm" | "md" | "lg";
};

export const ProductPrice = ({ regularPrice, salePrice, discount, size = "md" }: Props) => {
  return (
    <Price size={size}>
      <CurrentPrice size={size}>{salePrice || regularPrice} руб</CurrentPrice>
      {salePrice ? (
        <>
          <OldPrice size={size}>{regularPrice}</OldPrice>
          {discount ? <Discount size={size}>-{discount}</Discount> : null}
        </>
      ) : null}
    </Price>
  );
};

const Price = styled.div<{ size?: "sm" | "md" | "lg" }>`
  @import "variables";

  display: flex;
  align-items: center;

  &.size-md {
    margin: 12px 0;
  }
`;

const CurrentPrice = styled.span<{ size?: "sm" | "md" | "lg" }>`
  @import "variables";

  white-space: nowrap;
  font-weight: 600;
  line-height: 137%;
  font-size: 18px;
  color: $black;
  margin-right: 6px;

  &.size-md {
    font-size: 18px;
  }

  &.size-sm {
    font-size: 13px;
  }

  &.size-lg {
    font-size: 28px;
  }

  @include respond-to(small) {
    font-size: 15px !important;
  }
`;

const OldPrice = styled.span<{ size?: "sm" | "md" | "lg" }>`
  @import "variables";

  white-space: nowrap;
  position: relative;
  font-weight: 500;
  font-size: 16px;
  line-height: 137%;
  letter-spacing: 0.02em;
  color: rgb($black, 0.3);

  text-decoration: line-through;
  text-decoration-color: $orange1;

  &.size-md {
    font-size: 16px;
  }

  &.size-sm {
    font-size: 13px;
  }

  @include respond-to(small) {
    font-size: 15px !important;
  }
`;

const Discount = styled.span<{ size?: "sm" | "md" | "lg" }>`
  @import "variables";

  white-space: nowrap;
  background: $orange1;
  color: $white;
  border-radius: 10px;
  padding: 2px 6px;
  font-weight: 600;
  font-size: 12px;
  margin-left: 4px;
  line-height: 126%;
  text-align: center;
  letter-spacing: 0.02em;
  width: fit-content;

  &.size-sm {
    font-size: 10px;
    padding: 2px 6px 1px;
  }

  @include respond-to(small) {
    padding: 2px 4px;
  }
`;
