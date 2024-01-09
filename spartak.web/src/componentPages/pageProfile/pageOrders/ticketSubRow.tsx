import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { theme } from "../../../assets/theme/theme";
import { OrderDetails } from "../../../api/dto/TicketDto";

interface IProps {
  orderDetails?: OrderDetails;
  status: string;
}

export const TicketSubRow = ({ orderDetails, status }: IProps) => {
  const { locale = "ru" } = useRouter();

  return (
    <Container>
      <div>
        <Label>{lang[locale].profileOrders.event}</Label>
        <Value>{orderDetails?.Event}</Value>
      </div>

      <div>
        <Label>{lang[locale].profileOrders.place}</Label>
        <Value>
          {orderDetails?.SeatFullName ||
            `${lang[locale].profileTickets.sector} ${orderDetails?.Sector} ${lang[locale].profileTickets.row} ${orderDetails?.Line} ${lang[locale].profileTickets.place} ${orderDetails?.Seat}`}
        </Value>
      </div>

      <div>
        <Label>{lang[locale].profileOrders.category}</Label>
        <Value>{orderDetails?.Category}</Value>
      </div>

      <div>
        <Label>{lang[locale].profileOrders.quantity}</Label>
        <Value>{orderDetails?.Quantity}</Value>
      </div>

      <div>
        <Label>{lang[locale].profileOrders.pricePerOne}</Label>
        <Value>{orderDetails?.Price} ₽</Value>
      </div>

      <div>
        <Label>{lang[locale].profileOrders.sum}</Label>
        <Value>{orderDetails?.Sum} ₽</Value>
      </div>

      <div>
        <Label>{lang[locale].profileOrders.orderData.orderStatus}</Label>
        <Value>{lang[locale].profileOrders.orderStatus[status]}</Value>
      </div>
    </Container>
  );
};

const Container = styled.div`
  color: ${theme.colors.gray};
  display: grid;
  padding: 1.25vw 2.08vw;
  box-sizing: border-box;
  background: ${({ theme }) => theme.colors.blackLight_gray1};
  grid: auto / 2fr 2fr 1fr 1fr 1fr 1fr auto;
  column-gap: 1vw;
  grid-template-areas: "event place category quantity price sum status";
  margin-top: 0.1vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid: auto auto / repeat(12, 1fr);
    grid-template-areas:
      "event event event event place place place place category category category category"
      "quantity quantity quantity price price price sum sum sum status status status";
    row-gap: 3.13vw;
    padding: 3.13vw 2.08vw;
    margin-top: 0.26vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid: auto auto auto / repeat(6, 1fr);
    grid-template-areas:
      "event event event status status status"
      "place place place category category category"
      "quantity quantity price price sum sum";
    row-gap: 4.26vw;
    padding: 4.26vw;
    margin-top: 0.53vw;
  }

  & > div:nth-child(1) {
    grid-area: event;
  }

  & > div:nth-child(2) {
    grid-area: place;
  }

  & > div:nth-child(3) {
    grid-area: category;
  }

  & > div:nth-child(4) {
    grid-area: quantity;
  }

  & > div:nth-child(5) {
    grid-area: price;
  }

  & > div:nth-child(6) {
    grid-area: sum;
  }

  & > div:nth-child(7) {
    grid-area: status;
  }
`;

const Label = styled.div`
  color: ${theme.colors.grayDark1};
  text-transform: uppercase;
  font-size: 0.625vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.82vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 2.66vw;
  }
`;

const Value = styled.div`
  color: ${({ theme }) => theme.colors.white_black};
  font-size: 0.73vw;
  font-weight: 500;
  margin-top: 0.41vw;
  text-transform: capitalize;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.82vw;
    margin-top: 1.04vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.26vw;
    margin-top: 2.13vw;
  }
`;
