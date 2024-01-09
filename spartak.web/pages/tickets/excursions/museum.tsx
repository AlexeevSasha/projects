import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import styled from "styled-components";
import { lang } from "../../../public/locales/lang";
import type { ISeason, ITournamentAndSeasons } from "../../../src/api/dto/ITournamentAndSeasons";
import { matchRepository } from "../../../src/api/matchRepository";
import { theme } from "../../../src/assets/theme/theme";
import { InfoBannerTour } from "../../../src/componentPages/pageTour/InfoBannerTour";
import { StandartTours } from "../../../src/componentPages/pageTour/standartTours";
import { ToursList } from "../../../src/componentPages/pageTour/toursList";
import { GetLayout } from "../../../src/components/layout/getLayout";
import MainBannerWithTitle from "../../../src/components/mainBannerWithTitle/MainBannerWithTitle";
import { SendFormProposal } from "../../../src/components/sendFormProposal/sendFormPropposal";
import { getDataByTeamId, getInitialData } from "../../../src/core/getInitialData";

export default function ExcursionsMuseum() {
  const { query, replace, locale = "ru" } = useRouter();

  useEffect(() => {
    Object.keys(query).length && replace({ query: {} });
  }, []);

  return (
    <>
      <MainBanner title={lang[locale].tickets.excursionTours} banner={"/images/tickets/museumTours_v1.0.0.png"} />
      <Content>
        <InfoBannerTour />
        <StandartTours />
        <ToursList />
      </Content>
      <ManagerBlock>
        <SendFormProposal
          description={lang[locale].form.contactManager}
          title={lang[locale].form.getAConsultation}
          image={"/images/tickets/toursList/tourFormProposal_v1.0.0.png"}
        />
      </ManagerBlock>
    </>
  );
}

ExcursionsMuseum.getLayout = GetLayout;

const isDev = process.env.NODE_ENV !== "production";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  isDev && console.log("\r\n\r\n", "\x1b[34m", "start", "ExcursionsPage", new Date());

  const { teams = [] } = await getInitialData();

  // Если в query параметрах не указан id, то получает первую команду как активную
  const teamId = String(query.team) || teams[0]?.Id;

  if (!teamId) return { props: {} };

  const { tournamentsAndSeasons = [], blockOfMatches = {} } = await getDataByTeamId({ teamId });

  // Если в query параметрах не указан tournamentId, то получает первый турнир как активный
  const tournament =
    tournamentsAndSeasons.status === "fulfilled"
      ? tournamentsAndSeasons.value.find(
          (elem: ITournamentAndSeasons) => elem?.Tournament?.Id === query.tournamentId
        ) || tournamentsAndSeasons.value[0]
      : null;

  // Если в query параметрах не указан seasonId, то получает первый сезон как активный
  const season =
    (tournament && tournament?.Seasons?.find((elem: ISeason) => elem.Id === query.seasonId)) ||
    tournament?.Seasons?.[0];

  //получение календаря после получения комманд, турнира и сезонов
  const matchCalendar =
    (tournament && season) || (query.tournamentId && query.seasonId)
      ? await matchRepository
          .fetchCalendar({
            teamId,
            tournamentId: query.tournamentId?.toString() || tournament?.Tournament?.Id,
            seasonId: query.seasonId?.toString() || season?.Id,
            type: "Future",
          })
          .then((res) => res)
          .catch(() => null)
      : [];

  isDev && console.log("\x1b[34m", "done", "ExcursionsPage", new Date(), "\r\n");

  return {
    props: {
      tournamentsAndSeasons: tournamentsAndSeasons.status === "fulfilled" ? tournamentsAndSeasons?.value || [] : [],
      blockOfMatches: blockOfMatches.status === "fulfilled" ? blockOfMatches?.value || {} : [],
      matchCalendar,
      teamId: teamId || null,
      season: season || null,
      tournament: tournament || null,
    },
  };
};

const MainBanner = styled(MainBannerWithTitle)`
  & h1 {
    width: 75vw;
    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      width: fit-content;
    }
  }
`;

const Content = styled.div`
  width: 82.5vw;
  margin: 0 auto;
  padding-bottom: 1.21vw;
  font-family: "FCSM Text", sans-serif;
  font-weight: 500;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 93.87vw;
    padding-bottom: 10.43vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 91.47vw;
    padding-bottom: 21.33vw;
  }
`;

const ManagerBlock = styled.div`
  display: flex;
`;
