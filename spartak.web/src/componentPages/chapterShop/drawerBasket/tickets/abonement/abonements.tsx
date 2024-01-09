import { useRouter } from "next/router";
import React, { useContext } from "react";
import styled from "styled-components";
import { lang } from "../../../../../../public/locales/lang";
import { DeleteCartTicketsDto, ITicket } from "../../../../../api/dto/ITickets";
import { ClearCartIcon } from "../../../../../assets/icon/clearCartIcon";
import { theme } from "../../../../../assets/theme/theme";
import { DataContext } from "../../../../../core/dataProvider";
import { AbonementItem } from "./abonementItem";

interface IProps {
  abonements: ITicket[];
  deleteAbonement: (type: string) => (body?: DeleteCartTicketsDto) => void;
  createOrder: (calendarId: string) => void;
}

export const Abonements = ({ abonements, deleteAbonement, createOrder }: IProps) => {
  const { locale = "ru", push, asPath } = useRouter();
  const { auth } = useContext(DataContext);

  const declination = (amount: number) => {
    return `${amount} абонемент${amount % 100 > 4 ? "ов" : amount % 100 > 1 ? "а" : ""}`;
  };

  const sum = abonements.reduce((a, b) => {
    return +a + Number(b.price);
  }, 0);

  return (
    <>
      <div>
        <Header>
          {declination(abonements.length)}

          <ClearAll onClick={() => deleteAbonement(abonements[0].calendarId)()}>
            {lang[locale].shop.clearAll}
            <ClearCartIcon />
          </ClearAll>
        </Header>

        {abonements.map((elem) => (
          <AbonementItem key={elem.id} abonementInfo={elem} onDelete={deleteAbonement(elem.calendarId)} />
        ))}
      </div>

      <TotalSumm>
        {lang[locale].shop.sum}: {sum} ₽
        <GoToCart
          onClick={() =>
            auth?.user
              ? createOrder(abonements[0].calendarId)
              : push(`/auth/signin?backUrl=${encodeURIComponent(asPath)}`)
          }
        >
          {lang[locale].shop.checkout}
        </GoToCart>
      </TotalSumm>
    </>
  );
};

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.83vw;
  font-family: "FCSM Text", sans-serif;
  font-weight: 500;
  padding: 0 1.25vw;
  svg {
    path {
      stroke: ${theme.colors.red};
    }
  }
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 0 3.13vw;
    font-size: 2.09vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 0 4.27vw;
    font-size: 4.27vw;
  }
`;

const ClearAll = styled.div`
  font-size: 0.63vw;
  text-transform: uppercase;
  white-space: nowrap;
  color: ${theme.colors.red};
  cursor: pointer;
  display: flex;
  align-items: center;

  svg {
    margin-left: 0.42vw;
    width: 1.25vw;
    height: 1.25vw;
  }
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.56vw;
    svg {
      margin-left: 1.04vw;
      width: 3.13vw;
      height: 3.13vw;
    }
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.2vw;
    svg {
      margin-left: 1.07vw;
      width: 6.4vw;
      height: 6.4vw;
    }
  }
`;

const TotalSumm = styled.div`
  color: ${theme.colors.white};
  background: ${theme.colors.red};
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  font-size: 1.25vw;
  text-transform: uppercase;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0.83vw 1.25vw;
  margin-top: auto;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 2.09vw 3.13vw;
    font-size: 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 4.27vw;
    font-size: 3.73vw;
  }
`;

const GoToCart = styled.div`
  font-family: "FCSM Text", sans-serif;
  font-weight: 600;
  font-size: 0.73vw;
  text-transform: uppercase;

  border: 1px solid ${theme.colors.white};
  padding: 0.73vw 1.25vw;
  text-align: center;
  cursor: pointer;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 1.83vw 3.13vw;
    font-size: 1.83vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 3.73vw 6.4vw;
    font-size: 3.73vw;
    white-space: nowrap;
  }
`;
