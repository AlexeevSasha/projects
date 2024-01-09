import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { lang } from "../../public/locales/lang";
import seodata from "../../public/seo/seoData.json";
import { IEventTickets } from "../../src/api/dto/ITickets";
import { matchRepository } from "../../src/api/matchRepository";
import { promocodeRepository } from "../../src/api/promocodeRepository";
import { getCookie } from "../../src/assets/constants/getCookie";
import { CheckCircleIcon } from "../../src/assets/icon/checkCircle";
import { theme } from "../../src/assets/theme/theme";
import { EmptyScreenMatches } from "../../src/componentPages/pageMatches/emptyScreenMatches/emptyScreenMatches";
import { TicketForMatchOrCalendar } from "../../src/componentPages/pageMatches/matchTableInfo/rowTicketForMatchOrCalendar";
import { FanIdBanner } from "../../src/componentPages/pageTickets/fanIdBanner";
import { PromoBanner } from "../../src/componentPages/pageTickets/promoBanner";
import { getTicketsLayout } from "../../src/componentPages/pageTickets/ticketsLayout";
import { Alert } from "../../src/components/alert";
import { ContainerContent } from "../../src/components/containers/containerContent";
import { MessageModal } from "../../src/components/modal/messageModal";
import { SwiperWithBigActiveElem } from "../../src/components/reactSwiper/swiperWithBigActiveElem";
import { Spacer } from "../../src/components/spacer";
import { DataContext } from "../../src/core/dataProvider";
import { getDataByTeamId, getInitialData } from "../../src/core/getInitialData";
import { ThemeContext } from "../../src/core/themeProvider";

interface IProps {
  teamId?: string;
  promo?: string | null;
  tickets: IEventTickets[] | [];
}

export default function MatchesPage({ teamId, promo, tickets }: IProps) {
  const { locale = "ru", query, replace } = useRouter();
  const { setLoading } = useContext(DataContext);
  const [textModal, setTextModal] = useState<string | undefined>();
  const [alertText, setAlertText] = useState<string | undefined>();
  const promoRef = useRef(promo);
  const ticketsRef = useRef<IEventTickets[]>(tickets);
  const { isDarkTheme } = useContext(ThemeContext);

  const showAlert = (message: string) => {
    setAlertText(message);
    setTimeout(() => setAlertText(undefined), 5000);
  };

  const handleError = (error?: number) => error && setTextModal(lang[locale].tickets.promoCode.error[`${error}`]);

  const getCalendar = async (getPromo?: boolean) => {
    if (!promoRef.current && getPromo) {
      const res = await promocodeRepository.fetchGetPromo();
      if (res.error !== 0) {
        handleError(res.error);
      }
      promoRef.current = res.promoCode;
    }

    const data = await matchRepository.getTicketsList(
      { teamId, promoCode: promoRef.current },
      getCookie("access_token") || query.access_token?.toString()
    );

    const parking = data.filter((elem) => elem.TicketEventType === "Parking");
    // @ts-ignore:next-line
    ticketsRef.current = data
      .filter((elem) => elem.TicketEventType !== "Parking") // Оставляем все события(билеты на матч/концерты) кроме парковок
      // Привязываем парковки к событиям
      .map((elem) => ({
        ...elem,
        Parking: parking.filter((parkingElem) => parkingElem.EventStart === elem.EventStart),
      }));

    setLoading(false);
  };

  // Привязка промокода
  const sendPromo = async (value: string) => {
    setLoading(true);

    const { error } = await promocodeRepository.fetchAddPromo(value);
    if (error !== 0) {
      handleError(error);
      setLoading(false);
      return;
    }

    await getCalendar(true);

    showAlert(lang[locale].tickets.promoCodeApplied);
  };

  //Отвязка промокода
  const deletePromo = async () => {
    setLoading(true);

    await promocodeRepository.fetchPromoDismiss();
    promoRef.current = undefined;
    getCalendar();
  };

  useEffect(() => {
    if (!query.team /*|| !query.tournamentId) && tournament?.Tournament.Id*/)
      replace(
        {
          query: { team: teamId /*, tournamentId: tournament.Tournament.Id*/ },
        },
        undefined,
        { shallow: true }
      );
  }, [query]);

  useEffect(() => {
    ticketsRef.current = tickets;
  }, [tickets]);

  return (
    <>
      <PromoBanner promo={promoRef.current} sendPromo={sendPromo} deletePromo={deletePromo} />
      {ticketsRef.current?.length ? (
        <CustomContainer>
          {ticketsRef.current.map((elem) => (
            <TicketForMatchOrCalendar key={elem.Id} teamId={teamId} tickets={elem} />
          ))}
        </CustomContainer>
      ) : (
        <EmptyScreenMatches
          text={lang[locale].tickets.ticketsBeLater}
          title={lang[locale].tickets.noTickets}
          srcImg={`/images/tickets/tickets${isDarkTheme ? "Black" : "White"}.svg`}
        />
      )}

      <FanIdBanner />
      <SwiperWithBigActiveElem title={lang[locale].shop.otherOffers} />
      <Spacer height={["2.40vw", "10.43vw", "10.67vw"]} />
      <SuccessAlert type="success" message={alertText || ""} open={!!alertText} icon={<CheckCircleIcon />} />
      {textModal && <MessageModal type="alert" message={textModal} onClose={() => setTextModal(undefined)} />}
    </>
  );
}

MatchesPage.getLayout = getTicketsLayout;

const isDev = process.env.NODE_ENV !== "production";

export const getServerSideProps: GetServerSideProps = async ({ query, req, res }) => {
  // Нужно чтобы убрать бесконечную загрузку при нажатии кнопки "назад" в браузере
  res.setHeader("Cache-Control", "no-store, max-age=0, must-revalidate");
  isDev && console.log("\r\n\r\n", "\x1b[34m", "start", "/tickets/matches", new Date());

  let promo = null;

  const { teams = [] } = await getInitialData();
  const teamId = query.team?.toString() || teams[0]?.Id || null;
  if (!teamId) return { props: {} };

  const { blockOfMatches = {} } = await getDataByTeamId({ teamId });

  const access_token = getCookie("access_token", req.headers.cookie);
  if (access_token) {
    const res = await promocodeRepository.fetchGetPromo(access_token);
    if (res.error === 0) {
      promo = res.promoCode;
    }
  }
  // mockCalendar;
  const data = await matchRepository.getTicketsList(
    { teamId, promoCode: promo },
    (res?.req as { cookies?: { access_token?: string } })?.cookies?.access_token || query.access_token?.toString()
  );
  const parking = data.filter((elem) => elem.TicketEventType === "Parking");
  const tickets = data
    .filter((elem) => elem.TicketEventType !== "Parking") // Оставляем все события(билеты на матч/концерты) кроме парковок
    .map((elem) => ({ ...elem, Parking: parking.filter((parkingElem) => parkingElem.EventStart === elem.EventStart) })); // Привязываем парковки к событиям

  isDev && console.log("\x1b[34m", "done", "/tickets/matches", new Date(), "\r\n");

  return {
    props: {
      teamId,
      tickets: tickets || [],
      blockOfMatches,
      promo,
      metaTags: (seodata as Record<string, any>)["/tickets/matches"] || null,
    },
  };
};

const SuccessAlert = styled(Alert)<{ open?: boolean }>`
  position: fixed;
  right: 0.83vw;
  z-index: 999;
  min-width: 18.54vw;
  top: ${({ open }) => (open ? "8vw" : "-5vw")};
  background: linear-gradient(0deg, #05c84a33, #05c84a33), ${theme.colors.white};
  color: ${theme.colors.black};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    right: 3.13vw;
    min-width: 46.41vw;
    top: ${({ open }) => (open ? "16vw" : "-10vw")};
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    right: 3vw;
    min-width: 91.46vw;
    top: ${({ open }) => (open ? "22vw" : "-15vw")};
  }
`;

const CustomContainer = styled(ContainerContent)`
  margin-bottom: 4.43vw;
  flex-direction: column;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-bottom: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-bottom: 6.4vw;
  }
`;

// const mockCalendar = [
//   {
//     Id: "480d9244-b65d-4fd9-9332-bf2d12bb5793",
//     FullName: {
//       Ru: "ФК СПРАТАК - ФК ОРЕНБУРГ",
//       En: "",
//     },
//     ShortName: {
//       Ru: "ФК ОРЕНБУРГ",
//       En: "",
//     },
//     TotalTickets: 12840,
//     EventStart: "2023-07-09T16:00:00Z",
//     EventId: 17166,
//     GroupLimits: [],
//     Match: {
//       Date: "2023-07-09T16:00:00Z",
//       GuestTeam: {
//         Id: "03eac22b-ffbf-4e14-ad85-0c3bbbc03795",
//         Logo: "spartak-youth_moscow.jpeg",
//         Name: {
//           Ru: "Спартак (Мол)",
//           En: "Spartak (youth)",
//         },
//       },
//       HomeTeam: {
//         Id: "1a98ecad-fbe0-462d-98fe-99020d7663d3",
//         Logo: "https://storage.yandexcloud.net/spmedia/apptemplate/directories/1b2078da-496d-4a37-83f1-e9ff40fd8351.png",
//         Name: {
//           Ru: "Спартак ",
//           En: "Spartak",
//         },
//       },
//       Id: "480d9244-b65d-4fd9-9332-bf2d12bb5793",
//       EventId: 17166,
//       WinlineId: null,
//       Scores: {
//         Guest: 0,
//         Home: 0,
//       },
//       PenaltyShootoutScores: null,
//       HalfScores: null,
//       StadiumId: "509356f4-79ec-418e-8552-5a6214cc3743",
//       Stadium: {
//         Ru: "Спортивный городок Лужники",
//         En: "Sportivnyj gorodok Luzhniki",
//       },
//       Tournament: {
//         Ru: "Лига ветеранов",
//         En: "Veterans League",
//       },
//       IsLive: false,
//       Round: null,
//       Coefficient: null,
//       CurrentStage: null,
//       HasTickets: null,
//       Judge: null,
//       ViewersCount: null,
//       Staff: null,
//       ButtonEnum: "Buy",
//     },
//     TicketEventType: "Match",
//   },
//   {
//     Id: "a371e8db-aa1a-470f-be27-3aef728d8578",
//     FullName: { Ru: "PARKING ФК СПАРТАК - ФК ДИНАМО", En: null },
//     ShortName: { Ru: "PARKING ФК СПАРТАК - ФК ДИНАМО", En: null },
//     TotalTickets: 346,
//     EventStart: "2023-07-09T16:00:00Z",
//     EventId: 14527,
//     GroupLimits: [],
//     Match: null,
//     TicketEventType: "Parking",
//   },
//   {
//     Id: "480d9244-b65d-4fd9-9332-bf2d12bb5793",
//     FullName: {
//       Ru: "ФК СПРАТАК - ФК ОРЕНБУРГ",
//       En: "",
//     },
//     ShortName: {
//       Ru: "ФК ОРЕНБУРГ",
//       En: "",
//     },
//     TotalTickets: 12840,
//     EventStart: "2023-07-09T21:00:00Z",
//     EventId: 17166,
//     GroupLimits: [],
//     TicketEventType: "Event",
//   },
//   {
//     Id: "a371e8db-aa1a-470f-be27-3aef728d8578",
//     FullName: { Ru: "PARKING ФК СПАРТАК - ФК ДИНАМО", En: null },
//     ShortName: { Ru: "PARKING ФК СПАРТАК - ФК ДИНАМО", En: null },
//     TotalTickets: 346,
//     EventStart: "2023-07-09T21:00:00Z",
//     EventId: 14527,
//     GroupLimits: [],
//     Match: null,
//     TicketEventType: "Parking",
//   },
// ];
