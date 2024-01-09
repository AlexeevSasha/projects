import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { lang } from "../../../public/locales/lang";
import seodata from "../../../public/seo/seoData.json";
import { abonementRepository } from "../../../src/api/abonementRepository";
import { IAbomenent } from "../../../src/api/dto/IAbonement";
import { AbonementsList } from "../../../src/componentPages/pageTickets/abonementsList";
import { FanIdBanner } from "../../../src/componentPages/pageTickets/fanIdBanner";
import { getTicketsLayout, LayoutsProps } from "../../../src/componentPages/pageTickets/ticketsLayout";
import { SwiperWithBigActiveElem } from "../../../src/components/reactSwiper/swiperWithBigActiveElem";
import { Spacer } from "../../../src/components/spacer";
import { getDataByTeamId, getInitialData } from "../../../src/core/getInitialData";

interface IProps extends LayoutsProps {
  abonements: IAbomenent[];
}

export default function AbonementsPage({ abonements }: IProps) {
  const { locale = "ru", query, replace } = useRouter();
  const needReplace = query.team || query.tournamentId || query.seasonId;

  useEffect(() => {
    needReplace && replace({ query: {} }, undefined, { shallow: true });
  }, []);

  return (
    <>
      <AbonementsList abonements={abonements} />

      <FanIdBanner />

      <SwiperWithBigActiveElem title={lang[locale].shop.otherOffers} />

      <Spacer height={["6.25vw"]} />
    </>
  );
}

AbonementsPage.getLayout = getTicketsLayout;

const isDev = process.env.NODE_ENV !== "production";

export const getServerSideProps: GetServerSideProps = async ({ query, res }) => {
  // Нужно чтобы убрать бесконечную загрузку при нажатии кнопки "назад" в браузере
  res.setHeader("Cache-Control", "no-store, max-age=0, must-revalidate");
  isDev && console.log("\r\n\r\n", "\x1b[34m", "start", "/tickets/abonements", new Date());

  const { teams = [] } = await getInitialData({
    pathname: "/tickets/abonements",
  });

  // Если в query параметрах не указан id, то получает первую команду как активную
  const teamId = query.team?.toString() || teams[0]?.Id || null;

  const showTabs = !query.team || query.team === teams[0]?.Id;
  if (!showTabs) return { redirect: { destination: `/tickets/matches?team=${teamId}`, statusCode: 303 } };

  if (!teamId) return { props: {} };
  (res?.req as { cookies?: { isDarkTheme?: string } })?.cookies?.isDarkTheme;
  const { blockOfMatches = {} } = await getDataByTeamId({ teamId });

  const abonements =
    (await abonementRepository.fetchAllAbonements(
      [],
      (res?.req as { cookies?: { access_token?: string } })?.cookies?.access_token || query.access_token?.toString()
    )) || [];

  isDev && console.log("\x1b[34m", "done", "/tickets/abonements", new Date(), "\r\n");

  return {
    props: {
      blockOfMatches,
      teamId,
      abonements,
      metaTags: (seodata as Record<string, any>)["/tickets/abonements"] || null,
    },
  };
};
