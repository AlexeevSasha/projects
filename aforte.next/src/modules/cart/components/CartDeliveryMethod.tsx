import styled from "astroturf/react";
import { IconWarning } from "../../../common/components/icons/IconWarning";
import { Orders } from "../../orders/components/Orders";
import { TypeOfDeliveryT } from "../../orders/interfaces/order";

type Props = {
  typeDelivery: TypeOfDeliveryT;
  setTypeDelivery: (cb: (value: TypeOfDeliveryT) => TypeOfDeliveryT) => void;
};

export const CartDeliveryMethod = ({ typeDelivery, setTypeDelivery }: Props) => {
  const handleClick = () => setTypeDelivery((prev) => (prev === "self" ? "courier" : "self"));

  return (
    <Container>
      <Title>Выберите способ доставки</Title>
      <GridContainer>
        <Orders.OrderDelivery handlerClick={handleClick} active={typeDelivery === "self"} />
        <Orders.OrderDelivery
          handlerClick={handleClick}
          active={typeDelivery === "courier"}
          isCourier
        />
      </GridContainer>
      <Warning>
        <IconWarning />
        <span>
          <strong>2 товара являются рецептурными</strong> и&nbsp;доступны только для самовывоза
        </span>
      </Warning>
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;
  background: $white;
  color: $black;
  border-radius: 32px;
  padding: 32px 40px;

  @include respond-to(small) {
    padding: 20px;
    grid-gap: 12px;
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

const GridContainer = styled.div`
  @import "variables";

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 20px;

  @include respond-to(small) {
    grid-column-gap: 10px;
  }
`;

const Warning = styled.div`
  @import "variables";

  display: grid;
  grid-template-columns: 20px 1fr;
  grid-column-gap: 12px;
  border-radius: 16px;
  background: $orange-3;
  color: $orange3;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0.02em;
  padding: 20px;

  svg {
    margin-top: 2px;
  }

  @include respond-to(small) {
    padding: 16px;
    font-size: 13px;
    line-height: 18px;
  }
`;
