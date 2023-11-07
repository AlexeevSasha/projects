import { useState } from "react";
import { Orders } from "./Orders";
import styled from "astroturf/react";
import { IconArraySmall } from "../../../common/components/icons/IconArraySmall";
import { SelfDeliveryDetails } from "./SelfDeliveryDetails";
import { CourierDeliveryDetails } from "./courierDeliveryDetails/CourierDeliveryDetails";
import { TypeOfDeliveryT } from "../interfaces/order";
import { useFormContext } from "react-hook-form";
import { OrderFormT } from "../../forms/interfaces/orderForm";

type Props = {
  typeDelivery: TypeOfDeliveryT;
  setTypeDelivery: (cb: (value: TypeOfDeliveryT) => TypeOfDeliveryT) => void;
};

export const OrderDeliveryMethod = ({ typeDelivery, setTypeDelivery }: Props) => {
  const { setValue } = useFormContext<OrderFormT>();
  const [visibleDelivery, setVisibleDelivery] = useState(false);

  const handleClick = () => {
    setTypeDelivery((prev) => {
      const type = prev === "self" ? "courier" : "self";
      setValue("typeOfDelivery", type);
      return type;
    });
  };

  return (
    <Container>
      <Title>
        {typeDelivery === "self" ? "Забрать из аптеки 14 июня" : "Доставка курьером 14 июня"}
      </Title>
      <div style={{ marginBottom: 16 }}>
        <ChangeDelivery onClick={() => setVisibleDelivery((prev) => !prev)}>
          Изменить способ доставки
          <IconArraySmall rotate={visibleDelivery ? "180deg" : "0"} />
        </ChangeDelivery>
        {visibleDelivery && (
          <GridContainer>
            <Orders.OrderDelivery handlerClick={handleClick} active={typeDelivery === "self"} />
            <Orders.OrderDelivery
              handlerClick={handleClick}
              active={typeDelivery === "courier"}
              isCourier
            />
          </GridContainer>
        )}
      </div>
      {typeDelivery === "self" ? <SelfDeliveryDetails /> : <CourierDeliveryDetails />}
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 20px;
  background: $white;
  color: $black;
  border-radius: 32px;
  padding: 32px 40px;

  @include respond-to(small) {
    padding: 20px;
    grid-row-gap: 12px;
  }
`;

const Title = styled.h3`
  @import "variables";

  margin: 0;
  font-weight: 600;
  font-size: 22px;
  line-height: 137%;

  @include respond-to(small) {
    font-weight: 500;
    font-size: 13px;
  }
`;

const ChangeDelivery = styled.div`
  @import "variables";

  display: inline-flex;
  align-items: center;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  line-height: 137%;
  letter-spacing: 0.02em;
  color: $blue1;

  svg {
    @include transition();
    margin-left: 8px;
  }
`;

const GridContainer = styled.div`
  @import "variables";

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 20px;
  margin-top: 10px;

  @include respond-to(small) {
    grid-column-gap: 10px;
  }
`;
