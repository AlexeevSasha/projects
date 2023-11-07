import styled from "astroturf/react";
import { ProductCard } from "./ProductCard";
import { Pagination } from "../../../common/components/Pagination";
import { useRouter } from "next/router";
import { ProductT } from "../interfaces/product";
import { Button } from "../../../common/components/Button";

type Props = {
  products: ProductT[];
  hidePagination?: boolean;
};

export const ProductsGrid = ({ products, hidePagination }: Props) => {
  const router = useRouter();

  const onPagination = (val: number) => {
    router?.push({
      query: { ...router.query, page: String(val) },
    });
  };

  return (
    <div>
      <Content>
        {products?.map((el) => (
          <ProductCard key={el.id} {...el} />
        ))}
      </Content>
      {hidePagination ? null : (
        <PaginateContainer>
          <Pagination onChange={onPagination} total={6} />
          <CustomButton typeBtn={"blueWhite"}>Показать больше товаров</CustomButton>
        </PaginateContainer>
      )}
    </div>
  );
};

const Content = styled.div`
  @import "variables";

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  grid-column-gap: 16px;
  grid-row-gap: 16px;

  @include respond-to(small) {
    grid-template-columns: repeat(2, minmax(160px, 1fr));
    grid-column-gap: 8px;
    grid-row-gap: 8px;
  }
`;

const PaginateContainer = styled.div`
  @import "variables";

  margin-top: 16px;

  @include respond-to(small) {
    margin-top: 8px;

    & > div {
      display: none;
    }
  }
`;

const CustomButton = styled(Button)`
  @import "variables";

  display: none;
  width: 100%;
  padding: 17px;

  @include respond-to(small) {
    display: block;
  }
`;
