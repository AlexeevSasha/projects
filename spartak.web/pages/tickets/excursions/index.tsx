import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { lang } from "../../../public/locales/lang";
import { excursionRepository } from "../../../src/api/excursionRepository";
import { Excursions } from "../../../src/componentPages/pageTickets/excursions";
// import { QrCodeBanner } from "../../../src/componentPages/pageTickets/qrCodeBanner";
import { getTicketsLayout } from "../../../src/componentPages/pageTickets/ticketsLayout";
import { SwiperWithBigActiveElem } from "../../../src/components/reactSwiper/swiperWithBigActiveElem";
import { Spacer } from "../../../src/components/spacer";
import { getDataByTeamId, getInitialData } from "../../../src/core/getInitialData";
import seodata from "../../../public/seo/seoData.json";
import { LoadingScreen } from "../../../src/ui/LoadingScreen ";
import { IExcursion } from "../../../src/api/dto/IEscursionTour";

interface IProps {
  toursList: IExcursion[];
}

export default function ExcursionsPage({ toursList }: IProps) {
  const { locale = "ru", query, replace } = useRouter();
  const needReplace = query.team || query.tournamentId || query.seasonId;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    needReplace && replace({ query: {} }, undefined, { shallow: true });
  }, []);

  return (
    <>
      {loading && <LoadingScreen />}
      <Excursions excursions={toursList} setLoading={setLoading} />

      {/* <QrCodeBanner /> */}

      <SwiperWithBigActiveElem title={lang[locale].shop.otherOffers} />

      <Spacer height={["6.25vw"]} />
    </>
  );
}

ExcursionsPage.getLayout = getTicketsLayout;

const isDev = process.env.NODE_ENV !== "production";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  isDev && console.log("\r\n\r\n", "\x1b[34m", "start", "/tickets/excursions", new Date());

  const { teams = [] } = await getInitialData({ pathname: "/tickets/excursions" });
  // Если в query параметрах не указан id, то получает первую команду как активную
  const teamId = query.team?.toString() || teams[0]?.Id || null;

  const showTabs = !query.team || query.team === teams[0]?.Id;
  if (!showTabs) return { redirect: { destination: `/tickets/matches?team=${teamId}`, statusCode: 303 } };

  const filterData = await excursionRepository.getExcursionFilterData();
  const date =
    query.date && typeof query.date === "string" && query.date.split("-").length > 2
      ? query.date.split("-")
      : undefined;

  const toursList = await excursionRepository
    .getExcursionsList({
      TypeId: query.type === "allEvents" ? undefined : query.type,
      ...(date && {
        ExcursionDate: new Date(+date[0], +date[1] - 1, +date[2], +3).toISOString(),
        ExcursionDateLt: new Date(+date[0], +date[1] - 1, +date[2] + 1, +3).toISOString(),
      }),
    })
    .then((res) => res.value)
    .catch(() => null);

  if (!teamId) return { props: {} };

  const { blockOfMatches = {} } = await getDataByTeamId({ teamId });

  isDev && console.log("\x1b[34m", "done", "/tickets/excursions", new Date(), "\r\n");

  return {
    props: {
      blockOfMatches,
      filterData,
      toursList,
      metaTags: (seodata as Record<string, any>)["/tickets/excursions"] || null,
    },
  };
};
