import { GetServerSideProps } from "next";
import React, { useContext } from "react";
import { IMatchDto } from "../../src/api/dto/IMatchDto";
import type { ITournamentAndSeasons } from "../../src/api/dto/ITournamentAndSeasons";
import { ISeason } from "../../src/api/dto/ITournamentAndSeasons";
import type { ITournamentTable } from "../../src/api/dto/ITournamentTable";
import { matchRepository } from "../../src/api/matchRepository";
import { MatchesLayout } from "../../src/componentPages/pageMatches/matchesLayout";
import { EmptyMatchStandings } from "../../src/componentPages/pageMatches/matchStandings/emptyMatchStandings";
import { MatchStandings } from "../../src/componentPages/pageMatches/matchStandings/matchStandings";
import { StandingPlayOff } from "../../src/componentPages/pageMatches/standingPlayOff/standingPlayOff";
import { DataContext } from "../../src/core/dataProvider";
import { getDataByTeamId, getInitialData } from "../../src/core/getInitialData";
import { cmsRepository } from "../../src/api/cmsRepository";

interface IProps {
  teamId?: string;
  tournament?: ITournamentAndSeasons;
  tournamentTable?: ITournamentTable[];
  matchList?: IMatchDto[];
  bannerSpartak: string;
  bannerSpartakYouth: string;
}

export default function Standings(props: IProps) {
  const { data: { teams = [] } = {} } = useContext(DataContext);

  return (
    <>
      {props.matchList ? (
        <StandingPlayOff matchList={props.matchList} teamId={props.teamId} />
      ) : props.tournamentTable?.length ? (
        <MatchStandings
          tournamentTable={props.tournamentTable}
          teamId={teams.find((elem) => elem.Id === props.teamId)?.InStatId?.toString()}
        />
      ) : (
        <EmptyMatchStandings />
      )}
    </>
  );
}

Standings.getLayout = MatchesLayout;

const isDev = process.env.NODE_ENV !== "production";

export const getServerSideProps: GetServerSideProps = async ({ query, res }) => {
  res.setHeader(
    "Cache-Control",
    `public, s-maxage=${process.env.NEXT_PUBLIC_REVALIDATE_MIN}, stale-while-revalidate=59`
  );

  isDev && console.log("\r\n\r\n", "\x1b[34m", "start", "/matches/standings", new Date());

  const { teams = [], metaTags } = await getInitialData({ pathname: "/matches/standings" });

  // Если в query параметрах не указан id, то получает первую команду как активную
  const teamId = query.team?.toString() || teams[0]?.Id || null;

  if (!teamId) return { props: {} };

  let { tournamentsAndSeasons = [] } = await getDataByTeamId({ teamId });
  tournamentsAndSeasons = tournamentsAndSeasons.filter(
    (elem: ITournamentAndSeasons) => elem.Tournament.ShowTournamentTable
  );

  const { blockOfMatches = {} } = await getDataByTeamId({ teamId });

  // Если в query параметрах не указан tournamentId, то получает первый турнир как активный
  const tournament =
    tournamentsAndSeasons.find((elem: ITournamentAndSeasons) => elem.Tournament.Id === query.tournamentId) ||
    tournamentsAndSeasons[0] ||
    null;

  // Если в query параметрах не указан seasonId, то получает первый сезон как активный
  const season =
    tournament?.Seasons.find((elem: ISeason) => elem.Id === query.seasonId) || tournament?.Seasons[0] || null;

  //получение календаря после получения комманд, турнира и сезонов
  const matchList = season
    ? await matchRepository
      .fetchCalendar({
        teamId,
        tournamentId: tournament?.Tournament.Id,
        seasonId: season?.Id,
        matchListType: "All",
        Status: "Published",
      })
      .then((res) => res.filter((elem) => elem.Round))
      .catch(() => null)
    : null;

  // Если хотя бы один матч проходит в раунде "Плейоф", то нужно отображать список матчей и раунд
  const isPlayOff = matchList?.find((elem) => elem.Round?.IsPlayOff);

  const tournamentTable: ITournamentTable[] =
    !isPlayOff && season
      ? await matchRepository
        .fetchTournamentTable({ tournamentId: tournament.Tournament.Id, seasonId: season.Id, teamId })
        .catch(() => [])
      : [];

  isDev && console.log("\x1b[34m", "done", "/matches/standings", new Date(), "\r\n");

  const response = (await cmsRepository.fetchCms({ Type: "matches" })).value[0];
  const enterData = response?.JsonData ? JSON.parse(response.JsonData) : null;

  return {
    props: {
      teamId,
      tournamentsAndSeasons,
      blockOfMatches,
      tournamentTable,
      season,
      tournament,
      matchList: isPlayOff ? matchList : null,
      metaTags,
      bannerSpartak: enterData?.mainInfo.previewImgSpartak || null,
      bannerSpartakYouth: enterData?.mainInfo.previewImgSpartakYouth || null,
    },
  };
};
