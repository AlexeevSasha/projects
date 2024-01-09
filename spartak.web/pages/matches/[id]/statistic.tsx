import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { lang } from "../../../public/locales/lang";
import seodata from "../../../public/seo/seoData.json";
import { IMatchDto, MatchEvent } from "../../../src/api/dto/IMatchDto";
import type { IStatistic } from "../../../src/api/dto/IStatistic";
import { matchRepository } from "../../../src/api/matchRepository";
import { formatDate } from "../../../src/assets/constants/date";
import { EmptyScreenMatches } from "../../../src/componentPages/pageMatches/emptyScreenMatches/emptyScreenMatches";
import { MatchInfoLayout } from "../../../src/componentPages/pageMatches/matchInfoLayout";
import { MatchStatistic } from "../../../src/componentPages/pageMathInfoStatistic/matchStatistic";
import { ThemeContext } from "../../../src/core/themeProvider";
import { metaInterpolate } from "../../../src/helpers/metaInterpolate";
import { cmsRepository } from "../../../src/api/cmsRepository";

interface IProps {
  statistic: IStatistic;
  match?: IMatchDto;
  events?: MatchEvent[];
  banner: string;
}

export default function Statistic(props: IProps) {
  const { locale = "ru" } = useRouter();
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <>
      {props.statistic && Object.keys(props.statistic).length > 0 ? (
        <MatchStatistic statistic={props.statistic} />
      ) : (
        <EmptyScreenMatches
          text={lang[locale].profile.matches.staticticsLater}
          title={lang[locale].profile.matches.noStatistics}
          srcImg={`/images/emptyScreen/matches/ChartBar${isDarkTheme ? "White" : "Black"}_v1.0.0.png`}
        />
      )}
    </>
  );
}

Statistic.getLayout = MatchInfoLayout;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const [matchRes, eventsRes, statisticRes] = await Promise.allSettled([
    matchRepository.fetchMatch({ matchId: `${params?.id}` }),
    matchRepository.fetchMatchEvents({ matchId: `${params?.id}` }),
    matchRepository.fetchMatchStatistic({ matchId: `${params?.id}` }),
  ]);

  const match = matchRes.status === "fulfilled" ? matchRes.value : null;
  const events: MatchEvent[] = eventsRes.status === "fulfilled" ? eventsRes.value : [];

  const metaTags = metaInterpolate(
    (seodata as Record<string, any>)["/matches/[id]/statistic"],
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
      statistic: statisticRes.status === "fulfilled" ? statisticRes.value : null,
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
      banner: enterData?.mainInfo.previewImg || null,
    },
    revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_MIN),
  };
};

export const getStaticPaths: GetStaticPaths = async () => ({ paths: [], fallback: true });
