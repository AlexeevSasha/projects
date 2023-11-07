import styled from "astroturf/react";
import { OrdersItemsT } from "../interfaces/userOrders";
import { OrdersListItem } from "./OrdersListItem";

type Props = {
  oredrItems: OrdersItemsT[];
};

export const OrdersInOrderInfo = ({ oredrItems }: Props) => {
  return (
    <CustomWrapper>
      <Title>Товары в заказе</Title>
      {oredrItems.map((item) => (
        <OrdersListItem oredrItem={item} key={item.id} />
      ))}
    </CustomWrapper>
  );
};
const CustomWrapper = styled.div`
  @import "variables";
  display: flex;
  flex-direction: column;
  width: 100%;
  background: $white;
  border-radius: 32px;
  margin: 20px 0px 40px 0px;
  padding: 32px 40px;
  @include respond-to(small) {
    margin: 8px 0px 0px 0px;
    padding: 24px 20px;
  }
`;
const Title = styled.span`
  @import "variables";
  font-weight: 600;
  font-size: 22px;
  margin-bottom: 30px;
  @include respond-to(small) {
    font-size: 18px;
    margin-bottom: 20px;
  }
`;
