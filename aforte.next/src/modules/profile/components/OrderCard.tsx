import styled from "astroturf/react";
import { NextImage } from "common/components/NextImage";
import { UserOrderT } from "../interfaces/userOrders";

interface IStatus {
  [key: string]: {
    status: string;
  };
}

type Props = {
  props: UserOrderT;
  orderPage?: boolean;
};

export const OrderCard = ({ props, orderPage }: Props) => {
  const statusOrders: IStatus = {
    expected: { status: "Ожидает оплаты" },
    going: { status: "Собираем ваш заказ" },
    delivered: { status: "Уже забрали" },
  };

  return (
    <OrderCardBlock>
      <OrderInfoBlock>
        <OrderNumber orderPage={orderPage}>Заказ №{props.id}</OrderNumber>
        <OrderDate orderPage={orderPage}>
          Доставка в аптеку &nbsp;
          {new Date(props.deliveryDetails.deliveryDate).toLocaleString("ru", {
            month: "long",
            day: "numeric",
          })}
        </OrderDate>
        <OrderAdress>{props.deliveryDetails.details}</OrderAdress>
        <OrderTime status={props.status} orderPage={orderPage}>{statusOrders[props?.status]?.status}</OrderTime>
      </OrderInfoBlock>
      <OrderImagesBlock>
        <OrderTimeMobile status={props.status}>
          {statusOrders[props?.status]?.status}
        </OrderTimeMobile>
        <OrderSumm orderPage={orderPage}>
          {props.items.length} товара на <span>{props.price} руб</span>, ожидает оплаты
        </OrderSumm>
        <OrderImageBlock>
          {props.items.length <= 3 ? (
            props.items
              .map((item) => (
                <ImageWrapper key={item.id}>
                  <NextImage src={item.image} alt={"review"} />
                </ImageWrapper>
              ))
              .slice(0, 3)
          ) : (
            <>
              {props.items
                .map((item) => (
                  <ImageWrapper key={item.id}>
                    <NextImage src={item.image} alt={"review"} />
                  </ImageWrapper>
                ))
                .slice(0, 2)}
              <OrderCountWrapper>
                +{props.items.length - 2} <br /> товара
              </OrderCountWrapper>
            </>
          )}
        </OrderImageBlock>
      </OrderImagesBlock>
    </OrderCardBlock>
  );
};
const OrderCardBlock = styled.div`
  @import "variables";
  display: flex;
  flex-direction: row;
  padding: 28px;
  background: $white;
  border-radius: 28px;
  width: 100%;
  @include respond-to(large) {
    flex-direction: column;
    padding: 20px;
  }
`;
const OrderInfoBlock = styled.div`
  @import "variables";
  width: 50%;

  @include respond-to(large) {
    width: 100%;
  }
`;
const OrderNumber = styled.p<{ orderPage?: boolean }>`
  @import "variables";
  font-weight: 500;
  font-size: 14px;
  color: $blue1;
  margin: 0px 0px 12px 0px;
  &.orderPage {
    margin: 0px 0px 8px 0px;
  }
  @include respond-to(large) {
    margin: 0px 0px 8px 0px;
    font-size: 13px;
  }
`;
const OrderDate = styled.p<{ orderPage?: boolean }>`
  @import "variables";
  font-weight: 600;
  font-size: 18px;
  margin: 0px 0px 12px 0px;
  &.orderPage {
    margin: 0px 0px 8px 0px;
  }
  @include respond-to(large) {
    margin: 0px 0px 8px 0px;
    font-size: 16px;
  }
`;
const OrderAdress = styled.p`
  @import "variables";
  font-weight: 500;
  font-size: 14px;
  opacity: 0.4;
  margin: 0px;
  @include respond-to(large) {
    margin-bottom: 12px;
  }
`;
const OrderTime = styled.p<{ status: string; orderPage?: boolean }>`
  @import "variables";
  font-weight: 600;
  font-size: 13px;
  margin: 26px 0px 0px 0px;
  padding: 6px 12px;
  width: fit-content;
  border-radius: 20px;
  &.orderPage {
    margin: 34px 0px 0px 0px;
  }
  &.status-expected {
    color: $orange3;
    background: rgba(255, 120, 90, 0.1);
  }
  &.status-going {
    color: $greenMain;
    background: rgba(109, 196, 123, 0.1);
  }
  &.status-delivered {
    color: $black;
    opacity: 0.4;
    background: $BG;
  }

  @include respond-to(large) {
    display: none;
  }
`;

const OrderImagesBlock = styled.div`
  @import "variables";
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  @include respond-to(large) {
    align-items: flex-start;
    width: 100%;
    flex-direction: column-reverse;
    p {
      margin: 12px 0px;
    }
  }
`;
const OrderSumm = styled.p<{ orderPage?: boolean }>`
  @import "variables";
  font-weight: 500;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.4);
  margin: 0px 0px 16px 0px;
  &.orderPage {
    span {
      font-weight: 600;
      color: $black;
    }
  }
  @include respond-to(large) {
    span {
      font-weight: 600;
      color: $black;
    }
  }
`;
const OrderImageBlock = styled.div`
  @import "variables";
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const ImageWrapper = styled.div`
  @import "variables";
  width: 100px;
  height: 100px;
  border-radius: 24px;
  margin-right: 12px;
  &:last-child {
    margin-right: 0px;
  }

  @include respond-to(large) {
    width: 68px;
    height: 68px;
    &:last-child {
      display: none;
    }
  }
`;
const OrderTimeMobile = styled(OrderTime) <{ status: string }>`
  @import "variables";
  margin: 0px !important;
  display: none;
  @include respond-to(large) {
    display: block;
    &.status-expected {
      color: $orange3;
      background: rgba(255, 120, 90, 0.1);
    }
    &.status-going {
      color: $greenMain;
      background: rgba(109, 196, 123, 0.1);
    }
    &.status-delivered {
      color: $black;
      opacity: 0.4;
      background: $BG;
    }
  }
`;
const OrderCountWrapper = styled.div`
  @import "variables";
  display: flex;
  width: 100px;
  height: 100px;
  border-radius: 24px;
  background: rgba(168, 191, 231, 0.1);
  justify-content: center;
  align-items: center;
  text-align-last: center;
  font-size: 14px;
  font-weight: 500;
  color: $blue1;
  @include respond-to(large) {
    width: 68px;
    height: 68px;
  }
`;
