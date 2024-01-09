import { useRouter } from "next/router";
import React, { useContext, useMemo, useState } from "react";
import styled from "styled-components";
import { lang } from "../../../../../../public/locales/lang";
import { DeleteCartTicketsDto, ITicket } from "../../../../../api/dto/ITickets";
import { ClearCartIcon } from "../../../../../assets/icon/clearCartIcon";
import { theme } from "../../../../../assets/theme/theme";
import { MessageModal } from "../../../../../components/modal/messageModal";
import { DataContext } from "../../../../../core/dataProvider";
import { TicketsDeclination } from "../../../../../helpers/ticketsDeclination";
import { TicketItem } from "./ticketItem";

interface IProps {
  ticketList: ITicket[];
  deleteTicket: (type: string) => (body?: DeleteCartTicketsDto) => void;
  onChangeCategory: (type: string) => (body?: { id: string; categoryId: string }) => void;
  createOrder: (calendarId: string) => void;
  fanIdHandler: (type: string) => (body?: { id: string; fanId: string }) => Promise<boolean>;
}

export const Tickets = ({ ticketList, deleteTicket, onChangeCategory, createOrder, fanIdHandler }: IProps) => {
  const { locale = "ru", push, asPath } = useRouter();
  const { auth } = useContext(DataContext);
  const [showModal, setShowModal] = useState<boolean>(false);

  const sum = ticketList.reduce((a, b) => +a + Number(b.price), 0);

  const everyTicketHasFanId = useMemo((): boolean => {
    if (ticketList.filter((t) => t.requestFanId === 1 && !t.fanId).length > 0) return false;
    return true;
  }, [ticketList]);

  return (
    <>
      <div>
        <Header>
          {TicketsDeclination(ticketList.length)}

          <ClearAll onClick={() => deleteTicket(ticketList[0].calendarId)()}>
            {lang[locale].shop.clearAll}

            <ClearCartIcon />
          </ClearAll>
        </Header>

        {ticketList.map((elem) => (
          <TicketItem
            key={elem.id}
            ticketInfo={elem}
            onDelete={deleteTicket(elem.calendarId)}
            onChangeCategory={onChangeCategory(elem.calendarId)}
            fanIdHandler={fanIdHandler(elem.calendarId)}
          />
        ))}
      </div>
      {showModal && (
        <MessageModal type="alert" withoutTimeout message={" "} onClose={() => setShowModal(false)} isFlex>
          <ModalContent>
            <ModalTitle>
              {lang[locale].modalWindow.modalTitle.enterFanId1}
              <ModalLink href={`${process.env.NEXT_PUBLIC_TICKETS_HOME_URL}/${locale}/info/fanCard`}>
                {lang[locale].modalWindow.modalTitle.enterFanId2}
              </ModalLink>
            </ModalTitle>
            <ModalText>{lang[locale].modalWindow.modalTitle.enterFanId3}</ModalText>
          </ModalContent>
        </MessageModal>
      )}
      <TotalSumm>
        {lang[locale].shop.sum}: {sum} ₽
        <GoToCart
          onClick={() =>
            auth?.user
              ? everyTicketHasFanId
                ? createOrder(ticketList[0].calendarId)
                : setShowModal(true)
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

const ModalContent = styled.div`
  margin: 0;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin: 0 -10%;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin: 0;
  }
`;

const ModalTitle = styled.h1`
  font-family: "FCSM Text", sans-serif;
  font-size: 1.67vw;
  margin: 0;
  text-align: center;
  align-self: center;
  color: ${theme.colors.black};
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 4.17vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 6.4vw;
  }
`;

const ModalLink = styled.a`
  color: ${theme.colors.red};
  text-decoration: none;
`;

const ModalText = styled.p`
  font-family: "FCSM Text", sans-serif;
  font-size: 0.94vw;
  margin: 0;
  margin-top: 0.63vw;
  text-align: center;
  max-width: 31vw;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
    margin-top: 1.56vw;
    max-width: none;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.8vw;
    margin-top: 3.2vw;
  }
`;
