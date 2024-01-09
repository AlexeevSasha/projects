import Image from "next/image";
import React, { useContext } from "react";
import styled from "styled-components";
import { theme } from "../../assets/theme/theme";
import { CustomButton } from "../../components/buttons/customButton";
import { useRouter } from "next/router";
import { lang } from "../../../public/locales/lang";
import { TicketsDeclination } from "../../helpers/ticketsDeclination";
import { DataContext } from "../../core/dataProvider";
import { excursionRepository } from "../../api/excursionRepository";
import { ticketsRepository } from "../../api/ticketsRepository";
import { EnumCartTabs } from "../../common/interfaces/EnumDrawerTabs";

interface IProps {
  date: string;
  name: string;
  limit: number;
  nameType: string;
  id: number;
  setLoading: (val: boolean) => void;
}

export const ExcursionCard = ({ limit, name, date, nameType, id, setLoading }: IProps) => {
  const { locale = "ru" } = useRouter();
  const { shop: { excursion = undefined } = {}, setListExcursion, setDrawerIsOpen } = useContext(DataContext);

  const existInCart = excursion?.find((item) => +item?.calendarId === id);

  const addExcursionRequest = async () => {
    setLoading(true);

    if (!!existInCart) {
      await ticketsRepository
        .changeCategoryCartExcursion(String(id), { id: existInCart?.id, quant: String(+existInCart?.quant + 1) })
        .then(() => {
          ticketsRepository.fetchCartTickets("excursion").then((res) => {
            setListExcursion(res.list);
          });
          setLoading(false);
          setDrawerIsOpen(true, EnumCartTabs.tickets);
        });
    } else {
      await excursionRepository.addExcursionInCart(id).finally(() => {
        ticketsRepository.fetchCartTickets("excursion").then((res) => {
          setListExcursion(res.list);
        });
        setLoading(false);
        setDrawerIsOpen(true, EnumCartTabs.tickets);
      });
    }
  };
  return (
    <Container>
      <NameDesc>
        <Name>{name}</Name>

        <Desc>{nameType}</Desc>
      </NameDesc>

      <Time>{date}</Time>

      <TicketsCount>{TicketsDeclination(limit)}</TicketsCount>

      <Button type="red" onClick={addExcursionRequest}>
        <IconWrapper>
          <Image src={"/images/Ticket.svg"} alt="TK" layout="fill" />
        </IconWrapper>

        <span>{lang[locale].button.buyTicket}</span>
      </Button>
    </Container>
  );
};

const Container = styled.div`
  background: ${({ theme }) => theme.colors.blackLight_whiteGray};
  color: ${({ theme }) => theme.colors.white_black};
  font-family: "FCSM Text", sans-serif;
  font-weight: 500;
  padding: 0.83vw 1.25vw;
  display: grid;
  gap: 0.9375vw;
  align-items: center;
  grid: auto / 25.73vw 13.02vw 1fr 1fr;
  font-size: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    gap: 2.08vw;
    grid: auto / 33vw 9.13vw 1fr 1fr;
    padding: 1.04vw 2.08vw;
    font-size: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    gap: 2.66vw;
    grid: auto auto auto / 31.33 31.33 auto;
    padding: 3.2vw 4.26vw;
    font-size: 4.8vw;
    grid-template:
      "a a b"
      "c c c"
      "d d d";
  }
`;

const NameDesc = styled.div`
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-area: a;
  }
`;

const Name = styled.div``;

const Desc = styled.div`
  color: ${({ theme }) => theme.colors.gray_grayDark1};
  font-size: 0.9375vw;
  margin-top: 0.41vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
    margin-top: 1.04vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.26vw;
    margin-top: 1.06vw;
  }
`;

const Time = styled.div`
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    text-align: end;
    grid-area: b;
  }
`;

const TicketsCount = styled.div`
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-area: c;
  }
`;

const Button = styled(CustomButton)`
  padding: 0 1.25vw;
  height: 2.5vw;
  width: max-content;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 0 3.13vw;
    height: 6.25vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 100%;
    padding: 0;
    height: 8.53vw;
    grid-area: d;
  }
`;

const IconWrapper = styled.div`
  position: relative;
  width: 1.04vw;
  height: 1.04vw;
  margin-right: 0.87vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 2.6vw;
    height: 2.6vw;
    margin-right: 1.04vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 5.33vw;
    height: 5.33vw;
    margin-right: 2.13vw;
  }
`;
