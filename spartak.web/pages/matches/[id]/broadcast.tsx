import { GetStaticPaths, GetStaticProps } from "next";
import seodata from "../../../public/seo/seoData.json";
import { mvpVotingRepository } from "../../../src/api/MvpVotingRepository";
import { IMatchDto, MatchEvent } from "../../../src/api/dto/IMatchDto";
import { matchRepository } from "../../../src/api/matchRepository";
import { formatDate } from "../../../src/assets/constants/date";
import { MatchInfoListBroadcast } from "../../../src/componentPages/pageMatchInfoBroadcast/matchInfoListBroadcast";
import { MatchInfoLayout } from "../../../src/componentPages/pageMatches/matchInfoLayout";
import { VotingEntity } from "../../../src/componentPages/voting/interfaces/VotingT";
import { metaInterpolate } from "../../../src/helpers/metaInterpolate";
import { cmsRepository } from "../../../src/api/cmsRepository";

interface IProps {
  match?: IMatchDto;
  events?: MatchEvent[];
  votings: VotingEntity[];
  banner: string;
}

export default function BroadCast({ events, votings }: IProps) {
  return <MatchInfoListBroadcast events={events} voting={votings?.[0]} />;
}

BroadCast.getLayout = MatchInfoLayout;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const [matchRes, eventsRes] = await Promise.allSettled([
    matchRepository.fetchMatch({ matchId: `${params?.id}` }),
    matchRepository.fetchMatchEvents({ matchId: `${params?.id}` }),
  ]);

  const match = matchRes.status === "fulfilled" ? matchRes.value : null;
  const events = eventsRes.status === "fulfilled" ? eventsRes.value : [];
  const votings = match?.Id ? await mvpVotingRepository.fetchVotings({ matchId: match?.Id }) : [];

  const metaTags = metaInterpolate(
    (seodata as Record<string, any>)["/matches/[id]/broadcast"],
    match?.HomeTeam?.Name,
    match?.GuestTeam?.Name,
    {
      Ru: formatDate(match?.Date, "yyyy.MM.dd", "ru"),
      En: formatDate(match?.Date, "yyyy.MM.dd", "en"),
    }
  );

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
      events,
      metaTags,
      votings,
      banner: enterData?.mainInfo.previewImg || null,
    },
    revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_MIN),
  };
};

export const getStaticPaths: GetStaticPaths = async () => ({ paths: [], fallback: true });
