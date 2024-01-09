import { useRouter } from "next/router";
import React, { useContext } from "react";
import styled from "styled-components";
import { lang } from "../../../../../../public/locales/lang";
import { DeleteCartTicketsDto, ITicket } from "../../../../../api/dto/ITickets";
import { ClearCartIcon } from "../../../../../assets/icon/clearCartIcon";
import { theme } from "../../../../../assets/theme/theme";
import { Spacer } from "../../../../../components/spacer";
import { DataContext } from "../../../../../core/dataProvider";
import { TicketsDeclination } from "../../../../../helpers/ticketsDeclination";
import { TicketAlertInformation } from "../ticketAlertInformation";
import { ExcursionItem } from "./excursionItem";

type Props = {
  excursions: ITicket[];
  deleteExcursion: (id: string, type?: string) => (body?: DeleteCartTicketsDto) => void;
  handleUpdateExcursionCount: (itemId: string) => (body?: { id: string; quant?: string }) => void;
  createOrder: (calendarId: string, type?: string) => void;
};

export const Excursions = ({ excursions, deleteExcursion, createOrder, handleUpdateExcursionCount }: Props) => {
  const { locale = "ru", push, asPath } = useRouter();
  const { auth } = useContext(DataContext);

  return (
    <>
      <div>
        <Header>
          {TicketsDeclination(excursions?.[0]?.quant)}

          <ClearAll onClick={() => deleteExcursion(excursions[0].calendarId, "excursion")()}>
            {lang[locale].shop.clearAll}

            <ClearCartIcon />
          </ClearAll>
        </Header>

        {excursions.map((elem) => (
          <React.Fragment key={elem.id}>
            <ExcursionItem
              excursion={elem}
              onDelete={deleteExcursion(elem.calendarId, "excursion")}
              handleUpdateExcursionCount={handleUpdateExcursionCount(elem.calendarId)}
            />
            <Spacer height={["1.25vw", "3.13vw", "6.4vw"]} />
            <TicketAlertInformation message={"Ограничение по заказу билетов на данное мероприятие 25 шт"} visible />
          </React.Fragment>
        ))}
      </div>

      <TotalSumm>
        {lang[locale].shop.sum}: {(+excursions[0]?.price * excursions[0]?.quant)?.toFixed(2)} ₽
        <GoToCart
          onClick={() =>
            auth?.user
              ? createOrder(excursions[0].calendarId, "excursion")
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
  color: ${theme.colors.red};
  text-transform: uppercase;
  cursor: pointer;
  white-space: nowrap;
  display: flex;
  align-items: center;
  grid-gap: 0.42vw;
  svg {
    width: 1.25vw;
    height: 1.25vw;
  }
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.56vw;
    grid-gap: 1.04vw;
    svg {
      width: 3.13vw;
      height: 3.13vw;
    }
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.2vw;
    grid-gap: 1.07vw;
    svg {
      width: 6.4vw;
      height: 6.4vw;
    }
  }
`;

const TotalSumm = styled.div`
  display: flex;
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  justify-content: space-between;
  padding: 0.83vw 1.25vw;
  font-size: 1.25vw;
  text-transform: uppercase;
  color: ${theme.colors.white};
  background: ${theme.colors.red};
  margin-top: auto;
  align-items: center;
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
  padding: 0.73vw 1.25vw;
  text-transform: uppercase;
  font-family: "FCSM Text", sans-serif;
  font-weight: 600;
  font-size: 0.73vw;
  border: 1px solid ${theme.colors.white};
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
