import { OrderPayment } from "./OrderPayment";
import { useState } from "react";
import styled from "astroturf/react";
import { TypeOfPayment } from "../interfaces/order";
import { useFormContext } from "react-hook-form";
import { OrderFormT } from "../../forms/interfaces/orderForm";

export const OrderPaymentMethod = () => {
  const { setValue } = useFormContext<OrderFormT>();
  const [payment, setPayment] = useState<TypeOfPayment>("card-online");

  const handleClick = () => {
    setPayment((prev) => {
      const type = prev === "card-online" ? "self" : "card-online";
      setValue("typeOfPayment", type);
      return type;
    });
  };

  return (
    <Container>
      <Title>Способ оплаты</Title>
      <GridContainer>
        <OrderPayment handleClick={handleClick} active={payment === "card-online"} />
        <OrderPayment handleClick={handleClick} isSelfPayment active={payment === "self"} />
      </GridContainer>
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  background: $white;
  color: $black;
  border-radius: 32px;
  padding: 32px 40px;

  @include respond-to(small) {
    padding: 24px 20px;
  }
`;

const Title = styled.div`
  @import "variables";

  font-weight: 600;
  font-size: 22px;
  line-height: 137%;

  @include respond-to(small) {
    font-size: 18px;
  }
`;

const GridContainer = styled.div`
  @import "variables";

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 20px;
  margin-top: 20px;

  @include respond-to(small) {
    grid-template-columns: minmax(300px, 1fr);
    grid-row-gap: 16px;
    margin-top: 24px;
    & > div:last-child {
      padding: 0;
      border-bottom: none !important;
    }
  }
`;
