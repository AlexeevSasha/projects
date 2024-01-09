import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { lang } from "../../../../../public/locales/lang";
import { DeleteCartTicketsDto, ITicket } from "../../../../api/dto/ITickets";
import { ticketsRepository } from "../../../../api/ticketsRepository";
import { theme } from "../../../../assets/theme/theme";
import { MessageModal } from "../../../../components/modal/messageModal";
import { DataContext } from "../../../../core/dataProvider";
import { LoadingScreen } from "../../../../ui/LoadingScreen ";
import { EmptyShopBacket } from "../emptyShopBacket";
import { Abonements } from "./abonement/abonements";
import { Excursions } from "./excursion/excursions";
import { ParkingLots } from "./parkingLots/parkingLots";
import { TicketAlertInformation } from "./ticketAlertInformation";
import { Tickets } from "./tickets/tickets";

const excursionIds = [410];
const abonementIds = [210, 220, 230, 520, 521, 522, 525, 526, 528, 530, 540, 555, 560];
const ticketsIds = [410, 450, 460, 510, 515, 518, 530, 540, 550, 570];
const parkingIds = [516];

export const TicketsTab = () => {
  const { locale = "ru", push } = useRouter();
  const {
    shop: { tickets: allTickets = undefined, excursion: allExcursion = undefined, card = null } = {},
    setListTicket,
    setCardTicket,
    setListExcursion,
  } = useContext(DataContext);
  const [loading, setLoading] = useState(false);
  const [deleteData, setDeleteData] = useState<
    { id: string; body?: DeleteCartTicketsDto; type?: string } | undefined
  >();
  const [excursions, setExcursions] = useState<{ [key: string]: ITicket[] }>({});
  const [abonements, setAbonements] = useState<{ [key: string]: ITicket[] }>({});
  const [parkingLots, setParkingLots] = useState<ITicket[]>();
  const [ticket, setTicket] = useState<{ [key: string]: ITicket[] }>({});
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    // Группировка экскурсий
    const excursionsList: { [key: string]: ITicket[] } = {};
    allExcursion
      ?.filter(({ saleAlgorithmId }) => excursionIds.includes(saleAlgorithmId))
      .forEach((elem) => {
        excursionsList[`${elem.calendarId}`] = [...(excursionsList[`${elem.calendarId}`] || []), elem];
      });
    setExcursions(excursionsList);

    // Группировка абонементов
    const abonementsList: { [key: string]: ITicket[] } = {};
    allTickets
      ?.filter(({ saleAlgorithmId }) => abonementIds.includes(saleAlgorithmId))
      .forEach((elem) => {
        abonementsList[`${elem.calendarId}`] = [...(abonementsList[`${elem.calendarId}`] || []), elem];
      });
    setAbonements(abonementsList);

    // Группировка билетов
    const ticketList: { [key: string]: ITicket[] } = {};
    allTickets
      ?.filter(({ saleAlgorithmId }) => ticketsIds.includes(saleAlgorithmId))
      .forEach((elem) => {
        ticketList[`${elem.calendarId}`] = [...(ticketList[`${elem.calendarId}`] || []), elem];
      });
    setTicket(ticketList);

    // Группировка парковок
    const parkingList = allTickets?.filter(({ saleAlgorithmId }) => parkingIds.includes(saleAlgorithmId));
    setParkingLots(parkingList);
  }, [allTickets, allExcursion]);

  //Удаление при клике на иконку корзины
  const handleDelete = (id: string, type?: string) => (body?: DeleteCartTicketsDto) =>
    setDeleteData({ id, body, type });

  //Кнопка в модалке на удаление
  const deleteTicket = () => {
    if (!deleteData) return;
    setLoading(true);

    ticketsRepository.deleteCartTickets(deleteData.id, deleteData.body, deleteData?.type).then(() => {
      ticketsRepository.fetchCartTickets().then((res) => setListTicket(res.list));
      ticketsRepository
        .fetchCartTickets("excursion")
        .then((res) => setListExcursion(res.list))
        .finally(() => setLoading(false));
    });
  };

  const updateCategoryTicket = (type: string) => (body?: { id: string; categoryId: string }) => {
    setLoading(true);

    ticketsRepository.changeCategoryCartTicket(type, body).then(() => {
      ticketsRepository
        .fetchCartTickets()
        .then((res) => setListTicket(res.list))
        .finally(() => setLoading(false));
    });
  };
  const handleUpdateExcursionCount = (itemId: string) => (body?: { id: string; quant?: string }) => {
    setLoading(true);

    ticketsRepository.changeCategoryCartExcursion(itemId, body).then(() => {
      ticketsRepository
        .fetchCartTickets("excursion")
        .then((res) => setListExcursion(res.list))
        .finally(() => setLoading(false));
    });
  };

  const checkTicketFanId = (type: string) => (body?: { id: string; fanId: string }) => {
    setLoading(true);
    return ticketsRepository
      .checkTicketFanId(type, body)
      .then((res) => {
        if (res.result) setListTicket(res.list);
        return res.result;
      })
      .finally(() => setLoading(false));
  };

  const createOrder = (calendarId: string, type?: string) => {
    if (card) {
      setLoading(true);
      ticketsRepository
        .createOrder(calendarId, card, type)
        .then((result) => {
          ticketsRepository.fetchCartTickets(type).then((res) => {
            if (type === "excursion") {
              setListExcursion(res?.list);
            } else {
              setListTicket(res?.list);
              setCardTicket(res?.card);
            }
          });
          if (result?.orderId) {
            push(
              `${
                type === "excursion" ? process.env.NEXT_PUBLIC_MUSEUM_URL : process.env.NEXT_PUBLIC_TICKETS_URL
              }/pay-order/${result.orderId}`
            );
          }
          setLoading(false);
        })
        .catch((result) => {
          setErrorText(result.content);
          setLoading(false);
        });
    } else {
      setErrorText("Отсутствует привязанная карта");
    }
  };

  return (
    <Content>
      {loading && <LoadingScreen />}

      <TicketAlertInformation />

      {allTickets?.length || allExcursion?.length ? (
        <>
          {Object.values(excursions).map((value) => (
            <Excursions
              excursions={value}
              deleteExcursion={handleDelete}
              key={value?.[0].calendarId}
              createOrder={createOrder}
              handleUpdateExcursionCount={handleUpdateExcursionCount}
            />
          ))}
          {Object.values(ticket).map((value) => (
            <Tickets
              createOrder={createOrder}
              ticketList={value}
              deleteTicket={handleDelete}
              onChangeCategory={updateCategoryTicket}
              key={value?.[0].calendarId}
              fanIdHandler={checkTicketFanId}
            />
          ))}
          {Object.values(abonements).map((value) => (
            <Abonements
              abonements={value}
              deleteAbonement={handleDelete}
              key={value?.[0].calendarId}
              createOrder={createOrder}
            />
          ))}
          {parkingLots?.map((value) => (
            <ParkingLots
              parkingLots={value}
              deleteParking={handleDelete}
              key={value.calendarId}
              createOrder={createOrder}
            />
          ))}
        </>
      ) : (
        <EmptyContainer>
          <EmptyShopBacket
            text={lang[locale].tickets.addTicketsToGet}
            title={lang[locale].tickets.noTicketsCart}
            defaultUrl={`${process.env.NEXT_PUBLIC_TICKETS_HOME_URL}/${locale}/matches`}
            buttonText={lang[locale].profile.denariiPage.button}
          />
        </EmptyContainer>
      )}

      {deleteData && (
        <MessageModal
          type="confirm"
          onClose={() => setDeleteData(undefined)}
          onConfirm={deleteTicket}
          message={lang[locale].shop.removeTicketConfirmText}
        />
      )}

      {errorText && (
        <MessageModal
          type="alert"
          onClose={() => setErrorText("")}
          // onConfirm={deleteTicket}
          message={errorText}
        />
      )}
    </Content>
  );
};

const Content = styled.div`
  color: ${theme.colors.black};
  position: relative;
  height: auto;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  grid-row-gap: 1.25vw;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-row-gap: 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-row-gap: 6.67vw;
  }
`;

const EmptyContainer = styled.div`
  padding-bottom: 1.25vw;
  display: flex;
  flex-direction: column;
  grid-row-gap: 2vw;
  height: 100%;
  margin: auto 0;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding-bottom: 3.13vw;
    grid-row-gap: 3vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding-bottom: 4.27vw;
    grid-row-gap: 4vw;
  }
`;
