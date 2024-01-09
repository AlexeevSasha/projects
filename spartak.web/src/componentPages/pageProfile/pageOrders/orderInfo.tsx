import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { theme } from "../../../assets/theme/theme";
import { CustomButton } from "../../../components/buttons/customButton";
import { DeleteProduct } from "./deleteProduct";
import type { IOrderDetails } from "../../../api/dto/IOrders";
import { shopRepository } from "../../../api/shopRepository";
import { MessageModal } from "../../../components/modal/messageModal";

interface IProps {
  order: IOrderDetails["order"];
  setLoading: (value: boolean) => void;
  fetchOrders: () => void;
}

export const OrderInfo = ({ order, setLoading, fetchOrders }: IProps) => {
  const { locale = "ru" } = useRouter();
  const [cancelId, setCancelId] = useState("");
  const [showCancelErrorModal, setShowCancelErrorModal] = useState("");
  const orderData = [
    order?.status,
    order?.payed,
    order?.pay?.title,
    `${order?.delivery?.title} ${order?.delivery?.summ}`,
  ];

  const handleDelete = () => {
    setCancelId("");
  };

  const orderPersonalData = useMemo(
    () =>
      orderData.map((elem, i) => (
        <Attr key={i}>
          <span>{Object.values(lang[locale].profileOrders.orderData)[i]}:</span>
          <span>
            {typeof elem === "boolean" ? lang[locale].profileOrders.orderPayment[elem ? "paid" : "notPaid"] : elem}
          </span>
        </Attr>
      )),
    [orderData]
  );

  const personalData = useMemo(
    () =>
      order?.personal.map((elem, i) => (
        <Attr key={i}>
          <span>{elem.label}:</span>
          <span>{elem.value}</span>
        </Attr>
      )),
    [order?.personal]
  );

  const handleDeleteOrder = () => {
    setLoading(true);
    shopRepository
      .deleteOrder(order.id)
      .then((res: any) => {
        console.log("res", res);
        if (res.status === "error") setShowCancelErrorModal(res.error);
        else fetchOrders();
      })
      .catch(() => {
        setShowCancelErrorModal(lang[locale].loadError.title);
      })
      .finally(() => setLoading(false));
  };

  return (
    <Container>
      <Header>{lang[locale].profileOrders.personalData}</Header>

      {personalData}

      <Header>{lang[locale].profileOrders.orderDataTitle}</Header>

      {orderPersonalData}

      <Header>
        {lang[locale].profileOrders.orderPrice} <span>{order?.price}</span>
      </Header>

      <BtnContainer>
        {order.pay.link ? (
          <a href={order.pay.link} style={{ textDecoration: "none" }}>
            <Button type="red">{lang[locale].profileOrders.payForOrder}</Button>
          </a>
        ) : null}
        <Button type="opacity" onClick={() => handleDeleteOrder()}>
          {lang[locale].profileOrders.cancelOrder}
        </Button>
      </BtnContainer>

      {cancelId && <DeleteProduct onDelete={handleDelete} onClose={() => setCancelId("")} />}
      {showCancelErrorModal && (
        <MessageModal
          message={showCancelErrorModal} //lang[locale].pageOrders.cancelOrderError}
          onClose={() => setShowCancelErrorModal("")}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 26.66vw;
  background: ${({ theme }) => theme.colors.blackLight_white1};
  color: ${({ theme }) => theme.colors.white_black};
  padding: 2.08vw 1.25vw;
  align-self: flex-start;
  margin-left: 1.25vw;
  font-family: "FCSM Text", sans-serif;
  font-weight: 500;
  font-size: 0.9375vw;
  line-height: 1.55em;
  box-sizing: border-box;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 100%;
    font-size: 2.34vw;
    padding: 5.215vw 3.13vw;
    margin-top: 3.13vw;
  }
`;

const Header = styled.div`
  font-size: 1.25vw;
  display: flex;
  justify-content: space-between;

  &:not(:first-child) {
    margin-top: 1.25vw;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 3.13vw;

    &:not(:first-child) {
      margin-top: 3.13vw;
    }
  }
`;

const Attr = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.625vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-top: 1.56vw;
  }

  & > *:first-child {
    color: ${({ theme }) => theme.colors.gray_grayDark1};
  }
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-top: 3.13vw;
  }
`;

const Button = styled(CustomButton)`
  padding: 0;
  width: 11.45vw;
  height: 2.4vw;
  font-size: 0.73vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 28.68vw;
    height: 6vw;
    font-size: 1.825vw;
  }
`;
