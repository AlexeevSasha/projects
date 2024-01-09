import { GetStaticPaths, GetStaticProps } from "next";
import seodata from "../../../public/seo/seoData.json";
import { IMatchDto, MatchEvent } from "../../../src/api/dto/IMatchDto";
import { IMediaShort, listFieldMediaShort } from "../../../src/api/dto/IMedia";
import { matchRepository } from "../../../src/api/matchRepository";
import { mediaRepository } from "../../../src/api/mediaRepository";
import { formatDate } from "../../../src/assets/constants/date";
import { MatchInfoLayout } from "../../../src/componentPages/pageMatches/matchInfoLayout";
import { MediaNewsList } from "../../../src/componentPages/pageMediaNews/mediaNewsList/mediaNewsList";
import { metaInterpolate } from "../../../src/helpers/metaInterpolate";
import { cmsRepository } from "../../../src/api/cmsRepository";

interface IProps {
  match?: IMatchDto;
  news?: IMediaShort[];
  events?: MatchEvent[];
  banner: string;
}

export default function MatchNews(props: IProps) {
  return <MediaNewsList newsList={props.news} />;
}
MatchNews.getLayout = MatchInfoLayout;

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const [matchRes, eventsRes] = await Promise.allSettled([
    matchRepository.fetchMatch({ matchId: `${params?.id}` }),
    matchRepository.fetchMatchEvents({ matchId: `${params?.id}` }),
  ]);

  const match = matchRes.status === "fulfilled" ? matchRes.value : null;
  const events: MatchEvent[] = eventsRes.status === "fulfilled" ? eventsRes.value : [];

  const newsRes = await mediaRepository.fetchMedia(
    {
      MediaType: "News",
      MatchId: `${params?.id}`,
      IsDraft: "false",
      MediaStatus: "Published",
      sorting: "PublishDateTime desc",
      MediaHeader: locale,
      Section: "Site",
    },
    listFieldMediaShort
  );

  const metaTags = metaInterpolate(
    (seodata as Record<string, any>)["/matches/[id]/news"],
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
      news: newsRes?.value,
      match: match
        ? {
            ...match,
            GuestTeam: { ...match.GuestTeam, Events: events.filter(({ TeamId }) => TeamId === match?.GuestTeam?.Id) },
            HomeTeam: { ...match.HomeTeam, Events: events.filter(({ TeamId }) => TeamId === match?.HomeTeam?.Id) },
          }
        : null,
      events,
      metaTags,
      banner: enterData?.mainInfo.previewImg || null,
    },
    revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_MIN),
  };
};

export const getStaticPaths: GetStaticPaths = async () => ({ paths: [], fallback: true });
