import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { lang } from "../../public/locales/lang";
import { VotingType, mvpVotingRepository } from "../../src/api/MvpVotingRepository";
import { cmsRepository } from "../../src/api/cmsRepository";
import type { IMatchDto } from "../../src/api/dto/IMatchDto";
import type { ISeason, ITournamentAndSeasons } from "../../src/api/dto/ITournamentAndSeasons";
import { matchRepository } from "../../src/api/matchRepository";
import Ball from "../../src/assets/images/ball.png";
import { MatchSlider } from "../../src/componentPages/pageMatches/matchSlider/matchSlider";
import { MatchesLayout } from "../../src/componentPages/pageMatches/matchesLayout";
import { EmptyTableMatches } from "../../src/componentPages/pageMatches/tableMatches/emptyTableMatches";
import { TableMatches } from "../../src/componentPages/pageMatches/tableMatches/tableMatches";
import { VotingEntity } from "../../src/componentPages/voting/interfaces/VotingT";
import { getDataByTeamId, getInitialData } from "../../src/core/getInitialData";

interface IProps {
  matchCalendar?: IMatchDto[];
  teamId?: string;
  votings?: VotingEntity[];
  bannerSpartak: string;
  bannerSpartakYouth: string;
}

export default function Forthcoming({ matchCalendar, teamId, votings }: IProps) {
  const { locale = "ru" } = useRouter();

  return (
    <>
      {matchCalendar?.length ? (
        <>
          <MatchSlider typeMatch="old" matchCalendar={matchCalendar} />

          <TableMatches typeMatch="old" matchCalendar={matchCalendar} teamId={teamId} votings={votings} />
        </>
      ) : (
        <EmptyTableMatches
          title={lang[locale].profile.matches.emptyTitle}
          text={lang[locale].profile.matches.noPastMatches}
          imgSrc={Ball.src}
        />
      )}
    </>
  );
}

Forthcoming.getLayout = MatchesLayout;

const isDev = process.env.NODE_ENV !== "production";

export const getServerSideProps: GetServerSideProps = async ({ query, res }) => {
  res.setHeader(
    "Cache-Control",
    `public, s-maxage=${process.env.NEXT_PUBLIC_REVALIDATE_MIN}, stale-while-revalidate=59`
  );

  isDev && console.log("\r\n\r\n", "\x1b[34m", "start", "/matches/past", new Date());

  const { teams = [], metaTags } = await getInitialData({ pathname: "/matches/past" });

  // Если в query параметрах не указан id, то получает первую команду как активную
  const teamId = query.team?.toString() || teams[0]?.Id || null;

  if (!teamId) return { props: {} };

  const { tournamentsAndSeasons = [], blockOfMatches = {} } = await getDataByTeamId({ teamId });

  const votings = await mvpVotingRepository.fetchVotings({ mvpVotingType: VotingType.month });

  // Если в query параметрах не указан tournamentId, то получает первый турнир как активный
  const tournament =
    tournamentsAndSeasons.find((elem: ITournamentAndSeasons) => elem.Tournament.Id === query.tournamentId) ||
    tournamentsAndSeasons[0] ||
    null;

  // Если в query параметрах не указан seasonId, то получает первый сезон как активный
  const season =
    tournament?.Seasons.find((elem: ISeason) => elem.Id === query.seasonId) || tournament?.Seasons[0] || null;

  //получение календаря после получения комманд, турнира и сезонов
  const matchCalendar = season
    ? await matchRepository
        .fetchCalendar({
          teamId,
          tournamentId: tournament?.Tournament.Id,
          seasonId: season?.Id,
          matchListType: "Past",
          Status: "Published",
        })
        .then((res) =>
          res.sort((current, next) => new Date(current.Date).getTime() - new Date(next.Date).getTime()).reverse()
        )
        .catch(() => null)
    : null;

  isDev && console.log("\x1b[34m", "done", "/matches/past", new Date(), "\r\n");

  const response = (await cmsRepository.fetchCms({ Type: "matches" })).value[0];
  const enterData = response?.JsonData ? JSON.parse(response.JsonData) : null;

  return {
    props: {
      teamId,
      tournamentsAndSeasons,
      blockOfMatches,
      matchCalendar,
      season,
      tournament,
      metaTags,
      votings,
      bannerSpartak: enterData?.mainInfo.previewImgSpartak || null,
      bannerSpartakYouth: enterData?.mainInfo.previewImgSpartakYouth || null,
    },
  };
};
