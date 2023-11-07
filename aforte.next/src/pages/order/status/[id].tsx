import { ContainerArticle } from "common/components/Container";
import { getLayout } from "common/components/layout/Layout";
import styled from "astroturf/react";
import { GetServerSideProps } from "next";
import { Orders } from "../../../modules/orders/components/Orders";
import { getUserOrdersById } from "../../../api/userOrdersApi";
import { UserOrderT } from "../../../modules/profile/interfaces/userOrders";
import { CartT } from "../../../modules/cart/interfaces/cart";
import { getCart } from "../../../api/cartApi";
import { getProducts } from "../../../api/productsApi";
import { ProductT } from "../../../modules/products/interfaces/product";
import { getInitialData } from "../../../common/hooks/useInitialData";

type Props = {
  order: UserOrderT;
  cart: CartT;
  productOrder: ProductT[];
};

export default function OrderByIdPage({ order, cart, productOrder }: Props) {
  return (
    <ContainerArticleCustom>
      <ContainerCustom padding={"sm"}>
        <Orders.OrderStatus order={order} />
      </ContainerCustom>
      <ContainerCustom padding={"sm"}>
        <Orders.ProductOnOrder product={productOrder} />
      </ContainerCustom>
      <PositionAside>
        <Orders.TotalPrice cart={cart} isPaid={order.status !== "expected"} />
      </PositionAside>
    </ContainerArticleCustom>
  );
}

OrderByIdPage.getLayout = getLayout;

export const getServerSideProps: GetServerSideProps = async ({}) => {
  try {
    const { metaTags = {}, ...initialData } = await getInitialData({
      pathname: "/order/status/id",
    });
    //12312312321 - оформлен
    //23132123123 - ожидает оплату
    const [order, cart, productOrder] = await Promise.allSettled([
      getUserOrdersById("23132123123"),
      getCart("23132123123"),
      getProducts({ page: 3, limit: 3 }),
    ]);

    return {
      props: {
        order: order.status === "fulfilled" ? order.value : {},
        cart: cart.status === "fulfilled" ? cart.value : {},
        productOrder: productOrder.status === "fulfilled" ? productOrder.value.data.items : [],
        initialData: { metaTags, ...initialData },
      },
    };
  } catch {
    return {
      props: {},
    };
  }
};

const ContainerArticleCustom = styled(ContainerArticle)`
  @import "variables";

  display: grid;
  grid-template-columns: minmax(300px, 1fr) 375px;
  grid-column-gap: 20px;
  margin-bottom: 40px;
  align-items: start;

  & > section {
    grid-column: 1;
  }

  @include respond-to(large) {
    grid-template-columns: minmax(300px, 1fr);
    margin-bottom: 20px;
  }
`;

const PositionAside = styled.aside`
  @import "variables";

  padding-top: 20px;

  @media (min-width: 1199px) {
    grid-column: 2 !important;
    grid-row-start: 1;
    grid-row-end: 3;
    position: sticky;
    top: 100px;
  }
`;

const ContainerCustom = styled.section<{
  padding?: "sm" | "md";
  paddingMb?: "sm";
}>`
  @import "variables";

  &.padding-sm {
    padding-top: 20px;
  }

  &.padding-md {
    padding-top: 40px;
  }

  @include respond-to(small) {
    &.paddingMb-sm {
      padding-top: 8px;
    }
  }
`;
