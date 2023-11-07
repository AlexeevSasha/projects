import styled from "astroturf/react";
import { UserOrderT } from "../interfaces/userOrders";

type Props = {
  order: UserOrderT;
};

export const DeliveredModal = ({ order }: Props) => {
  return (
    <Conteiner>
      <ModalTitle>Заказ №{order.id}</ModalTitle>
      <ProgressBar>
        <Step active={true}>
          <Title active={true}>Получили</Title>
          <Text>Заказ получен и будет обработан в ближайшее время</Text>
        </Step>
        <Step active={true}>
          <Title active>Подтвердили</Title>
          <Text>Заказ подтвержден и отправлен на сборку в аптеку</Text>
        </Step>
        <Step active={false}>
          <Title active={true}>Собираем</Title>
          <Text>Заказ находится на сборке на нашем складе</Text>
        </Step>
        <Step active={false}>
          <Title active={false}>Доставляем</Title>
          <Text>
            Планируемая дата доставки{" "}
            {new Date(order.deliveryDetails.deliveryDate).toLocaleString("ru", {
              month: "long",
              day: "numeric",
            })}
          </Text>
        </Step>
      </ProgressBar>
    </Conteiner>
  );
};
const Conteiner = styled.div`
  @import "variables";
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 28px 35px 0px 24px;
  @include respond-to(small) {
    padding: 24px;
  }
`;
const ModalTitle = styled.span`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const ProgressBar = styled.ul`
  position: relative;
  counter-reset: list 0;
  padding: 0px 0px 0px 10px;
  margin: 0;
`;
const Step = styled.li<{ active: boolean }>`
  @import "variables";
  list-style: none;
  height: 85px;
  border-left: 2px solid $blue-2;
  &:last-child {
    border-left-color: transparent;
  }
  &.active {
    border-left: 2px solid $greenMain;
    &:last-child {
      border-left-color: transparent;
    }
  }
`;
const Title = styled.h3<{ active: boolean }>`
  @import "variables";
  margin: 0;
  padding: 0;
  font-weight: 600;
  font-size: 16px;
  &:before {
    $size: 24px;
    color: transparent;
    position: relative;
    left: -13px;
    display: inline-block;
    width: $size;
    height: $size;
    text-align: center;
    border-radius: 50%;
    background-color: $blue-2;
    counter-increment: list;
    content: counter(list);
  }
  &.active::before {
    background-color: $greenMain;
  }
`;
const Text = styled.p`
  font-weight: 400;
  margin: 8px 0px 36px 0px;
  font-size: 14px;
  padding: 0px 0px 0px 25px;
`;
