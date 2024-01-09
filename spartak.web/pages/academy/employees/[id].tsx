import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import seodata from "../../../public/seo/seoData.json";
import { coachesRepository } from "../../../src/api/coachesRepository";
import { ICoach } from "../../../src/api/dto/ICoach";
import { ILeadership } from "../../../src/api/dto/ILeadership";
import { leadershipRepository } from "../../../src/api/leadershipRepository";
import { Coach } from "../../../src/componentPages/pageAcademy/coaches/coach";
import { Leader } from "../../../src/componentPages/pageClub/pageLeaders/leader";
import { GetLayout } from "../../../src/components/layout/getLayout";
import { metaInterpolate } from "../../../src/helpers/metaInterpolate";

type EmploeePageProps = {
  coach: ICoach | null;
  otherCoaches?: ICoach[];
  leader: ILeadership | null;
  otherLeaders?: ILeadership[];
  section: "site" | "academy";
};
export default function EmploeePage(props: EmploeePageProps) {
  console.log(props);
  if (props.coach) return <Coach {...props} section="academy" />;
  return <Leader leader={props.leader} otherLeaders={props.otherLeaders} section="academy" />;
}

EmploeePage.getLayout = GetLayout;

const isDev = process.env.NODE_ENV !== "production";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  isDev && console.log("\r\n\r\n", "\x1b[34m", "start", "/academy/coaches/[id]", new Date());
  const metaTags = (seodata as Record<string, any>)["/academy/employees/[id]"] || null;

  const coach =
    (
      await coachesRepository.fetchCoaches({
        Id: params?.id && String(params.id),
        Status: "Published",
      })
    ).value[0] || null;

  const otherCoaches =
    (
      await coachesRepository.fetchCoaches({
        coachSection: "Academy",
        Status: "Published",
        sorting: "SortOrder asc",
      })
    ).value || [];

  const leader =
    (
      await leadershipRepository.fetchLeadership({
        Id: params?.id && String(params.id),
        Status: "Published",
        Section: "Academy",
      })
    ).value[0] || null;

  const otherLeaders =
    (
      await leadershipRepository.fetchLeadership({
        Section: "Academy",
        Status: "Published",
        sorting: "SortOrder asc",
      })
    ).value || [];

  isDev && console.log("\x1b[34m", "done", "/academy/coaches/[id]", new Date(), "\r\n");

  return {
    props: {
      coach,
      otherCoaches,
      leader,
      otherLeaders,
      metaTags: coach ? metaInterpolate(metaTags, coach ? coach.FullName : leader.FullName) : null,
      title: coach ? metaInterpolate(metaTags, coach ? coach.FullName : leader.FullName).h1 : null,
    },
    revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_LONG),
  };
};

export const getStaticPaths: GetStaticPaths = async () => ({ paths: [], fallback: true });
