import styled from "astroturf/react";
import { CourierDelivery } from "./CourierDelivery";
import { DateAndTimeDelivery } from "./DateAndTimeDelivery";
import { Recipient } from "./Recipient";
import { DeliveryTimeT } from "../../interfaces/order";
import { useContext } from "react";
import { OrderContext } from "../../../../pages/order/[id]";

export const CourierDeliveryDetails = () => {
  const { deliveryTime } = useContext(OrderContext);

  return (
    <Container>
      <CourierDelivery />
      <DateAndTimeDelivery deliveryTime={deliveryTime} />
      <Recipient />
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 32px;

  input:not(input[type="checkbox"], input[name="check-tag"]) {
    max-width: 390px;
    width: 100%;
  }
`;
