import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import seodata from "../../public/seo/seoData.json";
import { leadershipRepository } from "../../src/api/leadershipRepository";
import { Leader, LeaderPageProps } from "../../src/componentPages/pageClub/pageLeaders/leader";
import { GetLayout } from "../../src/components/layout/getLayout";
import { metaInterpolate } from "../../src/helpers/metaInterpolate";

export default function LeaderPage(props: LeaderPageProps) {
  return <Leader {...props} section="site" />;
}

LeaderPage.getLayout = GetLayout;

const isDev = process.env.NODE_ENV !== "production";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  isDev && console.log("\r\n\r\n", "\x1b[34m", "start", "/leaders/[id]", new Date());
  const metaTags = (seodata as Record<string, any>)["/leaders/[id]"] || null;
  console.log(params?.id);
  const leader =
    (
      await leadershipRepository.fetchLeadership({
        Status: "Published",
        Section: "Site",
        Id: params?.id && String(params.id),
      })
    ).value[0] || null;

  const otherLeaders = (
    await leadershipRepository.fetchLeadership({
      Section: "Site",
      Status: "Published",
      sorting: "SortOrder asc",
    })
  ).value;

  isDev && console.log("\x1b[34m", "done", "/leaders/[id]", new Date(), "\r\n");

  return {
    props: {
      leader,
      otherLeaders,
      metaTags: leader ? metaInterpolate(metaTags, leader.FullName) : null,
      //title: leader ? metaInterpolate(metaTags, leader.FullName).h1 : null,
    },
    revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_LONG),
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: true };
};
