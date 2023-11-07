import styled from "astroturf/react";
import { Product } from "modules/products/components/Product";
import { ProductT } from "modules/products/interfaces/product";

type Props = {
  products: ProductT[];
  title: string;
};

export const HelpfulProductInCart = (props: Props) => {
  return (
    <>
      <CustomButton>{props.title}</CustomButton>
      <Product.ProductsGrid products={props.products} hidePagination={true} />
    </>
  );
};

const CustomButton = styled.div`
  @import "variables";

  display: flex;
  margin: 0 auto 20px;
  background: $white;
  color: $black;
  padding: 16px 24px;
  border-radius: 28px;
  font-weight: 500;
  font-size: 18px;
  width: fit-content;

  @include respond-to(small) {
    margin: 0 0 12px;
    font-weight: 600;
    font-size: 16px;
  }
`;
