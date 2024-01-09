import { useRouter } from "next/router";
import React, { useContext } from "react";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { ProfileTicket } from "../../../api/dto/TicketDto";
import { theme } from "../../../assets/theme/theme";
import { Pagination } from "../../../components/pagination/pagination";
import { EmptyScreenMatches } from "../../pageMatches/emptyScreenMatches/emptyScreenMatches";
import { TicketRow } from "./ticketRow";
import { TicketsHead } from "./ticketsHead";
import { ThemeContext } from "../../../core/themeProvider";

interface Props {
  tickets?: { Items?: ProfileTicket[]; Count: number };
  fetchOrders: () => void;
}

export const ProfileTickets = ({ tickets, fetchOrders }: Props) => {
  const { locale = "ru", query } = useRouter();
  const { isDarkTheme } = useContext(ThemeContext);

  return tickets?.Items?.length ? (
    <>
      <Container>
        <TicketsHead />

        {tickets?.Items?.map((ticket, index) => (
          <TicketRow key={index} ticket={ticket} fetchOrders={fetchOrders} />
        ))}
      </Container>

      <Pagination currentPage={query.page ? +query.page : 1} itemsCount={tickets.Count} pageSize={10} />
    </>
  ) : (
    <EmptyScreenMatches
      title={lang[locale].tickets.noTicketsCart}
      text={lang[locale].tickets.noTicketsPurchased(locale)}
      srcImg={`/images/profile/emptyScreen/${isDarkTheme ? "darkTheme" : "lightTheme"}/ticketsEmptyScreen_v1.0.0.png`}
    />
  );
};

const Container = styled.div`
  width: 100%;
  margin-top: 2.08vw;
  box-sizing: border-box;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-top: 4.17vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
  }
`;
