import styled from "astroturf/react";
import { Button } from "common/components/Button";
import { AppContext } from "common/components/ContextProvider";
import { IconPay } from "common/components/icons/IconPay";
import { IconPerson } from "common/components/icons/IconPerson";
import { IconShop } from "common/components/icons/IconShop";
import { ModalNames } from "common/interfaces/modal";
import Link from "next/link";
import { useContext } from "react";
import { UserOrderT } from "../interfaces/userOrders";
import { Profile } from "./Profile";

interface IStatus {
  [key: string]: {
    status: string;
    title: string;
    delivery: string;
  };
}

type Props = {
  order: UserOrderT;
};

export const OrderInfoDetail = ({ order }: Props) => {
  const { openModal } = useContext(AppContext);
  const statusOrders: IStatus = {
    expected: { status: "Ожидает оплаты", title: "ожидает оплаты", delivery: "Оплатите заказ до" },
    going: { status: "Собираем ваш заказ", title: "оформлен", delivery: "Планируем доставить" },
    delivered: { status: "Уже у вас", title: "получен", delivery: "Доставили" },
  };
  return (
    <OrderInfoWraper>
      <TitleInfo>
        <InfoBlock>
          <CustomLink href="/profile/orders">К списку заказов</CustomLink>
          <CustomTitileH1>
            {`Заказ №${order.id} ${statusOrders[order?.status]?.title}`}
          </CustomTitileH1>
          <DeliveryDate>
            {statusOrders[order?.status]?.delivery}{" "}
            {new Date(order.deliveryDetails.deliveryDate).toLocaleString("ru", {
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}
          </DeliveryDate>
        </InfoBlock>
        <StatusTag
          onClick={() =>
            openModal(ModalNames.POPUP_MODAL, {
              children: <Profile.DeliveredModal order={order} />,
            })
          }
          status={order.status}
        >
          {statusOrders[order?.status]?.status}
        </StatusTag>
      </TitleInfo>
      <FullInfoBlock>
        <LeftInfoBlock>
          <IconTitile>
            <IconShop />
            <TitleName>Самовывоз из аптеки</TitleName>
          </IconTitile>
          <OrderDetails>Планета здоровья 115531</OrderDetails>
          <OrderDetails> г Москва, ул Саянская, д. 11А. </OrderDetails>
          <OrderDetails> М. Новогиреево </OrderDetails>
          <OrderDetails>Время работы — 10:00–22:00 Пн–Вс </OrderDetails>
          <OrderDetails><span>Срок хранения заказа — 3 дня</span></OrderDetails>
        </LeftInfoBlock>
        <RightInfoBlock>
          <RowInfoBlock>
            <CustomIconTitile>
              <IconPay />
              <TitleName>Оплата при получении</TitleName>
            </CustomIconTitile>
            <OrderDetails>
              <span>{order.price} ₽</span> за {order.items.length} товара,{" "}
              {order.status === "delivered"
                ? "оплачено"
                : "не оплачено, Заказ можно оплатить в аптеке наличными или картой"}
            </OrderDetails>
          </RowInfoBlock>
          <RowInfoBlock>
            <CustomIconTitile>
              <IconPersonWrapper>
                <IconPerson />
              </IconPersonWrapper>
              <TitleName>{order.deliveryDetails.buyerName}</TitleName>
            </CustomIconTitile>
            <OrderDetails>8 921 123 45 67</OrderDetails>
          </RowInfoBlock>
        </RightInfoBlock>
      </FullInfoBlock>
      <ActionBlock>
        {order.status === "expected" || order.status === "going" ? (
          <>
            {order.status === "expected" && <PaymentButton>Оплатить заказ</PaymentButton>}
            <DeleteButton
              onClick={() =>
                openModal(ModalNames.POPUP_MODAL, {
                  children: <Profile.ProfileDeleteOrderModal />,
                })
              }
            >
              Отменить заказ
            </DeleteButton>
          </>
        ) : (
          <>
            <PaymentButton>Повторить заказ</PaymentButton>
            <СheckButton>Получить электронный чек</СheckButton>
          </>
        )}
      </ActionBlock>
    </OrderInfoWraper>
  );
};
const OrderInfoWraper = styled.div`
  @import "variables";
  display: flex;
  flex-direction: column;
  width: 100%;
  background: $white;
  border-radius: 32px;
  @include respond-to(small) {
    margin-top: 8px;
  }
`;
const TitleInfo = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding: 32px 40px 0px 40px;
  margin-bottom: 40px;

  @media (max-width: 1300px) {
    flex-direction: column;
    margin-bottom: 28px;
    padding: 20px 20px 0px 20px;
  }
`;
const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
`;
const CustomLink = styled(Link)`
  @import "variables";
  font-weight: 600;
  font-size: 16px;
  color: $blue1;
  margin-bottom: 8px;
  @media (max-width: 1300px) {
    font-size: 14px;
    font-weight: 500;
  }
`;
const DeliveryDate = styled.p`
  margin: 8px 0px 0px 0px;
  font-weight: 500;
  font-size: 16px;
  opacity: 0.4;
  @media (max-width: 1300px) {
    font-size: 14px;
    font-weight: 400;
    margin: 4px 0px 12px 0px;
  }
`;
const StatusTag = styled(Button) <{ status: string }>`
  @import "variables";
  padding: 13px 20px;
  border-radius: 28px;
  font-weight: 600;
  font-size: 13px;
  margin: 0;
  height: fit-content;
  width: fit-content;
  &.status-going {
    color: $white;
    background: $greenMain;
    &:hover {
      background: $greenHover;
    }
  }
  &.status-expected {
    color: $white;
    background: $orange3;
    &:hover {
      background: $orangeHover;
    }
  }
  &.status-delivered {
    color: $greenMain;
    background: rgba(109, 196, 123, 0.1);
    &:hover {
      background: rgba(109, 196, 123, 0.2);
    }
  }
  @include respond-to(small) {
    padding: 6px 16px;
  }
`;
const FullInfoBlock = styled.div`
  @import "variables";
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 0px 64px 0px 40px;
  svg {
    width: 24px;
    height: 24px;
  }
  @media (max-width: 1300px) {
    flex-direction: column;
    padding: 0px 31px 0px 20px;
  }
  @include respond-to(small) {
    svg {
    width: 20px;
    height: 20px;
  }
  }
`;
const LeftInfoBlock = styled.div`
  width: 50%;
  @media (max-width: 1300px) {
    width: 100%;
    margin-bottom: 24px;
  }
`;
const IconTitile = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 17px;
  @media (max-width: 1300px) {
    margin-bottom: 10px;
  }
`;
const IconPersonWrapper = styled.div`
  @import "variables";
  svg {
    ellipse {
      fill: $blue1;
    }
    path {
      fill: $blue1;
    }
  }
`;
const TitleName = styled.p`
  margin: 0;
  font-weight: 600;
  font-size: 16px;
  padding-left: 16px;
`;
const CustomIconTitile = styled(IconTitile)`
  margin-bottom: 9px;
  svg {
    opacity: 0.4;
  }
`;
const OrderDetails = styled.p`
  font-weight: 400;
  font-size: 16px;
  padding-left: 40px;
  margin: 0px;
  line-height: 24px;
  span {
    font-weight: 600;
  }
`;
const RightInfoBlock = styled.div`
  width: 50%;
  padding-left: 40px;
  :last-child {
    margin-bottom: 0px;
  }
  @media (max-width: 1300px) {
    width: 100%;
    padding: 0px;
  }
`;
const RowInfoBlock = styled.div`
  margin-bottom: 25px;
  @media (max-width: 1300px) {
    margin-bottom: 12px;
  }
`;
const ActionBlock = styled.div`
  width: 100%;
  margin: 44px 0px 40px 0px;
  padding: 0px 0px 0px 40px;
  display: flex;
  flex-direction: row;
  @media (max-width: 1300px) {
    margin: 28px 0px 24px 0px;
    padding: 0px 20px 0px 20px;
    flex-direction: column;
  }
`;
const CustomButton = styled(Button)`
  border-radius: 16px;
  font-weight: 600;
  font-size: 14px;
  padding: 16.5px 60px;
`;
const DeleteButton = styled(CustomButton)`
  @import "variables";
  background: rgba(255, 120, 90, 0.1);
  color: $orange3;
  &:hover {
    background: rgba(255, 120, 90, 0.2);
  }
`;
const PaymentButton = styled(CustomButton)`
  @import "variables";
  background: $blue1;
  color: $white;
  margin-right: 12px;
  &:hover {
    background: $blue2;
  }
  @media (max-width: 1300px) {
    margin-right: 0px;
    margin-bottom: 12px;
  }
`;
const СheckButton = styled(CustomButton)`
  @import "variables";
  background: $blue-3;
  color: $blue1;
  &:hover {
    background: $blue-2;
  }
`;
const CustomTitileH1 = styled.p`
  @import "variables";
  margin: 0px;
  font-size: 22px;
  font-weight: 600;
  @media (max-width: 1300px) {
    font-size: 20px;
  }
`;
