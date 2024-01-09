import { GetStaticProps } from "next";
import React from "react";
import seodata from "../../public/seo/seoData.json";
import { ILeadership } from "../../src/api/dto/ILeadership";
import { leadershipRepository } from "../../src/api/leadershipRepository";
import { PageLeaders } from "../../src/componentPages/pageClub/pageLeaders/pageLeaders";
import { BannerHistory } from "../../src/componentPages/pageClub/pageResults/bannerHistory";
import { GetLayout } from "../../src/components/layout/getLayout";

interface IProps {
  leaders?: ILeadership[];
}

export default function Leaders(props: IProps) {
  return (
    <>
      <BannerHistory />
      <PageLeaders leaders={props.leaders} />
    </>
  );
}

Leaders.getLayout = GetLayout;

export const getStaticProps: GetStaticProps = async () => {
  const [leaders] = await Promise.allSettled([
    leadershipRepository.fetchLeadership({
      Status: "Published",
      sorting: "SortOrder asc",
      Section: "Site",
    }),
  ]);

  return {
    props: {
      metaTags: (seodata as Record<string, any>)["/club/leaders"] || null,
      leaders: leaders.status === "fulfilled" ? leaders?.value?.value : [],
    },
    revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_MAX),
  };
};
