import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { theme } from "../../../assets/theme/theme";

export const TicketsHead = () => {
  const { locale = "ru" } = useRouter();

  return (
    <Container>
      <div>{lang[locale].profileOrders.orderNumber}</div>
      <div>{lang[locale].profileOrders.orderDate}</div>
      <div>{lang[locale].profileOrders.paymentState}</div>
      <div>{lang[locale].profileOrders.price}</div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  background: ${({ theme }) => theme.colors.blackLight_red};
  height: 2.8125vw;
  padding: 0 2.08vw;
  box-sizing: border-box;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: 6vw;
    padding: 0 2.08vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    display: none;
  }

  & > div {
    font-family: "FCSM Text", sans-serif;
    font-weight: 700;
    letter-spacing: -0.165px;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.gray_white};
    width: 13.4vw;
    font-size: 0.83vw;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      width: 20%;
      font-size: 1.82vw;
      font-weight: 500;
    }
  }
`;
