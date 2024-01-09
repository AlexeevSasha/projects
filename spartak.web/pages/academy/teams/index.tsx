import { GetStaticProps } from "next";
import React from "react";
import seodata from "../../../public/seo/seoData.json";
import { ITeam } from "../../../src/api/dto/ITeam";
import { teamRepository } from "../../../src/api/teamRepository";
import { AcademyLayout } from "../../../src/componentPages/pageAcademy/academyLayout/academyLayout";
import { TeamsList } from "../../../src/componentPages/pageAcademy/teams/TeamsList";

type Props = {
  teams: ITeam[];
};

export default function AcademyTeamsPage({ teams }: Props) {
  return <TeamsList teams={teams} />;
}

AcademyTeamsPage.getLayout = AcademyLayout;

const isDev = process.env.NODE_ENV !== "production";

export const getStaticProps: GetStaticProps = async () => {
  isDev && console.log("\r\n\r\n", "\x1b[34m", "start", "/academy/teams", new Date());

  const teams =
    (
      await teamRepository.fetchTeams({
        Section: "Academy",
        Status: "Published",
        sorting: "SortOrder asc",
        DisplayTeamInfoOnTheSite: "true",
      })
    ).value || [];

  isDev && console.log("\x1b[34m", "done", "/academy/teams", new Date(), "\r\n");

  return {
    props: {
      title: (seodata as Record<string, any>)["/academy/teams"].h1 || "teams",
      banner: "",
      metaTags: (seodata as Record<string, any>)["/academy/teams"] || null,
      teams,
    },
    revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_LONG),
  };
};
