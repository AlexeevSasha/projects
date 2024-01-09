import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import seodata from "../../../public/seo/seoData.json";
import { ampluaRepository } from "../../../src/api/ampluaRepository";
import { coachesRepository } from "../../../src/api/coachesRepository";
import { playerRepository } from "../../../src/api/playerRepository";
import { teamRepository } from "../../../src/api/teamRepository";
import { AcademyTeam, AcademyTeamProps } from "../../../src/componentPages/pageAcademy/teams/academyTeam";
import { GetLayout } from "../../../src/components/layout/getLayout";
import { metaInterpolate } from "../../../src/helpers/metaInterpolate";

export default function AcademyTeamPage(props: AcademyTeamProps) {
  return <AcademyTeam {...props} />;
}

AcademyTeamPage.getLayout = GetLayout;

const isDev = process.env.NODE_ENV !== "production";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  isDev && console.log("\r\n\r\n", "\x1b[34m", "start", "/academy/teams/[id]", new Date());

  const metaTags = (seodata as Record<string, any>)["/academy/teams/[id]"] || null;

  const [ampluaRes, teamRes, coachesRes, playersRes] = await Promise.allSettled([
    ampluaRepository.fetchAmplua(),
    teamRepository.fetchTeams({ Id: String(params?.id), Section: "Academy" }),
    coachesRepository.fetchCoaches({
      Status: "Published",
      coachSection: "Academy",
      coachesTeam: String(params?.id),
      expand: "Teams/team",
      sorting: "SortOrder asc",
    }),
    playerRepository.fetchPlayers({ InTeamArray: String(params?.id), Status: "Published", PlayerType: "OwnPlayer" }),
  ]);

  const amplua = ampluaRes.status === "fulfilled" ? ampluaRes.value.value : [];
  const team = teamRes.status === "fulfilled" ? teamRes.value.value[0] || null : null;
  const coaches = coachesRes.status === "fulfilled" ? coachesRes.value.value : [];
  const players = playersRes.status === "fulfilled" ? playersRes.value.value : [];

  isDev && console.log("\x1b[34m", "done", "/academy/teams/[id]", new Date(), "\r\n");

  return {
    props: {
      team,
      players,
      amplua,
      coaches: coaches
        .map((item) => {
          const { Position = item.Position, SortOrder = item.SortOrder } =
            item.Teams?.find(({ Team }) => Team.Id === String(params?.id)) || {};
          return { ...item, Position, SortOrder };
        })
        .sort((a, b) => a.SortOrder - b.SortOrder),
      metaTags: team ? metaInterpolate(metaTags, team.FullName) : null,
      title: team ? metaInterpolate(metaTags, team.FullName).h1 : null,
    },
    revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_LONG),
  };
};

export const getStaticPaths: GetStaticPaths = async () => ({ paths: [], fallback: true });
