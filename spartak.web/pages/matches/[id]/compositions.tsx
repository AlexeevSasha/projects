import { GetStaticPaths, GetStaticProps } from "next";
import seodata from "../../../public/seo/seoData.json";
import { mvpVotingRepository } from "../../../src/api/MvpVotingRepository";
import { IMatchDto, LineUp, MatchEvent } from "../../../src/api/dto/IMatchDto";
import { matchRepository } from "../../../src/api/matchRepository";
import { formatDate } from "../../../src/assets/constants/date";
import { CompositionsList } from "../../../src/componentPages/pageMatchInfoCompositions/compositionsList";
import { MatchInfoLayout } from "../../../src/componentPages/pageMatches/matchInfoLayout";
import { VotingEntity } from "../../../src/componentPages/voting/interfaces/VotingT";
import { metaInterpolate } from "../../../src/helpers/metaInterpolate";
import { cmsRepository } from "../../../src/api/cmsRepository";

interface IProps {
  match?: IMatchDto;
  lineUp?: LineUp;
  events?: MatchEvent[];
  votings: VotingEntity[];
  banner: string;
}

export default function Compositions({ match, lineUp, events, votings }: IProps) {
  const reserveNames = { homeTeam: match?.HomeTeam?.Name, guestTeam: match?.GuestTeam?.Name };

  return <CompositionsList lineUp={lineUp} events={events} reserveNames={reserveNames} voting={votings?.[0]} />;
}

Compositions.getLayout = MatchInfoLayout;

const isDev = process.env.NODE_ENV !== "production";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  isDev && console.log("\r\n\r\n", "\x1b[34m", "start", "/matches/[id]/compositions", new Date());

  const [matchRes, lineUpRes, eventsRes] = await Promise.allSettled([
    matchRepository.fetchMatch({ matchId: `${params?.id}` }),
    matchRepository.fetchMatchLineups({ matchId: `${params?.id}` }),
    matchRepository.fetchMatchEvents({ matchId: `${params?.id}` }),
  ]);

  const match = matchRes.status === "fulfilled" ? matchRes.value : null;
  const lineUp = lineUpRes.status === "fulfilled" ? lineUpRes.value : null;
  const events: MatchEvent[] = eventsRes.status === "fulfilled" ? eventsRes.value : [];
  const votings = match?.Id ? await mvpVotingRepository.fetchVotings({ matchId: match?.Id }) : [];

  const metaTags = metaInterpolate(
    (seodata as Record<string, any>)["/matches/[id]/compositions"],
    match?.HomeTeam?.Name,
    match?.GuestTeam?.Name,
    {
      Ru: formatDate(match?.Date, "yyyy.MM.dd", "ru"),
      En: formatDate(match?.Date, "yyyy.MM.dd", "en"),
    }
  );

  isDev && console.log("\x1b[34m", "done", "/matches/[id]/compositions", new Date(), "\r\n");

  const response = (await cmsRepository.fetchCms({ Type: "matchInfo" })).value[0];
  const enterData = response?.JsonData ? JSON.parse(response.JsonData) : null;

  return {
    props: {
      match: match
        ? {
            ...match,
            GuestTeam: {
              ...match.GuestTeam,
              Events: events.filter(({ TeamId }) => TeamId === match?.GuestTeam?.Id),
            },
            HomeTeam: {
              ...match.HomeTeam,
              Events: events.filter(({ TeamId }) => TeamId === match?.HomeTeam?.Id),
            },
          }
        : null,
      lineUp,
      events,
      metaTags,
      votings,
      banner: enterData?.mainInfo.previewImg || null,
    },
    revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_MIN),
  };
};

export const getStaticPaths: GetStaticPaths = async () => ({ paths: [], fallback: true });
